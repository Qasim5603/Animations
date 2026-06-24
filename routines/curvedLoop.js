/**
 * Curved Infinity Loop Module
 * Guides the swarm along a fluid, twisting figure-eight parametric pathway.
 */
export function calculateTarget(el, time, cx, cy, t, totalCount) {
    // Distribute particles across the track and progress over time
    let loopT = t * Math.PI * 2 + (time * 0.001);
    
    // Parametric Lemniscate calculation mapping
    let tx = cx + (Math.sin(loopT) * 320);
    let ty = cy + (Math.sin(loopT) * Math.cos(loopT) * 180);
    
    return {
        tx: tx,
        ty: ty,
        useDirectSteer: true
    };
}