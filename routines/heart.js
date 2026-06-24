/**
 * Beating Heart Module
 * Maps the swarm onto a cardioid equation pathway with a synchronized pulse.
 */
export function calculateTarget(el, time, cx, cy, t, totalCount) {
    // Distribute particles evenly along the parametric curve path (0 to 2*PI)
    let hTheta = t * Math.PI * 2;
    
    // Dynamic pulsing factor to mimic a beating heart contraction
    let pulse = 13 * (1 + Math.abs(Math.sin(time * 0.005)) * 0.25);
    
    // Parametric Heart Equations
    let tx = cx + 16 * Math.pow(Math.sin(hTheta), 3) * pulse;
    let ty = cy - (13 * Math.cos(hTheta) - 5 * Math.cos(2 * hTheta) - 2 * Math.cos(3 * hTheta) - Math.cos(4 * hTheta)) * pulse;
    
    return {
        tx: tx,
        ty: ty,
        useDirectSteer: true
    };
}