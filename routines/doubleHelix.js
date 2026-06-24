/**
 * Double Helix Formation Module
 * Calculates a winding dual strand wave that scales smoothly across viewports.
 */
export function calculateTarget(el, time, cx, cy, t, totalCount) {
    const groupSize = 4;
    const baselineIndex = Math.floor(el.index / groupSize);
    let speedFactor = time * 0.28;
    
    // Calculate flowing layout matrices across the screen width
    let targetHelixX = ((baselineIndex * 20) + speedFactor) % (window.innerWidth + 100) - 50;
    
    // Split the particles into two strands 180 degrees out of phase
    let strandGroup = Math.floor(el.index / (totalCount / 2));
    let phaseOffset = (strandGroup === 0) ? 0 : Math.PI;
    
    let helixWave = targetHelixX * 0.006 + phaseOffset;
    let dynamicBreathing = Math.sin(time * 0.002 + el.clusterOffsetOffset) * 6;
    
    return {
        tx: targetHelixX + el.clusterSpreadX,
        ty: cy + Math.sin(helixWave) * 165 + el.clusterSpreadY + dynamicBreathing,
        speedMod: 1.8,  // Boost limits so particles can catch up smoothly during a transition
        forceMod: 2.0,
        useDirectSteer: true
    };
}