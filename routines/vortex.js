/**
 * Vortex Spiral Module
 * Pulls the swarm into a deep, spinning black-hole gravity well.
 */
export function calculateTarget(el, time, cx, cy, t, totalCount) {
    let dx = cx - el.x;
    let dy = cy - el.y;
    let dRadius = Math.hypot(dx, dy);
    
    if (dRadius > 5) {
        // Combines an inward gravitational pull with a tangential rotational push
        let pullAngle = Math.atan2(dy, dx) + 0.9; 
        el.vx += Math.cos(pullAngle) * 0.18;
        el.vy += Math.sin(pullAngle) * 0.18;
    } else {
        // Recycle particles that hit the center back to random edge positions
        el.x = Math.random() * window.innerWidth;
        el.y = Math.random() * window.innerHeight;
    }
    
    return { 
        useDirectSteer: false // Using direct acceleration forces instead of a hard point coordinate
    };
}