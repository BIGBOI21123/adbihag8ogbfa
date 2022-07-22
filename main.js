let video;
let detector;
let objects = [];

function setup() {
  canvas = createCanvas(500, 340);
  video = createCapture(VIDEO, videoReady);
  video.size(500, 460);
  video.hide();
}

function videoReady() {
  detector = ml5.objectDetector('cocossd', modelReady);
}

function gotDetections(error, results) {
  if (error) {
    console.error(error);
  }
  objects = results;
  detector.detect(video, gotDetections);
}

function modelReady() {
  detector.detect(video, gotDetections);
}

function draw() {
  image(video, 0, 0);
  for (let i = 0; i < objects.length; i += 1) {
    if (objects.toString().includes("person") == false) {
        document.getElementById("bstatus").innerHTML = "BABY GONE"
    }
    stroke(0, 255, 0);
    strokeWeight(4);
    noFill();
    rect(objects.x, objects.y, objects.width, objects.height);
    noStroke();
    fill(255);
    textSize(24);
    text(objects.label, objects.x + 10, objects.y + 24);
  }
}