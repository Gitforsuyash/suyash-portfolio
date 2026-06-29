import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { defaultContent, STORAGE_KEY } from "../data";
import {
  currentEmail,
  isSupabaseConfigured,
  saveContent,
  signIn,
  signOut,
} from "../lib/supabase";

// Your admin passphrase. Set it privately in a .env file as
//   VITE_ADMIN_PASS=your-secret
// (kept out of git via .gitignore). Falls back to a default if unset.
// Note: this gate protects the editor UI; what visitors see only changes when
// YOU publish/redeploy, which requires your hosting login.
const ADMIN_PASS =
  (import.meta.env.VITE_ADMIN_PASS as string | undefined) || "suyash-admin";

const clone = <T,>(v: T): T => JSON.parse(JSON.stringify(v));

function loadInitial() {
  let saved = {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) saved = JSON.parse(raw);
  } catch {
    /* ignore */
  }
  return clone({ ...defaultContent, ...saved });
}

/* ---------- small reusable fields ---------- */

function Text({
  label,
  value,
  onChange,
  area = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  area?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-slate-500">{label}</span>
      {area ? (
        <textarea
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="w-full resize-y rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-900"
        />
      ) : (
        <input
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-900"
        />
      )}
    </label>
  );
}

function StringList({
  label,
  items,
  onChange,
}: {
  label: string;
  items: string[];
  onChange: (v: string[]) => void;
}) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <span className="text-xs font-medium text-slate-500">{label}</span>
        <button
          type="button"
          onClick={() => onChange([...(items ?? []), ""])}
          className="rounded-md bg-slate-900 px-2 py-0.5 text-xs font-medium text-white hover:bg-slate-700"
        >
          + Add
        </button>
      </div>
      <div className="space-y-1.5">
        {(items ?? []).map((it, i) => (
          <div key={i} className="flex gap-2">
            <input
              value={it}
              onChange={(e) => {
                const n = [...items];
                n[i] = e.target.value;
                onChange(n);
              }}
              className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-900 outline-none focus:border-slate-900"
            />
            <button
              type="button"
              onClick={() => onChange(items.filter((_, j) => j !== i))}
              className="rounded-lg border border-slate-300 px-2 text-sm text-slate-500 hover:bg-slate-100"
              aria-label="Remove"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-8">
      <h2 className="mb-3 border-b border-slate-200 pb-2 text-lg font-bold text-slate-900">
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function ArrayEditor({
  items,
  onChange,
  blank,
  label,
  render,
}: {
  items: any[];
  onChange: (v: any[]) => void;
  blank: () => any;
  label: string;
  render: (item: any, set: (patch: any) => void) => ReactNode;
}) {
  return (
    <div className="space-y-3">
      {(items ?? []).map((item, i) => (
        <div
          key={i}
          className="relative rounded-xl border border-slate-200 bg-slate-50 p-4"
        >
          <button
            type="button"
            onClick={() => onChange(items.filter((_, j) => j !== i))}
            className="absolute right-3 top-3 rounded-md border border-slate-300 bg-white px-2 py-0.5 text-xs text-slate-500 hover:bg-red-50 hover:text-red-600"
          >
            Remove
          </button>
          <div className="space-y-3 pr-16">
            {render(item, (patch) => {
              const n = [...items];
              n[i] = { ...item, ...patch };
              onChange(n);
            })}
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...(items ?? []), blank()])}
        className="rounded-lg border border-dashed border-slate-400 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
      >
        + Add {label}
      </button>
    </div>
  );
}

/* ---------- the editor ---------- */

export default function Admin() {
  const [authed, setAuthed] = useState(
    () => !isSupabaseConfigured && sessionStorage.getItem("adminAuthed") === "1"
  );
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [authErr, setAuthErr] = useState("");
  const [content, setContent] = useState<any>(loadInitial);
  const [saved, setSaved] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // Restore an existing Supabase session (so you stay logged in).
  useEffect(() => {
    if (isSupabaseConfigured) {
      currentEmail()
        .then((e) => e && setAuthed(true))
        .catch(() => {});
    }
  }, []);

  const set = (key: string, value: any) =>
    setContent((c: any) => ({ ...c, [key]: value }));
  const setProfile = (patch: any) =>
    set("profile", { ...content.profile, ...patch });
  const setPM = (patch: any) =>
    set("productManagement", { ...content.productManagement, ...patch });

  const dirty = useMemo(
    () => JSON.stringify(content) !== JSON.stringify(loadInitial()),
    [content]
  );

  const save = async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    if (isSupabaseConfigured) {
      try {
        await saveContent(content);
      } catch (e: any) {
        alert(
          "Saved on this device, but publishing live failed:\n" +
            (e?.message || e)
        );
        return;
      }
    }
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  };
  const logout = async () => {
    if (isSupabaseConfigured) {
      try {
        await signOut();
      } catch {
        /* ignore */
      }
    } else {
      sessionStorage.removeItem("adminAuthed");
    }
    setAuthed(false);
  };
  const exportJson = () => {
    const blob = new Blob([JSON.stringify(content, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "content.json";
    a.click();
    URL.revokeObjectURL(url);
  };
  const importJson = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        setContent(clone({ ...defaultContent, ...parsed }));
      } catch {
        alert("That file isn't valid JSON.");
      }
    };
    reader.readAsText(file);
  };
  const reset = () => {
    if (!confirm("Reset all content back to the original defaults?")) return;
    localStorage.removeItem(STORAGE_KEY);
    setContent(clone(defaultContent));
  };

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setAuthErr("");
            if (isSupabaseConfigured) {
              try {
                await signIn(email.trim(), pass);
                setAuthed(true);
              } catch (err: any) {
                setAuthErr(err?.message || "Sign-in failed.");
              }
            } else if (pass === ADMIN_PASS) {
              sessionStorage.setItem("adminAuthed", "1");
              setAuthed(true);
            } else {
              setAuthErr("Incorrect passphrase.");
            }
          }}
          className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-7 shadow-xl"
        >
          <h1 className="text-xl font-bold text-slate-900">Portfolio admin</h1>
          <p className="mt-1 text-sm text-slate-500">
            {isSupabaseConfigured
              ? "Sign in with your admin email and password."
              : "Enter your passphrase to edit your content."}
          </p>
          {isSupabaseConfigured && (
            <input
              type="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="mt-5 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900"
            />
          )}
          <input
            type="password"
            autoFocus={!isSupabaseConfigured}
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder={isSupabaseConfigured ? "Password" : "Passphrase"}
            className="mt-3 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900"
          />
          {authErr && <p className="mt-2 text-sm text-red-600">{authErr}</p>}
          <button
            type="submit"
            className="mt-3 w-full rounded-lg bg-slate-900 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
          >
            {isSupabaseConfigured ? "Sign in" : "Unlock"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      {/* sticky toolbar */}
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center gap-2 px-5 py-3">
          <h1 className="mr-auto text-base font-bold">
            Portfolio admin
            {dirty && (
              <span className="ml-2 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                unsaved
              </span>
            )}
            {saved && (
              <span className="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                saved ✓
              </span>
            )}
          </h1>
          <a
            href="/"
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium hover:bg-slate-100"
          >
            View site
          </a>
          <button
            onClick={logout}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium hover:bg-slate-100"
          >
            Log out
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && importJson(e.target.files[0])}
          />
          <button
            onClick={() => fileRef.current?.click()}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium hover:bg-slate-100"
          >
            Import
          </button>
          <button
            onClick={exportJson}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium hover:bg-slate-100"
          >
            Export
          </button>
          <button
            onClick={reset}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            Reset
          </button>
          <button
            onClick={save}
            className="rounded-lg bg-slate-900 px-4 py-1.5 text-sm font-semibold text-white hover:bg-slate-700"
          >
            Save
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-8">
        <p className="mb-6 rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-500">
          {isSupabaseConfigured ? (
            <>
              Connected to your live backend. Click <b>Save</b> and your changes
              go live for <b>everyone</b> instantly.
            </>
          ) : (
            <>
              Edits are saved in this browser. Click <b>Save</b>, then{" "}
              <b>View site</b> to see them. To publish for everyone, <b>Export</b>{" "}
              the file and update your deployment (or connect Supabase — ask
              Claude).
            </>
          )}
        </p>

        {/* PROFILE */}
        <Section title="Profile & contact">
          <Text label="Name" value={content.profile.name} onChange={(v) => setProfile({ name: v })} />
          <Text label="Headline / title" value={content.profile.title} onChange={(v) => setProfile({ title: v })} />
          <Text label="Location" value={content.profile.location} onChange={(v) => setProfile({ location: v })} />
          <Text label="Email" value={content.profile.email} onChange={(v) => setProfile({ email: v })} />
          <Text label="Summary" area value={content.profile.summary} onChange={(v) => setProfile({ summary: v })} />
          <StringList label="Rotating roles" items={content.profile.roles} onChange={(v) => setProfile({ roles: v })} />
          <Text label="LinkedIn URL" value={content.profile.socials.linkedin} onChange={(v) => setProfile({ socials: { ...content.profile.socials, linkedin: v } })} />
          <Text label="GitHub URL" value={content.profile.socials.github} onChange={(v) => setProfile({ socials: { ...content.profile.socials, github: v } })} />
          <Text label="Hugging Face URL" value={content.profile.socials.huggingface} onChange={(v) => setProfile({ socials: { ...content.profile.socials, huggingface: v } })} />
        </Section>

        {/* STATS */}
        <Section title="Hero stats">
          <ArrayEditor
            items={content.stats}
            onChange={(v) => set("stats", v)}
            label="stat"
            blank={() => ({ value: "", label: "" })}
            render={(item, s) => (
              <>
                <Text label="Value" value={item.value} onChange={(v) => s({ value: v })} />
                <Text label="Label" value={item.label} onChange={(v) => s({ label: v })} />
              </>
            )}
          />
        </Section>

        {/* EXPERIENCE */}
        <Section title="Work experience">
          <ArrayEditor
            items={content.experience}
            onChange={(v) => set("experience", v)}
            label="role"
            blank={() => ({ role: "", company: "", location: "", period: "", current: false, summary: "", points: [], tags: [] })}
            render={(item, s) => (
              <>
                <Text label="Role / title" value={item.role} onChange={(v) => s({ role: v })} />
                <Text label="Company" value={item.company} onChange={(v) => s({ company: v })} />
                <Text label="Location" value={item.location} onChange={(v) => s({ location: v })} />
                <Text label="Period" value={item.period} onChange={(v) => s({ period: v })} />
                <label className="flex items-center gap-2 text-sm text-slate-700">
                  <input type="checkbox" checked={!!item.current} onChange={(e) => s({ current: e.target.checked })} />
                  Current role
                </label>
                <Text label="Summary" area value={item.summary} onChange={(v) => s({ summary: v })} />
                <StringList label="Bullet points" items={item.points} onChange={(v) => s({ points: v })} />
                <StringList label="Tags" items={item.tags} onChange={(v) => s({ tags: v })} />
              </>
            )}
          />
        </Section>

        {/* PROJECTS */}
        <Section title="Projects">
          <ArrayEditor
            items={content.projects}
            onChange={(v) => set("projects", v)}
            label="project"
            blank={() => ({ title: "", blurb: "", tags: [], link: "", linkLabel: "" })}
            render={(item, s) => (
              <>
                <Text label="Title" value={item.title} onChange={(v) => s({ title: v })} />
                <Text label="Description" area value={item.blurb} onChange={(v) => s({ blurb: v })} />
                <StringList label="Tags" items={item.tags} onChange={(v) => s({ tags: v })} />
                <Text label="Link URL (optional)" value={item.link} onChange={(v) => s({ link: v })} />
                <Text label="Link label (optional)" value={item.linkLabel} onChange={(v) => s({ linkLabel: v })} />
              </>
            )}
          />
        </Section>

        {/* PRODUCT MANAGEMENT */}
        <Section title="Product Management">
          <Text label="Program title" value={content.productManagement.title} onChange={(v) => setPM({ title: v })} />
          <Text label="Provider" value={content.productManagement.provider} onChange={(v) => setPM({ provider: v })} />
          <Text label="Status" value={content.productManagement.status} onChange={(v) => setPM({ status: v })} />
          <Text label="Intro" area value={content.productManagement.intro} onChange={(v) => setPM({ intro: v })} />
          <StringList label="Takeaways" items={content.productManagement.takeaways} onChange={(v) => setPM({ takeaways: v })} />
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Lifecycle phases</p>
            <ArrayEditor
              items={content.productManagement.phases}
              onChange={(v) => setPM({ phases: v })}
              label="phase"
              blank={() => ({ label: "", detail: "" })}
              render={(item, s) => (
                <>
                  <Text label="Phase name" value={item.label} onChange={(v) => s({ label: v })} />
                  <Text label="Detail" area value={item.detail} onChange={(v) => s({ detail: v })} />
                </>
              )}
            />
          </div>
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Core competencies</p>
            <ArrayEditor
              items={content.productManagement.competencies}
              onChange={(v) => setPM({ competencies: v })}
              label="competency"
              blank={() => ({ title: "", points: [] })}
              render={(item, s) => (
                <>
                  <Text label="Title" value={item.title} onChange={(v) => s({ title: v })} />
                  <StringList label="Points" items={item.points} onChange={(v) => s({ points: v })} />
                </>
              )}
            />
          </div>
        </Section>

        {/* SKILLS */}
        <Section title="Skills & tools">
          <ArrayEditor
            items={content.skills}
            onChange={(v) => set("skills", v)}
            label="group"
            blank={() => ({ group: "", items: [] })}
            render={(item, s) => (
              <>
                <Text label="Group name" value={item.group} onChange={(v) => s({ group: v })} />
                <StringList label="Items" items={item.items} onChange={(v) => s({ items: v })} />
              </>
            )}
          />
        </Section>

        {/* CERTIFICATIONS */}
        <Section title="Certifications">
          <ArrayEditor
            items={content.certifications}
            onChange={(v) => set("certifications", v)}
            label="certification"
            blank={() => ({ name: "", issuer: "", note: "" })}
            render={(item, s) => (
              <>
                <Text label="Name" value={item.name} onChange={(v) => s({ name: v })} />
                <Text label="Issuer" value={item.issuer} onChange={(v) => s({ issuer: v })} />
                <Text label="Note (optional, e.g. In Progress)" value={item.note} onChange={(v) => s({ note: v })} />
              </>
            )}
          />
        </Section>

        {/* EDUCATION */}
        <Section title="Education">
          <Text label="Degree" value={content.education.degree} onChange={(v) => set("education", { ...content.education, degree: v })} />
          <Text label="School" value={content.education.school} onChange={(v) => set("education", { ...content.education, school: v })} />
          <Text label="Period" value={content.education.period} onChange={(v) => set("education", { ...content.education, period: v })} />
          <StringList label="Coursework" items={content.education.coursework} onChange={(v) => set("education", { ...content.education, coursework: v })} />
        </Section>

        <div className="sticky bottom-0 -mx-5 border-t border-slate-200 bg-white/90 px-5 py-3 backdrop-blur">
          <button
            onClick={save}
            className="w-full rounded-lg bg-slate-900 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
          >
            Save changes
          </button>
        </div>
      </main>
    </div>
  );
}
