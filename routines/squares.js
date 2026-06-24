/**
 * Animated Grid Squares Module
 * Distributes particles into 9 geometric squares that independently zoom 
 * in and out, while forcing the particles to actively race around the perimeters.
 */
export function calculateTarget(el, time, cx, cy, t, totalCount) {
    // 1. Define a 3x3 Grid Matrix (9 major square nodes)
    const gridRows = 3;
    const gridCols = 3;
    const totalSquares = gridRows * gridCols;

    // Assign this particle to one of the 9 squares based on its index
    const squareID = el.index % totalSquares;
    const colIndex = squareID % gridCols;
    const rowIndex = Math.floor(squareID / gridCols);

    // 2. Locate the center coordinates of this specific square cell
    const w = window.innerWidth;
    const h = window.innerHeight;
    const cellWidth = w / (gridCols + 1);
    const cellHeight = h / (gridRows + 1);
    
    const boxCenterX = cellWidth * (colIndex + 1);
    const boxCenterY = cellHeight * (rowIndex + 1);

    // 3. Dynamic Zooming Calculations (Breathing scale)
    const phaseOffset = squareID * 0.6;
    const zoomScale = Math.sin(time * 0.0025 + phaseOffset); 
    const baseBoxSize = 100;
    const dynamicBoxSize = baseBoxSize + (zoomScale * 60);

    // 4. ACTIVE MOVEMENT ENGINE:
    // Distribute particles evenly, then add the global 'time' factor to make them slide forward.
    const particlesPerBox = totalCount / totalSquares;
    const staticPosition = (el.index % Math.floor(particlesPerBox)) / particlesPerBox;
    
    // Changing the addition factor adjustments changes the race-car speed around the box walls
    const movingPosition = (staticPosition + time * 0.0006) % 1; 
    const perimeterTrack = movingPosition * 4; // Scale cleanly onto 4 physical walls

    let localX = 0;
    let localY = 0;
    const halfSize = dynamicBoxSize / 2;

    // 5. Parametric Vector Side Assignment Matrix
    if (perimeterTrack < 1) {
        // Top Edge -> Moving Right
        localX = -halfSize + (perimeterTrack) * dynamicBoxSize;
        localY = -halfSize;
    } else if (perimeterTrack < 2) {
        // Right Edge -> Moving Down
        localX = halfSize;
        localY = -halfSize + (perimeterTrack - 1) * dynamicBoxSize;
    } else if (perimeterTrack < 3) {
        // Bottom Edge -> Moving Left
        localX = halfSize - (perimeterTrack - 2) * dynamicBoxSize;
        localY = halfSize;
    } else {
        // Left Edge -> Moving Up
        localX = -halfSize;
        localY = halfSize - (perimeterTrack - 3) * dynamicBoxSize;
    }

    // 6. Build final positions combined with microscopic cluster spacing
    let tx = boxCenterX + localX + el.clusterSpreadX * 0.2;
    let ty = boxCenterY + localY + el.clusterSpreadY * 0.2;

    // Boost steering limits so the sharp 90-degree corner turns look snappy and dramatic
    const speedMultiplier = 2.4;
    const forceMultiplier = 3.0;

    return {
        tx: tx,
        ty: ty,
        speedMod: speedMultiplier,
        forceMod: forceMultiplier,
        useDirectSteer: true
    };
}