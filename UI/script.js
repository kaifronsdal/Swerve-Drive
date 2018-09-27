function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    background(22);
}

var vel = new Vector(1, 0);
var vMag = 0.5;
var vdir = 0;
var avel = 0.01;
var w = 60;
var h = 60;
var rr = Math.sqrt(w * w + h * h);
var r = 0;
var FL = new Vector(50 - w / 2, 2 * window.innerHeight / 3 - h / 2);
var FR = new Vector(50 + w / 2, 2 * window.innerHeight / 3 - h / 2);
var BL = new Vector(50 - w / 2, 2 * window.innerHeight / 3 + h / 2);
var BR = new Vector(50 + w / 2, 2 * window.innerHeight / 3 + h / 2);

var slider = document.getElementById("avel");
var output = document.getElementById("output");
output.innerHTML = "&#160;0.00";

slider.oninput = function () {
    avel = parseFloat(this.value) / 1000;
    output.innerHTML = Math.abs(parseFloat(this.value / 100));
    if (output.innerHTML.length === 1) output.innerHTML += ".00";
    if (output.innerHTML.length === 3) output.innerHTML += "0";
    if (this.value < 0) output.innerHTML = "-" + output.innerHTML;
    else output.innerHTML = "&#160;" + output.innerHTML
};

var eslider = document.getElementById("velmag");
var output2 = document.getElementById("output3");
output2.innerHTML = "&#160;0.50";

eslider.oninput = function () {
    vMag = this.value / 100;
    output2.innerHTML = this.value / 100;
    if (output2.innerHTML.length === 1) output2.innerHTML += ".00";
    if (output2.innerHTML.length === 3) output2.innerHTML += "0";
};

var curSliderCoord = {x: 0, y: 0};

function calcD(thetai, a, vel, wm) {
    var cura = thetai + a;
    if (cura < 0) cura += Math.PI * 2;
    if (cura > Math.PI * 2) cura -= Math.PI * 2;

    var w = new Vector(Math.cos(cura + Math.PI / 2), Math.sin(cura + Math.PI / 2));
    w.mult(wm * rr / 2);

    var wv = w.clone();
    wv.add(vel);

    return wv;
}

function draw() {
    background(22);

    r += avel;

    vel = new Vector(Math.cos(vdir-Math.PI/2)*vMag, Math.sin(vdir-Math.PI/2)*vMag);
    var sm = 20;

    var FLV = calcD(-3 * Math.PI / 4, r, vel, avel);
    FL.x += FLV.x;
    FL.y += FLV.y;
    stroke(255, 0, 0);
    strokeWeight(1);
    line(FL.x, FL.y, FL.x+FLV.x*sm, FL.y+FLV.y*sm);
    strokeWeight(3);
    point(FL.x, FL.y);
    strokeWeight(1);


    var FRV = calcD(-Math.PI / 4, r, vel, avel);
    FR.x += FRV.x;
    FR.y += FRV.y;
    stroke(0, 255, 0);
    line(FR.x, FR.y, FR.x+FRV.x*sm, FR.y+FRV.y*sm);
    strokeWeight(3);
    point(FR.x, FR.y);
    strokeWeight(1);


    var BLV = calcD(3 * Math.PI / 4, r, vel, avel);
    BL.x += BLV.x;
    BL.y += BLV.y;
    stroke(0, 0, 255);
    line(BL.x, BL.y, BL.x+BLV.x*sm, BL.y+BLV.y*sm);
    strokeWeight(3);
    point(BL.x, BL.y);
    strokeWeight(1);


    var BRV = calcD(Math.PI / 4, r, vel, avel);
    BR.x += BRV.x;
    BR.y += BRV.y;
    stroke(255, 255, 0);
    line(BR.x, BR.y, BR.x+BRV.x*sm, BR.y+BRV.y*sm);
    strokeWeight(3);
    point(BR.x, BR.y);
    strokeWeight(1);

    strokeWeight(3);
    line(window.innerWidth / 2, 90, window.innerWidth / 2+vel.x*50, 90+vel.y*50);

    curSliderCoord = cirSlider(window.innerWidth / 2, 90, 50, vdir);

    if (move) vdir = Math.atan2(mouseY - 90, mouseX - window.innerWidth / 2) + Math.PI / 2;
    if (vdir > Math.PI) vdir -= Math.PI * 2;
    if (vdir < -Math.PI) vdir += Math.PI * 2;
    var output = document.getElementById("output2");
    output.innerHTML = "0.00";
    output.innerHTML = Math.abs(Math.round(vdir * 100) / 100);
    if (output.innerHTML.length === 1) output.innerHTML += ".00";
    if (output.innerHTML.length === 3) output.innerHTML += "0";
    if (r < 0) output.innerHTML = "-" + output.innerHTML;
    else output.innerHTML = "&#160;" + output.innerHTML
}

var move = false;

function mousePressed() {
    if ((mouseX - window.innerWidth / 2) * (mouseX - window.innerWidth / 2) + (mouseY - 90) * (mouseY - 90) < 55*55) {
        move = true;
    }
}

function mouseClicked() {
    if ((mouseX - window.innerWidth / 2) * (mouseX - window.innerWidth / 2) + (mouseY - 90) * (mouseY - 90) < 55*55) {
        vdir = Math.atan2(mouseY - 90, mouseX - window.innerWidth / 2) + Math.PI / 2;
        if (vdir > Math.PI) vdir -= Math.PI * 2;
        if (vdir < -Math.PI) vdir += Math.PI * 2;
    }
}

function mouseReleased() {
    move = false;
}

function cirSlider(x, y, r, a) {
    noFill();
    stroke(130);
    strokeWeight(5);
    ellipse(x, y, 2 * r, 2 * r);
    stroke(180);
    strokeWeight(1);
    ellipse(x, y, 2 * r, 2 * r);
    stroke(190);
    ellipse(x, y, 2 * r - 2, 2 * r - 2);
    stroke(170);
    ellipse(x, y, 2 * r + 1, 2 * r + 1);

    fill(227);
    stroke(139);
    strokeWeight(1);
    ellipse(x + Math.cos(a - Math.PI / 2) * r, y + Math.sin(a - Math.PI / 2) * r, 13, 13);
    var temp = {x: x + Math.cos(a - Math.PI / 2) * r, y: y + Math.sin(a - Math.PI / 2) * r};
    return temp;
}