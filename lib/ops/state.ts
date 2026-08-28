import type { OpsState, SeatPatch } from "./types";

const seed = (): OpsState => {
  const now = new Date().toISOString();
  return {
    updatedAt: now,
    timezone: "America/Phoenix",
    visibility: "private-full-truth",
    seats: [
      {
        id: "stavros",
        name: "STAVROS",
        role: "Founder",
        color: "#e8c547",
        status: "watch",
        room: "briefing",
        line: "Don't ping me unless it's on fire.",
        wander: false,
        updatedAt: now,
        tasks: [{ id: "stavros-1", title: "Stay off Slack unless it's on fire", status: "doing" }],
      },
      {
        id: "rockbot",
        name: "ROCKBOT",
        role: "Chief of Staff",
        color: "#2EE6C9",
        status: "working",
        room: "briefing",
        line: "Weekday brief 8:37 Phoenix. Three bullets.",
        wander: true,
        updatedAt: now,
        tasks: [
          { id: "rockbot-1", title: "Weekday brief 8:37 Phoenix — three bullets", status: "doing" },
          { id: "rockbot-2", title: "Live floor feed + seat patches", status: "doing" },
        ],
      },
      {
        id: "ceo",
        name: "CEO",
        role: "Growth",
        color: "#f59e3b",
        status: "working",
        room: "growth",
        line: "ICP + offer map. Need COO capacity + CFO pricing.",
        wander: true,
        updatedAt: now,
        tasks: [
          { id: "ceo-1", title: "ICP + offer map", status: "doing" },
          { id: "ceo-2", title: "Need COO capacity + CFO pricing", status: "blocked" },
        ],
      },
      {
        id: "cso",
        name: "CSO",
        role: "Sales",
        color: "#fb923c",
        status: "idle",
        room: "lounge",
        wander: true,
        updatedAt: now,
        tasks: [{ id: "cso-1", title: "Wait on ICP before outbound", status: "queued" }],
      },
      {
        id: "coo",
        name: "COO",
        role: "Ops",
        color: "#4ade80",
        status: "working",
        room: "ops",
        line: "Diagnostic SOP + 30-day onboarding. Util < 70%.",
        wander: true,
        updatedAt: now,
        tasks: [
          { id: "coo-1", title: "Diagnostic SOP", status: "doing" },
          { id: "coo-2", title: "30-day onboarding", status: "queued" },
          { id: "coo-3", title: "Keep founder util under 70%", status: "doing" },
        ],
      },
      {
        id: "cfo",
        name: "CFO",
        role: "Finance",
        color: "#60a5fa",
        status: "blocked",
        room: "finance",
        line: "No QBO feed. I will not sign a runway number.",
        wander: false,
        blocker: "qbo",
        updatedAt: now,
        tasks: [
          { id: "cfo-1", title: "Connect QBO feed", status: "blocked" },
          { id: "cfo-2", title: "Cash / runway (no fake numbers)", status: "blocked" },
        ],
      },
      {
        id: "cmo",
        name: "CMO",
        role: "Marketing",
        color: "#f472b6",
        status: "working",
        room: "marketing",
        line: "3 LinkedIn drafts in. Holding for Stavros.",
        wander: true,
        updatedAt: now,
        tasks: [
          { id: "cmo-1", title: "3 LinkedIn drafts in", status: "done" },
          { id: "cmo-2", title: "Hold for Stavros review", status: "queued" },
        ],
      },
      {
        id: "cto",
        name: "CTO",
        role: "Tech",
        color: "#c084fc",
        status: "idle",
        room: "tech",
        line: "ON sagesummitcapital/vantage-rock.",
        wander: true,
        updatedAt: now,
        tasks: [
          { id: "cto-1", title: "Repo sagesummitcapital/vantage-rock ON", status: "done" },
          { id: "cto-2", title: "Ops floor click + live seats", status: "queued" },
        ],
      },
      {
        id: "ea",
        name: "EA",
        role: "Calendar",
        color: "#facc15",
        status: "working",
        room: "calendar",
        line: "8-9 PIPE, 9-11 DELIV, 11-12 PROS. GOOGLE-ON.",
        wander: true,
        updatedAt: now,
        tasks: [
          { id: "ea-1", title: "Blocks: 8-9 PIPE / 9-11 DELIV / 11-12 PROS", status: "doing" },
          { id: "ea-2", title: "Google Calendar + Gmail + Drive ON", status: "done" },
        ],
      },
      {
        id: "hr",
        name: "HR",
        role: "People",
        color: "#f87171",
        status: "working",
        room: "people",
        line: "Live floor, not a pyramid. Iterating as seats work.",
        wander: true,
        updatedAt: now,
        tasks: [
          { id: "hr-1", title: "Live floor, not a pyramid", status: "doing" },
          { id: "hr-2", title: "Iterate seats as they work", status: "doing" },
        ],
      },
    ],
    rooms: {
      briefing: { blocked: false },
      growth: { blocked: false, note: "ICP + offer map" },
      ops: { blocked: false },
      people: { blocked: false },
      calendar: { blocked: false, note: "Google on 11:46 PT" },
      marketing: { blocked: false },
      tech: { blocked: false },
      finance: { blocked: true, note: "No QBO feed" },
      lounge: { blocked: false },
    },
    metrics: {
      visual: 80,
      sop: 20,
      cash: null,
      calendar: "on",
      founderUtilTarget: 70,
      founderUtilActual: null,
    },
    connections: {
      google: {
        calendar: true,
        gmail: true,
        drive: true,
        since: "2026-08-28T11:46:00-07:00",
      },
      github: { account: "sagesummitcapital", repo: "vantage-rock", connected: true },
      qbo: false,
      mercury: "ready-not-signed",
      stripe: "ready-not-signed",
    },
    rules: ["Cash and runway blank until QBO.", "No fake numbers.", "Private full-truth only."],
    dialogue: [
      { ts: "11:45:03", who: "CFO", text: "Mercury and Stripe can connect. No QBO feed. Cash/runway stay blank." },
      { ts: "11:46:00", who: "EA", text: "Google Calendar, Gmail, Drive authenticated. Fri Aug 28, 11:46 PT." },
      { ts: "11:50:18", who: "ROCKBOT", text: "Use the live floor, not the cartoon. Iterate as seats work." },
      { ts: "11:53:40", who: "STAVROS", text: "When I say visual, I mean the viral X live screen. Agents moving. Graphs." },
      { ts: "11:57:40", who: "CMO", text: "Three LinkedIn drafts in. On hold for Stavros." },
    ],
  };
};

let memory: OpsState | null = null;

async function kvGet(): Promise<OpsState | null> {
  const url = process.env.OPS_KV_REST_URL;
  const token = process.env.OPS_KV_REST_TOKEN;
  if (!url || !token) return null;
  try {
    const res = await fetch(`${url}/get/vr-ops-state`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data?.result) return null;
    return JSON.parse(data.result) as OpsState;
  } catch {
    return null;
  }
}

async function kvSet(state: OpsState) {
  const url = process.env.OPS_KV_REST_URL;
  const token = process.env.OPS_KV_REST_TOKEN;
  if (!url || !token) return;
  await fetch(`${url}/set/vr-ops-state`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(state),
  });
}

export async function getState(): Promise<OpsState> {
  if (memory) return memory;
  const fromKv = await kvGet();
  memory = fromKv ?? seed();
  return memory;
}

function applyPatch(state: OpsState, patch: SeatPatch): OpsState {
  const now = new Date().toISOString();
  const seats = state.seats.map((s) => {
    if (s.id !== patch.id) return s;
    return {
      ...s,
      status: patch.status ?? s.status,
      room: patch.room ?? s.room,
      wander: patch.wander ?? s.wander,
      line: patch.line === null ? undefined : patch.line ?? s.line,
      blocker: patch.blocker === null ? undefined : patch.blocker ?? s.blocker,
      tasks: patch.tasks !== undefined ? patch.tasks : s.tasks,
      updatedAt: now,
    };
  });
  const rooms = { ...state.rooms };
  const seat = seats.find((s) => s.id === patch.id);
  if (seat) {
    rooms[seat.room] = {
      ...rooms[seat.room],
      blocked: seat.status === "blocked",
    };
  }
  const dialogue = [...state.dialogue];
  if (patch.dialogue) {
    const ts = new Date().toLocaleTimeString("en-US", {
      timeZone: "America/Phoenix",
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    dialogue.push({ ts, who: patch.dialogue.who, text: patch.dialogue.text });
    if (dialogue.length > 40) dialogue.splice(0, dialogue.length - 40);
  }
  return { ...state, seats, rooms, dialogue, updatedAt: now };
}

export async function patchState(patch: SeatPatch): Promise<OpsState> {
  return patchStates([patch]);
}

export async function patchStates(patches: SeatPatch[]): Promise<OpsState> {
  let state = await getState();
  for (const patch of patches) {
    state = applyPatch(state, patch);
  }
  memory = state;
  await kvSet(memory);
  return memory;
}
