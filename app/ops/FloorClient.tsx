"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { OpsState, Seat } from "@/lib/ops/types";

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
  };
}

export default function FloorClient() {
  const [state, setState] = useState<OpsState | null>(null);
  const [clock, setClock] = useState(phoenixNow);
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pos = useRef<Record<string, { x: number; y: number; vx: number; vy: number }>>({});

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
    let raf = 0;

    state.seats.forEach((s) => {
      if (!pos.current[s.id]) {
        const r = ROOMS[s.room];
        pos.current[s.id] = {
          x: r.x + 4 + Math.random() * (r.w - 8),
          y: r.y + 6 + Math.random() * (r.h - 10),
          vx: (Math.random() - 0.5) * 0.08,
          vy: (Math.random() - 0.5) * 0.08,
        };
      }
    });

    const cell = 8;
    const draw = () => {
      ctx.fillStyle = "#070d14";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      Object.entries(ROOMS).forEach(([id, r]) => {
        const blocked = state.rooms[id as keyof typeof state.rooms]?.blocked;
        const pulse = blocked ? 0.4 + 0.3 * Math.sin(Date.now() / 250) : 1;
        ctx.globalAlpha = pulse;
        ctx.fillStyle = "#101820";
        ctx.fillRect(r.x * cell, r.y * cell, r.w * cell, r.h * cell);
        ctx.strokeStyle = blocked ? "#3b82f6" : "#2EE6C9";
        ctx.lineWidth = 2;
        ctx.strokeRect(r.x * cell, r.y * cell, r.w * cell, r.h * cell);
        ctx.globalAlpha = 1;
        ctx.fillStyle = "#2EE6C9";
        ctx.font = "10px monospace";
        ctx.fillText(r.label, r.x * cell + 6, r.y * cell + 12);
      });

      state.seats.forEach((s) => {
        const r = ROOMS[s.room];
        const p = pos.current[s.id];
        if (s.wander && s.status !== "watch") {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < r.x + 2 || p.x > r.x + r.w - 3) p.vx *= -1;
          if (p.y < r.y + 4 || p.y > r.y + r.h - 3) p.vy *= -1;
        }
        const px = p.x * cell;
        const py = p.y * cell;
        ctx.fillStyle = s.color;
        ctx.fillRect(px, py, 10, 10);
        ctx.fillStyle = "#0B1A2A";
        ctx.fillRect(px + 2, py + 3, 2, 2);
        ctx.fillRect(px + 6, py + 3, 2, 2);
        if (s.line) {
          ctx.fillStyle = "#d9e1e8";
          ctx.font = "9px monospace";
          const text = s.line.slice(0, 42);
          const w = ctx.measureText(text).width + 8;
          ctx.fillRect(px - 4, py - 16, w, 14);
          ctx.fillStyle = "#0B1A2A";
          ctx.fillText(text, px, py - 6);
        }
      });
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [state]);

  const c = useMemo(() => (state ? counts(state.seats) : { work: 0, block: 0, idle: 0 }), [state]);
  const sop = state?.metrics.sop ?? (state ? Math.round((c.work / 10) * 100) : 0);

  if (!state) {
    return (
      <main className="min-h-screen bg-[#0B1A2A] text-[#2EE6C9] font-mono p-6">
        Loading floor…
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0B1A2A] text-[#D9E1E8] font-mono p-3 md:p-4">
      <header className="flex flex-wrap items-center gap-3 mb-3">
        <h1 className="text-[#2EE6C9] tracking-widest text-sm md:text-base">
          VANTAGE ROCK: FLOOR — C-SUITE OPS
        </h1>
        <span className="bg-green-500 text-black text-xs font-bold px-2 py-0.5">LIVE</span>
        <span className="text-xs opacity-70 ml-auto">{clock} · Phoenix</span>
        <span className="text-xs">Seats 10 · Work {c.work} · Block {c.block} · Idle {c.idle}</span>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_220px] gap-3">
        <aside className="border border-[#3A4A5A] p-2 space-y-1 text-xs">
          {state.seats.map((s) => (
            <div key={s.id} className="flex items-center gap-2">
              <span className="inline-block w-2 h-2" style={{ background: s.color }} />
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

        <div className="border border-[#2EE6C9]/40 overflow-hidden bg-[#070d14]">
          <canvas ref={canvasRef} width={768} height={576} className="w-full h-auto" />
        </div>

        <aside className="border border-[#3A4A5A] p-2 text-xs space-y-3">
          <div>
            <p className="text-[#2EE6C9]">SOP</p>
            <div className="h-2 bg-[#101820] mt-1">
              <div className="h-2 bg-[#2EE6C9]" style={{ width: `${sop}%` }} />
            </div>
            <p className="opacity-70 mt-1">{sop}% seats working</p>
          </div>
          <div>
            <p className="text-[#2EE6C9]">CASH</p>
            <p>{state.metrics.cash == null ? "BLK — no QBO" : String(state.metrics.cash)}</p>
          </div>
          <div>
            <p className="text-[#2EE6C9]">FOUNDER UTIL</p>
            <p>Target {state.metrics.founderUtilTarget}%</p>
            <p>Actual {state.metrics.founderUtilActual == null ? "— (no books yet)" : `${state.metrics.founderUtilActual}%`}</p>
          </div>
          <p className="opacity-50 leading-snug">
            Cash and runway stay blank until QBO is on. No fake numbers.
          </p>
        </aside>
      </div>

      <footer className="mt-3 border border-[#3A4A5A] p-2 h-28 overflow-y-auto text-[11px] space-y-1">
        {state.dialogue.slice(-12).map((d, i) => (
          <p key={i}>
            <span className="opacity-50">[{d.ts}]</span>{" "}
            <span className="text-[#2EE6C9]">{d.who}:</span> {d.text}
          </p>
        ))}
      </footer>
    </main>
  );
}
