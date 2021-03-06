! function($) {
    function format(a) {
        for (var b = 1; b < arguments.length; b++) a = a.replace("%" + (b - 1), arguments[b]);
        return a
    }

    function CloudZoom(a, b) {
        var d, e, l, n, o, u, v, x, c = $("img", a),
            f = null,
            g = null,
            h = null,
            i = null,
            j = null,
            k = null,
            m = 0,
            p = 0,
            q = 0,
            r = 0,
            s = 0,
            t = 0,
            w = this;
        setTimeout(function() {
            if (null === g) {
                var b = a.width();
                a.parent().append(format('<div style="width:%0px;position:absolute;top:75%;left:%1px;text-align:center" class="cloud-zoom-loading" >\u8bfb\u53d6\u4e2d...</div>', b / 3, b / 2 - b / 6)).find(":last").css("opacity", .5)
            }
        }, 200);
        var y = function() {
            null !== k && (k.remove(), k = null)
        };
        this.removeBits = function() {
            h && (h.remove(), h = null), i && (i.remove(), i = null), j && (j.remove(), j = null), y(), $(".cloud-zoom-loading", a.parent()).remove()
        }, this.destroy = function() {
            a.data("zoom", null), g && (g.unbind(), g.remove(), g = null), f && (f.remove(), f = null), this.removeBits()
        }, this.fadedOut = function() {
            f && (f.remove(), f = null), this.removeBits()
        }, this.controlLoop = function() {
            if (h) {
                var a = u - c.offset().left - .5 * n >> 0,
                    d = v - c.offset().top - .5 * o >> 0;
                0 > a ? a = 0 : a > c.outerWidth() - n && (a = c.outerWidth() - n), 0 > d ? d = 0 : d > c.outerHeight() - o && (d = c.outerHeight() - o), h.css({
                    left: a,
                    top: d
                }), h.css("background-position", -a + "px " + -d + "px"), p = a / c.outerWidth() * l.width >> 0, q = d / c.outerHeight() * l.height >> 0, s += (p - s) / b.smoothMove, r += (q - r) / b.smoothMove, f.css("background-position", -(s >> 0) + "px " + (-(r >> 0) + "px"))
            }
            m = setTimeout(function() {
                w.controlLoop()
            }, 30)
        }, this.init2 = function(a, b) {
            t++, 1 === b && (l = a), 2 === t && this.init()
        }, this.init = function() {
            $(".cloud-zoom-loading", a.parent()).remove(), g = a.parent().append(format("<div class='mousetrap' style='1background-image:url(\".\");z-index:8;position:absolute;width:%0px;height:%1px;left:%2px;top:%3px;'></div>", c.outerWidth(), c.outerHeight(), 0, 0)).find(":last"), g.bind("mousemove", this, function(a) {
                u = a.pageX, v = a.pageY
            }), g.bind("mouseleave", this, function() {
                return clearTimeout(m), h && h.fadeOut(299), i && i.fadeOut(299), j && j.fadeOut(299), f.fadeOut(300, function() {
                    w.fadedOut()
                }), !1
            }), g.bind("mouseenter", this, function(d) {
                u = d.pageX, v = d.pageY, x = d.data, f && (f.stop(!0, !1), f.remove());
                var e = b.adjustX,
                    m = b.adjustY,
                    p = c.outerWidth(),
                    q = c.outerHeight(),
                    r = b.zoomWidth,
                    s = b.zoomHeight;
                "auto" == b.zoomWidth && (r = p), "auto" == b.zoomHeight && (s = q);
                var t = a.parent();
                switch (b.position) {
                    case "top":
                        m -= s;
                        break;
                    case "right":
                        e += p;
                        break;
                    case "bottom":
                        m += q;
                        break;
                    case "left":
                        e -= r;
                        break;
                    case "inside":
                        r = p, s = q;
                        break;
                    default:
                        t = $("#" + b.position), t.length ? (r = t.innerWidth(), s = t.innerHeight()) : (t = a, e += p, m += q)
                }
                f = t.append(format('<div id="cloud-zoom-big" class="cloud-zoom-big" style="display:none;position:absolute;left:%0px;top:%1px;width:%2px;height:%3px;background-image:url(\'%4\');z-index:7;"></div>', e, m, r, s, l.src)).find(":last"), c.attr("title") && b.showTitle && f.append(format('<div class="cloud-zoom-title">%0</div>', c.attr("title"))).find(":last").css("opacity", b.titleOpacity), $.browser.msie && $.browser.version < 7 && (k = $('<iframe frameborder="0" src="#"></iframe>').css({
                    position: "absolute",
                    left: e,
                    top: m,
                    zIndex: 8,
                    width: r,
                    height: s
                }).insertBefore(f)), f.fadeIn(500), h && (h.remove(), h = null), n = c.outerWidth() / l.width * f.width(), o = c.outerHeight() / l.height * f.height(), h = a.append(format("<div class = 'cloud-zoom-lens' style='display:none;z-index:9;position:absolute;width:%0px;height:%1px;'></div>", n, o)).find(":last"), g.css("cursor", h.css("cursor"));
                var w = !1;
                b.tint && (h.css("background", 'url("' + c.attr("src") + '")'), i = a.append(format('<div style="display:none;position:absolute; left:0px; top:0px; width:%0px; height:%1px; background-color:%2;" />', c.outerWidth(), c.outerHeight(), b.tint)).find(":last"), i.css("opacity", b.tintOpacity), w = !0, i.fadeIn(500)), b.softFocus && (h.css("background", 'url("' + c.attr("src") + '")'), j = a.append(format('<div style="position:absolute;display:none;top:2px; left:2px; width:%0px; height:%1px;" />', c.outerWidth() - 2, c.outerHeight() - 2, b.tint)).find(":last"), j.css("background", 'url("' + c.attr("src") + '")'), j.css("opacity", .5), w = !0, j.fadeIn(500)), w || h.css("opacity", b.lensOpacity), "inside" !== b.position && h.fadeIn(500), x.controlLoop()
            })
        }, d = new Image, $(d).load(function() {
            w.init2(this, 0)
        }), d.src = c.attr("src"), e = new Image, $(e).load(function() {
            w.init2(this, 1)
        }), e.src = a.attr("href")
    }
    $.fn.CloudZoom = function(options) {
        try {
            document.execCommand("BackgroundImageCache", !1, !0)
        } catch (e) {}
        return this.each(function() {
            var relOpts, opts;
            eval("var	a = {" + $(this).attr("rel") + "}"), relOpts = a, $(this).is(".cloud-zoom") ? ($(this).css({
                position: "relative",
                display: "block"
            }), $("img", $(this)).css({
                display: "block"
            }), "wrap" != $(this).parent().attr("id") && $(this).wrap('<div id="wrap" style="top:0px;z-index:11;position:relative;"></div>'), opts = $.extend({}, $.fn.CloudZoom.defaults, options), opts = $.extend({}, opts, relOpts), $(this).data("zoom", new CloudZoom($(this), opts))) : $(this).is(".cloud-zoom-gallery") && (opts = $.extend({}, relOpts, options), $(this).data("relOpts", opts), $(this).bind("click", $(this), function(a) {
                var b = a.data.data("relOpts");
                return $("#" + b.useZoom).data("zoom").destroy(), $("#" + b.useZoom).attr("href", a.data.attr("href")), $("#" + b.useZoom + " img").attr("src", a.data.data("relOpts").smallImage), $("#" + a.data.data("relOpts").useZoom).CloudZoom(), !1
            }))
        }), this
    }, $.fn.CloudZoom.defaults = {
        zoomWidth: "auto",
        zoomHeight: "auto",
        position: "right",
        tint: !1,
        tintOpacity: .5,
        lensOpacity: .5,
        softFocus: !1,
        smoothMove: 3,
        showTitle: !0,
        titleOpacity: .5,
        adjustX: 0,
        adjustY: 0
    }
}(jQuery), $(document).ready(function() {
    $(".cloud-zoom, .cloud-zoom-gallery").CloudZoom()
});