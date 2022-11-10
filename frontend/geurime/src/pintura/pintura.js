/*!
 * Pintura Image Editor Sandbox 8.0.2
 * (c) 2018-2021 PQINA Inc. - All Rights Reserved
 * This version of Pintura Image Editor is for use on pqina.nl only
 * License: https://pqina.nl/pintura/license/
 */
/* eslint-disable */

var t = (t) => (window.__pqina_webapi__ ? window.__pqina_webapi__[t] : window[t]),
  e = (e = 0, n = !0) =>
    new (t("ProgressEvent"))("progress", { loaded: 100 * e, total: 100, lengthComputable: n }),
  n = (...t) => {};
const o = { ArrayBuffer: "readAsArrayBuffer" };
var i = (e, i = n, r = {}) =>
  new Promise((n, a) => {
    const { dataFormat: s = o.ArrayBuffer } = r,
      l = new (t("FileReader"))();
    (l.onload = () => n(l.result)), (l.onerror = a), (l.onprogress = i), l[s](e);
  });
const r = (t, e) => {
  if (1165519206 !== t.getUint32((e += 2), !1)) return -1;
  const n = 18761 === t.getUint16((e += 6), !1);
  e += t.getUint32(e + 4, n);
  const o = t.getUint16(e, n);
  e += 2;
  for (let i = 0; i < o; i++)
    if (274 === t.getUint16(e + 12 * i, n)) return t.getUint16(e + 12 * i + 8, n);
};
var a = async (t, o = n) => {
  o(e(0));
  return (
    ((t) => {
      const e = new DataView(t);
      if (65496 != e.getUint16(0, !1)) return null;
      const n = e.byteLength;
      let o,
        i = 2;
      for (; i < n; ) {
        if (e.getUint16(i + 2, !1) <= 8) return -1;
        if (((o = e.getUint16(i, !1)), (i += 2), 65505 === o)) return r(e, i);
        if (65280 != (65280 & o)) return null;
        i += e.getUint16(i, !1);
      }
    })(await i(t.slice(0, 262144))) || 1
  );
};
let s = null;
var l = () => (null === s && (s = "undefined" != typeof window && void 0 !== window.document), s);
let c = null;
var u = () =>
    new Promise((t) => {
      if (null === c) {
        const e =
          "data:image/jpg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4QA6RXhpZgAATU0AKgAAAAgAAwESAAMAAAABAAYAAAEoAAMAAAABAAIAAAITAAMAAAABAAEAAAAAAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wAALCAABAAIBASIA/8QAJgABAAAAAAAAAAAAAAAAAAAAAxABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQAAPwBH/9k=";
        let n = l() ? new Image() : {};
        return (
          (n.onload = () => {
            (c = 1 === n.naturalWidth), (n = void 0), t(c);
          }),
          void (n.src = e)
        );
      }
      return t(c);
    }),
  d = (t) => t.getContext("2d").getImageData(0, 0, t.width, t.height),
  p = (t, e, n = []) => {
    const o = document.createElement(t),
      i = Object.getOwnPropertyDescriptors(o.__proto__);
    for (const t in e)
      "style" === t
        ? (o.style.cssText = e[t])
        : (i[t] && i[t].set) || /textContent|innerHTML/.test(t) || "function" == typeof e[t]
        ? (o[t] = e[t])
        : o.setAttribute(t, e[t]);
    return n.forEach((t) => o.appendChild(t)), o;
  };
const h = {
  1: () => [1, 0, 0, 1, 0, 0],
  2: (t) => [-1, 0, 0, 1, t, 0],
  3: (t, e) => [-1, 0, 0, -1, t, e],
  4: (t, e) => [1, 0, 0, -1, 0, e],
  5: () => [0, 1, 1, 0, 0, 0],
  6: (t, e) => [0, 1, -1, 0, e, 0],
  7: (t, e) => [0, -1, -1, 0, e, t],
  8: (t) => [0, -1, 1, 0, 0, t],
};
var g = (t) => {
    (t.width = 1), (t.height = 1);
    const e = t.getContext("2d");
    e && e.clearRect(0, 0, 1, 1);
  },
  m = (t) => "data" in t,
  f = async (t, e = 1) => {
    const [n, o] = (await u()) || e < 5 ? [t.width, t.height] : [t.height, t.width],
      i = p("canvas", { width: n, height: o }),
      r = i.getContext("2d");
    if (m(t) && !(await u()) && e > 1) {
      const e = p("canvas", { width: t.width, height: t.height });
      e.getContext("2d").putImageData(t, 0, 0), (t = e);
    }
    return (
      !(await u()) &&
        e > 1 &&
        r.transform.apply(
          r,
          ((t, e, n = -1) => (-1 === n && (n = 1), h[n](t, e)))(t.width, t.height, e)
        ),
      m(t) ? r.putImageData(t, 0, 0) : r.drawImage(t, 0, 0),
      t instanceof HTMLCanvasElement && g(t),
      i
    );
  },
  $ = async (t, e = 1) => (1 === e || (await u()) ? t : d(await f(t, e))),
  y = (t) => "object" == typeof t;
const x = (t) => (y(t) ? b(t) : t),
  b = (t) => {
    let e;
    return (
      Array.isArray(t)
        ? ((e = []),
          t.forEach((t, n) => {
            e[n] = x(t);
          }))
        : ((e = {}),
          Object.keys(t).forEach((n) => {
            const o = t[n];
            e[n] = x(o);
          })),
      e
    );
  };
var v = (t) => "string" == typeof t,
  w = (t, e) =>
    new Promise((n, o) => {
      const i = () =>
        n(
          ((t, e) => {
            let n = t.naturalWidth,
              o = t.naturalHeight;
            const i = n * o;
            if (e && i > e) {
              const t = Math.sqrt(e) / Math.sqrt(i);
              (n = Math.floor(n * t)), (o = Math.floor(o * t));
            }
            const r = p("canvas");
            return (r.width = n), (r.height = o), r.getContext("2d").drawImage(t, 0, 0, n, o), r;
          })(t, e)
        );
      t.complete && t.width ? i() : ((t.onload = i), (t.onerror = o));
    }),
  S = () => "createImageBitmap" in window,
  k = (t) => /svg/.test(t.type),
  C = () => Math.random().toString(36).substr(2, 9);
const M = new Map();
var R = (t, e, n) =>
    new Promise((o, i) => {
      let r = t.toString(),
        a = M.get(r);
      if (!a) {
        const e = ((t) =>
            `function () {self.onmessage = function (message) {(${t.toString()}).apply(null, message.data.content.concat([function (err, response) {\n    response = response || {};\n    const transfer = 'data' in response ? [response.data.buffer] : 'width' in response ? [response] : [];\n    return self.postMessage({ id: message.data.id, content: response, error: err }, transfer);\n}]))}}`)(
            t
          ),
          n = URL.createObjectURL(
            ((t) =>
              new Blob(["(", "function" == typeof t ? t.toString() : t, ")()"], {
                type: "application/javascript",
              }))(e)
          ),
          o = new Map(),
          i = new Worker(n);
        (a = {
          url: n,
          worker: i,
          messages: o,
          terminate: () => {
            a.worker.terminate(), URL.revokeObjectURL(n);
          },
        }),
          (i.onmessage = function (t) {
            const { id: e, content: n, error: i } = t.data;
            if (!o.has(e)) return;
            const r = o.get(e);
            o.delete(e), null != i ? r.reject(i) : r.resolve(n);
          }),
          M.set(r, a);
      }
      const s = C();
      a.messages.set(s, { resolve: o, reject: i }), a.worker.postMessage({ id: s, content: e }, n);
    }),
  T = async (t, e) => {
    let n;
    if (S() && !k(t) && "OffscreenCanvas" in window)
      try {
        n = await R(
          (t, e, n) => {
            createImageBitmap(t)
              .then((t) => {
                let o = t.width,
                  i = t.height;
                const r = o * i;
                if (e && r > e) {
                  const t = Math.sqrt(e) / Math.sqrt(r);
                  (o = Math.floor(o * t)), (i = Math.floor(i * t));
                }
                const a = new OffscreenCanvas(o, i),
                  s = a.getContext("2d");
                s.drawImage(t, 0, 0, o, i);
                const l = s.getImageData(0, 0, a.width, a.height);
                n(null, l);
              })
              .catch((t) => {
                n(t);
              });
          },
          [t, e]
        );
      } catch (t) {}
    if (!n || !n.width) {
      const o = await (async (t, e) => {
        const n = p("img", { src: URL.createObjectURL(t) }),
          o = await w(n, e);
        return URL.revokeObjectURL(n.src), o;
      })(t, e);
      (n = d(o)), g(o);
    }
    return n;
  },
  P = (t, e, n) =>
    new Promise((o, i) => {
      try {
        t.toBlob(
          (t) => {
            o(t);
          },
          e,
          n
        );
      } catch (t) {
        i(t);
      }
    }),
  E = async (t, e, n) => {
    try {
      const o = await f(t),
        i = await P(o, e, n);
      return g(o), i;
    } catch (t) {
      throw t;
    }
  },
  A = (t) => (t.match(/\/([a-z]+)/) || [])[1],
  I = (t) => t.substr(0, t.lastIndexOf(".")) || t;
const L = /avif|bmp|gif|jpg|jpeg|jpe|jif|jfif|png|svg|tiff|webp/;
var F = (t) => {
    return (
      t &&
      ((e = ((n = t), n.split(".").pop()).toLowerCase()),
      L.test(e)
        ? "image/" + (/jfif|jif|jpe|jpg/.test(e) ? "jpeg" : "svg" === e ? "svg+xml" : e)
        : "")
    );
    var e, n;
  },
  B = (e, n, o) => {
    const i = new Date().getTime(),
      r = e.type.length && !/null|text/.test(e.type),
      a = r ? e.type : o,
      s = ((t, e) => {
        const n = F(t);
        if (n === e) return t;
        const o = A(e) || n;
        return `${I(t)}.${o}`;
      })(n, a);
    try {
      return new (t("File"))([e], s, { lastModified: i, type: r ? e.type : a });
    } catch (t) {
      const n = r ? e.slice() : e.slice(0, e.size, a);
      return (n.lastModified = i), (n.name = s), n;
    }
  },
  z = (t, e) => t / e,
  D = (t) => t;
const O = Math.PI,
  _ = Math.PI / 2,
  W = _ / 2;
var V = (t) => {
  const e = Math.abs(t) % Math.PI;
  return e > W && e < Math.PI - W;
};
const U = (t, e, n) => n + (t - n) * e,
  N = (t) => ({
    x: t.x + 0.5 * t.width,
    y: t.y + 0.5 * t.height,
    rx: 0.5 * t.width,
    ry: 0.5 * t.height,
  }),
  H = () => X(0, 0),
  X = (t, e) => ({ x: t, y: e }),
  j = (t) => X(t.pageX, t.pageY),
  Y = (t) => X(t.x, t.y),
  G = (t) => ((t.x = -t.x), (t.y = -t.y), t),
  Z = (t, e, n = H()) => {
    const o = Math.cos(e),
      i = Math.sin(e),
      r = t.x - n.x,
      a = t.y - n.y;
    return (t.x = n.x + o * r - i * a), (t.y = n.y + i * r + o * a), t;
  },
  q = (t) => Math.sqrt(t.x * t.x + t.y * t.y),
  K = (t) => {
    const e = Math.sqrt(t.x * t.x + t.y * t.y);
    return 0 === e ? H() : ((t.x /= e), (t.y /= e), t);
  },
  Q = (t, e) => Math.atan2(e.y - t.y, e.x - t.x),
  J = (t, e) => ((t.x = e(t.x)), (t.y = e(t.y)), t),
  tt = (t, e) => ((t.x += e.x), (t.y += e.y), t),
  et = (t, e) => ((t.x -= e.x), (t.y -= e.y), t),
  nt = (t, e) => ((t.x *= e), (t.y *= e), t),
  ot = (t, e) => t.x * e.x + t.y * e.y,
  it = (t, e = H()) => {
    const n = t.x - e.x,
      o = t.y - e.y;
    return n * n + o * o;
  },
  rt = (t, e = H()) => Math.sqrt(it(t, e)),
  at = (t) => {
    let e = 0,
      n = 0;
    return (
      t.forEach((t) => {
        (e += t.x), (n += t.y);
      }),
      X(e / t.length, n / t.length)
    );
  },
  st = (t, e, n, o, i) => (
    t.forEach((t) => {
      (t.x = e ? o - (t.x - o) : t.x), (t.y = n ? i - (t.y - i) : t.y);
    }),
    t
  ),
  lt = (t, e, n, o) => {
    const i = Math.sin(e),
      r = Math.cos(e);
    return (
      t.forEach((t) => {
        (t.x -= n), (t.y -= o);
        const e = t.x * r - t.y * i,
          a = t.x * i + t.y * r;
        (t.x = n + e), (t.y = o + a);
      }),
      t
    );
  },
  ct = (t, e) => ({ width: t, height: e }),
  ut = (t) => ct(t.width, t.height),
  dt = (t) => ct(t.width, t.height),
  pt = (t) => ct(t.width, t.height),
  ht = (t) => ct(t.naturalWidth, t.naturalHeight),
  gt = (t, e) => ct(t, e),
  mt = (t, e, n = D) => n(t.width) === n(e.width) && n(t.height) === n(e.height),
  ft = (t, e) => ((t.width *= e), (t.height *= e), t),
  $t = (t) => X(0.5 * t.width, 0.5 * t.height),
  yt = (t, e) => {
    const n = Math.cos(e),
      o = Math.sin(e),
      i = n * t.width + o * t.height,
      r = o * t.width + n * t.height;
    return (t.width = i), (t.height = r), t;
  },
  xt = (t, e) => t.width >= e.width && t.height >= e.height,
  bt = (t, e) => ((t.width = e(t.width)), (t.height = e(t.height)), t),
  vt = (t, e) => ({ start: t, end: e }),
  wt = (t) => vt(Y(t.start), Y(t.end)),
  St = (t, e) => {
    if (0 === e) return t;
    const n = X(t.start.x - t.end.x, t.start.y - t.end.y),
      o = K(n),
      i = nt(o, e);
    return (t.start.x += i.x), (t.start.y += i.y), (t.end.x -= i.x), (t.end.y -= i.y), t;
  },
  kt = [X(-1, -1), X(-1, 1), X(1, 1), X(1, -1)],
  Ct = (t, e, n, o) => ({ x: t, y: e, width: n, height: o }),
  Mt = (t) => Ct(t.x, t.y, t.width, t.height),
  Rt = () => Ct(0, 0, 0, 0),
  Tt = (t) => Ct(0, 0, t.width, t.height),
  Pt = (t) => Ct(t.x || 0, t.y || 0, t.width || 0, t.height || 0),
  Et = (...t) => {
    const e = Array.isArray(t[0]) ? t[0] : t;
    let n = e[0].x,
      o = e[0].x,
      i = e[0].y,
      r = e[0].y;
    return (
      e.forEach((t) => {
        (n = Math.min(n, t.x)),
          (o = Math.max(o, t.x)),
          (i = Math.min(i, t.y)),
          (r = Math.max(r, t.y));
      }),
      Ct(n, i, o - n, r - i)
    );
  },
  At = (t) => Lt(t.x - t.rx, t.y - t.ry, 2 * t.rx, 2 * t.ry),
  It = (t, e) => Ct(t.x - 0.5 * e.width, t.y - 0.5 * e.height, e.width, e.height),
  Lt = (t, e, n, o) => Ct(t, e, n, o),
  Ft = (t) => X(t.x + 0.5 * t.width, t.y + 0.5 * t.height),
  Bt = (t, e) => ((t.x += e.x), (t.y += e.y), t),
  zt = (t, e, n) => (
    (n = n || Ft(t)),
    (t.x = e * (t.x - n.x) + n.x),
    (t.y = e * (t.y - n.y) + n.y),
    (t.width = e * t.width),
    (t.height = e * t.height),
    t
  ),
  Dt = (t, e) => ((t.x *= e), (t.y *= e), (t.width *= e), (t.height *= e), t),
  Ot = (t, e) => ((t.x /= e), (t.y /= e), (t.width /= e), (t.height /= e), t),
  _t = (t, e, n = D) =>
    n(t.x) === n(e.x) &&
    n(t.y) === n(e.y) &&
    n(t.width) === n(e.width) &&
    n(t.height) === n(e.height),
  Wt = (t) => z(t.width, t.height),
  Vt = (t, e, n, o, i) => ((t.x = e), (t.y = n), (t.width = o), (t.height = i), t),
  Ut = (t, e) => ((t.x = e.x), (t.y = e.y), (t.width = e.width), (t.height = e.height), t),
  Nt = (t, e, n) => (n || (n = Ft(t)), Zt(t).map((t) => Z(t, e, n))),
  Ht = (t, e) =>
    Ct(0.5 * t.width - 0.5 * e.width, 0.5 * t.height - 0.5 * e.height, e.width, e.height),
  Xt = (t, e) => !(e.x < t.x) && !(e.y < t.y) && !(e.x > t.x + t.width) && !(e.y > t.y + t.height),
  jt = (t, e, n = H()) => {
    if (0 === t.width || 0 === t.height) return Rt();
    const o = Wt(t);
    e || (e = o);
    let i = t.width,
      r = t.height;
    return (
      e > o ? (i = r * e) : (r = i / e),
      Ct(n.x + 0.5 * (t.width - i), n.y + 0.5 * (t.height - r), i, r)
    );
  },
  Yt = (t, e = Wt(t), n = H()) => {
    if (0 === t.width || 0 === t.height) return Rt();
    let o = t.width,
      i = o / e;
    return (
      i > t.height && ((i = t.height), (o = i * e)),
      Ct(n.x + 0.5 * (t.width - o), n.y + 0.5 * (t.height - i), o, i)
    );
  },
  Gt = (t) => [
    Math.min(t.y, t.y + t.height),
    Math.max(t.x, t.x + t.width),
    Math.max(t.y, t.y + t.height),
    Math.min(t.x, t.x + t.width),
  ],
  Zt = (t) => [
    X(t.x, t.y),
    X(t.x + t.width, t.y),
    X(t.x + t.width, t.y + t.height),
    X(t.x, t.y + t.height),
  ],
  qt = (t, e) => {
    if (t)
      return (t.x = e(t.x)), (t.y = e(t.y)), (t.width = e(t.width)), (t.height = e(t.height)), t;
  },
  Kt = (t, e, n = Ft(t)) =>
    Zt(t).map((t, o) => {
      const i = kt[o];
      return X(U(t.x, 1 + i.x * e.x, n.x), U(t.y, 1 + i.y * e.y, n.y));
    }),
  Qt = (t) => ((t.x = 0), (t.y = 0), t),
  Jt = (t) => {
    const e = t.map(Y),
      n = e[0],
      o = e[e.length - 1];
    (n.x == o.x && n.y == o.y) || e.push(n);
    let i,
      r,
      a,
      s = 0,
      l = 0,
      c = 0,
      u = e.length;
    for (let t = 0, o = u - 1; t < u; o = t++)
      (i = e[t]),
        (r = e[o]),
        (a = (i.y - n.y) * (r.x - n.x) - (r.y - n.y) * (i.x - n.x)),
        (s += a),
        (l += (i.x + r.x - 2 * n.x) * a),
        (c += (i.y + r.y - 2 * n.y) * a);
    return (a = 3 * s), X(l / a + n.x, c / a + n.y);
  },
  te = (t, e) => ee(t.start, t.end, e.start, e.end),
  ee = (t, e, n, o) => {
    const i =
        ((o.x - n.x) * (t.y - n.y) - (o.y - n.y) * (t.x - n.x)) /
        ((o.y - n.y) * (e.x - t.x) - (o.x - n.x) * (e.y - t.y)),
      r =
        ((e.x - t.x) * (t.y - n.y) - (e.y - t.y) * (t.x - n.x)) /
        ((o.y - n.y) * (e.x - t.x) - (o.x - n.x) * (e.y - t.y));
    if (i >= 0 && i <= 1 && r >= 0 && r <= 1)
      return X(t.x + i * (e.x - t.x), t.y + i * (e.y - t.y));
  },
  ne = (t, e) => {
    let n, o, i, r, a, s, l, c, u, d;
    const p = e.length;
    for (n = 0; n < p; n++)
      if (
        ((o = e[n]),
        (i = e[n + 1 > p - 1 ? 0 : n + 1]),
        (r = o.x - t.x),
        (a = o.y - t.y),
        (s = i.x - t.x),
        (l = i.y - t.y),
        (c = r - s),
        (u = a - l),
        (d = c * a - u * r),
        d < -1e-5)
      )
        return !1;
    return !0;
  },
  oe = (t) => {
    const e = [];
    for (let n = 0; n < t.length; n++) {
      let o = n + 1;
      o === t.length && (o = 0), e.push(vt(Y(t[n]), Y(t[o])));
    }
    return e;
  },
  ie = (t, e, n, o = 0, i = !1, r = !1, a = 12) => {
    const s = [];
    for (let o = 0; o < a; o++)
      s.push(
        X(t.x + e * Math.cos((o * (2 * Math.PI)) / a), t.y + n * Math.sin((o * (2 * Math.PI)) / a))
      );
    return (i || r) && st(s, i, r, t.x, t.y), o && lt(s, o, t.x, t.y), s;
  };
var re = (t, e) => t instanceof HTMLElement && (!e || new RegExp(`^${e}$`, "i").test(t.nodeName)),
  ae = (t) => t instanceof File,
  se = (t) => t.split("/").pop().split(/\?|\#/).shift();
let le = null;
var ce = (t) =>
    new Promise((e, n) => {
      let o = !1;
      !t.parentNode &&
        (null === le && (le = le = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)),
        le) &&
        ((o = !0),
        (t.style.cssText =
          "position:absolute;visibility:hidden;pointer-events:none;left:0;top:0;width:0;height:0;"),
        document.body.appendChild(t));
      const i = () => {
        const n = t.naturalWidth,
          i = t.naturalHeight;
        n && i && (o && t.parentNode.removeChild(t), clearInterval(r), e({ width: n, height: i }));
      };
      t.onerror = (t) => {
        clearInterval(r), n(t);
      };
      const r = setInterval(i, 1);
      i();
    }),
  ue = async (t) => {
    let e,
      n = t;
    n.src || ((n = new Image()), (n.src = v(t) ? t : URL.createObjectURL(t)));
    try {
      e = await ce(n);
    } catch (t) {
      throw t;
    } finally {
      ae(t) && URL.revokeObjectURL(n.src);
    }
    return e;
  };
var de = async (t) => {
    try {
      const e = await ue(t),
        n = await ((t) =>
          new Promise((e, n) => {
            if (t.complete) return e(t);
            (t.onload = () => e(t)), (t.onerror = n);
          }))(t),
        o = document.createElement("canvas");
      (o.width = e.width), (o.height = e.height);
      o.getContext("2d").drawImage(n, 0, 0);
      const i = await P(o);
      return B(i, se(n.src));
    } catch (t) {
      throw t;
    }
  },
  pe = (t) => /^image/.test(t.type),
  he = (t, e, n = (t) => t) =>
    t.getAllResponseHeaders().indexOf(e) >= 0 ? n(t.getResponseHeader(e)) : void 0,
  ge = (t) => {
    if (!t) return null;
    const e = t
      .split(/filename=|filename\*=.+''/)
      .splice(1)
      .map((t) => t.trim().replace(/^["']|[;"']{0,2}$/g, ""))
      .filter((t) => t.length);
    return e.length ? decodeURI(e[e.length - 1]) : null;
  };
const me = "URL_REQUEST";
class fe extends Error {
  constructor(t, e, n) {
    super(t), (this.name = "EditorError"), (this.code = e), (this.metadata = n);
  }
}
var $e = (t, o) =>
    /^data:/.test(t)
      ? (async (t, o = "data-uri", i = n) => {
          let r;
          i(e(0));
          const a = await fetch(t);
          let s;
          i(e(0.33)),
            (r = await a.blob()),
            pe(r) || (s = "image/" + (t.includes(",/9j/") ? "jpeg" : "png")),
            i(e(0.66));
          const l = B(r, o, s);
          return i(e(1)), l;
        })(t, void 0, o)
      : ((t, e) =>
          new Promise((n, o) => {
            const i = () => o(new fe("Error fetching image", me, r)),
              r = new XMLHttpRequest();
            (r.onprogress = e),
              (r.onerror = i),
              (r.onload = () => {
                if (!r.response || r.status >= 300 || r.status < 200) return i();
                const e = he(r, "Content-Type"),
                  o = he(r, "Content-Disposition", ge) || se(t);
                n(B(r.response, o, e || F(o)));
              }),
              r.open("GET", t),
              (r.responseType = "blob"),
              r.send();
          }))(t, o),
  ye = async (t, e) => {
    if (ae(t) || ((n = t) instanceof Blob && !(n instanceof File))) return t;
    if (v(t)) return await $e(t, e);
    if (re(t, "canvas"))
      return await (async (t, e, n) => {
        const o = await P(t, e, n);
        return B(o, "canvas");
      })(t);
    if (re(t, "img")) return await de(t);
    throw new fe("Invalid image source", "invalid-image-source");
    var n;
  };
let xe = null;
var be = () => (null === xe && (xe = l() && /^mac/i.test(navigator.platform)), xe),
  ve = (t) => (l() ? RegExp(t).test(window.navigator.userAgent) : void 0);
let we = null;
var Se = () => (
    null === we &&
      (we = l() && (ve(/iPhone|iPad|iPod/) || (be() && navigator.maxTouchPoints >= 1))),
    we
  ),
  ke = async (t, e = 1) => ((await u()) || Se() || e < 5 ? t : gt(t.height, t.width));
const Ce = (t, e) => {
  if (1165519206 !== t.getUint32((e += 2), !1)) return -1;
  const n = 18761 === t.getUint16((e += 6), !1);
  e += t.getUint32(e + 4, n);
  const o = t.getUint16(e, n);
  e += 2;
  for (let i = 0; i < o; i++)
    if (274 === t.getUint16(e + 12 * i, n)) return t.getUint16(e + 12 * i + 8, n);
};
var Me = (t) => {
    if (!t) return;
    const e = new DataView(t);
    if (65496 != e.getUint16(0, !1)) return;
    const n = e.byteLength;
    let o,
      i = 2;
    for (; i < n; ) {
      if (e.getUint16(i + 2, !1) <= 8) return;
      if (((o = e.getUint16(i, !1)), (i += 2), 65505 === o)) return Ce(e, i);
      if (65280 != (65280 & o)) return;
      i += e.getUint16(i, !1);
    }
  },
  Re = (t, e = 1) => {
    if (!t) return !1;
    const n = new DataView(t);
    if (65496 !== n.getUint16(0)) return !1;
    let o,
      i,
      r = 2,
      a = !1;
    for (; r < n.byteLength; ) {
      (o = n.getUint16(r, !1)), (i = n.getUint16(r + 2, !1) + 2);
      if (!((o >= 65504 && o <= 65519) || 65534 === o)) break;
      if ((a || (a = Te(n, r, e)), r + i > n.byteLength)) break;
      r += i;
    }
    return a;
  };
const Te = (t, e, n) => {
  if (1165519206 !== t.getUint32(e + 4, !1)) return;
  e += 4;
  const o = 18761 === t.getUint16((e += 6), !1);
  e += t.getUint32(e + 4, o);
  const i = t.getUint16(e, o);
  e += 2;
  for (let r = 0; r < i; r++)
    if (274 === t.getUint16(e + 12 * r, o)) return t.setUint16(e + 12 * r + 8, n, o), !0;
  return !1;
};
var Pe = (t) => /jpeg/.test(t.type),
  Ee = (t) => {
    return "object" != typeof (e = t) || e.constructor != Object ? t : JSON.stringify(t);
    var e;
  },
  Ae = (t, e = 0, n) => (
    0 === e || (t.translate(n.x, n.y), t.rotate(e), t.translate(-n.x, -n.y)), t
  ),
  Ie = async (t, e = {}) => {
    const { flipX: n, flipY: o, rotation: i, crop: r } = e,
      a = dt(t),
      s = n || o,
      l = !!i,
      c = r && (r.x || r.y || r.width || r.height),
      u = c && _t(r, Tt(a)),
      d = c && !u;
    if (!s && !l && !d) return t;
    let h,
      m = p("canvas", { width: t.width, height: t.height });
    if ((m.getContext("2d").putImageData(t, 0, 0), s)) {
      const t = p("canvas", { width: m.width, height: m.height }).getContext("2d");
      ((t, e, n) => {
        t.scale(e, n);
      })(t, n ? -1 : 1, o ? -1 : 1),
        t.drawImage(m, n ? -m.width : 0, o ? -m.height : 0),
        t.restore(),
        g(m),
        (m = t.canvas);
    }
    if (l) {
      const t = bt(pt(Et(Nt(Pt(m), i))), Math.floor),
        e = p("canvas", { width: r.width, height: r.height }).getContext("2d");
      ((t, e, n) => {
        t.translate(e, n);
      })(e, -r.x, -r.y),
        Ae(e, i, $t(t)),
        e.drawImage(m, 0.5 * (t.width - m.width), 0.5 * (t.height - m.height)),
        e.restore(),
        g(m),
        (m = e.canvas);
    } else if (d) {
      return (h = m.getContext("2d").getImageData(r.x, r.y, r.width, r.height)), g(m), h;
    }
    return (h = m.getContext("2d").getImageData(0, 0, m.width, m.height)), g(m), h;
  },
  Le = (t, e) => {
    const { imageData: n, width: o, height: i } = t,
      r = n.width,
      a = n.height,
      s = Math.round(o),
      l = Math.round(i),
      c = n.data,
      u = new Uint8ClampedArray(s * l * 4),
      d = r / s,
      p = a / l,
      h = Math.ceil(0.5 * d),
      g = Math.ceil(0.5 * p);
    for (let t = 0; t < l; t++)
      for (let e = 0; e < s; e++) {
        const n = 4 * (e + t * s);
        let o = 0,
          i = 0,
          a = 0,
          l = 0,
          m = 0,
          f = 0,
          $ = 0;
        const y = (t + 0.5) * p;
        for (let n = Math.floor(t * p); n < (t + 1) * p; n++) {
          const t = Math.abs(y - (n + 0.5)) / g,
            s = (e + 0.5) * d,
            u = t * t;
          for (let t = Math.floor(e * d); t < (e + 1) * d; t++) {
            let e = Math.abs(s - (t + 0.5)) / h;
            const d = Math.sqrt(u + e * e);
            if (d >= -1 && d <= 1 && ((o = 2 * d * d * d - 3 * d * d + 1), o > 0)) {
              e = 4 * (t + n * r);
              const s = c[e + 3];
              ($ += o * s),
                (a += o),
                s < 255 && (o = (o * s) / 250),
                (l += o * c[e]),
                (m += o * c[e + 1]),
                (f += o * c[e + 2]),
                (i += o);
            }
          }
        }
        (u[n] = l / i), (u[n + 1] = m / i), (u[n + 2] = f / i), (u[n + 3] = $ / a);
      }
    e(null, { data: u, width: s, height: l });
  },
  Fe = (t) => {
    if (t instanceof ImageData) return t;
    let e;
    try {
      e = new ImageData(t.width, t.height);
    } catch (n) {
      e = p("canvas").getContext("2d").createImageData(t.width, t.height);
    }
    return e.data.set(t.data), e;
  },
  Be = async (t, e = {}) => {
    const { width: n, height: o, fit: i, upscale: r } = e;
    if (!n && !o) return t;
    let a = n,
      s = o;
    if ((n ? o || (s = n) : (a = o), "force" !== i)) {
      let e = a / t.width,
        n = s / t.height,
        o = 1;
      if (
        ("cover" === i ? (o = Math.max(e, n)) : "contain" === i && (o = Math.min(e, n)),
        o > 1 && !1 === r)
      )
        return t;
      (a = Math.round(t.width * o)), (s = Math.round(t.height * o));
    }
    return t.width === a && t.height === s
      ? t
      : ((t = await R(Le, [{ imageData: t, width: a, height: s }], [t.data.buffer])), Fe(t));
  },
  ze = (t, e) => {
    const { imageData: n, matrix: o } = t;
    if (!o) return e(null, n);
    const i = new Uint8ClampedArray(n.width * n.height * 4),
      r = n.data,
      a = r.length,
      s = o[0],
      l = o[1],
      c = o[2],
      u = o[3],
      d = o[4],
      p = o[5],
      h = o[6],
      g = o[7],
      m = o[8],
      f = o[9],
      $ = o[10],
      y = o[11],
      x = o[12],
      b = o[13],
      v = o[14],
      w = o[15],
      S = o[16],
      k = o[17],
      C = o[18],
      M = o[19];
    let R = 0,
      T = 0,
      P = 0,
      E = 0,
      A = 0,
      I = 0,
      L = 0,
      F = 0,
      B = 0,
      z = 0,
      D = 0,
      O = 0;
    for (; R < a; R += 4)
      (T = r[R] / 255),
        (P = r[R + 1] / 255),
        (E = r[R + 2] / 255),
        (A = r[R + 3] / 255),
        (I = T * s + P * l + E * c + A * u + d),
        (L = T * p + P * h + E * g + A * m + f),
        (F = T * $ + P * y + E * x + A * b + v),
        (B = T * w + P * S + E * k + A * C + M),
        (z = Math.max(0, I * B) + (1 - B)),
        (D = Math.max(0, L * B) + (1 - B)),
        (O = Math.max(0, F * B) + (1 - B)),
        (i[R] = 255 * Math.max(0, Math.min(1, z))),
        (i[R + 1] = 255 * Math.max(0, Math.min(1, D))),
        (i[R + 2] = 255 * Math.max(0, Math.min(1, O))),
        (i[R + 3] = 255 * A);
    e(null, { data: i, width: n.width, height: n.height });
  },
  De = (t, e) => {
    const { imageData: n, matrix: o } = t;
    if (!o) return e(null, n);
    let i = o.reduce((t, e) => t + e);
    const r = n.width,
      a = n.height,
      s = n.data;
    let l = 0,
      c = 0,
      u = 0;
    const d = Math.round(Math.sqrt(o.length)),
      p = Math.floor(d / 2);
    let h = 0,
      g = 0,
      m = 0,
      f = 0,
      $ = 0,
      y = 0,
      x = 0,
      b = 0,
      v = 0,
      w = 0;
    const S = new Uint8ClampedArray(r * a * 4);
    for (u = 0; u < a; u++)
      for (c = 0; c < r; c++) {
        for (h = 0, g = 0, m = 0, f = 0, y = 0; y < d; y++)
          for ($ = 0; $ < d; $++)
            (x = u + y - p),
              (b = c + $ - p),
              x < 0 ||
                x >= a ||
                b < 0 ||
                b >= r ||
                ((v = 4 * (x * r + b)),
                (w = o[y * d + $]),
                (h += s[v] * w),
                (g += s[v + 1] * w),
                (m += s[v + 2] * w),
                (f += s[v + 3] * w));
        (S[l] = h / i), (S[l + 1] = g / i), (S[l + 2] = m / i), (S[l + 3] = f / i), (l += 4);
      }
    e(null, { data: S, width: r, height: a });
  },
  Oe = (t, e) => {
    const { imageData: n, strength: o } = t;
    if (!o) return e(null, n);
    const i = new Uint8ClampedArray(n.width * n.height * 4),
      r = n.width,
      a = n.height,
      s = n.data,
      l = (t, e) => ((c = t - m), (u = e - f), Math.sqrt(c * c + u * u));
    let c,
      u,
      d,
      p = 0,
      h = 0,
      g = 0,
      m = 0.5 * r,
      f = 0.5 * a,
      $ = l(0, 0);
    for (g = 0; g < a; g++)
      for (h = 0; h < r; h++)
        (p = 4 * (h + g * r)),
          (d = (l(h, g) * o) / $),
          o > 0
            ? ((i[p] = s[p] * (1 - d)),
              (i[p + 1] = s[p + 1] * (1 - d)),
              (i[p + 2] = s[p + 2] * (1 - d)))
            : ((i[p] = s[p] + d * -(255 - s[p])),
              (i[p + 1] = s[p + 1] + d * -(255 - s[p + 1])),
              (i[p + 2] = s[p + 2] + d * -(255 - s[p + 2]))),
          (i[p + 3] = s[p + 3]);
    e(null, { data: i, width: n.width, height: n.height });
  },
  _e = (t, e) => {
    const { imageData: n, level: o, monochrome: i = !1 } = t;
    if (!o) return e(null, n);
    const r = new Uint8ClampedArray(n.width * n.height * 4),
      a = n.data,
      s = a.length;
    let l,
      c,
      u,
      d,
      p = 0;
    const h = () => 255 * (2 * Math.random() - 1) * o;
    for (; p < s; p += 4)
      i ? ((d = h()), (l = d), (c = d), (u = d)) : ((l = h()), (c = h()), (u = h())),
        (r[p] = a[p] + l),
        (r[p + 1] = a[p + 1] + c),
        (r[p + 2] = a[p + 2] + u),
        (r[p + 3] = a[p + 3]);
    e(null, { data: r, width: n.width, height: n.height });
  },
  We = (t, e) => {
    const { imageData: n, level: o } = t;
    if (!o) return e(null, n);
    const i = new Uint8ClampedArray(n.width * n.height * 4),
      r = n.data,
      a = r.length;
    let s,
      l,
      c,
      u = 0;
    for (; u < a; u += 4)
      (s = r[u] / 255),
        (l = r[u + 1] / 255),
        (c = r[u + 2] / 255),
        (i[u] = 255 * Math.pow(s, o)),
        (i[u + 1] = 255 * Math.pow(l, o)),
        (i[u + 2] = 255 * Math.pow(c, o)),
        (i[u + 3] = r[u + 3]);
    e(null, { data: i, width: n.width, height: n.height });
  },
  Ve = async (t, e = {}) => {
    const { colorMatrix: n, convolutionMatrix: o, gamma: i, noise: r, vignette: a } = e,
      s = [];
    if (
      (o && s.push([De, { matrix: o.clarity }]),
      i > 0 && s.push([We, { level: 1 / i }]),
      n &&
        !((t) => {
          const e = t.length;
          let n,
            o = e >= 20 ? 6 : e >= 16 ? 5 : 3;
          for (let i = 0; i < e; i++) {
            if (((n = t[i]), 1 === n && i % o != 0)) return !1;
            if (0 !== n && 1 !== n) return !1;
          }
          return !0;
        })(n) &&
        s.push([ze, { matrix: n }]),
      (r > 0 || r < 0) && s.push([_e, { level: r }]),
      (a > 0 || a < 0) && s.push([Oe, { strength: a }]),
      !s.length)
    )
      return t;
    const l = (t, e) =>
        `(err, imageData) => {\n            (${t[
          e
        ][0].toString()})(Object.assign({ imageData: imageData }, filterInstructions[${e}]), \n                ${
          t[e + 1] ? l(t, e + 1) : "done"
        })\n        }`,
      c = `function (options, done) {\n        const filterInstructions = options.filterInstructions;\n        const imageData = options.imageData;\n        (${l(
        s,
        0
      )})(null, imageData)\n    }`;
    return (
      (t = await R(c, [{ imageData: t, filterInstructions: s.map((t) => t[1]) }], [t.data.buffer])),
      Fe(t)
    );
  },
  Ue = (t) => "number" == typeof t,
  Ne = (t) =>
    v(t) &&
    null !==
      t.match(
        /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g
      ),
  He = (t, e) => t.hasOwnProperty(e),
  Xe = (t) => "function" == typeof t,
  je = (t) => Array.isArray(t);
let Ye = 64,
  Ge = 102,
  Ze = 112,
  qe = !1;
var Ke = (t, e) => (
    !qe &&
      l() &&
      (/^win/i.test(navigator.platform) && (Ge = 103),
      (Se() || be()) && ((Ye = 63.5), (Ge = 110), (Ze = 123)),
      (qe = !0)),
    `<svg${
      e ? ` aria-label="${e}"` : ""
    } width="128" height="128" viewBox="0 0 128 128" preserveAspectRatio="xMinYMin meet" xmlns="http://www.w3.org/2000/svg"><text x="${Ye}" y="${Ge}" alignment-baseline="text-top" dominant-baseline="text-top" text-anchor="middle" font-size="${Ze}px">${t}</text></svg>`
  ),
  Qe = (t, e) => (t / e) * 100 + "%",
  Je = (t, e) =>
    new Promise((n, o) => {
      let i = t,
        r = !1;
      const a = () => {
        r ||
          ((r = !0), Xe(e) && Promise.resolve().then(() => e(gt(i.naturalWidth, i.naturalHeight))));
      };
      if (
        (i.src ||
          ((i = new Image()),
          v(t) &&
            new URL(t, location.href).origin !== location.origin &&
            (i.crossOrigin = "anonymous"),
          (i.src = v(t) ? t : URL.createObjectURL(t))),
        i.complete)
      )
        return a(), n(i);
      Xe(e) && ce(i).then(a).catch(o),
        (i.onload = () => {
          a(), n(i);
        }),
        (i.onerror = o);
    }),
  tn = (t) =>
    `rgba(${Math.round(255 * t[0])}, ${Math.round(255 * t[1])}, ${Math.round(255 * t[2])}, ${
      Ue(t[3]) ? t[3] : 1
    })`;
let en = void 0;
const nn = (t = 1, e = 1) => {
    const n = p("canvas").getContext("2d");
    return (n.canvas.width = t), (n.canvas.height = e), n;
  },
  on = (t, e) => {
    const {
      fontSize: n = 16,
      fontFamily: o = "sans-serif",
      fontWeight: i = "normal",
      fontVariant: r = "normal",
      fontStyle: a = "normal",
      textAlign: s = "left",
      color: l = "#000",
    } = e;
    (t.font = `${a} ${r} ${i} ${n}px ${o}`),
      (t.textBaseline = "top"),
      (t.textAlign = s),
      (t.fillStyle = Array.isArray(l) ? tn(l) : l);
  },
  rn = (t, e) => (Xe(e) ? e(t) : e),
  an = (t, e, n) => {
    const o = t.textAlign;
    t.textAlign = "left";
    const i = e.split("\n"),
      r = i.reduce((e, n) => {
        const o =
          ((i = t.measureText(n)),
          Math.abs(i.actualBoundingBoxLeft) + Math.abs(i.actualBoundingBoxRight));
        var i;
        return o > e && (e = o), e;
      }, 1);
    t.textAlign = o;
    const a = n * i.length;
    return gt(Math.ceil(r), Math.ceil(a));
  },
  sn = new Map(),
  ln = (t, e) => {
    const n = ((t) => {
      const e = nn();
      return on(e, t), e;
    })(e);
    e.width && (t = cn(n, t, e.width));
    const o = ((
      t,
      { fontSize: e, fontFamily: n, lineHeight: o, fontWeight: i, fontStyle: r, fontVariant: a }
    ) => `${[t, e, i, r, a, n].join("_")}_${Xe(o) ? o(e) : o}`)(t, e);
    let i = sn.get(o);
    return i || ((i = an(n, t, rn(e.fontSize, e.lineHeight))), sn.set(o, i)), { ...i };
  },
  cn = (t, e, n) => {
    if (0 === e.length) return "";
    const o = [];
    let i,
      r = "",
      a = 0;
    const s = e.split("\n\n"),
      l = () => {
        r.length && (o[a] || (o[a] = []), o[a].push(r), (r = ""));
      },
      c = (e) => {
        const o = r + e;
        (i = t.measureText(o).width),
          i < n ? (r = o) : (r.length ? (l(), (r = e)) : ((r = o), l()), a++);
      },
      u = (e) => {
        const o = r.length ? r + " " + e : e;
        (i = t.measureText(o).width),
          i < n ? (r = o) : r.length ? (l(), a++, u(e)) : e.split("").forEach(c);
      };
    return (
      s.forEach((t) => {
        t.split("\n").forEach((t) => {
          t.split(" ").forEach(u), r.length && l(), a++;
        }),
          a++;
      }),
      o.map((t) => t.join(" ")).join("\n")
    );
  },
  un = (t, e = "", n = {}) => {
    if (0 === e.length) return t;
    const { x: o = 0, y: i = 0, lineWidth: r = 0, textAlign: a, fontSize: s, lineHeight: l } = n,
      c = tt(
        ((t) => {
          if (!en) {
            const t = 32,
              e = nn(t, t);
            on(e, { fontSize: 100, color: "#fff" }), e.fillText("F", 0, 0);
            const n = e.getImageData(0, 0, t, t).data;
            let o = 0,
              i = 4,
              r = n.length,
              a = r - 4 * t;
            for (o = a; o < r && !n[o]; o += i);
            const s = (o - a) / i;
            for (a = 4 * (t - 1), i = 4 * t, o = a; o < r && !n[o]; o += i);
            (en = X(s, (o - a) / i)), g(e.canvas);
          }
          return X(-en.x * t * 0.01, -en.y * t * 0.01);
        })(s),
        X(s / 12, s / 3.75)
      ),
      u = o + c.x,
      d = i + c.y,
      p = Xe(l) ? l(s) : l;
    let h = "right" === a ? r : "center" === a ? 0.5 * r : 0;
    return (
      e.split("\n").forEach((e, n) => {
        t.fillText(e, u + h, d + n * p);
      }),
      t
    );
  },
  dn = (t, e) => {
    if (Cn(t)) return t;
    const n = t.width / t.height,
      o = Yt(e, n);
    return (
      (t.width > o.width || t.height > o.height) && ((t.width = o.width), (t.height = o.height)), t
    );
  },
  pn = (t, e) =>
    Cn(t)
      ? ((t.x = e.x), (t.y = e.y), t)
      : ((t.x = e.x - 0.5 * t.width), (t.y = e.y - 0.5 * t.height), t),
  hn = (t) => {
    const e = { ...t };
    e.backgroundImageElement = void 0;
    const n = b(e);
    return t.backgroundImageElement && (n.backgroundImageElement = t.backgroundImageElement), n;
  },
  gn = (t, e = {}) => {
    const n = Wt(t);
    let o, i;
    const r = e.width || e.rx,
      a = e.height || e.ry;
    if (r && a) return ut(e);
    if (r || a) {
      (o = parseFloat(r || Number.MAX_SAFE_INTEGER)),
        (i = parseFloat(a || Number.MAX_SAFE_INTEGER));
      const t = Math.min(o, i);
      v(r) || v(a) ? ((o = t + "%"), (i = t * n + "%")) : ((o = t), (i = t));
    } else {
      const t = 10;
      (o = t + "%"), (i = t * n + "%");
    }
    return {
      [e.width ? "width" : e.rx ? "rx" : void 0]: o,
      [e.width ? "height" : e.rx ? "ry" : void 0]: i,
    };
  },
  mn = (t, e = {}) => {
    return {
      width: void 0,
      height: void 0,
      ...e,
      aspectRatio: 1,
      backgroundImage:
        ((n = Ke(t)), "data:image/svg+xml," + n.replace("<", "%3C").replace(">", "%3E")),
    };
    var n;
  },
  fn = (t, e, n = {}) => {
    const o = {
      backgroundColor: [0, 0, 0, 0],
      ...(Cn(n) ? {} : { width: void 0, height: void 0, aspectRatio: void 0 }),
      ...n,
      backgroundImage: v(t) ? t : URL.createObjectURL(t),
    };
    return $n(o, e);
  },
  $n = (t, e = n) => {
    if (t.backgroundImage) {
      if (/canvas/.test(t.backgroundImage.nodeName))
        return (t.isComplete = !0), (t.isError = !1), (t.isLoading = !1), e(t.isError, t), t;
      if (t.isComplete) return e(t.isError, t), t;
      if (t.isLoading) return t;
      (t.isComplete = !1), (t.isError = !1), (t.isLoading = !0);
      const n = (e) => {
        if (t.backgroundSize || Cn(t)) return;
        const n = e.width / e.height,
          o = t.width || e.width,
          i = o / n;
        (t.width = o), (t.height = i), (t.aspectRatio = e.width / e.height);
      };
      Je(t.backgroundImage, n)
        .then((e) => {
          t.backgroundImageElement = e;
        })
        .catch((e) => {
          t.isError = e;
        })
        .finally(() => {
          (t.isLoading = !1), (t.isComplete = !0), e(t.isError, t);
        });
    }
    return t;
  },
  yn = (t, e, n) => {
    let o;
    if (v(t) || t instanceof Blob)
      Ne(t)
        ? ((o = mn(t, gn(e))), setTimeout(() => n(void 0, o), 0))
        : (o = fn(t, n, { ...gn(e) }));
    else if (t.src) {
      const i = { ...t.shape, ...gn(e, t.shape || t) };
      Ne(t.src) ? ((o = mn(t.src, i)), setTimeout(() => n(void 0, o), 0)) : (o = fn(t.src, n, i));
    } else t.shape && (o = hn(t.shape));
    return (
      He(o, "backgroundImage") &&
        (He(o, "backgroundColor") || (o.backgroundColor = [0, 0, 0, 0]),
        He(o, "disableStyle") || (o.disableStyle = !0),
        He(o, "disableFlip") || (o.disableFlip = !0)),
      e ? eo(o, e) : o
    );
  },
  xn = (t) => X(t.x1, t.y1),
  bn = (t) => X(t.x2, t.y2),
  vn = (t) => He(t, "text"),
  wn = (t) => vn(t) && !(Bn(t) || He(t, "width")),
  Sn = (t) => vn(t) && (Bn(t) || He(t, "width")),
  kn = (t) => !vn(t) && zn(t),
  Cn = (t) => He(t, "rx"),
  Mn = (t) => He(t, "x1") && !Rn(t),
  Rn = (t) => He(t, "x3"),
  Tn = (t) => He(t, "points"),
  Pn = (t) => vn(t) && t.isEditing,
  En = (t) => !He(t, "opacity") || t.opacity > 0,
  An = (t) => t.isSelected,
  In = (t) => t.isDraft,
  Ln = (t) => He(t, "width") && He(t, "height"),
  Fn = (t) => {
    const e = He(t, "right"),
      n = He(t, "bottom");
    return e || n;
  },
  Bn = (t) =>
    ((He(t, "x") || He(t, "left")) && He(t, "right")) ||
    ((He(t, "y") || He(t, "top")) && He(t, "bottom")),
  zn = (t) => Ln(t) || Bn(t),
  Dn = (t, e) => !0 !== t.disableStyle && (!je(t.disableStyle) || !t.disableStyle.includes(e)),
  On = (t) => !0 !== t.disableErase,
  _n = (t) => !0 !== t.disableSelect && !Tn(t) && !Rn(t),
  Wn = (t) => !0 !== t.disableRemove,
  Vn = (t) =>
    !t.disableFlip && !In(t) && !Fn(t) && ((t) => He(t, "backgroundImage") || He(t, "text"))(t),
  Un = (t, e) =>
    !!vn(t) &&
    !0 !== t.disableInput &&
    (Xe(t.disableInput) ? t.disableInput(null != e ? e : t.text) : e || !0),
  Nn = (t) => !0 !== t.disableMove && !In(t) && !Tn(t) && !Fn(t),
  Hn = (t) => (delete t.left, delete t.right, delete t.top, delete t.bottom, t),
  Xn = (t) => (delete t.rotation, t),
  jn = (t) => (
    (t.strokeWidth = t.strokeWidth || 1), (t.strokeColor = t.strokeColor || [0, 0, 0]), t
  ),
  Yn = (t) => (
    (t.backgroundColor = t.backgroundColor
      ? t.backgroundColor
      : t.strokeWidth || t.backgroundImage
      ? void 0
      : [0, 0, 0]),
    t
  ),
  Gn = (t) => 1.2 * t,
  Zn = (t) => (delete t.textAlign, Hn(t)),
  qn = (t) => ((t.textAlign = t.textAlign || "left"), t),
  Kn = (t) => (
    ((t) => {
      v(t.id) || (t.id = C()),
        He(t, "rotation") || (t.rotation = 0),
        He(t, "opacity") || (t.opacity = 1),
        He(t, "disableErase") || (t.disableErase = !0);
    })(t),
    vn(t)
      ? ((t) => {
          (t.fontSize = t.fontSize || 16),
            (t.fontFamily = t.fontFamily || "sans-serif"),
            (t.fontWeight = t.fontWeight || "normal"),
            (t.fontStyle = t.fontStyle || "normal"),
            (t.fontVariant = t.fontVariant || "normal"),
            (t.lineHeight = Ue(t.lineHeight) ? t.lineHeight : Gn),
            (t.color = t.color || [0, 0, 0]),
            wn(t) ? Zn(t) : qn(t);
        })(t)
      : kn(t)
      ? ((t) => {
          (t.cornerRadius = t.cornerRadius || 0),
            (t.strokeWidth = t.strokeWidth || 0),
            (t.strokeColor = t.strokeColor || [0, 0, 0]),
            Yn(t);
        })(t)
      : Tn(t)
      ? ((t) => {
          jn(t), Xn(t), Hn(t);
        })(t)
      : Mn(t)
      ? ((t) => {
          jn(t),
            (t.lineStart = t.lineStart || void 0),
            (t.lineEnd = t.lineEnd || void 0),
            Xn(t),
            Hn(t);
        })(t)
      : Cn(t)
      ? ((t) => {
          (t.strokeWidth = t.strokeWidth || 0), (t.strokeColor = t.strokeColor || [0, 0, 0]), Yn(t);
        })(t)
      : Rn(t) &&
        ((t) => {
          (t.strokeWidth = t.strokeWidth || 0),
            (t.strokeColor = t.strokeColor || [0, 0, 0]),
            Yn(t),
            Hn(t);
        })(t),
    $n(t),
    t
  ),
  Qn = (t) =>
    vn(t)
      ? "text"
      : kn(t)
      ? "rectangle"
      : Tn(t)
      ? "path"
      : Mn(t)
      ? "line"
      : Cn(t)
      ? "ellipse"
      : Rn(t)
      ? "triangle"
      : void 0,
  Jn = (t, e) => (parseFloat(t) / 100) * e,
  to = [
    "width",
    "height",
    "left",
    "top",
    "right",
    "bottom",
    "x",
    "y",
    "rx",
    "ry",
    "points",
    "fontSize",
    "strokeWidth",
    "lineHeight",
    "x1",
    "y1",
    "x2",
    "y2",
    "x3",
    "y3",
  ],
  eo = (t, e) => (
    to.forEach((n) =>
      ((t, e, { width: n, height: o }) => {
        if (!He(t, e)) return;
        let i = t[e];
        if (/points/.test(e)) {
          const i = t[e];
          if (!v(i[0].x)) return;
          t[e] = i.map((t) => X(Jn(t.x, n), Jn(t.y, o)));
        } else if (v(i)) {
          const r = parseFloat(i) / 100;
          /^x|left|width|rx|fontSize|cornerRadius|strokeWidth/.test(e)
            ? (t[e] = n * r)
            : /^right/.test(e)
            ? (t[e] = n - n * r)
            : /^y|top|height|ry/.test(e)
            ? (t[e] = o * r)
            : /^bottom/.test(e) && (t[e] = o - o * r);
        }
      })(t, n, e)
    ),
    ro(t, e),
    t
  ),
  no = (t, e) => {
    let n;
    return (
      /^x|width|rx|fontSize|strokeWidth|cornerRadius/.test(t)
        ? (n = e.width)
        : /^y|height|ry/.test(t) && (n = e.height),
      n
    );
  },
  oo = (t, e, n) =>
    e.reduce((e, o) => {
      const i = ((t, e, n) => (v(t[e]) ? Jn(t[e], no(e, n)) : t[e]))(t, o, n);
      return (e[o] = i), e;
    }, {}),
  io = (t, e, n) => (
    Object.keys(e).forEach((o) =>
      ((t, e, n, o) => {
        if (!v(t[e])) return (t[e] = n);
        let i = no(e, o);
        return (t[e] = Qe(n, i)), t;
      })(t, o, e[o], n)
    ),
    t
  ),
  ro = (t, e) => {
    if ((He(t, "left") && (t.x = t.left), He(t, "right"))) {
      const n = e.width - t.right;
      He(t, "left")
        ? ((t.x = t.left), (t.width = Math.max(0, n - t.left)))
        : He(t, "width") && (t.x = n - t.width);
    }
    if ((He(t, "top") && (t.y = t.top), He(t, "bottom"))) {
      const n = e.height - t.bottom;
      He(t, "top")
        ? ((t.y = t.top), (t.height = Math.max(0, n - t.top)))
        : He(t, "height") && (t.y = n - t.height);
    }
    return t;
  },
  ao = (t, e, n) => (
    Tn(t) &&
      t.points
        .filter((t) => Ue(t.x))
        .forEach((t) => {
          (t.x *= n), (t.y *= n), (t.x += e.x), (t.y += e.y);
        }),
    Rn(t) &&
      Ue(t.x1) &&
      ((t.x1 *= n),
      (t.y1 *= n),
      (t.x2 *= n),
      (t.y2 *= n),
      (t.x3 *= n),
      (t.y3 *= n),
      (t.x1 += e.x),
      (t.y1 += e.y),
      (t.x2 += e.x),
      (t.y2 += e.y),
      (t.x3 += e.x),
      (t.y3 += e.y)),
    Mn(t) &&
      Ue(t.x1) &&
      ((t.x1 *= n),
      (t.y1 *= n),
      (t.x2 *= n),
      (t.y2 *= n),
      (t.x1 += e.x),
      (t.y1 += e.y),
      (t.x2 += e.x),
      (t.y2 += e.y)),
    Ue(t.x) && Ue(t.y) && ((t.x *= n), (t.y *= n), (t.x += e.x), (t.y += e.y)),
    Ue(t.width) && Ue(t.height) && ((t.width *= n), (t.height *= n)),
    Ue(t.rx) && Ue(t.ry) && ((t.rx *= n), (t.ry *= n)),
    ((t) => Ue(t.strokeWidth) && t.strokeWidth > 0)(t) && (t.strokeWidth *= n),
    vn(t) && Ue(t.fontSize) && ((t.fontSize *= n), Ue(t.width) && !Ue(t.width) && (t.width *= n)),
    He(t, "cornerRadius") && Ue(t.cornerRadius) && (t.cornerRadius *= n),
    t
  ),
  so = (t, e, n, o, i) => {
    let r = {};
    const a = /solid/.test(o),
      s = 5 * e,
      l = a ? s : s - 1,
      c = a ? 0.5 * l : Math.ceil(0.5 * l),
      u = K(i),
      d = nt(Y(u), c),
      p = Y(t),
      h = Y(t);
    if (/arrow/.test(o)) {
      let o = t.x,
        i = t.y;
      const l = nt(Y(u), s),
        p = X(o + l.x, i + l.y);
      if ((nt(l, 0.55), a)) {
        const t = nt(Y(u), 0.5 * c);
        (o -= t.x),
          (i -= t.y),
          (r = {
            points: [X(o, i), X(p.x - l.y, p.y + l.x), X(p.x + l.y, p.y - l.x)],
            backgroundColor: n,
          }),
          (h.x += d.x),
          (h.y += d.y);
      } else {
        const t = nt(
            ((t) => {
              const e = t.x;
              return (t.x = -t.y), (t.y = e), t;
            })(Y(u)),
            0.5
          ),
          a = X(o - t.x, i - t.y),
          s = X(o + t.x, i + t.y);
        r = {
          points: [X(p.x + l.y, p.y - l.x), a, X(o, i), s, X(p.x - l.y, p.y + l.x)],
          strokeWidth: e,
          strokeColor: n,
        };
      }
    } else
      /circle/.test(o)
        ? ((h.x += d.x),
          (h.y += d.y),
          (r = {
            x: p.x,
            y: p.y,
            rx: c,
            ry: c,
            backgroundColor: a ? n : void 0,
            strokeWidth: a ? void 0 : e,
            strokeColor: a ? void 0 : n,
          }))
        : /square/.test(o)
        ? ((h.x += d.x),
          (h.y += d.y),
          (r = {
            x: p.x - c,
            y: p.y - c,
            width: 2 * c,
            height: 2 * c,
            rotation: ((g = u), Math.atan2(g.y, g.x)),
            backgroundColor: a ? n : void 0,
            strokeWidth: a ? void 0 : e,
            strokeColor: a ? void 0 : n,
          }))
        : "bar" === o &&
          (r = {
            points: [X(p.x - d.y, p.y + d.x), X(p.x + d.y, p.y - d.x)],
            strokeWidth: e,
            strokeColor: n,
          });
    var g;
    return { position: h, shape: r };
  };
const lo = (t, e, n, o) => t.drawImage(e, n.x, n.x, n.width, n.height, o.x, o.y, o.width, o.height);
var co = async (t, e, n, o, i = lo) => {
  t.save(), t.clip(), await i(t, e, n, o), t.restore();
};
const uo = (t, e, n) => {
    let o = Lt(0, 0, n.width, n.height);
    const i = Mt(t);
    if ("contain" === e) {
      const e = Yt(t, Wt(o));
      (i.width = e.width), (i.height = e.height), (i.x += e.x), (i.y += e.y);
    } else "cover" === e && (o = Yt(Lt(0, 0, o.width, o.height), Wt(i)));
    return { srcRect: o, destRect: i };
  },
  po = (t, e) => (
    e.cornerRadius > 0
      ? ((t, e, n, o, i, r) => {
          o < 2 * r && (r = o / 2),
            i < 2 * r && (r = i / 2),
            t.beginPath(),
            t.moveTo(e + r, n),
            t.arcTo(e + o, n, e + o, n + i, r),
            t.arcTo(e + o, n + i, e, n + i, r),
            t.arcTo(e, n + i, e, n, r),
            t.arcTo(e, n, e + o, n, r),
            t.closePath();
        })(t, e.x, e.y, e.width, e.height, e.cornerRadius)
      : t.rect(e.x, e.y, e.width, e.height),
    t
  ),
  ho = (t, e) => (e.backgroundColor && t.fill(), t),
  go = (t, e) => (e.strokeWidth && t.stroke(), t);
var mo = async (t, e, n = {}) =>
    new Promise((o, i) => {
      const { drawImage: r } = n;
      (t.lineWidth = e.strokeWidth ? e.strokeWidth : 1),
        (t.strokeStyle = e.strokeColor ? tn(e.strokeColor) : "none"),
        (t.fillStyle = e.backgroundColor ? tn(e.backgroundColor) : "none"),
        (t.globalAlpha = e.opacity),
        e.backgroundImage
          ? $n(e, async (e, n) => {
              if (e) return i(e);
              const { srcRect: a, destRect: s } = uo(
                n,
                n.backgroundSize,
                ht(n.backgroundImageElement)
              );
              po(t, n), ho(t, n), await co(t, n.backgroundImageElement, a, s, r), go(t, n), o([]);
            })
          : (po(t, e), ho(t, e), go(t, e), o([]));
    }),
  fo = async (t, e, n = {}) =>
    new Promise((o, i) => {
      const { drawImage: r } = n;
      (t.lineWidth = e.strokeWidth || 1),
        (t.strokeStyle = e.strokeColor ? tn(e.strokeColor) : "none"),
        (t.fillStyle = e.backgroundColor ? tn(e.backgroundColor) : "none"),
        (t.globalAlpha = e.opacity),
        t.ellipse(e.x, e.y, e.rx, e.ry, 0, 0, 2 * Math.PI),
        e.backgroundColor && t.fill(),
        e.backgroundImage
          ? $n(e, async (n, a) => {
              if (n) return i(n);
              const s = Lt(e.x - e.rx, e.y - e.ry, 2 * e.rx, 2 * e.ry),
                { srcRect: l, destRect: c } = uo(s, e.backgroundSize, ht(e.backgroundImageElement));
              await co(t, a.backgroundImageElement, l, c, r), e.strokeWidth && t.stroke(), o([]);
            })
          : (e.strokeWidth && t.stroke(), o([]));
    }),
  $o = async (t, e, n) => {
    const o = e.width && e.height ? dt(e) : ln(e.text, e),
      i = { x: e.x, y: e.y, width: e.width || o.width, height: o.height };
    mo(t, { ...e, ...i, options: n }), on(t, e);
    let r = 0;
    return (
      "center" == e.textAlign ? (r = -10) : "right" === e.textAlign && (r = -20),
      t.rect(e.x + r, e.y, e.width + 40, e.height),
      t.save(),
      t.clip(),
      un(t, e.width ? cn(t, e.text, e.width) : e.text, {
        x: e.x,
        y: e.y,
        fontSize: e.fontSize,
        textAlign: e.textAlign,
        lineHeight: e.lineHeight,
        lineWidth: e.width,
      }),
      t.restore(),
      []
    );
  };
const yo = (t) => {
  if (t && "none" !== t) return t;
};
var xo = async (t, e) =>
    new Promise(async (n, o) => {
      (t.lineWidth = e.strokeWidth || 1),
        (t.strokeStyle = e.strokeColor ? tn(e.strokeColor) : "none"),
        (t.globalAlpha = e.opacity);
      let i = yo(e.lineStart),
        r = yo(e.lineEnd),
        a = xn(e),
        s = bn(e);
      const l = i && so(a, e.strokeWidth, e.strokeColor, i, X(s.x - a.x, s.y - a.y)),
        c = r && so(s, e.strokeWidth, e.strokeColor, r, X(a.x - s.x, a.y - s.y));
      (a = l ? l.position : a),
        (s = c ? c.position : s),
        t.moveTo(a.x, a.y),
        t.lineTo(s.x, s.y),
        e.strokeWidth && t.stroke(),
        n([l && l.shape, c && c.shape].filter(Boolean));
    }),
  bo = async (t, e) =>
    new Promise((n, o) => {
      (t.lineWidth = e.strokeWidth || 1),
        (t.strokeStyle = e.strokeColor ? tn(e.strokeColor) : "none"),
        (t.fillStyle = e.backgroundColor ? tn(e.backgroundColor) : "none"),
        (t.globalAlpha = e.opacity);
      const { points: i } = e;
      t.moveTo(i[0].x, i[0].y);
      const r = i.length;
      for (let e = 1; e < r; e++) t.lineTo(i[e].x, i[e].y);
      e.strokeWidth && t.stroke(), e.backgroundColor && t.fill(), n([]);
    });
const vo = async (t, e, n) => {
  const o = ((t) => {
    if (kn(t)) return X(t.x + 0.5 * t.width, t.y + 0.5 * t.height);
    if (Cn(t)) return X(t.x, t.y);
    if (Sn(t)) {
      const e = t.height || ln(t.text, t).height;
      return X(t.x + 0.5 * t.width, t.y + 0.5 * e);
    }
    if (wn(t)) {
      const e = ln(t.text, t);
      return X(t.x + 0.5 * e.width, t.y + 0.5 * e.height);
    }
    return Tn(t) ? at(t.points) : Mn(t) ? at([xn(t), bn(t)]) : void 0;
  })(e);
  let i;
  return (
    Ae(t, e.rotation, o),
    ((t, e, n, o) => {
      (e || n) && (t.translate(o.x, o.y), t.scale(e ? -1 : 1, n ? -1 : 1), t.translate(-o.x, -o.y));
    })(t, e.flipX, e.flipY, o),
    kn(e) ? (i = mo) : Cn(e) ? (i = fo) : Mn(e) ? (i = xo) : Tn(e) ? (i = bo) : vn(e) && (i = $o),
    i ? [e, ...(await wo(t, await i(t, e, n), n))] : []
  );
};
var wo = async (t, e, n) => {
    let o = [];
    for (const i of e) t.save(), t.beginPath(), (o = [...o, ...(await vo(t, i, n))]), t.restore();
    return o;
  },
  So = async (t, e = {}) => {
    const { shapes: o = [], context: i = t, transform: r = n, drawImage: a } = e;
    if (!o.length) return t;
    let s;
    const l = p("canvas");
    (l.width = t.width), (l.height = t.height);
    const c = l.getContext("2d");
    c.putImageData(t, 0, 0);
    const u = o.map(hn).map((t) => eo(t, { x: 0, y: 0, width: i.width, height: i.height }));
    return (
      r(c), await wo(c, u, { drawImage: a }), (s = c.getImageData(0, 0, l.width, l.height)), g(l), s
    );
  },
  ko = async (t, e = {}) => {
    const { backgroundColor: n } = e;
    if (!n || (n && 0 === n[3])) return t;
    let o,
      i = p("canvas");
    (i.width = t.width), (i.height = t.height);
    const r = i.getContext("2d");
    return (
      r.putImageData(t, 0, 0),
      (r.globalCompositeOperation = "destination-over"),
      (r.fillStyle = tn(n)),
      r.fillRect(0, 0, i.width, i.height),
      (o = r.getImageData(0, 0, i.width, i.height)),
      g(i),
      o
    );
  },
  Co = (t) =>
    t.length
      ? t.reduce(
          (t, e) =>
            ((t, e) => {
              const n = new Array(20);
              return (
                (n[0] = t[0] * e[0] + t[1] * e[5] + t[2] * e[10] + t[3] * e[15]),
                (n[1] = t[0] * e[1] + t[1] * e[6] + t[2] * e[11] + t[3] * e[16]),
                (n[2] = t[0] * e[2] + t[1] * e[7] + t[2] * e[12] + t[3] * e[17]),
                (n[3] = t[0] * e[3] + t[1] * e[8] + t[2] * e[13] + t[3] * e[18]),
                (n[4] = t[0] * e[4] + t[1] * e[9] + t[2] * e[14] + t[3] * e[19] + t[4]),
                (n[5] = t[5] * e[0] + t[6] * e[5] + t[7] * e[10] + t[8] * e[15]),
                (n[6] = t[5] * e[1] + t[6] * e[6] + t[7] * e[11] + t[8] * e[16]),
                (n[7] = t[5] * e[2] + t[6] * e[7] + t[7] * e[12] + t[8] * e[17]),
                (n[8] = t[5] * e[3] + t[6] * e[8] + t[7] * e[13] + t[8] * e[18]),
                (n[9] = t[5] * e[4] + t[6] * e[9] + t[7] * e[14] + t[8] * e[19] + t[9]),
                (n[10] = t[10] * e[0] + t[11] * e[5] + t[12] * e[10] + t[13] * e[15]),
                (n[11] = t[10] * e[1] + t[11] * e[6] + t[12] * e[11] + t[13] * e[16]),
                (n[12] = t[10] * e[2] + t[11] * e[7] + t[12] * e[12] + t[13] * e[17]),
                (n[13] = t[10] * e[3] + t[11] * e[8] + t[12] * e[13] + t[13] * e[18]),
                (n[14] = t[10] * e[4] + t[11] * e[9] + t[12] * e[14] + t[13] * e[19] + t[14]),
                (n[15] = t[15] * e[0] + t[16] * e[5] + t[17] * e[10] + t[18] * e[15]),
                (n[16] = t[15] * e[1] + t[16] * e[6] + t[17] * e[11] + t[18] * e[16]),
                (n[17] = t[15] * e[2] + t[16] * e[7] + t[17] * e[12] + t[18] * e[17]),
                (n[18] = t[15] * e[3] + t[16] * e[8] + t[17] * e[13] + t[18] * e[18]),
                (n[19] = t[15] * e[4] + t[16] * e[9] + t[17] * e[14] + t[18] * e[19] + t[19]),
                n
              );
            })([...t], e),
          t.shift()
        )
      : [];
function Mo() {}
const Ro = (t) => t;
function To(t, e) {
  for (const n in e) t[n] = e[n];
  return t;
}
function Po(t) {
  return t();
}
function Eo() {
  return Object.create(null);
}
function Ao(t) {
  t.forEach(Po);
}
function Io(t) {
  return "function" == typeof t;
}
function Lo(t, e) {
  return t != t ? e == e : t !== e || (t && "object" == typeof t) || "function" == typeof t;
}
function Fo(t, ...e) {
  if (null == t) return Mo;
  const n = t.subscribe(...e);
  return n.unsubscribe ? () => n.unsubscribe() : n;
}
function Bo(t) {
  let e;
  return Fo(t, (t) => (e = t))(), e;
}
function zo(t, e, n) {
  t.$$.on_destroy.push(Fo(e, n));
}
function Do(t, e, n, o) {
  if (t) {
    const i = Oo(t, e, n, o);
    return t[0](i);
  }
}
function Oo(t, e, n, o) {
  return t[1] && o ? To(n.ctx.slice(), t[1](o(e))) : n.ctx;
}
function _o(t, e, n, o, i, r, a) {
  const s = (function (t, e, n, o) {
    if (t[2] && o) {
      const i = t[2](o(n));
      if (void 0 === e.dirty) return i;
      if ("object" == typeof i) {
        const t = [],
          n = Math.max(e.dirty.length, i.length);
        for (let o = 0; o < n; o += 1) t[o] = e.dirty[o] | i[o];
        return t;
      }
      return e.dirty | i;
    }
    return e.dirty;
  })(e, o, i, r);
  if (s) {
    const i = Oo(e, n, o, a);
    t.p(i, s);
  }
}
function Wo(t) {
  const e = {};
  for (const n in t) "$" !== n[0] && (e[n] = t[n]);
  return e;
}
function Vo(t, e, n = e) {
  return t.set(n), e;
}
function Uo(t) {
  return t && Io(t.destroy) ? t.destroy : Mo;
}
const No = "undefined" != typeof window;
let Ho = No ? () => window.performance.now() : () => Date.now(),
  Xo = No ? (t) => requestAnimationFrame(t) : Mo;
const jo = new Set();
function Yo(t) {
  jo.forEach((e) => {
    e.c(t) || (jo.delete(e), e.f());
  }),
    0 !== jo.size && Xo(Yo);
}
function Go(t) {
  let e;
  return (
    0 === jo.size && Xo(Yo),
    {
      promise: new Promise((n) => {
        jo.add((e = { c: t, f: n }));
      }),
      abort() {
        jo.delete(e);
      },
    }
  );
}
function Zo(t, e) {
  t.appendChild(e);
}
function qo(t, e, n) {
  t.insertBefore(e, n || null);
}
function Ko(t) {
  t.parentNode.removeChild(t);
}
function Qo(t) {
  return document.createElement(t);
}
function Jo(t) {
  return document.createElementNS("http://www.w3.org/2000/svg", t);
}
function ti(t) {
  return document.createTextNode(t);
}
function ei() {
  return ti(" ");
}
function ni() {
  return ti("");
}
function oi(t, e, n, o) {
  return t.addEventListener(e, n, o), () => t.removeEventListener(e, n, o);
}
function ii(t) {
  return function (e) {
    return e.preventDefault(), t.call(this, e);
  };
}
function ri(t) {
  return function (e) {
    return e.stopPropagation(), t.call(this, e);
  };
}
function ai(t, e, n) {
  null == n ? t.removeAttribute(e) : t.getAttribute(e) !== n && t.setAttribute(e, n);
}
function si(t, e) {
  const n = Object.getOwnPropertyDescriptors(t.__proto__);
  for (const o in e)
    null == e[o]
      ? t.removeAttribute(o)
      : "style" === o
      ? (t.style.cssText = e[o])
      : "__value" === o
      ? (t.value = t[o] = e[o])
      : n[o] && n[o].set
      ? (t[o] = e[o])
      : ai(t, o, e[o]);
}
function li(t, e) {
  (e = "" + e), t.wholeText !== e && (t.data = e);
}
function ci(t, e) {
  t.value = null == e ? "" : e;
}
function ui(t, e) {
  const n = document.createEvent("CustomEvent");
  return n.initCustomEvent(t, !1, !1, e), n;
}
const di = new Set();
let pi,
  hi = 0;
function gi(t, e, n, o, i, r, a, s = 0) {
  const l = 16.666 / o;
  let c = "{\n";
  for (let t = 0; t <= 1; t += l) {
    const o = e + (n - e) * r(t);
    c += 100 * t + `%{${a(o, 1 - o)}}\n`;
  }
  const u = c + `100% {${a(n, 1 - n)}}\n}`,
    d = `__svelte_${(function (t) {
      let e = 5381,
        n = t.length;
      for (; n--; ) e = ((e << 5) - e) ^ t.charCodeAt(n);
      return e >>> 0;
    })(u)}_${s}`,
    p = t.ownerDocument;
  di.add(p);
  const h =
      p.__svelte_stylesheet || (p.__svelte_stylesheet = p.head.appendChild(Qo("style")).sheet),
    g = p.__svelte_rules || (p.__svelte_rules = {});
  g[d] || ((g[d] = !0), h.insertRule(`@keyframes ${d} ${u}`, h.cssRules.length));
  const m = t.style.animation || "";
  return (t.style.animation = `${m ? m + ", " : ""}${d} ${o}ms linear ${i}ms 1 both`), (hi += 1), d;
}
function mi(t, e) {
  const n = (t.style.animation || "").split(", "),
    o = n.filter(e ? (t) => t.indexOf(e) < 0 : (t) => -1 === t.indexOf("__svelte")),
    i = n.length - o.length;
  i &&
    ((t.style.animation = o.join(", ")),
    (hi -= i),
    hi ||
      Xo(() => {
        hi ||
          (di.forEach((t) => {
            const e = t.__svelte_stylesheet;
            let n = e.cssRules.length;
            for (; n--; ) e.deleteRule(n);
            t.__svelte_rules = {};
          }),
          di.clear());
      }));
}
function fi(t) {
  pi = t;
}
function $i() {
  if (!pi) throw new Error("Function called outside component initialization");
  return pi;
}
function yi(t) {
  $i().$$.on_mount.push(t);
}
function xi(t) {
  $i().$$.after_update.push(t);
}
function bi(t) {
  $i().$$.on_destroy.push(t);
}
function vi() {
  const t = $i();
  return (e, n) => {
    const o = t.$$.callbacks[e];
    if (o) {
      const i = ui(e, n);
      o.slice().forEach((e) => {
        e.call(t, i);
      });
    }
  };
}
function wi(t, e) {
  $i().$$.context.set(t, e);
}
function Si(t) {
  return $i().$$.context.get(t);
}
function ki(t, e) {
  const n = t.$$.callbacks[e.type];
  n && n.slice().forEach((t) => t(e));
}
const Ci = [],
  Mi = [],
  Ri = [],
  Ti = [],
  Pi = Promise.resolve();
let Ei = !1;
function Ai(t) {
  Ri.push(t);
}
function Ii(t) {
  Ti.push(t);
}
let Li = !1;
const Fi = new Set();
function Bi() {
  if (!Li) {
    Li = !0;
    do {
      for (let t = 0; t < Ci.length; t += 1) {
        const e = Ci[t];
        fi(e), zi(e.$$);
      }
      for (fi(null), Ci.length = 0; Mi.length; ) Mi.pop()();
      for (let t = 0; t < Ri.length; t += 1) {
        const e = Ri[t];
        Fi.has(e) || (Fi.add(e), e());
      }
      Ri.length = 0;
    } while (Ci.length);
    for (; Ti.length; ) Ti.pop()();
    (Ei = !1), (Li = !1), Fi.clear();
  }
}
function zi(t) {
  if (null !== t.fragment) {
    t.update(), Ao(t.before_update);
    const e = t.dirty;
    (t.dirty = [-1]), t.fragment && t.fragment.p(t.ctx, e), t.after_update.forEach(Ai);
  }
}
let Di;
function Oi(t, e, n) {
  t.dispatchEvent(ui(`${e ? "intro" : "outro"}${n}`));
}
const _i = new Set();
let Wi;
function Vi() {
  Wi = { r: 0, c: [], p: Wi };
}
function Ui() {
  Wi.r || Ao(Wi.c), (Wi = Wi.p);
}
function Ni(t, e) {
  t && t.i && (_i.delete(t), t.i(e));
}
function Hi(t, e, n, o) {
  if (t && t.o) {
    if (_i.has(t)) return;
    _i.add(t),
      Wi.c.push(() => {
        _i.delete(t), o && (n && t.d(1), o());
      }),
      t.o(e);
  }
}
const Xi = { duration: 0 };
function ji(t, e, n, o) {
  let i = e(t, n),
    r = o ? 0 : 1,
    a = null,
    s = null,
    l = null;
  function c() {
    l && mi(t, l);
  }
  function u(t, e) {
    const n = t.b - r;
    return (
      (e *= Math.abs(n)),
      { a: r, b: t.b, d: n, duration: e, start: t.start, end: t.start + e, group: t.group }
    );
  }
  function d(e) {
    const { delay: n = 0, duration: o = 300, easing: d = Ro, tick: p = Mo, css: h } = i || Xi,
      g = { start: Ho() + n, b: e };
    e || ((g.group = Wi), (Wi.r += 1)),
      a || s
        ? (s = g)
        : (h && (c(), (l = gi(t, r, e, o, n, d, h))),
          e && p(0, 1),
          (a = u(g, o)),
          Ai(() => Oi(t, e, "start")),
          Go((e) => {
            if (
              (s &&
                e > s.start &&
                ((a = u(s, o)),
                (s = null),
                Oi(t, a.b, "start"),
                h && (c(), (l = gi(t, r, a.b, a.duration, 0, d, i.css)))),
              a)
            )
              if (e >= a.end)
                p((r = a.b), 1 - r),
                  Oi(t, a.b, "end"),
                  s || (a.b ? c() : --a.group.r || Ao(a.group.c)),
                  (a = null);
              else if (e >= a.start) {
                const t = e - a.start;
                (r = a.a + a.d * d(t / a.duration)), p(r, 1 - r);
              }
            return !(!a && !s);
          }));
  }
  return {
    run(t) {
      Io(i)
        ? (Di ||
            ((Di = Promise.resolve()),
            Di.then(() => {
              Di = null;
            })),
          Di).then(() => {
            (i = i()), d(t);
          })
        : d(t);
    },
    end() {
      c(), (a = s = null);
    },
  };
}
const Yi =
  "undefined" != typeof window ? window : "undefined" != typeof globalThis ? globalThis : global;
function Gi(t, e) {
  t.d(1), e.delete(t.key);
}
function Zi(t, e) {
  Hi(t, 1, 1, () => {
    e.delete(t.key);
  });
}
function qi(t, e, n, o, i, r, a, s, l, c, u, d) {
  let p = t.length,
    h = r.length,
    g = p;
  const m = {};
  for (; g--; ) m[t[g].key] = g;
  const f = [],
    $ = new Map(),
    y = new Map();
  for (g = h; g--; ) {
    const t = d(i, r, g),
      s = n(t);
    let l = a.get(s);
    l ? o && l.p(t, e) : ((l = c(s, t)), l.c()),
      $.set(s, (f[g] = l)),
      s in m && y.set(s, Math.abs(g - m[s]));
  }
  const x = new Set(),
    b = new Set();
  function v(t) {
    Ni(t, 1), t.m(s, u), a.set(t.key, t), (u = t.first), h--;
  }
  for (; p && h; ) {
    const e = f[h - 1],
      n = t[p - 1],
      o = e.key,
      i = n.key;
    e === n
      ? ((u = e.first), p--, h--)
      : $.has(i)
      ? !a.has(o) || x.has(o)
        ? v(e)
        : b.has(i)
        ? p--
        : y.get(o) > y.get(i)
        ? (b.add(o), v(e))
        : (x.add(i), p--)
      : (l(n, a), p--);
  }
  for (; p--; ) {
    const e = t[p];
    $.has(e.key) || l(e, a);
  }
  for (; h; ) v(f[h - 1]);
  return f;
}
function Ki(t, e) {
  const n = {},
    o = {},
    i = { $$scope: 1 };
  let r = t.length;
  for (; r--; ) {
    const a = t[r],
      s = e[r];
    if (s) {
      for (const t in a) t in s || (o[t] = 1);
      for (const t in s) i[t] || ((n[t] = s[t]), (i[t] = 1));
      t[r] = s;
    } else for (const t in a) i[t] = 1;
  }
  for (const t in o) t in n || (n[t] = void 0);
  return n;
}
function Qi(t) {
  return "object" == typeof t && null !== t ? t : {};
}
function Ji(t, e, n) {
  const o = t.$$.props[e];
  void 0 !== o && ((t.$$.bound[o] = n), n(t.$$.ctx[o]));
}
function tr(t) {
  t && t.c();
}
function er(t, e, n, o) {
  const { fragment: i, on_mount: r, on_destroy: a, after_update: s } = t.$$;
  i && i.m(e, n),
    o ||
      Ai(() => {
        const e = r.map(Po).filter(Io);
        a ? a.push(...e) : Ao(e), (t.$$.on_mount = []);
      }),
    s.forEach(Ai);
}
function nr(t, e) {
  const n = t.$$;
  null !== n.fragment &&
    (Ao(n.on_destroy),
    n.fragment && n.fragment.d(e),
    (n.on_destroy = n.fragment = null),
    (n.ctx = []));
}
function or(t, e) {
  -1 === t.$$.dirty[0] && (Ci.push(t), Ei || ((Ei = !0), Pi.then(Bi)), t.$$.dirty.fill(0)),
    (t.$$.dirty[(e / 31) | 0] |= 1 << e % 31);
}
function ir(t, e, n, o, i, r, a = [-1]) {
  const s = pi;
  fi(t);
  const l = (t.$$ = {
    fragment: null,
    ctx: null,
    props: r,
    update: Mo,
    not_equal: i,
    bound: Eo(),
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(s ? s.$$.context : e.context || []),
    callbacks: Eo(),
    dirty: a,
    skip_bound: !1,
  });
  let c = !1;
  if (
    ((l.ctx = n
      ? n(t, e.props || {}, (e, n, ...o) => {
          const r = o.length ? o[0] : n;
          return (
            l.ctx &&
              i(l.ctx[e], (l.ctx[e] = r)) &&
              (!l.skip_bound && l.bound[e] && l.bound[e](r), c && or(t, e)),
            n
          );
        })
      : []),
    l.update(),
    (c = !0),
    Ao(l.before_update),
    (l.fragment = !!o && o(l.ctx)),
    e.target)
  ) {
    if (e.hydrate) {
      const t = (function (t) {
        return Array.from(t.childNodes);
      })(e.target);
      l.fragment && l.fragment.l(t), t.forEach(Ko);
    } else l.fragment && l.fragment.c();
    e.intro && Ni(t.$$.fragment), er(t, e.target, e.anchor, e.customElement), Bi();
  }
  fi(s);
}
class rr {
  $destroy() {
    nr(this, 1), (this.$destroy = Mo);
  }
  $on(t, e) {
    const n = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
    return (
      n.push(e),
      () => {
        const t = n.indexOf(e);
        -1 !== t && n.splice(t, 1);
      }
    );
  }
  $set(t) {
    var e;
    this.$$set &&
      ((e = t), 0 !== Object.keys(e).length) &&
      ((this.$$.skip_bound = !0), this.$$set(t), (this.$$.skip_bound = !1));
  }
}
const ar = [];
function sr(t, e) {
  return { subscribe: lr(t, e).subscribe };
}
function lr(t, e = Mo) {
  let n;
  const o = [];
  function i(e) {
    if (Lo(t, e) && ((t = e), n)) {
      const e = !ar.length;
      for (let e = 0; e < o.length; e += 1) {
        const n = o[e];
        n[1](), ar.push(n, t);
      }
      if (e) {
        for (let t = 0; t < ar.length; t += 2) ar[t][0](ar[t + 1]);
        ar.length = 0;
      }
    }
  }
  return {
    set: i,
    update: function (e) {
      i(e(t));
    },
    subscribe: function (r, a = Mo) {
      const s = [r, a];
      return (
        o.push(s),
        1 === o.length && (n = e(i) || Mo),
        r(t),
        () => {
          const t = o.indexOf(s);
          -1 !== t && o.splice(t, 1), 0 === o.length && (n(), (n = null));
        }
      );
    },
  };
}
function cr(t, e, n) {
  const o = !Array.isArray(t),
    i = o ? [t] : t,
    r = e.length < 2;
  return sr(n, (t) => {
    let n = !1;
    const a = [];
    let s = 0,
      l = Mo;
    const c = () => {
        if (s) return;
        l();
        const n = e(o ? a[0] : a, t);
        r ? t(n) : (l = Io(n) ? n : Mo);
      },
      u = i.map((t, e) =>
        Fo(
          t,
          (t) => {
            (a[e] = t), (s &= ~(1 << e)), n && c();
          },
          () => {
            s |= 1 << e;
          }
        )
      );
    return (
      (n = !0),
      c(),
      function () {
        Ao(u), l();
      }
    );
  });
}
var ur = (t) => t.reduce((t, e) => Object.assign(t, e), {});
const dr = (t) => ({ updateValue: t }),
  pr = (t) => ({ defaultValue: t }),
  hr = (t) => ({ store: (e, n) => cr(...t(n)) }),
  gr = (t) => ({
    store: (e, n) => {
      const [o, i, r = () => !1] = t(n);
      let a,
        s = !0;
      return cr(o, (t, e) => {
        i(t, (t) => {
          (!s && r(a, t)) || ((a = t), (s = !1), e(t));
        });
      });
    },
  }),
  mr = (t) => ({
    store: (e, n) => {
      const [o, i = {}] = t(n);
      let r = [],
        a = {};
      const s = (t) => o(t, a),
        l = (t) => {
          (r.length || t.length) && ((r = t), c());
        },
        c = () => {
          const t = r.map(s);
          (r = t), d(t);
        };
      Object.keys(i).forEach((t) => {
        i[t].subscribe((e) => {
          (a[t] = e), e && c();
        });
      });
      const { subscribe: u, set: d } = lr(e);
      return { set: l, update: (t) => l(t(null)), subscribe: u };
    },
  });
var fr = (t) => {
    const e = {},
      o = {};
    return (
      t.forEach(([t, ...i]) => {
        const r = ur(i),
          a = (e[t] = ((t, e, o) => {
            const { store: i = (t) => lr(t), defaultValue: r = n, updateValue: a } = o,
              s = i(r(), e, t),
              { subscribe: l, update: c = n } = s;
            let u;
            const d = (t) => {
                let e = !0;
                u && u(),
                  (u = l((n) => {
                    if (e) return (e = !1);
                    t(n), u(), (u = void 0);
                  }));
              },
              p = a ? a(t) : D;
            return (s.set = (t) => c((e) => p(t, e, d))), (s.defaultValue = r), s;
          })(o, e, r)),
          s = { get: () => Bo(a), set: a.set };
        Object.defineProperty(o, t, s);
      }),
      { stores: e, accessors: o }
    );
  },
  $r = [["src"], ["imageReader"], ["imageWriter"], ["images", pr(() => [])]],
  yr = () => {
    let t = [];
    return {
      sub: (e, n) => (
        t.push({ event: e, callback: n }),
        () => (t = t.filter((t) => t.event !== e || t.callback !== n))
      ),
      pub: (e, n) => {
        t.filter((t) => t.event === e).forEach((t) => t.callback(n));
      },
    };
  },
  xr = (t) => t.charAt(0).toUpperCase() + t.slice(1),
  br = (t, e) => {
    Object.keys(e).forEach((n) => {
      const o = Xe(e[n]) ? { value: e[n], writable: !1 } : e[n];
      Object.defineProperty(t, n, o);
    });
  },
  vr = (t, e = 12) => parseFloat(t.toFixed(e));
var wr = (t, e) => {
    const n = oe(e),
      o = H();
    Zt(t).forEach((t) => {
      tt(t, o),
        ne(t, e) ||
          n.forEach((e) => {
            const n = Math.atan2(e.start.y - e.end.y, e.start.x - e.end.x),
              i = 1e4 * Math.sin(Math.PI - n),
              r = 1e4 * Math.cos(Math.PI - n),
              a = X(t.x + i, t.y + r),
              s = St(wt(e), 1e4),
              l = te(vt(t, a), s);
            l && tt(o, et(Y(l), t));
          });
    });
    const i = Mt(t);
    tt(i, o);
    return !!Zt(i).every((t) => ne(t, e)) && (Ut(t, i), !0);
  },
  Sr = (t, e) => {
    const n = Zt(t),
      o = oe(e).map((t) => St(t, 5)),
      i = Ft(t),
      r = [];
    n.forEach((t) => {
      const e = ((t, e) => {
        if (0 === e) return t;
        const n = X(t.start.x - t.end.x, t.start.y - t.end.y),
          o = K(n),
          i = nt(o, e);
        return (t.end.x += i.x), (t.end.y += i.y), t;
      })(vt(Y(i), Y(t)), 1e6);
      let n = !1;
      o.map(wt).forEach((t) => {
        const o = te(e, t);
        o && !n && (r.push(o), (n = !0));
      });
    });
    const a = rt(r[0], r[2]) < rt(r[1], r[3]) ? [r[0], r[2]] : [r[1], r[3]],
      s = Et(a);
    return s.width < t.width && (Ut(t, s), !0);
  },
  kr = (t, e, n = { x: 0, y: 0 }) => {
    const o = Tt(t),
      i = Ft(o),
      r = Kt(o, n, i).map((t) => Z(t, e, i)),
      a = Et(r);
    return r.map((t) => et(t, a));
  },
  Cr = (t, e = 0, n = Wt(t)) => {
    let o, i;
    if (0 !== e) {
      const r = Math.atan2(1, n),
        a = Math.sign(e) * e,
        s = a % Math.PI,
        l = a % _;
      let c, u;
      (u = s > W && s < _ + W ? (l > W ? a : _ - l) : l > W ? _ - l : a),
        (c = Math.min(Math.abs(t.height / Math.sin(r + u)), Math.abs(t.width / Math.cos(r - u)))),
        (o = Math.cos(r) * c),
        (i = o / n);
    } else (o = t.width), (i = o / n), i > t.height && ((i = t.height), (o = i * n));
    return gt(o, i);
  },
  Mr = (t, e, n, o, i, r, a, s) => {
    const l = ut(a),
      c = ut(s),
      u = vr(Math.max(e.width / c.width, e.height / c.height)),
      d = vr(Math.min(e.width / l.width, e.height / l.height)),
      p = Mt(e);
    if (d < 1 || u > 1) {
      const n = Ft(t),
        o = Ft(e),
        i = d < 1 ? d : u,
        r = (o.x + n.x) / 2,
        a = (o.y + n.y) / 2,
        s = p.width / i,
        l = p.height / i;
      Vt(p, r - 0.5 * s, a - 0.5 * l, s, l);
    }
    return r
      ? (((t, e, n = 0, o = H(), i) => {
          if ((Ue(n) && 0 !== n) || o.x || o.y) {
            const i = Wt(t),
              r = kr(e, n, o),
              a = Cr(e, n, i);
            if (!(t.width < a.width && t.height < a.height)) {
              const e = 0.5 * t.width - 0.5 * a.width,
                n = 0.5 * t.height - 0.5 * a.height;
              t.width > a.width && ((t.width = a.width), (t.x += e)),
                t.height > a.height && ((t.height = a.height), (t.y += n));
            }
            wr(t, r), Sr(t, r) && wr(t, r);
          } else {
            let n = Wt(t);
            (t.width = Math.min(t.width, e.width)),
              (t.height = Math.min(t.height, e.height)),
              (t.x = Math.max(t.x, 0)),
              t.x + t.width > e.width && (t.x -= t.x + t.width - e.width),
              (t.y = Math.max(t.y, 0)),
              t.y + t.height > e.height && (t.y -= t.y + t.height - e.height);
            const o = Ft(t),
              r = Yt(t, n);
            (r.width = Math.max(i.width, r.width)),
              (r.height = Math.max(i.height, r.height)),
              (r.x = o.x - 0.5 * r.width),
              (r.y = o.y - 0.5 * r.height),
              Ut(t, r);
          }
        })(p, n, o, i, l),
        { crop: p })
      : { crop: p };
  },
  Rr = (t, e, n, o = { x: 0, y: 0 }) => {
    const i = Tt(t),
      r = Ft(i),
      a = Nt(i, n, r),
      s = Ft(Qt(Et(a))),
      l = Ft(e),
      c = Z(l, -n, s),
      u = et(c, s),
      d = J(tt(r, u), vr);
    return Lt(d.x - 0.5 * e.width, d.y - 0.5 * e.height, e.width, e.height);
  },
  Tr = (t, e, n) => Math.max(e, Math.min(t, n));
const Pr = [
    "cropLimitToImage",
    "cropMinSize",
    "cropMaxSize",
    "cropAspectRatio",
    "flipX",
    "flipY",
    "rotation",
    "crop",
    "colorMatrix",
    "convolutionMatrix",
    "gamma",
    "vignette",
    "annotation",
    "decoration",
    "backgroundColor",
    "targetSize",
  ],
  Er = (t) => (je(t) ? t.map(Er) : y(t) ? { ...t } : t),
  Ar = ["isDraft", "isFormatted", "isComplete", "isError", "isLoading", "isEditing", "isSelected"],
  Ir = (t) =>
    t.map((t) =>
      Object.keys(t).reduce((e, n) => {
        return Ar.includes(n) || ((o = t[n]), re(o)) || (e[n] = t[n]), e;
        var o;
      }, {})
    );
var Lr = (t, e) => {
  if (t.length !== e.length) return !1;
  for (let n = 0; n < t.length; n++) if (t[n] !== e[n]) return !1;
  return !0;
};
let Fr = null;
var Br = () => (null === Fr && (Fr = ve(/Android/)), Fr);
let zr = null;
let Dr = null;
let Or = null;
let _r;
var Wr = () =>
  _r ||
  ((_r = Se()
    ? "ios"
    : Br()
    ? "android"
    : (null === zr && (zr = ve(/Firefox/)),
      zr
        ? "firefox"
        : (null === Dr && (Dr = ve(/MSIE|Trident/)),
          Dr ? "ie" : (null === Or && (Or = ve(/Edge/)), Or ? "edge" : "chrome")))),
  _r);
let Vr;
const Ur = -W,
  Nr = W,
  Hr = (t, e, n) => {
    const o = J(Ft(t), (t) => vr(t, 8)),
      i = Tt(e),
      r = Ft(i),
      a = Nt(i, n, r),
      s = J($t(Et(a)), (t) => vr(t, 8)),
      l = Math.abs(s.x - o.x),
      c = Math.abs(s.y - o.y);
    return l < 1 && c < 1;
  },
  Xr = (t, e, n, o) => {
    const i = Math.max(n.width / o.width, n.height / o.height),
      r = gt(o.width * i, o.height * i),
      a = ((t) => Math.sqrt(t.width * t.width + t.height * t.height))(r);
    if (a < Math.min(t.width, t.height)) return [Ur, Nr];
    const s = e ? t.height : t.width,
      l = e ? t.width : t.height,
      c = Math.acos(r.height / a),
      u = c - Math.acos(l / a),
      d = Math.asin(s / a) - c;
    if (Number.isNaN(u) && Number.isNaN(d)) return [Ur, Nr];
    const p = Number.isNaN(u) ? d : Number.isNaN(d) ? u : Math.min(u, d);
    return [Math.max(-p, Ur), Math.min(p, Nr)];
  },
  jr = (t, e) => (
    t.isFormatted || ((t = Kn(t)).isFormatted = !0),
    t.isDraft ||
      !Bn(t) ||
      (t.context && _t(e.context, t.context)) ||
      ((t = ro(t, e.context)).context = { ...e.context }),
    t
  );
var Yr = [
    ["file"],
    ["size"],
    ["loadState"],
    ["processState"],
    ["aspectRatio", hr(({ size: t }) => [t, (t) => (t ? Wt(t) : void 0)])],
    ["perspectiveX", pr(() => 0)],
    ["perspectiveY", pr(() => 0)],
    [
      "perspective",
      hr(({ perspectiveX: t, perspectiveY: e }) => [[t, e], ([t, e]) => ({ x: t, y: e })]),
    ],
    [
      "rotation",
      pr(() => 0),
      dr((t) => (e, n, o) => {
        if (e === n) return e;
        const {
          loadState: i,
          size: r,
          rotationRange: a,
          cropMinSize: s,
          cropMaxSize: l,
          crop: c,
          perspective: u,
          cropLimitToImage: d,
          cropOrigin: p,
        } = t;
        if (!i || !i.beforeComplete) return e;
        const h = ((t, e, n) => {
            const o = Cr(e, n, Wt(t));
            return mt(bt(o, Math.round), bt(ut(t), Math.round));
          })(c, r, n),
          g = Hr(c, r, n),
          m = ((t, e, n, o, i, r, a, s, l, c) => {
            const u = ut(l);
            let d = ut(c);
            a &&
              ((d.width = Math.min(c.width, i.width)), (d.height = Math.min(c.height, i.height)));
            let p = !1;
            const h = (e, n) => {
                const l = Rr(i, o, e, null),
                  c = Tt(i),
                  g = Ft(c),
                  m = Kt(c, r, g),
                  f = et(Y(g), Jt(m)),
                  $ = Z(Ft(l), n, g),
                  y = et(Y(g), $);
                m.forEach((t) => Z(t, n, g));
                const x = Et(m),
                  b = Jt(m),
                  v = tt(et(et(b, y), x), f),
                  w = Lt(v.x - 0.5 * l.width, v.y - 0.5 * l.height, l.width, l.height);
                if ((s && zt(w, s.width / w.width), a)) {
                  const t = kr(i, n, r);
                  Sr(w, t);
                }
                const S = vr(Math.min(w.width / u.width, w.height / u.height), 8),
                  k = vr(Math.max(w.width / d.width, w.height / d.height), 8);
                return (S < 1 || k > 1) && vr(Math.abs(n - e)) === vr(Math.PI / 2) && !p
                  ? ((p = !0), h(t, t + Math.sign(n - e) * Math.PI))
                  : { rotation: n, crop: qt(w, (t) => vr(t, 8)) };
              },
              g = Math.sign(e) * Math.round(Math.abs(e) / _) * _,
              m = Tr(e, g + n[0], g + n[1]);
            return h(t, m);
          })(n, e, a, c, r, u, d, p, s, l);
        if (h && g) {
          const t = Cr(r, e, Wt(m.crop));
          (m.crop.x += 0.5 * m.crop.width),
            (m.crop.y += 0.5 * m.crop.height),
            (m.crop.x -= 0.5 * t.width),
            (m.crop.y -= 0.5 * t.height),
            (m.crop.width = t.width),
            (m.crop.height = t.height);
        }
        return (
          o(() => {
            t.crop = qt(m.crop, (t) => vr(t, 8));
          }),
          m.rotation
        );
      }),
    ],
    ["flipX", pr(() => !1)],
    ["flipY", pr(() => !1)],
    ["flip", hr(({ flipX: t, flipY: e }) => [[t, e], ([t, e]) => ({ x: t, y: e })])],
    ["isRotatedSideways", gr(({ rotation: t }) => [[t], ([t], e) => e(V(t)), (t, e) => t !== e])],
    [
      "crop",
      dr((t) => (e, n = e) => {
        const {
          loadState: o,
          size: i,
          cropMinSize: r,
          cropMaxSize: a,
          cropLimitToImage: s,
          cropAspectRatio: l,
          rotation: c,
          perspective: u,
        } = t;
        if ((!e && !n) || !o || !o.beforeComplete) return e;
        e || (e = { x: 0, y: 0, ...Cr(i, c, l || Wt(i)) });
        const d = Mr(n, e, i, c, u, s, r, a);
        return qt(d.crop, (t) => vr(t, 8));
      }),
    ],
    [
      "cropAspectRatio",
      dr((t) => (e) => {
        const { loadState: n, crop: o, size: i, rotation: r } = t,
          a = ((t) => {
            if (t) {
              if (/:/.test(t)) {
                const [e, n] = t.split(":");
                return e / n;
              }
              return parseFloat(t);
            }
          })(e);
        if (a) {
          if (!n || !n.beforeComplete) return a;
          if (Hr(o, i, r)) {
            const n = ((t, e) => {
              const n = t.width,
                o = t.height;
              return V(e) && ((t.width = o), (t.height = n)), t;
            })(ut(i), r);
            t.crop = qt(Yt(Tt(n), e), vr);
          } else {
            const e = { width: o.height * a, height: o.height },
              n = 0.5 * (o.width - e.width),
              i = 0.5 * (o.height - e.height);
            t.crop = qt(Lt(o.x + n, o.y + i, e.width, e.height), vr);
          }
          return a;
        }
      }),
    ],
    ["cropOrigin"],
    ["cropMinSize", pr(() => ({ width: 1, height: 1 }))],
    [
      "cropMaxSize",
      pr(() =>
        ut(
          (() => {
            if (!Vr) {
              const t = {
                android: [14188, 14188],
                ios: [4096, 4096],
                chrome: [16384, 16384],
                firefox: [11180, 11180],
                edge: [16384, 16384],
                ie: [16384, 16384],
              };
              Vr = t[Wr()] || t.chrome;
            }
            const [t, e] = Vr;
            return { width: t, height: e };
          })()
        )
      ),
    ],
    [
      "cropLimitToImage",
      pr(() => !0),
      dr((t) => (e, n, o) => (!n && e && o(() => (t.crop = Mt(t.crop))), e)),
    ],
    [
      "cropSize",
      gr(({ crop: t }) => [
        [t],
        ([t], e) => {
          t && e(gt(t.width, t.height));
        },
        (t, e) => mt(t, e),
      ]),
    ],
    [
      "cropRectAspectRatio",
      hr(({ cropSize: t }) => [
        [t],
        ([t], e) => {
          t && e(vr(Wt(t), 5));
        },
      ]),
    ],
    [
      "cropRange",
      gr(
        ({
          size: t,
          rotation: e,
          cropRectAspectRatio: n,
          cropMinSize: o,
          cropMaxSize: i,
          cropLimitToImage: r,
        }) => [
          [t, e, n, o, i, r],
          ([t, e, n, o, i, r], a) => {
            if (!t) return;
            a(
              ((t, e, n, o, i, r) => {
                let a = ut(o),
                  s = ut(i);
                return r ? [a, bt(Cr(t, e, n), Math.round)] : [a, s];
              })(t, e, n, o, i, r)
            );
          },
          (t, e) => Lr(t, e),
        ]
      ),
    ],
    [
      "rotationRange",
      gr(({ size: t, isRotatedSideways: e, cropMinSize: n, cropSize: o }) => [
        [t, e, n, o],
        ([t, e, n, o], i) => {
          if (!t || !o) return;
          i(Xr(t, e, n, o));
        },
        (t, e) => Lr(t, e),
      ]),
    ],
    [
      "backgroundColor",
      dr(() => (t) => ((t = [0, 0, 0, 0], e = 1) => (4 === t.length ? t : [...t, e]))(t)),
    ],
    ["targetSize"],
    ["colorMatrix"],
    ["convolutionMatrix"],
    ["gamma"],
    ["noise"],
    ["vignette"],
    ["annotation", mr(({ size: t }) => [jr, { context: t }]), pr(() => [])],
    ["decoration", mr(({ crop: t }) => [jr, { context: t }]), pr(() => [])],
    [
      "state",
      ((t) => ({ store: t }))((t, e, n) => {
        const o = Pr.map((t) => e[t]),
          { subscribe: i } = cr(o, (t, e) => {
            const n = Pr.reduce((e, n, o) => ((e[n] = Er(t[o])), e), {});
            n.crop && qt(n.crop, Math.round),
              (n.annotation = n.annotation && Ir(n.annotation)),
              (n.decoration = n.decoration && Ir(n.decoration)),
              e(n);
          }),
          r = (t) => {
            t &&
              ((n.cropOrigin = void 0),
              Pr.filter((e) => t.hasOwnProperty(e)).forEach((e) => {
                n[e] = Er(t[e]);
              }));
          };
        return { set: r, update: (t) => r(t(null)), subscribe: i };
      }),
    ],
  ],
  Gr = async (t, e, n = {}, o) => {
    const { ontaskstart: i, ontaskprogress: r, ontaskend: a, token: s } = o;
    let l = !1;
    s.cancel = () => {
      l = !0;
    };
    for (const [o, s] of e.entries()) {
      if (l) return;
      const [e, c] = s;
      i(o, c);
      try {
        t = await e(t, { ...n }, (t) => r(o, c, t));
      } catch (t) {
        throw ((l = !0), t);
      }
      a(o, c);
    }
    return t;
  };
const Zr = [
    "loadstart",
    "loadabort",
    "loaderror",
    "loadprogress",
    "load",
    "processstart",
    "processabort",
    "processerror",
    "processprogress",
    "process",
  ],
  qr = [
    "flip",
    "cropOrigin",
    "isRotatedSideways",
    "perspective",
    "perspectiveX",
    "perspectiveY",
    "cropRange",
  ],
  Kr = ["images"],
  Qr = (t) => "image" + xr(t),
  Jr = (t) => t.map(([t]) => t).filter((t) => !qr.includes(t));
var ta = () => {
  const { stores: t, accessors: e } = fr($r),
    { sub: o, pub: i } = yr(),
    r = () => (e.images ? e.images[0] : {});
  let a = {};
  Jr(Yr).forEach((t) => {
    Object.defineProperty(e, Qr(t), {
      get: () => {
        const e = r();
        if (e) return e.accessors[t];
      },
      set: (e) => {
        const n = r();
        n ? (n.accessors[t] = e) : (a[t] = e);
      },
    });
  });
  const s = t.src.subscribe((t) =>
      t
        ? e.imageReader
          ? e.images.length
            ? void p(t).catch(() => {})
            : c(t)
          : void 0
        : (e.images = [])
    ),
    l = t.imageReader.subscribe((t) => {
      t && (e.images.length || (e.src && c(e.src)));
    }),
    c = (t) => {
      Promise.resolve()
        .then(() => p(t, a))
        .catch(() => {});
    },
    u = () => e.images && e.images[0];
  let d;
  const p = (t, o = {}) =>
    new Promise((r, s) => {
      let l = u();
      const c = o.cropMinSize || (l && l.accessors.cropMinSize);
      l && g(),
        (l = (({ minSize: t = { width: 1, height: 1 } } = {}) => {
          const { stores: e, accessors: o } = fr(Yr),
            { pub: i, sub: r } = yr(),
            a = (t, e) => {
              const n = () => o[t] || {},
                r = (e) => (o[t] = { ...n(), ...e, timeStamp: Date.now() }),
                a = () => n().error,
                s = (t) => {
                  a() || (r({ error: t }), i(e + "error", { ...n() }));
                };
              return {
                start() {
                  i(e + "start");
                },
                onabort() {
                  i(e + "abort", { ...n() });
                },
                ontaskstart(t, o) {
                  a() ||
                    (r({ index: t, task: o, taskProgress: void 0, taskLengthComputable: void 0 }),
                    i(e + "taskstart", { ...n() }));
                },
                ontaskprogress(t, o, s) {
                  a() ||
                    (r({
                      index: t,
                      task: o,
                      taskProgress: s.loaded / s.total,
                      taskLengthComputable: s.lengthComputable,
                    }),
                    i(e + "taskprogress", { ...n() }),
                    i(e + "progress", { ...n() }));
                },
                ontaskend(t, o) {
                  a() || (r({ index: t, task: o }), i(e + "taskend", { ...n() }));
                },
                ontaskerror(t) {
                  s(t);
                },
                error(t) {
                  s(t);
                },
                beforeComplete(t) {
                  a() || (r({ beforeComplete: !0 }), i("before" + e, t));
                },
                complete(t) {
                  a() || (r({ complete: !0 }), i(e, t));
                },
              };
            };
          return (
            br(o, {
              read: (e, { reader: i }) => {
                if (!i) return;
                Object.assign(o, { file: void 0, size: void 0, loadState: void 0 });
                let r = { cancel: n },
                  s = !1;
                const l = a("loadState", "load"),
                  c = { token: r, ...l },
                  u = { src: e, size: void 0, dest: void 0 },
                  d = {};
                return (
                  (async () => {
                    try {
                      l.start();
                      const e = await Gr(u, i, d, c);
                      if (s) return l.onabort();
                      const { size: n, dest: a } = e || {};
                      if (!n || !n.width || !n.height)
                        throw new fe("Image size missing", "IMAGE_SIZE_MISSING", e);
                      if (n.width < t.width || n.height < t.height)
                        throw new fe("Image too small", "IMAGE_TOO_SMALL", {
                          ...e,
                          minWidth: t.width,
                          minHeight: t.height,
                        });
                      Object.assign(o, { size: n, file: a }),
                        o.crop || (o.crop = Yt(Tt(n), o.cropAspectRatio)),
                        (o.state = o.state),
                        l.beforeComplete(e),
                        l.complete(e);
                    } catch (t) {
                      l.error(t);
                    } finally {
                      r = void 0;
                    }
                  })(),
                  () => {
                    (s = !0), r && r.cancel(), l.onabort();
                  }
                );
              },
              write: (t) => {
                if (!o.loadState.complete) return;
                o.processState = void 0;
                const e = a("processState", "process"),
                  i = { src: o.file, imageState: o.state, dest: void 0 };
                if (!t) return e.start(), void e.complete(i);
                let r = { cancel: n };
                const s = {},
                  l = { token: r, ...e };
                return (
                  (async () => {
                    e.start();
                    try {
                      const n = await Gr(i, t, s, l);
                      e.complete(n);
                    } catch (t) {
                      e.error(t);
                    } finally {
                      r = void 0;
                    }
                  })(),
                  () => r && r.cancel()
                );
              },
              on: r,
            }),
            { accessors: o, stores: e }
          );
        })({ minSize: c })),
        Zr.map((t) => {
          return l.accessors.on(t, ((e = t), (t) => i(e, t)));
          var e;
        });
      const p = () => {
          (a = {}), h(), m();
        },
        h = l.accessors.on("loaderror", (t) => {
          p(), s(t);
        });
      l.accessors.on("beforeload", () => {
        const t = Jr(Yr).reduce((t, e) => {
          if (e in o) return (t[e] = o[e]), t;
          {
            const n = Qr(e);
            n in o && (t[e] = o[n]);
          }
          return t;
        }, {});
        ["cropLimitToImage", "crop", "cropAspectRatio", "rotation"].forEach((e) => {
          e in t && ((l.accessors[e] = t[e]), delete t[e]);
        }),
          Object.assign(l.accessors, t),
          (l.accessors.state = l.accessors.state);
      });
      const m = l.accessors.on("load", (t) => {
        (d = void 0), p(), r(t);
      });
      (e.images = [l]),
        o.imageReader && (e.imageReader = o.imageReader),
        o.imageWriter && (e.imageWriter = o.imageWriter),
        (d = l.accessors.read(t, { reader: e.imageReader }));
    });
  let h;
  const g = () => {
    const t = u();
    t && (d && d(), (t.accessors.loadState = void 0), (e.images = []));
  };
  return (
    Object.defineProperty(e, "stores", { get: () => t }),
    br(e, {
      on: o,
      loadImage: p,
      abortLoadImage: () => {
        d(), (e.images = []);
      },
      editImage: (t, n) =>
        new Promise((o, i) => {
          p(t, n)
            .then(() => {
              const { images: t } = e,
                n = t[0],
                r = () => {
                  a(), s();
                },
                a = n.accessors.on("processerror", (t) => {
                  r(), i(t);
                }),
                s = n.accessors.on("process", (t) => {
                  r(), o(t);
                });
            })
            .catch(i);
        }),
      removeImage: g,
      processImage: (t, n) =>
        new Promise(async (o, i) => {
          t && (await p(t, n));
          const r = u();
          if (!r) return i("no image");
          const a = () => {
              (h = void 0), s(), l();
            },
            s = r.accessors.on("processerror", (t) => {
              a(), i(t);
            }),
            l = r.accessors.on("process", (t) => {
              a(), o(t);
            });
          h = r.accessors.write(e.imageWriter);
        }),
      abortProcessImage: () => {
        const t = u();
        t && (h && h(), (t.accessors.processState = void 0));
      },
      destroy: () => {
        s(), l();
      },
    }),
    e
  );
};
const ea = (t, e) => {
    const { processImage: n } = ta();
    return n(t, e);
  },
  na = async (t, e, n, o) => {
    const { dest: i } = await ea(e, {
      imageReader: Ca(),
      imageWriter: Ma({ format: "canvas", targetSize: { ...o, upscale: !0 } }),
      imageCrop: n,
    });
    t.drawImage(i, o.x, o.y), g(i);
  },
  oa =
    (t, n = (...t) => t, o) =>
    async (i, r, a) => {
      let s;
      a(e(0, !1));
      let l = !1;
      try {
        s = await t(
          ...n(i, r, (t) => {
            (l = !0), a(t);
          })
        );
      } catch (t) {
        throw t;
      }
      return o && o(i, s), l || a(e(1, !1)), i;
    },
  ia = ({ srcProp: t = "src", destProp: e = "dest" } = {}) => [
    oa(
      ye,
      (e, n, o) => [e[t], o],
      (t, n) => (t[e] = n)
    ),
    "any-to-file",
  ],
  ra = ({ srcProp: t = "src", destProp: e = "size" } = {}) => [
    oa(
      ue,
      (e, n) => [e[t]],
      (t, n) => (t[e] = n)
    ),
    "read-image-size",
  ],
  aa = ({ srcSize: t = "size", srcOrientation: e = "orientation", destSize: n = "size" } = {}) => [
    oa(
      ke,
      (n) => [n[t], n[e]],
      (t, e) => (t[n] = e)
    ),
    "image-size-match-orientation",
  ],
  sa = ({ srcProp: t = "src", destProp: e = "head" } = {}) => [
    oa(
      (t, e) =>
        Pe(t) ? (async (t, e = [0, t.size], n) => await i(t.slice(...e), n))(t, e) : void 0,
      (e) => [e[t], [0, 65536], onprogress],
      (t, n) => (t[e] = n)
    ),
    "read-image-head",
  ],
  la = ({ srcProp: t = "head", destProp: e = "orientation" } = {}) => [
    oa(
      Me,
      (e) => [e[t]],
      (t, n) => (t[e] = n)
    ),
    "read-exif-orientation-tag",
  ],
  ca = ({ srcProp: t = "head" } = {}) => [oa(Re, (e) => [e[t], 1]), "clear-exif-orientation-tag"],
  ua = ({
    srcImageSize: t = "size",
    srcCanvasSize: e = "imageData",
    srcImageState: n = "imageState",
    destImageSize: o = "size",
    destScalar: i = "scalar",
  } = {}) => [
    oa(
      (t, e, n) => {
        const o = Math.min(e.width / t.width, e.height / t.height);
        if (1 !== o) {
          const { crop: t, annotation: e, decoration: i } = n,
            r = H();
          t && (n.crop = zt(t, o, r));
          const a = H();
          (n.annotation = e.map((t) => ao(t, a, o))), (n.decoration = i.map((t) => ao(t, a, o)));
        }
        return [o, dt(e)];
      },
      (o) => [o[t], o[e], o[n]],
      (t, [e, n]) => {
        (t[i] = e), (t[o] = n);
      }
    ),
    "calculate-canvas-scalar",
  ],
  da = ({ srcProp: t = "src", destProp: e = "imageData", canvasMemoryLimit: n }) => [
    oa(
      T,
      (e) => [e[t], n],
      (t, n) => (t[e] = n)
    ),
    "blob-to-image-data",
  ],
  pa = ({ srcImageData: t = "imageData", srcOrientation: e = "orientation" } = {}) => [
    oa(
      $,
      (n) => [n[t], n[e]],
      (t, e) => (t.imageData = e)
    ),
    "image-data-match-orientation",
  ],
  ha = ({ srcImageData: t = "imageData", srcImageState: e = "imageState" } = {}) => [
    oa(
      ko,
      (n) => [n[t], { backgroundColor: n[e].backgroundColor }],
      (t, e) => (t.imageData = e)
    ),
    "image-data-fill",
  ],
  ga = ({ srcImageData: t = "imageData", srcImageState: e = "imageState" } = {}) => [
    oa(
      Ie,
      (n) => [
        n[t],
        { crop: n[e].crop, rotation: n[e].rotation, flipX: n[e].flipX, flipY: n[e].flipY },
      ],
      (t, e) => (t.imageData = e)
    ),
    "image-data-crop",
  ],
  ma = ({
    resize: t = { width: void 0, height: void 0, fit: void 0, upscale: void 0 },
    srcProp: e = "imageData",
    srcImageState: n = "imageState",
    destImageScaledSize: o = "imageScaledSize",
  }) => [
    oa(
      Be,
      (o) => {
        return [
          o[e],
          {
            width: Math.min(
              t.width || Number.MAX_SAFE_INTEGER,
              (o[n].targetSize && o[n].targetSize.width) || Number.MAX_SAFE_INTEGER
            ),
            height: Math.min(
              t.height || Number.MAX_SAFE_INTEGER,
              (o[n].targetSize && o[n].targetSize.height) || Number.MAX_SAFE_INTEGER
            ),
            fit: t.fit || "contain",
            upscale:
              ((i = o[n]),
              !!((i.targetSize && i.targetSize.width) || (i.targetSize && i.targetSize.height)) ||
                t.upscale ||
                !1),
          },
        ];
        var i;
      },
      (t, e) => {
        mt(t.imageData, e) || (t[o] = dt(e)), (t.imageData = e);
      }
    ),
    "image-data-resize",
  ],
  fa = ({
    srcImageData: t = "imageData",
    srcImageState: e = "imageState",
    destImageData: n = "imageData",
  } = {}) => [
    oa(
      Ve,
      (n) => {
        const { colorMatrix: o } = n[e],
          i =
            o &&
            Object.keys(o)
              .map((t) => o[t])
              .filter(Boolean);
        return [
          n[t],
          {
            colorMatrix: i && Co(i),
            convolutionMatrix: n[e].convolutionMatrix,
            gamma: n[e].gamma,
            noise: n[e].noise,
            vignette: n[e].vignette,
          },
        ];
      },
      (t, e) => (t[n] = e)
    ),
    "image-data-filter",
  ],
  $a = ({
    srcImageData: t = "imageData",
    srcSize: e = "size",
    srcImageState: n = "imageState",
    destImageData: o = "imageData",
    destImageScaledSize: i = "imageScaledSize",
  } = {}) => [
    oa(
      So,
      (o) => [
        o[t],
        {
          shapes: o[n].annotation,
          context: o[e],
          transform: (t) => {
            const r = o[e],
              { crop: a = Tt(r), rotation: s = 0, flipX: l, flipY: c } = o[n],
              u = ((t, e) => {
                const n = Tt(t),
                  o = Ft(n),
                  i = Nt(n, e, o);
                return Qt(Et(i));
              })(r, s),
              d = u.width,
              p = u.height,
              h = o[i],
              g = h ? Math.min(h.width / a.width, h.height / a.height) : 1,
              m = 0.5 * r.width - 0.5 * d,
              f = 0.5 * r.height - 0.5 * p,
              $ = $t(r);
            t.scale(g, g),
              t.translate(-m, -f),
              t.translate(-a.x, -a.y),
              t.translate($.x, $.y),
              t.rotate(s),
              t.translate(-$.x, -$.y),
              t.scale(l ? -1 : 1, c ? -1 : 1),
              t.translate(l ? -r.width : 0, c ? -r.height : 0),
              t.rect(0, 0, r.width, r.height),
              t.clip();
          },
          drawImage: na,
        },
      ],
      (t, e) => (t[o] = e)
    ),
    "image-data-annotate",
  ],
  ya = ({
    srcImageData: t = "imageData",
    srcImageState: e = "imageState",
    destImageData: n = "imageData",
    destImageScaledSize: o = "imageScaledSize",
  } = {}) => [
    oa(
      So,
      (n) => [
        n[t],
        {
          shapes: n[e].decoration,
          context: n[e].crop,
          transform: (t) => {
            const { crop: e } = n.imageState,
              i = n[o],
              r = i ? Math.min(i.width / e.width, i.height / e.height) : 1;
            t.scale(r, r);
          },
          drawImage: na,
        },
      ],
      (t, e) => (t[n] = e)
    ),
    "image-data-decorate",
  ],
  xa = ({
    mimeType: t,
    quality: e,
    srcImageData: n = "imageData",
    srcFile: o = "src",
    destBlob: i = "blob",
  } = {}) => [
    oa(
      E,
      (i) => [i[n], t || F(i[o].name) || i[o].type, e],
      (t, e) => (t[i] = e)
    ),
    "image-data-to-blob",
  ],
  ba = ({
    srcImageData: t = "imageData",
    srcOrientation: e = "orientation",
    destCanvas: n = "dest",
  } = {}) => [
    oa(
      f,
      (n) => [n[t], n[e]],
      (t, e) => (t[n] = e)
    ),
    "image-data-to-canvas",
  ],
  va = (t = "blob", e = "head", n = "blob") => [
    oa(
      (t, e) =>
        Pe(t) && e
          ? ((t, e, n = [0, t.size]) => (e ? new Blob([e, t.slice(...n)], { type: t.type }) : t))(
              t,
              ((t) => {
                const e = new DataView(t);
                if (65496 !== e.getUint16(0)) return null;
                let n,
                  o,
                  i = 2;
                for (
                  ;
                  i < e.byteLength &&
                  ((n = e.getUint16(i, !1)),
                  (o = e.getUint16(i + 2, !1) + 2),
                  (n >= 65504 && n <= 65519) || 65534 === n) &&
                  !(i + o > e.byteLength);

                )
                  i += o;
                return t.slice(0, i);
              })(e),
              [20]
            )
          : t,
      (n) => [n[t], n[e]],
      (t, e) => (t[n] = e)
    ),
    "blob-write-image-head",
  ],
  wa = ({
    renameFile: t,
    srcBlob: e = "blob",
    srcFile: n = "src",
    destFile: o = "dest",
    defaultFilename: i,
  } = {}) => [
    oa(
      B,
      (o) => [o[e], t ? t(o[n]) : o[n].name || `${i}.${A(o[e].type)}`],
      (t, e) => (t[o] = e)
    ),
    "blob-to-file",
  ],
  Sa = ({
    url: t = "./",
    dataset: e = (t) => [
      ["dest", t.dest, t.dest.name],
      ["imageState", t.imageState],
    ],
    destStore: o = "store",
  }) => [
    oa(
      async (e, o) => {
        try {
          return await ((t, e, o) =>
            new Promise((i, r) => {
              const { token: a = {}, beforeSend: s = n, onprogress: l = n } = o;
              a.cancel = () => c.abort();
              const c = new XMLHttpRequest();
              (c.upload.onprogress = l),
                (c.onload = () => (c.status >= 200 && c.status < 300 ? i(c) : r(c))),
                (c.onerror = () => r(c)),
                (c.ontimeout = () => r(c)),
                c.open("POST", encodeURI(t)),
                s(c),
                c.send(e.reduce((t, e) => (t.append(...e.map(Ee)), t), new FormData()));
            }))(t, e, { onprogress: o });
        } catch (t) {
          throw t;
        }
      },
      (t, n, o) => [e(t), o],
      (t, e) => (t[o] = e)
    ),
    "store",
  ],
  ka = (t) => [
    oa((e) =>
      t && t.length
        ? (Object.keys(e).forEach((n) => {
            t.includes(n) || delete e[n];
          }),
          e)
        : e
    ),
    "prop-filter",
  ],
  Ca = (t = {}) => {
    const {
      orientImage: e = !0,
      outputProps: n = ["src", "dest", "size"],
      preprocessImageFile: o,
    } = t;
    return [
      ia(),
      o && [
        oa(
          o,
          (t, e, n) => [t.dest, e, n],
          (t, e) => (t.dest = e)
        ),
        "preprocess-image-file",
      ],
      ra({ srcProp: "dest" }),
      e && sa({ srcProp: "dest" }),
      e && la(),
      e && aa(),
      ka(n),
    ].filter(Boolean);
  },
  Ma = (t = {}) => {
    let {
      canvasMemoryLimit: e = Se() ? 16777216 : 1 / 0,
      orientImage: n = !0,
      copyImageHead: o = !0,
      mimeType: i,
      quality: r,
      renameFile: a,
      targetSize: s,
      store: l,
      format: c = "file",
      outputProps: u = ["src", "dest", "imageState", "store"],
      preprocessImageState: d,
      postprocessImageData: p,
    } = t;
    return [
      (n || o) && sa(),
      n && la(),
      ra(),
      d && [
        oa(
          d,
          (t, e, n) => [t.imageState, e, n],
          (t, e) => (t.imageState = e)
        ),
        "preprocess-image-state",
      ],
      da({ canvasMemoryLimit: e }),
      n && aa(),
      n && pa(),
      ua(),
      ga(),
      ma({ resize: s }),
      fa(),
      ha(),
      $a(),
      ya(),
      p && [
        oa(
          p,
          (t, e, n) => [t.imageData, e, n],
          (t, e) => (t.imageData = e)
        ),
        "postprocess-image-data",
      ],
      "file" === c
        ? xa({ mimeType: i, quality: r })
        : "canvas" === c
        ? ba()
        : [(t) => ((t.dest = t.imageData), t)],
      "file" === c && n && ca(),
      "file" === c && o && va(),
      "file" === c && wa({ defaultFilename: "image", renameFile: a }),
      "file" === c
        ? l && (v(l) ? Sa({ url: l }) : Xe(l) ? [l, "store"] : Sa(l))
        : Xe(l) && [l, "store"],
      ka(u),
    ].filter(Boolean);
  };
var Ra = (t) => {
  const e = Object.getOwnPropertyDescriptors(t.prototype);
  return Object.keys(e).filter((t) => !!e[t].get);
};
function Ta(t) {
  return Math.sqrt(1 - --t * t);
}
function Pa(t) {
  return "[object Date]" === Object.prototype.toString.call(t);
}
function Ea(t, e) {
  if (t === e || t != t) return () => t;
  const n = typeof t;
  if (n !== typeof e || Array.isArray(t) !== Array.isArray(e))
    throw new Error("Cannot interpolate values of different type");
  if (Array.isArray(t)) {
    const n = e.map((e, n) => Ea(t[n], e));
    return (t) => n.map((e) => e(t));
  }
  if ("object" === n) {
    if (!t || !e) throw new Error("Object cannot be null");
    if (Pa(t) && Pa(e)) {
      t = t.getTime();
      const n = (e = e.getTime()) - t;
      return (e) => new Date(t + e * n);
    }
    const n = Object.keys(e),
      o = {};
    return (
      n.forEach((n) => {
        o[n] = Ea(t[n], e[n]);
      }),
      (t) => {
        const e = {};
        return (
          n.forEach((n) => {
            e[n] = o[n](t);
          }),
          e
        );
      }
    );
  }
  if ("number" === n) {
    const n = e - t;
    return (e) => t + e * n;
  }
  throw new Error(`Cannot interpolate ${n} values`);
}
function Aa(t, e = {}) {
  const n = lr(t);
  let o,
    i = t;
  function r(r, a) {
    if (null == t) return n.set((t = r)), Promise.resolve();
    i = r;
    let s = o,
      l = !1,
      { delay: c = 0, duration: u = 400, easing: d = Ro, interpolate: p = Ea } = To(To({}, e), a);
    if (0 === u) return s && (s.abort(), (s = null)), n.set((t = i)), Promise.resolve();
    const h = Ho() + c;
    let g;
    return (
      (o = Go((e) => {
        if (e < h) return !0;
        l || ((g = p(t, r)), "function" == typeof u && (u = u(t, r)), (l = !0)),
          s && (s.abort(), (s = null));
        const o = e - h;
        return o > u ? (n.set((t = r)), !1) : (n.set((t = g(d(o / u)))), !0);
      })),
      o.promise
    );
  }
  return { set: r, update: (e, n) => r(e(i, t), n), subscribe: n.subscribe };
}
function Ia(t, e, n, o) {
  if ("number" == typeof n) {
    const i = o - n,
      r = (n - e) / (t.dt || 1 / 60),
      a = (r + (t.opts.stiffness * i - t.opts.damping * r) * t.inv_mass) * t.dt;
    return Math.abs(a) < t.opts.precision && Math.abs(i) < t.opts.precision
      ? o
      : ((t.settled = !1), n + a);
  }
  if (je(n)) return n.map((i, r) => Ia(t, e[r], n[r], o[r]));
  if ("object" == typeof n) {
    const i = {};
    for (const r in n) i[r] = Ia(t, e[r], n[r], o[r]);
    return i;
  }
  throw new Error(`Cannot spring ${typeof n} values`);
}
function La(t, e = {}) {
  const n = lr(t),
    { stiffness: o = 0.15, damping: i = 0.8, precision: r = 0.01 } = e;
  let a,
    s,
    l,
    c = t,
    u = t,
    d = 1,
    p = 0,
    h = !1;
  function g(e, o = {}) {
    u = e;
    const i = (l = {});
    if (null == t || o.hard || (m.stiffness >= 1 && m.damping >= 1))
      return (h = !0), (a = null), (c = e), n.set((t = u)), Promise.resolve();
    if (o.soft) {
      const t = !0 === o.soft ? 0.5 : +o.soft;
      (p = 1 / (60 * t)), (d = 0);
    }
    if (!s) {
      (a = null), (h = !1);
      const e = { inv_mass: void 0, opts: m, settled: !0, dt: void 0 };
      s = Go((o) => {
        if ((null === a && (a = o), h)) return (h = !1), (s = null), !1;
        (d = Math.min(d + p, 1)),
          (e.inv_mass = d),
          (e.opts = m),
          (e.settled = !0),
          (e.dt = (60 * (o - a)) / 1e3);
        const i = Ia(e, c, t, u);
        return (a = o), (c = t), n.set((t = i)), e.settled && (s = null), !e.settled;
      });
    }
    return new Promise((t) => {
      s.promise.then(() => {
        i === l && t();
      });
    });
  }
  const m = {
    set: g,
    update: (e, n) => g(e(u, t), n),
    subscribe: n.subscribe,
    stiffness: o,
    damping: i,
    precision: r,
  };
  return m;
}
var Fa = sr(!1, (t) => {
  const e = window.matchMedia("(prefers-reduced-motion:reduce)");
  t(e.matches), (e.onchange = () => t(e.matches));
});
const Ba = Rt(),
  za = (t, e, n, o, i) => {
    t.rect || (t.rect = Rt());
    const r = t.rect;
    Vt(Ba, e, n, o, i),
      _t(r, Ba) || (Ut(r, Ba), t.dispatchEvent(new CustomEvent("measure", { detail: r })));
  },
  Da = Math.round,
  Oa = (t) => {
    const e = t.getBoundingClientRect();
    za(t, Da(e.x), Da(e.y), Da(e.width), Da(e.height));
  },
  _a = (t) => za(t, t.offsetLeft, t.offsetTop, t.offsetWidth, t.offsetHeight),
  Wa = [];
let Va,
  Ua = null;
function Na() {
  Wa.length ? (Wa.forEach((t) => t.measure(t)), (Ua = requestAnimationFrame(Na))) : (Ua = null);
}
var Ha = (t, e = {}) => {
    const { observePosition: n = !1, observeViewRect: o = !1, once: i = !1, disabled: r = !1 } = e;
    if (!r)
      return !("ResizeObserver" in window) || n || o
        ? ((t.measure = o ? Oa : _a),
          Wa.push(t),
          Ua || (Ua = requestAnimationFrame(Na)),
          t.measure(t),
          {
            destroy() {
              const e = Wa.indexOf(t);
              Wa.splice(e, 1);
            },
          })
        : (Va ||
            (Va = new ResizeObserver((t) => {
              t.forEach((t) => _a(t.target));
            })),
          Va.observe(t),
          _a(t),
          i && Va.unobserve(t),
          {
            destroy() {
              i || Va.unobserve(t);
            },
          });
  },
  Xa = (t) => {
    let e = !1;
    const n = {
      pointerdown: () => {
        e = !1;
      },
      keydown: () => {
        e = !0;
      },
      keyup: () => {
        e = !1;
      },
      focus: (t) => {
        e && (t.target.dataset.focusVisible = "");
      },
      blur: (t) => {
        delete t.target.dataset.focusVisible;
      },
    };
    return (
      Object.keys(n).forEach((e) => t.addEventListener(e, n[e], !0)),
      {
        destroy() {
          Object.keys(n).forEach((e) => t.removeEventListener(e, n[e], !0));
        },
      }
    );
  };
const ja = (t) => {
  const { items: e, files: n } = t.dataTransfer;
  return e
    ? Array.from(e)
        .filter((t) => "file" === t.kind)
        .map((t) => t.getAsFile())
    : Array.from(n) || [];
};
var Ya = (t, e = {}) => {
  const n = (t) => {
      t.preventDefault();
    },
    o = (n) => {
      n.preventDefault(),
        n.stopPropagation(),
        t.dispatchEvent(
          new CustomEvent("dropfiles", {
            detail: { event: n, files: ja(n).filter((t) => pe(t)) },
            ...e,
          })
        );
    };
  return (
    t.addEventListener("drop", o),
    t.addEventListener("dragover", n),
    {
      destroy() {
        t.removeEventListener("drop", o), t.removeEventListener("dragover", n);
      },
    }
  );
};
let Ga = null;
var Za = () => {
    if (null === Ga)
      if ("WebGL2RenderingContext" in window) {
        let t;
        try {
          (t = p("canvas")), (Ga = !!t.getContext("webgl2"));
        } catch (t) {
          Ga = !1;
        }
        t && g(t);
      } else Ga = !1;
    return Ga;
  },
  qa = (t, e) =>
    Za()
      ? t.getContext("webgl2", e)
      : t.getContext("webgl", e) || t.getContext("experimental-webgl", e);
let Ka = null;
var Qa = () => {
    if (null === Ka)
      if (l()) {
        const t = p("canvas");
        (Ka = !qa(t, { failIfMajorPerformanceCaveat: !0 })), g(t);
      } else Ka = !1;
    return Ka;
  },
  Ja = (t) => 0 == (t & (t - 1)),
  ts = (t, e = {}, n = "", o = "") =>
    Object.keys(e)
      .filter((t) => !y(e[t]))
      .reduce((t, i) => t.replace(new RegExp(n + i + o), e[i]), t);
const es = {
    head: "#version 300 es\n\nin vec4 aPosition;uniform mat4 uMatrix;",
    text: "\nin vec2 aTexCoord;out vec2 vTexCoord;",
    matrix: "\ngl_Position=uMatrix*vec4(aPosition.x,aPosition.y,0,1);",
  },
  ns = {
    head: "#version 300 es\nprecision highp float;\n\nout vec4 fragColor;",
    mask: "\nuniform float uMaskFeather[8];uniform float uMaskBounds[4];uniform float uMaskOpacity;float mask(float x,float y,float bounds[4],float opacity){return 1.0-(1.0-(smoothstep(bounds[3],bounds[3]+1.0,x)*(1.0-smoothstep(bounds[1]-1.0,bounds[1],x))*(1.0-step(bounds[0],y))*step(bounds[2],y)))*(1.0-opacity);}",
    init: "\nfloat a=1.0;vec4 fillColor=uColor;vec4 textureColor=texture(uTexture,vTexCoord);textureColor*=(1.0-step(1.0,vTexCoord.y))*step(0.0,vTexCoord.y)*(1.0-step(1.0,vTexCoord.x))*step(0.0,vTexCoord.x);",
    colorize:
      "\nif(uTextureColor.a!=0.0&&textureColor.a>0.0){vec3 colorFlattened=textureColor.rgb/textureColor.a;if(colorFlattened.r>.999999&&colorFlattened.g==0.0&&colorFlattened.b>.999999){textureColor.rgb=uTextureColor.rgb*textureColor.a;}textureColor*=uTextureColor.a;}",
    maskapply: "\nfloat m=mask(gl_FragCoord.x,gl_FragCoord.y,uMaskBounds,uMaskOpacity);",
    maskfeatherapply:
      "\nfloat leftFeatherOpacity=step(uMaskFeather[1],gl_FragCoord.x)*uMaskFeather[0]+((1.0-uMaskFeather[0])*smoothstep(uMaskFeather[1],uMaskFeather[3],gl_FragCoord.x));float rightFeatherOpacity=(1.0-step(uMaskFeather[7],gl_FragCoord.x))*uMaskFeather[4]+((1.0-uMaskFeather[4])*smoothstep(uMaskFeather[7],uMaskFeather[5],gl_FragCoord.x));a*=leftFeatherOpacity*rightFeatherOpacity;",
    edgeaa:
      "\nvec2 scaledPoint=vec2(vRectCoord.x*uSize.x,vRectCoord.y*uSize.y);a*=smoothstep(0.0,1.0,uSize.x-scaledPoint.x);a*=smoothstep(0.0,1.0,uSize.y-scaledPoint.y);a*=smoothstep(0.0,1.0,scaledPoint.x);a*=smoothstep(0.0,1.0,scaledPoint.y);",
    cornerradius:
      "\nvec2 s=(uSize-2.0)*.5;vec2 r=(vRectCoord*uSize);vec2 p=r-(uSize*.5);float cornerRadius=uCornerRadius[0];bool left=r.x<s.x;bool top=r.y<s.x;if(!left&&top){cornerRadius=uCornerRadius[1];}if(!left&&!top){cornerRadius=uCornerRadius[3];}if(left&&!top){cornerRadius=uCornerRadius[2];}a*=1.0-clamp(length(max(abs(p)-(s-cornerRadius),0.0))-cornerRadius,0.0,1.0);",
    fragcolor:
      "\nfillColor.a*=a;fillColor.rgb*=fillColor.a;fillColor.rgb*=m;fillColor.rgb+=(1.0-m)*(uCanvasColor.rgb*fillColor.a);textureColor*=uTextureOpacity;textureColor.a*=a;textureColor.rgb*=m*a;textureColor.rgb+=(1.0-m)*(uCanvasColor.rgb*textureColor.a);fragColor=textureColor+(fillColor*(1.0-textureColor.a));",
  },
  os = (t, e, n) => {
    const o = t.createShader(n),
      i = ((t, e, n) => (
        (e = ts(e, n === t.VERTEX_SHADER ? es : ns, "##").trim()),
        Za()
          ? e
          : ((e = (e = e.replace(/#version.+/gm, "").trim()).replace(/^\/\/\#/gm, "#")),
            n === t.VERTEX_SHADER &&
              (e = e.replace(/in /gm, "attribute ").replace(/out /g, "varying ")),
            n === t.FRAGMENT_SHADER &&
              (e = e
                .replace(/in /gm, "varying ")
                .replace(/out.*?;/gm, "")
                .replace(/texture\(/g, "texture2D(")
                .replace(/fragColor/g, "gl_FragColor")),
            "" + e)
      ))(t, e, n);
    return (
      t.shaderSource(o, i),
      t.compileShader(o),
      t.getShaderParameter(o, t.COMPILE_STATUS) || console.error(t.getShaderInfoLog(o)),
      o
    );
  },
  is = (t, e, n, o, i) => {
    const r = t.createProgram();
    t.attachShader(r, os(t, e, t.VERTEX_SHADER)),
      t.attachShader(r, os(t, n, t.FRAGMENT_SHADER)),
      t.linkProgram(r);
    const a = {};
    return (
      o.forEach((e) => {
        a[e] = t.getAttribLocation(r, e);
      }),
      i.forEach((e) => {
        a[e] = t.getUniformLocation(r, e);
      }),
      { program: r, locations: a }
    );
  },
  rs = (t) => !!Za() || (Ja(t.width) && Ja(t.height)),
  as = (t, e, n) => (
    t.bindTexture(t.TEXTURE_2D, e),
    t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, n),
    ((t, e) => {
      t.texParameteri(
        t.TEXTURE_2D,
        t.TEXTURE_MIN_FILTER,
        rs(e) ? t.LINEAR_MIPMAP_LINEAR : t.LINEAR
      ),
        t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.LINEAR),
        t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE),
        t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE),
        rs(e) && t.generateMipmap(t.TEXTURE_2D);
    })(t, n),
    t.bindTexture(t.TEXTURE_2D, null),
    e
  ),
  ss = (t, e = 1) => (t ? [t[0], t[1], t[2], Ue(t[3]) ? e * t[3] : e] : [0, 0, 0, 0]),
  ls = () => {
    const t = new Float32Array(16);
    return (t[0] = 1), (t[5] = 1), (t[10] = 1), (t[15] = 1), t;
  },
  cs = (t, e, n, o, i, r, a) => {
    const s = 1 / (e - n),
      l = 1 / (o - i),
      c = 1 / (r - a);
    (t[0] = -2 * s),
      (t[1] = 0),
      (t[2] = 0),
      (t[3] = 0),
      (t[4] = 0),
      (t[5] = -2 * l),
      (t[6] = 0),
      (t[7] = 0),
      (t[8] = 0),
      (t[9] = 0),
      (t[10] = 2 * c),
      (t[11] = 0),
      (t[12] = (e + n) * s),
      (t[13] = (i + o) * l),
      (t[14] = (a + r) * c),
      (t[15] = 1);
  },
  us = (t, e, n, o) => {
    (t[12] = t[0] * e + t[4] * n + t[8] * o + t[12]),
      (t[13] = t[1] * e + t[5] * n + t[9] * o + t[13]),
      (t[14] = t[2] * e + t[6] * n + t[10] * o + t[14]),
      (t[15] = t[3] * e + t[7] * n + t[11] * o + t[15]);
  };
var ds = (t) => (t * Math.PI) / 180;
const ps = (t, e, n, o, i) => {
    let r, a;
    (r = K(X(o.x - n.x, o.y - n.y))), (a = K(X(i.x - o.x, i.y - o.y)));
    const s = K(X(r.x + a.x, r.y + a.y)),
      l = X(-s.y, s.x),
      c = X(-r.y, r.x),
      u = 1 / ot(l, c);
    (t[e] = o.x),
      (t[e + 1] = o.y),
      (t[e + 2] = l.x),
      (t[e + 3] = l.y),
      (t[e + 4] = -u),
      (t[e + 5] = o.x),
      (t[e + 6] = o.y),
      (t[e + 7] = l.x),
      (t[e + 8] = l.y),
      (t[e + 9] = u);
  },
  hs = (t) => {
    const e = new Float32Array(8);
    return (
      (e[0] = t[3].x),
      (e[1] = t[3].y),
      (e[2] = t[0].x),
      (e[3] = t[0].y),
      (e[4] = t[2].x),
      (e[5] = t[2].y),
      (e[6] = t[1].x),
      (e[7] = t[1].y),
      e
    );
  },
  gs = (t, e = 0, n, o) => {
    const i = Zt(t),
      r = t.x + 0.5 * t.width,
      a = t.y + 0.5 * t.height;
    return (n || o) && st(i, n, o, r, a), 0 !== e && lt(i, e, r, a), i;
  },
  ms = (t, e, n, o, i) => {
    const r = Math.min(20, Math.max(4, Math.round(o / 2)));
    let a = 0,
      s = 0,
      l = 0,
      c = 0,
      u = 0;
    for (; u < r; u++)
      (a = u / r),
        (s = i * _ + a * _),
        (l = o * Math.cos(s)),
        (c = o * Math.sin(s)),
        t.push(X(e + l, n + c));
  },
  fs = new Float32Array([0, 1, 0, 0, 1, 1, 1, 0]);
var $s = (t, e, n, o) => {
  let i,
    r,
    a,
    s,
    l,
    c,
    u,
    d,
    p,
    h,
    m,
    f,
    $ = { width: 0, height: 0 },
    y = { width: 0, height: 0 },
    x = o,
    b = [0, 0, 0];
  const v = new Map([]),
    w = ds(30),
    S = Math.tan(w / 2),
    k = qa(t, { antialias: !1, alpha: !1, premultipliedAlpha: !0 });
  if (!k) return;
  k.getExtension("OES_standard_derivatives"),
    k.disable(k.DEPTH_TEST),
    k.enable(k.BLEND),
    k.blendFunc(k.ONE, k.ONE_MINUS_SRC_ALPHA),
    k.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !0);
  const C = k.createTexture();
  k.bindTexture(k.TEXTURE_2D, C),
    k.texImage2D(
      k.TEXTURE_2D,
      0,
      k.RGBA,
      1,
      1,
      0,
      k.RGBA,
      k.UNSIGNED_BYTE,
      new Uint8Array([0, 0, 0, 0])
    ),
    v.set(0, C);
  const M = k.createTexture();
  v.set(1, M);
  const R = k.createFramebuffer(),
    T = ((t, e) => as(t, t.createTexture(), e))(k, e);
  v.set(2, T);
  const P = k.createBuffer(),
    E = k.createBuffer();
  k.bindBuffer(k.ARRAY_BUFFER, E), k.bufferData(k.ARRAY_BUFFER, fs, k.STATIC_DRAW);
  const A = is(
    k,
    "\n##head\n##text\nvoid main(){vTexCoord=aTexCoord;gl_Position=uMatrix*aPosition;}",
    "\n##head\nin vec2 vTexCoord;uniform sampler2D uTexture;uniform sampler2D uTextureMarkup;uniform vec2 uTextureSize;uniform float uOpacity;uniform vec4 uFillColor;uniform vec4 uOverlayColor;uniform mat4 uColorMatrix;uniform vec4 uColorOffset;uniform float uClarityKernel[9];uniform float uClarityKernelWeight;uniform float uColorGamma;uniform float uColorVignette;uniform float uMaskClip;uniform float uMaskOpacity;uniform float uMaskBounds[4];uniform float uMaskCornerRadius[4];uniform float uMaskFeather[8];vec4 applyGamma(vec4 c,float g){c.r=pow(c.r,g);c.g=pow(c.g,g);c.b=pow(c.b,g);return c;}vec4 applyColorMatrix(vec4 c,mat4 m,vec4 o){vec4 cM=(c*m)+o;cM*=cM.a;return cM;}vec4 applyConvolutionMatrix(vec4 c,float k0,float k1,float k2,float k3,float k4,float k5,float k6,float k7,float k8,float w){vec2 pixel=vec2(1)/uTextureSize;vec4 colorSum=texture(uTexture,vTexCoord-pixel)*k0+texture(uTexture,vTexCoord+pixel*vec2(0.0,-1.0))*k1+texture(uTexture,vTexCoord+pixel*vec2(1.0,-1.0))*k2+texture(uTexture,vTexCoord+pixel*vec2(-1.0,0.0))*k3+texture(uTexture,vTexCoord)*k4+texture(uTexture,vTexCoord+pixel*vec2(1.0,0.0))*k5+texture(uTexture,vTexCoord+pixel*vec2(-1.0,1.0))*k6+texture(uTexture,vTexCoord+pixel*vec2(0.0,1.0))*k7+texture(uTexture,vTexCoord+pixel)*k8;vec4 color=vec4((colorSum/w).rgb,c.a);color.rgb=clamp(color.rgb,0.0,1.0);return color;}vec4 applyVignette(vec4 c,vec2 pos,vec2 center,float v){float d=distance(pos,center)/length(center);float f=1.0-(d*abs(v));if(v>0.0){c.rgb*=f;}else if(v<0.0){c.rgb+=(1.0-f)*(1.0-c.rgb);}return c;}vec4 blendPremultipliedAlpha(vec4 back,vec4 front){return front+(back*(1.0-front.a));}void main(){float x=gl_FragCoord.x;float y=gl_FragCoord.y;float a=1.0;float maskTop=uMaskBounds[0];float maskRight=uMaskBounds[1];float maskBottom=uMaskBounds[2];float maskLeft=uMaskBounds[3];float leftFeatherOpacity=step(uMaskFeather[1],x)*uMaskFeather[0]+((1.0-uMaskFeather[0])*smoothstep(uMaskFeather[1],uMaskFeather[3],x));float rightFeatherOpacity=(1.0-step(uMaskFeather[7],x))*uMaskFeather[4]+((1.0-uMaskFeather[4])*smoothstep(uMaskFeather[7],uMaskFeather[5],x));a*=leftFeatherOpacity*rightFeatherOpacity;float overlayColorAlpha=(smoothstep(maskLeft,maskLeft+1.0,x)*(1.0-smoothstep(maskRight-1.0,maskRight,x))*(1.0-step(maskTop,y))*step(maskBottom,y));if(uOverlayColor.a==0.0){a*=overlayColorAlpha;}vec2 offset=vec2(maskLeft,maskBottom);vec2 size=vec2(maskRight-maskLeft,maskTop-maskBottom)*.5;vec2 center=offset.xy+size.xy;int pixelX=int(step(center.x,x));int pixelY=int(step(y,center.y));float cornerRadius=0.0;if(pixelX==0&&pixelY==0)cornerRadius=uMaskCornerRadius[0];if(pixelX==1&&pixelY==0)cornerRadius=uMaskCornerRadius[1];if(pixelX==0&&pixelY==1)cornerRadius=uMaskCornerRadius[2];if(pixelX==1&&pixelY==1)cornerRadius=uMaskCornerRadius[3];float cornerOffset=sign(cornerRadius)*length(max(abs(gl_FragCoord.xy-size-offset)-size+cornerRadius,0.0))-cornerRadius;float cornerOpacity=1.0-smoothstep(0.0,1.0,cornerOffset);a*=cornerOpacity;vec2 scaledPoint=vec2(vTexCoord.x*uTextureSize.x,vTexCoord.y*uTextureSize.y);a*=smoothstep(0.0,1.0,uTextureSize.x-scaledPoint.x);a*=smoothstep(0.0,1.0,uTextureSize.y-scaledPoint.y);a*=smoothstep(0.0,1.0,scaledPoint.x);a*=smoothstep(0.0,1.0,scaledPoint.y);vec4 color=texture(uTexture,vTexCoord);if(uClarityKernelWeight!=-1.0){color=applyConvolutionMatrix(color,uClarityKernel[0],uClarityKernel[1],uClarityKernel[2],uClarityKernel[3],uClarityKernel[4],uClarityKernel[5],uClarityKernel[6],uClarityKernel[7],uClarityKernel[8],uClarityKernelWeight);}color=applyGamma(color,uColorGamma);color=applyColorMatrix(color,uColorMatrix,uColorOffset);color=blendPremultipliedAlpha(uFillColor,color);color*=a;color=blendPremultipliedAlpha(color,texture(uTextureMarkup,vTexCoord));if(uColorVignette!=0.0){vec2 pos=gl_FragCoord.xy-offset;color=applyVignette(color,pos,center-offset,uColorVignette);}vec4 overlayColor=uOverlayColor*(1.0-overlayColorAlpha);overlayColor.rgb*=overlayColor.a;color=blendPremultipliedAlpha(color,overlayColor);if(uOverlayColor.a>0.0&&color.a<1.0&&uFillColor.a>0.0){color=blendPremultipliedAlpha(uFillColor,overlayColor);}color*=uOpacity;fragColor=color;}",
    ["aPosition", "aTexCoord"],
    [
      "uMatrix",
      "uTexture",
      "uTextureMarkup",
      "uTextureSize",
      "uColorGamma",
      "uColorVignette",
      "uColorOffset",
      "uColorMatrix",
      "uClarityKernel",
      "uClarityKernelWeight",
      "uOpacity",
      "uMaskOpacity",
      "uMaskBounds",
      "uMaskCornerRadius",
      "uMaskFeather",
      "uFillColor",
      "uOverlayColor",
    ]
  );
  let I;
  k.useProgram(A.program);
  const L = [0, 0, 0, 0, 1, 0, 0, 0, 0],
    F = is(
      k,
      "#version 300 es\n\nin vec4 aPosition;in vec2 aNormal;in float aMiter;out vec2 vNormal;out float vMiter;uniform float uWidth;uniform mat4 uMatrix;void main(){vMiter=aMiter;vNormal=aNormal;float w=uWidth;gl_Position=uMatrix*vec4(aPosition.x+(aNormal.x*w*.5*aMiter),aPosition.y+(aNormal.y*w*.5*aMiter),0,1);}",
      "\n##head\n##mask\nin vec2 vNormal;in float vMiter;uniform float uWidth;uniform vec4 uColor;uniform vec4 uCanvasColor;void main(){vec4 fillColor=uColor;float w=(uWidth-1.0)*.5;float d=1.0-abs(vMiter);float m=mask(gl_FragCoord.x,gl_FragCoord.y,uMaskBounds,uMaskOpacity);fillColor.a*=clamp(smoothstep(0.25,1.0,d*w),0.0,1.0);fillColor.rgb*=fillColor.a;fillColor.rgb*=m;fillColor.rgb+=(1.0-m)*(uCanvasColor.rgb*fillColor.a);fragColor=fillColor;}",
      ["aPosition", "aNormal", "aMiter"],
      ["uColor", "uCanvasColor", "uMatrix", "uWidth", "uMaskBounds", "uMaskOpacity"]
    ),
    B = k.createBuffer(),
    D = (t, e, n, o) => {
      const { program: i, locations: r } = F;
      k.useProgram(i),
        k.enableVertexAttribArray(r.aPosition),
        k.enableVertexAttribArray(r.aNormal),
        k.enableVertexAttribArray(r.aMiter);
      const a = ((t, e) => {
          let n,
            o,
            i,
            r = 0;
          const a = t.length,
            s = new Float32Array(10 * (e ? a + 1 : a)),
            l = t[0],
            c = t[a - 1];
          for (r = 0; r < a; r++)
            (n = t[r - 1]),
              (o = t[r]),
              (i = t[r + 1]),
              n || (n = e ? c : X(o.x + (o.x - i.x), o.y + (o.y - i.y))),
              i || (i = e ? l : X(o.x + (o.x - n.x), o.y + (o.y - n.y))),
              ps(s, 10 * r, n, o, i);
          return e && ps(s, 10 * a, c, l, t[1]), s;
        })(t, o),
        s = 5 * Float32Array.BYTES_PER_ELEMENT,
        c = 2 * Float32Array.BYTES_PER_ELEMENT,
        u = 4 * Float32Array.BYTES_PER_ELEMENT;
      k.uniform1f(r.uWidth, e + 2),
        k.uniform4fv(r.uColor, n),
        k.uniformMatrix4fv(r.uMatrix, !1, l),
        k.uniform4f(r.uCanvasColor, b[0], b[1], b[2], 1),
        k.uniform1fv(r.uMaskBounds, f),
        k.uniform1f(r.uMaskOpacity, m),
        k.bindBuffer(k.ARRAY_BUFFER, B),
        k.bufferData(k.ARRAY_BUFFER, a, k.STATIC_DRAW),
        k.vertexAttribPointer(r.aPosition, 2, k.FLOAT, !1, s, 0),
        k.vertexAttribPointer(r.aNormal, 2, k.FLOAT, !1, s, c),
        k.vertexAttribPointer(r.aMiter, 1, k.FLOAT, !1, s, u),
        k.drawArrays(k.TRIANGLE_STRIP, 0, a.length / 5),
        k.disableVertexAttribArray(r.aPosition),
        k.disableVertexAttribArray(r.aNormal),
        k.disableVertexAttribArray(r.aMiter);
    },
    O = is(
      k,
      "\n##head\nvoid main(){\n##matrix\n}",
      "\n##head\n##mask\nuniform vec4 uColor;uniform vec4 uCanvasColor;void main(){vec4 fillColor=uColor;\n##maskapply\nfillColor.rgb*=fillColor.a;fillColor.rgb*=m;fillColor.rgb+=(1.0-m)*(uCanvasColor.rgb*fillColor.a);fragColor=fillColor;}",
      ["aPosition"],
      ["uColor", "uCanvasColor", "uMatrix", "uMaskBounds", "uMaskOpacity"]
    ),
    _ = k.createBuffer(),
    W = is(
      k,
      "\n##head\n##text\nin vec2 aRectCoord;out vec2 vRectCoord;void main(){vTexCoord=aTexCoord;vRectCoord=aRectCoord;\n##matrix\n}",
      "\n##head\n##mask\nin vec2 vTexCoord;in vec2 vRectCoord;uniform sampler2D uTexture;uniform vec4 uTextureColor;uniform float uTextureOpacity;uniform vec4 uColor;uniform float uCornerRadius[4];uniform vec2 uSize;uniform vec2 uPosition;uniform vec4 uCanvasColor;void main(){\n##init\n##colorize\n##edgeaa\n##cornerradius\n##maskfeatherapply\n##maskapply\n##fragcolor\n}",
      ["aPosition", "aTexCoord", "aRectCoord"],
      [
        "uTexture",
        "uColor",
        "uMatrix",
        "uCanvasColor",
        "uTextureColor",
        "uTextureOpacity",
        "uPosition",
        "uSize",
        "uMaskBounds",
        "uMaskOpacity",
        "uMaskFeather",
        "uCornerRadius",
      ]
    ),
    V = k.createBuffer(),
    U = k.createBuffer(),
    N = k.createBuffer(),
    H = [0, 0, 0, 0],
    j = is(
      k,
      "\n##head\n##text\nout vec2 vTexCoordDouble;void main(){vTexCoordDouble=vec2(aTexCoord.x*2.0-1.0,aTexCoord.y*2.0-1.0);vTexCoord=aTexCoord;\n##matrix\n}",
      "\n##head\n##mask\nin vec2 vTexCoord;in vec2 vTexCoordDouble;uniform sampler2D uTexture;uniform float uTextureOpacity;uniform vec2 uRadius;uniform vec4 uColor;uniform int uInverted;uniform vec4 uCanvasColor;void main(){\n##init\nfloat ar=uRadius.x/uRadius.y;vec2 rAA=vec2(uRadius.x-1.0,uRadius.y-(1.0/ar));vec2 scaledPointSq=vec2((vTexCoordDouble.x*uRadius.x)*(vTexCoordDouble.x*uRadius.x),(vTexCoordDouble.y*uRadius.y)*(vTexCoordDouble.y*uRadius.y));float p=(scaledPointSq.x/(uRadius.x*uRadius.x))+(scaledPointSq.y/(uRadius.y*uRadius.y));float pAA=(scaledPointSq.x/(rAA.x*rAA.x))+(scaledPointSq.y/(rAA.y*rAA.y));a=smoothstep(1.0,p/pAA,p);if(uInverted==1)a=1.0-a;\n##maskapply\n##fragcolor\n}",
      ["aPosition", "aTexCoord"],
      [
        "uTexture",
        "uTextureOpacity",
        "uColor",
        "uCanvasColor",
        "uMatrix",
        "uRadius",
        "uInverted",
        "uMaskBounds",
        "uMaskOpacity",
      ]
    ),
    Y = k.createBuffer(),
    G = k.createBuffer(),
    Z = (t, e, n, o) => {
      if (!n || !o) return fs;
      let i = o.x / n.width,
        r = o.y / n.height,
        a = t / n.width / x,
        s = e / n.height / x;
      (a -= i), (s -= r);
      return new Float32Array([-i, s, -i, -r, a, s, a, -r]);
    },
    q = new Map();
  return {
    textureCreate: () => k.createTexture(),
    textureUpdate: (t, e) => (q.set(t, e), as(k, t, e)),
    textureSize: (t) => dt(q.get(t)),
    textureDelete: (t) => {
      const e = q.get(t);
      e instanceof HTMLCanvasElement && g(e), q.delete(t), k.deleteTexture(t);
    },
    drawPath: (t, e, n, o) => {
      t.length < 2 ||
        D(
          t.map((t) => ({ x: t.x * x, y: t.y * x })),
          e * x,
          ss(n, o),
          !1
        );
    },
    drawTriangle: (t, e = 0, n = !1, o = !1, i, r) => {
      if (!i) return;
      const a = t.map((t) => ({ x: t.x * x, y: t.y * x })),
        s = Jt(a);
      (n || o) && st(a, n, o, s.x, s.y), lt(a, e, s.x, s.y);
      ((t, e) => {
        const { program: n, locations: o } = O;
        k.useProgram(n),
          k.enableVertexAttribArray(o.aPosition),
          k.uniform4fv(o.uColor, e),
          k.uniformMatrix4fv(o.uMatrix, !1, l),
          k.uniform1fv(o.uMaskBounds, f),
          k.uniform1f(o.uMaskOpacity, m),
          k.uniform4f(o.uCanvasColor, b[0], b[1], b[2], 1),
          k.bindBuffer(k.ARRAY_BUFFER, _),
          k.bufferData(k.ARRAY_BUFFER, t, k.STATIC_DRAW),
          k.vertexAttribPointer(o.aPosition, 2, k.FLOAT, !1, 0, 0),
          k.drawArrays(k.TRIANGLE_STRIP, 0, t.length / 2),
          k.disableVertexAttribArray(o.aPosition);
      })(
        ((t) => {
          const e = new Float32Array(6);
          return (
            (e[0] = t[0].x),
            (e[1] = t[0].y),
            (e[2] = t[1].x),
            (e[3] = t[1].y),
            (e[4] = t[2].x),
            (e[5] = t[2].y),
            e
          );
        })(a),
        ss(i, r)
      );
    },
    drawRect: (t, n = 0, o = !1, i = !1, r, a, s, c, u, d, p, h, g, y) => {
      let v = Dt(Mt(t), x);
      const w = r
        .map((e) =>
          ((t, e) => Math.floor(Tr(t, 0, Math.min(0.5 * (e.width - 1), 0.5 * (e.height - 1)))))(
            e || 0,
            t
          )
        )
        .map((t) => t * x);
      if (a || s) {
        const t = Mt(v);
        (t.x -= 0.5), (t.y -= 0.5), (t.width += 1), (t.height += 1);
        const r = gs(t, n, o, i),
          d = hs(r);
        let p;
        y && ((p = ss(y)), 0 === p[3] && (p[3] = 0.001)),
          ((
            t,
            n,
            o,
            i,
            r,
            a = C,
            s = 1,
            c = H,
            u = fs,
            d = [1, 0, 1, 0, 1, Math.max($.width, e.width), 1, Math.max($.width, e.width)]
          ) => {
            const { program: p, locations: h } = W;
            k.useProgram(p),
              k.enableVertexAttribArray(h.aPosition),
              k.enableVertexAttribArray(h.aTexCoord),
              k.enableVertexAttribArray(h.aRectCoord),
              k.uniform4fv(h.uColor, r),
              k.uniform2fv(h.uSize, [n, o]),
              k.uniform2fv(h.uPosition, [t[2], t[3]]),
              k.uniform1fv(h.uCornerRadius, i),
              k.uniform4f(h.uCanvasColor, b[0], b[1], b[2], 1),
              k.uniform1fv(
                h.uMaskFeather,
                d.map((t, e) => (e % 2 == 0 ? t : t * x))
              ),
              k.uniform1fv(h.uMaskBounds, f),
              k.uniform1f(h.uMaskOpacity, m),
              k.uniformMatrix4fv(h.uMatrix, !1, l),
              k.uniform1i(h.uTexture, 3),
              k.uniform4fv(h.uTextureColor, c),
              k.uniform1f(h.uTextureOpacity, s),
              k.activeTexture(k.TEXTURE0 + 3),
              k.bindTexture(k.TEXTURE_2D, a),
              k.bindBuffer(k.ARRAY_BUFFER, U),
              k.bufferData(k.ARRAY_BUFFER, u, k.STATIC_DRAW),
              k.vertexAttribPointer(h.aTexCoord, 2, k.FLOAT, !1, 0, 0),
              k.bindBuffer(k.ARRAY_BUFFER, N),
              k.bufferData(k.ARRAY_BUFFER, fs, k.STATIC_DRAW),
              k.vertexAttribPointer(h.aRectCoord, 2, k.FLOAT, !1, 0, 0),
              k.bindBuffer(k.ARRAY_BUFFER, V),
              k.bufferData(k.ARRAY_BUFFER, t, k.STATIC_DRAW),
              k.vertexAttribPointer(h.aPosition, 2, k.FLOAT, !1, 0, 0),
              k.drawArrays(k.TRIANGLE_STRIP, 0, t.length / 2),
              k.disableVertexAttribArray(h.aPosition),
              k.disableVertexAttribArray(h.aTexCoord),
              k.disableVertexAttribArray(h.aRectCoord);
          })(d, t.width, t.height, w, ss(a, h), s, h, p, Z(t.width, t.height, c, u), g);
      }
      d &&
        ((d = Math.min(d, v.width, v.height)),
        D(
          ((t, e, n, o, i, r, a, s) => {
            const l = [];
            if (r.every((t) => 0 === t)) l.push(X(t, e), X(t + n, e), X(t + n, e + o), X(t, e + o));
            else {
              const [i, a, s, c] = r,
                u = t,
                d = t + n,
                p = e,
                h = e + o;
              l.push(X(u + i, p)),
                ms(l, d - a, p + a, a, -1),
                l.push(X(d, p + a)),
                ms(l, d - c, h - c, c, 0),
                l.push(X(d - c, h)),
                ms(l, u + s, h - s, s, 1),
                l.push(X(u, h - s)),
                ms(l, u + i, p + i, i, 2);
            }
            return (
              (a || s) && st(l, a, s, t + 0.5 * n, e + 0.5 * o),
              i && lt(l, i, t + 0.5 * n, e + 0.5 * o),
              l
            );
          })(v.x, v.y, v.width, v.height, n, w, o, i),
          d * x,
          ss(p, h),
          !0
        ));
    },
    drawEllipse: (t, e, n, o, i, r, a, s, c, u, d, p, h, g) => {
      let $ = Dt(Lt(t.x - e, t.y - n, 2 * e, 2 * n), x);
      if (a || s) {
        const t = Mt($);
        (t.x -= 0.5), (t.y -= 0.5), (t.width += 1), (t.height += 1);
        const e = gs(t, o, i, r);
        ((t, e, n, o, i = C, r = fs, a = 1, s = !1) => {
          const { program: c, locations: u } = j;
          k.useProgram(c),
            k.enableVertexAttribArray(u.aPosition),
            k.enableVertexAttribArray(u.aTexCoord),
            k.uniformMatrix4fv(u.uMatrix, !1, l),
            k.uniform2fv(u.uRadius, [0.5 * e, 0.5 * n]),
            k.uniform1i(u.uInverted, s ? 1 : 0),
            k.uniform4fv(u.uColor, o),
            k.uniform4f(u.uCanvasColor, b[0], b[1], b[2], 1),
            k.uniform1fv(u.uMaskBounds, f),
            k.uniform1f(u.uMaskOpacity, m),
            k.uniform1i(u.uTexture, 3),
            k.uniform1f(u.uTextureOpacity, a),
            k.activeTexture(k.TEXTURE0 + 3),
            k.bindTexture(k.TEXTURE_2D, i),
            k.bindBuffer(k.ARRAY_BUFFER, G),
            k.bufferData(k.ARRAY_BUFFER, r, k.STATIC_DRAW),
            k.vertexAttribPointer(u.aTexCoord, 2, k.FLOAT, !1, 0, 0),
            k.bindBuffer(k.ARRAY_BUFFER, Y),
            k.bufferData(k.ARRAY_BUFFER, t, k.STATIC_DRAW),
            k.vertexAttribPointer(u.aPosition, 2, k.FLOAT, !1, 0, 0),
            k.drawArrays(k.TRIANGLE_STRIP, 0, t.length / 2),
            k.disableVertexAttribArray(u.aPosition),
            k.disableVertexAttribArray(u.aTexCoord);
        })(hs(e), t.width, t.height, ss(a, h), s, Z(t.width, t.height, c, u), h, g);
      }
      d &&
        D(
          ((t, e, n, o, i, r, a) => {
            const s = 0.5 * Math.abs(n),
              l = 0.5 * Math.abs(o),
              c = Math.abs(n) + Math.abs(o),
              u = Math.max(20, Math.round(c / 6));
            return ie(X(t + s, e + l), s, l, i, r, a, u);
          })($.x, $.y, $.width, $.height, o, i, r),
          d * x,
          ss(p, h),
          !0
        );
    },
    drawPreviewImage: (
      t,
      n,
      o,
      a,
      s,
      l,
      c,
      u,
      d,
      p = 1,
      h,
      g = 1,
      $ = 0,
      b = [1, 0, 1, 0, 1, y.width, 1, y.width],
      S = [0, 0, 0, 0],
      C = [0, 0, 0, 0],
      M = [0, 0, 0, 0],
      R = !0
    ) => {
      const { program: T, locations: F } = A;
      var B, z;
      (o *= x),
        (a *= x),
        (t *= x),
        (n *= x),
        (I = ls()),
        ((t, e, n, o, i) => {
          const r = 1 / Math.tan(e / 2),
            a = 1 / (o - i);
          (t[0] = r / n),
            (t[1] = 0),
            (t[2] = 0),
            (t[3] = 0),
            (t[4] = 0),
            (t[5] = r),
            (t[6] = 0),
            (t[7] = 0),
            (t[8] = 0),
            (t[9] = 0),
            (t[10] = (i + o) * a),
            (t[11] = -1),
            (t[12] = 0),
            (t[13] = 0),
            (t[14] = 2 * i * o * a),
            (t[15] = 0);
        })(I, w, i, 1, 2 * -r),
        us(I, o, -a, r),
        us(I, t, -n, 0),
        ((t, e) => {
          const n = Math.sin(e),
            o = Math.cos(e),
            i = t[0],
            r = t[1],
            a = t[2],
            s = t[3],
            l = t[4],
            c = t[5],
            u = t[6],
            d = t[7];
          (t[0] = i * o + l * n),
            (t[1] = r * o + c * n),
            (t[2] = a * o + u * n),
            (t[3] = s * o + d * n),
            (t[4] = l * o - i * n),
            (t[5] = c * o - r * n),
            (t[6] = u * o - a * n),
            (t[7] = d * o - s * n);
        })(I, -c),
        (z = u),
        ((B = I)[0] = B[0] * z),
        (B[1] = B[1] * z),
        (B[2] = B[2] * z),
        (B[3] = B[3] * z),
        (B[4] = B[4] * z),
        (B[5] = B[5] * z),
        (B[6] = B[6] * z),
        (B[7] = B[7] * z),
        (B[8] = B[8] * z),
        (B[9] = B[9] * z),
        (B[10] = B[10] * z),
        (B[11] = B[11] * z),
        us(I, -t, n, 0),
        ((t, e) => {
          const n = Math.sin(e),
            o = Math.cos(e),
            i = t[0],
            r = t[1],
            a = t[2],
            s = t[3],
            l = t[8],
            c = t[9],
            u = t[10],
            d = t[11];
          (t[0] = i * o - l * n),
            (t[1] = r * o - c * n),
            (t[2] = a * o - u * n),
            (t[3] = s * o - d * n),
            (t[8] = i * n + l * o),
            (t[9] = r * n + c * o),
            (t[10] = a * n + u * o),
            (t[11] = s * n + d * o);
        })(I, l),
        ((t, e) => {
          const n = Math.sin(e),
            o = Math.cos(e),
            i = t[4],
            r = t[5],
            a = t[6],
            s = t[7],
            l = t[8],
            c = t[9],
            u = t[10],
            d = t[11];
          (t[4] = i * o + l * n),
            (t[5] = r * o + c * n),
            (t[6] = a * o + u * n),
            (t[7] = s * o + d * n),
            (t[8] = l * o - i * n),
            (t[9] = c * o - r * n),
            (t[10] = u * o - a * n),
            (t[11] = d * o - s * n);
        })(I, s),
        k.useProgram(T),
        k.enableVertexAttribArray(F.aPosition),
        k.enableVertexAttribArray(F.aTexCoord),
        k.uniform1i(F.uTexture, 2),
        k.uniform2f(F.uTextureSize, e.width, e.height),
        k.activeTexture(k.TEXTURE0 + 2),
        k.bindTexture(k.TEXTURE_2D, v.get(2));
      const D = R ? 1 : 0,
        O = v.get(D);
      let _;
      k.uniform1i(F.uTextureMarkup, D),
        k.activeTexture(k.TEXTURE0 + D),
        k.bindTexture(k.TEXTURE_2D, O),
        k.bindBuffer(k.ARRAY_BUFFER, P),
        k.vertexAttribPointer(F.aPosition, 3, k.FLOAT, !1, 0, 0),
        k.bindBuffer(k.ARRAY_BUFFER, E),
        k.vertexAttribPointer(F.aTexCoord, 2, k.FLOAT, !1, 0, 0),
        k.uniformMatrix4fv(F.uMatrix, !1, I),
        k.uniform4fv(F.uOverlayColor, M),
        k.uniform4fv(F.uFillColor, C),
        !h || Lr(h, L)
          ? ((h = L), (_ = -1))
          : ((_ = h.reduce((t, e) => t + e, 0)), (_ = _ <= 0 ? 1 : _)),
        k.uniform1fv(F.uClarityKernel, h),
        k.uniform1f(F.uClarityKernelWeight, _),
        k.uniform1f(F.uColorGamma, 1 / g),
        k.uniform1f(F.uColorVignette, $),
        k.uniform4f(F.uColorOffset, d[4], d[9], d[14], d[19]),
        k.uniformMatrix4fv(F.uColorMatrix, !1, [
          d[0],
          d[1],
          d[2],
          d[3],
          d[5],
          d[6],
          d[7],
          d[8],
          d[10],
          d[11],
          d[12],
          d[13],
          d[15],
          d[16],
          d[17],
          d[18],
        ]),
        k.uniform1f(F.uOpacity, p),
        k.uniform1f(F.uMaskOpacity, m),
        k.uniform1fv(F.uMaskBounds, f),
        k.uniform1fv(
          F.uMaskCornerRadius,
          S.map((t) => t * x)
        ),
        k.uniform1fv(
          F.uMaskFeather,
          b.map((t, e) => (e % 2 == 0 ? t : t * x))
        ),
        k.drawArrays(k.TRIANGLE_STRIP, 0, 4),
        k.disableVertexAttribArray(F.aPosition),
        k.disableVertexAttribArray(F.aTexCoord);
    },
    setCanvasColor(t) {
      b = t;
    },
    drawToCanvas() {
      k.bindFramebuffer(k.FRAMEBUFFER, null),
        (l = a),
        k.viewport(0, 0, k.drawingBufferWidth, k.drawingBufferHeight),
        k.colorMask(!0, !0, !0, !1),
        k.clearColor(b[0], b[1], b[2], 1),
        k.clear(k.COLOR_BUFFER_BIT);
    },
    drawToFramebuffer() {
      k.bindFramebuffer(k.FRAMEBUFFER, R),
        (l = s),
        k.viewport(0, 0, e.width, e.height),
        k.colorMask(!0, !0, !0, !0),
        k.clearColor(0, 0, 0, 0),
        k.clear(k.COLOR_BUFFER_BIT);
    },
    enableMask(t, e) {
      const n = t.x * x,
        o = t.y * x,
        i = t.width * x,
        r = t.height * x;
      (h = n),
        (d = h + i),
        (u = $.height - o),
        (p = $.height - (o + r)),
        (m = 1 - e),
        (f = [u, d, p, h]);
    },
    disableMask() {
      (h = 0), (d = $.width), (u = $.height), (p = 0), (m = 1), (f = [u, d, p, h]);
    },
    resize: (o, l, u) => {
      (x = u),
        (y.width = o),
        (y.height = l),
        ($.width = o * x),
        ($.height = l * x),
        (i = z($.width, $.height)),
        (t.width = $.width),
        (t.height = $.height),
        (a = ls()),
        cs(a, 0, $.width, $.height, 0, -1, 1),
        (s = ls());
      const d = n.width * x,
        p = n.height * x;
      var h, g;
      cs(s, 0, d, p, 0, -1, 1),
        us(s, 0, p, 0),
        (g = 1),
        ((h = s)[0] = h[0] * g),
        (h[1] = h[1] * g),
        (h[2] = h[2] * g),
        (h[3] = h[3] * g),
        ((t, e) => {
          (t[4] = t[4] * e), (t[5] = t[5] * e), (t[6] = t[6] * e), (t[7] = t[7] * e);
        })(s, -1),
        k.bindTexture(k.TEXTURE_2D, v.get(1)),
        k.texImage2D(k.TEXTURE_2D, 0, k.RGBA, e.width, e.height, 0, k.RGBA, k.UNSIGNED_BYTE, null),
        k.texParameteri(k.TEXTURE_2D, k.TEXTURE_MIN_FILTER, k.LINEAR),
        k.texParameteri(k.TEXTURE_2D, k.TEXTURE_WRAP_S, k.CLAMP_TO_EDGE),
        k.texParameteri(k.TEXTURE_2D, k.TEXTURE_WRAP_T, k.CLAMP_TO_EDGE),
        k.bindFramebuffer(k.FRAMEBUFFER, R),
        k.framebufferTexture2D(k.FRAMEBUFFER, k.COLOR_ATTACHMENT0, k.TEXTURE_2D, v.get(1), 0);
      const m = n.width * x,
        f = n.height * x,
        b = -0.5 * m,
        w = 0.5 * f,
        C = 0.5 * m,
        M = -0.5 * f;
      (c = new Float32Array([b, M, 0, b, w, 0, C, M, 0, C, w, 0])),
        k.bindBuffer(k.ARRAY_BUFFER, P),
        k.bufferData(k.ARRAY_BUFFER, c, k.STATIC_DRAW),
        (r = (n.height / 2 / S) * ($.height / n.height) * -1);
    },
    release() {
      (t.width = 1), (t.height = 1);
    },
  };
};
function ys(t) {
  let e, n, o, i;
  return {
    c() {
      (e = Qo("div")), (n = Qo("canvas")), ai(e, "class", "PinturaCanvas");
    },
    m(r, a) {
      qo(r, e, a),
        Zo(e, n),
        t[20](n),
        o || ((i = [oi(n, "measure", t[4]), Uo(Ha.call(null, n))]), (o = !0));
    },
    p: Mo,
    i: Mo,
    o: Mo,
    d(n) {
      n && Ko(e), t[20](null), (o = !1), Ao(i);
    },
  };
}
function xs(t, e, o) {
  let i, r, a, s, l, c;
  const u = vi(),
    d = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0];
  let { animate: p } = e,
    { imageData: h } = e,
    { imageSize: m } = e,
    { imageProps: f } = e,
    { imagePreviews: $ = [] } = e,
    { maskRect: y } = e,
    { pixelRatio: x = 1 } = e,
    { willRender: b = D } = e,
    { loadImageData: w = D } = e,
    { backgroundColor: S } = e;
  const k = (t, e) => t.set(e, { hard: !p }),
    C = (t, e) => {
      const [n, o, i] = t,
        [r, a, s, l] = e;
      return [r * l + n * (1 - l), a * l + o * (1 - l), s * l + i * (1 - l), 1];
    },
    M = { precision: 1e-4 },
    R = { precision: 0.01 * M.precision },
    T = Aa(void 0, { duration: 250 });
  zo(t, T, (t) => o(23, (l = t)));
  const P = La(void 0, M),
    E = La(void 0, R),
    A = La(void 0, M),
    I = La(void 0, R),
    L = La(void 0, R),
    F = La(void 0, R),
    B = La(void 0, R),
    O = La([...d], M),
    _ = lr(void 0),
    W = La(0, R),
    V = La(1, R),
    U = lr();
  zo(t, U, (t) => o(25, (c = t)));
  const N = lr(),
    H = cr(
      [A, P, I, E, L, W, O, U, V, _, F, B, N, T],
      ([t, e, n, o, i, r, a, s, l, c, u, d, p, h], g) => {
        if (!f || !h) return g(void 0);
        const m = Tr(l, 0, 1);
        g({
          origin: t,
          translation: e,
          perspective: n,
          rotation: o,
          scale: i,
          colorMatrix: a,
          opacity: Tr(r, 0, 1),
          clarity: c,
          gamma: u,
          vignette: d,
          mask: s,
          maskOpacity: m,
          overlayColor: [h[0], h[1], h[2], m],
          backgroundColor: p,
        });
      }
    );
  let j;
  zo(t, H, (t) => o(19, (s = t)));
  let Y = null,
    G = null,
    Z = null;
  const q = ({
      origin: t,
      translation: e,
      rotation: n,
      scale: o,
      colorMatrix: i,
      opacity: r,
      clarity: a,
      gamma: s,
      vignette: c,
      offset: u,
      maskFeather: p,
      maskCornerRadius: h,
      backgroundColor: g,
      overlayColor: m,
      enableShapes: f,
    }) => {
      let $ = e.x,
        y = e.y;
      u && (($ += u.x - 0.5 * G), (y += u.y - 0.5 * Z)),
        g[3] < 1 && g[3] > 0 && (g = C(l, g)),
        Y.drawPreviewImage(t.x, t.y, $, y, n.x, n.y, n.z, o, i || d, r, a, s, c, p, h, g, m, f);
    },
    K = new Map([]),
    Q = nn(),
    J = (t) => {
      let {
        text: e,
        textAlign: n,
        fontFamily: o,
        fontSize: i,
        fontWeight: r,
        fontVariant: a,
        fontStyle: s,
        lineHeight: l,
        width: c,
      } = t;
      on(Q, {
        fontSize: i,
        fontFamily: o,
        fontWeight: r,
        fontVariant: a,
        fontStyle: s,
        textAlign: n,
      });
      const u = c ? cn(Q, e, c) : e,
        d = (({
          text: t,
          textAlign: e,
          fontSize: n,
          fontFamily: o,
          lineHeight: i,
          fontWeight: r,
          fontStyle: a,
          fontVariant: s,
        }) => `${[t, e, n, r, a, s, o].join("_")}_${Xe(i) ? i(n) : i}`)({ ...t, text: u });
      if (!K.has(d)) {
        const t = nn();
        on(t, {
          fontSize: i,
          fontFamily: o,
          fontWeight: r,
          fontVariant: a,
          fontStyle: s,
          textAlign: n,
        }),
          ((t, e, n) => {
            const { width: o, height: i } = an(t, e, rn(n.fontSize, n.lineHeight));
            (t.canvas.width = Math.ceil(o)), (t.canvas.height = Math.ceil(i));
          })(t, u, {
            fontSize: i,
            fontFamily: o,
            fontWeight: r,
            fontVariant: a,
            fontStyle: s,
            textAlign: n,
            lineHeight: l,
          });
        const e = t.canvas.width;
        (t.canvas.width += 20),
          on(t, {
            fontSize: i,
            fontFamily: o,
            fontWeight: r,
            fontVariant: a,
            fontStyle: s,
            textAlign: n,
            color: [1, 0, 1],
          }),
          un(t, u, { fontSize: i, textAlign: n, lineHeight: l, lineWidth: e }),
          K.set(d, Y.textureUpdate(Y.textureCreate(), t.canvas));
      }
      return K.get(d);
    },
    tt = (t) => {
      let e;
      if (t.backgroundImage)
        e = (({ backgroundImage: t }) => {
          if (!K.has(t)) {
            const e = Y.textureCreate();
            K.set(t, void 0),
              w(t)
                .then((n) => {
                  K.set(t, e), Y.textureUpdate(e, n), requestAnimationFrame(a);
                })
                .catch((t) => {
                  console.error(t);
                });
          }
          return K.get(t);
        })(t);
      else if (v(t.text)) {
        if ((t.width && t.width < 1) || (t.height && t.height < 1)) return;
        e = J(t);
      }
      return e;
    },
    et = (t = []) =>
      t
        .map((t) => {
          let e = tt(t);
          if (je(t.points))
            3 === t.points.length && t.backgroundColor
              ? Y.drawTriangle(
                  t.points,
                  t.rotation,
                  t.flipX,
                  t.flipY,
                  t.backgroundColor,
                  t.strokeWidth,
                  t.strokeColor,
                  t.opacity
                )
              : Y.drawPath(t.points, t.strokeWidth, t.strokeColor, t.opacity);
          else if (Ue(t.rx)) {
            let n, o;
            Y.drawEllipse(
              t,
              t.rx,
              t.ry,
              t.rotation,
              t.flipX,
              t.flipY,
              t.backgroundColor,
              e,
              n,
              o,
              t.strokeWidth,
              t.strokeColor,
              t.opacity,
              t.inverted
            );
          } else if ((v(t.text) && e) || t.width) {
            const n = e && Y.textureSize(e);
            let o,
              i,
              r,
              a = void 0,
              s = [t.cornerRadius, t.cornerRadius, t.cornerRadius, t.cornerRadius];
            if (((o = t.width ? t : { x: t.x, y: t.y, ...n }), n)) {
              if (t.backgroundImage && t.backgroundSize) {
                const e = z(n.width, n.height);
                if ("contain" === t.backgroundSize) {
                  const n = Yt(t, e, o);
                  (i = pt(n)), (r = X(0.5 * (t.width - i.width), 0.5 * (t.height - i.height)));
                } else if ("cover" === t.backgroundSize) {
                  const n = jt(t, e, o);
                  (i = pt(n)),
                    (r = X(n.x, n.y)),
                    (r = X(0.5 * (t.width - i.width), 0.5 * (t.height - i.height)));
                }
              } else
                t.text && t.width
                  ? ((i = n),
                    (r = X(0, 0)),
                    t.height || (t.height = n.height),
                    (t.x -= 20),
                    (t.width += 40),
                    "left" === t.textAlign && (r.x = 20),
                    "center" === t.textAlign && (r.x = 10 + 0.5 * (t.width - n.width)),
                    "right" === t.textAlign && (r.x = t.width - n.width))
                  : t.text &&
                    ((r = X(0, 0)), (i = { width: o.width, height: o.height }), (o.width -= 20));
              t.text && (a = t.color);
            }
            Y.drawRect(
              o,
              t.rotation,
              t.flipX,
              t.flipY,
              s,
              t.backgroundColor,
              e,
              i,
              r,
              t.strokeWidth,
              t.strokeColor,
              t.opacity,
              void 0,
              a
            );
          }
          return e;
        })
        .filter(Boolean),
    nt = () => {
      const t = b({
        opacity: s.opacity,
        rotation: s.rotation,
        scale: s.scale,
        size: i,
        backgroundColor: [...l],
      });
      (t.backgroundColor = [...l]),
        (t.image = s),
        (t.imageMask = s.mask),
        (t.imageMaskOpacity = s.maskOpacity),
        (t.imagePreviews = $);
      const e = t.annotationShapes.length > 0,
        n = s.backgroundColor[3] > 0,
        o = s.maskOpacity < 1,
        r = [];
      if (o && n) {
        const e = t.backgroundColor[0],
          n = t.backgroundColor[1],
          o = t.backgroundColor[2],
          i = 1 - s.maskOpacity,
          r = s.backgroundColor[0] * i,
          a = s.backgroundColor[1] * i,
          l = s.backgroundColor[2] * i,
          c = 1 - i;
        t.backgroundColor = [r + e * c, a + n * c, l + o * c, 1];
      }
      Y.setCanvasColor(t.backgroundColor),
        e && (Y.disableMask(), Y.drawToFramebuffer(), r.push(...et(t.annotationShapes))),
        Y.drawToCanvas(),
        Y.enableMask(t.imageMask, t.imageMaskOpacity),
        n && Y.drawRect(c, 0, !1, !1, [0, 0, 0, 0], C(l, s.backgroundColor)),
        (t.image.enableShapes = e),
        q(t.image),
        r.push(...et(t.decorationShapes)),
        Y.disableMask(),
        r.push(...et(t.interfaceShapes)),
        t.imagePreviews.forEach((t) => {
          Y.enableMask(t.mask, t.maskOpacity),
            n &&
              Y.drawRect(
                t.mask,
                0,
                !1,
                !1,
                t.maskCornerRadius,
                s.backgroundColor,
                void 0,
                void 0,
                void 0,
                void 0,
                void 0,
                t.opacity,
                t.maskFeather
              ),
            q({
              ...t,
              backgroundColor: s.backgroundColor,
              overlayColor: [0, 0, 0, 0],
              enableShapes: !1,
            });
        }),
        Y.disableMask(),
        K.forEach((t, e) => {
          !!r.find((e) => e === t) || (K.delete(e), Y.textureDelete(t));
        });
    };
  let ot = Date.now();
  const it = () => {
    const t = Date.now();
    t - ot < 48 || ((ot = t), nt());
  };
  return (
    xi(() => a()),
    yi(() => o(15, (Y = $s(j, h, m, x)))),
    bi(() => {
      Y && (Y.release(), g(Q.canvas));
    }),
    (t.$$set = (t) => {
      "animate" in t && o(5, (p = t.animate)),
        "imageData" in t && o(6, (h = t.imageData)),
        "imageSize" in t && o(7, (m = t.imageSize)),
        "imageProps" in t && o(8, (f = t.imageProps)),
        "imagePreviews" in t && o(9, ($ = t.imagePreviews)),
        "maskRect" in t && o(10, (y = t.maskRect)),
        "pixelRatio" in t && o(11, (x = t.pixelRatio)),
        "willRender" in t && o(12, (b = t.willRender)),
        "loadImageData" in t && o(13, (w = t.loadImageData)),
        "backgroundColor" in t && o(14, (S = t.backgroundColor));
    }),
    (t.$$.update = () => {
      16384 & t.$$.dirty[0] && S && k(T, S),
        256 & t.$$.dirty[0] && f && k(A, f.origin),
        256 & t.$$.dirty[0] && f && k(P, f.translation),
        256 & t.$$.dirty[0] && f && k(I, f.perspective),
        256 & t.$$.dirty[0] && f && k(E, f.rotation),
        256 & t.$$.dirty[0] && f && k(L, f.scale),
        256 & t.$$.dirty[0] && f && k(O, f.colorMatrix || [...d]),
        256 & t.$$.dirty[0] && f && k(B, f.vignette || 0),
        256 & t.$$.dirty[0] && f && k(F, f.gamma || 1),
        256 & t.$$.dirty[0] &&
          f &&
          _.set((f.convolutionMatrix && f.convolutionMatrix.clarity) || void 0),
        256 & t.$$.dirty[0] && f && k(W, 1),
        256 & t.$$.dirty[0] && f && k(V, Ue(f.maskOpacity) ? f.maskOpacity : 1),
        1024 & t.$$.dirty[0] && y && U.set(y),
        256 & t.$$.dirty[0] && f && N.set(f.backgroundColor),
        196608 & t.$$.dirty[0] && (i = { width: G, height: Z }),
        753664 & t.$$.dirty[0] && o(18, (r = Y && G && Z && s)),
        231424 & t.$$.dirty[0] && G && Z && Y && Y.resize(G, Z, x),
        262144 & t.$$.dirty[0] && (a = r ? (Qa() ? it : nt) : n);
    }),
    [
      j,
      T,
      U,
      H,
      (t) => {
        o(16, (G = t.detail.width)),
          o(17, (Z = t.detail.height)),
          u("measure", { width: G, height: Z });
      },
      p,
      h,
      m,
      f,
      $,
      y,
      x,
      b,
      w,
      S,
      Y,
      G,
      Z,
      r,
      s,
      function (t) {
        Mi[t ? "unshift" : "push"](() => {
          (j = t), o(0, j);
        });
      },
    ]
  );
}
class bs extends rr {
  constructor(t) {
    super(),
      ir(
        this,
        t,
        xs,
        ys,
        Lo,
        {
          animate: 5,
          imageData: 6,
          imageSize: 7,
          imageProps: 8,
          imagePreviews: 9,
          maskRect: 10,
          pixelRatio: 11,
          willRender: 12,
          loadImageData: 13,
          backgroundColor: 14,
        },
        [-1, -1]
      );
  }
}
var vs = (t, e = Boolean, n = " ") => t.filter(e).join(n);
function ws(t, e, n) {
  const o = t.slice();
  return (o[17] = e[n]), o;
}
const Ss = (t) => ({ tab: 4 & t }),
  ks = (t) => ({ tab: t[17] });
function Cs(t) {
  let e,
    n,
    o,
    i = [],
    r = new Map(),
    a = t[2];
  const s = (t) => t[17].id;
  for (let e = 0; e < a.length; e += 1) {
    let n = ws(t, a, e),
      o = s(n);
    r.set(o, (i[e] = Ms(o, n)));
  }
  return {
    c() {
      e = Qo("ul");
      for (let t = 0; t < i.length; t += 1) i[t].c();
      ai(e, "class", (n = vs(["PinturaTabList", t[0]]))),
        ai(e, "role", "tablist"),
        ai(e, "data-layout", t[1]);
    },
    m(n, r) {
      qo(n, e, r);
      for (let t = 0; t < i.length; t += 1) i[t].m(e, null);
      t[14](e), (o = !0);
    },
    p(t, l) {
      1124 & l && ((a = t[2]), Vi(), (i = qi(i, l, s, 1, t, a, r, e, Zi, Ms, null, ws)), Ui()),
        (!o || (1 & l && n !== (n = vs(["PinturaTabList", t[0]])))) && ai(e, "class", n),
        (!o || 2 & l) && ai(e, "data-layout", t[1]);
    },
    i(t) {
      if (!o) {
        for (let t = 0; t < a.length; t += 1) Ni(i[t]);
        o = !0;
      }
    },
    o(t) {
      for (let t = 0; t < i.length; t += 1) Hi(i[t]);
      o = !1;
    },
    d(n) {
      n && Ko(e);
      for (let t = 0; t < i.length; t += 1) i[t].d();
      t[14](null);
    },
  };
}
function Ms(t, e) {
  let n, o, i, r, a, s, l, c, u, d;
  const p = e[11].default,
    h = Do(p, e, e[10], ks);
  function g(...t) {
    return e[12](e[17], ...t);
  }
  function m(...t) {
    return e[13](e[17], ...t);
  }
  return {
    key: t,
    first: null,
    c() {
      (n = Qo("li")),
        (o = Qo("button")),
        h && h.c(),
        (r = ei()),
        (o.disabled = i = e[17].disabled),
        ai(n, "role", "tab"),
        ai(n, "aria-controls", (a = e[17].href.substr(1))),
        ai(n, "id", (s = e[17].tabId)),
        ai(n, "aria-selected", (l = e[17].selected)),
        (this.first = n);
    },
    m(t, e) {
      qo(t, n, e),
        Zo(n, o),
        h && h.m(o, null),
        Zo(n, r),
        (c = !0),
        u || ((d = [oi(o, "keydown", g), oi(o, "click", m)]), (u = !0));
    },
    p(t, r) {
      (e = t),
        h && h.p && 1028 & r && _o(h, p, e, e[10], r, Ss, ks),
        (!c || (4 & r && i !== (i = e[17].disabled))) && (o.disabled = i),
        (!c || (4 & r && a !== (a = e[17].href.substr(1)))) && ai(n, "aria-controls", a),
        (!c || (4 & r && s !== (s = e[17].tabId))) && ai(n, "id", s),
        (!c || (4 & r && l !== (l = e[17].selected))) && ai(n, "aria-selected", l);
    },
    i(t) {
      c || (Ni(h, t), (c = !0));
    },
    o(t) {
      Hi(h, t), (c = !1);
    },
    d(t) {
      t && Ko(n), h && h.d(t), (u = !1), Ao(d);
    },
  };
}
function Rs(t) {
  let e,
    n,
    o = t[4] && Cs(t);
  return {
    c() {
      o && o.c(), (e = ni());
    },
    m(t, i) {
      o && o.m(t, i), qo(t, e, i), (n = !0);
    },
    p(t, [n]) {
      t[4]
        ? o
          ? (o.p(t, n), 16 & n && Ni(o, 1))
          : ((o = Cs(t)), o.c(), Ni(o, 1), o.m(e.parentNode, e))
        : o &&
          (Vi(),
          Hi(o, 1, 1, () => {
            o = null;
          }),
          Ui());
    },
    i(t) {
      n || (Ni(o), (n = !0));
    },
    o(t) {
      Hi(o), (n = !1);
    },
    d(t) {
      o && o.d(t), t && Ko(e);
    },
  };
}
function Ts(t, e, n) {
  let o,
    i,
    r,
    { $$slots: a = {}, $$scope: s } = e,
    { class: l } = e,
    { name: c } = e,
    { selected: u } = e,
    { tabs: d = [] } = e,
    { layout: p } = e;
  const h = vi(),
    g = (t) => {
      const e = r.querySelectorAll('[role="tab"] button')[t];
      e && e.focus();
    },
    m = (t, e) => {
      t.preventDefault(), t.stopPropagation(), h("select", e);
    },
    f = ({ key: t }, e) => {
      if (!/arrow/i.test(t)) return;
      const n = d.findIndex((t) => t.id === e);
      return /right|down/i.test(t)
        ? g(n < d.length - 1 ? n + 1 : 0)
        : /left|up/i.test(t)
        ? g(n > 0 ? n - 1 : d.length - 1)
        : void 0;
    };
  return (
    (t.$$set = (t) => {
      "class" in t && n(0, (l = t.class)),
        "name" in t && n(7, (c = t.name)),
        "selected" in t && n(8, (u = t.selected)),
        "tabs" in t && n(9, (d = t.tabs)),
        "layout" in t && n(1, (p = t.layout)),
        "$$scope" in t && n(10, (s = t.$$scope));
    }),
    (t.$$.update = () => {
      896 & t.$$.dirty &&
        n(
          2,
          (o = d.map((t) => {
            const e = t.id === u;
            return { ...t, tabId: `tab-${c}-${t.id}`, href: `#panel-${c}-${t.id}`, selected: e };
          }))
        ),
        4 & t.$$.dirty && n(4, (i = o.length > 1));
    }),
    [
      l,
      p,
      o,
      r,
      i,
      m,
      f,
      c,
      u,
      d,
      s,
      a,
      (t, e) => f(e, t.id),
      (t, e) => m(e, t.id),
      function (t) {
        Mi[t ? "unshift" : "push"](() => {
          (r = t), n(3, r);
        });
      },
    ]
  );
}
class Ps extends rr {
  constructor(t) {
    super(), ir(this, t, Ts, Rs, Lo, { class: 0, name: 7, selected: 8, tabs: 9, layout: 1 });
  }
}
const Es = (t) => ({ panel: 16 & t }),
  As = (t) => ({ panel: t[4][0].id, panelIsActive: !0 });
function Is(t, e, n) {
  const o = t.slice();
  return (
    (o[14] = e[n].id),
    (o[15] = e[n].draw),
    (o[16] = e[n].panelId),
    (o[17] = e[n].tabindex),
    (o[18] = e[n].labelledBy),
    (o[19] = e[n].hidden),
    (o[3] = e[n].visible),
    o
  );
}
const Ls = (t) => ({ panel: 16 & t, panelIsActive: 16 & t }),
  Fs = (t) => ({ panel: t[14], panelIsActive: !t[19] });
function Bs(t) {
  let e, n, o, i, r, a;
  const s = t[11].default,
    l = Do(s, t, t[10], As);
  return {
    c() {
      (e = Qo("div")),
        (n = Qo("div")),
        l && l.c(),
        ai(n, "class", (o = vs([t[1]]))),
        ai(e, "class", t[0]),
        ai(e, "style", t[2]);
    },
    m(o, s) {
      qo(o, e, s),
        Zo(e, n),
        l && l.m(n, null),
        (i = !0),
        r || ((a = [oi(e, "measure", t[13]), Uo(Ha.call(null, e))]), (r = !0));
    },
    p(t, r) {
      l && l.p && 1040 & r && _o(l, s, t, t[10], r, Es, As),
        (!i || (2 & r && o !== (o = vs([t[1]])))) && ai(n, "class", o),
        (!i || 1 & r) && ai(e, "class", t[0]),
        (!i || 4 & r) && ai(e, "style", t[2]);
    },
    i(t) {
      i || (Ni(l, t), (i = !0));
    },
    o(t) {
      Hi(l, t), (i = !1);
    },
    d(t) {
      t && Ko(e), l && l.d(t), (r = !1), Ao(a);
    },
  };
}
function zs(t) {
  let e,
    n,
    o,
    i,
    r,
    a = [],
    s = new Map(),
    l = t[4];
  const c = (t) => t[14];
  for (let e = 0; e < l.length; e += 1) {
    let n = Is(t, l, e),
      o = c(n);
    s.set(o, (a[e] = Os(o, n)));
  }
  return {
    c() {
      e = Qo("div");
      for (let t = 0; t < a.length; t += 1) a[t].c();
      ai(e, "class", (n = vs(["PinturaTabPanels", t[0]]))), ai(e, "style", t[2]);
    },
    m(n, s) {
      qo(n, e, s);
      for (let t = 0; t < a.length; t += 1) a[t].m(e, null);
      (o = !0), i || ((r = [oi(e, "measure", t[12]), Uo(Ha.call(null, e))]), (i = !0));
    },
    p(t, i) {
      1042 & i && ((l = t[4]), Vi(), (a = qi(a, i, c, 1, t, l, s, e, Zi, Os, null, Is)), Ui()),
        (!o || (1 & i && n !== (n = vs(["PinturaTabPanels", t[0]])))) && ai(e, "class", n),
        (!o || 4 & i) && ai(e, "style", t[2]);
    },
    i(t) {
      if (!o) {
        for (let t = 0; t < l.length; t += 1) Ni(a[t]);
        o = !0;
      }
    },
    o(t) {
      for (let t = 0; t < a.length; t += 1) Hi(a[t]);
      o = !1;
    },
    d(t) {
      t && Ko(e);
      for (let t = 0; t < a.length; t += 1) a[t].d();
      (i = !1), Ao(r);
    },
  };
}
function Ds(t) {
  let e;
  const n = t[11].default,
    o = Do(n, t, t[10], Fs);
  return {
    c() {
      o && o.c();
    },
    m(t, n) {
      o && o.m(t, n), (e = !0);
    },
    p(t, e) {
      o && o.p && 1040 & e && _o(o, n, t, t[10], e, Ls, Fs);
    },
    i(t) {
      e || (Ni(o, t), (e = !0));
    },
    o(t) {
      Hi(o, t), (e = !1);
    },
    d(t) {
      o && o.d(t);
    },
  };
}
function Os(t, e) {
  let n,
    o,
    i,
    r,
    a,
    s,
    l,
    c,
    u,
    d = e[15] && Ds(e);
  return {
    key: t,
    first: null,
    c() {
      (n = Qo("div")),
        d && d.c(),
        (o = ei()),
        ai(n, "class", (i = vs(["PinturaTabPanel", e[1]]))),
        (n.hidden = r = e[19]),
        ai(n, "id", (a = e[16])),
        ai(n, "tabindex", (s = e[17])),
        ai(n, "aria-labelledby", (l = e[18])),
        ai(n, "data-inert", (c = !e[3])),
        (this.first = n);
    },
    m(t, e) {
      qo(t, n, e), d && d.m(n, null), Zo(n, o), (u = !0);
    },
    p(t, p) {
      (e = t)[15]
        ? d
          ? (d.p(e, p), 16 & p && Ni(d, 1))
          : ((d = Ds(e)), d.c(), Ni(d, 1), d.m(n, o))
        : d &&
          (Vi(),
          Hi(d, 1, 1, () => {
            d = null;
          }),
          Ui()),
        (!u || (2 & p && i !== (i = vs(["PinturaTabPanel", e[1]])))) && ai(n, "class", i),
        (!u || (16 & p && r !== (r = e[19]))) && (n.hidden = r),
        (!u || (16 & p && a !== (a = e[16]))) && ai(n, "id", a),
        (!u || (16 & p && s !== (s = e[17]))) && ai(n, "tabindex", s),
        (!u || (16 & p && l !== (l = e[18]))) && ai(n, "aria-labelledby", l),
        (!u || (16 & p && c !== (c = !e[3]))) && ai(n, "data-inert", c);
    },
    i(t) {
      u || (Ni(d), (u = !0));
    },
    o(t) {
      Hi(d), (u = !1);
    },
    d(t) {
      t && Ko(n), d && d.d();
    },
  };
}
function _s(t) {
  let e, n, o, i;
  const r = [zs, Bs],
    a = [];
  function s(t, e) {
    return t[5] ? 0 : 1;
  }
  return (
    (e = s(t)),
    (n = a[e] = r[e](t)),
    {
      c() {
        n.c(), (o = ni());
      },
      m(t, n) {
        a[e].m(t, n), qo(t, o, n), (i = !0);
      },
      p(t, [i]) {
        let l = e;
        (e = s(t)),
          e === l
            ? a[e].p(t, i)
            : (Vi(),
              Hi(a[l], 1, 1, () => {
                a[l] = null;
              }),
              Ui(),
              (n = a[e]),
              n ? n.p(t, i) : ((n = a[e] = r[e](t)), n.c()),
              Ni(n, 1),
              n.m(o.parentNode, o));
      },
      i(t) {
        i || (Ni(n), (i = !0));
      },
      o(t) {
        Hi(n), (i = !1);
      },
      d(t) {
        a[e].d(t), t && Ko(o);
      },
    }
  );
}
function Ws(t, e, n) {
  let o,
    i,
    { $$slots: r = {}, $$scope: a } = e,
    { class: s } = e,
    { name: l } = e,
    { selected: c } = e,
    { visible: u } = e,
    { panelClass: d } = e,
    { panels: p = [] } = e,
    { style: h } = e;
  const g = {};
  return (
    (t.$$set = (t) => {
      "class" in t && n(0, (s = t.class)),
        "name" in t && n(6, (l = t.name)),
        "selected" in t && n(7, (c = t.selected)),
        "visible" in t && n(3, (u = t.visible)),
        "panelClass" in t && n(1, (d = t.panelClass)),
        "panels" in t && n(8, (p = t.panels)),
        "style" in t && n(2, (h = t.style)),
        "$$scope" in t && n(10, (a = t.$$scope));
    }),
    (t.$$.update = () => {
      968 & t.$$.dirty &&
        n(
          4,
          (o = p.map((t) => {
            const e = t === c,
              o = !u || -1 !== u.indexOf(t);
            return (
              e && n(9, (g[t] = !0), g),
              {
                id: t,
                panelId: `panel-${l}-${t}`,
                labelledBy: `tab-${l}-${t}`,
                hidden: !e,
                visible: o,
                tabindex: e ? 0 : -1,
                draw: e || g[t],
              }
            );
          }))
        ),
        16 & t.$$.dirty && n(5, (i = o.length > 1));
    }),
    [
      s,
      d,
      h,
      u,
      o,
      i,
      l,
      c,
      p,
      g,
      a,
      r,
      function (e) {
        ki(t, e);
      },
      function (e) {
        ki(t, e);
      },
    ]
  );
}
class Vs extends rr {
  constructor(t) {
    super(),
      ir(this, t, Ws, _s, Lo, {
        class: 0,
        name: 6,
        selected: 7,
        visible: 3,
        panelClass: 1,
        panels: 8,
        style: 2,
      });
  }
}
function Us(t) {
  let e, n, o, i, r;
  const a = [t[6]];
  function s(e) {
    t[19](e);
  }
  var l = t[10];
  function c(t) {
    let e = {};
    for (let t = 0; t < a.length; t += 1) e = To(e, a[t]);
    return void 0 !== t[4] && (e.name = t[4]), { props: e };
  }
  return (
    l && ((n = new l(c(t))), Mi.push(() => Ji(n, "name", s)), t[20](n), n.$on("measure", t[21])),
    {
      c() {
        (e = Qo("div")),
          n && tr(n.$$.fragment),
          ai(e, "data-util", t[4]),
          ai(e, "class", (i = vs(["PinturaPanel", t[1]]))),
          ai(e, "style", t[5]);
      },
      m(t, o) {
        qo(t, e, o), n && er(n, e, null), (r = !0);
      },
      p(t, [u]) {
        const d = 64 & u ? Ki(a, [Qi(t[6])]) : {};
        if ((!o && 16 & u && ((o = !0), (d.name = t[4]), Ii(() => (o = !1))), l !== (l = t[10]))) {
          if (n) {
            Vi();
            const t = n;
            Hi(t.$$.fragment, 1, 0, () => {
              nr(t, 1);
            }),
              Ui();
          }
          l
            ? ((n = new l(c(t))),
              Mi.push(() => Ji(n, "name", s)),
              t[20](n),
              n.$on("measure", t[21]),
              tr(n.$$.fragment),
              Ni(n.$$.fragment, 1),
              er(n, e, null))
            : (n = null);
        } else l && n.$set(d);
        (!r || 16 & u) && ai(e, "data-util", t[4]),
          (!r || (2 & u && i !== (i = vs(["PinturaPanel", t[1]])))) && ai(e, "class", i),
          (!r || 32 & u) && ai(e, "style", t[5]);
      },
      i(t) {
        r || (n && Ni(n.$$.fragment, t), (r = !0));
      },
      o(t) {
        n && Hi(n.$$.fragment, t), (r = !1);
      },
      d(o) {
        o && Ko(e), t[20](null), n && nr(n);
      },
    }
  );
}
function Ns(t, e, n) {
  let o, i, r, a;
  const s = vi();
  let l,
    { isActive: c = !0 } = e,
    { isAnimated: u = !0 } = e,
    { stores: d } = e,
    { content: p } = e,
    { component: h } = e,
    { locale: g } = e,
    { class: m } = e;
  const f = La(0),
    $ = cr(f, (t) => Tr(t, 0, 1));
  zo(t, $, (t) => n(18, (r = t)));
  let y = !c;
  const x = lr(c);
  zo(t, x, (t) => n(22, (a = t)));
  const b = {
      isActive: cr(x, (t) => t),
      isActiveFraction: cr($, (t) => t),
      isVisible: cr($, (t) => t > 0),
    },
    v = p.view,
    w = Ra(v),
    S = Object.keys(p.props || {}).reduce(
      (t, e) => (w.includes(e) ? ((t[e] = p.props[e]), t) : t),
      {}
    ),
    k = Object.keys(b).reduce((t, e) => (w.includes(e) ? ((t[e] = b[e]), t) : t), {});
  let C,
    M = !1;
  yi(() => {
    n(3, (M = !0));
  });
  return (
    (t.$$set = (t) => {
      "isActive" in t && n(11, (c = t.isActive)),
        "isAnimated" in t && n(12, (u = t.isAnimated)),
        "stores" in t && n(13, (d = t.stores)),
        "content" in t && n(14, (p = t.content)),
        "component" in t && n(0, (h = t.component)),
        "locale" in t && n(15, (g = t.locale)),
        "class" in t && n(1, (m = t.class));
    }),
    (t.$$.update = () => {
      2053 & t.$$.dirty && l && c && h && s("measure", l),
        6144 & t.$$.dirty && f.set(c ? 1 : 0, { hard: !u }),
        393216 & t.$$.dirty && (r <= 0 && !y ? n(17, (y = !0)) : r > 0 && y && n(17, (y = !1))),
        131080 & t.$$.dirty && M && s(y ? "hide" : "show"),
        262144 & t.$$.dirty && s("fade", r),
        262144 & t.$$.dirty && n(5, (o = r < 1 ? "opacity: " + r : void 0)),
        2048 & t.$$.dirty && Vo(x, (a = c), a),
        40960 & t.$$.dirty && n(6, (i = { ...S, ...k, stores: d, locale: g }));
    }),
    [
      h,
      m,
      l,
      M,
      C,
      o,
      i,
      s,
      $,
      x,
      v,
      c,
      u,
      d,
      p,
      g,
      f,
      y,
      r,
      function (t) {
        (C = t), n(4, C);
      },
      function (t) {
        Mi[t ? "unshift" : "push"](() => {
          (h = t), n(0, h);
        });
      },
      (t) => {
        M && (n(2, (l = t.detail)), s("measure", { ...l }));
      },
    ]
  );
}
class Hs extends rr {
  constructor(t) {
    super(),
      ir(this, t, Ns, Us, Lo, {
        isActive: 11,
        isAnimated: 12,
        stores: 13,
        content: 14,
        component: 0,
        locale: 15,
        class: 1,
        opacity: 16,
      });
  }
  get opacity() {
    return this.$$.ctx[16];
  }
}
function Xs(t) {
  let e, n, o;
  const i = t[5].default,
    r = Do(i, t, t[4], null);
  return {
    c() {
      (e = Jo("svg")),
        r && r.c(),
        ai(e, "class", t[3]),
        ai(e, "style", t[2]),
        ai(e, "width", t[0]),
        ai(e, "height", t[1]),
        ai(e, "viewBox", (n = "0 0 " + t[0] + "\n    " + t[1])),
        ai(e, "xmlns", "http://www.w3.org/2000/svg"),
        ai(e, "aria-hidden", "true"),
        ai(e, "focusable", "false"),
        ai(e, "stroke-linecap", "round"),
        ai(e, "stroke-linejoin", "round");
    },
    m(t, n) {
      qo(t, e, n), r && r.m(e, null), (o = !0);
    },
    p(t, [a]) {
      r && r.p && 16 & a && _o(r, i, t, t[4], a, null, null),
        (!o || 8 & a) && ai(e, "class", t[3]),
        (!o || 4 & a) && ai(e, "style", t[2]),
        (!o || 1 & a) && ai(e, "width", t[0]),
        (!o || 2 & a) && ai(e, "height", t[1]),
        (!o || (3 & a && n !== (n = "0 0 " + t[0] + "\n    " + t[1]))) && ai(e, "viewBox", n);
    },
    i(t) {
      o || (Ni(r, t), (o = !0));
    },
    o(t) {
      Hi(r, t), (o = !1);
    },
    d(t) {
      t && Ko(e), r && r.d(t);
    },
  };
}
function js(t, e, n) {
  let { $$slots: o = {}, $$scope: i } = e,
    { width: r = 24 } = e,
    { height: a = 24 } = e,
    { style: s } = e,
    { class: l } = e;
  return (
    (t.$$set = (t) => {
      "width" in t && n(0, (r = t.width)),
        "height" in t && n(1, (a = t.height)),
        "style" in t && n(2, (s = t.style)),
        "class" in t && n(3, (l = t.class)),
        "$$scope" in t && n(4, (i = t.$$scope));
    }),
    [r, a, s, l, i, o]
  );
}
class Ys extends rr {
  constructor(t) {
    super(), ir(this, t, js, Xs, Lo, { width: 0, height: 1, style: 2, class: 3 });
  }
}
var Gs = (t, e) => e === t.target || e.contains(t.target);
function Zs(t) {
  let e, n;
  return (
    (e = new Ys({
      props: { class: "PinturaButtonIcon", $$slots: { default: [qs] }, $$scope: { ctx: t } },
    })),
    {
      c() {
        tr(e.$$.fragment);
      },
      m(t, o) {
        er(e, t, o), (n = !0);
      },
      p(t, n) {
        const o = {};
        1048578 & n && (o.$$scope = { dirty: n, ctx: t }), e.$set(o);
      },
      i(t) {
        n || (Ni(e.$$.fragment, t), (n = !0));
      },
      o(t) {
        Hi(e.$$.fragment, t), (n = !1);
      },
      d(t) {
        nr(e, t);
      },
    }
  );
}
function qs(t) {
  let e;
  return {
    c() {
      e = Jo("g");
    },
    m(n, o) {
      qo(n, e, o), (e.innerHTML = t[1]);
    },
    p(t, n) {
      2 & n && (e.innerHTML = t[1]);
    },
    d(t) {
      t && Ko(e);
    },
  };
}
function Ks(t) {
  let e, n;
  return {
    c() {
      (e = Qo("span")), (n = ti(t[0])), ai(e, "class", t[11]);
    },
    m(t, o) {
      qo(t, e, o), Zo(e, n);
    },
    p(t, o) {
      1 & o && li(n, t[0]), 2048 & o && ai(e, "class", t[11]);
    },
    d(t) {
      t && Ko(e);
    },
  };
}
function Qs(t) {
  let e, n, o, i;
  const r = t[18].default,
    a = Do(r, t, t[20], null),
    s =
      a ||
      (function (t) {
        let e,
          n,
          o,
          i = t[1] && Zs(t),
          r = t[0] && Ks(t);
        return {
          c() {
            (e = Qo("span")), i && i.c(), (n = ei()), r && r.c(), ai(e, "class", t[9]);
          },
          m(t, a) {
            qo(t, e, a), i && i.m(e, null), Zo(e, n), r && r.m(e, null), (o = !0);
          },
          p(t, a) {
            t[1]
              ? i
                ? (i.p(t, a), 2 & a && Ni(i, 1))
                : ((i = Zs(t)), i.c(), Ni(i, 1), i.m(e, n))
              : i &&
                (Vi(),
                Hi(i, 1, 1, () => {
                  i = null;
                }),
                Ui()),
              t[0]
                ? r
                  ? r.p(t, a)
                  : ((r = Ks(t)), r.c(), r.m(e, null))
                : r && (r.d(1), (r = null)),
              (!o || 512 & a) && ai(e, "class", t[9]);
          },
          i(t) {
            o || (Ni(i), (o = !0));
          },
          o(t) {
            Hi(i), (o = !1);
          },
          d(t) {
            t && Ko(e), i && i.d(), r && r.d();
          },
        };
      })(t);
  return {
    c() {
      (e = Qo("button")),
        s && s.c(),
        ai(e, "type", t[4]),
        ai(e, "style", t[2]),
        (e.disabled = t[3]),
        ai(e, "class", t[10]),
        ai(e, "title", t[0]);
    },
    m(r, a) {
      qo(r, e, a),
        s && s.m(e, null),
        t[19](e),
        (n = !0),
        o ||
          ((i = [
            oi(e, "keydown", function () {
              Io(t[6]) && t[6].apply(this, arguments);
            }),
            oi(e, "click", function () {
              Io(t[5]) && t[5].apply(this, arguments);
            }),
            Uo(t[7].call(null, e)),
          ]),
          (o = !0));
    },
    p(o, [i]) {
      (t = o),
        a
          ? a.p && 1048576 & i && _o(a, r, t, t[20], i, null, null)
          : s && s.p && 2563 & i && s.p(t, i),
        (!n || 16 & i) && ai(e, "type", t[4]),
        (!n || 4 & i) && ai(e, "style", t[2]),
        (!n || 8 & i) && (e.disabled = t[3]),
        (!n || 1024 & i) && ai(e, "class", t[10]),
        (!n || 1 & i) && ai(e, "title", t[0]);
    },
    i(t) {
      n || (Ni(s, t), (n = !0));
    },
    o(t) {
      Hi(s, t), (n = !1);
    },
    d(n) {
      n && Ko(e), s && s.d(n), t[19](null), (o = !1), Ao(i);
    },
  };
}
function Js(t, e, n) {
  let o,
    i,
    r,
    a,
    { $$slots: s = {}, $$scope: l } = e,
    { class: c } = e,
    { label: u } = e,
    { labelClass: d } = e,
    { innerClass: p } = e,
    { hideLabel: h = !1 } = e,
    { icon: g } = e,
    { style: m } = e,
    { disabled: f } = e,
    { type: $ = "button" } = e,
    { onclick: y } = e,
    { onkeydown: x } = e,
    { action: b = () => {} } = e;
  return (
    (t.$$set = (t) => {
      "class" in t && n(12, (c = t.class)),
        "label" in t && n(0, (u = t.label)),
        "labelClass" in t && n(13, (d = t.labelClass)),
        "innerClass" in t && n(14, (p = t.innerClass)),
        "hideLabel" in t && n(15, (h = t.hideLabel)),
        "icon" in t && n(1, (g = t.icon)),
        "style" in t && n(2, (m = t.style)),
        "disabled" in t && n(3, (f = t.disabled)),
        "type" in t && n(4, ($ = t.type)),
        "onclick" in t && n(5, (y = t.onclick)),
        "onkeydown" in t && n(6, (x = t.onkeydown)),
        "action" in t && n(7, (b = t.action)),
        "$$scope" in t && n(20, (l = t.$$scope));
    }),
    (t.$$.update = () => {
      16384 & t.$$.dirty && n(9, (o = vs(["PinturaButtonInner", p]))),
        36864 & t.$$.dirty && n(10, (i = vs(["PinturaButton", h && "PinturaButtonIconOnly", c]))),
        40960 & t.$$.dirty && n(11, (r = vs([h ? "implicit" : "PinturaButtonLabel", d])));
    }),
    [
      u,
      g,
      m,
      f,
      $,
      y,
      x,
      b,
      a,
      o,
      i,
      r,
      c,
      d,
      p,
      h,
      (t) => Gs(t, a),
      () => a,
      s,
      function (t) {
        Mi[t ? "unshift" : "push"](() => {
          (a = t), n(8, a);
        });
      },
      l,
    ]
  );
}
class tl extends rr {
  constructor(t) {
    super(),
      ir(this, t, Js, Qs, Lo, {
        class: 12,
        label: 0,
        labelClass: 13,
        innerClass: 14,
        hideLabel: 15,
        icon: 1,
        style: 2,
        disabled: 3,
        type: 4,
        onclick: 5,
        onkeydown: 6,
        action: 7,
        isEventTarget: 16,
        getElement: 17,
      });
  }
  get isEventTarget() {
    return this.$$.ctx[16];
  }
  get getElement() {
    return this.$$.ctx[17];
  }
}
var el = (t, e) => {
  const n = t.findIndex(e);
  if (n >= 0) return t.splice(n, 1);
};
const nl = (t, e) => (e - t) / t;
var ol = (t, e = {}) => {
    const {
      inertia: n = !1,
      matchTarget: o = !1,
      pinch: i = !1,
      getEventPosition: r = (t) => X(t.clientX, t.clientY),
    } = e;
    function a(e, n) {
      t.dispatchEvent(new CustomEvent(e, { detail: n }));
    }
    function s() {
      m && m(), (m = void 0);
    }
    const l = [],
      c = (t) => {
        (t.origin.x = t.position.x),
          (t.origin.y = t.position.y),
          (t.translation.x = 0),
          (t.translation.y = 0);
      },
      u = (t) => {
        const e = ((t) => l.findIndex((e) => e.event.pointerId === t.pointerId))(t);
        if (!(e < 0)) return l[e];
      },
      d = () => 1 === l.length,
      p = () => 2 === l.length,
      h = (t) => {
        const e = at(t.map((t) => t.position));
        return {
          center: e,
          distance: ((t, e) => t.reduce((t, n) => t + rt(e, n.position), 0) / t.length)(t, e),
          velocity: at(t.map((t) => t.velocity)),
          translation: at(t.map((t) => t.translation)),
        };
      };
    let g,
      m,
      f,
      $,
      y,
      x,
      b = 0,
      v = void 0;
    function w(e) {
      p() ||
        ((t) => Ue(t.button) && 0 !== t.button)(e) ||
        (o && e.target !== t) ||
        (s(),
        ((t) => {
          const e = {
            timeStamp: t.timeStamp,
            timeStampInitial: t.timeStamp,
            position: r(t),
            origin: r(t),
            velocity: H(),
            translation: H(),
            interactionState: void 0,
            event: t,
          };
          l.push(e), (e.interactionState = h(l));
        })(e),
        d()
          ? (document.documentElement.addEventListener("pointermove", k),
            document.documentElement.addEventListener("pointerup", C),
            document.documentElement.addEventListener("pointercancel", C),
            (x = !1),
            (y = 0),
            ($ = H()),
            (f = void 0),
            a("interactionstart", { origin: Y(u(e).origin) }))
          : i &&
            ((x = !0),
            (f = rt(l[0].position, l[1].position)),
            ($.x += l[0].translation.x),
            ($.y += l[0].translation.y),
            c(l[0])));
    }
    t.addEventListener("pointerdown", w);
    let S = Date.now();
    function k(t) {
      t.preventDefault(),
        ((t) => {
          const e = u(t);
          if (!e) return;
          const { timeStamp: n } = t,
            o = r(t),
            i = Math.max(1, n - e.timeStamp);
          (e.velocity.x = (o.x - e.position.x) / i),
            (e.velocity.y = (o.y - e.position.y) / i),
            (e.translation.x = o.x - e.origin.x),
            (e.translation.y = o.y - e.origin.y),
            (e.timeStamp = n),
            (e.position.x = o.x),
            (e.position.y = o.y),
            (e.event = t);
        })(t);
      let e = y,
        n = Y(l[0].translation);
      if (i && p()) {
        (n.x += l[1].translation.x), (n.y += l[1].translation.y);
        const t = rt(l[0].position, l[1].position);
        e += nl(f, t);
      }
      (n.x += $.x), (n.y += $.y);
      const o = Date.now();
      o - S < 16 || ((S = o), a("interactionupdate", { translation: n, scalar: i ? e : void 0 }));
    }
    function C(t) {
      const e = ((t) => {
        const e = el(l, (e) => e.event.pointerId === t.pointerId);
        if (e) return e[0];
      })(t);
      if (i && d()) {
        const t = rt(l[0].position, e.position);
        (y = (y || 0) + nl(f, t)),
          ($.x += l[0].translation.x + e.translation.x),
          ($.y += l[0].translation.y + e.translation.y),
          c(l[0]);
      }
      let o = !1,
        r = !1;
      if (!x && e) {
        const t = performance.now(),
          n = t - e.timeStampInitial,
          i = it(e.translation);
        (o = i < 64 && n < 300),
          (r = !!(v && o && t - b < 700 && it(v, e.position) < 128)),
          o && ((v = Y(e.position)), (b = t));
      }
      if (l.length > 0) return;
      document.documentElement.removeEventListener("pointermove", k),
        document.documentElement.removeEventListener("pointerup", C),
        document.documentElement.removeEventListener("pointercancel", C);
      const s = Y(e.translation),
        u = Y(e.velocity);
      let p = !1;
      a("interactionrelease", {
        isTap: o,
        isDoubleTap: r,
        translation: s,
        scalar: y,
        preventInertia: () => (p = !0),
      });
      const h = rt(u);
      if (p || !n || h < 0.25) return R(s, { isTap: o, isDoubleTap: r });
      (g = Aa(Y(s), { easing: Ta, duration: 80 * h })),
        g.set({ x: s.x + 50 * u.x, y: s.y + 50 * u.y }).then(() => {
          m && R(Bo(g), { isTap: o, isDoubleTap: r });
        }),
        (m = g.subscribe(M));
    }
    function M(t) {
      t && a("interactionupdate", { translation: t, scalar: i ? y : void 0 });
    }
    function R(t, e) {
      s(), a("interactionend", { ...e, translation: t, scalar: i ? y : void 0 });
    }
    return {
      destroy() {
        s(), t.removeEventListener("pointerdown", w);
      },
    };
  },
  il = (t, e = {}) => {
    const {
        direction: n,
        shiftMultiplier: o = 10,
        bubbles: i = !1,
        stopKeydownPropagation: r = !0,
      } = e,
      a = "horizontal" === n,
      s = "vertical" === n,
      l = (e) => {
        const { key: n } = e,
          l = e.shiftKey,
          c = /up|down/i.test(n),
          u = /left|right/i.test(n);
        if (!c && !u) return;
        if (a && u) return;
        if (s && c) return;
        const d = l ? o : 1;
        r && e.stopPropagation(),
          t.dispatchEvent(
            new CustomEvent("nudge", {
              bubbles: i,
              detail: X(
                (/left/i.test(n) ? -1 : /right/i.test(n) ? 1 : 0) * d,
                (/up/i.test(n) ? -1 : /down/i.test(n) ? 1 : 0) * d
              ),
            })
          );
      };
    return (
      t.addEventListener("keydown", l),
      {
        destroy() {
          t.removeEventListener("keydown", l);
        },
      }
    );
  };
function rl(t, e) {
  return e * Math.sign(t) * Math.log10(1 + Math.abs(t) / e);
}
const al = (t, e, n) => {
  if (!e) return Mt(t);
  const o = t.x + rl(e.x - t.x, n),
    i = t.x + t.width + rl(e.x + e.width - (t.x + t.width), n),
    r = t.y + rl(e.y - t.y, n);
  return {
    x: o,
    y: r,
    width: i - o,
    height: t.y + t.height + rl(e.y + e.height - (t.y + t.height), n) - r,
  };
};
var sl = (t, e) => {
    if (t) return /em/.test(t) ? 16 * parseInt(t, 10) : /px/.test(t) ? parseInt(t, 10) : void 0;
  },
  ll = (t) => {
    let e = t.detail || 0;
    const { deltaX: n, deltaY: o, wheelDelta: i, wheelDeltaX: r, wheelDeltaY: a } = t;
    return (
      Ue(r) && Math.abs(r) > Math.abs(a)
        ? (e = r / -120)
        : Ue(n) && Math.abs(n) > Math.abs(o)
        ? (e = n / 20)
        : (i || a) && (e = (i || a) / -120),
      e || (e = o / 20),
      e
    );
  };
function cl(t) {
  let e, n, o, i, r, a, s;
  const l = t[37].default,
    c = Do(l, t, t[36], null);
  return {
    c() {
      (e = Qo("div")),
        (n = Qo("div")),
        c && c.c(),
        ai(n, "style", t[6]),
        ai(e, "class", (o = vs(["PinturaScrollable", t[0]]))),
        ai(e, "style", t[4]),
        ai(e, "data-direction", t[1]),
        ai(e, "data-state", t[5]);
    },
    m(o, l) {
      qo(o, e, l),
        Zo(e, n),
        c && c.m(n, null),
        t[39](e),
        (r = !0),
        a ||
          ((s = [
            oi(n, "interactionstart", t[9]),
            oi(n, "interactionupdate", t[11]),
            oi(n, "interactionend", t[12]),
            oi(n, "interactionrelease", t[10]),
            Uo(ol.call(null, n, { inertia: !0 })),
            oi(n, "measure", t[38]),
            Uo(Ha.call(null, n)),
            oi(e, "wheel", t[14], { passive: !1 }),
            oi(e, "scroll", t[16]),
            oi(e, "focusin", t[15]),
            oi(e, "nudge", t[17]),
            oi(e, "measure", t[13]),
            Uo(Ha.call(null, e, { observePosition: !0 })),
            Uo(
              (i = il.call(null, e, {
                direction: "x" === t[1] ? "horizontal" : "vertical",
                stopKeydownPropagation: !1,
              }))
            ),
          ]),
          (a = !0));
    },
    p(t, a) {
      c && c.p && 32 & a[1] && _o(c, l, t, t[36], a, null, null),
        (!r || 64 & a[0]) && ai(n, "style", t[6]),
        (!r || (1 & a[0] && o !== (o = vs(["PinturaScrollable", t[0]])))) && ai(e, "class", o),
        (!r || 16 & a[0]) && ai(e, "style", t[4]),
        (!r || 2 & a[0]) && ai(e, "data-direction", t[1]),
        (!r || 32 & a[0]) && ai(e, "data-state", t[5]),
        i &&
          Io(i.update) &&
          2 & a[0] &&
          i.update.call(null, {
            direction: "x" === t[1] ? "horizontal" : "vertical",
            stopKeydownPropagation: !1,
          });
    },
    i(t) {
      r || (Ni(c, t), (r = !0));
    },
    o(t) {
      Hi(c, t), (r = !1);
    },
    d(n) {
      n && Ko(e), c && c.d(n), t[39](null), (a = !1), Ao(s);
    },
  };
}
function ul(t, e, o) {
  let i,
    r,
    a,
    s,
    l,
    c,
    u,
    d,
    p,
    { $$slots: h = {}, $$scope: g } = e;
  const m = vi(),
    f = Si("keysPressed");
  zo(t, f, (t) => o(46, (p = t)));
  let $,
    y,
    x,
    b,
    v = "idle",
    w = La(0);
  zo(t, w, (t) => o(34, (d = t)));
  let S,
    { class: k } = e,
    { scrollBlockInteractionDist: C = 5 } = e,
    { scrollStep: M = 10 } = e,
    { scrollFocusMargin: R = 64 } = e,
    { scrollDirection: T = "x" } = e,
    { scrollAutoCancel: P = !1 } = e,
    { elasticity: E = 0 } = e,
    { onscroll: A = n } = e,
    { maskFeatherSize: I } = e,
    { maskFeatherStartOpacity: L } = e,
    { maskFeatherEndOpacity: F } = e,
    { scroll: B } = e,
    z = "",
    D = !0;
  w.subscribe((t) => {
    const e = H();
    (e[T] = t), A(e);
  });
  const O = (t) => Math.max(Math.min(0, t), x[i] - y[i]);
  let _, W, V;
  const U = (t, e = {}) => {
    const { elastic: n = !1, animate: i = !1 } = e;
    Math.abs(t) > C && "idle" === v && !b && o(28, (v = "scrolling"));
    const r = O(t),
      a = n && E && !b ? r + rl(t - r, E) : r;
    let s = !0;
    i ? (s = !1) : D || (s = !b),
      (D = !1),
      w.set(a, { hard: s }).then((t) => {
        b && (D = !0);
      });
  };
  return (
    (t.$$set = (t) => {
      "class" in t && o(0, (k = t.class)),
        "scrollBlockInteractionDist" in t && o(21, (C = t.scrollBlockInteractionDist)),
        "scrollStep" in t && o(22, (M = t.scrollStep)),
        "scrollFocusMargin" in t && o(23, (R = t.scrollFocusMargin)),
        "scrollDirection" in t && o(1, (T = t.scrollDirection)),
        "scrollAutoCancel" in t && o(24, (P = t.scrollAutoCancel)),
        "elasticity" in t && o(25, (E = t.elasticity)),
        "onscroll" in t && o(26, (A = t.onscroll)),
        "maskFeatherSize" in t && o(20, (I = t.maskFeatherSize)),
        "maskFeatherStartOpacity" in t && o(18, (L = t.maskFeatherStartOpacity)),
        "maskFeatherEndOpacity" in t && o(19, (F = t.maskFeatherEndOpacity)),
        "scroll" in t && o(27, (B = t.scroll)),
        "$$scope" in t && o(36, (g = t.$$scope));
    }),
    (t.$$.update = () => {
      if (
        (2 & t.$$.dirty[0] && o(30, (i = "x" === T ? "width" : "height")),
        2 & t.$$.dirty[0] && o(31, (r = T.toUpperCase())),
        8 & t.$$.dirty[0] && o(32, (a = S && getComputedStyle(S))),
        (8 & t.$$.dirty[0]) | (2 & t.$$.dirty[1]) &&
          o(33, (s = a && sl(a.getPropertyValue("--scrollable-feather-size")))),
        (1611399172 & t.$$.dirty[0]) | (12 & t.$$.dirty[1]) && null != d && x && null != s && y)
      ) {
        const t = -d / s,
          e = -(x[i] - y[i] - d) / s;
        o(18, (L = Tr(1 - t, 0, 1))),
          o(19, (F = Tr(1 - e, 0, 1))),
          o(20, (I = s)),
          o(
            4,
            (z = `--scrollable-feather-start-opacity: ${L};--scrollable-feather-end-opacity: ${F}`)
          );
      }
      134217736 & t.$$.dirty[0] && S && void 0 !== B && (Ue(B) ? U(B) : U(B.scrollOffset, B)),
        1610612740 & t.$$.dirty[0] && o(35, (l = x && y ? y[i] > x[i] : void 0)),
        (268435456 & t.$$.dirty[0]) | (16 & t.$$.dirty[1]) &&
          o(5, (c = vs([v, l ? "overflows" : void 0]))),
        25 & t.$$.dirty[1] && o(6, (u = l ? `transform: translate${r}(${d}px)` : void 0));
    }),
    [
      k,
      T,
      y,
      S,
      z,
      c,
      u,
      f,
      w,
      () => {
        l && ((W = !1), (_ = !0), (V = X(0, 0)), (b = !1), o(28, (v = "idle")), ($ = Bo(w)));
      },
      ({ detail: t }) => {
        l && ((b = !0), o(28, (v = "idle")));
      },
      ({ detail: t }) => {
        l &&
          (W ||
            (_ && ((_ = !1), it(t.translation) < 0.1)) ||
            (!P ||
            "x" !== T ||
            ((t) => {
              const e = J(X(t.x - V.x, t.y - V.y), Math.abs);
              V = Y(t);
              const n = it(e),
                o = e.x - e.y;
              return !(n > 1 && o < -0.5);
            })(t.translation)
              ? U($ + t.translation[T], { elastic: !0 })
              : (W = !0)));
      },
      ({ detail: t }) => {
        if (!l) return;
        if (W) return;
        const e = $ + t.translation[T],
          n = O(e);
        (D = !1),
          w.set(n).then((t) => {
            b && (D = !0);
          });
      },
      ({ detail: t }) => {
        o(29, (x = t)), m("measure", { x: t.x, y: t.y, width: t.width, height: t.height });
      },
      (t) => {
        if (!l) return;
        t.preventDefault(), t.stopPropagation();
        const e = ll(t),
          n = Bo(w);
        U(n + e * M, { animate: !0 });
      },
      (t) => {
        if (!l) return;
        if (!b && !p.length) return;
        let e = t.target;
        t.target.classList.contains("implicit") && (e = e.parentNode);
        const n = e["x" === T ? "offsetLeft" : "offsetTop"],
          o = n + e["x" === T ? "offsetWidth" : "offsetHeight"],
          r = Bo(w),
          a = R + I;
        r + n < a ? U(-n + a) : r + o > x[i] - a && U(x[i] - o - a, { animate: !0 });
      },
      () => {
        o(3, (S["x" === T ? "scrollLeft" : "scrollTop"] = 0), S);
      },
      ({ detail: t }) => {
        const e = -2 * t[T],
          n = Bo(w);
        U(n + e * M, { animate: !0 });
      },
      L,
      F,
      I,
      C,
      M,
      R,
      P,
      E,
      A,
      B,
      v,
      x,
      i,
      r,
      a,
      s,
      d,
      l,
      g,
      h,
      (t) => o(2, (y = t.detail)),
      function (t) {
        Mi[t ? "unshift" : "push"](() => {
          (S = t), o(3, S);
        });
      },
    ]
  );
}
class dl extends rr {
  constructor(t) {
    super(),
      ir(
        this,
        t,
        ul,
        cl,
        Lo,
        {
          class: 0,
          scrollBlockInteractionDist: 21,
          scrollStep: 22,
          scrollFocusMargin: 23,
          scrollDirection: 1,
          scrollAutoCancel: 24,
          elasticity: 25,
          onscroll: 26,
          maskFeatherSize: 20,
          maskFeatherStartOpacity: 18,
          maskFeatherEndOpacity: 19,
          scroll: 27,
        },
        [-1, -1]
      );
  }
}
function pl(t, { delay: e = 0, duration: n = 400, easing: o = Ro } = {}) {
  const i = +getComputedStyle(t).opacity;
  return { delay: e, duration: n, easing: o, css: (t) => "opacity: " + t * i };
}
function hl(t) {
  let e, n, o, i, r, a;
  return {
    c() {
      (e = Qo("span")), (n = ti(t[0])), ai(e, "class", "PinturaStatusMessage");
    },
    m(o, s) {
      qo(o, e, s),
        Zo(e, n),
        (i = !0),
        r ||
          ((a = [
            oi(e, "measure", function () {
              Io(t[1]) && t[1].apply(this, arguments);
            }),
            Uo(Ha.call(null, e)),
          ]),
          (r = !0));
    },
    p(e, [o]) {
      (t = e), (!i || 1 & o) && li(n, t[0]);
    },
    i(t) {
      i ||
        (Ai(() => {
          o || (o = ji(e, pl, {}, !0)), o.run(1);
        }),
        (i = !0));
    },
    o(t) {
      o || (o = ji(e, pl, {}, !1)), o.run(0), (i = !1);
    },
    d(t) {
      t && Ko(e), t && o && o.end(), (r = !1), Ao(a);
    },
  };
}
function gl(t, e, o) {
  let { text: i } = e,
    { onmeasure: r = n } = e;
  return (
    (t.$$set = (t) => {
      "text" in t && o(0, (i = t.text)), "onmeasure" in t && o(1, (r = t.onmeasure));
    }),
    [i, r]
  );
}
class ml extends rr {
  constructor(t) {
    super(), ir(this, t, gl, hl, Lo, { text: 0, onmeasure: 1 });
  }
}
function fl(t) {
  let e, n, o, i, r, a, s, l;
  return {
    c() {
      (e = Qo("span")),
        (n = Jo("svg")),
        (o = Jo("g")),
        (i = Jo("circle")),
        (r = Jo("circle")),
        (a = ei()),
        (s = Qo("span")),
        (l = ti(t[0])),
        ai(i, "class", "PinturaProgressIndicatorBar"),
        ai(i, "r", "8.5"),
        ai(i, "cx", "10"),
        ai(i, "cy", "10"),
        ai(i, "stroke-linecap", "round"),
        ai(i, "opacity", ".25"),
        ai(r, "class", "PinturaProgressIndicatorFill"),
        ai(r, "r", "8.5"),
        ai(r, "stroke-dasharray", t[1]),
        ai(r, "cx", "10"),
        ai(r, "cy", "10"),
        ai(r, "transform", "rotate(-90) translate(-20)"),
        ai(o, "fill", "none"),
        ai(o, "stroke", "currentColor"),
        ai(o, "stroke-width", "2.5"),
        ai(o, "stroke-linecap", "round"),
        ai(o, "opacity", t[2]),
        ai(n, "width", "20"),
        ai(n, "height", "20"),
        ai(n, "viewBox", "0 0 20 20"),
        ai(n, "xmlns", "http://www.w3.org/2000/svg"),
        ai(n, "aria-hidden", "true"),
        ai(n, "focusable", "false"),
        ai(s, "class", "implicit"),
        ai(e, "class", "PinturaProgressIndicator"),
        ai(e, "data-status", t[3]);
    },
    m(t, c) {
      qo(t, e, c), Zo(e, n), Zo(n, o), Zo(o, i), Zo(o, r), Zo(e, a), Zo(e, s), Zo(s, l);
    },
    p(t, [n]) {
      2 & n && ai(r, "stroke-dasharray", t[1]),
        4 & n && ai(o, "opacity", t[2]),
        1 & n && li(l, t[0]),
        8 & n && ai(e, "data-status", t[3]);
    },
    i: Mo,
    o: Mo,
    d(t) {
      t && Ko(e);
    },
  };
}
function $l(t, e, n) {
  let o, i, r, a, s;
  const l = vi();
  let { progress: c } = e,
    { min: u = 0 } = e,
    { max: d = 100 } = e,
    { labelBusy: p = "Busy" } = e;
  const h = La(0, { precision: 0.01 }),
    g = cr([h], (t) => Tr(t, u, d));
  return (
    zo(t, g, (t) => n(9, (s = t))),
    g.subscribe((t) => {
      1 === c && Math.round(t) >= 100 && l("complete");
    }),
    (t.$$set = (t) => {
      "progress" in t && n(5, (c = t.progress)),
        "min" in t && n(6, (u = t.min)),
        "max" in t && n(7, (d = t.max)),
        "labelBusy" in t && n(8, (p = t.labelBusy));
    }),
    (t.$$.update = () => {
      32 & t.$$.dirty && c && c !== 1 / 0 && h.set(100 * c),
        800 & t.$$.dirty && n(0, (o = c === 1 / 0 ? p : Math.round(s) + "%")),
        544 & t.$$.dirty && n(1, (i = c === 1 / 0 ? "26.5 53" : (s / 100) * 53 + " 53")),
        544 & t.$$.dirty && n(2, (r = Math.min(1, c === 1 / 0 ? 1 : s / 10))),
        32 & t.$$.dirty && n(3, (a = c === 1 / 0 ? "busy" : "loading"));
    }),
    [o, i, r, a, g, c, u, d, p, s]
  );
}
class yl extends rr {
  constructor(t) {
    super(), ir(this, t, $l, fl, Lo, { progress: 5, min: 6, max: 7, labelBusy: 8 });
  }
}
function xl(t) {
  let e, n, o;
  return (
    (n = new yl({ props: { progress: t[0] } })),
    n.$on("complete", function () {
      Io(t[1]) && t[1].apply(this, arguments);
    }),
    {
      c() {
        (e = Qo("span")),
          tr(n.$$.fragment),
          ai(e, "class", "PinturaStatusProgress"),
          ai(e, "style", t[2]);
      },
      m(t, i) {
        qo(t, e, i), er(n, e, null), (o = !0);
      },
      p(i, [r]) {
        t = i;
        const a = {};
        1 & r && (a.progress = t[0]), n.$set(a), (!o || 4 & r) && ai(e, "style", t[2]);
      },
      i(t) {
        o || (Ni(n.$$.fragment, t), (o = !0));
      },
      o(t) {
        Hi(n.$$.fragment, t), (o = !1);
      },
      d(t) {
        t && Ko(e), nr(n);
      },
    }
  );
}
function bl(t, e, o) {
  let i,
    { offset: r = 0 } = e,
    { visible: a = !0 } = e,
    { progress: s } = e,
    { oncomplete: l = n } = e;
  return (
    (t.$$set = (t) => {
      "offset" in t && o(3, (r = t.offset)),
        "visible" in t && o(4, (a = t.visible)),
        "progress" in t && o(0, (s = t.progress)),
        "oncomplete" in t && o(1, (l = t.oncomplete));
    }),
    (t.$$.update = () => {
      24 & t.$$.dirty && o(2, (i = `transform: translateX(${r}px); opacity: ${a ? 1 : 0}`));
    }),
    [s, l, i, r, a]
  );
}
class vl extends rr {
  constructor(t) {
    super(), ir(this, t, bl, xl, Lo, { offset: 3, visible: 4, progress: 0, oncomplete: 1 });
  }
}
var wl = () => (l() && window.devicePixelRatio) || 1;
let Sl = null;
var kl = (t) => (null === Sl && (Sl = 1 === wl() ? (t) => Math.round(t) : (t) => t), Sl(t));
const Cl = (t) => ({}),
  Ml = (t) => ({}),
  Rl = (t) => ({}),
  Tl = (t) => ({});
function Pl(t) {
  let e;
  const n = t[30].label,
    o = Do(n, t, t[34], Tl);
  return {
    c() {
      o && o.c();
    },
    m(t, n) {
      o && o.m(t, n), (e = !0);
    },
    p(t, e) {
      o && o.p && 8 & e[1] && _o(o, n, t, t[34], e, Rl, Tl);
    },
    i(t) {
      e || (Ni(o, t), (e = !0));
    },
    o(t) {
      Hi(o, t), (e = !1);
    },
    d(t) {
      o && o.d(t);
    },
  };
}
function El(t) {
  let e, n, o, i, r;
  const a = t[30].details,
    s = Do(a, t, t[34], Ml);
  return {
    c() {
      (e = Qo("div")),
        s && s.c(),
        ai(e, "class", (n = vs(["PinturaDetailsPanel", t[1]]))),
        ai(e, "tabindex", "-1"),
        ai(e, "style", t[6]);
    },
    m(n, a) {
      qo(n, e, a),
        s && s.m(e, null),
        t[32](e),
        (o = !0),
        i ||
          ((r = [oi(e, "keydown", t[16]), oi(e, "measure", t[33]), Uo(Ha.call(null, e))]),
          (i = !0));
    },
    p(t, i) {
      s && s.p && 8 & i[1] && _o(s, a, t, t[34], i, Cl, Ml),
        (!o || (2 & i[0] && n !== (n = vs(["PinturaDetailsPanel", t[1]])))) && ai(e, "class", n),
        (!o || 64 & i[0]) && ai(e, "style", t[6]);
    },
    i(t) {
      o || (Ni(s, t), (o = !0));
    },
    o(t) {
      Hi(s, t), (o = !1);
    },
    d(n) {
      n && Ko(e), s && s.d(n), t[32](null), (i = !1), Ao(r);
    },
  };
}
function Al(t) {
  let e,
    n,
    o,
    i,
    r,
    a,
    s,
    l,
    c = {
      class: vs(["PinturaDetailsButton", t[0]]),
      onkeydown: t[15],
      onclick: t[14],
      $$slots: { default: [Pl] },
      $$scope: { ctx: t },
    };
  (n = new tl({ props: c })), t[31](n);
  let u = t[5] && El(t);
  return {
    c() {
      (e = ei()), tr(n.$$.fragment), (o = ei()), u && u.c(), (i = ei()), (r = ni());
    },
    m(c, d) {
      qo(c, e, d),
        er(n, c, d),
        qo(c, o, d),
        u && u.m(c, d),
        qo(c, i, d),
        qo(c, r, d),
        (a = !0),
        s ||
          ((l = [
            oi(document.body, "pointerdown", function () {
              Io(t[7]) && t[7].apply(this, arguments);
            }),
            oi(document.body, "pointerup", function () {
              Io(t[8]) && t[8].apply(this, arguments);
            }),
          ]),
          (s = !0));
    },
    p(e, o) {
      t = e;
      const r = {};
      1 & o[0] && (r.class = vs(["PinturaDetailsButton", t[0]])),
        8 & o[1] && (r.$$scope = { dirty: o, ctx: t }),
        n.$set(r),
        t[5]
          ? u
            ? (u.p(t, o), 32 & o[0] && Ni(u, 1))
            : ((u = El(t)), u.c(), Ni(u, 1), u.m(i.parentNode, i))
          : u &&
            (Vi(),
            Hi(u, 1, 1, () => {
              u = null;
            }),
            Ui());
    },
    i(t) {
      a || (Ni(n.$$.fragment, t), Ni(u), Ni(false), (a = !0));
    },
    o(t) {
      Hi(n.$$.fragment, t), Hi(u), Hi(false), (a = !1);
    },
    d(a) {
      a && Ko(e),
        t[31](null),
        nr(n, a),
        a && Ko(o),
        u && u.d(a),
        a && Ko(i),
        a && Ko(r),
        (s = !1),
        Ao(l);
    },
  };
}
function Il(t, e, n) {
  let o,
    i,
    r,
    a,
    s,
    l,
    c,
    u,
    d,
    p,
    h,
    g,
    { $$slots: m = {}, $$scope: f } = e,
    { buttonClass: $ } = e,
    { panelClass: y } = e,
    { isActive: x = !1 } = e,
    { onshow: b = ({ panel: t }) => t.focus() } = e;
  const v = Si("rootPortal");
  zo(t, v, (t) => n(29, (g = t)));
  const w = Si("rootRect");
  let S, k, C;
  zo(t, w, (t) => n(23, (u = t)));
  let M = H(),
    R = La(0);
  zo(t, R, (t) => n(25, (p = t)));
  const T = lr({ x: 0, y: 0 });
  zo(t, T, (t) => n(24, (d = t)));
  const P = La(-5);
  zo(t, P, (t) => n(28, (h = t)));
  const E = (t) => Gs(t, g) || k.isEventTarget(t);
  let A,
    I,
    L = !1;
  bi(() => {
    g && A && g.removeChild(A);
  });
  return (
    (t.$$set = (t) => {
      "buttonClass" in t && n(0, ($ = t.buttonClass)),
        "panelClass" in t && n(1, (y = t.panelClass)),
        "isActive" in t && n(17, (x = t.isActive)),
        "onshow" in t && n(18, (b = t.onshow)),
        "$$scope" in t && n(34, (f = t.$$scope));
    }),
    (t.$$.update = () => {
      if (
        (8 & t.$$.dirty[0] && (o = k && k.getElement()),
        2228224 & t.$$.dirty[0] &&
          n(
            8,
            (c = x
              ? (t) => {
                  L && (n(21, (L = !1)), E(t) || n(17, (x = !1)));
                }
              : void 0)
          ),
        131072 & t.$$.dirty[0] && R.set(x ? 1 : 0),
        131072 & t.$$.dirty[0] && P.set(x ? 0 : -5),
        8912900 & t.$$.dirty[0] && u && S && C)
      ) {
        let t = C.x - u.x + 0.5 * C.width - 0.5 * S.width,
          e = C.y - u.y + C.height;
        const o = 12,
          i = 12,
          r = u.width - 12,
          a = u.height - 12,
          s = t,
          l = e,
          c = s + S.width,
          p = l + S.height;
        if ((s < o && (t = o), c > r && (t = r - S.width), p > a)) {
          n(20, (M.y = -1), M);
          e -= i < e - S.height - C.height ? S.height + C.height : p - a;
        } else n(20, (M.y = 1), M);
        Vo(T, (d = J(X(t, e), kl)), d);
      }
      33554432 & t.$$.dirty[0] && n(5, (i = p > 0)),
        33554432 & t.$$.dirty[0] && n(26, (r = p < 1)),
        286261248 & t.$$.dirty[0] &&
          n(27, (a = `translateX(${d.x + 12 * M.x}px) translateY(${d.y + 12 * M.y + M.y * h}px)`)),
        234881024 & t.$$.dirty[0] &&
          n(
            6,
            (s = r
              ? `opacity: ${p}; pointer-events: ${p < 1 ? "none" : "all"}; transform: ${a};`
              : "transform: " + a)
          ),
        131072 & t.$$.dirty[0] &&
          n(
            7,
            (l = x
              ? (t) => {
                  E(t) || n(21, (L = !0));
                }
              : void 0)
          ),
        536870960 & t.$$.dirty[0] && i && g && A && A.parentNode !== g && g.appendChild(A),
        131072 & t.$$.dirty[0] && (x || n(22, (I = void 0))),
        4456496 & t.$$.dirty[0] && i && A && b({ e: I, panel: A });
    }),
    [
      $,
      y,
      S,
      k,
      A,
      i,
      s,
      l,
      c,
      v,
      w,
      R,
      T,
      P,
      (t) => {
        x || n(19, (C = o.getBoundingClientRect())), n(22, (I = t)), n(17, (x = !x));
      },
      (t) => {
        /down/i.test(t.key) && (n(17, (x = !0)), n(22, (I = t)));
      },
      (t) => {
        /esc/i.test(t.key) && (n(17, (x = !1)), o.focus());
      },
      x,
      b,
      C,
      M,
      L,
      I,
      u,
      d,
      p,
      r,
      a,
      h,
      g,
      m,
      function (t) {
        Mi[t ? "unshift" : "push"](() => {
          (k = t), n(3, k);
        });
      },
      function (t) {
        Mi[t ? "unshift" : "push"](() => {
          (A = t), n(4, A);
        });
      },
      (t) => n(2, (S = dt(t.detail))),
      f,
    ]
  );
}
class Ll extends rr {
  constructor(t) {
    super(),
      ir(
        this,
        t,
        Il,
        Al,
        Lo,
        { buttonClass: 0, panelClass: 1, isActive: 17, onshow: 18 },
        [-1, -1]
      );
  }
}
function Fl(t) {
  let e, n, o, i, r, a, s, l;
  const c = t[14].default,
    u = Do(c, t, t[13], null);
  return {
    c() {
      (e = Qo("li")),
        (n = Qo("input")),
        (o = ei()),
        (i = Qo("label")),
        u && u.c(),
        ai(n, "type", "radio"),
        ai(n, "class", "implicit"),
        ai(n, "id", t[6]),
        ai(n, "name", t[0]),
        (n.value = t[3]),
        (n.disabled = t[5]),
        (n.checked = t[4]),
        ai(i, "for", t[6]),
        ai(i, "title", t[2]),
        ai(e, "class", (r = vs(["PinturaRadioGroupOption", t[1]]))),
        ai(e, "data-disabled", t[5]),
        ai(e, "data-selected", t[4]);
    },
    m(r, c) {
      qo(r, e, c),
        Zo(e, n),
        Zo(e, o),
        Zo(e, i),
        u && u.m(i, null),
        (a = !0),
        s ||
          ((l = [oi(n, "change", ri(t[15])), oi(n, "keydown", t[8]), oi(n, "click", t[9])]),
          (s = !0));
    },
    p(t, [o]) {
      (!a || 64 & o) && ai(n, "id", t[6]),
        (!a || 1 & o) && ai(n, "name", t[0]),
        (!a || 8 & o) && (n.value = t[3]),
        (!a || 32 & o) && (n.disabled = t[5]),
        (!a || 16 & o) && (n.checked = t[4]),
        u && u.p && 8192 & o && _o(u, c, t, t[13], o, null, null),
        (!a || 64 & o) && ai(i, "for", t[6]),
        (!a || 4 & o) && ai(i, "title", t[2]),
        (!a || (2 & o && r !== (r = vs(["PinturaRadioGroupOption", t[1]])))) && ai(e, "class", r),
        (!a || 32 & o) && ai(e, "data-disabled", t[5]),
        (!a || 16 & o) && ai(e, "data-selected", t[4]);
    },
    i(t) {
      a || (Ni(u, t), (a = !0));
    },
    o(t) {
      Hi(u, t), (a = !1);
    },
    d(t) {
      t && Ko(e), u && u.d(t), (s = !1), Ao(l);
    },
  };
}
function Bl(t, e, n) {
  let o,
    i,
    { $$slots: r = {}, $$scope: a } = e,
    { name: s } = e,
    { class: l } = e,
    { label: c } = e,
    { id: u } = e,
    { value: d } = e,
    { checked: p } = e,
    { onkeydown: h } = e,
    { onclick: g } = e,
    { disabled: m = !1 } = e;
  const f = Si("keysPressed");
  zo(t, f, (t) => n(16, (i = t)));
  return (
    (t.$$set = (t) => {
      "name" in t && n(0, (s = t.name)),
        "class" in t && n(1, (l = t.class)),
        "label" in t && n(2, (c = t.label)),
        "id" in t && n(10, (u = t.id)),
        "value" in t && n(3, (d = t.value)),
        "checked" in t && n(4, (p = t.checked)),
        "onkeydown" in t && n(11, (h = t.onkeydown)),
        "onclick" in t && n(12, (g = t.onclick)),
        "disabled" in t && n(5, (m = t.disabled)),
        "$$scope" in t && n(13, (a = t.$$scope));
    }),
    (t.$$.update = () => {
      1025 & t.$$.dirty && n(6, (o = `${s}-${u}`));
    }),
    [
      s,
      l,
      c,
      d,
      p,
      m,
      o,
      f,
      (t) => {
        h(t);
      },
      (t) => {
        i.length || g(t);
      },
      u,
      h,
      g,
      a,
      r,
      function (e) {
        ki(t, e);
      },
    ]
  );
}
class zl extends rr {
  constructor(t) {
    super(),
      ir(this, t, Bl, Fl, Lo, {
        name: 0,
        class: 1,
        label: 2,
        id: 10,
        value: 3,
        checked: 4,
        onkeydown: 11,
        onclick: 12,
        disabled: 5,
      });
  }
}
var Dl = (t = []) =>
  t.reduce(
    (t, e) =>
      (je(e) ? je(e[1]) : !!e.options) ? t.concat(je(e) ? e[1] : e.options) : (t.push(e), t),
    []
  );
const Ol = (t, e, n) => {
  let o;
  return (
    je(t)
      ? (o = { id: e, value: t[0], label: t[1], ...(t[2] || {}) })
      : ((o = t), (o.id = null != o.id ? o.id : e)),
    n ? n(o) : o
  );
};
var _l = (t, e, n) => (Xe(t) ? t(e, n) : t);
const Wl = (t, e) =>
  t.map(([t, n, o]) => {
    if (je(n)) return [_l(t, e), Wl(n, e)];
    {
      const i = [t, _l(n, e)];
      if (o) {
        let t = { ...o };
        o.icon && (t.icon = _l(o.icon, e)), i.push(t);
      }
      return i;
    }
  });
var Vl = (t, e) => Wl(t, e);
function Ul(t, e, n) {
  const o = t.slice();
  return (o[27] = e[n]), o;
}
const Nl = (t) => ({ option: 2048 & t[0] }),
  Hl = (t) => ({ option: t[27] });
function Xl(t, e, n) {
  const o = t.slice();
  return (o[27] = e[n]), o;
}
const jl = (t) => ({ option: 2048 & t[0] }),
  Yl = (t) => ({ option: t[27] }),
  Gl = (t) => ({ option: 2048 & t[0] }),
  Zl = (t) => ({ option: t[27] });
function ql(t) {
  let e,
    n,
    o,
    i,
    r,
    a = [],
    s = new Map(),
    l = t[1] && Kl(t),
    c = t[11];
  const u = (t) => t[27].id;
  for (let e = 0; e < c.length; e += 1) {
    let n = Ul(t, c, e),
      o = u(n);
    s.set(o, (a[e] = cc(o, n)));
  }
  return {
    c() {
      (e = Qo("fieldset")), l && l.c(), (n = ei()), (o = Qo("ul"));
      for (let t = 0; t < a.length; t += 1) a[t].c();
      ai(o, "class", "PinturaRadioGroupOptions"),
        ai(e, "class", (i = vs(["PinturaRadioGroup", t[3]]))),
        ai(e, "data-layout", t[5]),
        ai(e, "title", t[7]);
    },
    m(t, i) {
      qo(t, e, i), l && l.m(e, null), Zo(e, n), Zo(e, o);
      for (let t = 0; t < a.length; t += 1) a[t].m(o, null);
      r = !0;
    },
    p(t, d) {
      t[1] ? (l ? l.p(t, d) : ((l = Kl(t)), l.c(), l.m(e, n))) : l && (l.d(1), (l = null)),
        8420177 & d[0] &&
          ((c = t[11]), Vi(), (a = qi(a, d, u, 1, t, c, s, o, Zi, cc, null, Ul)), Ui()),
        (!r || (8 & d[0] && i !== (i = vs(["PinturaRadioGroup", t[3]])))) && ai(e, "class", i),
        (!r || 32 & d[0]) && ai(e, "data-layout", t[5]),
        (!r || 128 & d[0]) && ai(e, "title", t[7]);
    },
    i(t) {
      if (!r) {
        for (let t = 0; t < c.length; t += 1) Ni(a[t]);
        r = !0;
      }
    },
    o(t) {
      for (let t = 0; t < a.length; t += 1) Hi(a[t]);
      r = !1;
    },
    d(t) {
      t && Ko(e), l && l.d();
      for (let t = 0; t < a.length; t += 1) a[t].d();
    },
  };
}
function Kl(t) {
  let e, n, o;
  return {
    c() {
      (e = Qo("legend")), (n = ti(t[1])), ai(e, "class", (o = t[2] && "implicit"));
    },
    m(t, o) {
      qo(t, e, o), Zo(e, n);
    },
    p(t, i) {
      2 & i[0] && li(n, t[1]), 4 & i[0] && o !== (o = t[2] && "implicit") && ai(e, "class", o);
    },
    d(t) {
      t && Ko(e);
    },
  };
}
function Ql(t) {
  let e, n;
  return (
    (e = new zl({
      props: {
        name: t[4],
        label: t[27].label,
        id: t[27].id,
        value: t[27].value,
        disabled: t[27].disabled,
        class: t[8],
        checked: t[12](t[27]) === t[0],
        onkeydown: t[13](t[27]),
        onclick: t[14](t[27]),
        $$slots: { default: [oc] },
        $$scope: { ctx: t },
      },
    })),
    {
      c() {
        tr(e.$$.fragment);
      },
      m(t, o) {
        er(e, t, o), (n = !0);
      },
      p(t, n) {
        const o = {};
        16 & n[0] && (o.name = t[4]),
          2048 & n[0] && (o.label = t[27].label),
          2048 & n[0] && (o.id = t[27].id),
          2048 & n[0] && (o.value = t[27].value),
          2048 & n[0] && (o.disabled = t[27].disabled),
          256 & n[0] && (o.class = t[8]),
          2049 & n[0] && (o.checked = t[12](t[27]) === t[0]),
          2048 & n[0] && (o.onkeydown = t[13](t[27])),
          2048 & n[0] && (o.onclick = t[14](t[27])),
          8390720 & n[0] && (o.$$scope = { dirty: n, ctx: t }),
          e.$set(o);
      },
      i(t) {
        n || (Ni(e.$$.fragment, t), (n = !0));
      },
      o(t) {
        Hi(e.$$.fragment, t), (n = !1);
      },
      d(t) {
        nr(e, t);
      },
    }
  );
}
function Jl(t) {
  let e,
    n,
    o,
    i,
    r,
    a,
    s = [],
    l = new Map();
  const c = t[22].group,
    u = Do(c, t, t[23], Zl),
    d =
      u ||
      (function (t) {
        let e,
          n,
          o = t[27].label + "";
        return {
          c() {
            (e = Qo("span")), (n = ti(o)), ai(e, "class", "PinturaRadioGroupOptionGroupLabel");
          },
          m(t, o) {
            qo(t, e, o), Zo(e, n);
          },
          p(t, e) {
            2048 & e[0] && o !== (o = t[27].label + "") && li(n, o);
          },
          d(t) {
            t && Ko(e);
          },
        };
      })(t);
  let p = t[27].options;
  const h = (t) => t[27].id;
  for (let e = 0; e < p.length; e += 1) {
    let n = Xl(t, p, e),
      o = h(n);
    l.set(o, (s[e] = lc(o, n)));
  }
  return {
    c() {
      (e = Qo("li")), d && d.c(), (n = ei()), (o = Qo("ul"));
      for (let t = 0; t < s.length; t += 1) s[t].c();
      (i = ei()),
        ai(o, "class", "PinturaRadioGroupOptions"),
        ai(e, "class", (r = vs(["PinturaRadioGroupOptionGroup", t[9]])));
    },
    m(t, r) {
      qo(t, e, r), d && d.m(e, null), Zo(e, n), Zo(e, o);
      for (let t = 0; t < s.length; t += 1) s[t].m(o, null);
      Zo(e, i), (a = !0);
    },
    p(t, n) {
      u
        ? u.p && 8390656 & n[0] && _o(u, c, t, t[23], n, Gl, Zl)
        : d && d.p && 2048 & n[0] && d.p(t, n),
        8419665 & n[0] &&
          ((p = t[27].options), Vi(), (s = qi(s, n, h, 1, t, p, l, o, Zi, lc, null, Xl)), Ui()),
        (!a || (512 & n[0] && r !== (r = vs(["PinturaRadioGroupOptionGroup", t[9]])))) &&
          ai(e, "class", r);
    },
    i(t) {
      if (!a) {
        Ni(d, t);
        for (let t = 0; t < p.length; t += 1) Ni(s[t]);
        a = !0;
      }
    },
    o(t) {
      Hi(d, t);
      for (let t = 0; t < s.length; t += 1) Hi(s[t]);
      a = !1;
    },
    d(t) {
      t && Ko(e), d && d.d(t);
      for (let t = 0; t < s.length; t += 1) s[t].d();
    },
  };
}
function tc(t) {
  let e, n;
  return (
    (e = new Ys({ props: { $$slots: { default: [ec] }, $$scope: { ctx: t } } })),
    {
      c() {
        tr(e.$$.fragment);
      },
      m(t, o) {
        er(e, t, o), (n = !0);
      },
      p(t, n) {
        const o = {};
        8390656 & n[0] && (o.$$scope = { dirty: n, ctx: t }), e.$set(o);
      },
      i(t) {
        n || (Ni(e.$$.fragment, t), (n = !0));
      },
      o(t) {
        Hi(e.$$.fragment, t), (n = !1);
      },
      d(t) {
        nr(e, t);
      },
    }
  );
}
function ec(t) {
  let e,
    n = t[27].icon + "";
  return {
    c() {
      e = Jo("g");
    },
    m(t, o) {
      qo(t, e, o), (e.innerHTML = n);
    },
    p(t, o) {
      2048 & o[0] && n !== (n = t[27].icon + "") && (e.innerHTML = n);
    },
    d(t) {
      t && Ko(e);
    },
  };
}
function nc(t) {
  let e,
    n,
    o = t[27].label + "";
  return {
    c() {
      (e = Qo("span")), (n = ti(o)), ai(e, "class", t[6]);
    },
    m(t, o) {
      qo(t, e, o), Zo(e, n);
    },
    p(t, i) {
      2048 & i[0] && o !== (o = t[27].label + "") && li(n, o), 64 & i[0] && ai(e, "class", t[6]);
    },
    d(t) {
      t && Ko(e);
    },
  };
}
function oc(t) {
  let e;
  const n = t[22].option,
    o = Do(n, t, t[23], Hl),
    i =
      o ||
      (function (t) {
        let e,
          n,
          o,
          i = t[27].icon && tc(t),
          r = !t[27].hideLabel && nc(t);
        return {
          c() {
            i && i.c(), (e = ei()), r && r.c(), (n = ei());
          },
          m(t, a) {
            i && i.m(t, a), qo(t, e, a), r && r.m(t, a), qo(t, n, a), (o = !0);
          },
          p(t, o) {
            t[27].icon
              ? i
                ? (i.p(t, o), 2048 & o[0] && Ni(i, 1))
                : ((i = tc(t)), i.c(), Ni(i, 1), i.m(e.parentNode, e))
              : i &&
                (Vi(),
                Hi(i, 1, 1, () => {
                  i = null;
                }),
                Ui()),
              t[27].hideLabel
                ? r && (r.d(1), (r = null))
                : r
                ? r.p(t, o)
                : ((r = nc(t)), r.c(), r.m(n.parentNode, n));
          },
          i(t) {
            o || (Ni(i), (o = !0));
          },
          o(t) {
            Hi(i), (o = !1);
          },
          d(t) {
            i && i.d(t), t && Ko(e), r && r.d(t), t && Ko(n);
          },
        };
      })(t);
  return {
    c() {
      i && i.c();
    },
    m(t, n) {
      i && i.m(t, n), (e = !0);
    },
    p(t, e) {
      o
        ? o.p && 8390656 & e[0] && _o(o, n, t, t[23], e, Nl, Hl)
        : i && i.p && 2112 & e[0] && i.p(t, e);
    },
    i(t) {
      e || (Ni(i, t), (e = !0));
    },
    o(t) {
      Hi(i, t), (e = !1);
    },
    d(t) {
      i && i.d(t);
    },
  };
}
function ic(t) {
  let e, n;
  return (
    (e = new Ys({ props: { $$slots: { default: [rc] }, $$scope: { ctx: t } } })),
    {
      c() {
        tr(e.$$.fragment);
      },
      m(t, o) {
        er(e, t, o), (n = !0);
      },
      p(t, n) {
        const o = {};
        8390656 & n[0] && (o.$$scope = { dirty: n, ctx: t }), e.$set(o);
      },
      i(t) {
        n || (Ni(e.$$.fragment, t), (n = !0));
      },
      o(t) {
        Hi(e.$$.fragment, t), (n = !1);
      },
      d(t) {
        nr(e, t);
      },
    }
  );
}
function rc(t) {
  let e,
    n = t[27].icon + "";
  return {
    c() {
      e = Jo("g");
    },
    m(t, o) {
      qo(t, e, o), (e.innerHTML = n);
    },
    p(t, o) {
      2048 & o[0] && n !== (n = t[27].icon + "") && (e.innerHTML = n);
    },
    d(t) {
      t && Ko(e);
    },
  };
}
function ac(t) {
  let e,
    n,
    o = t[27].label + "";
  return {
    c() {
      (e = Qo("span")), (n = ti(o)), ai(e, "class", t[6]);
    },
    m(t, o) {
      qo(t, e, o), Zo(e, n);
    },
    p(t, i) {
      2048 & i[0] && o !== (o = t[27].label + "") && li(n, o), 64 & i[0] && ai(e, "class", t[6]);
    },
    d(t) {
      t && Ko(e);
    },
  };
}
function sc(t) {
  let e;
  const n = t[22].option,
    o = Do(n, t, t[23], Yl),
    i =
      o ||
      (function (t) {
        let e,
          n,
          o,
          i = t[27].icon && ic(t),
          r = !t[27].hideLabel && ac(t);
        return {
          c() {
            i && i.c(), (e = ei()), r && r.c(), (n = ei());
          },
          m(t, a) {
            i && i.m(t, a), qo(t, e, a), r && r.m(t, a), qo(t, n, a), (o = !0);
          },
          p(t, o) {
            t[27].icon
              ? i
                ? (i.p(t, o), 2048 & o[0] && Ni(i, 1))
                : ((i = ic(t)), i.c(), Ni(i, 1), i.m(e.parentNode, e))
              : i &&
                (Vi(),
                Hi(i, 1, 1, () => {
                  i = null;
                }),
                Ui()),
              t[27].hideLabel
                ? r && (r.d(1), (r = null))
                : r
                ? r.p(t, o)
                : ((r = ac(t)), r.c(), r.m(n.parentNode, n));
          },
          i(t) {
            o || (Ni(i), (o = !0));
          },
          o(t) {
            Hi(i), (o = !1);
          },
          d(t) {
            i && i.d(t), t && Ko(e), r && r.d(t), t && Ko(n);
          },
        };
      })(t);
  return {
    c() {
      i && i.c();
    },
    m(t, n) {
      i && i.m(t, n), (e = !0);
    },
    p(t, e) {
      o
        ? o.p && 8390656 & e[0] && _o(o, n, t, t[23], e, jl, Yl)
        : i && i.p && 2112 & e[0] && i.p(t, e);
    },
    i(t) {
      e || (Ni(i, t), (e = !0));
    },
    o(t) {
      Hi(i, t), (e = !1);
    },
    d(t) {
      i && i.d(t);
    },
  };
}
function lc(t, e) {
  let n, o, i;
  return (
    (o = new zl({
      props: {
        name: e[4],
        label: e[27].label,
        id: e[27].id,
        value: e[27].value,
        disabled: e[27].disabled,
        class: e[8],
        checked: e[12](e[27]) === e[0],
        onkeydown: e[13](e[27]),
        onclick: e[14](e[27]),
        $$slots: { default: [sc] },
        $$scope: { ctx: e },
      },
    })),
    {
      key: t,
      first: null,
      c() {
        (n = ni()), tr(o.$$.fragment), (this.first = n);
      },
      m(t, e) {
        qo(t, n, e), er(o, t, e), (i = !0);
      },
      p(t, n) {
        e = t;
        const i = {};
        16 & n[0] && (i.name = e[4]),
          2048 & n[0] && (i.label = e[27].label),
          2048 & n[0] && (i.id = e[27].id),
          2048 & n[0] && (i.value = e[27].value),
          2048 & n[0] && (i.disabled = e[27].disabled),
          256 & n[0] && (i.class = e[8]),
          2049 & n[0] && (i.checked = e[12](e[27]) === e[0]),
          2048 & n[0] && (i.onkeydown = e[13](e[27])),
          2048 & n[0] && (i.onclick = e[14](e[27])),
          8390720 & n[0] && (i.$$scope = { dirty: n, ctx: e }),
          o.$set(i);
      },
      i(t) {
        i || (Ni(o.$$.fragment, t), (i = !0));
      },
      o(t) {
        Hi(o.$$.fragment, t), (i = !1);
      },
      d(t) {
        t && Ko(n), nr(o, t);
      },
    }
  );
}
function cc(t, e) {
  let n, o, i, r, a;
  const s = [Jl, Ql],
    l = [];
  function c(t, e) {
    return t[27].options ? 0 : 1;
  }
  return (
    (o = c(e)),
    (i = l[o] = s[o](e)),
    {
      key: t,
      first: null,
      c() {
        (n = ni()), i.c(), (r = ni()), (this.first = n);
      },
      m(t, e) {
        qo(t, n, e), l[o].m(t, e), qo(t, r, e), (a = !0);
      },
      p(t, n) {
        let a = o;
        (o = c((e = t))),
          o === a
            ? l[o].p(e, n)
            : (Vi(),
              Hi(l[a], 1, 1, () => {
                l[a] = null;
              }),
              Ui(),
              (i = l[o]),
              i ? i.p(e, n) : ((i = l[o] = s[o](e)), i.c()),
              Ni(i, 1),
              i.m(r.parentNode, r));
      },
      i(t) {
        a || (Ni(i), (a = !0));
      },
      o(t) {
        Hi(i), (a = !1);
      },
      d(t) {
        t && Ko(n), l[o].d(t), t && Ko(r);
      },
    }
  );
}
function uc(t) {
  let e,
    n,
    o,
    i = t[10].length && ql(t);
  return {
    c() {
      i && i.c(), (e = ei()), (n = ni());
    },
    m(t, r) {
      i && i.m(t, r), qo(t, e, r), qo(t, n, r), (o = !0);
    },
    p(t, n) {
      t[10].length
        ? i
          ? (i.p(t, n), 1024 & n[0] && Ni(i, 1))
          : ((i = ql(t)), i.c(), Ni(i, 1), i.m(e.parentNode, e))
        : i &&
          (Vi(),
          Hi(i, 1, 1, () => {
            i = null;
          }),
          Ui());
    },
    i(t) {
      o || (Ni(i), Ni(false), (o = !0));
    },
    o(t) {
      Hi(i), Hi(false), (o = !1);
    },
    d(t) {
      i && i.d(t), t && Ko(e), t && Ko(n);
    },
  };
}
function dc(t, e, n) {
  let o,
    i,
    r,
    { $$slots: a = {}, $$scope: s } = e;
  const l = vi();
  let { label: c } = e,
    { hideLabel: u = !0 } = e,
    { class: d } = e,
    { name: p = "radio-group-" + C() } = e,
    { selectedIndex: h = -1 } = e,
    { options: g = [] } = e,
    { onchange: m } = e,
    { layout: f } = e,
    { optionMapper: $ } = e,
    { optionFilter: y } = e,
    { value: x } = e,
    { optionLabelClass: b } = e,
    { title: v } = e,
    { locale: w } = e,
    { optionClass: S } = e,
    { optionGroupClass: k } = e;
  const M = (t) => r.findIndex((e) => e.id === t.id),
    R = (t) => {
      n(0, (h = M(t)));
      const e = { index: h, ...t };
      ((t, ...e) => {
        t && t(...e);
      })(m, e),
        l("change", e);
    };
  return (
    (t.$$set = (t) => {
      "label" in t && n(1, (c = t.label)),
        "hideLabel" in t && n(2, (u = t.hideLabel)),
        "class" in t && n(3, (d = t.class)),
        "name" in t && n(4, (p = t.name)),
        "selectedIndex" in t && n(0, (h = t.selectedIndex)),
        "options" in t && n(15, (g = t.options)),
        "onchange" in t && n(16, (m = t.onchange)),
        "layout" in t && n(5, (f = t.layout)),
        "optionMapper" in t && n(17, ($ = t.optionMapper)),
        "optionFilter" in t && n(18, (y = t.optionFilter)),
        "value" in t && n(19, (x = t.value)),
        "optionLabelClass" in t && n(6, (b = t.optionLabelClass)),
        "title" in t && n(7, (v = t.title)),
        "locale" in t && n(20, (w = t.locale)),
        "optionClass" in t && n(8, (S = t.optionClass)),
        "optionGroupClass" in t && n(9, (k = t.optionGroupClass)),
        "$$scope" in t && n(23, (s = t.$$scope));
    }),
    (t.$$.update = () => {
      1343488 & t.$$.dirty[0] && n(10, (o = Vl(y ? g.filter(y) : g, w))),
        132096 & t.$$.dirty[0] &&
          n(
            11,
            (i = ((t = [], e) => {
              let n = 0;
              return t.map(
                (t) => (
                  n++,
                  je(t)
                    ? je(t[1])
                      ? { id: n, label: t[0], options: t[1].map((t) => Ol(t, ++n, e)) }
                      : Ol(t, n, e)
                    : t.options
                    ? {
                        id: t.id || n,
                        label: t.label,
                        options: t.options.map((t) => Ol(t, ++n, e)),
                      }
                    : Ol(t, n, e)
                )
              );
            })(o, $))
          ),
        2048 & t.$$.dirty[0] && n(21, (r = Dl(i))),
        2621441 & t.$$.dirty[0] && x && h < 0 && n(0, (h = r.findIndex((t) => t.value === x)));
    }),
    [
      h,
      c,
      u,
      d,
      p,
      f,
      b,
      v,
      S,
      k,
      o,
      i,
      M,
      (t) => (e) => {
        var n;
        ((n = e.key), /enter| /i.test(n)) && R(t);
      },
      (t) => (e) => {
        R(t);
      },
      g,
      m,
      $,
      y,
      x,
      w,
      r,
      a,
      s,
    ]
  );
}
class pc extends rr {
  constructor(t) {
    super(),
      ir(
        this,
        t,
        dc,
        uc,
        Lo,
        {
          label: 1,
          hideLabel: 2,
          class: 3,
          name: 4,
          selectedIndex: 0,
          options: 15,
          onchange: 16,
          layout: 5,
          optionMapper: 17,
          optionFilter: 18,
          value: 19,
          optionLabelClass: 6,
          title: 7,
          locale: 20,
          optionClass: 8,
          optionGroupClass: 9,
        },
        [-1, -1]
      );
  }
}
function hc(t) {
  let e, n;
  return (
    (e = new Ys({
      props: { class: "PinturaButtonIcon", $$slots: { default: [gc] }, $$scope: { ctx: t } },
    })),
    {
      c() {
        tr(e.$$.fragment);
      },
      m(t, o) {
        er(e, t, o), (n = !0);
      },
      p(t, n) {
        const o = {};
        536870976 & n && (o.$$scope = { dirty: n, ctx: t }), e.$set(o);
      },
      i(t) {
        n || (Ni(e.$$.fragment, t), (n = !0));
      },
      o(t) {
        Hi(e.$$.fragment, t), (n = !1);
      },
      d(t) {
        nr(e, t);
      },
    }
  );
}
function gc(t) {
  let e;
  return {
    c() {
      e = Jo("g");
    },
    m(n, o) {
      qo(n, e, o), (e.innerHTML = t[6]);
    },
    p(t, n) {
      64 & n && (e.innerHTML = t[6]);
    },
    d(t) {
      t && Ko(e);
    },
  };
}
function mc(t) {
  let e,
    n,
    o,
    i,
    r,
    a,
    s,
    l,
    c = (t[2] || t[18]) + "",
    u = t[6] && hc(t);
  return {
    c() {
      (e = Qo("span")),
        u && u.c(),
        (n = ei()),
        (o = Qo("span")),
        (i = ti(c)),
        ai(o, "class", (r = vs(["PinturaButtonLabel", t[3], t[5] && "implicit"]))),
        ai(e, "slot", "label"),
        ai(e, "title", (a = _l(t[1], t[15]))),
        ai(e, "class", (s = vs(["PinturaButtonInner", t[4]])));
    },
    m(t, r) {
      qo(t, e, r), u && u.m(e, null), Zo(e, n), Zo(e, o), Zo(o, i), (l = !0);
    },
    p(t, d) {
      t[6]
        ? u
          ? (u.p(t, d), 64 & d && Ni(u, 1))
          : ((u = hc(t)), u.c(), Ni(u, 1), u.m(e, n))
        : u &&
          (Vi(),
          Hi(u, 1, 1, () => {
            u = null;
          }),
          Ui()),
        (!l || 262148 & d) && c !== (c = (t[2] || t[18]) + "") && li(i, c),
        (!l || (40 & d && r !== (r = vs(["PinturaButtonLabel", t[3], t[5] && "implicit"])))) &&
          ai(o, "class", r),
        (!l || (32770 & d && a !== (a = _l(t[1], t[15])))) && ai(e, "title", a),
        (!l || (16 & d && s !== (s = vs(["PinturaButtonInner", t[4]])))) && ai(e, "class", s);
    },
    i(t) {
      l || (Ni(u), (l = !0));
    },
    o(t) {
      Hi(u), (l = !1);
    },
    d(t) {
      t && Ko(e), u && u.d();
    },
  };
}
function fc(t) {
  let e,
    n,
    o = t[28].label + "";
  return {
    c() {
      (e = Qo("span")), (n = ti(o)), ai(e, "slot", "group");
    },
    m(t, o) {
      qo(t, e, o), Zo(e, n);
    },
    p(t, e) {
      268435456 & e && o !== (o = t[28].label + "") && li(n, o);
    },
    d(t) {
      t && Ko(e);
    },
  };
}
function $c(t) {
  let e, n;
  return (
    (e = new Ys({
      props: {
        style: Xe(t[13]) ? t[13](t[28].value) : t[13],
        $$slots: { default: [yc] },
        $$scope: { ctx: t },
      },
    })),
    {
      c() {
        tr(e.$$.fragment);
      },
      m(t, o) {
        er(e, t, o), (n = !0);
      },
      p(t, n) {
        const o = {};
        268443648 & n && (o.style = Xe(t[13]) ? t[13](t[28].value) : t[13]),
          805306368 & n && (o.$$scope = { dirty: n, ctx: t }),
          e.$set(o);
      },
      i(t) {
        n || (Ni(e.$$.fragment, t), (n = !0));
      },
      o(t) {
        Hi(e.$$.fragment, t), (n = !1);
      },
      d(t) {
        nr(e, t);
      },
    }
  );
}
function yc(t) {
  let e,
    n = t[28].icon + "";
  return {
    c() {
      e = Jo("g");
    },
    m(t, o) {
      qo(t, e, o), (e.innerHTML = n);
    },
    p(t, o) {
      268435456 & o && n !== (n = t[28].icon + "") && (e.innerHTML = n);
    },
    d(t) {
      t && Ko(e);
    },
  };
}
function xc(t) {
  let e,
    n,
    o,
    i,
    r,
    a,
    s,
    l = t[28].label + "",
    c = t[28].icon && $c(t);
  return {
    c() {
      (e = Qo("span")),
        c && c.c(),
        (n = ei()),
        (o = Qo("span")),
        (i = ti(l)),
        ai(o, "style", (r = Xe(t[14]) ? t[14](t[28].value) : t[14])),
        ai(o, "class", (a = vs(["PinturaDropdownOptionLabel", t[10]]))),
        ai(e, "slot", "option");
    },
    m(t, r) {
      qo(t, e, r), c && c.m(e, null), Zo(e, n), Zo(e, o), Zo(o, i), (s = !0);
    },
    p(t, u) {
      t[28].icon
        ? c
          ? (c.p(t, u), 268435456 & u && Ni(c, 1))
          : ((c = $c(t)), c.c(), Ni(c, 1), c.m(e, n))
        : c &&
          (Vi(),
          Hi(c, 1, 1, () => {
            c = null;
          }),
          Ui()),
        (!s || 268435456 & u) && l !== (l = t[28].label + "") && li(i, l),
        (!s || (268451840 & u && r !== (r = Xe(t[14]) ? t[14](t[28].value) : t[14]))) &&
          ai(o, "style", r),
        (!s || (1024 & u && a !== (a = vs(["PinturaDropdownOptionLabel", t[10]])))) &&
          ai(o, "class", a);
    },
    i(t) {
      s || (Ni(c), (s = !0));
    },
    o(t) {
      Hi(c), (s = !1);
    },
    d(t) {
      t && Ko(e), c && c.d();
    },
  };
}
function bc(t) {
  let e, n, o, i, r;
  return (
    (n = new pc({
      props: {
        name: t[7],
        value: t[9],
        selectedIndex: t[8],
        optionFilter: t[11],
        optionMapper: t[12],
        optionLabelClass: vs(["PinturaDropdownOptionLabel", t[10]]),
        optionGroupClass: "PinturaDropdownOptionGroup",
        optionClass: "PinturaDropdownOption",
        options: t[16],
        onchange: t[19],
        $$slots: {
          option: [xc, ({ option: t }) => ({ 28: t }), ({ option: t }) => (t ? 268435456 : 0)],
          group: [fc, ({ option: t }) => ({ 28: t }), ({ option: t }) => (t ? 268435456 : 0)],
        },
        $$scope: { ctx: t },
      },
    })),
    {
      c() {
        (e = Qo("div")),
          tr(n.$$.fragment),
          ai(e, "class", "PinturaDropdownPanel"),
          ai(e, "slot", "details");
      },
      m(a, s) {
        qo(a, e, s), er(n, e, null), (o = !0), i || ((r = oi(e, "keydown", t[21])), (i = !0));
      },
      p(t, e) {
        const o = {};
        128 & e && (o.name = t[7]),
          512 & e && (o.value = t[9]),
          256 & e && (o.selectedIndex = t[8]),
          2048 & e && (o.optionFilter = t[11]),
          4096 & e && (o.optionMapper = t[12]),
          1024 & e && (o.optionLabelClass = vs(["PinturaDropdownOptionLabel", t[10]])),
          65536 & e && (o.options = t[16]),
          805331968 & e && (o.$$scope = { dirty: e, ctx: t }),
          n.$set(o);
      },
      i(t) {
        o || (Ni(n.$$.fragment, t), (o = !0));
      },
      o(t) {
        Hi(n.$$.fragment, t), (o = !1);
      },
      d(t) {
        t && Ko(e), nr(n), (i = !1), r();
      },
    }
  );
}
function vc(t) {
  let e, n, o;
  function i(e) {
    t[26](e);
  }
  let r = {
    onshow: t[20],
    buttonClass: vs(["PinturaDropdownButton", t[0], t[5] && "PinturaDropdownIconOnly"]),
    $$slots: { details: [bc], label: [mc] },
    $$scope: { ctx: t },
  };
  return (
    void 0 !== t[17] && (r.isActive = t[17]),
    (e = new Ll({ props: r })),
    Mi.push(() => Ji(e, "isActive", i)),
    {
      c() {
        tr(e.$$.fragment);
      },
      m(t, n) {
        er(e, t, n), (o = !0);
      },
      p(t, [o]) {
        const i = {};
        33 & o &&
          (i.buttonClass = vs(["PinturaDropdownButton", t[0], t[5] && "PinturaDropdownIconOnly"])),
          537264126 & o && (i.$$scope = { dirty: o, ctx: t }),
          !n && 131072 & o && ((n = !0), (i.isActive = t[17]), Ii(() => (n = !1))),
          e.$set(i);
      },
      i(t) {
        o || (Ni(e.$$.fragment, t), (o = !0));
      },
      o(t) {
        Hi(e.$$.fragment, t), (o = !1);
      },
      d(t) {
        nr(e, t);
      },
    }
  );
}
function wc(t, e, o) {
  let i,
    r,
    { class: a } = e,
    { title: s } = e,
    { label: l } = e,
    { labelClass: c } = e,
    { innerClass: u } = e,
    { hideLabel: d = !1 } = e,
    { icon: p } = e,
    { name: h } = e,
    { options: g = [] } = e,
    { selectedIndex: m = -1 } = e,
    { value: f } = e,
    { optionLabelClass: $ } = e,
    { optionFilter: y } = e,
    { optionMapper: x } = e,
    { optionIconStyle: b } = e,
    { optionLabelStyle: v } = e,
    { locale: w } = e,
    { onchange: S } = e,
    { onload: k = n } = e,
    { ondestroy: C = n } = e;
  let M;
  return (
    yi(() => k({ options: g })),
    bi(() => C({ options: g })),
    (t.$$set = (t) => {
      "class" in t && o(0, (a = t.class)),
        "title" in t && o(1, (s = t.title)),
        "label" in t && o(2, (l = t.label)),
        "labelClass" in t && o(3, (c = t.labelClass)),
        "innerClass" in t && o(4, (u = t.innerClass)),
        "hideLabel" in t && o(5, (d = t.hideLabel)),
        "icon" in t && o(6, (p = t.icon)),
        "name" in t && o(7, (h = t.name)),
        "options" in t && o(22, (g = t.options)),
        "selectedIndex" in t && o(8, (m = t.selectedIndex)),
        "value" in t && o(9, (f = t.value)),
        "optionLabelClass" in t && o(10, ($ = t.optionLabelClass)),
        "optionFilter" in t && o(11, (y = t.optionFilter)),
        "optionMapper" in t && o(12, (x = t.optionMapper)),
        "optionIconStyle" in t && o(13, (b = t.optionIconStyle)),
        "optionLabelStyle" in t && o(14, (v = t.optionLabelStyle)),
        "locale" in t && o(15, (w = t.locale)),
        "onchange" in t && o(23, (S = t.onchange)),
        "onload" in t && o(24, (k = t.onload)),
        "ondestroy" in t && o(25, (C = t.ondestroy));
    }),
    (t.$$.update = () => {
      4227072 & t.$$.dirty && o(16, (i = Vl(g, w))),
        66048 & t.$$.dirty &&
          o(
            18,
            (r =
              i.reduce((t, e) => {
                if (t) return t;
                const [n, o] = e;
                return (
                  (i = n),
                  (r = f),
                  (Array.isArray(i) && Array.isArray(r) ? Lr(i, r) : i === r) ? o : void 0
                );
                var i, r;
              }, void 0) ||
              ((t) => {
                const e = i.find((t) => void 0 === t[0]);
                if (e) return e[1];
              })())
          );
    }),
    [
      a,
      s,
      l,
      c,
      u,
      d,
      p,
      h,
      m,
      f,
      $,
      y,
      x,
      b,
      v,
      w,
      i,
      M,
      r,
      (t) => {
        o(18, (r = t.value)), S(t), o(17, (M = !1));
      },
      ({ e: t, panel: e }) => {
        if (t && t.key && /up|down/i.test(t.key))
          return e.querySelector("input:not([disabled])").focus();
        e.querySelector("fieldset").focus();
      },
      (t) => {
        /tab/i.test(t.key) && t.preventDefault();
      },
      g,
      S,
      k,
      C,
      function (t) {
        (M = t), o(17, M);
      },
    ]
  );
}
class Sc extends rr {
  constructor(t) {
    super(),
      ir(this, t, wc, vc, Lo, {
        class: 0,
        title: 1,
        label: 2,
        labelClass: 3,
        innerClass: 4,
        hideLabel: 5,
        icon: 6,
        name: 7,
        options: 22,
        selectedIndex: 8,
        value: 9,
        optionLabelClass: 10,
        optionFilter: 11,
        optionMapper: 12,
        optionIconStyle: 13,
        optionLabelStyle: 14,
        locale: 15,
        onchange: 23,
        onload: 24,
        ondestroy: 25,
      });
  }
}
function kc(t, e, n) {
  const o = t.slice();
  return (o[6] = e[n][0]), (o[7] = e[n][1]), (o[8] = e[n][2]), (o[0] = e[n][3]), o;
}
function Cc(t) {
  let e, n, o;
  const i = [t[8]];
  var r = t[1][t[6]] || t[6];
  function a(t) {
    let e = {};
    for (let t = 0; t < i.length; t += 1) e = To(e, i[t]);
    return { props: e };
  }
  return (
    r && (e = new r(a())),
    {
      c() {
        e && tr(e.$$.fragment), (n = ni());
      },
      m(t, i) {
        e && er(e, t, i), qo(t, n, i), (o = !0);
      },
      p(t, o) {
        const s = 1 & o ? Ki(i, [Qi(t[8])]) : {};
        if (r !== (r = t[1][t[6]] || t[6])) {
          if (e) {
            Vi();
            const t = e;
            Hi(t.$$.fragment, 1, 0, () => {
              nr(t, 1);
            }),
              Ui();
          }
          r
            ? ((e = new r(a())), tr(e.$$.fragment), Ni(e.$$.fragment, 1), er(e, n.parentNode, n))
            : (e = null);
        } else r && e.$set(s);
      },
      i(t) {
        o || (e && Ni(e.$$.fragment, t), (o = !0));
      },
      o(t) {
        e && Hi(e.$$.fragment, t), (o = !1);
      },
      d(t) {
        t && Ko(n), e && nr(e, t);
      },
    }
  );
}
function Mc(t) {
  let e, n, o;
  n = new Ec({ props: { items: t[0], discardEmptyItems: !0 } });
  let i = [t[8]],
    r = {};
  for (let t = 0; t < i.length; t += 1) r = To(r, i[t]);
  return {
    c() {
      (e = Qo("div")), tr(n.$$.fragment), si(e, r);
    },
    m(t, i) {
      qo(t, e, i), er(n, e, null), (o = !0);
    },
    p(t, o) {
      const a = {};
      1 & o && (a.items = t[0]), n.$set(a), si(e, (r = Ki(i, [1 & o && t[8]])));
    },
    i(t) {
      o || (Ni(n.$$.fragment, t), (o = !0));
    },
    o(t) {
      Hi(n.$$.fragment, t), (o = !1);
    },
    d(t) {
      t && Ko(e), nr(n);
    },
  };
}
function Rc(t, e) {
  let n, o, i, r, a, s;
  const l = [Mc, Cc],
    c = [];
  function u(t, e) {
    return 1 & e && (o = !t[2](t[6])), o ? 0 : 1;
  }
  return (
    (i = u(e, -1)),
    (r = c[i] = l[i](e)),
    {
      key: t,
      first: null,
      c() {
        (n = ni()), r.c(), (a = ni()), (this.first = n);
      },
      m(t, e) {
        qo(t, n, e), c[i].m(t, e), qo(t, a, e), (s = !0);
      },
      p(t, n) {
        let o = i;
        (i = u((e = t), n)),
          i === o
            ? c[i].p(e, n)
            : (Vi(),
              Hi(c[o], 1, 1, () => {
                c[o] = null;
              }),
              Ui(),
              (r = c[i]),
              r ? r.p(e, n) : ((r = c[i] = l[i](e)), r.c()),
              Ni(r, 1),
              r.m(a.parentNode, a));
      },
      i(t) {
        s || (Ni(r), (s = !0));
      },
      o(t) {
        Hi(r), (s = !1);
      },
      d(t) {
        t && Ko(n), c[i].d(t), t && Ko(a);
      },
    }
  );
}
function Tc(t) {
  let e,
    n,
    o = [],
    i = new Map(),
    r = t[0];
  const a = (t) => t[7];
  for (let e = 0; e < r.length; e += 1) {
    let n = kc(t, r, e),
      s = a(n);
    i.set(s, (o[e] = Rc(s, n)));
  }
  return {
    c() {
      for (let t = 0; t < o.length; t += 1) o[t].c();
      e = ni();
    },
    m(t, i) {
      for (let e = 0; e < o.length; e += 1) o[e].m(t, i);
      qo(t, e, i), (n = !0);
    },
    p(t, [n]) {
      7 & n && ((r = t[0]), Vi(), (o = qi(o, n, a, 1, t, r, i, e.parentNode, Zi, Rc, e, kc)), Ui());
    },
    i(t) {
      if (!n) {
        for (let t = 0; t < r.length; t += 1) Ni(o[t]);
        n = !0;
      }
    },
    o(t) {
      for (let t = 0; t < o.length; t += 1) Hi(o[t]);
      n = !1;
    },
    d(t) {
      for (let e = 0; e < o.length; e += 1) o[e].d(t);
      t && Ko(e);
    },
  };
}
function Pc(t, e, n) {
  let o,
    { items: i } = e,
    { discardEmptyItems: r = !0 } = e;
  const a = { Button: tl, Dropdown: Sc },
    s = (t) => !v(t) || !!a[t],
    l = (t) => {
      if (!t) return !1;
      const [e, , , n] = t;
      return !!s(e) || n.some(l);
    };
  return (
    (t.$$set = (t) => {
      "items" in t && n(3, (i = t.items)),
        "discardEmptyItems" in t && n(4, (r = t.discardEmptyItems));
    }),
    (t.$$.update = () => {
      24 & t.$$.dirty && n(0, (o = (i && r ? i.filter(l) : i) || []));
    }),
    [o, a, s, i, r]
  );
}
class Ec extends rr {
  constructor(t) {
    super(), ir(this, t, Pc, Tc, Lo, { items: 3, discardEmptyItems: 4 });
  }
}
const Ac = [
  "file",
  "size",
  "loadState",
  "processState",
  "cropAspectRatio",
  "cropLimitToImage",
  "crop",
  "cropMinSize",
  "cropMaxSize",
  "cropRange",
  "cropOrigin",
  "cropRectAspectRatio",
  "rotation",
  "rotationRange",
  "targetSize",
  "flipX",
  "flipY",
  "perspectiveX",
  "perspectiveY",
  "perspective",
  "colorMatrix",
  "convolutionMatrix",
  "gamma",
  "vignette",
  "noise",
  "decoration",
  "annotation",
  "backgroundColor",
  "state",
];
var Ic = (t, e) =>
    (e ? ts(t, e) : t)
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .replace(/\s+/g, "-")
      .toLowerCase(),
  Lc = (t, e = D) => {
    const { subscribe: n, set: o } = lr(void 0);
    return {
      subscribe: n,
      unsubscribe: ((t, e) => {
        const n = matchMedia(t);
        return (
          n.addListener(e),
          e(n),
          {
            get matches() {
              return n.matches;
            },
            destroy: () => n.removeListener(e),
          }
        );
      })(t, ({ matches: t }) => o(e(t))).destroy,
    };
  },
  Fc = (t, e, n) =>
    new Promise(async (o, i) => {
      const r = await e.read(t),
        a = (t) =>
          T(t, n)
            .then((t) => e.apply(t, r))
            .then(o)
            .catch(i);
      if (!S() || k(t)) return a(t);
      let s;
      try {
        s = await R(
          (t, e) =>
            createImageBitmap(t)
              .then((t) => e(null, t))
              .catch(e),
          [t]
        );
      } catch (t) {}
      return s && s.width
        ? (await u())
          ? l() && window.chrome && r > 1
            ? o(await (async (t) => d(await f(t)))(s))
            : void o(s)
          : o(e.apply(s, r))
        : a(t);
    }),
  Bc = (t, e) =>
    new Promise(async (n) => {
      if (t.width < e.width && t.height < e.height) return n(t);
      const o = Math.min(e.width / t.width, e.height / t.height),
        i = o * t.width,
        r = o * t.height,
        a = p("canvas", { width: i, height: r }),
        s = a.getContext("2d"),
        l = m(t) ? await f(t) : t;
      s.drawImage(l, 0, 0, i, r), n(d(a));
    });
let zc = null;
var Dc = (t) => (
  (t = t.trim()),
  /^rgba/.test(t)
    ? t
        .substr(5)
        .split(",")
        .map(parseFloat)
        .map((t, e) => t / (3 === e ? 1 : 255))
    : /^rgb/.test(t)
    ? t
        .substr(4)
        .split(",")
        .map(parseFloat)
        .map((t) => t / 255)
    : /^#/.test(t)
    ? ((t) => {
        const [, e, n, o] = t.split("");
        t = 4 === t.length ? `#${e}${e}${n}${n}${o}${o}` : t;
        const [, i, r, a] = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);
        return [i, r, a].map((t) => parseInt(t, 16) / 255);
      })(t)
    : /[0-9]{1,3}\s?,\s?[0-9]{1,3}\s?,\s?[0-9]{1,3}/.test(t)
    ? t
        .split(",")
        .map((t) => parseInt(t, 10))
        .map((t) => t / 255)
    : void 0
);
let Oc = null;
var _c = () => {
  if (null === Oc) {
    const t = p("canvas");
    (Oc = !!qa(t)), g(t);
  }
  return Oc;
};
function Wc(t) {
  let e,
    n,
    o,
    i = t[46] && Vc(t),
    r = t[25] && !t[20] && Gc(t);
  return {
    c() {
      i && i.c(), (e = ei()), r && r.c(), (n = ni());
    },
    m(t, a) {
      i && i.m(t, a), qo(t, e, a), r && r.m(t, a), qo(t, n, a), (o = !0);
    },
    p(t, o) {
      t[46]
        ? i
          ? (i.p(t, o), 32768 & o[1] && Ni(i, 1))
          : ((i = Vc(t)), i.c(), Ni(i, 1), i.m(e.parentNode, e))
        : i &&
          (Vi(),
          Hi(i, 1, 1, () => {
            i = null;
          }),
          Ui()),
        t[25] && !t[20]
          ? r
            ? (r.p(t, o), 34603008 & o[0] && Ni(r, 1))
            : ((r = Gc(t)), r.c(), Ni(r, 1), r.m(n.parentNode, n))
          : r &&
            (Vi(),
            Hi(r, 1, 1, () => {
              r = null;
            }),
            Ui());
    },
    i(t) {
      o || (Ni(i), Ni(r), (o = !0));
    },
    o(t) {
      Hi(i), Hi(r), (o = !1);
    },
    d(t) {
      i && i.d(t), t && Ko(e), r && r.d(t), t && Ko(n);
    },
  };
}
function Vc(t) {
  let e, n, o, i, r, a, s;
  const l = [Hc, Nc, Uc],
    c = [];
  function u(t, e) {
    return t[20] ? 0 : t[22] || t[21] || t[23] || t[24] ? 1 : t[26] && t[42] ? 2 : -1;
  }
  return (
    ~(o = u(t)) && (i = c[o] = l[o](t)),
    {
      c() {
        (e = Qo("div")),
          (n = Qo("p")),
          i && i.c(),
          ai(n, "style", (r = `transform: translateX(${t[47]}px)`)),
          ai(e, "class", "PinturaStatus"),
          ai(e, "style", (a = "opacity: " + t[27]));
      },
      m(t, i) {
        qo(t, e, i), Zo(e, n), ~o && c[o].m(n, null), (s = !0);
      },
      p(t, d) {
        let p = o;
        (o = u(t)),
          o === p
            ? ~o && c[o].p(t, d)
            : (i &&
                (Vi(),
                Hi(c[p], 1, 1, () => {
                  c[p] = null;
                }),
                Ui()),
              ~o
                ? ((i = c[o]),
                  i ? i.p(t, d) : ((i = c[o] = l[o](t)), i.c()),
                  Ni(i, 1),
                  i.m(n, null))
                : (i = null)),
          (!s || (65536 & d[1] && r !== (r = `transform: translateX(${t[47]}px)`))) &&
            ai(n, "style", r),
          (!s || (134217728 & d[0] && a !== (a = "opacity: " + t[27]))) && ai(e, "style", a);
      },
      i(t) {
        s || (Ni(i), (s = !0));
      },
      o(t) {
        Hi(i), (s = !1);
      },
      d(t) {
        t && Ko(e), ~o && c[o].d();
      },
    }
  );
}
function Uc(t) {
  let e, n, o, i, r, a;
  (e = new ml({ props: { text: t[42], onmeasure: t[110] } })),
    (o = new vl({ props: { offset: t[48], visible: t[44], progress: t[43] } }));
  let s = t[45] && Xc(t);
  return {
    c() {
      tr(e.$$.fragment), (n = ei()), tr(o.$$.fragment), (i = ei()), s && s.c(), (r = ni());
    },
    m(t, l) {
      er(e, t, l), qo(t, n, l), er(o, t, l), qo(t, i, l), s && s.m(t, l), qo(t, r, l), (a = !0);
    },
    p(t, n) {
      const i = {};
      2048 & n[1] && (i.text = t[42]), e.$set(i);
      const a = {};
      131072 & n[1] && (a.offset = t[48]),
        8192 & n[1] && (a.visible = t[44]),
        4096 & n[1] && (a.progress = t[43]),
        o.$set(a),
        t[45]
          ? s
            ? (s.p(t, n), 16384 & n[1] && Ni(s, 1))
            : ((s = Xc(t)), s.c(), Ni(s, 1), s.m(r.parentNode, r))
          : s &&
            (Vi(),
            Hi(s, 1, 1, () => {
              s = null;
            }),
            Ui());
    },
    i(t) {
      a || (Ni(e.$$.fragment, t), Ni(o.$$.fragment, t), Ni(s), (a = !0));
    },
    o(t) {
      Hi(e.$$.fragment, t), Hi(o.$$.fragment, t), Hi(s), (a = !1);
    },
    d(t) {
      nr(e, t), t && Ko(n), nr(o, t), t && Ko(i), s && s.d(t), t && Ko(r);
    },
  };
}
function Nc(t) {
  let e, n, o, i, r, a;
  (e = new ml({ props: { text: t[41], onmeasure: t[110] } })),
    (o = new vl({ props: { offset: t[48], visible: t[40], progress: t[39] } }));
  let s = t[21] && jc(t);
  return {
    c() {
      tr(e.$$.fragment), (n = ei()), tr(o.$$.fragment), (i = ei()), s && s.c(), (r = ni());
    },
    m(t, l) {
      er(e, t, l), qo(t, n, l), er(o, t, l), qo(t, i, l), s && s.m(t, l), qo(t, r, l), (a = !0);
    },
    p(t, n) {
      const i = {};
      1024 & n[1] && (i.text = t[41]), e.$set(i);
      const a = {};
      131072 & n[1] && (a.offset = t[48]),
        512 & n[1] && (a.visible = t[40]),
        256 & n[1] && (a.progress = t[39]),
        o.$set(a),
        t[21]
          ? s
            ? (s.p(t, n), 2097152 & n[0] && Ni(s, 1))
            : ((s = jc(t)), s.c(), Ni(s, 1), s.m(r.parentNode, r))
          : s &&
            (Vi(),
            Hi(s, 1, 1, () => {
              s = null;
            }),
            Ui());
    },
    i(t) {
      a || (Ni(e.$$.fragment, t), Ni(o.$$.fragment, t), Ni(s), (a = !0));
    },
    o(t) {
      Hi(e.$$.fragment, t), Hi(o.$$.fragment, t), Hi(s), (a = !1);
    },
    d(t) {
      nr(e, t), t && Ko(n), nr(o, t), t && Ko(i), s && s.d(t), t && Ko(r);
    },
  };
}
function Hc(t) {
  let e, n, o, i, r, a;
  return (
    (e = new ml({ props: { text: t[20], onmeasure: t[110] } })),
    (i = new Ys({ props: { $$slots: { default: [Yc] }, $$scope: { ctx: t } } })),
    {
      c() {
        tr(e.$$.fragment),
          (n = ei()),
          (o = Qo("span")),
          tr(i.$$.fragment),
          ai(o, "class", "PinturaStatusIcon"),
          ai(o, "style", (r = `transform: translateX(${t[48]}px)`));
      },
      m(t, r) {
        er(e, t, r), qo(t, n, r), qo(t, o, r), er(i, o, null), (a = !0);
      },
      p(t, n) {
        const s = {};
        1048576 & n[0] && (s.text = t[20]), e.$set(s);
        const l = {};
        (4 & n[0]) | (16777216 & n[8]) && (l.$$scope = { dirty: n, ctx: t }),
          i.$set(l),
          (!a || (131072 & n[1] && r !== (r = `transform: translateX(${t[48]}px)`))) &&
            ai(o, "style", r);
      },
      i(t) {
        a || (Ni(e.$$.fragment, t), Ni(i.$$.fragment, t), (a = !0));
      },
      o(t) {
        Hi(e.$$.fragment, t), Hi(i.$$.fragment, t), (a = !1);
      },
      d(t) {
        nr(e, t), t && Ko(n), t && Ko(o), nr(i);
      },
    }
  );
}
function Xc(t) {
  let e, n, o, i;
  return (
    (n = new tl({
      props: {
        onclick: t[112],
        label: t[2].statusLabelButtonClose,
        icon: t[2].statusIconButtonClose,
        hideLabel: !0,
      },
    })),
    {
      c() {
        (e = Qo("span")),
          tr(n.$$.fragment),
          ai(e, "class", "PinturaStatusButton"),
          ai(e, "style", (o = `transform: translateX(${t[48]}px)`));
      },
      m(t, o) {
        qo(t, e, o), er(n, e, null), (i = !0);
      },
      p(t, r) {
        const a = {};
        4 & r[0] && (a.label = t[2].statusLabelButtonClose),
          4 & r[0] && (a.icon = t[2].statusIconButtonClose),
          n.$set(a),
          (!i || (131072 & r[1] && o !== (o = `transform: translateX(${t[48]}px)`))) &&
            ai(e, "style", o);
      },
      i(t) {
        i || (Ni(n.$$.fragment, t), (i = !0));
      },
      o(t) {
        Hi(n.$$.fragment, t), (i = !1);
      },
      d(t) {
        t && Ko(e), nr(n);
      },
    }
  );
}
function jc(t) {
  let e, n, o, i;
  return (
    (n = new tl({
      props: {
        onclick: t[111],
        label: t[2].statusLabelButtonClose,
        icon: t[2].statusIconButtonClose,
        hideLabel: !0,
      },
    })),
    {
      c() {
        (e = Qo("span")),
          tr(n.$$.fragment),
          ai(e, "class", "PinturaStatusButton"),
          ai(e, "style", (o = `transform: translateX(${t[48]}px)`));
      },
      m(t, o) {
        qo(t, e, o), er(n, e, null), (i = !0);
      },
      p(t, r) {
        const a = {};
        4 & r[0] && (a.label = t[2].statusLabelButtonClose),
          4 & r[0] && (a.icon = t[2].statusIconButtonClose),
          n.$set(a),
          (!i || (131072 & r[1] && o !== (o = `transform: translateX(${t[48]}px)`))) &&
            ai(e, "style", o);
      },
      i(t) {
        i || (Ni(n.$$.fragment, t), (i = !0));
      },
      o(t) {
        Hi(n.$$.fragment, t), (i = !1);
      },
      d(t) {
        t && Ko(e), nr(n);
      },
    }
  );
}
function Yc(t) {
  let e,
    n = t[2].iconSupportError + "";
  return {
    c() {
      e = Jo("g");
    },
    m(t, o) {
      qo(t, e, o), (e.innerHTML = n);
    },
    p(t, o) {
      4 & o[0] && n !== (n = t[2].iconSupportError + "") && (e.innerHTML = n);
    },
    d(t) {
      t && Ko(e);
    },
  };
}
function Gc(t) {
  let e,
    n,
    o,
    i,
    r,
    a,
    s,
    l,
    c,
    u = t[6] && Zc(t),
    d = t[15] && t[13] && qc(t);
  const p = [eu, tu],
    h = [];
  function g(t, e) {
    return t[15] ? 0 : 1;
  }
  return (
    (o = g(t)),
    (i = h[o] = p[o](t)),
    (a = new bs({
      props: {
        animate: t[16],
        pixelRatio: t[55],
        backgroundColor: t[56],
        maskRect: t[38],
        imageSize: t[29],
        imageData: t[25],
        imageProps: t[37],
        imagePreviews: t[57],
        loadImageData: t[8],
        willRender: t[201],
      },
    })),
    {
      c() {
        u && u.c(),
          (e = ei()),
          d && d.c(),
          (n = ei()),
          i.c(),
          (r = ei()),
          tr(a.$$.fragment),
          (s = ei()),
          (l = Qo("div")),
          ai(l, "class", "PinturaRootPortal");
      },
      m(i, p) {
        u && u.m(i, p),
          qo(i, e, p),
          d && d.m(i, p),
          qo(i, n, p),
          h[o].m(i, p),
          qo(i, r, p),
          er(a, i, p),
          qo(i, s, p),
          qo(i, l, p),
          t[202](l),
          (c = !0);
      },
      p(t, s) {
        t[6]
          ? u
            ? (u.p(t, s), 64 & s[0] && Ni(u, 1))
            : ((u = Zc(t)), u.c(), Ni(u, 1), u.m(e.parentNode, e))
          : u &&
            (Vi(),
            Hi(u, 1, 1, () => {
              u = null;
            }),
            Ui()),
          t[15] && t[13]
            ? d
              ? (d.p(t, s), 40960 & s[0] && Ni(d, 1))
              : ((d = qc(t)), d.c(), Ni(d, 1), d.m(n.parentNode, n))
            : d &&
              (Vi(),
              Hi(d, 1, 1, () => {
                d = null;
              }),
              Ui());
        let l = o;
        (o = g(t)),
          o === l
            ? h[o].p(t, s)
            : (Vi(),
              Hi(h[l], 1, 1, () => {
                h[l] = null;
              }),
              Ui(),
              (i = h[o]),
              i ? i.p(t, s) : ((i = h[o] = p[o](t)), i.c()),
              Ni(i, 1),
              i.m(r.parentNode, r));
        const c = {};
        65536 & s[0] && (c.animate = t[16]),
          16777216 & s[1] && (c.pixelRatio = t[55]),
          33554432 & s[1] && (c.backgroundColor = t[56]),
          128 & s[1] && (c.maskRect = t[38]),
          536870912 & s[0] && (c.imageSize = t[29]),
          33554432 & s[0] && (c.imageData = t[25]),
          64 & s[1] && (c.imageProps = t[37]),
          67108864 & s[1] && (c.imagePreviews = t[57]),
          256 & s[0] && (c.loadImageData = t[8]),
          (32 & s[0]) | (939524096 & s[1]) && (c.willRender = t[201]),
          a.$set(c);
      },
      i(t) {
        c || (Ni(u), Ni(d), Ni(i), Ni(a.$$.fragment, t), (c = !0));
      },
      o(t) {
        Hi(u), Hi(d), Hi(i), Hi(a.$$.fragment, t), (c = !1);
      },
      d(i) {
        u && u.d(i),
          i && Ko(e),
          d && d.d(i),
          i && Ko(n),
          h[o].d(i),
          i && Ko(r),
          nr(a, i),
          i && Ko(s),
          i && Ko(l),
          t[202](null);
      },
    }
  );
}
function Zc(t) {
  let e, n, o, i, r;
  return (
    (n = new Ec({ props: { items: t[50] } })),
    {
      c() {
        (e = Qo("div")), tr(n.$$.fragment), ai(e, "class", "PinturaNav PinturaNavTools");
      },
      m(a, s) {
        qo(a, e, s),
          er(n, e, null),
          (o = !0),
          i || ((r = [oi(e, "measure", t[186]), Uo(Ha.call(null, e))]), (i = !0));
      },
      p(t, e) {
        const o = {};
        524288 & e[1] && (o.items = t[50]), n.$set(o);
      },
      i(t) {
        o || (Ni(n.$$.fragment, t), (o = !0));
      },
      o(t) {
        Hi(n.$$.fragment, t), (o = !1);
      },
      d(t) {
        t && Ko(e), nr(n), (i = !1), Ao(r);
      },
    }
  );
}
function qc(t) {
  let e, n, o;
  return (
    (n = new dl({
      props: {
        elasticity: t[4] * iu,
        scrollDirection: t[35] ? "y" : "x",
        $$slots: { default: [Jc] },
        $$scope: { ctx: t },
      },
    })),
    {
      c() {
        (e = Qo("div")), tr(n.$$.fragment), ai(e, "class", "PinturaNav PinturaNavMain");
      },
      m(t, i) {
        qo(t, e, i), er(n, e, null), (o = !0);
      },
      p(t, e) {
        const o = {};
        16 & e[0] && (o.elasticity = t[4] * iu),
          16 & e[1] && (o.scrollDirection = t[35] ? "y" : "x"),
          (131072 & e[0]) | (3 & e[1]) | (16777216 & e[8]) && (o.$$scope = { dirty: e, ctx: t }),
          n.$set(o);
      },
      i(t) {
        o || (Ni(n.$$.fragment, t), (o = !0));
      },
      o(t) {
        Hi(n.$$.fragment, t), (o = !1);
      },
      d(t) {
        t && Ko(e), nr(n);
      },
    }
  );
}
function Kc(t) {
  let e,
    n = t[271].icon + "";
  return {
    c() {
      e = Jo("g");
    },
    m(t, o) {
      qo(t, e, o), (e.innerHTML = n);
    },
    p(t, o) {
      8388608 & o[8] && n !== (n = t[271].icon + "") && (e.innerHTML = n);
    },
    d(t) {
      t && Ko(e);
    },
  };
}
function Qc(t) {
  let e,
    n,
    o,
    i,
    r,
    a = t[271].label + "";
  return (
    (e = new Ys({ props: { $$slots: { default: [Kc] }, $$scope: { ctx: t } } })),
    {
      c() {
        tr(e.$$.fragment), (n = ei()), (o = Qo("span")), (i = ti(a));
      },
      m(t, a) {
        er(e, t, a), qo(t, n, a), qo(t, o, a), Zo(o, i), (r = !0);
      },
      p(t, n) {
        const o = {};
        25165824 & n[8] && (o.$$scope = { dirty: n, ctx: t }),
          e.$set(o),
          (!r || 8388608 & n[8]) && a !== (a = t[271].label + "") && li(i, a);
      },
      i(t) {
        r || (Ni(e.$$.fragment, t), (r = !0));
      },
      o(t) {
        Hi(e.$$.fragment, t), (r = !1);
      },
      d(t) {
        nr(e, t), t && Ko(n), t && Ko(o);
      },
    }
  );
}
function Jc(t) {
  let e, n;
  const o = [t[31], { tabs: t[32] }];
  let i = {
    $$slots: {
      default: [
        Qc,
        ({ tab: t }) => ({ 271: t }),
        ({ tab: t }) => [0, 0, 0, 0, 0, 0, 0, 0, t ? 8388608 : 0],
      ],
    },
    $$scope: { ctx: t },
  };
  for (let t = 0; t < o.length; t += 1) i = To(i, o[t]);
  return (
    (e = new Ps({ props: i })),
    e.$on("select", t[187]),
    {
      c() {
        tr(e.$$.fragment);
      },
      m(t, o) {
        er(e, t, o), (n = !0);
      },
      p(t, n) {
        const i = 3 & n[1] ? Ki(o, [1 & n[1] && Qi(t[31]), 2 & n[1] && { tabs: t[32] }]) : {};
        25165824 & n[8] && (i.$$scope = { dirty: n, ctx: t }), e.$set(i);
      },
      i(t) {
        n || (Ni(e.$$.fragment, t), (n = !0));
      },
      o(t) {
        Hi(e.$$.fragment, t), (n = !1);
      },
      d(t) {
        nr(e, t);
      },
    }
  );
}
function tu(t) {
  let e, n, o;
  function i(e) {
    t[196](e);
  }
  let r = {
    class: "PinturaMain",
    content: { ...t[18].find(t[195]), props: t[7][t[17]] },
    locale: t[2],
    isAnimated: t[16],
    stores: t[105],
  };
  return (
    void 0 !== t[0][t[17]] && (r.component = t[0][t[17]]),
    (e = new Hs({ props: r })),
    Mi.push(() => Ji(e, "component", i)),
    e.$on("measure", t[197]),
    e.$on("show", t[198]),
    e.$on("hide", t[199]),
    e.$on("fade", t[200]),
    {
      c() {
        tr(e.$$.fragment);
      },
      m(t, n) {
        er(e, t, n), (o = !0);
      },
      p(t, o) {
        const i = {};
        393344 & o[0] && (i.content = { ...t[18].find(t[195]), props: t[7][t[17]] }),
          4 & o[0] && (i.locale = t[2]),
          65536 & o[0] && (i.isAnimated = t[16]),
          !n && 131073 & o[0] && ((n = !0), (i.component = t[0][t[17]]), Ii(() => (n = !1))),
          e.$set(i);
      },
      i(t) {
        o || (Ni(e.$$.fragment, t), (o = !0));
      },
      o(t) {
        Hi(e.$$.fragment, t), (o = !1);
      },
      d(t) {
        nr(e, t);
      },
    }
  );
}
function eu(t) {
  let e, n;
  const o = [{ class: "PinturaMain" }, { visible: t[28] }, t[31], { panels: t[33] }];
  let i = {
    $$slots: {
      default: [
        nu,
        ({ panel: t }) => ({ 270: t }),
        ({ panel: t }) => [0, 0, 0, 0, 0, 0, 0, 0, t ? 4194304 : 0],
      ],
    },
    $$scope: { ctx: t },
  };
  for (let t = 0; t < o.length; t += 1) i = To(i, o[t]);
  return (
    (e = new Vs({ props: i })),
    e.$on("measure", t[194]),
    {
      c() {
        tr(e.$$.fragment);
      },
      m(t, o) {
        er(e, t, o), (n = !0);
      },
      p(t, n) {
        const i =
          (268435456 & n[0]) | (5 & n[1])
            ? Ki(o, [
                o[0],
                268435456 & n[0] && { visible: t[28] },
                1 & n[1] && Qi(t[31]),
                4 & n[1] && { panels: t[33] },
              ])
            : {};
        (269418629 & n[0]) | (8388608 & n[1]) | (20971520 & n[8]) &&
          (i.$$scope = { dirty: n, ctx: t }),
          e.$set(i);
      },
      i(t) {
        n || (Ni(e.$$.fragment, t), (n = !0));
      },
      o(t) {
        Hi(e.$$.fragment, t), (n = !1);
      },
      d(t) {
        nr(e, t);
      },
    }
  );
}
function nu(t) {
  let e, n, o;
  function i(...e) {
    return t[188](t[270], ...e);
  }
  function r(e) {
    t[189](e, t[270]);
  }
  let a = {
    content: { ...t[18].find(i), props: t[7][t[270]] },
    locale: t[2],
    isActive: t[270] === t[17],
    isAnimated: t[16],
    stores: t[105],
  };
  return (
    void 0 !== t[0][t[270]] && (a.component = t[0][t[270]]),
    (e = new Hs({ props: a })),
    Mi.push(() => Ji(e, "component", r)),
    e.$on("measure", t[190]),
    e.$on("show", function () {
      return t[191](t[270]);
    }),
    e.$on("hide", function () {
      return t[192](t[270]);
    }),
    e.$on("fade", function (...e) {
      return t[193](t[270], ...e);
    }),
    {
      c() {
        tr(e.$$.fragment);
      },
      m(t, n) {
        er(e, t, n), (o = !0);
      },
      p(o, r) {
        t = o;
        const a = {};
        (262272 & r[0]) | (4194304 & r[8]) &&
          (a.content = { ...t[18].find(i), props: t[7][t[270]] }),
          4 & r[0] && (a.locale = t[2]),
          (131072 & r[0]) | (4194304 & r[8]) && (a.isActive = t[270] === t[17]),
          65536 & r[0] && (a.isAnimated = t[16]),
          !n &&
            (1 & r[0]) | (4194304 & r[8]) &&
            ((n = !0), (a.component = t[0][t[270]]), Ii(() => (n = !1))),
          e.$set(a);
      },
      i(t) {
        o || (Ni(e.$$.fragment, t), (o = !0));
      },
      o(t) {
        Hi(e.$$.fragment, t), (o = !1);
      },
      d(t) {
        nr(e, t);
      },
    }
  );
}
function ou(t) {
  let e, n, o, i;
  Ai(t[185]);
  let r = t[51] && Wc(t);
  return {
    c() {
      (e = Qo("div")),
        r && r.c(),
        ai(e, "id", t[3]),
        ai(e, "class", t[34]),
        ai(e, "data-env", t[36]);
    },
    m(a, s) {
      qo(a, e, s),
        r && r.m(e, null),
        t[203](e),
        (n = !0),
        o ||
          ((i = [
            oi(window, "keydown", t[114]),
            oi(window, "keyup", t[115]),
            oi(window, "blur", t[116]),
            oi(window, "resize", t[185]),
            oi(e, "ping", function () {
              Io(t[52]) && t[52].apply(this, arguments);
            }),
            oi(e, "contextmenu", t[117]),
            oi(
              e,
              "touchstart",
              function () {
                Io(t[49]) && t[49].apply(this, arguments);
              },
              { passive: !1 }
            ),
            oi(e, "transitionend", t[106]),
            oi(e, "dropfiles", t[118]),
            oi(e, "measure", t[204]),
            Uo(Ha.call(null, e, { observeViewRect: !0 })),
            Uo(Xa.call(null, e)),
            Uo(Ya.call(null, e)),
          ]),
          (o = !0));
    },
    p(o, i) {
      (t = o)[51]
        ? r
          ? (r.p(t, i), 1048576 & i[1] && Ni(r, 1))
          : ((r = Wc(t)), r.c(), Ni(r, 1), r.m(e, null))
        : r &&
          (Vi(),
          Hi(r, 1, 1, () => {
            r = null;
          }),
          Ui()),
        (!n || 8 & i[0]) && ai(e, "id", t[3]),
        (!n || 8 & i[1]) && ai(e, "class", t[34]),
        (!n || 32 & i[1]) && ai(e, "data-env", t[36]);
    },
    i(t) {
      n || (Ni(r), (n = !0));
    },
    o(t) {
      Hi(r), (n = !1);
    },
    d(n) {
      n && Ko(e), r && r.d(), t[203](null), (o = !1), Ao(i);
    },
  };
}
const iu = 10;
function ru(t, e, o) {
  let i,
    r,
    a,
    s,
    l,
    c,
    u,
    h,
    m,
    f,
    $,
    y,
    x,
    b,
    w,
    S,
    k,
    M,
    R,
    T,
    P,
    E,
    A,
    I,
    L,
    F,
    B,
    z,
    O,
    _,
    W,
    V,
    U,
    N,
    H,
    j,
    Z,
    q,
    K,
    Q,
    J,
    nt,
    ot,
    it,
    rt,
    at,
    st,
    lt,
    ct,
    ut,
    dt,
    ht,
    mt,
    ft,
    $t,
    yt,
    xt,
    bt,
    vt,
    wt,
    St,
    kt,
    Ct,
    Pt,
    Et,
    At,
    It,
    _t,
    Vt,
    Ut,
    Nt,
    Xt,
    jt,
    Gt,
    Zt,
    qt,
    Kt,
    Jt,
    te,
    ee,
    ne,
    oe,
    ie,
    ae,
    se,
    le,
    ce,
    ue,
    de,
    pe,
    he,
    ge,
    me,
    fe,
    $e,
    ye,
    xe,
    be,
    ve,
    we,
    ke,
    Ce,
    Me,
    Re,
    Te,
    Pe = Mo;
  zo(t, Fa, (t) => o(153, (qt = t))), t.$$.on_destroy.push(() => Pe());
  const Ee = yr(),
    Ae = vi();
  let { class: Ie } = e,
    { layout: Le } = e,
    { stores: Fe } = e,
    { locale: Be } = e,
    { id: ze } = e,
    { util: De } = e,
    { utils: Oe } = e,
    { animations: _e = "auto" } = e,
    { previewUpscale: We = !1 } = e,
    { elasticityMultiplier: Ve = 10 } = e,
    { willRevert: Ue = () => Promise.resolve(!0) } = e,
    { willRenderCanvas: Ne = D } = e,
    { willRenderToolbar: He = D } = e,
    { enableButtonExport: je = !0 } = e,
    { enableButtonRevert: Ye = !0 } = e,
    { enableNavigateHistory: Ge = !0 } = e,
    { enableToolbar: Ze = !0 } = e,
    { enableUtils: qe = !0 } = e,
    { enableButtonClose: Ke = !1 } = e,
    { enableDropImage: Qe = !1 } = e,
    { previewImageDataMaxSize: Je } = e,
    { layoutDirectionPreference: tn = "auto" } = e,
    { imageOrienter: en = { read: () => 1, apply: (t) => t } } = e,
    { pluginComponents: nn } = e,
    { pluginOptions: on = {} } = e;
  const rn = Ee.sub,
    an = {};
  let { root: sn } = e,
    ln = [];
  const cn =
      (() => {
        if (null !== zc) return zc;
        const t = p("canvas"),
          e = qa(t);
        return (zc = e ? e.getParameter(e.MAX_TEXTURE_SIZE) : void 0), g(t), zc;
      })() || 1024,
    un = gt(cn, cn),
    dn = Se() ? 16777216 : 1 / 0;
  let {
    imageSourceToImageData: pn = (t) =>
      v(t)
        ? fetch(t)
            .then((t) => t.blob())
            .then((t) => Fc(t, en, dn))
            .then((t) => Bc(t, a))
        : re(t)
        ? new Promise((e) => e(d(t)))
        : Fc(t, en, dn).then((t) => Bc(t, a)),
  } = e;
  const gn = (() => {
      let t, e;
      const n = Ac.reduce(
        (t, n) => (
          (t[n] = (function (t, e, n) {
            let o = [];
            return {
              set: e,
              update: n,
              publish: (t) => {
                o.forEach((e) => e(t));
              },
              subscribe: (e) => (
                o.push(e),
                t(e),
                () => {
                  o = o.filter((t) => t !== e);
                }
              ),
            };
          })(
            (t) => {
              if (!e) return t();
              e.stores[n].subscribe(t)();
            },
            (t) => {
              e && e.stores[n].set(t);
            },
            (t) => {
              e && e.stores[n].update(t);
            }
          )),
          t
        ),
        {}
      );
      return {
        update: (o) => {
          if (((e = o), t && (t.forEach((t) => t()), (t = void 0)), !o))
            return n.file.publish(void 0), void n.loadState.publish(void 0);
          t = Ac.map((t) =>
            o.stores[t].subscribe((e) => {
              n[t].publish(e);
            })
          );
        },
        stores: n,
      };
    })(),
    {
      file: mn,
      size: fn,
      loadState: $n,
      processState: yn,
      cropAspectRatio: xn,
      cropLimitToImage: bn,
      crop: Sn,
      cropMinSize: kn,
      cropMaxSize: Cn,
      cropRange: Tn,
      cropOrigin: Pn,
      cropRectAspectRatio: An,
      rotation: In,
      rotationRange: Ln,
      targetSize: Fn,
      flipX: Bn,
      flipY: zn,
      backgroundColor: Dn,
      colorMatrix: On,
      convolutionMatrix: _n,
      gamma: Wn,
      vignette: Vn,
      noise: Un,
      decoration: Nn,
      annotation: Hn,
      state: Xn,
    } = gn.stores;
  zo(t, mn, (t) => o(150, (Zt = t))),
    zo(t, fn, (t) => o(29, (Xt = t))),
    zo(t, $n, (t) => o(146, (wt = t))),
    zo(t, yn, (t) => o(183, (pe = t))),
    zo(t, Sn, (t) => o(148, (Pt = t))),
    zo(t, Fn, (t) => o(215, (Ut = t))),
    zo(t, Dn, (t) => o(180, (le = t))),
    zo(t, Nn, (t) => o(58, (Me = t))),
    zo(t, Hn, (t) => o(59, (Re = t))),
    zo(t, Xn, (t) => o(208, (vt = t)));
  const { images: jn, imageReader: Yn } = Fe;
  zo(t, jn, (t) => o(144, (yt = t)));
  const Gn = lr([0, 0, 0]);
  zo(t, Gn, (t) => o(56, (ke = t)));
  const Zn = lr([1, 1, 1]);
  zo(t, Zn, (t) => o(220, ($e = t)));
  const qn = La();
  zo(t, qn, (t) => o(221, (ye = t)));
  const Kn = lr();
  zo(t, Kn, (t) => o(14, (xt = t)));
  const Qn = lr();
  zo(t, Qn, (t) => o(145, (bt = t)));
  const Jn = lr(Rt());
  zo(t, Jn, (t) => o(30, (Kt = t)));
  const to = lr(Rt());
  zo(t, to, (t) => o(53, (be = t)));
  const no = lr();
  zo(t, no, (t) => o(54, (ve = t)));
  const oo = cr([no, Jn, to], ([t, e, n], o) => {
    if (!t) return o(void 0);
    let r = 0;
    1 !== h.length || i || (r = n.y + n.height), o(Lt(t.x + e.x, t.y + e.y + r, t.width, t.height));
  });
  zo(t, oo, (t) => o(214, (Vt = t)));
  const io = Lc("(pointer: fine)", (t) => (t ? "pointer-fine" : "pointer-coarse"));
  zo(t, io, (t) => o(175, (ne = t)));
  const ro = Lc("(hover: hover)", (t) => (t ? "pointer-hover" : "pointer-no-hover"));
  zo(t, ro, (t) => o(176, (oe = t)));
  const lo = lr(!1);
  zo(t, lo, (t) => o(149, (Et = t)));
  const co = sr(void 0, (t) => {
    const e = La(0),
      n = [
        lo.subscribe((t) => {
          e.set(t ? 1 : 0);
        }),
        e.subscribe(t),
      ];
    return () => n.forEach((t) => t());
  });
  zo(t, co, (t) => o(222, (xe = t)));
  const uo = lr(We);
  zo(t, uo, (t) => o(211, (Ct = t)));
  const po = cr([oo, Sn], ([t, e], n) => {
    if (!t || !e || !(!St && !kt)) return;
    const o = Math.min(t.width / e.width, t.height / e.height);
    n(Ct ? o : Math.min(1, o));
  });
  zo(t, po, (t) => o(216, (Nt = t)));
  const ho = lr();
  zo(t, ho, (t) => o(209, (St = t)));
  const go = lr();
  zo(t, go, (t) => o(210, (kt = t)));
  const mo = sr(void 0, (t) => {
      const e = La(void 0, { precision: 1e-4 }),
        n = [
          Sn.subscribe(() => {
            if (!Pt) return;
            const t = void 0 === kt || Et,
              n = al(Pt, kt, 5 * Ve);
            e.set(n, { hard: t });
          }),
          e.subscribe(t),
        ];
      return () => n.forEach((t) => t());
    }),
    fo = lr();
  zo(t, fo, (t) => o(212, (At = t)));
  const $o = lr();
  zo(t, $o, (t) => o(218, (Gt = t)));
  const yo = lr(void 0);
  zo(t, yo, (t) => o(213, (_t = t)));
  const xo = sr(void 0, (t) => {
    const e = La(void 0, { precision: 1e-4 }),
      n = () => {
        if (!At) return;
        const t = Et || !It,
          n = al(At, _t, 1 * Ve);
        if (
          (n.width < 0 && ((n.width = 0), (n.x = At.x)),
          n.height < 0 && ((n.height = 0), (n.y = At.y)),
          Bt(n, Vt),
          "resize" === y && Pt)
        ) {
          const t = Ut || Pt;
          zt(n, t.width / At.width || t.height / At.height);
        }
        e.set(n, { hard: t });
      },
      o = [oo.subscribe(n), fo.subscribe(n), Fn.subscribe(n), e.subscribe(t)];
    return () => o.forEach((t) => t());
  });
  let bo;
  zo(t, xo, (t) => o(38, (ce = t))),
    oo.subscribe(() => {
      if (!Vt || !Pt) return;
      const t =
        Pt.width <= Vt.width && Pt.height <= Vt.height
          ? Ht(Vt, Dt(Mt(Pt), Nt || 1))
          : Yt(Vt, Wt(Pt || Xt));
      fo.set(t);
    }),
    $o.subscribe((t) => {
      if (!t) return (bo = void 0), void Vo(ho, (St = void 0), St);
      bo = jt;
      const e = Mt(Pt);
      ho.set(e);
    }),
    fo.subscribe((t) => {
      if (!t || !Gt) return;
      const e =
        ((n = Mt(t)),
        (o = Gt),
        (n.x -= o.x),
        (n.y -= o.y),
        (n.width -= o.width),
        (n.height -= o.height),
        n);
      var n, o;
      Ot(e, bo);
      const i = ((t, e) => (
        (t.x += e.x), (t.y += e.y), (t.width += e.width), (t.height += e.height), t
      ))(Mt(St), e);
      Sn.set(i);
    }),
    Sn.subscribe((t) => {
      if (Et || Gt || kt) return;
      if (!t || !At) return;
      const e = Wt(At),
        n = Wt(t);
      if (vr(e, 6) === vr(n, 6)) return;
      const o = Math.min(Vt.width / Pt.width, Vt.height / Pt.height),
        i = gt(t.width * o, t.height * o),
        r = 0.5 * (At.width - i.width),
        a = 0.5 * (At.height - i.height),
        s = Lt(At.x + r, At.y + a, i.width, i.height);
      fo.set(s);
    });
  const vo = cr([po, Sn, fo], ([t, e, n], o) => {
      if (!t || !e || !n) return;
      const i = n.width / e.width,
        r = n.height / e.height;
      o(Math.max(i, r) / t);
    }),
    wo = cr([po, vo], ([t, e], n) => {
      if (!e) return;
      n(t * e);
    });
  zo(t, wo, (t) => o(217, (jt = t)));
  const So = cr([qn, xo], ([t, e], n) => {
      if (!e || i) return n([]);
      const { x: o, y: r, width: a, height: s } = e;
      n([
        {
          points: [X(o, r), X(o + a, r), X(o + a, r + s), X(o, r + s), X(o, r)],
          strokeWidth: 1,
          strokeColor: t,
        },
      ]);
    }),
    ko = lr([]),
    Ro = cr([So, ko], ([t, e], n) => {
      n([...t, ...e]);
    });
  zo(t, Ro, (t) => o(60, (Te = t)));
  const To = lr(!1);
  let Po;
  zo(t, To, (t) => o(182, (ue = t)));
  const Eo = cr([To, mn], ([t, e], o) => {
    if ((Po && Po.cancel(), !t || !e)) return o(void 0);
    var i, r;
    (Po = { cancel: n }),
      ((i = e),
      (r = Po),
      new Promise((t, e) => {
        let n,
          o = !1;
        r.cancel = () => (o = !0);
        const a = Date.now();
        pn(i)
          .then((e) => {
            const i = Date.now() - a;
            clearTimeout(n),
              (n = setTimeout(() => {
                o || t(e);
              }, Math.max(0, 1e3 - i)));
          })
          .catch(e);
      }))
        .then(o)
        .catch((t) => Vo($n, (wt.error = t), wt));
  });
  zo(t, Eo, (t) => o(25, (de = t)));
  const Ao = lr({});
  zo(t, Ao, (t) => o(178, (ae = t)));
  const Io = lr([]);
  zo(t, Io, (t) => o(57, (Ce = t)));
  const Lo = cr([oo, Qn, fn, mo, fo, wo, In, Bn, zn, Fn], ([t, e, n, o, i, r, a, s, l, c], u) => {
    if (t && "resize" === y) {
      const t = c || o;
      r = t.width / o.width || t.height / o.height;
    }
    u(
      ((t, e, n, o, i, r, a, s, l, c, u) => {
        if (!(t && e && n && o && r)) return;
        const d = Qt(Mt(e)),
          p = Ft(d),
          h = Ft(t),
          g = Tt(n),
          m = Ft(g),
          f = X(a, s),
          $ = Rr(n, o, l, f),
          y = Ft($),
          x = et(Y(m), y),
          b = et(Y(h), p);
        (x.x += b.x), (x.y += b.y);
        const v = G(Y(x));
        (v.x += b.x), (v.y += b.y);
        const w = Ft(Bt(Mt(i), t)),
          S = et(w, h);
        return (
          tt(x, S),
          {
            origin: v,
            translation: x,
            rotation: { x: u ? Math.PI : 0, y: c ? Math.PI : 0, z: l },
            perspective: f,
            scale: r,
          }
        );
      })(t, e, n, o, i, r, 0, 0, a, s, l)
    );
  });
  zo(t, Lo, (t) => o(177, (ie = t)));
  const Do = cr([On, _n, Wn, Vn, Un], ([t, e, n, o, i], r) => {
    const a =
      t &&
      Object.keys(t)
        .map((e) => t[e])
        .filter(Boolean);
    r({
      gamma: n || void 0,
      vignette: o || void 0,
      noise: i || void 0,
      convolutionMatrix: e || void 0,
      colorMatrix: a && a.length && Co(a),
    });
  });
  let Oo, _o;
  zo(t, Do, (t) => o(179, (se = t)));
  const Wo = (() => {
      if (!Se()) return !1;
      const t = navigator.userAgent.match(/OS (\d+)_(\d+)_?(\d+)?/i) || [],
        [, e, n] = t.map((t) => parseInt(t, 10) || 0);
      return e > 13 || (13 === e && n >= 4);
    })(),
    Uo = lr({});
  zo(t, Uo, (t) => o(174, (ee = t)));
  const No = wl(),
    Ho = sr(No, (t) => {
      const e = () => t(wl()),
        n = matchMedia(`(resolution: ${No}dppx)`);
      return n.addListener(e), () => n.removeListener(e);
    });
  zo(t, Ho, (t) => o(55, (we = t)));
  const Xo = lr();
  zo(t, Xo, (t) => o(16, (It = t)));
  const jo = ((t, e) => {
    const { sub: n, pub: o } = yr();
    let i;
    const r = [],
      a = lr(-1),
      s = [],
      l = () => s.forEach((t) => t({ index: Bo(a), length: r.length })),
      c = {
        get index() {
          return Bo(a);
        },
        set index(t) {
          (t = Number.isInteger(t) ? t : -1),
            (t = Tr(t, -1, r.length - 1)),
            a.set(t),
            e(r[c.index] || i),
            l();
        },
        get state() {
          return r[r.length - 1] || i;
        },
        length: () => r.length,
        undo() {
          const t = c.index--;
          return o("undo", t), t;
        },
        redo() {
          const t = c.index++;
          return o("redo", c.index), t;
        },
        revert() {
          (r.length = 0), (c.index = -1), o("revert");
        },
        write(n) {
          n && e({ ...t(), ...n }), (r.length = c.index + 1), r.push(t()), a.set(r.length - 1), l();
        },
        set(t = {}) {
          Array.isArray(t) ? ((r.length = 0), r.push(...t), (c.index = r.length - 1)) : (i = t);
        },
        get: () => [...r],
        subscribe: (t) => (
          s.push(t), t({ index: c.index, length: r.length }), () => s.splice(s.indexOf(t), 1)
        ),
        on: n,
      };
    return c;
  })(
    () => vt,
    (t) => {
      Vo(Xn, (vt = t), vt), Jn.set(Kt);
    }
  );
  Pe(),
    (Pe = Fo(jo, (t) => o(155, (Jt = t)))),
    $n.subscribe((t) => {
      t && t.complete && jo.set(vt);
    });
  const Yo = () => Ue().then((t) => t && jo.revert()),
    Go = lr(!1);
  zo(t, Go, (t) => o(157, (te = t)));
  const Zo = () => {
    Vo(Go, (te = !0), te);
    const t = ri.subscribe((e) => {
      1 === e && (t(), Ae("processImage"));
    });
  };
  yn.subscribe((t) => {
    if (!t) return;
    Vo(Go, (te = !0), te);
    const { complete: e } = t;
    e && Vo(Go, (te = !1), te);
  });
  const qo = {
    ...Fe,
    imageFile: mn,
    imageSize: fn,
    imageCropAspectRatio: xn,
    imageCropMinSize: kn,
    imageCropMaxSize: Cn,
    imageCropLimitToImage: bn,
    imageCropRect: Sn,
    imageCropRectOrigin: Pn,
    imageCropRectSnapshot: ho,
    imageCropRectAspectRatio: An,
    imageCropRange: Tn,
    imageRotation: In,
    imageRotationRange: Ln,
    imageFlipX: Bn,
    imageFlipY: zn,
    imageOutputSize: Fn,
    imageColorMatrix: On,
    imageConvolutionMatrix: _n,
    imageGamma: Wn,
    imageVignette: Vn,
    imageNoise: Un,
    imageDecoration: Nn,
    imageAnnotation: Hn,
    imagePreview: Eo,
    imageTransforms: Lo,
    imagePreviewModifiers: Ao,
    history: jo,
    animation: Xo,
    pixelRatio: Ho,
    elasticityMultiplier: Ve,
    scrollElasticity: iu,
    rangeInputElasticity: 5,
    pointerAccuracy: io,
    pointerHoverable: ro,
    env: Uo,
    rootRect: Qn,
    stageRect: oo,
    stageScalar: po,
    utilRect: no,
    presentationScalar: wo,
    rootBackgroundColor: Gn,
    rootForegroundColor: Zn,
    rootLineColor: qn,
    imageOverlayMarkup: ko,
    imagePreviews: Io,
    isInteracting: lo,
    isInteractingFraction: co,
    imageCropRectIntent: go,
    imageCropRectPresentation: mo,
    imageSelectionRect: fo,
    imageSelectionRectIntent: yo,
    imageSelectionRectPresentation: xo,
    imageSelectionRectSnapshot: $o,
    imageScalar: vo,
  };
  delete qo.image;
  const Ko = "util-" + C();
  let Qo = [],
    Jo = Se();
  const ti = (t) => {
      const e = U.getPropertyValue(t);
      return Dc(e);
    },
    ei = (t, e) => {
      const n = ti(t);
      n && 0 !== n[3] && ((n.length = 3), e.set(n));
    },
    ni = () => {
      ei("color", Zn),
        ei("background-color", Gn),
        ei("outline-color", qn),
        (() => {
          const t = ti("--preview-border-color");
          t && qn.set(t);
        })();
    },
    oi = (t) => {
      const e = [];
      return t.forEach((t) => e.push(...ii(t))), e.filter(Boolean);
    },
    ii = (t) => {
      const e = [t];
      if (Mn(t)) {
        let n = X(t.x1, t.y1),
          o = X(t.x2, t.y2);
        if (t.lineStart) {
          const i = so(n, t.strokeWidth, t.strokeColor, t.lineStart, X(o.x - n.x, o.y - n.y));
          (n = i.position || n), e.push(i.shape);
        }
        if (t.lineEnd) {
          const i = so(o, t.strokeWidth, t.strokeColor, t.lineEnd, X(n.x - o.x, n.y - o.y));
          (o = i.position || n), e.push(i.shape);
        }
        t.points = [n, o];
      } else
        Rn(t)
          ? (t.points = [X(t.x1, t.y1), X(t.x2, t.y2), X(t.x3, t.y3)])
          : ((t) => vn(t) && !t.text.length)(t)
          ? (wn(t) &&
              ((t.width = 5),
              (t.height = Xe(t.lineHeight) ? t.lineHeight(t.fontSize) : t.lineHeight)),
            (t.strokeWidth = 1),
            (t.strokeColor = [1, 1, 1, 0.5]),
            (t.backgroundColor = [0, 0, 0, 0.1]))
          : vn(t) &&
            ((t.fontFamily = t.fontFamily || "sans-serif"), (t.fontSize = t.fontSize || 16));
      return e;
    },
    ri = Aa(void 0, { duration: 500 });
  let ai;
  zo(t, ri, (t) => o(27, (he = t)));
  const si = La(void 0, { stiffness: 0.02, damping: 0.5, precision: 0.25 });
  zo(t, si, (t) => o(47, (ge = t)));
  const li = La(void 0, { stiffness: 0.03, damping: 0.4, precision: 0.25 });
  zo(t, li, (t) => o(48, (me = t)));
  const ci = lr([]);
  zo(t, ci, (t) => o(219, (fe = t))), wi("keysPressed", ci);
  const ui = () => ({
      foregroundColor: [...$e],
      lineColor: [...ye],
      utilVisibility: { ...b },
      isInteracting: Et,
      isInteractingFraction: xe,
      rootRect: Mt(bt),
      stageRect: Mt(Vt),
      selectionRect: Mt(ce),
    }),
    di = (t, e, n, o) => ({
      annotationShapes: oi(
        e
          .filter(En)
          .map(hn)
          .map((t) => eo(t, Xt))
      ),
      decorationShapes: oi(
        n
          .filter(En)
          .map(hn)
          .map((e) =>
            ((t, e) =>
              eo(t, {
                x: ce.x / e.scale,
                y: ce.y / e.scale,
                width: ce.width / e.scale,
                height: ce.height / e.scale,
              }))(e, t)
          )
          .map((e) => ((t, e) => (ao(t, ce, e.scale, e.size), t))(e, t))
      ),
      interfaceShapes: oi(o.filter(En)),
    });
  let pi;
  const hi = lr();
  wi("rootPortal", hi), wi("rootRect", Qn);
  return (
    (t.$$set = (t) => {
      "class" in t && o(121, (Ie = t.class)),
        "layout" in t && o(122, (Le = t.layout)),
        "stores" in t && o(123, (Fe = t.stores)),
        "locale" in t && o(2, (Be = t.locale)),
        "id" in t && o(3, (ze = t.id)),
        "util" in t && o(124, (De = t.util)),
        "utils" in t && o(125, (Oe = t.utils)),
        "animations" in t && o(126, (_e = t.animations)),
        "previewUpscale" in t && o(127, (We = t.previewUpscale)),
        "elasticityMultiplier" in t && o(4, (Ve = t.elasticityMultiplier)),
        "willRevert" in t && o(128, (Ue = t.willRevert)),
        "willRenderCanvas" in t && o(5, (Ne = t.willRenderCanvas)),
        "willRenderToolbar" in t && o(129, (He = t.willRenderToolbar)),
        "enableButtonExport" in t && o(130, (je = t.enableButtonExport)),
        "enableButtonRevert" in t && o(131, (Ye = t.enableButtonRevert)),
        "enableNavigateHistory" in t && o(132, (Ge = t.enableNavigateHistory)),
        "enableToolbar" in t && o(6, (Ze = t.enableToolbar)),
        "enableUtils" in t && o(133, (qe = t.enableUtils)),
        "enableButtonClose" in t && o(134, (Ke = t.enableButtonClose)),
        "enableDropImage" in t && o(135, (Qe = t.enableDropImage)),
        "previewImageDataMaxSize" in t && o(136, (Je = t.previewImageDataMaxSize)),
        "layoutDirectionPreference" in t && o(137, (tn = t.layoutDirectionPreference)),
        "imageOrienter" in t && o(138, (en = t.imageOrienter)),
        "pluginComponents" in t && o(139, (nn = t.pluginComponents)),
        "pluginOptions" in t && o(7, (on = t.pluginOptions)),
        "root" in t && o(1, (sn = t.root)),
        "imageSourceToImageData" in t && o(8, (pn = t.imageSourceToImageData));
    }),
    (t.$$.update = () => {
      if (
        (536870912 & t.$$.dirty[3] && o(143, (i = "overlay" === Le)),
        524800 & t.$$.dirty[4] && o(13, (r = qe && !i)),
        129 & t.$$.dirty[0] &&
          on &&
          Object.keys(on).forEach((t) => {
            Object.keys(on[t]).forEach((e) => {
              an[t] && o(0, (an[t][e] = on[t][e]), an);
            });
          }),
        (1 & t.$$.dirty[0]) | (32768 & t.$$.dirty[4]))
      ) {
        let t = !1;
        nn.forEach(([e]) => {
          an[e] || (o(0, (an[e] = {}), an), (t = !0));
        }),
          t && o(141, (ln = [...nn]));
      }
      var e, n, d, p;
      4096 & t.$$.dirty[4] &&
        (a = Je
          ? ((e = Je), (n = un), gt(Math.min(e.width, n.width), Math.min(e.height, n.height)))
          : un),
        1048576 & t.$$.dirty[4] && gn.update(yt[0]),
        16384 & t.$$.dirty[0] && xt && Qn.set(Lt(xt.x, xt.y, xt.width, xt.height)),
        6815744 & t.$$.dirty[4] && bt && i && wt && wt.complete && (xn.set(Wt(bt)), jo.set(vt)),
        (4 & t.$$.dirty[0]) | (131074 & t.$$.dirty[4]) &&
          o(147, (h = Be && ln.length ? Oe || ln.map(([t]) => t) : [])),
        8388608 & t.$$.dirty[4] && o(15, (M = h.length > 1)),
        32768 & t.$$.dirty[0] && (M || Jn.set(Rt())),
        64 & t.$$.dirty[0] && (Ze || to.set(Rt())),
        524296 & t.$$.dirty[4] && uo.set(We || i),
        67108864 & t.$$.dirty[4] && Zt && Io.set([]),
        33554432 & t.$$.dirty[4] && o(151, (s = !Et && !Qa())),
        536870912 & t.$$.dirty[4] && o(152, (l = !qt)),
        402653188 & t.$$.dirty[4] &&
          Vo(Xo, (It = "always" === _e ? s : "never" !== _e && s && l), It),
        1 & t.$$.dirty[5] && o(154, (c = Jt.index > -1)),
        1 & t.$$.dirty[5] && o(156, (u = Jt.index < Jt.length - 1)),
        8519680 & t.$$.dirty[4] && o(158, (m = ln.filter(([t]) => h.includes(t)))),
        8 & t.$$.dirty[5] && o(159, (f = m.length)),
        (4 & t.$$.dirty[0]) | (8388608 & t.$$.dirty[4]) | (8 & t.$$.dirty[5]) &&
          o(
            18,
            ($ =
              h
                .map((t) => {
                  const e = m.find(([e]) => t === e);
                  if (e)
                    return {
                      id: t,
                      view: e[1],
                      tabIcon: Be[t + "Icon"],
                      tabLabel: Be[t + "Label"],
                    };
                })
                .filter(Boolean) || [])
          ),
        (8388609 & t.$$.dirty[4]) | (16 & t.$$.dirty[5]) &&
          o(17, (y = De && "string" == typeof De && h.includes(De) ? De : f > 0 ? h[0] : void 0)),
        131073 & t.$$.dirty[0] && o(160, (x = (y && an[y].tools) || [])),
        786432 & t.$$.dirty[0] &&
          o(19, (b = $.reduce((t, e) => ((t[e.id] = (b && b[e.id]) || 0), t), {}))),
        131072 & t.$$.dirty[0] && o(31, (w = { name: Ko, selected: y })),
        262144 & t.$$.dirty[0] &&
          o(32, (S = $.map((t) => ({ id: t.id, icon: t.tabIcon, label: t.tabLabel })))),
        262144 & t.$$.dirty[0] && o(33, (k = $.map((t) => t.id))),
        268435456 & t.$$.dirty[3] && o(34, (R = vs(["PinturaRoot", "PinturaRootComponent", Ie]))),
        2097152 & t.$$.dirty[4] &&
          o(161, (T = bt && (bt.width > 1e3 ? "wide" : bt.width < 600 ? "narrow" : void 0))),
        2097152 & t.$$.dirty[4] && o(162, (P = bt && (bt.width <= 320 || bt.height <= 460))),
        2097152 & t.$$.dirty[4] &&
          o(163, (E = bt && (bt.height > 1e3 ? "tall" : bt.height < 600 ? "short" : void 0))),
        2 & t.$$.dirty[0] &&
          o(164, (A = sn && sn.parentNode && sn.parentNode.classList.contains("PinturaModal"))),
        (1024 & t.$$.dirty[0]) | (2097152 & t.$$.dirty[4]) | (512 & t.$$.dirty[5]) &&
          o(165, (I = A && bt && Oo > bt.width)),
        (2048 & t.$$.dirty[0]) | (2097152 & t.$$.dirty[4]) | (512 & t.$$.dirty[5]) &&
          o(166, (L = A && bt && _o > bt.height)),
        3072 & t.$$.dirty[5] && o(167, (F = I && L)),
        64 & t.$$.dirty[5] && o(168, (B = "narrow" === T)),
        2105344 & t.$$.dirty[4] &&
          o(
            169,
            ((d = bt),
            (p = tn),
            (z = bt
              ? "auto" === p
                ? d.width > d.height
                  ? "landscape"
                  : "portrait"
                : "horizontal" === p
                ? d.width < 500
                  ? "portrait"
                  : "landscape"
                : "vertical" === p
                ? d.height < 400
                  ? "landscape"
                  : "portrait"
                : void 0
              : "landscape"))
          ),
        16384 & t.$$.dirty[5] && o(35, (O = "landscape" === z)),
        8448 & t.$$.dirty[5] && o(170, (_ = B || "short" === E)),
        (1024 & t.$$.dirty[0]) | (2097152 & t.$$.dirty[4]) &&
          o(171, (W = Jo && bt && Oo === bt.width && !Wo)),
        288 & t.$$.dirty[5] && o(172, (V = x.length && "short" === E)),
        2 & t.$$.dirty[0] && o(173, (U = sn && getComputedStyle(sn))),
        262144 & t.$$.dirty[5] && U && ni(),
        (106560 & t.$$.dirty[0]) | (536870912 & t.$$.dirty[3]) | (3792832 & t.$$.dirty[5]) &&
          Uo.set({
            ...ee,
            layoutMode: Le,
            orientation: z,
            horizontalSpace: T,
            verticalSpace: E,
            isModal: A,
            isCentered: F,
            isCenteredHorizontally: I,
            isCenteredVertically: L,
            isAnimated: It,
            pointerAccuracy: ne,
            pointerHoverable: oe,
            isCompact: _,
            hasSwipeNavigation: W,
            hasLimitedSpace: P,
            hasToolbar: Ze,
            hasNavigation: M && r,
            isIOS: Jo,
          }),
        524288 & t.$$.dirty[5] &&
          o(
            36,
            (N = Object.keys(ee)
              .map((t) => (/^is|has/.test(t) ? (ee[t] ? Ic(t) : void 0) : ee[t]))
              .filter(Boolean)
              .join(" "))
          ),
        (16777216 & t.$$.dirty[4]) | (62914560 & t.$$.dirty[5]) &&
          o(
            37,
            (H = ie
              ? {
                  ...Object.keys(ae)
                    .filter((t) => null != ae[t])
                    .reduce((t, e) => (t = { ...t, ...ae[e] }), {}),
                  ...ie,
                  ...se,
                  backgroundColor: le,
                  size: pt(Pt),
                }
              : void 0)
          ),
        (4 & t.$$.dirty[0]) | (67108864 & t.$$.dirty[5]) &&
          o(20, (Z = Be && j.length && Be.labelSupportError(j))),
        4194304 & t.$$.dirty[4] && o(21, (q = wt && !!wt.error)),
        4194304 & t.$$.dirty[4] && o(22, (K = !wt || (!wt.complete && void 0 === wt.task))),
        4194304 & t.$$.dirty[4] &&
          o(39, (Q = wt && (wt.taskLengthComputable ? wt.taskProgress : 1 / 0))),
        4456448 & t.$$.dirty[4] &&
          (wt && wt.complete
            ? (clearTimeout(ai),
              o(
                142,
                (ai = setTimeout(() => {
                  Vo(To, (ue = !0), ue);
                }, 500))
              ))
            : wt || Vo(To, (ue = !1), ue)),
        (6291456 & t.$$.dirty[0]) | (4194304 & t.$$.dirty[4]) | (134217728 & t.$$.dirty[5]) &&
          o(23, (J = wt && !q && !K && !ue)),
        (33554432 & t.$$.dirty[0]) | (67108864 & t.$$.dirty[4]) && o(24, (nt = !(!Zt || de))),
        268435460 & t.$$.dirty[5] &&
          o(26, (ot = te || (pe && void 0 !== pe.progress && !pe.complete))),
        (4194304 & t.$$.dirty[0]) | (4194304 & t.$$.dirty[4]) &&
          o(40, (it = wt && !(wt.error || K))),
        (4 & t.$$.dirty[0]) | (4194304 & t.$$.dirty[4]) &&
          o(
            41,
            (rt =
              Be &&
              (wt
                ? wt.complete
                  ? Be.statusLabelLoadImage({ progress: 1 / 0, task: "blob-to-bitmap" })
                  : ts(Be.statusLabelLoadImage(wt), wt.error && wt.error.metadata, "{", "}")
                : Be.statusLabelLoadImage(wt)))
          ),
        (4 & t.$$.dirty[0]) | (268435456 & t.$$.dirty[5]) &&
          o(42, (at = pe && Be && Be.statusLabelProcessImage(pe))),
        268435456 & t.$$.dirty[5] &&
          o(43, (st = pe && (pe.taskLengthComputable ? pe.taskProgress : 1 / 0))),
        268435456 & t.$$.dirty[5] && o(44, (lt = pe && !pe.error)),
        268435456 & t.$$.dirty[5] && o(45, (ct = pe && pe.error)),
        99614720 & t.$$.dirty[0] && Vo(ri, (he = Z || K || q || J || nt || ot ? 1 : 0), he),
        134217728 & t.$$.dirty[0] && o(46, (ut = he > 0)),
        134217728 & t.$$.dirty[0] &&
          he <= 0 &&
          (si.set(void 0, { hard: !0 }), li.set(void 0, { hard: !0 })),
        1024 & t.$$.dirty[0] &&
          o(
            49,
            (dt =
              Wo &&
              ((t) => {
                const e = t.touches ? t.touches[0] : t;
                (e.pageX > 10 && e.pageX < Oo - 10) || t.preventDefault();
              }))
          ),
        (4 & t.$$.dirty[0]) | (1073743328 & t.$$.dirty[4]) | (663586 & t.$$.dirty[5]) &&
          o(
            50,
            (ht =
              Be &&
              He(
                [
                  [
                    "div",
                    "alpha",
                    { class: "PinturaNavGroup" },
                    [
                      [
                        "div",
                        "alpha-set",
                        { class: "PinturaNavSet" },
                        [
                          Ke && [
                            "Button",
                            "close",
                            {
                              label: Be.labelClose,
                              icon: Be.iconButtonClose,
                              onclick: () => Ae("close"),
                              hideLabel: !0,
                            },
                          ],
                          Ye && [
                            "Button",
                            "revert",
                            {
                              label: Be.labelButtonRevert,
                              icon: Be.iconButtonRevert,
                              disabled: !c,
                              onclick: Yo,
                              hideLabel: !0,
                            },
                          ],
                        ],
                      ],
                    ],
                  ],
                  [
                    "div",
                    "beta",
                    { class: "PinturaNavGroup PinturaNavGroupFloat" },
                    [
                      Ge && [
                        "div",
                        "history",
                        { class: "PinturaNavSet" },
                        [
                          [
                            "Button",
                            "undo",
                            {
                              label: Be.labelButtonUndo,
                              icon: Be.iconButtonUndo,
                              disabled: !c,
                              onclick: jo.undo,
                              hideLabel: !0,
                            },
                          ],
                          [
                            "Button",
                            "redo",
                            {
                              label: Be.labelButtonRedo,
                              icon: Be.iconButtonRedo,
                              disabled: !u,
                              onclick: jo.redo,
                              hideLabel: !0,
                            },
                          ],
                        ],
                      ],
                      V && [
                        "div",
                        "plugin-tools",
                        { class: "PinturaNavSet" },
                        x.filter(Boolean).map(([t, e, n]) => [t, e, { ...n, hideLabel: !0 }]),
                      ],
                    ],
                  ],
                  [
                    "div",
                    "gamma",
                    { class: "PinturaNavGroup" },
                    [
                      je && [
                        "Button",
                        "export",
                        {
                          label: Be.labelButtonExport,
                          icon: B && Be.iconButtonExport,
                          class: "PinturaButtonExport",
                          onclick: Zo,
                          hideLabel: B,
                        },
                      ],
                    ],
                  ],
                ],
                { ...ee }
              ))
          ),
        16384 & t.$$.dirty[0] && o(184, (mt = xt && xt.width > 0 && xt.height > 0)),
        (4 & t.$$.dirty[0]) | (536870928 & t.$$.dirty[5]) && o(51, (ft = mt && Be && f)),
        4096 & t.$$.dirty[0] && pi && hi.set(pi);
    }),
    o(181, (j = [!_c() && "WebGL"].filter(Boolean))),
    o(
      52,
      ($t = (
        (t, e = !0) =>
        (n) => {
          "ping" === n.type && (e && n.stopPropagation(), t(n.detail.type, n.detail.data));
        }
      )(Ee.pub))
    ),
    [
      an,
      sn,
      Be,
      ze,
      Ve,
      Ne,
      Ze,
      on,
      pn,
      jo,
      Oo,
      _o,
      pi,
      r,
      xt,
      M,
      It,
      y,
      $,
      b,
      Z,
      q,
      K,
      J,
      nt,
      de,
      ot,
      he,
      Qo,
      Xt,
      Kt,
      w,
      S,
      k,
      R,
      O,
      N,
      H,
      ce,
      Q,
      it,
      rt,
      at,
      st,
      lt,
      ct,
      ut,
      ge,
      me,
      dt,
      ht,
      ft,
      $t,
      be,
      ve,
      we,
      ke,
      Ce,
      Me,
      Re,
      Te,
      mn,
      fn,
      $n,
      yn,
      Sn,
      Fn,
      Dn,
      Nn,
      Hn,
      Xn,
      jn,
      Gn,
      Zn,
      qn,
      Kn,
      Qn,
      Jn,
      to,
      no,
      oo,
      io,
      ro,
      lo,
      co,
      uo,
      po,
      ho,
      go,
      fo,
      $o,
      yo,
      xo,
      wo,
      Ro,
      To,
      Eo,
      Ao,
      Io,
      Lo,
      Do,
      Uo,
      Ho,
      Xo,
      Go,
      qo,
      ({ target: t, propertyName: e }) => {
        t === sn && /background|outline/.test(e) && ni();
      },
      ri,
      si,
      li,
      (t) => {
        Vo(si, (ge = Math.round(0.5 * -t.detail.width) - 16), ge),
          Vo(li, (me = t.detail.width), me);
      },
      () => {
        Ae("abortLoadImage");
      },
      () => {
        Ae("abortProcessImage"), Vo(Go, (te = !1), te);
      },
      ci,
      (t) => {
        const { keyCode: e } = t;
        if (229 === e) return;
        const n = new Set([...fe, e]);
        ci.set(Array.from(n));
      },
      ({ keyCode: t }) => {
        ci.set(fe.filter((e) => e !== t));
      },
      () => {
        ci.set([]);
      },
      (t) => {
        var e;
        ((t) => /textarea/i.test(t.nodeName))((e = t.target)) ||
          ((t) => /date|email|number|search|text|url/.test(t.type))(e) ||
          t.preventDefault();
      },
      (t) => {
        Qe && t.detail.files.length && Ae("loadImage", t.detail.files[0]);
      },
      ui,
      di,
      Ie,
      Le,
      Fe,
      De,
      Oe,
      _e,
      We,
      Ue,
      He,
      je,
      Ye,
      Ge,
      qe,
      Ke,
      Qe,
      Je,
      tn,
      en,
      nn,
      rn,
      ln,
      ai,
      i,
      yt,
      bt,
      wt,
      h,
      Pt,
      Et,
      Zt,
      s,
      l,
      qt,
      c,
      Jt,
      u,
      te,
      m,
      f,
      x,
      T,
      P,
      E,
      A,
      I,
      L,
      F,
      B,
      z,
      _,
      W,
      V,
      U,
      ee,
      ne,
      oe,
      ie,
      ae,
      se,
      le,
      j,
      ue,
      pe,
      mt,
      function () {
        o(10, (Oo = window.innerWidth)), o(11, (_o = window.innerHeight));
      },
      (t) => Vo(to, (be = t.detail), be),
      ({ detail: t }) => o(17, (y = t)),
      (t, e) => e.id === t,
      function (e, n) {
        t.$$.not_equal(an[n], e) && ((an[n] = e), o(0, an), o(7, on), o(139, nn));
      },
      (t) => Vo(no, (ve = t.detail), ve),
      (t) => o(28, (Qo = Qo.concat(t))),
      (t) => o(28, (Qo = Qo.filter((e) => e !== t))),
      (t, { detail: e }) => o(19, (b[t] = e), b),
      (t) => Vo(Jn, (Kt = t.detail), Kt),
      (t) => t.id === y,
      function (e) {
        t.$$.not_equal(an[y], e) && ((an[y] = e), o(0, an), o(7, on), o(139, nn));
      },
      (t) => Vo(no, (ve = t.detail), ve),
      () => o(28, (Qo = Qo.concat(y))),
      () => o(28, (Qo = Qo.filter((t) => t !== y))),
      ({ detail: t }) => o(19, (b[y] = t), b),
      (t) => {
        const e = { ...t, ...ui() },
          {
            annotationShapes: n,
            decorationShapes: o,
            interfaceShapes: i,
          } = Ne({ decorationShapes: Me, annotationShapes: Re, interfaceShapes: Te }, e);
        return di(e, n, o, i);
      },
      function (t) {
        Mi[t ? "unshift" : "push"](() => {
          (pi = t), o(12, pi);
        });
      },
      function (t) {
        Mi[t ? "unshift" : "push"](() => {
          (sn = t), o(1, sn);
        });
      },
      (t) => Vo(Kn, (xt = t.detail), xt),
    ]
  );
}
class au extends rr {
  constructor(t) {
    super(),
      ir(
        this,
        t,
        ru,
        ou,
        Lo,
        {
          class: 121,
          layout: 122,
          stores: 123,
          locale: 2,
          id: 3,
          util: 124,
          utils: 125,
          animations: 126,
          previewUpscale: 127,
          elasticityMultiplier: 4,
          willRevert: 128,
          willRenderCanvas: 5,
          willRenderToolbar: 129,
          enableButtonExport: 130,
          enableButtonRevert: 131,
          enableNavigateHistory: 132,
          enableToolbar: 6,
          enableUtils: 133,
          enableButtonClose: 134,
          enableDropImage: 135,
          previewImageDataMaxSize: 136,
          layoutDirectionPreference: 137,
          imageOrienter: 138,
          pluginComponents: 139,
          pluginOptions: 7,
          sub: 140,
          pluginInterface: 0,
          root: 1,
          imageSourceToImageData: 8,
          history: 9,
        },
        [-1, -1, -1, -1, -1, -1, -1, -1, -1]
      );
  }
  get class() {
    return this.$$.ctx[121];
  }
  set class(t) {
    this.$set({ class: t }), Bi();
  }
  get layout() {
    return this.$$.ctx[122];
  }
  set layout(t) {
    this.$set({ layout: t }), Bi();
  }
  get stores() {
    return this.$$.ctx[123];
  }
  set stores(t) {
    this.$set({ stores: t }), Bi();
  }
  get locale() {
    return this.$$.ctx[2];
  }
  set locale(t) {
    this.$set({ locale: t }), Bi();
  }
  get id() {
    return this.$$.ctx[3];
  }
  set id(t) {
    this.$set({ id: t }), Bi();
  }
  get util() {
    return this.$$.ctx[124];
  }
  set util(t) {
    this.$set({ util: t }), Bi();
  }
  get utils() {
    return this.$$.ctx[125];
  }
  set utils(t) {
    this.$set({ utils: t }), Bi();
  }
  get animations() {
    return this.$$.ctx[126];
  }
  set animations(t) {
    this.$set({ animations: t }), Bi();
  }
  get previewUpscale() {
    return this.$$.ctx[127];
  }
  set previewUpscale(t) {
    this.$set({ previewUpscale: t }), Bi();
  }
  get elasticityMultiplier() {
    return this.$$.ctx[4];
  }
  set elasticityMultiplier(t) {
    this.$set({ elasticityMultiplier: t }), Bi();
  }
  get willRevert() {
    return this.$$.ctx[128];
  }
  set willRevert(t) {
    this.$set({ willRevert: t }), Bi();
  }
  get willRenderCanvas() {
    return this.$$.ctx[5];
  }
  set willRenderCanvas(t) {
    this.$set({ willRenderCanvas: t }), Bi();
  }
  get willRenderToolbar() {
    return this.$$.ctx[129];
  }
  set willRenderToolbar(t) {
    this.$set({ willRenderToolbar: t }), Bi();
  }
  get enableButtonExport() {
    return this.$$.ctx[130];
  }
  set enableButtonExport(t) {
    this.$set({ enableButtonExport: t }), Bi();
  }
  get enableButtonRevert() {
    return this.$$.ctx[131];
  }
  set enableButtonRevert(t) {
    this.$set({ enableButtonRevert: t }), Bi();
  }
  get enableNavigateHistory() {
    return this.$$.ctx[132];
  }
  set enableNavigateHistory(t) {
    this.$set({ enableNavigateHistory: t }), Bi();
  }
  get enableToolbar() {
    return this.$$.ctx[6];
  }
  set enableToolbar(t) {
    this.$set({ enableToolbar: t }), Bi();
  }
  get enableUtils() {
    return this.$$.ctx[133];
  }
  set enableUtils(t) {
    this.$set({ enableUtils: t }), Bi();
  }
  get enableButtonClose() {
    return this.$$.ctx[134];
  }
  set enableButtonClose(t) {
    this.$set({ enableButtonClose: t }), Bi();
  }
  get enableDropImage() {
    return this.$$.ctx[135];
  }
  set enableDropImage(t) {
    this.$set({ enableDropImage: t }), Bi();
  }
  get previewImageDataMaxSize() {
    return this.$$.ctx[136];
  }
  set previewImageDataMaxSize(t) {
    this.$set({ previewImageDataMaxSize: t }), Bi();
  }
  get layoutDirectionPreference() {
    return this.$$.ctx[137];
  }
  set layoutDirectionPreference(t) {
    this.$set({ layoutDirectionPreference: t }), Bi();
  }
  get imageOrienter() {
    return this.$$.ctx[138];
  }
  set imageOrienter(t) {
    this.$set({ imageOrienter: t }), Bi();
  }
  get pluginComponents() {
    return this.$$.ctx[139];
  }
  set pluginComponents(t) {
    this.$set({ pluginComponents: t }), Bi();
  }
  get pluginOptions() {
    return this.$$.ctx[7];
  }
  set pluginOptions(t) {
    this.$set({ pluginOptions: t }), Bi();
  }
  get sub() {
    return this.$$.ctx[140];
  }
  get pluginInterface() {
    return this.$$.ctx[0];
  }
  get root() {
    return this.$$.ctx[1];
  }
  set root(t) {
    this.$set({ root: t }), Bi();
  }
  get imageSourceToImageData() {
    return this.$$.ctx[8];
  }
  set imageSourceToImageData(t) {
    this.$set({ imageSourceToImageData: t }), Bi();
  }
  get history() {
    return this.$$.ctx[9];
  }
}
((t) => {
  const [e, n, o, i, r, a, s] = [
    "UmVnRXhw",
    "dGVzdA==",
    "cHFpbmFcLm5sfGxvY2FsaG9zdA==",
    "bG9jYXRpb24=",
    "Y29uc29sZQ==",
    "bG9n",
    "VGhpcyB2ZXJzaW9uIG9mIFBpbnR1cmEgaXMgZm9yIHRlc3RpbmcgcHVycG9zZXMgb25seS4gVmlzaXQgaHR0cHM6Ly9wcWluYS5ubC9waW50dXJhLyB0byBvYnRhaW4gYSBjb21tZXJjaWFsIGxpY2Vuc2Uu",
  ].map(t[[(!1 + "")[1], (!0 + "")[0], (1 + {})[2], (1 + {})[3]].join("")]);
  new t[e](o)[n](t[i]) || t[r][a](s);
})(window);
const su = ["klass", "stores", "isVisible", "isActive", "isActiveFraction", "locale"],
  lu = [
    "history",
    "klass",
    "stores",
    "navButtons",
    "pluginComponents",
    "pluginInterface",
    "pluginOptions",
    "sub",
  ];
let cu;
const uu = new Set([]),
  du = {},
  pu = new Map(),
  hu = (...t) => {
    t.filter((t) => !!t.util).forEach((t) => {
      const [e, n] = t.util;
      pu.has(e) ||
        (pu.set(e, n),
        Ra(n)
          .filter((t) => !su.includes(t))
          .forEach((t) => {
            uu.add(t), du[t] ? du[t].push(e) : (du[t] = [e]);
          }));
    });
  };
var gu = () => {};
const mu = (t) => v(t[0]),
  fu = (t) => !mu(t),
  $u = (t) => t[1],
  yu = (t) => t[3] || [],
  xu = (t, e, n = {}, o = []) => [t, e, n, o],
  bu = (t, e, n, o = (t) => t) => {
    const i = Mu(e, n),
      r = i.findIndex((t) => $u(t) === e);
    var a, s, l;
    (a = i), (s = o(r)), (l = t), a.splice(s, 0, l);
  },
  vu = (t, e, n) => bu(t, e, n),
  wu = (t, e, n) => bu(t, e, n, (t) => t + 1),
  Su = (t, e) => {
    if (fu(e)) return e.push(t);
    e[3] = [...yu(e), t];
  },
  ku = (t, e) => {
    const n = Mu(t, e);
    return el(n, (e) => $u(e) === t), n;
  },
  Cu = (t, e) => (mu(e) ? ($u(e) === t ? e : Cu(t, yu(e))) : e.find((e) => Cu(t, e))),
  Mu = (t, e) =>
    fu(e) ? (e.find((e) => $u(e) === t) ? e : e.find((e) => Mu(t, yu(e)))) : Mu(t, yu(e));
let Ru = null;
var Tu = () => (
    null === Ru &&
      (Ru =
        l() &&
        !("[object OperaMini]" === Object.prototype.toString.call(window.operamini)) &&
        "visibilityState" in document &&
        "Promise" in window &&
        "File" in window &&
        "URL" in window &&
        "createObjectURL" in window.URL &&
        "performance" in window),
    Ru
  ),
  Pu = (t) => Math.round(100 * t);
const Eu = {
    base: 0,
    min: -0.25,
    max: 0.25,
    getLabel: (t) => Pu(t / 0.25),
    getStore: ({ imageColorMatrix: t }) => t,
    getValue: (t) => {
      if (t.brightness) return t.brightness[4];
    },
    setValue: (t, e) =>
      t.update((t) => ({
        ...t,
        brightness: [1, 0, 0, 0, e, 0, 1, 0, 0, e, 0, 0, 1, 0, e, 0, 0, 0, 1, 0],
      })),
  },
  Au = {
    base: 1,
    min: 0.5,
    max: 1.5,
    getLabel: (t) => Pu(2 * (t - 0.5) - 1),
    getStore: ({ imageColorMatrix: t }) => t,
    getValue: (t) => {
      if (t.contrast) return t.contrast[0];
    },
    setValue: (t, e) =>
      t.update((t) => ({
        ...t,
        contrast: [
          e,
          0,
          0,
          0,
          0.5 * (1 - e),
          0,
          e,
          0,
          0,
          0.5 * (1 - e),
          0,
          0,
          e,
          0,
          0.5 * (1 - e),
          0,
          0,
          0,
          1,
          0,
        ],
      })),
  },
  Iu = {
    base: 1,
    min: 0,
    max: 2,
    getLabel: (t) => Pu(t - 1),
    getStore: ({ imageColorMatrix: t }) => t,
    getValue: (t) => {
      if (t.saturation) return (t.saturation[0] - 0.213) / 0.787;
    },
    setValue: (t, e) =>
      t.update((t) => ({
        ...t,
        saturation: [
          0.213 + 0.787 * e,
          0.715 - 0.715 * e,
          0.072 - 0.072 * e,
          0,
          0,
          0.213 - 0.213 * e,
          0.715 + 0.285 * e,
          0.072 - 0.072 * e,
          0,
          0,
          0.213 - 0.213 * e,
          0.715 - 0.715 * e,
          0.072 + 0.928 * e,
          0,
          0,
          0,
          0,
          0,
          1,
          0,
        ],
      })),
  },
  Lu = {
    base: 1,
    min: 0.5,
    max: 1.5,
    getLabel: (t) => Pu(2 * (t - 0.5) - 1),
    getStore: ({ imageColorMatrix: t }) => t,
    getValue: (t) => {
      if (t.exposure) return t.exposure[0];
    },
    setValue: (t, e) =>
      t.update((t) => ({
        ...t,
        exposure: [e, 0, 0, 0, 0, 0, e, 0, 0, 0, 0, 0, e, 0, 0, 0, 0, 0, 1, 0],
      })),
  },
  Fu = {
    base: 1,
    min: 0.15,
    max: 4,
    getLabel: (t) => Pu(t < 1 ? (t - 0.15) / 0.85 - 1 : (t - 1) / 3),
    getStore: ({ imageGamma: t }) => t,
  },
  Bu = { base: 0, min: -1, max: 1, getStore: ({ imageVignette: t }) => t },
  zu = {
    base: 0,
    min: -1,
    max: 1,
    getStore: ({ imageConvolutionMatrix: t }) => t,
    getValue: (t) => {
      if (t.clarity) return 0 === t.clarity[0] ? t.clarity[1] / -1 : t.clarity[1] / -2;
    },
    setValue: (t, e) => {
      t.update((t) => ({
        ...t,
        clarity:
          e >= 0
            ? [0, -1 * e, 0, -1 * e, 1 + 4 * e, -1 * e, 0, -1 * e, 0]
            : [-1 * e, -2 * e, -1 * e, -2 * e, 1 + -3 * e, -2 * e, -1 * e, -2 * e, -1 * e],
      }));
    },
  },
  Du = {
    base: 0,
    min: -1,
    max: 1,
    getStore: ({ imageColorMatrix: t }) => t,
    getValue: (t) => {
      if (!t.temperature) return;
      const e = t.temperature[0];
      return e >= 1 ? (e - 1) / 0.1 : (1 - e) / -0.15;
    },
    setValue: (t, e) =>
      t.update((t) => ({
        ...t,
        temperature:
          e > 0
            ? [1 + 0.1 * e, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1 + 0.1 * -e, 0, 0, 0, 0, 0, 1, 0]
            : [
                1 + 0.15 * e,
                0,
                0,
                0,
                0,
                0,
                1 + 0.05 * e,
                0,
                0,
                0,
                0,
                0,
                1 + 0.15 * -e,
                0,
                0,
                0,
                0,
                0,
                1,
                0,
              ],
      })),
  };
var Ou = {
  finetuneControlConfiguration: {
    gamma: Fu,
    brightness: Eu,
    contrast: Au,
    saturation: Iu,
    exposure: Lu,
    temperature: Du,
    clarity: zu,
    vignette: Bu,
  },
  finetuneOptions: [
    ["brightness", (t) => t.finetuneLabelBrightness],
    ["contrast", (t) => t.finetuneLabelContrast],
    ["saturation", (t) => t.finetuneLabelSaturation],
    ["exposure", (t) => t.finetuneLabelExposure],
    ["temperature", (t) => t.finetuneLabelTemperature],
    ["gamma", (t) => t.finetuneLabelGamma],
    !Qa() && ["clarity", (t) => t.finetuneLabelClarity],
    ["vignette", (t) => t.finetuneLabelVignette],
  ].filter(Boolean),
};
const _u = () => [
    0.75, 0.25, 0.25, 0, 0, 0.25, 0.75, 0.25, 0, 0, 0.25, 0.25, 0.75, 0, 0, 0, 0, 0, 1, 0,
  ],
  Wu = () => [
    1.398, -0.316, 0.065, -0.273, 0.201, -0.051, 1.278, -0.08, -0.273, 0.201, -0.051, 0.119, 1.151,
    -0.29, 0.215, 0, 0, 0, 1, 0,
  ],
  Vu = () => [
    1.073, -0.015, 0.092, -0.115, -0.017, 0.107, 0.859, 0.184, -0.115, -0.017, 0.015, 0.077, 1.104,
    -0.115, -0.017, 0, 0, 0, 1, 0,
  ],
  Uu = () => [1.06, 0, 0, 0, 0, 0, 1.01, 0, 0, 0, 0, 0, 0.93, 0, 0, 0, 0, 0, 1, 0],
  Nu = () => [1.1, 0, 0, 0, -0.1, 0, 1.1, 0, 0, -0.1, 0, 0, 1.2, 0, -0.1, 0, 0, 0, 1, 0],
  Hu = () => [-1, 0, 0, 1, 0, 0, -1, 0, 1, 0, 0, 0, -1, 1, 0, 0, 0, 0, 1, 0],
  Xu = () => [
    0.212, 0.715, 0.114, 0, 0, 0.212, 0.715, 0.114, 0, 0, 0.212, 0.715, 0.114, 0, 0, 0, 0, 0, 1, 0,
  ],
  ju = () => [
    0.15, 1.3, -0.25, 0.1, -0.2, 0.15, 1.3, -0.25, 0.1, -0.2, 0.15, 1.3, -0.25, 0.1, -0.2, 0, 0, 0,
    1, 0,
  ],
  Yu = () => [
    0.163, 0.518, 0.084, -0.01, 0.208, 0.163, 0.529, 0.082, -0.02, 0.21, 0.171, 0.529, 0.084, 0,
    0.214, 0, 0, 0, 1, 0,
  ],
  Gu = () => [
    0.338, 0.991, 0.117, 0.093, -0.196, 0.302, 1.049, 0.096, 0.078, -0.196, 0.286, 1.016, 0.146,
    0.101, -0.196, 0, 0, 0, 1, 0,
  ],
  Zu = () => [
    0.393, 0.768, 0.188, 0, 0, 0.349, 0.685, 0.167, 0, 0, 0.272, 0.533, 0.13, 0, 0, 0, 0, 0, 1, 0,
  ],
  qu = () => [
    0.289, 0.62, 0.185, 0, 0.077, 0.257, 0.566, 0.163, 0, 0.115, 0.2, 0.43, 0.128, 0, 0.188, 0, 0,
    0, 1, 0,
  ],
  Ku = () => [
    0.269, 0.764, 0.172, 0.05, 0.1, 0.239, 0.527, 0.152, 0, 0.176, 0.186, 0.4, 0.119, 0, 0.159, 0,
    0, 0, 1, 0,
  ],
  Qu = () => [
    0.547, 0.764, 0.134, 0, -0.147, 0.281, 0.925, 0.12, 0, -0.135, 0.225, 0.558, 0.33, 0, -0.113, 0,
    0, 0, 1, 0,
  ];
var Ju = {
  filterFunctions: {
    chrome: Wu,
    fade: Vu,
    pastel: _u,
    cold: Nu,
    warm: Uu,
    monoDefault: Xu,
    monoWash: Yu,
    monoNoir: ju,
    monoStark: Gu,
    sepiaDefault: Zu,
    sepiaRust: Ku,
    sepiaBlues: qu,
    sepiaColor: Qu,
  },
  filterOptions: [
    ["Default", [[void 0, (t) => t.labelDefault]]],
    [
      "Classic",
      [
        ["chrome", (t) => t.filterLabelChrome],
        ["fade", (t) => t.filterLabelFade],
        ["cold", (t) => t.filterLabelCold],
        ["warm", (t) => t.filterLabelWarm],
        ["pastel", (t) => t.filterLabelPastel],
      ],
    ],
    [
      "Monochrome",
      [
        ["monoDefault", (t) => t.filterLabelMonoDefault],
        ["monoNoir", (t) => t.filterLabelMonoNoir],
        ["monoStark", (t) => t.filterLabelMonoStark],
        ["monoWash", (t) => t.filterLabelMonoWash],
      ],
    ],
    [
      "Sepia",
      [
        ["sepiaDefault", (t) => t.filterLabelSepiaDefault],
        ["sepiaRust", (t) => t.filterLabelSepiaRust],
        ["sepiaBlues", (t) => t.filterLabelSepiaBlues],
        ["sepiaColor", (t) => t.filterLabelSepiaColor],
      ],
    ],
  ],
};
function td(t) {
  let e, n, o, i, r, a, s, l, c, u, d;
  return {
    c() {
      (e = Qo("div")),
        (n = Qo("input")),
        (o = ei()),
        (i = Qo("div")),
        (r = ei()),
        (a = Qo("div")),
        (s = Qo("div")),
        ai(n, "type", "range"),
        ai(n, "id", t[4]),
        ai(n, "min", t[1]),
        ai(n, "max", t[2]),
        ai(n, "step", t[3]),
        (n.value = t[0]),
        ai(i, "class", "PinturaSliderTrack"),
        ai(i, "style", t[5]),
        ai(s, "class", "PinturaSliderKnob"),
        ai(s, "style", t[6]),
        ai(a, "class", "PinturaSliderKnobController"),
        ai(a, "style", (l = `transform: translateX(${t[9]}%)`)),
        ai(e, "class", (c = vs(["PinturaSlider", t[7]])));
    },
    m(l, c) {
      qo(l, e, c),
        Zo(e, n),
        t[15](n),
        Zo(e, o),
        Zo(e, i),
        Zo(e, r),
        Zo(e, a),
        Zo(a, s),
        u ||
          ((d = [
            oi(n, "pointerdown", t[12]),
            oi(n, "input", t[10]),
            oi(n, "nudge", t[11]),
            Uo(il.call(null, n)),
          ]),
          (u = !0));
    },
    p(t, [o]) {
      16 & o && ai(n, "id", t[4]),
        2 & o && ai(n, "min", t[1]),
        4 & o && ai(n, "max", t[2]),
        8 & o && ai(n, "step", t[3]),
        1 & o && (n.value = t[0]),
        32 & o && ai(i, "style", t[5]),
        64 & o && ai(s, "style", t[6]),
        512 & o && l !== (l = `transform: translateX(${t[9]}%)`) && ai(a, "style", l),
        128 & o && c !== (c = vs(["PinturaSlider", t[7]])) && ai(e, "class", c);
    },
    i: Mo,
    o: Mo,
    d(n) {
      n && Ko(e), t[15](null), (u = !1), Ao(d);
    },
  };
}
function ed(t, e, n) {
  let o,
    i,
    r,
    a,
    s,
    l,
    { min: c = 0 } = e,
    { max: u = 100 } = e,
    { step: d = 1 } = e,
    { id: p } = e,
    { value: h = 0 } = e,
    { trackStyle: g } = e,
    { knobStyle: m } = e,
    { onchange: f } = e,
    { class: $ } = e;
  const y = (t, e) => {
      n(0, (h = Tr(c + (t / e) * o, c, u))), f(h);
    },
    x = (t) => {
      const e = t.pageX - l;
      y(s + e, a);
    },
    b = (t) => {
      (a = void 0),
        document.documentElement.removeEventListener("pointermove", x),
        document.documentElement.removeEventListener("pointerup", b),
        f(h);
    };
  return (
    (t.$$set = (t) => {
      "min" in t && n(1, (c = t.min)),
        "max" in t && n(2, (u = t.max)),
        "step" in t && n(3, (d = t.step)),
        "id" in t && n(4, (p = t.id)),
        "value" in t && n(0, (h = t.value)),
        "trackStyle" in t && n(5, (g = t.trackStyle)),
        "knobStyle" in t && n(6, (m = t.knobStyle)),
        "onchange" in t && n(13, (f = t.onchange)),
        "class" in t && n(7, ($ = t.class));
    }),
    (t.$$.update = () => {
      6 & t.$$.dirty && n(14, (o = u - c)), 16385 & t.$$.dirty && n(9, (i = (h / o) * 100));
    }),
    [
      h,
      c,
      u,
      d,
      p,
      g,
      m,
      $,
      r,
      i,
      (t) => {
        a || (n(0, (h = parseFloat(t.target.value))), f(h));
      },
      (t) => {
        const e = r.offsetWidth;
        y((h / o) * e + t.detail.x, e);
      },
      (t) => {
        t.stopPropagation(),
          (a = r.offsetWidth),
          (s = t.offsetX),
          (l = t.pageX),
          y(s, a),
          document.documentElement.addEventListener("pointermove", x),
          document.documentElement.addEventListener("pointerup", b);
      },
      f,
      o,
      function (t) {
        Mi[t ? "unshift" : "push"](() => {
          (r = t), n(8, r);
        });
      },
    ]
  );
}
class nd extends rr {
  constructor(t) {
    super(),
      ir(this, t, ed, td, Lo, {
        min: 1,
        max: 2,
        step: 3,
        id: 4,
        value: 0,
        trackStyle: 5,
        knobStyle: 6,
        onchange: 13,
        class: 7,
      });
  }
}
var od = (t, e, n) => {
  let o, i, r;
  const a = Math.floor(6 * t),
    s = 6 * t - a,
    l = n * (1 - e),
    c = n * (1 - s * e),
    u = n * (1 - (1 - s) * e);
  switch (a % 6) {
    case 0:
      (o = n), (i = u), (r = l);
      break;
    case 1:
      (o = c), (i = n), (r = l);
      break;
    case 2:
      (o = l), (i = n), (r = u);
      break;
    case 3:
      (o = l), (i = c), (r = n);
      break;
    case 4:
      (o = u), (i = l), (r = n);
      break;
    case 5:
      (o = n), (i = l), (r = c);
  }
  return [o, i, r];
};
function id(t) {
  let e, n, o;
  return {
    c() {
      (e = Qo("div")),
        (n = Qo("span")),
        ai(e, "class", "PinturaColorPreview"),
        ai(e, "title", t[0]),
        ai(e, "style", (o = "--color:" + t[1]));
    },
    m(t, o) {
      qo(t, e, o), Zo(e, n);
    },
    p(t, [n]) {
      1 & n && ai(e, "title", t[0]), 2 & n && o !== (o = "--color:" + t[1]) && ai(e, "style", o);
    },
    i: Mo,
    o: Mo,
    d(t) {
      t && Ko(e);
    },
  };
}
function rd(t, e, n) {
  let o,
    { color: i } = e,
    { title: r } = e;
  return (
    (t.$$set = (t) => {
      "color" in t && n(2, (i = t.color)), "title" in t && n(0, (r = t.title));
    }),
    (t.$$.update = () => {
      4 & t.$$.dirty && n(1, (o = i ? tn(i) : "transparent"));
    }),
    [r, o, i]
  );
}
class ad extends rr {
  constructor(t) {
    super(), ir(this, t, rd, id, Lo, { color: 2, title: 0 });
  }
}
function sd(t) {
  let e, n;
  return {
    c() {
      (e = Qo("span")), (n = ti(t[0]));
    },
    m(t, o) {
      qo(t, e, o), Zo(e, n);
    },
    p(t, e) {
      1 & e[0] && li(n, t[0]);
    },
    d(t) {
      t && Ko(e);
    },
  };
}
function ld(t) {
  let e, n, o, i;
  n = new ad({ props: { color: t[4], title: _l(t[8], t[10]) } });
  let r = !t[9] && sd(t);
  return {
    c() {
      (e = Qo("span")),
        tr(n.$$.fragment),
        (o = ei()),
        r && r.c(),
        ai(e, "slot", "label"),
        ai(e, "class", "PinturaButtonLabel");
    },
    m(t, a) {
      qo(t, e, a), er(n, e, null), Zo(e, o), r && r.m(e, null), (i = !0);
    },
    p(t, o) {
      const i = {};
      16 & o[0] && (i.color = t[4]),
        1280 & o[0] && (i.title = _l(t[8], t[10])),
        n.$set(i),
        t[9] ? r && (r.d(1), (r = null)) : r ? r.p(t, o) : ((r = sd(t)), r.c(), r.m(e, null));
    },
    i(t) {
      i || (Ni(n.$$.fragment, t), (i = !0));
    },
    o(t) {
      Hi(n.$$.fragment, t), (i = !1);
    },
    d(t) {
      t && Ko(e), nr(n), r && r.d();
    },
  };
}
function cd(t) {
  let e, n, o, i, r, a, s, l, c, u, d, p, h;
  c = new nd({
    props: {
      class: "PinturaHuePicker",
      knobStyle: "background-color:" + t[19],
      onchange: t[24],
      value: t[14],
      min: 0,
      max: 1,
      step: 0.001,
    },
  });
  let g = t[11] && ud(t);
  return {
    c() {
      (e = Qo("div")),
        (n = Qo("div")),
        (o = Qo("div")),
        (i = Qo("div")),
        (l = ei()),
        tr(c.$$.fragment),
        (u = ei()),
        g && g.c(),
        ai(i, "role", "button"),
        ai(i, "aria-label", "Saturation slider"),
        ai(i, "class", "PinturaPickerKnob"),
        ai(i, "tabindex", "0"),
        ai(i, "style", (r = `background-color:${t[18]};`)),
        ai(o, "class", "PinturaPickerKnobController"),
        ai(o, "style", (a = `transform:translate(${t[21]}%,${t[22]}%)`)),
        ai(n, "class", "PinturaSaturationPicker"),
        ai(n, "style", (s = "background-color: " + t[19])),
        ai(e, "class", "PinturaPicker");
    },
    m(r, a) {
      qo(r, e, a),
        Zo(e, n),
        Zo(n, o),
        Zo(o, i),
        t[31](n),
        Zo(e, l),
        er(c, e, null),
        Zo(e, u),
        g && g.m(e, null),
        (d = !0),
        p ||
          ((h = [oi(i, "nudge", t[27]), Uo(il.call(null, i)), oi(n, "pointerdown", t[26])]),
          (p = !0));
    },
    p(t, l) {
      (!d || (262144 & l[0] && r !== (r = `background-color:${t[18]};`))) && ai(i, "style", r),
        (!d || (6291456 & l[0] && a !== (a = `transform:translate(${t[21]}%,${t[22]}%)`))) &&
          ai(o, "style", a),
        (!d || (524288 & l[0] && s !== (s = "background-color: " + t[19]))) && ai(n, "style", s);
      const u = {};
      524288 & l[0] && (u.knobStyle = "background-color:" + t[19]),
        16384 & l[0] && (u.value = t[14]),
        c.$set(u),
        t[11]
          ? g
            ? (g.p(t, l), 2048 & l[0] && Ni(g, 1))
            : ((g = ud(t)), g.c(), Ni(g, 1), g.m(e, null))
          : g &&
            (Vi(),
            Hi(g, 1, 1, () => {
              g = null;
            }),
            Ui());
    },
    i(t) {
      d || (Ni(c.$$.fragment, t), Ni(g), (d = !0));
    },
    o(t) {
      Hi(c.$$.fragment, t), Hi(g), (d = !1);
    },
    d(n) {
      n && Ko(e), t[31](null), nr(c), g && g.d(), (p = !1), Ao(h);
    },
  };
}
function ud(t) {
  let e, n;
  return (
    (e = new nd({
      props: {
        class: "PinturaOpacityPicker",
        knobStyle: "background-color: " + t[16],
        trackStyle: `background-image: linear-gradient(to right, ${t[17]}, ${t[18]})`,
        onchange: t[25],
        value: t[15],
        min: 0,
        max: 1,
        step: 0.001,
      },
    })),
    {
      c() {
        tr(e.$$.fragment);
      },
      m(t, o) {
        er(e, t, o), (n = !0);
      },
      p(t, n) {
        const o = {};
        65536 & n[0] && (o.knobStyle = "background-color: " + t[16]),
          393216 & n[0] &&
            (o.trackStyle = `background-image: linear-gradient(to right, ${t[17]}, ${t[18]})`),
          32768 & n[0] && (o.value = t[15]),
          e.$set(o);
      },
      i(t) {
        n || (Ni(e.$$.fragment, t), (n = !0));
      },
      o(t) {
        Hi(e.$$.fragment, t), (n = !1);
      },
      d(t) {
        nr(e, t);
      },
    }
  );
}
function dd(t) {
  let e, n;
  return (
    (e = new pc({
      props: {
        label: "Presets",
        class: vs([
          "PinturaColorPresets",
          t[9] ? "PinturaColorPresetsGrid" : "PinturaColorPresetsList",
        ]),
        hideLabel: !1,
        name: t[1],
        value: t[4],
        optionGroupClass: "PinturaDropdownOptionGroup",
        optionClass: "PinturaDropdownOption",
        options: t[2].map(t[32]),
        selectedIndex: t[3],
        optionMapper: t[7],
        optionLabelClass: t[6],
        onchange: t[33],
        $$slots: {
          option: [gd, ({ option: t }) => ({ 44: t }), ({ option: t }) => [0, t ? 8192 : 0]],
          group: [pd, ({ option: t }) => ({ 44: t }), ({ option: t }) => [0, t ? 8192 : 0]],
        },
        $$scope: { ctx: t },
      },
    })),
    {
      c() {
        tr(e.$$.fragment);
      },
      m(t, o) {
        er(e, t, o), (n = !0);
      },
      p(t, n) {
        const o = {};
        512 & n[0] &&
          (o.class = vs([
            "PinturaColorPresets",
            t[9] ? "PinturaColorPresetsGrid" : "PinturaColorPresetsList",
          ])),
          2 & n[0] && (o.name = t[1]),
          16 & n[0] && (o.value = t[4]),
          1028 & n[0] && (o.options = t[2].map(t[32])),
          8 & n[0] && (o.selectedIndex = t[3]),
          128 & n[0] && (o.optionMapper = t[7]),
          64 & n[0] && (o.optionLabelClass = t[6]),
          (512 & n[0]) | (24576 & n[1]) && (o.$$scope = { dirty: n, ctx: t }),
          e.$set(o);
      },
      i(t) {
        n || (Ni(e.$$.fragment, t), (n = !0));
      },
      o(t) {
        Hi(e.$$.fragment, t), (n = !1);
      },
      d(t) {
        nr(e, t);
      },
    }
  );
}
function pd(t) {
  let e,
    n,
    o = t[44].label + "";
  return {
    c() {
      (e = Qo("span")), (n = ti(o)), ai(e, "slot", "group");
    },
    m(t, o) {
      qo(t, e, o), Zo(e, n);
    },
    p(t, e) {
      8192 & e[1] && o !== (o = t[44].label + "") && li(n, o);
    },
    d(t) {
      t && Ko(e);
    },
  };
}
function hd(t) {
  let e,
    n,
    o = t[44].label + "";
  return {
    c() {
      (e = Qo("span")), (n = ti(o)), ai(e, "class", "PinturaButtonLabel");
    },
    m(t, o) {
      qo(t, e, o), Zo(e, n);
    },
    p(t, e) {
      8192 & e[1] && o !== (o = t[44].label + "") && li(n, o);
    },
    d(t) {
      t && Ko(e);
    },
  };
}
function gd(t) {
  let e, n, o, i;
  n = new ad({ props: { title: t[44].label, color: t[44].value } });
  let r = !t[9] && hd(t);
  return {
    c() {
      (e = Qo("span")), tr(n.$$.fragment), (o = ei()), r && r.c(), ai(e, "slot", "option");
    },
    m(t, a) {
      qo(t, e, a), er(n, e, null), Zo(e, o), r && r.m(e, null), (i = !0);
    },
    p(t, o) {
      const i = {};
      8192 & o[1] && (i.title = t[44].label),
        8192 & o[1] && (i.color = t[44].value),
        n.$set(i),
        t[9] ? r && (r.d(1), (r = null)) : r ? r.p(t, o) : ((r = hd(t)), r.c(), r.m(e, null));
    },
    i(t) {
      i || (Ni(n.$$.fragment, t), (i = !0));
    },
    o(t) {
      Hi(n.$$.fragment, t), (i = !1);
    },
    d(t) {
      t && Ko(e), nr(n), r && r.d();
    },
  };
}
function md(t) {
  let e,
    n,
    o,
    i = t[13] && cd(t),
    r = t[12] && dd(t);
  return {
    c() {
      (e = Qo("div")),
        i && i.c(),
        (n = ei()),
        r && r.c(),
        ai(e, "slot", "details"),
        ai(e, "class", "PinturaColorPickerPanel");
    },
    m(t, a) {
      qo(t, e, a), i && i.m(e, null), Zo(e, n), r && r.m(e, null), (o = !0);
    },
    p(t, o) {
      t[13]
        ? i
          ? (i.p(t, o), 8192 & o[0] && Ni(i, 1))
          : ((i = cd(t)), i.c(), Ni(i, 1), i.m(e, n))
        : i &&
          (Vi(),
          Hi(i, 1, 1, () => {
            i = null;
          }),
          Ui()),
        t[12]
          ? r
            ? (r.p(t, o), 4096 & o[0] && Ni(r, 1))
            : ((r = dd(t)), r.c(), Ni(r, 1), r.m(e, null))
          : r &&
            (Vi(),
            Hi(r, 1, 1, () => {
              r = null;
            }),
            Ui());
    },
    i(t) {
      o || (Ni(i), Ni(r), (o = !0));
    },
    o(t) {
      Hi(i), Hi(r), (o = !1);
    },
    d(t) {
      t && Ko(e), i && i.d(), r && r.d();
    },
  };
}
function fd(t) {
  let e, n;
  return (
    (e = new Ll({
      props: {
        buttonClass: vs(["PinturaColorPickerButton", t[5]]),
        $$slots: { details: [md], label: [ld] },
        $$scope: { ctx: t },
      },
    })),
    {
      c() {
        tr(e.$$.fragment);
      },
      m(t, o) {
        er(e, t, o), (n = !0);
      },
      p(t, n) {
        const o = {};
        32 & n[0] && (o.buttonClass = vs(["PinturaColorPickerButton", t[5]])),
          (8388575 & n[0]) | (16384 & n[1]) && (o.$$scope = { dirty: n, ctx: t }),
          e.$set(o);
      },
      i(t) {
        n || (Ni(e.$$.fragment, t), (n = !0));
      },
      o(t) {
        Hi(e.$$.fragment, t), (n = !1);
      },
      d(t) {
        nr(e, t);
      },
    }
  );
}
function $d(t, e, n) {
  let o,
    i,
    r,
    a,
    s,
    l,
    c,
    u,
    d,
    p,
    h,
    { label: g } = e,
    { name: m } = e,
    { options: f = [] } = e,
    { selectedIndex: $ = -1 } = e,
    { value: y } = e,
    { buttonClass: x } = e,
    { optionLabelClass: b } = e,
    { optionMapper: v } = e,
    { onchange: w } = e,
    { title: S } = e,
    { hidePresetLabel: k = !0 } = e,
    { locale: C } = e,
    { enableOpacity: M = !0 } = e,
    { enablePresets: R = !0 } = e,
    { enablePicker: T = !0 } = e;
  const P = (t, e) => {
    if (((c = [t[0], t[1], t[2]]), e)) {
      let e = ((t, e, n) => {
        let o = Math.max(t, e, n),
          i = o - Math.min(t, e, n),
          r = i && (o == t ? (e - n) / i : o == e ? 2 + (n - t) / i : 4 + (t - e) / i);
        return [(60 * (r < 0 ? r + 6 : r)) / 360, o && i / o, o];
      })(...c);
      n(14, (r = e[0])), n(29, (a = e[1])), n(30, (s = e[2])), n(15, (l = Ue(t[3]) ? t[3] : 1));
    }
    n(16, (u = tn(t))),
      n(17, (d = tn([...c, 0]))),
      n(18, (p = tn([...c, 1]))),
      n(19, (h = tn(od(r, 1, 1))));
  };
  y && P(y, !0);
  const E = () => {
      const t = [...od(r, a, s), l];
      P(t), w(t);
    },
    A = (t) => {
      const e = 3 === t.length ? [...t, 1] : t;
      P(e, !0), w(e);
    },
    I = (t, e) => {
      const o = Tr(t.x / e.width, 0, 1),
        i = Tr(t.y / e.height, 0, 1);
      var r;
      (r = 1 - i), n(29, (a = o)), n(30, (s = r)), 0 === l && n(15, (l = 1)), E();
    };
  let L, F, B, z;
  const D = (t) => {
      const e = et(j(t), z);
      I(tt(Y(B), e), F);
    },
    O = (t) => {
      (F = void 0),
        document.documentElement.removeEventListener("pointermove", D),
        document.documentElement.removeEventListener("pointerup", O);
    };
  return (
    (t.$$set = (t) => {
      "label" in t && n(0, (g = t.label)),
        "name" in t && n(1, (m = t.name)),
        "options" in t && n(2, (f = t.options)),
        "selectedIndex" in t && n(3, ($ = t.selectedIndex)),
        "value" in t && n(4, (y = t.value)),
        "buttonClass" in t && n(5, (x = t.buttonClass)),
        "optionLabelClass" in t && n(6, (b = t.optionLabelClass)),
        "optionMapper" in t && n(7, (v = t.optionMapper)),
        "onchange" in t && n(28, (w = t.onchange)),
        "title" in t && n(8, (S = t.title)),
        "hidePresetLabel" in t && n(9, (k = t.hidePresetLabel)),
        "locale" in t && n(10, (C = t.locale)),
        "enableOpacity" in t && n(11, (M = t.enableOpacity)),
        "enablePresets" in t && n(12, (R = t.enablePresets)),
        "enablePicker" in t && n(13, (T = t.enablePicker));
    }),
    (t.$$.update = () => {
      536870912 & t.$$.dirty[0] && n(21, (o = 100 * a)),
        1073741824 & t.$$.dirty[0] && n(22, (i = 100 - 100 * s));
    }),
    [
      g,
      m,
      f,
      $,
      y,
      x,
      b,
      v,
      S,
      k,
      C,
      M,
      R,
      T,
      r,
      l,
      u,
      d,
      p,
      h,
      L,
      o,
      i,
      A,
      (t) => {
        n(14, (r = t)), 0 === l && n(15, (l = 1)), E();
      },
      (t) => {
        n(15, (l = t)), E();
      },
      (t) => {
        t.stopPropagation(),
          (F = gt(L.offsetWidth, L.offsetHeight)),
          (B = ((t) => X(t.offsetX, t.offsetY))(t)),
          (z = j(t)),
          I(B, F),
          document.documentElement.addEventListener("pointermove", D),
          document.documentElement.addEventListener("pointerup", O);
      },
      (t) => {
        F = gt(L.offsetWidth, L.offsetHeight);
        const e = (o / 100) * F.width,
          n = (i / 100) * F.height;
        I({ x: e + t.detail.x, y: n + t.detail.y }, F);
      },
      w,
      a,
      s,
      function (t) {
        Mi[t ? "unshift" : "push"](() => {
          (L = t), n(20, L);
        });
      },
      ([t, e]) => [t, Xe(e) ? e(C) : e],
      (t) => A(t.value),
    ]
  );
}
class yd extends rr {
  constructor(t) {
    super(),
      ir(
        this,
        t,
        $d,
        fd,
        Lo,
        {
          label: 0,
          name: 1,
          options: 2,
          selectedIndex: 3,
          value: 4,
          buttonClass: 5,
          optionLabelClass: 6,
          optionMapper: 7,
          onchange: 28,
          title: 8,
          hidePresetLabel: 9,
          locale: 10,
          enableOpacity: 11,
          enablePresets: 12,
          enablePicker: 13,
        },
        [-1, -1]
      );
  }
}
var xd = (t) => t.charAt(0).toUpperCase() + t.slice(1);
let bd = null;
var vd = () => {
  if (null === bd)
    if (l())
      try {
        bd = !1 === document.fonts.check("16px TestNonExistingFont");
      } catch (t) {
        bd = !1;
      }
    else bd = !1;
  return bd;
};
const wd = (t, e) => (n) => n[e ? `${e}${xd(t)}` : t],
  Sd = (t) => [t, "" + t],
  kd = (t, e) => (n) => [t[n], wd(n, e)],
  Cd = [1, 0.2549, 0.2118],
  Md = [1, 1, 1, 0],
  Rd = {
    path: () => ({ points: [], disableErase: !1 }),
    eraser: () => ({ eraseRadius: 0 }),
    line: () => ({ x1: 0, y1: 0, x2: 0, y2: 0, disableErase: !1 }),
    rectangle: () => ({ x: 0, y: 0, width: 0, height: 0 }),
    ellipse: () => ({ x: 0, y: 0, rx: 0, ry: 0 }),
    text: () => ({ x: 0, y: 0, text: "Text" }),
  },
  Td = (t, e = {}, n = { position: "relative" }) => {
    if (!Rd[t]) return;
    return [{ ...Rd[t](), ...e }, n];
  },
  Pd = (t) => ({
    sharpie: Td("path", { strokeWidth: "0.5%", strokeColor: [...Cd] }),
    eraser: Td("eraser"),
    line: Td("line", { strokeColor: [...Cd], strokeWidth: "0.5%" }),
    arrow: Td("line", {
      lineStart: "none",
      lineEnd: "arrow-solid",
      strokeColor: [...Cd],
      strokeWidth: "0.5%",
    }),
    rectangle: Td("rectangle", { strokeColor: [...Md], backgroundColor: [...Cd] }),
    ellipse: Td("ellipse", { strokeColor: [...Md], backgroundColor: [...Cd] }),
    text: Td("text", { color: [...Cd], fontSize: "2%" }),
    ...t,
  }),
  Ed = (t, e, n) => [t, e || wd(t, "shapeLabelTool"), { icon: wd(t, "shapeIconTool"), ...n }],
  Ad = (t = ["sharpie", "eraser", "line", "arrow", "rectangle", "ellipse", "text", "preset"]) =>
    t
      .map((t) =>
        v(t)
          ? Ed(t)
          : Array.isArray(t)
          ? y(t[1])
            ? Ed(t[0], void 0, t[1])
            : Ed(t[0], t[1], t[2])
          : void 0
      )
      .filter(Boolean),
  Id = () => ({
    transparent: [1, 1, 1, 0],
    white: [1, 1, 1],
    silver: [0.8667, 0.8667, 0.8667],
    gray: [0.6667, 0.6667, 0.6667],
    black: [0, 0, 0],
    navy: [0, 0.1216, 0.2471],
    blue: [0, 0.4549, 0.851],
    aqua: [0.498, 0.8588, 1],
    teal: [0.2235, 0.8, 0.8],
    olive: [0.2392, 0.6, 0.4392],
    green: [0.1804, 0.8, 0.251],
    yellow: [1, 0.8627, 0],
    orange: [1, 0.5216, 0.1059],
    red: [1, 0.2549, 0.2118],
    maroon: [0.5216, 0.0784, 0.2941],
    fuchsia: [0.9412, 0.0706, 0.7451],
    purple: [0.6941, 0.051, 0.7882],
  }),
  Ld = () => [16, 18, 20, 24, 30, 36, 48, 64, 72, 96, 144],
  Fd = () => ({
    extraSmall: "2%",
    small: "4%",
    mediumSmall: "8%",
    medium: "10%",
    mediumLarge: "15%",
    large: "20%",
    extraLarge: "25%",
  }),
  Bd = () => [1, 2, 3, 4, 6, 8, 12, 16, 20, 24, 32, 48],
  zd = () => ({
    extraSmall: "0.25%",
    small: "0.5%",
    mediumSmall: "1%",
    medium: "1.75%",
    mediumLarge: "2.5%",
    large: "3.5%",
    extraLarge: "5%",
  }),
  Dd = () => ["bar", "arrow", "arrowSolid", "circle", "circleSolid", "square", "squareSolid"],
  Od = () => [
    ["Helvetica, Arial, Verdana, 'Droid Sans', sans-serif", "Sans Serif"],
    ["'Arial Black', 'Avenir-Black', 'Arial Bold'", "Black"],
    ["'Arial Narrow', 'Futura-CondensedMedium'", "Narrow"],
    ["'Trebuchet MS'", "Humanist"],
    ["Georgia, 'Avenir-Black', 'Times New Roman', 'Droid Serif', serif", "Serif"],
    ["Palatino", "Old-Style"],
    ["'Times New Roman', 'TimesNewRomanPSMT'", "Transitional"],
    ["Menlo, Monaco, 'Lucida Console', monospace", "Monospaced"],
    ["'Courier New', monospace", "Slab Serif"],
  ],
  _d = () => ["left", "center", "right"],
  Wd = () => [
    ["normal", "bold"],
    ["italic", "normal"],
    ["italic", "bold"],
  ],
  Vd = (t) => Object.keys(t).map(kd(t, "shapeTitleColor")),
  Ud = (t) => t.map(Sd),
  Nd = (t) => Object.keys(t).map(kd(t, "labelSize")),
  Hd = (t) => t.map(Sd),
  Xd = (t) => Object.keys(t).map(kd(t, "labelSize")),
  jd = (t) => [...t],
  Yd = (t) =>
    t.map((t) => [
      t,
      (e) =>
        e[
          "shapeLabelFontStyle" +
            t
              .filter((t) => "normal" !== t)
              .map(xd)
              .join("")
        ],
    ]),
  Gd = (t) =>
    t.map((t) => [
      Ic(t),
      (e) => e["shapeTitleLineDecoration" + xd(t)],
      { icon: (e) => e["shapeIconLineDecoration" + xd(t)] },
    ]),
  Zd = (t) =>
    t.map((t) => [
      t,
      (e) => e["shapeTitleTextAlign" + xd(t)],
      { hideLabel: !0, icon: (e) => e["shapeIconTextAlign" + xd(t)] },
    ]),
  qd = (t, e) => {
    const { defaultKey: n, defaultOptions: o } = e || {};
    let i = [];
    return n && (i[0] = [void 0, (t) => t[n], { ...o }]), [...i, ...t];
  },
  Kd = (t) =>
    t
      .split(",")
      .map((t) => t.trim())
      .some((t) => document.fonts.check("16px " + t)),
  Qd = (t) => [
    Sc,
    {
      title: (t) => t.shapeTitleFontFamily,
      onload: ({ options: t = [] }) => {
        vd() &&
          t
            .map(([t]) => t)
            .filter(Boolean)
            .filter((t) => !Kd(t))
            .forEach((t) => {
              const e = "PinturaFontTest-" + t.replace(/[^a-zA-Z0-9]+/g, "").toLowerCase();
              document.getElementById(e) ||
                document.body.appendChild(
                  p("span", {
                    textContent: " ",
                    id: e,
                    style: `font-family:${t};font-size:0;color:transparent;`,
                  })
                );
            });
      },
      ondestroy: () => {
        if (!vd()) return;
        document.querySelectorAll(".PinturaFontTest").forEach((t) => t.remove());
      },
      optionLabelStyle: (t) => "font-family: " + t,
      options: qd(t, { defaultKey: "labelDefault" }),
      optionFilter: (t) => {
        if (!vd()) return !0;
        const [e] = t;
        if (!e) return !0;
        return Kd(e);
      },
    },
  ],
  Jd = (t) => [yd, { title: (t) => t.shapeTitleBackgroundColor, options: qd(t) }],
  tp = (t, e = {}) => [
    yd,
    {
      title: (t) => t.shapeTitleStrokeColor,
      options: qd(t),
      buttonClass: "PinturaColorPickerButtonStroke",
      onchange: (t, n) => {
        let o = n.strokeWidth;
        (Ue(o) || v(o) ? parseFloat(o) : 0) > 0 ||
          (n.strokeWidth = (e && e.defaultStrokeWidth) || "0.5%");
      },
    },
  ],
  ep = (t) => [
    Sc,
    {
      title: (t) => t.shapeTitleStrokeWidth,
      options: (e) =>
        He(e, "backgroundColor") ? qd(t, { defaultKey: "shapeLabelStrokeNone" }) : qd(t),
    },
  ],
  np = (t, e, n) => [
    Sc,
    {
      title: (t) => t[e],
      options: qd(t, {
        defaultKey: "labelNone",
        defaultOptions: {
          icon: '<g stroke="currentColor" stroke-linecap="round" stroke-width=".125em"><path d="M5,12 H14"/></g>',
        },
      }),
      optionIconStyle: n,
    },
  ],
  op = (t) => np(t, "shapeTitleLineStart", "transform: scaleX(-1)"),
  ip = (t) => np(t, "shapeTitleLineEnd"),
  rp = (t) => [yd, { title: (t) => t.shapeTitleTextColor, options: qd(t) }],
  ap = (t) => [
    Sc,
    {
      title: (t) => t.shapeTitleFontStyle,
      optionLabelStyle: (t) => t && `font-style:${t[0]};font-weight:${t[1]}`,
      options: qd(t, { defaultKey: "shapeLabelFontStyleNormal" }),
    },
  ],
  sp = (t) => [
    Sc,
    { title: (t) => t.shapeTitleFontSize, options: qd(t, { defaultKey: "labelDefault" }) },
  ],
  lp = (t) => [pc, { title: (t) => t.shapeTitleTextAlign, options: qd(t) }],
  cp = (t) => [
    Sc,
    { title: (t) => t.shapeTitleLineHeight, options: qd(t, { defaultKey: "labelAuto" }) },
  ],
  up = (t = {}) => {
    const {
      colorOptions: e = Vd(Id()),
      strokeWidthOptions: n = Xd(zd()),
      lineEndStyleOptions: o = Gd(Dd()),
      fontFamilyOptions: i = jd(Od()),
      fontStyleOptions: r = Yd(Wd()),
      fontSizeOptions: a = Nd(Fd()),
      textAlignOptions: s = Zd(_d()),
    } = t;
    return {
      backgroundColor: e && Jd(e),
      strokeColor: e && tp(e),
      strokeWidth: n && ep(n),
      lineStart: o && op(o),
      lineEnd: o && ip(o),
      color: e && rp(e),
      fontFamily: i && Qd(i),
      fontStyle_fontWeight: r && ap(r),
      fontSize: a && sp(a),
      textAlign: s && lp(s),
    };
  };
function dp(t) {
  let e, n, o, i;
  const r = t[3].default,
    a = Do(r, t, t[2], null);
  return {
    c() {
      (e = Qo("div")), a && a.c(), ai(e, "class", t[0]);
    },
    m(r, s) {
      qo(r, e, s),
        a && a.m(e, null),
        (n = !0),
        o || ((i = [oi(e, "measure", t[1]), Uo(Ha.call(null, e))]), (o = !0));
    },
    p(t, [o]) {
      a && a.p && 4 & o && _o(a, r, t, t[2], o, null, null), (!n || 1 & o) && ai(e, "class", t[0]);
    },
    i(t) {
      n || (Ni(a, t), (n = !0));
    },
    o(t) {
      Hi(a, t), (n = !1);
    },
    d(t) {
      t && Ko(e), a && a.d(t), (o = !1), Ao(i);
    },
  };
}
function pp(t, e, n) {
  let { $$slots: o = {}, $$scope: i } = e;
  const r = vi();
  let { class: a = null } = e;
  return (
    (t.$$set = (t) => {
      "class" in t && n(0, (a = t.class)), "$$scope" in t && n(2, (i = t.$$scope));
    }),
    [a, ({ detail: t }) => r("measure", t), i, o]
  );
}
class hp extends rr {
  constructor(t) {
    super(), ir(this, t, pp, dp, Lo, { class: 0 });
  }
}
const gp = (t) => ({}),
  mp = (t) => ({}),
  fp = (t) => ({}),
  $p = (t) => ({}),
  yp = (t) => ({}),
  xp = (t) => ({});
function bp(t) {
  let e, n;
  const o = t[4].header,
    i = Do(o, t, t[3], xp);
  return {
    c() {
      (e = Qo("div")), i && i.c(), ai(e, "class", "PinturaUtilHeader");
    },
    m(t, o) {
      qo(t, e, o), i && i.m(e, null), (n = !0);
    },
    p(t, e) {
      i && i.p && 8 & e && _o(i, o, t, t[3], e, yp, xp);
    },
    i(t) {
      n || (Ni(i, t), (n = !0));
    },
    o(t) {
      Hi(i, t), (n = !1);
    },
    d(t) {
      t && Ko(e), i && i.d(t);
    },
  };
}
function vp(t) {
  let e, n;
  const o = t[4].footer,
    i = Do(o, t, t[3], mp);
  return {
    c() {
      (e = Qo("div")), i && i.c(), ai(e, "class", "PinturaUtilFooter");
    },
    m(t, o) {
      qo(t, e, o), i && i.m(e, null), (n = !0);
    },
    p(t, e) {
      i && i.p && 8 & e && _o(i, o, t, t[3], e, gp, mp);
    },
    i(t) {
      n || (Ni(i, t), (n = !0));
    },
    o(t) {
      Hi(i, t), (n = !1);
    },
    d(t) {
      t && Ko(e), i && i.d(t);
    },
  };
}
function wp(t) {
  let e,
    n,
    o,
    i,
    r,
    a,
    s = t[1] && bp(t);
  const l = t[4].main,
    c = Do(l, t, t[3], $p),
    u =
      c ||
      (function (t) {
        let e, n;
        return (
          (e = new hp({ props: { class: "PinturaStage" } })),
          e.$on("measure", t[5]),
          {
            c() {
              tr(e.$$.fragment);
            },
            m(t, o) {
              er(e, t, o), (n = !0);
            },
            p: Mo,
            i(t) {
              n || (Ni(e.$$.fragment, t), (n = !0));
            },
            o(t) {
              Hi(e.$$.fragment, t), (n = !1);
            },
            d(t) {
              nr(e, t);
            },
          }
        );
      })(t);
  let d = t[2] && vp(t);
  return {
    c() {
      s && s.c(),
        (e = ei()),
        (n = Qo("div")),
        u && u.c(),
        (o = ei()),
        d && d.c(),
        (i = ei()),
        (r = ni()),
        ai(n, "class", "PinturaUtilMain");
    },
    m(l, c) {
      s && s.m(l, c),
        qo(l, e, c),
        qo(l, n, c),
        u && u.m(n, null),
        t[6](n),
        qo(l, o, c),
        d && d.m(l, c),
        qo(l, i, c),
        qo(l, r, c),
        (a = !0);
    },
    p(t, [n]) {
      t[1]
        ? s
          ? (s.p(t, n), 2 & n && Ni(s, 1))
          : ((s = bp(t)), s.c(), Ni(s, 1), s.m(e.parentNode, e))
        : s &&
          (Vi(),
          Hi(s, 1, 1, () => {
            s = null;
          }),
          Ui()),
        c && c.p && 8 & n && _o(c, l, t, t[3], n, fp, $p),
        t[2]
          ? d
            ? (d.p(t, n), 4 & n && Ni(d, 1))
            : ((d = vp(t)), d.c(), Ni(d, 1), d.m(i.parentNode, i))
          : d &&
            (Vi(),
            Hi(d, 1, 1, () => {
              d = null;
            }),
            Ui());
    },
    i(t) {
      a || (Ni(s), Ni(u, t), Ni(d), Ni(false), (a = !0));
    },
    o(t) {
      Hi(s), Hi(u, t), Hi(d), Hi(false), (a = !1);
    },
    d(a) {
      s && s.d(a),
        a && Ko(e),
        a && Ko(n),
        u && u.d(a),
        t[6](null),
        a && Ko(o),
        d && d.d(a),
        a && Ko(i),
        a && Ko(r);
    },
  };
}
function Sp(t, e, n) {
  let { $$slots: o = {}, $$scope: i } = e,
    { hasHeader: r = !!e.$$slots.header } = e,
    { hasFooter: a = !!e.$$slots.footer } = e,
    { root: s } = e;
  return (
    (t.$$set = (t) => {
      n(7, (e = To(To({}, e), Wo(t)))),
        "hasHeader" in t && n(1, (r = t.hasHeader)),
        "hasFooter" in t && n(2, (a = t.hasFooter)),
        "root" in t && n(0, (s = t.root)),
        "$$scope" in t && n(3, (i = t.$$scope));
    }),
    (e = Wo(e)),
    [
      s,
      r,
      a,
      i,
      o,
      function (e) {
        ki(t, e);
      },
      function (t) {
        Mi[t ? "unshift" : "push"](() => {
          (s = t), n(0, s);
        });
      },
    ]
  );
}
class kp extends rr {
  constructor(t) {
    super(), ir(this, t, Sp, wp, Lo, { hasHeader: 1, hasFooter: 2, root: 0 });
  }
}
var Cp = (t, e, n) => (t - e) / (n - e);
function Mp(t) {
  let e, n;
  return {
    c() {
      (e = Qo("div")),
        ai(e, "class", "PinturaRangeInputMeter"),
        ai(
          e,
          "style",
          (n = `transform: translateX(${t[9].x - t[10].x}px) translateY(${t[9].y - t[10].y}px)`)
        );
    },
    m(n, o) {
      qo(n, e, o), (e.innerHTML = t[7]);
    },
    p(t, o) {
      128 & o[0] && (e.innerHTML = t[7]),
        512 & o[0] &&
          n !==
            (n = `transform: translateX(${t[9].x - t[10].x}px) translateY(${
              t[9].y - t[10].y
            }px)`) &&
          ai(e, "style", n);
    },
    d(t) {
      t && Ko(e);
    },
  };
}
function Rp(t) {
  let e,
    n,
    o,
    i,
    r,
    a,
    s,
    l,
    c,
    u,
    d,
    p,
    h = t[9] && Mp(t);
  return {
    c() {
      (e = Qo("div")),
        (n = Qo("span")),
        (o = ti(t[4])),
        (i = ei()),
        (r = Qo("button")),
        (a = ti(t[1])),
        (l = ei()),
        (c = Qo("div")),
        h && h.c(),
        ai(n, "class", "PinturaRangeInputValue"),
        ai(r, "class", "PinturaRangeInputReset"),
        ai(r, "type", "button"),
        (r.disabled = s = t[0] === t[3]),
        ai(c, "class", "PinturaRangeInputInner"),
        ai(c, "style", t[8]),
        ai(c, "data-value-limited", t[6]),
        ai(e, "class", "PinturaRangeInput"),
        ai(e, "tabindex", "0");
    },
    m(s, g) {
      qo(s, e, g),
        Zo(e, n),
        Zo(n, o),
        Zo(e, i),
        Zo(e, r),
        Zo(r, a),
        Zo(e, l),
        Zo(e, c),
        h && h.m(c, null),
        d ||
          ((p = [
            oi(r, "click", t[15]),
            oi(c, "interactionstart", t[11]),
            oi(c, "interactionupdate", t[13]),
            oi(c, "interactionend", t[14]),
            oi(c, "interactionrelease", t[12]),
            Uo(ol.call(null, c, { inertia: !0 })),
            oi(c, "measure", t[32]),
            Uo(Ha.call(null, c)),
            oi(e, "wheel", t[17], { passive: !1 }),
            oi(e, "nudge", t[18]),
            Uo((u = il.call(null, e, (t[2] = "horizontal")))),
          ]),
          (d = !0));
    },
    p(t, e) {
      16 & e[0] && li(o, t[4]),
        2 & e[0] && li(a, t[1]),
        9 & e[0] && s !== (s = t[0] === t[3]) && (r.disabled = s),
        t[9] ? (h ? h.p(t, e) : ((h = Mp(t)), h.c(), h.m(c, null))) : h && (h.d(1), (h = null)),
        256 & e[0] && ai(c, "style", t[8]),
        64 & e[0] && ai(c, "data-value-limited", t[6]),
        u && Io(u.update) && 4 & e[0] && u.update.call(null, (t[2] = "horizontal"));
    },
    i: Mo,
    o: Mo,
    d(t) {
      t && Ko(e), h && h.d(), (d = !1), Ao(p);
    },
  };
}
function Tp(t, e, o) {
  let i,
    r,
    a,
    s,
    l,
    c,
    u,
    d,
    { labelReset: p = "Reset" } = e,
    { direction: h = "x" } = e,
    { min: g = 0 } = e,
    { max: m = 1 } = e,
    { base: f = g } = e,
    { value: $ = 0 } = e,
    { valueLabel: y = 0 } = e,
    { valueMin: x } = e,
    { valueMax: b } = e,
    { oninputstart: v = n } = e,
    { oninputmove: w = n } = e,
    { oninputend: S = n } = e,
    { elasticity: k = 0 } = e;
  const C = (t, e, n) => Math.ceil((t - n) / e) * e + n;
  let M, R, T;
  const P = { x: 2, y: 0 },
    E = (t, e, n) => `M ${t - n} ${e} a ${n} ${n} 0 1 0 0 -1`;
  let A,
    I = void 0,
    L = !1,
    F = { snap: !1, elastic: !1 };
  const B = (t, e, n) => {
      const o = t[h] + e[h],
        i = Tr(o, A[1][h], A[0][h]),
        r = k ? i + rl(o - i, k) : i,
        a = n.elastic ? r : i,
        s = X(0, 0);
      return (s[h] = a), z.set(s, { hard: n.snap }), Tr(O(s, h), g, m);
    },
    z = La();
  zo(t, z, (t) => o(9, (d = t)));
  const D = (t, e) => {
      const n = 0.5 * (M[e] - s[e]) - (Cp(t, g, m) * s[e] - 0.5 * s[e]);
      return { x: "x" === e ? n : 0, y: "y" === e ? n : 0 };
    },
    O = (t, e) => {
      const n = -(t[e] - 0.5 * M[e]) / s[e];
      return g + n * i;
    };
  z.subscribe((t) => {
    t && I && w(Tr(O(t, h), g, m));
  });
  const _ = (t) => {
    const e = [D(null != x ? x : g, h), D(null != b ? b : m, h)],
      n = { x: "x" === h ? d.x + t : 0, y: "y" === h ? d.y + t : 0 },
      o = Tr(n[h], e[1][h], e[0][h]),
      i = { ...d, [h]: o };
    Vo(z, (d = i), d);
    const r = Tr(O(i, h), g, m);
    v(), w(r), S(r);
  };
  return (
    (t.$$set = (t) => {
      "labelReset" in t && o(1, (p = t.labelReset)),
        "direction" in t && o(2, (h = t.direction)),
        "min" in t && o(19, (g = t.min)),
        "max" in t && o(20, (m = t.max)),
        "base" in t && o(3, (f = t.base)),
        "value" in t && o(0, ($ = t.value)),
        "valueLabel" in t && o(4, (y = t.valueLabel)),
        "valueMin" in t && o(21, (x = t.valueMin)),
        "valueMax" in t && o(22, (b = t.valueMax)),
        "oninputstart" in t && o(23, (v = t.oninputstart)),
        "oninputmove" in t && o(24, (w = t.oninputmove)),
        "oninputend" in t && o(25, (S = t.oninputend)),
        "elasticity" in t && o(26, (k = t.elasticity));
    }),
    (t.$$.update = () => {
      if (
        (1572864 & t.$$.dirty[0] && o(28, (i = m - g)),
        2621440 & t.$$.dirty[0] && o(29, (r = null != x ? Math.max(x, g) : g)),
        5242880 & t.$$.dirty[0] && o(30, (a = null != b ? Math.min(b, m) : m)),
        1572872 & t.$$.dirty[0] && o(31, (l = Cp(f, g, m))),
        (32 & t.$$.dirty[0]) | (1 & t.$$.dirty[1]) && M)
      ) {
        const t = 0.5 * M.y;
        let e,
          n = 40 * l,
          i = "",
          r = M.y,
          a = "";
        for (let o = 0; o <= 40; o++) {
          const r = P.x + 10 * o,
            s = t;
          (i += E(r, s, o % 5 == 0 ? 2 : 0.75) + " "),
            (e = r + P.x),
            o === n && (a = `<path d="M${r} ${s - 4} l2 3 l-2 -1 l-2 1 z"/>`);
        }
        o(
          7,
          (R = `<svg width="${e}" height="${r}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${e} ${r}" aria-hidden="true" focusable="false">\n        ${a}\n        <rect rx="4" ry="4" y="${
            t - 4
          }"" height="8"/>\n        <path fill-rule="evenodd" d="${i.trim()}"/></svg>`)
        ),
          o(27, (T = { x: e - 2 * P.x, y: r }));
      }
      134217760 & t.$$.dirty[0] && (s = M && T),
        1612185600 & t.$$.dirty[0] && o(6, (c = r !== g || a !== m)),
        1610612800 & t.$$.dirty[0] &&
          o(
            8,
            (u = c
              ? (function (t, e) {
                  const n = 1 / 40,
                    o = Cp(t, g, m),
                    i = Cp(e, g, m);
                  return `--range-mask-from:${100 * vr(C(o, n, 0) - 0.0125)}%;--range-mask-to:${
                    100 * vr(C(i, n, 0) - 0.0125)
                  }%`;
                })(r, a)
              : "")
          ),
        268435493 & t.$$.dirty[0] && i && M && M.x && M.y && z.set(D($, h));
    }),
    [
      $,
      p,
      h,
      f,
      y,
      M,
      c,
      R,
      u,
      d,
      P,
      () => {
        (L = !1), (I = Bo(z)), (A = [D(null != x ? x : g, h), D(null != b ? b : m, h)]), v();
      },
      () => {
        L = !0;
      },
      ({ detail: t }) => {
        (F.snap = !L), (F.elastic = !L), B(I, t.translation, F);
      },
      ({ detail: t }) => {
        (F.snap = !1), (F.elastic = !1);
        const e = B(I, t.translation, F);
        if (((I = void 0), (A = void 0), Math.abs(e - f) < 0.01)) return S(f);
        S(e);
      },
      () => {
        o(0, ($ = Tr(f, r, a))), v(), S($);
      },
      z,
      (t) => {
        t.preventDefault(), t.stopPropagation();
        const e = 8 * ll(t);
        _(e);
      },
      ({ detail: t }) => {
        _(8 * t[h]);
      },
      g,
      m,
      x,
      b,
      v,
      w,
      S,
      k,
      T,
      i,
      r,
      a,
      l,
      (t) => o(5, (M = ((t) => X(t.width, t.height))(t.detail))),
    ]
  );
}
class Pp extends rr {
  constructor(t) {
    super(),
      ir(
        this,
        t,
        Tp,
        Rp,
        Lo,
        {
          labelReset: 1,
          direction: 2,
          min: 19,
          max: 20,
          base: 3,
          value: 0,
          valueLabel: 4,
          valueMin: 21,
          valueMax: 22,
          oninputstart: 23,
          oninputmove: 24,
          oninputend: 25,
          elasticity: 26,
        },
        [-1, -1]
      );
  }
}
function Ep(t) {
  let e, n, o, i, r;
  const a = t[7].default,
    s = Do(a, t, t[6], null);
  return {
    c() {
      (e = Qo("div")),
        (n = Qo("div")),
        s && s.c(),
        ai(n, "class", "PinturaToolbarInner"),
        ai(e, "class", "PinturaToolbar"),
        ai(e, "data-layout", t[1]),
        ai(e, "data-overflow", t[0]);
    },
    m(a, l) {
      qo(a, e, l),
        Zo(e, n),
        s && s.m(n, null),
        (o = !0),
        i ||
          ((r = [
            oi(n, "measure", t[3]),
            Uo(Ha.call(null, n)),
            oi(e, "measure", t[2]),
            Uo(Ha.call(null, e)),
          ]),
          (i = !0));
    },
    p(t, [n]) {
      s && s.p && 64 & n && _o(s, a, t, t[6], n, null, null),
        (!o || 2 & n) && ai(e, "data-layout", t[1]),
        (!o || 1 & n) && ai(e, "data-overflow", t[0]);
    },
    i(t) {
      o || (Ni(s, t), (o = !0));
    },
    o(t) {
      Hi(s, t), (o = !1);
    },
    d(t) {
      t && Ko(e), s && s.d(t), (i = !1), Ao(r);
    },
  };
}
function Ap(t, e, n) {
  let o,
    i,
    { $$slots: r = {}, $$scope: a } = e,
    s = 0,
    l = 0,
    c = 0;
  const u = () => {
    n(0, (i = "compact" === o && s > c ? "overflow" : void 0));
  };
  return (
    (t.$$set = (t) => {
      "$$scope" in t && n(6, (a = t.$$scope));
    }),
    (t.$$.update = () => {
      48 & t.$$.dirty && n(1, (o = l > c ? "compact" : "default"));
    }),
    [
      i,
      o,
      ({ detail: t }) => {
        const { width: e } = t;
        n(5, (c = e)), u();
      },
      ({ detail: t }) => {
        const { width: e } = t;
        e > l && n(4, (l = e)), (s = e), i || u();
      },
      l,
      c,
      a,
      r,
    ]
  );
}
class Ip extends rr {
  constructor(t) {
    super(), ir(this, t, Ap, Ep, Lo, {});
  }
}
const Lp = {
    Top: "t",
    Right: "r",
    Bottom: "b",
    Left: "l",
    TopLeft: "tl",
    TopRight: "tr",
    BottomRight: "br",
    BottomLeft: "bl",
  },
  {
    Top: Fp,
    Right: Bp,
    Bottom: zp,
    Left: Dp,
    TopLeft: Op,
    TopRight: _p,
    BottomRight: Wp,
    BottomLeft: Vp,
  } = Lp;
var Up = {
  [Fp]: (t) => ({ x: t.x, y: t.y }),
  [_p]: (t) => ({ x: t.x + t.width, y: t.y }),
  [Bp]: (t) => ({ x: t.x + t.width, y: t.y }),
  [Wp]: (t) => ({ x: t.x + t.width, y: t.y + t.height }),
  [zp]: (t) => ({ x: t.x, y: t.y + t.height }),
  [Vp]: (t) => ({ x: t.x, y: t.y + t.height }),
  [Dp]: (t) => ({ x: t.x, y: t.y }),
  [Op]: (t) => ({ x: t.x, y: t.y }),
};
function Np(t, e, n) {
  const o = t.slice();
  return (
    (o[11] = e[n].key),
    (o[12] = e[n].translate),
    (o[13] = e[n].scale),
    (o[14] = e[n].type),
    (o[15] = e[n].opacity),
    o
  );
}
function Hp(t, e) {
  let n, o, i, r, a, s, l, c;
  return {
    key: t,
    first: null,
    c() {
      (n = Qo("div")),
        ai(n, "role", "button"),
        ai(n, "aria-label", (o = `Drag ${e[14]} ${e[11]}`)),
        ai(n, "tabindex", (i = "edge" === e[14] ? -1 : 0)),
        ai(n, "class", "PinturaRectManipulator"),
        ai(n, "data-direction", (r = e[11])),
        ai(n, "data-shape", (a = "" + ("edge" === e[14] ? "edge" : "" + e[0]))),
        ai(
          n,
          "style",
          (s = `transform: translate3d(${e[12].x}px, ${e[12].y}px, 0) scale(${e[13].x}, ${e[13].y}); opacity: ${e[15]}`)
        ),
        (this.first = n);
    },
    m(t, o) {
      qo(t, n, o),
        l ||
          ((c = [
            oi(n, "nudge", function () {
              Io(e[5](e[11])) && e[5](e[11]).apply(this, arguments);
            }),
            Uo(il.call(null, n)),
            oi(n, "interactionstart", function () {
              Io(e[4]("resizestart", e[11])) && e[4]("resizestart", e[11]).apply(this, arguments);
            }),
            oi(n, "interactionupdate", function () {
              Io(e[4]("resizemove", e[11])) && e[4]("resizemove", e[11]).apply(this, arguments);
            }),
            oi(n, "interactionend", function () {
              Io(e[4]("resizeend", e[11])) && e[4]("resizeend", e[11]).apply(this, arguments);
            }),
            Uo(ol.call(null, n)),
          ]),
          (l = !0));
    },
    p(t, l) {
      (e = t),
        2 & l && o !== (o = `Drag ${e[14]} ${e[11]}`) && ai(n, "aria-label", o),
        2 & l && i !== (i = "edge" === e[14] ? -1 : 0) && ai(n, "tabindex", i),
        2 & l && r !== (r = e[11]) && ai(n, "data-direction", r),
        3 & l && a !== (a = "" + ("edge" === e[14] ? "edge" : "" + e[0])) && ai(n, "data-shape", a),
        2 & l &&
          s !==
            (s = `transform: translate3d(${e[12].x}px, ${e[12].y}px, 0) scale(${e[13].x}, ${e[13].y}); opacity: ${e[15]}`) &&
          ai(n, "style", s);
    },
    d(t) {
      t && Ko(n), (l = !1), Ao(c);
    },
  };
}
function Xp(t) {
  let e,
    n = [],
    o = new Map(),
    i = t[1];
  const r = (t) => t[11];
  for (let e = 0; e < i.length; e += 1) {
    let a = Np(t, i, e),
      s = r(a);
    o.set(s, (n[e] = Hp(s, a)));
  }
  return {
    c() {
      for (let t = 0; t < n.length; t += 1) n[t].c();
      e = ni();
    },
    m(t, o) {
      for (let e = 0; e < n.length; e += 1) n[e].m(t, o);
      qo(t, e, o);
    },
    p(t, [a]) {
      51 & a && ((i = t[1]), (n = qi(n, a, r, 1, t, i, o, e.parentNode, Gi, Hp, e, Np)));
    },
    i: Mo,
    o: Mo,
    d(t) {
      for (let e = 0; e < n.length; e += 1) n[e].d(t);
      t && Ko(e);
    },
  };
}
function jp(t, e, n) {
  let o,
    i,
    r,
    { rect: a = null } = e,
    { visible: s = !1 } = e,
    { style: l } = e;
  const c = La(void 0, { precision: 1e-4, stiffness: 0.2, damping: 0.4 });
  zo(t, c, (t) => n(8, (i = t)));
  const u = La(0, { precision: 0.001 });
  zo(t, u, (t) => n(9, (r = t)));
  const d = vi();
  return (
    (t.$$set = (t) => {
      "rect" in t && n(6, (a = t.rect)),
        "visible" in t && n(7, (s = t.visible)),
        "style" in t && n(0, (l = t.style));
    }),
    (t.$$.update = () => {
      128 & t.$$.dirty && c.set(s ? 1 : 0.5),
        128 & t.$$.dirty && u.set(s ? 1 : 0),
        832 & t.$$.dirty &&
          n(
            1,
            (o = Object.keys(Lp).map((t, e) => {
              const n = Lp[t],
                o = Up[n](a),
                s = 1 === n.length ? "edge" : "corner",
                l = "corner" === s;
              return {
                key: n,
                type: s,
                scale: {
                  x: /^(t|b)$/.test(n) ? a.width : l ? Tr(i, 0.5, 1.25) : 1,
                  y: /^(r|l)$/.test(n) ? a.height : l ? Tr(i, 0.5, 1.25) : 1,
                },
                translate: { x: o.x, y: o.y },
                opacity: r,
              };
            }))
          );
    }),
    [
      l,
      o,
      c,
      u,
      (t, e) =>
        ({ detail: n }) =>
          d(t, { direction: e, translation: n && n.translation }),
      (t) =>
        ({ detail: e }) => {
          d("resizestart", { direction: t, translation: { x: 0, y: 0 } }),
            d("resizemove", { direction: t, translation: e }),
            d("resizeend", { direction: t, translation: { x: 0, y: 0 } });
        },
      a,
      s,
      i,
      r,
    ]
  );
}
class Yp extends rr {
  constructor(t) {
    super(), ir(this, t, jp, Xp, Lo, { rect: 6, visible: 7, style: 0 });
  }
}
var Gp = (t) => {
    function e(e, n) {
      t.dispatchEvent(new CustomEvent(e, { detail: n }));
    }
    const n = (n) => {
        n.preventDefault(),
          t.addEventListener("gesturechange", o),
          t.addEventListener("gestureend", i),
          e("gesturedown");
      },
      o = (t) => {
        t.preventDefault(), e("gestureupdate", t.scale);
      },
      i = (t) => {
        e("gestureup", t.scale), t.preventDefault(), r();
      },
      r = () => {
        t.removeEventListener("gesturechange", o), t.removeEventListener("gestureend", i);
      };
    return (
      t.addEventListener("gesturestart", n),
      {
        destroy: () => {
          r(), t.removeEventListener("gesturestart", n);
        },
      }
    );
  },
  Zp = (t) => X(t.clientX, t.clientY),
  qp = { [Fp]: zp, [Bp]: Dp, [zp]: Fp, [Dp]: Bp, [Op]: Wp, [_p]: Vp, [Wp]: Op, [Vp]: _p },
  Kp = {
    [Fp]: [0.5, 0],
    [Bp]: [1, 0.5],
    [zp]: [0.5, 1],
    [Dp]: [0, 0.5],
    [Op]: [0, 0],
    [_p]: [1, 0],
    [Wp]: [1, 1],
    [Vp]: [0, 1],
  },
  Qp = (t) => {
    const e = t === Dp || t === Bp,
      n = t === Fp || t === zp;
    return [
      t === Bp || t === _p || t === Wp,
      t === Dp || t === Vp || t === Op,
      t === Fp || t === _p || t === Op,
      t === zp || t === Wp || t === Vp,
      e,
      n,
      e || n,
    ];
  };
const Jp = (t, e, n, o) => {
  const { aspectRatio: i, minSize: r, maxSize: a } = o,
    s = e === Bp || e === _p || e === Wp,
    l = e === Dp || e === Vp || e === Op,
    c = e === Fp || e === _p || e === Op,
    u = e === zp || e === Wp || e === Vp,
    d = e === Dp || e === Bp,
    p = e === Fp || e === zp,
    h = Mt(n);
  s ? ((h.x = t.x), (h.width -= t.x)) : l && (h.width = t.x),
    u ? ((h.y = t.y), (h.height -= t.y)) : c && (h.height = t.y);
  const g = ((m = Math.min(h.width, a.width)), (f = Math.min(h.height, a.height)), Ct(0, 0, m, f));
  var m, f;
  if (i)
    if (d) {
      const e = Math.min(t.y, n.height - t.y);
      g.height = Math.min(2 * e, g.height);
    } else if (p) {
      const e = Math.min(t.x, n.width - t.x);
      g.width = Math.min(2 * e, g.width);
    }
  const $ = i ? pt(Yt(g, i)) : g,
    y = i ? pt(jt(Tt(r), i)) : r;
  let x, b, v, w;
  s ? (x = t.x) : l && (b = t.x),
    u ? (v = t.y) : c && (w = t.y),
    s ? (b = x + y.width) : l && (x = b - y.width),
    u ? (w = v + y.height) : c && (v = w - y.height),
    d
      ? ((v = t.y - 0.5 * y.height), (w = t.y + 0.5 * y.height))
      : p && ((x = t.x - 0.5 * y.width), (b = t.x + 0.5 * y.width));
  const S = Et(X(x, v), X(b, w));
  s ? (b = x + $.width) : l && (x = b - $.width),
    u ? (w = v + $.height) : c && (v = w - $.height),
    d
      ? ((v = t.y - 0.5 * $.height), (w = t.y + 0.5 * $.height))
      : p && ((x = t.x - 0.5 * $.width), (b = t.x + 0.5 * $.width));
  return { inner: S, outer: Et(X(x, v), X(b, w)) };
};
var th = (t, e, n = {}) => {
    const { target: o, translate: i } = e,
      { aspectRatio: r } = n,
      a = Kp[qp[o]],
      s = tt(Mt(t), X(a[0] * t.width, a[1] * t.height)),
      l = Kp[o],
      c = tt(Mt(t), X(l[0] * t.width, l[1] * t.height)),
      [u, d, p, h, g, m, f] = Qp(o);
    let $ = i.x,
      y = i.y;
    g ? (y = 0) : m && ($ = 0);
    let [x, b, v, w] = Gt(t);
    if (
      (u ? (w = s.x) : d && (b = s.x),
      h ? (x = s.y) : p && (v = s.y),
      u ? (b = c.x + $) : d && (w = c.x + $),
      h ? (v = c.y + y) : p && (x = c.y + y),
      r)
    )
      if (f) {
        let t = b - w,
          e = v - x;
        g
          ? ((e = t / r), (x = s.y - 0.5 * e), (v = s.y + 0.5 * e))
          : m && ((t = e * r), (w = s.x - 0.5 * t), (b = s.x + 0.5 * t));
      } else {
        const t = X(c.x + $ - s.x, c.y + y - s.y);
        o === _p
          ? ((t.x = Math.max(0, t.x)), (t.y = Math.min(0, t.y)))
          : o === Wp
          ? ((t.x = Math.max(0, t.x)), (t.y = Math.max(0, t.y)))
          : o === Vp
          ? ((t.x = Math.min(0, t.x)), (t.y = Math.max(0, t.y)))
          : o === Op && ((t.x = Math.min(0, t.x)), (t.y = Math.min(0, t.y)));
        const e = q(t),
          n = X(r, 1),
          i = nt(K(n), e);
        o === _p
          ? ((b = s.x + i.x), (x = s.y - i.y))
          : o === Wp
          ? ((b = s.x + i.x), (v = s.y + i.y))
          : o === Vp
          ? ((w = s.x - i.x), (v = s.y + i.y))
          : o === Op && ((w = s.x - i.x), (x = s.y - i.y));
      }
    return Lt(w, x, b - w, v - x);
  },
  eh = (t) => (180 * t) / Math.PI;
function nh(t) {
  let e, n, o;
  return (
    (n = new Pp({
      props: {
        elasticity: t[5],
        min: t[7],
        max: t[8],
        value: t[12],
        valueMin: t[0],
        valueMax: t[1],
        labelReset: t[6],
        base: t[11],
        valueLabel: Math.round(eh(t[12])) + "°",
        oninputstart: t[2],
        oninputmove: t[14],
        oninputend: t[15],
      },
    })),
    {
      c() {
        (e = Qo("div")), tr(n.$$.fragment), ai(e, "class", "PinturaImageRotator");
      },
      m(t, i) {
        qo(t, e, i), er(n, e, null), (o = !0);
      },
      p(t, [e]) {
        const o = {};
        32 & e && (o.elasticity = t[5]),
          128 & e && (o.min = t[7]),
          256 & e && (o.max = t[8]),
          4096 & e && (o.value = t[12]),
          1 & e && (o.valueMin = t[0]),
          2 & e && (o.valueMax = t[1]),
          64 & e && (o.labelReset = t[6]),
          2048 & e && (o.base = t[11]),
          4096 & e && (o.valueLabel = Math.round(eh(t[12])) + "°"),
          4 & e && (o.oninputstart = t[2]),
          1544 & e && (o.oninputmove = t[14]),
          1552 & e && (o.oninputend = t[15]),
          n.$set(o);
      },
      i(t) {
        o || (Ni(n.$$.fragment, t), (o = !0));
      },
      o(t) {
        Hi(n.$$.fragment, t), (o = !1);
      },
      d(t) {
        t && Ko(e), nr(n);
      },
    }
  );
}
function oh(t, e, o) {
  let i, r, a, s, l, c;
  const u = Math.PI / 2,
    d = Math.PI / 4;
  let { rotation: p } = e,
    { valueMin: h } = e,
    { valueMax: g } = e,
    { oninputstart: m = n } = e,
    { oninputmove: f = n } = e,
    { oninputend: $ = n } = e,
    { elasticity: y = 0 } = e,
    { labelReset: x } = e;
  return (
    (t.$$set = (t) => {
      "rotation" in t && o(13, (p = t.rotation)),
        "valueMin" in t && o(0, (h = t.valueMin)),
        "valueMax" in t && o(1, (g = t.valueMax)),
        "oninputstart" in t && o(2, (m = t.oninputstart)),
        "oninputmove" in t && o(3, (f = t.oninputmove)),
        "oninputend" in t && o(4, ($ = t.oninputend)),
        "elasticity" in t && o(5, (y = t.elasticity)),
        "labelReset" in t && o(6, (x = t.labelReset));
    }),
    (t.$$.update = () => {
      384 & t.$$.dirty && o(11, (a = i + 0.5 * (r - i))),
        8192 & t.$$.dirty && o(9, (s = Math.sign(p))),
        8192 & t.$$.dirty && o(10, (l = Math.round(Math.abs(p) / u) * u)),
        9728 & t.$$.dirty && o(12, (c = p - s * l));
    }),
    o(7, (i = 1e-9 - d)),
    o(8, (r = d - 1e-9)),
    [h, g, m, f, $, y, x, i, r, s, l, a, c, p, (t) => f(s * l + t), (t) => $(s * l + t)]
  );
}
class ih extends rr {
  constructor(t) {
    super(),
      ir(this, t, oh, nh, Lo, {
        rotation: 13,
        valueMin: 0,
        valueMax: 1,
        oninputstart: 2,
        oninputmove: 3,
        oninputend: 4,
        elasticity: 5,
        labelReset: 6,
      });
  }
}
function rh(t) {
  let e, n, o, i, r;
  return {
    c() {
      (e = Qo("div")),
        (n = Qo("p")),
        (o = ti(t[0])),
        (i = ti(" × ")),
        (r = ti(t[1])),
        ai(e, "class", "PinturaImageInfo");
    },
    m(t, a) {
      qo(t, e, a), Zo(e, n), Zo(n, o), Zo(n, i), Zo(n, r);
    },
    p(t, [e]) {
      1 & e && li(o, t[0]), 2 & e && li(r, t[1]);
    },
    i: Mo,
    o: Mo,
    d(t) {
      t && Ko(e);
    },
  };
}
function ah(t, e, n) {
  let { width: o } = e,
    { height: i } = e;
  return (
    (t.$$set = (t) => {
      "width" in t && n(0, (o = t.width)), "height" in t && n(1, (i = t.height));
    }),
    [o, i]
  );
}
class sh extends rr {
  constructor(t) {
    super(), ir(this, t, ah, rh, Lo, { width: 0, height: 1 });
  }
}
function lh(t) {
  let e, n;
  return (
    (e = new Ec({ props: { items: t[0] } })),
    {
      c() {
        tr(e.$$.fragment);
      },
      m(t, o) {
        er(e, t, o), (n = !0);
      },
      p(t, n) {
        const o = {};
        1 & n[0] && (o.items = t[0]), e.$set(o);
      },
      i(t) {
        n || (Ni(e.$$.fragment, t), (n = !0));
      },
      o(t) {
        Hi(e.$$.fragment, t), (n = !1);
      },
      d(t) {
        nr(e, t);
      },
    }
  );
}
function ch(t) {
  let e, n, o;
  return (
    (n = new Ip({ props: { $$slots: { default: [lh] }, $$scope: { ctx: t } } })),
    {
      c() {
        (e = Qo("div")), tr(n.$$.fragment), ai(e, "slot", "header");
      },
      m(t, i) {
        qo(t, e, i), er(n, e, null), (o = !0);
      },
      p(t, e) {
        const o = {};
        (1 & e[0]) | (1073741824 & e[5]) && (o.$$scope = { dirty: e, ctx: t }), n.$set(o);
      },
      i(t) {
        o || (Ni(n.$$.fragment, t), (o = !0));
      },
      o(t) {
        Hi(n.$$.fragment, t), (o = !1);
      },
      d(t) {
        t && Ko(e), nr(n);
      },
    }
  );
}
function uh(t) {
  let e, n;
  return (
    (e = new tl({
      props: {
        onclick: t[79],
        label: t[4].cropLabelButtonRecenter,
        icon: t[4].cropIconButtonRecenter,
        class: "PinturaButtonCenter",
        disabled: !t[9],
        hideLabel: !0,
        style: `opacity: ${t[27]}; transform: translate3d(${t[28].x}px, ${t[28].y}px, 0)`,
      },
    })),
    {
      c() {
        tr(e.$$.fragment);
      },
      m(t, o) {
        er(e, t, o), (n = !0);
      },
      p(t, n) {
        const o = {};
        16 & n[0] && (o.label = t[4].cropLabelButtonRecenter),
          16 & n[0] && (o.icon = t[4].cropIconButtonRecenter),
          512 & n[0] && (o.disabled = !t[9]),
          402653184 & n[0] &&
            (o.style = `opacity: ${t[27]}; transform: translate3d(${t[28].x}px, ${t[28].y}px, 0)`),
          e.$set(o);
      },
      i(t) {
        n || (Ni(e.$$.fragment, t), (n = !0));
      },
      o(t) {
        Hi(e.$$.fragment, t), (n = !1);
      },
      d(t) {
        nr(e, t);
      },
    }
  );
}
function dh(t) {
  let e, n;
  return (
    (e = new Yp({ props: { rect: t[10], visible: t[11], style: t[2] } })),
    e.$on("resizestart", t[59]),
    e.$on("resizemove", t[60]),
    e.$on("resizeend", t[61]),
    {
      c() {
        tr(e.$$.fragment);
      },
      m(t, o) {
        er(e, t, o), (n = !0);
      },
      p(t, n) {
        const o = {};
        1024 & n[0] && (o.rect = t[10]),
          2048 & n[0] && (o.visible = t[11]),
          4 & n[0] && (o.style = t[2]),
          e.$set(o);
      },
      i(t) {
        n || (Ni(e.$$.fragment, t), (n = !0));
      },
      o(t) {
        Hi(e.$$.fragment, t), (n = !1);
      },
      d(t) {
        nr(e, t);
      },
    }
  );
}
function ph(t) {
  let e, n;
  return (
    (e = new sh({ props: { width: Math.round(t[7].width), height: Math.round(t[7].height) } })),
    {
      c() {
        tr(e.$$.fragment);
      },
      m(t, o) {
        er(e, t, o), (n = !0);
      },
      p(t, n) {
        const o = {};
        128 & n[0] && (o.width = Math.round(t[7].width)),
          128 & n[0] && (o.height = Math.round(t[7].height)),
          e.$set(o);
      },
      i(t) {
        n || (Ni(e.$$.fragment, t), (n = !0));
      },
      o(t) {
        Hi(e.$$.fragment, t), (n = !1);
      },
      d(t) {
        nr(e, t);
      },
    }
  );
}
function hh(t) {
  let e,
    n,
    o,
    i,
    r,
    a,
    s,
    l,
    c = t[17] && t[18] && uh(t),
    u = t[17] && dh(t),
    d = t[16] && ph(t);
  return {
    c() {
      (e = Qo("div")),
        (n = Qo("div")),
        c && c.c(),
        (o = ei()),
        u && u.c(),
        (r = ei()),
        d && d.c(),
        ai(n, "class", "PinturaStage"),
        ai(e, "slot", "main");
    },
    m(p, h) {
      qo(p, e, h),
        Zo(e, n),
        c && c.m(n, null),
        Zo(n, o),
        u && u.m(n, null),
        t[139](n),
        Zo(e, r),
        d && d.m(e, null),
        (a = !0),
        s ||
          ((l = [
            oi(n, "measure", t[137]),
            Uo(Ha.call(null, n)),
            oi(
              n,
              "wheel",
              function () {
                Io(t[3] && t[78]) && (t[3] && t[78]).apply(this, arguments);
              },
              { passive: !1 }
            ),
            oi(n, "interactionstart", t[65]),
            oi(n, "interactionupdate", t[66]),
            oi(n, "interactionrelease", t[68]),
            oi(n, "interactionend", t[67]),
            Uo(
              (i = ol.call(null, n, {
                drag: !0,
                pinch: t[3],
                inertia: !0,
                matchTarget: !0,
                getEventPosition: t[140],
              }))
            ),
            oi(n, "gesturedown", t[75]),
            oi(n, "gestureupdate", t[76]),
            oi(n, "gestureup", t[77]),
            Uo(Gp.call(null, n)),
          ]),
          (s = !0));
    },
    p(r, a) {
      (t = r)[17] && t[18]
        ? c
          ? (c.p(t, a), 393216 & a[0] && Ni(c, 1))
          : ((c = uh(t)), c.c(), Ni(c, 1), c.m(n, o))
        : c &&
          (Vi(),
          Hi(c, 1, 1, () => {
            c = null;
          }),
          Ui()),
        t[17]
          ? u
            ? (u.p(t, a), 131072 & a[0] && Ni(u, 1))
            : ((u = dh(t)), u.c(), Ni(u, 1), u.m(n, null))
          : u &&
            (Vi(),
            Hi(u, 1, 1, () => {
              u = null;
            }),
            Ui()),
        i &&
          Io(i.update) &&
          32776 & a[0] &&
          i.update.call(null, {
            drag: !0,
            pinch: t[3],
            inertia: !0,
            matchTarget: !0,
            getEventPosition: t[140],
          }),
        t[16]
          ? d
            ? (d.p(t, a), 65536 & a[0] && Ni(d, 1))
            : ((d = ph(t)), d.c(), Ni(d, 1), d.m(e, null))
          : d &&
            (Vi(),
            Hi(d, 1, 1, () => {
              d = null;
            }),
            Ui());
    },
    i(t) {
      a || (Ni(c), Ni(u), Ni(d), (a = !0));
    },
    o(t) {
      Hi(c), Hi(u), Hi(d), (a = !1);
    },
    d(n) {
      n && Ko(e), c && c.d(), u && u.d(), t[139](null), d && d.d(), (s = !1), Ao(l);
    },
  };
}
function gh(t) {
  let e, n, o, i;
  const r = [{ class: "PinturaControlList" }, { tabs: t[12] }, t[21]];
  let a = {
    $$slots: {
      default: [
        mh,
        ({ tab: t }) => ({ 184: t }),
        ({ tab: t }) => [0, 0, 0, 0, 0, t ? 536870912 : 0],
      ],
    },
    $$scope: { ctx: t },
  };
  for (let t = 0; t < r.length; t += 1) a = To(a, r[t]);
  (e = new Ps({ props: a })), e.$on("select", t[138]);
  const s = [
    { class: "PinturaControlPanels" },
    { panelClass: "PinturaControlPanel" },
    { panels: t[22] },
    t[21],
  ];
  let l = {
    $$slots: {
      default: [
        yh,
        ({ panel: t }) => ({ 183: t }),
        ({ panel: t }) => [0, 0, 0, 0, 0, t ? 268435456 : 0],
      ],
    },
    $$scope: { ctx: t },
  };
  for (let t = 0; t < s.length; t += 1) l = To(l, s[t]);
  return (
    (o = new Vs({ props: l })),
    {
      c() {
        tr(e.$$.fragment), (n = ei()), tr(o.$$.fragment);
      },
      m(t, r) {
        er(e, t, r), qo(t, n, r), er(o, t, r), (i = !0);
      },
      p(t, n) {
        const i =
          2101248 & n[0]
            ? Ki(r, [r[0], 4096 & n[0] && { tabs: t[12] }, 2097152 & n[0] && Qi(t[21])])
            : {};
        1610612736 & n[5] && (i.$$scope = { dirty: n, ctx: t }), e.$set(i);
        const a =
          6291456 & n[0]
            ? Ki(s, [s[0], s[1], 4194304 & n[0] && { panels: t[22] }, 2097152 & n[0] && Qi(t[21])])
            : {};
        (117461264 & n[0]) | (1342177280 & n[5]) && (a.$$scope = { dirty: n, ctx: t }), o.$set(a);
      },
      i(t) {
        i || (Ni(e.$$.fragment, t), Ni(o.$$.fragment, t), (i = !0));
      },
      o(t) {
        Hi(e.$$.fragment, t), Hi(o.$$.fragment, t), (i = !1);
      },
      d(t) {
        nr(e, t), t && Ko(n), nr(o, t);
      },
    }
  );
}
function mh(t) {
  let e,
    n,
    o = t[184].label + "";
  return {
    c() {
      (e = Qo("span")), (n = ti(o));
    },
    m(t, o) {
      qo(t, e, o), Zo(e, n);
    },
    p(t, e) {
      536870912 & e[5] && o !== (o = t[184].label + "") && li(n, o);
    },
    d(t) {
      t && Ko(e);
    },
  };
}
function fh(t) {
  let e, n;
  return (
    (e = new Pp({
      props: {
        elasticity: t[35] * t[36],
        base: wh,
        min: t[14],
        max: vh,
        valueMin: t[25][0],
        valueMax: t[25][1],
        value: t[26],
        labelReset: t[4].labelReset,
        valueLabel: Math.round(100 * t[26]) + "%",
        oninputstart: t[72],
        oninputmove: t[73],
        oninputend: t[74],
      },
    })),
    {
      c() {
        tr(e.$$.fragment);
      },
      m(t, o) {
        er(e, t, o), (n = !0);
      },
      p(t, n) {
        const o = {};
        16384 & n[0] && (o.min = t[14]),
          33554432 & n[0] && (o.valueMin = t[25][0]),
          33554432 & n[0] && (o.valueMax = t[25][1]),
          67108864 & n[0] && (o.value = t[26]),
          16 & n[0] && (o.labelReset = t[4].labelReset),
          67108864 & n[0] && (o.valueLabel = Math.round(100 * t[26]) + "%"),
          e.$set(o);
      },
      i(t) {
        n || (Ni(e.$$.fragment, t), (n = !0));
      },
      o(t) {
        Hi(e.$$.fragment, t), (n = !1);
      },
      d(t) {
        nr(e, t);
      },
    }
  );
}
function $h(t) {
  let e, n;
  return (
    (e = new ih({
      props: {
        elasticity: t[35] * t[36],
        rotation: t[8],
        labelReset: t[4].labelReset,
        valueMin: t[24][0],
        valueMax: t[24][1],
        oninputstart: t[62],
        oninputmove: t[63],
        oninputend: t[64],
      },
    })),
    {
      c() {
        tr(e.$$.fragment);
      },
      m(t, o) {
        er(e, t, o), (n = !0);
      },
      p(t, n) {
        const o = {};
        256 & n[0] && (o.rotation = t[8]),
          16 & n[0] && (o.labelReset = t[4].labelReset),
          16777216 & n[0] && (o.valueMin = t[24][0]),
          16777216 & n[0] && (o.valueMax = t[24][1]),
          e.$set(o);
      },
      i(t) {
        n || (Ni(e.$$.fragment, t), (n = !0));
      },
      o(t) {
        Hi(e.$$.fragment, t), (n = !1);
      },
      d(t) {
        nr(e, t);
      },
    }
  );
}
function yh(t) {
  let e, n, o, i;
  const r = [$h, fh],
    a = [];
  function s(t, e) {
    return t[183] === t[12][0].id ? 0 : t[183] === t[12][1].id ? 1 : -1;
  }
  return (
    ~(e = s(t)) && (n = a[e] = r[e](t)),
    {
      c() {
        n && n.c(), (o = ni());
      },
      m(t, n) {
        ~e && a[e].m(t, n), qo(t, o, n), (i = !0);
      },
      p(t, i) {
        let l = e;
        (e = s(t)),
          e === l
            ? ~e && a[e].p(t, i)
            : (n &&
                (Vi(),
                Hi(a[l], 1, 1, () => {
                  a[l] = null;
                }),
                Ui()),
              ~e
                ? ((n = a[e]),
                  n ? n.p(t, i) : ((n = a[e] = r[e](t)), n.c()),
                  Ni(n, 1),
                  n.m(o.parentNode, o))
                : (n = null));
      },
      i(t) {
        i || (Ni(n), (i = !0));
      },
      o(t) {
        Hi(n), (i = !1);
      },
      d(t) {
        ~e && a[e].d(t), t && Ko(o);
      },
    }
  );
}
function xh(t) {
  let e,
    n,
    o = t[20] && gh(t);
  return {
    c() {
      (e = Qo("div")), o && o.c(), ai(e, "slot", "footer"), ai(e, "style", t[23]);
    },
    m(t, i) {
      qo(t, e, i), o && o.m(e, null), (n = !0);
    },
    p(t, i) {
      t[20]
        ? o
          ? (o.p(t, i), 1048576 & i[0] && Ni(o, 1))
          : ((o = gh(t)), o.c(), Ni(o, 1), o.m(e, null))
        : o &&
          (Vi(),
          Hi(o, 1, 1, () => {
            o = null;
          }),
          Ui()),
        (!n || 8388608 & i[0]) && ai(e, "style", t[23]);
    },
    i(t) {
      n || (Ni(o), (n = !0));
    },
    o(t) {
      Hi(o), (n = !1);
    },
    d(t) {
      t && Ko(e), o && o.d();
    },
  };
}
function bh(t) {
  let e, n, o;
  function i(e) {
    t[141](e);
  }
  let r = {
    hasHeader: t[19],
    $$slots: { footer: [xh], main: [hh], header: [ch] },
    $$scope: { ctx: t },
  };
  return (
    void 0 !== t[13] && (r.root = t[13]),
    (e = new kp({ props: r })),
    Mi.push(() => Ji(e, "root", i)),
    e.$on("measure", t[142]),
    {
      c() {
        tr(e.$$.fragment);
      },
      m(t, n) {
        er(e, t, n), (o = !0);
      },
      p(t, o) {
        const i = {};
        524288 & o[0] && (i.hasHeader = t[19]),
          (536338429 & o[0]) | (1073741824 & o[5]) && (i.$$scope = { dirty: o, ctx: t }),
          !n && 8192 & o[0] && ((n = !0), (i.root = t[13]), Ii(() => (n = !1))),
          e.$set(i);
      },
      i(t) {
        o || (Ni(e.$$.fragment, t), (o = !0));
      },
      o(t) {
        Hi(e.$$.fragment, t), (o = !1);
      },
      d(t) {
        nr(e, t);
      },
    }
  );
}
const vh = 1,
  wh = 0;
function Sh(t, e, n) {
  let o,
    i,
    r,
    a,
    s,
    l,
    c,
    u,
    d,
    p,
    h,
    g,
    m,
    f,
    $,
    y,
    x,
    b,
    v,
    w,
    S,
    k,
    M,
    R,
    T,
    P,
    E,
    A,
    I,
    L,
    F,
    B,
    D,
    O,
    W,
    U,
    N,
    H,
    j,
    Z,
    Q,
    J,
    ot,
    it,
    rt,
    at,
    st,
    lt,
    dt,
    ht,
    mt,
    vt,
    wt,
    St,
    kt,
    Ct,
    Rt,
    Pt,
    Et,
    At,
    Dt,
    Vt = Mo,
    Ut = () => (Vt(), (Vt = Fo(Nt, (t) => n(11, (mt = t)))), Nt);
  t.$$.on_destroy.push(() => Vt());
  let { isActive: Nt } = e;
  Ut();
  let { stores: Zt } = e,
    { cropImageSelectionCornerStyle: Kt = "circle" } = e,
    {
      cropWillRenderImageSelectionGuides: Qt = (t, e) => {
        const n = "rotate" == t;
        return { rows: n ? 5 : 3, cols: n ? 5 : 3, opacity: 0.25 * e };
      },
    } = e,
    { cropAutoCenterImageSelectionTimeout: te } = e,
    { cropEnableZoomMatchImageAspectRatio: ee = !0 } = e,
    { cropEnableRotateMatchImageAspectRatio: ne = "never" } = e,
    { cropEnableRotationInput: oe = !0 } = e,
    { cropEnableZoom: ie = !0 } = e,
    { cropEnableZoomInput: re = !0 } = e,
    { cropEnableImageSelection: ae = !0 } = e,
    { cropEnableInfoIndicator: se = !1 } = e,
    { cropEnableZoomTowardsWheelPosition: le = !0 } = e,
    { cropEnableLimitWheelInputToCropSelection: ce = !0 } = e,
    { cropEnableCenterImageSelection: ue = !0 } = e,
    { cropEnableButtonRotateLeft: de = !0 } = e,
    { cropEnableButtonRotateRight: pe = !1 } = e,
    { cropEnableButtonFlipHorizontal: he = !0 } = e,
    { cropEnableButtonFlipVertical: ge = !1 } = e,
    { cropSelectPresetOptions: me } = e,
    { cropEnableSelectPreset: fe = !0 } = e,
    { cropEnableButtonToggleCropLimit: $e = !1 } = e,
    { locale: ye = {} } = e,
    { tools: xe = [] } = e,
    be = "idle";
  const ve = () => void 0 === T,
    we = (t, e, n) =>
      V(n)
        ? e.width === Math.round(t.height) || e.height === Math.round(t.width)
        : e.width === Math.round(t.width) || e.height === Math.round(t.height),
    Se = () =>
      (ve() ||
        ("always" === ne &&
          (() => {
            if (1 === T) return !1;
            const t = 1 / T;
            return !!me && !!Dl(me).find(([e]) => e === t);
          })())) &&
      ((t, e, n) => {
        const o = bt(yt(ut(e), n), (t) => Math.abs(Math.round(t))),
          i = $t(o),
          r = Ft(t);
        return (s = r), (a = i).x === s.x && a.y === s.y;
        var a, s;
      })(P, E, A) &&
      we(P, E, A),
    ke = (t) => {
      if ("never" !== ne && Se()) {
        Vo(We, (A += t), A);
        const e = V(A),
          n = e ? E.height : E.width,
          o = e ? E.width : E.height;
        Vo(qe, (P = Lt(0, 0, n, o)), P), ve() || Vo(tn, (T = z(n, o)), T);
      } else Vo(We, (A += t), A);
    },
    {
      history: Ce,
      env: Me,
      isInteracting: Re,
      isInteractingFraction: Te,
      rootRect: Pe,
      stageRect: Ee,
      utilRect: Ae,
      rootLineColor: Ie,
      animation: Le,
      elasticityMultiplier: Fe,
      rangeInputElasticity: Be,
      presentationScalar: ze,
      imagePreviewModifiers: De,
      imageFlipX: Oe,
      imageFlipY: _e,
      imageRotation: We,
      imageRotationRange: Ve,
      imageOutputSize: Ue,
      imageSelectionRect: Ne,
      imageSelectionRectSnapshot: He,
      imageSelectionRectIntent: Xe,
      imageSelectionRectPresentation: Ye,
      imageCropRectIntent: Ge,
      imageCropRectOrigin: Ze,
      imageCropRect: qe,
      imageCropMinSize: Ke,
      imageCropMaxSize: Qe,
      imageCropRange: Je,
      imageCropAspectRatio: tn,
      imageCropRectAspectRatio: en,
      imageCropLimitToImage: nn,
      imageSize: on,
      imageScalar: rn,
      imageOverlayMarkup: an,
    } = Zt;
  let sn, ln, cn;
  zo(t, Me, (t) => n(128, (dt = t))),
    zo(t, Re, (t) => n(114, (W = t))),
    zo(t, Pe, (t) => n(15, (rt = t))),
    zo(t, Ee, (t) => n(119, (at = t))),
    zo(t, Ae, (t) => n(118, (Q = t))),
    zo(t, Le, (t) => n(135, (kt = t))),
    zo(t, ze, (t) => n(117, (H = t))),
    zo(t, De, (t) => n(131, (vt = t))),
    zo(t, Oe, (t) => n(108, (L = t))),
    zo(t, _e, (t) => n(107, (I = t))),
    zo(t, We, (t) => n(8, (A = t))),
    zo(t, Ve, (t) => n(24, (Rt = t))),
    zo(t, Ue, (t) => n(152, (B = t))),
    zo(t, Ne, (t) => n(116, (N = t))),
    zo(t, He, (t) => n(115, (U = t))),
    zo(t, Xe, (t) => n(154, (Z = t))),
    zo(t, Ye, (t) => n(122, (lt = t))),
    zo(t, Ge, (t) => n(156, (ot = t))),
    zo(t, Ze, (t) => n(155, (J = t))),
    zo(t, qe, (t) => n(7, (P = t))),
    zo(t, Ke, (t) => n(112, (D = t))),
    zo(t, Qe, (t) => n(153, (j = t))),
    zo(t, Je, (t) => n(157, (it = t))),
    zo(t, tn, (t) => n(151, (T = t))),
    zo(t, nn, (t) => n(113, (O = t))),
    zo(t, on, (t) => n(106, (E = t))),
    zo(t, rn, (t) => n(130, (ht = t))),
    zo(t, an, (t) => n(159, (wt = t)));
  const un = (t, e) => {
    const n = { target: t, translate: e };
    let o,
      i = th(U, n, { aspectRatio: T });
    const r = pt(Ot(Mt(i), H)),
      a = kr(E, A);
    if ((Jt(a), r.width < D.width || r.height < D.height)) {
      const n = e.y < 0,
        i = e.x > 0,
        a = e.x < 0,
        s = e.y > 0,
        l =
          ("t" === t && n) ||
          ("r" === t && i) ||
          ("b" === t && s) ||
          ("l" === t && a) ||
          ("tr" === t && (i || n)) ||
          ("tl" === t && (a || n)) ||
          ("br" === t && (i || s)) ||
          ("bl" === t && (a || s)),
        c = Wt(r),
        u = Cr(E, A, c);
      if (l && (u.width < D.width || u.height < D.height)) {
        if (0 !== A) {
          const t = Math.sign(A),
            e = Math.round(Math.abs(A) / _) * _,
            n = A - t * e,
            o = (e / _) % 2 == 1,
            i = o ? E.height : E.width,
            a = o ? E.width : E.height,
            s = Math.abs(n),
            l = Math.sin(s),
            c = Math.cos(s);
          if (r.width < D.width) {
            r.width = D.width;
            const t = i - (c * r.width + l * r.height),
              e = a - (l * r.width + c * r.height);
            t < e
              ? (r.height = (i - c * r.width) / l)
              : e < t && (r.height = (a - l * r.width) / c);
          }
          if (r.height < D.height) {
            r.height = D.height;
            const t = i - (c * r.width + l * r.height),
              e = a - (l * r.width + c * r.height);
            t < e
              ? (r.width = (i - l * r.height) / c)
              : e < t && (r.width = (a - c * r.height) / l);
          }
        } else
          r.width < D.width && ((r.width = D.width), (r.height = E.height)),
            r.height < D.height && ((r.height = D.height), (r.width = E.width));
        o = Wt(r);
      }
    }
    return (
      o && (i = th(U, n, { aspectRatio: o || T })),
      {
        boundsLimited: ((t, e, n, o = {}) => {
          const { target: i, translate: r } = e,
            { aspectRatio: a, minSize: s, maxSize: l } = o,
            c = Kp[qp[i]],
            u = tt(X(t.x, t.y), X(c[0] * t.width, c[1] * t.height)),
            d = Kp[i],
            p = tt(Mt(t), X(d[0] * t.width, d[1] * t.height)),
            [h, g, m, f, $, y, x] = Qp(i);
          let b = r.x,
            v = r.y;
          $ ? (v = 0) : y && (b = 0);
          const w = Jp(u, i, n, { aspectRatio: a, minSize: s, maxSize: l });
          let [S, k, C, M] = Gt(t);
          if ((h ? (M = u.x) : g && (k = u.x), f ? (S = u.y) : m && (C = u.y), h)) {
            const t = w.inner.x + w.inner.width,
              e = w.outer.x + w.outer.width;
            k = Tr(p.x + b, t, e);
          } else if (g) {
            const t = w.outer.x,
              e = w.inner.x;
            M = Tr(p.x + b, t, e);
          }
          if (f) {
            const t = w.inner.y + w.inner.height,
              e = w.outer.y + w.outer.height;
            C = Tr(p.y + v, t, e);
          } else if (m) {
            const t = w.outer.y,
              e = w.inner.y;
            S = Tr(p.y + v, t, e);
          }
          if (a)
            if (x) {
              let t = k - M,
                e = C - S;
              $
                ? ((e = t / a), (S = u.y - 0.5 * e), (C = u.y + 0.5 * e))
                : y && ((t = e * a), (M = u.x - 0.5 * t), (k = u.x + 0.5 * t));
            } else {
              const t = X(p.x + b - u.x, p.y + v - u.y);
              i === _p
                ? ((t.x = Math.max(0, t.x)), (t.y = Math.min(0, t.y)))
                : i === Wp
                ? ((t.x = Math.max(0, t.x)), (t.y = Math.max(0, t.y)))
                : i === Vp
                ? ((t.x = Math.min(0, t.x)), (t.y = Math.max(0, t.y)))
                : i === Op && ((t.x = Math.min(0, t.x)), (t.y = Math.min(0, t.y)));
              const e = q(t),
                n = q(X(w.inner.width, w.inner.height)),
                o = q(X(w.outer.width, w.outer.height)),
                r = Tr(e, n, o),
                s = X(a, 1),
                l = nt(K(s), r);
              i === _p
                ? ((k = u.x + l.x), (S = u.y - l.y))
                : i === Wp
                ? ((k = u.x + l.x), (C = u.y + l.y))
                : i === Vp
                ? ((M = u.x - l.x), (C = u.y + l.y))
                : i === Op && ((M = u.x - l.x), (S = u.y - l.y));
            }
          return Lt(M, S, k - M, C - S);
        })(U, n, Q, { aspectRatio: T || o, minSize: ln, maxSize: cn }),
        boundsIntent: i,
      }
    );
  };
  let dn = void 0,
    pn = void 0;
  const hn = ({ translation: t, scalar: e }) => {
      const n = Math.min(N.width / P.width, N.height / P.height),
        o = nt(Y(t), 1 / n);
      let i;
      if (pn) {
        const e = et(Y(pn), t);
        (pn = t), (i = Bt(Mt(P), e));
      } else (i = Bt(Mt(dn), G(Y(o)))), void 0 !== e && zt(i, 1 - e);
      Vo(Ge, (ot = i), ot), Vo(qe, (P = i), P);
    },
    gn = cr([Je, qe], ([t, e], n) => {
      if (!e) return;
      const [o, i] = t,
        r = Wt(e);
      n([pt(qt(jt(o, r), vr)), pt(qt(Yt(i, r), vr))]);
    });
  zo(t, gn, (t) => n(158, (st = t)));
  const mn = cr([on, nn, Ke, Qe, Je, We], ([t, e, n, o, i, r], a) => {
    if (!t) return;
    const s = i[0],
      l = i[1];
    let c, u;
    e
      ? ((c = ((t, e, n) =>
          V(n)
            ? 1 - 1 / Math.min(t.height / e.width, t.width / e.height)
            : 1 - 1 / Math.min(t.width / e.width, t.height / e.height))(t, l, r)),
        (u = Math.min(s.width / n.width, s.height / n.height)))
      : ((u = 1), (c = -1));
    a([vr(c), vr(u)]);
  });
  zo(t, mn, (t) => n(25, (Pt = t)));
  const fn = cr([on, qe, Je, We], ([t, e, n, o], i) => {
    if (!t || !e) return i(0);
    let r;
    const a = n[0],
      s = n[1],
      l = e.width,
      c = e.height,
      u = Wt(e),
      d = V(o) ? gt(t.height, t.width) : t,
      p = Yt(d, u);
    if (l <= p.width || c <= p.height) {
      const t = p.width - a.width,
        e = p.height - a.height;
      r = 0 === t || 0 === e ? 1 : 1 - Math.min((l - a.width) / t, (c - a.height) / e);
    } else {
      const t = s.width - p.width,
        e = s.height - p.height,
        n = Yt({ width: t, height: e }, u);
      r = -Math.min((l - p.width) / n.width, (c - p.height) / n.height);
    }
    i(r);
  });
  zo(t, fn, (t) => n(26, (Et = t)));
  const $n = (t) => {
    const e = Wt(dn);
    let n, o, i;
    const r = V(A) ? gt(E.height, E.width) : E,
      a = Yt(r, e);
    if (t >= 0) {
      const r = a.width - it[0].width,
        s = a.height - it[0].height;
      (n = a.width - r * t), (o = a.height - s * t), (i = jt({ width: n, height: o }, e));
    } else {
      const r = it[1].width - a.width,
        s = it[1].height - a.height;
      (n = a.width + r * -t), (o = a.height + s * -t), (i = Yt({ width: n, height: o }, e));
    }
    (n = i.width), (o = i.height);
    const s = dn.x + 0.5 * dn.width - 0.5 * n,
      l = dn.y + 0.5 * dn.height - 0.5 * o;
    Vo(qe, (P = { x: s, y: l, width: n, height: o }), P);
  };
  let yn;
  const xn = (t) => {
    const e = zt(Mt(yn), 1 / t);
    Vo(Ge, (ot = e), ot), Vo(qe, (P = e), P);
  };
  let bn;
  const vn = vi(),
    wn = () => {
      vn("measure", Mt(Q));
    };
  let Sn;
  const kn = La(0, { precision: 1e-4 });
  zo(t, kn, (t) => n(27, (At = t)));
  const Cn = La();
  zo(t, Cn, (t) => n(28, (Dt = t)));
  const Mn = cr([tn, Ue], ([t, e], n) => {
    if (!me) return;
    const o = Dl(me),
      i = [...o]
        .map((t) => t[0])
        .sort((t, e) => (je(t[0]) && !je(e[0]) ? 1 : -1))
        .find((n) => {
          if (je(n) && e) {
            const [o, i] = n,
              r = e.width === o && e.height === i,
              a = t === z(o, i);
            return r && a;
          }
          return n === t;
        });
    n(o.map((t) => t[0]).findIndex((t) => (je(t) ? Lr(t, i) : t === i)));
  });
  zo(t, Mn, (t) => n(110, (F = t)));
  const Rn = (t) => {
      if (!me) return;
      const e = Dl(me)[t][0];
      return e ? (je(e) ? z(e[0], e[1]) : e) : void 0;
    },
    Tn = cr([Ie, Ye, Te], ([t, e, n], o) => {
      const { rows: i, cols: r, opacity: a } = Qt(be, n);
      if (!e || a <= 0) return o([]);
      const { x: s, y: l, width: c, height: u } = e,
        d = c / r,
        p = u / i,
        h = [];
      for (let e = 1; e <= i - 1; e++) {
        const n = l + p * e;
        h.push({
          id: "image-selection-guide-row-" + e,
          points: [X(s, n), X(s + c, n)],
          opacity: a,
          strokeWidth: 1,
          strokeColor: t,
        });
      }
      for (let e = 1; e <= r - 1; e++) {
        const n = s + d * e;
        h.push({
          id: "image-selection-guide-col-" + e,
          points: [X(n, l), X(n, l + u)],
          opacity: a,
          strokeWidth: 1,
          strokeColor: t,
        });
      }
      o(h);
    });
  zo(t, Tn, (t) => n(132, (St = t)));
  const Pn = "crop-" + C();
  let En,
    An = Pn + "-" + (oe ? "rotation" : "zoom"),
    In = An,
    Ln = void 0;
  const Fn = La(kt ? 20 : 0);
  zo(t, Fn, (t) => n(136, (Ct = t)));
  return (
    (t.$$set = (t) => {
      "isActive" in t && Ut(n(1, (Nt = t.isActive))),
        "stores" in t && n(86, (Zt = t.stores)),
        "cropImageSelectionCornerStyle" in t && n(2, (Kt = t.cropImageSelectionCornerStyle)),
        "cropWillRenderImageSelectionGuides" in t &&
          n(87, (Qt = t.cropWillRenderImageSelectionGuides)),
        "cropAutoCenterImageSelectionTimeout" in t &&
          n(88, (te = t.cropAutoCenterImageSelectionTimeout)),
        "cropEnableZoomMatchImageAspectRatio" in t &&
          n(89, (ee = t.cropEnableZoomMatchImageAspectRatio)),
        "cropEnableRotateMatchImageAspectRatio" in t &&
          n(90, (ne = t.cropEnableRotateMatchImageAspectRatio)),
        "cropEnableRotationInput" in t && n(91, (oe = t.cropEnableRotationInput)),
        "cropEnableZoom" in t && n(3, (ie = t.cropEnableZoom)),
        "cropEnableZoomInput" in t && n(92, (re = t.cropEnableZoomInput)),
        "cropEnableImageSelection" in t && n(93, (ae = t.cropEnableImageSelection)),
        "cropEnableInfoIndicator" in t && n(94, (se = t.cropEnableInfoIndicator)),
        "cropEnableZoomTowardsWheelPosition" in t &&
          n(95, (le = t.cropEnableZoomTowardsWheelPosition)),
        "cropEnableLimitWheelInputToCropSelection" in t &&
          n(96, (ce = t.cropEnableLimitWheelInputToCropSelection)),
        "cropEnableCenterImageSelection" in t && n(97, (ue = t.cropEnableCenterImageSelection)),
        "cropEnableButtonRotateLeft" in t && n(98, (de = t.cropEnableButtonRotateLeft)),
        "cropEnableButtonRotateRight" in t && n(99, (pe = t.cropEnableButtonRotateRight)),
        "cropEnableButtonFlipHorizontal" in t && n(100, (he = t.cropEnableButtonFlipHorizontal)),
        "cropEnableButtonFlipVertical" in t && n(101, (ge = t.cropEnableButtonFlipVertical)),
        "cropSelectPresetOptions" in t && n(102, (me = t.cropSelectPresetOptions)),
        "cropEnableSelectPreset" in t && n(103, (fe = t.cropEnableSelectPreset)),
        "cropEnableButtonToggleCropLimit" in t && n(104, ($e = t.cropEnableButtonToggleCropLimit)),
        "locale" in t && n(4, (ye = t.locale)),
        "tools" in t && n(0, (xe = t.tools));
    }),
    (t.$$.update = () => {
      16 & t.$$.dirty[4] && n(127, (d = "overlay" === dt.layoutMode)),
        (1024 & t.$$.dirty[3]) | (8 & t.$$.dirty[4]) && n(109, (y = fe && !d)),
        41943040 & t.$$.dirty[3] && n(123, (a = Q && N && Ht(Q, N))),
        1082130432 & t.$$.dirty[3] && n(124, (s = !(!N || !a))),
        (1082130432 & t.$$.dirty[3]) | (1 & t.$$.dirty[4]) &&
          n(111, (l = s && _t(N, a, (t) => vr(t, 5)))),
        (272 & t.$$.dirty[0]) | (2092e3 & t.$$.dirty[3]) &&
          n(
            0,
            (xe = [
              de && [
                "Button",
                "rotate-left",
                {
                  label: ye.cropLabelButtonRotateLeft,
                  labelClass: "PinturaToolbarContentWide",
                  icon: ye.cropIconButtonRotateLeft,
                  onclick: () => {
                    ke(-Math.PI / 2), Ce.write();
                  },
                },
              ],
              pe && [
                "Button",
                "rotate-right",
                {
                  label: ye.cropLabelButtonRotateRight,
                  labelClass: "PinturaToolbarContentWide",
                  icon: ye.cropIconButtonRotateRight,
                  onclick: () => {
                    ke(Math.PI / 2), Ce.write();
                  },
                },
              ],
              he && [
                "Button",
                "flip-horizontal",
                {
                  label: ye.cropLabelButtonFlipHorizontal,
                  labelClass: "PinturaToolbarContentWide",
                  icon: ye.cropIconButtonFlipHorizontal,
                  onclick: () => {
                    V(A) ? Vo(_e, (I = !I), I) : Vo(Oe, (L = !L), L), Ce.write();
                  },
                },
              ],
              ge && [
                "Button",
                "flip-vertical",
                {
                  label: ye.cropLabelButtonFlipVertical,
                  labelClass: "PinturaToolbarContentWide",
                  icon: ye.cropIconButtonFlipVertical,
                  onclick: () => {
                    V(A) ? Vo(Oe, (L = !L), L) : Vo(_e, (I = !I), I), Ce.write();
                  },
                },
              ],
              y &&
                me && [
                  "Dropdown",
                  "select-preset",
                  {
                    icon: _l(ye.cropIconSelectPreset, ye, Rn(F)),
                    label: ye.cropLabelSelectPreset,
                    labelClass: "PinturaToolbarContentWide",
                    options: me,
                    selectedIndex: F,
                    onchange: ({ value: t }) => {
                      var e;
                      je(t)
                        ? (Vo(tn, (T = z(t[0], t[1])), T), Vo(Ue, (B = ct((e = t)[0], e[1])), B))
                        : Vo(tn, (T = t), T),
                        l && wn(),
                        Ce.write();
                    },
                    optionMapper: (t) => {
                      let e = !1;
                      const n = je(t.value) ? t.value[0] / t.value[1] : t.value;
                      if (n) {
                        const t = Cr(E, A, n);
                        e = t.width < D.width || t.height < D.height;
                      }
                      return (
                        (t.icon = ((t, e = {}) => {
                          const {
                            width: n = 24,
                            height: o = 24,
                            bounds: i = 16,
                            radius: r = 3,
                          } = e;
                          let a,
                            s,
                            l,
                            c,
                            u = je(t) ? z(t[0], t[1]) : t,
                            d = !!u;
                          return (
                            (u = d ? u : 1),
                            (l = u > 1 ? i : u * i),
                            (c = l / u),
                            (a = Math.round(0.5 * (n - l))),
                            (s = Math.round(0.5 * (o - c))),
                            `<rect fill="${d ? "currentColor" : "none"}" stroke="${
                              d ? "none" : "currentColor"
                            }" stroke-width="${n / 16}" stroke-dasharray="${[n / 12, n / 6].join(
                              " "
                            )}" x="${a}" y="${s}" width="${l}" height="${c}" rx="${r}"/>`
                          );
                        })(t.value, { bounds: 14 })),
                        { ...t, disabled: e }
                      );
                    },
                  },
                ],
              $e && [
                "Dropdown",
                "select-crop-limit",
                {
                  icon: _l(ye.cropIconCropBoundary, ye, O),
                  label: ye.cropLabelCropBoundary,
                  labelClass: "PinturaToolbarContentWide",
                  onchange: ({ value: t }) => {
                    Vo(nn, (O = t), O), Ce.write();
                  },
                  options: [
                    [
                      !0,
                      ye.cropLabelCropBoundaryEdge,
                      { icon: _l(ye.cropIconCropBoundary, ye, !0) },
                    ],
                    [
                      !1,
                      ye.cropLabelCropBoundaryNone,
                      { icon: _l(ye.cropIconCropBoundary, ye, !1) },
                    ],
                  ],
                },
              ],
            ])
          ),
        1048576 & t.$$.dirty[3] && n(14, (o = O ? 0 : -1)),
        100663296 & t.$$.dirty[3] && n(120, (i = Q && X(-(at.x - Q.x), -(at.y - Q.y)))),
        671088640 & t.$$.dirty[3] &&
          n(121, (r = lt && X(kl(lt.x + 0.5 * lt.width + i.x), kl(lt.y + 0.5 * lt.height + i.y)))),
        4194304 & t.$$.dirty[3] && n(125, (c = null != U)),
        1107296256 & t.$$.dirty[3] &&
          n(126, (u = Q && a && (a.height === Q.height || a.width === Q.width))),
        (16777216 & t.$$.dirty[3]) | (68 & t.$$.dirty[4]) && n(129, (p = !u && H < 1 && ht < 1)),
        (262144 & t.$$.dirty[3]) | (35 & t.$$.dirty[4]) && n(9, (h = s && !c && (!l || p))),
        (128 & t.$$.dirty[0]) | (2 & t.$$.dirty[3]) | (8 & t.$$.dirty[4]) &&
          n(16, (g = se && !!P && !d)),
        671088640 & t.$$.dirty[3] &&
          n(
            10,
            ($ = lt && i && { x: lt.x + i.x, y: lt.y + i.y, width: lt.width, height: lt.height })
          ),
        (1024 & t.$$.dirty[0]) | (1 & t.$$.dirty[3]) | (8 & t.$$.dirty[4]) &&
          n(17, (m = ae && !!$ && !d)),
        (67108864 & t.$$.dirty[2]) | (268435472 & t.$$.dirty[3]) && n(18, (f = ue && !!r && !te)),
        (512 & t.$$.dirty[0]) | (67108864 & t.$$.dirty[2]) | (2101248 & t.$$.dirty[3]) &&
          h &&
          te &&
          !W &&
          (clearTimeout(Sn), n(105, (Sn = setTimeout(wn, te)))),
        2101248 & t.$$.dirty[3] && W && clearTimeout(Sn),
        512 & t.$$.dirty[0] && kn.set(h ? 1 : 0),
        268435456 & t.$$.dirty[3] && Cn.set(r),
        (2048 & t.$$.dirty[0]) | (128 & t.$$.dirty[4]) &&
          (mt
            ? Vo(De, (vt.crop = { maskOpacity: 0.85, maskMarkupOpacity: 0.85 }), vt)
            : delete vt.crop),
        256 & t.$$.dirty[4] &&
          St &&
          (() => {
            const t = wt.filter((t) => !/^image\-selection\-guide/.test(t.id));
            Vo(an, (wt = mt ? [...t, ...St] : t), wt);
          })(),
        24 & t.$$.dirty[4] && n(133, (x = !d && "short" !== dt.verticalSpace)),
        512 & t.$$.dirty[4] && n(19, (b = x)),
        (8 & t.$$.dirty[0]) | (1073741824 & t.$$.dirty[2]) | (512 & t.$$.dirty[4]) &&
          n(134, (v = ie && re && x)),
        (536870912 & t.$$.dirty[2]) | (1024 & t.$$.dirty[4]) && n(20, (w = oe || v)),
        1024 & t.$$.dirty[4] && (v || n(5, (In = An))),
        32 & t.$$.dirty[0] && n(21, (S = { name: Pn, selected: In })),
        (16 & t.$$.dirty[0]) | (536870912 & t.$$.dirty[2]) | (1024 & t.$$.dirty[4]) &&
          n(
            12,
            (k = [
              oe && { id: Pn + "-rotation", label: ye.cropLabelTabRotation },
              v && { id: Pn + "-zoom", label: ye.cropLabelTabZoom },
            ].filter(Boolean))
          ),
        4096 & t.$$.dirty[0] && n(22, (M = k.map((t) => t.id))),
        (64 & t.$$.dirty[0]) | (8 & t.$$.dirty[4]) &&
          En &&
          !En.children.length &&
          d &&
          En.dispatchEvent(new CustomEvent("measure", { detail: En.rect })),
        (2048 & t.$$.dirty[0]) | (2048 & t.$$.dirty[4]) && kt && Fn.set(mt ? 0 : 20),
        4096 & t.$$.dirty[4] && n(23, (R = Ct ? `transform: translateY(${Ct}px)` : void 0));
    }),
    [
      xe,
      Nt,
      Kt,
      ie,
      ye,
      In,
      En,
      P,
      A,
      h,
      $,
      mt,
      k,
      Ln,
      o,
      rt,
      g,
      m,
      f,
      b,
      w,
      S,
      M,
      R,
      Rt,
      Pt,
      Et,
      At,
      Dt,
      Me,
      Re,
      Pe,
      Ee,
      Ae,
      Le,
      Fe,
      Be,
      ze,
      De,
      Oe,
      _e,
      We,
      Ve,
      Ue,
      Ne,
      He,
      Xe,
      Ye,
      Ge,
      Ze,
      qe,
      Ke,
      Qe,
      Je,
      tn,
      nn,
      on,
      rn,
      an,
      () => {
        (be = "select"),
          Vo(Re, (W = !0), W),
          Vo(He, (U = Mt(N)), U),
          (sn = H),
          (ln = ft(ut(D), sn)),
          (cn = ft(ut(j), sn));
      },
      ({ detail: t }) => {
        const { boundsLimited: e, boundsIntent: n } = un(t.direction, t.translation);
        Vo(Xe, (Z = n), Z), Vo(Ne, (N = e), N);
      },
      ({ detail: t }) => {
        const { boundsLimited: e } = un(t.direction, t.translation);
        Vo(Re, (W = !1), W),
          Vo(Xe, (Z = void 0), Z),
          q(t.translation) && (Vo(Ne, (N = e), N), Ce.write()),
          Vo(He, (U = void 0), U);
      },
      () => {
        (be = "rotate"), Vo(Re, (W = !0), W), Vo(Ze, (J = Mt(P)), J);
      },
      (t) => {
        Vo(We, (A = t), A);
      },
      (t) => {
        Vo(Re, (W = !1), W), Vo(We, (A = t), A), Ce.write(), Vo(Ze, (J = void 0), J);
      },
      () => {
        (be = "pan"), (pn = void 0), Vo(Re, (W = !0), W), (dn = Mt(P));
      },
      ({ detail: t }) => hn(t),
      ({ detail: t }) => {
        Vo(Re, (W = !1), W),
          (q(t.translation) > 0 || 0 !== t.scalar) && (hn(t), Ce.write()),
          Vo(Ge, (ot = void 0), ot),
          (dn = void 0);
      },
      ({ detail: t }) => {
        (pn = t.translation), Vo(Re, (W = !1), W);
      },
      gn,
      mn,
      fn,
      () => {
        (be = "zoom"), Vo(Re, (W = !0), W), (dn = Mt(P));
      },
      (t) => {
        $n(t);
      },
      (t) => {
        $n(t), Ce.write(), Vo(Re, (W = !1), W), (dn = void 0);
      },
      () => {
        (be = "zoom"), dn || ((yn = Mt(P)), Vo(Re, (W = !0), W));
      },
      ({ detail: t }) => {
        yn && xn(t);
      },
      ({ detail: t }) => {
        yn && (Vo(Re, (W = !1), W), xn(t), Vo(Ge, (ot = void 0), ot), (yn = void 0), Ce.write());
      },
      (t) => {
        const e = ((t, e, n) => {
          const o = Zp(t);
          return et(et(o, e), n);
        })(t, rt, at);
        if (ce && !Xt(N, e)) return;
        (be = "zoom"), Vo(Re, (W = !0), W), t.preventDefault(), t.stopPropagation();
        const n = ll(t),
          o = 1 + n / 100,
          i = Mt(P),
          r = 1 === Math.min(P.width / D.width, P.height / D.height);
        if (ee && O) {
          const t = we(P, E, A);
          if (ve() && t && n > 0 && l) {
            Vo(Re, (W = !1), W);
            const t = V(A) ? Tt({ height: E.width, width: E.height }) : Tt(E);
            if (_t(i, t)) return;
            if ((clearTimeout(bn), _t(Ce.state.crop, t))) return;
            return Vo(qe, (P = t), P), void Ce.write();
          }
        }
        let a = Ft(P);
        if (le && n < 0 && !r) {
          const t = et(Y(e), N),
            n = Math.min(N.width / P.width, N.height / P.height),
            o = zt(Mt(N), 1.1);
          a = Xt(o, e) ? tt(Mt(P), nt(t, 1 / n)) : a;
        }
        let s = zt(Mt(P), o, a);
        xt(st[1], s) || (s = It(Ft(s), st[1])),
          xt(s, st[0]) || (s = It(Ft(s), st[0])),
          _t(i, s, vr)
            ? Vo(Re, (W = !1), W)
            : (Vo(qe, (P = qt(s, (t) => vr(t, 5))), P),
              Vo(Re, (W = !1), W),
              clearTimeout(bn),
              (bn = setTimeout(() => {
                Ce.write();
              }, 500)));
      },
      wn,
      kn,
      Cn,
      Mn,
      Tn,
      Fn,
      "crop",
      Zt,
      Qt,
      te,
      ee,
      ne,
      oe,
      re,
      ae,
      se,
      le,
      ce,
      ue,
      de,
      pe,
      he,
      ge,
      me,
      fe,
      $e,
      Sn,
      E,
      I,
      L,
      y,
      F,
      l,
      D,
      O,
      W,
      U,
      N,
      H,
      Q,
      at,
      i,
      r,
      lt,
      a,
      s,
      c,
      u,
      d,
      dt,
      p,
      ht,
      vt,
      St,
      x,
      v,
      kt,
      Ct,
      function (e) {
        ki(t, e);
      },
      ({ detail: t }) => n(5, (In = t)),
      function (t) {
        Mi[t ? "unshift" : "push"](() => {
          (En = t), n(6, En);
        });
      },
      (t) => Zp(t),
      function (t) {
        (Ln = t), n(13, Ln);
      },
      function (e) {
        ki(t, e);
      },
    ]
  );
}
var kh = {
  util: [
    "crop",
    class extends rr {
      constructor(t) {
        super(),
          ir(
            this,
            t,
            Sh,
            bh,
            Lo,
            {
              name: 85,
              isActive: 1,
              stores: 86,
              cropImageSelectionCornerStyle: 2,
              cropWillRenderImageSelectionGuides: 87,
              cropAutoCenterImageSelectionTimeout: 88,
              cropEnableZoomMatchImageAspectRatio: 89,
              cropEnableRotateMatchImageAspectRatio: 90,
              cropEnableRotationInput: 91,
              cropEnableZoom: 3,
              cropEnableZoomInput: 92,
              cropEnableImageSelection: 93,
              cropEnableInfoIndicator: 94,
              cropEnableZoomTowardsWheelPosition: 95,
              cropEnableLimitWheelInputToCropSelection: 96,
              cropEnableCenterImageSelection: 97,
              cropEnableButtonRotateLeft: 98,
              cropEnableButtonRotateRight: 99,
              cropEnableButtonFlipHorizontal: 100,
              cropEnableButtonFlipVertical: 101,
              cropSelectPresetOptions: 102,
              cropEnableSelectPreset: 103,
              cropEnableButtonToggleCropLimit: 104,
              locale: 4,
              tools: 0,
            },
            [-1, -1, -1, -1, -1, -1]
          );
      }
      get name() {
        return this.$$.ctx[85];
      }
      get isActive() {
        return this.$$.ctx[1];
      }
      set isActive(t) {
        this.$set({ isActive: t }), Bi();
      }
      get stores() {
        return this.$$.ctx[86];
      }
      set stores(t) {
        this.$set({ stores: t }), Bi();
      }
      get cropImageSelectionCornerStyle() {
        return this.$$.ctx[2];
      }
      set cropImageSelectionCornerStyle(t) {
        this.$set({ cropImageSelectionCornerStyle: t }), Bi();
      }
      get cropWillRenderImageSelectionGuides() {
        return this.$$.ctx[87];
      }
      set cropWillRenderImageSelectionGuides(t) {
        this.$set({ cropWillRenderImageSelectionGuides: t }), Bi();
      }
      get cropAutoCenterImageSelectionTimeout() {
        return this.$$.ctx[88];
      }
      set cropAutoCenterImageSelectionTimeout(t) {
        this.$set({ cropAutoCenterImageSelectionTimeout: t }), Bi();
      }
      get cropEnableZoomMatchImageAspectRatio() {
        return this.$$.ctx[89];
      }
      set cropEnableZoomMatchImageAspectRatio(t) {
        this.$set({ cropEnableZoomMatchImageAspectRatio: t }), Bi();
      }
      get cropEnableRotateMatchImageAspectRatio() {
        return this.$$.ctx[90];
      }
      set cropEnableRotateMatchImageAspectRatio(t) {
        this.$set({ cropEnableRotateMatchImageAspectRatio: t }), Bi();
      }
      get cropEnableRotationInput() {
        return this.$$.ctx[91];
      }
      set cropEnableRotationInput(t) {
        this.$set({ cropEnableRotationInput: t }), Bi();
      }
      get cropEnableZoom() {
        return this.$$.ctx[3];
      }
      set cropEnableZoom(t) {
        this.$set({ cropEnableZoom: t }), Bi();
      }
      get cropEnableZoomInput() {
        return this.$$.ctx[92];
      }
      set cropEnableZoomInput(t) {
        this.$set({ cropEnableZoomInput: t }), Bi();
      }
      get cropEnableImageSelection() {
        return this.$$.ctx[93];
      }
      set cropEnableImageSelection(t) {
        this.$set({ cropEnableImageSelection: t }), Bi();
      }
      get cropEnableInfoIndicator() {
        return this.$$.ctx[94];
      }
      set cropEnableInfoIndicator(t) {
        this.$set({ cropEnableInfoIndicator: t }), Bi();
      }
      get cropEnableZoomTowardsWheelPosition() {
        return this.$$.ctx[95];
      }
      set cropEnableZoomTowardsWheelPosition(t) {
        this.$set({ cropEnableZoomTowardsWheelPosition: t }), Bi();
      }
      get cropEnableLimitWheelInputToCropSelection() {
        return this.$$.ctx[96];
      }
      set cropEnableLimitWheelInputToCropSelection(t) {
        this.$set({ cropEnableLimitWheelInputToCropSelection: t }), Bi();
      }
      get cropEnableCenterImageSelection() {
        return this.$$.ctx[97];
      }
      set cropEnableCenterImageSelection(t) {
        this.$set({ cropEnableCenterImageSelection: t }), Bi();
      }
      get cropEnableButtonRotateLeft() {
        return this.$$.ctx[98];
      }
      set cropEnableButtonRotateLeft(t) {
        this.$set({ cropEnableButtonRotateLeft: t }), Bi();
      }
      get cropEnableButtonRotateRight() {
        return this.$$.ctx[99];
      }
      set cropEnableButtonRotateRight(t) {
        this.$set({ cropEnableButtonRotateRight: t }), Bi();
      }
      get cropEnableButtonFlipHorizontal() {
        return this.$$.ctx[100];
      }
      set cropEnableButtonFlipHorizontal(t) {
        this.$set({ cropEnableButtonFlipHorizontal: t }), Bi();
      }
      get cropEnableButtonFlipVertical() {
        return this.$$.ctx[101];
      }
      set cropEnableButtonFlipVertical(t) {
        this.$set({ cropEnableButtonFlipVertical: t }), Bi();
      }
      get cropSelectPresetOptions() {
        return this.$$.ctx[102];
      }
      set cropSelectPresetOptions(t) {
        this.$set({ cropSelectPresetOptions: t }), Bi();
      }
      get cropEnableSelectPreset() {
        return this.$$.ctx[103];
      }
      set cropEnableSelectPreset(t) {
        this.$set({ cropEnableSelectPreset: t }), Bi();
      }
      get cropEnableButtonToggleCropLimit() {
        return this.$$.ctx[104];
      }
      set cropEnableButtonToggleCropLimit(t) {
        this.$set({ cropEnableButtonToggleCropLimit: t }), Bi();
      }
      get locale() {
        return this.$$.ctx[4];
      }
      set locale(t) {
        this.$set({ locale: t }), Bi();
      }
      get tools() {
        return this.$$.ctx[0];
      }
      set tools(t) {
        this.$set({ tools: t }), Bi();
      }
    },
  ],
};
function Ch(t) {
  let e,
    n,
    o,
    i,
    r,
    a,
    s,
    l = t[63],
    c = (Xe(t[63].label) ? t[63].label(t[2]) : t[63].label) + "";
  function u(...e) {
    return t[44](t[63], ...e);
  }
  const d = () => t[45](n, l),
    p = () => t[45](null, l);
  return {
    c() {
      (e = Qo("div")),
        (n = Qo("div")),
        (o = ei()),
        (i = Qo("span")),
        (r = ti(c)),
        ai(n, "class", Ph),
        ai(e, "slot", "option"),
        ai(e, "class", "PinturaFilterOption");
    },
    m(t, l) {
      qo(t, e, l),
        Zo(e, n),
        d(),
        Zo(e, o),
        Zo(e, i),
        Zo(i, r),
        a || ((s = [oi(n, "measure", u), Uo(Ha.call(null, n))]), (a = !0));
    },
    p(e, n) {
      l !== (t = e)[63] && (p(), (l = t[63]), d()),
        (4 & n[0]) | (2 & n[2]) &&
          c !== (c = (Xe(t[63].label) ? t[63].label(t[2]) : t[63].label) + "") &&
          li(r, c);
    },
    d(t) {
      t && Ko(e), p(), (a = !1), Ao(s);
    },
  };
}
function Mh(t) {
  let e, n;
  return (
    (e = new pc({
      props: {
        locale: t[2],
        layout: "row",
        options: t[3],
        selectedIndex: t[10],
        onchange: t[26],
        $$slots: {
          option: [Ch, ({ option: t }) => ({ 63: t }), ({ option: t }) => [0, 0, t ? 2 : 0]],
        },
        $$scope: { ctx: t },
      },
    })),
    {
      c() {
        tr(e.$$.fragment);
      },
      m(t, o) {
        er(e, t, o), (n = !0);
      },
      p(t, n) {
        const o = {};
        4 & n[0] && (o.locale = t[2]),
          8 & n[0] && (o.options = t[3]),
          1024 & n[0] && (o.selectedIndex = t[10]),
          (516 & n[0]) | (6 & n[2]) && (o.$$scope = { dirty: n, ctx: t }),
          e.$set(o);
      },
      i(t) {
        n || (Ni(e.$$.fragment, t), (n = !0));
      },
      o(t) {
        Hi(e.$$.fragment, t), (n = !1);
      },
      d(t) {
        nr(e, t);
      },
    }
  );
}
function Rh(t) {
  let e, n, o, i, r, a, s, l;
  function c(e) {
    t[47](e);
  }
  function u(e) {
    t[48](e);
  }
  function d(e) {
    t[49](e);
  }
  let p = {
    elasticity: t[15] * t[16],
    onscroll: t[46],
    $$slots: { default: [Mh] },
    $$scope: { ctx: t },
  };
  return (
    void 0 !== t[4] && (p.maskFeatherStartOpacity = t[4]),
    void 0 !== t[5] && (p.maskFeatherEndOpacity = t[5]),
    void 0 !== t[6] && (p.maskFeatherSize = t[6]),
    (n = new dl({ props: p })),
    Mi.push(() => Ji(n, "maskFeatherStartOpacity", c)),
    Mi.push(() => Ji(n, "maskFeatherEndOpacity", u)),
    Mi.push(() => Ji(n, "maskFeatherSize", d)),
    n.$on("measure", t[50]),
    {
      c() {
        (e = Qo("div")), tr(n.$$.fragment), ai(e, "slot", "footer"), ai(e, "style", t[11]);
      },
      m(o, i) {
        qo(o, e, i), er(n, e, null), (a = !0), s || ((l = oi(e, "transitionend", t[24])), (s = !0));
      },
      p(t, s) {
        const l = {};
        128 & s[0] && (l.onscroll = t[46]),
          (1548 & s[0]) | (4 & s[2]) && (l.$$scope = { dirty: s, ctx: t }),
          !o && 16 & s[0] && ((o = !0), (l.maskFeatherStartOpacity = t[4]), Ii(() => (o = !1))),
          !i && 32 & s[0] && ((i = !0), (l.maskFeatherEndOpacity = t[5]), Ii(() => (i = !1))),
          !r && 64 & s[0] && ((r = !0), (l.maskFeatherSize = t[6]), Ii(() => (r = !1))),
          n.$set(l),
          (!a || 2048 & s[0]) && ai(e, "style", t[11]);
      },
      i(t) {
        a || (Ni(n.$$.fragment, t), (a = !0));
      },
      o(t) {
        Hi(n.$$.fragment, t), (a = !1);
      },
      d(t) {
        t && Ko(e), nr(n), (s = !1), l();
      },
    }
  );
}
function Th(t) {
  let e, n;
  return (
    (e = new kp({ props: { $$slots: { footer: [Rh] }, $$scope: { ctx: t } } })),
    e.$on("measure", t[51]),
    {
      c() {
        tr(e.$$.fragment);
      },
      m(t, o) {
        er(e, t, o), (n = !0);
      },
      p(t, n) {
        const o = {};
        (4092 & n[0]) | (4 & n[2]) && (o.$$scope = { dirty: n, ctx: t }), e.$set(o);
      },
      i(t) {
        n || (Ni(e.$$.fragment, t), (n = !0));
      },
      o(t) {
        Hi(e.$$.fragment, t), (n = !1);
      },
      d(t) {
        nr(e, t);
      },
    }
  );
}
let Ph = "PinturaFilterPreview";
function Eh(t, e, n) {
  let o,
    i,
    r,
    a,
    s,
    l,
    c,
    u,
    d,
    p,
    h,
    g,
    m,
    f,
    $,
    y = Mo,
    x = () => (y(), (y = Fo(w, (t) => n(37, (d = t)))), w),
    b = Mo,
    v = () => (b(), (b = Fo(S, (t) => n(41, (m = t)))), S);
  t.$$.on_destroy.push(() => y()), t.$$.on_destroy.push(() => b());
  let { isActive: w } = e;
  x();
  let { isActiveFraction: S } = e;
  v();
  let { stores: k } = e,
    { locale: C } = e,
    { filterFunctions: M } = e,
    { filterOptions: R } = e;
  const {
    history: T,
    imagePreviews: P,
    stageRect: E,
    utilRect: A,
    animation: I,
    elasticityMultiplier: L,
    scrollElasticity: F,
    imageCropRect: B,
    imageSize: z,
    imageRotation: D,
    imageFlipX: O,
    imageFlipY: _,
    imageGamma: W,
    imageColorMatrix: V,
  } = k;
  zo(t, E, (t) => n(39, (h = t))),
    zo(t, A, (t) => n(38, (p = t))),
    zo(t, I, (t) => n(36, (u = t))),
    zo(t, W, (t) => n(40, (g = t))),
    zo(t, V, (t) => n(33, (a = t)));
  const U = lr({});
  zo(t, U, (t) => n(34, (s = t)));
  const N = (t, e) => Vo(U, (s[t.value] = e), s),
    j = cr(U, (t) => {
      if (!t[void 0]) return;
      const e = t[void 0];
      return l && mt(l, e) ? l : ut(e);
    });
  zo(t, j, (t) => n(52, (l = t)));
  const Z = cr([w, j, B, z, D, O, _], ([t, e, n, o, i, r, a], s) => {
    if (!t || !e || !o) return c;
    const l = Tt(o),
      u = Ft(l),
      d = Rr(o, n, i),
      p = Ft(d),
      h = et(Y(u), p),
      g = G(Y(h)),
      m = Math.max(e.width / n.width, e.height / n.height);
    s({
      origin: g,
      translation: h,
      rotation: { x: a ? Math.PI : 0, y: r ? Math.PI : 0, z: i },
      perspective: H(),
      scale: m,
    });
  });
  zo(t, Z, (t) => n(35, (c = t)));
  const q = La(u ? 20 : 0);
  let K;
  zo(t, q, (t) => n(42, (f = t)));
  const Q = {};
  let J,
    tt,
    nt,
    ot,
    it,
    rt = { x: 0, y: 0 };
  const at = lr([]);
  zo(t, at, (t) => n(43, ($ = t)));
  const st = (t) => {
    const e = { ...t, offset: { ...t.offset }, mask: { ...t.mask } };
    return (e.opacity = m), (e.offset.y += f), (e.mask.y += f), e;
  };
  bi(() => {
    P.set([]);
  });
  return (
    (t.$$set = (t) => {
      "isActive" in t && x(n(0, (w = t.isActive))),
        "isActiveFraction" in t && v(n(1, (S = t.isActiveFraction))),
        "stores" in t && n(28, (k = t.stores)),
        "locale" in t && n(2, (C = t.locale)),
        "filterFunctions" in t && n(29, (M = t.filterFunctions)),
        "filterOptions" in t && n(3, (R = t.filterOptions));
    }),
    (t.$$.update = () => {
      if (
        (8 & t.$$.dirty[0] && n(32, (o = Dl(R))),
        6 & t.$$.dirty[1] &&
          n(
            10,
            (i = ((t, e) => {
              if (!t || !t.filter || !e) return 0;
              const n = t.filter;
              return e.findIndex(([t]) => {
                if (!M[t]) return !1;
                const e = M[t]();
                return Lr(e, n);
              });
            })(a, o))
          ),
        96 & t.$$.dirty[1] && u && q.set(d ? 0 : 20),
        448 & t.$$.dirty[1] && d && p && h)
      ) {
        const t = h.y + h.height + p.y;
        n(31, (it = { x: h.x - p.x, y: t }));
      }
      if ((1610613232 & t.$$.dirty[0]) | (543 & t.$$.dirty[1]) && c && it && rt && ot && K) {
        const t = it.x + ot.x + rt.x,
          e = it.y,
          n = ot.x + it.x,
          i = n + ot.width;
        at.set(
          o
            .map(([o], r) => {
              const l = s[o],
                u = rt.x + l.x,
                d = u + l.width;
              if (d < 0 || u > ot.width) return !1;
              const p = t + l.x,
                h = e + l.y,
                m = ((t) => ({
                  origin: Y(t.origin),
                  translation: Y(t.translation),
                  rotation: { ...t.rotation },
                  perspective: Y(t.perspective),
                  scale: t.scale,
                }))(c);
              m.offset = X(0.5 * l.width + p, 0.5 * l.height + h);
              (m.maskOpacity = 1),
                (m.mask = Lt(p + 0, h, l.width + 0, l.height)),
                (m.maskFeather = [1, 0, 1, 0, 1, i, 1, i]),
                u < nt &&
                  J < 1 &&
                  ((m.maskFeather[0] = J),
                  (m.maskFeather[1] = n),
                  (m.maskFeather[2] = 1),
                  (m.maskFeather[3] = n + nt)),
                d > ot.width - nt &&
                  tt < 1 &&
                  ((m.maskFeather[4] = tt),
                  (m.maskFeather[5] = i - nt),
                  (m.maskFeather[6] = 1),
                  (m.maskFeather[7] = i)),
                (m.maskCornerRadius = K[o]);
              let f =
                (a &&
                  Object.keys(a)
                    .filter((t) => "filter" != t)
                    .map((t) => a[t])) ||
                [];
              return (
                Xe(M[o]) && f.push(M[o]()),
                (m.colorMatrix = f.length ? Co(f) : void 0),
                (m.gamma = g),
                m
              );
            })
            .filter(Boolean)
        );
      }
      7168 & t.$$.dirty[1] && (m > 0 && $ ? P.set($.map(st)) : P.set([])),
        2048 & t.$$.dirty[1] && n(11, (r = f ? `transform: translateY(${f}px)` : void 0));
    }),
    [
      w,
      S,
      C,
      R,
      J,
      tt,
      nt,
      rt,
      ot,
      Q,
      i,
      r,
      E,
      A,
      I,
      L,
      F,
      W,
      V,
      U,
      N,
      j,
      Z,
      q,
      (t) => {
        t.target.className === Ph &&
          n(
            30,
            (K = Object.keys(Q).reduce((t, e) => {
              const n = Q[e],
                o = getComputedStyle(n),
                i = ["top-left", "top-right", "bottom-left", "bottom-right"]
                  .map((t) => o.getPropertyValue(`border-${t}-radius`))
                  .map(sl)
                  .map((t) => 1.25 * t);
              return (t[e] = i), t;
            }, {}))
          );
      },
      at,
      ({ value: t }) => {
        Vo(V, (a = { ...a, filter: Xe(M[t]) ? M[t]() : void 0 }), a), T.write();
      },
      "filter",
      k,
      M,
      K,
      it,
      o,
      a,
      s,
      c,
      u,
      d,
      p,
      h,
      g,
      m,
      f,
      $,
      (t, e) => N(t, e.detail),
      function (t, e) {
        Mi[t ? "unshift" : "push"](() => {
          (Q[e.value] = t), n(9, Q);
        });
      },
      (t) => n(7, (rt = t)),
      function (t) {
        (J = t), n(4, J);
      },
      function (t) {
        (tt = t), n(5, tt);
      },
      function (t) {
        (nt = t), n(6, nt);
      },
      (t) => n(8, (ot = t.detail)),
      function (e) {
        ki(t, e);
      },
    ]
  );
}
var Ah = {
  util: [
    "filter",
    class extends rr {
      constructor(t) {
        super(),
          ir(
            this,
            t,
            Eh,
            Th,
            Lo,
            {
              name: 27,
              isActive: 0,
              isActiveFraction: 1,
              stores: 28,
              locale: 2,
              filterFunctions: 29,
              filterOptions: 3,
            },
            [-1, -1, -1]
          );
      }
      get name() {
        return this.$$.ctx[27];
      }
      get isActive() {
        return this.$$.ctx[0];
      }
      set isActive(t) {
        this.$set({ isActive: t }), Bi();
      }
      get isActiveFraction() {
        return this.$$.ctx[1];
      }
      set isActiveFraction(t) {
        this.$set({ isActiveFraction: t }), Bi();
      }
      get stores() {
        return this.$$.ctx[28];
      }
      set stores(t) {
        this.$set({ stores: t }), Bi();
      }
      get locale() {
        return this.$$.ctx[2];
      }
      set locale(t) {
        this.$set({ locale: t }), Bi();
      }
      get filterFunctions() {
        return this.$$.ctx[29];
      }
      set filterFunctions(t) {
        this.$set({ filterFunctions: t }), Bi();
      }
      get filterOptions() {
        return this.$$.ctx[3];
      }
      set filterOptions(t) {
        this.$set({ filterOptions: t }), Bi();
      }
    },
  ],
};
function Ih(t) {
  let e,
    n,
    o = t[37].label + "";
  return {
    c() {
      (e = Qo("span")), (n = ti(o));
    },
    m(t, o) {
      qo(t, e, o), Zo(e, n);
    },
    p(t, e) {
      64 & e[1] && o !== (o = t[37].label + "") && li(n, o);
    },
    d(t) {
      t && Ko(e);
    },
  };
}
function Lh(t) {
  let e, n;
  const o = [{ class: "PinturaControlList" }, { tabs: t[1] }, t[3]];
  let i = {
    $$slots: { default: [Ih, ({ tab: t }) => ({ 37: t }), ({ tab: t }) => [0, t ? 64 : 0]] },
    $$scope: { ctx: t },
  };
  for (let t = 0; t < o.length; t += 1) i = To(i, o[t]);
  return (
    (e = new Ps({ props: i })),
    e.$on("select", t[22]),
    {
      c() {
        tr(e.$$.fragment);
      },
      m(t, o) {
        er(e, t, o), (n = !0);
      },
      p(t, n) {
        const i = 10 & n[0] ? Ki(o, [o[0], 2 & n[0] && { tabs: t[1] }, 8 & n[0] && Qi(t[3])]) : {};
        192 & n[1] && (i.$$scope = { dirty: n, ctx: t }), e.$set(i);
      },
      i(t) {
        n || (Ni(e.$$.fragment, t), (n = !0));
      },
      o(t) {
        Hi(e.$$.fragment, t), (n = !1);
      },
      d(t) {
        nr(e, t);
      },
    }
  );
}
function Fh(t) {
  let e, n;
  const o = [t[5][t[36]]];
  let i = {};
  for (let t = 0; t < o.length; t += 1) i = To(i, o[t]);
  return (
    (e = new Pp({ props: i })),
    {
      c() {
        tr(e.$$.fragment);
      },
      m(t, o) {
        er(e, t, o), (n = !0);
      },
      p(t, n) {
        const i = (32 & n[0]) | (32 & n[1]) ? Ki(o, [Qi(t[5][t[36]])]) : {};
        e.$set(i);
      },
      i(t) {
        n || (Ni(e.$$.fragment, t), (n = !0));
      },
      o(t) {
        Hi(e.$$.fragment, t), (n = !1);
      },
      d(t) {
        nr(e, t);
      },
    }
  );
}
function Bh(t) {
  let e, n, o, i, r;
  n = new dl({
    props: {
      elasticity: t[9] * t[8],
      class: "PinturaControlListScroller",
      $$slots: { default: [Lh] },
      $$scope: { ctx: t },
    },
  });
  const a = [
    { class: "PinturaControlPanels" },
    { panelClass: "PinturaControlPanel" },
    { panels: t[4] },
    t[3],
  ];
  let s = {
    $$slots: { default: [Fh, ({ panel: t }) => ({ 36: t }), ({ panel: t }) => [0, t ? 32 : 0]] },
    $$scope: { ctx: t },
  };
  for (let t = 0; t < a.length; t += 1) s = To(s, a[t]);
  return (
    (i = new Vs({ props: s })),
    {
      c() {
        (e = Qo("div")),
          tr(n.$$.fragment),
          (o = ei()),
          tr(i.$$.fragment),
          ai(e, "slot", "footer"),
          ai(e, "style", t[6]);
      },
      m(t, a) {
        qo(t, e, a), er(n, e, null), Zo(e, o), er(i, e, null), (r = !0);
      },
      p(t, o) {
        const s = {};
        (14 & o[0]) | (128 & o[1]) && (s.$$scope = { dirty: o, ctx: t }), n.$set(s);
        const l =
          24 & o[0] ? Ki(a, [a[0], a[1], 16 & o[0] && { panels: t[4] }, 8 & o[0] && Qi(t[3])]) : {};
        (32 & o[0]) | (160 & o[1]) && (l.$$scope = { dirty: o, ctx: t }),
          i.$set(l),
          (!r || 64 & o[0]) && ai(e, "style", t[6]);
      },
      i(t) {
        r || (Ni(n.$$.fragment, t), Ni(i.$$.fragment, t), (r = !0));
      },
      o(t) {
        Hi(n.$$.fragment, t), Hi(i.$$.fragment, t), (r = !1);
      },
      d(t) {
        t && Ko(e), nr(n), nr(i);
      },
    }
  );
}
function zh(t) {
  let e, n;
  return (
    (e = new kp({ props: { $$slots: { footer: [Bh] }, $$scope: { ctx: t } } })),
    e.$on("measure", t[23]),
    {
      c() {
        tr(e.$$.fragment);
      },
      m(t, o) {
        er(e, t, o), (n = !0);
      },
      p(t, n) {
        const o = {};
        (126 & n[0]) | (128 & n[1]) && (o.$$scope = { dirty: n, ctx: t }), e.$set(o);
      },
      i(t) {
        n || (Ni(e.$$.fragment, t), (n = !0));
      },
      o(t) {
        Hi(e.$$.fragment, t), (n = !1);
      },
      d(t) {
        nr(e, t);
      },
    }
  );
}
function Dh(t, e, n) {
  let o,
    i,
    r,
    a,
    s,
    l,
    c,
    u,
    d,
    p,
    h = Mo,
    g = () => (h(), (h = Fo(f, (t) => n(20, (d = t)))), f);
  t.$$.on_destroy.push(() => h());
  let { stores: m } = e,
    { isActive: f } = e;
  g();
  let { locale: $ = {} } = e,
    { finetuneControlConfiguration: y } = e,
    { finetuneOptions: x } = e;
  const {
    history: b,
    animation: v,
    scrollElasticity: w,
    elasticityMultiplier: S,
    rangeInputElasticity: k,
    imageColorMatrix: M,
    imageConvolutionMatrix: R,
    imageGamma: T,
    imageVignette: P,
    imageNoise: E,
  } = m;
  zo(t, v, (t) => n(19, (u = t)));
  const A = {
      imageColorMatrix: M,
      imageConvolutionMatrix: R,
      imageGamma: T,
      imageVignette: P,
      imageNoise: E,
    },
    I = "finetune-" + C(),
    L = lr({});
  zo(t, L, (t) => n(18, (c = t)));
  const F = lr({});
  zo(t, F, (t) => n(5, (l = t)));
  let B = [];
  const z = La(u ? 20 : 0);
  zo(t, z, (t) => n(21, (p = t)));
  return (
    (t.$$set = (t) => {
      "stores" in t && n(14, (m = t.stores)),
        "isActive" in t && g(n(0, (f = t.isActive))),
        "locale" in t && n(15, ($ = t.locale)),
        "finetuneControlConfiguration" in t && n(16, (y = t.finetuneControlConfiguration)),
        "finetuneOptions" in t && n(17, (x = t.finetuneOptions));
    }),
    (t.$$.update = () => {
      var e;
      163840 & t.$$.dirty[0] &&
        n(1, (o = x ? x.map(([t, e]) => ({ id: t, label: Xe(e) ? e($) : e })) : [])),
        2 & t.$$.dirty[0] && n(2, (i = o.length && o[0].id)),
        4 & t.$$.dirty[0] && n(3, (r = { name: I, selected: i })),
        2 & t.$$.dirty[0] && n(4, (a = o.map((t) => t.id))),
        65536 & t.$$.dirty[0] &&
          y &&
          ((e = y),
          B && B.forEach((t) => t()),
          (B = a.map((t) => {
            const { getStore: n, getValue: o = D } = e[t];
            return n(A).subscribe((e) => {
              const n = null != e ? o(e) : e;
              Vo(L, (c = { ...c, [t]: n }), c);
            });
          }))),
        327680 & t.$$.dirty[0] &&
          y &&
          c &&
          Vo(
            F,
            (l = Object.keys(c).reduce((t, e) => {
              const {
                  base: n,
                  min: o,
                  max: i,
                  getLabel: r,
                  getStore: a,
                  setValue: s = (t, e) => t.set(e),
                } = y[e],
                l = a(A),
                u = null != c[e] ? c[e] : n;
              return (
                (t[e] = {
                  base: n,
                  min: o,
                  max: i,
                  value: u,
                  valueLabel: r ? r(u, o, i, i - o) : Math.round(100 * u),
                  oninputmove: (t) => {
                    s(l, t);
                  },
                  oninputend: (t) => {
                    s(l, t), b.write();
                  },
                  elasticity: S * k,
                  labelReset: $.labelReset,
                }),
                t
              );
            }, {})),
            l
          ),
        1572864 & t.$$.dirty[0] && u && z.set(d ? 0 : 20),
        2097152 & t.$$.dirty[0] && n(6, (s = p ? `transform: translateY(${p}px)` : void 0));
    }),
    [
      f,
      o,
      i,
      r,
      a,
      l,
      s,
      v,
      w,
      S,
      L,
      F,
      z,
      "finetune",
      m,
      $,
      y,
      x,
      c,
      u,
      d,
      p,
      ({ detail: t }) => n(2, (i = t)),
      function (e) {
        ki(t, e);
      },
    ]
  );
}
var Oh = {
  util: [
    "finetune",
    class extends rr {
      constructor(t) {
        super(),
          ir(
            this,
            t,
            Dh,
            zh,
            Lo,
            {
              name: 13,
              stores: 14,
              isActive: 0,
              locale: 15,
              finetuneControlConfiguration: 16,
              finetuneOptions: 17,
            },
            [-1, -1]
          );
      }
      get name() {
        return this.$$.ctx[13];
      }
      get stores() {
        return this.$$.ctx[14];
      }
      set stores(t) {
        this.$set({ stores: t }), Bi();
      }
      get isActive() {
        return this.$$.ctx[0];
      }
      set isActive(t) {
        this.$set({ isActive: t }), Bi();
      }
      get locale() {
        return this.$$.ctx[15];
      }
      set locale(t) {
        this.$set({ locale: t }), Bi();
      }
      get finetuneControlConfiguration() {
        return this.$$.ctx[16];
      }
      set finetuneControlConfiguration(t) {
        this.$set({ finetuneControlConfiguration: t }), Bi();
      }
      get finetuneOptions() {
        return this.$$.ctx[17];
      }
      set finetuneOptions(t) {
        this.$set({ finetuneOptions: t }), Bi();
      }
    },
  ],
};
function _h(t, e, n) {
  const o = t.slice();
  return (
    (o[47] = e[n].key),
    (o[48] = e[n].index),
    (o[49] = e[n].translate),
    (o[50] = e[n].scale),
    (o[14] = e[n].rotate),
    (o[51] = e[n].dir),
    (o[52] = e[n].center),
    (o[53] = e[n].type),
    o
  );
}
function Wh(t) {
  let e, n;
  return {
    c() {
      (e = Qo("div")),
        ai(e, "class", "PinturaShapeManipulator"),
        ai(e, "data-control", "point"),
        ai(
          e,
          "style",
          (n = `pointer-events:none;transform: translate3d(${t[52].x}px, ${t[52].y}px, 0) scale(${t[5]}, ${t[5]}); opacity: ${t[6]}`)
        );
    },
    m(t, n) {
      qo(t, e, n);
    },
    p(t, o) {
      104 & o[0] &&
        n !==
          (n = `pointer-events:none;transform: translate3d(${t[52].x}px, ${t[52].y}px, 0) scale(${t[5]}, ${t[5]}); opacity: ${t[6]}`) &&
        ai(e, "style", n);
    },
    d(t) {
      t && Ko(e);
    },
  };
}
function Vh(t, e) {
  let n, o, i, r, a, s, l, c, u;
  function d(...t) {
    return e[18](e[48], ...t);
  }
  let p = "edge" === e[53] && "both" !== e[2] && Wh(e);
  return {
    key: t,
    first: null,
    c() {
      (n = Qo("div")),
        (s = ei()),
        p && p.c(),
        (l = ni()),
        ai(n, "role", "button"),
        ai(n, "aria-label", (o = `Drag ${e[53]} ${e[47]}`)),
        ai(n, "tabindex", (i = "edge" === e[53] ? -1 : 0)),
        ai(n, "class", "PinturaShapeManipulator"),
        ai(n, "data-control", (r = e[53])),
        ai(
          n,
          "style",
          (a = `cursor: ${e[51] ? e[51] + "-resize" : "move"}; transform: translate3d(${
            e[49].x
          }px, ${e[49].y}px, 0) rotate(${e[14]}rad) scale(${"point" === e[53] ? e[5] : e[50].x}, ${
            "point" === e[53] ? e[5] : e[50].y
          }); opacity: ${e[6]}`)
        ),
        (this.first = n);
    },
    m(t, o) {
      qo(t, n, o),
        qo(t, s, o),
        p && p.m(t, o),
        qo(t, l, o),
        c ||
          ((u = [
            oi(n, "keydown", e[7]),
            oi(n, "keyup", e[8]),
            oi(n, "nudge", d),
            Uo(il.call(null, n)),
            oi(n, "interactionstart", function () {
              Io(e[11]("start", e[48])) && e[11]("start", e[48]).apply(this, arguments);
            }),
            oi(n, "interactionupdate", function () {
              Io(e[11]("move", e[48])) && e[11]("move", e[48]).apply(this, arguments);
            }),
            oi(n, "interactionend", function () {
              Io(e[11]("end", e[48])) && e[11]("end", e[48]).apply(this, arguments);
            }),
            Uo(ol.call(null, n)),
          ]),
          (c = !0));
    },
    p(t, s) {
      (e = t),
        8 & s[0] && o !== (o = `Drag ${e[53]} ${e[47]}`) && ai(n, "aria-label", o),
        8 & s[0] && i !== (i = "edge" === e[53] ? -1 : 0) && ai(n, "tabindex", i),
        8 & s[0] && r !== (r = e[53]) && ai(n, "data-control", r),
        104 & s[0] &&
          a !==
            (a = `cursor: ${e[51] ? e[51] + "-resize" : "move"}; transform: translate3d(${
              e[49].x
            }px, ${e[49].y}px, 0) rotate(${e[14]}rad) scale(${
              "point" === e[53] ? e[5] : e[50].x
            }, ${"point" === e[53] ? e[5] : e[50].y}); opacity: ${e[6]}`) &&
          ai(n, "style", a),
        "edge" === e[53] && "both" !== e[2]
          ? p
            ? p.p(e, s)
            : ((p = Wh(e)), p.c(), p.m(l.parentNode, l))
          : p && (p.d(1), (p = null));
    },
    d(t) {
      t && Ko(n), t && Ko(s), p && p.d(t), t && Ko(l), (c = !1), Ao(u);
    },
  };
}
function Uh(t) {
  let e, n, o, i;
  return {
    c() {
      (e = Qo("div")),
        ai(e, "role", "button"),
        ai(e, "aria-label", "Drag rotator"),
        ai(e, "tabindex", "0"),
        ai(e, "class", "PinturaShapeManipulator"),
        ai(e, "data-control", "rotate"),
        ai(
          e,
          "style",
          (n = `transform: translate3d(${t[0].x}px, ${t[0].y}px, 0) scale(${t[5]}, ${t[5]}); opacity: ${t[6]}`)
        );
    },
    m(n, r) {
      qo(n, e, r),
        o ||
          ((i = [
            oi(e, "keydown", t[7]),
            oi(e, "keyup", t[8]),
            oi(e, "nudge", t[13]),
            Uo(il.call(null, e)),
            oi(e, "interactionstart", t[14]("start")),
            oi(e, "interactionupdate", t[14]("move")),
            oi(e, "interactionend", t[14]("end")),
            Uo(ol.call(null, e)),
          ]),
          (o = !0));
    },
    p(t, o) {
      97 & o[0] &&
        n !==
          (n = `transform: translate3d(${t[0].x}px, ${t[0].y}px, 0) scale(${t[5]}, ${t[5]}); opacity: ${t[6]}`) &&
        ai(e, "style", n);
    },
    d(t) {
      t && Ko(e), (o = !1), Ao(i);
    },
  };
}
function Nh(t) {
  let e,
    n,
    o = [],
    i = new Map(),
    r = t[3];
  const a = (t) => t[47];
  for (let e = 0; e < r.length; e += 1) {
    let n = _h(t, r, e),
      s = a(n);
    i.set(s, (o[e] = Vh(s, n)));
  }
  let s = t[1] && t[4] && Uh(t);
  return {
    c() {
      for (let t = 0; t < o.length; t += 1) o[t].c();
      (e = ei()), s && s.c(), (n = ni());
    },
    m(t, i) {
      for (let e = 0; e < o.length; e += 1) o[e].m(t, i);
      qo(t, e, i), s && s.m(t, i), qo(t, n, i);
    },
    p(t, l) {
      6636 & l[0] && ((r = t[3]), (o = qi(o, l, a, 1, t, r, i, e.parentNode, Gi, Vh, e, _h))),
        t[1] && t[4]
          ? s
            ? s.p(t, l)
            : ((s = Uh(t)), s.c(), s.m(n.parentNode, n))
          : s && (s.d(1), (s = null));
    },
    i: Mo,
    o: Mo,
    d(t) {
      for (let e = 0; e < o.length; e += 1) o[e].d(t);
      t && Ko(e), s && s.d(t), t && Ko(n);
    },
  };
}
function Hh(t, e, n) {
  let o, i, r, a, s;
  const l = vi(),
    c = 0.5 * W,
    u = _ - c,
    d = _ + c,
    p = -_,
    h = p - c,
    g = p + c,
    m = O - c,
    f = -O + c,
    $ = c,
    y = -c,
    x = _ - W,
    b = x - c,
    w = x + c,
    S = O - W,
    k = S - c,
    C = S + c,
    M = p - W,
    R = M + c,
    T = M - c,
    P = p + W,
    E = P + c,
    A = P - c;
  let { points: I = [] } = e,
    { rotatorPoint: L } = e,
    { visible: F = !1 } = e,
    { enableResizing: B = !0 } = e,
    { enableRotating: z = !0 } = e,
    D = !1;
  const V = La(0.5, { precision: 1e-4, stiffness: 0.3, damping: 0.7 });
  zo(t, V, (t) => n(5, (a = t)));
  const U = La(0, { precision: 0.001 });
  zo(t, U, (t) => n(6, (s = t)));
  const N = (t) => {
      let e = "";
      return (
        ((t <= d && t >= u) || (t >= h && t <= g)) && (e = "ns"),
        (t <= f || t >= m || (t >= y && t <= $)) && (e = "ew"),
        ((t >= k && t <= C) || (t <= E && t >= A)) && (e = "nesw"),
        ((t >= b && t <= w) || (t <= R && t >= T)) && (e = "nwse"),
        e
      );
    },
    j = (t, e) => {
      l("resizestart", { indexes: t, translation: H() }),
        l("resizemove", { indexes: t, translation: e }),
        l("resizeend", { indexes: t, translation: H() });
    };
  return (
    (t.$$set = (t) => {
      "points" in t && n(15, (I = t.points)),
        "rotatorPoint" in t && n(0, (L = t.rotatorPoint)),
        "visible" in t && n(16, (F = t.visible)),
        "enableResizing" in t && n(17, (B = t.enableResizing)),
        "enableRotating" in t && n(1, (z = t.enableRotating));
    }),
    (t.$$.update = () => {
      65536 & t.$$.dirty[0] && V.set(F ? 1 : 0.5),
        65536 & t.$$.dirty[0] && U.set(F ? 1 : 0),
        131072 & t.$$.dirty[0] && n(2, (o = !!B && (v(B) ? B : "both"))),
        32772 & t.$$.dirty[0] &&
          n(
            3,
            (i =
              (o &&
                ((t, e) => {
                  let n = 0;
                  const o = at(t),
                    i = [],
                    r = t.length,
                    a = 2 === r,
                    s = "both" !== e;
                  for (; n < r; n++) {
                    const l = t[n - 1] || t[t.length - 1],
                      c = t[n],
                      u = t[n + 1] || t[0],
                      d = Math.atan2(u.y - c.y, u.x - c.x);
                    if (!s) {
                      const t = K(X(l.x - c.x, l.y - c.y)),
                        e = K(X(u.x - c.x, u.y - c.y)),
                        o = X(t.x + e.x, t.y + e.y);
                      i.push({
                        index: [n],
                        key: "point-" + n,
                        type: "point",
                        scale: { x: 1, y: 1 },
                        translate: { x: c.x, y: c.y },
                        angle: void 0,
                        rotate: a ? 0 : d,
                        center: c,
                        dir: a ? void 0 : N(Math.atan2(o.y, o.x)),
                      });
                    }
                    if (a) continue;
                    const p = X(c.x + 0.5 * (u.x - c.x), c.y + 0.5 * (u.y - c.y));
                    ("horizontal" === e && n % 2 == 0) ||
                      ("vertical" === e && n % 2 != 0) ||
                      i.push({
                        index: [n, n + 1 === r ? 0 : n + 1],
                        key: "edge-" + n,
                        type: "edge",
                        scale: { x: rt(c, u), y: 1 },
                        translate: { x: c.x, y: c.y },
                        angle: d,
                        rotate: d,
                        center: p,
                        dir: N(Math.atan2(o.y - p.y, o.x - p.x)),
                      });
                  }
                  return i;
                })(I, o)) ||
              [])
          ),
        32768 & t.$$.dirty[0] && n(4, (r = I.length > 2));
    }),
    [
      L,
      z,
      o,
      i,
      r,
      a,
      s,
      (t) => (D = t.shiftKey),
      (t) => (D = !1),
      V,
      U,
      (t, e) =>
        ({ detail: n }) => {
          const o = n && n.translation ? n.translation : X(0, 0);
          l("resize" + t, { indexes: e, translation: o, shiftKey: D });
        },
      j,
      ({ detail: t }) => {
        l("rotatestart", { translation: H() }),
          l("rotatemove", { translation: t }),
          l("rotateend", { translation: H() });
      },
      (t) =>
        ({ detail: e }) => {
          const n = e && e.translation ? e.translation : X(0, 0);
          l("rotate" + t, { translation: n, shiftKey: D });
        },
      I,
      F,
      B,
      (t, { detail: e }) => j(t, e),
    ]
  );
}
class Xh extends rr {
  constructor(t) {
    super(),
      ir(
        this,
        t,
        Hh,
        Nh,
        Lo,
        { points: 15, rotatorPoint: 0, visible: 16, enableResizing: 17, enableRotating: 1 },
        [-1, -1]
      );
  }
}
var jh = (t, e) => {
  const n = Zp(t);
  return et(n, e);
};
let Yh = null;
var Gh = (t) => {
  if ((null === Yh && (Yh = l() && "visualViewport" in window), !Yh)) return !1;
  const e = visualViewport.height,
    n = () => {
      t(visualViewport.height < e ? "visible" : "hidden");
    };
  return (
    visualViewport.addEventListener("resize", n),
    () => visualViewport.removeEventListener("resize", n)
  );
};
function Zh(t) {
  let e, n, o, i, r, a, s, l, c, u;
  o = new tl({ props: { onclick: t[1], label: t[5], icon: t[7], hideLabel: !t[6] } });
  const d = t[20].default,
    p = Do(d, t, t[19], null);
  return (
    (s = new tl({
      props: {
        onclick: t[0],
        label: t[2],
        icon: t[4],
        hideLabel: !t[3],
        class: "PinturaInputFormButtonConfirm",
      },
    })),
    {
      c() {
        (e = Qo("div")),
          (n = Qo("div")),
          tr(o.$$.fragment),
          (i = ei()),
          (r = Qo("div")),
          p && p.c(),
          (a = ei()),
          tr(s.$$.fragment),
          ai(r, "class", "PinturaInputFormFields"),
          ai(n, "class", "PinturaInputFormInner"),
          ai(e, "class", "PinturaInputForm"),
          ai(e, "style", t[9]);
      },
      m(d, h) {
        qo(d, e, h),
          Zo(e, n),
          er(o, n, null),
          Zo(n, i),
          Zo(n, r),
          p && p.m(r, null),
          Zo(n, a),
          er(s, n, null),
          t[21](e),
          (l = !0),
          c ||
            ((u = [
              oi(e, "focusin", t[10]),
              oi(e, "focusout", t[11]),
              oi(e, "measure", t[12]),
              Uo(Ha.call(null, e)),
            ]),
            (c = !0));
      },
      p(t, n) {
        const i = {};
        2 & n[0] && (i.onclick = t[1]),
          32 & n[0] && (i.label = t[5]),
          128 & n[0] && (i.icon = t[7]),
          64 & n[0] && (i.hideLabel = !t[6]),
          o.$set(i),
          p && p.p && 524288 & n[0] && _o(p, d, t, t[19], n, null, null);
        const r = {};
        1 & n[0] && (r.onclick = t[0]),
          4 & n[0] && (r.label = t[2]),
          16 & n[0] && (r.icon = t[4]),
          8 & n[0] && (r.hideLabel = !t[3]),
          s.$set(r),
          (!l || 512 & n[0]) && ai(e, "style", t[9]);
      },
      i(t) {
        l || (Ni(o.$$.fragment, t), Ni(p, t), Ni(s.$$.fragment, t), (l = !0));
      },
      o(t) {
        Hi(o.$$.fragment, t), Hi(p, t), Hi(s.$$.fragment, t), (l = !1);
      },
      d(n) {
        n && Ko(e), nr(o), p && p.d(n), nr(s), t[21](null), (c = !1), Ao(u);
      },
    }
  );
}
function qh(t, e, n) {
  let o,
    i,
    r,
    a,
    { $$slots: s = {}, $$scope: l } = e,
    { onconfirm: c } = e,
    { oncancel: u } = e,
    { autoFocus: d = !0 } = e,
    { autoPositionCursor: p = !0 } = e,
    { labelConfirm: h } = e,
    { labelConfirmShow: g = !0 } = e,
    { iconConfirm: m } = e,
    { labelCancel: f } = e,
    { labelCancelShow: $ = !1 } = e,
    { iconCancel: y } = e,
    { panelOffset: x = H() } = e,
    b = !1,
    v = void 0,
    w = void 0,
    S = "",
    k = 0;
  const C = () => {
      a.querySelector("input, textarea").focus();
    },
    M = () => {
      (b = !0),
        T || (!Se() && !Br()) || n(16, (S = "top:1em;bottom:auto;")),
        Se() &&
          ((t) => {
            let e;
            const n = (t) => (e = t.touches[0].screenY),
              o = (t) => {
                const n = t.touches[0].screenY,
                  o = t.target;
                /textarea/i.test(o.nodeName)
                  ? (n > e
                      ? 0 == o.scrollTop && t.preventDefault()
                      : n < e
                      ? o.scrollTop + o.offsetHeight == o.scrollHeight && t.preventDefault()
                      : t.preventDefault(),
                    (e = n))
                  : t.preventDefault();
              };
            t.addEventListener("touchstart", n), t.addEventListener("touchmove", o);
          })(a),
        n(17, (k = 1));
    };
  let R;
  const T = Gh((t) => {
    i &&
      ("hidden" !== t || b
        ? (clearTimeout(w),
          (w = void 0),
          n(16, (S = `top:${visualViewport.height - v - x.y}px`)),
          "visible" === t
            ? (n(8, (a.dataset.layout = "stick"), a), C(), M())
            : ((b = !1), n(17, (k = 0))))
        : C());
  });
  return (
    yi(() => {
      d && C();
    }),
    bi(() => {
      T && T();
    }),
    (t.$$set = (t) => {
      "onconfirm" in t && n(0, (c = t.onconfirm)),
        "oncancel" in t && n(1, (u = t.oncancel)),
        "autoFocus" in t && n(13, (d = t.autoFocus)),
        "autoPositionCursor" in t && n(14, (p = t.autoPositionCursor)),
        "labelConfirm" in t && n(2, (h = t.labelConfirm)),
        "labelConfirmShow" in t && n(3, (g = t.labelConfirmShow)),
        "iconConfirm" in t && n(4, (m = t.iconConfirm)),
        "labelCancel" in t && n(5, (f = t.labelCancel)),
        "labelCancelShow" in t && n(6, ($ = t.labelCancelShow)),
        "iconCancel" in t && n(7, (y = t.iconCancel)),
        "panelOffset" in t && n(15, (x = t.panelOffset)),
        "$$scope" in t && n(19, (l = t.$$scope));
    }),
    (t.$$.update = () => {
      256 & t.$$.dirty[0] && n(18, (o = a && getComputedStyle(a))),
        262144 & t.$$.dirty[0] && (i = o && "1" === o.getPropertyValue("--editor-modal")),
        196608 & t.$$.dirty[0] && n(9, (r = `opacity:${k};${S}`));
    }),
    [
      c,
      u,
      h,
      g,
      m,
      f,
      $,
      y,
      a,
      r,
      (t) => {
        var e;
        ((t) => /textarea/i.test(t))(t.target) &&
          ((R = Date.now()),
          p && ((e = t.target).selectionStart = e.selectionEnd = e.value.length),
          clearTimeout(w),
          (w = setTimeout(M, 200)));
      },
      (t) => {
        Date.now() - R > 50 || (t.stopPropagation(), C());
      },
      ({ detail: t }) => {
        v = t.height;
      },
      d,
      p,
      x,
      S,
      k,
      o,
      l,
      s,
      function (t) {
        Mi[t ? "unshift" : "push"](() => {
          (a = t), n(8, a);
        });
      },
    ]
  );
}
class Kh extends rr {
  constructor(t) {
    super(),
      ir(
        this,
        t,
        qh,
        Zh,
        Lo,
        {
          onconfirm: 0,
          oncancel: 1,
          autoFocus: 13,
          autoPositionCursor: 14,
          labelConfirm: 2,
          labelConfirmShow: 3,
          iconConfirm: 4,
          labelCancel: 5,
          labelCancelShow: 6,
          iconCancel: 7,
          panelOffset: 15,
        },
        [-1, -1]
      );
  }
}
function Qh(t, e, n) {
  const o = t.slice();
  return (o[157] = e[n]), (o[159] = n), o;
}
function Jh(t, e) {
  let n,
    o,
    i,
    r,
    a,
    s,
    l,
    c,
    u,
    d,
    p,
    h = e[157].name + "";
  function g(...t) {
    return e[118](e[159], ...t);
  }
  return (
    (i = new ad({ props: { color: e[157].color } })),
    {
      key: t,
      first: null,
      c() {
        (n = Qo("li")),
          (o = Qo("button")),
          tr(i.$$.fragment),
          (r = ei()),
          (a = Qo("span")),
          (s = ti(h)),
          (c = ei()),
          ai(o, "class", "PinturaShapeListItem"),
          ai(o, "type", "button"),
          ai(o, "aria-label", (l = "Select shape " + e[157].name)),
          (this.first = n);
      },
      m(t, e) {
        qo(t, n, e),
          Zo(n, o),
          er(i, o, null),
          Zo(o, r),
          Zo(o, a),
          Zo(a, s),
          Zo(n, c),
          (u = !0),
          d || ((p = oi(o, "click", g)), (d = !0));
      },
      p(t, n) {
        e = t;
        const r = {};
        524288 & n[0] && (r.color = e[157].color),
          i.$set(r),
          (!u || 524288 & n[0]) && h !== (h = e[157].name + "") && li(s, h),
          (!u || (524288 & n[0] && l !== (l = "Select shape " + e[157].name))) &&
            ai(o, "aria-label", l);
      },
      i(t) {
        u || (Ni(i.$$.fragment, t), (u = !0));
      },
      o(t) {
        Hi(i.$$.fragment, t), (u = !1);
      },
      d(t) {
        t && Ko(n), nr(i), (d = !1), p();
      },
    }
  );
}
function tg(t) {
  let e, n;
  return (
    (e = new Xh({
      props: {
        visible: !0,
        points: t[8],
        rotatorPoint: t[14],
        enableResizing: t[13],
        enableRotating: t[6],
      },
    })),
    e.$on("resizestart", t[25]),
    e.$on("resizemove", t[26]),
    e.$on("resizeend", t[27]),
    e.$on("rotatestart", t[28]),
    e.$on("rotatemove", t[29]),
    e.$on("rotateend", t[30]),
    {
      c() {
        tr(e.$$.fragment);
      },
      m(t, o) {
        er(e, t, o), (n = !0);
      },
      p(t, n) {
        const o = {};
        256 & n[0] && (o.points = t[8]),
          16384 & n[0] && (o.rotatorPoint = t[14]),
          8192 & n[0] && (o.enableResizing = t[13]),
          64 & n[0] && (o.enableRotating = t[6]),
          e.$set(o);
      },
      i(t) {
        n || (Ni(e.$$.fragment, t), (n = !0));
      },
      o(t) {
        Hi(e.$$.fragment, t), (n = !1);
      },
      d(t) {
        nr(e, t);
      },
    }
  );
}
function eg(t) {
  let e, n;
  return (
    (e = new Kh({
      props: {
        panelOffset: t[1],
        onconfirm: t[36],
        oncancel: t[37],
        labelCancel: t[3].shapeLabelInputCancel,
        iconCancel: t[3].shapeIconInputCancel,
        labelConfirm: t[3].shapeLabelInputConfirm,
        iconConfirm: t[3].shapeIconInputConfirm,
        $$slots: { default: [ng] },
        $$scope: { ctx: t },
      },
    })),
    {
      c() {
        tr(e.$$.fragment);
      },
      m(t, o) {
        er(e, t, o), (n = !0);
      },
      p(t, n) {
        const o = {};
        2 & n[0] && (o.panelOffset = t[1]),
          8 & n[0] && (o.labelCancel = t[3].shapeLabelInputCancel),
          8 & n[0] && (o.iconCancel = t[3].shapeIconInputCancel),
          8 & n[0] && (o.labelConfirm = t[3].shapeLabelInputConfirm),
          8 & n[0] && (o.iconConfirm = t[3].shapeIconInputConfirm),
          (100352 & n[0]) | (32 & n[5]) && (o.$$scope = { dirty: n, ctx: t }),
          e.$set(o);
      },
      i(t) {
        n || (Ni(e.$$.fragment, t), (n = !0));
      },
      o(t) {
        Hi(e.$$.fragment, t), (n = !1);
      },
      d(t) {
        nr(e, t);
      },
    }
  );
}
function ng(t) {
  let e, n, o;
  return {
    c() {
      (e = Qo("textarea")),
        ai(e, "style", t[16]),
        ai(e, "spellcheck", "false"),
        ai(e, "autocorrect", "off"),
        ai(e, "autocapitalize", "off"),
        (e.value = t[15]);
    },
    m(i, r) {
      qo(i, e, r),
        t[119](e),
        n ||
          ((o = [
            oi(e, "keydown", t[34]),
            oi(e, "keypress", t[33]),
            oi(e, "keyup", t[35]),
            oi(e, "input", t[32]),
          ]),
          (n = !0));
    },
    p(t, n) {
      65536 & n[0] && ai(e, "style", t[16]), 32768 & n[0] && (e.value = t[15]);
    },
    d(i) {
      i && Ko(e), t[119](null), (n = !1), Ao(o);
    },
  };
}
function og(t) {
  let e, n, o, i, r;
  return (
    (n = new Ec({ props: { items: t[18] } })),
    {
      c() {
        (e = Qo("div")),
          tr(n.$$.fragment),
          ai(e, "class", "PinturaShapeControls"),
          ai(e, "style", t[17]);
      },
      m(a, s) {
        qo(a, e, s),
          er(n, e, null),
          (o = !0),
          i || ((r = [oi(e, "measure", t[120]), Uo(Ha.call(null, e))]), (i = !0));
      },
      p(t, i) {
        const r = {};
        262144 & i[0] && (r.items = t[18]),
          n.$set(r),
          (!o || 131072 & i[0]) && ai(e, "style", t[17]);
      },
      i(t) {
        o || (Ni(n.$$.fragment, t), (o = !0));
      },
      o(t) {
        Hi(n.$$.fragment, t), (o = !1);
      },
      d(t) {
        t && Ko(e), nr(n), (i = !1), Ao(r);
      },
    }
  );
}
function ig(t) {
  let e,
    n,
    o,
    i,
    r,
    a,
    s,
    l,
    c,
    u,
    d = [],
    p = new Map(),
    h = t[19];
  const g = (t) => t[157].id;
  for (let e = 0; e < h.length; e += 1) {
    let n = Qh(t, h, e),
      o = g(n);
    p.set(o, (d[e] = Jh(o, n)));
  }
  let m = t[7] && tg(t),
    f = t[9] && eg(t),
    $ = t[10] > 0 && og(t);
  return {
    c() {
      (e = Qo("div")), (n = Qo("nav")), (o = Qo("ul"));
      for (let t = 0; t < d.length; t += 1) d[t].c();
      (i = ei()),
        m && m.c(),
        (r = ei()),
        f && f.c(),
        (a = ei()),
        $ && $.c(),
        ai(n, "class", "PinturaShapeList"),
        ai(n, "data-visible", t[12]),
        ai(e, "class", "PinturaShapeEditor"),
        ai(e, "tabindex", "0");
    },
    m(p, h) {
      qo(p, e, h), Zo(e, n), Zo(n, o);
      for (let t = 0; t < d.length; t += 1) d[t].m(o, null);
      Zo(e, i),
        m && m.m(e, null),
        Zo(e, r),
        f && f.m(e, null),
        Zo(e, a),
        $ && $.m(e, null),
        (l = !0),
        c ||
          ((u = [
            oi(n, "focusin", t[40]),
            oi(n, "focusout", t[41]),
            oi(e, "keydown", t[31]),
            oi(e, "nudge", t[39]),
            oi(e, "measure", t[117]),
            Uo(Ha.call(null, e)),
            Uo(il.call(null, e)),
            oi(e, "interactionstart", t[21]),
            oi(e, "interactionupdate", t[22]),
            oi(e, "interactionrelease", t[23]),
            oi(e, "interactionend", t[24]),
            Uo(
              (s = ol.call(null, e, {
                drag: !0,
                pinch: !0,
                inertia: !0,
                matchTarget: !0,
                getEventPosition: t[121],
              }))
            ),
          ]),
          (c = !0));
    },
    p(t, i) {
      524305 & i[0] &&
        ((h = t[19]), Vi(), (d = qi(d, i, g, 1, t, h, p, o, Zi, Jh, null, Qh)), Ui()),
        (!l || 4096 & i[0]) && ai(n, "data-visible", t[12]),
        t[7]
          ? m
            ? (m.p(t, i), 128 & i[0] && Ni(m, 1))
            : ((m = tg(t)), m.c(), Ni(m, 1), m.m(e, r))
          : m &&
            (Vi(),
            Hi(m, 1, 1, () => {
              m = null;
            }),
            Ui()),
        t[9]
          ? f
            ? (f.p(t, i), 512 & i[0] && Ni(f, 1))
            : ((f = eg(t)), f.c(), Ni(f, 1), f.m(e, a))
          : f &&
            (Vi(),
            Hi(f, 1, 1, () => {
              f = null;
            }),
            Ui()),
        t[10] > 0
          ? $
            ? ($.p(t, i), 1024 & i[0] && Ni($, 1))
            : (($ = og(t)), $.c(), Ni($, 1), $.m(e, null))
          : $ &&
            (Vi(),
            Hi($, 1, 1, () => {
              $ = null;
            }),
            Ui()),
        s &&
          Io(s.update) &&
          4 & i[0] &&
          s.update.call(null, {
            drag: !0,
            pinch: !0,
            inertia: !0,
            matchTarget: !0,
            getEventPosition: t[121],
          });
    },
    i(t) {
      if (!l) {
        for (let t = 0; t < h.length; t += 1) Ni(d[t]);
        Ni(m), Ni(f), Ni($), (l = !0);
      }
    },
    o(t) {
      for (let t = 0; t < d.length; t += 1) Hi(d[t]);
      Hi(m), Hi(f), Hi($), (l = !1);
    },
    d(t) {
      t && Ko(e);
      for (let t = 0; t < d.length; t += 1) d[t].d();
      m && m.d(), f && f.d(), $ && $.d(), (c = !1), Ao(u);
    },
  };
}
function rg(t, e, o) {
  let i,
    r,
    a,
    s,
    l,
    c,
    u,
    d,
    p,
    h,
    g,
    m,
    f,
    $,
    y,
    x,
    b,
    v,
    w,
    S,
    k,
    M,
    R,
    T,
    P,
    E,
    A,
    I,
    L,
    F,
    B,
    z,
    O,
    _,
    W,
    { markup: V } = e,
    { offset: U } = e,
    { contextRotation: H = 0 } = e,
    { contextFlipX: j = !1 } = e,
    { contextFlipY: G = !1 } = e,
    { scale: q } = e,
    { ui: it } = e,
    { opacity: ct = 1 } = e,
    { parentRect: ut } = e,
    { rootRect: dt } = e,
    { utilRect: pt } = e,
    { oninteractionstart: ht = n } = e,
    { oninteractionupdate: gt = n } = e,
    { oninteractionrelease: mt = n } = e,
    { oninteractionend: ft = n } = e,
    { onaddshape: $t = n } = e,
    { onupdateshape: yt = n } = e,
    { onselectshape: xt = n } = e,
    { onremoveshape: bt = n } = e,
    { beforeSelectShape: wt = () => !0 } = e,
    { beforeDeselectShape: kt = () => !0 } = e,
    { beforeRemoveShape: Ct = () => !0 } = e,
    { beforeUpdateShape: Mt = (t, e) => e } = e,
    { willRenderShapeControls: Rt = D } = e,
    { mapEditorPointToImagePoint: Tt } = e,
    { mapImagePointToEditorPoint: It } = e,
    { eraseRadius: Bt } = e,
    { selectRadius: zt } = e,
    { enableButtonFlipVertical: Dt = !1 } = e,
    { locale: Ot } = e;
  const _t = (t, e, n) => {
      let o = Mt({ ...t }, e, { ...n });
      io(t, o, n);
    },
    Wt = (t, e, n, o) => {
      const i = X(t.x - n.x, t.y - n.y),
        r = X(o.x - n.x, o.y - n.y),
        a = ot(r, r);
      let s = ot(i, r) / a;
      (s = s < 0 ? 0 : s), (s = s > 1 ? 1 : s);
      const l = X(r.x * s + n.x - t.x, r.y * s + n.y - t.y);
      return ot(l, l) <= e * e;
    },
    Vt = (t, e, n) => {
      if (ne(t, n)) return !0;
      const o = n.length;
      for (let i = 0; i < o - 1; i++) if (Wt(t, e, n[i], n[i + 1])) return !0;
      return Wt(t, e, n[0], n[o - 1]);
    },
    Ut = (t, e, n, o, i) => Vt(t, e, Nt(n, o, i || Ft(n))),
    Ht = Si("keysPressed");
  zo(t, Ht, (t) => o(128, (_ = t)));
  const Xt = (t, e) => {
      const n = It(t);
      return Tt(tt(n, e));
    },
    jt = (t, e, n) => {
      if (Mn(t)) {
        const o = Xt(xn(e), n),
          i = Xt(bn(e), n);
        _t(t, { x1: o.x, y1: o.y, x2: i.x, y2: i.y }, ut);
      } else if (kn(t) || vn(t) || Cn(t)) {
        const o = Xt(e, n);
        _t(t, o, ut);
      }
      oe();
    };
  let qt;
  const Kt = () => {
      if (!V.length) return;
      const t = V[V.length - 1];
      return t.isDraft ? t : void 0;
    },
    Qt = (t, e = !0) => {
      if (!Kt()) return (t = Object.assign(t, { isDraft: !0 })), re(t, e);
    },
    Jt = () => {
      const t = Kt();
      if (t) return se(t, "isDraft", !1), t;
    },
    te = () => {
      Kt() && o(0, (V = V.slice(0, -1)));
    },
    oe = () => o(0, V),
    re = (t, e = !0) => (V.push(t), e && oe(), t),
    ae = (t, e, n = !0) => {
      (t = Object.assign(t, e)), n && oe();
    },
    se = (t, e, n, o = !0) => {
      (t[e] = n), o && oe();
    },
    le = (t, e = !0) => {
      V.forEach((e) => ae(e, t, !1)), e && oe();
    },
    ce = () => [...V].reverse().find(An),
    ue = () => !!ce(),
    de = (t, e = !0) => {
      if (!Ct(t)) return !1;
      const n = V.filter((e) => e !== t);
      bt(t), e && o(0, (V = n));
    },
    pe = () => {
      const t = ce();
      if (!t) return;
      const e = V.filter((t) => Wn(t) && _n(t)),
        n = e.findIndex((e) => e === t);
      if (!1 === de(t)) return;
      if (((he = t), e.length - 1 == 0)) return ge();
      const o = n - 1 < 0 ? e.length - 1 : n - 1;
      fe(e[o]);
    };
  let he = void 0;
  const ge = () => {
      (he = me()), le({ isSelected: !1, isEditing: !1 });
    },
    me = () => V.find(An),
    fe = (t, e = !0) => {
      if (t.isDraft) return;
      const n = me() || he;
      (he = void 0),
        wt(n, t) &&
          (ge(),
          ((t) => {
            t.isSelected = !0;
          })(t),
          xt(t),
          e && oe());
    },
    $e = (t) => {
      ae(t, { isSelected: !1, isEditing: !1 });
    },
    ye = (t) => {
      ae(t, { isSelected: !0, isEditing: !0 });
    },
    xe = (t) => {
      ae(t, { isSelected: !0, isEditing: !1 });
    },
    be = (t) => {
      const e = t.filter(Ct);
      return o(0, (V = V.filter((t) => !e.includes(t)))), e;
    },
    ve = (t) => {
      const e = ln(t.text, t);
      return Lt(
        t.x,
        t.y,
        t.width ? Math.min(t.width, e.width) : e.width,
        t.height ? Math.min(t.height, e.height) : e.height
      );
    },
    we = (t) => {
      if (Ln(t)) return Pt(t);
      if (Cn(t)) return At(t);
      const e = ve(t);
      return (e.width = Math.max(10, t.width || e.width)), e;
    },
    Se = (t, e = 0) =>
      [...V]
        .reverse()
        .map((t) => ({ shape: t, priority: 1 }))
        .filter((t) => _n(t.shape))
        .filter((n) => {
          const { shape: o } = n,
            i = eo(hn(o), ut),
            r = e + (i.strokeWidth || 0);
          if (kn(i)) return Ut(t, r, i, o.rotation);
          if (vn(i)) {
            const e = we(i),
              a = Ut(t, r, e, o.rotation);
            let s = !1;
            if (a && !An(o)) {
              const a = ve(i);
              "right" !== o.textAlign || o.flipX || (a.x = e.x + e.width - a.width),
                "center" === o.textAlign && (a.x = e.x + 0.5 * e.width - 0.5 * a.width),
                (s = Ut(t, r, a, o.rotation, Ft(e))),
                s || (n.priority = -1);
            }
            return a;
          }
          return Cn(i)
            ? ((t, e, n, o, i, r) => {
                const a = ie(X(n.x, n.y), n.rx, n.ry, o, i, r, 12);
                return Vt(t, e, a);
              })(t, r, i, o.rotation, o.flipX, o.flipY)
            : !!Mn(i) && Wt(t, Math.max(16, r), xn(i), bn(i));
        })
        .sort((t, e) => (t.priority < e.priority ? 1 : t.priority > e.priority ? -1 : 0)),
    ke = (t, e, n = 0) => {
      let o = Math.abs(n);
      const i = St(vt(t, e), o),
        r = (({ start: t, end: e }, n) => {
          if (0 === n) return [X(t.x, t.y), X(t.x, t.y), X(e.x, e.y), X(e.x, e.y)];
          const o = Math.atan2(e.y - t.y, e.x - t.x),
            i = Math.sin(o) * n,
            r = Math.cos(o) * n;
          return [
            X(i + t.x, -r + t.y),
            X(-i + t.x, r + t.y),
            X(-i + e.x, r + e.y),
            X(i + e.x, -r + e.y),
          ];
        })(i, o);
      return V.filter(On).filter((t) => {
        const e = eo(hn(t), ut);
        return Mn(e) || Tn(e)
          ? !!((t, e) => {
              const n = [...e, e[0]],
                o = n.length,
                i = [];
              for (let e = 0; e < o - 1; e++) {
                const o = ee(t.start, t.end, X(n[e].x, n[e].y), X(n[e + 1].x, n[e + 1].y));
                o && i.push(o);
              }
              return i.length ? i : void 0;
            })(i, Ee(e))
          : ((t, e) => {
              const n = [t, e],
                o = t.length,
                i = e.length;
              let r, a, s, l, c, u, d, p, h;
              for (let g = 0; g < n.length; g++) {
                const m = n[g],
                  f = m.length;
                for (h = 0; h < f; h++) {
                  for (
                    p = (h + 1) % f, d = X(m[p].y - m[h].y, m[h].x - m[p].x), r = a = null, u = 0;
                    u < o;
                    u++
                  )
                    (s = d.x * t[u].x + d.y * t[u].y),
                      (null === r || s < r) && (r = s),
                      (null === a || s > a) && (a = s);
                  for (l = c = null, u = 0; u < i; u++)
                    (s = d.x * e[u].x + d.y * e[u].y),
                      (null === l || s < l) && (l = s),
                      (null === c || s > c) && (c = s);
                  if (a < l || c < r) return !1;
                }
              }
              return !0;
            })(
              r,
              ((t, e = 12) =>
                kn(t)
                  ? Nt(t, t.rotation, Ft(t))
                  : vn(t)
                  ? Nt(we(t), t.rotation, Ft(t))
                  : Cn(t)
                  ? ie(X(t.x, t.y), t.rx, t.ry, t.rotation, t.flipX, t.flipY, e)
                  : [])(e)
            );
      });
    };
  let Ce = void 0,
    Me = void 0,
    Re = void 0,
    Te = void 0,
    Pe = !1;
  const Ee = (t) => {
      let e, n;
      if (kn(t))
        (e = Ft(t)),
          (n = Zt(t)),
          (t.flipX || t.flipY) && st(n, t.flipX, t.flipY, e.x, e.y),
          (n = lt(n, t.rotation, e.x, e.y));
      else if (Cn(t))
        (e = t),
          (n = Zt(At(t))),
          (t.flipX || t.flipY) && st(n, t.flipX, t.flipY, e.x, e.y),
          (n = lt(n, t.rotation, e.x, e.y));
      else if (Mn(t)) (n = [xn(t), bn(t)]), (e = at(n));
      else if (Tn(t)) (n = [...t.points]), (e = at(n));
      else if (vn(t)) {
        const o = we(t);
        (o.width = Math.max(10, o.width)),
          (e = Ft(o)),
          (n = Zt(o)),
          (t.flipX || t.flipY) && st(n, t.flipX, t.flipY, e.x, e.y),
          (n = lt(n, t.rotation, e.x, e.y));
      }
      return n;
    },
    Ae = (t) => {
      const e = Ee(t);
      let n, o;
      return (
        t.flipY
          ? ((n = at([e[0], e[1]])), (o = K(X(e[1].x - e[2].x, e[1].y - e[2].y))))
          : ((n = at([e[2], e[3]])), (o = K(X(e[2].x - e[1].x, e[2].y - e[1].y)))),
        nt(o, 20 / q),
        { origin: n, dir: o }
      );
    };
  let Ie = "markup-manipulator-segment";
  bi(() => {
    o(42, (it = it.filter((t) => t.id !== Ie)));
  });
  let Le;
  const Fe = () => {
      const t = wn(i) ? ze(Le.value) : Le.value,
        e = Un(i, t),
        n = !0 === e ? t : e;
      let o = v.x,
        r = v.y;
      if (!i.height && 0 !== i.rotation) {
        const t = ln(n, i),
          e = Lt(v.x, v.y, t.width, t.height),
          [a] = Nt(e, v.rotation),
          [s] = Nt(S, v.rotation);
        (o += s.x - a.x), (r += s.y - a.y);
      }
      ae(i, { x: o, y: r, text: n });
    },
    Be = () => ye(i),
    ze = (t) =>
      t
        .split(/[\n\r]/g)
        .map((t) => t.trim())
        .filter((t) => t.length)
        .join(" "),
    De = () => {
      let t = i.isDraft;
      i.isDraft && Jt(), Fe(), xe(i), t ? $t(i) : yt(i);
    },
    Oe = () => {
      i.isDraft ? te() : (ae(i, { text: v.text, x: v.x, y: v.y }), xe(i));
    },
    _e = (t) => {
      t.stopPropagation();
      const e = i.flipX || !1;
      se(i, "flipX", !e), yt(i);
    },
    We = (t) => {
      t.stopPropagation();
      const e = i.flipY || !1;
      se(i, "flipY", !e), yt(i);
    },
    Ve = (t) => {
      t.stopPropagation(), t.target.blur(), pe();
    },
    Ue = (t) => {
      t.stopPropagation();
      V.findIndex((t) => t === i) !== V.length - 1 &&
        (o(0, (V = V.filter((t) => t !== i).concat([i]))), yt(i));
    },
    Ne = (t) => {
      t.stopPropagation();
      const e = hn(i);
      e.id = C();
      const n = X(50, -50);
      if (Mn(e)) {
        const t = oo(e, ["x1", "y1", "x2", "y2"], ut);
        (t.x1 += n.x), (t.y1 += n.y), (t.x2 += n.x), (t.y2 += n.y), io(e, t, ut);
      } else {
        const t = oo(e, ["x", "y"], ut);
        (t.x += 50), (t.y -= 50), io(e, t, ut);
      }
      V.push(e), $t(e), fe(e);
    },
    Xe = La(0, { stiffness: 0.2, damping: 0.7 });
  let je;
  zo(t, Xe, (t) => o(10, (W = t)));
  let Ye = !1;
  return (
    (t.$$set = (t) => {
      "markup" in t && o(0, (V = t.markup)),
        "offset" in t && o(1, (U = t.offset)),
        "contextRotation" in t && o(43, (H = t.contextRotation)),
        "contextFlipX" in t && o(44, (j = t.contextFlipX)),
        "contextFlipY" in t && o(45, (G = t.contextFlipY)),
        "scale" in t && o(46, (q = t.scale)),
        "ui" in t && o(42, (it = t.ui)),
        "opacity" in t && o(47, (ct = t.opacity)),
        "parentRect" in t && o(48, (ut = t.parentRect)),
        "rootRect" in t && o(2, (dt = t.rootRect)),
        "utilRect" in t && o(49, (pt = t.utilRect)),
        "oninteractionstart" in t && o(50, (ht = t.oninteractionstart)),
        "oninteractionupdate" in t && o(51, (gt = t.oninteractionupdate)),
        "oninteractionrelease" in t && o(52, (mt = t.oninteractionrelease)),
        "oninteractionend" in t && o(53, (ft = t.oninteractionend)),
        "onaddshape" in t && o(54, ($t = t.onaddshape)),
        "onupdateshape" in t && o(55, (yt = t.onupdateshape)),
        "onselectshape" in t && o(56, (xt = t.onselectshape)),
        "onremoveshape" in t && o(57, (bt = t.onremoveshape)),
        "beforeSelectShape" in t && o(58, (wt = t.beforeSelectShape)),
        "beforeDeselectShape" in t && o(59, (kt = t.beforeDeselectShape)),
        "beforeRemoveShape" in t && o(60, (Ct = t.beforeRemoveShape)),
        "beforeUpdateShape" in t && o(61, (Mt = t.beforeUpdateShape)),
        "willRenderShapeControls" in t && o(62, (Rt = t.willRenderShapeControls)),
        "mapEditorPointToImagePoint" in t && o(63, (Tt = t.mapEditorPointToImagePoint)),
        "mapImagePointToEditorPoint" in t && o(64, (It = t.mapImagePointToEditorPoint)),
        "eraseRadius" in t && o(65, (Bt = t.eraseRadius)),
        "selectRadius" in t && o(66, (zt = t.selectRadius)),
        "enableButtonFlipVertical" in t && o(67, (Dt = t.enableButtonFlipVertical)),
        "locale" in t && o(3, (Ot = t.locale));
    }),
    (t.$$.update = () => {
      var e, n;
      if (
        (1 & t.$$.dirty[0] && o(96, (i = V && (Kt() || ce()))),
        8 & t.$$.dirty[3] && o(97, (r = i && !In(i) ? i.id : void 0)),
        (131072 & t.$$.dirty[1]) | (8 & t.$$.dirty[3]) && o(98, (a = i && eo(hn(i), ut))),
        8 & t.$$.dirty[3] && o(99, (s = !(!i || !In(i)))),
        8 & t.$$.dirty[3] && o(100, (l = i || void 0)),
        40 & t.$$.dirty[3] && o(101, (c = (i && !Tn(a) && Ee(a)) || [])),
        8 & t.$$.dirty[3] &&
          o(
            102,
            (u =
              i &&
              !0 !== (e = i).disableResize &&
              !In(e) &&
              (Ln(e) || Sn(e) || Cn(e) || Mn(e)) &&
              !Fn(e) &&
              Nn(e) &&
              !Pn(i))
          ),
        8 & t.$$.dirty[3] &&
          o(
            6,
            (d =
              i &&
              ((t) =>
                !0 !== t.disableRotate && !In(t) && (Ln(t) || He(t, "text") || Cn(t)) && !Fn(t))(
                i
              ) &&
              !Pn(i))
          ),
        520 & t.$$.dirty[3] && o(13, (p = u && He(i, "text") && !i.height ? "horizontal" : u)),
        264 & t.$$.dirty[3] && o(7, (h = i && c.length > 1)),
        (4 & t.$$.dirty[2]) | (256 & t.$$.dirty[3]) && o(103, (g = c.map(It))),
        (2 & t.$$.dirty[0]) | (1024 & t.$$.dirty[3]) &&
          o(8, (m = g.map((t) => X(t.x - U.x, t.y - U.y)))),
        (192 & t.$$.dirty[0]) | (32 & t.$$.dirty[3]) &&
          o(
            104,
            (f =
              h &&
              d &&
              ((t) => {
                const e = Ae(t),
                  n = It({ x: e.origin.x + e.dir.x, y: e.origin.y + e.dir.y });
                return { origin: It(e.origin), position: n };
              })(a))
          ),
        (2 & t.$$.dirty[0]) | (2048 & t.$$.dirty[3]) &&
          o(14, ($ = f && X(f.position.x - U.x, f.position.y - U.y))),
        65536 & t.$$.dirty[1] && o(105, (y = ct)),
        (256 & t.$$.dirty[0]) | (67584 & t.$$.dirty[1]) | (7168 & t.$$.dirty[3]))
      )
        if (ct > 0 && m.length > 2) {
          const t = [...g, g[0]],
            e = t.length,
            n = [],
            i = [0, 0, 0, 0.1 * y],
            r = [1, 1, 1, y],
            a = 1.5;
          for (let o = 0; o < e - 1; o++) {
            const e = t[o],
              r = t[o + 1];
            n.push({
              id: Ie,
              opacity: 1,
              points: [X(e.x + 1, e.y + 1), X(r.x + 1, r.y + 1)],
              strokeColor: i,
              strokeWidth: 2,
            });
          }
          f &&
            n.push({
              id: Ie,
              opacity: 1,
              points: [X(f.origin.x + 1, f.origin.y + 1), X(f.position.x + 1, f.position.y + 1)],
              strokeColor: i,
              strokeWidth: 2,
            });
          for (let o = 0; o < e - 1; o++)
            n.push({
              id: Ie,
              points: [t[o], t[o + 1]],
              opacity: 1,
              strokeColor: r,
              strokeWidth: a,
            });
          f &&
            n.push({
              id: Ie,
              opacity: 1,
              points: [
                { x: f.origin.x, y: f.origin.y },
                { x: f.position.x, y: f.position.y },
              ],
              strokeColor: r,
              strokeWidth: a,
            }),
            o(42, (it = [...it.filter((t) => t.id !== Ie), ...n]));
        } else o(42, (it = it.filter((t) => t.id !== Ie)));
      8 & t.$$.dirty[3] && o(106, (x = i && vn(i))),
        8200 & t.$$.dirty[3] && o(9, (b = x && !1 !== Un(i) && i.isEditing)),
        512 & t.$$.dirty[0] && o(107, (v = b ? { ...i } : void 0)),
        16384 & t.$$.dirty[3] && o(108, (w = v && ln(v.text, v))),
        49152 & t.$$.dirty[3] && (S = v && Lt(v.x, v.y, w.width, w.height)),
        (512 & t.$$.dirty[0]) | (8 & t.$$.dirty[3]) && o(15, (k = b ? i.text : "")),
        (512 & t.$$.dirty[0]) | (128 & t.$$.dirty[3]) &&
          o(
            16,
            (M =
              b &&
              `\n    text-align: ${l.textAlign || "left"};\n    font-family: ${
                l.fontFamily || "sans-serif"
              };\n`)
          ),
        65608 & t.$$.dirty[3] && o(109, (R = i && !s ? i : R)),
        65536 & t.$$.dirty[3] && o(110, (T = R && Vn(R))),
        65536 & t.$$.dirty[3] && o(111, (P = R && ((t) => !0 !== t.disableDuplicate && Nn(t))(R))),
        65536 & t.$$.dirty[3] && o(112, (E = R && Wn(R))),
        65536 & t.$$.dirty[3] && o(113, (A = R && ((t) => !0 !== t.disableReorder)(R))),
        65536 & t.$$.dirty[3] && o(114, (I = R && !1 !== Un(R))),
        (512 & t.$$.dirty[0]) | (76 & t.$$.dirty[3]) && Xe.set(!i || s || Pe || b ? 0 : 1),
        (256 & t.$$.dirty[0]) | (4194376 & t.$$.dirty[3]) &&
          o(115, (L = i && !s ? ((n = Et(m)), J(X(n.x + 0.5 * n.width, n.y), kl)) : L)),
        (32 & t.$$.dirty[0]) | (262144 & t.$$.dirty[1]) | (4194304 & t.$$.dirty[3]) &&
          o(
            116,
            (F =
              L &&
              je &&
              pt &&
              ((t) => {
                const e = pt.x,
                  n = pt.y,
                  o = e + pt.width;
                let i = Math.max(t.x - 0.5 * je.width, e),
                  r = Math.max(t.y - je.height - 16, n);
                return i + je.width > o && (i = o - je.width), X(i, r);
              })(L))
          ),
        (1024 & t.$$.dirty[0]) | (8388608 & t.$$.dirty[3]) &&
          o(17, (B = F && `transform: translate(${F.x}px, ${F.y}px);opacity:${W}`)),
        (8 & t.$$.dirty[0]) | (33 & t.$$.dirty[2]) | (4063248 & t.$$.dirty[3]) &&
          o(
            18,
            (z =
              r &&
              Rt(
                [
                  [
                    "div",
                    "alpha",
                    { class: "PinturaShapeControlsGroup" },
                    [
                      T && [
                        tl,
                        "flip-horizontal",
                        {
                          onclick: _e,
                          label: Ot.shapeTitleButtonFlipHorizontal,
                          icon: Ot.shapeIconButtonFlipHorizontal,
                          hideLabel: !0,
                        },
                      ],
                      T &&
                        Dt && [
                          tl,
                          "flip-vertical",
                          {
                            onclick: We,
                            label: Ot.shapeTitleButtonFlipVertical,
                            icon: Ot.shapeIconButtonFlipVertical,
                            hideLabel: !0,
                          },
                        ],
                      A && [
                        tl,
                        "to-front",
                        {
                          onclick: Ue,
                          label: Ot.shapeTitleButtonMoveToFront,
                          icon: Ot.shapeIconButtonMoveToFront,
                          hideLabel: !0,
                        },
                      ],
                      P && [
                        tl,
                        "duplicate",
                        {
                          onclick: Ne,
                          label: Ot.shapeTitleButtonDuplicate,
                          icon: Ot.shapeIconButtonDuplicate,
                          hideLabel: !0,
                        },
                      ],
                      E && [
                        tl,
                        "remove",
                        {
                          onclick: Ve,
                          label: Ot.shapeTitleButtonRemove,
                          icon: Ot.shapeIconButtonRemove,
                          hideLabel: !0,
                        },
                      ],
                    ],
                  ],
                  I && [
                    "div",
                    "beta",
                    { class: "PinturaShapeControlsGroup" },
                    [[tl, "edit-text", { label: Ot.shapeLabelInputText, onclick: Be }]],
                  ],
                ],
                r
              ))
          ),
        4 & t.$$.dirty[0] && dt && (x || ge()),
        9 & t.$$.dirty[0] &&
          o(
            19,
            (O = V.filter(_n)
              .filter((t) => !In(t))
              .map((t) => ({
                id: t.id,
                color: vn(t) ? t.color : Mn(t) ? t.strokeColor : t.backgroundColor,
                name: t.name || Ot["shapeLabelTool" + xr(Qn(t))],
              })))
          );
    }),
    [
      V,
      U,
      dt,
      Ot,
      fe,
      je,
      d,
      h,
      m,
      b,
      W,
      Le,
      Ye,
      p,
      $,
      k,
      M,
      B,
      z,
      O,
      Ht,
      (t) => {
        const { origin: e } = t.detail;
        (Re = void 0),
          (Te = void 0),
          (Me = void 0),
          clearTimeout(Ce),
          (Ce = setTimeout(() => o(95, (Pe = !0)), 250));
        Kt() && Jt();
        const n = Tt(Y(e)),
          i = Se(n, zt),
          r = i.length && i.shift().shape;
        if (r && An(r)) return (Re = r), void (Te = eo(hn(Re), ut));
        (Me = r), ht(t);
      },
      (t) => {
        if (Re) {
          if (!Nn(Re)) return;
          if (Pn(Re)) return;
          return jt(Re, Te, t.detail.translation);
        }
        gt(t);
      },
      (t) => {
        clearTimeout(Ce),
          o(95, (Pe = !1)),
          Re
            ? Re.isEditing
              ? Oe()
              : t.detail.isDoubleTap && vn(Re) && !1 !== Un(Re) && ye(Re)
            : mt(t);
      },
      (t) => {
        if (Re) return yt(Re), void (Re = void 0);
        const e = me(),
          n = Me && t.detail.isTap,
          o = !e || kt(e, Me);
        o && ge(), ft(t), o && n && fe(Me);
      },
      (t) => {
        o(95, (Pe = !0)), (Re = i), (Te = a);
      },
      (t) => {
        const { translation: e, indexes: n, shiftKey: o } = t.detail;
        ((t, e, n, o, i) => {
          if (Mn(t)) {
            const [i] = n,
              r = _.includes(16)
                ? (t, e) => {
                    const n = rt(t, e),
                      o = Q(t, e),
                      i = Math.PI / 4,
                      r = i * Math.round(o / i) - (H % i);
                    (e.x = t.x + n * Math.cos(r)), (e.y = t.y + n * Math.sin(r));
                  }
                : (t, e) => e;
            if (0 === i) {
              const n = Xt(xn(e), o);
              r(X(e.x2, e.y2), n), _t(t, { x1: n.x, y1: n.y }, ut);
            } else if (1 === i) {
              const n = Xt(bn(e), o);
              r(X(e.x1, e.y1), n), _t(t, { x2: n.x, y2: n.y }, ut);
            }
          } else if (Ln(t) || Cn(t) || Sn(t)) {
            let r,
              a,
              s = !1;
            if (Cn(t)) r = At(e);
            else if (Ln(t)) r = Pt(e);
            else {
              (s = !0), (r = Pt(e));
              const t = ln(e.text, e);
              r.height = t.height;
            }
            t.aspectRatio ? (a = t.aspectRatio) : i.shiftKey && !s && (a = r.width / r.height);
            const l = Pt(r),
              c = Ft(l),
              u = t.rotation,
              d = Zt(l),
              p = Nt(l, u);
            if (1 === n.length) {
              let e = n[0];
              const [i, r, s, l] = d,
                h = It(p[e]);
              tt(h, o);
              const g = Tt(h),
                m = X(g.x - p[e].x, g.y - p[e].y);
              t.flipX && (m.x = -m.x), t.flipY && (m.y = -m.y);
              const f = Z(Y(m), -u),
                $ = X(d[e].x + f.x, d[e].y + f.y);
              let y;
              0 === e && (y = s), 1 === e && (y = l), 2 === e && (y = i), 3 === e && (y = r);
              const x = Et(y, $);
              if (a) {
                const { width: t, height: e } = Yt(x, a),
                  [n, o, i, r] = Gt(x);
                (x.width = t),
                  (x.height = e),
                  $.y < y.y && (x.y = i - e),
                  $.x < y.x && (x.x = o - t);
              }
              const b = Nt(x, u, c),
                v = at(b),
                w = Z(b[0], -u, v),
                S = Z(b[2], -u, v);
              (t.flipX || t.flipY) && st([w, S], t.flipX, t.flipY, c.x, c.y);
              const k = Et(w, S);
              _t(t, Cn(t) ? N(k) : k, ut);
            } else {
              const [e, i] = n.map((t) => p[t]),
                r = { x: e.x + 0.5 * (i.x - e.x), y: e.y + 0.5 * (i.y - e.y) },
                [l, h] = n.map((t) => d[t]),
                [g, m] = n.map((t) => {
                  const e = t + 2;
                  return e < 4 ? d[e] : d[e - 4];
                });
              l.x, h.x, l.x, l.y, h.y, l.y;
              const f = { x: g.x + 0.5 * (m.x - g.x), y: g.y + 0.5 * (m.y - g.y) },
                $ = It(r);
              tt($, o);
              const y = Tt($),
                x = X(y.x - r.x, y.y - r.y);
              t.flipX && (x.x = -x.x), t.flipY && (x.y = -x.y);
              const b = Z(Y(x), -u),
                v = et(Y(l), h),
                w = J(v, (t) => 1 - Math.abs(Math.sign(t))),
                S = X(b.x * w.x, b.y * w.y);
              tt(l, S), tt(h, S);
              const k = Et(d);
              if (a) {
                let t = k.width,
                  e = k.height;
                0 === w.y ? (e = t / a) : (t = e * a),
                  (k.width = t),
                  (k.height = e),
                  0 === w.y ? (k.y = f.y - 0.5 * e) : (k.x = f.x - 0.5 * t);
              }
              const C = Nt(k, u, c),
                M = at(C),
                R = Z(C[0], -u, M),
                T = Z(C[2], -u, M);
              (t.flipX || t.flipY) && st([R, T], t.flipX, t.flipY, c.x, c.y);
              const P = Et(R, T);
              let E;
              Cn(t) ? (E = N(P)) : Ln(t) ? (E = P) : s && (E = { x: P.x, y: P.y, width: P.width }),
                _t(t, E, ut);
            }
          }
          oe();
        })(Re, Te, n, e, { shiftKey: o });
      },
      (t) => {
        fe(Re), (Re = void 0), o(95, (Pe = !1)), yt(i);
      },
      (t) => {
        (qt = Ae(a).origin), o(95, (Pe = !0)), (Re = i), (Te = a);
      },
      (t) => {
        const { translation: e, shiftKey: n } = t.detail;
        ((t, e, n, o) => {
          const i = we(eo(hn(t), ut)),
            r = Ft(i),
            a = Xt(qt, n);
          let s = Q(a, r) + Math.PI / 2;
          if (o.shiftKey) {
            const t = Math.PI / 16;
            s = t * Math.round(s / t) - (H % t);
          }
          _t(t, { rotation: s }, ut), oe();
        })(Re, 0, e, { shiftKey: n });
      },
      () => {
        fe(Re), (Re = void 0), o(95, (Pe = !1)), yt(i);
      },
      (t) => {
        if (!ue()) return;
        const { key: e } = t;
        if (/escape/i.test(e)) return $e(i);
        /backspace/i.test(e) &&
          !/input|textarea/i.test(t.target.nodeName) &&
          (t.preventDefault(), pe());
      },
      Fe,
      (t) => {
        const e = t.target.value,
          n = t.target.selectionStart,
          o = t.target.selectionEnd,
          r = e.substring(0, n),
          a = e.substring(o),
          s = r + t.key + a;
        if (Un(i, s) !== s) return t.preventDefault();
      },
      (t) =>
        wn(i) && /enter/i.test(t.code)
          ? t.preventDefault()
          : /arrow/i.test(t.code)
          ? t.stopPropagation()
          : /escape/i.test(t.key)
          ? Oe()
          : void 0,
      (t) => {
        const { key: e, ctrlKey: n, altKey: o } = t;
        if (/enter/i.test(e) && n | o) return De();
      },
      De,
      Oe,
      Xe,
      (t) => {
        const e = ce();
        e && Nn(e) && ((Re = e), (Te = eo(hn(Re), ut)), jt(Re, Te, t.detail));
      },
      (t) => {
        o(12, (Ye = !0));
      },
      ({ relatedTarget: t }) => {
        t.classList.contains("shape-selector__button") || o(12, (Ye = !1));
      },
      it,
      H,
      j,
      G,
      q,
      ct,
      ut,
      pt,
      ht,
      gt,
      mt,
      ft,
      $t,
      yt,
      xt,
      bt,
      wt,
      kt,
      Ct,
      Mt,
      Rt,
      Tt,
      It,
      Bt,
      zt,
      Dt,
      (t, e = {}) => {
        let n,
          o,
          i,
          r = Cn(t),
          a = vn(t),
          s = "relative" === e.position;
        const l = (t, e, n) => (0 === t || (e && n) ? t : e || n ? -t : t);
        return Tn(t)
          ? {
              start: (e) => {
                const { origin: r } = e.detail;
                (o = 4), (n = Y(r)), (i = Y(r));
                const a = Tt(r);
                s && ((a.x = s ? Qe(a.x, ut.width) : a.x), (a.y = s ? Qe(a.y, ut.height) : a.y)),
                  Qt({ ...t, points: [a] });
              },
              update: (t) => {
                const e = Kt(),
                  { translation: r } = t.detail,
                  a = X(n.x + r.x, n.y + r.y),
                  l = rt(i, a);
                if (vr(l, 5) <= o) return;
                const c = Q(a, i),
                  u = o - l;
                (i.x += u * Math.cos(c)), (i.y += u * Math.sin(c));
                const d = Tt(i);
                d && ((d.x = s ? Qe(d.x, ut.width) : d.x), (d.y = s ? Qe(d.y, ut.height) : d.y)),
                  (e.points = e.points.concat(d)),
                  oe();
              },
              release: (t) => t.detail.preventInertia(),
              end: (t) => {
                if (t.detail.isTap) return te();
                const e = Jt();
                $t(e);
              },
            }
          : r || a || kn(t)
          ? {
              start: (e) => {
                const { origin: o } = e.detail;
                n = Y(o);
                const i = Tt(n),
                  a = {
                    ...t,
                    rotation: -1 * l(H, j, G),
                    x: s ? Qe(i.x, ut.width) : i.x,
                    y: s ? Qe(i.y, ut.height) : i.y,
                  };
                delete a.position,
                  (a.opacity = 0),
                  r
                    ? ((a.rx = s ? Qe(0) : 0), (a.ry = s ? Qe(0) : 0))
                    : ((a.width = s ? Qe(0) : 0), (a.height = s ? Qe(0) : 0)),
                  Qt(a);
              },
              update: (t) => {
                const e = Kt();
                e.opacity = 1;
                const { aspectRatio: o } = e;
                let { translation: i } = t.detail;
                if (o) {
                  const t = Math.abs(i.x) * o;
                  (i.x = i.x), (i.y = t * Math.sign(i.y));
                }
                const a = X(n.x + i.x, n.y + i.y),
                  s = Tt(n),
                  c = Tt(a),
                  u = { x: s.x + 0.5 * (c.x - s.x), y: s.y + 0.5 * (c.y - s.y) },
                  d = l(H, j, G);
                Z(s, d, u), Z(c, d, u);
                const p = Math.min(s.x, c.x),
                  h = Math.min(s.y, c.y);
                let g = Math.max(s.x, c.x) - p,
                  m = Math.max(s.y, c.y) - h,
                  f = {};
                r
                  ? ((f.x = p + 0.5 * g), (f.y = h + 0.5 * m), (f.rx = 0.5 * g), (f.ry = 0.5 * m))
                  : ((f.x = p), (f.y = h), (f.width = g), (f.height = m)),
                  _t(e, f, ut),
                  oe();
              },
              release: (t) => {
                t.detail.preventInertia();
              },
              end: (t) => {
                const e = Kt();
                if (t.detail.isTap) {
                  if (!vn(e) || Me) return te();
                  delete e.width, delete e.height, delete e.textAlign;
                }
                if (((e.opacity = 1), !vn(e))) {
                  const t = Jt();
                  $t(t);
                }
                fe(e), vn(e) && ye(e);
              },
            }
          : Mn(t)
          ? {
              start: (e) => {
                const { origin: o } = e.detail,
                  i = Tt(o),
                  r = J(i, kl);
                (n = Y(o)),
                  Qt({
                    ...t,
                    x1: s ? Qe(r.x, ut.width) : r.x,
                    y1: s ? Qe(r.y, ut.height) : r.y,
                    x2: s ? Qe(r.x, ut.width) : r.x,
                    y2: s ? Qe(r.y, ut.height) : r.y,
                    opacity: 0,
                  });
              },
              update: (t) => {
                const e = Kt(),
                  { translation: o } = t.detail,
                  i = tt(Y(n), o);
                if (_.includes(16)) {
                  const t = rt(n, i),
                    e = Q(n, i),
                    o = Math.PI / 4,
                    r = o * Math.round(e / o);
                  (i.x = n.x + t * Math.cos(r)), (i.y = n.y + t * Math.sin(r));
                }
                const r = Tt(i);
                ae(e, {
                  x2: s ? Qe(r.x, ut.width) : r.x,
                  y2: s ? Qe(r.y, ut.height) : r.y,
                  opacity: 1,
                }),
                  oe();
              },
              release: (t) => t.detail.preventInertia(),
              end: (t) => {
                const e = Kt();
                if (t.detail.isTap) return te();
                e.opacity = 1;
                const n = Jt();
                $t(n), fe(n);
              },
            }
          : void 0;
      },
      () => {
        let t, e;
        return {
          start: (n) => {
            (t = n.detail.origin), (e = t);
          },
          update: (n) => {
            const { translation: o } = n.detail,
              i = X(t.x + o.x, t.y + o.y),
              r = ke(Tt(e), Tt(i), Bt);
            be(r).forEach(bt), (e = Y(i));
          },
          release: (t) => t.detail.preventInertia(),
          end: () => {},
        };
      },
      Kt,
      Qt,
      Jt,
      te,
      (t = {}) => ({ id: C(), ...t }),
      oe,
      re,
      (t, e = [], n = !0) => {
        e.forEach((e) => delete t[e]), n && oe();
      },
      ae,
      se,
      (t, e, n = !0) => {
        V.forEach((n) => se(n, t, e, !1)), n && oe();
      },
      le,
      ce,
      ue,
      de,
      pe,
      ge,
      $e,
      ye,
      xe,
      be,
      ve,
      we,
      Se,
      ke,
      Pe,
      i,
      r,
      a,
      s,
      l,
      c,
      u,
      g,
      f,
      y,
      x,
      v,
      w,
      R,
      T,
      P,
      E,
      A,
      I,
      L,
      F,
      function (e) {
        ki(t, e);
      },
      (t, e) => fe(V[t]),
      function (t) {
        Mi[t ? "unshift" : "push"](() => {
          (Le = t), o(11, Le);
        });
      },
      (t) => o(5, (je = t.detail)),
      (t) => jh(t, dt),
    ]
  );
}
class ag extends rr {
  constructor(t) {
    super(),
      ir(
        this,
        t,
        rg,
        ig,
        Lo,
        {
          markup: 0,
          offset: 1,
          contextRotation: 43,
          contextFlipX: 44,
          contextFlipY: 45,
          scale: 46,
          ui: 42,
          opacity: 47,
          parentRect: 48,
          rootRect: 2,
          utilRect: 49,
          oninteractionstart: 50,
          oninteractionupdate: 51,
          oninteractionrelease: 52,
          oninteractionend: 53,
          onaddshape: 54,
          onupdateshape: 55,
          onselectshape: 56,
          onremoveshape: 57,
          beforeSelectShape: 58,
          beforeDeselectShape: 59,
          beforeRemoveShape: 60,
          beforeUpdateShape: 61,
          willRenderShapeControls: 62,
          mapEditorPointToImagePoint: 63,
          mapImagePointToEditorPoint: 64,
          eraseRadius: 65,
          selectRadius: 66,
          enableButtonFlipVertical: 67,
          locale: 3,
          createShape: 68,
          eraseShape: 69,
          getMarkupItemDraft: 70,
          addMarkupItemDraft: 71,
          confirmMarkupItemDraft: 72,
          discardMarkupItemDraft: 73,
          createMarkupItem: 74,
          syncShapes: 75,
          addShape: 76,
          removeMarkupShapeProps: 77,
          updateMarkupShape: 78,
          updateMarkupShapeProperty: 79,
          updateMarkupItemsShapeProperty: 80,
          updateMarkupShapeItems: 81,
          getActiveMarkupItem: 82,
          hasActiveMarkupItem: 83,
          removeShape: 84,
          removeActiveMarkupItem: 85,
          blurShapes: 86,
          selectShape: 4,
          deselectMarkupItem: 87,
          editMarkupItem: 88,
          finishEditMarkupItem: 89,
          removeMarkupItems: 90,
          getTextShapeRect: 91,
          getMarkupShapeRect: 92,
          getShapesNearPosition: 93,
          getMarkupBetweenPoints: 94,
        },
        [-1, -1, -1, -1, -1, -1]
      );
  }
  get createShape() {
    return this.$$.ctx[68];
  }
  get eraseShape() {
    return this.$$.ctx[69];
  }
  get getMarkupItemDraft() {
    return this.$$.ctx[70];
  }
  get addMarkupItemDraft() {
    return this.$$.ctx[71];
  }
  get confirmMarkupItemDraft() {
    return this.$$.ctx[72];
  }
  get discardMarkupItemDraft() {
    return this.$$.ctx[73];
  }
  get createMarkupItem() {
    return this.$$.ctx[74];
  }
  get syncShapes() {
    return this.$$.ctx[75];
  }
  get addShape() {
    return this.$$.ctx[76];
  }
  get removeMarkupShapeProps() {
    return this.$$.ctx[77];
  }
  get updateMarkupShape() {
    return this.$$.ctx[78];
  }
  get updateMarkupShapeProperty() {
    return this.$$.ctx[79];
  }
  get updateMarkupItemsShapeProperty() {
    return this.$$.ctx[80];
  }
  get updateMarkupShapeItems() {
    return this.$$.ctx[81];
  }
  get getActiveMarkupItem() {
    return this.$$.ctx[82];
  }
  get hasActiveMarkupItem() {
    return this.$$.ctx[83];
  }
  get removeShape() {
    return this.$$.ctx[84];
  }
  get removeActiveMarkupItem() {
    return this.$$.ctx[85];
  }
  get blurShapes() {
    return this.$$.ctx[86];
  }
  get selectShape() {
    return this.$$.ctx[4];
  }
  get deselectMarkupItem() {
    return this.$$.ctx[87];
  }
  get editMarkupItem() {
    return this.$$.ctx[88];
  }
  get finishEditMarkupItem() {
    return this.$$.ctx[89];
  }
  get removeMarkupItems() {
    return this.$$.ctx[90];
  }
  get getTextShapeRect() {
    return this.$$.ctx[91];
  }
  get getMarkupShapeRect() {
    return this.$$.ctx[92];
  }
  get getShapesNearPosition() {
    return this.$$.ctx[93];
  }
  get getMarkupBetweenPoints() {
    return this.$$.ctx[94];
  }
}
function sg(t, e, n) {
  const o = t.slice();
  return (o[7] = e[n]), o;
}
function lg(t, e) {
  let n,
    o,
    i,
    r,
    a,
    s,
    l,
    c = _l(e[7].componentProps.title, e[1]) + "";
  const u = [e[7].componentProps];
  var d = e[7].component;
  function p(t) {
    let e = {};
    for (let t = 0; t < u.length; t += 1) e = To(e, u[t]);
    return { props: e };
  }
  return (
    d && (a = new d(p())),
    {
      key: t,
      first: null,
      c() {
        (n = Qo("li")),
          (o = Qo("span")),
          (i = ti(c)),
          (r = ei()),
          a && tr(a.$$.fragment),
          (s = ei()),
          ai(o, "class", "PinturaShapeStyleLabel"),
          ai(n, "class", "PinturaShapeStyle"),
          (this.first = n);
      },
      m(t, e) {
        qo(t, n, e), Zo(n, o), Zo(o, i), Zo(n, r), a && er(a, n, null), Zo(n, s), (l = !0);
      },
      p(t, o) {
        (e = t), (!l || 3 & o) && c !== (c = _l(e[7].componentProps.title, e[1]) + "") && li(i, c);
        const r = 1 & o ? Ki(u, [Qi(e[7].componentProps)]) : {};
        if (d !== (d = e[7].component)) {
          if (a) {
            Vi();
            const t = a;
            Hi(t.$$.fragment, 1, 0, () => {
              nr(t, 1);
            }),
              Ui();
          }
          d ? ((a = new d(p())), tr(a.$$.fragment), Ni(a.$$.fragment, 1), er(a, n, s)) : (a = null);
        } else d && a.$set(r);
      },
      i(t) {
        l || (a && Ni(a.$$.fragment, t), (l = !0));
      },
      o(t) {
        a && Hi(a.$$.fragment, t), (l = !1);
      },
      d(t) {
        t && Ko(n), a && nr(a);
      },
    }
  );
}
function cg(t) {
  let e,
    n,
    o = [],
    i = new Map(),
    r = t[0];
  const a = (t) => t[7].id;
  for (let e = 0; e < r.length; e += 1) {
    let n = sg(t, r, e),
      s = a(n);
    i.set(s, (o[e] = lg(s, n)));
  }
  return {
    c() {
      e = Qo("ul");
      for (let t = 0; t < o.length; t += 1) o[t].c();
      ai(e, "class", "PinturaShapeStyleList");
    },
    m(t, i) {
      qo(t, e, i);
      for (let t = 0; t < o.length; t += 1) o[t].m(e, null);
      n = !0;
    },
    p(t, n) {
      3 & n && ((r = t[0]), Vi(), (o = qi(o, n, a, 1, t, r, i, e, Zi, lg, null, sg)), Ui());
    },
    i(t) {
      if (!n) {
        for (let t = 0; t < r.length; t += 1) Ni(o[t]);
        n = !0;
      }
    },
    o(t) {
      for (let t = 0; t < o.length; t += 1) Hi(o[t]);
      n = !1;
    },
    d(t) {
      t && Ko(e);
      for (let t = 0; t < o.length; t += 1) o[t].d();
    },
  };
}
function ug(t) {
  let e, n, o;
  return (
    (n = new dl({
      props: {
        class: "PinturaShapeStyles",
        elasticity: t[2],
        $$slots: { default: [cg] },
        $$scope: { ctx: t },
      },
    })),
    {
      c() {
        (e = Qo("div")), tr(n.$$.fragment), ai(e, "style", t[3]);
      },
      m(t, i) {
        qo(t, e, i), er(n, e, null), (o = !0);
      },
      p(t, [i]) {
        const r = {};
        4 & i && (r.elasticity = t[2]),
          1027 & i && (r.$$scope = { dirty: i, ctx: t }),
          n.$set(r),
          (!o || 8 & i) && ai(e, "style", t[3]);
      },
      i(t) {
        o || (Ni(n.$$.fragment, t), (o = !0));
      },
      o(t) {
        Hi(n.$$.fragment, t), (o = !1);
      },
      d(t) {
        t && Ko(e), nr(n);
      },
    }
  );
}
function dg(t, e, n) {
  let o,
    i,
    { isActive: r = !1 } = e,
    { controls: a = [] } = e,
    { locale: s } = e,
    { scrollElasticity: l } = e;
  const c = La(0);
  return (
    zo(t, c, (t) => n(6, (i = t))),
    (t.$$set = (t) => {
      "isActive" in t && n(5, (r = t.isActive)),
        "controls" in t && n(0, (a = t.controls)),
        "locale" in t && n(1, (s = t.locale)),
        "scrollElasticity" in t && n(2, (l = t.scrollElasticity));
    }),
    (t.$$.update = () => {
      32 & t.$$.dirty && c.set(r ? 1 : 0),
        96 & t.$$.dirty &&
          n(
            3,
            (o = `opacity:${i};${!r && "pointer-events:none;"}${i <= 0 && "visibility:hidden"}`)
          );
    }),
    [a, s, l, o, c, r, i]
  );
}
class pg extends rr {
  constructor(t) {
    super(), ir(this, t, dg, ug, Lo, { isActive: 5, controls: 0, locale: 1, scrollElasticity: 2 });
  }
}
function hg(t, e, n) {
  const o = t.slice();
  return (o[11] = e[n].key), (o[2] = e[n].controls), (o[12] = e[n].isActive), o;
}
function gg(t, e) {
  let n, o, i;
  return (
    (o = new pg({
      props: { isActive: e[12], controls: e[2], locale: e[0], scrollElasticity: e[1] },
    })),
    {
      key: t,
      first: null,
      c() {
        (n = ni()), tr(o.$$.fragment), (this.first = n);
      },
      m(t, e) {
        qo(t, n, e), er(o, t, e), (i = !0);
      },
      p(t, n) {
        e = t;
        const i = {};
        8 & n && (i.isActive = e[12]),
          8 & n && (i.controls = e[2]),
          1 & n && (i.locale = e[0]),
          2 & n && (i.scrollElasticity = e[1]),
          o.$set(i);
      },
      i(t) {
        i || (Ni(o.$$.fragment, t), (i = !0));
      },
      o(t) {
        Hi(o.$$.fragment, t), (i = !1);
      },
      d(t) {
        t && Ko(n), nr(o, t);
      },
    }
  );
}
function mg(t) {
  let e,
    n,
    o = [],
    i = new Map(),
    r = t[3];
  const a = (t) => t[11];
  for (let e = 0; e < r.length; e += 1) {
    let n = hg(t, r, e),
      s = a(n);
    i.set(s, (o[e] = gg(s, n)));
  }
  return {
    c() {
      e = Qo("div");
      for (let t = 0; t < o.length; t += 1) o[t].c();
      ai(e, "class", "PinturaShapeStyleEditor");
    },
    m(t, i) {
      qo(t, e, i);
      for (let t = 0; t < o.length; t += 1) o[t].m(e, null);
      n = !0;
    },
    p(t, [n]) {
      11 & n && ((r = t[3]), Vi(), (o = qi(o, n, a, 1, t, r, i, e, Zi, gg, null, hg)), Ui());
    },
    i(t) {
      if (!n) {
        for (let t = 0; t < r.length; t += 1) Ni(o[t]);
        n = !0;
      }
    },
    o(t) {
      for (let t = 0; t < o.length; t += 1) Hi(o[t]);
      n = !1;
    },
    d(t) {
      t && Ko(e);
      for (let t = 0; t < o.length; t += 1) o[t].d();
    },
  };
}
function fg(t, e, n) {
  let o,
    i,
    r,
    { controls: a = {} } = e,
    { shape: s } = e,
    { onchange: l } = e,
    { locale: c } = e,
    { scrollElasticity: u } = e;
  const d = [];
  return (
    (t.$$set = (t) => {
      "controls" in t && n(2, (a = t.controls)),
        "shape" in t && n(4, (s = t.shape)),
        "onchange" in t && n(5, (l = t.onchange)),
        "locale" in t && n(0, (c = t.locale)),
        "scrollElasticity" in t && n(1, (u = t.scrollElasticity));
    }),
    (t.$$.update = () => {
      4 & t.$$.dirty && n(6, (o = Object.keys(a).filter((t) => a[t]))),
        80 & t.$$.dirty &&
          n(
            7,
            (i =
              s && o && Dn(s)
                ? ((t) => {
                    const e = t.id || "tool";
                    return o
                      .filter((e) => e.split("_").every((e) => t.hasOwnProperty(e) && Dn(t, e)))
                      .map((n) => {
                        const o = n.split("_"),
                          i = o.length > 1 ? o.map((e) => t[e]) : t[n],
                          [r, s] = a[n],
                          u = Xe(s.options) ? s.options(t) : s.options;
                        return {
                          id: `${e}_${n}`,
                          component: r,
                          componentProps: {
                            ...s,
                            options: u,
                            locale: c,
                            value: i,
                            optionLabelClass: "PinturaButtonLabel",
                            onchange: (e) => {
                              const i = y(e) && !je(e) ? e.value : e;
                              s.onchange && s.onchange(i, t);
                              const r =
                                o.length > 1
                                  ? o.reduce(
                                      (t, e, n) => ({ ...t, [e]: Array.isArray(i) ? i[n] : i }),
                                      {}
                                    )
                                  : { [n]: i };
                              l(r);
                            },
                          },
                        };
                      });
                  })(s)
                : [])
          ),
        144 & t.$$.dirty &&
          n(
            3,
            (r = ((t, e) => {
              let n = d.find((e) => e.key === t);
              return (
                n || ((n = { key: t, controls: e }), d.push(n)),
                d.forEach((t) => (t.isActive = !1)),
                (n.controls = e),
                (n.isActive = !0),
                d
              );
            })(Object.keys(s).join("_"), i))
          );
    }),
    [c, u, a, r, s, l, o, i]
  );
}
class $g extends rr {
  constructor(t) {
    super(),
      ir(this, t, fg, mg, Lo, {
        controls: 2,
        shape: 4,
        onchange: 5,
        locale: 0,
        scrollElasticity: 1,
      });
  }
}
function yg(t) {
  let e, n, o;
  return {
    c() {
      (e = Qo("button")),
        ai(e, "class", "PinturaDragButton"),
        ai(e, "title", t[1]),
        (e.disabled = t[2]);
    },
    m(i, r) {
      qo(i, e, r), (e.innerHTML = t[0]), t[9](e), n || ((o = oi(e, "pointerdown", t[4])), (n = !0));
    },
    p(t, [n]) {
      1 & n && (e.innerHTML = t[0]), 2 & n && ai(e, "title", t[1]), 4 & n && (e.disabled = t[2]);
    },
    i: Mo,
    o: Mo,
    d(i) {
      i && Ko(e), t[9](null), (n = !1), o();
    },
  };
}
function xg(t, e, o) {
  let i,
    { html: r } = e,
    { title: a } = e,
    { onclick: s } = e,
    { disabled: l = !1 } = e,
    { ongrab: c = n } = e,
    { ondrag: u = n } = e,
    { ondrop: d = n } = e;
  const p = (t) => it(h, X(t.pageX, t.pageY)) < 256;
  let h;
  const g = (t) => {
      document.documentElement.removeEventListener("pointermove", m),
        document.documentElement.removeEventListener("pointerup", g);
      const e = X(t.pageX, t.pageY);
      if (it(h, e) < 32) return s(t);
      p(t) || d(t);
    },
    m = (t) => {
      p(t) || u(t);
    };
  return (
    (t.$$set = (t) => {
      "html" in t && o(0, (r = t.html)),
        "title" in t && o(1, (a = t.title)),
        "onclick" in t && o(5, (s = t.onclick)),
        "disabled" in t && o(2, (l = t.disabled)),
        "ongrab" in t && o(6, (c = t.ongrab)),
        "ondrag" in t && o(7, (u = t.ondrag)),
        "ondrop" in t && o(8, (d = t.ondrop));
    }),
    [
      r,
      a,
      l,
      i,
      (t) => {
        (h = X(t.pageX, t.pageY)),
          c(t),
          document.documentElement.addEventListener("pointermove", m),
          document.documentElement.addEventListener("pointerup", g);
      },
      s,
      c,
      u,
      d,
      function (t) {
        Mi[t ? "unshift" : "push"](() => {
          (i = t), o(3, i);
        });
      },
    ]
  );
}
class bg extends rr {
  constructor(t) {
    super(),
      ir(this, t, xg, yg, Lo, {
        html: 0,
        title: 1,
        onclick: 5,
        disabled: 2,
        ongrab: 6,
        ondrag: 7,
        ondrop: 8,
      });
  }
}
function vg(t, e, n) {
  const o = t.slice();
  return (o[14] = e[n]), o;
}
function wg(t, e) {
  let n, o, i, r, a, s, l;
  function c() {
    return e[10](e[14]);
  }
  function u(...t) {
    return e[11](e[14], ...t);
  }
  function d(...t) {
    return e[12](e[14], ...t);
  }
  function p(...t) {
    return e[13](e[14], ...t);
  }
  return (
    (o = new bg({
      props: {
        onclick: c,
        ongrab: u,
        ondrag: d,
        ondrop: p,
        disabled: e[1] || e[14].disabled,
        title: e[14].title,
        html: e[14].thumb,
      },
    })),
    {
      key: t,
      first: null,
      c() {
        (n = Qo("li")),
          tr(o.$$.fragment),
          (i = ei()),
          ai(n, "class", "PinturaShapePreset"),
          ai(n, "style", e[6]),
          (this.first = n);
      },
      m(t, c) {
        qo(t, n, c),
          er(o, n, null),
          Zo(n, i),
          (a = !0),
          s || ((l = Uo((r = e[8].call(null, n, e[14])))), (s = !0));
      },
      p(t, i) {
        e = t;
        const s = {};
        5 & i && (s.onclick = c),
          9 & i && (s.ongrab = u),
          17 & i && (s.ondrag = d),
          33 & i && (s.ondrop = p),
          3 & i && (s.disabled = e[1] || e[14].disabled),
          1 & i && (s.title = e[14].title),
          1 & i && (s.html = e[14].thumb),
          o.$set(s),
          (!a || 64 & i) && ai(n, "style", e[6]),
          r && Io(r.update) && 1 & i && r.update.call(null, e[14]);
      },
      i(t) {
        a || (Ni(o.$$.fragment, t), (a = !0));
      },
      o(t) {
        Hi(o.$$.fragment, t), (a = !1);
      },
      d(t) {
        t && Ko(n), nr(o), (s = !1), l();
      },
    }
  );
}
function Sg(t) {
  let e,
    n,
    o = [],
    i = new Map(),
    r = t[0];
  const a = (t) => t[14].id;
  for (let e = 0; e < r.length; e += 1) {
    let n = vg(t, r, e),
      s = a(n);
    i.set(s, (o[e] = wg(s, n)));
  }
  return {
    c() {
      e = Qo("ul");
      for (let t = 0; t < o.length; t += 1) o[t].c();
      ai(e, "class", "PinturaShapePresetsList");
    },
    m(t, i) {
      qo(t, e, i);
      for (let t = 0; t < o.length; t += 1) o[t].m(e, null);
      n = !0;
    },
    p(t, [n]) {
      127 & n && ((r = t[0]), Vi(), (o = qi(o, n, a, 1, t, r, i, e, Zi, wg, null, vg)), Ui());
    },
    i(t) {
      if (!n) {
        for (let t = 0; t < r.length; t += 1) Ni(o[t]);
        n = !0;
      }
    },
    o(t) {
      for (let t = 0; t < o.length; t += 1) Hi(o[t]);
      n = !1;
    },
    d(t) {
      t && Ko(e);
      for (let t = 0; t < o.length; t += 1) o[t].d();
    },
  };
}
function kg(t, e, n) {
  let o,
    i,
    { presets: r } = e,
    { disabled: a } = e,
    { onclickpreset: s } = e,
    { ongrabpreset: l } = e,
    { ondragpreset: c } = e,
    { ondroppreset: u } = e;
  const d = Aa(0, { duration: 300 });
  zo(t, d, (t) => n(9, (i = t)));
  yi(() => d.set(1));
  return (
    (t.$$set = (t) => {
      "presets" in t && n(0, (r = t.presets)),
        "disabled" in t && n(1, (a = t.disabled)),
        "onclickpreset" in t && n(2, (s = t.onclickpreset)),
        "ongrabpreset" in t && n(3, (l = t.ongrabpreset)),
        "ondragpreset" in t && n(4, (c = t.ondragpreset)),
        "ondroppreset" in t && n(5, (u = t.ondroppreset));
    }),
    (t.$$.update = () => {
      512 & t.$$.dirty && n(6, (o = "opacity:" + i));
    }),
    [
      r,
      a,
      s,
      l,
      c,
      u,
      o,
      d,
      (t, e) => e.mount && e.mount(t.firstChild, e),
      i,
      (t) => s(t.id),
      (t, e) => l(t.id, e),
      (t, e) => c(t.id, e),
      (t, e) => u(t.id, e),
    ]
  );
}
class Cg extends rr {
  constructor(t) {
    super(),
      ir(this, t, kg, Sg, Lo, {
        presets: 0,
        disabled: 1,
        onclickpreset: 2,
        ongrabpreset: 3,
        ondragpreset: 4,
        ondroppreset: 5,
      });
  }
}
function Mg(t) {
  let e, n;
  return (
    (e = new Ec({ props: { items: t[13] } })),
    {
      c() {
        tr(e.$$.fragment);
      },
      m(t, o) {
        er(e, t, o), (n = !0);
      },
      p(t, n) {
        const o = {};
        8192 & n && (o.items = t[13]), e.$set(o);
      },
      i(t) {
        n || (Ni(e.$$.fragment, t), (n = !0));
      },
      o(t) {
        Hi(e.$$.fragment, t), (n = !1);
      },
      d(t) {
        nr(e, t);
      },
    }
  );
}
function Rg(t) {
  let e, n, o, i;
  const r = [Pg, Tg],
    a = [];
  function s(t, e) {
    return t[7] ? 0 : 1;
  }
  return (
    (e = s(t)),
    (n = a[e] = r[e](t)),
    {
      c() {
        n.c(), (o = ni());
      },
      m(t, n) {
        a[e].m(t, n), qo(t, o, n), (i = !0);
      },
      p(t, i) {
        let l = e;
        (e = s(t)),
          e === l
            ? a[e].p(t, i)
            : (Vi(),
              Hi(a[l], 1, 1, () => {
                a[l] = null;
              }),
              Ui(),
              (n = a[e]),
              n ? n.p(t, i) : ((n = a[e] = r[e](t)), n.c()),
              Ni(n, 1),
              n.m(o.parentNode, o));
      },
      i(t) {
        i || (Ni(n), (i = !0));
      },
      o(t) {
        Hi(n), (i = !1);
      },
      d(t) {
        a[e].d(t), t && Ko(o);
      },
    }
  );
}
function Tg(t) {
  let e,
    n,
    o,
    i,
    r = t[13] && Eg(t);
  return (
    (o = new dl({
      props: {
        scrollAutoCancel: t[6],
        elasticity: t[0],
        $$slots: { default: [Ag] },
        $$scope: { ctx: t },
      },
    })),
    {
      c() {
        (e = Qo("div")),
          r && r.c(),
          (n = ei()),
          tr(o.$$.fragment),
          ai(e, "class", "PinturaShapePresetsFlat");
      },
      m(t, a) {
        qo(t, e, a), r && r.m(e, null), Zo(e, n), er(o, e, null), (i = !0);
      },
      p(t, i) {
        t[13]
          ? r
            ? (r.p(t, i), 8192 & i && Ni(r, 1))
            : ((r = Eg(t)), r.c(), Ni(r, 1), r.m(e, n))
          : r &&
            (Vi(),
            Hi(r, 1, 1, () => {
              r = null;
            }),
            Ui());
        const a = {};
        64 & i && (a.scrollAutoCancel = t[6]),
          1 & i && (a.elasticity = t[0]),
          536870974 & i && (a.$$scope = { dirty: i, ctx: t }),
          o.$set(a);
      },
      i(t) {
        i || (Ni(r), Ni(o.$$.fragment, t), (i = !0));
      },
      o(t) {
        Hi(r), Hi(o.$$.fragment, t), (i = !1);
      },
      d(t) {
        t && Ko(e), r && r.d(), nr(o);
      },
    }
  );
}
function Pg(t) {
  let e,
    n,
    o,
    i,
    r,
    a,
    s,
    l = t[13] && Ig(t);
  const c = [{ class: "PinturaControlList" }, { tabs: t[8] }, t[11], { layout: "compact" }];
  let u = {
    $$slots: { default: [zg, ({ tab: t }) => ({ 28: t }), ({ tab: t }) => (t ? 268435456 : 0)] },
    $$scope: { ctx: t },
  };
  for (let t = 0; t < c.length; t += 1) u = To(u, c[t]);
  (i = new Ps({ props: u })), i.$on("select", t[18]);
  const d = [
    { class: "PinturaControlPanels" },
    { panelClass: "PinturaControlPanel" },
    { panels: t[12] },
    t[11],
  ];
  let p = {
    $$slots: {
      default: [
        Og,
        ({ panel: t, panelIsActive: e }) => ({ 26: t, 27: e }),
        ({ panel: t, panelIsActive: e }) => (t ? 67108864 : 0) | (e ? 134217728 : 0),
      ],
    },
    $$scope: { ctx: t },
  };
  for (let t = 0; t < d.length; t += 1) p = To(p, d[t]);
  return (
    (a = new Vs({ props: p })),
    {
      c() {
        (e = Qo("div")),
          (n = Qo("div")),
          l && l.c(),
          (o = ei()),
          tr(i.$$.fragment),
          (r = ei()),
          tr(a.$$.fragment),
          ai(n, "class", "PinturaShapePresetsGroups"),
          ai(e, "class", "PinturaShapePresetsGrouped");
      },
      m(t, c) {
        qo(t, e, c),
          Zo(e, n),
          l && l.m(n, null),
          Zo(n, o),
          er(i, n, null),
          Zo(e, r),
          er(a, e, null),
          (s = !0);
      },
      p(t, e) {
        t[13]
          ? l
            ? (l.p(t, e), 8192 & e && Ni(l, 1))
            : ((l = Ig(t)), l.c(), Ni(l, 1), l.m(n, o))
          : l &&
            (Vi(),
            Hi(l, 1, 1, () => {
              l = null;
            }),
            Ui());
        const r =
          2304 & e ? Ki(c, [c[0], 256 & e && { tabs: t[8] }, 2048 & e && Qi(t[11]), c[3]]) : {};
        805306368 & e && (r.$$scope = { dirty: e, ctx: t }), i.$set(r);
        const s =
          6144 & e ? Ki(d, [d[0], d[1], 4096 & e && { panels: t[12] }, 2048 & e && Qi(t[11])]) : {};
        738198623 & e && (s.$$scope = { dirty: e, ctx: t }), a.$set(s);
      },
      i(t) {
        s || (Ni(l), Ni(i.$$.fragment, t), Ni(a.$$.fragment, t), (s = !0));
      },
      o(t) {
        Hi(l), Hi(i.$$.fragment, t), Hi(a.$$.fragment, t), (s = !1);
      },
      d(t) {
        t && Ko(e), l && l.d(), nr(i), nr(a);
      },
    }
  );
}
function Eg(t) {
  let e, n;
  return (
    (e = new Ec({ props: { items: t[13] } })),
    {
      c() {
        tr(e.$$.fragment);
      },
      m(t, o) {
        er(e, t, o), (n = !0);
      },
      p(t, n) {
        const o = {};
        8192 & n && (o.items = t[13]), e.$set(o);
      },
      i(t) {
        n || (Ni(e.$$.fragment, t), (n = !0));
      },
      o(t) {
        Hi(e.$$.fragment, t), (n = !1);
      },
      d(t) {
        nr(e, t);
      },
    }
  );
}
function Ag(t) {
  let e, n;
  return (
    (e = new Cg({
      props: {
        presets: t[5],
        onclickpreset: t[1],
        ongrabpreset: t[2],
        ondragpreset: t[3],
        ondroppreset: t[4],
      },
    })),
    {
      c() {
        tr(e.$$.fragment);
      },
      m(t, o) {
        er(e, t, o), (n = !0);
      },
      p(t, n) {
        const o = {};
        32 & n && (o.presets = t[5]),
          2 & n && (o.onclickpreset = t[1]),
          4 & n && (o.ongrabpreset = t[2]),
          8 & n && (o.ondragpreset = t[3]),
          16 & n && (o.ondroppreset = t[4]),
          e.$set(o);
      },
      i(t) {
        n || (Ni(e.$$.fragment, t), (n = !0));
      },
      o(t) {
        Hi(e.$$.fragment, t), (n = !1);
      },
      d(t) {
        nr(e, t);
      },
    }
  );
}
function Ig(t) {
  let e, n;
  return (
    (e = new Ec({ props: { items: t[13] } })),
    {
      c() {
        tr(e.$$.fragment);
      },
      m(t, o) {
        er(e, t, o), (n = !0);
      },
      p(t, n) {
        const o = {};
        8192 & n && (o.items = t[13]), e.$set(o);
      },
      i(t) {
        n || (Ni(e.$$.fragment, t), (n = !0));
      },
      o(t) {
        Hi(e.$$.fragment, t), (n = !1);
      },
      d(t) {
        nr(e, t);
      },
    }
  );
}
function Lg(t) {
  let e, n;
  return (
    (e = new Ys({ props: { $$slots: { default: [Fg] }, $$scope: { ctx: t } } })),
    {
      c() {
        tr(e.$$.fragment);
      },
      m(t, o) {
        er(e, t, o), (n = !0);
      },
      p(t, n) {
        const o = {};
        805306368 & n && (o.$$scope = { dirty: n, ctx: t }), e.$set(o);
      },
      i(t) {
        n || (Ni(e.$$.fragment, t), (n = !0));
      },
      o(t) {
        Hi(e.$$.fragment, t), (n = !1);
      },
      d(t) {
        nr(e, t);
      },
    }
  );
}
function Fg(t) {
  let e,
    n = t[28].icon + "";
  return {
    c() {
      e = Jo("g");
    },
    m(t, o) {
      qo(t, e, o), (e.innerHTML = n);
    },
    p(t, o) {
      268435456 & o && n !== (n = t[28].icon + "") && (e.innerHTML = n);
    },
    d(t) {
      t && Ko(e);
    },
  };
}
function Bg(t) {
  let e,
    n,
    o = t[28].label + "";
  return {
    c() {
      (e = Qo("span")), (n = ti(o));
    },
    m(t, o) {
      qo(t, e, o), Zo(e, n);
    },
    p(t, e) {
      268435456 & e && o !== (o = t[28].label + "") && li(n, o);
    },
    d(t) {
      t && Ko(e);
    },
  };
}
function zg(t) {
  let e,
    n,
    o,
    i = t[28].icon && Lg(t),
    r = !t[28].hideLabel && Bg(t);
  return {
    c() {
      i && i.c(), (e = ei()), r && r.c(), (n = ni());
    },
    m(t, a) {
      i && i.m(t, a), qo(t, e, a), r && r.m(t, a), qo(t, n, a), (o = !0);
    },
    p(t, o) {
      t[28].icon
        ? i
          ? (i.p(t, o), 268435456 & o && Ni(i, 1))
          : ((i = Lg(t)), i.c(), Ni(i, 1), i.m(e.parentNode, e))
        : i &&
          (Vi(),
          Hi(i, 1, 1, () => {
            i = null;
          }),
          Ui()),
        t[28].hideLabel
          ? r && (r.d(1), (r = null))
          : r
          ? r.p(t, o)
          : ((r = Bg(t)), r.c(), r.m(n.parentNode, n));
    },
    i(t) {
      o || (Ni(i), (o = !0));
    },
    o(t) {
      Hi(i), (o = !1);
    },
    d(t) {
      i && i.d(t), t && Ko(e), r && r.d(t), t && Ko(n);
    },
  };
}
function Dg(t) {
  let e, n;
  return (
    (e = new Cg({
      props: {
        presets: t[10][t[26]].items,
        disabled: t[10][t[26]].disabled,
        onclickpreset: t[1],
        ongrabpreset: t[2],
        ondragpreset: t[3],
        ondroppreset: t[4],
      },
    })),
    {
      c() {
        tr(e.$$.fragment);
      },
      m(t, o) {
        er(e, t, o), (n = !0);
      },
      p(t, n) {
        const o = {};
        67109888 & n && (o.presets = t[10][t[26]].items),
          67109888 & n && (o.disabled = t[10][t[26]].disabled),
          2 & n && (o.onclickpreset = t[1]),
          4 & n && (o.ongrabpreset = t[2]),
          8 & n && (o.ondragpreset = t[3]),
          16 & n && (o.ondroppreset = t[4]),
          e.$set(o);
      },
      i(t) {
        n || (Ni(e.$$.fragment, t), (n = !0));
      },
      o(t) {
        Hi(e.$$.fragment, t), (n = !1);
      },
      d(t) {
        nr(e, t);
      },
    }
  );
}
function Og(t) {
  let e, n;
  return (
    (e = new dl({
      props: {
        scroll: t[27] ? { scrollOffset: 0, animate: !1 } : void 0,
        scrollAutoCancel: t[6],
        elasticity: t[0],
        $$slots: { default: [Dg] },
        $$scope: { ctx: t },
      },
    })),
    {
      c() {
        tr(e.$$.fragment);
      },
      m(t, o) {
        er(e, t, o), (n = !0);
      },
      p(t, n) {
        const o = {};
        134217728 & n && (o.scroll = t[27] ? { scrollOffset: 0, animate: !1 } : void 0),
          64 & n && (o.scrollAutoCancel = t[6]),
          1 & n && (o.elasticity = t[0]),
          603980830 & n && (o.$$scope = { dirty: n, ctx: t }),
          e.$set(o);
      },
      i(t) {
        n || (Ni(e.$$.fragment, t), (n = !0));
      },
      o(t) {
        Hi(e.$$.fragment, t), (n = !1);
      },
      d(t) {
        nr(e, t);
      },
    }
  );
}
function _g(t) {
  let e, n, o, i;
  const r = [Rg, Mg],
    a = [];
  function s(t, e) {
    return t[6] ? 0 : t[13] ? 1 : -1;
  }
  return (
    ~(n = s(t)) && (o = a[n] = r[n](t)),
    {
      c() {
        (e = Qo("div")), o && o.c(), ai(e, "class", "PinturaShapePresetsPalette");
      },
      m(t, o) {
        qo(t, e, o), ~n && a[n].m(e, null), (i = !0);
      },
      p(t, [i]) {
        let l = n;
        (n = s(t)),
          n === l
            ? ~n && a[n].p(t, i)
            : (o &&
                (Vi(),
                Hi(a[l], 1, 1, () => {
                  a[l] = null;
                }),
                Ui()),
              ~n
                ? ((o = a[n]),
                  o ? o.p(t, i) : ((o = a[n] = r[n](t)), o.c()),
                  Ni(o, 1),
                  o.m(e, null))
                : (o = null));
      },
      i(t) {
        i || (Ni(o), (i = !0));
      },
      o(t) {
        Hi(o), (i = !1);
      },
      d(t) {
        t && Ko(e), ~n && a[n].d();
      },
    }
  );
}
function Wg(t, e, o) {
  let i,
    r,
    a,
    s,
    l,
    c,
    u,
    d,
    h,
    { locale: g } = e,
    { presets: m } = e,
    { scrollElasticity: f } = e,
    { enableSelectImage: $ = !0 } = e,
    { willRenderPresetToolbar: y = D } = e,
    { onaddpreset: x = n } = e,
    { ongrabpreset: b = n } = e,
    { ondragpreset: w = n } = e,
    { ondroppreset: S = n } = e;
  const k = "presets-" + C(),
    M = (t, e = "") => (/<svg /.test(t) ? t : Ne(t) ? Ke(t, e) : `<img src="${t}" alt="${e}"/>`),
    R = (t) => I(se(t)),
    T = ["src", "alt", "thumb", "shape", "id", "mount", "disabled"],
    P = (t) =>
      t.map((t) =>
        ((t) => je(t) && v(t[0]) && je(t[1]))(t)
          ? { ...t[2], id: `${k}-${t[0].toLowerCase()}`, label: t[0], items: P(t[1]) }
          : ((t) => {
              let e,
                n,
                o,
                i,
                r,
                a,
                s,
                l = t;
              return (
                v(t)
                  ? Ne(t)
                    ? ((e = t), (r = t), (i = M(e, r)))
                    : ((e = t), (r = R(e)), (i = M(e, r)))
                  : ((e = t.src),
                    (r = t.alt || (v(e) ? R(e) : v(t.thumb) ? R(t.thumb) : void 0)),
                    (i = M(t.thumb || e, r)),
                    (n = t.shape),
                    (a = t.mount),
                    (s = t.disabled),
                    (o = Object.keys(t).reduce((e, n) => (T.includes(n) || (e[n] = t[n]), e), {}))),
                {
                  id: l,
                  src: e,
                  thumb: i,
                  shape: n,
                  shapeProps: o,
                  alt: r,
                  title: r,
                  mount: a,
                  disabled: s,
                }
              );
            })(t)
      );
  return (
    (t.$$set = (t) => {
      "locale" in t && o(14, (g = t.locale)),
        "presets" in t && o(15, (m = t.presets)),
        "scrollElasticity" in t && o(0, (f = t.scrollElasticity)),
        "enableSelectImage" in t && o(16, ($ = t.enableSelectImage)),
        "willRenderPresetToolbar" in t && o(17, (y = t.willRenderPresetToolbar)),
        "onaddpreset" in t && o(1, (x = t.onaddpreset)),
        "ongrabpreset" in t && o(2, (b = t.ongrabpreset)),
        "ondragpreset" in t && o(3, (w = t.ondragpreset)),
        "ondroppreset" in t && o(4, (S = t.ondroppreset));
    }),
    (t.$$.update = () => {
      32768 & t.$$.dirty && o(5, (i = P(m))),
        32 & t.$$.dirty && o(6, (r = i.length)),
        96 & t.$$.dirty && o(7, (a = r && i.some((t) => !!t.items))),
        160 & t.$$.dirty && o(8, (s = a && i)),
        160 & t.$$.dirty && o(10, (l = a && i.reduce((t, e) => ((t[e.id] = e), t), {}))),
        768 & t.$$.dirty && o(9, (c = c || (s && (s.find((t) => !t.disabled) || {}).id))),
        512 & t.$$.dirty && o(11, (u = { name: k, selected: c })),
        256 & t.$$.dirty && o(12, (d = s && s.map((t) => t.id))),
        212994 & t.$$.dirty &&
          o(
            13,
            (h =
              g &&
              y([
                $ && [
                  "Button",
                  "browse",
                  {
                    label: g.shapeLabelButtonSelectSticker,
                    icon: g.shapeIconButtonSelectSticker,
                    onclick: () => {
                      const t = p("input", {
                        type: "file",
                        accept: "image/*",
                        onchange: () => {
                          const [e] = t.files;
                          e && x(e);
                        },
                      });
                      t.click();
                    },
                  },
                ],
              ]))
          );
    }),
    [f, x, b, w, S, i, r, a, s, c, l, u, d, h, g, m, $, y, ({ detail: t }) => o(9, (c = t))]
  );
}
class Vg extends rr {
  constructor(t) {
    super(),
      ir(this, t, Wg, _g, Lo, {
        locale: 14,
        presets: 15,
        scrollElasticity: 0,
        enableSelectImage: 16,
        willRenderPresetToolbar: 17,
        onaddpreset: 1,
        ongrabpreset: 2,
        ondragpreset: 3,
        ondroppreset: 4,
      });
  }
}
function Ug(t) {
  let e, n, o, i;
  const r = [
    { locale: t[4] },
    { parentRect: t[29] },
    { rootRect: t[23] },
    { utilRect: t[19] },
    { offset: t[25] },
    { scale: t[36] },
    { contextRotation: t[13] },
    { contextFlipX: t[14] },
    { contextFlipY: t[15] },
    { opacity: t[21] },
    { eraseRadius: t[27] },
    { selectRadius: t[6] },
    { enableButtonFlipVertical: t[8] },
    { mapEditorPointToImagePoint: t[11] },
    { mapImagePointToEditorPoint: t[12] },
    { oninteractionstart: t[47] },
    { oninteractionupdate: t[48] },
    { oninteractionrelease: t[49] },
    { oninteractionend: t[50] },
    { onaddshape: t[78] },
    { onselectshape: t[79] },
    { onupdateshape: t[80] },
    { onremoveshape: t[81] },
    t[33],
  ];
  function a(e) {
    t[83](e);
  }
  function s(e) {
    t[84](e);
  }
  let l = {};
  for (let t = 0; t < r.length; t += 1) l = To(l, r[t]);
  return (
    void 0 !== t[20] && (l.markup = t[20]),
    void 0 !== t[35] && (l.ui = t[35]),
    (e = new ag({ props: l })),
    t[82](e),
    Mi.push(() => Ji(e, "markup", a)),
    Mi.push(() => Ji(e, "ui", s)),
    e.$on("measure", t[85]),
    {
      c() {
        tr(e.$$.fragment);
      },
      m(t, n) {
        er(e, t, n), (i = !0);
      },
      p(t, i) {
        const a =
          (1789458768 & i[0]) | (68091940 & i[1])
            ? Ki(r, [
                16 & i[0] && { locale: t[4] },
                536870912 & i[0] && { parentRect: t[29] },
                8388608 & i[0] && { rootRect: t[23] },
                524288 & i[0] && { utilRect: t[19] },
                33554432 & i[0] && { offset: t[25] },
                32 & i[1] && { scale: t[36] },
                8192 & i[0] && { contextRotation: t[13] },
                16384 & i[0] && { contextFlipX: t[14] },
                32768 & i[0] && { contextFlipY: t[15] },
                2097152 & i[0] && { opacity: t[21] },
                134217728 & i[0] && { eraseRadius: t[27] },
                64 & i[0] && { selectRadius: t[6] },
                256 & i[0] && { enableButtonFlipVertical: t[8] },
                2048 & i[0] && { mapEditorPointToImagePoint: t[11] },
                4096 & i[0] && { mapImagePointToEditorPoint: t[12] },
                65536 & i[1] && { oninteractionstart: t[47] },
                131072 & i[1] && { oninteractionupdate: t[48] },
                262144 & i[1] && { oninteractionrelease: t[49] },
                524288 & i[1] && { oninteractionend: t[50] },
                (1073741824 & i[0]) | (67108864 & i[1]) && { onaddshape: t[78] },
                1073741824 & i[0] && { onselectshape: t[79] },
                (1073741824 & i[0]) | (67108864 & i[1]) && { onupdateshape: t[80] },
                (1073741824 & i[0]) | (67108864 & i[1]) && { onremoveshape: t[81] },
                4 & i[1] && Qi(t[33]),
              ])
            : {};
        !n && 1048576 & i[0] && ((n = !0), (a.markup = t[20]), Ii(() => (n = !1))),
          !o && 16 & i[1] && ((o = !0), (a.ui = t[35]), Ii(() => (o = !1))),
          e.$set(a);
      },
      i(t) {
        i || (Ni(e.$$.fragment, t), (i = !0));
      },
      o(t) {
        Hi(e.$$.fragment, t), (i = !1);
      },
      d(n) {
        t[82](null), nr(e, n);
      },
    }
  );
}
function Ng(t) {
  let e,
    n,
    o,
    i,
    r = t[24] && Ug(t);
  return {
    c() {
      var t, n, o;
      (e = Qo("div")),
        r && r.c(),
        ai(e, "slot", "main"),
        (t = "cursor"),
        (n = "crosshair"),
        e.style.setProperty(t, n, o ? "important" : "");
    },
    m(a, s) {
      qo(a, e, s),
        r && r.m(e, null),
        t[86](e),
        (n = !0),
        o || ((i = [Uo(Ya.call(null, e)), oi(e, "dropfiles", t[56])]), (o = !0));
    },
    p(t, n) {
      t[24]
        ? r
          ? (r.p(t, n), 16777216 & n[0] && Ni(r, 1))
          : ((r = Ug(t)), r.c(), Ni(r, 1), r.m(e, null))
        : r &&
          (Vi(),
          Hi(r, 1, 1, () => {
            r = null;
          }),
          Ui());
    },
    i(t) {
      n || (Ni(r), (n = !0));
    },
    o(t) {
      Hi(r), (n = !1);
    },
    d(n) {
      n && Ko(e), r && r.d(), t[86](null), (o = !1), Ao(i);
    },
  };
}
function Hg(t) {
  let e, n;
  return (
    (e = new Vg({
      props: {
        locale: t[4],
        presets: t[10],
        enableSelectImage: t[9],
        willRenderPresetToolbar: t[32],
        onaddpreset: t[55],
        ongrabpreset: t[52],
        ondragpreset: t[53],
        ondroppreset: t[54],
        scrollElasticity: t[31],
      },
    })),
    {
      c() {
        tr(e.$$.fragment);
      },
      m(t, o) {
        er(e, t, o), (n = !0);
      },
      p(t, n) {
        const o = {};
        16 & n[0] && (o.locale = t[4]),
          1024 & n[0] && (o.presets = t[10]),
          512 & n[0] && (o.enableSelectImage = t[9]),
          2 & n[1] && (o.willRenderPresetToolbar = t[32]),
          1 & n[1] && (o.scrollElasticity = t[31]),
          e.$set(o);
      },
      i(t) {
        n || (Ni(e.$$.fragment, t), (n = !0));
      },
      o(t) {
        Hi(e.$$.fragment, t), (n = !1);
      },
      d(t) {
        nr(e, t);
      },
    }
  );
}
function Xg(t) {
  let e, n, o, i, r, a;
  const s = [Yg, jg],
    l = [];
  function c(t, e) {
    return t[28] ? 0 : 1;
  }
  return (
    (n = c(t)),
    (o = l[n] = s[n](t)),
    (r = new dl({
      props: {
        class: "PinturaControlListScroller",
        elasticity: t[31],
        $$slots: { default: [Kg] },
        $$scope: { ctx: t },
      },
    })),
    {
      c() {
        (e = Qo("div")),
          o.c(),
          (i = ei()),
          tr(r.$$.fragment),
          ai(e, "class", "PinturaControlPanels");
      },
      m(t, o) {
        qo(t, e, o), l[n].m(e, null), qo(t, i, o), er(r, t, o), (a = !0);
      },
      p(t, i) {
        let a = n;
        (n = c(t)),
          n === a
            ? l[n].p(t, i)
            : (Vi(),
              Hi(l[a], 1, 1, () => {
                l[a] = null;
              }),
              Ui(),
              (o = l[n]),
              o ? o.p(t, i) : ((o = l[n] = s[n](t)), o.c()),
              Ni(o, 1),
              o.m(e, null));
        const u = {};
        1 & i[1] && (u.elasticity = t[31]),
          (4194321 & i[0]) | (128 & i[3]) && (u.$$scope = { dirty: i, ctx: t }),
          r.$set(u);
      },
      i(t) {
        a || (Ni(o), Ni(r.$$.fragment, t), (a = !0));
      },
      o(t) {
        Hi(o), Hi(r.$$.fragment, t), (a = !1);
      },
      d(t) {
        t && Ko(e), l[n].d(), t && Ko(i), nr(r, t);
      },
    }
  );
}
function jg(t) {
  let e, n, o;
  return (
    (n = new $g({
      props: {
        locale: t[4],
        shape: t[26],
        onchange: t[51],
        controls: t[7],
        scrollElasticity: t[31],
      },
    })),
    {
      c() {
        (e = Qo("div")), tr(n.$$.fragment), ai(e, "class", "PinturaControlPanel");
      },
      m(t, i) {
        qo(t, e, i), er(n, e, null), (o = !0);
      },
      p(t, e) {
        const o = {};
        16 & e[0] && (o.locale = t[4]),
          67108864 & e[0] && (o.shape = t[26]),
          128 & e[0] && (o.controls = t[7]),
          1 & e[1] && (o.scrollElasticity = t[31]),
          n.$set(o);
      },
      i(t) {
        o || (Ni(n.$$.fragment, t), (o = !0));
      },
      o(t) {
        Hi(n.$$.fragment, t), (o = !1);
      },
      d(t) {
        t && Ko(e), nr(n);
      },
    }
  );
}
function Yg(t) {
  let e, n, o;
  return (
    (n = new Vg({
      props: {
        locale: t[4],
        presets: t[10],
        enableSelectImage: t[9],
        willRenderPresetToolbar: t[32],
        onaddpreset: t[55],
        ongrabpreset: t[52],
        ondragpreset: t[53],
        ondroppreset: t[54],
        scrollElasticity: t[31],
      },
    })),
    {
      c() {
        (e = Qo("div")), tr(n.$$.fragment), ai(e, "class", "PinturaControlPanel");
      },
      m(t, i) {
        qo(t, e, i), er(n, e, null), (o = !0);
      },
      p(t, e) {
        const o = {};
        16 & e[0] && (o.locale = t[4]),
          1024 & e[0] && (o.presets = t[10]),
          512 & e[0] && (o.enableSelectImage = t[9]),
          2 & e[1] && (o.willRenderPresetToolbar = t[32]),
          1 & e[1] && (o.scrollElasticity = t[31]),
          n.$set(o);
      },
      i(t) {
        o || (Ni(n.$$.fragment, t), (o = !0));
      },
      o(t) {
        Hi(n.$$.fragment, t), (o = !1);
      },
      d(t) {
        t && Ko(e), nr(n);
      },
    }
  );
}
function Gg(t) {
  let e, n;
  return (
    (e = new Ys({ props: { $$slots: { default: [Zg] }, $$scope: { ctx: t } } })),
    {
      c() {
        tr(e.$$.fragment);
      },
      m(t, o) {
        er(e, t, o), (n = !0);
      },
      p(t, n) {
        const o = {};
        (16 & n[0]) | (192 & n[3]) && (o.$$scope = { dirty: n, ctx: t }), e.$set(o);
      },
      i(t) {
        n || (Ni(e.$$.fragment, t), (n = !0));
      },
      o(t) {
        Hi(e.$$.fragment, t), (n = !1);
      },
      d(t) {
        nr(e, t);
      },
    }
  );
}
function Zg(t) {
  let e,
    n = (Xe(t[99].icon) ? t[99].icon(t[4]) : t[99].icon) + "";
  return {
    c() {
      e = Jo("g");
    },
    m(t, o) {
      qo(t, e, o), (e.innerHTML = n);
    },
    p(t, o) {
      (16 & o[0]) | (64 & o[3]) &&
        n !== (n = (Xe(t[99].icon) ? t[99].icon(t[4]) : t[99].icon) + "") &&
        (e.innerHTML = n);
    },
    d(t) {
      t && Ko(e);
    },
  };
}
function qg(t) {
  let e,
    n,
    o,
    i,
    r,
    a = (Xe(t[99].label) ? t[99].label(t[4]) : t[99].label) + "",
    s = t[99].icon && Gg(t);
  return {
    c() {
      (e = Qo("div")),
        s && s.c(),
        (n = ei()),
        (o = Qo("span")),
        (i = ti(a)),
        ai(e, "slot", "option");
    },
    m(t, a) {
      qo(t, e, a), s && s.m(e, null), Zo(e, n), Zo(e, o), Zo(o, i), (r = !0);
    },
    p(t, o) {
      t[99].icon
        ? s
          ? (s.p(t, o), 64 & o[3] && Ni(s, 1))
          : ((s = Gg(t)), s.c(), Ni(s, 1), s.m(e, n))
        : s &&
          (Vi(),
          Hi(s, 1, 1, () => {
            s = null;
          }),
          Ui()),
        (!r || (16 & o[0]) | (64 & o[3])) &&
          a !== (a = (Xe(t[99].label) ? t[99].label(t[4]) : t[99].label) + "") &&
          li(i, a);
    },
    i(t) {
      r || (Ni(s), (r = !0));
    },
    o(t) {
      Hi(s), (r = !1);
    },
    d(t) {
      t && Ko(e), s && s.d();
    },
  };
}
function Kg(t) {
  let e, n;
  return (
    (e = new pc({
      props: {
        locale: t[4],
        class: "PinturaControlList",
        optionClass: "PinturaControlListOption",
        layout: "row",
        options: t[22],
        selectedIndex: t[22].findIndex(t[77]),
        onchange: t[46],
        $$slots: {
          option: [qg, ({ option: t }) => ({ 99: t }), ({ option: t }) => [0, 0, 0, t ? 64 : 0]],
        },
        $$scope: { ctx: t },
      },
    })),
    {
      c() {
        tr(e.$$.fragment);
      },
      m(t, o) {
        er(e, t, o), (n = !0);
      },
      p(t, n) {
        const o = {};
        16 & n[0] && (o.locale = t[4]),
          4194304 & n[0] && (o.options = t[22]),
          4194305 & n[0] && (o.selectedIndex = t[22].findIndex(t[77])),
          (16 & n[0]) | (192 & n[3]) && (o.$$scope = { dirty: n, ctx: t }),
          e.$set(o);
      },
      i(t) {
        n || (Ni(e.$$.fragment, t), (n = !0));
      },
      o(t) {
        Hi(e.$$.fragment, t), (n = !1);
      },
      d(t) {
        nr(e, t);
      },
    }
  );
}
function Qg(t) {
  let e, n, o, i;
  const r = [Xg, Hg],
    a = [];
  function s(t, e) {
    return t[22].length ? 0 : t[28] ? 1 : -1;
  }
  return (
    ~(n = s(t)) && (o = a[n] = r[n](t)),
    {
      c() {
        (e = Qo("div")), o && o.c(), ai(e, "slot", "footer"), ai(e, "style", t[34]);
      },
      m(t, o) {
        qo(t, e, o), ~n && a[n].m(e, null), (i = !0);
      },
      p(t, l) {
        let c = n;
        (n = s(t)),
          n === c
            ? ~n && a[n].p(t, l)
            : (o &&
                (Vi(),
                Hi(a[c], 1, 1, () => {
                  a[c] = null;
                }),
                Ui()),
              ~n
                ? ((o = a[n]),
                  o ? o.p(t, l) : ((o = a[n] = r[n](t)), o.c()),
                  Ni(o, 1),
                  o.m(e, null))
                : (o = null)),
          (!i || 8 & l[1]) && ai(e, "style", t[34]);
      },
      i(t) {
        i || (Ni(o), (i = !0));
      },
      o(t) {
        Hi(o), (i = !1);
      },
      d(t) {
        t && Ko(e), ~n && a[n].d();
      },
    }
  );
}
function Jg(t) {
  let e, n;
  return (
    (e = new kp({ props: { $$slots: { footer: [Qg], main: [Ng] }, $$scope: { ctx: t } } })),
    e.$on("measure", t[87]),
    {
      c() {
        tr(e.$$.fragment);
      },
      m(t, o) {
        er(e, t, o), (n = !0);
      },
      p(t, n) {
        const o = {};
        (2147418065 & n[0]) | (63 & n[1]) | (128 & n[3]) && (o.$$scope = { dirty: n, ctx: t }),
          e.$set(o);
      },
      i(t) {
        n || (Ni(e.$$.fragment, t), (n = !0));
      },
      o(t) {
        Hi(e.$$.fragment, t), (n = !1);
      },
      d(t) {
        nr(e, t);
      },
    }
  );
}
function tm(t, e, n) {
  let o,
    i,
    r,
    a,
    s,
    l,
    c,
    u,
    d,
    p,
    h,
    g,
    m,
    f,
    $,
    y,
    x,
    b,
    v,
    w,
    S,
    k,
    C,
    M,
    R,
    T,
    P,
    E,
    A,
    I,
    L = Mo,
    F = () => (L(), (L = Fo(H, (t) => n(66, (x = t)))), H),
    B = Mo,
    z = () => (B(), (B = Fo(Y, (t) => n(69, (v = t)))), Y),
    O = Mo,
    _ = () => (O(), (O = Fo(q, (t) => n(20, (k = t)))), q),
    W = Mo,
    V = () => (W(), (W = Fo(j, (t) => n(21, (C = t)))), j),
    U = Mo,
    N = () => (U(), (U = Fo(pt, (t) => n(29, (R = t)))), pt);
  t.$$.on_destroy.push(() => L()),
    t.$$.on_destroy.push(() => B()),
    t.$$.on_destroy.push(() => O()),
    t.$$.on_destroy.push(() => W()),
    t.$$.on_destroy.push(() => U());
  let { isActive: H } = e;
  F();
  let { isActiveFraction: j } = e;
  V();
  let { isVisible: Y } = e;
  z();
  let { stores: G } = e,
    { locale: Z = {} } = e,
    { shapes: q = [] } = e;
  _();
  let { tools: K = [] } = e,
    { toolShapes: Q = [] } = e,
    { toolActive: J = "sharpie" } = e,
    { toolSelectRadius: tt } = e,
    { shapeControls: et = [] } = e,
    { enableButtonFlipVertical: nt = !1 } = e,
    { enablePresetSelectImage: ot = !0 } = e,
    { willRenderPresetToolbar: it } = e,
    { shapePresets: rt = [] } = e,
    { utilKey: at } = e,
    { mapScreenPointToImagePoint: st } = e,
    { mapImagePointToScreenPoint: lt } = e,
    { imageRotation: ct = 0 } = e,
    { imageFlipX: ut = !1 } = e,
    { imageFlipY: dt = !1 } = e,
    { parentRect: pt } = e;
  N();
  let { hooks: ht = {} } = e;
  const {
    env: gt,
    animation: mt,
    history: ft,
    rootRect: $t,
    stageRect: xt,
    utilRect: bt,
    elasticityMultiplier: vt,
    scrollElasticity: wt,
    imageOverlayMarkup: St,
    imagePreviewModifiers: kt,
    imageCropRect: Ct,
    presentationScalar: Mt,
  } = G;
  zo(t, gt, (t) => n(74, (T = t))),
    zo(t, mt, (t) => n(75, (P = t))),
    zo(t, $t, (t) => n(23, (y = t))),
    zo(t, xt, (t) => n(70, (S = t))),
    zo(t, bt, (t) => n(19, (w = t))),
    zo(t, St, (t) => n(35, (A = t))),
    zo(t, kt, (t) => n(67, (b = t))),
    zo(t, Ct, (t) => n(90, (M = t))),
    zo(t, Mt, (t) => n(36, (I = t)));
  const Rt = (t) => st(jh(t, y));
  let Tt,
    Pt,
    Et = {};
  const At = (t, e) => {
      let n = !1;
      if ((e || ((n = !0), (e = Ft(M))), (e.x -= R.x || 0), (e.y -= R.y || 0), 0 !== ct)) {
        const t = { width: R.width, height: R.height };
        yt(t, ct);
        const n = 0.5 * (R.width - Math.abs(t.width)),
          o = 0.5 * (R.height - Math.abs(t.height));
        (e.x += n), (e.y += o);
      }
      const o = yn(t, M, (t, n) => {
        if (k.find((t) => t.id === n.id)) {
          if (t) return Tt.removeShape(n), console.error(t);
          dn(n, M), pn(n, e), k[k.length - 1] === n && Tt.selectShape(n);
        }
      });
      (o.flipX = ut), (o.flipY = dt), (o.rotation = 0 !== ct ? -ct : 0);
      const i = Tt.getShapesNearPosition(e),
        r = M.width,
        a = M.height;
      if (n && i.length && o.width && o.height && o.width < r && o.height < a) {
        const t = 0.1 * Math.min(r, a);
        (e.x += Math.round(-t + Math.random() * t * 2)),
          (e.y += Math.round(-t + Math.random() * t * 2));
      }
      return dn(o, M), pn(o, e), o;
    },
    It = (t, e) => {
      const n = At(t, e);
      return Lt(n);
    },
    Lt = (t) => {
      const { beforeAddShape: e = () => !0 } = ht;
      if (e(t)) return Tt.addShape(t), ft.write(), t;
    };
  let Bt = !1;
  const zt = () => ft.write();
  let Dt;
  const Ot = La(P ? 20 : 0);
  zo(t, Ot, (t) => n(76, (E = t)));
  return (
    (t.$$set = (t) => {
      "isActive" in t && F(n(1, (H = t.isActive))),
        "isActiveFraction" in t && V(n(2, (j = t.isActiveFraction))),
        "isVisible" in t && z(n(3, (Y = t.isVisible))),
        "stores" in t && n(59, (G = t.stores)),
        "locale" in t && n(4, (Z = t.locale)),
        "shapes" in t && _(n(5, (q = t.shapes))),
        "tools" in t && n(60, (K = t.tools)),
        "toolShapes" in t && n(61, (Q = t.toolShapes)),
        "toolActive" in t && n(0, (J = t.toolActive)),
        "toolSelectRadius" in t && n(6, (tt = t.toolSelectRadius)),
        "shapeControls" in t && n(7, (et = t.shapeControls)),
        "enableButtonFlipVertical" in t && n(8, (nt = t.enableButtonFlipVertical)),
        "enablePresetSelectImage" in t && n(9, (ot = t.enablePresetSelectImage)),
        "willRenderPresetToolbar" in t && n(62, (it = t.willRenderPresetToolbar)),
        "shapePresets" in t && n(10, (rt = t.shapePresets)),
        "utilKey" in t && n(63, (at = t.utilKey)),
        "mapScreenPointToImagePoint" in t && n(11, (st = t.mapScreenPointToImagePoint)),
        "mapImagePointToScreenPoint" in t && n(12, (lt = t.mapImagePointToScreenPoint)),
        "imageRotation" in t && n(13, (ct = t.imageRotation)),
        "imageFlipX" in t && n(14, (ut = t.imageFlipX)),
        "imageFlipY" in t && n(15, (dt = t.imageFlipY)),
        "parentRect" in t && N(n(16, (pt = t.parentRect))),
        "hooks" in t && n(64, (ht = t.hooks));
    }),
    (t.$$.update = () => {
      var e;
      (1024 & t.$$.dirty[0]) | (536870912 & t.$$.dirty[1]) &&
        n(22, (o = 0 === rt.length ? K.filter((t) => "preset" !== t[0]) : K)),
        50 & t.$$.dirty[2] && (x ? Vo(kt, (b[at] = { maskMarkupOpacity: 0.85 }), b) : delete b[at]),
        128 & t.$$.dirty[2] && n(24, (i = v)),
        (524288 & t.$$.dirty[0]) | (256 & t.$$.dirty[2]) &&
          n(25, (r = w && X(S.x - w.x, S.y - w.y))),
        131073 & t.$$.dirty[0] && J && Tt && Tt.blurShapes(),
        128 & t.$$.dirty[0] && n(71, (a = Object.keys(et))),
        1048576 & t.$$.dirty[0] && n(72, (s = (k.filter(An) || [])[0])),
        (1 & t.$$.dirty[0]) | (1073741824 & t.$$.dirty[1]) | (16 & t.$$.dirty[2]) &&
          n(73, (l = x && (Q[J] ? Kn(hn(Q[J][0])) : {}))),
        2568 & t.$$.dirty[2] &&
          n(
            68,
            (c =
              l &&
              Object.keys(l).reduce((t, e) => {
                const n = "disableStyle" === e,
                  o = a.find((t) => t.split("_").includes(e));
                return n || o ? (void 0 === l[e] || (t[e] = Et[e] || l[e]), t) : t;
              }, {}))
          ),
        1088 & t.$$.dirty[2] && n(26, (u = s || c)),
        2048 & t.$$.dirty[2] && n(27, (d = l && Ue(l.eraseRadius) ? l.eraseRadius : void 0)),
        2098689 & t.$$.dirty[0] && n(28, (p = C > 0 && "preset" === J && (rt.length > 0 || ot))),
        262144 & t.$$.dirty[0] &&
          n(
            30,
            (h =
              Dt &&
              ((e = Dt),
              (t, n) => {
                e.dispatchEvent(
                  new CustomEvent("ping", {
                    detail: { type: t, data: n },
                    cancelable: !0,
                    bubbles: !0,
                  })
                );
              }))
          ),
        4097 & t.$$.dirty[2] && n(32, (m = it ? (t) => it(t, It, { ...T }) : D)),
        4 & t.$$.dirty[2] &&
          n(
            33,
            (f = Object.keys(ht).reduce(
              (t, e) => ("beforeAddShape" === e || (t[e] = ht[e]), t),
              {}
            ))
          ),
        8208 & t.$$.dirty[2] && P && Ot.set(x ? 0 : 20),
        16384 & t.$$.dirty[2] && n(34, ($ = E ? `transform: translateY(${E}px)` : void 0));
    }),
    n(31, (g = vt * wt)),
    [
      J,
      H,
      j,
      Y,
      Z,
      q,
      tt,
      et,
      nt,
      ot,
      rt,
      st,
      lt,
      ct,
      ut,
      dt,
      pt,
      Tt,
      Dt,
      w,
      k,
      C,
      o,
      y,
      i,
      r,
      u,
      d,
      p,
      R,
      h,
      g,
      m,
      f,
      $,
      A,
      I,
      gt,
      mt,
      $t,
      xt,
      bt,
      St,
      kt,
      Ct,
      Mt,
      ({ value: t }) => n(0, (J = t)),
      (t) => {
        if ("eraser" === J) Pt = Tt.eraseShape();
        else if (Q[J]) {
          const [t, e] = Q[J];
          Pt = Tt.createShape({ ...t, ...c }, e);
        } else Pt = void 0;
        Pt && Pt.start(t);
      },
      (t) => {
        Pt && Pt.update(t);
      },
      (t) => {
        Pt && Pt.release(t);
      },
      (t) => {
        Pt && (Pt.end(t), (Pt = void 0));
      },
      function (t) {
        Object.keys(t).forEach((e) => n(65, (Et[e] = t[e]), Et)),
          s && (Tt.updateMarkupShape(s, t), zt());
      },
      (t, e) => {
        Bt = !1;
      },
      (t, e) => {
        if (Bt) return;
        const { beforeAddShape: n = () => !0 } = ht,
          o = Rt(e),
          i = Tt.getMarkupItemDraft(),
          r = Xt(M, { x: o.x + (R.x || 0), y: o.y + (R.y || 0) });
        if ((i && !r && Tt.discardMarkupItemDraft(), r)) {
          if (!i) {
            const i = At(t, o);
            return n(i)
              ? (((t) => {
                  t.isDraft = !0;
                })(i),
                void Tt.addShape(i))
              : ((Bt = !0), void e.preventDefault());
          }
          Tt.updateMarkupShape(i, { x: o.x - 0.5 * i.width, y: o.y - 0.5 * i.height });
        }
      },
      (t, e) => {
        if (Bt) return;
        const n = Rt(e);
        if (Xt(M, { x: n.x + (R.x || 0), y: n.y + (R.y || 0) })) {
          const t = Tt.confirmMarkupItemDraft();
          Tt.selectShape(t), ft.write();
        } else Tt.discardMarkupItemDraft();
      },
      (t) => It(t),
      (t) => {
        return (e = t.detail.files), (n = Rt(t.detail.event)), e.forEach((t) => It(t, n));
        var e, n;
      },
      zt,
      Ot,
      G,
      K,
      Q,
      it,
      at,
      ht,
      Et,
      x,
      b,
      c,
      v,
      S,
      a,
      s,
      l,
      T,
      P,
      E,
      (t) => t[0] === J,
      (t) => {
        h("addshape", t), zt();
      },
      (t) => {
        h("selectshape", t);
      },
      (t) => {
        h("updateshape", t), zt();
      },
      (t) => {
        h("removeshape", t), zt();
      },
      function (t) {
        Mi[t ? "unshift" : "push"](() => {
          (Tt = t), n(17, Tt);
        });
      },
      function (t) {
        (k = t), q.set(k);
      },
      function (t) {
        (A = t), St.set(A);
      },
      function (e) {
        ki(t, e);
      },
      function (t) {
        Mi[t ? "unshift" : "push"](() => {
          (Dt = t), n(18, Dt);
        });
      },
      function (e) {
        ki(t, e);
      },
    ]
  );
}
class em extends rr {
  constructor(t) {
    super(),
      ir(
        this,
        t,
        tm,
        Jg,
        Lo,
        {
          isActive: 1,
          isActiveFraction: 2,
          isVisible: 3,
          stores: 59,
          locale: 4,
          shapes: 5,
          tools: 60,
          toolShapes: 61,
          toolActive: 0,
          toolSelectRadius: 6,
          shapeControls: 7,
          enableButtonFlipVertical: 8,
          enablePresetSelectImage: 9,
          willRenderPresetToolbar: 62,
          shapePresets: 10,
          utilKey: 63,
          mapScreenPointToImagePoint: 11,
          mapImagePointToScreenPoint: 12,
          imageRotation: 13,
          imageFlipX: 14,
          imageFlipY: 15,
          parentRect: 16,
          hooks: 64,
        },
        [-1, -1, -1, -1]
      );
  }
  get isActive() {
    return this.$$.ctx[1];
  }
  set isActive(t) {
    this.$set({ isActive: t }), Bi();
  }
  get isActiveFraction() {
    return this.$$.ctx[2];
  }
  set isActiveFraction(t) {
    this.$set({ isActiveFraction: t }), Bi();
  }
  get isVisible() {
    return this.$$.ctx[3];
  }
  set isVisible(t) {
    this.$set({ isVisible: t }), Bi();
  }
  get stores() {
    return this.$$.ctx[59];
  }
  set stores(t) {
    this.$set({ stores: t }), Bi();
  }
  get locale() {
    return this.$$.ctx[4];
  }
  set locale(t) {
    this.$set({ locale: t }), Bi();
  }
  get shapes() {
    return this.$$.ctx[5];
  }
  set shapes(t) {
    this.$set({ shapes: t }), Bi();
  }
  get tools() {
    return this.$$.ctx[60];
  }
  set tools(t) {
    this.$set({ tools: t }), Bi();
  }
  get toolShapes() {
    return this.$$.ctx[61];
  }
  set toolShapes(t) {
    this.$set({ toolShapes: t }), Bi();
  }
  get toolActive() {
    return this.$$.ctx[0];
  }
  set toolActive(t) {
    this.$set({ toolActive: t }), Bi();
  }
  get toolSelectRadius() {
    return this.$$.ctx[6];
  }
  set toolSelectRadius(t) {
    this.$set({ toolSelectRadius: t }), Bi();
  }
  get shapeControls() {
    return this.$$.ctx[7];
  }
  set shapeControls(t) {
    this.$set({ shapeControls: t }), Bi();
  }
  get enableButtonFlipVertical() {
    return this.$$.ctx[8];
  }
  set enableButtonFlipVertical(t) {
    this.$set({ enableButtonFlipVertical: t }), Bi();
  }
  get enablePresetSelectImage() {
    return this.$$.ctx[9];
  }
  set enablePresetSelectImage(t) {
    this.$set({ enablePresetSelectImage: t }), Bi();
  }
  get willRenderPresetToolbar() {
    return this.$$.ctx[62];
  }
  set willRenderPresetToolbar(t) {
    this.$set({ willRenderPresetToolbar: t }), Bi();
  }
  get shapePresets() {
    return this.$$.ctx[10];
  }
  set shapePresets(t) {
    this.$set({ shapePresets: t }), Bi();
  }
  get utilKey() {
    return this.$$.ctx[63];
  }
  set utilKey(t) {
    this.$set({ utilKey: t }), Bi();
  }
  get mapScreenPointToImagePoint() {
    return this.$$.ctx[11];
  }
  set mapScreenPointToImagePoint(t) {
    this.$set({ mapScreenPointToImagePoint: t }), Bi();
  }
  get mapImagePointToScreenPoint() {
    return this.$$.ctx[12];
  }
  set mapImagePointToScreenPoint(t) {
    this.$set({ mapImagePointToScreenPoint: t }), Bi();
  }
  get imageRotation() {
    return this.$$.ctx[13];
  }
  set imageRotation(t) {
    this.$set({ imageRotation: t }), Bi();
  }
  get imageFlipX() {
    return this.$$.ctx[14];
  }
  set imageFlipX(t) {
    this.$set({ imageFlipX: t }), Bi();
  }
  get imageFlipY() {
    return this.$$.ctx[15];
  }
  set imageFlipY(t) {
    this.$set({ imageFlipY: t }), Bi();
  }
  get parentRect() {
    return this.$$.ctx[16];
  }
  set parentRect(t) {
    this.$set({ parentRect: t }), Bi();
  }
  get hooks() {
    return this.$$.ctx[64];
  }
  set hooks(t) {
    this.$set({ hooks: t }), Bi();
  }
}
var nm = (t, e, n, o, i, r, a, s, l) => {
    const c = Y(t),
      u = 0.5 * n.width,
      d = 0.5 * n.height,
      p = 0.5 * e.width,
      h = 0.5 * e.height,
      g = i.x + o.x,
      m = i.y + o.y;
    s && (c.x = n.width - c.x), l && (c.y = n.height - c.y);
    const f = Math.cos(r),
      $ = Math.sin(r);
    (c.x -= u), (c.y -= d);
    const y = c.x * f - c.y * $,
      x = c.x * $ + c.y * f;
    (c.x = u + y),
      (c.y = d + x),
      (c.x *= a),
      (c.y *= a),
      (c.x += p),
      (c.y += h),
      (c.x += g),
      (c.y += m),
      (c.x -= u * a),
      (c.y -= d * a);
    const b = (i.x - g) * a,
      v = (i.y - m) * a,
      w = b * f - v * $,
      S = b * $ + v * f;
    return (c.x += w), (c.y += S), c;
  },
  om = (t, e, n, o, i, r, a, s, l) => {
    const c = Y(t),
      u = $t(n),
      d = $t(e),
      p = X(i.x + o.x, i.y + o.y),
      h = Math.cos(r),
      g = Math.sin(r);
    (c.x -= d.x), (c.y -= d.y);
    const m = (i.x - p.x) * a,
      f = (i.y - p.y) * a,
      $ = m * h - f * g,
      y = m * g + f * h;
    (c.x -= $), (c.y -= y), (c.x -= p.x), (c.y -= p.y), (c.x /= a), (c.y /= a);
    const x = c.x * h + c.y * g,
      b = c.x * g - c.y * h;
    return (
      (c.x = x),
      (c.y = -b),
      (c.x += u.x),
      (c.y += u.y),
      s && (c.x = n.width - c.x),
      l && (c.y = n.height - c.y),
      c
    );
  };
function im(t) {
  let e, n;
  return (
    (e = new em({
      props: {
        stores: t[3],
        locale: t[4],
        isActive: t[0],
        isActiveFraction: t[1],
        isVisible: t[2],
        mapScreenPointToImagePoint: t[34],
        mapImagePointToScreenPoint: t[35],
        utilKey: "annotate",
        imageRotation: t[26],
        imageFlipX: t[24],
        imageFlipY: t[25],
        shapes: t[28],
        tools: t[10] || t[5],
        toolShapes: t[11] || t[6],
        toolActive: t[13],
        shapeControls: t[12] || t[7],
        shapePresets: t[16],
        enableButtonFlipVertical: t[14],
        parentRect: t[29],
        enablePresetSelectImage: t[15],
        toolSelectRadius: t[8],
        willRenderPresetToolbar: t[17] || t[9],
        hooks: {
          willRenderShapeControls: t[18],
          beforeAddShape: t[19],
          beforeRemoveShape: t[20],
          beforeDeselectShape: t[21],
          beforeSelectShape: t[22],
          beforeUpdateShape: t[23],
        },
      },
    })),
    e.$on("measure", t[37]),
    {
      c() {
        tr(e.$$.fragment);
      },
      m(t, o) {
        er(e, t, o), (n = !0);
      },
      p(t, n) {
        const o = {};
        8 & n[0] && (o.stores = t[3]),
          16 & n[0] && (o.locale = t[4]),
          1 & n[0] && (o.isActive = t[0]),
          2 & n[0] && (o.isActiveFraction = t[1]),
          4 & n[0] && (o.isVisible = t[2]),
          67108864 & n[0] && (o.imageRotation = t[26]),
          16777216 & n[0] && (o.imageFlipX = t[24]),
          33554432 & n[0] && (o.imageFlipY = t[25]),
          1056 & n[0] && (o.tools = t[10] || t[5]),
          2112 & n[0] && (o.toolShapes = t[11] || t[6]),
          8192 & n[0] && (o.toolActive = t[13]),
          4224 & n[0] && (o.shapeControls = t[12] || t[7]),
          65536 & n[0] && (o.shapePresets = t[16]),
          16384 & n[0] && (o.enableButtonFlipVertical = t[14]),
          32768 & n[0] && (o.enablePresetSelectImage = t[15]),
          256 & n[0] && (o.toolSelectRadius = t[8]),
          131584 & n[0] && (o.willRenderPresetToolbar = t[17] || t[9]),
          16515072 & n[0] &&
            (o.hooks = {
              willRenderShapeControls: t[18],
              beforeAddShape: t[19],
              beforeRemoveShape: t[20],
              beforeDeselectShape: t[21],
              beforeSelectShape: t[22],
              beforeUpdateShape: t[23],
            }),
          e.$set(o);
      },
      i(t) {
        n || (Ni(e.$$.fragment, t), (n = !0));
      },
      o(t) {
        Hi(e.$$.fragment, t), (n = !1);
      },
      d(t) {
        nr(e, t);
      },
    }
  );
}
function rm(t, e, n) {
  let o, i, r, a, s, l;
  let { isActive: c } = e,
    { isActiveFraction: u } = e,
    { isVisible: d } = e,
    { stores: p } = e,
    { locale: h = {} } = e,
    { markupEditorToolbar: g } = e,
    { markupEditorToolStyles: m } = e,
    { markupEditorShapeStyleControls: f } = e,
    { markupEditorToolSelectRadius: $ } = e,
    { willRenderShapePresetToolbar: y } = e,
    { annotateTools: x } = e,
    { annotateToolShapes: b } = e,
    { annotateShapeControls: v } = e,
    { annotateActiveTool: w = "sharpie" } = e,
    { annotateEnableButtonFlipVertical: S = !1 } = e,
    { annotateEnableSelectImagePreset: k = !1 } = e,
    { annotatePresets: C = [] } = e,
    { annotateWillRenderShapePresetToolbar: M } = e,
    { willRenderShapeControls: R } = e,
    { beforeAddShape: T } = e,
    { beforeRemoveShape: P } = e,
    { beforeDeselectShape: E } = e,
    { beforeSelectShape: A } = e,
    { beforeUpdateShape: I } = e;
  const {
    rootRect: L,
    imageAnnotation: F,
    imageSize: B,
    imageTransforms: z,
    imageRotation: D,
    imageFlipX: O,
    imageFlipY: _,
  } = p;
  zo(t, L, (t) => n(38, (o = t))),
    zo(t, B, (t) => n(39, (i = t))),
    zo(t, z, (t) => n(40, (r = t))),
    zo(t, D, (t) => n(26, (l = t))),
    zo(t, O, (t) => n(24, (a = t))),
    zo(t, _, (t) => n(25, (s = t)));
  return (
    (t.$$set = (t) => {
      "isActive" in t && n(0, (c = t.isActive)),
        "isActiveFraction" in t && n(1, (u = t.isActiveFraction)),
        "isVisible" in t && n(2, (d = t.isVisible)),
        "stores" in t && n(3, (p = t.stores)),
        "locale" in t && n(4, (h = t.locale)),
        "markupEditorToolbar" in t && n(5, (g = t.markupEditorToolbar)),
        "markupEditorToolStyles" in t && n(6, (m = t.markupEditorToolStyles)),
        "markupEditorShapeStyleControls" in t && n(7, (f = t.markupEditorShapeStyleControls)),
        "markupEditorToolSelectRadius" in t && n(8, ($ = t.markupEditorToolSelectRadius)),
        "willRenderShapePresetToolbar" in t && n(9, (y = t.willRenderShapePresetToolbar)),
        "annotateTools" in t && n(10, (x = t.annotateTools)),
        "annotateToolShapes" in t && n(11, (b = t.annotateToolShapes)),
        "annotateShapeControls" in t && n(12, (v = t.annotateShapeControls)),
        "annotateActiveTool" in t && n(13, (w = t.annotateActiveTool)),
        "annotateEnableButtonFlipVertical" in t && n(14, (S = t.annotateEnableButtonFlipVertical)),
        "annotateEnableSelectImagePreset" in t && n(15, (k = t.annotateEnableSelectImagePreset)),
        "annotatePresets" in t && n(16, (C = t.annotatePresets)),
        "annotateWillRenderShapePresetToolbar" in t &&
          n(17, (M = t.annotateWillRenderShapePresetToolbar)),
        "willRenderShapeControls" in t && n(18, (R = t.willRenderShapeControls)),
        "beforeAddShape" in t && n(19, (T = t.beforeAddShape)),
        "beforeRemoveShape" in t && n(20, (P = t.beforeRemoveShape)),
        "beforeDeselectShape" in t && n(21, (E = t.beforeDeselectShape)),
        "beforeSelectShape" in t && n(22, (A = t.beforeSelectShape)),
        "beforeUpdateShape" in t && n(23, (I = t.beforeUpdateShape));
    }),
    [
      c,
      u,
      d,
      p,
      h,
      g,
      m,
      f,
      $,
      y,
      x,
      b,
      v,
      w,
      S,
      k,
      C,
      M,
      R,
      T,
      P,
      E,
      A,
      I,
      a,
      s,
      l,
      L,
      F,
      B,
      z,
      D,
      O,
      _,
      (t) => om(t, o, i, r.origin, r.translation, r.rotation.z, r.scale, a, s),
      (t) => nm(t, o, i, r.origin, r.translation, r.rotation.z, r.scale, a, s),
      "annotate",
      function (e) {
        ki(t, e);
      },
    ]
  );
}
var am = {
  util: [
    "annotate",
    class extends rr {
      constructor(t) {
        super(),
          ir(
            this,
            t,
            rm,
            im,
            Lo,
            {
              name: 36,
              isActive: 0,
              isActiveFraction: 1,
              isVisible: 2,
              stores: 3,
              locale: 4,
              markupEditorToolbar: 5,
              markupEditorToolStyles: 6,
              markupEditorShapeStyleControls: 7,
              markupEditorToolSelectRadius: 8,
              willRenderShapePresetToolbar: 9,
              annotateTools: 10,
              annotateToolShapes: 11,
              annotateShapeControls: 12,
              annotateActiveTool: 13,
              annotateEnableButtonFlipVertical: 14,
              annotateEnableSelectImagePreset: 15,
              annotatePresets: 16,
              annotateWillRenderShapePresetToolbar: 17,
              willRenderShapeControls: 18,
              beforeAddShape: 19,
              beforeRemoveShape: 20,
              beforeDeselectShape: 21,
              beforeSelectShape: 22,
              beforeUpdateShape: 23,
            },
            [-1, -1]
          );
      }
      get name() {
        return this.$$.ctx[36];
      }
      get isActive() {
        return this.$$.ctx[0];
      }
      set isActive(t) {
        this.$set({ isActive: t }), Bi();
      }
      get isActiveFraction() {
        return this.$$.ctx[1];
      }
      set isActiveFraction(t) {
        this.$set({ isActiveFraction: t }), Bi();
      }
      get isVisible() {
        return this.$$.ctx[2];
      }
      set isVisible(t) {
        this.$set({ isVisible: t }), Bi();
      }
      get stores() {
        return this.$$.ctx[3];
      }
      set stores(t) {
        this.$set({ stores: t }), Bi();
      }
      get locale() {
        return this.$$.ctx[4];
      }
      set locale(t) {
        this.$set({ locale: t }), Bi();
      }
      get markupEditorToolbar() {
        return this.$$.ctx[5];
      }
      set markupEditorToolbar(t) {
        this.$set({ markupEditorToolbar: t }), Bi();
      }
      get markupEditorToolStyles() {
        return this.$$.ctx[6];
      }
      set markupEditorToolStyles(t) {
        this.$set({ markupEditorToolStyles: t }), Bi();
      }
      get markupEditorShapeStyleControls() {
        return this.$$.ctx[7];
      }
      set markupEditorShapeStyleControls(t) {
        this.$set({ markupEditorShapeStyleControls: t }), Bi();
      }
      get markupEditorToolSelectRadius() {
        return this.$$.ctx[8];
      }
      set markupEditorToolSelectRadius(t) {
        this.$set({ markupEditorToolSelectRadius: t }), Bi();
      }
      get willRenderShapePresetToolbar() {
        return this.$$.ctx[9];
      }
      set willRenderShapePresetToolbar(t) {
        this.$set({ willRenderShapePresetToolbar: t }), Bi();
      }
      get annotateTools() {
        return this.$$.ctx[10];
      }
      set annotateTools(t) {
        this.$set({ annotateTools: t }), Bi();
      }
      get annotateToolShapes() {
        return this.$$.ctx[11];
      }
      set annotateToolShapes(t) {
        this.$set({ annotateToolShapes: t }), Bi();
      }
      get annotateShapeControls() {
        return this.$$.ctx[12];
      }
      set annotateShapeControls(t) {
        this.$set({ annotateShapeControls: t }), Bi();
      }
      get annotateActiveTool() {
        return this.$$.ctx[13];
      }
      set annotateActiveTool(t) {
        this.$set({ annotateActiveTool: t }), Bi();
      }
      get annotateEnableButtonFlipVertical() {
        return this.$$.ctx[14];
      }
      set annotateEnableButtonFlipVertical(t) {
        this.$set({ annotateEnableButtonFlipVertical: t }), Bi();
      }
      get annotateEnableSelectImagePreset() {
        return this.$$.ctx[15];
      }
      set annotateEnableSelectImagePreset(t) {
        this.$set({ annotateEnableSelectImagePreset: t }), Bi();
      }
      get annotatePresets() {
        return this.$$.ctx[16];
      }
      set annotatePresets(t) {
        this.$set({ annotatePresets: t }), Bi();
      }
      get annotateWillRenderShapePresetToolbar() {
        return this.$$.ctx[17];
      }
      set annotateWillRenderShapePresetToolbar(t) {
        this.$set({ annotateWillRenderShapePresetToolbar: t }), Bi();
      }
      get willRenderShapeControls() {
        return this.$$.ctx[18];
      }
      set willRenderShapeControls(t) {
        this.$set({ willRenderShapeControls: t }), Bi();
      }
      get beforeAddShape() {
        return this.$$.ctx[19];
      }
      set beforeAddShape(t) {
        this.$set({ beforeAddShape: t }), Bi();
      }
      get beforeRemoveShape() {
        return this.$$.ctx[20];
      }
      set beforeRemoveShape(t) {
        this.$set({ beforeRemoveShape: t }), Bi();
      }
      get beforeDeselectShape() {
        return this.$$.ctx[21];
      }
      set beforeDeselectShape(t) {
        this.$set({ beforeDeselectShape: t }), Bi();
      }
      get beforeSelectShape() {
        return this.$$.ctx[22];
      }
      set beforeSelectShape(t) {
        this.$set({ beforeSelectShape: t }), Bi();
      }
      get beforeUpdateShape() {
        return this.$$.ctx[23];
      }
      set beforeUpdateShape(t) {
        this.$set({ beforeUpdateShape: t }), Bi();
      }
    },
  ],
};
function sm(t) {
  let e, n;
  return (
    (e = new em({
      props: {
        stores: t[3],
        locale: t[4],
        isActive: t[0],
        isActiveFraction: t[1],
        isVisible: t[2],
        mapScreenPointToImagePoint: t[32],
        mapImagePointToScreenPoint: t[33],
        utilKey: "sticker",
        shapePresets: t[5],
        shapes: t[6] ? t[25] : t[26],
        toolActive: "preset",
        imageFlipX: !!t[6] && t[18],
        imageFlipY: !!t[6] && t[19],
        imageRotation: t[6] ? t[20] : 0,
        parentRect: t[6] ? t[27] : t[23],
        enablePresetSelectImage: t[7],
        enableButtonFlipVertical: t[8],
        toolSelectRadius: t[11],
        willRenderPresetToolbar: t[9] || t[12],
        hooks: {
          willRenderShapeControls: t[10],
          beforeAddShape: t[13],
          beforeRemoveShape: t[14],
          beforeDeselectShape: t[15],
          beforeSelectShape: t[16],
          beforeUpdateShape: t[17],
        },
      },
    })),
    e.$on("measure", t[35]),
    {
      c() {
        tr(e.$$.fragment);
      },
      m(t, o) {
        er(e, t, o), (n = !0);
      },
      p(t, n) {
        const o = {};
        8 & n[0] && (o.stores = t[3]),
          16 & n[0] && (o.locale = t[4]),
          1 & n[0] && (o.isActive = t[0]),
          2 & n[0] && (o.isActiveFraction = t[1]),
          4 & n[0] && (o.isVisible = t[2]),
          32 & n[0] && (o.shapePresets = t[5]),
          64 & n[0] && (o.shapes = t[6] ? t[25] : t[26]),
          262208 & n[0] && (o.imageFlipX = !!t[6] && t[18]),
          524352 & n[0] && (o.imageFlipY = !!t[6] && t[19]),
          1048640 & n[0] && (o.imageRotation = t[6] ? t[20] : 0),
          64 & n[0] && (o.parentRect = t[6] ? t[27] : t[23]),
          128 & n[0] && (o.enablePresetSelectImage = t[7]),
          256 & n[0] && (o.enableButtonFlipVertical = t[8]),
          2048 & n[0] && (o.toolSelectRadius = t[11]),
          4608 & n[0] && (o.willRenderPresetToolbar = t[9] || t[12]),
          254976 & n[0] &&
            (o.hooks = {
              willRenderShapeControls: t[10],
              beforeAddShape: t[13],
              beforeRemoveShape: t[14],
              beforeDeselectShape: t[15],
              beforeSelectShape: t[16],
              beforeUpdateShape: t[17],
            }),
          e.$set(o);
      },
      i(t) {
        n || (Ni(e.$$.fragment, t), (n = !0));
      },
      o(t) {
        Hi(e.$$.fragment, t), (n = !1);
      },
      d(t) {
        nr(e, t);
      },
    }
  );
}
function lm(t, e, n) {
  let o, i, r, a, s, l, c, u;
  let { isActive: d } = e,
    { isActiveFraction: p } = e,
    { isVisible: h } = e,
    { stores: g } = e,
    { locale: m = {} } = e,
    { stickers: f = [] } = e,
    { stickerStickToImage: $ = !1 } = e,
    { stickerEnableSelectImage: y = !0 } = e,
    { stickersEnableButtonFlipVertical: x = !1 } = e,
    { stickersWillRenderShapePresetToolbar: b } = e,
    { willRenderShapeControls: v } = e,
    { markupEditorToolSelectRadius: w } = e,
    { willRenderShapePresetToolbar: S } = e,
    { beforeAddShape: k } = e,
    { beforeRemoveShape: C } = e,
    { beforeDeselectShape: M } = e,
    { beforeSelectShape: R } = e,
    { beforeUpdateShape: T } = e;
  const {
    presentationScalar: P,
    rootRect: E,
    imageCropRect: A,
    imageSelectionRectPresentation: I,
    imageAnnotation: L,
    imageDecoration: F,
    imageSize: B,
    imageTransforms: z,
    imageRotation: D,
    imageFlipX: O,
    imageFlipY: _,
  } = g;
  zo(t, P, (t) => n(40, (c = t))),
    zo(t, E, (t) => n(36, (o = t))),
    zo(t, I, (t) => n(39, (l = t))),
    zo(t, B, (t) => n(37, (i = t))),
    zo(t, z, (t) => n(38, (r = t))),
    zo(t, D, (t) => n(20, (u = t))),
    zo(t, O, (t) => n(18, (a = t))),
    zo(t, _, (t) => n(19, (s = t)));
  const W = $
      ? (t) => om(t, o, i, r.origin, r.translation, r.rotation.z, r.scale, a, s)
      : (t) => {
          const e = Y(t);
          return (e.x -= l.x), (e.y -= l.y), (e.x /= c), (e.y /= c), e;
        },
    V = $
      ? (t) => nm(t, o, i, r.origin, r.translation, r.rotation.z, r.scale, a, s)
      : (t) => {
          const e = Y(t);
          return (e.x *= c), (e.y *= c), (e.x += l.x), (e.y += l.y), e;
        };
  return (
    (t.$$set = (t) => {
      "isActive" in t && n(0, (d = t.isActive)),
        "isActiveFraction" in t && n(1, (p = t.isActiveFraction)),
        "isVisible" in t && n(2, (h = t.isVisible)),
        "stores" in t && n(3, (g = t.stores)),
        "locale" in t && n(4, (m = t.locale)),
        "stickers" in t && n(5, (f = t.stickers)),
        "stickerStickToImage" in t && n(6, ($ = t.stickerStickToImage)),
        "stickerEnableSelectImage" in t && n(7, (y = t.stickerEnableSelectImage)),
        "stickersEnableButtonFlipVertical" in t && n(8, (x = t.stickersEnableButtonFlipVertical)),
        "stickersWillRenderShapePresetToolbar" in t &&
          n(9, (b = t.stickersWillRenderShapePresetToolbar)),
        "willRenderShapeControls" in t && n(10, (v = t.willRenderShapeControls)),
        "markupEditorToolSelectRadius" in t && n(11, (w = t.markupEditorToolSelectRadius)),
        "willRenderShapePresetToolbar" in t && n(12, (S = t.willRenderShapePresetToolbar)),
        "beforeAddShape" in t && n(13, (k = t.beforeAddShape)),
        "beforeRemoveShape" in t && n(14, (C = t.beforeRemoveShape)),
        "beforeDeselectShape" in t && n(15, (M = t.beforeDeselectShape)),
        "beforeSelectShape" in t && n(16, (R = t.beforeSelectShape)),
        "beforeUpdateShape" in t && n(17, (T = t.beforeUpdateShape));
    }),
    [
      d,
      p,
      h,
      g,
      m,
      f,
      $,
      y,
      x,
      b,
      v,
      w,
      S,
      k,
      C,
      M,
      R,
      T,
      a,
      s,
      u,
      P,
      E,
      A,
      I,
      L,
      F,
      B,
      z,
      D,
      O,
      _,
      W,
      V,
      "sticker",
      function (e) {
        ki(t, e);
      },
    ]
  );
}
var cm = {
    util: [
      "sticker",
      class extends rr {
        constructor(t) {
          super(),
            ir(
              this,
              t,
              lm,
              sm,
              Lo,
              {
                name: 34,
                isActive: 0,
                isActiveFraction: 1,
                isVisible: 2,
                stores: 3,
                locale: 4,
                stickers: 5,
                stickerStickToImage: 6,
                stickerEnableSelectImage: 7,
                stickersEnableButtonFlipVertical: 8,
                stickersWillRenderShapePresetToolbar: 9,
                willRenderShapeControls: 10,
                markupEditorToolSelectRadius: 11,
                willRenderShapePresetToolbar: 12,
                beforeAddShape: 13,
                beforeRemoveShape: 14,
                beforeDeselectShape: 15,
                beforeSelectShape: 16,
                beforeUpdateShape: 17,
              },
              [-1, -1]
            );
        }
        get name() {
          return this.$$.ctx[34];
        }
        get isActive() {
          return this.$$.ctx[0];
        }
        set isActive(t) {
          this.$set({ isActive: t }), Bi();
        }
        get isActiveFraction() {
          return this.$$.ctx[1];
        }
        set isActiveFraction(t) {
          this.$set({ isActiveFraction: t }), Bi();
        }
        get isVisible() {
          return this.$$.ctx[2];
        }
        set isVisible(t) {
          this.$set({ isVisible: t }), Bi();
        }
        get stores() {
          return this.$$.ctx[3];
        }
        set stores(t) {
          this.$set({ stores: t }), Bi();
        }
        get locale() {
          return this.$$.ctx[4];
        }
        set locale(t) {
          this.$set({ locale: t }), Bi();
        }
        get stickers() {
          return this.$$.ctx[5];
        }
        set stickers(t) {
          this.$set({ stickers: t }), Bi();
        }
        get stickerStickToImage() {
          return this.$$.ctx[6];
        }
        set stickerStickToImage(t) {
          this.$set({ stickerStickToImage: t }), Bi();
        }
        get stickerEnableSelectImage() {
          return this.$$.ctx[7];
        }
        set stickerEnableSelectImage(t) {
          this.$set({ stickerEnableSelectImage: t }), Bi();
        }
        get stickersEnableButtonFlipVertical() {
          return this.$$.ctx[8];
        }
        set stickersEnableButtonFlipVertical(t) {
          this.$set({ stickersEnableButtonFlipVertical: t }), Bi();
        }
        get stickersWillRenderShapePresetToolbar() {
          return this.$$.ctx[9];
        }
        set stickersWillRenderShapePresetToolbar(t) {
          this.$set({ stickersWillRenderShapePresetToolbar: t }), Bi();
        }
        get willRenderShapeControls() {
          return this.$$.ctx[10];
        }
        set willRenderShapeControls(t) {
          this.$set({ willRenderShapeControls: t }), Bi();
        }
        get markupEditorToolSelectRadius() {
          return this.$$.ctx[11];
        }
        set markupEditorToolSelectRadius(t) {
          this.$set({ markupEditorToolSelectRadius: t }), Bi();
        }
        get willRenderShapePresetToolbar() {
          return this.$$.ctx[12];
        }
        set willRenderShapePresetToolbar(t) {
          this.$set({ willRenderShapePresetToolbar: t }), Bi();
        }
        get beforeAddShape() {
          return this.$$.ctx[13];
        }
        set beforeAddShape(t) {
          this.$set({ beforeAddShape: t }), Bi();
        }
        get beforeRemoveShape() {
          return this.$$.ctx[14];
        }
        set beforeRemoveShape(t) {
          this.$set({ beforeRemoveShape: t }), Bi();
        }
        get beforeDeselectShape() {
          return this.$$.ctx[15];
        }
        set beforeDeselectShape(t) {
          this.$set({ beforeDeselectShape: t }), Bi();
        }
        get beforeSelectShape() {
          return this.$$.ctx[16];
        }
        set beforeSelectShape(t) {
          this.$set({ beforeSelectShape: t }), Bi();
        }
        get beforeUpdateShape() {
          return this.$$.ctx[17];
        }
        set beforeUpdateShape(t) {
          this.$set({ beforeUpdateShape: t }), Bi();
        }
      },
    ],
  },
  um = (t, e, n, o = (t) => t * t * (3 - 2 * t)) => o(Math.max(0, Math.min(1, (n - t) / (e - t))));
function dm(t) {
  let e,
    n =
      (v(t[2].resizeIconButtonMaintainAspectRatio)
        ? t[2].resizeIconButtonMaintainAspectRatio
        : t[2].resizeIconButtonMaintainAspectRatio(t[3], t[12])) + "";
  return {
    c() {
      e = Jo("g");
    },
    m(t, o) {
      qo(t, e, o), (e.innerHTML = n);
    },
    p(t, o) {
      4108 & o[0] &&
        n !==
          (n =
            (v(t[2].resizeIconButtonMaintainAspectRatio)
              ? t[2].resizeIconButtonMaintainAspectRatio
              : t[2].resizeIconButtonMaintainAspectRatio(t[3], t[12])) + "") &&
        (e.innerHTML = n);
    },
    d(t) {
      t && Ko(e);
    },
  };
}
function pm(t) {
  let e;
  return {
    c() {
      e = ti("Save");
    },
    m(t, n) {
      qo(t, e, n);
    },
    d(t) {
      t && Ko(e);
    },
  };
}
function hm(t) {
  let e,
    n,
    o,
    i,
    r,
    a,
    s,
    l,
    c,
    u,
    d,
    p,
    h,
    g,
    m,
    f,
    $,
    y,
    x,
    b,
    v,
    w,
    S,
    k,
    C,
    M,
    R,
    T,
    P,
    E,
    A,
    I,
    L,
    F,
    B = t[2].resizeLabelFormCaption + "",
    z = t[2].resizeLabelInputWidth + "",
    D = t[2].resizeLabelInputHeight + "";
  return (
    (b = new Ys({ props: { $$slots: { default: [dm] }, $$scope: { ctx: t } } })),
    (A = new tl({
      props: { type: "submit", class: "implicit", $$slots: { default: [pm] }, $$scope: { ctx: t } },
    })),
    {
      c() {
        (e = Qo("form")),
          (n = Qo("div")),
          (o = Qo("fieldset")),
          (i = Qo("legend")),
          (r = ti(B)),
          (a = ei()),
          (s = Qo("div")),
          (l = Qo("div")),
          (c = Qo("label")),
          (u = ti(z)),
          (h = ei()),
          (g = Qo("input")),
          (m = ei()),
          (f = Qo("div")),
          ($ = Qo("input")),
          (y = ei()),
          (x = Qo("label")),
          tr(b.$$.fragment),
          (w = ei()),
          (S = Qo("div")),
          (k = Qo("label")),
          (C = ti(D)),
          (T = ei()),
          (P = Qo("input")),
          (E = ei()),
          tr(A.$$.fragment),
          ai(i, "class", "implicit"),
          ai(c, "for", "width-" + t[24]),
          ai(c, "title", (d = t[2].resizeTitleInputWidth)),
          ai(c, "aria-label", (p = t[2].resizeTitleInputWidth)),
          ai(g, "id", "width-" + t[24]),
          ai(g, "type", "text"),
          ai(g, "inputmode", "numeric"),
          ai(g, "pattern", "[0-9]*"),
          ai(g, "data-state", t[9]),
          ai(g, "autocomplete", "off"),
          ai(g, "placeholder", t[7]),
          ai(l, "class", "PinturaInputDimension"),
          ai($, "class", "implicit"),
          ai($, "id", "maintainAspectRatio-" + t[24]),
          ai($, "type", "checkbox"),
          ai(x, "for", "maintainAspectRatio-" + t[24]),
          ai(x, "title", (v = t[2].resizeTitleButtonMaintainAspectRatio)),
          ai(k, "for", "height-" + t[24]),
          ai(k, "title", (M = t[2].resizeTitleInputHeight)),
          ai(k, "aria-label", (R = t[2].resizeTitleInputHeight)),
          ai(P, "id", "height-" + t[24]),
          ai(P, "type", "text"),
          ai(P, "inputmode", "numeric"),
          ai(P, "pattern", "[0-9]*"),
          ai(P, "autocomplete", "off"),
          ai(P, "data-state", t[10]),
          ai(P, "placeholder", t[8]),
          ai(S, "class", "PinturaInputDimension"),
          ai(s, "class", "PinturaFieldsetInner"),
          ai(n, "class", "PinturaFormInner"),
          ai(e, "slot", "footer"),
          ai(e, "style", t[11]);
      },
      m(d, p) {
        qo(d, e, p),
          Zo(e, n),
          Zo(n, o),
          Zo(o, i),
          Zo(i, r),
          Zo(o, a),
          Zo(o, s),
          Zo(s, l),
          Zo(l, c),
          Zo(c, u),
          Zo(l, h),
          Zo(l, g),
          ci(g, t[4]),
          Zo(s, m),
          Zo(s, f),
          Zo(f, $),
          ($.checked = t[3]),
          Zo(f, y),
          Zo(f, x),
          er(b, x, null),
          Zo(s, w),
          Zo(s, S),
          Zo(S, k),
          Zo(k, C),
          Zo(S, T),
          Zo(S, P),
          ci(P, t[5]),
          t[63](s),
          Zo(n, E),
          er(A, n, null),
          (I = !0),
          L ||
            ((F = [
              oi(g, "input", t[60]),
              oi($, "change", t[61]),
              oi(P, "input", t[62]),
              oi(s, "focusin", t[25]),
              oi(s, "focusout", t[26]),
              oi(e, "submit", ii(t[27])),
            ]),
            (L = !0));
      },
      p(t, n) {
        (!I || 4 & n[0]) && B !== (B = t[2].resizeLabelFormCaption + "") && li(r, B),
          (!I || 4 & n[0]) && z !== (z = t[2].resizeLabelInputWidth + "") && li(u, z),
          (!I || (4 & n[0] && d !== (d = t[2].resizeTitleInputWidth))) && ai(c, "title", d),
          (!I || (4 & n[0] && p !== (p = t[2].resizeTitleInputWidth))) && ai(c, "aria-label", p),
          (!I || 512 & n[0]) && ai(g, "data-state", t[9]),
          (!I || 128 & n[0]) && ai(g, "placeholder", t[7]),
          16 & n[0] && g.value !== t[4] && ci(g, t[4]),
          8 & n[0] && ($.checked = t[3]);
        const o = {};
        (4108 & n[0]) | (4096 & n[2]) && (o.$$scope = { dirty: n, ctx: t }),
          b.$set(o),
          (!I || (4 & n[0] && v !== (v = t[2].resizeTitleButtonMaintainAspectRatio))) &&
            ai(x, "title", v),
          (!I || 4 & n[0]) && D !== (D = t[2].resizeLabelInputHeight + "") && li(C, D),
          (!I || (4 & n[0] && M !== (M = t[2].resizeTitleInputHeight))) && ai(k, "title", M),
          (!I || (4 & n[0] && R !== (R = t[2].resizeTitleInputHeight))) && ai(k, "aria-label", R),
          (!I || 1024 & n[0]) && ai(P, "data-state", t[10]),
          (!I || 256 & n[0]) && ai(P, "placeholder", t[8]),
          32 & n[0] && P.value !== t[5] && ci(P, t[5]);
        const i = {};
        4096 & n[2] && (i.$$scope = { dirty: n, ctx: t }),
          A.$set(i),
          (!I || 2048 & n[0]) && ai(e, "style", t[11]);
      },
      i(t) {
        I || (Ni(b.$$.fragment, t), Ni(A.$$.fragment, t), (I = !0));
      },
      o(t) {
        Hi(b.$$.fragment, t), Hi(A.$$.fragment, t), (I = !1);
      },
      d(n) {
        n && Ko(e), nr(b), t[63](null), nr(A), (L = !1), Ao(F);
      },
    }
  );
}
function gm(t) {
  let e, n;
  return (
    (e = new kp({ props: { $$slots: { footer: [hm] }, $$scope: { ctx: t } } })),
    e.$on("measure", t[64]),
    {
      c() {
        tr(e.$$.fragment);
      },
      m(t, o) {
        er(e, t, o), (n = !0);
      },
      p(t, n) {
        const o = {};
        (8188 & n[0]) | (4096 & n[2]) && (o.$$scope = { dirty: n, ctx: t }), e.$set(o);
      },
      i(t) {
        n || (Ni(e.$$.fragment, t), (n = !0));
      },
      o(t) {
        Hi(e.$$.fragment, t), (n = !1);
      },
      d(t) {
        nr(e, t);
      },
    }
  );
}
const mm = "resize-overlay";
function fm(t, e, n) {
  let o,
    i,
    r,
    a,
    s,
    l,
    c,
    u,
    d,
    p,
    h,
    g,
    m,
    f,
    $,
    y,
    x,
    b,
    w,
    S,
    k,
    M,
    R,
    T,
    P,
    E,
    A,
    I = Mo,
    L = () => (I(), (I = Fo(O, (t) => n(42, (x = t)))), O),
    F = Mo,
    B = () => (F(), (F = Fo(_, (t) => n(50, (k = t)))), _);
  t.$$.on_destroy.push(() => I()), t.$$.on_destroy.push(() => F());
  const D = (t, e = 0, n = 9999) => {
    if (v(t) && !(t = t.replace(/\D/g, "")).length) return;
    const o = Math.round(t);
    return Number.isNaN(o) ? void 0 : Tr(o, e, n);
  };
  let { isActive: O } = e;
  L();
  let { isActiveFraction: _ } = e;
  B();
  let { stores: W } = e,
    { locale: V = {} } = e,
    { resizeMinSize: U = gt(1, 1) } = e,
    { resizeMaxSize: N = gt(9999, 9999) } = e;
  const H = La(0, { stiffness: 0.15, damping: 0.3 });
  zo(t, H, (t) => n(12, (A = t)));
  const {
    animation: X,
    utilRect: j,
    rootRect: Y,
    rootBackgroundColor: G,
    imageSize: Z,
    imageCropRect: q,
    imageCropRectAspectRatio: K,
    imageCropAspectRatio: Q,
    imageOutputSize: J,
    imageOverlayMarkup: tt,
    history: et,
  } = W;
  zo(t, X, (t) => n(58, (P = t))),
    zo(t, j, (t) => n(47, (w = t))),
    zo(t, Y, (t) => n(49, (S = t))),
    zo(t, G, (t) => n(43, (b = t))),
    zo(t, Z, (t) => n(67, (y = t))),
    zo(t, q, (t) => n(40, (m = t))),
    zo(t, K, (t) => n(39, (g = t))),
    zo(t, Q, (t) => n(66, ($ = t))),
    zo(t, J, (t) => n(41, (f = t))),
    zo(t, tt, (t) => n(57, (T = t)));
  const nt = C();
  let ot,
    it,
    rt,
    at,
    st,
    lt,
    ct,
    ut,
    dt,
    pt = !1;
  const ht = (t) => {
      let e = D(it),
        o = D(rt),
        i = e,
        r = o,
        a = i && r,
        s = t || g;
      if (!i && !r) return;
      i && !r ? (r = Math.round(i / s)) : r && !i && (i = Math.round(r * s)),
        (s = t || a ? z(i, r) : g);
      let l = gt(i, r);
      xt(N, l) || (l = Yt(N, s)),
        xt(l, U) || (l = jt(U, s)),
        n(4, (it = null != e ? Math.round(l.width) : void 0)),
        n(5, (rt = null != o ? Math.round(l.height) : void 0));
    },
    mt = () => {
      ht();
      const { width: t, height: e } = f || {};
      (t === it && e === rt) ||
        (it || rt
          ? (it && rt && Vo(Q, ($ = it / rt), $), Vo(J, (f = gt(it, rt)), f))
          : (Vo(Q, ($ = y.width / y.height), $), Vo(Q, ($ = void 0), $), Vo(J, (f = void 0), f)),
        et.write());
    };
  J.subscribe((t) => {
    if (!t) return n(4, (it = void 0)), void n(5, (rt = void 0));
    n(4, (it = t.width)), n(5, (rt = t.height)), ht();
  }),
    Q.subscribe((t) => {
      (it || rt) && t && (it && rt && z(it, rt) !== t ? (n(5, (rt = it / t)), ht(t)) : ht());
    });
  const ft = (t, e, n) => {
      const o = document.createElement("canvas").getContext("2d");
      (o.canvas.width = Math.max(1, t)), (o.canvas.height = Math.max(1, e));
      const i = o.createLinearGradient(0, 0, t, e);
      return (
        [
          [0, 0],
          [0.013, 0.081],
          [0.049, 0.155],
          [0.104, 0.225],
          [0.175, 0.29],
          [0.259, 0.353],
          [0.352, 0.412],
          [0.45, 0.471],
          [0.55, 0.529],
          [0.648, 0.588],
          [0.741, 0.647],
          [0.825, 0.71],
          [0.896, 0.775],
          [0.951, 0.845],
          [0.987, 0.919],
          [1, 1],
        ].forEach(([t, e]) =>
          i.addColorStop(e, `rgba(${255 * n[0]}, ${255 * n[1]}, ${255 * n[2]}, ${t})`)
        ),
        (o.fillStyle = i),
        o.fillRect(0, 0, o.canvas.width, o.canvas.height),
        document.body.appendChild(o.canvas),
        o.canvas
      );
    },
    $t = La(0);
  zo(t, $t, (t) => n(54, (R = t)));
  const yt = La(0);
  let vt;
  zo(t, yt, (t) => n(51, (M = t)));
  const wt = La(P ? 20 : 0);
  return (
    zo(t, wt, (t) => n(59, (E = t))),
    (t.$$set = (t) => {
      "isActive" in t && L(n(0, (O = t.isActive))),
        "isActiveFraction" in t && B(n(1, (_ = t.isActiveFraction))),
        "stores" in t && n(32, (W = t.stores)),
        "locale" in t && n(2, (V = t.locale)),
        "resizeMinSize" in t && n(33, (U = t.resizeMinSize)),
        "resizeMaxSize" in t && n(34, (N = t.resizeMaxSize));
    }),
    (t.$$.update = () => {
      if (
        (8 & t.$$.dirty[0] && H.set(pt ? 1 : 0),
        64 & t.$$.dirty[1] && ut && (dt = ut),
        16 & t.$$.dirty[0] && n(35, (at = D(it))),
        32 & t.$$.dirty[0] && n(36, (st = D(rt))),
        92 & t.$$.dirty[1] &&
          n(
            9,
            (o =
              null != at && "width" !== ut
                ? at >= U.width && at <= N.width
                  ? "valid"
                  : "invalid"
                : "undetermined")
          ),
        108 & t.$$.dirty[1] &&
          n(
            10,
            (i =
              null != st && "height" !== ut
                ? st >= U.height && st <= N.height
                  ? "valid"
                  : "invalid"
                : "undetermined")
          ),
        800 & t.$$.dirty[1] && n(7, (lt = Math.round(null != st ? st * g : m.width))),
        784 & t.$$.dirty[1] && n(8, (ct = Math.round(null != at ? at / g : m.height))),
        56 & t.$$.dirty[0] &&
          pt &&
          it &&
          rt &&
          ("width" === ut
            ? n(5, (rt = Math.round(it / g)))
            : "height" === ut
            ? n(4, (it = Math.round(rt * g)))
            : ("width" === dt
                ? n(5, (rt = Math.round(it / g)))
                : "height" === dt && n(4, (it = Math.round(rt * g))),
              ht())),
        6272 & t.$$.dirty[1] && (!x || !b || (vt && Lr(vt, b)) || n(38, (vt = b))),
        128 & t.$$.dirty[1] && n(44, (r = vt && ft(16, 0, vt))),
        128 & t.$$.dirty[1] && n(45, (a = vt && ft(0, 16, vt))),
        1536 & t.$$.dirty[1] &&
          n(
            46,
            (s = ((t, e) => {
              let { width: n, height: o } = t;
              const i = Wt(e);
              return n && o
                ? t
                : (n && !o && (o = n / i),
                  o && !n && (n = o * i),
                  n || o || ((n = e.width), (o = e.height)),
                  bt(gt(n, o), Math.round));
            })(f || {}, m))
          ),
        98304 & t.$$.dirty[1] && w && $t.set(um(w.width, w.width + 40, s.width)),
        98304 & t.$$.dirty[1] && w && yt.set(um(w.height, w.height + 40, s.height)),
        1851392 & t.$$.dirty[1] &&
          n(
            48,
            (l = {
              id: mm,
              x: 0,
              y: -0,
              width: S.width,
              height: 180,
              rotation: Math.PI,
              opacity: 0.85 * k * M,
              backgroundImage: a,
            })
          ),
        1851392 & t.$$.dirty[1] &&
          n(
            52,
            (c = {
              id: mm,
              x: 0,
              y: S.height - 180 + 0,
              width: S.width,
              height: 180,
              opacity: 0.85 * k * M,
              backgroundImage: a,
            })
          ),
        9183232 & t.$$.dirty[1] &&
          n(
            53,
            (u = {
              id: mm,
              x: -0,
              y: 0,
              height: S.height,
              width: 180,
              rotation: Math.PI,
              opacity: 0.85 * k * R,
              backgroundImage: r,
            })
          ),
        9183232 & t.$$.dirty[1] &&
          n(
            55,
            (d = {
              id: mm,
              x: S.width - 180 + 0,
              y: 0,
              height: S.height,
              width: 180,
              opacity: 0.85 * k * R,
              backgroundImage: r,
            })
          ),
        23199744 & t.$$.dirty[1] && n(56, (p = [l, d, c, u])),
        101318656 & t.$$.dirty[1] && l)
      ) {
        const t = T.filter((t) => t.id !== mm);
        Vo(tt, (T = k > 0 ? [...t, ...p] : t), T);
      }
      134219776 & t.$$.dirty[1] && P && wt.set(x ? 0 : 20),
        268435456 & t.$$.dirty[1] && n(11, (h = E ? `transform: translateY(${E}px)` : void 0));
    }),
    [
      O,
      _,
      V,
      pt,
      it,
      rt,
      ot,
      lt,
      ct,
      o,
      i,
      h,
      A,
      H,
      X,
      j,
      Y,
      G,
      Z,
      q,
      K,
      Q,
      J,
      tt,
      nt,
      (t) => {
        const e = t.target.id;
        /width/.test(e)
          ? n(37, (ut = "width"))
          : /height/.test(e)
          ? n(37, (ut = "height"))
          : /aspectRatio/i.test(e)
          ? n(37, (ut = "lock"))
          : n(37, (ut = void 0));
      },
      (t) => {
        ot.contains(t.relatedTarget) || mt(), n(37, (ut = void 0));
      },
      mt,
      $t,
      yt,
      wt,
      "resize",
      W,
      U,
      N,
      at,
      st,
      ut,
      vt,
      g,
      m,
      f,
      x,
      b,
      r,
      a,
      s,
      w,
      l,
      S,
      k,
      M,
      c,
      u,
      R,
      d,
      p,
      T,
      P,
      E,
      function () {
        (it = this.value), n(4, it);
      },
      function () {
        (pt = this.checked), n(3, pt);
      },
      function () {
        (rt = this.value), n(5, rt);
      },
      function (t) {
        Mi[t ? "unshift" : "push"](() => {
          (ot = t), n(6, ot);
        });
      },
      function (e) {
        ki(t, e);
      },
    ]
  );
}
var $m = {
  util: [
    "resize",
    class extends rr {
      constructor(t) {
        super(),
          ir(
            this,
            t,
            fm,
            gm,
            Lo,
            {
              name: 31,
              isActive: 0,
              isActiveFraction: 1,
              stores: 32,
              locale: 2,
              resizeMinSize: 33,
              resizeMaxSize: 34,
            },
            [-1, -1, -1]
          );
      }
      get name() {
        return this.$$.ctx[31];
      }
      get isActive() {
        return this.$$.ctx[0];
      }
      set isActive(t) {
        this.$set({ isActive: t }), Bi();
      }
      get isActiveFraction() {
        return this.$$.ctx[1];
      }
      set isActiveFraction(t) {
        this.$set({ isActiveFraction: t }), Bi();
      }
      get stores() {
        return this.$$.ctx[32];
      }
      set stores(t) {
        this.$set({ stores: t }), Bi();
      }
      get locale() {
        return this.$$.ctx[2];
      }
      set locale(t) {
        this.$set({ locale: t }), Bi();
      }
      get resizeMinSize() {
        return this.$$.ctx[33];
      }
      set resizeMinSize(t) {
        this.$set({ resizeMinSize: t }), Bi();
      }
      get resizeMaxSize() {
        return this.$$.ctx[34];
      }
      set resizeMaxSize(t) {
        this.$set({ resizeMaxSize: t }), Bi();
      }
    },
  ],
};
const ym =
  '<g fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor" stroke-width=".125em"><path d="M18 6L6 18M6 6l12 12"></path></path></g>';
var xm = {
  labelReset: "Reset",
  labelDefault: "Default",
  labelAuto: "Auto",
  labelNone: "None",
  labelEdit: "Edit",
  labelClose: "Close",
  labelSupportError: (t) => t.join(", ") + " not supported on this browser",
  labelSizeExtraSmall: "Extra small",
  labelSizeSmall: "Small",
  labelSizeMediumSmall: "Medium small",
  labelSizeMedium: "Medium",
  labelSizeMediumLarge: "Medium large",
  labelSizeLarge: "Large",
  labelSizeExtraLarge: "Extra large",
  labelButtonRevert: "Revert",
  labelButtonCancel: "Cancel",
  labelButtonUndo: "Undo",
  labelButtonRedo: "Redo",
  labelButtonExport: "Done",
  iconSupportError:
    '<g fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><g><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></g>',
  iconButtonClose: ym,
  iconButtonRevert:
    '<g fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor" stroke-width=".125em"><path d="M7.388 18.538a8 8 0 10-2.992-9.03"/><path fill="currentColor" d="M2.794 11.696L2.37 6.714l5.088 3.18z"/><path d="M12 8v4M12 12l4 2"/></g>',
  iconButtonUndo:
    '<g fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor" stroke-width=".125em"><path d="M10 8h4c2.485 0 5 2 5 5s-2.515 5-5 5h-4"/><path fill="currentColor" d="M5 8l4-3v6z"/></g>',
  iconButtonRedo:
    '<g fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor" stroke-width=".125em"><path d="M14 8h-4c-2.485 0-5 2-5 5s2.515 5 5 5h4"/><path fill="currentColor" d="M19 8l-4-3v6z"/></g>',
  iconButtonExport:
    '<polyline points="20 6 9 17 4 12" fill="none" stroke="currentColor" stroke-width=".125em"></polyline>',
  statusLabelButtonClose: "Close",
  statusIconButtonClose: ym,
  statusLabelLoadImage: (t) =>
    t && t.task
      ? t.error
        ? "IMAGE_TOO_SMALL" === t.error.code
          ? "Minimum image size is {minWidth} × {minHeight}"
          : "Error loading image"
        : "blob-to-bitmap" === t.task
        ? "Creating preview…"
        : "Loading image…"
      : "Waiting for image",
  statusLabelProcessImage: (t) => {
    if (t && t.task)
      return "store" === t.task
        ? t.error
          ? "Error uploading image"
          : "Uploading image…"
        : t.error
        ? "Error processing image"
        : "Processing image…";
  },
};
const bm = {
  shapeLabelButtonSelectSticker: "Select image",
  shapeIconButtonSelectSticker:
    '<g fill="none" stroke="currentColor" stroke-width="0.0625em"><path d="M8 21 L15 11 L19 15"/><path d="M15 2 v5 h5"/><path d="M8 2 h8 l4 4 v12 q0 4 -4 4 h-8 q-4 0 -4 -4 v-12 q0 -4 4 -4z"/></g><circle fill="currentColor" cx="10" cy="8" r="1.5"/>',
  shapeIconButtonFlipHorizontal:
    '<g stroke="currentColor" stroke-width=".125em"><path d="M6 6.5h5v11H6z"/><path fill="#FFF" d="M15 6.5h3v11h-3z"/><path d="M11 4v16" fill="#fff"/></g>',
  shapeIconButtonFlipVertical:
    '<g stroke="currentColor" stroke-width=".125em">\n        <rect x="7" y="8" width="11" height="5" fill="none"/>\n        <rect x="7" y="17" width="11" height="2" fill="currentColor"/>\n        <line x1="5" y1="13" x2="20" y2="13"/></g>',
  shapeIconButtonRemove:
    '<g fill="none" fill-rule="evenodd"><path stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M7.5 7h9z"/><path d="M7.916 9h8.168a1 1 0 01.99 1.14l-.972 6.862a2 2 0 01-1.473 1.653c-.877.23-1.753.345-2.629.345-.876 0-1.752-.115-2.628-.345a2 2 0 01-1.473-1.653l-.973-6.862A1 1 0 017.916 9z" fill="#FFF"/><rect fill="#FFF" x="10" y="5" width="4" height="3" rx="1"/></g>',
  shapeIconButtonDuplicate:
    '<g fill="none" fill-rule="evenodd"><path d="M15 13.994V16a2 2 0 01-2 2H8a2 2 0 01-2-2v-5a2 2 0 012-2h2.142" stroke="currentColor" stroke-width=".125em"/><path d="M15 9V8a1 1 0 00-2 0v1h-1a1 1 0 000 2h1v1a1 1 0 002 0v-1h1a1 1 0 000-2h-1zm-4-4h6a2 2 0 012 2v6a2 2 0 01-2 2h-6a2 2 0 01-2-2V7a2 2 0 012-2z" fill="currentColor"/></g>',
  shapeIconButtonMoveToFront:
    '<g fill="none" fill-rule="evenodd"><rect fill="currentColor" x="11" y="13" width="8" height="2" rx="1"/><rect fill="currentColor" x="9" y="17" width="10" height="2" rx="1"/><path d="M11.364 8H10a5 5 0 000 10M12 6.5L14.5 8 12 9.5z" stroke="currentColor" stroke-width=".125em" stroke-linecap="round"/></g>',
  shapeTitleButtonFlipHorizontal: "Flip Horizontal",
  shapeTitleButtonFlipVertical: "Flip Vertical",
  shapeTitleButtonRemove: "Remove",
  shapeTitleButtonDuplicate: "Duplicate",
  shapeTitleButtonMoveToFront: "Move to front",
  shapeLabelInputText: "Edit text",
  shapeIconInputCancel:
    '<g fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor" stroke-width=".125em"><path d="M18 6L6 18M6 6l12 12"/></g>',
  shapeIconInputConfirm:
    '<g fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor" stroke-width=".125em"><polyline points="20 6 9 17 4 12"/></g>',
  shapeLabelInputCancel: "Cancel",
  shapeLabelInputConfirm: "Confirm",
  shapeLabelStrokeNone: "No outline",
  shapeLabelFontStyleNormal: "Normal",
  shapeLabelFontStyleBold: "Bold",
  shapeLabelFontStyleItalic: "Italic",
  shapeLabelFontStyleItalicBold: "Italic Bold",
  shapeTitleBackgroundColor: "Fill color",
  shapeTitleFontFamily: "Font",
  shapeTitleFontSize: "Font size",
  shapeTitleFontStyle: "Font style",
  shapeTitleLineHeight: "Leading",
  shapeTitleLineStart: "Start",
  shapeTitleLineEnd: "End",
  shapeTitleStrokeWidth: "Line width",
  shapeTitleStrokeColor: "Line color",
  shapeTitleLineDecorationBar: "Bar",
  shapeTitleLineDecorationCircle: "Circle",
  shapeTitleLineDecorationSquare: "Square",
  shapeTitleLineDecorationArrow: "Arrow",
  shapeTitleLineDecorationCircleSolid: "Circle solid",
  shapeTitleLineDecorationSquareSolid: "Square solid",
  shapeTitleLineDecorationArrowSolid: "Arrow solid",
  shapeIconLineDecorationBar:
    '<g stroke="currentColor" stroke-linecap="round" stroke-width=".125em"><path d="M5,12 H16"/><path d="M16,8 V16"/></g>',
  shapeIconLineDecorationCircle:
    '<g stroke="currentColor" stroke-linecap="round"><path stroke-width=".125em" d="M5,12 H12"/><circle fill="none" stroke-width=".125em" cx="16" cy="12" r="4"/></g>',
  shapeIconLineDecorationSquare:
    '<g stroke="currentColor" stroke-linecap="round" stroke-width=".125em"><path d="M5,12 H16"/><path d="M13,7 l6,5 l-6,5z" fill="currentColor"/></g>',
  shapeIconLineDecorationArrow:
    '<g stroke="currentColor" stroke-linecap="round" stroke-width=".125em"><path d="M5,12 H16 M13,7 l6,5 l-6,5" fill="none"/></g>',
  shapeIconLineDecorationCircleSolid:
    '<g stroke="currentColor" stroke-linecap="round"><path stroke-width=".125em" d="M5,12 H12"/><circle fill="currentColor" cx="16" cy="12" r="4"/></g>',
  shapeIconLineDecorationSquareSolid:
    '<g stroke="currentColor" stroke-linecap="round"><path stroke-width=".125em" d="M5,12 H12"/><rect fill="currentColor" x="12" y="8" width="8" height="8"/></g>',
  shapeIconLineDecorationArrowSolid:
    '<g stroke="currentColor" stroke-linecap="round" stroke-width=".125em"><path d="M5,12 H16"/><path d="M13,7 l6,5 l-6,5z" fill="currentColor"/></g>',
  shapeTitleColorTransparent: "Transparent",
  shapeTitleColorWhite: "White",
  shapeTitleColorSilver: "Silver",
  shapeTitleColorGray: "Gray",
  shapeTitleColorBlack: "Black",
  shapeTitleColorNavy: "Navy",
  shapeTitleColorBlue: "Blue",
  shapeTitleColorAqua: "Aqua",
  shapeTitleColorTeal: "Teal",
  shapeTitleColorOlive: "Olive",
  shapeTitleColorGreen: "Green",
  shapeTitleColorYellow: "Yellow",
  shapeTitleColorOrange: "Orange",
  shapeTitleColorRed: "Red",
  shapeTitleColorMaroon: "Maroon",
  shapeTitleColorFuchsia: "Fuchsia",
  shapeTitleColorPurple: "Purple",
  shapeTitleTextColor: "Font color",
  shapeTitleTextAlign: "Text align",
  shapeTitleTextAlignLeft: "Left align text",
  shapeTitleTextAlignCenter: "Center align text",
  shapeTitleTextAlignRight: "Right align text",
  shapeIconTextAlignLeft:
    '<g stroke-width=".125em" stroke="currentColor"><line x1="5" y1="8" x2="15" y2="8"/><line x1="5" y1="12" x2="19" y2="12"/><line x1="5" y1="16" x2="14" y2="16"/></g>',
  shapeIconTextAlignCenter:
    '<g stroke-width=".125em" stroke="currentColor"><line x1="7" y1="8" x2="17" y2="8"/><line x1="5" y1="12" x2="19" y2="12"/><line x1="8" y1="16" x2="16" y2="16"/></g>',
  shapeIconTextAlignRight:
    '<g stroke-width=".125em" stroke="currentColor"><line x1="9" y1="8" x2="19" y2="8"/><line x1="5" y1="12" x2="19" y2="12"/><line x1="11" y1="16" x2="19" y2="16"/></g>',
  shapeLabelToolSharpie: "Sharpie",
  shapeLabelToolEraser: "Eraser",
  shapeLabelToolRectangle: "Rectangle",
  shapeLabelToolEllipse: "Ellipse",
  shapeLabelToolArrow: "Arrow",
  shapeLabelToolLine: "Line",
  shapeLabelToolText: "Text",
  shapeLabelToolPreset: "Stickers",
  shapeIconToolSharpie:
    '<g stroke-width=".125em" stroke="currentColor" fill="none"><path d="M2.025 5c5.616-2.732 8.833-3.857 9.65-3.374C12.903 2.351.518 12.666 2.026 14 3.534 15.334 16.536.566 17.73 2.566 18.924 4.566 3.98 17.187 4.831 18c.851.813 9.848-6 11.643-6 1.087 0-2.53 5.11-2.92 7-.086.41 3.323-1.498 4.773-1 .494.17.64 2.317 1.319 3 .439.443 1.332.776 2.679 1" stroke="currentColor" stroke-width=".125em" fill="none" fill-rule="evenodd" stroke-linejoin="round"/></g>',
  shapeIconToolEraser:
    '<g stroke-width=".125em" stroke="currentColor" stroke-linecap="round" fill="none"><g transform="translate(3, 15) rotate(-45)"><rect x="0" y="0" width="18" height="10" rx="3"/></g><line x1="11" y1="21" x2="18" y2="21"/><line x1="20" y1="21" x2="22" y2="21"/></g>',
  shapeIconToolRectangle:
    '<g stroke-width=".125em" stroke="currentColor" fill="none"><rect x="2" y="2" width="20" height="20" rx="3"/></g>',
  shapeIconToolEllipse:
    '<g stroke-width=".125em" stroke="currentColor" fill="none"><circle cx="12" cy="12" r="11"/></g>',
  shapeIconToolArrow:
    '<g stroke-width=".125em" stroke="currentColor" fill="none"><line x1="20" y1="3" x2="6" y2="21"/><path d="m10 5 L22 1 L21 13" fill="currentColor" stroke="none"/></g>',
  shapeIconToolLine:
    '<g stroke-width=".125em" stroke="currentColor" fill="none"><line x1="20" y1="3" x2="6" y2="21"/></g>',
  shapeIconToolText:
    '<g stroke="none" fill="currentColor" transform="translate(6,0)"><path d="M8.14 20.085c.459 0 .901-.034 1.329-.102a8.597 8.597 0 001.015-.21v1.984c-.281.135-.695.247-1.242.336a9.328 9.328 0 01-1.477.133c-3.312 0-4.968-1.745-4.968-5.235V6.804H.344v-1.25l2.453-1.078L3.89.819h1.5v3.97h4.97v2.015H5.39v10.078c0 1.031.245 1.823.735 2.375s1.161.828 2.015.828z"/>',
  shapeIconToolPreset:
    '<g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor" stroke-width=".125em"><path d="M12 22c2.773 0 1.189-5.177 3-7 1.796-1.808 7-.25 7-3 0-5.523-4.477-10-10-10S2 6.477 2 12s4.477 10 10 10z"></path><path d="M20 17c-3 3-5 5-8 5"></path></g>',
};
var vm = {
    cropLabel: "Crop",
    cropIcon:
      '<g stroke-width=".125em" stroke="currentColor" fill="none"><path d="M23 17H9a2 2 0 0 1-2-2v-5m0-3V1 M1 7h14a2 2 0 0 1 2 2v7m0 4v3"/></g>',
    cropIconButtonRecenter:
      '<path stroke="currentColor" fill="none" stroke-width="2" stroke-linejoin="bevel" d="M1.5 7.5v-6h6M1.5 16.5v6h6M22.5 16.5v6h-6M22.5 7.5v-6h-6"/><circle cx="12" cy="12" r="3.5" fill="currentColor" stroke="none"/>',
    cropIconButtonRotateLeft:
      '<g stroke="none" fill="currentColor"><path fill="none" d="M-1-1h582v402H-1z"/><rect x="3" rx="1" height="12" width="12" y="9"/><path d="M15 5h-1a5 5 0 015 5 1 1 0 002 0 7 7 0 00-7-7h-1.374l.747-.747A1 1 0 0011.958.84L9.603 3.194a1 1 0 000 1.415l2.355 2.355a1 1 0 001.415-1.414l-.55-.55H15z"/></g>',
    cropIconButtonRotateRight:
      '<g stroke="none" fill="currentColor"><path fill="none" d="M-1-1h582v402H-1z"/><path d="M11.177 5H10a5 5 0 00-5 5 1 1 0 01-2 0 7 7 0 017-7h1.374l-.747-.747A1 1 0 0112.042.84l2.355 2.355a1 1 0 010 1.415l-2.355 2.354a1 1 0 01-1.415-1.414l.55-.55z"/><rect rx="1" height="12" width="12" y="9" x="9"/></g>',
    cropIconButtonFlipVertical:
      '<g stroke="none" fill="currentColor"><path d="M19.993 12.143H7a1 1 0 0 1-1-1V5.994a1 1 0 0 1 1.368-.93l12.993 5.15a1 1 0 0 1-.368 1.93z"/><path d="M19.993 14a1 1 0 0 1 .368 1.93L7.368 21.078A1 1 0 0 1 6 20.148V15a1 1 0 0 1 1-1h12.993z" opacity=".6"/></g>',
    cropIconButtonFlipHorizontal:
      '<g stroke="none" fill="currentColor"><path d="M11.93 7.007V20a1 1 0 0 1-1 1H5.78a1 1 0 0 1-.93-1.368l5.15-12.993a1 1 0 0 1 1.929.368z"/><path d="M14 7.007V20a1 1 0 0 0 1 1h5.149a1 1 0 0 0 .93-1.368l-5.15-12.993A1 1 0 0 0 14 7.007z" opacity=".6"/></g>',
    cropIconSelectPreset: (t, e) => {
      const [n, o, i] = e
        ? [e < 1 ? 1 : 0.3, 1 === e ? 0.85 : 0.5, e > 1 ? 1 : 0.3]
        : [0.2, 0.3, 0.4];
      return `<g fill="currentColor">\n            <rect opacity="${n}" x="2" y="4" width="10" height="18" rx="1"/>\n            <rect opacity="${o}" x="4" y="8" width="14" height="14" rx="1"/>\n            <rect opacity="${i}" x="6" y="12" width="17" height="10" rx="1"/>\n        </g>`;
    },
    cropIconCropBoundary: (t, e) => {
      const [n, o, i, r] = e ? [0.3, 1, 0, 0] : [0, 0, 0.3, 1];
      return `<g fill="currentColor">\n            <rect opacity="${n}" x="2" y="3" width="20" height="20" rx="1"/>\n            <rect opacity="${o}" x="7" y="8" width="10" height="10" rx="1"/>\n            <rect opacity="${i}" x="4" y="8" width="14" height="14" rx="1"/>\n            <rect opacity="${r}" x="12" y="4" width="10" height="10" rx="1"/>\n        </g>`;
    },
    cropLabelButtonRecenter: "Recenter",
    cropLabelButtonRotateLeft: "Rotate left",
    cropLabelButtonRotateRight: "Rotate right",
    cropLabelButtonFlipHorizontal: "Flip horizontal",
    cropLabelButtonFlipVertical: "Flip vertical",
    cropLabelSelectPreset: "Crop shape",
    cropLabelCropBoundary: "Crop boundary",
    cropLabelCropBoundaryEdge: "Edge of image",
    cropLabelCropBoundaryNone: "None",
    cropLabelTabRotation: "Rotation",
    cropLabelTabZoom: "Zoom",
  },
  wm = (t, e) => {
    const n = Object.getOwnPropertyDescriptors(t);
    Object.keys(n).forEach((o) => {
      n[o].get
        ? Object.defineProperty(e, o, { get: () => t[o], set: (e) => (t[o] = e) })
        : (e[o] = t[o]);
    });
  },
  Sm = [
    ...Zr,
    "undo",
    "redo",
    "revert",
    "destroy",
    "show",
    "hide",
    "close",
    "selectshape",
    "updateshape",
    "addshape",
    "removeshape",
  ],
  km = (t) => {
    const e = {},
      { sub: o, pub: i } = yr();
    (l() && null !== document.doctype) ||
      console.warn("Browser is in quirks mode, add <!DOCTYPE html> to page to fix render issues");
    const r = ta();
    wm(r, e);
    const a = ((t, e) => {
      const n = {},
        o = new au({ target: t, props: { stores: e, pluginComponents: Array.from(pu) } });
      let i = !1;
      const r = () => {
        i || (l() && window.removeEventListener("pagehide", r), o && ((i = !0), o.$destroy()));
      };
      cu || (cu = new Set(Ra(au).filter((t) => !lu.includes(t)))),
        cu.forEach((t) => {
          Object.defineProperty(n, t, { get: () => o[t], set: (e) => (o[t] = e) });
        }),
        uu.forEach((t) => {
          const e = du[t],
            i = e[0];
          Object.defineProperty(n, t, {
            get: () => o.pluginInterface[i][t],
            set: (n) => {
              const i = e.reduce((e, i) => ((e[i] = { ...o.pluginOptions[i], [t]: n }), e), {});
              o.pluginOptions = { ...o.pluginOptions, ...i };
            },
          });
        }),
        Object.defineProperty(n, "element", { get: () => o.root, set: () => {} });
      const a = o.history;
      return (
        br(n, {
          on: (t, e) => {
            if (i) return () => {};
            if (/undo|redo|revert/.test(t)) return a.on(t, e);
            const n = [
              o.sub(t, e),
              o.$on(t, (t) => e(t instanceof CustomEvent && !t.detail ? void 0 : t)),
            ].filter(Boolean);
            return () => n.forEach((t) => t());
          },
          close: () => !i && o.pub("close"),
          destroy: r,
          undo: () => a.undo(),
          redo: () => a.redo(),
          revert: () => a.revert(),
        }),
        Object.defineProperty(n, "history", {
          get: () => ({
            undo: () => a.undo(),
            redo: () => a.redo(),
            revert: () => a.revert(),
            get: () => a.get(),
            set: (t) => a.set(t),
            write: (t) => a.write(t),
            get length() {
              return a.length();
            },
            get index() {
              return a.index;
            },
          }),
        }),
        l() && window.addEventListener("pagehide", r),
        n
      );
    })(t, r.stores);
    wm(a, e);
    const s = ["loadImage", "processImage", "abortProcessImage", "abortLoadImage"].map((t) =>
        a.on(t, (e) => r[t](e && e.detail))
      ),
      c = (t, e) => {
        const n = o(t, e),
          i = r.on(t, e),
          s = a.on(t, e);
        return () => {
          n(), i(), s();
        };
      };
    e.handleEvent = n;
    const u = Sm.map((t) => c(t, (n) => e.handleEvent(t, n)));
    return (
      br(e, {
        on: c,
        close: () => {
          i("close");
        },
        destroy: () => {
          [...s, ...u].forEach((t) => t()), a.destroy(), r.destroy(), i("destroy");
        },
      }),
      e
    );
  };
var Cm = (t, e = {}) => {
  const n = v(t) ? document.querySelector(t) : t;
  if (!re(n)) return;
  e.class = e.class ? "pintura-editor " + e.class : "pintura-editor";
  const o = km(n);
  return Object.assign(o, e);
};
const { document: Mm } = Yi;
function Rm(t) {
  let e, n, o, i;
  return (
    Ai(t[20]),
    {
      c() {
        (e = ei()), (n = Qo("div")), ai(n, "class", t[5]), ai(n, "style", t[4]);
      },
      m(r, a) {
        qo(r, e, a),
          qo(r, n, a),
          t[21](n),
          o ||
            ((i = [
              oi(window, "keydown", t[10]),
              oi(window, "orientationchange", t[11]),
              oi(window, "resize", t[20]),
              oi(Mm.body, "focusin", function () {
                Io(!t[3] && t[7]) && (!t[3] && t[7]).apply(this, arguments);
              }),
              oi(Mm.body, "focusout", function () {
                Io(t[1] && t[8]) && (t[1] && t[8]).apply(this, arguments);
              }),
              oi(n, "wheel", t[9], { passive: !1 }),
            ]),
            (o = !0));
      },
      p(e, o) {
        (t = e), 32 & o[0] && ai(n, "class", t[5]), 16 & o[0] && ai(n, "style", t[4]);
      },
      i: Mo,
      o: Mo,
      d(r) {
        r && Ko(e), r && Ko(n), t[21](null), (o = !1), Ao(i);
      },
    }
  );
}
function Tm(t, e, n) {
  let o, i, r, a, s;
  const l = vi();
  let { root: c } = e,
    { preventZoomViewport: u = !0 } = e,
    { class: d } = e,
    h = !0,
    g = !1,
    m = !1;
  const f = La(0, { precision: 0.001, damping: 0.5 });
  zo(t, f, (t) => n(18, (s = t)));
  const $ = f.subscribe((t) => {
    m && t >= 1
      ? ((m = !1), n(3, (h = !1)), l("show"))
      : g && t <= 0 && ((g = !1), n(3, (h = !0)), l("hide"));
  });
  bi(() => $());
  let y = !1,
    x = void 0,
    b = void 0;
  const v = () => document.querySelector("meta[name=viewport]");
  let w;
  const S = (t, e) => {
    const n = () => {
      t() ? e() : requestAnimationFrame(n);
    };
    requestAnimationFrame(n);
  };
  let k,
    C,
    M = 0,
    R = void 0;
  const T = () => {
    C ||
      ((C = p("div", { style: "position:fixed;height:100vh;top:0" })),
      document.body.appendChild(C));
  };
  return (
    yi(() => {
      Se() && T();
    }),
    xi(() => {
      C && (n(17, (R = C.offsetHeight)), C.parentNode.removeChild(C), (C = void 0));
    }),
    (t.$$set = (t) => {
      "root" in t && n(0, (c = t.root)),
        "preventZoomViewport" in t && n(12, (u = t.preventZoomViewport)),
        "class" in t && n(13, (d = t.class));
    }),
    (t.$$.update = () => {
      4096 & t.$$.dirty[0] &&
        (o =
          "width=device-width,height=device-height,initial-scale=1" +
          (u ? ",maximum-scale=1,user-scalable=0" : "")),
        6 & t.$$.dirty[0] && (y || n(16, (k = M))),
        131076 & t.$$.dirty[0] &&
          n(19, (i = Se() ? "--viewport-pad-footer:" + (R > M ? 0 : 1) : "")),
        851968 & t.$$.dirty[0] && n(4, (r = `height:${k}px;opacity:${s};--editor-modal:1;${i}`)),
        8192 & t.$$.dirty[0] && n(5, (a = vs(["pintura-editor", "PinturaModal", d])));
    }),
    [
      c,
      y,
      M,
      h,
      r,
      a,
      f,
      (t) => {
        /textarea/i.test(t.target) && (n(1, (y = !0)), (w = M));
      },
      (t) => {
        if (/textarea/i.test(t.target))
          if ((clearTimeout(undefined), w === M)) n(1, (y = !1));
          else {
            const t = M;
            S(
              () => M !== t,
              () => n(1, (y = !1))
            );
          }
      },
      (t) => t.preventDefault(),
      (t) => {
        const { key: e } = t;
        if (!/escape/i.test(e)) return;
        const n = t.target;
        if (n && /input|textarea/i.test(n.nodeName)) return;
        const o = document.querySelectorAll(".PinturaModal");
        o[o.length - 1] === c && l("close");
      },
      T,
      u,
      d,
      () => {
        if (m || !h) return;
        m = !0;
        const t = v() || p("meta", { name: "viewport" });
        (x = !x && t.getAttribute("content")),
          t.setAttribute("content", o + (/cover/.test(x) ? ",viewport-fit=cover" : "")),
          t.parentNode || document.head.appendChild(t),
          clearTimeout(b),
          (b = setTimeout(() => Vo(f, (s = 1), s), 250));
      },
      () => {
        if (g || h) return;
        clearTimeout(b), (g = !0);
        const t = v();
        x ? t.setAttribute("content", x) : document.head.removeChild(t), Vo(f, (s = 0), s);
      },
      k,
      R,
      s,
      i,
      function () {
        n(2, (M = window.innerHeight));
      },
      function (t) {
        Mi[t ? "unshift" : "push"](() => {
          (c = t), n(0, c);
        });
      },
    ]
  );
}
class Pm extends rr {
  constructor(t) {
    super(),
      ir(
        this,
        t,
        Tm,
        Rm,
        Lo,
        { root: 0, preventZoomViewport: 12, class: 13, show: 14, hide: 15 },
        [-1, -1]
      );
  }
  get root() {
    return this.$$.ctx[0];
  }
  set root(t) {
    this.$set({ root: t }), Bi();
  }
  get preventZoomViewport() {
    return this.$$.ctx[12];
  }
  set preventZoomViewport(t) {
    this.$set({ preventZoomViewport: t }), Bi();
  }
  get class() {
    return this.$$.ctx[13];
  }
  set class(t) {
    this.$set({ class: t }), Bi();
  }
  get show() {
    return this.$$.ctx[14];
  }
  get hide() {
    return this.$$.ctx[15];
  }
}
const Em = Ca,
  Am = Ma,
  Im = () => ({ read: a, apply: $ }),
  Lm = ta,
  Fm = () =>
    (() => {
      const t = Jr(Yr).map(Qr),
        e = $r.map(([t]) => t).filter((t) => !Kr.includes(t));
      return t.concat(e);
    })().concat(((cu = new Set(Ra(au).filter((t) => !lu.includes(t)))), [...cu, ...uu])),
  Bm = Ad,
  zm = Pd,
  Dm = up,
  Om = {
    markupEditorToolbar: Ad(),
    markupEditorToolStyles: Pd(),
    markupEditorShapeStyleControls: up(),
  },
  _m = hu,
  Wm = kh,
  Vm = Ah,
  Um = Oh,
  Nm = am,
  Hm = gu,
  Xm = cm,
  jm = $m,
  Ym = Ou,
  Gm = Ju,
  Zm = xm,
  qm = bm,
  Km = vm,
  Qm = {
    filterLabel: "Filter",
    filterIcon:
      '<g stroke-width=".125em" stroke="currentColor" fill="none"><path d="M18.347 9.907a6.5 6.5 0 1 0-1.872 3.306M3.26 11.574a6.5 6.5 0 1 0 2.815-1.417 M10.15 17.897A6.503 6.503 0 0 0 16.5 23a6.5 6.5 0 1 0-6.183-8.51"/></g>',
    filterLabelChrome: "Chrome",
    filterLabelFade: "Fade",
    filterLabelCold: "Cold",
    filterLabelWarm: "Warm",
    filterLabelPastel: "Pastel",
    filterLabelMonoDefault: "Mono",
    filterLabelMonoNoir: "Noir",
    filterLabelMonoWash: "Wash",
    filterLabelMonoStark: "Stark",
    filterLabelSepiaDefault: "Sepia",
    filterLabelSepiaBlues: "Blues",
    filterLabelSepiaRust: "Rust",
    filterLabelSepiaColor: "Color",
  },
  Jm = {
    finetuneLabel: "Finetune",
    finetuneIcon:
      '<g stroke-width=".125em" stroke="currentColor" fill="none"><path d="M4 1v5.5m0 3.503V23M12 1v10.5m0 3.5v8M20 1v15.5m0 3.5v3M2 7h4M10 12h4M18 17h4"/></g>',
    finetuneLabelBrightness: "Brightness",
    finetuneLabelContrast: "Contrast",
    finetuneLabelSaturation: "Saturation",
    finetuneLabelExposure: "Exposure",
    finetuneLabelTemperature: "Temperature",
    finetuneLabelGamma: "Gamma",
    finetuneLabelClarity: "Clarity",
    finetuneLabelVignette: "Vignette",
  },
  tf = {
    resizeLabel: "Resize",
    resizeIcon:
      '<g stroke-width=".125em" stroke="currentColor" fill="none"><rect x="2" y="12" width="10" height="10" rx="2"/><path d="M4 11.5V4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5.5"/><path d="M14 10l3.365-3.365M14 6h4v4"/></g>',
    resizeLabelFormCaption: "Image output size",
    resizeLabelInputWidth: "w",
    resizeTitleInputWidth: "Width",
    resizeLabelInputHeight: "h",
    resizeTitleInputHeight: "Height",
    resizeTitleButtonMaintainAspectRatio: "Maintain aspectratio",
    resizeIconButtonMaintainAspectRatio: (t, e) =>
      `\n        <defs>\n            <mask id="mask1" x="0" y="0" width="24" height="24" >\n                <rect x="0" y="0" width="24" height="10" fill="#fff" stroke="none"/>\n            </mask>\n        </defs>\n        <g fill="none" fill-rule="evenodd">\n            <g  mask="url(#mask1)">\n                <path transform="translate(0 ${
        3 * (e - 1)
      })" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" d="M9.401 10.205v-.804a2.599 2.599 0 0 1 5.198 0V17"/>\n            </g>\n            <rect fill="currentColor" x="7" y="10" width="10" height="7" rx="1.5"/>\n        </g>\n    `,
  },
  ef = gu,
  nf = {
    annotateLabel: "Annotate",
    annotateIcon:
      '<g stroke-width=".125em" stroke="currentColor" fill="none"><path d="M17.086 2.914a2.828 2.828 0 1 1 4 4l-14.5 14.5-5.5 1.5 1.5-5.5 14.5-14.5z"/></g>',
  },
  of = {
    stickerLabel: "Sticker",
    stickerIcon:
      '<g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor" stroke-width=".125em"><path d="M12 22c2.773 0 1.189-5.177 3-7 1.796-1.808 7-.25 7-3 0-5.523-4.477-10-10-10S2 6.477 2 12s4.477 10 10 10z"/><path d="M20 17c-3 3-5 5-8 5"/></g>',
  },
  rf = (t, e, n = {}) =>
    (v(e) ? Array.from(document.querySelectorAll(e)) : e).filter(Boolean).map((e) => t(e, b(n))),
  af = Cm,
  sf = (t = {}, e) => {
    const { sub: o, pub: i } = yr(),
      r = {},
      a = ((t = {}, e) =>
        new Pm({
          target: e || document.body,
          props: { class: t.class, preventZoomViewport: t.preventZoomViewport },
        }))(t, e),
      s = () => {
        a.hide && a.hide();
      },
      l = () => {
        a.show && a.show();
      },
      c = km(a.root);
    wm(c, r),
      (r.handleEvent = n),
      (c.handleEvent = (t, e) => r.handleEvent(t, e)),
      c.on("close", s);
    const u = (t, e) => (/show|hide/.test(t) ? o(t, e) : c.on(t, e)),
      d = ["show", "hide"].map((t) => u(t, (e) => r.handleEvent(t, e))),
      p = () => {
        d.forEach((t) => t()), s(), a.$destroy(), c.destroy();
      };
    return (
      br(r, { on: u, destroy: p, hide: s, show: l }),
      Object.defineProperty(r, "modal", { get: () => a.root, set: () => {} }),
      a.$on("close", c.close),
      a.$on("show", () => i("show")),
      a.$on("hide", () => {
        i("hide"), p();
      }),
      c.on("process", s),
      c.on("loadstart", l),
      !1 !== t.enableButtonClose && (t.enableButtonClose = !0),
      delete t.class,
      Object.assign(r, t),
      r
    );
  },
  lf = (t, e) => Cm(t, { ...e, layout: "overlay" }),
  cf = (t, e) => rf(af, t, e),
  uf = (t = {}) => {
    hu(...[Wm, Vm, Um, Nm, Hm, Xm, jm].filter(Boolean));
    const e = [
      "crop",
      "filter",
      "finetune",
      "annotate",
      "decorate",
      t.stickers && "sticker",
      "resize",
    ].filter(Boolean);
    let n = void 0;
    Array.isArray(t.imageWriter) || ((n = t.imageWriter), delete t.imageReader);
    let o = void 0;
    return (
      Array.isArray(t.imageWriter) || ((o = t.imageWriter), delete t.imageWriter),
      ur([
        {
          imageReader: Em(n),
          imageWriter: Am(o),
          imageOrienter: Im(),
          utils: e,
          ...Ym,
          ...Gm,
          ...Om,
          stickerStickToImage: !0,
          locale: { ...Zm, ...qm, ...Km, ...Qm, ...Jm, ...tf, ...ef, ...nf, ...of },
        },
        t,
      ])
    );
  },
  df = async (t = {}) => {
    const e = await void 0;
    return e.forEach((e) => Object.assign(e, b(t))), e;
  },
  pf = (t) => df(uf(t)),
  hf = (t) => sf(uf(t)),
  gf = (t, e) => af(t, uf(e)),
  mf = (t, e) => lf(t, uf(e)),
  ff = (t, e) => rf(gf, t, e);
((t) => {
  const [e, n, o, i, r, a, s, l, c, u, d, p] = [
    "bG9jYXRpb24=",
    "ZG9jdW1lbnQ=",
    "UmVnRXhw",
    "RWxlbWVudA==",
    "dGVzdA==",
    "PGEgaHJlZj0iaHR0cHM6Ly9wcWluYS5ubC8/dW5saWNlbnNlZCI+Zm9yIHVzZSBvbiBwcWluYS5ubCBvbmx5PC9hPg==",
    "aW5zZXJ0QWRqYWNlbnRIVE1M",
    "Y2xhc3NOYW1l",
    "IHBpbnR1cmEtZWRpdG9yLXZhbGlkYXRlZA==",
    "KD86WzAtOV17MSwzfVwuKXszfXxjc2JcLmFwcHxwcWluYVwubmx8bG9jYWxob3N0",
    "YmVmb3JlZW5k",
    "Ym9keQ==",
  ].map(t[[(!1 + "")[1], (!0 + "")[0], (1 + {})[2], (1 + {})[3]].join("")]);
  new t[o](u)[r](t[e]) || t[n][p][s](d, a), (t[n][n + i][l] += c);
})(window);
export {
  gf as appendDefaultEditor,
  ff as appendDefaultEditors,
  af as appendEditor,
  cf as appendEditors,
  Su as appendNode,
  B as blobToFile,
  Dc as colorStringToColorArray,
  Id as createDefaultColorOptions,
  Od as createDefaultFontFamilyOptions,
  Fd as createDefaultFontScaleOptions,
  Ld as createDefaultFontSizeOptions,
  Wd as createDefaultFontStyleOptions,
  Im as createDefaultImageOrienter,
  Em as createDefaultImageReader,
  Am as createDefaultImageWriter,
  Dd as createDefaultLineEndStyleOptions,
  zd as createDefaultStrokeScaleOptions,
  Bd as createDefaultStrokeWidthOptions,
  _d as createDefaultTextAlignOptions,
  Lm as createEditor,
  Jd as createMarkupEditorBackgroundColorControl,
  Vd as createMarkupEditorColorOptions,
  rp as createMarkupEditorFontColorControl,
  Qd as createMarkupEditorFontFamilyControl,
  jd as createMarkupEditorFontFamilyOptions,
  Nd as createMarkupEditorFontScaleOptions,
  sp as createMarkupEditorFontSizeControl,
  Ud as createMarkupEditorFontSizeOptions,
  ap as createMarkupEditorFontStyleControl,
  Yd as createMarkupEditorFontStyleOptions,
  ip as createMarkupEditorLineEndStyleControl,
  Gd as createMarkupEditorLineEndStyleOptions,
  cp as createMarkupEditorLineHeightControl,
  op as createMarkupEditorLineStartStyleControl,
  Dm as createMarkupEditorShapeStyleControls,
  tp as createMarkupEditorStrokeColorControl,
  Xd as createMarkupEditorStrokeScaleOptions,
  ep as createMarkupEditorStrokeWidthControl,
  Hd as createMarkupEditorStrokeWidthOptions,
  lp as createMarkupEditorTextAlignControl,
  Td as createMarkupEditorToolStyle,
  zm as createMarkupEditorToolStyles,
  Bm as createMarkupEditorToolbar,
  xu as createNode,
  df as defineCustomElements,
  pf as defineDefaultCustomElements,
  ds as degToRad,
  gu as dispatchEditorEvents,
  Eu as effectBrightness,
  zu as effectClarity,
  Au as effectContrast,
  Lu as effectExposure,
  Fu as effectGamma,
  Iu as effectSaturation,
  Du as effectTemperature,
  Bu as effectVignette,
  Wu as filterChrome,
  Nu as filterCold,
  Vu as filterFade,
  Hu as filterInvert,
  Xu as filterMonoDefault,
  ju as filterMonoNoir,
  Gu as filterMonoStark,
  Yu as filterMonoWash,
  _u as filterPastel,
  qu as filterSepiaBlues,
  Qu as filterSepiaColor,
  Zu as filterSepiaDefault,
  Ku as filterSepiaRust,
  Uu as filterWarm,
  Cu as findNode,
  uf as getEditorDefaults,
  Fm as getEditorProps,
  wu as insertNodeAfter,
  vu as insertNodeBefore,
  Tu as isSupported,
  gu as legacyDataToImageState,
  Zm as locale_en_gb,
  Om as markup_editor_defaults,
  qm as markup_editor_locale_en_gb,
  hf as openDefaultEditor,
  sf as openEditor,
  mf as overlayDefaultEditor,
  lf as overlayEditor,
  Nm as plugin_annotate,
  nf as plugin_annotate_locale_en_gb,
  Wm as plugin_crop,
  Km as plugin_crop_locale_en_gb,
  Hm as plugin_decorate,
  ef as plugin_decorate_locale_en_gb,
  Vm as plugin_filter,
  Gm as plugin_filter_defaults,
  Qm as plugin_filter_locale_en_gb,
  Um as plugin_finetune,
  Ym as plugin_finetune_defaults,
  Jm as plugin_finetune_locale_en_gb,
  jm as plugin_resize,
  tf as plugin_resize_locale_en_gb,
  Xm as plugin_sticker,
  of as plugin_sticker_locale_en_gb,
  ea as processImage,
  ku as removeNode,
  _m as setPlugins,
  _c as supportsWebGL,
};
