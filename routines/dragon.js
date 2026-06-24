/**
 * Smooth Snake Module
 * Links particles into a continuous, sleek slithering body 
 * with unified girth and ultra-smooth wave propagation.
 */
export function calculateTarget(el, time, cx, cy, t, totalCount) {
    // Tightened phase factor so the trailing particles follow the head closer and smoother
    let snakeTheta = time * 0.0025 - t * Math.PI * 2.5;
    
    // Smooth undulating macro-pathway
    let tx = cx + Math.cos(snakeTheta) * (280 * Math.cos(snakeTheta * 0.2));
    let ty = cy + Math.sin(snakeTheta) * (160 * Math.sin(snakeTheta * 0.4));
    
    // Add a secondary micro-wave for an organic, muscle-flexing slither
    ty += Math.sin(t * 8 + time * 0.04) * 25;
    tx += Math.cos(t * 4 + time * 0.02) * 15;

    return {
        tx: tx,
        ty: ty,
        speedMod: 1.3, // Subtle speed adjustment to avoid stretching the body thin
        forceMod: 1.5,
        useDirectSteer: true
    };
}