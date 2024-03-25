let waterVolume = 100; // mL
let naclMass = 0; // grams
let beakerWidth = 200;
let beakerHeight = 300;
let maxVolume = 300; // Max volume of water the beaker can hold

function setup() {
    createCanvas(400, 400);
    // Create buttons for adding NaCl and water
    let addNaClButton = createButton('Add NaCl (n)');
    addNaClButton.mousePressed(addNaCl);

    let addWaterButton = createButton('Add Water (V)');
    addWaterButton.mousePressed(addWater);

    // Reset button
    let resetButton = createButton('Reset');
    resetButton.mousePressed(resetBeaker);

    // Position buttons
    addNaClButton.position(10, height + 10);
    addWaterButton.position(150, height + 10);
    resetButton.position(290, height + 10);

    noLoop(); // No need to loop until an action is performed
}

function draw() {
    background(220);
    drawBeaker();
    let concentration = calculateConcentration();
    fill(0);
    noStroke();
    text(`Concentration (c) of [NaCl]: ${concentration.toFixed(2)} mol/L`, 10, 20);
}

// Other functions (drawBeaker, calculateConcentration, addNaCl, addWater) remain the same

function resetBeaker() {
    waterVolume = 100; // Reset water volume
    naclMass = 0; // Reset NaCl mass
    redraw(); // Redraw the sketch with initial values
}

function drawBeaker() {
    let waterHeight = map(waterVolume, 0, maxVolume, 0, beakerHeight);

    // Colors
    let beakerColor = color(200);
    let waterColor = color(64, 164, 223, 180); // Semi-transparent blue

    // Beaker outline with lip and base
    stroke(0);
    fill(beakerColor);
    beginShape();
    vertex(width / 2 - beakerWidth / 2, height - 10); // Bottom left
    vertex(width / 2 - beakerWidth / 2, height - beakerHeight - 10); // Top left
    vertex(width / 2 - beakerWidth / 2 - 10, height - beakerHeight - 20); // Outer top left (lip)
    vertex(width / 2 + beakerWidth / 2 + 10, height - beakerHeight - 20); // Outer top right (lip)
    vertex(width / 2 + beakerWidth / 2, height - beakerHeight - 10); // Top right
    vertex(width / 2 + beakerWidth / 2, height - 10); // Bottom right
    endShape(CLOSE);

    // Beaker base
    rect(width / 2 - beakerWidth / 2 - 5, height - 10, beakerWidth + 10, 10);

    // Water
    fill(0, 0, 255, 127); // Adjusted color for water
    noStroke();
    rect(width / 2 - beakerWidth / 2, height - 10 - waterHeight, beakerWidth, waterHeight);

    // Draw NaCl dots within the water
    drawNaClDots(waterHeight);
}

function drawNaClDots(waterHeight) {
    let dotCount = naclMass; // Simple proportion: 1 gram = 1 dot
    let waterTopY = height - 10 - waterHeight;
    for (let i = 0; i < dotCount; i++) {
        let dotX = random(width / 2 - beakerWidth / 2, width / 2 + beakerWidth / 2);
        let dotY = random(waterTopY, height - 10);
        fill(255); // White dots for NaCl
        noStroke();
        ellipse(dotX, dotY, 2, 2); // Draw small dots
    }
}

function drawMeasurementLines() {
    stroke(80);
    strokeWeight(1);
    for (let i = 0; i <= maxVolume; i += 50) { // Every 50 mL
        let y = map(i, 0, maxVolume, height - 10, height - beakerHeight - 10);
        line(width / 2 - beakerWidth / 2, y, width / 2 - beakerWidth / 2 - 5, y); // Left side lines
        line(width / 2 + beakerWidth / 2, y, width / 2 + beakerWidth / 2 + 5, y); // Right side lines
    }
}


function calculateConcentration() {
    // Concentration = mass of NaCl / volume of water
    // Assuming 1 mL of water = 1 gram for simplicity
    return naclMass / waterVolume;
}

function addNaCl() {
    naclMass += 5;
    redraw(); // Update the drawing with new values
}

function addWater() {
    waterVolume += 10;
    waterVolume = constrain(waterVolume, 0, maxVolume);
    redraw(); // Update the drawing with new values
}
