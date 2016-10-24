

/* ---- /1Mi3ThNGPyiuhiWCJPH2BAqeKCiBF5BVpR/ZeroFrame.coffee ---- */


(function() {
  var ZeroFrame,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    slice = [].slice;

  ZeroFrame = (function() {
    function ZeroFrame(url) {
      this.onCloseWebsocket = bind(this.onCloseWebsocket, this);
      this.onOpenWebsocket = bind(this.onOpenWebsocket, this);
      this.route = bind(this.route, this);
      this.onMessage = bind(this.onMessage, this);
      this.url = url;
      this.waiting_cb = {};
      this.wrapper_nonce = document.location.href.replace(/.*wrapper_nonce=([A-Za-z0-9]+).*/, "$1");
      this.connect();
      this.next_message_id = 1;
      this.init();
    }

    ZeroFrame.prototype.init = function() {
      return this;
    };

    ZeroFrame.prototype.connect = function() {
      this.target = window.parent;
      window.addEventListener("message", this.onMessage, false);
      return this.cmd("innerReady");
    };

    ZeroFrame.prototype.onMessage = function(e) {
      var cmd, message;
      message = e.data;
      cmd = message.cmd;
      if (cmd === "response") {
        if (this.waiting_cb[message.to] != null) {
          return this.waiting_cb[message.to](message.result);
        } else {
          return this.log("Websocket callback not found:", message);
        }
      } else if (cmd === "wrapperReady") {
        return this.cmd("innerReady");
      } else if (cmd === "ping") {
        return this.response(message.id, "pong");
      } else if (cmd === "wrapperOpenedWebsocket") {
        return this.onOpenWebsocket();
      } else if (cmd === "wrapperClosedWebsocket") {
        return this.onCloseWebsocket();
      } else {
        return this.route(cmd, message);
      }
    };

    ZeroFrame.prototype.route = function(cmd, message) {
      return this.log("Unknown command", message);
    };

    ZeroFrame.prototype.response = function(to, result) {
      return this.send({
        "cmd": "response",
        "to": to,
        "result": result
      });
    };

    ZeroFrame.prototype.cmd = function(cmd, params, cb) {
      if (params == null) {
        params = {};
      }
      if (cb == null) {
        cb = null;
      }
      return this.send({
        "cmd": cmd,
        "params": params
      }, cb);
    };

    ZeroFrame.prototype.send = function(message, cb) {
      if (cb == null) {
        cb = null;
      }
      message.wrapper_nonce = this.wrapper_nonce;
      message.id = this.next_message_id;
      this.next_message_id += 1;
      this.target.postMessage(message, "*");
      if (cb) {
        return this.waiting_cb[message.id] = cb;
      }
    };

    ZeroFrame.prototype.log = function() {
      var args;
      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      return console.log.apply(console, ["[ZeroFrame]"].concat(slice.call(args)));
    };

    ZeroFrame.prototype.onOpenWebsocket = function() {
      return this.log("Websocket open");
    };

    ZeroFrame.prototype.onCloseWebsocket = function() {
      return this.log("Websocket close");
    };

    return ZeroFrame;

  })();

  window.ZeroFrame = ZeroFrame;

}).call(this);


/* ---- /1Mi3ThNGPyiuhiWCJPH2BAqeKCiBF5BVpR/bootstrap.min.js ---- */


/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under the MIT license
 */
if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(a){"use strict";var b=a.fn.jquery.split(" ")[0].split(".");if(b[0]<2&&b[1]<9||1==b[0]&&9==b[1]&&b[2]<1||b[0]>3)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4")}(jQuery),+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]};return!1}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one("bsTransitionEnd",function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b(),a.support.transition&&(a.event.special.bsTransitionEnd={bindType:a.support.transition.end,delegateType:a.support.transition.end,handle:function(b){if(a(b.target).is(this))return b.handleObj.handler.apply(this,arguments)}})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var c=a(this),e=c.data("bs.alert");e||c.data("bs.alert",e=new d(this)),"string"==typeof b&&e[b].call(c)})}var c='[data-dismiss="alert"]',d=function(b){a(b).on("click",c,this.close)};d.VERSION="3.3.7",d.TRANSITION_DURATION=150,d.prototype.close=function(b){function c(){g.detach().trigger("closed.bs.alert").remove()}var e=a(this),f=e.attr("data-target");f||(f=e.attr("href"),f=f&&f.replace(/.*(?=#[^\s]*$)/,""));var g=a("#"===f?[]:f);b&&b.preventDefault(),g.length||(g=e.closest(".alert")),g.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(g.removeClass("in"),a.support.transition&&g.hasClass("fade")?g.one("bsTransitionEnd",c).emulateTransitionEnd(d.TRANSITION_DURATION):c())};var e=a.fn.alert;a.fn.alert=b,a.fn.alert.Constructor=d,a.fn.alert.noConflict=function(){return a.fn.alert=e,this},a(document).on("click.bs.alert.data-api",c,d.prototype.close)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==typeof b&&b;e||d.data("bs.button",e=new c(this,f)),"toggle"==b?e.toggle():b&&e.setState(b)})}var c=function(b,d){this.$element=a(b),this.options=a.extend({},c.DEFAULTS,d),this.isLoading=!1};c.VERSION="3.3.7",c.DEFAULTS={loadingText:"loading..."},c.prototype.setState=function(b){var c="disabled",d=this.$element,e=d.is("input")?"val":"html",f=d.data();b+="Text",null==f.resetText&&d.data("resetText",d[e]()),setTimeout(a.proxy(function(){d[e](null==f[b]?this.options[b]:f[b]),"loadingText"==b?(this.isLoading=!0,d.addClass(c).attr(c,c).prop(c,!0)):this.isLoading&&(this.isLoading=!1,d.removeClass(c).removeAttr(c).prop(c,!1))},this),0)},c.prototype.toggle=function(){var a=!0,b=this.$element.closest('[data-toggle="buttons"]');if(b.length){var c=this.$element.find("input");"radio"==c.prop("type")?(c.prop("checked")&&(a=!1),b.find(".active").removeClass("active"),this.$element.addClass("active")):"checkbox"==c.prop("type")&&(c.prop("checked")!==this.$element.hasClass("active")&&(a=!1),this.$element.toggleClass("active")),c.prop("checked",this.$element.hasClass("active")),a&&c.trigger("change")}else this.$element.attr("aria-pressed",!this.$element.hasClass("active")),this.$element.toggleClass("active")};var d=a.fn.button;a.fn.button=b,a.fn.button.Constructor=c,a.fn.button.noConflict=function(){return a.fn.button=d,this},a(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(c){var d=a(c.target).closest(".btn");b.call(d,"toggle"),a(c.target).is('input[type="radio"], input[type="checkbox"]')||(c.preventDefault(),d.is("input,button")?d.trigger("focus"):d.find("input:visible,button:visible").first().trigger("focus"))}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(b){a(b.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(b.type))})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},c.DEFAULTS,d.data(),"object"==typeof b&&b),g="string"==typeof b?b:f.slide;e||d.data("bs.carousel",e=new c(this,f)),"number"==typeof b?e.to(b):g?e[g]():f.interval&&e.pause().cycle()})}var c=function(b,c){this.$element=a(b),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=null,this.sliding=null,this.interval=null,this.$active=null,this.$items=null,this.options.keyboard&&this.$element.on("keydown.bs.carousel",a.proxy(this.keydown,this)),"hover"==this.options.pause&&!("ontouchstart"in document.documentElement)&&this.$element.on("mouseenter.bs.carousel",a.proxy(this.pause,this)).on("mouseleave.bs.carousel",a.proxy(this.cycle,this))};c.VERSION="3.3.7",c.TRANSITION_DURATION=600,c.DEFAULTS={interval:5e3,pause:"hover",wrap:!0,keyboard:!0},c.prototype.keydown=function(a){if(!/input|textarea/i.test(a.target.tagName)){switch(a.which){case 37:this.prev();break;case 39:this.next();break;default:return}a.preventDefault()}},c.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},c.prototype.getItemIndex=function(a){return this.$items=a.parent().children(".item"),this.$items.index(a||this.$active)},c.prototype.getItemForDirection=function(a,b){var c=this.getItemIndex(b),d="prev"==a&&0===c||"next"==a&&c==this.$items.length-1;if(d&&!this.options.wrap)return b;var e="prev"==a?-1:1,f=(c+e)%this.$items.length;return this.$items.eq(f)},c.prototype.to=function(a){var b=this,c=this.getItemIndex(this.$active=this.$element.find(".item.active"));if(!(a>this.$items.length-1||a<0))return this.sliding?this.$element.one("slid.bs.carousel",function(){b.to(a)}):c==a?this.pause().cycle():this.slide(a>c?"next":"prev",this.$items.eq(a))},c.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},c.prototype.next=function(){if(!this.sliding)return this.slide("next")},c.prototype.prev=function(){if(!this.sliding)return this.slide("prev")},c.prototype.slide=function(b,d){var e=this.$element.find(".item.active"),f=d||this.getItemForDirection(b,e),g=this.interval,h="next"==b?"left":"right",i=this;if(f.hasClass("active"))return this.sliding=!1;var j=f[0],k=a.Event("slide.bs.carousel",{relatedTarget:j,direction:h});if(this.$element.trigger(k),!k.isDefaultPrevented()){if(this.sliding=!0,g&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var l=a(this.$indicators.children()[this.getItemIndex(f)]);l&&l.addClass("active")}var m=a.Event("slid.bs.carousel",{relatedTarget:j,direction:h});return a.support.transition&&this.$element.hasClass("slide")?(f.addClass(b),f[0].offsetWidth,e.addClass(h),f.addClass(h),e.one("bsTransitionEnd",function(){f.removeClass([b,h].join(" ")).addClass("active"),e.removeClass(["active",h].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger(m)},0)}).emulateTransitionEnd(c.TRANSITION_DURATION)):(e.removeClass("active"),f.addClass("active"),this.sliding=!1,this.$element.trigger(m)),g&&this.cycle(),this}};var d=a.fn.carousel;a.fn.carousel=b,a.fn.carousel.Constructor=c,a.fn.carousel.noConflict=function(){return a.fn.carousel=d,this};var e=function(c){var d,e=a(this),f=a(e.attr("data-target")||(d=e.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""));if(f.hasClass("carousel")){var g=a.extend({},f.data(),e.data()),h=e.attr("data-slide-to");h&&(g.interval=!1),b.call(f,g),h&&f.data("bs.carousel").to(h),c.preventDefault()}};a(document).on("click.bs.carousel.data-api","[data-slide]",e).on("click.bs.carousel.data-api","[data-slide-to]",e),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var c=a(this);b.call(c,c.data())})})}(jQuery),+function(a){"use strict";function b(b){var c,d=b.attr("data-target")||(c=b.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"");return a(d)}function c(b){return this.each(function(){var c=a(this),e=c.data("bs.collapse"),f=a.extend({},d.DEFAULTS,c.data(),"object"==typeof b&&b);!e&&f.toggle&&/show|hide/.test(b)&&(f.toggle=!1),e||c.data("bs.collapse",e=new d(this,f)),"string"==typeof b&&e[b]()})}var d=function(b,c){this.$element=a(b),this.options=a.extend({},d.DEFAULTS,c),this.$trigger=a('[data-toggle="collapse"][href="#'+b.id+'"],[data-toggle="collapse"][data-target="#'+b.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};d.VERSION="3.3.7",d.TRANSITION_DURATION=350,d.DEFAULTS={toggle:!0},d.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},d.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var b,e=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing");if(!(e&&e.length&&(b=e.data("bs.collapse"),b&&b.transitioning))){var f=a.Event("show.bs.collapse");if(this.$element.trigger(f),!f.isDefaultPrevented()){e&&e.length&&(c.call(e,"hide"),b||e.data("bs.collapse",null));var g=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var h=function(){this.$element.removeClass("collapsing").addClass("collapse in")[g](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return h.call(this);var i=a.camelCase(["scroll",g].join("-"));this.$element.one("bsTransitionEnd",a.proxy(h,this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])}}}},d.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var e=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};return a.support.transition?void this.$element[c](0).one("bsTransitionEnd",a.proxy(e,this)).emulateTransitionEnd(d.TRANSITION_DURATION):e.call(this)}}},d.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},d.prototype.getParent=function(){return a(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(a.proxy(function(c,d){var e=a(d);this.addAriaAndCollapsedClass(b(e),e)},this)).end()},d.prototype.addAriaAndCollapsedClass=function(a,b){var c=a.hasClass("in");a.attr("aria-expanded",c),b.toggleClass("collapsed",!c).attr("aria-expanded",c)};var e=a.fn.collapse;a.fn.collapse=c,a.fn.collapse.Constructor=d,a.fn.collapse.noConflict=function(){return a.fn.collapse=e,this},a(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(d){var e=a(this);e.attr("data-target")||d.preventDefault();var f=b(e),g=f.data("bs.collapse"),h=g?"toggle":e.data();c.call(f,h)})}(jQuery),+function(a){"use strict";function b(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#[A-Za-z]/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}function c(c){c&&3===c.which||(a(e).remove(),a(f).each(function(){var d=a(this),e=b(d),f={relatedTarget:this};e.hasClass("open")&&(c&&"click"==c.type&&/input|textarea/i.test(c.target.tagName)&&a.contains(e[0],c.target)||(e.trigger(c=a.Event("hide.bs.dropdown",f)),c.isDefaultPrevented()||(d.attr("aria-expanded","false"),e.removeClass("open").trigger(a.Event("hidden.bs.dropdown",f)))))}))}function d(b){return this.each(function(){var c=a(this),d=c.data("bs.dropdown");d||c.data("bs.dropdown",d=new g(this)),"string"==typeof b&&d[b].call(c)})}var e=".dropdown-backdrop",f='[data-toggle="dropdown"]',g=function(b){a(b).on("click.bs.dropdown",this.toggle)};g.VERSION="3.3.7",g.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=b(e),g=f.hasClass("open");if(c(),!g){"ontouchstart"in document.documentElement&&!f.closest(".navbar-nav").length&&a(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(a(this)).on("click",c);var h={relatedTarget:this};if(f.trigger(d=a.Event("show.bs.dropdown",h)),d.isDefaultPrevented())return;e.trigger("focus").attr("aria-expanded","true"),f.toggleClass("open").trigger(a.Event("shown.bs.dropdown",h))}return!1}},g.prototype.keydown=function(c){if(/(38|40|27|32)/.test(c.which)&&!/input|textarea/i.test(c.target.tagName)){var d=a(this);if(c.preventDefault(),c.stopPropagation(),!d.is(".disabled, :disabled")){var e=b(d),g=e.hasClass("open");if(!g&&27!=c.which||g&&27==c.which)return 27==c.which&&e.find(f).trigger("focus"),d.trigger("click");var h=" li:not(.disabled):visible a",i=e.find(".dropdown-menu"+h);if(i.length){var j=i.index(c.target);38==c.which&&j>0&&j--,40==c.which&&j<i.length-1&&j++,~j||(j=0),i.eq(j).trigger("focus")}}}};var h=a.fn.dropdown;a.fn.dropdown=d,a.fn.dropdown.Constructor=g,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=h,this},a(document).on("click.bs.dropdown.data-api",c).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",f,g.prototype.toggle).on("keydown.bs.dropdown.data-api",f,g.prototype.keydown).on("keydown.bs.dropdown.data-api",".dropdown-menu",g.prototype.keydown)}(jQuery),+function(a){"use strict";function b(b,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},c.DEFAULTS,e.data(),"object"==typeof b&&b);f||e.data("bs.modal",f=new c(this,g)),"string"==typeof b?f[b](d):g.show&&f.show(d)})}var c=function(b,c){this.options=c,this.$body=a(document.body),this.$element=a(b),this.$dialog=this.$element.find(".modal-dialog"),this.$backdrop=null,this.isShown=null,this.originalBodyPad=null,this.scrollbarWidth=0,this.ignoreBackdropClick=!1,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};c.VERSION="3.3.7",c.TRANSITION_DURATION=300,c.BACKDROP_TRANSITION_DURATION=150,c.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},c.prototype.toggle=function(a){return this.isShown?this.hide():this.show(a)},c.prototype.show=function(b){var d=this,e=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(e),this.isShown||e.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.$dialog.on("mousedown.dismiss.bs.modal",function(){d.$element.one("mouseup.dismiss.bs.modal",function(b){a(b.target).is(d.$element)&&(d.ignoreBackdropClick=!0)})}),this.backdrop(function(){var e=a.support.transition&&d.$element.hasClass("fade");d.$element.parent().length||d.$element.appendTo(d.$body),d.$element.show().scrollTop(0),d.adjustDialog(),e&&d.$element[0].offsetWidth,d.$element.addClass("in"),d.enforceFocus();var f=a.Event("shown.bs.modal",{relatedTarget:b});e?d.$dialog.one("bsTransitionEnd",function(){d.$element.trigger("focus").trigger(f)}).emulateTransitionEnd(c.TRANSITION_DURATION):d.$element.trigger("focus").trigger(f)}))},c.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),this.$dialog.off("mousedown.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",a.proxy(this.hideModal,this)).emulateTransitionEnd(c.TRANSITION_DURATION):this.hideModal())},c.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){document===a.target||this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.trigger("focus")},this))},c.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},c.prototype.resize=function(){this.isShown?a(window).on("resize.bs.modal",a.proxy(this.handleUpdate,this)):a(window).off("resize.bs.modal")},c.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.$body.removeClass("modal-open"),a.resetAdjustments(),a.resetScrollbar(),a.$element.trigger("hidden.bs.modal")})},c.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},c.prototype.backdrop=function(b){var d=this,e=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var f=a.support.transition&&e;if(this.$backdrop=a(document.createElement("div")).addClass("modal-backdrop "+e).appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",a.proxy(function(a){return this.ignoreBackdropClick?void(this.ignoreBackdropClick=!1):void(a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus():this.hide()))},this)),f&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;f?this.$backdrop.one("bsTransitionEnd",b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):b()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var g=function(){d.removeBackdrop(),b&&b()};a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):g()}else b&&b()},c.prototype.handleUpdate=function(){this.adjustDialog()},c.prototype.adjustDialog=function(){var a=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&a?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!a?this.scrollbarWidth:""})},c.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},c.prototype.checkScrollbar=function(){var a=window.innerWidth;if(!a){var b=document.documentElement.getBoundingClientRect();a=b.right-Math.abs(b.left)}this.bodyIsOverflowing=document.body.clientWidth<a,this.scrollbarWidth=this.measureScrollbar()},c.prototype.setScrollbar=function(){var a=parseInt(this.$body.css("padding-right")||0,10);this.originalBodyPad=document.body.style.paddingRight||"",this.bodyIsOverflowing&&this.$body.css("padding-right",a+this.scrollbarWidth)},c.prototype.resetScrollbar=function(){this.$body.css("padding-right",this.originalBodyPad)},c.prototype.measureScrollbar=function(){var a=document.createElement("div");a.className="modal-scrollbar-measure",this.$body.append(a);var b=a.offsetWidth-a.clientWidth;return this.$body[0].removeChild(a),b};var d=a.fn.modal;a.fn.modal=b,a.fn.modal.Constructor=c,a.fn.modal.noConflict=function(){return a.fn.modal=d,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(c){var d=a(this),e=d.attr("href"),f=a(d.attr("data-target")||e&&e.replace(/.*(?=#[^\s]+$)/,"")),g=f.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(e)&&e},f.data(),d.data());d.is("a")&&c.preventDefault(),f.one("show.bs.modal",function(a){a.isDefaultPrevented()||f.one("hidden.bs.modal",function(){d.is(":visible")&&d.trigger("focus")})}),b.call(f,g,this)})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof b&&b;!e&&/destroy|hide/.test(b)||(e||d.data("bs.tooltip",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.type=null,this.options=null,this.enabled=null,this.timeout=null,this.hoverState=null,this.$element=null,this.inState=null,this.init("tooltip",a,b)};c.VERSION="3.3.7",c.TRANSITION_DURATION=150,c.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},c.prototype.init=function(b,c,d){if(this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.$viewport=this.options.viewport&&a(a.isFunction(this.options.viewport)?this.options.viewport.call(this,this.$element):this.options.viewport.selector||this.options.viewport),this.inState={click:!1,hover:!1,focus:!1},this.$element[0]instanceof document.constructor&&!this.options.selector)throw new Error("`selector` option must be specified when initializing "+this.type+" on the window.document object!");for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focusin",i="hover"==g?"mouseleave":"focusout";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},c.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},c.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),b instanceof a.Event&&(c.inState["focusin"==b.type?"focus":"hover"]=!0),c.tip().hasClass("in")||"in"==c.hoverState?void(c.hoverState="in"):(clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?void(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show)):c.show())},c.prototype.isInStateTrue=function(){for(var a in this.inState)if(this.inState[a])return!0;return!1},c.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);if(c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),b instanceof a.Event&&(c.inState["focusout"==b.type?"focus":"hover"]=!1),!c.isInStateTrue())return clearTimeout(c.timeout),c.hoverState="out",c.options.delay&&c.options.delay.hide?void(c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide)):c.hide()},c.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(b);var d=a.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(b.isDefaultPrevented()||!d)return;var e=this,f=this.tip(),g=this.getUID(this.type);this.setContent(),f.attr("id",g),this.$element.attr("aria-describedby",g),this.options.animation&&f.addClass("fade");var h="function"==typeof this.options.placement?this.options.placement.call(this,f[0],this.$element[0]):this.options.placement,i=/\s?auto?\s?/i,j=i.test(h);j&&(h=h.replace(i,"")||"top"),f.detach().css({top:0,left:0,display:"block"}).addClass(h).data("bs."+this.type,this),this.options.container?f.appendTo(this.options.container):f.insertAfter(this.$element),this.$element.trigger("inserted.bs."+this.type);var k=this.getPosition(),l=f[0].offsetWidth,m=f[0].offsetHeight;if(j){var n=h,o=this.getPosition(this.$viewport);h="bottom"==h&&k.bottom+m>o.bottom?"top":"top"==h&&k.top-m<o.top?"bottom":"right"==h&&k.right+l>o.width?"left":"left"==h&&k.left-l<o.left?"right":h,f.removeClass(n).addClass(h)}var p=this.getCalculatedOffset(h,k,l,m);this.applyPlacement(p,h);var q=function(){var a=e.hoverState;e.$element.trigger("shown.bs."+e.type),e.hoverState=null,"out"==a&&e.leave(e)};a.support.transition&&this.$tip.hasClass("fade")?f.one("bsTransitionEnd",q).emulateTransitionEnd(c.TRANSITION_DURATION):q()}},c.prototype.applyPlacement=function(b,c){var d=this.tip(),e=d[0].offsetWidth,f=d[0].offsetHeight,g=parseInt(d.css("margin-top"),10),h=parseInt(d.css("margin-left"),10);isNaN(g)&&(g=0),isNaN(h)&&(h=0),b.top+=g,b.left+=h,a.offset.setOffset(d[0],a.extend({using:function(a){d.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0),d.addClass("in");var i=d[0].offsetWidth,j=d[0].offsetHeight;"top"==c&&j!=f&&(b.top=b.top+f-j);var k=this.getViewportAdjustedDelta(c,b,i,j);k.left?b.left+=k.left:b.top+=k.top;var l=/top|bottom/.test(c),m=l?2*k.left-e+i:2*k.top-f+j,n=l?"offsetWidth":"offsetHeight";d.offset(b),this.replaceArrow(m,d[0][n],l)},c.prototype.replaceArrow=function(a,b,c){this.arrow().css(c?"left":"top",50*(1-a/b)+"%").css(c?"top":"left","")},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},c.prototype.hide=function(b){function d(){"in"!=e.hoverState&&f.detach(),e.$element&&e.$element.removeAttr("aria-describedby").trigger("hidden.bs."+e.type),b&&b()}var e=this,f=a(this.$tip),g=a.Event("hide.bs."+this.type);if(this.$element.trigger(g),!g.isDefaultPrevented())return f.removeClass("in"),a.support.transition&&f.hasClass("fade")?f.one("bsTransitionEnd",d).emulateTransitionEnd(c.TRANSITION_DURATION):d(),this.hoverState=null,this},c.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},c.prototype.hasContent=function(){return this.getTitle()},c.prototype.getPosition=function(b){b=b||this.$element;var c=b[0],d="BODY"==c.tagName,e=c.getBoundingClientRect();null==e.width&&(e=a.extend({},e,{width:e.right-e.left,height:e.bottom-e.top}));var f=window.SVGElement&&c instanceof window.SVGElement,g=d?{top:0,left:0}:f?null:b.offset(),h={scroll:d?document.documentElement.scrollTop||document.body.scrollTop:b.scrollTop()},i=d?{width:a(window).width(),height:a(window).height()}:null;return a.extend({},e,h,i,g)},c.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},c.prototype.getViewportAdjustedDelta=function(a,b,c,d){var e={top:0,left:0};if(!this.$viewport)return e;var f=this.options.viewport&&this.options.viewport.padding||0,g=this.getPosition(this.$viewport);if(/right|left/.test(a)){var h=b.top-f-g.scroll,i=b.top+f-g.scroll+d;h<g.top?e.top=g.top-h:i>g.top+g.height&&(e.top=g.top+g.height-i)}else{var j=b.left-f,k=b.left+f+c;j<g.left?e.left=g.left-j:k>g.right&&(e.left=g.left+g.width-k)}return e},c.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},c.prototype.getUID=function(a){do a+=~~(1e6*Math.random());while(document.getElementById(a));return a},c.prototype.tip=function(){if(!this.$tip&&(this.$tip=a(this.options.template),1!=this.$tip.length))throw new Error(this.type+" `template` option must consist of exactly 1 top-level element!");return this.$tip},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},c.prototype.enable=function(){this.enabled=!0},c.prototype.disable=function(){this.enabled=!1},c.prototype.toggleEnabled=function(){this.enabled=!this.enabled},c.prototype.toggle=function(b){var c=this;b&&(c=a(b.currentTarget).data("bs."+this.type),c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c))),b?(c.inState.click=!c.inState.click,c.isInStateTrue()?c.enter(c):c.leave(c)):c.tip().hasClass("in")?c.leave(c):c.enter(c)},c.prototype.destroy=function(){var a=this;clearTimeout(this.timeout),this.hide(function(){a.$element.off("."+a.type).removeData("bs."+a.type),a.$tip&&a.$tip.detach(),a.$tip=null,a.$arrow=null,a.$viewport=null,a.$element=null})};var d=a.fn.tooltip;a.fn.tooltip=b,a.fn.tooltip.Constructor=c,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=d,this}}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==typeof b&&b;!e&&/destroy|hide/.test(b)||(e||d.data("bs.popover",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");c.VERSION="3.3.7",c.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),c.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),c.prototype.constructor=c,c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content").children().detach().end()[this.options.html?"string"==typeof c?"html":"append":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},c.prototype.hasContent=function(){return this.getTitle()||this.getContent()},c.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")};var d=a.fn.popover;a.fn.popover=b,a.fn.popover.Constructor=c,a.fn.popover.noConflict=function(){return a.fn.popover=d,this}}(jQuery),+function(a){"use strict";function b(c,d){this.$body=a(document.body),this.$scrollElement=a(a(c).is(document.body)?window:c),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",a.proxy(this.process,this)),this.refresh(),this.process()}function c(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})}b.VERSION="3.3.7",b.DEFAULTS={offset:10},b.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},b.prototype.refresh=function(){var b=this,c="offset",d=0;this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight(),a.isWindow(this.$scrollElement[0])||(c="position",d=this.$scrollElement.scrollTop()),this.$body.find(this.selector).map(function(){var b=a(this),e=b.data("target")||b.attr("href"),f=/^#./.test(e)&&a(e);return f&&f.length&&f.is(":visible")&&[[f[c]().top+d,e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){b.offsets.push(this[0]),b.targets.push(this[1])})},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.getScrollHeight(),d=this.options.offset+c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(this.scrollHeight!=c&&this.refresh(),b>=d)return g!=(a=f[f.length-1])&&this.activate(a);if(g&&b<e[0])return this.activeTarget=null,this.clear();for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(void 0===e[a+1]||b<e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){
this.activeTarget=b,this.clear();var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),d.trigger("activate.bs.scrollspy")},b.prototype.clear=function(){a(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};var d=a.fn.scrollspy;a.fn.scrollspy=c,a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=d,this},a(window).on("load.bs.scrollspy.data-api",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);c.call(b,b.data())})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new c(this)),"string"==typeof b&&e[b]()})}var c=function(b){this.element=a(b)};c.VERSION="3.3.7",c.TRANSITION_DURATION=150,c.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.data("target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){var e=c.find(".active:last a"),f=a.Event("hide.bs.tab",{relatedTarget:b[0]}),g=a.Event("show.bs.tab",{relatedTarget:e[0]});if(e.trigger(f),b.trigger(g),!g.isDefaultPrevented()&&!f.isDefaultPrevented()){var h=a(d);this.activate(b.closest("li"),c),this.activate(h,h.parent(),function(){e.trigger({type:"hidden.bs.tab",relatedTarget:b[0]}),b.trigger({type:"shown.bs.tab",relatedTarget:e[0]})})}}},c.prototype.activate=function(b,d,e){function f(){g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),h?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu").length&&b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),e&&e()}var g=d.find("> .active"),h=e&&a.support.transition&&(g.length&&g.hasClass("fade")||!!d.find("> .fade").length);g.length&&h?g.one("bsTransitionEnd",f).emulateTransitionEnd(c.TRANSITION_DURATION):f(),g.removeClass("in")};var d=a.fn.tab;a.fn.tab=b,a.fn.tab.Constructor=c,a.fn.tab.noConflict=function(){return a.fn.tab=d,this};var e=function(c){c.preventDefault(),b.call(a(this),"show")};a(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',e).on("click.bs.tab.data-api",'[data-toggle="pill"]',e)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==typeof b&&b;e||d.data("bs.affix",e=new c(this,f)),"string"==typeof b&&e[b]()})}var c=function(b,d){this.options=a.extend({},c.DEFAULTS,d),this.$target=a(this.options.target).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(b),this.affixed=null,this.unpin=null,this.pinnedOffset=null,this.checkPosition()};c.VERSION="3.3.7",c.RESET="affix affix-top affix-bottom",c.DEFAULTS={offset:0,target:window},c.prototype.getState=function(a,b,c,d){var e=this.$target.scrollTop(),f=this.$element.offset(),g=this.$target.height();if(null!=c&&"top"==this.affixed)return e<c&&"top";if("bottom"==this.affixed)return null!=c?!(e+this.unpin<=f.top)&&"bottom":!(e+g<=a-d)&&"bottom";var h=null==this.affixed,i=h?e:f.top,j=h?g:b;return null!=c&&e<=c?"top":null!=d&&i+j>=a-d&&"bottom"},c.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(c.RESET).addClass("affix");var a=this.$target.scrollTop(),b=this.$element.offset();return this.pinnedOffset=b.top-a},c.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},c.prototype.checkPosition=function(){if(this.$element.is(":visible")){var b=this.$element.height(),d=this.options.offset,e=d.top,f=d.bottom,g=Math.max(a(document).height(),a(document.body).height());"object"!=typeof d&&(f=e=d),"function"==typeof e&&(e=d.top(this.$element)),"function"==typeof f&&(f=d.bottom(this.$element));var h=this.getState(g,b,e,f);if(this.affixed!=h){null!=this.unpin&&this.$element.css("top","");var i="affix"+(h?"-"+h:""),j=a.Event(i+".bs.affix");if(this.$element.trigger(j),j.isDefaultPrevented())return;this.affixed=h,this.unpin="bottom"==h?this.getPinnedOffset():null,this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix","affixed")+".bs.affix")}"bottom"==h&&this.$element.offset({top:g-b-f})}};var d=a.fn.affix;a.fn.affix=b,a.fn.affix.Constructor=c,a.fn.affix.noConflict=function(){return a.fn.affix=d,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var c=a(this),d=c.data();d.offset=d.offset||{},null!=d.offsetBottom&&(d.offset.bottom=d.offsetBottom),null!=d.offsetTop&&(d.offset.top=d.offsetTop),b.call(c,d)})})}(jQuery);


/* ---- /1Mi3ThNGPyiuhiWCJPH2BAqeKCiBF5BVpR/bs-growl.min.js ---- */


/* Nick Larson, (http://github.com/ifightcrime) MIT License */ (function(){var c;c=jQuery;c.bootstrapGrowl=function(f,a){var b,e,d;a=c.extend({},c.bootstrapGrowl.default_options,a);b=c("<div>");b.attr("class","bootstrap-growl alert");a.type&&b.addClass("alert-"+a.type);a.allow_dismiss&&(b.addClass("alert-dismissible"),b.append('<button class="close" data-dismiss="alert" type="button"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>'));b.append(f);a.top_offset&&(a.offset={from:"top",amount:a.top_offset});d=a.offset.amount;c(".bootstrap-growl").each(function(){return d= Math.max(d,parseInt(c(this).css(a.offset.from))+c(this).outerHeight()+a.stackup_spacing)});e={position:"body"===a.ele?"fixed":"absolute",margin:0,"z-index":"9999",display:"none"};e[a.offset.from]=d+"px";b.css(e);"auto"!==a.width&&b.css("width",a.width+"px");c(a.ele).append(b);switch(a.align){case "center":b.css({left:"50%","margin-left":"-"+b.outerWidth()/2+"px"});break;case "left":b.css("left","20px");break;default:b.css("right","20px")}b.fadeIn();0<a.delay&&b.delay(a.delay).fadeOut(function(){return c(this).alert("close")}); return b};c.bootstrapGrowl.default_options={ele:"body",type:"info",offset:{from:"top",amount:20},align:"right",width:250,delay:4E3,allow_dismiss:!0,stackup_spacing:10}}).call(this);


/* ---- /1Mi3ThNGPyiuhiWCJPH2BAqeKCiBF5BVpR/clipboard.min.js ---- */


/*!
 * clipboard.js v1.5.12
 * https://zenorocha.github.io/clipboard.js
 *
 * Licensed MIT © Zeno Rocha
 */
!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,e.Clipboard=t()}}(function(){var t,e,n;return function t(e,n,o){function i(a,c){if(!n[a]){if(!e[a]){var s="function"==typeof require&&require;if(!c&&s)return s(a,!0);if(r)return r(a,!0);var l=new Error("Cannot find module '"+a+"'");throw l.code="MODULE_NOT_FOUND",l}var u=n[a]={exports:{}};e[a][0].call(u.exports,function(t){var n=e[a][1][t];return i(n?n:t)},u,u.exports,t,e,n,o)}return n[a].exports}for(var r="function"==typeof require&&require,a=0;a<o.length;a++)i(o[a]);return i}({1:[function(t,e,n){var o=t("matches-selector");e.exports=function(t,e,n){for(var i=n?t:t.parentNode;i&&i!==document;){if(o(i,e))return i;i=i.parentNode}}},{"matches-selector":5}],2:[function(t,e,n){function o(t,e,n,o,r){var a=i.apply(this,arguments);return t.addEventListener(n,a,r),{destroy:function(){t.removeEventListener(n,a,r)}}}function i(t,e,n,o){return function(n){n.delegateTarget=r(n.target,e,!0),n.delegateTarget&&o.call(t,n)}}var r=t("closest");e.exports=o},{closest:1}],3:[function(t,e,n){n.node=function(t){return void 0!==t&&t instanceof HTMLElement&&1===t.nodeType},n.nodeList=function(t){var e=Object.prototype.toString.call(t);return void 0!==t&&("[object NodeList]"===e||"[object HTMLCollection]"===e)&&"length"in t&&(0===t.length||n.node(t[0]))},n.string=function(t){return"string"==typeof t||t instanceof String},n.fn=function(t){var e=Object.prototype.toString.call(t);return"[object Function]"===e}},{}],4:[function(t,e,n){function o(t,e,n){if(!t&&!e&&!n)throw new Error("Missing required arguments");if(!c.string(e))throw new TypeError("Second argument must be a String");if(!c.fn(n))throw new TypeError("Third argument must be a Function");if(c.node(t))return i(t,e,n);if(c.nodeList(t))return r(t,e,n);if(c.string(t))return a(t,e,n);throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList")}function i(t,e,n){return t.addEventListener(e,n),{destroy:function(){t.removeEventListener(e,n)}}}function r(t,e,n){return Array.prototype.forEach.call(t,function(t){t.addEventListener(e,n)}),{destroy:function(){Array.prototype.forEach.call(t,function(t){t.removeEventListener(e,n)})}}}function a(t,e,n){return s(document.body,t,e,n)}var c=t("./is"),s=t("delegate");e.exports=o},{"./is":3,delegate:2}],5:[function(t,e,n){function o(t,e){if(r)return r.call(t,e);for(var n=t.parentNode.querySelectorAll(e),o=0;o<n.length;++o)if(n[o]==t)return!0;return!1}var i=Element.prototype,r=i.matchesSelector||i.webkitMatchesSelector||i.mozMatchesSelector||i.msMatchesSelector||i.oMatchesSelector;e.exports=o},{}],6:[function(t,e,n){function o(t){var e;if("INPUT"===t.nodeName||"TEXTAREA"===t.nodeName)t.focus(),t.setSelectionRange(0,t.value.length),e=t.value;else{t.hasAttribute("contenteditable")&&t.focus();var n=window.getSelection(),o=document.createRange();o.selectNodeContents(t),n.removeAllRanges(),n.addRange(o),e=n.toString()}return e}e.exports=o},{}],7:[function(t,e,n){function o(){}o.prototype={on:function(t,e,n){var o=this.e||(this.e={});return(o[t]||(o[t]=[])).push({fn:e,ctx:n}),this},once:function(t,e,n){function o(){i.off(t,o),e.apply(n,arguments)}var i=this;return o._=e,this.on(t,o,n)},emit:function(t){var e=[].slice.call(arguments,1),n=((this.e||(this.e={}))[t]||[]).slice(),o=0,i=n.length;for(o;i>o;o++)n[o].fn.apply(n[o].ctx,e);return this},off:function(t,e){var n=this.e||(this.e={}),o=n[t],i=[];if(o&&e)for(var r=0,a=o.length;a>r;r++)o[r].fn!==e&&o[r].fn._!==e&&i.push(o[r]);return i.length?n[t]=i:delete n[t],this}},e.exports=o},{}],8:[function(e,n,o){!function(i,r){if("function"==typeof t&&t.amd)t(["module","select"],r);else if("undefined"!=typeof o)r(n,e("select"));else{var a={exports:{}};r(a,i.select),i.clipboardAction=a.exports}}(this,function(t,e){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var i=n(e),r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t},a=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),c=function(){function t(e){o(this,t),this.resolveOptions(e),this.initSelection()}return t.prototype.resolveOptions=function t(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];this.action=e.action,this.emitter=e.emitter,this.target=e.target,this.text=e.text,this.trigger=e.trigger,this.selectedText=""},t.prototype.initSelection=function t(){this.text?this.selectFake():this.target&&this.selectTarget()},t.prototype.selectFake=function t(){var e=this,n="rtl"==document.documentElement.getAttribute("dir");this.removeFake(),this.fakeHandlerCallback=function(){return e.removeFake()},this.fakeHandler=document.body.addEventListener("click",this.fakeHandlerCallback)||!0,this.fakeElem=document.createElement("textarea"),this.fakeElem.style.fontSize="12pt",this.fakeElem.style.border="0",this.fakeElem.style.padding="0",this.fakeElem.style.margin="0",this.fakeElem.style.position="absolute",this.fakeElem.style[n?"right":"left"]="-9999px",this.fakeElem.style.top=(window.pageYOffset||document.documentElement.scrollTop)+"px",this.fakeElem.setAttribute("readonly",""),this.fakeElem.value=this.text,document.body.appendChild(this.fakeElem),this.selectedText=(0,i.default)(this.fakeElem),this.copyText()},t.prototype.removeFake=function t(){this.fakeHandler&&(document.body.removeEventListener("click",this.fakeHandlerCallback),this.fakeHandler=null,this.fakeHandlerCallback=null),this.fakeElem&&(document.body.removeChild(this.fakeElem),this.fakeElem=null)},t.prototype.selectTarget=function t(){this.selectedText=(0,i.default)(this.target),this.copyText()},t.prototype.copyText=function t(){var e=void 0;try{e=document.execCommand(this.action)}catch(n){e=!1}this.handleResult(e)},t.prototype.handleResult=function t(e){e?this.emitter.emit("success",{action:this.action,text:this.selectedText,trigger:this.trigger,clearSelection:this.clearSelection.bind(this)}):this.emitter.emit("error",{action:this.action,trigger:this.trigger,clearSelection:this.clearSelection.bind(this)})},t.prototype.clearSelection=function t(){this.target&&this.target.blur(),window.getSelection().removeAllRanges()},t.prototype.destroy=function t(){this.removeFake()},a(t,[{key:"action",set:function t(){var e=arguments.length<=0||void 0===arguments[0]?"copy":arguments[0];if(this._action=e,"copy"!==this._action&&"cut"!==this._action)throw new Error('Invalid "action" value, use either "copy" or "cut"')},get:function t(){return this._action}},{key:"target",set:function t(e){if(void 0!==e){if(!e||"object"!==("undefined"==typeof e?"undefined":r(e))||1!==e.nodeType)throw new Error('Invalid "target" value, use a valid Element');if("copy"===this.action&&e.hasAttribute("disabled"))throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');if("cut"===this.action&&(e.hasAttribute("readonly")||e.hasAttribute("disabled")))throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');this._target=e}},get:function t(){return this._target}}]),t}();t.exports=c})},{select:6}],9:[function(e,n,o){!function(i,r){if("function"==typeof t&&t.amd)t(["module","./clipboard-action","tiny-emitter","good-listener"],r);else if("undefined"!=typeof o)r(n,e("./clipboard-action"),e("tiny-emitter"),e("good-listener"));else{var a={exports:{}};r(a,i.clipboardAction,i.tinyEmitter,i.goodListener),i.clipboard=a.exports}}(this,function(t,e,n,o){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function c(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function s(t,e){var n="data-clipboard-"+t;if(e.hasAttribute(n))return e.getAttribute(n)}var l=i(e),u=i(n),f=i(o),d=function(t){function e(n,o){r(this,e);var i=a(this,t.call(this));return i.resolveOptions(o),i.listenClick(n),i}return c(e,t),e.prototype.resolveOptions=function t(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];this.action="function"==typeof e.action?e.action:this.defaultAction,this.target="function"==typeof e.target?e.target:this.defaultTarget,this.text="function"==typeof e.text?e.text:this.defaultText},e.prototype.listenClick=function t(e){var n=this;this.listener=(0,f.default)(e,"click",function(t){return n.onClick(t)})},e.prototype.onClick=function t(e){var n=e.delegateTarget||e.currentTarget;this.clipboardAction&&(this.clipboardAction=null),this.clipboardAction=new l.default({action:this.action(n),target:this.target(n),text:this.text(n),trigger:n,emitter:this})},e.prototype.defaultAction=function t(e){return s("action",e)},e.prototype.defaultTarget=function t(e){var n=s("target",e);return n?document.querySelector(n):void 0},e.prototype.defaultText=function t(e){return s("text",e)},e.prototype.destroy=function t(){this.listener.destroy(),this.clipboardAction&&(this.clipboardAction.destroy(),this.clipboardAction=null)},e}(u.default);t.exports=d})},{"./clipboard-action":8,"good-listener":4,"tiny-emitter":7}]},{},[9])(9)});


/* ---- /1Mi3ThNGPyiuhiWCJPH2BAqeKCiBF5BVpR/crypto-js.js ---- */


/*
MIT License

Copyright (c) 2009-2013 Jeff Mott  
Copyright (c) 2013-2016 Evan Vosberg
*/
;(function (root, factory) {
	if (typeof exports === "object") {
		// CommonJS
		module.exports = exports = factory();
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define([], factory);
	}
	else {
		// Global (browser)
		root.CryptoJS = factory();
	}
}(this, function () {

	/**
	 * CryptoJS core components.
	 */
	var CryptoJS = CryptoJS || (function (Math, undefined) {
	    /**
	     * CryptoJS namespace.
	     */
	    var C = {};

	    /**
	     * Library namespace.
	     */
	    var C_lib = C.lib = {};

	    /**
	     * Base object for prototypal inheritance.
	     */
	    var Base = C_lib.Base = (function () {
	        function F() {}

	        return {
	            /**
	             * Creates a new object that inherits from this object.
	             *
	             * @param {Object} overrides Properties to copy into the new object.
	             *
	             * @return {Object} The new object.
	             *
	             * @static
	             *
	             * @example
	             *
	             *     var MyType = CryptoJS.lib.Base.extend({
	             *         field: 'value',
	             *
	             *         method: function () {
	             *         }
	             *     });
	             */
	            extend: function (overrides) {
	                // Spawn
	                F.prototype = this;
	                var subtype = new F();

	                // Augment
	                if (overrides) {
	                    subtype.mixIn(overrides);
	                }

	                // Create default initializer
	                if (!subtype.hasOwnProperty('init')) {
	                    subtype.init = function () {
	                        subtype.$super.init.apply(this, arguments);
	                    };
	                }

	                // Initializer's prototype is the subtype object
	                subtype.init.prototype = subtype;

	                // Reference supertype
	                subtype.$super = this;

	                return subtype;
	            },

	            /**
	             * Extends this object and runs the init method.
	             * Arguments to create() will be passed to init().
	             *
	             * @return {Object} The new object.
	             *
	             * @static
	             *
	             * @example
	             *
	             *     var instance = MyType.create();
	             */
	            create: function () {
	                var instance = this.extend();
	                instance.init.apply(instance, arguments);

	                return instance;
	            },

	            /**
	             * Initializes a newly created object.
	             * Override this method to add some logic when your objects are created.
	             *
	             * @example
	             *
	             *     var MyType = CryptoJS.lib.Base.extend({
	             *         init: function () {
	             *             // ...
	             *         }
	             *     });
	             */
	            init: function () {
	            },

	            /**
	             * Copies properties into this object.
	             *
	             * @param {Object} properties The properties to mix in.
	             *
	             * @example
	             *
	             *     MyType.mixIn({
	             *         field: 'value'
	             *     });
	             */
	            mixIn: function (properties) {
	                for (var propertyName in properties) {
	                    if (properties.hasOwnProperty(propertyName)) {
	                        this[propertyName] = properties[propertyName];
	                    }
	                }

	                // IE won't copy toString using the loop above
	                if (properties.hasOwnProperty('toString')) {
	                    this.toString = properties.toString;
	                }
	            },

	            /**
	             * Creates a copy of this object.
	             *
	             * @return {Object} The clone.
	             *
	             * @example
	             *
	             *     var clone = instance.clone();
	             */
	            clone: function () {
	                return this.init.prototype.extend(this);
	            }
	        };
	    }());

	    /**
	     * An array of 32-bit words.
	     *
	     * @property {Array} words The array of 32-bit words.
	     * @property {number} sigBytes The number of significant bytes in this word array.
	     */
	    var WordArray = C_lib.WordArray = Base.extend({
	        /**
	         * Initializes a newly created word array.
	         *
	         * @param {Array} words (Optional) An array of 32-bit words.
	         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.lib.WordArray.create();
	         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
	         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
	         */
	        init: function (words, sigBytes) {
	            words = this.words = words || [];

	            if (sigBytes != undefined) {
	                this.sigBytes = sigBytes;
	            } else {
	                this.sigBytes = words.length * 4;
	            }
	        },

	        /**
	         * Converts this word array to a string.
	         *
	         * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
	         *
	         * @return {string} The stringified word array.
	         *
	         * @example
	         *
	         *     var string = wordArray + '';
	         *     var string = wordArray.toString();
	         *     var string = wordArray.toString(CryptoJS.enc.Utf8);
	         */
	        toString: function (encoder) {
	            return (encoder || Hex).stringify(this);
	        },

	        /**
	         * Concatenates a word array to this word array.
	         *
	         * @param {WordArray} wordArray The word array to append.
	         *
	         * @return {WordArray} This word array.
	         *
	         * @example
	         *
	         *     wordArray1.concat(wordArray2);
	         */
	        concat: function (wordArray) {
	            // Shortcuts
	            var thisWords = this.words;
	            var thatWords = wordArray.words;
	            var thisSigBytes = this.sigBytes;
	            var thatSigBytes = wordArray.sigBytes;

	            // Clamp excess bits
	            this.clamp();

	            // Concat
	            if (thisSigBytes % 4) {
	                // Copy one byte at a time
	                for (var i = 0; i < thatSigBytes; i++) {
	                    var thatByte = (thatWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                    thisWords[(thisSigBytes + i) >>> 2] |= thatByte << (24 - ((thisSigBytes + i) % 4) * 8);
	                }
	            } else {
	                // Copy one word at a time
	                for (var i = 0; i < thatSigBytes; i += 4) {
	                    thisWords[(thisSigBytes + i) >>> 2] = thatWords[i >>> 2];
	                }
	            }
	            this.sigBytes += thatSigBytes;

	            // Chainable
	            return this;
	        },

	        /**
	         * Removes insignificant bits.
	         *
	         * @example
	         *
	         *     wordArray.clamp();
	         */
	        clamp: function () {
	            // Shortcuts
	            var words = this.words;
	            var sigBytes = this.sigBytes;

	            // Clamp
	            words[sigBytes >>> 2] &= 0xffffffff << (32 - (sigBytes % 4) * 8);
	            words.length = Math.ceil(sigBytes / 4);
	        },

	        /**
	         * Creates a copy of this word array.
	         *
	         * @return {WordArray} The clone.
	         *
	         * @example
	         *
	         *     var clone = wordArray.clone();
	         */
	        clone: function () {
	            var clone = Base.clone.call(this);
	            clone.words = this.words.slice(0);

	            return clone;
	        },

	        /**
	         * Creates a word array filled with random bytes.
	         *
	         * @param {number} nBytes The number of random bytes to generate.
	         *
	         * @return {WordArray} The random word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.lib.WordArray.random(16);
	         */
	        random: function (nBytes) {
	            var words = [];

	            var r = (function (m_w) {
	                var m_w = m_w;
	                var m_z = 0x3ade68b1;
	                var mask = 0xffffffff;

	                return function () {
	                    m_z = (0x9069 * (m_z & 0xFFFF) + (m_z >> 0x10)) & mask;
	                    m_w = (0x4650 * (m_w & 0xFFFF) + (m_w >> 0x10)) & mask;
	                    var result = ((m_z << 0x10) + m_w) & mask;
	                    result /= 0x100000000;
	                    result += 0.5;
	                    return result * (Math.random() > .5 ? 1 : -1);
	                }
	            });

	            for (var i = 0, rcache; i < nBytes; i += 4) {
	                var _r = r((rcache || Math.random()) * 0x100000000);

	                rcache = _r() * 0x3ade67b7;
	                words.push((_r() * 0x100000000) | 0);
	            }

	            return new WordArray.init(words, nBytes);
	        }
	    });

	    /**
	     * Encoder namespace.
	     */
	    var C_enc = C.enc = {};

	    /**
	     * Hex encoding strategy.
	     */
	    var Hex = C_enc.Hex = {
	        /**
	         * Converts a word array to a hex string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The hex string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;

	            // Convert
	            var hexChars = [];
	            for (var i = 0; i < sigBytes; i++) {
	                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                hexChars.push((bite >>> 4).toString(16));
	                hexChars.push((bite & 0x0f).toString(16));
	            }

	            return hexChars.join('');
	        },

	        /**
	         * Converts a hex string to a word array.
	         *
	         * @param {string} hexStr The hex string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
	         */
	        parse: function (hexStr) {
	            // Shortcut
	            var hexStrLength = hexStr.length;

	            // Convert
	            var words = [];
	            for (var i = 0; i < hexStrLength; i += 2) {
	                words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);
	            }

	            return new WordArray.init(words, hexStrLength / 2);
	        }
	    };

	    /**
	     * Latin1 encoding strategy.
	     */
	    var Latin1 = C_enc.Latin1 = {
	        /**
	         * Converts a word array to a Latin1 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The Latin1 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;

	            // Convert
	            var latin1Chars = [];
	            for (var i = 0; i < sigBytes; i++) {
	                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                latin1Chars.push(String.fromCharCode(bite));
	            }

	            return latin1Chars.join('');
	        },

	        /**
	         * Converts a Latin1 string to a word array.
	         *
	         * @param {string} latin1Str The Latin1 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
	         */
	        parse: function (latin1Str) {
	            // Shortcut
	            var latin1StrLength = latin1Str.length;

	            // Convert
	            var words = [];
	            for (var i = 0; i < latin1StrLength; i++) {
	                words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
	            }

	            return new WordArray.init(words, latin1StrLength);
	        }
	    };

	    /**
	     * UTF-8 encoding strategy.
	     */
	    var Utf8 = C_enc.Utf8 = {
	        /**
	         * Converts a word array to a UTF-8 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The UTF-8 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            try {
	                return decodeURIComponent(escape(Latin1.stringify(wordArray)));
	            } catch (e) {
	                throw new Error('Malformed UTF-8 data');
	            }
	        },

	        /**
	         * Converts a UTF-8 string to a word array.
	         *
	         * @param {string} utf8Str The UTF-8 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
	         */
	        parse: function (utf8Str) {
	            return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
	        }
	    };

	    /**
	     * Abstract buffered block algorithm template.
	     *
	     * The property blockSize must be implemented in a concrete subtype.
	     *
	     * @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0
	     */
	    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
	        /**
	         * Resets this block algorithm's data buffer to its initial state.
	         *
	         * @example
	         *
	         *     bufferedBlockAlgorithm.reset();
	         */
	        reset: function () {
	            // Initial values
	            this._data = new WordArray.init();
	            this._nDataBytes = 0;
	        },

	        /**
	         * Adds new data to this block algorithm's buffer.
	         *
	         * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
	         *
	         * @example
	         *
	         *     bufferedBlockAlgorithm._append('data');
	         *     bufferedBlockAlgorithm._append(wordArray);
	         */
	        _append: function (data) {
	            // Convert string to WordArray, else assume WordArray already
	            if (typeof data == 'string') {
	                data = Utf8.parse(data);
	            }

	            // Append
	            this._data.concat(data);
	            this._nDataBytes += data.sigBytes;
	        },

	        /**
	         * Processes available data blocks.
	         *
	         * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
	         *
	         * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
	         *
	         * @return {WordArray} The processed data.
	         *
	         * @example
	         *
	         *     var processedData = bufferedBlockAlgorithm._process();
	         *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
	         */
	        _process: function (doFlush) {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;
	            var dataSigBytes = data.sigBytes;
	            var blockSize = this.blockSize;
	            var blockSizeBytes = blockSize * 4;

	            // Count blocks ready
	            var nBlocksReady = dataSigBytes / blockSizeBytes;
	            if (doFlush) {
	                // Round up to include partial blocks
	                nBlocksReady = Math.ceil(nBlocksReady);
	            } else {
	                // Round down to include only full blocks,
	                // less the number of blocks that must remain in the buffer
	                nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
	            }

	            // Count words ready
	            var nWordsReady = nBlocksReady * blockSize;

	            // Count bytes ready
	            var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);

	            // Process blocks
	            if (nWordsReady) {
	                for (var offset = 0; offset < nWordsReady; offset += blockSize) {
	                    // Perform concrete-algorithm logic
	                    this._doProcessBlock(dataWords, offset);
	                }

	                // Remove processed words
	                var processedWords = dataWords.splice(0, nWordsReady);
	                data.sigBytes -= nBytesReady;
	            }

	            // Return processed words
	            return new WordArray.init(processedWords, nBytesReady);
	        },

	        /**
	         * Creates a copy of this object.
	         *
	         * @return {Object} The clone.
	         *
	         * @example
	         *
	         *     var clone = bufferedBlockAlgorithm.clone();
	         */
	        clone: function () {
	            var clone = Base.clone.call(this);
	            clone._data = this._data.clone();

	            return clone;
	        },

	        _minBufferSize: 0
	    });

	    /**
	     * Abstract hasher template.
	     *
	     * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
	     */
	    var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
	        /**
	         * Configuration options.
	         */
	        cfg: Base.extend(),

	        /**
	         * Initializes a newly created hasher.
	         *
	         * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
	         *
	         * @example
	         *
	         *     var hasher = CryptoJS.algo.SHA256.create();
	         */
	        init: function (cfg) {
	            // Apply config defaults
	            this.cfg = this.cfg.extend(cfg);

	            // Set initial values
	            this.reset();
	        },

	        /**
	         * Resets this hasher to its initial state.
	         *
	         * @example
	         *
	         *     hasher.reset();
	         */
	        reset: function () {
	            // Reset data buffer
	            BufferedBlockAlgorithm.reset.call(this);

	            // Perform concrete-hasher logic
	            this._doReset();
	        },

	        /**
	         * Updates this hasher with a message.
	         *
	         * @param {WordArray|string} messageUpdate The message to append.
	         *
	         * @return {Hasher} This hasher.
	         *
	         * @example
	         *
	         *     hasher.update('message');
	         *     hasher.update(wordArray);
	         */
	        update: function (messageUpdate) {
	            // Append
	            this._append(messageUpdate);

	            // Update the hash
	            this._process();

	            // Chainable
	            return this;
	        },

	        /**
	         * Finalizes the hash computation.
	         * Note that the finalize operation is effectively a destructive, read-once operation.
	         *
	         * @param {WordArray|string} messageUpdate (Optional) A final message update.
	         *
	         * @return {WordArray} The hash.
	         *
	         * @example
	         *
	         *     var hash = hasher.finalize();
	         *     var hash = hasher.finalize('message');
	         *     var hash = hasher.finalize(wordArray);
	         */
	        finalize: function (messageUpdate) {
	            // Final message update
	            if (messageUpdate) {
	                this._append(messageUpdate);
	            }

	            // Perform concrete-hasher logic
	            var hash = this._doFinalize();

	            return hash;
	        },

	        blockSize: 512/32,

	        /**
	         * Creates a shortcut function to a hasher's object interface.
	         *
	         * @param {Hasher} hasher The hasher to create a helper for.
	         *
	         * @return {Function} The shortcut function.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
	         */
	        _createHelper: function (hasher) {
	            return function (message, cfg) {
	                return new hasher.init(cfg).finalize(message);
	            };
	        },

	        /**
	         * Creates a shortcut function to the HMAC's object interface.
	         *
	         * @param {Hasher} hasher The hasher to use in this HMAC helper.
	         *
	         * @return {Function} The shortcut function.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
	         */
	        _createHmacHelper: function (hasher) {
	            return function (message, key) {
	                return new C_algo.HMAC.init(hasher, key).finalize(message);
	            };
	        }
	    });

	    /**
	     * Algorithm namespace.
	     */
	    var C_algo = C.algo = {};

	    return C;
	}(Math));


	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var C_enc = C.enc;

	    /**
	     * Base64 encoding strategy.
	     */
	    var Base64 = C_enc.Base64 = {
	        /**
	         * Converts a word array to a Base64 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The Base64 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var base64String = CryptoJS.enc.Base64.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;
	            var map = this._map;

	            // Clamp excess bits
	            wordArray.clamp();

	            // Convert
	            var base64Chars = [];
	            for (var i = 0; i < sigBytes; i += 3) {
	                var byte1 = (words[i >>> 2]       >>> (24 - (i % 4) * 8))       & 0xff;
	                var byte2 = (words[(i + 1) >>> 2] >>> (24 - ((i + 1) % 4) * 8)) & 0xff;
	                var byte3 = (words[(i + 2) >>> 2] >>> (24 - ((i + 2) % 4) * 8)) & 0xff;

	                var triplet = (byte1 << 16) | (byte2 << 8) | byte3;

	                for (var j = 0; (j < 4) && (i + j * 0.75 < sigBytes); j++) {
	                    base64Chars.push(map.charAt((triplet >>> (6 * (3 - j))) & 0x3f));
	                }
	            }

	            // Add padding
	            var paddingChar = map.charAt(64);
	            if (paddingChar) {
	                while (base64Chars.length % 4) {
	                    base64Chars.push(paddingChar);
	                }
	            }

	            return base64Chars.join('');
	        },

	        /**
	         * Converts a Base64 string to a word array.
	         *
	         * @param {string} base64Str The Base64 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Base64.parse(base64String);
	         */
	        parse: function (base64Str) {
	            // Shortcuts
	            var base64StrLength = base64Str.length;
	            var map = this._map;

	            // Ignore padding
	            var paddingChar = map.charAt(64);
	            if (paddingChar) {
	                var paddingIndex = base64Str.indexOf(paddingChar);
	                if (paddingIndex != -1) {
	                    base64StrLength = paddingIndex;
	                }
	            }

	            // Convert
	            var words = [];
	            var nBytes = 0;
	            for (var i = 0; i < base64StrLength; i++) {
	                if (i % 4) {
	                    var bits1 = map.indexOf(base64Str.charAt(i - 1)) << ((i % 4) * 2);
	                    var bits2 = map.indexOf(base64Str.charAt(i)) >>> (6 - (i % 4) * 2);
	                    var bitsCombined = bits1 | bits2;
	                    words[nBytes >>> 2] |= (bitsCombined) << (24 - (nBytes % 4) * 8);
	                    nBytes++;
	                }
	            }

	            return WordArray.create(words, nBytes);
	        },

	        _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
	    };
	}());


	(function (Math) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var Hasher = C_lib.Hasher;
	    var C_algo = C.algo;

	    // Constants table
	    var T = [];

	    // Compute constants
	    (function () {
	        for (var i = 0; i < 64; i++) {
	            T[i] = (Math.abs(Math.sin(i + 1)) * 0x100000000) | 0;
	        }
	    }());

	    /**
	     * MD5 hash algorithm.
	     */
	    var MD5 = C_algo.MD5 = Hasher.extend({
	        _doReset: function () {
	            this._hash = new WordArray.init([
	                0x67452301, 0xefcdab89,
	                0x98badcfe, 0x10325476
	            ]);
	        },

	        _doProcessBlock: function (M, offset) {
	            // Swap endian
	            for (var i = 0; i < 16; i++) {
	                // Shortcuts
	                var offset_i = offset + i;
	                var M_offset_i = M[offset_i];

	                M[offset_i] = (
	                    (((M_offset_i << 8)  | (M_offset_i >>> 24)) & 0x00ff00ff) |
	                    (((M_offset_i << 24) | (M_offset_i >>> 8))  & 0xff00ff00)
	                );
	            }

	            // Shortcuts
	            var H = this._hash.words;

	            var M_offset_0  = M[offset + 0];
	            var M_offset_1  = M[offset + 1];
	            var M_offset_2  = M[offset + 2];
	            var M_offset_3  = M[offset + 3];
	            var M_offset_4  = M[offset + 4];
	            var M_offset_5  = M[offset + 5];
	            var M_offset_6  = M[offset + 6];
	            var M_offset_7  = M[offset + 7];
	            var M_offset_8  = M[offset + 8];
	            var M_offset_9  = M[offset + 9];
	            var M_offset_10 = M[offset + 10];
	            var M_offset_11 = M[offset + 11];
	            var M_offset_12 = M[offset + 12];
	            var M_offset_13 = M[offset + 13];
	            var M_offset_14 = M[offset + 14];
	            var M_offset_15 = M[offset + 15];

	            // Working varialbes
	            var a = H[0];
	            var b = H[1];
	            var c = H[2];
	            var d = H[3];

	            // Computation
	            a = FF(a, b, c, d, M_offset_0,  7,  T[0]);
	            d = FF(d, a, b, c, M_offset_1,  12, T[1]);
	            c = FF(c, d, a, b, M_offset_2,  17, T[2]);
	            b = FF(b, c, d, a, M_offset_3,  22, T[3]);
	            a = FF(a, b, c, d, M_offset_4,  7,  T[4]);
	            d = FF(d, a, b, c, M_offset_5,  12, T[5]);
	            c = FF(c, d, a, b, M_offset_6,  17, T[6]);
	            b = FF(b, c, d, a, M_offset_7,  22, T[7]);
	            a = FF(a, b, c, d, M_offset_8,  7,  T[8]);
	            d = FF(d, a, b, c, M_offset_9,  12, T[9]);
	            c = FF(c, d, a, b, M_offset_10, 17, T[10]);
	            b = FF(b, c, d, a, M_offset_11, 22, T[11]);
	            a = FF(a, b, c, d, M_offset_12, 7,  T[12]);
	            d = FF(d, a, b, c, M_offset_13, 12, T[13]);
	            c = FF(c, d, a, b, M_offset_14, 17, T[14]);
	            b = FF(b, c, d, a, M_offset_15, 22, T[15]);

	            a = GG(a, b, c, d, M_offset_1,  5,  T[16]);
	            d = GG(d, a, b, c, M_offset_6,  9,  T[17]);
	            c = GG(c, d, a, b, M_offset_11, 14, T[18]);
	            b = GG(b, c, d, a, M_offset_0,  20, T[19]);
	            a = GG(a, b, c, d, M_offset_5,  5,  T[20]);
	            d = GG(d, a, b, c, M_offset_10, 9,  T[21]);
	            c = GG(c, d, a, b, M_offset_15, 14, T[22]);
	            b = GG(b, c, d, a, M_offset_4,  20, T[23]);
	            a = GG(a, b, c, d, M_offset_9,  5,  T[24]);
	            d = GG(d, a, b, c, M_offset_14, 9,  T[25]);
	            c = GG(c, d, a, b, M_offset_3,  14, T[26]);
	            b = GG(b, c, d, a, M_offset_8,  20, T[27]);
	            a = GG(a, b, c, d, M_offset_13, 5,  T[28]);
	            d = GG(d, a, b, c, M_offset_2,  9,  T[29]);
	            c = GG(c, d, a, b, M_offset_7,  14, T[30]);
	            b = GG(b, c, d, a, M_offset_12, 20, T[31]);

	            a = HH(a, b, c, d, M_offset_5,  4,  T[32]);
	            d = HH(d, a, b, c, M_offset_8,  11, T[33]);
	            c = HH(c, d, a, b, M_offset_11, 16, T[34]);
	            b = HH(b, c, d, a, M_offset_14, 23, T[35]);
	            a = HH(a, b, c, d, M_offset_1,  4,  T[36]);
	            d = HH(d, a, b, c, M_offset_4,  11, T[37]);
	            c = HH(c, d, a, b, M_offset_7,  16, T[38]);
	            b = HH(b, c, d, a, M_offset_10, 23, T[39]);
	            a = HH(a, b, c, d, M_offset_13, 4,  T[40]);
	            d = HH(d, a, b, c, M_offset_0,  11, T[41]);
	            c = HH(c, d, a, b, M_offset_3,  16, T[42]);
	            b = HH(b, c, d, a, M_offset_6,  23, T[43]);
	            a = HH(a, b, c, d, M_offset_9,  4,  T[44]);
	            d = HH(d, a, b, c, M_offset_12, 11, T[45]);
	            c = HH(c, d, a, b, M_offset_15, 16, T[46]);
	            b = HH(b, c, d, a, M_offset_2,  23, T[47]);

	            a = II(a, b, c, d, M_offset_0,  6,  T[48]);
	            d = II(d, a, b, c, M_offset_7,  10, T[49]);
	            c = II(c, d, a, b, M_offset_14, 15, T[50]);
	            b = II(b, c, d, a, M_offset_5,  21, T[51]);
	            a = II(a, b, c, d, M_offset_12, 6,  T[52]);
	            d = II(d, a, b, c, M_offset_3,  10, T[53]);
	            c = II(c, d, a, b, M_offset_10, 15, T[54]);
	            b = II(b, c, d, a, M_offset_1,  21, T[55]);
	            a = II(a, b, c, d, M_offset_8,  6,  T[56]);
	            d = II(d, a, b, c, M_offset_15, 10, T[57]);
	            c = II(c, d, a, b, M_offset_6,  15, T[58]);
	            b = II(b, c, d, a, M_offset_13, 21, T[59]);
	            a = II(a, b, c, d, M_offset_4,  6,  T[60]);
	            d = II(d, a, b, c, M_offset_11, 10, T[61]);
	            c = II(c, d, a, b, M_offset_2,  15, T[62]);
	            b = II(b, c, d, a, M_offset_9,  21, T[63]);

	            // Intermediate hash value
	            H[0] = (H[0] + a) | 0;
	            H[1] = (H[1] + b) | 0;
	            H[2] = (H[2] + c) | 0;
	            H[3] = (H[3] + d) | 0;
	        },

	        _doFinalize: function () {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;

	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;

	            // Add padding
	            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);

	            var nBitsTotalH = Math.floor(nBitsTotal / 0x100000000);
	            var nBitsTotalL = nBitsTotal;
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = (
	                (((nBitsTotalH << 8)  | (nBitsTotalH >>> 24)) & 0x00ff00ff) |
	                (((nBitsTotalH << 24) | (nBitsTotalH >>> 8))  & 0xff00ff00)
	            );
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = (
	                (((nBitsTotalL << 8)  | (nBitsTotalL >>> 24)) & 0x00ff00ff) |
	                (((nBitsTotalL << 24) | (nBitsTotalL >>> 8))  & 0xff00ff00)
	            );

	            data.sigBytes = (dataWords.length + 1) * 4;

	            // Hash final blocks
	            this._process();

	            // Shortcuts
	            var hash = this._hash;
	            var H = hash.words;

	            // Swap endian
	            for (var i = 0; i < 4; i++) {
	                // Shortcut
	                var H_i = H[i];

	                H[i] = (((H_i << 8)  | (H_i >>> 24)) & 0x00ff00ff) |
	                       (((H_i << 24) | (H_i >>> 8))  & 0xff00ff00);
	            }

	            // Return final computed hash
	            return hash;
	        },

	        clone: function () {
	            var clone = Hasher.clone.call(this);
	            clone._hash = this._hash.clone();

	            return clone;
	        }
	    });

	    function FF(a, b, c, d, x, s, t) {
	        var n = a + ((b & c) | (~b & d)) + x + t;
	        return ((n << s) | (n >>> (32 - s))) + b;
	    }

	    function GG(a, b, c, d, x, s, t) {
	        var n = a + ((b & d) | (c & ~d)) + x + t;
	        return ((n << s) | (n >>> (32 - s))) + b;
	    }

	    function HH(a, b, c, d, x, s, t) {
	        var n = a + (b ^ c ^ d) + x + t;
	        return ((n << s) | (n >>> (32 - s))) + b;
	    }

	    function II(a, b, c, d, x, s, t) {
	        var n = a + (c ^ (b | ~d)) + x + t;
	        return ((n << s) | (n >>> (32 - s))) + b;
	    }

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.MD5('message');
	     *     var hash = CryptoJS.MD5(wordArray);
	     */
	    C.MD5 = Hasher._createHelper(MD5);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacMD5(message, key);
	     */
	    C.HmacMD5 = Hasher._createHmacHelper(MD5);
	}(Math));


	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var Hasher = C_lib.Hasher;
	    var C_algo = C.algo;

	    // Reusable object
	    var W = [];

	    /**
	     * SHA-1 hash algorithm.
	     */
	    var SHA1 = C_algo.SHA1 = Hasher.extend({
	        _doReset: function () {
	            this._hash = new WordArray.init([
	                0x67452301, 0xefcdab89,
	                0x98badcfe, 0x10325476,
	                0xc3d2e1f0
	            ]);
	        },

	        _doProcessBlock: function (M, offset) {
	            // Shortcut
	            var H = this._hash.words;

	            // Working variables
	            var a = H[0];
	            var b = H[1];
	            var c = H[2];
	            var d = H[3];
	            var e = H[4];

	            // Computation
	            for (var i = 0; i < 80; i++) {
	                if (i < 16) {
	                    W[i] = M[offset + i] | 0;
	                } else {
	                    var n = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
	                    W[i] = (n << 1) | (n >>> 31);
	                }

	                var t = ((a << 5) | (a >>> 27)) + e + W[i];
	                if (i < 20) {
	                    t += ((b & c) | (~b & d)) + 0x5a827999;
	                } else if (i < 40) {
	                    t += (b ^ c ^ d) + 0x6ed9eba1;
	                } else if (i < 60) {
	                    t += ((b & c) | (b & d) | (c & d)) - 0x70e44324;
	                } else /* if (i < 80) */ {
	                    t += (b ^ c ^ d) - 0x359d3e2a;
	                }

	                e = d;
	                d = c;
	                c = (b << 30) | (b >>> 2);
	                b = a;
	                a = t;
	            }

	            // Intermediate hash value
	            H[0] = (H[0] + a) | 0;
	            H[1] = (H[1] + b) | 0;
	            H[2] = (H[2] + c) | 0;
	            H[3] = (H[3] + d) | 0;
	            H[4] = (H[4] + e) | 0;
	        },

	        _doFinalize: function () {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;

	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;

	            // Add padding
	            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
	            data.sigBytes = dataWords.length * 4;

	            // Hash final blocks
	            this._process();

	            // Return final computed hash
	            return this._hash;
	        },

	        clone: function () {
	            var clone = Hasher.clone.call(this);
	            clone._hash = this._hash.clone();

	            return clone;
	        }
	    });

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.SHA1('message');
	     *     var hash = CryptoJS.SHA1(wordArray);
	     */
	    C.SHA1 = Hasher._createHelper(SHA1);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacSHA1(message, key);
	     */
	    C.HmacSHA1 = Hasher._createHmacHelper(SHA1);
	}());


	(function (Math) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var Hasher = C_lib.Hasher;
	    var C_algo = C.algo;

	    // Initialization and round constants tables
	    var H = [];
	    var K = [];

	    // Compute constants
	    (function () {
	        function isPrime(n) {
	            var sqrtN = Math.sqrt(n);
	            for (var factor = 2; factor <= sqrtN; factor++) {
	                if (!(n % factor)) {
	                    return false;
	                }
	            }

	            return true;
	        }

	        function getFractionalBits(n) {
	            return ((n - (n | 0)) * 0x100000000) | 0;
	        }

	        var n = 2;
	        var nPrime = 0;
	        while (nPrime < 64) {
	            if (isPrime(n)) {
	                if (nPrime < 8) {
	                    H[nPrime] = getFractionalBits(Math.pow(n, 1 / 2));
	                }
	                K[nPrime] = getFractionalBits(Math.pow(n, 1 / 3));

	                nPrime++;
	            }

	            n++;
	        }
	    }());

	    // Reusable object
	    var W = [];

	    /**
	     * SHA-256 hash algorithm.
	     */
	    var SHA256 = C_algo.SHA256 = Hasher.extend({
	        _doReset: function () {
	            this._hash = new WordArray.init(H.slice(0));
	        },

	        _doProcessBlock: function (M, offset) {
	            // Shortcut
	            var H = this._hash.words;

	            // Working variables
	            var a = H[0];
	            var b = H[1];
	            var c = H[2];
	            var d = H[3];
	            var e = H[4];
	            var f = H[5];
	            var g = H[6];
	            var h = H[7];

	            // Computation
	            for (var i = 0; i < 64; i++) {
	                if (i < 16) {
	                    W[i] = M[offset + i] | 0;
	                } else {
	                    var gamma0x = W[i - 15];
	                    var gamma0  = ((gamma0x << 25) | (gamma0x >>> 7))  ^
	                                  ((gamma0x << 14) | (gamma0x >>> 18)) ^
	                                   (gamma0x >>> 3);

	                    var gamma1x = W[i - 2];
	                    var gamma1  = ((gamma1x << 15) | (gamma1x >>> 17)) ^
	                                  ((gamma1x << 13) | (gamma1x >>> 19)) ^
	                                   (gamma1x >>> 10);

	                    W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
	                }

	                var ch  = (e & f) ^ (~e & g);
	                var maj = (a & b) ^ (a & c) ^ (b & c);

	                var sigma0 = ((a << 30) | (a >>> 2)) ^ ((a << 19) | (a >>> 13)) ^ ((a << 10) | (a >>> 22));
	                var sigma1 = ((e << 26) | (e >>> 6)) ^ ((e << 21) | (e >>> 11)) ^ ((e << 7)  | (e >>> 25));

	                var t1 = h + sigma1 + ch + K[i] + W[i];
	                var t2 = sigma0 + maj;

	                h = g;
	                g = f;
	                f = e;
	                e = (d + t1) | 0;
	                d = c;
	                c = b;
	                b = a;
	                a = (t1 + t2) | 0;
	            }

	            // Intermediate hash value
	            H[0] = (H[0] + a) | 0;
	            H[1] = (H[1] + b) | 0;
	            H[2] = (H[2] + c) | 0;
	            H[3] = (H[3] + d) | 0;
	            H[4] = (H[4] + e) | 0;
	            H[5] = (H[5] + f) | 0;
	            H[6] = (H[6] + g) | 0;
	            H[7] = (H[7] + h) | 0;
	        },

	        _doFinalize: function () {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;

	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;

	            // Add padding
	            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
	            data.sigBytes = dataWords.length * 4;

	            // Hash final blocks
	            this._process();

	            // Return final computed hash
	            return this._hash;
	        },

	        clone: function () {
	            var clone = Hasher.clone.call(this);
	            clone._hash = this._hash.clone();

	            return clone;
	        }
	    });

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.SHA256('message');
	     *     var hash = CryptoJS.SHA256(wordArray);
	     */
	    C.SHA256 = Hasher._createHelper(SHA256);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacSHA256(message, key);
	     */
	    C.HmacSHA256 = Hasher._createHmacHelper(SHA256);
	}(Math));


	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var C_enc = C.enc;

	    /**
	     * UTF-16 BE encoding strategy.
	     */
	    var Utf16BE = C_enc.Utf16 = C_enc.Utf16BE = {
	        /**
	         * Converts a word array to a UTF-16 BE string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The UTF-16 BE string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var utf16String = CryptoJS.enc.Utf16.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;

	            // Convert
	            var utf16Chars = [];
	            for (var i = 0; i < sigBytes; i += 2) {
	                var codePoint = (words[i >>> 2] >>> (16 - (i % 4) * 8)) & 0xffff;
	                utf16Chars.push(String.fromCharCode(codePoint));
	            }

	            return utf16Chars.join('');
	        },

	        /**
	         * Converts a UTF-16 BE string to a word array.
	         *
	         * @param {string} utf16Str The UTF-16 BE string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Utf16.parse(utf16String);
	         */
	        parse: function (utf16Str) {
	            // Shortcut
	            var utf16StrLength = utf16Str.length;

	            // Convert
	            var words = [];
	            for (var i = 0; i < utf16StrLength; i++) {
	                words[i >>> 1] |= utf16Str.charCodeAt(i) << (16 - (i % 2) * 16);
	            }

	            return WordArray.create(words, utf16StrLength * 2);
	        }
	    };

	    /**
	     * UTF-16 LE encoding strategy.
	     */
	    C_enc.Utf16LE = {
	        /**
	         * Converts a word array to a UTF-16 LE string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The UTF-16 LE string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var utf16Str = CryptoJS.enc.Utf16LE.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;

	            // Convert
	            var utf16Chars = [];
	            for (var i = 0; i < sigBytes; i += 2) {
	                var codePoint = swapEndian((words[i >>> 2] >>> (16 - (i % 4) * 8)) & 0xffff);
	                utf16Chars.push(String.fromCharCode(codePoint));
	            }

	            return utf16Chars.join('');
	        },

	        /**
	         * Converts a UTF-16 LE string to a word array.
	         *
	         * @param {string} utf16Str The UTF-16 LE string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Utf16LE.parse(utf16Str);
	         */
	        parse: function (utf16Str) {
	            // Shortcut
	            var utf16StrLength = utf16Str.length;

	            // Convert
	            var words = [];
	            for (var i = 0; i < utf16StrLength; i++) {
	                words[i >>> 1] |= swapEndian(utf16Str.charCodeAt(i) << (16 - (i % 2) * 16));
	            }

	            return WordArray.create(words, utf16StrLength * 2);
	        }
	    };

	    function swapEndian(word) {
	        return ((word << 8) & 0xff00ff00) | ((word >>> 8) & 0x00ff00ff);
	    }
	}());


	(function () {
	    // Check if typed arrays are supported
	    if (typeof ArrayBuffer != 'function') {
	        return;
	    }

	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;

	    // Reference original init
	    var superInit = WordArray.init;

	    // Augment WordArray.init to handle typed arrays
	    var subInit = WordArray.init = function (typedArray) {
	        // Convert buffers to uint8
	        if (typedArray instanceof ArrayBuffer) {
	            typedArray = new Uint8Array(typedArray);
	        }

	        // Convert other array views to uint8
	        if (
	            typedArray instanceof Int8Array ||
	            (typeof Uint8ClampedArray !== "undefined" && typedArray instanceof Uint8ClampedArray) ||
	            typedArray instanceof Int16Array ||
	            typedArray instanceof Uint16Array ||
	            typedArray instanceof Int32Array ||
	            typedArray instanceof Uint32Array ||
	            typedArray instanceof Float32Array ||
	            typedArray instanceof Float64Array
	        ) {
	            typedArray = new Uint8Array(typedArray.buffer, typedArray.byteOffset, typedArray.byteLength);
	        }

	        // Handle Uint8Array
	        if (typedArray instanceof Uint8Array) {
	            // Shortcut
	            var typedArrayByteLength = typedArray.byteLength;

	            // Extract bytes
	            var words = [];
	            for (var i = 0; i < typedArrayByteLength; i++) {
	                words[i >>> 2] |= typedArray[i] << (24 - (i % 4) * 8);
	            }

	            // Initialize this word array
	            superInit.call(this, words, typedArrayByteLength);
	        } else {
	            // Else call normal init
	            superInit.apply(this, arguments);
	        }
	    };

	    subInit.prototype = WordArray;
	}());


	/** @preserve
	(c) 2012 by Cédric Mesnil. All rights reserved.

	Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

	    - Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
	    - Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	*/

	(function (Math) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var Hasher = C_lib.Hasher;
	    var C_algo = C.algo;

	    // Constants table
	    var _zl = WordArray.create([
	        0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14, 15,
	        7,  4, 13,  1, 10,  6, 15,  3, 12,  0,  9,  5,  2, 14, 11,  8,
	        3, 10, 14,  4,  9, 15,  8,  1,  2,  7,  0,  6, 13, 11,  5, 12,
	        1,  9, 11, 10,  0,  8, 12,  4, 13,  3,  7, 15, 14,  5,  6,  2,
	        4,  0,  5,  9,  7, 12,  2, 10, 14,  1,  3,  8, 11,  6, 15, 13]);
	    var _zr = WordArray.create([
	        5, 14,  7,  0,  9,  2, 11,  4, 13,  6, 15,  8,  1, 10,  3, 12,
	        6, 11,  3,  7,  0, 13,  5, 10, 14, 15,  8, 12,  4,  9,  1,  2,
	        15,  5,  1,  3,  7, 14,  6,  9, 11,  8, 12,  2, 10,  0,  4, 13,
	        8,  6,  4,  1,  3, 11, 15,  0,  5, 12,  2, 13,  9,  7, 10, 14,
	        12, 15, 10,  4,  1,  5,  8,  7,  6,  2, 13, 14,  0,  3,  9, 11]);
	    var _sl = WordArray.create([
	         11, 14, 15, 12,  5,  8,  7,  9, 11, 13, 14, 15,  6,  7,  9,  8,
	        7, 6,   8, 13, 11,  9,  7, 15,  7, 12, 15,  9, 11,  7, 13, 12,
	        11, 13,  6,  7, 14,  9, 13, 15, 14,  8, 13,  6,  5, 12,  7,  5,
	          11, 12, 14, 15, 14, 15,  9,  8,  9, 14,  5,  6,  8,  6,  5, 12,
	        9, 15,  5, 11,  6,  8, 13, 12,  5, 12, 13, 14, 11,  8,  5,  6 ]);
	    var _sr = WordArray.create([
	        8,  9,  9, 11, 13, 15, 15,  5,  7,  7,  8, 11, 14, 14, 12,  6,
	        9, 13, 15,  7, 12,  8,  9, 11,  7,  7, 12,  7,  6, 15, 13, 11,
	        9,  7, 15, 11,  8,  6,  6, 14, 12, 13,  5, 14, 13, 13,  7,  5,
	        15,  5,  8, 11, 14, 14,  6, 14,  6,  9, 12,  9, 12,  5, 15,  8,
	        8,  5, 12,  9, 12,  5, 14,  6,  8, 13,  6,  5, 15, 13, 11, 11 ]);

	    var _hl =  WordArray.create([ 0x00000000, 0x5A827999, 0x6ED9EBA1, 0x8F1BBCDC, 0xA953FD4E]);
	    var _hr =  WordArray.create([ 0x50A28BE6, 0x5C4DD124, 0x6D703EF3, 0x7A6D76E9, 0x00000000]);

	    /**
	     * RIPEMD160 hash algorithm.
	     */
	    var RIPEMD160 = C_algo.RIPEMD160 = Hasher.extend({
	        _doReset: function () {
	            this._hash  = WordArray.create([0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0]);
	        },

	        _doProcessBlock: function (M, offset) {

	            // Swap endian
	            for (var i = 0; i < 16; i++) {
	                // Shortcuts
	                var offset_i = offset + i;
	                var M_offset_i = M[offset_i];

	                // Swap
	                M[offset_i] = (
	                    (((M_offset_i << 8)  | (M_offset_i >>> 24)) & 0x00ff00ff) |
	                    (((M_offset_i << 24) | (M_offset_i >>> 8))  & 0xff00ff00)
	                );
	            }
	            // Shortcut
	            var H  = this._hash.words;
	            var hl = _hl.words;
	            var hr = _hr.words;
	            var zl = _zl.words;
	            var zr = _zr.words;
	            var sl = _sl.words;
	            var sr = _sr.words;

	            // Working variables
	            var al, bl, cl, dl, el;
	            var ar, br, cr, dr, er;

	            ar = al = H[0];
	            br = bl = H[1];
	            cr = cl = H[2];
	            dr = dl = H[3];
	            er = el = H[4];
	            // Computation
	            var t;
	            for (var i = 0; i < 80; i += 1) {
	                t = (al +  M[offset+zl[i]])|0;
	                if (i<16){
		            t +=  f1(bl,cl,dl) + hl[0];
	                } else if (i<32) {
		            t +=  f2(bl,cl,dl) + hl[1];
	                } else if (i<48) {
		            t +=  f3(bl,cl,dl) + hl[2];
	                } else if (i<64) {
		            t +=  f4(bl,cl,dl) + hl[3];
	                } else {// if (i<80) {
		            t +=  f5(bl,cl,dl) + hl[4];
	                }
	                t = t|0;
	                t =  rotl(t,sl[i]);
	                t = (t+el)|0;
	                al = el;
	                el = dl;
	                dl = rotl(cl, 10);
	                cl = bl;
	                bl = t;

	                t = (ar + M[offset+zr[i]])|0;
	                if (i<16){
		            t +=  f5(br,cr,dr) + hr[0];
	                } else if (i<32) {
		            t +=  f4(br,cr,dr) + hr[1];
	                } else if (i<48) {
		            t +=  f3(br,cr,dr) + hr[2];
	                } else if (i<64) {
		            t +=  f2(br,cr,dr) + hr[3];
	                } else {// if (i<80) {
		            t +=  f1(br,cr,dr) + hr[4];
	                }
	                t = t|0;
	                t =  rotl(t,sr[i]) ;
	                t = (t+er)|0;
	                ar = er;
	                er = dr;
	                dr = rotl(cr, 10);
	                cr = br;
	                br = t;
	            }
	            // Intermediate hash value
	            t    = (H[1] + cl + dr)|0;
	            H[1] = (H[2] + dl + er)|0;
	            H[2] = (H[3] + el + ar)|0;
	            H[3] = (H[4] + al + br)|0;
	            H[4] = (H[0] + bl + cr)|0;
	            H[0] =  t;
	        },

	        _doFinalize: function () {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;

	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;

	            // Add padding
	            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = (
	                (((nBitsTotal << 8)  | (nBitsTotal >>> 24)) & 0x00ff00ff) |
	                (((nBitsTotal << 24) | (nBitsTotal >>> 8))  & 0xff00ff00)
	            );
	            data.sigBytes = (dataWords.length + 1) * 4;

	            // Hash final blocks
	            this._process();

	            // Shortcuts
	            var hash = this._hash;
	            var H = hash.words;

	            // Swap endian
	            for (var i = 0; i < 5; i++) {
	                // Shortcut
	                var H_i = H[i];

	                // Swap
	                H[i] = (((H_i << 8)  | (H_i >>> 24)) & 0x00ff00ff) |
	                       (((H_i << 24) | (H_i >>> 8))  & 0xff00ff00);
	            }

	            // Return final computed hash
	            return hash;
	        },

	        clone: function () {
	            var clone = Hasher.clone.call(this);
	            clone._hash = this._hash.clone();

	            return clone;
	        }
	    });


	    function f1(x, y, z) {
	        return ((x) ^ (y) ^ (z));

	    }

	    function f2(x, y, z) {
	        return (((x)&(y)) | ((~x)&(z)));
	    }

	    function f3(x, y, z) {
	        return (((x) | (~(y))) ^ (z));
	    }

	    function f4(x, y, z) {
	        return (((x) & (z)) | ((y)&(~(z))));
	    }

	    function f5(x, y, z) {
	        return ((x) ^ ((y) |(~(z))));

	    }

	    function rotl(x,n) {
	        return (x<<n) | (x>>>(32-n));
	    }


	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.RIPEMD160('message');
	     *     var hash = CryptoJS.RIPEMD160(wordArray);
	     */
	    C.RIPEMD160 = Hasher._createHelper(RIPEMD160);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacRIPEMD160(message, key);
	     */
	    C.HmacRIPEMD160 = Hasher._createHmacHelper(RIPEMD160);
	}(Math));


	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var Base = C_lib.Base;
	    var C_enc = C.enc;
	    var Utf8 = C_enc.Utf8;
	    var C_algo = C.algo;

	    /**
	     * HMAC algorithm.
	     */
	    var HMAC = C_algo.HMAC = Base.extend({
	        /**
	         * Initializes a newly created HMAC.
	         *
	         * @param {Hasher} hasher The hash algorithm to use.
	         * @param {WordArray|string} key The secret key.
	         *
	         * @example
	         *
	         *     var hmacHasher = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, key);
	         */
	        init: function (hasher, key) {
	            // Init hasher
	            hasher = this._hasher = new hasher.init();

	            // Convert string to WordArray, else assume WordArray already
	            if (typeof key == 'string') {
	                key = Utf8.parse(key);
	            }

	            // Shortcuts
	            var hasherBlockSize = hasher.blockSize;
	            var hasherBlockSizeBytes = hasherBlockSize * 4;

	            // Allow arbitrary length keys
	            if (key.sigBytes > hasherBlockSizeBytes) {
	                key = hasher.finalize(key);
	            }

	            // Clamp excess bits
	            key.clamp();

	            // Clone key for inner and outer pads
	            var oKey = this._oKey = key.clone();
	            var iKey = this._iKey = key.clone();

	            // Shortcuts
	            var oKeyWords = oKey.words;
	            var iKeyWords = iKey.words;

	            // XOR keys with pad constants
	            for (var i = 0; i < hasherBlockSize; i++) {
	                oKeyWords[i] ^= 0x5c5c5c5c;
	                iKeyWords[i] ^= 0x36363636;
	            }
	            oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;

	            // Set initial values
	            this.reset();
	        },

	        /**
	         * Resets this HMAC to its initial state.
	         *
	         * @example
	         *
	         *     hmacHasher.reset();
	         */
	        reset: function () {
	            // Shortcut
	            var hasher = this._hasher;

	            // Reset
	            hasher.reset();
	            hasher.update(this._iKey);
	        },

	        /**
	         * Updates this HMAC with a message.
	         *
	         * @param {WordArray|string} messageUpdate The message to append.
	         *
	         * @return {HMAC} This HMAC instance.
	         *
	         * @example
	         *
	         *     hmacHasher.update('message');
	         *     hmacHasher.update(wordArray);
	         */
	        update: function (messageUpdate) {
	            this._hasher.update(messageUpdate);

	            // Chainable
	            return this;
	        },

	        /**
	         * Finalizes the HMAC computation.
	         * Note that the finalize operation is effectively a destructive, read-once operation.
	         *
	         * @param {WordArray|string} messageUpdate (Optional) A final message update.
	         *
	         * @return {WordArray} The HMAC.
	         *
	         * @example
	         *
	         *     var hmac = hmacHasher.finalize();
	         *     var hmac = hmacHasher.finalize('message');
	         *     var hmac = hmacHasher.finalize(wordArray);
	         */
	        finalize: function (messageUpdate) {
	            // Shortcut
	            var hasher = this._hasher;

	            // Compute HMAC
	            var innerHash = hasher.finalize(messageUpdate);
	            hasher.reset();
	            var hmac = hasher.finalize(this._oKey.clone().concat(innerHash));

	            return hmac;
	        }
	    });
	}());


	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var Base = C_lib.Base;
	    var WordArray = C_lib.WordArray;
	    var C_algo = C.algo;
	    var SHA1 = C_algo.SHA1;
	    var HMAC = C_algo.HMAC;

	    /**
	     * Password-Based Key Derivation Function 2 algorithm.
	     */
	    var PBKDF2 = C_algo.PBKDF2 = Base.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
	         * @property {Hasher} hasher The hasher to use. Default: SHA1
	         * @property {number} iterations The number of iterations to perform. Default: 1
	         */
	        cfg: Base.extend({
	            keySize: 128/32,
	            hasher: SHA1,
	            iterations: 1
	        }),

	        /**
	         * Initializes a newly created key derivation function.
	         *
	         * @param {Object} cfg (Optional) The configuration options to use for the derivation.
	         *
	         * @example
	         *
	         *     var kdf = CryptoJS.algo.PBKDF2.create();
	         *     var kdf = CryptoJS.algo.PBKDF2.create({ keySize: 8 });
	         *     var kdf = CryptoJS.algo.PBKDF2.create({ keySize: 8, iterations: 1000 });
	         */
	        init: function (cfg) {
	            this.cfg = this.cfg.extend(cfg);
	        },

	        /**
	         * Computes the Password-Based Key Derivation Function 2.
	         *
	         * @param {WordArray|string} password The password.
	         * @param {WordArray|string} salt A salt.
	         *
	         * @return {WordArray} The derived key.
	         *
	         * @example
	         *
	         *     var key = kdf.compute(password, salt);
	         */
	        compute: function (password, salt) {
	            // Shortcut
	            var cfg = this.cfg;

	            // Init HMAC
	            var hmac = HMAC.create(cfg.hasher, password);

	            // Initial values
	            var derivedKey = WordArray.create();
	            var blockIndex = WordArray.create([0x00000001]);

	            // Shortcuts
	            var derivedKeyWords = derivedKey.words;
	            var blockIndexWords = blockIndex.words;
	            var keySize = cfg.keySize;
	            var iterations = cfg.iterations;

	            // Generate key
	            while (derivedKeyWords.length < keySize) {
	                var block = hmac.update(salt).finalize(blockIndex);
	                hmac.reset();

	                // Shortcuts
	                var blockWords = block.words;
	                var blockWordsLength = blockWords.length;

	                // Iterations
	                var intermediate = block;
	                for (var i = 1; i < iterations; i++) {
	                    intermediate = hmac.finalize(intermediate);
	                    hmac.reset();

	                    // Shortcut
	                    var intermediateWords = intermediate.words;

	                    // XOR intermediate with block
	                    for (var j = 0; j < blockWordsLength; j++) {
	                        blockWords[j] ^= intermediateWords[j];
	                    }
	                }

	                derivedKey.concat(block);
	                blockIndexWords[0]++;
	            }
	            derivedKey.sigBytes = keySize * 4;

	            return derivedKey;
	        }
	    });

	    /**
	     * Computes the Password-Based Key Derivation Function 2.
	     *
	     * @param {WordArray|string} password The password.
	     * @param {WordArray|string} salt A salt.
	     * @param {Object} cfg (Optional) The configuration options to use for this computation.
	     *
	     * @return {WordArray} The derived key.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var key = CryptoJS.PBKDF2(password, salt);
	     *     var key = CryptoJS.PBKDF2(password, salt, { keySize: 8 });
	     *     var key = CryptoJS.PBKDF2(password, salt, { keySize: 8, iterations: 1000 });
	     */
	    C.PBKDF2 = function (password, salt, cfg) {
	        return PBKDF2.create(cfg).compute(password, salt);
	    };
	}());


	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var Base = C_lib.Base;
	    var WordArray = C_lib.WordArray;
	    var C_algo = C.algo;
	    var MD5 = C_algo.MD5;

	    /**
	     * This key derivation function is meant to conform with EVP_BytesToKey.
	     * www.openssl.org/docs/crypto/EVP_BytesToKey.html
	     */
	    var EvpKDF = C_algo.EvpKDF = Base.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
	         * @property {Hasher} hasher The hash algorithm to use. Default: MD5
	         * @property {number} iterations The number of iterations to perform. Default: 1
	         */
	        cfg: Base.extend({
	            keySize: 128/32,
	            hasher: MD5,
	            iterations: 1
	        }),

	        /**
	         * Initializes a newly created key derivation function.
	         *
	         * @param {Object} cfg (Optional) The configuration options to use for the derivation.
	         *
	         * @example
	         *
	         *     var kdf = CryptoJS.algo.EvpKDF.create();
	         *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8 });
	         *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8, iterations: 1000 });
	         */
	        init: function (cfg) {
	            this.cfg = this.cfg.extend(cfg);
	        },

	        /**
	         * Derives a key from a password.
	         *
	         * @param {WordArray|string} password The password.
	         * @param {WordArray|string} salt A salt.
	         *
	         * @return {WordArray} The derived key.
	         *
	         * @example
	         *
	         *     var key = kdf.compute(password, salt);
	         */
	        compute: function (password, salt) {
	            // Shortcut
	            var cfg = this.cfg;

	            // Init hasher
	            var hasher = cfg.hasher.create();

	            // Initial values
	            var derivedKey = WordArray.create();

	            // Shortcuts
	            var derivedKeyWords = derivedKey.words;
	            var keySize = cfg.keySize;
	            var iterations = cfg.iterations;

	            // Generate key
	            while (derivedKeyWords.length < keySize) {
	                if (block) {
	                    hasher.update(block);
	                }
	                var block = hasher.update(password).finalize(salt);
	                hasher.reset();

	                // Iterations
	                for (var i = 1; i < iterations; i++) {
	                    block = hasher.finalize(block);
	                    hasher.reset();
	                }

	                derivedKey.concat(block);
	            }
	            derivedKey.sigBytes = keySize * 4;

	            return derivedKey;
	        }
	    });

	    /**
	     * Derives a key from a password.
	     *
	     * @param {WordArray|string} password The password.
	     * @param {WordArray|string} salt A salt.
	     * @param {Object} cfg (Optional) The configuration options to use for this computation.
	     *
	     * @return {WordArray} The derived key.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var key = CryptoJS.EvpKDF(password, salt);
	     *     var key = CryptoJS.EvpKDF(password, salt, { keySize: 8 });
	     *     var key = CryptoJS.EvpKDF(password, salt, { keySize: 8, iterations: 1000 });
	     */
	    C.EvpKDF = function (password, salt, cfg) {
	        return EvpKDF.create(cfg).compute(password, salt);
	    };
	}());


	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var C_algo = C.algo;
	    var SHA256 = C_algo.SHA256;

	    /**
	     * SHA-224 hash algorithm.
	     */
	    var SHA224 = C_algo.SHA224 = SHA256.extend({
	        _doReset: function () {
	            this._hash = new WordArray.init([
	                0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939,
	                0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4
	            ]);
	        },

	        _doFinalize: function () {
	            var hash = SHA256._doFinalize.call(this);

	            hash.sigBytes -= 4;

	            return hash;
	        }
	    });

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.SHA224('message');
	     *     var hash = CryptoJS.SHA224(wordArray);
	     */
	    C.SHA224 = SHA256._createHelper(SHA224);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacSHA224(message, key);
	     */
	    C.HmacSHA224 = SHA256._createHmacHelper(SHA224);
	}());


	(function (undefined) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var Base = C_lib.Base;
	    var X32WordArray = C_lib.WordArray;

	    /**
	     * x64 namespace.
	     */
	    var C_x64 = C.x64 = {};

	    /**
	     * A 64-bit word.
	     */
	    var X64Word = C_x64.Word = Base.extend({
	        /**
	         * Initializes a newly created 64-bit word.
	         *
	         * @param {number} high The high 32 bits.
	         * @param {number} low The low 32 bits.
	         *
	         * @example
	         *
	         *     var x64Word = CryptoJS.x64.Word.create(0x00010203, 0x04050607);
	         */
	        init: function (high, low) {
	            this.high = high;
	            this.low = low;
	        }

	        /**
	         * Bitwise NOTs this word.
	         *
	         * @return {X64Word} A new x64-Word object after negating.
	         *
	         * @example
	         *
	         *     var negated = x64Word.not();
	         */
	        // not: function () {
	            // var high = ~this.high;
	            // var low = ~this.low;

	            // return X64Word.create(high, low);
	        // },

	        /**
	         * Bitwise ANDs this word with the passed word.
	         *
	         * @param {X64Word} word The x64-Word to AND with this word.
	         *
	         * @return {X64Word} A new x64-Word object after ANDing.
	         *
	         * @example
	         *
	         *     var anded = x64Word.and(anotherX64Word);
	         */
	        // and: function (word) {
	            // var high = this.high & word.high;
	            // var low = this.low & word.low;

	            // return X64Word.create(high, low);
	        // },

	        /**
	         * Bitwise ORs this word with the passed word.
	         *
	         * @param {X64Word} word The x64-Word to OR with this word.
	         *
	         * @return {X64Word} A new x64-Word object after ORing.
	         *
	         * @example
	         *
	         *     var ored = x64Word.or(anotherX64Word);
	         */
	        // or: function (word) {
	            // var high = this.high | word.high;
	            // var low = this.low | word.low;

	            // return X64Word.create(high, low);
	        // },

	        /**
	         * Bitwise XORs this word with the passed word.
	         *
	         * @param {X64Word} word The x64-Word to XOR with this word.
	         *
	         * @return {X64Word} A new x64-Word object after XORing.
	         *
	         * @example
	         *
	         *     var xored = x64Word.xor(anotherX64Word);
	         */
	        // xor: function (word) {
	            // var high = this.high ^ word.high;
	            // var low = this.low ^ word.low;

	            // return X64Word.create(high, low);
	        // },

	        /**
	         * Shifts this word n bits to the left.
	         *
	         * @param {number} n The number of bits to shift.
	         *
	         * @return {X64Word} A new x64-Word object after shifting.
	         *
	         * @example
	         *
	         *     var shifted = x64Word.shiftL(25);
	         */
	        // shiftL: function (n) {
	            // if (n < 32) {
	                // var high = (this.high << n) | (this.low >>> (32 - n));
	                // var low = this.low << n;
	            // } else {
	                // var high = this.low << (n - 32);
	                // var low = 0;
	            // }

	            // return X64Word.create(high, low);
	        // },

	        /**
	         * Shifts this word n bits to the right.
	         *
	         * @param {number} n The number of bits to shift.
	         *
	         * @return {X64Word} A new x64-Word object after shifting.
	         *
	         * @example
	         *
	         *     var shifted = x64Word.shiftR(7);
	         */
	        // shiftR: function (n) {
	            // if (n < 32) {
	                // var low = (this.low >>> n) | (this.high << (32 - n));
	                // var high = this.high >>> n;
	            // } else {
	                // var low = this.high >>> (n - 32);
	                // var high = 0;
	            // }

	            // return X64Word.create(high, low);
	        // },

	        /**
	         * Rotates this word n bits to the left.
	         *
	         * @param {number} n The number of bits to rotate.
	         *
	         * @return {X64Word} A new x64-Word object after rotating.
	         *
	         * @example
	         *
	         *     var rotated = x64Word.rotL(25);
	         */
	        // rotL: function (n) {
	            // return this.shiftL(n).or(this.shiftR(64 - n));
	        // },

	        /**
	         * Rotates this word n bits to the right.
	         *
	         * @param {number} n The number of bits to rotate.
	         *
	         * @return {X64Word} A new x64-Word object after rotating.
	         *
	         * @example
	         *
	         *     var rotated = x64Word.rotR(7);
	         */
	        // rotR: function (n) {
	            // return this.shiftR(n).or(this.shiftL(64 - n));
	        // },

	        /**
	         * Adds this word with the passed word.
	         *
	         * @param {X64Word} word The x64-Word to add with this word.
	         *
	         * @return {X64Word} A new x64-Word object after adding.
	         *
	         * @example
	         *
	         *     var added = x64Word.add(anotherX64Word);
	         */
	        // add: function (word) {
	            // var low = (this.low + word.low) | 0;
	            // var carry = (low >>> 0) < (this.low >>> 0) ? 1 : 0;
	            // var high = (this.high + word.high + carry) | 0;

	            // return X64Word.create(high, low);
	        // }
	    });

	    /**
	     * An array of 64-bit words.
	     *
	     * @property {Array} words The array of CryptoJS.x64.Word objects.
	     * @property {number} sigBytes The number of significant bytes in this word array.
	     */
	    var X64WordArray = C_x64.WordArray = Base.extend({
	        /**
	         * Initializes a newly created word array.
	         *
	         * @param {Array} words (Optional) An array of CryptoJS.x64.Word objects.
	         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.x64.WordArray.create();
	         *
	         *     var wordArray = CryptoJS.x64.WordArray.create([
	         *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
	         *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
	         *     ]);
	         *
	         *     var wordArray = CryptoJS.x64.WordArray.create([
	         *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
	         *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
	         *     ], 10);
	         */
	        init: function (words, sigBytes) {
	            words = this.words = words || [];

	            if (sigBytes != undefined) {
	                this.sigBytes = sigBytes;
	            } else {
	                this.sigBytes = words.length * 8;
	            }
	        },

	        /**
	         * Converts this 64-bit word array to a 32-bit word array.
	         *
	         * @return {CryptoJS.lib.WordArray} This word array's data as a 32-bit word array.
	         *
	         * @example
	         *
	         *     var x32WordArray = x64WordArray.toX32();
	         */
	        toX32: function () {
	            // Shortcuts
	            var x64Words = this.words;
	            var x64WordsLength = x64Words.length;

	            // Convert
	            var x32Words = [];
	            for (var i = 0; i < x64WordsLength; i++) {
	                var x64Word = x64Words[i];
	                x32Words.push(x64Word.high);
	                x32Words.push(x64Word.low);
	            }

	            return X32WordArray.create(x32Words, this.sigBytes);
	        },

	        /**
	         * Creates a copy of this word array.
	         *
	         * @return {X64WordArray} The clone.
	         *
	         * @example
	         *
	         *     var clone = x64WordArray.clone();
	         */
	        clone: function () {
	            var clone = Base.clone.call(this);

	            // Clone "words" array
	            var words = clone.words = this.words.slice(0);

	            // Clone each X64Word object
	            var wordsLength = words.length;
	            for (var i = 0; i < wordsLength; i++) {
	                words[i] = words[i].clone();
	            }

	            return clone;
	        }
	    });
	}());


	(function (Math) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var Hasher = C_lib.Hasher;
	    var C_x64 = C.x64;
	    var X64Word = C_x64.Word;
	    var C_algo = C.algo;

	    // Constants tables
	    var RHO_OFFSETS = [];
	    var PI_INDEXES  = [];
	    var ROUND_CONSTANTS = [];

	    // Compute Constants
	    (function () {
	        // Compute rho offset constants
	        var x = 1, y = 0;
	        for (var t = 0; t < 24; t++) {
	            RHO_OFFSETS[x + 5 * y] = ((t + 1) * (t + 2) / 2) % 64;

	            var newX = y % 5;
	            var newY = (2 * x + 3 * y) % 5;
	            x = newX;
	            y = newY;
	        }

	        // Compute pi index constants
	        for (var x = 0; x < 5; x++) {
	            for (var y = 0; y < 5; y++) {
	                PI_INDEXES[x + 5 * y] = y + ((2 * x + 3 * y) % 5) * 5;
	            }
	        }

	        // Compute round constants
	        var LFSR = 0x01;
	        for (var i = 0; i < 24; i++) {
	            var roundConstantMsw = 0;
	            var roundConstantLsw = 0;

	            for (var j = 0; j < 7; j++) {
	                if (LFSR & 0x01) {
	                    var bitPosition = (1 << j) - 1;
	                    if (bitPosition < 32) {
	                        roundConstantLsw ^= 1 << bitPosition;
	                    } else /* if (bitPosition >= 32) */ {
	                        roundConstantMsw ^= 1 << (bitPosition - 32);
	                    }
	                }

	                // Compute next LFSR
	                if (LFSR & 0x80) {
	                    // Primitive polynomial over GF(2): x^8 + x^6 + x^5 + x^4 + 1
	                    LFSR = (LFSR << 1) ^ 0x71;
	                } else {
	                    LFSR <<= 1;
	                }
	            }

	            ROUND_CONSTANTS[i] = X64Word.create(roundConstantMsw, roundConstantLsw);
	        }
	    }());

	    // Reusable objects for temporary values
	    var T = [];
	    (function () {
	        for (var i = 0; i < 25; i++) {
	            T[i] = X64Word.create();
	        }
	    }());

	    /**
	     * SHA-3 hash algorithm.
	     */
	    var SHA3 = C_algo.SHA3 = Hasher.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {number} outputLength
	         *   The desired number of bits in the output hash.
	         *   Only values permitted are: 224, 256, 384, 512.
	         *   Default: 512
	         */
	        cfg: Hasher.cfg.extend({
	            outputLength: 512
	        }),

	        _doReset: function () {
	            var state = this._state = []
	            for (var i = 0; i < 25; i++) {
	                state[i] = new X64Word.init();
	            }

	            this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32;
	        },

	        _doProcessBlock: function (M, offset) {
	            // Shortcuts
	            var state = this._state;
	            var nBlockSizeLanes = this.blockSize / 2;

	            // Absorb
	            for (var i = 0; i < nBlockSizeLanes; i++) {
	                // Shortcuts
	                var M2i  = M[offset + 2 * i];
	                var M2i1 = M[offset + 2 * i + 1];

	                // Swap endian
	                M2i = (
	                    (((M2i << 8)  | (M2i >>> 24)) & 0x00ff00ff) |
	                    (((M2i << 24) | (M2i >>> 8))  & 0xff00ff00)
	                );
	                M2i1 = (
	                    (((M2i1 << 8)  | (M2i1 >>> 24)) & 0x00ff00ff) |
	                    (((M2i1 << 24) | (M2i1 >>> 8))  & 0xff00ff00)
	                );

	                // Absorb message into state
	                var lane = state[i];
	                lane.high ^= M2i1;
	                lane.low  ^= M2i;
	            }

	            // Rounds
	            for (var round = 0; round < 24; round++) {
	                // Theta
	                for (var x = 0; x < 5; x++) {
	                    // Mix column lanes
	                    var tMsw = 0, tLsw = 0;
	                    for (var y = 0; y < 5; y++) {
	                        var lane = state[x + 5 * y];
	                        tMsw ^= lane.high;
	                        tLsw ^= lane.low;
	                    }

	                    // Temporary values
	                    var Tx = T[x];
	                    Tx.high = tMsw;
	                    Tx.low  = tLsw;
	                }
	                for (var x = 0; x < 5; x++) {
	                    // Shortcuts
	                    var Tx4 = T[(x + 4) % 5];
	                    var Tx1 = T[(x + 1) % 5];
	                    var Tx1Msw = Tx1.high;
	                    var Tx1Lsw = Tx1.low;

	                    // Mix surrounding columns
	                    var tMsw = Tx4.high ^ ((Tx1Msw << 1) | (Tx1Lsw >>> 31));
	                    var tLsw = Tx4.low  ^ ((Tx1Lsw << 1) | (Tx1Msw >>> 31));
	                    for (var y = 0; y < 5; y++) {
	                        var lane = state[x + 5 * y];
	                        lane.high ^= tMsw;
	                        lane.low  ^= tLsw;
	                    }
	                }

	                // Rho Pi
	                for (var laneIndex = 1; laneIndex < 25; laneIndex++) {
	                    // Shortcuts
	                    var lane = state[laneIndex];
	                    var laneMsw = lane.high;
	                    var laneLsw = lane.low;
	                    var rhoOffset = RHO_OFFSETS[laneIndex];

	                    // Rotate lanes
	                    if (rhoOffset < 32) {
	                        var tMsw = (laneMsw << rhoOffset) | (laneLsw >>> (32 - rhoOffset));
	                        var tLsw = (laneLsw << rhoOffset) | (laneMsw >>> (32 - rhoOffset));
	                    } else /* if (rhoOffset >= 32) */ {
	                        var tMsw = (laneLsw << (rhoOffset - 32)) | (laneMsw >>> (64 - rhoOffset));
	                        var tLsw = (laneMsw << (rhoOffset - 32)) | (laneLsw >>> (64 - rhoOffset));
	                    }

	                    // Transpose lanes
	                    var TPiLane = T[PI_INDEXES[laneIndex]];
	                    TPiLane.high = tMsw;
	                    TPiLane.low  = tLsw;
	                }

	                // Rho pi at x = y = 0
	                var T0 = T[0];
	                var state0 = state[0];
	                T0.high = state0.high;
	                T0.low  = state0.low;

	                // Chi
	                for (var x = 0; x < 5; x++) {
	                    for (var y = 0; y < 5; y++) {
	                        // Shortcuts
	                        var laneIndex = x + 5 * y;
	                        var lane = state[laneIndex];
	                        var TLane = T[laneIndex];
	                        var Tx1Lane = T[((x + 1) % 5) + 5 * y];
	                        var Tx2Lane = T[((x + 2) % 5) + 5 * y];

	                        // Mix rows
	                        lane.high = TLane.high ^ (~Tx1Lane.high & Tx2Lane.high);
	                        lane.low  = TLane.low  ^ (~Tx1Lane.low  & Tx2Lane.low);
	                    }
	                }

	                // Iota
	                var lane = state[0];
	                var roundConstant = ROUND_CONSTANTS[round];
	                lane.high ^= roundConstant.high;
	                lane.low  ^= roundConstant.low;;
	            }
	        },

	        _doFinalize: function () {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;
	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;
	            var blockSizeBits = this.blockSize * 32;

	            // Add padding
	            dataWords[nBitsLeft >>> 5] |= 0x1 << (24 - nBitsLeft % 32);
	            dataWords[((Math.ceil((nBitsLeft + 1) / blockSizeBits) * blockSizeBits) >>> 5) - 1] |= 0x80;
	            data.sigBytes = dataWords.length * 4;

	            // Hash final blocks
	            this._process();

	            // Shortcuts
	            var state = this._state;
	            var outputLengthBytes = this.cfg.outputLength / 8;
	            var outputLengthLanes = outputLengthBytes / 8;

	            // Squeeze
	            var hashWords = [];
	            for (var i = 0; i < outputLengthLanes; i++) {
	                // Shortcuts
	                var lane = state[i];
	                var laneMsw = lane.high;
	                var laneLsw = lane.low;

	                // Swap endian
	                laneMsw = (
	                    (((laneMsw << 8)  | (laneMsw >>> 24)) & 0x00ff00ff) |
	                    (((laneMsw << 24) | (laneMsw >>> 8))  & 0xff00ff00)
	                );
	                laneLsw = (
	                    (((laneLsw << 8)  | (laneLsw >>> 24)) & 0x00ff00ff) |
	                    (((laneLsw << 24) | (laneLsw >>> 8))  & 0xff00ff00)
	                );

	                // Squeeze state to retrieve hash
	                hashWords.push(laneLsw);
	                hashWords.push(laneMsw);
	            }

	            // Return final computed hash
	            return new WordArray.init(hashWords, outputLengthBytes);
	        },

	        clone: function () {
	            var clone = Hasher.clone.call(this);

	            var state = clone._state = this._state.slice(0);
	            for (var i = 0; i < 25; i++) {
	                state[i] = state[i].clone();
	            }

	            return clone;
	        }
	    });

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.SHA3('message');
	     *     var hash = CryptoJS.SHA3(wordArray);
	     */
	    C.SHA3 = Hasher._createHelper(SHA3);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacSHA3(message, key);
	     */
	    C.HmacSHA3 = Hasher._createHmacHelper(SHA3);
	}(Math));


	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var Hasher = C_lib.Hasher;
	    var C_x64 = C.x64;
	    var X64Word = C_x64.Word;
	    var X64WordArray = C_x64.WordArray;
	    var C_algo = C.algo;

	    function X64Word_create() {
	        return X64Word.create.apply(X64Word, arguments);
	    }

	    // Constants
	    var K = [
	        X64Word_create(0x428a2f98, 0xd728ae22), X64Word_create(0x71374491, 0x23ef65cd),
	        X64Word_create(0xb5c0fbcf, 0xec4d3b2f), X64Word_create(0xe9b5dba5, 0x8189dbbc),
	        X64Word_create(0x3956c25b, 0xf348b538), X64Word_create(0x59f111f1, 0xb605d019),
	        X64Word_create(0x923f82a4, 0xaf194f9b), X64Word_create(0xab1c5ed5, 0xda6d8118),
	        X64Word_create(0xd807aa98, 0xa3030242), X64Word_create(0x12835b01, 0x45706fbe),
	        X64Word_create(0x243185be, 0x4ee4b28c), X64Word_create(0x550c7dc3, 0xd5ffb4e2),
	        X64Word_create(0x72be5d74, 0xf27b896f), X64Word_create(0x80deb1fe, 0x3b1696b1),
	        X64Word_create(0x9bdc06a7, 0x25c71235), X64Word_create(0xc19bf174, 0xcf692694),
	        X64Word_create(0xe49b69c1, 0x9ef14ad2), X64Word_create(0xefbe4786, 0x384f25e3),
	        X64Word_create(0x0fc19dc6, 0x8b8cd5b5), X64Word_create(0x240ca1cc, 0x77ac9c65),
	        X64Word_create(0x2de92c6f, 0x592b0275), X64Word_create(0x4a7484aa, 0x6ea6e483),
	        X64Word_create(0x5cb0a9dc, 0xbd41fbd4), X64Word_create(0x76f988da, 0x831153b5),
	        X64Word_create(0x983e5152, 0xee66dfab), X64Word_create(0xa831c66d, 0x2db43210),
	        X64Word_create(0xb00327c8, 0x98fb213f), X64Word_create(0xbf597fc7, 0xbeef0ee4),
	        X64Word_create(0xc6e00bf3, 0x3da88fc2), X64Word_create(0xd5a79147, 0x930aa725),
	        X64Word_create(0x06ca6351, 0xe003826f), X64Word_create(0x14292967, 0x0a0e6e70),
	        X64Word_create(0x27b70a85, 0x46d22ffc), X64Word_create(0x2e1b2138, 0x5c26c926),
	        X64Word_create(0x4d2c6dfc, 0x5ac42aed), X64Word_create(0x53380d13, 0x9d95b3df),
	        X64Word_create(0x650a7354, 0x8baf63de), X64Word_create(0x766a0abb, 0x3c77b2a8),
	        X64Word_create(0x81c2c92e, 0x47edaee6), X64Word_create(0x92722c85, 0x1482353b),
	        X64Word_create(0xa2bfe8a1, 0x4cf10364), X64Word_create(0xa81a664b, 0xbc423001),
	        X64Word_create(0xc24b8b70, 0xd0f89791), X64Word_create(0xc76c51a3, 0x0654be30),
	        X64Word_create(0xd192e819, 0xd6ef5218), X64Word_create(0xd6990624, 0x5565a910),
	        X64Word_create(0xf40e3585, 0x5771202a), X64Word_create(0x106aa070, 0x32bbd1b8),
	        X64Word_create(0x19a4c116, 0xb8d2d0c8), X64Word_create(0x1e376c08, 0x5141ab53),
	        X64Word_create(0x2748774c, 0xdf8eeb99), X64Word_create(0x34b0bcb5, 0xe19b48a8),
	        X64Word_create(0x391c0cb3, 0xc5c95a63), X64Word_create(0x4ed8aa4a, 0xe3418acb),
	        X64Word_create(0x5b9cca4f, 0x7763e373), X64Word_create(0x682e6ff3, 0xd6b2b8a3),
	        X64Word_create(0x748f82ee, 0x5defb2fc), X64Word_create(0x78a5636f, 0x43172f60),
	        X64Word_create(0x84c87814, 0xa1f0ab72), X64Word_create(0x8cc70208, 0x1a6439ec),
	        X64Word_create(0x90befffa, 0x23631e28), X64Word_create(0xa4506ceb, 0xde82bde9),
	        X64Word_create(0xbef9a3f7, 0xb2c67915), X64Word_create(0xc67178f2, 0xe372532b),
	        X64Word_create(0xca273ece, 0xea26619c), X64Word_create(0xd186b8c7, 0x21c0c207),
	        X64Word_create(0xeada7dd6, 0xcde0eb1e), X64Word_create(0xf57d4f7f, 0xee6ed178),
	        X64Word_create(0x06f067aa, 0x72176fba), X64Word_create(0x0a637dc5, 0xa2c898a6),
	        X64Word_create(0x113f9804, 0xbef90dae), X64Word_create(0x1b710b35, 0x131c471b),
	        X64Word_create(0x28db77f5, 0x23047d84), X64Word_create(0x32caab7b, 0x40c72493),
	        X64Word_create(0x3c9ebe0a, 0x15c9bebc), X64Word_create(0x431d67c4, 0x9c100d4c),
	        X64Word_create(0x4cc5d4be, 0xcb3e42b6), X64Word_create(0x597f299c, 0xfc657e2a),
	        X64Word_create(0x5fcb6fab, 0x3ad6faec), X64Word_create(0x6c44198c, 0x4a475817)
	    ];

	    // Reusable objects
	    var W = [];
	    (function () {
	        for (var i = 0; i < 80; i++) {
	            W[i] = X64Word_create();
	        }
	    }());

	    /**
	     * SHA-512 hash algorithm.
	     */
	    var SHA512 = C_algo.SHA512 = Hasher.extend({
	        _doReset: function () {
	            this._hash = new X64WordArray.init([
	                new X64Word.init(0x6a09e667, 0xf3bcc908), new X64Word.init(0xbb67ae85, 0x84caa73b),
	                new X64Word.init(0x3c6ef372, 0xfe94f82b), new X64Word.init(0xa54ff53a, 0x5f1d36f1),
	                new X64Word.init(0x510e527f, 0xade682d1), new X64Word.init(0x9b05688c, 0x2b3e6c1f),
	                new X64Word.init(0x1f83d9ab, 0xfb41bd6b), new X64Word.init(0x5be0cd19, 0x137e2179)
	            ]);
	        },

	        _doProcessBlock: function (M, offset) {
	            // Shortcuts
	            var H = this._hash.words;

	            var H0 = H[0];
	            var H1 = H[1];
	            var H2 = H[2];
	            var H3 = H[3];
	            var H4 = H[4];
	            var H5 = H[5];
	            var H6 = H[6];
	            var H7 = H[7];

	            var H0h = H0.high;
	            var H0l = H0.low;
	            var H1h = H1.high;
	            var H1l = H1.low;
	            var H2h = H2.high;
	            var H2l = H2.low;
	            var H3h = H3.high;
	            var H3l = H3.low;
	            var H4h = H4.high;
	            var H4l = H4.low;
	            var H5h = H5.high;
	            var H5l = H5.low;
	            var H6h = H6.high;
	            var H6l = H6.low;
	            var H7h = H7.high;
	            var H7l = H7.low;

	            // Working variables
	            var ah = H0h;
	            var al = H0l;
	            var bh = H1h;
	            var bl = H1l;
	            var ch = H2h;
	            var cl = H2l;
	            var dh = H3h;
	            var dl = H3l;
	            var eh = H4h;
	            var el = H4l;
	            var fh = H5h;
	            var fl = H5l;
	            var gh = H6h;
	            var gl = H6l;
	            var hh = H7h;
	            var hl = H7l;

	            // Rounds
	            for (var i = 0; i < 80; i++) {
	                // Shortcut
	                var Wi = W[i];

	                // Extend message
	                if (i < 16) {
	                    var Wih = Wi.high = M[offset + i * 2]     | 0;
	                    var Wil = Wi.low  = M[offset + i * 2 + 1] | 0;
	                } else {
	                    // Gamma0
	                    var gamma0x  = W[i - 15];
	                    var gamma0xh = gamma0x.high;
	                    var gamma0xl = gamma0x.low;
	                    var gamma0h  = ((gamma0xh >>> 1) | (gamma0xl << 31)) ^ ((gamma0xh >>> 8) | (gamma0xl << 24)) ^ (gamma0xh >>> 7);
	                    var gamma0l  = ((gamma0xl >>> 1) | (gamma0xh << 31)) ^ ((gamma0xl >>> 8) | (gamma0xh << 24)) ^ ((gamma0xl >>> 7) | (gamma0xh << 25));

	                    // Gamma1
	                    var gamma1x  = W[i - 2];
	                    var gamma1xh = gamma1x.high;
	                    var gamma1xl = gamma1x.low;
	                    var gamma1h  = ((gamma1xh >>> 19) | (gamma1xl << 13)) ^ ((gamma1xh << 3) | (gamma1xl >>> 29)) ^ (gamma1xh >>> 6);
	                    var gamma1l  = ((gamma1xl >>> 19) | (gamma1xh << 13)) ^ ((gamma1xl << 3) | (gamma1xh >>> 29)) ^ ((gamma1xl >>> 6) | (gamma1xh << 26));

	                    // W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16]
	                    var Wi7  = W[i - 7];
	                    var Wi7h = Wi7.high;
	                    var Wi7l = Wi7.low;

	                    var Wi16  = W[i - 16];
	                    var Wi16h = Wi16.high;
	                    var Wi16l = Wi16.low;

	                    var Wil = gamma0l + Wi7l;
	                    var Wih = gamma0h + Wi7h + ((Wil >>> 0) < (gamma0l >>> 0) ? 1 : 0);
	                    var Wil = Wil + gamma1l;
	                    var Wih = Wih + gamma1h + ((Wil >>> 0) < (gamma1l >>> 0) ? 1 : 0);
	                    var Wil = Wil + Wi16l;
	                    var Wih = Wih + Wi16h + ((Wil >>> 0) < (Wi16l >>> 0) ? 1 : 0);

	                    Wi.high = Wih;
	                    Wi.low  = Wil;
	                }

	                var chh  = (eh & fh) ^ (~eh & gh);
	                var chl  = (el & fl) ^ (~el & gl);
	                var majh = (ah & bh) ^ (ah & ch) ^ (bh & ch);
	                var majl = (al & bl) ^ (al & cl) ^ (bl & cl);

	                var sigma0h = ((ah >>> 28) | (al << 4))  ^ ((ah << 30)  | (al >>> 2)) ^ ((ah << 25) | (al >>> 7));
	                var sigma0l = ((al >>> 28) | (ah << 4))  ^ ((al << 30)  | (ah >>> 2)) ^ ((al << 25) | (ah >>> 7));
	                var sigma1h = ((eh >>> 14) | (el << 18)) ^ ((eh >>> 18) | (el << 14)) ^ ((eh << 23) | (el >>> 9));
	                var sigma1l = ((el >>> 14) | (eh << 18)) ^ ((el >>> 18) | (eh << 14)) ^ ((el << 23) | (eh >>> 9));

	                // t1 = h + sigma1 + ch + K[i] + W[i]
	                var Ki  = K[i];
	                var Kih = Ki.high;
	                var Kil = Ki.low;

	                var t1l = hl + sigma1l;
	                var t1h = hh + sigma1h + ((t1l >>> 0) < (hl >>> 0) ? 1 : 0);
	                var t1l = t1l + chl;
	                var t1h = t1h + chh + ((t1l >>> 0) < (chl >>> 0) ? 1 : 0);
	                var t1l = t1l + Kil;
	                var t1h = t1h + Kih + ((t1l >>> 0) < (Kil >>> 0) ? 1 : 0);
	                var t1l = t1l + Wil;
	                var t1h = t1h + Wih + ((t1l >>> 0) < (Wil >>> 0) ? 1 : 0);

	                // t2 = sigma0 + maj
	                var t2l = sigma0l + majl;
	                var t2h = sigma0h + majh + ((t2l >>> 0) < (sigma0l >>> 0) ? 1 : 0);

	                // Update working variables
	                hh = gh;
	                hl = gl;
	                gh = fh;
	                gl = fl;
	                fh = eh;
	                fl = el;
	                el = (dl + t1l) | 0;
	                eh = (dh + t1h + ((el >>> 0) < (dl >>> 0) ? 1 : 0)) | 0;
	                dh = ch;
	                dl = cl;
	                ch = bh;
	                cl = bl;
	                bh = ah;
	                bl = al;
	                al = (t1l + t2l) | 0;
	                ah = (t1h + t2h + ((al >>> 0) < (t1l >>> 0) ? 1 : 0)) | 0;
	            }

	            // Intermediate hash value
	            H0l = H0.low  = (H0l + al);
	            H0.high = (H0h + ah + ((H0l >>> 0) < (al >>> 0) ? 1 : 0));
	            H1l = H1.low  = (H1l + bl);
	            H1.high = (H1h + bh + ((H1l >>> 0) < (bl >>> 0) ? 1 : 0));
	            H2l = H2.low  = (H2l + cl);
	            H2.high = (H2h + ch + ((H2l >>> 0) < (cl >>> 0) ? 1 : 0));
	            H3l = H3.low  = (H3l + dl);
	            H3.high = (H3h + dh + ((H3l >>> 0) < (dl >>> 0) ? 1 : 0));
	            H4l = H4.low  = (H4l + el);
	            H4.high = (H4h + eh + ((H4l >>> 0) < (el >>> 0) ? 1 : 0));
	            H5l = H5.low  = (H5l + fl);
	            H5.high = (H5h + fh + ((H5l >>> 0) < (fl >>> 0) ? 1 : 0));
	            H6l = H6.low  = (H6l + gl);
	            H6.high = (H6h + gh + ((H6l >>> 0) < (gl >>> 0) ? 1 : 0));
	            H7l = H7.low  = (H7l + hl);
	            H7.high = (H7h + hh + ((H7l >>> 0) < (hl >>> 0) ? 1 : 0));
	        },

	        _doFinalize: function () {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;

	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;

	            // Add padding
	            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	            dataWords[(((nBitsLeft + 128) >>> 10) << 5) + 30] = Math.floor(nBitsTotal / 0x100000000);
	            dataWords[(((nBitsLeft + 128) >>> 10) << 5) + 31] = nBitsTotal;
	            data.sigBytes = dataWords.length * 4;

	            // Hash final blocks
	            this._process();

	            // Convert hash to 32-bit word array before returning
	            var hash = this._hash.toX32();

	            // Return final computed hash
	            return hash;
	        },

	        clone: function () {
	            var clone = Hasher.clone.call(this);
	            clone._hash = this._hash.clone();

	            return clone;
	        },

	        blockSize: 1024/32
	    });

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.SHA512('message');
	     *     var hash = CryptoJS.SHA512(wordArray);
	     */
	    C.SHA512 = Hasher._createHelper(SHA512);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacSHA512(message, key);
	     */
	    C.HmacSHA512 = Hasher._createHmacHelper(SHA512);
	}());


	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_x64 = C.x64;
	    var X64Word = C_x64.Word;
	    var X64WordArray = C_x64.WordArray;
	    var C_algo = C.algo;
	    var SHA512 = C_algo.SHA512;

	    /**
	     * SHA-384 hash algorithm.
	     */
	    var SHA384 = C_algo.SHA384 = SHA512.extend({
	        _doReset: function () {
	            this._hash = new X64WordArray.init([
	                new X64Word.init(0xcbbb9d5d, 0xc1059ed8), new X64Word.init(0x629a292a, 0x367cd507),
	                new X64Word.init(0x9159015a, 0x3070dd17), new X64Word.init(0x152fecd8, 0xf70e5939),
	                new X64Word.init(0x67332667, 0xffc00b31), new X64Word.init(0x8eb44a87, 0x68581511),
	                new X64Word.init(0xdb0c2e0d, 0x64f98fa7), new X64Word.init(0x47b5481d, 0xbefa4fa4)
	            ]);
	        },

	        _doFinalize: function () {
	            var hash = SHA512._doFinalize.call(this);

	            hash.sigBytes -= 16;

	            return hash;
	        }
	    });

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.SHA384('message');
	     *     var hash = CryptoJS.SHA384(wordArray);
	     */
	    C.SHA384 = SHA512._createHelper(SHA384);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacSHA384(message, key);
	     */
	    C.HmacSHA384 = SHA512._createHmacHelper(SHA384);
	}());


	/**
	 * Cipher core components.
	 */
	CryptoJS.lib.Cipher || (function (undefined) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var Base = C_lib.Base;
	    var WordArray = C_lib.WordArray;
	    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm;
	    var C_enc = C.enc;
	    var Utf8 = C_enc.Utf8;
	    var Base64 = C_enc.Base64;
	    var C_algo = C.algo;
	    var EvpKDF = C_algo.EvpKDF;

	    /**
	     * Abstract base cipher template.
	     *
	     * @property {number} keySize This cipher's key size. Default: 4 (128 bits)
	     * @property {number} ivSize This cipher's IV size. Default: 4 (128 bits)
	     * @property {number} _ENC_XFORM_MODE A constant representing encryption mode.
	     * @property {number} _DEC_XFORM_MODE A constant representing decryption mode.
	     */
	    var Cipher = C_lib.Cipher = BufferedBlockAlgorithm.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {WordArray} iv The IV to use for this operation.
	         */
	        cfg: Base.extend(),

	        /**
	         * Creates this cipher in encryption mode.
	         *
	         * @param {WordArray} key The key.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @return {Cipher} A cipher instance.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var cipher = CryptoJS.algo.AES.createEncryptor(keyWordArray, { iv: ivWordArray });
	         */
	        createEncryptor: function (key, cfg) {
	            return this.create(this._ENC_XFORM_MODE, key, cfg);
	        },

	        /**
	         * Creates this cipher in decryption mode.
	         *
	         * @param {WordArray} key The key.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @return {Cipher} A cipher instance.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var cipher = CryptoJS.algo.AES.createDecryptor(keyWordArray, { iv: ivWordArray });
	         */
	        createDecryptor: function (key, cfg) {
	            return this.create(this._DEC_XFORM_MODE, key, cfg);
	        },

	        /**
	         * Initializes a newly created cipher.
	         *
	         * @param {number} xformMode Either the encryption or decryption transormation mode constant.
	         * @param {WordArray} key The key.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @example
	         *
	         *     var cipher = CryptoJS.algo.AES.create(CryptoJS.algo.AES._ENC_XFORM_MODE, keyWordArray, { iv: ivWordArray });
	         */
	        init: function (xformMode, key, cfg) {
	            // Apply config defaults
	            this.cfg = this.cfg.extend(cfg);

	            // Store transform mode and key
	            this._xformMode = xformMode;
	            this._key = key;

	            // Set initial values
	            this.reset();
	        },

	        /**
	         * Resets this cipher to its initial state.
	         *
	         * @example
	         *
	         *     cipher.reset();
	         */
	        reset: function () {
	            // Reset data buffer
	            BufferedBlockAlgorithm.reset.call(this);

	            // Perform concrete-cipher logic
	            this._doReset();
	        },

	        /**
	         * Adds data to be encrypted or decrypted.
	         *
	         * @param {WordArray|string} dataUpdate The data to encrypt or decrypt.
	         *
	         * @return {WordArray} The data after processing.
	         *
	         * @example
	         *
	         *     var encrypted = cipher.process('data');
	         *     var encrypted = cipher.process(wordArray);
	         */
	        process: function (dataUpdate) {
	            // Append
	            this._append(dataUpdate);

	            // Process available blocks
	            return this._process();
	        },

	        /**
	         * Finalizes the encryption or decryption process.
	         * Note that the finalize operation is effectively a destructive, read-once operation.
	         *
	         * @param {WordArray|string} dataUpdate The final data to encrypt or decrypt.
	         *
	         * @return {WordArray} The data after final processing.
	         *
	         * @example
	         *
	         *     var encrypted = cipher.finalize();
	         *     var encrypted = cipher.finalize('data');
	         *     var encrypted = cipher.finalize(wordArray);
	         */
	        finalize: function (dataUpdate) {
	            // Final data update
	            if (dataUpdate) {
	                this._append(dataUpdate);
	            }

	            // Perform concrete-cipher logic
	            var finalProcessedData = this._doFinalize();

	            return finalProcessedData;
	        },

	        keySize: 128/32,

	        ivSize: 128/32,

	        _ENC_XFORM_MODE: 1,

	        _DEC_XFORM_MODE: 2,

	        /**
	         * Creates shortcut functions to a cipher's object interface.
	         *
	         * @param {Cipher} cipher The cipher to create a helper for.
	         *
	         * @return {Object} An object with encrypt and decrypt shortcut functions.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var AES = CryptoJS.lib.Cipher._createHelper(CryptoJS.algo.AES);
	         */
	        _createHelper: (function () {
	            function selectCipherStrategy(key) {
	                if (typeof key == 'string') {
	                    return PasswordBasedCipher;
	                } else {
	                    return SerializableCipher;
	                }
	            }

	            return function (cipher) {
	                return {
	                    encrypt: function (message, key, cfg) {
	                        return selectCipherStrategy(key).encrypt(cipher, message, key, cfg);
	                    },

	                    decrypt: function (ciphertext, key, cfg) {
	                        return selectCipherStrategy(key).decrypt(cipher, ciphertext, key, cfg);
	                    }
	                };
	            };
	        }())
	    });

	    /**
	     * Abstract base stream cipher template.
	     *
	     * @property {number} blockSize The number of 32-bit words this cipher operates on. Default: 1 (32 bits)
	     */
	    var StreamCipher = C_lib.StreamCipher = Cipher.extend({
	        _doFinalize: function () {
	            // Process partial blocks
	            var finalProcessedBlocks = this._process(!!'flush');

	            return finalProcessedBlocks;
	        },

	        blockSize: 1
	    });

	    /**
	     * Mode namespace.
	     */
	    var C_mode = C.mode = {};

	    /**
	     * Abstract base block cipher mode template.
	     */
	    var BlockCipherMode = C_lib.BlockCipherMode = Base.extend({
	        /**
	         * Creates this mode for encryption.
	         *
	         * @param {Cipher} cipher A block cipher instance.
	         * @param {Array} iv The IV words.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var mode = CryptoJS.mode.CBC.createEncryptor(cipher, iv.words);
	         */
	        createEncryptor: function (cipher, iv) {
	            return this.Encryptor.create(cipher, iv);
	        },

	        /**
	         * Creates this mode for decryption.
	         *
	         * @param {Cipher} cipher A block cipher instance.
	         * @param {Array} iv The IV words.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var mode = CryptoJS.mode.CBC.createDecryptor(cipher, iv.words);
	         */
	        createDecryptor: function (cipher, iv) {
	            return this.Decryptor.create(cipher, iv);
	        },

	        /**
	         * Initializes a newly created mode.
	         *
	         * @param {Cipher} cipher A block cipher instance.
	         * @param {Array} iv The IV words.
	         *
	         * @example
	         *
	         *     var mode = CryptoJS.mode.CBC.Encryptor.create(cipher, iv.words);
	         */
	        init: function (cipher, iv) {
	            this._cipher = cipher;
	            this._iv = iv;
	        }
	    });

	    /**
	     * Cipher Block Chaining mode.
	     */
	    var CBC = C_mode.CBC = (function () {
	        /**
	         * Abstract base CBC mode.
	         */
	        var CBC = BlockCipherMode.extend();

	        /**
	         * CBC encryptor.
	         */
	        CBC.Encryptor = CBC.extend({
	            /**
	             * Processes the data block at offset.
	             *
	             * @param {Array} words The data words to operate on.
	             * @param {number} offset The offset where the block starts.
	             *
	             * @example
	             *
	             *     mode.processBlock(data.words, offset);
	             */
	            processBlock: function (words, offset) {
	                // Shortcuts
	                var cipher = this._cipher;
	                var blockSize = cipher.blockSize;

	                // XOR and encrypt
	                xorBlock.call(this, words, offset, blockSize);
	                cipher.encryptBlock(words, offset);

	                // Remember this block to use with next block
	                this._prevBlock = words.slice(offset, offset + blockSize);
	            }
	        });

	        /**
	         * CBC decryptor.
	         */
	        CBC.Decryptor = CBC.extend({
	            /**
	             * Processes the data block at offset.
	             *
	             * @param {Array} words The data words to operate on.
	             * @param {number} offset The offset where the block starts.
	             *
	             * @example
	             *
	             *     mode.processBlock(data.words, offset);
	             */
	            processBlock: function (words, offset) {
	                // Shortcuts
	                var cipher = this._cipher;
	                var blockSize = cipher.blockSize;

	                // Remember this block to use with next block
	                var thisBlock = words.slice(offset, offset + blockSize);

	                // Decrypt and XOR
	                cipher.decryptBlock(words, offset);
	                xorBlock.call(this, words, offset, blockSize);

	                // This block becomes the previous block
	                this._prevBlock = thisBlock;
	            }
	        });

	        function xorBlock(words, offset, blockSize) {
	            // Shortcut
	            var iv = this._iv;

	            // Choose mixing block
	            if (iv) {
	                var block = iv;

	                // Remove IV for subsequent blocks
	                this._iv = undefined;
	            } else {
	                var block = this._prevBlock;
	            }

	            // XOR blocks
	            for (var i = 0; i < blockSize; i++) {
	                words[offset + i] ^= block[i];
	            }
	        }

	        return CBC;
	    }());

	    /**
	     * Padding namespace.
	     */
	    var C_pad = C.pad = {};

	    /**
	     * PKCS #5/7 padding strategy.
	     */
	    var Pkcs7 = C_pad.Pkcs7 = {
	        /**
	         * Pads data using the algorithm defined in PKCS #5/7.
	         *
	         * @param {WordArray} data The data to pad.
	         * @param {number} blockSize The multiple that the data should be padded to.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     CryptoJS.pad.Pkcs7.pad(wordArray, 4);
	         */
	        pad: function (data, blockSize) {
	            // Shortcut
	            var blockSizeBytes = blockSize * 4;

	            // Count padding bytes
	            var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;

	            // Create padding word
	            var paddingWord = (nPaddingBytes << 24) | (nPaddingBytes << 16) | (nPaddingBytes << 8) | nPaddingBytes;

	            // Create padding
	            var paddingWords = [];
	            for (var i = 0; i < nPaddingBytes; i += 4) {
	                paddingWords.push(paddingWord);
	            }
	            var padding = WordArray.create(paddingWords, nPaddingBytes);

	            // Add padding
	            data.concat(padding);
	        },

	        /**
	         * Unpads data that had been padded using the algorithm defined in PKCS #5/7.
	         *
	         * @param {WordArray} data The data to unpad.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     CryptoJS.pad.Pkcs7.unpad(wordArray);
	         */
	        unpad: function (data) {
	            // Get number of padding bytes from last byte
	            var nPaddingBytes = data.words[(data.sigBytes - 1) >>> 2] & 0xff;

	            // Remove padding
	            data.sigBytes -= nPaddingBytes;
	        }
	    };

	    /**
	     * Abstract base block cipher template.
	     *
	     * @property {number} blockSize The number of 32-bit words this cipher operates on. Default: 4 (128 bits)
	     */
	    var BlockCipher = C_lib.BlockCipher = Cipher.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {Mode} mode The block mode to use. Default: CBC
	         * @property {Padding} padding The padding strategy to use. Default: Pkcs7
	         */
	        cfg: Cipher.cfg.extend({
	            mode: CBC,
	            padding: Pkcs7
	        }),

	        reset: function () {
	            // Reset cipher
	            Cipher.reset.call(this);

	            // Shortcuts
	            var cfg = this.cfg;
	            var iv = cfg.iv;
	            var mode = cfg.mode;

	            // Reset block mode
	            if (this._xformMode == this._ENC_XFORM_MODE) {
	                var modeCreator = mode.createEncryptor;
	            } else /* if (this._xformMode == this._DEC_XFORM_MODE) */ {
	                var modeCreator = mode.createDecryptor;

	                // Keep at least one block in the buffer for unpadding
	                this._minBufferSize = 1;
	            }
	            this._mode = modeCreator.call(mode, this, iv && iv.words);
	        },

	        _doProcessBlock: function (words, offset) {
	            this._mode.processBlock(words, offset);
	        },

	        _doFinalize: function () {
	            // Shortcut
	            var padding = this.cfg.padding;

	            // Finalize
	            if (this._xformMode == this._ENC_XFORM_MODE) {
	                // Pad data
	                padding.pad(this._data, this.blockSize);

	                // Process final blocks
	                var finalProcessedBlocks = this._process(!!'flush');
	            } else /* if (this._xformMode == this._DEC_XFORM_MODE) */ {
	                // Process final blocks
	                var finalProcessedBlocks = this._process(!!'flush');

	                // Unpad data
	                padding.unpad(finalProcessedBlocks);
	            }

	            return finalProcessedBlocks;
	        },

	        blockSize: 128/32
	    });

	    /**
	     * A collection of cipher parameters.
	     *
	     * @property {WordArray} ciphertext The raw ciphertext.
	     * @property {WordArray} key The key to this ciphertext.
	     * @property {WordArray} iv The IV used in the ciphering operation.
	     * @property {WordArray} salt The salt used with a key derivation function.
	     * @property {Cipher} algorithm The cipher algorithm.
	     * @property {Mode} mode The block mode used in the ciphering operation.
	     * @property {Padding} padding The padding scheme used in the ciphering operation.
	     * @property {number} blockSize The block size of the cipher.
	     * @property {Format} formatter The default formatting strategy to convert this cipher params object to a string.
	     */
	    var CipherParams = C_lib.CipherParams = Base.extend({
	        /**
	         * Initializes a newly created cipher params object.
	         *
	         * @param {Object} cipherParams An object with any of the possible cipher parameters.
	         *
	         * @example
	         *
	         *     var cipherParams = CryptoJS.lib.CipherParams.create({
	         *         ciphertext: ciphertextWordArray,
	         *         key: keyWordArray,
	         *         iv: ivWordArray,
	         *         salt: saltWordArray,
	         *         algorithm: CryptoJS.algo.AES,
	         *         mode: CryptoJS.mode.CBC,
	         *         padding: CryptoJS.pad.PKCS7,
	         *         blockSize: 4,
	         *         formatter: CryptoJS.format.OpenSSL
	         *     });
	         */
	        init: function (cipherParams) {
	            this.mixIn(cipherParams);
	        },

	        /**
	         * Converts this cipher params object to a string.
	         *
	         * @param {Format} formatter (Optional) The formatting strategy to use.
	         *
	         * @return {string} The stringified cipher params.
	         *
	         * @throws Error If neither the formatter nor the default formatter is set.
	         *
	         * @example
	         *
	         *     var string = cipherParams + '';
	         *     var string = cipherParams.toString();
	         *     var string = cipherParams.toString(CryptoJS.format.OpenSSL);
	         */
	        toString: function (formatter) {
	            return (formatter || this.formatter).stringify(this);
	        }
	    });

	    /**
	     * Format namespace.
	     */
	    var C_format = C.format = {};

	    /**
	     * OpenSSL formatting strategy.
	     */
	    var OpenSSLFormatter = C_format.OpenSSL = {
	        /**
	         * Converts a cipher params object to an OpenSSL-compatible string.
	         *
	         * @param {CipherParams} cipherParams The cipher params object.
	         *
	         * @return {string} The OpenSSL-compatible string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var openSSLString = CryptoJS.format.OpenSSL.stringify(cipherParams);
	         */
	        stringify: function (cipherParams) {
	            // Shortcuts
	            var ciphertext = cipherParams.ciphertext;
	            var salt = cipherParams.salt;

	            // Format
	            if (salt) {
	                var wordArray = WordArray.create([0x53616c74, 0x65645f5f]).concat(salt).concat(ciphertext);
	            } else {
	                var wordArray = ciphertext;
	            }

	            return wordArray.toString(Base64);
	        },

	        /**
	         * Converts an OpenSSL-compatible string to a cipher params object.
	         *
	         * @param {string} openSSLStr The OpenSSL-compatible string.
	         *
	         * @return {CipherParams} The cipher params object.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var cipherParams = CryptoJS.format.OpenSSL.parse(openSSLString);
	         */
	        parse: function (openSSLStr) {
	            // Parse base64
	            var ciphertext = Base64.parse(openSSLStr);

	            // Shortcut
	            var ciphertextWords = ciphertext.words;

	            // Test for salt
	            if (ciphertextWords[0] == 0x53616c74 && ciphertextWords[1] == 0x65645f5f) {
	                // Extract salt
	                var salt = WordArray.create(ciphertextWords.slice(2, 4));

	                // Remove salt from ciphertext
	                ciphertextWords.splice(0, 4);
	                ciphertext.sigBytes -= 16;
	            }

	            return CipherParams.create({ ciphertext: ciphertext, salt: salt });
	        }
	    };

	    /**
	     * A cipher wrapper that returns ciphertext as a serializable cipher params object.
	     */
	    var SerializableCipher = C_lib.SerializableCipher = Base.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {Formatter} format The formatting strategy to convert cipher param objects to and from a string. Default: OpenSSL
	         */
	        cfg: Base.extend({
	            format: OpenSSLFormatter
	        }),

	        /**
	         * Encrypts a message.
	         *
	         * @param {Cipher} cipher The cipher algorithm to use.
	         * @param {WordArray|string} message The message to encrypt.
	         * @param {WordArray} key The key.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @return {CipherParams} A cipher params object.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key);
	         *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv });
	         *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv, format: CryptoJS.format.OpenSSL });
	         */
	        encrypt: function (cipher, message, key, cfg) {
	            // Apply config defaults
	            cfg = this.cfg.extend(cfg);

	            // Encrypt
	            var encryptor = cipher.createEncryptor(key, cfg);
	            var ciphertext = encryptor.finalize(message);

	            // Shortcut
	            var cipherCfg = encryptor.cfg;

	            // Create and return serializable cipher params
	            return CipherParams.create({
	                ciphertext: ciphertext,
	                key: key,
	                iv: cipherCfg.iv,
	                algorithm: cipher,
	                mode: cipherCfg.mode,
	                padding: cipherCfg.padding,
	                blockSize: cipher.blockSize,
	                formatter: cfg.format
	            });
	        },

	        /**
	         * Decrypts serialized ciphertext.
	         *
	         * @param {Cipher} cipher The cipher algorithm to use.
	         * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
	         * @param {WordArray} key The key.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @return {WordArray} The plaintext.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, key, { iv: iv, format: CryptoJS.format.OpenSSL });
	         *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, key, { iv: iv, format: CryptoJS.format.OpenSSL });
	         */
	        decrypt: function (cipher, ciphertext, key, cfg) {
	            // Apply config defaults
	            cfg = this.cfg.extend(cfg);

	            // Convert string to CipherParams
	            ciphertext = this._parse(ciphertext, cfg.format);

	            // Decrypt
	            var plaintext = cipher.createDecryptor(key, cfg).finalize(ciphertext.ciphertext);

	            return plaintext;
	        },

	        /**
	         * Converts serialized ciphertext to CipherParams,
	         * else assumed CipherParams already and returns ciphertext unchanged.
	         *
	         * @param {CipherParams|string} ciphertext The ciphertext.
	         * @param {Formatter} format The formatting strategy to use to parse serialized ciphertext.
	         *
	         * @return {CipherParams} The unserialized ciphertext.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var ciphertextParams = CryptoJS.lib.SerializableCipher._parse(ciphertextStringOrParams, format);
	         */
	        _parse: function (ciphertext, format) {
	            if (typeof ciphertext == 'string') {
	                return format.parse(ciphertext, this);
	            } else {
	                return ciphertext;
	            }
	        }
	    });

	    /**
	     * Key derivation function namespace.
	     */
	    var C_kdf = C.kdf = {};

	    /**
	     * OpenSSL key derivation function.
	     */
	    var OpenSSLKdf = C_kdf.OpenSSL = {
	        /**
	         * Derives a key and IV from a password.
	         *
	         * @param {string} password The password to derive from.
	         * @param {number} keySize The size in words of the key to generate.
	         * @param {number} ivSize The size in words of the IV to generate.
	         * @param {WordArray|string} salt (Optional) A 64-bit salt to use. If omitted, a salt will be generated randomly.
	         *
	         * @return {CipherParams} A cipher params object with the key, IV, and salt.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32);
	         *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32, 'saltsalt');
	         */
	        execute: function (password, keySize, ivSize, salt) {
	            // Generate random salt
	            if (!salt) {
	                salt = WordArray.random(64/8);
	            }

	            // Derive key and IV
	            var key = EvpKDF.create({ keySize: keySize + ivSize }).compute(password, salt);

	            // Separate key and IV
	            var iv = WordArray.create(key.words.slice(keySize), ivSize * 4);
	            key.sigBytes = keySize * 4;

	            // Return params
	            return CipherParams.create({ key: key, iv: iv, salt: salt });
	        }
	    };

	    /**
	     * A serializable cipher wrapper that derives the key from a password,
	     * and returns ciphertext as a serializable cipher params object.
	     */
	    var PasswordBasedCipher = C_lib.PasswordBasedCipher = SerializableCipher.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {KDF} kdf The key derivation function to use to generate a key and IV from a password. Default: OpenSSL
	         */
	        cfg: SerializableCipher.cfg.extend({
	            kdf: OpenSSLKdf
	        }),

	        /**
	         * Encrypts a message using a password.
	         *
	         * @param {Cipher} cipher The cipher algorithm to use.
	         * @param {WordArray|string} message The message to encrypt.
	         * @param {string} password The password.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @return {CipherParams} A cipher params object.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password');
	         *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password', { format: CryptoJS.format.OpenSSL });
	         */
	        encrypt: function (cipher, message, password, cfg) {
	            // Apply config defaults
	            cfg = this.cfg.extend(cfg);

	            // Derive key and other params
	            var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize);

	            // Add IV to config
	            cfg.iv = derivedParams.iv;

	            // Encrypt
	            var ciphertext = SerializableCipher.encrypt.call(this, cipher, message, derivedParams.key, cfg);

	            // Mix in derived params
	            ciphertext.mixIn(derivedParams);

	            return ciphertext;
	        },

	        /**
	         * Decrypts serialized ciphertext using a password.
	         *
	         * @param {Cipher} cipher The cipher algorithm to use.
	         * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
	         * @param {string} password The password.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @return {WordArray} The plaintext.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, 'password', { format: CryptoJS.format.OpenSSL });
	         *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, 'password', { format: CryptoJS.format.OpenSSL });
	         */
	        decrypt: function (cipher, ciphertext, password, cfg) {
	            // Apply config defaults
	            cfg = this.cfg.extend(cfg);

	            // Convert string to CipherParams
	            ciphertext = this._parse(ciphertext, cfg.format);

	            // Derive key and other params
	            var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize, ciphertext.salt);

	            // Add IV to config
	            cfg.iv = derivedParams.iv;

	            // Decrypt
	            var plaintext = SerializableCipher.decrypt.call(this, cipher, ciphertext, derivedParams.key, cfg);

	            return plaintext;
	        }
	    });
	}());


	/**
	 * Cipher Feedback block mode.
	 */
	CryptoJS.mode.CFB = (function () {
	    var CFB = CryptoJS.lib.BlockCipherMode.extend();

	    CFB.Encryptor = CFB.extend({
	        processBlock: function (words, offset) {
	            // Shortcuts
	            var cipher = this._cipher;
	            var blockSize = cipher.blockSize;

	            generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);

	            // Remember this block to use with next block
	            this._prevBlock = words.slice(offset, offset + blockSize);
	        }
	    });

	    CFB.Decryptor = CFB.extend({
	        processBlock: function (words, offset) {
	            // Shortcuts
	            var cipher = this._cipher;
	            var blockSize = cipher.blockSize;

	            // Remember this block to use with next block
	            var thisBlock = words.slice(offset, offset + blockSize);

	            generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);

	            // This block becomes the previous block
	            this._prevBlock = thisBlock;
	        }
	    });

	    function generateKeystreamAndEncrypt(words, offset, blockSize, cipher) {
	        // Shortcut
	        var iv = this._iv;

	        // Generate keystream
	        if (iv) {
	            var keystream = iv.slice(0);

	            // Remove IV for subsequent blocks
	            this._iv = undefined;
	        } else {
	            var keystream = this._prevBlock;
	        }
	        cipher.encryptBlock(keystream, 0);

	        // Encrypt
	        for (var i = 0; i < blockSize; i++) {
	            words[offset + i] ^= keystream[i];
	        }
	    }

	    return CFB;
	}());


	/**
	 * Electronic Codebook block mode.
	 */
	CryptoJS.mode.ECB = (function () {
	    var ECB = CryptoJS.lib.BlockCipherMode.extend();

	    ECB.Encryptor = ECB.extend({
	        processBlock: function (words, offset) {
	            this._cipher.encryptBlock(words, offset);
	        }
	    });

	    ECB.Decryptor = ECB.extend({
	        processBlock: function (words, offset) {
	            this._cipher.decryptBlock(words, offset);
	        }
	    });

	    return ECB;
	}());


	/**
	 * ANSI X.923 padding strategy.
	 */
	CryptoJS.pad.AnsiX923 = {
	    pad: function (data, blockSize) {
	        // Shortcuts
	        var dataSigBytes = data.sigBytes;
	        var blockSizeBytes = blockSize * 4;

	        // Count padding bytes
	        var nPaddingBytes = blockSizeBytes - dataSigBytes % blockSizeBytes;

	        // Compute last byte position
	        var lastBytePos = dataSigBytes + nPaddingBytes - 1;

	        // Pad
	        data.clamp();
	        data.words[lastBytePos >>> 2] |= nPaddingBytes << (24 - (lastBytePos % 4) * 8);
	        data.sigBytes += nPaddingBytes;
	    },

	    unpad: function (data) {
	        // Get number of padding bytes from last byte
	        var nPaddingBytes = data.words[(data.sigBytes - 1) >>> 2] & 0xff;

	        // Remove padding
	        data.sigBytes -= nPaddingBytes;
	    }
	};


	/**
	 * ISO 10126 padding strategy.
	 */
	CryptoJS.pad.Iso10126 = {
	    pad: function (data, blockSize) {
	        // Shortcut
	        var blockSizeBytes = blockSize * 4;

	        // Count padding bytes
	        var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;

	        // Pad
	        data.concat(CryptoJS.lib.WordArray.random(nPaddingBytes - 1)).
	             concat(CryptoJS.lib.WordArray.create([nPaddingBytes << 24], 1));
	    },

	    unpad: function (data) {
	        // Get number of padding bytes from last byte
	        var nPaddingBytes = data.words[(data.sigBytes - 1) >>> 2] & 0xff;

	        // Remove padding
	        data.sigBytes -= nPaddingBytes;
	    }
	};


	/**
	 * ISO/IEC 9797-1 Padding Method 2.
	 */
	CryptoJS.pad.Iso97971 = {
	    pad: function (data, blockSize) {
	        // Add 0x80 byte
	        data.concat(CryptoJS.lib.WordArray.create([0x80000000], 1));

	        // Zero pad the rest
	        CryptoJS.pad.ZeroPadding.pad(data, blockSize);
	    },

	    unpad: function (data) {
	        // Remove zero padding
	        CryptoJS.pad.ZeroPadding.unpad(data);

	        // Remove one more byte -- the 0x80 byte
	        data.sigBytes--;
	    }
	};


	/**
	 * Output Feedback block mode.
	 */
	CryptoJS.mode.OFB = (function () {
	    var OFB = CryptoJS.lib.BlockCipherMode.extend();

	    var Encryptor = OFB.Encryptor = OFB.extend({
	        processBlock: function (words, offset) {
	            // Shortcuts
	            var cipher = this._cipher
	            var blockSize = cipher.blockSize;
	            var iv = this._iv;
	            var keystream = this._keystream;

	            // Generate keystream
	            if (iv) {
	                keystream = this._keystream = iv.slice(0);

	                // Remove IV for subsequent blocks
	                this._iv = undefined;
	            }
	            cipher.encryptBlock(keystream, 0);

	            // Encrypt
	            for (var i = 0; i < blockSize; i++) {
	                words[offset + i] ^= keystream[i];
	            }
	        }
	    });

	    OFB.Decryptor = Encryptor;

	    return OFB;
	}());


	/**
	 * A noop padding strategy.
	 */
	CryptoJS.pad.NoPadding = {
	    pad: function () {
	    },

	    unpad: function () {
	    }
	};


	(function (undefined) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var CipherParams = C_lib.CipherParams;
	    var C_enc = C.enc;
	    var Hex = C_enc.Hex;
	    var C_format = C.format;

	    var HexFormatter = C_format.Hex = {
	        /**
	         * Converts the ciphertext of a cipher params object to a hexadecimally encoded string.
	         *
	         * @param {CipherParams} cipherParams The cipher params object.
	         *
	         * @return {string} The hexadecimally encoded string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var hexString = CryptoJS.format.Hex.stringify(cipherParams);
	         */
	        stringify: function (cipherParams) {
	            return cipherParams.ciphertext.toString(Hex);
	        },

	        /**
	         * Converts a hexadecimally encoded ciphertext string to a cipher params object.
	         *
	         * @param {string} input The hexadecimally encoded string.
	         *
	         * @return {CipherParams} The cipher params object.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var cipherParams = CryptoJS.format.Hex.parse(hexString);
	         */
	        parse: function (input) {
	            var ciphertext = Hex.parse(input);
	            return CipherParams.create({ ciphertext: ciphertext });
	        }
	    };
	}());


	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var BlockCipher = C_lib.BlockCipher;
	    var C_algo = C.algo;

	    // Lookup tables
	    var SBOX = [];
	    var INV_SBOX = [];
	    var SUB_MIX_0 = [];
	    var SUB_MIX_1 = [];
	    var SUB_MIX_2 = [];
	    var SUB_MIX_3 = [];
	    var INV_SUB_MIX_0 = [];
	    var INV_SUB_MIX_1 = [];
	    var INV_SUB_MIX_2 = [];
	    var INV_SUB_MIX_3 = [];

	    // Compute lookup tables
	    (function () {
	        // Compute double table
	        var d = [];
	        for (var i = 0; i < 256; i++) {
	            if (i < 128) {
	                d[i] = i << 1;
	            } else {
	                d[i] = (i << 1) ^ 0x11b;
	            }
	        }

	        // Walk GF(2^8)
	        var x = 0;
	        var xi = 0;
	        for (var i = 0; i < 256; i++) {
	            // Compute sbox
	            var sx = xi ^ (xi << 1) ^ (xi << 2) ^ (xi << 3) ^ (xi << 4);
	            sx = (sx >>> 8) ^ (sx & 0xff) ^ 0x63;
	            SBOX[x] = sx;
	            INV_SBOX[sx] = x;

	            // Compute multiplication
	            var x2 = d[x];
	            var x4 = d[x2];
	            var x8 = d[x4];

	            // Compute sub bytes, mix columns tables
	            var t = (d[sx] * 0x101) ^ (sx * 0x1010100);
	            SUB_MIX_0[x] = (t << 24) | (t >>> 8);
	            SUB_MIX_1[x] = (t << 16) | (t >>> 16);
	            SUB_MIX_2[x] = (t << 8)  | (t >>> 24);
	            SUB_MIX_3[x] = t;

	            // Compute inv sub bytes, inv mix columns tables
	            var t = (x8 * 0x1010101) ^ (x4 * 0x10001) ^ (x2 * 0x101) ^ (x * 0x1010100);
	            INV_SUB_MIX_0[sx] = (t << 24) | (t >>> 8);
	            INV_SUB_MIX_1[sx] = (t << 16) | (t >>> 16);
	            INV_SUB_MIX_2[sx] = (t << 8)  | (t >>> 24);
	            INV_SUB_MIX_3[sx] = t;

	            // Compute next counter
	            if (!x) {
	                x = xi = 1;
	            } else {
	                x = x2 ^ d[d[d[x8 ^ x2]]];
	                xi ^= d[d[xi]];
	            }
	        }
	    }());

	    // Precomputed Rcon lookup
	    var RCON = [0x00, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36];

	    /**
	     * AES block cipher algorithm.
	     */
	    var AES = C_algo.AES = BlockCipher.extend({
	        _doReset: function () {
	            // Shortcuts
	            var key = this._key;
	            var keyWords = key.words;
	            var keySize = key.sigBytes / 4;

	            // Compute number of rounds
	            var nRounds = this._nRounds = keySize + 6

	            // Compute number of key schedule rows
	            var ksRows = (nRounds + 1) * 4;

	            // Compute key schedule
	            var keySchedule = this._keySchedule = [];
	            for (var ksRow = 0; ksRow < ksRows; ksRow++) {
	                if (ksRow < keySize) {
	                    keySchedule[ksRow] = keyWords[ksRow];
	                } else {
	                    var t = keySchedule[ksRow - 1];

	                    if (!(ksRow % keySize)) {
	                        // Rot word
	                        t = (t << 8) | (t >>> 24);

	                        // Sub word
	                        t = (SBOX[t >>> 24] << 24) | (SBOX[(t >>> 16) & 0xff] << 16) | (SBOX[(t >>> 8) & 0xff] << 8) | SBOX[t & 0xff];

	                        // Mix Rcon
	                        t ^= RCON[(ksRow / keySize) | 0] << 24;
	                    } else if (keySize > 6 && ksRow % keySize == 4) {
	                        // Sub word
	                        t = (SBOX[t >>> 24] << 24) | (SBOX[(t >>> 16) & 0xff] << 16) | (SBOX[(t >>> 8) & 0xff] << 8) | SBOX[t & 0xff];
	                    }

	                    keySchedule[ksRow] = keySchedule[ksRow - keySize] ^ t;
	                }
	            }

	            // Compute inv key schedule
	            var invKeySchedule = this._invKeySchedule = [];
	            for (var invKsRow = 0; invKsRow < ksRows; invKsRow++) {
	                var ksRow = ksRows - invKsRow;

	                if (invKsRow % 4) {
	                    var t = keySchedule[ksRow];
	                } else {
	                    var t = keySchedule[ksRow - 4];
	                }

	                if (invKsRow < 4 || ksRow <= 4) {
	                    invKeySchedule[invKsRow] = t;
	                } else {
	                    invKeySchedule[invKsRow] = INV_SUB_MIX_0[SBOX[t >>> 24]] ^ INV_SUB_MIX_1[SBOX[(t >>> 16) & 0xff]] ^
	                                               INV_SUB_MIX_2[SBOX[(t >>> 8) & 0xff]] ^ INV_SUB_MIX_3[SBOX[t & 0xff]];
	                }
	            }
	        },

	        encryptBlock: function (M, offset) {
	            this._doCryptBlock(M, offset, this._keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX);
	        },

	        decryptBlock: function (M, offset) {
	            // Swap 2nd and 4th rows
	            var t = M[offset + 1];
	            M[offset + 1] = M[offset + 3];
	            M[offset + 3] = t;

	            this._doCryptBlock(M, offset, this._invKeySchedule, INV_SUB_MIX_0, INV_SUB_MIX_1, INV_SUB_MIX_2, INV_SUB_MIX_3, INV_SBOX);

	            // Inv swap 2nd and 4th rows
	            var t = M[offset + 1];
	            M[offset + 1] = M[offset + 3];
	            M[offset + 3] = t;
	        },

	        _doCryptBlock: function (M, offset, keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX) {
	            // Shortcut
	            var nRounds = this._nRounds;

	            // Get input, add round key
	            var s0 = M[offset]     ^ keySchedule[0];
	            var s1 = M[offset + 1] ^ keySchedule[1];
	            var s2 = M[offset + 2] ^ keySchedule[2];
	            var s3 = M[offset + 3] ^ keySchedule[3];

	            // Key schedule row counter
	            var ksRow = 4;

	            // Rounds
	            for (var round = 1; round < nRounds; round++) {
	                // Shift rows, sub bytes, mix columns, add round key
	                var t0 = SUB_MIX_0[s0 >>> 24] ^ SUB_MIX_1[(s1 >>> 16) & 0xff] ^ SUB_MIX_2[(s2 >>> 8) & 0xff] ^ SUB_MIX_3[s3 & 0xff] ^ keySchedule[ksRow++];
	                var t1 = SUB_MIX_0[s1 >>> 24] ^ SUB_MIX_1[(s2 >>> 16) & 0xff] ^ SUB_MIX_2[(s3 >>> 8) & 0xff] ^ SUB_MIX_3[s0 & 0xff] ^ keySchedule[ksRow++];
	                var t2 = SUB_MIX_0[s2 >>> 24] ^ SUB_MIX_1[(s3 >>> 16) & 0xff] ^ SUB_MIX_2[(s0 >>> 8) & 0xff] ^ SUB_MIX_3[s1 & 0xff] ^ keySchedule[ksRow++];
	                var t3 = SUB_MIX_0[s3 >>> 24] ^ SUB_MIX_1[(s0 >>> 16) & 0xff] ^ SUB_MIX_2[(s1 >>> 8) & 0xff] ^ SUB_MIX_3[s2 & 0xff] ^ keySchedule[ksRow++];

	                // Update state
	                s0 = t0;
	                s1 = t1;
	                s2 = t2;
	                s3 = t3;
	            }

	            // Shift rows, sub bytes, add round key
	            var t0 = ((SBOX[s0 >>> 24] << 24) | (SBOX[(s1 >>> 16) & 0xff] << 16) | (SBOX[(s2 >>> 8) & 0xff] << 8) | SBOX[s3 & 0xff]) ^ keySchedule[ksRow++];
	            var t1 = ((SBOX[s1 >>> 24] << 24) | (SBOX[(s2 >>> 16) & 0xff] << 16) | (SBOX[(s3 >>> 8) & 0xff] << 8) | SBOX[s0 & 0xff]) ^ keySchedule[ksRow++];
	            var t2 = ((SBOX[s2 >>> 24] << 24) | (SBOX[(s3 >>> 16) & 0xff] << 16) | (SBOX[(s0 >>> 8) & 0xff] << 8) | SBOX[s1 & 0xff]) ^ keySchedule[ksRow++];
	            var t3 = ((SBOX[s3 >>> 24] << 24) | (SBOX[(s0 >>> 16) & 0xff] << 16) | (SBOX[(s1 >>> 8) & 0xff] << 8) | SBOX[s2 & 0xff]) ^ keySchedule[ksRow++];

	            // Set output
	            M[offset]     = t0;
	            M[offset + 1] = t1;
	            M[offset + 2] = t2;
	            M[offset + 3] = t3;
	        },

	        keySize: 256/32
	    });

	    /**
	     * Shortcut functions to the cipher's object interface.
	     *
	     * @example
	     *
	     *     var ciphertext = CryptoJS.AES.encrypt(message, key, cfg);
	     *     var plaintext  = CryptoJS.AES.decrypt(ciphertext, key, cfg);
	     */
	    C.AES = BlockCipher._createHelper(AES);
	}());


	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var BlockCipher = C_lib.BlockCipher;
	    var C_algo = C.algo;

	    // Permuted Choice 1 constants
	    var PC1 = [
	        57, 49, 41, 33, 25, 17, 9,  1,
	        58, 50, 42, 34, 26, 18, 10, 2,
	        59, 51, 43, 35, 27, 19, 11, 3,
	        60, 52, 44, 36, 63, 55, 47, 39,
	        31, 23, 15, 7,  62, 54, 46, 38,
	        30, 22, 14, 6,  61, 53, 45, 37,
	        29, 21, 13, 5,  28, 20, 12, 4
	    ];

	    // Permuted Choice 2 constants
	    var PC2 = [
	        14, 17, 11, 24, 1,  5,
	        3,  28, 15, 6,  21, 10,
	        23, 19, 12, 4,  26, 8,
	        16, 7,  27, 20, 13, 2,
	        41, 52, 31, 37, 47, 55,
	        30, 40, 51, 45, 33, 48,
	        44, 49, 39, 56, 34, 53,
	        46, 42, 50, 36, 29, 32
	    ];

	    // Cumulative bit shift constants
	    var BIT_SHIFTS = [1,  2,  4,  6,  8,  10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28];

	    // SBOXes and round permutation constants
	    var SBOX_P = [
	        {
	            0x0: 0x808200,
	            0x10000000: 0x8000,
	            0x20000000: 0x808002,
	            0x30000000: 0x2,
	            0x40000000: 0x200,
	            0x50000000: 0x808202,
	            0x60000000: 0x800202,
	            0x70000000: 0x800000,
	            0x80000000: 0x202,
	            0x90000000: 0x800200,
	            0xa0000000: 0x8200,
	            0xb0000000: 0x808000,
	            0xc0000000: 0x8002,
	            0xd0000000: 0x800002,
	            0xe0000000: 0x0,
	            0xf0000000: 0x8202,
	            0x8000000: 0x0,
	            0x18000000: 0x808202,
	            0x28000000: 0x8202,
	            0x38000000: 0x8000,
	            0x48000000: 0x808200,
	            0x58000000: 0x200,
	            0x68000000: 0x808002,
	            0x78000000: 0x2,
	            0x88000000: 0x800200,
	            0x98000000: 0x8200,
	            0xa8000000: 0x808000,
	            0xb8000000: 0x800202,
	            0xc8000000: 0x800002,
	            0xd8000000: 0x8002,
	            0xe8000000: 0x202,
	            0xf8000000: 0x800000,
	            0x1: 0x8000,
	            0x10000001: 0x2,
	            0x20000001: 0x808200,
	            0x30000001: 0x800000,
	            0x40000001: 0x808002,
	            0x50000001: 0x8200,
	            0x60000001: 0x200,
	            0x70000001: 0x800202,
	            0x80000001: 0x808202,
	            0x90000001: 0x808000,
	            0xa0000001: 0x800002,
	            0xb0000001: 0x8202,
	            0xc0000001: 0x202,
	            0xd0000001: 0x800200,
	            0xe0000001: 0x8002,
	            0xf0000001: 0x0,
	            0x8000001: 0x808202,
	            0x18000001: 0x808000,
	            0x28000001: 0x800000,
	            0x38000001: 0x200,
	            0x48000001: 0x8000,
	            0x58000001: 0x800002,
	            0x68000001: 0x2,
	            0x78000001: 0x8202,
	            0x88000001: 0x8002,
	            0x98000001: 0x800202,
	            0xa8000001: 0x202,
	            0xb8000001: 0x808200,
	            0xc8000001: 0x800200,
	            0xd8000001: 0x0,
	            0xe8000001: 0x8200,
	            0xf8000001: 0x808002
	        },
	        {
	            0x0: 0x40084010,
	            0x1000000: 0x4000,
	            0x2000000: 0x80000,
	            0x3000000: 0x40080010,
	            0x4000000: 0x40000010,
	            0x5000000: 0x40084000,
	            0x6000000: 0x40004000,
	            0x7000000: 0x10,
	            0x8000000: 0x84000,
	            0x9000000: 0x40004010,
	            0xa000000: 0x40000000,
	            0xb000000: 0x84010,
	            0xc000000: 0x80010,
	            0xd000000: 0x0,
	            0xe000000: 0x4010,
	            0xf000000: 0x40080000,
	            0x800000: 0x40004000,
	            0x1800000: 0x84010,
	            0x2800000: 0x10,
	            0x3800000: 0x40004010,
	            0x4800000: 0x40084010,
	            0x5800000: 0x40000000,
	            0x6800000: 0x80000,
	            0x7800000: 0x40080010,
	            0x8800000: 0x80010,
	            0x9800000: 0x0,
	            0xa800000: 0x4000,
	            0xb800000: 0x40080000,
	            0xc800000: 0x40000010,
	            0xd800000: 0x84000,
	            0xe800000: 0x40084000,
	            0xf800000: 0x4010,
	            0x10000000: 0x0,
	            0x11000000: 0x40080010,
	            0x12000000: 0x40004010,
	            0x13000000: 0x40084000,
	            0x14000000: 0x40080000,
	            0x15000000: 0x10,
	            0x16000000: 0x84010,
	            0x17000000: 0x4000,
	            0x18000000: 0x4010,
	            0x19000000: 0x80000,
	            0x1a000000: 0x80010,
	            0x1b000000: 0x40000010,
	            0x1c000000: 0x84000,
	            0x1d000000: 0x40004000,
	            0x1e000000: 0x40000000,
	            0x1f000000: 0x40084010,
	            0x10800000: 0x84010,
	            0x11800000: 0x80000,
	            0x12800000: 0x40080000,
	            0x13800000: 0x4000,
	            0x14800000: 0x40004000,
	            0x15800000: 0x40084010,
	            0x16800000: 0x10,
	            0x17800000: 0x40000000,
	            0x18800000: 0x40084000,
	            0x19800000: 0x40000010,
	            0x1a800000: 0x40004010,
	            0x1b800000: 0x80010,
	            0x1c800000: 0x0,
	            0x1d800000: 0x4010,
	            0x1e800000: 0x40080010,
	            0x1f800000: 0x84000
	        },
	        {
	            0x0: 0x104,
	            0x100000: 0x0,
	            0x200000: 0x4000100,
	            0x300000: 0x10104,
	            0x400000: 0x10004,
	            0x500000: 0x4000004,
	            0x600000: 0x4010104,
	            0x700000: 0x4010000,
	            0x800000: 0x4000000,
	            0x900000: 0x4010100,
	            0xa00000: 0x10100,
	            0xb00000: 0x4010004,
	            0xc00000: 0x4000104,
	            0xd00000: 0x10000,
	            0xe00000: 0x4,
	            0xf00000: 0x100,
	            0x80000: 0x4010100,
	            0x180000: 0x4010004,
	            0x280000: 0x0,
	            0x380000: 0x4000100,
	            0x480000: 0x4000004,
	            0x580000: 0x10000,
	            0x680000: 0x10004,
	            0x780000: 0x104,
	            0x880000: 0x4,
	            0x980000: 0x100,
	            0xa80000: 0x4010000,
	            0xb80000: 0x10104,
	            0xc80000: 0x10100,
	            0xd80000: 0x4000104,
	            0xe80000: 0x4010104,
	            0xf80000: 0x4000000,
	            0x1000000: 0x4010100,
	            0x1100000: 0x10004,
	            0x1200000: 0x10000,
	            0x1300000: 0x4000100,
	            0x1400000: 0x100,
	            0x1500000: 0x4010104,
	            0x1600000: 0x4000004,
	            0x1700000: 0x0,
	            0x1800000: 0x4000104,
	            0x1900000: 0x4000000,
	            0x1a00000: 0x4,
	            0x1b00000: 0x10100,
	            0x1c00000: 0x4010000,
	            0x1d00000: 0x104,
	            0x1e00000: 0x10104,
	            0x1f00000: 0x4010004,
	            0x1080000: 0x4000000,
	            0x1180000: 0x104,
	            0x1280000: 0x4010100,
	            0x1380000: 0x0,
	            0x1480000: 0x10004,
	            0x1580000: 0x4000100,
	            0x1680000: 0x100,
	            0x1780000: 0x4010004,
	            0x1880000: 0x10000,
	            0x1980000: 0x4010104,
	            0x1a80000: 0x10104,
	            0x1b80000: 0x4000004,
	            0x1c80000: 0x4000104,
	            0x1d80000: 0x4010000,
	            0x1e80000: 0x4,
	            0x1f80000: 0x10100
	        },
	        {
	            0x0: 0x80401000,
	            0x10000: 0x80001040,
	            0x20000: 0x401040,
	            0x30000: 0x80400000,
	            0x40000: 0x0,
	            0x50000: 0x401000,
	            0x60000: 0x80000040,
	            0x70000: 0x400040,
	            0x80000: 0x80000000,
	            0x90000: 0x400000,
	            0xa0000: 0x40,
	            0xb0000: 0x80001000,
	            0xc0000: 0x80400040,
	            0xd0000: 0x1040,
	            0xe0000: 0x1000,
	            0xf0000: 0x80401040,
	            0x8000: 0x80001040,
	            0x18000: 0x40,
	            0x28000: 0x80400040,
	            0x38000: 0x80001000,
	            0x48000: 0x401000,
	            0x58000: 0x80401040,
	            0x68000: 0x0,
	            0x78000: 0x80400000,
	            0x88000: 0x1000,
	            0x98000: 0x80401000,
	            0xa8000: 0x400000,
	            0xb8000: 0x1040,
	            0xc8000: 0x80000000,
	            0xd8000: 0x400040,
	            0xe8000: 0x401040,
	            0xf8000: 0x80000040,
	            0x100000: 0x400040,
	            0x110000: 0x401000,
	            0x120000: 0x80000040,
	            0x130000: 0x0,
	            0x140000: 0x1040,
	            0x150000: 0x80400040,
	            0x160000: 0x80401000,
	            0x170000: 0x80001040,
	            0x180000: 0x80401040,
	            0x190000: 0x80000000,
	            0x1a0000: 0x80400000,
	            0x1b0000: 0x401040,
	            0x1c0000: 0x80001000,
	            0x1d0000: 0x400000,
	            0x1e0000: 0x40,
	            0x1f0000: 0x1000,
	            0x108000: 0x80400000,
	            0x118000: 0x80401040,
	            0x128000: 0x0,
	            0x138000: 0x401000,
	            0x148000: 0x400040,
	            0x158000: 0x80000000,
	            0x168000: 0x80001040,
	            0x178000: 0x40,
	            0x188000: 0x80000040,
	            0x198000: 0x1000,
	            0x1a8000: 0x80001000,
	            0x1b8000: 0x80400040,
	            0x1c8000: 0x1040,
	            0x1d8000: 0x80401000,
	            0x1e8000: 0x400000,
	            0x1f8000: 0x401040
	        },
	        {
	            0x0: 0x80,
	            0x1000: 0x1040000,
	            0x2000: 0x40000,
	            0x3000: 0x20000000,
	            0x4000: 0x20040080,
	            0x5000: 0x1000080,
	            0x6000: 0x21000080,
	            0x7000: 0x40080,
	            0x8000: 0x1000000,
	            0x9000: 0x20040000,
	            0xa000: 0x20000080,
	            0xb000: 0x21040080,
	            0xc000: 0x21040000,
	            0xd000: 0x0,
	            0xe000: 0x1040080,
	            0xf000: 0x21000000,
	            0x800: 0x1040080,
	            0x1800: 0x21000080,
	            0x2800: 0x80,
	            0x3800: 0x1040000,
	            0x4800: 0x40000,
	            0x5800: 0x20040080,
	            0x6800: 0x21040000,
	            0x7800: 0x20000000,
	            0x8800: 0x20040000,
	            0x9800: 0x0,
	            0xa800: 0x21040080,
	            0xb800: 0x1000080,
	            0xc800: 0x20000080,
	            0xd800: 0x21000000,
	            0xe800: 0x1000000,
	            0xf800: 0x40080,
	            0x10000: 0x40000,
	            0x11000: 0x80,
	            0x12000: 0x20000000,
	            0x13000: 0x21000080,
	            0x14000: 0x1000080,
	            0x15000: 0x21040000,
	            0x16000: 0x20040080,
	            0x17000: 0x1000000,
	            0x18000: 0x21040080,
	            0x19000: 0x21000000,
	            0x1a000: 0x1040000,
	            0x1b000: 0x20040000,
	            0x1c000: 0x40080,
	            0x1d000: 0x20000080,
	            0x1e000: 0x0,
	            0x1f000: 0x1040080,
	            0x10800: 0x21000080,
	            0x11800: 0x1000000,
	            0x12800: 0x1040000,
	            0x13800: 0x20040080,
	            0x14800: 0x20000000,
	            0x15800: 0x1040080,
	            0x16800: 0x80,
	            0x17800: 0x21040000,
	            0x18800: 0x40080,
	            0x19800: 0x21040080,
	            0x1a800: 0x0,
	            0x1b800: 0x21000000,
	            0x1c800: 0x1000080,
	            0x1d800: 0x40000,
	            0x1e800: 0x20040000,
	            0x1f800: 0x20000080
	        },
	        {
	            0x0: 0x10000008,
	            0x100: 0x2000,
	            0x200: 0x10200000,
	            0x300: 0x10202008,
	            0x400: 0x10002000,
	            0x500: 0x200000,
	            0x600: 0x200008,
	            0x700: 0x10000000,
	            0x800: 0x0,
	            0x900: 0x10002008,
	            0xa00: 0x202000,
	            0xb00: 0x8,
	            0xc00: 0x10200008,
	            0xd00: 0x202008,
	            0xe00: 0x2008,
	            0xf00: 0x10202000,
	            0x80: 0x10200000,
	            0x180: 0x10202008,
	            0x280: 0x8,
	            0x380: 0x200000,
	            0x480: 0x202008,
	            0x580: 0x10000008,
	            0x680: 0x10002000,
	            0x780: 0x2008,
	            0x880: 0x200008,
	            0x980: 0x2000,
	            0xa80: 0x10002008,
	            0xb80: 0x10200008,
	            0xc80: 0x0,
	            0xd80: 0x10202000,
	            0xe80: 0x202000,
	            0xf80: 0x10000000,
	            0x1000: 0x10002000,
	            0x1100: 0x10200008,
	            0x1200: 0x10202008,
	            0x1300: 0x2008,
	            0x1400: 0x200000,
	            0x1500: 0x10000000,
	            0x1600: 0x10000008,
	            0x1700: 0x202000,
	            0x1800: 0x202008,
	            0x1900: 0x0,
	            0x1a00: 0x8,
	            0x1b00: 0x10200000,
	            0x1c00: 0x2000,
	            0x1d00: 0x10002008,
	            0x1e00: 0x10202000,
	            0x1f00: 0x200008,
	            0x1080: 0x8,
	            0x1180: 0x202000,
	            0x1280: 0x200000,
	            0x1380: 0x10000008,
	            0x1480: 0x10002000,
	            0x1580: 0x2008,
	            0x1680: 0x10202008,
	            0x1780: 0x10200000,
	            0x1880: 0x10202000,
	            0x1980: 0x10200008,
	            0x1a80: 0x2000,
	            0x1b80: 0x202008,
	            0x1c80: 0x200008,
	            0x1d80: 0x0,
	            0x1e80: 0x10000000,
	            0x1f80: 0x10002008
	        },
	        {
	            0x0: 0x100000,
	            0x10: 0x2000401,
	            0x20: 0x400,
	            0x30: 0x100401,
	            0x40: 0x2100401,
	            0x50: 0x0,
	            0x60: 0x1,
	            0x70: 0x2100001,
	            0x80: 0x2000400,
	            0x90: 0x100001,
	            0xa0: 0x2000001,
	            0xb0: 0x2100400,
	            0xc0: 0x2100000,
	            0xd0: 0x401,
	            0xe0: 0x100400,
	            0xf0: 0x2000000,
	            0x8: 0x2100001,
	            0x18: 0x0,
	            0x28: 0x2000401,
	            0x38: 0x2100400,
	            0x48: 0x100000,
	            0x58: 0x2000001,
	            0x68: 0x2000000,
	            0x78: 0x401,
	            0x88: 0x100401,
	            0x98: 0x2000400,
	            0xa8: 0x2100000,
	            0xb8: 0x100001,
	            0xc8: 0x400,
	            0xd8: 0x2100401,
	            0xe8: 0x1,
	            0xf8: 0x100400,
	            0x100: 0x2000000,
	            0x110: 0x100000,
	            0x120: 0x2000401,
	            0x130: 0x2100001,
	            0x140: 0x100001,
	            0x150: 0x2000400,
	            0x160: 0x2100400,
	            0x170: 0x100401,
	            0x180: 0x401,
	            0x190: 0x2100401,
	            0x1a0: 0x100400,
	            0x1b0: 0x1,
	            0x1c0: 0x0,
	            0x1d0: 0x2100000,
	            0x1e0: 0x2000001,
	            0x1f0: 0x400,
	            0x108: 0x100400,
	            0x118: 0x2000401,
	            0x128: 0x2100001,
	            0x138: 0x1,
	            0x148: 0x2000000,
	            0x158: 0x100000,
	            0x168: 0x401,
	            0x178: 0x2100400,
	            0x188: 0x2000001,
	            0x198: 0x2100000,
	            0x1a8: 0x0,
	            0x1b8: 0x2100401,
	            0x1c8: 0x100401,
	            0x1d8: 0x400,
	            0x1e8: 0x2000400,
	            0x1f8: 0x100001
	        },
	        {
	            0x0: 0x8000820,
	            0x1: 0x20000,
	            0x2: 0x8000000,
	            0x3: 0x20,
	            0x4: 0x20020,
	            0x5: 0x8020820,
	            0x6: 0x8020800,
	            0x7: 0x800,
	            0x8: 0x8020000,
	            0x9: 0x8000800,
	            0xa: 0x20800,
	            0xb: 0x8020020,
	            0xc: 0x820,
	            0xd: 0x0,
	            0xe: 0x8000020,
	            0xf: 0x20820,
	            0x80000000: 0x800,
	            0x80000001: 0x8020820,
	            0x80000002: 0x8000820,
	            0x80000003: 0x8000000,
	            0x80000004: 0x8020000,
	            0x80000005: 0x20800,
	            0x80000006: 0x20820,
	            0x80000007: 0x20,
	            0x80000008: 0x8000020,
	            0x80000009: 0x820,
	            0x8000000a: 0x20020,
	            0x8000000b: 0x8020800,
	            0x8000000c: 0x0,
	            0x8000000d: 0x8020020,
	            0x8000000e: 0x8000800,
	            0x8000000f: 0x20000,
	            0x10: 0x20820,
	            0x11: 0x8020800,
	            0x12: 0x20,
	            0x13: 0x800,
	            0x14: 0x8000800,
	            0x15: 0x8000020,
	            0x16: 0x8020020,
	            0x17: 0x20000,
	            0x18: 0x0,
	            0x19: 0x20020,
	            0x1a: 0x8020000,
	            0x1b: 0x8000820,
	            0x1c: 0x8020820,
	            0x1d: 0x20800,
	            0x1e: 0x820,
	            0x1f: 0x8000000,
	            0x80000010: 0x20000,
	            0x80000011: 0x800,
	            0x80000012: 0x8020020,
	            0x80000013: 0x20820,
	            0x80000014: 0x20,
	            0x80000015: 0x8020000,
	            0x80000016: 0x8000000,
	            0x80000017: 0x8000820,
	            0x80000018: 0x8020820,
	            0x80000019: 0x8000020,
	            0x8000001a: 0x8000800,
	            0x8000001b: 0x0,
	            0x8000001c: 0x20800,
	            0x8000001d: 0x820,
	            0x8000001e: 0x20020,
	            0x8000001f: 0x8020800
	        }
	    ];

	    // Masks that select the SBOX input
	    var SBOX_MASK = [
	        0xf8000001, 0x1f800000, 0x01f80000, 0x001f8000,
	        0x0001f800, 0x00001f80, 0x000001f8, 0x8000001f
	    ];

	    /**
	     * DES block cipher algorithm.
	     */
	    var DES = C_algo.DES = BlockCipher.extend({
	        _doReset: function () {
	            // Shortcuts
	            var key = this._key;
	            var keyWords = key.words;

	            // Select 56 bits according to PC1
	            var keyBits = [];
	            for (var i = 0; i < 56; i++) {
	                var keyBitPos = PC1[i] - 1;
	                keyBits[i] = (keyWords[keyBitPos >>> 5] >>> (31 - keyBitPos % 32)) & 1;
	            }

	            // Assemble 16 subkeys
	            var subKeys = this._subKeys = [];
	            for (var nSubKey = 0; nSubKey < 16; nSubKey++) {
	                // Create subkey
	                var subKey = subKeys[nSubKey] = [];

	                // Shortcut
	                var bitShift = BIT_SHIFTS[nSubKey];

	                // Select 48 bits according to PC2
	                for (var i = 0; i < 24; i++) {
	                    // Select from the left 28 key bits
	                    subKey[(i / 6) | 0] |= keyBits[((PC2[i] - 1) + bitShift) % 28] << (31 - i % 6);

	                    // Select from the right 28 key bits
	                    subKey[4 + ((i / 6) | 0)] |= keyBits[28 + (((PC2[i + 24] - 1) + bitShift) % 28)] << (31 - i % 6);
	                }

	                // Since each subkey is applied to an expanded 32-bit input,
	                // the subkey can be broken into 8 values scaled to 32-bits,
	                // which allows the key to be used without expansion
	                subKey[0] = (subKey[0] << 1) | (subKey[0] >>> 31);
	                for (var i = 1; i < 7; i++) {
	                    subKey[i] = subKey[i] >>> ((i - 1) * 4 + 3);
	                }
	                subKey[7] = (subKey[7] << 5) | (subKey[7] >>> 27);
	            }

	            // Compute inverse subkeys
	            var invSubKeys = this._invSubKeys = [];
	            for (var i = 0; i < 16; i++) {
	                invSubKeys[i] = subKeys[15 - i];
	            }
	        },

	        encryptBlock: function (M, offset) {
	            this._doCryptBlock(M, offset, this._subKeys);
	        },

	        decryptBlock: function (M, offset) {
	            this._doCryptBlock(M, offset, this._invSubKeys);
	        },

	        _doCryptBlock: function (M, offset, subKeys) {
	            // Get input
	            this._lBlock = M[offset];
	            this._rBlock = M[offset + 1];

	            // Initial permutation
	            exchangeLR.call(this, 4,  0x0f0f0f0f);
	            exchangeLR.call(this, 16, 0x0000ffff);
	            exchangeRL.call(this, 2,  0x33333333);
	            exchangeRL.call(this, 8,  0x00ff00ff);
	            exchangeLR.call(this, 1,  0x55555555);

	            // Rounds
	            for (var round = 0; round < 16; round++) {
	                // Shortcuts
	                var subKey = subKeys[round];
	                var lBlock = this._lBlock;
	                var rBlock = this._rBlock;

	                // Feistel function
	                var f = 0;
	                for (var i = 0; i < 8; i++) {
	                    f |= SBOX_P[i][((rBlock ^ subKey[i]) & SBOX_MASK[i]) >>> 0];
	                }
	                this._lBlock = rBlock;
	                this._rBlock = lBlock ^ f;
	            }

	            // Undo swap from last round
	            var t = this._lBlock;
	            this._lBlock = this._rBlock;
	            this._rBlock = t;

	            // Final permutation
	            exchangeLR.call(this, 1,  0x55555555);
	            exchangeRL.call(this, 8,  0x00ff00ff);
	            exchangeRL.call(this, 2,  0x33333333);
	            exchangeLR.call(this, 16, 0x0000ffff);
	            exchangeLR.call(this, 4,  0x0f0f0f0f);

	            // Set output
	            M[offset] = this._lBlock;
	            M[offset + 1] = this._rBlock;
	        },

	        keySize: 64/32,

	        ivSize: 64/32,

	        blockSize: 64/32
	    });

	    // Swap bits across the left and right words
	    function exchangeLR(offset, mask) {
	        var t = ((this._lBlock >>> offset) ^ this._rBlock) & mask;
	        this._rBlock ^= t;
	        this._lBlock ^= t << offset;
	    }

	    function exchangeRL(offset, mask) {
	        var t = ((this._rBlock >>> offset) ^ this._lBlock) & mask;
	        this._lBlock ^= t;
	        this._rBlock ^= t << offset;
	    }

	    /**
	     * Shortcut functions to the cipher's object interface.
	     *
	     * @example
	     *
	     *     var ciphertext = CryptoJS.DES.encrypt(message, key, cfg);
	     *     var plaintext  = CryptoJS.DES.decrypt(ciphertext, key, cfg);
	     */
	    C.DES = BlockCipher._createHelper(DES);

	    /**
	     * Triple-DES block cipher algorithm.
	     */
	    var TripleDES = C_algo.TripleDES = BlockCipher.extend({
	        _doReset: function () {
	            // Shortcuts
	            var key = this._key;
	            var keyWords = key.words;

	            // Create DES instances
	            this._des1 = DES.createEncryptor(WordArray.create(keyWords.slice(0, 2)));
	            this._des2 = DES.createEncryptor(WordArray.create(keyWords.slice(2, 4)));
	            this._des3 = DES.createEncryptor(WordArray.create(keyWords.slice(4, 6)));
	        },

	        encryptBlock: function (M, offset) {
	            this._des1.encryptBlock(M, offset);
	            this._des2.decryptBlock(M, offset);
	            this._des3.encryptBlock(M, offset);
	        },

	        decryptBlock: function (M, offset) {
	            this._des3.decryptBlock(M, offset);
	            this._des2.encryptBlock(M, offset);
	            this._des1.decryptBlock(M, offset);
	        },

	        keySize: 192/32,

	        ivSize: 64/32,

	        blockSize: 64/32
	    });

	    /**
	     * Shortcut functions to the cipher's object interface.
	     *
	     * @example
	     *
	     *     var ciphertext = CryptoJS.TripleDES.encrypt(message, key, cfg);
	     *     var plaintext  = CryptoJS.TripleDES.decrypt(ciphertext, key, cfg);
	     */
	    C.TripleDES = BlockCipher._createHelper(TripleDES);
	}());


	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var StreamCipher = C_lib.StreamCipher;
	    var C_algo = C.algo;

	    /**
	     * RC4 stream cipher algorithm.
	     */
	    var RC4 = C_algo.RC4 = StreamCipher.extend({
	        _doReset: function () {
	            // Shortcuts
	            var key = this._key;
	            var keyWords = key.words;
	            var keySigBytes = key.sigBytes;

	            // Init sbox
	            var S = this._S = [];
	            for (var i = 0; i < 256; i++) {
	                S[i] = i;
	            }

	            // Key setup
	            for (var i = 0, j = 0; i < 256; i++) {
	                var keyByteIndex = i % keySigBytes;
	                var keyByte = (keyWords[keyByteIndex >>> 2] >>> (24 - (keyByteIndex % 4) * 8)) & 0xff;

	                j = (j + S[i] + keyByte) % 256;

	                // Swap
	                var t = S[i];
	                S[i] = S[j];
	                S[j] = t;
	            }

	            // Counters
	            this._i = this._j = 0;
	        },

	        _doProcessBlock: function (M, offset) {
	            M[offset] ^= generateKeystreamWord.call(this);
	        },

	        keySize: 256/32,

	        ivSize: 0
	    });

	    function generateKeystreamWord() {
	        // Shortcuts
	        var S = this._S;
	        var i = this._i;
	        var j = this._j;

	        // Generate keystream word
	        var keystreamWord = 0;
	        for (var n = 0; n < 4; n++) {
	            i = (i + 1) % 256;
	            j = (j + S[i]) % 256;

	            // Swap
	            var t = S[i];
	            S[i] = S[j];
	            S[j] = t;

	            keystreamWord |= S[(S[i] + S[j]) % 256] << (24 - n * 8);
	        }

	        // Update counters
	        this._i = i;
	        this._j = j;

	        return keystreamWord;
	    }

	    /**
	     * Shortcut functions to the cipher's object interface.
	     *
	     * @example
	     *
	     *     var ciphertext = CryptoJS.RC4.encrypt(message, key, cfg);
	     *     var plaintext  = CryptoJS.RC4.decrypt(ciphertext, key, cfg);
	     */
	    C.RC4 = StreamCipher._createHelper(RC4);

	    /**
	     * Modified RC4 stream cipher algorithm.
	     */
	    var RC4Drop = C_algo.RC4Drop = RC4.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {number} drop The number of keystream words to drop. Default 192
	         */
	        cfg: RC4.cfg.extend({
	            drop: 192
	        }),

	        _doReset: function () {
	            RC4._doReset.call(this);

	            // Drop
	            for (var i = this.cfg.drop; i > 0; i--) {
	                generateKeystreamWord.call(this);
	            }
	        }
	    });

	    /**
	     * Shortcut functions to the cipher's object interface.
	     *
	     * @example
	     *
	     *     var ciphertext = CryptoJS.RC4Drop.encrypt(message, key, cfg);
	     *     var plaintext  = CryptoJS.RC4Drop.decrypt(ciphertext, key, cfg);
	     */
	    C.RC4Drop = StreamCipher._createHelper(RC4Drop);
	}());


	/** @preserve
	 * Counter block mode compatible with  Dr Brian Gladman fileenc.c
	 * derived from CryptoJS.mode.CTR
	 * Jan Hruby jhruby.web@gmail.com
	 */
	CryptoJS.mode.CTRGladman = (function () {
	    var CTRGladman = CryptoJS.lib.BlockCipherMode.extend();

		function incWord(word)
		{
			if (((word >> 24) & 0xff) === 0xff) { //overflow
			var b1 = (word >> 16)&0xff;
			var b2 = (word >> 8)&0xff;
			var b3 = word & 0xff;

			if (b1 === 0xff) // overflow b1
			{
			b1 = 0;
			if (b2 === 0xff)
			{
				b2 = 0;
				if (b3 === 0xff)
				{
					b3 = 0;
				}
				else
				{
					++b3;
				}
			}
			else
			{
				++b2;
			}
			}
			else
			{
			++b1;
			}

			word = 0;
			word += (b1 << 16);
			word += (b2 << 8);
			word += b3;
			}
			else
			{
			word += (0x01 << 24);
			}
			return word;
		}

		function incCounter(counter)
		{
			if ((counter[0] = incWord(counter[0])) === 0)
			{
				// encr_data in fileenc.c from  Dr Brian Gladman's counts only with DWORD j < 8
				counter[1] = incWord(counter[1]);
			}
			return counter;
		}

	    var Encryptor = CTRGladman.Encryptor = CTRGladman.extend({
	        processBlock: function (words, offset) {
	            // Shortcuts
	            var cipher = this._cipher
	            var blockSize = cipher.blockSize;
	            var iv = this._iv;
	            var counter = this._counter;

	            // Generate keystream
	            if (iv) {
	                counter = this._counter = iv.slice(0);

	                // Remove IV for subsequent blocks
	                this._iv = undefined;
	            }

				incCounter(counter);

				var keystream = counter.slice(0);
	            cipher.encryptBlock(keystream, 0);

	            // Encrypt
	            for (var i = 0; i < blockSize; i++) {
	                words[offset + i] ^= keystream[i];
	            }
	        }
	    });

	    CTRGladman.Decryptor = Encryptor;

	    return CTRGladman;
	}());




	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var StreamCipher = C_lib.StreamCipher;
	    var C_algo = C.algo;

	    // Reusable objects
	    var S  = [];
	    var C_ = [];
	    var G  = [];

	    /**
	     * Rabbit stream cipher algorithm
	     */
	    var Rabbit = C_algo.Rabbit = StreamCipher.extend({
	        _doReset: function () {
	            // Shortcuts
	            var K = this._key.words;
	            var iv = this.cfg.iv;

	            // Swap endian
	            for (var i = 0; i < 4; i++) {
	                K[i] = (((K[i] << 8)  | (K[i] >>> 24)) & 0x00ff00ff) |
	                       (((K[i] << 24) | (K[i] >>> 8))  & 0xff00ff00);
	            }

	            // Generate initial state values
	            var X = this._X = [
	                K[0], (K[3] << 16) | (K[2] >>> 16),
	                K[1], (K[0] << 16) | (K[3] >>> 16),
	                K[2], (K[1] << 16) | (K[0] >>> 16),
	                K[3], (K[2] << 16) | (K[1] >>> 16)
	            ];

	            // Generate initial counter values
	            var C = this._C = [
	                (K[2] << 16) | (K[2] >>> 16), (K[0] & 0xffff0000) | (K[1] & 0x0000ffff),
	                (K[3] << 16) | (K[3] >>> 16), (K[1] & 0xffff0000) | (K[2] & 0x0000ffff),
	                (K[0] << 16) | (K[0] >>> 16), (K[2] & 0xffff0000) | (K[3] & 0x0000ffff),
	                (K[1] << 16) | (K[1] >>> 16), (K[3] & 0xffff0000) | (K[0] & 0x0000ffff)
	            ];

	            // Carry bit
	            this._b = 0;

	            // Iterate the system four times
	            for (var i = 0; i < 4; i++) {
	                nextState.call(this);
	            }

	            // Modify the counters
	            for (var i = 0; i < 8; i++) {
	                C[i] ^= X[(i + 4) & 7];
	            }

	            // IV setup
	            if (iv) {
	                // Shortcuts
	                var IV = iv.words;
	                var IV_0 = IV[0];
	                var IV_1 = IV[1];

	                // Generate four subvectors
	                var i0 = (((IV_0 << 8) | (IV_0 >>> 24)) & 0x00ff00ff) | (((IV_0 << 24) | (IV_0 >>> 8)) & 0xff00ff00);
	                var i2 = (((IV_1 << 8) | (IV_1 >>> 24)) & 0x00ff00ff) | (((IV_1 << 24) | (IV_1 >>> 8)) & 0xff00ff00);
	                var i1 = (i0 >>> 16) | (i2 & 0xffff0000);
	                var i3 = (i2 << 16)  | (i0 & 0x0000ffff);

	                // Modify counter values
	                C[0] ^= i0;
	                C[1] ^= i1;
	                C[2] ^= i2;
	                C[3] ^= i3;
	                C[4] ^= i0;
	                C[5] ^= i1;
	                C[6] ^= i2;
	                C[7] ^= i3;

	                // Iterate the system four times
	                for (var i = 0; i < 4; i++) {
	                    nextState.call(this);
	                }
	            }
	        },

	        _doProcessBlock: function (M, offset) {
	            // Shortcut
	            var X = this._X;

	            // Iterate the system
	            nextState.call(this);

	            // Generate four keystream words
	            S[0] = X[0] ^ (X[5] >>> 16) ^ (X[3] << 16);
	            S[1] = X[2] ^ (X[7] >>> 16) ^ (X[5] << 16);
	            S[2] = X[4] ^ (X[1] >>> 16) ^ (X[7] << 16);
	            S[3] = X[6] ^ (X[3] >>> 16) ^ (X[1] << 16);

	            for (var i = 0; i < 4; i++) {
	                // Swap endian
	                S[i] = (((S[i] << 8)  | (S[i] >>> 24)) & 0x00ff00ff) |
	                       (((S[i] << 24) | (S[i] >>> 8))  & 0xff00ff00);

	                // Encrypt
	                M[offset + i] ^= S[i];
	            }
	        },

	        blockSize: 128/32,

	        ivSize: 64/32
	    });

	    function nextState() {
	        // Shortcuts
	        var X = this._X;
	        var C = this._C;

	        // Save old counter values
	        for (var i = 0; i < 8; i++) {
	            C_[i] = C[i];
	        }

	        // Calculate new counter values
	        C[0] = (C[0] + 0x4d34d34d + this._b) | 0;
	        C[1] = (C[1] + 0xd34d34d3 + ((C[0] >>> 0) < (C_[0] >>> 0) ? 1 : 0)) | 0;
	        C[2] = (C[2] + 0x34d34d34 + ((C[1] >>> 0) < (C_[1] >>> 0) ? 1 : 0)) | 0;
	        C[3] = (C[3] + 0x4d34d34d + ((C[2] >>> 0) < (C_[2] >>> 0) ? 1 : 0)) | 0;
	        C[4] = (C[4] + 0xd34d34d3 + ((C[3] >>> 0) < (C_[3] >>> 0) ? 1 : 0)) | 0;
	        C[5] = (C[5] + 0x34d34d34 + ((C[4] >>> 0) < (C_[4] >>> 0) ? 1 : 0)) | 0;
	        C[6] = (C[6] + 0x4d34d34d + ((C[5] >>> 0) < (C_[5] >>> 0) ? 1 : 0)) | 0;
	        C[7] = (C[7] + 0xd34d34d3 + ((C[6] >>> 0) < (C_[6] >>> 0) ? 1 : 0)) | 0;
	        this._b = (C[7] >>> 0) < (C_[7] >>> 0) ? 1 : 0;

	        // Calculate the g-values
	        for (var i = 0; i < 8; i++) {
	            var gx = X[i] + C[i];

	            // Construct high and low argument for squaring
	            var ga = gx & 0xffff;
	            var gb = gx >>> 16;

	            // Calculate high and low result of squaring
	            var gh = ((((ga * ga) >>> 17) + ga * gb) >>> 15) + gb * gb;
	            var gl = (((gx & 0xffff0000) * gx) | 0) + (((gx & 0x0000ffff) * gx) | 0);

	            // High XOR low
	            G[i] = gh ^ gl;
	        }

	        // Calculate new state values
	        X[0] = (G[0] + ((G[7] << 16) | (G[7] >>> 16)) + ((G[6] << 16) | (G[6] >>> 16))) | 0;
	        X[1] = (G[1] + ((G[0] << 8)  | (G[0] >>> 24)) + G[7]) | 0;
	        X[2] = (G[2] + ((G[1] << 16) | (G[1] >>> 16)) + ((G[0] << 16) | (G[0] >>> 16))) | 0;
	        X[3] = (G[3] + ((G[2] << 8)  | (G[2] >>> 24)) + G[1]) | 0;
	        X[4] = (G[4] + ((G[3] << 16) | (G[3] >>> 16)) + ((G[2] << 16) | (G[2] >>> 16))) | 0;
	        X[5] = (G[5] + ((G[4] << 8)  | (G[4] >>> 24)) + G[3]) | 0;
	        X[6] = (G[6] + ((G[5] << 16) | (G[5] >>> 16)) + ((G[4] << 16) | (G[4] >>> 16))) | 0;
	        X[7] = (G[7] + ((G[6] << 8)  | (G[6] >>> 24)) + G[5]) | 0;
	    }

	    /**
	     * Shortcut functions to the cipher's object interface.
	     *
	     * @example
	     *
	     *     var ciphertext = CryptoJS.Rabbit.encrypt(message, key, cfg);
	     *     var plaintext  = CryptoJS.Rabbit.decrypt(ciphertext, key, cfg);
	     */
	    C.Rabbit = StreamCipher._createHelper(Rabbit);
	}());


	/**
	 * Counter block mode.
	 */
	CryptoJS.mode.CTR = (function () {
	    var CTR = CryptoJS.lib.BlockCipherMode.extend();

	    var Encryptor = CTR.Encryptor = CTR.extend({
	        processBlock: function (words, offset) {
	            // Shortcuts
	            var cipher = this._cipher
	            var blockSize = cipher.blockSize;
	            var iv = this._iv;
	            var counter = this._counter;

	            // Generate keystream
	            if (iv) {
	                counter = this._counter = iv.slice(0);

	                // Remove IV for subsequent blocks
	                this._iv = undefined;
	            }
	            var keystream = counter.slice(0);
	            cipher.encryptBlock(keystream, 0);

	            // Increment counter
	            counter[blockSize - 1] = (counter[blockSize - 1] + 1) | 0

	            // Encrypt
	            for (var i = 0; i < blockSize; i++) {
	                words[offset + i] ^= keystream[i];
	            }
	        }
	    });

	    CTR.Decryptor = Encryptor;

	    return CTR;
	}());


	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var StreamCipher = C_lib.StreamCipher;
	    var C_algo = C.algo;

	    // Reusable objects
	    var S  = [];
	    var C_ = [];
	    var G  = [];

	    /**
	     * Rabbit stream cipher algorithm.
	     *
	     * This is a legacy version that neglected to convert the key to little-endian.
	     * This error doesn't affect the cipher's security,
	     * but it does affect its compatibility with other implementations.
	     */
	    var RabbitLegacy = C_algo.RabbitLegacy = StreamCipher.extend({
	        _doReset: function () {
	            // Shortcuts
	            var K = this._key.words;
	            var iv = this.cfg.iv;

	            // Generate initial state values
	            var X = this._X = [
	                K[0], (K[3] << 16) | (K[2] >>> 16),
	                K[1], (K[0] << 16) | (K[3] >>> 16),
	                K[2], (K[1] << 16) | (K[0] >>> 16),
	                K[3], (K[2] << 16) | (K[1] >>> 16)
	            ];

	            // Generate initial counter values
	            var C = this._C = [
	                (K[2] << 16) | (K[2] >>> 16), (K[0] & 0xffff0000) | (K[1] & 0x0000ffff),
	                (K[3] << 16) | (K[3] >>> 16), (K[1] & 0xffff0000) | (K[2] & 0x0000ffff),
	                (K[0] << 16) | (K[0] >>> 16), (K[2] & 0xffff0000) | (K[3] & 0x0000ffff),
	                (K[1] << 16) | (K[1] >>> 16), (K[3] & 0xffff0000) | (K[0] & 0x0000ffff)
	            ];

	            // Carry bit
	            this._b = 0;

	            // Iterate the system four times
	            for (var i = 0; i < 4; i++) {
	                nextState.call(this);
	            }

	            // Modify the counters
	            for (var i = 0; i < 8; i++) {
	                C[i] ^= X[(i + 4) & 7];
	            }

	            // IV setup
	            if (iv) {
	                // Shortcuts
	                var IV = iv.words;
	                var IV_0 = IV[0];
	                var IV_1 = IV[1];

	                // Generate four subvectors
	                var i0 = (((IV_0 << 8) | (IV_0 >>> 24)) & 0x00ff00ff) | (((IV_0 << 24) | (IV_0 >>> 8)) & 0xff00ff00);
	                var i2 = (((IV_1 << 8) | (IV_1 >>> 24)) & 0x00ff00ff) | (((IV_1 << 24) | (IV_1 >>> 8)) & 0xff00ff00);
	                var i1 = (i0 >>> 16) | (i2 & 0xffff0000);
	                var i3 = (i2 << 16)  | (i0 & 0x0000ffff);

	                // Modify counter values
	                C[0] ^= i0;
	                C[1] ^= i1;
	                C[2] ^= i2;
	                C[3] ^= i3;
	                C[4] ^= i0;
	                C[5] ^= i1;
	                C[6] ^= i2;
	                C[7] ^= i3;

	                // Iterate the system four times
	                for (var i = 0; i < 4; i++) {
	                    nextState.call(this);
	                }
	            }
	        },

	        _doProcessBlock: function (M, offset) {
	            // Shortcut
	            var X = this._X;

	            // Iterate the system
	            nextState.call(this);

	            // Generate four keystream words
	            S[0] = X[0] ^ (X[5] >>> 16) ^ (X[3] << 16);
	            S[1] = X[2] ^ (X[7] >>> 16) ^ (X[5] << 16);
	            S[2] = X[4] ^ (X[1] >>> 16) ^ (X[7] << 16);
	            S[3] = X[6] ^ (X[3] >>> 16) ^ (X[1] << 16);

	            for (var i = 0; i < 4; i++) {
	                // Swap endian
	                S[i] = (((S[i] << 8)  | (S[i] >>> 24)) & 0x00ff00ff) |
	                       (((S[i] << 24) | (S[i] >>> 8))  & 0xff00ff00);

	                // Encrypt
	                M[offset + i] ^= S[i];
	            }
	        },

	        blockSize: 128/32,

	        ivSize: 64/32
	    });

	    function nextState() {
	        // Shortcuts
	        var X = this._X;
	        var C = this._C;

	        // Save old counter values
	        for (var i = 0; i < 8; i++) {
	            C_[i] = C[i];
	        }

	        // Calculate new counter values
	        C[0] = (C[0] + 0x4d34d34d + this._b) | 0;
	        C[1] = (C[1] + 0xd34d34d3 + ((C[0] >>> 0) < (C_[0] >>> 0) ? 1 : 0)) | 0;
	        C[2] = (C[2] + 0x34d34d34 + ((C[1] >>> 0) < (C_[1] >>> 0) ? 1 : 0)) | 0;
	        C[3] = (C[3] + 0x4d34d34d + ((C[2] >>> 0) < (C_[2] >>> 0) ? 1 : 0)) | 0;
	        C[4] = (C[4] + 0xd34d34d3 + ((C[3] >>> 0) < (C_[3] >>> 0) ? 1 : 0)) | 0;
	        C[5] = (C[5] + 0x34d34d34 + ((C[4] >>> 0) < (C_[4] >>> 0) ? 1 : 0)) | 0;
	        C[6] = (C[6] + 0x4d34d34d + ((C[5] >>> 0) < (C_[5] >>> 0) ? 1 : 0)) | 0;
	        C[7] = (C[7] + 0xd34d34d3 + ((C[6] >>> 0) < (C_[6] >>> 0) ? 1 : 0)) | 0;
	        this._b = (C[7] >>> 0) < (C_[7] >>> 0) ? 1 : 0;

	        // Calculate the g-values
	        for (var i = 0; i < 8; i++) {
	            var gx = X[i] + C[i];

	            // Construct high and low argument for squaring
	            var ga = gx & 0xffff;
	            var gb = gx >>> 16;

	            // Calculate high and low result of squaring
	            var gh = ((((ga * ga) >>> 17) + ga * gb) >>> 15) + gb * gb;
	            var gl = (((gx & 0xffff0000) * gx) | 0) + (((gx & 0x0000ffff) * gx) | 0);

	            // High XOR low
	            G[i] = gh ^ gl;
	        }

	        // Calculate new state values
	        X[0] = (G[0] + ((G[7] << 16) | (G[7] >>> 16)) + ((G[6] << 16) | (G[6] >>> 16))) | 0;
	        X[1] = (G[1] + ((G[0] << 8)  | (G[0] >>> 24)) + G[7]) | 0;
	        X[2] = (G[2] + ((G[1] << 16) | (G[1] >>> 16)) + ((G[0] << 16) | (G[0] >>> 16))) | 0;
	        X[3] = (G[3] + ((G[2] << 8)  | (G[2] >>> 24)) + G[1]) | 0;
	        X[4] = (G[4] + ((G[3] << 16) | (G[3] >>> 16)) + ((G[2] << 16) | (G[2] >>> 16))) | 0;
	        X[5] = (G[5] + ((G[4] << 8)  | (G[4] >>> 24)) + G[3]) | 0;
	        X[6] = (G[6] + ((G[5] << 16) | (G[5] >>> 16)) + ((G[4] << 16) | (G[4] >>> 16))) | 0;
	        X[7] = (G[7] + ((G[6] << 8)  | (G[6] >>> 24)) + G[5]) | 0;
	    }

	    /**
	     * Shortcut functions to the cipher's object interface.
	     *
	     * @example
	     *
	     *     var ciphertext = CryptoJS.RabbitLegacy.encrypt(message, key, cfg);
	     *     var plaintext  = CryptoJS.RabbitLegacy.decrypt(ciphertext, key, cfg);
	     */
	    C.RabbitLegacy = StreamCipher._createHelper(RabbitLegacy);
	}());


	/**
	 * Zero padding strategy.
	 */
	CryptoJS.pad.ZeroPadding = {
	    pad: function (data, blockSize) {
	        // Shortcut
	        var blockSizeBytes = blockSize * 4;

	        // Pad
	        data.clamp();
	        data.sigBytes += blockSizeBytes - ((data.sigBytes % blockSizeBytes) || blockSizeBytes);
	    },

	    unpad: function (data) {
	        // Shortcut
	        var dataWords = data.words;

	        // Unpad
	        var i = data.sigBytes - 1;
	        while (!((dataWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff)) {
	            i--;
	        }
	        data.sigBytes = i + 1;
	    }
	};


	return CryptoJS;

}));


/* ---- /1Mi3ThNGPyiuhiWCJPH2BAqeKCiBF5BVpR/highlight.min.js ---- */


/*! highlight.js v9.7.0 | BSD3 License | git.io/hljslicense */
!function(e){var t="object"==typeof window&&window||"object"==typeof self&&self;"undefined"!=typeof exports?e(exports):t&&(t.hljs=e({}),"function"==typeof define&&define.amd&&define([],function(){return t.hljs}))}(function(e){function t(e){return e.replace(/[&<>]/gm,function(e){return S[e]})}function r(e){return e.nodeName.toLowerCase()}function a(e,t){var r=e&&e.exec(t);return r&&0===r.index}function n(e){return C.test(e)}function i(e){var t,r,a,i,s=e.className+" ";if(s+=e.parentNode?e.parentNode.className:"",r=E.exec(s))return y(r[1])?r[1]:"no-highlight";for(s=s.split(/\s+/),t=0,a=s.length;a>t;t++)if(i=s[t],n(i)||y(i))return i}function s(e,t){var r,a={};for(r in e)a[r]=e[r];if(t)for(r in t)a[r]=t[r];return a}function c(e){var t=[];return function a(e,n){for(var i=e.firstChild;i;i=i.nextSibling)3===i.nodeType?n+=i.nodeValue.length:1===i.nodeType&&(t.push({event:"start",offset:n,node:i}),n=a(i,n),r(i).match(/br|hr|img|input/)||t.push({event:"stop",offset:n,node:i}));return n}(e,0),t}function o(e,a,n){function i(){return e.length&&a.length?e[0].offset!==a[0].offset?e[0].offset<a[0].offset?e:a:"start"===a[0].event?e:a:e.length?e:a}function s(e){function a(e){return" "+e.nodeName+'="'+t(e.value)+'"'}u+="<"+r(e)+w.map.call(e.attributes,a).join("")+">"}function c(e){u+="</"+r(e)+">"}function o(e){("start"===e.event?s:c)(e.node)}for(var l=0,u="",d=[];e.length||a.length;){var b=i();if(u+=t(n.substr(l,b[0].offset-l)),l=b[0].offset,b===e){d.reverse().forEach(c);do o(b.splice(0,1)[0]),b=i();while(b===e&&b.length&&b[0].offset===l);d.reverse().forEach(s)}else"start"===b[0].event?d.push(b[0].node):d.pop(),o(b.splice(0,1)[0])}return u+t(n.substr(l))}function l(e){function t(e){return e&&e.source||e}function r(r,a){return new RegExp(t(r),"m"+(e.cI?"i":"")+(a?"g":""))}function a(n,i){if(!n.compiled){if(n.compiled=!0,n.k=n.k||n.bK,n.k){var c={},o=function(t,r){e.cI&&(r=r.toLowerCase()),r.split(" ").forEach(function(e){var r=e.split("|");c[r[0]]=[t,r[1]?Number(r[1]):1]})};"string"==typeof n.k?o("keyword",n.k):N(n.k).forEach(function(e){o(e,n.k[e])}),n.k=c}n.lR=r(n.l||/\w+/,!0),i&&(n.bK&&(n.b="\\b("+n.bK.split(" ").join("|")+")\\b"),n.b||(n.b=/\B|\b/),n.bR=r(n.b),n.e||n.eW||(n.e=/\B|\b/),n.e&&(n.eR=r(n.e)),n.tE=t(n.e)||"",n.eW&&i.tE&&(n.tE+=(n.e?"|":"")+i.tE)),n.i&&(n.iR=r(n.i)),null==n.r&&(n.r=1),n.c||(n.c=[]);var l=[];n.c.forEach(function(e){e.v?e.v.forEach(function(t){l.push(s(e,t))}):l.push("self"===e?n:e)}),n.c=l,n.c.forEach(function(e){a(e,n)}),n.starts&&a(n.starts,i);var u=n.c.map(function(e){return e.bK?"\\.?("+e.b+")\\.?":e.b}).concat([n.tE,n.i]).map(t).filter(Boolean);n.t=u.length?r(u.join("|"),!0):{exec:function(){return null}}}}a(e)}function u(e,r,n,i){function s(e,t){var r,n;for(r=0,n=t.c.length;n>r;r++)if(a(t.c[r].bR,e))return t.c[r]}function c(e,t){if(a(e.eR,t)){for(;e.endsParent&&e.parent;)e=e.parent;return e}return e.eW?c(e.parent,t):void 0}function o(e,t){return!n&&a(t.iR,e)}function b(e,t){var r=v.cI?t[0].toLowerCase():t[0];return e.k.hasOwnProperty(r)&&e.k[r]}function p(e,t,r,a){var n=a?"":R.classPrefix,i='<span class="'+n,s=r?"":B;return i+=e+'">',i+t+s}function m(){var e,r,a,n;if(!N.k)return t(E);for(n="",r=0,N.lR.lastIndex=0,a=N.lR.exec(E);a;)n+=t(E.substr(r,a.index-r)),e=b(N,a),e?(M+=e[1],n+=p(e[0],t(a[0]))):n+=t(a[0]),r=N.lR.lastIndex,a=N.lR.exec(E);return n+t(E.substr(r))}function f(){var e="string"==typeof N.sL;if(e&&!k[N.sL])return t(E);var r=e?u(N.sL,E,!0,x[N.sL]):d(E,N.sL.length?N.sL:void 0);return N.r>0&&(M+=r.r),e&&(x[N.sL]=r.top),p(r.language,r.value,!1,!0)}function g(){C+=null!=N.sL?f():m(),E=""}function _(e){C+=e.cN?p(e.cN,"",!0):"",N=Object.create(e,{parent:{value:N}})}function h(e,t){if(E+=e,null==t)return g(),0;var r=s(t,N);if(r)return r.skip?E+=t:(r.eB&&(E+=t),g(),r.rB||r.eB||(E=t)),_(r,t),r.rB?0:t.length;var a=c(N,t);if(a){var n=N;n.skip?E+=t:(n.rE||n.eE||(E+=t),g(),n.eE&&(E=t));do N.cN&&(C+=B),N.skip||(M+=N.r),N=N.parent;while(N!==a.parent);return a.starts&&_(a.starts,""),n.rE?0:t.length}if(o(t,N))throw new Error('Illegal lexeme "'+t+'" for mode "'+(N.cN||"<unnamed>")+'"');return E+=t,t.length||1}var v=y(e);if(!v)throw new Error('Unknown language: "'+e+'"');l(v);var w,N=i||v,x={},C="";for(w=N;w!==v;w=w.parent)w.cN&&(C=p(w.cN,"",!0)+C);var E="",M=0;try{for(var S,L,A=0;;){if(N.t.lastIndex=A,S=N.t.exec(r),!S)break;L=h(r.substr(A,S.index-A),S[0]),A=S.index+L}for(h(r.substr(A)),w=N;w.parent;w=w.parent)w.cN&&(C+=B);return{r:M,value:C,language:e,top:N}}catch($){if($.message&&-1!==$.message.indexOf("Illegal"))return{r:0,value:t(r)};throw $}}function d(e,r){r=r||R.languages||N(k);var a={r:0,value:t(e)},n=a;return r.filter(y).forEach(function(t){var r=u(t,e,!1);r.language=t,r.r>n.r&&(n=r),r.r>a.r&&(n=a,a=r)}),n.language&&(a.second_best=n),a}function b(e){return R.tabReplace||R.useBR?e.replace(M,function(e,t){return R.useBR&&"\n"===e?"<br>":R.tabReplace?t.replace(/\t/g,R.tabReplace):void 0}):e}function p(e,t,r){var a=t?x[t]:r,n=[e.trim()];return e.match(/\bhljs\b/)||n.push("hljs"),-1===e.indexOf(a)&&n.push(a),n.join(" ").trim()}function m(e){var t,r,a,s,l,m=i(e);n(m)||(R.useBR?(t=document.createElementNS("http://www.w3.org/1999/xhtml","div"),t.innerHTML=e.innerHTML.replace(/\n/g,"").replace(/<br[ \/]*>/g,"\n")):t=e,l=t.textContent,a=m?u(m,l,!0):d(l),r=c(t),r.length&&(s=document.createElementNS("http://www.w3.org/1999/xhtml","div"),s.innerHTML=a.value,a.value=o(r,c(s),l)),a.value=b(a.value),e.innerHTML=a.value,e.className=p(e.className,m,a.language),e.result={language:a.language,re:a.r},a.second_best&&(e.second_best={language:a.second_best.language,re:a.second_best.r}))}function f(e){R=s(R,e)}function g(){if(!g.called){g.called=!0;var e=document.querySelectorAll("pre code");w.forEach.call(e,m)}}function _(){addEventListener("DOMContentLoaded",g,!1),addEventListener("load",g,!1)}function h(t,r){var a=k[t]=r(e);a.aliases&&a.aliases.forEach(function(e){x[e]=t})}function v(){return N(k)}function y(e){return e=(e||"").toLowerCase(),k[e]||k[x[e]]}var w=[],N=Object.keys,k={},x={},C=/^(no-?highlight|plain|text)$/i,E=/\blang(?:uage)?-([\w-]+)\b/i,M=/((^(<[^>]+>|\t|)+|(?:\n)))/gm,B="</span>",R={classPrefix:"hljs-",tabReplace:null,useBR:!1,languages:void 0},S={"&":"&amp;","<":"&lt;",">":"&gt;"};return e.highlight=u,e.highlightAuto=d,e.fixMarkup=b,e.highlightBlock=m,e.configure=f,e.initHighlighting=g,e.initHighlightingOnLoad=_,e.registerLanguage=h,e.listLanguages=v,e.getLanguage=y,e.inherit=s,e.IR="[a-zA-Z]\\w*",e.UIR="[a-zA-Z_]\\w*",e.NR="\\b\\d+(\\.\\d+)?",e.CNR="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",e.BNR="\\b(0b[01]+)",e.RSR="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",e.BE={b:"\\\\[\\s\\S]",r:0},e.ASM={cN:"string",b:"'",e:"'",i:"\\n",c:[e.BE]},e.QSM={cN:"string",b:'"',e:'"',i:"\\n",c:[e.BE]},e.PWM={b:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|like)\b/},e.C=function(t,r,a){var n=e.inherit({cN:"comment",b:t,e:r,c:[]},a||{});return n.c.push(e.PWM),n.c.push({cN:"doctag",b:"(?:TODO|FIXME|NOTE|BUG|XXX):",r:0}),n},e.CLCM=e.C("//","$"),e.CBCM=e.C("/\\*","\\*/"),e.HCM=e.C("#","$"),e.NM={cN:"number",b:e.NR,r:0},e.CNM={cN:"number",b:e.CNR,r:0},e.BNM={cN:"number",b:e.BNR,r:0},e.CSSNM={cN:"number",b:e.NR+"(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",r:0},e.RM={cN:"regexp",b:/\//,e:/\/[gimuy]*/,i:/\n/,c:[e.BE,{b:/\[/,e:/\]/,r:0,c:[e.BE]}]},e.TM={cN:"title",b:e.IR,r:0},e.UTM={cN:"title",b:e.UIR,r:0},e.METHOD_GUARD={b:"\\.\\s*"+e.UIR,r:0},e.registerLanguage("apache",function(e){var t={cN:"number",b:"[\\$%]\\d+"};return{aliases:["apacheconf"],cI:!0,c:[e.HCM,{cN:"section",b:"</?",e:">"},{cN:"attribute",b:/\w+/,r:0,k:{nomarkup:"order deny allow setenv rewriterule rewriteengine rewritecond documentroot sethandler errordocument loadmodule options header listen serverroot servername"},starts:{e:/$/,r:0,k:{literal:"on off all"},c:[{cN:"meta",b:"\\s\\[",e:"\\]$"},{cN:"variable",b:"[\\$%]\\{",e:"\\}",c:["self",t]},t,e.QSM]}}],i:/\S/}}),e.registerLanguage("bash",function(e){var t={cN:"variable",v:[{b:/\$[\w\d#@][\w\d_]*/},{b:/\$\{(.*?)}/}]},r={cN:"string",b:/"/,e:/"/,c:[e.BE,t,{cN:"variable",b:/\$\(/,e:/\)/,c:[e.BE]}]},a={cN:"string",b:/'/,e:/'/};return{aliases:["sh","zsh"],l:/-?[a-z\._]+/,k:{keyword:"if then else elif fi for while in do done case esac function",literal:"true false",built_in:"break cd continue eval exec exit export getopts hash pwd readonly return shift test times trap umask unset alias bind builtin caller command declare echo enable help let local logout mapfile printf read readarray source type typeset ulimit unalias set shopt autoload bg bindkey bye cap chdir clone comparguments compcall compctl compdescribe compfiles compgroups compquote comptags comptry compvalues dirs disable disown echotc echoti emulate fc fg float functions getcap getln history integer jobs kill limit log noglob popd print pushd pushln rehash sched setcap setopt stat suspend ttyctl unfunction unhash unlimit unsetopt vared wait whence where which zcompile zformat zftp zle zmodload zparseopts zprof zpty zregexparse zsocket zstyle ztcp",_:"-ne -eq -lt -gt -f -d -e -s -l -a"},c:[{cN:"meta",b:/^#![^\n]+sh\s*$/,r:10},{cN:"function",b:/\w[\w\d_]*\s*\(\s*\)\s*\{/,rB:!0,c:[e.inherit(e.TM,{b:/\w[\w\d_]*/})],r:0},e.HCM,r,a,t]}}),e.registerLanguage("coffeescript",function(e){var t={keyword:"in if for while finally new do return else break catch instanceof throw try this switch continue typeof delete debugger super then unless until loop of by when and or is isnt not",literal:"true false null undefined yes no on off",built_in:"npm require console print module global window document"},r="[A-Za-z$_][0-9A-Za-z$_]*",a={cN:"subst",b:/#\{/,e:/}/,k:t},n=[e.BNM,e.inherit(e.CNM,{starts:{e:"(\\s*/)?",r:0}}),{cN:"string",v:[{b:/'''/,e:/'''/,c:[e.BE]},{b:/'/,e:/'/,c:[e.BE]},{b:/"""/,e:/"""/,c:[e.BE,a]},{b:/"/,e:/"/,c:[e.BE,a]}]},{cN:"regexp",v:[{b:"///",e:"///",c:[a,e.HCM]},{b:"//[gim]*",r:0},{b:/\/(?![ *])(\\\/|.)*?\/[gim]*(?=\W|$)/}]},{b:"@"+r},{b:"`",e:"`",eB:!0,eE:!0,sL:"javascript"}];a.c=n;var i=e.inherit(e.TM,{b:r}),s="(\\(.*\\))?\\s*\\B[-=]>",c={cN:"params",b:"\\([^\\(]",rB:!0,c:[{b:/\(/,e:/\)/,k:t,c:["self"].concat(n)}]};return{aliases:["coffee","cson","iced"],k:t,i:/\/\*/,c:n.concat([e.C("###","###"),e.HCM,{cN:"function",b:"^\\s*"+r+"\\s*=\\s*"+s,e:"[-=]>",rB:!0,c:[i,c]},{b:/[:\(,=]\s*/,r:0,c:[{cN:"function",b:s,e:"[-=]>",rB:!0,c:[c]}]},{cN:"class",bK:"class",e:"$",i:/[:="\[\]]/,c:[{bK:"extends",eW:!0,i:/[:="\[\]]/,c:[i]},i]},{b:r+":",e:":",rB:!0,rE:!0,r:0}])}}),e.registerLanguage("cpp",function(e){var t={cN:"keyword",b:"\\b[a-z\\d_]*_t\\b"},r={cN:"string",v:[{b:'(u8?|U)?L?"',e:'"',i:"\\n",c:[e.BE]},{b:'(u8?|U)?R"',e:'"',c:[e.BE]},{b:"'\\\\?.",e:"'",i:"."}]},a={cN:"number",v:[{b:"\\b(0b[01']+)"},{b:"\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)(u|U|l|L|ul|UL|f|F|b|B)"},{b:"(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)"}],r:0},n={cN:"meta",b:/#\s*[a-z]+\b/,e:/$/,k:{"meta-keyword":"if else elif endif define undef warning error line pragma ifdef ifndef include"},c:[{b:/\\\n/,r:0},e.inherit(r,{cN:"meta-string"}),{cN:"meta-string",b:"<",e:">",i:"\\n"},e.CLCM,e.CBCM]},i=e.IR+"\\s*\\(",s={keyword:"int float while private char catch import module export virtual operator sizeof dynamic_cast|10 typedef const_cast|10 const struct for static_cast|10 union namespace unsigned long volatile static protected bool template mutable if public friend do goto auto void enum else break extern using class asm case typeid short reinterpret_cast|10 default double register explicit signed typename try this switch continue inline delete alignof constexpr decltype noexcept static_assert thread_local restrict _Bool complex _Complex _Imaginary atomic_bool atomic_char atomic_schar atomic_uchar atomic_short atomic_ushort atomic_int atomic_uint atomic_long atomic_ulong atomic_llong atomic_ullong new throw return",built_in:"std string cin cout cerr clog stdin stdout stderr stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap array shared_ptr abort abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc realloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf endl initializer_list unique_ptr",literal:"true false nullptr NULL"},c=[t,e.CLCM,e.CBCM,a,r];return{aliases:["c","cc","h","c++","h++","hpp"],k:s,i:"</",c:c.concat([n,{b:"\\b(deque|list|queue|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<",e:">",k:s,c:["self",t]},{b:e.IR+"::",k:s},{v:[{b:/=/,e:/;/},{b:/\(/,e:/\)/},{bK:"new throw return else",e:/;/}],k:s,c:c.concat([{b:/\(/,e:/\)/,k:s,c:c.concat(["self"]),r:0}]),r:0},{cN:"function",b:"("+e.IR+"[\\*&\\s]+)+"+i,rB:!0,e:/[{;=]/,eE:!0,k:s,i:/[^\w\s\*&]/,c:[{b:i,rB:!0,c:[e.TM],r:0},{cN:"params",b:/\(/,e:/\)/,k:s,r:0,c:[e.CLCM,e.CBCM,r,a,t]},e.CLCM,e.CBCM,n]}]),exports:{preprocessor:n,strings:r,k:s}}}),e.registerLanguage("cs",function(e){var t={keyword:"abstract as base bool break byte case catch char checked const continue decimal default delegate do double else enum event explicit extern finally fixed float for foreach goto if implicit in int interface internal is lock long object operator out override params private protected public readonly ref sbyte sealed short sizeof stackalloc static string struct switch this try typeof uint ulong unchecked unsafe ushort using virtual void volatile while nameof add alias ascending async await by descending dynamic equals from get global group into join let on orderby partial remove select set value var where yield",literal:"null false true"},r={cN:"string",b:'@"',e:'"',c:[{b:'""'}]},a=e.inherit(r,{i:/\n/}),n={cN:"subst",b:"{",e:"}",k:t},i=e.inherit(n,{i:/\n/}),s={cN:"string",b:/\$"/,e:'"',i:/\n/,c:[{b:"{{"},{b:"}}"},e.BE,i]},c={cN:"string",b:/\$@"/,e:'"',c:[{b:"{{"},{b:"}}"},{b:'""'},n]},o=e.inherit(c,{i:/\n/,c:[{b:"{{"},{b:"}}"},{b:'""'},i]});n.c=[c,s,r,e.ASM,e.QSM,e.CNM,e.CBCM],i.c=[o,s,a,e.ASM,e.QSM,e.CNM,e.inherit(e.CBCM,{i:/\n/})];var l={v:[c,s,r,e.ASM,e.QSM]},u=e.IR+"(<"+e.IR+"(\\s*,\\s*"+e.IR+")*>)?(\\[\\])?";return{aliases:["csharp"],k:t,i:/::/,c:[e.C("///","$",{rB:!0,c:[{cN:"doctag",v:[{b:"///",r:0},{b:"<!--|-->"},{b:"</?",e:">"}]}]}),e.CLCM,e.CBCM,{cN:"meta",b:"#",e:"$",k:{"meta-keyword":"if else elif endif define undef warning error line region endregion pragma checksum"}},l,e.CNM,{bK:"class interface",e:/[{;=]/,i:/[^\s:]/,c:[e.TM,e.CLCM,e.CBCM]},{bK:"namespace",e:/[{;=]/,i:/[^\s:]/,c:[e.inherit(e.TM,{b:"[a-zA-Z](\\.?\\w)*"}),e.CLCM,e.CBCM]},{bK:"new return throw await",r:0},{cN:"function",b:"("+u+"\\s+)+"+e.IR+"\\s*\\(",rB:!0,e:/[{;=]/,eE:!0,k:t,c:[{b:e.IR+"\\s*\\(",rB:!0,c:[e.TM],r:0},{cN:"params",b:/\(/,e:/\)/,eB:!0,eE:!0,k:t,r:0,c:[l,e.CNM,e.CBCM]},e.CLCM,e.CBCM]}]}}),e.registerLanguage("css",function(e){var t="[a-zA-Z-][a-zA-Z0-9_-]*",r={b:/[A-Z\_\.\-]+\s*:/,rB:!0,e:";",eW:!0,c:[{cN:"attribute",b:/\S/,e:":",eE:!0,starts:{eW:!0,eE:!0,c:[{b:/[\w-]+\(/,rB:!0,c:[{cN:"built_in",b:/[\w-]+/},{b:/\(/,e:/\)/,c:[e.ASM,e.QSM]}]},e.CSSNM,e.QSM,e.ASM,e.CBCM,{cN:"number",b:"#[0-9A-Fa-f]+"},{cN:"meta",b:"!important"}]}}]};return{cI:!0,i:/[=\/|'\$]/,c:[e.CBCM,{cN:"selector-id",b:/#[A-Za-z0-9_-]+/},{cN:"selector-class",b:/\.[A-Za-z0-9_-]+/},{cN:"selector-attr",b:/\[/,e:/\]/,i:"$"},{cN:"selector-pseudo",b:/:(:)?[a-zA-Z0-9\_\-\+\(\)"'.]+/},{b:"@(font-face|page)",l:"[a-z-]+",k:"font-face page"},{b:"@",e:"[{;]",i:/:/,c:[{cN:"keyword",b:/\w+/},{b:/\s/,eW:!0,eE:!0,r:0,c:[e.ASM,e.QSM,e.CSSNM]}]},{cN:"selector-tag",b:t,r:0},{b:"{",e:"}",i:/\S/,c:[e.CBCM,r]}]}}),e.registerLanguage("diff",function(e){return{aliases:["patch"],c:[{cN:"meta",r:10,v:[{b:/^@@ +\-\d+,\d+ +\+\d+,\d+ +@@$/},{b:/^\*\*\* +\d+,\d+ +\*\*\*\*$/},{b:/^\-\-\- +\d+,\d+ +\-\-\-\-$/}]},{cN:"comment",v:[{b:/Index: /,e:/$/},{b:/={3,}/,e:/$/},{b:/^\-{3}/,e:/$/},{b:/^\*{3} /,e:/$/},{b:/^\+{3}/,e:/$/},{b:/\*{5}/,e:/\*{5}$/}]},{cN:"addition",b:"^\\+",e:"$"},{cN:"deletion",b:"^\\-",e:"$"},{cN:"addition",b:"^\\!",e:"$"}]}}),e.registerLanguage("http",function(e){var t="HTTP/[0-9\\.]+";return{aliases:["https"],i:"\\S",c:[{b:"^"+t,e:"$",c:[{cN:"number",b:"\\b\\d{3}\\b"}]},{b:"^[A-Z]+ (.*?) "+t+"$",rB:!0,e:"$",c:[{cN:"string",b:" ",e:" ",eB:!0,eE:!0},{b:t},{cN:"keyword",b:"[A-Z]+"}]},{cN:"attribute",b:"^\\w",e:": ",eE:!0,i:"\\n|\\s|=",starts:{e:"$",r:0}},{b:"\\n\\n",starts:{sL:[],eW:!0}}]}}),e.registerLanguage("ini",function(e){var t={cN:"string",c:[e.BE],v:[{b:"'''",e:"'''",r:10},{b:'"""',e:'"""',r:10},{b:'"',e:'"'},{b:"'",e:"'"}]};return{aliases:["toml"],cI:!0,i:/\S/,c:[e.C(";","$"),e.HCM,{cN:"section",b:/^\s*\[+/,e:/\]+/},{b:/^[a-z0-9\[\]_-]+\s*=\s*/,e:"$",rB:!0,c:[{cN:"attr",b:/[a-z0-9\[\]_-]+/},{b:/=/,eW:!0,r:0,c:[{cN:"literal",b:/\bon|off|true|false|yes|no\b/},{cN:"variable",v:[{b:/\$[\w\d"][\w\d_]*/},{b:/\$\{(.*?)}/}]},t,{cN:"number",b:/([\+\-]+)?[\d]+_[\d_]+/},e.NM]}]}]}}),e.registerLanguage("java",function(e){var t=e.UIR+"(<"+e.UIR+"(\\s*,\\s*"+e.UIR+")*>)?",r="false synchronized int abstract float private char boolean static null if const for true while long strictfp finally protected import native final void enum else break transient catch instanceof byte super volatile case assert short package default double public try this switch continue throws protected public private module requires exports",a="\\b(0[bB]([01]+[01_]+[01]+|[01]+)|0[xX]([a-fA-F0-9]+[a-fA-F0-9_]+[a-fA-F0-9]+|[a-fA-F0-9]+)|(([\\d]+[\\d_]+[\\d]+|[\\d]+)(\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))?|\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))([eE][-+]?\\d+)?)[lLfF]?",n={cN:"number",b:a,r:0};return{aliases:["jsp"],k:r,i:/<\/|#/,c:[e.C("/\\*\\*","\\*/",{r:0,c:[{b:/\w+@/,r:0},{cN:"doctag",b:"@[A-Za-z]+"}]}),e.CLCM,e.CBCM,e.ASM,e.QSM,{cN:"class",bK:"class interface",e:/[{;=]/,eE:!0,k:"class interface",i:/[:"\[\]]/,c:[{bK:"extends implements"},e.UTM]},{bK:"new throw return else",r:0},{cN:"function",b:"("+t+"\\s+)+"+e.UIR+"\\s*\\(",rB:!0,e:/[{;=]/,eE:!0,k:r,c:[{b:e.UIR+"\\s*\\(",rB:!0,r:0,c:[e.UTM]},{cN:"params",b:/\(/,e:/\)/,k:r,r:0,c:[e.ASM,e.QSM,e.CNM,e.CBCM]},e.CLCM,e.CBCM]},n,{cN:"meta",b:"@[A-Za-z]+"}]}}),e.registerLanguage("javascript",function(e){var t="[A-Za-z$_][0-9A-Za-z$_]*",r={keyword:"in of if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const export super debugger as async await static import from as",literal:"true false null undefined NaN Infinity",built_in:"eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document Symbol Set Map WeakSet WeakMap Proxy Reflect Promise"},a={cN:"number",v:[{b:"\\b(0[bB][01]+)"},{b:"\\b(0[oO][0-7]+)"},{b:e.CNR}],r:0},n={cN:"subst",b:"\\$\\{",e:"\\}",k:r,c:[]},i={cN:"string",b:"`",e:"`",c:[e.BE,n]};n.c=[e.ASM,e.QSM,i,a,e.RM];var s=n.c.concat([e.CBCM,e.CLCM]);return{aliases:["js","jsx"],k:r,c:[{cN:"meta",r:10,b:/^\s*['"]use (strict|asm)['"]/},{cN:"meta",b:/^#!/,e:/$/},e.ASM,e.QSM,i,e.CLCM,e.CBCM,a,{b:/[{,]\s*/,r:0,c:[{b:t+"\\s*:",rB:!0,r:0,c:[{cN:"attr",b:t,r:0}]}]},{b:"("+e.RSR+"|\\b(case|return|throw)\\b)\\s*",k:"return throw case",c:[e.CLCM,e.CBCM,e.RM,{cN:"function",b:"(\\(.*?\\)|"+t+")\\s*=>",rB:!0,e:"\\s*=>",c:[{cN:"params",v:[{b:t},{b:/\(\s*\)/},{b:/\(/,e:/\)/,eB:!0,eE:!0,k:r,c:s}]}]},{b:/</,e:/(\/\w+|\w+\/)>/,sL:"xml",c:[{b:/<\w+\s*\/>/,skip:!0},{b:/<\w+/,e:/(\/\w+|\w+\/)>/,skip:!0,c:[{b:/<\w+\s*\/>/,skip:!0},"self"]}]}],r:0},{cN:"function",bK:"function",e:/\{/,eE:!0,c:[e.inherit(e.TM,{b:t}),{cN:"params",b:/\(/,e:/\)/,eB:!0,eE:!0,c:s}],i:/\[|%/},{b:/\$[(.]/},e.METHOD_GUARD,{cN:"class",bK:"class",e:/[{;=]/,eE:!0,i:/[:"\[\]]/,c:[{bK:"extends"},e.UTM]},{bK:"constructor",e:/\{/,eE:!0}],i:/#(?!!)/}}),e.registerLanguage("json",function(e){var t={literal:"true false null"},r=[e.QSM,e.CNM],a={e:",",eW:!0,eE:!0,c:r,k:t},n={b:"{",e:"}",c:[{cN:"attr",b:/"/,e:/"/,c:[e.BE],i:"\\n"},e.inherit(a,{b:/:/})],i:"\\S"},i={b:"\\[",e:"\\]",c:[e.inherit(a)],i:"\\S"};return r.splice(r.length,0,n,i),{c:r,k:t,i:"\\S"}}),e.registerLanguage("makefile",function(e){var t={cN:"variable",b:/\$\(/,e:/\)/,c:[e.BE]};return{aliases:["mk","mak"],c:[e.HCM,{b:/^\w+\s*\W*=/,rB:!0,r:0,starts:{e:/\s*\W*=/,eE:!0,starts:{e:/$/,r:0,c:[t]}}},{cN:"section",b:/^[\w]+:\s*$/},{cN:"meta",b:/^\.PHONY:/,e:/$/,k:{"meta-keyword":".PHONY"},l:/[\.\w]+/},{b:/^\t+/,e:/$/,r:0,c:[e.QSM,t]}]}}),e.registerLanguage("xml",function(e){var t="[A-Za-z0-9\\._:-]+",r={eW:!0,i:/</,r:0,c:[{cN:"attr",b:t,r:0},{b:/=\s*/,r:0,c:[{cN:"string",endsParent:!0,v:[{b:/"/,e:/"/},{b:/'/,e:/'/},{b:/[^\s"'=<>`]+/}]}]}]};return{aliases:["html","xhtml","rss","atom","xjb","xsd","xsl","plist"],cI:!0,c:[{cN:"meta",b:"<!DOCTYPE",e:">",r:10,c:[{b:"\\[",e:"\\]"}]},e.C("<!--","-->",{r:10}),{b:"<\\!\\[CDATA\\[",e:"\\]\\]>",r:10},{b:/<\?(php)?/,e:/\?>/,sL:"php",c:[{b:"/\\*",e:"\\*/",skip:!0}]},{cN:"tag",b:"<style(?=\\s|>|$)",e:">",k:{name:"style"},c:[r],starts:{e:"</style>",rE:!0,sL:["css","xml"]}},{cN:"tag",b:"<script(?=\\s|>|$)",e:">",k:{name:"script"},c:[r],starts:{e:"</script>",rE:!0,sL:["actionscript","javascript","handlebars","xml"]}},{cN:"meta",v:[{b:/<\?xml/,e:/\?>/,r:10},{b:/<\?\w+/,e:/\?>/}]},{cN:"tag",b:"</?",e:"/?>",c:[{cN:"name",b:/[^\/><\s]+/,r:0},r]}]}}),e.registerLanguage("markdown",function(e){return{aliases:["md","mkdown","mkd"],c:[{cN:"section",v:[{b:"^#{1,6}",e:"$"},{b:"^.+?\\n[=-]{2,}$"}]},{b:"<",e:">",sL:"xml",r:0},{cN:"bullet",b:"^([*+-]|(\\d+\\.))\\s+"},{cN:"strong",b:"[*_]{2}.+?[*_]{2}"},{cN:"emphasis",v:[{b:"\\*.+?\\*"},{b:"_.+?_",r:0}]},{cN:"quote",b:"^>\\s+",e:"$"},{cN:"code",v:[{b:"^```w*s*$",e:"^```s*$"},{b:"`.+?`"},{b:"^( {4}|	)",e:"$",r:0}]},{b:"^[-\\*]{3,}",e:"$"},{b:"\\[.+?\\][\\(\\[].*?[\\)\\]]",rB:!0,c:[{cN:"string",b:"\\[",e:"\\]",eB:!0,rE:!0,r:0},{cN:"link",b:"\\]\\(",e:"\\)",eB:!0,eE:!0},{cN:"symbol",b:"\\]\\[",e:"\\]",eB:!0,eE:!0}],r:10},{b:/^\[[^\n]+\]:/,rB:!0,c:[{cN:"symbol",b:/\[/,e:/\]/,eB:!0,eE:!0},{cN:"link",b:/:\s*/,e:/$/,eB:!0}]}]}}),e.registerLanguage("nginx",function(e){var t={cN:"variable",v:[{b:/\$\d+/},{b:/\$\{/,e:/}/},{b:"[\\$\\@]"+e.UIR}]},r={eW:!0,l:"[a-z/_]+",k:{literal:"on off yes no true false none blocked debug info notice warn error crit select break last permanent redirect kqueue rtsig epoll poll /dev/poll"},r:0,i:"=>",c:[e.HCM,{cN:"string",c:[e.BE,t],v:[{b:/"/,e:/"/},{b:/'/,e:/'/}]},{b:"([a-z]+):/",e:"\\s",eW:!0,eE:!0,c:[t]},{cN:"regexp",c:[e.BE,t],v:[{b:"\\s\\^",e:"\\s|{|;",rE:!0},{b:"~\\*?\\s+",e:"\\s|{|;",rE:!0},{b:"\\*(\\.[a-z\\-]+)+"},{b:"([a-z\\-]+\\.)+\\*"}]},{cN:"number",b:"\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}(:\\d{1,5})?\\b"},{cN:"number",b:"\\b\\d+[kKmMgGdshdwy]*\\b",r:0},t]};return{aliases:["nginxconf"],c:[e.HCM,{b:e.UIR+"\\s+{",rB:!0,e:"{",c:[{cN:"section",b:e.UIR}],r:0},{b:e.UIR+"\\s",e:";|{",rB:!0,c:[{cN:"attribute",b:e.UIR,starts:r}],r:0}],i:"[^\\s\\}]"}}),e.registerLanguage("objectivec",function(e){var t={cN:"built_in",b:"\\b(AV|CA|CF|CG|CI|CL|CM|CN|CT|MK|MP|MTK|MTL|NS|SCN|SK|UI|WK|XC)\\w+"},r={keyword:"int float while char export sizeof typedef const struct for union unsigned long volatile static bool mutable if do return goto void enum else break extern asm case short default double register explicit signed typename this switch continue wchar_t inline readonly assign readwrite self @synchronized id typeof nonatomic super unichar IBOutlet IBAction strong weak copy in out inout bycopy byref oneway __strong __weak __block __autoreleasing @private @protected @public @try @property @end @throw @catch @finally @autoreleasepool @synthesize @dynamic @selector @optional @required @encode @package @import @defs @compatibility_alias __bridge __bridge_transfer __bridge_retained __bridge_retain __covariant __contravariant __kindof _Nonnull _Nullable _Null_unspecified __FUNCTION__ __PRETTY_FUNCTION__ __attribute__ getter setter retain unsafe_unretained nonnull nullable null_unspecified null_resettable class instancetype NS_DESIGNATED_INITIALIZER NS_UNAVAILABLE NS_REQUIRES_SUPER NS_RETURNS_INNER_POINTER NS_INLINE NS_AVAILABLE NS_DEPRECATED NS_ENUM NS_OPTIONS NS_SWIFT_UNAVAILABLE NS_ASSUME_NONNULL_BEGIN NS_ASSUME_NONNULL_END NS_REFINED_FOR_SWIFT NS_SWIFT_NAME NS_SWIFT_NOTHROW NS_DURING NS_HANDLER NS_ENDHANDLER NS_VALUERETURN NS_VOIDRETURN",literal:"false true FALSE TRUE nil YES NO NULL",built_in:"BOOL dispatch_once_t dispatch_queue_t dispatch_sync dispatch_async dispatch_once"},a=/[a-zA-Z@][a-zA-Z0-9_]*/,n="@interface @class @protocol @implementation";return{aliases:["mm","objc","obj-c"],k:r,l:a,i:"</",c:[t,e.CLCM,e.CBCM,e.CNM,e.QSM,{cN:"string",v:[{b:'@"',e:'"',i:"\\n",c:[e.BE]},{b:"'",e:"[^\\\\]'",i:"[^\\\\][^']"}]},{cN:"meta",b:"#",e:"$",c:[{cN:"meta-string",v:[{b:'"',e:'"'},{b:"<",e:">"}]}]},{cN:"class",b:"("+n.split(" ").join("|")+")\\b",e:"({|$)",eE:!0,k:n,l:a,c:[e.UTM]},{b:"\\."+e.UIR,r:0}]}}),e.registerLanguage("perl",function(e){var t="getpwent getservent quotemeta msgrcv scalar kill dbmclose undef lc ma syswrite tr send umask sysopen shmwrite vec qx utime local oct semctl localtime readpipe do return format read sprintf dbmopen pop getpgrp not getpwnam rewinddir qqfileno qw endprotoent wait sethostent bless s|0 opendir continue each sleep endgrent shutdown dump chomp connect getsockname die socketpair close flock exists index shmgetsub for endpwent redo lstat msgctl setpgrp abs exit select print ref gethostbyaddr unshift fcntl syscall goto getnetbyaddr join gmtime symlink semget splice x|0 getpeername recv log setsockopt cos last reverse gethostbyname getgrnam study formline endhostent times chop length gethostent getnetent pack getprotoent getservbyname rand mkdir pos chmod y|0 substr endnetent printf next open msgsnd readdir use unlink getsockopt getpriority rindex wantarray hex system getservbyport endservent int chr untie rmdir prototype tell listen fork shmread ucfirst setprotoent else sysseek link getgrgid shmctl waitpid unpack getnetbyname reset chdir grep split require caller lcfirst until warn while values shift telldir getpwuid my getprotobynumber delete and sort uc defined srand accept package seekdir getprotobyname semop our rename seek if q|0 chroot sysread setpwent no crypt getc chown sqrt write setnetent setpriority foreach tie sin msgget map stat getlogin unless elsif truncate exec keys glob tied closedirioctl socket readlink eval xor readline binmode setservent eof ord bind alarm pipe atan2 getgrent exp time push setgrent gt lt or ne m|0 break given say state when",r={cN:"subst",b:"[$@]\\{",e:"\\}",k:t},a={b:"->{",e:"}"},n={v:[{b:/\$\d/},{b:/[\$%@](\^\w\b|#\w+(::\w+)*|{\w+}|\w+(::\w*)*)/},{b:/[\$%@][^\s\w{]/,r:0}]},i=[e.BE,r,n],s=[n,e.HCM,e.C("^\\=\\w","\\=cut",{eW:!0}),a,{cN:"string",c:i,v:[{b:"q[qwxr]?\\s*\\(",e:"\\)",r:5},{b:"q[qwxr]?\\s*\\[",e:"\\]",r:5},{b:"q[qwxr]?\\s*\\{",e:"\\}",r:5},{b:"q[qwxr]?\\s*\\|",e:"\\|",r:5},{b:"q[qwxr]?\\s*\\<",e:"\\>",r:5},{b:"qw\\s+q",e:"q",r:5},{b:"'",e:"'",c:[e.BE]},{b:'"',e:'"'},{b:"`",e:"`",c:[e.BE]},{b:"{\\w+}",c:[],r:0},{b:"-?\\w+\\s*\\=\\>",c:[],r:0}]},{cN:"number",b:"(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",r:0},{b:"(\\/\\/|"+e.RSR+"|\\b(split|return|print|reverse|grep)\\b)\\s*",k:"split return print reverse grep",r:0,c:[e.HCM,{cN:"regexp",b:"(s|tr|y)/(\\\\.|[^/])*/(\\\\.|[^/])*/[a-z]*",r:10},{cN:"regexp",b:"(m|qr)?/",e:"/[a-z]*",c:[e.BE],r:0}]},{cN:"function",bK:"sub",e:"(\\s*\\(.*?\\))?[;{]",eE:!0,r:5,c:[e.TM]},{b:"-\\w\\b",r:0},{b:"^__DATA__$",e:"^__END__$",sL:"mojolicious",c:[{b:"^@@.*",e:"$",cN:"comment"}]}];return r.c=s,a.c=s,{aliases:["pl","pm"],l:/[\w\.]+/,k:t,c:s}}),e.registerLanguage("php",function(e){var t={b:"\\$+[a-zA-Z_-ÿ][a-zA-Z0-9_-ÿ]*"},r={cN:"meta",b:/<\?(php)?|\?>/},a={cN:"string",c:[e.BE,r],v:[{b:'b"',e:'"'},{b:"b'",e:"'"},e.inherit(e.ASM,{i:null}),e.inherit(e.QSM,{i:null})]},n={v:[e.BNM,e.CNM]};return{aliases:["php3","php4","php5","php6"],cI:!0,k:"and include_once list abstract global private echo interface as static endswitch array null if endwhile or const for endforeach self var while isset public protected exit foreach throw elseif include __FILE__ empty require_once do xor return parent clone use __CLASS__ __LINE__ else break print eval new catch __METHOD__ case exception default die require __FUNCTION__ enddeclare final try switch continue endfor endif declare unset true false trait goto instanceof insteadof __DIR__ __NAMESPACE__ yield finally",c:[e.HCM,e.C("//","$",{c:[r]}),e.C("/\\*","\\*/",{c:[{cN:"doctag",b:"@[A-Za-z]+"}]}),e.C("__halt_compiler.+?;",!1,{eW:!0,k:"__halt_compiler",l:e.UIR}),{cN:"string",b:/<<<['"]?\w+['"]?$/,e:/^\w+;?$/,c:[e.BE,{cN:"subst",v:[{b:/\$\w+/},{b:/\{\$/,e:/\}/}]}]},r,{cN:"keyword",b:/\$this\b/},t,{b:/(::|->)+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/},{cN:"function",bK:"function",e:/[;{]/,eE:!0,i:"\\$|\\[|%",c:[e.UTM,{cN:"params",b:"\\(",e:"\\)",c:["self",t,e.CBCM,a,n]}]},{cN:"class",bK:"class interface",e:"{",eE:!0,i:/[:\(\$"]/,c:[{bK:"extends implements"},e.UTM]},{bK:"namespace",e:";",i:/[\.']/,c:[e.UTM]},{bK:"use",e:";",c:[e.UTM]},{b:"=>"},a,n]}}),e.registerLanguage("python",function(e){var t={cN:"meta",b:/^(>>>|\.\.\.) /},r={cN:"string",c:[e.BE],v:[{b:/(u|b)?r?'''/,e:/'''/,c:[t],r:10},{b:/(u|b)?r?"""/,e:/"""/,c:[t],r:10},{b:/(u|r|ur)'/,e:/'/,r:10},{b:/(u|r|ur)"/,e:/"/,r:10},{b:/(b|br)'/,e:/'/},{b:/(b|br)"/,e:/"/},e.ASM,e.QSM]},a={cN:"number",r:0,v:[{b:e.BNR+"[lLjJ]?"},{b:"\\b(0o[0-7]+)[lLjJ]?"},{b:e.CNR+"[lLjJ]?"}]},n={cN:"params",b:/\(/,e:/\)/,c:["self",t,a,r]};return{aliases:["py","gyp"],k:{keyword:"and elif is global as in if from raise for except finally print import pass return exec else break not with class assert yield try while continue del or def lambda async await nonlocal|10 None True False",built_in:"Ellipsis NotImplemented"},i:/(<\/|->|\?)/,c:[t,a,r,e.HCM,{v:[{cN:"function",bK:"def",r:10},{cN:"class",bK:"class"}],e:/:/,i:/[${=;\n,]/,c:[e.UTM,n,{b:/->/,eW:!0,k:"None"}]},{cN:"meta",b:/^[\t ]*@/,e:/$/},{b:/\b(print|exec)\(/}]}}),e.registerLanguage("ruby",function(e){var t="[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?",r={keyword:"and then defined module in return redo if BEGIN retry end for self when next until do begin unless END rescue else break undef not super class case require yield alias while ensure elsif or include attr_reader attr_writer attr_accessor",literal:"true false nil"},a={cN:"doctag",b:"@[A-Za-z]+"},n={b:"#<",e:">"},i=[e.C("#","$",{c:[a]}),e.C("^\\=begin","^\\=end",{c:[a],r:10}),e.C("^__END__","\\n$")],s={cN:"subst",b:"#\\{",e:"}",k:r},c={cN:"string",c:[e.BE,s],v:[{b:/'/,e:/'/},{b:/"/,e:/"/},{b:/`/,e:/`/},{b:"%[qQwWx]?\\(",e:"\\)"},{b:"%[qQwWx]?\\[",e:"\\]"},{b:"%[qQwWx]?{",e:"}"},{b:"%[qQwWx]?<",e:">"},{b:"%[qQwWx]?/",e:"/"},{b:"%[qQwWx]?%",e:"%"},{b:"%[qQwWx]?-",e:"-"},{b:"%[qQwWx]?\\|",e:"\\|"},{b:/\B\?(\\\d{1,3}|\\x[A-Fa-f0-9]{1,2}|\\u[A-Fa-f0-9]{4}|\\?\S)\b/},{b:/<<(-?)\w+$/,e:/^\s*\w+$/}]},o={cN:"params",b:"\\(",e:"\\)",endsParent:!0,k:r},l=[c,n,{cN:"class",bK:"class module",e:"$|;",i:/=/,c:[e.inherit(e.TM,{b:"[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?"}),{b:"<\\s*",c:[{b:"("+e.IR+"::)?"+e.IR}]}].concat(i)},{cN:"function",bK:"def",
e:"$|;",c:[e.inherit(e.TM,{b:t}),o].concat(i)},{b:e.IR+"::"},{cN:"symbol",b:e.UIR+"(\\!|\\?)?:",r:0},{cN:"symbol",b:":(?!\\s)",c:[c,{b:t}],r:0},{cN:"number",b:"(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",r:0},{b:"(\\$\\W)|((\\$|\\@\\@?)(\\w+))"},{cN:"params",b:/\|/,e:/\|/,k:r},{b:"("+e.RSR+")\\s*",c:[n,{cN:"regexp",c:[e.BE,s],i:/\n/,v:[{b:"/",e:"/[a-z]*"},{b:"%r{",e:"}[a-z]*"},{b:"%r\\(",e:"\\)[a-z]*"},{b:"%r!",e:"![a-z]*"},{b:"%r\\[",e:"\\][a-z]*"}]}].concat(i),r:0}].concat(i);s.c=l,o.c=l;var u="[>?]>",d="[\\w#]+\\(\\w+\\):\\d+:\\d+>",b="(\\w+-)?\\d+\\.\\d+\\.\\d(p\\d+)?[^>]+>",p=[{b:/^\s*=>/,starts:{e:"$",c:l}},{cN:"meta",b:"^("+u+"|"+d+"|"+b+")",starts:{e:"$",c:l}}];return{aliases:["rb","gemspec","podspec","thor","irb"],k:r,i:/\/\*/,c:i.concat(p).concat(l)}}),e.registerLanguage("sql",function(e){var t=e.C("--","$");return{cI:!0,i:/[<>{}*#]/,c:[{bK:"begin end start commit rollback savepoint lock alter create drop rename call delete do handler insert load replace select truncate update set show pragma grant merge describe use explain help declare prepare execute deallocate release unlock purge reset change stop analyze cache flush optimize repair kill install uninstall checksum restore check backup revoke comment",e:/;/,eW:!0,l:/[\w\.]+/,k:{keyword:"abort abs absolute acc acce accep accept access accessed accessible account acos action activate add addtime admin administer advanced advise aes_decrypt aes_encrypt after agent aggregate ali alia alias allocate allow alter always analyze ancillary and any anydata anydataset anyschema anytype apply archive archived archivelog are as asc ascii asin assembly assertion associate asynchronous at atan atn2 attr attri attrib attribu attribut attribute attributes audit authenticated authentication authid authors auto autoallocate autodblink autoextend automatic availability avg backup badfile basicfile before begin beginning benchmark between bfile bfile_base big bigfile bin binary_double binary_float binlog bit_and bit_count bit_length bit_or bit_xor bitmap blob_base block blocksize body both bound buffer_cache buffer_pool build bulk by byte byteordermark bytes cache caching call calling cancel capacity cascade cascaded case cast catalog category ceil ceiling chain change changed char_base char_length character_length characters characterset charindex charset charsetform charsetid check checksum checksum_agg child choose chr chunk class cleanup clear client clob clob_base clone close cluster_id cluster_probability cluster_set clustering coalesce coercibility col collate collation collect colu colum column column_value columns columns_updated comment commit compact compatibility compiled complete composite_limit compound compress compute concat concat_ws concurrent confirm conn connec connect connect_by_iscycle connect_by_isleaf connect_by_root connect_time connection consider consistent constant constraint constraints constructor container content contents context contributors controlfile conv convert convert_tz corr corr_k corr_s corresponding corruption cos cost count count_big counted covar_pop covar_samp cpu_per_call cpu_per_session crc32 create creation critical cross cube cume_dist curdate current current_date current_time current_timestamp current_user cursor curtime customdatum cycle data database databases datafile datafiles datalength date_add date_cache date_format date_sub dateadd datediff datefromparts datename datepart datetime2fromparts day day_to_second dayname dayofmonth dayofweek dayofyear days db_role_change dbtimezone ddl deallocate declare decode decompose decrement decrypt deduplicate def defa defau defaul default defaults deferred defi defin define degrees delayed delegate delete delete_all delimited demand dense_rank depth dequeue des_decrypt des_encrypt des_key_file desc descr descri describ describe descriptor deterministic diagnostics difference dimension direct_load directory disable disable_all disallow disassociate discardfile disconnect diskgroup distinct distinctrow distribute distributed div do document domain dotnet double downgrade drop dumpfile duplicate duration each edition editionable editions element ellipsis else elsif elt empty enable enable_all enclosed encode encoding encrypt end end-exec endian enforced engine engines enqueue enterprise entityescaping eomonth error errors escaped evalname evaluate event eventdata events except exception exceptions exchange exclude excluding execu execut execute exempt exists exit exp expire explain export export_set extended extent external external_1 external_2 externally extract failed failed_login_attempts failover failure far fast feature_set feature_value fetch field fields file file_name_convert filesystem_like_logging final finish first first_value fixed flash_cache flashback floor flush following follows for forall force form forma format found found_rows freelist freelists freepools fresh from from_base64 from_days ftp full function general generated get get_format get_lock getdate getutcdate global global_name globally go goto grant grants greatest group group_concat group_id grouping grouping_id groups gtid_subtract guarantee guard handler hash hashkeys having hea head headi headin heading heap help hex hierarchy high high_priority hosts hour http id ident_current ident_incr ident_seed identified identity idle_time if ifnull ignore iif ilike ilm immediate import in include including increment index indexes indexing indextype indicator indices inet6_aton inet6_ntoa inet_aton inet_ntoa infile initial initialized initially initrans inmemory inner innodb input insert install instance instantiable instr interface interleaved intersect into invalidate invisible is is_free_lock is_ipv4 is_ipv4_compat is_not is_not_null is_used_lock isdate isnull isolation iterate java join json json_exists keep keep_duplicates key keys kill language large last last_day last_insert_id last_value lax lcase lead leading least leaves left len lenght length less level levels library like like2 like4 likec limit lines link list listagg little ln load load_file lob lobs local localtime localtimestamp locate locator lock locked log log10 log2 logfile logfiles logging logical logical_reads_per_call logoff logon logs long loop low low_priority lower lpad lrtrim ltrim main make_set makedate maketime managed management manual map mapping mask master master_pos_wait match matched materialized max maxextents maximize maxinstances maxlen maxlogfiles maxloghistory maxlogmembers maxsize maxtrans md5 measures median medium member memcompress memory merge microsecond mid migration min minextents minimum mining minus minute minvalue missing mod mode model modification modify module monitoring month months mount move movement multiset mutex name name_const names nan national native natural nav nchar nclob nested never new newline next nextval no no_write_to_binlog noarchivelog noaudit nobadfile nocheck nocompress nocopy nocycle nodelay nodiscardfile noentityescaping noguarantee nokeep nologfile nomapping nomaxvalue nominimize nominvalue nomonitoring none noneditionable nonschema noorder nopr nopro noprom nopromp noprompt norely noresetlogs noreverse normal norowdependencies noschemacheck noswitch not nothing notice notrim novalidate now nowait nth_value nullif nulls num numb numbe nvarchar nvarchar2 object ocicoll ocidate ocidatetime ociduration ociinterval ociloblocator ocinumber ociref ocirefcursor ocirowid ocistring ocitype oct octet_length of off offline offset oid oidindex old on online only opaque open operations operator optimal optimize option optionally or oracle oracle_date oradata ord ordaudio orddicom orddoc order ordimage ordinality ordvideo organization orlany orlvary out outer outfile outline output over overflow overriding package pad parallel parallel_enable parameters parent parse partial partition partitions pascal passing password password_grace_time password_lock_time password_reuse_max password_reuse_time password_verify_function patch path patindex pctincrease pctthreshold pctused pctversion percent percent_rank percentile_cont percentile_disc performance period period_add period_diff permanent physical pi pipe pipelined pivot pluggable plugin policy position post_transaction pow power pragma prebuilt precedes preceding precision prediction prediction_cost prediction_details prediction_probability prediction_set prepare present preserve prior priority private private_sga privileges procedural procedure procedure_analyze processlist profiles project prompt protection public publishingservername purge quarter query quick quiesce quota quotename radians raise rand range rank raw read reads readsize rebuild record records recover recovery recursive recycle redo reduced ref reference referenced references referencing refresh regexp_like register regr_avgx regr_avgy regr_count regr_intercept regr_r2 regr_slope regr_sxx regr_sxy reject rekey relational relative relaylog release release_lock relies_on relocate rely rem remainder rename repair repeat replace replicate replication required reset resetlogs resize resource respect restore restricted result result_cache resumable resume retention return returning returns reuse reverse revoke right rlike role roles rollback rolling rollup round row row_count rowdependencies rowid rownum rows rtrim rules safe salt sample save savepoint sb1 sb2 sb4 scan schema schemacheck scn scope scroll sdo_georaster sdo_topo_geometry search sec_to_time second section securefile security seed segment select self sequence sequential serializable server servererror session session_user sessions_per_user set sets settings sha sha1 sha2 share shared shared_pool short show shrink shutdown si_averagecolor si_colorhistogram si_featurelist si_positionalcolor si_stillimage si_texture siblings sid sign sin size size_t sizes skip slave sleep smalldatetimefromparts smallfile snapshot some soname sort soundex source space sparse spfile split sql sql_big_result sql_buffer_result sql_cache sql_calc_found_rows sql_small_result sql_variant_property sqlcode sqldata sqlerror sqlname sqlstate sqrt square standalone standby start starting startup statement static statistics stats_binomial_test stats_crosstab stats_ks_test stats_mode stats_mw_test stats_one_way_anova stats_t_test_ stats_t_test_indep stats_t_test_one stats_t_test_paired stats_wsr_test status std stddev stddev_pop stddev_samp stdev stop storage store stored str str_to_date straight_join strcmp strict string struct stuff style subdate subpartition subpartitions substitutable substr substring subtime subtring_index subtype success sum suspend switch switchoffset switchover sync synchronous synonym sys sys_xmlagg sysasm sysaux sysdate sysdatetimeoffset sysdba sysoper system system_user sysutcdatetime table tables tablespace tan tdo template temporary terminated tertiary_weights test than then thread through tier ties time time_format time_zone timediff timefromparts timeout timestamp timestampadd timestampdiff timezone_abbr timezone_minute timezone_region to to_base64 to_date to_days to_seconds todatetimeoffset trace tracking transaction transactional translate translation treat trigger trigger_nestlevel triggers trim truncate try_cast try_convert try_parse type ub1 ub2 ub4 ucase unarchived unbounded uncompress under undo unhex unicode uniform uninstall union unique unix_timestamp unknown unlimited unlock unpivot unrecoverable unsafe unsigned until untrusted unusable unused update updated upgrade upped upper upsert url urowid usable usage use use_stored_outlines user user_data user_resources users using utc_date utc_timestamp uuid uuid_short validate validate_password_strength validation valist value values var var_samp varcharc vari varia variab variabl variable variables variance varp varraw varrawc varray verify version versions view virtual visible void wait wallet warning warnings week weekday weekofyear wellformed when whene whenev wheneve whenever where while whitespace with within without work wrapped xdb xml xmlagg xmlattributes xmlcast xmlcolattval xmlelement xmlexists xmlforest xmlindex xmlnamespaces xmlpi xmlquery xmlroot xmlschema xmlserialize xmltable xmltype xor year year_to_month years yearweek",literal:"true false null",built_in:"array bigint binary bit blob boolean char character date dec decimal float int int8 integer interval number numeric real record serial serial8 smallint text varchar varying void"},c:[{cN:"string",b:"'",e:"'",c:[e.BE,{b:"''"}]},{cN:"string",b:'"',e:'"',c:[e.BE,{b:'""'}]},{cN:"string",b:"`",e:"`",c:[e.BE]},e.CNM,e.CBCM,t]},e.CBCM,t]}}),e});


/* ---- /1Mi3ThNGPyiuhiWCJPH2BAqeKCiBF5BVpR/jquery.min.js ---- */


/*! jQuery v2.2.4 | (c) jQuery Foundation | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=a.document,e=c.slice,f=c.concat,g=c.push,h=c.indexOf,i={},j=i.toString,k=i.hasOwnProperty,l={},m="2.2.4",n=function(a,b){return new n.fn.init(a,b)},o=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,p=/^-ms-/,q=/-([\da-z])/gi,r=function(a,b){return b.toUpperCase()};n.fn=n.prototype={jquery:m,constructor:n,selector:"",length:0,toArray:function(){return e.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:e.call(this)},pushStack:function(a){var b=n.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a){return n.each(this,a)},map:function(a){return this.pushStack(n.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(e.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor()},push:g,sort:c.sort,splice:c.splice},n.extend=n.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||n.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(a=arguments[h]))for(b in a)c=g[b],d=a[b],g!==d&&(j&&d&&(n.isPlainObject(d)||(e=n.isArray(d)))?(e?(e=!1,f=c&&n.isArray(c)?c:[]):f=c&&n.isPlainObject(c)?c:{},g[b]=n.extend(j,f,d)):void 0!==d&&(g[b]=d));return g},n.extend({expando:"jQuery"+(m+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===n.type(a)},isArray:Array.isArray,isWindow:function(a){return null!=a&&a===a.window},isNumeric:function(a){var b=a&&a.toString();return!n.isArray(a)&&b-parseFloat(b)+1>=0},isPlainObject:function(a){var b;if("object"!==n.type(a)||a.nodeType||n.isWindow(a))return!1;if(a.constructor&&!k.call(a,"constructor")&&!k.call(a.constructor.prototype||{},"isPrototypeOf"))return!1;for(b in a);return void 0===b||k.call(a,b)},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?i[j.call(a)]||"object":typeof a},globalEval:function(a){var b,c=eval;a=n.trim(a),a&&(1===a.indexOf("use strict")?(b=d.createElement("script"),b.text=a,d.head.appendChild(b).parentNode.removeChild(b)):c(a))},camelCase:function(a){return a.replace(p,"ms-").replace(q,r)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b){var c,d=0;if(s(a)){for(c=a.length;c>d;d++)if(b.call(a[d],d,a[d])===!1)break}else for(d in a)if(b.call(a[d],d,a[d])===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(o,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(s(Object(a))?n.merge(c,"string"==typeof a?[a]:a):g.call(c,a)),c},inArray:function(a,b,c){return null==b?-1:h.call(b,a,c)},merge:function(a,b){for(var c=+b.length,d=0,e=a.length;c>d;d++)a[e++]=b[d];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,e,g=0,h=[];if(s(a))for(d=a.length;d>g;g++)e=b(a[g],g,c),null!=e&&h.push(e);else for(g in a)e=b(a[g],g,c),null!=e&&h.push(e);return f.apply([],h)},guid:1,proxy:function(a,b){var c,d,f;return"string"==typeof b&&(c=a[b],b=a,a=c),n.isFunction(a)?(d=e.call(arguments,2),f=function(){return a.apply(b||this,d.concat(e.call(arguments)))},f.guid=a.guid=a.guid||n.guid++,f):void 0},now:Date.now,support:l}),"function"==typeof Symbol&&(n.fn[Symbol.iterator]=c[Symbol.iterator]),n.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(a,b){i["[object "+b+"]"]=b.toLowerCase()});function s(a){var b=!!a&&"length"in a&&a.length,c=n.type(a);return"function"===c||n.isWindow(a)?!1:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var t=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+1*new Date,v=a.document,w=0,x=0,y=ga(),z=ga(),A=ga(),B=function(a,b){return a===b&&(l=!0),0},C=1<<31,D={}.hasOwnProperty,E=[],F=E.pop,G=E.push,H=E.push,I=E.slice,J=function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1},K="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",L="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",N="\\["+L+"*("+M+")(?:"+L+"*([*^$|!~]?=)"+L+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+M+"))|)"+L+"*\\]",O=":("+M+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+N+")*)|.*)\\)|)",P=new RegExp(L+"+","g"),Q=new RegExp("^"+L+"+|((?:^|[^\\\\])(?:\\\\.)*)"+L+"+$","g"),R=new RegExp("^"+L+"*,"+L+"*"),S=new RegExp("^"+L+"*([>+~]|"+L+")"+L+"*"),T=new RegExp("="+L+"*([^\\]'\"]*?)"+L+"*\\]","g"),U=new RegExp(O),V=new RegExp("^"+M+"$"),W={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),TAG:new RegExp("^("+M+"|[*])"),ATTR:new RegExp("^"+N),PSEUDO:new RegExp("^"+O),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+L+"*(even|odd|(([+-]|)(\\d*)n|)"+L+"*(?:([+-]|)"+L+"*(\\d+)|))"+L+"*\\)|)","i"),bool:new RegExp("^(?:"+K+")$","i"),needsContext:new RegExp("^"+L+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+L+"*((?:-\\d)?\\d*)"+L+"*\\)|)(?=[^-]|$)","i")},X=/^(?:input|select|textarea|button)$/i,Y=/^h\d$/i,Z=/^[^{]+\{\s*\[native \w/,$=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,_=/[+~]/,aa=/'|\\/g,ba=new RegExp("\\\\([\\da-f]{1,6}"+L+"?|("+L+")|.)","ig"),ca=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},da=function(){m()};try{H.apply(E=I.call(v.childNodes),v.childNodes),E[v.childNodes.length].nodeType}catch(ea){H={apply:E.length?function(a,b){G.apply(a,I.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function fa(a,b,d,e){var f,h,j,k,l,o,r,s,w=b&&b.ownerDocument,x=b?b.nodeType:9;if(d=d||[],"string"!=typeof a||!a||1!==x&&9!==x&&11!==x)return d;if(!e&&((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,p)){if(11!==x&&(o=$.exec(a)))if(f=o[1]){if(9===x){if(!(j=b.getElementById(f)))return d;if(j.id===f)return d.push(j),d}else if(w&&(j=w.getElementById(f))&&t(b,j)&&j.id===f)return d.push(j),d}else{if(o[2])return H.apply(d,b.getElementsByTagName(a)),d;if((f=o[3])&&c.getElementsByClassName&&b.getElementsByClassName)return H.apply(d,b.getElementsByClassName(f)),d}if(c.qsa&&!A[a+" "]&&(!q||!q.test(a))){if(1!==x)w=b,s=a;else if("object"!==b.nodeName.toLowerCase()){(k=b.getAttribute("id"))?k=k.replace(aa,"\\$&"):b.setAttribute("id",k=u),r=g(a),h=r.length,l=V.test(k)?"#"+k:"[id='"+k+"']";while(h--)r[h]=l+" "+qa(r[h]);s=r.join(","),w=_.test(a)&&oa(b.parentNode)||b}if(s)try{return H.apply(d,w.querySelectorAll(s)),d}catch(y){}finally{k===u&&b.removeAttribute("id")}}}return i(a.replace(Q,"$1"),b,d,e)}function ga(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ha(a){return a[u]=!0,a}function ia(a){var b=n.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function ja(a,b){var c=a.split("|"),e=c.length;while(e--)d.attrHandle[c[e]]=b}function ka(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||C)-(~a.sourceIndex||C);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function la(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function ma(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function na(a){return ha(function(b){return b=+b,ha(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function oa(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}c=fa.support={},f=fa.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},m=fa.setDocument=function(a){var b,e,g=a?a.ownerDocument||a:v;return g!==n&&9===g.nodeType&&g.documentElement?(n=g,o=n.documentElement,p=!f(n),(e=n.defaultView)&&e.top!==e&&(e.addEventListener?e.addEventListener("unload",da,!1):e.attachEvent&&e.attachEvent("onunload",da)),c.attributes=ia(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ia(function(a){return a.appendChild(n.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=Z.test(n.getElementsByClassName),c.getById=ia(function(a){return o.appendChild(a).id=u,!n.getElementsByName||!n.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c=b.getElementById(a);return c?[c]:[]}},d.filter.ID=function(a){var b=a.replace(ba,ca);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(ba,ca);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return"undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):c.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return"undefined"!=typeof b.getElementsByClassName&&p?b.getElementsByClassName(a):void 0},r=[],q=[],(c.qsa=Z.test(n.querySelectorAll))&&(ia(function(a){o.appendChild(a).innerHTML="<a id='"+u+"'></a><select id='"+u+"-\r\\' msallowcapture=''><option selected=''></option></select>",a.querySelectorAll("[msallowcapture^='']").length&&q.push("[*^$]="+L+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+L+"*(?:value|"+K+")"),a.querySelectorAll("[id~="+u+"-]").length||q.push("~="),a.querySelectorAll(":checked").length||q.push(":checked"),a.querySelectorAll("a#"+u+"+*").length||q.push(".#.+[+~]")}),ia(function(a){var b=n.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+L+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=Z.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ia(function(a){c.disconnectedMatch=s.call(a,"div"),s.call(a,"[s!='']:x"),r.push("!=",O)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=Z.test(o.compareDocumentPosition),t=b||Z.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===n||a.ownerDocument===v&&t(v,a)?-1:b===n||b.ownerDocument===v&&t(v,b)?1:k?J(k,a)-J(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,e=a.parentNode,f=b.parentNode,g=[a],h=[b];if(!e||!f)return a===n?-1:b===n?1:e?-1:f?1:k?J(k,a)-J(k,b):0;if(e===f)return ka(a,b);c=a;while(c=c.parentNode)g.unshift(c);c=b;while(c=c.parentNode)h.unshift(c);while(g[d]===h[d])d++;return d?ka(g[d],h[d]):g[d]===v?-1:h[d]===v?1:0},n):n},fa.matches=function(a,b){return fa(a,null,null,b)},fa.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(T,"='$1']"),c.matchesSelector&&p&&!A[b+" "]&&(!r||!r.test(b))&&(!q||!q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return fa(b,n,null,[a]).length>0},fa.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},fa.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&D.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},fa.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},fa.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=fa.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=fa.selectors={cacheLength:50,createPseudo:ha,match:W,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(ba,ca),a[3]=(a[3]||a[4]||a[5]||"").replace(ba,ca),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||fa.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&fa.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return W.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&U.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(ba,ca).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+L+")"+a+"("+L+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=fa.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e.replace(P," ")+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h,t=!1;if(q){if(f){while(p){m=b;while(m=m[p])if(h?m.nodeName.toLowerCase()===r:1===m.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){m=q,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n&&j[2],m=n&&q.childNodes[n];while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if(1===m.nodeType&&++t&&m===b){k[a]=[w,n,t];break}}else if(s&&(m=b,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n),t===!1)while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if((h?m.nodeName.toLowerCase()===r:1===m.nodeType)&&++t&&(s&&(l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),k[a]=[w,t]),m===b))break;return t-=e,t===d||t%d===0&&t/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||fa.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?ha(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=J(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:ha(function(a){var b=[],c=[],d=h(a.replace(Q,"$1"));return d[u]?ha(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),b[0]=null,!c.pop()}}),has:ha(function(a){return function(b){return fa(a,b).length>0}}),contains:ha(function(a){return a=a.replace(ba,ca),function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:ha(function(a){return V.test(a||"")||fa.error("unsupported lang: "+a),a=a.replace(ba,ca).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return Y.test(a.nodeName)},input:function(a){return X.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:na(function(){return[0]}),last:na(function(a,b){return[b-1]}),eq:na(function(a,b,c){return[0>c?c+b:c]}),even:na(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:na(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:na(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:na(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=la(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=ma(b);function pa(){}pa.prototype=d.filters=d.pseudos,d.setFilters=new pa,g=fa.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){c&&!(e=R.exec(h))||(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=S.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(Q," ")}),h=h.slice(c.length));for(g in d.filter)!(e=W[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?fa.error(a):z(a,i).slice(0)};function qa(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function ra(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=x++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j,k=[w,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(j=b[u]||(b[u]={}),i=j[b.uniqueID]||(j[b.uniqueID]={}),(h=i[d])&&h[0]===w&&h[1]===f)return k[2]=h[2];if(i[d]=k,k[2]=a(b,c,g))return!0}}}function sa(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function ta(a,b,c){for(var d=0,e=b.length;e>d;d++)fa(a,b[d],c);return c}function ua(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(c&&!c(f,d,e)||(g.push(f),j&&b.push(h)));return g}function va(a,b,c,d,e,f){return d&&!d[u]&&(d=va(d)),e&&!e[u]&&(e=va(e,f)),ha(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||ta(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:ua(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=ua(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?J(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=ua(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):H.apply(g,r)})}function wa(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=ra(function(a){return a===b},h,!0),l=ra(function(a){return J(b,a)>-1},h,!0),m=[function(a,c,d){var e=!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d));return b=null,e}];f>i;i++)if(c=d.relative[a[i].type])m=[ra(sa(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;f>e;e++)if(d.relative[a[e].type])break;return va(i>1&&sa(m),i>1&&qa(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(Q,"$1"),c,e>i&&wa(a.slice(i,e)),f>e&&wa(a=a.slice(e)),f>e&&qa(a))}m.push(c)}return sa(m)}function xa(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,o,q,r=0,s="0",t=f&&[],u=[],v=j,x=f||e&&d.find.TAG("*",k),y=w+=null==v?1:Math.random()||.1,z=x.length;for(k&&(j=g===n||g||k);s!==z&&null!=(l=x[s]);s++){if(e&&l){o=0,g||l.ownerDocument===n||(m(l),h=!p);while(q=a[o++])if(q(l,g||n,h)){i.push(l);break}k&&(w=y)}c&&((l=!q&&l)&&r--,f&&t.push(l))}if(r+=s,c&&s!==r){o=0;while(q=b[o++])q(t,u,g,h);if(f){if(r>0)while(s--)t[s]||u[s]||(u[s]=F.call(i));u=ua(u)}H.apply(i,u),k&&!f&&u.length>0&&r+b.length>1&&fa.uniqueSort(i)}return k&&(w=y,j=v),t};return c?ha(f):f}return h=fa.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=wa(b[c]),f[u]?d.push(f):e.push(f);f=A(a,xa(e,d)),f.selector=a}return f},i=fa.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(ba,ca),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=W.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(ba,ca),_.test(j[0].type)&&oa(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&qa(j),!a)return H.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,!b||_.test(a)&&oa(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ia(function(a){return 1&a.compareDocumentPosition(n.createElement("div"))}),ia(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||ja("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ia(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||ja("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),ia(function(a){return null==a.getAttribute("disabled")})||ja(K,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),fa}(a);n.find=t,n.expr=t.selectors,n.expr[":"]=n.expr.pseudos,n.uniqueSort=n.unique=t.uniqueSort,n.text=t.getText,n.isXMLDoc=t.isXML,n.contains=t.contains;var u=function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&n(a).is(c))break;d.push(a)}return d},v=function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c},w=n.expr.match.needsContext,x=/^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,y=/^.[^:#\[\.,]*$/;function z(a,b,c){if(n.isFunction(b))return n.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return n.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(y.test(b))return n.filter(b,a,c);b=n.filter(b,a)}return n.grep(a,function(a){return h.call(b,a)>-1!==c})}n.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?n.find.matchesSelector(d,a)?[d]:[]:n.find.matches(a,n.grep(b,function(a){return 1===a.nodeType}))},n.fn.extend({find:function(a){var b,c=this.length,d=[],e=this;if("string"!=typeof a)return this.pushStack(n(a).filter(function(){for(b=0;c>b;b++)if(n.contains(e[b],this))return!0}));for(b=0;c>b;b++)n.find(a,e[b],d);return d=this.pushStack(c>1?n.unique(d):d),d.selector=this.selector?this.selector+" "+a:a,d},filter:function(a){return this.pushStack(z(this,a||[],!1))},not:function(a){return this.pushStack(z(this,a||[],!0))},is:function(a){return!!z(this,"string"==typeof a&&w.test(a)?n(a):a||[],!1).length}});var A,B=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,C=n.fn.init=function(a,b,c){var e,f;if(!a)return this;if(c=c||A,"string"==typeof a){if(e="<"===a[0]&&">"===a[a.length-1]&&a.length>=3?[null,a,null]:B.exec(a),!e||!e[1]&&b)return!b||b.jquery?(b||c).find(a):this.constructor(b).find(a);if(e[1]){if(b=b instanceof n?b[0]:b,n.merge(this,n.parseHTML(e[1],b&&b.nodeType?b.ownerDocument||b:d,!0)),x.test(e[1])&&n.isPlainObject(b))for(e in b)n.isFunction(this[e])?this[e](b[e]):this.attr(e,b[e]);return this}return f=d.getElementById(e[2]),f&&f.parentNode&&(this.length=1,this[0]=f),this.context=d,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):n.isFunction(a)?void 0!==c.ready?c.ready(a):a(n):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),n.makeArray(a,this))};C.prototype=n.fn,A=n(d);var D=/^(?:parents|prev(?:Until|All))/,E={children:!0,contents:!0,next:!0,prev:!0};n.fn.extend({has:function(a){var b=n(a,this),c=b.length;return this.filter(function(){for(var a=0;c>a;a++)if(n.contains(this,b[a]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=w.test(a)||"string"!=typeof a?n(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&n.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?n.uniqueSort(f):f)},index:function(a){return a?"string"==typeof a?h.call(n(a),this[0]):h.call(this,a.jquery?a[0]:a):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(n.uniqueSort(n.merge(this.get(),n(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function F(a,b){while((a=a[b])&&1!==a.nodeType);return a}n.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return u(a,"parentNode")},parentsUntil:function(a,b,c){return u(a,"parentNode",c)},next:function(a){return F(a,"nextSibling")},prev:function(a){return F(a,"previousSibling")},nextAll:function(a){return u(a,"nextSibling")},prevAll:function(a){return u(a,"previousSibling")},nextUntil:function(a,b,c){return u(a,"nextSibling",c)},prevUntil:function(a,b,c){return u(a,"previousSibling",c)},siblings:function(a){return v((a.parentNode||{}).firstChild,a)},children:function(a){return v(a.firstChild)},contents:function(a){return a.contentDocument||n.merge([],a.childNodes)}},function(a,b){n.fn[a]=function(c,d){var e=n.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=n.filter(d,e)),this.length>1&&(E[a]||n.uniqueSort(e),D.test(a)&&e.reverse()),this.pushStack(e)}});var G=/\S+/g;function H(a){var b={};return n.each(a.match(G)||[],function(a,c){b[c]=!0}),b}n.Callbacks=function(a){a="string"==typeof a?H(a):n.extend({},a);var b,c,d,e,f=[],g=[],h=-1,i=function(){for(e=a.once,d=b=!0;g.length;h=-1){c=g.shift();while(++h<f.length)f[h].apply(c[0],c[1])===!1&&a.stopOnFalse&&(h=f.length,c=!1)}a.memory||(c=!1),b=!1,e&&(f=c?[]:"")},j={add:function(){return f&&(c&&!b&&(h=f.length-1,g.push(c)),function d(b){n.each(b,function(b,c){n.isFunction(c)?a.unique&&j.has(c)||f.push(c):c&&c.length&&"string"!==n.type(c)&&d(c)})}(arguments),c&&!b&&i()),this},remove:function(){return n.each(arguments,function(a,b){var c;while((c=n.inArray(b,f,c))>-1)f.splice(c,1),h>=c&&h--}),this},has:function(a){return a?n.inArray(a,f)>-1:f.length>0},empty:function(){return f&&(f=[]),this},disable:function(){return e=g=[],f=c="",this},disabled:function(){return!f},lock:function(){return e=g=[],c||(f=c=""),this},locked:function(){return!!e},fireWith:function(a,c){return e||(c=c||[],c=[a,c.slice?c.slice():c],g.push(c),b||i()),this},fire:function(){return j.fireWith(this,arguments),this},fired:function(){return!!d}};return j},n.extend({Deferred:function(a){var b=[["resolve","done",n.Callbacks("once memory"),"resolved"],["reject","fail",n.Callbacks("once memory"),"rejected"],["notify","progress",n.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return n.Deferred(function(c){n.each(b,function(b,f){var g=n.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&n.isFunction(a.promise)?a.promise().progress(c.notify).done(c.resolve).fail(c.reject):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?n.extend(a,d):d}},e={};return d.pipe=d.then,n.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=e.call(arguments),d=c.length,f=1!==d||a&&n.isFunction(a.promise)?d:0,g=1===f?a:n.Deferred(),h=function(a,b,c){return function(d){b[a]=this,c[a]=arguments.length>1?e.call(arguments):d,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(d>1)for(i=new Array(d),j=new Array(d),k=new Array(d);d>b;b++)c[b]&&n.isFunction(c[b].promise)?c[b].promise().progress(h(b,j,i)).done(h(b,k,c)).fail(g.reject):--f;return f||g.resolveWith(k,c),g.promise()}});var I;n.fn.ready=function(a){return n.ready.promise().done(a),this},n.extend({isReady:!1,readyWait:1,holdReady:function(a){a?n.readyWait++:n.ready(!0)},ready:function(a){(a===!0?--n.readyWait:n.isReady)||(n.isReady=!0,a!==!0&&--n.readyWait>0||(I.resolveWith(d,[n]),n.fn.triggerHandler&&(n(d).triggerHandler("ready"),n(d).off("ready"))))}});function J(){d.removeEventListener("DOMContentLoaded",J),a.removeEventListener("load",J),n.ready()}n.ready.promise=function(b){return I||(I=n.Deferred(),"complete"===d.readyState||"loading"!==d.readyState&&!d.documentElement.doScroll?a.setTimeout(n.ready):(d.addEventListener("DOMContentLoaded",J),a.addEventListener("load",J))),I.promise(b)},n.ready.promise();var K=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===n.type(c)){e=!0;for(h in c)K(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,n.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(n(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f},L=function(a){return 1===a.nodeType||9===a.nodeType||!+a.nodeType};function M(){this.expando=n.expando+M.uid++}M.uid=1,M.prototype={register:function(a,b){var c=b||{};return a.nodeType?a[this.expando]=c:Object.defineProperty(a,this.expando,{value:c,writable:!0,configurable:!0}),a[this.expando]},cache:function(a){if(!L(a))return{};var b=a[this.expando];return b||(b={},L(a)&&(a.nodeType?a[this.expando]=b:Object.defineProperty(a,this.expando,{value:b,configurable:!0}))),b},set:function(a,b,c){var d,e=this.cache(a);if("string"==typeof b)e[b]=c;else for(d in b)e[d]=b[d];return e},get:function(a,b){return void 0===b?this.cache(a):a[this.expando]&&a[this.expando][b]},access:function(a,b,c){var d;return void 0===b||b&&"string"==typeof b&&void 0===c?(d=this.get(a,b),void 0!==d?d:this.get(a,n.camelCase(b))):(this.set(a,b,c),void 0!==c?c:b)},remove:function(a,b){var c,d,e,f=a[this.expando];if(void 0!==f){if(void 0===b)this.register(a);else{n.isArray(b)?d=b.concat(b.map(n.camelCase)):(e=n.camelCase(b),b in f?d=[b,e]:(d=e,d=d in f?[d]:d.match(G)||[])),c=d.length;while(c--)delete f[d[c]]}(void 0===b||n.isEmptyObject(f))&&(a.nodeType?a[this.expando]=void 0:delete a[this.expando])}},hasData:function(a){var b=a[this.expando];return void 0!==b&&!n.isEmptyObject(b)}};var N=new M,O=new M,P=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,Q=/[A-Z]/g;function R(a,b,c){var d;if(void 0===c&&1===a.nodeType)if(d="data-"+b.replace(Q,"-$&").toLowerCase(),c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:P.test(c)?n.parseJSON(c):c;
}catch(e){}O.set(a,b,c)}else c=void 0;return c}n.extend({hasData:function(a){return O.hasData(a)||N.hasData(a)},data:function(a,b,c){return O.access(a,b,c)},removeData:function(a,b){O.remove(a,b)},_data:function(a,b,c){return N.access(a,b,c)},_removeData:function(a,b){N.remove(a,b)}}),n.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=O.get(f),1===f.nodeType&&!N.get(f,"hasDataAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=n.camelCase(d.slice(5)),R(f,d,e[d])));N.set(f,"hasDataAttrs",!0)}return e}return"object"==typeof a?this.each(function(){O.set(this,a)}):K(this,function(b){var c,d;if(f&&void 0===b){if(c=O.get(f,a)||O.get(f,a.replace(Q,"-$&").toLowerCase()),void 0!==c)return c;if(d=n.camelCase(a),c=O.get(f,d),void 0!==c)return c;if(c=R(f,d,void 0),void 0!==c)return c}else d=n.camelCase(a),this.each(function(){var c=O.get(this,d);O.set(this,d,b),a.indexOf("-")>-1&&void 0!==c&&O.set(this,a,b)})},null,b,arguments.length>1,null,!0)},removeData:function(a){return this.each(function(){O.remove(this,a)})}}),n.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=N.get(a,b),c&&(!d||n.isArray(c)?d=N.access(a,b,n.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=n.queue(a,b),d=c.length,e=c.shift(),f=n._queueHooks(a,b),g=function(){n.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return N.get(a,c)||N.access(a,c,{empty:n.Callbacks("once memory").add(function(){N.remove(a,[b+"queue",c])})})}}),n.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?n.queue(this[0],a):void 0===b?this:this.each(function(){var c=n.queue(this,a,b);n._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&n.dequeue(this,a)})},dequeue:function(a){return this.each(function(){n.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=n.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=N.get(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var S=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,T=new RegExp("^(?:([+-])=|)("+S+")([a-z%]*)$","i"),U=["Top","Right","Bottom","Left"],V=function(a,b){return a=b||a,"none"===n.css(a,"display")||!n.contains(a.ownerDocument,a)};function W(a,b,c,d){var e,f=1,g=20,h=d?function(){return d.cur()}:function(){return n.css(a,b,"")},i=h(),j=c&&c[3]||(n.cssNumber[b]?"":"px"),k=(n.cssNumber[b]||"px"!==j&&+i)&&T.exec(n.css(a,b));if(k&&k[3]!==j){j=j||k[3],c=c||[],k=+i||1;do f=f||".5",k/=f,n.style(a,b,k+j);while(f!==(f=h()/i)&&1!==f&&--g)}return c&&(k=+k||+i||0,e=c[1]?k+(c[1]+1)*c[2]:+c[2],d&&(d.unit=j,d.start=k,d.end=e)),e}var X=/^(?:checkbox|radio)$/i,Y=/<([\w:-]+)/,Z=/^$|\/(?:java|ecma)script/i,$={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};$.optgroup=$.option,$.tbody=$.tfoot=$.colgroup=$.caption=$.thead,$.th=$.td;function _(a,b){var c="undefined"!=typeof a.getElementsByTagName?a.getElementsByTagName(b||"*"):"undefined"!=typeof a.querySelectorAll?a.querySelectorAll(b||"*"):[];return void 0===b||b&&n.nodeName(a,b)?n.merge([a],c):c}function aa(a,b){for(var c=0,d=a.length;d>c;c++)N.set(a[c],"globalEval",!b||N.get(b[c],"globalEval"))}var ba=/<|&#?\w+;/;function ca(a,b,c,d,e){for(var f,g,h,i,j,k,l=b.createDocumentFragment(),m=[],o=0,p=a.length;p>o;o++)if(f=a[o],f||0===f)if("object"===n.type(f))n.merge(m,f.nodeType?[f]:f);else if(ba.test(f)){g=g||l.appendChild(b.createElement("div")),h=(Y.exec(f)||["",""])[1].toLowerCase(),i=$[h]||$._default,g.innerHTML=i[1]+n.htmlPrefilter(f)+i[2],k=i[0];while(k--)g=g.lastChild;n.merge(m,g.childNodes),g=l.firstChild,g.textContent=""}else m.push(b.createTextNode(f));l.textContent="",o=0;while(f=m[o++])if(d&&n.inArray(f,d)>-1)e&&e.push(f);else if(j=n.contains(f.ownerDocument,f),g=_(l.appendChild(f),"script"),j&&aa(g),c){k=0;while(f=g[k++])Z.test(f.type||"")&&c.push(f)}return l}!function(){var a=d.createDocumentFragment(),b=a.appendChild(d.createElement("div")),c=d.createElement("input");c.setAttribute("type","radio"),c.setAttribute("checked","checked"),c.setAttribute("name","t"),b.appendChild(c),l.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,b.innerHTML="<textarea>x</textarea>",l.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue}();var da=/^key/,ea=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,fa=/^([^.]*)(?:\.(.+)|)/;function ga(){return!0}function ha(){return!1}function ia(){try{return d.activeElement}catch(a){}}function ja(a,b,c,d,e,f){var g,h;if("object"==typeof b){"string"!=typeof c&&(d=d||c,c=void 0);for(h in b)ja(a,h,c,d,b[h],f);return a}if(null==d&&null==e?(e=c,d=c=void 0):null==e&&("string"==typeof c?(e=d,d=void 0):(e=d,d=c,c=void 0)),e===!1)e=ha;else if(!e)return a;return 1===f&&(g=e,e=function(a){return n().off(a),g.apply(this,arguments)},e.guid=g.guid||(g.guid=n.guid++)),a.each(function(){n.event.add(this,b,e,d,c)})}n.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=N.get(a);if(r){c.handler&&(f=c,c=f.handler,e=f.selector),c.guid||(c.guid=n.guid++),(i=r.events)||(i=r.events={}),(g=r.handle)||(g=r.handle=function(b){return"undefined"!=typeof n&&n.event.triggered!==b.type?n.event.dispatch.apply(a,arguments):void 0}),b=(b||"").match(G)||[""],j=b.length;while(j--)h=fa.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o&&(l=n.event.special[o]||{},o=(e?l.delegateType:l.bindType)||o,l=n.event.special[o]||{},k=n.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&n.expr.match.needsContext.test(e),namespace:p.join(".")},f),(m=i[o])||(m=i[o]=[],m.delegateCount=0,l.setup&&l.setup.call(a,d,p,g)!==!1||a.addEventListener&&a.addEventListener(o,g)),l.add&&(l.add.call(a,k),k.handler.guid||(k.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,k):m.push(k),n.event.global[o]=!0)}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=N.hasData(a)&&N.get(a);if(r&&(i=r.events)){b=(b||"").match(G)||[""],j=b.length;while(j--)if(h=fa.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=n.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,m=i[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),g=f=m.length;while(f--)k=m[f],!e&&q!==k.origType||c&&c.guid!==k.guid||h&&!h.test(k.namespace)||d&&d!==k.selector&&("**"!==d||!k.selector)||(m.splice(f,1),k.selector&&m.delegateCount--,l.remove&&l.remove.call(a,k));g&&!m.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||n.removeEvent(a,o,r.handle),delete i[o])}else for(o in i)n.event.remove(a,o+b[j],c,d,!0);n.isEmptyObject(i)&&N.remove(a,"handle events")}},dispatch:function(a){a=n.event.fix(a);var b,c,d,f,g,h=[],i=e.call(arguments),j=(N.get(this,"events")||{})[a.type]||[],k=n.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=n.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,c=0;while((g=f.handlers[c++])&&!a.isImmediatePropagationStopped())a.rnamespace&&!a.rnamespace.test(g.namespace)||(a.handleObj=g,a.data=g.data,d=((n.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==d&&(a.result=d)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&("click"!==a.type||isNaN(a.button)||a.button<1))for(;i!==this;i=i.parentNode||this)if(1===i.nodeType&&(i.disabled!==!0||"click"!==a.type)){for(d=[],c=0;h>c;c++)f=b[c],e=f.selector+" ",void 0===d[e]&&(d[e]=f.needsContext?n(e,this).index(i)>-1:n.find(e,this,null,[i]).length),d[e]&&d.push(f);d.length&&g.push({elem:i,handlers:d})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},props:"altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,e,f,g=b.button;return null==a.pageX&&null!=b.clientX&&(c=a.target.ownerDocument||d,e=c.documentElement,f=c.body,a.pageX=b.clientX+(e&&e.scrollLeft||f&&f.scrollLeft||0)-(e&&e.clientLeft||f&&f.clientLeft||0),a.pageY=b.clientY+(e&&e.scrollTop||f&&f.scrollTop||0)-(e&&e.clientTop||f&&f.clientTop||0)),a.which||void 0===g||(a.which=1&g?1:2&g?3:4&g?2:0),a}},fix:function(a){if(a[n.expando])return a;var b,c,e,f=a.type,g=a,h=this.fixHooks[f];h||(this.fixHooks[f]=h=ea.test(f)?this.mouseHooks:da.test(f)?this.keyHooks:{}),e=h.props?this.props.concat(h.props):this.props,a=new n.Event(g),b=e.length;while(b--)c=e[b],a[c]=g[c];return a.target||(a.target=d),3===a.target.nodeType&&(a.target=a.target.parentNode),h.filter?h.filter(a,g):a},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==ia()&&this.focus?(this.focus(),!1):void 0},delegateType:"focusin"},blur:{trigger:function(){return this===ia()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&n.nodeName(this,"input")?(this.click(),!1):void 0},_default:function(a){return n.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}}},n.removeEvent=function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c)},n.Event=function(a,b){return this instanceof n.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?ga:ha):this.type=a,b&&n.extend(this,b),this.timeStamp=a&&a.timeStamp||n.now(),void(this[n.expando]=!0)):new n.Event(a,b)},n.Event.prototype={constructor:n.Event,isDefaultPrevented:ha,isPropagationStopped:ha,isImmediatePropagationStopped:ha,isSimulated:!1,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=ga,a&&!this.isSimulated&&a.preventDefault()},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=ga,a&&!this.isSimulated&&a.stopPropagation()},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=ga,a&&!this.isSimulated&&a.stopImmediatePropagation(),this.stopPropagation()}},n.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){n.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return e&&(e===d||n.contains(d,e))||(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),n.fn.extend({on:function(a,b,c,d){return ja(this,a,b,c,d)},one:function(a,b,c,d){return ja(this,a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,n(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return b!==!1&&"function"!=typeof b||(c=b,b=void 0),c===!1&&(c=ha),this.each(function(){n.event.remove(this,a,c,b)})}});var ka=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,la=/<script|<style|<link/i,ma=/checked\s*(?:[^=]|=\s*.checked.)/i,na=/^true\/(.*)/,oa=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;function pa(a,b){return n.nodeName(a,"table")&&n.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function qa(a){return a.type=(null!==a.getAttribute("type"))+"/"+a.type,a}function ra(a){var b=na.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function sa(a,b){var c,d,e,f,g,h,i,j;if(1===b.nodeType){if(N.hasData(a)&&(f=N.access(a),g=N.set(b,f),j=f.events)){delete g.handle,g.events={};for(e in j)for(c=0,d=j[e].length;d>c;c++)n.event.add(b,e,j[e][c])}O.hasData(a)&&(h=O.access(a),i=n.extend({},h),O.set(b,i))}}function ta(a,b){var c=b.nodeName.toLowerCase();"input"===c&&X.test(a.type)?b.checked=a.checked:"input"!==c&&"textarea"!==c||(b.defaultValue=a.defaultValue)}function ua(a,b,c,d){b=f.apply([],b);var e,g,h,i,j,k,m=0,o=a.length,p=o-1,q=b[0],r=n.isFunction(q);if(r||o>1&&"string"==typeof q&&!l.checkClone&&ma.test(q))return a.each(function(e){var f=a.eq(e);r&&(b[0]=q.call(this,e,f.html())),ua(f,b,c,d)});if(o&&(e=ca(b,a[0].ownerDocument,!1,a,d),g=e.firstChild,1===e.childNodes.length&&(e=g),g||d)){for(h=n.map(_(e,"script"),qa),i=h.length;o>m;m++)j=e,m!==p&&(j=n.clone(j,!0,!0),i&&n.merge(h,_(j,"script"))),c.call(a[m],j,m);if(i)for(k=h[h.length-1].ownerDocument,n.map(h,ra),m=0;i>m;m++)j=h[m],Z.test(j.type||"")&&!N.access(j,"globalEval")&&n.contains(k,j)&&(j.src?n._evalUrl&&n._evalUrl(j.src):n.globalEval(j.textContent.replace(oa,"")))}return a}function va(a,b,c){for(var d,e=b?n.filter(b,a):a,f=0;null!=(d=e[f]);f++)c||1!==d.nodeType||n.cleanData(_(d)),d.parentNode&&(c&&n.contains(d.ownerDocument,d)&&aa(_(d,"script")),d.parentNode.removeChild(d));return a}n.extend({htmlPrefilter:function(a){return a.replace(ka,"<$1></$2>")},clone:function(a,b,c){var d,e,f,g,h=a.cloneNode(!0),i=n.contains(a.ownerDocument,a);if(!(l.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||n.isXMLDoc(a)))for(g=_(h),f=_(a),d=0,e=f.length;e>d;d++)ta(f[d],g[d]);if(b)if(c)for(f=f||_(a),g=g||_(h),d=0,e=f.length;e>d;d++)sa(f[d],g[d]);else sa(a,h);return g=_(h,"script"),g.length>0&&aa(g,!i&&_(a,"script")),h},cleanData:function(a){for(var b,c,d,e=n.event.special,f=0;void 0!==(c=a[f]);f++)if(L(c)){if(b=c[N.expando]){if(b.events)for(d in b.events)e[d]?n.event.remove(c,d):n.removeEvent(c,d,b.handle);c[N.expando]=void 0}c[O.expando]&&(c[O.expando]=void 0)}}}),n.fn.extend({domManip:ua,detach:function(a){return va(this,a,!0)},remove:function(a){return va(this,a)},text:function(a){return K(this,function(a){return void 0===a?n.text(this):this.empty().each(function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=a)})},null,a,arguments.length)},append:function(){return ua(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=pa(this,a);b.appendChild(a)}})},prepend:function(){return ua(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=pa(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return ua(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return ua(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},empty:function(){for(var a,b=0;null!=(a=this[b]);b++)1===a.nodeType&&(n.cleanData(_(a,!1)),a.textContent="");return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return n.clone(this,a,b)})},html:function(a){return K(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a&&1===b.nodeType)return b.innerHTML;if("string"==typeof a&&!la.test(a)&&!$[(Y.exec(a)||["",""])[1].toLowerCase()]){a=n.htmlPrefilter(a);try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(n.cleanData(_(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=[];return ua(this,arguments,function(b){var c=this.parentNode;n.inArray(this,a)<0&&(n.cleanData(_(this)),c&&c.replaceChild(b,this))},a)}}),n.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){n.fn[a]=function(a){for(var c,d=[],e=n(a),f=e.length-1,h=0;f>=h;h++)c=h===f?this:this.clone(!0),n(e[h])[b](c),g.apply(d,c.get());return this.pushStack(d)}});var wa,xa={HTML:"block",BODY:"block"};function ya(a,b){var c=n(b.createElement(a)).appendTo(b.body),d=n.css(c[0],"display");return c.detach(),d}function za(a){var b=d,c=xa[a];return c||(c=ya(a,b),"none"!==c&&c||(wa=(wa||n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=wa[0].contentDocument,b.write(),b.close(),c=ya(a,b),wa.detach()),xa[a]=c),c}var Aa=/^margin/,Ba=new RegExp("^("+S+")(?!px)[a-z%]+$","i"),Ca=function(b){var c=b.ownerDocument.defaultView;return c&&c.opener||(c=a),c.getComputedStyle(b)},Da=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e},Ea=d.documentElement;!function(){var b,c,e,f,g=d.createElement("div"),h=d.createElement("div");if(h.style){h.style.backgroundClip="content-box",h.cloneNode(!0).style.backgroundClip="",l.clearCloneStyle="content-box"===h.style.backgroundClip,g.style.cssText="border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute",g.appendChild(h);function i(){h.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%",h.innerHTML="",Ea.appendChild(g);var d=a.getComputedStyle(h);b="1%"!==d.top,f="2px"===d.marginLeft,c="4px"===d.width,h.style.marginRight="50%",e="4px"===d.marginRight,Ea.removeChild(g)}n.extend(l,{pixelPosition:function(){return i(),b},boxSizingReliable:function(){return null==c&&i(),c},pixelMarginRight:function(){return null==c&&i(),e},reliableMarginLeft:function(){return null==c&&i(),f},reliableMarginRight:function(){var b,c=h.appendChild(d.createElement("div"));return c.style.cssText=h.style.cssText="-webkit-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",c.style.marginRight=c.style.width="0",h.style.width="1px",Ea.appendChild(g),b=!parseFloat(a.getComputedStyle(c).marginRight),Ea.removeChild(g),h.removeChild(c),b}})}}();function Fa(a,b,c){var d,e,f,g,h=a.style;return c=c||Ca(a),g=c?c.getPropertyValue(b)||c[b]:void 0,""!==g&&void 0!==g||n.contains(a.ownerDocument,a)||(g=n.style(a,b)),c&&!l.pixelMarginRight()&&Ba.test(g)&&Aa.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f),void 0!==g?g+"":g}function Ga(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}var Ha=/^(none|table(?!-c[ea]).+)/,Ia={position:"absolute",visibility:"hidden",display:"block"},Ja={letterSpacing:"0",fontWeight:"400"},Ka=["Webkit","O","Moz","ms"],La=d.createElement("div").style;function Ma(a){if(a in La)return a;var b=a[0].toUpperCase()+a.slice(1),c=Ka.length;while(c--)if(a=Ka[c]+b,a in La)return a}function Na(a,b,c){var d=T.exec(b);return d?Math.max(0,d[2]-(c||0))+(d[3]||"px"):b}function Oa(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=n.css(a,c+U[f],!0,e)),d?("content"===c&&(g-=n.css(a,"padding"+U[f],!0,e)),"margin"!==c&&(g-=n.css(a,"border"+U[f]+"Width",!0,e))):(g+=n.css(a,"padding"+U[f],!0,e),"padding"!==c&&(g+=n.css(a,"border"+U[f]+"Width",!0,e)));return g}function Pa(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=Ca(a),g="border-box"===n.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=Fa(a,b,f),(0>e||null==e)&&(e=a.style[b]),Ba.test(e))return e;d=g&&(l.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Oa(a,b,c||(g?"border":"content"),d,f)+"px"}function Qa(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=N.get(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&V(d)&&(f[g]=N.access(d,"olddisplay",za(d.nodeName)))):(e=V(d),"none"===c&&e||N.set(d,"olddisplay",e?c:n.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}n.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=Fa(a,"opacity");return""===c?"1":c}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=n.camelCase(b),i=a.style;return b=n.cssProps[h]||(n.cssProps[h]=Ma(h)||h),g=n.cssHooks[b]||n.cssHooks[h],void 0===c?g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b]:(f=typeof c,"string"===f&&(e=T.exec(c))&&e[1]&&(c=W(a,b,e),f="number"),null!=c&&c===c&&("number"===f&&(c+=e&&e[3]||(n.cssNumber[h]?"":"px")),l.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),g&&"set"in g&&void 0===(c=g.set(a,c,d))||(i[b]=c)),void 0)}},css:function(a,b,c,d){var e,f,g,h=n.camelCase(b);return b=n.cssProps[h]||(n.cssProps[h]=Ma(h)||h),g=n.cssHooks[b]||n.cssHooks[h],g&&"get"in g&&(e=g.get(a,!0,c)),void 0===e&&(e=Fa(a,b,d)),"normal"===e&&b in Ja&&(e=Ja[b]),""===c||c?(f=parseFloat(e),c===!0||isFinite(f)?f||0:e):e}}),n.each(["height","width"],function(a,b){n.cssHooks[b]={get:function(a,c,d){return c?Ha.test(n.css(a,"display"))&&0===a.offsetWidth?Da(a,Ia,function(){return Pa(a,b,d)}):Pa(a,b,d):void 0},set:function(a,c,d){var e,f=d&&Ca(a),g=d&&Oa(a,b,d,"border-box"===n.css(a,"boxSizing",!1,f),f);return g&&(e=T.exec(c))&&"px"!==(e[3]||"px")&&(a.style[b]=c,c=n.css(a,b)),Na(a,c,g)}}}),n.cssHooks.marginLeft=Ga(l.reliableMarginLeft,function(a,b){return b?(parseFloat(Fa(a,"marginLeft"))||a.getBoundingClientRect().left-Da(a,{marginLeft:0},function(){return a.getBoundingClientRect().left}))+"px":void 0}),n.cssHooks.marginRight=Ga(l.reliableMarginRight,function(a,b){return b?Da(a,{display:"inline-block"},Fa,[a,"marginRight"]):void 0}),n.each({margin:"",padding:"",border:"Width"},function(a,b){n.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+U[d]+b]=f[d]||f[d-2]||f[0];return e}},Aa.test(a)||(n.cssHooks[a+b].set=Na)}),n.fn.extend({css:function(a,b){return K(this,function(a,b,c){var d,e,f={},g=0;if(n.isArray(b)){for(d=Ca(a),e=b.length;e>g;g++)f[b[g]]=n.css(a,b[g],!1,d);return f}return void 0!==c?n.style(a,b,c):n.css(a,b)},a,b,arguments.length>1)},show:function(){return Qa(this,!0)},hide:function(){return Qa(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){V(this)?n(this).show():n(this).hide()})}});function Ra(a,b,c,d,e){return new Ra.prototype.init(a,b,c,d,e)}n.Tween=Ra,Ra.prototype={constructor:Ra,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||n.easing._default,this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(n.cssNumber[c]?"":"px")},cur:function(){var a=Ra.propHooks[this.prop];return a&&a.get?a.get(this):Ra.propHooks._default.get(this)},run:function(a){var b,c=Ra.propHooks[this.prop];return this.options.duration?this.pos=b=n.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Ra.propHooks._default.set(this),this}},Ra.prototype.init.prototype=Ra.prototype,Ra.propHooks={_default:{get:function(a){var b;return 1!==a.elem.nodeType||null!=a.elem[a.prop]&&null==a.elem.style[a.prop]?a.elem[a.prop]:(b=n.css(a.elem,a.prop,""),b&&"auto"!==b?b:0)},set:function(a){n.fx.step[a.prop]?n.fx.step[a.prop](a):1!==a.elem.nodeType||null==a.elem.style[n.cssProps[a.prop]]&&!n.cssHooks[a.prop]?a.elem[a.prop]=a.now:n.style(a.elem,a.prop,a.now+a.unit)}}},Ra.propHooks.scrollTop=Ra.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},n.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2},_default:"swing"},n.fx=Ra.prototype.init,n.fx.step={};var Sa,Ta,Ua=/^(?:toggle|show|hide)$/,Va=/queueHooks$/;function Wa(){return a.setTimeout(function(){Sa=void 0}),Sa=n.now()}function Xa(a,b){var c,d=0,e={height:a};for(b=b?1:0;4>d;d+=2-b)c=U[d],e["margin"+c]=e["padding"+c]=a;return b&&(e.opacity=e.width=a),e}function Ya(a,b,c){for(var d,e=(_a.tweeners[b]||[]).concat(_a.tweeners["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function Za(a,b,c){var d,e,f,g,h,i,j,k,l=this,m={},o=a.style,p=a.nodeType&&V(a),q=N.get(a,"fxshow");c.queue||(h=n._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,l.always(function(){l.always(function(){h.unqueued--,n.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[o.overflow,o.overflowX,o.overflowY],j=n.css(a,"display"),k="none"===j?N.get(a,"olddisplay")||za(a.nodeName):j,"inline"===k&&"none"===n.css(a,"float")&&(o.display="inline-block")),c.overflow&&(o.overflow="hidden",l.always(function(){o.overflow=c.overflow[0],o.overflowX=c.overflow[1],o.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],Ua.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(p?"hide":"show")){if("show"!==e||!q||void 0===q[d])continue;p=!0}m[d]=q&&q[d]||n.style(a,d)}else j=void 0;if(n.isEmptyObject(m))"inline"===("none"===j?za(a.nodeName):j)&&(o.display=j);else{q?"hidden"in q&&(p=q.hidden):q=N.access(a,"fxshow",{}),f&&(q.hidden=!p),p?n(a).show():l.done(function(){n(a).hide()}),l.done(function(){var b;N.remove(a,"fxshow");for(b in m)n.style(a,b,m[b])});for(d in m)g=Ya(p?q[d]:0,d,l),d in q||(q[d]=g.start,p&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function $a(a,b){var c,d,e,f,g;for(c in a)if(d=n.camelCase(c),e=b[d],f=a[c],n.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=n.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function _a(a,b,c){var d,e,f=0,g=_a.prefilters.length,h=n.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=Sa||Wa(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:n.extend({},b),opts:n.extend(!0,{specialEasing:{},easing:n.easing._default},c),originalProperties:b,originalOptions:c,startTime:Sa||Wa(),duration:c.duration,tweens:[],createTween:function(b,c){var d=n.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?(h.notifyWith(a,[j,1,0]),h.resolveWith(a,[j,b])):h.rejectWith(a,[j,b]),this}}),k=j.props;for($a(k,j.opts.specialEasing);g>f;f++)if(d=_a.prefilters[f].call(j,a,k,j.opts))return n.isFunction(d.stop)&&(n._queueHooks(j.elem,j.opts.queue).stop=n.proxy(d.stop,d)),d;return n.map(k,Ya,j),n.isFunction(j.opts.start)&&j.opts.start.call(a,j),n.fx.timer(n.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}n.Animation=n.extend(_a,{tweeners:{"*":[function(a,b){var c=this.createTween(a,b);return W(c.elem,a,T.exec(b),c),c}]},tweener:function(a,b){n.isFunction(a)?(b=a,a=["*"]):a=a.match(G);for(var c,d=0,e=a.length;e>d;d++)c=a[d],_a.tweeners[c]=_a.tweeners[c]||[],_a.tweeners[c].unshift(b)},prefilters:[Za],prefilter:function(a,b){b?_a.prefilters.unshift(a):_a.prefilters.push(a)}}),n.speed=function(a,b,c){var d=a&&"object"==typeof a?n.extend({},a):{complete:c||!c&&b||n.isFunction(a)&&a,duration:a,easing:c&&b||b&&!n.isFunction(b)&&b};return d.duration=n.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in n.fx.speeds?n.fx.speeds[d.duration]:n.fx.speeds._default,null!=d.queue&&d.queue!==!0||(d.queue="fx"),d.old=d.complete,d.complete=function(){n.isFunction(d.old)&&d.old.call(this),d.queue&&n.dequeue(this,d.queue)},d},n.fn.extend({fadeTo:function(a,b,c,d){return this.filter(V).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=n.isEmptyObject(a),f=n.speed(b,c,d),g=function(){var b=_a(this,n.extend({},a),f);(e||N.get(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=n.timers,g=N.get(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&Va.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));!b&&c||n.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=N.get(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=n.timers,g=d?d.length:0;for(c.finish=!0,n.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),n.each(["toggle","show","hide"],function(a,b){var c=n.fn[b];n.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(Xa(b,!0),a,d,e)}}),n.each({slideDown:Xa("show"),slideUp:Xa("hide"),slideToggle:Xa("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){n.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),n.timers=[],n.fx.tick=function(){var a,b=0,c=n.timers;for(Sa=n.now();b<c.length;b++)a=c[b],a()||c[b]!==a||c.splice(b--,1);c.length||n.fx.stop(),Sa=void 0},n.fx.timer=function(a){n.timers.push(a),a()?n.fx.start():n.timers.pop()},n.fx.interval=13,n.fx.start=function(){Ta||(Ta=a.setInterval(n.fx.tick,n.fx.interval))},n.fx.stop=function(){a.clearInterval(Ta),Ta=null},n.fx.speeds={slow:600,fast:200,_default:400},n.fn.delay=function(b,c){return b=n.fx?n.fx.speeds[b]||b:b,c=c||"fx",this.queue(c,function(c,d){var e=a.setTimeout(c,b);d.stop=function(){a.clearTimeout(e)}})},function(){var a=d.createElement("input"),b=d.createElement("select"),c=b.appendChild(d.createElement("option"));a.type="checkbox",l.checkOn=""!==a.value,l.optSelected=c.selected,b.disabled=!0,l.optDisabled=!c.disabled,a=d.createElement("input"),a.value="t",a.type="radio",l.radioValue="t"===a.value}();var ab,bb=n.expr.attrHandle;n.fn.extend({attr:function(a,b){return K(this,n.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){n.removeAttr(this,a)})}}),n.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return"undefined"==typeof a.getAttribute?n.prop(a,b,c):(1===f&&n.isXMLDoc(a)||(b=b.toLowerCase(),e=n.attrHooks[b]||(n.expr.match.bool.test(b)?ab:void 0)),void 0!==c?null===c?void n.removeAttr(a,b):e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:(a.setAttribute(b,c+""),c):e&&"get"in e&&null!==(d=e.get(a,b))?d:(d=n.find.attr(a,b),null==d?void 0:d))},attrHooks:{type:{set:function(a,b){if(!l.radioValue&&"radio"===b&&n.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(G);if(f&&1===a.nodeType)while(c=f[e++])d=n.propFix[c]||c,n.expr.match.bool.test(c)&&(a[d]=!1),a.removeAttribute(c)}}),ab={set:function(a,b,c){return b===!1?n.removeAttr(a,c):a.setAttribute(c,c),c}},n.each(n.expr.match.bool.source.match(/\w+/g),function(a,b){var c=bb[b]||n.find.attr;bb[b]=function(a,b,d){var e,f;return d||(f=bb[b],bb[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,bb[b]=f),e}});var cb=/^(?:input|select|textarea|button)$/i,db=/^(?:a|area)$/i;n.fn.extend({prop:function(a,b){return K(this,n.prop,a,b,arguments.length>1)},removeProp:function(a){return this.each(function(){delete this[n.propFix[a]||a]})}}),n.extend({prop:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return 1===f&&n.isXMLDoc(a)||(b=n.propFix[b]||b,e=n.propHooks[b]),
void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){var b=n.find.attr(a,"tabindex");return b?parseInt(b,10):cb.test(a.nodeName)||db.test(a.nodeName)&&a.href?0:-1}}},propFix:{"for":"htmlFor","class":"className"}}),l.optSelected||(n.propHooks.selected={get:function(a){var b=a.parentNode;return b&&b.parentNode&&b.parentNode.selectedIndex,null},set:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex)}}),n.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){n.propFix[this.toLowerCase()]=this});var eb=/[\t\r\n\f]/g;function fb(a){return a.getAttribute&&a.getAttribute("class")||""}n.fn.extend({addClass:function(a){var b,c,d,e,f,g,h,i=0;if(n.isFunction(a))return this.each(function(b){n(this).addClass(a.call(this,b,fb(this)))});if("string"==typeof a&&a){b=a.match(G)||[];while(c=this[i++])if(e=fb(c),d=1===c.nodeType&&(" "+e+" ").replace(eb," ")){g=0;while(f=b[g++])d.indexOf(" "+f+" ")<0&&(d+=f+" ");h=n.trim(d),e!==h&&c.setAttribute("class",h)}}return this},removeClass:function(a){var b,c,d,e,f,g,h,i=0;if(n.isFunction(a))return this.each(function(b){n(this).removeClass(a.call(this,b,fb(this)))});if(!arguments.length)return this.attr("class","");if("string"==typeof a&&a){b=a.match(G)||[];while(c=this[i++])if(e=fb(c),d=1===c.nodeType&&(" "+e+" ").replace(eb," ")){g=0;while(f=b[g++])while(d.indexOf(" "+f+" ")>-1)d=d.replace(" "+f+" "," ");h=n.trim(d),e!==h&&c.setAttribute("class",h)}}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):n.isFunction(a)?this.each(function(c){n(this).toggleClass(a.call(this,c,fb(this),b),b)}):this.each(function(){var b,d,e,f;if("string"===c){d=0,e=n(this),f=a.match(G)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else void 0!==a&&"boolean"!==c||(b=fb(this),b&&N.set(this,"__className__",b),this.setAttribute&&this.setAttribute("class",b||a===!1?"":N.get(this,"__className__")||""))})},hasClass:function(a){var b,c,d=0;b=" "+a+" ";while(c=this[d++])if(1===c.nodeType&&(" "+fb(c)+" ").replace(eb," ").indexOf(b)>-1)return!0;return!1}});var gb=/\r/g,hb=/[\x20\t\r\n\f]+/g;n.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=n.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,n(this).val()):a,null==e?e="":"number"==typeof e?e+="":n.isArray(e)&&(e=n.map(e,function(a){return null==a?"":a+""})),b=n.valHooks[this.type]||n.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=n.valHooks[e.type]||n.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(gb,""):null==c?"":c)}}}),n.extend({valHooks:{option:{get:function(a){var b=n.find.attr(a,"value");return null!=b?b:n.trim(n.text(a)).replace(hb," ")}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],(c.selected||i===e)&&(l.optDisabled?!c.disabled:null===c.getAttribute("disabled"))&&(!c.parentNode.disabled||!n.nodeName(c.parentNode,"optgroup"))){if(b=n(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=n.makeArray(b),g=e.length;while(g--)d=e[g],(d.selected=n.inArray(n.valHooks.option.get(d),f)>-1)&&(c=!0);return c||(a.selectedIndex=-1),f}}}}),n.each(["radio","checkbox"],function(){n.valHooks[this]={set:function(a,b){return n.isArray(b)?a.checked=n.inArray(n(a).val(),b)>-1:void 0}},l.checkOn||(n.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})});var ib=/^(?:focusinfocus|focusoutblur)$/;n.extend(n.event,{trigger:function(b,c,e,f){var g,h,i,j,l,m,o,p=[e||d],q=k.call(b,"type")?b.type:b,r=k.call(b,"namespace")?b.namespace.split("."):[];if(h=i=e=e||d,3!==e.nodeType&&8!==e.nodeType&&!ib.test(q+n.event.triggered)&&(q.indexOf(".")>-1&&(r=q.split("."),q=r.shift(),r.sort()),l=q.indexOf(":")<0&&"on"+q,b=b[n.expando]?b:new n.Event(q,"object"==typeof b&&b),b.isTrigger=f?2:3,b.namespace=r.join("."),b.rnamespace=b.namespace?new RegExp("(^|\\.)"+r.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=e),c=null==c?[b]:n.makeArray(c,[b]),o=n.event.special[q]||{},f||!o.trigger||o.trigger.apply(e,c)!==!1)){if(!f&&!o.noBubble&&!n.isWindow(e)){for(j=o.delegateType||q,ib.test(j+q)||(h=h.parentNode);h;h=h.parentNode)p.push(h),i=h;i===(e.ownerDocument||d)&&p.push(i.defaultView||i.parentWindow||a)}g=0;while((h=p[g++])&&!b.isPropagationStopped())b.type=g>1?j:o.bindType||q,m=(N.get(h,"events")||{})[b.type]&&N.get(h,"handle"),m&&m.apply(h,c),m=l&&h[l],m&&m.apply&&L(h)&&(b.result=m.apply(h,c),b.result===!1&&b.preventDefault());return b.type=q,f||b.isDefaultPrevented()||o._default&&o._default.apply(p.pop(),c)!==!1||!L(e)||l&&n.isFunction(e[q])&&!n.isWindow(e)&&(i=e[l],i&&(e[l]=null),n.event.triggered=q,e[q](),n.event.triggered=void 0,i&&(e[l]=i)),b.result}},simulate:function(a,b,c){var d=n.extend(new n.Event,c,{type:a,isSimulated:!0});n.event.trigger(d,null,b)}}),n.fn.extend({trigger:function(a,b){return this.each(function(){n.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?n.event.trigger(a,b,c,!0):void 0}}),n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){n.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),n.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),l.focusin="onfocusin"in a,l.focusin||n.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){n.event.simulate(b,a.target,n.event.fix(a))};n.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=N.access(d,b);e||d.addEventListener(a,c,!0),N.access(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=N.access(d,b)-1;e?N.access(d,b,e):(d.removeEventListener(a,c,!0),N.remove(d,b))}}});var jb=a.location,kb=n.now(),lb=/\?/;n.parseJSON=function(a){return JSON.parse(a+"")},n.parseXML=function(b){var c;if(!b||"string"!=typeof b)return null;try{c=(new a.DOMParser).parseFromString(b,"text/xml")}catch(d){c=void 0}return c&&!c.getElementsByTagName("parsererror").length||n.error("Invalid XML: "+b),c};var mb=/#.*$/,nb=/([?&])_=[^&]*/,ob=/^(.*?):[ \t]*([^\r\n]*)$/gm,pb=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,qb=/^(?:GET|HEAD)$/,rb=/^\/\//,sb={},tb={},ub="*/".concat("*"),vb=d.createElement("a");vb.href=jb.href;function wb(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(G)||[];if(n.isFunction(c))while(d=f[e++])"+"===d[0]?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function xb(a,b,c,d){var e={},f=a===tb;function g(h){var i;return e[h]=!0,n.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function yb(a,b){var c,d,e=n.ajaxSettings.flatOptions||{};for(c in b)void 0!==b[c]&&((e[c]?a:d||(d={}))[c]=b[c]);return d&&n.extend(!0,a,d),a}function zb(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===d&&(d=a.mimeType||b.getResponseHeader("Content-Type"));if(d)for(e in h)if(h[e]&&h[e].test(d)){i.unshift(e);break}if(i[0]in c)f=i[0];else{for(e in c){if(!i[0]||a.converters[e+" "+i[0]]){f=e;break}g||(g=e)}f=f||g}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function Ab(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}n.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:jb.href,type:"GET",isLocal:pb.test(jb.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":ub,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":n.parseJSON,"text xml":n.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?yb(yb(a,n.ajaxSettings),b):yb(n.ajaxSettings,a)},ajaxPrefilter:wb(sb),ajaxTransport:wb(tb),ajax:function(b,c){"object"==typeof b&&(c=b,b=void 0),c=c||{};var e,f,g,h,i,j,k,l,m=n.ajaxSetup({},c),o=m.context||m,p=m.context&&(o.nodeType||o.jquery)?n(o):n.event,q=n.Deferred(),r=n.Callbacks("once memory"),s=m.statusCode||{},t={},u={},v=0,w="canceled",x={readyState:0,getResponseHeader:function(a){var b;if(2===v){if(!h){h={};while(b=ob.exec(g))h[b[1].toLowerCase()]=b[2]}b=h[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===v?g:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return v||(a=u[c]=u[c]||a,t[a]=b),this},overrideMimeType:function(a){return v||(m.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>v)for(b in a)s[b]=[s[b],a[b]];else x.always(a[x.status]);return this},abort:function(a){var b=a||w;return e&&e.abort(b),z(0,b),this}};if(q.promise(x).complete=r.add,x.success=x.done,x.error=x.fail,m.url=((b||m.url||jb.href)+"").replace(mb,"").replace(rb,jb.protocol+"//"),m.type=c.method||c.type||m.method||m.type,m.dataTypes=n.trim(m.dataType||"*").toLowerCase().match(G)||[""],null==m.crossDomain){j=d.createElement("a");try{j.href=m.url,j.href=j.href,m.crossDomain=vb.protocol+"//"+vb.host!=j.protocol+"//"+j.host}catch(y){m.crossDomain=!0}}if(m.data&&m.processData&&"string"!=typeof m.data&&(m.data=n.param(m.data,m.traditional)),xb(sb,m,c,x),2===v)return x;k=n.event&&m.global,k&&0===n.active++&&n.event.trigger("ajaxStart"),m.type=m.type.toUpperCase(),m.hasContent=!qb.test(m.type),f=m.url,m.hasContent||(m.data&&(f=m.url+=(lb.test(f)?"&":"?")+m.data,delete m.data),m.cache===!1&&(m.url=nb.test(f)?f.replace(nb,"$1_="+kb++):f+(lb.test(f)?"&":"?")+"_="+kb++)),m.ifModified&&(n.lastModified[f]&&x.setRequestHeader("If-Modified-Since",n.lastModified[f]),n.etag[f]&&x.setRequestHeader("If-None-Match",n.etag[f])),(m.data&&m.hasContent&&m.contentType!==!1||c.contentType)&&x.setRequestHeader("Content-Type",m.contentType),x.setRequestHeader("Accept",m.dataTypes[0]&&m.accepts[m.dataTypes[0]]?m.accepts[m.dataTypes[0]]+("*"!==m.dataTypes[0]?", "+ub+"; q=0.01":""):m.accepts["*"]);for(l in m.headers)x.setRequestHeader(l,m.headers[l]);if(m.beforeSend&&(m.beforeSend.call(o,x,m)===!1||2===v))return x.abort();w="abort";for(l in{success:1,error:1,complete:1})x[l](m[l]);if(e=xb(tb,m,c,x)){if(x.readyState=1,k&&p.trigger("ajaxSend",[x,m]),2===v)return x;m.async&&m.timeout>0&&(i=a.setTimeout(function(){x.abort("timeout")},m.timeout));try{v=1,e.send(t,z)}catch(y){if(!(2>v))throw y;z(-1,y)}}else z(-1,"No Transport");function z(b,c,d,h){var j,l,t,u,w,y=c;2!==v&&(v=2,i&&a.clearTimeout(i),e=void 0,g=h||"",x.readyState=b>0?4:0,j=b>=200&&300>b||304===b,d&&(u=zb(m,x,d)),u=Ab(m,u,x,j),j?(m.ifModified&&(w=x.getResponseHeader("Last-Modified"),w&&(n.lastModified[f]=w),w=x.getResponseHeader("etag"),w&&(n.etag[f]=w)),204===b||"HEAD"===m.type?y="nocontent":304===b?y="notmodified":(y=u.state,l=u.data,t=u.error,j=!t)):(t=y,!b&&y||(y="error",0>b&&(b=0))),x.status=b,x.statusText=(c||y)+"",j?q.resolveWith(o,[l,y,x]):q.rejectWith(o,[x,y,t]),x.statusCode(s),s=void 0,k&&p.trigger(j?"ajaxSuccess":"ajaxError",[x,m,j?l:t]),r.fireWith(o,[x,y]),k&&(p.trigger("ajaxComplete",[x,m]),--n.active||n.event.trigger("ajaxStop")))}return x},getJSON:function(a,b,c){return n.get(a,b,c,"json")},getScript:function(a,b){return n.get(a,void 0,b,"script")}}),n.each(["get","post"],function(a,b){n[b]=function(a,c,d,e){return n.isFunction(c)&&(e=e||d,d=c,c=void 0),n.ajax(n.extend({url:a,type:b,dataType:e,data:c,success:d},n.isPlainObject(a)&&a))}}),n._evalUrl=function(a){return n.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},n.fn.extend({wrapAll:function(a){var b;return n.isFunction(a)?this.each(function(b){n(this).wrapAll(a.call(this,b))}):(this[0]&&(b=n(a,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstElementChild)a=a.firstElementChild;return a}).append(this)),this)},wrapInner:function(a){return n.isFunction(a)?this.each(function(b){n(this).wrapInner(a.call(this,b))}):this.each(function(){var b=n(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=n.isFunction(a);return this.each(function(c){n(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){n.nodeName(this,"body")||n(this).replaceWith(this.childNodes)}).end()}}),n.expr.filters.hidden=function(a){return!n.expr.filters.visible(a)},n.expr.filters.visible=function(a){return a.offsetWidth>0||a.offsetHeight>0||a.getClientRects().length>0};var Bb=/%20/g,Cb=/\[\]$/,Db=/\r?\n/g,Eb=/^(?:submit|button|image|reset|file)$/i,Fb=/^(?:input|select|textarea|keygen)/i;function Gb(a,b,c,d){var e;if(n.isArray(b))n.each(b,function(b,e){c||Cb.test(a)?d(a,e):Gb(a+"["+("object"==typeof e&&null!=e?b:"")+"]",e,c,d)});else if(c||"object"!==n.type(b))d(a,b);else for(e in b)Gb(a+"["+e+"]",b[e],c,d)}n.param=function(a,b){var c,d=[],e=function(a,b){b=n.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=n.ajaxSettings&&n.ajaxSettings.traditional),n.isArray(a)||a.jquery&&!n.isPlainObject(a))n.each(a,function(){e(this.name,this.value)});else for(c in a)Gb(c,a[c],b,e);return d.join("&").replace(Bb,"+")},n.fn.extend({serialize:function(){return n.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=n.prop(this,"elements");return a?n.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!n(this).is(":disabled")&&Fb.test(this.nodeName)&&!Eb.test(a)&&(this.checked||!X.test(a))}).map(function(a,b){var c=n(this).val();return null==c?null:n.isArray(c)?n.map(c,function(a){return{name:b.name,value:a.replace(Db,"\r\n")}}):{name:b.name,value:c.replace(Db,"\r\n")}}).get()}}),n.ajaxSettings.xhr=function(){try{return new a.XMLHttpRequest}catch(b){}};var Hb={0:200,1223:204},Ib=n.ajaxSettings.xhr();l.cors=!!Ib&&"withCredentials"in Ib,l.ajax=Ib=!!Ib,n.ajaxTransport(function(b){var c,d;return l.cors||Ib&&!b.crossDomain?{send:function(e,f){var g,h=b.xhr();if(h.open(b.type,b.url,b.async,b.username,b.password),b.xhrFields)for(g in b.xhrFields)h[g]=b.xhrFields[g];b.mimeType&&h.overrideMimeType&&h.overrideMimeType(b.mimeType),b.crossDomain||e["X-Requested-With"]||(e["X-Requested-With"]="XMLHttpRequest");for(g in e)h.setRequestHeader(g,e[g]);c=function(a){return function(){c&&(c=d=h.onload=h.onerror=h.onabort=h.onreadystatechange=null,"abort"===a?h.abort():"error"===a?"number"!=typeof h.status?f(0,"error"):f(h.status,h.statusText):f(Hb[h.status]||h.status,h.statusText,"text"!==(h.responseType||"text")||"string"!=typeof h.responseText?{binary:h.response}:{text:h.responseText},h.getAllResponseHeaders()))}},h.onload=c(),d=h.onerror=c("error"),void 0!==h.onabort?h.onabort=d:h.onreadystatechange=function(){4===h.readyState&&a.setTimeout(function(){c&&d()})},c=c("abort");try{h.send(b.hasContent&&b.data||null)}catch(i){if(c)throw i}},abort:function(){c&&c()}}:void 0}),n.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(a){return n.globalEval(a),a}}}),n.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET")}),n.ajaxTransport("script",function(a){if(a.crossDomain){var b,c;return{send:function(e,f){b=n("<script>").prop({charset:a.scriptCharset,src:a.url}).on("load error",c=function(a){b.remove(),c=null,a&&f("error"===a.type?404:200,a.type)}),d.head.appendChild(b[0])},abort:function(){c&&c()}}}});var Jb=[],Kb=/(=)\?(?=&|$)|\?\?/;n.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=Jb.pop()||n.expando+"_"+kb++;return this[a]=!0,a}}),n.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(Kb.test(b.url)?"url":"string"==typeof b.data&&0===(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&Kb.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=n.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(Kb,"$1"+e):b.jsonp!==!1&&(b.url+=(lb.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||n.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){void 0===f?n(a).removeProp(e):a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,Jb.push(e)),g&&n.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),n.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||d;var e=x.exec(a),f=!c&&[];return e?[b.createElement(e[1])]:(e=ca([a],b,f),f&&f.length&&n(f).remove(),n.merge([],e.childNodes))};var Lb=n.fn.load;n.fn.load=function(a,b,c){if("string"!=typeof a&&Lb)return Lb.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>-1&&(d=n.trim(a.slice(h)),a=a.slice(0,h)),n.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&n.ajax({url:a,type:e||"GET",dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?n("<div>").append(n.parseHTML(a)).find(d):a)}).always(c&&function(a,b){g.each(function(){c.apply(this,f||[a.responseText,b,a])})}),this},n.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){n.fn[b]=function(a){return this.on(b,a)}}),n.expr.filters.animated=function(a){return n.grep(n.timers,function(b){return a===b.elem}).length};function Mb(a){return n.isWindow(a)?a:9===a.nodeType&&a.defaultView}n.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=n.css(a,"position"),l=n(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=n.css(a,"top"),i=n.css(a,"left"),j=("absolute"===k||"fixed"===k)&&(f+i).indexOf("auto")>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),n.isFunction(b)&&(b=b.call(a,c,n.extend({},h))),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},n.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){n.offset.setOffset(this,a,b)});var b,c,d=this[0],e={top:0,left:0},f=d&&d.ownerDocument;if(f)return b=f.documentElement,n.contains(b,d)?(e=d.getBoundingClientRect(),c=Mb(f),{top:e.top+c.pageYOffset-b.clientTop,left:e.left+c.pageXOffset-b.clientLeft}):e},position:function(){if(this[0]){var a,b,c=this[0],d={top:0,left:0};return"fixed"===n.css(c,"position")?b=c.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),n.nodeName(a[0],"html")||(d=a.offset()),d.top+=n.css(a[0],"borderTopWidth",!0),d.left+=n.css(a[0],"borderLeftWidth",!0)),{top:b.top-d.top-n.css(c,"marginTop",!0),left:b.left-d.left-n.css(c,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent;while(a&&"static"===n.css(a,"position"))a=a.offsetParent;return a||Ea})}}),n.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,b){var c="pageYOffset"===b;n.fn[a]=function(d){return K(this,function(a,d,e){var f=Mb(a);return void 0===e?f?f[b]:a[d]:void(f?f.scrollTo(c?f.pageXOffset:e,c?e:f.pageYOffset):a[d]=e)},a,d,arguments.length)}}),n.each(["top","left"],function(a,b){n.cssHooks[b]=Ga(l.pixelPosition,function(a,c){return c?(c=Fa(a,b),Ba.test(c)?n(a).position()[b]+"px":c):void 0})}),n.each({Height:"height",Width:"width"},function(a,b){n.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){n.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return K(this,function(b,c,d){var e;return n.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?n.css(b,c,g):n.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),n.fn.extend({bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)},size:function(){return this.length}}),n.fn.andSelf=n.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return n});var Nb=a.jQuery,Ob=a.$;return n.noConflict=function(b){return a.$===n&&(a.$=Ob),b&&a.jQuery===n&&(a.jQuery=Nb),n},b||(a.jQuery=a.$=n),n});



/* ---- /1Mi3ThNGPyiuhiWCJPH2BAqeKCiBF5BVpR/main.js ---- */


/* Copyright (c) 2016, Kevin Froman (https://ChaosWebs.net) & Andrew Morgan (https://amorgan.xyz). MIT License */

// Detect if webrtc is not supported
if (WebTorrent.WEBRTC_SUPPORT == false)
{
    $('#webrtcError').css('display', 'block');
}

var client = new WebTorrent();
var file;
var password;
var plaintext;
var text;
var newTorrent;

window.pasteDecryptBuffer = '';

function detectEncrypted(pasteData)
{
	if (pasteData.includes('-----begin encrypted paste-----'))
	{
		$('#decryptArea').css('display', 'inline');
		$.bootstrapGrowl("This paste appears encrypted.", {type: 'warning'});
		window.pasteDecryptBuffer = pasteData.replace('-----begin encrypted paste-----', '');
		console.log(window.pasteDecryptBuffer);
	}
    else
    {
        $('#decryptArea').css('display', 'none');
    }
}

$('#decryptButton').click(function(){
	var password = $('#decryptPassword').val();
	var decrypted;
	if (password == '')
	{
		return false;
	}
    if ($('#markdownCheckbox').is(':checked')) {
        decrypted = CryptoJS.AES.decrypt($('#pasteOutput').data().orig.replace('-----begin encrypted paste-----', ''), password);
    }
    else
    {
	   decrypted = CryptoJS.AES.decrypt(window.pasteDecryptBuffer.toString(), password);
    }
	decrypted = decrypted.toString(CryptoJS.enc.Utf8);
	console.log(decrypted);
	if (decrypted == '')
	{
		$.bootstrapGrowl("Invalid password.", {type: 'danger'});
		return false;
	}
	else
	{
		$('#pasteOutput').html(sanitize(decrypted));
        $('#decryptArea').css('display', 'none');
         if ($('#markdownCheckbox').is(':checked')) {
        markdownCheck();
        }
	}

});

$('#encryptBox').change(function() 
{
	if($(this).is(':checked')) 
	{
		// Show unencrypted title disclaimer if the user hasn't seen it
		if (localStorage['titleDisclaimer'] == undefined)
		{
			$.bootstrapGrowl("Warning: Paste titles are not encrypted", {type: 'danger'});
			localStorage['titleDisclaimer'] = true;
		}

		$('#encryptPasswordArea').css('display', 'block');
	}
	else
	{
		$('#encryptPasswordArea').css('display', 'none');
	}
});

$('#createPaste').click(function(){
	if ($('#text').val() == '')
	{
		$.bootstrapGrowl("You need text to paste!", {type: 'danger'});
		return false;
	}
	else
	{
		text = $('#text').val();
	}

	if ($('#encryptBox').is(':checked'))
	{
		if ($('#encryptPassword').val() == '')
		{
			$.bootstrapGrowl("You must specify a password!", {type: 'danger'});
			return false;
		}
		else
		{
			password = $('#encryptPassword').val();
			text = CryptoJS.AES.encrypt(text, password);
			text = '-----begin encrypted paste-----' + text;
			$('#text').val(text);
		}
	}
	var parts = [
	  new Blob([text], {type: 'text/markdown'}),
	];

	// Construct a file
	var fileName = $('#name').val();
    if (!fileName){fileName = "Unnamed";}
	file = new File(parts, fileName, {
	    type: "text/markdown"
	});

	var fr = new FileReader();

	fr.onload = function(evt){
		client.seed(file, function (torrent) {
    		console.log('Client is seeding ' + torrent.magnetURI);
            $('#uriOutput').val(torrent.magnetURI);

            $('#shareLink').val(document.location.href + '#' + torrent.infoHash);

    		$('#ready').modal();

            $('#text').val(`# Title Here
-------------------------------`);
            $('#name').val('');
 		});
	}

	fr.readAsText(file);

	// Refresh downloads container
	downloadsRefresh();

    // Unhide downloadsPanel
    $('#downloadsPanel').css('display', 'block');

	return false;
});

$('#createMagnetCopy').click(function() {
    var clipboard = new Clipboard('#createMagnetCopy');

    $.bootstrapGrowl("Magnet URI copied to clipboard!", {type: 'success'});
});

$('.modal-footer button').click(function() {
    // Uncheck all checkboxes on modal close
    if ($('#highlightCheckbox').is(':checked')) 
        $('#highlightCheckbox').click();  
    if ($('#markdownCheckbox').is(':checked')) 
        $('#markdownCheckbox').click();  
});

$('#createShareCopy').click(function() {
    var clipboard = new Clipboard('#createShareCopy');
    $.bootstrapGrowl("Share link copied to clipboard!", {type: 'success'});
});

$('#refreshButton').click(function(){
	// Spin refresh button
	$('#refreshButton').addClass('fa-spin');

	downloadsRefresh();
});

function downloadsRefresh(){
	// Allow client object time to update torrent list
	setTimeout(function(){
		// Stop spinning refresh
		$('#refreshButton').removeClass('fa-spin');

		// List active torrents
		var count = 0;
		var torrent;
        var html = "";
		while (torrent = client.torrents[count]) {
            var progress = '<b class="torrentProgress" id="' + torrent.magnetURI + '">0%</b>';
            var name = torrent.files[0].name;
            var peers = '<b id="peers">Peers: </b><span id="peers-text">' + torrent.numPeers + '</span>';
            //var ratio = '<b id="ratio">R: </b><span id="ratio-text">' + torrent.ratio.toFixed(2) + '</span>';
            html += `
<li class="list-group-item">
    <div class="row">
        <div class="col-xs-6 truncated-text">` + progress + `   ` + name + 
            `<div id="stats" class="row">
                <div class="col-xs-1">` + peers + `</div>
                <div class="col-xs-1">` + /*ratio + */ `</div>
            </div>
        </div>
        <div class="col-xs-6"><span class="pull-right">
            <div id="` + count  + `" class="btn-group" role="group" aria-label="">
                <button type="button" class="btn btn-sm btn-primary">
                  <i class="fa fa-eye" aria-hidden="true"></i>
                </button>
                <button type="button" class="btn btn-sm btn-default" data-clipboard-action="copy" data-clipboard-text="` + document.location.href + '#' + torrent.infoHash + `">
                  <i class="fa fa-link" aria-hidden="true"></i>
                </button>
                <button id = "magnet" type="button" class="btn btn-sm btn-default" data-clipboard-action="copy" data-clipboard-text="` + torrent.magnetURI + `">
                  <i class="fa fa-magnet" aria-hidden="true"></i>
                </button>
                <button type="button" class="btn btn-sm btn-default">
                  <i class="fa fa-download" aria-hidden="true"></i>
                </button>
                <button type="button" class="btn btn-sm btn-danger">
                  <i class="fa fa-pause-circle" aria-hidden="true"></i>
                </button>
                <button type="button" class="btn btn-sm btn-default">
                  <i class="fa fa-close" aria-hidden="true"></i>
                </button>
            </div>
        </span>
        </div>
    </div>
</li>
            `;
			count++;
		}
        // Can mess with VimFX
        // If they select links and then html refreshs, removing their links
        $('#downloadsPanelList').html(html);

        $('.close').click(function(){
            $(this).attr('id');
        });
        $('.btn-group button').click(function(){
            // Find out which button was pressed
            var classesList = $(this).find('i').attr('class').split(/\s+/);
            var id = $(this).parent().attr('id');
            var torrent = client.torrents[id];
            switch(classesList[1]) {
                case 'fa-eye':
                    showPaste(torrent);
                    break;
                case 'fa-link':
                    var clipboard = new Clipboard('.btn-group button');
                    $.bootstrapGrowl("Share link copied to clipboard!", {type: 'success'});
                    break;
                case 'fa-magnet':
                    var clipboard = new Clipboard('.btn-group button');
                    $.bootstrapGrowl("Magnet URI copied to clipboard!", {type: 'success'});
                    break;
                case 'fa-download':
                    // Create an invisible link for the torrent download
                    var downloadLink = document.createElement("a");
                    downloadLink.href = torrent.torrentFileBlobURL;
                    downloadLink.download = torrent.files[0].name + '.torrent';

                    // Click the link we just made
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    document.body.removeChild(downloadLink);
                    break;
                case 'fa-pause-circle':
                    // Pause torrent seeding
                    torrent.pause();

                    // Switch to play icon
                    $(this).find('i').removeClass('fa-pause-circle').addClass('fa-play-circle');
                    $(this).removeClass('btn-danger').addClass('btn-success');

                    break;
                case 'fa-play-circle':
                    // Start torrent seeding
                    torrent.resume();

                    // Switch to pause icon
                    $(this).find('i').removeClass('fa-play-circle').addClass('fa-pause-circle');
                    $(this).removeClass('btn-play').addClass('btn-danger');

                    break;
                case 'fa-close':
                    // Remove torrent from client
                    torrent.destroy();
                    downloadsRefresh();

                    // Torrent is undefined
                    $(this).parents('.list-group-item').remove();

                    // Hide downloads panel if there are no downloads
                    if (client.torrents.length == 0)
                        $('#downloadsPanel').css('display', 'none');

                    break;
                default:
                    console.log('Unknown button item pressed.');
                    break;
            }
        });
	}, 1000);
}

function sanitize(content)
{
    return String(content).replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function unSanitize(content)
{
    return String(content).replace(/&lt;/g, '<').replace(/&gt;/g, '>');
}


function showPaste(torrent)
{
    file = torrent.files[0];
        
    file.getBuffer(function (err, buffer) {
        if (err) throw err
        buffer = sanitize(buffer.toString('utf8'));
        $('#pasteOutput').html(buffer);
        detectEncrypted(buffer.toString('utf8'));
    });

    $('#showModal').modal();
}

function updateProgress()
{
    $('.torrentProgress').each(function() {
        var magnetURI = $(this).attr('id');
        var torrent = client.get(magnetURI);
        var downloadContainer = $(this).parents('.row');
        if (torrent){
            $(this).text(torrent.progress * 100 + '%');
            downloadContainer.find('#peers-text').text(torrent.numPeers);
            downloadContainer.find('#ratio-text').text(torrent.ratio.toFixed(2));
        }
        else
            console.log(magnetURI + ' not found.');
    });
}

$('#markdownCheckbox').click(function(){
    markdownCheck();
});

$('#highlightCheckbox').click(function(){
    highlightCheck();
})

function markdownCheck()
{
 if ($('#markdownCheckbox').is(':checked')) {
        if ($('#highlightCheckbox').is(':checked')) { $('#highlightCheckbox').click();  }
        var data = unSanitize($('#pasteOutput').html());
        $('#pasteOutput').css('white-space', 'normal');
        $('#pasteOutput').data('orig', data);
        var markdownResult = markdown.toHTML(data);
        $('#pasteOutput').html(markdownResult);
        detectEncrypted(markdownResult);
  } 
  else {
    var orig = sanitize($('#pasteOutput').data().orig);
    $('#pasteOutput').html(orig);
    $('#pasteOutput').css('white-space', 'pre');
    detectEncrypted(orig);
  }
}

function highlightCheck()
{
    /*          $('#pasteOutput').each(function(i, block) {
            hljs.highlightBlock(block);
          });*/
 if ($('#highlightCheckbox').is(':checked')) {
    if ($('#markdownCheckbox').is(':checked')) { $('#markdownCheckbox').click();  }
        var data = $('#pasteOutput').html();
        //$('#pasteOutput').css('white-space', 'normal');
        $('#pasteOutput').data('orig', data);
    $('#pasteOutput').each(function(i, block) {
            hljs.highlightBlock(block);
    });
  } 
  else {
    var orig = $('#pasteOutput').data().orig;
    $('#pasteOutput').html(orig);
    $('#pasteOutput').css('white-space', 'pre');
    detectEncrypted(orig);
  }
}


$('#downloadOpen').click(function(){
    // Make sure download paste button is showing
    $('#download').show();
    $('#downloadURILabel').show();

	$('#downloadModal').modal();
	$('#download').css('display', 'inline');
});

$('#download').click(function(){

    var uri = $('#downloadURI').val();

    if (uri.substring(0, 20) != "magnet:?xt=urn:btih:") {
        $.bootstrapGrowl("That is an invalid magnet link.", {type: 'danger'});
        return false;
    }

    // Unhide downloadsPanel
    $('#downloadsPanel').css('display', 'block');

	// Unhide the download spinner
	$('#downloadSpinner').removeClass('hidden');

	$.bootstrapGrowl("When finished, your paste will be in the output box below", {type: 'success'});

	client.add(uri, function (torrent) {
		// Hide the download spinner
		$('#downloadSpinner').addClass('hidden');


	  // Torrents can contain many files. Let's use the first.
	  file = torrent.files[0];
	  // Render text to markdown, then send to DOM
	  file.getBuffer(function (err, buffer) {
		  if (err) throw err
		  showPaste(torrent);
          $('#downloadModal').modal('hide');
          $('#downloadURI').val('');
	  });

	  downloadsRefresh();
	});
});

$('form').on('submit', function(){
	return false;
});

function showModalSpinner(state)
{
    if (state)
    {
        $('#showModalMain').css('display', 'none');
        $('#showModalSpinner').css('display', 'block');
    }
    else
    {
        $('#showModalMain').css('display', 'block');
        $('#showModalSpinner').css('display', 'none');
    }
}

if(window.location.hash) {
    var windowHash = window.location.hash.replace('#', '');
	$.bootstrapGrowl("Your paste is now downloading.", {type: 'success'});

	var uri = 'magnet:?xt=urn:btih:' + windowHash + '&dn=paste.txt&tr=udp%3A%2F%2Fexodus.desync.com%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&tr=wss%3A%2F%2Ftracker.webtorrent.io';

    $('#showModal').modal();
    showModalSpinner(true);

	client.add(uri, function (torrent) {
        // Hide download spinner
        $('#downloadSpinner').addClass('hidden');
        downloadsRefresh();

      file = torrent.files[0];
      file.getBuffer(function (err, buffer) {
          if (err) throw err
          showPaste(torrent);
          showModalSpinner(false);
          $('#downloadModal').modal('hide');
          $('#downloadURI').val('');
          $.bootstrapGrowl("Download finished", {type: 'success'});
          // Unhide downloadsPanel
          $('#downloadsPanel').css('display', 'block');
          // Show download spinner
          $('#downloadSpinner').removeClass('hidden');
      });
	});
}

// Update torrent progress every second
setInterval(function(){
    updateProgress();
},1000);


/* ---- /1Mi3ThNGPyiuhiWCJPH2BAqeKCiBF5BVpR/markdown.min.js ---- */


/* markdown-js (https://github.com/evilstreak/markdown-js) MIT License */ !function(a){function b(){return"Markdown.mk_block( "+uneval(this.toString())+", "+uneval(this.trailing)+", "+uneval(this.lineNumber)+" )"}function c(){var a=require("util");return"Markdown.mk_block( "+a.inspect(this.toString())+", "+a.inspect(this.trailing)+", "+a.inspect(this.lineNumber)+" )"}function d(a){for(var b=0,c=-1;-1!==(c=a.indexOf("\n",c+1));)b++;return b}function e(a){return a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function f(a){if("string"==typeof a)return e(a);var b=a.shift(),c={},d=[];for(!a.length||"object"!=typeof a[0]||a[0]instanceof Array||(c=a.shift());a.length;)d.push(f(a.shift()));var g="";for(var h in c)g+=" "+h+'="'+e(c[h])+'"';return"img"===b||"br"===b||"hr"===b?"<"+b+g+"/>":"<"+b+g+">"+d.join("")+"</"+b+">"}function g(a,b,c){var d;c=c||{};var e=a.slice(0);"function"==typeof c.preprocessTreeNode&&(e=c.preprocessTreeNode(e,b));var f=o(e);if(f){e[1]={};for(d in f)e[1][d]=f[d];f=e[1]}if("string"==typeof e)return e;switch(e[0]){case"header":e[0]="h"+e[1].level,delete e[1].level;break;case"bulletlist":e[0]="ul";break;case"numberlist":e[0]="ol";break;case"listitem":e[0]="li";break;case"para":e[0]="p";break;case"markdown":e[0]="html",f&&delete f.references;break;case"code_block":e[0]="pre",d=f?2:1;var h=["code"];h.push.apply(h,e.splice(d,e.length-d)),e[d]=h;break;case"inlinecode":e[0]="code";break;case"img":e[1].src=e[1].href,delete e[1].href;break;case"linebreak":e[0]="br";break;case"link":e[0]="a";break;case"link_ref":e[0]="a";var i=b[f.ref];if(!i)return f.original;delete f.ref,f.href=i.href,i.title&&(f.title=i.title),delete f.original;break;case"img_ref":e[0]="img";var i=b[f.ref];if(!i)return f.original;delete f.ref,f.src=i.href,i.title&&(f.title=i.title),delete f.original}if(d=1,f){for(var j in e[1]){d=2;break}1===d&&e.splice(d,1)}for(;d<e.length;++d)e[d]=g(e[d],b,c);return e}function h(a){for(var b=o(a)?2:1;b<a.length;)"string"==typeof a[b]?b+1<a.length&&"string"==typeof a[b+1]?a[b]+=a.splice(b+1,1)[0]:++b:(h(a[b]),++b)}function i(a,b){function c(a){this.len_after=a,this.name="close_"+b}var d=a+"_state",e="strong"===a?"em_state":"strong_state";return function(f){if(this[d][0]===b)return this[d].shift(),[f.length,new c(f.length-b.length)];var g=this[e].slice(),h=this[d].slice();this[d].unshift(b);var i=this.processInline(f.substr(b.length)),j=i[i.length-1];if(this[d].shift(),j instanceof c){i.pop();var k=f.length-j.len_after;return[k,[a].concat(i)]}return this[e]=g,this[d]=h,[b.length,b]}}function j(a){for(var b=a.split(""),c=[""],d=!1;b.length;){var e=b.shift();switch(e){case" ":d?c[c.length-1]+=e:c.push("");break;case"'":case'"':d=!d;break;case"\\":e=b.shift();default:c[c.length-1]+=e}}return c}var k={};k.mk_block=function(a,d,e){1===arguments.length&&(d="\n\n");var f=new String(a);return f.trailing=d,f.inspect=c,f.toSource=b,void 0!==e&&(f.lineNumber=e),f};var l=k.isArray=Array.isArray||function(a){return"[object Array]"===Object.prototype.toString.call(a)};k.forEach=Array.prototype.forEach?function(a,b,c){return a.forEach(b,c)}:function(a,b,c){for(var d=0;d<a.length;d++)b.call(c||a,a[d],d,a)},k.isEmpty=function(a){for(var b in a)if(hasOwnProperty.call(a,b))return!1;return!0},k.extract_attr=function(a){return l(a)&&a.length>1&&"object"==typeof a[1]&&!l(a[1])?a[1]:void 0};var m=function(a){switch(typeof a){case"undefined":this.dialect=m.dialects.Gruber;break;case"object":this.dialect=a;break;default:if(!(a in m.dialects))throw new Error("Unknown Markdown dialect '"+String(a)+"'");this.dialect=m.dialects[a]}this.em_state=[],this.strong_state=[],this.debug_indent=""};m.dialects={};var n=m.mk_block=k.mk_block,l=k.isArray;m.parse=function(a,b){var c=new m(b);return c.toTree(a)},m.prototype.split_blocks=function(a){a=a.replace(/(\r\n|\n|\r)/g,"\n");var b,c=/([\s\S]+?)($|\n#|\n(?:\s*\n|$)+)/g,e=[],f=1;for(null!==(b=/^(\s*\n)/.exec(a))&&(f+=d(b[0]),c.lastIndex=b[0].length);null!==(b=c.exec(a));)"\n#"===b[2]&&(b[2]="\n",c.lastIndex--),e.push(n(b[1],b[2],f)),f+=d(b[0]);return e},m.prototype.processBlock=function(a,b){var c=this.dialect.block,d=c.__order__;if("__call__"in c)return c.__call__.call(this,a,b);for(var e=0;e<d.length;e++){var f=c[d[e]].call(this,a,b);if(f)return(!l(f)||f.length>0&&!l(f[0]))&&this.debug(d[e],"didn't return a proper array"),f}return[]},m.prototype.processInline=function(a){return this.dialect.inline.__call__.call(this,String(a))},m.prototype.toTree=function(a,b){var c=a instanceof Array?a:this.split_blocks(a),d=this.tree;try{for(this.tree=b||this.tree||["markdown"];c.length;){var e=this.processBlock(c.shift(),c);e.length&&this.tree.push.apply(this.tree,e)}return this.tree}finally{b&&(this.tree=d)}},m.prototype.debug=function(){var a=Array.prototype.slice.call(arguments);a.unshift(this.debug_indent),"undefined"!=typeof print&&print.apply(print,a),"undefined"!=typeof console&&"undefined"!=typeof console.log&&console.log.apply(null,a)},m.prototype.loop_re_over_block=function(a,b,c){for(var d,e=b.valueOf();e.length&&null!==(d=a.exec(e));)e=e.substr(d[0].length),c.call(this,d);return e},m.buildBlockOrder=function(a){var b=[];for(var c in a)"__order__"!==c&&"__call__"!==c&&b.push(c);a.__order__=b},m.buildInlinePatterns=function(a){var b=[];for(var c in a)if(!c.match(/^__.*__$/)){var d=c.replace(/([\\.*+?|()\[\]{}])/g,"\\$1").replace(/\n/,"\\n");b.push(1===c.length?d:"(?:"+d+")")}b=b.join("|"),a.__patterns__=b;var e=a.__call__;a.__call__=function(a,c){return void 0!==c?e.call(this,a,c):e.call(this,a,b)}};var o=k.extract_attr;m.renderJsonML=function(a,b){b=b||{},b.root=b.root||!1;var c=[];if(b.root)c.push(f(a));else for(a.shift(),!a.length||"object"!=typeof a[0]||a[0]instanceof Array||a.shift();a.length;)c.push(f(a.shift()));return c.join("\n\n")},m.toHTMLTree=function(a,b,c){"string"==typeof a&&(a=this.parse(a,b));var d=o(a),e={};d&&d.references&&(e=d.references);var f=g(a,e,c);return h(f),f},m.toHTML=function(a,b,c){var d=this.toHTMLTree(a,b,c);return this.renderJsonML(d)};var p={};p.inline_until_char=function(a,b){for(var c=0,d=[];;){if(a.charAt(c)===b)return c++,[c,d];if(c>=a.length)return null;var e=this.dialect.inline.__oneElement__.call(this,a.substr(c));c+=e[0],d.push.apply(d,e.slice(1))}},p.subclassDialect=function(a){function b(){}function c(){}return b.prototype=a.block,c.prototype=a.inline,{block:new b,inline:new c}};var q=k.forEach,o=k.extract_attr,n=k.mk_block,r=k.isEmpty,s=p.inline_until_char,t={block:{atxHeader:function(a,b){var c=a.match(/^(#{1,6})\s*(.*?)\s*#*\s*(?:\n|$)/);if(!c)return void 0;var d=["header",{level:c[1].length}];return Array.prototype.push.apply(d,this.processInline(c[2])),c[0].length<a.length&&b.unshift(n(a.substr(c[0].length),a.trailing,a.lineNumber+2)),[d]},setextHeader:function(a,b){var c=a.match(/^(.*)\n([-=])\2\2+(?:\n|$)/);if(!c)return void 0;var d="="===c[2]?1:2,e=["header",{level:d},c[1]];return c[0].length<a.length&&b.unshift(n(a.substr(c[0].length),a.trailing,a.lineNumber+2)),[e]},code:function(a,b){var c=[],d=/^(?: {0,3}\t| {4})(.*)\n?/;if(!a.match(d))return void 0;a:for(;;){var e=this.loop_re_over_block(d,a.valueOf(),function(a){c.push(a[1])});if(e.length){b.unshift(n(e,a.trailing));break a}if(!b.length)break a;if(!b[0].match(d))break a;c.push(a.trailing.replace(/[^\n]/g,"").substring(2)),a=b.shift()}return[["code_block",c.join("\n")]]},horizRule:function(a,b){var c=a.match(/^(?:([\s\S]*?)\n)?[ \t]*([-_*])(?:[ \t]*\2){2,}[ \t]*(?:\n([\s\S]*))?$/);if(!c)return void 0;var d=[["hr"]];if(c[1]){var e=n(c[1],"",a.lineNumber);d.unshift.apply(d,this.toTree(e,[]))}return c[3]&&b.unshift(n(c[3],a.trailing,a.lineNumber+1)),d},lists:function(){function a(a){return new RegExp("(?:^("+i+"{0,"+a+"} {0,3})("+f+")\\s+)|"+"(^"+i+"{0,"+(a-1)+"}[ ]{0,4})")}function b(a){return a.replace(/ {0,3}\t/g,"    ")}function c(a,b,c,d){if(b)return a.push(["para"].concat(c)),void 0;var e=a[a.length-1]instanceof Array&&"para"===a[a.length-1][0]?a[a.length-1]:a;d&&a.length>1&&c.unshift(d);for(var f=0;f<c.length;f++){var g=c[f],h="string"==typeof g;h&&e.length>1&&"string"==typeof e[e.length-1]?e[e.length-1]+=g:e.push(g)}}function d(a,b){for(var c=new RegExp("^("+i+"{"+a+"}.*?\\n?)*$"),d=new RegExp("^"+i+"{"+a+"}","gm"),e=[];b.length>0&&c.exec(b[0]);){var f=b.shift(),g=f.replace(d,"");e.push(n(g,f.trailing,f.lineNumber))}return e}function e(a,b,c){var d=a.list,e=d[d.length-1];if(!(e[1]instanceof Array&&"para"===e[1][0]))if(b+1===c.length)e.push(["para"].concat(e.splice(1,e.length-1)));else{var f=e.pop();e.push(["para"].concat(e.splice(1,e.length-1)),f)}}var f="[*+-]|\\d+\\.",g=/[*+-]/,h=new RegExp("^( {0,3})("+f+")[ 	]+"),i="(?: {0,3}\\t| {4})";return function(f,i){function j(a){var b=g.exec(a[2])?["bulletlist"]:["numberlist"];return n.push({list:b,indent:a[1]}),b}var k=f.match(h);if(!k)return void 0;for(var l,m,n=[],o=j(k),p=!1,r=[n[0].list];;){for(var s=f.split(/(?=\n)/),t="",u="",v=0;v<s.length;v++){u="";var w=s[v].replace(/^\n/,function(a){return u=a,""}),x=a(n.length);if(k=w.match(x),void 0!==k[1]){t.length&&(c(l,p,this.processInline(t),u),p=!1,t=""),k[1]=b(k[1]);var y=Math.floor(k[1].length/4)+1;if(y>n.length)o=j(k),l.push(o),l=o[1]=["listitem"];else{var z=!1;for(m=0;m<n.length;m++)if(n[m].indent===k[1]){o=n[m].list,n.splice(m+1,n.length-(m+1)),z=!0;break}z||(y++,y<=n.length?(n.splice(y,n.length-y),o=n[y-1].list):(o=j(k),l.push(o))),l=["listitem"],o.push(l)}u=""}w.length>k[0].length&&(t+=u+w.substr(k[0].length))}t.length&&(c(l,p,this.processInline(t),u),p=!1,t="");var A=d(n.length,i);A.length>0&&(q(n,e,this),l.push.apply(l,this.toTree(A,[])));var B=i[0]&&i[0].valueOf()||"";if(!B.match(h)&&!B.match(/^ /))break;f=i.shift();var C=this.dialect.block.horizRule(f,i);if(C){r.push.apply(r,C);break}q(n,e,this),p=!0}return r}}(),blockquote:function(a,b){if(!a.match(/^>/m))return void 0;var c=[];if(">"!==a[0]){for(var d=a.split(/\n/),e=[],f=a.lineNumber;d.length&&">"!==d[0][0];)e.push(d.shift()),f++;var g=n(e.join("\n"),"\n",a.lineNumber);c.push.apply(c,this.processBlock(g,[])),a=n(d.join("\n"),a.trailing,f)}for(;b.length&&">"===b[0][0];){var h=b.shift();a=n(a+a.trailing+h,h.trailing,a.lineNumber)}var i=a.replace(/^> ?/gm,""),j=(this.tree,this.toTree(i,["blockquote"])),k=o(j);return k&&k.references&&(delete k.references,r(k)&&j.splice(1,1)),c.push(j),c},referenceDefn:function(a,b){var c=/^\s*\[(.*?)\]:\s*(\S+)(?:\s+(?:(['"])(.*?)\3|\((.*?)\)))?\n?/;if(!a.match(c))return void 0;o(this.tree)||this.tree.splice(1,0,{});var d=o(this.tree);void 0===d.references&&(d.references={});var e=this.loop_re_over_block(c,a,function(a){a[2]&&"<"===a[2][0]&&">"===a[2][a[2].length-1]&&(a[2]=a[2].substring(1,a[2].length-1));var b=d.references[a[1].toLowerCase()]={href:a[2]};void 0!==a[4]?b.title=a[4]:void 0!==a[5]&&(b.title=a[5])});return e.length&&b.unshift(n(e,a.trailing)),[]},para:function(a){return[["para"].concat(this.processInline(a))]}},inline:{__oneElement__:function(a,b,c){var d,e;b=b||this.dialect.inline.__patterns__;var f=new RegExp("([\\s\\S]*?)("+(b.source||b)+")");if(d=f.exec(a),!d)return[a.length,a];if(d[1])return[d[1].length,d[1]];var e;return d[2]in this.dialect.inline&&(e=this.dialect.inline[d[2]].call(this,a.substr(d.index),d,c||[])),e=e||[d[2].length,d[2]]},__call__:function(a,b){function c(a){"string"==typeof a&&"string"==typeof e[e.length-1]?e[e.length-1]+=a:e.push(a)}for(var d,e=[];a.length>0;)d=this.dialect.inline.__oneElement__.call(this,a,b,e),a=a.substr(d.shift()),q(d,c);return e},"]":function(){},"}":function(){},__escape__:/^\\[\\`\*_{}\[\]()#\+.!\-]/,"\\":function(a){return this.dialect.inline.__escape__.exec(a)?[2,a.charAt(1)]:[1,"\\"]},"![":function(a){var b=a.match(/^!\[(.*?)\][ \t]*\([ \t]*([^")]*?)(?:[ \t]+(["'])(.*?)\3)?[ \t]*\)/);if(b){b[2]&&"<"===b[2][0]&&">"===b[2][b[2].length-1]&&(b[2]=b[2].substring(1,b[2].length-1)),b[2]=this.dialect.inline.__call__.call(this,b[2],/\\/)[0];var c={alt:b[1],href:b[2]||""};return void 0!==b[4]&&(c.title=b[4]),[b[0].length,["img",c]]}return b=a.match(/^!\[(.*?)\][ \t]*\[(.*?)\]/),b?[b[0].length,["img_ref",{alt:b[1],ref:b[2].toLowerCase(),original:b[0]}]]:[2,"!["]},"[":function v(a){var b=String(a),c=s.call(this,a.substr(1),"]");if(!c)return[1,"["];var v,d,e=1+c[0],f=c[1];a=a.substr(e);var g=a.match(/^\s*\([ \t]*([^"']*)(?:[ \t]+(["'])(.*?)\2)?[ \t]*\)/);if(g){var h=g[1];if(e+=g[0].length,h&&"<"===h[0]&&">"===h[h.length-1]&&(h=h.substring(1,h.length-1)),!g[3])for(var i=1,j=0;j<h.length;j++)switch(h[j]){case"(":i++;break;case")":0===--i&&(e-=h.length-j,h=h.substring(0,j))}return h=this.dialect.inline.__call__.call(this,h,/\\/)[0],d={href:h||""},void 0!==g[3]&&(d.title=g[3]),v=["link",d].concat(f),[e,v]}return g=a.match(/^\s*\[(.*?)\]/),g?(e+=g[0].length,d={ref:(g[1]||String(f)).toLowerCase(),original:b.substr(0,e)},v=["link_ref",d].concat(f),[e,v]):1===f.length&&"string"==typeof f[0]?(d={ref:f[0].toLowerCase(),original:b.substr(0,e)},v=["link_ref",d,f[0]],[e,v]):[1,"["]},"<":function(a){var b;return null!==(b=a.match(/^<(?:((https?|ftp|mailto):[^>]+)|(.*?@.*?\.[a-zA-Z]+))>/))?b[3]?[b[0].length,["link",{href:"mailto:"+b[3]},b[3]]]:"mailto"===b[2]?[b[0].length,["link",{href:b[1]},b[1].substr("mailto:".length)]]:[b[0].length,["link",{href:b[1]},b[1]]]:[1,"<"]},"`":function(a){var b=a.match(/(`+)(([\s\S]*?)\1)/);return b&&b[2]?[b[1].length+b[2].length,["inlinecode",b[3]]]:[1,"`"]},"  \n":function(){return[3,["linebreak"]]}}};t.inline["**"]=i("strong","**"),t.inline.__=i("strong","__"),t.inline["*"]=i("em","*"),t.inline._=i("em","_"),m.dialects.Gruber=t,m.buildBlockOrder(m.dialects.Gruber.block),m.buildInlinePatterns(m.dialects.Gruber.inline);var u=p.subclassDialect(t),o=k.extract_attr,q=k.forEach;u.processMetaHash=function(a){for(var b=j(a),c={},d=0;d<b.length;++d)if(/^#/.test(b[d]))c.id=b[d].substring(1);else if(/^\./.test(b[d]))c["class"]=c["class"]?c["class"]+b[d].replace(/./," "):b[d].substring(1);else if(/\=/.test(b[d])){var e=b[d].split(/\=/);c[e[0]]=e[1]}return c},u.block.document_meta=function(a){if(a.lineNumber>1)return void 0;if(!a.match(/^(?:\w+:.*\n)*\w+:.*$/))return void 0;o(this.tree)||this.tree.splice(1,0,{});var b=a.split(/\n/);for(var c in b){var d=b[c].match(/(\w+):\s*(.*)$/),e=d[1].toLowerCase(),f=d[2];this.tree[1][e]=f}return[]},u.block.block_meta=function(a){var b=a.match(/(^|\n) {0,3}\{:\s*((?:\\\}|[^\}])*)\s*\}$/);if(!b)return void 0;var c,d=this.dialect.processMetaHash(b[2]);if(""===b[1]){var e=this.tree[this.tree.length-1];if(c=o(e),"string"==typeof e)return void 0;c||(c={},e.splice(1,0,c));for(var f in d)c[f]=d[f];return[]}var g=a.replace(/\n.*$/,""),h=this.processBlock(g,[]);c=o(h[0]),c||(c={},h[0].splice(1,0,c));for(var f in d)c[f]=d[f];return h},u.block.definition_list=function(a,b){var c,d,e=/^((?:[^\s:].*\n)+):\s+([\s\S]+)$/,f=["dl"];if(!(d=a.match(e)))return void 0;for(var g=[a];b.length&&e.exec(b[0]);)g.push(b.shift());for(var h=0;h<g.length;++h){var d=g[h].match(e),i=d[1].replace(/\n$/,"").split(/\n/),j=d[2].split(/\n:\s+/);for(c=0;c<i.length;++c)f.push(["dt",i[c]]);for(c=0;c<j.length;++c)f.push(["dd"].concat(this.processInline(j[c].replace(/(\n)\s+/,"$1"))))}return[f]},u.block.table=function w(a){var b,c,d=function(a,b){b=b||"\\s",b.match(/^[\\|\[\]{}?*.+^$]$/)&&(b="\\"+b);for(var c,d=[],e=new RegExp("^((?:\\\\.|[^\\\\"+b+"])*)"+b+"(.*)");c=a.match(e);)d.push(c[1]),a=c[2];return d.push(a),d},e=/^ {0,3}\|(.+)\n {0,3}\|\s*([\-:]+[\-| :]*)\n((?:\s*\|.*(?:\n|$))*)(?=\n|$)/,f=/^ {0,3}(\S(?:\\.|[^\\|])*\|.*)\n {0,3}([\-:]+\s*\|[\-| :]*)\n((?:(?:\\.|[^\\|])*\|.*(?:\n|$))*)(?=\n|$)/;if(c=a.match(e))c[3]=c[3].replace(/^\s*\|/gm,"");else if(!(c=a.match(f)))return void 0;var w=["table",["thead",["tr"]],["tbody"]];c[2]=c[2].replace(/\|\s*$/,"").split("|");var g=[];for(q(c[2],function(a){a.match(/^\s*-+:\s*$/)?g.push({align:"right"}):a.match(/^\s*:-+\s*$/)?g.push({align:"left"}):a.match(/^\s*:-+:\s*$/)?g.push({align:"center"}):g.push({})}),c[1]=d(c[1].replace(/\|\s*$/,""),"|"),b=0;b<c[1].length;b++)w[1][1].push(["th",g[b]||{}].concat(this.processInline(c[1][b].trim())));return q(c[3].replace(/\|\s*$/gm,"").split("\n"),function(a){var c=["tr"];for(a=d(a,"|"),b=0;b<a.length;b++)c.push(["td",g[b]||{}].concat(this.processInline(a[b].trim())));w[2].push(c)},this),[w]},u.inline["{:"]=function(a,b,c){if(!c.length)return[2,"{:"];var d=c[c.length-1];if("string"==typeof d)return[2,"{:"];var e=a.match(/^\{:\s*((?:\\\}|[^\}])*)\s*\}/);if(!e)return[2,"{:"];var f=this.dialect.processMetaHash(e[1]),g=o(d);g||(g={},d.splice(1,0,g));for(var h in f)g[h]=f[h];return[e[0].length,""]},m.dialects.Maruku=u,m.dialects.Maruku.inline.__escape__=/^\\[\\`\*_{}\[\]()#\+.!\-|:]/,m.buildBlockOrder(m.dialects.Maruku.block),m.buildInlinePatterns(m.dialects.Maruku.inline),a.Markdown=m,a.parse=m.parse,a.toHTML=m.toHTML,a.toHTMLTree=m.toHTMLTree,a.renderJsonML=m.renderJsonML}(function(){return window.markdown={},window.markdown}());


/* ---- /1Mi3ThNGPyiuhiWCJPH2BAqeKCiBF5BVpR/webtorrent.min.js ---- */


/* 
Copyright (c) WebTorrent, LLC
MIT License
*/
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.WebTorrent=e()}}(function(){var e;return function e(t,n,r){function o(s,a){if(!n[s]){if(!t[s]){var u="function"==typeof require&&require;if(!a&&u)return u(s,!0);if(i)return i(s,!0);var c=new Error("Cannot find module '"+s+"'");throw c.code="MODULE_NOT_FOUND",c}var f=n[s]={exports:{}};t[s][0].call(f.exports,function(e){var n=t[s][1][e];return o(n?n:e)},f,f.exports,e,t,n,r)}return n[s].exports}for(var i="function"==typeof require&&require,s=0;s<r.length;s++)o(r[s]);return o}({1:[function(e,t,n){function r(e,t){s.Readable.call(this,t),this.destroyed=!1,this._torrent=e._torrent;var n=t&&t.start||0,r=t&&t.end&&t.end<e.length?t.end:e.length-1,o=e._torrent.pieceLength;this._startPiece=(n+e.offset)/o|0,this._endPiece=(r+e.offset)/o|0,this._piece=this._startPiece,this._offset=n+e.offset-this._startPiece*o,this._missing=r-n+1,this._reading=!1,this._notifying=!1,this._criticalLength=Math.min(1048576/o|0,2)}t.exports=r;var o=e("debug")("webtorrent:file-stream"),i=e("inherits"),s=e("readable-stream");i(r,s.Readable),r.prototype._read=function(){this._reading||(this._reading=!0,this._notify())},r.prototype._notify=function(){var e=this;if(e._reading&&0!==e._missing){if(!e._torrent.bitfield.get(e._piece))return e._torrent.critical(e._piece,e._piece+e._criticalLength);if(!e._notifying){e._notifying=!0;var t=e._piece;e._torrent.store.get(t,function(n,r){if(e._notifying=!1,!e.destroyed){if(n)return e._destroy(n);o("read %s (length %s) (err %s)",t,r.length,n&&n.message),e._offset&&(r=r.slice(e._offset),e._offset=0),e._missing<r.length&&(r=r.slice(0,e._missing)),e._missing-=r.length,o("pushing buffer of length %s",r.length),e._reading=!1,e.push(r),0===e._missing&&e.push(null)}}),e._piece+=1}}},r.prototype.destroy=function(e){this._destroy(null,e)},r.prototype._destroy=function(e,t){this.destroyed||(this.destroyed=!0,this._torrent.destroyed||this._torrent.deselect(this._startPiece,this._endPiece,!0),e&&this.emit("error",e),this.emit("close"),t&&t())}},{debug:30,inherits:42,"readable-stream":82}],2:[function(e,t,n){(function(n){function r(e,t){i.call(this),this._torrent=e,this._destroyed=!1,this.name=t.name,this.path=t.path,this.length=t.length,this.offset=t.offset,this.done=!1;var n=t.offset,r=n+t.length-1;this._startPiece=n/this._torrent.pieceLength|0,this._endPiece=r/this._torrent.pieceLength|0,0===this.length&&(this.done=!0,this.emit("done"))}t.exports=r;var o=e("end-of-stream"),i=e("events").EventEmitter,s=e("./file-stream"),a=e("inherits"),u=e("path"),c=e("render-media"),f=e("readable-stream"),d=e("stream-to-blob"),h=e("stream-to-blob-url"),l=e("stream-with-known-length-to-buffer");a(r,i),r.prototype.select=function(e){0!==this.length&&this._torrent.select(this._startPiece,this._endPiece,e)},r.prototype.deselect=function(){0!==this.length&&this._torrent.deselect(this._startPiece,this._endPiece,!1)},r.prototype.createReadStream=function(e){var t=this;if(0===this.length){var r=new f.PassThrough;return n.nextTick(function(){r.end()}),r}var i=new s(t,e);return t._torrent.select(i._startPiece,i._endPiece,!0,function(){i._notify()}),o(i,function(){t._destroyed||t._torrent.destroyed||t._torrent.deselect(i._startPiece,i._endPiece,!0)}),i},r.prototype.getBuffer=function(e){l(this.createReadStream(),this.length,e)},r.prototype.getBlob=function(e){if("undefined"==typeof window)throw new Error("browser-only method");d(this.createReadStream(),this._getMimeType(),e)},r.prototype.getBlobURL=function(e){if("undefined"==typeof window)throw new Error("browser-only method");h(this.createReadStream(),this._getMimeType(),e)},r.prototype.appendTo=function(e,t,n){if("undefined"==typeof window)throw new Error("browser-only method");c.append(this,e,t,n)},r.prototype.renderTo=function(e,t,n){if("undefined"==typeof window)throw new Error("browser-only method");c.render(this,e,t,n)},r.prototype._getMimeType=function(){return c.mime[u.extname(this.name).toLowerCase()]},r.prototype._destroy=function(){this._destroyed=!0,this._torrent=null}}).call(this,e("_process"))},{"./file-stream":1,_process:67,"end-of-stream":33,events:35,inherits:42,path:64,"readable-stream":82,"render-media":83,"stream-to-blob":100,"stream-to-blob-url":99,"stream-with-known-length-to-buffer":101}],3:[function(e,t,n){function r(e,t){var n=this;n.id=e,n.type=t,s("new Peer %s",e),n.addr=null,n.conn=null,n.swarm=null,n.wire=null,n.connected=!1,n.destroyed=!1,n.timeout=null,n.retries=0,n.sentHandshake=!1}function o(){}var i=e("unordered-array-remove"),s=e("debug")("webtorrent:peer"),a=e("bittorrent-protocol"),u=e("./webconn"),c=5e3,f=25e3,d=25e3;n.createWebRTCPeer=function(e,t){var n=new r(e.id,"webrtc");return n.conn=e,n.swarm=t,n.conn.connected?n.onConnect():(n.conn.once("connect",function(){n.onConnect()}),n.conn.once("error",function(e){n.destroy(e)}),n.startConnectTimeout()),n},n.createTCPIncomingPeer=function(e){var t=e.remoteAddress+":"+e.remotePort,n=new r(t,"tcpIncoming");return n.conn=e,n.addr=t,n.onConnect(),n},n.createTCPOutgoingPeer=function(e,t){var n=new r(e,"tcpOutgoing");return n.addr=e,n.swarm=t,n},n.createWebSeedPeer=function(e,t){var n=new r(e,"webSeed");return n.swarm=t,n.conn=new u(e,t),n.onConnect(),n},r.prototype.onConnect=function(){var e=this;if(!e.destroyed){e.connected=!0,s("Peer %s connected",e.id),clearTimeout(e.connectTimeout);var t=e.conn;t.once("end",function(){e.destroy()}),t.once("close",function(){e.destroy()}),t.once("finish",function(){e.destroy()}),t.once("error",function(t){e.destroy(t)});var n=e.wire=new a;n.type=e.type,n.once("end",function(){e.destroy()}),n.once("close",function(){e.destroy()}),n.once("finish",function(){e.destroy()}),n.once("error",function(t){e.destroy(t)}),n.once("handshake",function(t,n){e.onHandshake(t,n)}),e.startHandshakeTimeout(),t.pipe(n).pipe(t),e.swarm&&!e.sentHandshake&&e.handshake()}},r.prototype.onHandshake=function(e,t){var n=this;if(n.swarm&&!n.destroyed){if(n.swarm.destroyed)return n.destroy(new Error("swarm already destroyed"));if(e!==n.swarm.infoHash)return n.destroy(new Error("unexpected handshake info hash for this swarm"));if(t===n.swarm.peerId)return n.destroy(new Error("refusing to connect to ourselves"));s("Peer %s got handshake %s",n.id,e),clearTimeout(n.handshakeTimeout),n.retries=0;var r=n.addr;!r&&n.conn.remoteAddress&&(r=n.conn.remoteAddress+":"+n.conn.remotePort),n.swarm._onWire(n.wire,r),n.swarm&&!n.swarm.destroyed&&(n.sentHandshake||n.handshake())}},r.prototype.handshake=function(){var e=this,t={dht:!e.swarm.private&&!!e.swarm.client.dht};e.wire.handshake(e.swarm.infoHash,e.swarm.client.peerId,t),e.sentHandshake=!0},r.prototype.startConnectTimeout=function(){var e=this;clearTimeout(e.connectTimeout),e.connectTimeout=setTimeout(function(){e.destroy(new Error("connect timeout"))},"webrtc"===e.type?f:c),e.connectTimeout.unref&&e.connectTimeout.unref()},r.prototype.startHandshakeTimeout=function(){var e=this;clearTimeout(e.handshakeTimeout),e.handshakeTimeout=setTimeout(function(){e.destroy(new Error("handshake timeout"))},d),e.handshakeTimeout.unref&&e.handshakeTimeout.unref()},r.prototype.destroy=function(e){var t=this;if(!t.destroyed){t.destroyed=!0,t.connected=!1,s("destroy %s (error: %s)",t.id,e&&(e.message||e)),clearTimeout(t.connectTimeout),clearTimeout(t.handshakeTimeout);var n=t.swarm,r=t.conn,a=t.wire;t.swarm=null,t.conn=null,t.wire=null,n&&a&&i(n.wires,n.wires.indexOf(a)),r&&(r.on("error",o),r.destroy()),a&&a.destroy(),n&&n.removePeer(t.id)}}},{"./webconn":6,"bittorrent-protocol":14,debug:30,"unordered-array-remove":111}],4:[function(e,t,n){function r(e){var t=this;t._torrent=e,t._numPieces=e.pieces.length,t._pieces=[],t._onWire=function(e){t.recalculate(),t._initWire(e)},t._onWireHave=function(e){t._pieces[e]+=1},t._onWireBitfield=function(){t.recalculate()},t._torrent.wires.forEach(function(e){t._initWire(e)}),t._torrent.on("wire",t._onWire),t.recalculate()}function o(){return!0}t.exports=r,r.prototype.getRarestPiece=function(e){e||(e=o);for(var t=[],n=1/0,r=0;r<this._numPieces;++r)if(e(r)){var i=this._pieces[r];i===n?t.push(r):i<n&&(t=[r],n=i)}return t.length>0?t[Math.random()*t.length|0]:-1},r.prototype.destroy=function(){var e=this;e._torrent.removeListener("wire",e._onWire),e._torrent.wires.forEach(function(t){e._cleanupWireEvents(t)}),e._torrent=null,e._pieces=null,e._onWire=null,e._onWireHave=null,e._onWireBitfield=null},r.prototype._initWire=function(e){var t=this;e._onClose=function(){t._cleanupWireEvents(e);for(var n=0;n<this._numPieces;++n)t._pieces[n]-=e.peerPieces.get(n)},e.on("have",t._onWireHave),e.on("bitfield",t._onWireBitfield),e.once("close",e._onClose)},r.prototype.recalculate=function(){var e;for(e=0;e<this._numPieces;++e)this._pieces[e]=0;var t=this._torrent.wires.length;for(e=0;e<t;++e)for(var n=this._torrent.wires[e],r=0;r<this._numPieces;++r)this._pieces[r]+=n.peerPieces.get(r)},r.prototype._cleanupWireEvents=function(e){e.removeListener("have",this._onWireHave),e.removeListener("bitfield",this._onWireBitfield),e._onClose&&e.removeListener("close",e._onClose),e._onClose=null}},{}],5:[function(e,t,n){(function(n,r){function o(e,t,n){m.call(this),this.client=t,this._debugId=this.client.peerId.toString("hex").substring(0,7),this._debug("new torrent"),this.announce=n.announce,this.urlList=n.urlList,this.path=n.path,this._store=n.store||v,this._getAnnounceOpts=n.getAnnounceOpts,this.strategy=n.strategy||"sequential",this.maxWebConns=n.maxWebConns||4,this._rechokeNumSlots=n.uploads===!1||0===n.uploads?0:+n.uploads||10,this._rechokeOptimisticWire=null,this._rechokeOptimisticTime=0,this._rechokeIntervalId=null,this.ready=!1,this.destroyed=!1,this.paused=!1,this.done=!1,this.metadata=null,this.store=null,this.files=[],this.pieces=[],this._amInterested=!1,this._selections=[],this._critical=[],this.wires=[],this._queue=[],this._peers={},this._peersLength=0,this.received=0,this.uploaded=0,this._downloadSpeed=P(),this._uploadSpeed=P(),this._servers=[],this._xsRequests=[],this._fileModtimes=n.fileModtimes,null!==e&&this._onTorrentId(e)}function i(e,t){return 2+Math.ceil(t*e.downloadSpeed()/C.BLOCK_LENGTH)}function s(e,t,n){return 1+Math.ceil(t*e.downloadSpeed()/n)}function a(e){return Math.random()*e|0}function u(){}t.exports=o;var c,f=e("addr-to-ip-port"),d=e("bitfield"),h=e("chunk-store-stream/write"),l=e("debug")("webtorrent:torrent"),p=e("torrent-discovery"),m=e("events").EventEmitter,g=e("xtend"),y=e("xtend/mutable"),_=e("fs"),v=e("fs-chunk-store"),b=e("simple-get"),w=e("immediate-chunk-store"),E=e("inherits"),k=e("multistream"),x=e("net"),S=e("os"),B=e("run-parallel"),I=e("run-parallel-limit"),A=e("parse-torrent"),T=e("path"),C=e("torrent-piece"),L=e("pump"),R=e("random-iterate"),U=e("simple-sha1"),P=e("speedometer"),O=e("uniq"),M=e("ut_metadata"),j=e("ut_pex"),H=e("./file"),D=e("./peer"),q=e("./rarity-map"),N=e("./server"),W=131072,z=3e4,F=5e3,Y=3*C.BLOCK_LENGTH,V=.5,G=1,$=1e4,K=2,X=2,J=[1e3,5e3,15e3],Q=e("../package.json").version;try{c=T.join(_.statSync("/tmp")&&"/tmp","webtorrent")}catch(e){c=T.join("function"==typeof S.tmpDir?S.tmpDir():"/","webtorrent")}E(o,m),Object.defineProperty(o.prototype,"timeRemaining",{get:function(){return this.done?0:0===this.downloadSpeed?1/0:(this.length-this.downloaded)/this.downloadSpeed*1e3}}),Object.defineProperty(o.prototype,"downloaded",{get:function(){if(!this.bitfield)return 0;for(var e=0,t=0,n=this.pieces.length;t<n;++t)if(this.bitfield.get(t))e+=t===n-1?this.lastPieceLength:this.pieceLength;else{var r=this.pieces[t];e+=r.length-r.missing}return e}}),Object.defineProperty(o.prototype,"downloadSpeed",{get:function(){return this._downloadSpeed()}}),Object.defineProperty(o.prototype,"uploadSpeed",{get:function(){return this._uploadSpeed()}}),Object.defineProperty(o.prototype,"progress",{get:function(){return this.length?this.downloaded/this.length:0}}),Object.defineProperty(o.prototype,"ratio",{get:function(){return this.uploaded/(this.received||1)}}),Object.defineProperty(o.prototype,"numPeers",{get:function(){return this.wires.length}}),Object.defineProperty(o.prototype,"torrentFileBlobURL",{get:function(){if("undefined"==typeof window)throw new Error("browser-only property");return this.torrentFile?URL.createObjectURL(new Blob([this.torrentFile],{type:"application/x-bittorrent"})):null}}),Object.defineProperty(o.prototype,"_numQueued",{get:function(){return this._queue.length+(this._peersLength-this._numConns)}}),Object.defineProperty(o.prototype,"_numConns",{get:function(){var e=this,t=0;for(var n in e._peers)e._peers[n].connected&&(t+=1);return t}}),Object.defineProperty(o.prototype,"swarm",{get:function(){return console.warn("WebTorrent: `torrent.swarm` is deprecated. Use `torrent` directly instead."),this}}),o.prototype._onTorrentId=function(e){var t=this;if(!t.destroyed){var r;try{r=A(e)}catch(e){}r?(t.infoHash=r.infoHash,n.nextTick(function(){t.destroyed||t._onParsedTorrent(r)})):A.remote(e,function(e,n){if(!t.destroyed)return e?t._destroy(e):void t._onParsedTorrent(n)})}},o.prototype._onParsedTorrent=function(e){var t=this;if(!t.destroyed){if(t._processParsedTorrent(e),!t.infoHash)return t._destroy(new Error("Malformed torrent data: No info hash"));t.path||(t.path=T.join(c,t.infoHash)),t._rechokeIntervalId=setInterval(function(){t._rechoke()},$),t._rechokeIntervalId.unref&&t._rechokeIntervalId.unref(),t.emit("_infoHash",t.infoHash),t.destroyed||(t.emit("infoHash",t.infoHash),t.destroyed||(t.client.listening?t._onListening():t.client.once("listening",function(){t._onListening()})))}},o.prototype._processParsedTorrent=function(e){this.announce&&(e.announce=e.announce.concat(this.announce)),this.client.tracker&&r.WEBTORRENT_ANNOUNCE&&!this.private&&(e.announce=e.announce.concat(r.WEBTORRENT_ANNOUNCE)),this.urlList&&(e.urlList=e.urlList.concat(this.urlList)),O(e.announce),O(e.urlList),y(this,e),this.magnetURI=A.toMagnetURI(e),this.torrentFile=A.toTorrentFile(e)},o.prototype._onListening=function(){function e(e){i._destroy(e)}function t(e){"string"==typeof e&&i.done||i.addPeer(e)}function n(){i.emit("trackerAnnounce"),0===i.numPeers&&i.emit("noPeers","tracker")}function r(){i.emit("dhtAnnounce"),0===i.numPeers&&i.emit("noPeers","dht")}function o(e){i.emit("warning",e)}var i=this;if(!i.discovery&&!i.destroyed){var s=i.client.tracker;s&&(s=g(i.client.tracker,{getAnnounceOpts:function(){var e={uploaded:i.uploaded,downloaded:i.downloaded,left:Math.max(i.length-i.downloaded,0)};return i.client.tracker.getAnnounceOpts&&y(e,i.client.tracker.getAnnounceOpts()),i._getAnnounceOpts&&y(e,i._getAnnounceOpts()),e}})),i.discovery=new p({infoHash:i.infoHash,announce:i.announce,peerId:i.client.peerId,dht:!i.private&&i.client.dht,tracker:s,port:i.client.torrentPort}),i.discovery.on("error",e),i.discovery.on("peer",t),i.discovery.on("trackerAnnounce",n),i.discovery.on("dhtAnnounce",r),i.discovery.on("warning",o),i.info?i._onMetadata(i):i.xs&&i._getMetadataFromServer()}},o.prototype._getMetadataFromServer=function(){function e(e,n){function r(r,o,i){if(t.destroyed)return n(null);if(t.metadata)return n(null);if(r)return t._debug("http error from xs param: %s",e),n(null);if(200!==o.statusCode)return t._debug("non-200 status code %s from xs param: %s",o.statusCode,e),n(null);var s;try{s=A(i)}catch(e){}return s?s.infoHash!==t.infoHash?(t._debug("got torrent file with incorrect info hash from xs param: %s",e),n(null)):(t._onMetadata(s),void n(null)):(t._debug("got invalid torrent file from xs param: %s",e),n(null))}if(0!==e.indexOf("http://")&&0!==e.indexOf("https://"))return t._debug("skipping non-http xs param: %s",e),n(null);var o,i={url:e,method:"GET",headers:{"user-agent":"WebTorrent/"+Q+" (https://webtorrent.io)"}};try{o=b.concat(i,r)}catch(r){return t._debug("skipping invalid url xs param: %s",e),n(null)}t._xsRequests.push(o)}var t=this,n=Array.isArray(t.xs)?t.xs:[t.xs],r=n.map(function(t){return function(n){e(t,n)}});B(r)},o.prototype._onMetadata=function(e){var t=this;if(!t.metadata&&!t.destroyed){t._debug("got metadata"),t._xsRequests.forEach(function(e){e.abort()}),t._xsRequests=[];var n;if(e&&e.infoHash)n=e;else try{n=A(e)}catch(e){return t._destroy(e)}t._processParsedTorrent(n),t.metadata=t.torrentFile,t.client.enableWebSeeds&&t.urlList.forEach(function(e){t.addWebSeed(e)}),0!==t.pieces.length&&t.select(0,t.pieces.length-1,!1),t._rarityMap=new q(t),t.store=new w(new t._store(t.pieceLength,{torrent:{infoHash:t.infoHash},files:t.files.map(function(e){return{path:T.join(t.path,e.path),length:e.length,offset:e.offset}}),length:t.length})),t.files=t.files.map(function(e){return new H(t,e)}),t._hashes=t.pieces,t.pieces=t.pieces.map(function(e,n){var r=n===t.pieces.length-1?t.lastPieceLength:t.pieceLength;return new C(r)}),t._reservations=t.pieces.map(function(){return[]}),t.bitfield=new d(t.pieces.length),t.wires.forEach(function(e){e.ut_metadata&&e.ut_metadata.setMetadata(t.metadata),t._onWireWithMetadata(e)}),t._debug("verifying existing torrent data"),t._fileModtimes&&t._store===v?t.getFileModtimes(function(e,n){if(e)return t._destroy(e);var r=t.files.map(function(e,r){return n[r]===t._fileModtimes[r]}).every(function(e){return e});if(r){for(var o=0;o<t.pieces.length;o++)t._markVerified(o);t._onStore()}else t._verifyPieces()}):t._verifyPieces(),t.emit("metadata")}},o.prototype.getFileModtimes=function(e){var t=this,n=[];I(t.files.map(function(e,r){return function(o){_.stat(T.join(t.path,e.path),function(e,t){return e&&"ENOENT"!==e.code?o(e):(n[r]=t&&t.mtime.getTime(),void o(null))})}}),X,function(r){t._debug("done getting file modtimes"),e(r,n)})},o.prototype._verifyPieces=function(){var e=this;I(e.pieces.map(function(t,r){return function(t){return e.destroyed?t(new Error("torrent is destroyed")):void e.store.get(r,function(o,i){return o?n.nextTick(t,null):void U(i,function(n){if(n===e._hashes[r]){if(!e.pieces[r])return;e._debug("piece verified %s",r),e._markVerified(r)}else e._debug("piece invalid %s",r);t(null)})})}}),X,function(t){return t?e._destroy(t):(e._debug("done verifying"),void e._onStore())})},o.prototype._markVerified=function(e){this.pieces[e]=null,this._reservations[e]=null,this.bitfield.set(e,!0)},o.prototype._onStore=function(){var e=this;e.destroyed||(e._debug("on store"),e.ready=!0,e.emit("ready"),e._checkDone(),e._updateSelections())},o.prototype.destroy=function(e){var t=this;t._destroy(null,e)},o.prototype._destroy=function(e,t){var n=this;if(!n.destroyed){n.destroyed=!0,n._debug("destroy"),n.client._remove(n),clearInterval(n._rechokeIntervalId),n._xsRequests.forEach(function(e){e.abort()}),n._rarityMap&&n._rarityMap.destroy();for(var r in n._peers)n.removePeer(r);n.files.forEach(function(e){e instanceof H&&e._destroy()});var o=n._servers.map(function(e){return function(t){e.destroy(t)}});n.discovery&&o.push(function(e){n.discovery.destroy(e)}),n.store&&o.push(function(e){n.store.close(e)}),B(o,t),e&&(0===n.listenerCount("error")?n.client.emit("error",e):n.emit("error",e)),n.emit("close"),n.client=null,n.files=[],n.discovery=null,n.store=null,n._rarityMap=null,n._peers=null,n._servers=null,n._xsRequests=null}},o.prototype.addPeer=function(e){var t=this;if(t.destroyed)throw new Error("torrent is destroyed");if(!t.infoHash)throw new Error("addPeer() must not be called before the `infoHash` event");if(t.client.blocked){var n;if("string"==typeof e){var r;try{r=f(e)}catch(n){return t._debug("ignoring peer: invalid %s",e),t.emit("invalidPeer",e),!1}n=r[0]}else"string"==typeof e.remoteAddress&&(n=e.remoteAddress);if(n&&t.client.blocked.contains(n))return t._debug("ignoring peer: blocked %s",e),"string"!=typeof e&&e.destroy(),t.emit("blockedPeer",e),!1}var o=!!t._addPeer(e);return o?t.emit("peer",e):t.emit("invalidPeer",e),o},o.prototype._addPeer=function(e){var t=this;if(t.destroyed)return t._debug("ignoring peer: torrent is destroyed"),"string"!=typeof e&&e.destroy(),null;if("string"==typeof e&&!t._validAddr(e))return t._debug("ignoring peer: invalid %s",e),null;var n=e&&e.id||e;if(t._peers[n])return t._debug("ignoring peer: duplicate (%s)",n),"string"!=typeof e&&e.destroy(),null;if(t.paused)return t._debug("ignoring peer: torrent is paused"),"string"!=typeof e&&e.destroy(),null;t._debug("add peer %s",n);var r;return r="string"==typeof e?D.createTCPOutgoingPeer(e,t):D.createWebRTCPeer(e,t),t._peers[r.id]=r,t._peersLength+=1,"string"==typeof e&&(t._queue.push(r),t._drain()),r},o.prototype.addWebSeed=function(e){if(this.destroyed)throw new Error("torrent is destroyed");if(!/^https?:\/\/.+/.test(e))return this._debug("ignoring invalid web seed %s",e),void this.emit("invalidPeer",e);if(this._peers[e])return this._debug("ignoring duplicate web seed %s",e),void this.emit("invalidPeer",e);this._debug("add web seed %s",e);var t=D.createWebSeedPeer(e,this);this._peers[t.id]=t,this._peersLength+=1,this.emit("peer",e)},o.prototype._addIncomingPeer=function(e){var t=this;return t.destroyed?e.destroy(new Error("torrent is destroyed")):t.paused?e.destroy(new Error("torrent is paused")):(this._debug("add incoming peer %s",e.id),t._peers[e.id]=e,void(t._peersLength+=1))},o.prototype.removePeer=function(e){var t=this,n=e&&e.id||e;e=t._peers[n],e&&(this._debug("removePeer %s",n),delete t._peers[n],t._peersLength-=1,e.destroy(),t._drain())},o.prototype.select=function(e,t,n,r){var o=this;if(o.destroyed)throw new Error("torrent is destroyed");if(e<0||t<e||o.pieces.length<=t)throw new Error("invalid selection ",e,":",t);n=Number(n)||0,o._debug("select %s-%s (priority %s)",e,t,n),o._selections.push({from:e,to:t,offset:0,priority:n,notify:r||u}),o._selections.sort(function(e,t){return t.priority-e.priority}),o._updateSelections()},o.prototype.deselect=function(e,t,n){var r=this;if(r.destroyed)throw new Error("torrent is destroyed");n=Number(n)||0,r._debug("deselect %s-%s (priority %s)",e,t,n);for(var o=0;o<r._selections.length;++o){var i=r._selections[o];if(i.from===e&&i.to===t&&i.priority===n){r._selections.splice(o--,1);break}}r._updateSelections()},o.prototype.critical=function(e,t){var n=this;if(n.destroyed)throw new Error("torrent is destroyed");n._debug("critical %s-%s",e,t);for(var r=e;r<=t;++r)n._critical[r]=!0;n._updateSelections()},o.prototype._onWire=function(e,t){var r=this;if(r._debug("got wire %s (%s)",e._debugId,t||"Unknown"),e.on("download",function(e){r.destroyed||(r.received+=e,r._downloadSpeed(e),r.client._downloadSpeed(e),r.emit("download",e),r.client.emit("download",e))}),e.on("upload",function(e){r.destroyed||(r.uploaded+=e,r._uploadSpeed(e),r.client._uploadSpeed(e),r.emit("upload",e),r.client.emit("upload",e))}),r.wires.push(e),t){var o=f(t);e.remoteAddress=o[0],e.remotePort=o[1]}r.client.dht&&r.client.dht.listening&&e.on("port",function(n){if(!r.destroyed&&!r.client.dht.destroyed){if(!e.remoteAddress)return r._debug("ignoring PORT from peer with no address");if(0===n||n>65536)return r._debug("ignoring invalid PORT from peer");r._debug("port: %s (from %s)",n,t),r.client.dht.addNode({host:e.remoteAddress,port:n})}}),e.on("timeout",function(){r._debug("wire timeout (%s)",t),e.destroy()}),e.setTimeout(z,!0),e.setKeepAlive(!0),e.use(M(r.metadata)),e.ut_metadata.on("warning",function(e){r._debug("ut_metadata warning: %s",e.message)}),r.metadata||(e.ut_metadata.on("metadata",function(e){r._debug("got metadata via ut_metadata"),r._onMetadata(e)}),e.ut_metadata.fetch()),"function"!=typeof j||r.private||(e.use(j()),e.ut_pex.on("peer",function(e){r.done||(r._debug("ut_pex: got peer: %s (from %s)",e,t),r.addPeer(e))}),e.ut_pex.on("dropped",function(e){var n=r._peers[e];n&&!n.connected&&(r._debug("ut_pex: dropped peer: %s (from %s)",e,t),r.removePeer(e))}),e.once("close",function(){e.ut_pex.reset()})),r.emit("wire",e,t),r.metadata&&n.nextTick(function(){r._onWireWithMetadata(e)})},o.prototype._onWireWithMetadata=function(e){function t(){r.destroyed||e.destroyed||(r._numQueued>2*(r._numConns-r.numPeers)&&e.amInterested?e.destroy():(o=setTimeout(t,F),o.unref&&o.unref()))}function n(){if(e.peerPieces.length===r.pieces.length){for(;i<r.pieces.length;++i)if(!e.peerPieces.get(i))return;e.isSeeder=!0,e.choke()}}var r=this,o=null,i=0;e.on("bitfield",function(){n(),r._update()}),e.on("have",function(){n(),r._update()}),e.once("interested",function(){e.unchoke()}),e.once("close",function(){clearTimeout(o)}),e.on("choke",function(){clearTimeout(o),o=setTimeout(t,F),o.unref&&o.unref()}),e.on("unchoke",function(){clearTimeout(o),r._update()}),e.on("request",function(t,n,o,i){return o>W?e.destroy():void(r.pieces[t]||r.store.get(t,{offset:n,length:o},i))}),e.bitfield(r.bitfield),e.interested(),e.peerExtensions.dht&&r.client.dht&&r.client.dht.listening&&e.port(r.client.dht.address().port),o=setTimeout(t,F),o.unref&&o.unref(),e.isSeeder=!1,n()},o.prototype._updateSelections=function(){var e=this;e.ready&&!e.destroyed&&(n.nextTick(function(){e._gcSelections()}),e._updateInterest(),e._update())},o.prototype._gcSelections=function(){for(var e=this,t=0;t<e._selections.length;t++){for(var n=e._selections[t],r=n.offset;e.bitfield.get(n.from+n.offset)&&n.from+n.offset<n.to;)n.offset++;r!==n.offset&&n.notify(),n.to===n.from+n.offset&&e.bitfield.get(n.from+n.offset)&&(e._selections.splice(t--,1),n.notify(),e._updateInterest())}e._selections.length||e.emit("idle")},o.prototype._updateInterest=function(){var e=this,t=e._amInterested;e._amInterested=!!e._selections.length,e.wires.forEach(function(t){e._amInterested?t.interested():t.uninterested()}),t!==e._amInterested&&(e._amInterested?e.emit("interested"):e.emit("uninterested"))},o.prototype._update=function(){var e=this;if(!e.destroyed)for(var t,n=R(e.wires);t=n();)e._updateWire(t)},o.prototype._updateWire=function(e){function t(t,n,r,o){return function(i){return i>=t&&i<=n&&!(i in r)&&e.peerPieces.get(i)&&(!o||o(i))}}function n(){if(!e.requests.length)for(var n=a._selections.length;n--;){var r,o=a._selections[n];if("rarest"===a.strategy)for(var i=o.from+o.offset,s=o.to,u=s-i+1,c={},f=0,d=t(i,s,c);f<u&&(r=a._rarityMap.getRarestPiece(d),!(r<0));){if(a._request(e,r,!1))return;c[r]=!0,f+=1}else for(r=o.to;r>=o.from+o.offset;--r)if(e.peerPieces.get(r)&&a._request(e,r,!1))return}}function r(){var t=e.downloadSpeed()||1;if(t>Y)return function(){return!0};var n=Math.max(1,e.requests.length)*C.BLOCK_LENGTH/t,r=10,o=0;return function(e){if(!r||a.bitfield.get(e))return!0;for(var i=a.pieces[e].missing;o<a.wires.length;o++){var s=a.wires[o],u=s.downloadSpeed();if(!(u<Y)&&!(u<=t)&&s.peerPieces.get(e)&&!((i-=u*n)>0))return r--,!1}return!0}}function o(e){for(var t=e,n=e;n<a._selections.length&&a._selections[n].priority;n++)t=n;var r=a._selections[e];a._selections[e]=a._selections[t],a._selections[t]=r}function s(n){if(e.requests.length>=c)return!0;for(var i=r(),s=0;s<a._selections.length;s++){var u,f=a._selections[s];if("rarest"===a.strategy)for(var d=f.from+f.offset,h=f.to,l=h-d+1,p={},m=0,g=t(d,h,p,i);m<l&&(u=a._rarityMap.getRarestPiece(g),!(u<0));){for(;a._request(e,u,a._critical[u]||n););if(!(e.requests.length<c))return f.priority&&o(s),!0;p[u]=!0,m++}else for(u=f.from+f.offset;u<=f.to;u++)if(e.peerPieces.get(u)&&i(u)){for(;a._request(e,u,a._critical[u]||n););if(!(e.requests.length<c))return f.priority&&o(s),!0}}return!1}var a=this;if(!e.peerChoking){if(!e.downloaded)return n();var u=i(e,V);if(!(e.requests.length>=u)){var c=i(e,G);s(!1)||s(!0)}}},o.prototype._rechoke=function(){function e(e,t){return e.downloadSpeed!==t.downloadSpeed?t.downloadSpeed-e.downloadSpeed:e.uploadSpeed!==t.uploadSpeed?t.uploadSpeed-e.uploadSpeed:e.wire.amChoking!==t.wire.amChoking?e.wire.amChoking?1:-1:e.salt-t.salt}var t=this;if(t.ready){t._rechokeOptimisticTime>0?t._rechokeOptimisticTime-=1:t._rechokeOptimisticWire=null;var n=[];t.wires.forEach(function(e){e.isSeeder||e===t._rechokeOptimisticWire||n.push({wire:e,downloadSpeed:e.downloadSpeed(),uploadSpeed:e.uploadSpeed(),salt:Math.random(),isChoked:!0})}),n.sort(e);for(var r=0,o=0;o<n.length&&r<t._rechokeNumSlots;++o)n[o].isChoked=!1,n[o].wire.peerInterested&&(r+=1);if(!t._rechokeOptimisticWire&&o<n.length&&t._rechokeNumSlots){var i=n.slice(o).filter(function(e){return e.wire.peerInterested}),s=i[a(i.length)];s&&(s.isChoked=!1,t._rechokeOptimisticWire=s.wire,t._rechokeOptimisticTime=K)}n.forEach(function(e){e.wire.amChoking!==e.isChoked&&(e.isChoked?e.wire.choke():e.wire.unchoke())})}},o.prototype._hotswap=function(e,t){var n=this,r=e.downloadSpeed();if(r<C.BLOCK_LENGTH)return!1;if(!n._reservations[t])return!1;var o=n._reservations[t];if(!o)return!1;var i,s,a=1/0;for(s=0;s<o.length;s++){var u=o[s];if(u&&u!==e){var c=u.downloadSpeed();c>=Y||2*c>r||c>a||(i=u,a=c)}}if(!i)return!1;for(s=0;s<o.length;s++)o[s]===i&&(o[s]=null);for(s=0;s<i.requests.length;s++){var f=i.requests[s];f.piece===t&&n.pieces[t].cancel(f.offset/C.BLOCK_LENGTH|0)}return n.emit("hotswap",i,e,t),!0},o.prototype._request=function(e,t,r){function o(){n.nextTick(function(){a._update()})}var a=this,u=e.requests.length,c="webSeed"===e.type;if(a.bitfield.get(t))return!1;var f=c?Math.min(s(e,G,a.pieceLength),a.maxWebConns):i(e,G);if(u>=f)return!1;var d=a.pieces[t],h=c?d.reserveRemaining():d.reserve();if(h===-1&&r&&a._hotswap(e,t)&&(h=c?d.reserveRemaining():d.reserve()),h===-1)return!1;var l=a._reservations[t];l||(l=a._reservations[t]=[]);var p=l.indexOf(null);p===-1&&(p=l.length),l[p]=e;var m=d.chunkOffset(h),g=c?d.chunkLengthRemaining(h):d.chunkLength(h);return e.request(t,m,g,function n(r,i){if(!a.ready)return a.once("ready",function(){n(r,i)});if(l[p]===e&&(l[p]=null),d!==a.pieces[t])return o();if(r)return a._debug("error getting piece %s (offset: %s length: %s) from %s: %s",t,m,g,e.remoteAddress+":"+e.remotePort,r.message),c?d.cancelRemaining(h):d.cancel(h),void o();if(a._debug("got piece %s (offset: %s length: %s) from %s",t,m,g,e.remoteAddress+":"+e.remotePort),!d.set(h,i,e))return o();var s=d.flush();U(s,function(e){if(e===a._hashes[t]){if(!a.pieces[t])return;a._debug("piece verified %s",t),a.pieces[t]=null,a._reservations[t]=null,a.bitfield.set(t,!0),a.store.put(t,s),a.wires.forEach(function(e){e.have(t)}),a._checkDone()}else a.pieces[t]=new C(d.length),a.emit("warning",new Error("Piece "+t+" failed verification"));o()})}),!0},o.prototype._checkDone=function(){var e=this;if(!e.destroyed){e.files.forEach(function(t){if(!t.done){for(var n=t._startPiece;n<=t._endPiece;++n)if(!e.bitfield.get(n))return;t.done=!0,t.emit("done"),e._debug("file done: "+t.name)}});for(var t=!0,n=0;n<e._selections.length;n++){for(var r=e._selections[n],o=r.from;o<=r.to;o++)if(!e.bitfield.get(o)){t=!1;break}if(!t)break}!e.done&&t&&(e.done=!0,e._debug("torrent done: "+e.infoHash),e.discovery.complete(),e.emit("done")),e._gcSelections()}},o.prototype.load=function(e,t){var n=this;if(n.destroyed)throw new Error("torrent is destroyed");if(!n.ready)return n.once("ready",function(){n.load(e,t)});Array.isArray(e)||(e=[e]),t||(t=u);var r=new k(e),o=new h(n.store,n.pieceLength);L(r,o,function(e){return e?t(e):(n.pieces.forEach(function(e,t){n.pieces[t]=null,n._reservations[t]=null,n.bitfield.set(t,!0)}),n._checkDone(),void t(null))})},o.prototype.createServer=function(e){if("function"!=typeof N)throw new Error("node.js-only method");if(this.destroyed)throw new Error("torrent is destroyed");var t=new N(this,e);return this._servers.push(t),t},o.prototype.pause=function(){this.destroyed||(this._debug("pause"),this.paused=!0)},o.prototype.resume=function(){this.destroyed||(this._debug("resume"),this.paused=!1,this._drain())},o.prototype._debug=function(){var e=[].slice.call(arguments);e[0]="["+this._debugId+"] "+e[0],l.apply(null,e)},o.prototype._drain=function(){var e=this;if(this._debug("_drain numConns %s maxConns %s",e._numConns,e.client.maxConns),!("function"!=typeof x.connect||e.destroyed||e.paused||e._numConns>=e.client.maxConns)){this._debug("drain (%s queued, %s/%s peers)",e._numQueued,e.numPeers,e.client.maxConns);var t=e._queue.shift();if(t){this._debug("tcp connect attempt to %s",t.addr);
var n=f(t.addr),r={host:n[0],port:n[1]},o=t.conn=x.connect(r);o.once("connect",function(){t.onConnect()}),o.once("error",function(e){t.destroy(e)}),t.startConnectTimeout(),o.on("close",function(){if(!e.destroyed){if(t.retries>=J.length)return void e._debug("conn %s closed: will not re-add (max %s attempts)",t.addr,J.length);var n=J[t.retries];e._debug("conn %s closed: will re-add to queue in %sms (attempt %s)",t.addr,n,t.retries+1);var r=setTimeout(function(){var n=e._addPeer(t.addr);n&&(n.retries=t.retries+1)},n);r.unref&&r.unref()}})}}},o.prototype._validAddr=function(e){var t;try{t=f(e)}catch(e){return!1}var n=t[0],r=t[1];return r>0&&r<65535&&!("127.0.0.1"===n&&r===this.client.torrentPort)}}).call(this,e("_process"),"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../package.json":122,"./file":2,"./peer":3,"./rarity-map":4,"./server":21,_process:67,"addr-to-ip-port":7,bitfield:13,"chunk-store-stream/write":26,debug:30,events:35,fs:22,"fs-chunk-store":51,"immediate-chunk-store":41,inherits:42,multistream:59,net:21,os:21,"parse-torrent":63,path:64,pump:68,"random-iterate":73,"run-parallel":86,"run-parallel-limit":85,"simple-get":90,"simple-sha1":92,speedometer:94,"torrent-discovery":106,"torrent-piece":107,uniq:110,ut_metadata:114,ut_pex:21,xtend:119,"xtend/mutable":120}],6:[function(e,t,n){function r(e,t){f.call(this),this.url=e,this.webPeerId=c.sync(e),this._torrent=t,this._init()}t.exports=r;var o=e("bitfield"),i=e("safe-buffer").Buffer,s=e("debug")("webtorrent:webconn"),a=e("simple-get"),u=e("inherits"),c=e("simple-sha1"),f=e("bittorrent-protocol"),d=e("../package.json").version;u(r,f),r.prototype._init=function(){var e=this;e.setKeepAlive(!0),e.once("handshake",function(t,n){if(!e.destroyed){e.handshake(t,e.webPeerId);for(var r=e._torrent.pieces.length,i=new o(r),s=0;s<=r;s++)i.set(s,!0);e.bitfield(i)}}),e.once("interested",function(){s("interested"),e.unchoke()}),e.on("uninterested",function(){s("uninterested")}),e.on("choke",function(){s("choke")}),e.on("unchoke",function(){s("unchoke")}),e.on("bitfield",function(){s("bitfield")}),e.on("request",function(t,n,r,o){s("request pieceIndex=%d offset=%d length=%d",t,n,r),e.httpRequest(t,n,r,o)})},r.prototype.httpRequest=function(e,t,n,r){var o,u=this,c=e*u._torrent.pieceLength,f=c+t,h=f+n-1,l=u._torrent.files;if(l.length<=1)o=[{url:u.url,start:f,end:h}];else{var p=l.filter(function(e){return e.offset<=h&&e.offset+e.length>f});if(p.length<1)return r(new Error("Could not find file corresponnding to web seed range request"));o=p.map(function(e){var t=e.offset+e.length-1,n=u.url+("/"===u.url[u.url.length-1]?"":"/")+e.path;return{url:n,fileOffsetInRange:Math.max(e.offset-f,0),start:Math.max(f-e.offset,0),end:Math.min(t,h-e.offset)}})}var m,g=0,y=!1;o.length>1&&(m=i.alloc(n)),o.forEach(function(i){var u=i.url,c=i.start,f=i.end;s("Requesting url=%s pieceIndex=%d offset=%d length=%d start=%d end=%d",u,e,t,n,c,f);var h={url:u,method:"GET",headers:{"user-agent":"WebTorrent/"+d+" (https://webtorrent.io)",range:"bytes="+c+"-"+f}};a.concat(h,function(e,t,n){if(!y){if(e)return y=!0,r(e);if(t.statusCode<200||t.statusCode>=300)return y=!0,r(new Error("Unexpected HTTP status code "+t.statusCode));s("Got data of length %d",n.length),1===o.length?r(null,n):(n.copy(m,i.fileOffsetInRange),++g===o.length&&r(null,m))}})})},r.prototype.destroy=function(){f.prototype.destroy.call(this),this._torrent=null}},{"../package.json":122,bitfield:13,"bittorrent-protocol":14,debug:30,inherits:42,"safe-buffer":88,"simple-get":90,"simple-sha1":92}],7:[function(e,t,n){var r=/^\[?([^\]]+)\]?:(\d+)$/,o={},i=0;t.exports=function(e){if(1e5===i&&t.exports.reset(),!o[e]){var n=r.exec(e);if(!n)throw new Error("invalid addr: "+e);o[e]=[n[1],Number(n[2])],i+=1}return o[e]},t.exports.reset=function(){o={},i=0}},{}],8:[function(e,t,n){"use strict";function r(e){var t=e.length;if(t%4>0)throw new Error("Invalid string. Length must be a multiple of 4");return"="===e[t-2]?2:"="===e[t-1]?1:0}function o(e){return 3*e.length/4-r(e)}function i(e){var t,n,o,i,s,a,u=e.length;s=r(e),a=new d(3*u/4-s),o=s>0?u-4:u;var c=0;for(t=0,n=0;t<o;t+=4,n+=3)i=f[e.charCodeAt(t)]<<18|f[e.charCodeAt(t+1)]<<12|f[e.charCodeAt(t+2)]<<6|f[e.charCodeAt(t+3)],a[c++]=i>>16&255,a[c++]=i>>8&255,a[c++]=255&i;return 2===s?(i=f[e.charCodeAt(t)]<<2|f[e.charCodeAt(t+1)]>>4,a[c++]=255&i):1===s&&(i=f[e.charCodeAt(t)]<<10|f[e.charCodeAt(t+1)]<<4|f[e.charCodeAt(t+2)]>>2,a[c++]=i>>8&255,a[c++]=255&i),a}function s(e){return c[e>>18&63]+c[e>>12&63]+c[e>>6&63]+c[63&e]}function a(e,t,n){for(var r,o=[],i=t;i<n;i+=3)r=(e[i]<<16)+(e[i+1]<<8)+e[i+2],o.push(s(r));return o.join("")}function u(e){for(var t,n=e.length,r=n%3,o="",i=[],s=16383,u=0,f=n-r;u<f;u+=s)i.push(a(e,u,u+s>f?f:u+s));return 1===r?(t=e[n-1],o+=c[t>>2],o+=c[t<<4&63],o+="=="):2===r&&(t=(e[n-2]<<8)+e[n-1],o+=c[t>>10],o+=c[t>>4&63],o+=c[t<<2&63],o+="="),i.push(o),i.join("")}n.byteLength=o,n.toByteArray=i,n.fromByteArray=u;for(var c=[],f=[],d="undefined"!=typeof Uint8Array?Uint8Array:Array,h="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",l=0,p=h.length;l<p;++l)c[l]=h[l],f[h.charCodeAt(l)]=l;f["-".charCodeAt(0)]=62,f["_".charCodeAt(0)]=63},{}],9:[function(e,t,n){(function(e){function n(t,r,o,i){return"number"!=typeof r&&null==i&&(i=r,r=void 0),"number"!=typeof o&&null==i&&(i=o,o=void 0),n.position=0,n.encoding=i||null,n.data=e.isBuffer(t)?t.slice(r,o):new e(t),n.bytes=n.data.length,n.next()}n.bytes=0,n.position=0,n.data=null,n.encoding=null,n.next=function(){switch(n.data[n.position]){case 100:return n.dictionary();case 108:return n.list();case 105:return n.integer();default:return n.buffer()}},n.find=function(e){for(var t=n.position,r=n.data.length,o=n.data;t<r;){if(o[t]===e)return t;t++}throw new Error('Invalid data: Missing delimiter "'+String.fromCharCode(e)+'" [0x'+e.toString(16)+"]")},n.dictionary=function(){n.position++;for(var e={};101!==n.data[n.position];)e[n.buffer()]=n.next();return n.position++,e},n.list=function(){n.position++;for(var e=[];101!==n.data[n.position];)e.push(n.next());return n.position++,e},n.integer=function(){var e=n.find(101),t=n.data.toString("ascii",n.position+1,e);return n.position+=e+1-n.position,parseInt(t,10)},n.buffer=function(){var e=n.find(58),t=parseInt(n.data.toString("ascii",n.position,e),10),r=++e+t;return n.position=r,n.encoding?n.data.toString(n.encoding,e,r):n.data.slice(e,r)},t.exports=n}).call(this,e("buffer").Buffer)},{buffer:24}],10:[function(e,t,n){(function(e){function n(t,r,o){var i=[],s=null;return n._encode(i,t),s=e.concat(i),n.bytes=s.length,e.isBuffer(r)?(s.copy(r,o),r):s}n.bytes=-1,n._floatConversionDetected=!1,n._encode=function(t,r){if(e.isBuffer(r))return t.push(new e(r.length+":")),void t.push(r);switch(typeof r){case"string":n.buffer(t,r);break;case"number":n.number(t,r);break;case"object":r.constructor===Array?n.list(t,r):n.dict(t,r);break;case"boolean":n.number(t,r?1:0)}};var r=new e("e"),o=new e("d"),i=new e("l");n.buffer=function(t,n){t.push(new e(e.byteLength(n)+":"+n))},n.number=function(t,r){var o=2147483648,i=r/o<<0,s=r%o<<0,a=i*o+s;t.push(new e("i"+a+"e")),a===r||n._floatConversionDetected||(n._floatConversionDetected=!0,console.warn('WARNING: Possible data corruption detected with value "'+r+'":','Bencoding only defines support for integers, value was converted to "'+a+'"'),console.trace())},n.dict=function(e,t){e.push(o);for(var i,s=0,a=Object.keys(t).sort(),u=a.length;s<u;s++)i=a[s],n.buffer(e,i),n._encode(e,t[i]);e.push(r)},n.list=function(e,t){var o=0,s=t.length;for(e.push(i);o<s;o++)n._encode(e,t[o]);e.push(r)},t.exports=n}).call(this,e("buffer").Buffer)},{buffer:24}],11:[function(e,t,n){var r=t.exports;r.encode=e("./encode"),r.decode=e("./decode"),r.byteLength=r.encodingLength=function(e){return r.encode(e).length}},{"./decode":9,"./encode":10}],12:[function(e,t,n){t.exports=function(e,t,n,r,o){var i,s;if(void 0===r)r=0;else if(r=0|r,r<0||r>=e.length)throw new RangeError("invalid lower bound");if(void 0===o)o=e.length-1;else if(o=0|o,o<r||o>=e.length)throw new RangeError("invalid upper bound");for(;r<=o;)if(i=r+(o-r>>1),s=+n(e[i],t,i,e),s<0)r=i+1;else{if(!(s>0))return i;o=i-1}return~r}},{}],13:[function(e,t,n){(function(e){function n(e,t){return this instanceof n?(0===arguments.length&&(e=0),this.grow=t&&(isFinite(t.grow)&&r(t.grow)||t.grow)||0,"number"!=typeof e&&void 0!==e||(e=new o(r(e)),e.fill&&!e._isBuffer&&e.fill(0)),void(this.buffer=e)):new n(e,t)}function r(e){var t=e>>3;return e%8!==0&&t++,t}var o="undefined"!=typeof e?e:"undefined"!=typeof Int8Array?Int8Array:function(e){for(var t=new Array(e),n=0;n<e;n++)t[n]=0};n.prototype.get=function(e){var t=e>>3;return t<this.buffer.length&&!!(this.buffer[t]&128>>e%8)},n.prototype.set=function(e,t){var n=e>>3;t||1===arguments.length?(this.buffer.length<n+1&&this._grow(Math.max(n+1,Math.min(2*this.buffer.length,this.grow))),this.buffer[n]|=128>>e%8):n<this.buffer.length&&(this.buffer[n]&=~(128>>e%8))},n.prototype._grow=function(e){if(this.buffer.length<e&&e<=this.grow){var t=new o(e);if(t.fill&&t.fill(0),this.buffer.copy)this.buffer.copy(t,0);else for(var n=0;n<this.buffer.length;n++)t[n]=this.buffer[n];this.buffer=t}},"undefined"!=typeof t&&(t.exports=n)}).call(this,e("buffer").Buffer)},{buffer:24}],14:[function(e,t,n){function r(e,t,n,r){this.piece=e,this.offset=t,this.length=n,this.callback=r}function o(){return this instanceof o?(p.Duplex.call(this),this._debugId=h(4).toString("hex"),this._debug("new wire"),this.peerId=null,this.peerIdBuffer=null,this.type=null,this.amChoking=!0,this.amInterested=!1,this.peerChoking=!0,this.peerInterested=!1,this.peerPieces=new a(0,{grow:m}),this.peerExtensions={},this.requests=[],this.peerRequests=[],this.extendedMapping={},this.peerExtendedMapping={},this.extendedHandshake={},this.peerExtendedHandshake={},this._ext={},this._nextExt=1,this.uploaded=0,this.downloaded=0,this.uploadSpeed=l(),this.downloadSpeed=l(),this._keepAliveInterval=null,this._timeout=null,this._timeoutMs=0,this.destroyed=!1,this._finished=!1,this._parserSize=0,this._parser=null,this._buffer=[],this._bufferSize=0,this.on("finish",this._onFinish),void this._parseHandshake()):new o}function i(e,t,n,r){for(var o=0;o<e.length;o++){var i=e[o];if(i.piece===t&&i.offset===n&&i.length===r)return 0===o?e.shift():e.splice(o,1),i}return null}t.exports=o;var s=e("bencode"),a=e("bitfield"),u=e("safe-buffer").Buffer,c=e("debug")("bittorrent-protocol"),f=e("xtend"),d=e("inherits"),h=e("randombytes"),l=e("speedometer"),p=e("readable-stream"),m=4e5,g=55e3,y=u.from("BitTorrent protocol"),_=u.from([0,0,0,0]),v=u.from([0,0,0,1,0]),b=u.from([0,0,0,1,1]),w=u.from([0,0,0,1,2]),E=u.from([0,0,0,1,3]),k=[0,0,0,0,0,0,0,0],x=[0,0,0,3,9,0,0];d(o,p.Duplex),o.prototype.setKeepAlive=function(e){var t=this;t._debug("setKeepAlive %s",e),clearInterval(t._keepAliveInterval),e!==!1&&(t._keepAliveInterval=setInterval(function(){t.keepAlive()},g))},o.prototype.setTimeout=function(e,t){this._debug("setTimeout ms=%d unref=%s",e,t),this._clearTimeout(),this._timeoutMs=e,this._timeoutUnref=!!t,this._updateTimeout()},o.prototype.destroy=function(){this.destroyed||(this.destroyed=!0,this._debug("destroy"),this.emit("close"),this.end())},o.prototype.end=function(){this._debug("end"),this._onUninterested(),this._onChoke(),p.Duplex.prototype.end.apply(this,arguments)},o.prototype.use=function(e){function t(){}var n=e.prototype.name;if(!n)throw new Error('Extension class requires a "name" property on the prototype');this._debug("use extension.name=%s",n);var r=this._nextExt,o=new e(this);"function"!=typeof o.onHandshake&&(o.onHandshake=t),"function"!=typeof o.onExtendedHandshake&&(o.onExtendedHandshake=t),"function"!=typeof o.onMessage&&(o.onMessage=t),this.extendedMapping[r]=n,this._ext[n]=o,this[n]=o,this._nextExt+=1},o.prototype.keepAlive=function(){this._debug("keep-alive"),this._push(_)},o.prototype.handshake=function(e,t,n){var r,o;if("string"==typeof e?r=u.from(e,"hex"):(r=e,e=r.toString("hex")),"string"==typeof t?o=u.from(t,"hex"):(o=t,t=o.toString("hex")),20!==r.length||20!==o.length)throw new Error("infoHash and peerId MUST have length 20");this._debug("handshake i=%s p=%s exts=%o",e,t,n);var i=u.from(k);i[5]|=16,n&&n.dht&&(i[7]|=1),this._push(u.concat([y,i,r,o])),this._handshakeSent=!0,this.peerExtensions.extended&&!this._extendedHandshakeSent&&this._sendExtendedHandshake()},o.prototype._sendExtendedHandshake=function(){var e=f(this.extendedHandshake);e.m={};for(var t in this.extendedMapping){var n=this.extendedMapping[t];e.m[n]=Number(t)}this.extended(0,s.encode(e)),this._extendedHandshakeSent=!0},o.prototype.choke=function(){this.amChoking||(this.amChoking=!0,this._debug("choke"),this.peerRequests.splice(0,this.peerRequests.length),this._push(v))},o.prototype.unchoke=function(){this.amChoking&&(this.amChoking=!1,this._debug("unchoke"),this._push(b))},o.prototype.interested=function(){this.amInterested||(this.amInterested=!0,this._debug("interested"),this._push(w))},o.prototype.uninterested=function(){this.amInterested&&(this.amInterested=!1,this._debug("uninterested"),this._push(E))},o.prototype.have=function(e){this._debug("have %d",e),this._message(4,[e],null)},o.prototype.bitfield=function(e){this._debug("bitfield"),u.isBuffer(e)||(e=e.buffer),this._message(5,[],e)},o.prototype.request=function(e,t,n,o){return o||(o=function(){}),this._finished?o(new Error("wire is closed")):this.peerChoking?o(new Error("peer is choking")):(this._debug("request index=%d offset=%d length=%d",e,t,n),this.requests.push(new r(e,t,n,o)),this._updateTimeout(),void this._message(6,[e,t,n],null))},o.prototype.piece=function(e,t,n){this._debug("piece index=%d offset=%d",e,t),this.uploaded+=n.length,this.uploadSpeed(n.length),this.emit("upload",n.length),this._message(7,[e,t],n)},o.prototype.cancel=function(e,t,n){this._debug("cancel index=%d offset=%d length=%d",e,t,n),this._callback(i(this.requests,e,t,n),new Error("request was cancelled"),null),this._message(8,[e,t,n],null)},o.prototype.port=function(e){this._debug("port %d",e);var t=u.from(x);t.writeUInt16BE(e,5),this._push(t)},o.prototype.extended=function(e,t){if(this._debug("extended ext=%s",e),"string"==typeof e&&this.peerExtendedMapping[e]&&(e=this.peerExtendedMapping[e]),"number"!=typeof e)throw new Error("Unrecognized extension: "+e);var n=u.from([e]),r=u.isBuffer(t)?t:s.encode(t);this._message(20,[],u.concat([n,r]))},o.prototype._read=function(){},o.prototype._message=function(e,t,n){var r=n?n.length:0,o=u.allocUnsafe(5+4*t.length);o.writeUInt32BE(o.length+r-4,0),o[4]=e;for(var i=0;i<t.length;i++)o.writeUInt32BE(t[i],5+4*i);this._push(o),n&&this._push(n)},o.prototype._push=function(e){if(!this._finished)return this.push(e)},o.prototype._onKeepAlive=function(){this._debug("got keep-alive"),this.emit("keep-alive")},o.prototype._onHandshake=function(e,t,n){var r=e.toString("hex"),o=t.toString("hex");this._debug("got handshake i=%s p=%s exts=%o",r,o,n),this.peerId=o,this.peerIdBuffer=t,this.peerExtensions=n,this.emit("handshake",r,o,n);var i;for(i in this._ext)this._ext[i].onHandshake(r,o,n);n.extended&&this._handshakeSent&&!this._extendedHandshakeSent&&this._sendExtendedHandshake()},o.prototype._onChoke=function(){for(this.peerChoking=!0,this._debug("got choke"),this.emit("choke");this.requests.length;)this._callback(this.requests.shift(),new Error("peer is choking"),null)},o.prototype._onUnchoke=function(){this.peerChoking=!1,this._debug("got unchoke"),this.emit("unchoke")},o.prototype._onInterested=function(){this.peerInterested=!0,this._debug("got interested"),this.emit("interested")},o.prototype._onUninterested=function(){this.peerInterested=!1,this._debug("got uninterested"),this.emit("uninterested")},o.prototype._onHave=function(e){this.peerPieces.get(e)||(this._debug("got have %d",e),this.peerPieces.set(e,!0),this.emit("have",e))},o.prototype._onBitField=function(e){this.peerPieces=new a(e),this._debug("got bitfield"),this.emit("bitfield",this.peerPieces)},o.prototype._onRequest=function(e,t,n){var o=this;if(!o.amChoking){o._debug("got request index=%d offset=%d length=%d",e,t,n);var s=function(r,s){if(a===i(o.peerRequests,e,t,n))return r?o._debug("error satisfying request index=%d offset=%d length=%d (%s)",e,t,n,r.message):void o.piece(e,t,s)},a=new r(e,t,n,s);o.peerRequests.push(a),o.emit("request",e,t,n,s)}},o.prototype._onPiece=function(e,t,n){this._debug("got piece index=%d offset=%d",e,t),this._callback(i(this.requests,e,t,n.length),null,n),this.downloaded+=n.length,this.downloadSpeed(n.length),this.emit("download",n.length),this.emit("piece",e,t,n)},o.prototype._onCancel=function(e,t,n){this._debug("got cancel index=%d offset=%d length=%d",e,t,n),i(this.peerRequests,e,t,n),this.emit("cancel",e,t,n)},o.prototype._onPort=function(e){this._debug("got port %d",e),this.emit("port",e)},o.prototype._onExtended=function(e,t){if(0===e){var n;try{n=s.decode(t)}catch(e){this._debug("ignoring invalid extended handshake: %s",e.message||e)}if(!n)return;this.peerExtendedHandshake=n;var r;if("object"==typeof n.m)for(r in n.m)this.peerExtendedMapping[r]=Number(n.m[r].toString());for(r in this._ext)this.peerExtendedMapping[r]&&this._ext[r].onExtendedHandshake(this.peerExtendedHandshake);this._debug("got extended handshake"),this.emit("extended","handshake",this.peerExtendedHandshake)}else this.extendedMapping[e]&&(e=this.extendedMapping[e],this._ext[e]&&this._ext[e].onMessage(t)),this._debug("got extended message ext=%s",e),this.emit("extended",e,t)},o.prototype._onTimeout=function(){this._debug("request timed out"),this._callback(this.requests.shift(),new Error("request has timed out"),null),this.emit("timeout")},o.prototype._write=function(e,t,n){for(this._bufferSize+=e.length,this._buffer.push(e);this._bufferSize>=this._parserSize;){var r=1===this._buffer.length?this._buffer[0]:u.concat(this._buffer);this._bufferSize-=this._parserSize,this._buffer=this._bufferSize?[r.slice(this._parserSize)]:[],this._parser(r.slice(0,this._parserSize))}n(null)},o.prototype._callback=function(e,t,n){e&&(this._clearTimeout(),this.peerChoking||this._finished||this._updateTimeout(),e.callback(t,n))},o.prototype._clearTimeout=function(){this._timeout&&(clearTimeout(this._timeout),this._timeout=null)},o.prototype._updateTimeout=function(){var e=this;e._timeoutMs&&e.requests.length&&!e._timeout&&(e._timeout=setTimeout(function(){e._onTimeout()},e._timeoutMs),e._timeoutUnref&&e._timeout.unref&&e._timeout.unref())},o.prototype._parse=function(e,t){this._parserSize=e,this._parser=t},o.prototype._onMessageLength=function(e){var t=e.readUInt32BE(0);t>0?this._parse(t,this._onMessage):(this._onKeepAlive(),this._parse(4,this._onMessageLength))},o.prototype._onMessage=function(e){switch(this._parse(4,this._onMessageLength),e[0]){case 0:return this._onChoke();case 1:return this._onUnchoke();case 2:return this._onInterested();case 3:return this._onUninterested();case 4:return this._onHave(e.readUInt32BE(1));case 5:return this._onBitField(e.slice(1));case 6:return this._onRequest(e.readUInt32BE(1),e.readUInt32BE(5),e.readUInt32BE(9));case 7:return this._onPiece(e.readUInt32BE(1),e.readUInt32BE(5),e.slice(9));case 8:return this._onCancel(e.readUInt32BE(1),e.readUInt32BE(5),e.readUInt32BE(9));case 9:return this._onPort(e.readUInt16BE(1));case 20:return this._onExtended(e.readUInt8(1),e.slice(2));default:return this._debug("got unknown message"),this.emit("unknownmessage",e)}},o.prototype._parseHandshake=function(){var e=this;e._parse(1,function(t){var n=t.readUInt8(0);e._parse(n+48,function(t){var r=t.slice(0,n);return"BitTorrent protocol"!==r.toString()?(e._debug("Error: wire not speaking BitTorrent protocol (%s)",r.toString()),void e.end()):(t=t.slice(n),e._onHandshake(t.slice(8,28),t.slice(28,48),{dht:!!(1&t[7]),extended:!!(16&t[5])}),void e._parse(4,e._onMessageLength))})})},o.prototype._onFinish=function(){for(this._finished=!0,this.push(null);this.read(););for(clearInterval(this._keepAliveInterval),this._parse(Number.MAX_VALUE,function(){}),this.peerRequests=[];this.requests.length;)this._callback(this.requests.shift(),new Error("wire was closed"),null)},o.prototype._debug=function(){var e=[].slice.call(arguments);e[0]="["+this._debugId+"] "+e[0],c.apply(null,e)}},{bencode:11,bitfield:13,debug:30,inherits:42,randombytes:74,"readable-stream":82,"safe-buffer":88,speedometer:94,xtend:119}],15:[function(e,t,n){(function(n){function r(e){function t(e){n.nextTick(function(){a.emit("warning",e)})}var a=this;if(!(a instanceof r))return new r(e);if(s.call(a),e||(e={}),!e.peerId)throw new Error("Option `peerId` is required");if(!e.infoHash)throw new Error("Option `infoHash` is required");if(!e.announce)throw new Error("Option `announce` is required");if(!n.browser&&!e.port)throw new Error("Option `port` is required");a.peerId="string"==typeof e.peerId?e.peerId:e.peerId.toString("hex"),a._peerIdBuffer=o.from(a.peerId,"hex"),a._peerIdBinary=a._peerIdBuffer.toString("binary"),a.infoHash="string"==typeof e.infoHash?e.infoHash:e.infoHash.toString("hex"),a._infoHashBuffer=o.from(a.infoHash,"hex"),a._infoHashBinary=a._infoHashBuffer.toString("binary"),a._port=e.port,a.destroyed=!1,a._rtcConfig=e.rtcConfig,a._wrtc=e.wrtc,a._getAnnounceOpts=e.getAnnounceOpts,i("new client %s",a.infoHash);var u=a._wrtc!==!1&&(!!a._wrtc||d.WEBRTC_SUPPORT),c="string"==typeof e.announce?[e.announce]:null==e.announce?[]:e.announce;c=c.map(function(e){return e=e.toString(),"/"===e[e.length-1]&&(e=e.substring(0,e.length-1)),e}),c=h(c),a._trackers=c.map(function(e){var n=l.parse(e).protocol;return"http:"!==n&&"https:"!==n||"function"!=typeof m?"udp:"===n&&"function"==typeof g?new g(a,e):"ws:"!==n&&"wss:"!==n||!u?(t(new Error("Unsupported tracker protocol: "+e)),null):"ws:"===n&&"undefined"!=typeof window&&"https:"===window.location.protocol?(t(new Error("Unsupported tracker protocol: "+e)),null):new y(a,e):new m(a,e)}).filter(Boolean)}t.exports=r;var o=e("safe-buffer").Buffer,i=e("debug")("bittorrent-tracker"),s=e("events").EventEmitter,a=e("xtend"),u=e("inherits"),c=e("once"),f=e("run-parallel"),d=e("simple-peer"),h=e("uniq"),l=e("url"),p=e("./lib/common"),m=e("./lib/client/http-tracker"),g=e("./lib/client/udp-tracker"),y=e("./lib/client/websocket-tracker");u(r,s),r.scrape=function(e,t){if(t=c(t),!e.infoHash)throw new Error("Option `infoHash` is required");if(!e.announce)throw new Error("Option `announce` is required");var n=a(e,{infoHash:Array.isArray(e.infoHash)?e.infoHash[0]:e.infoHash,peerId:o.from("01234567890123456789"),port:6881}),i=new r(n);i.once("error",t),i.once("warning",t);var s=Array.isArray(e.infoHash)?e.infoHash.length:1,u={};return i.on("scrape",function(e){if(s-=1,u[e.infoHash]=e,0===s){i.destroy();var n=Object.keys(u);1===n.length?t(null,u[n[0]]):t(null,u)}}),e.infoHash=Array.isArray(e.infoHash)?e.infoHash.map(function(e){return o.from(e,"hex")}):o.from(e.infoHash,"hex"),i.scrape({infoHash:e.infoHash}),i},r.prototype.start=function(e){var t=this;i("send `start`"),e=t._defaultAnnounceOpts(e),e.event="started",t._announce(e),t._trackers.forEach(function(e){e.setInterval()})},r.prototype.stop=function(e){var t=this;i("send `stop`"),e=t._defaultAnnounceOpts(e),e.event="stopped",t._announce(e)},r.prototype.complete=function(e){var t=this;i("send `complete`"),e||(e={}),e=t._defaultAnnounceOpts(e),e.event="completed",t._announce(e)},r.prototype.update=function(e){var t=this;i("send `update`"),e=t._defaultAnnounceOpts(e),e.event&&delete e.event,t._announce(e)},r.prototype._announce=function(e){var t=this;t._trackers.forEach(function(t){t.announce(e)})},r.prototype.scrape=function(e){var t=this;i("send `scrape`"),e||(e={}),t._trackers.forEach(function(t){t.scrape(e)})},r.prototype.setInterval=function(e){var t=this;i("setInterval %d",e),t._trackers.forEach(function(t){t.setInterval(e)})},r.prototype.destroy=function(e){var t=this;if(!t.destroyed){t.destroyed=!0,i("destroy");var n=t._trackers.map(function(e){return function(t){e.destroy(t)}});f(n,e),t._trackers=[],t._getAnnounceOpts=null}},r.prototype._defaultAnnounceOpts=function(e){var t=this;return e||(e={}),null==e.numwant&&(e.numwant=p.DEFAULT_ANNOUNCE_PEERS),null==e.uploaded&&(e.uploaded=0),null==e.downloaded&&(e.downloaded=0),t._getAnnounceOpts&&(e=a(e,t._getAnnounceOpts())),e}}).call(this,e("_process"))},{"./lib/client/http-tracker":21,"./lib/client/udp-tracker":21,"./lib/client/websocket-tracker":17,"./lib/common":18,_process:67,debug:30,events:35,inherits:42,once:61,"run-parallel":86,"safe-buffer":88,"simple-peer":91,uniq:110,url:112,xtend:119}],16:[function(e,t,n){function r(e,t){var n=this;o.call(n),n.client=e,n.announceUrl=t,n.interval=null,n.destroyed=!1}t.exports=r;var o=e("events").EventEmitter,i=e("inherits");i(r,o),r.prototype.setInterval=function(e){var t=this;null==e&&(e=t.DEFAULT_ANNOUNCE_INTERVAL),clearInterval(t.interval),e&&(t.interval=setInterval(function(){t.announce(t.client._defaultAnnounceOpts())},e),t.interval.unref&&t.interval.unref())}},{events:35,inherits:42}],17:[function(e,t,n){function r(e,t,n){var r=this;h.call(r,e,t),i("new websocket tracker %s",t),r.peers={},r.socket=null,r.reconnecting=!1,r.retries=0,r.reconnectTimer=null,r._openSocket()}function o(){}t.exports=r;var i=e("debug")("bittorrent-tracker:websocket-tracker"),s=e("xtend"),a=e("inherits"),u=e("simple-peer"),c=e("randombytes"),f=e("simple-websocket"),d=e("../common"),h=e("./tracker"),l={},p=15e3,m=18e5,g=3e4,y=5e4;a(r,h),r.prototype.DEFAULT_ANNOUNCE_INTERVAL=3e4,r.prototype.announce=function(e){var t=this;if(!t.destroyed&&!t.reconnecting){if(!t.socket.connected)return void t.socket.once("connect",function(){t.announce(e)});var n=s(e,{action:"announce",info_hash:t.client._infoHashBinary,peer_id:t.client._peerIdBinary});if(t._trackerId&&(n.trackerid=t._trackerId),"stopped"===e.event)t._send(n);else{var r=Math.min(e.numwant,10);t._generateOffers(r,function(e){n.numwant=r,n.offers=e,t._send(n)})}}},r.prototype.scrape=function(e){var t=this;if(!t.destroyed&&!t.reconnecting){if(!t.socket.connected)return void t.socket.once("connect",function(){t.scrape(e)});var n=Array.isArray(e.infoHash)&&e.infoHash.length>0?e.infoHash.map(function(e){return e.toString("binary")}):e.infoHash&&e.infoHash.toString("binary")||t.client._infoHashBinary,r={action:"scrape",info_hash:n};t._send(r)}},r.prototype.destroy=function(e){var t=this;if(e||(e=o),t.destroyed)return e(null);t.destroyed=!0,clearInterval(t.interval),clearTimeout(t.reconnectTimer),t.socket&&(t.socket.removeListener("connect",t._onSocketConnectBound),t.socket.removeListener("data",t._onSocketDataBound),t.socket.removeListener("close",t._onSocketCloseBound),t.socket.removeListener("error",t._onSocketErrorBound)),t._onSocketConnectBound=null,t._onSocketErrorBound=null,t._onSocketDataBound=null,t._onSocketCloseBound=null;for(var n in t.peers){var r=t.peers[n];clearTimeout(r.trackerTimeout),r.destroy()}if(t.peers=null,l[t.announceUrl]&&(l[t.announceUrl].consumers-=1),0===l[t.announceUrl].consumers){delete l[t.announceUrl];try{t.socket.on("error",o),t.socket.destroy(e)}catch(t){e(null)}}else e(null);t.socket=null},r.prototype._openSocket=function(){var e=this;e.destroyed=!1,e.peers||(e.peers={}),e._onSocketConnectBound=function(){e._onSocketConnect()},e._onSocketErrorBound=function(t){e._onSocketError(t)},e._onSocketDataBound=function(t){e._onSocketData(t)},e._onSocketCloseBound=function(){e._onSocketClose()},e.socket=l[e.announceUrl],e.socket?l[e.announceUrl].consumers+=1:(e.socket=l[e.announceUrl]=new f(e.announceUrl),e.socket.consumers=1,e.socket.on("connect",e._onSocketConnectBound)),e.socket.on("data",e._onSocketDataBound),e.socket.on("close",e._onSocketCloseBound),e.socket.on("error",e._onSocketErrorBound)},r.prototype._onSocketConnect=function(){var e=this;e.destroyed||e.reconnecting&&(e.reconnecting=!1,e.retries=0,e.announce(e.client._defaultAnnounceOpts()))},r.prototype._onSocketData=function(e){var t=this;if(!t.destroyed){try{e=JSON.parse(e)}catch(e){return void t.client.emit("warning",new Error("Invalid tracker response"))}"announce"===e.action?t._onAnnounceResponse(e):"scrape"===e.action?t._onScrapeResponse(e):t._onSocketError(new Error("invalid action in WS response: "+e.action))}},r.prototype._onAnnounceResponse=function(e){var t=this;if(e.info_hash!==t.client._infoHashBinary)return void i("ignoring websocket data from %s for %s (looking for %s: reused socket)",t.announceUrl,d.binaryToHex(e.info_hash),t.client.infoHash);if(!e.peer_id||e.peer_id!==t.client._peerIdBinary){i("received %s from %s for %s",JSON.stringify(e),t.announceUrl,t.client.infoHash);var n=e["failure reason"];if(n)return t.client.emit("warning",new Error(n));var r=e["warning message"];r&&t.client.emit("warning",new Error(r));var o=e.interval||e["min interval"];o&&t.setInterval(1e3*o);var s=e["tracker id"];s&&(t._trackerId=s),null!=e.complete&&t.client.emit("update",{announce:t.announceUrl,complete:e.complete,incomplete:e.incomplete});var a;if(e.offer&&e.peer_id&&(i("creating peer (from remote offer)"),a=new u({trickle:!1,config:t.client._rtcConfig,wrtc:t.client._wrtc}),a.id=d.binaryToHex(e.peer_id),a.once("signal",function(n){var r={action:"announce",info_hash:t.client._infoHashBinary,peer_id:t.client._peerIdBinary,to_peer_id:e.peer_id,answer:n,offer_id:e.offer_id};t._trackerId&&(r.trackerid=t._trackerId),t._send(r)}),a.signal(e.offer),t.client.emit("peer",a)),e.answer&&e.peer_id){var c=d.binaryToHex(e.offer_id);a=t.peers[c],a?(a.id=d.binaryToHex(e.peer_id),a.signal(e.answer),t.client.emit("peer",a),clearTimeout(a.trackerTimeout),a.trackerTimeout=null,delete t.peers[c]):i("got unexpected answer: "+JSON.stringify(e.answer))}}},r.prototype._onScrapeResponse=function(e){var t=this;e=e.files||{};var n=Object.keys(e);return 0===n.length?void t.client.emit("warning",new Error("invalid scrape response")):void n.forEach(function(n){var r=e[n];t.client.emit("scrape",{announce:t.announceUrl,infoHash:d.binaryToHex(n),complete:r.complete,incomplete:r.incomplete,downloaded:r.downloaded})})},r.prototype._onSocketClose=function(){var e=this;e.destroyed||(e.destroy(),e._startReconnectTimer())},r.prototype._onSocketError=function(e){var t=this;t.destroyed||(t.destroy(),t.client.emit("warning",e),t._startReconnectTimer())},r.prototype._startReconnectTimer=function(){var e=this,t=Math.floor(Math.random()*g)+Math.min(Math.pow(2,e.retries)*p,m);e.reconnecting=!0,clearTimeout(e.reconnectTimer),e.reconnectTimer=setTimeout(function(){e.retries++,e._openSocket()},t),e.reconnectTimer.unref&&e.reconnectTimer.unref(),i("reconnecting socket in %s ms",t)},r.prototype._send=function(e){var t=this;if(!t.destroyed){var n=JSON.stringify(e);i("send %s",n),t.socket.send(n)}},r.prototype._generateOffers=function(e,t){function n(){var e=c(20).toString("hex");i("creating peer (from _generateOffers)");var t=o.peers[e]=new u({initiator:!0,trickle:!1,config:o.client._rtcConfig,wrtc:o.client._wrtc});t.once("signal",function(t){s.push({offer:t,offer_id:d.hexToBinary(e)}),r()}),t.trackerTimeout=setTimeout(function(){i("tracker timeout: destroying peer"),t.trackerTimeout=null,delete o.peers[e],t.destroy()},y),t.trackerTimeout.unref&&t.trackerTimeout.unref()}function r(){s.length===e&&(i("generated %s offers",e),t(s))}var o=this,s=[];i("generating %s offers",e);for(var a=0;a<e;++a)n();r()}},{"../common":18,"./tracker":16,debug:30,inherits:42,randombytes:74,"simple-peer":91,"simple-websocket":93,xtend:119}],18:[function(e,t,n){var r=e("safe-buffer").Buffer,o=e("xtend/mutable");n.DEFAULT_ANNOUNCE_PEERS=50,n.MAX_ANNOUNCE_PEERS=82,n.binaryToHex=function(e){return"string"!=typeof e&&(e=String(e)),r.from(e,"binary").toString("hex")},n.hexToBinary=function(e){return"string"!=typeof e&&(e=String(e)),r.from(e,"hex").toString("binary")};var i=e("./common-node");o(n,i)},{"./common-node":21,"safe-buffer":88,"xtend/mutable":120}],19:[function(e,t,n){(function(e){t.exports=function(t,n){function r(t){o.removeEventListener("loadend",r,!1),t.error?n(t.error):n(null,new e(o.result))}if("undefined"==typeof Blob||!(t instanceof Blob))throw new Error("first argument must be a Blob");
if("function"!=typeof n)throw new Error("second argument must be a function");var o=new FileReader;o.addEventListener("loadend",r,!1),o.readAsArrayBuffer(t)}}).call(this,e("buffer").Buffer)},{buffer:24}],20:[function(e,t,n){(function(n){function r(e,t){return this instanceof r?(i.call(this),t||(t={}),"object"==typeof e&&(t=e,e=t.size),this.size=e||512,t.nopad?this._zeroPadding=!1:this._zeroPadding=s(t.zeroPadding,!0),this._buffered=[],void(this._bufferedBytes=0)):new r(e,t)}var o=e("inherits"),i=e("readable-stream").Transform,s=e("defined");t.exports=r,o(r,i),r.prototype._transform=function(e,t,r){for(this._bufferedBytes+=e.length,this._buffered.push(e);this._bufferedBytes>=this.size;){var o=n.concat(this._buffered);this._bufferedBytes-=this.size,this.push(o.slice(0,this.size)),this._buffered=[o.slice(this.size,o.length)]}r()},r.prototype._flush=function(){if(this._bufferedBytes&&this._zeroPadding){var e=new n(this.size-this._bufferedBytes);e.fill(0),this._buffered.push(e),this.push(n.concat(this._buffered)),this._buffered=null}else this._bufferedBytes&&(this.push(n.concat(this._buffered)),this._buffered=null);this.push(null)}}).call(this,e("buffer").Buffer)},{buffer:24,defined:32,inherits:42,"readable-stream":82}],21:[function(e,t,n){},{}],22:[function(e,t,n){arguments[4][21][0].apply(n,arguments)},{dup:21}],23:[function(e,t,n){(function(t){"use strict";var r=e("buffer"),o=r.Buffer,i=r.SlowBuffer,s=r.kMaxLength||2147483647;n.alloc=function(e,t,n){if("function"==typeof o.alloc)return o.alloc(e,t,n);if("number"==typeof n)throw new TypeError("encoding must not be number");if("number"!=typeof e)throw new TypeError("size must be a number");if(e>s)throw new RangeError("size is too large");var r=n,i=t;void 0===i&&(r=void 0,i=0);var a=new o(e);if("string"==typeof i)for(var u=new o(i,r),c=u.length,f=-1;++f<e;)a[f]=u[f%c];else a.fill(i);return a},n.allocUnsafe=function(e){if("function"==typeof o.allocUnsafe)return o.allocUnsafe(e);if("number"!=typeof e)throw new TypeError("size must be a number");if(e>s)throw new RangeError("size is too large");return new o(e)},n.from=function(e,n,r){if("function"==typeof o.from&&(!t.Uint8Array||Uint8Array.from!==o.from))return o.from(e,n,r);if("number"==typeof e)throw new TypeError('"value" argument must not be a number');if("string"==typeof e)return new o(e,n);if("undefined"!=typeof ArrayBuffer&&e instanceof ArrayBuffer){var i=n;if(1===arguments.length)return new o(e);"undefined"==typeof i&&(i=0);var s=r;if("undefined"==typeof s&&(s=e.byteLength-i),i>=e.byteLength)throw new RangeError("'offset' is out of bounds");if(s>e.byteLength-i)throw new RangeError("'length' is out of bounds");return new o(e.slice(i,i+s))}if(o.isBuffer(e)){var a=new o(e.length);return e.copy(a,0,0,e.length),a}if(e){if(Array.isArray(e)||"undefined"!=typeof ArrayBuffer&&e.buffer instanceof ArrayBuffer||"length"in e)return new o(e);if("Buffer"===e.type&&Array.isArray(e.data))return new o(e.data)}throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")},n.allocUnsafeSlow=function(e){if("function"==typeof o.allocUnsafeSlow)return o.allocUnsafeSlow(e);if("number"!=typeof e)throw new TypeError("size must be a number");if(e>=s)throw new RangeError("size is too large");return new i(e)}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{buffer:24}],24:[function(e,t,n){(function(t){"use strict";function r(){try{var e=new Uint8Array(1);return e.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42}},42===e.foo()&&"function"==typeof e.subarray&&0===e.subarray(1,1).byteLength}catch(e){return!1}}function o(){return s.TYPED_ARRAY_SUPPORT?2147483647:1073741823}function i(e,t){if(o()<t)throw new RangeError("Invalid typed array length");return s.TYPED_ARRAY_SUPPORT?(e=new Uint8Array(t),e.__proto__=s.prototype):(null===e&&(e=new s(t)),e.length=t),e}function s(e,t,n){if(!(s.TYPED_ARRAY_SUPPORT||this instanceof s))return new s(e,t,n);if("number"==typeof e){if("string"==typeof t)throw new Error("If encoding is specified then the first argument must be a string");return f(this,e)}return a(this,e,t,n)}function a(e,t,n,r){if("number"==typeof t)throw new TypeError('"value" argument must not be a number');return"undefined"!=typeof ArrayBuffer&&t instanceof ArrayBuffer?l(e,t,n,r):"string"==typeof t?d(e,t,n):p(e,t)}function u(e){if("number"!=typeof e)throw new TypeError('"size" argument must be a number');if(e<0)throw new RangeError('"size" argument must not be negative')}function c(e,t,n,r){return u(t),t<=0?i(e,t):void 0!==n?"string"==typeof r?i(e,t).fill(n,r):i(e,t).fill(n):i(e,t)}function f(e,t){if(u(t),e=i(e,t<0?0:0|m(t)),!s.TYPED_ARRAY_SUPPORT)for(var n=0;n<t;++n)e[n]=0;return e}function d(e,t,n){if("string"==typeof n&&""!==n||(n="utf8"),!s.isEncoding(n))throw new TypeError('"encoding" must be a valid string encoding');var r=0|y(t,n);e=i(e,r);var o=e.write(t,n);return o!==r&&(e=e.slice(0,o)),e}function h(e,t){var n=t.length<0?0:0|m(t.length);e=i(e,n);for(var r=0;r<n;r+=1)e[r]=255&t[r];return e}function l(e,t,n,r){if(t.byteLength,n<0||t.byteLength<n)throw new RangeError("'offset' is out of bounds");if(t.byteLength<n+(r||0))throw new RangeError("'length' is out of bounds");return t=void 0===n&&void 0===r?new Uint8Array(t):void 0===r?new Uint8Array(t,n):new Uint8Array(t,n,r),s.TYPED_ARRAY_SUPPORT?(e=t,e.__proto__=s.prototype):e=h(e,t),e}function p(e,t){if(s.isBuffer(t)){var n=0|m(t.length);return e=i(e,n),0===e.length?e:(t.copy(e,0,0,n),e)}if(t){if("undefined"!=typeof ArrayBuffer&&t.buffer instanceof ArrayBuffer||"length"in t)return"number"!=typeof t.length||X(t.length)?i(e,0):h(e,t);if("Buffer"===t.type&&Z(t.data))return h(e,t.data)}throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")}function m(e){if(e>=o())throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+o().toString(16)+" bytes");return 0|e}function g(e){return+e!=e&&(e=0),s.alloc(+e)}function y(e,t){if(s.isBuffer(e))return e.length;if("undefined"!=typeof ArrayBuffer&&"function"==typeof ArrayBuffer.isView&&(ArrayBuffer.isView(e)||e instanceof ArrayBuffer))return e.byteLength;"string"!=typeof e&&(e=""+e);var n=e.length;if(0===n)return 0;for(var r=!1;;)switch(t){case"ascii":case"latin1":case"binary":return n;case"utf8":case"utf-8":case void 0:return Y(e).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*n;case"hex":return n>>>1;case"base64":return $(e).length;default:if(r)return Y(e).length;t=(""+t).toLowerCase(),r=!0}}function _(e,t,n){var r=!1;if((void 0===t||t<0)&&(t=0),t>this.length)return"";if((void 0===n||n>this.length)&&(n=this.length),n<=0)return"";if(n>>>=0,t>>>=0,n<=t)return"";for(e||(e="utf8");;)switch(e){case"hex":return U(this,t,n);case"utf8":case"utf-8":return T(this,t,n);case"ascii":return L(this,t,n);case"latin1":case"binary":return R(this,t,n);case"base64":return A(this,t,n);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return P(this,t,n);default:if(r)throw new TypeError("Unknown encoding: "+e);e=(e+"").toLowerCase(),r=!0}}function v(e,t,n){var r=e[t];e[t]=e[n],e[n]=r}function b(e,t,n,r,o){if(0===e.length)return-1;if("string"==typeof n?(r=n,n=0):n>2147483647?n=2147483647:n<-2147483648&&(n=-2147483648),n=+n,isNaN(n)&&(n=o?0:e.length-1),n<0&&(n=e.length+n),n>=e.length){if(o)return-1;n=e.length-1}else if(n<0){if(!o)return-1;n=0}if("string"==typeof t&&(t=s.from(t,r)),s.isBuffer(t))return 0===t.length?-1:w(e,t,n,r,o);if("number"==typeof t)return t=255&t,s.TYPED_ARRAY_SUPPORT&&"function"==typeof Uint8Array.prototype.indexOf?o?Uint8Array.prototype.indexOf.call(e,t,n):Uint8Array.prototype.lastIndexOf.call(e,t,n):w(e,[t],n,r,o);throw new TypeError("val must be string, number or Buffer")}function w(e,t,n,r,o){function i(e,t){return 1===s?e[t]:e.readUInt16BE(t*s)}var s=1,a=e.length,u=t.length;if(void 0!==r&&(r=String(r).toLowerCase(),"ucs2"===r||"ucs-2"===r||"utf16le"===r||"utf-16le"===r)){if(e.length<2||t.length<2)return-1;s=2,a/=2,u/=2,n/=2}var c;if(o){var f=-1;for(c=n;c<a;c++)if(i(e,c)===i(t,f===-1?0:c-f)){if(f===-1&&(f=c),c-f+1===u)return f*s}else f!==-1&&(c-=c-f),f=-1}else for(n+u>a&&(n=a-u),c=n;c>=0;c--){for(var d=!0,h=0;h<u;h++)if(i(e,c+h)!==i(t,h)){d=!1;break}if(d)return c}return-1}function E(e,t,n,r){n=Number(n)||0;var o=e.length-n;r?(r=Number(r),r>o&&(r=o)):r=o;var i=t.length;if(i%2!==0)throw new TypeError("Invalid hex string");r>i/2&&(r=i/2);for(var s=0;s<r;++s){var a=parseInt(t.substr(2*s,2),16);if(isNaN(a))return s;e[n+s]=a}return s}function k(e,t,n,r){return K(Y(t,e.length-n),e,n,r)}function x(e,t,n,r){return K(V(t),e,n,r)}function S(e,t,n,r){return x(e,t,n,r)}function B(e,t,n,r){return K($(t),e,n,r)}function I(e,t,n,r){return K(G(t,e.length-n),e,n,r)}function A(e,t,n){return 0===t&&n===e.length?J.fromByteArray(e):J.fromByteArray(e.slice(t,n))}function T(e,t,n){n=Math.min(e.length,n);for(var r=[],o=t;o<n;){var i=e[o],s=null,a=i>239?4:i>223?3:i>191?2:1;if(o+a<=n){var u,c,f,d;switch(a){case 1:i<128&&(s=i);break;case 2:u=e[o+1],128===(192&u)&&(d=(31&i)<<6|63&u,d>127&&(s=d));break;case 3:u=e[o+1],c=e[o+2],128===(192&u)&&128===(192&c)&&(d=(15&i)<<12|(63&u)<<6|63&c,d>2047&&(d<55296||d>57343)&&(s=d));break;case 4:u=e[o+1],c=e[o+2],f=e[o+3],128===(192&u)&&128===(192&c)&&128===(192&f)&&(d=(15&i)<<18|(63&u)<<12|(63&c)<<6|63&f,d>65535&&d<1114112&&(s=d))}}null===s?(s=65533,a=1):s>65535&&(s-=65536,r.push(s>>>10&1023|55296),s=56320|1023&s),r.push(s),o+=a}return C(r)}function C(e){var t=e.length;if(t<=ee)return String.fromCharCode.apply(String,e);for(var n="",r=0;r<t;)n+=String.fromCharCode.apply(String,e.slice(r,r+=ee));return n}function L(e,t,n){var r="";n=Math.min(e.length,n);for(var o=t;o<n;++o)r+=String.fromCharCode(127&e[o]);return r}function R(e,t,n){var r="";n=Math.min(e.length,n);for(var o=t;o<n;++o)r+=String.fromCharCode(e[o]);return r}function U(e,t,n){var r=e.length;(!t||t<0)&&(t=0),(!n||n<0||n>r)&&(n=r);for(var o="",i=t;i<n;++i)o+=F(e[i]);return o}function P(e,t,n){for(var r=e.slice(t,n),o="",i=0;i<r.length;i+=2)o+=String.fromCharCode(r[i]+256*r[i+1]);return o}function O(e,t,n){if(e%1!==0||e<0)throw new RangeError("offset is not uint");if(e+t>n)throw new RangeError("Trying to access beyond buffer length")}function M(e,t,n,r,o,i){if(!s.isBuffer(e))throw new TypeError('"buffer" argument must be a Buffer instance');if(t>o||t<i)throw new RangeError('"value" argument is out of bounds');if(n+r>e.length)throw new RangeError("Index out of range")}function j(e,t,n,r){t<0&&(t=65535+t+1);for(var o=0,i=Math.min(e.length-n,2);o<i;++o)e[n+o]=(t&255<<8*(r?o:1-o))>>>8*(r?o:1-o)}function H(e,t,n,r){t<0&&(t=4294967295+t+1);for(var o=0,i=Math.min(e.length-n,4);o<i;++o)e[n+o]=t>>>8*(r?o:3-o)&255}function D(e,t,n,r,o,i){if(n+r>e.length)throw new RangeError("Index out of range");if(n<0)throw new RangeError("Index out of range")}function q(e,t,n,r,o){return o||D(e,t,n,4,3.4028234663852886e38,-3.4028234663852886e38),Q.write(e,t,n,r,23,4),n+4}function N(e,t,n,r,o){return o||D(e,t,n,8,1.7976931348623157e308,-1.7976931348623157e308),Q.write(e,t,n,r,52,8),n+8}function W(e){if(e=z(e).replace(te,""),e.length<2)return"";for(;e.length%4!==0;)e+="=";return e}function z(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")}function F(e){return e<16?"0"+e.toString(16):e.toString(16)}function Y(e,t){t=t||1/0;for(var n,r=e.length,o=null,i=[],s=0;s<r;++s){if(n=e.charCodeAt(s),n>55295&&n<57344){if(!o){if(n>56319){(t-=3)>-1&&i.push(239,191,189);continue}if(s+1===r){(t-=3)>-1&&i.push(239,191,189);continue}o=n;continue}if(n<56320){(t-=3)>-1&&i.push(239,191,189),o=n;continue}n=(o-55296<<10|n-56320)+65536}else o&&(t-=3)>-1&&i.push(239,191,189);if(o=null,n<128){if((t-=1)<0)break;i.push(n)}else if(n<2048){if((t-=2)<0)break;i.push(n>>6|192,63&n|128)}else if(n<65536){if((t-=3)<0)break;i.push(n>>12|224,n>>6&63|128,63&n|128)}else{if(!(n<1114112))throw new Error("Invalid code point");if((t-=4)<0)break;i.push(n>>18|240,n>>12&63|128,n>>6&63|128,63&n|128)}}return i}function V(e){for(var t=[],n=0;n<e.length;++n)t.push(255&e.charCodeAt(n));return t}function G(e,t){for(var n,r,o,i=[],s=0;s<e.length&&!((t-=2)<0);++s)n=e.charCodeAt(s),r=n>>8,o=n%256,i.push(o),i.push(r);return i}function $(e){return J.toByteArray(W(e))}function K(e,t,n,r){for(var o=0;o<r&&!(o+n>=t.length||o>=e.length);++o)t[o+n]=e[o];return o}function X(e){return e!==e}var J=e("base64-js"),Q=e("ieee754"),Z=e("isarray");n.Buffer=s,n.SlowBuffer=g,n.INSPECT_MAX_BYTES=50,s.TYPED_ARRAY_SUPPORT=void 0!==t.TYPED_ARRAY_SUPPORT?t.TYPED_ARRAY_SUPPORT:r(),n.kMaxLength=o(),s.poolSize=8192,s._augment=function(e){return e.__proto__=s.prototype,e},s.from=function(e,t,n){return a(null,e,t,n)},s.TYPED_ARRAY_SUPPORT&&(s.prototype.__proto__=Uint8Array.prototype,s.__proto__=Uint8Array,"undefined"!=typeof Symbol&&Symbol.species&&s[Symbol.species]===s&&Object.defineProperty(s,Symbol.species,{value:null,configurable:!0})),s.alloc=function(e,t,n){return c(null,e,t,n)},s.allocUnsafe=function(e){return f(null,e)},s.allocUnsafeSlow=function(e){return f(null,e)},s.isBuffer=function(e){return!(null==e||!e._isBuffer)},s.compare=function(e,t){if(!s.isBuffer(e)||!s.isBuffer(t))throw new TypeError("Arguments must be Buffers");if(e===t)return 0;for(var n=e.length,r=t.length,o=0,i=Math.min(n,r);o<i;++o)if(e[o]!==t[o]){n=e[o],r=t[o];break}return n<r?-1:r<n?1:0},s.isEncoding=function(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},s.concat=function(e,t){if(!Z(e))throw new TypeError('"list" argument must be an Array of Buffers');if(0===e.length)return s.alloc(0);var n;if(void 0===t)for(t=0,n=0;n<e.length;++n)t+=e[n].length;var r=s.allocUnsafe(t),o=0;for(n=0;n<e.length;++n){var i=e[n];if(!s.isBuffer(i))throw new TypeError('"list" argument must be an Array of Buffers');i.copy(r,o),o+=i.length}return r},s.byteLength=y,s.prototype._isBuffer=!0,s.prototype.swap16=function(){var e=this.length;if(e%2!==0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(var t=0;t<e;t+=2)v(this,t,t+1);return this},s.prototype.swap32=function(){var e=this.length;if(e%4!==0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(var t=0;t<e;t+=4)v(this,t,t+3),v(this,t+1,t+2);return this},s.prototype.swap64=function(){var e=this.length;if(e%8!==0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(var t=0;t<e;t+=8)v(this,t,t+7),v(this,t+1,t+6),v(this,t+2,t+5),v(this,t+3,t+4);return this},s.prototype.toString=function(){var e=0|this.length;return 0===e?"":0===arguments.length?T(this,0,e):_.apply(this,arguments)},s.prototype.equals=function(e){if(!s.isBuffer(e))throw new TypeError("Argument must be a Buffer");return this===e||0===s.compare(this,e)},s.prototype.inspect=function(){var e="",t=n.INSPECT_MAX_BYTES;return this.length>0&&(e=this.toString("hex",0,t).match(/.{2}/g).join(" "),this.length>t&&(e+=" ... ")),"<Buffer "+e+">"},s.prototype.compare=function(e,t,n,r,o){if(!s.isBuffer(e))throw new TypeError("Argument must be a Buffer");if(void 0===t&&(t=0),void 0===n&&(n=e?e.length:0),void 0===r&&(r=0),void 0===o&&(o=this.length),t<0||n>e.length||r<0||o>this.length)throw new RangeError("out of range index");if(r>=o&&t>=n)return 0;if(r>=o)return-1;if(t>=n)return 1;if(t>>>=0,n>>>=0,r>>>=0,o>>>=0,this===e)return 0;for(var i=o-r,a=n-t,u=Math.min(i,a),c=this.slice(r,o),f=e.slice(t,n),d=0;d<u;++d)if(c[d]!==f[d]){i=c[d],a=f[d];break}return i<a?-1:a<i?1:0},s.prototype.includes=function(e,t,n){return this.indexOf(e,t,n)!==-1},s.prototype.indexOf=function(e,t,n){return b(this,e,t,n,!0)},s.prototype.lastIndexOf=function(e,t,n){return b(this,e,t,n,!1)},s.prototype.write=function(e,t,n,r){if(void 0===t)r="utf8",n=this.length,t=0;else if(void 0===n&&"string"==typeof t)r=t,n=this.length,t=0;else{if(!isFinite(t))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");t=0|t,isFinite(n)?(n=0|n,void 0===r&&(r="utf8")):(r=n,n=void 0)}var o=this.length-t;if((void 0===n||n>o)&&(n=o),e.length>0&&(n<0||t<0)||t>this.length)throw new RangeError("Attempt to write outside buffer bounds");r||(r="utf8");for(var i=!1;;)switch(r){case"hex":return E(this,e,t,n);case"utf8":case"utf-8":return k(this,e,t,n);case"ascii":return x(this,e,t,n);case"latin1":case"binary":return S(this,e,t,n);case"base64":return B(this,e,t,n);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return I(this,e,t,n);default:if(i)throw new TypeError("Unknown encoding: "+r);r=(""+r).toLowerCase(),i=!0}},s.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};var ee=4096;s.prototype.slice=function(e,t){var n=this.length;e=~~e,t=void 0===t?n:~~t,e<0?(e+=n,e<0&&(e=0)):e>n&&(e=n),t<0?(t+=n,t<0&&(t=0)):t>n&&(t=n),t<e&&(t=e);var r;if(s.TYPED_ARRAY_SUPPORT)r=this.subarray(e,t),r.__proto__=s.prototype;else{var o=t-e;r=new s(o,void 0);for(var i=0;i<o;++i)r[i]=this[i+e]}return r},s.prototype.readUIntLE=function(e,t,n){e=0|e,t=0|t,n||O(e,t,this.length);for(var r=this[e],o=1,i=0;++i<t&&(o*=256);)r+=this[e+i]*o;return r},s.prototype.readUIntBE=function(e,t,n){e=0|e,t=0|t,n||O(e,t,this.length);for(var r=this[e+--t],o=1;t>0&&(o*=256);)r+=this[e+--t]*o;return r},s.prototype.readUInt8=function(e,t){return t||O(e,1,this.length),this[e]},s.prototype.readUInt16LE=function(e,t){return t||O(e,2,this.length),this[e]|this[e+1]<<8},s.prototype.readUInt16BE=function(e,t){return t||O(e,2,this.length),this[e]<<8|this[e+1]},s.prototype.readUInt32LE=function(e,t){return t||O(e,4,this.length),(this[e]|this[e+1]<<8|this[e+2]<<16)+16777216*this[e+3]},s.prototype.readUInt32BE=function(e,t){return t||O(e,4,this.length),16777216*this[e]+(this[e+1]<<16|this[e+2]<<8|this[e+3])},s.prototype.readIntLE=function(e,t,n){e=0|e,t=0|t,n||O(e,t,this.length);for(var r=this[e],o=1,i=0;++i<t&&(o*=256);)r+=this[e+i]*o;return o*=128,r>=o&&(r-=Math.pow(2,8*t)),r},s.prototype.readIntBE=function(e,t,n){e=0|e,t=0|t,n||O(e,t,this.length);for(var r=t,o=1,i=this[e+--r];r>0&&(o*=256);)i+=this[e+--r]*o;return o*=128,i>=o&&(i-=Math.pow(2,8*t)),i},s.prototype.readInt8=function(e,t){return t||O(e,1,this.length),128&this[e]?(255-this[e]+1)*-1:this[e]},s.prototype.readInt16LE=function(e,t){t||O(e,2,this.length);var n=this[e]|this[e+1]<<8;return 32768&n?4294901760|n:n},s.prototype.readInt16BE=function(e,t){t||O(e,2,this.length);var n=this[e+1]|this[e]<<8;return 32768&n?4294901760|n:n},s.prototype.readInt32LE=function(e,t){return t||O(e,4,this.length),this[e]|this[e+1]<<8|this[e+2]<<16|this[e+3]<<24},s.prototype.readInt32BE=function(e,t){return t||O(e,4,this.length),this[e]<<24|this[e+1]<<16|this[e+2]<<8|this[e+3]},s.prototype.readFloatLE=function(e,t){return t||O(e,4,this.length),Q.read(this,e,!0,23,4)},s.prototype.readFloatBE=function(e,t){return t||O(e,4,this.length),Q.read(this,e,!1,23,4)},s.prototype.readDoubleLE=function(e,t){return t||O(e,8,this.length),Q.read(this,e,!0,52,8)},s.prototype.readDoubleBE=function(e,t){return t||O(e,8,this.length),Q.read(this,e,!1,52,8)},s.prototype.writeUIntLE=function(e,t,n,r){if(e=+e,t=0|t,n=0|n,!r){var o=Math.pow(2,8*n)-1;M(this,e,t,n,o,0)}var i=1,s=0;for(this[t]=255&e;++s<n&&(i*=256);)this[t+s]=e/i&255;return t+n},s.prototype.writeUIntBE=function(e,t,n,r){if(e=+e,t=0|t,n=0|n,!r){var o=Math.pow(2,8*n)-1;M(this,e,t,n,o,0)}var i=n-1,s=1;for(this[t+i]=255&e;--i>=0&&(s*=256);)this[t+i]=e/s&255;return t+n},s.prototype.writeUInt8=function(e,t,n){return e=+e,t=0|t,n||M(this,e,t,1,255,0),s.TYPED_ARRAY_SUPPORT||(e=Math.floor(e)),this[t]=255&e,t+1},s.prototype.writeUInt16LE=function(e,t,n){return e=+e,t=0|t,n||M(this,e,t,2,65535,0),s.TYPED_ARRAY_SUPPORT?(this[t]=255&e,this[t+1]=e>>>8):j(this,e,t,!0),t+2},s.prototype.writeUInt16BE=function(e,t,n){return e=+e,t=0|t,n||M(this,e,t,2,65535,0),s.TYPED_ARRAY_SUPPORT?(this[t]=e>>>8,this[t+1]=255&e):j(this,e,t,!1),t+2},s.prototype.writeUInt32LE=function(e,t,n){return e=+e,t=0|t,n||M(this,e,t,4,4294967295,0),s.TYPED_ARRAY_SUPPORT?(this[t+3]=e>>>24,this[t+2]=e>>>16,this[t+1]=e>>>8,this[t]=255&e):H(this,e,t,!0),t+4},s.prototype.writeUInt32BE=function(e,t,n){return e=+e,t=0|t,n||M(this,e,t,4,4294967295,0),s.TYPED_ARRAY_SUPPORT?(this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e):H(this,e,t,!1),t+4},s.prototype.writeIntLE=function(e,t,n,r){if(e=+e,t=0|t,!r){var o=Math.pow(2,8*n-1);M(this,e,t,n,o-1,-o)}var i=0,s=1,a=0;for(this[t]=255&e;++i<n&&(s*=256);)e<0&&0===a&&0!==this[t+i-1]&&(a=1),this[t+i]=(e/s>>0)-a&255;return t+n},s.prototype.writeIntBE=function(e,t,n,r){if(e=+e,t=0|t,!r){var o=Math.pow(2,8*n-1);M(this,e,t,n,o-1,-o)}var i=n-1,s=1,a=0;for(this[t+i]=255&e;--i>=0&&(s*=256);)e<0&&0===a&&0!==this[t+i+1]&&(a=1),this[t+i]=(e/s>>0)-a&255;return t+n},s.prototype.writeInt8=function(e,t,n){return e=+e,t=0|t,n||M(this,e,t,1,127,-128),s.TYPED_ARRAY_SUPPORT||(e=Math.floor(e)),e<0&&(e=255+e+1),this[t]=255&e,t+1},s.prototype.writeInt16LE=function(e,t,n){return e=+e,t=0|t,n||M(this,e,t,2,32767,-32768),s.TYPED_ARRAY_SUPPORT?(this[t]=255&e,this[t+1]=e>>>8):j(this,e,t,!0),t+2},s.prototype.writeInt16BE=function(e,t,n){return e=+e,t=0|t,n||M(this,e,t,2,32767,-32768),s.TYPED_ARRAY_SUPPORT?(this[t]=e>>>8,this[t+1]=255&e):j(this,e,t,!1),t+2},s.prototype.writeInt32LE=function(e,t,n){return e=+e,t=0|t,n||M(this,e,t,4,2147483647,-2147483648),s.TYPED_ARRAY_SUPPORT?(this[t]=255&e,this[t+1]=e>>>8,this[t+2]=e>>>16,this[t+3]=e>>>24):H(this,e,t,!0),t+4},s.prototype.writeInt32BE=function(e,t,n){return e=+e,t=0|t,n||M(this,e,t,4,2147483647,-2147483648),e<0&&(e=4294967295+e+1),s.TYPED_ARRAY_SUPPORT?(this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e):H(this,e,t,!1),t+4},s.prototype.writeFloatLE=function(e,t,n){return q(this,e,t,!0,n)},s.prototype.writeFloatBE=function(e,t,n){return q(this,e,t,!1,n)},s.prototype.writeDoubleLE=function(e,t,n){return N(this,e,t,!0,n)},s.prototype.writeDoubleBE=function(e,t,n){return N(this,e,t,!1,n)},s.prototype.copy=function(e,t,n,r){if(n||(n=0),r||0===r||(r=this.length),t>=e.length&&(t=e.length),t||(t=0),r>0&&r<n&&(r=n),r===n)return 0;if(0===e.length||0===this.length)return 0;if(t<0)throw new RangeError("targetStart out of bounds");if(n<0||n>=this.length)throw new RangeError("sourceStart out of bounds");if(r<0)throw new RangeError("sourceEnd out of bounds");r>this.length&&(r=this.length),e.length-t<r-n&&(r=e.length-t+n);var o,i=r-n;if(this===e&&n<t&&t<r)for(o=i-1;o>=0;--o)e[o+t]=this[o+n];else if(i<1e3||!s.TYPED_ARRAY_SUPPORT)for(o=0;o<i;++o)e[o+t]=this[o+n];else Uint8Array.prototype.set.call(e,this.subarray(n,n+i),t);return i},s.prototype.fill=function(e,t,n,r){if("string"==typeof e){if("string"==typeof t?(r=t,t=0,n=this.length):"string"==typeof n&&(r=n,n=this.length),1===e.length){var o=e.charCodeAt(0);o<256&&(e=o)}if(void 0!==r&&"string"!=typeof r)throw new TypeError("encoding must be a string");if("string"==typeof r&&!s.isEncoding(r))throw new TypeError("Unknown encoding: "+r)}else"number"==typeof e&&(e=255&e);if(t<0||this.length<t||this.length<n)throw new RangeError("Out of range index");if(n<=t)return this;t>>>=0,n=void 0===n?this.length:n>>>0,e||(e=0);var i;if("number"==typeof e)for(i=t;i<n;++i)this[i]=e;else{var a=s.isBuffer(e)?e:Y(new s(e,r).toString()),u=a.length;for(i=0;i<n-t;++i)this[i+t]=a[i%u]}return this};var te=/[^+\/0-9A-Za-z-_]/g}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"base64-js":8,ieee754:40,isarray:47}],25:[function(e,t,n){t.exports={100:"Continue",101:"Switching Protocols",102:"Processing",200:"OK",201:"Created",202:"Accepted",203:"Non-Authoritative Information",204:"No Content",205:"Reset Content",206:"Partial Content",207:"Multi-Status",208:"Already Reported",226:"IM Used",300:"Multiple Choices",301:"Moved Permanently",302:"Found",303:"See Other",304:"Not Modified",305:"Use Proxy",307:"Temporary Redirect",308:"Permanent Redirect",400:"Bad Request",401:"Unauthorized",402:"Payment Required",403:"Forbidden",404:"Not Found",405:"Method Not Allowed",406:"Not Acceptable",407:"Proxy Authentication Required",408:"Request Timeout",409:"Conflict",410:"Gone",411:"Length Required",412:"Precondition Failed",413:"Payload Too Large",414:"URI Too Long",415:"Unsupported Media Type",416:"Range Not Satisfiable",417:"Expectation Failed",418:"I'm a teapot",421:"Misdirected Request",422:"Unprocessable Entity",423:"Locked",424:"Failed Dependency",425:"Unordered Collection",426:"Upgrade Required",428:"Precondition Required",429:"Too Many Requests",431:"Request Header Fields Too Large",500:"Internal Server Error",501:"Not Implemented",502:"Bad Gateway",503:"Service Unavailable",504:"Gateway Timeout",505:"HTTP Version Not Supported",506:"Variant Also Negotiates",507:"Insufficient Storage",508:"Loop Detected",509:"Bandwidth Limit Exceeded",510:"Not Extended",511:"Network Authentication Required"}},{}],26:[function(e,t,n){function r(e,t,n){function i(t){a.destroyed||(e.put(u,t),u+=1)}var a=this;if(!(a instanceof r))return new r(e,t,n);if(s.Writable.call(a,n),n||(n={}),!e||!e.put||!e.get)throw new Error("First argument must be an abstract-chunk-store compliant store");if(t=Number(t),!t)throw new Error("Second argument must be a chunk length");a._blockstream=new o(t,{zeroPadding:!1}),a._blockstream.on("data",i).on("error",function(e){a.destroy(e)});var u=0;a.on("finish",function(){this._blockstream.end()})}t.exports=r;var o=e("block-stream2"),i=e("inherits"),s=e("readable-stream");i(r,s.Writable),r.prototype._write=function(e,t,n){this._blockstream.write(e,t,n)},r.prototype.destroy=function(e){this.destroyed||(this.destroyed=!0,e&&this.emit("error",e),this.emit("close"))}},{"block-stream2":20,inherits:42,"readable-stream":82}],27:[function(e,t,n){t.exports=function(e,t){var n=1/0,r=0,o=null;t.sort(function(e,t){return e-t});for(var i=0,s=t.length;i<s&&(r=Math.abs(e-t[i]),!(r>=n));i++)n=r,o=t[i];return o}},{}],28:[function(e,t,n){(function(e){function t(e){return Array.isArray?Array.isArray(e):"[object Array]"===g(e)}function r(e){return"boolean"==typeof e}function o(e){return null===e}function i(e){return null==e}function s(e){return"number"==typeof e}function a(e){return"string"==typeof e}function u(e){return"symbol"==typeof e}function c(e){return void 0===e}function f(e){return"[object RegExp]"===g(e)}function d(e){return"object"==typeof e&&null!==e}function h(e){return"[object Date]"===g(e)}function l(e){return"[object Error]"===g(e)||e instanceof Error}function p(e){return"function"==typeof e}function m(e){return null===e||"boolean"==typeof e||"number"==typeof e||"string"==typeof e||"symbol"==typeof e||"undefined"==typeof e}function g(e){return Object.prototype.toString.call(e)}n.isArray=t,n.isBoolean=r,n.isNull=o,n.isNullOrUndefined=i,n.isNumber=s,n.isString=a,n.isSymbol=u,n.isUndefined=c,n.isRegExp=f,n.isObject=d,n.isDate=h,n.isError=l,n.isFunction=p,n.isPrimitive=m,n.isBuffer=e.isBuffer}).call(this,{isBuffer:e("../../is-buffer/index.js")})},{"../../is-buffer/index.js":44}],29:[function(e,t,n){(function(n,r,o){function i(e,t,n){return"function"==typeof t?i(e,null,t):(t=t?B(t):{},void a(e,t,function(e,r,o){return e?n(e):(t.singleFileTorrent=o,void l(r,t,n))}))}function s(e,t,n){return"function"==typeof t?s(e,null,t):(t=t?B(t):{},void a(e,t,n))}function a(e,t,r){function i(){P(e.map(function(e){return function(t){var n={};if(m(e))n.getStream=_(e),n.length=e.size;else if(o.isBuffer(e))n.getStream=v(e),n.length=e.length;else{if(!y(e)){if("string"==typeof e){if("function"!=typeof T.stat)throw new Error("filesystem paths do not work in the browser");var r=a>1||c;return void u(e,r,t)}throw new Error("invalid input type")}n.getStream=w(e,n),n.length=0}n.path=e.path,t(null,n)}}),function(e,t){return e?r(e):(t=A(t),void r(null,t,c))})}if(Array.isArray(e)&&0===e.length)throw new Error("invalid input type");g(e)&&(e=Array.prototype.slice.call(e)),Array.isArray(e)||(e=[e]),e=e.map(function(e){return m(e)&&"string"==typeof e.path&&"function"==typeof T.stat?e.path:e}),1!==e.length||"string"==typeof e[0]||e[0].name||(e[0].name=t.name);var s=null;e.forEach(function(t,n){if("string"!=typeof t){var r=t.fullPath||t.name;r||(r="Unknown File "+(n+1),t.unknownName=!0),t.path=r.split("/"),t.path[0]||t.path.shift(),t.path.length<2?s=null:0===n&&e.length>1?s=t.path[0]:t.path[0]!==s&&(s=null)}}),e=e.filter(function(e){if("string"==typeof e)return!0;var t=e.path[e.path.length-1];return d(t)&&L.not(t)}),s&&e.forEach(function(e){var t=(o.isBuffer(e)||y(e))&&!e.path;"string"==typeof e||t||e.path.shift()}),!t.name&&s&&(t.name=s),t.name||e.some(function(e){return"string"==typeof e?(t.name=S.basename(e),!0):e.unknownName?void 0:(t.name=e.path[e.path.length-1],!0)}),t.name||(t.name="Unnamed Torrent "+Date.now());var a=e.reduce(function(e,t){return e+Number("string"==typeof t)},0),c=1===e.length;if(1===e.length&&"string"==typeof e[0]){if("function"!=typeof T.stat)throw new Error("filesystem paths do not work in the browser");C(e[0],function(e,t){return e?r(e):(c=t,void i())})}else n.nextTick(function(){i()})}function u(e,t,n){f(e,c,function(r,o){return r?n(r):(o=Array.isArray(o)?A(o):[o],e=S.normalize(e),t&&(e=e.slice(0,e.lastIndexOf(S.sep)+1)),e[e.length-1]!==S.sep&&(e+=S.sep),o.forEach(function(t){t.getStream=b(t.path),t.path=t.path.replace(e,"").split(S.sep)}),void n(null,o))})}function c(e,t){t=U(t),T.stat(e,function(n,r){if(n)return t(n);var o={length:r.size,path:e};t(null,o)})}function f(e,t,n){T.readdir(e,function(r,o){r&&"ENOTDIR"===r.code?t(e,n):r?n(r):P(o.filter(d).filter(L.not).map(function(n){return function(r){f(S.join(e,n),t,r)}}),n)})}function d(e){return"."!==e[0]}function h(e,t,n){function r(e){f+=e.length;var t=l;O(e,function(e){c[t]=e,h-=1,u()}),h+=1,l+=1}function i(){p=!0,u()}function s(e){a(),n(e)}function a(){m.removeListener("error",s),g.removeListener("data",r),g.removeListener("end",i),g.removeListener("error",s)}function u(){p&&0===h&&(a(),n(null,new o(c.join(""),"hex"),f))}n=U(n);var c=[],f=0,d=e.map(function(e){return e.getStream}),h=0,l=0,p=!1,m=new R(d),g=new k(t,{zeroPadding:!1});m.on("error",s),m.pipe(g).on("data",r).on("end",i).on("error",s)}function l(e,n,o){var i=n.announceList;i||("string"==typeof n.announce?i=[[n.announce]]:Array.isArray(n.announce)&&(i=n.announce.map(function(e){return[e]}))),i||(i=[]),r.WEBTORRENT_ANNOUNCE&&("string"==typeof r.WEBTORRENT_ANNOUNCE?i.push([[r.WEBTORRENT_ANNOUNCE]]):Array.isArray(r.WEBTORRENT_ANNOUNCE)&&(i=i.concat(r.WEBTORRENT_ANNOUNCE.map(function(e){return[e]})))),void 0===n.announce&&void 0===n.announceList&&(i=i.concat(t.exports.announceList)),"string"==typeof n.urlList&&(n.urlList=[n.urlList]);var s={info:{name:n.name},"creation date":Math.ceil((Number(n.creationDate)||Date.now())/1e3),encoding:"UTF-8"};0!==i.length&&(s.announce=i[0][0],s["announce-list"]=i),void 0!==n.comment&&(s.comment=n.comment),void 0!==n.createdBy&&(s["created by"]=n.createdBy),void 0!==n.private&&(s.info.private=Number(n.private)),void 0!==n.sslCert&&(s.info["ssl-cert"]=n.sslCert),void 0!==n.urlList&&(s["url-list"]=n.urlList);var a=n.pieceLength||x(e.reduce(p,0));s.info["piece length"]=a,h(e,a,function(t,r,i){return t?o(t):(s.info.pieces=r,e.forEach(function(e){delete e.getStream}),n.singleFileTorrent?s.info.length=i:s.info.files=e,void o(null,E.encode(s)))})}function p(e,t){return e+t.length}function m(e){return"undefined"!=typeof Blob&&e instanceof Blob}function g(e){return"undefined"!=typeof FileList&&e instanceof FileList}function y(e){return"object"==typeof e&&null!=e&&"function"==typeof e.pipe}function _(e){return function(){return new I(e)}}function v(e){return function(){var t=new M.PassThrough;return t.end(e),t}}function b(e){return function(){return T.createReadStream(e)}}function w(e,t){return function(){var n=new M.Transform;return n._transform=function(e,n,r){t.length+=e.length,this.push(e),r()},e.pipe(n),n}}t.exports=i,t.exports.parseInput=s,t.exports.announceList=[["udp://tracker.openbittorrent.com:80"],["udp://tracker.internetwarriors.net:1337"],["udp://tracker.leechers-paradise.org:6969"],["udp://tracker.coppersurfer.tk:6969"],["udp://exodus.desync.com:6969"],["wss://tracker.btorrent.xyz"],["wss://tracker.openwebtorrent.com"],["wss://tracker.fastcast.nz"]];
var E=e("bencode"),k=e("block-stream2"),x=e("piece-length"),S=e("path"),B=e("xtend"),I=e("filestream/read"),A=e("flatten"),T=e("fs"),C=e("is-file"),L=e("junk"),R=e("multistream"),U=e("once"),P=e("run-parallel"),O=e("simple-sha1"),M=e("readable-stream")}).call(this,e("_process"),"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer)},{_process:67,bencode:11,"block-stream2":20,buffer:24,"filestream/read":36,flatten:37,fs:22,"is-file":45,junk:48,multistream:59,once:61,path:64,"piece-length":65,"readable-stream":82,"run-parallel":86,"simple-sha1":92,xtend:119}],30:[function(e,t,n){function r(){return"WebkitAppearance"in document.documentElement.style||window.console&&(console.firebug||console.exception&&console.table)||navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31}function o(){var e=arguments,t=this.useColors;if(e[0]=(t?"%c":"")+this.namespace+(t?" %c":" ")+e[0]+(t?"%c ":" ")+"+"+n.humanize(this.diff),!t)return e;var r="color: "+this.color;e=[e[0],r,"color: inherit"].concat(Array.prototype.slice.call(e,1));var o=0,i=0;return e[0].replace(/%[a-z%]/g,function(e){"%%"!==e&&(o++,"%c"===e&&(i=o))}),e.splice(i,0,r),e}function i(){return"object"==typeof console&&console.log&&Function.prototype.apply.call(console.log,console,arguments)}function s(e){try{null==e?n.storage.removeItem("debug"):n.storage.debug=e}catch(e){}}function a(){var e;try{e=n.storage.debug}catch(e){}return e}function u(){try{return window.localStorage}catch(e){}}n=t.exports=e("./debug"),n.log=i,n.formatArgs=o,n.save=s,n.load=a,n.useColors=r,n.storage="undefined"!=typeof chrome&&"undefined"!=typeof chrome.storage?chrome.storage.local:u(),n.colors=["lightseagreen","forestgreen","goldenrod","dodgerblue","darkorchid","crimson"],n.formatters.j=function(e){return JSON.stringify(e)},n.enable(a())},{"./debug":31}],31:[function(e,t,n){function r(){return n.colors[f++%n.colors.length]}function o(e){function t(){}function o(){var e=o,t=+new Date,i=t-(c||t);e.diff=i,e.prev=c,e.curr=t,c=t,null==e.useColors&&(e.useColors=n.useColors()),null==e.color&&e.useColors&&(e.color=r());var s=Array.prototype.slice.call(arguments);s[0]=n.coerce(s[0]),"string"!=typeof s[0]&&(s=["%o"].concat(s));var a=0;s[0]=s[0].replace(/%([a-z%])/g,function(t,r){if("%%"===t)return t;a++;var o=n.formatters[r];if("function"==typeof o){var i=s[a];t=o.call(e,i),s.splice(a,1),a--}return t}),"function"==typeof n.formatArgs&&(s=n.formatArgs.apply(e,s));var u=o.log||n.log||console.log.bind(console);u.apply(e,s)}t.enabled=!1,o.enabled=!0;var i=n.enabled(e)?o:t;return i.namespace=e,i}function i(e){n.save(e);for(var t=(e||"").split(/[\s,]+/),r=t.length,o=0;o<r;o++)t[o]&&(e=t[o].replace(/\*/g,".*?"),"-"===e[0]?n.skips.push(new RegExp("^"+e.substr(1)+"$")):n.names.push(new RegExp("^"+e+"$")))}function s(){n.enable("")}function a(e){var t,r;for(t=0,r=n.skips.length;t<r;t++)if(n.skips[t].test(e))return!1;for(t=0,r=n.names.length;t<r;t++)if(n.names[t].test(e))return!0;return!1}function u(e){return e instanceof Error?e.stack||e.message:e}n=t.exports=o,n.coerce=u,n.disable=s,n.enable=i,n.enabled=a,n.humanize=e("ms"),n.names=[],n.skips=[],n.formatters={};var c,f=0},{ms:58}],32:[function(e,t,n){t.exports=function(){for(var e=0;e<arguments.length;e++)if(void 0!==arguments[e])return arguments[e]}},{}],33:[function(e,t,n){var r=e("once"),o=function(){},i=function(e){return e.setHeader&&"function"==typeof e.abort},s=function(e){return e.stdio&&Array.isArray(e.stdio)&&3===e.stdio.length},a=function(e,t,n){if("function"==typeof t)return a(e,null,t);t||(t={}),n=r(n||o);var u=e._writableState,c=e._readableState,f=t.readable||t.readable!==!1&&e.readable,d=t.writable||t.writable!==!1&&e.writable,h=function(){e.writable||l()},l=function(){d=!1,f||n()},p=function(){f=!1,d||n()},m=function(e){n(e?new Error("exited with error code: "+e):null)},g=function(){return(!f||c&&c.ended)&&(!d||u&&u.ended)?void 0:n(new Error("premature close"))},y=function(){e.req.on("finish",l)};return i(e)?(e.on("complete",l),e.on("abort",g),e.req?y():e.on("request",y)):d&&!u&&(e.on("end",h),e.on("close",h)),s(e)&&e.on("exit",m),e.on("end",p),e.on("finish",l),t.error!==!1&&e.on("error",n),e.on("close",g),function(){e.removeListener("complete",l),e.removeListener("abort",g),e.removeListener("request",y),e.req&&e.req.removeListener("finish",l),e.removeListener("end",h),e.removeListener("close",h),e.removeListener("finish",l),e.removeListener("exit",m),e.removeListener("end",p),e.removeListener("error",n),e.removeListener("close",g)}};t.exports=a},{once:34}],34:[function(e,t,n){function r(e){var t=function(){return t.called?t.value:(t.called=!0,t.value=e.apply(this,arguments))};return t.called=!1,t}var o=e("wrappy");t.exports=o(r),r.proto=r(function(){Object.defineProperty(Function.prototype,"once",{value:function(){return r(this)},configurable:!0})})},{wrappy:118}],35:[function(e,t,n){function r(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function o(e){return"function"==typeof e}function i(e){return"number"==typeof e}function s(e){return"object"==typeof e&&null!==e}function a(e){return void 0===e}t.exports=r,r.EventEmitter=r,r.prototype._events=void 0,r.prototype._maxListeners=void 0,r.defaultMaxListeners=10,r.prototype.setMaxListeners=function(e){if(!i(e)||e<0||isNaN(e))throw TypeError("n must be a positive number");return this._maxListeners=e,this},r.prototype.emit=function(e){var t,n,r,i,u,c;if(this._events||(this._events={}),"error"===e&&(!this._events.error||s(this._events.error)&&!this._events.error.length)){if(t=arguments[1],t instanceof Error)throw t;var f=new Error('Uncaught, unspecified "error" event. ('+t+")");throw f.context=t,f}if(n=this._events[e],a(n))return!1;if(o(n))switch(arguments.length){case 1:n.call(this);break;case 2:n.call(this,arguments[1]);break;case 3:n.call(this,arguments[1],arguments[2]);break;default:i=Array.prototype.slice.call(arguments,1),n.apply(this,i)}else if(s(n))for(i=Array.prototype.slice.call(arguments,1),c=n.slice(),r=c.length,u=0;u<r;u++)c[u].apply(this,i);return!0},r.prototype.addListener=function(e,t){var n;if(!o(t))throw TypeError("listener must be a function");return this._events||(this._events={}),this._events.newListener&&this.emit("newListener",e,o(t.listener)?t.listener:t),this._events[e]?s(this._events[e])?this._events[e].push(t):this._events[e]=[this._events[e],t]:this._events[e]=t,s(this._events[e])&&!this._events[e].warned&&(n=a(this._maxListeners)?r.defaultMaxListeners:this._maxListeners,n&&n>0&&this._events[e].length>n&&(this._events[e].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[e].length),"function"==typeof console.trace&&console.trace())),this},r.prototype.on=r.prototype.addListener,r.prototype.once=function(e,t){function n(){this.removeListener(e,n),r||(r=!0,t.apply(this,arguments))}if(!o(t))throw TypeError("listener must be a function");var r=!1;return n.listener=t,this.on(e,n),this},r.prototype.removeListener=function(e,t){var n,r,i,a;if(!o(t))throw TypeError("listener must be a function");if(!this._events||!this._events[e])return this;if(n=this._events[e],i=n.length,r=-1,n===t||o(n.listener)&&n.listener===t)delete this._events[e],this._events.removeListener&&this.emit("removeListener",e,t);else if(s(n)){for(a=i;a-- >0;)if(n[a]===t||n[a].listener&&n[a].listener===t){r=a;break}if(r<0)return this;1===n.length?(n.length=0,delete this._events[e]):n.splice(r,1),this._events.removeListener&&this.emit("removeListener",e,t)}return this},r.prototype.removeAllListeners=function(e){var t,n;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[e]&&delete this._events[e],this;if(0===arguments.length){for(t in this._events)"removeListener"!==t&&this.removeAllListeners(t);return this.removeAllListeners("removeListener"),this._events={},this}if(n=this._events[e],o(n))this.removeListener(e,n);else if(n)for(;n.length;)this.removeListener(e,n[n.length-1]);return delete this._events[e],this},r.prototype.listeners=function(e){var t;return t=this._events&&this._events[e]?o(this._events[e])?[this._events[e]]:this._events[e].slice():[]},r.prototype.listenerCount=function(e){if(this._events){var t=this._events[e];if(o(t))return 1;if(t)return t.length}return 0},r.listenerCount=function(e,t){return e.listenerCount(t)}},{}],36:[function(e,t,n){function r(e,t){var n=this;return this instanceof r?(t=t||{},o.call(this,t),this._offset=0,this._ready=!1,this._file=e,this._size=e.size,this._chunkSize=t.chunkSize||Math.max(this._size/1e3,204800),this.reader=new FileReader,void this._generateHeaderBlocks(e,t,function(e,t){return e?n.emit("error",e):(Array.isArray(t)&&t.forEach(function(e){n.push(e)}),n._ready=!0,void n.emit("_ready"))})):new r(e,t)}var o=e("readable-stream").Readable,i=e("inherits"),s=e("typedarray-to-buffer");i(r,o),t.exports=r,r.prototype._generateHeaderBlocks=function(e,t,n){n(null,[])},r.prototype._read=function(){if(!this._ready)return void this.once("_ready",this._read.bind(this));var e=this,t=this.reader,n=this._offset,r=this._offset+this._chunkSize;return r>this._size&&(r=this._size),n===this._size?(this.destroy(),void this.push(null)):(t.onload=function(){e._offset=r,e.push(s(t.result))},t.onerror=function(){e.emit("error",t.error)},void t.readAsArrayBuffer(this._file.slice(n,r)))},r.prototype.destroy=function(){if(this._file=null,this.reader){this.reader.onload=null,this.reader.onerror=null;try{this.reader.abort()}catch(e){}}this.reader=null}},{inherits:42,"readable-stream":82,"typedarray-to-buffer":108}],37:[function(e,t,n){t.exports=function(e,t){function n(e,r){return e.reduce(function(e,o){return Array.isArray(o)&&r<t?e.concat(n(o,r+1)):e.concat(o)},[])}return t="number"==typeof t?t:1/0,t?n(e,1):Array.isArray(e)?e.map(function(e){return e}):e}},{}],38:[function(e,t,n){t.exports=function(){if("undefined"==typeof window)return null;var e={RTCPeerConnection:window.RTCPeerConnection||window.mozRTCPeerConnection||window.webkitRTCPeerConnection,RTCSessionDescription:window.RTCSessionDescription||window.mozRTCSessionDescription||window.webkitRTCSessionDescription,RTCIceCandidate:window.RTCIceCandidate||window.mozRTCIceCandidate||window.webkitRTCIceCandidate};return e.RTCPeerConnection?e:null}},{}],39:[function(e,t,n){var r=e("http"),o=t.exports;for(var i in r)r.hasOwnProperty(i)&&(o[i]=r[i]);o.request=function(e,t){return e||(e={}),e.scheme="https",e.protocol="https:",r.request.call(this,e,t)}},{http:95}],40:[function(e,t,n){n.read=function(e,t,n,r,o){var i,s,a=8*o-r-1,u=(1<<a)-1,c=u>>1,f=-7,d=n?o-1:0,h=n?-1:1,l=e[t+d];for(d+=h,i=l&(1<<-f)-1,l>>=-f,f+=a;f>0;i=256*i+e[t+d],d+=h,f-=8);for(s=i&(1<<-f)-1,i>>=-f,f+=r;f>0;s=256*s+e[t+d],d+=h,f-=8);if(0===i)i=1-c;else{if(i===u)return s?NaN:(l?-1:1)*(1/0);s+=Math.pow(2,r),i-=c}return(l?-1:1)*s*Math.pow(2,i-r)},n.write=function(e,t,n,r,o,i){var s,a,u,c=8*i-o-1,f=(1<<c)-1,d=f>>1,h=23===o?Math.pow(2,-24)-Math.pow(2,-77):0,l=r?0:i-1,p=r?1:-1,m=t<0||0===t&&1/t<0?1:0;for(t=Math.abs(t),isNaN(t)||t===1/0?(a=isNaN(t)?1:0,s=f):(s=Math.floor(Math.log(t)/Math.LN2),t*(u=Math.pow(2,-s))<1&&(s--,u*=2),t+=s+d>=1?h/u:h*Math.pow(2,1-d),t*u>=2&&(s++,u/=2),s+d>=f?(a=0,s=f):s+d>=1?(a=(t*u-1)*Math.pow(2,o),s+=d):(a=t*Math.pow(2,d-1)*Math.pow(2,o),s=0));o>=8;e[n+l]=255&a,l+=p,a/=256,o-=8);for(s=s<<o|a,c+=o;c>0;e[n+l]=255&s,l+=p,s/=256,c-=8);e[n+l-p]|=128*m}},{}],41:[function(e,t,n){(function(e){function n(e){if(!(this instanceof n))return new n(e);if(this.store=e,this.chunkLength=e.chunkLength,!this.store||!this.store.get||!this.store.put)throw new Error("First argument must be abstract-chunk-store compliant");this.mem=[]}function r(t,n,r){e.nextTick(function(){t&&t(n,r)})}t.exports=n,n.prototype.put=function(e,t,n){var r=this;r.mem[e]=t,r.store.put(e,t,function(t){r.mem[e]=null,n&&n(t)})},n.prototype.get=function(e,t,n){if("function"==typeof t)return this.get(e,null,t);var o=t&&t.offset||0,i=t&&t.length&&o+t.length,s=this.mem[e];return s?r(n,null,t?s.slice(o,i):s):void this.store.get(e,t,n)},n.prototype.close=function(e){this.store.close(e)},n.prototype.destroy=function(e){this.store.destroy(e)}}).call(this,e("_process"))},{_process:67}],42:[function(e,t,n){"function"==typeof Object.create?t.exports=function(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})}:t.exports=function(e,t){e.super_=t;var n=function(){};n.prototype=t.prototype,e.prototype=new n,e.prototype.constructor=e}},{}],43:[function(e,t,n){var r=127;t.exports=function(e){for(var t=0,n=e.length;t<n;++t)if(e.charCodeAt(t)>r)return!1;return!0}},{}],44:[function(e,t,n){function r(e){return!!e.constructor&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}function o(e){return"function"==typeof e.readFloatLE&&"function"==typeof e.slice&&r(e.slice(0,0))}t.exports=function(e){return null!=e&&(r(e)||o(e)||!!e._isBuffer)}},{}],45:[function(e,t,n){"use strict";function r(e){return o.existsSync(e)&&o.statSync(e).isFile()}var o=e("fs");t.exports=function(e,t){return t?void o.stat(e,function(e,n){return e?t(e):t(null,n.isFile())}):r(e)},t.exports.sync=r},{fs:22}],46:[function(e,t,n){function r(e){return o(e)||i(e)}function o(e){return e instanceof Int8Array||e instanceof Int16Array||e instanceof Int32Array||e instanceof Uint8Array||e instanceof Uint8ClampedArray||e instanceof Uint16Array||e instanceof Uint32Array||e instanceof Float32Array||e instanceof Float64Array}function i(e){return a[s.call(e)]}t.exports=r,r.strict=o,r.loose=i;var s=Object.prototype.toString,a={"[object Int8Array]":!0,"[object Int16Array]":!0,"[object Int32Array]":!0,"[object Uint8Array]":!0,"[object Uint8ClampedArray]":!0,"[object Uint16Array]":!0,"[object Uint32Array]":!0,"[object Float32Array]":!0,"[object Float64Array]":!0}},{}],47:[function(e,t,n){var r={}.toString;t.exports=Array.isArray||function(e){return"[object Array]"==r.call(e)}},{}],48:[function(e,t,n){"use strict";n.re=/^npm-debug\.log$|^\..*\.swp$|^\.DS_Store$|^\.AppleDouble$|^\.LSOverride$|^Icon\r$|^\._.*|^\.Spotlight-V100$|\.Trashes|^__MACOSX$|~$|^Thumbs\.db$|^ehthumbs\.db$|^Desktop\.ini$/,n.is=function(e){return n.re.test(e)},n.not=n.isnt=function(e){return!n.is(e)}},{}],49:[function(e,t,n){(function(n){function r(e){var t={},r=e.split("magnet:?")[1],o=r&&r.length>=0?r.split("&"):[];o.forEach(function(e){var n=e.split("=");if(2===n.length){var r=n[0],o=n[1];if("dn"===r&&(o=decodeURIComponent(o).replace(/\+/g," ")),"tr"!==r&&"xs"!==r&&"as"!==r&&"ws"!==r||(o=decodeURIComponent(o)),"kt"===r&&(o=decodeURIComponent(o).split("+")),t[r])if(Array.isArray(t[r]))t[r].push(o);else{var i=t[r];t[r]=[i,o]}else t[r]=o}});var s;if(t.xt){var u=Array.isArray(t.xt)?t.xt:[t.xt];u.forEach(function(e){if(s=e.match(/^urn:btih:(.{40})/))t.infoHash=s[1].toLowerCase();else if(s=e.match(/^urn:btih:(.{32})/)){var r=i.decode(s[1]);t.infoHash=new n(r,"binary").toString("hex")}})}return t.infoHash&&(t.infoHashBuffer=new n(t.infoHash,"hex")),t.dn&&(t.name=t.dn),t.kt&&(t.keywords=t.kt),"string"==typeof t.tr?t.announce=[t.tr]:Array.isArray(t.tr)?t.announce=t.tr:t.announce=[],t.urlList=[],("string"==typeof t.as||Array.isArray(t.as))&&(t.urlList=t.urlList.concat(t.as)),("string"==typeof t.ws||Array.isArray(t.ws))&&(t.urlList=t.urlList.concat(t.ws)),a(t.announce),a(t.urlList),t}function o(e){e=s(e),e.infoHashBuffer&&(e.xt="urn:btih:"+e.infoHashBuffer.toString("hex")),e.infoHash&&(e.xt="urn:btih:"+e.infoHash),e.name&&(e.dn=e.name),e.keywords&&(e.kt=e.keywords),e.announce&&(e.tr=e.announce),e.urlList&&(e.ws=e.urlList,delete e.as);var t="magnet:?";return Object.keys(e).filter(function(e){return 2===e.length}).forEach(function(n,r){var o=Array.isArray(e[n])?e[n]:[e[n]];o.forEach(function(e,o){!(r>0||o>0)||"kt"===n&&0!==o||(t+="&"),"dn"===n&&(e=encodeURIComponent(e).replace(/%20/g,"+")),"tr"!==n&&"xs"!==n&&"as"!==n&&"ws"!==n||(e=encodeURIComponent(e)),"kt"===n&&(e=encodeURIComponent(e)),t+="kt"===n&&o>0?"+"+e:n+"="+e})}),t}t.exports=r,t.exports.decode=r,t.exports.encode=o;var i=e("thirty-two"),s=e("xtend"),a=e("uniq")}).call(this,e("buffer").Buffer)},{buffer:24,"thirty-two":103,uniq:110,xtend:119}],50:[function(e,t,n){function r(e,t){var n=this;if(!(n instanceof r))return new r(e,t);if(!u)throw new Error("web browser lacks MediaSource support");t||(t={}),n._bufferDuration=t.bufferDuration||c,n._elem=e,n._mediaSource=new u,n._streams=[],n.detailedError=null,n._errorHandler=function(){n._elem.removeEventListener("error",n._errorHandler);var e=n._streams.slice();e.forEach(function(e){e.destroy(n._elem.error)})},n._elem.addEventListener("error",n._errorHandler),n._elem.src=window.URL.createObjectURL(n._mediaSource)}function o(e,t){var n=this;if(s.Writable.call(n),n._wrapper=e,n._elem=e._elem,n._mediaSource=e._mediaSource,n._allStreams=e._streams,n._allStreams.push(n),n._bufferDuration=e._bufferDuration,n._sourceBuffer=null,n._openHandler=function(){n._onSourceOpen()},n._flowHandler=function(){n._flow()},"string"==typeof t)n._type=t,"open"===n._mediaSource.readyState?n._createSourceBuffer():n._mediaSource.addEventListener("sourceopen",n._openHandler);else if(null===t._sourceBuffer)t.destroy(),n._type=t._type,n._mediaSource.addEventListener("sourceopen",n._openHandler);else{if(!t._sourceBuffer)throw new Error("The argument to MediaElementWrapper.createWriteStream must be a string or a previous stream returned from that function");t.destroy(),n._type=t._type,n._sourceBuffer=t._sourceBuffer,n._sourceBuffer.addEventListener("updateend",n._flowHandler)}n._elem.addEventListener("timeupdate",n._flowHandler),n.on("error",function(e){n._wrapper.error(e)}),n.on("finish",function(){if(!n.destroyed&&(n._finished=!0,n._allStreams.every(function(e){return e._finished})))try{n._mediaSource.endOfStream()}catch(e){}})}t.exports=r;var i=e("inherits"),s=e("readable-stream"),a=e("to-arraybuffer"),u="undefined"!=typeof window&&window.MediaSource,c=60;r.prototype.createWriteStream=function(e){var t=this;return new o(t,e)},r.prototype.error=function(e){var t=this;t.detailedError||(t.detailedError=e);try{t._mediaSource.endOfStream("decode")}catch(e){}},i(o,s.Writable),o.prototype._onSourceOpen=function(){var e=this;e.destroyed||(e._mediaSource.removeEventListener("sourceopen",e._openHandler),e._createSourceBuffer())},o.prototype.destroy=function(e){var t=this;t.destroyed||(t.destroyed=!0,t._allStreams.splice(t._allStreams.indexOf(t),1),t._mediaSource.removeEventListener("sourceopen",t._openHandler),t._elem.removeEventListener("timeupdate",t._flowHandler),t._sourceBuffer&&(t._sourceBuffer.removeEventListener("updateend",t._flowHandler),"open"===t._mediaSource.readyState&&t._sourceBuffer.abort()),e&&t.emit("error",e),t.emit("close"))},o.prototype._createSourceBuffer=function(){var e=this;if(!e.destroyed)if(u.isTypeSupported(e._type)){if(e._sourceBuffer=e._mediaSource.addSourceBuffer(e._type),e._sourceBuffer.addEventListener("updateend",e._flowHandler),e._cb){var t=e._cb;e._cb=null,t()}}else e.destroy(new Error("The provided type is not supported"))},o.prototype._write=function(e,t,n){var r=this;if(!r.destroyed){if(!r._sourceBuffer)return void(r._cb=function(o){return o?n(o):void r._write(e,t,n)});if(r._sourceBuffer.updating)return n(new Error("Cannot append buffer while source buffer updating"));try{r._sourceBuffer.appendBuffer(a(e))}catch(e){return void r.destroy(e)}r._cb=n}},o.prototype._flow=function(){var e=this;if(!e.destroyed&&e._sourceBuffer&&!e._sourceBuffer.updating&&!("open"===e._mediaSource.readyState&&e._getBufferDuration()>e._bufferDuration)&&e._cb){var t=e._cb;e._cb=null,t()}};var f=0;o.prototype._getBufferDuration=function(){for(var e=this,t=e._sourceBuffer.buffered,n=e._elem.currentTime,r=-1,o=0;o<t.length;o++){var i=t.start(o),s=t.end(o)+f;if(i>n)break;(r>=0||n<=s)&&(r=s)}var a=r-n;return a<0&&(a=0),a}},{inherits:42,"readable-stream":82,"to-arraybuffer":105}],51:[function(e,t,n){(function(e){function n(e,t){if(!(this instanceof n))return new n(e,t);if(t||(t={}),this.chunkLength=Number(e),!this.chunkLength)throw new Error("First argument must be a chunk length");this.chunks=[],this.closed=!1,this.length=Number(t.length)||1/0,this.length!==1/0&&(this.lastChunkLength=this.length%this.chunkLength||this.chunkLength,this.lastChunkIndex=Math.ceil(this.length/this.chunkLength)-1)}function r(t,n,r){e.nextTick(function(){t&&t(n,r)})}t.exports=n,n.prototype.put=function(e,t,n){if(this.closed)return r(n,new Error("Storage is closed"));var o=e===this.lastChunkIndex;return o&&t.length!==this.lastChunkLength?r(n,new Error("Last chunk length must be "+this.lastChunkLength)):o||t.length===this.chunkLength?(this.chunks[e]=t,void r(n,null)):r(n,new Error("Chunk length must be "+this.chunkLength))},n.prototype.get=function(e,t,n){if("function"==typeof t)return this.get(e,null,t);if(this.closed)return r(n,new Error("Storage is closed"));var o=this.chunks[e];if(!o)return r(n,new Error("Chunk not found"));if(!t)return r(n,null,o);var i=t.offset||0,s=t.length||o.length-i;r(n,null,o.slice(i,s+i))},n.prototype.close=n.prototype.destroy=function(e){return this.closed?r(e,new Error("Storage is closed")):(this.closed=!0,this.chunks=null,void r(e,null))}}).call(this,e("_process"))},{_process:67}],52:[function(e,t,n){(function(t){function r(e,t,n){for(var r=t;r<n;r++)e[r]=0}function o(e,t,n){t.writeUInt32BE(Math.floor((e.getTime()+g)/1e3),n)}function i(e,t,n){t.writeUInt16BE(Math.floor(e)%65536,n),t.writeUInt16BE(Math.floor(256*e*256)%65536,n+2)}function s(e,t,n){t[n]=Math.floor(e)%256,t[n+1]=Math.floor(256*e)%256}function a(e,t,n){e||(e=[0,0,0,0,0,0,0,0,0]);for(var r=0;r<e.length;r++)i(e[r],t,n+4*r)}function u(e,n,r){var o=new t(e,"utf8");o.copy(n,r),n[r+o.length]=0}function c(e){for(var t=new Array(e.length/4),n=0;n<t.length;n++)t[n]=d(e,4*n);return t}function f(e,t){return new Date(1e3*e.readUInt32BE(t)-g)}function d(e,t){return e.readUInt16BE(t)+e.readUInt16BE(t+2)/65536}function h(e,t){return e[t]+e[t+1]/256}function l(e,t,n){var r;for(r=0;r<n&&0!==e[t+r];r++);return e.toString("utf8",t,t+r)}var p=e("./index"),m=e("./descriptor"),g=20828448e5;n.fullBoxes={};var y=["mvhd","tkhd","mdhd","vmhd","smhd","stsd","esds","stsz","stco","stss","stts","ctts","stsc","dref","elst","hdlr","mehd","trex","mfhd","tfhd","tfdt","trun"];y.forEach(function(e){n.fullBoxes[e]=!0}),n.ftyp={},n.ftyp.encode=function(e,r,o){r=r?r.slice(o):new t(n.ftyp.encodingLength(e));var i=e.compatibleBrands||[];r.write(e.brand,0,4,"ascii"),r.writeUInt32BE(e.brandVersion,4);for(var s=0;s<i.length;s++)r.write(i[s],8+4*s,4,"ascii");return n.ftyp.encode.bytes=8+4*i.length,r},n.ftyp.decode=function(e,t){e=e.slice(t);for(var n=e.toString("ascii",0,4),r=e.readUInt32BE(4),o=[],i=8;i<e.length;i+=4)o.push(e.toString("ascii",i,i+4));return{brand:n,brandVersion:r,compatibleBrands:o}},n.ftyp.encodingLength=function(e){return 8+4*(e.compatibleBrands||[]).length},n.mvhd={},n.mvhd.encode=function(e,u,c){return u=u?u.slice(c):new t(96),o(e.ctime||new Date,u,0),o(e.mtime||new Date,u,4),u.writeUInt32BE(e.timeScale||0,8),u.writeUInt32BE(e.duration||0,12),i(e.preferredRate||0,u,16),s(e.preferredVolume||0,u,20),r(u,22,32),a(e.matrix,u,32),u.writeUInt32BE(e.previewTime||0,68),u.writeUInt32BE(e.previewDuration||0,72),u.writeUInt32BE(e.posterTime||0,76),u.writeUInt32BE(e.selectionTime||0,80),u.writeUInt32BE(e.selectionDuration||0,84),u.writeUInt32BE(e.currentTime||0,88),u.writeUInt32BE(e.nextTrackId||0,92),n.mvhd.encode.bytes=96,u},n.mvhd.decode=function(e,t){return e=e.slice(t),{ctime:f(e,0),mtime:f(e,4),timeScale:e.readUInt32BE(8),duration:e.readUInt32BE(12),preferredRate:d(e,16),preferredVolume:h(e,20),matrix:c(e.slice(32,68)),previewTime:e.readUInt32BE(68),previewDuration:e.readUInt32BE(72),posterTime:e.readUInt32BE(76),selectionTime:e.readUInt32BE(80),selectionDuration:e.readUInt32BE(84),currentTime:e.readUInt32BE(88),nextTrackId:e.readUInt32BE(92)}},n.mvhd.encodingLength=function(e){return 96},n.tkhd={},n.tkhd.encode=function(e,i,s){return i=i?i.slice(s):new t(80),o(e.ctime||new Date,i,0),o(e.mtime||new Date,i,4),i.writeUInt32BE(e.trackId||0,8),r(i,12,16),i.writeUInt32BE(e.duration||0,16),r(i,20,28),i.writeUInt16BE(e.layer||0,28),i.writeUInt16BE(e.alternateGroup||0,30),i.writeUInt16BE(e.volume||0,32),a(e.matrix,i,36),i.writeUInt32BE(e.trackWidth||0,72),i.writeUInt32BE(e.trackHeight||0,76),n.tkhd.encode.bytes=80,i},n.tkhd.decode=function(e,t){return e=e.slice(t),{ctime:f(e,0),mtime:f(e,4),trackId:e.readUInt32BE(8),duration:e.readUInt32BE(16),layer:e.readUInt16BE(28),alternateGroup:e.readUInt16BE(30),volume:e.readUInt16BE(32),matrix:c(e.slice(36,72)),trackWidth:e.readUInt32BE(72),trackHeight:e.readUInt32BE(76)}},n.tkhd.encodingLength=function(e){return 80},n.mdhd={},n.mdhd.encode=function(e,r,i){return r=r?r.slice(i):new t(20),o(e.ctime||new Date,r,0),o(e.mtime||new Date,r,4),r.writeUInt32BE(e.timeScale||0,8),r.writeUInt32BE(e.duration||0,12),r.writeUInt16BE(e.language||0,16),r.writeUInt16BE(e.quality||0,18),n.mdhd.encode.bytes=20,r},n.mdhd.decode=function(e,t){return e=e.slice(t),{ctime:f(e,0),mtime:f(e,4),timeScale:e.readUInt32BE(8),duration:e.readUInt32BE(12),language:e.readUInt16BE(16),quality:e.readUInt16BE(18)}},n.mdhd.encodingLength=function(e){return 20},n.vmhd={},n.vmhd.encode=function(e,r,o){r=r?r.slice(o):new t(8),r.writeUInt16BE(e.graphicsMode||0,0);var i=e.opcolor||[0,0,0];return r.writeUInt16BE(i[0],2),r.writeUInt16BE(i[1],4),r.writeUInt16BE(i[2],6),n.vmhd.encode.bytes=8,r},n.vmhd.decode=function(e,t){return e=e.slice(t),{graphicsMode:e.readUInt16BE(0),opcolor:[e.readUInt16BE(2),e.readUInt16BE(4),e.readUInt16BE(6)]}},n.vmhd.encodingLength=function(e){return 8},n.smhd={},n.smhd.encode=function(e,o,i){return o=o?o.slice(i):new t(4),o.writeUInt16BE(e.balance||0,0),r(o,2,4),n.smhd.encode.bytes=4,o},n.smhd.decode=function(e,t){return e=e.slice(t),{balance:e.readUInt16BE(0)}},n.smhd.encodingLength=function(e){return 4},n.stsd={},n.stsd.encode=function(e,r,o){r=r?r.slice(o):new t(n.stsd.encodingLength(e));var i=e.entries||[];r.writeUInt32BE(i.length,0);for(var s=4,a=0;a<i.length;a++){var u=i[a];p.encode(u,r,s),s+=p.encode.bytes}return n.stsd.encode.bytes=s,r},n.stsd.decode=function(e,t,n){e=e.slice(t);for(var r=e.readUInt32BE(0),o=new Array(r),i=4,s=0;s<r;s++){var a=p.decode(e,i,n);o[s]=a,i+=a.length}return{entries:o}},n.stsd.encodingLength=function(e){var t=4;if(!e.entries)return t;for(var n=0;n<e.entries.length;n++)t+=p.encodingLength(e.entries[n]);return t},n.avc1=n.VisualSampleEntry={},n.VisualSampleEntry.encode=function(e,o,i){o=o?o.slice(i):new t(n.VisualSampleEntry.encodingLength(e)),r(o,0,6),o.writeUInt16BE(e.dataReferenceIndex||0,6),r(o,8,24),o.writeUInt16BE(e.width||0,24),o.writeUInt16BE(e.height||0,26),o.writeUInt32BE(e.hResolution||4718592,28),o.writeUInt32BE(e.vResolution||4718592,32),r(o,36,40),o.writeUInt16BE(e.frameCount||1,40);var s=e.compressorName||"",a=Math.min(s.length,31);o.writeUInt8(a,42),o.write(s,43,a,"utf8"),o.writeUInt16BE(e.depth||24,74),o.writeInt16BE(-1,76);var u=78,c=e.children||[];c.forEach(function(e){p.encode(e,o,u),u+=p.encode.bytes}),n.VisualSampleEntry.encode.bytes=u},n.VisualSampleEntry.decode=function(e,t,n){e=e.slice(t);for(var r=n-t,o=Math.min(e.readUInt8(42),31),i={dataReferenceIndex:e.readUInt16BE(6),width:e.readUInt16BE(24),height:e.readUInt16BE(26),hResolution:e.readUInt32BE(28),vResolution:e.readUInt32BE(32),frameCount:e.readUInt16BE(40),compressorName:e.toString("utf8",43,43+o),depth:e.readUInt16BE(74),children:[]},s=78;r-s>=8;){var a=p.decode(e,s,r);i.children.push(a),i[a.type]=a,s+=a.length}return i},n.VisualSampleEntry.encodingLength=function(e){var t=78,n=e.children||[];return n.forEach(function(e){t+=p.encodingLength(e)}),t},n.avcC={},n.avcC.encode=function(e,r,o){r=r?r.slice(o):t(e.buffer.length),e.buffer.copy(r),n.avcC.encode.bytes=e.buffer.length},n.avcC.decode=function(e,n,r){return e=e.slice(n,r),{mimeCodec:e.toString("hex",1,4),buffer:new t(e)}},n.avcC.encodingLength=function(e){return e.buffer.length},n.mp4a=n.AudioSampleEntry={},n.AudioSampleEntry.encode=function(e,o,i){o=o?o.slice(i):new t(n.AudioSampleEntry.encodingLength(e)),r(o,0,6),o.writeUInt16BE(e.dataReferenceIndex||0,6),r(o,8,16),o.writeUInt16BE(e.channelCount||2,16),o.writeUInt16BE(e.sampleSize||16,18),r(o,20,24),o.writeUInt32BE(e.sampleRate||0,24);var s=28,a=e.children||[];a.forEach(function(e){p.encode(e,o,s),s+=p.encode.bytes}),n.AudioSampleEntry.encode.bytes=s},n.AudioSampleEntry.decode=function(e,t,n){e=e.slice(t,n);for(var r=n-t,o={dataReferenceIndex:e.readUInt16BE(6),channelCount:e.readUInt16BE(16),sampleSize:e.readUInt16BE(18),sampleRate:e.readUInt32BE(24),children:[]},i=28;r-i>=8;){var s=p.decode(e,i,r);o.children.push(s),o[s.type]=s,i+=s.length}return o},n.AudioSampleEntry.encodingLength=function(e){var t=28,n=e.children||[];return n.forEach(function(e){t+=p.encodingLength(e)}),t},n.esds={},n.esds.encode=function(e,r,o){r=r?r.slice(o):t(e.buffer.length),e.buffer.copy(r,0),n.esds.encode.bytes=e.buffer.length},n.esds.decode=function(e,n,r){e=e.slice(n,r);var o=m.Descriptor.decode(e,0,e.length),i="ESDescriptor"===o.tagName?o:{},s=i.DecoderConfigDescriptor||{},a=s.oti||0,u=s.DecoderSpecificInfo,c=u?(248&u.buffer.readUInt8(0))>>3:0,f=null;return a&&(f=a.toString(16),c&&(f+="."+c)),{mimeCodec:f,buffer:new t(e.slice(0))}},n.esds.encodingLength=function(e){return e.buffer.length},n.stsz={},n.stsz.encode=function(e,r,o){var i=e.entries||[];r=r?r.slice(o):t(n.stsz.encodingLength(e)),r.writeUInt32BE(0,0),r.writeUInt32BE(i.length,4);for(var s=0;s<i.length;s++)r.writeUInt32BE(i[s],4*s+8);return n.stsz.encode.bytes=8+4*i.length,r},n.stsz.decode=function(e,t){e=e.slice(t);for(var n=e.readUInt32BE(0),r=e.readUInt32BE(4),o=new Array(r),i=0;i<r;i++)0===n?o[i]=e.readUInt32BE(4*i+8):o[i]=n;return{entries:o}},n.stsz.encodingLength=function(e){return 8+4*e.entries.length},n.stss=n.stco={},n.stco.encode=function(e,r,o){var i=e.entries||[];r=r?r.slice(o):new t(n.stco.encodingLength(e)),r.writeUInt32BE(i.length,0);for(var s=0;s<i.length;s++)r.writeUInt32BE(i[s],4*s+4);return n.stco.encode.bytes=4+4*i.length,r},n.stco.decode=function(e,t){e=e.slice(t);for(var n=e.readUInt32BE(0),r=new Array(n),o=0;o<n;o++)r[o]=e.readUInt32BE(4*o+4);return{entries:r}},n.stco.encodingLength=function(e){return 4+4*e.entries.length},n.stts={},n.stts.encode=function(e,r,o){var i=e.entries||[];r=r?r.slice(o):new t(n.stts.encodingLength(e)),r.writeUInt32BE(i.length,0);for(var s=0;s<i.length;s++){var a=8*s+4;r.writeUInt32BE(i[s].count||0,a),r.writeUInt32BE(i[s].duration||0,a+4)}return n.stts.encode.bytes=4+8*e.entries.length,r},n.stts.decode=function(e,t){e=e.slice(t);for(var n=e.readUInt32BE(0),r=new Array(n),o=0;o<n;o++){var i=8*o+4;r[o]={count:e.readUInt32BE(i),duration:e.readUInt32BE(i+4)}}return{entries:r}},n.stts.encodingLength=function(e){return 4+8*e.entries.length},n.ctts={},n.ctts.encode=function(e,r,o){var i=e.entries||[];r=r?r.slice(o):new t(n.ctts.encodingLength(e)),r.writeUInt32BE(i.length,0);for(var s=0;s<i.length;s++){var a=8*s+4;r.writeUInt32BE(i[s].count||0,a),r.writeUInt32BE(i[s].compositionOffset||0,a+4)}return n.ctts.encode.bytes=4+8*i.length,r},n.ctts.decode=function(e,t){e=e.slice(t);for(var n=e.readUInt32BE(0),r=new Array(n),o=0;o<n;o++){var i=8*o+4;r[o]={count:e.readUInt32BE(i),compositionOffset:e.readInt32BE(i+4)}}return{entries:r}},n.ctts.encodingLength=function(e){return 4+8*e.entries.length},n.stsc={},n.stsc.encode=function(e,r,o){var i=e.entries||[];r=r?r.slice(o):new t(n.stsc.encodingLength(e)),r.writeUInt32BE(i.length,0);for(var s=0;s<i.length;s++){var a=12*s+4;r.writeUInt32BE(i[s].firstChunk||0,a),r.writeUInt32BE(i[s].samplesPerChunk||0,a+4),r.writeUInt32BE(i[s].sampleDescriptionId||0,a+8)}return n.stsc.encode.bytes=4+12*i.length,r},n.stsc.decode=function(e,t){e=e.slice(t);for(var n=e.readUInt32BE(0),r=new Array(n),o=0;o<n;o++){var i=12*o+4;r[o]={firstChunk:e.readUInt32BE(i),samplesPerChunk:e.readUInt32BE(i+4),
sampleDescriptionId:e.readUInt32BE(i+8)}}return{entries:r}},n.stsc.encodingLength=function(e){return 4+12*e.entries.length},n.dref={},n.dref.encode=function(e,r,o){r=r?r.slice(o):new t(n.dref.encodingLength(e));var i=e.entries||[];r.writeUInt32BE(i.length,0);for(var s=4,a=0;a<i.length;a++){var u=i[a],c=(u.buf?u.buf.length:0)+4+4;r.writeUInt32BE(c,s),s+=4,r.write(u.type,s,4,"ascii"),s+=4,u.buf&&(u.buf.copy(r,s),s+=u.buf.length)}return n.dref.encode.bytes=s,r},n.dref.decode=function(e,t){e=e.slice(t);for(var n=e.readUInt32BE(0),r=new Array(n),o=4,i=0;i<n;i++){var s=e.readUInt32BE(o),a=e.toString("ascii",o+4,o+8),u=e.slice(o+8,o+s);o+=s,r[i]={type:a,buf:u}}return{entries:r}},n.dref.encodingLength=function(e){var t=4;if(!e.entries)return t;for(var n=0;n<e.entries.length;n++){var r=e.entries[n].buf;t+=(r?r.length:0)+4+4}return t},n.elst={},n.elst.encode=function(e,r,o){var s=e.entries||[];r=r?r.slice(o):new t(n.elst.encodingLength(e)),r.writeUInt32BE(s.length,0);for(var a=0;a<s.length;a++){var u=12*a+4;r.writeUInt32BE(s[a].trackDuration||0,u),r.writeUInt32BE(s[a].mediaTime||0,u+4),i(s[a].mediaRate||0,r,u+8)}return n.elst.encode.bytes=4+12*s.length,r},n.elst.decode=function(e,t){e=e.slice(t);for(var n=e.readUInt32BE(0),r=new Array(n),o=0;o<n;o++){var i=12*o+4;r[o]={trackDuration:e.readUInt32BE(i),mediaTime:e.readInt32BE(i+4),mediaRate:d(e,i+8)}}return{entries:r}},n.elst.encodingLength=function(e){return 4+12*e.entries.length},n.hdlr={},n.hdlr.encode=function(e,r,o){r=r?r.slice(o):new t(n.hdlr.encodingLength(e));var i=21+(e.name||"").length;return r.fill(0,0,i),r.write(e.handlerType||"",4,4,"ascii"),u(e.name||"",r,20),n.hdlr.encode.bytes=i,r},n.hdlr.decode=function(e,t,n){return e=e.slice(t),{handlerType:e.toString("ascii",4,8),name:l(e,20,n)}},n.hdlr.encodingLength=function(e){return 21+(e.name||"").length},n.mehd={},n.mehd.encode=function(e,r,o){return r=r?r.slice(o):new t(4),r.writeUInt32BE(e.fragmentDuration||0,0),n.mehd.encode.bytes=4,r},n.mehd.decode=function(e,t){return e=e.slice(t),{fragmentDuration:e.readUInt32BE(0)}},n.mehd.encodingLength=function(e){return 4},n.trex={},n.trex.encode=function(e,r,o){return r=r?r.slice(o):new t(20),r.writeUInt32BE(e.trackId||0,0),r.writeUInt32BE(e.defaultSampleDescriptionIndex||0,4),r.writeUInt32BE(e.defaultSampleDuration||0,8),r.writeUInt32BE(e.defaultSampleSize||0,12),r.writeUInt32BE(e.defaultSampleFlags||0,16),n.trex.encode.bytes=20,r},n.trex.decode=function(e,t){return e=e.slice(t),{trackId:e.readUInt32BE(0),defaultSampleDescriptionIndex:e.readUInt32BE(4),defaultSampleDuration:e.readUInt32BE(8),defaultSampleSize:e.readUInt32BE(12),defaultSampleFlags:e.readUInt32BE(16)}},n.trex.encodingLength=function(e){return 20},n.mfhd={},n.mfhd.encode=function(e,r,o){return r=r?r.slice(o):new t(4),r.writeUInt32BE(e.sequenceNumber||0,0),n.mfhd.encode.bytes=4,r},n.mfhd.decode=function(e,t){return{sequenceNumber:e.readUint32BE(0)}},n.mfhd.encodingLength=function(e){return 4},n.tfhd={},n.tfhd.encode=function(e,r,o){return r=r?r.slice(o):new t(4),r.writeUInt32BE(e.trackId,0),n.tfhd.encode.bytes=4,r},n.tfhd.decode=function(e,t){},n.tfhd.encodingLength=function(e){return 4},n.tfdt={},n.tfdt.encode=function(e,r,o){return r=r?r.slice(o):new t(4),r.writeUInt32BE(e.baseMediaDecodeTime||0,0),n.tfdt.encode.bytes=4,r},n.tfdt.decode=function(e,t){},n.tfdt.encodingLength=function(e){return 4},n.trun={},n.trun.encode=function(e,r,o){r=r?r.slice(o):new t(8+16*e.entries.length),r.writeUInt32BE(e.entries.length,0),r.writeInt32BE(e.dataOffset,4);for(var i=8,s=0;s<e.entries.length;s++){var a=e.entries[s];r.writeUInt32BE(a.sampleDuration,i),i+=4,r.writeUInt32BE(a.sampleSize,i),i+=4,r.writeUInt32BE(a.sampleFlags,i),i+=4,r.writeUInt32BE(a.sampleCompositionTimeOffset,i),i+=4}n.trun.encode.bytes=i},n.trun.decode=function(e,t){},n.trun.encodingLength=function(e){return 8+16*e.entries.length},n.mdat={},n.mdat.encode=function(e,t,r){e.buffer?(e.buffer.copy(t,r),n.mdat.encode.bytes=e.buffer.length):n.mdat.encode.bytes=n.mdat.encodingLength(e)},n.mdat.decode=function(e,n,r){return{buffer:new t(e.slice(n,r))}},n.mdat.encodingLength=function(e){return e.buffer?e.buffer.length:e.contentLength}}).call(this,e("buffer").Buffer)},{"./descriptor":53,"./index":54,buffer:24}],53:[function(e,t,n){(function(e){var t={3:"ESDescriptor",4:"DecoderConfigDescriptor",5:"DecoderSpecificInfo",6:"SLConfigDescriptor"};n.Descriptor={},n.Descriptor.decode=function(r,o,i){var s,a=r.readUInt8(o),u=o+1,c=0;do s=r.readUInt8(u++),c=c<<7|127&s;while(128&s);var f,d=t[a];return f=n[d]?n[d].decode(r,u,i):{buffer:new e(r.slice(u,u+c))},f.tag=a,f.tagName=d,f.length=u-o+c,f.contentsLen=c,f},n.DescriptorArray={},n.DescriptorArray.decode=function(e,r,o){for(var i=r,s={};i+2<=o;){var a=n.Descriptor.decode(e,i,o);i+=a.length;var u=t[a.tag]||"Descriptor"+a.tag;s[u]=a}return s},n.ESDescriptor={},n.ESDescriptor.decode=function(e,t,r){var o=e.readUInt8(t+2),i=t+3;if(128&o&&(i+=2),64&o){var s=e.readUInt8(i);i+=s+1}return 32&o&&(i+=2),n.DescriptorArray.decode(e,i,r)},n.DecoderConfigDescriptor={},n.DecoderConfigDescriptor.decode=function(e,t,r){var o=e.readUInt8(t),i=n.DescriptorArray.decode(e,t+13,r);return i.oti=o,i}}).call(this,e("buffer").Buffer)},{buffer:24}],54:[function(e,t,n){(function(t){var r=e("uint64be"),o=e("./boxes"),i=4294967295,s=n,a=n.containers={moov:["mvhd","meta","traks","mvex"],trak:["tkhd","tref","trgr","edts","meta","mdia","udta"],edts:["elst"],mdia:["mdhd","hdlr","elng","minf"],minf:["vmhd","smhd","hmhd","sthd","nmhd","dinf","stbl"],dinf:["dref"],stbl:["stsd","stts","ctts","cslg","stsc","stsz","stz2","stco","co64","stss","stsh","padb","stdp","sdtp","sbgps","sgpds","subss","saizs","saios"],mvex:["mehd","trexs","leva"],moof:["mfhd","meta","trafs"],traf:["tfhd","trun","sbgps","sgpds","subss","saizs","saios","tfdt","meta"]};s.encode=function(e,n,r){return s.encodingLength(e),r=r||0,n=n||new t(e.length),s._encode(e,n,r)},s._encode=function(e,t,n){var u=e.type,c=e.length;c>i&&(c=1),t.writeUInt32BE(c,n),t.write(e.type,n+4,4,"ascii");var f=n+8;if(1===c&&(r.encode(e.length,t,f),f+=8),o.fullBoxes[u]&&(t.writeUInt32BE(e.flags||0,f),t.writeUInt8(e.version||0,f),f+=4),a[u]){var d=a[u];d.forEach(function(n){if(5===n.length){var r=e[n]||[];n=n.substr(0,4),r.forEach(function(e){s._encode(e,t,f),f+=s.encode.bytes})}else e[n]&&(s._encode(e[n],t,f),f+=s.encode.bytes)}),e.otherBoxes&&e.otherBoxes.forEach(function(e){s._encode(e,t,f),f+=s.encode.bytes})}else if(o[u]){var h=o[u].encode;h(e,t,f),f+=h.bytes}else{if(!e.buffer)throw new Error("Either `type` must be set to a known type (not'"+u+"') or `buffer` must be set");var l=e.buffer;l.copy(t,f),f+=e.buffer.length}return s.encode.bytes=f-n,t},s.readHeaders=function(e,t,n){if(t=t||0,n=n||e.length,n-t<8)return 8;var i=e.readUInt32BE(t),s=e.toString("ascii",t+4,t+8),a=t+8;if(1===i){if(n-t<16)return 16;i=r.decode(e,a),a+=8}var u,c;return o.fullBoxes[s]&&(u=e.readUInt8(a),c=16777215&e.readUInt32BE(a),a+=4),{length:i,headersLen:a-t,contentLen:i-(a-t),type:s,version:u,flags:c}},s.decode=function(e,t,n){t=t||0,n=n||e.length;var r=s.readHeaders(e,t,n);if(!r||r.length>n-t)throw new Error("Data too short");return s.decodeWithoutHeaders(r,e,t+r.headersLen,t+r.length)},s.decodeWithoutHeaders=function(e,n,r,i){r=r||0,i=i||n.length;var u=e.type,c={};if(a[u]){c.otherBoxes=[];for(var f=a[u],d=r;i-d>=8;){var h=s.decode(n,d,i);if(d+=h.length,f.indexOf(h.type)>=0)c[h.type]=h;else if(f.indexOf(h.type+"s")>=0){var l=h.type+"s",p=c[l]=c[l]||[];p.push(h)}else c.otherBoxes.push(h)}}else if(o[u]){var m=o[u].decode;c=m(n,r,i)}else c.buffer=new t(n.slice(r,i));return c.length=e.length,c.contentLen=e.contentLen,c.type=e.type,c.version=e.version,c.flags=e.flags,c},s.encodingLength=function(e){var t=e.type,n=8;if(o.fullBoxes[t]&&(n+=4),a[t]){var r=a[t];r.forEach(function(t){if(5===t.length){var r=e[t]||[];t=t.substr(0,4),r.forEach(function(e){e.type=t,n+=s.encodingLength(e)})}else if(e[t]){var o=e[t];o.type=t,n+=s.encodingLength(o)}}),e.otherBoxes&&e.otherBoxes.forEach(function(e){n+=s.encodingLength(e)})}else if(o[t])n+=o[t].encodingLength(e);else{if(!e.buffer)throw new Error("Either `type` must be set to a known type (not'"+t+"') or `buffer` must be set");n+=e.buffer.length}return n>i&&(n+=8),e.length=n,n}}).call(this,e("buffer").Buffer)},{"./boxes":52,buffer:24,uint64be:109}],55:[function(e,t,n){(function(n){function r(){return this instanceof r?(i.Writable.call(this),this.destroyed=!1,this._pending=0,this._missing=0,this._buf=null,this._str=null,this._cb=null,this._ondrain=null,this._writeBuffer=null,this._writeCb=null,this._ondrain=null,void this._kick()):new r}function o(e){this._parent=e,this.destroyed=!1,i.PassThrough.call(this)}var i=e("readable-stream"),s=e("inherits"),a=e("next-event"),u=e("mp4-box-encoding"),c=new n(0);t.exports=r,s(r,i.Writable),r.prototype.destroy=function(e){this.destroyed||(this.destroyed=!0,e&&this.emit("error",e),this.emit("close"))},r.prototype._write=function(e,t,n){if(!this.destroyed){for(var r=!this._str||!this._str._writableState.needDrain;e.length&&!this.destroyed;){if(!this._missing)return this._writeBuffer=e,void(this._writeCb=n);var o=e.length<this._missing?e.length:this._missing;if(this._buf?e.copy(this._buf,this._buf.length-this._missing):this._str&&(r=this._str.write(o===e.length?e:e.slice(0,o))),this._missing-=o,!this._missing){var i=this._buf,s=this._cb,a=this._str;this._buf=this._cb=this._str=this._ondrain=null,r=!0,a&&a.end(),s&&s(i)}e=o===e.length?c:e.slice(o)}return this._pending&&!this._missing?(this._writeBuffer=e,void(this._writeCb=n)):void(r?n():this._ondrain(n))}},r.prototype._buffer=function(e,t){this._missing=e,this._buf=new n(e),this._cb=t},r.prototype._stream=function(e,t){var n=this;return this._missing=e,this._str=new o(this),this._ondrain=a(this._str,"drain"),this._pending++,this._str.on("end",function(){n._pending--,n._kick()}),this._cb=t,this._str},r.prototype._readBox=function(){function e(r,o){t._buffer(r,function(r){o=o?n.concat(o,r):r;var i=u.readHeaders(o);"number"==typeof i?e(i-o.length,o):(t._pending++,t._headers=i,t.emit("box",i))})}var t=this;e(8)},r.prototype.stream=function(){var e=this;if(!e._headers)throw new Error("this function can only be called once after 'box' is emitted");var t=e._headers;return e._headers=null,e._stream(t.contentLen,null)},r.prototype.decode=function(e){var t=this;if(!t._headers)throw new Error("this function can only be called once after 'box' is emitted");var n=t._headers;t._headers=null,t._buffer(n.contentLen,function(r){var o=u.decodeWithoutHeaders(n,r);e(o),t._pending--,t._kick()})},r.prototype.ignore=function(){var e=this;if(!e._headers)throw new Error("this function can only be called once after 'box' is emitted");var t=e._headers;e._headers=null,this._missing=t.contentLen,this._cb=function(){e._pending--,e._kick()}},r.prototype._kick=function(){if(!this._pending&&(this._buf||this._str||this._readBox(),this._writeBuffer)){var e=this._writeCb,t=this._writeBuffer;this._writeBuffer=null,this._writeCb=null,this._write(t,null,e)}},s(o,i.PassThrough),o.prototype.destroy=function(e){this.destroyed||(this.destroyed=!0,this._parent.destroy(e),e&&this.emit("error",e),this.emit("close"))}}).call(this,e("buffer").Buffer)},{buffer:24,inherits:42,"mp4-box-encoding":54,"next-event":60,"readable-stream":82}],56:[function(e,t,n){(function(n,r){function o(){}function i(){function e(){n._want&&(n._want=!1,n._read())}function t(){n._stream=null}if(!(this instanceof i))return new i;a.Readable.call(this),this.destroyed=!1,this._reading=!1,this._stream=null,this._drain=null,this._want=!1,this._onreadable=e,this._onend=t;var n=this}function s(e){this._parent=e,this.destroyed=!1,a.PassThrough.call(this)}var a=e("readable-stream"),u=e("inherits"),c=e("mp4-box-encoding");t.exports=i,u(i,a.Readable),i.prototype.mediaData=i.prototype.mdat=function(e,t){var n=new s(this);return this.box({type:"mdat",contentLength:e,encodeBufferLen:8,stream:n},t),n},i.prototype.box=function(e,t){if(t||(t=o),this.destroyed)return t(new Error("Encoder is destroyed"));var i;if(e.encodeBufferLen&&(i=new r(e.encodeBufferLen)),e.stream)e.buffer=null,i=c.encode(e,i),this.push(i),this._stream=e.stream,this._stream.on("readable",this._onreadable),this._stream.on("end",this._onend),this._stream.on("end",t),this._forward();else{i=c.encode(e,i);var s=this.push(i);if(s)return n.nextTick(t);this._drain=t}},i.prototype.destroy=function(e){if(!this.destroyed){if(this.destroyed=!0,this._stream&&this._stream.destroy&&this._stream.destroy(),this._stream=null,this._drain){var t=this._drain;this._drain=null,t(e)}e&&this.emit("error",e),this.emit("close")}},i.prototype.finalize=function(){this.push(null)},i.prototype._forward=function(){if(this._stream)for(;!this.destroyed;){var e=this._stream.read();if(!e)return void(this._want=!!this._stream);if(!this.push(e))return}},i.prototype._read=function(){if(!this._reading&&!this.destroyed){if(this._reading=!0,this._stream&&this._forward(),this._drain){var e=this._drain;this._drain=null,e()}this._reading=!1}},u(s,a.PassThrough),s.prototype.destroy=function(e){this.destroyed||(this.destroyed=!0,this._parent.destroy(e),e&&this.emit("error",e),this.emit("close"))}}).call(this,e("_process"),e("buffer").Buffer)},{_process:67,buffer:24,inherits:42,"mp4-box-encoding":54,"readable-stream":82}],57:[function(e,t,n){n.decode=e("./decode"),n.encode=e("./encode")},{"./decode":55,"./encode":56}],58:[function(e,t,n){function r(e){if(e=""+e,!(e.length>1e4)){var t=/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*d;case"days":case"day":case"d":return n*f;case"hours":case"hour":case"hrs":case"hr":case"h":return n*c;case"minutes":case"minute":case"mins":case"min":case"m":return n*u;case"seconds":case"second":case"secs":case"sec":case"s":return n*a;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n}}}}function o(e){return e>=f?Math.round(e/f)+"d":e>=c?Math.round(e/c)+"h":e>=u?Math.round(e/u)+"m":e>=a?Math.round(e/a)+"s":e+"ms"}function i(e){return s(e,f,"day")||s(e,c,"hour")||s(e,u,"minute")||s(e,a,"second")||e+" ms"}function s(e,t,n){if(!(e<t))return e<1.5*t?Math.floor(e/t)+" "+n:Math.ceil(e/t)+" "+n+"s"}var a=1e3,u=60*a,c=60*u,f=24*c,d=365.25*f;t.exports=function(e,t){return t=t||{},"string"==typeof e?r(e):t.long?i(e):o(e)}},{}],59:[function(e,t,n){function r(e,t){var n=this;return n instanceof r?(s.Readable.call(n,t),n.destroyed=!1,n._drained=!1,n._forwarding=!1,n._current=null,"function"==typeof e?n._queue=e:(n._queue=e.map(o),n._queue.forEach(function(e){"function"!=typeof e&&n._attachErrorListener(e)})),void n._next()):new r(e,t)}function o(e){if(!e||"function"==typeof e||e._readableState)return e;var t=(new s.Readable).wrap(e);return e.destroy&&(t.destroy=e.destroy.bind(e)),t}t.exports=r;var i=e("inherits"),s=e("readable-stream");i(r,s.Readable),r.obj=function(e){return new r(e,{objectMode:!0,highWaterMark:16})},r.prototype._read=function(){this._drained=!0,this._forward()},r.prototype._forward=function(){if(!this._forwarding&&this._drained&&this._current){this._forwarding=!0;for(var e;null!==(e=this._current.read());)this._drained=this.push(e);this._forwarding=!1}},r.prototype.destroy=function(e){this.destroyed||(this.destroyed=!0,this._current&&this._current.destroy&&this._current.destroy(),"function"!=typeof this._queue&&this._queue.forEach(function(e){e.destroy&&e.destroy()}),e&&this.emit("error",e),this.emit("close"))},r.prototype._next=function(){var e=this;if(e._current=null,"function"==typeof e._queue)e._queue(function(t,n){return t?e.destroy(t):(n=o(n),e._attachErrorListener(n),void e._gotNextStream(n))});else{var t=e._queue.shift();"function"==typeof t&&(t=o(t()),e._attachErrorListener(t)),e._gotNextStream(t)}},r.prototype._gotNextStream=function(e){function t(){o._forward()}function n(){e._readableState.ended||o.destroy()}function r(){o._current=null,e.removeListener("readable",t),e.removeListener("end",r),e.removeListener("close",n),o._next()}var o=this;return e?(o._current=e,o._forward(),e.on("readable",t),e.once("end",r),void e.once("close",n)):(o.push(null),void o.destroy())},r.prototype._attachErrorListener=function(e){function t(r){e.removeListener("error",t),n.destroy(r)}var n=this;e&&e.once("error",t)}},{inherits:42,"readable-stream":82}],60:[function(e,t,n){function r(e,t){var n=null;return e.on(t,function(e){if(n){var t=n;n=null,t(e)}}),function(e){n=e}}t.exports=r},{}],61:[function(e,t,n){function r(e){var t=function(){return t.called?t.value:(t.called=!0,t.value=e.apply(this,arguments))};return t.called=!1,t}function o(e){var t=function(){if(t.called)throw new Error(t.onceError);return t.called=!0,t.value=e.apply(this,arguments)},n=e.name||"Function wrapped with `once`";return t.onceError=n+" shouldn't be called more than once",t.called=!1,t}var i=e("wrappy");t.exports=i(r),t.exports.strict=i(o),r.proto=r(function(){Object.defineProperty(Function.prototype,"once",{value:function(){return r(this)},configurable:!0}),Object.defineProperty(Function.prototype,"onceStrict",{value:function(){return o(this)},configurable:!0})})},{wrappy:118}],62:[function(e,t,n){(function(n){function r(e){n.isBuffer(e)&&(e=u.decode(e)),a(e.info,"info"),a(e.info["name.utf-8"]||e.info.name,"info.name"),a(e.info["piece length"],"info['piece length']"),a(e.info.pieces,"info.pieces"),e.info.files?e.info.files.forEach(function(e){a("number"==typeof e.length,"info.files[0].length"),a(e["path.utf-8"]||e.path,"info.files[0].path")}):a("number"==typeof e.info.length,"info.length");var t={};t.info=e.info,t.infoBuffer=u.encode(e.info),t.infoHash=f.sync(t.infoBuffer),t.infoHashBuffer=new n(t.infoHash,"hex"),t.name=(e.info["name.utf-8"]||e.info.name).toString(),void 0!==e.info.private&&(t.private=!!e.info.private),e["creation date"]&&(t.created=new Date(1e3*e["creation date"])),e["created by"]&&(t.createdBy=e["created by"].toString()),n.isBuffer(e.comment)&&(t.comment=e.comment.toString()),t.announce=[],e["announce-list"]&&e["announce-list"].length?e["announce-list"].forEach(function(e){e.forEach(function(e){t.announce.push(e.toString())})}):e.announce&&t.announce.push(e.announce.toString()),n.isBuffer(e["url-list"])&&(e["url-list"]=e["url-list"].length>0?[e["url-list"]]:[]),t.urlList=(e["url-list"]||[]).map(function(e){return e.toString()}),d(t.announce),d(t.urlList);var r=e.info.files||[e.info];t.files=r.map(function(e,n){var o=[].concat(t.name,e["path.utf-8"]||e.path||[]).map(function(e){return e.toString()});return{path:c.join.apply(null,[c.sep].concat(o)).slice(1),name:o[o.length-1],length:e.length,offset:r.slice(0,n).reduce(i,0)}}),t.length=r.reduce(i,0);var o=t.files[t.files.length-1];return t.pieceLength=e.info["piece length"],t.lastPieceLength=(o.offset+o.length)%t.pieceLength||t.pieceLength,t.pieces=s(e.info.pieces),t}function o(e){var t={info:e.info};return t["announce-list"]=(e.announce||[]).map(function(e){return t.announce||(t.announce=e),e=new n(e,"utf8"),[e]}),t["url-list"]=e.urlList||[],e.created&&(t["creation date"]=e.created.getTime()/1e3|0),e.createdBy&&(t["created by"]=e.createdBy),e.comment&&(t.comment=e.comment),u.encode(t)}function i(e,t){return e+t.length}function s(e){for(var t=[],n=0;n<e.length;n+=20)t.push(e.slice(n,n+20).toString("hex"));return t}function a(e,t){if(!e)throw new Error("Torrent is missing required field: "+t)}t.exports=r,t.exports.decode=r,t.exports.encode=o;var u=e("bencode"),c=e("path"),f=e("simple-sha1"),d=e("uniq")}).call(this,e("buffer").Buffer)},{bencode:11,buffer:24,path:64,"simple-sha1":92,uniq:110}],63:[function(e,t,n){(function(n,r){function o(e){if("string"==typeof e&&/^(stream-)?magnet:/.test(e))return f(e);if("string"==typeof e&&(/^[a-f0-9]{40}$/i.test(e)||/^[a-z2-7]{32}$/i.test(e)))return f("magnet:?xt=urn:btih:"+e);if(r.isBuffer(e)&&20===e.length)return f("magnet:?xt=urn:btih:"+e.toString("hex"));if(r.isBuffer(e))return d(e);if(e&&e.infoHash)return e.announce||(e.announce=[]),"string"==typeof e.announce&&(e.announce=[e.announce]),e.urlList||(e.urlList=[]),e;throw new Error("Invalid torrent identifier")}function i(e,t){function r(e){try{i=o(e)}catch(e){return t(e)}i&&i.infoHash?t(null,i):t(new Error("Invalid torrent identifier"))}var i;if("function"!=typeof t)throw new Error("second argument must be a Function");try{i=o(e)}catch(e){}i&&i.infoHash?n.nextTick(function(){t(null,i)}):s(e)?a(e,function(e,n){return e?t(new Error("Error converting Blob: "+e.message)):void r(n)}):"function"==typeof c&&/^https?:/.test(e)?c.concat({url:e,headers:{"user-agent":"WebTorrent (http://webtorrent.io)"}},function(e,n,o){return e?t(new Error("Error downloading torrent: "+e.message)):void r(o)}):"function"==typeof u.readFile&&"string"==typeof e?u.readFile(e,function(e,n){return e?t(new Error("Invalid torrent identifier")):void r(n)}):n.nextTick(function(){t(new Error("Invalid torrent identifier"))})}function s(e){return"undefined"!=typeof Blob&&e instanceof Blob}t.exports=o,t.exports.remote=i;var a=e("blob-to-buffer"),u=e("fs"),c=e("simple-get"),f=e("magnet-uri"),d=e("parse-torrent-file");t.exports.toMagnetURI=f.encode,t.exports.toTorrentFile=d.encode,function(){r(0)}()}).call(this,e("_process"),e("buffer").Buffer)},{_process:67,"blob-to-buffer":19,buffer:24,fs:22,"magnet-uri":49,"parse-torrent-file":62,"simple-get":90}],64:[function(e,t,n){(function(e){function t(e,t){for(var n=0,r=e.length-1;r>=0;r--){var o=e[r];"."===o?e.splice(r,1):".."===o?(e.splice(r,1),n++):n&&(e.splice(r,1),n--)}if(t)for(;n--;n)e.unshift("..");return e}function r(e,t){if(e.filter)return e.filter(t);for(var n=[],r=0;r<e.length;r++)t(e[r],r,e)&&n.push(e[r]);return n}var o=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/,i=function(e){return o.exec(e).slice(1)};n.resolve=function(){for(var n="",o=!1,i=arguments.length-1;i>=-1&&!o;i--){var s=i>=0?arguments[i]:e.cwd();if("string"!=typeof s)throw new TypeError("Arguments to path.resolve must be strings");s&&(n=s+"/"+n,o="/"===s.charAt(0))}return n=t(r(n.split("/"),function(e){return!!e}),!o).join("/"),(o?"/":"")+n||"."},n.normalize=function(e){var o=n.isAbsolute(e),i="/"===s(e,-1);return e=t(r(e.split("/"),function(e){return!!e}),!o).join("/"),e||o||(e="."),e&&i&&(e+="/"),(o?"/":"")+e},n.isAbsolute=function(e){return"/"===e.charAt(0)},n.join=function(){var e=Array.prototype.slice.call(arguments,0);return n.normalize(r(e,function(e,t){if("string"!=typeof e)throw new TypeError("Arguments to path.join must be strings");return e}).join("/"))},n.relative=function(e,t){function r(e){for(var t=0;t<e.length&&""===e[t];t++);for(var n=e.length-1;n>=0&&""===e[n];n--);return t>n?[]:e.slice(t,n-t+1)}e=n.resolve(e).substr(1),t=n.resolve(t).substr(1);for(var o=r(e.split("/")),i=r(t.split("/")),s=Math.min(o.length,i.length),a=s,u=0;u<s;u++)if(o[u]!==i[u]){a=u;break}for(var c=[],u=a;u<o.length;u++)c.push("..");return c=c.concat(i.slice(a)),c.join("/")},n.sep="/",n.delimiter=":",n.dirname=function(e){var t=i(e),n=t[0],r=t[1];return n||r?(r&&(r=r.substr(0,r.length-1)),n+r):"."},n.basename=function(e,t){var n=i(e)[2];return t&&n.substr(-1*t.length)===t&&(n=n.substr(0,n.length-t.length)),n},n.extname=function(e){return i(e)[3]};var s="b"==="ab".substr(-1)?function(e,t,n){return e.substr(t,n)}:function(e,t,n){return t<0&&(t=e.length+t),e.substr(t,n)}}).call(this,e("_process"))},{_process:67}],65:[function(e,t,n){for(var r=e("closest-to"),o=[],i=14;i<=22;i++)o.push(Math.pow(2,i));t.exports=function(e){return r(e/Math.pow(2,10),o)}},{"closest-to":27}],66:[function(e,t,n){(function(e){"use strict";function n(t,n,r,o){if("function"!=typeof t)throw new TypeError('"callback" argument must be a function');var i,s,a=arguments.length;switch(a){case 0:case 1:return e.nextTick(t);case 2:return e.nextTick(function(){t.call(null,n)});case 3:return e.nextTick(function(){t.call(null,n,r)});case 4:return e.nextTick(function(){t.call(null,n,r,o)});default:for(i=new Array(a-1),s=0;s<i.length;)i[s++]=arguments[s];return e.nextTick(function(){t.apply(null,i)})}}!e.version||0===e.version.indexOf("v0.")||0===e.version.indexOf("v1.")&&0!==e.version.indexOf("v1.8.")?t.exports=n:t.exports=e.nextTick}).call(this,e("_process"))},{_process:67}],67:[function(e,t,n){function r(){throw new Error("setTimeout has not been defined")}function o(){throw new Error("clearTimeout has not been defined")}function i(e){if(d===setTimeout)return setTimeout(e,0);if((d===r||!d)&&setTimeout)return d=setTimeout,setTimeout(e,0);try{return d(e,0)}catch(t){try{return d.call(null,e,0)}catch(t){return d.call(this,e,0)}}}function s(e){if(h===clearTimeout)return clearTimeout(e);if((h===o||!h)&&clearTimeout)return h=clearTimeout,clearTimeout(e);try{return h(e)}catch(t){try{return h.call(null,e)}catch(t){return h.call(this,e)}}}function a(){g&&p&&(g=!1,p.length?m=p.concat(m):y=-1,m.length&&u())}function u(){if(!g){var e=i(a);g=!0;for(var t=m.length;t;){for(p=m,m=[];++y<t;)p&&p[y].run();y=-1,t=m.length}p=null,g=!1,s(e)}}function c(e,t){this.fun=e,this.array=t}function f(){}var d,h,l=t.exports={};!function(){try{d="function"==typeof setTimeout?setTimeout:r}catch(e){d=r}try{h="function"==typeof clearTimeout?clearTimeout:o}catch(e){h=o}}();var p,m=[],g=!1,y=-1;l.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];m.push(new c(e,t)),1!==m.length||g||i(u)},c.prototype.run=function(){this.fun.apply(null,this.array)},l.title="browser",l.browser=!0,l.env={},l.argv=[],l.version="",l.versions={},l.on=f,l.addListener=f,l.once=f,l.off=f,l.removeListener=f,l.removeAllListeners=f,l.emit=f,l.binding=function(e){throw new Error("process.binding is not supported")},l.cwd=function(){return"/"},l.chdir=function(e){throw new Error("process.chdir is not supported")},l.umask=function(){return 0}},{}],68:[function(e,t,n){var r=e("once"),o=e("end-of-stream"),i=e("fs"),s=function(){},a=function(e){return"function"==typeof e},u=function(e){return(e instanceof(i.ReadStream||s)||e instanceof(i.WriteStream||s))&&a(e.close)},c=function(e){return e.setHeader&&a(e.abort)},f=function(e,t,n,i){i=r(i);var s=!1;e.on("close",function(){s=!0}),o(e,{readable:t,writable:n},function(e){return e?i(e):(s=!0,void i())});var f=!1;return function(t){if(!s&&!f)return f=!0,u(e)?e.close():c(e)?e.abort():a(e.destroy)?e.destroy():void i(t||new Error("stream was destroyed"))}},d=function(e){e()},h=function(e,t){return e.pipe(t)},l=function(){var e=Array.prototype.slice.call(arguments),t=a(e[e.length-1]||s)&&e.pop()||s;if(Array.isArray(e[0])&&(e=e[0]),e.length<2)throw new Error("pump requires two streams per minimum");var n,r=e.map(function(o,i){var s=i<e.length-1,a=i>0;return f(o,s,a,function(e){n||(n=e),e&&r.forEach(d),s||(r.forEach(d),t(n))})});return e.reduce(h)};t.exports=l},{"end-of-stream":33,fs:22,once:61}],69:[function(t,n,r){(function(t){!function(o){function i(e){throw new RangeError(P[e])}function s(e,t){for(var n=e.length,r=[];n--;)r[n]=t(e[n]);return r}function a(e,t){var n=e.split("@"),r="";n.length>1&&(r=n[0]+"@",e=n[1]),e=e.replace(U,".");var o=e.split("."),i=s(o,t).join(".");return r+i}function u(e){for(var t,n,r=[],o=0,i=e.length;o<i;)t=e.charCodeAt(o++),t>=55296&&t<=56319&&o<i?(n=e.charCodeAt(o++),56320==(64512&n)?r.push(((1023&t)<<10)+(1023&n)+65536):(r.push(t),o--)):r.push(t);return r}function c(e){return s(e,function(e){var t="";return e>65535&&(e-=65536,t+=j(e>>>10&1023|55296),e=56320|1023&e),t+=j(e)}).join("")}function f(e){return e-48<10?e-22:e-65<26?e-65:e-97<26?e-97:k}function d(e,t){return e+22+75*(e<26)-((0!=t)<<5)}function h(e,t,n){var r=0;for(e=n?M(e/I):e>>1,e+=M(e/t);e>O*S>>1;r+=k)e=M(e/O);return M(r+(O+1)*e/(e+B))}function l(e){var t,n,r,o,s,a,u,d,l,p,m=[],g=e.length,y=0,_=T,v=A;for(n=e.lastIndexOf(C),n<0&&(n=0),r=0;r<n;++r)e.charCodeAt(r)>=128&&i("not-basic"),m.push(e.charCodeAt(r));for(o=n>0?n+1:0;o<g;){for(s=y,a=1,u=k;o>=g&&i("invalid-input"),d=f(e.charCodeAt(o++)),(d>=k||d>M((E-y)/a))&&i("overflow"),y+=d*a,l=u<=v?x:u>=v+S?S:u-v,!(d<l);u+=k)p=k-l,a>M(E/p)&&i("overflow"),a*=p;t=m.length+1,v=h(y-s,t,0==s),M(y/t)>E-_&&i("overflow"),_+=M(y/t),y%=t,m.splice(y++,0,_)}return c(m)}function p(e){var t,n,r,o,s,a,c,f,l,p,m,g,y,_,v,b=[];for(e=u(e),g=e.length,t=T,n=0,s=A,a=0;a<g;++a)m=e[a],m<128&&b.push(j(m));for(r=o=b.length,o&&b.push(C);r<g;){for(c=E,a=0;a<g;++a)m=e[a],m>=t&&m<c&&(c=m);for(y=r+1,c-t>M((E-n)/y)&&i("overflow"),n+=(c-t)*y,t=c,a=0;a<g;++a)if(m=e[a],m<t&&++n>E&&i("overflow"),m==t){for(f=n,l=k;p=l<=s?x:l>=s+S?S:l-s,!(f<p);l+=k)v=f-p,_=k-p,b.push(j(d(p+v%_,0))),f=M(v/_);b.push(j(d(f,0))),s=h(n,y,r==o),n=0,++r}++n,++t}return b.join("")}function m(e){return a(e,function(e){return L.test(e)?l(e.slice(4).toLowerCase()):e})}function g(e){return a(e,function(e){return R.test(e)?"xn--"+p(e):e})}var y="object"==typeof r&&r&&!r.nodeType&&r,_="object"==typeof n&&n&&!n.nodeType&&n,v="object"==typeof t&&t;v.global!==v&&v.window!==v&&v.self!==v||(o=v);var b,w,E=2147483647,k=36,x=1,S=26,B=38,I=700,A=72,T=128,C="-",L=/^xn--/,R=/[^\x20-\x7E]/,U=/[\x2E\u3002\uFF0E\uFF61]/g,P={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},O=k-x,M=Math.floor,j=String.fromCharCode;if(b={version:"1.4.1",ucs2:{decode:u,encode:c},decode:l,encode:p,toASCII:g,toUnicode:m},"function"==typeof e&&"object"==typeof e.amd&&e.amd)e("punycode",function(){return b});else if(y&&_)if(n.exports==y)_.exports=b;else for(w in b)b.hasOwnProperty(w)&&(y[w]=b[w]);else o.punycode=b}(this)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],70:[function(e,t,n){"use strict";function r(e,t){return Object.prototype.hasOwnProperty.call(e,t)}t.exports=function(e,t,n,i){t=t||"&",n=n||"=";var s={};if("string"!=typeof e||0===e.length)return s;var a=/\+/g;e=e.split(t);var u=1e3;i&&"number"==typeof i.maxKeys&&(u=i.maxKeys);var c=e.length;u>0&&c>u&&(c=u);for(var f=0;f<c;++f){var d,h,l,p,m=e[f].replace(a,"%20"),g=m.indexOf(n);g>=0?(d=m.substr(0,g),h=m.substr(g+1)):(d=m,h=""),l=decodeURIComponent(d),p=decodeURIComponent(h),r(s,l)?o(s[l])?s[l].push(p):s[l]=[s[l],p]:s[l]=p}return s};var o=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)}},{}],71:[function(e,t,n){"use strict";function r(e,t){if(e.map)return e.map(t);for(var n=[],r=0;r<e.length;r++)n.push(t(e[r],r));return n}var o=function(e){switch(typeof e){case"string":return e;case"boolean":return e?"true":"false";case"number":return isFinite(e)?e:"";default:return""}};t.exports=function(e,t,n,a){return t=t||"&",n=n||"=",null===e&&(e=void 0),"object"==typeof e?r(s(e),function(s){var a=encodeURIComponent(o(s))+n;return i(e[s])?r(e[s],function(e){return a+encodeURIComponent(o(e))}).join(t):a+encodeURIComponent(o(e[s]))}).join(t):a?encodeURIComponent(o(a))+n+encodeURIComponent(o(e)):""};var i=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)},s=Object.keys||function(e){var t=[];for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.push(n);return t}},{}],72:[function(e,t,n){"use strict";n.decode=n.parse=e("./decode"),n.encode=n.stringify=e("./encode")},{"./decode":70,"./encode":71}],73:[function(e,t,n){var r=function(e){var t=0;return function(){if(t===e.length)return null;var n=e.length-t,r=Math.random()*n|0,o=e[t+r],i=e[t];return e[t]=o,e[t+r]=i,t++,o}};t.exports=r},{}],74:[function(e,t,n){(function(e,n,r){"use strict";function o(){throw new Error("secure random number generation not supported by this browser\nuse chrome, FireFox or Internet Explorer 11")}function i(t,o){if(t>65536)throw new Error("requested too many random bytes");var i=new n.Uint8Array(t);t>0&&s.getRandomValues(i);var a=new r(i.buffer);return"function"==typeof o?e.nextTick(function(){o(null,a)}):a}var s=n.crypto||n.msCrypto;s&&s.getRandomValues?t.exports=i:t.exports=o}).call(this,e("_process"),"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer);
},{_process:67,buffer:24}],75:[function(e,t,n){function r(e){var t=this;return t instanceof r?(i.Writable.call(t),t.destroyed=!1,t._queue=[],t._position=e||0,t._cb=null,t._buffer=null,void(t._out=null)):new r(e)}var o=e("inherits"),i=e("readable-stream");t.exports=r,o(r,i.Writable),r.prototype._write=function(e,t,n){for(var r=this,o=!0;;){if(r.destroyed)return;if(0===r._queue.length)return r._buffer=e,void(r._cb=n);r._buffer=null;var i=r._queue[0],s=Math.max(i.start-r._position,0),a=i.end-r._position;if(s>=e.length)return r._position+=e.length,n(null);var u;if(a>e.length){r._position+=e.length,u=0===s?e:e.slice(s),o=i.stream.write(u)&&o;break}r._position+=a,u=0===s&&a===e.length?e:e.slice(s,a),o=i.stream.write(u)&&o,i.last&&i.stream.end(),e=e.slice(a),r._queue.shift()}o?n(null):i.stream.once("drain",n.bind(null,null))},r.prototype.slice=function(e){var t=this;if(t.destroyed)return null;e instanceof Array||(e=[e]);var n=new i.PassThrough;return e.forEach(function(r,o){t._queue.push({start:r.start,end:r.end,stream:n,last:o===e.length-1})}),t._buffer&&t._write(t._buffer,null,t._cb),n},r.prototype.destroy=function(e){var t=this;t.destroyed||(t.destroyed=!0,e&&t.emit("error",e))}},{inherits:42,"readable-stream":82}],76:[function(e,t,n){"use strict";function r(e){return this instanceof r?(c.call(this,e),f.call(this,e),e&&e.readable===!1&&(this.readable=!1),e&&e.writable===!1&&(this.writable=!1),this.allowHalfOpen=!0,e&&e.allowHalfOpen===!1&&(this.allowHalfOpen=!1),void this.once("end",o)):new r(e)}function o(){this.allowHalfOpen||this._writableState.ended||a(i,this)}function i(e){e.end()}var s=Object.keys||function(e){var t=[];for(var n in e)t.push(n);return t};t.exports=r;var a=e("process-nextick-args"),u=e("core-util-is");u.inherits=e("inherits");var c=e("./_stream_readable"),f=e("./_stream_writable");u.inherits(r,c);for(var d=s(f.prototype),h=0;h<d.length;h++){var l=d[h];r.prototype[l]||(r.prototype[l]=f.prototype[l])}},{"./_stream_readable":78,"./_stream_writable":80,"core-util-is":28,inherits:42,"process-nextick-args":66}],77:[function(e,t,n){"use strict";function r(e){return this instanceof r?void o.call(this,e):new r(e)}t.exports=r;var o=e("./_stream_transform"),i=e("core-util-is");i.inherits=e("inherits"),i.inherits(r,o),r.prototype._transform=function(e,t,n){n(null,e)}},{"./_stream_transform":79,"core-util-is":28,inherits:42}],78:[function(e,t,n){(function(n){"use strict";function r(e,t,n){return"function"==typeof e.prependListener?e.prependListener(t,n):void(e._events&&e._events[t]?C(e._events[t])?e._events[t].unshift(n):e._events[t]=[n,e._events[t]]:e.on(t,n))}function o(t,n){q=q||e("./_stream_duplex"),t=t||{},this.objectMode=!!t.objectMode,n instanceof q&&(this.objectMode=this.objectMode||!!t.readableObjectMode);var r=t.highWaterMark,o=this.objectMode?16:16384;this.highWaterMark=r||0===r?r:o,this.highWaterMark=~~this.highWaterMark,this.buffer=new D,this.length=0,this.pipes=null,this.pipesCount=0,this.flowing=null,this.ended=!1,this.endEmitted=!1,this.reading=!1,this.sync=!0,this.needReadable=!1,this.emittedReadable=!1,this.readableListening=!1,this.resumeScheduled=!1,this.defaultEncoding=t.defaultEncoding||"utf8",this.ranOut=!1,this.awaitDrain=0,this.readingMore=!1,this.decoder=null,this.encoding=null,t.encoding&&(H||(H=e("string_decoder/").StringDecoder),this.decoder=new H(t.encoding),this.encoding=t.encoding)}function i(t){return q=q||e("./_stream_duplex"),this instanceof i?(this._readableState=new o(t,this),this.readable=!0,t&&"function"==typeof t.read&&(this._read=t.read),void L.call(this)):new i(t)}function s(e,t,n,r,o){var i=f(t,n);if(i)e.emit("error",i);else if(null===n)t.reading=!1,d(e,t);else if(t.objectMode||n&&n.length>0)if(t.ended&&!o){var s=new Error("stream.push() after EOF");e.emit("error",s)}else if(t.endEmitted&&o){var u=new Error("stream.unshift() after end event");e.emit("error",u)}else{var c;!t.decoder||o||r||(n=t.decoder.write(n),c=!t.objectMode&&0===n.length),o||(t.reading=!1),c||(t.flowing&&0===t.length&&!t.sync?(e.emit("data",n),e.read(0)):(t.length+=t.objectMode?1:n.length,o?t.buffer.unshift(n):t.buffer.push(n),t.needReadable&&h(e))),p(e,t)}else o||(t.reading=!1);return a(t)}function a(e){return!e.ended&&(e.needReadable||e.length<e.highWaterMark||0===e.length)}function u(e){return e>=N?e=N:(e--,e|=e>>>1,e|=e>>>2,e|=e>>>4,e|=e>>>8,e|=e>>>16,e++),e}function c(e,t){return e<=0||0===t.length&&t.ended?0:t.objectMode?1:e!==e?t.flowing&&t.length?t.buffer.head.data.length:t.length:(e>t.highWaterMark&&(t.highWaterMark=u(e)),e<=t.length?e:t.ended?t.length:(t.needReadable=!0,0))}function f(e,t){var n=null;return U.isBuffer(t)||"string"==typeof t||null===t||void 0===t||e.objectMode||(n=new TypeError("Invalid non-string/buffer chunk")),n}function d(e,t){if(!t.ended){if(t.decoder){var n=t.decoder.end();n&&n.length&&(t.buffer.push(n),t.length+=t.objectMode?1:n.length)}t.ended=!0,h(e)}}function h(e){var t=e._readableState;t.needReadable=!1,t.emittedReadable||(j("emitReadable",t.flowing),t.emittedReadable=!0,t.sync?T(l,e):l(e))}function l(e){j("emit readable"),e.emit("readable"),b(e)}function p(e,t){t.readingMore||(t.readingMore=!0,T(m,e,t))}function m(e,t){for(var n=t.length;!t.reading&&!t.flowing&&!t.ended&&t.length<t.highWaterMark&&(j("maybeReadMore read 0"),e.read(0),n!==t.length);)n=t.length;t.readingMore=!1}function g(e){return function(){var t=e._readableState;j("pipeOnDrain",t.awaitDrain),t.awaitDrain&&t.awaitDrain--,0===t.awaitDrain&&R(e,"data")&&(t.flowing=!0,b(e))}}function y(e){j("readable nexttick read 0"),e.read(0)}function _(e,t){t.resumeScheduled||(t.resumeScheduled=!0,T(v,e,t))}function v(e,t){t.reading||(j("resume read 0"),e.read(0)),t.resumeScheduled=!1,t.awaitDrain=0,e.emit("resume"),b(e),t.flowing&&!t.reading&&e.read(0)}function b(e){var t=e._readableState;for(j("flow",t.flowing);t.flowing&&null!==e.read(););}function w(e,t){if(0===t.length)return null;var n;return t.objectMode?n=t.buffer.shift():!e||e>=t.length?(n=t.decoder?t.buffer.join(""):1===t.buffer.length?t.buffer.head.data:t.buffer.concat(t.length),t.buffer.clear()):n=E(e,t.buffer,t.decoder),n}function E(e,t,n){var r;return e<t.head.data.length?(r=t.head.data.slice(0,e),t.head.data=t.head.data.slice(e)):r=e===t.head.data.length?t.shift():n?k(e,t):x(e,t),r}function k(e,t){var n=t.head,r=1,o=n.data;for(e-=o.length;n=n.next;){var i=n.data,s=e>i.length?i.length:e;if(o+=s===i.length?i:i.slice(0,e),e-=s,0===e){s===i.length?(++r,n.next?t.head=n.next:t.head=t.tail=null):(t.head=n,n.data=i.slice(s));break}++r}return t.length-=r,o}function x(e,t){var n=P.allocUnsafe(e),r=t.head,o=1;for(r.data.copy(n),e-=r.data.length;r=r.next;){var i=r.data,s=e>i.length?i.length:e;if(i.copy(n,n.length-e,0,s),e-=s,0===e){s===i.length?(++o,r.next?t.head=r.next:t.head=t.tail=null):(t.head=r,r.data=i.slice(s));break}++o}return t.length-=o,n}function S(e){var t=e._readableState;if(t.length>0)throw new Error('"endReadable()" called on non-empty stream');t.endEmitted||(t.ended=!0,T(B,t,e))}function B(e,t){e.endEmitted||0!==e.length||(e.endEmitted=!0,t.readable=!1,t.emit("end"))}function I(e,t){for(var n=0,r=e.length;n<r;n++)t(e[n],n)}function A(e,t){for(var n=0,r=e.length;n<r;n++)if(e[n]===t)return n;return-1}t.exports=i;var T=e("process-nextick-args"),C=e("isarray");i.ReadableState=o;var L,R=(e("events").EventEmitter,function(e,t){return e.listeners(t).length});!function(){try{L=e("stream")}catch(e){}finally{L||(L=e("events").EventEmitter)}}();var U=e("buffer").Buffer,P=e("buffer-shims"),O=e("core-util-is");O.inherits=e("inherits");var M=e("util"),j=void 0;j=M&&M.debuglog?M.debuglog("stream"):function(){};var H,D=e("./internal/streams/BufferList");O.inherits(i,L);var q,q;i.prototype.push=function(e,t){var n=this._readableState;return n.objectMode||"string"!=typeof e||(t=t||n.defaultEncoding,t!==n.encoding&&(e=P.from(e,t),t="")),s(this,n,e,t,!1)},i.prototype.unshift=function(e){var t=this._readableState;return s(this,t,e,"",!0)},i.prototype.isPaused=function(){return this._readableState.flowing===!1},i.prototype.setEncoding=function(t){return H||(H=e("string_decoder/").StringDecoder),this._readableState.decoder=new H(t),this._readableState.encoding=t,this};var N=8388608;i.prototype.read=function(e){j("read",e),e=parseInt(e,10);var t=this._readableState,n=e;if(0!==e&&(t.emittedReadable=!1),0===e&&t.needReadable&&(t.length>=t.highWaterMark||t.ended))return j("read: emitReadable",t.length,t.ended),0===t.length&&t.ended?S(this):h(this),null;if(e=c(e,t),0===e&&t.ended)return 0===t.length&&S(this),null;var r=t.needReadable;j("need readable",r),(0===t.length||t.length-e<t.highWaterMark)&&(r=!0,j("length less than watermark",r)),t.ended||t.reading?(r=!1,j("reading or ended",r)):r&&(j("do read"),t.reading=!0,t.sync=!0,0===t.length&&(t.needReadable=!0),this._read(t.highWaterMark),t.sync=!1,t.reading||(e=c(n,t)));var o;return o=e>0?w(e,t):null,null===o?(t.needReadable=!0,e=0):t.length-=e,0===t.length&&(t.ended||(t.needReadable=!0),n!==e&&t.ended&&S(this)),null!==o&&this.emit("data",o),o},i.prototype._read=function(e){this.emit("error",new Error("not implemented"))},i.prototype.pipe=function(e,t){function o(e){j("onunpipe"),e===h&&s()}function i(){j("onend"),e.end()}function s(){j("cleanup"),e.removeListener("close",c),e.removeListener("finish",f),e.removeListener("drain",y),e.removeListener("error",u),e.removeListener("unpipe",o),h.removeListener("end",i),h.removeListener("end",s),h.removeListener("data",a),_=!0,!l.awaitDrain||e._writableState&&!e._writableState.needDrain||y()}function a(t){j("ondata"),v=!1;var n=e.write(t);!1!==n||v||((1===l.pipesCount&&l.pipes===e||l.pipesCount>1&&A(l.pipes,e)!==-1)&&!_&&(j("false write response, pause",h._readableState.awaitDrain),h._readableState.awaitDrain++,v=!0),h.pause())}function u(t){j("onerror",t),d(),e.removeListener("error",u),0===R(e,"error")&&e.emit("error",t)}function c(){e.removeListener("finish",f),d()}function f(){j("onfinish"),e.removeListener("close",c),d()}function d(){j("unpipe"),h.unpipe(e)}var h=this,l=this._readableState;switch(l.pipesCount){case 0:l.pipes=e;break;case 1:l.pipes=[l.pipes,e];break;default:l.pipes.push(e)}l.pipesCount+=1,j("pipe count=%d opts=%j",l.pipesCount,t);var p=(!t||t.end!==!1)&&e!==n.stdout&&e!==n.stderr,m=p?i:s;l.endEmitted?T(m):h.once("end",m),e.on("unpipe",o);var y=g(h);e.on("drain",y);var _=!1,v=!1;return h.on("data",a),r(e,"error",u),e.once("close",c),e.once("finish",f),e.emit("pipe",h),l.flowing||(j("pipe resume"),h.resume()),e},i.prototype.unpipe=function(e){var t=this._readableState;if(0===t.pipesCount)return this;if(1===t.pipesCount)return e&&e!==t.pipes?this:(e||(e=t.pipes),t.pipes=null,t.pipesCount=0,t.flowing=!1,e&&e.emit("unpipe",this),this);if(!e){var n=t.pipes,r=t.pipesCount;t.pipes=null,t.pipesCount=0,t.flowing=!1;for(var o=0;o<r;o++)n[o].emit("unpipe",this);return this}var i=A(t.pipes,e);return i===-1?this:(t.pipes.splice(i,1),t.pipesCount-=1,1===t.pipesCount&&(t.pipes=t.pipes[0]),e.emit("unpipe",this),this)},i.prototype.on=function(e,t){var n=L.prototype.on.call(this,e,t);if("data"===e)this._readableState.flowing!==!1&&this.resume();else if("readable"===e){var r=this._readableState;r.endEmitted||r.readableListening||(r.readableListening=r.needReadable=!0,r.emittedReadable=!1,r.reading?r.length&&h(this,r):T(y,this))}return n},i.prototype.addListener=i.prototype.on,i.prototype.resume=function(){var e=this._readableState;return e.flowing||(j("resume"),e.flowing=!0,_(this,e)),this},i.prototype.pause=function(){return j("call pause flowing=%j",this._readableState.flowing),!1!==this._readableState.flowing&&(j("pause"),this._readableState.flowing=!1,this.emit("pause")),this},i.prototype.wrap=function(e){var t=this._readableState,n=!1,r=this;e.on("end",function(){if(j("wrapped end"),t.decoder&&!t.ended){var e=t.decoder.end();e&&e.length&&r.push(e)}r.push(null)}),e.on("data",function(o){if(j("wrapped data"),t.decoder&&(o=t.decoder.write(o)),(!t.objectMode||null!==o&&void 0!==o)&&(t.objectMode||o&&o.length)){var i=r.push(o);i||(n=!0,e.pause())}});for(var o in e)void 0===this[o]&&"function"==typeof e[o]&&(this[o]=function(t){return function(){return e[t].apply(e,arguments)}}(o));var i=["error","close","destroy","pause","resume"];return I(i,function(t){e.on(t,r.emit.bind(r,t))}),r._read=function(t){j("wrapped _read",t),n&&(n=!1,e.resume())},r},i._fromList=w}).call(this,e("_process"))},{"./_stream_duplex":76,"./internal/streams/BufferList":81,_process:67,buffer:24,"buffer-shims":23,"core-util-is":28,events:35,inherits:42,isarray:47,"process-nextick-args":66,"string_decoder/":102,util:21}],79:[function(e,t,n){"use strict";function r(e){this.afterTransform=function(t,n){return o(e,t,n)},this.needTransform=!1,this.transforming=!1,this.writecb=null,this.writechunk=null,this.writeencoding=null}function o(e,t,n){var r=e._transformState;r.transforming=!1;var o=r.writecb;if(!o)return e.emit("error",new Error("no writecb in Transform class"));r.writechunk=null,r.writecb=null,null!==n&&void 0!==n&&e.push(n),o(t);var i=e._readableState;i.reading=!1,(i.needReadable||i.length<i.highWaterMark)&&e._read(i.highWaterMark)}function i(e){if(!(this instanceof i))return new i(e);a.call(this,e),this._transformState=new r(this);var t=this;this._readableState.needReadable=!0,this._readableState.sync=!1,e&&("function"==typeof e.transform&&(this._transform=e.transform),"function"==typeof e.flush&&(this._flush=e.flush)),this.once("prefinish",function(){"function"==typeof this._flush?this._flush(function(e){s(t,e)}):s(t)})}function s(e,t){if(t)return e.emit("error",t);var n=e._writableState,r=e._transformState;if(n.length)throw new Error("Calling transform done when ws.length != 0");if(r.transforming)throw new Error("Calling transform done when still transforming");return e.push(null)}t.exports=i;var a=e("./_stream_duplex"),u=e("core-util-is");u.inherits=e("inherits"),u.inherits(i,a),i.prototype.push=function(e,t){return this._transformState.needTransform=!1,a.prototype.push.call(this,e,t)},i.prototype._transform=function(e,t,n){throw new Error("Not implemented")},i.prototype._write=function(e,t,n){var r=this._transformState;if(r.writecb=n,r.writechunk=e,r.writeencoding=t,!r.transforming){var o=this._readableState;(r.needTransform||o.needReadable||o.length<o.highWaterMark)&&this._read(o.highWaterMark)}},i.prototype._read=function(e){var t=this._transformState;null!==t.writechunk&&t.writecb&&!t.transforming?(t.transforming=!0,this._transform(t.writechunk,t.writeencoding,t.afterTransform)):t.needTransform=!0}},{"./_stream_duplex":76,"core-util-is":28,inherits:42}],80:[function(e,t,n){(function(n){"use strict";function r(){}function o(e,t,n){this.chunk=e,this.encoding=t,this.callback=n,this.next=null}function i(t,n){C=C||e("./_stream_duplex"),t=t||{},this.objectMode=!!t.objectMode,n instanceof C&&(this.objectMode=this.objectMode||!!t.writableObjectMode);var r=t.highWaterMark,o=this.objectMode?16:16384;this.highWaterMark=r||0===r?r:o,this.highWaterMark=~~this.highWaterMark,this.needDrain=!1,this.ending=!1,this.ended=!1,this.finished=!1;var i=t.decodeStrings===!1;this.decodeStrings=!i,this.defaultEncoding=t.defaultEncoding||"utf8",this.length=0,this.writing=!1,this.corked=0,this.sync=!0,this.bufferProcessing=!1,this.onwrite=function(e){p(n,e)},this.writecb=null,this.writelen=0,this.bufferedRequest=null,this.lastBufferedRequest=null,this.pendingcb=0,this.prefinished=!1,this.errorEmitted=!1,this.bufferedRequestCount=0,this.corkedRequestsFree=new E(this)}function s(t){return C=C||e("./_stream_duplex"),this instanceof s||this instanceof C?(this._writableState=new i(t,this),this.writable=!0,t&&("function"==typeof t.write&&(this._write=t.write),"function"==typeof t.writev&&(this._writev=t.writev)),void B.call(this)):new s(t)}function a(e,t){var n=new Error("write after end");e.emit("error",n),k(t,n)}function u(e,t,n,r){var o=!0,i=!1;return null===n?i=new TypeError("May not write null values to stream"):A.isBuffer(n)||"string"==typeof n||void 0===n||t.objectMode||(i=new TypeError("Invalid non-string/buffer chunk")),i&&(e.emit("error",i),k(r,i),o=!1),o}function c(e,t,n){return e.objectMode||e.decodeStrings===!1||"string"!=typeof t||(t=T.from(t,n)),t}function f(e,t,n,r,i){n=c(t,n,r),A.isBuffer(n)&&(r="buffer");var s=t.objectMode?1:n.length;t.length+=s;var a=t.length<t.highWaterMark;if(a||(t.needDrain=!0),t.writing||t.corked){var u=t.lastBufferedRequest;t.lastBufferedRequest=new o(n,r,i),u?u.next=t.lastBufferedRequest:t.bufferedRequest=t.lastBufferedRequest,t.bufferedRequestCount+=1}else d(e,t,!1,s,n,r,i);return a}function d(e,t,n,r,o,i,s){t.writelen=r,t.writecb=s,t.writing=!0,t.sync=!0,n?e._writev(o,t.onwrite):e._write(o,i,t.onwrite),t.sync=!1}function h(e,t,n,r,o){--t.pendingcb,n?k(o,r):o(r),e._writableState.errorEmitted=!0,e.emit("error",r)}function l(e){e.writing=!1,e.writecb=null,e.length-=e.writelen,e.writelen=0}function p(e,t){var n=e._writableState,r=n.sync,o=n.writecb;if(l(n),t)h(e,n,r,t,o);else{var i=_(n);i||n.corked||n.bufferProcessing||!n.bufferedRequest||y(e,n),r?x(m,e,n,i,o):m(e,n,i,o)}}function m(e,t,n,r){n||g(e,t),t.pendingcb--,r(),b(e,t)}function g(e,t){0===t.length&&t.needDrain&&(t.needDrain=!1,e.emit("drain"))}function y(e,t){t.bufferProcessing=!0;var n=t.bufferedRequest;if(e._writev&&n&&n.next){var r=t.bufferedRequestCount,o=new Array(r),i=t.corkedRequestsFree;i.entry=n;for(var s=0;n;)o[s]=n,n=n.next,s+=1;d(e,t,!0,t.length,o,"",i.finish),t.pendingcb++,t.lastBufferedRequest=null,i.next?(t.corkedRequestsFree=i.next,i.next=null):t.corkedRequestsFree=new E(t)}else{for(;n;){var a=n.chunk,u=n.encoding,c=n.callback,f=t.objectMode?1:a.length;if(d(e,t,!1,f,a,u,c),n=n.next,t.writing)break}null===n&&(t.lastBufferedRequest=null)}t.bufferedRequestCount=0,t.bufferedRequest=n,t.bufferProcessing=!1}function _(e){return e.ending&&0===e.length&&null===e.bufferedRequest&&!e.finished&&!e.writing}function v(e,t){t.prefinished||(t.prefinished=!0,e.emit("prefinish"))}function b(e,t){var n=_(t);return n&&(0===t.pendingcb?(v(e,t),t.finished=!0,e.emit("finish")):v(e,t)),n}function w(e,t,n){t.ending=!0,b(e,t),n&&(t.finished?k(n):e.once("finish",n)),t.ended=!0,e.writable=!1}function E(e){var t=this;this.next=null,this.entry=null,this.finish=function(n){var r=t.entry;for(t.entry=null;r;){var o=r.callback;e.pendingcb--,o(n),r=r.next}e.corkedRequestsFree?e.corkedRequestsFree.next=t:e.corkedRequestsFree=t}}t.exports=s;var k=e("process-nextick-args"),x=!n.browser&&["v0.10","v0.9."].indexOf(n.version.slice(0,5))>-1?setImmediate:k;s.WritableState=i;var S=e("core-util-is");S.inherits=e("inherits");var B,I={deprecate:e("util-deprecate")};!function(){try{B=e("stream")}catch(e){}finally{B||(B=e("events").EventEmitter)}}();var A=e("buffer").Buffer,T=e("buffer-shims");S.inherits(s,B);var C;i.prototype.getBuffer=function(){for(var e=this.bufferedRequest,t=[];e;)t.push(e),e=e.next;return t},function(){try{Object.defineProperty(i.prototype,"buffer",{get:I.deprecate(function(){return this.getBuffer()},"_writableState.buffer is deprecated. Use _writableState.getBuffer instead.")})}catch(e){}}();var C;s.prototype.pipe=function(){this.emit("error",new Error("Cannot pipe, not readable"))},s.prototype.write=function(e,t,n){var o=this._writableState,i=!1;return"function"==typeof t&&(n=t,t=null),A.isBuffer(e)?t="buffer":t||(t=o.defaultEncoding),"function"!=typeof n&&(n=r),o.ended?a(this,n):u(this,o,e,n)&&(o.pendingcb++,i=f(this,o,e,t,n)),i},s.prototype.cork=function(){var e=this._writableState;e.corked++},s.prototype.uncork=function(){var e=this._writableState;e.corked&&(e.corked--,e.writing||e.corked||e.finished||e.bufferProcessing||!e.bufferedRequest||y(this,e))},s.prototype.setDefaultEncoding=function(e){if("string"==typeof e&&(e=e.toLowerCase()),!(["hex","utf8","utf-8","ascii","binary","base64","ucs2","ucs-2","utf16le","utf-16le","raw"].indexOf((e+"").toLowerCase())>-1))throw new TypeError("Unknown encoding: "+e);return this._writableState.defaultEncoding=e,this},s.prototype._write=function(e,t,n){n(new Error("not implemented"))},s.prototype._writev=null,s.prototype.end=function(e,t,n){var r=this._writableState;"function"==typeof e?(n=e,e=null,t=null):"function"==typeof t&&(n=t,t=null),null!==e&&void 0!==e&&this.write(e,t),r.corked&&(r.corked=1,this.uncork()),r.ending||r.finished||w(this,r,n)}}).call(this,e("_process"))},{"./_stream_duplex":76,_process:67,buffer:24,"buffer-shims":23,"core-util-is":28,events:35,inherits:42,"process-nextick-args":66,"util-deprecate":115}],81:[function(e,t,n){"use strict";function r(){this.head=null,this.tail=null,this.length=0}var o=(e("buffer").Buffer,e("buffer-shims"));t.exports=r,r.prototype.push=function(e){var t={data:e,next:null};this.length>0?this.tail.next=t:this.head=t,this.tail=t,++this.length},r.prototype.unshift=function(e){var t={data:e,next:this.head};0===this.length&&(this.tail=t),this.head=t,++this.length},r.prototype.shift=function(){if(0!==this.length){var e=this.head.data;return 1===this.length?this.head=this.tail=null:this.head=this.head.next,--this.length,e}},r.prototype.clear=function(){this.head=this.tail=null,this.length=0},r.prototype.join=function(e){if(0===this.length)return"";for(var t=this.head,n=""+t.data;t=t.next;)n+=e+t.data;return n},r.prototype.concat=function(e){if(0===this.length)return o.alloc(0);if(1===this.length)return this.head.data;for(var t=o.allocUnsafe(e>>>0),n=this.head,r=0;n;)n.data.copy(t,r),r+=n.data.length,n=n.next;return t}},{buffer:24,"buffer-shims":23}],82:[function(e,t,n){(function(r){var o=function(){try{return e("stream")}catch(e){}}();n=t.exports=e("./lib/_stream_readable.js"),n.Stream=o||n,n.Readable=n,n.Writable=e("./lib/_stream_writable.js"),n.Duplex=e("./lib/_stream_duplex.js"),n.Transform=e("./lib/_stream_transform.js"),n.PassThrough=e("./lib/_stream_passthrough.js"),!r.browser&&"disable"===r.env.READABLE_STREAM&&o&&(t.exports=o)}).call(this,e("_process"))},{"./lib/_stream_duplex.js":76,"./lib/_stream_passthrough.js":77,"./lib/_stream_readable.js":78,"./lib/_stream_transform.js":79,"./lib/_stream_writable.js":80,_process:67}],83:[function(e,t,n){function r(e,t,n,r){"function"==typeof n&&(r=n,n={}),n||(n={}),r||(r=function(){}),a(e),c(n),"string"==typeof t&&(t=document.querySelector(t)),i(e,function(n){if(t.nodeName!==n.toUpperCase()){var r=l.extname(e.name).toLowerCase();throw new Error('Cannot render "'+r+'" inside a "'+t.nodeName.toLowerCase()+'" element, expected "'+n+'"')}return t},n,r)}function o(e,t,n,r){function o(e){return"video"===e||"audio"===e?s(e):u(e)}function s(e){var r=u(e);return n.controls&&(r.controls=!0),n.autoplay&&(r.autoplay=!0),t.appendChild(r),r}function u(e){var n=document.createElement(e);return t.appendChild(n),n}function f(e,t){e&&t&&t.remove(),r(e,t)}if("function"==typeof n&&(r=n,n={}),n||(n={}),r||(r=function(){}),a(e),c(n),"string"==typeof t&&(t=document.querySelector(t)),t&&("VIDEO"===t.nodeName||"AUDIO"===t.nodeName))throw new Error("Invalid video/audio node argument. Argument must be root element that video/audio tag will be appended to.");i(e,o,n,f)}function i(e,t,n,r){function o(){function r(){f("Use `videostream` package for "+e.name),p(),B.addEventListener("error",d),B.addEventListener("loadstart",a),B.addEventListener("canplay",c),m(e,B)}function o(){f("Use MediaSource API for "+e.name),p(),B.addEventListener("error",l),B.addEventListener("loadstart",a),B.addEventListener("canplay",c);var t=new h(B),n=t.createWriteStream(u(e.name));e.createReadStream().pipe(n),A&&(B.currentTime=A)}function i(){f("Use Blob URL for "+e.name),p(),B.addEventListener("error",S),B.addEventListener("loadstart",a),B.addEventListener("canplay",c),s(e,function(e,t){return e?S(e):(B.src=t,void(A&&(B.currentTime=A)))})}function d(e){f("videostream error: fallback to MediaSource API: %o",e.message||e),B.removeEventListener("error",d),B.removeEventListener("canplay",c),o()}function l(t){return f("MediaSource API error: fallback to Blob URL: %o",t.message||t),"number"==typeof e.length&&e.length>n.maxBlobLength?(f("File length too large for Blob URL approach: %d (max: %d)",e.length,n.maxBlobLength),S(new Error("File length too large for Blob URL approach: "+e.length+" (max: "+n.maxBlobLength+")"))):(B.removeEventListener("error",l),B.removeEventListener("canplay",c),void i())}function p(){B||(B=t(_),B.addEventListener("progress",function(){A=B.currentTime}))}var _=y.indexOf(I)>=0?"video":"audio";x?g.indexOf(I)>=0?r():o():i()}function i(){B=t("audio"),s(e,function(e,t){return e?S(e):(B.addEventListener("error",S),B.addEventListener("loadstart",a),B.addEventListener("canplay",c),void(B.src=t))})}function a(){B.removeEventListener("loadstart",a),n.autoplay&&B.play()}function c(){B.removeEventListener("canplay",c),r(null,B)}function p(){B=t("img"),s(e,function(t,n){return t?S(t):(B.src=n,B.alt=e.name,void r(null,B))})}function _(){B=t("iframe"),s(e,function(e,t){return e?S(e):(B.src=t,".pdf"!==I&&(B.sandbox="allow-forms allow-scripts"),void r(null,B))})}function k(){function t(){d(n)?(f('File extension "%s" appears ascii, so will render.',I),_()):(f('File extension "%s" appears non-ascii, will not render.',I),r(new Error('Unsupported file type "'+I+'": Cannot append to DOM')))}f('Unknown file extension "%s" - will attempt to render into iframe',I);var n="";e.createReadStream({start:0,end:1e3}).setEncoding("utf8").on("data",function(e){n+=e}).on("end",t).on("error",r)}function S(t){t.message='Error rendering file "'+e.name+'": '+t.message,f(t.message),r(t)}var B,I=l.extname(e.name).toLowerCase(),A=0;v.indexOf(I)>=0?o():b.indexOf(I)>=0?i():w.indexOf(I)>=0?p():E.indexOf(I)>=0?_():k()}function s(e,t){var r=l.extname(e.name).toLowerCase();p(e.createReadStream(),n.mime[r],t)}function a(e){if(null==e)throw new Error("file cannot be null or undefined");if("string"!=typeof e.name)throw new Error("missing or invalid file.name property");if("function"!=typeof e.createReadStream)throw new Error("missing or invalid file.createReadStream property")}function u(e){var t=l.extname(e).toLowerCase();return{".m4a":'audio/mp4; codecs="mp4a.40.5"',".m4v":'video/mp4; codecs="avc1.640029, mp4a.40.5"',".mkv":'video/webm; codecs="avc1.640029, mp4a.40.5"',".mp3":"audio/mpeg",".mp4":'video/mp4; codecs="avc1.640029, mp4a.40.5"',".webm":'video/webm; codecs="vorbis, vp8"'}[t]}function c(e){null==e.autoplay&&(e.autoplay=!0),null==e.controls&&(e.controls=!0),null==e.maxBlobLength&&(e.maxBlobLength=k)}n.render=r,n.append=o,n.mime=e("./lib/mime.json");var f=e("debug")("render-media"),d=e("is-ascii"),h=e("mediasource"),l=e("path"),p=e("stream-to-blob-url"),m=e("videostream"),g=[".m4a",".m4v",".mp4"],y=[".m4v",".mkv",".mp4",".webm"],_=[".m4a",".mp3"],v=[].concat(y,_),b=[".aac",".oga",".ogg",".wav"],w=[".bmp",".gif",".jpeg",".jpg",".png"],E=[".css",".html",".js",".md",".pdf",".txt"],k=2e8,x="undefined"!=typeof window&&window.MediaSource},{"./lib/mime.json":84,debug:30,"is-ascii":43,mediasource:50,path:64,"stream-to-blob-url":99,videostream:117}],84:[function(e,t,n){t.exports={".3gp":"video/3gpp",".aac":"audio/aac",".aif":"audio/x-aiff",".aiff":"audio/x-aiff",".atom":"application/atom+xml",".avi":"video/x-msvideo",".bmp":"image/bmp",".bz2":"application/x-bzip2",".conf":"text/plain",".css":"text/css",".csv":"text/csv",".diff":"text/x-diff",".doc":"application/msword",".flv":"video/x-flv",".gif":"image/gif",".gz":"application/x-gzip",".htm":"text/html",".html":"text/html",".ico":"image/vnd.microsoft.icon",".ics":"text/calendar",".iso":"application/octet-stream",".jar":"application/java-archive",".jpeg":"image/jpeg",".jpg":"image/jpeg",".js":"application/javascript",".json":"application/json",".less":"text/css",".log":"text/plain",".m3u":"audio/x-mpegurl",".m4a":"audio/mp4",".m4v":"video/mp4",".manifest":"text/cache-manifest",".markdown":"text/x-markdown",".mathml":"application/mathml+xml",".md":"text/x-markdown",".mid":"audio/midi",".midi":"audio/midi",".mov":"video/quicktime",".mp3":"audio/mpeg",".mp4":"video/mp4",".mp4v":"video/mp4",".mpeg":"video/mpeg",".mpg":"video/mpeg",".odp":"application/vnd.oasis.opendocument.presentation",".ods":"application/vnd.oasis.opendocument.spreadsheet",".odt":"application/vnd.oasis.opendocument.text",".oga":"audio/ogg",".ogg":"application/ogg",".pdf":"application/pdf",".png":"image/png",".pps":"application/vnd.ms-powerpoint",".ppt":"application/vnd.ms-powerpoint",".ps":"application/postscript",".psd":"image/vnd.adobe.photoshop",".qt":"video/quicktime",".rar":"application/x-rar-compressed",".rdf":"application/rdf+xml",".rss":"application/rss+xml",".rtf":"application/rtf",".svg":"image/svg+xml",".svgz":"image/svg+xml",".swf":"application/x-shockwave-flash",".tar":"application/x-tar",".tbz":"application/x-bzip-compressed-tar",".text":"text/plain",".tif":"image/tiff",".tiff":"image/tiff",".torrent":"application/x-bittorrent",".ttf":"application/x-font-ttf",".txt":"text/plain",".wav":"audio/wav",".webm":"video/webm",".wma":"audio/x-ms-wma",".wmv":"video/x-ms-wmv",".xls":"application/vnd.ms-excel",".xml":"application/xml",".yaml":"text/yaml",".yml":"text/yaml",".zip":"application/zip"}},{}],85:[function(e,t,n){(function(e){t.exports=function(t,n,r){function o(t){function n(){r&&r(t,s),r=null}d?e.nextTick(n):n()}function i(e,n,r){if(s[e]=r,n&&(f=!0),0===--u||n)o(n);else if(!f&&h<a){var d;c?(d=c[h],h+=1,t[d](function(e,t){i(d,e,t)})):(d=h,h+=1,t[d](function(e,t){i(d,e,t)}))}}if("number"!=typeof n)throw new Error("second argument must be a Number");var s,a,u,c,f,d=!0;Array.isArray(t)?(s=[],u=a=t.length):(c=Object.keys(t),s={},u=a=c.length);var h=n;u?c?c.some(function(e,r){if(t[e](function(t,n){i(e,t,n)}),r===n-1)return!0}):t.some(function(e,t){if(e(function(e,n){i(t,e,n)}),t===n-1)return!0}):o(null),d=!1}}).call(this,e("_process"))},{_process:67}],86:[function(e,t,n){(function(e){t.exports=function(t,n){function r(t){function r(){n&&n(t,i),n=null}u?e.nextTick(r):r()}function o(e,t,n){i[e]=n,(0===--s||t)&&r(t)}var i,s,a,u=!0;Array.isArray(t)?(i=[],s=t.length):(a=Object.keys(t),i={},s=a.length),s?a?a.forEach(function(e){t[e](function(t,n){o(e,t,n)})}):t.forEach(function(e,t){e(function(e,n){o(t,e,n)})}):r(null),u=!1}}).call(this,e("_process"))},{_process:67}],87:[function(e,t,n){(function(e){!function(){function n(e){"use strict";for(var t={fill:0},i=function(e){for(e+=9;e%64>0;e+=1);return e},s=function(e,t){for(var n=t>>2;n<e.length;n++)e[n]=0},a=function(e,t,n){e[t>>2]|=128<<24-(t%4<<3),e[((t>>2)+2&-16)+14]=n/(1<<29)|0,e[((t>>2)+2&-16)+15]=n<<3},u=function(e,t,n,r,o){var i,s=this,a=o%4,u=r%4,c=r-u;if(c>0)switch(a){case 0:e[o+3|0]=s.charCodeAt(n);case 1:e[o+2|0]=s.charCodeAt(n+1);case 2:e[o+1|0]=s.charCodeAt(n+2);case 3:e[0|o]=s.charCodeAt(n+3)}for(i=a;i<c;i=i+4|0)t[o+i>>2]=s.charCodeAt(n+i)<<24|s.charCodeAt(n+i+1)<<16|s.charCodeAt(n+i+2)<<8|s.charCodeAt(n+i+3);switch(u){case 3:e[o+c+1|0]=s.charCodeAt(n+c+2);case 2:e[o+c+2|0]=s.charCodeAt(n+c+1);case 1:e[o+c+3|0]=s.charCodeAt(n+c)}},c=function(e,t,n,r,o){var i,s=this,a=o%4,u=r%4,c=r-u;if(c>0)switch(a){case 0:e[o+3|0]=s[n];case 1:e[o+2|0]=s[n+1];case 2:e[o+1|0]=s[n+2];case 3:e[0|o]=s[n+3]}for(i=4-a;i<c;i=i+=4)t[o+i>>2]=s[n+i]<<24|s[n+i+1]<<16|s[n+i+2]<<8|s[n+i+3];switch(u){case 3:e[o+c+1|0]=s[n+c+2];case 2:e[o+c+2|0]=s[n+c+1];case 1:e[o+c+3|0]=s[n+c]}},f=function(e,t,n,r,i){var s,a=this,u=i%4,c=r%4,f=r-c,d=new Uint8Array(o.readAsArrayBuffer(a.slice(n,n+r)));if(f>0)switch(u){case 0:e[i+3|0]=d[0];case 1:e[i+2|0]=d[1];case 2:e[i+1|0]=d[2];case 3:e[0|i]=d[3]}for(s=4-u;s<f;s=s+=4)t[i+s>>2]=d[s]<<24|d[s+1]<<16|d[s+2]<<8|d[s+3];switch(c){case 3:e[i+f+1|0]=d[f+2];case 2:e[i+f+2|0]=d[f+1];case 1:e[i+f+3|0]=d[f]}},d=function(e){switch(r.getDataType(e)){case"string":return u.bind(e);case"array":return c.bind(e);case"buffer":return c.bind(e);case"arraybuffer":return c.bind(new Uint8Array(e));case"view":return c.bind(new Uint8Array(e.buffer,e.byteOffset,e.byteLength));case"blob":return f.bind(e)}},h=new Array(256),l=0;l<256;l++)h[l]=(l<16?"0":"")+l.toString(16);var p=function(e){for(var t=new Uint8Array(e),n=new Array(e.byteLength),r=0;r<n.length;r++)n[r]=h[t[r]];return n.join("")},m=function(e){var t;
if(e<=65536)return 65536;if(e<16777216)for(t=1;t<e;t<<=1);else for(t=16777216;t<e;t+=16777216);return t},g=function(e){if(e%64>0)throw new Error("Chunk size must be a multiple of 128 bit");t.maxChunkLen=e,t.padMaxChunkLen=i(e),t.heap=new ArrayBuffer(m(t.padMaxChunkLen+320+20)),t.h32=new Int32Array(t.heap),t.h8=new Int8Array(t.heap),t.core=new n._core({Int32Array:Int32Array,DataView:DataView},{},t.heap),t.buffer=null};g(e||65536);var y=function(e,t){var n=new Int32Array(e,t+320,5);n[0]=1732584193,n[1]=-271733879,n[2]=-1732584194,n[3]=271733878,n[4]=-1009589776},_=function(e,n){var r=i(e),o=new Int32Array(t.heap,0,r>>2);return s(o,e),a(o,e,n),r},v=function(e,n,r){d(e)(t.h8,t.h32,n,r,0)},b=function(e,n,r,o,i){var s=r;i&&(s=_(r,o)),v(e,n,r),t.core.hash(s,t.padMaxChunkLen)},w=function(e,t){var n=new Int32Array(e,t+320,5),r=new Int32Array(5),o=new DataView(r.buffer);return o.setInt32(0,n[0],!1),o.setInt32(4,n[1],!1),o.setInt32(8,n[2],!1),o.setInt32(12,n[3],!1),o.setInt32(16,n[4],!1),r},E=this.rawDigest=function(e){var n=e.byteLength||e.length||e.size||0;y(t.heap,t.padMaxChunkLen);var r=0,o=t.maxChunkLen;for(r=0;n>r+o;r+=o)b(e,r,o,n,!1);return b(e,r,n-r,n,!0),w(t.heap,t.padMaxChunkLen)};this.digest=this.digestFromString=this.digestFromBuffer=this.digestFromArrayBuffer=function(e){return p(E(e).buffer)}}var r={getDataType:function(t){if("string"==typeof t)return"string";if(t instanceof Array)return"array";if("undefined"!=typeof e&&e.Buffer&&e.Buffer.isBuffer(t))return"buffer";if(t instanceof ArrayBuffer)return"arraybuffer";if(t.buffer instanceof ArrayBuffer)return"view";if(t instanceof Blob)return"blob";throw new Error("Unsupported data type.")}};if(n._core=function e(t,n,r){"use asm";var o=new t.Int32Array(r);function i(e,t){e=e|0;t=t|0;var n=0,r=0,i=0,s=0,a=0,u=0,c=0,f=0,d=0,h=0,l=0,p=0,m=0,g=0;i=o[t+320>>2]|0;a=o[t+324>>2]|0;c=o[t+328>>2]|0;d=o[t+332>>2]|0;l=o[t+336>>2]|0;for(n=0;(n|0)<(e|0);n=n+64|0){s=i;u=a;f=c;h=d;p=l;for(r=0;(r|0)<64;r=r+4|0){g=o[n+r>>2]|0;m=((i<<5|i>>>27)+(a&c|~a&d)|0)+((g+l|0)+1518500249|0)|0;l=d;d=c;c=a<<30|a>>>2;a=i;i=m;o[e+r>>2]=g}for(r=e+64|0;(r|0)<(e+80|0);r=r+4|0){g=(o[r-12>>2]^o[r-32>>2]^o[r-56>>2]^o[r-64>>2])<<1|(o[r-12>>2]^o[r-32>>2]^o[r-56>>2]^o[r-64>>2])>>>31;m=((i<<5|i>>>27)+(a&c|~a&d)|0)+((g+l|0)+1518500249|0)|0;l=d;d=c;c=a<<30|a>>>2;a=i;i=m;o[r>>2]=g}for(r=e+80|0;(r|0)<(e+160|0);r=r+4|0){g=(o[r-12>>2]^o[r-32>>2]^o[r-56>>2]^o[r-64>>2])<<1|(o[r-12>>2]^o[r-32>>2]^o[r-56>>2]^o[r-64>>2])>>>31;m=((i<<5|i>>>27)+(a^c^d)|0)+((g+l|0)+1859775393|0)|0;l=d;d=c;c=a<<30|a>>>2;a=i;i=m;o[r>>2]=g}for(r=e+160|0;(r|0)<(e+240|0);r=r+4|0){g=(o[r-12>>2]^o[r-32>>2]^o[r-56>>2]^o[r-64>>2])<<1|(o[r-12>>2]^o[r-32>>2]^o[r-56>>2]^o[r-64>>2])>>>31;m=((i<<5|i>>>27)+(a&c|a&d|c&d)|0)+((g+l|0)-1894007588|0)|0;l=d;d=c;c=a<<30|a>>>2;a=i;i=m;o[r>>2]=g}for(r=e+240|0;(r|0)<(e+320|0);r=r+4|0){g=(o[r-12>>2]^o[r-32>>2]^o[r-56>>2]^o[r-64>>2])<<1|(o[r-12>>2]^o[r-32>>2]^o[r-56>>2]^o[r-64>>2])>>>31;m=((i<<5|i>>>27)+(a^c^d)|0)+((g+l|0)-899497514|0)|0;l=d;d=c;c=a<<30|a>>>2;a=i;i=m;o[r>>2]=g}i=i+s|0;a=a+u|0;c=c+f|0;d=d+h|0;l=l+p|0}o[t+320>>2]=i;o[t+324>>2]=a;o[t+328>>2]=c;o[t+332>>2]=d;o[t+336>>2]=l}return{hash:i}},"undefined"!=typeof t?t.exports=n:"undefined"!=typeof window&&(window.Rusha=n),"undefined"!=typeof FileReaderSync){var o=new FileReaderSync,i=new n(4194304);self.onmessage=function(e){var t,n=e.data.data;try{t=i.digest(n),self.postMessage({id:e.data.id,hash:t})}catch(t){self.postMessage({id:e.data.id,error:t.name})}}}}()}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],88:[function(e,t,n){t.exports=e("buffer")},{buffer:24}],89:[function(e,t,n){(function(e){t.exports=function(t,n){var r=[];t.on("data",function(e){r.push(e)}),t.once("end",function(){n&&n(null,e.concat(r)),n=null}),t.once("error",function(e){n&&n(e),n=null})}}).call(this,e("buffer").Buffer)},{buffer:24}],90:[function(e,t,n){(function(n){function r(e,t){e="string"==typeof e?{url:e}:i(e),t=u(t),e.url&&o(e),null==e.headers&&(e.headers={}),null==e.maxRedirects&&(e.maxRedirects=10);var n=e.json?JSON.stringify(e.body):e.body;e.body=void 0,n&&!e.method&&(e.method="POST"),e.method&&(e.method=e.method.toUpperCase()),e.json&&(e.headers.accept="application/json"),e.json&&n&&(e.headers["content-type"]="application/json");var f=Object.keys(e.headers).some(function(e){return"accept-encoding"===e.toLowerCase()});f||(e.headers["accept-encoding"]="gzip, deflate");var d="https:"===e.protocol?a:s,h=d.request(e,function(n){if(n.statusCode>=300&&n.statusCode<400&&"location"in n.headers)return e.url=n.headers.location,o(e),n.resume(),e.maxRedirects-=1,void(e.maxRedirects>0?r(e,t):t(new Error("too many redirects")));var i="function"==typeof c&&"HEAD"!==e.method;t(null,i?c(n):n)});return h.on("error",t),h.end(n),h}function o(e){var t=f.parse(e.url);t.hostname&&(e.hostname=t.hostname),t.port&&(e.port=t.port),t.protocol&&(e.protocol=t.protocol),t.auth&&(e.auth=t.auth),e.path=t.path,delete e.url}t.exports=r;var i=e("xtend"),s=e("http"),a=e("https"),u=e("once"),c=e("unzip-response"),f=e("url");t.exports.concat=function(e,t){return r(e,function(r,o){if(r)return t(r);var i=[];o.on("data",function(e){i.push(e)}),o.on("end",function(){var r=n.concat(i);if(e.json)try{r=JSON.parse(r.toString())}catch(e){return t(e,o,r)}t(null,o,r)})})},["get","post","put","patch","head","delete"].forEach(function(e){t.exports[e]=function(t,n){return"string"==typeof t&&(t={url:t}),t.method=e.toUpperCase(),r(t,n)}})}).call(this,e("buffer").Buffer)},{buffer:24,http:95,https:39,once:61,"unzip-response":21,url:112,xtend:119}],91:[function(e,t,n){(function(n){function r(e){var t=this;if(!(t instanceof r))return new r(e);if(t.channelName=e.initiator?e.channelName||u(20).toString("hex"):null,t._debug("new peer %o",e),e||(e={}),e.allowHalfOpen=!1,null==e.highWaterMark&&(e.highWaterMark=1048576),c.Duplex.call(t,e),t.initiator=e.initiator||!1,t.channelConfig=e.channelConfig||r.channelConfig,t.config=e.config||r.config,t.constraints=e.constraints||r.constraints,t.offerConstraints=e.offerConstraints||{},t.answerConstraints=e.answerConstraints||{},t.reconnectTimer=e.reconnectTimer||!1,t.sdpTransform=e.sdpTransform||function(e){return e},t.stream=e.stream||!1,t.trickle=void 0===e.trickle||e.trickle,t.destroyed=!1,t.connected=!1,t.remoteAddress=void 0,t.remoteFamily=void 0,t.remotePort=void 0,t.localAddress=void 0,t.localPort=void 0,t._isWrtc=!!e.wrtc,t._wrtc=e.wrtc&&"object"==typeof e.wrtc?e.wrtc:s(),!t._wrtc)throw"undefined"==typeof window?new Error("No WebRTC support: Specify `opts.wrtc` option in this environment"):new Error("No WebRTC support: Not a supported browser");if(t._maxBufferedAmount=e.highWaterMark,t._pcReady=!1,t._channelReady=!1,t._iceComplete=!1,t._channel=null,t._pendingCandidates=[],t._chunk=null,t._cb=null,t._interval=null,t._reconnectTimeout=null,t._pc=new t._wrtc.RTCPeerConnection(t.config,t.constraints),t._pc.oniceconnectionstatechange=function(){t._onIceConnectionStateChange()},t._pc.onsignalingstatechange=function(){t._onSignalingStateChange()},t._pc.onicecandidate=function(e){t._onIceCandidate(e)},t.stream&&t._pc.addStream(t.stream),"ontrack"in t._pc?t._pc.ontrack=function(e){t._onTrack(e)}:t._pc.onaddstream=function(e){t._onAddStream(e)},t.initiator){t._setupData({channel:t._pc.createDataChannel(t.channelName,t.channelConfig)});var n=!1;t._pc.onnegotiationneeded=function(){n||t._createOffer(),n=!0},"undefined"!=typeof window&&window.webkitRTCPeerConnection||t._pc.onnegotiationneeded()}else t._pc.ondatachannel=function(e){t._setupData(e)};t.on("finish",function(){t.connected?setTimeout(function(){t._destroy()},100):t.once("connect",function(){setTimeout(function(){t._destroy()},100)})})}function o(){}t.exports=r;var i=e("debug")("simple-peer"),s=e("get-browser-rtc"),a=e("inherits"),u=e("randombytes"),c=e("readable-stream");a(r,c.Duplex),r.WEBRTC_SUPPORT=!!s(),r.config={iceServers:[{url:"stun:23.21.150.121",urls:"stun:23.21.150.121"}]},r.constraints={},r.channelConfig={},Object.defineProperty(r.prototype,"bufferSize",{get:function(){var e=this;return e._channel&&e._channel.bufferedAmount||0}}),r.prototype.address=function(){var e=this;return{port:e.localPort,family:"IPv4",address:e.localAddress}},r.prototype.signal=function(e){function t(e){try{n._pc.addIceCandidate(new n._wrtc.RTCIceCandidate(e),o,function(e){n._onError(e)})}catch(e){n._destroy(new Error("error adding candidate: "+e.message))}}var n=this;if(n.destroyed)throw new Error("cannot signal after peer is destroyed");if("string"==typeof e)try{e=JSON.parse(e)}catch(t){e={}}n._debug("signal()"),e.sdp&&n._pc.setRemoteDescription(new n._wrtc.RTCSessionDescription(e),function(){n.destroyed||("offer"===n._pc.remoteDescription.type&&n._createAnswer(),n._pendingCandidates.forEach(t),n._pendingCandidates=[])},function(e){n._onError(e)}),e.candidate&&(n._pc.remoteDescription?t(e.candidate):n._pendingCandidates.push(e.candidate)),e.sdp||e.candidate||n._destroy(new Error("signal() called with invalid signal data"))},r.prototype.send=function(e){var t=this;n.isBuffer(e)&&t._isWrtc&&(e=new Uint8Array(e));var r=e.length||e.byteLength||e.size;t._channel.send(e),t._debug("write: %d bytes",r)},r.prototype.destroy=function(e){var t=this;t._destroy(null,e)},r.prototype._destroy=function(e,t){var n=this;if(!n.destroyed){if(t&&n.once("close",t),n._debug("destroy (error: %s)",e&&e.message),n.readable=n.writable=!1,n._readableState.ended||n.push(null),n._writableState.finished||n.end(),n.destroyed=!0,n.connected=!1,n._pcReady=!1,n._channelReady=!1,n._chunk=null,n._cb=null,clearInterval(n._interval),clearTimeout(n._reconnectTimeout),n._pc){try{n._pc.close()}catch(e){}n._pc.oniceconnectionstatechange=null,n._pc.onsignalingstatechange=null,n._pc.onicecandidate=null,"ontrack"in n._pc?n._pc.ontrack=null:n._pc.onaddstream=null,n._pc.onnegotiationneeded=null,n._pc.ondatachannel=null}if(n._channel){try{n._channel.close()}catch(e){}n._channel.onmessage=null,n._channel.onopen=null,n._channel.onclose=null}n._pc=null,n._channel=null,e&&n.emit("error",e),n.emit("close")}},r.prototype._setupData=function(e){var t=this;t._channel=e.channel,t.channelName=t._channel.label,t._channel.binaryType="arraybuffer",t._channel.onmessage=function(e){t._onChannelMessage(e)},t._channel.onopen=function(){t._onChannelOpen()},t._channel.onclose=function(){t._onChannelClose()}},r.prototype._read=function(){},r.prototype._write=function(e,t,n){var r=this;if(r.destroyed)return n(new Error("cannot write after peer is destroyed"));if(r.connected){try{r.send(e)}catch(e){return r._onError(e)}r._channel.bufferedAmount>r._maxBufferedAmount?(r._debug("start backpressure: bufferedAmount %d",r._channel.bufferedAmount),r._cb=n):n(null)}else r._debug("write before connect"),r._chunk=e,r._cb=n},r.prototype._createOffer=function(){var e=this;e.destroyed||e._pc.createOffer(function(t){if(!e.destroyed){t.sdp=e.sdpTransform(t.sdp),e._pc.setLocalDescription(t,o,function(t){e._onError(t)});var n=function(){var n=e._pc.localDescription||t;e._debug("signal"),e.emit("signal",{type:n.type,sdp:n.sdp})};e.trickle||e._iceComplete?n():e.once("_iceComplete",n)}},function(t){e._onError(t)},e.offerConstraints)},r.prototype._createAnswer=function(){var e=this;e.destroyed||e._pc.createAnswer(function(t){if(!e.destroyed){t.sdp=e.sdpTransform(t.sdp),e._pc.setLocalDescription(t,o,function(t){e._onError(t)});var n=function(){var n=e._pc.localDescription||t;e._debug("signal"),e.emit("signal",{type:n.type,sdp:n.sdp})};e.trickle||e._iceComplete?n():e.once("_iceComplete",n)}},function(t){e._onError(t)},e.answerConstraints)},r.prototype._onIceConnectionStateChange=function(){var e=this;if(!e.destroyed){var t=e._pc.iceGatheringState,n=e._pc.iceConnectionState;e._debug("iceConnectionStateChange %s %s",t,n),e.emit("iceConnectionStateChange",t,n),"connected"!==n&&"completed"!==n||(clearTimeout(e._reconnectTimeout),e._pcReady=!0,e._maybeReady()),"disconnected"===n&&(e.reconnectTimer?(clearTimeout(e._reconnectTimeout),e._reconnectTimeout=setTimeout(function(){e._destroy()},e.reconnectTimer)):e._destroy()),"failed"===n&&e._destroy(),"closed"===n&&e._destroy()}},r.prototype.getStats=function(e){var t=this;t._pc.getStats?"undefined"!=typeof window&&window.mozRTCPeerConnection?t._pc.getStats(null,function(t){var n=[];t.forEach(function(e){n.push(e)}),e(n)},function(e){t._onError(e)}):t._pc.getStats(function(t){var n=[];t.result().forEach(function(e){var t={};e.names().forEach(function(n){t[n]=e.stat(n)}),t.id=e.id,t.type=e.type,t.timestamp=e.timestamp,n.push(t)}),e(n)}):e([])},r.prototype._maybeReady=function(){var e=this;e._debug("maybeReady pc %s channel %s",e._pcReady,e._channelReady),!e.connected&&!e._connecting&&e._pcReady&&e._channelReady&&(e._connecting=!0,e.getStats(function(t){function n(t){var n=o[t.localCandidateId],i=r[t.remoteCandidateId];n?(e.localAddress=n.ipAddress,e.localPort=Number(n.portNumber)):"string"==typeof t.googLocalAddress&&(n=t.googLocalAddress.split(":"),e.localAddress=n[0],e.localPort=Number(n[1])),e._debug("connect local: %s:%s",e.localAddress,e.localPort),i?(e.remoteAddress=i.ipAddress,e.remotePort=Number(i.portNumber),e.remoteFamily="IPv4"):"string"==typeof t.googRemoteAddress&&(i=t.googRemoteAddress.split(":"),e.remoteAddress=i[0],e.remotePort=Number(i[1]),e.remoteFamily="IPv4"),e._debug("connect remote: %s:%s",e.remoteAddress,e.remotePort)}e._connecting=!1,e.connected=!0;var r={},o={};if(t.forEach(function(e){"remotecandidate"===e.type&&(r[e.id]=e),"localcandidate"===e.type&&(o[e.id]=e)}),t.forEach(function(e){var t="googCandidatePair"===e.type&&"true"===e.googActiveConnection||"candidatepair"===e.type&&e.selected;t&&n(e)}),e._chunk){try{e.send(e._chunk)}catch(t){return e._onError(t)}e._chunk=null,e._debug('sent chunk from "write before connect"');var i=e._cb;e._cb=null,i(null)}e._interval=setInterval(function(){if(e._cb&&e._channel&&!(e._channel.bufferedAmount>e._maxBufferedAmount)){e._debug("ending backpressure: bufferedAmount %d",e._channel.bufferedAmount);var t=e._cb;e._cb=null,t(null)}},150),e._interval.unref&&e._interval.unref(),e._debug("connect"),e.emit("connect")}))},r.prototype._onSignalingStateChange=function(){var e=this;e.destroyed||(e._debug("signalingStateChange %s",e._pc.signalingState),e.emit("signalingStateChange",e._pc.signalingState))},r.prototype._onIceCandidate=function(e){var t=this;t.destroyed||(e.candidate&&t.trickle?t.emit("signal",{candidate:{candidate:e.candidate.candidate,sdpMLineIndex:e.candidate.sdpMLineIndex,sdpMid:e.candidate.sdpMid}}):e.candidate||(t._iceComplete=!0,t.emit("_iceComplete")))},r.prototype._onChannelMessage=function(e){var t=this;if(!t.destroyed){var r=e.data;t._debug("read: %d bytes",r.byteLength||r.length),r instanceof ArrayBuffer&&(r=new n(r)),t.push(r)}},r.prototype._onChannelOpen=function(){var e=this;e.connected||e.destroyed||(e._debug("on channel open"),e._channelReady=!0,e._maybeReady())},r.prototype._onChannelClose=function(){var e=this;e.destroyed||(e._debug("on channel close"),e._destroy())},r.prototype._onAddStream=function(e){var t=this;t.destroyed||(t._debug("on add stream"),t.emit("stream",e.stream))},r.prototype._onTrack=function(e){var t=this;t.destroyed||(t._debug("on track"),t.emit("stream",e.streams[0]))},r.prototype._onError=function(e){var t=this;t.destroyed||(t._debug("error %s",e.message||e),t._destroy(e))},r.prototype._debug=function(){var e=this,t=[].slice.call(arguments),n=e.channelName&&e.channelName.substring(0,7);t[0]="["+n+"] "+t[0],i.apply(null,t)}}).call(this,e("buffer").Buffer)},{buffer:24,debug:30,"get-browser-rtc":38,inherits:42,randombytes:74,"readable-stream":82}],92:[function(e,t,n){function r(e){return u.digest(e)}function o(e,t){return f?("string"==typeof e&&(e=i(e)),void f.digest({name:"sha-1"},e).then(function(e){t(s(new Uint8Array(e)))},function(n){t(r(e))})):void setTimeout(t,0,r(e))}function i(e){for(var t=e.length,n=new Uint8Array(t),r=0;r<t;r++)n[r]=e.charCodeAt(r);return n}function s(e){for(var t=e.length,n=[],r=0;r<t;r++){var o=e[r];n.push((o>>>4).toString(16)),n.push((15&o).toString(16))}return n.join("")}var a=e("rusha"),u=new a,c=window.crypto||window.msCrypto||{},f=c.subtle||c.webkitSubtle;try{f.digest({name:"sha-1"},new Uint8Array).catch(function(){f=!1})}catch(e){f=!1}t.exports=o,t.exports.sync=r},{rusha:87}],93:[function(e,t,n){(function(n,r){function o(e,t){var r=this;if(!(r instanceof o))return new o(e,t);t||(t={}),i("new websocket: %s %o",e,t),t.allowHalfOpen=!1,null==t.highWaterMark&&(t.highWaterMark=1048576),a.Duplex.call(r,t),r.url=e,r.connected=!1,r.destroyed=!1,r._maxBufferedAmount=t.highWaterMark,r._chunk=null,r._cb=null,r._interval=null;try{"undefined"==typeof WebSocket?r._ws=new c(r.url,t):r._ws=new c(r.url)}catch(e){return void n.nextTick(function(){r._onError(e)})}r._ws.binaryType="arraybuffer",r._ws.onopen=function(){r._onOpen()},r._ws.onmessage=function(e){r._onMessage(e)},r._ws.onclose=function(){r._onClose()},r._ws.onerror=function(){r._onError(new Error("connection error to "+r.url))},r.on("finish",function(){r.connected?setTimeout(function(){r._destroy()},100):r.once("connect",function(){setTimeout(function(){r._destroy()},100)})})}t.exports=o;var i=e("debug")("simple-websocket"),s=e("inherits"),a=e("readable-stream"),u=e("ws"),c="undefined"!=typeof WebSocket?WebSocket:u;s(o,a.Duplex),o.WEBSOCKET_SUPPORT=!!c,o.prototype.send=function(e){var t=this,n=e.length||e.byteLength||e.size;t._ws.send(e),i("write: %d bytes",n)},o.prototype.destroy=function(e){var t=this;t._destroy(null,e)},o.prototype._destroy=function(e,t){var n=this;if(!n.destroyed){if(t&&n.once("close",t),i("destroy (error: %s)",e&&e.message),this.readable=this.writable=!1,n._readableState.ended||n.push(null),n._writableState.finished||n.end(),n.connected=!1,n.destroyed=!0,clearInterval(n._interval),n._interval=null,n._chunk=null,n._cb=null,n._ws){var r=n._ws,o=function(){r.onclose=null,n.emit("close")};if(r.readyState===c.CLOSED)o();else try{r.onclose=o,r.close()}catch(e){o()}r.onopen=null,r.onmessage=null,r.onerror=null}n._ws=null,e&&n.emit("error",e)}},o.prototype._read=function(){},o.prototype._write=function(e,t,n){var r=this;if(r.destroyed)return n(new Error("cannot write after socket is destroyed"));if(r.connected){try{r.send(e)}catch(e){return r._onError(e)}"function"!=typeof u&&r._ws.bufferedAmount>r._maxBufferedAmount?(i("start backpressure: bufferedAmount %d",r._ws.bufferedAmount),r._cb=n):n(null)}else i("write before connect"),r._chunk=e,r._cb=n},o.prototype._onMessage=function(e){var t=this;if(!t.destroyed){var n=e.data;i("read: %d bytes",n.byteLength||n.length),n instanceof ArrayBuffer&&(n=new r(n)),t.push(n)}},o.prototype._onOpen=function(){var e=this;if(!e.connected&&!e.destroyed){if(e.connected=!0,e._chunk){try{e.send(e._chunk)}catch(t){return e._onError(t)}e._chunk=null,i('sent chunk from "write before connect"');var t=e._cb;e._cb=null,t(null)}"function"!=typeof u&&(e._interval=setInterval(function(){if(e._cb&&e._ws&&!(e._ws.bufferedAmount>e._maxBufferedAmount)){i("ending backpressure: bufferedAmount %d",e._ws.bufferedAmount);var t=e._cb;e._cb=null,t(null)}},150),e._interval.unref&&e._interval.unref()),i("connect"),e.emit("connect")}},o.prototype._onClose=function(){var e=this;e.destroyed||(i("on close"),e._destroy())},o.prototype._onError=function(e){var t=this;t.destroyed||(i("error: %s",e.message||e),t._destroy(e))}}).call(this,e("_process"),e("buffer").Buffer)},{_process:67,buffer:24,debug:30,inherits:42,"readable-stream":82,ws:21}],94:[function(e,t,n){var r=1,o=65535,i=4,s=function(){r=r+1&o},a=setInterval(s,1e3/i|0);a.unref&&a.unref(),t.exports=function(e){var t=i*(e||5),n=[0],s=1,a=r-1&o;return function(e){var u=r-a&o;for(u>t&&(u=t),a=r;u--;)s===t&&(s=0),n[s]=n[0===s?t-1:s-1],s++;e&&(n[s-1]+=e);var c=n[s-1],f=n.length<t?0:n[s===t?0:s];return n.length<i?c:(c-f)*i/n.length}}},{}],95:[function(e,t,n){(function(t){var r=e("./lib/request"),o=e("xtend"),i=e("builtin-status-codes"),s=e("url"),a=n;a.request=function(e,n){e="string"==typeof e?s.parse(e):o(e);var i=t.location.protocol.search(/^https?:$/)===-1?"http:":"",a=e.protocol||i,u=e.hostname||e.host,c=e.port,f=e.path||"/";u&&u.indexOf(":")!==-1&&(u="["+u+"]"),e.url=(u?a+"//"+u:"")+(c?":"+c:"")+f,e.method=(e.method||"GET").toUpperCase(),e.headers=e.headers||{};var d=new r(e);return n&&d.on("response",n),d},a.get=function(e,t){var n=a.request(e,t);return n.end(),n},a.Agent=function(){},a.Agent.defaultMaxSockets=4,a.STATUS_CODES=i,a.METHODS=["CHECKOUT","CONNECT","COPY","DELETE","GET","HEAD","LOCK","M-SEARCH","MERGE","MKACTIVITY","MKCOL","MOVE","NOTIFY","OPTIONS","PATCH","POST","PROPFIND","PROPPATCH","PURGE","PUT","REPORT","SEARCH","SUBSCRIBE","TRACE","UNLOCK","UNSUBSCRIBE"]}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./lib/request":97,"builtin-status-codes":25,url:112,xtend:119}],96:[function(e,t,n){(function(e){function t(e){try{return o.responseType=e,o.responseType===e}catch(e){}return!1}function r(e){return"function"==typeof e}n.fetch=r(e.fetch)&&r(e.ReadableStream),n.blobConstructor=!1;try{new Blob([new ArrayBuffer(1)]),n.blobConstructor=!0}catch(e){}var o=new e.XMLHttpRequest;o.open("GET",e.location.host?"/":"https://example.com");var i="undefined"!=typeof e.ArrayBuffer,s=i&&r(e.ArrayBuffer.prototype.slice);n.arraybuffer=i&&t("arraybuffer"),n.msstream=!n.fetch&&s&&t("ms-stream"),n.mozchunkedarraybuffer=!n.fetch&&i&&t("moz-chunked-arraybuffer"),n.overrideMimeType=r(o.overrideMimeType),n.vbArray=r(e.VBArray),o=null}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],97:[function(e,t,n){(function(n,r,o){function i(e,t){return a.fetch&&t?"fetch":a.mozchunkedarraybuffer?"moz-chunked-arraybuffer":a.msstream?"ms-stream":a.arraybuffer&&e?"arraybuffer":a.vbArray&&e?"text:vbarray":"text"}function s(e){try{var t=e.status;return null!==t&&0!==t}catch(e){return!1}}var a=e("./capability"),u=e("inherits"),c=e("./response"),f=e("readable-stream"),d=e("to-arraybuffer"),h=c.IncomingMessage,l=c.readyStates,p=t.exports=function(e){var t=this;f.Writable.call(t),t._opts=e,t._body=[],t._headers={},e.auth&&t.setHeader("Authorization","Basic "+new o(e.auth).toString("base64")),Object.keys(e.headers).forEach(function(n){t.setHeader(n,e.headers[n])});var n,r=!0;if("disable-fetch"===e.mode)r=!1,n=!0;else if("prefer-streaming"===e.mode)n=!1;else if("allow-wrong-content-type"===e.mode)n=!a.overrideMimeType;else{if(e.mode&&"default"!==e.mode&&"prefer-fast"!==e.mode)throw new Error("Invalid value for opts.mode");n=!0}t._mode=i(n,r),t.on("finish",function(){t._onFinish()})};u(p,f.Writable),p.prototype.setHeader=function(e,t){var n=this,r=e.toLowerCase();m.indexOf(r)===-1&&(n._headers[r]={name:e,value:t})},p.prototype.getHeader=function(e){var t=this;return t._headers[e.toLowerCase()].value},p.prototype.removeHeader=function(e){var t=this;delete t._headers[e.toLowerCase()]},p.prototype._onFinish=function(){var e=this;if(!e._destroyed){var t,i=e._opts,s=e._headers;if("POST"!==i.method&&"PUT"!==i.method&&"PATCH"!==i.method||(t=a.blobConstructor?new r.Blob(e._body.map(function(e){return d(e)}),{type:(s["content-type"]||{}).value||""}):o.concat(e._body).toString()),"fetch"===e._mode){var u=Object.keys(s).map(function(e){return[s[e].name,s[e].value]});r.fetch(e._opts.url,{method:e._opts.method,headers:u,body:t,mode:"cors",credentials:i.withCredentials?"include":"same-origin"}).then(function(t){e._fetchResponse=t,e._connect()},function(t){e.emit("error",t)})}else{var c=e._xhr=new r.XMLHttpRequest;try{c.open(e._opts.method,e._opts.url,!0)}catch(t){return void n.nextTick(function(){e.emit("error",t)})}"responseType"in c&&(c.responseType=e._mode.split(":")[0]),"withCredentials"in c&&(c.withCredentials=!!i.withCredentials),"text"===e._mode&&"overrideMimeType"in c&&c.overrideMimeType("text/plain; charset=x-user-defined"),Object.keys(s).forEach(function(e){c.setRequestHeader(s[e].name,s[e].value)}),e._response=null,c.onreadystatechange=function(){switch(c.readyState){case l.LOADING:case l.DONE:e._onXHRProgress()}},"moz-chunked-arraybuffer"===e._mode&&(c.onprogress=function(){e._onXHRProgress()}),c.onerror=function(){e._destroyed||e.emit("error",new Error("XHR error"))};try{c.send(t)}catch(t){return void n.nextTick(function(){e.emit("error",t)})}}}},p.prototype._onXHRProgress=function(){var e=this;s(e._xhr)&&!e._destroyed&&(e._response||e._connect(),e._response._onXHRProgress())},p.prototype._connect=function(){var e=this;e._destroyed||(e._response=new h(e._xhr,e._fetchResponse,e._mode),e.emit("response",e._response))},p.prototype._write=function(e,t,n){var r=this;r._body.push(e),n()},p.prototype.abort=p.prototype.destroy=function(){var e=this;e._destroyed=!0,e._response&&(e._response._destroyed=!0),e._xhr&&e._xhr.abort()},p.prototype.end=function(e,t,n){var r=this;"function"==typeof e&&(n=e,e=void 0),f.Writable.prototype.end.call(r,e,t,n)},p.prototype.flushHeaders=function(){},p.prototype.setTimeout=function(){},p.prototype.setNoDelay=function(){},p.prototype.setSocketKeepAlive=function(){};var m=["accept-charset","accept-encoding","access-control-request-headers","access-control-request-method","connection","content-length","cookie","cookie2","date","dnt","expect","host","keep-alive","origin","referer","te","trailer","transfer-encoding","upgrade","user-agent","via"]}).call(this,e("_process"),"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer)},{"./capability":96,"./response":98,_process:67,buffer:24,inherits:42,"readable-stream":82,"to-arraybuffer":105}],98:[function(e,t,n){(function(t,r,o){var i=e("./capability"),s=e("inherits"),a=e("readable-stream"),u=n.readyStates={UNSENT:0,OPENED:1,HEADERS_RECEIVED:2,LOADING:3,DONE:4},c=n.IncomingMessage=function(e,n,r){function s(){h.read().then(function(e){if(!u._destroyed){if(e.done)return void u.push(null);u.push(new o(e.value)),s()}})}var u=this;if(a.Readable.call(u),u._mode=r,u.headers={},u.rawHeaders=[],u.trailers={},u.rawTrailers=[],u.on("end",function(){t.nextTick(function(){u.emit("close")})}),"fetch"===r){u._fetchResponse=n,u.url=n.url,u.statusCode=n.status,u.statusMessage=n.statusText;for(var c,f,d=n.headers[Symbol.iterator]();c=(f=d.next()).value,!f.done;)u.headers[c[0].toLowerCase()]=c[1],u.rawHeaders.push(c[0],c[1]);var h=n.body.getReader();s()}else{u._xhr=e,u._pos=0,u.url=e.responseURL,u.statusCode=e.status,u.statusMessage=e.statusText;var l=e.getAllResponseHeaders().split(/\r?\n/);if(l.forEach(function(e){var t=e.match(/^([^:]+):\s*(.*)/);if(t){var n=t[1].toLowerCase();"set-cookie"===n?(void 0===u.headers[n]&&(u.headers[n]=[]),u.headers[n].push(t[2])):void 0!==u.headers[n]?u.headers[n]+=", "+t[2]:u.headers[n]=t[2],u.rawHeaders.push(t[1],t[2])}}),u._charset="x-user-defined",!i.overrideMimeType){var p=u.rawHeaders["mime-type"];if(p){var m=p.match(/;\s*charset=([^;])(;|$)/);m&&(u._charset=m[1].toLowerCase())}u._charset||(u._charset="utf-8")}}};s(c,a.Readable),c.prototype._read=function(){},c.prototype._onXHRProgress=function(){var e=this,t=e._xhr,n=null;switch(e._mode){case"text:vbarray":if(t.readyState!==u.DONE)break;try{n=new r.VBArray(t.responseBody).toArray()}catch(e){}if(null!==n){e.push(new o(n));break}case"text":try{n=t.responseText}catch(t){e._mode="text:vbarray";break}if(n.length>e._pos){var i=n.substr(e._pos);if("x-user-defined"===e._charset){for(var s=new o(i.length),a=0;a<i.length;a++)s[a]=255&i.charCodeAt(a);e.push(s)}else e.push(i,e._charset);e._pos=n.length}break;case"arraybuffer":if(t.readyState!==u.DONE||!t.response)break;n=t.response,e.push(new o(new Uint8Array(n)));break;case"moz-chunked-arraybuffer":if(n=t.response,t.readyState!==u.LOADING||!n)break;e.push(new o(new Uint8Array(n)));break;case"ms-stream":if(n=t.response,t.readyState!==u.LOADING)break;var c=new r.MSStreamReader;c.onprogress=function(){c.result.byteLength>e._pos&&(e.push(new o(new Uint8Array(c.result.slice(e._pos)))),e._pos=c.result.byteLength)},c.onload=function(){e.push(null)},c.readAsArrayBuffer(n)}e._xhr.readyState===u.DONE&&"ms-stream"!==e._mode&&e.push(null)}}).call(this,e("_process"),"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer)},{"./capability":96,_process:67,buffer:24,inherits:42,"readable-stream":82}],99:[function(e,t,n){var r=e("stream-to-blob");t.exports=function e(t,n,o){return"function"==typeof n?e(t,null,n):void r(t,n,function(e,t){if(e)return o(e);var n=URL.createObjectURL(t);o(null,n)})}},{"stream-to-blob":100}],100:[function(e,t,n){var r=e("once");t.exports=function e(t,n,o){if("function"==typeof n)return e(t,null,n);o=r(o);var i=[];t.on("data",function(e){i.push(e)}).on("end",function(){var e=n?new Blob(i,{type:n}):new Blob(i);o(null,e)}).on("error",o)}},{once:61}],101:[function(e,t,n){(function(n){var r=e("once");t.exports=function(e,t,o){o=r(o);var i=new n(t),s=0;e.on("data",function(e){e.copy(i,s),s+=e.length}).on("end",function(){o(null,i)}).on("error",o)}}).call(this,e("buffer").Buffer)},{buffer:24,once:61}],102:[function(e,t,n){function r(e){if(e&&!u(e))throw new Error("Unknown encoding: "+e)}function o(e){return e.toString(this.encoding)}function i(e){this.charReceived=e.length%2,this.charLength=this.charReceived?2:0}function s(e){this.charReceived=e.length%3,this.charLength=this.charReceived?3:0}var a=e("buffer").Buffer,u=a.isEncoding||function(e){switch(e&&e.toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":case"raw":return!0;default:return!1}},c=n.StringDecoder=function(e){switch(this.encoding=(e||"utf8").toLowerCase().replace(/[-_]/,""),r(e),this.encoding){case"utf8":this.surrogateSize=3;break;case"ucs2":case"utf16le":this.surrogateSize=2,this.detectIncompleteChar=i;break;case"base64":this.surrogateSize=3,this.detectIncompleteChar=s;break;default:return void(this.write=o)}this.charBuffer=new a(6),this.charReceived=0,this.charLength=0};c.prototype.write=function(e){for(var t="";this.charLength;){var n=e.length>=this.charLength-this.charReceived?this.charLength-this.charReceived:e.length;if(e.copy(this.charBuffer,this.charReceived,0,n),this.charReceived+=n,this.charReceived<this.charLength)return"";e=e.slice(n,e.length),t=this.charBuffer.slice(0,this.charLength).toString(this.encoding);var r=t.charCodeAt(t.length-1);if(!(r>=55296&&r<=56319)){if(this.charReceived=this.charLength=0,0===e.length)return t;break}this.charLength+=this.surrogateSize,t=""}this.detectIncompleteChar(e);var o=e.length;this.charLength&&(e.copy(this.charBuffer,0,e.length-this.charReceived,o),o-=this.charReceived),t+=e.toString(this.encoding,0,o);var o=t.length-1,r=t.charCodeAt(o);if(r>=55296&&r<=56319){var i=this.surrogateSize;return this.charLength+=i,this.charReceived+=i,this.charBuffer.copy(this.charBuffer,i,0,i),e.copy(this.charBuffer,0,0,i),t.substring(0,o)}return t},c.prototype.detectIncompleteChar=function(e){for(var t=e.length>=3?3:e.length;t>0;t--){var n=e[e.length-t];if(1==t&&n>>5==6){this.charLength=2;break}if(t<=2&&n>>4==14){this.charLength=3;break}if(t<=3&&n>>3==30){this.charLength=4;break}}this.charReceived=t},c.prototype.end=function(e){var t="";if(e&&e.length&&(t=this.write(e)),this.charReceived){var n=this.charReceived,r=this.charBuffer,o=this.encoding;t+=r.slice(0,n).toString(o)}return t}},{buffer:24}],103:[function(e,t,n){var r=e("./thirty-two");n.encode=r.encode,n.decode=r.decode},{"./thirty-two":104}],104:[function(e,t,n){(function(e){"use strict";function t(e){var t=Math.floor(e.length/5);return e.length%5===0?t:t+1}var r="ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",o=[255,255,26,27,28,29,30,31,255,255,255,255,255,255,255,255,255,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,255,255,255,255,255,255,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,255,255,255,255,255];n.encode=function(n){e.isBuffer(n)||(n=new e(n));for(var o=0,i=0,s=0,a=0,u=new e(8*t(n));o<n.length;){
var c=n[o];s>3?(a=c&255>>s,s=(s+5)%8,a=a<<s|(o+1<n.length?n[o+1]:0)>>8-s,o++):(a=c>>8-(s+5)&31,s=(s+5)%8,0===s&&o++),u[i]=r.charCodeAt(a),i++}for(o=i;o<u.length;o++)u[o]=61;return u},n.decode=function(t){var n,r=0,i=0,s=0;e.isBuffer(t)||(t=new e(t));for(var a=new e(Math.ceil(5*t.length/8)),u=0;u<t.length&&61!==t[u];u++){var c=t[u]-48;if(!(c<o.length))throw new Error("Invalid input - it is not base32 encoded string");i=o[c],r<=3?(r=(r+5)%8,0===r?(n|=i,a[s]=n,s++,n=0):n|=255&i<<8-r):(r=(r+5)%8,n|=255&i>>>r,a[s]=n,s++,n=255&i<<8-r)}return a.slice(0,s)}}).call(this,e("buffer").Buffer)},{buffer:24}],105:[function(e,t,n){var r=e("buffer").Buffer;t.exports=function(e){if(e instanceof Uint8Array){if(0===e.byteOffset&&e.byteLength===e.buffer.byteLength)return e.buffer;if("function"==typeof e.buffer.slice)return e.buffer.slice(e.byteOffset,e.byteOffset+e.byteLength)}if(r.isBuffer(e)){for(var t=new Uint8Array(e.length),n=e.length,o=0;o<n;o++)t[o]=e[o];return t.buffer}throw new Error("Argument must be a Buffer")}},{buffer:24}],106:[function(e,t,n){(function(n){function r(e){function t(e,t){var n=new i(t);return n.on("warning",o._onWarning),n.on("error",o._onError),n.listen(e),o._internalDHT=!0,n}var o=this;if(!(o instanceof r))return new r(e);if(s.call(o),!e.peerId)throw new Error("Option `peerId` is required");if(!e.infoHash)throw new Error("Option `infoHash` is required");if(!n.browser&&!e.port)throw new Error("Option `port` is required");o.peerId="string"==typeof e.peerId?e.peerId:e.peerId.toString("hex"),o.infoHash="string"==typeof e.infoHash?e.infoHash:e.infoHash.toString("hex"),o._port=e.port,o.destroyed=!1,o._announce=e.announce||[],o._intervalMs=e.intervalMs||9e5,o._trackerOpts=null,o._dhtAnnouncing=!1,o._dhtTimeout=!1,o._internalDHT=!1,o._onWarning=function(e){o.emit("warning",e)},o._onError=function(e){o.emit("error",e)},o._onDHTPeer=function(e,t){t.toString("hex")===o.infoHash&&o.emit("peer",e.host+":"+e.port)},o._onTrackerPeer=function(e){o.emit("peer",e)},o._onTrackerAnnounce=function(){o.emit("trackerAnnounce")},e.tracker===!1?o.tracker=null:e.tracker&&"object"==typeof e.tracker?(o._trackerOpts=a(e.tracker),o.tracker=o._createTracker()):o.tracker=o._createTracker(),e.dht===!1||"function"!=typeof i?o.dht=null:e.dht&&"function"==typeof e.dht.addNode?o.dht=e.dht:e.dht&&"object"==typeof e.dht?o.dht=t(e.dhtPort,e.dht):o.dht=t(e.dhtPort),o.dht&&(o.dht.on("peer",o._onDHTPeer),o._dhtAnnounce())}t.exports=r;var o=e("debug")("torrent-discovery"),i=e("bittorrent-dht/client"),s=e("events").EventEmitter,a=e("xtend"),u=e("inherits"),c=e("run-parallel"),f=e("bittorrent-tracker/client");u(r,s),r.prototype.updatePort=function(e){var t=this;e!==t._port&&(t._port=e,t.dht&&t._dhtAnnounce(),t.tracker&&(t.tracker.stop(),t.tracker.destroy(function(){t.tracker=t._createTracker()})))},r.prototype.complete=function(e){this.tracker&&this.tracker.complete(e)},r.prototype.destroy=function(e){var t=this;if(!t.destroyed){t.destroyed=!0,clearTimeout(t._dhtTimeout);var n=[];t.tracker&&(t.tracker.stop(),t.tracker.removeListener("warning",t._onWarning),t.tracker.removeListener("error",t._onError),t.tracker.removeListener("peer",t._onTrackerPeer),t.tracker.removeListener("update",t._onTrackerAnnounce),n.push(function(e){t.tracker.destroy(e)})),t.dht&&t.dht.removeListener("peer",t._onDHTPeer),t._internalDHT&&(t.dht.removeListener("warning",t._onWarning),t.dht.removeListener("error",t._onError),n.push(function(e){t.dht.destroy(e)})),c(n,e),t.dht=null,t.tracker=null,t._announce=null}},r.prototype._createTracker=function(){var e=a(this._trackerOpts,{infoHash:this.infoHash,announce:this._announce,peerId:this.peerId,port:this._port}),t=new f(e);return t.on("warning",this._onWarning),t.on("error",this._onError),t.on("peer",this._onTrackerPeer),t.on("update",this._onTrackerAnnounce),t.setInterval(this._intervalMs),t.start(),t},r.prototype._dhtAnnounce=function(){function e(){return t._intervalMs+Math.floor(Math.random()*t._intervalMs/5)}var t=this;t._dhtAnnouncing||(o("dht announce"),t._dhtAnnouncing=!0,clearTimeout(t._dhtTimeout),t.dht.announce(t.infoHash,t._port,function(n){t._dhtAnnouncing=!1,o("dht announce complete"),n&&t.emit("warning",n),t.emit("dhtAnnounce"),t.destroyed||(t._dhtTimeout=setTimeout(function(){t._dhtAnnounce()},e()),t._dhtTimeout.unref&&t._dhtTimeout.unref())}))}}).call(this,e("_process"))},{_process:67,"bittorrent-dht/client":21,"bittorrent-tracker/client":15,debug:30,events:35,inherits:42,"run-parallel":86,xtend:119}],107:[function(e,t,n){(function(e){function n(e){return this instanceof n?(this.length=e,this.missing=e,this.sources=null,this._chunks=Math.ceil(e/r),this._remainder=e%r||r,this._buffered=0,this._buffer=null,this._cancellations=null,this._reservations=0,void(this._flushed=!1)):new n(e)}t.exports=n;var r=16384;n.BLOCK_LENGTH=r,n.prototype.chunkLength=function(e){return e===this._chunks-1?this._remainder:r},n.prototype.chunkLengthRemaining=function(e){return this.length-e*r},n.prototype.chunkOffset=function(e){return e*r},n.prototype.reserve=function(){return this.init()?this._cancellations.length?this._cancellations.pop():this._reservations<this._chunks?this._reservations++:-1:-1},n.prototype.reserveRemaining=function(){if(!this.init())return-1;if(this._reservations<this._chunks){var e=this._reservations;return this._reservations=this._chunks,e}return-1},n.prototype.cancel=function(e){this.init()&&this._cancellations.push(e)},n.prototype.cancelRemaining=function(e){this.init()&&(this._reservations=e)},n.prototype.get=function(e){return this.init()?this._buffer[e]:null},n.prototype.set=function(e,t,n){if(!this.init())return!1;for(var o=t.length,i=Math.ceil(o/r),s=0;s<i;s++)if(!this._buffer[e+s]){var a=s*r,u=t.slice(a,a+r);this._buffered++,this._buffer[e+s]=u,this.missing-=u.length,this.sources.indexOf(n)===-1&&this.sources.push(n)}return this._buffered===this._chunks},n.prototype.flush=function(){if(!this._buffer||this._chunks!==this._buffered)return null;var t=e.concat(this._buffer,this.length);return this._buffer=null,this._cancellations=null,this.sources=null,this._flushed=!0,t},n.prototype.init=function(){return!this._flushed&&(!!this._buffer||(this._buffer=new Array(this._chunks),this._cancellations=[],this.sources=[],!0))}}).call(this,e("buffer").Buffer)},{buffer:24}],108:[function(e,t,n){(function(n){var r=e("is-typedarray").strict;t.exports=function(e){if(r(e)){var t=new n(e.buffer);return e.byteLength!==e.buffer.byteLength&&(t=t.slice(e.byteOffset,e.byteOffset+e.byteLength)),t}return new n(e)}}).call(this,e("buffer").Buffer)},{buffer:24,"is-typedarray":46}],109:[function(e,t,n){(function(e){var t=4294967295;n.encodingLength=function(){return 8},n.encode=function(n,r,o){r||(r=new e(8)),o||(o=0);var i=Math.floor(n/t),s=n-i*t;return r.writeUInt32BE(i,o),r.writeUInt32BE(s,o+4),r},n.decode=function(n,r){r||(r=0),n||(n=new e(4)),r||(r=0);var o=n.readUInt32BE(r),i=n.readUInt32BE(r+4);return o*t+i},n.encode.bytes=8,n.decode.bytes=8}).call(this,e("buffer").Buffer)},{buffer:24}],110:[function(e,t,n){"use strict";function r(e,t){for(var n=1,r=e.length,o=e[0],i=e[0],s=1;s<r;++s)if(i=o,o=e[s],t(o,i)){if(s===n){n++;continue}e[n++]=o}return e.length=n,e}function o(e){for(var t=1,n=e.length,r=e[0],o=e[0],i=1;i<n;++i,o=r)if(o=r,r=e[i],r!==o){if(i===t){t++;continue}e[t++]=r}return e.length=t,e}function i(e,t,n){return 0===e.length?e:t?(n||e.sort(t),r(e,t)):(n||e.sort(),o(e))}t.exports=i},{}],111:[function(e,t,n){function r(e,t){if(!(t>=e.length||t<0)){var n=e.pop();if(t<e.length){var r=e[t];return e[t]=n,r}return n}}t.exports=r},{}],112:[function(e,t,n){"use strict";function r(){this.protocol=null,this.slashes=null,this.auth=null,this.host=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.query=null,this.pathname=null,this.path=null,this.href=null}function o(e,t,n){if(e&&c.isObject(e)&&e instanceof r)return e;var o=new r;return o.parse(e,t,n),o}function i(e){return c.isString(e)&&(e=o(e)),e instanceof r?e.format():r.prototype.format.call(e)}function s(e,t){return o(e,!1,!0).resolve(t)}function a(e,t){return e?o(e,!1,!0).resolveObject(t):t}var u=e("punycode"),c=e("./util");n.parse=o,n.resolve=s,n.resolveObject=a,n.format=i,n.Url=r;var f=/^([a-z0-9.+-]+:)/i,d=/:[0-9]*$/,h=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,l=["<",">",'"',"`"," ","\r","\n","\t"],p=["{","}","|","\\","^","`"].concat(l),m=["'"].concat(p),g=["%","/","?",";","#"].concat(m),y=["/","?","#"],_=255,v=/^[+a-z0-9A-Z_-]{0,63}$/,b=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,w={javascript:!0,"javascript:":!0},E={javascript:!0,"javascript:":!0},k={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0},x=e("querystring");r.prototype.parse=function(e,t,n){if(!c.isString(e))throw new TypeError("Parameter 'url' must be a string, not "+typeof e);var r=e.indexOf("?"),o=r!==-1&&r<e.indexOf("#")?"?":"#",i=e.split(o),s=/\\/g;i[0]=i[0].replace(s,"/"),e=i.join(o);var a=e;if(a=a.trim(),!n&&1===e.split("#").length){var d=h.exec(a);if(d)return this.path=a,this.href=a,this.pathname=d[1],d[2]?(this.search=d[2],t?this.query=x.parse(this.search.substr(1)):this.query=this.search.substr(1)):t&&(this.search="",this.query={}),this}var l=f.exec(a);if(l){l=l[0];var p=l.toLowerCase();this.protocol=p,a=a.substr(l.length)}if(n||l||a.match(/^\/\/[^@\/]+@[^@\/]+/)){var S="//"===a.substr(0,2);!S||l&&E[l]||(a=a.substr(2),this.slashes=!0)}if(!E[l]&&(S||l&&!k[l])){for(var B=-1,I=0;I<y.length;I++){var A=a.indexOf(y[I]);A!==-1&&(B===-1||A<B)&&(B=A)}var T,C;C=B===-1?a.lastIndexOf("@"):a.lastIndexOf("@",B),C!==-1&&(T=a.slice(0,C),a=a.slice(C+1),this.auth=decodeURIComponent(T)),B=-1;for(var I=0;I<g.length;I++){var A=a.indexOf(g[I]);A!==-1&&(B===-1||A<B)&&(B=A)}B===-1&&(B=a.length),this.host=a.slice(0,B),a=a.slice(B),this.parseHost(),this.hostname=this.hostname||"";var L="["===this.hostname[0]&&"]"===this.hostname[this.hostname.length-1];if(!L)for(var R=this.hostname.split(/\./),I=0,U=R.length;I<U;I++){var P=R[I];if(P&&!P.match(v)){for(var O="",M=0,j=P.length;M<j;M++)O+=P.charCodeAt(M)>127?"x":P[M];if(!O.match(v)){var H=R.slice(0,I),D=R.slice(I+1),q=P.match(b);q&&(H.push(q[1]),D.unshift(q[2])),D.length&&(a="/"+D.join(".")+a),this.hostname=H.join(".");break}}}this.hostname.length>_?this.hostname="":this.hostname=this.hostname.toLowerCase(),L||(this.hostname=u.toASCII(this.hostname));var N=this.port?":"+this.port:"",W=this.hostname||"";this.host=W+N,this.href+=this.host,L&&(this.hostname=this.hostname.substr(1,this.hostname.length-2),"/"!==a[0]&&(a="/"+a))}if(!w[p])for(var I=0,U=m.length;I<U;I++){var z=m[I];if(a.indexOf(z)!==-1){var F=encodeURIComponent(z);F===z&&(F=escape(z)),a=a.split(z).join(F)}}var Y=a.indexOf("#");Y!==-1&&(this.hash=a.substr(Y),a=a.slice(0,Y));var V=a.indexOf("?");if(V!==-1?(this.search=a.substr(V),this.query=a.substr(V+1),t&&(this.query=x.parse(this.query)),a=a.slice(0,V)):t&&(this.search="",this.query={}),a&&(this.pathname=a),k[p]&&this.hostname&&!this.pathname&&(this.pathname="/"),this.pathname||this.search){var N=this.pathname||"",G=this.search||"";this.path=N+G}return this.href=this.format(),this},r.prototype.format=function(){var e=this.auth||"";e&&(e=encodeURIComponent(e),e=e.replace(/%3A/i,":"),e+="@");var t=this.protocol||"",n=this.pathname||"",r=this.hash||"",o=!1,i="";this.host?o=e+this.host:this.hostname&&(o=e+(this.hostname.indexOf(":")===-1?this.hostname:"["+this.hostname+"]"),this.port&&(o+=":"+this.port)),this.query&&c.isObject(this.query)&&Object.keys(this.query).length&&(i=x.stringify(this.query));var s=this.search||i&&"?"+i||"";return t&&":"!==t.substr(-1)&&(t+=":"),this.slashes||(!t||k[t])&&o!==!1?(o="//"+(o||""),n&&"/"!==n.charAt(0)&&(n="/"+n)):o||(o=""),r&&"#"!==r.charAt(0)&&(r="#"+r),s&&"?"!==s.charAt(0)&&(s="?"+s),n=n.replace(/[?#]/g,function(e){return encodeURIComponent(e)}),s=s.replace("#","%23"),t+o+n+s+r},r.prototype.resolve=function(e){return this.resolveObject(o(e,!1,!0)).format()},r.prototype.resolveObject=function(e){if(c.isString(e)){var t=new r;t.parse(e,!1,!0),e=t}for(var n=new r,o=Object.keys(this),i=0;i<o.length;i++){var s=o[i];n[s]=this[s]}if(n.hash=e.hash,""===e.href)return n.href=n.format(),n;if(e.slashes&&!e.protocol){for(var a=Object.keys(e),u=0;u<a.length;u++){var f=a[u];"protocol"!==f&&(n[f]=e[f])}return k[n.protocol]&&n.hostname&&!n.pathname&&(n.path=n.pathname="/"),n.href=n.format(),n}if(e.protocol&&e.protocol!==n.protocol){if(!k[e.protocol]){for(var d=Object.keys(e),h=0;h<d.length;h++){var l=d[h];n[l]=e[l]}return n.href=n.format(),n}if(n.protocol=e.protocol,e.host||E[e.protocol])n.pathname=e.pathname;else{for(var p=(e.pathname||"").split("/");p.length&&!(e.host=p.shift()););e.host||(e.host=""),e.hostname||(e.hostname=""),""!==p[0]&&p.unshift(""),p.length<2&&p.unshift(""),n.pathname=p.join("/")}if(n.search=e.search,n.query=e.query,n.host=e.host||"",n.auth=e.auth,n.hostname=e.hostname||e.host,n.port=e.port,n.pathname||n.search){var m=n.pathname||"",g=n.search||"";n.path=m+g}return n.slashes=n.slashes||e.slashes,n.href=n.format(),n}var y=n.pathname&&"/"===n.pathname.charAt(0),_=e.host||e.pathname&&"/"===e.pathname.charAt(0),v=_||y||n.host&&e.pathname,b=v,w=n.pathname&&n.pathname.split("/")||[],p=e.pathname&&e.pathname.split("/")||[],x=n.protocol&&!k[n.protocol];if(x&&(n.hostname="",n.port=null,n.host&&(""===w[0]?w[0]=n.host:w.unshift(n.host)),n.host="",e.protocol&&(e.hostname=null,e.port=null,e.host&&(""===p[0]?p[0]=e.host:p.unshift(e.host)),e.host=null),v=v&&(""===p[0]||""===w[0])),_)n.host=e.host||""===e.host?e.host:n.host,n.hostname=e.hostname||""===e.hostname?e.hostname:n.hostname,n.search=e.search,n.query=e.query,w=p;else if(p.length)w||(w=[]),w.pop(),w=w.concat(p),n.search=e.search,n.query=e.query;else if(!c.isNullOrUndefined(e.search)){if(x){n.hostname=n.host=w.shift();var S=!!(n.host&&n.host.indexOf("@")>0)&&n.host.split("@");S&&(n.auth=S.shift(),n.host=n.hostname=S.shift())}return n.search=e.search,n.query=e.query,c.isNull(n.pathname)&&c.isNull(n.search)||(n.path=(n.pathname?n.pathname:"")+(n.search?n.search:"")),n.href=n.format(),n}if(!w.length)return n.pathname=null,n.search?n.path="/"+n.search:n.path=null,n.href=n.format(),n;for(var B=w.slice(-1)[0],I=(n.host||e.host||w.length>1)&&("."===B||".."===B)||""===B,A=0,T=w.length;T>=0;T--)B=w[T],"."===B?w.splice(T,1):".."===B?(w.splice(T,1),A++):A&&(w.splice(T,1),A--);if(!v&&!b)for(;A--;A)w.unshift("..");!v||""===w[0]||w[0]&&"/"===w[0].charAt(0)||w.unshift(""),I&&"/"!==w.join("/").substr(-1)&&w.push("");var C=""===w[0]||w[0]&&"/"===w[0].charAt(0);if(x){n.hostname=n.host=C?"":w.length?w.shift():"";var S=!!(n.host&&n.host.indexOf("@")>0)&&n.host.split("@");S&&(n.auth=S.shift(),n.host=n.hostname=S.shift())}return v=v||n.host&&w.length,v&&!C&&w.unshift(""),w.length?n.pathname=w.join("/"):(n.pathname=null,n.path=null),c.isNull(n.pathname)&&c.isNull(n.search)||(n.path=(n.pathname?n.pathname:"")+(n.search?n.search:"")),n.auth=e.auth||n.auth,n.slashes=n.slashes||e.slashes,n.href=n.format(),n},r.prototype.parseHost=function(){var e=this.host,t=d.exec(e);t&&(t=t[0],":"!==t&&(this.port=t.substr(1)),e=e.substr(0,e.length-t.length)),e&&(this.hostname=e)}},{"./util":113,punycode:69,querystring:72}],113:[function(e,t,n){"use strict";t.exports={isString:function(e){return"string"==typeof e},isObject:function(e){return"object"==typeof e&&null!==e},isNull:function(e){return null===e},isNullOrUndefined:function(e){return null==e}}},{}],114:[function(e,t,n){var r=e("bencode"),o=e("bitfield"),i=e("safe-buffer").Buffer,s=e("debug")("ut_metadata"),a=e("events").EventEmitter,u=e("inherits"),c=e("simple-sha1"),f=1e7,d=1e3,h=16384;t.exports=function(e){function t(t){a.call(this),this._wire=t,this._metadataComplete=!1,this._metadataSize=null,this._remainingRejects=null,this._fetching=!1,this._bitfield=new o(0,{grow:d}),i.isBuffer(e)&&this.setMetadata(e)}return u(t,a),t.prototype.name="ut_metadata",t.prototype.onHandshake=function(e,t,n){this._infoHash=e},t.prototype.onExtendedHandshake=function(e){return e.m&&e.m.ut_metadata?e.metadata_size?"number"!=typeof e.metadata_size||f<e.metadata_size||e.metadata_size<=0?this.emit("warning",new Error("Peer gave invalid metadata size")):(this._metadataSize=e.metadata_size,this._numPieces=Math.ceil(this._metadataSize/h),this._remainingRejects=2*this._numPieces,void(this._fetching&&this._requestPieces())):this.emit("warning",new Error("Peer does not have metadata")):this.emit("warning",new Error("Peer does not support ut_metadata"))},t.prototype.onMessage=function(e){var t,n;try{var o=e.toString(),i=o.indexOf("ee")+2;t=r.decode(o.substring(0,i)),n=e.slice(i)}catch(e){return}switch(t.msg_type){case 0:this._onRequest(t.piece);break;case 1:this._onData(t.piece,n,t.total_size);break;case 2:this._onReject(t.piece)}},t.prototype.fetch=function(){this._metadataComplete||(this._fetching=!0,this._metadataSize&&this._requestPieces())},t.prototype.cancel=function(){this._fetching=!1},t.prototype.setMetadata=function(e){if(this._metadataComplete)return!0;s("set metadata");try{var t=r.decode(e).info;t&&(e=r.encode(t))}catch(e){}return(!this._infoHash||this._infoHash===c.sync(e))&&(this.cancel(),this.metadata=e,this._metadataComplete=!0,this._metadataSize=this.metadata.length,this._wire.extendedHandshake.metadata_size=this._metadataSize,this.emit("metadata",r.encode({info:r.decode(this.metadata)})),!0)},t.prototype._send=function(e,t){var n=r.encode(e);i.isBuffer(t)&&(n=i.concat([n,t])),this._wire.extended("ut_metadata",n)},t.prototype._request=function(e){this._send({msg_type:0,piece:e})},t.prototype._data=function(e,t,n){var r={msg_type:1,piece:e};"number"==typeof n&&(r.total_size=n),this._send(r,t)},t.prototype._reject=function(e){this._send({msg_type:2,piece:e})},t.prototype._onRequest=function(e){if(!this._metadataComplete)return void this._reject(e);var t=e*h,n=t+h;n>this._metadataSize&&(n=this._metadataSize);var r=this.metadata.slice(t,n);this._data(e,r,this._metadataSize)},t.prototype._onData=function(e,t,n){t.length>h||(t.copy(this.metadata,e*h),this._bitfield.set(e),this._checkDone())},t.prototype._onReject=function(e){this._remainingRejects>0&&this._fetching?(this._request(e),this._remainingRejects-=1):this.emit("warning",new Error('Peer sent "reject" too much'))},t.prototype._requestPieces=function(){this.metadata=i.alloc(this._metadataSize);for(var e=0;e<this._numPieces;e++)this._request(e)},t.prototype._checkDone=function(){for(var e=!0,t=0;t<this._numPieces;t++)if(!this._bitfield.get(t)){e=!1;break}if(e){var n=this.setMetadata(this.metadata);n||this._failedMetadata()}},t.prototype._failedMetadata=function(){this._bitfield=new o(0,{grow:d}),this._remainingRejects-=this._numPieces,this._remainingRejects>0?this._requestPieces():this.emit("warning",new Error("Peer sent invalid metadata"))},t}},{bencode:11,bitfield:13,debug:30,events:35,inherits:42,"safe-buffer":88,"simple-sha1":92}],115:[function(e,t,n){(function(e){function n(e,t){function n(){if(!o){if(r("throwDeprecation"))throw new Error(t);r("traceDeprecation")?console.trace(t):console.warn(t),o=!0}return e.apply(this,arguments)}if(r("noDeprecation"))return e;var o=!1;return n}function r(t){try{if(!e.localStorage)return!1}catch(e){return!1}var n=e.localStorage[t];return null!=n&&"true"===String(n).toLowerCase()}t.exports=n}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],116:[function(e,t,n){(function(n){function r(e){var t=this;a.call(t),t._tracks=[],t._fragmentSequence=1,t._file=e,t._decoder=null,t._findMoov(0)}function o(e,t){var n=this;n._entries=e,n._countName=t||"count",n._index=0,n._offset=0,n.value=n._entries[0]}function i(){return{version:0,flags:0,entries:[]}}var s=e("binary-search"),a=e("events").EventEmitter,u=e("inherits"),c=e("mp4-stream"),f=e("mp4-box-encoding"),d=e("range-slice-stream");t.exports=r,u(r,a),r.prototype._findMoov=function(e){var t=this;t._decoder&&t._decoder.destroy(),t._decoder=c.decode();var n=t._file.createReadStream({start:e});n.pipe(t._decoder),t._decoder.once("box",function(r){"moov"===r.type?t._decoder.decode(function(e){n.destroy();try{t._processMoov(e)}catch(e){e.message="Cannot parse mp4 file: "+e.message,t.emit("error",e)}}):(n.destroy(),t._findMoov(e+r.length))})},o.prototype.inc=function(){var e=this;e._offset++,e._offset>=e._entries[e._index][e._countName]&&(e._index++,e._offset=0),e.value=e._entries[e._index]},r.prototype._processMoov=function(e){var t=this,r=e.traks;t._tracks=[],t._hasVideo=!1,t._hasAudio=!1;for(var s=0;s<r.length;s++){var a,u,c=r[s],d=c.mdia.minf.stbl,h=d.stsd.entries[0],l=c.mdia.hdlr.handlerType;if("vide"===l&&"avc1"===h.type){if(t._hasVideo)continue;t._hasVideo=!0,a="avc1",h.avcC&&(a+="."+h.avcC.mimeCodec),u='video/mp4; codecs="'+a+'"'}else{if("soun"!==l||"mp4a"!==h.type)continue;if(t._hasAudio)continue;t._hasAudio=!0,a="mp4a",h.esds&&h.esds.mimeCodec&&(a+="."+h.esds.mimeCodec),u='audio/mp4; codecs="'+a+'"'}var p=[],m=0,g=0,y=0,_=0,v=0,b=0,w=new o(d.stts.entries),E=null;d.ctts&&(E=new o(d.ctts.entries));for(var k=0;;){var x=d.stsc.entries[v],S=d.stsz.entries[m],B=w.value.duration,I=E?E.value.compositionOffset:0,A=!0;if(d.stss&&(A=d.stss.entries[k]===m+1),p.push({size:S,duration:B,dts:b,presentationOffset:I,sync:A,offset:_+d.stco.entries[y]}),m++,m>=d.stsz.entries.length)break;if(g++,_+=S,g>=x.samplesPerChunk){g=0,_=0,y++;var T=d.stsc.entries[v+1];T&&y+1>=T.firstChunk&&v++}b+=B,w.inc(),E&&E.inc(),A&&k++}c.mdia.mdhd.duration=0,c.tkhd.duration=0;var C=x.sampleDescriptionId,L={type:"moov",mvhd:e.mvhd,traks:[{tkhd:c.tkhd,mdia:{mdhd:c.mdia.mdhd,hdlr:c.mdia.hdlr,elng:c.mdia.elng,minf:{vmhd:c.mdia.minf.vmhd,smhd:c.mdia.minf.smhd,dinf:c.mdia.minf.dinf,stbl:{stsd:d.stsd,stts:i(),ctts:i(),stsc:i(),stsz:i(),stco:i(),stss:i()}}}}],mvex:{mehd:{fragmentDuration:e.mvhd.duration},trexs:[{trackId:c.tkhd.trackId,defaultSampleDescriptionIndex:C,defaultSampleDuration:0,defaultSampleSize:0,defaultSampleFlags:0}]}};t._tracks.push({trackId:c.tkhd.trackId,timeScale:c.mdia.mdhd.timeScale,samples:p,currSample:null,currTime:null,moov:L,mime:u})}if(0===t._tracks.length)return void t.emit("error",new Error("no playable tracks"));e.mvhd.duration=0,t._ftyp={type:"ftyp",brand:"iso5",brandVersion:0,compatibleBrands:["iso5"]};var R=f.encode(t._ftyp),U=t._tracks.map(function(e){var t=f.encode(e.moov);return{mime:e.mime,init:n.concat([R,t])}});t.emit("ready",U)},r.prototype.seek=function(e){var t=this;if(!t._tracks)throw new Error("Not ready yet; wait for 'ready' event");t._fileStream&&(t._fileStream.destroy(),t._fileStream=null);var n=-1;if(t._tracks.map(function(r,o){function i(e){s.destroyed||s.box(e.moof,function(n){if(n)return t.emit("error",n);if(!s.destroyed){var a=r.inStream.slice(e.ranges);a.pipe(s.mediaData(e.length,function(e){if(e)return t.emit("error",e);if(!s.destroyed){var n=t._generateFragment(o);return n?void i(n):s.finalize()}}))}})}r.outStream&&r.outStream.destroy(),r.inStream&&(r.inStream.destroy(),r.inStream=null);var s=r.outStream=c.encode(),a=t._generateFragment(o,e);return a?((n===-1||a.ranges[0].start<n)&&(n=a.ranges[0].start),void i(a)):s.finalize()}),n>=0){var r=t._fileStream=t._file.createReadStream({start:n});t._tracks.forEach(function(e){e.inStream=new d(n),r.pipe(e.inStream)})}return t._tracks.map(function(e){return e.outStream})},r.prototype._findSampleBefore=function(e,t){var n=this,r=n._tracks[e],o=Math.floor(r.timeScale*t),i=s(r.samples,o,function(e,t){var n=e.dts+e.presentationOffset;return n-t});for(i===-1?i=0:i<0&&(i=-i-2);!r.samples[i].sync;)i--;return i};var h=1;r.prototype._generateFragment=function(e,t){var n,r=this,o=r._tracks[e];if(n=void 0!==t?r._findSampleBefore(e,t):o.currSample,n>=o.samples.length)return null;for(var i=o.samples[n].dts,s=0,a=[],u=n;u<o.samples.length;u++){var c=o.samples[u];if(c.sync&&c.dts-i>=o.timeScale*h)break;s+=c.size;var f=a.length-1;f<0||a[f].end!==c.offset?a.push({start:c.offset,end:c.offset+c.size}):a[f].end+=c.size}return o.currSample=u,{moof:r._generateMoof(e,n,u),ranges:a,length:s}},r.prototype._generateMoof=function(e,t,n){for(var r=this,o=r._tracks[e],i=[],s=t;s<n;s++){var a=o.samples[s];i.push({sampleDuration:a.duration,sampleSize:a.size,sampleFlags:a.sync?33554432:16842752,sampleCompositionTimeOffset:a.presentationOffset})}var u={type:"moof",mfhd:{sequenceNumber:r._fragmentSequence++},trafs:[{tfhd:{flags:131072,trackId:o.trackId},tfdt:{baseMediaDecodeTime:o.samples[t].dts},trun:{flags:3841,dataOffset:8,entries:i}}]};return u.trafs[0].trun.dataOffset+=f.encodingLength(u),u}}).call(this,e("buffer").Buffer)},{"binary-search":12,buffer:24,events:35,inherits:42,"mp4-box-encoding":54,"mp4-stream":57,"range-slice-stream":75}],117:[function(e,t,n){function r(e,t,n){var i=this;return this instanceof r?(n=n||{},i.detailedError=null,i._elem=t,i._elemWrapper=new o(t),i._waitingFired=!1,i._trackMeta=null,i._file=e,i._tracks=null,"none"!==i._elem.preload&&i._createMuxer(),i._onError=function(e){i.detailedError=i._elemWrapper.detailedError,i.destroy()},i._onWaiting=function(){i._waitingFired=!0,i._muxer?i._tracks&&i._pump():i._createMuxer()},i._elem.addEventListener("waiting",i._onWaiting),void i._elem.addEventListener("error",i._onError)):new r(e,t,n)}var o=e("mediasource"),i=e("pump"),s=e("./mp4-remuxer");t.exports=r,r.prototype._createMuxer=function(){var e=this;e._muxer=new s(e._file),e._muxer.on("ready",function(t){e._tracks=t.map(function(t){var n=e._elemWrapper.createWriteStream(t.mime);n.on("error",function(t){e._elemWrapper.error(t)});var r={muxed:null,mediaSource:n,initFlushed:!1,onInitFlushed:null};return n.write(t.init,function(e){r.initFlushed=!0,r.onInitFlushed&&r.onInitFlushed(e)}),r}),(e._waitingFired||"auto"===e._elem.preload)&&e._pump()}),e._muxer.on("error",function(t){e._elemWrapper.error(t)})},r.prototype._pump=function(){var e=this,t=e._muxer.seek(e._elem.currentTime,!e._tracks);e._tracks.forEach(function(n,r){var o=function(){n.muxed&&(n.muxed.destroy(),n.mediaSource=e._elemWrapper.createWriteStream(n.mediaSource),n.mediaSource.on("error",function(t){e._elemWrapper.error(t)})),n.muxed=t[r],i(n.muxed,n.mediaSource)};n.initFlushed?o():n.onInitFlushed=function(t){return t?void e._elemWrapper.error(t):void o()}})},r.prototype.destroy=function(){var e=this;e.destroyed||(e.destroyed=!0,e._elem.removeEventListener("waiting",e._onWaiting),e._elem.removeEventListener("error",e._onError),e._tracks&&e._tracks.forEach(function(e){e.muxed.destroy()}),e._elem.src="")}},{"./mp4-remuxer":116,mediasource:50,pump:68}],118:[function(e,t,n){function r(e,t){function n(){for(var t=new Array(arguments.length),n=0;n<t.length;n++)t[n]=arguments[n];var r=e.apply(this,t),o=t[t.length-1];return"function"==typeof r&&r!==o&&Object.keys(o).forEach(function(e){r[e]=o[e]}),r}if(e&&t)return r(e)(t);if("function"!=typeof e)throw new TypeError("need wrapper function");return Object.keys(e).forEach(function(t){n[t]=e[t]}),n}t.exports=r},{}],119:[function(e,t,n){function r(){for(var e={},t=0;t<arguments.length;t++){var n=arguments[t];for(var r in n)o.call(n,r)&&(e[r]=n[r])}return e}t.exports=r;var o=Object.prototype.hasOwnProperty},{}],120:[function(e,t,n){function r(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)o.call(n,r)&&(e[r]=n[r])}return e}t.exports=r;var o=Object.prototype.hasOwnProperty},{}],121:[function(e,t,n){t.exports=function e(t,n,r){return void 0===n?function(n,r){return e(t,n,r)}:(void 0===r&&(r="0"),t-=n.toString().length,t>0?new Array(t+(/\./.test(n)?2:1)).join(r)+n:n+"")}},{}],122:[function(e,t,n){t.exports={version:"0.97.2"}},{}],123:[function(e,t,n){(function(n,r){function o(e){function t(){i.destroyed||(i.ready=!0,i.emit("ready"))}var i=this;return i instanceof o?(h.call(i),e||(e={}),"string"==typeof e.peerId?i.peerId=e.peerId:a.isBuffer(e.peerId)?i.peerId=e.peerId.toString("hex"):i.peerId=a.from(I+b(6).toString("hex")).toString("hex"),i.peerIdBuffer=a.from(i.peerId,"hex"),"string"==typeof e.nodeId?i.nodeId=e.nodeId:a.isBuffer(e.nodeId)?i.nodeId=e.nodeId.toString("hex"):i.nodeId=b(20).toString("hex"),i.nodeIdBuffer=a.from(i.nodeId,"hex"),i.destroyed=!1,i.listening=!1,i.torrentPort=e.torrentPort||0,i.dhtPort=e.dhtPort||0,i.tracker=void 0!==e.tracker?e.tracker:{},i.torrents=[],i.maxConns=Number(e.maxConns)||55,f("new webtorrent (peerId %s, nodeId %s, port %s)",i.peerId,i.nodeId,i.torrentPort),i.tracker&&("object"!=typeof i.tracker&&(i.tracker={}),e.rtcConfig&&(console.warn("WebTorrent: opts.rtcConfig is deprecated. Use opts.tracker.rtcConfig instead"),i.tracker.rtcConfig=e.rtcConfig),e.wrtc&&(console.warn("WebTorrent: opts.wrtc is deprecated. Use opts.tracker.wrtc instead"),i.tracker.wrtc=e.wrtc),r.WRTC&&!i.tracker.wrtc&&(i.tracker.wrtc=r.WRTC)),"function"==typeof k?i._tcpPool=new k(i):n.nextTick(function(){i._onListening()}),i._downloadSpeed=w(),i._uploadSpeed=w(),e.dht!==!1&&"function"==typeof d?(i.dht=new d(l({nodeId:i.nodeId},e.dht)),i.dht.once("error",function(e){i._destroy(e)}),i.dht.once("listening",function(){var e=i.dht.address();e&&(i.dhtPort=e.port)}),i.dht.setMaxListeners(0),i.dht.listen(i.dhtPort)):i.dht=!1,i.enableWebSeeds=e.webSeeds!==!1,void("function"==typeof m&&null!=e.blocklist?m(e.blocklist,{headers:{"user-agent":"WebTorrent/"+S+" (https://webtorrent.io)"}},function(e,n){return e?i.error("Failed to load blocklist: "+e.message):(i.blocked=n,void t())}):n.nextTick(t))):new o(e)}function i(e){return"object"==typeof e&&null!=e&&"function"==typeof e.pipe}function s(e){return"undefined"!=typeof FileList&&e instanceof FileList}t.exports=o;var a=e("safe-buffer").Buffer,u=e("simple-concat"),c=e("create-torrent"),f=e("debug")("webtorrent"),d=e("bittorrent-dht/client"),h=e("events").EventEmitter,l=e("xtend"),p=e("inherits"),m=e("load-ip-set"),g=e("run-parallel"),y=e("parse-torrent"),_=e("path"),v=e("simple-peer"),b=e("randombytes"),w=e("speedometer"),E=e("zero-fill"),k=e("./lib/tcp-pool"),x=e("./lib/torrent"),S=e("./package.json").version,B=S.match(/([0-9]+)/g).slice(0,2).map(function(e){return E(2,e)}).join(""),I="-WW"+B+"-";p(o,h),o.WEBRTC_SUPPORT=v.WEBRTC_SUPPORT,Object.defineProperty(o.prototype,"downloadSpeed",{get:function(){return this._downloadSpeed()}}),Object.defineProperty(o.prototype,"uploadSpeed",{get:function(){return this._uploadSpeed()}}),Object.defineProperty(o.prototype,"progress",{get:function(){var e=this.torrents.filter(function(e){return 1!==e.progress}),t=e.reduce(function(e,t){return e+t.downloaded},0),n=e.reduce(function(e,t){return e+(t.length||0)},0)||1;return t/n}}),Object.defineProperty(o.prototype,"ratio",{get:function(){var e=this.torrents.reduce(function(e,t){return e+t.uploaded},0),t=this.torrents.reduce(function(e,t){return e+t.received},0)||1;return e/t}}),o.prototype.get=function(e){var t,n,r=this,o=r.torrents.length;if(e instanceof x){for(t=0;t<o;t++)if(n=r.torrents[t],n===e)return n}else{var i;try{i=y(e)}catch(e){}if(!i)return null;if(!i.infoHash)throw new Error("Invalid torrent identifier");for(t=0;t<o;t++)if(n=r.torrents[t],n.infoHash===i.infoHash)return n}return null},o.prototype.download=function(e,t,n){return console.warn("WebTorrent: client.download() is deprecated. Use client.add() instead"),this.add(e,t,n)},o.prototype.add=function(e,t,n){function r(){if(!s.destroyed)for(var e=0,t=s.torrents.length;e<t;e++){var n=s.torrents[e];if(n.infoHash===a.infoHash&&n!==a)return void a._destroy(new Error("Cannot add duplicate torrent "+a.infoHash))}}function o(){s.destroyed||("function"==typeof n&&n(a),s.emit("torrent",a))}function i(){a.removeListener("_infoHash",r),a.removeListener("ready",o),a.removeListener("close",i)}var s=this;if(s.destroyed)throw new Error("client is destroyed");if("function"==typeof t)return s.add(e,null,t);f("add"),t=t?l(t):{};var a=new x(e,s,t);return s.torrents.push(a),a.once("_infoHash",r),a.once("ready",o),a.once("close",i),a},o.prototype.seed=function(e,t,n){function r(e){var t=[function(t){e.load(d,t)}];a.dht&&t.push(function(t){e.once("dhtAnnounce",t)}),g(t,function(t){if(!a.destroyed)return t?e._destroy(t):void o(e)})}function o(e){f("on seed"),"function"==typeof n&&n(e),e.emit("seed"),
a.emit("seed",e)}var a=this;if(a.destroyed)throw new Error("client is destroyed");if("function"==typeof t)return a.seed(e,null,t);f("seed"),t=t?l(t):{},"string"==typeof e&&(t.path=_.dirname(e)),t.createdBy||(t.createdBy="WebTorrent/"+B);var d,h=a.add(null,t,r);return s(e)&&(e=Array.prototype.slice.call(e)),Array.isArray(e)||(e=[e]),g(e.map(function(e){return function(t){i(e)?u(e,t):t(null,e)}}),function(e,n){if(!a.destroyed)return e?h._destroy(e):void c.parseInput(n,t,function(e,r){if(!a.destroyed){if(e)return h._destroy(e);d=r.map(function(e){return e.getStream}),c(n,t,function(e,t){if(!a.destroyed){if(e)return h._destroy(e);var n=a.get(t);n?h._destroy(new Error("Cannot add duplicate torrent "+n.infoHash)):h._onTorrentId(t)}})}})}),h},o.prototype.remove=function(e,t){f("remove");var n=this.get(e);if(!n)throw new Error("No torrent with id "+e);this._remove(e,t)},o.prototype._remove=function(e,t){var n=this.get(e);n&&(this.torrents.splice(this.torrents.indexOf(n),1),n.destroy(t))},o.prototype.address=function(){return this.listening?this._tcpPool?this._tcpPool.server.address():{address:"0.0.0.0",family:"IPv4",port:0}:null},o.prototype.destroy=function(e){if(this.destroyed)throw new Error("client already destroyed");this._destroy(null,e)},o.prototype._destroy=function(e,t){var n=this;f("client destroy"),n.destroyed=!0;var r=n.torrents.map(function(e){return function(t){e.destroy(t)}});n._tcpPool&&r.push(function(e){n._tcpPool.destroy(e)}),n.dht&&r.push(function(e){n.dht.destroy(e)}),g(r,t),e&&n.emit("error",e),n.torrents=[],n._tcpPool=null,n.dht=null},o.prototype._onListening=function(){if(this.listening=!0,this._tcpPool){var e=this._tcpPool.server.address();e&&(this.torrentPort=e.port)}this.emit("listening")}}).call(this,e("_process"),"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./lib/tcp-pool":21,"./lib/torrent":5,"./package.json":122,_process:67,"bittorrent-dht/client":21,"create-torrent":29,debug:30,events:35,inherits:42,"load-ip-set":21,"parse-torrent":63,path:64,randombytes:74,"run-parallel":86,"safe-buffer":88,"simple-concat":89,"simple-peer":91,speedometer:94,xtend:119,"zero-fill":121}]},{},[123])(123)});



/* ---- /1Mi3ThNGPyiuhiWCJPH2BAqeKCiBF5BVpR/zeronet.coffee ---- */


(function() {
  var TorrentPaste,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  TorrentPaste = (function(superClass) {
    extend(TorrentPaste, superClass);

    function TorrentPaste() {
      this.storeOffline = bind(this.storeOffline, this);
      this.retrieveAllOffline = bind(this.retrieveAllOffline, this);
      this.onOpenWebsocket = bind(this.onOpenWebsocket, this);
      this.init = bind(this.init, this);
      return TorrentPaste.__super__.constructor.apply(this, arguments);
    }

    TorrentPaste.prototype.init = function() {
      var stuff;
      stuff = this.retrieveAllOffline("a");
      return this.log(stuff);
    };

    TorrentPaste.prototype.onOpenWebsocket = function(e) {
      this.cmd("serverInfo", {}, (function(_this) {
        return function(server_info) {};
      })(this));
      return this.cmd("siteInfo", {}, (function(_this) {
        return function(site_info) {};
      })(this));
    };

    TorrentPaste.prototype.retrieveAllOffline = function(a) {
      this.log("Retrieving data");
      return this.cmd("fileQuery", ["data.json", ""], (function(_this) {
        return function(torrents) {
          var i, len, results, torrent;
          torrents.sort(function(a, b) {
            return a.added - b.added;
          });
          results = [];
          for (i = 0, len = torrents.length; i < len; i++) {
            torrent = torrents[i];
            results.push(_this.log(torrent.infoHash, torrent.infoHash.title, torrent.infoHash.content));
          }
          return results;
        };
      })(this));
    };

    TorrentPaste.prototype.storeOffline = function(infoHash, title, content, cb) {
      var json_raw, torrentInfo;
      if (cb == null) {
        cb = null;
      }
      torrentInfo = {
        infoHash: {
          "title": title,
          "content": content
        }
      };
      json_raw = unescape(encodeURIComponent(JSON.stringify(torrentInfo), void 0, '\t'));
      return this.cmd("fileWrite", ["data.json", btoa(json_raw)], (function(_this) {
        return function(res) {
          if (res === "ok") {
            _this.cmd("wrapperNotification", ["done", "Torrent stored offline successfully!"]);
            if (cb) {
              return cb(true);
            }
          } else {
            _this.cmd("wrapperNotification", ["error", "File write error: " + res]);
            if (cb) {
              return cb(false);
            }
          }
        };
      })(this));
    };

    return TorrentPaste;

  })(ZeroFrame);

  window.Page = new TorrentPaste();

}).call(this);
