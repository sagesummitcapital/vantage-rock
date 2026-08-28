"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function OpsLogin() {
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const router = useRouter();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setErr("");
    const res = await fetch("/api/ops/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) {
      setErr("Wrong password.");
      return;
    }
    router.replace("/ops");
  }

  return (
    <main className="min-h-screen bg-[#0B1A2A] text-[#D9E1E8] flex items-center justify-center font-mono">
      <form onSubmit={onSubmit} className="w-full max-w-sm border border-[#2EE6C9]/40 p-6 space-y-4">
        <p className="text-[#2EE6C9] text-xs tracking-[0.3em]">VANTAGE ROCK · OPS</p>
        <h1 className="text-lg">Private floor</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          className="w-full bg-[#0F1115] border border-[#3A4A5A] px-3 py-2 outline-none focus:border-[#2EE6C9]"
          placeholder="Password"
        />
        {err && <p className="text-red-400 text-sm">{err}</p>}
        <button type="submit" className="w-full bg-[#2EE6C9] text-[#0B1A2A] py-2 font-semibold">
          Enter
        </button>
      </form>
    </main>
  );
}
