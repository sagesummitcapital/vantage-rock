export type SeatStatus = "working" | "blocked" | "idle" | "watch";

export type SeatId =
  | "stavros"
  | "rockbot"
  | "ceo"
  | "cso"
  | "coo"
  | "cfo"
  | "cmo"
  | "cto"
  | "ea"
  | "hr";

export type RoomId =
  | "briefing"
  | "growth"
  | "ops"
  | "people"
  | "calendar"
  | "marketing"
  | "tech"
  | "finance"
  | "lounge";

export interface Seat {
  id: SeatId;
  name: string;
  role: string;
  color: string;
  status: SeatStatus;
  room: RoomId;
  line?: string;
  wander: boolean;
  blocker?: string;
}

export interface RoomState {
  blocked: boolean;
  note?: string;
}

export interface DialogueLine {
  ts: string;
  who: string;
  text: string;
}

export interface OpsState {
  updatedAt: string;
  timezone: "America/Phoenix";
  visibility: "private-full-truth";
  seats: Seat[];
  rooms: Record<RoomId, RoomState>;
  metrics: {
    visual: number | null;
    sop: number | null;
    cash: null | number | string;
    calendar: "on" | "off";
    founderUtilTarget: number;
    founderUtilActual: number | null;
  };
  connections: {
    google: {
      calendar: boolean;
      gmail: boolean;
      drive: boolean;
      since: string;
    };
    github: {
      account: string;
      repo: string;
      connected: boolean;
    };
    qbo: boolean;
    mercury?: "ready-not-signed";
    stripe?: "ready-not-signed";
  };
  rules?: string[];
  dialogue: DialogueLine[];
}

export interface SeatPatch {
  id: SeatId;
  status?: SeatStatus;
  room?: RoomId;
  line?: string | null;
  wander?: boolean;
  blocker?: string | null;
  dialogue?: { who: string; text: string };
}
