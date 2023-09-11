var canvas;

let camShader;
let cam;
let time = 0.0;

function windowResized() {
    resizeCanvas(windowWidth, windowHeight, WEBGL);
}

function preload() {
    camShader = loadShader('../shader/simple.vert', '../shader/effect.frag');
}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    canvas.parent("P5Canvas");

    cam = createCapture(VIDEO);
    cam.size(windowWidth, windowHeight);
    cam.hide();
}

function draw() {
    shader(camShader);

    const mx = map(mouseX, 0, width, 0, 1.0);

    camShader.setUniform('_MouseX', mx);
    camShader.setUniform('_Time', time);
    camShader.setUniform('_CamTex', cam);

    camShader.setUniform('_InputA', keyIsDown(65) ? 1 : 0);
    camShader.setUniform('_InputS', keyIsDown(83) ? 1 : 0);
    camShader.setUniform('_InputD', keyIsDown(68) ? 1 : 0);
    camShader.setUniform('_InputF', keyIsDown(70) ? 1 : 0);
    camShader.setUniform('_InputG', keyIsDown(71) ? 1 : 0);
    camShader.setUniform('_InputH', keyIsDown(72) ? 1 : 0);

    rect(0, 0, width, height);

    time += deltaTime;
}