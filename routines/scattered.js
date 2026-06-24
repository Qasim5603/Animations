/**
 * Scattered Flow Field Module
 * Manipulates the particle velocities directly using a continuous wave grid.
 */
export function calculateTarget(el, time, cx, cy, t, totalCount) {
    // Generate a vector angle based on the element's current position and time
    let angle = Math.sin(el.x * 0.003 + time * 0.0005) * Math.PI * 2 +
                Math.cos(el.y * 0.003 - time * 0.0005) * Math.PI * 2;
    
    // Inject incremental force into the velocity vectors
    el.vx += Math.cos(angle) * 0.1;
    el.vy += Math.sin(angle) * 0.1;
    
    return {
        useDirectSteer: false // False because we are updating velocities manually instead of steering toward a target
    };
}