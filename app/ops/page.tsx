import FloorClient from "./FloorClient";

export const dynamic = "force-dynamic";
export const metadata = { title: "Ops floor · Vantage Rock", robots: { index: false, follow: false } };

export default function OpsPage() {
  return <FloorClient />;
}
