var screen = 0;
var y = -20;
var x = 200;
var speed = 4;
var score = 0;
let randomScore;

function pickRandom() {
    randomScore = Math.floor(Math.random() * 8) + 8;
    randomconc = Math.random() * (8 - 0.5) + 0.5;
    randommole = randomconc * 0.01;
    finalconc = (randommole / randomScore * 1000).toFixed(3);
}

function setup() {
    createCanvas(700, 400);
}

function draw() {
    if (screen === 0) {
        startScreen()
    } else if (screen === 1) {
        gameOn()
    } else if (screen === 2) {
        endScreen()
    } else if (screen === 3) {
        playAgainScreen()
    }
}

function startScreen() {
    background(96, 157, 255)
    fill(255);
    textAlign(CENTER);
    textSize(36); // increase font size
    text('Titration Game', width / 2, height / 2);
    textSize(24); // increase font size
    text('click to start', width / 2, height / 2 + 40); //     increase y-coordinate to add more space between lines
    reset();
    reset();
}

function drawCup() {
    // set the color of the flask to white
    fill(255);
    // calculate the X-coordinate of the cup, clamped to the range [25, width-25]
    // calculate the left and right boundaries of the cup based on the mouse position
    let leftBound = mouseX - 25;
    let rightBound = mouseX + 25;

    // check if the left boundary is off the screen and adjust it if necessary
    if (leftBound < 0) {
        rightBound -= leftBound;
        leftBound = 0;
    }

    // check if the right boundary is off the screen and adjust it if necessary
    if (rightBound > width) {
        leftBound -= (rightBound - width);
        rightBound = width;
    }

    beginShape();
    vertex(mouseX - 25, height); // bottom left corner
    vertex(mouseX + 25, height); // bottom right corner
    vertex(mouseX + 20, height - 30); // top right corner
    vertex(mouseX + 10, height - 50); // top right neck
    vertex(mouseX - 10, height - 50); // top left neck
    vertex(mouseX - 20, height - 30); // top left corner
    rect(mouseX, height - 80, -10, 30);
    rect(mouseX, height - 80, 10, 30);
    rect(mouseX, height - 80, -15, 10);
    rect(mouseX, height - 80, 15, 10);
    endShape(CLOSE);

    // set the liquid color to blue if the score is less than the randomScore, 
    // or red if the score is greater than or equal to the randomScore
    if (score >= randomScore) {
        liquidColor = color(255, 0, 0, 50); // set liquid color to red with opacity of 50
    } else {
        liquidColor = color(0, 0, 255, 50); // set liquid color to blue with opacity of 50
    }

    // draw the liquid inside the cup with the current liquid color
    fill(liquidColor);
    beginShape();
    vertex(mouseX - 25, height); // bottom left corner
    vertex(mouseX + 25, height); // bottom right corner
    vertex(mouseX + 20, height - 30); // top right corner
    vertex(mouseX + 10, height - 50); // top right neck
    vertex(mouseX - 10, height - 50); // top left neck
    vertex(mouseX - 20, height - 30); // top left corner
    vertex(mouseX - 25, height); // bottom left corner
    endShape(CLOSE);
}


function drawTearDrop() {
    noStroke(); // remove stroke
    fill(0, 0, 255); // set the color to red
    beginShape();
    vertex(x, y); // bottom point
    quadraticVertex(x + 3, y + 6, x + 6, y + 12); // right curve
    quadraticVertex(x, y + 8, x - 6, y + 12); // top curve
    quadraticVertex(x - 3, y + 6, x, y); // left curve
    endShape(CLOSE);
    fill(0, 0, 255); // set the color to white
    ellipse(x, y + 12, 10, 10); // draw a sphere at the bottom of the teardrop
}


function gameOn() {
    background(0)
    fill(255)
    text("Titrant added = " + score + " mL of NaOH", 175, 30)
    text("Analyte = 10 mL, " + randomconc + " M of HCl", 165, 60)
    drawTearDrop();
    drawCup();
    y += speed;
    if (y > height) {
        screen = 2
    }
    if (y > height - 10 && x > mouseX - 20 && x < mouseX + 20) {
        y = -20
        speed += .5
        score += 1
    }
    if (y == -20) {
        pickRandom();
    }
}

function pickRandom() {
    x = random(20, width - 20)
}

function endScreen() {
    background(15);
    textAlign(CENTER);
    fill(255)
    textSize(40); // increase font size to 40
    text('GAME OVER', width / 2, height / 2 - 140);
    textSize(30); // increase font size to 40
    text('Analyte:', width / 2, height / 2 - 100);
    textSize(20); // increase font size to 20
    text("hydrochloric acid", width / 2, height / 2 - 75);
    textSize(20); // increase font size to 20
    text("Analyte volume = 10 mL", width / 2, height / 2 - 55);
    textSize(20); // increase font size to 20
    text("Analyte concentration = " + randomconc + " M", width / 2, height / 2 - 35);
    textSize(30); // increase font size to 40
    text('Titrant:', width / 2, height / 2 + 5);
    textSize(20); // increase font size to 20
    text("sodium hydroxide", width / 2, height / 2 + 30);
    textSize(20); // increase font size to 20
    text("Titrant added = " + score + " mL", width / 2, height / 2 + 50);
    text("Titrant required for equivalence = " + randomScore + " mL", width / 2, height / 2 + 70);
    fill(255, 0, 0)
    textSize(20); // increase font size to 16
    text('Calculate the concentration of titrant and click to see answer', width / 2, height / 2 + 120);
}

function playAgainScreen() {
    background(96, 157, 255)
    fill(255)
    textAlign(CENTER);
    textSize(40);
    text('Check your calculation', width / 2, height / 2 - 140)
    textSize(18); // increase font size to 20
    text("HCl (aq) + NaOH (aq) --> H2O (l) + NaCl (aq)", width / 2, height / 2 - 75);
    textSize(18); // increase font size to 20
    text("moles of HCl = 0.01 L * " + randomconc + " M", width / 2, height / 2 - 55);
    textSize(18); // increase font size to 20
    text("               = " + randommole + "mol", width / 2, height / 2 - 35);
    textSize(18); // increase font size to 20
    text("mol of HCl = mol of NaOH", width / 2, height / 2 - 15);
    textSize(18); // increase font size to 20
    text("mol of NaOH = " + randommole + "mol", width / 2, height / 2 + 5);
    textSize(18);
    text("Conc of NaOH = " + randommole + "mol /(" + randomScore + "* 0.001 L)", width / 2, height / 2 + 25);
    textSize(18);
    text("Conc of NaOH =" + finalconc + " M", width / 2, height / 2 + 45);
    fill(255, 0, 0)
    textSize(30);
    text('click to play again', width / 2, height / 2 + 120);
}

function mouseClicked() {
    if (screen === 0) {
        screen = 1
    } else if (screen === 2) {
        screen = 3
    } else if (screen === 3) {
        screen = 1
        reset()
    }
}



function reset() {
    randomScore = Math.floor(Math.random() * 8) + 8; // generates random number between 8 and 15
    randomconc = Math.floor(Math.random() * (8 - 0.5) + 0.5); // generates random number between 0.5 and 8
    randommole = randomconc * 0.01;
    finalconc = (randommole / randomScore * 1000).toFixed(3);
    score = 0;
    speed = 4;
    y = -20;
}