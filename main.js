var img = "";
status = "";
var object = [];
sam="";
function preload() {
    
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.position(450,300);
    objectDetector = ml5.objectDetector('cocossd', modelReady);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}

function draw() {
    //dog

    image(video, 0, 0, 380, 380);

    if (status != "") {
        for (i = 0; i < object.length; i++) {
            objectDetector.detect(video, gotResult);
            r=random(255);
            g=random(255);
            b=random(255);
            percent = floor(100 * object[i].confidence);

            stroke(r,g,b);
            fill(r,g,b);
            text(object[i].label + " " + percent + "%", object[i].x, object[i].y);
            noFill();
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
            if(object[i].label==sam.toLowerCase()){
                document.getElementById("no").innerHTML=sam+" has been detected!";
            }

        }
        document.getElementById("status").innerHTML = "Status: Objects Detected";
       
    }
}

function modelReady() {
    status = "true";
    console.log("Model Loaded");
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    object = results;
    console.log(results);
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelReady);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    sam=document.getElementById("object").value();
}