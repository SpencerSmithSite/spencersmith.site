const ORBS = [
  {
    id: "a",
    className: "floating-orb-a",
    left: "16%",
    top: "22%",
    size: 220,
    // Mauve into pink, matching the old palette without a live blur filter.
    background:
      "radial-gradient(circle, rgba(203, 166, 247, 0.32) 0%, rgba(245, 194, 231, 0.1) 42%, transparent 70%)",
  },
  {
    id: "b",
    className: "floating-orb-b",
    left: "84%",
    top: "74%",
    size: 180,
    // Sapphire into teal.
    background:
      "radial-gradient(circle, rgba(116, 199, 236, 0.28) 0%, rgba(148, 226, 213, 0.1) 46%, transparent 72%)",
  },
] as const

export default function FloatingOrbs() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <style>{`
        @keyframes floating-orb-a {
          0%, 100% { transform: translate3d(-50%, -50%, 0); }
          50% { transform: translate3d(calc(-50% + 24px), calc(-50% - 28px), 0); }
        }
        @keyframes floating-orb-b {
          0%, 100% { transform: translate3d(-50%, -50%, 0); }
          50% { transform: translate3d(calc(-50% - 20px), calc(-50% + 18px), 0); }
        }
        .floating-orb-a {
          animation: floating-orb-a 32s ease-in-out infinite;
        }
        .floating-orb-b {
          animation: floating-orb-b 40s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .floating-orb-a,
          .floating-orb-b {
            animation: none;
          }
        }
      `}</style>
      {ORBS.map((orb) => (
        <div
          key={orb.id}
          className={`absolute rounded-full ${orb.className}`}
          style={{
            left: orb.left,
            top: orb.top,
            width: orb.size,
            height: orb.size,
            background: orb.background,
            transform: "translate3d(-50%, -50%, 0)",
          }}
        />
      ))}
    </div>
  )
}
