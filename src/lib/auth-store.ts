/**
 * Client-side auth store (prototype).
 *
 * Accounts and the active session are persisted in localStorage so that
 * sign-up → log-out → log-in works across refreshes. Passwords are stored as
 * salted SHA-256 hashes, never in plain text.
 *
 * IMPORTANT: this is a front-end prototype. For production, replace this
 * module with a real backend (e.g. NestJS/Django + PostgreSQL, or Supabase /
 * Auth.js) with httpOnly session cookies, Termii/WhatsApp OTP and Google OAuth.
 */

export type UserRole = "couple" | "vendor" | "admin";

export interface StoredAccount {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  passwordHash: string;
  createdAt: string;
}

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
}

const ACCOUNTS_KEY = "fidale_accounts_v1";
const SESSION_KEY = "fidale_session_v1";
const SALT = "fidale-events::";

export const DEMO_ACCOUNTS: { label: string; email: string; password: string; role: UserRole; name: string; phone: string }[] = [
  {
    label: "Couple",
    name: "Adaeze & Tunde",
    email: "couple@fidale.demo",
    password: "Couple@2026",
    role: "couple",
    phone: "+234 803 555 0192",
  },
  {
    label: "Vendor",
    name: "Bimpe Onakoya Bridal Artistry",
    email: "vendor@fidale.demo",
    password: "Vendor@2026",
    role: "vendor",
    phone: "+234 802 111 2233",
  },
  {
    label: "Admin",
    name: "Fidale Ops Admin",
    email: "admin@fidale.demo",
    password: "Admin@2026",
    role: "admin",
    phone: "+234 809 000 0001",
  },
];

async function hashPassword(password: string): Promise<string> {
  const data = new TextEncoder().encode(SALT + password);
  if (typeof crypto !== "undefined" && crypto.subtle) {
    const buf = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }
  // Fallback (non-secure contexts): simple FNV-1a hash
  let h = 0x811c9dc5;
  for (const byte of data) {
    h ^= byte;
    h = Math.imul(h, 0x01000193);
  }
  return `fnv-${(h >>> 0).toString(16)}`;
}

function readAccounts(): StoredAccount[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || "[]");
  } catch {
    return [];
  }
}

function writeAccounts(accounts: StoredAccount[]) {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

function toSession(a: StoredAccount): SessionUser {
  return { id: a.id, name: a.name, email: a.email, phone: a.phone, role: a.role };
}

function normaliseEmail(email: string) {
  return email.trim().toLowerCase();
}

function normalisePhone(phone: string) {
  return phone.replace(/[^\d+]/g, "");
}

/** Seed the demo accounts once so testers can log in immediately. */
export async function ensureDemoAccounts() {
  const accounts = readAccounts();
  let changed = false;
  for (const demo of DEMO_ACCOUNTS) {
    if (!accounts.some((a) => a.email === demo.email)) {
      accounts.push({
        id: `u-demo-${demo.role}`,
        name: demo.name,
        email: demo.email,
        phone: demo.phone,
        role: demo.role,
        passwordHash: await hashPassword(demo.password),
        createdAt: new Date().toISOString(),
      });
      changed = true;
    }
  }
  if (changed) writeAccounts(accounts);
}

export function getSession(): SessionUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY) || sessionStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as SessionUser) : null;
  } catch {
    return null;
  }
}

function setSession(user: SessionUser, remember: boolean) {
  const raw = JSON.stringify(user);
  if (remember) {
    localStorage.setItem(SESSION_KEY, raw);
    sessionStorage.removeItem(SESSION_KEY);
  } else {
    sessionStorage.setItem(SESSION_KEY, raw);
    localStorage.removeItem(SESSION_KEY);
  }
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem(SESSION_KEY);
}

export type AuthResult = { ok: true; user: SessionUser } | { ok: false; error: string };

export async function signUpWithEmail(input: {
  name: string;
  email: string;
  phone?: string;
  password: string;
  role: Exclude<UserRole, "admin">;
}): Promise<AuthResult> {
  const email = normaliseEmail(input.email);
  if (!input.name.trim()) return { ok: false, error: "Please enter your name." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: "Please enter a valid email address." };
  if (input.password.length < 8) return { ok: false, error: "Password must be at least 8 characters." };

  const accounts = readAccounts();
  if (accounts.some((a) => a.email === email)) {
    return { ok: false, error: "An account with this email already exists. Try logging in instead." };
  }

  const account: StoredAccount = {
    id: `u-${Date.now()}`,
    name: input.name.trim(),
    email,
    phone: input.phone?.trim() && input.phone.trim() !== "+234" ? input.phone.trim() : undefined,
    role: input.role,
    passwordHash: await hashPassword(input.password),
    createdAt: new Date().toISOString(),
  };
  writeAccounts([...accounts, account]);
  const user = toSession(account);
  setSession(user, true);
  return { ok: true, user };
}

export async function logInWithEmail(email: string, password: string, remember = true): Promise<AuthResult> {
  const accounts = readAccounts();
  const account = accounts.find((a) => a.email === normaliseEmail(email));
  if (!account) return { ok: false, error: "No account found with that email. Check the spelling or sign up." };
  if (account.passwordHash !== (await hashPassword(password))) {
    return { ok: false, error: "Incorrect password. Please try again." };
  }
  const user = toSession(account);
  setSession(user, remember);
  return { ok: true, user };
}

/* ---------------- Phone OTP (simulated) ---------------- */

const pendingOtps = new Map<string, { code: string; expires: number }>();

/**
 * Generates a 6-digit code. In production this would be sent via Termii /
 * WhatsApp Business API; in the prototype we return it so the UI can show it.
 */
export function requestPhoneOtp(phone: string): { ok: true; demoCode: string } | { ok: false; error: string } {
  const key = normalisePhone(phone);
  const account = readAccounts().find((a) => a.phone && normalisePhone(a.phone) === key);
  if (!account) return { ok: false, error: "No account is linked to this phone number." };
  const code = String(Math.floor(100000 + Math.random() * 900000));
  pendingOtps.set(key, { code, expires: Date.now() + 5 * 60 * 1000 });
  return { ok: true, demoCode: code };
}

export function verifyPhoneOtp(phone: string, code: string, remember = true): AuthResult {
  const key = normalisePhone(phone);
  const pending = pendingOtps.get(key);
  if (!pending) return { ok: false, error: "Please request a code first." };
  if (Date.now() > pending.expires) return { ok: false, error: "This code has expired. Request a new one." };
  if (pending.code !== code.trim()) return { ok: false, error: "Incorrect code. Please check and try again." };
  pendingOtps.delete(key);
  const account = readAccounts().find((a) => a.phone && normalisePhone(a.phone) === key);
  if (!account) return { ok: false, error: "Account not found." };
  const user = toSession(account);
  setSession(user, remember);
  return { ok: true, user };
}

export function homePathForRole(role: UserRole) {
  return role === "admin" ? "/admin" : role === "vendor" ? "/vendor-dashboard" : "/dashboard";
}
