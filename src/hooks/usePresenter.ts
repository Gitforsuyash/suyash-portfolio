import { useEffect, useRef, useState } from "react";

export type PresenterSection = { id: string; label: string; line: string };

/**
 * Voice-driven "AI Presenter":
 *  - Speaks an intro for each section (Web Speech — speechSynthesis) while
 *    scrolling there, auto-advancing through the tour.
 *  - Listens to the visitor's voice (SpeechRecognition) and reacts to commands
 *    like "next", "go to projects", "tell me about your experience", "stop".
 * Falls back to a silent, timed scroll-tour if speech APIs are unavailable.
 */
export function usePresenter(sections: PresenterSection[]) {
  const [running, setRunning] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [stepId, setStepId] = useState(sections[0]?.id ?? "");

  const runningRef = useRef(false);
  const speakingRef = useRef(false);
  const idxRef = useRef(0);
  const recRef = useRef<any>(null);

  const ttsSupported =
    typeof window !== "undefined" && "speechSynthesis" in window;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 70;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  };

  const speak = (text: string, onEnd: () => void) => {
    if (!ttsSupported) {
      window.setTimeout(onEnd, 2800);
      return;
    }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 1.03;
    u.pitch = 1;
    u.lang = "en-US";
    speakingRef.current = true;
    setSpeaking(true);
    const done = () => {
      speakingRef.current = false;
      setSpeaking(false);
      onEnd();
    };
    u.onend = done;
    u.onerror = done;
    window.speechSynthesis.speak(u);
  };

  const present = (i: number) => {
    if (!runningRef.current) return;
    if (i >= sections.length) {
      stop();
      return;
    }
    const idx = Math.max(0, i);
    idxRef.current = idx;
    setStepId(sections[idx].id);
    scrollTo(sections[idx].id);
    speak(sections[idx].line, () => {
      window.setTimeout(() => {
        if (runningRef.current && idxRef.current === idx) present(idx + 1);
      }, 950);
    });
  };

  const handleCommand = (raw: string) => {
    const t = raw.toLowerCase();
    const find = (id: string) => sections.findIndex((s) => s.id === id);
    let target = -2; // -2 = no match, -1 handled
    if (/\b(stop|exit|quit|pause|end it|that's enough)\b/.test(t)) {
      stop();
      return;
    } else if (/\b(next|forward|continue|go on|keep going)\b/.test(t))
      target = Math.min(sections.length - 1, idxRef.current + 1);
    else if (/\b(back|previous|prev|go back)\b/.test(t))
      target = Math.max(0, idxRef.current - 1);
    else if (/\b(repeat|again|say that|pardon)\b/.test(t)) target = idxRef.current;
    else if (/\b(home|start over|top|beginning|intro)\b/.test(t)) target = find("home");
    else if (/\b(about|who are you|yourself|who is)\b/.test(t)) target = find("about");
    else if (/\b(experience|work|job|role|currently|sas)\b/.test(t))
      target = find("experience");
    else if (/\b(product|management|\bpm\b|coursework)\b/.test(t)) target = find("product");
    else if (/\b(project|projects|built|build|portfolio|work you)\b/.test(t))
      target = find("projects");
    else if (/\b(skill|skills|stack|tools|tech|technolog)\b/.test(t)) target = find("skills");
    else if (/\b(education|certificat|credential|degree|studied)\b/.test(t))
      target = find("credentials");
    else if (/\b(contact|reach|email|touch|hire|connect|talk)\b/.test(t))
      target = find("contact");

    if (target >= 0) present(target);
  };

  const startRecognition = () => {
    const SR =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SR || recRef.current) return;
    const rec = new SR();
    rec.continuous = true;
    rec.interimResults = false;
    rec.lang = "en-US";
    rec.onstart = () => setListening(true);
    rec.onend = () => {
      setListening(false);
      if (runningRef.current) {
        try {
          rec.start();
        } catch {
          /* already started */
        }
      }
    };
    rec.onerror = () => {};
    rec.onresult = (e: any) => {
      // ignore audio captured while the assistant itself is talking
      if (speakingRef.current) return;
      const res = e.results[e.results.length - 1];
      const text = res[0]?.transcript?.trim() ?? "";
      if (!text) return;
      setTranscript(text);
      handleCommand(text);
    };
    recRef.current = rec;
    try {
      rec.start();
    } catch {
      /* noop */
    }
  };

  const start = () => {
    if (runningRef.current) return;
    runningRef.current = true;
    setRunning(true);
    setTranscript("");
    startRecognition();
    present(0);
  };

  const stop = () => {
    runningRef.current = false;
    setRunning(false);
    setSpeaking(false);
    setListening(false);
    speakingRef.current = false;
    if (ttsSupported) window.speechSynthesis.cancel();
    if (recRef.current) {
      try {
        recRef.current.onend = null;
        recRef.current.stop();
      } catch {
        /* noop */
      }
      recRef.current = null;
    }
  };

  useEffect(() => {
    return () => stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { running, speaking, listening, transcript, stepId, start, stop };
}
