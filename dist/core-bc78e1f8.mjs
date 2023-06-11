/**
 * @name vue3-code-block
 * @version 2.2.7
 * @description Vue 3 CodeBlock - Highlight your code with ease using this syntax highlighting component powered by PrismJS or Highlight.js.
 * @author WebDevNerdStuff & Bunnies... lots and lots of bunnies! <webdevnerdstuff@gmail.com> (https://webdevnerdstuff.com)
 * @copyright Copyright 2023, WebDevNerdStuff
 * @homepage https://webdevnerdstuff.github.io/vue3-code-block/
 * @repository https://github.com/webdevnerdstuff/vue3-code-block
 * @license MIT License
 */
function Le(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function xe(e) {
  return e instanceof Map ? e.clear = e.delete = e.set = function() {
    throw new Error("map is read-only");
  } : e instanceof Set && (e.add = e.clear = e.delete = function() {
    throw new Error("set is read-only");
  }), Object.freeze(e), Object.getOwnPropertyNames(e).forEach((n) => {
    const t = e[n], a = typeof t;
    a !== "object" && a !== "function" || Object.isFrozen(t) || xe(t);
  }), e;
}
class de {
  constructor(n) {
    n.data === void 0 && (n.data = {}), this.data = n.data, this.isMatchIgnored = !1;
  }
  ignoreMatch() {
    this.isMatchIgnored = !0;
  }
}
function _e(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
}
function L(e, ...n) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const a in e)
    t[a] = e[a];
  return n.forEach(function(a) {
    for (const f in a)
      t[f] = a[f];
  }), t;
}
const he = (e) => !!e.scope;
class Be {
  constructor(n, t) {
    this.buffer = "", this.classPrefix = t.classPrefix, n.walk(this);
  }
  addText(n) {
    this.buffer += _e(n);
  }
  openNode(n) {
    if (!he(n))
      return;
    const t = ((a, { prefix: f }) => {
      if (a.startsWith("language:"))
        return a.replace("language:", "language-");
      if (a.includes(".")) {
        const i = a.split(".");
        return [`${f}${i.shift()}`, ...i.map((l, s) => `${l}${"_".repeat(s + 1)}`)].join(" ");
      }
      return `${f}${a}`;
    })(n.scope, { prefix: this.classPrefix });
    this.span(t);
  }
  closeNode(n) {
    he(n) && (this.buffer += "</span>");
  }
  value() {
    return this.buffer;
  }
  span(n) {
    this.buffer += `<span class="${n}">`;
  }
}
const fe = (e = {}) => {
  const n = { children: [] };
  return Object.assign(n, e), n;
};
class ie {
  constructor() {
    this.rootNode = fe(), this.stack = [this.rootNode];
  }
  get top() {
    return this.stack[this.stack.length - 1];
  }
  get root() {
    return this.rootNode;
  }
  add(n) {
    this.top.children.push(n);
  }
  openNode(n) {
    const t = fe({ scope: n });
    this.add(t), this.stack.push(t);
  }
  closeNode() {
    if (this.stack.length > 1)
      return this.stack.pop();
  }
  closeAllNodes() {
    for (; this.closeNode(); )
      ;
  }
  toJSON() {
    return JSON.stringify(this.rootNode, null, 4);
  }
  walk(n) {
    return this.constructor._walk(n, this.rootNode);
  }
  static _walk(n, t) {
    return typeof t == "string" ? n.addText(t) : t.children && (n.openNode(t), t.children.forEach((a) => this._walk(n, a)), n.closeNode(t)), n;
  }
  static _collapse(n) {
    typeof n != "string" && n.children && (n.children.every((t) => typeof t == "string") ? n.children = [n.children.join("")] : n.children.forEach((t) => {
      ie._collapse(t);
    }));
  }
}
class He extends ie {
  constructor(n) {
    super(), this.options = n;
  }
  addText(n) {
    n !== "" && this.add(n);
  }
  startScope(n) {
    this.openNode(n);
  }
  endScope() {
    this.closeNode();
  }
  __addSublanguage(n, t) {
    const a = n.root;
    t && (a.scope = `language:${t}`), this.add(a);
  }
  toHTML() {
    return new Be(this, this.options).value();
  }
  finalize() {
    return this.closeAllNodes(), !0;
  }
}
function $(e) {
  return e ? typeof e == "string" ? e : e.source : null;
}
function ye(e) {
  return P("(?=", e, ")");
}
function Pe(e) {
  return P("(?:", e, ")*");
}
function De(e) {
  return P("(?:", e, ")?");
}
function P(...e) {
  return e.map((n) => $(n)).join("");
}
function oe(...e) {
  return "(" + (function(t) {
    const a = t[t.length - 1];
    return typeof a == "object" && a.constructor === Object ? (t.splice(t.length - 1, 1), a) : {};
  }(e).capture ? "" : "?:") + e.map((t) => $(t)).join("|") + ")";
}
function Oe(e) {
  return new RegExp(e.toString() + "|").exec("").length - 1;
}
const Ce = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;
function te(e, { joinWith: n }) {
  let t = 0;
  return e.map((a) => {
    t += 1;
    const f = t;
    let i = $(a), l = "";
    for (; i.length > 0; ) {
      const s = Ce.exec(i);
      if (!s) {
        l += i;
        break;
      }
      l += i.substring(0, s.index), i = i.substring(s.index + s[0].length), s[0][0] === "\\" && s[1] ? l += "\\" + String(Number(s[1]) + f) : (l += s[0], s[0] === "(" && t++);
    }
    return l;
  }).map((a) => `(${a})`).join(n);
}
const Se = "[a-zA-Z]\\w*", se = "[a-zA-Z_]\\w*", ke = "\\b\\d+(\\.\\d+)?", ve = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", Ne = "\\b(0b[01]+)", U = { begin: "\\\\[\\s\\S]", relevance: 0 }, $e = { scope: "string", begin: "'", end: "'", illegal: "\\n", contains: [U] }, Ue = { scope: "string", begin: '"', end: '"', illegal: "\\n", contains: [U] }, J = function(e, n, t = {}) {
  const a = L({ scope: "comment", begin: e, end: n, contains: [] }, t);
  a.contains.push({ scope: "doctag", begin: "[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)", end: /(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/, excludeBegin: !0, relevance: 0 });
  const f = oe("I", "a", "is", "so", "us", "to", "at", "if", "in", "it", "on", /[A-Za-z]+['](d|ve|re|ll|t|s|n)/, /[A-Za-z]+[-][a-z]+/, /[A-Za-z][a-z]{2,}/);
  return a.contains.push({ begin: P(/[ ]+/, "(", f, /[.]?[:]?([.][ ]|[ ])/, "){3}") }), a;
}, ze = J("//", "$"), We = J("/\\*", "\\*/"), Xe = J("#", "$"), Ge = { scope: "number", begin: ke, relevance: 0 }, Ke = { scope: "number", begin: ve, relevance: 0 }, Fe = { scope: "number", begin: Ne, relevance: 0 }, Ze = { begin: /(?=\/[^/\n]*\/)/, contains: [{ scope: "regexp", begin: /\//, end: /\/[gimuy]*/, illegal: /\n/, contains: [U, { begin: /\[/, end: /\]/, relevance: 0, contains: [U] }] }] }, Je = { scope: "title", begin: Se, relevance: 0 }, Ve = { scope: "title", begin: se, relevance: 0 }, qe = { begin: "\\.\\s*" + se, relevance: 0 };
var F = Object.freeze({ __proto__: null, MATCH_NOTHING_RE: /\b\B/, IDENT_RE: Se, UNDERSCORE_IDENT_RE: se, NUMBER_RE: ke, C_NUMBER_RE: ve, BINARY_NUMBER_RE: Ne, RE_STARTERS_RE: "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~", SHEBANG: (e = {}) => {
  const n = /^#![ ]*\//;
  return e.binary && (e.begin = P(n, /.*\b/, e.binary, /\b.*/)), L({ scope: "meta", begin: n, end: /$/, relevance: 0, "on:begin": (t, a) => {
    t.index !== 0 && a.ignoreMatch();
  } }, e);
}, BACKSLASH_ESCAPE: U, APOS_STRING_MODE: $e, QUOTE_STRING_MODE: Ue, PHRASAL_WORDS_MODE: { begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/ }, COMMENT: J, C_LINE_COMMENT_MODE: ze, C_BLOCK_COMMENT_MODE: We, HASH_COMMENT_MODE: Xe, NUMBER_MODE: Ge, C_NUMBER_MODE: Ke, BINARY_NUMBER_MODE: Fe, REGEXP_MODE: Ze, TITLE_MODE: Je, UNDERSCORE_TITLE_MODE: Ve, METHOD_GUARD: qe, END_SAME_AS_BEGIN: function(e) {
  return Object.assign(e, { "on:begin": (n, t) => {
    t.data._beginMatch = n[1];
  }, "on:end": (n, t) => {
    t.data._beginMatch !== n[1] && t.ignoreMatch();
  } });
} });
function Ye(e, n) {
  e.input[e.index - 1] === "." && n.ignoreMatch();
}
function Qe(e, n) {
  e.className !== void 0 && (e.scope = e.className, delete e.className);
}
function en(e, n) {
  n && e.beginKeywords && (e.begin = "\\b(" + e.beginKeywords.split(" ").join("|") + ")(?!\\.)(?=\\b|\\s)", e.__beforeBegin = Ye, e.keywords = e.keywords || e.beginKeywords, delete e.beginKeywords, e.relevance === void 0 && (e.relevance = 0));
}
function nn(e, n) {
  Array.isArray(e.illegal) && (e.illegal = oe(...e.illegal));
}
function tn(e, n) {
  if (e.match) {
    if (e.begin || e.end)
      throw new Error("begin & end are not supported with match");
    e.begin = e.match, delete e.match;
  }
}
function on(e, n) {
  e.relevance === void 0 && (e.relevance = 1);
}
const sn = (e, n) => {
  if (!e.beforeMatch)
    return;
  if (e.starts)
    throw new Error("beforeMatch cannot be used with starts");
  const t = Object.assign({}, e);
  Object.keys(e).forEach((a) => {
    delete e[a];
  }), e.keywords = t.keywords, e.begin = P(t.beforeMatch, ye(t.begin)), e.starts = { relevance: 0, contains: [Object.assign(t, { endsParent: !0 })] }, e.relevance = 0, delete t.beforeMatch;
}, rn = ["of", "and", "for", "in", "not", "or", "if", "then", "parent", "list", "value"], an = "keyword";
function Me(e, n, t = an) {
  const a = /* @__PURE__ */ Object.create(null);
  return typeof e == "string" ? f(t, e.split(" ")) : Array.isArray(e) ? f(t, e) : Object.keys(e).forEach(function(i) {
    Object.assign(a, Me(e[i], n, i));
  }), a;
  function f(i, l) {
    n && (l = l.map((s) => s.toLowerCase())), l.forEach(function(s) {
      const O = s.split("|");
      a[O[0]] = [i, cn(O[0], O[1])];
    });
  }
}
function cn(e, n) {
  return n ? Number(n) : function(t) {
    return rn.includes(t.toLowerCase());
  }(e) ? 0 : 1;
}
const pe = {}, H = (e) => {
  console.error(e);
}, be = (e, ...n) => {
  console.log(`WARN: ${e}`, ...n);
}, D = (e, n) => {
  pe[`${e}/${n}`] || (console.log(`Deprecated as of ${e}. ${n}`), pe[`${e}/${n}`] = !0);
}, Z = new Error();
function me(e, n, { key: t }) {
  let a = 0;
  const f = e[t], i = {}, l = {};
  for (let s = 1; s <= n.length; s++)
    l[s + a] = f[s], i[s + a] = !0, a += Oe(n[s - 1]);
  e[t] = l, e[t]._emit = i, e[t]._multi = !0;
}
function ln(e) {
  (function(n) {
    n.scope && typeof n.scope == "object" && n.scope !== null && (n.beginScope = n.scope, delete n.scope);
  })(e), typeof e.beginScope == "string" && (e.beginScope = { _wrap: e.beginScope }), typeof e.endScope == "string" && (e.endScope = { _wrap: e.endScope }), function(n) {
    if (Array.isArray(n.begin)) {
      if (n.skip || n.excludeBegin || n.returnBegin)
        throw H("skip, excludeBegin, returnBegin not compatible with beginScope: {}"), Z;
      if (typeof n.beginScope != "object" || n.beginScope === null)
        throw H("beginScope must be object"), Z;
      me(n, n.begin, { key: "beginScope" }), n.begin = te(n.begin, { joinWith: "" });
    }
  }(e), function(n) {
    if (Array.isArray(n.end)) {
      if (n.skip || n.excludeEnd || n.returnEnd)
        throw H("skip, excludeEnd, returnEnd not compatible with endScope: {}"), Z;
      if (typeof n.endScope != "object" || n.endScope === null)
        throw H("endScope must be object"), Z;
      me(n, n.end, { key: "endScope" }), n.end = te(n.end, { joinWith: "" });
    }
  }(e);
}
function un(e) {
  function n(f, i) {
    return new RegExp($(f), "m" + (e.case_insensitive ? "i" : "") + (e.unicodeRegex ? "u" : "") + (i ? "g" : ""));
  }
  class t {
    constructor() {
      this.matchIndexes = {}, this.regexes = [], this.matchAt = 1, this.position = 0;
    }
    addRule(i, l) {
      l.position = this.position++, this.matchIndexes[this.matchAt] = l, this.regexes.push([l, i]), this.matchAt += Oe(i) + 1;
    }
    compile() {
      this.regexes.length === 0 && (this.exec = () => null);
      const i = this.regexes.map((l) => l[1]);
      this.matcherRe = n(te(i, { joinWith: "|" }), !0), this.lastIndex = 0;
    }
    exec(i) {
      this.matcherRe.lastIndex = this.lastIndex;
      const l = this.matcherRe.exec(i);
      if (!l)
        return null;
      const s = l.findIndex((w, b) => b > 0 && w !== void 0), O = this.matchIndexes[s];
      return l.splice(0, s), Object.assign(l, O);
    }
  }
  class a {
    constructor() {
      this.rules = [], this.multiRegexes = [], this.count = 0, this.lastIndex = 0, this.regexIndex = 0;
    }
    getMatcher(i) {
      if (this.multiRegexes[i])
        return this.multiRegexes[i];
      const l = new t();
      return this.rules.slice(i).forEach(([s, O]) => l.addRule(s, O)), l.compile(), this.multiRegexes[i] = l, l;
    }
    resumingScanAtSamePosition() {
      return this.regexIndex !== 0;
    }
    considerAll() {
      this.regexIndex = 0;
    }
    addRule(i, l) {
      this.rules.push([i, l]), l.type === "begin" && this.count++;
    }
    exec(i) {
      const l = this.getMatcher(this.regexIndex);
      l.lastIndex = this.lastIndex;
      let s = l.exec(i);
      if (this.resumingScanAtSamePosition() && !(s && s.index === this.lastIndex)) {
        const O = this.getMatcher(0);
        O.lastIndex = this.lastIndex + 1, s = O.exec(i);
      }
      return s && (this.regexIndex += s.position + 1, this.regexIndex === this.count && this.considerAll()), s;
    }
  }
  if (e.compilerExtensions || (e.compilerExtensions = []), e.contains && e.contains.includes("self"))
    throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");
  return e.classNameAliases = L(e.classNameAliases || {}), function f(i, l) {
    const s = i;
    if (i.isCompiled)
      return s;
    [Qe, tn, ln, sn].forEach((w) => w(i, l)), e.compilerExtensions.forEach((w) => w(i, l)), i.__beforeBegin = null, [en, nn, on].forEach((w) => w(i, l)), i.isCompiled = !0;
    let O = null;
    return typeof i.keywords == "object" && i.keywords.$pattern && (i.keywords = Object.assign({}, i.keywords), O = i.keywords.$pattern, delete i.keywords.$pattern), O = O || /\w+/, i.keywords && (i.keywords = Me(i.keywords, e.case_insensitive)), s.keywordPatternRe = n(O, !0), l && (i.begin || (i.begin = /\B|\b/), s.beginRe = n(s.begin), i.end || i.endsWithParent || (i.end = /\B|\b/), i.end && (s.endRe = n(s.end)), s.terminatorEnd = $(s.end) || "", i.endsWithParent && l.terminatorEnd && (s.terminatorEnd += (i.end ? "|" : "") + l.terminatorEnd)), i.illegal && (s.illegalRe = n(i.illegal)), i.contains || (i.contains = []), i.contains = [].concat(...i.contains.map(function(w) {
      return function(b) {
        return b.variants && !b.cachedVariants && (b.cachedVariants = b.variants.map(function(I) {
          return L(b, { variants: null }, I);
        })), b.cachedVariants ? b.cachedVariants : Re(b) ? L(b, { starts: b.starts ? L(b.starts) : null }) : Object.isFrozen(b) ? L(b) : b;
      }(w === "self" ? i : w);
    })), i.contains.forEach(function(w) {
      f(w, s);
    }), i.starts && f(i.starts, l), s.matcher = function(w) {
      const b = new a();
      return w.contains.forEach((I) => b.addRule(I.begin, { rule: I, type: "begin" })), w.terminatorEnd && b.addRule(w.terminatorEnd, { type: "end" }), w.illegal && b.addRule(w.illegal, { type: "illegal" }), b;
    }(s), s;
  }(e);
}
function Re(e) {
  return !!e && (e.endsWithParent || Re(e.starts));
}
class gn extends Error {
  constructor(n, t) {
    super(n), this.name = "HTMLInjectionError", this.html = t;
  }
}
const ne = _e, Ee = L, we = Symbol("nomatch"), je = function(e) {
  const n = /* @__PURE__ */ Object.create(null), t = /* @__PURE__ */ Object.create(null), a = [];
  let f = !0;
  const i = "Could not find the language '{}', did you forget to load/include a language module?", l = { disableAutodetect: !0, name: "Plain text", contains: [] };
  let s = { ignoreUnescapedHTML: !1, throwUnescapedHTML: !1, noHighlightRe: /^(no-?highlight)$/i, languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i, classPrefix: "hljs-", cssSelector: "pre code", languages: null, __emitter: He };
  function O(r) {
    return s.noHighlightRe.test(r);
  }
  function w(r, u, d) {
    let S = "", _ = "";
    typeof u == "object" ? (S = r, d = u.ignoreIllegals, _ = u.language) : (D("10.7.0", "highlight(lang, code, ...args) has been deprecated."), D("10.7.0", `Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`), _ = r, S = u), d === void 0 && (d = !0);
    const y = { code: S, language: _ };
    W("before:highlight", y);
    const k = y.result ? y.result : b(y.language, y.code, d);
    return k.code = y.code, W("after:highlight", k), k;
  }
  function b(r, u, d, S) {
    const _ = /* @__PURE__ */ Object.create(null);
    function y() {
      if (!g.keywords)
        return void v.addText(m);
      let o = 0;
      g.keywordPatternRe.lastIndex = 0;
      let c = g.keywordPatternRe.exec(m), p = "";
      for (; c; ) {
        p += m.substring(o, c.index);
        const E = j.case_insensitive ? c[0].toLowerCase() : c[0], N = (h = E, g.keywords[h]);
        if (N) {
          const [A, ee] = N;
          if (v.addText(p), p = "", _[E] = (_[E] || 0) + 1, _[E] <= 7 && (G += ee), A.startsWith("_"))
            p += c[0];
          else {
            const K = j.classNameAliases[A] || A;
            M(c[0], K);
          }
        } else
          p += c[0];
        o = g.keywordPatternRe.lastIndex, c = g.keywordPatternRe.exec(m);
      }
      var h;
      p += m.substring(o), v.addText(p);
    }
    function k() {
      g.subLanguage != null ? function() {
        if (m === "")
          return;
        let o = null;
        if (typeof g.subLanguage == "string") {
          if (!n[g.subLanguage])
            return void v.addText(m);
          o = b(g.subLanguage, m, !0, ge[g.subLanguage]), ge[g.subLanguage] = o._top;
        } else
          o = I(m, g.subLanguage.length ? g.subLanguage : null);
        g.relevance > 0 && (G += o.relevance), v.__addSublanguage(o._emitter, o.language);
      }() : y(), m = "";
    }
    function M(o, c) {
      o !== "" && (v.startScope(c), v.addText(o), v.endScope());
    }
    function x(o, c) {
      let p = 1;
      const h = c.length - 1;
      for (; p <= h; ) {
        if (!o._emit[p]) {
          p++;
          continue;
        }
        const E = j.classNameAliases[o[p]] || o[p], N = c[p];
        E ? M(N, E) : (m = N, y(), m = ""), p++;
      }
    }
    function R(o, c) {
      return o.scope && typeof o.scope == "string" && v.openNode(j.classNameAliases[o.scope] || o.scope), o.beginScope && (o.beginScope._wrap ? (M(m, j.classNameAliases[o.beginScope._wrap] || o.beginScope._wrap), m = "") : o.beginScope._multi && (x(o.beginScope, c), m = "")), g = Object.create(o, { parent: { value: g } }), g;
    }
    function le(o, c, p) {
      let h = function(E, N) {
        const A = E && E.exec(N);
        return A && A.index === 0;
      }(o.endRe, p);
      if (h) {
        if (o["on:end"]) {
          const E = new de(o);
          o["on:end"](c, E), E.isMatchIgnored && (h = !1);
        }
        if (h) {
          for (; o.endsParent && o.parent; )
            o = o.parent;
          return o;
        }
      }
      if (o.endsWithParent)
        return le(o.parent, c, p);
    }
    function Ae(o) {
      return g.matcher.regexIndex === 0 ? (m += o[0], 1) : (Q = !0, 0);
    }
    function Ie(o) {
      const c = o[0], p = u.substring(o.index), h = le(g, o, p);
      if (!h)
        return we;
      const E = g;
      g.endScope && g.endScope._wrap ? (k(), M(c, g.endScope._wrap)) : g.endScope && g.endScope._multi ? (k(), x(g.endScope, o)) : E.skip ? m += c : (E.returnEnd || E.excludeEnd || (m += c), k(), E.excludeEnd && (m = c));
      do
        g.scope && v.closeNode(), g.skip || g.subLanguage || (G += g.relevance), g = g.parent;
      while (g !== h.parent);
      return h.starts && R(h.starts, o), E.returnEnd ? 0 : c.length;
    }
    let X = {};
    function ue(o, c) {
      const p = c && c[0];
      if (m += o, p == null)
        return k(), 0;
      if (X.type === "begin" && c.type === "end" && X.index === c.index && p === "") {
        if (m += u.slice(c.index, c.index + 1), !f) {
          const h = new Error(`0 width match regex (${r})`);
          throw h.languageName = r, h.badRule = X.rule, h;
        }
        return 1;
      }
      if (X = c, c.type === "begin")
        return function(h) {
          const E = h[0], N = h.rule, A = new de(N), ee = [N.__beforeBegin, N["on:begin"]];
          for (const K of ee)
            if (K && (K(h, A), A.isMatchIgnored))
              return Ae(E);
          return N.skip ? m += E : (N.excludeBegin && (m += E), k(), N.returnBegin || N.excludeBegin || (m = E)), R(N, h), N.returnBegin ? 0 : E.length;
        }(c);
      if (c.type === "illegal" && !d) {
        const h = new Error('Illegal lexeme "' + p + '" for mode "' + (g.scope || "<unnamed>") + '"');
        throw h.mode = g, h;
      }
      if (c.type === "end") {
        const h = Ie(c);
        if (h !== we)
          return h;
      }
      if (c.type === "illegal" && p === "")
        return 1;
      if (Y > 1e5 && Y > 3 * c.index)
        throw new Error("potential infinite loop, way more iterations than matches");
      return m += p, p.length;
    }
    const j = T(r);
    if (!j)
      throw H(i.replace("{}", r)), new Error('Unknown language: "' + r + '"');
    const Te = un(j);
    let q = "", g = S || Te;
    const ge = {}, v = new s.__emitter(s);
    (function() {
      const o = [];
      for (let c = g; c !== j; c = c.parent)
        c.scope && o.unshift(c.scope);
      o.forEach((c) => v.openNode(c));
    })();
    let m = "", G = 0, B = 0, Y = 0, Q = !1;
    try {
      if (j.__emitTokens)
        j.__emitTokens(u, v);
      else {
        for (g.matcher.considerAll(); ; ) {
          Y++, Q ? Q = !1 : g.matcher.considerAll(), g.matcher.lastIndex = B;
          const o = g.matcher.exec(u);
          if (!o)
            break;
          const c = ue(u.substring(B, o.index), o);
          B = o.index + c;
        }
        ue(u.substring(B));
      }
      return v.finalize(), q = v.toHTML(), { language: r, value: q, relevance: G, illegal: !1, _emitter: v, _top: g };
    } catch (o) {
      if (o.message && o.message.includes("Illegal"))
        return { language: r, value: ne(u), illegal: !0, relevance: 0, _illegalBy: { message: o.message, index: B, context: u.slice(B - 100, B + 100), mode: o.mode, resultSoFar: q }, _emitter: v };
      if (f)
        return { language: r, value: ne(u), illegal: !1, relevance: 0, errorRaised: o, _emitter: v, _top: g };
      throw o;
    }
  }
  function I(r, u) {
    u = u || s.languages || Object.keys(n);
    const d = function(x) {
      const R = { value: ne(x), illegal: !1, relevance: 0, _top: l, _emitter: new s.__emitter(s) };
      return R._emitter.addText(x), R;
    }(r), S = u.filter(T).filter(ce).map((x) => b(x, r, !1));
    S.unshift(d);
    const _ = S.sort((x, R) => {
      if (x.relevance !== R.relevance)
        return R.relevance - x.relevance;
      if (x.language && R.language) {
        if (T(x.language).supersetOf === R.language)
          return 1;
        if (T(R.language).supersetOf === x.language)
          return -1;
      }
      return 0;
    }), [y, k] = _, M = y;
    return M.secondBest = k, M;
  }
  function V(r) {
    let u = null;
    const d = function(y) {
      let k = y.className + " ";
      k += y.parentNode ? y.parentNode.className : "";
      const M = s.languageDetectRe.exec(k);
      if (M) {
        const x = T(M[1]);
        return x || (be(i.replace("{}", M[1])), be("Falling back to no-highlight mode for this block.", y)), x ? M[1] : "no-highlight";
      }
      return k.split(/\s+/).find((x) => O(x) || T(x));
    }(r);
    if (O(d))
      return;
    if (W("before:highlightElement", { el: r, language: d }), r.children.length > 0 && (s.ignoreUnescapedHTML || (console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."), console.warn("https://github.com/highlightjs/highlight.js/wiki/security"), console.warn("The element with unescaped HTML:"), console.warn(r)), s.throwUnescapedHTML))
      throw new gn("One of your code blocks includes unescaped HTML.", r.innerHTML);
    u = r;
    const S = u.textContent, _ = d ? w(S, { language: d, ignoreIllegals: !0 }) : I(S);
    r.innerHTML = _.value, function(y, k, M) {
      const x = k && t[k] || M;
      y.classList.add("hljs"), y.classList.add(`language-${x}`);
    }(r, d, _.language), r.result = { language: _.language, re: _.relevance, relevance: _.relevance }, _.secondBest && (r.secondBest = { language: _.secondBest.language, relevance: _.secondBest.relevance }), W("after:highlightElement", { el: r, result: _, text: S });
  }
  let re = !1;
  function z() {
    if (document.readyState === "loading")
      return void (re = !0);
    document.querySelectorAll(s.cssSelector).forEach(V);
  }
  function T(r) {
    return r = (r || "").toLowerCase(), n[r] || n[t[r]];
  }
  function ae(r, { languageName: u }) {
    typeof r == "string" && (r = [r]), r.forEach((d) => {
      t[d.toLowerCase()] = u;
    });
  }
  function ce(r) {
    const u = T(r);
    return u && !u.disableAutodetect;
  }
  function W(r, u) {
    const d = r;
    a.forEach(function(S) {
      S[d] && S[d](u);
    });
  }
  typeof window < "u" && window.addEventListener && window.addEventListener("DOMContentLoaded", function() {
    re && z();
  }, !1), Object.assign(e, { highlight: w, highlightAuto: I, highlightAll: z, highlightElement: V, highlightBlock: function(r) {
    return D("10.7.0", "highlightBlock will be removed entirely in v12.0"), D("10.7.0", "Please use highlightElement now."), V(r);
  }, configure: function(r) {
    s = Ee(s, r);
  }, initHighlighting: () => {
    z(), D("10.6.0", "initHighlighting() deprecated.  Use highlightAll() now.");
  }, initHighlightingOnLoad: function() {
    z(), D("10.6.0", "initHighlightingOnLoad() deprecated.  Use highlightAll() now.");
  }, registerLanguage: function(r, u) {
    let d = null;
    try {
      d = u(e);
    } catch (S) {
      if (H("Language definition for '{}' could not be registered.".replace("{}", r)), !f)
        throw S;
      H(S), d = l;
    }
    d.name || (d.name = r), n[r] = d, d.rawDefinition = u.bind(null, e), d.aliases && ae(d.aliases, { languageName: r });
  }, unregisterLanguage: function(r) {
    delete n[r];
    for (const u of Object.keys(t))
      t[u] === r && delete t[u];
  }, listLanguages: function() {
    return Object.keys(n);
  }, getLanguage: T, registerAliases: ae, autoDetection: ce, inherit: Ee, addPlugin: function(r) {
    (function(u) {
      u["before:highlightBlock"] && !u["before:highlightElement"] && (u["before:highlightElement"] = (d) => {
        u["before:highlightBlock"](Object.assign({ block: d.el }, d));
      }), u["after:highlightBlock"] && !u["after:highlightElement"] && (u["after:highlightElement"] = (d) => {
        u["after:highlightBlock"](Object.assign({ block: d.el }, d));
      });
    })(r), a.push(r);
  }, removePlugin: function(r) {
    const u = a.indexOf(r);
    u !== -1 && a.splice(u, 1);
  } }), e.debugMode = function() {
    f = !1;
  }, e.safeMode = function() {
    f = !0;
  }, e.versionString = "11.8.0", e.regex = { concat: P, lookahead: ye, either: oe, optional: De, anyNumberOfTimes: Pe };
  for (const r in F)
    typeof F[r] == "object" && xe(F[r]);
  return Object.assign(e, F), e;
}, C = je({});
C.newInstance = () => je({});
var dn = C;
C.HighlightJS = C, C.default = C;
const hn = Le(dn);
export {
  hn as HighlightJS,
  hn as default
};
