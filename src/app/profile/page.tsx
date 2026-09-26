"use client";

import { useState } from "react";

// ── Icons ─────────────────────────────────────────────────────────────────────

function IconEdit() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}
function IconX() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
function IconCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
      strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
function IconUser() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
function IconMail() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}
function IconBriefcase() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}
function IconCalendar() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
function IconShield() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

// ── Dummy profile data ────────────────────────────────────────────────────────

interface UserProfile {
  name: string;
  email: string;
  role: string;
  department: string;
  joinedAt: string;
  phone: string;
  location: string;
}

const DUMMY_PROFILE: UserProfile = {
  name:       "John Doe",
  email:      "john.doe@stocksense.io",
  role:       "Warehouse Manager",
  department: "Operations",
  joinedAt:   "2024-01-15",
  phone:      "+213 555 0100",
  location:   "Algiers, Algeria",
};

// ── Shared input style ────────────────────────────────────────────────────────

const inputCls =
  "w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900/60 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition";

const labelCls = "block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5";

// ── Info row (display mode) ───────────────────────────────────────────────────

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-4 py-3 border-b border-slate-100 dark:border-slate-700 last:border-0">
      <span className="text-slate-400 dark:text-slate-500 mt-0.5 shrink-0">{icon}</span>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
        <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mt-0.5">{value}</p>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>(DUMMY_PROFILE);
  const [editing, setEditing] = useState(false);
  // Draft held separately so cancel discards changes
  const [draft, setDraft]     = useState<UserProfile>(DUMMY_PROFILE);
  const [saved, setSaved]     = useState(false);

  function startEdit() {
    setDraft({ ...profile });
    setEditing(true);
  }

  function cancelEdit() {
    setEditing(false);
  }

  function saveEdit() {
    setProfile({ ...draft });
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function setField(key: keyof UserProfile, value: string) {
    setDraft((prev) => ({ ...prev, [key]: value }));
  }

  const joinedFormatted = new Date(profile.joinedAt).toLocaleDateString("en-GB", {
    day: "2-digit", month: "long", year: "numeric",
  });

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* ── Header ── */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">My Profile</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            View and manage your account information.
          </p>
        </div>
        {saved && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700 text-xs font-medium text-emerald-700 dark:text-emerald-300">
            <IconCheck /> Profile updated
          </span>
        )}
      </div>

      {/* ── Avatar + name card ── */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 flex items-center gap-5">
        {/* Avatar */}
        <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-bold select-none shrink-0">
          {profile.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100 truncate">{profile.name}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{profile.role}</p>
          <span className="inline-flex items-center mt-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
            {profile.department}
          </span>
        </div>
        {/* Edit / Cancel button */}
        {!editing ? (
          <button
            onClick={startEdit}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition shadow-sm shrink-0"
          >
            <IconEdit /> Edit Profile
          </button>
        ) : (
          <button
            onClick={cancelEdit}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-700 transition shrink-0"
          >
            <IconX /> Cancel
          </button>
        )}
      </div>

      {/* ── Info / Edit card ── */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            {editing ? "Edit Information" : "Account Information"}
          </h3>
        </div>

        {editing ? (
          /* ── Edit form ── */
          <div className="px-6 py-5 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="prof-name" className={labelCls}>Full Name</label>
                <input
                  id="prof-name"
                  type="text"
                  value={draft.name}
                  onChange={(e) => setField("name", e.target.value)}
                  className={inputCls}
                />
              </div>
              <div>
                <label htmlFor="prof-email" className={labelCls}>Email Address</label>
                <input
                  id="prof-email"
                  type="email"
                  value={draft.email}
                  onChange={(e) => setField("email", e.target.value)}
                  className={inputCls}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="prof-role" className={labelCls}>Role / Title</label>
                <input
                  id="prof-role"
                  type="text"
                  value={draft.role}
                  onChange={(e) => setField("role", e.target.value)}
                  className={inputCls}
                />
              </div>
              <div>
                <label htmlFor="prof-dept" className={labelCls}>Department</label>
                <input
                  id="prof-dept"
                  type="text"
                  value={draft.department}
                  onChange={(e) => setField("department", e.target.value)}
                  className={inputCls}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="prof-phone" className={labelCls}>Phone</label>
                <input
                  id="prof-phone"
                  type="tel"
                  value={draft.phone}
                  onChange={(e) => setField("phone", e.target.value)}
                  className={inputCls}
                />
              </div>
              <div>
                <label htmlFor="prof-location" className={labelCls}>Location</label>
                <input
                  id="prof-location"
                  type="text"
                  value={draft.location}
                  onChange={(e) => setField("location", e.target.value)}
                  className={inputCls}
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={saveEdit}
                className="flex items-center gap-2 px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition shadow-sm"
              >
                <IconCheck /> Save Changes
              </button>
            </div>
          </div>
        ) : (
          /* ── Display mode ── */
          <div className="px-6 py-2">
            <InfoRow icon={<IconUser />}      label="Full Name"   value={profile.name}     />
            <InfoRow icon={<IconMail />}      label="Email"       value={profile.email}    />
            <InfoRow icon={<IconBriefcase />} label="Role"        value={profile.role}     />
            <InfoRow icon={<IconBriefcase />} label="Department"  value={profile.department}/>
            <InfoRow icon={<IconUser />}      label="Phone"       value={profile.phone}    />
            <InfoRow icon={<IconUser />}      label="Location"    value={profile.location} />
            <InfoRow icon={<IconCalendar />}  label="Member Since" value={joinedFormatted} />
          </div>
        )}
      </div>

      {/* ── Security / Account card ── */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Account &amp; Security</h3>
        </div>
        <div className="px-6 py-4 space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <span className="text-slate-400 dark:text-slate-500"><IconShield /></span>
              <div>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">Password</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Last changed never (demo account)</p>
              </div>
            </div>
            <button className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline transition">
              Change
            </button>
          </div>
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <span className="text-slate-400 dark:text-slate-500"><IconCalendar /></span>
              <div>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">Account created</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{joinedFormatted}</p>
              </div>
            </div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
              Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
