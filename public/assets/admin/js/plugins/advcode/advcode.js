tinymce.codeMirrorLazyLoader.define("ephox.wrap.CodeMirror", [], function() {
    var e, t = window.CodeMirror;
    window.CodeMirror = void 0, e = function() {
        "use strict";
        var e = navigator.userAgent, t = navigator.platform, g = /gecko\/\d/i.test(e), n = /MSIE \d/.test(e), r = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(e), i = /Edge\/(\d+)/.exec(e), x = n || r || i, C = x && (n ? document.documentMode || 6 : +(i || r)[1]), b = !i && /WebKit\//.test(e), o = b && /Qt\/\d+\.\d+/.test(e), l = !i && /Chrome\//.test(e), m = /Opera\//.test(e), s = /Apple Computer/.test(navigator.vendor), a = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(e), u = /PhantomJS/.test(e), c = !i && /AppleWebKit/.test(e) && /Mobile\/\w+/.test(e), f = /Android/.test(e), h = c || f || /webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(e), w = c || /Mac/.test(t), d = /\bCrOS\b/.test(e), p = /win/i.test(t), v = m && e.match(/Version\/(\d*\.\d*)/);
        v && (v = Number(v[1])), v && 15 <= v && (b = !(m = !1));
        var y = w && (o || m && (null == v || v < 12.11)), S = g || x && 9 <= C;
        function k(e) {
            return new RegExp("(^|\\s)" + e + "(?:$|\\s)\\s*");
        }
        var L, T = function(e, t) {
            var n = e.className, r = k(t).exec(n);
            if (r) {
                var i = n.slice(r.index + r[0].length);
                e.className = n.slice(0, r.index) + (i ? r[1] + i : "");
            }
        };
        function M(e) {
            for (var t = e.childNodes.length; 0 < t; --t) e.removeChild(e.firstChild);
            return e;
        }
        function N(e, t) {
            return M(e).appendChild(t);
        }
        function O(e, t, n, r) {
            var i = document.createElement(e);
            if (n && (i.className = n), r && (i.style.cssText = r), "string" == typeof t) i.appendChild(document.createTextNode(t)); else if (t) for (var o = 0; o < t.length; ++o) i.appendChild(t[o]);
            return i;
        }
        function A(e, t, n, r) {
            var i = O(e, t, n, r);
            return i.setAttribute("role", "presentation"), i;
        }
        function F(e, t) {
            if (3 == t.nodeType && (t = t.parentNode), e.contains) return e.contains(t);
            do {
                if (11 == t.nodeType && (t = t.host), t == e) return !0;
            } while (t = t.parentNode);
        }
        function D() {
            var t;
            try {
                t = document.activeElement;
            } catch (e) {
                t = document.body || null;
            }
            for (;t && t.shadowRoot && t.shadowRoot.activeElement; ) t = t.shadowRoot.activeElement;
            return t;
        }
        function W(e, t) {
            var n = e.className;
            k(t).test(n) || (e.className += (n ? " " : "") + t);
        }
        function P(e, t) {
            for (var n = e.split(" "), r = 0; r < n.length; r++) n[r] && !k(n[r]).test(t) && (t += " " + n[r]);
            return t;
        }
        L = document.createRange ? function(e, t, n, r) {
            var i = document.createRange();
            return i.setEnd(r || e, n), i.setStart(e, t), i;
        } : function(e, t, n) {
            var r = document.body.createTextRange();
            try {
                r.moveToElementText(e.parentNode);
            } catch (e) {
                return r;
            }
            return r.collapse(!0), r.moveEnd("character", n), r.moveStart("character", t), r;
        };
        var H = function(e) {
            e.select();
        };
        function I(e) {
            var t = Array.prototype.slice.call(arguments, 1);
            return function() {
                return e.apply(null, t);
            };
        }
        function E(e, t, n) {
            for (var r in t || (t = {}), e) !e.hasOwnProperty(r) || !1 === n && t.hasOwnProperty(r) || (t[r] = e[r]);
            return t;
        }
        function z(e, t, n, r, i) {
            null == t && -1 == (t = e.search(/[^\s\u00a0]/)) && (t = e.length);
            for (var o = r || 0, l = i || 0; ;) {
                var a = e.indexOf("\t", o);
                if (a < 0 || t <= a) return l + (t - o);
                l += a - o, l += n - l % n, o = a + 1;
            }
        }
        c ? H = function(e) {
            e.selectionStart = 0, e.selectionEnd = e.value.length;
        } : x && (H = function(e) {
            try {
                e.select();
            } catch (e) {}
        });
        var R = function() {
            this.id = null;
        };
        function B(e, t) {
            for (var n = 0; n < e.length; ++n) if (e[n] == t) return n;
            return -1;
        }
        R.prototype.set = function(e, t) {
            clearTimeout(this.id), this.id = setTimeout(t, e);
        };
        var U = 30, K = {
            toString: function() {
                return "CodeMirror.Pass";
            }
        }, G = {
            scroll: !1
        }, V = {
            origin: "*mouse"
        }, j = {
            origin: "+move"
        };
        function _(e, t, n) {
            for (var r = 0, i = 0; ;) {
                var o = e.indexOf("\t", r);
                -1 == o && (o = e.length);
                var l = o - r;
                if (o == e.length || t <= i + l) return r + Math.min(l, t - i);
                if (i += o - r, r = o + 1, t <= (i += n - i % n)) return r;
            }
        }
        var q = [ "" ];
        function X(e) {
            for (;q.length <= e; ) q.push(Y(q) + " ");
            return q[e];
        }
        function Y(e) {
            return e[e.length - 1];
        }
        function $(e, t) {
            for (var n = [], r = 0; r < e.length; r++) n[r] = t(e[r], r);
            return n;
        }
        function Z() {}
        function J(e, t) {
            var n;
            return Object.create ? n = Object.create(e) : (Z.prototype = e, n = new Z()), t && E(t, n),
                n;
        }
        var Q = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;
        function ee(e) {
            return /\w/.test(e) || "\x80" < e && (e.toUpperCase() != e.toLowerCase() || Q.test(e));
        }
        function te(e, t) {
            return t ? !!(-1 < t.source.indexOf("\\w") && ee(e)) || t.test(e) : ee(e);
        }
        function ne(e) {
            for (var t in e) if (e.hasOwnProperty(t) && e[t]) return !1;
            return !0;
        }
        var re = /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/;
        function ie(e) {
            return 768 <= e.charCodeAt(0) && re.test(e);
        }
        function oe(e, t, n) {
            for (;(n < 0 ? 0 < t : t < e.length) && ie(e.charAt(t)); ) t += n;
            return t;
        }
        function le(e, t, n) {
            for (var r = n < t ? -1 : 1; ;) {
                if (t == n) return t;
                var i = (t + n) / 2, o = r < 0 ? Math.ceil(i) : Math.floor(i);
                if (o == t) return e(o) ? t : n;
                e(o) ? n = o : t = o + r;
            }
        }
        var ae = null;
        function se(e, t, n) {
            var r;
            ae = null;
            for (var i = 0; i < e.length; ++i) {
                var o = e[i];
                if (o.from < t && o.to > t) return i;
                o.to == t && (o.from != o.to && "before" == n ? r = i : ae = i), o.from == t && (o.from != o.to && "before" != n ? r = i : ae = i);
            }
            return null != r ? r : ae;
        }
        var ue = function() {
            var E = "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN", z = "nnnnnnNNr%%r,rNNmmmmmmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmmmnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmnNmmmmmmrrmmNmmmmrr1111111111";
            var R = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/, B = /[stwN]/, U = /[LRr]/, K = /[Lb1n]/, G = /[1n]/;
            function V(e, t, n) {
                this.level = e, this.from = t, this.to = n;
            }
            return function(e, t) {
                var n = "ltr" == t ? "L" : "R";
                if (0 == e.length || "ltr" == t && !R.test(e)) return !1;
                for (var r, i = e.length, o = [], l = 0; l < i; ++l) o.push((r = e.charCodeAt(l)) <= 247 ? E.charAt(r) : 1424 <= r && r <= 1524 ? "R" : 1536 <= r && r <= 1785 ? z.charAt(r - 1536) : 1774 <= r && r <= 2220 ? "r" : 8192 <= r && r <= 8203 ? "w" : 8204 == r ? "b" : "L");
                for (var a = 0, s = n; a < i; ++a) {
                    var u = o[a];
                    "m" == u ? o[a] = s : s = u;
                }
                for (var c = 0, f = n; c < i; ++c) {
                    var h = o[c];
                    "1" == h && "r" == f ? o[c] = "n" : U.test(h) && "r" == (f = h) && (o[c] = "R");
                }
                for (var d = 1, p = o[0]; d < i - 1; ++d) {
                    var g = o[d];
                    "+" == g && "1" == p && "1" == o[d + 1] ? o[d] = "1" : "," != g || p != o[d + 1] || "1" != p && "n" != p || (o[d] = p),
                        p = g;
                }
                for (var m = 0; m < i; ++m) {
                    var v = o[m];
                    if ("," == v) o[m] = "N"; else if ("%" == v) {
                        var y = void 0;
                        for (y = m + 1; y < i && "%" == o[y]; ++y) ;
                        for (var b = m && "!" == o[m - 1] || y < i && "1" == o[y] ? "1" : "N", w = m; w < y; ++w) o[w] = b;
                        m = y - 1;
                    }
                }
                for (var x = 0, C = n; x < i; ++x) {
                    var S = o[x];
                    "L" == C && "1" == S ? o[x] = "L" : U.test(S) && (C = S);
                }
                for (var k = 0; k < i; ++k) if (B.test(o[k])) {
                    var L = void 0;
                    for (L = k + 1; L < i && B.test(o[L]); ++L) ;
                    for (var T = "L" == (k ? o[k - 1] : n), M = T == ("L" == (L < i ? o[L] : n)) ? T ? "L" : "R" : n, N = k; N < L; ++N) o[N] = M;
                    k = L - 1;
                }
                for (var A, O = [], F = 0; F < i; ) if (K.test(o[F])) {
                    var D = F;
                    for (++F; F < i && K.test(o[F]); ++F) ;
                    O.push(new V(0, D, F));
                } else {
                    var W = F, P = O.length;
                    for (++F; F < i && "L" != o[F]; ++F) ;
                    for (var H = W; H < F; ) if (G.test(o[H])) {
                        W < H && O.splice(P, 0, new V(1, W, H));
                        var I = H;
                        for (++H; H < F && G.test(o[H]); ++H) ;
                        O.splice(P, 0, new V(2, I, H)), W = H;
                    } else ++H;
                    W < F && O.splice(P, 0, new V(1, W, F));
                }
                return "ltr" == t && (1 == O[0].level && (A = e.match(/^\s+/)) && (O[0].from = A[0].length,
                    O.unshift(new V(0, 0, A[0].length))), 1 == Y(O).level && (A = e.match(/\s+$/)) && (Y(O).to -= A[0].length,
                    O.push(new V(0, i - A[0].length, i)))), "rtl" == t ? O.reverse() : O;
            };
        }();
        function ce(e, t) {
            var n = e.order;
            return null == n && (n = e.order = ue(e.text, t)), n;
        }
        var fe = [], he = function(e, t, n) {
            if (e.addEventListener) e.addEventListener(t, n, !1); else if (e.attachEvent) e.attachEvent("on" + t, n); else {
                var r = e._handlers || (e._handlers = {});
                r[t] = (r[t] || fe).concat(n);
            }
        };
        function de(e, t) {
            return e._handlers && e._handlers[t] || fe;
        }
        function pe(e, t, n) {
            if (e.removeEventListener) e.removeEventListener(t, n, !1); else if (e.detachEvent) e.detachEvent("on" + t, n); else {
                var r = e._handlers, i = r && r[t];
                if (i) {
                    var o = B(i, n);
                    -1 < o && (r[t] = i.slice(0, o).concat(i.slice(o + 1)));
                }
            }
        }
        function ge(e, t) {
            var n = de(e, t);
            if (n.length) for (var r = Array.prototype.slice.call(arguments, 2), i = 0; i < n.length; ++i) n[i].apply(null, r);
        }
        function me(e, t, n) {
            return "string" == typeof t && (t = {
                type: t,
                preventDefault: function() {
                    this.defaultPrevented = !0;
                }
            }), ge(e, n || t.type, e, t), Ce(t) || t.codemirrorIgnore;
        }
        function ve(e) {
            var t = e._handlers && e._handlers.cursorActivity;
            if (t) for (var n = e.curOp.cursorActivityHandlers || (e.curOp.cursorActivityHandlers = []), r = 0; r < t.length; ++r) -1 == B(n, t[r]) && n.push(t[r]);
        }
        function ye(e, t) {
            return 0 < de(e, t).length;
        }
        function be(e) {
            e.prototype.on = function(e, t) {
                he(this, e, t);
            }, e.prototype.off = function(e, t) {
                pe(this, e, t);
            };
        }
        function we(e) {
            e.preventDefault ? e.preventDefault() : e.returnValue = !1;
        }
        function xe(e) {
            e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0;
        }
        function Ce(e) {
            return null != e.defaultPrevented ? e.defaultPrevented : 0 == e.returnValue;
        }
        function Se(e) {
            we(e), xe(e);
        }
        function ke(e) {
            return e.target || e.srcElement;
        }
        function Le(e) {
            var t = e.which;
            return null == t && (1 & e.button ? t = 1 : 2 & e.button ? t = 3 : 4 & e.button && (t = 2)),
            w && e.ctrlKey && 1 == t && (t = 3), t;
        }
        var Te, Me, Ne = function() {
            if (x && C < 9) return !1;
            var e = O("div");
            return "draggable" in e || "dragDrop" in e;
        }();
        function Ae(e) {
            if (null == Te) {
                var t = O("span", "\u200b");
                N(e, O("span", [ t, document.createTextNode("x") ])), 0 != e.firstChild.offsetHeight && (Te = t.offsetWidth <= 1 && 2 < t.offsetHeight && !(x && C < 8));
            }
            var n = Te ? O("span", "\u200b") : O("span", "\xa0", null, "display: inline-block; width: 1px; margin-right: -1px");
            return n.setAttribute("cm-text", ""), n;
        }
        function Oe(e) {
            if (null != Me) return Me;
            var t = N(e, document.createTextNode("A\u062eA")), n = L(t, 0, 1).getBoundingClientRect(), r = L(t, 1, 2).getBoundingClientRect();
            return M(e), !(!n || n.left == n.right) && (Me = r.right - n.right < 3);
        }
        var Fe, De = 3 != "\n\nb".split(/\n/).length ? function(e) {
            for (var t = 0, n = [], r = e.length; t <= r; ) {
                var i = e.indexOf("\n", t);
                -1 == i && (i = e.length);
                var o = e.slice(t, "\r" == e.charAt(i - 1) ? i - 1 : i), l = o.indexOf("\r");
                -1 != l ? (n.push(o.slice(0, l)), t += l + 1) : (n.push(o), t = i + 1);
            }
            return n;
        } : function(e) {
            return e.split(/\r\n?|\n/);
        }, We = window.getSelection ? function(e) {
            try {
                return e.selectionStart != e.selectionEnd;
            } catch (e) {
                return !1;
            }
        } : function(e) {
            var t;
            try {
                t = e.ownerDocument.selection.createRange();
            } catch (e) {}
            return !(!t || t.parentElement() != e) && 0 != t.compareEndPoints("StartToEnd", t);
        }, Pe = "oncopy" in (Fe = O("div")) || (Fe.setAttribute("oncopy", "return;"), "function" == typeof Fe.oncopy), He = null;
        var Ie = {}, Ee = {};
        function ze(e) {
            if ("string" == typeof e && Ee.hasOwnProperty(e)) e = Ee[e]; else if (e && "string" == typeof e.name && Ee.hasOwnProperty(e.name)) {
                var t = Ee[e.name];
                "string" == typeof t && (t = {
                    name: t
                }), (e = J(t, e)).name = t.name;
            } else {
                if ("string" == typeof e && /^[\w\-]+\/[\w\-]+\+xml$/.test(e)) return ze("application/xml");
                if ("string" == typeof e && /^[\w\-]+\/[\w\-]+\+json$/.test(e)) return ze("application/json");
            }
            return "string" == typeof e ? {
                name: e
            } : e || {
                name: "null"
            };
        }
        function Re(e, t) {
            t = ze(t);
            var n = Ie[t.name];
            if (!n) return Re(e, "text/plain");
            var r = n(e, t);
            if (Be.hasOwnProperty(t.name)) {
                var i = Be[t.name];
                for (var o in i) i.hasOwnProperty(o) && (r.hasOwnProperty(o) && (r["_" + o] = r[o]),
                    r[o] = i[o]);
            }
            if (r.name = t.name, t.helperType && (r.helperType = t.helperType), t.modeProps) for (var l in t.modeProps) r[l] = t.modeProps[l];
            return r;
        }
        var Be = {};
        function Ue(e, t) {
            E(t, Be.hasOwnProperty(e) ? Be[e] : Be[e] = {});
        }
        function Ke(e, t) {
            if (!0 === t) return t;
            if (e.copyState) return e.copyState(t);
            var n = {};
            for (var r in t) {
                var i = t[r];
                i instanceof Array && (i = i.concat([])), n[r] = i;
            }
            return n;
        }
        function Ge(e, t) {
            for (var n; e.innerMode && (n = e.innerMode(t)) && n.mode != e; ) t = n.state, e = n.mode;
            return n || {
                mode: e,
                state: t
            };
        }
        function Ve(e, t, n) {
            return !e.startState || e.startState(t, n);
        }
        var je = function(e, t, n) {
            this.pos = this.start = 0, this.string = e, this.tabSize = t || 8, this.lastColumnPos = this.lastColumnValue = 0,
                this.lineStart = 0, this.lineOracle = n;
        };
        function _e(e, t) {
            if ((t -= e.first) < 0 || t >= e.size) throw new Error("There is no line " + (t + e.first) + " in the document.");
            for (var n = e; !n.lines; ) for (var r = 0; ;++r) {
                var i = n.children[r], o = i.chunkSize();
                if (t < o) {
                    n = i;
                    break;
                }
                t -= o;
            }
            return n.lines[t];
        }
        function qe(e, n, r) {
            var i = [], o = n.line;
            return e.iter(n.line, r.line + 1, function(e) {
                var t = e.text;
                o == r.line && (t = t.slice(0, r.ch)), o == n.line && (t = t.slice(n.ch)), i.push(t),
                    ++o;
            }), i;
        }
        function Xe(e, t, n) {
            var r = [];
            return e.iter(t, n, function(e) {
                r.push(e.text);
            }), r;
        }
        function Ye(e, t) {
            var n = t - e.height;
            if (n) for (var r = e; r; r = r.parent) r.height += n;
        }
        function $e(e) {
            if (null == e.parent) return null;
            for (var t = e.parent, n = B(t.lines, e), r = t.parent; r; r = (t = r).parent) for (var i = 0; r.children[i] != t; ++i) n += r.children[i].chunkSize();
            return n + t.first;
        }
        function Ze(e, t) {
            var n = e.first;
            e: do {
                for (var r = 0; r < e.children.length; ++r) {
                    var i = e.children[r], o = i.height;
                    if (t < o) {
                        e = i;
                        continue e;
                    }
                    t -= o, n += i.chunkSize();
                }
                return n;
            } while (!e.lines);
            for (var l = 0; l < e.lines.length; ++l) {
                var a = e.lines[l].height;
                if (t < a) break;
                t -= a;
            }
            return n + l;
        }
        function Je(e, t) {
            return t >= e.first && t < e.first + e.size;
        }
        function Qe(e, t) {
            return String(e.lineNumberFormatter(t + e.firstLineNumber));
        }
        function et(e, t, n) {
            if (void 0 === n && (n = null), !(this instanceof et)) return new et(e, t, n);
            this.line = e, this.ch = t, this.sticky = n;
        }
        function tt(e, t) {
            return e.line - t.line || e.ch - t.ch;
        }
        function nt(e, t) {
            return e.sticky == t.sticky && 0 == tt(e, t);
        }
        function rt(e) {
            return et(e.line, e.ch);
        }
        function it(e, t) {
            return tt(e, t) < 0 ? t : e;
        }
        function ot(e, t) {
            return tt(e, t) < 0 ? e : t;
        }
        function lt(e, t) {
            return Math.max(e.first, Math.min(t, e.first + e.size - 1));
        }
        function at(e, t) {
            if (t.line < e.first) return et(e.first, 0);
            var n, r, i, o = e.first + e.size - 1;
            return t.line > o ? et(o, _e(e, o).text.length) : (r = _e(e, (n = t).line).text.length,
                null == (i = n.ch) || r < i ? et(n.line, r) : i < 0 ? et(n.line, 0) : n);
        }
        function st(e, t) {
            for (var n = [], r = 0; r < t.length; r++) n[r] = at(e, t[r]);
            return n;
        }
        je.prototype.eol = function() {
            return this.pos >= this.string.length;
        }, je.prototype.sol = function() {
            return this.pos == this.lineStart;
        }, je.prototype.peek = function() {
            return this.string.charAt(this.pos) || void 0;
        }, je.prototype.next = function() {
            if (this.pos < this.string.length) return this.string.charAt(this.pos++);
        }, je.prototype.eat = function(e) {
            var t = this.string.charAt(this.pos);
            if ("string" == typeof e ? t == e : t && (e.test ? e.test(t) : e(t))) return ++this.pos,
                t;
        }, je.prototype.eatWhile = function(e) {
            for (var t = this.pos; this.eat(e); ) ;
            return this.pos > t;
        }, je.prototype.eatSpace = function() {
            for (var e = this.pos; /[\s\u00a0]/.test(this.string.charAt(this.pos)); ) ++this.pos;
            return this.pos > e;
        }, je.prototype.skipToEnd = function() {
            this.pos = this.string.length;
        }, je.prototype.skipTo = function(e) {
            var t = this.string.indexOf(e, this.pos);
            if (-1 < t) return this.pos = t, !0;
        }, je.prototype.backUp = function(e) {
            this.pos -= e;
        }, je.prototype.column = function() {
            return this.lastColumnPos < this.start && (this.lastColumnValue = z(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue),
                this.lastColumnPos = this.start), this.lastColumnValue - (this.lineStart ? z(this.string, this.lineStart, this.tabSize) : 0);
        }, je.prototype.indentation = function() {
            return z(this.string, null, this.tabSize) - (this.lineStart ? z(this.string, this.lineStart, this.tabSize) : 0);
        }, je.prototype.match = function(e, t, n) {
            if ("string" != typeof e) {
                var r = this.string.slice(this.pos).match(e);
                return r && 0 < r.index ? null : (r && !1 !== t && (this.pos += r[0].length), r);
            }
            var i = function(e) {
                return n ? e.toLowerCase() : e;
            };
            if (i(this.string.substr(this.pos, e.length)) == i(e)) return !1 !== t && (this.pos += e.length),
                !0;
        }, je.prototype.current = function() {
            return this.string.slice(this.start, this.pos);
        }, je.prototype.hideFirstChars = function(e, t) {
            this.lineStart += e;
            try {
                return t();
            } finally {
                this.lineStart -= e;
            }
        }, je.prototype.lookAhead = function(e) {
            var t = this.lineOracle;
            return t && t.lookAhead(e);
        }, je.prototype.baseToken = function() {
            var e = this.lineOracle;
            return e && e.baseToken(this.pos);
        };
        var ut = function(e, t) {
            this.state = e, this.lookAhead = t;
        }, ct = function(e, t, n, r) {
            this.state = t, this.doc = e, this.line = n, this.maxLookAhead = r || 0, this.baseTokens = null,
                this.baseTokenPos = 1;
        };
        function ft(t, n, r, e) {
            var s = [ t.state.modeGen ], i = {};
            wt(t, n.text, t.doc.mode, r, function(e, t) {
                return s.push(e, t);
            }, i, e);
            for (var u = r.state, o = function(e) {
                r.baseTokens = s;
                var o = t.state.overlays[e], l = 1, a = 0;
                r.state = !0, wt(t, n.text, o.mode, r, function(e, t) {
                    for (var n = l; a < e; ) {
                        var r = s[l];
                        e < r && s.splice(l, 1, e, s[l + 1], r), l += 2, a = Math.min(e, r);
                    }
                    if (t) if (o.opaque) s.splice(n, l - n, e, "overlay " + t), l = n + 2; else for (;n < l; n += 2) {
                        var i = s[n + 1];
                        s[n + 1] = (i ? i + " " : "") + "overlay " + t;
                    }
                }, i), r.state = u, r.baseTokens = null, r.baseTokenPos = 1;
            }, l = 0; l < t.state.overlays.length; ++l) o(l);
            return {
                styles: s,
                classes: i.bgClass || i.textClass ? i : null
            };
        }
        function ht(e, t, n) {
            if (!t.styles || t.styles[0] != e.state.modeGen) {
                var r = dt(e, $e(t)), i = t.text.length > e.options.maxHighlightLength && Ke(e.doc.mode, r.state), o = ft(e, t, r);
                i && (r.state = i), t.stateAfter = r.save(!i), t.styles = o.styles, o.classes ? t.styleClasses = o.classes : t.styleClasses && (t.styleClasses = null),
                n === e.doc.highlightFrontier && (e.doc.modeFrontier = Math.max(e.doc.modeFrontier, ++e.doc.highlightFrontier));
            }
            return t.styles;
        }
        function dt(n, r, e) {
            var t = n.doc, i = n.display;
            if (!t.mode.startState) return new ct(t, !0, r);
            var o = function(e, t, n) {
                for (var r, i, o = e.doc, l = n ? -1 : t - (e.doc.mode.innerMode ? 1e3 : 100), a = t; l < a; --a) {
                    if (a <= o.first) return o.first;
                    var s = _e(o, a - 1), u = s.stateAfter;
                    if (u && (!n || a + (u instanceof ut ? u.lookAhead : 0) <= o.modeFrontier)) return a;
                    var c = z(s.text, null, e.options.tabSize);
                    (null == i || c < r) && (i = a - 1, r = c);
                }
                return i;
            }(n, r, e), l = o > t.first && _e(t, o - 1).stateAfter, a = l ? ct.fromSaved(t, l, o) : new ct(t, Ve(t.mode), o);
            return t.iter(o, r, function(e) {
                pt(n, e.text, a);
                var t = a.line;
                e.stateAfter = t == r - 1 || t % 5 == 0 || t >= i.viewFrom && t < i.viewTo ? a.save() : null,
                    a.nextLine();
            }), e && (t.modeFrontier = a.line), a;
        }
        function pt(e, t, n, r) {
            var i = e.doc.mode, o = new je(t, e.options.tabSize, n);
            for (o.start = o.pos = r || 0, "" == t && gt(i, n.state); !o.eol(); ) mt(i, o, n.state),
                o.start = o.pos;
        }
        function gt(e, t) {
            if (e.blankLine) return e.blankLine(t);
            if (e.innerMode) {
                var n = Ge(e, t);
                return n.mode.blankLine ? n.mode.blankLine(n.state) : void 0;
            }
        }
        function mt(e, t, n, r) {
            for (var i = 0; i < 10; i++) {
                r && (r[0] = Ge(e, n).mode);
                var o = e.token(t, n);
                if (t.pos > t.start) return o;
            }
            throw new Error("Mode " + e.name + " failed to advance stream.");
        }
        ct.prototype.lookAhead = function(e) {
            var t = this.doc.getLine(this.line + e);
            return null != t && e > this.maxLookAhead && (this.maxLookAhead = e), t;
        }, ct.prototype.baseToken = function(e) {
            if (!this.baseTokens) return null;
            for (;this.baseTokens[this.baseTokenPos] <= e; ) this.baseTokenPos += 2;
            var t = this.baseTokens[this.baseTokenPos + 1];
            return {
                type: t && t.replace(/( |^)overlay .*/, ""),
                size: this.baseTokens[this.baseTokenPos] - e
            };
        }, ct.prototype.nextLine = function() {
            this.line++, 0 < this.maxLookAhead && this.maxLookAhead--;
        }, ct.fromSaved = function(e, t, n) {
            return t instanceof ut ? new ct(e, Ke(e.mode, t.state), n, t.lookAhead) : new ct(e, Ke(e.mode, t), n);
        }, ct.prototype.save = function(e) {
            var t = !1 !== e ? Ke(this.doc.mode, this.state) : this.state;
            return 0 < this.maxLookAhead ? new ut(t, this.maxLookAhead) : t;
        };
        var vt = function(e, t, n) {
            this.start = e.start, this.end = e.pos, this.string = e.current(), this.type = t || null,
                this.state = n;
        };
        function yt(e, t, n, r) {
            var i, o, l = e.doc, a = l.mode, s = _e(l, (t = at(l, t)).line), u = dt(e, t.line, n), c = new je(s.text, e.options.tabSize, u);
            for (r && (o = []); (r || c.pos < t.ch) && !c.eol(); ) c.start = c.pos, i = mt(a, c, u.state),
            r && o.push(new vt(c, i, Ke(l.mode, u.state)));
            return r ? o : new vt(c, i, u.state);
        }
        function bt(e, t) {
            if (e) for (;;) {
                var n = e.match(/(?:^|\s+)line-(background-)?(\S+)/);
                if (!n) break;
                e = e.slice(0, n.index) + e.slice(n.index + n[0].length);
                var r = n[1] ? "bgClass" : "textClass";
                null == t[r] ? t[r] = n[2] : new RegExp("(?:^|s)" + n[2] + "(?:$|s)").test(t[r]) || (t[r] += " " + n[2]);
            }
            return e;
        }
        function wt(e, t, n, r, i, o, l) {
            var a = n.flattenSpans;
            null == a && (a = e.options.flattenSpans);
            var s, u = 0, c = null, f = new je(t, e.options.tabSize, r), h = e.options.addModeClass && [ null ];
            for ("" == t && bt(gt(n, r.state), o); !f.eol(); ) {
                if (f.pos > e.options.maxHighlightLength ? (a = !1, l && pt(e, t, r, f.pos), f.pos = t.length,
                    s = null) : s = bt(mt(n, f, r.state, h), o), h) {
                    var d = h[0].name;
                    d && (s = "m-" + (s ? d + " " + s : d));
                }
                if (!a || c != s) {
                    for (;u < f.start; ) i(u = Math.min(f.start, u + 5e3), c);
                    c = s;
                }
                f.start = f.pos;
            }
            for (;u < f.pos; ) {
                var p = Math.min(f.pos, u + 5e3);
                i(p, c), u = p;
            }
        }
        var xt = !1, Ct = !1;
        function St(e, t, n) {
            this.marker = e, this.from = t, this.to = n;
        }
        function kt(e, t) {
            if (e) for (var n = 0; n < e.length; ++n) {
                var r = e[n];
                if (r.marker == t) return r;
            }
        }
        function Lt(e, t) {
            for (var n, r = 0; r < e.length; ++r) e[r] != t && (n || (n = [])).push(e[r]);
            return n;
        }
        function Tt(e, t) {
            if (t.full) return null;
            var n = Je(e, t.from.line) && _e(e, t.from.line).markedSpans, r = Je(e, t.to.line) && _e(e, t.to.line).markedSpans;
            if (!n && !r) return null;
            var i = t.from.ch, o = t.to.ch, l = 0 == tt(t.from, t.to), a = function(e, t, n) {
                var r;
                if (e) for (var i = 0; i < e.length; ++i) {
                    var o = e[i], l = o.marker;
                    if (null == o.from || (l.inclusiveLeft ? o.from <= t : o.from < t) || o.from == t && "bookmark" == l.type && (!n || !o.marker.insertLeft)) {
                        var a = null == o.to || (l.inclusiveRight ? o.to >= t : o.to > t);
                        (r || (r = [])).push(new St(l, o.from, a ? null : o.to));
                    }
                }
                return r;
            }(n, i, l), s = function(e, t, n) {
                var r;
                if (e) for (var i = 0; i < e.length; ++i) {
                    var o = e[i], l = o.marker;
                    if (null == o.to || (l.inclusiveRight ? o.to >= t : o.to > t) || o.from == t && "bookmark" == l.type && (!n || o.marker.insertLeft)) {
                        var a = null == o.from || (l.inclusiveLeft ? o.from <= t : o.from < t);
                        (r || (r = [])).push(new St(l, a ? null : o.from - t, null == o.to ? null : o.to - t));
                    }
                }
                return r;
            }(r, o, l), u = 1 == t.text.length, c = Y(t.text).length + (u ? i : 0);
            if (a) for (var f = 0; f < a.length; ++f) {
                var h = a[f];
                if (null == h.to) {
                    var d = kt(s, h.marker);
                    d ? u && (h.to = null == d.to ? null : d.to + c) : h.to = i;
                }
            }
            if (s) for (var p = 0; p < s.length; ++p) {
                var g = s[p];
                if (null != g.to && (g.to += c), null == g.from) kt(a, g.marker) || (g.from = c,
                u && (a || (a = [])).push(g)); else g.from += c, u && (a || (a = [])).push(g);
            }
            a && (a = Mt(a)), s && s != a && (s = Mt(s));
            var m = [ a ];
            if (!u) {
                var v, y = t.text.length - 2;
                if (0 < y && a) for (var b = 0; b < a.length; ++b) null == a[b].to && (v || (v = [])).push(new St(a[b].marker, null, null));
                for (var w = 0; w < y; ++w) m.push(v);
                m.push(s);
            }
            return m;
        }
        function Mt(e) {
            for (var t = 0; t < e.length; ++t) {
                var n = e[t];
                null != n.from && n.from == n.to && !1 !== n.marker.clearWhenEmpty && e.splice(t--, 1);
            }
            return e.length ? e : null;
        }
        function Nt(e) {
            var t = e.markedSpans;
            if (t) {
                for (var n = 0; n < t.length; ++n) t[n].marker.detachLine(e);
                e.markedSpans = null;
            }
        }
        function At(e, t) {
            if (t) {
                for (var n = 0; n < t.length; ++n) t[n].marker.attachLine(e);
                e.markedSpans = t;
            }
        }
        function Ot(e) {
            return e.inclusiveLeft ? -1 : 0;
        }
        function Ft(e) {
            return e.inclusiveRight ? 1 : 0;
        }
        function Dt(e, t) {
            var n = e.lines.length - t.lines.length;
            if (0 != n) return n;
            var r = e.find(), i = t.find(), o = tt(r.from, i.from) || Ot(e) - Ot(t);
            if (o) return -o;
            var l = tt(r.to, i.to) || Ft(e) - Ft(t);
            return l || t.id - e.id;
        }
        function Wt(e, t) {
            var n, r = Ct && e.markedSpans;
            if (r) for (var i = void 0, o = 0; o < r.length; ++o) (i = r[o]).marker.collapsed && null == (t ? i.from : i.to) && (!n || Dt(n, i.marker) < 0) && (n = i.marker);
            return n;
        }
        function Pt(e) {
            return Wt(e, !0);
        }
        function Ht(e) {
            return Wt(e, !1);
        }
        function It(e, t) {
            var n, r = Ct && e.markedSpans;
            if (r) for (var i = 0; i < r.length; ++i) {
                var o = r[i];
                o.marker.collapsed && (null == o.from || o.from < t) && (null == o.to || o.to > t) && (!n || Dt(n, o.marker) < 0) && (n = o.marker);
            }
            return n;
        }
        function Et(e, t, n, r, i) {
            var o = _e(e, t), l = Ct && o.markedSpans;
            if (l) for (var a = 0; a < l.length; ++a) {
                var s = l[a];
                if (s.marker.collapsed) {
                    var u = s.marker.find(0), c = tt(u.from, n) || Ot(s.marker) - Ot(i), f = tt(u.to, r) || Ft(s.marker) - Ft(i);
                    if (!(0 <= c && f <= 0 || c <= 0 && 0 <= f) && (c <= 0 && (s.marker.inclusiveRight && i.inclusiveLeft ? 0 <= tt(u.to, n) : 0 < tt(u.to, n)) || 0 <= c && (s.marker.inclusiveRight && i.inclusiveLeft ? tt(u.from, r) <= 0 : tt(u.from, r) < 0))) return !0;
                }
            }
        }
        function zt(e) {
            for (var t; t = Pt(e); ) e = t.find(-1, !0).line;
            return e;
        }
        function Rt(e, t) {
            var n = _e(e, t), r = zt(n);
            return n == r ? t : $e(r);
        }
        function Bt(e, t) {
            if (t > e.lastLine()) return t;
            var n, r = _e(e, t);
            if (!Ut(e, r)) return t;
            for (;n = Ht(r); ) r = n.find(1, !0).line;
            return $e(r) + 1;
        }
        function Ut(e, t) {
            var n = Ct && t.markedSpans;
            if (n) for (var r = void 0, i = 0; i < n.length; ++i) if ((r = n[i]).marker.collapsed) {
                if (null == r.from) return !0;
                if (!r.marker.widgetNode && 0 == r.from && r.marker.inclusiveLeft && Kt(e, t, r)) return !0;
            }
        }
        function Kt(e, t, n) {
            if (null == n.to) {
                var r = n.marker.find(1, !0);
                return Kt(e, r.line, kt(r.line.markedSpans, n.marker));
            }
            if (n.marker.inclusiveRight && n.to == t.text.length) return !0;
            for (var i = void 0, o = 0; o < t.markedSpans.length; ++o) if ((i = t.markedSpans[o]).marker.collapsed && !i.marker.widgetNode && i.from == n.to && (null == i.to || i.to != n.from) && (i.marker.inclusiveLeft || n.marker.inclusiveRight) && Kt(e, t, i)) return !0;
        }
        function Gt(e) {
            for (var t = 0, n = (e = zt(e)).parent, r = 0; r < n.lines.length; ++r) {
                var i = n.lines[r];
                if (i == e) break;
                t += i.height;
            }
            for (var o = n.parent; o; o = (n = o).parent) for (var l = 0; l < o.children.length; ++l) {
                var a = o.children[l];
                if (a == n) break;
                t += a.height;
            }
            return t;
        }
        function Vt(e) {
            if (0 == e.height) return 0;
            for (var t, n = e.text.length, r = e; t = Pt(r); ) {
                var i = t.find(0, !0);
                r = i.from.line, n += i.from.ch - i.to.ch;
            }
            for (r = e; t = Ht(r); ) {
                var o = t.find(0, !0);
                n -= r.text.length - o.from.ch, n += (r = o.to.line).text.length - o.to.ch;
            }
            return n;
        }
        function jt(e) {
            var n = e.display, t = e.doc;
            n.maxLine = _e(t, t.first), n.maxLineLength = Vt(n.maxLine), n.maxLineChanged = !0,
                t.iter(function(e) {
                    var t = Vt(e);
                    t > n.maxLineLength && (n.maxLineLength = t, n.maxLine = e);
                });
        }
        var _t = function(e, t, n) {
            this.text = e, At(this, t), this.height = n ? n(this) : 1;
        };
        _t.prototype.lineNo = function() {
            return $e(this);
        }, be(_t);
        var qt = {}, Xt = {};
        function Yt(e, t) {
            if (!e || /^\s*$/.test(e)) return null;
            var n = t.addModeClass ? Xt : qt;
            return n[e] || (n[e] = e.replace(/\S+/g, "cm-$&"));
        }
        function $t(e, t) {
            var n = A("span", null, null, b ? "padding-right: .1px" : null), r = {
                pre: A("pre", [ n ], "CodeMirror-line"),
                content: n,
                col: 0,
                pos: 0,
                cm: e,
                trailingSpace: !1,
                splitSpaces: e.getOption("lineWrapping")
            };
            t.measure = {};
            for (var i = 0; i <= (t.rest ? t.rest.length : 0); i++) {
                var o = i ? t.rest[i - 1] : t.line, l = void 0;
                r.pos = 0, r.addToken = Jt, Oe(e.display.measure) && (l = ce(o, e.doc.direction)) && (r.addToken = Qt(r.addToken, l)),
                    r.map = [], tn(o, r, ht(e, o, t != e.display.externalMeasured && $e(o))), o.styleClasses && (o.styleClasses.bgClass && (r.bgClass = P(o.styleClasses.bgClass, r.bgClass || "")),
                o.styleClasses.textClass && (r.textClass = P(o.styleClasses.textClass, r.textClass || ""))),
                0 == r.map.length && r.map.push(0, 0, r.content.appendChild(Ae(e.display.measure))),
                    0 == i ? (t.measure.map = r.map, t.measure.cache = {}) : ((t.measure.maps || (t.measure.maps = [])).push(r.map),
                        (t.measure.caches || (t.measure.caches = [])).push({}));
            }
            if (b) {
                var a = r.content.lastChild;
                (/\bcm-tab\b/.test(a.className) || a.querySelector && a.querySelector(".cm-tab")) && (r.content.className = "cm-tab-wrap-hack");
            }
            return ge(e, "renderLine", e, t.line, r.pre), r.pre.className && (r.textClass = P(r.pre.className, r.textClass || "")),
                r;
        }
        function Zt(e) {
            var t = O("span", "\u2022", "cm-invalidchar");
            return t.title = "\\u" + e.charCodeAt(0).toString(16), t.setAttribute("aria-label", t.title),
                t;
        }
        function Jt(e, t, n, r, i, o, l) {
            if (t) {
                var a, s = e.splitSpaces ? function(e, t) {
                    if (1 < e.length && !/  /.test(e)) return e;
                    for (var n = t, r = "", i = 0; i < e.length; i++) {
                        var o = e.charAt(i);
                        " " != o || !n || i != e.length - 1 && 32 != e.charCodeAt(i + 1) || (o = "\xa0"),
                            r += o, n = " " == o;
                    }
                    return r;
                }(t, e.trailingSpace) : t, u = e.cm.state.specialChars, c = !1;
                if (u.test(t)) {
                    a = document.createDocumentFragment();
                    for (var f = 0; ;) {
                        u.lastIndex = f;
                        var h = u.exec(t), d = h ? h.index - f : t.length - f;
                        if (d) {
                            var p = document.createTextNode(s.slice(f, f + d));
                            x && C < 9 ? a.appendChild(O("span", [ p ])) : a.appendChild(p), e.map.push(e.pos, e.pos + d, p),
                                e.col += d, e.pos += d;
                        }
                        if (!h) break;
                        f += d + 1;
                        var g = void 0;
                        if ("\t" == h[0]) {
                            var m = e.cm.options.tabSize, v = m - e.col % m;
                            (g = a.appendChild(O("span", X(v), "cm-tab"))).setAttribute("role", "presentation"),
                                g.setAttribute("cm-text", "\t"), e.col += v;
                        } else "\r" == h[0] || "\n" == h[0] ? (g = a.appendChild(O("span", "\r" == h[0] ? "\u240d" : "\u2424", "cm-invalidchar"))).setAttribute("cm-text", h[0]) : ((g = e.cm.options.specialCharPlaceholder(h[0])).setAttribute("cm-text", h[0]),
                            x && C < 9 ? a.appendChild(O("span", [ g ])) : a.appendChild(g)), e.col += 1;
                        e.map.push(e.pos, e.pos + 1, g), e.pos++;
                    }
                } else e.col += t.length, a = document.createTextNode(s), e.map.push(e.pos, e.pos + t.length, a),
                x && C < 9 && (c = !0), e.pos += t.length;
                if (e.trailingSpace = 32 == s.charCodeAt(t.length - 1), n || r || i || c || o) {
                    var y = n || "";
                    r && (y += r), i && (y += i);
                    var b = O("span", [ a ], y, o);
                    if (l) for (var w in l) l.hasOwnProperty(w) && "style" != w && "class" != w && b.setAttribute(w, l[w]);
                    return e.content.appendChild(b);
                }
                e.content.appendChild(a);
            }
        }
        function Qt(f, h) {
            return function(e, t, n, r, i, o, l) {
                n = n ? n + " cm-force-border" : "cm-force-border";
                for (var a = e.pos, s = a + t.length; ;) {
                    for (var u = void 0, c = 0; c < h.length && !((u = h[c]).to > a && u.from <= a); c++) ;
                    if (u.to >= s) return f(e, t, n, r, i, o, l);
                    f(e, t.slice(0, u.to - a), n, r, null, o, l), r = null, t = t.slice(u.to - a), a = u.to;
                }
            };
        }
        function en(e, t, n, r) {
            var i = !r && n.widgetNode;
            i && e.map.push(e.pos, e.pos + t, i), !r && e.cm.display.input.needsContentAttribute && (i || (i = e.content.appendChild(document.createElement("span"))),
                i.setAttribute("cm-marker", n.id)), i && (e.cm.display.input.setUneditable(i), e.content.appendChild(i)),
                e.pos += t, e.trailingSpace = !1;
        }
        function tn(e, t, n) {
            var r = e.markedSpans, i = e.text, o = 0;
            if (r) for (var l, a, s, u, c, f, h, d = i.length, p = 0, g = 1, m = "", v = 0; ;) {
                if (v == p) {
                    s = u = c = a = "", f = h = null, v = 1 / 0;
                    for (var y = [], b = void 0, w = 0; w < r.length; ++w) {
                        var x = r[w], C = x.marker;
                        if ("bookmark" == C.type && x.from == p && C.widgetNode) y.push(C); else if (x.from <= p && (null == x.to || x.to > p || C.collapsed && x.to == p && x.from == p)) {
                            if (null != x.to && x.to != p && v > x.to && (v = x.to, u = ""), C.className && (s += " " + C.className),
                            C.css && (a = (a ? a + ";" : "") + C.css), C.startStyle && x.from == p && (c += " " + C.startStyle),
                            C.endStyle && x.to == v && (b || (b = [])).push(C.endStyle, x.to), C.title && ((h || (h = {})).title = C.title),
                                C.attributes) for (var S in C.attributes) (h || (h = {}))[S] = C.attributes[S];
                            C.collapsed && (!f || Dt(f.marker, C) < 0) && (f = x);
                        } else x.from > p && v > x.from && (v = x.from);
                    }
                    if (b) for (var k = 0; k < b.length; k += 2) b[k + 1] == v && (u += " " + b[k]);
                    if (!f || f.from == p) for (var L = 0; L < y.length; ++L) en(t, 0, y[L]);
                    if (f && (f.from || 0) == p) {
                        if (en(t, (null == f.to ? d + 1 : f.to) - p, f.marker, null == f.from), null == f.to) return;
                        f.to == p && (f = !1);
                    }
                }
                if (d <= p) break;
                for (var T = Math.min(d, v); ;) {
                    if (m) {
                        var M = p + m.length;
                        if (!f) {
                            var N = T < M ? m.slice(0, T - p) : m;
                            t.addToken(t, N, l ? l + s : s, c, p + N.length == v ? u : "", a, h);
                        }
                        if (T <= M) {
                            m = m.slice(T - p), p = T;
                            break;
                        }
                        p = M, c = "";
                    }
                    m = i.slice(o, o = n[g++]), l = Yt(n[g++], t.cm.options);
                }
            } else for (var A = 1; A < n.length; A += 2) t.addToken(t, i.slice(o, o = n[A]), Yt(n[A + 1], t.cm.options));
        }
        function nn(e, t, n) {
            this.line = t, this.rest = function(e) {
                for (var t, n; t = Ht(e); ) e = t.find(1, !0).line, (n || (n = [])).push(e);
                return n;
            }(t), this.size = this.rest ? $e(Y(this.rest)) - n + 1 : 1, this.node = this.text = null,
                this.hidden = Ut(e, t);
        }
        function rn(e, t, n) {
            for (var r, i = [], o = t; o < n; o = r) {
                var l = new nn(e.doc, _e(e.doc, o), o);
                r = o + l.size, i.push(l);
            }
            return i;
        }
        var on = null;
        var ln = null;
        function an(e, t) {
            var n = de(e, t);
            if (n.length) {
                var r, i = Array.prototype.slice.call(arguments, 2);
                on ? r = on.delayedCallbacks : ln ? r = ln : (r = ln = [], setTimeout(sn, 0));
                for (var o = function(e) {
                    r.push(function() {
                        return n[e].apply(null, i);
                    });
                }, l = 0; l < n.length; ++l) o(l);
            }
        }
        function sn() {
            var e = ln;
            ln = null;
            for (var t = 0; t < e.length; ++t) e[t]();
        }
        function un(e, t, n, r) {
            for (var i = 0; i < t.changes.length; i++) {
                var o = t.changes[i];
                "text" == o ? hn(e, t) : "gutter" == o ? pn(e, t, n, r) : "class" == o ? dn(e, t) : "widget" == o && gn(e, t, r);
            }
            t.changes = null;
        }
        function cn(e) {
            return e.node == e.text && (e.node = O("div", null, null, "position: relative"),
            e.text.parentNode && e.text.parentNode.replaceChild(e.node, e.text), e.node.appendChild(e.text),
            x && C < 8 && (e.node.style.zIndex = 2)), e.node;
        }
        function fn(e, t) {
            var n = e.display.externalMeasured;
            return n && n.line == t.line ? (e.display.externalMeasured = null, t.measure = n.measure,
                n.built) : $t(e, t);
        }
        function hn(e, t) {
            var n = t.text.className, r = fn(e, t);
            t.text == t.node && (t.node = r.pre), t.text.parentNode.replaceChild(r.pre, t.text),
                t.text = r.pre, r.bgClass != t.bgClass || r.textClass != t.textClass ? (t.bgClass = r.bgClass,
                t.textClass = r.textClass, dn(e, t)) : n && (t.text.className = n);
        }
        function dn(e, t) {
            !function(e, t) {
                var n = t.bgClass ? t.bgClass + " " + (t.line.bgClass || "") : t.line.bgClass;
                if (n && (n += " CodeMirror-linebackground"), t.background) n ? t.background.className = n : (t.background.parentNode.removeChild(t.background),
                    t.background = null); else if (n) {
                    var r = cn(t);
                    t.background = r.insertBefore(O("div", null, n), r.firstChild), e.display.input.setUneditable(t.background);
                }
            }(e, t), t.line.wrapClass ? cn(t).className = t.line.wrapClass : t.node != t.text && (t.node.className = "");
            var n = t.textClass ? t.textClass + " " + (t.line.textClass || "") : t.line.textClass;
            t.text.className = n || "";
        }
        function pn(e, t, n, r) {
            if (t.gutter && (t.node.removeChild(t.gutter), t.gutter = null), t.gutterBackground && (t.node.removeChild(t.gutterBackground),
                t.gutterBackground = null), t.line.gutterClass) {
                var i = cn(t);
                t.gutterBackground = O("div", null, "CodeMirror-gutter-background " + t.line.gutterClass, "left: " + (e.options.fixedGutter ? r.fixedPos : -r.gutterTotalWidth) + "px; width: " + r.gutterTotalWidth + "px"),
                    e.display.input.setUneditable(t.gutterBackground), i.insertBefore(t.gutterBackground, t.text);
            }
            var o = t.line.gutterMarkers;
            if (e.options.lineNumbers || o) {
                var l = cn(t), a = t.gutter = O("div", null, "CodeMirror-gutter-wrapper", "left: " + (e.options.fixedGutter ? r.fixedPos : -r.gutterTotalWidth) + "px");
                if (e.display.input.setUneditable(a), l.insertBefore(a, t.text), t.line.gutterClass && (a.className += " " + t.line.gutterClass),
                !e.options.lineNumbers || o && o["CodeMirror-linenumbers"] || (t.lineNumber = a.appendChild(O("div", Qe(e.options, n), "CodeMirror-linenumber CodeMirror-gutter-elt", "left: " + r.gutterLeft["CodeMirror-linenumbers"] + "px; width: " + e.display.lineNumInnerWidth + "px"))),
                    o) for (var s = 0; s < e.display.gutterSpecs.length; ++s) {
                    var u = e.display.gutterSpecs[s].className, c = o.hasOwnProperty(u) && o[u];
                    c && a.appendChild(O("div", [ c ], "CodeMirror-gutter-elt", "left: " + r.gutterLeft[u] + "px; width: " + r.gutterWidth[u] + "px"));
                }
            }
        }
        function gn(e, t, n) {
            t.alignable && (t.alignable = null);
            for (var r = t.node.firstChild, i = void 0; r; r = i) i = r.nextSibling, "CodeMirror-linewidget" == r.className && t.node.removeChild(r);
            mn(e, t, n);
        }
        function mn(e, t, n) {
            if (vn(e, t.line, t, n, !0), t.rest) for (var r = 0; r < t.rest.length; r++) vn(e, t.rest[r], t, n, !1);
        }
        function vn(e, t, n, r, i) {
            if (t.widgets) for (var o = cn(n), l = 0, a = t.widgets; l < a.length; ++l) {
                var s = a[l], u = O("div", [ s.node ], "CodeMirror-linewidget");
                s.handleMouseEvents || u.setAttribute("cm-ignore-events", "true"), yn(s, u, n, r),
                    e.display.input.setUneditable(u), i && s.above ? o.insertBefore(u, n.gutter || n.text) : o.appendChild(u),
                    an(s, "redraw");
            }
        }
        function yn(e, t, n, r) {
            if (e.noHScroll) {
                (n.alignable || (n.alignable = [])).push(t);
                var i = r.wrapperWidth;
                t.style.left = r.fixedPos + "px", e.coverGutter || (i -= r.gutterTotalWidth, t.style.paddingLeft = r.gutterTotalWidth + "px"),
                    t.style.width = i + "px";
            }
            e.coverGutter && (t.style.zIndex = 5, t.style.position = "relative", e.noHScroll || (t.style.marginLeft = -r.gutterTotalWidth + "px"));
        }
        function bn(e) {
            if (null != e.height) return e.height;
            var t = e.doc.cm;
            if (!t) return 0;
            if (!F(document.body, e.node)) {
                var n = "position: relative;";
                e.coverGutter && (n += "margin-left: -" + t.display.gutters.offsetWidth + "px;"),
                e.noHScroll && (n += "width: " + t.display.wrapper.clientWidth + "px;"), N(t.display.measure, O("div", [ e.node ], null, n));
            }
            return e.height = e.node.parentNode.offsetHeight;
        }
        function wn(e, t) {
            for (var n = ke(t); n != e.wrapper; n = n.parentNode) if (!n || 1 == n.nodeType && "true" == n.getAttribute("cm-ignore-events") || n.parentNode == e.sizer && n != e.mover) return !0;
        }
        function xn(e) {
            return e.lineSpace.offsetTop;
        }
        function Cn(e) {
            return e.mover.offsetHeight - e.lineSpace.offsetHeight;
        }
        function Sn(e) {
            if (e.cachedPaddingH) return e.cachedPaddingH;
            var t = N(e.measure, O("pre", "x")), n = window.getComputedStyle ? window.getComputedStyle(t) : t.currentStyle, r = {
                left: parseInt(n.paddingLeft),
                right: parseInt(n.paddingRight)
            };
            return isNaN(r.left) || isNaN(r.right) || (e.cachedPaddingH = r), r;
        }
        function kn(e) {
            return U - e.display.nativeBarWidth;
        }
        function Ln(e) {
            return e.display.scroller.clientWidth - kn(e) - e.display.barWidth;
        }
        function Tn(e) {
            return e.display.scroller.clientHeight - kn(e) - e.display.barHeight;
        }
        function Mn(e, t, n) {
            if (e.line == t) return {
                map: e.measure.map,
                cache: e.measure.cache
            };
            for (var r = 0; r < e.rest.length; r++) if (e.rest[r] == t) return {
                map: e.measure.maps[r],
                cache: e.measure.caches[r]
            };
            for (var i = 0; i < e.rest.length; i++) if ($e(e.rest[i]) > n) return {
                map: e.measure.maps[i],
                cache: e.measure.caches[i],
                before: !0
            };
        }
        function Nn(e, t, n, r) {
            return Fn(e, On(e, t), n, r);
        }
        function An(e, t) {
            if (t >= e.display.viewFrom && t < e.display.viewTo) return e.display.view[lr(e, t)];
            var n = e.display.externalMeasured;
            return n && t >= n.lineN && t < n.lineN + n.size ? n : void 0;
        }
        function On(e, t) {
            var n = $e(t), r = An(e, n);
            r && !r.text ? r = null : r && r.changes && (un(e, r, n, tr(e)), e.curOp.forceUpdate = !0),
            r || (r = function(e, t) {
                var n = $e(t = zt(t)), r = e.display.externalMeasured = new nn(e.doc, t, n);
                r.lineN = n;
                var i = r.built = $t(e, r);
                return r.text = i.pre, N(e.display.lineMeasure, i.pre), r;
            }(e, t));
            var i = Mn(r, t, n);
            return {
                line: t,
                view: r,
                rect: null,
                map: i.map,
                cache: i.cache,
                before: i.before,
                hasHeights: !1
            };
        }
        function Fn(e, t, n, r, i) {
            t.before && (n = -1);
            var o, l = n + (r || "");
            return t.cache.hasOwnProperty(l) ? o = t.cache[l] : (t.rect || (t.rect = t.view.text.getBoundingClientRect()),
            t.hasHeights || (!function(e, t, n) {
                var r = e.options.lineWrapping, i = r && Ln(e);
                if (!t.measure.heights || r && t.measure.width != i) {
                    var o = t.measure.heights = [];
                    if (r) {
                        t.measure.width = i;
                        for (var l = t.text.firstChild.getClientRects(), a = 0; a < l.length - 1; a++) {
                            var s = l[a], u = l[a + 1];
                            2 < Math.abs(s.bottom - u.bottom) && o.push((s.bottom + u.top) / 2 - n.top);
                        }
                    }
                    o.push(n.bottom - n.top);
                }
            }(e, t.view, t.rect), t.hasHeights = !0), (o = function(e, t, n, r) {
                var i, o = Pn(t.map, n, r), l = o.node, a = o.start, s = o.end, u = o.collapse;
                if (3 == l.nodeType) {
                    for (var c = 0; c < 4; c++) {
                        for (;a && ie(t.line.text.charAt(o.coverStart + a)); ) --a;
                        for (;o.coverStart + s < o.coverEnd && ie(t.line.text.charAt(o.coverStart + s)); ) ++s;
                        if ((i = x && C < 9 && 0 == a && s == o.coverEnd - o.coverStart ? l.parentNode.getBoundingClientRect() : Hn(L(l, a, s).getClientRects(), r)).left || i.right || 0 == a) break;
                        s = a, a -= 1, u = "right";
                    }
                    x && C < 11 && (i = function(e, t) {
                        if (!window.screen || null == screen.logicalXDPI || screen.logicalXDPI == screen.deviceXDPI || !function(e) {
                            if (null != He) return He;
                            var t = N(e, O("span", "x")), n = t.getBoundingClientRect(), r = L(t, 0, 1).getBoundingClientRect();
                            return He = 1 < Math.abs(n.left - r.left);
                        }(e)) return t;
                        var n = screen.logicalXDPI / screen.deviceXDPI, r = screen.logicalYDPI / screen.deviceYDPI;
                        return {
                            left: t.left * n,
                            right: t.right * n,
                            top: t.top * r,
                            bottom: t.bottom * r
                        };
                    }(e.display.measure, i));
                } else {
                    var f;
                    0 < a && (u = r = "right"), i = e.options.lineWrapping && 1 < (f = l.getClientRects()).length ? f["right" == r ? f.length - 1 : 0] : l.getBoundingClientRect();
                }
                if (x && C < 9 && !a && (!i || !i.left && !i.right)) {
                    var h = l.parentNode.getClientRects()[0];
                    i = h ? {
                        left: h.left,
                        right: h.left + er(e.display),
                        top: h.top,
                        bottom: h.bottom
                    } : Wn;
                }
                for (var d = i.top - t.rect.top, p = i.bottom - t.rect.top, g = (d + p) / 2, m = t.view.measure.heights, v = 0; v < m.length - 1 && !(g < m[v]); v++) ;
                var y = v ? m[v - 1] : 0, b = m[v], w = {
                    left: ("right" == u ? i.right : i.left) - t.rect.left,
                    right: ("left" == u ? i.left : i.right) - t.rect.left,
                    top: y,
                    bottom: b
                };
                i.left || i.right || (w.bogus = !0);
                e.options.singleCursorHeightPerLine || (w.rtop = d, w.rbottom = p);
                return w;
            }(e, t, n, r)).bogus || (t.cache[l] = o)), {
                left: o.left,
                right: o.right,
                top: i ? o.rtop : o.top,
                bottom: i ? o.rbottom : o.bottom
            };
        }
        var Dn, Wn = {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        };
        function Pn(e, t, n) {
            for (var r, i, o, l, a, s, u = 0; u < e.length; u += 3) if (a = e[u], s = e[u + 1],
                t < a ? (i = 0, o = 1, l = "left") : t < s ? o = (i = t - a) + 1 : (u == e.length - 3 || t == s && e[u + 3] > t) && (i = (o = s - a) - 1,
                s <= t && (l = "right")), null != i) {
                if (r = e[u + 2], a == s && n == (r.insertLeft ? "left" : "right") && (l = n), "left" == n && 0 == i) for (;u && e[u - 2] == e[u - 3] && e[u - 1].insertLeft; ) r = e[2 + (u -= 3)],
                    l = "left";
                if ("right" == n && i == s - a) for (;u < e.length - 3 && e[u + 3] == e[u + 4] && !e[u + 5].insertLeft; ) r = e[(u += 3) + 2],
                    l = "right";
                break;
            }
            return {
                node: r,
                start: i,
                end: o,
                collapse: l,
                coverStart: a,
                coverEnd: s
            };
        }
        function Hn(e, t) {
            var n = Wn;
            if ("left" == t) for (var r = 0; r < e.length && (n = e[r]).left == n.right; r++) ; else for (var i = e.length - 1; 0 <= i && (n = e[i]).left == n.right; i--) ;
            return n;
        }
        function In(e) {
            if (e.measure && (e.measure.cache = {}, e.measure.heights = null, e.rest)) for (var t = 0; t < e.rest.length; t++) e.measure.caches[t] = {};
        }
        function En(e) {
            e.display.externalMeasure = null, M(e.display.lineMeasure);
            for (var t = 0; t < e.display.view.length; t++) In(e.display.view[t]);
        }
        function zn(e) {
            En(e), e.display.cachedCharWidth = e.display.cachedTextHeight = e.display.cachedPaddingH = null,
            e.options.lineWrapping || (e.display.maxLineChanged = !0), e.display.lineNumChars = null;
        }
        function Rn() {
            return l && f ? -(document.body.getBoundingClientRect().left - parseInt(getComputedStyle(document.body).marginLeft)) : window.pageXOffset || (document.documentElement || document.body).scrollLeft;
        }
        function Bn() {
            return l && f ? -(document.body.getBoundingClientRect().top - parseInt(getComputedStyle(document.body).marginTop)) : window.pageYOffset || (document.documentElement || document.body).scrollTop;
        }
        function Un(e) {
            var t = 0;
            if (e.widgets) for (var n = 0; n < e.widgets.length; ++n) e.widgets[n].above && (t += bn(e.widgets[n]));
            return t;
        }
        function Kn(e, t, n, r, i) {
            if (!i) {
                var o = Un(t);
                n.top += o, n.bottom += o;
            }
            if ("line" == r) return n;
            r || (r = "local");
            var l = Gt(t);
            if ("local" == r ? l += xn(e.display) : l -= e.display.viewOffset, "page" == r || "window" == r) {
                var a = e.display.lineSpace.getBoundingClientRect();
                l += a.top + ("window" == r ? 0 : Bn());
                var s = a.left + ("window" == r ? 0 : Rn());
                n.left += s, n.right += s;
            }
            return n.top += l, n.bottom += l, n;
        }
        function Gn(e, t, n) {
            if ("div" == n) return t;
            var r = t.left, i = t.top;
            if ("page" == n) r -= Rn(), i -= Bn(); else if ("local" == n || !n) {
                var o = e.display.sizer.getBoundingClientRect();
                r += o.left, i += o.top;
            }
            var l = e.display.lineSpace.getBoundingClientRect();
            return {
                left: r - l.left,
                top: i - l.top
            };
        }
        function Vn(e, t, n, r, i) {
            return r || (r = _e(e.doc, t.line)), Kn(e, r, Nn(e, r, t.ch, i), n);
        }
        function jn(r, e, i, o, l, a) {
            function s(e, t) {
                var n = Fn(r, l, e, t ? "right" : "left", a);
                return t ? n.left = n.right : n.right = n.left, Kn(r, o, n, i);
            }
            o = o || _e(r.doc, e.line), l || (l = On(r, o));
            var u = ce(o, r.doc.direction), t = e.ch, n = e.sticky;
            if (t >= o.text.length ? (t = o.text.length, n = "before") : t <= 0 && (t = 0, n = "after"),
                !u) return s("before" == n ? t - 1 : t, "before" == n);
            function c(e, t, n) {
                return s(n ? e - 1 : e, 1 == u[t].level != n);
            }
            var f = se(u, t, n), h = ae, d = c(t, f, "before" == n);
            return null != h && (d.other = c(t, h, "before" != n)), d;
        }
        function _n(e, t) {
            var n = 0;
            t = at(e.doc, t), e.options.lineWrapping || (n = er(e.display) * t.ch);
            var r = _e(e.doc, t.line), i = Gt(r) + xn(e.display);
            return {
                left: n,
                right: n,
                top: i,
                bottom: i + r.height
            };
        }
        function qn(e, t, n, r, i) {
            var o = et(e, t, n);
            return o.xRel = i, r && (o.outside = !0), o;
        }
        function Xn(e, t, n) {
            var r = e.doc;
            if ((n += e.display.viewOffset) < 0) return qn(r.first, 0, null, !0, -1);
            var i = Ze(r, n), o = r.first + r.size - 1;
            if (o < i) return qn(r.first + r.size - 1, _e(r, o).text.length, null, !0, 1);
            t < 0 && (t = 0);
            for (var l = _e(r, i); ;) {
                var a = Jn(e, l, i, t, n), s = It(l, a.ch + (0 < a.xRel ? 1 : 0));
                if (!s) return a;
                var u = s.find(1);
                if (u.line == i) return u;
                l = _e(r, i = u.line);
            }
        }
        function Yn(t, e, n, r) {
            r -= Un(e);
            var i = e.text.length, o = le(function(e) {
                return Fn(t, n, e - 1).bottom <= r;
            }, i, 0);
            return {
                begin: o,
                end: i = le(function(e) {
                    return Fn(t, n, e).top > r;
                }, o, i)
            };
        }
        function $n(e, t, n, r) {
            return n || (n = On(e, t)), Yn(e, t, n, Kn(e, t, Fn(e, n, r), "line").top);
        }
        function Zn(e, t, n, r) {
            return !(e.bottom <= n) && (e.top > n || (r ? e.left : e.right) > t);
        }
        function Jn(n, e, t, r, i) {
            i -= Gt(e);
            var o = On(n, e), l = Un(e), a = 0, s = e.text.length, u = !0, c = ce(e, n.doc.direction);
            if (c) {
                var f = (n.options.lineWrapping ? function(e, t, n, r, i, o, l) {
                    var a = Yn(e, t, r, l), s = a.begin, u = a.end;
                    /\s/.test(t.text.charAt(u - 1)) && u--;
                    for (var c = null, f = null, h = 0; h < i.length; h++) {
                        var d = i[h];
                        if (!(d.from >= u || d.to <= s)) {
                            var p = 1 != d.level, g = Fn(e, r, p ? Math.min(u, d.to) - 1 : Math.max(s, d.from)).right, m = g < o ? o - g + 1e9 : g - o;
                            (!c || m < f) && (c = d, f = m);
                        }
                    }
                    c || (c = i[i.length - 1]);
                    c.from < s && (c = {
                        from: s,
                        to: c.to,
                        level: c.level
                    });
                    c.to > u && (c = {
                        from: c.from,
                        to: u,
                        level: c.level
                    });
                    return c;
                } : function(r, i, o, l, a, s, u) {
                    var e = le(function(e) {
                        var t = a[e], n = 1 != t.level;
                        return Zn(jn(r, et(o, n ? t.to : t.from, n ? "before" : "after"), "line", i, l), s, u, !0);
                    }, 0, a.length - 1), t = a[e];
                    if (0 < e) {
                        var n = 1 != t.level, c = jn(r, et(o, n ? t.from : t.to, n ? "after" : "before"), "line", i, l);
                        Zn(c, s, u, !0) && c.top > u && (t = a[e - 1]);
                    }
                    return t;
                })(n, e, t, o, c, r, i);
                a = (u = 1 != f.level) ? f.from : f.to - 1, s = u ? f.to : f.from - 1;
            }
            var h, d, p = null, g = null, m = le(function(e) {
                var t = Fn(n, o, e);
                return t.top += l, t.bottom += l, !!Zn(t, r, i, !1) && (t.top <= i && t.left <= r && (p = e,
                    g = t), !0);
            }, a, s), v = !1;
            if (g) {
                var y = r - g.left < g.right - r, b = y == u;
                m = p + (b ? 0 : 1), d = b ? "after" : "before", h = y ? g.left : g.right;
            } else {
                u || m != s && m != a || m++, d = 0 == m ? "after" : m == e.text.length ? "before" : Fn(n, o, m - (u ? 1 : 0)).bottom + l <= i == u ? "after" : "before";
                var w = jn(n, et(t, m, d), "line", e, o);
                h = w.left, v = i < w.top || i >= w.bottom;
            }
            return qn(t, m = oe(e.text, m, 1), d, v, r - h);
        }
        function Qn(e) {
            if (null != e.cachedTextHeight) return e.cachedTextHeight;
            if (null == Dn) {
                Dn = O("pre");
                for (var t = 0; t < 49; ++t) Dn.appendChild(document.createTextNode("x")), Dn.appendChild(O("br"));
                Dn.appendChild(document.createTextNode("x"));
            }
            N(e.measure, Dn);
            var n = Dn.offsetHeight / 50;
            return 3 < n && (e.cachedTextHeight = n), M(e.measure), n || 1;
        }
        function er(e) {
            if (null != e.cachedCharWidth) return e.cachedCharWidth;
            var t = O("span", "xxxxxxxxxx"), n = O("pre", [ t ]);
            N(e.measure, n);
            var r = t.getBoundingClientRect(), i = (r.right - r.left) / 10;
            return 2 < i && (e.cachedCharWidth = i), i || 10;
        }
        function tr(e) {
            for (var t = e.display, n = {}, r = {}, i = t.gutters.clientLeft, o = t.gutters.firstChild, l = 0; o; o = o.nextSibling,
                ++l) {
                var a = e.display.gutterSpecs[l].className;
                n[a] = o.offsetLeft + o.clientLeft + i, r[a] = o.clientWidth;
            }
            return {
                fixedPos: nr(t),
                gutterTotalWidth: t.gutters.offsetWidth,
                gutterLeft: n,
                gutterWidth: r,
                wrapperWidth: t.wrapper.clientWidth
            };
        }
        function nr(e) {
            return e.scroller.getBoundingClientRect().left - e.sizer.getBoundingClientRect().left;
        }
        function rr(r) {
            var i = Qn(r.display), o = r.options.lineWrapping, l = o && Math.max(5, r.display.scroller.clientWidth / er(r.display) - 3);
            return function(e) {
                if (Ut(r.doc, e)) return 0;
                var t = 0;
                if (e.widgets) for (var n = 0; n < e.widgets.length; n++) e.widgets[n].height && (t += e.widgets[n].height);
                return o ? t + (Math.ceil(e.text.length / l) || 1) * i : t + i;
            };
        }
        function ir(e) {
            var t = e.doc, n = rr(e);
            t.iter(function(e) {
                var t = n(e);
                t != e.height && Ye(e, t);
            });
        }
        function or(e, t, n, r) {
            var i = e.display;
            if (!n && "true" == ke(t).getAttribute("cm-not-content")) return null;
            var o, l, a = i.lineSpace.getBoundingClientRect();
            try {
                o = t.clientX - a.left, l = t.clientY - a.top;
            } catch (t) {
                return null;
            }
            var s, u = Xn(e, o, l);
            if (r && 1 == u.xRel && (s = _e(e.doc, u.line).text).length == u.ch) {
                var c = z(s, s.length, e.options.tabSize) - s.length;
                u = et(u.line, Math.max(0, Math.round((o - Sn(e.display).left) / er(e.display)) - c));
            }
            return u;
        }
        function lr(e, t) {
            if (t >= e.display.viewTo) return null;
            if ((t -= e.display.viewFrom) < 0) return null;
            for (var n = e.display.view, r = 0; r < n.length; r++) if ((t -= n[r].size) < 0) return r;
        }
        function ar(e, t, n, r) {
            null == t && (t = e.doc.first), null == n && (n = e.doc.first + e.doc.size), r || (r = 0);
            var i = e.display;
            if (r && n < i.viewTo && (null == i.updateLineNumbers || i.updateLineNumbers > t) && (i.updateLineNumbers = t),
                e.curOp.viewChanged = !0, t >= i.viewTo) Ct && Rt(e.doc, t) < i.viewTo && ur(e); else if (n <= i.viewFrom) Ct && Bt(e.doc, n + r) > i.viewFrom ? ur(e) : (i.viewFrom += r,
                i.viewTo += r); else if (t <= i.viewFrom && n >= i.viewTo) ur(e); else if (t <= i.viewFrom) {
                var o = cr(e, n, n + r, 1);
                o ? (i.view = i.view.slice(o.index), i.viewFrom = o.lineN, i.viewTo += r) : ur(e);
            } else if (n >= i.viewTo) {
                var l = cr(e, t, t, -1);
                l ? (i.view = i.view.slice(0, l.index), i.viewTo = l.lineN) : ur(e);
            } else {
                var a = cr(e, t, t, -1), s = cr(e, n, n + r, 1);
                a && s ? (i.view = i.view.slice(0, a.index).concat(rn(e, a.lineN, s.lineN)).concat(i.view.slice(s.index)),
                    i.viewTo += r) : ur(e);
            }
            var u = i.externalMeasured;
            u && (n < u.lineN ? u.lineN += r : t < u.lineN + u.size && (i.externalMeasured = null));
        }
        function sr(e, t, n) {
            e.curOp.viewChanged = !0;
            var r = e.display, i = e.display.externalMeasured;
            if (i && t >= i.lineN && t < i.lineN + i.size && (r.externalMeasured = null), !(t < r.viewFrom || t >= r.viewTo)) {
                var o = r.view[lr(e, t)];
                if (null != o.node) {
                    var l = o.changes || (o.changes = []);
                    -1 == B(l, n) && l.push(n);
                }
            }
        }
        function ur(e) {
            e.display.viewFrom = e.display.viewTo = e.doc.first, e.display.view = [], e.display.viewOffset = 0;
        }
        function cr(e, t, n, r) {
            var i, o = lr(e, t), l = e.display.view;
            if (!Ct || n == e.doc.first + e.doc.size) return {
                index: o,
                lineN: n
            };
            for (var a = e.display.viewFrom, s = 0; s < o; s++) a += l[s].size;
            if (a != t) {
                if (0 < r) {
                    if (o == l.length - 1) return null;
                    i = a + l[o].size - t, o++;
                } else i = a - t;
                t += i, n += i;
            }
            for (;Rt(e.doc, n) != n; ) {
                if (o == (r < 0 ? 0 : l.length - 1)) return null;
                n += r * l[o - (r < 0 ? 1 : 0)].size, o += r;
            }
            return {
                index: o,
                lineN: n
            };
        }
        function fr(e) {
            for (var t = e.display.view, n = 0, r = 0; r < t.length; r++) {
                var i = t[r];
                i.hidden || i.node && !i.changes || ++n;
            }
            return n;
        }
        function hr(e) {
            e.display.input.showSelection(e.display.input.prepareSelection());
        }
        function dr(e, t) {
            void 0 === t && (t = !0);
            for (var n = e.doc, r = {}, i = r.cursors = document.createDocumentFragment(), o = r.selection = document.createDocumentFragment(), l = 0; l < n.sel.ranges.length; l++) if (t || l != n.sel.primIndex) {
                var a = n.sel.ranges[l];
                if (!(a.from().line >= e.display.viewTo || a.to().line < e.display.viewFrom)) {
                    var s = a.empty();
                    (s || e.options.showCursorWhenSelecting) && pr(e, a.head, i), s || mr(e, a, o);
                }
            }
            return r;
        }
        function pr(e, t, n) {
            var r = jn(e, t, "div", null, null, !e.options.singleCursorHeightPerLine), i = n.appendChild(O("div", "\xa0", "CodeMirror-cursor"));
            if (i.style.left = r.left + "px", i.style.top = r.top + "px", i.style.height = Math.max(0, r.bottom - r.top) * e.options.cursorHeight + "px",
                r.other) {
                var o = n.appendChild(O("div", "\xa0", "CodeMirror-cursor CodeMirror-secondarycursor"));
                o.style.display = "", o.style.left = r.other.left + "px", o.style.top = r.other.top + "px",
                    o.style.height = .85 * (r.other.bottom - r.other.top) + "px";
            }
        }
        function gr(e, t) {
            return e.top - t.top || e.left - t.left;
        }
        function mr(l, e, t) {
            var n = l.display, r = l.doc, i = document.createDocumentFragment(), o = Sn(l.display), T = o.left, M = Math.max(n.sizerWidth, Ln(l) - n.sizer.offsetLeft) - o.right, N = "ltr" == r.direction;
            function A(e, t, n, r) {
                t < 0 && (t = 0), t = Math.round(t), r = Math.round(r), i.appendChild(O("div", null, "CodeMirror-selected", "position: absolute; left: " + e + "px;\n                             top: " + t + "px; width: " + (null == n ? M - e : n) + "px;\n                             height: " + (r - t) + "px"));
            }
            function a(n, y, b) {
                var w, x, o = _e(r, n), C = o.text.length;
                function S(e, t) {
                    return Vn(l, et(n, e), "div", o, t);
                }
                function k(e, t, n) {
                    var r = $n(l, o, null, e), i = "ltr" == t == ("after" == n) ? "left" : "right";
                    return S("after" == n ? r.begin : r.end - (/\s/.test(o.text.charAt(r.end - 1)) ? 2 : 1), i)[i];
                }
                var L = ce(o, r.direction);
                return function(e, t, n, r) {
                    if (!e) return r(t, n, "ltr", 0);
                    for (var i = !1, o = 0; o < e.length; ++o) {
                        var l = e[o];
                        (l.from < n && l.to > t || t == n && l.to == t) && (r(Math.max(l.from, t), Math.min(l.to, n), 1 == l.level ? "rtl" : "ltr", o),
                            i = !0);
                    }
                    i || r(t, n, "ltr");
                }(L, y || 0, null == b ? C : b, function(e, t, n, r) {
                    var i = "ltr" == n, o = S(e, i ? "left" : "right"), l = S(t - 1, i ? "right" : "left"), a = null == y && 0 == e, s = null == b && t == C, u = 0 == r, c = !L || r == L.length - 1;
                    if (l.top - o.top <= 3) {
                        var f = (N ? s : a) && c, h = (N ? a : s) && u ? T : (i ? o : l).left, d = f ? M : (i ? l : o).right;
                        A(h, o.top, d - h, o.bottom);
                    } else {
                        var p, g, m, v;
                        i ? (p = N && a && u ? T : o.left, g = N ? M : k(e, n, "before"), m = N ? T : k(t, n, "after"),
                            v = N && s && c ? M : l.right) : (p = N ? k(e, n, "before") : T, g = !N && a && u ? M : o.right,
                            m = !N && s && c ? T : l.left, v = N ? k(t, n, "after") : M), A(p, o.top, g - p, o.bottom),
                        o.bottom < l.top && A(T, o.bottom, null, l.top), A(m, l.top, v - m, l.bottom);
                    }
                    (!w || gr(o, w) < 0) && (w = o), gr(l, w) < 0 && (w = l), (!x || gr(o, x) < 0) && (x = o),
                    gr(l, x) < 0 && (x = l);
                }), {
                    start: w,
                    end: x
                };
            }
            var s = e.from(), u = e.to();
            if (s.line == u.line) a(s.line, s.ch, u.ch); else {
                var c = _e(r, s.line), f = _e(r, u.line), h = zt(c) == zt(f), d = a(s.line, s.ch, h ? c.text.length + 1 : null).end, p = a(u.line, h ? 0 : null, u.ch).start;
                h && (d.top < p.top - 2 ? (A(d.right, d.top, null, d.bottom), A(T, p.top, p.left, p.bottom)) : A(d.right, d.top, p.left - d.right, d.bottom)),
                d.bottom < p.top && A(T, d.bottom, null, p.top);
            }
            t.appendChild(i);
        }
        function vr(e) {
            if (e.state.focused) {
                var t = e.display;
                clearInterval(t.blinker);
                var n = !0;
                t.cursorDiv.style.visibility = "", 0 < e.options.cursorBlinkRate ? t.blinker = setInterval(function() {
                    return t.cursorDiv.style.visibility = (n = !n) ? "" : "hidden";
                }, e.options.cursorBlinkRate) : e.options.cursorBlinkRate < 0 && (t.cursorDiv.style.visibility = "hidden");
            }
        }
        function yr(e) {
            e.state.focused || (e.display.input.focus(), wr(e));
        }
        function br(e) {
            e.state.delayingBlurEvent = !0, setTimeout(function() {
                e.state.delayingBlurEvent && (e.state.delayingBlurEvent = !1, xr(e));
            }, 100);
        }
        function wr(e, t) {
            e.state.delayingBlurEvent && (e.state.delayingBlurEvent = !1), "nocursor" != e.options.readOnly && (e.state.focused || (ge(e, "focus", e, t),
                e.state.focused = !0, W(e.display.wrapper, "CodeMirror-focused"), e.curOp || e.display.selForContextMenu == e.doc.sel || (e.display.input.reset(),
            b && setTimeout(function() {
                return e.display.input.reset(!0);
            }, 20)), e.display.input.receivedFocus()), vr(e));
        }
        function xr(e, t) {
            e.state.delayingBlurEvent || (e.state.focused && (ge(e, "blur", e, t), e.state.focused = !1,
                T(e.display.wrapper, "CodeMirror-focused")), clearInterval(e.display.blinker), setTimeout(function() {
                e.state.focused || (e.display.shift = !1);
            }, 150));
        }
        function Cr(e) {
            for (var t = e.display, n = t.lineDiv.offsetTop, r = 0; r < t.view.length; r++) {
                var i = t.view[r], o = e.options.lineWrapping, l = void 0, a = 0;
                if (!i.hidden) {
                    if (x && C < 8) {
                        var s = i.node.offsetTop + i.node.offsetHeight;
                        l = s - n, n = s;
                    } else {
                        var u = i.node.getBoundingClientRect();
                        l = u.bottom - u.top, !o && i.text.firstChild && (a = i.text.firstChild.getBoundingClientRect().right - u.left - 1);
                    }
                    var c = i.line.height - l;
                    if ((.005 < c || c < -.005) && (Ye(i.line, l), Sr(i.line), i.rest)) for (var f = 0; f < i.rest.length; f++) Sr(i.rest[f]);
                    if (a > e.display.sizerWidth) {
                        var h = Math.ceil(a / er(e.display));
                        h > e.display.maxLineLength && (e.display.maxLineLength = h, e.display.maxLine = i.line,
                            e.display.maxLineChanged = !0);
                    }
                }
            }
        }
        function Sr(e) {
            if (e.widgets) for (var t = 0; t < e.widgets.length; ++t) {
                var n = e.widgets[t], r = n.node.parentNode;
                r && (n.height = r.offsetHeight);
            }
        }
        function kr(e, t, n) {
            var r = n && null != n.top ? Math.max(0, n.top) : e.scroller.scrollTop;
            r = Math.floor(r - xn(e));
            var i = n && null != n.bottom ? n.bottom : r + e.wrapper.clientHeight, o = Ze(t, r), l = Ze(t, i);
            if (n && n.ensure) {
                var a = n.ensure.from.line, s = n.ensure.to.line;
                a < o ? l = Ze(t, Gt(_e(t, o = a)) + e.wrapper.clientHeight) : Math.min(s, t.lastLine()) >= l && (o = Ze(t, Gt(_e(t, s)) - e.wrapper.clientHeight),
                    l = s);
            }
            return {
                from: o,
                to: Math.max(l, o + 1)
            };
        }
        function Lr(e, t) {
            var n = e.display, r = Qn(e.display);
            t.top < 0 && (t.top = 0);
            var i = e.curOp && null != e.curOp.scrollTop ? e.curOp.scrollTop : n.scroller.scrollTop, o = Tn(e), l = {};
            t.bottom - t.top > o && (t.bottom = t.top + o);
            var a = e.doc.height + Cn(n), s = t.top < r, u = t.bottom > a - r;
            if (t.top < i) l.scrollTop = s ? 0 : t.top; else if (t.bottom > i + o) {
                var c = Math.min(t.top, (u ? a : t.bottom) - o);
                c != i && (l.scrollTop = c);
            }
            var f = e.curOp && null != e.curOp.scrollLeft ? e.curOp.scrollLeft : n.scroller.scrollLeft, h = Ln(e) - (e.options.fixedGutter ? n.gutters.offsetWidth : 0), d = t.right - t.left > h;
            return d && (t.right = t.left + h), t.left < 10 ? l.scrollLeft = 0 : t.left < f ? l.scrollLeft = Math.max(0, t.left - (d ? 0 : 10)) : t.right > h + f - 3 && (l.scrollLeft = t.right + (d ? 0 : 10) - h),
                l;
        }
        function Tr(e, t) {
            null != t && (Ar(e), e.curOp.scrollTop = (null == e.curOp.scrollTop ? e.doc.scrollTop : e.curOp.scrollTop) + t);
        }
        function Mr(e) {
            Ar(e);
            var t = e.getCursor();
            e.curOp.scrollToPos = {
                from: t,
                to: t,
                margin: e.options.cursorScrollMargin
            };
        }
        function Nr(e, t, n) {
            null == t && null == n || Ar(e), null != t && (e.curOp.scrollLeft = t), null != n && (e.curOp.scrollTop = n);
        }
        function Ar(e) {
            var t = e.curOp.scrollToPos;
            t && (e.curOp.scrollToPos = null, Or(e, _n(e, t.from), _n(e, t.to), t.margin));
        }
        function Or(e, t, n, r) {
            var i = Lr(e, {
                left: Math.min(t.left, n.left),
                top: Math.min(t.top, n.top) - r,
                right: Math.max(t.right, n.right),
                bottom: Math.max(t.bottom, n.bottom) + r
            });
            Nr(e, i.scrollLeft, i.scrollTop);
        }
        function Fr(e, t) {
            Math.abs(e.doc.scrollTop - t) < 2 || (g || ri(e, {
                top: t
            }), Dr(e, t, !0), g && ri(e), Jr(e, 100));
        }
        function Dr(e, t, n) {
            t = Math.min(e.display.scroller.scrollHeight - e.display.scroller.clientHeight, t),
            (e.display.scroller.scrollTop != t || n) && (e.doc.scrollTop = t, e.display.scrollbars.setScrollTop(t),
            e.display.scroller.scrollTop != t && (e.display.scroller.scrollTop = t));
        }
        function Wr(e, t, n, r) {
            t = Math.min(t, e.display.scroller.scrollWidth - e.display.scroller.clientWidth),
            (n ? t == e.doc.scrollLeft : Math.abs(e.doc.scrollLeft - t) < 2) && !r || (e.doc.scrollLeft = t,
                li(e), e.display.scroller.scrollLeft != t && (e.display.scroller.scrollLeft = t),
                e.display.scrollbars.setScrollLeft(t));
        }
        function Pr(e) {
            var t = e.display, n = t.gutters.offsetWidth, r = Math.round(e.doc.height + Cn(e.display));
            return {
                clientHeight: t.scroller.clientHeight,
                viewHeight: t.wrapper.clientHeight,
                scrollWidth: t.scroller.scrollWidth,
                clientWidth: t.scroller.clientWidth,
                viewWidth: t.wrapper.clientWidth,
                barLeft: e.options.fixedGutter ? n : 0,
                docHeight: r,
                scrollHeight: r + kn(e) + t.barHeight,
                nativeBarWidth: t.nativeBarWidth,
                gutterWidth: n
            };
        }
        var Hr = function(e, t, n) {
            this.cm = n;
            var r = this.vert = O("div", [ O("div", null, null, "min-width: 1px") ], "CodeMirror-vscrollbar"), i = this.horiz = O("div", [ O("div", null, null, "height: 100%; min-height: 1px") ], "CodeMirror-hscrollbar");
            r.tabIndex = i.tabIndex = -1, e(r), e(i), he(r, "scroll", function() {
                r.clientHeight && t(r.scrollTop, "vertical");
            }), he(i, "scroll", function() {
                i.clientWidth && t(i.scrollLeft, "horizontal");
            }), this.checkedZeroWidth = !1, x && C < 8 && (this.horiz.style.minHeight = this.vert.style.minWidth = "18px");
        };
        Hr.prototype.update = function(e) {
            var t = e.scrollWidth > e.clientWidth + 1, n = e.scrollHeight > e.clientHeight + 1, r = e.nativeBarWidth;
            if (n) {
                this.vert.style.display = "block", this.vert.style.bottom = t ? r + "px" : "0";
                var i = e.viewHeight - (t ? r : 0);
                this.vert.firstChild.style.height = Math.max(0, e.scrollHeight - e.clientHeight + i) + "px";
            } else this.vert.style.display = "", this.vert.firstChild.style.height = "0";
            if (t) {
                this.horiz.style.display = "block", this.horiz.style.right = n ? r + "px" : "0",
                    this.horiz.style.left = e.barLeft + "px";
                var o = e.viewWidth - e.barLeft - (n ? r : 0);
                this.horiz.firstChild.style.width = Math.max(0, e.scrollWidth - e.clientWidth + o) + "px";
            } else this.horiz.style.display = "", this.horiz.firstChild.style.width = "0";
            return !this.checkedZeroWidth && 0 < e.clientHeight && (0 == r && this.zeroWidthHack(),
                this.checkedZeroWidth = !0), {
                right: n ? r : 0,
                bottom: t ? r : 0
            };
        }, Hr.prototype.setScrollLeft = function(e) {
            this.horiz.scrollLeft != e && (this.horiz.scrollLeft = e), this.disableHoriz && this.enableZeroWidthBar(this.horiz, this.disableHoriz, "horiz");
        }, Hr.prototype.setScrollTop = function(e) {
            this.vert.scrollTop != e && (this.vert.scrollTop = e), this.disableVert && this.enableZeroWidthBar(this.vert, this.disableVert, "vert");
        }, Hr.prototype.zeroWidthHack = function() {
            var e = w && !a ? "12px" : "18px";
            this.horiz.style.height = this.vert.style.width = e, this.horiz.style.pointerEvents = this.vert.style.pointerEvents = "none",
                this.disableHoriz = new R(), this.disableVert = new R();
        }, Hr.prototype.enableZeroWidthBar = function(n, r, i) {
            n.style.pointerEvents = "auto", r.set(1e3, function e() {
                var t = n.getBoundingClientRect();
                ("vert" == i ? document.elementFromPoint(t.right - 1, (t.top + t.bottom) / 2) : document.elementFromPoint((t.right + t.left) / 2, t.bottom - 1)) != n ? n.style.pointerEvents = "none" : r.set(1e3, e);
            });
        }, Hr.prototype.clear = function() {
            var e = this.horiz.parentNode;
            e.removeChild(this.horiz), e.removeChild(this.vert);
        };
        var Ir = function() {};
        function Er(e, t) {
            t || (t = Pr(e));
            var n = e.display.barWidth, r = e.display.barHeight;
            zr(e, t);
            for (var i = 0; i < 4 && n != e.display.barWidth || r != e.display.barHeight; i++) n != e.display.barWidth && e.options.lineWrapping && Cr(e),
                zr(e, Pr(e)), n = e.display.barWidth, r = e.display.barHeight;
        }
        function zr(e, t) {
            var n = e.display, r = n.scrollbars.update(t);
            n.sizer.style.paddingRight = (n.barWidth = r.right) + "px", n.sizer.style.paddingBottom = (n.barHeight = r.bottom) + "px",
                n.heightForcer.style.borderBottom = r.bottom + "px solid transparent", r.right && r.bottom ? (n.scrollbarFiller.style.display = "block",
                n.scrollbarFiller.style.height = r.bottom + "px", n.scrollbarFiller.style.width = r.right + "px") : n.scrollbarFiller.style.display = "",
                r.bottom && e.options.coverGutterNextToScrollbar && e.options.fixedGutter ? (n.gutterFiller.style.display = "block",
                    n.gutterFiller.style.height = r.bottom + "px", n.gutterFiller.style.width = t.gutterWidth + "px") : n.gutterFiller.style.display = "";
        }
        Ir.prototype.update = function() {
            return {
                bottom: 0,
                right: 0
            };
        }, Ir.prototype.setScrollLeft = function() {}, Ir.prototype.setScrollTop = function() {},
            Ir.prototype.clear = function() {};
        var Rr = {
            native: Hr,
            null: Ir
        };
        function Br(n) {
            n.display.scrollbars && (n.display.scrollbars.clear(), n.display.scrollbars.addClass && T(n.display.wrapper, n.display.scrollbars.addClass)),
                n.display.scrollbars = new Rr[n.options.scrollbarStyle](function(e) {
                    n.display.wrapper.insertBefore(e, n.display.scrollbarFiller), he(e, "mousedown", function() {
                        n.state.focused && setTimeout(function() {
                            return n.display.input.focus();
                        }, 0);
                    }), e.setAttribute("cm-not-content", "true");
                }, function(e, t) {
                    "horizontal" == t ? Wr(n, e) : Fr(n, e);
                }, n), n.display.scrollbars.addClass && W(n.display.wrapper, n.display.scrollbars.addClass);
        }
        var Ur = 0;
        function Kr(e) {
            var t;
            e.curOp = {
                cm: e,
                viewChanged: !1,
                startHeight: e.doc.height,
                forceUpdate: !1,
                updateInput: 0,
                typing: !1,
                changeObjs: null,
                cursorActivityHandlers: null,
                cursorActivityCalled: 0,
                selectionChanged: !1,
                updateMaxLine: !1,
                scrollLeft: null,
                scrollTop: null,
                scrollToPos: null,
                focus: !1,
                id: ++Ur
            }, t = e.curOp, on ? on.ops.push(t) : t.ownsGroup = on = {
                ops: [ t ],
                delayedCallbacks: []
            };
        }
        function Gr(e) {
            var t = e.curOp;
            t && function(e, t) {
                var n = e.ownsGroup;
                if (n) try {
                    !function(e) {
                        var t = e.delayedCallbacks, n = 0;
                        do {
                            for (;n < t.length; n++) t[n].call(null);
                            for (var r = 0; r < e.ops.length; r++) {
                                var i = e.ops[r];
                                if (i.cursorActivityHandlers) for (;i.cursorActivityCalled < i.cursorActivityHandlers.length; ) i.cursorActivityHandlers[i.cursorActivityCalled++].call(null, i.cm);
                            }
                        } while (n < t.length);
                    }(n);
                } finally {
                    on = null, t(n);
                }
            }(t, function(e) {
                for (var t = 0; t < e.ops.length; t++) e.ops[t].cm.curOp = null;
                !function(e) {
                    for (var t = e.ops, n = 0; n < t.length; n++) Vr(t[n]);
                    for (var r = 0; r < t.length; r++) (i = t[r]).updatedDisplay = i.mustUpdate && ti(i.cm, i.update);
                    var i;
                    for (var o = 0; o < t.length; o++) jr(t[o]);
                    for (var l = 0; l < t.length; l++) _r(t[l]);
                    for (var a = 0; a < t.length; a++) qr(t[a]);
                }(e);
            });
        }
        function Vr(e) {
            var t, n, r = e.cm, i = r.display;
            !(n = (t = r).display).scrollbarsClipped && n.scroller.offsetWidth && (n.nativeBarWidth = n.scroller.offsetWidth - n.scroller.clientWidth,
                n.heightForcer.style.height = kn(t) + "px", n.sizer.style.marginBottom = -n.nativeBarWidth + "px",
                n.sizer.style.borderRightWidth = kn(t) + "px", n.scrollbarsClipped = !0), e.updateMaxLine && jt(r),
                e.mustUpdate = e.viewChanged || e.forceUpdate || null != e.scrollTop || e.scrollToPos && (e.scrollToPos.from.line < i.viewFrom || e.scrollToPos.to.line >= i.viewTo) || i.maxLineChanged && r.options.lineWrapping,
                e.update = e.mustUpdate && new ei(r, e.mustUpdate && {
                    top: e.scrollTop,
                    ensure: e.scrollToPos
                }, e.forceUpdate);
        }
        function jr(e) {
            var t = e.cm, n = t.display;
            e.updatedDisplay && Cr(t), e.barMeasure = Pr(t), n.maxLineChanged && !t.options.lineWrapping && (e.adjustWidthTo = Nn(t, n.maxLine, n.maxLine.text.length).left + 3,
                t.display.sizerWidth = e.adjustWidthTo, e.barMeasure.scrollWidth = Math.max(n.scroller.clientWidth, n.sizer.offsetLeft + e.adjustWidthTo + kn(t) + t.display.barWidth),
                e.maxScrollLeft = Math.max(0, n.sizer.offsetLeft + e.adjustWidthTo - Ln(t))), (e.updatedDisplay || e.selectionChanged) && (e.preparedSelection = n.input.prepareSelection());
        }
        function _r(e) {
            var t = e.cm;
            null != e.adjustWidthTo && (t.display.sizer.style.minWidth = e.adjustWidthTo + "px",
            e.maxScrollLeft < t.doc.scrollLeft && Wr(t, Math.min(t.display.scroller.scrollLeft, e.maxScrollLeft), !0),
                t.display.maxLineChanged = !1);
            var n = e.focus && e.focus == D();
            e.preparedSelection && t.display.input.showSelection(e.preparedSelection, n), (e.updatedDisplay || e.startHeight != t.doc.height) && Er(t, e.barMeasure),
            e.updatedDisplay && oi(t, e.barMeasure), e.selectionChanged && vr(t), t.state.focused && e.updateInput && t.display.input.reset(e.typing),
            n && yr(e.cm);
        }
        function qr(e) {
            var t = e.cm, n = t.display, r = t.doc;
            (e.updatedDisplay && ni(t, e.update), null == n.wheelStartX || null == e.scrollTop && null == e.scrollLeft && !e.scrollToPos || (n.wheelStartX = n.wheelStartY = null),
            null != e.scrollTop && Dr(t, e.scrollTop, e.forceScroll), null != e.scrollLeft && Wr(t, e.scrollLeft, !0, !0),
                e.scrollToPos) && function(e, t) {
                if (!me(e, "scrollCursorIntoView")) {
                    var n = e.display, r = n.sizer.getBoundingClientRect(), i = null;
                    if (t.top + r.top < 0 ? i = !0 : t.bottom + r.top > (window.innerHeight || document.documentElement.clientHeight) && (i = !1),
                    null != i && !u) {
                        var o = O("div", "\u200b", null, "position: absolute;\n                         top: " + (t.top - n.viewOffset - xn(e.display)) + "px;\n                         height: " + (t.bottom - t.top + kn(e) + n.barHeight) + "px;\n                         left: " + t.left + "px; width: " + Math.max(2, t.right - t.left) + "px;");
                        e.display.lineSpace.appendChild(o), o.scrollIntoView(i), e.display.lineSpace.removeChild(o);
                    }
                }
            }(t, function(e, t, n, r) {
                var i;
                null == r && (r = 0), e.options.lineWrapping || t != n || (n = "before" == (t = t.ch ? et(t.line, "before" == t.sticky ? t.ch - 1 : t.ch, "after") : t).sticky ? et(t.line, t.ch + 1, "before") : t);
                for (var o = 0; o < 5; o++) {
                    var l = !1, a = jn(e, t), s = n && n != t ? jn(e, n) : a, u = Lr(e, i = {
                        left: Math.min(a.left, s.left),
                        top: Math.min(a.top, s.top) - r,
                        right: Math.max(a.left, s.left),
                        bottom: Math.max(a.bottom, s.bottom) + r
                    }), c = e.doc.scrollTop, f = e.doc.scrollLeft;
                    if (null != u.scrollTop && (Fr(e, u.scrollTop), 1 < Math.abs(e.doc.scrollTop - c) && (l = !0)),
                    null != u.scrollLeft && (Wr(e, u.scrollLeft), 1 < Math.abs(e.doc.scrollLeft - f) && (l = !0)),
                        !l) break;
                }
                return i;
            }(t, at(r, e.scrollToPos.from), at(r, e.scrollToPos.to), e.scrollToPos.margin));
            var i = e.maybeHiddenMarkers, o = e.maybeUnhiddenMarkers;
            if (i) for (var l = 0; l < i.length; ++l) i[l].lines.length || ge(i[l], "hide");
            if (o) for (var a = 0; a < o.length; ++a) o[a].lines.length && ge(o[a], "unhide");
            n.wrapper.offsetHeight && (r.scrollTop = t.display.scroller.scrollTop), e.changeObjs && ge(t, "changes", t, e.changeObjs),
            e.update && e.update.finish();
        }
        function Xr(e, t) {
            if (e.curOp) return t();
            Kr(e);
            try {
                return t();
            } finally {
                Gr(e);
            }
        }
        function Yr(e, t) {
            return function() {
                if (e.curOp) return t.apply(e, arguments);
                Kr(e);
                try {
                    return t.apply(e, arguments);
                } finally {
                    Gr(e);
                }
            };
        }
        function $r(e) {
            return function() {
                if (this.curOp) return e.apply(this, arguments);
                Kr(this);
                try {
                    return e.apply(this, arguments);
                } finally {
                    Gr(this);
                }
            };
        }
        function Zr(t) {
            return function() {
                var e = this.cm;
                if (!e || e.curOp) return t.apply(this, arguments);
                Kr(e);
                try {
                    return t.apply(this, arguments);
                } finally {
                    Gr(e);
                }
            };
        }
        function Jr(e, t) {
            e.doc.highlightFrontier < e.display.viewTo && e.state.highlight.set(t, I(Qr, e));
        }
        function Qr(s) {
            var u = s.doc;
            if (!(u.highlightFrontier >= s.display.viewTo)) {
                var c = +new Date() + s.options.workTime, f = dt(s, u.highlightFrontier), h = [];
                u.iter(f.line, Math.min(u.first + u.size, s.display.viewTo + 500), function(e) {
                    if (f.line >= s.display.viewFrom) {
                        var t = e.styles, n = e.text.length > s.options.maxHighlightLength ? Ke(u.mode, f.state) : null, r = ft(s, e, f, !0);
                        n && (f.state = n), e.styles = r.styles;
                        var i = e.styleClasses, o = r.classes;
                        o ? e.styleClasses = o : i && (e.styleClasses = null);
                        for (var l = !t || t.length != e.styles.length || i != o && (!i || !o || i.bgClass != o.bgClass || i.textClass != o.textClass), a = 0; !l && a < t.length; ++a) l = t[a] != e.styles[a];
                        l && h.push(f.line), e.stateAfter = f.save(), f.nextLine();
                    } else e.text.length <= s.options.maxHighlightLength && pt(s, e.text, f), e.stateAfter = f.line % 5 == 0 ? f.save() : null,
                        f.nextLine();
                    if (+new Date() > c) return Jr(s, s.options.workDelay), !0;
                }), u.highlightFrontier = f.line, u.modeFrontier = Math.max(u.modeFrontier, f.line),
                h.length && Xr(s, function() {
                    for (var e = 0; e < h.length; e++) sr(s, h[e], "text");
                });
            }
        }
        var ei = function(e, t, n) {
            var r = e.display;
            this.viewport = t, this.visible = kr(r, e.doc, t), this.editorIsHidden = !r.wrapper.offsetWidth,
                this.wrapperHeight = r.wrapper.clientHeight, this.wrapperWidth = r.wrapper.clientWidth,
                this.oldDisplayWidth = Ln(e), this.force = n, this.dims = tr(e), this.events = [];
        };
        function ti(e, t) {
            var n = e.display, r = e.doc;
            if (t.editorIsHidden) return ur(e), !1;
            if (!t.force && t.visible.from >= n.viewFrom && t.visible.to <= n.viewTo && (null == n.updateLineNumbers || n.updateLineNumbers >= n.viewTo) && n.renderedView == n.view && 0 == fr(e)) return !1;
            ai(e) && (ur(e), t.dims = tr(e));
            var i = r.first + r.size, o = Math.max(t.visible.from - e.options.viewportMargin, r.first), l = Math.min(i, t.visible.to + e.options.viewportMargin);
            n.viewFrom < o && o - n.viewFrom < 20 && (o = Math.max(r.first, n.viewFrom)), n.viewTo > l && n.viewTo - l < 20 && (l = Math.min(i, n.viewTo)),
            Ct && (o = Rt(e.doc, o), l = Bt(e.doc, l));
            var a, s, u, c, f = o != n.viewFrom || l != n.viewTo || n.lastWrapHeight != t.wrapperHeight || n.lastWrapWidth != t.wrapperWidth;
            s = o, u = l, 0 == (c = (a = e).display).view.length || s >= c.viewTo || u <= c.viewFrom ? (c.view = rn(a, s, u),
                c.viewFrom = s) : (c.viewFrom > s ? c.view = rn(a, s, c.viewFrom).concat(c.view) : c.viewFrom < s && (c.view = c.view.slice(lr(a, s))),
                c.viewFrom = s, c.viewTo < u ? c.view = c.view.concat(rn(a, c.viewTo, u)) : c.viewTo > u && (c.view = c.view.slice(0, lr(a, u)))),
                c.viewTo = u, n.viewOffset = Gt(_e(e.doc, n.viewFrom)), e.display.mover.style.top = n.viewOffset + "px";
            var h = fr(e);
            if (!f && 0 == h && !t.force && n.renderedView == n.view && (null == n.updateLineNumbers || n.updateLineNumbers >= n.viewTo)) return !1;
            var d = function(e) {
                if (e.hasFocus()) return null;
                var t = D();
                if (!t || !F(e.display.lineDiv, t)) return null;
                var n = {
                    activeElt: t
                };
                if (window.getSelection) {
                    var r = window.getSelection();
                    r.anchorNode && r.extend && F(e.display.lineDiv, r.anchorNode) && (n.anchorNode = r.anchorNode,
                        n.anchorOffset = r.anchorOffset, n.focusNode = r.focusNode, n.focusOffset = r.focusOffset);
                }
                return n;
            }(e);
            return 4 < h && (n.lineDiv.style.display = "none"), function(n, e, t) {
                var r = n.display, i = n.options.lineNumbers, o = r.lineDiv, l = o.firstChild;
                function a(e) {
                    var t = e.nextSibling;
                    return b && w && n.display.currentWheelTarget == e ? e.style.display = "none" : e.parentNode.removeChild(e),
                        t;
                }
                for (var s = r.view, u = r.viewFrom, c = 0; c < s.length; c++) {
                    var f = s[c];
                    if (f.hidden) ; else if (f.node && f.node.parentNode == o) {
                        for (;l != f.node; ) l = a(l);
                        var h = i && null != e && e <= u && f.lineNumber;
                        f.changes && (-1 < B(f.changes, "gutter") && (h = !1), un(n, f, u, t)), h && (M(f.lineNumber),
                            f.lineNumber.appendChild(document.createTextNode(Qe(n.options, u)))), l = f.node.nextSibling;
                    } else {
                        var d = (m = u, v = t, void 0, y = fn(p = n, g = f), g.text = g.node = y.pre, y.bgClass && (g.bgClass = y.bgClass),
                        y.textClass && (g.textClass = y.textClass), dn(p, g), pn(p, g, m, v), mn(p, g, v),
                            g.node);
                        o.insertBefore(d, l);
                    }
                    u += f.size;
                }
                var p, g, m, v, y;
                for (;l; ) l = a(l);
            }(e, n.updateLineNumbers, t.dims), 4 < h && (n.lineDiv.style.display = ""), n.renderedView = n.view,
                function(e) {
                    if (e && e.activeElt && e.activeElt != D() && (e.activeElt.focus(), e.anchorNode && F(document.body, e.anchorNode) && F(document.body, e.focusNode))) {
                        var t = window.getSelection(), n = document.createRange();
                        n.setEnd(e.anchorNode, e.anchorOffset), n.collapse(!1), t.removeAllRanges(), t.addRange(n),
                            t.extend(e.focusNode, e.focusOffset);
                    }
                }(d), M(n.cursorDiv), M(n.selectionDiv), n.gutters.style.height = n.sizer.style.minHeight = 0,
            f && (n.lastWrapHeight = t.wrapperHeight, n.lastWrapWidth = t.wrapperWidth, Jr(e, 400)),
                !(n.updateLineNumbers = null);
        }
        function ni(e, t) {
            for (var n = t.viewport, r = !0; (r && e.options.lineWrapping && t.oldDisplayWidth != Ln(e) || (n && null != n.top && (n = {
                top: Math.min(e.doc.height + Cn(e.display) - Tn(e), n.top)
            }), t.visible = kr(e.display, e.doc, n), !(t.visible.from >= e.display.viewFrom && t.visible.to <= e.display.viewTo))) && ti(e, t); r = !1) {
                Cr(e);
                var i = Pr(e);
                hr(e), Er(e, i), oi(e, i), t.force = !1;
            }
            t.signal(e, "update", e), e.display.viewFrom == e.display.reportedViewFrom && e.display.viewTo == e.display.reportedViewTo || (t.signal(e, "viewportChange", e, e.display.viewFrom, e.display.viewTo),
                e.display.reportedViewFrom = e.display.viewFrom, e.display.reportedViewTo = e.display.viewTo);
        }
        function ri(e, t) {
            var n = new ei(e, t);
            if (ti(e, n)) {
                Cr(e), ni(e, n);
                var r = Pr(e);
                hr(e), Er(e, r), oi(e, r), n.finish();
            }
        }
        function ii(e) {
            var t = e.gutters.offsetWidth;
            e.sizer.style.marginLeft = t + "px";
        }
        function oi(e, t) {
            e.display.sizer.style.minHeight = t.docHeight + "px", e.display.heightForcer.style.top = t.docHeight + "px",
                e.display.gutters.style.height = t.docHeight + e.display.barHeight + kn(e) + "px";
        }
        function li(e) {
            var t = e.display, n = t.view;
            if (t.alignWidgets || t.gutters.firstChild && e.options.fixedGutter) {
                for (var r = nr(t) - t.scroller.scrollLeft + e.doc.scrollLeft, i = t.gutters.offsetWidth, o = r + "px", l = 0; l < n.length; l++) if (!n[l].hidden) {
                    e.options.fixedGutter && (n[l].gutter && (n[l].gutter.style.left = o), n[l].gutterBackground && (n[l].gutterBackground.style.left = o));
                    var a = n[l].alignable;
                    if (a) for (var s = 0; s < a.length; s++) a[s].style.left = o;
                }
                e.options.fixedGutter && (t.gutters.style.left = r + i + "px");
            }
        }
        function ai(e) {
            if (!e.options.lineNumbers) return !1;
            var t = e.doc, n = Qe(e.options, t.first + t.size - 1), r = e.display;
            if (n.length != r.lineNumChars) {
                var i = r.measure.appendChild(O("div", [ O("div", n) ], "CodeMirror-linenumber CodeMirror-gutter-elt")), o = i.firstChild.offsetWidth, l = i.offsetWidth - o;
                return r.lineGutter.style.width = "", r.lineNumInnerWidth = Math.max(o, r.lineGutter.offsetWidth - l) + 1,
                    r.lineNumWidth = r.lineNumInnerWidth + l, r.lineNumChars = r.lineNumInnerWidth ? n.length : -1,
                    r.lineGutter.style.width = r.lineNumWidth + "px", ii(e.display), !0;
            }
            return !1;
        }
        function si(e, t) {
            for (var n = [], r = !1, i = 0; i < e.length; i++) {
                var o = e[i], l = null;
                if ("string" != typeof o && (l = o.style, o = o.className), "CodeMirror-linenumbers" == o) {
                    if (!t) continue;
                    r = !0;
                }
                n.push({
                    className: o,
                    style: l
                });
            }
            return t && !r && n.push({
                className: "CodeMirror-linenumbers",
                style: null
            }), n;
        }
        function ui(e) {
            var t = e.gutters, n = e.gutterSpecs;
            M(t), e.lineGutter = null;
            for (var r = 0; r < n.length; ++r) {
                var i = n[r], o = i.className, l = i.style, a = t.appendChild(O("div", null, "CodeMirror-gutter " + o));
                l && (a.style.cssText = l), "CodeMirror-linenumbers" == o && ((e.lineGutter = a).style.width = (e.lineNumWidth || 1) + "px");
            }
            t.style.display = n.length ? "" : "none", ii(e);
        }
        function ci(e) {
            ui(e.display), ar(e), li(e);
        }
        function fi(e, t, n, r) {
            var i = this;
            this.input = n, i.scrollbarFiller = O("div", null, "CodeMirror-scrollbar-filler"),
                i.scrollbarFiller.setAttribute("cm-not-content", "true"), i.gutterFiller = O("div", null, "CodeMirror-gutter-filler"),
                i.gutterFiller.setAttribute("cm-not-content", "true"), i.lineDiv = A("div", null, "CodeMirror-code"),
                i.selectionDiv = O("div", null, null, "position: relative; z-index: 1"), i.cursorDiv = O("div", null, "CodeMirror-cursors"),
                i.measure = O("div", null, "CodeMirror-measure"), i.lineMeasure = O("div", null, "CodeMirror-measure"),
                i.lineSpace = A("div", [ i.measure, i.lineMeasure, i.selectionDiv, i.cursorDiv, i.lineDiv ], null, "position: relative; outline: none");
            var o = A("div", [ i.lineSpace ], "CodeMirror-lines");
            i.mover = O("div", [ o ], null, "position: relative"), i.sizer = O("div", [ i.mover ], "CodeMirror-sizer"),
                i.sizerWidth = null, i.heightForcer = O("div", null, null, "position: absolute; height: " + U + "px; width: 1px;"),
                i.gutters = O("div", null, "CodeMirror-gutters"), i.lineGutter = null, i.scroller = O("div", [ i.sizer, i.heightForcer, i.gutters ], "CodeMirror-scroll"),
                i.scroller.setAttribute("tabIndex", "-1"), i.wrapper = O("div", [ i.scrollbarFiller, i.gutterFiller, i.scroller ], "CodeMirror"),
            x && C < 8 && (i.gutters.style.zIndex = -1, i.scroller.style.paddingRight = 0),
            b || g && h || (i.scroller.draggable = !0), e && (e.appendChild ? e.appendChild(i.wrapper) : e(i.wrapper)),
                i.viewFrom = i.viewTo = t.first, i.reportedViewFrom = i.reportedViewTo = t.first,
                i.view = [], i.renderedView = null, i.externalMeasured = null, i.viewOffset = 0,
                i.lastWrapHeight = i.lastWrapWidth = 0, i.updateLineNumbers = null, i.nativeBarWidth = i.barHeight = i.barWidth = 0,
                i.scrollbarsClipped = !1, i.lineNumWidth = i.lineNumInnerWidth = i.lineNumChars = null,
                i.alignWidgets = !1, i.cachedCharWidth = i.cachedTextHeight = i.cachedPaddingH = null,
                i.maxLine = null, i.maxLineLength = 0, i.maxLineChanged = !1, i.wheelDX = i.wheelDY = i.wheelStartX = i.wheelStartY = null,
                i.shift = !1, i.selForContextMenu = null, i.activeTouch = null, i.gutterSpecs = si(r.gutters, r.lineNumbers),
                ui(i), n.init(i);
        }
        ei.prototype.signal = function(e, t) {
            ye(e, t) && this.events.push(arguments);
        }, ei.prototype.finish = function() {
            for (var e = 0; e < this.events.length; e++) ge.apply(null, this.events[e]);
        };
        var hi = 0, di = null;
        function pi(e) {
            var t = e.wheelDeltaX, n = e.wheelDeltaY;
            return null == t && e.detail && e.axis == e.HORIZONTAL_AXIS && (t = e.detail), null == n && e.detail && e.axis == e.VERTICAL_AXIS ? n = e.detail : null == n && (n = e.wheelDelta),
                {
                    x: t,
                    y: n
                };
        }
        function gi(e) {
            var t = pi(e);
            return t.x *= di, t.y *= di, t;
        }
        function mi(e, t) {
            var n = pi(t), r = n.x, i = n.y, o = e.display, l = o.scroller, a = l.scrollWidth > l.clientWidth, s = l.scrollHeight > l.clientHeight;
            if (r && a || i && s) {
                if (i && w && b) e: for (var u = t.target, c = o.view; u != l; u = u.parentNode) for (var f = 0; f < c.length; f++) if (c[f].node == u) {
                    e.display.currentWheelTarget = u;
                    break e;
                }
                if (r && !g && !m && null != di) return i && s && Fr(e, Math.max(0, l.scrollTop + i * di)),
                    Wr(e, Math.max(0, l.scrollLeft + r * di)), (!i || i && s) && we(t), void (o.wheelStartX = null);
                if (i && null != di) {
                    var h = i * di, d = e.doc.scrollTop, p = d + o.wrapper.clientHeight;
                    h < 0 ? d = Math.max(0, d + h - 50) : p = Math.min(e.doc.height, p + h + 50), ri(e, {
                        top: d,
                        bottom: p
                    });
                }
                hi < 20 && (null == o.wheelStartX ? (o.wheelStartX = l.scrollLeft, o.wheelStartY = l.scrollTop,
                    o.wheelDX = r, o.wheelDY = i, setTimeout(function() {
                    if (null != o.wheelStartX) {
                        var e = l.scrollLeft - o.wheelStartX, t = l.scrollTop - o.wheelStartY, n = t && o.wheelDY && t / o.wheelDY || e && o.wheelDX && e / o.wheelDX;
                        o.wheelStartX = o.wheelStartY = null, n && (di = (di * hi + n) / (hi + 1), ++hi);
                    }
                }, 200)) : (o.wheelDX += r, o.wheelDY += i));
            }
        }
        x ? di = -.53 : g ? di = 15 : l ? di = -.7 : s && (di = -1 / 3);
        var vi = function(e, t) {
            this.ranges = e, this.primIndex = t;
        };
        vi.prototype.primary = function() {
            return this.ranges[this.primIndex];
        }, vi.prototype.equals = function(e) {
            if (e == this) return !0;
            if (e.primIndex != this.primIndex || e.ranges.length != this.ranges.length) return !1;
            for (var t = 0; t < this.ranges.length; t++) {
                var n = this.ranges[t], r = e.ranges[t];
                if (!nt(n.anchor, r.anchor) || !nt(n.head, r.head)) return !1;
            }
            return !0;
        }, vi.prototype.deepCopy = function() {
            for (var e = [], t = 0; t < this.ranges.length; t++) e[t] = new yi(rt(this.ranges[t].anchor), rt(this.ranges[t].head));
            return new vi(e, this.primIndex);
        }, vi.prototype.somethingSelected = function() {
            for (var e = 0; e < this.ranges.length; e++) if (!this.ranges[e].empty()) return !0;
            return !1;
        }, vi.prototype.contains = function(e, t) {
            t || (t = e);
            for (var n = 0; n < this.ranges.length; n++) {
                var r = this.ranges[n];
                if (0 <= tt(t, r.from()) && tt(e, r.to()) <= 0) return n;
            }
            return -1;
        };
        var yi = function(e, t) {
            this.anchor = e, this.head = t;
        };
        function bi(e, t, n) {
            var r = e && e.options.selectionsMayTouch, i = t[n];
            t.sort(function(e, t) {
                return tt(e.from(), t.from());
            }), n = B(t, i);
            for (var o = 1; o < t.length; o++) {
                var l = t[o], a = t[o - 1], s = tt(a.to(), l.from());
                if (r && !l.empty() ? 0 < s : 0 <= s) {
                    var u = ot(a.from(), l.from()), c = it(a.to(), l.to()), f = a.empty() ? l.from() == l.head : a.from() == a.head;
                    o <= n && --n, t.splice(--o, 2, new yi(f ? c : u, f ? u : c));
                }
            }
            return new vi(t, n);
        }
        function wi(e, t) {
            return new vi([ new yi(e, t || e) ], 0);
        }
        function xi(e) {
            return e.text ? et(e.from.line + e.text.length - 1, Y(e.text).length + (1 == e.text.length ? e.from.ch : 0)) : e.to;
        }
        function Ci(e, t) {
            if (tt(e, t.from) < 0) return e;
            if (tt(e, t.to) <= 0) return xi(t);
            var n = e.line + t.text.length - (t.to.line - t.from.line) - 1, r = e.ch;
            return e.line == t.to.line && (r += xi(t).ch - t.to.ch), et(n, r);
        }
        function Si(e, t) {
            for (var n = [], r = 0; r < e.sel.ranges.length; r++) {
                var i = e.sel.ranges[r];
                n.push(new yi(Ci(i.anchor, t), Ci(i.head, t)));
            }
            return bi(e.cm, n, e.sel.primIndex);
        }
        function ki(e, t, n) {
            return e.line == t.line ? et(n.line, e.ch - t.ch + n.ch) : et(n.line + (e.line - t.line), e.ch);
        }
        function Li(e) {
            e.doc.mode = Re(e.options, e.doc.modeOption), Ti(e);
        }
        function Ti(e) {
            e.doc.iter(function(e) {
                e.stateAfter && (e.stateAfter = null), e.styles && (e.styles = null);
            }), e.doc.modeFrontier = e.doc.highlightFrontier = e.doc.first, Jr(e, 100), e.state.modeGen++,
            e.curOp && ar(e);
        }
        function Mi(e, t) {
            return 0 == t.from.ch && 0 == t.to.ch && "" == Y(t.text) && (!e.cm || e.cm.options.wholeLineUpdateBefore);
        }
        function Ni(e, r, t, i) {
            function o(e) {
                return t ? t[e] : null;
            }
            function n(e, t, n) {
                !function(e, t, n, r) {
                    e.text = t, e.stateAfter && (e.stateAfter = null), e.styles && (e.styles = null),
                    null != e.order && (e.order = null), Nt(e), At(e, n);
                    var i = r ? r(e) : 1;
                    i != e.height && Ye(e, i);
                }(e, t, n, i), an(e, "change", e, r);
            }
            function l(e, t) {
                for (var n = [], r = e; r < t; ++r) n.push(new _t(u[r], o(r), i));
                return n;
            }
            var a = r.from, s = r.to, u = r.text, c = _e(e, a.line), f = _e(e, s.line), h = Y(u), d = o(u.length - 1), p = s.line - a.line;
            if (r.full) e.insert(0, l(0, u.length)), e.remove(u.length, e.size - u.length); else if (Mi(e, r)) {
                var g = l(0, u.length - 1);
                n(f, f.text, d), p && e.remove(a.line, p), g.length && e.insert(a.line, g);
            } else if (c == f) if (1 == u.length) n(c, c.text.slice(0, a.ch) + h + c.text.slice(s.ch), d); else {
                var m = l(1, u.length - 1);
                m.push(new _t(h + c.text.slice(s.ch), d, i)), n(c, c.text.slice(0, a.ch) + u[0], o(0)),
                    e.insert(a.line + 1, m);
            } else if (1 == u.length) n(c, c.text.slice(0, a.ch) + u[0] + f.text.slice(s.ch), o(0)),
                e.remove(a.line + 1, p); else {
                n(c, c.text.slice(0, a.ch) + u[0], o(0)), n(f, h + f.text.slice(s.ch), d);
                var v = l(1, u.length - 1);
                1 < p && e.remove(a.line + 1, p - 1), e.insert(a.line + 1, v);
            }
            an(e, "change", e, r);
        }
        function Ai(e, a, s) {
            !function e(t, n, r) {
                if (t.linked) for (var i = 0; i < t.linked.length; ++i) {
                    var o = t.linked[i];
                    if (o.doc != n) {
                        var l = r && o.sharedHist;
                        s && !l || (a(o.doc, l), e(o.doc, t, l));
                    }
                }
            }(e, null, !0);
        }
        function Oi(e, t) {
            if (t.cm) throw new Error("This document is already in use.");
            ir((e.doc = t).cm = e), Li(e), Fi(e), e.options.lineWrapping || jt(e), e.options.mode = t.modeOption,
                ar(e);
        }
        function Fi(e) {
            ("rtl" == e.doc.direction ? W : T)(e.display.lineDiv, "CodeMirror-rtl");
        }
        function Di(e) {
            this.done = [], this.undone = [], this.undoDepth = 1 / 0, this.lastModTime = this.lastSelTime = 0,
                this.lastOp = this.lastSelOp = null, this.lastOrigin = this.lastSelOrigin = null,
                this.generation = this.maxGeneration = e || 1;
        }
        function Wi(e, t) {
            var n = {
                from: rt(t.from),
                to: xi(t),
                text: qe(e, t.from, t.to)
            };
            return zi(e, n, t.from.line, t.to.line + 1), Ai(e, function(e) {
                return zi(e, n, t.from.line, t.to.line + 1);
            }, !0), n;
        }
        function Pi(e) {
            for (;e.length; ) {
                if (!Y(e).ranges) break;
                e.pop();
            }
        }
        function Hi(e, t, n, r) {
            var i = e.history;
            i.undone.length = 0;
            var o, l, a, s = +new Date();
            if ((i.lastOp == r || i.lastOrigin == t.origin && t.origin && ("+" == t.origin.charAt(0) && i.lastModTime > s - (e.cm ? e.cm.options.historyEventDelay : 500) || "*" == t.origin.charAt(0))) && (o = (a = i).lastOp == r ? (Pi(a.done),
                Y(a.done)) : a.done.length && !Y(a.done).ranges ? Y(a.done) : 1 < a.done.length && !a.done[a.done.length - 2].ranges ? (a.done.pop(),
                Y(a.done)) : void 0)) l = Y(o.changes), 0 == tt(t.from, t.to) && 0 == tt(t.from, l.to) ? l.to = xi(t) : o.changes.push(Wi(e, t)); else {
                var u = Y(i.done);
                for (u && u.ranges || Ei(e.sel, i.done), o = {
                    changes: [ Wi(e, t) ],
                    generation: i.generation
                }, i.done.push(o); i.done.length > i.undoDepth; ) i.done.shift(), i.done[0].ranges || i.done.shift();
            }
            i.done.push(n), i.generation = ++i.maxGeneration, i.lastModTime = i.lastSelTime = s,
                i.lastOp = i.lastSelOp = r, i.lastOrigin = i.lastSelOrigin = t.origin, l || ge(e, "historyAdded");
        }
        function Ii(e, t, n, r) {
            var i, o, l, a, s, u = e.history, c = r && r.origin;
            n == u.lastSelOp || c && u.lastSelOrigin == c && (u.lastModTime == u.lastSelTime && u.lastOrigin == c || (i = e,
                o = c, l = Y(u.done), a = t, "*" == (s = o.charAt(0)) || "+" == s && l.ranges.length == a.ranges.length && l.somethingSelected() == a.somethingSelected() && new Date() - i.history.lastSelTime <= (i.cm ? i.cm.options.historyEventDelay : 500))) ? u.done[u.done.length - 1] = t : Ei(t, u.done),
                u.lastSelTime = +new Date(), u.lastSelOrigin = c, u.lastSelOp = n, r && !1 !== r.clearRedo && Pi(u.undone);
        }
        function Ei(e, t) {
            var n = Y(t);
            n && n.ranges && n.equals(e) || t.push(e);
        }
        function zi(t, n, e, r) {
            var i = n["spans_" + t.id], o = 0;
            t.iter(Math.max(t.first, e), Math.min(t.first + t.size, r), function(e) {
                e.markedSpans && ((i || (i = n["spans_" + t.id] = {}))[o] = e.markedSpans), ++o;
            });
        }
        function Ri(e) {
            if (!e) return null;
            for (var t, n = 0; n < e.length; ++n) e[n].marker.explicitlyCleared ? t || (t = e.slice(0, n)) : t && t.push(e[n]);
            return t ? t.length ? t : null : e;
        }
        function Bi(e, t) {
            var n = function(e, t) {
                var n = t["spans_" + e.id];
                if (!n) return null;
                for (var r = [], i = 0; i < t.text.length; ++i) r.push(Ri(n[i]));
                return r;
            }(e, t), r = Tt(e, t);
            if (!n) return r;
            if (!r) return n;
            for (var i = 0; i < n.length; ++i) {
                var o = n[i], l = r[i];
                if (o && l) e: for (var a = 0; a < l.length; ++a) {
                    for (var s = l[a], u = 0; u < o.length; ++u) if (o[u].marker == s.marker) continue e;
                    o.push(s);
                } else l && (n[i] = l);
            }
            return n;
        }
        function Ui(e, t, n) {
            for (var r = [], i = 0; i < e.length; ++i) {
                var o = e[i];
                if (o.ranges) r.push(n ? vi.prototype.deepCopy.call(o) : o); else {
                    var l = o.changes, a = [];
                    r.push({
                        changes: a
                    });
                    for (var s = 0; s < l.length; ++s) {
                        var u = l[s], c = void 0;
                        if (a.push({
                            from: u.from,
                            to: u.to,
                            text: u.text
                        }), t) for (var f in u) (c = f.match(/^spans_(\d+)$/)) && -1 < B(t, Number(c[1])) && (Y(a)[f] = u[f],
                            delete u[f]);
                    }
                }
            }
            return r;
        }
        function Ki(e, t, n, r) {
            if (r) {
                var i = e.anchor;
                if (n) {
                    var o = tt(t, i) < 0;
                    o != tt(n, i) < 0 ? (i = t, t = n) : o != tt(t, n) < 0 && (t = n);
                }
                return new yi(i, t);
            }
            return new yi(n || t, t);
        }
        function Gi(e, t, n, r, i) {
            null == i && (i = e.cm && (e.cm.display.shift || e.extend)), Xi(e, new vi([ Ki(e.sel.primary(), t, n, i) ], 0), r);
        }
        function Vi(e, t, n) {
            for (var r = [], i = e.cm && (e.cm.display.shift || e.extend), o = 0; o < e.sel.ranges.length; o++) r[o] = Ki(e.sel.ranges[o], t[o], null, i);
            Xi(e, bi(e.cm, r, e.sel.primIndex), n);
        }
        function ji(e, t, n, r) {
            var i = e.sel.ranges.slice(0);
            i[t] = n, Xi(e, bi(e.cm, i, e.sel.primIndex), r);
        }
        function _i(e, t, n, r) {
            Xi(e, wi(t, n), r);
        }
        function qi(e, t, n) {
            var r = e.history.done, i = Y(r);
            i && i.ranges ? Yi(e, r[r.length - 1] = t, n) : Xi(e, t, n);
        }
        function Xi(e, t, n) {
            Yi(e, t, n), Ii(e, e.sel, e.cm ? e.cm.curOp.id : NaN, n);
        }
        function Yi(e, t, n) {
            var r, i, o, l;
            (ye(e, "beforeSelectionChange") || e.cm && ye(e.cm, "beforeSelectionChange")) && (r = e,
                o = n, l = {
                ranges: (i = t).ranges,
                update: function(e) {
                    this.ranges = [];
                    for (var t = 0; t < e.length; t++) this.ranges[t] = new yi(at(r, e[t].anchor), at(r, e[t].head));
                },
                origin: o && o.origin
            }, ge(r, "beforeSelectionChange", r, l), r.cm && ge(r.cm, "beforeSelectionChange", r.cm, l),
                t = l.ranges != i.ranges ? bi(r.cm, l.ranges, l.ranges.length - 1) : i), $i(e, Ji(e, t, n && n.bias || (tt(t.primary().head, e.sel.primary().head) < 0 ? -1 : 1), !0)),
            n && !1 === n.scroll || !e.cm || Mr(e.cm);
        }
        function $i(e, t) {
            t.equals(e.sel) || (e.sel = t, e.cm && (e.cm.curOp.updateInput = 1, e.cm.curOp.selectionChanged = !0,
                ve(e.cm)), an(e, "cursorActivity", e));
        }
        function Zi(e) {
            $i(e, Ji(e, e.sel, null, !1));
        }
        function Ji(e, t, n, r) {
            for (var i, o = 0; o < t.ranges.length; o++) {
                var l = t.ranges[o], a = t.ranges.length == e.sel.ranges.length && e.sel.ranges[o], s = eo(e, l.anchor, a && a.anchor, n, r), u = eo(e, l.head, a && a.head, n, r);
                (i || s != l.anchor || u != l.head) && (i || (i = t.ranges.slice(0, o)), i[o] = new yi(s, u));
            }
            return i ? bi(e.cm, i, t.primIndex) : t;
        }
        function Qi(e, t, n, r, i) {
            var o = _e(e, t.line);
            if (o.markedSpans) for (var l = 0; l < o.markedSpans.length; ++l) {
                var a = o.markedSpans[l], s = a.marker;
                if ((null == a.from || (s.inclusiveLeft ? a.from <= t.ch : a.from < t.ch)) && (null == a.to || (s.inclusiveRight ? a.to >= t.ch : a.to > t.ch))) {
                    if (i && (ge(s, "beforeCursorEnter"), s.explicitlyCleared)) {
                        if (o.markedSpans) {
                            --l;
                            continue;
                        }
                        break;
                    }
                    if (!s.atomic) continue;
                    if (n) {
                        var u = s.find(r < 0 ? 1 : -1), c = void 0;
                        if ((r < 0 ? s.inclusiveRight : s.inclusiveLeft) && (u = to(e, u, -r, u && u.line == t.line ? o : null)),
                        u && u.line == t.line && (c = tt(u, n)) && (r < 0 ? c < 0 : 0 < c)) return Qi(e, u, t, r, i);
                    }
                    var f = s.find(r < 0 ? -1 : 1);
                    return (r < 0 ? s.inclusiveLeft : s.inclusiveRight) && (f = to(e, f, r, f.line == t.line ? o : null)),
                        f ? Qi(e, f, t, r, i) : null;
                }
            }
            return t;
        }
        function eo(e, t, n, r, i) {
            var o = r || 1, l = Qi(e, t, n, o, i) || !i && Qi(e, t, n, o, !0) || Qi(e, t, n, -o, i) || !i && Qi(e, t, n, -o, !0);
            return l || (e.cantEdit = !0, et(e.first, 0));
        }
        function to(e, t, n, r) {
            return n < 0 && 0 == t.ch ? t.line > e.first ? at(e, et(t.line - 1)) : null : 0 < n && t.ch == (r || _e(e, t.line)).text.length ? t.line < e.first + e.size - 1 ? et(t.line + 1, 0) : null : new et(t.line, t.ch + n);
        }
        function no(e) {
            e.setSelection(et(e.firstLine(), 0), et(e.lastLine()), G);
        }
        function ro(i, e, t) {
            var o = {
                canceled: !1,
                from: e.from,
                to: e.to,
                text: e.text,
                origin: e.origin,
                cancel: function() {
                    return o.canceled = !0;
                }
            };
            return t && (o.update = function(e, t, n, r) {
                e && (o.from = at(i, e)), t && (o.to = at(i, t)), n && (o.text = n), void 0 !== r && (o.origin = r);
            }), ge(i, "beforeChange", i, o), i.cm && ge(i.cm, "beforeChange", i.cm, o), o.canceled ? (i.cm && (i.cm.curOp.updateInput = 2),
                null) : {
                from: o.from,
                to: o.to,
                text: o.text,
                origin: o.origin
            };
        }
        function io(e, t, n) {
            if (e.cm) {
                if (!e.cm.curOp) return Yr(e.cm, io)(e, t, n);
                if (e.cm.state.suppressEdits) return;
            }
            if (!(ye(e, "beforeChange") || e.cm && ye(e.cm, "beforeChange")) || (t = ro(e, t, !0))) {
                var r = xt && !n && function(e, t, n) {
                    var r = null;
                    if (e.iter(t.line, n.line + 1, function(e) {
                        if (e.markedSpans) for (var t = 0; t < e.markedSpans.length; ++t) {
                            var n = e.markedSpans[t].marker;
                            !n.readOnly || r && -1 != B(r, n) || (r || (r = [])).push(n);
                        }
                    }), !r) return null;
                    for (var i = [ {
                        from: t,
                        to: n
                    } ], o = 0; o < r.length; ++o) for (var l = r[o], a = l.find(0), s = 0; s < i.length; ++s) {
                        var u = i[s];
                        if (!(tt(u.to, a.from) < 0 || 0 < tt(u.from, a.to))) {
                            var c = [ s, 1 ], f = tt(u.from, a.from), h = tt(u.to, a.to);
                            (f < 0 || !l.inclusiveLeft && !f) && c.push({
                                from: u.from,
                                to: a.from
                            }), (0 < h || !l.inclusiveRight && !h) && c.push({
                                from: a.to,
                                to: u.to
                            }), i.splice.apply(i, c), s += c.length - 3;
                        }
                    }
                    return i;
                }(e, t.from, t.to);
                if (r) for (var i = r.length - 1; 0 <= i; --i) oo(e, {
                    from: r[i].from,
                    to: r[i].to,
                    text: i ? [ "" ] : t.text,
                    origin: t.origin
                }); else oo(e, t);
            }
        }
        function oo(e, n) {
            if (1 != n.text.length || "" != n.text[0] || 0 != tt(n.from, n.to)) {
                var t = Si(e, n);
                Hi(e, n, t, e.cm ? e.cm.curOp.id : NaN), so(e, n, t, Tt(e, n));
                var r = [];
                Ai(e, function(e, t) {
                    t || -1 != B(r, e.history) || (ho(e.history, n), r.push(e.history)), so(e, n, null, Tt(e, n));
                });
            }
        }
        function lo(i, o, e) {
            var t = i.cm && i.cm.state.suppressEdits;
            if (!t || e) {
                for (var l, n = i.history, r = i.sel, a = "undo" == o ? n.done : n.undone, s = "undo" == o ? n.undone : n.done, u = 0; u < a.length && (l = a[u],
                    e ? !l.ranges || l.equals(i.sel) : l.ranges); u++) ;
                if (u != a.length) {
                    for (n.lastOrigin = n.lastSelOrigin = null; ;) {
                        if (!(l = a.pop()).ranges) {
                            if (t) return void a.push(l);
                            break;
                        }
                        if (Ei(l, s), e && !l.equals(i.sel)) return void Xi(i, l, {
                            clearRedo: !1
                        });
                        r = l;
                    }
                    var c = [];
                    Ei(r, s), s.push({
                        changes: c,
                        generation: n.generation
                    }), n.generation = l.generation || ++n.maxGeneration;
                    for (var f = ye(i, "beforeChange") || i.cm && ye(i.cm, "beforeChange"), h = function(e) {
                        var n = l.changes[e];
                        if (n.origin = o, f && !ro(i, n, !1)) return a.length = 0, {};
                        c.push(Wi(i, n));
                        var t = e ? Si(i, n) : Y(a);
                        so(i, n, t, Bi(i, n)), !e && i.cm && i.cm.scrollIntoView({
                            from: n.from,
                            to: xi(n)
                        });
                        var r = [];
                        Ai(i, function(e, t) {
                            t || -1 != B(r, e.history) || (ho(e.history, n), r.push(e.history)), so(e, n, null, Bi(e, n));
                        });
                    }, d = l.changes.length - 1; 0 <= d; --d) {
                        var p = h(d);
                        if (p) return p.v;
                    }
                }
            }
        }
        function ao(e, t) {
            if (0 != t && (e.first += t, e.sel = new vi($(e.sel.ranges, function(e) {
                return new yi(et(e.anchor.line + t, e.anchor.ch), et(e.head.line + t, e.head.ch));
            }), e.sel.primIndex), e.cm)) {
                ar(e.cm, e.first, e.first - t, t);
                for (var n = e.cm.display, r = n.viewFrom; r < n.viewTo; r++) sr(e.cm, r, "gutter");
            }
        }
        function so(e, t, n, r) {
            if (e.cm && !e.cm.curOp) return Yr(e.cm, so)(e, t, n, r);
            if (t.to.line < e.first) ao(e, t.text.length - 1 - (t.to.line - t.from.line)); else if (!(t.from.line > e.lastLine())) {
                if (t.from.line < e.first) {
                    var i = t.text.length - 1 - (e.first - t.from.line);
                    ao(e, i), t = {
                        from: et(e.first, 0),
                        to: et(t.to.line + i, t.to.ch),
                        text: [ Y(t.text) ],
                        origin: t.origin
                    };
                }
                var o = e.lastLine();
                t.to.line > o && (t = {
                    from: t.from,
                    to: et(o, _e(e, o).text.length),
                    text: [ t.text[0] ],
                    origin: t.origin
                }), t.removed = qe(e, t.from, t.to), n || (n = Si(e, t)), e.cm ? function(e, t, n) {
                    var r = e.doc, i = e.display, o = t.from, l = t.to, a = !1, s = o.line;
                    e.options.lineWrapping || (s = $e(zt(_e(r, o.line))), r.iter(s, l.line + 1, function(e) {
                        if (e == i.maxLine) return a = !0;
                    }));
                    -1 < r.sel.contains(t.from, t.to) && ve(e);
                    Ni(r, t, n, rr(e)), e.options.lineWrapping || (r.iter(s, o.line + t.text.length, function(e) {
                        var t = Vt(e);
                        t > i.maxLineLength && (i.maxLine = e, i.maxLineLength = t, i.maxLineChanged = !0,
                            a = !1);
                    }), a && (e.curOp.updateMaxLine = !0));
                    (function(e, t) {
                        if (e.modeFrontier = Math.min(e.modeFrontier, t), !(e.highlightFrontier < t - 10)) {
                            for (var n = e.first, r = t - 1; n < r; r--) {
                                var i = _e(e, r).stateAfter;
                                if (i && (!(i instanceof ut) || r + i.lookAhead < t)) {
                                    n = r + 1;
                                    break;
                                }
                            }
                            e.highlightFrontier = Math.min(e.highlightFrontier, n);
                        }
                    })(r, o.line), Jr(e, 400);
                    var u = t.text.length - (l.line - o.line) - 1;
                    t.full ? ar(e) : o.line != l.line || 1 != t.text.length || Mi(e.doc, t) ? ar(e, o.line, l.line + 1, u) : sr(e, o.line, "text");
                    var c = ye(e, "changes"), f = ye(e, "change");
                    if (f || c) {
                        var h = {
                            from: o,
                            to: l,
                            text: t.text,
                            removed: t.removed,
                            origin: t.origin
                        };
                        f && an(e, "change", e, h), c && (e.curOp.changeObjs || (e.curOp.changeObjs = [])).push(h);
                    }
                    e.display.selForContextMenu = null;
                }(e.cm, t, r) : Ni(e, t, r), Yi(e, n, G);
            }
        }
        function uo(e, t, n, r, i) {
            var o;
            r || (r = n), tt(r, n) < 0 && (n = (o = [ r, n ])[0], r = o[1]), "string" == typeof t && (t = e.splitLines(t)),
                io(e, {
                    from: n,
                    to: r,
                    text: t,
                    origin: i
                });
        }
        function co(e, t, n, r) {
            n < e.line ? e.line += r : t < e.line && (e.line = t, e.ch = 0);
        }
        function fo(e, t, n, r) {
            for (var i = 0; i < e.length; ++i) {
                var o = e[i], l = !0;
                if (o.ranges) {
                    o.copied || ((o = e[i] = o.deepCopy()).copied = !0);
                    for (var a = 0; a < o.ranges.length; a++) co(o.ranges[a].anchor, t, n, r), co(o.ranges[a].head, t, n, r);
                } else {
                    for (var s = 0; s < o.changes.length; ++s) {
                        var u = o.changes[s];
                        if (n < u.from.line) u.from = et(u.from.line + r, u.from.ch), u.to = et(u.to.line + r, u.to.ch); else if (t <= u.to.line) {
                            l = !1;
                            break;
                        }
                    }
                    l || (e.splice(0, i + 1), i = 0);
                }
            }
        }
        function ho(e, t) {
            var n = t.from.line, r = t.to.line, i = t.text.length - (r - n) - 1;
            fo(e.done, n, r, i), fo(e.undone, n, r, i);
        }
        function po(e, t, n, r) {
            var i = t, o = t;
            return "number" == typeof t ? o = _e(e, lt(e, t)) : i = $e(t), null == i ? null : (r(o, i) && e.cm && sr(e.cm, i, n),
                o);
        }
        function go(e) {
            this.lines = e, this.parent = null;
            for (var t = 0, n = 0; n < e.length; ++n) e[n].parent = this, t += e[n].height;
            this.height = t;
        }
        function mo(e) {
            this.children = e;
            for (var t = 0, n = 0, r = 0; r < e.length; ++r) {
                var i = e[r];
                t += i.chunkSize(), n += i.height, i.parent = this;
            }
            this.size = t, this.height = n, this.parent = null;
        }
        yi.prototype.from = function() {
            return ot(this.anchor, this.head);
        }, yi.prototype.to = function() {
            return it(this.anchor, this.head);
        }, yi.prototype.empty = function() {
            return this.head.line == this.anchor.line && this.head.ch == this.anchor.ch;
        }, go.prototype = {
            chunkSize: function() {
                return this.lines.length;
            },
            removeInner: function(e, t) {
                for (var n, r = e, i = e + t; r < i; ++r) {
                    var o = this.lines[r];
                    this.height -= o.height, (n = o).parent = null, Nt(n), an(o, "delete");
                }
                this.lines.splice(e, t);
            },
            collapse: function(e) {
                e.push.apply(e, this.lines);
            },
            insertInner: function(e, t, n) {
                this.height += n, this.lines = this.lines.slice(0, e).concat(t).concat(this.lines.slice(e));
                for (var r = 0; r < t.length; ++r) t[r].parent = this;
            },
            iterN: function(e, t, n) {
                for (var r = e + t; e < r; ++e) if (n(this.lines[e])) return !0;
            }
        }, mo.prototype = {
            chunkSize: function() {
                return this.size;
            },
            removeInner: function(e, t) {
                this.size -= t;
                for (var n = 0; n < this.children.length; ++n) {
                    var r = this.children[n], i = r.chunkSize();
                    if (e < i) {
                        var o = Math.min(t, i - e), l = r.height;
                        if (r.removeInner(e, o), this.height -= l - r.height, i == o && (this.children.splice(n--, 1),
                            r.parent = null), 0 == (t -= o)) break;
                        e = 0;
                    } else e -= i;
                }
                if (this.size - t < 25 && (1 < this.children.length || !(this.children[0] instanceof go))) {
                    var a = [];
                    this.collapse(a), this.children = [ new go(a) ], this.children[0].parent = this;
                }
            },
            collapse: function(e) {
                for (var t = 0; t < this.children.length; ++t) this.children[t].collapse(e);
            },
            insertInner: function(e, t, n) {
                this.size += t.length, this.height += n;
                for (var r = 0; r < this.children.length; ++r) {
                    var i = this.children[r], o = i.chunkSize();
                    if (e <= o) {
                        if (i.insertInner(e, t, n), i.lines && 50 < i.lines.length) {
                            for (var l = i.lines.length % 25 + 25, a = l; a < i.lines.length; ) {
                                var s = new go(i.lines.slice(a, a += 25));
                                i.height -= s.height, this.children.splice(++r, 0, s), s.parent = this;
                            }
                            i.lines = i.lines.slice(0, l), this.maybeSpill();
                        }
                        break;
                    }
                    e -= o;
                }
            },
            maybeSpill: function() {
                if (!(this.children.length <= 10)) {
                    var e = this;
                    do {
                        var t = new mo(e.children.splice(e.children.length - 5, 5));
                        if (e.parent) {
                            e.size -= t.size, e.height -= t.height;
                            var n = B(e.parent.children, e);
                            e.parent.children.splice(n + 1, 0, t);
                        } else {
                            var r = new mo(e.children);
                            (r.parent = e).children = [ r, t ], e = r;
                        }
                        t.parent = e.parent;
                    } while (10 < e.children.length);
                    e.parent.maybeSpill();
                }
            },
            iterN: function(e, t, n) {
                for (var r = 0; r < this.children.length; ++r) {
                    var i = this.children[r], o = i.chunkSize();
                    if (e < o) {
                        var l = Math.min(t, o - e);
                        if (i.iterN(e, l, n)) return !0;
                        if (0 == (t -= l)) break;
                        e = 0;
                    } else e -= o;
                }
            }
        };
        var vo = function(e, t, n) {
            if (n) for (var r in n) n.hasOwnProperty(r) && (this[r] = n[r]);
            this.doc = e, this.node = t;
        };
        function yo(e, t, n) {
            Gt(t) < (e.curOp && e.curOp.scrollTop || e.doc.scrollTop) && Tr(e, n);
        }
        vo.prototype.clear = function() {
            var e = this.doc.cm, t = this.line.widgets, n = this.line, r = $e(n);
            if (null != r && t) {
                for (var i = 0; i < t.length; ++i) t[i] == this && t.splice(i--, 1);
                t.length || (n.widgets = null);
                var o = bn(this);
                Ye(n, Math.max(0, n.height - o)), e && (Xr(e, function() {
                    yo(e, n, -o), sr(e, r, "widget");
                }), an(e, "lineWidgetCleared", e, this, r));
            }
        }, vo.prototype.changed = function() {
            var e = this, t = this.height, n = this.doc.cm, r = this.line;
            this.height = null;
            var i = bn(this) - t;
            i && (Ut(this.doc, r) || Ye(r, r.height + i), n && Xr(n, function() {
                n.curOp.forceUpdate = !0, yo(n, r, i), an(n, "lineWidgetChanged", n, e, $e(r));
            }));
        }, be(vo);
        var bo = 0, wo = function(e, t) {
            this.lines = [], this.type = t, this.doc = e, this.id = ++bo;
        };
        function xo(t, r, i, e, n) {
            if (e && e.shared) return function(e, n, r, i, o) {
                (i = E(i)).shared = !1;
                var l = [ xo(e, n, r, i, o) ], a = l[0], s = i.widgetNode;
                return Ai(e, function(e) {
                    s && (i.widgetNode = s.cloneNode(!0)), l.push(xo(e, at(e, n), at(e, r), i, o));
                    for (var t = 0; t < e.linked.length; ++t) if (e.linked[t].isParent) return;
                    a = Y(l);
                }), new Co(l, a);
            }(t, r, i, e, n);
            if (t.cm && !t.cm.curOp) return Yr(t.cm, xo)(t, r, i, e, n);
            var o = new wo(t, n), l = tt(r, i);
            if (e && E(e, o, !1), 0 < l || 0 == l && !1 !== o.clearWhenEmpty) return o;
            if (o.replacedWith && (o.collapsed = !0, o.widgetNode = A("span", [ o.replacedWith ], "CodeMirror-widget"),
            e.handleMouseEvents || o.widgetNode.setAttribute("cm-ignore-events", "true"), e.insertLeft && (o.widgetNode.insertLeft = !0)),
                o.collapsed) {
                if (Et(t, r.line, r, i, o) || r.line != i.line && Et(t, i.line, r, i, o)) throw new Error("Inserting collapsed marker partially overlapping an existing one");
                Ct = !0;
            }
            o.addToHistory && Hi(t, {
                from: r,
                to: i,
                origin: "markText"
            }, t.sel, NaN);
            var a, s = r.line, u = t.cm;
            if (t.iter(s, i.line + 1, function(e) {
                var t, n;
                u && o.collapsed && !u.options.lineWrapping && zt(e) == u.display.maxLine && (a = !0),
                o.collapsed && s != r.line && Ye(e, 0), t = e, n = new St(o, s == r.line ? r.ch : null, s == i.line ? i.ch : null),
                    t.markedSpans = t.markedSpans ? t.markedSpans.concat([ n ]) : [ n ], n.marker.attachLine(t),
                    ++s;
            }), o.collapsed && t.iter(r.line, i.line + 1, function(e) {
                Ut(t, e) && Ye(e, 0);
            }), o.clearOnEnter && he(o, "beforeCursorEnter", function() {
                return o.clear();
            }), o.readOnly && (xt = !0, (t.history.done.length || t.history.undone.length) && t.clearHistory()),
            o.collapsed && (o.id = ++bo, o.atomic = !0), u) {
                if (a && (u.curOp.updateMaxLine = !0), o.collapsed) ar(u, r.line, i.line + 1); else if (o.className || o.startStyle || o.endStyle || o.css || o.attributes || o.title) for (var c = r.line; c <= i.line; c++) sr(u, c, "text");
                o.atomic && Zi(u.doc), an(u, "markerAdded", u, o);
            }
            return o;
        }
        wo.prototype.clear = function() {
            var e = this;
            if (!this.explicitlyCleared) {
                var t = this.doc.cm, n = t && !t.curOp;
                if (n && Kr(t), ye(this, "clear")) {
                    var r = this.find();
                    r && an(this, "clear", r.from, r.to);
                }
                for (var i = null, o = null, l = 0; l < this.lines.length; ++l) {
                    var a = e.lines[l], s = kt(a.markedSpans, e);
                    t && !e.collapsed ? sr(t, $e(a), "text") : t && (null != s.to && (o = $e(a)), null != s.from && (i = $e(a))),
                        a.markedSpans = Lt(a.markedSpans, s), null == s.from && e.collapsed && !Ut(e.doc, a) && t && Ye(a, Qn(t.display));
                }
                if (t && this.collapsed && !t.options.lineWrapping) for (var u = 0; u < this.lines.length; ++u) {
                    var c = zt(e.lines[u]), f = Vt(c);
                    f > t.display.maxLineLength && (t.display.maxLine = c, t.display.maxLineLength = f,
                        t.display.maxLineChanged = !0);
                }
                null != i && t && this.collapsed && ar(t, i, o + 1), this.lines.length = 0, this.explicitlyCleared = !0,
                this.atomic && this.doc.cantEdit && (this.doc.cantEdit = !1, t && Zi(t.doc)), t && an(t, "markerCleared", t, this, i, o),
                n && Gr(t), this.parent && this.parent.clear();
            }
        }, wo.prototype.find = function(e, t) {
            var n, r;
            null == e && "bookmark" == this.type && (e = 1);
            for (var i = 0; i < this.lines.length; ++i) {
                var o = this.lines[i], l = kt(o.markedSpans, this);
                if (null != l.from && (n = et(t ? o : $e(o), l.from), -1 == e)) return n;
                if (null != l.to && (r = et(t ? o : $e(o), l.to), 1 == e)) return r;
            }
            return n && {
                from: n,
                to: r
            };
        }, wo.prototype.changed = function() {
            var o = this, l = this.find(-1, !0), a = this, s = this.doc.cm;
            l && s && Xr(s, function() {
                var e = l.line, t = $e(l.line), n = An(s, t);
                if (n && (In(n), s.curOp.selectionChanged = s.curOp.forceUpdate = !0), s.curOp.updateMaxLine = !0,
                !Ut(a.doc, e) && null != a.height) {
                    var r = a.height;
                    a.height = null;
                    var i = bn(a) - r;
                    i && Ye(e, e.height + i);
                }
                an(s, "markerChanged", s, o);
            });
        }, wo.prototype.attachLine = function(e) {
            if (!this.lines.length && this.doc.cm) {
                var t = this.doc.cm.curOp;
                t.maybeHiddenMarkers && -1 != B(t.maybeHiddenMarkers, this) || (t.maybeUnhiddenMarkers || (t.maybeUnhiddenMarkers = [])).push(this);
            }
            this.lines.push(e);
        }, wo.prototype.detachLine = function(e) {
            if (this.lines.splice(B(this.lines, e), 1), !this.lines.length && this.doc.cm) {
                var t = this.doc.cm.curOp;
                (t.maybeHiddenMarkers || (t.maybeHiddenMarkers = [])).push(this);
            }
        }, be(wo);
        var Co = function(e, t) {
            this.markers = e, this.primary = t;
            for (var n = 0; n < e.length; ++n) e[n].parent = this;
        };
        function So(e) {
            return e.findMarks(et(e.first, 0), e.clipPos(et(e.lastLine())), function(e) {
                return e.parent;
            });
        }
        function ko(o) {
            for (var e = function(e) {
                var t = o[e], n = [ t.primary.doc ];
                Ai(t.primary.doc, function(e) {
                    return n.push(e);
                });
                for (var r = 0; r < t.markers.length; r++) {
                    var i = t.markers[r];
                    -1 == B(n, i.doc) && (i.parent = null, t.markers.splice(r--, 1));
                }
            }, t = 0; t < o.length; t++) e(t);
        }
        Co.prototype.clear = function() {
            if (!this.explicitlyCleared) {
                this.explicitlyCleared = !0;
                for (var e = 0; e < this.markers.length; ++e) this.markers[e].clear();
                an(this, "clear");
            }
        }, Co.prototype.find = function(e, t) {
            return this.primary.find(e, t);
        }, be(Co);
        var Lo = 0, To = function(e, t, n, r, i) {
            if (!(this instanceof To)) return new To(e, t, n, r, i);
            null == n && (n = 0), mo.call(this, [ new go([ new _t("", null) ]) ]), this.first = n,
                this.scrollTop = this.scrollLeft = 0, this.cantEdit = !1, this.cleanGeneration = 1,
                this.modeFrontier = this.highlightFrontier = n;
            var o = et(n, 0);
            this.sel = wi(o), this.history = new Di(null), this.id = ++Lo, this.modeOption = t,
                this.lineSep = r, this.direction = "rtl" == i ? "rtl" : "ltr", this.extend = !1,
            "string" == typeof e && (e = this.splitLines(e)), Ni(this, {
                from: o,
                to: o,
                text: e
            }), Xi(this, wi(o), G);
        };
        To.prototype = J(mo.prototype, {
            constructor: To,
            iter: function(e, t, n) {
                n ? this.iterN(e - this.first, t - e, n) : this.iterN(this.first, this.first + this.size, e);
            },
            insert: function(e, t) {
                for (var n = 0, r = 0; r < t.length; ++r) n += t[r].height;
                this.insertInner(e - this.first, t, n);
            },
            remove: function(e, t) {
                this.removeInner(e - this.first, t);
            },
            getValue: function(e) {
                var t = Xe(this, this.first, this.first + this.size);
                return !1 === e ? t : t.join(e || this.lineSeparator());
            },
            setValue: Zr(function(e) {
                var t = et(this.first, 0), n = this.first + this.size - 1;
                io(this, {
                    from: t,
                    to: et(n, _e(this, n).text.length),
                    text: this.splitLines(e),
                    origin: "setValue",
                    full: !0
                }, !0), this.cm && Nr(this.cm, 0, 0), Xi(this, wi(t), G);
            }),
            replaceRange: function(e, t, n, r) {
                uo(this, e, t = at(this, t), n = n ? at(this, n) : t, r);
            },
            getRange: function(e, t, n) {
                var r = qe(this, at(this, e), at(this, t));
                return !1 === n ? r : r.join(n || this.lineSeparator());
            },
            getLine: function(e) {
                var t = this.getLineHandle(e);
                return t && t.text;
            },
            getLineHandle: function(e) {
                if (Je(this, e)) return _e(this, e);
            },
            getLineNumber: function(e) {
                return $e(e);
            },
            getLineHandleVisualStart: function(e) {
                return "number" == typeof e && (e = _e(this, e)), zt(e);
            },
            lineCount: function() {
                return this.size;
            },
            firstLine: function() {
                return this.first;
            },
            lastLine: function() {
                return this.first + this.size - 1;
            },
            clipPos: function(e) {
                return at(this, e);
            },
            getCursor: function(e) {
                var t = this.sel.primary();
                return null == e || "head" == e ? t.head : "anchor" == e ? t.anchor : "end" == e || "to" == e || !1 === e ? t.to() : t.from();
            },
            listSelections: function() {
                return this.sel.ranges;
            },
            somethingSelected: function() {
                return this.sel.somethingSelected();
            },
            setCursor: Zr(function(e, t, n) {
                _i(this, at(this, "number" == typeof e ? et(e, t || 0) : e), null, n);
            }),
            setSelection: Zr(function(e, t, n) {
                _i(this, at(this, e), at(this, t || e), n);
            }),
            extendSelection: Zr(function(e, t, n) {
                Gi(this, at(this, e), t && at(this, t), n);
            }),
            extendSelections: Zr(function(e, t) {
                Vi(this, st(this, e), t);
            }),
            extendSelectionsBy: Zr(function(e, t) {
                Vi(this, st(this, $(this.sel.ranges, e)), t);
            }),
            setSelections: Zr(function(e, t, n) {
                if (e.length) {
                    for (var r = [], i = 0; i < e.length; i++) r[i] = new yi(at(this, e[i].anchor), at(this, e[i].head));
                    null == t && (t = Math.min(e.length - 1, this.sel.primIndex)), Xi(this, bi(this.cm, r, t), n);
                }
            }),
            addSelection: Zr(function(e, t, n) {
                var r = this.sel.ranges.slice(0);
                r.push(new yi(at(this, e), at(this, t || e))), Xi(this, bi(this.cm, r, r.length - 1), n);
            }),
            getSelection: function(e) {
                for (var t, n = this.sel.ranges, r = 0; r < n.length; r++) {
                    var i = qe(this, n[r].from(), n[r].to());
                    t = t ? t.concat(i) : i;
                }
                return !1 === e ? t : t.join(e || this.lineSeparator());
            },
            getSelections: function(e) {
                for (var t = [], n = this.sel.ranges, r = 0; r < n.length; r++) {
                    var i = qe(this, n[r].from(), n[r].to());
                    !1 !== e && (i = i.join(e || this.lineSeparator())), t[r] = i;
                }
                return t;
            },
            replaceSelection: function(e, t, n) {
                for (var r = [], i = 0; i < this.sel.ranges.length; i++) r[i] = e;
                this.replaceSelections(r, t, n || "+input");
            },
            replaceSelections: Zr(function(e, t, n) {
                for (var r = [], i = this.sel, o = 0; o < i.ranges.length; o++) {
                    var l = i.ranges[o];
                    r[o] = {
                        from: l.from(),
                        to: l.to(),
                        text: this.splitLines(e[o]),
                        origin: n
                    };
                }
                for (var a = t && "end" != t && function(e, t, n) {
                    for (var r = [], i = et(e.first, 0), o = i, l = 0; l < t.length; l++) {
                        var a = t[l], s = ki(a.from, i, o), u = ki(xi(a), i, o);
                        if (i = a.to, o = u, "around" == n) {
                            var c = e.sel.ranges[l], f = tt(c.head, c.anchor) < 0;
                            r[l] = new yi(f ? u : s, f ? s : u);
                        } else r[l] = new yi(s, s);
                    }
                    return new vi(r, e.sel.primIndex);
                }(this, r, t), s = r.length - 1; 0 <= s; s--) io(this, r[s]);
                a ? qi(this, a) : this.cm && Mr(this.cm);
            }),
            undo: Zr(function() {
                lo(this, "undo");
            }),
            redo: Zr(function() {
                lo(this, "redo");
            }),
            undoSelection: Zr(function() {
                lo(this, "undo", !0);
            }),
            redoSelection: Zr(function() {
                lo(this, "redo", !0);
            }),
            setExtending: function(e) {
                this.extend = e;
            },
            getExtending: function() {
                return this.extend;
            },
            historySize: function() {
                for (var e = this.history, t = 0, n = 0, r = 0; r < e.done.length; r++) e.done[r].ranges || ++t;
                for (var i = 0; i < e.undone.length; i++) e.undone[i].ranges || ++n;
                return {
                    undo: t,
                    redo: n
                };
            },
            clearHistory: function() {
                this.history = new Di(this.history.maxGeneration);
            },
            markClean: function() {
                this.cleanGeneration = this.changeGeneration(!0);
            },
            changeGeneration: function(e) {
                return e && (this.history.lastOp = this.history.lastSelOp = this.history.lastOrigin = null),
                    this.history.generation;
            },
            isClean: function(e) {
                return this.history.generation == (e || this.cleanGeneration);
            },
            getHistory: function() {
                return {
                    done: Ui(this.history.done),
                    undone: Ui(this.history.undone)
                };
            },
            setHistory: function(e) {
                var t = this.history = new Di(this.history.maxGeneration);
                t.done = Ui(e.done.slice(0), null, !0), t.undone = Ui(e.undone.slice(0), null, !0);
            },
            setGutterMarker: Zr(function(e, n, r) {
                return po(this, e, "gutter", function(e) {
                    var t = e.gutterMarkers || (e.gutterMarkers = {});
                    return !(t[n] = r) && ne(t) && (e.gutterMarkers = null), !0;
                });
            }),
            clearGutter: Zr(function(t) {
                var n = this;
                this.iter(function(e) {
                    e.gutterMarkers && e.gutterMarkers[t] && po(n, e, "gutter", function() {
                        return e.gutterMarkers[t] = null, ne(e.gutterMarkers) && (e.gutterMarkers = null),
                            !0;
                    });
                });
            }),
            lineInfo: function(e) {
                var t;
                if ("number" == typeof e) {
                    if (!Je(this, e)) return null;
                    if (!(e = _e(this, t = e))) return null;
                } else if (null == (t = $e(e))) return null;
                return {
                    line: t,
                    handle: e,
                    text: e.text,
                    gutterMarkers: e.gutterMarkers,
                    textClass: e.textClass,
                    bgClass: e.bgClass,
                    wrapClass: e.wrapClass,
                    widgets: e.widgets
                };
            },
            addLineClass: Zr(function(e, n, r) {
                return po(this, e, "gutter" == n ? "gutter" : "class", function(e) {
                    var t = "text" == n ? "textClass" : "background" == n ? "bgClass" : "gutter" == n ? "gutterClass" : "wrapClass";
                    if (e[t]) {
                        if (k(r).test(e[t])) return !1;
                        e[t] += " " + r;
                    } else e[t] = r;
                    return !0;
                });
            }),
            removeLineClass: Zr(function(e, o, l) {
                return po(this, e, "gutter" == o ? "gutter" : "class", function(e) {
                    var t = "text" == o ? "textClass" : "background" == o ? "bgClass" : "gutter" == o ? "gutterClass" : "wrapClass", n = e[t];
                    if (!n) return !1;
                    if (null == l) e[t] = null; else {
                        var r = n.match(k(l));
                        if (!r) return !1;
                        var i = r.index + r[0].length;
                        e[t] = n.slice(0, r.index) + (r.index && i != n.length ? " " : "") + n.slice(i) || null;
                    }
                    return !0;
                });
            }),
            addLineWidget: Zr(function(e, t, n) {
                return i = e, o = new vo(r = this, t, n), (l = r.cm) && o.noHScroll && (l.display.alignWidgets = !0),
                    po(r, i, "widget", function(e) {
                        var t = e.widgets || (e.widgets = []);
                        if (null == o.insertAt ? t.push(o) : t.splice(Math.min(t.length - 1, Math.max(0, o.insertAt)), 0, o),
                            o.line = e, l && !Ut(r, e)) {
                            var n = Gt(e) < r.scrollTop;
                            Ye(e, e.height + bn(o)), n && Tr(l, o.height), l.curOp.forceUpdate = !0;
                        }
                        return !0;
                    }), l && an(l, "lineWidgetAdded", l, o, "number" == typeof i ? i : $e(i)), o;
                var r, i, o, l;
            }),
            removeLineWidget: function(e) {
                e.clear();
            },
            markText: function(e, t, n) {
                return xo(this, at(this, e), at(this, t), n, n && n.type || "range");
            },
            setBookmark: function(e, t) {
                var n = {
                    replacedWith: t && (null == t.nodeType ? t.widget : t),
                    insertLeft: t && t.insertLeft,
                    clearWhenEmpty: !1,
                    shared: t && t.shared,
                    handleMouseEvents: t && t.handleMouseEvents
                };
                return xo(this, e = at(this, e), e, n, "bookmark");
            },
            findMarksAt: function(e) {
                var t = [], n = _e(this, (e = at(this, e)).line).markedSpans;
                if (n) for (var r = 0; r < n.length; ++r) {
                    var i = n[r];
                    (null == i.from || i.from <= e.ch) && (null == i.to || i.to >= e.ch) && t.push(i.marker.parent || i.marker);
                }
                return t;
            },
            findMarks: function(i, o, l) {
                i = at(this, i), o = at(this, o);
                var a = [], s = i.line;
                return this.iter(i.line, o.line + 1, function(e) {
                    var t = e.markedSpans;
                    if (t) for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        null != r.to && s == i.line && i.ch >= r.to || null == r.from && s != i.line || null != r.from && s == o.line && r.from >= o.ch || l && !l(r.marker) || a.push(r.marker.parent || r.marker);
                    }
                    ++s;
                }), a;
            },
            getAllMarks: function() {
                var r = [];
                return this.iter(function(e) {
                    var t = e.markedSpans;
                    if (t) for (var n = 0; n < t.length; ++n) null != t[n].from && r.push(t[n].marker);
                }), r;
            },
            posFromIndex: function(n) {
                var r, i = this.first, o = this.lineSeparator().length;
                return this.iter(function(e) {
                    var t = e.text.length + o;
                    if (n < t) return r = n, !0;
                    n -= t, ++i;
                }), at(this, et(i, r));
            },
            indexFromPos: function(e) {
                var t = (e = at(this, e)).ch;
                if (e.line < this.first || e.ch < 0) return 0;
                var n = this.lineSeparator().length;
                return this.iter(this.first, e.line, function(e) {
                    t += e.text.length + n;
                }), t;
            },
            copy: function(e) {
                var t = new To(Xe(this, this.first, this.first + this.size), this.modeOption, this.first, this.lineSep, this.direction);
                return t.scrollTop = this.scrollTop, t.scrollLeft = this.scrollLeft, t.sel = this.sel,
                    t.extend = !1, e && (t.history.undoDepth = this.history.undoDepth, t.setHistory(this.getHistory())),
                    t;
            },
            linkedDoc: function(e) {
                e || (e = {});
                var t = this.first, n = this.first + this.size;
                null != e.from && e.from > t && (t = e.from), null != e.to && e.to < n && (n = e.to);
                var r = new To(Xe(this, t, n), e.mode || this.modeOption, t, this.lineSep, this.direction);
                return e.sharedHist && (r.history = this.history), (this.linked || (this.linked = [])).push({
                    doc: r,
                    sharedHist: e.sharedHist
                }), r.linked = [ {
                    doc: this,
                    isParent: !0,
                    sharedHist: e.sharedHist
                } ], function(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n], i = r.find(), o = e.clipPos(i.from), l = e.clipPos(i.to);
                        if (tt(o, l)) {
                            var a = xo(e, o, l, r.primary, r.primary.type);
                            r.markers.push(a), a.parent = r;
                        }
                    }
                }(r, So(this)), r;
            },
            unlinkDoc: function(e) {
                if (e instanceof Cl && (e = e.doc), this.linked) for (var t = 0; t < this.linked.length; ++t) {
                    if (this.linked[t].doc == e) {
                        this.linked.splice(t, 1), e.unlinkDoc(this), ko(So(this));
                        break;
                    }
                }
                if (e.history == this.history) {
                    var n = [ e.id ];
                    Ai(e, function(e) {
                        return n.push(e.id);
                    }, !0), e.history = new Di(null), e.history.done = Ui(this.history.done, n), e.history.undone = Ui(this.history.undone, n);
                }
            },
            iterLinkedDocs: function(e) {
                Ai(this, e);
            },
            getMode: function() {
                return this.mode;
            },
            getEditor: function() {
                return this.cm;
            },
            splitLines: function(e) {
                return this.lineSep ? e.split(this.lineSep) : De(e);
            },
            lineSeparator: function() {
                return this.lineSep || "\n";
            },
            setDirection: Zr(function(e) {
                var t;
                ("rtl" != e && (e = "ltr"), e != this.direction) && (this.direction = e, this.iter(function(e) {
                    return e.order = null;
                }), this.cm && Xr(t = this.cm, function() {
                    Fi(t), ar(t);
                }));
            })
        }), To.prototype.eachLine = To.prototype.iter;
        var Mo = 0;
        function No(e) {
            var i = this;
            if (Ao(i), !me(i, e) && !wn(i.display, e)) {
                we(e), x && (Mo = +new Date());
                var o = or(i, e, !0), t = e.dataTransfer.files;
                if (o && !i.isReadOnly()) if (t && t.length && window.FileReader && window.File) for (var l = t.length, a = Array(l), s = 0, n = function(e, n) {
                    if (!i.options.allowDropFileTypes || -1 != B(i.options.allowDropFileTypes, e.type)) {
                        var r = new FileReader();
                        r.onload = Yr(i, function() {
                            var e = r.result;
                            if (/[\x00-\x08\x0e-\x1f]{2}/.test(e) && (e = ""), a[n] = e, ++s == l) {
                                var t = {
                                    from: o = at(i.doc, o),
                                    to: o,
                                    text: i.doc.splitLines(a.join(i.doc.lineSeparator())),
                                    origin: "paste"
                                };
                                io(i.doc, t), qi(i.doc, wi(o, xi(t)));
                            }
                        }), r.readAsText(e);
                    }
                }, r = 0; r < l; ++r) n(t[r], r); else {
                    if (i.state.draggingText && -1 < i.doc.sel.contains(o)) return i.state.draggingText(e),
                        void setTimeout(function() {
                            return i.display.input.focus();
                        }, 20);
                    try {
                        var u = e.dataTransfer.getData("Text");
                        if (u) {
                            var c;
                            if (i.state.draggingText && !i.state.draggingText.copy && (c = i.listSelections()),
                                Yi(i.doc, wi(o, o)), c) for (var f = 0; f < c.length; ++f) uo(i.doc, "", c[f].anchor, c[f].head, "drag");
                            i.replaceSelection(u, "around", "paste"), i.display.input.focus();
                        }
                    } catch (e) {}
                }
            }
        }
        function Ao(e) {
            e.display.dragCursor && (e.display.lineSpace.removeChild(e.display.dragCursor),
                e.display.dragCursor = null);
        }
        function Oo(t) {
            if (document.getElementsByClassName) {
                for (var e = document.getElementsByClassName("CodeMirror"), n = [], r = 0; r < e.length; r++) {
                    var i = e[r].CodeMirror;
                    i && n.push(i);
                }
                n.length && n[0].operation(function() {
                    for (var e = 0; e < n.length; e++) t(n[e]);
                });
            }
        }
        var Fo = !1;
        function Do() {
            var e;
            Fo || (he(window, "resize", function() {
                null == e && (e = setTimeout(function() {
                    e = null, Oo(Wo);
                }, 100));
            }), he(window, "blur", function() {
                return Oo(xr);
            }), Fo = !0);
        }
        function Wo(e) {
            var t = e.display;
            t.cachedCharWidth = t.cachedTextHeight = t.cachedPaddingH = null, t.scrollbarsClipped = !1,
                e.setSize();
        }
        for (var Po = {
            3: "Pause",
            8: "Backspace",
            9: "Tab",
            13: "Enter",
            16: "Shift",
            17: "Ctrl",
            18: "Alt",
            19: "Pause",
            20: "CapsLock",
            27: "Esc",
            32: "Space",
            33: "PageUp",
            34: "PageDown",
            35: "End",
            36: "Home",
            37: "Left",
            38: "Up",
            39: "Right",
            40: "Down",
            44: "PrintScrn",
            45: "Insert",
            46: "Delete",
            59: ";",
            61: "=",
            91: "Mod",
            92: "Mod",
            93: "Mod",
            106: "*",
            107: "=",
            109: "-",
            110: ".",
            111: "/",
            145: "ScrollLock",
            173: "-",
            186: ";",
            187: "=",
            188: ",",
            189: "-",
            190: ".",
            191: "/",
            192: "`",
            219: "[",
            220: "\\",
            221: "]",
            222: "'",
            63232: "Up",
            63233: "Down",
            63234: "Left",
            63235: "Right",
            63272: "Delete",
            63273: "Home",
            63275: "End",
            63276: "PageUp",
            63277: "PageDown",
            63302: "Insert"
        }, Ho = 0; Ho < 10; Ho++) Po[Ho + 48] = Po[Ho + 96] = String(Ho);
        for (var Io = 65; Io <= 90; Io++) Po[Io] = String.fromCharCode(Io);
        for (var Eo = 1; Eo <= 12; Eo++) Po[Eo + 111] = Po[Eo + 63235] = "F" + Eo;
        var zo = {};
        function Ro(e) {
            var t, n, r, i, o = e.split(/-(?!$)/);
            e = o[o.length - 1];
            for (var l = 0; l < o.length - 1; l++) {
                var a = o[l];
                if (/^(cmd|meta|m)$/i.test(a)) i = !0; else if (/^a(lt)?$/i.test(a)) t = !0; else if (/^(c|ctrl|control)$/i.test(a)) n = !0; else {
                    if (!/^s(hift)?$/i.test(a)) throw new Error("Unrecognized modifier name: " + a);
                    r = !0;
                }
            }
            return t && (e = "Alt-" + e), n && (e = "Ctrl-" + e), i && (e = "Cmd-" + e), r && (e = "Shift-" + e),
                e;
        }
        function Bo(e) {
            var t = {};
            for (var n in e) if (e.hasOwnProperty(n)) {
                var r = e[n];
                if (/^(name|fallthrough|(de|at)tach)$/.test(n)) continue;
                if ("..." == r) {
                    delete e[n];
                    continue;
                }
                for (var i = $(n.split(" "), Ro), o = 0; o < i.length; o++) {
                    var l = void 0, a = void 0;
                    o == i.length - 1 ? (a = i.join(" "), l = r) : (a = i.slice(0, o + 1).join(" "),
                        l = "...");
                    var s = t[a];
                    if (s) {
                        if (s != l) throw new Error("Inconsistent bindings for " + a);
                    } else t[a] = l;
                }
                delete e[n];
            }
            for (var u in t) e[u] = t[u];
            return e;
        }
        function Uo(e, t, n, r) {
            var i = (t = jo(t)).call ? t.call(e, r) : t[e];
            if (!1 === i) return "nothing";
            if ("..." === i) return "multi";
            if (null != i && n(i)) return "handled";
            if (t.fallthrough) {
                if ("[object Array]" != Object.prototype.toString.call(t.fallthrough)) return Uo(e, t.fallthrough, n, r);
                for (var o = 0; o < t.fallthrough.length; o++) {
                    var l = Uo(e, t.fallthrough[o], n, r);
                    if (l) return l;
                }
            }
        }
        function Ko(e) {
            var t = "string" == typeof e ? e : Po[e.keyCode];
            return "Ctrl" == t || "Alt" == t || "Shift" == t || "Mod" == t;
        }
        function Go(e, t, n) {
            var r = e;
            return t.altKey && "Alt" != r && (e = "Alt-" + e), (y ? t.metaKey : t.ctrlKey) && "Ctrl" != r && (e = "Ctrl-" + e),
            (y ? t.ctrlKey : t.metaKey) && "Cmd" != r && (e = "Cmd-" + e), !n && t.shiftKey && "Shift" != r && (e = "Shift-" + e),
                e;
        }
        function Vo(e, t) {
            if (m && 34 == e.keyCode && e.char) return !1;
            var n = Po[e.keyCode];
            return null != n && !e.altGraphKey && (3 == e.keyCode && e.code && (n = e.code),
                Go(n, e, t));
        }
        function jo(e) {
            return "string" == typeof e ? zo[e] : e;
        }
        function _o(t, e) {
            for (var n = t.doc.sel.ranges, r = [], i = 0; i < n.length; i++) {
                for (var o = e(n[i]); r.length && tt(o.from, Y(r).to) <= 0; ) {
                    var l = r.pop();
                    if (tt(l.from, o.from) < 0) {
                        o.from = l.from;
                        break;
                    }
                }
                r.push(o);
            }
            Xr(t, function() {
                for (var e = r.length - 1; 0 <= e; e--) uo(t.doc, "", r[e].from, r[e].to, "+delete");
                Mr(t);
            });
        }
        function qo(e, t, n) {
            var r = oe(e.text, t + n, n);
            return r < 0 || r > e.text.length ? null : r;
        }
        function Xo(e, t, n) {
            var r = qo(e, t.ch, n);
            return null == r ? null : new et(t.line, r, n < 0 ? "after" : "before");
        }
        function Yo(e, t, n, r, i) {
            if (e) {
                var o = ce(n, t.doc.direction);
                if (o) {
                    var l, a = i < 0 ? Y(o) : o[0], s = i < 0 == (1 == a.level) ? "after" : "before";
                    if (0 < a.level || "rtl" == t.doc.direction) {
                        var u = On(t, n);
                        l = i < 0 ? n.text.length - 1 : 0;
                        var c = Fn(t, u, l).top;
                        l = le(function(e) {
                            return Fn(t, u, e).top == c;
                        }, i < 0 == (1 == a.level) ? a.from : a.to - 1, l), "before" == s && (l = qo(n, l, 1));
                    } else l = i < 0 ? a.to : a.from;
                    return new et(r, l, s);
                }
            }
            return new et(r, i < 0 ? n.text.length : 0, i < 0 ? "before" : "after");
        }
        zo.basic = {
            Left: "goCharLeft",
            Right: "goCharRight",
            Up: "goLineUp",
            Down: "goLineDown",
            End: "goLineEnd",
            Home: "goLineStartSmart",
            PageUp: "goPageUp",
            PageDown: "goPageDown",
            Delete: "delCharAfter",
            Backspace: "delCharBefore",
            "Shift-Backspace": "delCharBefore",
            Tab: "defaultTab",
            "Shift-Tab": "indentAuto",
            Enter: "newlineAndIndent",
            Insert: "toggleOverwrite",
            Esc: "singleSelection"
        }, zo.pcDefault = {
            "Ctrl-A": "selectAll",
            "Ctrl-D": "deleteLine",
            "Ctrl-Z": "undo",
            "Shift-Ctrl-Z": "redo",
            "Ctrl-Y": "redo",
            "Ctrl-Home": "goDocStart",
            "Ctrl-End": "goDocEnd",
            "Ctrl-Up": "goLineUp",
            "Ctrl-Down": "goLineDown",
            "Ctrl-Left": "goGroupLeft",
            "Ctrl-Right": "goGroupRight",
            "Alt-Left": "goLineStart",
            "Alt-Right": "goLineEnd",
            "Ctrl-Backspace": "delGroupBefore",
            "Ctrl-Delete": "delGroupAfter",
            "Ctrl-S": "save",
            "Ctrl-F": "find",
            "Ctrl-G": "findNext",
            "Shift-Ctrl-G": "findPrev",
            "Shift-Ctrl-F": "replace",
            "Shift-Ctrl-R": "replaceAll",
            "Ctrl-[": "indentLess",
            "Ctrl-]": "indentMore",
            "Ctrl-U": "undoSelection",
            "Shift-Ctrl-U": "redoSelection",
            "Alt-U": "redoSelection",
            fallthrough: "basic"
        }, zo.emacsy = {
            "Ctrl-F": "goCharRight",
            "Ctrl-B": "goCharLeft",
            "Ctrl-P": "goLineUp",
            "Ctrl-N": "goLineDown",
            "Alt-F": "goWordRight",
            "Alt-B": "goWordLeft",
            "Ctrl-A": "goLineStart",
            "Ctrl-E": "goLineEnd",
            "Ctrl-V": "goPageDown",
            "Shift-Ctrl-V": "goPageUp",
            "Ctrl-D": "delCharAfter",
            "Ctrl-H": "delCharBefore",
            "Alt-D": "delWordAfter",
            "Alt-Backspace": "delWordBefore",
            "Ctrl-K": "killLine",
            "Ctrl-T": "transposeChars",
            "Ctrl-O": "openLine"
        }, zo.macDefault = {
            "Cmd-A": "selectAll",
            "Cmd-D": "deleteLine",
            "Cmd-Z": "undo",
            "Shift-Cmd-Z": "redo",
            "Cmd-Y": "redo",
            "Cmd-Home": "goDocStart",
            "Cmd-Up": "goDocStart",
            "Cmd-End": "goDocEnd",
            "Cmd-Down": "goDocEnd",
            "Alt-Left": "goGroupLeft",
            "Alt-Right": "goGroupRight",
            "Cmd-Left": "goLineLeft",
            "Cmd-Right": "goLineRight",
            "Alt-Backspace": "delGroupBefore",
            "Ctrl-Alt-Backspace": "delGroupAfter",
            "Alt-Delete": "delGroupAfter",
            "Cmd-S": "save",
            "Cmd-F": "find",
            "Cmd-G": "findNext",
            "Shift-Cmd-G": "findPrev",
            "Cmd-Alt-F": "replace",
            "Shift-Cmd-Alt-F": "replaceAll",
            "Cmd-[": "indentLess",
            "Cmd-]": "indentMore",
            "Cmd-Backspace": "delWrappedLineLeft",
            "Cmd-Delete": "delWrappedLineRight",
            "Cmd-U": "undoSelection",
            "Shift-Cmd-U": "redoSelection",
            "Ctrl-Up": "goDocStart",
            "Ctrl-Down": "goDocEnd",
            fallthrough: [ "basic", "emacsy" ]
        }, zo.default = w ? zo.macDefault : zo.pcDefault;
        var $o = {
            selectAll: no,
            singleSelection: function(e) {
                return e.setSelection(e.getCursor("anchor"), e.getCursor("head"), G);
            },
            killLine: function(n) {
                return _o(n, function(e) {
                    if (e.empty()) {
                        var t = _e(n.doc, e.head.line).text.length;
                        return e.head.ch == t && e.head.line < n.lastLine() ? {
                            from: e.head,
                            to: et(e.head.line + 1, 0)
                        } : {
                            from: e.head,
                            to: et(e.head.line, t)
                        };
                    }
                    return {
                        from: e.from(),
                        to: e.to()
                    };
                });
            },
            deleteLine: function(t) {
                return _o(t, function(e) {
                    return {
                        from: et(e.from().line, 0),
                        to: at(t.doc, et(e.to().line + 1, 0))
                    };
                });
            },
            delLineLeft: function(e) {
                return _o(e, function(e) {
                    return {
                        from: et(e.from().line, 0),
                        to: e.from()
                    };
                });
            },
            delWrappedLineLeft: function(n) {
                return _o(n, function(e) {
                    var t = n.charCoords(e.head, "div").top + 5;
                    return {
                        from: n.coordsChar({
                            left: 0,
                            top: t
                        }, "div"),
                        to: e.from()
                    };
                });
            },
            delWrappedLineRight: function(r) {
                return _o(r, function(e) {
                    var t = r.charCoords(e.head, "div").top + 5, n = r.coordsChar({
                        left: r.display.lineDiv.offsetWidth + 100,
                        top: t
                    }, "div");
                    return {
                        from: e.from(),
                        to: n
                    };
                });
            },
            undo: function(e) {
                return e.undo();
            },
            redo: function(e) {
                return e.redo();
            },
            undoSelection: function(e) {
                return e.undoSelection();
            },
            redoSelection: function(e) {
                return e.redoSelection();
            },
            goDocStart: function(e) {
                return e.extendSelection(et(e.firstLine(), 0));
            },
            goDocEnd: function(e) {
                return e.extendSelection(et(e.lastLine()));
            },
            goLineStart: function(t) {
                return t.extendSelectionsBy(function(e) {
                    return Zo(t, e.head.line);
                }, {
                    origin: "+move",
                    bias: 1
                });
            },
            goLineStartSmart: function(t) {
                return t.extendSelectionsBy(function(e) {
                    return Jo(t, e.head);
                }, {
                    origin: "+move",
                    bias: 1
                });
            },
            goLineEnd: function(t) {
                return t.extendSelectionsBy(function(e) {
                    return function(e, t) {
                        var n = _e(e.doc, t), r = function(e) {
                            for (var t; t = Ht(e); ) e = t.find(1, !0).line;
                            return e;
                        }(n);
                        r != n && (t = $e(r));
                        return Yo(!0, e, n, t, -1);
                    }(t, e.head.line);
                }, {
                    origin: "+move",
                    bias: -1
                });
            },
            goLineRight: function(n) {
                return n.extendSelectionsBy(function(e) {
                    var t = n.cursorCoords(e.head, "div").top + 5;
                    return n.coordsChar({
                        left: n.display.lineDiv.offsetWidth + 100,
                        top: t
                    }, "div");
                }, j);
            },
            goLineLeft: function(n) {
                return n.extendSelectionsBy(function(e) {
                    var t = n.cursorCoords(e.head, "div").top + 5;
                    return n.coordsChar({
                        left: 0,
                        top: t
                    }, "div");
                }, j);
            },
            goLineLeftSmart: function(r) {
                return r.extendSelectionsBy(function(e) {
                    var t = r.cursorCoords(e.head, "div").top + 5, n = r.coordsChar({
                        left: 0,
                        top: t
                    }, "div");
                    return n.ch < r.getLine(n.line).search(/\S/) ? Jo(r, e.head) : n;
                }, j);
            },
            goLineUp: function(e) {
                return e.moveV(-1, "line");
            },
            goLineDown: function(e) {
                return e.moveV(1, "line");
            },
            goPageUp: function(e) {
                return e.moveV(-1, "page");
            },
            goPageDown: function(e) {
                return e.moveV(1, "page");
            },
            goCharLeft: function(e) {
                return e.moveH(-1, "char");
            },
            goCharRight: function(e) {
                return e.moveH(1, "char");
            },
            goColumnLeft: function(e) {
                return e.moveH(-1, "column");
            },
            goColumnRight: function(e) {
                return e.moveH(1, "column");
            },
            goWordLeft: function(e) {
                return e.moveH(-1, "word");
            },
            goGroupRight: function(e) {
                return e.moveH(1, "group");
            },
            goGroupLeft: function(e) {
                return e.moveH(-1, "group");
            },
            goWordRight: function(e) {
                return e.moveH(1, "word");
            },
            delCharBefore: function(e) {
                return e.deleteH(-1, "char");
            },
            delCharAfter: function(e) {
                return e.deleteH(1, "char");
            },
            delWordBefore: function(e) {
                return e.deleteH(-1, "word");
            },
            delWordAfter: function(e) {
                return e.deleteH(1, "word");
            },
            delGroupBefore: function(e) {
                return e.deleteH(-1, "group");
            },
            delGroupAfter: function(e) {
                return e.deleteH(1, "group");
            },
            indentAuto: function(e) {
                return e.indentSelection("smart");
            },
            indentMore: function(e) {
                return e.indentSelection("add");
            },
            indentLess: function(e) {
                return e.indentSelection("subtract");
            },
            insertTab: function(e) {
                return e.replaceSelection("\t");
            },
            insertSoftTab: function(e) {
                for (var t = [], n = e.listSelections(), r = e.options.tabSize, i = 0; i < n.length; i++) {
                    var o = n[i].from(), l = z(e.getLine(o.line), o.ch, r);
                    t.push(X(r - l % r));
                }
                e.replaceSelections(t);
            },
            defaultTab: function(e) {
                e.somethingSelected() ? e.indentSelection("add") : e.execCommand("insertTab");
            },
            transposeChars: function(l) {
                return Xr(l, function() {
                    for (var e = l.listSelections(), t = [], n = 0; n < e.length; n++) if (e[n].empty()) {
                        var r = e[n].head, i = _e(l.doc, r.line).text;
                        if (i) if (r.ch == i.length && (r = new et(r.line, r.ch - 1)), 0 < r.ch) r = new et(r.line, r.ch + 1),
                            l.replaceRange(i.charAt(r.ch - 1) + i.charAt(r.ch - 2), et(r.line, r.ch - 2), r, "+transpose"); else if (r.line > l.doc.first) {
                            var o = _e(l.doc, r.line - 1).text;
                            o && (r = new et(r.line, 1), l.replaceRange(i.charAt(0) + l.doc.lineSeparator() + o.charAt(o.length - 1), et(r.line - 1, o.length - 1), r, "+transpose"));
                        }
                        t.push(new yi(r, r));
                    }
                    l.setSelections(t);
                });
            },
            newlineAndIndent: function(r) {
                return Xr(r, function() {
                    for (var e = r.listSelections(), t = e.length - 1; 0 <= t; t--) r.replaceRange(r.doc.lineSeparator(), e[t].anchor, e[t].head, "+input");
                    e = r.listSelections();
                    for (var n = 0; n < e.length; n++) r.indentLine(e[n].from().line, null, !0);
                    Mr(r);
                });
            },
            openLine: function(e) {
                return e.replaceSelection("\n", "start");
            },
            toggleOverwrite: function(e) {
                return e.toggleOverwrite();
            }
        };
        function Zo(e, t) {
            var n = _e(e.doc, t), r = zt(n);
            return r != n && (t = $e(r)), Yo(!0, e, r, t, 1);
        }
        function Jo(e, t) {
            var n = Zo(e, t.line), r = _e(e.doc, n.line), i = ce(r, e.doc.direction);
            if (!i || 0 == i[0].level) {
                var o = Math.max(0, r.text.search(/\S/)), l = t.line == n.line && t.ch <= o && t.ch;
                return et(n.line, l ? 0 : o, n.sticky);
            }
            return n;
        }
        function Qo(e, t, n) {
            if ("string" == typeof t && !(t = $o[t])) return !1;
            e.display.input.ensurePolled();
            var r = e.display.shift, i = !1;
            try {
                e.isReadOnly() && (e.state.suppressEdits = !0), n && (e.display.shift = !1), i = t(e) != K;
            } finally {
                e.display.shift = r, e.state.suppressEdits = !1;
            }
            return i;
        }
        var el = new R();
        function tl(e, t, n, r) {
            var i = e.state.keySeq;
            if (i) {
                if (Ko(t)) return "handled";
                if (/\'$/.test(t) ? e.state.keySeq = null : el.set(50, function() {
                    e.state.keySeq == i && (e.state.keySeq = null, e.display.input.reset());
                }), nl(e, i + " " + t, n, r)) return !0;
            }
            return nl(e, t, n, r);
        }
        function nl(e, t, n, r) {
            var i = function(e, t, n) {
                for (var r = 0; r < e.state.keyMaps.length; r++) {
                    var i = Uo(t, e.state.keyMaps[r], n, e);
                    if (i) return i;
                }
                return e.options.extraKeys && Uo(t, e.options.extraKeys, n, e) || Uo(t, e.options.keyMap, n, e);
            }(e, t, r);
            return "multi" == i && (e.state.keySeq = t), "handled" == i && an(e, "keyHandled", e, t, n),
            "handled" != i && "multi" != i || (we(n), vr(e)), !!i;
        }
        function rl(t, e) {
            var n = Vo(e, !0);
            return !!n && (e.shiftKey && !t.state.keySeq ? tl(t, "Shift-" + n, e, function(e) {
                return Qo(t, e, !0);
            }) || tl(t, n, e, function(e) {
                if ("string" == typeof e ? /^go[A-Z]/.test(e) : e.motion) return Qo(t, e);
            }) : tl(t, n, e, function(e) {
                return Qo(t, e);
            }));
        }
        var il = null;
        function ol(e) {
            var t = this;
            if (t.curOp.focus = D(), !me(t, e)) {
                x && C < 11 && 27 == e.keyCode && (e.returnValue = !1);
                var n = e.keyCode;
                t.display.shift = 16 == n || e.shiftKey;
                var r = rl(t, e);
                m && (il = r ? n : null, !r && 88 == n && !Pe && (w ? e.metaKey : e.ctrlKey) && t.replaceSelection("", null, "cut")),
                18 != n || /\bCodeMirror-crosshair\b/.test(t.display.lineDiv.className) || function(e) {
                    var t = e.display.lineDiv;
                    function n(e) {
                        18 != e.keyCode && e.altKey || (T(t, "CodeMirror-crosshair"), pe(document, "keyup", n),
                            pe(document, "mouseover", n));
                    }
                    W(t, "CodeMirror-crosshair"), he(document, "keyup", n), he(document, "mouseover", n);
                }(t);
            }
        }
        function ll(e) {
            16 == e.keyCode && (this.doc.sel.shift = !1), me(this, e);
        }
        function al(e) {
            var t = this;
            if (!(wn(t.display, e) || me(t, e) || e.ctrlKey && !e.altKey || w && e.metaKey)) {
                var n = e.keyCode, r = e.charCode;
                if (m && n == il) return il = null, void we(e);
                if (!m || e.which && !(e.which < 10) || !rl(t, e)) {
                    var i, o = String.fromCharCode(null == r ? n : r);
                    if ("\b" != o) if (!tl(i = t, "'" + o + "'", e, function(e) {
                        return Qo(i, e, !0);
                    })) t.display.input.onKeyPress(e);
                }
            }
        }
        var sl, ul, cl = function(e, t, n) {
            this.time = e, this.pos = t, this.button = n;
        };
        function fl(e) {
            var t = this, n = t.display;
            if (!(me(t, e) || n.activeTouch && n.input.supportsTouch())) if (n.input.ensurePolled(),
                n.shift = e.shiftKey, wn(n, e)) b || (n.scroller.draggable = !1, setTimeout(function() {
                return n.scroller.draggable = !0;
            }, 100)); else if (!pl(t, e)) {
                var r, i, o, l = or(t, e), a = Le(e), s = l ? (r = l, i = a, o = +new Date(), ul && ul.compare(o, r, i) ? (sl = ul = null,
                    "triple") : sl && sl.compare(o, r, i) ? (ul = new cl(o, r, i), sl = null, "double") : (sl = new cl(o, r, i),
                    ul = null, "single")) : "single";
                window.focus(), 1 == a && t.state.selectingText && t.state.selectingText(e), l && function(n, e, r, t, i) {
                    var o = "Click";
                    "double" == t ? o = "Double" + o : "triple" == t && (o = "Triple" + o);
                    return tl(n, Go(o = (1 == e ? "Left" : 2 == e ? "Middle" : "Right") + o, i), i, function(e) {
                        if ("string" == typeof e && (e = $o[e]), !e) return !1;
                        var t = !1;
                        try {
                            n.isReadOnly() && (n.state.suppressEdits = !0), t = e(n, r) != K;
                        } finally {
                            n.state.suppressEdits = !1;
                        }
                        return t;
                    });
                }(t, a, l, s, e) || (1 == a ? l ? function(e, t, n, r) {
                    x ? setTimeout(I(yr, e), 0) : e.curOp.focus = D();
                    var i, o = function(e, t, n) {
                        var r = e.getOption("configureMouse"), i = r ? r(e, t, n) : {};
                        if (null == i.unit) {
                            var o = d ? n.shiftKey && n.metaKey : n.altKey;
                            i.unit = o ? "rectangle" : "single" == t ? "char" : "double" == t ? "word" : "line";
                        }
                        (null == i.extend || e.doc.extend) && (i.extend = e.doc.extend || n.shiftKey);
                        null == i.addNew && (i.addNew = w ? n.metaKey : n.ctrlKey);
                        null == i.moveOnDrag && (i.moveOnDrag = !(w ? n.altKey : n.ctrlKey));
                        return i;
                    }(e, n, r), l = e.doc.sel;
                    e.options.dragDrop && Ne && !e.isReadOnly() && "single" == n && -1 < (i = l.contains(t)) && (tt((i = l.ranges[i]).from(), t) < 0 || 0 < t.xRel) && (0 < tt(i.to(), t) || t.xRel < 0) ? function(t, n, r, i) {
                        var o = t.display, l = !1, a = Yr(t, function(e) {
                            b && (o.scroller.draggable = !1), t.state.draggingText = !1, pe(o.wrapper.ownerDocument, "mouseup", a),
                                pe(o.wrapper.ownerDocument, "mousemove", s), pe(o.scroller, "dragstart", u), pe(o.scroller, "drop", a),
                            l || (we(e), i.addNew || Gi(t.doc, r, null, null, i.extend), b || x && 9 == C ? setTimeout(function() {
                                o.wrapper.ownerDocument.body.focus(), o.input.focus();
                            }, 20) : o.input.focus());
                        }), s = function(e) {
                            l = l || 10 <= Math.abs(n.clientX - e.clientX) + Math.abs(n.clientY - e.clientY);
                        }, u = function() {
                            return l = !0;
                        };
                        b && (o.scroller.draggable = !0);
                        (t.state.draggingText = a).copy = !i.moveOnDrag, o.scroller.dragDrop && o.scroller.dragDrop();
                        he(o.wrapper.ownerDocument, "mouseup", a), he(o.wrapper.ownerDocument, "mousemove", s),
                            he(o.scroller, "dragstart", u), he(o.scroller, "drop", a), br(t), setTimeout(function() {
                            return o.input.focus();
                        }, 20);
                    }(e, r, t, o) : function(m, e, v, y) {
                        var l = m.display, b = m.doc;
                        we(e);
                        var w, x, C = b.sel, t = C.ranges;
                        y.addNew && !y.extend ? (x = b.sel.contains(v), w = -1 < x ? t[x] : new yi(v, v)) : (w = b.sel.primary(),
                            x = b.sel.primIndex);
                        if ("rectangle" == y.unit) y.addNew || (w = new yi(v, v)), v = or(m, e, !0, !0),
                            x = -1; else {
                            var n = hl(m, v, y.unit);
                            w = y.extend ? Ki(w, n.anchor, n.head, y.extend) : n;
                        }
                        y.addNew ? -1 == x ? (x = t.length, Xi(b, bi(m, t.concat([ w ]), x), {
                            scroll: !1,
                            origin: "*mouse"
                        })) : 1 < t.length && t[x].empty() && "char" == y.unit && !y.extend ? (Xi(b, bi(m, t.slice(0, x).concat(t.slice(x + 1)), 0), {
                            scroll: !1,
                            origin: "*mouse"
                        }), C = b.sel) : ji(b, x, w, V) : (Xi(b, new vi([ w ], x = 0), V), C = b.sel);
                        var S = v;
                        function a(e) {
                            if (0 != tt(S, e)) if (S = e, "rectangle" == y.unit) {
                                for (var t = [], n = m.options.tabSize, r = z(_e(b, v.line).text, v.ch, n), i = z(_e(b, e.line).text, e.ch, n), o = Math.min(r, i), l = Math.max(r, i), a = Math.min(v.line, e.line), s = Math.min(m.lastLine(), Math.max(v.line, e.line)); a <= s; a++) {
                                    var u = _e(b, a).text, c = _(u, o, n);
                                    o == l ? t.push(new yi(et(a, c), et(a, c))) : u.length > c && t.push(new yi(et(a, c), et(a, _(u, l, n))));
                                }
                                t.length || t.push(new yi(v, v)), Xi(b, bi(m, C.ranges.slice(0, x).concat(t), x), {
                                    origin: "*mouse",
                                    scroll: !1
                                }), m.scrollIntoView(e);
                            } else {
                                var f, h = w, d = hl(m, e, y.unit), p = h.anchor;
                                0 < tt(d.anchor, p) ? (f = d.head, p = ot(h.from(), d.anchor)) : (f = d.anchor,
                                    p = it(h.to(), d.head));
                                var g = C.ranges.slice(0);
                                g[x] = function(e, t) {
                                    var n = t.anchor, r = t.head, i = _e(e.doc, n.line);
                                    if (0 == tt(n, r) && n.sticky == r.sticky) return t;
                                    var o = ce(i);
                                    if (!o) return t;
                                    var l = se(o, n.ch, n.sticky), a = o[l];
                                    if (a.from != n.ch && a.to != n.ch) return t;
                                    var s, u = l + (a.from == n.ch == (1 != a.level) ? 0 : 1);
                                    if (0 == u || u == o.length) return t;
                                    if (r.line != n.line) s = 0 < (r.line - n.line) * ("ltr" == e.doc.direction ? 1 : -1); else {
                                        var c = se(o, r.ch, r.sticky), f = c - l || (r.ch - n.ch) * (1 == a.level ? -1 : 1);
                                        s = c == u - 1 || c == u ? f < 0 : 0 < f;
                                    }
                                    var h = o[u + (s ? -1 : 0)], d = s == (1 == h.level), p = d ? h.from : h.to, g = d ? "after" : "before";
                                    return n.ch == p && n.sticky == g ? t : new yi(new et(n.line, p, g), r);
                                }(m, new yi(at(b, p), f)), Xi(b, bi(m, g, x), V);
                            }
                        }
                        var s = l.wrapper.getBoundingClientRect(), u = 0;
                        function r(e) {
                            m.state.selectingText = !1, u = 1 / 0, e && (we(e), l.input.focus()), pe(l.wrapper.ownerDocument, "mousemove", i),
                                pe(l.wrapper.ownerDocument, "mouseup", o), b.history.lastSelOrigin = null;
                        }
                        var i = Yr(m, function(e) {
                            0 !== e.buttons && Le(e) ? function e(t) {
                                var n = ++u;
                                var r = or(m, t, !0, "rectangle" == y.unit);
                                if (!r) return;
                                if (0 != tt(r, S)) {
                                    m.curOp.focus = D(), a(r);
                                    var i = kr(l, b);
                                    (r.line >= i.to || r.line < i.from) && setTimeout(Yr(m, function() {
                                        u == n && e(t);
                                    }), 150);
                                } else {
                                    var o = t.clientY < s.top ? -20 : t.clientY > s.bottom ? 20 : 0;
                                    o && setTimeout(Yr(m, function() {
                                        u == n && (l.scroller.scrollTop += o, e(t));
                                    }), 50);
                                }
                            }(e) : r(e);
                        }), o = Yr(m, r);
                        m.state.selectingText = o, he(l.wrapper.ownerDocument, "mousemove", i), he(l.wrapper.ownerDocument, "mouseup", o);
                    }(e, r, t, o);
                }(t, l, s, e) : ke(e) == n.scroller && we(e) : 2 == a ? (l && Gi(t.doc, l), setTimeout(function() {
                    return n.input.focus();
                }, 20)) : 3 == a && (S ? t.display.input.onContextMenu(e) : br(t)));
            }
        }
        function hl(e, t, n) {
            if ("char" == n) return new yi(t, t);
            if ("word" == n) return e.findWordAt(t);
            if ("line" == n) return new yi(et(t.line, 0), at(e.doc, et(t.line + 1, 0)));
            var r = n(e, t);
            return new yi(r.from, r.to);
        }
        function dl(e, t, n, r) {
            var i, o;
            if (t.touches) i = t.touches[0].clientX, o = t.touches[0].clientY; else try {
                i = t.clientX, o = t.clientY;
            } catch (t) {
                return !1;
            }
            if (i >= Math.floor(e.display.gutters.getBoundingClientRect().right)) return !1;
            r && we(t);
            var l = e.display, a = l.lineDiv.getBoundingClientRect();
            if (o > a.bottom || !ye(e, n)) return Ce(t);
            o -= a.top - l.viewOffset;
            for (var s = 0; s < e.display.gutterSpecs.length; ++s) {
                var u = l.gutters.childNodes[s];
                if (u && u.getBoundingClientRect().right >= i) return ge(e, n, e, Ze(e.doc, o), e.display.gutterSpecs[s].className, t),
                    Ce(t);
            }
        }
        function pl(e, t) {
            return dl(e, t, "gutterClick", !0);
        }
        function gl(e, t) {
            wn(e.display, t) || function(e, t) {
                if (!ye(e, "gutterContextMenu")) return !1;
                return dl(e, t, "gutterContextMenu", !1);
            }(e, t) || me(e, t, "contextmenu") || S || e.display.input.onContextMenu(t);
        }
        function ml(e) {
            e.display.wrapper.className = e.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") + e.options.theme.replace(/(^|\s)\s*/g, " cm-s-"),
                zn(e);
        }
        cl.prototype.compare = function(e, t, n) {
            return this.time + 400 > e && 0 == tt(t, this.pos) && n == this.button;
        };
        var vl = {
            toString: function() {
                return "CodeMirror.Init";
            }
        }, yl = {}, bl = {};
        function wl(e, t, n) {
            if (!t != !(n && n != vl)) {
                var r = e.display.dragFunctions, i = t ? he : pe;
                i(e.display.scroller, "dragstart", r.start), i(e.display.scroller, "dragenter", r.enter),
                    i(e.display.scroller, "dragover", r.over), i(e.display.scroller, "dragleave", r.leave),
                    i(e.display.scroller, "drop", r.drop);
            }
        }
        function xl(e) {
            e.options.lineWrapping ? (W(e.display.wrapper, "CodeMirror-wrap"), e.display.sizer.style.minWidth = "",
                e.display.sizerWidth = null) : (T(e.display.wrapper, "CodeMirror-wrap"), jt(e)),
                ir(e), ar(e), zn(e), setTimeout(function() {
                return Er(e);
            }, 100);
        }
        function Cl(e, t) {
            var n = this;
            if (!(this instanceof Cl)) return new Cl(e, t);
            this.options = t = t ? E(t) : {}, E(yl, t, !1);
            var r = t.value;
            "string" == typeof r ? r = new To(r, t.mode, null, t.lineSeparator, t.direction) : t.mode && (r.modeOption = t.mode),
                this.doc = r;
            var i = new Cl.inputStyles[t.inputStyle](this), o = this.display = new fi(e, r, i, t);
            for (var l in ml(o.wrapper.CodeMirror = this), t.lineWrapping && (this.display.wrapper.className += " CodeMirror-wrap"),
                Br(this), this.state = {
                keyMaps: [],
                overlays: [],
                modeGen: 0,
                overwrite: !1,
                delayingBlurEvent: !1,
                focused: !1,
                suppressEdits: !1,
                pasteIncoming: -1,
                cutIncoming: -1,
                selectingText: !1,
                draggingText: !1,
                highlight: new R(),
                keySeq: null,
                specialChars: null
            }, t.autofocus && !h && o.input.focus(), x && C < 11 && setTimeout(function() {
                return n.display.input.reset(!0);
            }, 20), function(i) {
                var o = i.display;
                he(o.scroller, "mousedown", Yr(i, fl)), he(o.scroller, "dblclick", x && C < 11 ? Yr(i, function(e) {
                    if (!me(i, e)) {
                        var t = or(i, e);
                        if (t && !pl(i, e) && !wn(i.display, e)) {
                            we(e);
                            var n = i.findWordAt(t);
                            Gi(i.doc, n.anchor, n.head);
                        }
                    }
                }) : function(e) {
                    return me(i, e) || we(e);
                });
                he(o.scroller, "contextmenu", function(e) {
                    return gl(i, e);
                });
                var n, r = {
                    end: 0
                };
                function l() {
                    o.activeTouch && (n = setTimeout(function() {
                        return o.activeTouch = null;
                    }, 1e3), (r = o.activeTouch).end = +new Date());
                }
                function a(e, t) {
                    if (null == t.left) return !0;
                    var n = t.left - e.left, r = t.top - e.top;
                    return 400 < n * n + r * r;
                }
                he(o.scroller, "touchstart", function(e) {
                    if (!me(i, e) && !function(e) {
                        if (1 != e.touches.length) return !1;
                        var t = e.touches[0];
                        return t.radiusX <= 1 && t.radiusY <= 1;
                    }(e) && !pl(i, e)) {
                        o.input.ensurePolled(), clearTimeout(n);
                        var t = +new Date();
                        o.activeTouch = {
                            start: t,
                            moved: !1,
                            prev: t - r.end <= 300 ? r : null
                        }, 1 == e.touches.length && (o.activeTouch.left = e.touches[0].pageX, o.activeTouch.top = e.touches[0].pageY);
                    }
                }), he(o.scroller, "touchmove", function() {
                    o.activeTouch && (o.activeTouch.moved = !0);
                }), he(o.scroller, "touchend", function(e) {
                    var t = o.activeTouch;
                    if (t && !wn(o, e) && null != t.left && !t.moved && new Date() - t.start < 300) {
                        var n, r = i.coordsChar(o.activeTouch, "page");
                        n = !t.prev || a(t, t.prev) ? new yi(r, r) : !t.prev.prev || a(t, t.prev.prev) ? i.findWordAt(r) : new yi(et(r.line, 0), at(i.doc, et(r.line + 1, 0))),
                            i.setSelection(n.anchor, n.head), i.focus(), we(e);
                    }
                    l();
                }), he(o.scroller, "touchcancel", l), he(o.scroller, "scroll", function() {
                    o.scroller.clientHeight && (Fr(i, o.scroller.scrollTop), Wr(i, o.scroller.scrollLeft, !0),
                        ge(i, "scroll", i));
                }), he(o.scroller, "mousewheel", function(e) {
                    return mi(i, e);
                }), he(o.scroller, "DOMMouseScroll", function(e) {
                    return mi(i, e);
                }), he(o.wrapper, "scroll", function() {
                    return o.wrapper.scrollTop = o.wrapper.scrollLeft = 0;
                }), o.dragFunctions = {
                    enter: function(e) {
                        me(i, e) || Se(e);
                    },
                    over: function(e) {
                        me(i, e) || (!function(e, t) {
                            var n = or(e, t);
                            if (n) {
                                var r = document.createDocumentFragment();
                                pr(e, n, r), e.display.dragCursor || (e.display.dragCursor = O("div", null, "CodeMirror-cursors CodeMirror-dragcursors"),
                                    e.display.lineSpace.insertBefore(e.display.dragCursor, e.display.cursorDiv)), N(e.display.dragCursor, r);
                            }
                        }(i, e), Se(e));
                    },
                    start: function(e) {
                        return function(e, t) {
                            if (x && (!e.state.draggingText || +new Date() - Mo < 100)) Se(t); else if (!me(e, t) && !wn(e.display, t) && (t.dataTransfer.setData("Text", e.getSelection()),
                                t.dataTransfer.effectAllowed = "copyMove", t.dataTransfer.setDragImage && !s)) {
                                var n = O("img", null, null, "position: fixed; left: 0; top: 0;");
                                n.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
                                m && (n.width = n.height = 1, e.display.wrapper.appendChild(n), n._top = n.offsetTop),
                                    t.dataTransfer.setDragImage(n, 0, 0), m && n.parentNode.removeChild(n);
                            }
                        }(i, e);
                    },
                    drop: Yr(i, No),
                    leave: function(e) {
                        me(i, e) || Ao(i);
                    }
                };
                var e = o.input.getField();
                he(e, "keyup", function(e) {
                    return ll.call(i, e);
                }), he(e, "keydown", Yr(i, ol)), he(e, "keypress", Yr(i, al)), he(e, "focus", function(e) {
                    return wr(i, e);
                }), he(e, "blur", function(e) {
                    return xr(i, e);
                });
            }(this), Do(), Kr(this), this.curOp.forceUpdate = !0, Oi(this, r), t.autofocus && !h || this.hasFocus() ? setTimeout(I(wr, this), 20) : xr(this),
                bl) bl.hasOwnProperty(l) && bl[l](n, t[l], vl);
            ai(this), t.finishInit && t.finishInit(this);
            for (var a = 0; a < Sl.length; ++a) Sl[a](n);
            Gr(this), b && t.lineWrapping && "optimizelegibility" == getComputedStyle(o.lineDiv).textRendering && (o.lineDiv.style.textRendering = "auto");
        }
        Cl.defaults = yl, Cl.optionHandlers = bl;
        var Sl = [];
        function kl(e, t, n, r) {
            var i, o = e.doc;
            null == n && (n = "add"), "smart" == n && (o.mode.indent ? i = dt(e, t).state : n = "prev");
            var l = e.options.tabSize, a = _e(o, t), s = z(a.text, null, l);
            a.stateAfter && (a.stateAfter = null);
            var u, c = a.text.match(/^\s*/)[0];
            if (r || /\S/.test(a.text)) {
                if ("smart" == n && ((u = o.mode.indent(i, a.text.slice(c.length), a.text)) == K || 150 < u)) {
                    if (!r) return;
                    n = "prev";
                }
            } else u = 0, n = "not";
            "prev" == n ? u = t > o.first ? z(_e(o, t - 1).text, null, l) : 0 : "add" == n ? u = s + e.options.indentUnit : "subtract" == n ? u = s - e.options.indentUnit : "number" == typeof n && (u = s + n),
                u = Math.max(0, u);
            var f = "", h = 0;
            if (e.options.indentWithTabs) for (var d = Math.floor(u / l); d; --d) h += l, f += "\t";
            if (h < u && (f += X(u - h)), f != c) return uo(o, f, et(t, 0), et(t, c.length), "+input"),
                !(a.stateAfter = null);
            for (var p = 0; p < o.sel.ranges.length; p++) {
                var g = o.sel.ranges[p];
                if (g.head.line == t && g.head.ch < c.length) {
                    var m = et(t, c.length);
                    ji(o, p, new yi(m, m));
                    break;
                }
            }
        }
        Cl.defineInitHook = function(e) {
            return Sl.push(e);
        };
        var Ll = null;
        function Tl(e) {
            Ll = e;
        }
        function Ml(e, t, n, r, i) {
            var o = e.doc;
            e.display.shift = !1, r || (r = o.sel);
            var l = +new Date() - 200, a = "paste" == i || e.state.pasteIncoming > l, s = De(t), u = null;
            if (a && 1 < r.ranges.length) if (Ll && Ll.text.join("\n") == t) {
                if (r.ranges.length % Ll.text.length == 0) {
                    u = [];
                    for (var c = 0; c < Ll.text.length; c++) u.push(o.splitLines(Ll.text[c]));
                }
            } else s.length == r.ranges.length && e.options.pasteLinesPerSelection && (u = $(s, function(e) {
                return [ e ];
            }));
            for (var f = e.curOp.updateInput, h = r.ranges.length - 1; 0 <= h; h--) {
                var d = r.ranges[h], p = d.from(), g = d.to();
                d.empty() && (n && 0 < n ? p = et(p.line, p.ch - n) : e.state.overwrite && !a ? g = et(g.line, Math.min(_e(o, g.line).text.length, g.ch + Y(s).length)) : a && Ll && Ll.lineWise && Ll.text.join("\n") == t && (p = g = et(p.line, 0)));
                var m = {
                    from: p,
                    to: g,
                    text: u ? u[h % u.length] : s,
                    origin: i || (a ? "paste" : e.state.cutIncoming > l ? "cut" : "+input")
                };
                io(e.doc, m), an(e, "inputRead", e, m);
            }
            t && !a && Al(e, t), Mr(e), e.curOp.updateInput < 2 && (e.curOp.updateInput = f),
                e.curOp.typing = !0, e.state.pasteIncoming = e.state.cutIncoming = -1;
        }
        function Nl(e, t) {
            var n = e.clipboardData && e.clipboardData.getData("Text");
            if (n) return e.preventDefault(), t.isReadOnly() || t.options.disableInput || Xr(t, function() {
                return Ml(t, n, 0, null, "paste");
            }), !0;
        }
        function Al(e, t) {
            if (e.options.electricChars && e.options.smartIndent) for (var n = e.doc.sel, r = n.ranges.length - 1; 0 <= r; r--) {
                var i = n.ranges[r];
                if (!(100 < i.head.ch || r && n.ranges[r - 1].head.line == i.head.line)) {
                    var o = e.getModeAt(i.head), l = !1;
                    if (o.electricChars) {
                        for (var a = 0; a < o.electricChars.length; a++) if (-1 < t.indexOf(o.electricChars.charAt(a))) {
                            l = kl(e, i.head.line, "smart");
                            break;
                        }
                    } else o.electricInput && o.electricInput.test(_e(e.doc, i.head.line).text.slice(0, i.head.ch)) && (l = kl(e, i.head.line, "smart"));
                    l && an(e, "electricInput", e, i.head.line);
                }
            }
        }
        function Ol(e) {
            for (var t = [], n = [], r = 0; r < e.doc.sel.ranges.length; r++) {
                var i = e.doc.sel.ranges[r].head.line, o = {
                    anchor: et(i, 0),
                    head: et(i + 1, 0)
                };
                n.push(o), t.push(e.getRange(o.anchor, o.head));
            }
            return {
                text: t,
                ranges: n
            };
        }
        function Fl(e, t, n, r) {
            e.setAttribute("autocorrect", n ? "" : "off"), e.setAttribute("autocapitalize", r ? "" : "off"),
                e.setAttribute("spellcheck", !!t);
        }
        function Dl() {
            var e = O("textarea", null, null, "position: absolute; bottom: -1em; padding: 0; width: 1px; height: 1em; outline: none"), t = O("div", [ e ], null, "overflow: hidden; position: relative; width: 3px; height: 0px;");
            return b ? e.style.width = "1000px" : e.setAttribute("wrap", "off"), c && (e.style.border = "1px solid black"),
                Fl(e), t;
        }
        function Wl(r, i, o, e, l) {
            var t = i, n = o, a = _e(r, i.line);
            function s(e) {
                var t, n;
                if (null == (t = l ? function(t, n, a, e) {
                    var s = ce(n, t.doc.direction);
                    if (!s) return Xo(n, a, e);
                    a.ch >= n.text.length ? (a.ch = n.text.length, a.sticky = "before") : a.ch <= 0 && (a.ch = 0,
                        a.sticky = "after");
                    var r = se(s, a.ch, a.sticky), i = s[r];
                    if ("ltr" == t.doc.direction && i.level % 2 == 0 && (0 < e ? i.to > a.ch : i.from < a.ch)) return Xo(n, a, e);
                    var o, u = function(e, t) {
                        return qo(n, e instanceof et ? e.ch : e, t);
                    }, l = function(e) {
                        return t.options.lineWrapping ? (o = o || On(t, n), $n(t, n, o, e)) : {
                            begin: 0,
                            end: n.text.length
                        };
                    }, c = l("before" == a.sticky ? u(a, -1) : a.ch);
                    if ("rtl" == t.doc.direction || 1 == i.level) {
                        var f = 1 == i.level == e < 0, h = u(a, f ? 1 : -1);
                        if (null != h && (f ? h <= i.to && h <= c.end : h >= i.from && h >= c.begin)) {
                            var d = f ? "before" : "after";
                            return new et(a.line, h, d);
                        }
                    }
                    var p = function(e, t, n) {
                        for (var r = function(e, t) {
                            return t ? new et(a.line, u(e, 1), "before") : new et(a.line, e, "after");
                        }; 0 <= e && e < s.length; e += t) {
                            var i = s[e], o = 0 < t == (1 != i.level), l = o ? n.begin : u(n.end, -1);
                            if (i.from <= l && l < i.to) return r(l, o);
                            if (l = o ? i.from : u(i.to, -1), n.begin <= l && l < n.end) return r(l, o);
                        }
                    }, g = p(r + e, e, c);
                    if (g) return g;
                    var m = 0 < e ? c.end : u(c.begin, -1);
                    return null == m || 0 < e && m == n.text.length || !(g = p(0 < e ? 0 : s.length - 1, e, l(m))) ? null : g;
                }(r.cm, a, i, o) : Xo(a, i, o))) {
                    if (e || (n = i.line + o) < r.first || n >= r.first + r.size || (i = new et(n, i.ch, i.sticky),
                        !(a = _e(r, n)))) return !1;
                    i = Yo(l, r.cm, a, i.line, o);
                } else i = t;
                return !0;
            }
            if ("char" == e) s(); else if ("column" == e) s(!0); else if ("word" == e || "group" == e) for (var u = null, c = "group" == e, f = r.cm && r.cm.getHelper(i, "wordChars"), h = !0; !(o < 0) || s(!h); h = !1) {
                var d = a.text.charAt(i.ch) || "\n", p = te(d, f) ? "w" : c && "\n" == d ? "n" : !c || /\s/.test(d) ? null : "p";
                if (!c || h || p || (p = "s"), u && u != p) {
                    o < 0 && (o = 1, s(), i.sticky = "after");
                    break;
                }
                if (p && (u = p), 0 < o && !s(!h)) break;
            }
            var g = eo(r, i, t, n, !0);
            return nt(t, g) && (g.hitSide = !0), g;
        }
        function Pl(e, t, n, r) {
            var i, o, l = e.doc, a = t.left;
            if ("page" == r) {
                var s = Math.min(e.display.wrapper.clientHeight, window.innerHeight || document.documentElement.clientHeight), u = Math.max(s - .5 * Qn(e.display), 3);
                i = (0 < n ? t.bottom : t.top) + n * u;
            } else "line" == r && (i = 0 < n ? t.bottom + 3 : t.top - 3);
            for (;(o = Xn(e, a, i)).outside; ) {
                if (n < 0 ? i <= 0 : i >= l.height) {
                    o.hitSide = !0;
                    break;
                }
                i += 5 * n;
            }
            return o;
        }
        var Hl = function(e) {
            this.cm = e, this.lastAnchorNode = this.lastAnchorOffset = this.lastFocusNode = this.lastFocusOffset = null,
                this.polling = new R(), this.composing = null, this.gracePeriod = !1, this.readDOMTimeout = null;
        };
        function Il(e, t) {
            var n = An(e, t.line);
            if (!n || n.hidden) return null;
            var r = _e(e.doc, t.line), i = Mn(n, r, t.line), o = ce(r, e.doc.direction), l = "left";
            o && (l = se(o, t.ch) % 2 ? "right" : "left");
            var a = Pn(i.map, t.ch, l);
            return a.offset = "right" == a.collapse ? a.end : a.start, a;
        }
        function El(e, t) {
            return t && (e.bad = !0), e;
        }
        function zl(e, t, n) {
            var r;
            if (t == e.display.lineDiv) {
                if (!(r = e.display.lineDiv.childNodes[n])) return El(e.clipPos(et(e.display.viewTo - 1)), !0);
                t = null, n = 0;
            } else for (r = t; ;r = r.parentNode) {
                if (!r || r == e.display.lineDiv) return null;
                if (r.parentNode && r.parentNode == e.display.lineDiv) break;
            }
            for (var i = 0; i < e.display.view.length; i++) {
                var o = e.display.view[i];
                if (o.node == r) return Rl(o, t, n);
            }
        }
        function Rl(u, e, t) {
            var n = u.text.firstChild, r = !1;
            if (!e || !F(n, e)) return El(et($e(u.line), 0), !0);
            if (e == n && (r = !0, e = n.childNodes[t], t = 0, !e)) {
                var i = u.rest ? Y(u.rest) : u.line;
                return El(et($e(i), i.text.length), r);
            }
            var o = 3 == e.nodeType ? e : null, l = e;
            for (o || 1 != e.childNodes.length || 3 != e.firstChild.nodeType || (o = e.firstChild,
            t && (t = o.nodeValue.length)); l.parentNode != n; ) l = l.parentNode;
            var c = u.measure, f = c.maps;
            function a(e, t, n) {
                for (var r = -1; r < (f ? f.length : 0); r++) for (var i = r < 0 ? c.map : f[r], o = 0; o < i.length; o += 3) {
                    var l = i[o + 2];
                    if (l == e || l == t) {
                        var a = $e(r < 0 ? u.line : u.rest[r]), s = i[o] + n;
                        return (n < 0 || l != e) && (s = i[o + (n ? 1 : 0)]), et(a, s);
                    }
                }
            }
            var s = a(o, l, t);
            if (s) return El(s, r);
            for (var h = l.nextSibling, d = o ? o.nodeValue.length - t : 0; h; h = h.nextSibling) {
                if (s = a(h, h.firstChild, 0)) return El(et(s.line, s.ch - d), r);
                d += h.textContent.length;
            }
            for (var p = l.previousSibling, g = t; p; p = p.previousSibling) {
                if (s = a(p, p.firstChild, -1)) return El(et(s.line, s.ch + g), r);
                g += p.textContent.length;
            }
        }
        Hl.prototype.init = function(e) {
            var t = this, l = this, a = l.cm, s = l.div = e.lineDiv;
            function n(e) {
                if (!me(a, e)) {
                    if (a.somethingSelected()) Tl({
                        lineWise: !1,
                        text: a.getSelections()
                    }), "cut" == e.type && a.replaceSelection("", null, "cut"); else {
                        if (!a.options.lineWiseCopyCut) return;
                        var t = Ol(a);
                        Tl({
                            lineWise: !0,
                            text: t.text
                        }), "cut" == e.type && a.operation(function() {
                            a.setSelections(t.ranges, 0, G), a.replaceSelection("", null, "cut");
                        });
                    }
                    if (e.clipboardData) {
                        e.clipboardData.clearData();
                        var n = Ll.text.join("\n");
                        if (e.clipboardData.setData("Text", n), e.clipboardData.getData("Text") == n) return void e.preventDefault();
                    }
                    var r = Dl(), i = r.firstChild;
                    a.display.lineSpace.insertBefore(r, a.display.lineSpace.firstChild), i.value = Ll.text.join("\n");
                    var o = document.activeElement;
                    H(i), setTimeout(function() {
                        a.display.lineSpace.removeChild(r), o.focus(), o == s && l.showPrimarySelection();
                    }, 50);
                }
            }
            Fl(s, a.options.spellcheck, a.options.autocorrect, a.options.autocapitalize), he(s, "paste", function(e) {
                me(a, e) || Nl(e, a) || C <= 11 && setTimeout(Yr(a, function() {
                    return t.updateFromDOM();
                }), 20);
            }), he(s, "compositionstart", function(e) {
                t.composing = {
                    data: e.data,
                    done: !1
                };
            }), he(s, "compositionupdate", function(e) {
                t.composing || (t.composing = {
                    data: e.data,
                    done: !1
                });
            }), he(s, "compositionend", function(e) {
                t.composing && (e.data != t.composing.data && t.readFromDOMSoon(), t.composing.done = !0);
            }), he(s, "touchstart", function() {
                return l.forceCompositionEnd();
            }), he(s, "input", function() {
                t.composing || t.readFromDOMSoon();
            }), he(s, "copy", n), he(s, "cut", n);
        }, Hl.prototype.prepareSelection = function() {
            var e = dr(this.cm, !1);
            return e.focus = this.cm.state.focused, e;
        }, Hl.prototype.showSelection = function(e, t) {
            e && this.cm.display.view.length && ((e.focus || t) && this.showPrimarySelection(),
                this.showMultipleSelections(e));
        }, Hl.prototype.getSelection = function() {
            return this.cm.display.wrapper.ownerDocument.getSelection();
        }, Hl.prototype.showPrimarySelection = function() {
            var e = this.getSelection(), t = this.cm, n = t.doc.sel.primary(), r = n.from(), i = n.to();
            if (t.display.viewTo == t.display.viewFrom || r.line >= t.display.viewTo || i.line < t.display.viewFrom) e.removeAllRanges(); else {
                var o = zl(t, e.anchorNode, e.anchorOffset), l = zl(t, e.focusNode, e.focusOffset);
                if (!o || o.bad || !l || l.bad || 0 != tt(ot(o, l), r) || 0 != tt(it(o, l), i)) {
                    var a = t.display.view, s = r.line >= t.display.viewFrom && Il(t, r) || {
                        node: a[0].measure.map[2],
                        offset: 0
                    }, u = i.line < t.display.viewTo && Il(t, i);
                    if (!u) {
                        var c = a[a.length - 1].measure, f = c.maps ? c.maps[c.maps.length - 1] : c.map;
                        u = {
                            node: f[f.length - 1],
                            offset: f[f.length - 2] - f[f.length - 3]
                        };
                    }
                    if (s && u) {
                        var h, d = e.rangeCount && e.getRangeAt(0);
                        try {
                            h = L(s.node, s.offset, u.offset, u.node);
                        } catch (e) {}
                        h && (!g && t.state.focused ? (e.collapse(s.node, s.offset), h.collapsed || (e.removeAllRanges(),
                            e.addRange(h))) : (e.removeAllRanges(), e.addRange(h)), d && null == e.anchorNode ? e.addRange(d) : g && this.startGracePeriod()),
                            this.rememberSelection();
                    } else e.removeAllRanges();
                }
            }
        }, Hl.prototype.startGracePeriod = function() {
            var e = this;
            clearTimeout(this.gracePeriod), this.gracePeriod = setTimeout(function() {
                e.gracePeriod = !1, e.selectionChanged() && e.cm.operation(function() {
                    return e.cm.curOp.selectionChanged = !0;
                });
            }, 20);
        }, Hl.prototype.showMultipleSelections = function(e) {
            N(this.cm.display.cursorDiv, e.cursors), N(this.cm.display.selectionDiv, e.selection);
        }, Hl.prototype.rememberSelection = function() {
            var e = this.getSelection();
            this.lastAnchorNode = e.anchorNode, this.lastAnchorOffset = e.anchorOffset, this.lastFocusNode = e.focusNode,
                this.lastFocusOffset = e.focusOffset;
        }, Hl.prototype.selectionInEditor = function() {
            var e = this.getSelection();
            if (!e.rangeCount) return !1;
            var t = e.getRangeAt(0).commonAncestorContainer;
            return F(this.div, t);
        }, Hl.prototype.focus = function() {
            "nocursor" != this.cm.options.readOnly && (this.selectionInEditor() || this.showSelection(this.prepareSelection(), !0),
                this.div.focus());
        }, Hl.prototype.blur = function() {
            this.div.blur();
        }, Hl.prototype.getField = function() {
            return this.div;
        }, Hl.prototype.supportsTouch = function() {
            return !0;
        }, Hl.prototype.receivedFocus = function() {
            var t = this;
            this.selectionInEditor() ? this.pollSelection() : Xr(this.cm, function() {
                return t.cm.curOp.selectionChanged = !0;
            }), this.polling.set(this.cm.options.pollInterval, function e() {
                t.cm.state.focused && (t.pollSelection(), t.polling.set(t.cm.options.pollInterval, e));
            });
        }, Hl.prototype.selectionChanged = function() {
            var e = this.getSelection();
            return e.anchorNode != this.lastAnchorNode || e.anchorOffset != this.lastAnchorOffset || e.focusNode != this.lastFocusNode || e.focusOffset != this.lastFocusOffset;
        }, Hl.prototype.pollSelection = function() {
            if (null == this.readDOMTimeout && !this.gracePeriod && this.selectionChanged()) {
                var e = this.getSelection(), t = this.cm;
                if (f && l && this.cm.display.gutterSpecs.length && function(e) {
                    for (var t = e; t; t = t.parentNode) if (/CodeMirror-gutter-wrapper/.test(t.className)) return !0;
                    return !1;
                }(e.anchorNode)) return this.cm.triggerOnKeyDown({
                    type: "keydown",
                    keyCode: 8,
                    preventDefault: Math.abs
                }), this.blur(), void this.focus();
                if (!this.composing) {
                    this.rememberSelection();
                    var n = zl(t, e.anchorNode, e.anchorOffset), r = zl(t, e.focusNode, e.focusOffset);
                    n && r && Xr(t, function() {
                        Xi(t.doc, wi(n, r), G), (n.bad || r.bad) && (t.curOp.selectionChanged = !0);
                    });
                }
            }
        }, Hl.prototype.pollContent = function() {
            null != this.readDOMTimeout && (clearTimeout(this.readDOMTimeout), this.readDOMTimeout = null);
            var e, t, n, r = this.cm, i = r.display, o = r.doc.sel.primary(), l = o.from(), a = o.to();
            if (0 == l.ch && l.line > r.firstLine() && (l = et(l.line - 1, _e(r.doc, l.line - 1).length)),
            a.ch == _e(r.doc, a.line).text.length && a.line < r.lastLine() && (a = et(a.line + 1, 0)),
            l.line < i.viewFrom || a.line > i.viewTo - 1) return !1;
            l.line == i.viewFrom || 0 == (e = lr(r, l.line)) ? (t = $e(i.view[0].line), n = i.view[0].node) : (t = $e(i.view[e].line),
                n = i.view[e - 1].node.nextSibling);
            var s, u, c = lr(r, a.line);
            if (c == i.view.length - 1 ? (s = i.viewTo - 1, u = i.lineDiv.lastChild) : (s = $e(i.view[c + 1].line) - 1,
                u = i.view[c + 1].node.previousSibling), !n) return !1;
            for (var f = r.doc.splitLines(function(s, e, t, u, c) {
                var n = "", f = !1, h = s.doc.lineSeparator(), d = !1;
                function p() {
                    f && (n += h, d && (n += h), f = d = !1);
                }
                function g(e) {
                    e && (p(), n += e);
                }
                function m(e) {
                    if (1 == e.nodeType) {
                        var t = e.getAttribute("cm-text");
                        if (t) return void g(t);
                        var n, r = e.getAttribute("cm-marker");
                        if (r) {
                            var i = s.findMarks(et(u, 0), et(c + 1, 0), (a = +r, function(e) {
                                return e.id == a;
                            }));
                            return void (i.length && (n = i[0].find(0)) && g(qe(s.doc, n.from, n.to).join(h)));
                        }
                        if ("false" == e.getAttribute("contenteditable")) return;
                        var o = /^(pre|div|p|li|table|br)$/i.test(e.nodeName);
                        if (!/^br$/i.test(e.nodeName) && 0 == e.textContent.length) return;
                        o && p();
                        for (var l = 0; l < e.childNodes.length; l++) m(e.childNodes[l]);
                        /^(pre|p)$/i.test(e.nodeName) && (d = !0), o && (f = !0);
                    } else 3 == e.nodeType && g(e.nodeValue.replace(/\u200b/g, "").replace(/\u00a0/g, " "));
                    var a;
                }
                for (;m(e), e != t; ) e = e.nextSibling, d = !1;
                return n;
            }(r, n, u, t, s)), h = qe(r.doc, et(t, 0), et(s, _e(r.doc, s).text.length)); 1 < f.length && 1 < h.length; ) if (Y(f) == Y(h)) f.pop(),
                h.pop(), s--; else {
                if (f[0] != h[0]) break;
                f.shift(), h.shift(), t++;
            }
            for (var d = 0, p = 0, g = f[0], m = h[0], v = Math.min(g.length, m.length); d < v && g.charCodeAt(d) == m.charCodeAt(d); ) ++d;
            for (var y = Y(f), b = Y(h), w = Math.min(y.length - (1 == f.length ? d : 0), b.length - (1 == h.length ? d : 0)); p < w && y.charCodeAt(y.length - p - 1) == b.charCodeAt(b.length - p - 1); ) ++p;
            if (1 == f.length && 1 == h.length && t == l.line) for (;d && d > l.ch && y.charCodeAt(y.length - p - 1) == b.charCodeAt(b.length - p - 1); ) d--,
                p++;
            f[f.length - 1] = y.slice(0, y.length - p).replace(/^\u200b+/, ""), f[0] = f[0].slice(d).replace(/\u200b+$/, "");
            var x = et(t, d), C = et(s, h.length ? Y(h).length - p : 0);
            return 1 < f.length || f[0] || tt(x, C) ? (uo(r.doc, f, x, C, "+input"), !0) : void 0;
        }, Hl.prototype.ensurePolled = function() {
            this.forceCompositionEnd();
        }, Hl.prototype.reset = function() {
            this.forceCompositionEnd();
        }, Hl.prototype.forceCompositionEnd = function() {
            this.composing && (clearTimeout(this.readDOMTimeout), this.composing = null, this.updateFromDOM(),
                this.div.blur(), this.div.focus());
        }, Hl.prototype.readFromDOMSoon = function() {
            var e = this;
            null == this.readDOMTimeout && (this.readDOMTimeout = setTimeout(function() {
                if (e.readDOMTimeout = null, e.composing) {
                    if (!e.composing.done) return;
                    e.composing = null;
                }
                e.updateFromDOM();
            }, 80));
        }, Hl.prototype.updateFromDOM = function() {
            var e = this;
            !this.cm.isReadOnly() && this.pollContent() || Xr(this.cm, function() {
                return ar(e.cm);
            });
        }, Hl.prototype.setUneditable = function(e) {
            e.contentEditable = "false";
        }, Hl.prototype.onKeyPress = function(e) {
            0 == e.charCode || this.composing || (e.preventDefault(), this.cm.isReadOnly() || Yr(this.cm, Ml)(this.cm, String.fromCharCode(null == e.charCode ? e.keyCode : e.charCode), 0));
        }, Hl.prototype.readOnlyChanged = function(e) {
            this.div.contentEditable = String("nocursor" != e);
        }, Hl.prototype.onContextMenu = function() {}, Hl.prototype.resetPosition = function() {},
            Hl.prototype.needsContentAttribute = !0;
        var Bl, Ul, Kl, Gl = function(e) {
            this.cm = e, this.prevInput = "", this.pollingFast = !1, this.polling = new R(),
                this.hasSelection = !1, this.composing = null;
        };
        Gl.prototype.init = function(n) {
            var e = this, r = this, i = this.cm;
            this.createField(n);
            var o = this.textarea;
            function t(e) {
                if (!me(i, e)) {
                    if (i.somethingSelected()) Tl({
                        lineWise: !1,
                        text: i.getSelections()
                    }); else {
                        if (!i.options.lineWiseCopyCut) return;
                        var t = Ol(i);
                        Tl({
                            lineWise: !0,
                            text: t.text
                        }), "cut" == e.type ? i.setSelections(t.ranges, null, G) : (r.prevInput = "", o.value = t.text.join("\n"),
                            H(o));
                    }
                    "cut" == e.type && (i.state.cutIncoming = +new Date());
                }
            }
            n.wrapper.insertBefore(this.wrapper, n.wrapper.firstChild), c && (o.style.width = "0px"),
                he(o, "input", function() {
                    x && 9 <= C && e.hasSelection && (e.hasSelection = null), r.poll();
                }), he(o, "paste", function(e) {
                me(i, e) || Nl(e, i) || (i.state.pasteIncoming = +new Date(), r.fastPoll());
            }), he(o, "cut", t), he(o, "copy", t), he(n.scroller, "paste", function(e) {
                if (!wn(n, e) && !me(i, e)) {
                    if (!o.dispatchEvent) return i.state.pasteIncoming = +new Date(), void r.focus();
                    var t = new Event("paste");
                    t.clipboardData = e.clipboardData, o.dispatchEvent(t);
                }
            }), he(n.lineSpace, "selectstart", function(e) {
                wn(n, e) || we(e);
            }), he(o, "compositionstart", function() {
                var e = i.getCursor("from");
                r.composing && r.composing.range.clear(), r.composing = {
                    start: e,
                    range: i.markText(e, i.getCursor("to"), {
                        className: "CodeMirror-composing"
                    })
                };
            }), he(o, "compositionend", function() {
                r.composing && (r.poll(), r.composing.range.clear(), r.composing = null);
            });
        }, Gl.prototype.createField = function(e) {
            this.wrapper = Dl(), this.textarea = this.wrapper.firstChild;
        }, Gl.prototype.prepareSelection = function() {
            var e = this.cm, t = e.display, n = e.doc, r = dr(e);
            if (e.options.moveInputWithCursor) {
                var i = jn(e, n.sel.primary().head, "div"), o = t.wrapper.getBoundingClientRect(), l = t.lineDiv.getBoundingClientRect();
                r.teTop = Math.max(0, Math.min(t.wrapper.clientHeight - 10, i.top + l.top - o.top)),
                    r.teLeft = Math.max(0, Math.min(t.wrapper.clientWidth - 10, i.left + l.left - o.left));
            }
            return r;
        }, Gl.prototype.showSelection = function(e) {
            var t = this.cm.display;
            N(t.cursorDiv, e.cursors), N(t.selectionDiv, e.selection), null != e.teTop && (this.wrapper.style.top = e.teTop + "px",
                this.wrapper.style.left = e.teLeft + "px");
        }, Gl.prototype.reset = function(e) {
            if (!this.contextMenuPending && !this.composing) {
                var t = this.cm;
                if (t.somethingSelected()) {
                    this.prevInput = "";
                    var n = t.getSelection();
                    this.textarea.value = n, t.state.focused && H(this.textarea), x && 9 <= C && (this.hasSelection = n);
                } else e || (this.prevInput = this.textarea.value = "", x && 9 <= C && (this.hasSelection = null));
            }
        }, Gl.prototype.getField = function() {
            return this.textarea;
        }, Gl.prototype.supportsTouch = function() {
            return !1;
        }, Gl.prototype.focus = function() {
            if ("nocursor" != this.cm.options.readOnly && (!h || D() != this.textarea)) try {
                this.textarea.focus();
            } catch (e) {}
        }, Gl.prototype.blur = function() {
            this.textarea.blur();
        }, Gl.prototype.resetPosition = function() {
            this.wrapper.style.top = this.wrapper.style.left = 0;
        }, Gl.prototype.receivedFocus = function() {
            this.slowPoll();
        }, Gl.prototype.slowPoll = function() {
            var e = this;
            this.pollingFast || this.polling.set(this.cm.options.pollInterval, function() {
                e.poll(), e.cm.state.focused && e.slowPoll();
            });
        }, Gl.prototype.fastPoll = function() {
            var t = !1, n = this;
            n.pollingFast = !0, n.polling.set(20, function e() {
                n.poll() || t ? (n.pollingFast = !1, n.slowPoll()) : (t = !0, n.polling.set(60, e));
            });
        }, Gl.prototype.poll = function() {
            var e = this, t = this.cm, n = this.textarea, r = this.prevInput;
            if (this.contextMenuPending || !t.state.focused || We(n) && !r && !this.composing || t.isReadOnly() || t.options.disableInput || t.state.keySeq) return !1;
            var i = n.value;
            if (i == r && !t.somethingSelected()) return !1;
            if (x && 9 <= C && this.hasSelection === i || w && /[\uf700-\uf7ff]/.test(i)) return t.display.input.reset(),
                !1;
            if (t.doc.sel == t.display.selForContextMenu) {
                var o = i.charCodeAt(0);
                if (8203 != o || r || (r = "\u200b"), 8666 == o) return this.reset(), this.cm.execCommand("undo");
            }
            for (var l = 0, a = Math.min(r.length, i.length); l < a && r.charCodeAt(l) == i.charCodeAt(l); ) ++l;
            return Xr(t, function() {
                Ml(t, i.slice(l), r.length - l, null, e.composing ? "*compose" : null), 1e3 < i.length || -1 < i.indexOf("\n") ? n.value = e.prevInput = "" : e.prevInput = i,
                e.composing && (e.composing.range.clear(), e.composing.range = t.markText(e.composing.start, t.getCursor("to"), {
                    className: "CodeMirror-composing"
                }));
            }), !0;
        }, Gl.prototype.ensurePolled = function() {
            this.pollingFast && this.poll() && (this.pollingFast = !1);
        }, Gl.prototype.onKeyPress = function() {
            x && 9 <= C && (this.hasSelection = null), this.fastPoll();
        }, Gl.prototype.onContextMenu = function(e) {
            var n = this, r = n.cm, i = r.display, o = n.textarea;
            n.contextMenuPending && n.contextMenuPending();
            var t = or(r, e), l = i.scroller.scrollTop;
            if (t && !m) {
                r.options.resetSelectionOnContextMenu && -1 == r.doc.sel.contains(t) && Yr(r, Xi)(r.doc, wi(t), G);
                var a, s = o.style.cssText, u = n.wrapper.style.cssText, c = n.wrapper.offsetParent.getBoundingClientRect();
                if (n.wrapper.style.cssText = "position: static", o.style.cssText = "position: absolute; width: 30px; height: 30px;\n      top: " + (e.clientY - c.top - 5) + "px; left: " + (e.clientX - c.left - 5) + "px;\n      z-index: 1000; background: " + (x ? "rgba(255, 255, 255, .05)" : "transparent") + ";\n      outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);",
                b && (a = window.scrollY), i.input.focus(), b && window.scrollTo(null, a), i.input.reset(),
                r.somethingSelected() || (o.value = n.prevInput = " "), n.contextMenuPending = d,
                    i.selForContextMenu = r.doc.sel, clearTimeout(i.detectingSelectAll), x && 9 <= C && h(),
                    S) {
                    Se(e);
                    var f = function() {
                        pe(window, "mouseup", f), setTimeout(d, 20);
                    };
                    he(window, "mouseup", f);
                } else setTimeout(d, 50);
            }
            function h() {
                if (null != o.selectionStart) {
                    var e = r.somethingSelected(), t = "\u200b" + (e ? o.value : "");
                    o.value = "\u21da", o.value = t, n.prevInput = e ? "" : "\u200b", o.selectionStart = 1,
                        o.selectionEnd = t.length, i.selForContextMenu = r.doc.sel;
                }
            }
            function d() {
                if (n.contextMenuPending == d && (n.contextMenuPending = !1, n.wrapper.style.cssText = u,
                    o.style.cssText = s, x && C < 9 && i.scrollbars.setScrollTop(i.scroller.scrollTop = l),
                null != o.selectionStart)) {
                    (!x || x && C < 9) && h();
                    var e = 0, t = function() {
                        i.selForContextMenu == r.doc.sel && 0 == o.selectionStart && 0 < o.selectionEnd && "\u200b" == n.prevInput ? Yr(r, no)(r) : e++ < 10 ? i.detectingSelectAll = setTimeout(t, 500) : (i.selForContextMenu = null,
                            i.input.reset());
                    };
                    i.detectingSelectAll = setTimeout(t, 200);
                }
            }
        }, Gl.prototype.readOnlyChanged = function(e) {
            e || this.reset(), this.textarea.disabled = "nocursor" == e;
        }, Gl.prototype.setUneditable = function() {}, Gl.prototype.needsContentAttribute = !1,
            function(i) {
                var o = i.optionHandlers;
                function e(e, t, r, n) {
                    i.defaults[e] = t, r && (o[e] = n ? function(e, t, n) {
                        n != vl && r(e, t, n);
                    } : r);
                }
                i.defineOption = e, i.Init = vl, e("value", "", function(e, t) {
                    return e.setValue(t);
                }, !0), e("mode", null, function(e, t) {
                    e.doc.modeOption = t, Li(e);
                }, !0), e("indentUnit", 2, Li, !0), e("indentWithTabs", !1), e("smartIndent", !0),
                    e("tabSize", 4, function(e) {
                        Ti(e), zn(e), ar(e);
                    }, !0), e("lineSeparator", null, function(e, r) {
                    if (e.doc.lineSep = r) {
                        var i = [], o = e.doc.first;
                        e.doc.iter(function(e) {
                            for (var t = 0; ;) {
                                var n = e.text.indexOf(r, t);
                                if (-1 == n) break;
                                t = n + r.length, i.push(et(o, n));
                            }
                            o++;
                        });
                        for (var t = i.length - 1; 0 <= t; t--) uo(e.doc, r, i[t], et(i[t].line, i[t].ch + r.length));
                    }
                }), e("specialChars", /[\u0000-\u001f\u007f-\u009f\u00ad\u061c\u200b-\u200f\u2028\u2029\ufeff]/g, function(e, t, n) {
                    e.state.specialChars = new RegExp(t.source + (t.test("\t") ? "" : "|\t"), "g"),
                    n != vl && e.refresh();
                }), e("specialCharPlaceholder", Zt, function(e) {
                    return e.refresh();
                }, !0), e("electricChars", !0), e("inputStyle", h ? "contenteditable" : "textarea", function() {
                    throw new Error("inputStyle can not (yet) be changed in a running editor");
                }, !0), e("spellcheck", !1, function(e, t) {
                    return e.getInputField().spellcheck = t;
                }, !0), e("autocorrect", !1, function(e, t) {
                    return e.getInputField().autocorrect = t;
                }, !0), e("autocapitalize", !1, function(e, t) {
                    return e.getInputField().autocapitalize = t;
                }, !0), e("rtlMoveVisually", !p), e("wholeLineUpdateBefore", !0), e("theme", "default", function(e) {
                    ml(e), ci(e);
                }, !0), e("keyMap", "default", function(e, t, n) {
                    var r = jo(t), i = n != vl && jo(n);
                    i && i.detach && i.detach(e, r), r.attach && r.attach(e, i || null);
                }), e("extraKeys", null), e("configureMouse", null), e("lineWrapping", !1, xl, !0),
                    e("gutters", [], function(e, t) {
                        e.display.gutterSpecs = si(t, e.options.lineNumbers), ci(e);
                    }, !0), e("fixedGutter", !0, function(e, t) {
                    e.display.gutters.style.left = t ? nr(e.display) + "px" : "0", e.refresh();
                }, !0), e("coverGutterNextToScrollbar", !1, function(e) {
                    return Er(e);
                }, !0), e("scrollbarStyle", "native", function(e) {
                    Br(e), Er(e), e.display.scrollbars.setScrollTop(e.doc.scrollTop), e.display.scrollbars.setScrollLeft(e.doc.scrollLeft);
                }, !0), e("lineNumbers", !1, function(e, t) {
                    e.display.gutterSpecs = si(e.options.gutters, t), ci(e);
                }, !0), e("firstLineNumber", 1, ci, !0), e("lineNumberFormatter", function(e) {
                    return e;
                }, ci, !0), e("showCursorWhenSelecting", !1, hr, !0), e("resetSelectionOnContextMenu", !0),
                    e("lineWiseCopyCut", !0), e("pasteLinesPerSelection", !0), e("selectionsMayTouch", !1),
                    e("readOnly", !1, function(e, t) {
                        "nocursor" == t && (xr(e), e.display.input.blur()), e.display.input.readOnlyChanged(t);
                    }), e("disableInput", !1, function(e, t) {
                    t || e.display.input.reset();
                }, !0), e("dragDrop", !0, wl), e("allowDropFileTypes", null), e("cursorBlinkRate", 530),
                    e("cursorScrollMargin", 0), e("cursorHeight", 1, hr, !0), e("singleCursorHeightPerLine", !0, hr, !0),
                    e("workTime", 100), e("workDelay", 100), e("flattenSpans", !0, Ti, !0), e("addModeClass", !1, Ti, !0),
                    e("pollInterval", 100), e("undoDepth", 200, function(e, t) {
                    return e.doc.history.undoDepth = t;
                }), e("historyEventDelay", 1250), e("viewportMargin", 10, function(e) {
                    return e.refresh();
                }, !0), e("maxHighlightLength", 1e4, Ti, !0), e("moveInputWithCursor", !0, function(e, t) {
                    t || e.display.input.resetPosition();
                }), e("tabindex", null, function(e, t) {
                    return e.display.input.getField().tabIndex = t || "";
                }), e("autofocus", null), e("direction", "ltr", function(e, t) {
                    return e.doc.setDirection(t);
                }, !0), e("phrases", null);
            }(Cl), Ul = (Bl = Cl).optionHandlers, Kl = Bl.helpers = {}, Bl.prototype = {
            constructor: Bl,
            focus: function() {
                window.focus(), this.display.input.focus();
            },
            setOption: function(e, t) {
                var n = this.options, r = n[e];
                n[e] == t && "mode" != e || (n[e] = t, Ul.hasOwnProperty(e) && Yr(this, Ul[e])(this, t, r),
                    ge(this, "optionChange", this, e));
            },
            getOption: function(e) {
                return this.options[e];
            },
            getDoc: function() {
                return this.doc;
            },
            addKeyMap: function(e, t) {
                this.state.keyMaps[t ? "push" : "unshift"](jo(e));
            },
            removeKeyMap: function(e) {
                for (var t = this.state.keyMaps, n = 0; n < t.length; ++n) if (t[n] == e || t[n].name == e) return t.splice(n, 1),
                    !0;
            },
            addOverlay: $r(function(e, t) {
                var n = e.token ? e : Bl.getMode(this.options, e);
                if (n.startState) throw new Error("Overlays may not be stateful.");
                !function(e, t, n) {
                    for (var r = 0, i = n(t); r < e.length && n(e[r]) <= i; ) r++;
                    e.splice(r, 0, t);
                }(this.state.overlays, {
                    mode: n,
                    modeSpec: e,
                    opaque: t && t.opaque,
                    priority: t && t.priority || 0
                }, function(e) {
                    return e.priority;
                }), this.state.modeGen++, ar(this);
            }),
            removeOverlay: $r(function(e) {
                for (var t = this.state.overlays, n = 0; n < t.length; ++n) {
                    var r = t[n].modeSpec;
                    if (r == e || "string" == typeof e && r.name == e) return t.splice(n, 1), this.state.modeGen++,
                        void ar(this);
                }
            }),
            indentLine: $r(function(e, t, n) {
                "string" != typeof t && "number" != typeof t && (t = null == t ? this.options.smartIndent ? "smart" : "prev" : t ? "add" : "subtract"),
                Je(this.doc, e) && kl(this, e, t, n);
            }),
            indentSelection: $r(function(e) {
                for (var t = this, n = this.doc.sel.ranges, r = -1, i = 0; i < n.length; i++) {
                    var o = n[i];
                    if (o.empty()) o.head.line > r && (kl(t, o.head.line, e, !0), r = o.head.line, i == t.doc.sel.primIndex && Mr(t)); else {
                        var l = o.from(), a = o.to(), s = Math.max(r, l.line);
                        r = Math.min(t.lastLine(), a.line - (a.ch ? 0 : 1)) + 1;
                        for (var u = s; u < r; ++u) kl(t, u, e);
                        var c = t.doc.sel.ranges;
                        0 == l.ch && n.length == c.length && 0 < c[i].from().ch && ji(t.doc, i, new yi(l, c[i].to()), G);
                    }
                }
            }),
            getTokenAt: function(e, t) {
                return yt(this, e, t);
            },
            getLineTokens: function(e, t) {
                return yt(this, et(e), t, !0);
            },
            getTokenTypeAt: function(e) {
                e = at(this.doc, e);
                var t, n = ht(this, _e(this.doc, e.line)), r = 0, i = (n.length - 1) / 2, o = e.ch;
                if (0 == o) t = n[2]; else for (;;) {
                    var l = r + i >> 1;
                    if ((l ? n[2 * l - 1] : 0) >= o) i = l; else {
                        if (!(n[2 * l + 1] < o)) {
                            t = n[2 * l + 2];
                            break;
                        }
                        r = l + 1;
                    }
                }
                var a = t ? t.indexOf("overlay ") : -1;
                return a < 0 ? t : 0 == a ? null : t.slice(0, a - 1);
            },
            getModeAt: function(e) {
                var t = this.doc.mode;
                return t.innerMode ? Bl.innerMode(t, this.getTokenAt(e).state).mode : t;
            },
            getHelper: function(e, t) {
                return this.getHelpers(e, t)[0];
            },
            getHelpers: function(e, t) {
                var n = [];
                if (!Kl.hasOwnProperty(t)) return n;
                var r = Kl[t], i = this.getModeAt(e);
                if ("string" == typeof i[t]) r[i[t]] && n.push(r[i[t]]); else if (i[t]) for (var o = 0; o < i[t].length; o++) {
                    var l = r[i[t][o]];
                    l && n.push(l);
                } else i.helperType && r[i.helperType] ? n.push(r[i.helperType]) : r[i.name] && n.push(r[i.name]);
                for (var a = 0; a < r._global.length; a++) {
                    var s = r._global[a];
                    s.pred(i, this) && -1 == B(n, s.val) && n.push(s.val);
                }
                return n;
            },
            getStateAfter: function(e, t) {
                var n = this.doc;
                return dt(this, (e = lt(n, null == e ? n.first + n.size - 1 : e)) + 1, t).state;
            },
            cursorCoords: function(e, t) {
                var n = this.doc.sel.primary();
                return jn(this, null == e ? n.head : "object" == typeof e ? at(this.doc, e) : e ? n.from() : n.to(), t || "page");
            },
            charCoords: function(e, t) {
                return Vn(this, at(this.doc, e), t || "page");
            },
            coordsChar: function(e, t) {
                return Xn(this, (e = Gn(this, e, t || "page")).left, e.top);
            },
            lineAtHeight: function(e, t) {
                return e = Gn(this, {
                    top: e,
                    left: 0
                }, t || "page").top, Ze(this.doc, e + this.display.viewOffset);
            },
            heightAtLine: function(e, t, n) {
                var r, i = !1;
                if ("number" == typeof e) {
                    var o = this.doc.first + this.doc.size - 1;
                    e < this.doc.first ? e = this.doc.first : o < e && (e = o, i = !0), r = _e(this.doc, e);
                } else r = e;
                return Kn(this, r, {
                    top: 0,
                    left: 0
                }, t || "page", n || i).top + (i ? this.doc.height - Gt(r) : 0);
            },
            defaultTextHeight: function() {
                return Qn(this.display);
            },
            defaultCharWidth: function() {
                return er(this.display);
            },
            getViewport: function() {
                return {
                    from: this.display.viewFrom,
                    to: this.display.viewTo
                };
            },
            addWidget: function(e, t, n, r, i) {
                var o, l, a, s = this.display, u = (e = jn(this, at(this.doc, e))).bottom, c = e.left;
                if (t.style.position = "absolute", t.setAttribute("cm-ignore-events", "true"), this.display.input.setUneditable(t),
                    s.sizer.appendChild(t), "over" == r) u = e.top; else if ("above" == r || "near" == r) {
                    var f = Math.max(s.wrapper.clientHeight, this.doc.height), h = Math.max(s.sizer.clientWidth, s.lineSpace.clientWidth);
                    ("above" == r || e.bottom + t.offsetHeight > f) && e.top > t.offsetHeight ? u = e.top - t.offsetHeight : e.bottom + t.offsetHeight <= f && (u = e.bottom),
                    c + t.offsetWidth > h && (c = h - t.offsetWidth);
                }
                t.style.top = u + "px", t.style.left = t.style.right = "", "right" == i ? (c = s.sizer.clientWidth - t.offsetWidth,
                    t.style.right = "0px") : ("left" == i ? c = 0 : "middle" == i && (c = (s.sizer.clientWidth - t.offsetWidth) / 2),
                    t.style.left = c + "px"), n && (o = this, l = {
                    left: c,
                    top: u,
                    right: c + t.offsetWidth,
                    bottom: u + t.offsetHeight
                }, null != (a = Lr(o, l)).scrollTop && Fr(o, a.scrollTop), null != a.scrollLeft && Wr(o, a.scrollLeft));
            },
            triggerOnKeyDown: $r(ol),
            triggerOnKeyPress: $r(al),
            triggerOnKeyUp: ll,
            triggerOnMouseDown: $r(fl),
            execCommand: function(e) {
                if ($o.hasOwnProperty(e)) return $o[e].call(null, this);
            },
            triggerElectric: $r(function(e) {
                Al(this, e);
            }),
            findPosH: function(e, t, n, r) {
                var i = 1;
                t < 0 && (i = -1, t = -t);
                for (var o = at(this.doc, e), l = 0; l < t && !(o = Wl(this.doc, o, i, n, r)).hitSide; ++l) ;
                return o;
            },
            moveH: $r(function(t, n) {
                var r = this;
                this.extendSelectionsBy(function(e) {
                    return r.display.shift || r.doc.extend || e.empty() ? Wl(r.doc, e.head, t, n, r.options.rtlMoveVisually) : t < 0 ? e.from() : e.to();
                }, j);
            }),
            deleteH: $r(function(n, r) {
                var e = this.doc.sel, i = this.doc;
                e.somethingSelected() ? i.replaceSelection("", null, "+delete") : _o(this, function(e) {
                    var t = Wl(i, e.head, n, r, !1);
                    return n < 0 ? {
                        from: t,
                        to: e.head
                    } : {
                        from: e.head,
                        to: t
                    };
                });
            }),
            findPosV: function(e, t, n, r) {
                var i = 1, o = r;
                t < 0 && (i = -1, t = -t);
                for (var l = at(this.doc, e), a = 0; a < t; ++a) {
                    var s = jn(this, l, "div");
                    if (null == o ? o = s.left : s.left = o, (l = Pl(this, s, i, n)).hitSide) break;
                }
                return l;
            },
            moveV: $r(function(r, i) {
                var o = this, l = this.doc, a = [], s = !this.display.shift && !l.extend && l.sel.somethingSelected();
                if (l.extendSelectionsBy(function(e) {
                    if (s) return r < 0 ? e.from() : e.to();
                    var t = jn(o, e.head, "div");
                    null != e.goalColumn && (t.left = e.goalColumn), a.push(t.left);
                    var n = Pl(o, t, r, i);
                    return "page" == i && e == l.sel.primary() && Tr(o, Vn(o, n, "div").top - t.top),
                        n;
                }, j), a.length) for (var e = 0; e < l.sel.ranges.length; e++) l.sel.ranges[e].goalColumn = a[e];
            }),
            findWordAt: function(e) {
                var t = _e(this.doc, e.line).text, n = e.ch, r = e.ch;
                if (t) {
                    var i = this.getHelper(e, "wordChars");
                    "before" != e.sticky && r != t.length || !n ? ++r : --n;
                    for (var o = t.charAt(n), l = te(o, i) ? function(e) {
                        return te(e, i);
                    } : /\s/.test(o) ? function(e) {
                        return /\s/.test(e);
                    } : function(e) {
                        return !/\s/.test(e) && !te(e);
                    }; 0 < n && l(t.charAt(n - 1)); ) --n;
                    for (;r < t.length && l(t.charAt(r)); ) ++r;
                }
                return new yi(et(e.line, n), et(e.line, r));
            },
            toggleOverwrite: function(e) {
                null != e && e == this.state.overwrite || ((this.state.overwrite = !this.state.overwrite) ? W(this.display.cursorDiv, "CodeMirror-overwrite") : T(this.display.cursorDiv, "CodeMirror-overwrite"),
                    ge(this, "overwriteToggle", this, this.state.overwrite));
            },
            hasFocus: function() {
                return this.display.input.getField() == D();
            },
            isReadOnly: function() {
                return !(!this.options.readOnly && !this.doc.cantEdit);
            },
            scrollTo: $r(function(e, t) {
                Nr(this, e, t);
            }),
            getScrollInfo: function() {
                var e = this.display.scroller;
                return {
                    left: e.scrollLeft,
                    top: e.scrollTop,
                    height: e.scrollHeight - kn(this) - this.display.barHeight,
                    width: e.scrollWidth - kn(this) - this.display.barWidth,
                    clientHeight: Tn(this),
                    clientWidth: Ln(this)
                };
            },
            scrollIntoView: $r(function(e, t) {
                var n, r;
                null == e ? (e = {
                    from: this.doc.sel.primary().head,
                    to: null
                }, null == t && (t = this.options.cursorScrollMargin)) : "number" == typeof e ? e = {
                    from: et(e, 0),
                    to: null
                } : null == e.from && (e = {
                    from: e,
                    to: null
                }), e.to || (e.to = e.from), e.margin = t || 0, null != e.from.line ? (r = e, Ar(n = this),
                    n.curOp.scrollToPos = r) : Or(this, e.from, e.to, e.margin);
            }),
            setSize: $r(function(e, t) {
                var n = this, r = function(e) {
                    return "number" == typeof e || /^\d+$/.test(String(e)) ? e + "px" : e;
                };
                null != e && (this.display.wrapper.style.width = r(e)), null != t && (this.display.wrapper.style.height = r(t)),
                this.options.lineWrapping && En(this);
                var i = this.display.viewFrom;
                this.doc.iter(i, this.display.viewTo, function(e) {
                    if (e.widgets) for (var t = 0; t < e.widgets.length; t++) if (e.widgets[t].noHScroll) {
                        sr(n, i, "widget");
                        break;
                    }
                    ++i;
                }), this.curOp.forceUpdate = !0, ge(this, "refresh", this);
            }),
            operation: function(e) {
                return Xr(this, e);
            },
            startOperation: function() {
                return Kr(this);
            },
            endOperation: function() {
                return Gr(this);
            },
            refresh: $r(function() {
                var e = this.display.cachedTextHeight;
                ar(this), this.curOp.forceUpdate = !0, zn(this), Nr(this, this.doc.scrollLeft, this.doc.scrollTop),
                    ii(this.display), (null == e || .5 < Math.abs(e - Qn(this.display))) && ir(this),
                    ge(this, "refresh", this);
            }),
            swapDoc: $r(function(e) {
                var t = this.doc;
                return t.cm = null, this.state.selectingText && this.state.selectingText(), Oi(this, e),
                    zn(this), this.display.input.reset(), Nr(this, e.scrollLeft, e.scrollTop), this.curOp.forceScroll = !0,
                    an(this, "swapDoc", this, t), t;
            }),
            phrase: function(e) {
                var t = this.options.phrases;
                return t && Object.prototype.hasOwnProperty.call(t, e) ? t[e] : e;
            },
            getInputField: function() {
                return this.display.input.getField();
            },
            getWrapperElement: function() {
                return this.display.wrapper;
            },
            getScrollerElement: function() {
                return this.display.scroller;
            },
            getGutterElement: function() {
                return this.display.gutters;
            }
        }, be(Bl), Bl.registerHelper = function(e, t, n) {
            Kl.hasOwnProperty(e) || (Kl[e] = Bl[e] = {
                _global: []
            }), Kl[e][t] = n;
        }, Bl.registerGlobalHelper = function(e, t, n, r) {
            Bl.registerHelper(e, t, r), Kl[e]._global.push({
                pred: n,
                val: r
            });
        };
        var Vl, jl = "iter insert remove copy getEditor constructor".split(" ");
        for (var _l in To.prototype) To.prototype.hasOwnProperty(_l) && B(jl, _l) < 0 && (Cl.prototype[_l] = function(e) {
            return function() {
                return e.apply(this.doc, arguments);
            };
        }(To.prototype[_l]));
        return be(To), Cl.inputStyles = {
            textarea: Gl,
            contenteditable: Hl
        }, Cl.defineMode = function(e) {
            Cl.defaults.mode || "null" == e || (Cl.defaults.mode = e), function(e, t) {
                2 < arguments.length && (t.dependencies = Array.prototype.slice.call(arguments, 2)),
                    Ie[e] = t;
            }.apply(this, arguments);
        }, Cl.defineMIME = function(e, t) {
            Ee[e] = t;
        }, Cl.defineMode("null", function() {
            return {
                token: function(e) {
                    return e.skipToEnd();
                }
            };
        }), Cl.defineMIME("text/plain", "null"), Cl.defineExtension = function(e, t) {
            Cl.prototype[e] = t;
        }, Cl.defineDocExtension = function(e, t) {
            To.prototype[e] = t;
        }, Cl.fromTextArea = function(t, e) {
            if ((e = e ? E(e) : {}).value = t.value, !e.tabindex && t.tabIndex && (e.tabindex = t.tabIndex),
            !e.placeholder && t.placeholder && (e.placeholder = t.placeholder), null == e.autofocus) {
                var n = D();
                e.autofocus = n == t || null != t.getAttribute("autofocus") && n == document.body;
            }
            function r() {
                t.value = a.getValue();
            }
            var i;
            if (t.form && (he(t.form, "submit", r), !e.leaveSubmitMethodAlone)) {
                var o = t.form;
                i = o.submit;
                try {
                    var l = o.submit = function() {
                        r(), o.submit = i, o.submit(), o.submit = l;
                    };
                } catch (e) {}
            }
            e.finishInit = function(e) {
                e.save = r, e.getTextArea = function() {
                    return t;
                }, e.toTextArea = function() {
                    e.toTextArea = isNaN, r(), t.parentNode.removeChild(e.getWrapperElement()), t.style.display = "",
                    t.form && (pe(t.form, "submit", r), "function" == typeof t.form.submit && (t.form.submit = i));
                };
            }, t.style.display = "none";
            var a = Cl(function(e) {
                return t.parentNode.insertBefore(e, t.nextSibling);
            }, e);
            return a;
        }, (Vl = Cl).off = pe, Vl.on = he, Vl.wheelEventPixels = gi, Vl.Doc = To, Vl.splitLines = De,
            Vl.countColumn = z, Vl.findColumn = _, Vl.isWordChar = ee, Vl.Pass = K, Vl.signal = ge,
            Vl.Line = _t, Vl.changeEnd = xi, Vl.scrollbarModel = Rr, Vl.Pos = et, Vl.cmpPos = tt,
            Vl.modes = Ie, Vl.mimeModes = Ee, Vl.resolveMode = ze, Vl.getMode = Re, Vl.modeExtensions = Be,
            Vl.extendMode = Ue, Vl.copyState = Ke, Vl.startState = Ve, Vl.innerMode = Ge, Vl.commands = $o,
            Vl.keyMap = zo, Vl.keyName = Vo, Vl.isModifierKey = Ko, Vl.lookupKey = Uo, Vl.normalizeKeyMap = Bo,
            Vl.StringStream = je, Vl.SharedTextMarker = Co, Vl.TextMarker = wo, Vl.LineWidget = vo,
            Vl.e_preventDefault = we, Vl.e_stopPropagation = xe, Vl.e_stop = Se, Vl.addClass = W,
            Vl.contains = F, Vl.rmClass = T, Vl.keyNames = Po, Cl.version = "5.46.0", Cl;
    }, this.CodeMirror = e(), function(i) {
        "use strict";
        var v, y, b = i.Pos;
        function p(e, t) {
            for (var n, r, i = null != (r = (n = e).flags) ? r : (n.ignoreCase ? "i" : "") + (n.global ? "g" : "") + (n.multiline ? "m" : ""), o = i, l = 0; l < t.length; l++) -1 == o.indexOf(t.charAt(l)) && (o += t.charAt(l));
            return i == o ? e : new RegExp(e.source, o);
        }
        function g(e, t, n) {
            t = p(t, "g");
            for (var r = n.line, i = n.ch, o = e.lastLine(); r <= o; r++, i = 0) {
                t.lastIndex = i;
                var l = e.getLine(r), a = t.exec(l);
                if (a) return {
                    from: b(r, a.index),
                    to: b(r, a.index + a[0].length),
                    match: a
                };
            }
        }
        function m(e, t) {
            for (var n, r = 0; ;) {
                t.lastIndex = r;
                var i = t.exec(e);
                if (!i) return n;
                if ((r = (n = i).index + (n[0].length || 1)) == e.length) return n;
            }
        }
        function w(e, t, n, r) {
            if (e.length == t.length) return n;
            for (var i = 0, o = n + Math.max(0, e.length - t.length); ;) {
                if (i == o) return i;
                var l = i + o >> 1, a = r(e.slice(0, l)).length;
                if (a == n) return l;
                n < a ? o = l : i = l + 1;
            }
        }
        function r(n, r, e, t) {
            var i;
            this.atOccurrence = !1, this.doc = n, e = e ? n.clipPos(e) : b(0, 0), this.pos = {
                from: e,
                to: e
            }, "object" == typeof t ? i = t.caseFold : (i = t, t = null), "string" == typeof r ? (null == i && (i = !1),
                this.matches = function(e, t) {
                    return (e ? function(e, t, n, r) {
                        if (!t.length) return null;
                        var i = r ? v : y, o = i(t).split(/\r|\n\r?/);
                        e: for (var l = n.line, a = n.ch, s = e.firstLine() - 1 + o.length; s <= l; l--,
                            a = -1) {
                            var u = e.getLine(l);
                            -1 < a && (u = u.slice(0, a));
                            var c = i(u);
                            if (1 == o.length) {
                                var f = c.lastIndexOf(o[0]);
                                if (-1 == f) continue e;
                                return {
                                    from: b(l, w(u, c, f, i)),
                                    to: b(l, w(u, c, f + o[0].length, i))
                                };
                            }
                            var h = o[o.length - 1];
                            if (c.slice(0, h.length) == h) {
                                var d = 1;
                                for (n = l - o.length + 1; d < o.length - 1; d++) if (i(e.getLine(n + d)) != o[d]) continue e;
                                var p = e.getLine(l + 1 - o.length), g = i(p);
                                if (g.slice(g.length - o[0].length) == o[0]) return {
                                    from: b(l + 1 - o.length, w(p, g, p.length - o[0].length, i)),
                                    to: b(l, w(u, c, h.length, i))
                                };
                            }
                        }
                    } : function(e, t, n, r) {
                        if (!t.length) return null;
                        var i = r ? v : y, o = i(t).split(/\r|\n\r?/);
                        e: for (var l = n.line, a = n.ch, s = e.lastLine() + 1 - o.length; l <= s; l++,
                            a = 0) {
                            var u = e.getLine(l).slice(a), c = i(u);
                            if (1 == o.length) {
                                var f = c.indexOf(o[0]);
                                if (-1 == f) continue e;
                                return n = w(u, c, f, i) + a, {
                                    from: b(l, w(u, c, f, i) + a),
                                    to: b(l, w(u, c, f + o[0].length, i) + a)
                                };
                            }
                            var h = c.length - o[0].length;
                            if (c.slice(h) == o[0]) {
                                for (var d = 1; d < o.length - 1; d++) if (i(e.getLine(l + d)) != o[d]) continue e;
                                var p = e.getLine(l + o.length - 1), g = i(p), m = o[o.length - 1];
                                if (g.slice(0, m.length) == m) return {
                                    from: b(l, w(u, c, h, i) + a),
                                    to: b(l + o.length - 1, w(p, g, m.length, i))
                                };
                            }
                        }
                    })(n, r, t, i);
                }) : (r = p(r, "gm"), t && !1 === t.multiline ? this.matches = function(e, t) {
                return (e ? function(e, t, n) {
                    t = p(t, "g");
                    for (var r = n.line, i = n.ch, o = e.firstLine(); o <= r; r--, i = -1) {
                        var l = e.getLine(r);
                        -1 < i && (l = l.slice(0, i));
                        var a = m(l, t);
                        if (a) return {
                            from: b(r, a.index),
                            to: b(r, a.index + a[0].length),
                            match: a
                        };
                    }
                } : g)(n, r, t);
            } : this.matches = function(e, t) {
                return (e ? function(e, t, n) {
                    t = p(t, "gm");
                    for (var r, i = 1, o = n.line, l = e.firstLine(); l <= o; ) {
                        for (var a = 0; a < i; a++) {
                            var s = e.getLine(o--);
                            r = null == r ? s.slice(0, n.ch) : s + "\n" + r;
                        }
                        i *= 2;
                        var u = m(r, t);
                        if (u) {
                            var c = r.slice(0, u.index).split("\n"), f = u[0].split("\n"), h = o + c.length, d = c[c.length - 1].length;
                            return {
                                from: b(h, d),
                                to: b(h + f.length - 1, 1 == f.length ? d + f[0].length : f[f.length - 1].length),
                                match: u
                            };
                        }
                    }
                } : function(e, t, n) {
                    if (!/\\s|\\n|\n|\\W|\\D|\[\^/.test(t.source)) return g(e, t, n);
                    t = p(t, "gm");
                    for (var r, i = 1, o = n.line, l = e.lastLine(); o <= l; ) {
                        for (var a = 0; a < i && !(l < o); a++) {
                            var s = e.getLine(o++);
                            r = null == r ? s : r + "\n" + s;
                        }
                        i *= 2, t.lastIndex = n.ch;
                        var u = t.exec(r);
                        if (u) {
                            var c = r.slice(0, u.index).split("\n"), f = u[0].split("\n"), h = n.line + c.length - 1, d = c[c.length - 1].length;
                            return {
                                from: b(h, d),
                                to: b(h + f.length - 1, 1 == f.length ? d + f[0].length : f[f.length - 1].length),
                                match: u
                            };
                        }
                    }
                })(n, r, t);
            });
        }
        String.prototype.normalize ? (v = function(e) {
            return e.normalize("NFD").toLowerCase();
        }, y = function(e) {
            return e.normalize("NFD");
        }) : (v = function(e) {
            return e.toLowerCase();
        }, y = function(e) {
            return e;
        }), r.prototype = {
            findNext: function() {
                return this.find(!1);
            },
            findPrevious: function() {
                return this.find(!0);
            },
            find: function(e) {
                for (var t = this.matches(e, this.doc.clipPos(e ? this.pos.from : this.pos.to)); t && 0 == i.cmpPos(t.from, t.to); ) e ? t.from.ch ? t.from = b(t.from.line, t.from.ch - 1) : t = t.from.line == this.doc.firstLine() ? null : this.matches(e, this.doc.clipPos(b(t.from.line - 1))) : t.to.ch < this.doc.getLine(t.to.line).length ? t.to = b(t.to.line, t.to.ch + 1) : t = t.to.line == this.doc.lastLine() ? null : this.matches(e, b(t.to.line + 1, 0));
                if (t) return this.pos = t, this.atOccurrence = !0, this.pos.match || !0;
                var n = b(e ? this.doc.firstLine() : this.doc.lastLine() + 1, 0);
                return this.pos = {
                    from: n,
                    to: n
                }, this.atOccurrence = !1;
            },
            from: function() {
                if (this.atOccurrence) return this.pos.from;
            },
            to: function() {
                if (this.atOccurrence) return this.pos.to;
            },
            replace: function(e, t) {
                if (this.atOccurrence) {
                    var n = i.splitLines(e);
                    this.doc.replaceRange(n, this.pos.from, this.pos.to, t), this.pos.to = b(this.pos.from.line + n.length - 1, n[n.length - 1].length + (1 == n.length ? this.pos.from.ch : 0));
                }
            }
        }, i.defineExtension("getSearchCursor", function(e, t, n) {
            return new r(this.doc, e, t, n);
        }), i.defineDocExtension("getSearchCursor", function(e, t, n) {
            return new r(this, e, t, n);
        }), i.defineExtension("selectMatches", function(e, t) {
            for (var n = [], r = this.getSearchCursor(e, this.getCursor("from"), t); r.findNext() && !(0 < i.cmpPos(r.to(), this.getCursor("to"))); ) n.push({
                anchor: r.from(),
                head: r.to()
            });
            n.length && this.setSelections(n, 0);
        });
    }(CodeMirror), function(c) {
        "use strict";
        function i(i, o, e, l) {
            if (e && e.call) {
                var a = e;
                e = null;
            } else a = f(i, e, "rangeFinder");
            "number" == typeof o && (o = c.Pos(o, 0));
            var s = f(i, e, "minFoldSize");
            function t(e) {
                var t = a(i, o);
                if (!t || t.to.line - t.from.line < s) return null;
                for (var n = i.findMarksAt(t.from), r = 0; r < n.length; ++r) if (n[r].__isFold && "fold" !== l) {
                    if (!e) return null;
                    t.cleared = !0, n[r].clear();
                }
                return t;
            }
            var n = t(!0);
            if (f(i, e, "scanUp")) for (;!n && o.line > i.firstLine(); ) o = c.Pos(o.line - 1, 0),
                n = t(!1);
            if (n && !n.cleared && "unfold" !== l) {
                var r = function(e, t) {
                    var n = f(e, t, "widget");
                    if ("string" == typeof n) {
                        var r = document.createTextNode(n);
                        (n = document.createElement("span")).appendChild(r), n.className = "CodeMirror-foldmarker";
                    } else n && (n = n.cloneNode(!0));
                    return n;
                }(i, e);
                c.on(r, "mousedown", function(e) {
                    u.clear(), c.e_preventDefault(e);
                });
                var u = i.markText(n.from, n.to, {
                    replacedWith: r,
                    clearOnEnter: f(i, e, "clearOnEnter"),
                    __isFold: !0
                });
                u.on("clear", function(e, t) {
                    c.signal(i, "unfold", i, e, t);
                }), c.signal(i, "fold", i, n.from, n.to);
            }
        }
        c.newFoldFunction = function(n, r) {
            return function(e, t) {
                i(e, t, {
                    rangeFinder: n,
                    widget: r
                });
            };
        }, c.defineExtension("foldCode", function(e, t, n) {
            i(this, e, t, n);
        }), c.defineExtension("isFolded", function(e) {
            for (var t = this.findMarksAt(e), n = 0; n < t.length; ++n) if (t[n].__isFold) return !0;
        }), c.commands.toggleFold = function(e) {
            e.foldCode(e.getCursor());
        }, c.commands.fold = function(e) {
            e.foldCode(e.getCursor(), null, "fold");
        }, c.commands.unfold = function(e) {
            e.foldCode(e.getCursor(), null, "unfold");
        }, c.commands.foldAll = function(n) {
            n.operation(function() {
                for (var e = n.firstLine(), t = n.lastLine(); e <= t; e++) n.foldCode(c.Pos(e, 0), null, "fold");
            });
        }, c.commands.unfoldAll = function(n) {
            n.operation(function() {
                for (var e = n.firstLine(), t = n.lastLine(); e <= t; e++) n.foldCode(c.Pos(e, 0), null, "unfold");
            });
        }, c.registerHelper("fold", "combine", function() {
            var i = Array.prototype.slice.call(arguments, 0);
            return function(e, t) {
                for (var n = 0; n < i.length; ++n) {
                    var r = i[n](e, t);
                    if (r) return r;
                }
            };
        }), c.registerHelper("fold", "auto", function(e, t) {
            for (var n = e.getHelpers(t, "fold"), r = 0; r < n.length; r++) {
                var i = n[r](e, t);
                if (i) return i;
            }
        });
        var o = {
            rangeFinder: c.fold.auto,
            widget: "\u2194",
            minFoldSize: 0,
            scanUp: !1,
            clearOnEnter: !0
        };
        function f(e, t, n) {
            if (t && void 0 !== t[n]) return t[n];
            var r = e.options.foldOptions;
            return r && void 0 !== r[n] ? r[n] : o[n];
        }
        c.defineOption("foldOptions", null), c.defineExtension("foldOption", function(e, t) {
            return f(this, e, t);
        });
    }(CodeMirror), function(r) {
        "use strict";
        r.defineOption("foldGutter", !1, function(e, t, n) {
            n && n != r.Init && (e.clearGutter(e.state.foldGutter.options.gutter), e.state.foldGutter = null,
                e.off("gutterClick", a), e.off("change", s), e.off("viewportChange", h), e.off("fold", d),
                e.off("unfold", d), e.off("swapDoc", s)), t && (e.state.foldGutter = new i(function(e) {
                !0 === e && (e = {});
                null == e.gutter && (e.gutter = "CodeMirror-foldgutter");
                null == e.indicatorOpen && (e.indicatorOpen = "CodeMirror-foldgutter-open");
                null == e.indicatorFolded && (e.indicatorFolded = "CodeMirror-foldgutter-folded");
                return e;
            }(t)), l(e), e.on("gutterClick", a), e.on("change", s), e.on("viewportChange", h),
                e.on("fold", d), e.on("unfold", d), e.on("swapDoc", s));
        });
        var u = r.Pos;
        function i(e) {
            this.options = e, this.from = this.to = 0;
        }
        function c(e, t) {
            for (var n = e.findMarks(u(t, 0), u(t + 1, 0)), r = 0; r < n.length; ++r) if (n[r].__isFold && n[r].find().from.line == t) return n[r];
        }
        function f(e) {
            if ("string" == typeof e) {
                var t = document.createElement("div");
                return t.className = e + " CodeMirror-guttermarker-subtle", t;
            }
            return e.cloneNode(!0);
        }
        function o(i, e, t) {
            var o = i.state.foldGutter.options, l = e, a = i.foldOption(o, "minFoldSize"), s = i.foldOption(o, "rangeFinder");
            i.eachLine(e, t, function(e) {
                var t = null;
                if (c(i, l)) t = f(o.indicatorFolded); else {
                    var n = u(l, 0), r = s && s(i, n);
                    r && r.to.line - r.from.line >= a && (t = f(o.indicatorOpen));
                }
                i.setGutterMarker(e, o.gutter, t), ++l;
            });
        }
        function l(e) {
            var t = e.getViewport(), n = e.state.foldGutter;
            n && (e.operation(function() {
                o(e, t.from, t.to);
            }), n.from = t.from, n.to = t.to);
        }
        function a(e, t, n) {
            var r = e.state.foldGutter;
            if (r) {
                var i = r.options;
                if (n == i.gutter) {
                    var o = c(e, t);
                    o ? o.clear() : e.foldCode(u(t, 0), i.rangeFinder);
                }
            }
        }
        function s(e) {
            var t = e.state.foldGutter;
            if (t) {
                var n = t.options;
                t.from = t.to = 0, clearTimeout(t.changeUpdate), t.changeUpdate = setTimeout(function() {
                    l(e);
                }, n.foldOnChangeTimeSpan || 600);
            }
        }
        function h(t) {
            var n = t.state.foldGutter;
            if (n) {
                var e = n.options;
                clearTimeout(n.changeUpdate), n.changeUpdate = setTimeout(function() {
                    var e = t.getViewport();
                    n.from == n.to || 20 < e.from - n.to || 20 < n.from - e.to ? l(t) : t.operation(function() {
                        e.from < n.from && (o(t, e.from, n.from), n.from = e.from), e.to > n.to && (o(t, n.to, e.to),
                            n.to = e.to);
                    });
                }, e.updateViewportTimeSpan || 400);
            }
        }
        function d(e, t) {
            var n = e.state.foldGutter;
            if (n) {
                var r = t.line;
                r >= n.from && r < n.to && o(e, r, r + 1);
            }
        }
    }(CodeMirror), function(e) {
        "use strict";
        var s = e.Pos;
        function u(e, t) {
            return e.line - t.line || e.ch - t.ch;
        }
        var t = "A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", r = new RegExp("<(/?)([" + t + "][A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD-:.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*)", "g");
        function c(e, t, n, r) {
            this.line = t, this.ch = n, this.cm = e, this.text = e.getLine(t), this.min = r ? Math.max(r.from, e.firstLine()) : e.firstLine(),
                this.max = r ? Math.min(r.to - 1, e.lastLine()) : e.lastLine();
        }
        function i(e, t) {
            var n = e.cm.getTokenTypeAt(s(e.line, t));
            return n && /\btag\b/.test(n);
        }
        function o(e) {
            if (!(e.line >= e.max)) return e.ch = 0, e.text = e.cm.getLine(++e.line), !0;
        }
        function l(e) {
            if (!(e.line <= e.min)) return e.text = e.cm.getLine(--e.line), e.ch = e.text.length,
                !0;
        }
        function f(e) {
            for (;;) {
                var t = e.text.indexOf(">", e.ch);
                if (-1 == t) {
                    if (o(e)) continue;
                    return;
                }
                if (i(e, t + 1)) {
                    var n = e.text.lastIndexOf("/", t), r = -1 < n && !/\S/.test(e.text.slice(n + 1, t));
                    return e.ch = t + 1, r ? "selfClose" : "regular";
                }
                e.ch = t + 1;
            }
        }
        function h(e) {
            for (;;) {
                var t = e.ch ? e.text.lastIndexOf("<", e.ch - 1) : -1;
                if (-1 == t) {
                    if (l(e)) continue;
                    return;
                }
                if (i(e, t + 1)) {
                    r.lastIndex = t, e.ch = t;
                    var n = r.exec(e.text);
                    if (n && n.index == t) return n;
                } else e.ch = t;
            }
        }
        function d(e) {
            for (;;) {
                r.lastIndex = e.ch;
                var t = r.exec(e.text);
                if (!t) {
                    if (o(e)) continue;
                    return;
                }
                if (i(e, t.index + 1)) return e.ch = t.index + t[0].length, t;
                e.ch = t.index + 1;
            }
        }
        function p(e) {
            for (;;) {
                var t = e.ch ? e.text.lastIndexOf(">", e.ch - 1) : -1;
                if (-1 == t) {
                    if (l(e)) continue;
                    return;
                }
                if (i(e, t + 1)) {
                    var n = e.text.lastIndexOf("/", t), r = -1 < n && !/\S/.test(e.text.slice(n + 1, t));
                    return e.ch = t + 1, r ? "selfClose" : "regular";
                }
                e.ch = t;
            }
        }
        function g(e, t) {
            for (var n = []; ;) {
                var r, i = d(e), o = e.line, l = e.ch - (i ? i[0].length : 0);
                if (!i || !(r = f(e))) return;
                if ("selfClose" != r) if (i[1]) {
                    for (var a = n.length - 1; 0 <= a; --a) if (n[a] == i[2]) {
                        n.length = a;
                        break;
                    }
                    if (a < 0 && (!t || t == i[2])) return {
                        tag: i[2],
                        from: s(o, l),
                        to: s(e.line, e.ch)
                    };
                } else n.push(i[2]);
            }
        }
        function m(e, t) {
            for (var n = []; ;) {
                var r = p(e);
                if (!r) return;
                if ("selfClose" != r) {
                    var i = e.line, o = e.ch, l = h(e);
                    if (!l) return;
                    if (l[1]) n.push(l[2]); else {
                        for (var a = n.length - 1; 0 <= a; --a) if (n[a] == l[2]) {
                            n.length = a;
                            break;
                        }
                        if (a < 0 && (!t || t == l[2])) return {
                            tag: l[2],
                            from: s(e.line, e.ch),
                            to: s(i, o)
                        };
                    }
                } else h(e);
            }
        }
        e.registerHelper("fold", "xml", function(e, t) {
            for (var n = new c(e, t.line, 0); ;) {
                var r = d(n);
                if (!r || n.line != t.line) return;
                var i = f(n);
                if (!i) return;
                if (!r[1] && "selfClose" != i) {
                    var o = s(n.line, n.ch), l = g(n, r[2]);
                    return l && 0 < u(l.from, o) ? {
                        from: o,
                        to: l.from
                    } : null;
                }
            }
        }), e.findMatchingTag = function(e, t, n) {
            var r = new c(e, t.line, t.ch, n);
            if (-1 != r.text.indexOf(">") || -1 != r.text.indexOf("<")) {
                var i = f(r), o = i && s(r.line, r.ch), l = i && h(r);
                if (i && l && !(0 < u(r, t))) {
                    var a = {
                        from: s(r.line, r.ch),
                        to: o,
                        tag: l[2]
                    };
                    return "selfClose" == i ? {
                        open: a,
                        close: null,
                        at: "open"
                    } : l[1] ? {
                        open: m(r, l[2]),
                        close: a,
                        at: "close"
                    } : {
                        open: a,
                        close: g(r = new c(e, o.line, o.ch, n), l[2]),
                        at: "open"
                    };
                }
            }
        }, e.findEnclosingTag = function(e, t, n, r) {
            for (var i = new c(e, t.line, t.ch, n); ;) {
                var o = m(i, r);
                if (!o) break;
                var l = g(new c(e, t.line, t.ch, n), o.tag);
                if (l) return {
                    open: o,
                    close: l
                };
            }
        }, e.scanForClosingTag = function(e, t, n, r) {
            return g(new c(e, t.line, t.ch, r ? {
                from: 0,
                to: r
            } : null), n);
        };
    }(CodeMirror), function(l) {
        "use strict";
        function a(e) {
            e.state.tagHit && e.state.tagHit.clear(), e.state.tagOther && e.state.tagOther.clear(),
                e.state.tagHit = e.state.tagOther = null;
        }
        function r(o) {
            o.state.failedTagMatch = !1, o.operation(function() {
                if (a(o), !o.somethingSelected()) {
                    var e = o.getCursor(), t = o.getViewport();
                    t.from = Math.min(t.from, e.line), t.to = Math.max(e.line + 1, t.to);
                    var n = l.findMatchingTag(o, e, t);
                    if (n) {
                        if (o.state.matchBothTags) {
                            var r = "open" == n.at ? n.open : n.close;
                            r && (o.state.tagHit = o.markText(r.from, r.to, {
                                className: "CodeMirror-matchingtag"
                            }));
                        }
                        var i = "close" == n.at ? n.open : n.close;
                        i ? o.state.tagOther = o.markText(i.from, i.to, {
                            className: "CodeMirror-matchingtag"
                        }) : o.state.failedTagMatch = !0;
                    }
                }
            });
        }
        function i(e) {
            e.state.failedTagMatch && r(e);
        }
        l.defineOption("matchTags", !1, function(e, t, n) {
            n && n != l.Init && (e.off("cursorActivity", r), e.off("viewportChange", i), a(e)),
            t && (e.state.matchBothTags = "object" == typeof t && t.bothTags, e.on("cursorActivity", r),
                e.on("viewportChange", i), r(e));
        }), l.commands.toMatchingTag = function(e) {
            var t = l.findMatchingTag(e, e.getCursor());
            if (t) {
                var n = "close" == t.at ? t.open : t.close;
                n && e.extendSelection(n.to, n.from);
            }
        };
    }(CodeMirror), function(N) {
        "use strict";
        var A = "CodeMirror-hint-active";
        function i(e, t) {
            this.cm = e, this.options = t, this.widget = null, this.debounce = 0, this.tick = 0,
                this.startPos = this.cm.getCursor("start"), this.startLen = this.cm.getLine(this.startPos.line).length - this.cm.getSelection().length;
            var n = this;
            e.on("cursorActivity", this.activityFunc = function() {
                n.cursorActivity();
            });
        }
        N.showHint = function(e, t, n) {
            if (!t) return e.showHint(n);
            n && n.async && (t.async = !0);
            var r = {
                hint: t
            };
            if (n) for (var i in n) r[i] = n[i];
            return e.showHint(r);
        }, N.defineExtension("showHint", function(e) {
            e = function(e, t, n) {
                var r = e.options.hintOptions, i = {};
                for (var o in s) i[o] = s[o];
                if (r) for (var o in r) void 0 !== r[o] && (i[o] = r[o]);
                if (n) for (var o in n) void 0 !== n[o] && (i[o] = n[o]);
                i.hint.resolve && (i.hint = i.hint.resolve(e, t));
                return i;
            }(this, this.getCursor("start"), e);
            var t = this.listSelections();
            if (!(1 < t.length)) {
                if (this.somethingSelected()) {
                    if (!e.hint.supportsSelection) return;
                    for (var n = 0; n < t.length; n++) if (t[n].head.line != t[n].anchor.line) return;
                }
                this.state.completionActive && this.state.completionActive.close();
                var r = this.state.completionActive = new i(this, e);
                r.options.hint && (N.signal(this, "startCompletion", this), r.update(!0));
            }
        }), N.defineExtension("closeHint", function() {
            this.state.completionActive && this.state.completionActive.close();
        });
        var r = window.requestAnimationFrame || function(e) {
            return setTimeout(e, 1e3 / 60);
        }, o = window.cancelAnimationFrame || clearTimeout;
        function O(e) {
            return "string" == typeof e ? e : e.text;
        }
        function F(e, t) {
            for (;t && t != e; ) {
                if ("LI" === t.nodeName.toUpperCase() && t.parentNode == e) return t;
                t = t.parentNode;
            }
        }
        function l(i, e) {
            this.completion = i, this.data = e, this.picked = !1;
            var n = this, o = i.cm, l = o.getInputField().ownerDocument, a = l.defaultView || l.parentWindow, s = this.hints = l.createElement("ul"), t = i.cm.options.theme;
            s.className = "CodeMirror-hints " + t, this.selectedHint = e.selectedHint || 0;
            for (var r = e.list, u = 0; u < r.length; ++u) {
                var c = s.appendChild(l.createElement("li")), f = r[u], h = "CodeMirror-hint" + (u != this.selectedHint ? "" : " " + A);
                null != f.className && (h = f.className + " " + h), c.className = h, f.render ? f.render(c, e, f) : c.appendChild(l.createTextNode(f.displayText || O(f))),
                    c.hintId = u;
            }
            var d = o.cursorCoords(i.options.alignWithWord ? e.from : null), p = d.left, g = d.bottom, m = !0;
            s.style.left = p + "px", s.style.top = g + "px";
            var v = a.innerWidth || Math.max(l.body.offsetWidth, l.documentElement.offsetWidth), y = a.innerHeight || Math.max(l.body.offsetHeight, l.documentElement.offsetHeight);
            (i.options.container || l.body).appendChild(s);
            var b = s.getBoundingClientRect(), w = b.bottom - y, x = s.scrollHeight > s.clientHeight + 1, C = o.getScrollInfo();
            if (0 < w) {
                var S = b.bottom - b.top;
                if (0 < d.top - (d.bottom - b.top) - S) s.style.top = (g = d.top - S) + "px", m = !1; else if (y < S) {
                    s.style.height = y - 5 + "px", s.style.top = (g = d.bottom - b.top) + "px";
                    var k = o.getCursor();
                    e.from.ch != k.ch && (d = o.cursorCoords(k), s.style.left = (p = d.left) + "px",
                        b = s.getBoundingClientRect());
                }
            }
            var L, T = b.right - v;
            if (0 < T && (b.right - b.left > v && (s.style.width = v - 5 + "px", T -= b.right - b.left - v),
                s.style.left = (p = d.left - T) + "px"), x) for (var M = s.firstChild; M; M = M.nextSibling) M.style.paddingRight = o.display.nativeBarWidth + "px";
            (o.addKeyMap(this.keyMap = function(e, r) {
                var i = {
                    Up: function() {
                        r.moveFocus(-1);
                    },
                    Down: function() {
                        r.moveFocus(1);
                    },
                    PageUp: function() {
                        r.moveFocus(1 - r.menuSize(), !0);
                    },
                    PageDown: function() {
                        r.moveFocus(r.menuSize() - 1, !0);
                    },
                    Home: function() {
                        r.setFocus(0);
                    },
                    End: function() {
                        r.setFocus(r.length - 1);
                    },
                    Enter: r.pick,
                    Tab: r.pick,
                    Esc: r.close
                };
                /Mac/.test(navigator.platform) && (i["Ctrl-P"] = function() {
                    r.moveFocus(-1);
                }, i["Ctrl-N"] = function() {
                    r.moveFocus(1);
                });
                var t = e.options.customKeys, o = t ? {} : i;
                function n(e, t) {
                    var n;
                    n = "string" != typeof t ? function(e) {
                        return t(e, r);
                    } : i.hasOwnProperty(t) ? i[t] : t, o[e] = n;
                }
                if (t) for (var l in t) t.hasOwnProperty(l) && n(l, t[l]);
                var a = e.options.extraKeys;
                if (a) for (var l in a) a.hasOwnProperty(l) && n(l, a[l]);
                return o;
            }(i, {
                moveFocus: function(e, t) {
                    n.changeActive(n.selectedHint + e, t);
                },
                setFocus: function(e) {
                    n.changeActive(e);
                },
                menuSize: function() {
                    return n.screenAmount();
                },
                length: r.length,
                close: function() {
                    i.close();
                },
                pick: function() {
                    n.pick();
                },
                data: e
            })), i.options.closeOnUnfocus) && (o.on("blur", this.onBlur = function() {
                L = setTimeout(function() {
                    i.close();
                }, 100);
            }), o.on("focus", this.onFocus = function() {
                clearTimeout(L);
            }));
            return o.on("scroll", this.onScroll = function() {
                var e = o.getScrollInfo(), t = o.getWrapperElement().getBoundingClientRect(), n = g + C.top - e.top, r = n - (a.pageYOffset || (l.documentElement || l.body).scrollTop);
                if (m || (r += s.offsetHeight), r <= t.top || r >= t.bottom) return i.close();
                s.style.top = n + "px", s.style.left = p + C.left - e.left + "px";
            }), N.on(s, "dblclick", function(e) {
                var t = F(s, e.target || e.srcElement);
                t && null != t.hintId && (n.changeActive(t.hintId), n.pick());
            }), N.on(s, "click", function(e) {
                var t = F(s, e.target || e.srcElement);
                t && null != t.hintId && (n.changeActive(t.hintId), i.options.completeOnSingleClick && n.pick());
            }), N.on(s, "mousedown", function() {
                setTimeout(function() {
                    o.focus();
                }, 20);
            }), N.signal(e, "select", r[this.selectedHint], s.childNodes[this.selectedHint]),
                !0;
        }
        function a(e, t, n, r) {
            if (e.async) e(t, r, n); else {
                var i = e(t, n);
                i && i.then ? i.then(r) : r(i);
            }
        }
        i.prototype = {
            close: function() {
                this.active() && (this.cm.state.completionActive = null, this.tick = null, this.cm.off("cursorActivity", this.activityFunc),
                this.widget && this.data && N.signal(this.data, "close"), this.widget && this.widget.close(),
                    N.signal(this.cm, "endCompletion", this.cm));
            },
            active: function() {
                return this.cm.state.completionActive == this;
            },
            pick: function(e, t) {
                var n = e.list[t];
                n.hint ? n.hint(this.cm, e, n) : this.cm.replaceRange(O(n), n.from || e.from, n.to || e.to, "complete"),
                    N.signal(e, "pick", n), this.close();
            },
            cursorActivity: function() {
                this.debounce && (o(this.debounce), this.debounce = 0);
                var e = this.cm.getCursor(), t = this.cm.getLine(e.line);
                if (e.line != this.startPos.line || t.length - e.ch != this.startLen - this.startPos.ch || e.ch < this.startPos.ch || this.cm.somethingSelected() || !e.ch || this.options.closeCharacters.test(t.charAt(e.ch - 1))) this.close(); else {
                    var n = this;
                    this.debounce = r(function() {
                        n.update();
                    }), this.widget && this.widget.disable();
                }
            },
            update: function(t) {
                if (null != this.tick) {
                    var n = this, r = ++this.tick;
                    a(this.options.hint, this.cm, this.options, function(e) {
                        n.tick == r && n.finishUpdate(e, t);
                    });
                }
            },
            finishUpdate: function(e, t) {
                this.data && N.signal(this.data, "update");
                var n = this.widget && this.widget.picked || t && this.options.completeSingle;
                this.widget && this.widget.close(), (this.data = e) && e.list.length && (n && 1 == e.list.length ? this.pick(e, 0) : (this.widget = new l(this, e),
                    N.signal(e, "shown")));
            }
        }, l.prototype = {
            close: function() {
                if (this.completion.widget == this) {
                    this.completion.widget = null, this.hints.parentNode.removeChild(this.hints), this.completion.cm.removeKeyMap(this.keyMap);
                    var e = this.completion.cm;
                    this.completion.options.closeOnUnfocus && (e.off("blur", this.onBlur), e.off("focus", this.onFocus)),
                        e.off("scroll", this.onScroll);
                }
            },
            disable: function() {
                this.completion.cm.removeKeyMap(this.keyMap);
                var e = this;
                this.keyMap = {
                    Enter: function() {
                        e.picked = !0;
                    }
                }, this.completion.cm.addKeyMap(this.keyMap);
            },
            pick: function() {
                this.completion.pick(this.data, this.selectedHint);
            },
            changeActive: function(e, t) {
                if (e >= this.data.list.length ? e = t ? this.data.list.length - 1 : 0 : e < 0 && (e = t ? 0 : this.data.list.length - 1),
                this.selectedHint != e) {
                    var n = this.hints.childNodes[this.selectedHint];
                    n && (n.className = n.className.replace(" " + A, "")), (n = this.hints.childNodes[this.selectedHint = e]).className += " " + A,
                        n.offsetTop < this.hints.scrollTop ? this.hints.scrollTop = n.offsetTop - 3 : n.offsetTop + n.offsetHeight > this.hints.scrollTop + this.hints.clientHeight && (this.hints.scrollTop = n.offsetTop + n.offsetHeight - this.hints.clientHeight + 3),
                        N.signal(this.data, "select", this.data.list[this.selectedHint], n);
                }
            },
            screenAmount: function() {
                return Math.floor(this.hints.clientHeight / this.hints.firstChild.offsetHeight) || 1;
            }
        }, N.registerHelper("hint", "auto", {
            resolve: function(e, t) {
                var n, l = e.getHelpers(t, "hint");
                if (l.length) {
                    var r = function(e, r, i) {
                        var o = function(e, t) {
                            if (!e.somethingSelected()) return t;
                            for (var n = [], r = 0; r < t.length; r++) t[r].supportsSelection && n.push(t[r]);
                            return n;
                        }(e, l);
                        !function t(n) {
                            if (n == o.length) return r(null);
                            a(o[n], e, i, function(e) {
                                e && 0 < e.list.length ? r(e) : t(n + 1);
                            });
                        }(0);
                    };
                    return r.async = !0, r.supportsSelection = !0, r;
                }
                return (n = e.getHelper(e.getCursor(), "hintWords")) ? function(e) {
                    return N.hint.fromList(e, {
                        words: n
                    });
                } : N.hint.anyword ? function(e, t) {
                    return N.hint.anyword(e, t);
                } : function() {};
            }
        }), N.registerHelper("hint", "fromList", function(e, t) {
            var n, r = e.getCursor(), i = e.getTokenAt(r), o = N.Pos(r.line, i.start), l = r;
            i.start < r.ch && /\w/.test(i.string.charAt(r.ch - i.start - 1)) ? n = i.string.substr(0, r.ch - i.start) : (n = "",
                o = r);
            for (var a = [], s = 0; s < t.words.length; s++) {
                var u = t.words[s];
                u.slice(0, n.length) == n && a.push(u);
            }
            if (a.length) return {
                list: a,
                from: o,
                to: l
            };
        }), N.commands.autocomplete = N.showHint;
        var s = {
            hint: N.hint.auto,
            completeSingle: !0,
            alignWithWord: !0,
            closeCharacters: /[\s()\[\]{};:>,]/,
            closeOnUnfocus: !0,
            completeOnSingleClick: !0,
            container: null,
            customKeys: null,
            extraKeys: null
        };
        N.defineOption("hintOptions", null);
    }(CodeMirror), function(F) {
        "use strict";
        var D = F.Pos;
        function W(e, t, n) {
            return n ? 0 <= e.indexOf(t) : 0 == e.lastIndexOf(t, 0);
        }
        F.registerHelper("hint", "xml", function(e, t) {
            var n = t && t.schemaInfo, r = t && t.quoteChar || '"', i = t && t.matchInMiddle;
            if (n) {
                var o = e.getCursor(), l = e.getTokenAt(o);
                l.end > o.ch && (l.end = o.ch, l.string = l.string.slice(0, o.ch - l.start));
                var a = F.innerMode(e.getMode(), l.state);
                if ("xml" == a.mode.name) {
                    var s, u, c = [], f = !1, h = /\btag\b/.test(l.type) && !/>$/.test(l.string), d = h && /^\w/.test(l.string);
                    if (d) {
                        var p = e.getLine(o.line).slice(Math.max(0, l.start - 2), l.start), g = /<\/$/.test(p) ? "close" : /<$/.test(p) ? "open" : null;
                        g && (u = l.start - ("close" == g ? 2 : 1));
                    } else h && "<" == l.string ? g = "open" : h && "</" == l.string && (g = "close");
                    if (!h && !a.state.tagName || g) {
                        d && (s = l.string), f = g;
                        var m = a.state.context, v = m && n[m.tagName], y = m ? v && v.children : n["!top"];
                        if (y && "close" != g) for (var b = 0; b < y.length; ++b) s && !W(y[b], s, i) || c.push("<" + y[b]); else if ("close" != g) for (var w in n) !n.hasOwnProperty(w) || "!top" == w || "!attrs" == w || s && !W(w, s, i) || c.push("<" + w);
                        m && (!s || "close" == g && W(m.tagName, s, i)) && c.push("</" + m.tagName + ">");
                    } else {
                        var x = (v = n[a.state.tagName]) && v.attrs, C = n["!attrs"];
                        if (!x && !C) return;
                        if (x) {
                            if (C) {
                                var S = {};
                                for (var k in C) C.hasOwnProperty(k) && (S[k] = C[k]);
                                for (var k in x) x.hasOwnProperty(k) && (S[k] = x[k]);
                                x = S;
                            }
                        } else x = C;
                        if ("string" == l.type || "=" == l.string) {
                            var L, T = (p = e.getRange(D(o.line, Math.max(0, o.ch - 60)), D(o.line, "string" == l.type ? l.start : l.end))).match(/([^\s\u00a0=<>\"\']+)=$/);
                            if (!T || !x.hasOwnProperty(T[1]) || !(L = x[T[1]])) return;
                            if ("function" == typeof L && (L = L.call(this, e)), "string" == l.type) {
                                s = l.string;
                                var M = 0;
                                /['"]/.test(l.string.charAt(0)) && (r = l.string.charAt(0), s = l.string.slice(1),
                                    M++);
                                var N = l.string.length;
                                if (/['"]/.test(l.string.charAt(N - 1)) && (r = l.string.charAt(N - 1), s = l.string.substr(M, N - 2)),
                                    M) {
                                    var A = e.getLine(o.line);
                                    A.length > l.end && A.charAt(l.end) == r && l.end++;
                                }
                                f = !0;
                            }
                            for (b = 0; b < L.length; ++b) s && !W(L[b], s, i) || c.push(r + L[b] + r);
                        } else for (var O in "attribute" == l.type && (s = l.string, f = !0), x) !x.hasOwnProperty(O) || s && !W(O, s, i) || c.push(O);
                    }
                    return {
                        list: c,
                        from: f ? D(o.line, null == u ? l.start : u) : o,
                        to: f ? D(o.line, l.end) : o
                    };
                }
            }
        });
    }(CodeMirror), function(i) {
        "use strict";
        var e = "ab aa af ak sq am ar an hy as av ae ay az bm ba eu be bn bh bi bs br bg my ca ch ce ny zh cv kw co cr hr cs da dv nl dz en eo et ee fo fj fi fr ff gl ka de el gn gu ht ha he hz hi ho hu ia id ie ga ig ik io is it iu ja jv kl kn kr ks kk km ki rw ky kv kg ko ku kj la lb lg li ln lo lt lu lv gv mk mg ms ml mt mi mr mh mn na nv nb nd ne ng nn no ii nr oc oj cu om or os pa pi fa pl ps pt qu rm rn ro ru sa sc sd se sm sg sr gd sn si sk sl so st es su sw ss sv ta te tg th ti bo tk tl tn to tr ts tt tw ty ug uk ur uz ve vi vo wa cy wo fy xh yi yo za zu".split(" "), t = [ "_blank", "_self", "_top", "_parent" ], n = [ "ascii", "utf-8", "utf-16", "latin1", "latin1" ], r = [ "get", "post", "put", "delete" ], o = [ "application/x-www-form-urlencoded", "multipart/form-data", "text/plain" ], l = [ "all", "screen", "print", "embossed", "braille", "handheld", "print", "projection", "screen", "tty", "tv", "speech", "3d-glasses", "resolution [>][<][=] [X]", "device-aspect-ratio: X/Y", "orientation:portrait", "orientation:landscape", "device-height: [X]", "device-width: [X]" ], a = {
            attrs: {}
        }, s = {
            a: {
                attrs: {
                    href: null,
                    ping: null,
                    type: null,
                    media: l,
                    target: t,
                    hreflang: e
                }
            },
            abbr: a,
            acronym: a,
            address: a,
            applet: a,
            area: {
                attrs: {
                    alt: null,
                    coords: null,
                    href: null,
                    target: null,
                    ping: null,
                    media: l,
                    hreflang: e,
                    type: null,
                    shape: [ "default", "rect", "circle", "poly" ]
                }
            },
            article: a,
            aside: a,
            audio: {
                attrs: {
                    src: null,
                    mediagroup: null,
                    crossorigin: [ "anonymous", "use-credentials" ],
                    preload: [ "none", "metadata", "auto" ],
                    autoplay: [ "", "autoplay" ],
                    loop: [ "", "loop" ],
                    controls: [ "", "controls" ]
                }
            },
            b: a,
            base: {
                attrs: {
                    href: null,
                    target: t
                }
            },
            basefont: a,
            bdi: a,
            bdo: a,
            big: a,
            blockquote: {
                attrs: {
                    cite: null
                }
            },
            body: a,
            br: a,
            button: {
                attrs: {
                    form: null,
                    formaction: null,
                    name: null,
                    value: null,
                    autofocus: [ "", "autofocus" ],
                    disabled: [ "", "autofocus" ],
                    formenctype: o,
                    formmethod: r,
                    formnovalidate: [ "", "novalidate" ],
                    formtarget: t,
                    type: [ "submit", "reset", "button" ]
                }
            },
            canvas: {
                attrs: {
                    width: null,
                    height: null
                }
            },
            caption: a,
            center: a,
            cite: a,
            code: a,
            col: {
                attrs: {
                    span: null
                }
            },
            colgroup: {
                attrs: {
                    span: null
                }
            },
            command: {
                attrs: {
                    type: [ "command", "checkbox", "radio" ],
                    label: null,
                    icon: null,
                    radiogroup: null,
                    command: null,
                    title: null,
                    disabled: [ "", "disabled" ],
                    checked: [ "", "checked" ]
                }
            },
            data: {
                attrs: {
                    value: null
                }
            },
            datagrid: {
                attrs: {
                    disabled: [ "", "disabled" ],
                    multiple: [ "", "multiple" ]
                }
            },
            datalist: {
                attrs: {
                    data: null
                }
            },
            dd: a,
            del: {
                attrs: {
                    cite: null,
                    datetime: null
                }
            },
            details: {
                attrs: {
                    open: [ "", "open" ]
                }
            },
            dfn: a,
            dir: a,
            div: a,
            dl: a,
            dt: a,
            em: a,
            embed: {
                attrs: {
                    src: null,
                    type: null,
                    width: null,
                    height: null
                }
            },
            eventsource: {
                attrs: {
                    src: null
                }
            },
            fieldset: {
                attrs: {
                    disabled: [ "", "disabled" ],
                    form: null,
                    name: null
                }
            },
            figcaption: a,
            figure: a,
            font: a,
            footer: a,
            form: {
                attrs: {
                    action: null,
                    name: null,
                    "accept-charset": n,
                    autocomplete: [ "on", "off" ],
                    enctype: o,
                    method: r,
                    novalidate: [ "", "novalidate" ],
                    target: t
                }
            },
            frame: a,
            frameset: a,
            h1: a,
            h2: a,
            h3: a,
            h4: a,
            h5: a,
            h6: a,
            head: {
                attrs: {},
                children: [ "title", "base", "link", "style", "meta", "script", "noscript", "command" ]
            },
            header: a,
            hgroup: a,
            hr: a,
            html: {
                attrs: {
                    manifest: null
                },
                children: [ "head", "body" ]
            },
            i: a,
            iframe: {
                attrs: {
                    src: null,
                    srcdoc: null,
                    name: null,
                    width: null,
                    height: null,
                    sandbox: [ "allow-top-navigation", "allow-same-origin", "allow-forms", "allow-scripts" ],
                    seamless: [ "", "seamless" ]
                }
            },
            img: {
                attrs: {
                    alt: null,
                    src: null,
                    ismap: null,
                    usemap: null,
                    width: null,
                    height: null,
                    crossorigin: [ "anonymous", "use-credentials" ]
                }
            },
            input: {
                attrs: {
                    alt: null,
                    dirname: null,
                    form: null,
                    formaction: null,
                    height: null,
                    list: null,
                    max: null,
                    maxlength: null,
                    min: null,
                    name: null,
                    pattern: null,
                    placeholder: null,
                    size: null,
                    src: null,
                    step: null,
                    value: null,
                    width: null,
                    accept: [ "audio/*", "video/*", "image/*" ],
                    autocomplete: [ "on", "off" ],
                    autofocus: [ "", "autofocus" ],
                    checked: [ "", "checked" ],
                    disabled: [ "", "disabled" ],
                    formenctype: o,
                    formmethod: r,
                    formnovalidate: [ "", "novalidate" ],
                    formtarget: t,
                    multiple: [ "", "multiple" ],
                    readonly: [ "", "readonly" ],
                    required: [ "", "required" ],
                    type: [ "hidden", "text", "search", "tel", "url", "email", "password", "datetime", "date", "month", "week", "time", "datetime-local", "number", "range", "color", "checkbox", "radio", "file", "submit", "image", "reset", "button" ]
                }
            },
            ins: {
                attrs: {
                    cite: null,
                    datetime: null
                }
            },
            kbd: a,
            keygen: {
                attrs: {
                    challenge: null,
                    form: null,
                    name: null,
                    autofocus: [ "", "autofocus" ],
                    disabled: [ "", "disabled" ],
                    keytype: [ "RSA" ]
                }
            },
            label: {
                attrs: {
                    for: null,
                    form: null
                }
            },
            legend: a,
            li: {
                attrs: {
                    value: null
                }
            },
            link: {
                attrs: {
                    href: null,
                    type: null,
                    hreflang: e,
                    media: l,
                    sizes: [ "all", "16x16", "16x16 32x32", "16x16 32x32 64x64" ]
                }
            },
            map: {
                attrs: {
                    name: null
                }
            },
            mark: a,
            menu: {
                attrs: {
                    label: null,
                    type: [ "list", "context", "toolbar" ]
                }
            },
            meta: {
                attrs: {
                    content: null,
                    charset: n,
                    name: [ "viewport", "application-name", "author", "description", "generator", "keywords" ],
                    "http-equiv": [ "content-language", "content-type", "default-style", "refresh" ]
                }
            },
            meter: {
                attrs: {
                    value: null,
                    min: null,
                    low: null,
                    high: null,
                    max: null,
                    optimum: null
                }
            },
            nav: a,
            noframes: a,
            noscript: a,
            object: {
                attrs: {
                    data: null,
                    type: null,
                    name: null,
                    usemap: null,
                    form: null,
                    width: null,
                    height: null,
                    typemustmatch: [ "", "typemustmatch" ]
                }
            },
            ol: {
                attrs: {
                    reversed: [ "", "reversed" ],
                    start: null,
                    type: [ "1", "a", "A", "i", "I" ]
                }
            },
            optgroup: {
                attrs: {
                    disabled: [ "", "disabled" ],
                    label: null
                }
            },
            option: {
                attrs: {
                    disabled: [ "", "disabled" ],
                    label: null,
                    selected: [ "", "selected" ],
                    value: null
                }
            },
            output: {
                attrs: {
                    for: null,
                    form: null,
                    name: null
                }
            },
            p: a,
            param: {
                attrs: {
                    name: null,
                    value: null
                }
            },
            pre: a,
            progress: {
                attrs: {
                    value: null,
                    max: null
                }
            },
            q: {
                attrs: {
                    cite: null
                }
            },
            rp: a,
            rt: a,
            ruby: a,
            s: a,
            samp: a,
            script: {
                attrs: {
                    type: [ "text/javascript" ],
                    src: null,
                    async: [ "", "async" ],
                    defer: [ "", "defer" ],
                    charset: n
                }
            },
            section: a,
            select: {
                attrs: {
                    form: null,
                    name: null,
                    size: null,
                    autofocus: [ "", "autofocus" ],
                    disabled: [ "", "disabled" ],
                    multiple: [ "", "multiple" ]
                }
            },
            small: a,
            source: {
                attrs: {
                    src: null,
                    type: null,
                    media: null
                }
            },
            span: a,
            strike: a,
            strong: a,
            style: {
                attrs: {
                    type: [ "text/css" ],
                    media: l,
                    scoped: null
                }
            },
            sub: a,
            summary: a,
            sup: a,
            table: a,
            tbody: a,
            td: {
                attrs: {
                    colspan: null,
                    rowspan: null,
                    headers: null
                }
            },
            textarea: {
                attrs: {
                    dirname: null,
                    form: null,
                    maxlength: null,
                    name: null,
                    placeholder: null,
                    rows: null,
                    cols: null,
                    autofocus: [ "", "autofocus" ],
                    disabled: [ "", "disabled" ],
                    readonly: [ "", "readonly" ],
                    required: [ "", "required" ],
                    wrap: [ "soft", "hard" ]
                }
            },
            tfoot: a,
            th: {
                attrs: {
                    colspan: null,
                    rowspan: null,
                    headers: null,
                    scope: [ "row", "col", "rowgroup", "colgroup" ]
                }
            },
            thead: a,
            time: {
                attrs: {
                    datetime: null
                }
            },
            title: a,
            tr: a,
            track: {
                attrs: {
                    src: null,
                    label: null,
                    default: null,
                    kind: [ "subtitles", "captions", "descriptions", "chapters", "metadata" ],
                    srclang: e
                }
            },
            tt: a,
            u: a,
            ul: a,
            var: a,
            video: {
                attrs: {
                    src: null,
                    poster: null,
                    width: null,
                    height: null,
                    crossorigin: [ "anonymous", "use-credentials" ],
                    preload: [ "auto", "metadata", "none" ],
                    autoplay: [ "", "autoplay" ],
                    mediagroup: [ "movie" ],
                    muted: [ "", "muted" ],
                    controls: [ "", "controls" ]
                }
            },
            wbr: a
        }, u = {
            accesskey: [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" ],
            class: null,
            contenteditable: [ "true", "false" ],
            contextmenu: null,
            dir: [ "ltr", "rtl", "auto" ],
            draggable: [ "true", "false", "auto" ],
            dropzone: [ "copy", "move", "link", "string:", "file:" ],
            hidden: [ "hidden" ],
            id: null,
            inert: [ "inert" ],
            itemid: null,
            itemprop: null,
            itemref: null,
            itemscope: [ "itemscope" ],
            itemtype: null,
            lang: [ "en", "es" ],
            spellcheck: [ "true", "false" ],
            autocorrect: [ "true", "false" ],
            autocapitalize: [ "true", "false" ],
            style: null,
            tabindex: [ "1", "2", "3", "4", "5", "6", "7", "8", "9" ],
            title: null,
            translate: [ "yes", "no" ],
            onclick: null,
            rel: [ "stylesheet", "alternate", "author", "bookmark", "help", "license", "next", "nofollow", "noreferrer", "prefetch", "prev", "search", "tag" ]
        };
        function c(e) {
            for (var t in u) u.hasOwnProperty(t) && (e.attrs[t] = u[t]);
        }
        for (var f in c(a), s) s.hasOwnProperty(f) && s[f] != a && c(s[f]);
        i.htmlSchema = s, i.registerHelper("hint", "html", function(e, t) {
            var n = {
                schemaInfo: s
            };
            if (t) for (var r in t) n[r] = t[r];
            return i.hint.xml(e, n);
        });
    }(CodeMirror), function(S) {
        "use strict";
        var k = {
            autoSelfClosers: {
                area: !0,
                base: !0,
                br: !0,
                col: !0,
                command: !0,
                embed: !0,
                frame: !0,
                hr: !0,
                img: !0,
                input: !0,
                keygen: !0,
                link: !0,
                meta: !0,
                param: !0,
                source: !0,
                track: !0,
                wbr: !0,
                menuitem: !0
            },
            implicitlyClosed: {
                dd: !0,
                li: !0,
                optgroup: !0,
                option: !0,
                p: !0,
                rp: !0,
                rt: !0,
                tbody: !0,
                td: !0,
                tfoot: !0,
                th: !0,
                tr: !0
            },
            contextGrabbers: {
                dd: {
                    dd: !0,
                    dt: !0
                },
                dt: {
                    dd: !0,
                    dt: !0
                },
                li: {
                    li: !0
                },
                option: {
                    option: !0,
                    optgroup: !0
                },
                optgroup: {
                    optgroup: !0
                },
                p: {
                    address: !0,
                    article: !0,
                    aside: !0,
                    blockquote: !0,
                    dir: !0,
                    div: !0,
                    dl: !0,
                    fieldset: !0,
                    footer: !0,
                    form: !0,
                    h1: !0,
                    h2: !0,
                    h3: !0,
                    h4: !0,
                    h5: !0,
                    h6: !0,
                    header: !0,
                    hgroup: !0,
                    hr: !0,
                    menu: !0,
                    nav: !0,
                    ol: !0,
                    p: !0,
                    pre: !0,
                    section: !0,
                    table: !0,
                    ul: !0
                },
                rp: {
                    rp: !0,
                    rt: !0
                },
                rt: {
                    rp: !0,
                    rt: !0
                },
                tbody: {
                    tbody: !0,
                    tfoot: !0
                },
                td: {
                    td: !0,
                    th: !0
                },
                tfoot: {
                    tbody: !0
                },
                th: {
                    td: !0,
                    th: !0
                },
                thead: {
                    tbody: !0,
                    tfoot: !0
                },
                tr: {
                    tr: !0
                }
            },
            doNotIndent: {
                pre: !0
            },
            allowUnquoted: !0,
            allowMissing: !0,
            caseFold: !0
        }, L = {
            autoSelfClosers: {},
            implicitlyClosed: {},
            contextGrabbers: {},
            doNotIndent: {},
            allowUnquoted: !1,
            allowMissing: !1,
            allowMissingTagName: !1,
            caseFold: !1
        };
        S.defineMode("xml", function(e, t) {
            var l, o, a = e.indentUnit, s = {}, n = t.htmlMode ? k : L;
            for (var r in n) s[r] = n[r];
            for (var r in t) s[r] = t[r];
            function u(t, n) {
                function e(e) {
                    return (n.tokenize = e)(t, n);
                }
                var r = t.next();
                return "<" == r ? t.eat("!") ? t.eat("[") ? t.match("CDATA[") ? e(i("atom", "]]>")) : null : t.match("--") ? e(i("comment", "--\x3e")) : t.match("DOCTYPE", !0, !0) ? (t.eatWhile(/[\w\._\-]/),
                    e(function r(i) {
                        return function(e, t) {
                            for (var n; null != (n = e.next()); ) {
                                if ("<" == n) return t.tokenize = r(i + 1), t.tokenize(e, t);
                                if (">" == n) {
                                    if (1 == i) {
                                        t.tokenize = u;
                                        break;
                                    }
                                    return t.tokenize = r(i - 1), t.tokenize(e, t);
                                }
                            }
                            return "meta";
                        };
                    }(1))) : null : t.eat("?") ? (t.eatWhile(/[\w\._\-]/), n.tokenize = i("meta", "?>"),
                    "meta") : (l = t.eat("/") ? "closeTag" : "openTag", n.tokenize = c, "tag bracket") : "&" == r ? (t.eat("#") ? t.eat("x") ? t.eatWhile(/[a-fA-F\d]/) && t.eat(";") : t.eatWhile(/[\d]/) && t.eat(";") : t.eatWhile(/[\w\.\-:]/) && t.eat(";")) ? "atom" : "error" : (t.eatWhile(/[^&<]/),
                    null);
            }
            function c(e, t) {
                var n, r, i = e.next();
                if (">" == i || "/" == i && e.eat(">")) return t.tokenize = u, l = ">" == i ? "endTag" : "selfcloseTag",
                    "tag bracket";
                if ("=" == i) return l = "equals", null;
                if ("<" == i) {
                    t.tokenize = u, t.state = p, t.tagName = t.tagStart = null;
                    var o = t.tokenize(e, t);
                    return o ? o + " tag error" : "tag error";
                }
                return /[\'\"]/.test(i) ? (t.tokenize = (n = i, (r = function(e, t) {
                    for (;!e.eol(); ) if (e.next() == n) {
                        t.tokenize = c;
                        break;
                    }
                    return "string";
                }).isInAttribute = !0, r), t.stringStartCol = e.column(), t.tokenize(e, t)) : (e.match(/^[^\s\u00a0=<>\"\']*[^\s\u00a0=<>\"\'\/]/),
                    "word");
            }
            function i(n, r) {
                return function(e, t) {
                    for (;!e.eol(); ) {
                        if (e.match(r)) {
                            t.tokenize = u;
                            break;
                        }
                        e.next();
                    }
                    return n;
                };
            }
            function f(e, t, n) {
                this.prev = e.context, this.tagName = t, this.indent = e.indented, this.startOfLine = n,
                (s.doNotIndent.hasOwnProperty(t) || e.context && e.context.noIndent) && (this.noIndent = !0);
            }
            function h(e) {
                e.context && (e.context = e.context.prev);
            }
            function d(e, t) {
                for (var n; ;) {
                    if (!e.context) return;
                    if (n = e.context.tagName, !s.contextGrabbers.hasOwnProperty(n) || !s.contextGrabbers[n].hasOwnProperty(t)) return;
                    h(e);
                }
            }
            function p(e, t, n) {
                return "openTag" == e ? (n.tagStart = t.column(), g) : "closeTag" == e ? m : p;
            }
            function g(e, t, n) {
                return "word" == e ? (n.tagName = t.current(), o = "tag", b) : s.allowMissingTagName && "endTag" == e ? (o = "tag bracket",
                    b(e, t, n)) : (o = "error", g);
            }
            function m(e, t, n) {
                if ("word" == e) {
                    var r = t.current();
                    return n.context && n.context.tagName != r && s.implicitlyClosed.hasOwnProperty(n.context.tagName) && h(n),
                        n.context && n.context.tagName == r || !1 === s.matchClosing ? (o = "tag", v) : (o = "tag error",
                            y);
                }
                return s.allowMissingTagName && "endTag" == e ? (o = "tag bracket", v(e, t, n)) : (o = "error",
                    y);
            }
            function v(e, t, n) {
                return "endTag" != e ? (o = "error", v) : (h(n), p);
            }
            function y(e, t, n) {
                return o = "error", v(e, 0, n);
            }
            function b(e, t, n) {
                if ("word" == e) return o = "attribute", w;
                if ("endTag" == e || "selfcloseTag" == e) {
                    var r = n.tagName, i = n.tagStart;
                    return n.tagName = n.tagStart = null, "selfcloseTag" == e || s.autoSelfClosers.hasOwnProperty(r) ? d(n, r) : (d(n, r),
                        n.context = new f(n, r, i == n.indented)), p;
                }
                return o = "error", b;
            }
            function w(e, t, n) {
                return "equals" == e ? x : (s.allowMissing || (o = "error"), b(e, 0, n));
            }
            function x(e, t, n) {
                return "string" == e ? C : "word" == e && s.allowUnquoted ? (o = "string", b) : (o = "error",
                    b(e, 0, n));
            }
            function C(e, t, n) {
                return "string" == e ? C : b(e, 0, n);
            }
            return u.isInText = !0, {
                startState: function(e) {
                    var t = {
                        tokenize: u,
                        state: p,
                        indented: e || 0,
                        tagName: null,
                        tagStart: null,
                        context: null
                    };
                    return null != e && (t.baseIndent = e), t;
                },
                token: function(e, t) {
                    if (!t.tagName && e.sol() && (t.indented = e.indentation()), e.eatSpace()) return null;
                    l = null;
                    var n = t.tokenize(e, t);
                    return (n || l) && "comment" != n && (o = null, t.state = t.state(l || n, e, t),
                    o && (n = "error" == o ? n + " error" : o)), n;
                },
                indent: function(e, t, n) {
                    var r = e.context;
                    if (e.tokenize.isInAttribute) return e.tagStart == e.indented ? e.stringStartCol + 1 : e.indented + a;
                    if (r && r.noIndent) return S.Pass;
                    if (e.tokenize != c && e.tokenize != u) return n ? n.match(/^(\s*)/)[0].length : 0;
                    if (e.tagName) return !1 !== s.multilineTagIndentPastTag ? e.tagStart + e.tagName.length + 2 : e.tagStart + a * (s.multilineTagIndentFactor || 1);
                    if (s.alignCDATA && /<!\[CDATA\[/.test(t)) return 0;
                    var i = t && /^<(\/)?([\w_:\.-]*)/.exec(t);
                    if (i && i[1]) for (;r; ) {
                        if (r.tagName == i[2]) {
                            r = r.prev;
                            break;
                        }
                        if (!s.implicitlyClosed.hasOwnProperty(r.tagName)) break;
                        r = r.prev;
                    } else if (i) for (;r; ) {
                        var o = s.contextGrabbers[r.tagName];
                        if (!o || !o.hasOwnProperty(i[2])) break;
                        r = r.prev;
                    }
                    for (;r && r.prev && !r.startOfLine; ) r = r.prev;
                    return r ? r.indent + a : e.baseIndent || 0;
                },
                electricInput: /<\/[\s\w:]+>$/,
                blockCommentStart: "\x3c!--",
                blockCommentEnd: "--\x3e",
                configuration: s.htmlMode ? "html" : "xml",
                helperType: s.htmlMode ? "html" : "xml",
                skipAttribute: function(e) {
                    e.state == x && (e.state = b);
                }
            };
        }), S.defineMIME("text/xml", "xml"), S.defineMIME("application/xml", "xml"), S.mimeModes.hasOwnProperty("text/html") || S.defineMIME("text/html", {
            name: "xml",
            htmlMode: !0
        });
    }(CodeMirror), function(p) {
        "use strict";
        var i = {
            script: [ [ "lang", /(javascript|babel)/i, "javascript" ], [ "type", /^(?:text|application)\/(?:x-)?(?:java|ecma)script$|^module$|^$/i, "javascript" ], [ "type", /./, "text/plain" ], [ null, null, "javascript" ] ],
            style: [ [ "lang", /^css$/i, "css" ], [ "type", /^(text\/)?(x-)?(stylesheet|css)$/i, "css" ], [ "type", /./, "text/plain" ], [ null, null, "css" ] ]
        };
        var o = {};
        function g(e, t) {
            var n, r = e.match(o[n = t] || (o[n] = new RegExp("\\s+" + n + "\\s*=\\s*('|\")?([^'\"]+)('|\")?\\s*")));
            return r ? /^\s*(.*?)\s*$/.exec(r[2])[1] : "";
        }
        function m(e, t) {
            return new RegExp((t ? "^" : "") + "</s*" + e + "s*>", "i");
        }
        function l(e, t) {
            for (var n in e) for (var r = t[n] || (t[n] = []), i = e[n], o = i.length - 1; 0 <= o; o--) r.unshift(i[o]);
        }
        p.defineMode("htmlmixed", function(c, e) {
            var f = p.getMode(c, {
                name: "xml",
                htmlMode: !0,
                multilineTagIndentFactor: e.multilineTagIndentFactor,
                multilineTagIndentPastTag: e.multilineTagIndentPastTag
            }), h = {}, t = e && e.tags, n = e && e.scriptTypes;
            if (l(i, h), t && l(t, h), n) for (var r = n.length - 1; 0 <= r; r--) h.script.unshift([ "type", n[r].matches, n[r].mode ]);
            function d(e, t) {
                var n, r = f.token(e, t.htmlState), i = /\btag\b/.test(r);
                if (i && !/[<>\s\/]/.test(e.current()) && (n = t.htmlState.tagName && t.htmlState.tagName.toLowerCase()) && h.hasOwnProperty(n)) t.inTag = n + " "; else if (t.inTag && i && />$/.test(e.current())) {
                    var o = /^([\S]+) (.*)/.exec(t.inTag);
                    t.inTag = null;
                    var l = ">" == e.current() && function(e, t) {
                        for (var n = 0; n < e.length; n++) {
                            var r = e[n];
                            if (!r[0] || r[1].test(g(t, r[0]))) return r[2];
                        }
                    }(h[o[1]], o[2]), a = p.getMode(c, l), s = m(o[1], !0), u = m(o[1], !1);
                    t.token = function(e, t) {
                        return e.match(s, !1) ? (t.token = d, t.localState = t.localMode = null, null) : (n = e,
                            r = u, i = t.localMode.token(e, t.localState), o = n.current(), -1 < (l = o.search(r)) ? n.backUp(o.length - l) : o.match(/<\/?$/) && (n.backUp(o.length),
                        n.match(r, !1) || n.match(o)), i);
                        var n, r, i, o, l;
                    }, t.localMode = a, t.localState = p.startState(a, f.indent(t.htmlState, "", ""));
                } else t.inTag && (t.inTag += e.current(), e.eol() && (t.inTag += " "));
                return r;
            }
            return {
                startState: function() {
                    return {
                        token: d,
                        inTag: null,
                        localMode: null,
                        localState: null,
                        htmlState: p.startState(f)
                    };
                },
                copyState: function(e) {
                    var t;
                    return e.localState && (t = p.copyState(e.localMode, e.localState)), {
                        token: e.token,
                        inTag: e.inTag,
                        localMode: e.localMode,
                        localState: t,
                        htmlState: p.copyState(f, e.htmlState)
                    };
                },
                token: function(e, t) {
                    return t.token(e, t);
                },
                indent: function(e, t, n) {
                    return !e.localMode || /^\s*<\//.test(t) ? f.indent(e.htmlState, t, n) : e.localMode.indent ? e.localMode.indent(e.localState, t, n) : p.Pass;
                },
                innerMode: function(e) {
                    return {
                        state: e.localState || e.htmlState,
                        mode: e.localMode || f
                    };
                }
            };
        }, "xml", "javascript", "css"), p.defineMIME("text/html", "htmlmixed");
    }(CodeMirror), function(f) {
        "use strict";
        var e = f.commands, h = f.Pos;
        function t(t, n) {
            t.extendSelectionsBy(function(e) {
                return t.display.shift || t.doc.extend || e.empty() ? function(e, t, n) {
                    if (n < 0 && 0 == t.ch) return e.clipPos(h(t.line - 1));
                    var r = e.getLine(t.line);
                    if (0 < n && t.ch >= r.length) return e.clipPos(h(t.line + 1, 0));
                    for (var i, o = "start", l = t.ch, a = n < 0 ? 0 : r.length, s = 0; l != a; l += n,
                        s++) {
                        var u = r.charAt(n < 0 ? l - 1 : l), c = "_" != u && f.isWordChar(u) ? "w" : "o";
                        if ("w" == c && u.toUpperCase() == u && (c = "W"), "start" == o) "o" != c && (o = "in",
                            i = c); else if ("in" == o && i != c) {
                            if ("w" == i && "W" == c && n < 0 && l--, "W" == i && "w" == c && 0 < n) {
                                i = "w";
                                continue;
                            }
                            break;
                        }
                    }
                    return h(t.line, l);
                }(t.doc, e.head, n) : n < 0 ? e.from() : e.to();
            });
        }
        function n(l, a) {
            if (l.isReadOnly()) return f.Pass;
            l.operation(function() {
                for (var e = l.listSelections().length, t = [], n = -1, r = 0; r < e; r++) {
                    var i = l.listSelections()[r].head;
                    if (!(i.line <= n)) {
                        var o = h(i.line + (a ? 0 : 1), 0);
                        l.replaceRange("\n", o, null, "+insertLine"), l.indentLine(o.line, null, !0), t.push({
                            head: o,
                            anchor: o
                        }), n = i.line + 1;
                    }
                }
                l.setSelections(t);
            }), l.execCommand("indentAuto");
        }
        function u(e, t) {
            for (var n = t.ch, r = n, i = e.getLine(t.line); n && f.isWordChar(i.charAt(n - 1)); ) --n;
            for (;r < i.length && f.isWordChar(i.charAt(r)); ) ++r;
            return {
                from: h(t.line, n),
                to: h(t.line, r),
                word: i.slice(n, r)
            };
        }
        function r(e, t) {
            for (var n = e.listSelections(), r = [], i = 0; i < n.length; i++) {
                var o = n[i], l = e.findPosV(o.anchor, t, "line", o.anchor.goalColumn), a = e.findPosV(o.head, t, "line", o.head.goalColumn);
                l.goalColumn = null != o.anchor.goalColumn ? o.anchor.goalColumn : e.cursorCoords(o.anchor, "div").left,
                    a.goalColumn = null != o.head.goalColumn ? o.head.goalColumn : e.cursorCoords(o.head, "div").left;
                var s = {
                    anchor: l,
                    head: a
                };
                r.push(o), r.push(s);
            }
            e.setSelections(r);
        }
        e.goSubwordLeft = function(e) {
            t(e, -1);
        }, e.goSubwordRight = function(e) {
            t(e, 1);
        }, e.scrollLineUp = function(e) {
            var t = e.getScrollInfo();
            if (!e.somethingSelected()) {
                var n = e.lineAtHeight(t.top + t.clientHeight, "local");
                e.getCursor().line >= n && e.execCommand("goLineUp");
            }
            e.scrollTo(null, t.top - e.defaultTextHeight());
        }, e.scrollLineDown = function(e) {
            var t = e.getScrollInfo();
            if (!e.somethingSelected()) {
                var n = e.lineAtHeight(t.top, "local") + 1;
                e.getCursor().line <= n && e.execCommand("goLineDown");
            }
            e.scrollTo(null, t.top + e.defaultTextHeight());
        }, e.splitSelectionByLine = function(e) {
            for (var t = e.listSelections(), n = [], r = 0; r < t.length; r++) for (var i = t[r].from(), o = t[r].to(), l = i.line; l <= o.line; ++l) o.line > i.line && l == o.line && 0 == o.ch || n.push({
                anchor: l == i.line ? i : h(l, 0),
                head: l == o.line ? o : h(l)
            });
            e.setSelections(n, 0);
        }, e.singleSelectionTop = function(e) {
            var t = e.listSelections()[0];
            e.setSelection(t.anchor, t.head, {
                scroll: !1
            });
        }, e.selectLine = function(e) {
            for (var t = e.listSelections(), n = [], r = 0; r < t.length; r++) {
                var i = t[r];
                n.push({
                    anchor: h(i.from().line, 0),
                    head: h(i.to().line + 1, 0)
                });
            }
            e.setSelections(n);
        }, e.insertLineAfter = function(e) {
            return n(e, !1);
        }, e.insertLineBefore = function(e) {
            return n(e, !0);
        }, e.selectNextOccurrence = function(e) {
            var t = e.getCursor("from"), n = e.getCursor("to"), r = e.state.sublimeFindFullWord == e.doc.sel;
            if (0 == f.cmpPos(t, n)) {
                var i = u(e, t);
                if (!i.word) return;
                e.setSelection(i.from, i.to), r = !0;
            } else {
                var o = e.getRange(t, n), l = r ? new RegExp("\\b" + o + "\\b") : o, a = e.getSearchCursor(l, n), s = a.findNext();
                if (s || (s = (a = e.getSearchCursor(l, h(e.firstLine(), 0))).findNext()), !s || function(e, t, n) {
                    for (var r = 0; r < e.length; r++) if (e[r].from() == t && e[r].to() == n) return !0;
                    return !1;
                }(e.listSelections(), a.from(), a.to())) return f.Pass;
                e.addSelection(a.from(), a.to());
            }
            r && (e.state.sublimeFindFullWord = e.doc.sel);
        }, e.addCursorToPrevLine = function(e) {
            r(e, -1);
        }, e.addCursorToNextLine = function(e) {
            r(e, 1);
        };
        function i(e) {
            for (var t = e.listSelections(), n = [], r = 0; r < t.length; r++) {
                var i = t[r], o = i.head, l = e.scanForBracket(o, -1);
                if (!l) return !1;
                for (;;) {
                    var a = e.scanForBracket(o, 1);
                    if (!a) return !1;
                    if (a.ch == "(){}[]".charAt("(){}[]".indexOf(l.ch) + 1)) {
                        var s = h(l.pos.line, l.pos.ch + 1);
                        if (0 != f.cmpPos(s, i.from()) || 0 != f.cmpPos(a.pos, i.to())) {
                            n.push({
                                anchor: s,
                                head: a.pos
                            });
                            break;
                        }
                        if (!(l = e.scanForBracket(l.pos, -1))) return !1;
                    }
                    o = h(a.pos.line, a.pos.ch + 1);
                }
            }
            return e.setSelections(n), !0;
        }
        function o(a, s) {
            if (a.isReadOnly()) return f.Pass;
            for (var u, e = a.listSelections(), c = [], t = 0; t < e.length; t++) {
                var n = e[t];
                if (!n.empty()) {
                    for (var r = n.from().line, i = n.to().line; t < e.length - 1 && e[t + 1].from().line == i; ) i = e[++t].to().line;
                    e[t].to().ch || i--, c.push(r, i);
                }
            }
            c.length ? u = !0 : c.push(a.firstLine(), a.lastLine()), a.operation(function() {
                for (var e = [], t = 0; t < c.length; t += 2) {
                    var n = c[t], r = c[t + 1], i = h(n, 0), o = h(r), l = a.getRange(i, o, !1);
                    s ? l.sort() : l.sort(function(e, t) {
                        var n = e.toUpperCase(), r = t.toUpperCase();
                        return n != r && (e = n, t = r), e < t ? -1 : e == t ? 0 : 1;
                    }), a.replaceRange(l, i, o), u && e.push({
                        anchor: i,
                        head: h(r + 1, 0)
                    });
                }
                u && a.setSelections(e, 0);
            });
        }
        function l(a, s) {
            a.operation(function() {
                for (var e = a.listSelections(), t = [], n = [], r = 0; r < e.length; r++) {
                    (o = e[r]).empty() ? (t.push(r), n.push("")) : n.push(s(a.getRange(o.from(), o.to())));
                }
                a.replaceSelections(n, "around", "case");
                var i;
                for (r = t.length - 1; 0 <= r; r--) {
                    var o = e[t[r]];
                    if (!(i && 0 < f.cmpPos(o.head, i))) {
                        var l = u(a, o.head);
                        i = l.from, a.replaceRange(s(l.word), l.from, l.to);
                    }
                }
            });
        }
        function a(e) {
            var t = e.getCursor("from"), n = e.getCursor("to");
            if (0 == f.cmpPos(t, n)) {
                var r = u(e, t);
                if (!r.word) return;
                t = r.from, n = r.to;
            }
            return {
                from: t,
                to: n,
                query: e.getRange(t, n),
                word: r
            };
        }
        function s(e, t) {
            var n = a(e);
            if (n) {
                var r = n.query, i = e.getSearchCursor(r, t ? n.to : n.from);
                (t ? i.findNext() : i.findPrevious()) ? e.setSelection(i.from(), i.to()) : (i = e.getSearchCursor(r, t ? h(e.firstLine(), 0) : e.clipPos(h(e.lastLine()))),
                    (t ? i.findNext() : i.findPrevious()) ? e.setSelection(i.from(), i.to()) : n.word && e.setSelection(n.from, n.to));
            }
        }
        e.selectScope = function(e) {
            i(e) || e.execCommand("selectAll");
        }, e.selectBetweenBrackets = function(e) {
            if (!i(e)) return f.Pass;
        }, e.goToBracket = function(r) {
            r.extendSelectionsBy(function(e) {
                var t = r.scanForBracket(e.head, 1);
                if (t && 0 != f.cmpPos(t.pos, e.head)) return t.pos;
                var n = r.scanForBracket(e.head, -1);
                return n && h(n.pos.line, n.pos.ch + 1) || e.head;
            });
        }, e.swapLineUp = function(i) {
            if (i.isReadOnly()) return f.Pass;
            for (var e = i.listSelections(), o = [], t = i.firstLine() - 1, l = [], n = 0; n < e.length; n++) {
                var r = e[n], a = r.from().line - 1, s = r.to().line;
                l.push({
                    anchor: h(r.anchor.line - 1, r.anchor.ch),
                    head: h(r.head.line - 1, r.head.ch)
                }), 0 != r.to().ch || r.empty() || --s, t < a ? o.push(a, s) : o.length && (o[o.length - 1] = s),
                    t = s;
            }
            i.operation(function() {
                for (var e = 0; e < o.length; e += 2) {
                    var t = o[e], n = o[e + 1], r = i.getLine(t);
                    i.replaceRange("", h(t, 0), h(t + 1, 0), "+swapLine"), n > i.lastLine() ? i.replaceRange("\n" + r, h(i.lastLine()), null, "+swapLine") : i.replaceRange(r + "\n", h(n, 0), null, "+swapLine");
                }
                i.setSelections(l), i.scrollIntoView();
            });
        }, e.swapLineDown = function(i) {
            if (i.isReadOnly()) return f.Pass;
            for (var e = i.listSelections(), o = [], t = i.lastLine() + 1, n = e.length - 1; 0 <= n; n--) {
                var r = e[n], l = r.to().line + 1, a = r.from().line;
                0 != r.to().ch || r.empty() || l--, l < t ? o.push(l, a) : o.length && (o[o.length - 1] = a),
                    t = a;
            }
            i.operation(function() {
                for (var e = o.length - 2; 0 <= e; e -= 2) {
                    var t = o[e], n = o[e + 1], r = i.getLine(t);
                    t == i.lastLine() ? i.replaceRange("", h(t - 1), h(t), "+swapLine") : i.replaceRange("", h(t, 0), h(t + 1, 0), "+swapLine"),
                        i.replaceRange(r + "\n", h(n, 0), null, "+swapLine");
                }
                i.scrollIntoView();
            });
        }, e.toggleCommentIndented = function(e) {
            e.toggleComment({
                indent: !0
            });
        }, e.joinLines = function(s) {
            for (var e = s.listSelections(), u = [], t = 0; t < e.length; t++) {
                for (var n = e[t], r = n.from(), i = r.line, o = n.to().line; t < e.length - 1 && e[t + 1].from().line == o; ) o = e[++t].to().line;
                u.push({
                    start: i,
                    end: o,
                    anchor: !n.empty() && r
                });
            }
            s.operation(function() {
                for (var e = 0, t = [], n = 0; n < u.length; n++) {
                    for (var r, i = u[n], o = i.anchor && h(i.anchor.line - e, i.anchor.ch), l = i.start; l <= i.end; l++) {
                        var a = l - e;
                        l == i.end && (r = h(a, s.getLine(a).length + 1)), a < s.lastLine() && (s.replaceRange(" ", h(a), h(a + 1, /^\s*/.exec(s.getLine(a + 1))[0].length)),
                            ++e);
                    }
                    t.push({
                        anchor: o || r,
                        head: r
                    });
                }
                s.setSelections(t, 0);
            });
        }, e.duplicateLine = function(r) {
            r.operation(function() {
                for (var e = r.listSelections().length, t = 0; t < e; t++) {
                    var n = r.listSelections()[t];
                    n.empty() ? r.replaceRange(r.getLine(n.head.line) + "\n", h(n.head.line, 0)) : r.replaceRange(r.getRange(n.from(), n.to()), n.from());
                }
                r.scrollIntoView();
            });
        }, e.sortLines = function(e) {
            o(e, !0);
        }, e.sortLinesInsensitive = function(e) {
            o(e, !1);
        }, e.nextBookmark = function(e) {
            var t = e.state.sublimeBookmarks;
            if (t) for (;t.length; ) {
                var n = t.shift(), r = n.find();
                if (r) return t.push(n), e.setSelection(r.from, r.to);
            }
        }, e.prevBookmark = function(e) {
            var t = e.state.sublimeBookmarks;
            if (t) for (;t.length; ) {
                t.unshift(t.pop());
                var n = t[t.length - 1].find();
                if (n) return e.setSelection(n.from, n.to);
                t.pop();
            }
        }, e.toggleBookmark = function(e) {
            for (var t = e.listSelections(), n = e.state.sublimeBookmarks || (e.state.sublimeBookmarks = []), r = 0; r < t.length; r++) {
                for (var i = t[r].from(), o = t[r].to(), l = t[r].empty() ? e.findMarksAt(i) : e.findMarks(i, o), a = 0; a < l.length; a++) if (l[a].sublimeBookmark) {
                    l[a].clear();
                    for (var s = 0; s < n.length; s++) n[s] == l[a] && n.splice(s--, 1);
                    break;
                }
                a == l.length && n.push(e.markText(i, o, {
                    sublimeBookmark: !0,
                    clearWhenEmpty: !1
                }));
            }
        }, e.clearBookmarks = function(e) {
            var t = e.state.sublimeBookmarks;
            if (t) for (var n = 0; n < t.length; n++) t[n].clear();
            t.length = 0;
        }, e.selectBookmarks = function(e) {
            var t = e.state.sublimeBookmarks, n = [];
            if (t) for (var r = 0; r < t.length; r++) {
                var i = t[r].find();
                i ? n.push({
                    anchor: i.from,
                    head: i.to
                }) : t.splice(r--, 0);
            }
            n.length && e.setSelections(n, 0);
        }, e.smartBackspace = function(s) {
            if (s.somethingSelected()) return f.Pass;
            s.operation(function() {
                for (var e = s.listSelections(), t = s.getOption("indentUnit"), n = e.length - 1; 0 <= n; n--) {
                    var r = e[n].head, i = s.getRange({
                        line: r.line,
                        ch: 0
                    }, r), o = f.countColumn(i, null, s.getOption("tabSize")), l = s.findPosH(r, -1, "char", !1);
                    if (i && !/\S/.test(i) && o % t == 0) {
                        var a = new h(r.line, f.findColumn(i, o - t, t));
                        a.ch != r.ch && (l = a);
                    }
                    s.replaceRange("", l, r, "+delete");
                }
            });
        }, e.delLineRight = function(n) {
            n.operation(function() {
                for (var e = n.listSelections(), t = e.length - 1; 0 <= t; t--) n.replaceRange("", e[t].anchor, h(e[t].to().line), "+delete");
                n.scrollIntoView();
            });
        }, e.upcaseAtCursor = function(e) {
            l(e, function(e) {
                return e.toUpperCase();
            });
        }, e.downcaseAtCursor = function(e) {
            l(e, function(e) {
                return e.toLowerCase();
            });
        }, e.setSublimeMark = function(e) {
            e.state.sublimeMark && e.state.sublimeMark.clear(), e.state.sublimeMark = e.setBookmark(e.getCursor());
        }, e.selectToSublimeMark = function(e) {
            var t = e.state.sublimeMark && e.state.sublimeMark.find();
            t && e.setSelection(e.getCursor(), t);
        }, e.deleteToSublimeMark = function(e) {
            var t = e.state.sublimeMark && e.state.sublimeMark.find();
            if (t) {
                var n = e.getCursor(), r = t;
                if (0 < f.cmpPos(n, r)) {
                    var i = r;
                    r = n, n = i;
                }
                e.state.sublimeKilled = e.getRange(n, r), e.replaceRange("", n, r);
            }
        }, e.swapWithSublimeMark = function(e) {
            var t = e.state.sublimeMark && e.state.sublimeMark.find();
            t && (e.state.sublimeMark.clear(), e.state.sublimeMark = e.setBookmark(e.getCursor()),
                e.setCursor(t));
        }, e.sublimeYank = function(e) {
            null != e.state.sublimeKilled && e.replaceSelection(e.state.sublimeKilled, null, "paste");
        }, e.showInCenter = function(e) {
            var t = e.cursorCoords(null, "local");
            e.scrollTo(null, (t.top + t.bottom) / 2 - e.getScrollInfo().clientHeight / 2);
        }, e.findUnder = function(e) {
            s(e, !0);
        }, e.findUnderPrevious = function(e) {
            s(e, !1);
        }, e.findAllUnder = function(e) {
            var t = a(e);
            if (t) {
                for (var n = e.getSearchCursor(t.query), r = [], i = -1; n.findNext(); ) r.push({
                    anchor: n.from(),
                    head: n.to()
                }), n.from().line <= t.from.line && n.from().ch <= t.from.ch && i++;
                e.setSelections(r, i);
            }
        };
        var c = f.keyMap;
        c.macSublime = {
            "Cmd-Left": "goLineStartSmart",
            "Shift-Tab": "indentLess",
            "Shift-Ctrl-K": "deleteLine",
            "Alt-Q": "wrapLines",
            "Ctrl-Left": "goSubwordLeft",
            "Ctrl-Right": "goSubwordRight",
            "Ctrl-Alt-Up": "scrollLineUp",
            "Ctrl-Alt-Down": "scrollLineDown",
            "Cmd-L": "selectLine",
            "Shift-Cmd-L": "splitSelectionByLine",
            Esc: "singleSelectionTop",
            "Cmd-Enter": "insertLineAfter",
            "Shift-Cmd-Enter": "insertLineBefore",
            "Cmd-D": "selectNextOccurrence",
            "Shift-Cmd-Space": "selectScope",
            "Shift-Cmd-M": "selectBetweenBrackets",
            "Cmd-M": "goToBracket",
            "Cmd-Ctrl-Up": "swapLineUp",
            "Cmd-Ctrl-Down": "swapLineDown",
            "Cmd-/": "toggleCommentIndented",
            "Cmd-J": "joinLines",
            "Shift-Cmd-D": "duplicateLine",
            F5: "sortLines",
            "Cmd-F5": "sortLinesInsensitive",
            F2: "nextBookmark",
            "Shift-F2": "prevBookmark",
            "Cmd-F2": "toggleBookmark",
            "Shift-Cmd-F2": "clearBookmarks",
            "Alt-F2": "selectBookmarks",
            Backspace: "smartBackspace",
            "Cmd-K Cmd-K": "delLineRight",
            "Cmd-K Cmd-U": "upcaseAtCursor",
            "Cmd-K Cmd-L": "downcaseAtCursor",
            "Cmd-K Cmd-Space": "setSublimeMark",
            "Cmd-K Cmd-A": "selectToSublimeMark",
            "Cmd-K Cmd-W": "deleteToSublimeMark",
            "Cmd-K Cmd-X": "swapWithSublimeMark",
            "Cmd-K Cmd-Y": "sublimeYank",
            "Cmd-K Cmd-C": "showInCenter",
            "Cmd-K Cmd-G": "clearBookmarks",
            "Cmd-K Cmd-Backspace": "delLineLeft",
            "Cmd-K Cmd-0": "unfoldAll",
            "Cmd-K Cmd-J": "unfoldAll",
            "Ctrl-Shift-Up": "addCursorToPrevLine",
            "Ctrl-Shift-Down": "addCursorToNextLine",
            "Cmd-F3": "findUnder",
            "Shift-Cmd-F3": "findUnderPrevious",
            "Alt-F3": "findAllUnder",
            "Shift-Cmd-[": "fold",
            "Shift-Cmd-]": "unfold",
            "Cmd-I": "findIncremental",
            "Shift-Cmd-I": "findIncrementalReverse",
            "Cmd-H": "replace",
            F3: "findNext",
            "Shift-F3": "findPrev",
            fallthrough: "macDefault"
        }, f.normalizeKeyMap(c.macSublime), c.pcSublime = {
            "Shift-Tab": "indentLess",
            "Shift-Ctrl-K": "deleteLine",
            "Alt-Q": "wrapLines",
            "Ctrl-T": "transposeChars",
            "Alt-Left": "goSubwordLeft",
            "Alt-Right": "goSubwordRight",
            "Ctrl-Up": "scrollLineUp",
            "Ctrl-Down": "scrollLineDown",
            "Ctrl-L": "selectLine",
            "Shift-Ctrl-L": "splitSelectionByLine",
            Esc: "singleSelectionTop",
            "Ctrl-Enter": "insertLineAfter",
            "Shift-Ctrl-Enter": "insertLineBefore",
            "Ctrl-D": "selectNextOccurrence",
            "Shift-Ctrl-Space": "selectScope",
            "Shift-Ctrl-M": "selectBetweenBrackets",
            "Ctrl-M": "goToBracket",
            "Shift-Ctrl-Up": "swapLineUp",
            "Shift-Ctrl-Down": "swapLineDown",
            "Ctrl-/": "toggleCommentIndented",
            "Ctrl-J": "joinLines",
            "Shift-Ctrl-D": "duplicateLine",
            F9: "sortLines",
            "Ctrl-F9": "sortLinesInsensitive",
            F2: "nextBookmark",
            "Shift-F2": "prevBookmark",
            "Ctrl-F2": "toggleBookmark",
            "Shift-Ctrl-F2": "clearBookmarks",
            "Alt-F2": "selectBookmarks",
            Backspace: "smartBackspace",
            "Ctrl-K Ctrl-K": "delLineRight",
            "Ctrl-K Ctrl-U": "upcaseAtCursor",
            "Ctrl-K Ctrl-L": "downcaseAtCursor",
            "Ctrl-K Ctrl-Space": "setSublimeMark",
            "Ctrl-K Ctrl-A": "selectToSublimeMark",
            "Ctrl-K Ctrl-W": "deleteToSublimeMark",
            "Ctrl-K Ctrl-X": "swapWithSublimeMark",
            "Ctrl-K Ctrl-Y": "sublimeYank",
            "Ctrl-K Ctrl-C": "showInCenter",
            "Ctrl-K Ctrl-G": "clearBookmarks",
            "Ctrl-K Ctrl-Backspace": "delLineLeft",
            "Ctrl-K Ctrl-0": "unfoldAll",
            "Ctrl-K Ctrl-J": "unfoldAll",
            "Ctrl-Alt-Up": "addCursorToPrevLine",
            "Ctrl-Alt-Down": "addCursorToNextLine",
            "Ctrl-F3": "findUnder",
            "Shift-Ctrl-F3": "findUnderPrevious",
            "Alt-F3": "findAllUnder",
            "Shift-Ctrl-[": "fold",
            "Shift-Ctrl-]": "unfold",
            "Ctrl-I": "findIncremental",
            "Shift-Ctrl-I": "findIncrementalReverse",
            "Ctrl-H": "replace",
            F3: "findNext",
            "Shift-F3": "findPrev",
            fallthrough: "pcDefault"
        }, f.normalizeKeyMap(c.pcSublime);
        var d = c.default == c.macDefault;
        c.sublime = d ? c.macSublime : c.pcSublime;
    }(CodeMirror);
    var n = window.CodeMirror;
    return window.CodeMirror = t, n;
});
