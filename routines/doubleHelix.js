/**
 * DNA Double Helix Formation Module
 * Renders a perfectly defined, overlapping dual-strand winding structure.
 * Fixed: Particles flow seamlessly off the right edge without backward-steering artifacts.
 */
export function calculateTarget(el, time, cx, cy, t, totalCount) {
    // 1. Let the particle maintain its natural forward horizontal movement.
    // If it doesn't have forward velocity yet (e.g., coming from another routine), give it some.
    if (el.vx < 1.5) el.vx = 2.0; 

    // Target X is simply its current position plus a tiny forward projection 
    // to keep it moving smoothly along the strand path.
    let tx = el.x + el.vx;
    
    // 2. Identify separate strands (Strand A and Strand B 180 degrees apart)
    const isStrandA = el.index < (totalCount / 2);
    const phaseOffset = isStrandA ? 0 : Math.PI;
    
    // 3. Map the vertical wave phase strictly to its current X position on screen
    const helixWaveAngle = (el.x * 0.007) + phaseOffset;
    
    // 4. Structural components
    const sineWave = Math.sin(helixWaveAngle);
    const cosineDepth = Math.cos(helixWaveAngle); // Creates depth layering perception
    
    const verticalAmplitude = 140; // Height of the helix strands from center
    const dynamicBreathing = Math.sin(time * 0.002 + el.clusterOffsetOffset) * 5;
    
    // Combine base coordinate math with cluster neighborhood spread offsets
    let ty = cy + (sineWave * verticalAmplitude) + el.clusterSpreadY + dynamicBreathing;
    tx += el.clusterSpreadX * 0.2; // Keep neighborhood tightly grouped horizontally
    
    // 5. Dynamic 3D Steering Adjustments
    const depthFactor = (cosineDepth + 1) * 0.5; // Normalizes to 0.0 - 1.0 range
    const dynamicSpeed = 1.5 + (depthFactor * 0.7); 
    const dynamicForce = 1.8 + (depthFactor * 0.5); 
    
    return {
        tx: tx,
        ty: ty,
        speedMod: dynamicSpeed,
        forceMod: dynamicForce,
        useDirectSteer: true
    };
}