import { getIronSession, type SessionOptions } from "iron-session";
import { cookies } from "next/headers";

export type SessionUser = { id: string; name: string; email: string };
export type SessionData = { user?: SessionUser };

const password = process.env.SESSION_PASSWORD;
if (!password || password.length < 32) {
  if (process.env.NODE_ENV === "production") {
    throw new Error("SESSION_PASSWORD must be at least 32 characters.");
  }
}

const sessionOptions: SessionOptions = {
  cookieName: "volt_session",
  password: password && password.length >= 32 ? password : "local-development-session-password-change-me-123456",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/"
  }
};

export async function getSession() {
  return getIronSession<SessionData>(await cookies(), sessionOptions);
}
