// Shared, normalized mouse position (-1..1) tracked once at the window level.
// Used by the Three.js scenes for parallax — works even though the canvases
// are pointer-events-none (so they never block scrolling or clicks).
export const mouse = { x: 0, y: 0 };

if (typeof window !== "undefined") {
  window.addEventListener(
    "pointermove",
    (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -((e.clientY / window.innerHeight) * 2 - 1);
    },
    { passive: true }
  );
}
