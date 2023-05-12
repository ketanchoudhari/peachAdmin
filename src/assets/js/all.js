function _toConsumableArray(t) {
  if (Array.isArray(t)) {
      for (var e = 0, i = Array(t.length); e < t.length; e++)
          i[e] = t[e];
      return i
  }
  return Array.from(t)
}
!function(t, e) {
  "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.Popper = e()
}(this, function() {
  "use strict";
  function t(t) {
      return t && "[object Function]" === {}.toString.call(t)
  }
  function e(t, e) {
      if (1 !== t.nodeType)
          return [];
      var i = getComputedStyle(t, null);
      return e ? i[e] : i
  }
  function i(t) {
      return "HTML" === t.nodeName ? t : t.parentNode || t.host
  }
  function n(t) {
      if (!t)
          return document.body;
      switch (t.nodeName) {
      case "HTML":
      case "BODY":
          return t.ownerDocument.body;
      case "#document":
          return t.body
      }
      var r = e(t)
        , s = r.overflow
        , o = r.overflowX
        , a = r.overflowY;
      return /(auto|scroll)/.test(s + a + o) ? t : n(i(t))
  }
  function r(t) {
      var i = t && t.offsetParent
        , n = i && i.nodeName;
      return n && "BODY" !== n && "HTML" !== n ? -1 !== ["TD", "TABLE"].indexOf(i.nodeName) && "static" === e(i, "position") ? r(i) : i : t ? t.ownerDocument.documentElement : document.documentElement
  }
  function s(t) {
      return null === t.parentNode ? t : s(t.parentNode)
  }
  function o(t, e) {
      if (!(t && t.nodeType && e && e.nodeType))
          return document.documentElement;
      var i = t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING
        , n = i ? t : e
        , a = i ? e : t
        , l = document.createRange();
      l.setStart(n, 0),
      l.setEnd(a, 0);
      var u = l.commonAncestorContainer;
      if (t !== u && e !== u || n.contains(a))
          return function(t) {
              var e = t.nodeName;
              return "BODY" !== e && ("HTML" === e || r(t.firstElementChild) === t)
          }(u) ? u : r(u);
      var h = s(t);
      return h.host ? o(h.host, e) : o(t, s(e).host)
  }
  function a(t) {
      var e = "top" === (1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "top") ? "scrollTop" : "scrollLeft"
        , i = t.nodeName;
      if ("BODY" === i || "HTML" === i) {
          var n = t.ownerDocument.documentElement;
          return (t.ownerDocument.scrollingElement || n)[e]
      }
      return t[e]
  }
  function l(t, e) {
      var i = 2 < arguments.length && void 0 !== arguments[2] && arguments[2]
        , n = a(e, "top")
        , r = a(e, "left")
        , s = i ? -1 : 1;
      return t.top += n * s,
      t.bottom += n * s,
      t.left += r * s,
      t.right += r * s,
      t
  }
  function u(t, e) {
      var i = "x" === e ? "Left" : "Top"
        , n = "Left" == i ? "Right" : "Bottom";
      return parseFloat(t["border" + i + "Width"], 10) + parseFloat(t["border" + n + "Width"], 10)
  }
  function h(t, e, i, n) {
      return L(e["offset" + t], e["scroll" + t], i["client" + t], i["offset" + t], i["scroll" + t], B() ? i["offset" + t] + n["margin" + ("Height" === t ? "Top" : "Left")] + n["margin" + ("Height" === t ? "Bottom" : "Right")] : 0)
  }
  function c() {
      var t = document.body
        , e = document.documentElement
        , i = B() && getComputedStyle(e);
      return {
          height: h("Height", t, e, i),
          width: h("Width", t, e, i)
      }
  }
  function d(t) {
      return Y({}, t, {
          right: t.left + t.width,
          bottom: t.top + t.height
      })
  }
  function f(t) {
      var i = {};
      if (B())
          try {
              i = t.getBoundingClientRect();
              var n = a(t, "top")
                , r = a(t, "left");
              i.top += n,
              i.left += r,
              i.bottom += n,
              i.right += r
          } catch (t) {}
      else
          i = t.getBoundingClientRect();
      var s = {
          left: i.left,
          top: i.top,
          width: i.right - i.left,
          height: i.bottom - i.top
      }
        , o = "HTML" === t.nodeName ? c() : {}
        , l = o.width || t.clientWidth || s.right - s.left
        , h = o.height || t.clientHeight || s.bottom - s.top
        , f = t.offsetWidth - l
        , p = t.offsetHeight - h;
      if (f || p) {
          var m = e(t);
          f -= u(m, "x"),
          p -= u(m, "y"),
          s.width -= f,
          s.height -= p
      }
      return d(s)
  }
  function p(t, i) {
      var r = B()
        , s = "HTML" === i.nodeName
        , o = f(t)
        , a = f(i)
        , u = n(t)
        , h = e(i)
        , c = parseFloat(h.borderTopWidth, 10)
        , p = parseFloat(h.borderLeftWidth, 10)
        , m = d({
          top: o.top - a.top - c,
          left: o.left - a.left - p,
          width: o.width,
          height: o.height
      });
      if (m.marginTop = 0,
      m.marginLeft = 0,
      !r && s) {
          var g = parseFloat(h.marginTop, 10)
            , v = parseFloat(h.marginLeft, 10);
          m.top -= c - g,
          m.bottom -= c - g,
          m.left -= p - v,
          m.right -= p - v,
          m.marginTop = g,
          m.marginLeft = v
      }
      return (r ? i.contains(u) : i === u && "BODY" !== u.nodeName) && (m = l(m, i)),
      m
  }
  function m(t) {
      var e = t.ownerDocument.documentElement
        , i = p(t, e)
        , n = L(e.clientWidth, window.innerWidth || 0)
        , r = L(e.clientHeight, window.innerHeight || 0)
        , s = a(e)
        , o = a(e, "left");
      return d({
          top: s - i.top + i.marginTop,
          left: o - i.left + i.marginLeft,
          width: n,
          height: r
      })
  }
  function g(t) {
      var n = t.nodeName;
      return "BODY" !== n && "HTML" !== n && ("fixed" === e(t, "position") || g(i(t)))
  }
  function v(t, e, r, s) {
      var a = {
          top: 0,
          left: 0
      }
        , l = o(t, e);
      if ("viewport" === s)
          a = m(l);
      else {
          var u;
          "scrollParent" === s ? "BODY" === (u = n(i(e))).nodeName && (u = t.ownerDocument.documentElement) : u = "window" === s ? t.ownerDocument.documentElement : s;
          var h = p(u, l);
          if ("HTML" !== u.nodeName || g(l))
              a = h;
          else {
              var d = c()
                , f = d.height
                , v = d.width;
              a.top += h.top - h.marginTop,
              a.bottom = f + h.top,
              a.left += h.left - h.marginLeft,
              a.right = v + h.left
          }
      }
      return a.left += r,
      a.top += r,
      a.right -= r,
      a.bottom -= r,
      a
  }
  function _(t) {
      return t.width * t.height
  }
  function y(t, e, i, n, r) {
      var s = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 0;
      if (-1 === t.indexOf("auto"))
          return t;
      var o = v(i, n, s, r)
        , a = {
          top: {
              width: o.width,
              height: e.top - o.top
          },
          right: {
              width: o.right - e.right,
              height: o.height
          },
          bottom: {
              width: o.width,
              height: o.bottom - e.bottom
          },
          left: {
              width: e.left - o.left,
              height: o.height
          }
      }
        , l = Object.keys(a).map(function(t) {
          return Y({
              key: t
          }, a[t], {
              area: _(a[t])
          })
      }).sort(function(t, e) {
          return e.area - t.area
      })
        , u = l.filter(function(t) {
          var e = t.width
            , n = t.height;
          return e >= i.clientWidth && n >= i.clientHeight
      })
        , h = 0 < u.length ? u[0].key : l[0].key
        , c = t.split("-")[1];
      return h + (c ? "-" + c : "")
  }
  function b(t, e, i) {
      return p(i, o(e, i))
  }
  function w(t) {
      var e = getComputedStyle(t)
        , i = parseFloat(e.marginTop) + parseFloat(e.marginBottom)
        , n = parseFloat(e.marginLeft) + parseFloat(e.marginRight);
      return {
          width: t.offsetWidth + n,
          height: t.offsetHeight + i
      }
  }
  function E(t) {
      var e = {
          left: "right",
          right: "left",
          bottom: "top",
          top: "bottom"
      };
      return t.replace(/left|right|bottom|top/g, function(t) {
          return e[t]
      })
  }
  function C(t, e, i) {
      i = i.split("-")[0];
      var n = w(t)
        , r = {
          width: n.width,
          height: n.height
      }
        , s = -1 !== ["right", "left"].indexOf(i)
        , o = s ? "top" : "left"
        , a = s ? "left" : "top"
        , l = s ? "height" : "width"
        , u = s ? "width" : "height";
      return r[o] = e[o] + e[l] / 2 - n[l] / 2,
      r[a] = i === a ? e[a] - n[u] : e[E(a)],
      r
  }
  function T(t, e) {
      return Array.prototype.find ? t.find(e) : t.filter(e)[0]
  }
  function A(e, i, n) {
      return (void 0 === n ? e : e.slice(0, function(t, e, i) {
          if (Array.prototype.findIndex)
              return t.findIndex(function(t) {
                  return t[e] === i
              });
          var n = T(t, function(t) {
              return t[e] === i
          });
          return t.indexOf(n)
      }(e, "name", n))).forEach(function(e) {
          e.function && console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
          var n = e.function || e.fn;
          e.enabled && t(n) && (i.offsets.popper = d(i.offsets.popper),
          i.offsets.reference = d(i.offsets.reference),
          i = n(i, e))
      }),
      i
  }
  function I(t, e) {
      return t.some(function(t) {
          var i = t.name;
          return t.enabled && i === e
      })
  }
  function D(t) {
      for (var e = [!1, "ms", "Webkit", "Moz", "O"], i = t.charAt(0).toUpperCase() + t.slice(1), n = 0; n < e.length - 1; n++) {
          var r = e[n]
            , s = r ? "" + r + i : t;
          if (void 0 !== document.body.style[s])
              return s
      }
      return null
  }
  function S(t) {
      var e = t.ownerDocument;
      return e ? e.defaultView : window
  }
  function O(t, e, i, r) {
      i.updateBound = r,
      S(t).addEventListener("resize", i.updateBound, {
          passive: !0
      });
      var s = n(t);
      return function t(e, i, r, s) {
          var o = "BODY" === e.nodeName
            , a = o ? e.ownerDocument.defaultView : e;
          a.addEventListener(i, r, {
              passive: !0
          }),
          o || t(n(a.parentNode), i, r, s),
          s.push(a)
      }(s, "scroll", i.updateBound, i.scrollParents),
      i.scrollElement = s,
      i.eventsEnabled = !0,
      i
  }
  function N() {
      var t, e;
      this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate),
      this.state = (t = this.reference,
      e = this.state,
      S(t).removeEventListener("resize", e.updateBound),
      e.scrollParents.forEach(function(t) {
          t.removeEventListener("scroll", e.updateBound)
      }),
      e.updateBound = null,
      e.scrollParents = [],
      e.scrollElement = null,
      e.eventsEnabled = !1,
      e))
  }
  function F(t) {
      return "" !== t && !isNaN(parseFloat(t)) && isFinite(t)
  }
  function P(t, e) {
      Object.keys(e).forEach(function(i) {
          var n = "";
          -1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(i) && F(e[i]) && (n = "px"),
          t.style[i] = e[i] + n
      })
  }
  function k(t, e, i) {
      var n = T(t, function(t) {
          return t.name === e
      })
        , r = !!n && t.some(function(t) {
          return t.name === i && t.enabled && t.order < n.order
      });
      if (!r) {
          var s = "`" + e + "`";
          console.warn("`" + i + "` modifier is required by " + s + " modifier in order to work, be sure to include it before " + s + "!")
      }
      return r
  }
  function x(t) {
      var e = 1 < arguments.length && void 0 !== arguments[1] && arguments[1]
        , i = Z.indexOf(t)
        , n = Z.slice(i + 1).concat(Z.slice(0, i));
      return e ? n.reverse() : n
  }
  function R(t, e, i, n) {
      var r = [0, 0]
        , s = -1 !== ["right", "left"].indexOf(n)
        , o = t.split(/(\+|\-)/).map(function(t) {
          return t.trim()
      })
        , a = o.indexOf(T(o, function(t) {
          return -1 !== t.search(/,|\s/)
      }));
      o[a] && -1 === o[a].indexOf(",") && console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");
      var l = /\s*,\s*|\s+/
        , u = -1 === a ? [o] : [o.slice(0, a).concat([o[a].split(l)[0]]), [o[a].split(l)[1]].concat(o.slice(a + 1))];
      return (u = u.map(function(t, n) {
          var r = (1 === n ? !s : s) ? "height" : "width"
            , o = !1;
          return t.reduce(function(t, e) {
              return "" === t[t.length - 1] && -1 !== ["+", "-"].indexOf(e) ? (t[t.length - 1] = e,
              o = !0,
              t) : o ? (t[t.length - 1] += e,
              o = !1,
              t) : t.concat(e)
          }, []).map(function(t) {
              return function(t, e, i, n) {
                  var r = t.match(/((?:\-|\+)?\d*\.?\d*)(.*)/)
                    , s = +r[1]
                    , o = r[2];
                  if (!s)
                      return t;
                  if (0 === o.indexOf("%")) {
                      var a;
                      switch (o) {
                      case "%p":
                          a = i;
                          break;
                      case "%":
                      case "%r":
                      default:
                          a = n
                      }
                      return d(a)[e] / 100 * s
                  }
                  return "vh" === o || "vw" === o ? ("vh" === o ? L(document.documentElement.clientHeight, window.innerHeight || 0) : L(document.documentElement.clientWidth, window.innerWidth || 0)) / 100 * s : s
              }(t, r, e, i)
          })
      })).forEach(function(t, e) {
          t.forEach(function(i, n) {
              F(i) && (r[e] += i * ("-" === t[n - 1] ? -1 : 1))
          })
      }),
      r
  }
  for (var j = Math.min, M = Math.floor, L = Math.max, V = "undefined" != typeof window && "undefined" != typeof document, H = ["Edge", "Trident", "Firefox"], W = 0, U = 0; U < H.length; U += 1)
      if (V && 0 <= navigator.userAgent.indexOf(H[U])) {
          W = 1;
          break
      }
  var $, q = V && window.Promise ? function(t) {
      var e = !1;
      return function() {
          e || (e = !0,
          window.Promise.resolve().then(function() {
              e = !1,
              t()
          }))
      }
  }
  : function(t) {
      var e = !1;
      return function() {
          e || (e = !0,
          setTimeout(function() {
              e = !1,
              t()
          }, W))
      }
  }
  , B = function() {
      return null == $ && ($ = -1 !== navigator.appVersion.indexOf("MSIE 10")),
      $
  }, K = function(t, e) {
      if (!(t instanceof e))
          throw new TypeError("Cannot call a class as a function")
  }, z = function() {
      function t(t, e) {
          for (var i, n = 0; n < e.length; n++)
              (i = e[n]).enumerable = i.enumerable || !1,
              i.configurable = !0,
              "value"in i && (i.writable = !0),
              Object.defineProperty(t, i.key, i)
      }
      return function(e, i, n) {
          return i && t(e.prototype, i),
          n && t(e, n),
          e
      }
  }(), Q = function(t, e, i) {
      return e in t ? Object.defineProperty(t, e, {
          value: i,
          enumerable: !0,
          configurable: !0,
          writable: !0
      }) : t[e] = i,
      t
  }, Y = Object.assign || function(t) {
      for (var e, i = 1; i < arguments.length; i++)
          for (var n in e = arguments[i])
              Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
      return t
  }
  , G = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start"], Z = G.slice(3), J = "flip", X = "clockwise", tt = "counterclockwise", et = function() {
      function e(i, n) {
          var r = this
            , s = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
          K(this, e),
          this.scheduleUpdate = function() {
              return requestAnimationFrame(r.update)
          }
          ,
          this.update = q(this.update.bind(this)),
          this.options = Y({}, e.Defaults, s),
          this.state = {
              isDestroyed: !1,
              isCreated: !1,
              scrollParents: []
          },
          this.reference = i && i.jquery ? i[0] : i,
          this.popper = n && n.jquery ? n[0] : n,
          this.options.modifiers = {},
          Object.keys(Y({}, e.Defaults.modifiers, s.modifiers)).forEach(function(t) {
              r.options.modifiers[t] = Y({}, e.Defaults.modifiers[t] || {}, s.modifiers ? s.modifiers[t] : {})
          }),
          this.modifiers = Object.keys(this.options.modifiers).map(function(t) {
              return Y({
                  name: t
              }, r.options.modifiers[t])
          }).sort(function(t, e) {
              return t.order - e.order
          }),
          this.modifiers.forEach(function(e) {
              e.enabled && t(e.onLoad) && e.onLoad(r.reference, r.popper, r.options, e, r.state)
          }),
          this.update();
          var o = this.options.eventsEnabled;
          o && this.enableEventListeners(),
          this.state.eventsEnabled = o
      }
      return z(e, [{
          key: "update",
          value: function() {
              return function() {
                  if (!this.state.isDestroyed) {
                      var t = {
                          instance: this,
                          styles: {},
                          arrowStyles: {},
                          attributes: {},
                          flipped: !1,
                          offsets: {}
                      };
                      t.offsets.reference = b(this.state, this.popper, this.reference),
                      t.placement = y(this.options.placement, t.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding),
                      t.originalPlacement = t.placement,
                      t.offsets.popper = C(this.popper, t.offsets.reference, t.placement),
                      t.offsets.popper.position = "absolute",
                      t = A(this.modifiers, t),
                      this.state.isCreated ? this.options.onUpdate(t) : (this.state.isCreated = !0,
                      this.options.onCreate(t))
                  }
              }
              .call(this)
          }
      }, {
          key: "destroy",
          value: function() {
              return function() {
                  return this.state.isDestroyed = !0,
                  I(this.modifiers, "applyStyle") && (this.popper.removeAttribute("x-placement"),
                  this.popper.style.left = "",
                  this.popper.style.position = "",
                  this.popper.style.top = "",
                  this.popper.style[D("transform")] = ""),
                  this.disableEventListeners(),
                  this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper),
                  this
              }
              .call(this)
          }
      }, {
          key: "enableEventListeners",
          value: function() {
              return function() {
                  this.state.eventsEnabled || (this.state = O(this.reference, this.options, this.state, this.scheduleUpdate))
              }
              .call(this)
          }
      }, {
          key: "disableEventListeners",
          value: function() {
              return N.call(this)
          }
      }]),
      e
  }();
  return et.Utils = ("undefined" == typeof window ? global : window).PopperUtils,
  et.placements = G,
  et.Defaults = {
      placement: "bottom",
      eventsEnabled: !0,
      removeOnDestroy: !1,
      onCreate: function() {},
      onUpdate: function() {},
      modifiers: {
          shift: {
              order: 100,
              enabled: !0,
              fn: function(t) {
                  var e = t.placement
                    , i = e.split("-")[0]
                    , n = e.split("-")[1];
                  if (n) {
                      var r = t.offsets
                        , s = r.reference
                        , o = r.popper
                        , a = -1 !== ["bottom", "top"].indexOf(i)
                        , l = a ? "left" : "top"
                        , u = a ? "width" : "height"
                        , h = {
                          start: Q({}, l, s[l]),
                          end: Q({}, l, s[l] + s[u] - o[u])
                      };
                      t.offsets.popper = Y({}, o, h[n])
                  }
                  return t
              }
          },
          offset: {
              order: 200,
              enabled: !0,
              fn: function(t, e) {
                  var i, n = e.offset, r = t.placement, s = t.offsets, o = s.popper, a = s.reference, l = r.split("-")[0];
                  return i = F(+n) ? [+n, 0] : R(n, o, a, l),
                  "left" === l ? (o.top += i[0],
                  o.left -= i[1]) : "right" === l ? (o.top += i[0],
                  o.left += i[1]) : "top" === l ? (o.left += i[0],
                  o.top -= i[1]) : "bottom" === l && (o.left += i[0],
                  o.top += i[1]),
                  t.popper = o,
                  t
              },
              offset: 0
          },
          preventOverflow: {
              order: 300,
              enabled: !0,
              fn: function(t, e) {
                  var i = e.boundariesElement || r(t.instance.popper);
                  t.instance.reference === i && (i = r(i));
                  var n = v(t.instance.popper, t.instance.reference, e.padding, i);
                  e.boundaries = n;
                  var s = e.priority
                    , o = t.offsets.popper
                    , a = {
                      primary: function(t) {
                          var i = o[t];
                          return o[t] < n[t] && !e.escapeWithReference && (i = L(o[t], n[t])),
                          Q({}, t, i)
                      },
                      secondary: function(t) {
                          var i = "right" === t ? "left" : "top"
                            , r = o[i];
                          return o[t] > n[t] && !e.escapeWithReference && (r = j(o[i], n[t] - ("right" === t ? o.width : o.height))),
                          Q({}, i, r)
                      }
                  };
                  return s.forEach(function(t) {
                      var e = -1 === ["left", "top"].indexOf(t) ? "secondary" : "primary";
                      o = Y({}, o, a[e](t))
                  }),
                  t.offsets.popper = o,
                  t
              },
              priority: ["left", "right", "top", "bottom"],
              padding: 5,
              boundariesElement: "scrollParent"
          },
          keepTogether: {
              order: 400,
              enabled: !0,
              fn: function(t) {
                  var e = t.offsets
                    , i = e.popper
                    , n = e.reference
                    , r = t.placement.split("-")[0]
                    , s = M
                    , o = -1 !== ["top", "bottom"].indexOf(r)
                    , a = o ? "right" : "bottom"
                    , l = o ? "left" : "top"
                    , u = o ? "width" : "height";
                  return i[a] < s(n[l]) && (t.offsets.popper[l] = s(n[l]) - i[u]),
                  i[l] > s(n[a]) && (t.offsets.popper[l] = s(n[a])),
                  t
              }
          },
          arrow: {
              order: 500,
              enabled: !0,
              fn: function(t, i) {
                  var n;
                  if (!k(t.instance.modifiers, "arrow", "keepTogether"))
                      return t;
                  var r = i.element;
                  if ("string" == typeof r) {
                      if (!(r = t.instance.popper.querySelector(r)))
                          return t
                  } else if (!t.instance.popper.contains(r))
                      return console.warn("WARNING: `arrow.element` must be child of its popper element!"),
                      t;
                  var s = t.placement.split("-")[0]
                    , o = t.offsets
                    , a = o.popper
                    , l = o.reference
                    , u = -1 !== ["left", "right"].indexOf(s)
                    , h = u ? "height" : "width"
                    , c = u ? "Top" : "Left"
                    , f = c.toLowerCase()
                    , p = u ? "left" : "top"
                    , m = u ? "bottom" : "right"
                    , g = w(r)[h];
                  l[m] - g < a[f] && (t.offsets.popper[f] -= a[f] - (l[m] - g)),
                  l[f] + g > a[m] && (t.offsets.popper[f] += l[f] + g - a[m]),
                  t.offsets.popper = d(t.offsets.popper);
                  var v = l[f] + l[h] / 2 - g / 2
                    , _ = e(t.instance.popper)
                    , y = parseFloat(_["margin" + c], 10)
                    , b = parseFloat(_["border" + c + "Width"], 10)
                    , E = v - t.offsets.popper[f] - y - b;
                  return E = L(j(a[h] - g, E), 0),
                  t.arrowElement = r,
                  t.offsets.arrow = (Q(n = {}, f, Math.round(E)),
                  Q(n, p, ""),
                  n),
                  t
              },
              element: "[x-arrow]"
          },
          flip: {
              order: 600,
              enabled: !0,
              fn: function(t, e) {
                  if (I(t.instance.modifiers, "inner"))
                      return t;
                  if (t.flipped && t.placement === t.originalPlacement)
                      return t;
                  var i = v(t.instance.popper, t.instance.reference, e.padding, e.boundariesElement)
                    , n = t.placement.split("-")[0]
                    , r = E(n)
                    , s = t.placement.split("-")[1] || ""
                    , o = [];
                  switch (e.behavior) {
                  case J:
                      o = [n, r];
                      break;
                  case X:
                      o = x(n);
                      break;
                  case tt:
                      o = x(n, !0);
                      break;
                  default:
                      o = e.behavior
                  }
                  return o.forEach(function(a, l) {
                      if (n !== a || o.length === l + 1)
                          return t;
                      n = t.placement.split("-")[0],
                      r = E(n);
                      var u = t.offsets.popper
                        , h = t.offsets.reference
                        , c = M
                        , d = "left" === n && c(u.right) > c(h.left) || "right" === n && c(u.left) < c(h.right) || "top" === n && c(u.bottom) > c(h.top) || "bottom" === n && c(u.top) < c(h.bottom)
                        , f = c(u.left) < c(i.left)
                        , p = c(u.right) > c(i.right)
                        , m = c(u.top) < c(i.top)
                        , g = c(u.bottom) > c(i.bottom)
                        , v = "left" === n && f || "right" === n && p || "top" === n && m || "bottom" === n && g
                        , _ = -1 !== ["top", "bottom"].indexOf(n)
                        , y = !!e.flipVariations && (_ && "start" === s && f || _ && "end" === s && p || !_ && "start" === s && m || !_ && "end" === s && g);
                      (d || v || y) && (t.flipped = !0,
                      (d || v) && (n = o[l + 1]),
                      y && (s = function(t) {
                          return "end" === t ? "start" : "start" === t ? "end" : t
                      }(s)),
                      t.placement = n + (s ? "-" + s : ""),
                      t.offsets.popper = Y({}, t.offsets.popper, C(t.instance.popper, t.offsets.reference, t.placement)),
                      t = A(t.instance.modifiers, t, "flip"))
                  }),
                  t
              },
              behavior: "flip",
              padding: 5,
              boundariesElement: "viewport"
          },
          inner: {
              order: 700,
              enabled: !1,
              fn: function(t) {
                  var e = t.placement
                    , i = e.split("-")[0]
                    , n = t.offsets
                    , r = n.popper
                    , s = n.reference
                    , o = -1 !== ["left", "right"].indexOf(i)
                    , a = -1 === ["top", "left"].indexOf(i);
                  return r[o ? "left" : "top"] = s[i] - (a ? r[o ? "width" : "height"] : 0),
                  t.placement = E(e),
                  t.offsets.popper = d(r),
                  t
              }
          },
          hide: {
              order: 800,
              enabled: !0,
              fn: function(t) {
                  if (!k(t.instance.modifiers, "hide", "preventOverflow"))
                      return t;
                  var e = t.offsets.reference
                    , i = T(t.instance.modifiers, function(t) {
                      return "preventOverflow" === t.name
                  }).boundaries;
                  if (e.bottom < i.top || e.left > i.right || e.top > i.bottom || e.right < i.left) {
                      if (!0 === t.hide)
                          return t;
                      t.hide = !0,
                      t.attributes["x-out-of-boundaries"] = ""
                  } else {
                      if (!1 === t.hide)
                          return t;
                      t.hide = !1,
                      t.attributes["x-out-of-boundaries"] = !1
                  }
                  return t
              }
          },
          computeStyle: {
              order: 850,
              enabled: !0,
              fn: function(t, e) {
                  var i = e.x
                    , n = e.y
                    , s = t.offsets.popper
                    , o = T(t.instance.modifiers, function(t) {
                      return "applyStyle" === t.name
                  }).gpuAcceleration;
                  void 0 !== o && console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");
                  var a, l, u = void 0 === o ? e.gpuAcceleration : o, h = f(r(t.instance.popper)), c = {
                      position: s.position
                  }, d = {
                      left: M(s.left),
                      top: M(s.top),
                      bottom: M(s.bottom),
                      right: M(s.right)
                  }, p = "bottom" === i ? "top" : "bottom", m = "right" === n ? "left" : "right", g = D("transform");
                  if (l = "bottom" == p ? -h.height + d.bottom : d.top,
                  a = "right" == m ? -h.width + d.right : d.left,
                  u && g)
                      c[g] = "translate3d(" + a + "px, " + l + "px, 0)",
                      c[p] = 0,
                      c[m] = 0,
                      c.willChange = "transform";
                  else {
                      var v = "bottom" == p ? -1 : 1
                        , _ = "right" == m ? -1 : 1;
                      c[p] = l * v,
                      c[m] = a * _,
                      c.willChange = p + ", " + m
                  }
                  var y = {
                      "x-placement": t.placement
                  };
                  return t.attributes = Y({}, y, t.attributes),
                  t.styles = Y({}, c, t.styles),
                  t.arrowStyles = Y({}, t.offsets.arrow, t.arrowStyles),
                  t
              },
              gpuAcceleration: !0,
              x: "bottom",
              y: "right"
          },
          applyStyle: {
              order: 900,
              enabled: !0,
              fn: function(t) {
                  return P(t.instance.popper, t.styles),
                  function(t, e) {
                      Object.keys(e).forEach(function(i) {
                          !1 === e[i] ? t.removeAttribute(i) : t.setAttribute(i, e[i])
                      })
                  }(t.instance.popper, t.attributes),
                  t.arrowElement && Object.keys(t.arrowStyles).length && P(t.arrowElement, t.arrowStyles),
                  t
              },
              onLoad: function(t, e, i, n, r) {
                  var s = b(0, e, t)
                    , o = y(i.placement, s, e, t, i.modifiers.flip.boundariesElement, i.modifiers.flip.padding);
                  return e.setAttribute("x-placement", o),
                  P(e, {
                      position: "absolute"
                  }),
                  i
              },
              gpuAcceleration: void 0
          }
      }
  },
  et
}),
function(t, e) {
  "object" == typeof exports && "undefined" != typeof module ? e(exports, require("jquery"), require("popper.js")) : "function" == typeof define && define.amd ? define(["exports", "jquery", "popper.js"], e) : e(t.bootstrap = {}, t.jQuery, t.Popper)
}(this, function(t, e, i) {
  "use strict";
  function n(t, e) {
      for (var i = 0; i < e.length; i++) {
          var n = e[i];
          n.enumerable = n.enumerable || !1,
          n.configurable = !0,
          "value"in n && (n.writable = !0),
          Object.defineProperty(t, n.key, n)
      }
  }
  function r(t, e, i) {
      return e && n(t.prototype, e),
      i && n(t, i),
      t
  }
  function s(t) {
      for (var e = 1; e < arguments.length; e++) {
          var i = null != arguments[e] ? arguments[e] : {}
            , n = Object.keys(i);
          "function" == typeof Object.getOwnPropertySymbols && (n = n.concat(Object.getOwnPropertySymbols(i).filter(function(t) {
              return Object.getOwnPropertyDescriptor(i, t).enumerable
          }))),
          n.forEach(function(e) {
              var n, r, s;
              n = t,
              s = i[r = e],
              r in n ? Object.defineProperty(n, r, {
                  value: s,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0
              }) : n[r] = s
          })
      }
      return t
  }
  e = e && e.hasOwnProperty("default") ? e.default : e,
  i = i && i.hasOwnProperty("default") ? i.default : i;
  var o, a, l, u, h, c, d, f, p, m, g, v, _, y, b, w, E, C, T, A, I, D, S, O, N, F, P, k, x, R, j, M, L, V, H, W, U, $, q, B, K, z, Q, Y, G, Z, J, X, tt, et, it, nt, rt, st, ot, at, lt, ut, ht, ct, dt, ft, pt, mt, gt, vt, _t, yt, bt, wt, Et, Ct, Tt, At, It, Dt, St, Ot, Nt, Ft, Pt, kt, xt, Rt, jt, Mt, Lt, Vt, Ht, Wt, Ut, $t, qt, Bt, Kt, zt, Qt, Yt, Gt, Zt, Jt, Xt, te, ee, ie, ne, re, se, oe, ae, le, ue, he, ce, de, fe, pe, me, ge, ve, _e, ye, be, we, Ee = function(t) {
      var e = "transitionend";
      var i = {
          TRANSITION_END: "bsTransitionEnd",
          getUID: function(t) {
              for (; t += ~~(1e6 * Math.random()),
              document.getElementById(t); )
                  ;
              return t
          },
          getSelectorFromElement: function(e) {
              var i = e.getAttribute("data-target");
              i && "#" !== i || (i = e.getAttribute("href") || "");
              try {
                  return 0 < t(document).find(i).length ? i : null
              } catch (e) {
                  return null
              }
          },
          getTransitionDurationFromElement: function(e) {
              if (!e)
                  return 0;
              var i = t(e).css("transition-duration");
              return parseFloat(i) ? (i = i.split(",")[0],
              1e3 * parseFloat(i)) : 0
          },
          reflow: function(t) {
              return t.offsetHeight
          },
          triggerTransitionEnd: function(i) {
              t(i).trigger(e)
          },
          supportsTransitionEnd: function() {
              return Boolean(e)
          },
          isElement: function(t) {
              return (t[0] || t).nodeType
          },
          typeCheckConfig: function(t, e, n) {
              for (var r in n)
                  if (Object.prototype.hasOwnProperty.call(n, r)) {
                      var s = n[r]
                        , o = e[r]
                        , a = o && i.isElement(o) ? "element" : (l = o,
                      {}.toString.call(l).match(/\s([a-z]+)/i)[1].toLowerCase());
                      if (!new RegExp(s).test(a))
                          throw new Error(t.toUpperCase() + ': Option "' + r + '" provided type "' + a + '" but expected type "' + s + '".')
                  }
              var l
          }
      };
      return t.fn.emulateTransitionEnd = function(e) {
          var n = this
            , r = !1;
          return t(this).one(i.TRANSITION_END, function() {
              r = !0
          }),
          setTimeout(function() {
              r || i.triggerTransitionEnd(n)
          }, e),
          this
      }
      ,
      t.event.special[i.TRANSITION_END] = {
          bindType: e,
          delegateType: e,
          handle: function(e) {
              if (t(e.target).is(this))
                  return e.handleObj.handler.apply(this, arguments)
          }
      },
      i
  }(e), Ce = (a = "alert",
  u = "." + (l = "bs.alert"),
  h = (o = e).fn[a],
  c = {
      CLOSE: "close" + u,
      CLOSED: "closed" + u,
      CLICK_DATA_API: "click" + u + ".data-api"
  },
  "alert",
  "fade",
  "show",
  d = function() {
      function t(t) {
          this._element = t
      }
      var e = t.prototype;
      return e.close = function(t) {
          t = t || this._element;
          var e = this._getRootElement(t);
          this._triggerCloseEvent(e).isDefaultPrevented() || this._removeElement(e)
      }
      ,
      e.dispose = function() {
          o.removeData(this._element, l),
          this._element = null
      }
      ,
      e._getRootElement = function(t) {
          var e = Ee.getSelectorFromElement(t)
            , i = !1;
          return e && (i = o(e)[0]),
          i || (i = o(t).closest(".alert")[0]),
          i
      }
      ,
      e._triggerCloseEvent = function(t) {
          var e = o.Event(c.CLOSE);
          return o(t).trigger(e),
          e
      }
      ,
      e._removeElement = function(t) {
          var e = this;
          if (o(t).removeClass("show"),
          o(t).hasClass("fade")) {
              var i = Ee.getTransitionDurationFromElement(t);
              o(t).one(Ee.TRANSITION_END, function(i) {
                  return e._destroyElement(t, i)
              }).emulateTransitionEnd(i)
          } else
              this._destroyElement(t)
      }
      ,
      e._destroyElement = function(t) {
          o(t).detach().trigger(c.CLOSED).remove()
      }
      ,
      t._jQueryInterface = function(e) {
          return this.each(function() {
              var i = o(this)
                , n = i.data(l);
              n || (n = new t(this),
              i.data(l, n)),
              "close" === e && n[e](this)
          })
      }
      ,
      t._handleDismiss = function(t) {
          return function(e) {
              e && e.preventDefault(),
              t.close(this)
          }
      }
      ,
      r(t, null, [{
          key: "VERSION",
          get: function() {
              return "4.1.0"
          }
      }]),
      t
  }(),
  o(document).on(c.CLICK_DATA_API, '[data-dismiss="alert"]', d._handleDismiss(new d)),
  o.fn[a] = d._jQueryInterface,
  o.fn[a].Constructor = d,
  o.fn[a].noConflict = function() {
      return o.fn[a] = h,
      d._jQueryInterface
  }
  ,
  d), Te = (p = "button",
  g = "." + (m = "bs.button"),
  v = ".data-api",
  _ = (f = e).fn[p],
  y = "active",
  "btn",
  b = '[data-toggle^="button"]',
  '[data-toggle="buttons"]',
  "input",
  ".active",
  w = ".btn",
  E = {
      CLICK_DATA_API: "click" + g + v,
      FOCUS_BLUR_DATA_API: "focus" + g + v + " blur" + g + v
  },
  C = function() {
      function t(t) {
          this._element = t
      }
      var e = t.prototype;
      return e.toggle = function() {
          var t = !0
            , e = !0
            , i = f(this._element).closest('[data-toggle="buttons"]')[0];
          if (i) {
              var n = f(this._element).find("input")[0];
              if (n) {
                  if ("radio" === n.type)
                      if (n.checked && f(this._element).hasClass(y))
                          t = !1;
                      else {
                          var r = f(i).find(".active")[0];
                          r && f(r).removeClass(y)
                      }
                  if (t) {
                      if (n.hasAttribute("disabled") || i.hasAttribute("disabled") || n.classList.contains("disabled") || i.classList.contains("disabled"))
                          return;
                      n.checked = !f(this._element).hasClass(y),
                      f(n).trigger("change")
                  }
                  n.focus(),
                  e = !1
              }
          }
          e && this._element.setAttribute("aria-pressed", !f(this._element).hasClass(y)),
          t && f(this._element).toggleClass(y)
      }
      ,
      e.dispose = function() {
          f.removeData(this._element, m),
          this._element = null
      }
      ,
      t._jQueryInterface = function(e) {
          return this.each(function() {
              var i = f(this).data(m);
              i || (i = new t(this),
              f(this).data(m, i)),
              "toggle" === e && i[e]()
          })
      }
      ,
      r(t, null, [{
          key: "VERSION",
          get: function() {
              return "4.1.0"
          }
      }]),
      t
  }(),
  f(document).on(E.CLICK_DATA_API, b, function(t) {
      t.preventDefault();
      var e = t.target;
      f(e).hasClass("btn") || (e = f(e).closest(w)),
      C._jQueryInterface.call(f(e), "toggle")
  }).on(E.FOCUS_BLUR_DATA_API, b, function(t) {
      var e = f(t.target).closest(w)[0];
      f(e).toggleClass("focus", /^focus(in)?$/.test(t.type))
  }),
  f.fn[p] = C._jQueryInterface,
  f.fn[p].Constructor = C,
  f.fn[p].noConflict = function() {
      return f.fn[p] = _,
      C._jQueryInterface
  }
  ,
  C), Ae = (A = "carousel",
  D = "." + (I = "bs.carousel"),
  S = ".data-api",
  O = (T = e).fn[A],
  N = {
      interval: 5e3,
      keyboard: !0,
      slide: !1,
      pause: "hover",
      wrap: !0
  },
  F = {
      interval: "(number|boolean)",
      keyboard: "boolean",
      slide: "(boolean|string)",
      pause: "(string|boolean)",
      wrap: "boolean"
  },
  P = "next",
  k = "prev",
  "left",
  "right",
  x = {
      SLIDE: "slide" + D,
      SLID: "slid" + D,
      KEYDOWN: "keydown" + D,
      MOUSEENTER: "mouseenter" + D,
      MOUSELEAVE: "mouseleave" + D,
      TOUCHEND: "touchend" + D,
      LOAD_DATA_API: "load" + D + S,
      CLICK_DATA_API: "click" + D + S
  },
  "carousel",
  R = "active",
  "slide",
  "carousel-item-right",
  "carousel-item-left",
  "carousel-item-next",
  "carousel-item-prev",
  j = {
      ACTIVE: ".active",
      ACTIVE_ITEM: ".active.carousel-item",
      ITEM: ".carousel-item",
      NEXT_PREV: ".carousel-item-next, .carousel-item-prev",
      INDICATORS: ".carousel-indicators",
      DATA_SLIDE: "[data-slide], [data-slide-to]",
      DATA_RIDE: '[data-ride="carousel"]'
  },
  M = function() {
      function t(t, e) {
          this._items = null,
          this._interval = null,
          this._activeElement = null,
          this._isPaused = !1,
          this._isSliding = !1,
          this.touchTimeout = null,
          this._config = this._getConfig(e),
          this._element = T(t)[0],
          this._indicatorsElement = T(this._element).find(j.INDICATORS)[0],
          this._addEventListeners()
      }
      var e = t.prototype;
      return e.next = function() {
          this._isSliding || this._slide(P)
      }
      ,
      e.nextWhenVisible = function() {
          !document.hidden && T(this._element).is(":visible") && "hidden" !== T(this._element).css("visibility") && this.next()
      }
      ,
      e.prev = function() {
          this._isSliding || this._slide(k)
      }
      ,
      e.pause = function(t) {
          t || (this._isPaused = !0),
          T(this._element).find(j.NEXT_PREV)[0] && (Ee.triggerTransitionEnd(this._element),
          this.cycle(!0)),
          clearInterval(this._interval),
          this._interval = null
      }
      ,
      e.cycle = function(t) {
          t || (this._isPaused = !1),
          this._interval && (clearInterval(this._interval),
          this._interval = null),
          this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval))
      }
      ,
      e.to = function(t) {
          var e = this;
          this._activeElement = T(this._element).find(j.ACTIVE_ITEM)[0];
          var i = this._getItemIndex(this._activeElement);
          if (!(t > this._items.length - 1 || t < 0))
              if (this._isSliding)
                  T(this._element).one(x.SLID, function() {
                      return e.to(t)
                  });
              else {
                  if (i === t)
                      return this.pause(),
                      void this.cycle();
                  var n = i < t ? P : k;
                  this._slide(n, this._items[t])
              }
      }
      ,
      e.dispose = function() {
          T(this._element).off(D),
          T.removeData(this._element, I),
          this._items = null,
          this._config = null,
          this._element = null,
          this._interval = null,
          this._isPaused = null,
          this._isSliding = null,
          this._activeElement = null,
          this._indicatorsElement = null
      }
      ,
      e._getConfig = function(t) {
          return t = s({}, N, t),
          Ee.typeCheckConfig(A, t, F),
          t
      }
      ,
      e._addEventListeners = function() {
          var t = this;
          this._config.keyboard && T(this._element).on(x.KEYDOWN, function(e) {
              return t._keydown(e)
          }),
          "hover" === this._config.pause && (T(this._element).on(x.MOUSEENTER, function(e) {
              return t.pause(e)
          }).on(x.MOUSELEAVE, function(e) {
              return t.cycle(e)
          }),
          "ontouchstart"in document.documentElement && T(this._element).on(x.TOUCHEND, function() {
              t.pause(),
              t.touchTimeout && clearTimeout(t.touchTimeout),
              t.touchTimeout = setTimeout(function(e) {
                  return t.cycle(e)
              }, 500 + t._config.interval)
          }))
      }
      ,
      e._keydown = function(t) {
          if (!/input|textarea/i.test(t.target.tagName))
              switch (t.which) {
              case 37:
                  t.preventDefault(),
                  this.prev();
                  break;
              case 39:
                  t.preventDefault(),
                  this.next()
              }
      }
      ,
      e._getItemIndex = function(t) {
          return this._items = T.makeArray(T(t).parent().find(j.ITEM)),
          this._items.indexOf(t)
      }
      ,
      e._getItemByDirection = function(t, e) {
          var i = t === P
            , n = t === k
            , r = this._getItemIndex(e)
            , s = this._items.length - 1;
          if ((n && 0 === r || i && r === s) && !this._config.wrap)
              return e;
          var o = (r + (t === k ? -1 : 1)) % this._items.length;
          return -1 === o ? this._items[this._items.length - 1] : this._items[o]
      }
      ,
      e._triggerSlideEvent = function(t, e) {
          var i = this._getItemIndex(t)
            , n = this._getItemIndex(T(this._element).find(j.ACTIVE_ITEM)[0])
            , r = T.Event(x.SLIDE, {
              relatedTarget: t,
              direction: e,
              from: n,
              to: i
          });
          return T(this._element).trigger(r),
          r
      }
      ,
      e._setActiveIndicatorElement = function(t) {
          if (this._indicatorsElement) {
              T(this._indicatorsElement).find(j.ACTIVE).removeClass(R);
              var e = this._indicatorsElement.children[this._getItemIndex(t)];
              e && T(e).addClass(R)
          }
      }
      ,
      e._slide = function(t, e) {
          var i, n, r, s = this, o = T(this._element).find(j.ACTIVE_ITEM)[0], a = this._getItemIndex(o), l = e || o && this._getItemByDirection(t, o), u = this._getItemIndex(l), h = Boolean(this._interval);
          if (t === P ? (i = "carousel-item-left",
          n = "carousel-item-next",
          r = "left") : (i = "carousel-item-right",
          n = "carousel-item-prev",
          r = "right"),
          l && T(l).hasClass(R))
              this._isSliding = !1;
          else if (!this._triggerSlideEvent(l, r).isDefaultPrevented() && o && l) {
              this._isSliding = !0,
              h && this.pause(),
              this._setActiveIndicatorElement(l);
              var c = T.Event(x.SLID, {
                  relatedTarget: l,
                  direction: r,
                  from: a,
                  to: u
              });
              if (T(this._element).hasClass("slide")) {
                  T(l).addClass(n),
                  Ee.reflow(l),
                  T(o).addClass(i),
                  T(l).addClass(i);
                  var d = Ee.getTransitionDurationFromElement(o);
                  T(o).one(Ee.TRANSITION_END, function() {
                      T(l).removeClass(i + " " + n).addClass(R),
                      T(o).removeClass(R + " " + n + " " + i),
                      s._isSliding = !1,
                      setTimeout(function() {
                          return T(s._element).trigger(c)
                      }, 0)
                  }).emulateTransitionEnd(d)
              } else
                  T(o).removeClass(R),
                  T(l).addClass(R),
                  this._isSliding = !1,
                  T(this._element).trigger(c);
              h && this.cycle()
          }
      }
      ,
      t._jQueryInterface = function(e) {
          return this.each(function() {
              var i = T(this).data(I)
                , n = s({}, N, T(this).data());
              "object" == typeof e && (n = s({}, n, e));
              var r = "string" == typeof e ? e : n.slide;
              if (i || (i = new t(this,n),
              T(this).data(I, i)),
              "number" == typeof e)
                  i.to(e);
              else if ("string" == typeof r) {
                  if (void 0 === i[r])
                      throw new TypeError('No method named "' + r + '"');
                  i[r]()
              } else
                  n.interval && (i.pause(),
                  i.cycle())
          })
      }
      ,
      t._dataApiClickHandler = function(e) {
          var i = Ee.getSelectorFromElement(this);
          if (i) {
              var n = T(i)[0];
              if (n && T(n).hasClass("carousel")) {
                  var r = s({}, T(n).data(), T(this).data())
                    , o = this.getAttribute("data-slide-to");
                  o && (r.interval = !1),
                  t._jQueryInterface.call(T(n), r),
                  o && T(n).data(I).to(o),
                  e.preventDefault()
              }
          }
      }
      ,
      r(t, null, [{
          key: "VERSION",
          get: function() {
              return "4.1.0"
          }
      }, {
          key: "Default",
          get: function() {
              return N
          }
      }]),
      t
  }(),
  T(document).on(x.CLICK_DATA_API, j.DATA_SLIDE, M._dataApiClickHandler),
  T(window).on(x.LOAD_DATA_API, function() {
      T(j.DATA_RIDE).each(function() {
          var t = T(this);
          M._jQueryInterface.call(t, t.data())
      })
  }),
  T.fn[A] = M._jQueryInterface,
  T.fn[A].Constructor = M,
  T.fn[A].noConflict = function() {
      return T.fn[A] = O,
      M._jQueryInterface
  }
  ,
  M), Ie = (V = "collapse",
  W = "." + (H = "bs.collapse"),
  U = (L = e).fn[V],
  $ = {
      toggle: !0,
      parent: ""
  },
  q = {
      toggle: "boolean",
      parent: "(string|element)"
  },
  B = {
      SHOW: "show" + W,
      SHOWN: "shown" + W,
      HIDE: "hide" + W,
      HIDDEN: "hidden" + W,
      CLICK_DATA_API: "click" + W + ".data-api"
  },
  K = "show",
  z = "collapse",
  Q = "collapsing",
  Y = "collapsed",
  "width",
  "height",
  G = {
      ACTIVES: ".show, .collapsing",
      DATA_TOGGLE: '[data-toggle="collapse"]'
  },
  Z = function() {
      function t(t, e) {
          this._isTransitioning = !1,
          this._element = t,
          this._config = this._getConfig(e),
          this._triggerArray = L.makeArray(L('[data-toggle="collapse"][href="#' + t.id + '"],[data-toggle="collapse"][data-target="#' + t.id + '"]'));
          for (var i = L(G.DATA_TOGGLE), n = 0; n < i.length; n++) {
              var r = i[n]
                , s = Ee.getSelectorFromElement(r);
              null !== s && 0 < L(s).filter(t).length && (this._selector = s,
              this._triggerArray.push(r))
          }
          this._parent = this._config.parent ? this._getParent() : null,
          this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray),
          this._config.toggle && this.toggle()
      }
      var e = t.prototype;
      return e.toggle = function() {
          L(this._element).hasClass(K) ? this.hide() : this.show()
      }
      ,
      e.show = function() {
          var e, i, n = this;
          if (!(this._isTransitioning || L(this._element).hasClass(K) || (this._parent && 0 === (e = L.makeArray(L(this._parent).find(G.ACTIVES).filter('[data-parent="' + this._config.parent + '"]'))).length && (e = null),
          e && (i = L(e).not(this._selector).data(H)) && i._isTransitioning))) {
              var r = L.Event(B.SHOW);
              if (L(this._element).trigger(r),
              !r.isDefaultPrevented()) {
                  e && (t._jQueryInterface.call(L(e).not(this._selector), "hide"),
                  i || L(e).data(H, null));
                  var s = this._getDimension();
                  L(this._element).removeClass(z).addClass(Q),
                  (this._element.style[s] = 0) < this._triggerArray.length && L(this._triggerArray).removeClass(Y).attr("aria-expanded", !0),
                  this.setTransitioning(!0);
                  var o = "scroll" + (s[0].toUpperCase() + s.slice(1))
                    , a = Ee.getTransitionDurationFromElement(this._element);
                  L(this._element).one(Ee.TRANSITION_END, function() {
                      L(n._element).removeClass(Q).addClass(z).addClass(K),
                      n._element.style[s] = "",
                      n.setTransitioning(!1),
                      L(n._element).trigger(B.SHOWN)
                  }).emulateTransitionEnd(a),
                  this._element.style[s] = this._element[o] + "px"
              }
          }
      }
      ,
      e.hide = function() {
          var t = this;
          if (!this._isTransitioning && L(this._element).hasClass(K)) {
              var e = L.Event(B.HIDE);
              if (L(this._element).trigger(e),
              !e.isDefaultPrevented()) {
                  var i = this._getDimension();
                  if (this._element.style[i] = this._element.getBoundingClientRect()[i] + "px",
                  Ee.reflow(this._element),
                  L(this._element).addClass(Q).removeClass(z).removeClass(K),
                  0 < this._triggerArray.length)
                      for (var n = 0; n < this._triggerArray.length; n++) {
                          var r = this._triggerArray[n]
                            , s = Ee.getSelectorFromElement(r);
                          null !== s && (L(s).hasClass(K) || L(r).addClass(Y).attr("aria-expanded", !1))
                      }
                  this.setTransitioning(!0),
                  this._element.style[i] = "";
                  var o = Ee.getTransitionDurationFromElement(this._element);
                  L(this._element).one(Ee.TRANSITION_END, function() {
                      t.setTransitioning(!1),
                      L(t._element).removeClass(Q).addClass(z).trigger(B.HIDDEN)
                  }).emulateTransitionEnd(o)
              }
          }
      }
      ,
      e.setTransitioning = function(t) {
          this._isTransitioning = t
      }
      ,
      e.dispose = function() {
          L.removeData(this._element, H),
          this._config = null,
          this._parent = null,
          this._element = null,
          this._triggerArray = null,
          this._isTransitioning = null
      }
      ,
      e._getConfig = function(t) {
          return (t = s({}, $, t)).toggle = Boolean(t.toggle),
          Ee.typeCheckConfig(V, t, q),
          t
      }
      ,
      e._getDimension = function() {
          return L(this._element).hasClass("width") ? "width" : "height"
      }
      ,
      e._getParent = function() {
          var e = this
            , i = null;
          Ee.isElement(this._config.parent) ? (i = this._config.parent,
          void 0 !== this._config.parent.jquery && (i = this._config.parent[0])) : i = L(this._config.parent)[0];
          var n = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]';
          return L(i).find(n).each(function(i, n) {
              e._addAriaAndCollapsedClass(t._getTargetFromElement(n), [n])
          }),
          i
      }
      ,
      e._addAriaAndCollapsedClass = function(t, e) {
          if (t) {
              var i = L(t).hasClass(K);
              0 < e.length && L(e).toggleClass(Y, !i).attr("aria-expanded", i)
          }
      }
      ,
      t._getTargetFromElement = function(t) {
          var e = Ee.getSelectorFromElement(t);
          return e ? L(e)[0] : null
      }
      ,
      t._jQueryInterface = function(e) {
          return this.each(function() {
              var i = L(this)
                , n = i.data(H)
                , r = s({}, $, i.data(), "object" == typeof e && e);
              if (!n && r.toggle && /show|hide/.test(e) && (r.toggle = !1),
              n || (n = new t(this,r),
              i.data(H, n)),
              "string" == typeof e) {
                  if (void 0 === n[e])
                      throw new TypeError('No method named "' + e + '"');
                  n[e]()
              }
          })
      }
      ,
      r(t, null, [{
          key: "VERSION",
          get: function() {
              return "4.1.0"
          }
      }, {
          key: "Default",
          get: function() {
              return $
          }
      }]),
      t
  }(),
  L(document).on(B.CLICK_DATA_API, G.DATA_TOGGLE, function(t) {
      "A" === t.currentTarget.tagName && t.preventDefault();
      var e = L(this)
        , i = Ee.getSelectorFromElement(this);
      L(i).each(function() {
          var t = L(this)
            , i = t.data(H) ? "toggle" : e.data();
          Z._jQueryInterface.call(t, i)
      })
  }),
  L.fn[V] = Z._jQueryInterface,
  L.fn[V].Constructor = Z,
  L.fn[V].noConflict = function() {
      return L.fn[V] = U,
      Z._jQueryInterface
  }
  ,
  Z), De = (X = "dropdown",
  et = "." + (tt = "bs.dropdown"),
  it = ".data-api",
  nt = (J = e).fn[X],
  rt = new RegExp("38|40|27"),
  st = {
      HIDE: "hide" + et,
      HIDDEN: "hidden" + et,
      SHOW: "show" + et,
      SHOWN: "shown" + et,
      CLICK: "click" + et,
      CLICK_DATA_API: "click" + et + it,
      KEYDOWN_DATA_API: "keydown" + et + it,
      KEYUP_DATA_API: "keyup" + et + it
  },
  ot = "disabled",
  at = "show",
  "dropup",
  "dropright",
  "dropleft",
  lt = "dropdown-menu-right",
  "position-static",
  ut = '[data-toggle="dropdown"]',
  ".dropdown form",
  ht = ".dropdown-menu",
  ".navbar-nav",
  ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",
  "top-start",
  "top-end",
  "bottom-start",
  "bottom-end",
  "right-start",
  "left-start",
  ct = {
      offset: 0,
      flip: !0,
      boundary: "scrollParent",
      reference: "toggle",
      display: "dynamic"
  },
  dt = {
      offset: "(number|string|function)",
      flip: "boolean",
      boundary: "(string|element)",
      reference: "(string|element)",
      display: "string"
  },
  ft = function() {
      function t(t, e) {
          this._element = t,
          this._popper = null,
          this._config = this._getConfig(e),
          this._menu = this._getMenuElement(),
          this._inNavbar = this._detectNavbar(),
          this._addEventListeners()
      }
      var e = t.prototype;
      return e.toggle = function() {
          if (!this._element.disabled && !J(this._element).hasClass(ot)) {
              var e = t._getParentFromElement(this._element)
                , n = J(this._menu).hasClass(at);
              if (t._clearMenus(),
              !n) {
                  var r = {
                      relatedTarget: this._element
                  }
                    , s = J.Event(st.SHOW, r);
                  if (J(e).trigger(s),
                  !s.isDefaultPrevented()) {
                      if (!this._inNavbar) {
                          if (void 0 === i)
                              throw new TypeError("Bootstrap dropdown require Popper.js (https://popper.js.org)");
                          var o = this._element;
                          "parent" === this._config.reference ? o = e : Ee.isElement(this._config.reference) && (o = this._config.reference,
                          void 0 !== this._config.reference.jquery && (o = this._config.reference[0])),
                          "scrollParent" !== this._config.boundary && J(e).addClass("position-static"),
                          this._popper = new i(o,this._menu,this._getPopperConfig())
                      }
                      "ontouchstart"in document.documentElement && 0 === J(e).closest(".navbar-nav").length && J(document.body).children().on("mouseover", null, J.noop),
                      this._element.focus(),
                      this._element.setAttribute("aria-expanded", !0),
                      J(this._menu).toggleClass(at),
                      J(e).toggleClass(at).trigger(J.Event(st.SHOWN, r))
                  }
              }
          }
      }
      ,
      e.dispose = function() {
          J.removeData(this._element, tt),
          J(this._element).off(et),
          this._element = null,
          (this._menu = null) !== this._popper && (this._popper.destroy(),
          this._popper = null)
      }
      ,
      e.update = function() {
          this._inNavbar = this._detectNavbar(),
          null !== this._popper && this._popper.scheduleUpdate()
      }
      ,
      e._addEventListeners = function() {
          var t = this;
          J(this._element).on(st.CLICK, function(e) {
              e.preventDefault(),
              e.stopPropagation(),
              t.toggle()
          })
      }
      ,
      e._getConfig = function(t) {
          return t = s({}, this.constructor.Default, J(this._element).data(), t),
          Ee.typeCheckConfig(X, t, this.constructor.DefaultType),
          t
      }
      ,
      e._getMenuElement = function() {
          if (!this._menu) {
              var e = t._getParentFromElement(this._element);
              this._menu = J(e).find(ht)[0]
          }
          return this._menu
      }
      ,
      e._getPlacement = function() {
          var t = J(this._element).parent()
            , e = "bottom-start";
          return t.hasClass("dropup") ? (e = "top-start",
          J(this._menu).hasClass(lt) && (e = "top-end")) : t.hasClass("dropright") ? e = "right-start" : t.hasClass("dropleft") ? e = "left-start" : J(this._menu).hasClass(lt) && (e = "bottom-end"),
          e
      }
      ,
      e._detectNavbar = function() {
          return 0 < J(this._element).closest(".navbar").length
      }
      ,
      e._getPopperConfig = function() {
          var t = this
            , e = {};
          "function" == typeof this._config.offset ? e.fn = function(e) {
              return e.offsets = s({}, e.offsets, t._config.offset(e.offsets) || {}),
              e
          }
          : e.offset = this._config.offset;
          var i = {
              placement: this._getPlacement(),
              modifiers: {
                  offset: e,
                  flip: {
                      enabled: this._config.flip
                  },
                  preventOverflow: {
                      boundariesElement: this._config.boundary
                  }
              }
          };
          return "static" === this._config.display && (i.modifiers.applyStyle = {
              enabled: !1
          }),
          i
      }
      ,
      t._jQueryInterface = function(e) {
          return this.each(function() {
              var i = J(this).data(tt);
              if (i || (i = new t(this,"object" == typeof e ? e : null),
              J(this).data(tt, i)),
              "string" == typeof e) {
                  if (void 0 === i[e])
                      throw new TypeError('No method named "' + e + '"');
                  i[e]()
              }
          })
      }
      ,
      t._clearMenus = function(e) {
          if (!e || 3 !== e.which && ("keyup" !== e.type || 9 === e.which))
              for (var i = J.makeArray(J(ut)), n = 0; n < i.length; n++) {
                  var r = t._getParentFromElement(i[n])
                    , s = J(i[n]).data(tt)
                    , o = {
                      relatedTarget: i[n]
                  };
                  if (s) {
                      var a = s._menu;
                      if (J(r).hasClass(at) && !(e && ("click" === e.type && /input|textarea/i.test(e.target.tagName) || "keyup" === e.type && 9 === e.which) && J.contains(r, e.target))) {
                          var l = J.Event(st.HIDE, o);
                          J(r).trigger(l),
                          l.isDefaultPrevented() || ("ontouchstart"in document.documentElement && J(document.body).children().off("mouseover", null, J.noop),
                          i[n].setAttribute("aria-expanded", "false"),
                          J(a).removeClass(at),
                          J(r).removeClass(at).trigger(J.Event(st.HIDDEN, o)))
                      }
                  }
              }
      }
      ,
      t._getParentFromElement = function(t) {
          var e, i = Ee.getSelectorFromElement(t);
          return i && (e = J(i)[0]),
          e || t.parentNode
      }
      ,
      t._dataApiKeydownHandler = function(e) {
          if ((/input|textarea/i.test(e.target.tagName) ? !(32 === e.which || 27 !== e.which && (40 !== e.which && 38 !== e.which || J(e.target).closest(ht).length)) : rt.test(e.which)) && (e.preventDefault(),
          e.stopPropagation(),
          !this.disabled && !J(this).hasClass(ot))) {
              var i = t._getParentFromElement(this)
                , n = J(i).hasClass(at);
              if ((n || 27 === e.which && 32 === e.which) && (!n || 27 !== e.which && 32 !== e.which)) {
                  var r = J(i).find(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)").get();
                  if (0 !== r.length) {
                      var s = r.indexOf(e.target);
                      38 === e.which && 0 < s && s--,
                      40 === e.which && s < r.length - 1 && s++,
                      s < 0 && (s = 0),
                      r[s].focus()
                  }
              } else {
                  if (27 === e.which) {
                      var o = J(i).find(ut)[0];
                      J(o).trigger("focus")
                  }
                  J(this).trigger("click")
              }
          }
      }
      ,
      r(t, null, [{
          key: "VERSION",
          get: function() {
              return "4.1.0"
          }
      }, {
          key: "Default",
          get: function() {
              return ct
          }
      }, {
          key: "DefaultType",
          get: function() {
              return dt
          }
      }]),
      t
  }(),
  J(document).on(st.KEYDOWN_DATA_API, ut, ft._dataApiKeydownHandler).on(st.KEYDOWN_DATA_API, ht, ft._dataApiKeydownHandler).on(st.CLICK_DATA_API + " " + st.KEYUP_DATA_API, ft._clearMenus).on(st.CLICK_DATA_API, ut, function(t) {
      t.preventDefault(),
      t.stopPropagation(),
      ft._jQueryInterface.call(J(this), "toggle")
  }).on(st.CLICK_DATA_API, ".dropdown form", function(t) {
      t.stopPropagation()
  }),
  J.fn[X] = ft._jQueryInterface,
  J.fn[X].Constructor = ft,
  J.fn[X].noConflict = function() {
      return J.fn[X] = nt,
      ft._jQueryInterface
  }
  ,
  ft), Se = (mt = "modal",
  vt = "." + (gt = "bs.modal"),
  _t = (pt = e).fn[mt],
  yt = {
      backdrop: !0,
      keyboard: !0,
      focus: !0,
      show: !0
  },
  bt = {
      backdrop: "(boolean|string)",
      keyboard: "boolean",
      focus: "boolean",
      show: "boolean"
  },
  wt = {
      HIDE: "hide" + vt,
      HIDDEN: "hidden" + vt,
      SHOW: "show" + vt,
      SHOWN: "shown" + vt,
      FOCUSIN: "focusin" + vt,
      RESIZE: "resize" + vt,
      CLICK_DISMISS: "click.dismiss" + vt,
      KEYDOWN_DISMISS: "keydown.dismiss" + vt,
      MOUSEUP_DISMISS: "mouseup.dismiss" + vt,
      MOUSEDOWN_DISMISS: "mousedown.dismiss" + vt,
      CLICK_DATA_API: "click" + vt + ".data-api"
  },
  "modal-scrollbar-measure",
  "modal-backdrop",
  Et = "modal-open",
  Ct = "fade",
  Tt = "show",
  At = {
      DIALOG: ".modal-dialog",
      DATA_TOGGLE: '[data-toggle="modal"]',
      DATA_DISMISS: '[data-dismiss="modal"]',
      FIXED_CONTENT: ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
      STICKY_CONTENT: ".sticky-top",
      NAVBAR_TOGGLER: ".navbar-toggler"
  },
  It = function() {
      function t(t, e) {
          this._config = this._getConfig(e),
          this._element = t,
          this._dialog = pt(t).find(At.DIALOG)[0],
          this._backdrop = null,
          this._isShown = !1,
          this._isBodyOverflowing = !1,
          this._ignoreBackdropClick = !1,
          this._scrollbarWidth = 0
      }
      var e = t.prototype;
      return e.toggle = function(t) {
          return this._isShown ? this.hide() : this.show(t)
      }
      ,
      e.show = function(t) {
          var e = this;
          if (!this._isTransitioning && !this._isShown) {
              pt(this._element).hasClass(Ct) && (this._isTransitioning = !0);
              var i = pt.Event(wt.SHOW, {
                  relatedTarget: t
              });
              pt(this._element).trigger(i),
              this._isShown || i.isDefaultPrevented() || (this._isShown = !0,
              this._checkScrollbar(),
              this._setScrollbar(),
              this._adjustDialog(),
              pt(document.body).addClass(Et),
              this._setEscapeEvent(),
              this._setResizeEvent(),
              pt(this._element).on(wt.CLICK_DISMISS, At.DATA_DISMISS, function(t) {
                  return e.hide(t)
              }),
              pt(this._dialog).on(wt.MOUSEDOWN_DISMISS, function() {
                  pt(e._element).one(wt.MOUSEUP_DISMISS, function(t) {
                      pt(t.target).is(e._element) && (e._ignoreBackdropClick = !0)
                  })
              }),
              this._showBackdrop(function() {
                  return e._showElement(t)
              }))
          }
      }
      ,
      e.hide = function(t) {
          var e = this;
          if (t && t.preventDefault(),
          !this._isTransitioning && this._isShown) {
              var i = pt.Event(wt.HIDE);
              if (pt(this._element).trigger(i),
              this._isShown && !i.isDefaultPrevented()) {
                  this._isShown = !1;
                  var n = pt(this._element).hasClass(Ct);
                  if (n && (this._isTransitioning = !0),
                  this._setEscapeEvent(),
                  this._setResizeEvent(),
                  pt(document).off(wt.FOCUSIN),
                  pt(this._element).removeClass(Tt),
                  pt(this._element).off(wt.CLICK_DISMISS),
                  pt(this._dialog).off(wt.MOUSEDOWN_DISMISS),
                  n) {
                      var r = Ee.getTransitionDurationFromElement(this._element);
                      pt(this._element).one(Ee.TRANSITION_END, function(t) {
                          return e._hideModal(t)
                      }).emulateTransitionEnd(r)
                  } else
                      this._hideModal()
              }
          }
      }
      ,
      e.dispose = function() {
          pt.removeData(this._element, gt),
          pt(window, document, this._element, this._backdrop).off(vt),
          this._config = null,
          this._element = null,
          this._dialog = null,
          this._backdrop = null,
          this._isShown = null,
          this._isBodyOverflowing = null,
          this._ignoreBackdropClick = null,
          this._scrollbarWidth = null
      }
      ,
      e.handleUpdate = function() {
          this._adjustDialog()
      }
      ,
      e._getConfig = function(t) {
          return t = s({}, yt, t),
          Ee.typeCheckConfig(mt, t, bt),
          t
      }
      ,
      e._showElement = function(t) {
          var e = this
            , i = pt(this._element).hasClass(Ct);
          this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element),
          this._element.style.display = "block",
          this._element.removeAttribute("aria-hidden"),
          this._element.scrollTop = 0,
          i && Ee.reflow(this._element),
          pt(this._element).addClass(Tt),
          this._config.focus && this._enforceFocus();
          var n = pt.Event(wt.SHOWN, {
              relatedTarget: t
          })
            , r = function() {
              e._config.focus && e._element.focus(),
              e._isTransitioning = !1,
              pt(e._element).trigger(n)
          };
          if (i) {
              var s = Ee.getTransitionDurationFromElement(this._element);
              pt(this._dialog).one(Ee.TRANSITION_END, r).emulateTransitionEnd(s)
          } else
              r()
      }
      ,
      e._enforceFocus = function() {
          var t = this;
          pt(document).off(wt.FOCUSIN).on(wt.FOCUSIN, function(e) {
              document !== e.target && t._element !== e.target && 0 === pt(t._element).has(e.target).length && t._element.focus()
          })
      }
      ,
      e._setEscapeEvent = function() {
          var t = this;
          this._isShown && this._config.keyboard ? pt(this._element).on(wt.KEYDOWN_DISMISS, function(e) {
              27 === e.which && (e.preventDefault(),
              t.hide())
          }) : this._isShown || pt(this._element).off(wt.KEYDOWN_DISMISS)
      }
      ,
      e._setResizeEvent = function() {
          var t = this;
          this._isShown ? pt(window).on(wt.RESIZE, function(e) {
              return t.handleUpdate(e)
          }) : pt(window).off(wt.RESIZE)
      }
      ,
      e._hideModal = function() {
          var t = this;
          this._element.style.display = "none",
          this._element.setAttribute("aria-hidden", !0),
          this._isTransitioning = !1,
          this._showBackdrop(function() {
              pt(document.body).removeClass(Et),
              t._resetAdjustments(),
              t._resetScrollbar(),
              pt(t._element).trigger(wt.HIDDEN)
          })
      }
      ,
      e._removeBackdrop = function() {
          this._backdrop && (pt(this._backdrop).remove(),
          this._backdrop = null)
      }
      ,
      e._showBackdrop = function(t) {
          var e = this
            , i = pt(this._element).hasClass(Ct) ? Ct : "";
          if (this._isShown && this._config.backdrop) {
              if (this._backdrop = document.createElement("div"),
              this._backdrop.className = "modal-backdrop",
              i && pt(this._backdrop).addClass(i),
              pt(this._backdrop).appendTo(document.body),
              pt(this._element).on(wt.CLICK_DISMISS, function(t) {
                  e._ignoreBackdropClick ? e._ignoreBackdropClick = !1 : t.target === t.currentTarget && ("static" === e._config.backdrop ? e._element.focus() : e.hide())
              }),
              i && Ee.reflow(this._backdrop),
              pt(this._backdrop).addClass(Tt),
              !t)
                  return;
              if (!i)
                  return void t();
              var n = Ee.getTransitionDurationFromElement(this._backdrop);
              pt(this._backdrop).one(Ee.TRANSITION_END, t).emulateTransitionEnd(n)
          } else if (!this._isShown && this._backdrop) {
              pt(this._backdrop).removeClass(Tt);
              var r = function() {
                  e._removeBackdrop(),
                  t && t()
              };
              if (pt(this._element).hasClass(Ct)) {
                  var s = Ee.getTransitionDurationFromElement(this._backdrop);
                  pt(this._backdrop).one(Ee.TRANSITION_END, r).emulateTransitionEnd(s)
              } else
                  r()
          } else
              t && t()
      }
      ,
      e._adjustDialog = function() {
          var t = this._element.scrollHeight > document.documentElement.clientHeight;
          !this._isBodyOverflowing && t && (this._element.style.paddingLeft = this._scrollbarWidth + "px"),
          this._isBodyOverflowing && !t && (this._element.style.paddingRight = this._scrollbarWidth + "px")
      }
      ,
      e._resetAdjustments = function() {
          this._element.style.paddingLeft = "",
          this._element.style.paddingRight = ""
      }
      ,
      e._checkScrollbar = function() {
          var t = document.body.getBoundingClientRect();
          this._isBodyOverflowing = t.left + t.right < window.innerWidth,
          this._scrollbarWidth = this._getScrollbarWidth()
      }
      ,
      e._setScrollbar = function() {
          var t = this;
          if (this._isBodyOverflowing) {
              pt(At.FIXED_CONTENT).each(function(e, i) {
                  var n = pt(i)[0].style.paddingRight
                    , r = pt(i).css("padding-right");
                  pt(i).data("padding-right", n).css("padding-right", parseFloat(r) + t._scrollbarWidth + "px")
              }),
              pt(At.STICKY_CONTENT).each(function(e, i) {
                  var n = pt(i)[0].style.marginRight
                    , r = pt(i).css("margin-right");
                  pt(i).data("margin-right", n).css("margin-right", parseFloat(r) - t._scrollbarWidth + "px")
              }),
              pt(At.NAVBAR_TOGGLER).each(function(e, i) {
                  var n = pt(i)[0].style.marginRight
                    , r = pt(i).css("margin-right");
                  pt(i).data("margin-right", n).css("margin-right", parseFloat(r) + t._scrollbarWidth + "px")
              });
              var e = document.body.style.paddingRight
                , i = pt(document.body).css("padding-right");
              pt(document.body).data("padding-right", e).css("padding-right", parseFloat(i) + this._scrollbarWidth + "px")
          }
      }
      ,
      e._resetScrollbar = function() {
          pt(At.FIXED_CONTENT).each(function(t, e) {
              var i = pt(e).data("padding-right");
              void 0 !== i && pt(e).css("padding-right", i).removeData("padding-right")
          }),
          pt(At.STICKY_CONTENT + ", " + At.NAVBAR_TOGGLER).each(function(t, e) {
              var i = pt(e).data("margin-right");
              void 0 !== i && pt(e).css("margin-right", i).removeData("margin-right")
          });
          var t = pt(document.body).data("padding-right");
          void 0 !== t && pt(document.body).css("padding-right", t).removeData("padding-right")
      }
      ,
      e._getScrollbarWidth = function() {
          var t = document.createElement("div");
          t.className = "modal-scrollbar-measure",
          document.body.appendChild(t);
          var e = t.getBoundingClientRect().width - t.clientWidth;
          return document.body.removeChild(t),
          e
      }
      ,
      t._jQueryInterface = function(e, i) {
          return this.each(function() {
              var n = pt(this).data(gt)
                , r = s({}, t.Default, pt(this).data(), "object" == typeof e && e);
              if (n || (n = new t(this,r),
              pt(this).data(gt, n)),
              "string" == typeof e) {
                  if (void 0 === n[e])
                      throw new TypeError('No method named "' + e + '"');
                  n[e](i)
              } else
                  r.show && n.show(i)
          })
      }
      ,
      r(t, null, [{
          key: "VERSION",
          get: function() {
              return "4.1.0"
          }
      }, {
          key: "Default",
          get: function() {
              return yt
          }
      }]),
      t
  }(),
  pt(document).on(wt.CLICK_DATA_API, At.DATA_TOGGLE, function(t) {
      var e, i = this, n = Ee.getSelectorFromElement(this);
      n && (e = pt(n)[0]);
      var r = pt(e).data(gt) ? "toggle" : s({}, pt(e).data(), pt(this).data());
      "A" !== this.tagName && "AREA" !== this.tagName || t.preventDefault();
      var o = pt(e).one(wt.SHOW, function(t) {
          t.isDefaultPrevented() || o.one(wt.HIDDEN, function() {
              pt(i).is(":visible") && i.focus()
          })
      });
      It._jQueryInterface.call(pt(e), r, this)
  }),
  pt.fn[mt] = It._jQueryInterface,
  pt.fn[mt].Constructor = It,
  pt.fn[mt].noConflict = function() {
      return pt.fn[mt] = _t,
      It._jQueryInterface
  }
  ,
  It), Oe = (St = "tooltip",
  Nt = "." + (Ot = "bs.tooltip"),
  Ft = (Dt = e).fn[St],
  Pt = "bs-tooltip",
  kt = new RegExp("(^|\\s)" + Pt + "\\S+","g"),
  jt = {
      animation: !0,
      template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
      trigger: "hover focus",
      title: "",
      delay: 0,
      html: !(Rt = {
          AUTO: "auto",
          TOP: "top",
          RIGHT: "right",
          BOTTOM: "bottom",
          LEFT: "left"
      }),
      selector: !(xt = {
          animation: "boolean",
          template: "string",
          title: "(string|element|function)",
          trigger: "string",
          delay: "(number|object)",
          html: "boolean",
          selector: "(string|boolean)",
          placement: "(string|function)",
          offset: "(number|string)",
          container: "(string|element|boolean)",
          fallbackPlacement: "(string|array)",
          boundary: "(string|element)"
      }),
      placement: "top",
      offset: 0,
      container: !1,
      fallbackPlacement: "flip",
      boundary: "scrollParent"
  },
  "out",
  Lt = {
      HIDE: "hide" + Nt,
      HIDDEN: "hidden" + Nt,
      SHOW: (Mt = "show") + Nt,
      SHOWN: "shown" + Nt,
      INSERTED: "inserted" + Nt,
      CLICK: "click" + Nt,
      FOCUSIN: "focusin" + Nt,
      FOCUSOUT: "focusout" + Nt,
      MOUSEENTER: "mouseenter" + Nt,
      MOUSELEAVE: "mouseleave" + Nt
  },
  Vt = "fade",
  Ht = "show",
  ".tooltip-inner",
  ".arrow",
  Wt = "hover",
  Ut = "focus",
  "click",
  "manual",
  $t = function() {
      function t(t, e) {
          if (void 0 === i)
              throw new TypeError("Bootstrap tooltips require Popper.js (https://popper.js.org)");
          this._isEnabled = !0,
          this._timeout = 0,
          this._hoverState = "",
          this._activeTrigger = {},
          this._popper = null,
          this.element = t,
          this.config = this._getConfig(e),
          this.tip = null,
          this._setListeners()
      }
      var e = t.prototype;
      return e.enable = function() {
          this._isEnabled = !0
      }
      ,
      e.disable = function() {
          this._isEnabled = !1
      }
      ,
      e.toggleEnabled = function() {
          this._isEnabled = !this._isEnabled
      }
      ,
      e.toggle = function(t) {
          if (this._isEnabled)
              if (t) {
                  var e = this.constructor.DATA_KEY
                    , i = Dt(t.currentTarget).data(e);
                  i || (i = new this.constructor(t.currentTarget,this._getDelegateConfig()),
                  Dt(t.currentTarget).data(e, i)),
                  i._activeTrigger.click = !i._activeTrigger.click,
                  i._isWithActiveTrigger() ? i._enter(null, i) : i._leave(null, i)
              } else {
                  if (Dt(this.getTipElement()).hasClass(Ht))
                      return void this._leave(null, this);
                  this._enter(null, this)
              }
      }
      ,
      e.dispose = function() {
          clearTimeout(this._timeout),
          Dt.removeData(this.element, this.constructor.DATA_KEY),
          Dt(this.element).off(this.constructor.EVENT_KEY),
          Dt(this.element).closest(".modal").off("hide.bs.modal"),
          this.tip && Dt(this.tip).remove(),
          this._isEnabled = null,
          this._timeout = null,
          this._hoverState = null,
          (this._activeTrigger = null) !== this._popper && this._popper.destroy(),
          this._popper = null,
          this.element = null,
          this.config = null,
          this.tip = null
      }
      ,
      e.show = function() {
          var t = this;
          if ("none" === Dt(this.element).css("display"))
              throw new Error("Please use show on visible elements");
          var e = Dt.Event(this.constructor.Event.SHOW);
          if (this.isWithContent() && this._isEnabled) {
              Dt(this.element).trigger(e);
              var n = Dt.contains(this.element.ownerDocument.documentElement, this.element);
              if (e.isDefaultPrevented() || !n)
                  return;
              var r = this.getTipElement()
                , s = Ee.getUID(this.constructor.NAME);
              r.setAttribute("id", s),
              this.element.setAttribute("aria-describedby", s),
              this.setContent(),
              this.config.animation && Dt(r).addClass(Vt);
              var o = "function" == typeof this.config.placement ? this.config.placement.call(this, r, this.element) : this.config.placement
                , a = this._getAttachment(o);
              this.addAttachmentClass(a);
              var l = !1 === this.config.container ? document.body : Dt(this.config.container);
              Dt(r).data(this.constructor.DATA_KEY, this),
              Dt.contains(this.element.ownerDocument.documentElement, this.tip) || Dt(r).appendTo(l),
              Dt(this.element).trigger(this.constructor.Event.INSERTED),
              this._popper = new i(this.element,r,{
                  placement: a,
                  modifiers: {
                      offset: {
                          offset: this.config.offset
                      },
                      flip: {
                          behavior: this.config.fallbackPlacement
                      },
                      arrow: {
                          element: ".arrow"
                      },
                      preventOverflow: {
                          boundariesElement: this.config.boundary
                      }
                  },
                  onCreate: function(e) {
                      e.originalPlacement !== e.placement && t._handlePopperPlacementChange(e)
                  },
                  onUpdate: function(e) {
                      t._handlePopperPlacementChange(e)
                  }
              }),
              Dt(r).addClass(Ht),
              "ontouchstart"in document.documentElement && Dt(document.body).children().on("mouseover", null, Dt.noop);
              var u = function() {
                  t.config.animation && t._fixTransition();
                  var e = t._hoverState;
                  t._hoverState = null,
                  Dt(t.element).trigger(t.constructor.Event.SHOWN),
                  "out" === e && t._leave(null, t)
              };
              if (Dt(this.tip).hasClass(Vt)) {
                  var h = Ee.getTransitionDurationFromElement(this.tip);
                  Dt(this.tip).one(Ee.TRANSITION_END, u).emulateTransitionEnd(h)
              } else
                  u()
          }
      }
      ,
      e.hide = function(t) {
          var e = this
            , i = this.getTipElement()
            , n = Dt.Event(this.constructor.Event.HIDE)
            , r = function() {
              e._hoverState !== Mt && i.parentNode && i.parentNode.removeChild(i),
              e._cleanTipClass(),
              e.element.removeAttribute("aria-describedby"),
              Dt(e.element).trigger(e.constructor.Event.HIDDEN),
              null !== e._popper && e._popper.destroy(),
              t && t()
          };
          if (Dt(this.element).trigger(n),
          !n.isDefaultPrevented()) {
              if (Dt(i).removeClass(Ht),
              "ontouchstart"in document.documentElement && Dt(document.body).children().off("mouseover", null, Dt.noop),
              this._activeTrigger.click = !1,
              this._activeTrigger[Ut] = !1,
              this._activeTrigger[Wt] = !1,
              Dt(this.tip).hasClass(Vt)) {
                  var s = Ee.getTransitionDurationFromElement(i);
                  Dt(i).one(Ee.TRANSITION_END, r).emulateTransitionEnd(s)
              } else
                  r();
              this._hoverState = ""
          }
      }
      ,
      e.update = function() {
          null !== this._popper && this._popper.scheduleUpdate()
      }
      ,
      e.isWithContent = function() {
          return Boolean(this.getTitle())
      }
      ,
      e.addAttachmentClass = function(t) {
          Dt(this.getTipElement()).addClass(Pt + "-" + t)
      }
      ,
      e.getTipElement = function() {
          return this.tip = this.tip || Dt(this.config.template)[0],
          this.tip
      }
      ,
      e.setContent = function() {
          var t = Dt(this.getTipElement());
          this.setElementContent(t.find(".tooltip-inner"), this.getTitle()),
          t.removeClass(Vt + " " + Ht)
      }
      ,
      e.setElementContent = function(t, e) {
          var i = this.config.html;
          "object" == typeof e && (e.nodeType || e.jquery) ? i ? Dt(e).parent().is(t) || t.empty().append(e) : t.text(Dt(e).text()) : t[i ? "html" : "text"](e)
      }
      ,
      e.getTitle = function() {
          var t = this.element.getAttribute("data-original-title");
          return t || (t = "function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title),
          t
      }
      ,
      e._getAttachment = function(t) {
          return Rt[t.toUpperCase()]
      }
      ,
      e._setListeners = function() {
          var t = this;
          this.config.trigger.split(" ").forEach(function(e) {
              if ("click" === e)
                  Dt(t.element).on(t.constructor.Event.CLICK, t.config.selector, function(e) {
                      return t.toggle(e)
                  });
              else if ("manual" !== e) {
                  var i = e === Wt ? t.constructor.Event.MOUSEENTER : t.constructor.Event.FOCUSIN
                    , n = e === Wt ? t.constructor.Event.MOUSELEAVE : t.constructor.Event.FOCUSOUT;
                  Dt(t.element).on(i, t.config.selector, function(e) {
                      return t._enter(e)
                  }).on(n, t.config.selector, function(e) {
                      return t._leave(e)
                  })
              }
              Dt(t.element).closest(".modal").on("hide.bs.modal", function() {
                  return t.hide()
              })
          }),
          this.config.selector ? this.config = s({}, this.config, {
              trigger: "manual",
              selector: ""
          }) : this._fixTitle()
      }
      ,
      e._fixTitle = function() {
          var t = typeof this.element.getAttribute("data-original-title");
          (this.element.getAttribute("title") || "string" !== t) && (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""),
          this.element.setAttribute("title", ""))
      }
      ,
      e._enter = function(t, e) {
          var i = this.constructor.DATA_KEY;
          (e = e || Dt(t.currentTarget).data(i)) || (e = new this.constructor(t.currentTarget,this._getDelegateConfig()),
          Dt(t.currentTarget).data(i, e)),
          t && (e._activeTrigger["focusin" === t.type ? Ut : Wt] = !0),
          Dt(e.getTipElement()).hasClass(Ht) || e._hoverState === Mt ? e._hoverState = Mt : (clearTimeout(e._timeout),
          e._hoverState = Mt,
          e.config.delay && e.config.delay.show ? e._timeout = setTimeout(function() {
              e._hoverState === Mt && e.show()
          }, e.config.delay.show) : e.show())
      }
      ,
      e._leave = function(t, e) {
          var i = this.constructor.DATA_KEY;
          (e = e || Dt(t.currentTarget).data(i)) || (e = new this.constructor(t.currentTarget,this._getDelegateConfig()),
          Dt(t.currentTarget).data(i, e)),
          t && (e._activeTrigger["focusout" === t.type ? Ut : Wt] = !1),
          e._isWithActiveTrigger() || (clearTimeout(e._timeout),
          e._hoverState = "out",
          e.config.delay && e.config.delay.hide ? e._timeout = setTimeout(function() {
              "out" === e._hoverState && e.hide()
          }, e.config.delay.hide) : e.hide())
      }
      ,
      e._isWithActiveTrigger = function() {
          for (var t in this._activeTrigger)
              if (this._activeTrigger[t])
                  return !0;
          return !1
      }
      ,
      e._getConfig = function(t) {
          return "number" == typeof (t = s({}, this.constructor.Default, Dt(this.element).data(), t)).delay && (t.delay = {
              show: t.delay,
              hide: t.delay
          }),
          "number" == typeof t.title && (t.title = t.title.toString()),
          "number" == typeof t.content && (t.content = t.content.toString()),
          Ee.typeCheckConfig(St, t, this.constructor.DefaultType),
          t
      }
      ,
      e._getDelegateConfig = function() {
          var t = {};
          if (this.config)
              for (var e in this.config)
                  this.constructor.Default[e] !== this.config[e] && (t[e] = this.config[e]);
          return t
      }
      ,
      e._cleanTipClass = function() {
          var t = Dt(this.getTipElement())
            , e = t.attr("class").match(kt);
          null !== e && 0 < e.length && t.removeClass(e.join(""))
      }
      ,
      e._handlePopperPlacementChange = function(t) {
          this._cleanTipClass(),
          this.addAttachmentClass(this._getAttachment(t.placement))
      }
      ,
      e._fixTransition = function() {
          var t = this.getTipElement()
            , e = this.config.animation;
          null === t.getAttribute("x-placement") && (Dt(t).removeClass(Vt),
          this.config.animation = !1,
          this.hide(),
          this.show(),
          this.config.animation = e)
      }
      ,
      t._jQueryInterface = function(e) {
          return this.each(function() {
              var i = Dt(this).data(Ot)
                , n = "object" == typeof e && e;
              if ((i || !/dispose|hide/.test(e)) && (i || (i = new t(this,n),
              Dt(this).data(Ot, i)),
              "string" == typeof e)) {
                  if (void 0 === i[e])
                      throw new TypeError('No method named "' + e + '"');
                  i[e]()
              }
          })
      }
      ,
      r(t, null, [{
          key: "VERSION",
          get: function() {
              return "4.1.0"
          }
      }, {
          key: "Default",
          get: function() {
              return jt
          }
      }, {
          key: "NAME",
          get: function() {
              return St
          }
      }, {
          key: "DATA_KEY",
          get: function() {
              return Ot
          }
      }, {
          key: "Event",
          get: function() {
              return Lt
          }
      }, {
          key: "EVENT_KEY",
          get: function() {
              return Nt
          }
      }, {
          key: "DefaultType",
          get: function() {
              return xt
          }
      }]),
      t
  }(),
  Dt.fn[St] = $t._jQueryInterface,
  Dt.fn[St].Constructor = $t,
  Dt.fn[St].noConflict = function() {
      return Dt.fn[St] = Ft,
      $t._jQueryInterface
  }
  ,
  $t), Ne = (Bt = "popover",
  zt = "." + (Kt = "bs.popover"),
  Qt = (qt = e).fn[Bt],
  Yt = "bs-popover",
  Gt = new RegExp("(^|\\s)" + Yt + "\\S+","g"),
  Zt = s({}, Oe.Default, {
      placement: "right",
      trigger: "click",
      content: "",
      template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
  }),
  Jt = s({}, Oe.DefaultType, {
      content: "(string|element|function)"
  }),
  "fade",
  ".popover-header",
  ".popover-body",
  Xt = {
      HIDE: "hide" + zt,
      HIDDEN: "hidden" + zt,
      SHOW: "show" + zt,
      SHOWN: "shown" + zt,
      INSERTED: "inserted" + zt,
      CLICK: "click" + zt,
      FOCUSIN: "focusin" + zt,
      FOCUSOUT: "focusout" + zt,
      MOUSEENTER: "mouseenter" + zt,
      MOUSELEAVE: "mouseleave" + zt
  },
  te = function(t) {
      var e, i;
      function n() {
          return t.apply(this, arguments) || this
      }
      i = t,
      (e = n).prototype = Object.create(i.prototype),
      (e.prototype.constructor = e).__proto__ = i;
      var s = n.prototype;
      return s.isWithContent = function() {
          return this.getTitle() || this._getContent()
      }
      ,
      s.addAttachmentClass = function(t) {
          qt(this.getTipElement()).addClass(Yt + "-" + t)
      }
      ,
      s.getTipElement = function() {
          return this.tip = this.tip || qt(this.config.template)[0],
          this.tip
      }
      ,
      s.setContent = function() {
          var t = qt(this.getTipElement());
          this.setElementContent(t.find(".popover-header"), this.getTitle());
          var e = this._getContent();
          "function" == typeof e && (e = e.call(this.element)),
          this.setElementContent(t.find(".popover-body"), e),
          t.removeClass("fade show")
      }
      ,
      s._getContent = function() {
          return this.element.getAttribute("data-content") || this.config.content
      }
      ,
      s._cleanTipClass = function() {
          var t = qt(this.getTipElement())
            , e = t.attr("class").match(Gt);
          null !== e && 0 < e.length && t.removeClass(e.join(""))
      }
      ,
      n._jQueryInterface = function(t) {
          return this.each(function() {
              var e = qt(this).data(Kt)
                , i = "object" == typeof t ? t : null;
              if ((e || !/destroy|hide/.test(t)) && (e || (e = new n(this,i),
              qt(this).data(Kt, e)),
              "string" == typeof t)) {
                  if (void 0 === e[t])
                      throw new TypeError('No method named "' + t + '"');
                  e[t]()
              }
          })
      }
      ,
      r(n, null, [{
          key: "VERSION",
          get: function() {
              return "4.1.0"
          }
      }, {
          key: "Default",
          get: function() {
              return Zt
          }
      }, {
          key: "NAME",
          get: function() {
              return Bt
          }
      }, {
          key: "DATA_KEY",
          get: function() {
              return Kt
          }
      }, {
          key: "Event",
          get: function() {
              return Xt
          }
      }, {
          key: "EVENT_KEY",
          get: function() {
              return zt
          }
      }, {
          key: "DefaultType",
          get: function() {
              return Jt
          }
      }]),
      n
  }(Oe),
  qt.fn[Bt] = te._jQueryInterface,
  qt.fn[Bt].Constructor = te,
  qt.fn[Bt].noConflict = function() {
      return qt.fn[Bt] = Qt,
      te._jQueryInterface
  }
  ,
  te), Fe = (ie = "scrollspy",
  re = "." + (ne = "bs.scrollspy"),
  se = (ee = e).fn[ie],
  oe = {
      offset: 10,
      method: "auto",
      target: ""
  },
  ae = {
      offset: "number",
      method: "string",
      target: "(string|element)"
  },
  le = {
      ACTIVATE: "activate" + re,
      SCROLL: "scroll" + re,
      LOAD_DATA_API: "load" + re + ".data-api"
  },
  "dropdown-item",
  ue = "active",
  he = {
      DATA_SPY: '[data-spy="scroll"]',
      ACTIVE: ".active",
      NAV_LIST_GROUP: ".nav, .list-group",
      NAV_LINKS: ".nav-link",
      NAV_ITEMS: ".nav-item",
      LIST_ITEMS: ".list-group-item",
      DROPDOWN: ".dropdown",
      DROPDOWN_ITEMS: ".dropdown-item",
      DROPDOWN_TOGGLE: ".dropdown-toggle"
  },
  "offset",
  ce = "position",
  de = function() {
      function t(t, e) {
          var i = this;
          this._element = t,
          this._scrollElement = "BODY" === t.tagName ? window : t,
          this._config = this._getConfig(e),
          this._selector = this._config.target + " " + he.NAV_LINKS + "," + this._config.target + " " + he.LIST_ITEMS + "," + this._config.target + " " + he.DROPDOWN_ITEMS,
          this._offsets = [],
          this._targets = [],
          this._activeTarget = null,
          this._scrollHeight = 0,
          ee(this._scrollElement).on(le.SCROLL, function(t) {
              return i._process(t)
          }),
          this.refresh(),
          this._process()
      }
      var e = t.prototype;
      return e.refresh = function() {
          var t = this
            , e = this._scrollElement === this._scrollElement.window ? "offset" : ce
            , i = "auto" === this._config.method ? e : this._config.method
            , n = i === ce ? this._getScrollTop() : 0;
          this._offsets = [],
          this._targets = [],
          this._scrollHeight = this._getScrollHeight(),
          ee.makeArray(ee(this._selector)).map(function(t) {
              var e, r = Ee.getSelectorFromElement(t);
              if (r && (e = ee(r)[0]),
              e) {
                  var s = e.getBoundingClientRect();
                  if (s.width || s.height)
                      return [ee(e)[i]().top + n, r]
              }
              return null
          }).filter(function(t) {
              return t
          }).sort(function(t, e) {
              return t[0] - e[0]
          }).forEach(function(e) {
              t._offsets.push(e[0]),
              t._targets.push(e[1])
          })
      }
      ,
      e.dispose = function() {
          ee.removeData(this._element, ne),
          ee(this._scrollElement).off(re),
          this._element = null,
          this._scrollElement = null,
          this._config = null,
          this._selector = null,
          this._offsets = null,
          this._targets = null,
          this._activeTarget = null,
          this._scrollHeight = null
      }
      ,
      e._getConfig = function(t) {
          if ("string" != typeof (t = s({}, oe, t)).target) {
              var e = ee(t.target).attr("id");
              e || (e = Ee.getUID(ie),
              ee(t.target).attr("id", e)),
              t.target = "#" + e
          }
          return Ee.typeCheckConfig(ie, t, ae),
          t
      }
      ,
      e._getScrollTop = function() {
          return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop
      }
      ,
      e._getScrollHeight = function() {
          return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
      }
      ,
      e._getOffsetHeight = function() {
          return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height
      }
      ,
      e._process = function() {
          var t = this._getScrollTop() + this._config.offset
            , e = this._getScrollHeight()
            , i = this._config.offset + e - this._getOffsetHeight();
          if (this._scrollHeight !== e && this.refresh(),
          i <= t) {
              var n = this._targets[this._targets.length - 1];
              this._activeTarget !== n && this._activate(n)
          } else {
              if (this._activeTarget && t < this._offsets[0] && 0 < this._offsets[0])
                  return this._activeTarget = null,
                  void this._clear();
              for (var r = this._offsets.length; r--; )
                  this._activeTarget !== this._targets[r] && t >= this._offsets[r] && (void 0 === this._offsets[r + 1] || t < this._offsets[r + 1]) && this._activate(this._targets[r])
          }
      }
      ,
      e._activate = function(t) {
          this._activeTarget = t,
          this._clear();
          var e = this._selector.split(",");
          e = e.map(function(e) {
              return e + '[data-target="' + t + '"],' + e + '[href="' + t + '"]'
          });
          var i = ee(e.join(","));
          i.hasClass("dropdown-item") ? (i.closest(he.DROPDOWN).find(he.DROPDOWN_TOGGLE).addClass(ue),
          i.addClass(ue)) : (i.addClass(ue),
          i.parents(he.NAV_LIST_GROUP).prev(he.NAV_LINKS + ", " + he.LIST_ITEMS).addClass(ue),
          i.parents(he.NAV_LIST_GROUP).prev(he.NAV_ITEMS).children(he.NAV_LINKS).addClass(ue)),
          ee(this._scrollElement).trigger(le.ACTIVATE, {
              relatedTarget: t
          })
      }
      ,
      e._clear = function() {
          ee(this._selector).filter(he.ACTIVE).removeClass(ue)
      }
      ,
      t._jQueryInterface = function(e) {
          return this.each(function() {
              var i = ee(this).data(ne);
              if (i || (i = new t(this,"object" == typeof e && e),
              ee(this).data(ne, i)),
              "string" == typeof e) {
                  if (void 0 === i[e])
                      throw new TypeError('No method named "' + e + '"');
                  i[e]()
              }
          })
      }
      ,
      r(t, null, [{
          key: "VERSION",
          get: function() {
              return "4.1.0"
          }
      }, {
          key: "Default",
          get: function() {
              return oe
          }
      }]),
      t
  }(),
  ee(window).on(le.LOAD_DATA_API, function() {
      for (var t = ee.makeArray(ee(he.DATA_SPY)), e = t.length; e--; ) {
          var i = ee(t[e]);
          de._jQueryInterface.call(i, i.data())
      }
  }),
  ee.fn[ie] = de._jQueryInterface,
  ee.fn[ie].Constructor = de,
  ee.fn[ie].noConflict = function() {
      return ee.fn[ie] = se,
      de._jQueryInterface
  }
  ,
  de), Pe = (me = "." + (pe = "bs.tab"),
  ge = (fe = e).fn.tab,
  ve = {
      HIDE: "hide" + me,
      HIDDEN: "hidden" + me,
      SHOW: "show" + me,
      SHOWN: "shown" + me,
      CLICK_DATA_API: "click" + me + ".data-api"
  },
  "dropdown-menu",
  _e = "active",
  "disabled",
  "fade",
  "show",
  ".dropdown",
  ".nav, .list-group",
  ye = ".active",
  be = "> li > .active",
  '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
  ".dropdown-toggle",
  "> .dropdown-menu .active",
  we = function() {
      function t(t) {
          this._element = t
      }
      var e = t.prototype;
      return e.show = function() {
          var t = this;
          if (!(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && fe(this._element).hasClass(_e) || fe(this._element).hasClass("disabled"))) {
              var e, i, n = fe(this._element).closest(".nav, .list-group")[0], r = Ee.getSelectorFromElement(this._element);
              if (n) {
                  var s = "UL" === n.nodeName ? be : ye;
                  i = (i = fe.makeArray(fe(n).find(s)))[i.length - 1]
              }
              var o = fe.Event(ve.HIDE, {
                  relatedTarget: this._element
              })
                , a = fe.Event(ve.SHOW, {
                  relatedTarget: i
              });
              if (i && fe(i).trigger(o),
              fe(this._element).trigger(a),
              !a.isDefaultPrevented() && !o.isDefaultPrevented()) {
                  r && (e = fe(r)[0]),
                  this._activate(this._element, n);
                  var l = function() {
                      var e = fe.Event(ve.HIDDEN, {
                          relatedTarget: t._element
                      })
                        , n = fe.Event(ve.SHOWN, {
                          relatedTarget: i
                      });
                      fe(i).trigger(e),
                      fe(t._element).trigger(n)
                  };
                  e ? this._activate(e, e.parentNode, l) : l()
              }
          }
      }
      ,
      e.dispose = function() {
          fe.removeData(this._element, pe),
          this._element = null
      }
      ,
      e._activate = function(t, e, i) {
          var n = this
            , r = ("UL" === e.nodeName ? fe(e).find(be) : fe(e).children(ye))[0]
            , s = i && r && fe(r).hasClass("fade")
            , o = function() {
              return n._transitionComplete(t, r, i)
          };
          if (r && s) {
              var a = Ee.getTransitionDurationFromElement(r);
              fe(r).one(Ee.TRANSITION_END, o).emulateTransitionEnd(a)
          } else
              o()
      }
      ,
      e._transitionComplete = function(t, e, i) {
          if (e) {
              fe(e).removeClass("show " + _e);
              var n = fe(e.parentNode).find("> .dropdown-menu .active")[0];
              n && fe(n).removeClass(_e),
              "tab" === e.getAttribute("role") && e.setAttribute("aria-selected", !1)
          }
          if (fe(t).addClass(_e),
          "tab" === t.getAttribute("role") && t.setAttribute("aria-selected", !0),
          Ee.reflow(t),
          fe(t).addClass("show"),
          t.parentNode && fe(t.parentNode).hasClass("dropdown-menu")) {
              var r = fe(t).closest(".dropdown")[0];
              r && fe(r).find(".dropdown-toggle").addClass(_e),
              t.setAttribute("aria-expanded", !0)
          }
          i && i()
      }
      ,
      t._jQueryInterface = function(e) {
          return this.each(function() {
              var i = fe(this)
                , n = i.data(pe);
              if (n || (n = new t(this),
              i.data(pe, n)),
              "string" == typeof e) {
                  if (void 0 === n[e])
                      throw new TypeError('No method named "' + e + '"');
                  n[e]()
              }
          })
      }
      ,
      r(t, null, [{
          key: "VERSION",
          get: function() {
              return "4.1.0"
          }
      }]),
      t
  }(),
  fe(document).on(ve.CLICK_DATA_API, '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]', function(t) {
      t.preventDefault(),
      we._jQueryInterface.call(fe(this), "show")
  }),
  fe.fn.tab = we._jQueryInterface,
  fe.fn.tab.Constructor = we,
  fe.fn.tab.noConflict = function() {
      return fe.fn.tab = ge,
      we._jQueryInterface
  }
  ,
  we);
  !function(t) {
      if (void 0 === t)
          throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
      var e = t.fn.jquery.split(" ")[0].split(".");
      if (e[0] < 2 && e[1] < 9 || 1 === e[0] && 9 === e[1] && e[2] < 1 || 4 <= e[0])
          throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")
  }(e),
  t.Util = Ee,
  t.Alert = Ce,
  t.Button = Te,
  t.Carousel = Ae,
  t.Collapse = Ie,
  t.Dropdown = De,
  t.Modal = Se,
  t.Popover = Ne,
  t.Scrollspy = Fe,
  t.Tab = Pe,
  t.Tooltip = Oe,
  Object.defineProperty(t, "__esModule", {
      value: !0
  })
});
var _slice = Array.prototype.slice
, _slicedToArray = function() {
  return function(t, e) {
      if (Array.isArray(t))
          return t;
      if (Symbol.iterator in Object(t))
          return function(t, e) {
              var i = []
                , n = !0
                , r = !1
                , s = void 0;
              try {
                  for (var o, a = t[Symbol.iterator](); !(n = (o = a.next()).done) && (i.push(o.value),
                  !e || i.length !== e); n = !0)
                      ;
              } catch (t) {
                  r = !0,
                  s = t
              } finally {
                  try {
                      !n && a.return && a.return()
                  } finally {
                      if (r)
                          throw s
                  }
              }
              return i
          }(t, e);
      throw new TypeError("Invalid attempt to destructure non-iterable instance")
  }
}()
, _extends = Object.assign || function(t) {
  for (var e = 1; e < arguments.length; e++) {
      var i = arguments[e];
      for (var n in i)
          Object.prototype.hasOwnProperty.call(i, n) && (t[n] = i[n])
  }
  return t
}
;
!function(t, e) {
  "object" == typeof exports && "undefined" != typeof module ? module.exports = e(require("jquery")) : "function" == typeof define && define.amd ? define(["jquery"], e) : t.parsley = e(t.jQuery)
}(this, function(t) {
  "use strict";
  function e(t, e) {
      return t.parsleyAdaptedCallback || (t.parsleyAdaptedCallback = function() {
          var i = Array.prototype.slice.call(arguments, 0);
          i.unshift(this),
          t.apply(e || I, i)
      }
      ),
      t.parsleyAdaptedCallback
  }
  function i(t) {
      return 0 === t.lastIndexOf(S, 0) ? t.substr(S.length) : t
  }
  var n = 1
    , r = {}
    , s = {
      attr: function(t, e, i) {
          var n, r, s, o = new RegExp("^" + e,"i");
          if (void 0 === i)
              i = {};
          else
              for (n in i)
                  i.hasOwnProperty(n) && delete i[n];
          if (!t)
              return i;
          for (n = (s = t.attributes).length; n--; )
              (r = s[n]) && r.specified && o.test(r.name) && (i[this.camelize(r.name.slice(e.length))] = this.deserializeValue(r.value));
          return i
      },
      checkAttr: function(t, e, i) {
          return t.hasAttribute(e + i)
      },
      setAttr: function(t, e, i, n) {
          t.setAttribute(this.dasherize(e + i), String(n))
      },
      getType: function(t) {
          return t.getAttribute("type") || "text"
      },
      generateID: function() {
          return "" + n++
      },
      deserializeValue: function(t) {
          var e;
          try {
              return t ? "true" == t || "false" != t && ("null" == t ? null : isNaN(e = Number(t)) ? /^[\[\{]/.test(t) ? JSON.parse(t) : t : e) : t
          } catch (e) {
              return t
          }
      },
      camelize: function(t) {
          return t.replace(/-+(.)?/g, function(t, e) {
              return e ? e.toUpperCase() : ""
          })
      },
      dasherize: function(t) {
          return t.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
      },
      warn: function() {
          var t;
          window.console && "function" == typeof window.console.warn && (t = window.console).warn.apply(t, arguments)
      },
      warnOnce: function(t) {
          r[t] || (r[t] = !0,
          this.warn.apply(this, arguments))
      },
      _resetWarnings: function() {
          r = {}
      },
      trimString: function(t) {
          return t.replace(/^\s+|\s+$/g, "")
      },
      parse: {
          date: function(t) {
              var e = t.match(/^(\d{4,})-(\d\d)-(\d\d)$/);
              if (!e)
                  return null;
              var i = e.map(function(t) {
                  return parseInt(t, 10)
              })
                , n = _slicedToArray(i, 4)
                , r = (n[0],
              n[1])
                , s = n[2]
                , o = n[3]
                , a = new Date(r,s - 1,o);
              return a.getFullYear() !== r || a.getMonth() + 1 !== s || a.getDate() !== o ? null : a
          },
          string: function(t) {
              return t
          },
          integer: function(t) {
              return isNaN(t) ? null : parseInt(t, 10)
          },
          number: function(t) {
              if (isNaN(t))
                  throw null;
              return parseFloat(t)
          },
          boolean: function(t) {
              return !/^\s*false\s*$/i.test(t)
          },
          object: function(t) {
              return s.deserializeValue(t)
          },
          regexp: function(t) {
              var e = "";
              return /^\/.*\/(?:[gimy]*)$/.test(t) ? (e = t.replace(/.*\/([gimy]*)$/, "$1"),
              t = t.replace(new RegExp("^/(.*?)/" + e + "$"), "$1")) : t = "^" + t + "$",
              new RegExp(t,e)
          }
      },
      parseRequirement: function(t, e) {
          var i = this.parse[t || "string"];
          if (!i)
              throw 'Unknown requirement specification: "' + t + '"';
          var n = i(e);
          if (null === n)
              throw "Requirement is not a " + t + ': "' + e + '"';
          return n
      },
      namespaceEvents: function(e, i) {
          return (e = this.trimString(e || "").split(/\s+/))[0] ? t.map(e, function(t) {
              return t + "." + i
          }).join(" ") : ""
      },
      difference: function(e, i) {
          var n = [];
          return t.each(e, function(t, e) {
              -1 == i.indexOf(e) && n.push(e)
          }),
          n
      },
      all: function(e) {
          return t.when.apply(t, _toConsumableArray(e).concat([42, 42]))
      },
      objectCreate: Object.create || function() {
          var t = function() {};
          return function(e) {
              if (arguments.length > 1)
                  throw Error("Second argument not supported");
              if ("object" != typeof e)
                  throw TypeError("Argument must be an object");
              t.prototype = e;
              var i = new t;
              return t.prototype = null,
              i
          }
      }(),
      _SubmitSelector: 'input[type="submit"], button:submit'
  }
    , o = {
      namespace: "data-parsley-",
      inputs: "input, textarea, select",
      excluded: "input[type=button], input[type=submit], input[type=reset], input[type=hidden]",
      priorityEnabled: !0,
      multiple: null,
      group: null,
      uiEnabled: !0,
      validationThreshold: 3,
      focus: "first",
      trigger: !1,
      triggerAfterFailure: "input",
      errorClass: "parsley-error",
      successClass: "parsley-success",
      classHandler: function(t) {},
      errorsContainer: function(t) {},
      errorsWrapper: '<ul class="parsley-errors-list"></ul>',
      errorTemplate: "<li></li>"
  }
    , a = function() {
      this.__id__ = s.generateID()
  };
  a.prototype = {
      asyncSupport: !0,
      _pipeAccordingToValidationResult: function() {
          var e = this
            , i = function() {
              var i = t.Deferred();
              return !0 !== e.validationResult && i.reject(),
              i.resolve().promise()
          };
          return [i, i]
      },
      actualizeOptions: function() {
          return s.attr(this.element, this.options.namespace, this.domOptions),
          this.parent && this.parent.actualizeOptions && this.parent.actualizeOptions(),
          this
      },
      _resetOptions: function(t) {
          for (var e in this.domOptions = s.objectCreate(this.parent.options),
          this.options = s.objectCreate(this.domOptions),
          t)
              t.hasOwnProperty(e) && (this.options[e] = t[e]);
          this.actualizeOptions()
      },
      _listeners: null,
      on: function(t, e) {
          return this._listeners = this._listeners || {},
          (this._listeners[t] = this._listeners[t] || []).push(e),
          this
      },
      subscribe: function(e, i) {
          t.listenTo(this, e.toLowerCase(), i)
      },
      off: function(t, e) {
          var i = this._listeners && this._listeners[t];
          if (i)
              if (e)
                  for (var n = i.length; n--; )
                      i[n] === e && i.splice(n, 1);
              else
                  delete this._listeners[t];
          return this
      },
      unsubscribe: function(e, i) {
          t.unsubscribeTo(this, e.toLowerCase())
      },
      trigger: function(t, e, i) {
          e = e || this;
          var n, r = this._listeners && this._listeners[t];
          if (r)
              for (var s = r.length; s--; )
                  if (!1 === (n = r[s].call(e, e, i)))
                      return n;
          return !this.parent || this.parent.trigger(t, e, i)
      },
      asyncIsValid: function(t, e) {
          return s.warnOnce("asyncIsValid is deprecated; please use whenValid instead"),
          this.whenValid({
              group: t,
              force: e
          })
      },
      _findRelated: function() {
          return this.options.multiple ? t(this.parent.element.querySelectorAll("[" + this.options.namespace + 'multiple="' + this.options.multiple + '"]')) : this.$element
      }
  };
  var l = function(e) {
      t.extend(!0, this, e)
  };
  l.prototype = {
      validate: function(t, e) {
          if (this.fn)
              return arguments.length > 3 && (e = [].slice.call(arguments, 1, -1)),
              this.fn(t, e);
          if (Array.isArray(t)) {
              if (!this.validateMultiple)
                  throw "Validator `" + this.name + "` does not handle multiple values";
              return this.validateMultiple.apply(this, arguments)
          }
          var i = arguments[arguments.length - 1];
          if (this.validateDate && i._isDateInput())
              return arguments[0] = s.parse.date(arguments[0]),
              null !== arguments[0] && this.validateDate.apply(this, arguments);
          if (this.validateNumber)
              return !isNaN(t) && (arguments[0] = parseFloat(arguments[0]),
              this.validateNumber.apply(this, arguments));
          if (this.validateString)
              return this.validateString.apply(this, arguments);
          throw "Validator `" + this.name + "` only handles multiple values"
      },
      parseRequirements: function(e, i) {
          if ("string" != typeof e)
              return Array.isArray(e) ? e : [e];
          var n = this.requirementType;
          if (Array.isArray(n)) {
              for (var r = function(t, e) {
                  var i = t.match(/^\s*\[(.*)\]\s*$/);
                  if (!i)
                      throw 'Requirement is not an array: "' + t + '"';
                  var n = i[1].split(",").map(s.trimString);
                  if (n.length !== e)
                      throw "Requirement has " + n.length + " values when " + e + " are needed";
                  return n
              }(e, n.length), o = 0; o < r.length; o++)
                  r[o] = s.parseRequirement(n[o], r[o]);
              return r
          }
          return t.isPlainObject(n) ? function(t, e, i) {
              var n = null
                , r = {};
              for (var o in t)
                  if (o) {
                      var a = i(o);
                      "string" == typeof a && (a = s.parseRequirement(t[o], a)),
                      r[o] = a
                  } else
                      n = s.parseRequirement(t[o], e);
              return [n, r]
          }(n, e, i) : [s.parseRequirement(n, e)]
      },
      requirementType: "string",
      priority: 2
  };
  var u = function(t, e) {
      this.__class__ = "ValidatorRegistry",
      this.locale = "en",
      this.init(t || {}, e || {})
  }
    , h = {
      email: /^((([a-zA-Z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-zA-Z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/,
      number: /^-?(\d*\.)?\d+(e[-+]?\d+)?$/i,
      integer: /^-?\d+$/,
      digits: /^\d+$/,
      alphanum: /^\w+$/i,
      date: {
          test: function(t) {
              return null !== s.parse.date(t)
          }
      },
      url: new RegExp("^(?:(?:https?|ftp)://)?(?:\\S+(?::\\S*)?@)?(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-zA-Z\\u00a1-\\uffff0-9]-*)*[a-zA-Z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-zA-Z\\u00a1-\\uffff0-9]-*)*[a-zA-Z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-zA-Z\\u00a1-\\uffff]{2,})))(?::\\d{2,5})?(?:/\\S*)?$")
  };
  h.range = h.number;
  var c = function(t) {
      var e = ("" + t).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
      return e ? Math.max(0, (e[1] ? e[1].length : 0) - (e[2] ? +e[2] : 0)) : 0
  }
    , d = function(t, e) {
      return function(i) {
          for (var n = arguments.length, r = Array(n > 1 ? n - 1 : 0), o = 1; o < n; o++)
              r[o - 1] = arguments[o];
          return r.pop(),
          e.apply(void 0, [i].concat(_toConsumableArray(function(t, e) {
              return e.map(s.parse[t])
          }(t, r))))
      }
  }
    , f = function(t) {
      return {
          validateDate: d("date", t),
          validateNumber: d("number", t),
          requirementType: t.length <= 2 ? "string" : ["string", "string"],
          priority: 30
      }
  };
  u.prototype = {
      init: function(t, e) {
          for (var i in this.catalog = e,
          this.validators = _extends({}, this.validators),
          t)
              this.addValidator(i, t[i].fn, t[i].priority);
          window.Parsley.trigger("parsley:validator:init")
      },
      setLocale: function(t) {
          if (void 0 === this.catalog[t])
              throw new Error(t + " is not available in the catalog");
          return this.locale = t,
          this
      },
      addCatalog: function(t, e, i) {
          return "object" == typeof e && (this.catalog[t] = e),
          !0 === i ? this.setLocale(t) : this
      },
      addMessage: function(t, e, i) {
          return void 0 === this.catalog[t] && (this.catalog[t] = {}),
          this.catalog[t][e] = i,
          this
      },
      addMessages: function(t, e) {
          for (var i in e)
              this.addMessage(t, i, e[i]);
          return this
      },
      addValidator: function(t, e, i) {
          if (this.validators[t])
              s.warn('Validator "' + t + '" is already defined.');
          else if (o.hasOwnProperty(t))
              return void s.warn('"' + t + '" is a restricted keyword and is not a valid validator name.');
          return this._setValidator.apply(this, arguments)
      },
      hasValidator: function(t) {
          return !!this.validators[t]
      },
      updateValidator: function(t, e, i) {
          return this.validators[t] ? this._setValidator.apply(this, arguments) : (s.warn('Validator "' + t + '" is not already defined.'),
          this.addValidator.apply(this, arguments))
      },
      removeValidator: function(t) {
          return this.validators[t] || s.warn('Validator "' + t + '" is not defined.'),
          delete this.validators[t],
          this
      },
      _setValidator: function(t, e, i) {
          for (var n in "object" != typeof e && (e = {
              fn: e,
              priority: i
          }),
          e.validate || (e = new l(e)),
          this.validators[t] = e,
          e.messages || {})
              this.addMessage(n, t, e.messages[n]);
          return this
      },
      getErrorMessage: function(t) {
          var e;
          "type" === t.name ? e = (this.catalog[this.locale][t.name] || {})[t.requirements] : e = this.formatMessage(this.catalog[this.locale][t.name], t.requirements);
          return e || this.catalog[this.locale].defaultMessage || this.catalog.en.defaultMessage
      },
      formatMessage: function(t, e) {
          if ("object" == typeof e) {
              for (var i in e)
                  t = this.formatMessage(t, e[i]);
              return t
          }
          return "string" == typeof t ? t.replace(/%s/i, e) : ""
      },
      validators: {
          notblank: {
              validateString: function(t) {
                  return /\S/.test(t)
              },
              priority: 2
          },
          required: {
              validateMultiple: function(t) {
                  return t.length > 0
              },
              validateString: function(t) {
                  return /\S/.test(t)
              },
              priority: 512
          },
          type: {
              validateString: function(t, e) {
                  var i = arguments.length <= 2 || void 0 === arguments[2] ? {} : arguments[2]
                    , n = i.step
                    , r = void 0 === n ? "any" : n
                    , s = i.base
                    , o = void 0 === s ? 0 : s
                    , a = h[e];
                  if (!a)
                      throw new Error("validator type `" + e + "` is not supported");
                  if (!a.test(t))
                      return !1;
                  if ("number" === e && !/^any$/i.test(r || "")) {
                      var l = Number(t)
                        , u = Math.max(c(r), c(o));
                      if (c(l) > u)
                          return !1;
                      var d = function(t) {
                          return Math.round(t * Math.pow(10, u))
                      };
                      if ((d(l) - d(o)) % d(r) != 0)
                          return !1
                  }
                  return !0
              },
              requirementType: {
                  "": "string",
                  step: "string",
                  base: "number"
              },
              priority: 256
          },
          pattern: {
              validateString: function(t, e) {
                  return e.test(t)
              },
              requirementType: "regexp",
              priority: 64
          },
          minlength: {
              validateString: function(t, e) {
                  return t.length >= e
              },
              requirementType: "integer",
              priority: 30
          },
          maxlength: {
              validateString: function(t, e) {
                  return t.length <= e
              },
              requirementType: "integer",
              priority: 30
          },
          length: {
              validateString: function(t, e, i) {
                  return t.length >= e && t.length <= i
              },
              requirementType: ["integer", "integer"],
              priority: 30
          },
          mincheck: {
              validateMultiple: function(t, e) {
                  return t.length >= e
              },
              requirementType: "integer",
              priority: 30
          },
          maxcheck: {
              validateMultiple: function(t, e) {
                  return t.length <= e
              },
              requirementType: "integer",
              priority: 30
          },
          check: {
              validateMultiple: function(t, e, i) {
                  return t.length >= e && t.length <= i
              },
              requirementType: ["integer", "integer"],
              priority: 30
          },
          min: f(function(t, e) {
              return t >= e
          }),
          max: f(function(t, e) {
              return t <= e
          }),
          range: f(function(t, e, i) {
              return t >= e && t <= i
          }),
          equalto: {
              validateString: function(e, i) {
                  var n = t(i);
                  return n.length ? e === n.val() : e === i
              },
              priority: 256
          }
      }
  };
  var p = {};
  p.Form = {
      _actualizeTriggers: function() {
          var t = this;
          this.$element.on("submit.Parsley", function(e) {
              t.onSubmitValidate(e)
          }),
          this.$element.on("click.Parsley", s._SubmitSelector, function(e) {
              t.onSubmitButton(e)
          }),
          !1 !== this.options.uiEnabled && this.element.setAttribute("novalidate", "")
      },
      focus: function() {
          if (this._focusedField = null,
          !0 === this.validationResult || "none" === this.options.focus)
              return null;
          for (var t = 0; t < this.fields.length; t++) {
              var e = this.fields[t];
              if (!0 !== e.validationResult && e.validationResult.length > 0 && void 0 === e.options.noFocus && (this._focusedField = e.$element,
              "first" === this.options.focus))
                  break
          }
          return null === this._focusedField ? null : this._focusedField.focus()
      },
      _destroyUI: function() {
          this.$element.off(".Parsley")
      }
  },
  p.Field = {
      _reflowUI: function() {
          if (this._buildUI(),
          this._ui) {
              var t = function t(e, i, n) {
                  for (var r = [], s = [], o = 0; o < e.length; o++) {
                      for (var a = !1, l = 0; l < i.length; l++)
                          if (e[o].assert.name === i[l].assert.name) {
                              a = !0;
                              break
                          }
                      a ? s.push(e[o]) : r.push(e[o])
                  }
                  return {
                      kept: s,
                      added: r,
                      removed: n ? [] : t(i, e, !0).added
                  }
              }(this.validationResult, this._ui.lastValidationResult);
              this._ui.lastValidationResult = this.validationResult,
              this._manageStatusClass(),
              this._manageErrorsMessages(t),
              this._actualizeTriggers(),
              !t.kept.length && !t.added.length || this._failedOnce || (this._failedOnce = !0,
              this._actualizeTriggers())
          }
      },
      getErrorsMessages: function() {
          if (!0 === this.validationResult)
              return [];
          for (var t = [], e = 0; e < this.validationResult.length; e++)
              t.push(this.validationResult[e].errorMessage || this._getErrorMessage(this.validationResult[e].assert));
          return t
      },
      addError: function(t) {
          var e = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1]
            , i = e.message
            , n = e.assert
            , r = e.updateClass
            , s = void 0 === r || r;
          this._buildUI(),
          this._addError(t, {
              message: i,
              assert: n
          }),
          s && this._errorClass()
      },
      updateError: function(t) {
          var e = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1]
            , i = e.message
            , n = e.assert
            , r = e.updateClass
            , s = void 0 === r || r;
          this._buildUI(),
          this._updateError(t, {
              message: i,
              assert: n
          }),
          s && this._errorClass()
      },
      removeError: function(t) {
          var e = (arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1]).updateClass
            , i = void 0 === e || e;
          this._buildUI(),
          this._removeError(t),
          i && this._manageStatusClass()
      },
      _manageStatusClass: function() {
          this.hasConstraints() && this.needsValidation() && !0 === this.validationResult ? this._successClass() : this.validationResult.length > 0 ? this._errorClass() : this._resetClass()
      },
      _manageErrorsMessages: function(e) {
          if (void 0 === this.options.errorsMessagesDisabled) {
              if (void 0 !== this.options.errorMessage)
                  return e.added.length || e.kept.length ? (this._insertErrorWrapper(),
                  0 === this._ui.$errorsWrapper.find(".parsley-custom-error-message").length && this._ui.$errorsWrapper.append(t(this.options.errorTemplate).addClass("parsley-custom-error-message")),
                  this._ui.$errorsWrapper.addClass("filled").find(".parsley-custom-error-message").html(this.options.errorMessage)) : this._ui.$errorsWrapper.removeClass("filled").find(".parsley-custom-error-message").remove();
              for (var i = 0; i < e.removed.length; i++)
                  this._removeError(e.removed[i].assert.name);
              for (i = 0; i < e.added.length; i++)
                  this._addError(e.added[i].assert.name, {
                      message: e.added[i].errorMessage,
                      assert: e.added[i].assert
                  });
              for (i = 0; i < e.kept.length; i++)
                  this._updateError(e.kept[i].assert.name, {
                      message: e.kept[i].errorMessage,
                      assert: e.kept[i].assert
                  })
          }
      },
      _addError: function(e, i) {
          var n = i.message
            , r = i.assert;
          this._insertErrorWrapper(),
          this._ui.$errorClassHandler.attr("aria-describedby", this._ui.errorsWrapperId),
          this._ui.$errorsWrapper.addClass("filled").append(t(this.options.errorTemplate).addClass("parsley-" + e).html(n || this._getErrorMessage(r)))
      },
      _updateError: function(t, e) {
          var i = e.message
            , n = e.assert;
          this._ui.$errorsWrapper.addClass("filled").find(".parsley-" + t).html(i || this._getErrorMessage(n))
      },
      _removeError: function(t) {
          this._ui.$errorClassHandler.removeAttr("aria-describedby"),
          this._ui.$errorsWrapper.removeClass("filled").find(".parsley-" + t).remove()
      },
      _getErrorMessage: function(t) {
          var e = t.name + "Message";
          return void 0 !== this.options[e] ? window.Parsley.formatMessage(this.options[e], t.requirements) : window.Parsley.getErrorMessage(t)
      },
      _buildUI: function() {
          if (!this._ui && !1 !== this.options.uiEnabled) {
              var e = {};
              this.element.setAttribute(this.options.namespace + "id", this.__id__),
              e.$errorClassHandler = this._manageClassHandler(),
              e.errorsWrapperId = "parsley-id-" + (this.options.multiple ? "multiple-" + this.options.multiple : this.__id__),
              e.$errorsWrapper = t(this.options.errorsWrapper).attr("id", e.errorsWrapperId),
              e.lastValidationResult = [],
              e.validationInformationVisible = !1,
              this._ui = e
          }
      },
      _manageClassHandler: function() {
          if ("string" == typeof this.options.classHandler && t(this.options.classHandler).length)
              return t(this.options.classHandler);
          var e = this.options.classHandler;
          if ("string" == typeof this.options.classHandler && "function" == typeof window[this.options.classHandler] && (e = window[this.options.classHandler]),
          "function" == typeof e) {
              var i = e.call(this, this);
              if (void 0 !== i && i.length)
                  return i
          } else {
              if ("object" == typeof e && e instanceof jQuery && e.length)
                  return e;
              e && s.warn("The class handler `" + e + "` does not exist in DOM nor as a global JS function")
          }
          return this._inputHolder()
      },
      _inputHolder: function() {
          return this.options.multiple && "SELECT" !== this.element.nodeName ? this.$element.parent() : this.$element
      },
      _insertErrorWrapper: function() {
          var e = this.options.errorsContainer;
          if (0 !== this._ui.$errorsWrapper.parent().length)
              return this._ui.$errorsWrapper.parent();
          if ("string" == typeof e) {
              if (t(e).length)
                  return t(e).append(this._ui.$errorsWrapper);
              "function" == typeof window[e] ? e = window[e] : s.warn("The errors container `" + e + "` does not exist in DOM nor as a global JS function")
          }
          return "function" == typeof e && (e = e.call(this, this)),
          "object" == typeof e && e.length ? e.append(this._ui.$errorsWrapper) : this._inputHolder().after(this._ui.$errorsWrapper)
      },
      _actualizeTriggers: function() {
          var t, e = this, i = this._findRelated();
          i.off(".Parsley"),
          this._failedOnce ? i.on(s.namespaceEvents(this.options.triggerAfterFailure, "Parsley"), function() {
              e._validateIfNeeded()
          }) : (t = s.namespaceEvents(this.options.trigger, "Parsley")) && i.on(t, function(t) {
              e._validateIfNeeded(t)
          })
      },
      _validateIfNeeded: function(t) {
          var e = this;
          t && /key|input/.test(t.type) && (!this._ui || !this._ui.validationInformationVisible) && this.getValue().length <= this.options.validationThreshold || (this.options.debounce ? (window.clearTimeout(this._debounced),
          this._debounced = window.setTimeout(function() {
              return e.validate()
          }, this.options.debounce)) : this.validate())
      },
      _resetUI: function() {
          this._failedOnce = !1,
          this._actualizeTriggers(),
          void 0 !== this._ui && (this._ui.$errorsWrapper.removeClass("filled").children().remove(),
          this._resetClass(),
          this._ui.lastValidationResult = [],
          this._ui.validationInformationVisible = !1)
      },
      _destroyUI: function() {
          this._resetUI(),
          void 0 !== this._ui && this._ui.$errorsWrapper.remove(),
          delete this._ui
      },
      _successClass: function() {
          this._ui.validationInformationVisible = !0,
          this._ui.$errorClassHandler.removeClass(this.options.errorClass).addClass(this.options.successClass)
      },
      _errorClass: function() {
          this._ui.validationInformationVisible = !0,
          this._ui.$errorClassHandler.removeClass(this.options.successClass).addClass(this.options.errorClass)
      },
      _resetClass: function() {
          this._ui.$errorClassHandler.removeClass(this.options.successClass).removeClass(this.options.errorClass)
      }
  };
  var m = function(e, i, n) {
      this.__class__ = "Form",
      this.element = e,
      this.$element = t(e),
      this.domOptions = i,
      this.options = n,
      this.parent = window.Parsley,
      this.fields = [],
      this.validationResult = null
  }
    , g = {
      pending: null,
      resolved: !0,
      rejected: !1
  };
  m.prototype = {
      onSubmitValidate: function(t) {
          var e = this;
          if (!0 !== t.parsley) {
              var i = this._submitSource || this.$element.find(s._SubmitSelector)[0];
              if (this._submitSource = null,
              this.$element.find(".parsley-synthetic-submit-button").prop("disabled", !0),
              !i || null === i.getAttribute("formnovalidate")) {
                  window.Parsley._remoteCache = {};
                  var n = this.whenValidate({
                      event: t
                  });
                  "resolved" === n.state() && !1 !== this._trigger("submit") || (t.stopImmediatePropagation(),
                  t.preventDefault(),
                  "pending" === n.state() && n.done(function() {
                      e._submit(i)
                  }))
              }
          }
      },
      onSubmitButton: function(t) {
          this._submitSource = t.currentTarget
      },
      _submit: function(e) {
          if (!1 !== this._trigger("submit")) {
              if (e) {
                  var i = this.$element.find(".parsley-synthetic-submit-button").prop("disabled", !1);
                  0 === i.length && (i = t('<input class="parsley-synthetic-submit-button" type="hidden">').appendTo(this.$element)),
                  i.attr({
                      name: e.getAttribute("name"),
                      value: e.getAttribute("value")
                  })
              }
              this.$element.trigger(_extends(t.Event("submit"), {
                  parsley: !0
              }))
          }
      },
      validate: function(e) {
          if (arguments.length >= 1 && !t.isPlainObject(e)) {
              s.warnOnce("Calling validate on a parsley form without passing arguments as an object is deprecated.");
              var i = _slice.call(arguments);
              e = {
                  group: i[0],
                  force: i[1],
                  event: i[2]
              }
          }
          return g[this.whenValidate(e).state()]
      },
      whenValidate: function() {
          var e, i = this, n = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0], r = n.group, o = n.force, a = n.event;
          this.submitEvent = a,
          a && (this.submitEvent = _extends({}, a, {
              preventDefault: function() {
                  s.warnOnce("Using `this.submitEvent.preventDefault()` is deprecated; instead, call `this.validationResult = false`"),
                  i.validationResult = !1
              }
          })),
          this.validationResult = !0,
          this._trigger("validate"),
          this._refreshFields();
          var l = this._withoutReactualizingFormOptions(function() {
              return t.map(i.fields, function(t) {
                  return t.whenValidate({
                      force: o,
                      group: r
                  })
              })
          });
          return (e = s.all(l).done(function() {
              i._trigger("success")
          }).fail(function() {
              i.validationResult = !1,
              i.focus(),
              i._trigger("error")
          }).always(function() {
              i._trigger("validated")
          })).pipe.apply(e, _toConsumableArray(this._pipeAccordingToValidationResult()))
      },
      isValid: function(e) {
          if (arguments.length >= 1 && !t.isPlainObject(e)) {
              s.warnOnce("Calling isValid on a parsley form without passing arguments as an object is deprecated.");
              var i = _slice.call(arguments);
              e = {
                  group: i[0],
                  force: i[1]
              }
          }
          return g[this.whenValid(e).state()]
      },
      whenValid: function() {
          var e = this
            , i = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0]
            , n = i.group
            , r = i.force;
          this._refreshFields();
          var o = this._withoutReactualizingFormOptions(function() {
              return t.map(e.fields, function(t) {
                  return t.whenValid({
                      group: n,
                      force: r
                  })
              })
          });
          return s.all(o)
      },
      refresh: function() {
          return this._refreshFields(),
          this
      },
      reset: function() {
          for (var t = 0; t < this.fields.length; t++)
              this.fields[t].reset();
          this._trigger("reset")
      },
      destroy: function() {
          this._destroyUI();
          for (var t = 0; t < this.fields.length; t++)
              this.fields[t].destroy();
          this.$element.removeData("Parsley"),
          this._trigger("destroy")
      },
      _refreshFields: function() {
          return this.actualizeOptions()._bindFields()
      },
      _bindFields: function() {
          var e = this
            , i = this.fields;
          return this.fields = [],
          this.fieldsMappedById = {},
          this._withoutReactualizingFormOptions(function() {
              e.$element.find(e.options.inputs).not(e.options.excluded).each(function(t, i) {
                  var n = new window.Parsley.Factory(i,{},e);
                  if (("Field" === n.__class__ || "FieldMultiple" === n.__class__) && !0 !== n.options.excluded) {
                      var r = n.__class__ + "-" + n.__id__;
                      void 0 === e.fieldsMappedById[r] && (e.fieldsMappedById[r] = n,
                      e.fields.push(n))
                  }
              }),
              t.each(s.difference(i, e.fields), function(t, e) {
                  e.reset()
              })
          }),
          this
      },
      _withoutReactualizingFormOptions: function(t) {
          var e = this.actualizeOptions;
          this.actualizeOptions = function() {
              return this
          }
          ;
          var i = t();
          return this.actualizeOptions = e,
          i
      },
      _trigger: function(t) {
          return this.trigger("form:" + t)
      }
  };
  var v = function(t, e, i, n, r) {
      var s = window.Parsley._validatorRegistry.validators[e]
        , o = new l(s);
      n = n || t.options[e + "Priority"] || o.priority,
      _extends(this, {
          validator: o,
          name: e,
          requirements: i,
          priority: n,
          isDomConstraint: r = !0 === r
      }),
      this._parseRequirements(t.options)
  };
  v.prototype = {
      validate: function(t, e) {
          var i;
          return (i = this.validator).validate.apply(i, [t].concat(_toConsumableArray(this.requirementList), [e]))
      },
      _parseRequirements: function(t) {
          var e = this;
          this.requirementList = this.validator.parseRequirements(this.requirements, function(i) {
              return t[e.name + function(t) {
                  return t[0].toUpperCase() + t.slice(1)
              }(i)]
          })
      }
  };
  var _ = function(e, i, n, r) {
      this.__class__ = "Field",
      this.element = e,
      this.$element = t(e),
      void 0 !== r && (this.parent = r),
      this.options = n,
      this.domOptions = i,
      this.constraints = [],
      this.constraintsByName = {},
      this.validationResult = !0,
      this._bindConstraints()
  }
    , y = {
      pending: null,
      resolved: !0,
      rejected: !1
  };
  _.prototype = {
      validate: function(e) {
          arguments.length >= 1 && !t.isPlainObject(e) && (s.warnOnce("Calling validate on a parsley field without passing arguments as an object is deprecated."),
          e = {
              options: e
          });
          var i = this.whenValidate(e);
          if (!i)
              return !0;
          switch (i.state()) {
          case "pending":
              return null;
          case "resolved":
              return !0;
          case "rejected":
              return this.validationResult
          }
      },
      whenValidate: function() {
          var t, e = this, i = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0], n = i.force, r = i.group;
          if (this.refresh(),
          !r || this._isInGroup(r))
              return this.value = this.getValue(),
              this._trigger("validate"),
              (t = this.whenValid({
                  force: n,
                  value: this.value,
                  _refreshed: !0
              }).always(function() {
                  e._reflowUI()
              }).done(function() {
                  e._trigger("success")
              }).fail(function() {
                  e._trigger("error")
              }).always(function() {
                  e._trigger("validated")
              })).pipe.apply(t, _toConsumableArray(this._pipeAccordingToValidationResult()))
      },
      hasConstraints: function() {
          return 0 !== this.constraints.length
      },
      needsValidation: function(t) {
          return void 0 === t && (t = this.getValue()),
          !(!t.length && !this._isRequired() && void 0 === this.options.validateIfEmpty)
      },
      _isInGroup: function(e) {
          return Array.isArray(this.options.group) ? -1 !== t.inArray(e, this.options.group) : this.options.group === e
      },
      isValid: function(e) {
          if (arguments.length >= 1 && !t.isPlainObject(e)) {
              s.warnOnce("Calling isValid on a parsley field without passing arguments as an object is deprecated.");
              var i = _slice.call(arguments);
              e = {
                  force: i[0],
                  value: i[1]
              }
          }
          var n = this.whenValid(e);
          return !n || y[n.state()]
      },
      whenValid: function() {
          var e = this
            , i = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0]
            , n = i.force
            , r = void 0 !== n && n
            , o = i.value
            , a = i.group;
          if (i._refreshed || this.refresh(),
          !a || this._isInGroup(a)) {
              if (this.validationResult = !0,
              !this.hasConstraints())
                  return t.when();
              if (null != o || (o = this.getValue()),
              !this.needsValidation(o) && !0 !== r)
                  return t.when();
              var l = this._getGroupedConstraints()
                , u = [];
              return t.each(l, function(i, n) {
                  var r = s.all(t.map(n, function(t) {
                      return e._validateConstraint(o, t)
                  }));
                  if (u.push(r),
                  "rejected" === r.state())
                      return !1
              }),
              s.all(u)
          }
      },
      _validateConstraint: function(e, i) {
          var n = this
            , r = i.validate(e, this);
          return !1 === r && (r = t.Deferred().reject()),
          s.all([r]).fail(function(t) {
              n.validationResult instanceof Array || (n.validationResult = []),
              n.validationResult.push({
                  assert: i,
                  errorMessage: "string" == typeof t && t
              })
          })
      },
      getValue: function() {
          var t;
          return null == (t = "function" == typeof this.options.value ? this.options.value(this) : void 0 !== this.options.value ? this.options.value : this.$element.val()) ? "" : this._handleWhitespace(t)
      },
      reset: function() {
          return this._resetUI(),
          this._trigger("reset")
      },
      destroy: function() {
          this._destroyUI(),
          this.$element.removeData("Parsley"),
          this.$element.removeData("FieldMultiple"),
          this._trigger("destroy")
      },
      refresh: function() {
          return this._refreshConstraints(),
          this
      },
      _refreshConstraints: function() {
          return this.actualizeOptions()._bindConstraints()
      },
      refreshConstraints: function() {
          return s.warnOnce("Parsley's refreshConstraints is deprecated. Please use refresh"),
          this.refresh()
      },
      addConstraint: function(t, e, i, n) {
          if (window.Parsley._validatorRegistry.validators[t]) {
              var r = new v(this,t,e,i,n);
              "undefined" !== this.constraintsByName[r.name] && this.removeConstraint(r.name),
              this.constraints.push(r),
              this.constraintsByName[r.name] = r
          }
          return this
      },
      removeConstraint: function(t) {
          for (var e = 0; e < this.constraints.length; e++)
              if (t === this.constraints[e].name) {
                  this.constraints.splice(e, 1);
                  break
              }
          return delete this.constraintsByName[t],
          this
      },
      updateConstraint: function(t, e, i) {
          return this.removeConstraint(t).addConstraint(t, e, i)
      },
      _bindConstraints: function() {
          for (var t = [], e = {}, i = 0; i < this.constraints.length; i++)
              !1 === this.constraints[i].isDomConstraint && (t.push(this.constraints[i]),
              e[this.constraints[i].name] = this.constraints[i]);
          for (var n in this.constraints = t,
          this.constraintsByName = e,
          this.options)
              this.addConstraint(n, this.options[n], void 0, !0);
          return this._bindHtml5Constraints()
      },
      _bindHtml5Constraints: function() {
          null !== this.element.getAttribute("required") && this.addConstraint("required", !0, void 0, !0),
          null !== this.element.getAttribute("pattern") && this.addConstraint("pattern", this.element.getAttribute("pattern"), void 0, !0);
          var t = this.element.getAttribute("min")
            , e = this.element.getAttribute("max");
          null !== t && null !== e ? this.addConstraint("range", [t, e], void 0, !0) : null !== t ? this.addConstraint("min", t, void 0, !0) : null !== e && this.addConstraint("max", e, void 0, !0),
          null !== this.element.getAttribute("minlength") && null !== this.element.getAttribute("maxlength") ? this.addConstraint("length", [this.element.getAttribute("minlength"), this.element.getAttribute("maxlength")], void 0, !0) : null !== this.element.getAttribute("minlength") ? this.addConstraint("minlength", this.element.getAttribute("minlength"), void 0, !0) : null !== this.element.getAttribute("maxlength") && this.addConstraint("maxlength", this.element.getAttribute("maxlength"), void 0, !0);
          var i = s.getType(this.element);
          return "number" === i ? this.addConstraint("type", ["number", {
              step: this.element.getAttribute("step") || "1",
              base: t || this.element.getAttribute("value")
          }], void 0, !0) : /^(email|url|range|date)$/i.test(i) ? this.addConstraint("type", i, void 0, !0) : this
      },
      _isRequired: function() {
          return void 0 !== this.constraintsByName.required && !1 !== this.constraintsByName.required.requirements
      },
      _trigger: function(t) {
          return this.trigger("field:" + t)
      },
      _handleWhitespace: function(t) {
          return !0 === this.options.trimValue && s.warnOnce('data-parsley-trim-value="true" is deprecated, please use data-parsley-whitespace="trim"'),
          "squish" === this.options.whitespace && (t = t.replace(/\s{2,}/g, " ")),
          "trim" !== this.options.whitespace && "squish" !== this.options.whitespace && !0 !== this.options.trimValue || (t = s.trimString(t)),
          t
      },
      _isDateInput: function() {
          var t = this.constraintsByName.type;
          return t && "date" === t.requirements
      },
      _getGroupedConstraints: function() {
          if (!1 === this.options.priorityEnabled)
              return [this.constraints];
          for (var t = [], e = {}, i = 0; i < this.constraints.length; i++) {
              var n = this.constraints[i].priority;
              e[n] || t.push(e[n] = []),
              e[n].push(this.constraints[i])
          }
          return t.sort(function(t, e) {
              return e[0].priority - t[0].priority
          }),
          t
      }
  };
  var b = _
    , w = function() {
      this.__class__ = "FieldMultiple"
  };
  w.prototype = {
      addElement: function(t) {
          return this.$elements.push(t),
          this
      },
      _refreshConstraints: function() {
          var e;
          if (this.constraints = [],
          "SELECT" === this.element.nodeName)
              return this.actualizeOptions()._bindConstraints(),
              this;
          for (var i = 0; i < this.$elements.length; i++)
              if (t("html").has(this.$elements[i]).length) {
                  e = this.$elements[i].data("FieldMultiple")._refreshConstraints().constraints;
                  for (var n = 0; n < e.length; n++)
                      this.addConstraint(e[n].name, e[n].requirements, e[n].priority, e[n].isDomConstraint)
              } else
                  this.$elements.splice(i, 1);
          return this
      },
      getValue: function() {
          if ("function" == typeof this.options.value)
              return this.options.value(this);
          if (void 0 !== this.options.value)
              return this.options.value;
          if ("INPUT" === this.element.nodeName) {
              var e = s.getType(this.element);
              if ("radio" === e)
                  return this._findRelated().filter(":checked").val() || "";
              if ("checkbox" === e) {
                  var i = [];
                  return this._findRelated().filter(":checked").each(function() {
                      i.push(t(this).val())
                  }),
                  i
              }
          }
          return "SELECT" === this.element.nodeName && null === this.$element.val() ? [] : this.$element.val()
      },
      _init: function() {
          return this.$elements = [this.$element],
          this
      }
  };
  var E = function(e, i, n) {
      this.element = e,
      this.$element = t(e);
      var r = this.$element.data("Parsley");
      if (r)
          return void 0 !== n && r.parent === window.Parsley && (r.parent = n,
          r._resetOptions(r.options)),
          "object" == typeof i && _extends(r.options, i),
          r;
      if (!this.$element.length)
          throw new Error("You must bind Parsley on an existing element.");
      if (void 0 !== n && "Form" !== n.__class__)
          throw new Error("Parent instance must be a Form instance");
      return this.parent = n || window.Parsley,
      this.init(i)
  };
  E.prototype = {
      init: function(t) {
          return this.__class__ = "Parsley",
          this.__version__ = "2.8.1",
          this.__id__ = s.generateID(),
          this._resetOptions(t),
          "FORM" === this.element.nodeName || s.checkAttr(this.element, this.options.namespace, "validate") && !this.$element.is(this.options.inputs) ? this.bind("parsleyForm") : this.isMultiple() ? this.handleMultiple() : this.bind("parsleyField")
      },
      isMultiple: function() {
          var t = s.getType(this.element);
          return "radio" === t || "checkbox" === t || "SELECT" === this.element.nodeName && null !== this.element.getAttribute("multiple")
      },
      handleMultiple: function() {
          var e, i, n = this;
          if (this.options.multiple = this.options.multiple || (e = this.element.getAttribute("name")) || this.element.getAttribute("id"),
          "SELECT" === this.element.nodeName && null !== this.element.getAttribute("multiple"))
              return this.options.multiple = this.options.multiple || this.__id__,
              this.bind("parsleyFieldMultiple");
          if (!this.options.multiple)
              return s.warn("To be bound by Parsley, a radio, a checkbox and a multiple select input must have either a name or a multiple option.", this.$element),
              this;
          this.options.multiple = this.options.multiple.replace(/(:|\.|\[|\]|\{|\}|\$)/g, ""),
          e && t('input[name="' + e + '"]').each(function(t, e) {
              var i = s.getType(e);
              "radio" !== i && "checkbox" !== i || e.setAttribute(n.options.namespace + "multiple", n.options.multiple)
          });
          for (var r = this._findRelated(), o = 0; o < r.length; o++)
              if (void 0 !== (i = t(r.get(o)).data("Parsley"))) {
                  this.$element.data("FieldMultiple") || i.addElement(this.$element);
                  break
              }
          return this.bind("parsleyField", !0),
          i || this.bind("parsleyFieldMultiple")
      },
      bind: function(e, i) {
          var n;
          switch (e) {
          case "parsleyForm":
              n = t.extend(new m(this.element,this.domOptions,this.options), new a, window.ParsleyExtend)._bindFields();
              break;
          case "parsleyField":
              n = t.extend(new b(this.element,this.domOptions,this.options,this.parent), new a, window.ParsleyExtend);
              break;
          case "parsleyFieldMultiple":
              n = t.extend(new b(this.element,this.domOptions,this.options,this.parent), new w, new a, window.ParsleyExtend)._init();
              break;
          default:
              throw new Error(e + "is not a supported Parsley type")
          }
          return this.options.multiple && s.setAttr(this.element, this.options.namespace, "multiple", this.options.multiple),
          void 0 !== i ? (this.$element.data("FieldMultiple", n),
          n) : (this.$element.data("Parsley", n),
          n._actualizeTriggers(),
          n._trigger("init"),
          n)
      }
  };
  var C = t.fn.jquery.split(".");
  if (parseInt(C[0]) <= 1 && parseInt(C[1]) < 8)
      throw "The loaded version of jQuery is too old. Please upgrade to 1.8.x or better.";
  C.forEach || s.warn("Parsley requires ES5 to run properly. Please include https://github.com/es-shims/es5-shim");
  var T = _extends(new a, {
      element: document,
      $element: t(document),
      actualizeOptions: null,
      _resetOptions: null,
      Factory: E,
      version: "2.8.1"
  });
  _extends(b.prototype, p.Field, a.prototype),
  _extends(m.prototype, p.Form, a.prototype),
  _extends(E.prototype, a.prototype),
  t.fn.parsley = t.fn.psly = function(e) {
      if (this.length > 1) {
          var i = [];
          return this.each(function() {
              i.push(t(this).parsley(e))
          }),
          i
      }
      if (0 != this.length)
          return new E(this[0],e)
  }
  ,
  void 0 === window.ParsleyExtend && (window.ParsleyExtend = {}),
  T.options = _extends(s.objectCreate(o), window.ParsleyConfig),
  window.ParsleyConfig = T.options,
  window.Parsley = window.psly = T,
  T.Utils = s,
  window.ParsleyUtils = {},
  t.each(s, function(t, e) {
      "function" == typeof e && (window.ParsleyUtils[t] = function() {
          return s.warnOnce("Accessing `window.ParsleyUtils` is deprecated. Use `window.Parsley.Utils` instead."),
          s[t].apply(s, arguments)
      }
      )
  });
  var A = window.Parsley._validatorRegistry = new u(window.ParsleyConfig.validators,window.ParsleyConfig.i18n);
  window.ParsleyValidator = {},
  t.each("setLocale addCatalog addMessage addMessages getErrorMessage formatMessage addValidator updateValidator removeValidator hasValidator".split(" "), function(t, e) {
      window.Parsley[e] = function() {
          return A[e].apply(A, arguments)
      }
      ,
      window.ParsleyValidator[e] = function() {
          var t;
          return s.warnOnce("Accessing the method '" + e + "' through Validator is deprecated. Simply call 'window.Parsley." + e + "(...)'"),
          (t = window.Parsley)[e].apply(t, arguments)
      }
  }),
  window.Parsley.UI = p,
  window.ParsleyUI = {
      removeError: function(t, e, i) {
          var n = !0 !== i;
          return s.warnOnce("Accessing UI is deprecated. Call 'removeError' on the instance directly. Please comment in issue 1073 as to your need to call this method."),
          t.removeError(e, {
              updateClass: n
          })
      },
      getErrorsMessages: function(t) {
          return s.warnOnce("Accessing UI is deprecated. Call 'getErrorsMessages' on the instance directly."),
          t.getErrorsMessages()
      }
  },
  t.each("addError updateError".split(" "), function(t, e) {
      window.ParsleyUI[e] = function(t, i, n, r, o) {
          var a = !0 !== o;
          return s.warnOnce("Accessing UI is deprecated. Call '" + e + "' on the instance directly. Please comment in issue 1073 as to your need to call this method."),
          t[e](i, {
              message: n,
              assert: r,
              updateClass: a
          })
      }
  }),
  !1 !== window.ParsleyConfig.autoBind && t(function() {
      t("[data-parsley-validate]").length && t("[data-parsley-validate]").parsley()
  });
  var I = t({})
    , D = function() {
      s.warnOnce("Parsley's pubsub module is deprecated; use the 'on' and 'off' methods on parsley instances or window.Parsley")
  }
    , S = "parsley:";
  return t.listen = function(t, n) {
      var r;
      if (D(),
      "object" == typeof arguments[1] && "function" == typeof arguments[2] && (r = arguments[1],
      n = arguments[2]),
      "function" != typeof n)
          throw new Error("Wrong parameters");
      window.Parsley.on(i(t), e(n, r))
  }
  ,
  t.listenTo = function(t, n, r) {
      if (D(),
      !(t instanceof b || t instanceof m))
          throw new Error("Must give Parsley instance");
      if ("string" != typeof n || "function" != typeof r)
          throw new Error("Wrong parameters");
      t.on(i(n), e(r))
  }
  ,
  t.unsubscribe = function(t, e) {
      if (D(),
      "string" != typeof t || "function" != typeof e)
          throw new Error("Wrong arguments");
      window.Parsley.off(i(t), e.parsleyAdaptedCallback)
  }
  ,
  t.unsubscribeTo = function(t, e) {
      if (D(),
      !(t instanceof b || t instanceof m))
          throw new Error("Must give Parsley instance");
      t.off(i(e))
  }
  ,
  t.unsubscribeAll = function(e) {
      D(),
      window.Parsley.off(i(e)),
      t("form,input,textarea,select").each(function() {
          var n = t(this).data("Parsley");
          n && n.off(i(e))
      })
  }
  ,
  t.emit = function(t, e) {
      var n;
      D();
      var r = e instanceof b || e instanceof m
        , s = Array.prototype.slice.call(arguments, r ? 2 : 1);
      s.unshift(i(t)),
      r || (e = window.Parsley),
      (n = e).trigger.apply(n, _toConsumableArray(s))
  }
  ,
  t.extend(!0, T, {
      asyncValidators: {
          default: {
              fn: function(t) {
                  return t.status >= 200 && t.status < 300
              },
              url: !1
          },
          reverse: {
              fn: function(t) {
                  return t.status < 200 || t.status >= 300
              },
              url: !1
          }
      },
      addAsyncValidator: function(t, e, i, n) {
          return T.asyncValidators[t] = {
              fn: e,
              url: i || !1,
              options: n || {}
          },
          this
      }
  }),
  T.addValidator("remote", {
      requirementType: {
          "": "string",
          validator: "string",
          reverse: "boolean",
          options: "object"
      },
      validateString: function(e, i, n, r) {
          var s, o, a = {}, l = n.validator || (!0 === n.reverse ? "reverse" : "default");
          if (void 0 === T.asyncValidators[l])
              throw new Error("Calling an undefined async validator: `" + l + "`");
          (i = T.asyncValidators[l].url || i).indexOf("{value}") > -1 ? i = i.replace("{value}", encodeURIComponent(e)) : a[r.element.getAttribute("name") || r.element.getAttribute("id")] = e;
          var u = t.extend(!0, n.options || {}, T.asyncValidators[l].options);
          s = t.extend(!0, {}, {
              url: i,
              data: a,
              type: "GET"
          }, u),
          r.trigger("field:ajaxoptions", r, s),
          o = t.param(s),
          void 0 === T._remoteCache && (T._remoteCache = {});
          var h = T._remoteCache[o] = T._remoteCache[o] || t.ajax(s)
            , c = function() {
              var e = T.asyncValidators[l].fn.call(r, h, i, n);
              return e || (e = t.Deferred().reject()),
              t.when(e)
          };
          return h.then(c, c)
      },
      priority: -1
  }),
  T.on("form:submit", function() {
      T._remoteCache = {}
  }),
  a.prototype.addAsyncValidator = function() {
      return s.warnOnce("Accessing the method `addAsyncValidator` through an instance is deprecated. Simply call `Parsley.addAsyncValidator(...)`"),
      T.addAsyncValidator.apply(T, arguments)
  }
  ,
  T.addMessages("en", {
      defaultMessage: "This value seems to be invalid.",
      type: {
          email: "This value should be a valid email.",
          url: "This value should be a valid url.",
          number: "This value should be a valid number.",
          integer: "This value should be a valid integer.",
          digits: "This value should be digits.",
          alphanum: "This value should be alphanumeric."
      },
      notblank: "This value should not be blank.",
      required: "This value is required.",
      pattern: "This value seems to be invalid.",
      min: "This value should be greater than or equal to %s.",
      max: "This value should be lower than or equal to %s.",
      range: "This value should be between %s and %s.",
      minlength: "This value is too short. It should have %s characters or more.",
      maxlength: "This value is too long. It should have %s characters or fewer.",
      length: "This value length is invalid. It should be between %s and %s characters long.",
      mincheck: "You must select at least %s choices.",
      maxcheck: "You must select %s choices or fewer.",
      check: "You must select between %s and %s choices.",
      equalto: "This value should be the same."
  }),
  T.setLocale("en"),
  (new function() {
      var e = this
        , i = window || global;
      _extends(this, {
          isNativeEvent: function(t) {
              return t.originalEvent && !1 !== t.originalEvent.isTrusted
          },
          fakeInputEvent: function(i) {
              e.isNativeEvent(i) && t(i.target).trigger("input")
          },
          misbehaves: function(i) {
              e.isNativeEvent(i) && (e.behavesOk(i),
              t(document).on("change.inputevent", i.data.selector, e.fakeInputEvent),
              e.fakeInputEvent(i))
          },
          behavesOk: function(i) {
              e.isNativeEvent(i) && t(document).off("input.inputevent", i.data.selector, e.behavesOk).off("change.inputevent", i.data.selector, e.misbehaves)
          },
          install: function() {
              if (!i.inputEventPatched) {
                  i.inputEventPatched = "0.0.3";
                  for (var n = ["select", 'input[type="checkbox"]', 'input[type="radio"]', 'input[type="file"]'], r = 0; r < n.length; r++) {
                      var s = n[r];
                      t(document).on("input.inputevent", s, {
                          selector: s
                      }, e.behavesOk).on("change.inputevent", s, {
                          selector: s
                      }, e.misbehaves)
                  }
              }
          },
          uninstall: function() {
              delete i.inputEventPatched,
              t(document).off(".inputevent")
          }
      })
  }
  ).install(),
  T
}),
function(t, e, i, n) {
  if (t("ul.mtree").length) {
      var r = "easeOutQuart";
      t(".mtree ul").css({
          overflow: "hidden",
          height: 0,
          display: "none"
      });
      var s = t(".mtree li:has(ul)");
      function o(t, e) {
          e ? t.removeClass("mtree-open").addClass("mtree-closed") : t.removeClass("mtree-closed").addClass("mtree-open")
      }
      s.each(function(e, i) {
          t(this).children(":first-child").css("cursor", "pointer"),
          t(this).addClass("mtree-node mtree-closed"),
          t(this).children("ul").addClass("mtree-level-" + (t(this).parentsUntil(t("ul.mtree"), "ul").length + 1))
      }),
      t(".mtree li > *:first-child").on("click.mtree-active", function(e) {
          t(this).parent().hasClass("mtree-closed") ? (t(".mtree-active").not(t(this).parent()).removeClass("mtree-active"),
          t(this).parent().addClass("mtree-active")) : t(this).parent().hasClass("mtree-open") ? t(this).parent().removeClass("mtree-active") : (t(".mtree-active").not(t(this).parent()).removeClass("mtree-active"),
          t(this).parent().toggleClass("mtree-active"))
      }),
      s.children(":first-child").on("click.mtree", function(e) {
          var i = t(this).parent().children("ul").first()
            , n = t(this).parent().hasClass("mtree-open");
          if (t(".csl").hasClass("active") && !n) {
              var s = t(this).closest("ul").children(".mtree-open").not(t(this).parent()).children("ul");
              t.Velocity ? s.velocity({
                  height: 0
              }, {
                  duration: 400,
                  easing: r,
                  display: "none",
                  delay: 100,
                  complete: function() {
                      o(t(this).parent(), !0)
                  }
              }) : s.delay(100).slideToggle(400, function() {
                  o(t(this).parent(), !0)
              })
          }
          i.css({
              height: "auto"
          }),
          !n && t.Velocity && i.find(" > li, li.mtree-open > ul > li").css({
              opacity: 0
          }).velocity("stop").velocity("list"),
          t.Velocity ? i.velocity("stop").velocity({
              height: n ? [0, i.outerHeight()] : [i.outerHeight(), 0]
          }, {
              queue: !1,
              duration: 400,
              easing: r,
              display: n ? "none" : "block",
              begin: o(t(this).parent(), n),
              complete: function() {
                  n || t(this).css("height", "auto")
              }
          }) : (o(t(this).parent(), n),
          i.slideToggle(400)),
          e.preventDefault()
      }),
      t.Velocity && (t.Velocity.Sequences.list = function(e, i, n, s) {
          t.Velocity.animate(e, {
              opacity: [1, 0],
              translateY: [0, -(n + 1)]
          }, {
              delay: n * (400 / s / 2),
              duration: 400,
              easing: r
          })
      }
      ),
      0 == t(".mtree").css("opacity") && (t.Velocity ? t(".mtree").css("opacity", 1).children().css("opacity", 0).velocity("list") : t(".mtree").show(200))
  }
}(jQuery, 0, this.document);
