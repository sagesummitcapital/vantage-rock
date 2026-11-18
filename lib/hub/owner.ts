// Only the emails in HUB_OWNER_EMAILS (comma-separated) may open the hub, even if someone
// else manages to create a Clerk account. Unlike Moonbag, an empty list locks everyone out:
// this hub holds personal financial data, so it fails closed.
import { currentUser } from "@clerk/nextjs/server";

export function ownerEmails(): string[] {
  return (process.env.HUB_OWNER_EMAILS ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

export async function getHubAccess() {
  const user = await currentUser();
  const emails = (user?.emailAddresses ?? []).map((e) => e.emailAddress.toLowerCase());
  const allow = ownerEmails();
  const allowlistSet = allow.length > 0;
  const allowed = Boolean(user) && allowlistSet && emails.some((e) => allow.includes(e));
  return { user, emails, allowed, allowlistSet };
}

/** Throws unless the signed-in user is on the owner list. Use at the top of every server action. */
export async function requireOwner() {
  const access = await getHubAccess();
  if (!access.allowed) throw new Error("Not allowed");
  return access;
}
