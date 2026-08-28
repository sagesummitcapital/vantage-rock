"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { OpsState, Seat } from "@/lib/ops/types";

const NAVY = "#0B1A2A";
const TEAL = "#2EE6C9";
const W = 768;
const H = 576;
const CELL = 8;
const SPRITE = 12;
const SPARK_MAX = 60;

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

function counts(seats: Seat[]) {
  return {
    work: seats.filter((s) => s.status === "working").length,
    block: seats.filter((s) => s.status === "blocked").length,
    idle: seats.filter((s) => s.status === "idle").length,
    watch: seats.filter((s) => s.status === "watch").length,
  };
}

function spawnInRoom(roomId: string): Pick<AgentPos, "x" | "y" | "vx" | "vy"> {
  const r = ROOMS[roomId];
  return {
    x: r.x + 3 + Math.random() * Math.max(2, r.w - 6),
    y: r.y + 5 + Math.random() * Math.max(2, r.h - 8),
    vx: (Math.random() - 0.5) * 0.08,
    vy: (Math.random() - 0.5) * 0.08,
  };
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
      ctx.fillRect(px + col, py + row, 1, 1);
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
  return { color: "#6b7c8a", alpha: 0.08, dim: 0.45 };
}

export default function FloorClient() {
  const [state, setState] = useState<OpsState | null>(null);
  const [clock, setClock] = useState(phoenixNow);
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparkRef = useRef<HTMLCanvasElement>(null);
  const pos = useRef<Record<string, AgentPos>>({});
  const spark = useRef<number[]>([]);
  const sparkTick = useRef(0);

  useEffect(() => {
    const t = setInterval(() => setClock(phoenixNow()), 1000);
    return () => clearInterval(t);
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
          facing: p.vx >= 0 ? 1 : -1,
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

        ctx.fillStyle = blocked ? "rgba(18,10,16,0.95)" : "rgba(16,24,32,0.95)";
        ctx.fillRect(rx, ry, rw, rh);

        for (let gx = r.x; gx < r.x + r.w; gx++) {
          for (let gy = r.y; gy < r.y + r.h; gy++) {
            if ((gx + gy) % 2 === 0) {
              ctx.fillStyle = blocked ? "rgba(59,130,246,0.04)" : "rgba(46,230,201,0.035)";
              ctx.fillRect(gx * CELL, gy * CELL, CELL, CELL);
            }
          }
        }

        if (blocked) {
          ctx.save();
          ctx.beginPath();
          ctx.rect(rx, ry, rw, rh);
          ctx.clip();
          const hatch = mixRgb([239, 68, 68], [59, 130, 246], pulse);
          ctx.strokeStyle = hatch;
          ctx.globalAlpha = 0.38 + 0.22 * pulse;
          ctx.lineWidth = 1;
          for (let i = -rh; i < rw + 4; i += 5) {
            ctx.beginPath();
            ctx.moveTo(rx + i, ry);
            ctx.lineTo(rx + i + rh, ry + rh);
            ctx.stroke();
          }
          ctx.restore();
          ctx.globalAlpha = 0.55 + 0.45 * pulse;
          ctx.strokeStyle = mixRgb([239, 68, 68], [59, 130, 246], pulse);
          ctx.lineWidth = 2;
          ctx.strokeRect(rx + 1, ry + 1, rw - 2, rh - 2);
          ctx.globalAlpha = 1;
        } else {
          ctx.strokeStyle = "rgba(46,230,201,0.55)";
          ctx.lineWidth = 2;
          ctx.strokeRect(rx + 1, ry + 1, rw - 2, rh - 2);
        }

        ctx.font = "10px ui-monospace, SFMono-Regular, Menlo, monospace";
        ctx.fillStyle = blocked ? mixRgb([239, 68, 68], [59, 130, 246], pulse) : TEAL;
        ctx.fillText(r.label, rx + 6, ry + 13);
        ctx.fillStyle = blocked ? "rgba(239,68,68,0.9)" : "rgba(217,225,232,0.55)";
        ctx.fillText(blocked ? `BLK ${occ}` : `${occ}`, rx + 6, ry + 25);
      });

      state.seats.forEach((s) => {
        const r = ROOMS[s.room];
        const p = pos.current[s.id];
        if (!p || !r) return;

        if (p.transitioning) {
          p.x += (p.destX - p.x) * 0.055;
          p.y += (p.destY - p.y) * 0.055;
          const dx = p.destX - p.x;
          const dy = p.destY - p.y;
          if (Math.hypot(dx, dy) < 0.12) {
            p.x = p.destX;
            p.y = p.destY;
            p.transitioning = false;
            p.vx = (Math.random() - 0.5) * 0.08;
            p.vy = (Math.random() - 0.5) * 0.08;
          } else {
            p.facing = dx >= 0 ? 1 : -1;
            p.walk += 0.35;
          }
        } else if (s.wander && s.status !== "watch") {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < r.x + 2 || p.x > r.x + r.w - 3.5) p.vx *= -1;
          if (p.y < r.y + 4 || p.y > r.y + r.h - 3.5) p.vy *= -1;
          p.x = Math.min(r.x + r.w - 3.5, Math.max(r.x + 2, p.x));
          p.y = Math.min(r.y + r.h - 3.5, Math.max(r.y + 4, p.y));
          p.facing = p.vx >= 0 ? 1 : -1;
          p.walk += Math.hypot(p.vx, p.vy) * 8;
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

        const px = Math.round(p.x * CELL);
        const py = Math.round(p.y * CELL);
        const glow = statusGlow(s.status, t);
        const moving = p.transitioning || (s.wander && s.status !== "watch");
        const frame: 0 | 1 = moving ? ((Math.floor(p.walk) % 2) as 0 | 1) : 0;

        ctx.save();
        ctx.globalAlpha = glow.alpha;
        ctx.fillStyle = glow.color;
        ctx.beginPath();
        ctx.arc(px + SPRITE / 2, py + SPRITE / 2, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        drawSprite(ctx, px, py, s.color, frame, p.facing, glow.dim);

        if (p.bubbleAlpha > 0.04 && p.lastLine) {
          const text = p.lastLine.slice(0, 42);
          ctx.font = "9px ui-monospace, SFMono-Regular, Menlo, monospace";
          const tw = ctx.measureText(text).width;
          const bw = Math.min(220, tw + 10);
          const bh = 13;
          const bx = Math.max(2, Math.min(W - bw - 2, px - 4));
          const by = py - 18;
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
  const ticker = (state?.dialogue ?? []).slice(-12);
  const tickerText = ticker.map((d) => `[${d.ts}] ${d.who}: ${d.text}`).join("   ·   ");

  if (!state) {
    return (
      <main className="min-h-screen bg-[#0B1A2A] text-[#2EE6C9] font-mono p-6">
        Loading floor…
      </main>
    );
  }

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
        <span className="vr-live bg-green-500 text-black text-xs font-bold px-2 py-0.5 tracking-widest">
          LIVE
        </span>
        <span className="text-xs opacity-70 ml-auto">{clock} · Phoenix</span>
        <span className="text-xs">
          Seats {state.seats.length} · Work {c.work} · Block {c.block} · Idle {c.idle} · Watch {c.watch}
        </span>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_220px] gap-3">
        <aside className="border border-[#3A4A5A] p-2 space-y-1 text-xs bg-[#070d14]/60">
          <p className="text-[#2EE6C9] tracking-widest text-[10px] mb-2">ROSTER</p>
          {state.seats.map((s) => (
            <div key={s.id} className="flex items-center gap-2">
              <span
                className="inline-block w-2 h-2 shrink-0"
                style={{
                  background: s.status === "idle" ? "#4a5560" : s.color,
                  boxShadow:
                    s.status === "working"
                      ? `0 0 6px ${TEAL}`
                      : s.status === "blocked"
                      ? "0 0 6px #3b82f6"
                      : s.status === "watch"
                      ? "0 0 6px #fbbf24"
                      : "none",
                }}
              />
              <span className="flex-1 truncate">{s.name}</span>
              <span
                className={
                  s.status === "blocked"
                    ? "text-blue-400"
                    : s.status === "working"
                    ? "text-[#2EE6C9]"
                    : s.status === "watch"
                    ? "text-yellow-300"
                    : "opacity-50"
                }
              >
                {s.status}
              </span>
            </div>
          ))}
        </aside>

        <div className="relative border border-[#2EE6C9]/40 overflow-hidden bg-[#070d14]">
          <canvas ref={canvasRef} width={768} height={576} className="w-full h-auto block" />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "repeating-linear-gradient(0deg, rgba(0,0,0,0.14) 0px, rgba(0,0,0,0.14) 1px, transparent 1px, transparent 3px)",
              mixBlendMode: "multiply",
            }}
          />
          <div className="pointer-events-none absolute inset-0 vr-scan bg-gradient-to-b from-transparent via-[#2EE6C9]/5 to-transparent h-1/3" />
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
            <p>Target {state.metrics.founderUtilTarget}%</p>
            <p>
              Actual{" "}
              {state.metrics.founderUtilActual == null
                ? "— (no books yet)"
                : `${state.metrics.founderUtilActual}%`}
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
            {tickerText}   ·   {tickerText}
          </div>
        </div>
        <div className="p-2 h-24 overflow-y-auto text-[11px] space-y-1">
          {ticker.map((d, i) => (
            <p key={`${d.ts}-${d.who}-${i}`}>
              <span className="opacity-50">[{d.ts}]</span>{" "}
              <span className="text-[#2EE6C9]">{d.who}:</span> {d.text}
            </p>
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
  ctx.fillRect(lx - 1, ly - 1, 3, 3);
}
