import React, { useState, useEffect, useRef } from 'react';

export type AnimalType = 'video-cat' | 'midnight-cat' | 'panther' | 'calico' | 'white-cat';

interface AnimalConfig {
  id: AnimalType;
  name: string;
  emoji: string;
  soundText: string;
  tag: string;
  backColor: string;
  bellyColor: string;
  farLimbColor: string;
  nearLimbColor: string;
  eyeColor: string;
  tailColor: string;
  earInnerColor: string;
  strokeColor: string;
}

const ANIMALS: AnimalConfig[] = [
  {
    id: 'video-cat',
    name: 'Video Pole-Climber Cat',
    emoji: '🐈‍⬛',
    soundText: 'Climbing vertical rail (exact video motion!) 🐾',
    tag: 'VIDEO REFERENCE',
    backColor: '#171E29',
    bellyColor: '#8CA1B6',
    farLimbColor: '#5B6F83',
    nearLimbColor: '#8CA1B6',
    eyeColor: '#38BDF8',
    tailColor: '#171E29',
    earInnerColor: '#A8BDCF',
    strokeColor: '#171E29'
  },
  {
    id: 'midnight-cat',
    name: 'Midnight Black Cat',
    emoji: '🐱',
    soundText: 'Purr... Silently scaling the studio rail',
    tag: 'FELIS CATUS',
    backColor: '#0E1117',
    bellyColor: '#2D3542',
    farLimbColor: '#1B212B',
    nearLimbColor: '#2D3542',
    eyeColor: '#FACC15',
    tailColor: '#0E1117',
    earInnerColor: '#454E5E',
    strokeColor: '#080A0E'
  },
  {
    id: 'panther',
    name: 'Shadow Panther Climber',
    emoji: '🐆',
    soundText: 'Predatory vertical ascent...',
    tag: 'PANTHERA PARDUS',
    backColor: '#181615',
    bellyColor: '#453F3A',
    farLimbColor: '#2A2623',
    nearLimbColor: '#453F3A',
    eyeColor: '#4ADE80',
    tailColor: '#181615',
    earInnerColor: '#635B53',
    strokeColor: '#0D0C0B'
  },
  {
    id: 'calico',
    name: 'Calico Border Climber',
    emoji: '🐾',
    soundText: 'Tricolor paws stepping in rhythm...',
    tag: 'FELIS VARIEGATA',
    backColor: '#C26508',
    bellyColor: '#F5EBE1',
    farLimbColor: '#2E2D2B',
    nearLimbColor: '#F5EBE1',
    eyeColor: '#10B981',
    tailColor: '#2E2D2B',
    earInnerColor: '#FCA5A5',
    strokeColor: '#262626'
  },
  {
    id: 'white-cat',
    name: 'Snow White Climber',
    emoji: '🤍',
    soundText: 'Soft white paws stepping along rail...',
    tag: 'FELIS ALBINO',
    backColor: '#F8FAFC',
    bellyColor: '#E2E8F0',
    farLimbColor: '#94A3B8',
    nearLimbColor: '#F1F5F9',
    eyeColor: '#0284C7',
    tailColor: '#E2E8F0',
    earInnerColor: '#FDA4AF',
    strokeColor: '#64748B'
  }
];

interface WalkingAnimalTrackerProps {
  reducedMotion?: boolean;
}

// Generate smooth anatomical 2D polygon path with realistic thickness for limbs
function generateSolidLimbPath(
  baseX: number,
  baseY: number,
  midX: number,
  midY: number,
  pawX: number,
  pawY: number,
  wBase: number,
  wMid: number,
  wPaw: number,
  isHind: boolean = false
): string {
  const d1x = midX - baseX;
  const d1y = midY - baseY;
  const len1 = Math.hypot(d1x, d1y) || 1;
  const n1x = -d1y / len1;
  const n1y = d1x / len1;

  const d2x = pawX - midX;
  const d2y = pawY - midY;
  const len2 = Math.hypot(d2x, d2y) || 1;
  const n2x = -d2y / len2;
  const n2y = d2x / len2;

  // Outer edge
  const p1x = baseX + n1x * wBase;
  const p1y = baseY + n1y * wBase;
  const p2x = midX + ((n1x + n2x) / 2) * wMid;
  const p2y = midY + ((n1y + n2y) / 2) * wMid;
  const p3x = pawX + n2x * wPaw;
  const p3y = pawY + n2y * wPaw;

  // Inner edge
  const p4x = pawX - n2x * wPaw;
  const p4y = pawY - n2y * wPaw;
  const p5x = midX - ((n1x + n2x) / 2) * wMid;
  const p5y = midY - ((n1y + n2y) / 2) * wMid;
  const p6x = baseX - n1x * wBase;
  const p6y = baseY - n1y * wBase;

  if (isHind) {
    // For hind leg: thigh flare out toward rear
    const thighFlareX = baseX + 4.2;
    const thighFlareY = baseY - 1.5;
    return `M ${p1x} ${p1y} 
            Q ${midX + n1x * (wMid + 1)} ${midY + n1y * (wMid + 1)} ${p2x} ${p2y} 
            L ${p3x} ${p3y} 
            Q ${pawX} ${pawY + 2} ${p4x} ${p4y} 
            L ${p5x} ${p5y} 
            Q ${thighFlareX} ${thighFlareY} ${p6x} ${p6y} Z`;
  }

  return `M ${p1x} ${p1y} 
          Q ${midX + n1x * wMid} ${midY + n1y * wMid} ${p2x} ${p2y} 
          L ${p3x} ${p3y} 
          Q ${pawX} ${pawY + 2} ${p4x} ${p4y} 
          L ${p5x} ${p5y} 
          Q ${midX - n1x * wMid} ${midY - n1y * wMid} ${p6x} ${p6y} Z`;
}

export const WalkingAnimalTracker: React.FC<WalkingAnimalTrackerProps> = ({ reducedMotion = false }) => {
  const [animalIndex, setAnimalIndex] = useState(0);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [smoothTop, setSmoothTop] = useState(0);
  const [walkPhase, setWalkPhase] = useState(0);
  const [tailPhase, setTailPhase] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [blinkPhase, setBlinkPhase] = useState(false);

  const targetTopRef = useRef(0);
  const lastScrollY = useRef(0);
  const isScrollingRef = useRef(false);
  const scrollTimeout = useRef<number | null>(null);
  const bubbleTimeout = useRef<number | null>(null);
  const blinkTimeout = useRef<number | null>(null);

  const currentAnimal = ANIMALS[animalIndex];

  // Natural spontaneous blinking
  useEffect(() => {
    const triggerBlink = () => {
      setBlinkPhase(true);
      setTimeout(() => setBlinkPhase(false), 140);
      const nextDelay = 2800 + Math.random() * 3400;
      blinkTimeout.current = window.setTimeout(triggerBlink, nextDelay);
    };
    blinkTimeout.current = window.setTimeout(triggerBlink, 2600);
    return () => {
      if (blinkTimeout.current) window.clearTimeout(blinkTimeout.current);
    };
  }, []);

  // Track scroll position seamlessly from header (top: 0) to footer
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = scrollHeight > 0 ? scrollY / scrollHeight : 0;
      const clampedPct = Math.min(Math.max(pct, 0), 1);

      setScrollPercent(clampedPct);
      lastScrollY.current = scrollY;

      const winH = typeof window !== 'undefined' ? window.innerHeight : 800;
      // Start right at top: 0 (directly on sticky header) and travel smoothly down to footer
      const maxTravel = Math.max(winH - 84, 200);
      targetTopRef.current = clampedPct * maxTravel;

      isScrollingRef.current = true;
      setIsScrolling(true);

      if (scrollTimeout.current) window.clearTimeout(scrollTimeout.current);
      scrollTimeout.current = window.setTimeout(() => {
        isScrollingRef.current = false;
        setIsScrolling(false);
      }, 160);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) window.clearTimeout(scrollTimeout.current);
      if (bubbleTimeout.current) window.clearTimeout(bubbleTimeout.current);
    };
  }, []);

  // 60FPS High-Fidelity Continuous Walking Motion Physics Loop
  // Matching the exact animated cadence of the video!
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const loop = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.08);
      lastTime = now;

      if (!reducedMotion) {
        // Continuous, lively walking cadence:
        // Idle base speed is 5.4 rad/s (~1.16s full cycle, matching the video pace)
        // Accelerates to 8.8 rad/s when user is actively scrolling
        const walkSpeed = isScrollingRef.current ? 8.8 : 5.4;
        setWalkPhase((prev) => (prev + dt * walkSpeed) % (Math.PI * 2));

        // Fluid counter-balancing tail swing
        const tailSpeed = isScrollingRef.current ? 6.2 : 3.6;
        setTailPhase((prev) => (prev + dt * tailSpeed) % (Math.PI * 2));
      }

      // Smooth vertical gliding along the border rail from header to footer
      setSmoothTop((prev) => {
        const target = targetTopRef.current;
        const diff = target - prev;
        if (Math.abs(diff) < 0.05) return target;
        return prev + diff * 0.16;
      });

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [reducedMotion]);

  const handleAnimalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAnimalIndex((prev) => (prev + 1) % ANIMALS.length);
    setShowBubble(true);
    if (bubbleTimeout.current) window.clearTimeout(bubbleTimeout.current);
    bubbleTimeout.current = window.setTimeout(() => {
      setShowBubble(false);
    }, 2800);
  };

  // =========================================================================
  // EXACT VIDEO KINEMATICS: 4-BEAT VERTICAL POLE CLIMBING WALK CYCLE
  // The pole is positioned vertically at poleX = 6.5.
  // Sequence from video:
  // Beat 0 [0.00 - 0.25]: Near Front Leg swings, reaches high, grips pole.
  // Beat 1 [0.25 - 0.50]: Near Hind Leg swings, knee pulls up, reaches, grips pole.
  // Beat 2 [0.50 - 0.75]: Far Front Leg swings, reaches high, grips pole.
  // Beat 3 [0.75 - 1.00]: Far Hind Leg swings, knee pulls up, reaches, grips pole.
  //
  // During each limb's stance phase (the remaining 75% of time):
  // The paw stays clamped on the vertical pole, smoothly translating downwards
  // relative to the body to simulate the body pulling itself upward!
  // =========================================================================

  const poleX = 6.5; // X position where the vertical border rail runs
  const normalizedPhase = (walkPhase / (Math.PI * 2)) % 1; // 0 to 1

  // Front limb climbing kinematics
  const computeForelimb = (swingStart: number) => {
    const shoulderX = 16;
    const shoulderY = 24;
    const baseGripY = 24; // Resting grip height on pole

    // Relative position in 0..1 cycle from this limb's swing start
    const cyclePos = (normalizedPhase - swingStart + 1) % 1;
    const swingDuration = 0.25;

    let pawX: number;
    let pawY: number;
    let elbowX: number;
    let elbowY: number;
    let isGrounded: boolean;

    if (cyclePos < swingDuration) {
      // --- SWING PHASE (Releasing, lifting, reaching, planting) ---
      const t = cyclePos / swingDuration; // 0 to 1
      isGrounded = false;

      if (t < 0.3) {
        // 1. Paw peels off pole, bends elbow, pulls slightly back into air
        const subT = t / 0.3;
        pawX = poleX + subT * 5.0; // Moves rightward away from pole
        pawY = baseGripY + 3 - subT * 2;
        elbowX = 12 + subT * 2;
        elbowY = shoulderY + 2;
      } else if (t < 0.8) {
        // 2. High reach: leg extends forward and up toward the pole
        const subT = (t - 0.3) / 0.5;
        pawX = poleX + 5.0 * (1 - subT);
        pawY = baseGripY + 1 - subT * 11; // Reaches up to baseGripY - 10
        elbowX = 14 - subT * 3;
        elbowY = shoulderY - subT * 2;
      } else {
        // 3. Paw clamps down onto the pole at high grip point
        const subT = (t - 0.8) / 0.2;
        pawX = poleX;
        pawY = baseGripY - 10 + subT * 1;
        elbowX = 11;
        elbowY = shoulderY - 2;
      }
    } else {
      // --- STANCE PHASE (Clamped on pole, pulling body upward) ---
      const t = (cyclePos - swingDuration) / (1 - swingDuration); // 0 to 1
      isGrounded = true;
      pawX = poleX;
      // Slides down relative to body from high reach (baseGripY - 9) to low reach (baseGripY + 3)
      pawY = baseGripY - 9 + t * 12;
      elbowX = 11 + Math.sin(t * Math.PI) * 2.2;
      elbowY = shoulderY + (pawY - shoulderY) * 0.45;
    }

    return { shoulderX, shoulderY, elbowX, elbowY, pawX, pawY, isGrounded };
  };

  // Hind limb climbing kinematics
  const computeHindlimb = (swingStart: number) => {
    const hipX = 20;
    const hipY = 46;
    const baseGripY = 46;

    const cyclePos = (normalizedPhase - swingStart + 1) % 1;
    const swingDuration = 0.25;

    let pawX: number;
    let pawY: number;
    let kneeX: number;
    let kneeY: number;
    let isGrounded: boolean;

    if (cyclePos < swingDuration) {
      // --- SWING PHASE (Releasing, knee tucking up, reaching, planting) ---
      const t = cyclePos / swingDuration;
      isGrounded = false;

      if (t < 0.3) {
        // 1. Back paw releases pole, lifts slightly
        const subT = t / 0.3;
        pawX = poleX + subT * 5.2;
        pawY = baseGripY + 3 - subT * 2;
        kneeX = 15 + subT * 2;
        kneeY = hipY - subT * 3; // Knee bends upward toward belly
      } else if (t < 0.8) {
        // 2. Knee tucks high against belly, foot reaches high along pole
        const subT = (t - 0.3) / 0.5;
        pawX = poleX + 5.2 * (1 - subT);
        pawY = baseGripY + 1 - subT * 12; // Reaches up to baseGripY - 11
        kneeX = 17 - subT * 4;
        kneeY = hipY - 3 - subT * 2;
      } else {
        // 3. Paw clamps down firmly on pole
        const subT = (t - 0.8) / 0.2;
        pawX = poleX;
        pawY = baseGripY - 11 + subT * 1;
        kneeX = 13;
        kneeY = hipY - 5;
      }
    } else {
      // --- STANCE PHASE (Clamped on pole, pushing body upward) ---
      const t = (cyclePos - swingDuration) / (1 - swingDuration);
      isGrounded = true;
      pawX = poleX;
      pawY = baseGripY - 10 + t * 13;
      kneeX = 14 + Math.sin(t * Math.PI) * 2.8;
      kneeY = hipY + (pawY - hipY) * 0.45;
    }

    return { hipX, hipY, kneeX, kneeY, pawX, pawY, isGrounded };
  };

  // 4 Alternating Limb Steps from Video:
  const fn = computeForelimb(0.00); // Beat 0: Near Front
  const hn = computeHindlimb(0.25); // Beat 1: Near Hind
  const ff = computeForelimb(0.50); // Beat 2: Far Front
  const hf = computeHindlimb(0.75); // Beat 3: Far Hind

  // Organic Body Mechanics:
  // Weight transfers side to side and bobs vertically as front limbs pull and rear limbs push
  const bodyBobX = Math.sin(walkPhase) * 1.1;
  const bodyBobY = Math.sin(walkPhase * 2) * 1.2;
  const bodyTilt = Math.sin(walkPhase) * 2.4; // Subtle angle shift in degrees
  const headBob = Math.sin(walkPhase * 2 + 0.5) * 1.2;

  // Fluid S-Curve Tail Physics (delayed harmonic wave swinging like a pendulum)
  const tailBaseX = 22;
  const tailBaseY = 53 + bodyBobY * 0.4;
  const t1 = Math.sin(tailPhase) * 3.2;
  const t2 = Math.sin(tailPhase - 1.1) * 6.0;
  const t3 = Math.sin(tailPhase - 2.2) * 8.8;

  // Solid limb contours for cel-shaded anime rendering
  const farFrontPath = generateSolidLimbPath(
    ff.shoulderX - 2,
    ff.shoulderY - 1,
    ff.elbowX,
    ff.elbowY,
    ff.pawX,
    ff.pawY,
    3.8,
    3.4,
    3.0,
    false
  );

  const farHindPath = generateSolidLimbPath(
    hf.hipX - 2,
    hf.hipY - 1,
    hf.kneeX,
    hf.kneeY,
    hf.pawX,
    hf.pawY,
    4.6,
    3.8,
    3.2,
    true
  );

  const nearFrontPath = generateSolidLimbPath(
    fn.shoulderX,
    fn.shoulderY,
    fn.elbowX,
    fn.elbowY,
    fn.pawX,
    fn.pawY,
    4.5,
    3.8,
    3.4,
    false
  );

  const nearHindPath = generateSolidLimbPath(
    hn.hipX,
    hn.hipY,
    hn.kneeX,
    hn.kneeY,
    hn.pawX,
    hn.pawY,
    5.8,
    4.4,
    3.6,
    true
  );

  const isAtHeader = scrollPercent < 0.04;
  const isAtFooter = scrollPercent > 0.96;

  return (
    <div
      id="walking-animal-border-track"
      aria-label="Vertical Pole-Climbing Cat Tracker along border"
      className="fixed left-0 top-0 bottom-0 z-50 pointer-events-none select-none p-0 m-0 w-24"
    >
      {/* Precision Vertical Pole (Climbed by the Cat!) */}
      <div className="absolute left-[6.5px] top-0 bottom-0 w-[1.5px] bg-[#24211D]/35">
        {/* Real-time scroll line fill */}
        <div
          className="w-[2px] -left-[0.5px] relative bg-[#000000] transition-[height] duration-75 ease-out shadow-[0_0_4px_rgba(0,0,0,0.35)]"
          style={{ height: `${scrollPercent * 100}%` }}
        />

        {/* Calibration Ticks */}
        {[0.0, 0.2, 0.4, 0.6, 0.8, 1.0].map((tick) => (
          <div
            key={tick}
            className="absolute left-0 w-[3px] h-[1px] bg-[#000000]/60"
            style={{ top: `${tick * 100}%` }}
          />
        ))}

        {/* Claws / Step marks along the vertical rail */}
        {[0.05, 0.18, 0.35, 0.52, 0.68, 0.84, 0.96].map((stepPct) => {
          const isStepped = scrollPercent >= stepPct;
          return (
            <div
              key={stepPct}
              className={`absolute -left-[3px] transition-opacity duration-300 pointer-events-none ${
                isStepped ? 'opacity-70' : 'opacity-0'
              }`}
              style={{ top: `${stepPct * 100}%` }}
            >
              <div className="w-2 h-0.5 bg-[#000000]/70 rounded-full" />
            </div>
          );
        })}
      </div>

      {/* Vertical Pole-Climber Cat Rig — Continuous Walking Motion as shown in video */}
      <div
        style={{
          transform: `translate3d(0, ${smoothTop}px, 0)`
        }}
        className="absolute left-0 top-0 pointer-events-auto flex items-center group cursor-pointer p-0 m-0"
        onClick={handleAnimalClick}
        title={`${currentAnimal.name}. Continuous climbing locomotion as shown in video! Click to switch companion.`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleAnimalClick(e as any);
          }
        }}
      >
        {/* High-Fidelity Vector Rig matching the exact proportions from video */}
        <div className="relative p-0 m-0 origin-left transition-transform duration-150 active:scale-95">
          <svg
            width="56"
            height="86"
            viewBox="0 0 56 86"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            shapeRendering="geometricPrecision"
            className="block overflow-visible"
            style={{ filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.35))' }}
          >
            <defs>
              {/* Cel-shaded back coat lighting */}
              <linearGradient id="backFurGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={currentAnimal.backColor} />
                <stop offset="80%" stopColor={currentAnimal.backColor} />
                <stop offset="100%" stopColor="#0B0E14" />
              </linearGradient>

              {/* Radiant Eye Iris */}
              <radialGradient id="climberIrisGrad" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="45%" stopColor={currentAnimal.eyeColor} />
                <stop offset="100%" stopColor="#0284C7" />
              </radialGradient>
            </defs>

            {/* Vertical Pole Guide Segment passing directly through the paws */}
            <line
              x1={poleX}
              y1="0"
              x2={poleX}
              y2="86"
              stroke="#000000"
              strokeWidth="1.6"
              strokeLinecap="round"
              className="opacity-25"
            />

            {/* ============================================================= */}
            {/* 1. FAR LIMBS (In shadow behind pole with solid contours)      */}
            {/* ============================================================= */}
            {/* Far Hind Leg (HF) */}
            <g className="transition-all duration-75">
              <path
                d={farHindPath}
                fill={currentAnimal.farLimbColor}
                stroke={currentAnimal.strokeColor}
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
              {/* Far Hind Paw Clasp */}
              <circle cx={hf.pawX} cy={hf.pawY} r="2.2" fill={currentAnimal.farLimbColor} />
              <circle cx={hf.pawX} cy={hf.pawY} r="2.2" stroke={currentAnimal.strokeColor} strokeWidth="1.0" fill="none" />
            </g>

            {/* Far Front Arm (FF) */}
            <g className="transition-all duration-75">
              <path
                d={farFrontPath}
                fill={currentAnimal.farLimbColor}
                stroke={currentAnimal.strokeColor}
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
              {/* Far Front Paw Clasp */}
              <circle cx={ff.pawX} cy={ff.pawY} r="2.0" fill={currentAnimal.farLimbColor} />
              <circle cx={ff.pawX} cy={ff.pawY} r="2.0" stroke={currentAnimal.strokeColor} strokeWidth="1.0" fill="none" />
            </g>

            {/* ============================================================= */}
            {/* 2. FLUID S-CURVE PENDULUM TAIL                                */}
            {/* ============================================================= */}
            <g>
              <path
                d={`M ${tailBaseX} ${tailBaseY} 
                   C ${tailBaseX + t1 * 0.7} ${tailBaseY + 9}, 
                     ${tailBaseX + 2 + t2} ${tailBaseY + 18}, 
                     ${tailBaseX + t3} ${tailBaseY + 26}`}
                stroke={currentAnimal.tailColor}
                strokeWidth="3.6"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d={`M ${tailBaseX} ${tailBaseY} 
                   C ${tailBaseX + t1 * 0.7} ${tailBaseY + 9}, 
                     ${tailBaseX + 2 + t2} ${tailBaseY + 18}, 
                     ${tailBaseX + t3} ${tailBaseY + 26}`}
                stroke={currentAnimal.strokeColor}
                strokeWidth="0.8"
                strokeLinecap="round"
                fill="none"
                className="opacity-40"
              />
              {/* Rounded Tail Tip */}
              <circle cx={tailBaseX + t3} cy={tailBaseY + 26} r="1.8" fill={currentAnimal.tailColor} />
            </g>

            {/* ============================================================= */}
            {/* 3. TWO-TONE CHUBBY FELINE TORSO (Exact Silhouette from Video) */}
            {/* ============================================================= */}
            <g
              transform={`translate(${bodyBobX}, ${bodyBobY}) rotate(${bodyTilt} 22 36)`}
              className="transition-transform duration-75"
            >
              {/* Dorsal Back Silhouette (Dark navy / charcoal) */}
              <path
                d="M 19 18 
                   C 25 19 32 25 31 36 
                   C 31 44 26 51 21 53 
                   C 18 53 18 47 19 41 
                   C 20 33 20 25 19 18 Z"
                fill="url(#backFurGrad)"
                stroke={currentAnimal.strokeColor}
                strokeWidth="1.2"
                strokeLinejoin="round"
              />

              {/* Ventral Belly Silhouette (Soft slate-blue facing pole) */}
              <path
                d="M 19 18 
                   C 20 25 20 33 19 41 
                   C 18 47 18 53 21 53 
                   C 17 52 13 46 13 37 
                   C 13 28 15 21 19 18 Z"
                fill={currentAnimal.bellyColor}
                stroke={currentAnimal.strokeColor}
                strokeWidth="1.2"
                strokeLinejoin="round"
              />

              {/* Delicate Chest Highlight Line */}
              <path
                d="M 17 22 C 15 27 15 32 17 37"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1.0"
                strokeLinecap="round"
                fill="none"
              />
            </g>

            {/* ============================================================= */}
            {/* 4. NEAR LIMBS (Foreground with cel-shaded solid geometry)     */}
            {/* ============================================================= */}
            {/* Near Hind Leg (HN) */}
            <g className="transition-all duration-75">
              <path
                d={nearHindPath}
                fill={currentAnimal.nearLimbColor}
                stroke={currentAnimal.strokeColor}
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
              {/* Near Hind Paw Pad clamping firmly on vertical rail */}
              <circle cx={hn.pawX} cy={hn.pawY} r="2.5" fill={currentAnimal.nearLimbColor} />
              <circle cx={hn.pawX} cy={hn.pawY} r="2.5" stroke={currentAnimal.strokeColor} strokeWidth="1.2" fill="none" />
              {/* Claws gripping the pole */}
              <ellipse cx={hn.pawX - 0.5} cy={hn.pawY} rx="1.0" ry="1.6" fill={currentAnimal.strokeColor} />
            </g>

            {/* Near Front Arm (FN) */}
            <g className="transition-all duration-75">
              <path
                d={nearFrontPath}
                fill={currentAnimal.nearLimbColor}
                stroke={currentAnimal.strokeColor}
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
              {/* Near Front Paw Pad clamping firmly on vertical rail */}
              <circle cx={fn.pawX} cy={fn.pawY} r="2.4" fill={currentAnimal.nearLimbColor} />
              <circle cx={fn.pawX} cy={fn.pawY} r="2.4" stroke={currentAnimal.strokeColor} strokeWidth="1.2" fill="none" />
              {/* Claws gripping the pole */}
              <ellipse cx={fn.pawX - 0.5} cy={fn.pawY} rx="1.0" ry="1.6" fill={currentAnimal.strokeColor} />
            </g>

            {/* ============================================================= */}
            {/* 5. FELINE HEAD, EARS & SNOUT (Tilted up towards the climb)    */}
            {/* ============================================================= */}
            <g transform={`translate(${bodyBobX * 0.7}, ${headBob}) rotate(${bodyTilt * 0.5} 24 16)`}>
              {/* Head Skull Base */}
              <path
                d="M 18 19 
                   C 17 14 20 9 25 10 
                   C 29 11 31 15 31 18 
                   C 30 21 26 22 20 21 Z"
                fill="url(#backFurGrad)"
                stroke={currentAnimal.strokeColor}
                strokeWidth="1.2"
                strokeLinejoin="round"
              />

              {/* Far Pointed Cat Ear (Background 3D layer) */}
              <polygon points="19,11 18,4 23,8" fill={currentAnimal.farLimbColor} stroke={currentAnimal.strokeColor} strokeWidth="1.0" />
              <polygon points="19.5,10 18.8,5.5 22,8" fill={currentAnimal.earInnerColor} />

              {/* Near Pointed Cat Ear (Foreground layer) */}
              <polygon points="23,8 25,4 28,10" fill={currentAnimal.backColor} stroke={currentAnimal.strokeColor} strokeWidth="1.0" />
              <polygon points="24,8.5 25.2,5.5 27,9.5" fill={currentAnimal.earInnerColor} />

              {/* Muzzle / Chin pointing upward */}
              <path d="M 28 16 C 30.5 16.5 31 18 29 19 Z" fill={currentAnimal.backColor} stroke={currentAnimal.strokeColor} strokeWidth="0.8" />

              {/* Alert Glowing Feline Eye */}
              {!blinkPhase ? (
                <g>
                  <ellipse cx="25.5" cy="15" rx="1.8" ry="1.3" fill="url(#climberIrisGrad)" />
                  {/* Vertical Slit Pupil */}
                  <line x1="25.5" y1="14.2" x2="25.5" y2="15.8" stroke="#000000" strokeWidth="0.7" />
                  {/* Specular White Catchlight Glint */}
                  <circle cx="25.0" cy="14.6" r="0.5" fill="#FFFFFF" />
                </g>
              ) : (
                // Natural Blink Slit
                <line x1="24.2" y1="15" x2="26.8" y2="15" stroke="#000000" strokeWidth="0.9" strokeLinecap="round" />
              )}

              {/* Cute Cat Whiskers */}
              <line x1="28" y1="17.5" x2="33" y2="16" stroke="rgba(255,255,255,0.4)" strokeWidth="0.6" strokeLinecap="round" />
              <line x1="28" y1="18.5" x2="32.5" y2="19.5" stroke="rgba(255,255,255,0.4)" strokeWidth="0.6" strokeLinecap="round" />
            </g>
          </svg>
        </div>

        {/* Minimalist Floating Status Tag (Interactive Feedback) */}
        <div
          className={`ml-1.5 px-2 py-0.5 bg-[#000000] text-[#FFFDF9] border border-[#3A352F] shadow-md font-mono text-xs tracking-wider whitespace-nowrap transition-all duration-200 pointer-events-none flex items-center gap-1.5 ${
            showBubble
              ? 'opacity-100 translate-x-0 scale-100'
              : 'opacity-0 -translate-x-2 scale-95 group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-100'
          }`}
        >
          <span className="text-[#38BDF8] font-bold uppercase">{currentAnimal.name}</span>
          <span className="text-[#81776C]">//</span>
          <span className="text-[#E6E0D6]">
            {showBubble
              ? currentAnimal.soundText
              : isAtHeader
              ? 'At Header • Scaling Rail'
              : isAtFooter
              ? 'At Footer • End of Page'
              : 'Click to Switch Companion'}
          </span>
        </div>
      </div>
    </div>
  );
};
