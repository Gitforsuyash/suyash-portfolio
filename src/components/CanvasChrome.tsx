import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  CornerDownLeft,
  File,
  Menu,
  Mic,
  MousePointer2,
  Moon,
  PenTool,
  Play,
  Search,
  Smile,
  Square,
  Sun,
  X,
} from "lucide-react";
import { usePresenter } from "../hooks/usePresenter";

type Tool = "cursor" | "pen" | "file" | "emoji";

const sections = [
  {
    id: "home",
    label: "Home",
    line: "Hi, I'm Suyash — an AI engineer and product manager. I build and ship generative AI products end to end. Let me give you a quick tour. You can talk to me — just say things like, go to projects, or, tell me about your experience, anytime.",
  },
  {
    id: "about",
    label: "Who Am I",
    line: "First, a little about me. I sit between strategy and engineering, turning AI capabilities into products people actually use — across large language models, retrieval, and agentic systems.",
  },
  {
    id: "experience",
    label: "Experience",
    line: "I'm currently an AI engineer at SAS AI, where I'm product owner of the Hit to Lead drug discovery pipeline. I own everything from data and feature engineering, to model building with ML flow, to API design and implementation.",
  },
  {
    id: "product",
    label: "Product Management",
    line: "I've also driven end to end product management for a generative AI product — from market research and product requirement docs, to roadmap, metrics, and go to market — completely solo.",
  },
  {
    id: "projects",
    label: "Projects",
    line: "Here are a few things I've built. Brief AI, deployed on Hugging Face. A drug target efficacy predictor using graph neural networks. And a self driving car simulation with computer vision and deep learning.",
  },
  {
    id: "skills",
    label: "Skills",
    line: "My toolkit spans large language models, retrieval and agentic AI, graph and molecular machine learning, computer vision, and the full product management stack.",
  },
  {
    id: "credentials",
    label: "Credentials",
    line: "I hold certifications in product management for generative AI, Oracle cloud data science, and AI engineering.",
  },
  {
    id: "contact",
    label: "Contact",
    line: "That's the tour. If you'd like to work together, the best way to reach me is email — it's right here on the screen. Thanks for stopping by!",
  },
];

const EMOJIS = ["✨", "🚀", "🤖", "👋", "💡", "🔥", "🧠", "⚡", "🎯", "💜"];

const navMenu: (
  | { label: string; href: string }
  | { group: string; items: { label: string; href: string }[] }
)[] = [
  { label: "Home", href: "#home" },
  { label: "Who Am I", href: "#about" },
  {
    group: "Work",
    items: [
      { label: "Experience", href: "#experience" },
      { label: "Product Management", href: "#product" },
      { label: "Projects", href: "#projects" },
      { label: "Skills", href: "#skills" },
      { label: "Credentials", href: "#credentials" },
    ],
  },
  { label: "Contact", href: "#contact" },
];

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 70;
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
}

function currentIndex() {
  const y = window.scrollY + 90;
  let idx = 0;
  sections.forEach((s, i) => {
    const el = document.getElementById(s.id);
    if (el && el.getBoundingClientRect().top + window.scrollY - 70 <= y) idx = i;
  });
  return idx;
}

export default function CanvasChrome() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true);
  const [tool, setTool] = useState<Tool>("cursor");
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [stamps, setStamps] = useState<
    { id: number; x: number; y: number; char: string }[]
  >([]);

  const presenter = usePresenter(sections);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);
  const stampId = useRef(0);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  // keyboard: Cmd/Ctrl+K opens search, Esc closes overlays
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      } else if (e.key === "Escape") {
        setSearchOpen(false);
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // ---- AI Presenter (voice-driven guided tour) ----
  const startPresenter = () => {
    setOpen(false);
    setSearchOpen(false);
    presenter.start();
  };

  // ---- pen drawing ----
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const overlayActive = tool !== "cursor";

  const dropStamp = (x: number, y: number) => {
    const id = stampId.current++;
    setStamps((s) => [
      ...s,
      { id, x, y, char: EMOJIS[Math.floor(Math.random() * EMOJIS.length)] },
    ]);
    window.setTimeout(
      () => setStamps((s) => s.filter((st) => st.id !== id)),
      2200
    );
  };

  const onOverlayDown = (e: React.MouseEvent) => {
    if (tool === "pen") {
      drawing.current = true;
      last.current = { x: e.clientX, y: e.clientY };
    }
  };
  const onOverlayClick = (e: React.MouseEvent) => {
    if (tool === "emoji") dropStamp(e.clientX, e.clientY);
  };
  const onOverlayMove = (e: React.MouseEvent) => {
    if (tool !== "pen" || !drawing.current || !last.current) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.strokeStyle = dark ? "#f2f2f2" : "#161616";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(last.current.x, last.current.y);
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
    last.current = { x: e.clientX, y: e.clientY };
  };
  const onOverlayUp = () => {
    drawing.current = false;
    last.current = null;
  };

  const selectTool = (t: Tool) => {
    if (t === "pen" && tool === "pen") {
      // clicking pen again clears the canvas
      const ctx = canvasRef.current?.getContext("2d");
      ctx?.clearRect(0, 0, window.innerWidth, window.innerHeight);
      return;
    }
    if (t === "file") {
      scrollToId("projects");
      setTool("cursor");
      return;
    }
    setTool(t);
  };

  const filtered = sections.filter((s) =>
    s.label.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <>
      {/* ===== draw / stamp overlay ===== */}
      <div
        className={`fixed inset-0 z-30 ${
          overlayActive ? "pointer-events-auto" : "pointer-events-none"
        } ${tool === "pen" ? "cursor-crosshair" : ""} ${
          tool === "emoji" ? "cursor-pointer" : ""
        }`}
        onMouseDown={onOverlayDown}
        onMouseMove={onOverlayMove}
        onMouseUp={onOverlayUp}
        onMouseLeave={onOverlayUp}
        onClick={onOverlayClick}
      >
        <canvas
          ref={canvasRef}
          className="h-full w-full"
          style={{ width: "100%", height: "100%" }}
        />
        {stamps.map((s) => (
          <span
            key={s.id}
            className="stamp pointer-events-none absolute select-none text-3xl"
            style={{ left: s.x, top: s.y }}
          >
            {s.char}
          </span>
        ))}
      </div>

      {/* ===== top-left: menu button ===== */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="fixed left-4 top-4 z-50 grid h-12 w-12 place-items-center rounded-2xl border border-black/[0.06] bg-white text-ink shadow-[0_8px_24px_-12px_rgba(0,0,0,0.45)] transition-transform hover:-translate-y-0.5"
      >
        <Menu size={20} />
      </button>

      {/* ===== top-right: AI Presenter ===== */}
      {presenter.running ? (
        <div className="fixed right-4 top-4 z-50 flex max-w-[min(80vw,420px)] flex-col items-end gap-1.5">
          <div className="flex items-center gap-2 rounded-full border border-black/[0.06] bg-white px-3 py-2 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.45)]">
            {presenter.speaking ? (
              <span className="flex items-end gap-0.5" aria-hidden>
                {[0, 1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className="w-0.5 rounded-full bg-ink"
                    style={{
                      height: 6 + ((i % 3) + 1) * 3,
                      transformOrigin: "bottom",
                      animation: `barPulse 0.9s ease-in-out ${i * 0.12}s infinite`,
                    }}
                  />
                ))}
              </span>
            ) : (
              <span className="relative grid h-4 w-4 place-items-center" aria-hidden>
                {presenter.listening && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink/40" />
                )}
                <Mic size={13} className="relative text-ink" />
              </span>
            )}
            <span className="font-mono text-xs text-ink">
              {presenter.speaking ? "Speaking…" : presenter.listening ? "Listening…" : "Live Presenter"}
            </span>
            <button
              onClick={presenter.stop}
              aria-label="Stop presenter"
              className="ml-1 grid h-7 w-7 place-items-center rounded-full bg-ink text-white"
            >
              <Square size={12} fill="currentColor" />
            </button>
          </div>
          {presenter.transcript && (
            <div className="max-w-full truncate rounded-full border border-black/[0.06] bg-white/90 px-3 py-1 font-mono text-[11px] text-ink-soft shadow-sm">
              you: “{presenter.transcript}”
            </div>
          )}
        </div>
      ) : (
        <button onClick={startPresenter} className="pill fixed right-4 top-4 z-50">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-ink text-white">
            <Play size={11} fill="currentColor" />
          </span>
          AI Presenter
        </button>
      )}

      {/* ===== bottom-center: toolbar ===== */}
      <div className="fixed bottom-5 left-1/2 z-50 hidden -translate-x-1/2 items-center gap-1 rounded-2xl border border-black/[0.06] bg-white px-2 py-2 shadow-[0_12px_36px_-16px_rgba(0,0,0,0.45)] sm:flex">
        <ToolBtn label="Search" active={searchOpen} onClick={() => setSearchOpen(true)}>
          <Search size={18} />
        </ToolBtn>
        <span className="mx-1 h-6 w-px bg-black/10" />
        <ToolBtn label="Select" active={tool === "cursor"} onClick={() => selectTool("cursor")}>
          <MousePointer2 size={18} />
        </ToolBtn>
        <ToolBtn label="Draw" active={tool === "pen"} onClick={() => selectTool("pen")}>
          <PenTool size={18} />
        </ToolBtn>
        <ToolBtn label="Go to Work" active={false} onClick={() => selectTool("file")}>
          <File size={18} />
        </ToolBtn>
        <ToolBtn label="React" active={tool === "emoji"} onClick={() => selectTool("emoji")}>
          <Smile size={18} />
        </ToolBtn>
      </div>

      {/* ===== bottom-right: pan / navigation control ===== */}
      <div className="fixed bottom-5 right-4 z-50 hidden grid-cols-3 grid-rows-3 gap-0.5 rounded-2xl border border-black/[0.06] bg-white p-1.5 text-ink-soft shadow-[0_12px_36px_-16px_rgba(0,0,0,0.45)] sm:grid">
        <span />
        <PanBtn label="Up" onClick={() => window.scrollBy({ top: -window.innerHeight * 0.85, behavior: "smooth" })}>
          <ChevronUp size={15} />
        </PanBtn>
        <span />
        <PanBtn label="Previous section" onClick={() => scrollToId(sections[Math.max(0, currentIndex() - 1)].id)}>
          <ChevronLeft size={15} />
        </PanBtn>
        <button
          aria-label="Back to top"
          onClick={() => scrollToId("home")}
          className="grid h-7 w-7 place-items-center rounded-md hover:bg-black/[0.04]"
        >
          <span className="h-2 w-2 rounded-full bg-ink" />
        </button>
        <PanBtn label="Next section" onClick={() => scrollToId(sections[Math.min(sections.length - 1, currentIndex() + 1)].id)}>
          <ChevronRight size={15} />
        </PanBtn>
        <span />
        <PanBtn label="Down" onClick={() => window.scrollBy({ top: window.innerHeight * 0.85, behavior: "smooth" })}>
          <ChevronDown size={15} />
        </PanBtn>
        <span />
      </div>

      {/* ===== right edge: peeking card ===== */}
      <a
        href="#contact"
        className="fixed right-0 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-5 rounded-l-2xl border border-r-0 border-black/[0.06] bg-white py-6 pl-4 pr-3 shadow-[0_18px_50px_-24px_rgba(0,0,0,0.5)] transition-transform hover:-translate-x-1 lg:flex"
      >
        <span className="font-display text-xl font-bold text-ink">SK.</span>
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-ink-soft [writing-mode:vertical-rl]">
          Get in touch
        </span>
      </a>

      {/* ===== search / command palette ===== */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[70] flex items-start justify-center bg-black/20 px-4 pt-28 backdrop-blur-[2px]"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-[0_30px_80px_-30px_rgba(0,0,0,0.55)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-black/[0.06] px-4">
              <Search size={18} className="text-ink-soft" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && filtered[0]) {
                    scrollToId(filtered[0].id);
                    setSearchOpen(false);
                    setQuery("");
                  }
                }}
                placeholder="Jump to a section…"
                className="w-full bg-transparent py-4 font-sans text-ink outline-none placeholder:text-ink-soft"
              />
              <kbd className="hidden rounded border border-black/10 px-1.5 py-0.5 font-mono text-[10px] text-ink-soft sm:block">
                esc
              </kbd>
            </div>
            <ul className="max-h-72 overflow-y-auto p-2">
              {filtered.length === 0 && (
                <li className="px-3 py-3 text-sm text-ink-soft">No matches.</li>
              )}
              {filtered.map((s, i) => (
                <li key={s.id}>
                  <button
                    onClick={() => {
                      scrollToId(s.id);
                      setSearchOpen(false);
                      setQuery("");
                    }}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-ink transition-colors hover:bg-black/[0.04]"
                  >
                    <span className="flex items-center gap-3">
                      <span className="font-mono text-xs text-ink-soft">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {s.label}
                    </span>
                    <CornerDownLeft size={14} className="text-ink-soft opacity-0 group-hover:opacity-100" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* ===== slide-in menu ===== */}
      <div className={`fixed inset-0 z-[60] ${open ? "pointer-events-auto" : "pointer-events-none"}`}>
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/20 backdrop-blur-[2px] transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <aside
          className={`absolute left-3 top-3 flex max-h-[calc(100vh-1.5rem)] w-[330px] max-w-[88vw] flex-col overflow-y-auto rounded-3xl border border-black/[0.06] bg-white p-5 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.55)] transition-transform duration-300 ${
            open ? "translate-x-0" : "-translate-x-[110%]"
          }`}
        >
          <div className="mb-5 flex items-center justify-between">
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="grid h-9 w-9 place-items-center rounded-full text-ink hover:bg-black/[0.04]"
            >
              <X size={18} />
            </button>
            <span className="font-display text-lg font-bold tracking-tight text-ink">
              suyash<span className="text-ink-soft">.</span>
            </span>
          </div>

          <nav className="flex flex-col">
            {navMenu.map((item) =>
              "group" in item ? (
                <div key={item.group} className="mt-3">
                  <div className="mono-label mb-1 px-3">{item.group}</div>
                  {item.items.map((leaf) => (
                    <a
                      key={leaf.href}
                      href={leaf.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-3 py-2 pl-6 font-mono text-sm text-ink-soft transition-colors hover:bg-black/[0.04] hover:text-ink"
                    >
                      {leaf.label}
                    </a>
                  ))}
                </div>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-2.5 font-mono text-sm text-ink transition-colors hover:bg-black/[0.04]"
                >
                  {item.label}
                </a>
              )
            )}
          </nav>

          <button
            onClick={() => {
              setOpen(false);
              startPresenter();
            }}
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-sm font-medium text-white"
          >
            <Play size={13} fill="currentColor" /> Start AI Presenter
          </button>

          <div className="mt-5 flex w-fit items-center gap-1 rounded-full border border-black/[0.06] p-1">
            <button
              onClick={() => setDark(false)}
              aria-label="Light mode"
              className={`grid h-8 w-8 place-items-center rounded-full ${
                !dark ? "bg-ink text-white" : "text-ink-soft"
              }`}
            >
              <Sun size={15} />
            </button>
            <button
              onClick={() => setDark(true)}
              aria-label="Dark mode"
              className={`grid h-8 w-8 place-items-center rounded-full ${
                dark ? "bg-ink text-white" : "text-ink-soft"
              }`}
            >
              <Moon size={15} />
            </button>
          </div>
        </aside>
      </div>
    </>
  );
}

function ToolBtn({
  label,
  active,
  onClick,
  children,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      title={label}
      aria-label={label}
      className={`grid h-10 w-10 place-items-center rounded-xl transition-colors ${
        active ? "bg-ink text-white" : "text-ink-soft hover:bg-black/[0.04]"
      }`}
    >
      {children}
    </button>
  );
}

function PanBtn({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className="grid h-7 w-7 place-items-center rounded-md hover:bg-black/[0.04]"
    >
      {children}
    </button>
  );
}
