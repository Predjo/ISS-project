var majorRunwayGrid = {};

/*GEFS*/

// init
$(document).ready(function () {
    $('input, textarea').placeholder();
});;

var GRAVITY = 9.81;
var degreesToRad = Math.PI / 180;
var radToDegrees = 180 / Math.PI;
var kmhToMs = 1 / 3.6;
var metersToFeet = 3.2808399;
var feetToMeters = 0.3048;
var meridionalRadius = 6378100;
var earthCircumference = meridionalRadius * 2 * Math.PI;
var metersToLocalLat = 1 / (earthCircumference / 360);
var pi = Math.PI;
var halfPi = pi / 2;
var twoPi = pi * 2;
var msToKnots = 1.94384449;
var knotsToMs = 0.514444444;
var kmhToKnots = 0.539956803;
var axisToIndex = {
    'X': 0,
    'Y': 1,
    'Z': 2
};
var airDensitySL = 1.22;
var dragConstant = 0.07;
var minDragCoef = 0.02;
var FOV = 60;
var SMOOTH_BUFFER = {};
var SMOOTHING_FACTOR = 0.2;
ges.hexOpacity = ['00ffffff', '01ffffff', '02ffffff', '03ffffff', '04ffffff', '05ffffff', '06ffffff', '07ffffff', '08ffffff', '09ffffff', '0affffff', '0bffffff', '0cffffff', '0dffffff', '0effffff', '0fffffff', '10ffffff', '11ffffff', '12ffffff', '13ffffff', '14ffffff', '15ffffff', '16ffffff', '17ffffff', '18ffffff', '19ffffff', '1affffff', '1bffffff', '1cffffff', '1dffffff', '1effffff', '1fffffff', '20ffffff', '21ffffff', '22ffffff', '23ffffff', '24ffffff', '25ffffff', '26ffffff', '27ffffff', '28ffffff', '29ffffff', '2affffff', '2bffffff', '2cffffff', '2dffffff', '2effffff', '2fffffff', '30ffffff', '31ffffff', '32ffffff', '33ffffff', '34ffffff', '35ffffff', '36ffffff', '37ffffff', '38ffffff', '39ffffff', '3affffff', '3bffffff', '3cffffff', '3dffffff', '3effffff', '3fffffff', '40ffffff', '41ffffff', '42ffffff', '43ffffff', '44ffffff', '45ffffff', '46ffffff', '47ffffff', '48ffffff', '49ffffff', '4affffff', '4bffffff', '4cffffff', '4dffffff', '4effffff', '4fffffff', '50ffffff', '51ffffff', '52ffffff', '53ffffff', '54ffffff', '55ffffff', '56ffffff', '57ffffff', '58ffffff', '59ffffff', '5affffff', '5bffffff', '5cffffff', '5dffffff', '5effffff', '5fffffff', '60ffffff', '61ffffff', '62ffffff', '63ffffff', '64ffffff', '65ffffff', '66ffffff', '67ffffff', '68ffffff', '69ffffff', '6affffff', '6bffffff', '6cffffff', '6dffffff', '6effffff', '6fffffff', '70ffffff', '71ffffff', '72ffffff', '73ffffff', '74ffffff', '75ffffff', '76ffffff', '77ffffff', '78ffffff', '79ffffff', '7affffff', '7bffffff', '7cffffff', '7dffffff', '7effffff', '7fffffff', '80ffffff', '81ffffff', '82ffffff', '83ffffff', '84ffffff', '85ffffff', '86ffffff', '87ffffff', '88ffffff', '89ffffff', '8affffff', '8bffffff', '8cffffff', '8dffffff', '8effffff', '8fffffff', '90ffffff', '91ffffff', '92ffffff', '93ffffff', '94ffffff', '95ffffff', '96ffffff', '97ffffff', '98ffffff', '99ffffff', '9affffff', '9bffffff', '9cffffff', '9dffffff', '9effffff', '9fffffff', 'a0ffffff', 'a1ffffff', 'a2ffffff', 'a3ffffff', 'a4ffffff', 'a5ffffff', 'a6ffffff', 'a7ffffff', 'a8ffffff', 'a9ffffff', 'aaffffff', 'abffffff', 'acffffff', 'adffffff', 'aeffffff', 'afffffff', 'b0ffffff', 'b1ffffff', 'b2ffffff', 'b3ffffff', 'b4ffffff', 'b5ffffff', 'b6ffffff', 'b7ffffff', 'b8ffffff', 'b9ffffff', 'baffffff', 'bbffffff', 'bcffffff', 'bdffffff', 'beffffff', 'bfffffff', 'c0ffffff', 'c1ffffff', 'c2ffffff', 'c3ffffff', 'c4ffffff', 'c5ffffff', 'c6ffffff', 'c7ffffff', 'c8ffffff', 'c9ffffff', 'caffffff', 'cbffffff', 'ccffffff', 'cdffffff', 'ceffffff', 'cfffffff', 'd0ffffff', 'd1ffffff', 'd2ffffff', 'd3ffffff', 'd4ffffff', 'd5ffffff', 'd6ffffff', 'd7ffffff', 'd8ffffff', 'd9ffffff', 'daffffff', 'dbffffff', 'dcffffff', 'ddffffff', 'deffffff', 'dfffffff', 'e0ffffff', 'e1ffffff', 'e2ffffff', 'e3ffffff', 'e4ffffff', 'e5ffffff', 'e6ffffff', 'e7ffffff', 'e8ffffff', 'e9ffffff', 'eaffffff', 'ebffffff', 'ecffffff', 'edffffff', 'eeffffff', 'efffffff', 'f0ffffff', 'f1ffffff', 'f2ffffff', 'f3ffffff', 'f4ffffff', 'f5ffffff', 'f6ffffff', 'f7ffffff', 'f8ffffff', 'f9ffffff', 'faffffff', 'fbffffff', 'fcffffff', 'fdffffff', 'feffffff', 'ffffffff'];
V2 = {
    add: function (a, b) {
        return [a[0] + b[0], a[1] + b[1]]
    },
    sub: function (a, b) {
        return [a[0] - b[0], a[1] - b[1]]
    },
    length: function (a) {
        return Math.sqrt(a[0] * a[0] + a[1] * a[1])
    },
    scale: function (a, scale) {
        return [a[0] * scale, a[1] * scale]
    }
};
V3 = {
    dup: function (a) {
        return a.slice()
    },
    toString: function (a) {
        return "[" + a[0] + ", " + a[1] + ", " + a[2] + "]"
    },
    nearlyEqual: function (a, b, tolerance) {
        if (!tolerance) {
            tolerance = 1e-6
        }
        return Math.abs(a[0] - b[0]) <= tolerance && Math.abs(a[1] - b[1]) <= tolerance && Math.abs(a[2] - b[2]) <= tolerance
    },
    abs: function (a) {
        return [Math.abs(a[0]), Math.abs(a[1]), Math.abs(a[2])]
    },
    cross: function (a, b) {
        var a0 = a[0];
        var a1 = a[1];
        var a2 = a[2];
        var b0 = b[0];
        var b1 = b[1];
        var b2 = b[2];
        return [a1 * b2 - a2 * b1, a2 * b0 - a0 * b2, a0 * b1 - a1 * b0]
    },
    dot: function (a, b) {
        return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
    },
    add: function (a, b) {
        return [a[0] + b[0], a[1] + b[1], a[2] + b[2]]
    },
    addAngles: function (a, b) {
        return [fixAngle(a[0] + b[0]), fixAngle(a[1] + b[1]), fixAngle(a[2] + b[2])]
    },
    sub: function (a, b) {
        return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]
    },
    mult: function (a, b) {
        return [a[0] * b[0], a[1] * b[1], a[2] * b[2]]
    },
    scale: function (a, scale) {
        return [a[0] * scale, a[1] * scale, a[2] * scale]
    },
    length: function (a) {
        return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2])
    },
    normalize: function (a) {
        var len = V3.length(a);
        if (len <= 0) {
            return [NaN, NaN, NaN]
        }
        return V3.scale(a, 1.0 / len)
    },
    bisect: function (a, b) {
        return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2]
    },
    rotate: function (v, axis, radians) {
        var vDotAxis = V3.dot(v, axis);
        var vPerpAxis = V3.sub(v, V3.scale(axis, vDotAxis));
        var vPerpPerpAxis = V3.cross(axis, vPerpAxis);
        var result = V3.add(V3.scale(axis, vDotAxis), V3.add(V3.scale(vPerpAxis, Math.cos(radians)), V3.scale(vPerpPerpAxis, Math.sin(radians))));
        return result
    },
    toRadians: function (v) {
        return [v[0] * degreesToRad, v[1] * degreesToRad, v[2] * degreesToRad]
    },
    toDegrees: function (v) {
        return [v[0] * radToDegrees, v[1] * radToDegrees, v[2] * radToDegrees]
    },
    clamp: function (v, min, max) {
        return [clamp(v[0], min, max), clamp(v[1], min, max), clamp(v[2], min, max)]
    },
    exponentialSmoothing: function (keyName, v, smoothingFactor) {
        return [exponentialSmoothing(keyName + '0', v[0], smoothingFactor), exponentialSmoothing(keyName + '1', v[1], smoothingFactor), exponentialSmoothing(keyName + '2', v[2], smoothingFactor)]
    }
};
M33 = {
    toString: function (a) {
        return "[" + V3.toString(a[0]) + ", " + V3.toString(a[1]) + ", " + V3.toString(a[2]) + "]"
    },
    identity: function () {
        return [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
    },
    dup: function (a) {
        return [V3.dup(a[0]), V3.dup(a[1]), V3.dup(a[2])]
    },
    nearlyEqual: function (a, b) {
        return V3.nearlyEqual(a[0], b[0]) && V3.nearlyEqual(a[1], b[1]) && V3.nearlyEqual(a[2], b[2])
    },
    transpose: function (a) {
        return [[a[0][0], a[1][0], a[2][0]], [a[0][1], a[1][1], a[2][1]], [a[0][2], a[1][2], a[2][2]]]
    },
    add: function (a, b) {
        return [V3.add(a[0], b[0]), V3.add(a[1], b[1]), V3.add(a[2], b[2])]
    },
    multiplyV: function (m, v) {
        var v0 = v[0];
        var v1 = v[1];
        var v2 = v[2];
        var m0 = m[0];
        var m1 = m[1];
        var m2 = m[2];
        return [m0[0] * v0 + m0[1] * v1 + m0[2] * v2, m1[0] * v0 + m1[1] * v1 + m1[2] * v2, m2[0] * v0 + m2[1] * v1 + m2[2] * v2]
    },
    multiply: function (a, b) {
        var a00 = a[0][0],
            a01 = a[0][1],
            a02 = a[0][2],
            a10 = a[1][0],
            a11 = a[1][1],
            a12 = a[1][2],
            a20 = a[2][0],
            a21 = a[2][1],
            a22 = a[2][2],
            b00 = b[0][0],
            b01 = b[0][1],
            b02 = b[0][2],
            b10 = b[1][0],
            b11 = b[1][1],
            b12 = b[1][2],
            b20 = b[2][0],
            b21 = b[2][1],
            b22 = b[2][2];
        return [[a00 * b00 + a10 * b01 + a20 * b02, a01 * b00 + a11 * b01 + a21 * b02, a02 * b00 + a12 * b01 + a22 * b02], [a00 * b10 + a10 * b11 + a20 * b12, a01 * b10 + a11 * b11 + a21 * b12, a02 * b10 + a12 * b11 + a22 * b12], [a00 * b20 + a10 * b21 + a20 * b22, a01 * b20 + a11 * b21 + a21 * b22, a02 * b20 + a12 * b21 + a22 * b22]]
    },
    scaled: function (m, s) {
        return [[m[0][0] * s[0], m[0][1] * s[1], m[0][2] * s[2]], [m[1][0] * s[0], m[1][1] * s[1], m[1][2] * s[2]], [m[2][0] * s[0], m[2][1] * s[1], m[2][2] * s[2]]]
    },
    transform: function (a, b) {
        var a0 = a[0],
            a1 = a[1],
            a2 = a[2],
            b0 = b[0],
            b1 = b[1],
            b2 = b[2];
        return [a0[0] * b0 + a1[0] * b1 + a2[0] * b2, a0[1] * b0 + a1[1] * b1 + a2[1] * b2, a0[2] * b0 + a1[2] * b1 + a2[2] * b2]
    },
    rotationXYZ: function (mat, xyz) {
        var newMat = M33.setFromEuler(xyz);
        newMat = M33.multiply(mat, newMat);
        return newMat
    },
    rotationX: function (mat, angle) {
        var c = Math.cos(angle);
        var s = Math.sin(angle);
        return M33.multiply(mat, [
            [1, 0, 0],
            [0, c, -s],
            [0, s, c]
        ])
    },
    rotationY: function (mat, angle) {
        var c = Math.cos(angle);
        var s = Math.sin(angle);
        return M33.multiply(mat, [
            [c, 0, s],
            [0, 1, 0],
            [-s, 0, c]
        ])
    },
    rotationZ: function (mat, angle) {
        var c = Math.cos(angle);
        var s = Math.sin(angle);
        return M33.multiply(mat, [
            [c, -s, 0],
            [s, c, 0],
            [0, 0, 1]
        ])
    },
    rotationParentFrameX: function (mat, angle) {
        var c = Math.cos(angle);
        var s = Math.sin(angle);
        return M33.multiply([
            [1, 0, 0],
            [0, c, -s],
            [0, s, c]
        ], mat)
    },
    rotationParentFrameY: function (mat, angle) {
        var c = Math.cos(angle);
        var s = Math.sin(angle);
        return M33.multiply([
            [c, 0, s],
            [0, 1, 0],
            [-s, 0, c]
        ], mat)
    },
    rotationParentFrameZ: function (mat, angle) {
        var c = Math.cos(angle);
        var s = Math.sin(angle);
        return M33.multiply([
            [c, -s, 0],
            [s, c, 0],
            [0, 0, 1]
        ], mat)
    },
    rotate: function (mat, axis, angle) {
        var x = axis[0],
            y = axis[1],
            z = axis[2];
        var c = Math.cos(angle);
        var c1 = 1 - c;
        var s = Math.sin(angle);
        return M33.multiply(mat, [
            [x * x * c1 + c, y * x * c1 + z * s, z * x * c1 - y * s],
            [x * y * c1 - z * s, y * y * c1 + c, y * z * c1 + x * s],
            [x * z * c1 + y * s, y * z * c1 - x * s, z * z * c1 + c]
        ])
    },
    transformByTranspose: function (a, b) {
        return [a[0][0] * b[0] + a[0][1] * b[1] + a[0][2] * b[2], a[1][0] * b[0] + a[1][1] * b[1] + a[1][2] * b[2], a[2][0] * b[0] + a[2][1] * b[1] + a[2][2] * b[2]]
    },
    makeOrthonormalFrame: function (dir, up) {
        var newdir = V3.normalize(dir);
        var newright = V3.normalize(V3.cross(up, newdir));
        var newup = V3.cross(newright, newdir);
        return [newright, newdir, newup]
    },
    setFromEuler: function (xyz) {
        var cx = Math.cos(xyz[0]);
        var sx = Math.sin(xyz[0]);
        var cy = Math.cos(xyz[1]);
        var sy = Math.sin(xyz[1]);
        var cz = Math.cos(xyz[2]);
        var sz = Math.sin(xyz[2]);
        return [[cz * cy + sz * sx * sy, -sz * cy + cz * sx * sy, cx * sy], [sz * cx, cz * cx, -sx], [cz * -sy + sz * sx * cy, -sz * -sy + cz * sx * cy, cx * cy]]
    },
    getOrientation: function (mat) {
        var yaw;
        var tilt;
        var roll;
        if (mat[1][2] > 0.998) {
            yaw = Math.atan2(-mat[2][0], -mat[2][1]);
            tilt = -halfPi;
            roll = 0
        } else {
            if (mat[1][2] < -0.998) {
                yaw = Math.atan2(mat[2][0], mat[2][1]);
                tilt = halfPi;
                roll = 0
            } else {
                var yaw = Math.atan2(mat[1][0], mat[1][1]);
                var tilt = Math.asin(-mat[1][2]);
                var roll = Math.atan2(mat[0][2], mat[2][2])
            }
        }
        return [yaw * radToDegrees, tilt * radToDegrees, roll * radToDegrees]
    },
    toMatrix: function (m) {
        return m
    }
};
M33.toEuler = M33.getOrientation;
M3 = {
    identity: function () {
        return [0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    sub: function (a, b) {
        var c = [];
        for (var i = 0; i < 9; i++) {
            c[i] = a[i] - b[i]
        }
        return c
    },
    add: function (a, b) {
        var c = [];
        for (var i = 0; i < 9; i++) {
            c[i] = a[i] + b[i]
        }
        return c
    },
    dup: function (a) {
        return [a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8]]
    },
    scale: function (a, s) {
        var c = [];
        for (var i = 0; i < 9; i++) {
            c[i] = a[i] * s
        }
        return c
    }
};
var SMALL_NUM = 0.00000001;

function intersect_RayTriangle(ray, triangle) {
    var point;
    var u, v, n;
    var dir, w0, w;
    var r, a, b;
    u = triangle.u;
    v = triangle.v;
    n = triangle.n;
    dir = V3.sub(ray[1], ray[0]);
    w0 = V3.sub(ray[0], triangle[0]);
    a = -V3.dot(n, w0);
    b = V3.dot(n, dir);
    if (Math.abs(b) < SMALL_NUM) {
        if (a == 0) {
            return null
        } else {
            return null
        }
    }
    r = a / b;
    if (r < 0.0 || r > 1.0) {
        return null
    }
    var freeRay = V3.scale(dir, r);
    point = V3.add(ray[0], freeRay);
    var uu, uv, vv, wu, wv, D;
    uu = V3.dot(u, u);
    uv = V3.dot(u, v);
    vv = V3.dot(v, v);
    w = V3.sub(point, triangle[0]);
    wu = V3.dot(w, u);
    wv = V3.dot(w, v);
    D = uv * uv - uu * vv;
    var s, t;
    s = (uv * wv - vv * wu) / D;
    if (s < 0.0 || s > 1.0) return null;
    t = (uv * wu - uu * wv) / D;
    if (t < 0.0 || (s + t) > 1.0) return null;
    return {
        'point': point
    }
}
var Object3D = function (oOptions) {
    oOptions = oOptions || {};
    this._name = oOptions['name'];
    this._children = [];
    this.setModel(oOptions);
    this.setPoint(oOptions);
    this._points = oOptions['points'] || {};
    this._collisionPoints = oOptions['collisionPoints'] || [];
    var points = this._points;
    for (var i in points) {
        points[i].worldPosition = [0, 0, 0]
    }
    var points = this._collisionPoints;
    for (var i in points) {
        points[i].worldPosition = [0, 0, 0]
    }
    this.setLocalRotation(oOptions['rotation']);
    this.setLocalPosition(oOptions['position']);
    this.worldRotation = this._rotation;
    this.worldPosition = this._position;
    this._options = $.extend({}, oOptions)
};
Object3D.prototype = {
    'reset': function () {
        this.setLocalRotation(this._options['rotation']);
        this.setLocalPosition(this._options['position']);
        this.worldRotation = this._rotation;
        this.worldPosition = this._position
    },
    'setLocalRotation': function (vRotation) {
        this._localRotation = M33.identity();
        this._localRotation = M33.rotationXYZ(this._localRotation, vRotation || [0, 0, 0]);
        this._rotation = M33.dup(this._localRotation)
    },
    'rotate': function (vRotation) {
        this._rotation = M33.rotationXYZ(this._rotation, vRotation)
    },
    'rotateX': function (angle) {
        this._rotation = M33.rotationX(this._rotation, angle)
    },
    'rotateY': function (angle) {
        this._rotation = M33.rotationY(this._rotation, angle)
    },
    'rotateZ': function (angle) {
        this._rotation = M33.rotationZ(this._rotation, angle)
    },
    'setRotationX': function (angle) {
        this._rotation = M33.rotationX(this._localRotation, angle)
    },
    'setRotationY': function (angle) {
        this._rotation = M33.rotationY(this._localRotation, angle)
    },
    'rotateParentFrameX': function (angle) {
        this._rotation = M33.rotationParentFrameX(this._rotation, angle)
    },
    'rotateParentFrameY': function (angle) {
        this._rotation = M33.rotationParentFrameY(this._rotation, angle)
    },
    'rotateParentFrameZ': function (angle) {
        this._rotation = M33.rotationParentFrameZ(this._rotation, angle)
    },
    'getRotation': function () {
        return this._rotation
    },
    'setLocalPosition': function (vPosition) {
        this._localposition = V3.dup(vPosition || [0, 0, 0]);
        this._position = V3.dup(this._localposition)
    },
    'setPositionOffset': function (vOffset) {
        this._positionOffset = vOffset
    },
    'setScaleOffset': function (scale) {
        this._scaleOffset = scale
    },
    'translate': function (vTranslation) {
        this._position = V3.add(this._position, vTranslation)
    },
    'setScale': function (scale) {
        this.setLocalPosition(V3.scale(this._options['position'], scale))
    },
    'getPosition': function () {
        return this._position
    },
    'resetTransform': function () {
        this._rotation = M33.dup(this._localRotation);
        this._position = V3.dup(this._localposition)
    },
    'resetRotationMatrix': function () {
        if (!this.htr) {
            return
        }
        var vRotation = V3.toRadians(this.htr);
        this.setLocalRotation([vRotation[1], vRotation[2], vRotation[0]])
    },
    'setVectorWorldPosition': function (vVec) {
        vVec.worldPosition = M33.transform(this.worldRotation, vVec);
        vVec.worldPosition = V3.add(this.worldPosition, vVec.worldPosition);
        return vVec.worldPosition
    },
    'render': function (oOptions) {
        var position = this._position;
        if (this._positionOffset) {
            position = V3.add(this._position, this._positionOffset)
        }
        if (this._parent) {
            this.worldRotation = M33.multiply(this._parent.worldRotation, this._rotation);
            this.worldPosition = M33.transform(this._parent.worldRotation, position);
            this.worldPosition = V3.add(this.worldPosition, this._parent.worldPosition)
        } else {
            this.worldRotation = this._rotation;
            this.worldPosition = M33.transform(this._rotation, position)
        }
        var points = this._points;
        for (var i in points) {
            this.setVectorWorldPosition(points[i])
        }
        if (oOptions['collisions']) {
            var points = this._collisionPoints;
            for (var i = 0, l = points.length; i < l; i++) {
                this.setVectorWorldPosition(points[i])
            }
        }
        var scaledWorldPosition;
        if (this._scaleOffset) {
            scaledWorldPosition = V3.scale(this.worldPosition, this._scaleOffset)
        } else {
            scaledWorldPosition = this.worldPosition
        } if (this._model || this._name == 'root') {
            this.htr = M33.toEuler(this.worldRotation);
            this.lla = V3.add(oOptions['llaCoordinates'], xyz2lla(scaledWorldPosition, oOptions['llaCoordinates']));
            if (this._model && this.visible) {
                this._modelLocation.setLatLngAlt(this.lla[0], this.lla[1], this.lla[2]);
                this._modelOrientation.set(this.htr[0], this.htr[1], this.htr[2])
            }
        } else if (this._point && this.visible) {
            this.lla = V3.add(oOptions['llaCoordinates'], xyz2lla(scaledWorldPosition, oOptions['llaCoordinates']));
            var cameraDistance = V3.length(lla2xyz(V3.sub(camera.lla, this.lla), this.lla));
            var fixedAltitude = this.lla[2] - ((cameraDistance - 2) * 0.023);
            this._point.set(this.lla[0], this.lla[1], fixedAltitude, ge.ALTITUDE_ABSOLUTE, false, false)
        }
        this.propagateToTree('render', [oOptions])
    },
    'setModel': function (options) {
        if (options['3dmodel']) {
            var model = options['3dmodel'];
            this._model = model;
            this._modelOrientation = model.getOrientation();
            this._modelLocation = model.getLocation();
            this._modelScale = model.getScale();
            this._placemark = options['placemark']
        }
    },
    'setPoint': function (options) {
        if (options['point']) {
            this._point = options['point'];
            this._placemark = options['placemark']
        }
    },
    'getWorldFrame': function () {
        return this.worldRotation
    },
    'getWorldPosition': function () {
        return this.worldPosition
    },
    'getLlaLocation': function () {
        return this.lla
    },
    'addChild': function (oObject) {
        oObject._parent = this;
        this._children.push(oObject)
    },
    'setVisibility': function (bVisibility, inherited) {
        var parentVisibility = true;
        if (bVisibility && !inherited) {
            var parent = this._parent;
            while (parent) {
                parentVisibility = parentVisibility && parent.visible;
                parent = parent._parent
            }
        }
        if (parentVisibility) {
            if (this._placemark) {
                this._placemark.setVisibility(bVisibility)
            }
            this.propagateToTree('setVisibility', [bVisibility, true])
        }
        this.visible = bVisibility
    },
    'propagateToTree': function (sMethod, aArguments) {
        var children = this._children;
        for (var i = 0, l = children.length; i < l; i++) {
            var child = children[i];
            child[sMethod].apply(child, aArguments)
        }
    }
};
Object3D.utilities = {
    'getPointLla': function (point, reference) {
        if (point.lla) {
            return point.lla
        } else if (point.worldPosition) {
            return V3.add(reference, xyz2lla(point.worldPosition, reference))
        }
    }
};

// GEFS START

var ges = window.ges || {};

function absMin(a, b) {
    asbA = Math.abs(a);
    asbB = Math.abs(b);
    if (asbA < asbB) {
        return a
    } else {
        return b
    }
}

function clamp(val, min, max) {
    if (val < min) {
        return min
    } else {
        if (val > max) {
            return max
        }
    }
    return val
};

function fixAngle(a) {
    while (a <= -180) {
        a += 360
    }
    while (a >= 180) {
        a -= 360
    }
    return a
};

function fixAngle360(a) {
    while (a <= 0) {
        a += 360
    }
    while (a >= 360) {
        a -= 360
    }
    return a
};

function exponentialSmoothing(keyName, newValue, smoothingFactor) {
    if (!SMOOTH_BUFFER[keyName]) {
        SMOOTH_BUFFER[keyName] = {
            Stm1: 0,
            Xtm1: 0
        };
        if (smoothingFactor) {
            SMOOTH_BUFFER[keyName]['smoothingFactor'] = smoothingFactor;
            SMOOTH_BUFFER[keyName]['invSmoothingFactor'] = 1 - smoothingFactor
        } else {
            SMOOTH_BUFFER[keyName]['smoothingFactor'] = SMOOTHING_FACTOR;
            SMOOTH_BUFFER[keyName]['invSmoothingFactor'] = 1 - SMOOTHING_FACTOR
        }
    }
    var buffer = SMOOTH_BUFFER[keyName];
    var St = buffer.Xtm1 * buffer.smoothingFactor + buffer.invSmoothingFactor * buffer.Stm1;
    buffer.Stm1 = St;
    buffer.Xtm1 = newValue;
    return St
};

function getBuildingCollision(threshold) {
    var view = ge.getView();
    var lla2screen = view.project(ges.aircraft.llaLocation[0], ges.aircraft.llaLocation[1], ges.aircraft.llaLocation[2], ge.ALTITUDE_ABSOLUTE);
    if (lla2screen) {
        var hitTestResult = view.hitTest(lla2screen.getX(), ge.UNITS_PIXELS, lla2screen.getY(), ge.UNITS_PIXELS, ge.HIT_TEST_BUILDINGS);
        if (hitTestResult) {
            var result = [];
            result[0] = hitTestResult.getLatitude();
            result[1] = hitTestResult.getLongitude();
            result[2] = hitTestResult.getAltitude();
            var dist = V3.length(lla2xyz(V3.sub(ges.aircraft.llaLocation, result), ges.aircraft.llaLocation));
            if (dist < threshold) {
                return dist
            }
        }
    }
    return null
};

function getGroundNormal(pos) {
    var delta = xyz2lla([1, 1, 0], pos);
    var north = V3.add(pos, [delta[0], 0, 0]);
    var east = V3.add(pos, [0, delta[1], 0]);
    var globe = ge.getGlobe();

    function getAlt(p) {
        return globe.getGroundAltitude(p[0], p[1])
    }
    north[2] = getAlt(north);
    east[2] = getAlt(east);
    var vNorth = V3.sub(north, pos);
    var vEast = V3.sub(east, pos);
    vNorth = lla2xyz(vNorth, pos);
    vEast = lla2xyz(vEast, pos);
    var normal = V3.normalize(V3.cross(vEast, vNorth));
    return normal
};

function xyz2lla(xyz, referenceFrame) {
    var lla = [];
    lla[0] = xyz[1] * metersToLocalLat;
    var radLatitude = (referenceFrame[0] + lla[0]) * degreesToRad;
    var metersToLocalLon = (Math.cos(radLatitude) * (meridionalRadius + referenceFrame[2] + xyz[2]) * degreesToRad);
    lla[1] = xyz[0] / metersToLocalLon;
    lla[2] = xyz[2];
    return lla
};

function xy2ll(xy, referenceFrame) {
    var ll = [];
    ll[0] = xy[1] * metersToLocalLat;
    var radLatitude = (referenceFrame[0] + ll[0]) * degreesToRad;
    var metersToLocalLon = (Math.cos(radLatitude) * (meridionalRadius) * degreesToRad);
    ll[1] = xy[0] / metersToLocalLon;
    return ll
};

function lla2xyz(lla, referenceFrame) {
    var xyz = [];
    xyz[1] = lla[0] / metersToLocalLat;
    var radLatitude = (referenceFrame[0] + lla[0]) * degreesToRad;
    var metersToLocalLon = 1 / (Math.cos(radLatitude) * (meridionalRadius + referenceFrame[2]) * degreesToRad);
    xyz[0] = lla[1] / metersToLocalLon;
    xyz[2] = lla[2];
    return xyz
};

function ll2xy(ll, referenceFrame) {
    var xy = [];
    xy[1] = ll[0] / metersToLocalLat;
    var radLatitude = (referenceFrame[0] + ll[0]) * degreesToRad;
    var metersToLocalLon = 1 / (Math.cos(radLatitude) * meridionalRadius * degreesToRad);
    xy[0] = ll[1] / metersToLocalLon;
    return xy
};

function clamp(value, min, max) {
    if (value > max) return max;
    if (value < min) return min;
    return value
};

function xhrload(aURL, aMethod, aDestinationNode, aHandler, aContext) {
    aMethod = aMethod || 'GET';
    var request;
    if (!window.ActiveXObject) {
        request = new XMLHttpRequest()
    } else {
        request = new ActiveXObject("Microsoft.XMLHTTP")
    }
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            var response = request.responseText;
            if (aHandler) {
                aHandler(response)
            }
        }
    };
    request.open(aMethod, aURL, true);
    request.send(null)
};

function geoDecodeLocation(sValue, fCallback) {
    if (!ges.geocoder) {
        ges.geocoder = new google.maps.Geocoder()
    }
    ges.geocoder.geocode({
        'address': sValue
    }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var point = results[0].geometry.location;
            if (point && fCallback) {
                fCallback([point.lat(), point.lng()])
            }
        } else {}
    })
};

function Overlay(definition, parent) {
    this.definition = {
        'url': '',
        'drawOrder': 0,
        'anchor': {
            x: 0,
            y: 0
        },
        'position': {
            x: 0,
            y: 0
        },
        'rotation': 0,
        'size': {
            x: 0,
            y: 0
        },
        'visibility': true,
        'opacity': 1,
        'scale': {
            x: 1,
            y: 1
        },
        'rescale': false,
        'rescalePosition': false,
        'alignment': {
            x: 'left',
            y: 'bottom'
        },
        'overlays': []
    };
    this.children = [];
    this.definition = $.extend(true, {}, this.definition, definition);
    this.position = this.definition.position;
    this.size = this.definition.size;
    this.scale = this.definition.scale;
    this.rotation = this.definition.rotation;
    this.opacity = this.definition.opacity;
    this.anchor = this.definition.anchor;
    this.visibility = true;
    this.overlay = ge.createScreenOverlay('');
    this.overlay.setDrawOrder(this.definition.drawOrder);
    this.icon = ge.createIcon('');
    this.icon.setHref(this.definition.url);
    this.overlay.setIcon(this.icon);
    if (this.definition.iconFrame) {
        this.icon.setW(this.definition.iconFrame.x);
        this.icon.setH(this.definition.iconFrame.y)
    }
    this.overlay.setVisibility(this.definition.visibility);
    this.overlay.getScreenXY().setXUnits(ge.UNITS_PIXELS);
    this.overlay.getScreenXY().setYUnits(ge.UNITS_PIXELS);
    this.overlay.getScreenXY().setX(this.definition.anchor.x);
    this.overlay.getScreenXY().setY(this.definition.anchor.y);
    this.overlay.getOverlayXY().setXUnits(ge.UNITS_PIXELS);
    this.overlay.getOverlayXY().setYUnits(ge.UNITS_PIXELS);
    this.overlay.getRotationXY().setXUnits(ge.UNITS_PIXELS);
    this.overlay.getRotationXY().setYUnits(ge.UNITS_PIXELS);
    this.overlay.getRotationXY().setX(this.definition.anchor.x);
    this.overlay.getRotationXY().setY(this.definition.anchor.y);
    this.overlay.getSize().setXUnits(ge.UNITS_PIXELS);
    this.overlay.getSize().setYUnits(ge.UNITS_PIXELS);
    this.overlay.getSize().setX(this.definition.size.x * this.definition.scale.x);
    this.overlay.getSize().setY(this.definition.size.y * this.definition.scale.y);
    if (this.definition.animations) {
        for (var i = 0, l = this.definition.animations.length; i < l; i++) {
            var animation = this.definition.animations[i];
            if (animation.type == 'rotate') {
                this.definition.animateRotation = true
            }
            if (animation.type == 'show') {
                this.animateVisibility = true;
                this.animationVisibility = this.definition.visibility
            }
        }
    }
    ge.getFeatures().appendChild(this.overlay);
    for (var i = 0; i < this.definition.overlays.length; i++) {
        var newOverlay = new Overlay(this.definition.overlays[i]);
        newOverlay.parent = this;
        this.children[i] = newOverlay
    }
    if (this.definition.rescale || this.definition.rescalePosition || this.definition.alignment.x == 'right' || this.definition.alignment.y == 'top') {
        this.resizeFromScreen()
    } else {
        this.place()
    }
};
Overlay.prototype.setVisibility = function (visibility) {
    if (!this.animateVisibility || this.animationVisibility) {
        this.overlay.setVisibility(visibility)
    }
    this.visibility = visibility;
    for (var i = 0; i < this.children.length; i++) {
        this.children[i].setVisibility(visibility)
    }
};
Overlay.prototype.resizeFromScreen = function () {
    if (this.definition.rescale || this.definition.rescalePosition || this.definition.alignment.x == 'right' || this.definition.alignment.y == 'top') {
        var xScale = clamp(ges.viewportWidth / viewportReferenceWidth, 0.3, 1);
        var yScale = clamp(ges.viewportHeight / viewportReferenceHeight, 0.3, 1);
        var minScale = Math.min(xScale, yScale);
        this.scale = {
            x: this.definition.scale.x * minScale,
            y: this.definition.scale.y * minScale
        }
    } else {
        this.scale = this.definition.scale
    }
    var position = {
        x: this.definition.position.x,
        y: this.definition.position.y
    };
    this.rotation = 0;
    this.place(position)
};
Overlay.prototype.place = function (position) {
    if (this.parent) {
        if (!this.definition.animateRotation) {
            this.rotation = this.definition.rotation + this.parent.rotation
        }
        this.scale = this.scaleFromParent();
        this.position = this.positionFromParent();
        this.position = {
            x: this.parent.position.x + this.position.x * this.scale.x,
            y: this.parent.position.y + this.position.y * this.scale.y
        }
    } else {
        position = position || this.definition.position;
        if (camera.currentModeName == 'cockpit' && this.definition.cockpit) {
            this.position = position
        } else {
            this.position = {
                x: position.x * this.scale.x,
                y: position.y * this.scale.y
            };
            if (this.definition.alignment) {
                if (this.definition.alignment.x == 'right') {
                    this.position.x = ges.viewportWidth - position.x * this.scale.x
                }
                if (this.definition.alignment.x == 'center') {
                    this.position.x = (ges.viewportWidth / 2) - position.x * this.scale.x
                }
                if (this.definition.alignment.y == 'top') {
                    this.position.y = ges.viewportHeight - position.y * this.scale.y
                }
                if (this.definition.alignment.y == 'center') {
                    this.position.y = (ges.viewportHeight / 2) - position.y * this.scale.y
                }
            }
        }
    }
    this.size = {
        x: this.definition.size.x * this.scale.x,
        y: this.definition.size.y * this.scale.y
    };
    this.overlay.getSize().setX(this.size.x);
    this.overlay.getSize().setY(this.size.y);
    this.overlay.getOverlayXY().setX(this.position.x);
    this.overlay.getOverlayXY().setY(this.position.y);
    this.overlay.setOpacity(this.opacity);
    this.overlay.setRotation(this.rotation);
    for (var i = 0; i < this.children.length; i++) {
        this.children[i].place()
    }
};
Overlay.prototype.scaleFromParent = function () {
    return {
        x: this.definition.scale.x * this.parent.scale.x,
        y: this.definition.scale.y * this.parent.scale.y
    }
};
Overlay.prototype.positionFromParent = function () {
    var relativePosition = [this.definition.position.x, this.definition.position.y, 0];
    var mat = M33.identity();
    mat = M33.rotationZ(mat, -this.parent.rotation * degreesToRad);
    relativePosition = M33.transform(mat, relativePosition);
    return {
        x: relativePosition[0],
        y: relativePosition[1]
    }
};
Overlay.prototype.animate = function () {
    if (this.definition.animations) {
        for (var a = 0; a < this.definition.animations.length; a++) {
            var animation = this.definition.animations[a];
            var value = ges.animFilter(animation);
            if (animation.lastValue == value) {
                continue
            }
            animation.lastValue = value;
            switch (animation.type) {
            case 'moveY':
                if (this.visibility) {
                    this.overlay.getOverlayXY().setY(this.position.y + value * this.scale.y)
                }
                break;
            case 'translateY':
                if (this.visibility) {
                    this.translateIcon(value, 'Y')
                }
                break;
            case 'translateX':
                if (this.visibility) {
                    this.translateIcon(value, 'X')
                }
                break;
            case 'scaleX':
                if (this.visibility) {
                    this.size.x = value * this.scale.x;
                    this.overlay.getSize().setX(this.size.x)
                }
                break;
            case 'show':
                if (this.visibility) {
                    this.overlay.setVisibility(value)
                }
                this.animationVisibility = value;
                break;
            default:
                if (value && this.visibility) {
                    this.rotate(value)
                }
            }
        }
    }
    for (var i = 0; i < this.children.length; i++) {
        this.children[i].animate()
    }
};
Overlay.prototype.translateIcon = function (value, axis) {
    if (axis == 'Y') {
        this.icon.setY(value);
        var delta = 0;
        if (value > 0) {
            delta = Math.ceil(value) - value
        } else {
            delta = value - Math.floor(value)
        }
        this.position.y = this.definition.position.y + delta
    } else {
        this.icon.setX(value)
    }
    this.place()
};
Overlay.prototype.rotate = function (deg) {
    this.rotation = deg;
    if (this.parent) {
        this.rotation += this.parent.rotation
    }
    this.overlay.setRotation(this.rotation)
};
Overlay.prototype.destroy = function () {
    ges.removeResizeHandler(this.resizeHandler);
    if (this.overlay) {
        ge.getFeatures().removeChild(this.overlay);
        this.overlay.release()
    }
};
var jsonp = {};
jsonp.init = function () {
    jsonp.scriptHolder = document.getElementsByTagName('head')[0];
    setInterval(jsonp.cleanup, 1000)
};
jsonp.cleanup = function () {
    var jsonpScript = [];
    var aScripts = document.getElementsByTagName('script');
    for (var i = 0, l = aScripts.length; i < l; i++) {
        var jScript = aScripts[i];
        if (jScript.getAttribute('jsonp') == 'true') {
            jsonpScript.push(jScript)
        }
    }
    for (var i = 0, l = jsonpScript.length; i < l - 2; i++) {
        var jScript = jsonpScript[i];
        jsonp.scriptHolder.removeChild(jScript)
    }
};
jsonp.load = function (url, params, success, failure, bPermanent) {
    params = params || '';
    success = success || '';
    failure = failure || '';
    var scriptTag = document.createElement('script');
    if (!bPermanent) {
        scriptTag.setAttribute('jsonp', 'true')
    }
    scriptTag.setAttribute('type', 'text/javascript');
    scriptTag.src = url + '?' + params + '&killcache=' + new Date().getTime();
    jsonp.scriptHolder.appendChild(scriptTag);
    window.scriptag = scriptTag;
    return scriptTag
};
jsonp.abort = function (oScriptTag) {
    if (oScriptTag) {
        oScriptTag.src = '';
        if (oScriptTag.parentNode) {
            oScriptTag.parentNode.removeChild(oScriptTag)
        }
    }
};

function lookAt(source, target, up) {
    var vector = lla2xyz(V3.sub(source, target), target);
    var frame = M33.makeOrthonormalFrame(vector, up);
    return M33.getOrientation(frame)
};

function getURLParameters() {
    var paramMap = {};
    if (window.location.search) {
        var urlParams = window.location.search.substring(1, window.location.search.length);
        urlParams = urlParams.split('&');
        for (var i = 0; i < urlParams.length; i++) {
            var pair = urlParams[i].split('=');
            paramMap[pair[0]] = pair[1]
        }
    }
    return paramMap
};

function clone(oObject) {
    var newObject;
    if (typeof oObject == 'object') {
        if (ges.isArray(oObject)) {
            newObject = [];
            for (var i = 0; i < oObject.length; i++) {
                newObject[i] = clone(oObject[i])
            }
        } else {
            newObject = {};
            for (var i in oObject) {
                newObject[i] = clone(oObject[i])
            }
        }
    } else {
        newObject = oObject
    }
    return newObject
};

function serialize(oData) {
    var subSerialize = function (_obj) {
        if (typeof _obj.toSource !== 'undefined' && typeof _obj.callee === 'undefined') {
            return _obj.toSource()
        }
        switch (typeof _obj) {
        case 'number':
        case 'boolean':
        case 'function':
            return _obj;
            break;
        case 'string':
            return '\'' + _obj + '\'';
            break;
        case 'object':
            var str;
            if (ges.isArray(_obj) || typeof _obj.callee !== 'undefined') {
                str = '[';
                var i, len = _obj.length;
                for (i = 0; i < len - 1; i++) {
                    str += subSerialize(_obj[i]) + ','
                }
                str += subSerialize(_obj[i]) + ']'
            } else {
                str = '{';
                var key;
                for (key in _obj) {
                    str += '\'' + key + '\':' + subSerialize(_obj[key]) + ','
                }
                str = str.replace(/\,$/, '') + '}'
            }
            return str;
            break;
        default:
            return 'UNKNOWN';
            break
        }
    };
    return '[' + subSerialize(oData) + ']'
};




ges.selectDropdown = function (oSelect, sValue) {
    for (var i = 0; i < oSelect.options.length; i++) {
        if (oSelect.options[i].value == sValue) {
            oSelect.selectedIndex = i;
            break
        }
    }
};
ges.getLink = function () {
    var altitude = ges.aircraft.llaLocation[2] - ges.groundElevation;
    if (ges.aircraft.groundContact) {
        altitude = 0
    }
    var sLink = 'http://www.gefs-online.com/gefs.php?';
    sLink += 'aircraft=' + ges.aircraft.name;
    sLink += '&lon=' + ges.aircraft.llaLocation[1];
    sLink += '&lat=' + ges.aircraft.llaLocation[0];
    sLink += '&alt=' + altitude;
    sLink += '&heading=' + ges.aircraft.htr[0];
    if (ges.preferences.weather.windActive && ges.preferences.weather.customWindActive) {
        sLink += '&windspeed=' + ges.preferences.weather.windSpeed;
        sLink += '&windheading=' + ges.preferences.weather.windDirection
    }
    var sContent = 'Use this link to start the simulator at the current location:<textarea style="width: 100%; height: 66px;">' + sLink + '</textarea><br>Aircraft and heading will also be restored.';
    $('.gefs-linkOutput').html(sContent)
};
ges.isArray = function (oObject) {
    return (oObject.constructor === Array)
};
ges.loadModel = function (url) {
    var placemark = ge.createPlacemark('');
    var model = ge.createModel('');
    model.setAltitudeMode(ge.ALTITUDE_ABSOLUTE);
    placemark.setGeometry(model);
    var link = ge.createLink('');
    link.setHref(url);
    model.setLink(link);
    ge.getFeatures().appendChild(placemark);
    return {
        'model': model,
        'placemark': placemark
    }
};
ges.loadKmz = function (url, index, callback) {
    index = index || 0;
    google.earth.fetchKml(ge, url, function (kmlObject) {
        google.earth.executeBatch(ge, function () {
            if (kmlObject) {
                try {
                    var model = kmlObject.getFeatures().getChildNodes().item(index).getGeometry();
                    var placemark = kmlObject.getFeatures().getChildNodes().item(index);
                    ge.getFeatures().appendChild(kmlObject);
                    if (callback) {
                        callback({
                            'model': model,
                            'placemark': placemark
                        })
                    }
                } catch (e) {}
            }
        })
    })
};
ges.lodDeltaThreshold = 1;
ges.getGroundAltitude = function (lat, lon) {
    var collResult = objects.getAltitudeAtLocation(lat, lon);
    if (collResult) {
        collResult.isObject = true;
        return collResult
    } else {
        return {
            'location': [lat, lon, ge.getGlobe().getGroundAltitude(lat, lon)]
        }
    }
};
ges.getCollisionFromRay = function (rayOrigin, rayEnd, rayVector, alternateLla, worldPosition, genericCollisionResult) {
    var collResult = objects.checkCollisions(rayOrigin, rayEnd, rayVector);
    if (collResult) {
        return collResult
    } else {
        if (worldPosition && genericCollisionResult) {
            var altitude = ges.getAltitudeAtPointFromCollisionResult(genericCollisionResult, [worldPosition[0], worldPosition[1], 0]);
            collResult = {
                'location': [alternateLla[0], alternateLla[1], altitude],
                'normal': genericCollisionResult.normal
            }
        } else {
            collResult = {
                'location': [alternateLla[0], alternateLla[1], ge.getGlobe().getGroundAltitude(alternateLla[0], alternateLla[1])]
            }
        }
        return collResult
    }
};
ges.getAltitudeAtPointFromCollisionResult = function (collisionResult, point) {
    var slopeX = -collisionResult.normal[0] / collisionResult.normal[2];
    var slopeY = -collisionResult.normal[1] / collisionResult.normal[2];
    return collisionResult.location[2] + (point[0] * slopeX) + (point[1] * slopeY)
};
ges.getNormalFromCollision = function (collResult) {
    var normal;
    if (collResult.normal) {
        normal = collResult.normal
    } else {
        normal = getGroundNormal(collResult.location)
    }
    return normal
};
ges.getNight = function (location) {
    if (ge.getSun().getVisibility() && location) {
        var time;
        var pluginTime = ge.getTime().getTimePrimitive();
        if (pluginTime.getType() == 'KmlTimeSpan') {
            pluginTime = pluginTime.getBegin().get()
        } else {
            pluginTime = pluginTime.getWhen().get()
        }
        var pluginHours = pluginTime.substr(11, 2) * 1;
        var deltaHours = 0;
        if (pluginTime.indexOf('Z') == -1) {
            var deltaPosition = pluginTime.indexOf('+');
            if (deltaPosition == -1) {
                deltaPosition = pluginTime.indexOf('-')
            }
            if (deltaPosition > -1) {
                deltaHours = pluginTime.substr(deltaPosition, 2) * 1
            }
        }
        var UTCHours = pluginHours - deltaHours;
        var localHour = UTCHours + (location[1] / 15);
        if (localHour > 23) {
            localHour = localHour - 24
        }
        if (localHour < 0) {
            localHour = 24 + localHour
        }
        if (localHour < 9 || localHour > 17) {
            return true
        }
        return false
    } else {
        return false
    }
};
ges.disablePlacemarkEvents = function (placemark) {
    google.earth.addEventListener(placemark, 'mouseover', function (event) {
        event.preventDefault()
    });
    google.earth.addEventListener(placemark, 'click', function (event) {
        event.preventDefault()
    })
};
ges.getRampValue = function (ramp, value) {
    var result = 0;
    if (value > ramp[0] && value < ramp[3]) {
        if (value < ramp[1]) {
            result = (1 / (ramp[1] - ramp[0])) * (value - ramp[0])
        } else if (value > ramp[2]) {
            result = 1 - (1 / (ramp[3] - ramp[2])) * (value - ramp[2])
        } else {
            result = 1
        }
    }
    return result
};
ges.animFilter = function (animation) {
    var value;
    if (animation['value'] == 'random') {
        value = Math.random()
    } else if ($.isFunction(animation['value'])) {
        var value = 0;
        try {
            value = animation['value']()
        } catch (e) {
            value = 0
        }
    } else {
        value = ges.aircraft.animationValue[animation.value] || 0
    } if (animation.ramp) {
        value = ges.getRampValue(animation.ramp, value)
    }
    if (animation['value'] == 'strobe') {
        value = 0;
        if (new Date().getTime() % 1500 > 1400) {
            value = 1
        }
    }
    if (animation['value'] == 'strobe2') {
        value = 0;
        if (new Date().getTime() % 1800 > 1700) {
            value = 1
        }
    }
    if (animation['between']) {
        if (value > animation['between'][0] && value < animation['between'][1]) {
            value = 1
        } else {
            value = 0
        }
    }
    if (animation['delay']) {
        value = value - animation['delay'];
        value = clamp(value, 0, 1);
        if (animation['delay'] < 0) {
            value = value + animation['delay']
        }
    }
    if (animation['threshold']) {
        if (value < animation['threshold']) {
            value = 0
        }
    }
    if (animation['eq']) {
        if (value == animation['eq']) {
            value = 1
        } else {
            value = 0
        }
    }
    if (animation['notEq']) {
        if (value != animation['notEq']) {
            value = 1
        } else {
            value = 0
        }
    }
    if (animation['gt']) {
        if (value > animation['gt']) {
            value = 1
        } else {
            value = 0
        }
    }
    if (animation['lt']) {
        if (value < animation['lt']) {
            value = 1
        } else {
            value = 0
        }
    }
    if (animation['min']) {
        if (value < animation['min']) {
            value = animation['min']
        }
    }
    if (animation['max']) {
        if (value > animation['max']) {
            value = animation['max']
        }
    }
    var booleanValue = false;
    if (animation['when']) {
        for (var w = 0, l = animation['when'].length; w < l; w++) {
            if (animation['when'][w] == value) {
                booleanValue = true;
                break
            }
        }
        value = booleanValue
    } else if (animation['whenNot']) {
        booleanValue = true;
        for (var w = 0, l = animation['whenNot'].length; w < l; w++) {
            if (animation['whenNot'][w] == value) {
                booleanValue = false;
                break
            }
        }
        value = booleanValue
    }
    if (animation['preoffset']) {
        value += animation['preoffset']
    }
    if (animation['ratio']) {
        value = value * animation['ratio']
    }
    if (animation['power']) {
        value = Math.pow(value, animation['power'])
    }
    if (animation['offset']) {
        value += animation['offset']
    }
    if (animation['set']) {
        if (value) {
            value = animation['set']
        } else {
            value = animation['unset'] || 0
        }
    }
    if (animation['fmin']) {
        if (value < animation['fmin']) {
            value = animation['fmin']
        }
    }
    if (animation['fmax']) {
        if (value > animation['fmax']) {
            value = animation['fmax']
        }
    }
    return value
};
Math.sign = function (number) {
    if (number < 0) {
        return -1
    }
    return 1
};
var PID = function (kp, ki, kd) {
    this._kp = kp;
    this._ki = ki;
    this._kd = kd;
    this.reset()
};
PID.prototype.reset = function () {
    this._lastInput = 0;
    this._lastError = 0;
    this._errSum = 0
};
PID.prototype.set = function (setPoint) {
    this._setPoint = setPoint
};
PID.prototype.compute = function (input, dt) {
    var error = this._setPoint - input;
    this._errSum += (error * dt);
    var dInput = (input - this._lastInput) / dt;
    this._lastErr = error;
    this._lastInput = input;
    return this._kp * error + this._ki * this._errSum - this._kd * dInput
};
(function ($) {
    $.fn.ajaxForm = function () {
        return this.each(function () {
            var submitCallback = function (context, event) {
                var $context = $(context);
                var action = context.getAttribute('action') || context.getAttribute('href') || null;
                var method = context.getAttribute('method') || 'GET';
                var enctype = context.getAttribute('enctype') || '';
                var $target = $(context.getAttribute('data-target'));
                $target = $target.length ? $target : $context;
                var processor = context.getAttribute('data-processor') || null;
                var confirmModal = context.getAttribute('data-confirm') || null;
                var query = $context.serialize ? $context.serialize() : '';
                if (action) {
                    var actionSplit = action.split('?');
                    var urlQuery = actionSplit[1];
                    action = actionSplit[0]
                }
                var inlineData = context.getAttribute('data');
                query += (urlQuery ? '&' + urlQuery : '') + (inlineData ? '&' + inlineData : '');
                query = $.parseParams(query);
                if (processor) {
                    query = window[processor](query)
                }
                var successFunction = function (sResponse) {
                    $context.trigger('complete');
                    $target.replaceWith(sResponse)
                };
                var submitFn = function () {
                    if ($context.attr('submitting') == 'true') {
                        return true
                    }
                    $target.css('position', 'relative');
                    $target.prepend('<div class="gefs-loading"></div>');
                    if ($target.htmlView('getData')) {
                        event.preventDefault();
                        $target.htmlView('load', action, query, {
                            'method': method
                        })
                    } else {
                        if (enctype == 'multipart/form-data') {
                            var requestId = new Date().getTime();
                            $('body').append('<iframe name="' + requestId + '"></iframe>');
                            var iframe = $('[name="' + requestId + '"]');
                            $context.attr('target', requestId);
                            $context.append('<input type="hidden" name="callback" value="' + requestId + '"/>');
                            window[requestId] = function () {
                                successFunction(iframe[0].contentDocument.body.innerHTML);
                                iframe.remove();
                                $context.attr('submitting', 'false');
                                window[requestId] = null
                            };
                            $context.attr('submitting', 'true')
                        } else {
                            event.preventDefault();
                            jQuery.ajax(action, {
                                data: query,
                                type: method,
                                success: successFunction,
                                error: function (sResponse) {}
                            })
                        }
                    }
                };
                $context.trigger('ajaxSubmit');
                if (confirmModal) {
                    $(confirmModal).modal({
                        keyboard: true,
                        show: true
                    }).find('.gefs-f-confirm').on('click', function () {
                        submitFn()
                    })
                } else {
                    submitFn()
                }
            };
            $(this).on('click', '.gefs-f-ajaxLink', function (event) {
                submitCallback(this, event)
            });
            $(this).on('submit', '.gefs-f-ajaxForm', function (event) {
                submitCallback(event.currentTarget, event)
            })
        })
    };
    $.fn.htmlView = function (sMethod) {
        var methods = {
            'init': function (sView, oState, oSettings) {
                var defaultSettings = {
                    'baseUrl': ''
                };
                var defaultState = {};
                this.data('htmlView', {
                    'view': sView,
                    'state': $.extend(defaultState, oState || {}),
                    'settings': $.extend(defaultSettings, oSettings || {})
                });
                var that = this;
                if (defaultSettings.urlHistory) {
                    var handleHashChange = function () {
                        var urlFragment = window.location.hash ? window.location.hash.substring(1) : null;
                        if (urlFragment && urlFragment !== that.data('htmlView').view) {
                            that.htmlView('load', urlFragment)
                        }
                    };
                    window.onhashchange = function () {
                        handleHashChange()
                    };
                    handleHashChange()
                }
                return this
            },
            'load': function (sView, oState, oSettings) {
                return this.each(function () {
                    var $this = $(this);
                    var data = $this.data('htmlView') || {};
                    var settings = $.extend($this.data('htmlView').settings || {}, oSettings || {});
                    var state = $this.data('htmlView').state || {};
                    if ($this.data('htmlView').view != null && view != null && $this.data('htmlView').view != view) {
                        state = {}
                    }
                    state = $.extend(state, oState || {});
                    var view = sView || $this.data('htmlView').view || '';
                    $this.data('htmlView', {
                        'view': view,
                        'state': state,
                        'settings': settings
                    });
                    var viewUrl = settings.baseUrl + view;
                    if (settings.urlHistory) {
                        window.location.hash = view
                    }
                    $this.htmlView('abort');
                    $this.prepend('<div class="gefs-loading"><a href="#" class="gefs-cancelHTMLViewRequest">Cancel request</a></div>');
                    $this.find('.gefs-cancelHTMLViewRequest').click(function () {
                        $this.htmlView('abort')
                    });
                    var jqXHR = jQuery.ajax(viewUrl, {
                        type: settings.method || 'GET',
                        data: state,
                        success: function (sData) {
                            if (settings.responseProcessor) {
                                try {
                                    sData = settings.responseProcessor(sData)
                                } catch (e) {
                                    throw ('$.fn.htmlView - Exception while processing response: ' + e)
                                }
                            }
                            try {
                                $this.html(sData)
                            } catch (e) {
                                throw ('$.fn.htmlView - Exception while appending html data: ' + e)
                            }
                            $this.data('lastJqXHR', null);
                            $this.trigger('viewChange')
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            if (textStatus != 'abort') {
                                var html = '<div class="alert alert-error fade in"><a class="close" data-dismiss="alert" href="#">&times;</a>';
                                html += jqXHR.status + ': ' + textStatus + ' ' + errorThrown;
                                html += '</div>';
                                $this.html(html);
                                $alert = $this.find('.alert');
                                setTimeout(function () {
                                    $alert.alert('close')
                                }, 5000);
                                $this.trigger('viewChange')
                            }
                            $this.data('lastJqXHR', null)
                        }
                    });
                    $this.data('lastJqXHR', jqXHR)
                })
            },
            'abort': function () {
                return this.each(function () {
                    var $this = $(this);
                    var lastJqXHR = $this.data('lastJqXHR');
                    if (lastJqXHR && lastJqXHR.abort) {
                        lastJqXHR.abort();
                        $this.find('.gefs-loading').remove()
                    }
                })
            },
            'getData': function () {
                return this.data('htmlView')
            },
            'clear': function () {
                return this.each(function () {
                    $(this).html('')
                })
            }
        };
        if (methods[sMethod]) {
            return methods[sMethod].apply(this, Array.prototype.slice.call(arguments, 1))
        } else if (typeof sMethod === 'object' || !sMethod) {
            return methods.init.apply(this, arguments)
        } else {
            $.error('Method ' + sMethod + ' does not exist on htmlView plugin')
        }
    };
    var re = /([^&=]+)=?([^&]*)/g;
    var decodeRE = /\+/g;
    var decode = function (str) {
        return decodeURIComponent(str.replace(decodeRE, " "))
    };
    $.parseParams = function (query) {
        var params = {}, e;
        while (e = re.exec(query)) {
            var name = decode(e[1]);
            if (params[name] != undefined) {
                if (params[name].constructor != Array) {
                    params[name] = [params[name]]
                }
                params[name].push(decode(e[2]))
            } else {
                params[name] = decode(e[2])
            }
        }
        return params
    };
    var $activeSlider;
    var activeSliderData;
    var getSliderData = function ($slider) {
        var $selectBar = $slider.find('.slider-selection');
        var $rail = $slider.find('.slider-rail');
        var min = parseFloat($slider.attr('min'));
        var max = parseFloat($slider.attr('max'));
        var precision = parseInt($slider.attr('precision'));
        var range = max - min;
        var railWidth = $rail.width();
        return {
            min: min,
            max: max,
            range: range,
            precision: precision,
            offset: $selectBar.offset()['left'],
            ratio: range / railWidth,
            percRatio: 100 / range,
            $selectBar: $selectBar,
            $input: $slider.find('.slider-input')
        }
    };
    $.fn.slider = function (method, value, event, data) {
        if (method == 'value') {
            $this = $(this);
            if (!data) {
                data = getSliderData($this)
            }
            if (event) {
                value = ((event.pageX - data.offset) * data.ratio + data.min)
            }
            if (value != undefined) {
                value = Math.max(data.min, Math.min(data.max, value)).toFixed(data.precision);
                if (isNaN(value)) {
                    value = (0).toFixed(data.precision)
                }
                data.$selectBar.width(((value - data.min) * data.percRatio) + '%');
                data.$input.val(value);
                $this.trigger('change', value);
                if (event) {
                    $this.trigger('userchange', value)
                }
            } else {
                return data.$input.val()
            }
        }
    };
    $(document).ready(function () {
        $(document).mousemove(function (event, pageX) {
            if ($activeSlider) {
                event.pageX = event.pageX || pageX;
                $activeSlider.slider('value', null, event, activeSliderData)
            }
        }).mouseup(function () {
            if ($activeSlider) {
                $activeSlider.trigger('dragend');
                $activeSlider = null;
                activeSliderData = null
            }
        }).on('mousedown', '.slider', function (event) {
            var $this = $(this);
            $this.trigger('dragstart');
            $activeSlider = $this;
            activeSliderData = getSliderData($this);
            $this.trigger('mousemove', [event.pageX]);
            event.preventDefault();
            event.stopPropagation()
        }).find('.slider').each(function () {
            var $this = $(this);
            $this.slider('value', $this.attr('value') || 0)
        })
    })
})(jQuery);


// VAŽNOO!!

$(document).ready(function () {
    $(document).ajaxForm()
});
var viewportReferenceWidth = 1800;
var viewportReferenceHeight = 800;
var PAGE_PATH = "http://www.gefs-online.com/".replace(/\/[^\/]+$/, '/');

//var PAGE_PATH = document.URL.replace(/\/[^\/]+$/, '/');

var ges = window.ges || {};
ges.initGe = function () {
    google.earth.createInstance("map3d", function (object) {
        window.ge = object;
        ge.getWindow().setVisibility(true);
        ge.getLayerRoot().enableLayerById(ge.LAYER_BUILDINGS, true);
        try {
            ge.getLayerRoot().enableLayerById(ge.LAYER_TREES, true)
        } catch (e) {}
        ge.getOptions().setFlyToSpeed(ge.SPEED_TELEPORT);
        ge.getOptions().setAtmosphereVisibility(true);
        google.earth.addEventListener(ge.getWindow(), "mouseup", function (event) {
            ge.getWindow().blur()
        });
        ge.getWindow().blur();
        ge.getOptions().setMouseNavigationEnabled(true);
        ges.doPause(true);
        ges.init();
        google.earth.addEventListener(ge, "frameend", ges.tick);
        $(window).unload(ges.unload)
    }, function () {
        ges.debug.alert('init fails')
    })
};
ges.unload = function () {
    google.earth.removeEventListener(ge, "frameend", ges.tick);
    ges.savePreferences();
    if (ges.PRODUCTION) {
        try {
            var fps = Math.ceil(ges.debug.fps / 5) * 5;
        } catch (err) {}
    }
};
try {
    google.load("earth", "1");
    google.load("maps", "3", {
        other_params: "sensor=false"
    });
    google.setOnLoadCallback(ges.initGe)
} catch (e) {}
ges.init = function () {
    ges.debug.init();
    ges.PRODUCTION = ges.PRODUCTION || false;
    if (!ges.PRODUCTION) {
        ges.debug.on();
        ges.killCache = new Date().getTime()
    }
    ges.map3d = $('.map3d')[0];
    ges.resizeHandlers = {};
    ges.resizeHandlersIndex = 0;
    ges.addResizeHandler(ges.getViewportDimentions);
    $(window).resize(ges.handleResize);
    ges.getViewportDimentions();
    ges.initPreferences();
    ges.readPreferences(function () {
        jsonp.init();
        ui.init();
        controls.init();
        ges.lastMilliseconds = new Date().getTime();
        ges.lastMilliseconds2 = new Date().getTime();
        var urlParameters = getURLParameters();
        urlParameters.coordinates = [parseFloat(urlParameters.lat) || undefined, parseFloat(urlParameters.lon) || undefined, parseFloat(urlParameters.alt) || undefined, parseFloat(urlParameters.heading) || undefined];
        if (urlParameters.windspeed && urlParameters.windheading) urlParameters.weather = {
            windActive: true,
            customWindActive: true,
            windDirection: parseInt(urlParameters.windheading),
            windSpeed: parseInt(urlParameters.windspeed)
        };
        ges.preferences = $.extend(true, ges.preferences, urlParameters);
        var initialCoordinates = ges.preferences.coordinates;
        if (initialCoordinates) {
            if (initialCoordinates[0] < 0 || initialCoordinates[0] > 180 || initialCoordinates[1] < -180 || initialCoordinates[1] > 180 || initialCoordinates[2] > 100000) {
                initialCoordinates = null
            }
        }
        if (initialCoordinates && initialCoordinates[0] && initialCoordinates[1]) {} else {
            ges.initialRunways = [
                [45.731906, 16.052251, 0, 46],
            ];
            initialCoordinates = ges.initialRunways[Math.floor(Math.random() * ges.initialRunways.length)]
        }
        ges.aircraft = new Aircraft();
        var aircraftName = ges.preferences.aircraft;
        if (aircraftName) {} else {
            aircraftName = 'cub'
        }
        ges.aircraft.load(aircraftName, initialCoordinates);
        camera.init();
        objects.init();
        weather.init();
        ges.fx.init();
        ges.initLoggedInUser();
        var testNight = function () {
            ges.isNight = ges.getNight(ges.aircraft.llaLocation);
            ges.aircraft.animationValue['night'] = ges.isNight ? 1 : -1
        };
        testNight();
        var IEGarbageCollector = function () {
            if (typeof (CollectGarbage) == "function") {
                CollectGarbage()
            }
        };
        var everyFiveSeconds = function () {
            testNight();
            IEGarbageCollector()
        };
        setInterval(everyFiveSeconds, 5000)
    })
};
ges.initLoggedInUser = function () {
    var lastPitchValue = 0;
    var keepAlive = function () {
        if (lastPitchValue != controls['rawPitch'] && !controls.autopilot.on) {
            $.ajax('/backend/accounts/api.php?action=keeptime')
        } else {
            $.ajax('/backend/accounts/api.php')
        }
        lastPitchValue = controls['rawPitch']
    };
    var interval = 1000 * 60 * 5;
    setInterval(keepAlive, interval)
};


ges.togglePause = function () {
    if (!ges.pause) {
        ges.doPause()
    } else {
        ges.undoPause()
    }
};
ges.isPaused = function () {
    if (ges.absolutePause || ges.pause) {
        return true
    }
};
ges.doPause = function (isAbsolute) {
    audio.stop();
    flight.recorder.stopRecording();
    flight.recorder.pausePlayback();
    if (!isAbsolute) {
        ges.pause = true;
        $('.gefs-button-pause').addClass('btn-info')
    } else {
        ges.absolutePause = true
    }
};
ges.undoPause = function (isAbsolute) {
    if (!ges.absolutePause || (ges.absolutePause && isAbsolute)) {
        if (!ges.absolutePause) {
            ges.pause = false;
            $('.gefs-button-pause').removeClass('btn-info')
        }
    }
    if (isAbsolute) {
        ges.absolutePause = false
    }
    flight.recorder.unpausePlayback()
};
ges.tick = function () {
    var now = new Date().getTime();
    var msDt = (now - ges.lastMilliseconds);
    var DmsDt = msDt + 0;
    if (msDt > 100) msDt = 100;
    var sDt = msDt / 1000.0;
    ges.lastMilliseconds = now;
    if (!ges.absolutePause) {
        if (!ges.pause) {
            controls.update(sDt);
            flight.tick(sDt, msDt);
            ges.debug.update(DmsDt);
            camera.update(sDt);
            instruments.update();
            audio.update();
            ges.fx.update(msDt)
        } else {
            camera.update(sDt)
        }
        weather.update()
    }
};
ges.flyTo = function (coord, justReload) {
    if (!coord) {
        return
    }
    ges.doPause(true);
    google.earth.executeBatch(ge, function () {
        ges.cautiousWithTerrain = true;
        var aircraft = ges.aircraft;
        coord[0] = coord[0] || ges.initialRunways[0][0];
        coord[1] = coord[1] || ges.initialRunways[0][1];
        coord[2] = coord[2] || 0;
        coord[3] = coord[3] || 0;
        ges.lastFlightCoordinates = coord;
        var lat = coord[0];
        var lon = coord[1];
        var altitude = coord[2];
        var htr = [0, 0, 0];
        htr[0] = coord[3];
        var onGround = (altitude == 0);
        if (!justReload) {
            camera.reset();
            controls.reset()
        } else {
            camera.set(camera.currentMode)
        }
        aircraft.reset(onGround);
        aircraft.llaLocation = [lat, lon, altitude];
        objects.updateVisibility();
        objects.updateCollidables();
        ges.fx.runway.refresh();
        var altAtAircraft = ges.getGroundAltitude(lat, lon)['location'][2];
        ges.groundElevation = altAtAircraft;
        weather.refresh(lat, lon, altAtAircraft);
        if (coord[4]) {
            altitude = altitude + aircraft.setup['startAltitude']
        } else {
            altitude = ges.groundElevation + altitude + aircraft.setup['startAltitude']
        } if (!onGround) {
            aircraft.place([lat, lon, altitude], htr);
            var velocity = aircraft.setup['minimumSpeed'] / 1.94 * aircraft.setup['mass'];
            aircraft.rigidBody.applyCentralImpulse(V3.scale(aircraft.object3d.getWorldFrame()[1], velocity));
            ges.undoPause(true)
        } else {
            htr[1] = aircraft.setup['startTilt'] || 0;
            aircraft.place([lat, lon, altitude], htr);
            ges.undoPause(true);
            ges.undoPause()
        }
        camera.update(0);
        flight.recorder.clear()
    })
};
ges.flyToCamera = function () {
    var coord = clone(camera.lla);
    coord[2] = clamp(coord[2], 0, 30000);
    coord[3] = camera.htr[0];
    coord[4] = true;
    ges.flyTo(coord)
};
ges.resetFlight = function () {
    if (ges.lastFlightCoordinates) {
        ges.flyTo(ges.lastFlightCoordinates, true)
    }
};
ges.handleResize = function () {
    clearTimeout(ges.resizingTimeout);
    ges.resizingTimeout = setTimeout(function () {
        for (var i in ges.resizeHandlers) {
            try {
                ges.resizeHandlers[i]()
            } catch (e) {
                ges.debug.alert('ges.handleResize: ' + e)
            }
        }
    }, 300)
};
ges.addResizeHandler = function (fHandler) {
    ges.resizeHandlers[ges.resizeHandlersIndex] = fHandler;
    return ges.resizeHandlersIndex++
};
ges.removeResizeHandler = function (handlerId) {
    delete ges.resizeHandlers[handlerId]
};
ges.getViewportDimentions = function () {
    ges.viewportWidth = ges.map3d.offsetWidth;
    ges.viewportHeight = ges.map3d.offsetHeight
};
ges.preferences = {};
ges.preferencesDefault = {
    'aircraft': '',
    'coordinates': '',
    'controlMode': 'mouse',
    'keyboard': {
        'sensitivity': 1,
        'exponential': 0,
        'mixYawRoll': true,
        'mixYawRollQuantity': 1,
        'keys': {
            'Bank left': {
                'keycode': 37,
                'label': '<Left Arrow>'
            },
            'Bank right': {
                'keycode': 39,
                'label': '<Right Arrow>'
            },
            'Pitch down': {
                'keycode': 38,
                'label': '<Up Arrow>'
            },
            'Pitch up': {
                'keycode': 40,
                'label': '<Down Arrow>'
            },
            'Steer left': {
                'keycode': 188,
                'label': '<'
            },
            'Steer right': {
                'keycode': 190,
                'label': '>'
            },
            'Brakes': {
                'keycode': 32,
                'label': '<Space bar>'
            },
            'Parking brake': {
                'keycode': 186,
                'label': ';'
            },
            'Increase throttle': {
                'keycode': 107,
                'label': '+'
            },
            'Decrease throttle': {
                'keycode': 109,
                'label': '-'
            },
            'PgUp': {
                'keycode': 33,
                'label': '<Page up>'
            },
            'PgDwn': {
                'keycode': 34,
                'label': '<Page down>'
            },
            'Elevator trim up': {
                'keycode': 36,
                'label': '<Home>'
            },
            'Elevator trim down': {
                'keycode': 35,
                'label': '<End>'
            },
            'Elevator trim neutral': {
                'keycode': 46,
                'label': '<Delete>'
            },
            'Engine switch (on/off)': {
                'keycode': 69,
                'label': 'E'
            },
            'Gear toggle (up/down)': {
                'keycode': 71,
                'label': 'G'
            },
            'Lower flaps': {
                'keycode': 219,
                'label': '['
            },
            'Raise flaps': {
                'keycode': 221,
                'label': ']'
            },
            'Airbrake toggle (on/off)': {
                'keycode': 66,
                'label': 'B'
            }
        }
    },
    'mouse': {
        'sensitivity': 1,
        'exponential': 1,
        'mixYawRoll': true,
        'mixYawRollQuantity': 1
    },
    'weather': {
        'sun': false,
        'time': 'day',
        'clouds': true,
        'cloudCover': false,
        'windActive': false,
        'customWindActive': false,
        'windSpeed': 0,
        'windDirection': 0,
        'randomizeWind': true
    },
    'crashDetection': false,
    'chat': false,
    'sound': true
};
ges.preferencesKeycodeLookup = {
    8: '<Back space>',
    9: '<Tab>',
    13: '<Enter>',
    16: '<Shift>',
    17: '<Control>',
    18: '<Alt>',
    19: '<Break>',
    20: '<Caps Lock>',
    32: '<Space bar>',
    33: '<Page up>',
    34: '<Page down>',
    35: '<End>',
    36: '<Home>',
    37: '<Left Arrow>',
    38: '<Up Arrow>',
    39: '<Right Arrow>',
    40: '<Down Arrow>',
    44: '<Print scr>',
    45: '<Insert>',
    46: '<Delete>',
    110: '<Delete>',
    112: 'F1',
    113: 'F2',
    114: 'F3',
    115: 'F4',
    116: 'F5',
    117: 'F6',
    118: 'F7',
    119: 'F8',
    120: 'F9',
    121: 'F10',
    122: 'F11',
    123: 'F12',
    144: '<Num lock>',
    145: '<Scroll Lock>'
};
ges.initPreferences = function () {
    ges.$preferencePanel = $('.gefs-preferences');
    var stopPropagation = function (event) {
        event.stopPropagation()
    };
    ges.$preferencePanel.keydown(stopPropagation);
    ges.$preferencePanel.keyup(stopPropagation)
};
ges.savePreferences = function () {
    ges.preferences['coordinates'] = ges.aircraft.getCurrentCoordinates();
    if (ges.aircraft.groundContact) {
        ges.preferences['coordinates'][2] = 0
    }
    var dataString = serialize(ges.preferences);
    ges.preferenceStore.set('preferences', dataString)
};
ges.resetPreferences = function () {
    ges.preferences = clone(ges.preferencesDefault);
    ges.savePreferences();
    ges.initializePreferencesPanel()
};
ges.readPreferences = function (fCallback) {
    ges.preferenceStore = new Persist.Store('gefs', {
        swf_path: 'swf/persist.swf'
    });
    savedPreferences = ges.preferenceStore.get('preferences') || {};
    try {
        savedPreferences = eval(savedPreferences);
        savedPreferences = savedPreferences[0]
    } catch (e) {
        alert('Unable to read saved preferendes. Preferences are reset to default.');
        savedPreferences == {}
    }
    if (savedPreferences && savedPreferences.keyboard && savedPreferences.keyboard.keys) {
        if (savedPreferences.keyboard.keys['Steer left'].keycode == 65) {
            savedPreferences.keyboard.keys['Steer left'] == null
        }
        if (savedPreferences.keyboard.keys['Steer right'].keycode == 68) {
            savedPreferences.keyboard.keys['Steer right'] == null
        }
    }
    ges.preferences = $.extend(true, {}, ges.preferencesDefault, savedPreferences);
    if (!ges.userAccount.id) {
        ges.preferences.chat = false
    }
    if (fCallback) {
        google.earth.executeBatch(ge, function () {
            fCallback()
        })
    }
};
ges.togglePreferencesPanel = function () {
    ui.toggleExpandLeft('pref');
    if (ges.$preferencePanel.is(':visible')) {
        ges.initializePreferencesPanel()
    }
};
ges.closePreferencePanel = function () {
    ui.toggleExpandLeft('pref')
};
ges.populateButtonAssignments = function () {
    if (!container) {
        return
    }
    var dropdown = '';
    for (i in controls.setters) {
        dropdown += '<option value="' + i + '">' + controls.setters[i]['label'] + '</option>'
    }
    dropdown += '</select>';
    var html = '';
    for (var i = 1; i <= 8; i++) {
        html += '<div class="gefs-led progress add-on gesfeedback" button="' + i + '"><div style="width: 100%;"></div></div></div>'
    }
    container.innerHTML = html
};
ges.populateKeyAssignments = function () {
    var $container = $('.gefs-keyboard-keys-container', ges.$preferencePanel);
    var html = '';
    for (var i in ges.preferences.keyboard.keys) {
        html += '<div class="label-input"><label>' + i + '</label><input class="gefs-preferences-key-detect" type="text" data-type="keydetect" gespref="ges.preferences.keyboard.keys.' + i + '" keycode="' + ges.preferences.keyboard.keys[i]['keycode'] + '" value="' + ges.preferences.keyboard.keys[i]['label'] + '"/></div>'
    }
    $container.html(html);
    $container.on('click focus', '.gefs-preferences-key-detect', function () {
        $('.gefs-preference-key-detecting', $container).each(function () {
            this.value = this._originalValue;
            $(this).removeClass('gefs-preference-key-detecting')
        });
        this._originalValue = this.value;
        this.value = '';
        $(this).addClass('gefs-preference-key-detecting')
    }).on('keyup', '.gefs-preferences-key-detect', function (event) {
        if ($(this).hasClass('gefs-preference-key-detecting')) {
            if (event.which != 27) {
                var newLabel;
                if (ges.preferencesKeycodeLookup[event.which]) {
                    newLabel = ges.preferencesKeycodeLookup[event.which]
                } else {
                    newLabel = this.value.toUpperCase()
                }
                this.value = newLabel;
                this.setAttribute('keycode', event.which);
                ges.setPreferenceFromInput(this)
            } else {
                this.value = this._originalValue
            }
            $(this).removeClass('gefs-preference-key-detecting');
            $(input).blur();
            event.stopPropagation();
            event.preventDefault()
        }
    }).on('keydown', '.gefs-preferences-key-detect', function (event) {
        if ($(this).hasClass('gefs-preference-key-detecting')) {
            if (event.which == 9) {
                event.stopPropagation();
                event.preventDefault()
            }
        }
    }).on('blur', '.gefs-preferences-key-detect', function (event) {
        if ($(this).hasClass('gefs-preference-key-detecting')) {
            if (this.value == '') {
                this.value = this._originalValue
            }
            $(this).removeClass('gefs-preference-key-detecting');
            event.stopPropagation();
            event.preventDefault()
        }
    })
};
ges.preferencesDebugInfo = function () {
    for (var i = 0; i < ges.debug.logStack.length; i++) {
        info += ges.debug.logStack[i] + '\n'
    }
    $('.ges-debug-info', ges.$preferencePanel).html(info)
};

ges.initializePreferencesPanel = function () {
    ges.populateButtonAssignments();
    $('[gespref]', ges.$preferencePanel).each(function () {
        var inputtype = this.getAttribute('data-type') || this.getAttribute('type');
        if (this.nodeName == 'SELECT') {
            inputtype = 'select'
        }
        inputtype = inputtype.toLowerCase();
        var sPref = this.getAttribute('gespref');
        var path = sPref.split('.');
        var preferenceReference = window;
        for (var i = 0; i < path.length - 1; i++) {
            preferenceReference = preferenceReference[path[i]]
        }
        var prefValue = preferenceReference[path[i]];
        switch (inputtype) {
        case 'slider':
            $(this).slider('value', prefValue);
            $(this).on('change', function (event, value) {
                ges.setPreferenceFromInput(this)
            });
            break;
        case 'select':
            ges.selectDropdown(this, prefValue);
            this.onchange = function () {
                ges.setPreferenceFromInput(this)
            };
            break;
        case 'radio-button':
            var matchValue = this.getAttribute('matchvalue');
            var state;
            if (matchValue && matchValue == prefValue) {
                $(this).click()
            }
            this.onclick = function () {
                ges.setPreferenceFromInput(this)
            };
            break;
        case 'checkbox':
        case 'radio':
            var matchValue = this.getAttribute('matchvalue');
            var state;
            if (matchValue) {
                state = (matchValue == prefValue)
            } else {
                state = (prefValue == true)
            }
            this.checked = state;
            this.onchange = function () {
                ges.setPreferenceFromInput(this)
            };
            break;
        case 'keydetect':
            break;
        default:
            this.value = prefValue;
            this.onchange = function () {
                ges.setPreferenceFromInput(this)
            }
        }
    });
    ges.populateKeyAssignments();
	ges.preferencesDebugInfo();
};
ges.destroyPreferencePanel = function () {
    clearInterval(ges.preferencesFeedbackInterval);
    ges.preferencesFeedbackInterval = null
};
ges.cancelPreferencesPanel = function () {
    ges.destroyPreferencePanel();
    ges.closePreferencePanel()
};
ges.setPreferenceFromInput = function (input) {
    try {
        var sPref = input.getAttribute('gespref');
        if (!sPref) {
            return
        }
        var inputtype = input.getAttribute('data-type') || input.getAttribute('type');
        if (input.nodeName == 'SELECT') {
            inputtype = 'select'
        };
        inputtype = inputtype.toLowerCase();
        var path = sPref.split('.');
        var preferenceReference = window;
        for (var i = 0; i < path.length - 1; i++) {
            preferenceReference = preferenceReference[path[i]]
        }
        var newValue;
        switch (inputtype) {
        case 'radio-button':
            var value = $(input).hasClass('active');
            var matchValue = input.getAttribute('matchvalue');
            if (value) {
                preferenceReference[path[i]] = matchValue
            }
            break;
        case 'checkbox':
        case 'radio':
            var matchValue = input.getAttribute('matchvalue');
            var value = input.checked;
            if (matchValue) {
                if (value) {
                    preferenceReference[path[i]] = matchValue
                }
            } else {
                preferenceReference[path[i]] = value
            }
            break;
        case 'slider':
            preferenceReference[path[i]] = $(input).slider('value');
            break;
        case 'keydetect':
            preferenceReference[path[i]].keycode = parseInt(input.getAttribute('keycode'));
            preferenceReference[path[i]].label = input.value;
            break;
        default:
            preferenceReference[path[i]] = input.value
        }
        var update = input.getAttribute('update');
        if (update) {
            var updateFunction = function () {
                eval(update)
            };
            updateFunction.apply(input)
        }
    } catch (e) {
        ges.debug.alert('ges.setPreferenceFromInput: ' + e)
    }
};
ges.savePreferencesPanel = function () {
    $('[gespref]', ges.$preferencePanel).each(function () {
        ges.setPreferenceFromInput(this)
    });
    ges.destroyPreferencePanel();
    ges.closePreferencePanel();
    ges.savePreferences()
};
var ui = ui || {};
ui.playerMarkers = {};
ui.dontMoveTimeoutValue = 10000;
ui.mouseUpHandlers = [];
ui.init = function () {
    ui.mouseUpHandler = function (event) {
        if (ui.dragging) {
            if (ui.resizeV || ui.resizeH) {
                if (ui.dragging.resize) {
                    ui.dragging.resize()
                }
                ui.resizeV = null;
                ui.resizeH = null;
                ui.dragging.style.cursor = 'default'
            }
            ui.dragging = null
        }
        ui.runMouseUpHandlers(event)
    };
    google.earth.addEventListener(ge.getWindow(), 'mouseup', ui.mouseUpHandler);
    $(document).mouseup(ui.mouseUpHandler);
    ui.hud.init();
    ui.chat.init();
    $(document).on('keydown', '.gefs-stopPropagation', function (event) {
        event.stopImmediatePropagation()
    });
    $(document).on('click', '.gefs-ui-top .gefs-expand-vert', function () {
        ui.toggleExpandTop();
        ges.handleResize();
        $(this).find('i').toggleClass('icon-chevron-up').toggleClass('icon-chevron-down')
    });
    $(document).on('click', '.gefs-map .gefs-expand-horiz', function () {
        if ($('body').hasClass('gefs-expand-left-full')) {
            $('body').removeClass('gefs-expand-left-full')
        } else {
            $('body').addClass('gefs-expand-left-full')
        }
        ui.resizeMap();
        ges.handleResize();
        $(this).find('i').toggleClass('icon-chevron-right').toggleClass('icon-chevron-left')
    })
};
ui.toggleExpandTop = function () {
    $('body').toggleClass('gefs-expand-top');
    ges.handleResize()
};
ui.toggleExpandLeft = function (state) {
    $('body').toggleClass('gefs-expand-left-' + state);
    ges.handleResize()
};
ui.addMouseUpHandler = function (fHandler) {
    ui.mouseUpHandlers.push(fHandler)
};
ui.runMouseUpHandlers = function (event) {
    for (var i = 0; i < ui.mouseUpHandlers.length; i++) {
        try {
            ui.mouseUpHandlers[i](event)
        } catch (e) {}
    }
};
ui.createMap = function (oOptions) {
    oOptions = oOptions || {};
    var lat, lon;
    if (ges.aircraft) {
        lat = ges.aircraft.llaLocation[0];
        lon = ges.aircraft.llaLocation[1]
    } else {
        lat = oOptions['lat'];
        lon = oOptions['lon']
    } if (ui.map) {
        ui.startMap();
        ui.updateMap(lat, lon);
        return
    }
    oOptions['zoom'] = oOptions['zoom'] || 12;
    oOptions['type'] = oOptions['type'] || google.maps.MapTypeId.TERRAIN;
    oOptions['standalone'] = oOptions['standalone'] || false;
    oOptions['norunways'] = oOptions['norunways'] || false;
    oOptions['holder'] = oOptions['holder'] || $('.gefs-map-viewport')[0];
    var location = new google.maps.LatLng(lat, lon);
    var runwayStyles = [{
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [{
            "color": "#808080"
        }, {
            "visibility": "simplified"
        }, {
            "lightness": 69
        }]
    }, {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "elementType": "labels.icon",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "elementType": "labels.text",
        "stylers": [{
            "lightness": 18
        }]
    }];
    var runwayMapOptions = {
        name: "Runways"
    };
    var runwayMap = new google.maps.StyledMapType(runwayStyles, runwayMapOptions);
    var aeronauticalStyles = [{
        featureType: "road",
        elementType: "all",
        stylers: [{
            visibility: "simplified"
        }, {
            hue: "#7700ff"
        }, {
            saturation: -63
        }]
    }, {
        featureType: "road",
        elementType: "labels",
        stylers: [{
            visibility: "off"
        }]
    }, {
        featureType: "water",
        elementType: "all",
        stylers: [{
            visibility: "on"
        }, {
            saturation: 3
        }, {
            lightness: 19
        }, {
            hue: "#003bff"
        }]
    }, {
        featureType: "poi",
        elementType: "all",
        stylers: [{
            visibility: "off"
        }]
    }, {
        featureType: "landscape",
        elementType: "all",
        stylers: [{
            invert_lightness: true
        }, {
            lightness: 86
        }, {
            gamma: 0.91
        }, {
            hue: "#2bff00"
        }, {
            saturation: -1
        }]
    }, {
        featureType: "road.local",
        elementType: "all",
        stylers: [{
            visibility: "off"
        }]
    }, {
        featureType: "administrative",
        elementType: "labels",
        stylers: [{
            lightness: 1
        }, {
            gamma: 1.17
        }, {
            saturation: 88
        }, {
            hue: "#cc00ff"
        }, {
            visibility: "on"
        }]
    }, {
        featureType: "transit",
        elementType: "all",
        stylers: [{
            visibility: "on"
        }, {
            lightness: -67
        }, {
            gamma: 1.58
        }]
    }, {
        featureType: "all",
        elementType: "all",
        stylers: []
    }, {
        featureType: "all",
        elementType: "all",
        stylers: []
    }];
    var styledMapOptions = {
        name: "Airspace"
    };
    var aeronauticalMap = new google.maps.StyledMapType(aeronauticalStyles, styledMapOptions);
    var mapOptions = {
        zoom: oOptions['zoom'],
        center: location,
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.TERRAIN, 'runways', 'aeronautical']
        }
    };
    ui.map = new google.maps.Map(oOptions['holder'], mapOptions);
    ui.map.mapTypes.set('aeronautical', aeronauticalMap);
    ui.map.mapTypes.set('runways', runwayMap);
    ui.map.setMapTypeId(oOptions['type']);
    ui.planeIcons = [];
    ui.playerIcons = [];
    for (var i = 0; i < 36; i++) {
        var id = i;
        if (i < 10) {
            id = '0' + id
        }
        var img = 'overlays/map/icon00' + id + '.png';
        ui.planeIcons[i] = new google.maps.MarkerImage(img, new google.maps.Size(40, 40), new google.maps.Point(0, 0), new google.maps.Point(17, 14));
        var img = 'overlays/map/players/icon00' + id + '.png';
        ui.playerIcons[i] = new google.maps.MarkerImage(img, new google.maps.Size(30, 30), new google.maps.Point(0, 0), new google.maps.Point(14, 11))
    }
    if (!oOptions['standalone']) {
        ui.planeMarker = new google.maps.Marker({
            position: location,
            map: ui.map,
            clickable: false,
            flat: true,
            icon: ui.planeIcons[0],
            title: "Here I am"
        })
    }
    var airspaceLayer = new google.maps.FusionTablesLayer(314443);
    var runwaysLayer = new google.maps.FusionTablesLayer(3097637);
    if (!oOptions['norunways']) {
        runwaysLayer.setMap(ui.map)
    }
    google.maps.event.addListener(ui.map, 'maptypeid_changed', function (event) {
        if (ui.map.getMapTypeId() == 'aeronautical') {
            airspaceLayer.setMap(ui.map)
        } else {
            airspaceLayer.setMap(null)
        } if (ui.map.getMapTypeId() == 'runways') {
            runwaysLayer.setMap(ui.map)
        } else {
            runwaysLayer.setMap(null)
        }
    });
    var flytToInfoWindow = new google.maps.InfoWindow();
    google.maps.event.addListener(ui.map, 'rightclick', function (event) {
        flytToInfoWindow.close();
        var contentString = '<b>Fly there (' + event.latLng.toUrlValue() + '):</b><ul>' + '<li><a href="http://flyto://' + event.latLng.lat() + ',' + event.latLng.lng() + ', 0, 0">On the ground</a></li>' + '<li><a href="http://flyto://' + event.latLng.lat() + ',' + event.latLng.lng() + ', 304, 0">At 1000 feet</a></li>' + '<li><a href="http://flyto://' + event.latLng.lat() + ',' + event.latLng.lng() + ', 3048, 0">At 5000 feet</a></li>' + '<li><a href="http://flyto://' + event.latLng.lat() + ',' + event.latLng.lng() + ', 9144, 0">At 30000 Feet</a></li>' + '</ul>';
        flytToInfoWindow.setPosition(event.latLng);
        flytToInfoWindow.setContent(contentString);
        flytToInfoWindow.open(ui.map)
    });
    $(oOptions['holder']).click(function (event) {
        try {
            var href = event.target.getAttribute('href');
            if (href) {
                href = href.split('://');
                if (href[1] == 'flyto') {
                    var location = href[2].split(',');
                    var heading = parseFloat(location[3] || 0);
                    var alternateHeading = parseFloat(location[4] || 0);
                    var finalHeading = heading > 0 ? heading : alternateHeading;
                    var coord = [parseFloat(location[0]), parseFloat(location[1]), parseFloat(location[2]), finalHeading];
                    ges.flyTo(coord);
                    event.preventDefault()
                }
            }
            ui.stopMovingMap()
        } catch (e) {}
    }).mousedown(function () {
        ui.stopMovingMap(true)
    }).mouseup(function () {
        ui.stopMovingMap()
    });
    if (!oOptions['standalone']) {
        ui.startMap();
        ui.speedeeFlightPath()
    } else {
        ui.mapActive = true
    }
};
ui.resizeMap = function () {
    google.maps.event.trigger(ui.map, 'resize')
};
ui.toggleMap = function () {
    ui.toggleExpandLeft('map');
    if ($('.gefs-map').is(':visible')) {
        ui.createMap();
        ui.resizeMap()
    } else {
        ui.stopMap()
    }
};
ui.stopMap = function () {
    if (ui.mapUpdateInterval) {
        clearInterval(ui.mapUpdateInterval);
        ui.mapUpdateInterval = null
    }
    ui.mapActive = false
};
ui.startMap = function () {
    ui.stopMap();
    ui.mapActive = true;
    ui.mapUpdateInterval = setInterval(function () {
        try {
            ui.updateMap(ges.aircraft.llaLocation[0], ges.aircraft.llaLocation[1])
        } catch (e) {
            ges.debug.alert('Interval updateMap: ' + e)
        }
    }, 1000)
};
ui.stopMovingMap = function (reallyReallyStop) {
    if (ui.dontMoveTimeout) {
        clearTimeout(ui.dontMoveTimeout)
    }
    if (!reallyReallyStop) {
        ui.dontMoveTimeout = setTimeout(function () {
            ui.dontMove = false
        }, ui.dontMoveTimeoutValue)
    }
    ui.dontMove = true
};
ui.updateMap = function (lat, lon) {
    if (ui.map && ui.mapActive && !ges.pause && !ges.absolutePause) {
        var location = new google.maps.LatLng(lat, lon);
        if (!ui.dontMove) {
            ui.map.setCenter(location)
        }
        ui.planeMarker.setPosition(location);
        var planeHeading = ges.aircraft.htr[0];
        if (planeHeading < 0) {
            planeHeading = planeHeading + 360
        }
        var iconHeading = Math.floor(planeHeading / 10);
        ui.planeMarker.setIcon(ui.planeIcons[iconHeading])
    }
};
ui.addPlayerMarker = function (id) {
    if (ui.map && ui.mapActive) {
        var location = new google.maps.LatLng(0, 0);
        ui.playerMarkers[id] = new google.maps.Marker({
            position: location,
            map: ui.map
        })
    } else {
        ui.playerMarkers[id] = 'queued'
    }
};
ui.updatePlayerMarker = function (id, coord, callsign) {
    if (ui.map && ui.mapActive) {
        if (ui.playerMarkers[id] == 'queued') {
            ui.addPlayerMarker(id)
        }
        var location = new google.maps.LatLng(coord[0], coord[1]);
        ui.playerMarkers[id].setPosition(location);
        ui.playerMarkers[id].setTitle(callsign + ' (' + parseInt(coord[2] * metersToFeet) + 'ft)');
        var planeHeading = coord[3];
        if (planeHeading < 0) {
            planeHeading = planeHeading + 360
        }
        var iconHeading = Math.floor(planeHeading / 10);
        ui.playerMarkers[id].setIcon(ui.playerIcons[iconHeading])
    }
};
ui.deletePlayerMarker = function (id) {
    if (ui.map && ui.playerMarkers[id] && ui.playerMarkers[id].setMap) {
        ui.playerMarkers[id].setMap(null)
    }
    ui.playerMarkers[id] = null;
    delete ui.playerMarkers[id]
};
ui.font = {};
ui.font.path = PAGE_PATH + 'overlays/font/';
ui.font.width = 32;
ui.font.spacing = 14;
ui.font.defaultOptions = {
    'rescale': false,
    'size': {
        x: ui.font.width,
        y: ui.font.width
    },
    'anchor': {
        x: 0,
        y: 0
    }
};
ui.font.Message = function (message, options) {
    message = message + '';
    for (var i in ui.font.defaultOptions) {
        if (!options[i]) {
            options[i] = ui.font.defaultOptions[i]
        }
    }
    this.overlays = [];
    if (options.alignment.x == 'right') {
        message = message.split('').reverse().join('')
    }
    for (var i = 0; i < message.length; i++) {
        var asciiCode = message.charCodeAt(i);
        var charOptions = clone(options);
        charOptions.url = ui.font.path + asciiCode + '.png';
        charOptions.position.x += i * ui.font.spacing;
        var newOverlay = new Overlay(charOptions);
        this.overlays.push(newOverlay)
    }
    var that = this;
    this.resizeHandler = ges.addResizeHandler(function () {
        for (var i = 0, l = that.overlays.length; i < l; i++) {
            that.overlays[i].resizeFromScreen()
        }
    })
};
ui.font.Message.prototype.show = function () {
    this.setVisibility(true)
};
ui.font.Message.prototype.hide = function () {
    this.setVisibility(false)
};
ui.font.Message.prototype.moveY = function (yOffset) {
    yOffset = yOffset || 0;
    for (var i = 0, l = this.overlays.length; i < l; i++) {
        var overlay = this.overlays[i];
        overlay.options.position.y += yOffset;
        overlay.place()
    }
};
ui.font.Message.prototype.setVisibility = function (visibility) {
    for (var i = 0; i < this.overlays.length; i++) {
        this.overlays[i].setVisibility(visibility)
    }
};
ui.font.Message.prototype.destroy = function () {
    ges.removeResizeHandler(this.resizeHandler);
    for (var i = 0; i < this.overlays.length; i++) {
        this.overlays[i].destroy()
    }
};
ui.chat = {};
ui.chat.maxNumberMessages = 100;
ui.chat.init = function () {
    $chatMessages = $('.gefs-chat-messages');
    var $chatUserPopup = $('.gefs-chat-user-popup');
    $chatUserPopup.data('user', {});
    $chatMessages.on('click', '.gefs-chat-message .label', function () {
        var $this = $(this.parentNode);
        if ($this.attr('acid') != ges.userAccount.id) {
            var callsign = $this.attr('callsign');
            $chatUserPopup.find('.gefs-user-callsign').html(callsign);
            $chatUserPopup.data('user', {
                callsign: callsign,
                uid: $this.attr('uid'),
                acid: $this.attr('acid')
            });
            $chatUserPopup.show()
        }
    });
    $chatUserPopup.on('click', '.gefs-ignore-user', function () {
        var data = $chatUserPopup.data('user');
        $chatMessages.find('[acid=' + data.acid + ']').remove();
        $.ajax('/backend/accounts/api.php?action=muteplayer&offenderid=' + data.acid);
        ges.userAccount.muteList[data.acid] = 1;
        $chatUserPopup.hide()
    });
    $chatUserPopup.on('click', '.gefs-ban-user', function () {
        var data = $chatUserPopup.data('user');
        $chatMessages.find('[acid=' + data.acid + ']').addClass('gefs-strikethrough');
        $.ajax('/backend/accounts/api.php?action=ban&offenderid=' + data.acid);
        $chatUserPopup.hide()
    });
    $chatUserPopup.on('click', '.gefs-cancel', function () {
        $chatUserPopup.hide()
    })
};
ui.chat.publish = function (message) {
    if (!ges.preferences.chat) {
        return
    }
    var text = decodeURIComponent(message.msg);
    ui.chat.$container = ui.chat.$container || $('.gefs-chat-messages');
    var labelClass = '';
    if (message.acid == ges.userAccount.id) {
        labelClass = 'label-info'
    }
    ui.chat.$container.append('<div class="gefs-chat-message ' + message.cls + '" uid="' + message.uid + '" acid="' + message.acid + '" + callsign="' + message.cs + '"><b class="label ' + labelClass + '">' + message.cs + ':</b> ' + text + '</div>');
    ui.chat.$container.find('.gefs-chat-message').each(function (index) {
        if (index > ui.chat.maxNumberMessages) {
            $(this).remove()
        }
    })
};
ui.chat.hide = function () {
    $('.gefs-chat-section').hide()
};
ui.chat.show = function () {
    $('.gefs-chat-section').show()
};
ui.hud = {};
ui.hud.init = function () {
    ui.hud.stall = new Overlay({
        name: 'stall',
        url: PAGE_PATH + 'overlays/hud/stall.png',
        visibility: false,
        size: {
            x: 60,
            y: 20
        },
        anchor: {
            x: 0,
            y: 0
        },
        position: {
            x: 0,
            y: 30
        },
        rescale: false,
        alignment: {
            x: 'center',
            y: 'top'
        }
    });
    ui.hud.stallAlarmOn = false;
    ui.hud.autopilot = new Overlay({
        name: 'autopilot',
        url: PAGE_PATH + 'overlays/hud/autopilot.png',
        visibility: false,
        size: {
            x: 99,
            y: 22
        },
        anchor: {
            x: 0,
            y: 0
        },
        position: {
            x: 0,
            y: 30
        },
        rescale: false,
        alignment: {
            x: 'left',
            y: 'top'
        }
    });
    ges.addResizeHandler(function () {
        ui.hud.stall.resizeFromScreen();
        ui.hud.autopilot.resizeFromScreen()
    })
};
ui.hud.stallAlarm = function (status) {
    if (!ges.aircraft.groundContact) {
        if (status && !ui.hud.stallAlarmOn) {
            ui.hud.stall.setVisibility(true);
            ui.hud.stallAlarmOn = true;
            clearTimeout(ui.hud.stallAlarmTimeout);
            ui.hud.stallAlarmTimeout = setTimeout(function () {
                ui.hud.stall.setVisibility(false);
                ui.hud.stallAlarmOn = false
            }, 500)
        }
    }
};
ui.hud.autopilotIndicator = function (status) {
    ui.hud.autopilot.setVisibility(status)
};
ui.speedeeFlightPath = function () {
    var control_btn, control_text, flightpath_listener, pl_i = 0,
        pl_data = {}, pl_markers = [],
        flightpath;

    function flightpath_control(control_div, map) {
        control_div.style.padding = '5px';
        control_btn = document.createElement('DIV');
        control_btn.setAttribute('id', 'btn_flightpath');
        control_btn.className = 'gefs-flightpath-button';
        control_div.appendChild(control_btn);
        control_text = document.createElement('DIV');
        control_text.style.padding = '1px 6px';
        control_text.style.fontFamily = 'Arial,sans-serif';
        control_text.style.fontSize = '13px';
        control_text.innerHTML = 'Create Flight Path';
        control_btn.appendChild(control_text);
        google.maps.event.addDomListener(control_btn, 'click', function () {
            if (pl_i == 0) {
                control_btn.className = 'gefs-flightpath-button-active';
                flightpath_listener = google.maps.event.addListener(ui.map, 'click', function (e) {
                    if (pl_i < 2) {
                        pl_data[pl_i] = [e.latLng.lat(), e.latLng.lng()];
                        var pl_marker = new google.maps.Marker({
                            position: new google.maps.LatLng(e.latLng.lat(), e.latLng.lng()),
                            map: ui.map
                        });
                        pl_markers.push(pl_marker);
                        pl_i++
                    }
                    if (pl_i == 2) {
                        var flightpath_coords = [new google.maps.LatLng(pl_data[0][0], pl_data[0][1]), new google.maps.LatLng(pl_data[1][0], pl_data[1][1])];
                        flightpath = new google.maps.Polyline({
                            path: flightpath_coords,
                            strokeColor: "#ff0000",
                            strokeOpacity: 0.8,
                            strokeWeight: 2,
                            editable: true
                        });
                        flightpath.setMap(ui.map);
                        google.maps.event.removeListener(flightpath_listener);
                        control_btn.className = 'gefs-flightpath-button';
                        control_text.innerHTML = 'Remove Flight Path';
                        for (i in pl_markers) {
                            pl_markers[i].setMap(null)
                        }
                        pl_markers.length = 0
                    }
                })
            } else {
                if (flightpath) {
                    flightpath.setMap(null)
                }
                control_text.innerHTML = 'Create Flight Path';
                pl_i = 0
            }
        })
    }

    function initialize_flightpath() {
        var control_div_container = document.createElement('DIV');
        var flightpath_control_btn = new flightpath_control(control_div_container, ui.map);
        control_div_container.index = 1;
        ui.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(control_div_container)
    }
    initialize_flightpath()
};
ges.fx = ges.fx || {};
ges.fx.texture2url = {
    'smoke': PAGE_PATH + 'overlays/particules/smoke-light.png',
    'darkSmoke': PAGE_PATH + 'overlays/particules/smoke-dark.png',
    '1': PAGE_PATH + 'overlays/lights/yellowflare.png',
    '2': PAGE_PATH + 'overlays/lights/redflare.png',
    '3': PAGE_PATH + 'overlays/lights/greenflare.png',
    'white': PAGE_PATH + 'overlays/lights/whitelight.png',
    'red': PAGE_PATH + 'overlays/lights/redlight.png',
    'green': PAGE_PATH + 'overlays/lights/greenlight.png',
    'whitepapi': PAGE_PATH + 'overlays/lights/whitepapi.png',
    'redpapi': PAGE_PATH + 'overlays/lights/redpapi.png',
};
ges.fx.particules = {};
ges.fx.particuleEmitters = {};
ges.fx.init = function () {
    ges.fx.texture2style = {};
    for (var i in ges.fx.texture2url) {
        var icon = ge.createIcon('');
        icon.setHref(ges.fx.texture2url[i]);
        var style = ge.createStyle('');
        var iconStyle = style.getIconStyle();
        iconStyle.setIcon(icon);
        iconStyle.setScale(5);
        iconStyle.getHotSpot().set(0.5, ge.UNITS_FRACTION, 0, ge.UNITS_FRACTION);
        ges.fx.texture2style[i] = style
    }
};
ges.fx.update = function (dt) {
    for (var i in ges.fx.particuleEmitters) {
        ges.fx.particuleEmitters[i].update(dt)
    }
    for (var i in ges.fx.particules) {
        ges.fx.particules[i].update(dt)
    }
};
ges.fx.ParticuleEmitter = function (oOptions) {
    this._birth = new Date().getTime();
    this._id = this._birth + Math.random();
    this._lastEmission = this._birth;
    this._options = oOptions;
    ges.fx.particuleEmitters[this._id] = this;
    if (this._options['anchor']) {
        this._options['location'] = Object3D.utilities.getPointLla(this._options['anchor'], ges.aircraft.llaLocation)
    }
};
ges.fx.ParticuleEmitter.prototype = {
    'update': function () {
        var now = new Date().getTime();
        var age = now - this._birth;
        if (age > this._options['duration']) {
            this.destroy();
            return
        }
        var nbParticules = (now - this._lastEmission) * this._options['rate'];
        if (this._options['anchor']) {
            var newLocation = Object3D.utilities.getPointLla(this._options['anchor'], ges.aircraft.llaLocation);
            var locationDelta = V3.scale(V3.sub(newLocation, this._options['location']), 1 / nbParticules)
        }
        for (var i = 0; i < nbParticules; i++) {
            if (this._options['anchor']) {
                this._options['location'] = V3.add(this._options['location'], locationDelta)
            }
            new ges.fx.Particule(this._options);
            this._lastEmission = now
        }
    },
    'destroy': function () {
        delete ges.fx.particuleEmitters[this._id]
    }
};
ges.fx.Particule = function (oOptions) {
    this._options = oOptions;
    this._birth = new Date().getTime();
    this._id = this._birth + Math.random();
    ges.fx.particules[this._id] = this;
    oOptions['url'] = oOptions['url'] || ges.fx.texture2url[oOptions['texture']];
    oOptions['startOpacity'] = oOptions['startOpacity'] || 1;
    oOptions['endOpacity'] = oOptions['endOpacity'] || 1;
    oOptions['startScale'] = oOptions['startScale'] || 1;
    oOptions['endScale'] = oOptions['endScale'] || 1;
    this.currentLocation = V3.dup(oOptions['location']);
    oOptions['dtOpacity'] = (oOptions['endOpacity'] - oOptions['startOpacity']) / oOptions['life'];
    oOptions['dtScale'] = (oOptions['endScale'] - oOptions['startScale']) / oOptions['life'];
    this.create()
};
ges.fx.Particule.prototype = {
    'create': function () {
        this._placemark = ge.createPlacemark('');
        this._icon = ge.createIcon('');
        this._icon.setHref(this._options['url']);
        var style = ge.createStyle('');
        this._iconStyle = style.getIconStyle();
        this._iconStyle.setIcon(this._icon);
        this._placemark.setStyleSelector(style);
        this._point = ge.createPoint('');
        this._placemark.setGeometry(this._point);
        this._iconStyleColor = this._iconStyle.getColor();
        this._point.set(this.currentLocation[0], this.currentLocation[1], this.currentLocation[2], ge.ALTITUDE_ABSOLUTE, false, false);
        this._currentScale = this._options['startScale'];
        this._iconStyle.setScale(this._currentScale);
        this._iconStyle.setHeading(Math.random() * 360);
        this._currentOpacity = this._options['startOpacity'];
        this._iconStyleColor.set(ges.hexOpacity[parseInt(this._currentOpacity)]);
        ge.getFeatures().appendChild(this._placemark)
    },
    'update': function (dt) {
        var age = new Date().getTime() - this._birth;
        if (age > this._options.life) {
            this.destroy();
            return
        }
        if (this._options['dtOpacity']) {
            this._currentOpacity += this._options['dtOpacity'] * dt;
            if (this._currentOpacity > 0 && this._currentOpacity < 256) {
                this._iconStyleColor.set(ges.hexOpacity[parseInt(this._currentOpacity)])
            }
        }
        if (this._options['dtScale']) {
            this._currentScale += this._options['dtScale'] * dt;
            this._iconStyle.setScale(this._currentScale)
        }
        if (this._options['velocity'] && this._options['direction']) {
            if (this._options['velocityDamper']) {
                this._options['velocity'] *= (this._options['velocityDamper'] * dt)
            }
            this.currentLocation = V3.add(this.currentLocation, V3.scale(this._options['direction'], this._options['velocity']));
            this._point.setLatLngAlt(this.currentLocation[0], this.currentLocation[1], this.currentLocation[2])
        }
    },
    'destroy': function () {
        if (this._placemark) {
            ge.getFeatures().removeChild(this._placemark);
            this._placemark.release();
            this._placemark = null
        }
        delete ges.fx.particules[this._id]
    }
};
ges.fx.lastRunwayTestLocation = [0, 0];
ges.fx.nearRunways = {};
ges.fx.litRunways = {};
ges.fx.papis = {};
ges.fx.thresholdLightTemplate = [
    [
        [2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2], 1
    ],
    [
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 'length'
    ],
    [
        [1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1], 12
    ],
    [
        [3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3], 1
    ],
    [
        [0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0], 5
    ],
    [
        [0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0], 1
    ],
    [
        [0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0], 5
    ],
    [
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1], 1
    ],
    [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 5
    ]
];
ges.fx.templateCenter = [17, 3];
ges.fx.RunwayLights = function (location, heading, length, width) {
    this.on = false;
    this.placemarks = {};
    this.multiGeometries = {};
    length = length * feetToMeters;
    width = width * feetToMeters;
    this.localStepXm = width / 33;
    this.localStepYm = 50;
    this.heading = fixAngle(heading);
    var frame = M33.identity();
    frame = M33.rotationZ(frame, heading * degreesToRad);
    this.stepX = xy2ll(V2.scale(frame[0], this.localStepXm), location);
    this.stepY = xy2ll(V2.scale(frame[1], this.localStepYm), location);
    this.length = length;
    this.location = location;
    var papiStep = xy2ll(V2.scale(frame[0], 9), location);
    this.papiLocation = V2.add(location, xy2ll(V2.scale(frame[0], width / 2 + 15), location));
    this.papiLocation = V2.add(this.papiLocation, V2.scale(this.stepY, 5));
    this.addPapi(this.papiLocation, papiStep)
};
ges.fx.RunwayLights.prototype = {
    'turnOn': function () {
        if (this.on) {
            return
        }
        var startIndex = ges.fx.templateCenter[1] - 1;
        var startRow = ges.fx.thresholdLightTemplate[startIndex];
        var fixedPartOverflow = startRow[1];
        var x = 0,
            y = -fixedPartOverflow;
        var variableLengthLocation = V2.add(this.location, V2.scale(this.stepY, fixedPartOverflow));
        var lengthLeft = this.length - (this.localStepYm * fixedPartOverflow);
        var numberLightOnLength = lengthLeft / this.localStepYm;
        try {
            for (var i = startIndex, l = ges.fx.thresholdLightTemplate.length; i < l; i++) {
                var row = ges.fx.thresholdLightTemplate[i];
                var lights = row[0];
                for (var yi = y, yl = y + row[1]; yi < yl; yi++) {
                    this.addRow(this.location, lights, -yi);
                    y++
                }
            }
        } catch (e) {
            ges.debug.alert(e)
        }
        var lights = ges.fx.thresholdLightTemplate[1][0];
        for (var y = 0; y < numberLightOnLength; y++) {
            this.addRow(variableLengthLocation, lights, y)
        }
        lights = ges.fx.thresholdLightTemplate[0][0];
        this.addRow(variableLengthLocation, lights, y);
        this.on = true
    },
    'turnOff': function () {
        if (!this.on) {
            return
        }
        for (var i in this.placemarks) {
            ge.getFeatures().removeChild(this.placemarks[i]);
            this.placemarks[i].release();
            delete this.placemarks[i];
            delete this.multiGeometries[i]
        }
        this.on = false
    },
    'addRow': function (location, lights, y) {
        var lightLocY = V2.add(location, V2.scale(this.stepY, y));
        for (var x = 0, l = lights.length; x < l; x++) {
            var light = lights[x];
            if (light) {
                var lightLoc = V2.add(lightLocY, V3.scale(this.stepX, x - ges.fx.templateCenter[0]));
                this.addLight(lightLoc, light)
            }
        }
    },
    'addPapi': function (location, step) {
        this.papy = [];
        for (var i = 0; i < 4; i++) {
            location[2] = 0;
            this.papy[i] = {
                'white': ges.fx.createLight('whitepapi', location, 1, ge.ALTITUDE_RELATIVE_TO_GROUND),
                'red': ges.fx.createLight('redpapi', location, 1, ge.ALTITUDE_RELATIVE_TO_GROUND)
            };
            location = V2.add(location, step)
        }
        this.refreshPapi()
    },
    'refreshPapi': function () {
        var that = this;
        this.papiInterval = setInterval(function () {
            var collResult = ges.getGroundAltitude(that.papiLocation[0], that.papiLocation[1]);
            that.papiLocation[2] = collResult['location'][2];
            var relativeAicraftLla = [ges.aircraft.llaLocation[0], ges.aircraft.llaLocation[1], that.papiLocation[2]];
            var distance = V3.length(lla2xyz(V3.sub(relativeAicraftLla, that.papiLocation), that.papiLocation));
            var height = ges.aircraft.llaLocation[2] - that.papiLocation[2];
            var slope = Math.atan2(height, distance) * radToDegrees;
            var tooLow = (slope < 2);
            var slightlyLow = (slope < 2.5);
            var slightlyHigh = (slope < 3.5);
            var tooHigh = (slope < 4);
            that.papy[3].white.placemark.setVisibility(!tooLow);
            that.papy[3].red.placemark.setVisibility(tooLow);
            that.papy[2].white.placemark.setVisibility(!slightlyLow);
            that.papy[2].red.placemark.setVisibility(slightlyLow);
            that.papy[1].white.placemark.setVisibility(!slightlyHigh);
            that.papy[1].red.placemark.setVisibility(slightlyHigh);
            that.papy[0].white.placemark.setVisibility(!tooHigh);
            that.papy[0].red.placemark.setVisibility(tooHigh)
        }, 1000)
    },
    'addLight': function (location, light) {
        try {
            if (!this.multiGeometries[light]) {
                var uId = new Date().getTime() + Math.random() + '';
                var placemark = ge.createPlacemark(uId);
                placemark.setStyleSelector(ges.fx.texture2style[light]);
                placemark.setGeometry(ge.createMultiGeometry(''));
                ge.getFeatures().appendChild(placemark);
                this.multiGeometries[light] = placemark.getGeometry().getGeometries();
                this.placemarks[light] = placemark;
                ges.disablePlacemarkEvents(placemark)
            }
            var point = ge.createPoint('');
            point.set(location[0], location[1], 0, ge.ALTITUDE_CLAMP_TO_GROUND, false, false);
            this.multiGeometries[light].appendChild(point)
        } catch (e) {
            alert(e)
        }
    },
    'destroy': function () {
        for (var i in this.placemarks) {
            ge.getFeatures().removeChild(this.placemarks[i]);
            this.placemarks[i].release()
        }
        this.multiGeometries = {};
        this.placemarks = {};
        clearInterval(this.papiInterval);
        for (var i = 0; i < 4; i++) {
            this.papy[i].red.placemark.release();
            this.papy[i].white.placemark.release()
        }
    }
};
ges.fx.runway = {
    'runwayNumberLimit': 5,
    'refreshRate': 10000,
    'refreshDistanceThreshold': 0.1,
    'refresh': function () {
        google.earth.executeBatch(ge, function () {
            var location = ges.aircraft.llaLocation;
            clearInterval(ges.fx.runwayCheckTimeout);
            ges.fx.runwayCheckTimeout = setInterval(function () {
                ges.fx.runway.refresh()
            }, ges.fx.runway.refreshRate);
            if (!ges.isNight) {
                ges.fx.runway.turnAllOff()
            } else {
                ges.fx.runway.turnAllOn()
            }
            var deltaLocation = V2.length(V2.sub(location, ges.fx.lastRunwayTestLocation));
            if (deltaLocation < ges.fx.runway.refreshDistanceThreshold) {
                return
            }
            ges.fx.lastRunwayTestLocation = location;
            var nearRunways = ges.fx.runway.getNearRunways(location);
            ges.fx.runway.setRunwayDistance(location, nearRunways);
            nearRunways.sort(function (a, b) {
                return a.distance - b.distance
            });
            nearRunways = nearRunways.slice(0, ges.fx.runway.runwayNumberLimit);
            ges.fx.nearRunways = {};
            for (var i = 0, l = nearRunways.length; i < l; i++) {
                var runway = nearRunways[i];
                runway.id = runway.id || runway[0] + runway[1] + runway[3];
                ges.fx.nearRunways[runway.id] = runway;
                if (!ges.fx.litRunways[runway.id]) {
                    ges.fx.litRunways[runway.id] = new ges.fx.RunwayLights([runway[4], runway[5]], runway[3], runway[1], runway[2]);
                    if (ges.isNight) {
                        ges.fx.litRunways[runway.id].turnOn()
                    }
                }
            }
            for (var i in ges.fx.litRunways) {
                if (!ges.fx.nearRunways[i]) {
                    ges.fx.litRunways[i].destroy()
                }
            }
        })
    },
    'getNearRunways': function (location) {
        var lat = parseInt(location[0]);
        var lon = parseInt(location[1]);
        var nearRunways = majorRunwayGrid[lon][lat] || [];
        return nearRunways
    },
    'setRunwayDistance': function (location, runwayArray) {
        for (var i = 0, l = runwayArray.length; i < l; i++) {
            var runway = runwayArray[i];
            runway.distance = V2.length(ll2xy(V2.sub(location, [runway[4], runway[5]]), location))
        }
    },
    'turnAllOff': function () {
        for (var i in ges.fx.litRunways) {
            ges.fx.litRunways[i].turnOff()
        }
    },
    'turnAllOn': function () {
        for (var i in ges.fx.litRunways) {
            ges.fx.litRunways[i].turnOn()
        }
    }
};
ges.fx.createLight = function (light, location, scale, altitudeMode) {
    location = location || [0, 0, 0];
    scale = scale || 2;
    altitudeMode = altitudeMode || ge.ALTITUDE_ABSOLUTE;
    var icon = ge.createIcon('');
    icon.setHref(ges.fx.texture2url[light]);
    var style = ge.createStyle('');
    var iconStyle = style.getIconStyle();
    iconStyle.setIcon(icon);
    iconStyle.setScale(scale);
    iconStyle.getHotSpot().set(0.5, ge.UNITS_FRACTION, 0.5, ge.UNITS_FRACTION);
    var placemark = ge.createPlacemark('');
    placemark.setStyleSelector(style);
    var point = ge.createPoint('');
    placemark.setGeometry(point);
    point.set(location[0], location[1], location[2], altitudeMode, false, false);
    ge.getFeatures().appendChild(placemark);
    return {
        'placemark': placemark,
        'point': point
    }
};
var flight = window.flight || {};
flight.tick = function (dt, msDt) {
    var subSteps = 5;
    var subDt = dt / subSteps;
    var aircraft = ges.aircraft;
    var animationValue = aircraft.animationValue;
    aircraftSetup = aircraft.setup;
    var oldAltitude = aircraft.llaLocation[2];
    var airDensity = airDensitySL * Math.exp(-oldAltitude / 8000);
    var airTemp = clamp(20 - (oldAltitude / 100), -60, 0);
    aircraft.velocity = aircraft.rigidBody.v_linearVelocity;
    var groundVelocity = V3.length(aircraft.velocity);
    var frameVelocity = groundVelocity * dt;
    aircraft.airVelocity = V3.add(aircraft.velocity, weather.currentWindVector);
    aircraft.trueAirSpeed = V3.length(aircraft.airVelocity);
    var totalThrust = 0;
    var thrustDegradation = 1;
    var RPMDegradation = 1;
    var zeroThrustAltitude = aircraftSetup['zeroThrustAltitude'];
    var zeroRPMAltitude = aircraftSetup['zeroRPMAltitude'];
    if (zeroThrustAltitude) {
        thrustDegradation = clamp(zeroThrustAltitude - animationValue['altitude'], 0, zeroThrustAltitude) / zeroThrustAltitude
    } else if (zeroRPMAltitude) {
        RPMDegradation = clamp(zeroRPMAltitude - animationValue['altitude'], 0, zeroRPMAltitude) / zeroRPMAltitude
    }
    var engines = ges.aircraft.engines;
    var nbEngine = engines.length;
    for (var i = 0; i < nbEngine; i++) {
        var engine = engines[i];
        var inputValue = controls['throttle'];
        var bladePitchValue = 1;
        var animations = engine['animations'];
        if (animations) {
            for (var anim = 0; anim < animations.length; anim++) {
                var animation = animations[anim];
                switch (animation['type']) {
                case 'throttle':
                    inputValue = (animationValue[animation['value']] * animation['ratio']) + animation['offset'];
                    break;
                case 'pitch':
                    bladePitchValue = (animationValue[animation['value']] * animation['ratio']) + animation['offset'];
                    break
                }
            }
        }
        if (aircraft.engine.on) {
            var newRPM = (aircraftSetup['maxRPM'] - aircraftSetup['minRPM']) * inputValue + aircraftSetup['minRPM'];
            newRPM = newRPM * RPMDegradation;
            var delta = newRPM - engine.rpm;
            engine.rpm += delta * aircraftSetup['engineInertia'] * dt;
            if (ges.aircraft.setup['reverse']) {
                if (engine.rpm < aircraftSetup['minRPM'] && engine.rpm > 0 && !aircraft.engine.startup) {
                    engine.rpm = -aircraftSetup['minRPM']
                }
                if (engine.rpm > -aircraftSetup['minRPM'] && engine.rpm < 0 && !aircraft.engine.startup) {
                    engine.rpm = aircraftSetup['minRPM']
                }
            }
        } else {
            if (engine.rpm < 0.00001) {
                engine.rpm = 0
            } else {
                engine.rpm -= engine.rpm * aircraftSetup['engineInertia'] * dt
            }
        }
        var rpm = Math.abs(engine.rpm);
        var engineThrust = engine['thrust'];
        if (engine['afterBurnerThrust'] && inputValue > 0.9) {
            engineThrust = engine['afterBurnerThrust']
        }
        if (engine.rpm < 0) {
            if (engine['reverseThrust']) {
                engineThrust = -engine['reverseThrust']
            } else {
                engineThrust = 0
            }
        }
        var thrust = engineThrust * clamp(rpm - aircraftSetup['minRPM'], 0, aircraftSetup['maxRPM']) * aircraft.engine.invRPMRange;
        thrust = thrust * thrustDegradation;
        thrust = thrust * bladePitchValue;
        var forceDirection = engine.object3d.getWorldFrame()[engine['forceDirection']];
        aircraft.rigidBody.applyForce(V3.scale(forceDirection, thrust), engine['points']['forceSourcePoint'].worldPosition);
        totalThrust += thrust
    }
    if (nbEngine > 0) {
        aircraft.engine.rpm = parseInt(rpm)
    }
    for (var i = 0, l = ges.aircraft.buoys.length; i < l; i++) {
        var buoy = ges.aircraft.buoys[i];
        var controlInput = clamp(controls[buoy['controller']['name']], -1, 1);
        buoy.buoyancy += controlInput * buoy['inertia'] * dt;
        buoy.buoyancy -= buoy['coolingSpeed'] * buoy['inertia'] * dt;
        buoy.buoyancy = clamp(buoy.buoyancy, 0, 1);
        var buoyancyDegradation = 1;
        var zeroBuoyancyAltitude = aircraftSetup['zeroBuoyancyAltitude'];
        if (zeroBuoyancyAltitude) {
            buoyancyDegradation = clamp(zeroBuoyancyAltitude - oldAltitude, 0, zeroBuoyancyAltitude) / zeroBuoyancyAltitude
        }
        var buoyancyForce = buoy.buoyancy * buoy['displacement'] * buoyancyDegradation;
        aircraft.rigidBody.applyForce([0, 0, buoyancyForce], buoy['points']['forceSourcePoint'].worldPosition)
    }
    if (aircraft.trueAirSpeed > 0.01) {
        var veldir = V3.normalize(aircraft.airVelocity);
        var squareSpeed = aircraft.trueAirSpeed * aircraft.trueAirSpeed;
        var dragStrength = aircraftSetup['dragFactor'] * squareSpeed * airDensity;
        var drag = V3.scale(veldir, -dragStrength);
        aircraft.rigidBody.applyCentralForce(drag);
        for (var i = 0, l = aircraft.airfoils.length; i < l; i++) {
            var airfoil = aircraft.airfoils[i];
            var airfoilForceSourcePoint = airfoil['points']['forceSourcePoint'].worldPosition;
            var worldFrame = airfoil.object3d.getWorldFrame();
            var V3velocity = aircraft.rigidBody.getVelocityInLocalPoint(airfoilForceSourcePoint);
            if (airfoil.propwash) {
                var wash = -aircraft.engine.rpm * airfoil.propwash + aircraft.trueAirSpeed;
                if (wash > 0) {
                    wash = 0
                }
                V3velocity = V3.add(V3velocity, V3.scale(aircraft.object3d.worldRotation[1], -wash));
                ges.debug.watch('wash', wash)
            }
            V3velocity = V3.add(V3velocity, weather.currentWindVector);
            V3velocity = V3.sub(V3velocity, weather.thermals.currentVector);
            airfoil.velocity = V3.length(V3velocity);
            var velDirection = V3.normalize(V3velocity);
            var squaredVelocity = airfoil.velocity * airfoil.velocity;
            var incidenceNormal = worldFrame[airfoil['forceDirection']];
            var incidence = -V3.dot(incidenceNormal, velDirection);
            var airfoilAxis = V3.cross(incidenceNormal, velDirection);
            var liftDirection = V3.rotate(incidenceNormal, airfoilAxis, incidence);
            var lift;
            var drag;
            if (airfoil['area']) {
                var CL = incidence * twoPi;
                var CD = minDragCoef + dragConstant * CL * CL;
                drag = 0.5 * squaredVelocity * CD * airDensity;
                if (airfoil['stalls'] == true) {
                    var incidenceDeg = incidence * radToDegrees;
                    var absIncidenceDeg = Math.abs(incidenceDeg);
                    if (absIncidenceDeg > airfoil.stallIncidence) {
                        ui.hud.stallAlarm(true);
                        CL = CL * (1 - clamp((absIncidenceDeg - airfoil.stallIncidence), 0, airfoil.zeroLiftIncidence * 0.9) / airfoil.zeroLiftIncidence)
                    }
                }
                lift = airDensity * squaredVelocity * 0.5 * airfoil['area'] * CL
            } else {
                var liftFactor = airfoil['liftFactor'];
                var dragFactor = airfoil['dragFactor'];
                if (airfoil['stalls'] == true) {
                    var incidenceDeg = incidence * radToDegrees;
                    var absIncidenceDeg = Math.abs(incidenceDeg);
                    if (absIncidenceDeg > airfoil.stallIncidence) {
                        ui.hud.stallAlarm(true);
                        liftFactor = liftFactor * (0.9 - clamp((absIncidenceDeg - airfoil.stallIncidence), 0, airfoil.zeroLiftIncidence) / airfoil.zeroLiftIncidence)
                    }
                }
                var incidenceVel = incidence * squaredVelocity;
                lift = liftFactor * incidenceVel * airDensity;
                drag = dragFactor * Math.abs(incidenceVel) * airDensity
            }
            aircraft.rigidBody.applyForce(V3.scale(liftDirection, lift), airfoilForceSourcePoint);
            aircraft.rigidBody.applyForce(V3.scale(velDirection, -drag), airfoilForceSourcePoint)
        }
    }
    aircraft.rigidBody.applyCentralForce(aircraft.rigidBody.gravityForce);
    var buildingDistance = getBuildingCollision(frameVelocity);
    if (buildingDistance) {
        if (ges.preferences['crashDetection']) {
            aircraft.crashed = true
        }
        aircraft.rigidBody.applyCentralImpulse(V3.scale(aircraft.velocity, -aircraft.rigidBody.mass * 1.2))
    }
    aircraft.groundContact = false;
    var contacts = [];
    var maxPenetration = 0;
    var collResult = ges.getGroundAltitude(aircraft.llaLocation[0], aircraft.llaLocation[1]);
    var altAtAircraft = collResult['location'][2];
    if (ges.cautiousWithTerrain) {
        var deltaElevation = altAtAircraft - ges.groundElevation;
        if (Math.abs(deltaElevation) > 0.1) {
            aircraft.llaLocation[2] = aircraft.llaLocation[2] + deltaElevation
        }
    }
    ges.groundElevation = altAtAircraft;
    var offsetShadow = 0;
    if (collResult.isObject) {
        offsetShadow = collResult.location[2] - 0.25
    } else {
        if (altAtAircraft < -10) {
            offsetShadow = 0.1
        }
    }
    ges.relativeAltitude = aircraft.llaLocation[2] - ges.groundElevation;
    if (ges.relativeAltitude < ges.aircraft.boundingSphereRadius + frameVelocity) {
        var cps = ges.aircraft.collisionPoints;
        for (var i = 0, l = cps.length; i < l; i++) {
            var contact;
            var collisionPoint = cps[i];
            var part = collisionPoint.part;
            part.contact = null;
            var collisionLla = V3.add(aircraft.llaLocation, xyz2lla(collisionPoint.worldPosition, aircraft.llaLocation));
            var partVelocity = aircraft.rigidBody.getVelocityInLocalPoint(collisionPoint.worldPosition);
            if (part.suspension) {
                partVelocity[2] = partVelocity[2] - 10;
                var origin = part.points.suspensionOrigin;
                var collResult = ges.getCollisionFromRay(origin.worldPosition, V3.add(collisionPoint.worldPosition, V3.scale(partVelocity, dt)), null, collisionLla, collisionPoint.worldPosition, camera.collisionResult);
                var altAtPoint = collResult.location[2];
                var ray = V3.sub([origin.worldPosition[0], origin.worldPosition[1], origin.worldPosition[2] + aircraft.llaLocation[2]], [collisionPoint.worldPosition[0], collisionPoint.worldPosition[1], altAtPoint]);
                var rayOrientation = Math.sign(ray[2]);
                var rayLength = V3.length(ray) * rayOrientation;
                var compression = part.suspension.restLength - rayLength;
                if (compression > 0 && origin.worldPosition[2] > collisionPoint.worldPosition[2]) {
                    var normal = ges.getNormalFromCollision(collResult);
                    var partWorldFrame = part.object3d.getWorldFrame();
                    var dotNormal = V3.dot(normal, partWorldFrame[2]);
                    contact = {
                        'collisionPoint': collisionPoint,
                        'normal': normal,
                        'force': part.suspension.stiffness * compression,
                        'type': 'raycast',
                        'contactFwdDir': V3.cross(normal, partWorldFrame[0]),
                        'contactSideDir': V3.cross(normal, partWorldFrame[1])
                    };
                    if (compression >= part.suspension.hardPoint || dotNormal < 0.4) {
                        var deltaHeight = compression - part.suspension.hardPoint;
                        contact.type = 'hardpoint';
                        contact.penetration = deltaHeight;
                        maxPenetration = Math.max(maxPenetration, deltaHeight);
                        if (compression >= part.suspension.hardPoint) {
                            compression = part.suspension.hardPoint
                        }
                    }
                    part.contact = contact;
                    contacts.push(contact);
                    origin[2] = -compression;
                    if (part.suspension.motion == 'rotation') {
                        part.object3d[part.suspension.rotationMethod](part.rotation[1] + compression * part.suspension.motionFactor)
                    } else {
                        part.object3d.setPositionOffset([0, 0, compression])
                    }
                    part.suspension.rest = false
                } else {
                    if (!part.suspension.rest) {
                        if (part.suspension.motion == 'rotation') {
                            part.object3d.setRotationY(part.rotation[1])
                        } else {
                            part.object3d.setPositionOffset([0, 0, 0])
                        }
                        part.suspension.rest = true
                    }
                    if (part.angularVelocity > 0.01) {
                        part.oldAngularVelocity = part.angularVelocity;
                        part.angularVelocity *= 0.9
                    }
                }
            } else {
                var collResult = ges.getCollisionFromRay(V3.add(collisionPoint.worldPosition, [0, 0, 1]), V3.add(collisionPoint.worldPosition, V3.scale(partVelocity, dt)), null, collisionLla, collisionPoint.worldPosition, camera.collisionResult);
                var altAtPoint = collResult.location[2];
                var deltaHeight = altAtPoint - collisionLla[2];
                if (deltaHeight >= 0) {
                    var partWorldFrame = part.object3d.getWorldFrame();
                    var normal = ges.getNormalFromCollision(collResult);
                    maxPenetration = Math.max(maxPenetration, deltaHeight);
                    var contact = {
                        'collisionPoint': collisionPoint,
                        'normal': normal,
                        'penetration': deltaHeight,
                        'type': 'standard',
                        'contactFwdDir': V3.cross(normal, partWorldFrame[0]),
                        'contactSideDir': V3.cross(normal, partWorldFrame[1])
                    };
                    part.contact = contact;
                    contacts.push(contact)
                }
            }
        }
    }
    if (offsetShadow) {
        ges.aircraft.shadow.setAltitudeMode(ge.ALTITUDE_ABSOLUTE);
        ges.aircraft.shadow.setAltitude(offsetShadow)
    } else {
        ges.aircraft.shadow.setAltitudeMode(ge.ALTITUDE_CLAMP_TO_SEA_FLOOR);
        ges.aircraft.shadow.setAltitude(0)
    }
    var maxImpactVelocity = 0;
    if (contacts.length) {
        aircraft.groundContact = true;
        if (maxPenetration > 0.1) {
            aircraft.llaLocation[2] = aircraft.llaLocation[2] + maxPenetration
        }
        for (var j = 0; j < subSteps; j++) {
            aircraft.rigidBody.integrateVelocities(subDt);
            for (var p = 0, l = contacts.length; p < l; p++) {
                var contact = contacts[p];
                var collisionPoint = contact.collisionPoint;
                var part = collisionPoint.part;
                var contactProperties = collisionPoint.contactProperties;
                if (contact.penetration) {
                    var impulse = V3.scale(contact.normal, contact.penetration * ges.aircraft.rigidBody.mass);
                    aircraft.rigidBody.applyCentralImpulse(impulse, collisionPoint.worldPosition);
                    contact.penetration = null
                }
                var relVel = aircraft.rigidBody.getVelocityInLocalPoint(collisionPoint.worldPosition);
                var projVel = V3.dot(contact.normal, relVel);
                maxImpactVelocity = Math.max(maxImpactVelocity, Math.abs(projVel));
                var contactImpulseLength = 0;
                if (contact.type == 'raycast' || contact.type == 'hardpoint') {
                    var force = contact.force - (part.suspension.damping * projVel);
                    contactImpulseLength = force * aircraft.rigidBody.mass * subDt;
                    if (contactImpulseLength > 0) {
                        aircraft.rigidBody.applyImpulse(V3.scale(contact.normal, contactImpulseLength), collisionPoint.worldPosition)
                    }
                }
                if (contact.type == 'standard' || contact.type == 'hardpoint') {
                    if (projVel < 0) {
                        var jacobian = aircraft.rigidBody.computeJacobian(0, projVel, collisionPoint.worldPosition, contact.normal);
                        var impulse = V3.scale(contact.normal, jacobian);
                        impulse = V3.scale(impulse, contactProperties.damping);
                        aircraft.rigidBody.applyImpulse(impulse, collisionPoint.worldPosition);
                        contactImpulseLength = jacobian
                    }
                }
                if (contactImpulseLength > 0) {
                    var maxImpulse = contactImpulseLength * contactProperties.frictionCoef;
                    if (part['type'] == 'wheel') {
                        var contactFwdDir = contact.contactFwdDir;
                        var contactSideDir = contact.contactSideDir;
                        var sideProjVel = V3.dot(contactSideDir, relVel);
                        var forwardProjVel = V3.dot(contactFwdDir, relVel);
                        var sideImpulseJ = aircraft.rigidBody.computeJacobian(0, sideProjVel, collisionPoint.worldPosition, contactSideDir);
                        var forwardImpulseJ = aircraft.rigidBody.computeJacobian(0, forwardProjVel, collisionPoint.worldPosition, contactFwdDir);
                        var sideImpulseLength = Math.abs(sideImpulseJ);
                        var forwardImpulseLength = Math.abs(forwardImpulseJ);
                        var sideFriction = 1;
                        var forwardFriction = 1;
                        if (Math.abs(forwardProjVel) > contactProperties.lockSpeed) {
                            forwardFriction = contactProperties.rollingFriction
                        }
                        var brakesController = part['brakesController'];
                        var brakingDamping = aircraft.setup.brakeDamping || 3;
                        if (brakesController) {
                            forwardFriction = (maxImpulse / forwardImpulseLength * contactProperties.frictionCoef * brakingDamping) * clamp(animationValue[brakesController] * part['brakesControllerRatio'], 0, 1)
                        }
                        if (aircraft.brakesOn) {
                            forwardFriction = clamp(maxImpulse / (forwardImpulseLength * contactProperties.frictionCoef * brakingDamping), 0, 1);
                        }
                        var sliding = false;
                        if (sideImpulseLength > maxImpulse) {
                            sliding = true;
                            var ratio = maxImpulse / (sideImpulseLength * sideImpulseLength);
                            sideFriction = clamp(ratio, contactProperties.dynamicFriction, 1)
                        }
                        aircraft.rigidBody.applyImpulse(V3.scale(contactSideDir, sideImpulseJ * sideFriction), collisionPoint.worldPosition);
                        aircraft.rigidBody.applyImpulse(V3.scale(contactFwdDir, forwardImpulseJ * forwardFriction), collisionPoint.worldPosition)
                    } else {
                        var tangentVel = V3.sub(relVel, V3.scale(contact.normal, projVel));
                        var velDir = V3.normalize(tangentVel);
                        var tangentProjVel = V3.length(tangentVel);
                        if (tangentProjVel) {
                            var impulseJ = aircraft.rigidBody.computeJacobian(0, tangentProjVel, collisionPoint.worldPosition, velDir);
                            var impulseLength = Math.abs(impulseJ);
                            var friction = 1;
                            if (impulseLength > maxImpulse) {
                                sliding = true;
                                var ratio = maxImpulse / (impulseLength * impulseLength);
                                friction = clamp(ratio, contactProperties.dynamicFriction, 1)
                            }
                            aircraft.rigidBody.applyImpulse(V3.scale(velDir, friction * impulseJ), collisionPoint.worldPosition)
                        }
                    }
                }
            }
        }
    } else {
        aircraft.rigidBody.integrateVelocities(dt)
    } if (flight.recorder.playing == true) {
        flight.recorder.stepInterpolation()
    } else {
        aircraft.rigidBody.integrateTransform(dt);
        aircraft.placeParts();
        if (flight.recorder.recording == true) {
            flight.recorder.record()
        }
        if (ges.preferences['crashDetection']) {
            if (maxImpactVelocity > 10) {
                aircraft.crashed = true
            }
            if (!aircraft.crashNotified && aircraft.crashed) {
                aircraft.crashNotified = true;
                aircraft.crash()
            }
        }
    }
    aircraft.htr = aircraft.object3d.htr;
    var maxAngularVRatio = 0;
    for (var i = 0, l = aircraft.wheels.length; i < l; i++) {
        var wheel = aircraft.wheels[i];
        if (wheel.contact) {
            wheel.oldAngularVelocity = wheel.angularVelocity;
            wheel.angularVelocity = groundVelocity / wheel.radius;
            var angularVRatio = wheel.angularVelocity / wheel.oldAngularVelocity;
            if (groundVelocity > 30 && angularVRatio > 40) {
                new ges.fx.ParticuleEmitter({
                    'anchor': wheel.contact.collisionPoint,
                    'duration': 200,
                    'rate': 0.05,
                    'life': 2000,
                    'startScale': 0.5,
                    'endScale': 4,
                    'startOpacity': 100,
                    'endOpacity': 1,
                    'texture': 'smoke'
                })
            }
            maxAngularVRatio = Math.max(maxAngularVRatio, angularVRatio)
        }
        var rotationAnimName = wheel.name + 'Rotation';
        var oldRotationValue = animationValue[rotationAnimName] || 0;
        animationValue[rotationAnimName] = fixAngle360(oldRotationValue + wheel.angularVelocity)
    }
    animationValue['maxAngularVRatio'] = maxAngularVRatio;
    var feet = aircraft.llaLocation[2] * metersToFeet;
    var feetPerMinute = (feet - oldAltitude * metersToFeet) * 60 / dt;
    var relativeWind = fixAngle(weather.currentWindDirection - aircraft.htr[0] + 180);
    var propAngularSpeed = aircraft.engine.rpm * aircraftSetup.RPM2PropAS * dt;
    animationValue['enginesOn'] = ges.aircraft.engine.on;
    animationValue['prop'] = fixAngle360(animationValue['prop'] + propAngularSpeed);
    animationValue['thrust'] = totalThrust;
    animationValue['rpm'] = aircraft.engine.rpm;
    animationValue['throttle'] = controls['throttle'];
    animationValue['pitch'] = controls['pitch'];
    animationValue['roll'] = controls['roll'];
    animationValue['yaw'] = controls['yaw'];
    animationValue['trim'] = controls.elevatorTrim;
    animationValue['brakes'] = ges.aircraft.brakesOn ? 1 : 0;
    animationValue['gearPosition'] = controls.gear.position;
    animationValue['gearTarget'] = controls.gear.target;
    animationValue['flapsPosition'] = controls.flaps.position;
    animationValue['flapsTarget'] = controls.flaps.target;
    animationValue['airbrakesPosition'] = controls.airbrakes.position;
    animationValue['airbrakesTarget'] = controls.airbrakes.target;
    animationValue['resultForce'] = M33.transform(M33.transpose(aircraft.object3d._rotation), aircraft.rigidBody.v_resultForce);
    animationValue['forceX'] = animationValue['resultForce'][0];
    animationValue['forceY'] = animationValue['resultForce'][1];
    animationValue['forceZ'] = animationValue['resultForce'][2];
    if (aircraft.groundContact) {
        animationValue['rollingSpeed'] = groundVelocity
    } else {
        animationValue['rollingSpeed'] = 0
    }
    animationValue['ktas'] = aircraft.trueAirSpeed * 1.94;
    animationValue['kias'] = animationValue['ktas'];
    var mach = aircraft.trueAirSpeed / (331.3 + (0.606 * airTemp));
    animationValue['mach'] = mach;
    animationValue['altitude'] = feet;
    animationValue['climbrate'] = feetPerMinute;
    animationValue['heading'] = aircraft.htr[0];
    animationValue['heading360'] = fixAngle360(aircraft.htr[0]);
    animationValue['atilt'] = aircraft.htr[1];
    ges.debug.watch('atilt', animationValue['atilt']);
    animationValue['aroll'] = aircraft.htr[2];
    animationValue['relativeWind'] = relativeWind;
    animationValue['windSpeed'] = weather.currentWindSpeed;
    animationValue['view'] = camera.currentModeName;
    if (camera.currentModeName == 'free' || camera.currentModeName == 'chase') {
        var camDistance = V3.length(lla2xyz(V3.sub(camera.lla, aircraft.llaLocation), camera.lla));
        animationValue['cameraAircraftSpeed'] = (animationValue['cameraAircraftDistance'] - camDistance) / dt;
        animationValue['cameraAircraftDistance'] = camDistance
    } else {
        animationValue['cameraAircraftSpeed'] = 0;
        animationValue['cameraAircraftDistance'] = 0
    }
};
flight.recorder = {
    'tape': [],
    'rate': 5,
    'invRate': 1 / 5,
    'maxLength': 1000,
    'recordingFrame': 0,
    'recording': true,
    'playing': false,
    'paused': false
};
flight.recorder.record = function () {
    if (flight.recorder.recordingFrame < flight.recorder.rate) {
        flight.recorder.recordingFrame++
    } else {
        var aircraft = ges.aircraft;
        var lla = aircraft.llaLocation;
        var htr = aircraft.htr;
        var newRecord = {
            'coord': [lla[0], lla[1], lla[2], htr[0], htr[1], htr[2]],
            'controls': [controls['pitch'], controls['roll'], controls['yaw'], controls['throttle'], controls.gear.position, controls.flaps.position, controls.airbrakes.position, ges.aircraft.trueAirSpeed],
            'state': [ges.aircraft.engine.on, ges.aircraft.rigidBody.getLinearVelocity(), ges.aircraft.rigidBody.getAngularVelocity()]
        };
        flight.recorder.tape.push(newRecord);
        if (flight.recorder.tape.length > flight.recorder.maxLength) {
            flight.recorder.tape.shift()
        }
        flight.recorder.recordingFrame = 0
    }
};
flight.recorder.clear = function () {
    flight.recorder.tape = []
};
flight.recorder.startRecording = function () {
    if (!flight.recorder.playing) {
        flight.recorder.recording = true
    }
};
flight.recorder.stopRecording = function () {
    flight.recorder.recording = false
};
flight.recorder.enterPlayback = function () {
    ges.aircraft.rigidBody.saveState();
    flight.recorder.stopRecording();
    $('.gefs-recordPlayer-slider').attr('max', flight.recorder.tape.length - 2);
    flight.recorder.setStep(0);
    $('.gefs-recordPlayer-slider').on('userchange', function (event, value) {
        flight.recorder.setStep(parseInt(value), true)
    }).on('dragstart', flight.recorder.pausePlayback).on('dragend', flight.recorder.unpausePlayback);
    $('.gefs-ui .gefs-f-standard').hide();
    $('.gefs-ui .gefs-f-recordPlayer').show();
    flight.recorder.playing = true
};
flight.recorder.exitPlayback = function () {
    ges.doPause();
    flight.recorder.playing = false;
    ges.aircraft.rigidBody.clearForces();
    flight.recorder.setStep(flight.recorder.currentStep);
    ges.aircraft.object3d.resetRotationMatrix();
    $('.gefs-ui .gefs-f-recordPlayer').hide();
    $('.gefs-ui .gefs-f-standard').show();
    flight.recorder.startRecording()
};
flight.recorder.pausePlayback = function () {
    flight.recorder.paused = true
};
flight.recorder.unpausePlayback = function () {
    flight.recorder.paused = false
};
flight.recorder.startPlayback = function () {
    flight.recorder.playing = true;
    ges.undoPause()
};
flight.recorder.setStep = function (step, fromSlider) {
    if (step > flight.recorder.tape.length - 2) {
        step = flight.recorder.tape.length - 2;
        ges.doPause()
    }
    if (step < 0) {
        step = 0
    }
    if (!flight.recorder.tape[step]) {
        flight.recorder.pausePlayback();
        return false
    }
    flight.recorder.currentStep = step;
    flight.recorder.currentFrame = 0;
    flight.recorder.liveRecord = $.extend({}, flight.recorder.tape[step]);
    flight.recorder.setAircraft(flight.recorder.liveRecord);
    if (fromSlider) {
        camera.update(0)
    } else {
        $('.gefs-recordPlayer-slider').slider('value', step)
    }
    flight.recorder.setDeltaRecord(step);
    return true
};
flight.recorder.setDeltaRecord = function (step) {
    var tape = flight.recorder.tape;
    var currentRecord = tape[step];
    var nextRecord = tape[step + 1];
    var deltaCoord = M3.sub(nextRecord['coord'], currentRecord['coord']);
    deltaCoord[3] = fixAngle(deltaCoord[3]);
    deltaCoord[4] = fixAngle(deltaCoord[4]);
    deltaCoord[5] = fixAngle(deltaCoord[5]);
    var deltaControls = M3.sub(nextRecord['controls'], currentRecord['controls']);
    deltaCoord = M3.scale(deltaCoord, flight.recorder.invRate);
    deltaControls = M3.scale(deltaControls, flight.recorder.invRate);
    flight.recorder.deltaRecord = {
        'coord': deltaCoord,
        'controls': deltaControls
    }
};
flight.recorder.stepInterpolation = function () {
    if (!flight.recorder.paused) {
        if (flight.recorder.currentFrame >= flight.recorder.rate - 1) {
            flight.recorder.setStep(flight.recorder.currentStep + 1)
        } else {
            flight.recorder.currentFrame++;
            var liveRecord = flight.recorder.liveRecord;
            liveRecord['coord'] = M3.add(liveRecord['coord'], flight.recorder.deltaRecord['coord']);
            liveRecord['coord'][3] = fixAngle(liveRecord['coord'][3]);
            liveRecord['coord'][4] = fixAngle(liveRecord['coord'][4]);
            liveRecord['coord'][5] = fixAngle(liveRecord['coord'][5]);
            liveRecord['controls'] = M3.add(liveRecord['controls'], flight.recorder.deltaRecord['controls']);
            flight.recorder.setAircraft(liveRecord)
        }
    }
};
flight.recorder.setAircraft = function (record) {
    var coord = record['coord'];
    var lla = [coord[0], coord[1], coord[2]];
    var htr = [coord[3], coord[4], coord[5]];
    ges.aircraft.place(lla, htr);
    var recordControls = record['controls'];
    controls['pitch'] = recordControls[0];
    controls['roll'] = recordControls[1];
    controls['yaw'] = recordControls[2];
    controls['throttle'] = recordControls[3];
    controls.gear.position = recordControls[4];
    controls.flaps.position = recordControls[5];
    controls.airbrakes.position = recordControls[6];
    ges.aircraft.trueAirSpeed = recordControls[7];
    if (record['state']) {
        ges.aircraft.engine.on = record['state'][0];
        ges.aircraft.rigidBody.setLinearVelocity(record['state'][1]);
        ges.aircraft.rigidBody.setAngularVelocity(record['state'][2])
    }
};
var physics = window.physics || {};

function rigidBody() {
    this.mass = 0;
    this.s_inverseMass = 0;
    this.reset()
};
rigidBody.prototype.reset = function () {
    this.v_linearVelocity = [0, 0, 0];
    this.v_angularVelocity = [0, 0, 0];
    this.v_totalForce = [0, 0, 0];
    this.v_totalTorque = [0, 0, 0];
    this.v_prevLinearVelocity = [0, 0, 0];
    this.v_prevTotalTorque = [0, 0, 0];
    this.v_resultForce = [0, 0, 0];
    this.v_resultTorque = [0, 0, 0]
};
rigidBody.prototype.setMassProps = function (mass, tensorFactor) {
    tensorFactor = tensorFactor || 0.1;
    if (!$.isArray(tensorFactor)) {
        tensorFactor = [tensorFactor, tensorFactor, tensorFactor]
    }
    this.mass = mass;
    this.s_inverseMass = 1.0 / mass;
    this.v_localInvInertia = [tensorFactor[0] / mass, tensorFactor[1] / mass, tensorFactor[2] / mass];
    this.m_localInvInertiaTensor = [
        [this.v_localInvInertia[0], 0, 0],
        [0, this.v_localInvInertia[1], 0],
        [0, 0, this.v_localInvInertia[2]]
    ];
    this.m_worldInvInertiaTensor = M33.dup(this.m_localInvInertiaTensor);
    this.gravityForce = [0, 0, -GRAVITY * mass]
};
rigidBody.prototype.getLinearVelocity = function () {
    return this.v_linearVelocity
};
rigidBody.prototype.getAngularVelocity = function () {
    return this.v_angularVelocity
};
rigidBody.prototype.setLinearVelocity = function (linearVelocity) {
    this.v_linearVelocity = linearVelocity
};
rigidBody.prototype.setAngularVelocity = function (angularVelocity) {
    this.v_angularVelocity = angularVelocity
};
rigidBody.prototype.getVelocityInLocalPoint = function (v_rel_pos) {
    return V3.add(this.v_linearVelocity, V3.cross(v_rel_pos, this.v_angularVelocity))
};
rigidBody.prototype.getForceInLocalPoint = function (v_rel_pos) {
    var force = V3.add(this.v_totalForce, V3.cross(v_rel_pos, this.v_totalTorque));
    return V3.add(force, V3.scale(this.getVelocityInLocalPoint(v_rel_pos), this.mass))
};
rigidBody.prototype.applyCentralForce = function (v_force) {
    this.v_totalForce = V3.add(this.v_totalForce, v_force)
};
rigidBody.prototype.applyTorque = function (v_torque) {
    this.v_totalTorque = V3.add(this.v_totalTorque, v_torque)
};
rigidBody.prototype.applyForce = function (v_force, v_rel_pos) {
    this.applyCentralForce(v_force);
    this.applyTorque(V3.cross(v_force, v_rel_pos))
};
rigidBody.prototype.applyCentralImpulse = function (v_impulse) {
    this.v_linearVelocity = V3.add(this.v_linearVelocity, V3.scale(v_impulse, this.s_inverseMass))
};
rigidBody.prototype.applyTorqueImpulse = function (v_torque) {
    this.v_angularVelocity = V3.add(this.v_angularVelocity, M33.multiplyV(this.m_worldInvInertiaTensor, v_torque))
};
rigidBody.prototype.applyImpulse = function (v_impulse, v_rel_pos) {
    this.applyCentralImpulse(v_impulse);
    this.applyTorqueImpulse(V3.cross(v_impulse, v_rel_pos))
};
rigidBody.prototype.computeJacobian = function (e, projVel, v_rel_pos, normal) {
    var numerator = -(1 + e) * projVel;
    var denom1 = this.s_inverseMass;
    var denom2 = V3.dot(normal, V3.cross(v_rel_pos, M33.multiplyV(this.m_worldInvInertiaTensor, V3.cross(normal, v_rel_pos))));
    return numerator / (denom1 + denom2)
};
rigidBody.prototype.computeImpulse = function (e, projVel, v_rel_pos, normal) {
    var j = this.computeJacobian(e, projVel, v_rel_pos, normal);
    return V3.scale(normal, j)
};
rigidBody.prototype.integrateVelocities = function (s_step) {
    this.v_linearVelocity = V3.add(this.v_linearVelocity, V3.scale(this.v_totalForce, this.s_inverseMass * s_step));
    this.v_angularVelocity = V3.add(this.v_angularVelocity, M33.multiplyV(this.m_worldInvInertiaTensor, V3.scale(this.v_totalTorque, s_step)))
};
rigidBody.prototype.integrateTransform = function (s_step) {
    var aircraft = ges.aircraft;
    var llaTranslation = xyz2lla(V3.scale(this.v_linearVelocity, s_step), aircraft.llaLocation);
    aircraft.llaLocation = V3.add(aircraft.llaLocation, llaTranslation);
    var rot = V3.scale(this.v_angularVelocity, s_step);
    rot = M33.transformByTranspose(aircraft.object3d._rotation, rot);
    aircraft.object3d.rotate(rot);
    this.v_resultForce = V3.sub(this.v_linearVelocity, this.v_prevLinearVelocity);
    this.v_resultTorque = V3.sub(this.v_angularVelocity, this.v_prevTotalTorque);
    this.v_prevLinearVelocity = V3.dup(this.v_linearVelocity);
    this.v_prevTotalTorque = V3.dup(this.v_angularVelocity);
    this.clearForces()
};
setInterval(function () {
    if (ges.aircraft && ges.aircraft.object3d) {
        try {
            ges.aircraft.object3d.resetRotationMatrix()
        } catch (e) {}
    }
}, 10000);
rigidBody.prototype.clearForces = function () {
    this.v_totalForce = [0, 0, 0];
    this.v_totalTorque = [0, 0, 0]
};
rigidBody.prototype.saveState = function () {
    this.savedLinearVelocity = V3.dup(this.v_linearVelocity);
    this.savedAngularVelocity = V3.dup(this.v_angularVelocity)
};
rigidBody.prototype.restoreState = function () {
    this.clearForces();
    this.v_linearVelocity = V3.dup(this.savedLinearVelocity);
    this.v_angularVelocity = V3.dup(this.savedAngularVelocity)
};

function Aircraft() {
    ges.aircraft = this;
    this.engine = {};
    this.engine.rpm = 0;
    this.engine.on = true;
    this.brakesOn = false;
    this.groundContact = true;
    this.llaLocation = [0, 0, 0];
    this.relativeAltitude = 0;
    this.htr = [0, 0, 0];
    this.animationValue = {
        'altitude': 0,
        'prop': 0,
        'throttle': 0,
        'yaw': 0,
        'pitch': 0,
        'roll': 0,
        'atilt': 0,
        'aroll': 0,
        'night': 0,
        'cameraAircraftDistance': 0
    };
    this.reset()
};
Aircraft.prototype.getCurrentCoordinates = function () {
    var currentCoordinates = [];
    currentCoordinates[0] = this.llaLocation[0];
    currentCoordinates[1] = this.llaLocation[1];
    currentCoordinates[2] = this.llaLocation[2] - ges.groundElevation;
    if (currentCoordinates[2] < 0.5 || this.groundContact) {
        this.groundContact = true;
        currentCoordinates[2] = 0
    }
    currentCoordinates[3] = ges.aircraft.htr[0];
    return currentCoordinates
};
Aircraft.prototype.change = function (aircraftName, justReload) {
    ges.doPause(true);
    var that = this;
    google.earth.executeBatch(ge, function () {
        that.load(aircraftName, that.getCurrentCoordinates(), justReload);
        that = null
    });
};
Aircraft.prototype.load = function (aircraftName, coordinates, bJustReload) {
    var href;
    if (aircraftName.split('/').length > 1) {
        href = PAGE_PATH + aircraftName + '/aircraft.kml?killcache=' + ges.killCache
    } else {
        if (ges.PRODUCTION) {
            href = PAGE_PATH + 'models/aircrafts/' + aircraftName + '/' + aircraftName + '.kmz?killcache=' + ges.killCache
        } else {
            href = PAGE_PATH + 'models/aircrafts/' + aircraftName + '/' + aircraftName + '-kmz/aircraft.kml?killcache=' + ges.killCache
        }
		
		href = document.URL+'models/su357.kmz';
		//alert(href);
    }
    this._cockpitLoaded = false;
    google.earth.fetchKml(ge, href, function (kmlObject) {
        setTimeout(function () {
            if (kmlObject) {
                try {
                    ges.aircraft.setup = eval(kmlObject.getDescription())[0]
                } catch (e) {
                    ges.debug.alert('Error loading aircraft: ' + e);
                    ges.undoPause()
                }
                ges.aircraft.controllers = {
                    'pitch': {
                        'recenter': false,
                        'sensitivity': 1,
                        'ratio': 1
                    },
                    'roll': {
                        'recenter': true,
                        'sensitivity': 1,
                        'ratio': 1
                    },
                    'yaw': {
                        'recenter': true,
                        'sensitivity': 1,
                        'ratio': 1
                    }
                };
                ges.aircraft.unloadAircraft();
                ges.aircraft.name = aircraftName;
                ges.aircraft.parts = {};
                ges.aircraft.airfoils = [];
                ges.aircraft.engines = [];
                ges.aircraft.buoys = [];
                ges.aircraft.wheels = [];
                ges.aircraft.collisionPoints = [];
                ges.aircraft.lights = [];
                ges.aircraft.setup.scale = ges.aircraft.setup.scale || 1;
                ges.aircraft.setup.startupTime = ges.aircraft.setup.startupTime || 0;
                ges.aircraft.setup.com = ges.aircraft.setup.com || [0, 0, 0];
                ges.aircraft.setup.startAltitude = ges.aircraft.setup.startAltitude * ges.aircraft.setup.scale;
                ges.aircraft.setup.cockpitScaleFix = ges.aircraft.setup.cockpitScaleFix || 1;
                for (var i in ges.aircraft.setup.cameras) {
                    var definition = ges.aircraft.setup.cameras[i];
                    definition.distance = definition.distance * ges.aircraft.setup.scale;
                    if (definition.position) {
                        definition.position = V3.scale(definition.position, ges.aircraft.setup.scale)
                    }
                }
                ges.aircraft.placemarks = {};
                ges.aircraft.kmlObjects = [];
                var root = {
                    'name': 'root',
                    'position': ges.aircraft.setup.com || [0, 0, 0]
                };
                ges.aircraft.object3d = new Object3D(root);
                ges.aircraft.addParts(ges.aircraft.setup.parts, kmlObject, ges.aircraft.setup.scale);
                ges.aircraft.boundingSphereRadius = 0;
                for (var i = 0, l = ges.aircraft.collisionPoints.length; i < l; i++) {
                    ges.aircraft.boundingSphereRadius = Math.max(ges.aircraft.boundingSphereRadius, V3.length(ges.aircraft.collisionPoints[i]))
                }
                ges.aircraft.boundingSphereRadius *= 1.5;
                for (var i in ges.aircraft.setup.contactProperties) {
                    var contact = ges.aircraft.setup.contactProperties[i];
                    contact.lockSpeed = contact.lockSpeed || 0.01
                }
                ges.aircraft.object3d.render({
                    'llaCoordinates': ges.aircraft.llaLocation,
                    'collisions': true
                });
                for (var i = 0; i < ges.aircraft.setup.parts.length; i++) {
                    var part = ges.aircraft.setup.parts[i];
                    if (part.suspension) {
                        part.suspension.origin = [part.collisionPoints[0][0], part.collisionPoints[0][1], 0];
                        var suspensionHeight = -part.collisionPoints[0][2];
                        part.suspension.restLength = suspensionHeight;
                        if (part.suspension.motion == 'rotation') {
                            var rotationRadius = V3.length(part.collisionPoints[0]);
                            var restAngle = Math.atan2(part.collisionPoints[0][0] / rotationRadius, part.collisionPoints[0][2] / rotationRadius);
                            var deltaAngle;
                            if (restAngle < 0) {
                                deltaAngle = restAngle + halfPi
                            } else {
                                deltaAngle = restAngle - halfPi
                            }
                            part.suspension.motionFactor = deltaAngle / part.suspension.restLength;
                            var axis = part.suspension.axis || 'Y';
                            part.suspension.rotationMethod = 'setRotation' + axis
                        }
                        part.suspension.hardPoint = part.suspension.hardPoint || part.suspension.restLength * 0.5;
                        part['points']['origin'] = V3.dup(part.suspension.origin);
                        part['points']['suspensionOrigin'] = V3.dup(part.suspension.origin)
                    }
                }
                if (!ges.aircraft.rigidBody) {
                    ges.aircraft.rigidBody = new rigidBody()
                }
                ges.aircraft.rigidBody.setMassProps(ges.aircraft.setup['mass'], ges.aircraft.setup['tensorFactor']);
                ges.aircraft.setup.RPM2PropAS = ges.aircraft.setup.driveRatio / 60 * 360;
                ges.aircraft.engine.invRPMRange = 1 / (ges.aircraft.setup['maxRPM'] - ges.aircraft.setup['minRPM']);
                ges.aircraft.shadow = ge.createGroundOverlay('');
                ges.aircraft.shadow.setIcon(ge.createIcon(''));
                ges.aircraft.shadow.setLatLonBox(ge.createLatLonBox(''));
                ges.aircraft.shadow.setAltitudeMode(ge.ALTITUDE_CLAMP_TO_SEA_FLOOR);
                ges.aircraft.shadow.getIcon().setHref(ges.aircraft.setup.shadowURL);
                ges.aircraft.shadow.setVisibility(true);
                ge.getFeatures().appendChild(ges.aircraft.shadow);
                ges.aircraft.shadowBox = ges.aircraft.setup['shadowBox'];
                ges.aircraft.shadowBox[2] = 0;
                ges.aircraft.shadowBox = V3.scale(ges.aircraft.shadowBox, ges.aircraft.setup.scale);
                instruments.init(ges.aircraft.setup['instruments']);
                audio.init(ges.aircraft.setup.soundSet, ges.aircraft.setup['sounds']);
                ges.preferences['aircraft'] = aircraftName;
                if (!ges.aircraft.setup.autopilot) {
                    controls.autopilot.turnOff()
                }
                ges.flyTo(coordinates, bJustReload)
            } else {
                alert('Error loading aircraft file');
                ges.undoPause()
            }
        }, 0)
    })
};
Aircraft.prototype.loadCockpit = function () {
    if (this._cockpitLoaded) {
        return
    }
    var aircraftName = ges.preferences['aircraft'];
    var href;
    if (aircraftName.split('/').length > 1) {
        href = PAGE_PATH + aircraftName + '/cockpit.kml?killcache=' + ges.killCache
    } else {
        if (ges.PRODUCTION) {
            href = PAGE_PATH + 'models/aircrafts/' + aircraftName + '/cockpit.kmz?killcache=' + ges.killCache
        } else {
            href = PAGE_PATH + 'models/aircrafts/' + aircraftName + '/' + aircraftName + '-kmz/cockpit/cockpit.kml?killcache=' + ges.killCache
        }
    }
    google.earth.fetchKml(ge, href, function (kmlObject) {
        setTimeout(function () {
            if (kmlObject) {
                ges.aircraft._cockpitLoaded = true;
                try {
                    var cockpitSetup = eval(kmlObject.getDescription())[0]
                } catch (e) {
                    ges.debug.alert('Error loading aircraft: ' + e);
                    ges.undoPause()
                }
                ges.aircraft.addParts(cockpitSetup.parts, kmlObject, cockpitSetup.scale)
            }
        })
    })
};
Aircraft.prototype.addParts = function (parts, kmlObject, scale) {
    scale = scale || 1;
    ges.aircraft.kmlObjects.push(kmlObject);
    var nodes = kmlObject.getFeatures().getChildNodes().getLength();
    for (var i = 0; i < nodes; i++) {
        var placemark = kmlObject.getFeatures().getChildNodes().item(i);
        var name = placemark.getName();
        ges.aircraft.placemarks[name] = placemark
    }
    ge.getFeatures().appendChild(kmlObject);
    for (var i = 0; i < parts.length; i++) {
        var part = parts[i];
        part['points'] = part['points'] || {};
        part['type'] = part['type'] || false;
        part['brakesController'] = part['brakesController'] || false;
        part['animations'] = part['animations'] || false;
        ges.aircraft.parts[part['name']] = part;
        ges.aircraft.addOffsets(part, scale);
        if (part['forceDirection']) {
            part['forceDirection'] = axisToIndex[part['forceDirection']]
        }
        if (part['rotation']) {
            part['rotation'] = V3.toRadians(part['rotation'])
        }
        if (part['model'] && ges.aircraft.placemarks[part['model']]) {
            var placemark = ges.aircraft.placemarks[part['model']];
            var model = placemark.getGeometry();
            model.setAltitudeMode(ge.ALTITUDE_ABSOLUTE);
            part['3dmodel'] = model;
            part.placemark = placemark;
            part.geScale = model.getScale();
            part.originalScale = part['scale'] || [1, 1, 1];
            part.originalScale = V3.scale(part.originalScale, scale);
            part.geScale.set(part.originalScale[0], part.originalScale[1], part.originalScale[2])
        }
        if (part['light']) {
            var lightPlacemark = ges.fx.createLight(part['light']);
            part['point'] = lightPlacemark.point;
            part['placemark'] = lightPlacemark.placemark;
            ges.aircraft.lights.push(part)
        }
        part.object3d = new Object3D(part);
        if (part['animations']) {
            for (var r = 0; r < part.animations.length; r++) {
                var animation = part.animations[r];
                animation['ratio'] = animation['ratio'] || 1;
                animation['offset'] = animation['offset'] || 0;
                animation.currentValue = null;
                if (animation['delay']) {
                    animation['ratio'] = animation['ratio'] / (1 - Math.abs(animation['delay']))
                }
                if (animation['type'] == 'rotate') {
                    var method = 'rotate';
                    if (animation['frame'] == 'parent') {
                        method = 'rotateParentFrame'
                    }
                    animation.rotationMethod = part.object3d[method + animation['axis']];
                    part.resetTransformPerFrame = true
                }
                if (animation['type'] == 'translate') {
                    part.resetTransformPerFrame = true
                }
            }
        }
        if (part['type'] == 'wheel') {
            part.radius = part.radius || 1;
            part.angularVelocity = 0;
            ges.aircraft.wheels.push(part)
        }
        if (part['type'] == 'airfoil') {
            ges.aircraft.airfoils.push(part);
            part.stalls = part.stalls || false;
            part.stallIncidence = part.stallIncidence || 12;
            part.zeroLiftIncidence = part.zeroLiftIncidence || 16
        }
        if (part['type'] == 'engine') {
            part.rpm = 0;
            ges.aircraft.setup['originalInertia'] = ges.aircraft.setup['engineInertia'];
            ges.aircraft.engines.push(part)
        }
        if (part['type'] == 'buoy') {
            part.buoyancy = part['initialValue'] || 0;
            part['coolingSpeed'] = part['coolingSpeed'] || 0;
            ges.aircraft.buoys.push(part)
        }
        if (part['collisionPoints']) {
            var cps = part['collisionPoints'];
            var contactProperties = ges.aircraft.setup.contactProperties[part['type']];
            for (var p = 0; p < cps.length; p++) {
                cps[p].part = part;
                cps[p].contactProperties = contactProperties;
                ges.aircraft.collisionPoints.push(cps[p])
            }
        }
        if (part['controller']) {
            ges.aircraft.controllers[part['controller']['name']] = part['controller']
        }
    }
    for (var i = 0; i < parts.length; i++) {
        var part = parts[i];
        if (!part['parent'] || part['parent'] == 'root') {
            ges.aircraft.object3d.addChild(part.object3d)
        } else {
            ges.aircraft.parts[part['parent']].object3d.addChild(part.object3d)
        }
    }
};
Aircraft.prototype.setVisibility = function (bVisibility) {
    if (this.object3d) {
        this.object3d.setVisibility(bVisibility)
    }
};
Aircraft.prototype.unloadAircraft = function () {
    if (ges.aircraft.kmlObjects) {
        for (var i = 0, l = ges.aircraft.kmlObjects.length; i < l; i++) {
            ge.getFeatures().removeChild(ges.aircraft.kmlObjects[i]);
            ges.aircraft.kmlObjects[i].release()
        }
    }
    if (this.shadow) {
        ge.getFeatures().removeChild(this.shadow);
        this.shadow.release()
    }
    if (ges.aircraft.lights) {
        for (var i = 0, l = ges.aircraft.lights.length; i < l; i++) {
            ge.getFeatures().removeChild(ges.aircraft.lights[i].placemark);
            ges.aircraft.lights[i].placemark.release()
        }
    }
};
Aircraft.prototype.reset = function (bOnTheGround) {
    this.crashed = false;
    this.crashNotified = false;
    this.groundContact = bOnTheGround;
    if (bOnTheGround) {
        this.animationValue['gearPosition'] = 0;
        controls.gear.position = 0;
        controls.gear.target = 0
    } else {
        this.animationValue['gearPosition'] = 1;
        controls.gear.position = 1;
        controls.gear.target = 1
    } if (this.rigidBody) {
        this.rigidBody.reset()
    }
    for (var i in this.parts) {
        var part = this.parts[i];
        if (part.object3d) {
            part.object3d.reset()
        }
        if (part.animations) {
            for (var r = 0; r < part.animations.length; r++) {
                var animation = part.animations[r];
                animation.currentValue = null
            }
        }
        if (part.type == 'wheel') {
            part.angularVelocity = 0.01;
            part.oldAngularVelocity = 0.01
        }
    }
    this.engine.on = true;
    if (this.engines) {
        for (var i = 0; i < this.engines.length; i++) {
            this.engines[i].rpm = this.setup['minRPM']
        }
    }
    this.engine.rpm = 0
};
Aircraft.prototype.place = function (lla, htr) {
    this.llaLocation = lla;
    this.lastLlaLocation = lla;
    if (htr) {
        this.object3d.reset();
        htr = V3.toRadians(htr);
        this.object3d.rotate([htr[1], htr[2], htr[0]])
    }
    this.placeParts()
};
Aircraft.prototype.placeParts = function () {
    var parts = ges.aircraft.parts;
    for (var i in parts) {
        var part = parts[i];
        if (part.animations) {
            if (part.resetTransformPerFrame) {
                part.object3d.resetTransform()
            }
            for (var a = 0, l = part.animations.length; a < l; a++) {
                var animation = part.animations[a];
                var value = ges.animFilter(animation);
                if (animation.currentValue == value) {}
                switch (animation['type']) {
                case 'rotate':
                    var offset = value * degreesToRad;
                    animation.rotationMethod.call(part.object3d, offset);
                    value = null;
                    break;
                case 'scale':
                    var newScale = V3.add(part.originalScale, V3.scale(animation['axis'], value));
                    part.geScale.set(newScale[0], newScale[1], newScale[2]);
                    break;
                case 'translate':
                    var offset = value;
                    part.object3d.translate(V3.scale(animation['axis'], offset));
                    value = null;
                    break;
                case 'show':
                    if (value > 0) {
                        if (!part.object3d.visible) {
                            part.object3d.setVisibility(true)
                        }
                    } else if (part.object3d.visible) {
                        part.object3d.setVisibility(false)
                    }
                    break;
                case 'hide':
                    if (value > 0) {
                        if (part.object3d.visible) {
                            part.object3d.setVisibility(false)
                        }
                    } else if (!part.object3d.visible) {
                        part.object3d.setVisibility(true)
                    }
                    break;
                case 'sound':
                    if (value > 0) {
                        if (!animation.playing) {
                            audio.playSoundLoop(animation['name'], animation['loop']);
                            animation.playing = true
                        }
                    } else if (animation.playing) {
                        audio.stopSoundLoop(animation['name']);
                        animation.playing = false
                    }
                    break;
                case 'property':
                    part[animation['name']] = value;
                    break
                }
                animation.currentValue = value
            }
        }
    }
    var renderOptions = {
        'llaCoordinates': this.llaLocation,
        'collisions': true
    };
    this.object3d.render(renderOptions);
    var latLonBox = this.shadow.getLatLonBox();
    var shadowBox = [0, 0, 0];
    shadowBox[0] = clamp(Math.abs(this.shadowBox[0] * Math.cos(this.animationValue['aroll'] * degreesToRad)), 2, 1000);
    shadowBox[1] = clamp(Math.abs(this.shadowBox[1] * Math.cos(this.animationValue['atilt'] * degreesToRad)), 2, 1000);
    var llBox = xyz2lla(shadowBox, this.llaLocation);
    latLonBox.setNorth(this.llaLocation[0] - llBox[0]);
    latLonBox.setSouth(this.llaLocation[0] + llBox[0]);
    latLonBox.setEast(this.llaLocation[1] - llBox[1]);
    latLonBox.setWest(this.llaLocation[1] + llBox[1]);
    latLonBox.setRotation(-this.htr[0])
};
Aircraft.prototype.startEngine = function () {
    if (!this.engine.on && ges.aircraft.crashed !== true) {
        this.engine.on = true;
        this.engine.startup = true;
        ges.aircraft.setup['engineInertia'] = 2 / this.setup.startupTime;
        setTimeout(function () {
            ges.aircraft.engine.startup = false;
            ges.aircraft.setup['engineInertia'] = ges.aircraft.setup['originalInertia']
        }, this.setup.startupTime * 1000);
        audio.playStartup()
    }
};
Aircraft.prototype.stopEngine = function () {
    if (this.engine.on) {
        ges.aircraft.setup['engineInertia'] = ges.aircraft.setup['originalInertia'];
        controls['throttle'] = 0;
        this.engine.on = false;
        audio.playShutdown()
    }
};
Aircraft.prototype.addOffsets = function (oPart, scale) {
    if (oPart.position && !oPart.doNotScalePosition) {
        oPart.position = V3.scale(oPart.position, scale)
    }
    if (oPart.points.forceSourcePoint) {
        oPart.points.forceSourcePoint = V3.scale(oPart.points.forceSourcePoint, scale)
    }
    if (oPart.collisionPoints) {
        for (var i = 0; i < oPart.collisionPoints.length; i++) {
            oPart.collisionPoints[i] = V3.scale(oPart.collisionPoints[i], scale)
        }
    }
    if (oPart.animations) {
        for (var i = 0; i < oPart.animations.length; i++) {
            if (oPart.animations[i]['type'] == 'translate') {
                oPart.animations[i]['ratio'] = oPart.animations[i]['ratio'] * scale
            }
        }
    }
};
Aircraft.prototype.fixCockpitScale = function (scale) {
    if (scale) {
        for (var i in this.parts) {
            var part = this.parts[i];
            if (part.model) {
                part.geScale.set(part.originalScale[0] * scale, part.originalScale[1] * scale, part.originalScale[2] * scale);
                if (scale == 1) {
                    part.object3d.setScaleOffset(null)
                } else {
                    part.object3d.setScaleOffset(scale)
                }
            }
        }
    }
};
Aircraft.prototype.crash = function () {
    this.engine.on = false;
    new ges.fx.ParticuleEmitter({
        'anchor': {
            worldPosition: [0, 0, 0]
        },
        'duration': 2000,
        'rate': 0.05,
        'life': 2000,
        'startScale': 0.5,
        'endScale': 15,
        'startOpacity': 100,
        'endOpacity': 1,
        'texture': 'darkSmoke'
    })
};
window.objects = window.objects || {};
objects.clusterSize = 2;
objects.currentCellId;
objects.matrix = {};
objects.visible = [];
objects.list = {
    'carrier': {
        'location': [37.777228, -122.609482, 0],
        'model': ges.PRODUCTION ? PAGE_PATH + 'models/objects/carrier/carrier.kmz' : PAGE_PATH + 'models/objects/carrier/kmz/carrier.kml',
        'collisionRadius': 400,
        'collisionTriangles': [
            [
                [12.6, 330, 20.5],
                [0, 99.5, 20.5],
                [56, 334, 20.5]
            ],
            [
                [56, 334, 20.5],
                [0, 99.5, 20.5],
                [49, 0, 20.5]
            ],
            [
                [55, 295, 20.5],
                [49, 75, 20.5],
                [74.5, 288, 20.5]
            ],
            [
                [74.5, 288, 20.5],
                [49, 75, 20.5],
                [77.5, 107, 20.5]
            ],
            [
                [18, 63, 20.5],
                [23, 1, 20.5],
                [49, 1, 20.5]
            ],
            [
                [0, 330, 20.5],
                [75, 330, 20.5],
                [75, 330, 0]
            ],
            [
                [0, 330, 20.5],
                [75, 330, 0],
                [0, 330, 0]
            ]
        ]
    }
};
objects.collidableObjectList = [];
objects.collidableObject = false;
objects.init = function () {
    objects.preProcessObjects();
    setInterval(objects.updateVisibility, 10000);
    setInterval(objects.updateCollidables, 2000)
};
objects.preProcessObjects = function () {
    for (var i in objects.list) {
        var object = objects.list[i];
        var cellId = (object.location[0] / objects.clusterSize).toFixed(0) + '/' + (object.location[1] / objects.clusterSize).toFixed(0);
        objects.matrix[cellId] = objects.matrix[cellId] || {};
        objects.matrix[cellId][i] = object;
        for (var t = 0, l = object.collisionTriangles.length; t < l; t++) {
            var triangle = object.collisionTriangles[t];
            triangle.u = V3.sub(triangle[1], triangle[0]);
            triangle.v = V3.sub(triangle[2], triangle[0]);
            triangle.n = V3.cross(triangle.u, triangle.v)
        }
    }
};
objects.updateVisibility = function () {
    var cellId = (ges.aircraft.llaLocation[0] / objects.clusterSize).toFixed(0) + '/' + (ges.aircraft.llaLocation[1] / objects.clusterSize).toFixed(0);
    if (cellId != objects.currentCellId) {
        objects.unloadMatrixModels(objects.currentCellId);
        objects.loadMatrixModels(cellId);
        objects.currentCellId = cellId
    }
};
objects.unloadMatrixModels = function (cellId) {
    for (var i in objects.matrix[cellId]) {
        if (objects.matrix[cellId][i].placemark) {
            ge.getFeatures().removeChild(objects.matrix[cellId][i].placemark);
            objects.matrix[cellId][i].placemark.release();
            objects.matrix[cellId][i].placemark = null
        }
    }
};
objects.loadMatrixModels = function (cellId) {
    for (var i in objects.matrix[cellId]) {
        var object = objects.matrix[cellId][i];
        if (object.model) {
            var data = ges.loadKmz(object.model, null, function (data) {
                object.placemark = data.placemark;
                data.model.getLocation().setLatLngAlt(object.location[0], object.location[1], object.location[2])
            })
        }
    }
};
objects.updateCollidables = function () {
    objects.collidableObjectList = [];
    objects.collidableObject = false;
    for (var i in objects.matrix[objects.currentCellId]) {
        var object = objects.matrix[objects.currentCellId][i];
        var metricOffset = lla2xyz(V3.sub(ges.aircraft.llaLocation, object.location), ges.aircraft.llaLocation);
        var distance = V3.length(metricOffset);
        if (distance < object.collisionRadius) {
            object.metricOffset = metricOffset;
            objects.collidableObject = true;
            objects.collidableObjectList.push(object)
        }
    }
};
objects.checkCollisions = function (rayOrigin, rayEnd, rayVector) {
    if (objects.collidableObject) {
        for (var c = 0, lc = objects.collidableObjectList.length; c < lc; c++) {
            var object = objects.collidableObjectList[c];
            object.metricOffset = lla2xyz(V3.sub(ges.aircraft.llaLocation, object.location), ges.aircraft.llaLocation);
            rayOrigin = V3.add(object.metricOffset, rayOrigin);
            if (rayVector) {
                rayEnd = V3.add(rayOrigin, rayVector)
            } else {
                rayEnd = V3.add(object.metricOffset, rayEnd)
            }
            for (var t = 0, lt = object.collisionTriangles.length; t < lt; t++) {
                var triangle = object.collisionTriangles[t];
                var result = intersect_RayTriangle([rayOrigin, rayEnd], triangle);
                if (result) {
                    return {
                        'location': V3.add(object.location, xyz2lla(result.point, object.location)),
                        'normal': V3.normalize(triangle.n)
                    };
                    break
                }
            }
        }
    }
};
objects.getAltitudeAtLocation = function (lat, lon) {
    if (objects.collidableObject) {
        var origin = [lat, lon, 100000];
        for (var c = 0, lc = objects.collidableObjectList.length; c < lc; c++) {
            var object = objects.collidableObjectList[c];
            var rayOrigin = lla2xyz(V3.sub(origin, object.location), object.location);
            var rayEnd = [rayOrigin[0], rayOrigin[1], 0];
            for (var t = 0, lt = object.collisionTriangles.length; t < lt; t++) {
                var triangle = object.collisionTriangles[t];
                var result = intersect_RayTriangle([rayOrigin, rayEnd], triangle);
                if (result) {
                    return {
                        'location': [lat, lon, result.point[2] + object.location[2]],
                        'normal': V3.normalize(triangle.n)
                    }
                }
            }
        }
    }
};
var controls = window.controls || {};
controls = {};
controls.states = {};
controls.mouse = {};
controls.mouse.down = false;
controls.mouse.orbit = {};
controls.keyboard = {};
controls.keyboard.rollIncrement = 0.5;
controls.keyboard.pitchIncrement = 0.5;
controls.keyboard.yawIncrement = 0.5;
controls.keyboard.throttleIncrement = 0.8;
controls.keyboard.recenterRatio = 0.05;
controls.keyboard.override = false;
controls.mixYawRoll = true;
controls.exponential = 1;
controls.yawExponential = 1;
controls.mixYawRollQuantity = 1;
controls.mode = 'mouse';
controls.init = function () {
    controls.reset();
    ges.addResizeHandler(controls.initViewportDimensions);
    $(document).on('keydown', controls.keyDown).on('keyup', controls.keyUp);
    var mouseHandler = function (event) {
        if (controls.mouse.down !== false) {
            if (controls.mouse.down == 0) {
                var dx = controls.mouse.originalX - event.getClientX();
                var dy = controls.mouse.originalY - event.getClientY();
                if (camera.rotate(dx * controls.mouse.orbit.ratioX, dy * controls.mouse.orbit.ratioY)) {
                    event.preventDefault()
                }
            }
            if (controls.mouse.down == 2) {
                if (camera.translate(-(controls.mouse.lastY - event.getClientY()) * controls.mouse.orbit.ratioZ)) {
                    event.preventDefault()
                }
            }
            controls.mouse.lastY = event.getClientY()
        } else {
            if (controls.mode == 'mouse') {
                event = event || window.event;
                controls.mouse.xValue = clamp((event.getClientX() - controls.mouse.cX) * controls.mouse.rX, -1, 1);
                controls.mouse.yValue = clamp((event.getClientY() - controls.mouse.cY) * controls.mouse.rY, -1, 1);
                controls.keyboard.override = false
            }
        } if (camera.isHandlingMouseRotation()) {
            event.preventDefault()
        }
    };
    google.earth.addEventListener(ge.getWindow(), 'mousemove', mouseHandler);
    var mouseDownHandler = function (event) {
        controls.mouse.down = true;
        if (camera.isHandlingMouseRotation()) {
            event.preventDefault();
            controls.mouse.originalX = event.getClientX();
            controls.mouse.originalY = event.getClientY();
            controls.mouse.lastY = controls.mouse.originalY;
            controls.mouse.down = event.getButton();
            camera.saveRotation()
        }
    };
    var mouseUpHandler = function (event) {
        $('.gefs-focus-target').focus();
        if (camera.isHandlingMouseRotation()) {
            event.preventDefault();
            camera.saveRotation()
        }
        controls.mouse.down = false
    };
    google.earth.addEventListener(ge.getWindow(), 'mousedown', mouseDownHandler);
    google.earth.addEventListener(ge.getWindow(), 'mouseup', mouseUpHandler);
    controls.setMode(ges.preferences['controlMode'])
};
controls.initViewportDimensions = function () {
    var map3d = $('.map3d')[0];
    controls.mouse.cX = map3d.offsetWidth / 2;
    controls.mouse.rX = 1 / controls.mouse.cX;
    controls.mouse.cY = map3d.offsetHeight / 2;
    controls.mouse.rY = 1 / controls.mouse.cY;
    controls.viewportWidth = map3d.offsetWidth;
    controls.viewportHeight = map3d.offsetHeight;
    controls.mouse.orbit.ratioX = 360 / controls.viewportWidth;
    controls.mouse.orbit.ratioY = 360 / controls.viewportHeight;
    controls.mouse.orbit.ratioZ = 0.1
};
controls.reset = function () {
    controls.roll = 0;
    controls.rawPitch = 0;
    controls.pitch = 0;
    controls.yaw = 0;
    controls.throttle = 0;
    controls.brakes = false;
    controls.engine = {};
    controls.engine.on = false;
    controls.elevatorTrim = 0;
    controls.elevatorTrimMin = -0.5;
    controls.elevatorTrimMax = +0.5;
    controls.elevatorTrimStep = 0.05;
    controls.gear = {};
    controls.gear.position = 0;
    controls.gear.target = 0;
    controls.flaps = {};
    controls.flaps.position = 0;
    controls.flaps.target = 0;
    controls.airbrakes = {};
    controls.airbrakes.position = 0;
    controls.airbrakes.target = 0;
    controls.states.left = false;
    controls.states.right = false;
    controls.states.up = false;
    controls.states.down = false;
    controls.states.rudderLeft = false;
    controls.states.rudderRight = false;
    controls.states.increaseThrottle = false;
    controls.states.decreaseThrottle = false;
    controls.mouse.xValue = 0;
    controls.mouse.yValue = 0;
    controls.initViewportDimensions()
};
controls.setMode = function (mode) {
    mode = mode || ges.preferences['controlMode'];
    controls.mode = mode;
	if (controls.mode == 'mouse') {
        controls.exponential = ges.preferences.mouse.exponential;
        controls.yawExponential = ges.preferences.keyboard.exponential;
        controls.mixYawRoll = ges.preferences.mouse.mixYawRoll;
        controls.mixYawRollQuantity = ges.preferences.mouse.mixYawRollQuantity
    }
    if (controls.mode == 'keyboard') {
        controls.exponential = 0;
        controls.yawExponential = 0;
        controls.mixYawRoll = ges.preferences.keyboard.mixYawRoll;
        controls.mixYawRollQuantity = ges.preferences.keyboard.mixYawRollQuantity
    }
    ges.preferences['controlMode'] = mode
};
controls.setters = {
    'none': {
        'label': 'none',
        'set': function () {},
        'unset': function () {}
    },
    'setBrakes': {
        'label': 'Brakes',
        'set': function () {
            ges.aircraft.brakesOn = true
        },
        'unset': function () {
            ges.aircraft.brakesOn = false
        }
    },
    'toggleParkingBrake': {
        'label': 'Parking brake',
        'set': function () {
            if (ges.aircraft.brakesOn) {
                ges.aircraft.brakesOn = false
            } else {
                ges.aircraft.brakesOn = true
            }
        }
    },
    'setAirbrakes': {
        'label': 'Air Brakes',
        'set': function () {
            if (controls.airbrakes.target == 0) {
                controls.airbrakes.target = 1;
                controls.setPartAnimationDelta(controls.airbrakes)
            } else {
                controls.airbrakes.target = 0;
                controls.setPartAnimationDelta(controls.airbrakes)
            }
        }
    },
    'setFlapsUp': {
        'label': 'Flaps Up',
        'set': function () {
            if (controls.flaps.target > 0) {
                controls.flaps.target--;
                controls.setPartAnimationDelta(controls.flaps)
            }
        }
    },
    'setFlapsDown': {
        'label': 'Flaps down',
        'set': function () {
            if (controls.flaps.target < ges.aircraft.setup['flapsSteps']) {
                controls.flaps.target++;
                controls.setPartAnimationDelta(controls.flaps)
            }
        }
    },
    'setGear': {
        'label': 'Toggle Gear (up/down)',
        'set': function () {
            if (!ges.aircraft.groundContact || ges.debug.debug) {
                if (controls.gear.target == 0) {
                    controls.gear.target = 1;
                    controls.setPartAnimationDelta(controls.gear)
                } else {
                    controls.gear.target = 0;
                    controls.setPartAnimationDelta(controls.gear)
                }
            }
        }
    },
    'setElevatorTrimUp': {
        'label': 'Elevator Trim Up',
        'set': function () {
            controls.states.elevatorTrimUp = true
        },
        'unset': function () {
            controls.states.elevatorTrimUp = false
        }
    },
    'setElevatorTrimDown': {
        'label': 'Elevator Trim Down',
        'set': function () {
            controls.states.elevatorTrimDown = true
        },
        'unset': function () {
            controls.states.elevatorTrimDown = false
        }
    },
    'setElevatorTrimNeutral': {
        'label': 'Elevator Trim Neutral',
        'set': function () {
            controls['elevatorTrim'] = 0
        }
    }
};
controls.update = function (dt) {
    if (controls.states.elevatorTrimUp) {
        if (controls['elevatorTrim'] < controls.elevatorTrimMax) {
            controls['elevatorTrim'] += controls.elevatorTrimStep * dt
        }
    } else if (controls.states.elevatorTrimDown) {
        if (controls['elevatorTrim'] > controls.elevatorTrimMin) {
            controls['elevatorTrim'] -= controls.elevatorTrimStep * dt
        }
    }
    controls['elevatorTrim'] = clamp(controls['elevatorTrim'], controls.elevatorTrimMin, controls.elevatorTrimMax);
    if (controls.mode == 'keyboard' || controls.keyboard.override) {
        controls.updateKeyboard(dt);
        controls.updateKeyboardGeneral(dt)
    }
    if (controls.mode == 'mouse' && !controls.keyboard.override) {
        controls.updateMouse(dt);
        controls.updateKeyboardGeneral(dt)
    }
	
    if (!controls.autopilot.on) {
        controls['roll'] = controls['roll'] * Math.pow(Math.abs(controls['roll']), controls.exponential);
        controls['rawPitch'] = controls['rawPitch'] * Math.pow(Math.abs(controls['rawPitch']), controls.exponential);
        if (controls.mixYawRoll) {
            controls['yaw'] = controls['roll'] * controls.mixYawRollQuantity
        } else {
            controls['yaw'] = controls['yaw'] * Math.pow(Math.abs(controls['yaw']), controls.yawExponential)
        }
    } else {
        controls.autopilot.update(dt)
    }
    controls['roll'] = clamp(controls['roll'], -1, 1);
    controls['rawPitch'] = clamp(controls['rawPitch'], -1, 1);
    controls['yaw'] = clamp(controls['yaw'], -1, 1);
    controls['pitch'] = controls['rawPitch'] + controls['elevatorTrim'];
    var lowerThrottleLimit = 0;
    if (ges.aircraft.setup['reverse']) {
        lowerThrottleLimit = -1
    }
    controls['throttle'] = clamp(controls['throttle'], lowerThrottleLimit, 1);
    controls.animatePart('gear', dt);
    controls.animatePart('flaps', dt);
    controls.animatePart('airbrakes', dt)
};
controls.setPartAnimationDelta = function (controlPart) {
    controlPart.delta = controlPart.target - controlPart.position
};
controls.animatePart = function (partName, dt) {
    var controlPart = controls[partName];
    if (controlPart.position != controlPart.target) {
        if (ges.aircraft.setup[partName + 'TravelTime']) {
            var travelIncrement = controlPart.delta / (ges.aircraft.setup[partName + 'TravelTime'] / dt);
            controlPart.position += travelIncrement;
            if (controlPart.delta < 0 && controlPart.position <= controlPart.target) {
                controlPart.position = controlPart.target;
                controlPart.delta = null
            }
            if (controlPart.delta > 0 && controlPart.position >= controlPart.target) {
                controlPart.position = controlPart.target;
                controlPart.delta = null
            }
        }
    }
};
controls.updateMouse = function (dt) {
    controls['roll'] = controls.mouse.xValue * ges.preferences.mouse.sensitivity * ges.aircraft.controllers['roll']['sensitivity'] * ges.aircraft.controllers['roll']['ratio'];
    controls['rawPitch'] = controls.mouse.yValue * ges.preferences.mouse.sensitivity * ges.aircraft.controllers['pitch']['sensitivity'] * ges.aircraft.controllers['pitch']['ratio']
};
controls.updateKeyboard = function (dt) {
    var rollIncrement = controls.keyboard.rollIncrement * dt * ges.preferences.keyboard.sensitivity * ges.aircraft.controllers['roll']['sensitivity'] * ges.aircraft.controllers['roll']['ratio'];
    if (controls.states.left) {
        controls['roll'] -= rollIncrement
    } else if (controls.states.right) {
        controls['roll'] += rollIncrement
    } else if (ges.aircraft.controllers['roll']['recenter']) {
        controls['roll'] -= [controls['roll'] - 0] * controls.keyboard.recenterRatio * ges.preferences.keyboard.sensitivity * ges.aircraft.controllers['roll']['sensitivity']
    }
    var pitchIncrement = controls.keyboard.pitchIncrement * dt * ges.preferences.keyboard.sensitivity * ges.aircraft.controllers['pitch']['sensitivity'] * ges.aircraft.controllers['pitch']['ratio'];
    if (controls.states.up) {
        controls['rawPitch'] -= pitchIncrement
    } else if (controls.states.down) {
        controls['rawPitch'] += pitchIncrement
    } else if (ges.aircraft.controllers['pitch']['recenter']) {
        controls['rawPitch'] -= [controls['rawPitch'] - 0] * controls.keyboard.recenterRatio * ges.preferences.keyboard.sensitivity * ges.aircraft.controllers['pitch']['sensitivity']
    }
};
controls.updateKeyboardGeneral = function (dt) {
    var throttleIncrement = controls.keyboard.throttleIncrement * dt;
    if (controls.states.increaseThrottle) {
        controls['throttle'] += throttleIncrement
    } else if (controls.states.decreaseThrottle) {
        controls['throttle'] -= throttleIncrement
    }
    var yawIncrement = controls.keyboard.yawIncrement * dt * ges.preferences.keyboard.sensitivity * ges.aircraft.controllers['yaw']['sensitivity'] * ges.aircraft.controllers['yaw']['ratio'];
    if (controls.states.rudderLeft) {
        controls['yaw'] -= yawIncrement
    } else if (controls.states.rudderRight) {
        controls['yaw'] += yawIncrement
    } else if (ges.aircraft.controllers['yaw']['recenter']) {
        controls['yaw'] -= [controls['yaw'] - 0] * controls.keyboard.recenterRatio * ges.preferences.keyboard.sensitivity * ges.aircraft.controllers['yaw']['sensitivity']
    }
};
controls.recenterKeyboard = function () {
    if (controls.mode == 'keyboard') {
        controls['yaw'] = 0;
        controls['roll'] = 0;
        controls['rawPitch'] = 0
    }
};
controls.keyDown = function (event) {
    switch (event.which) {
    case ges.preferences.keyboard.keys['Bank left']['keycode']:
        controls.states.left = true;
        event.returnValue = false;
        controls.keyboard.override = true;
        break;
    case ges.preferences.keyboard.keys['Bank right']['keycode']:
        controls.states.right = true;
        event.returnValue = false;
        controls.keyboard.override = true;
        break;
    case ges.preferences.keyboard.keys['Pitch down']['keycode']:
        controls.states.up = true;
        event.returnValue = false;
        controls.keyboard.override = true;
        break;
    case ges.preferences.keyboard.keys['Pitch up']['keycode']:
        controls.states.down = true;
        event.returnValue = false;
        controls.keyboard.override = true;
        break;
    case ges.preferences.keyboard.keys['Steer left']['keycode']:
        controls.states.rudderLeft = true;
        event.returnValue = false;
        break;
    case ges.preferences.keyboard.keys['Steer right']['keycode']:
        controls.states.rudderRight = true;
        event.returnValue = false;
        break;
    case ges.preferences.keyboard.keys['Increase throttle']['keycode']:
    case ges.preferences.keyboard.keys['PgUp']['keycode']:
        controls.states.increaseThrottle = true;
        event.returnValue = false;
        break;
    case ges.preferences.keyboard.keys['Decrease throttle']['keycode']:
    case ges.preferences.keyboard.keys['PgDwn']['keycode']:
        controls.states.decreaseThrottle = true;
        event.returnValue = false;
        break;
    case ges.preferences.keyboard.keys['Brakes']['keycode']:
        controls.setters.setBrakes['set']();
        break;
    case ges.preferences.keyboard.keys['Parking brake']['keycode']:
        controls.setters.toggleParkingBrake['set']();
        break;
    case ges.preferences.keyboard.keys['Engine switch (on/off)']['keycode']:
        if (ges.aircraft.engine.on) {
            ges.aircraft.stopEngine()
        } else {
            ges.aircraft.startEngine()
        }
        break;
    case ges.preferences.keyboard.keys['Gear toggle (up/down)']['keycode']:
        controls.setters.setGear['set']();
        break;
    case ges.preferences.keyboard.keys['Lower flaps']['keycode']:
        controls.setters.setFlapsDown['set']();
        break;
    case ges.preferences.keyboard.keys['Raise flaps']['keycode']:
        controls.setters.setFlapsUp['set']();
        break;
    case ges.preferences.keyboard.keys['Airbrake toggle (on/off)']['keycode']:
        controls.setters.setAirbrakes['set']();
        break;
    case ges.preferences.keyboard.keys['Elevator trim up']['keycode']:
        controls.setters.setElevatorTrimUp['set']();
        break;
    case ges.preferences.keyboard.keys['Elevator trim down']['keycode']:
        controls.setters.setElevatorTrimDown['set']();
        break;
    case ges.preferences.keyboard.keys['Elevator trim neutral']['keycode']:
        controls.setters.setElevatorTrimNeutral['set']();
        break;
    case 13:
        controls.recenterKeyboard();
        break;
    case 27:
        if (flight.recorder.playing) {
            flight.recorder.exitPlayback();
            event.preventDefault()
        }
        break;
    case 86:
        flight.recorder.enterPlayback();
        break;
    case 65:
        controls.autopilot.toggle();
        break;
    case 83:
        audio.toggleMute();
        break;
    case 80:
        ges.togglePause();
        break;
    case 67:
        camera.cycle();
        break;
    case 78:
        ui.toggleMap();
        break;
    case 79:
        ges.togglePreferencesPanel();
        break;
    case 9:
        ges.flyToCamera();
        break;
    case 72:
        instruments.toggle();
        break;
    case 77:
        controls.setMode('mouse');
        break;
    case 75:
        controls.setMode('keyboard');
        break;
	case 82:
        ges.resetFlight();
        break;
    case 101:
        camera.setToNeutral();
        break;
    case 97:
        camera.setRotation(45);
        break;
    case 98:
        camera.setRotation(0);
        break;
    case 99:
        camera.setRotation(-45);
        break;
    case 100:
        camera.setRotation(90);
        break;
    case 102:
        camera.setRotation(-90);
        break;
    case 103:
        camera.setRotation(135);
        break;
    case 104:
        camera.setRotation(180);
        break;
    case 105:
        camera.setRotation(-135);
        break
    }
    if (event.keyCode >= 48 && event.keyCode <= 57) {
        var setting = event.keyCode - 48;
        controls['throttle'] = setting / 9
    }
};
controls.keyUp = function (event) {
    switch (event.which) {
    case ges.preferences.keyboard.keys['Bank left']['keycode']:
        controls.states.left = false;
        event.returnValue = false;
        break;
    case ges.preferences.keyboard.keys['Bank right']['keycode']:
        controls.states.right = false;
        event.returnValue = false;
        break;
    case ges.preferences.keyboard.keys['Pitch down']['keycode']:
        controls.states.up = false;
        event.returnValue = false;
        break;
    case ges.preferences.keyboard.keys['Pitch up']['keycode']:
        controls.states.down = false;
        event.returnValue = false;
        break;
    case ges.preferences.keyboard.keys['Steer left']['keycode']:
        controls.states.rudderLeft = false;
        event.returnValue = false;
        break;
    case ges.preferences.keyboard.keys['Steer right']['keycode']:
        controls.states.rudderRight = false;
        event.returnValue = false;
        break;
    case ges.preferences.keyboard.keys['Increase throttle']['keycode']:
    case ges.preferences.keyboard.keys['PgUp']['keycode']:
        controls.states.increaseThrottle = false;
        event.returnValue = false;
        break;
    case ges.preferences.keyboard.keys['Decrease throttle']['keycode']:
    case ges.preferences.keyboard.keys['PgDwn']['keycode']:
        controls.states.decreaseThrottle = false;
        event.returnValue = false;
        break;
    case ges.preferences.keyboard.keys['Elevator trim up']['keycode']:
        controls.setters.setElevatorTrimUp['unset']();
        break;
    case ges.preferences.keyboard.keys['Elevator trim down']['keycode']:
        controls.setters.setElevatorTrimDown['unset']();
        break;
    case ges.preferences.keyboard.keys['Brakes']['keycode']:
        controls.setters.setBrakes['unset']();
        break;
    case 84:
        ui.openChat();
        break
    }
};

controls.autopilot = {
    on: false,
    maxBankAngle: 30,
    maxPitchAngle: 10,
    minPitchAngle: -20,
    commonClimbrate: 500,
    commonDescentrate: -750,
    maxClimbrate: 3000,
    maxDescentrate: -4000,
    heading: 0,
    altitude: 0,
    kias: 0,
    climbrate: 0,
    climbPID: new PID(0.01, 0.001, 0.001),
    pitchPID: new PID(0.03, 0.002, 0.01),
    rollPID: new PID(0.02, 0.00001, 0),
    throttlePID: new PID(0.1, 0, 0)
};
controls.autopilot.toggle = function () {
    if (controls.autopilot.on) {
        controls.autopilot.turnOff()
    } else {
        controls.autopilot.turnOn()
    }
};
controls.autopilot.turnOn = function () {
    if (!ges.aircraft.setup.autopilot) {
        return
    }
    var values = ges.aircraft.animationValue;
    controls.autopilot.climbPID.reset();
    controls.autopilot.pitchPID.reset();
    controls.autopilot.rollPID.reset();
    controls.autopilot.throttlePID.reset();
    controls.autopilot.setAltitude(values['altitude']);
    controls.autopilot.setHeading(values['heading']);
    controls.autopilot.setKias(values['kias']);
    controls.autopilot.on = true;
    ui.hud.autopilotIndicator(true);
    $('.gefs-autopilot-toggle').html('Engaged').addClass('btn-warning')
};
controls.autopilot.turnOff = function () {
    controls.autopilot.on = false;
    ui.hud.autopilotIndicator(false);
    $('.gefs-autopilot-toggle').html('Disengaged').removeClass('btn-warning')
};
controls.autopilot.setHeading = function (heading) {
    var lastValue = controls.autopilot.heading;
    try {
        controls.autopilot.heading = fixAngle360(parseInt(heading, 10));
        $('.gefs-autopilot-heading').val(controls.autopilot.heading)
    } catch (e) {
        controls.autopilot.heading = lastValue
    }
};
controls.autopilot.setAltitude = function (altitude) {
    var lastValue = controls.autopilot.altitude;
    try {
        controls.autopilot.altitude = parseInt(altitude, 10);
        $('.gefs-autopilot-altitude').val(controls.autopilot.altitude)
    } catch (e) {
        controls.autopilot.altitude = lastValue
    }
};
controls.autopilot.setKias = function (kias) {
    var lastValue = controls.autopilot.kias;
    try {
        controls.autopilot.kias = parseInt(kias, 10);
        $('.gefs-autopilot-kias').val(controls.autopilot.kias)
    } catch (e) {
        controls.autopilot.kias = lastValue
    }
};
controls.autopilot.update = function (dt) {
    var values = ges.aircraft.animationValue;
    var ap = controls.autopilot;
    var speedRatio = clamp(values['kias'] / 100, 1, 5);
    var deltaHeading = fixAngle(values['heading'] - ap.heading);
    var targetBankAngle = clamp(deltaHeading, -ap.maxBankAngle, ap.maxBankAngle);
    controls['yaw'] = exponentialSmoothing('apYaw', targetBankAngle / -60, 0.1);
    ap.rollPID.set(targetBankAngle);
    controls['roll'] = exponentialSmoothing('apRoll', -ap.rollPID.compute(values['aroll'], dt) / speedRatio, 0.9);
    var deltaAltitude = ap.altitude - values['altitude'];
    var maxClimbRate = clamp(speedRatio * ap.commonClimbrate, 0, ap.maxClimbrate);
    var maxDescentRate = clamp(speedRatio * ap.commonDescentrate, ap.maxDescentrate, 0);
    var targetClimbrate = clamp(deltaAltitude * 5, maxDescentRate, maxClimbRate);
    ap.climbPID.set(-targetClimbrate);
    var currentClimbRate = clamp(values['climbrate'], maxDescentRate, maxClimbRate);
    var aTargetTilt = ap.climbPID.compute(-currentClimbRate, dt) / speedRatio;
    aTargetTilt = clamp(aTargetTilt, -ap.maxPitchAngle, -ap.minPitchAngle);
    ap.pitchPID.set(-aTargetTilt);
    controls['rawPitch'] = exponentialSmoothing('apPitch', ap.pitchPID.compute(-values['atilt'], dt) / speedRatio, 0.9);
    ges.debug.watch('targetClimbrate', targetClimbrate);
    ges.debug.watch('aTargetTilt', aTargetTilt);
    ap.throttlePID.set(ap.kias);
    controls['throttle'] = exponentialSmoothing('apThrottle', ap.throttlePID.compute(values['kias'], dt), 0.9);
    controls['throttle'] = clamp(controls['throttle'], 0, 1);
    ges.debug.watch('throttle', controls['throttle'])
};
var weather = window.weather || {};
weather.dataProxy = 'backend/weather/weather.php';
weather.cloudModels = [];
weather.clouds = [];
weather.cloudsLoaded = false;
weather.maxNumberOfClouds = 100;
weather.averageNumberOfClouds = 50;
weather.cloudSquare = 1;
weather.lowCeiling = 1000;
weather.highCeiling = 10000;
weather.thermals = {
    'radius': 100,
    'speed': 3,
    'closest': 0,
    'currentVector': [0, 0, 0]
};
weather.windLayerHeight = 7000;
weather.init = function () {
    setTimeout(function () {
        weather.sun(ges.preferences.weather.sun)
    }, 5000);
    weather.cloud_urls = [PAGE_PATH + 'models/clouds/1.dae?killcache=' + ges.killCache, PAGE_PATH + 'models/clouds/2.dae?killcache=' + ges.killCache, PAGE_PATH + 'models/clouds/3.dae?killcache=' + ges.killCache, PAGE_PATH + 'models/clouds/4.dae?killcache=' + ges.killCache];
    if (ges.preferences.weather.cloudCover) {
        weather.loadCloudCover()
    }
    weather.cloudsQuantity = 50;
    weather.currentWindVector = [0, 0, 0];
    weather.currentWindDirection = 0;
    weather.currentWindSpeed = 0;
    weather.activeWindLayer = 0;
    weather.cloudUpdateIndex = 0;
    weather.windLayerNb = 3;
    weather.windLayers = []
};
weather.refresh = function (latitude, longitude, altitude) {
    var preferenceRefreshOnly = false;
    if (!latitude && !longitude) {
        preferenceRefreshOnly = true
    }
    latitude = latitude || ges.aircraft.llaLocation[0];
    longitude = longitude || ges.aircraft.llaLocation[1];
    altitude = altitude || ges.aircraft.llaLocation[2];
    var url = weather.dataProxy + '?lat=' + latitude + '&lon=' + longitude;
    var refreshCallback = function (response) {
        google.earth.executeBatch(ge, function () {
            weather.lastProxyResponse = response;
            var rawData = [];
            try {
                rawData = eval(response);
                rawData = rawData || []
            } catch (e) {
                rawData = []
            }
            if (rawData && rawData.length > 0) {
                var current = rawData[0]['data']['current_condition'][0];
                if (ges.preferences.weather.windActive) {
                    var windDirection = parseInt(current['winddirDegree']);
                    var windSpeed = parseFloat(current['windspeedKmph']) * kmhToKnots;
                    weather.initWind(windDirection, windSpeed)
                } else {
                    weather.initWind(0, 0)
                }
                weather.cloudsQuantity = parseInt(current['cloudcover'])
            } else {
                weather.setDefaultWeather()
            } if (ges.preferences.weather.windActive || ges.windOverride) {
                if (ges.preferences.weather.customWindActive || ges.windOverride) {
                    weather.initWind(ges.preferences.weather.windDirection, ges.preferences.weather.windSpeed)
                }
                weather.windActive = true;
                weather.setWindIndicatorVisibility(true)
            } else {
                weather.setWindIndicatorVisibility(false)
            } if (!preferenceRefreshOnly) {
                weather.placeClouds(latitude, longitude, altitude)
            }
            weather.setCloudsQuantity()
        })
    };
    if (preferenceRefreshOnly) {
        refreshCallback(weather.lastProxyResponse)
    } else {
        $.ajax(url, {
            'success': refreshCallback,
            'error': refreshCallback
        })
    }
};
weather.setDefaultWeather = function () {
    weather.initWind(0, 0);
    if (!ges.preferences.weather.customWindActive) {
        weather.setWindIndicatorVisibility(false)
    }
    weather.cloudsQuantity = 50
};
weather.setWindIndicatorVisibility = function (visibility) {
    if (visibility) {
        if (instruments.visible) {
            instruments.list['wind'].show();
            if (weather.windLegendOverlay) {
                weather.windLegendOverlay.show()
            }
        }
    } else {
        instruments.list['wind'].hide();
        if (weather.windLegendOverlay) {
            weather.windLegendOverlay.hide()
        }
    }
};
weather.sun = function (bVisibility) {
    bVisibility = bVisibility == true;
    ge.getSun().setVisibility(bVisibility)
};
weather.Wind = function (direction, speed, floor, ceiling) {
    this.mainDirection = direction;
    this.mainSpeedKnots = speed;
    this.mainSpeedMs = speed * knotsToMs;
    this.floor = floor;
    this.ceiling = ceiling;
    this.direction = this.mainDirection;
    this.speed = this.mainSpeedMs;
    this.maxSpeedDelta = speed * 0.3;
    this.maxDirectionDelta = 5;
    this.speedOffset = 0;
    this.directionOffset = 0;
    this.randomizerSpeed = 0.2
};
weather.Wind.prototype.randomize = function () {
    this.speedOffset = this.speedOffset + (Math.random() - 0.5) * this.randomizerSpeed;
    this.speedOffset = clamp(this.speedOffset, -this.maxSpeedDelta, this.maxSpeedDelta);
    this.directionOffset = this.directionOffset + (Math.random() - 0.5) * this.randomizerSpeed;
    this.directionOffset = clamp(this.directionOffset, -this.maxDirectionDelta, this.maxDirectionDelta);
    this.direction = fixAngle(this.mainDirection + this.directionOffset);
    this.speed = this.mainSpeedMs + this.speedOffset
};
weather.Wind.prototype.computeAndSet = function () {
    if (ges.preferences.weather.randomizeWind) {
        this.randomize()
    }
    var vector = [0, 0, 0];
    if (this.direction) {
        var direction = this.direction * degreesToRad;
        vector = [Math.sin(direction), Math.cos(direction), 0];
        vector = this.computeLift(vector)
    }
    weather.currentWindVector = V3.scale(vector, this.speed);
    weather.currentWindDirection = this.direction;
    weather.currentWindSpeed = this.speed * msToKnots
};
weather.Wind.prototype.computeLift = function (vector) {
    var slopeSamplingDistance = 50;
    var liftActiveAltitudeRange = 500;
    var pointZero = ges.aircraft.llaLocation;
    var pointOne = V3.add(pointZero, xyz2lla(V3.scale(vector, slopeSamplingDistance), pointZero));
    var altAtPointZero = ges.getGroundAltitude(pointZero[0], pointZero[1])['location'][2];
    var altAtPointOne = ges.getGroundAltitude(pointOne[0], pointOne[1])['location'][2];
    if (ges.debug && ges.debug.probe) {
        ges.debug.probe.location.setLatLngAlt(pointOne[0], pointOne[1], altAtPointOne)
    }
    var groundClearance = pointZero[2] - altAtPointZero;
    var deltaHeight = altAtPointZero - altAtPointOne;
    var samplingRadius = Math.sqrt(deltaHeight * deltaHeight + slopeSamplingDistance * slopeSamplingDistance);
    var rotation = Math.asin(deltaHeight / samplingRadius);
    var attenuation = (clamp((liftActiveAltitudeRange - groundClearance), 0, liftActiveAltitudeRange) / liftActiveAltitudeRange);
    rotation = rotation * attenuation;
    var axis = V3.cross(vector, [0, 0, 1]);
    return V3.rotate(vector, axis, -rotation)
};
weather.initWind = function (direction, speed) {
    weather.windLayers = [];
    var floor = 0;
    var ceiling = weather.windLayerHeight + Math.random() * weather.windLayerHeight;
    weather.windLayers.push(new weather.Wind(direction, speed, floor, ceiling));
    weather.windLayers[0].computeAndSet();
    if (speed) {
        for (var i = 1; i < weather.windLayerNb; i++) {
            floor = ceiling;
            ceiling = floor + weather.windLayerHeight + Math.random() * weather.windLayerHeight;
            var randomSpeed = speed + (Math.random() * 10 - 5);
            var randomDirection = fixAngle(direction + Math.random() * 360);
            weather.windLayers.push(new weather.Wind(randomDirection, randomSpeed, floor, ceiling))
        }
    }
    ges.aircraft.animationValue['relativeWind'] = fixAngle(direction - ges.aircraft.htr[0] + 180);
    ges.aircraft.animationValue['windSpeed'] = parseInt(speed);
    weather.windLegendOptions = {
        rescale: true,
        scale: {
            x: 0.7,
            y: 0.7
        },
        opacity: 0.5,
        position: {
            x: 90,
            y: 240
        },
        alignment: {
            x: 'right',
            y: 'top'
        }
    };
    if (weather.windLegendOverlay) {
        weather.windLegendOverlay.destroy()
    }
    weather.windLegendOverlay = new ui.font.Message(parseInt(speed) + ' kts', weather.windLegendOptions);
    if (instruments.list['wind']) {
        instruments.list['wind'].update()
    }
};
weather.update = function () {
    if (ges.preferences.weather.cloudCover) {
        weather.updateCloudCover()
    }
    if (weather.windActive && weather.windLayers.length > 0) {
        var alti = ges.aircraft.llaLocation[2];
        var activeLayer = 0;
        for (var i = 1; i < weather.windLayers.length; i++) {
            if (alti < weather.windLayers[i].floor) {
                break
            }
            activeLayer = i
        }
        weather.windLayers[activeLayer].computeAndSet();
        if (weather.activeWindLayer != activeLayer) {
            weather.activeWindLayer = activeLayer;
            weather.windLegendOverlay.destroy();
            weather.windLegendOverlay = new ui.font.Message(parseInt(weather.currentWindSpeed) + ' kts', weather.windLegendOptions)
        }
    }
    weather.updateCloudsRot()
};
weather.placeClouds = function (latitude, longitude, altitude) {
    weather.loadClouds(function () {
        for (var i = 0; i < weather.clouds.length; i++) {
            var cloud = weather.clouds[i];
            cloud.lla = [latitude + weather.cloudSquare - Math.random() * weather.cloudSquare * 2, longitude + weather.cloudSquare - Math.random() * weather.cloudSquare * 2, altitude + (Math.random() * weather.highCeiling) + weather.lowCeiling];
            cloud.location.setLatLngAlt(cloud.lla[0], cloud.lla[1], cloud.lla[2]);
            var scale = Math.random() * 6 + 5;
            cloud.scale.set(scale, scale, scale);
            if (ges.preferences.weather.clouds == false) {
                cloud.placemark.setVisibility(false)
            }
        }
        weather.updateCloudsRot(true)
    })
};
weather.hideClouds = function () {
    for (var i = 0; i <= weather.cloudsQuantity && i < weather.clouds.length; i++) {
        weather.clouds[i].placemark.setVisibility(false)
    }
};
weather.showClouds = function () {
    for (var i = 0; i <= weather.cloudsQuantity && i < weather.clouds.length; i++) {
        weather.clouds[i].placemark.setVisibility(true)
    }
};
weather.setCloudsQuantity = function () {
    var currentQuantity = ges.preferences.weather.clouds ? weather.cloudsQuantity : 0;
    for (var i = 0; i < weather.clouds.length; i++) {
        if (i < currentQuantity) {
            weather.clouds[i].placemark.setVisibility(true)
        } else {
            weather.clouds[i].placemark.setVisibility(false)
        }
    }
};
weather.updateCloudsRot = function (bUpdateAll) {
    if (ges.preferences.weather.clouds && weather.cloudsLoaded) {
        var batchSize;
        if (bUpdateAll) {
            weather.cloudUpdateIndex = 0;
            batchSize = weather.cloudsQuantity
        } else {
            if (weather.cloudUpdateIndex >= weather.cloudsQuantity) {
                weather.cloudUpdateIndex = 0;
                if (weather.thermals.closest < weather.thermals.radius) {
                    weather.thermals.currentVector = [0, 0, weather.thermals.speed]
                } else {
                    weather.thermals.currentVector = [0, 0, 0]
                }
                weather.thermals.closest = 100000
            }
            batchSize = 10
        }
        var limit = weather.cloudUpdateIndex + batchSize;
        limit = limit >= weather.cloudsQuantity ? weather.cloudsQuantity - 1 : limit;
        for (weather.cloudUpdateIndex; weather.cloudUpdateIndex <= limit; weather.cloudUpdateIndex++) {
            var cloud = weather.clouds[weather.cloudUpdateIndex];
            var lookAtHtr = lookAt(cloud.lla, camera.lla, [0, 0, -1]);
            cloud.orientation.set(lookAtHtr[0], lookAtHtr[1], lookAtHtr[2]);
            var distanceFromAircraft = V3.length(lla2xyz(V3.sub([cloud.lla[0], cloud.lla[1], ges.aircraft.llaLocation[2]], ges.aircraft.llaLocation), cloud.lla));
            weather.thermals.closest = Math.min(weather.thermals.closest, distanceFromAircraft);
            if (distanceFromAircraft < weather.thermals.closest && ges.aircraft.llaLocation[2] < cloud.lla[2]) {
                weather.thermals.closest = distanceFromAircraft
            }
        }
    }
};
weather.loadClouds = function (callback) {
    if (!weather.cloudsLoaded) {
        for (var i = 0; i < weather.maxNumberOfClouds; i++) {
            var cloud = {};
            cloud.placemark = ge.createPlacemark('');
            cloud.model = ge.createModel('');
            cloud.link = ge.createLink('');
            cloud.link.setHref(weather.cloud_urls[Math.floor(Math.random() * 4)]);
            cloud.model.setLink(cloud.link);
            cloud.model.setAltitudeMode(ge.ALTITUDE_ABSOLUTE);
            cloud.placemark.setGeometry(cloud.model);
            cloud.location = cloud.model.getLocation();
            cloud.orientation = cloud.model.getOrientation();
            cloud.scale = cloud.model.getScale();
            ge.getFeatures().appendChild(cloud.placemark);
            weather.clouds.push(cloud)
        }
        weather.cloudsLoaded = true;
        if (callback) {
            callback()
        }
    } else {
        if (callback) {
            callback()
        }
    }
};
weather.loadCloudCover = function () {
    var sphere = {};
    sphere.placemark = ge.createPlacemark('');
    sphere.model = ge.createModel('');
    sphere.placemark.setGeometry(sphere.model);
    sphere.link = ge.createLink('');
    sphere.link.setHref(PAGE_PATH + 'models/clouds/sphere.dae?killcache=' + new Date().getTime());
    sphere.model.setLink(sphere.link);
    sphere.orientation = sphere.model.getOrientation();
    sphere.location = sphere.model.getLocation();
    sphere.scale = sphere.model.getScale();
    sphere.model.setAltitudeMode(ge.ALTITUDE_ABSOLUTE);
    ge.getFeatures().appendChild(sphere.placemark);
    weather.cloudSphere = sphere
};
weather.updateCloudCover = function () {
    if (weather.cloudSphere) {
        weather.cloudSphere.location.setLatLngAlt(camera.lla[0], camera.lla[1], (-6278100 / 10) + 8000 - (camera.lla[2] * 1));
        weather.cloudSphere.orientation.set(180, camera.lla[0], fixAngle(-camera.lla[1] + 180));
        var scale = 0.1 + (ges.aircraft.llaLocation[2] / 2000000);
        weather.cloudSphere.scale.set(scale, scale, scale)
    }
};
weather.hideCloudCover = function () {
    if (weather.cloudSphere && weather.cloudSphere.placemark) {
        ge.getFeatures().removeChild(weather.cloudSphere.placemark)
    }
};
weather.showCloudCover = function () {
    if (weather.cloudSphere && weather.cloudSphere.placemark) {
        ge.getFeatures().appendChild(weather.cloudSphere.placemark)
    } else {
        weather.loadCloudCover()
    }
};
var camera = window.camera || {};
camera.modes = ['follow', 'cockpit', 'cockpitless', 'chase', 'free'];
camera.currentMode = 0;
camera.currentModeName = 'follow';
camera.lastCurrentMode = 0;
camera.openSlave = false;
camera.groudAvoidanceSpeed = 10;
camera.groundAvoidanceMargin = 1;
camera.init = function () {
    camera.cam = ge.getView().copyAsCamera(ge.ALTITUDE_ABSOLUTE);
    camera.lla = [0, 0, 0];
    camera.htr = [0, 0, 0];
    camera.hasMoved = false
};
camera.reset = function () {
    camera.definitions = {
        'follow': {
            'orientation': [0, 5, 0]
        },
        'cockpit': {},
        'cockpitless': {},
        'chase': {},
        'free': {}
    };
    var menu = '';
    for (var i in ges.aircraft.setup.cameras) {
        if (!camera.definitions[i]) {
            menu += '<li><a href="#" onmouseup="camera.set(null, \'' + i + '\');">' + i + '</a></li>'
        }
    }
    if (menu.length) {
        menu += '<iframe frame-border="no" class="gefs-shim-iframe"></iframe>';
        $('.gefs-extra-views').show().find('.gefs-extra-views-holder').html(menu)
    } else {
        $('.gefs-extra-views').hide()
    }
    var setupDefinition = $.extend(true, {}, ges.aircraft.setup.cameras, camera.definitions);
    for (i in setupDefinition) {
        var definition = setupDefinition[i];
        definition.position = definition.position || [0, 0, 0];
        definition.orientations = {};
        definition.orientations.neutral = definition.orientation || [0, 0, 0];
        definition.orientations.current = V3.dup(definition.orientations.neutral);
        definition.orientations.last = V3.dup(definition.orientations.neutral);
        camera.definitions[i] = definition
    }
    camera.currentMode = 0;
    camera.currentModeName = 'follow';
    for (var i in camera.definitions) {
        var definition = camera.definitions[i];
        definition.orientations.current = V3.dup(definition.orientations.neutral);
        definition.orientations.last = V3.dup(definition.orientations.neutral)
    }
    camera.definitions['follow'].lastUsedHtr = V3.dup(ges.aircraft.htr);
    camera.setToNeutral();
    camera.lla = [0, 0, 0];
    camera.htr = [0, 0, 0];
    camera.zoomDistance = 0;
    camera.set(camera.currentMode);
    camera.update(0)
};
camera.cycle = function () {
    var mode = camera.currentMode + 1;
    if (mode >= camera.modes.length) {
        mode = 0
    }
    camera.set(mode)
};
camera.set = function (mode, name) {
    camera.currentMode = mode;
    camera.currentModeName = name || camera.modes[mode];
    if (camera.currentModeName == 'follow') {
        camera.cam = ge.getView().copyAsCamera(ge.ALTITUDE_ABSOLUTE);
        var metricOffset = V3.scale(ges.aircraft.object3d.getWorldFrame()[1], -camera.definitions['follow'].distance);
        var camOffset = xyz2lla(metricOffset, ges.aircraft.llaLocation);
        camera.lla = V3.add(ges.aircraft.llaLocation, camOffset);
        camera.avoidGround();
        var camHtr = lookAt(ges.aircraft.llaLocation, camera.lla, [0, 0, 1]);
        camera.cam.set(camera.lla[0], camera.lla[1], camera.lla[2], ge.ALTITUDE_ABSOLUTE, camHtr[0], -camHtr[1] + 90, 0);
        ge.getView().setAbstractView(camera.cam);
        instruments.updateScreenPositions()
    }
    if (camera.currentModeName == 'free') {
        camera.cam.setRoll(0);
        ge.getView().setAbstractView(camera.cam);
        instruments.updateScreenPositions()
    }
    if (ges.aircraft) {
        if (camera.currentModeName == 'cockpitless') {
            ges.aircraft.setVisibility(false);
            instruments.updateScreenPositions()
        } else {
            ges.aircraft.setVisibility(true)
        }
    }
    if (camera.currentModeName == 'cockpit') {
        if (ges.aircraft.setup.cockpitScaleFix) {
            ges.aircraft.fixCockpitScale(ges.aircraft.setup.cockpitScaleFix)
        }
        if (ges.aircraft.setup.cockpitModel) {
            ges.aircraft.loadCockpit()
        }
        instruments.updateCockpitPositions()
    } else {
        ges.aircraft.fixCockpitScale(1)
    }
    ges.aircraft.animationValue['view'] = camera.currentModeName;
    ges.aircraft.placeParts();
    camera.hasMoved = true
};
camera.translate = function (delta) {
    if (camera.currentModeName == 'follow') {
        camera.zoomDistance += delta;
        if (camera.zoomDistance < -ges.aircraft.setup.cameras.follow.distance + 5) {
            camera.zoomDistance = -ges.aircraft.setup.cameras.follow.distance + 5
        }
        return true
    }
    return false
};
camera.rotate = function (heading, tilt) {
    if (camera.currentModeName == 'follow' || camera.currentModeName == 'cockpit') {
        var definition = camera.definitions[camera.currentModeName];
        definition.orientations.current[0] = definition.orientations.last[0] - heading;
        definition.orientations.current[1] = definition.orientations.last[1] + tilt;
        if (camera.currentModeName == 'cockpit') {
            camera.hasMoved = true
        }
        return true
    }
    return false
};
camera.isHandlingMouseRotation = function () {
    if (camera.currentModeName == 'follow' || camera.currentModeName == 'cockpit') {
        return true
    }
    return false
};
camera.setRotation = function (heading, tilt) {
    var definition = camera.definitions[camera.currentModeName];
    if (camera.currentModeName == 'follow') {
        definition.orientations.current[0] = heading;
        definition.orientations.current[1] = tilt || definition.orientations.last[1];
        return true
    }
    if (camera.currentModeName == 'cockpit') {
        heading = fixAngle(heading + 180);
        definition.orientations.current[0] = heading || definition.orientations.last[0];
        definition.orientations.current[1] = tilt || definition.orientations.last[1];
        camera.hasMoved = true;
        return true
    }
    return false
};
camera.saveRotation = function () {
    var definition = camera.definitions[camera.currentModeName];
    definition.orientations.last = V3.dup(definition.orientations.current)
};
camera.setToNeutral = function () {
    var definition = camera.definitions[camera.currentModeName];
    definition.orientations.current = V3.dup(definition.orientations.neutral);
    definition.orientations.last = V3.dup(definition.orientations.neutral);
    if (camera.currentModeName == 'cockpit') {
        camera.hasMoved = true
    }
};
camera.avoidGround = function () {
    var groudAltAtcurrentLla = ges.getGroundAltitude(camera.lla[0], camera.lla[1])['location'][2];
    var groundDistance = camera.lla[2] - groudAltAtcurrentLla;
    if (groundDistance <= camera.groundAvoidanceMargin) {
        camera.lla[2] = groudAltAtcurrentLla + camera.groundAvoidanceMargin
    }
    camera.hasMoved = true
};
camera.update = function (dt) {
    var aircraft = ges.aircraft;
    var aircraftFrame = ges.aircraft.object3d.getWorldFrame();
    var definition = camera.definitions[camera.currentModeName];
    camera.collisionResult = null;
    if (camera.currentModeName == 'follow') {
        var lookatPoint = V3.add(aircraft.llaLocation, [0, 0, definition.lookAtHeight || 0]);
        var offsetHeading = definition.orientations.current[0];
        var offsetTilt = definition.orientations.current[1];
        var inp = 1 - Math.exp(-dt / 0.5);
        var inpHeading = definition.lastUsedHtr[0] + fixAngle(aircraft.htr[0] - definition.lastUsedHtr[0]) * inp;
        var inpTilt = definition.lastUsedHtr[1] + fixAngle(aircraft.htr[1] - definition.lastUsedHtr[1]) * inp;
        definition.lastUsedHtr = [inpHeading, inpTilt, 0];
        var newHeading = inpHeading + offsetHeading;
        var newTilt = inpTilt + offsetTilt;
        var frame = M33.rotationXYZ(M33.identity(), [newTilt * degreesToRad, 0, newHeading * degreesToRad]);
        var metricOffset = V3.scale(frame[1], -(definition.distance + camera.zoomDistance));
        var camOffset = xyz2lla(metricOffset, aircraft.llaLocation);
        camera.lla = V3.add(lookatPoint, camOffset);
        camera.avoidGround();
        camera.htr = lookAt(lookatPoint, camera.lla, [0, 0, 1]);
        camera.cam.set(camera.lla[0], camera.lla[1], camera.lla[2], ge.ALTITUDE_ABSOLUTE, fixAngle360(camera.htr[0]), fixAngle360(90 - camera.htr[1]), 0);
        ge.getView().setAbstractView(camera.cam)
    } else if (camera.currentModeName == 'chase') {
        if (!controls.mouse.down) {
            camera.cam = ge.getView().copyAsCamera(ge.ALTITUDE_ABSOLUTE);
            camera.lla = [camera.cam.getLatitude(), camera.cam.getLongitude(), camera.cam.getAltitude()];
            camera.htr = lookAt(aircraft.llaLocation, camera.lla, [0, 0, 1]);
            camera.cam.set(camera.lla[0], camera.lla[1], camera.lla[2], ge.ALTITUDE_ABSOLUTE, camera.htr[0], -camera.htr[1] + 90, 0);
            ge.getView().setAbstractView(camera.cam)
        }
    } else if (camera.currentModeName == 'free') {
        camera.cam = ge.getView().copyAsCamera(ge.ALTITUDE_ABSOLUTE);
        camera.lla = [camera.cam.getLatitude(), camera.cam.getLongitude(), camera.cam.getAltitude()]
    } else {
        var newHeading = definition.orientations.current[0];
        var newTilt = definition.orientations.current[1];
        var frame = M33.rotationXYZ(aircraftFrame, [-newTilt * degreesToRad, 0, newHeading * degreesToRad]);
        camera.htr = M33.getOrientation(frame);
        camera.worldPosition = V3.dup(definition.position);
        camera.worldPosition = aircraft.object3d.setVectorWorldPosition(camera.worldPosition);
        if (camera.currentModeName == 'cockpit') {
            camera.worldPosition = V3.scale(camera.worldPosition, ges.aircraft.setup.cockpitScaleFix)
        }
        camera.lla = V3.add(aircraft.llaLocation, xyz2lla(camera.worldPosition, aircraft.llaLocation));
        camera.cam.set(camera.lla[0], camera.lla[1], camera.lla[2], ge.ALTITUDE_ABSOLUTE, fixAngle360(camera.htr[0]), fixAngle360(90 - camera.htr[1]), camera.htr[2]);
        camera.collisionResult = ges.getGroundAltitude(camera.lla[0], camera.lla[1]);
        camera.collisionResult.normal = ges.getNormalFromCollision(camera.collisionResult);
        camera.collisionResult.location[2] = ges.getAltitudeAtPointFromCollisionResult(camera.collisionResult, V3.scale(camera.worldPosition, -1));
        ge.getView().setAbstractView(camera.cam)
    }
    camera.htr = [camera.cam.getHeading(), camera.cam.getTilt(), camera.cam.getRoll()];
    if (camera.openSlave) {
        camera.updateSlaveData()
    }
    if (camera.currentModeName == 'cockpit' && camera.hasMoved) {
        instruments.updateCockpitPositions();
        camera.hasMoved = false
    }
};
camera.openSlaveWindow = function (position) {
    var mainWindowLeft = window.screenX || window.screenLeft;
    var windowFeatures = 'left=' + (mainWindowLeft + (position * (window.outerWidth || 1024)));
    var slaveWindow = window.open('slave.html' + '?order=' + position, ('gefsSlave' + position).replace('-', 'l'), windowFeatures);
    if (slaveWindow) {
        camera.openSlave = true
    } else {}
};
camera.updateSlaveData = function () {
    camera.transform = M33.setFromEuler([(90 - camera.htr[1]) * degreesToRad, camera.htr[2] * degreesToRad, camera.htr[0] * degreesToRad])
};
var instruments = window.instruments || {};
instruments.stackPosition = {
    x: 0,
    y: 0
};
instruments.defaultMargin = 10;
instruments.visible = true;
instruments.list = {};
instruments.definitions = {
    'airspeed': {
        stackX: true,
        overlay: {
            url: PAGE_PATH + 'overlays/instruments/airspeed.png',
            size: {
                x: 200,
                y: 200
            },
            anchor: {
                x: 100,
                y: 100
            },
            position: {
                x: 0,
                y: 110
            },
            rescale: true,
            rescalePosition: true,
            overlays: [{
                animations: [{
                    type: 'rotate',
                    value: 'kias',
                    ratio: -1.5,
                    min: 0
                }],
                url: PAGE_PATH + 'overlays/instruments/airspeed-hand.png',
                anchor: {
                    x: 10,
                    y: 34
                },
                size: {
                    x: 20,
                    y: 120
                },
                position: {
                    x: 0,
                    y: 0
                }
            }]
        }
    },
    'airspeedJet': {
        stackX: true,
        overlay: {
            url: PAGE_PATH + 'overlays/instruments/airspeed-high.png',
            size: {
                x: 200,
                y: 200
            },
            anchor: {
                x: 100,
                y: 100
            },
            position: {
                x: 0,
                y: 110
            },
            rescale: true,
            rescalePosition: true,
            overlays: [{
                animations: [{
                    type: 'rotate',
                    value: 'kias',
                    ratio: -0.6,
                    min: 0
                }],
                url: PAGE_PATH + 'overlays/instruments/airspeed-hand.png',
                anchor: {
                    x: 10,
                    y: 34
                },
                size: {
                    x: 20,
                    y: 120
                },
                position: {
                    x: 0,
                    y: 0
                }
            }]
        }
    },
    'airspeedSupersonic': {
        stackX: true,
        overlay: {
            url: PAGE_PATH + 'overlays/instruments/airspeed-supersonic.png',
            size: {
                x: 200,
                y: 200
            },
            anchor: {
                x: 100,
                y: 100
            },
            position: {
                x: 0,
                y: 110
            },
            rescale: true,
            rescalePosition: true,
            overlays: [{
                animations: [{
                    type: 'rotate',
                    value: 'kias',
                    ratio: -0.3,
                    min: 0
                }],
                url: PAGE_PATH + 'overlays/instruments/airspeed-hand.png',
                anchor: {
                    x: 10,
                    y: 34
                },
                size: {
                    x: 20,
                    y: 120
                },
                position: {
                    x: 0,
                    y: 0
                }
            }, {
                animations: [{
                    type: 'rotate',
                    value: 'mach',
                    ratio: -72,
                    min: 0
                }],
                url: PAGE_PATH + 'overlays/instruments/mach-hand.png',
                anchor: {
                    x: 5,
                    y: 5
                },
                size: {
                    x: 11,
                    y: 31
                },
                position: {
                    x: -70,
                    y: -70
                }
            }]
        }
    },
    'altitude': {
        stackX: true,
        overlay: {
            url: PAGE_PATH + 'overlays/instruments/altitude.png',
            size: {
                x: 200,
                y: 200
            },
            anchor: {
                x: 100,
                y: 100
            },
            position: {
                x: 0,
                y: 110
            },
            rescale: true,
            rescalePosition: true,
            overlays: [{
                animations: [{
                    type: 'rotate',
                    value: 'altitude',
                    ratio: -0.0036
                }],
                url: PAGE_PATH + 'overlays/instruments/tenthousandhand.png',
                anchor: {
                    x: 8,
                    y: 0
                },
                size: {
                    x: 16,
                    y: 91
                },
                position: {
                    x: 0,
                    y: 0
                }
            }, {
                animations: [{
                    type: 'rotate',
                    value: 'altitude',
                    ratio: -0.036
                }],
                url: PAGE_PATH + 'overlays/instruments/small-hand.png',
                anchor: {
                    x: 10,
                    y: 28
                },
                size: {
                    x: 20,
                    y: 87
                },
                position: {
                    x: 0,
                    y: 0
                }
            }, {
                animations: [{
                    type: 'rotate',
                    value: 'altitude',
                    ratio: -0.36
                }],
                url: PAGE_PATH + 'overlays/instruments/airspeed-hand.png',
                anchor: {
                    x: 10,
                    y: 34
                },
                size: {
                    x: 20,
                    y: 120
                },
                position: {
                    x: 0,
                    y: 0
                }
            }]
        }
    },
    'vario': {
        stackX: true,
        overlay: {
            url: PAGE_PATH + 'overlays/instruments/vario.png',
            size: {
                x: 200,
                y: 200
            },
            anchor: {
                x: 100,
                y: 100
            },
            position: {
                x: 0,
                y: 110
            },
            rescale: true,
            rescalePosition: true,
            overlays: [{
                animations: [{
                    type: 'rotate',
                    value: 'climbrate',
                    ratio: -0.09,
                    max: 1900,
                    min: -1900,
                    offset: 90
                }],
                url: PAGE_PATH + 'overlays/instruments/airspeed-hand.png',
                anchor: {
                    x: 10,
                    y: 34
                },
                size: {
                    x: 20,
                    y: 120
                },
                position: {
                    x: 0,
                    y: 0
                }
            }]
        }
    },
    'varioJet': {
        stackX: true,
        overlay: {
            url: PAGE_PATH + 'overlays/instruments/vario-high.png',
            size: {
                x: 200,
                y: 200
            },
            anchor: {
                x: 100,
                y: 100
            },
            position: {
                x: 0,
                y: 110
            },
            rescale: true,
            rescalePosition: true,
            overlays: [{
                animations: [{
                    type: 'rotate',
                    value: 'climbrate',
                    ratio: -0.025,
                    max: 6000,
                    min: -6000,
                    offset: 90
                }],
                url: PAGE_PATH + 'overlays/instruments/airspeed-hand.png',
                anchor: {
                    x: 10,
                    y: 34
                },
                size: {
                    x: 20,
                    y: 120
                },
                position: {
                    x: 0,
                    y: 0
                }
            }]
        }
    },
    'compass': {
        stackX: true,
        overlay: {
            url: PAGE_PATH + 'overlays/instruments/compass.png',
            size: {
                x: 200,
                y: 200
            },
            anchor: {
                x: 100,
                y: 100
            },
            position: {
                x: 0,
                y: 110
            },
            rescale: true,
            rescalePosition: true,
            overlays: [{
                animations: [{
                    type: 'rotate',
                    value: 'heading',
                    ratio: 1
                }],
                url: PAGE_PATH + 'overlays/instruments/compass-grad.png',
                anchor: {
                    x: 90,
                    y: 90
                },
                size: {
                    x: 181,
                    y: 181
                },
                position: {
                    x: 0,
                    y: 0
                }
            }, {
                url: PAGE_PATH + 'overlays/instruments/compass-hand.png',
                anchor: {
                    x: 25,
                    y: 26
                },
                size: {
                    x: 50,
                    y: 109
                },
                position: {
                    x: 0,
                    y: 0
                }
            }]
        }
    },
    'attitude': {
        stackX: true,
        overlay: {
            url: PAGE_PATH + 'overlays/instruments/attitude.png',
            size: {
                x: 200,
                y: 200
            },
            anchor: {
                x: 100,
                y: 100
            },
            position: {
                x: 0,
                y: 110
            },
            rescale: true,
            rescalePosition: true,
            overlays: [{
                animations: [{
                    type: 'rotate',
                    value: 'aroll',
                    name: 'attitude',
                    ratio: -1,
                    min: -50,
                    max: 50
                }, {
                    type: 'translateY',
                    value: 'atilt',
                    ratio: -2,
                    offset: 75,
                    min: -25,
                    max: 25
                }],
                url: PAGE_PATH + 'overlays/instruments/attitude-hand.png',
                anchor: {
                    x: 100,
                    y: 75
                },
                size: {
                    x: 200,
                    y: 150
                },
                position: {
                    x: 0,
                    y: 0
                },
                iconFrame: {
                    x: 200,
                    y: 150
                }
            }, {
                animations: [{
                    type: 'rotate',
                    value: 'aroll',
                    ratio: -1,
                    min: -60,
                    max: 60
                }],
                url: PAGE_PATH + 'overlays/instruments/attitude-grad.png',
                anchor: {
                    x: 100,
                    y: 100
                },
                size: {
                    x: 200,
                    y: 200
                },
                position: {
                    x: 0,
                    y: 0
                }
            }, {
                url: PAGE_PATH + 'overlays/instruments/attitude-pointer.png',
                anchor: {
                    x: 100,
                    y: 100
                },
                size: {
                    x: 200,
                    y: 200
                },
                position: {
                    x: 0,
                    y: 0
                }
            }]
        }
    },
    'attitudeJet': {
        stackX: true,
        overlay: {
            url: PAGE_PATH + 'overlays/instruments/attitude-jet.png',
            size: {
                x: 200,
                y: 200
            },
            anchor: {
                x: 100,
                y: 100
            },
            position: {
                x: 0,
                y: 110
            },
            rescale: true,
            rescalePosition: true,
            overlays: [{
                animations: [{
                    type: 'rotate',
                    value: 'aroll',
                    ratio: -1,
                    min: -180,
                    max: 180
                }, {
                    type: 'translateY',
                    value: 'atilt',
                    ratio: -2,
                    offset: 330,
                    min: -90,
                    max: 90
                }],
                url: PAGE_PATH + 'overlays/instruments/attitude-jet-hand.png',
                anchor: {
                    x: 100,
                    y: 70
                },
                size: {
                    x: 200,
                    y: 140
                },
                position: {
                    x: 0,
                    y: 0
                },
                iconFrame: {
                    x: 200,
                    y: 140
                }
            }, {
                animations: [{
                    type: 'rotate',
                    value: 'aroll',
                    ratio: -1,
                    min: -60,
                    max: 60
                }],
                url: PAGE_PATH + 'overlays/instruments/attitude-jet-pointer.png',
                anchor: {
                    x: 100,
                    y: 100
                },
                size: {
                    x: 200,
                    y: 200
                },
                position: {
                    x: 0,
                    y: 0
                }
            }, {
                url: PAGE_PATH + 'overlays/instruments/attitude-jet.png',
                anchor: {
                    x: 100,
                    y: 100
                },
                size: {
                    x: 200,
                    y: 200
                },
                position: {
                    x: 0,
                    y: 0
                }
            }]
        }
    },
    'rpmJet': {
        stackX: true,
        overlay: {
            url: PAGE_PATH + 'overlays/instruments/jet-rpm.png',
            size: {
                x: 200,
                y: 200
            },
            anchor: {
                x: 100,
                y: 100
            },
            position: {
                x: 0,
                y: 110
            },
            rescale: true,
            rescalePosition: true,
            overlays: [{
                animations: [{
                    type: 'rotate',
                    value: 'rpm',
                    ratio: -0.036,
                    offset: 0
                }],
                url: PAGE_PATH + 'overlays/instruments/jet-rpm-hand.png',
                anchor: {
                    x: 6,
                    y: 15
                },
                size: {
                    x: 14,
                    y: 34
                },
                position: {
                    x: -38,
                    y: 45
                }
            }, {
                animations: [{
                    type: 'rotate',
                    value: 'rpm',
                    ratio: -0.027,
                    offset: 0
                }],
                url: PAGE_PATH + 'overlays/instruments/airspeed-hand.png',
                anchor: {
                    x: 10,
                    y: 34
                },
                size: {
                    x: 20,
                    y: 120
                },
                position: {
                    x: 0,
                    y: 0
                }
            }]
        }
    },
    'rpm': {
        stackX: true,
        overlay: {
            url: PAGE_PATH + 'overlays/instruments/rpm.png',
            size: {
                x: 100,
                y: 100
            },
            anchor: {
                x: 50,
                y: 50
            },
            position: {
                x: 0,
                y: 50
            },
            position: {
                x: 0,
                y: 110
            },
            rescale: true,
            rescalePosition: true,
            overlays: [{
                animations: [{
                    type: 'rotate',
                    value: 'rpm',
                    ratio: -0.03,
                    offset: 120
                }],
                url: PAGE_PATH + 'overlays/instruments/rpm-hand.png',
                anchor: {
                    x: 14,
                    y: 14
                },
                size: {
                    x: 28,
                    y: 55
                },
                position: {
                    x: 0,
                    y: 0
                }
            }]
        }
    },
    'wind': {
        overlay: {
            url: PAGE_PATH + 'overlays/hud/wind-body.png',
            opacity: 0.7,
            scale: {
                x: 0.7,
                y: 0.7
            },
            position: {
                x: 20,
                y: 20
            },
            anchor: {
                x: 200,
                y: 200
            },
            size: {
                x: 200,
                y: 200
            },
            alignment: {
                x: 'right',
                y: 'top'
            },
            rescale: true,
            rescalePosition: true,
            overlays: [{
                animations: [{
                    type: 'rotate',
                    value: 'relativeWind',
                    ratio: -1
                }],
                url: PAGE_PATH + 'overlays/hud/wind-hand.png',
                anchor: {
                    x: 100,
                    y: 100
                },
                size: {
                    x: 200,
                    y: 200
                },
                position: {
                    x: -100,
                    y: -100
                },
                opacity: 0.7
            }]
        }
    },
    'spoilers': {
        stackY: true,
        overlay: {
            url: PAGE_PATH + 'overlays/instruments/spoilers.png',
            visibility: false,
            anchor: {
                x: 85,
                y: 0
            },
            alignment: {
                x: 'right',
                y: 'bottom'
            },
            position: {
                x: 10,
                y: 0
            },
            size: {
                x: 85,
                y: 21
            },
            rescale: true,
            rescalePosition: true,
            animations: [{
                value: 'airbrakesPosition',
                type: 'show',
                whenNot: [0]
            }]
        }
    },
    'brakes': {
        stackY: true,
        overlay: {
            url: PAGE_PATH + 'overlays/instruments/brakes.png',
            visibility: false,
            anchor: {
                x: 73,
                y: 0
            },
            alignment: {
                x: 'right',
                y: 'bottom'
            },
            position: {
                x: 10,
                y: 0
            },
            size: {
                x: 73,
                y: 19
            },
            rescale: true,
            rescalePosition: true,
            animations: [{
                value: 'brakes',
                type: 'show',
                when: [1]
            }]
        }
    },
    'gear': {
        stackY: true,
        overlay: {
            url: PAGE_PATH + 'overlays/instruments/gear.png',
            anchor: {
                x: 60,
                y: 0
            },
            alignment: {
                x: 'right',
                y: 'bottom'
            },
            position: {
                x: 10,
                y: 0
            },
            size: {
                x: 46,
                y: 16
            },
            rescale: true,
            rescalePosition: true,
            overlays: [{
                animations: [{
                    value: 'gearPosition',
                    type: 'show',
                    when: [0]
                }],
                url: PAGE_PATH + 'overlays/instruments/led-green.png',
                anchor: {
                    x: 0,
                    y: 0
                },
                size: {
                    x: 12,
                    y: 12
                },
                position: {
                    x: -10,
                    y: 2
                }
            }, {
                animations: [{
                    value: 'gearPosition',
                    type: 'show',
                    when: [1]
                }],
                url: PAGE_PATH + 'overlays/instruments/led-red.png',
                anchor: {
                    x: 0,
                    y: 0
                },
                size: {
                    x: 12,
                    y: 12
                },
                position: {
                    x: -10,
                    y: 2
                }
            }, {
                animations: [{
                    value: 'gearPosition',
                    type: 'show',
                    whenNot: [0, 1]
                }],
                url: PAGE_PATH + 'overlays/instruments/led-orange.png',
                anchor: {
                    x: 0,
                    y: 0
                },
                size: {
                    x: 12,
                    y: 12
                },
                position: {
                    x: -10,
                    y: 2
                }
            }]
        }
    },
    'flaps': {
        stackY: true,
        overlay: {
            url: PAGE_PATH + 'overlays/instruments/flaps.png',
            anchor: {
                x: 74,
                y: 0
            },
            alignment: {
                x: 'right',
                y: 'bottom'
            },
            position: {
                x: 10,
                y: 0
            },
            size: {
                x: 74,
                y: 23
            },
            rescale: true,
            rescalePosition: true,
            overlays: [{
                animations: [{
                    type: 'rotate',
                    value: 'flapsPosition',
                    ratio: -20
                }],
                url: PAGE_PATH + 'overlays/instruments/flaps-hand.png',
                anchor: {
                    x: 0,
                    y: 5
                },
                size: {
                    x: 17,
                    y: 6
                },
                position: {
                    x: -23,
                    y: 25
                }
            }]
        }
    }
};
instruments.init = function (newInstrumentList) {
    if (!newInstrumentList || newInstrumentList == 'default') {
        newInstrumentList = {
            'airspeed': '',
            'altitude': '',
            'attitude': '',
            'vario': '',
            'compass': '',
            'rpm': '',
            'brakes': ''
        }
    }
    if (newInstrumentList == 'jet') {
        newInstrumentList = {
            'airspeedJet': '',
            'altitude': '',
            'attitudeJet': '',
            'varioJet': '',
            'compass': '',
            'rpmJet': '',
            'brakes': ''
        }
    }
    for (var i in instruments.list) {
        instruments.list[i].destroy()
    }
    instruments.stackPosition = {
        x: 10,
        y: 100
    };
    instruments.list = {};
    for (var i in newInstrumentList) {
        var definition = $.extend(true, {}, newInstrumentList[i], instruments.definitions[i]);
        if (definition) {
            instruments.list[i] = new Indicator(definition)
        }
    }
    if (!instruments.list['wind']) {
        instruments.definitions['wind'].visibility = ges.preferences.weather.windActive ? true : false;
        instruments.list['wind'] = new Indicator(instruments.definitions['wind'])
    }
    instruments.resizeHandler = ges.addResizeHandler(function () {
        instruments.updateScreenPositions()
    })
};
instruments.toggle = function () {
    if (instruments.visible) {
        instruments.hide()
    } else {
        instruments.show()
    }
};
instruments.hide = function () {
    for (var i in instruments.list) {
        instruments.list[i].hide()
    }
    instruments.visible = false
};
instruments.show = function () {
    for (var i in instruments.list) {
        instruments.list[i].show()
    }
    instruments.visible = true
};
instruments.update = function () {
    for (var i in instruments.list) {
        var instrument = instruments.list[i];
        instrument.update()
    }
};
instruments.updateCockpitPositions = function () {
    for (var i in instruments.list) {
        var instrument = instruments.list[i];
        instrument.updateCockpitPosition()
    }
};
instruments.updateScreenPositions = function () {
    for (var i in instruments.list) {
        var instrument = instruments.list[i];
        if (camera.currentModeName == 'cockpit' && instrument.definition.cockpit) {
            instrument.updateCockpitPosition()
        } else {
            instrument.overlay.resizeFromScreen()
        }
    }
};
var Indicator = function (definition) {
    if (definition.cockpit && definition.cockpit.position) {
        definition.cockpit.position = V3.scale(definition.cockpit.position, ges.aircraft.setup.scale)
    }
    this.definition = $.extend(this.definition, definition);
    var overlayDefinition = definition.overlay;
    overlayDefinition.cockpit = !! this.definition.cockpit;
    this.visibility = overlayDefinition.visibility != undefined ? overlayDefinition.visibility : true;
    if (definition.stackX) {
        var halfWidth = overlayDefinition.size.x / 2;
        var defPosX = overlayDefinition.position.x;
        overlayDefinition.position.x = instruments.stackPosition.x + halfWidth + defPosX;
        instruments.stackPosition.x += overlayDefinition.size.x + instruments.defaultMargin + defPosX
    }
    if (definition.stackY) {
        var halfHeight = overlayDefinition.size.y / 2;
        var defPosY = overlayDefinition.position.y;
        overlayDefinition.position.y = instruments.stackPosition.y + halfHeight + defPosY;
        instruments.stackPosition.y += overlayDefinition.size.y + instruments.defaultMargin + defPosY
    }
    this.overlay = new Overlay(overlayDefinition);
    return this
};
Indicator.prototype.show = function () {
    this.overlay.setVisibility(true);
    this.visibility = true
};
Indicator.prototype.hide = function () {
    this.overlay.setVisibility(false);
    this.visibility = false
};
Indicator.prototype.setVisibility = function (visibility) {
    this.overlay.setVisibility(visibility);
    this.visibility = visibility
};
Indicator.prototype.updateCockpitPosition = function () {
    if (this.definition.cockpit) {
        var position = this.definition.cockpit.position;
        ges.aircraft.object3d.setVectorWorldPosition(position);
        position.worldPosition = V3.scale(position.worldPosition, ges.aircraft.setup.cockpitScaleFix);
        var lla = V3.add(ges.aircraft.llaLocation, xyz2lla(position.worldPosition, ges.aircraft.llaLocation));
        var screenCoord = ge.getView().project(lla[0], lla[1], lla[2], ge.ALTITUDE_ABSOLUTE);
        var x = screenCoord.getX();
        var y = ges.viewportHeight - screenCoord.getY();
        var camDistance = V3.length(V3.sub(camera.worldPosition, position.worldPosition));
        ges.debug.watch('camDistance', camDistance);
        var scale = (0.8 / camDistance) * (this.definition.cockpit.scale || 1) * ges.aircraft.setup.cockpitScaleFix;
        var fovScale = clamp(ges.viewportWidth / viewportReferenceWidth, 0.01, 1);
        this.overlay.scale = {
            x: scale * fovScale,
            y: scale * fovScale
        };
        var position = {
            x: x,
            y: y
        };
        this.overlay.rotation = fixAngle(camera.definitions.cockpit.orientations.current[0]) * 0.3;
        this.overlay.place(position)
    }
};
Indicator.prototype.update = function () {
    this.overlay.animate();
    if (this.definition.animations) {
        for (var a = 0; a < this.definition.animations.length; a++) {
            var animation = this.definition.animations[a];
            var value = ges.animFilter(animation);
            switch (animation.type) {
            case 'show':
                if (this.visibility) {
                    this.overlay.setVisibility(value)
                }
                break
            }
        }
    }
};
Indicator.prototype.destroy = function () {
    if (this.overlay) {
        this.overlay.destroy()
    }
    for (var i = 0; i < this.overlay.children.length; i++) {
        this.overlay.children[i].destroy()
    }
};
var audio = window.audio || {};
audio.init = function (soundSet, sounds) {
    sounds = sounds || [];
    audio.soundSet = soundSet;
    audio.sounds = {};
    for (var i = 0, l = sounds.length; i < l; i++) {
        var sound = sounds[i];
		console.log(sound);
        audio.sounds[sound.id] = sound;
    }
    if (audio.soundplayer) {
        swfobject.removeSWF("soundplayer");
    }
    audio.soundplayer = null;
    audio.reset();
    var holder = document.createElement('div');
    holder.id = 'soundplayer';
    $(holder).appendTo('.soundplayerContainer');
    var params = {
        'allowScriptAccess': 'always'
    };
    
	var path = document.URL + 'sounds/' + soundSet + '.swf?killcache=' + ges.killCache;
	
	console.log(path);
	console.log(audio);
	
	swfobject.embedSWF(path, "soundplayer", "10", "10", "8", false, false, params, false, function (e) {
        if (e.success && e.ref) {
            audio.soundplayer = e.ref;
            audio.soundSet = soundSet;
            if (ges.preferences.sound) {
				console.log("Success");
                if (audio.on !== false) {
                    audio.on = true
                }
            } else {
			console.log("Fail");
                audio.mute()
            }
        }
    })
};
audio.reset = function () {
    for (var i in audio.sounds) {
        var sound = audio.sounds[i];
        var effects = sound.effects;
        sound.cut = sound.cut || [0, 0];
        sound.loop = sound.loop || 0;
        sound.playing = false;
        if (audio.soundSet == 'player') {
            sound.loading = false;
            sound.loaded = false
        } else {
            sound.loading = true;
            sound.loaded = true
        }
        for (var e in effects) {
            var effect = effects[e];
            effect.lastValue = null;
            if (e == 'volume') {
                effect.ratio = 100
            }
        }
    }
};
audio.loaded = function (soundId) {
    audio.sounds[soundId].loaded = true
};
audio.stopped = function (soundId) {
    audio.sounds[soundId].playing = false
};
audio.update = function (soundSet) {
    if (audio.on && audio.soundplayer) {
        for (var i in audio.sounds) {
            var sound = audio.sounds[i];
            var effects = sound.effects;
            if (sound.file && !sound.loading && audio.soundplayer.loadMP3) {
                audio.soundplayer.loadMP3(sound.id, sound.file + '?killcache=' + ges.killCache, sound.cut[0], sound.cut[1], sound.lowLatency || false, sound.fadeDuration || 0);
                sound.loading = true;
                continue
            }
            if (!sound.loaded) {
                continue
            }
            for (var e in effects) {
                var effect = effects[e];
                var value = ges.animFilter(effect);
                if (effect.lastValue == value) {
                    continue
                }
                switch (e) {
                case "volume":
                    var fading = ges.aircraft.animationValue['cameraAircraftDistance'] * 0.01;
                    value = value - fading;
                    if (value <= 0 && sound.playing === true) {
                        try {
                            sound.playing = 'stopping';
                            audio.soundplayer.stopSound(sound.id)
                        } catch (e) {}
                    }
                    if (value > 0) {
                        if (!sound.playing) {
                            try {
                                sound.playing = true;
                                audio.soundplayer.playSound(sound.id)
                            } catch (e) {}
                        }
                        try {
                            audio.soundplayer.setVolume(sound.id, value)
                        } catch (e) {}
                    }
                    break;
                case "pitch":
                    var doppler = ges.aircraft.animationValue['cameraAircraftSpeed'] * 0.001;
                    value += doppler;
                    ges.debug.watch('pitch', value);
                    try {
                        audio.soundplayer.setRate(sound.id, value)
                    } catch (e) {}
                    break;
                case "start":
                    if (value > 0) {
                        if (!sound.playing) {
                            try {
                                sound.playing = true;
                                audio.soundplayer.playSound(sound.id, sound.loop)
                            } catch (e) {}
                        }
                    } else {
                        if (sound.playing === true) {
                            try {
                                sound.playing = 'stopping';
                                audio.soundplayer.setVolume(sound.id, 0);
                                audio.soundplayer.stopSound(sound.id)
                            } catch (e) {}
                        }
                    }
                    break;
                case "stop":
                    if (value > 0) {
                        if (sound.playing === true) {
                            try {
                                sound.playing = 'stopping';
                                audio.soundplayer.setVolume(sound.id, 0);
                                audio.soundplayer.stopSound(sound.id)
                            } catch (e) {}
                        }
                    } else {
                        if (!sound.playing) {
                            try {
                                sound.playing = true;
                                audio.soundplayer.playSound(sound.id, sound.loop)
                            } catch (e) {}
                        }
                    }
                    break
                }
                effect.lastValue = value
            }
        }
    }
};
audio.toggleMute = function () {
    if (audio.on) {
        audio.mute()
		
    } else {
        audio.unmute()
    }
};
audio.stop = function () {
    try {
        if (audio.soundplayer && audio.soundplayer.stopSound) {
            for (var i in audio.sounds) {
                var sound = audio.sounds[i];
                audio.soundplayer.stopSound(sound.id);
                sound.playing = false;
                var effects = sound.effects;
                for (var e in effects) {
                    var effect = effects[e];
                    effect.lastValue = null
                }
            }
        }
    } catch (e) {}
};
audio.mute = function () {
    audio.stop();
    audio.on = false;
    ges.preferences.sound = false;
    $('.gefs-button-mute', ui.bar).addClass('btn-info')
};
audio.unmute = function () {
    audio.on = true;
    ges.preferences.sound = true;
    $('.gefs-button-mute', ui.bar).removeClass('btn-info')
};
audio.playStartup = function () {
    if (audio.on && audio.soundplayer && audio.soundplayer.playSound) {
        try {
            audio.soundplayer.playSound('startup', 1)
        } catch (e) {}
    }
};
audio.playShutdown = function () {
    if (audio.on && audio.soundplayer && audio.soundplayer.playSound) {
        try {
            audio.soundplayer.playSound('shutdown', 1)
        } catch (e) {}
    }
};
audio.playSoundLoop = function (soundName, loop) {
    if (audio.on && audio.soundplayer && audio.soundplayer.playSound) {
        try {
            loop = loop || 1;
            audio.soundplayer.playSound(soundName, loop)
        } catch (e) {}
    }
};
audio.stopSoundLoop = function (soundName) {
    if (audio.soundplayer && audio.soundplayer.stopSound) {
        try {
            audio.soundplayer.stopSound(soundName)
        } catch (e) {}
    }
};


ges.debug = {};
ges.debug.logStack = [];
ges.debug.logStackMaxLength = 10;
ges.debug.init = function () {
    ges.debug.frameComplete = true;
    ges.debug.$panel = $('.gefs-debug');
    var stopPropagation = function (event) {
        event.stopPropagation()
    };
    ges.debug.$panel.keydown(stopPropagation);
    ges.debug.$panel.keyup(stopPropagation)
};
ges.debug.on = function () {
    ges.debug.$debugFrame = $('.gefs-debugFrame');
    ges.debug.$debugWatch = $('.gefs-debugWatch');
    ges.debug.$debugLog = $('.gefs-debugLog');
    ges.debug.loadAxis();
    ges.debug.loadProbe();
    ges.debug.debug = true
};
ges.debug.off = function () {
    ges.debug.debug = false
};
ges.debug.watch = function (variableName, value) {
    try {
        ge.getFeatures()
    } catch (e) {
        return
    }
    if (ges.debug.debug) {
        if (!ges.debug[variableName]) {
            ges.debug[variableName] = document.createElement('div');
            ges.debug.$debugFrame.append(ges.debug[variableName])
        }
        ges.debug[variableName].innerHTML = variableName + ': ' + value
    }
};
ges.debug.log = function (message) {
    if (ges.debug.debug) {
        ges.debug.$debugLog.html(ges.debug.$debugLog.html() + '<br>' + message);
        if (window.console && window.console.log) {
            console.log(message)
        }
    } else {
        ges.debug.stackLog(message)
    }
};
ges.debug.alert = function (message) {
    if (ges.debug.debug) {
        alert(message)
    } else {
        ges.debug.stackLog(message)
    }
};
ges.debug.stackLog = function (message) {
    ges.debug.logStack.push(message);
    if (ges.debug.logStack.length > ges.debug.logStackMaxLength) {
        ges.debug.logStack.shift()
    }
};
ges.debug.update = function (dt) {
    ges.debug.fps = exponentialSmoothing('fps', 1000 / dt, 0.1);
    ges.debug.fps = ges.debug.fps.toPrecision(2);
    if (ges.debug.debug) {
        document.title = 'fps: ' + ges.debug.fps;
        var showPointName = $('.debugPointName')[0].value;
        if (showPointName) {
            var part = ges.aircraft.parts[showPointName];
            var intrument = instruments.list[showPointName];
            if (part) {
                var colPointIndex = $('.debugCollisionPointIndex')[0].value;
                if (colPointIndex) {
                    ges.debug.placeAxis(part.object3d.getWorldFrame(), part.collisionPoints[parseInt(colPointIndex)].worldPosition)
                } else {
                    if ($('.debugShowForceSource')[0].checked) {
                        ges.debug.placeAxis(part.object3d.getWorldFrame(), part.points['forceSourcePoint'].worldPosition)
                    }
                    if ($('.debugShowForceDirection')[0].checked) {
                        ges.debug.placeAxis(part.object3d.getWorldFrame(), part.points['forceDirection'].worldPosition)
                    }
                    if ($('.debugShowLocalPosition')[0].checked) {
                        ges.debug.placeAxis(part.object3d.getWorldFrame(), part.object3d.worldPosition)
                    }
                }
            }
            if (intrument && intrument.definition.cockpit) {
                var position = intrument.definition.cockpit.position;
                ges.debug.placeAxis(ges.aircraft.object3d.getWorldFrame(), position.worldPosition)
            }
            if (showPointName == 'camera') {
                var position = ges.aircraft.setup.camera.cockpit;
                ges.aircraft.object3d.setVectorWorldPosition(position);
                ges.debug.placeAxis(ges.aircraft.object3d.getWorldFrame(), position.worldPosition)
            }
        }
    }
};
ges.debug.loadAxis = function () {
    var href = PAGE_PATH + 'models/debug/axis.kml?killcache=' + new Date().getTime();
    google.earth.fetchKml(ge, href, function (kmlObject) {
        if (kmlObject) {
            ges.debug.axis = {};
            ges.debug.axis.model = kmlObject.getFeatures().getChildNodes().item(0).getGeometry();
            ges.debug.axis.orientation = ges.debug.axis.model.getOrientation();
            ges.debug.axis.location = ges.debug.axis.model.getLocation();
            ges.debug.axis.scale = ges.debug.axis.model.getScale();
            ges.debug.axis.scale.set(1, 1, 1);
            ge.getFeatures().appendChild(kmlObject)
        }
    })
};
ges.debug.loadProbe = function () {
    var href = PAGE_PATH + 'models/debug/probe.kml?killcache=' + new Date().getTime();
    google.earth.fetchKml(ge, href, function (kmlObject) {
        if (kmlObject) {
            ges.debug.probe = {};
            ges.debug.probe.model = kmlObject.getFeatures().getChildNodes().item(0).getGeometry();
            ges.debug.probe.orientation = ges.debug.probe.model.getOrientation();
            ges.debug.probe.location = ges.debug.probe.model.getLocation();
            ge.getFeatures().appendChild(kmlObject)
        }
    })
};
ges.debug.placeAxis = function (frame, point) {
    try {
        var lla = V3.add(ges.aircraft.llaLocation, xyz2lla(point, ges.aircraft.llaLocation));
        var htr = M33.getOrientation(frame);
        ges.debug.axis.orientation.set(htr[0], htr[1], htr[2]);
        ges.debug.axis.location.setLatLngAlt(lla[0], lla[1], lla[2])
    } catch (e) {}
};
ges.debug.toggleDebug = function () {
    ui.toggleExpandLeft('debug');
    if (ges.debug.$panel.is(':visible')) {
        ges.debug.on()
    } else {
        ges.debug.off()
    }
};

function handleInputDefaultValue(oInput) {
    if (oInput.getAttribute('alt')) {
        var defaultValue = oInput.getAttribute('alt');
        if (oInput.value == defaultValue) {
            oInput.value = ''
        } else if (oInput.value == '') {
            oInput.value = defaultValue
        }
    }
};
$(document).ready(function () {
    function closeDropups() {
        $('.dropup').removeClass('open')
    }
    ui.bar = $('.gefs-ui')[0];
    $('input[type=text]').keydown(function (e) {
        e.stopPropagation()
    }).keyup(function (e) {
        e.stopPropagation()
    }).focus(function () {
        handleInputDefaultValue(this)
    }).blur(function () {
        handleInputDefaultValue(this)
    });
    $('select').change(function () {
        this.blur()
    });
    $('.gefs-locationForm').submit(function (event) {
        $('.address-input').blur();
        closeDropups();
        geoDecodeLocation($('.address-input').val(), function (coord) {
            if (ges != null && ges.aircraft != null) {
                ges.flyTo([coord[0], coord[1], 1000, 0])
            }
        });
        event.preventDefault()
    }).click(function (event) {
        event.stopPropagation()
    }).mouseup(function (event) {
        event.stopPropagation()
    });
   
    ui.openChat = function () {
        if (ges.preferences.chat == false) {
            alert('Chat is disabled. You can enable it in the option panel.')
        } else {
            $('.gefs-button-chat', ui.bar).hide();
            $('.gefs-chatForm', ui.bar).show();
            $('.gefs-chat-input', ui.bar).focus()
        }
    };
    ui.closeChat = function (blur) {
        $('.gefs-button-chat', ui.bar).show();
        $('.gefs-chatForm', ui.bar).hide();
        $('.gefs-chat-input', ui.bar)[0].value = '';
        if (blur === true) {
            $('.gefs-focus-target').focus()
        }
    };
    ui.addMouseUpHandler(ui.closeChat);
    ui.addMouseUpHandler(function () {
        closeDropups()
    })
});