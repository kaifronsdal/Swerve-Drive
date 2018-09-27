function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    background(22);
}

var pos = {x: 50, y: window.innerHeight / 3 - 100};
var vel = new Vector(1, 0);
var avel = 0.01;
var w = 60;
var h = 60;
var rr = Math.sqrt(w * w + h * h);
var r = 0;
var FL = new Vector(50 - w / 2, 2 * window.innerHeight / 3 - h / 2);
var FR = new Vector(50 + w / 2, 2 * window.innerHeight / 3 - h / 2);
var BL = new Vector(50 - w / 2, 2 * window.innerHeight / 3 + h / 2);
var BR = new Vector(50 + w / 2, 2 * window.innerHeight / 3 + h / 2);

function calcD(thetai, a, vel, wm) {
    var cura = thetai + a;
    //cura*=180/Math.PI;
    if (cura < 0) cura += Math.PI * 2;
    if (cura > Math.PI * 2) cura -= Math.PI * 2;

    var w = new Vector(Math.cos(cura + Math.PI / 2), Math.sin(cura + Math.PI / 2));
    w.mult(wm * rr / 2);

    var wv = w.clone();
    wv.add(vel);

    wv.x = wv.x*Math.cos(-a) - wv.y*Math.sin(-a);
    wv.y = wv.y*Math.cos(-a) + wv.x*Math.sin(-a);

    return wv;
}
var t = 0;
function draw() {
    t += 0.01;
    //vel.x = Math.cos(t)+1;
    vel.y = Math.sin(t);

    strokeWeight(2);
    noFill();
    push();
    translate(pos.x, pos.y);
    stroke(200);
    point(0, 0);
    rotate(r);
    stroke(255, 0, 0);
    point(-w / 2, -h / 2);
    stroke(0, 255, 0);
    point(w / 2, -h / 2);
    stroke(0, 0, 255);
    point(-w / 2, h / 2);
    stroke(255, 255, 0);
    point(w / 2, h / 2);
    pop();


    r += avel;
    pos.x += vel.x;
    pos.y += vel.y;

    var FLV = calcD(-3 * Math.PI / 4, r, vel, avel);
    FL.x += FLV.x;
    FL.y += FLV.y;
    push();
    translate(FL.x, FL.y);
    rotate(r);
    stroke(255, 0, 0);
    point(-w/2,-h/2);
    pop();


    var FRV = calcD(-Math.PI / 4, r, vel, avel);
    FR.x += FRV.x;
    FR.y += FRV.y;
    stroke(0, 255, 0);
    point(FR.x, FR.y);


    var BLV = calcD(3 * Math.PI / 4, r, vel, avel);
    BL.x += BLV.x;
    BL.y += BLV.y;
    stroke(0, 0, 255);
    point(BL.x, BL.y);


    var BRV = calcD(Math.PI / 4, r, vel, avel);
    BR.x += BRV.x;
    BR.y += BRV.y;
    stroke(255, 255, 0);
    point(BR.x, BR.y);


    var avg = new Vector(FL.x, FL.y);
    avg.add(FR);
    avg.add(BL);
    avg.add(BR);
    avg.div(4);
    stroke(200);
    point(avg.x, avg.y);
    /*
        var dir1 = theta + Math.PI / 4;

        var v1x = (vmag - rr*avel*Math.sin(dir1));
        var v1y = rr*avel*Math.cos(dir1);

        var v1x2 = Math.cos(vang)*v1x-Math.sin(vang)*v1y;
        var v1y2 = Math.cos(vang)*v1y+Math.sin(vang)*v1x;

        //var v1m = Math.sqrt(v1x*v1x+v1y*v1y);

        //var v1a = Math.atan2(v1y, v1x)-theta+r;

        //FL.x+=Math.cos(v1a)*v1m;
        //FL.y+=Math.sin(v1a)*v1m;
        FL.x += v1x2;
        FL.y += v1y2;

        point(FL.x, FL.y);
        stroke(0, 255, 0);

        var dir2 = theta + 3 * Math.PI / 4;

        var v2x = (vmag - rr*avel*Math.sin(dir2));
        var v2y = rr*avel*Math.cos(dir2);

        var v2m = Math.sqrt(v2x*v2x+v2y*v2y);

        var v2a = Math.atan2(v2y, v2x)-theta+r;

        FR.x+=Math.cos(v2a)*v2m;
        FR.y+=Math.sin(v2a)*v2m;

        point(FR.x, FR.y);
        stroke(0, 0, 255);

        var dir3 = theta - Math.PI / 4;

        var v3x = (vmag - rr*avel*Math.sin(dir3));
        var v3y = rr*avel*Math.cos(dir3);

        var v3m = Math.sqrt(v3x*v3x+v3y*v3y);

        var v3a = Math.atan2(v3y, v3x)-theta+r;

        BL.x+=Math.cos(v3a)*v3m;
        BL.y+=Math.sin(v3a)*v3m;

        point(BL.x, BL.y);
        stroke(255, 255, 0);

        var dir4 = theta - 3 * Math.PI / 4;

        var v4x = (vmag - rr*avel*Math.sin(dir4));
        var v4y = rr*avel*Math.cos(dir4);

        var v4m = Math.sqrt(v4x*v4x+v4y*v4y);

        var v4a = Math.atan2(v4y, v4x)-theta+r;

        BR.x+=Math.cos(v4a)*v4m;
        BR.y+=Math.sin(v4a)*v4m;

        point(BR.x, BR.y);*/

}