export function TreePoseIllustration() {
  return (
    <svg
      viewBox="0 0 400 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      {/* Background gradient - subtle medical slate */}
      <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F0F4F8" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#E1E9F1" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7593B7" />
          <stop offset="100%" stopColor="#476F9F" />
        </linearGradient>
        <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#C5A065" />
          <stop offset="100%" stopColor="#D9725F" />
        </linearGradient>
      </defs>

      {/* Background circle - clinical feel */}
      <circle cx="200" cy="300" r="180" fill="url(#bgGradient)" />

      {/* Standing leg (right leg - straight down) */}
      <path
        d="M 200 350 L 200 500"
        stroke="url(#bodyGradient)"
        strokeWidth="24"
        strokeLinecap="round"
      />

      {/* Foot of standing leg */}
      <ellipse
        cx="200"
        cy="505"
        rx="20"
        ry="8"
        fill="url(#bodyGradient)"
      />

      {/* Bent leg (left leg - pressed against right thigh) */}
      {/* Upper thigh going out to the side */}
      <path
        d="M 200 380 Q 160 390 140 400"
        stroke="url(#bodyGradient)"
        strokeWidth="22"
        strokeLinecap="round"
      />

      {/* Lower leg bending back */}
      <path
        d="M 140 400 Q 130 420 125 440"
        stroke="url(#bodyGradient)"
        strokeWidth="20"
        strokeLinecap="round"
      />

      {/* Foot of bent leg pressed against thigh */}
      <ellipse
        cx="130"
        cy="445"
        rx="14"
        ry="10"
        fill="url(#bodyGradient)"
        transform="rotate(-30 130 445)"
      />

      {/* Torso */}
      <ellipse
        cx="200"
        cy="280"
        rx="35"
        ry="70"
        fill="url(#bodyGradient)"
      />

      {/* Arms raised above head (prayer position) */}
      <path
        d="M 200 220 L 185 160 L 195 140"
        stroke="url(#bodyGradient)"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 200 220 L 215 160 L 205 140"
        stroke="url(#bodyGradient)"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Hands in prayer */}
      <circle cx="200" cy="135" r="12" fill="#C5A065" />

      {/* Head */}
      <circle cx="200" cy="220" r="30" fill="url(#bodyGradient)" />

      {/* Energy/balance accent line - gold to coral */}
      <path
        d="M 200 140 L 200 100"
        stroke="url(#accentGradient)"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.7"
      />
      <circle cx="200" cy="95" r="4" fill="#D9725F" opacity="0.7" />

      {/* Grounding elements - minimal geometric */}
      <rect
        x="160"
        y="500"
        width="80"
        height="4"
        rx="2"
        fill="#0B1929"
        opacity="0.2"
      />
    </svg>
  )
}
