"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { OpsState, Seat, SeatTask } from "@/lib/ops/types";

const NAVY = "#0B1A2A";
const TEAL = "#2EE6C9";
const W = 768;
const H = 576;
const CELL = 8;
const SPRITE = 12;
const SCALE = 4;
const SPRITE_PX = SPRITE * SCALE;
const SPARK_MAX = 60;
const STALE_MS = 90 * 60 * 1000;

const ROOMS: Record<string, { x: number; y: number; w: number; h: number; label: string }> = {
  growth: { x: 8, y: 8, w: 24, h: 20, label: "GROWTH" },
  briefing: { x: 34, y: 8, w: 28, h: 20, label: "BRIEFING" },
  calendar: { x: 64, y: 8, w: 28, h: 20, label: "CAL" },
  ops: { x: 8, y: 30, w: 24, h: 20, label: "OPS" },
  people: { x: 34, y: 30, w: 28, h: 20, label: "PEOPLE" },
  finance: { x: 64, y: 30, w: 28, h: 20, label: "FINANCE" },
  marketing: { x: 8, y: 52, w: 24, h: 16, label: "MARKETING" },
  tech: { x: 34, y: 52, w: 28, h: 16, label: "TECH" },
  lounge: { x: 64, y: 52, w: 28, h: 16, label: "LOUNGE" },
};

/** 12x12 walk cycle. 0 empty, 1 body, 2 eye, 3 boot */
const FRAME_A = [
  "000011110000",
  "000111111000",
  "000121121000",
  "000111111000",
  "000011110000",
  "000111111000",
  "001111111100",
  "000111111000",
  "000110011000",
  "001100001100",
  "001000000100",
  "003000000300",
];
const FRAME_B = [
  "000011110000",
  "000111111000",
  "000121121000",
  "000111111000",
  "000011110000",
  "000111111000",
  "001111111100",
  "000111111000",
  "000110011000",
  "000011110000",
  "000100001000",
  "003300003300",
];

type Mission = "home" | "to-brief" | "brief" | "to-home" | "to-door";

type AgentPos = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  home: string;
  destX: number;
  destY: number;
  transitioning: boolean;
  walk: number;
  lastLine: string;
  bubbleBorn: number;
  bubbleAlpha: number;
  facing: 1 | -1;
  mission: Mission;
  missionUntil: number;
};

function phoenixNow() {
  return new Date().toLocaleString("en-US", {
    timeZone: "America/Phoenix",
    weekday: "long",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

function phoenixStamp(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    timeZone: "America/Phoenix",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function counts(seats: Seat[]) {
  return {
    work: seats.filter((s) => s.status === "working").length,
    block: seats.filter((s) => s.status === "blocked").length,
    idle: seats.filter((s) => s.status === "idle").length,
    watch: seats.filter((s) => s.status === "watch").length,
  };
}

function idPhase(id: string) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return (h % 1000) / 1000;
}

function spawnInRoom(roomId: string): Pick<AgentPos, "x" | "y" | "vx" | "vy"> {
  const r = ROOMS[roomId];
  const margin = SPRITE_PX / CELL;
  return {
    x: r.x + 2 + Math.random() * Math.max(1, r.w - margin - 2),
    y: r.y + 4 + Math.random() * Math.max(1, r.h - margin - 4),
    vx: 0,
    vy: 0,
  };
}

function briefSpot(id: string) {
  const r = ROOMS.briefing;
  const ph = idPhase(id);
  return {
    x: r.x + 4 + ph * (r.w - 10),
    y: r.y + 6 + ((ph * 7) % 1) * (r.h - 12),
  };
}

function roomDoor(roomId: string) {
  const r = ROOMS[roomId];
  return { x: r.x + 1.4, y: r.y + r.h * 0.55 };
}

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

function mixRgb(a: [number, number, number], b: [number, number, number], t: number) {
  const u = 1 - t;
  return `rgb(${Math.round(a[0] * u + b[0] * t)},${Math.round(a[1] * u + b[1] * t)},${Math.round(a[2] * u + b[2] * t)})`;
}

function drawSprite(
  ctx: CanvasRenderingContext2D,
  px: number,
  py: number,
  color: string,
  frame: 0 | 1,
  facing: 1 | -1,
  dim: number,
) {
  const map = frame === 0 ? FRAME_A : FRAME_B;
  const [r, g, b] = hexToRgb(color);
  const body = `rgba(${r},${g},${b},${dim})`;
  const eye = `rgba(11,26,42,${Math.min(1, dim + 0.15)})`;
  const boot = `rgba(${Math.max(0, r - 40)},${Math.max(0, g - 40)},${Math.max(0, b - 40)},${dim})`;
  for (let row = 0; row < SPRITE; row++) {
    for (let col = 0; col < SPRITE; col++) {
      const srcCol = facing === 1 ? col : SPRITE - 1 - col;
      const ch = map[row][srcCol];
      if (ch === "0") continue;
      ctx.fillStyle = ch === "2" ? eye : ch === "3" ? boot : body;
      ctx.fillRect(px + col * SCALE, py + row * SCALE, SCALE, SCALE);
    }
  }
}

function statusGlow(status: Seat["status"], t: number): { color: string; alpha: number; dim: number } {
  if (status === "working") {
    return { color: TEAL, alpha: 0.28 + 0.22 * (0.5 + 0.5 * Math.sin(t * 4.2)), dim: 1 };
  }
  if (status === "blocked") {
    return { color: "#3b82f6", alpha: 0.42 + 0.12 * (0.5 + 0.5 * Math.sin(t * 3.1)), dim: 1 };
  }
  if (status === "watch") {
    return { color: "#fbbf24", alpha: 0.34 + 0.16 * (0.5 + 0.5 * Math.sin(t * 2.4)), dim: 1 };
  }
  return { color: "#9aa8b4", alpha: 0.22 + 0.08 * (0.5 + 0.5 * Math.sin(t * 1.8)), dim: 0.78 };
}

function seatStamp(seat: Seat, state: OpsState) {
  return seat.updatedAt || state.updatedAt;
}

function isStaleIso(iso: string, now = Date.now()) {
  const t = new Date(iso).getTime();
  if (!Number.isFinite(t)) return true;
  return now - t > STALE_MS;
}

function taskChip(status: SeatTask["status"]) {
  if (status === "doing") return "bg-[#2EE6C9] text-black";
  if (status === "blocked") return "bg-blue-500 text-white";
  if (status === "done") return "bg-[#1f3d36] text-[#8fd9cc]";
  return "bg-[#3A4A5A] text-[#D9E1E8]";
}

export default function FloorClient() {
  const [state, setState] = useState<OpsState | null>(null);
  const [clock, setClock] = useState(phoenixNow);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparkRef = useRef<HTMLCanvasElement>(null);
  const pos = useRef<Record<string, AgentPos>>({});
  const spark = useRef<number[]>([]);
  const sparkTick = useRef(0);
  const selectedIdRef = useRef<string | null>(null);
  selectedIdRef.current = selectedId;

  useEffect(() => {
    const t = setInterval(() => setClock(phoenixNow()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function pull() {
      const res = await fetch("/api/ops/state", { cache: "no-store" });
      if (res.status === 401) {
        router.replace("/ops/login");
        return;
      }
      if (!res.ok) return;
      const data = (await res.json()) as OpsState;
      if (!cancelled) setState(data);
    }
    pull();
    const t = setInterval(pull, 8000);
    return () => {
      cancelled = true;
      clearInterval(t);
    };
  }, [router]);

  useEffect(() => {
    if (!state) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.imageSmoothingEnabled = false;
    let raf = 0;

    state.seats.forEach((s) => {
      const existing = pos.current[s.id];
      if (!existing) {
        const p = spawnInRoom(s.room);
        pos.current[s.id] = {
          ...p,
          home: s.room,
          destX: p.x,
          destY: p.y,
          transitioning: false,
          walk: 0,
          lastLine: s.line ?? "",
          bubbleBorn: s.line ? Date.now() : 0,
          bubbleAlpha: s.line ? 1 : 0,
          facing: 1,
          mission: s.status === "blocked" ? "to-door" : "home",
          missionUntil: Date.now() + 5000 + idPhase(s.id) * 18000,
        };
        return;
      }
      if (existing.home !== s.room) {
        const dest = spawnInRoom(s.room);
        existing.home = s.room;
        existing.destX = dest.x;
        existing.destY = dest.y;
        existing.transitioning = true;
        existing.vx = 0;
        existing.vy = 0;
        existing.mission = "to-home";
      }
    });

    const draw = () => {
      const now = Date.now();
      const t = now / 1000;

      ctx.fillStyle = "#070d14";
      ctx.fillRect(0, 0, W, H);

      ctx.strokeStyle = "rgba(46,230,201,0.045)";
      ctx.lineWidth = 1;
      for (let x = 0; x <= W; x += CELL) {
        ctx.beginPath();
        ctx.moveTo(x + 0.5, 0);
        ctx.lineTo(x + 0.5, H);
        ctx.stroke();
      }
      for (let y = 0; y <= H; y += CELL) {
        ctx.beginPath();
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(W, y + 0.5);
        ctx.stroke();
      }

      Object.entries(ROOMS).forEach(([id, r]) => {
        const rx = r.x * CELL;
        const ry = r.y * CELL;
        const rw = r.w * CELL;
        const rh = r.h * CELL;
        const blocked = state.rooms[id as keyof typeof state.rooms]?.blocked;
        const occ = state.seats.filter((s) => s.room === id).length;
        const pulse = 0.5 + 0.5 * Math.sin(now / 280);
        const note = state.rooms[id as keyof typeof state.rooms]?.note;

        ctx.fillStyle = blocked ? "rgba(18,10,16,0.95)" : "rgba(16,24,32,0.95)";
        ctx.fillRect(rx, ry, rw, rh);

        for (let gx = r.x; gx < r.x + r.w; gx++) {
          for (let gy = r.y; gy < r.y + r.h; gy++) {
            if ((gx + gy) % 2 === 0) {
              ctx.fillStyle = blocked ? "rgba(59,130,246,0.10)" : "rgba(46,230,201,0.035)";
              ctx.fillRect(gx * CELL, gy * CELL, CELL, CELL);
            }
          }
        }

        if (blocked) {
          ctx.save();
          ctx.beginPath();
          ctx.rect(rx, ry, rw, rh);
          ctx.clip();
          ctx.fillStyle = `rgba(239,68,68,${0.12 + 0.10 * pulse})`;
          ctx.fillRect(rx, ry, rw, rh);
          const hatch = mixRgb([239, 68, 68], [59, 130, 246], pulse);
          ctx.strokeStyle = hatch;
          ctx.globalAlpha = 0.55 + 0.3 * pulse;
          ctx.lineWidth = 4;
          for (let i = -rh; i < rw + 8; i += 7) {
            ctx.beginPath();
            ctx.moveTo(rx + i, ry);
            ctx.lineTo(rx + i + rh, ry + rh);
            ctx.stroke();
          }
          ctx.restore();
          ctx.globalAlpha = 0.7 + 0.3 * pulse;
          ctx.strokeStyle = mixRgb([239, 68, 68], [59, 130, 246], pulse);
          ctx.lineWidth = 4;
          ctx.strokeRect(rx + 2, ry + 2, rw - 4, rh - 4);
          ctx.globalAlpha = 1;
        } else {
          ctx.strokeStyle = "rgba(46,230,201,0.55)";
          ctx.lineWidth = 2;
          ctx.strokeRect(rx + 1, ry + 1, rw - 2, rh - 2);
        }

        ctx.font = "10px ui-monospace, SFMono-Regular, Menlo, monospace";
        ctx.fillStyle = blocked ? mixRgb([239, 68, 68], [59, 130, 246], pulse) : TEAL;
        ctx.fillText(blocked ? `${r.label}  BLK ${occ}` : `${r.label}  ${occ}`, rx + 6, ry + 13);
        if (note) {
          ctx.fillStyle = blocked ? "rgba(239,68,68,0.9)" : "rgba(217,225,232,0.55)";
          ctx.fillText(note.slice(0, 24), rx + 6, ry + 25);
        }
      });

      state.seats.forEach((s) => {
        const r = ROOMS[s.room];
        const p = pos.current[s.id];
        if (!p || !r) return;
        const phase = idPhase(s.id);

        if (s.status === "blocked" && (p.mission === "home" || p.mission === "to-door" || p.mission === "brief" || p.mission === "to-brief" || p.mission === "to-home")) {
          if (!p.transitioning) {
            const door = roomDoor(s.room);
            const dist = Math.hypot(p.x - door.x, p.y - door.y);
            if (dist > 0.35) {
              p.destX = door.x;
              p.destY = door.y;
              p.transitioning = true;
              p.mission = "to-door";
            } else {
              p.mission = "to-door";
            }
          }
        } else if (s.status === "working") {
          if (!p.transitioning && p.mission === "home" && now > p.missionUntil) {
            const dest = briefSpot(s.id);
            p.destX = dest.x;
            p.destY = dest.y;
            p.transitioning = true;
            p.mission = "to-brief";
          } else if (!p.transitioning && p.mission === "to-brief") {
            p.mission = "brief";
            p.missionUntil = now + 4000 + phase * 3000;
          } else if (!p.transitioning && p.mission === "brief" && now > p.missionUntil) {
            const dest = spawnInRoom(s.room);
            p.destX = dest.x;
            p.destY = dest.y;
            p.transitioning = true;
            p.mission = "to-home";
          } else if (!p.transitioning && p.mission === "to-home") {
            p.mission = "home";
            p.missionUntil = now + 16000 + phase * 22000;
          } else if (!p.transitioning && p.mission === "to-door") {
            p.mission = "home";
            p.missionUntil = now + 8000;
          }
        }

        if (p.transitioning) {
          p.x += (p.destX - p.x) * 0.04;
          p.y += (p.destY - p.y) * 0.04;
          const dx = p.destX - p.x;
          const dy = p.destY - p.y;
          if (Math.hypot(dx, dy) < 0.12) {
            p.x = p.destX;
            p.y = p.destY;
            p.transitioning = false;
            p.vx = 0;
            p.vy = 0;
          } else {
            p.facing = dx >= 0 ? 1 : -1;
            p.walk += 0.28;
          }
        }

        const line = s.line ?? "";
        if (line && line !== p.lastLine) {
          p.lastLine = line;
          p.bubbleBorn = now;
        } else if (!line) {
          p.lastLine = "";
          p.bubbleBorn = 0;
        }
        if (p.lastLine) {
          const age = now - p.bubbleBorn;
          p.bubbleAlpha = age < 2800 ? 1 : Math.max(0, 1 - (age - 2800) / 1800);
        } else {
          p.bubbleAlpha = 0;
        }

        const breath = Math.sin(t * (s.status === "watch" ? 1.4 : 2.2) + phase * 6) * (s.status === "idle" || s.status === "watch" ? 1.5 : 0.4);
        const fidgetFrame = !p.transitioning && (s.status === "idle" || s.status === "watch") && Math.sin(t * 1.15 + phase * 8) > 0.62;
        const moving = p.transitioning;
        const frame: 0 | 1 = moving ? ((Math.floor(p.walk) % 2) as 0 | 1) : fidgetFrame ? 1 : 0;

        const px = Math.round(p.x * CELL);
        const py = Math.round(p.y * CELL + breath);
        const glow = statusGlow(s.status, t);
        const seatStale = isStaleIso(seatStamp(s, state), now);

        ctx.save();
        ctx.globalAlpha = glow.alpha * (seatStale ? 0.55 : 1);
        ctx.fillStyle = glow.color;
        ctx.beginPath();
        ctx.arc(px + SPRITE_PX / 2, py + SPRITE_PX / 2, 16, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        drawSprite(ctx, px, py, s.color, frame, p.facing, glow.dim * (seatStale ? 0.65 : 1));

        if (selectedIdRef.current === s.id) {
          ctx.strokeStyle = TEAL;
          ctx.lineWidth = 1;
          ctx.strokeRect(px - 1, py - 1, SPRITE_PX + 1, SPRITE_PX + 1);
        }

        if (p.bubbleAlpha > 0.04 && p.lastLine) {
          const text = p.lastLine.slice(0, 42);
          ctx.font = "9px ui-monospace, SFMono-Regular, Menlo, monospace";
          const tw = ctx.measureText(text).width;
          const bw = Math.min(220, tw + 10);
          const bh = 13;
          const bx = Math.max(2, Math.min(W - bw - 2, px - 4));
          const by = py - 16;
          ctx.globalAlpha = p.bubbleAlpha;
          ctx.fillStyle = "#d9e1e8";
          ctx.fillRect(bx, by, bw, bh);
          ctx.fillStyle = NAVY;
          ctx.fillRect(bx + 4, by + bh, 3, 3);
          ctx.fillText(text, bx + 5, by + 10);
          ctx.globalAlpha = 1;
        }
      });

      ctx.fillStyle = "rgba(0, 8, 18, 0.18)";
      for (let y = 0; y < H; y += 2) ctx.fillRect(0, y, W, 1);
      const vig = ctx.createRadialGradient(W / 2, H / 2, H * 0.22, W / 2, H / 2, H * 0.78);
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(1, "rgba(0,0,0,0.38)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = "rgba(46,230,201,0.03)";
      ctx.fillRect(0, 0, W, 1);
      ctx.fillRect(0, H - 1, W, 1);

      sparkTick.current += 1;
      if (sparkTick.current % 1 === 0) {
        const working = state.seats.filter((s) => s.status === "working").length;
        spark.current.push(working);
        if (spark.current.length > SPARK_MAX) spark.current.shift();
      }
      const sc = sparkRef.current;
      if (sc) {
        const sctx = sc.getContext("2d");
        if (sctx) drawSpark(sctx, sc.width, sc.height, spark.current);
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [state]);

  const c = useMemo(() => (state ? counts(state.seats) : { work: 0, block: 0, idle: 0, watch: 0 }), [state]);
  const sop = state?.metrics.sop ?? (state ? Math.round((c.work / 10) * 100) : 0);
  const cashBlk = state?.metrics.cash == null;
  const dialogue = state?.dialogue ?? [];
  const lineTicker = (state?.seats ?? []).filter((s) => s.line).map((s) => `${s.name}: ${s.line}`);
  const tickerSource = dialogue.length
    ? dialogue.slice(-12).map((d) => `[${d.ts}] ${d.who}: ${d.text}`)
    : lineTicker;
  const tickerText = tickerSource.join("   ·   ");
  const selected = state?.seats.find((s) => s.id === selectedId) ?? null;
  const nowMs = Date.now();
  const floorStale = state
    ? isStaleIso(state.updatedAt, nowMs) || state.seats.every((s) => isStaleIso(seatStamp(s, state), nowMs))
    : false;

  function onCanvasClick(e: React.MouseEvent<HTMLCanvasElement>) {
    if (!state) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * W;
    const y = ((e.clientY - rect.top) / rect.height) * H;

    const sprites = [...state.seats].reverse();
    for (const s of sprites) {
      const p = pos.current[s.id];
      if (!p) continue;
      const px = Math.round(p.x * CELL);
      const py = Math.round(p.y * CELL);
      if (x >= px && x < px + SPRITE_PX && y >= py && y < py + SPRITE_PX) {
        setSelectedId(s.id);
        return;
      }
    }

    for (const [id, r] of Object.entries(ROOMS)) {
      const rx = r.x * CELL;
      const ry = r.y * CELL;
      const rw = r.w * CELL;
      const rh = r.h * CELL;
      if (x >= rx && x < rx + rw && y >= ry && y < ry + rh) {
        const occ = state.seats.filter((s) => s.room === id);
        if (!occ.length) {
          setSelectedId(null);
          return;
        }
        let best = occ[0];
        let bestD = Infinity;
        for (const s of occ) {
          const p = pos.current[s.id];
          if (!p) continue;
          const cx = p.x * CELL + SPRITE_PX / 2;
          const cy = p.y * CELL + SPRITE_PX / 2;
          const d = Math.hypot(x - cx, y - cy);
          if (d < bestD) {
            bestD = d;
            best = s;
          }
        }
        setSelectedId(best.id);
        return;
      }
    }

    setSelectedId(null);
  }

  if (!state) {
    return (
      <main className="min-h-screen bg-[#0B1A2A] text-[#2EE6C9] font-mono p-6">
        Loading floor…
      </main>
    );
  }

  const utilTarget = state.metrics.founderUtilTarget;
  const utilActual = state.metrics.founderUtilActual;
  const selectedStale = selected ? isStaleIso(seatStamp(selected, state), nowMs) : false;

  return (
    <main className="min-h-screen bg-[#0B1A2A] text-[#D9E1E8] font-mono p-3 md:p-4 overflow-x-hidden">
      <style>{`
        @keyframes vr-live-blink { 0%, 45% { opacity: 1; } 55%, 100% { opacity: 0.22; } }
        @keyframes vr-marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes vr-scan { 0% { transform: translateY(-100%); } 100% { transform: translateY(220%); } }
        .vr-live { animation: vr-live-blink 1.05s steps(1, end) infinite; }
        .vr-marquee { animation: vr-marquee 28s linear infinite; }
        .vr-scan { animation: vr-scan 7s linear infinite; }
      `}</style>

      <header className="flex flex-wrap items-center gap-3 mb-3">
        <h1 className="text-[#2EE6C9] tracking-widest text-sm md:text-base">
          VANTAGE ROCK: FLOOR — C-SUITE OPS
        </h1>
        {floorStale ? (
          <span className="bg-yellow-400 text-black text-xs font-bold px-2 py-0.5 tracking-widest">
            STALE
          </span>
        ) : (
          <span className="vr-live bg-green-500 text-black text-xs font-bold px-2 py-0.5 tracking-widest">
            LIVE
          </span>
        )}
        <span className="text-xs opacity-70">as of {phoenixStamp(state.updatedAt)}</span>
        <span className="text-xs opacity-70 ml-auto">{clock} · Phoenix</span>
        <span className="text-xs">
          Seats {state.seats.length} · Work {c.work} · Block {c.block} · Idle {c.idle} · Watch {c.watch}
        </span>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr_220px] gap-3">
        <aside className="border border-[#3A4A5A] p-2 space-y-1 text-xs bg-[#070d14]/60">
          <p className="text-[#2EE6C9] tracking-widest text-[10px] mb-2">ROSTER</p>
          {state.seats.map((s) => {
            const stale = isStaleIso(seatStamp(s, state), nowMs);
            const on = selectedId === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setSelectedId(s.id)}
                className={`w-full text-left flex items-start gap-2 px-1 py-1 border ${
                  on ? "border-[#2EE6C9] bg-[#2EE6C9]/10" : "border-transparent hover:border-[#3A4A5A]"
                } ${stale ? "opacity-45" : ""}`}
              >
                <span
                  className="inline-block w-2 h-2 shrink-0 mt-1"
                  style={{
                    background: s.status === "idle" ? "#7a8792" : s.color,
                    boxShadow:
                      s.status === "working"
                        ? `0 0 6px ${TEAL}`
                        : s.status === "blocked"
                        ? "0 0 6px #3b82f6"
                        : s.status === "watch"
                        ? "0 0 6px #fbbf24"
                        : "0 0 4px #7a8792",
                  }}
                />
                <span className="flex-1 min-w-0">
                  <span className="flex items-center gap-1">
                    <span className="truncate">{s.name}</span>
                    {stale ? (
                      <span className="shrink-0 bg-yellow-400 text-black text-[9px] font-bold px-1 tracking-widest">
                        STALE
                      </span>
                    ) : null}
                  </span>
                  <span className="block truncate opacity-60">{s.line ?? "—"}</span>
                </span>
                <span
                  className={
                    s.status === "blocked"
                      ? "text-blue-400 shrink-0"
                      : s.status === "working"
                      ? "text-[#2EE6C9] shrink-0"
                      : s.status === "watch"
                      ? "text-yellow-300 shrink-0"
                      : "opacity-70 shrink-0"
                  }
                >
                  {s.status}
                </span>
              </button>
            );
          })}
        </aside>

        <div className="relative border border-[#2EE6C9]/40 overflow-hidden bg-[#070d14]">
          <canvas
            ref={canvasRef}
            width={768}
            height={576}
            onClick={onCanvasClick}
            className="w-full h-auto block cursor-pointer"
            style={{ imageRendering: "pixelated" }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "repeating-linear-gradient(0deg, rgba(0,0,0,0.14) 0px, rgba(0,0,0,0.14) 1px, transparent 1px, transparent 3px)",
              mixBlendMode: "multiply",
            }}
          />
          <div className="pointer-events-none absolute inset-0 vr-scan bg-gradient-to-b from-transparent via-[#2EE6C9]/5 to-transparent h-1/3" />
          {selected ? (
            <div className="absolute top-2 right-2 bottom-2 w-[250px] max-w-[75%] border border-[#2EE6C9] bg-[#0B1A2A]/95 p-3 text-xs overflow-y-auto z-10">
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="text-[#2EE6C9] tracking-widest text-[10px]">AGENT</p>
                <button type="button" className="opacity-70 hover:opacity-100" onClick={() => setSelectedId(null)}>
                  ESC
                </button>
              </div>
              <p className="text-sm tracking-widest" style={{ color: selected.color }}>
                {selected.name}
              </p>
              <p className="opacity-70">{selected.role}</p>
              <p className="mt-2">
                Room <span className="text-[#2EE6C9]">{selected.room}</span>
              </p>
              <p>
                Status{" "}
                <span
                  className={
                    selected.status === "blocked"
                      ? "text-blue-400"
                      : selected.status === "working"
                      ? "text-[#2EE6C9]"
                      : selected.status === "watch"
                      ? "text-yellow-300"
                      : "opacity-70"
                  }
                >
                  {selected.status}
                </span>
                {selectedStale ? (
                  <span className="ml-2 bg-yellow-400 text-black text-[9px] font-bold px-1 tracking-widest">
                    STALE
                  </span>
                ) : null}
              </p>
              <p className="mt-2 opacity-80">Last work</p>
              <p>{selected.line ?? "—"}</p>
              {selected.blocker ? (
                <p className="mt-2 text-blue-400">Blocker {selected.blocker}</p>
              ) : null}
              <p className="mt-3 text-[#2EE6C9] tracking-widest text-[10px]">TASKS</p>
              <ul className="mt-1 space-y-1">
                {(selected.tasks ?? []).length ? (
                  selected.tasks!.map((task) => (
                    <li key={task.id} className="flex items-start gap-2">
                      <span className={`shrink-0 px-1 text-[9px] tracking-widest ${taskChip(task.status)}`}>
                        {task.status}
                      </span>
                      <span className={task.status === "done" ? "opacity-50 line-through" : ""}>{task.title}</span>
                    </li>
                  ))
                ) : (
                  <li className="opacity-50">No tasks on feed</li>
                )}
              </ul>
              <p className="mt-3 opacity-50">
                updated {phoenixStamp(seatStamp(selected, state))} Phoenix
              </p>
            </div>
          ) : null}
        </div>

        <aside className="border border-[#3A4A5A] p-2 text-xs space-y-3 bg-[#070d14]/60">
          <div>
            <p className="text-[#2EE6C9] tracking-widest text-[10px]">SOP</p>
            <div className="h-2 bg-[#101820] mt-1 border border-[#2EE6C9]/20">
              <div className="h-full bg-[#2EE6C9]" style={{ width: `${Math.max(0, Math.min(100, sop))}%` }} />
            </div>
            <p className="opacity-70 mt-1">{sop}% seats working</p>
          </div>
          <div>
            <p className="text-[#2EE6C9] tracking-widest text-[10px]">CASH</p>
            <p className={cashBlk ? "text-blue-400 tracking-widest text-lg leading-tight" : ""}>
              {cashBlk ? "BLK" : String(state.metrics.cash)}
            </p>
            {cashBlk ? <p className="opacity-50">until QBO</p> : null}
          </div>
          <div>
            <p className="text-[#2EE6C9] tracking-widest text-[10px]">FOUNDER UTIL</p>
            <div className="relative h-6 mt-1 border border-[#2EE6C9]/40 bg-[#101820]">
              {utilActual == null ? (
                <div className="h-full w-full bg-blue-500/40 flex items-center justify-center text-blue-200 tracking-widest text-[11px] font-bold">
                  BLK
                </div>
              ) : (
                <div
                  className={`h-full ${utilActual > utilTarget ? "bg-red-500" : "bg-[#2EE6C9]"}`}
                  style={{ width: `${Math.max(0, Math.min(100, utilActual))}%` }}
                />
              )}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-yellow-300"
                style={{ left: `${Math.max(0, Math.min(100, utilTarget))}%` }}
                title={`target ${utilTarget}%`}
              />
            </div>
            <p className="opacity-70 mt-1">
              Target {utilTarget}% · Actual {utilActual == null ? "BLK" : `${utilActual}%`} · stay &lt; 70%
            </p>
          </div>
          <div>
            <p className="text-[#2EE6C9] tracking-widest text-[10px]">WORK · 60F</p>
            <canvas ref={sparkRef} width={196} height={48} className="w-full h-12 mt-1 bg-[#101820] border border-[#2EE6C9]/20" />
          </div>
          <p className="opacity-50 leading-snug">
            Cash and runway stay blank until QBO is on. No fake numbers.
          </p>
        </aside>
      </div>

      <footer className="mt-3 border border-[#3A4A5A] bg-[#070d14]/80">
        <div className="flex items-center gap-2 px-2 py-1 border-b border-[#3A4A5A] text-[10px] tracking-widest text-[#2EE6C9]">
          <span>COMMS</span>
          <span className="vr-live inline-block w-1.5 h-1.5 bg-[#2EE6C9] rounded-none" />
        </div>
        <div className="overflow-hidden h-7 border-b border-[#3A4A5A]/80">
          <div className="vr-marquee whitespace-nowrap text-[11px] leading-7 px-2 inline-block">
            {tickerText || "No feed"}   ·   {tickerText || "No feed"}
          </div>
        </div>
        <div className="p-2 h-24 overflow-y-auto text-[11px] space-y-1">
          {dialogue.length
            ? dialogue.slice(-12).map((d, i) => (
                <p key={`${d.ts}-${d.who}-${i}`}>
                  <span className="opacity-50">[{d.ts}]</span>{" "}
                  <span className="text-[#2EE6C9]">{d.who}:</span> {d.text}
                </p>
              ))
            : lineTicker.map((line, i) => (
                <p key={`line-${i}`}>{line}</p>
              ))}
        </div>
      </footer>
    </main>
  );
}

function drawSpark(ctx: CanvasRenderingContext2D, w: number, h: number, data: number[]) {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#101820";
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = "rgba(46,230,201,0.12)";
  ctx.lineWidth = 1;
  for (let i = 1; i < 4; i++) {
    const y = Math.round((h * i) / 4) + 0.5;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }
  if (data.length < 2) return;
  const max = Math.max(10, ...data);
  ctx.beginPath();
  data.forEach((v, i) => {
    const x = (i / (SPARK_MAX - 1)) * (w - 2) + 1;
    const y = h - 3 - (v / max) * (h - 8);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.strokeStyle = TEAL;
  ctx.lineWidth = 1.5;
  ctx.stroke();
  const last = data[data.length - 1];
  const lx = ((data.length - 1) / (SPARK_MAX - 1)) * (w - 2) + 1;
  const ly = h - 3 - (last / max) * (h - 8);
  ctx.fillStyle = TEAL;
  ctx.fillRect(lx - 2, ly - 2, 5, 5);
}
