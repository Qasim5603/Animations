/**
 * Dynamic Drift Choreographed Snake Module
 * Introduces smooth, continuous path offsets to prevent the snake
 * from overlapping its previous tracks when doubling back.
 */
export function calculateTarget(el, time, cx, cy, t, totalCount) {
    // 1. Unified timeline lag to keep the massive body length perfectly intact
    const pathTime = time * 0.002 - t * 8.5;

    // 2. Continuous Cyclical Timeline (24-second full loop journey)
    const cycleDuration = 24;
    const currentPhase = ((pathTime % cycleDuration) + cycleDuration) % cycleDuration;

    let tx = cx;
    let ty = cy;

    // Fetch live screen dimensions
    const w = window.innerWidth;
    const h = window.innerHeight;

    // 3. MASTER DRIFT MODIFIERS (The Anti-Overlap Engine)
    // These slow-moving waves constantly relocate the canvas paths over time
    // so that subsequent loops never land on the exact same pixel coordinates.
    const horizontalDrift = Math.cos(time * 0.0008) * (w * 0.08);
    const verticalDrift = Math.sin(time * 0.0005) * (h * 0.08);

    // 4. THE WIDE-AREA CHOREOGRAPHY ENGINE 
    if (currentPhase < 6) {
        // --- PHASE 1: WIDE ZIGZAG GOING UP (0 to 6) ---
        const progression = currentPhase / 6; 
        ty = (h * 0.9) - (progression * h * 0.8);
        
        // Horizontal cuts with organic shifting drift to vary the zigzag paths
        tx = cx + Math.sin(pathTime * 4.5) * (w * 0.42) + horizontalDrift;
        ty += verticalDrift * 0.5;

    } else if (currentPhase < 12) {
        // --- PHASE 2: SWEEPING DIAGONAL CHANNEL (6 to 12) ---
        const progression = (currentPhase - 6) / 6;
        
        // Primary diagonal tracking channel
        tx = (w * 0.1) + (progression * w * 0.8);
        ty = (h * 0.1) + (progression * h * 0.8);
        
        // Secondary slither waves + drift offset to separate incoming/outgoing tracks
        tx += Math.cos(pathTime * 3.0) * (w * 0.1) + horizontalDrift;
        ty += Math.sin(pathTime * 3.0) * (h * 0.08) - verticalDrift;

    } else if (currentPhase < 18) {
        // --- PHASE 3: GIANT OPEN CIRCULAR LOOPS (12 to 18) ---
        // Circular math bounds scaled across the display area
        const loopRadiusX = w * 0.38;
        const loopRadiusY = h * 0.38;
        
        // Moving figure-eight trajectory with compound drift forces
        // The drift acts like a moving wind, shifting the circle as it spins to prevent overlapping loops
        tx = cx + Math.cos(pathTime * 3.5) * loopRadiusX + horizontalDrift * 1.2;
        ty = cy + Math.sin(pathTime * 7.0) * loopRadiusY * 0.5 + verticalDrift * 1.2;

    } else {
        // --- PHASE 4: ASCENDING WIDE ESCAPE (18 to 24) ---
        const progression = (currentPhase - 18) / 6;
        
        // Vertical lift pathing
        ty = (h * 0.85) - (progression * h * 0.75) + verticalDrift;
        tx = cx + Math.sin(pathTime * 2.8) * (w * 0.35 * (1 - progression * 0.3)) - horizontalDrift;
    }

    // 5. Maximum Velocity Tracking Adjustments
    const speedMultiplier = 2.8;
    const forceMultiplier = 3.5;

    return {
        tx: tx,
        ty: ty,
        speedMod: speedMultiplier,
        forceMod: forceMultiplier,
        useDirectSteer: true
    };
}