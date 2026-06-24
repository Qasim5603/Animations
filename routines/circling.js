/**
 * Circling Orbit Module
 * Organizes the swarm into an organic rotating ring formation.
 */
export function calculateTarget(el, time, cx, cy, t, totalCount) {
    // Calculate a dynamic radius that pulses organically per particle
    let orbitRadius = 180 + Math.sin(el.index + time * 0.01) * 30;
    
    // Spread the particles evenly around 360 degrees (PI * 2) and advance over time
    let theta = t * Math.PI * 2 + (time * 0.002);
    
    return {
        tx: cx + Math.cos(theta) * orbitRadius,
        ty: cy + Math.sin(theta) * orbitRadius,
        useDirectSteer: true
    };
}