/*	SWFObject v2.2 <http://code.google.com/p/swfobject/> 
	is released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
*/
var swfobject = function () {
    var D = "undefined",
        r = "object",
        S = "Shockwave Flash",
        W = "ShockwaveFlash.ShockwaveFlash",
        q = "application/x-shockwave-flash",
        R = "SWFObjectExprInst",
        x = "onreadystatechange",
        O = window,
        j = document,
        t = navigator,
        T = false,
        U = [h],
        o = [],
        N = [],
        I = [],
        l, Q, E, B, J = false,
        a = false,
        n, G, m = true,
        M = function () {
            var aa = typeof j.getElementById != D && typeof j.getElementsByTagName != D && typeof j.createElement != D,
                ah = t.userAgent.toLowerCase(),
                Y = t.platform.toLowerCase(),
                ae = Y ? /win/.test(Y) : /win/.test(ah),
                ac = Y ? /mac/.test(Y) : /mac/.test(ah),
                af = /webkit/.test(ah) ? parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false,
                X = !+"\v1",
                ag = [0, 0, 0],
                ab = null;
            if (typeof t.plugins != D && typeof t.plugins[S] == r) {
                ab = t.plugins[S].description;
                if (ab && !(typeof t.mimeTypes != D && t.mimeTypes[q] && !t.mimeTypes[q].enabledPlugin)) {
                    T = true;
                    X = false;
                    ab = ab.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
                    ag[0] = parseInt(ab.replace(/^(.*)\..*$/, "$1"), 10);
                    ag[1] = parseInt(ab.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
                    ag[2] = /[a-zA-Z]/.test(ab) ? parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0
                }
            } else {
                if (typeof O.ActiveXObject != D) {
                    try {
                        var ad = new ActiveXObject(W);
                        if (ad) {
                            ab = ad.GetVariable("$version");
                            if (ab) {
                                X = true;
                                ab = ab.split(" ")[1].split(",");
                                ag = [parseInt(ab[0], 10), parseInt(ab[1], 10), parseInt(ab[2], 10)]
                            }
                        }
                    } catch (Z) {}
                }
            }
            return {
                w3: aa,
                pv: ag,
                wk: af,
                ie: X,
                win: ae,
                mac: ac
            }
        }(),
        k = function () {
            if (!M.w3) {
                return
            }
            if ((typeof j.readyState != D && j.readyState == "complete") || (typeof j.readyState == D && (j.getElementsByTagName("body")[0] || j.body))) {
                f()
            }
            if (!J) {
                if (typeof j.addEventListener != D) {
                    j.addEventListener("DOMContentLoaded", f, false)
                }
                if (M.ie && M.win) {
                    j.attachEvent(x, function () {
                        if (j.readyState == "complete") {
                            j.detachEvent(x, arguments.callee);
                            f()
                        }
                    });
                    if (O == top) {
                        (function () {
                            if (J) {
                                return
                            }
                            try {
                                j.documentElement.doScroll("left")
                            } catch (X) {
                                setTimeout(arguments.callee, 0);
                                return
                            }
                            f()
                        })()
                    }
                }
                if (M.wk) {
                    (function () {
                        if (J) {
                            return
                        }
                        if (!/loaded|complete/.test(j.readyState)) {
                            setTimeout(arguments.callee, 0);
                            return
                        }
                        f()
                    })()
                }
                s(f)
            }
        }();

    function f() {
        if (J) {
            return
        }
        try {
            var Z = j.getElementsByTagName("body")[0].appendChild(C("span"));
            Z.parentNode.removeChild(Z)
        } catch (aa) {
            return
        }
        J = true;
        var X = U.length;
        for (var Y = 0; Y < X; Y++) {
            U[Y]()
        }
    }

    function K(X) {
        if (J) {
            X()
        } else {
            U[U.length] = X
        }
    }

    function s(Y) {
        if (typeof O.addEventListener != D) {
            O.addEventListener("load", Y, false)
        } else {
            if (typeof j.addEventListener != D) {
                j.addEventListener("load", Y, false)
            } else {
                if (typeof O.attachEvent != D) {
                    i(O, "onload", Y)
                } else {
                    if (typeof O.onload == "function") {
                        var X = O.onload;
                        O.onload = function () {
                            X();
                            Y()
                        }
                    } else {
                        O.onload = Y
                    }
                }
            }
        }
    }

    function h() {
        if (T) {
            V()
        } else {
            H()
        }
    }

    function V() {
        var X = j.getElementsByTagName("body")[0];
        var aa = C(r);
        aa.setAttribute("type", q);
        var Z = X.appendChild(aa);
        if (Z) {
            var Y = 0;
            (function () {
                if (typeof Z.GetVariable != D) {
                    var ab = Z.GetVariable("$version");
                    if (ab) {
                        ab = ab.split(" ")[1].split(",");
                        M.pv = [parseInt(ab[0], 10), parseInt(ab[1], 10), parseInt(ab[2], 10)]
                    }
                } else {
                    if (Y < 10) {
                        Y++;
                        setTimeout(arguments.callee, 10);
                        return
                    }
                }
                X.removeChild(aa);
                Z = null;
                H()
            })()
        } else {
            H()
        }
    }

    function H() {
        var ag = o.length;
        if (ag > 0) {
            for (var af = 0; af < ag; af++) {
                var Y = o[af].id;
                var ab = o[af].callbackFn;
                var aa = {
                    success: false,
                    id: Y
                };
                if (M.pv[0] > 0) {
                    var ae = c(Y);
                    if (ae) {
                        if (F(o[af].swfVersion) && !(M.wk && M.wk < 312)) {
                            w(Y, true);
                            if (ab) {
                                aa.success = true;
                                aa.ref = z(Y);
                                ab(aa)
                            }
                        } else {
                            if (o[af].expressInstall && A()) {
                                var ai = {};
                                ai.data = o[af].expressInstall;
                                ai.width = ae.getAttribute("width") || "0";
                                ai.height = ae.getAttribute("height") || "0";
                                if (ae.getAttribute("class")) {
                                    ai.styleclass = ae.getAttribute("class")
                                }
                                if (ae.getAttribute("align")) {
                                    ai.align = ae.getAttribute("align")
                                }
                                var ah = {};
                                var X = ae.getElementsByTagName("param");
                                var ac = X.length;
                                for (var ad = 0; ad < ac; ad++) {
                                    if (X[ad].getAttribute("name").toLowerCase() != "movie") {
                                        ah[X[ad].getAttribute("name")] = X[ad].getAttribute("value")
                                    }
                                }
                                P(ai, ah, Y, ab)
                            } else {
                                p(ae);
                                if (ab) {
                                    ab(aa)
                                }
                            }
                        }
                    }
                } else {
                    w(Y, true);
                    if (ab) {
                        var Z = z(Y);
                        if (Z && typeof Z.SetVariable != D) {
                            aa.success = true;
                            aa.ref = Z
                        }
                        ab(aa)
                    }
                }
            }
        }
    }

    function z(aa) {
        var X = null;
        var Y = c(aa);
        if (Y && Y.nodeName == "OBJECT") {
            if (typeof Y.SetVariable != D) {
                X = Y
            } else {
                var Z = Y.getElementsByTagName(r)[0];
                if (Z) {
                    X = Z
                }
            }
        }
        return X
    }

    function A() {
        return !a && F("6.0.65") && (M.win || M.mac) && !(M.wk && M.wk < 312)
    }

    function P(aa, ab, X, Z) {
        a = true;
        E = Z || null;
        B = {
            success: false,
            id: X
        };
        var ae = c(X);
        if (ae) {
            if (ae.nodeName == "OBJECT") {
                l = g(ae);
                Q = null
            } else {
                l = ae;
                Q = X
            }
            aa.id = R;
            if (typeof aa.width == D || (!/%$/.test(aa.width) && parseInt(aa.width, 10) < 310)) {
                aa.width = "310"
            }
            if (typeof aa.height == D || (!/%$/.test(aa.height) && parseInt(aa.height, 10) < 137)) {
                aa.height = "137"
            }
            j.title = j.title.slice(0, 47) + " - Flash Player Installation";
            var ad = M.ie && M.win ? "ActiveX" : "PlugIn",
                ac = "MMredirectURL=" + O.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + ad + "&MMdoctitle=" + j.title;
            if (typeof ab.flashvars != D) {
                ab.flashvars += "&" + ac
            } else {
                ab.flashvars = ac
            } if (M.ie && M.win && ae.readyState != 4) {
                var Y = C("div");
                X += "SWFObjectNew";
                Y.setAttribute("id", X);
                ae.parentNode.insertBefore(Y, ae);
                ae.style.display = "none";
                (function () {
                    if (ae.readyState == 4) {
                        ae.parentNode.removeChild(ae)
                    } else {
                        setTimeout(arguments.callee, 10)
                    }
                })()
            }
            u(aa, ab, X)
        }
    }

    function p(Y) {
        if (M.ie && M.win && Y.readyState != 4) {
            var X = C("div");
            Y.parentNode.insertBefore(X, Y);
            X.parentNode.replaceChild(g(Y), X);
            Y.style.display = "none";
            (function () {
                if (Y.readyState == 4) {
                    Y.parentNode.removeChild(Y)
                } else {
                    setTimeout(arguments.callee, 10)
                }
            })()
        } else {
            Y.parentNode.replaceChild(g(Y), Y)
        }
    }

    function g(ab) {
        var aa = C("div");
        if (M.win && M.ie) {
            aa.innerHTML = ab.innerHTML
        } else {
            var Y = ab.getElementsByTagName(r)[0];
            if (Y) {
                var ad = Y.childNodes;
                if (ad) {
                    var X = ad.length;
                    for (var Z = 0; Z < X; Z++) {
                        if (!(ad[Z].nodeType == 1 && ad[Z].nodeName == "PARAM") && !(ad[Z].nodeType == 8)) {
                            aa.appendChild(ad[Z].cloneNode(true))
                        }
                    }
                }
            }
        }
        return aa
    }

    function u(ai, ag, Y) {
        var X, aa = c(Y);
        if (M.wk && M.wk < 312) {
            return X
        }
        if (aa) {
            if (typeof ai.id == D) {
                ai.id = Y
            }
            if (M.ie && M.win) {
                var ah = "";
                for (var ae in ai) {
                    if (ai[ae] != Object.prototype[ae]) {
                        if (ae.toLowerCase() == "data") {
                            ag.movie = ai[ae]
                        } else {
                            if (ae.toLowerCase() == "styleclass") {
                                ah += ' class="' + ai[ae] + '"'
                            } else {
                                if (ae.toLowerCase() != "classid") {
                                    ah += " " + ae + '="' + ai[ae] + '"'
                                }
                            }
                        }
                    }
                }
                var af = "";
                for (var ad in ag) {
                    if (ag[ad] != Object.prototype[ad]) {
                        af += '<param name="' + ad + '" value="' + ag[ad] + '" />'
                    }
                }
                aa.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + ah + ">" + af + "</object>";
                N[N.length] = ai.id;
                X = c(ai.id)
            } else {
                var Z = C(r);
                Z.setAttribute("type", q);
                for (var ac in ai) {
                    if (ai[ac] != Object.prototype[ac]) {
                        if (ac.toLowerCase() == "styleclass") {
                            Z.setAttribute("class", ai[ac])
                        } else {
                            if (ac.toLowerCase() != "classid") {
                                Z.setAttribute(ac, ai[ac])
                            }
                        }
                    }
                }
                for (var ab in ag) {
                    if (ag[ab] != Object.prototype[ab] && ab.toLowerCase() != "movie") {
                        e(Z, ab, ag[ab])
                    }
                }
                aa.parentNode.replaceChild(Z, aa);
                X = Z
            }
        }
        return X
    }

    function e(Z, X, Y) {
        var aa = C("param");
        aa.setAttribute("name", X);
        aa.setAttribute("value", Y);
        Z.appendChild(aa)
    }

    function y(Y) {
        var X = c(Y);
        if (X && X.nodeName == "OBJECT") {
            if (M.ie && M.win) {
                X.style.display = "none";
                (function () {
                    if (X.readyState == 4) {
                        b(Y)
                    } else {
                        setTimeout(arguments.callee, 10)
                    }
                })()
            } else {
                X.parentNode.removeChild(X)
            }
        }
    }

    function b(Z) {
        var Y = c(Z);
        if (Y) {
            for (var X in Y) {
                if (typeof Y[X] == "function") {
                    Y[X] = null
                }
            }
            Y.parentNode.removeChild(Y)
        }
    }

    function c(Z) {
        var X = null;
        try {
            X = j.getElementById(Z)
        } catch (Y) {}
        return X
    }

    function C(X) {
        return j.createElement(X)
    }

    function i(Z, X, Y) {
        Z.attachEvent(X, Y);
        I[I.length] = [Z, X, Y]
    }

    function F(Z) {
        var Y = M.pv,
            X = Z.split(".");
        X[0] = parseInt(X[0], 10);
        X[1] = parseInt(X[1], 10) || 0;
        X[2] = parseInt(X[2], 10) || 0;
        return (Y[0] > X[0] || (Y[0] == X[0] && Y[1] > X[1]) || (Y[0] == X[0] && Y[1] == X[1] && Y[2] >= X[2])) ? true : false
    }

    function v(ac, Y, ad, ab) {
        if (M.ie && M.mac) {
            return
        }
        var aa = j.getElementsByTagName("head")[0];
        if (!aa) {
            return
        }
        var X = (ad && typeof ad == "string") ? ad : "screen";
        if (ab) {
            n = null;
            G = null
        }
        if (!n || G != X) {
            var Z = C("style");
            Z.setAttribute("type", "text/css");
            Z.setAttribute("media", X);
            n = aa.appendChild(Z);
            if (M.ie && M.win && typeof j.styleSheets != D && j.styleSheets.length > 0) {
                n = j.styleSheets[j.styleSheets.length - 1]
            }
            G = X
        }
        if (M.ie && M.win) {
            if (n && typeof n.addRule == r) {
                n.addRule(ac, Y)
            }
        } else {
            if (n && typeof j.createTextNode != D) {
                n.appendChild(j.createTextNode(ac + " {" + Y + "}"))
            }
        }
    }

    function w(Z, X) {
        if (!m) {
            return
        }
        var Y = X ? "visible" : "hidden";
        if (J && c(Z)) {
            c(Z).style.visibility = Y
        } else {
            v("#" + Z, "visibility:" + Y)
        }
    }

    function L(Y) {
        var Z = /[\\\"<>\.;]/;
        var X = Z.exec(Y) != null;
        return X && typeof encodeURIComponent != D ? encodeURIComponent(Y) : Y
    }
    var d = function () {
        if (M.ie && M.win) {
            window.attachEvent("onunload", function () {
                var ac = I.length;
                for (var ab = 0; ab < ac; ab++) {
                    I[ab][0].detachEvent(I[ab][1], I[ab][2])
                }
                var Z = N.length;
                for (var aa = 0; aa < Z; aa++) {
                    y(N[aa])
                }
                for (var Y in M) {
                    M[Y] = null
                }
                M = null;
                for (var X in swfobject) {
                    swfobject[X] = null
                }
                swfobject = null
            })
        }
    }();
    return {
        registerObject: function (ab, X, aa, Z) {
            if (M.w3 && ab && X) {
                var Y = {};
                Y.id = ab;
                Y.swfVersion = X;
                Y.expressInstall = aa;
                Y.callbackFn = Z;
                o[o.length] = Y;
                w(ab, false)
            } else {
                if (Z) {
                    Z({
                        success: false,
                        id: ab
                    })
                }
            }
        },
        getObjectById: function (X) {
            if (M.w3) {
                return z(X)
            }
        },
        embedSWF: function (ab, ah, ae, ag, Y, aa, Z, ad, af, ac) {
            var X = {
                success: false,
                id: ah
            };
            if (M.w3 && !(M.wk && M.wk < 312) && ab && ah && ae && ag && Y) {
                w(ah, false);
                K(function () {
                    ae += "";
                    ag += "";
                    var aj = {};
                    if (af && typeof af === r) {
                        for (var al in af) {
                            aj[al] = af[al]
                        }
                    }
                    aj.data = ab;
                    aj.width = ae;
                    aj.height = ag;
                    var am = {};
                    if (ad && typeof ad === r) {
                        for (var ak in ad) {
                            am[ak] = ad[ak]
                        }
                    }
                    if (Z && typeof Z === r) {
                        for (var ai in Z) {
                            if (typeof am.flashvars != D) {
                                am.flashvars += "&" + ai + "=" + Z[ai]
                            } else {
                                am.flashvars = ai + "=" + Z[ai]
                            }
                        }
                    }
                    if (F(Y)) {
                        var an = u(aj, am, ah);
                        if (aj.id == ah) {
                            w(ah, true)
                        }
                        X.success = true;
                        X.ref = an
                    } else {
                        if (aa && A()) {
                            aj.data = aa;
                            P(aj, am, ah, ac);
                            return
                        } else {
                            w(ah, true)
                        }
                    } if (ac) {
                        ac(X)
                    }
                })
            } else {
                if (ac) {
                    ac(X)
                }
            }
        },
        switchOffAutoHideShow: function () {
            m = false
        },
        ua: M,
        getFlashPlayerVersion: function () {
            return {
                major: M.pv[0],
                minor: M.pv[1],
                release: M.pv[2]
            }
        },
        hasFlashPlayerVersion: F,
        createSWF: function (Z, Y, X) {
            if (M.w3) {
                return u(Z, Y, X)
            } else {
                return undefined
            }
        },
        showExpressInstall: function (Z, aa, X, Y) {
            if (M.w3 && A()) {
                P(Z, aa, X, Y)
            }
        },
        removeSWF: function (X) {
            if (M.w3) {
                y(X)
            }
        },
        createCSS: function (aa, Z, Y, X) {
            if (M.w3) {
                v(aa, Z, Y, X)
            }
        },
        addDomLoadEvent: K,
        addLoadEvent: s,
        getQueryParamValue: function (aa) {
            var Z = j.location.search || j.location.hash;
            if (Z) {
                if (/\?/.test(Z)) {
                    Z = Z.split("?")[1]
                }
                if (aa == null) {
                    return L(Z)
                }
                var Y = Z.split("&");
                for (var X = 0; X < Y.length; X++) {
                    if (Y[X].substring(0, Y[X].indexOf("=")) == aa) {
                        return L(Y[X].substring((Y[X].indexOf("=") + 1)))
                    }
                }
            }
            return ""
        },
        expressInstallCallback: function () {
            if (a) {
                var X = c(R);
                if (X && l) {
                    X.parentNode.replaceChild(l, X);
                    if (Q) {
                        w(Q, true);
                        if (M.ie && M.win) {
                            l.style.display = "block"
                        }
                    }
                    if (E) {
                        E(B)
                    }
                }
                a = false
            }
        }
    }
}();; /*! jQuery v1.7.2 jquery.com | jquery.org/license */
(function (a, b) {
    function cy(a) {
        return f.isWindow(a) ? a : a.nodeType === 9 ? a.defaultView || a.parentWindow : !1
    }

    function cu(a) {
        if (!cj[a]) {
            var b = c.body,
                d = f("<" + a + ">").appendTo(b),
                e = d.css("display");
            d.remove();
            if (e === "none" || e === "") {
                ck || (ck = c.createElement("iframe"), ck.frameBorder = ck.width = ck.height = 0), b.appendChild(ck);
                if (!cl || !ck.createElement) cl = (ck.contentWindow || ck.contentDocument).document, cl.write((f.support.boxModel ? "<!doctype html>" : "") + "<html><body>"), cl.close();
                d = cl.createElement(a), cl.body.appendChild(d), e = f.css(d, "display"), b.removeChild(ck)
            }
            cj[a] = e
        }
        return cj[a]
    }

    function ct(a, b) {
        var c = {};
        f.each(cp.concat.apply([], cp.slice(0, b)), function () {
            c[this] = a
        });
        return c
    }

    function cs() {
        cq = b
    }

    function cr() {
        setTimeout(cs, 0);
        return cq = f.now()
    }

    function ci() {
        try {
            return new a.ActiveXObject("Microsoft.XMLHTTP")
        } catch (b) {}
    }

    function ch() {
        try {
            return new a.XMLHttpRequest
        } catch (b) {}
    }

    function cb(a, c) {
        a.dataFilter && (c = a.dataFilter(c, a.dataType));
        var d = a.dataTypes,
            e = {}, g, h, i = d.length,
            j, k = d[0],
            l, m, n, o, p;
        for (g = 1; g < i; g++) {
            if (g === 1)
                for (h in a.converters) typeof h == "string" && (e[h.toLowerCase()] = a.converters[h]);
            l = k, k = d[g];
            if (k === "*") k = l;
            else if (l !== "*" && l !== k) {
                m = l + " " + k, n = e[m] || e["* " + k];
                if (!n) {
                    p = b;
                    for (o in e) {
                        j = o.split(" ");
                        if (j[0] === l || j[0] === "*") {
                            p = e[j[1] + " " + k];
                            if (p) {
                                o = e[o], o === !0 ? n = p : p === !0 && (n = o);
                                break
                            }
                        }
                    }
                }!n && !p && f.error("No conversion from " + m.replace(" ", " to ")), n !== !0 && (c = n ? n(c) : p(o(c)))
            }
        }
        return c
    }

    function ca(a, c, d) {
        var e = a.contents,
            f = a.dataTypes,
            g = a.responseFields,
            h, i, j, k;
        for (i in g) i in d && (c[g[i]] = d[i]);
        while (f[0] === "*") f.shift(), h === b && (h = a.mimeType || c.getResponseHeader("content-type"));
        if (h)
            for (i in e)
                if (e[i] && e[i].test(h)) {
                    f.unshift(i);
                    break
                }
        if (f[0] in d) j = f[0];
        else {
            for (i in d) {
                if (!f[0] || a.converters[i + " " + f[0]]) {
                    j = i;
                    break
                }
                k || (k = i)
            }
            j = j || k
        } if (j) {
            j !== f[0] && f.unshift(j);
            return d[j]
        }
    }

    function b_(a, b, c, d) {
        if (f.isArray(b)) f.each(b, function (b, e) {
            c || bD.test(a) ? d(a, e) : b_(a + "[" + (typeof e == "object" ? b : "") + "]", e, c, d)
        });
        else if (!c && f.type(b) === "object")
            for (var e in b) b_(a + "[" + e + "]", b[e], c, d);
        else d(a, b)
    }

    function b$(a, c) {
        var d, e, g = f.ajaxSettings.flatOptions || {};
        for (d in c) c[d] !== b && ((g[d] ? a : e || (e = {}))[d] = c[d]);
        e && f.extend(!0, a, e)
    }

    function bZ(a, c, d, e, f, g) {
        f = f || c.dataTypes[0], g = g || {}, g[f] = !0;
        var h = a[f],
            i = 0,
            j = h ? h.length : 0,
            k = a === bS,
            l;
        for (; i < j && (k || !l); i++) l = h[i](c, d, e), typeof l == "string" && (!k || g[l] ? l = b : (c.dataTypes.unshift(l), l = bZ(a, c, d, e, l, g)));
        (k || !l) && !g["*"] && (l = bZ(a, c, d, e, "*", g));
        return l
    }

    function bY(a) {
        return function (b, c) {
            typeof b != "string" && (c = b, b = "*");
            if (f.isFunction(c)) {
                var d = b.toLowerCase().split(bO),
                    e = 0,
                    g = d.length,
                    h, i, j;
                for (; e < g; e++) h = d[e], j = /^\+/.test(h), j && (h = h.substr(1) || "*"), i = a[h] = a[h] || [], i[j ? "unshift" : "push"](c)
            }
        }
    }

    function bB(a, b, c) {
        var d = b === "width" ? a.offsetWidth : a.offsetHeight,
            e = b === "width" ? 1 : 0,
            g = 4;
        if (d > 0) {
            if (c !== "border")
                for (; e < g; e += 2) c || (d -= parseFloat(f.css(a, "padding" + bx[e])) || 0), c === "margin" ? d += parseFloat(f.css(a, c + bx[e])) || 0 : d -= parseFloat(f.css(a, "border" + bx[e] + "Width")) || 0;
            return d + "px"
        }
        d = by(a, b);
        if (d < 0 || d == null) d = a.style[b];
        if (bt.test(d)) return d;
        d = parseFloat(d) || 0;
        if (c)
            for (; e < g; e += 2) d += parseFloat(f.css(a, "padding" + bx[e])) || 0, c !== "padding" && (d += parseFloat(f.css(a, "border" + bx[e] + "Width")) || 0), c === "margin" && (d += parseFloat(f.css(a, c + bx[e])) || 0);
        return d + "px"
    }

    function bo(a) {
        var b = c.createElement("div");
        bh.appendChild(b), b.innerHTML = a.outerHTML;
        return b.firstChild
    }

    function bn(a) {
        var b = (a.nodeName || "").toLowerCase();
        b === "input" ? bm(a) : b !== "script" && typeof a.getElementsByTagName != "undefined" && f.grep(a.getElementsByTagName("input"), bm)
    }

    function bm(a) {
        if (a.type === "checkbox" || a.type === "radio") a.defaultChecked = a.checked
    }

    function bl(a) {
        return typeof a.getElementsByTagName != "undefined" ? a.getElementsByTagName("*") : typeof a.querySelectorAll != "undefined" ? a.querySelectorAll("*") : []
    }

    function bk(a, b) {
        var c;
        b.nodeType === 1 && (b.clearAttributes && b.clearAttributes(), b.mergeAttributes && b.mergeAttributes(a), c = b.nodeName.toLowerCase(), c === "object" ? b.outerHTML = a.outerHTML : c !== "input" || a.type !== "checkbox" && a.type !== "radio" ? c === "option" ? b.selected = a.defaultSelected : c === "input" || c === "textarea" ? b.defaultValue = a.defaultValue : c === "script" && b.text !== a.text && (b.text = a.text) : (a.checked && (b.defaultChecked = b.checked = a.checked), b.value !== a.value && (b.value = a.value)), b.removeAttribute(f.expando), b.removeAttribute("_submit_attached"), b.removeAttribute("_change_attached"))
    }

    function bj(a, b) {
        if (b.nodeType === 1 && !! f.hasData(a)) {
            var c, d, e, g = f._data(a),
                h = f._data(b, g),
                i = g.events;
            if (i) {
                delete h.handle, h.events = {};
                for (c in i)
                    for (d = 0, e = i[c].length; d < e; d++) f.event.add(b, c, i[c][d])
            }
            h.data && (h.data = f.extend({}, h.data))
        }
    }

    function bi(a, b) {
        return f.nodeName(a, "table") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
    }

    function U(a) {
        var b = V.split("|"),
            c = a.createDocumentFragment();
        if (c.createElement)
            while (b.length) c.createElement(b.pop());
        return c
    }

    function T(a, b, c) {
        b = b || 0;
        if (f.isFunction(b)) return f.grep(a, function (a, d) {
            var e = !! b.call(a, d, a);
            return e === c
        });
        if (b.nodeType) return f.grep(a, function (a, d) {
            return a === b === c
        });
        if (typeof b == "string") {
            var d = f.grep(a, function (a) {
                return a.nodeType === 1
            });
            if (O.test(b)) return f.filter(b, d, !c);
            b = f.filter(b, d)
        }
        return f.grep(a, function (a, d) {
            return f.inArray(a, b) >= 0 === c
        })
    }

    function S(a) {
        return !a || !a.parentNode || a.parentNode.nodeType === 11
    }

    function K() {
        return !0
    }

    function J() {
        return !1
    }

    function n(a, b, c) {
        var d = b + "defer",
            e = b + "queue",
            g = b + "mark",
            h = f._data(a, d);
        h && (c === "queue" || !f._data(a, e)) && (c === "mark" || !f._data(a, g)) && setTimeout(function () {
            !f._data(a, e) && !f._data(a, g) && (f.removeData(a, d, !0), h.fire())
        }, 0)
    }

    function m(a) {
        for (var b in a) {
            if (b === "data" && f.isEmptyObject(a[b])) continue;
            if (b !== "toJSON") return !1
        }
        return !0
    }

    function l(a, c, d) {
        if (d === b && a.nodeType === 1) {
            var e = "data-" + c.replace(k, "-$1").toLowerCase();
            d = a.getAttribute(e);
            if (typeof d == "string") {
                try {
                    d = d === "true" ? !0 : d === "false" ? !1 : d === "null" ? null : f.isNumeric(d) ? +d : j.test(d) ? f.parseJSON(d) : d
                } catch (g) {}
                f.data(a, c, d)
            } else d = b
        }
        return d
    }

    function h(a) {
        var b = g[a] = {}, c, d;
        a = a.split(/\s+/);
        for (c = 0, d = a.length; c < d; c++) b[a[c]] = !0;
        return b
    }
    var c = a.document,
        d = a.navigator,
        e = a.location,
        f = function () {
            function J() {
                if (!e.isReady) {
                    try {
                        c.documentElement.doScroll("left")
                    } catch (a) {
                        setTimeout(J, 1);
                        return
                    }
                    e.ready()
                }
            }
            var e = function (a, b) {
                return new e.fn.init(a, b, h)
            }, f = a.jQuery,
                g = a.$,
                h, i = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
                j = /\S/,
                k = /^\s+/,
                l = /\s+$/,
                m = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
                n = /^[\],:{}\s]*$/,
                o = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
                p = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                q = /(?:^|:|,)(?:\s*\[)+/g,
                r = /(webkit)[ \/]([\w.]+)/,
                s = /(opera)(?:.*version)?[ \/]([\w.]+)/,
                t = /(msie) ([\w.]+)/,
                u = /(mozilla)(?:.*? rv:([\w.]+))?/,
                v = /-([a-z]|[0-9])/ig,
                w = /^-ms-/,
                x = function (a, b) {
                    return (b + "").toUpperCase()
                }, y = d.userAgent,
                z, A, B, C = Object.prototype.toString,
                D = Object.prototype.hasOwnProperty,
                E = Array.prototype.push,
                F = Array.prototype.slice,
                G = String.prototype.trim,
                H = Array.prototype.indexOf,
                I = {};
            e.fn = e.prototype = {
                constructor: e,
                init: function (a, d, f) {
                    var g, h, j, k;
                    if (!a) return this;
                    if (a.nodeType) {
                        this.context = this[0] = a, this.length = 1;
                        return this
                    }
                    if (a === "body" && !d && c.body) {
                        this.context = c, this[0] = c.body, this.selector = a, this.length = 1;
                        return this
                    }
                    if (typeof a == "string") {
                        a.charAt(0) !== "<" || a.charAt(a.length - 1) !== ">" || a.length < 3 ? g = i.exec(a) : g = [null, a, null];
                        if (g && (g[1] || !d)) {
                            if (g[1]) {
                                d = d instanceof e ? d[0] : d, k = d ? d.ownerDocument || d : c, j = m.exec(a), j ? e.isPlainObject(d) ? (a = [c.createElement(j[1])], e.fn.attr.call(a, d, !0)) : a = [k.createElement(j[1])] : (j = e.buildFragment([g[1]], [k]), a = (j.cacheable ? e.clone(j.fragment) : j.fragment).childNodes);
                                return e.merge(this, a)
                            }
                            h = c.getElementById(g[2]);
                            if (h && h.parentNode) {
                                if (h.id !== g[2]) return f.find(a);
                                this.length = 1, this[0] = h
                            }
                            this.context = c, this.selector = a;
                            return this
                        }
                        return !d || d.jquery ? (d || f).find(a) : this.constructor(d).find(a)
                    }
                    if (e.isFunction(a)) return f.ready(a);
                    a.selector !== b && (this.selector = a.selector, this.context = a.context);
                    return e.makeArray(a, this)
                },
                selector: "",
                jquery: "1.7.2",
                length: 0,
                size: function () {
                    return this.length
                },
                toArray: function () {
                    return F.call(this, 0)
                },
                get: function (a) {
                    return a == null ? this.toArray() : a < 0 ? this[this.length + a] : this[a]
                },
                pushStack: function (a, b, c) {
                    var d = this.constructor();
                    e.isArray(a) ? E.apply(d, a) : e.merge(d, a), d.prevObject = this, d.context = this.context, b === "find" ? d.selector = this.selector + (this.selector ? " " : "") + c : b && (d.selector = this.selector + "." + b + "(" + c + ")");
                    return d
                },
                each: function (a, b) {
                    return e.each(this, a, b)
                },
                ready: function (a) {
                    e.bindReady(), A.add(a);
                    return this
                },
                eq: function (a) {
                    a = +a;
                    return a === -1 ? this.slice(a) : this.slice(a, a + 1)
                },
                first: function () {
                    return this.eq(0)
                },
                last: function () {
                    return this.eq(-1)
                },
                slice: function () {
                    return this.pushStack(F.apply(this, arguments), "slice", F.call(arguments).join(","))
                },
                map: function (a) {
                    return this.pushStack(e.map(this, function (b, c) {
                        return a.call(b, c, b)
                    }))
                },
                end: function () {
                    return this.prevObject || this.constructor(null)
                },
                push: E,
                sort: [].sort,
                splice: [].splice
            }, e.fn.init.prototype = e.fn, e.extend = e.fn.extend = function () {
                var a, c, d, f, g, h, i = arguments[0] || {}, j = 1,
                    k = arguments.length,
                    l = !1;
                typeof i == "boolean" && (l = i, i = arguments[1] || {}, j = 2), typeof i != "object" && !e.isFunction(i) && (i = {}), k === j && (i = this, --j);
                for (; j < k; j++)
                    if ((a = arguments[j]) != null)
                        for (c in a) {
                            d = i[c], f = a[c];
                            if (i === f) continue;
                            l && f && (e.isPlainObject(f) || (g = e.isArray(f))) ? (g ? (g = !1, h = d && e.isArray(d) ? d : []) : h = d && e.isPlainObject(d) ? d : {}, i[c] = e.extend(l, h, f)) : f !== b && (i[c] = f)
                        }
                    return i
            }, e.extend({
                noConflict: function (b) {
                    a.$ === e && (a.$ = g), b && a.jQuery === e && (a.jQuery = f);
                    return e
                },
                isReady: !1,
                readyWait: 1,
                holdReady: function (a) {
                    a ? e.readyWait++ : e.ready(!0)
                },
                ready: function (a) {
                    if (a === !0 && !--e.readyWait || a !== !0 && !e.isReady) {
                        if (!c.body) return setTimeout(e.ready, 1);
                        e.isReady = !0;
                        if (a !== !0 && --e.readyWait > 0) return;
                        A.fireWith(c, [e]), e.fn.trigger && e(c).trigger("ready").off("ready")
                    }
                },
                bindReady: function () {
                    if (!A) {
                        A = e.Callbacks("once memory");
                        if (c.readyState === "complete") return setTimeout(e.ready, 1);
                        if (c.addEventListener) c.addEventListener("DOMContentLoaded", B, !1), a.addEventListener("load", e.ready, !1);
                        else if (c.attachEvent) {
                            c.attachEvent("onreadystatechange", B), a.attachEvent("onload", e.ready);
                            var b = !1;
                            try {
                                b = a.frameElement == null
                            } catch (d) {}
                            c.documentElement.doScroll && b && J()
                        }
                    }
                },
                isFunction: function (a) {
                    return e.type(a) === "function"
                },
                isArray: Array.isArray || function (a) {
                    return e.type(a) === "array"
                },
                isWindow: function (a) {
                    return a != null && a == a.window
                },
                isNumeric: function (a) {
                    return !isNaN(parseFloat(a)) && isFinite(a)
                },
                type: function (a) {
                    return a == null ? String(a) : I[C.call(a)] || "object"
                },
                isPlainObject: function (a) {
                    if (!a || e.type(a) !== "object" || a.nodeType || e.isWindow(a)) return !1;
                    try {
                        if (a.constructor && !D.call(a, "constructor") && !D.call(a.constructor.prototype, "isPrototypeOf")) return !1
                    } catch (c) {
                        return !1
                    }
                    var d;
                    for (d in a);
                    return d === b || D.call(a, d)
                },
                isEmptyObject: function (a) {
                    for (var b in a) return !1;
                    return !0
                },
                error: function (a) {
                    throw new Error(a)
                },
                parseJSON: function (b) {
                    if (typeof b != "string" || !b) return null;
                    b = e.trim(b);
                    if (a.JSON && a.JSON.parse) return a.JSON.parse(b);
                    if (n.test(b.replace(o, "@").replace(p, "]").replace(q, ""))) return (new Function("return " + b))();
                    e.error("Invalid JSON: " + b)
                },
                parseXML: function (c) {
                    if (typeof c != "string" || !c) return null;
                    var d, f;
                    try {
                        a.DOMParser ? (f = new DOMParser, d = f.parseFromString(c, "text/xml")) : (d = new ActiveXObject("Microsoft.XMLDOM"), d.async = "false", d.loadXML(c))
                    } catch (g) {
                        d = b
                    }(!d || !d.documentElement || d.getElementsByTagName("parsererror").length) && e.error("Invalid XML: " + c);
                    return d
                },
                noop: function () {},
                globalEval: function (b) {
                    b && j.test(b) && (a.execScript || function (b) {
                        a.eval.call(a, b)
                    })(b)
                },
                camelCase: function (a) {
                    return a.replace(w, "ms-").replace(v, x)
                },
                nodeName: function (a, b) {
                    return a.nodeName && a.nodeName.toUpperCase() === b.toUpperCase()
                },
                each: function (a, c, d) {
                    var f, g = 0,
                        h = a.length,
                        i = h === b || e.isFunction(a);
                    if (d) {
                        if (i) {
                            for (f in a)
                                if (c.apply(a[f], d) === !1) break
                        } else
                            for (; g < h;)
                                if (c.apply(a[g++], d) === !1) break
                    } else if (i) {
                        for (f in a)
                            if (c.call(a[f], f, a[f]) === !1) break
                    } else
                        for (; g < h;)
                            if (c.call(a[g], g, a[g++]) === !1) break; return a
                },
                trim: G ? function (a) {
                    return a == null ? "" : G.call(a)
                } : function (a) {
                    return a == null ? "" : (a + "").replace(k, "").replace(l, "")
                },
                makeArray: function (a, b) {
                    var c = b || [];
                    if (a != null) {
                        var d = e.type(a);
                        a.length == null || d === "string" || d === "function" || d === "regexp" || e.isWindow(a) ? E.call(c, a) : e.merge(c, a)
                    }
                    return c
                },
                inArray: function (a, b, c) {
                    var d;
                    if (b) {
                        if (H) return H.call(b, a, c);
                        d = b.length, c = c ? c < 0 ? Math.max(0, d + c) : c : 0;
                        for (; c < d; c++)
                            if (c in b && b[c] === a) return c
                    }
                    return -1
                },
                merge: function (a, c) {
                    var d = a.length,
                        e = 0;
                    if (typeof c.length == "number")
                        for (var f = c.length; e < f; e++) a[d++] = c[e];
                    else
                        while (c[e] !== b) a[d++] = c[e++];
                    a.length = d;
                    return a
                },
                grep: function (a, b, c) {
                    var d = [],
                        e;
                    c = !! c;
                    for (var f = 0, g = a.length; f < g; f++) e = !! b(a[f], f), c !== e && d.push(a[f]);
                    return d
                },
                map: function (a, c, d) {
                    var f, g, h = [],
                        i = 0,
                        j = a.length,
                        k = a instanceof e || j !== b && typeof j == "number" && (j > 0 && a[0] && a[j - 1] || j === 0 || e.isArray(a));
                    if (k)
                        for (; i < j; i++) f = c(a[i], i, d), f != null && (h[h.length] = f);
                    else
                        for (g in a) f = c(a[g], g, d), f != null && (h[h.length] = f);
                    return h.concat.apply([], h)
                },
                guid: 1,
                proxy: function (a, c) {
                    if (typeof c == "string") {
                        var d = a[c];
                        c = a, a = d
                    }
                    if (!e.isFunction(a)) return b;
                    var f = F.call(arguments, 2),
                        g = function () {
                            return a.apply(c, f.concat(F.call(arguments)))
                        };
                    g.guid = a.guid = a.guid || g.guid || e.guid++;
                    return g
                },
                access: function (a, c, d, f, g, h, i) {
                    var j, k = d == null,
                        l = 0,
                        m = a.length;
                    if (d && typeof d == "object") {
                        for (l in d) e.access(a, c, l, d[l], 1, h, f);
                        g = 1
                    } else if (f !== b) {
                        j = i === b && e.isFunction(f), k && (j ? (j = c, c = function (a, b, c) {
                            return j.call(e(a), c)
                        }) : (c.call(a, f), c = null));
                        if (c)
                            for (; l < m; l++) c(a[l], d, j ? f.call(a[l], l, c(a[l], d)) : f, i);
                        g = 1
                    }
                    return g ? a : k ? c.call(a) : m ? c(a[0], d) : h
                },
                now: function () {
                    return (new Date).getTime()
                },
                uaMatch: function (a) {
                    a = a.toLowerCase();
                    var b = r.exec(a) || s.exec(a) || t.exec(a) || a.indexOf("compatible") < 0 && u.exec(a) || [];
                    return {
                        browser: b[1] || "",
                        version: b[2] || "0"
                    }
                },
                sub: function () {
                    function a(b, c) {
                        return new a.fn.init(b, c)
                    }
                    e.extend(!0, a, this), a.superclass = this, a.fn = a.prototype = this(), a.fn.constructor = a, a.sub = this.sub, a.fn.init = function (d, f) {
                        f && f instanceof e && !(f instanceof a) && (f = a(f));
                        return e.fn.init.call(this, d, f, b)
                    }, a.fn.init.prototype = a.fn;
                    var b = a(c);
                    return a
                },
                browser: {}
            }), e.each("Boolean Number String Function Array Date RegExp Object".split(" "), function (a, b) {
                I["[object " + b + "]"] = b.toLowerCase()
            }), z = e.uaMatch(y), z.browser && (e.browser[z.browser] = !0, e.browser.version = z.version), e.browser.webkit && (e.browser.safari = !0), j.test(" ") && (k = /^[\s\xA0]+/, l = /[\s\xA0]+$/), h = e(c), c.addEventListener ? B = function () {
                c.removeEventListener("DOMContentLoaded", B, !1), e.ready()
            } : c.attachEvent && (B = function () {
                c.readyState === "complete" && (c.detachEvent("onreadystatechange", B), e.ready())
            });
            return e
        }(),
        g = {};
    f.Callbacks = function (a) {
        a = a ? g[a] || h(a) : {};
        var c = [],
            d = [],
            e, i, j, k, l, m, n = function (b) {
                var d, e, g, h, i;
                for (d = 0, e = b.length; d < e; d++) g = b[d], h = f.type(g), h === "array" ? n(g) : h === "function" && (!a.unique || !p.has(g)) && c.push(g)
            }, o = function (b, f) {
                f = f || [], e = !a.memory || [b, f], i = !0, j = !0, m = k || 0, k = 0, l = c.length;
                for (; c && m < l; m++)
                    if (c[m].apply(b, f) === !1 && a.stopOnFalse) {
                        e = !0;
                        break
                    }
                j = !1, c && (a.once ? e === !0 ? p.disable() : c = [] : d && d.length && (e = d.shift(), p.fireWith(e[0], e[1])))
            }, p = {
                add: function () {
                    if (c) {
                        var a = c.length;
                        n(arguments), j ? l = c.length : e && e !== !0 && (k = a, o(e[0], e[1]))
                    }
                    return this
                },
                remove: function () {
                    if (c) {
                        var b = arguments,
                            d = 0,
                            e = b.length;
                        for (; d < e; d++)
                            for (var f = 0; f < c.length; f++)
                                if (b[d] === c[f]) {
                                    j && f <= l && (l--, f <= m && m--), c.splice(f--, 1);
                                    if (a.unique) break
                                }
                    }
                    return this
                },
                has: function (a) {
                    if (c) {
                        var b = 0,
                            d = c.length;
                        for (; b < d; b++)
                            if (a === c[b]) return !0
                    }
                    return !1
                },
                empty: function () {
                    c = [];
                    return this
                },
                disable: function () {
                    c = d = e = b;
                    return this
                },
                disabled: function () {
                    return !c
                },
                lock: function () {
                    d = b, (!e || e === !0) && p.disable();
                    return this
                },
                locked: function () {
                    return !d
                },
                fireWith: function (b, c) {
                    d && (j ? a.once || d.push([b, c]) : (!a.once || !e) && o(b, c));
                    return this
                },
                fire: function () {
                    p.fireWith(this, arguments);
                    return this
                },
                fired: function () {
                    return !!i
                }
            };
        return p
    };
    var i = [].slice;
    f.extend({
        Deferred: function (a) {
            var b = f.Callbacks("once memory"),
                c = f.Callbacks("once memory"),
                d = f.Callbacks("memory"),
                e = "pending",
                g = {
                    resolve: b,
                    reject: c,
                    notify: d
                }, h = {
                    done: b.add,
                    fail: c.add,
                    progress: d.add,
                    state: function () {
                        return e
                    },
                    isResolved: b.fired,
                    isRejected: c.fired,
                    then: function (a, b, c) {
                        i.done(a).fail(b).progress(c);
                        return this
                    },
                    always: function () {
                        i.done.apply(i, arguments).fail.apply(i, arguments);
                        return this
                    },
                    pipe: function (a, b, c) {
                        return f.Deferred(function (d) {
                            f.each({
                                done: [a, "resolve"],
                                fail: [b, "reject"],
                                progress: [c, "notify"]
                            }, function (a, b) {
                                var c = b[0],
                                    e = b[1],
                                    g;
                                f.isFunction(c) ? i[a](function () {
                                    g = c.apply(this, arguments), g && f.isFunction(g.promise) ? g.promise().then(d.resolve, d.reject, d.notify) : d[e + "With"](this === i ? d : this, [g])
                                }) : i[a](d[e])
                            })
                        }).promise()
                    },
                    promise: function (a) {
                        if (a == null) a = h;
                        else
                            for (var b in h) a[b] = h[b];
                        return a
                    }
                }, i = h.promise({}),
                j;
            for (j in g) i[j] = g[j].fire, i[j + "With"] = g[j].fireWith;
            i.done(function () {
                e = "resolved"
            }, c.disable, d.lock).fail(function () {
                e = "rejected"
            }, b.disable, d.lock), a && a.call(i, i);
            return i
        },
        when: function (a) {
            function m(a) {
                return function (b) {
                    e[a] = arguments.length > 1 ? i.call(arguments, 0) : b, j.notifyWith(k, e)
                }
            }

            function l(a) {
                return function (c) {
                    b[a] = arguments.length > 1 ? i.call(arguments, 0) : c, --g || j.resolveWith(j, b)
                }
            }
            var b = i.call(arguments, 0),
                c = 0,
                d = b.length,
                e = Array(d),
                g = d,
                h = d,
                j = d <= 1 && a && f.isFunction(a.promise) ? a : f.Deferred(),
                k = j.promise();
            if (d > 1) {
                for (; c < d; c++) b[c] && b[c].promise && f.isFunction(b[c].promise) ? b[c].promise().then(l(c), j.reject, m(c)) : --g;
                g || j.resolveWith(j, b)
            } else j !== a && j.resolveWith(j, d ? [a] : []);
            return k
        }
    }), f.support = function () {
        var b, d, e, g, h, i, j, k, l, m, n, o, p = c.createElement("div"),
            q = c.documentElement;
        p.setAttribute("className", "t"), p.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>", d = p.getElementsByTagName("*"), e = p.getElementsByTagName("a")[0];
        if (!d || !d.length || !e) return {};
        g = c.createElement("select"), h = g.appendChild(c.createElement("option")), i = p.getElementsByTagName("input")[0], b = {
            leadingWhitespace: p.firstChild.nodeType === 3,
            tbody: !p.getElementsByTagName("tbody").length,
            htmlSerialize: !! p.getElementsByTagName("link").length,
            style: /top/.test(e.getAttribute("style")),
            hrefNormalized: e.getAttribute("href") === "/a",
            opacity: /^0.55/.test(e.style.opacity),
            cssFloat: !! e.style.cssFloat,
            checkOn: i.value === "on",
            optSelected: h.selected,
            getSetAttribute: p.className !== "t",
            enctype: !! c.createElement("form").enctype,
            html5Clone: c.createElement("nav").cloneNode(!0).outerHTML !== "<:nav></:nav>",
            submitBubbles: !0,
            changeBubbles: !0,
            focusinBubbles: !1,
            deleteExpando: !0,
            noCloneEvent: !0,
            inlineBlockNeedsLayout: !1,
            shrinkWrapBlocks: !1,
            reliableMarginRight: !0,
            pixelMargin: !0
        }, f.boxModel = b.boxModel = c.compatMode === "CSS1Compat", i.checked = !0, b.noCloneChecked = i.cloneNode(!0).checked, g.disabled = !0, b.optDisabled = !h.disabled;
        try {
            delete p.test
        } catch (r) {
            b.deleteExpando = !1
        }!p.addEventListener && p.attachEvent && p.fireEvent && (p.attachEvent("onclick", function () {
            b.noCloneEvent = !1
        }), p.cloneNode(!0).fireEvent("onclick")), i = c.createElement("input"), i.value = "t", i.setAttribute("type", "radio"), b.radioValue = i.value === "t", i.setAttribute("checked", "checked"), i.setAttribute("name", "t"), p.appendChild(i), j = c.createDocumentFragment(), j.appendChild(p.lastChild), b.checkClone = j.cloneNode(!0).cloneNode(!0).lastChild.checked, b.appendChecked = i.checked, j.removeChild(i), j.appendChild(p);
        if (p.attachEvent)
            for (n in {
                submit: 1,
                change: 1,
                focusin: 1
            }) m = "on" + n, o = m in p, o || (p.setAttribute(m, "return;"), o = typeof p[m] == "function"), b[n + "Bubbles"] = o;
        j.removeChild(p), j = g = h = p = i = null, f(function () {
            var d, e, g, h, i, j, l, m, n, q, r, s, t, u = c.getElementsByTagName("body")[0];
            !u || (m = 1, t = "padding:0;margin:0;border:", r = "position:absolute;top:0;left:0;width:1px;height:1px;", s = t + "0;visibility:hidden;", n = "style='" + r + t + "5px solid #000;", q = "<div " + n + "display:block;'><div style='" + t + "0;display:block;overflow:hidden;'></div></div>" + "<table " + n + "' cellpadding='0' cellspacing='0'>" + "<tr><td></td></tr></table>", d = c.createElement("div"), d.style.cssText = s + "width:0;height:0;position:static;top:0;margin-top:" + m + "px", u.insertBefore(d, u.firstChild), p = c.createElement("div"), d.appendChild(p), p.innerHTML = "<table><tr><td style='" + t + "0;display:none'></td><td>t</td></tr></table>", k = p.getElementsByTagName("td"), o = k[0].offsetHeight === 0, k[0].style.display = "", k[1].style.display = "none", b.reliableHiddenOffsets = o && k[0].offsetHeight === 0, a.getComputedStyle && (p.innerHTML = "", l = c.createElement("div"), l.style.width = "0", l.style.marginRight = "0", p.style.width = "2px", p.appendChild(l), b.reliableMarginRight = (parseInt((a.getComputedStyle(l, null) || {
                marginRight: 0
            }).marginRight, 10) || 0) === 0), typeof p.style.zoom != "undefined" && (p.innerHTML = "", p.style.width = p.style.padding = "1px", p.style.border = 0, p.style.overflow = "hidden", p.style.display = "inline", p.style.zoom = 1, b.inlineBlockNeedsLayout = p.offsetWidth === 3, p.style.display = "block", p.style.overflow = "visible", p.innerHTML = "<div style='width:5px;'></div>", b.shrinkWrapBlocks = p.offsetWidth !== 3), p.style.cssText = r + s, p.innerHTML = q, e = p.firstChild, g = e.firstChild, i = e.nextSibling.firstChild.firstChild, j = {
                doesNotAddBorder: g.offsetTop !== 5,
                doesAddBorderForTableAndCells: i.offsetTop === 5
            }, g.style.position = "fixed", g.style.top = "20px", j.fixedPosition = g.offsetTop === 20 || g.offsetTop === 15, g.style.position = g.style.top = "", e.style.overflow = "hidden", e.style.position = "relative", j.subtractsBorderForOverflowNotVisible = g.offsetTop === -5, j.doesNotIncludeMarginInBodyOffset = u.offsetTop !== m, a.getComputedStyle && (p.style.marginTop = "1%", b.pixelMargin = (a.getComputedStyle(p, null) || {
                marginTop: 0
            }).marginTop !== "1%"), typeof d.style.zoom != "undefined" && (d.style.zoom = 1), u.removeChild(d), l = p = d = null, f.extend(b, j))
        });
        return b
    }();
    var j = /^(?:\{.*\}|\[.*\])$/,
        k = /([A-Z])/g;
    f.extend({
        cache: {},
        uuid: 0,
        expando: "jQuery" + (f.fn.jquery + Math.random()).replace(/\D/g, ""),
        noData: {
            embed: !0,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            applet: !0
        },
        hasData: function (a) {
            a = a.nodeType ? f.cache[a[f.expando]] : a[f.expando];
            return !!a && !m(a)
        },
        data: function (a, c, d, e) {
            if ( !! f.acceptData(a)) {
                var g, h, i, j = f.expando,
                    k = typeof c == "string",
                    l = a.nodeType,
                    m = l ? f.cache : a,
                    n = l ? a[j] : a[j] && j,
                    o = c === "events";
                if ((!n || !m[n] || !o && !e && !m[n].data) && k && d === b) return;
                n || (l ? a[j] = n = ++f.uuid : n = j), m[n] || (m[n] = {}, l || (m[n].toJSON = f.noop));
                if (typeof c == "object" || typeof c == "function") e ? m[n] = f.extend(m[n], c) : m[n].data = f.extend(m[n].data, c);
                g = h = m[n], e || (h.data || (h.data = {}), h = h.data), d !== b && (h[f.camelCase(c)] = d);
                if (o && !h[c]) return g.events;
                k ? (i = h[c], i == null && (i = h[f.camelCase(c)])) : i = h;
                return i
            }
        },
        removeData: function (a, b, c) {
            if ( !! f.acceptData(a)) {
                var d, e, g, h = f.expando,
                    i = a.nodeType,
                    j = i ? f.cache : a,
                    k = i ? a[h] : h;
                if (!j[k]) return;
                if (b) {
                    d = c ? j[k] : j[k].data;
                    if (d) {
                        f.isArray(b) || (b in d ? b = [b] : (b = f.camelCase(b), b in d ? b = [b] : b = b.split(" ")));
                        for (e = 0, g = b.length; e < g; e++) delete d[b[e]];
                        if (!(c ? m : f.isEmptyObject)(d)) return
                    }
                }
                if (!c) {
                    delete j[k].data;
                    if (!m(j[k])) return
                }
                f.support.deleteExpando || !j.setInterval ? delete j[k] : j[k] = null, i && (f.support.deleteExpando ? delete a[h] : a.removeAttribute ? a.removeAttribute(h) : a[h] = null)
            }
        },
        _data: function (a, b, c) {
            return f.data(a, b, c, !0)
        },
        acceptData: function (a) {
            if (a.nodeName) {
                var b = f.noData[a.nodeName.toLowerCase()];
                if (b) return b !== !0 && a.getAttribute("classid") === b
            }
            return !0
        }
    }), f.fn.extend({
        data: function (a, c) {
            var d, e, g, h, i, j = this[0],
                k = 0,
                m = null;
            if (a === b) {
                if (this.length) {
                    m = f.data(j);
                    if (j.nodeType === 1 && !f._data(j, "parsedAttrs")) {
                        g = j.attributes;
                        for (i = g.length; k < i; k++) h = g[k].name, h.indexOf("data-") === 0 && (h = f.camelCase(h.substring(5)), l(j, h, m[h]));
                        f._data(j, "parsedAttrs", !0)
                    }
                }
                return m
            }
            if (typeof a == "object") return this.each(function () {
                f.data(this, a)
            });
            d = a.split(".", 2), d[1] = d[1] ? "." + d[1] : "", e = d[1] + "!";
            return f.access(this, function (c) {
                if (c === b) {
                    m = this.triggerHandler("getData" + e, [d[0]]), m === b && j && (m = f.data(j, a), m = l(j, a, m));
                    return m === b && d[1] ? this.data(d[0]) : m
                }
                d[1] = c, this.each(function () {
                    var b = f(this);
                    b.triggerHandler("setData" + e, d), f.data(this, a, c), b.triggerHandler("changeData" + e, d)
                })
            }, null, c, arguments.length > 1, null, !1)
        },
        removeData: function (a) {
            return this.each(function () {
                f.removeData(this, a)
            })
        }
    }), f.extend({
        _mark: function (a, b) {
            a && (b = (b || "fx") + "mark", f._data(a, b, (f._data(a, b) || 0) + 1))
        },
        _unmark: function (a, b, c) {
            a !== !0 && (c = b, b = a, a = !1);
            if (b) {
                c = c || "fx";
                var d = c + "mark",
                    e = a ? 0 : (f._data(b, d) || 1) - 1;
                e ? f._data(b, d, e) : (f.removeData(b, d, !0), n(b, c, "mark"))
            }
        },
        queue: function (a, b, c) {
            var d;
            if (a) {
                b = (b || "fx") + "queue", d = f._data(a, b), c && (!d || f.isArray(c) ? d = f._data(a, b, f.makeArray(c)) : d.push(c));
                return d || []
            }
        },
        dequeue: function (a, b) {
            b = b || "fx";
            var c = f.queue(a, b),
                d = c.shift(),
                e = {};
            d === "inprogress" && (d = c.shift()), d && (b === "fx" && c.unshift("inprogress"), f._data(a, b + ".run", e), d.call(a, function () {
                f.dequeue(a, b)
            }, e)), c.length || (f.removeData(a, b + "queue " + b + ".run", !0), n(a, b, "queue"))
        }
    }), f.fn.extend({
        queue: function (a, c) {
            var d = 2;
            typeof a != "string" && (c = a, a = "fx", d--);
            if (arguments.length < d) return f.queue(this[0], a);
            return c === b ? this : this.each(function () {
                var b = f.queue(this, a, c);
                a === "fx" && b[0] !== "inprogress" && f.dequeue(this, a)
            })
        },
        dequeue: function (a) {
            return this.each(function () {
                f.dequeue(this, a)
            })
        },
        delay: function (a, b) {
            a = f.fx ? f.fx.speeds[a] || a : a, b = b || "fx";
            return this.queue(b, function (b, c) {
                var d = setTimeout(b, a);
                c.stop = function () {
                    clearTimeout(d)
                }
            })
        },
        clearQueue: function (a) {
            return this.queue(a || "fx", [])
        },
        promise: function (a, c) {
            function m() {
                --h || d.resolveWith(e, [e])
            }
            typeof a != "string" && (c = a, a = b), a = a || "fx";
            var d = f.Deferred(),
                e = this,
                g = e.length,
                h = 1,
                i = a + "defer",
                j = a + "queue",
                k = a + "mark",
                l;
            while (g--)
                if (l = f.data(e[g], i, b, !0) || (f.data(e[g], j, b, !0) || f.data(e[g], k, b, !0)) && f.data(e[g], i, f.Callbacks("once memory"), !0)) h++, l.add(m);
            m();
            return d.promise(c)
        }
    });
    var o = /[\n\t\r]/g,
        p = /\s+/,
        q = /\r/g,
        r = /^(?:button|input)$/i,
        s = /^(?:button|input|object|select|textarea)$/i,
        t = /^a(?:rea)?$/i,
        u = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
        v = f.support.getSetAttribute,
        w, x, y;
    f.fn.extend({
        attr: function (a, b) {
            return f.access(this, f.attr, a, b, arguments.length > 1)
        },
        removeAttr: function (a) {
            return this.each(function () {
                f.removeAttr(this, a)
            })
        },
        prop: function (a, b) {
            return f.access(this, f.prop, a, b, arguments.length > 1)
        },
        removeProp: function (a) {
            a = f.propFix[a] || a;
            return this.each(function () {
                try {
                    this[a] = b, delete this[a]
                } catch (c) {}
            })
        },
        addClass: function (a) {
            var b, c, d, e, g, h, i;
            if (f.isFunction(a)) return this.each(function (b) {
                f(this).addClass(a.call(this, b, this.className))
            });
            if (a && typeof a == "string") {
                b = a.split(p);
                for (c = 0, d = this.length; c < d; c++) {
                    e = this[c];
                    if (e.nodeType === 1)
                        if (!e.className && b.length === 1) e.className = a;
                        else {
                            g = " " + e.className + " ";
                            for (h = 0, i = b.length; h < i; h++)~ g.indexOf(" " + b[h] + " ") || (g += b[h] + " ");
                            e.className = f.trim(g)
                        }
                }
            }
            return this
        },
        removeClass: function (a) {
            var c, d, e, g, h, i, j;
            if (f.isFunction(a)) return this.each(function (b) {
                f(this).removeClass(a.call(this, b, this.className))
            });
            if (a && typeof a == "string" || a === b) {
                c = (a || "").split(p);
                for (d = 0, e = this.length; d < e; d++) {
                    g = this[d];
                    if (g.nodeType === 1 && g.className)
                        if (a) {
                            h = (" " + g.className + " ").replace(o, " ");
                            for (i = 0, j = c.length; i < j; i++) h = h.replace(" " + c[i] + " ", " ");
                            g.className = f.trim(h)
                        } else g.className = ""
                }
            }
            return this
        },
        toggleClass: function (a, b) {
            var c = typeof a,
                d = typeof b == "boolean";
            if (f.isFunction(a)) return this.each(function (c) {
                f(this).toggleClass(a.call(this, c, this.className, b), b)
            });
            return this.each(function () {
                if (c === "string") {
                    var e, g = 0,
                        h = f(this),
                        i = b,
                        j = a.split(p);
                    while (e = j[g++]) i = d ? i : !h.hasClass(e), h[i ? "addClass" : "removeClass"](e)
                } else if (c === "undefined" || c === "boolean") this.className && f._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : f._data(this, "__className__") || ""
            })
        },
        hasClass: function (a) {
            var b = " " + a + " ",
                c = 0,
                d = this.length;
            for (; c < d; c++)
                if (this[c].nodeType === 1 && (" " + this[c].className + " ").replace(o, " ").indexOf(b) > -1) return !0;
            return !1
        },
        val: function (a) {
            var c, d, e, g = this[0]; {
                if ( !! arguments.length) {
                    e = f.isFunction(a);
                    return this.each(function (d) {
                        var g = f(this),
                            h;
                        if (this.nodeType === 1) {
                            e ? h = a.call(this, d, g.val()) : h = a, h == null ? h = "" : typeof h == "number" ? h += "" : f.isArray(h) && (h = f.map(h, function (a) {
                                return a == null ? "" : a + ""
                            })), c = f.valHooks[this.type] || f.valHooks[this.nodeName.toLowerCase()];
                            if (!c || !("set" in c) || c.set(this, h, "value") === b) this.value = h
                        }
                    })
                }
                if (g) {
                    c = f.valHooks[g.type] || f.valHooks[g.nodeName.toLowerCase()];
                    if (c && "get" in c && (d = c.get(g, "value")) !== b) return d;
                    d = g.value;
                    return typeof d == "string" ? d.replace(q, "") : d == null ? "" : d
                }
            }
        }
    }), f.extend({
        valHooks: {
            option: {
                get: function (a) {
                    var b = a.attributes.value;
                    return !b || b.specified ? a.value : a.text
                }
            },
            select: {
                get: function (a) {
                    var b, c, d, e, g = a.selectedIndex,
                        h = [],
                        i = a.options,
                        j = a.type === "select-one";
                    if (g < 0) return null;
                    c = j ? g : 0, d = j ? g + 1 : i.length;
                    for (; c < d; c++) {
                        e = i[c];
                        if (e.selected && (f.support.optDisabled ? !e.disabled : e.getAttribute("disabled") === null) && (!e.parentNode.disabled || !f.nodeName(e.parentNode, "optgroup"))) {
                            b = f(e).val();
                            if (j) return b;
                            h.push(b)
                        }
                    }
                    if (j && !h.length && i.length) return f(i[g]).val();
                    return h
                },
                set: function (a, b) {
                    var c = f.makeArray(b);
                    f(a).find("option").each(function () {
                        this.selected = f.inArray(f(this).val(), c) >= 0
                    }), c.length || (a.selectedIndex = -1);
                    return c
                }
            }
        },
        attrFn: {
            val: !0,
            css: !0,
            html: !0,
            text: !0,
            data: !0,
            width: !0,
            height: !0,
            offset: !0
        },
        attr: function (a, c, d, e) {
            var g, h, i, j = a.nodeType;
            if ( !! a && j !== 3 && j !== 8 && j !== 2) {
                if (e && c in f.attrFn) return f(a)[c](d);
                if (typeof a.getAttribute == "undefined") return f.prop(a, c, d);
                i = j !== 1 || !f.isXMLDoc(a), i && (c = c.toLowerCase(), h = f.attrHooks[c] || (u.test(c) ? x : w));
                if (d !== b) {
                    if (d === null) {
                        f.removeAttr(a, c);
                        return
                    }
                    if (h && "set" in h && i && (g = h.set(a, d, c)) !== b) return g;
                    a.setAttribute(c, "" + d);
                    return d
                }
                if (h && "get" in h && i && (g = h.get(a, c)) !== null) return g;
                g = a.getAttribute(c);
                return g === null ? b : g
            }
        },
        removeAttr: function (a, b) {
            var c, d, e, g, h, i = 0;
            if (b && a.nodeType === 1) {
                d = b.toLowerCase().split(p), g = d.length;
                for (; i < g; i++) e = d[i], e && (c = f.propFix[e] || e, h = u.test(e), h || f.attr(a, e, ""), a.removeAttribute(v ? e : c), h && c in a && (a[c] = !1))
            }
        },
        attrHooks: {
            type: {
                set: function (a, b) {
                    if (r.test(a.nodeName) && a.parentNode) f.error("type property can't be changed");
                    else if (!f.support.radioValue && b === "radio" && f.nodeName(a, "input")) {
                        var c = a.value;
                        a.setAttribute("type", b), c && (a.value = c);
                        return b
                    }
                }
            },
            value: {
                get: function (a, b) {
                    if (w && f.nodeName(a, "button")) return w.get(a, b);
                    return b in a ? a.value : null
                },
                set: function (a, b, c) {
                    if (w && f.nodeName(a, "button")) return w.set(a, b, c);
                    a.value = b
                }
            }
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        prop: function (a, c, d) {
            var e, g, h, i = a.nodeType;
            if ( !! a && i !== 3 && i !== 8 && i !== 2) {
                h = i !== 1 || !f.isXMLDoc(a), h && (c = f.propFix[c] || c, g = f.propHooks[c]);
                return d !== b ? g && "set" in g && (e = g.set(a, d, c)) !== b ? e : a[c] = d : g && "get" in g && (e = g.get(a, c)) !== null ? e : a[c]
            }
        },
        propHooks: {
            tabIndex: {
                get: function (a) {
                    var c = a.getAttributeNode("tabindex");
                    return c && c.specified ? parseInt(c.value, 10) : s.test(a.nodeName) || t.test(a.nodeName) && a.href ? 0 : b
                }
            }
        }
    }), f.attrHooks.tabindex = f.propHooks.tabIndex, x = {
        get: function (a, c) {
            var d, e = f.prop(a, c);
            return e === !0 || typeof e != "boolean" && (d = a.getAttributeNode(c)) && d.nodeValue !== !1 ? c.toLowerCase() : b
        },
        set: function (a, b, c) {
            var d;
            b === !1 ? f.removeAttr(a, c) : (d = f.propFix[c] || c, d in a && (a[d] = !0), a.setAttribute(c, c.toLowerCase()));
            return c
        }
    }, v || (y = {
        name: !0,
        id: !0,
        coords: !0
    }, w = f.valHooks.button = {
        get: function (a, c) {
            var d;
            d = a.getAttributeNode(c);
            return d && (y[c] ? d.nodeValue !== "" : d.specified) ? d.nodeValue : b
        },
        set: function (a, b, d) {
            var e = a.getAttributeNode(d);
            e || (e = c.createAttribute(d), a.setAttributeNode(e));
            return e.nodeValue = b + ""
        }
    }, f.attrHooks.tabindex.set = w.set, f.each(["width", "height"], function (a, b) {
        f.attrHooks[b] = f.extend(f.attrHooks[b], {
            set: function (a, c) {
                if (c === "") {
                    a.setAttribute(b, "auto");
                    return c
                }
            }
        })
    }), f.attrHooks.contenteditable = {
        get: w.get,
        set: function (a, b, c) {
            b === "" && (b = "false"), w.set(a, b, c)
        }
    }), f.support.hrefNormalized || f.each(["href", "src", "width", "height"], function (a, c) {
        f.attrHooks[c] = f.extend(f.attrHooks[c], {
            get: function (a) {
                var d = a.getAttribute(c, 2);
                return d === null ? b : d
            }
        })
    }), f.support.style || (f.attrHooks.style = {
        get: function (a) {
            return a.style.cssText.toLowerCase() || b
        },
        set: function (a, b) {
            return a.style.cssText = "" + b
        }
    }), f.support.optSelected || (f.propHooks.selected = f.extend(f.propHooks.selected, {
        get: function (a) {
            var b = a.parentNode;
            b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex);
            return null
        }
    })), f.support.enctype || (f.propFix.enctype = "encoding"), f.support.checkOn || f.each(["radio", "checkbox"], function () {
        f.valHooks[this] = {
            get: function (a) {
                return a.getAttribute("value") === null ? "on" : a.value
            }
        }
    }), f.each(["radio", "checkbox"], function () {
        f.valHooks[this] = f.extend(f.valHooks[this], {
            set: function (a, b) {
                if (f.isArray(b)) return a.checked = f.inArray(f(a).val(), b) >= 0
            }
        })
    });
    var z = /^(?:textarea|input|select)$/i,
        A = /^([^\.]*)?(?:\.(.+))?$/,
        B = /(?:^|\s)hover(\.\S+)?\b/,
        C = /^key/,
        D = /^(?:mouse|contextmenu)|click/,
        E = /^(?:focusinfocus|focusoutblur)$/,
        F = /^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,
        G = function (
            a) {
            var b = F.exec(a);
            b && (b[1] = (b[1] || "").toLowerCase(), b[3] = b[3] && new RegExp("(?:^|\\s)" + b[3] + "(?:\\s|$)"));
            return b
        }, H = function (a, b) {
            var c = a.attributes || {};
            return (!b[1] || a.nodeName.toLowerCase() === b[1]) && (!b[2] || (c.id || {}).value === b[2]) && (!b[3] || b[3].test((c["class"] || {}).value))
        }, I = function (a) {
            return f.event.special.hover ? a : a.replace(B, "mouseenter$1 mouseleave$1")
        };
    f.event = {
        add: function (a, c, d, e, g) {
            var h, i, j, k, l, m, n, o, p, q, r, s;
            if (!(a.nodeType === 3 || a.nodeType === 8 || !c || !d || !(h = f._data(a)))) {
                d.handler && (p = d, d = p.handler, g = p.selector), d.guid || (d.guid = f.guid++), j = h.events, j || (h.events = j = {}), i = h.handle, i || (h.handle = i = function (a) {
                    return typeof f != "undefined" && (!a || f.event.triggered !== a.type) ? f.event.dispatch.apply(i.elem, arguments) : b
                }, i.elem = a), c = f.trim(I(c)).split(" ");
                for (k = 0; k < c.length; k++) {
                    l = A.exec(c[k]) || [], m = l[1], n = (l[2] || "").split(".").sort(), s = f.event.special[m] || {}, m = (g ? s.delegateType : s.bindType) || m, s = f.event.special[m] || {}, o = f.extend({
                        type: m,
                        origType: l[1],
                        data: e,
                        handler: d,
                        guid: d.guid,
                        selector: g,
                        quick: g && G(g),
                        namespace: n.join(".")
                    }, p), r = j[m];
                    if (!r) {
                        r = j[m] = [], r.delegateCount = 0;
                        if (!s.setup || s.setup.call(a, e, n, i) === !1) a.addEventListener ? a.addEventListener(m, i, !1) : a.attachEvent && a.attachEvent("on" + m, i)
                    }
                    s.add && (s.add.call(a, o), o.handler.guid || (o.handler.guid = d.guid)), g ? r.splice(r.delegateCount++, 0, o) : r.push(o), f.event.global[m] = !0
                }
                a = null
            }
        },
        global: {},
        remove: function (a, b, c, d, e) {
            var g = f.hasData(a) && f._data(a),
                h, i, j, k, l, m, n, o, p, q, r, s;
            if ( !! g && !! (o = g.events)) {
                b = f.trim(I(b || "")).split(" ");
                for (h = 0; h < b.length; h++) {
                    i = A.exec(b[h]) || [], j = k = i[1], l = i[2];
                    if (!j) {
                        for (j in o) f.event.remove(a, j + b[h], c, d, !0);
                        continue
                    }
                    p = f.event.special[j] || {}, j = (d ? p.delegateType : p.bindType) || j, r = o[j] || [], m = r.length, l = l ? new RegExp("(^|\\.)" + l.split(".").sort().join("\\.(?:.*\\.)?") + "(\\.|$)") : null;
                    for (n = 0; n < r.length; n++) s = r[n], (e || k === s.origType) && (!c || c.guid === s.guid) && (!l || l.test(s.namespace)) && (!d || d === s.selector || d === "**" && s.selector) && (r.splice(n--, 1), s.selector && r.delegateCount--, p.remove && p.remove.call(a, s));
                    r.length === 0 && m !== r.length && ((!p.teardown || p.teardown.call(a, l) === !1) && f.removeEvent(a, j, g.handle), delete o[j])
                }
                f.isEmptyObject(o) && (q = g.handle, q && (q.elem = null), f.removeData(a, ["events", "handle"], !0))
            }
        },
        customEvent: {
            getData: !0,
            setData: !0,
            changeData: !0
        },
        trigger: function (c, d, e, g) {
            if (!e || e.nodeType !== 3 && e.nodeType !== 8) {
                var h = c.type || c,
                    i = [],
                    j, k, l, m, n, o, p, q, r, s;
                if (E.test(h + f.event.triggered)) return;
                h.indexOf("!") >= 0 && (h = h.slice(0, -1), k = !0), h.indexOf(".") >= 0 && (i = h.split("."), h = i.shift(), i.sort());
                if ((!e || f.event.customEvent[h]) && !f.event.global[h]) return;
                c = typeof c == "object" ? c[f.expando] ? c : new f.Event(h, c) : new f.Event(h), c.type = h, c.isTrigger = !0, c.exclusive = k, c.namespace = i.join("."), c.namespace_re = c.namespace ? new RegExp("(^|\\.)" + i.join("\\.(?:.*\\.)?") + "(\\.|$)") : null, o = h.indexOf(":") < 0 ? "on" + h : "";
                if (!e) {
                    j = f.cache;
                    for (l in j) j[l].events && j[l].events[h] && f.event.trigger(c, d, j[l].handle.elem, !0);
                    return
                }
                c.result = b, c.target || (c.target = e), d = d != null ? f.makeArray(d) : [], d.unshift(c), p = f.event.special[h] || {};
                if (p.trigger && p.trigger.apply(e, d) === !1) return;
                r = [
                    [e, p.bindType || h]
                ];
                if (!g && !p.noBubble && !f.isWindow(e)) {
                    s = p.delegateType || h, m = E.test(s + h) ? e : e.parentNode, n = null;
                    for (; m; m = m.parentNode) r.push([m, s]), n = m;
                    n && n === e.ownerDocument && r.push([n.defaultView || n.parentWindow || a, s])
                }
                for (l = 0; l < r.length && !c.isPropagationStopped(); l++) m = r[l][0], c.type = r[l][1], q = (f._data(m, "events") || {})[c.type] && f._data(m, "handle"), q && q.apply(m, d), q = o && m[o], q && f.acceptData(m) && q.apply(m, d) === !1 && c.preventDefault();
                c.type = h, !g && !c.isDefaultPrevented() && (!p._default || p._default.apply(e.ownerDocument, d) === !1) && (h !== "click" || !f.nodeName(e, "a")) && f.acceptData(e) && o && e[h] && (h !== "focus" && h !== "blur" || c.target.offsetWidth !== 0) && !f.isWindow(e) && (n = e[o], n && (e[o] = null), f.event.triggered = h, e[h](), f.event.triggered = b, n && (e[o] = n));
                return c.result
            }
        },
        dispatch: function (c) {
            c = f.event.fix(c || a.event);
            var d = (f._data(this, "events") || {})[c.type] || [],
                e = d.delegateCount,
                g = [].slice.call(arguments, 0),
                h = !c.exclusive && !c.namespace,
                i = f.event.special[c.type] || {}, j = [],
                k, l, m, n, o, p, q, r, s, t, u;
            g[0] = c, c.delegateTarget = this;
            if (!i.preDispatch || i.preDispatch.call(this, c) !== !1) {
                if (e && (!c.button || c.type !== "click")) {
                    n = f(this), n.context = this.ownerDocument || this;
                    for (m = c.target; m != this; m = m.parentNode || this)
                        if (m.disabled !== !0) {
                            p = {}, r = [], n[0] = m;
                            for (k = 0; k < e; k++) s = d[k], t = s.selector, p[t] === b && (p[t] = s.quick ? H(m, s.quick) : n.is(t)), p[t] && r.push(s);
                            r.length && j.push({
                                elem: m,
                                matches: r
                            })
                        }
                }
                d.length > e && j.push({
                    elem: this,
                    matches: d.slice(e)
                });
                for (k = 0; k < j.length && !c.isPropagationStopped(); k++) {
                    q = j[k], c.currentTarget = q.elem;
                    for (l = 0; l < q.matches.length && !c.isImmediatePropagationStopped(); l++) {
                        s = q.matches[l];
                        if (h || !c.namespace && !s.namespace || c.namespace_re && c.namespace_re.test(s.namespace)) c.data = s.data, c.handleObj = s, o = ((f.event.special[s.origType] || {}).handle || s.handler).apply(q.elem, g), o !== b && (c.result = o, o === !1 && (c.preventDefault(), c.stopPropagation()))
                    }
                }
                i.postDispatch && i.postDispatch.call(this, c);
                return c.result
            }
        },
        props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function (a, b) {
                a.which == null && (a.which = b.charCode != null ? b.charCode : b.keyCode);
                return a
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function (a, d) {
                var e, f, g, h = d.button,
                    i = d.fromElement;
                a.pageX == null && d.clientX != null && (e = a.target.ownerDocument || c, f = e.documentElement, g = e.body, a.pageX = d.clientX + (f && f.scrollLeft || g && g.scrollLeft || 0) - (f && f.clientLeft || g && g.clientLeft || 0), a.pageY = d.clientY + (f && f.scrollTop || g && g.scrollTop || 0) - (f && f.clientTop || g && g.clientTop || 0)), !a.relatedTarget && i && (a.relatedTarget = i === a.target ? d.toElement : i), !a.which && h !== b && (a.which = h & 1 ? 1 : h & 2 ? 3 : h & 4 ? 2 : 0);
                return a
            }
        },
        fix: function (a) {
            if (a[f.expando]) return a;
            var d, e, g = a,
                h = f.event.fixHooks[a.type] || {}, i = h.props ? this.props.concat(h.props) : this.props;
            a = f.Event(g);
            for (d = i.length; d;) e = i[--d], a[e] = g[e];
            a.target || (a.target = g.srcElement || c), a.target.nodeType === 3 && (a.target = a.target.parentNode), a.metaKey === b && (a.metaKey = a.ctrlKey);
            return h.filter ? h.filter(a, g) : a
        },
        special: {
            ready: {
                setup: f.bindReady
            },
            load: {
                noBubble: !0
            },
            focus: {
                delegateType: "focusin"
            },
            blur: {
                delegateType: "focusout"
            },
            beforeunload: {
                setup: function (a, b, c) {
                    f.isWindow(this) && (this.onbeforeunload = c)
                },
                teardown: function (a, b) {
                    this.onbeforeunload === b && (this.onbeforeunload = null)
                }
            }
        },
        simulate: function (a, b, c, d) {
            var e = f.extend(new f.Event, c, {
                type: a,
                isSimulated: !0,
                originalEvent: {}
            });
            d ? f.event.trigger(e, null, b) : f.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault()
        }
    }, f.event.handle = f.event.dispatch, f.removeEvent = c.removeEventListener ? function (a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c, !1)
    } : function (a, b, c) {
        a.detachEvent && a.detachEvent("on" + b, c)
    }, f.Event = function (a, b) {
        if (!(this instanceof f.Event)) return new f.Event(a, b);
        a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault() ? K : J) : this.type = a, b && f.extend(this, b), this.timeStamp = a && a.timeStamp || f.now(), this[f.expando] = !0
    }, f.Event.prototype = {
        preventDefault: function () {
            this.isDefaultPrevented = K;
            var a = this.originalEvent;
            !a || (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
        },
        stopPropagation: function () {
            this.isPropagationStopped = K;
            var a = this.originalEvent;
            !a || (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
        },
        stopImmediatePropagation: function () {
            this.isImmediatePropagationStopped = K, this.stopPropagation()
        },
        isDefaultPrevented: J,
        isPropagationStopped: J,
        isImmediatePropagationStopped: J
    }, f.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function (a, b) {
        f.event.special[a] = {
            delegateType: b,
            bindType: b,
            handle: function (a) {
                var c = this,
                    d = a.relatedTarget,
                    e = a.handleObj,
                    g = e.selector,
                    h;
                if (!d || d !== c && !f.contains(c, d)) a.type = e.origType, h = e.handler.apply(this, arguments), a.type = b;
                return h
            }
        }
    }), f.support.submitBubbles || (f.event.special.submit = {
        setup: function () {
            if (f.nodeName(this, "form")) return !1;
            f.event.add(this, "click._submit keypress._submit", function (a) {
                var c = a.target,
                    d = f.nodeName(c, "input") || f.nodeName(c, "button") ? c.form : b;
                d && !d._submit_attached && (f.event.add(d, "submit._submit", function (a) {
                    a._submit_bubble = !0
                }), d._submit_attached = !0)
            })
        },
        postDispatch: function (a) {
            a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && f.event.simulate("submit", this.parentNode, a, !0))
        },
        teardown: function () {
            if (f.nodeName(this, "form")) return !1;
            f.event.remove(this, "._submit")
        }
    }), f.support.changeBubbles || (f.event.special.change = {
        setup: function () {
            if (z.test(this.nodeName)) {
                if (this.type === "checkbox" || this.type === "radio") f.event.add(this, "propertychange._change", function (a) {
                    a.originalEvent.propertyName === "checked" && (this._just_changed = !0)
                }), f.event.add(this, "click._change", function (a) {
                    this._just_changed && !a.isTrigger && (this._just_changed = !1, f.event.simulate("change", this, a, !0))
                });
                return !1
            }
            f.event.add(this, "beforeactivate._change", function (a) {
                var b = a.target;
                z.test(b.nodeName) && !b._change_attached && (f.event.add(b, "change._change", function (a) {
                    this.parentNode && !a.isSimulated && !a.isTrigger && f.event.simulate("change", this.parentNode, a, !0)
                }), b._change_attached = !0)
            })
        },
        handle: function (a) {
            var b = a.target;
            if (this !== b || a.isSimulated || a.isTrigger || b.type !== "radio" && b.type !== "checkbox") return a.handleObj.handler.apply(this, arguments)
        },
        teardown: function () {
            f.event.remove(this, "._change");
            return z.test(this.nodeName)
        }
    }), f.support.focusinBubbles || f.each({
        focus: "focusin",
        blur: "focusout"
    }, function (a, b) {
        var d = 0,
            e = function (a) {
                f.event.simulate(b, a.target, f.event.fix(a), !0)
            };
        f.event.special[b] = {
            setup: function () {
                d++ === 0 && c.addEventListener(a, e, !0)
            },
            teardown: function () {
                --d === 0 && c.removeEventListener(a, e, !0)
            }
        }
    }), f.fn.extend({
        on: function (a, c, d, e, g) {
            var h, i;
            if (typeof a == "object") {
                typeof c != "string" && (d = d || c, c = b);
                for (i in a) this.on(i, c, d, a[i], g);
                return this
            }
            d == null && e == null ? (e = c, d = c = b) : e == null && (typeof c == "string" ? (e = d, d = b) : (e = d, d = c, c = b));
            if (e === !1) e = J;
            else if (!e) return this;
            g === 1 && (h = e, e = function (a) {
                f().off(a);
                return h.apply(this, arguments)
            }, e.guid = h.guid || (h.guid = f.guid++));
            return this.each(function () {
                f.event.add(this, a, e, d, c)
            })
        },
        one: function (a, b, c, d) {
            return this.on(a, b, c, d, 1)
        },
        off: function (a, c, d) {
            if (a && a.preventDefault && a.handleObj) {
                var e = a.handleObj;
                f(a.delegateTarget).off(e.namespace ? e.origType + "." + e.namespace : e.origType, e.selector, e.handler);
                return this
            }
            if (typeof a == "object") {
                for (var g in a) this.off(g, c, a[g]);
                return this
            }
            if (c === !1 || typeof c == "function") d = c, c = b;
            d === !1 && (d = J);
            return this.each(function () {
                f.event.remove(this, a, d, c)
            })
        },
        bind: function (a, b, c) {
            return this.on(a, null, b, c)
        },
        unbind: function (a, b) {
            return this.off(a, null, b)
        },
        live: function (a, b, c) {
            f(this.context).on(a, this.selector, b, c);
            return this
        },
        die: function (a, b) {
            f(this.context).off(a, this.selector || "**", b);
            return this
        },
        delegate: function (a, b, c, d) {
            return this.on(b, a, c, d)
        },
        undelegate: function (a, b, c) {
            return arguments.length == 1 ? this.off(a, "**") : this.off(b, a, c)
        },
        trigger: function (a, b) {
            return this.each(function () {
                f.event.trigger(a, b, this)
            })
        },
        triggerHandler: function (a, b) {
            if (this[0]) return f.event.trigger(a, b, this[0], !0)
        },
        toggle: function (a) {
            var b = arguments,
                c = a.guid || f.guid++,
                d = 0,
                e = function (c) {
                    var e = (f._data(this, "lastToggle" + a.guid) || 0) % d;
                    f._data(this, "lastToggle" + a.guid, e + 1), c.preventDefault();
                    return b[e].apply(this, arguments) || !1
                };
            e.guid = c;
            while (d < b.length) b[d++].guid = c;
            return this.click(e)
        },
        hover: function (a, b) {
            return this.mouseenter(a).mouseleave(b || a)
        }
    }), f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (a, b) {
        f.fn[b] = function (a, c) {
            c == null && (c = a, a = null);
            return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
        }, f.attrFn && (f.attrFn[b] = !0), C.test(b) && (f.event.fixHooks[b] = f.event.keyHooks), D.test(b) && (f.event.fixHooks[b] = f.event.mouseHooks)
    }),
    function () {
        function x(a, b, c, e, f, g) {
            for (var h = 0, i = e.length; h < i; h++) {
                var j = e[h];
                if (j) {
                    var k = !1;
                    j = j[a];
                    while (j) {
                        if (j[d] === c) {
                            k = e[j.sizset];
                            break
                        }
                        if (j.nodeType === 1) {
                            g || (j[d] = c, j.sizset = h);
                            if (typeof b != "string") {
                                if (j === b) {
                                    k = !0;
                                    break
                                }
                            } else if (m.filter(b, [j]).length > 0) {
                                k = j;
                                break
                            }
                        }
                        j = j[a]
                    }
                    e[h] = k
                }
            }
        }

        function w(a, b, c, e, f, g) {
            for (var h = 0, i = e.length; h < i; h++) {
                var j = e[h];
                if (j) {
                    var k = !1;
                    j = j[a];
                    while (j) {
                        if (j[d] === c) {
                            k = e[j.sizset];
                            break
                        }
                        j.nodeType === 1 && !g && (j[d] = c, j.sizset = h);
                        if (j.nodeName.toLowerCase() === b) {
                            k = j;
                            break
                        }
                        j = j[a]
                    }
                    e[h] = k
                }
            }
        }
        var a = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
            d = "sizcache" + (Math.random() + "").replace(".", ""),
            e = 0,
            g = Object.prototype.toString,
            h = !1,
            i = !0,
            j = /\\/g,
            k = /\r\n/g,
            l = /\W/;
        [0, 0].sort(function () {
                i = !1;
                return 0
            });
        var m = function (b, d, e, f) {
            e = e || [], d = d || c;
            var h = d;
            if (d.nodeType !== 1 && d.nodeType !== 9) return [];
            if (!b || typeof b != "string") return e;
            var i, j, k, l, n, q, r, t, u = !0,
                v = m.isXML(d),
                w = [],
                x = b;
            do {
                a.exec(""), i = a.exec(x);
                if (i) {
                    x = i[3], w.push(i[1]);
                    if (i[2]) {
                        l = i[3];
                        break
                    }
                }
            } while (i);
            if (w.length > 1 && p.exec(b))
                if (w.length === 2 && o.relative[w[0]]) j = y(w[0] + w[1], d, f);
                else {
                    j = o.relative[w[0]] ? [d] : m(w.shift(), d);
                    while (w.length) b = w.shift(), o.relative[b] && (b += w.shift()), j = y(b, j, f)
                } else {
                    !f && w.length > 1 && d.nodeType === 9 && !v && o.match.ID.test(w[0]) && !o.match.ID.test(w[w.length - 1]) && (n = m.find(w.shift(), d, v), d = n.expr ? m.filter(n.expr, n.set)[0] : n.set[0]);
                    if (d) {
                        n = f ? {
                            expr: w.pop(),
                            set: s(f)
                        } : m.find(w.pop(), w.length === 1 && (w[0] === "~" || w[0] === "+") && d.parentNode ? d.parentNode : d, v), j = n.expr ? m.filter(n.expr, n.set) : n.set, w.length > 0 ? k = s(j) : u = !1;
                        while (w.length) q = w.pop(), r = q, o.relative[q] ? r = w.pop() : q = "", r == null && (r = d), o.relative[q](k, r, v)
                    } else k = w = []
                }
            k || (k = j), k || m.error(q || b);
            if (g.call(k) === "[object Array]")
                if (!u) e.push.apply(e, k);
                else if (d && d.nodeType === 1)
                for (t = 0; k[t] != null; t++) k[t] && (k[t] === !0 || k[t].nodeType === 1 && m.contains(d, k[t])) && e.push(j[t]);
            else
                for (t = 0; k[t] != null; t++) k[t] && k[t].nodeType === 1 && e.push(j[t]);
            else s(k, e);
            l && (m(l, h, e, f), m.uniqueSort(e));
            return e
        };
        m.uniqueSort = function (a) {
            if (u) {
                h = i, a.sort(u);
                if (h)
                    for (var b = 1; b < a.length; b++) a[b] === a[b - 1] && a.splice(b--, 1)
            }
            return a
        }, m.matches = function (a, b) {
            return m(a, null, null, b)
        }, m.matchesSelector = function (a, b) {
            return m(b, null, null, [a]).length > 0
        }, m.find = function (a, b, c) {
            var d, e, f, g, h, i;
            if (!a) return [];
            for (e = 0, f = o.order.length; e < f; e++) {
                h = o.order[e];
                if (g = o.leftMatch[h].exec(a)) {
                    i = g[1], g.splice(1, 1);
                    if (i.substr(i.length - 1) !== "\\") {
                        g[1] = (g[1] || "").replace(j, ""), d = o.find[h](g, b, c);
                        if (d != null) {
                            a = a.replace(o.match[h], "");
                            break
                        }
                    }
                }
            }
            d || (d = typeof b.getElementsByTagName != "undefined" ? b.getElementsByTagName("*") : []);
            return {
                set: d,
                expr: a
            }
        }, m.filter = function (a, c, d, e) {
            var f, g, h, i, j, k, l, n, p, q = a,
                r = [],
                s = c,
                t = c && c[0] && m.isXML(c[0]);
            while (a && c.length) {
                for (h in o.filter)
                    if ((f = o.leftMatch[h].exec(a)) != null && f[2]) {
                        k = o.filter[h], l = f[1], g = !1, f.splice(1, 1);
                        if (l.substr(l.length - 1) === "\\") continue;
                        s === r && (r = []);
                        if (o.preFilter[h]) {
                            f = o.preFilter[h](f, s, d, r, e, t);
                            if (!f) g = i = !0;
                            else if (f === !0) continue
                        }
                        if (f)
                            for (n = 0;
                                (j = s[n]) != null; n++) j && (i = k(j, f, n, s), p = e ^ i, d && i != null ? p ? g = !0 : s[n] = !1 : p && (r.push(j), g = !0));
                        if (i !== b) {
                            d || (s = r), a = a.replace(o.match[h], "");
                            if (!g) return [];
                            break
                        }
                    }
                if (a === q)
                    if (g == null) m.error(a);
                    else break;
                q = a
            }
            return s
        }, m.error = function (a) {
            throw new Error("Syntax error, unrecognized expression: " + a)
        };
        var n = m.getText = function (a) {
            var b, c, d = a.nodeType,
                e = "";
            if (d) {
                if (d === 1 || d === 9 || d === 11) {
                    if (typeof a.textContent == "string") return a.textContent;
                    if (typeof a.innerText == "string") return a.innerText.replace(k, "");
                    for (a = a.firstChild; a; a = a.nextSibling) e += n(a)
                } else if (d === 3 || d === 4) return a.nodeValue
            } else
                for (b = 0; c = a[b]; b++) c.nodeType !== 8 && (e += n(c));
            return e
        }, o = m.selectors = {
                order: ["ID", "NAME", "TAG"],
                match: {
                    ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                    CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                    NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
                    ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
                    TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
                    CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
                    POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
                    PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
                },
                leftMatch: {},
                attrMap: {
                    "class": "className",
                    "for": "htmlFor"
                },
                attrHandle: {
                    href: function (a) {
                        return a.getAttribute("href")
                    },
                    type: function (a) {
                        return a.getAttribute("type")
                    }
                },
                relative: {
                    "+": function (a, b) {
                        var c = typeof b == "string",
                            d = c && !l.test(b),
                            e = c && !d;
                        d && (b = b.toLowerCase());
                        for (var f = 0, g = a.length, h; f < g; f++)
                            if (h = a[f]) {
                                while ((h = h.previousSibling) && h.nodeType !== 1);
                                a[f] = e || h && h.nodeName.toLowerCase() === b ? h || !1 : h === b
                            }
                        e && m.filter(b, a, !0)
                    },
                    ">": function (a, b) {
                        var c, d = typeof b == "string",
                            e = 0,
                            f = a.length;
                        if (d && !l.test(b)) {
                            b = b.toLowerCase();
                            for (; e < f; e++) {
                                c = a[e];
                                if (c) {
                                    var g = c.parentNode;
                                    a[e] = g.nodeName.toLowerCase() === b ? g : !1
                                }
                            }
                        } else {
                            for (; e < f; e++) c = a[e], c && (a[e] = d ? c.parentNode : c.parentNode === b);
                            d && m.filter(b, a, !0)
                        }
                    },
                    "": function (a, b, c) {
                        var d, f = e++,
                            g = x;
                        typeof b == "string" && !l.test(b) && (b = b.toLowerCase(), d = b, g = w), g("parentNode", b, f, a, d, c)
                    },
                    "~": function (a, b, c) {
                        var d, f = e++,
                            g = x;
                        typeof b == "string" && !l.test(b) && (b = b.toLowerCase(), d = b, g = w), g("previousSibling", b, f, a, d, c)
                    }
                },
                find: {
                    ID: function (a, b, c) {
                        if (typeof b.getElementById != "undefined" && !c) {
                            var d = b.getElementById(a[1]);
                            return d && d.parentNode ? [d] : []
                        }
                    },
                    NAME: function (a, b) {
                        if (typeof b.getElementsByName != "undefined") {
                            var c = [],
                                d = b.getElementsByName(a[1]);
                            for (var e = 0, f = d.length; e < f; e++) d[e].getAttribute("name") === a[1] && c.push(d[e]);
                            return c.length === 0 ? null : c
                        }
                    },
                    TAG: function (a, b) {
                        if (typeof b.getElementsByTagName != "undefined") return b.getElementsByTagName(a[1])
                    }
                },
                preFilter: {
                    CLASS: function (a, b, c, d, e, f) {
                        a = " " + a[1].replace(j, "") + " ";
                        if (f) return a;
                        for (var g = 0, h;
                            (h = b[g]) != null; g++) h && (e ^ (h.className && (" " + h.className + " ").replace(/[\t\n\r]/g, " ").indexOf(a) >= 0) ? c || d.push(h) : c && (b[g] = !1));
                        return !1
                    },
                    ID: function (a) {
                        return a[1].replace(j, "")
                    },
                    TAG: function (a, b) {
                        return a[1].replace(j, "").toLowerCase()
                    },
                    CHILD: function (a) {
                        if (a[1] === "nth") {
                            a[2] || m.error(a[0]), a[2] = a[2].replace(/^\+|\s*/g, "");
                            var b = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2] === "even" && "2n" || a[2] === "odd" && "2n+1" || !/\D/.test(a[2]) && "0n+" + a[2] || a[2]);
                            a[2] = b[1] + (b[2] || 1) - 0, a[3] = b[3] - 0
                        } else a[2] && m.error(a[0]);
                        a[0] = e++;
                        return a
                    },
                    ATTR: function (a, b, c, d, e, f) {
                        var g = a[1] = a[1].replace(j, "");
                        !f && o.attrMap[g] && (a[1] = o.attrMap[g]), a[4] = (a[4] || a[5] || "").replace(j, ""), a[2] === "~=" && (a[4] = " " + a[4] + " ");
                        return a
                    },
                    PSEUDO: function (b, c, d, e, f) {
                        if (b[1] === "not")
                            if ((a.exec(b[3]) || "").length > 1 || /^\w/.test(b[3])) b[3] = m(b[3], null, null, c);
                            else {
                                var g = m.filter(b[3], c, d, !0 ^ f);
                                d || e.push.apply(e, g);
                                return !1
                            } else if (o.match.POS.test(b[0]) || o.match.CHILD.test(b[0])) return !0;
                        return b
                    },
                    POS: function (a) {
                        a.unshift(!0);
                        return a
                    }
                },
                filters: {
                    enabled: function (a) {
                        return a.disabled === !1 && a.type !== "hidden"
                    },
                    disabled: function (a) {
                        return a.disabled === !0
                    },
                    checked: function (a) {
                        return a.checked === !0
                    },
                    selected: function (a) {
                        a.parentNode && a.parentNode.selectedIndex;
                        return a.selected === !0
                    },
                    parent: function (a) {
                        return !!a.firstChild
                    },
                    empty: function (a) {
                        return !a.firstChild
                    },
                    has: function (a, b, c) {
                        return !!m(c[3], a).length
                    },
                    header: function (a) {
                        return /h\d/i.test(a.nodeName)
                    },
                    text: function (a) {
                        var b = a.getAttribute("type"),
                            c = a.type;
                        return a.nodeName.toLowerCase() === "input" && "text" === c && (b === c || b === null)
                    },
                    radio: function (a) {
                        return a.nodeName.toLowerCase() === "input" && "radio" === a.type
                    },
                    checkbox: function (a) {
                        return a.nodeName.toLowerCase() === "input" && "checkbox" === a.type
                    },
                    file: function (a) {
                        return a.nodeName.toLowerCase() === "input" && "file" === a.type
                    },
                    password: function (a) {
                        return a.nodeName.toLowerCase() === "input" && "password" === a.type
                    },
                    submit: function (a) {
                        var b = a.nodeName.toLowerCase();
                        return (b === "input" || b === "button") && "submit" === a.type
                    },
                    image: function (a) {
                        return a.nodeName.toLowerCase() === "input" && "image" === a.type
                    },
                    reset: function (a) {
                        var b = a.nodeName.toLowerCase();
                        return (b === "input" || b === "button") && "reset" === a.type
                    },
                    button: function (a) {
                        var b = a.nodeName.toLowerCase();
                        return b === "input" && "button" === a.type || b === "button"
                    },
                    input: function (a) {
                        return /input|select|textarea|button/i.test(a.nodeName)
                    },
                    focus: function (a) {
                        return a === a.ownerDocument.activeElement
                    }
                },
                setFilters: {
                    first: function (a, b) {
                        return b === 0
                    },
                    last: function (a, b, c, d) {
                        return b === d.length - 1
                    },
                    even: function (a, b) {
                        return b % 2 === 0
                    },
                    odd: function (a, b) {
                        return b % 2 === 1
                    },
                    lt: function (a, b, c) {
                        return b < c[3] - 0
                    },
                    gt: function (a, b, c) {
                        return b > c[3] - 0
                    },
                    nth: function (a, b, c) {
                        return c[3] - 0 === b
                    },
                    eq: function (a, b, c) {
                        return c[3] - 0 === b
                    }
                },
                filter: {
                    PSEUDO: function (a, b, c, d) {
                        var e = b[1],
                            f = o.filters[e];
                        if (f) return f(a, c, b, d);
                        if (e === "contains") return (a.textContent || a.innerText || n([a]) || "").indexOf(b[3]) >= 0;
                        if (e === "not") {
                            var g = b[3];
                            for (var h = 0, i = g.length; h < i; h++)
                                if (g[h] === a) return !1;
                            return !0
                        }
                        m.error(e)
                    },
                    CHILD: function (a, b) {
                        var c, e, f, g, h, i, j, k = b[1],
                            l = a;
                        switch (k) {
                        case "only":
                        case "first":
                            while (l = l.previousSibling)
                                if (l.nodeType === 1) return !1;
                            if (k === "first") return !0;
                            l = a;
                        case "last":
                            while (l = l.nextSibling)
                                if (l.nodeType === 1) return !1;
                            return !0;
                        case "nth":
                            c = b[2], e = b[3];
                            if (c === 1 && e === 0) return !0;
                            f = b[0], g = a.parentNode;
                            if (g && (g[d] !== f || !a.nodeIndex)) {
                                i = 0;
                                for (l = g.firstChild; l; l = l.nextSibling) l.nodeType === 1 && (l.nodeIndex = ++i);
                                g[d] = f
                            }
                            j = a.nodeIndex - e;
                            return c === 0 ? j === 0 : j % c === 0 && j / c >= 0
                        }
                    },
                    ID: function (a, b) {
                        return a.nodeType === 1 && a.getAttribute("id") === b
                    },
                    TAG: function (a, b) {
                        return b === "*" && a.nodeType === 1 || !! a.nodeName && a.nodeName.toLowerCase() === b
                    },
                    CLASS: function (a, b) {
                        return (" " + (a.className || a.getAttribute("class")) + " ").indexOf(b) > -1
                    },
                    ATTR: function (a, b) {
                        var c = b[1],
                            d = m.attr ? m.attr(a, c) : o.attrHandle[c] ? o.attrHandle[c](a) : a[c] != null ? a[c] : a.getAttribute(c),
                            e = d + "",
                            f = b[2],
                            g = b[4];
                        return d == null ? f === "!=" : !f && m.attr ? d != null : f === "=" ? e === g : f === "*=" ? e.indexOf(g) >= 0 : f === "~=" ? (" " + e + " ").indexOf(g) >= 0 : g ? f === "!=" ? e !== g : f === "^=" ? e.indexOf(g) === 0 : f === "$=" ? e.substr(e.length - g.length) === g : f === "|=" ? e === g || e.substr(0, g.length + 1) === g + "-" : !1 : e && d !== !1
                    },
                    POS: function (a, b, c, d) {
                        var e = b[2],
                            f = o.setFilters[e];
                        if (f) return f(a, c, b, d)
                    }
                }
            }, p = o.match.POS,
            q = function (a, b) {
                return "\\" + (b - 0 + 1)
            };
        for (var r in o.match) o.match[r] = new RegExp(o.match[r].source + /(?![^\[]*\])(?![^\(]*\))/.source), o.leftMatch[r] = new RegExp(/(^(?:.|\r|\n)*?)/.source + o.match[r].source.replace(/\\(\d+)/g, q));
        o.match.globalPOS = p;
        var s = function (a, b) {
            a = Array.prototype.slice.call(a, 0);
            if (b) {
                b.push.apply(b, a);
                return b
            }
            return a
        };
        try {
            Array.prototype.slice.call(c.documentElement.childNodes, 0)[0].nodeType
        } catch (t) {
            s = function (a, b) {
                var c = 0,
                    d = b || [];
                if (g.call(a) === "[object Array]") Array.prototype.push.apply(d, a);
                else if (typeof a.length == "number")
                    for (var e = a.length; c < e; c++) d.push(a[c]);
                else
                    for (; a[c]; c++) d.push(a[c]);
                return d
            }
        }
        var u, v;
        c.documentElement.compareDocumentPosition ? u = function (a, b) {
            if (a === b) {
                h = !0;
                return 0
            }
            if (!a.compareDocumentPosition || !b.compareDocumentPosition) return a.compareDocumentPosition ? -1 : 1;
            return a.compareDocumentPosition(b) & 4 ? -1 : 1
        } : (u = function (a, b) {
            if (a === b) {
                h = !0;
                return 0
            }
            if (a.sourceIndex && b.sourceIndex) return a.sourceIndex - b.sourceIndex;
            var c, d, e = [],
                f = [],
                g = a.parentNode,
                i = b.parentNode,
                j = g;
            if (g === i) return v(a, b);
            if (!g) return -1;
            if (!i) return 1;
            while (j) e.unshift(j), j = j.parentNode;
            j = i;
            while (j) f.unshift(j), j = j.parentNode;
            c = e.length, d = f.length;
            for (var k = 0; k < c && k < d; k++)
                if (e[k] !== f[k]) return v(e[k], f[k]);
            return k === c ? v(a, f[k], -1) : v(e[k], b, 1)
        }, v = function (a, b, c) {
            if (a === b) return c;
            var d = a.nextSibling;
            while (d) {
                if (d === b) return -1;
                d = d.nextSibling
            }
            return 1
        }),
        function () {
            var a = c.createElement("div"),
                d = "script" + (new Date).getTime(),
                e = c.documentElement;
            a.innerHTML = "<a name='" + d + "'/>", e.insertBefore(a, e.firstChild), c.getElementById(d) && (o.find.ID = function (a, c, d) {
                if (typeof c.getElementById != "undefined" && !d) {
                    var e = c.getElementById(a[1]);
                    return e ? e.id === a[1] || typeof e.getAttributeNode != "undefined" && e.getAttributeNode("id").nodeValue === a[1] ? [e] : b : []
                }
            }, o.filter.ID = function (a, b) {
                var c = typeof a.getAttributeNode != "undefined" && a.getAttributeNode("id");
                return a.nodeType === 1 && c && c.nodeValue === b
            }), e.removeChild(a), e = a = null
        }(),
        function () {
            var a = c.createElement("div");
            a.appendChild(c.createComment("")), a.getElementsByTagName("*").length > 0 && (o.find.TAG = function (a, b) {
                var c = b.getElementsByTagName(a[1]);
                if (a[1] === "*") {
                    var d = [];
                    for (var e = 0; c[e]; e++) c[e].nodeType === 1 && d.push(c[e]);
                    c = d
                }
                return c
            }), a.innerHTML = "<a href='#'></a>", a.firstChild && typeof a.firstChild.getAttribute != "undefined" && a.firstChild.getAttribute("href") !== "#" && (o.attrHandle.href = function (a) {
                return a.getAttribute("href", 2)
            }), a = null
        }(), c.querySelectorAll && function () {
            var a = m,
                b = c.createElement("div"),
                d = "__sizzle__";
            b.innerHTML = "<p class='TEST'></p>";
            if (!b.querySelectorAll || b.querySelectorAll(".TEST").length !== 0) {
                m = function (b, e, f, g) {
                    e = e || c;
                    if (!g && !m.isXML(e)) {
                        var h = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);
                        if (h && (e.nodeType === 1 || e.nodeType === 9)) {
                            if (h[1]) return s(e.getElementsByTagName(b), f);
                            if (h[2] && o.find.CLASS && e.getElementsByClassName) return s(e.getElementsByClassName(h[2]), f)
                        }
                        if (e.nodeType === 9) {
                            if (b === "body" && e.body) return s([e.body], f);
                            if (h && h[3]) {
                                var i = e.getElementById(h[3]);
                                if (!i || !i.parentNode) return s([], f);
                                if (i.id === h[3]) return s([i], f)
                            }
                            try {
                                return s(e.querySelectorAll(b), f)
                            } catch (j) {}
                        } else if (e.nodeType === 1 && e.nodeName.toLowerCase() !== "object") {
                            var k = e,
                                l = e.getAttribute("id"),
                                n = l || d,
                                p = e.parentNode,
                                q = /^\s*[+~]/.test(b);
                            l ? n = n.replace(/'/g, "\\$&") : e.setAttribute("id", n), q && p && (e = e.parentNode);
                            try {
                                if (!q || p) return s(e.querySelectorAll("[id='" + n + "'] " + b), f)
                            } catch (r) {} finally {
                                l || k.removeAttribute("id")
                            }
                        }
                    }
                    return a(b, e, f, g)
                };
                for (var e in a) m[e] = a[e];
                b = null
            }
        }(),
        function () {
            var a = c.documentElement,
                b = a.matchesSelector || a.mozMatchesSelector || a.webkitMatchesSelector || a.msMatchesSelector;
            if (b) {
                var d = !b.call(c.createElement("div"), "div"),
                    e = !1;
                try {
                    b.call(c.documentElement, "[test!='']:sizzle")
                } catch (f) {
                    e = !0
                }
                m.matchesSelector = function (a, c) {
                    c = c.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
                    if (!m.isXML(a)) try {
                        if (e || !o.match.PSEUDO.test(c) && !/!=/.test(c)) {
                            var f = b.call(a, c);
                            if (f || !d || a.document && a.document.nodeType !== 11) return f
                        }
                    } catch (g) {}
                    return m(c, null, null, [a]).length > 0
                }
            }
        }(),
        function () {
            var a = c.createElement("div");
            a.innerHTML = "<div class='test e'></div><div class='test'></div>";
            if ( !! a.getElementsByClassName && a.getElementsByClassName("e").length !== 0) {
                a.lastChild.className = "e";
                if (a.getElementsByClassName("e").length === 1) return;
                o.order.splice(1, 0, "CLASS"), o.find.CLASS = function (a, b, c) {
                    if (typeof b.getElementsByClassName != "undefined" && !c) return b.getElementsByClassName(a[1])
                }, a = null
            }
        }(), c.documentElement.contains ? m.contains = function (a, b) {
            return a !== b && (a.contains ? a.contains(b) : !0)
        } : c.documentElement.compareDocumentPosition ? m.contains = function (a, b) {
            return !!(a.compareDocumentPosition(b) & 16)
        } : m.contains = function () {
            return !1
        }, m.isXML = function (a) {
            var b = (a ? a.ownerDocument || a : 0).documentElement;
            return b ? b.nodeName !== "HTML" : !1
        };
        var y = function (a, b, c) {
            var d, e = [],
                f = "",
                g = b.nodeType ? [b] : b;
            while (d = o.match.PSEUDO.exec(a)) f += d[0], a = a.replace(o.match.PSEUDO, "");
            a = o.relative[a] ? a + "*" : a;
            for (var h = 0, i = g.length; h < i; h++) m(a, g[h], e, c);
            return m.filter(f, e)
        };
        m.attr = f.attr, m.selectors.attrMap = {}, f.find = m, f.expr = m.selectors, f.expr[":"] = f.expr.filters, f.unique = m.uniqueSort, f.text = m.getText, f.isXMLDoc = m.isXML, f.contains = m.contains
    }();
    var L = /Until$/,
        M = /^(?:parents|prevUntil|prevAll)/,
        N = /,/,
        O = /^.[^:#\[\.,]*$/,
        P = Array.prototype.slice,
        Q = f.expr.match.globalPOS,
        R = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    f.fn.extend({
        find: function (a) {
            var b = this,
                c, d;
            if (typeof a != "string") return f(a).filter(function () {
                for (c = 0, d = b.length; c < d; c++)
                    if (f.contains(b[c], this)) return !0
            });
            var e = this.pushStack("", "find", a),
                g, h, i;
            for (c = 0, d = this.length; c < d; c++) {
                g = e.length, f.find(a, this[c], e);
                if (c > 0)
                    for (h = g; h < e.length; h++)
                        for (i = 0; i < g; i++)
                            if (e[i] === e[h]) {
                                e.splice(h--, 1);
                                break
                            }
            }
            return e
        },
        has: function (a) {
            var b = f(a);
            return this.filter(function () {
                for (var a = 0, c = b.length; a < c; a++)
                    if (f.contains(this, b[a])) return !0
            })
        },
        not: function (a) {
            return this.pushStack(T(this, a, !1), "not", a)
        },
        filter: function (a) {
            return this.pushStack(T(this, a, !0), "filter", a)
        },
        is: function (a) {
            return !!a && (typeof a == "string" ? Q.test(a) ? f(a, this.context).index(this[0]) >= 0 : f.filter(a, this).length > 0 : this.filter(a).length > 0)
        },
        closest: function (a, b) {
            var c = [],
                d, e, g = this[0];
            if (f.isArray(a)) {
                var h = 1;
                while (g && g.ownerDocument && g !== b) {
                    for (d = 0; d < a.length; d++) f(g).is(a[d]) && c.push({
                        selector: a[d],
                        elem: g,
                        level: h
                    });
                    g = g.parentNode, h++
                }
                return c
            }
            var i = Q.test(a) || typeof a != "string" ? f(a, b || this.context) : 0;
            for (d = 0, e = this.length; d < e; d++) {
                g = this[d];
                while (g) {
                    if (i ? i.index(g) > -1 : f.find.matchesSelector(g, a)) {
                        c.push(g);
                        break
                    }
                    g = g.parentNode;
                    if (!g || !g.ownerDocument || g === b || g.nodeType === 11) break
                }
            }
            c = c.length > 1 ? f.unique(c) : c;
            return this.pushStack(c, "closest", a)
        },
        index: function (a) {
            if (!a) return this[0] && this[0].parentNode ? this.prevAll().length : -1;
            if (typeof a == "string") return f.inArray(this[0], f(a));
            return f.inArray(a.jquery ? a[0] : a, this)
        },
        add: function (a, b) {
            var c = typeof a == "string" ? f(a, b) : f.makeArray(a && a.nodeType ? [a] : a),
                d = f.merge(this.get(), c);
            return this.pushStack(S(c[0]) || S(d[0]) ? d : f.unique(d))
        },
        andSelf: function () {
            return this.add(this.prevObject)
        }
    }), f.each({
        parent: function (a) {
            var b = a.parentNode;
            return b && b.nodeType !== 11 ? b : null
        },
        parents: function (a) {
            return f.dir(a, "parentNode")
        },
        parentsUntil: function (a, b, c) {
            return f.dir(a, "parentNode", c)
        },
        next: function (a) {
            return f.nth(a, 2, "nextSibling")
        },
        prev: function (a) {
            return f.nth(a, 2, "previousSibling")
        },
        nextAll: function (a) {
            return f.dir(a, "nextSibling")
        },
        prevAll: function (a) {
            return f.dir(a, "previousSibling")
        },
        nextUntil: function (a, b, c) {
            return f.dir(a, "nextSibling", c)
        },
        prevUntil: function (a, b, c) {
            return f.dir(a, "previousSibling", c)
        },
        siblings: function (a) {
            return f.sibling((a.parentNode || {}).firstChild, a)
        },
        children: function (a) {
            return f.sibling(a.firstChild)
        },
        contents: function (a) {
            return f.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : f.makeArray(a.childNodes)
        }
    }, function (a, b) {
        f.fn[a] = function (c, d) {
            var e = f.map(this, b, c);
            L.test(a) || (d = c), d && typeof d == "string" && (e = f.filter(d, e)), e = this.length > 1 && !R[a] ? f.unique(e) : e, (this.length > 1 || N.test(d)) && M.test(a) && (e = e.reverse());
            return this.pushStack(e, a, P.call(arguments).join(","))
        }
    }), f.extend({
        filter: function (a, b, c) {
            c && (a = ":not(" + a + ")");
            return b.length === 1 ? f.find.matchesSelector(b[0], a) ? [b[0]] : [] : f.find.matches(a, b)
        },
        dir: function (a, c, d) {
            var e = [],
                g = a[c];
            while (g && g.nodeType !== 9 && (d === b || g.nodeType !== 1 || !f(g).is(d))) g.nodeType === 1 && e.push(g), g = g[c];
            return e
        },
        nth: function (a, b, c, d) {
            b = b || 1;
            var e = 0;
            for (; a; a = a[c])
                if (a.nodeType === 1 && ++e === b) break;
            return a
        },
        sibling: function (a, b) {
            var c = [];
            for (; a; a = a.nextSibling) a.nodeType === 1 && a !== b && c.push(a);
            return c
        }
    });
    var V = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        W = / jQuery\d+="(?:\d+|null)"/g,
        X = /^\s+/,
        Y = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
        Z = /<([\w:]+)/,
        $ = /<tbody/i,
        _ = /<|&#?\w+;/,
        ba = /<(?:script|style)/i,
        bb = /<(?:script|object|embed|option|style)/i,
        bc = new RegExp("<(?:" + V + ")[\\s/>]", "i"),
        bd = /checked\s*(?:[^=]|=\s*.checked.)/i,
        be = /\/(java|ecma)script/i,
        bf = /^\s*<!(?:\[CDATA\[|\-\-)/,
        bg = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            area: [1, "<map>", "</map>"],
            _default: [0, "", ""]
        }, bh = U(c);
    bg.optgroup = bg.option, bg.tbody = bg.tfoot = bg.colgroup = bg.caption = bg.thead, bg.th = bg.td, f.support.htmlSerialize || (bg._default = [1, "div<div>", "</div>"]), f.fn.extend({
        text: function (a) {
            return f.access(this, function (a) {
                return a === b ? f.text(this) : this.empty().append((this[0] && this[0].ownerDocument || c).createTextNode(a))
            }, null, a, arguments.length)
        },
        wrapAll: function (a) {
            if (f.isFunction(a)) return this.each(function (b) {
                f(this).wrapAll(a.call(this, b))
            });
            if (this[0]) {
                var b = f(a, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && b.insertBefore(this[0]), b.map(function () {
                    var a = this;
                    while (a.firstChild && a.firstChild.nodeType === 1) a = a.firstChild;
                    return a
                }).append(this)
            }
            return this
        },
        wrapInner: function (a) {
            if (f.isFunction(a)) return this.each(function (b) {
                f(this).wrapInner(a.call(this, b))
            });
            return this.each(function () {
                var b = f(this),
                    c = b.contents();
                c.length ? c.wrapAll(a) : b.append(a)
            })
        },
        wrap: function (a) {
            var b = f.isFunction(a);
            return this.each(function (c) {
                f(this).wrapAll(b ? a.call(this, c) : a)
            })
        },
        unwrap: function () {
            return this.parent().each(function () {
                f.nodeName(this, "body") || f(this).replaceWith(this.childNodes)
            }).end()
        },
        append: function () {
            return this.domManip(arguments, !0, function (a) {
                this.nodeType === 1 && this.appendChild(a)
            })
        },
        prepend: function () {
            return this.domManip(arguments, !0, function (a) {
                this.nodeType === 1 && this.insertBefore(a, this.firstChild)
            })
        },
        before: function () {
            if (this[0] && this[0].parentNode) return this.domManip(arguments, !1, function (a) {
                this.parentNode.insertBefore(a, this)
            });
            if (arguments.length) {
                var a = f
                    .clean(arguments);
                a.push.apply(a, this.toArray());
                return this.pushStack(a, "before", arguments)
            }
        },
        after: function () {
            if (this[0] && this[0].parentNode) return this.domManip(arguments, !1, function (a) {
                this.parentNode.insertBefore(a, this.nextSibling)
            });
            if (arguments.length) {
                var a = this.pushStack(this, "after", arguments);
                a.push.apply(a, f.clean(arguments));
                return a
            }
        },
        remove: function (a, b) {
            for (var c = 0, d;
                (d = this[c]) != null; c++)
                if (!a || f.filter(a, [d]).length)!b && d.nodeType === 1 && (f.cleanData(d.getElementsByTagName("*")), f.cleanData([d])), d.parentNode && d.parentNode.removeChild(d);
            return this
        },
        empty: function () {
            for (var a = 0, b;
                (b = this[a]) != null; a++) {
                b.nodeType === 1 && f.cleanData(b.getElementsByTagName("*"));
                while (b.firstChild) b.removeChild(b.firstChild)
            }
            return this
        },
        clone: function (a, b) {
            a = a == null ? !1 : a, b = b == null ? a : b;
            return this.map(function () {
                return f.clone(this, a, b)
            })
        },
        html: function (a) {
            return f.access(this, function (a) {
                var c = this[0] || {}, d = 0,
                    e = this.length;
                if (a === b) return c.nodeType === 1 ? c.innerHTML.replace(W, "") : null;
                if (typeof a == "string" && !ba.test(a) && (f.support.leadingWhitespace || !X.test(a)) && !bg[(Z.exec(a) || ["", ""])[1].toLowerCase()]) {
                    a = a.replace(Y, "<$1></$2>");
                    try {
                        for (; d < e; d++) c = this[d] || {}, c.nodeType === 1 && (f.cleanData(c.getElementsByTagName("*")), c.innerHTML = a);
                        c = 0
                    } catch (g) {}
                }
                c && this.empty().append(a)
            }, null, a, arguments.length)
        },
        replaceWith: function (a) {
            if (this[0] && this[0].parentNode) {
                if (f.isFunction(a)) return this.each(function (b) {
                    var c = f(this),
                        d = c.html();
                    c.replaceWith(a.call(this, b, d))
                });
                typeof a != "string" && (a = f(a).detach());
                return this.each(function () {
                    var b = this.nextSibling,
                        c = this.parentNode;
                    f(this).remove(), b ? f(b).before(a) : f(c).append(a)
                })
            }
            return this.length ? this.pushStack(f(f.isFunction(a) ? a() : a), "replaceWith", a) : this
        },
        detach: function (a) {
            return this.remove(a, !0)
        },
        domManip: function (a, c, d) {
            var e, g, h, i, j = a[0],
                k = [];
            if (!f.support.checkClone && arguments.length === 3 && typeof j == "string" && bd.test(j)) return this.each(function () {
                f(this).domManip(a, c, d, !0)
            });
            if (f.isFunction(j)) return this.each(function (e) {
                var g = f(this);
                a[0] = j.call(this, e, c ? g.html() : b), g.domManip(a, c, d)
            });
            if (this[0]) {
                i = j && j.parentNode, f.support.parentNode && i && i.nodeType === 11 && i.childNodes.length === this.length ? e = {
                    fragment: i
                } : e = f.buildFragment(a, this, k), h = e.fragment, h.childNodes.length === 1 ? g = h = h.firstChild : g = h.firstChild;
                if (g) {
                    c = c && f.nodeName(g, "tr");
                    for (var l = 0, m = this.length, n = m - 1; l < m; l++) d.call(c ? bi(this[l], g) : this[l], e.cacheable || m > 1 && l < n ? f.clone(h, !0, !0) : h)
                }
                k.length && f.each(k, function (a, b) {
                    b.src ? f.ajax({
                        type: "GET",
                        global: !1,
                        url: b.src,
                        async: !1,
                        dataType: "script"
                    }) : f.globalEval((b.text || b.textContent || b.innerHTML || "").replace(bf, "/*$0*/")), b.parentNode && b.parentNode.removeChild(b)
                })
            }
            return this
        }
    }), f.buildFragment = function (a, b, d) {
        var e, g, h, i, j = a[0];
        b && b[0] && (i = b[0].ownerDocument || b[0]), i.createDocumentFragment || (i = c), a.length === 1 && typeof j == "string" && j.length < 512 && i === c && j.charAt(0) === "<" && !bb.test(j) && (f.support.checkClone || !bd.test(j)) && (f.support.html5Clone || !bc.test(j)) && (g = !0, h = f.fragments[j], h && h !== 1 && (e = h)), e || (e = i.createDocumentFragment(), f.clean(a, i, e, d)), g && (f.fragments[j] = h ? e : 1);
        return {
            fragment: e,
            cacheable: g
        }
    }, f.fragments = {}, f.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (a, b) {
        f.fn[a] = function (c) {
            var d = [],
                e = f(c),
                g = this.length === 1 && this[0].parentNode;
            if (g && g.nodeType === 11 && g.childNodes.length === 1 && e.length === 1) {
                e[b](this[0]);
                return this
            }
            for (var h = 0, i = e.length; h < i; h++) {
                var j = (h > 0 ? this.clone(!0) : this).get();
                f(e[h])[b](j), d = d.concat(j)
            }
            return this.pushStack(d, a, e.selector)
        }
    }), f.extend({
        clone: function (a, b, c) {
            var d, e, g, h = f.support.html5Clone || f.isXMLDoc(a) || !bc.test("<" + a.nodeName + ">") ? a.cloneNode(!0) : bo(a);
            if ((!f.support.noCloneEvent || !f.support.noCloneChecked) && (a.nodeType === 1 || a.nodeType === 11) && !f.isXMLDoc(a)) {
                bk(a, h), d = bl(a), e = bl(h);
                for (g = 0; d[g]; ++g) e[g] && bk(d[g], e[g])
            }
            if (b) {
                bj(a, h);
                if (c) {
                    d = bl(a), e = bl(h);
                    for (g = 0; d[g]; ++g) bj(d[g], e[g])
                }
            }
            d = e = null;
            return h
        },
        clean: function (a, b, d, e) {
            var g, h, i, j = [];
            b = b || c, typeof b.createElement == "undefined" && (b = b.ownerDocument || b[0] && b[0].ownerDocument || c);
            for (var k = 0, l;
                (l = a[k]) != null; k++) {
                typeof l == "number" && (l += "");
                if (!l) continue;
                if (typeof l == "string")
                    if (!_.test(l)) l = b.createTextNode(l);
                    else {
                        l = l.replace(Y, "<$1></$2>");
                        var m = (Z.exec(l) || ["", ""])[1].toLowerCase(),
                            n = bg[m] || bg._default,
                            o = n[0],
                            p = b.createElement("div"),
                            q = bh.childNodes,
                            r;
                        b === c ? bh.appendChild(p) : U(b).appendChild(p), p.innerHTML = n[1] + l + n[2];
                        while (o--) p = p.lastChild;
                        if (!f.support.tbody) {
                            var s = $.test(l),
                                t = m === "table" && !s ? p.firstChild && p.firstChild.childNodes : n[1] === "<table>" && !s ? p.childNodes : [];
                            for (i = t.length - 1; i >= 0; --i) f.nodeName(t[i], "tbody") && !t[i].childNodes.length && t[i].parentNode.removeChild(t[i])
                        }!f.support.leadingWhitespace && X.test(l) && p.insertBefore(b.createTextNode(X.exec(l)[0]), p.firstChild), l = p.childNodes, p && (p.parentNode.removeChild(p), q.length > 0 && (r = q[q.length - 1], r && r.parentNode && r.parentNode.removeChild(r)))
                    }
                var u;
                if (!f.support.appendChecked)
                    if (l[0] && typeof (u = l.length) == "number")
                        for (i = 0; i < u; i++) bn(l[i]);
                    else bn(l);
                l.nodeType ? j.push(l) : j = f.merge(j, l)
            }
            if (d) {
                g = function (a) {
                    return !a.type || be.test(a.type)
                };
                for (k = 0; j[k]; k++) {
                    h = j[k];
                    if (e && f.nodeName(h, "script") && (!h.type || be.test(h.type))) e.push(h.parentNode ? h.parentNode.removeChild(h) : h);
                    else {
                        if (h.nodeType === 1) {
                            var v = f.grep(h.getElementsByTagName("script"), g);
                            j.splice.apply(j, [k + 1, 0].concat(v))
                        }
                        d.appendChild(h)
                    }
                }
            }
            return j
        },
        cleanData: function (a) {
            var b, c, d = f.cache,
                e = f.event.special,
                g = f.support.deleteExpando;
            for (var h = 0, i;
                (i = a[h]) != null; h++) {
                if (i.nodeName && f.noData[i.nodeName.toLowerCase()]) continue;
                c = i[f.expando];
                if (c) {
                    b = d[c];
                    if (b && b.events) {
                        for (var j in b.events) e[j] ? f.event.remove(i, j) : f.removeEvent(i, j, b.handle);
                        b.handle && (b.handle.elem = null)
                    }
                    g ? delete i[f.expando] : i.removeAttribute && i.removeAttribute(f.expando), delete d[c]
                }
            }
        }
    });
    var bp = /alpha\([^)]*\)/i,
        bq = /opacity=([^)]*)/,
        br = /([A-Z]|^ms)/g,
        bs = /^[\-+]?(?:\d*\.)?\d+$/i,
        bt = /^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i,
        bu = /^([\-+])=([\-+.\de]+)/,
        bv = /^margin/,
        bw = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        }, bx = ["Top", "Right", "Bottom", "Left"],
        by, bz, bA;
    f.fn.css = function (a, c) {
        return f.access(this, function (a, c, d) {
            return d !== b ? f.style(a, c, d) : f.css(a, c)
        }, a, c, arguments.length > 1)
    }, f.extend({
        cssHooks: {
            opacity: {
                get: function (a, b) {
                    if (b) {
                        var c = by(a, "opacity");
                        return c === "" ? "1" : c
                    }
                    return a.style.opacity
                }
            }
        },
        cssNumber: {
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": f.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function (a, c, d, e) {
            if ( !! a && a.nodeType !== 3 && a.nodeType !== 8 && !! a.style) {
                var g, h, i = f.camelCase(c),
                    j = a.style,
                    k = f.cssHooks[i];
                c = f.cssProps[i] || i;
                if (d === b) {
                    if (k && "get" in k && (g = k.get(a, !1, e)) !== b) return g;
                    return j[c]
                }
                h = typeof d, h === "string" && (g = bu.exec(d)) && (d = +(g[1] + 1) * +g[2] + parseFloat(f.css(a, c)), h = "number");
                if (d == null || h === "number" && isNaN(d)) return;
                h === "number" && !f.cssNumber[i] && (d += "px");
                if (!k || !("set" in k) || (d = k.set(a, d)) !== b) try {
                    j[c] = d
                } catch (l) {}
            }
        },
        css: function (a, c, d) {
            var e, g;
            c = f.camelCase(c), g = f.cssHooks[c], c = f.cssProps[c] || c, c === "cssFloat" && (c = "float");
            if (g && "get" in g && (e = g.get(a, !0, d)) !== b) return e;
            if (by) return by(a, c)
        },
        swap: function (a, b, c) {
            var d = {}, e, f;
            for (f in b) d[f] = a.style[f], a.style[f] = b[f];
            e = c.call(a);
            for (f in b) a.style[f] = d[f];
            return e
        }
    }), f.curCSS = f.css, c.defaultView && c.defaultView.getComputedStyle && (bz = function (a, b) {
        var c, d, e, g, h = a.style;
        b = b.replace(br, "-$1").toLowerCase(), (d = a.ownerDocument.defaultView) && (e = d.getComputedStyle(a, null)) && (c = e.getPropertyValue(b), c === "" && !f.contains(a.ownerDocument.documentElement, a) && (c = f.style(a, b))), !f.support.pixelMargin && e && bv.test(b) && bt.test(c) && (g = h.width, h.width = c, c = e.width, h.width = g);
        return c
    }), c.documentElement.currentStyle && (bA = function (a, b) {
        var c, d, e, f = a.currentStyle && a.currentStyle[b],
            g = a.style;
        f == null && g && (e = g[b]) && (f = e), bt.test(f) && (c = g.left, d = a.runtimeStyle && a.runtimeStyle.left, d && (a.runtimeStyle.left = a.currentStyle.left), g.left = b === "fontSize" ? "1em" : f, f = g.pixelLeft + "px", g.left = c, d && (a.runtimeStyle.left = d));
        return f === "" ? "auto" : f
    }), by = bz || bA, f.each(["height", "width"], function (a, b) {
        f.cssHooks[b] = {
            get: function (a, c, d) {
                if (c) return a.offsetWidth !== 0 ? bB(a, b, d) : f.swap(a, bw, function () {
                    return bB(a, b, d)
                })
            },
            set: function (a, b) {
                return bs.test(b) ? b + "px" : b
            }
        }
    }), f.support.opacity || (f.cssHooks.opacity = {
        get: function (a, b) {
            return bq.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 + "" : b ? "1" : ""
        },
        set: function (a, b) {
            var c = a.style,
                d = a.currentStyle,
                e = f.isNumeric(b) ? "alpha(opacity=" + b * 100 + ")" : "",
                g = d && d.filter || c.filter || "";
            c.zoom = 1;
            if (b >= 1 && f.trim(g.replace(bp, "")) === "") {
                c.removeAttribute("filter");
                if (d && !d.filter) return
            }
            c.filter = bp.test(g) ? g.replace(bp, e) : g + " " + e
        }
    }), f(function () {
        f.support.reliableMarginRight || (f.cssHooks.marginRight = {
            get: function (a, b) {
                return f.swap(a, {
                    display: "inline-block"
                }, function () {
                    return b ? by(a, "margin-right") : a.style.marginRight
                })
            }
        })
    }), f.expr && f.expr.filters && (f.expr.filters.hidden = function (a) {
        var b = a.offsetWidth,
            c = a.offsetHeight;
        return b === 0 && c === 0 || !f.support.reliableHiddenOffsets && (a.style && a.style.display || f.css(a, "display")) === "none"
    }, f.expr.filters.visible = function (a) {
        return !f.expr.filters.hidden(a)
    }), f.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function (a, b) {
        f.cssHooks[a + b] = {
            expand: function (c) {
                var d, e = typeof c == "string" ? c.split(" ") : [c],
                    f = {};
                for (d = 0; d < 4; d++) f[a + bx[d] + b] = e[d] || e[d - 2] || e[0];
                return f
            }
        }
    });
    var bC = /%20/g,
        bD = /\[\]$/,
        bE = /\r?\n/g,
        bF = /#.*$/,
        bG = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
        bH = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
        bI = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
        bJ = /^(?:GET|HEAD)$/,
        bK = /^\/\//,
        bL = /\?/,
        bM = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        bN = /^(?:select|textarea)/i,
        bO = /\s+/,
        bP = /([?&])_=[^&]*/,
        bQ = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,
        bR = f.fn.load,
        bS = {}, bT = {}, bU, bV, bW = ["*/"] + ["*"];
    try {
        bU = e.href
    } catch (bX) {
        bU = c.createElement("a"), bU.href = "", bU = bU.href
    }
    bV = bQ.exec(bU.toLowerCase()) || [], f.fn.extend({
        load: function (a, c, d) {
            if (typeof a != "string" && bR) return bR.apply(this, arguments);
            if (!this.length) return this;
            var e = a.indexOf(" ");
            if (e >= 0) {
                var g = a.slice(e, a.length);
                a = a.slice(0, e)
            }
            var h = "GET";
            c && (f.isFunction(c) ? (d = c, c = b) : typeof c == "object" && (c = f.param(c, f.ajaxSettings.traditional), h = "POST"));
            var i = this;
            f.ajax({
                url: a,
                type: h,
                dataType: "html",
                data: c,
                complete: function (a, b, c) {
                    c = a.responseText, a.isResolved() && (a.done(function (a) {
                        c = a
                    }), i.html(g ? f("<div>").append(c.replace(bM, "")).find(g) : c)), d && i.each(d, [c, b, a])
                }
            });
            return this
        },
        serialize: function () {
            return f.param(this.serializeArray())
        },
        serializeArray: function () {
            return this.map(function () {
                return this.elements ? f.makeArray(this.elements) : this
            }).filter(function () {
                return this.name && !this.disabled && (this.checked || bN.test(this.nodeName) || bH.test(this.type))
            }).map(function (a, b) {
                var c = f(this).val();
                return c == null ? null : f.isArray(c) ? f.map(c, function (a, c) {
                    return {
                        name: b.name,
                        value: a.replace(bE, "\r\n")
                    }
                }) : {
                    name: b.name,
                    value: c.replace(bE, "\r\n")
                }
            }).get()
        }
    }), f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function (a, b) {
        f.fn[b] = function (a) {
            return this.on(b, a)
        }
    }), f.each(["get", "post"], function (a, c) {
        f[c] = function (a, d, e, g) {
            f.isFunction(d) && (g = g || e, e = d, d = b);
            return f.ajax({
                type: c,
                url: a,
                data: d,
                success: e,
                dataType: g
            })
        }
    }), f.extend({
        getScript: function (a, c) {
            return f.get(a, b, c, "script")
        },
        getJSON: function (a, b, c) {
            return f.get(a, b, c, "json")
        },
        ajaxSetup: function (a, b) {
            b ? b$(a, f.ajaxSettings) : (b = a, a = f.ajaxSettings), b$(a, b);
            return a
        },
        ajaxSettings: {
            url: bU,
            isLocal: bI.test(bV[1]),
            global: !0,
            type: "GET",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            processData: !0,
            async: !0,
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                text: "text/plain",
                json: "application/json, text/javascript",
                "*": bW
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText"
            },
            converters: {
                "* text": a.String,
                "text html": !0,
                "text json": f.parseJSON,
                "text xml": f.parseXML
            },
            flatOptions: {
                context: !0,
                url: !0
            }
        },
        ajaxPrefilter: bY(bS),
        ajaxTransport: bY(bT),
        ajax: function (a, c) {
            function w(a, c, l, m) {
                if (s !== 2) {
                    s = 2, q && clearTimeout(q), p = b, n = m || "", v.readyState = a > 0 ? 4 : 0;
                    var o, r, u, w = c,
                        x = l ? ca(d, v, l) : b,
                        y, z;
                    if (a >= 200 && a < 300 || a === 304) {
                        if (d.ifModified) {
                            if (y = v.getResponseHeader("Last-Modified")) f.lastModified[k] = y;
                            if (z = v.getResponseHeader("Etag")) f.etag[k] = z
                        }
                        if (a === 304) w = "notmodified", o = !0;
                        else try {
                            r = cb(d, x), w = "success", o = !0
                        } catch (A) {
                            w = "parsererror", u = A
                        }
                    } else {
                        u = w;
                        if (!w || a) w = "error", a < 0 && (a = 0)
                    }
                    v.status = a, v.statusText = "" + (c || w), o ? h.resolveWith(e, [r, w, v]) : h.rejectWith(e, [v, w, u]), v.statusCode(j), j = b, t && g.trigger("ajax" + (o ? "Success" : "Error"), [v, d, o ? r : u]), i.fireWith(e, [v, w]), t && (g.trigger("ajaxComplete", [v, d]), --f.active || f.event.trigger("ajaxStop"))
                }
            }
            typeof a == "object" && (c = a, a = b), c = c || {};
            var d = f.ajaxSetup({}, c),
                e = d.context || d,
                g = e !== d && (e.nodeType || e instanceof f) ? f(e) : f.event,
                h = f.Deferred(),
                i = f.Callbacks("once memory"),
                j = d.statusCode || {}, k, l = {}, m = {}, n, o, p, q, r, s = 0,
                t, u, v = {
                    readyState: 0,
                    setRequestHeader: function (a, b) {
                        if (!s) {
                            var c = a.toLowerCase();
                            a = m[c] = m[c] || a, l[a] = b
                        }
                        return this
                    },
                    getAllResponseHeaders: function () {
                        return s === 2 ? n : null
                    },
                    getResponseHeader: function (a) {
                        var c;
                        if (s === 2) {
                            if (!o) {
                                o = {};
                                while (c = bG.exec(n)) o[c[1].toLowerCase()] = c[2]
                            }
                            c = o[a.toLowerCase()]
                        }
                        return c === b ? null : c
                    },
                    overrideMimeType: function (a) {
                        s || (d.mimeType = a);
                        return this
                    },
                    abort: function (a) {
                        a = a || "abort", p && p.abort(a), w(0, a);
                        return this
                    }
                };
            h.promise(v), v.success = v.done, v.error = v.fail, v.complete = i.add, v.statusCode = function (a) {
                if (a) {
                    var b;
                    if (s < 2)
                        for (b in a) j[b] = [j[b], a[b]];
                    else b = a[v.status], v.then(b, b)
                }
                return this
            }, d.url = ((a || d.url) + "").replace(bF, "").replace(bK, bV[1] + "//"), d.dataTypes = f.trim(d.dataType || "*").toLowerCase().split(bO), d.crossDomain == null && (r = bQ.exec(d.url.toLowerCase()), d.crossDomain = !(!r || r[1] == bV[1] && r[2] == bV[2] && (r[3] || (r[1] === "http:" ? 80 : 443)) == (bV[3] || (bV[1] === "http:" ? 80 : 443)))), d.data && d.processData && typeof d.data != "string" && (d.data = f.param(d.data, d.traditional)), bZ(bS, d, c, v);
            if (s === 2) return !1;
            t = d.global, d.type = d.type.toUpperCase(), d.hasContent = !bJ.test(d.type), t && f.active++ === 0 && f.event.trigger("ajaxStart");
            if (!d.hasContent) {
                d.data && (d.url += (bL.test(d.url) ? "&" : "?") + d.data, delete d.data), k = d.url;
                if (d.cache === !1) {
                    var x = f.now(),
                        y = d.url.replace(bP, "$1_=" + x);
                    d.url = y + (y === d.url ? (bL.test(d.url) ? "&" : "?") + "_=" + x : "")
                }
            }(d.data && d.hasContent && d.contentType !== !1 || c.contentType) && v.setRequestHeader("Content-Type", d.contentType), d.ifModified && (k = k || d.url, f.lastModified[k] && v.setRequestHeader("If-Modified-Since", f.lastModified[k]), f.etag[k] && v.setRequestHeader("If-None-Match", f.etag[k])), v.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + (d.dataTypes[0] !== "*" ? ", " + bW + "; q=0.01" : "") : d.accepts["*"]);
            for (u in d.headers) v.setRequestHeader(u, d.headers[u]);
            if (d.beforeSend && (d.beforeSend.call(e, v, d) === !1 || s === 2)) {
                v.abort();
                return !1
            }
            for (u in {
                success: 1,
                error: 1,
                complete: 1
            }) v[u](d[u]);
            p = bZ(bT, d, c, v);
            if (!p) w(-1, "No Transport");
            else {
                v.readyState = 1, t && g.trigger("ajaxSend", [v, d]), d.async && d.timeout > 0 && (q = setTimeout(function () {
                    v.abort("timeout")
                }, d.timeout));
                try {
                    s = 1, p.send(l, w)
                } catch (z) {
                    if (s < 2) w(-1, z);
                    else throw z
                }
            }
            return v
        },
        param: function (a, c) {
            var d = [],
                e = function (a, b) {
                    b = f.isFunction(b) ? b() : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
                };
            c === b && (c = f.ajaxSettings.traditional);
            if (f.isArray(a) || a.jquery && !f.isPlainObject(a)) f.each(a, function () {
                e(this.name, this.value)
            });
            else
                for (var g in a) b_(g, a[g], c, e);
            return d.join("&").replace(bC, "+")
        }
    }), f.extend({
        active: 0,
        lastModified: {},
        etag: {}
    });
    var cc = f.now(),
        cd = /(\=)\?(&|$)|\?\?/i;
    f.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function () {
            return f.expando + "_" + cc++
        }
    }), f.ajaxPrefilter("json jsonp", function (b, c, d) {
        var e = typeof b.data == "string" && /^application\/x\-www\-form\-urlencoded/.test(b.contentType);
        if (b.dataTypes[0] === "jsonp" || b.jsonp !== !1 && (cd.test(b.url) || e && cd.test(b.data))) {
            var g, h = b.jsonpCallback = f.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback,
                i = a[h],
                j = b.url,
                k = b.data,
                l = "$1" + h + "$2";
            b.jsonp !== !1 && (j = j.replace(cd, l), b.url === j && (e && (k = k.replace(cd, l)), b.data === k && (j += (/\?/.test(j) ? "&" : "?") + b.jsonp + "=" + h))), b.url = j, b.data = k, a[h] = function (a) {
                g = [a]
            }, d.always(function () {
                a[h] = i, g && f.isFunction(i) && a[h](g[0])
            }), b.converters["script json"] = function () {
                g || f.error(h + " was not called");
                return g[0]
            }, b.dataTypes[0] = "json";
            return "script"
        }
    }), f.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /javascript|ecmascript/
        },
        converters: {
            "text script": function (a) {
                f.globalEval(a);
                return a
            }
        }
    }), f.ajaxPrefilter("script", function (a) {
        a.cache === b && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1)
    }), f.ajaxTransport("script", function (a) {
        if (a.crossDomain) {
            var d, e = c.head || c.getElementsByTagName("head")[0] || c.documentElement;
            return {
                send: function (f, g) {
                    d = c.createElement("script"), d.async = "async", a.scriptCharset && (d.charset = a.scriptCharset), d.src = a.url, d.onload = d.onreadystatechange = function (a, c) {
                        if (c || !d.readyState || /loaded|complete/.test(d.readyState)) d.onload = d.onreadystatechange = null, e && d.parentNode && e.removeChild(d), d = b, c || g(200, "success")
                    }, e.insertBefore(d, e.firstChild)
                },
                abort: function () {
                    d && d.onload(0, 1)
                }
            }
        }
    });
    var ce = a.ActiveXObject ? function () {
            for (var a in cg) cg[a](0, 1)
        } : !1,
        cf = 0,
        cg;
    f.ajaxSettings.xhr = a.ActiveXObject ? function () {
        return !this.isLocal && ch() || ci()
    } : ch,
    function (a) {
        f.extend(f.support, {
            ajax: !! a,
            cors: !! a && "withCredentials" in a
        })
    }(f.ajaxSettings.xhr()), f.support.ajax && f.ajaxTransport(function (c) {
        if (!c.crossDomain || f.support.cors) {
            var d;
            return {
                send: function (e, g) {
                    var h = c.xhr(),
                        i, j;
                    c.username ? h.open(c.type, c.url, c.async, c.username, c.password) : h.open(c.type, c.url, c.async);
                    if (c.xhrFields)
                        for (j in c.xhrFields) h[j] = c.xhrFields[j];
                    c.mimeType && h.overrideMimeType && h.overrideMimeType(c.mimeType), !c.crossDomain && !e["X-Requested-With"] && (e["X-Requested-With"] = "XMLHttpRequest");
                    try {
                        for (j in e) h.setRequestHeader(j, e[j])
                    } catch (k) {}
                    h.send(c.hasContent && c.data || null), d = function (a, e) {
                        var j, k, l, m, n;
                        try {
                            if (d && (e || h.readyState === 4)) {
                                d = b, i && (h.onreadystatechange = f.noop, ce && delete cg[i]);
                                if (e) h.readyState !== 4 && h.abort();
                                else {
                                    j = h.status, l = h.getAllResponseHeaders(), m = {}, n = h.responseXML, n && n.documentElement && (m.xml = n);
                                    try {
                                        m.text = h.responseText
                                    } catch (a) {}
                                    try {
                                        k = h.statusText
                                    } catch (o) {
                                        k = ""
                                    }!j && c.isLocal && !c.crossDomain ? j = m.text ? 200 : 404 : j === 1223 && (j = 204)
                                }
                            }
                        } catch (p) {
                            e || g(-1, p)
                        }
                        m && g(j, k, m, l)
                    }, !c.async || h.readyState === 4 ? d() : (i = ++cf, ce && (cg || (cg = {}, f(a).unload(ce)), cg[i] = d), h.onreadystatechange = d)
                },
                abort: function () {
                    d && d(0, 1)
                }
            }
        }
    });
    var cj = {}, ck, cl, cm = /^(?:toggle|show|hide)$/,
        cn = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,
        co, cp = [
            ["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"],
            ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"],
            ["opacity"]
        ],
        cq;
    f.fn.extend({
        show: function (a, b, c) {
            var d, e;
            if (a || a === 0) return this.animate(ct("show", 3), a, b, c);
            for (var g = 0, h = this.length; g < h; g++) d = this[g], d.style && (e = d.style.display, !f._data(d, "olddisplay") && e === "none" && (e = d.style.display = ""), (e === "" && f.css(d, "display") === "none" || !f.contains(d.ownerDocument.documentElement, d)) && f._data(d, "olddisplay", cu(d.nodeName)));
            for (g = 0; g < h; g++) {
                d = this[g];
                if (d.style) {
                    e = d.style.display;
                    if (e === "" || e === "none") d.style.display = f._data(d, "olddisplay") || ""
                }
            }
            return this
        },
        hide: function (a, b, c) {
            if (a || a === 0) return this.animate(ct("hide", 3), a, b, c);
            var d, e, g = 0,
                h = this.length;
            for (; g < h; g++) d = this[g], d.style && (e = f.css(d, "display"), e !== "none" && !f._data(d, "olddisplay") && f._data(d, "olddisplay", e));
            for (g = 0; g < h; g++) this[g].style && (this[g].style.display = "none");
            return this
        },
        _toggle: f.fn.toggle,
        toggle: function (a, b, c) {
            var d = typeof a == "boolean";
            f.isFunction(a) && f.isFunction(b) ? this._toggle.apply(this, arguments) : a == null || d ? this.each(function () {
                var b = d ? a : f(this).is(":hidden");
                f(this)[b ? "show" : "hide"]()
            }) : this.animate(ct("toggle", 3), a, b, c);
            return this
        },
        fadeTo: function (a, b, c, d) {
            return this.filter(":hidden").css("opacity", 0).show().end().animate({
                opacity: b
            }, a, c, d)
        },
        animate: function (a, b, c, d) {
            function g() {
                e.queue === !1 && f._mark(this);
                var b = f.extend({}, e),
                    c = this.nodeType === 1,
                    d = c && f(this).is(":hidden"),
                    g, h, i, j, k, l, m, n, o, p, q;
                b.animatedProperties = {};
                for (i in a) {
                    g = f.camelCase(i), i !== g && (a[g] = a[i], delete a[i]);
                    if ((k = f.cssHooks[g]) && "expand" in k) {
                        l = k.expand(a[g]), delete a[g];
                        for (i in l) i in a || (a[i] = l[i])
                    }
                }
                for (g in a) {
                    h = a[g], f.isArray(h) ? (b.animatedProperties[g] = h[1], h = a[g] = h[0]) : b.animatedProperties[g] = b.specialEasing && b.specialEasing[g] || b.easing || "swing";
                    if (h === "hide" && d || h === "show" && !d) return b.complete.call(this);
                    c && (g === "height" || g === "width") && (b.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY], f.css(this, "display") === "inline" && f.css(this, "float") === "none" && (!f.support.inlineBlockNeedsLayout || cu(this.nodeName) === "inline" ? this.style.display = "inline-block" : this.style.zoom = 1))
                }
                b.overflow != null && (this.style.overflow = "hidden");
                for (i in a) j = new f.fx(this, b, i), h = a[i], cm.test(h) ? (q = f._data(this, "toggle" + i) || (h === "toggle" ? d ? "show" : "hide" : 0), q ? (f._data(this, "toggle" + i, q === "show" ? "hide" : "show"), j[q]()) : j[h]()) : (m = cn.exec(h), n = j.cur(), m ? (o = parseFloat(m[2]), p = m[3] || (f.cssNumber[i] ? "" : "px"), p !== "px" && (f.style(this, i, (o || 1) + p), n = (o || 1) / j.cur() * n, f.style(this, i, n + p)), m[1] && (o = (m[1] === "-=" ? -1 : 1) * o + n), j.custom(n, o, p)) : j.custom(n, h, ""));
                return !0
            }
            var e = f.speed(b, c, d);
            if (f.isEmptyObject(a)) return this.each(e.complete, [!1]);
            a = f.extend({}, a);
            return e.queue === !1 ? this.each(g) : this.queue(e.queue, g)
        },
        stop: function (a, c, d) {
            typeof a != "string" && (d = c, c = a, a = b), c && a !== !1 && this.queue(a || "fx", []);
            return this.each(function () {
                function h(a, b, c) {
                    var e = b[c];
                    f.removeData(a, c, !0), e.stop(d)
                }
                var b, c = !1,
                    e = f.timers,
                    g = f._data(this);
                d || f._unmark(!0, this);
                if (a == null)
                    for (b in g) g[b] && g[b].stop && b.indexOf(".run") === b.length - 4 && h(this, g, b);
                else g[b = a + ".run"] && g[b].stop && h(this, g, b);
                for (b = e.length; b--;) e[b].elem === this && (a == null || e[b].queue === a) && (d ? e[b](!0) : e[b].saveState(), c = !0, e.splice(b, 1));
                (!d || !c) && f.dequeue(this, a)
            })
        }
    }), f.each({
        slideDown: ct("show", 1),
        slideUp: ct("hide", 1),
        slideToggle: ct("toggle", 1),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function (a, b) {
        f.fn[a] = function (a, c, d) {
            return this.animate(b, a, c, d)
        }
    }), f.extend({
        speed: function (a, b, c) {
            var d = a && typeof a == "object" ? f.extend({}, a) : {
                complete: c || !c && b || f.isFunction(a) && a,
                duration: a,
                easing: c && b || b && !f.isFunction(b) && b
            };
            d.duration = f.fx.off ? 0 : typeof d.duration == "number" ? d.duration : d.duration in f.fx.speeds ? f.fx.speeds[d.duration] : f.fx.speeds._default;
            if (d.queue == null || d.queue === !0) d.queue = "fx";
            d.old = d.complete, d.complete = function (a) {
                f.isFunction(d.old) && d.old.call(this), d.queue ? f.dequeue(this, d.queue) : a !== !1 && f._unmark(this)
            };
            return d
        },
        easing: {
            linear: function (a) {
                return a
            },
            swing: function (a) {
                return -Math.cos(a * Math.PI) / 2 + .5
            }
        },
        timers: [],
        fx: function (a, b, c) {
            this.options = b, this.elem = a, this.prop = c, b.orig = b.orig || {}
        }
    }), f.fx.prototype = {
        update: function () {
            this.options.step && this.options.step.call(this.elem, this.now, this), (f.fx.step[this.prop] || f.fx.step._default)(this)
        },
        cur: function () {
            if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null)) return this.elem[this.prop];
            var a, b = f.css(this.elem, this.prop);
            return isNaN(a = parseFloat(b)) ? !b || b === "auto" ? 0 : b : a
        },
        custom: function (a, c, d) {
            function h(a) {
                return e.step(a)
            }
            var e = this,
                g = f.fx;
            this.startTime = cq || cr(), this.end = c, this.now = this.start = a, this.pos = this.state = 0, this.unit = d || this.unit || (f.cssNumber[this.prop] ? "" : "px"), h.queue = this.options.queue, h.elem = this.elem, h.saveState = function () {
                f._data(e.elem, "fxshow" + e.prop) === b && (e.options.hide ? f._data(e.elem, "fxshow" + e.prop, e.start) : e.options.show && f._data(e.elem, "fxshow" + e.prop, e.end))
            }, h() && f.timers.push(h) && !co && (co = setInterval(g.tick, g.interval))
        },
        show: function () {
            var a = f._data(this.elem, "fxshow" + this.prop);
            this.options.orig[this.prop] = a || f.style(this.elem, this.prop), this.options.show = !0, a !== b ? this.custom(this.cur(), a) : this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur()), f(this.elem).show()
        },
        hide: function () {
            this.options.orig[this.prop] = f._data(this.elem, "fxshow" + this.prop) || f.style(this.elem, this.prop), this.options.hide = !0, this.custom(this.cur(), 0)
        },
        step: function (a) {
            var b, c, d, e = cq || cr(),
                g = !0,
                h = this.elem,
                i = this.options;
            if (a || e >= i.duration + this.startTime) {
                this.now = this.end, this.pos = this.state = 1, this.update(), i.animatedProperties[this.prop] = !0;
                for (b in i.animatedProperties) i.animatedProperties[b] !== !0 && (g = !1);
                if (g) {
                    i.overflow != null && !f.support.shrinkWrapBlocks && f.each(["", "X", "Y"], function (a, b) {
                        h.style["overflow" + b] = i.overflow[a]
                    }), i.hide && f(h).hide();
                    if (i.hide || i.show)
                        for (b in i.animatedProperties) f.style(h, b, i.orig[b]), f.removeData(h, "fxshow" + b, !0), f.removeData(h, "toggle" + b, !0);
                    d = i.complete, d && (i.complete = !1, d.call(h))
                }
                return !1
            }
            i.duration == Infinity ? this.now = e : (c = e - this.startTime, this.state = c / i.duration, this.pos = f.easing[i.animatedProperties[this.prop]](this.state, c, 0, 1, i.duration), this.now = this.start + (this.end - this.start) * this.pos), this.update();
            return !0
        }
    }, f.extend(f.fx, {
        tick: function () {
            var a, b = f.timers,
                c = 0;
            for (; c < b.length; c++) a = b[c], !a() && b[c] === a && b.splice(c--, 1);
            b.length || f.fx.stop()
        },
        interval: 13,
        stop: function () {
            clearInterval(co), co = null
        },
        speeds: {
            slow: 600,
            fast: 200,
            _default: 400
        },
        step: {
            opacity: function (a) {
                f.style(a.elem, "opacity", a.now)
            },
            _default: function (a) {
                a.elem.style && a.elem.style[a.prop] != null ? a.elem.style[a.prop] = a.now + a.unit : a.elem[a.prop] = a.now
            }
        }
    }), f.each(cp.concat.apply([], cp), function (a, b) {
        b.indexOf("margin") && (f.fx.step[b] = function (a) {
            f.style(a.elem, b, Math.max(0, a.now) + a.unit)
        })
    }), f.expr && f.expr.filters && (f.expr.filters.animated = function (a) {
        return f.grep(f.timers, function (b) {
            return a === b.elem
        }).length
    });
    var cv, cw = /^t(?:able|d|h)$/i,
        cx = /^(?:body|html)$/i;
    "getBoundingClientRect" in c.documentElement ? cv = function (a, b, c, d) {
        try {
            d = a.getBoundingClientRect()
        } catch (e) {}
        if (!d || !f.contains(c, a)) return d ? {
            top: d.top,
            left: d.left
        } : {
            top: 0,
            left: 0
        };
        var g = b.body,
            h = cy(b),
            i = c.clientTop || g.clientTop || 0,
            j = c.clientLeft || g.clientLeft || 0,
            k = h.pageYOffset || f.support.boxModel && c.scrollTop || g.scrollTop,
            l = h.pageXOffset || f.support.boxModel && c.scrollLeft || g.scrollLeft,
            m = d.top + k - i,
            n = d.left + l - j;
        return {
            top: m,
            left: n
        }
    } : cv = function (a, b, c) {
        var d, e = a.offsetParent,
            g = a,
            h = b.body,
            i = b.defaultView,
            j = i ? i.getComputedStyle(a, null) : a.currentStyle,
            k = a.offsetTop,
            l = a.offsetLeft;
        while ((a = a.parentNode) && a !== h && a !== c) {
            if (f.support.fixedPosition && j.position === "fixed") break;
            d = i ? i.getComputedStyle(a, null) : a.currentStyle, k -= a.scrollTop, l -= a.scrollLeft, a === e && (k += a.offsetTop, l += a.offsetLeft, f.support.doesNotAddBorder && (!f.support.doesAddBorderForTableAndCells || !cw.test(a.nodeName)) && (k += parseFloat(d.borderTopWidth) || 0, l += parseFloat(d.borderLeftWidth) || 0), g = e, e = a.offsetParent), f.support.subtractsBorderForOverflowNotVisible && d.overflow !== "visible" && (k += parseFloat(d.borderTopWidth) || 0, l += parseFloat(d.borderLeftWidth) || 0), j = d
        }
        if (j.position === "relative" || j.position === "static") k += h.offsetTop, l += h.offsetLeft;
        f.support.fixedPosition && j.position === "fixed" && (k += Math.max(c.scrollTop, h.scrollTop), l += Math.max(c.scrollLeft, h.scrollLeft));
        return {
            top: k,
            left: l
        }
    }, f.fn.offset = function (a) {
        if (arguments.length) return a === b ? this : this.each(function (b) {
            f.offset.setOffset(this, a, b)
        });
        var c = this[0],
            d = c && c.ownerDocument;
        if (!d) return null;
        if (c === d.body) return f.offset.bodyOffset(c);
        return cv(c, d, d.documentElement)
    }, f.offset = {
        bodyOffset: function (a) {
            var b = a.offsetTop,
                c = a.offsetLeft;
            f.support.doesNotIncludeMarginInBodyOffset && (b += parseFloat(f.css(a, "marginTop")) || 0, c += parseFloat(f.css(a, "marginLeft")) || 0);
            return {
                top: b,
                left: c
            }
        },
        setOffset: function (a, b, c) {
            var d = f.css(a, "position");
            d === "static" && (a.style.position = "relative");
            var e = f(a),
                g = e.offset(),
                h = f.css(a, "top"),
                i = f.css(a, "left"),
                j = (d === "absolute" || d === "fixed") && f.inArray("auto", [h, i]) > -1,
                k = {}, l = {}, m, n;
            j ? (l = e.position(), m = l.top, n = l.left) : (m = parseFloat(h) || 0, n = parseFloat(i) || 0), f.isFunction(b) && (b = b.call(a, c, g)), b.top != null && (k.top = b.top - g.top + m), b.left != null && (k.left = b.left - g.left + n), "using" in b ? b.using.call(a, k) : e.css(k)
        }
    }, f.fn.extend({
        position: function () {
            if (!this[0]) return null;
            var a = this[0],
                b = this.offsetParent(),
                c = this.offset(),
                d = cx.test(b[0].nodeName) ? {
                    top: 0,
                    left: 0
                } : b.offset();
            c.top -= parseFloat(f.css(a, "marginTop")) || 0, c.left -= parseFloat(f.css(a, "marginLeft")) || 0, d.top += parseFloat(f.css(b[0], "borderTopWidth")) || 0, d.left += parseFloat(f.css(b[0], "borderLeftWidth")) || 0;
            return {
                top: c.top - d.top,
                left: c.left - d.left
            }
        },
        offsetParent: function () {
            return this.map(function () {
                var a = this.offsetParent || c.body;
                while (a && !cx.test(a.nodeName) && f.css(a, "position") === "static") a = a.offsetParent;
                return a
            })
        }
    }), f.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function (a, c) {
        var d = /Y/.test(c);
        f.fn[a] = function (e) {
            return f.access(this, function (a, e, g) {
                var h = cy(a);
                if (g === b) return h ? c in h ? h[c] : f.support.boxModel && h.document.documentElement[e] || h.document.body[e] : a[e];
                h ? h.scrollTo(d ? f(h).scrollLeft() : g, d ? g : f(h).scrollTop()) : a[e] = g
            }, a, e, arguments.length, null)
        }
    }), f.each({
        Height: "height",
        Width: "width"
    }, function (a, c) {
        var d = "client" + a,
            e = "scroll" + a,
            g = "offset" + a;
        f.fn["inner" + a] = function () {
            var a = this[0];
            return a ? a.style ? parseFloat(f.css(a, c, "padding")) : this[c]() : null
        }, f.fn["outer" + a] = function (a) {
            var b = this[0];
            return b ? b.style ? parseFloat(f.css(b, c, a ? "margin" : "border")) : this[c]() : null
        }, f.fn[c] = function (a) {
            return f.access(this, function (a, c, h) {
                var i, j, k, l;
                if (f.isWindow(a)) {
                    i = a.document, j = i.documentElement[d];
                    return f.support.boxModel && j || i.body && i.body[d] || j
                }
                if (a.nodeType === 9) {
                    i = a.documentElement;
                    if (i[d] >= i[e]) return i[d];
                    return Math.max(a.body[e], i[e], a.body[g], i[g])
                }
                if (h === b) {
                    k = f.css(a, c), l = parseFloat(k);
                    return f.isNumeric(l) ? l : k
                }
                f(a).css(c, h)
            }, c, a, arguments.length, null)
        }
    }), a.jQuery = a.$ = f, typeof define == "function" && define.amd && define.amd.jQuery && define("jquery", [], function () {
        return f
    })
})(window);;
(function () {
    if (window.google && google.gears) {
        return;
    }
    var F = null;
    if (typeof GearsFactory != 'undefined') {
        F = new GearsFactory();
    } else {
        try {
            F = new ActiveXObject('Gears.Factory');
            if (F.getBuildInfo().indexOf('ie_mobile') != -1) {
                F.privateSetGlobalObject(this);
            }
        } catch (e) {
            if ((typeof navigator.mimeTypes != 'undefined') && navigator.mimeTypes["application/x-googlegears"]) {
                F = document.createElement("object");
                F.style.display = "none";
                F.width = 0;
                F.height = 0;
                F.type = "application/x-googlegears";
                document.documentElement.appendChild(F);
            }
        }
    }
    if (!F) {
        return;
    }
    if (!window.google) {
        google = {};
    }
    if (!google.gears) {
        google.gears = {
            factory: F
        };
    }
})();
Persist = (function () {
    var VERSION = '0.3.1',
        P, B, esc, init, empty, ec;
    ec = (function () {
        var EPOCH = 'Thu, 01-Jan-1970 00:00:01 GMT',
            RATIO = 1000 * 60 * 60 * 24,
            KEYS = ['expires', 'path', 'domain'],
            esc = escape,
            un = unescape,
            doc = document,
            me;
        var get_now = function () {
            var r = new Date();
            r.setTime(r.getTime());
            return r;
        };
        var cookify = function (c_key, c_val) {
            var i, key, val, r = [],
                opt = (arguments.length > 2) ? arguments[2] : {};
            r.push(esc(c_key) + '=' + esc(c_val));
            for (var idx = 0; idx < KEYS.length; idx++) {
                key = KEYS[idx];
                val = opt[key];
                if (val) {
                    r.push(key + '=' + val);
                }
            }
            if (opt.secure) {
                r.push('secure');
            }
            return r.join('; ');
        };
        var alive = function () {
            var k = '__EC_TEST__',
                v = new Date();
            v = v.toGMTString();
            this.set(k, v);
            this.enabled = (this.remove(k) == v);
            return this.enabled;
        };
        me = {
            set: function (key, val) {
                var opt = (arguments.length > 2) ? arguments[2] : {}, now = get_now(),
                    expire_at, cfg = {};
                if (opt.expires) {
                    var expires = opt.expires * RATIO;
                    cfg.expires = new Date(now.getTime() + expires);
                    cfg.expires = cfg.expires.toGMTString();
                }
                var keys = ['path', 'domain', 'secure'];
                for (var i = 0; i < keys.length; i++) {
                    if (opt[keys[i]]) {
                        cfg[keys[i]] = opt[keys[i]];
                    }
                }
                var r = cookify(key, val, cfg);
                doc.cookie = r;
                return val;
            },
            has: function (key) {
                key = esc(key);
                var c = doc.cookie,
                    ofs = c.indexOf(key + '='),
                    len = ofs + key.length + 1,
                    sub = c.substring(0, key.length);
                return ((!ofs && key != sub) || ofs < 0) ? false : true;
            },
            get: function (key) {
                key = esc(key);
                var c = doc.cookie,
                    ofs = c.indexOf(key + '='),
                    len = ofs + key.length + 1,
                    sub = c.substring(0, key.length),
                    end;
                if ((!ofs && key != sub) || ofs < 0) {
                    return null;
                }
                end = c.indexOf(';', len);
                if (end < 0) {
                    end = c.length;
                }
                return un(c.substring(len, end));
            },
            remove: function (k) {
                var r = me.get(k),
                    opt = {
                        expires: EPOCH
                    };
                doc.cookie = cookify(k, '', opt);
                return r;
            },
            keys: function () {
                var c = doc.cookie,
                    ps = c.split('; '),
                    i, p, r = [];
                for (var idx = 0; idx < ps.length; idx++) {
                    p = ps[idx].split('=');
                    r.push(un(p[0]));
                }
                return r;
            },
            all: function () {
                var c = doc.cookie,
                    ps = c.split('; '),
                    i, p, r = [];
                for (var idx = 0; idx < ps.length; idx++) {
                    p = ps[idx].split('=');
                    r.push([un(p[0]), un(p[1])]);
                }
                return r;
            },
            version: '0.2.1',
            enabled: false
        };
        me.enabled = alive.call(me);
        return me;
    }());
    var index_of = (function () {
        if (Array.prototype.indexOf) {
            return function (ary, val) {
                return Array.prototype.indexOf.call(ary, val);
            };
        } else {
            return function (ary, val) {
                var i, l;
                for (var idx = 0, len = ary.length; idx < len; idx++) {
                    if (ary[idx] == val) {
                        return idx;
                    }
                }
                return -1;
            };
        }
    })();
    empty = function () {};
    esc = function (str) {
        return 'PS' + str.replace(/_/g, '__').replace(/ /g, '_s');
    };
    var C = {
        search_order: ['localstorage', 'globalstorage', 'gears', 'cookie', 'ie', 'flash'],
        name_re: /^[a-z][a-z0-9_ \-]+$/i,
        methods: ['init', 'get', 'set', 'remove', 'load', 'save', 'iterate'],
        sql: {
            version: '1',
            create: "CREATE TABLE IF NOT EXISTS persist_data (k TEXT UNIQUE NOT NULL PRIMARY KEY, v TEXT NOT NULL)",
            get: "SELECT v FROM persist_data WHERE k = ?",
            set: "INSERT INTO persist_data(k, v) VALUES (?, ?)",
            remove: "DELETE FROM persist_data WHERE k = ?",
            keys: "SELECT * FROM persist_data"
        },
        flash: {
            div_id: '_persist_flash_wrap',
            id: '_persist_flash',
            path: 'persist.swf',
            size: {
                w: 1,
                h: 1
            },
            params: {
                autostart: true
            }
        }
    };
    B = {
        gears: {
            size: -1,
            test: function () {
                return (window.google && window.google.gears) ? true : false;
            },
            methods: {
                init: function () {
                    var db;
                    db = this.db = google.gears.factory.create('beta.database');
                    db.open(esc(this.name));
                    db.execute(C.sql.create).close();
                },
                get: function (key) {
                    var r, sql = C.sql.get;
                    var db = this.db;
                    var ret;
                    db.execute('BEGIN').close();
                    r = db.execute(sql, [key]);
                    ret = r.isValidRow() ? r.field(0) : null;
                    r.close();
                    db.execute('COMMIT').close();
                    return ret;
                },
                set: function (key, val) {
                    var rm_sql = C.sql.remove,
                        sql = C.sql.set,
                        r;
                    var db = this.db;
                    var ret;
                    db.execute('BEGIN').close();
                    db.execute(rm_sql, [key]).close();
                    db.execute(sql, [key, val]).close();
                    db.execute('COMMIT').close();
                    return val;
                },
                remove: function (key) {
                    var get_sql = C.sql.get,
                        sql = C.sql.remove,
                        r, val = null,
                        is_valid = false;
                    var db = this.db;
                    db.execute('BEGIN').close();
                    db.execute(sql, [key]).close();
                    db.execute('COMMIT').close();
                    return true;
                },
                iterate: function (fn, scope) {
                    var key_sql = C.sql.keys;
                    var r;
                    var db = this.db;
                    r = db.execute(key_sql);
                    while (r.isValidRow()) {
                        fn.call(scope || this, r.field(0), r.field(1));
                        r.next();
                    }
                    r.close();
                }
            }
        },
        globalstorage: {
            size: 5 * 1024 * 1024,
            test: function () {
                if (window.globalStorage) {
                    var domain = '127.0.0.1';
                    if (this.o && this.o.domain) {
                        domain = this.o.domain;
                    }
                    try {
                        var dontcare = globalStorage[domain];
                        return true;
                    } catch (e) {
                        if (window.console && window.console.warn) {
                            console.warn("globalStorage exists, but couldn't use it because your browser is running on domain:", domain);
                        }
                        return false;
                    }
                } else {
                    return false;
                }
            },
            methods: {
                key: function (key) {
                    return esc(this.name) + esc(key);
                },
                init: function () {
                    this.store = globalStorage[this.o.domain];
                },
                get: function (key) {
                    key = this.key(key);
                    return this.store.getItem(key);
                },
                set: function (key, val) {
                    key = this.key(key);
                    this.store.setItem(key, val);
                    return val;
                },
                remove: function (key) {
                    var val;
                    key = this.key(key);
                    val = this.store.getItem[key];
                    this.store.removeItem(key);
                    return val;
                }
            }
        },
        localstorage: {
            size: -1,
            test: function () {
                try {
                    if (window.localStorage && window.localStorage.setItem("test", null) == undefined) {
                        if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
                            var ffVersion = RegExp.$1;
                            if (ffVersion >= 9) {
                                return true;
                            }
                            if (window.location.protocol == 'file:') {
                                return false;
                            }
                        } else {
                            return true;
                        }
                    } else {
                        return false;
                    }
                    return window.localStorage ? true : false;
                } catch (e) {
                    return false;
                }
            },
            methods: {
                key: function (key) {
                    return this.name + '>' + key;
                },
                init: function () {
                    this.store = localStorage;
                },
                get: function (key) {
                    key = this.key(key);
                    return this.store.getItem(key);
                },
                set: function (key, val) {
                    key = this.key(key);
                    this.store.setItem(key, val);
                    return val;
                },
                remove: function (key) {
                    var val;
                    key = this.key(key);
                    val = this.store.getItem(key);
                    this.store.removeItem(key);
                    return val;
                },
                iterate: function (fn, scope) {
                    var l = this.store,
                        key, keys;
                    for (var i = 0; i < l.length; i++) {
                        key = l.key(i);
                        keys = key.split('>');
                        if ((keys.length == 2) && (keys[0] == this.name)) {
                            fn.call(scope || this, keys[1], l.getItem(key));
                        }
                    }
                }
            }
        },
        ie: {
            prefix: '_persist_data-',
            size: 64 * 1024,
            test: function () {
                return window.ActiveXObject ? true : false;
            },
            make_userdata: function (id) {
                var el = document.createElement('div');
                el.id = id;
                el.style.display = 'none';
                el.addBehavior('#default#userdata');
                document.body.appendChild(el);
                return el;
            },
            methods: {
                init: function () {
                    var id = B.ie.prefix + esc(this.name);
                    this.el = B.ie.make_userdata(id);
                    if (this.o.defer) {
                        this.load();
                    }
                },
                get: function (key) {
                    var val;
                    key = esc(key);
                    if (!this.o.defer) {
                        this.load();
                    }
                    val = this.el.getAttribute(key);
                    return val;
                },
                set: function (key, val) {
                    key = esc(key);
                    this.el.setAttribute(key, val);
                    if (!this.o.defer) {
                        this.save();
                    }
                    return val;
                },
                remove: function (key) {
                    var val;
                    key = esc(key);
                    if (!this.o.defer) {
                        this.load();
                    }
                    val = this.el.getAttribute(key);
                    this.el.removeAttribute(key);
                    if (!this.o.defer) {
                        this.save();
                    }
                    return val;
                },
                load: function () {
                    this.el.load(esc(this.name));
                },
                save: function () {
                    this.el.save(esc(this.name));
                }
            }
        },
        cookie: {
            delim: ':',
            size: 4000,
            test: function () {
                return P.Cookie.enabled ? true : false;
            },
            methods: {
                key: function (key) {
                    return this.name + B.cookie.delim + key;
                },
                get: function (key, fn) {
                    var val;
                    key = this.key(key);
                    val = ec.get(key);
                    return val;
                },
                set: function (key, val, fn) {
                    key = this.key(key);
                    ec.set(key, val, this.o);
                    return val;
                },
                remove: function (key, val) {
                    var val;
                    key = this.key(key);
                    val = ec.remove(key);
                    return val;
                }
            }
        },
        flash: {
            test: function () {
                try {
                    if (!swfobject) {
                        return false;
                    }
                } catch (e) {
                    return false;
                }
                var major = swfobject.getFlashPlayerVersion().major;
                return (major >= 8) ? true : false;
            },
            methods: {
                init: function () {
                    if (!B.flash.el) {
                        var key, el, fel, cfg = C.flash;
                        el = document.createElement('div');
                        el.id = cfg.div_id;
                        fel = document.createElement('div');
                        fel.id = cfg.id;
                        el.appendChild(fel);
                        document.body.appendChild(el);
                        B.flash.el = swfobject.createSWF({
                            id: cfg.id,
                            data: this.o.swf_path || cfg.path,
                            width: cfg.size.w,
                            height: cfg.size.h
                        }, cfg.params, cfg.id);
                    }
                    this.el = B.flash.el;
                },
                get: function (key) {
                    var val;
                    key = esc(key);
                    val = this.el.get(this.name, key);
                    return val;
                },
                set: function (key, val) {
                    var old_val;
                    key = esc(key);
                    old_val = this.el.set(this.name, key, val);
                    return old_val;
                },
                remove: function (key) {
                    var val;
                    key = esc(key);
                    val = this.el.remove(this.name, key);
                    return val;
                }
            }
        }
    };
    init = function () {
        var i, l, b, key, fns = C.methods,
            keys = C.search_order;
        for (var idx = 0, len = fns.length; idx < len; idx++) {
            P.Store.prototype[fns[idx]] = empty;
        }
        P.type = null;
        P.size = -1;
        for (var idx2 = 0, len2 = keys.length; !P.type && idx2 < len2; idx2++) {
            b = B[keys[idx2]];
            if (b.test()) {
                P.type = keys[idx2];
                P.size = b.size;
                for (key in b.methods) {
                    P.Store.prototype[key] = b.methods[key];
                }
            }
        }
        P._init = true;
    };
    P = {
        VERSION: VERSION,
        type: null,
        size: 0,
        add: function (o) {
            B[o.id] = o;
            C.search_order = [o.id].concat(C.search_order);
            init();
        },
        remove: function (id) {
            var ofs = index_of(C.search_order, id);
            if (ofs < 0) {
                return;
            }
            C.search_order.splice(ofs, 1);
            delete B[id];
            init();
        },
        Cookie: ec,
        Store: function (name, o) {
            if (!C.name_re.exec(name)) {
                throw new Error("Invalid name");
            }
            if (!P.type) {
                throw new Error("No suitable storage found");
            }
            o = o || {};
            this.name = name;
            o.domain = o.domain || location.hostname || 'localhost';
            o.domain = o.domain.replace(/:\d+$/, '');
            o.domain = (o.domain == 'localhost') ? '' : o.domain;
            this.o = o;
            o.expires = o.expires || 365 * 2;
            o.path = o.path || '/';
            if (this.o.search_order) {
                C.search_order = this.o.search_order;
                init();
            }
            this.init();
        }
    };
    init();
    return P;
})();;
/*!
 * Bootstrap.js by @fat & @mdo
 * Copyright 2012 Twitter, Inc.
 * http://www.apache.org/licenses/LICENSE-2.0.txt
 */
! function (e) {
    "use strict";
    e(function () {
        e.support.transition = function () {
            var e = function () {
                var e = document.createElement("bootstrap"),
                    t = {
                        WebkitTransition: "webkitTransitionEnd",
                        MozTransition: "transitionend",
                        OTransition: "oTransitionEnd otransitionend",
                        transition: "transitionend"
                    }, n;
                for (n in t)
                    if (e.style[n] !== undefined) return t[n]
            }();
            return e && {
                end: e
            }
        }()
    })
}(window.jQuery), ! function (e) {
    "use strict";
    var t = '[data-dismiss="alert"]',
        n = function (n) {
            e(n).on("click", t, this.close)
        };
    n.prototype.close = function (t) {
        function s() {
            i.trigger("closed").remove()
        }
        var n = e(this),
            r = n.attr("data-target"),
            i;
        r || (r = n.attr("href"), r = r && r.replace(/.*(?=#[^\s]*$)/, "")), i = e(r), t && t.preventDefault(), i.length || (i = n.hasClass("alert") ? n : n.parent()), i.trigger(t = e.Event("close"));
        if (t.isDefaultPrevented()) return;
        i.removeClass("in"), e.support.transition && i.hasClass("fade") ? i.on(e.support.transition.end, s) : s()
    }, e.fn.alert = function (t) {
        return this.each(function () {
            var r = e(this),
                i = r.data("alert");
            i || r.data("alert", i = new n(this)), typeof t == "string" && i[t].call(r)
        })
    }, e.fn.alert.Constructor = n, e(document).on("click.alert.data-api", t, n.prototype.close)
}(window.jQuery), ! function (e) {
    "use strict";
    var t = function (t, n) {
        this.$element = e(t), this.options = e.extend({}, e.fn.button.defaults, n)
    };
    t.prototype.setState = function (e) {
        var t = "disabled",
            n = this.$element,
            r = n.data(),
            i = n.is("input") ? "val" : "html";
        e += "Text", r.resetText || n.data("resetText", n[i]()), n[i](r[e] || this.options[e]), setTimeout(function () {
            e == "loadingText" ? n.addClass(t).attr(t, t) : n.removeClass(t).removeAttr(t)
        }, 0)
    }, t.prototype.toggle = function () {
        var e = this.$element.closest('[data-toggle="buttons-radio"]');
        e && e.find(".active").removeClass("active"), this.$element.toggleClass("active")
    }, e.fn.button = function (n) {
        return this.each(function () {
            var r = e(this),
                i = r.data("button"),
                s = typeof n == "object" && n;
            i || r.data("button", i = new t(this, s)), n == "toggle" ? i.toggle() : n && i.setState(n)
        })
    }, e.fn.button.defaults = {
        loadingText: "loading..."
    }, e.fn.button.Constructor = t, e(document).on("click.button.data-api", "[data-toggle^=button]", function (t) {
        var n = e(t.target);
        n.hasClass("btn") || (n = n.closest(".btn")), n.button("toggle")
    })
}(window.jQuery), ! function (e) {
    "use strict";
    var t = function (t, n) {
        this.$element = e(t), this.options = n, this.options.slide && this.slide(this.options.slide), this.options.pause == "hover" && this.$element.on("mouseenter", e.proxy(this.pause, this)).on("mouseleave", e.proxy(this.cycle, this))
    };
    t.prototype = {
        cycle: function (t) {
            return t || (this.paused = !1), this.options.interval && !this.paused && (this.interval = setInterval(e.proxy(this.next, this), this.options.interval)), this
        },
        to: function (t) {
            var n = this.$element.find(".item.active"),
                r = n.parent().children(),
                i = r.index(n),
                s = this;
            if (t > r.length - 1 || t < 0) return;
            return this.sliding ? this.$element.one("slid", function () {
                s.to(t)
            }) : i == t ? this.pause().cycle() : this.slide(t > i ? "next" : "prev", e(r[t]))
        },
        pause: function (t) {
            return t || (this.paused = !0), this.$element.find(".next, .prev").length && e.support.transition.end && (this.$element.trigger(e.support.transition.end), this.cycle()), clearInterval(this.interval), this.interval = null, this
        },
        next: function () {
            if (this.sliding) return;
            return this.slide("next")
        },
        prev: function () {
            if (this.sliding) return;
            return this.slide("prev")
        },
        slide: function (t, n) {
            var r = this.$element.find(".item.active"),
                i = n || r[t](),
                s = this.interval,
                o = t == "next" ? "left" : "right",
                u = t == "next" ? "first" : "last",
                a = this,
                f;
            this.sliding = !0, s && this.pause(), i = i.length ? i : this.$element.find(".item")[u](), f = e.Event("slide", {
                relatedTarget: i[0]
            });
            if (i.hasClass("active")) return;
            if (e.support.transition && this.$element.hasClass("slide")) {
                this.$element.trigger(f);
                if (f.isDefaultPrevented()) return;
                i.addClass(t), i[0].offsetWidth, r.addClass(o), i.addClass(o), this.$element.one(e.support.transition.end, function () {
                    i.removeClass([t, o].join(" ")).addClass("active"), r.removeClass(["active", o].join(" ")), a.sliding = !1, setTimeout(function () {
                        a.$element.trigger("slid")
                    }, 0)
                })
            } else {
                this.$element.trigger(f);
                if (f.isDefaultPrevented()) return;
                r.removeClass("active"), i.addClass("active"), this.sliding = !1, this.$element.trigger("slid")
            }
            return s && this.cycle(), this
        }
    }, e.fn.carousel = function (n) {
        return this.each(function () {
            var r = e(this),
                i = r.data("carousel"),
                s = e.extend({}, e.fn.carousel.defaults, typeof n == "object" && n),
                o = typeof n == "string" ? n : s.slide;
            i || r.data("carousel", i = new t(this, s)), typeof n == "number" ? i.to(n) : o ? i[o]() : s.interval && i.cycle()
        })
    }, e.fn.carousel.defaults = {
        interval: 5e3,
        pause: "hover"
    }, e.fn.carousel.Constructor = t, e(document).on("click.carousel.data-api", "[data-slide]", function (t) {
        var n = e(this),
            r, i = e(n.attr("data-target") || (r = n.attr("href")) && r.replace(/.*(?=#[^\s]+$)/, "")),
            s = e.extend({}, i.data(), n.data());
        i.carousel(s), t.preventDefault()
    })
}(window.jQuery), ! function (e) {
    "use strict";
    var t = function (t, n) {
        this.$element = e(t), this.options = e.extend({}, e.fn.collapse.defaults, n), this.options.parent && (this.$parent = e(this.options.parent)), this.options.toggle && this.toggle()
    };
    t.prototype = {
        constructor: t,
        dimension: function () {
            var e = this.$element.hasClass("width");
            return e ? "width" : "height"
        },
        show: function () {
            var t, n, r, i;
            if (this.transitioning) return;
            t = this.dimension(), n = e.camelCase(["scroll", t].join("-")), r = this.$parent && this.$parent.find("> .accordion-group > .in");
            if (r && r.length) {
                i = r.data("collapse");
                if (i && i.transitioning) return;
                r.collapse("hide"), i || r.data("collapse", null)
            }
            this.$element[t](0), this.transition("addClass", e.Event("show"), "shown"), e.support.transition && this.$element[t](this.$element[0][n])
        },
        hide: function () {
            var t;
            if (this.transitioning) return;
            t = this.dimension(), this.reset(this.$element[t]()), this.transition("removeClass", e.Event("hide"), "hidden"), this.$element[t](0)
        },
        reset: function (e) {
            var t = this.dimension();
            return this.$element.removeClass("collapse")[t](e || "auto")[0].offsetWidth, this.$element[e !== null ? "addClass" : "removeClass"]("collapse"), this
        },
        transition: function (t, n, r) {
            var i = this,
                s = function () {
                    n.type == "show" && i.reset(), i.transitioning = 0, i.$element.trigger(r)
                };
            this.$element.trigger(n);
            if (n.isDefaultPrevented()) return;
            this.transitioning = 1, this.$element[t]("in"), e.support.transition && this.$element.hasClass("collapse") ? this.$element.one(e.support.transition.end, s) : s()
        },
        toggle: function () {
            this[this.$element.hasClass("in") ? "hide" : "show"]()
        }
    }, e.fn.collapse = function (n) {
        return this.each(function () {
            var r = e(this),
                i = r.data("collapse"),
                s = typeof n == "object" && n;
            i || r.data("collapse", i = new t(this, s)), typeof n == "string" && i[n]()
        })
    }, e.fn.collapse.defaults = {
        toggle: !0
    }, e.fn.collapse.Constructor = t, e(document).on("click.collapse.data-api", "[data-toggle=collapse]", function (t) {
        var n = e(this),
            r, i = n.attr("data-target") || t.preventDefault() || (r = n.attr("href")) && r.replace(/.*(?=#[^\s]+$)/, ""),
            s = e(i).data("collapse") ? "toggle" : n.data();
        n[e(i).hasClass("in") ? "addClass" : "removeClass"]("collapsed"), e(i).collapse(s)
    })
}(window.jQuery), ! function (e) {
    "use strict";

    function r() {
        e(t).each(function () {
            i(e(this)).removeClass("open")
        })
    }

    function i(t) {
        var n = t.attr("data-target"),
            r;
        return n || (n = t.attr("href"), n = n && /#/.test(n) && n.replace(/.*(?=#[^\s]*$)/, "")), r = e(n), r.length || (r = t.parent()), r
    }
    var t = "[data-toggle=dropdown]",
        n = function (t) {
            var n = e(t).on("click.dropdown.data-api", this.toggle);
            e("html").on("click.dropdown.data-api", function () {
                n.parent().removeClass("open")
            })
        };
    n.prototype = {
        constructor: n,
        toggle: function (t) {
            var n = e(this),
                s, o;
            if (n.is(".disabled, :disabled")) return;
            return s = i(n), o = s.hasClass("open"), r(), o || (s.toggleClass("open"), n.focus()), !1
        },
        keydown: function (t) {
            var n, r, s, o, u, a;
            if (!/(38|40|27)/.test(t.keyCode)) return;
            n = e(this), t.preventDefault(), t.stopPropagation();
            if (n.is(".disabled, :disabled")) return;
            o = i(n), u = o.hasClass("open");
            if (!u || u && t.keyCode == 27) return n.click();
            r = e("[role=menu] li:not(.divider) a", o);
            if (!r.length) return;
            a = r.index(r.filter(":focus")), t.keyCode == 38 && a > 0 && a--, t.keyCode == 40 && a < r.length - 1 && a++, ~a || (a = 0), r.eq(a).focus()
        }
    }, e.fn.dropdown = function (t) {
        return this.each(function () {
            var r = e(this),
                i = r.data("dropdown");
            i || r.data("dropdown", i = new n(this)), typeof t == "string" && i[t].call(r)
        })
    }, e.fn.dropdown.Constructor = n, e(document).on("click.dropdown.data-api touchstart.dropdown.data-api", r).on("click.dropdown touchstart.dropdown.data-api", ".dropdown form", function (e) {
        e.stopPropagation()
    }).on("click.dropdown.data-api touchstart.dropdown.data-api", t, n.prototype.toggle).on("keydown.dropdown.data-api touchstart.dropdown.data-api", t + ", [role=menu]", n.prototype.keydown)
}(window.jQuery), ! function (e) {
    "use strict";
    var t = function (t, n) {
        this.options = n, this.$element = e(t).delegate('[data-dismiss="modal"]', "click.dismiss.modal", e.proxy(this.hide, this)), this.options.remote && this.$element.find(".modal-body").load(this.options.remote)
    };
    t.prototype = {
        constructor: t,
        toggle: function () {
            return this[this.isShown ? "hide" : "show"]()
        },
        show: function () {
            var t = this,
                n = e.Event("show");
            this.$element.trigger(n);
            if (this.isShown || n.isDefaultPrevented()) return;
            this.isShown = !0, this.escape(), this.backdrop(function () {
                var n = e.support.transition && t.$element.hasClass("fade");
                t.$element.parent().length || t.$element.appendTo(document.body), t.$element.show(), n && t.$element[0].offsetWidth, t.$element.addClass("in").attr("aria-hidden", !1), t.enforceFocus(), n ? t.$element.one(e.support.transition.end, function () {
                    t.$element.focus().trigger("shown")
                }) : t.$element.focus().trigger("shown")
            })
        },
        hide: function (t) {
            t && t.preventDefault();
            var n = this;
            t = e.Event("hide"), this.$element.trigger(t);
            if (!this.isShown || t.isDefaultPrevented()) return;
            this.isShown = !1, this.escape(), e(document).off("focusin.modal"), this.$element.removeClass("in").attr("aria-hidden", !0), e.support.transition && this.$element.hasClass("fade") ? this.hideWithTransition() : this.hideModal()
        },
        enforceFocus: function () {
            var t = this;
            e(document).on("focusin.modal", function (e) {
                t.$element[0] !== e.target && !t.$element.has(e.target).length && t.$element.focus()
            })
        },
        escape: function () {
            var e = this;
            this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.modal", function (t) {
                t.which == 27 && e.hide()
            }) : this.isShown || this.$element.off("keyup.dismiss.modal")
        },
        hideWithTransition: function () {
            var t = this,
                n = setTimeout(function () {
                    t.$element.off(e.support.transition.end), t.hideModal()
                }, 500);
            this.$element.one(e.support.transition.end, function () {
                clearTimeout(n), t.hideModal()
            })
        },
        hideModal: function (e) {
            this.$element.hide().trigger("hidden"), this.backdrop()
        },
        removeBackdrop: function () {
            this.$backdrop.remove(), this.$backdrop = null
        },
        backdrop: function (t) {
            var n = this,
                r = this.$element.hasClass("fade") ? "fade" : "";
            if (this.isShown && this.options.backdrop) {
                var i = e.support.transition && r;
                this.$backdrop = e('<div class="modal-backdrop ' + r + '" />').appendTo(document.body), this.$backdrop.click(this.options.backdrop == "static" ? e.proxy(this.$element[0].focus, this.$element[0]) : e.proxy(this.hide, this)), i && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), i ? this.$backdrop.one(e.support.transition.end, t) : t()
            } else !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), e.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(e.support.transition.end, e.proxy(this.removeBackdrop, this)) : this.removeBackdrop()) : t && t()
        }
    }, e.fn.modal = function (n) {
        return this.each(function () {
            var r = e(this),
                i = r.data("modal"),
                s = e.extend({}, e.fn.modal.defaults, r.data(), typeof n == "object" && n);
            i || r.data("modal", i = new t(this, s)), typeof n == "string" ? i[n]() : s.show && i.show()
        })
    }, e.fn.modal.defaults = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, e.fn.modal.Constructor = t, e(document).on("click.modal.data-api", '[data-toggle="modal"]', function (t) {
        var n = e(this),
            r = n.attr("href"),
            i = e(n.attr("data-target") || r && r.replace(/.*(?=#[^\s]+$)/, "")),
            s = i.data("modal") ? "toggle" : e.extend({
                remote: !/#/.test(r) && r
            }, i.data(), n.data());
        t.preventDefault(), i.modal(s).one("hide", function () {
            n.focus()
        })
    })
}(window.jQuery), ! function (e) {
    "use strict";
    var t = function (e, t) {
        this.init("tooltip", e, t)
    };
    t.prototype = {
        constructor: t,
        init: function (t, n, r) {
            var i, s;
            this.type = t, this.$element = e(n), this.options = this.getOptions(r), this.enabled = !0, this.options.trigger == "click" ? this.$element.on("click." + this.type, this.options.selector, e.proxy(this.toggle, this)) : this.options.trigger != "manual" && (i = this.options.trigger == "hover" ? "mouseenter" : "focus", s = this.options.trigger == "hover" ? "mouseleave" : "blur", this.$element.on(i + "." + this.type, this.options.selector, e.proxy(this.enter, this)), this.$element.on(s + "." + this.type, this.options.selector, e.proxy(this.leave, this))), this.options.selector ? this._options = e.extend({}, this.options, {
                trigger: "manual",
                selector: ""
            }) : this.fixTitle()
        },
        getOptions: function (t) {
            return t = e.extend({}, e.fn[this.type].defaults, t, this.$element.data()), t.delay && typeof t.delay == "number" && (t.delay = {
                show: t.delay,
                hide: t.delay
            }), t
        },
        enter: function (t) {
            var n = e(t.currentTarget)[this.type](this._options).data(this.type);
            if (!n.options.delay || !n.options.delay.show) return n.show();
            clearTimeout(this.timeout), n.hoverState = "in", this.timeout = setTimeout(function () {
                n.hoverState == "in" && n.show()
            }, n.options.delay.show)
        },
        leave: function (t) {
            var n = e(t.currentTarget)[this.type](this._options).data(this.type);
            this.timeout && clearTimeout(this.timeout);
            if (!n.options.delay || !n.options.delay.hide) return n.hide();
            n.hoverState = "out", this.timeout = setTimeout(function () {
                n.hoverState == "out" && n.hide()
            }, n.options.delay.hide)
        },
        show: function () {
            var e, t, n, r, i, s, o;
            if (this.hasContent() && this.enabled) {
                e = this.tip(), this.setContent(), this.options.animation && e.addClass("fade"), s = typeof this.options.placement == "function" ? this.options.placement.call(this, e[0], this.$element[0]) : this.options.placement, t = /in/.test(s), e.detach().css({
                    top: 0,
                    left: 0,
                    display: "block"
                }).insertAfter(this.$element), n = this.getPosition(t), r = e[0].offsetWidth, i = e[0].offsetHeight;
                switch (t ? s.split(" ")[1] : s) {
                case "bottom":
                    o = {
                        top: n.top + n.height,
                        left: n.left + n.width / 2 - r / 2
                    };
                    break;
                case "top":
                    o = {
                        top: n.top - i,
                        left: n.left + n.width / 2 - r / 2
                    };
                    break;
                case "left":
                    o = {
                        top: n.top + n.height / 2 - i / 2,
                        left: n.left - r
                    };
                    break;
                case "right":
                    o = {
                        top: n.top + n.height / 2 - i / 2,
                        left: n.left + n.width
                    }
                }
                e.offset(o).addClass(s).addClass("in")
            }
        },
        setContent: function () {
            var e = this.tip(),
                t = this.getTitle();
            e.find(".tooltip-inner")[this.options.html ? "html" : "text"](t), e.removeClass("fade in top bottom left right")
        },
        hide: function () {
            function r() {
                var t = setTimeout(function () {
                    n.off(e.support.transition.end).detach()
                }, 500);
                n.one(e.support.transition.end, function () {
                    clearTimeout(t), n.detach()
                })
            }
            var t = this,
                n = this.tip();
            return n.removeClass("in"), e.support.transition && this.$tip.hasClass("fade") ? r() : n.detach(), this
        },
        fixTitle: function () {
            var e = this.$element;
            (e.attr("title") || typeof e.attr("data-original-title") != "string") && e.attr("data-original-title", e.attr("title") || "").removeAttr("title")
        },
        hasContent: function () {
            return this.getTitle()
        },
        getPosition: function (t) {
            return e.extend({}, t ? {
                top: 0,
                left: 0
            } : this.$element.offset(), {
                width: this.$element[0].offsetWidth,
                height: this.$element[0].offsetHeight
            })
        },
        getTitle: function () {
            var e, t = this.$element,
                n = this.options;
            return e = t.attr("data-original-title") || (typeof n.title == "function" ? n.title.call(t[0]) : n.title), e
        },
        tip: function () {
            return this.$tip = this.$tip || e(this.options.template)
        },
        validate: function () {
            this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
        },
        enable: function () {
            this.enabled = !0
        },
        disable: function () {
            this.enabled = !1
        },
        toggleEnabled: function () {
            this.enabled = !this.enabled
        },
        toggle: function (t) {
            var n = e(t.currentTarget)[this.type](this._options).data(this.type);
            n[n.tip().hasClass("in") ? "hide" : "show"]()
        },
        destroy: function () {
            this.hide().$element.off("." + this.type).removeData(this.type)
        }
    }, e.fn.tooltip = function (n) {
        return this.each(function () {
            var r = e(this),
                i = r.data("tooltip"),
                s = typeof n == "object" && n;
            i || r.data("tooltip", i = new t(this, s)), typeof n == "string" && i[n]()
        })
    }, e.fn.tooltip.Constructor = t, e.fn.tooltip.defaults = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover",
        title: "",
        delay: 0,
        html: !1
    }
}(window.jQuery), ! function (e) {
    "use strict";
    var t = function (e, t) {
        this.init("popover", e, t)
    };
    t.prototype = e.extend({}, e.fn.tooltip.Constructor.prototype, {
        constructor: t,
        setContent: function () {
            var e = this.tip(),
                t = this.getTitle(),
                n = this.getContent();
            e.find(".popover-title")[this.options.html ? "html" : "text"](t), e.find(".popover-content > *")[this.options.html ? "html" : "text"](n), e.removeClass("fade top bottom left right in")
        },
        hasContent: function () {
            return this.getTitle() || this.getContent()
        },
        getContent: function () {
            var e, t = this.$element,
                n = this.options;
            return e = t.attr("data-content") || (typeof n.content == "function" ? n.content.call(t[0]) : n.content), e
        },
        tip: function () {
            return this.$tip || (this.$tip = e(this.options.template)), this.$tip
        },
        destroy: function () {
            this.hide().$element.off("." + this.type).removeData(this.type)
        }
    }), e.fn.popover = function (n) {
        return this.each(function () {
            var r = e(this),
                i = r.data("popover"),
                s = typeof n == "object" && n;
            i || r.data("popover", i = new t(this, s)), typeof n == "string" && i[n]()
        })
    }, e.fn.popover.Constructor = t, e.fn.popover.defaults = e.extend({}, e.fn.tooltip.defaults, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'
    })
}(window.jQuery), ! function (e) {
    "use strict";

    function t(t, n) {
        var r = e.proxy(this.process, this),
            i = e(t).is("body") ? e(window) : e(t),
            s;
        this.options = e.extend({}, e.fn.scrollspy.defaults, n), this.$scrollElement = i.on("scroll.scroll-spy.data-api", r), this.selector = (this.options.target || (s = e(t).attr("href")) && s.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a", this.$body = e("body"), this.refresh(), this.process()
    }
    t.prototype = {
        constructor: t,
        refresh: function () {
            var t = this,
                n;
            this.offsets = e([]), this.targets = e([]), n = this.$body.find(this.selector).map(function () {
                var t = e(this),
                    n = t.data("target") || t.attr("href"),
                    r = /^#\w/.test(n) && e(n);
                return r && r.length && [
                    [r.position().top, n]
                ] || null
            }).sort(function (e, t) {
                return e[0] - t[0]
            }).each(function () {
                t.offsets.push(this[0]), t.targets.push(this[1])
            })
        },
        process: function () {
            var e = this.$scrollElement.scrollTop() + this.options.offset,
                t = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight,
                n = t - this.$scrollElement.height(),
                r = this.offsets,
                i = this.targets,
                s = this.activeTarget,
                o;
            if (e >= n) return s != (o = i.last()[0]) && this.activate(o);
            for (o = r.length; o--;) s != i[o] && e >= r[o] && (!r[o + 1] || e <= r[o + 1]) && this.activate(i[o])
        },
        activate: function (t) {
            var n, r;
            this.activeTarget = t, e(this.selector).parent(".active").removeClass("active"), r = this.selector + '[data-target="' + t + '"],' + this.selector + '[href="' + t + '"]', n = e(r).parent("li").addClass("active"), n.parent(".dropdown-menu").length && (n = n.closest("li.dropdown").addClass("active")), n.trigger("activate")
        }
    }, e.fn.scrollspy = function (n) {
        return this.each(function () {
            var r = e(this),
                i = r.data("scrollspy"),
                s = typeof n == "object" && n;
            i || r.data("scrollspy", i = new t(this, s)), typeof n == "string" && i[n]()
        })
    }, e.fn.scrollspy.Constructor = t, e.fn.scrollspy.defaults = {
        offset: 10
    }, e(window).on("load", function () {
        e('[data-spy="scroll"]').each(function () {
            var t = e(this);
            t.scrollspy(t.data())
        })
    })
}(window.jQuery), ! function (e) {
    "use strict";
    var t = function (t) {
        this.element = e(t)
    };
    t.prototype = {
        constructor: t,
        show: function () {
            var t = this.element,
                n = t.closest("ul:not(.dropdown-menu)"),
                r = t.attr("data-target"),
                i, s, o;
            r || (r = t.attr("href"), r = r && r.replace(/.*(?=#[^\s]*$)/, ""));
            if (t.parent("li").hasClass("active")) return;
            i = n.find(".active:last a")[0], o = e.Event("show", {
                relatedTarget: i
            }), t.trigger(o);
            if (o.isDefaultPrevented()) return;
            s = e(r), this.activate(t.parent("li"), n), this.activate(s, s.parent(), function () {
                t.trigger({
                    type: "shown",
                    relatedTarget: i
                })
            })
        },
        activate: function (t, n, r) {
            function o() {
                i.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), t.addClass("active"), s ? (t[0].offsetWidth, t.addClass("in")) : t.removeClass("fade"), t.parent(".dropdown-menu") && t.closest("li.dropdown").addClass("active"), r && r()
            }
            var i = n.find("> .active"),
                s = r && e.support.transition && i.hasClass("fade");
            s ? i.one(e.support.transition.end, o) : o(), i.removeClass("in")
        }
    }, e.fn.tab = function (n) {
        return this.each(function () {
            var r = e(this),
                i = r.data("tab");
            i || r.data("tab", i = new t(this)), typeof n == "string" && i[n]()
        })
    }, e.fn.tab.Constructor = t, e(document).on("click.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function (t) {
        t.preventDefault(), e(this).tab("show")
    })
}(window.jQuery), ! function (e) {
    "use strict";
    var t = function (t, n) {
        this.$element = e(t), this.options = e.extend({}, e.fn.typeahead.defaults, n), this.matcher = this.options.matcher || this.matcher, this.sorter = this.options.sorter || this.sorter, this.highlighter = this.options.highlighter || this.highlighter, this.updater = this.options.updater || this.updater, this.$menu = e(this.options.menu).appendTo("body"), this.source = this.options.source, this.shown = !1, this.listen()
    };
    t.prototype = {
        constructor: t,
        select: function () {
            var e = this.$menu.find(".active").attr("data-value");
            return this.$element.val(this.updater(e)).change(), this.hide()
        },
        updater: function (e) {
            return e
        },
        show: function () {
            var t = e.extend({}, this.$element.offset(), {
                height: this.$element[0].offsetHeight
            });
            return this.$menu.css({
                top: t.top + t.height,
                left: t.left
            }), this.$menu.show(), this.shown = !0, this
        },
        hide: function () {
            return this.$menu.hide(), this.shown = !1, this
        },
        lookup: function (t) {
            var n;
            return this.query = this.$element.val(), !this.query || this.query.length < this.options.minLength ? this.shown ? this.hide() : this : (n = e.isFunction(this.source) ? this.source(this.query, e.proxy(this.process, this)) : this.source, n ? this.process(n) : this)
        },
        process: function (t) {
            var n = this;
            return t = e.grep(t, function (e) {
                return n.matcher(e)
            }), t = this.sorter(t), t.length ? this.render(t.slice(0, this.options.items)).show() : this.shown ? this.hide() : this
        },
        matcher: function (e) {
            return~ e.toLowerCase().indexOf(this.query.toLowerCase())
        },
        sorter: function (e) {
            var t = [],
                n = [],
                r = [],
                i;
            while (i = e.shift()) i.toLowerCase().indexOf(this.query.toLowerCase()) ? ~i.indexOf(this.query) ? n.push(i) : r.push(i) : t.push(i);
            return t.concat(n, r)
        },
        highlighter: function (e) {
            var t = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
            return e.replace(new RegExp("(" + t + ")", "ig"), function (e, t) {
                return "<strong>" + t + "</strong>"
            })
        },
        render: function (t) {
            var n = this;
            return t = e(t).map(function (t, r) {
                return t = e(n.options.item).attr("data-value", r), t.find("a").html(n.highlighter(r)), t[0]
            }), t.first().addClass("active"), this.$menu.html(t), this
        },
        next: function (t) {
            var n = this.$menu.find(".active").removeClass("active"),
                r = n.next();
            r.length || (r = e(this.$menu.find("li")[0])), r.addClass("active")
        },
        prev: function (e) {
            var t = this.$menu.find(".active").removeClass("active"),
                n = t.prev();
            n.length || (n = this.$menu.find("li").last()), n.addClass("active")
        },
        listen: function () {
            this.$element.on("blur", e.proxy(this.blur, this)).on("keypress", e.proxy(this.keypress, this)).on("keyup", e.proxy(this.keyup, this)), this.eventSupported("keydown") && this.$element.on("keydown", e.proxy(this.keydown, this)), this.$menu.on("click", e.proxy(this.click, this)).on("mouseenter", "li", e.proxy(this.mouseenter, this))
        },
        eventSupported: function (e) {
            var t = e in this.$element;
            return t || (this.$element.setAttribute(e, "return;"), t = typeof this.$element[e] == "function"), t
        },
        move: function (e) {
            if (!this.shown) return;
            switch (e.keyCode) {
            case 9:
            case 13:
            case 27:
                e.preventDefault();
                break;
            case 38:
                e.preventDefault(), this.prev();
                break;
            case 40:
                e.preventDefault(), this.next()
            }
            e.stopPropagation()
        },
        keydown: function (t) {
            this.suppressKeyPressRepeat = !~e.inArray(t.keyCode, [40, 38, 9, 13, 27]), this.move(t)
        },
        keypress: function (e) {
            if (this.suppressKeyPressRepeat) return;
            this.move(e)
        },
        keyup: function (e) {
            switch (e.keyCode) {
            case 40:
            case 38:
            case 16:
            case 17:
            case 18:
                break;
            case 9:
            case 13:
                if (!this.shown) return;
                this.select();
                break;
            case 27:
                if (!this.shown) return;
                this.hide();
                break;
            default:
                this.lookup()
            }
            e.stopPropagation(), e.preventDefault()
        },
        blur: function (e) {
            var t = this;
            setTimeout(function () {
                t.hide()
            }, 150)
        },
        click: function (e) {
            e.stopPropagation(), e.preventDefault(), this.select()
        },
        mouseenter: function (t) {
            this.$menu.find(".active").removeClass("active"), e(t.currentTarget).addClass("active")
        }
    }, e.fn.typeahead = function (n) {
        return this.each(function () {
            var r = e(this),
                i = r.data("typeahead"),
                s = typeof n == "object" && n;
            i || r.data("typeahead", i = new t(this, s)), typeof n == "string" && i[n]()
        })
    }, e.fn.typeahead.defaults = {
        source: [],
        items: 8,
        menu: '<ul class="typeahead dropdown-menu"></ul>',
        item: '<li><a href="#"></a></li>',
        minLength: 1
    }, e.fn.typeahead.Constructor = t, e(document).on("focus.typeahead.data-api", '[data-provide="typeahead"]', function (t) {
        var n = e(this);
        if (n.data("typeahead")) return;
        t.preventDefault(), n.typeahead(n.data())
    })
}(window.jQuery), ! function (e) {
    "use strict";
    var t = function (t, n) {
        this.options = e.extend({}, e.fn.affix.defaults, n), this.$window = e(window).on("scroll.affix.data-api", e.proxy(this.checkPosition, this)).on("click.affix.data-api", e.proxy(function () {
            setTimeout(e.proxy(this.checkPosition, this), 1)
        }, this)), this.$element = e(t), this.checkPosition()
    };
    t.prototype.checkPosition = function () {
        if (!this.$element.is(":visible")) return;
        var t = e(document).height(),
            n = this.$window.scrollTop(),
            r = this.$element.offset(),
            i = this.options.offset,
            s = i.bottom,
            o = i.top,
            u = "affix affix-top affix-bottom",
            a;
        typeof i != "object" && (s = o = i), typeof o == "function" && (o = i.top()), typeof s == "function" && (s = i.bottom()), a = this.unpin != null && n + this.unpin <= r.top ? !1 : s != null && r.top + this.$element.height() >= t - s ? "bottom" : o != null && n <= o ? "top" : !1;
        if (this.affixed === a) return;
        this.affixed = a, this.unpin = a == "bottom" ? r.top - n : null, this.$element.removeClass(u).addClass("affix" + (a ? "-" + a : ""))
    }, e.fn.affix = function (n) {
        return this.each(function () {
            var r = e(this),
                i = r.data("affix"),
                s = typeof n == "object" && n;
            i || r.data("affix", i = new t(this, s)), typeof n == "string" && i[n]()
        })
    }, e.fn.affix.Constructor = t, e.fn.affix.defaults = {
        offset: 0
    }, e(window).on("load", function () {
        e('[data-spy="affix"]').each(function () {
            var t = e(this),
                n = t.data();
            n.offset = n.offset || {}, n.offsetBottom && (n.offset.bottom = n.offsetBottom), n.offsetTop && (n.offset.top = n.offsetTop), t.affix(n)
        })
    })
}(window.jQuery);; /*! http://mths.be/placeholder v2.0.7 by @mathias */ ;
(function (f, h, $) {
    var a = 'placeholder' in h.createElement('input'),
        d = 'placeholder' in h.createElement('textarea'),
        i = $.fn,
        c = $.valHooks,
        k, j;
    if (a && d) {
        j = i.placeholder = function () {
            return this
        };
        j.input = j.textarea = true
    } else {
        j = i.placeholder = function () {
            var l = this;
            l.filter((a ? 'textarea' : ':input') + '[placeholder]').not('.placeholder').bind({
                'focus.placeholder': b,
                'blur.placeholder': e
            }).data('placeholder-enabled', true).trigger('blur.placeholder');
            return l
        };
        j.input = a;
        j.textarea = d;
        k = {
            get: function (m) {
                var l = $(m);
                return l.data('placeholder-enabled') && l.hasClass('placeholder') ? '' : m.value
            },
            set: function (m, n) {
                var l = $(m);
                if (!l.data('placeholder-enabled')) {
                    return m.value = n
                }
                if (n == '') {
                    m.value = n;
                    if (m != h.activeElement) {
                        e.call(m)
                    }
                } else {
                    if (l.hasClass('placeholder')) {
                        b.call(m, true, n) || (m.value = n)
                    } else {
                        m.value = n
                    }
                }
                return l
            }
        };
        a || (c.input = k);
        d || (c.textarea = k);
        $(function () {
            $(h).delegate('form', 'submit.placeholder', function () {
                var l = $('.placeholder', this).each(b);
                setTimeout(function () {
                    l.each(e)
                }, 10)
            })
        });
        $(f).bind('beforeunload.placeholder', function () {
            $('.placeholder').each(function () {
                this.value = ''
            })
        })
    }

    function g(m) {
        var l = {}, n = /^jQuery\d+$/;
        $.each(m.attributes, function (p, o) {
            if (o.specified && !n.test(o.name)) {
                l[o.name] = o.value
            }
        });
        return l
    }

    function b(m, n) {
        var l = this,
            o = $(l);
        if (l.value == o.attr('placeholder') && o.hasClass('placeholder')) {
            if (o.data('placeholder-password')) {
                o = o.hide().next().show().attr('id', o.removeAttr('id').data('placeholder-id'));
                if (m === true) {
                    return o[0].value = n
                }
                o.focus()
            } else {
                l.value = '';
                o.removeClass('placeholder');
                l == h.activeElement && l.select()
            }
        }
    }

    function e() {
        var q, l = this,
            p = $(l),
            m = p,
            o = this.id;
        if (l.value == '') {
            if (l.type == 'password') {
                if (!p.data('placeholder-textinput')) {
                    try {
                        q = p.clone().attr({
                            type: 'text'
                        })
                    } catch (n) {
                        q = $('<input>').attr($.extend(g(this), {
                            type: 'text'
                        }))
                    }
                    q.removeAttr('name').data({
                        'placeholder-password': true,
                        'placeholder-id': o
                    }).bind('focus.placeholder', b);
                    p.data({
                        'placeholder-textinput': q,
                        'placeholder-id': o
                    }).before(q)
                }
                p = p.removeAttr('id').hide().prev().attr('id', o).show()
            }
            p.addClass('placeholder');
            p[0].value = p.attr('placeholder')
        } else {
            p.removeClass('placeholder')
        }
    }
}(this, document, jQuery));

/*GEFS*/

// init
$(document).ready(function () {
    $('input, textarea').placeholder();
});;

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
