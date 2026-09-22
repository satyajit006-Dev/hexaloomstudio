import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export interface CatSkinColors {
  backColor: string;
  bellyColor: string;
  farLimbColor: string;
  nearLimbColor: string;
  eyeColor: string;
  tailColor: string;
  earInnerColor: string;
  poleColor: string;
}

interface ThreeCatClimberProps {
  colors: CatSkinColors;
  walkPhase: number;
  tailPhase: number;
  blink: boolean;
  isScrolling: boolean;
  reducedMotion?: boolean;
}

export const ThreeCatClimber: React.FC<ThreeCatClimberProps> = ({
  colors,
  walkPhase,
  tailPhase,
  blink,
  isScrolling,
  reducedMotion = false
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);

  // Mesh & Rig references
  const rootGroupRef = useRef<THREE.Group | null>(null);
  const torsoRef = useRef<THREE.Group | null>(null);
  const headRef = useRef<THREE.Group | null>(null);
  const eyeLeftRef = useRef<THREE.Mesh | null>(null);
  const eyeRightRef = useRef<THREE.Mesh | null>(null);

  // Limbs: [upperArm, forearm, paw]
  const fnLimbRef = useRef<{ base: THREE.Group; mid: THREE.Group; paw: THREE.Mesh } | null>(null);
  const ffLimbRef = useRef<{ base: THREE.Group; mid: THREE.Group; paw: THREE.Mesh } | null>(null);
  const hnLimbRef = useRef<{ base: THREE.Group; mid: THREE.Group; paw: THREE.Mesh } | null>(null);
  const hfLimbRef = useRef<{ base: THREE.Group; mid: THREE.Group; paw: THREE.Mesh } | null>(null);

  // Tail segments
  const tailSegmentsRef = useRef<THREE.Group[]>([]);

  // Materials to update on skin change
  const materialsRef = useRef<{
    back: THREE.MeshStandardMaterial;
    belly: THREE.MeshStandardMaterial;
    nearLimb: THREE.MeshStandardMaterial;
    farLimb: THREE.MeshStandardMaterial;
    eye: THREE.MeshStandardMaterial;
    tail: THREE.MeshStandardMaterial;
    earInner: THREE.MeshStandardMaterial;
    pole: THREE.MeshStandardMaterial;
    claw: THREE.MeshStandardMaterial;
  } | null>(null);

  // 1. Initial Scene Setup
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = 110;
    const height = 150;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Orthographic Camera for crisp, zero-distortion 2.5D/3D profile matching video
    const aspect = width / height;
    const viewHeight = 15.0;
    const viewWidth = viewHeight * aspect;
    const camera = new THREE.OrthographicCamera(
      -viewWidth / 2,
      viewWidth / 2,
      viewHeight / 2,
      -viewHeight / 2,
      0.1,
      100
    );
    // Slight side/front angle (Z=16, X=1.8, Y=0.2) to reveal 3D volume and far limbs
    camera.position.set(0.6, 0.2, 18);
    camera.lookAt(0.2, 0.0, 0);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xdde5ed, 1.1);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.4);
    dirLight.position.set(6, 10, 8);
    scene.add(dirLight);

    // Cool rim light from rear-left to enhance the cel-shaded outline
    const rimLight = new THREE.DirectionalLight(0x7dd3fc, 0.75);
    rimLight.position.set(-8, -2, -6);
    scene.add(rimLight);

    // Warm underside fill
    const fillLight = new THREE.DirectionalLight(0xffecd1, 0.45);
    fillLight.position.set(0, -6, 5);
    scene.add(fillLight);

    // =========================================================================
    // MATERIALS
    // =========================================================================
    const backMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(colors.backColor),
      roughness: 0.55,
      metalness: 0.1
    });

    const bellyMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(colors.bellyColor),
      roughness: 0.65,
      metalness: 0.05
    });

    const nearLimbMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(colors.nearLimbColor),
      roughness: 0.6,
      metalness: 0.05
    });

    const farLimbMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(colors.farLimbColor),
      roughness: 0.7,
      metalness: 0.15
    });

    const eyeMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(colors.eyeColor),
      roughness: 0.1,
      metalness: 0.1,
      emissive: new THREE.Color(colors.eyeColor),
      emissiveIntensity: 0.35
    });

    const tailMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(colors.tailColor),
      roughness: 0.6,
      metalness: 0.1
    });

    const earInnerMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(colors.earInnerColor),
      roughness: 0.75
    });

    const poleMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x222222),
      roughness: 0.3,
      metalness: 0.7
    });

    const clawMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x111620),
      roughness: 0.4
    });

    materialsRef.current = {
      back: backMat,
      belly: bellyMat,
      nearLimb: nearLimbMat,
      farLimb: farLimbMat,
      eye: eyeMat,
      tail: tailMat,
      earInner: earInnerMat,
      pole: poleMat,
      claw: clawMat
    };

    // =========================================================================
    // 3D MODEL RIG
    // =========================================================================
    const rootGroup = new THREE.Group();
    rootGroupRef.current = rootGroup;
    scene.add(rootGroup);

    // 1. Vertical Pole (Cylinder)
    const poleRadius = 0.14;
    const poleGeo = new THREE.CylinderGeometry(poleRadius, poleRadius, 18, 16);
    const poleMesh = new THREE.Mesh(poleGeo, poleMat);
    poleMesh.position.set(-3.4, 0, 0);
    scene.add(poleMesh);

    // 2. Torso Group
    const torso = new THREE.Group();
    torso.position.set(-0.8, 0, 0);
    rootGroup.add(torso);
    torsoRef.current = torso;

    // Dorsal Back Coat (Curved arched spine)
    const backGeo = new THREE.CylinderGeometry(1.4, 1.6, 5.2, 16);
    backGeo.scale(1.1, 1.0, 0.85);
    const backMesh = new THREE.Mesh(backGeo, backMat);
    backMesh.position.set(0.6, 0.2, 0);
    backMesh.rotation.z = -0.12;
    torso.add(backMesh);

    // Ventral Belly (Soft lighter underside facing pole)
    const bellyGeo = new THREE.SphereGeometry(1.6, 16, 16);
    bellyGeo.scale(0.85, 1.4, 0.75);
    const bellyMesh = new THREE.Mesh(bellyGeo, bellyMat);
    bellyMesh.position.set(-0.35, 0.1, 0);
    torso.add(bellyMesh);

    // Chest Front
    const chestGeo = new THREE.SphereGeometry(1.3, 14, 14);
    chestGeo.scale(0.8, 1.1, 0.75);
    const chestMesh = new THREE.Mesh(chestGeo, bellyMat);
    chestMesh.position.set(-0.2, 1.8, 0);
    torso.add(chestMesh);

    // 3. Head & Neck
    const head = new THREE.Group();
    head.position.set(0.2, 3.2, 0);
    torso.add(head);
    headRef.current = head;

    // Skull Base
    const skullGeo = new THREE.SphereGeometry(1.35, 16, 16);
    skullGeo.scale(1.0, 0.95, 0.9);
    const skullMesh = new THREE.Mesh(skullGeo, backMat);
    head.add(skullMesh);

    // Muzzle / Snout (tilted slightly up towards the pole climb)
    const muzzleGeo = new THREE.ConeGeometry(0.7, 1.0, 12);
    muzzleGeo.rotateZ(Math.PI * 0.42);
    const muzzleMesh = new THREE.Mesh(muzzleGeo, backMat);
    muzzleMesh.position.set(0.8, -0.15, 0);
    head.add(muzzleMesh);

    // Cute dark nose tip
    const noseGeo = new THREE.SphereGeometry(0.18, 8, 8);
    const noseMesh = new THREE.Mesh(noseGeo, clawMat);
    noseMesh.position.set(1.45, 0.05, 0);
    head.add(noseMesh);

    // Ears
    const earGeo = new THREE.ConeGeometry(0.6, 1.2, 4);
    earGeo.rotateX(Math.PI * 0.15);

    // Near Ear
    const nearEar = new THREE.Mesh(earGeo, backMat);
    nearEar.position.set(0.1, 1.25, 0.55);
    nearEar.rotation.z = -0.25;
    nearEar.rotation.y = 0.2;
    head.add(nearEar);

    const nearEarInner = new THREE.Mesh(earGeo, earInnerMat);
    nearEarInner.scale.set(0.65, 0.65, 0.65);
    nearEarInner.position.set(0.18, 1.15, 0.65);
    nearEarInner.rotation.z = -0.25;
    nearEarInner.rotation.y = 0.2;
    head.add(nearEarInner);

    // Far Ear
    const farEar = new THREE.Mesh(earGeo, farLimbMat);
    farEar.position.set(-0.1, 1.3, -0.55);
    farEar.rotation.z = -0.3;
    farEar.rotation.y = -0.2;
    head.add(farEar);

    // Glowing Eyes
    const eyeGeo = new THREE.SphereGeometry(0.24, 10, 10);
    eyeGeo.scale(1.2, 1.0, 0.5);

    const nearEye = new THREE.Mesh(eyeGeo, eyeMat);
    nearEye.position.set(0.85, 0.35, 0.62);
    nearEye.rotation.y = 0.4;
    head.add(nearEye);
    eyeRightRef.current = nearEye;

    const farEye = new THREE.Mesh(eyeGeo, eyeMat);
    farEye.position.set(0.85, 0.35, -0.62);
    farEye.rotation.y = -0.4;
    head.add(farEye);
    eyeLeftRef.current = farEye;

    // Pupil Slit on near eye
    const pupilGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.36, 6);
    const pupilMesh = new THREE.Mesh(pupilGeo, clawMat);
    pupilMesh.position.set(0.98, 0.35, 0.68);
    head.add(pupilMesh);

    // =========================================================================
    // ARTICULATED 4-LIMB RIGGING
    // =========================================================================
    const createLimb = (isHind: boolean, isNear: boolean) => {
      const baseGroup = new THREE.Group();
      const midGroup = new THREE.Group();
      baseGroup.add(midGroup);

      const limbMat = isNear ? nearLimbMat : farLimbMat;
      const zOffset = isNear ? 0.9 : -0.9;

      const upperLen = isHind ? 1.9 : 1.6;
      const lowerLen = isHind ? 1.8 : 1.5;
      const radius = isHind ? 0.44 : 0.38;

      // Upper limb cylinder
      const upperGeo = new THREE.CylinderGeometry(radius * 0.9, radius, upperLen, 10);
      upperGeo.translate(0, -upperLen / 2, 0);
      const upperMesh = new THREE.Mesh(upperGeo, limbMat);
      baseGroup.add(upperMesh);

      // Mid group placed at bottom of upper limb
      midGroup.position.set(0, -upperLen, 0);

      // Knee / Elbow joint sphere
      const jointGeo = new THREE.SphereGeometry(radius * 0.95, 10, 10);
      const jointMesh = new THREE.Mesh(jointGeo, limbMat);
      midGroup.add(jointMesh);

      // Lower limb cylinder
      const lowerGeo = new THREE.CylinderGeometry(radius * 0.75, radius * 0.9, lowerLen, 10);
      lowerGeo.translate(0, -lowerLen / 2, 0);
      const lowerMesh = new THREE.Mesh(lowerGeo, limbMat);
      midGroup.add(lowerMesh);

      // Paw Group at bottom of lower limb
      const pawGeo = new THREE.SphereGeometry(radius * 1.1, 12, 12);
      pawGeo.scale(1.2, 0.8, 1.1);
      const pawMesh = new THREE.Mesh(pawGeo, limbMat);
      pawMesh.position.set(0, -lowerLen, 0);
      midGroup.add(pawMesh);

      // Claw grip hooks that wrap the pole
      const clawGeo = new THREE.BoxGeometry(0.12, 0.18, 0.32);
      const clawMesh = new THREE.Mesh(clawGeo, clawMat);
      clawMesh.position.set(-0.25, 0, 0);
      pawMesh.add(clawMesh);

      baseGroup.position.z = zOffset;
      torso.add(baseGroup);

      return { base: baseGroup, mid: midGroup, paw: pawMesh };
    };

    // Instantiate 4 limbs
    fnLimbRef.current = createLimb(false, true); // Forelimb Near
    ffLimbRef.current = createLimb(false, false); // Forelimb Far
    hnLimbRef.current = createLimb(true, true); // Hindlimb Near
    hfLimbRef.current = createLimb(true, false); // Hindlimb Far

    // Set base mounting points on torso
    fnLimbRef.current.base.position.set(-0.2, 1.4, 0.85);
    ffLimbRef.current.base.position.set(-0.4, 1.4, -0.85);
    hnLimbRef.current.base.position.set(0.4, -1.8, 0.95);
    hfLimbRef.current.base.position.set(0.2, -1.8, -0.95);

    // =========================================================================
    // SERPENTINE BONE CHAIN TAIL
    // =========================================================================
    const tailSegments: THREE.Group[] = [];
    const tailCount = 6;
    let parentGroup: THREE.Group = torso;
    const tailSegLen = 0.85;

    for (let i = 0; i < tailCount; i++) {
      const segGroup = new THREE.Group();
      if (i === 0) {
        segGroup.position.set(1.2, -2.2, 0);
      } else {
        segGroup.position.set(0, -tailSegLen, 0);
      }

      const r1 = 0.32 * (1 - i / (tailCount + 1));
      const r2 = 0.32 * (1 - (i + 1) / (tailCount + 1));
      const segGeo = new THREE.CylinderGeometry(r2, r1, tailSegLen, 8);
      segGeo.translate(0, -tailSegLen / 2, 0);
      const segMesh = new THREE.Mesh(segGeo, tailMat);
      segGroup.add(segMesh);

      parentGroup.add(segGroup);
      tailSegments.push(segGroup);
      parentGroup = segGroup;
    }
    tailSegmentsRef.current = tailSegments;

    // Render initial frame
    renderer.render(scene, camera);

    return () => {
      renderer.dispose();
      backGeo.dispose();
      bellyGeo.dispose();
      chestGeo.dispose();
      skullGeo.dispose();
      earGeo.dispose();
      eyeGeo.dispose();
      poleGeo.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // 2. Update Materials on Color Theme Change
  useEffect(() => {
    if (!materialsRef.current) return;
    const m = materialsRef.current;
    m.back.color.set(colors.backColor);
    m.belly.color.set(colors.bellyColor);
    m.nearLimb.color.set(colors.nearLimbColor);
    m.farLimb.color.set(colors.farLimbColor);
    m.eye.color.set(colors.eyeColor);
    m.eye.emissive.set(colors.eyeColor);
    m.tail.color.set(colors.tailColor);
    m.earInner.color.set(colors.earInnerColor);
  }, [colors]);

  // 3. 60FPS Kinematic Update & IK Solver Loop
  useEffect(() => {
    if (reducedMotion || !sceneRef.current || !rendererRef.current) return;

    // Pole X coordinate in local scene units
    const poleX = -3.4;
    const normPhase = ((walkPhase % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2) / (Math.PI * 2);

    // =========================================================================
    // 4-BEAT CLIMBING IK SOLVER:
    // Solve 2-bone arm/leg angles to reach pawTarget (x, y)
    // =========================================================================
    const solveTwoBoneIK = (
      limb: { base: THREE.Group; mid: THREE.Group; paw: THREE.Mesh },
      targetX: number,
      targetY: number,
      upperLen: number,
      lowerLen: number,
      flipKnee: boolean = false
    ) => {
      // Vector from limb base to target in torso-local coordinate space
      const dx = targetX - limb.base.position.x;
      const dy = targetY - limb.base.position.y;
      const dist = Math.min(Math.hypot(dx, dy), (upperLen + lowerLen) * 0.999);

      // Law of Cosines
      const angleToTarget = Math.atan2(dx, -dy);
      const cosUpper = (upperLen * upperLen + dist * dist - lowerLen * lowerLen) / (2 * upperLen * dist);
      const angleUpperOffset = Math.acos(Math.max(-1, Math.min(1, cosUpper)));

      const cosLower = (upperLen * upperLen + lowerLen * lowerLen - dist * dist) / (2 * upperLen * lowerLen);
      const angleLowerOffset = Math.PI - Math.acos(Math.max(-1, Math.min(1, cosLower)));

      if (flipKnee) {
        limb.base.rotation.z = angleToTarget - angleUpperOffset;
        limb.mid.rotation.z = angleLowerOffset;
      } else {
        limb.base.rotation.z = angleToTarget + angleUpperOffset;
        limb.mid.rotation.z = -angleLowerOffset;
      }
    };

    // Calculate paw trajectory along pole
    const getClimbingPawTrajectory = (swingStart: number, baseGripY: number) => {
      const cyclePos = (normPhase - swingStart + 1) % 1;
      const swingDuration = 0.25;

      let x: number;
      let y: number;

      if (cyclePos < swingDuration) {
        // Swing phase: release pole, reach high, grip anew
        const t = cyclePos / swingDuration;
        if (t < 0.3) {
          const subT = t / 0.3;
          x = poleX + subT * 1.1; // Pulls back off pole
          y = baseGripY + 0.4 - subT * 0.3;
        } else if (t < 0.8) {
          const subT = (t - 0.3) / 0.5;
          x = poleX + 1.1 * (1 - subT);
          y = baseGripY + 0.1 - subT * 2.4; // Reaches high along pole
        } else {
          const subT = (t - 0.8) / 0.2;
          x = poleX;
          y = baseGripY - 2.3 + subT * 0.2;
        }
      } else {
        // Stance phase: locked on pole, sliding down relative to torso
        const t = (cyclePos - swingDuration) / (1 - swingDuration);
        x = poleX;
        y = baseGripY - 2.1 + t * 2.5;
      }

      return { x, y };
    };

    // Solve for each limb
    if (fnLimbRef.current) {
      const traj = getClimbingPawTrajectory(0.00, 1.4);
      solveTwoBoneIK(fnLimbRef.current, traj.x, traj.y, 1.6, 1.5, false);
    }
    if (hnLimbRef.current) {
      const traj = getClimbingPawTrajectory(0.25, -1.8);
      solveTwoBoneIK(hnLimbRef.current, traj.x, traj.y, 1.9, 1.8, true);
    }
    if (ffLimbRef.current) {
      const traj = getClimbingPawTrajectory(0.50, 1.4);
      solveTwoBoneIK(ffLimbRef.current, traj.x, traj.y, 1.6, 1.5, false);
    }
    if (hfLimbRef.current) {
      const traj = getClimbingPawTrajectory(0.75, -1.8);
      solveTwoBoneIK(hfLimbRef.current, traj.x, traj.y, 1.9, 1.8, true);
    }

    // Organic Body Dynamics
    if (torsoRef.current) {
      torsoRef.current.position.x = -0.8 + Math.sin(walkPhase) * 0.18;
      torsoRef.current.position.y = Math.sin(walkPhase * 2) * 0.22;
      torsoRef.current.rotation.z = Math.sin(walkPhase) * 0.05;
      torsoRef.current.rotation.y = Math.sin(walkPhase) * 0.08;
    }

    // Head bobbing & tracking
    if (headRef.current) {
      headRef.current.position.y = 3.2 + Math.sin(walkPhase * 2 + 0.4) * 0.16;
      headRef.current.rotation.z = -0.15 + Math.sin(walkPhase) * 0.06;
    }

    // Natural Eye Blinking
    if (eyeLeftRef.current && eyeRightRef.current) {
      const scaleY = blink ? 0.08 : 1.0;
      eyeLeftRef.current.scale.y = scaleY;
      eyeRightRef.current.scale.y = scaleY;
    }

    // Fluid Serpentine Tail Harmonic Swing
    tailSegmentsRef.current.forEach((seg, i) => {
      const delay = i * 0.45;
      const angle = Math.sin(tailPhase - delay) * (0.16 + i * 0.05);
      seg.rotation.z = angle;
      seg.rotation.x = Math.cos(tailPhase - delay) * 0.08;
    });

    // Render frame
    if (rendererRef.current && sceneRef.current && cameraRef.current) {
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    }
  }, [walkPhase, tailPhase, blink, reducedMotion, isScrolling]);

  return <div ref={mountRef} className="w-[110px] h-[150px] pointer-events-none select-none" />;
};
