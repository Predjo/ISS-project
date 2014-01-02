google.load("earth", "1", {'other_params': 'sensor=false' });
google.load('maps', '2.x', {'other_params': 'sensor=false' });

var ge = null;
var geocoder;
var truck;

function el(e) { return document.getElementById(e); }

function Sample(description, url) {
  this.description = description;
  this.url = url;
  return this;
}

var samples = [];

function init() {
  geocoder = new GClientGeocoder();
  init3D();
}

function initCallback(object) {
  ge = object;
  ge.getWindow().setVisibility(true);
  // ge.getOptions().setMouseNavigationEnabled(false);
  ge.getLayerRoot().enableLayerById(ge.LAYER_BUILDINGS, true);
  ge.getOptions().setFlyToSpeed(ge.SPEED_TELEPORT);

  truck = new Truck();
}

function failureCallback(err) {
}

function init3D() {
  google.earth.createInstance("map3d", initCallback, failureCallback);
}

function submitLocation() {
  doGeocode(el('address').value);
}

function doGeocode(address) {
  geocoder.getLatLng(address, function(point) {
    if (point) {
      if (ge != null && truck != null) {
        truck.teleportTo(point.y, point.x);
      }
    }
  });
}

function updateOptions() {
  var options = ge.getOptions();
  var form = el('options');

  options.setStatusBarVisibility(form.statusbar.checked);
  if (form.nav.checked) {
    ge.getNavigationControl().setVisibility(ge.VISIBILITY_SHOW);
  } else {
    ge.getNavigationControl().setVisibility(ge.VISIBILITY_HIDE);
  }
}



// milktruck.js  -- Copyright Google 2007

// Code for Monster Milktruck demo, using Earth Plugin.

window.truck = null;

// Pull the Milktruck model from 3D Warehouse.
//var MODEL_URL = 'http://www.barnabu.co.uk/geapi/flightsim/hawk.kmz';

var MODEL_URL = window.location.protocol + "//" + window.location.host + "/" + window.location.pathname.replace('index.html','') + 'models/Mig29.kmz';

console.log(document.URL);

var TICK_MS = 66;


var STEER_ROLL = -1.0;
var ROLL_SPRING = 0.25;
var ROLL_DAMP = -0.16;

function Truck() {
  var me = this;

  me.doTick = true;
  
  // We do all our motion relative to a local coordinate frame that is
  // anchored not too far from us.  In this frame, the x axis points
  // east, the y axis points north, and the z axis points straight up
  // towards the sky.
  //
  // We periodically change the anchor point of this frame and
  // recompute the local coordinates.
  me.localAnchorLla = [0, 0, 0];
  me.localAnchorCartesian = V3.latLonAltToCartesian(me.localAnchorLla);
  me.localFrame = M33.identity();

  // Position, in local cartesian coords.
  me.pos = [0, 0, 0];
  
  // Velocity, in local cartesian coords.
  me.vel = [0, 0, 0];

  // Orientation matrix, transforming model-relative coords into local
  // coords.
  me.modelFrame = M33.identity();

  me.roll = 0;
  me.heading = 0;
  me.rollSpeed = 0;
  
  me.idleTimer = 0;
  me.fastTimer = 0;
  me.popupTimer = 0;

  ge.getOptions().setFlyToSpeed(10);  // don't filter camera motion

  window.google.earth.fetchKml(ge, MODEL_URL,
                               function(obj) { me.finishInit(obj); });
}

Truck.prototype.finishInit = function(kml) {
  var me = this;

  // The model zip file is actually a kmz, containing a KmlFolder with
  // a camera KmlPlacemark (we don't care) and a model KmlPlacemark
  // (our milktruck).
  me.placemark = kml.getFeatures().getChildNodes().item(1);
  me.model = me.placemark.getGeometry();
  me.orientation = me.model.getOrientation();
  me.location = me.model.getLocation();
  

 me.model.setAltitudeMode(ge.ALTITUDE_ABSOLUTE);
 me.orientation.setHeading(50);
 // me.orientation.setTilt(90);
 // me.orientation.setRoll(90);
 me.model.setOrientation(me.orientation);

  ge.getFeatures().appendChild(me.placemark);

  me.balloon = ge.createHtmlStringBalloon('');
  me.balloon.setFeature(me.placemark);
  me.balloon.setMaxWidth(200);

  me.teleportTo(45.813086,15.977989, 90);  // Looking at the 'Plex

  me.lastMillis = (new Date()).getTime();

  var href = window.location.href;
  var pagePath = href.substring(0, href.lastIndexOf('/')) + '/';

  google.earth.addEventListener(ge, "frameend", function() { me.tick(); });

  me.cameraCut();
  
  ge.getWindow().blur();

  // If the user clicks on the Earth window, try to restore keyboard
  // focus back to the page.
  google.earth.addEventListener(ge.getWindow(), "mouseup", function(event) {
      ge.getWindow().blur();
    });
};

leftButtonDown = false;
rightButtonDown = false;
gasButtonDown = false;
reverseButtonDown = false;

function keyDown(event) {
  if (!event) {
    event = window.event;
  }
  if (event.keyCode == 37) {  // Left.
    leftButtonDown = true;
    event.returnValue = false;
  } else if (event.keyCode == 39) {  // Right.
    rightButtonDown = true;
    event.returnValue = false;
  } else if (event.keyCode == 38) {  // Up.
    gasButtonDown = true;
    event.returnValue = false;
  } else if (event.keyCode == 40) {  // Down.
    reverseButtonDown = true;
    event.returnValue = false;
  } else {
    return true;
  }
  return false;
}

function keyUp(event) {
  if (!event) {
    event = window.event;
  }
  if (event.keyCode == 37) {  // Left.
    leftButtonDown = false;
    event.returnValue = false;
  } else if (event.keyCode == 39) {  // Right.
    rightButtonDown = false;
    event.returnValue = false;
  } else if (event.keyCode == 38) {  // Up.
    gasButtonDown = false;
    event.returnValue = false;
  } else if (event.keyCode == 40) {  // Down.
    reverseButtonDown = false;
    event.returnValue = false;
  }
  return false;
}

function clamp(val, min, max) {
  if (val < min) {
    return min;
  } else if (val > max) {
    return max;
  }
  return val;
}

Truck.prototype.tick = function() {
  var me = this;

  var now = (new Date()).getTime();
  // dt is the delta-time since last tick, in seconds
  var dt = (now - me.lastMillis) / 1000.0;
  if (dt > 0.25) {
    dt = 0.25;
  }
  me.lastMillis = now;

  var c0 = 1;
  var c1 = 0;

  var gpos = V3.add(me.localAnchorCartesian,
                    M33.transform(me.localFrame, me.pos));
  var lla = V3.cartesianToLatLonAlt(gpos);

  if (V3.length([me.pos[0], me.pos[1], 0]) > 100) {
    // Re-anchor our local coordinate frame whenever we've strayed a
    // bit away from it.  This is necessary because the earth is not
    // flat!
    me.adjustAnchor();
  }

  var dir = me.modelFrame[1];
  var up = me.modelFrame[2];

  var absSpeed = V3.length(me.vel);

  var groundAlt = ge.getGlobe().getGroundAltitude(lla[0], lla[1]);
  var steerAngle = 0;
  
  // Steering.
  if (leftButtonDown || rightButtonDown || reverseButtonDown) {
    var TURN_SPEED_MIN = 40.0;  // radians/sec
    var TURN_SPEED_MAX = 60.0;  // radians/sec
 
    var turnSpeed;

    // Degrade turning at higher speeds.
    //
    //           angular turn speed vs. vehicle speed
    //    |     -------
    //    |    /       \-------
    //    |   /                 \-------
    //    |--/                           \---------------
    //    |
    //    +-----+-------------------------+-------------- speed
    //    0    SPEED_MAX_TURN           SPEED_MIN_TURN
    var SPEED_MAX_TURN = 200.0;
    var SPEED_MIN_TURN = 450.0;
    if (absSpeed < SPEED_MAX_TURN) {
      turnSpeed = TURN_SPEED_MIN + (TURN_SPEED_MAX - TURN_SPEED_MIN)
                   * (SPEED_MAX_TURN - absSpeed) / SPEED_MAX_TURN;
      turnSpeed *= (absSpeed / SPEED_MAX_TURN);  // Less turn as truck slows
    } else {
      turnSpeed = TURN_SPEED_MAX;
    }
    if (leftButtonDown) {
      steerAngle = turnSpeed/2 * dt * Math.PI / 180.0;
    }
    if (rightButtonDown) {
      steerAngle = -turnSpeed/2 * dt * Math.PI / 180.0;
    }
  }
  
  // Turn.
  var newdir = V3.rotate(dir, up, steerAngle);
  me.modelFrame = M33.makeOrthonormalFrame(newdir, up);
  dir = me.modelFrame[1];
  up = me.modelFrame[2];

  var forwardSpeed = 0;
  
    // TODO: if we're slipping, transfer some of the slip
    // velocity into forward velocity.

    // Damp sideways slip.  Ad-hoc frictiony hack.
    //
    // I'm using a damped exponential filter here, like:
    // val = val * c0 + val_new * (1 - c0)
    //
    // For a variable time step:
    //  c0 = exp(-dt / TIME_CONSTANT)
    var right = me.modelFrame[0];
    var slip = V3.dot(me.vel, right);
    c0 = Math.exp(-dt / 0.5);
    me.vel = V3.sub(me.vel, V3.scale(right, slip * (1 - c0)));

    // Apply engine/reverse accelerations.
    var ACCEL = 80.0;
    var DECEL = 80.0;
    var MAX_REVERSE_SPEED = 100.0;
    forwardSpeed = V3.dot(dir, me.vel);
    gasButtonDown = true;
    if (gasButtonDown) {
      // Accelerate forwards.
      me.vel = V3.add(me.vel, V3.scale(dir, ACCEL * dt));
    } else if (reverseButtonDown) {
      if (forwardSpeed > -MAX_REVERSE_SPEED)
        me.vel = V3.add(me.vel, V3.scale(dir, -DECEL * dt));
    }

  // Air drag.
  //
  // Fd = 1/2 * rho * v^2 * Cd * A.
  // rho ~= 1.2 (typical conditions)
  // Cd * A = 3 m^2 ("drag area")
  //
  // I'm simplifying to:
  //
  // accel due to drag = 1/Mass * Fd
  // with Milktruck mass ~= 2000 kg
  // so:
  // accel = 0.6 / 2000 * 3 * v^2
  // accel = 0.0009 * v^2
  absSpeed = V3.length(me.vel);
  if (absSpeed > 0.01) {
    var veldir = V3.normalize(me.vel);
    var DRAG_FACTOR = 0.00050;
    var drag = absSpeed * absSpeed * DRAG_FACTOR;

    // Some extra constant drag (rolling resistance etc) to make sure
    // we eventually come to a stop.
    var CONSTANT_DRAG = 2.0;
    drag += CONSTANT_DRAG;

    if (drag > absSpeed) {
      drag = absSpeed;
    }

    me.vel = V3.sub(me.vel, V3.scale(veldir, drag * dt));
  }

  // Move.
  var deltaPos = V3.scale(me.vel, dt);
  me.pos = V3.add(me.pos, deltaPos);

  gpos = V3.add(me.localAnchorCartesian,
                M33.transform(me.localFrame, me.pos));
  lla = V3.cartesianToLatLonAlt(gpos);
  
  // Don't go underground.
  groundAlt = ge.getGlobe().getGroundAltitude(lla[0], lla[1]);
  if (me.pos[2] < groundAlt) {
    me.pos[2] = groundAlt;
  }

  var normal = estimateGroundNormal(gpos, me.localFrame);


  // Propagate our state into Earth.
  gpos = V3.add(me.localAnchorCartesian,
                M33.transform(me.localFrame, me.pos));
  lla = V3.cartesianToLatLonAlt(gpos);
  me.model.getLocation().setLatLngAlt(lla[0], lla[1], lla[2]+25);

  var newhtr = M33.localOrientationMatrixToHeadingTiltRoll(me.modelFrame);

  // // Compute roll according to steering.
  // // TODO: this would be even more cool in 3d.
   var absRoll = newhtr[2];
  // me.rollSpeed += steerAngle * forwardSpeed * 4* STEER_ROLL;
  // // Spring back to center, with damping.
  // me.rollSpeed += (ROLL_SPRING * -me.roll + ROLL_DAMP * me.rollSpeed);
  // me.roll += me.rollSpeed * dt;
  // me.roll = clamp(me.roll, -85, 85);
  // absRoll -= me.roll;
  

  me.orientation.set(newhtr[0], newhtr[1], absRoll);


  //me.tickPopups(dt);
  
  me.cameraFollow(dt, gpos, me.localFrame);

  // Hack to work around focus bug
  // TODO: fix that bug and remove this hack.
  //ge.getWindow().blur();
};

// TODO: would be nice to have globe.getGroundNormal() in the API.
function estimateGroundNormal(pos, frame) {
  // Take four height samples around the given position, and use it to
  // estimate the ground normal at that position.
  //  (North)
  //     0
  //     *
  //  2* + *3
  //     *
  //     1
  var pos0 = V3.add(pos, frame[0]);
  var pos1 = V3.sub(pos, frame[0]);
  var pos2 = V3.add(pos, frame[1]);
  var pos3 = V3.sub(pos, frame[1]);
  var globe = ge.getGlobe();
  function getAlt(p) {
    var lla = V3.cartesianToLatLonAlt(p);
    return globe.getGroundAltitude(lla[0], lla[1]);
  }
  var dx = getAlt(pos1) - getAlt(pos0);
  var dy = getAlt(pos3) - getAlt(pos2);
  var normal = V3.normalize([dx, dy, 2]);
  return normal;
}


Truck.prototype.scheduleTick = function() {
  var me = this;
  if (me.doTick) {
    setTimeout(function() { me.tick(); }, TICK_MS);
  }
};

// Cut the camera to look at me.
Truck.prototype.cameraCut = function() {
  var me = this;
  var lo = me.model.getLocation();
  var la = ge.createLookAt('');
  la.set(lo.getLatitude(), lo.getLongitude(),
         100 /* altitude */,
         ge.ALTITUDE_RELATIVE_TO_GROUND,
         fixAngle(180 + me.model.getOrientation().getHeading()),
         80, /* tilt */
         25 /* range */         
         );
  ge.getView().setAbstractView(la);
};

Truck.prototype.cameraFollow = function(dt, truckPos, localToGlobalFrame) {
  var me = this;

  var c0 = Math.exp(-dt / 0.5);
  var c1 = 1 - c0;

  var la = ge.getView().copyAsLookAt(ge.ALTITUDE_RELATIVE_TO_GROUND);

  var truckHeading = me.model.getOrientation().getHeading();
  var camHeading = la.getHeading();

  var deltaHeading = fixAngle(truckHeading - camHeading);
  var heading = camHeading + c1 * deltaHeading;
  heading = fixAngle(heading);

  var TRAILING_DISTANCE = 15;
  var headingRadians = heading / 180 * Math.PI;
  
  var CAM_HEIGHT = 10;

  var headingDir = V3.rotate(localToGlobalFrame[1], localToGlobalFrame[2],
                             -headingRadians);
  var camPos = V3.add(truckPos, V3.scale(localToGlobalFrame[2], CAM_HEIGHT));
  camPos = V3.add(camPos, V3.scale(headingDir, -TRAILING_DISTANCE));
  var camLla = V3.cartesianToLatLonAlt(camPos);
  var camLat = camLla[0];
  var camLon = camLla[1];
  var camAlt = camLla[2] - ge.getGlobe().getGroundAltitude(camLat, camLon);

  la.set(camLat, camLon, camAlt+22, ge.ALTITUDE_RELATIVE_TO_GROUND, 
        heading, 80 /*tilt*/, 0 /*range*/);
  ge.getView().setAbstractView(la);
};

// heading is optional.
Truck.prototype.teleportTo = function(lat, lon, heading) {
  var me = this;
  me.model.getLocation().setLatitude(lat);
  me.model.getLocation().setLongitude(lon);
  me.model.getLocation().setAltitude(ge.getGlobe().getGroundAltitude(lat, lon));
  if (heading == null) {
    heading = 0;
  }
  me.vel = [0, 0, 0];

  me.localAnchorLla = [lat, lon, 0];
  me.localAnchorCartesian = V3.latLonAltToCartesian(me.localAnchorLla);
  me.localFrame = M33.makeLocalToGlobalFrame(me.localAnchorLla);
  me.modelFrame = M33.identity();
  me.modelFrame[0] = V3.rotate(me.modelFrame[0], me.modelFrame[2], -heading);
  me.modelFrame[1] = V3.rotate(me.modelFrame[1], me.modelFrame[2], -heading);
  me.pos = [0, 0, ge.getGlobe().getGroundAltitude(lat, lon)+200];

 // me.cameraCut();
};

// Move our anchor closer to our current position.  Retain our global
// motion state (position, orientation, velocity).
Truck.prototype.adjustAnchor = function() {
  var me = this;
  var oldLocalFrame = me.localFrame;

  var globalPos = V3.add(me.localAnchorCartesian,
                         M33.transform(oldLocalFrame, me.pos));
  var newAnchorLla = V3.cartesianToLatLonAlt(globalPos);
  newAnchorLla[2] = 100;  // For convenience, anchor always has 0 altitude.

  var newAnchorCartesian = V3.latLonAltToCartesian(newAnchorLla);
  var newLocalFrame = M33.makeLocalToGlobalFrame(newAnchorLla);

  var oldFrameToNewFrame = M33.transpose(newLocalFrame);
  oldFrameToNewFrame = M33.multiply(oldFrameToNewFrame, oldLocalFrame);

  var newVelocity = M33.transform(oldFrameToNewFrame, me.vel);
  var newModelFrame = M33.multiply(oldFrameToNewFrame, me.modelFrame);
  var newPosition = M33.transformByTranspose(
      newLocalFrame,
      V3.sub(globalPos, newAnchorCartesian));

  me.localAnchorLla = newAnchorLla;
  me.localAnchorCartesian = newAnchorCartesian;
  me.localFrame = newLocalFrame;
  me.modelFrame = newModelFrame;
  me.pos = newPosition;
  me.vel = newVelocity;
};

// Keep an angle in [-180,180]
function fixAngle(a) {
  while (a < -180) {
    a += 360;
  }
  while (a > 180) {
    a -= 360;
  }
  return a;
}