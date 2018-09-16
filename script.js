var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Constraint = Matter.Constraint,
    Events = Matter.Events,
    Bodies = Matter.Bodies,
    Body = Matter.Body;

var engine = Engine.create();
engine.world.gravity.y = 0;

var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        showVelocity: true
    }
});
var x = 100;
var y = 200;
//var boxA = Bodies.rectangle(400, 200, 80, 80);
var wheelFL = Bodies.rectangle(x - 20, y - 20, 7, 15);
var wheelFR = Bodies.rectangle(x + 20, y - 20, 7, 15);
var wheelBL = Bodies.rectangle(x - 20, y + 20, 7, 15);
var wheelBR = Bodies.rectangle(x + 20, y + 20, 7, 15);

var constraint1 = Constraint.create({
    bodyA: wheelFL,
    bodyB: wheelFR,
    length: 40
});
World.add(engine.world, constraint1);

var constraint2 = Constraint.create({
    bodyA: wheelFL,
    bodyB: wheelBL,
    length: 40
});
World.add(engine.world, constraint2);

var constraint3 = Constraint.create({
    bodyA: wheelBL,
    bodyB: wheelBR,
    length: 40
});
World.add(engine.world, constraint3);

var constraint4 = Constraint.create({
    bodyA: wheelBR,
    bodyB: wheelFR,
    length: 40
});
World.add(engine.world, constraint4);

var constraint5 = Constraint.create({
    bodyA: wheelBR,
    bodyB: wheelFL,
    length: 40*Math.sqrt(2)+1
});
World.add(engine.world, constraint5);

var constraint6 = Constraint.create({
    bodyA: wheelFR,
    bodyB: wheelBL,
    length: 40*Math.sqrt(2)+1
});
World.add(engine.world, constraint6);

/*var box = Bodies.rectangle(x, y, 40, 40);
var constraint1 = Constraint.create({
    bodyA: wheelFL,
    bodyB: box
});
World.add(engine.world, constraint1);
var constraint2 = Constraint.create({
    bodyA: wheelFR,
    bodyB: box
});
World.add(engine.world, constraint2);
var constraint3 = Constraint.create({
    bodyA: wheelBL,
    bodyB: box
});
World.add(engine.world, constraint3);
var constraint4 = Constraint.create({
    bodyA: wheelBR,
    bodyB: box
});
World.add(engine.world, constraint4);*/

/*var compoundBody = Body.create({
    parts: [wheelFL, wheelFR, wheelBL, wheelBR]
});
*/
//var ground = Bodies.rectangle(window.innerWidth/2, window.innerHeight-30, window.innerWidth, 60, { isStatic: true });

World.add(engine.world, [wheelFL, wheelFR, wheelBL, wheelBR]);
//World.add(engine.world, [compoundBody]);

Engine.run(engine);
Render.run(render);

var vel = {x: 0.0001, y: 0};

var ang = 0;

var angv = 0.00001;

var w = 40, l = 40;
var h = Math.sqrt(w*w+l*l)/2;

var A = vel.x - ang * l / 2;
var B = vel.x + ang * l / 2;
var C = vel.y - ang * w / 2;
var D = vel.y + ang * w / 2;

var WVFL = Math.sqrt(B * B + D * D);
var WVFR = Math.sqrt(B * B + C * C);
var WVBL = Math.sqrt(A * A + D * D);
var WVBR = Math.sqrt(A * A + C * C);

var WAFL = Math.atan2(B, D) * 180 / Math.PI;
var WAFR = Math.atan2(B, C) * 180 / Math.PI;
var WABL = Math.atan2(A, D) * 180 / Math.PI;
var WABR = Math.atan2(A, C) * 180 / Math.PI;
//Body.rotate(box,10);

Matter.Body.setVelocity(wheelFR, Matter.Vector.create(0, 0));
Matter.Body.setVelocity(wheelFL, Matter.Vector.create(0, 0));
Matter.Body.setVelocity(wheelBR, Matter.Vector.create(0, 0));
Matter.Body.setVelocity(wheelBL, Matter.Vector.create(0, 0));

Matter.Body.setAngularVelocity(wheelFR, 0);
Matter.Body.setAngularVelocity(wheelFL, 0);
Matter.Body.setAngularVelocity(wheelBR, 0);
Matter.Body.setAngularVelocity(wheelBL, 0);

var ang1 = -Math.PI/4;
var ang2 = Math.PI/4;
var ang3 = -3*Math.PI/4;
var ang4 = -3*Math.PI/4;

//var averagePos = Matter.Vector.create(wheelFL.position);
//console.log(wheelBL);
Events.on(engine, 'afterUpdate', function () {
    ang += angv;
    var vmag = Math.sqrt(vel.x*vel.x+vel.y*vel.y);
    var theta = Math.acos((Math.cos(ang)*vel.x+Math.sin(ang)*vel.y)/vmag);
    var dir1 = ang1+theta;
    if (dir1 > 2*Math.PI) dir1 -= Math.PI*2;
    var dir2 = ang2+theta;
    if (dir2 > 2*Math.PI) dir2 -= Math.PI*2;
    var dir3 = ang3+theta;
    if (dir3 > 2*Math.PI) dir3 -= Math.PI*2;
    var dir4 = ang4+theta;
    if (dir4 > 2*Math.PI) dir4 -= Math.PI*2;
    Matter.Body.setVelocity(wheelFR, Matter.Vector.create(0, 0));
    Matter.Body.setVelocity(wheelFL, Matter.Vector.create(0, 0));
    Matter.Body.setVelocity(wheelBR, Matter.Vector.create(0, 0));
    Matter.Body.setVelocity(wheelBL, Matter.Vector.create(0, 0));

    Matter.Body.setAngularVelocity(wheelFR, 0);
    Matter.Body.setAngularVelocity(wheelFL, 0);
    Matter.Body.setAngularVelocity(wheelBR, 0);
    Matter.Body.setAngularVelocity(wheelBL, 0);
    if (ang > 2*Math.PI) ang -= Math.PI*2;
    //Matter.Body.applyForce(wheelFL, Matter.Vector.create(B, D));
    //console.log(wheelFL.velocity);
    /*Matter.Body.setVelocity(wheelFL, Matter.Vector.create(B, D));
    Matter.Body.setVelocity(wheelFR, Matter.Vector.create(B, C));
    Matter.Body.setVelocity(wheelBL, Matter.Vector.create(A, D));
    Matter.Body.setVelocity(wheelBR, Matter.Vector.create(A, C));*/
    Body.applyForce(wheelFL, {x:wheelFL.position.x, y:wheelFL.position.y}, {x:vmag-h*angv*Math.sin(dir1), y:h*angv*Math.cos(dir1)});
    Body.applyForce(wheelFR, {x:wheelFR.position.x, y:wheelFR.position.y}, {x:vmag-h*angv*Math.sin(dir2), y:h*angv*Math.cos(dir2)});
    Body.applyForce(wheelBL, {x:wheelBL.position.x, y:wheelBL.position.y}, {x:vmag-h*angv*Math.sin(dir3), y:h*angv*Math.cos(dir3)});
    Body.applyForce(wheelBR, {x:wheelBR.position.x, y:wheelBR.position.y}, {x:vmag-h*angv*Math.sin(dir4), y:h*angv*Math.cos(dir4)});//*/
    /*Body.applyForce(compoundBody.parts[1], {x:compoundBody.position.x-20, y:compoundBody.position.y-20}, {x:B, y:D});
    Body.applyForce(compoundBody.parts[2], {x:compoundBody.position.x+20, y:compoundBody.position.y-20}, {x:B, y:C});
    Body.applyForce(compoundBody.parts[3], {x:compoundBody.position.x-20, y:compoundBody.position.y+20}, {x:A, y:D});
    Body.applyForce(compoundBody.parts[4], {x:compoundBody.position.x+20, y:compoundBody.position.y+20}, {x:A, y:C});//*/
    Body.setAngle(wheelFL, Math.atan2(h*angv*Math.cos(dir1), vmag-h*angv*Math.sin(dir1)));
    Body.setAngle(wheelFL, Math.atan2(h*angv*Math.cos(dir2), vmag-h*angv*Math.sin(dir2)));
    Body.setAngle(wheelFL, Math.atan2(h*angv*Math.cos(dir3), vmag-h*angv*Math.sin(dir3)));
    Body.setAngle(wheelFL, Math.atan2(h*angv*Math.cos(dir4), vmag-h*angv*Math.sin(dir4)));
    //console.log(wheelFL.position);
    //console.log(wheelFL);
    A = vel.x - ang * l / 2;
    B = vel.x + ang * l / 2;
    C = vel.y - ang * w / 2;
    D = vel.y + ang * w / 2;
});