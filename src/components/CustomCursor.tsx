import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type CursorState = "default" | "link" | "button" | "gallery" | "program" | "call";

const CURSOR_LABELS: Record<CursorState, string> = {
  default: "",
  link: "",
  button: "JOIN",
  gallery: "VIEW",
  program: "EXPLORE",
  call: "CALL",
};

function detectCursorState(el: Element | null): CursorState {
  if (!el) return "default";
  const target = el.closest(
    "a[href], button, [role='button'], [data-cursor]"
  ) as HTMLElement | null;
  if (!target) return "default";
  const dc = target.dataset.cursor as CursorState | undefined;
  if (dc) return dc;
  const tag = target.tagName.toLowerCase();
  const text = target.textContent?.toLowerCase() ?? "";
  if (tag === "button" || target.classList.contains("btn-primary") || text.includes("join")) return "button";
  if (target.closest("[data-gallery]")) return "gallery";
  if (target.closest("[data-program]")) return "program";
  if (tag === "a") return "link";
  return "default";
}

export function CustomCursor() {
  const [state, setState] = useState<CursorState>("default");
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  const dotX = useSpring(rawX, { stiffness: 800, damping: 50 });
  const dotY = useSpring(rawY, { stiffness: 800, damping: 50 });
  const ringX = useSpring(rawX, { stiffness: 140, damping: 22 });
  const ringY = useSpring(rawY, { stiffness: 140, damping: 22 });

  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Detect coarse pointer (touch) — hide cursor completely
    const mq = window.matchMedia("(pointer: coarse)");
    if (mq.matches) { setIsTouch(true); return; }
    const handleChange = () => { if (mq.matches) setIsTouch(true); };
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (isTouch) return;

    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        rawX.set(e.clientX);
        rawY.set(e.clientY);
        setState(detectCursorState(e.target as Element));
        setVisible(true);
      });
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isTouch, rawX, rawY]);

  if (isTouch) return null;

  const label = CURSOR_LABELS[state];
  const isHovering = state !== "default";
  const ringSize = isHovering ? 52 : 32;

  return (
    <>
      {/* Dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed z-[9999] rounded-full bg-[#c9a227]"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          width: 6,
          height: 6,
          opacity: visible ? 1 : 0,
          mixBlendMode: "difference",
        }}
        animate={{ scale: isHovering ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />
      {/* Ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed z-[9998] flex items-center justify-center rounded-full border border-[#c9a227] font-display font-bold uppercase tracking-widest text-[#c9a227]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          fontSize: "0.42rem",
          opacity: visible ? 1 : 0,
          letterSpacing: "0.18em",
        }}
        animate={{
          width: ringSize,
          height: ringSize,
          opacity: visible ? (isHovering ? 0.95 : 0.6) : 0,
          borderColor: isHovering ? "#c9a227" : "rgba(201,162,39,0.5)",
        }}
        transition={{ type: "spring", stiffness: 240, damping: 24 }}
      >
        {label}
      </motion.div>
    </>
  );
}
