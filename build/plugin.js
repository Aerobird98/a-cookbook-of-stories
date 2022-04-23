!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define(e)
    : ((t =
        "undefined" != typeof globalThis
          ? globalThis
          : t || self).rexpinchplugin = e());
})(this, function () {
  "use strict";
  function i(t) {
    return (i =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              "function" == typeof Symbol &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          })(t);
  }
  function a(t, e) {
    if (!(t instanceof e))
      throw new TypeError("Cannot call a class as a function");
  }
  function n(t, e) {
    for (var i = 0; i < e.length; i++) {
      var n = e[i];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        "value" in n && (n.writable = !0),
        Object.defineProperty(t, n.key, n);
    }
  }
  function t(t, e, i) {
    return e && n(t.prototype, e), i && n(t, i), t;
  }
  function r(t, e) {
    if ("function" != typeof e && null !== e)
      throw new TypeError("Super expression must either be null or a function");
    (t.prototype = Object.create(e && e.prototype, {
      constructor: { value: t, writable: !0, configurable: !0 },
    })),
      e && s(t, e);
  }
  function h(t) {
    return (h = Object.setPrototypeOf
      ? Object.getPrototypeOf
      : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        })(t);
  }
  function s(t, e) {
    return (s =
      Object.setPrototypeOf ||
      function (t, e) {
        return (t.__proto__ = e), t;
      })(t, e);
  }
  function u(t) {
    if (void 0 === t)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called"
      );
    return t;
  }
  function c(n) {
    var r = (function () {
      if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
      if (Reflect.construct.sham) return !1;
      if ("function" == typeof Proxy) return !0;
      try {
        return (
          Boolean.prototype.valueOf.call(
            Reflect.construct(Boolean, [], function () {})
          ),
          !0
        );
      } catch (t) {
        return !1;
      }
    })();
    return function () {
      var t,
        e = h(n);
      if (r) {
        var i = h(this).constructor;
        t = Reflect.construct(e, arguments, i);
      } else t = e.apply(this, arguments);
      return (function (t, e) {
        if (e && ("object" == typeof e || "function" == typeof e)) return e;
        if (void 0 !== e)
          throw new TypeError(
            "Derived constructors may only return object or undefined"
          );
        return u(t);
      })(this, t);
    };
  }
  function f(t, e, i) {
    return (f =
      "undefined" != typeof Reflect && Reflect.get
        ? Reflect.get
        : function (t, e, i) {
            var n = (function (t, e) {
              for (
                ;
                !Object.prototype.hasOwnProperty.call(t, e) &&
                null !== (t = h(t));

              );
              return t;
            })(t, e);
            if (n) {
              var r = Object.getOwnPropertyDescriptor(n, e);
              return r.get ? r.get.call(i) : r.value;
            }
          })(t, e, i || t);
  }
  function e(t) {
    if ("object" !== i(t) || null === t) return t;
    if (Array.isArray(t)) t.length = 0;
    else for (var e in t) delete t[e];
    return t;
  }
  var o = {
      setEventEmitter: function (t, e) {
        return (
          void 0 === e && (e = Phaser.Events.EventEmitter),
          (this._privateEE = !0 === t || void 0 === t),
          (this._eventEmitter = this._privateEE ? new e() : t),
          this
        );
      },
      destroyEventEmitter: function () {
        return (
          this._eventEmitter &&
            this._privateEE &&
            this._eventEmitter.shutdown(),
          this
        );
      },
      getEventEmitter: function () {
        return this._eventEmitter;
      },
      on: function () {
        return (
          this._eventEmitter &&
            this._eventEmitter.on.apply(this._eventEmitter, arguments),
          this
        );
      },
      once: function () {
        return (
          this._eventEmitter &&
            this._eventEmitter.once.apply(this._eventEmitter, arguments),
          this
        );
      },
      off: function () {
        return (
          this._eventEmitter &&
            this._eventEmitter.off.apply(this._eventEmitter, arguments),
          this
        );
      },
      emit: function (t) {
        return (
          this._eventEmitter &&
            t &&
            this._eventEmitter.emit.apply(this._eventEmitter, arguments),
          this
        );
      },
      addListener: function () {
        return (
          this._eventEmitter &&
            this._eventEmitter.addListener.apply(this._eventEmitter, arguments),
          this
        );
      },
      removeListener: function () {
        return (
          this._eventEmitter &&
            this._eventEmitter.removeListener.apply(
              this._eventEmitter,
              arguments
            ),
          this
        );
      },
      removeAllListeners: function () {
        return (
          this._eventEmitter &&
            this._eventEmitter.removeAllListeners.apply(
              this._eventEmitter,
              arguments
            ),
          this
        );
      },
      listenerCount: function () {
        return this._eventEmitter
          ? this._eventEmitter.listenerCount.apply(
              this._eventEmitter,
              arguments
            )
          : 0;
      },
      listeners: function () {
        return this._eventEmitter
          ? this._eventEmitter.listeners.apply(this._eventEmitter, arguments)
          : [];
      },
      eventNames: function () {
        return this._eventEmitter
          ? this._eventEmitter.eventNames.apply(this._eventEmitter, arguments)
          : [];
      },
    },
    l = Phaser.Utils.Objects.GetValue,
    v = Phaser.Utils.Array.SpliceOne,
    p = Phaser.Math.Distance.Between,
    d = Phaser.Math.Angle.Between,
    y = (function () {
      function n(t, e) {
        a(this, n);
        var i = t.input.manager.pointersTotal - 1;
        i < 2 && t.input.addPointer(2 - i),
          (this.scene = t),
          this.setEventEmitter(l(e, "eventEmitter", void 0)),
          (this._enable = void 0),
          (this.pointers = []),
          (this.movedState = {}),
          this.resetFromJSON(e),
          this.boot();
      }
      return (
        t(n, [
          {
            key: "resetFromJSON",
            value: function (t) {
              return (
                this.setEnable(l(t, "enable", !0)),
                (this.bounds = l(t, "bounds", void 0)),
                (this.tracerState = E),
                (this.pointers.length = 0),
                e(this.movedState),
                this
              );
            },
          },
          {
            key: "boot",
            value: function () {
              this.scene.input.on("pointerdown", this.onPointerDown, this),
                this.scene.input.on("pointerup", this.onPointerUp, this),
                this.scene.input.on("pointermove", this.onPointerMove, this),
                this.scene.sys.events.once("shutdown", this.destroy, this);
            },
          },
          {
            key: "shutdown",
            value: function () {
              this.scene &&
                (this.destroyEventEmitter(),
                (this.pointers.length = 0),
                e(this.movedState),
                this.scene.input.off("pointerdown", this.onPointerDown, this),
                this.scene.input.off("pointerup", this.onPointerUp, this),
                this.scene.input.off("pointermove", this.onPointerMove, this),
                this.scene.sys.events.off("shutdown", this.destroy, this),
                (this.scene = void 0));
            },
          },
          {
            key: "destroy",
            value: function () {
              this.shutdown();
            },
          },
          {
            key: "enable",
            get: function () {
              return this._enable;
            },
            set: function (t) {
              if (this._enable !== t)
                return t || this.dragCancel(), (this._enable = t), this;
            },
          },
          {
            key: "setEnable",
            value: function (t) {
              return void 0 === t && (t = !0), (this.enable = t), this;
            },
          },
          {
            key: "toggleEnable",
            value: function () {
              return this.setEnable(!this.enable), this;
            },
          },
          {
            key: "onPointerDown",
            value: function (t) {
              if (
                this.enable &&
                2 !== this.pointers.length &&
                (!this.bounds || this.bounds.contains(t.x, t.y)) &&
                -1 === this.pointers.indexOf(t)
              )
                switch (
                  ((this.movedState[t.id] = !1),
                  this.pointers.push(t),
                  this.tracerState)
                ) {
                  case E:
                    (this.tracerState = b), this.onDrag1Start();
                    break;
                  case b:
                    (this.tracerState = _), this.onDrag2Start();
                }
            },
          },
          {
            key: "onPointerUp",
            value: function (t) {
              if (
                this.enable &&
                (!this.bounds || this.bounds.contains(t.x, t.y))
              ) {
                var e = this.pointers.indexOf(t);
                if (-1 !== e)
                  switch (
                    (delete this.movedState[t.id],
                    v(this.pointers, e),
                    this.tracerState)
                  ) {
                    case b:
                      (this.tracerState = E), this.onDrag1End();
                      break;
                    case _:
                      (this.tracerState = b),
                        this.onDrag2End(),
                        this.onDrag1Start();
                  }
              }
            },
          },
          {
            key: "onPointerMove",
            value: function (t) {
              if (this.enable && t.isDown) {
                var e = !this.bounds || this.bounds.contains(t.x, t.y),
                  i = -1 !== this.pointers.indexOf(t);
                if (i || !e)
                  if (i && !e) this.onPointerUp(t);
                  else if (
                    (this.movedState[t.id] ||
                      (this.movedState[t.id] =
                        t.x !== t.downX || t.y !== t.downY),
                    this.movedState[t.id])
                  )
                    switch (this.tracerState) {
                      case b:
                        this.onDrag1();
                        break;
                      case _:
                        this.onDrag2();
                    }
              }
            },
          },
          {
            key: "dragCancel",
            value: function () {
              return (
                this.tracerState === _ && this.onDrag2End(),
                (this.pointers.length = 0),
                e(this.movedState),
                (this.tracerState = E),
                this
              );
            },
          },
          {
            key: "onDrag1Start",
            value: function () {
              this.emit("drag1start", this);
            },
          },
          {
            key: "onDrag1End",
            value: function () {
              this.emit("drag1end", this);
            },
          },
          {
            key: "onDrag1",
            value: function () {
              this.emit("drag1", this);
            },
          },
          {
            key: "onDrag2Start",
            value: function () {
              this.emit("drag2start", this);
            },
          },
          {
            key: "onDrag2End",
            value: function () {
              this.emit("drag2end", this);
            },
          },
          {
            key: "onDrag2",
            value: function () {
              this.emit("drag2", this);
            },
          },
          {
            key: "distanceBetween",
            get: function () {
              if (this.tracerState !== _) return 0;
              var t = this.pointers[0],
                e = this.pointers[1];
              return p(t.x, t.y, e.x, e.y);
            },
          },
          {
            key: "angleBetween",
            get: function () {
              if (this.tracerState !== _) return 0;
              var t = this.pointers[0],
                e = this.pointers[1];
              return d(t.x, t.y, e.x, e.y);
            },
          },
          {
            key: "drag1Vector",
            get: function () {
              var t = this.pointers[0];
              if (t && this.movedState[t.id]) {
                var e = t.position,
                  i = t.prevPosition;
                (g.x = e.x - i.x), (g.y = e.y - i.y);
              } else (g.x = 0), (g.y = 0);
              return g;
            },
          },
          {
            key: "centerX",
            get: function () {
              if (this.tracerState !== _) return 0;
              var t = this.pointers[0].position,
                e = this.pointers[1].position;
              return (t.x + e.x) / 2;
            },
          },
          {
            key: "centerY",
            get: function () {
              if (this.tracerState !== _) return 0;
              var t = this.pointers[0].position,
                e = this.pointers[1].position;
              return (t.y + e.y) / 2;
            },
          },
          {
            key: "prevCenterX",
            get: function () {
              if (this.tracerState !== _) return 0;
              var t = this.movedState[this.pointers[0].id]
                  ? this.pointers[0].prevPosition
                  : this.pointers[0].position,
                e = this.movedState[this.pointers[1].id]
                  ? this.pointers[1].prevPosition
                  : this.pointers[1].position;
              return (t.x + e.x) / 2;
            },
          },
          {
            key: "prevCenterY",
            get: function () {
              if (this.tracerState !== _) return 0;
              var t = this.movedState[this.pointers[0].id]
                  ? this.pointers[0].prevPosition
                  : this.pointers[0].position,
                e = this.movedState[this.pointers[1].id]
                  ? this.pointers[1].prevPosition
                  : this.pointers[1].position;
              return (t.y + e.y) / 2;
            },
          },
          {
            key: "movementCenterX",
            get: function () {
              return this.centerX - this.prevCenterX;
            },
          },
          {
            key: "movementCenterY",
            get: function () {
              return this.centerY - this.prevCenterY;
            },
          },
          {
            key: "setRecongizedStateObject",
            value: function (t) {
              return (this.recongizedState = t), this;
            },
          },
          {
            key: "state",
            get: function () {
              return this.recongizedState.state;
            },
            set: function (t) {
              this.recongizedState.state = t;
            },
          },
          {
            key: "cancel",
            value: function () {
              return (this.state = S), this;
            },
          },
        ]),
        n
      );
    })();
  Object.assign(y.prototype, o);
  function m(t, e, i) {
    if (t && "number" != typeof t) {
      if (t.hasOwnProperty(e)) return t[e];
      if (-1 === e.indexOf(".")) return i;
      for (var n = e.split("."), r = t, s = i, o = 0; o < n.length; o++) {
        if (!r.hasOwnProperty(n[o])) {
          s = i;
          break;
        }
        (s = r[n[o]]), (r = r[n[o]]);
      }
      return s;
    }
    return i;
  }
  var g = {},
    E = 0,
    b = 1,
    _ = 2,
    S = "IDLE",
    k = (function () {
      function o(t) {
        a(this, o);
        var e = m(t, "states", void 0);
        e && this.addStates(e);
        var i = m(t, "extend", void 0);
        if (i)
          for (var n in i)
            (this.hasOwnProperty(n) && void 0 !== this[n]) || (this[n] = i[n]);
        var r = m(t, "eventEmitter", void 0),
          s = m(t, "EventEmitterClass", void 0);
        this.setEventEmitter(r, s),
          (this._stateLock = !1),
          this.resetFromJSON(t);
      }
      return (
        t(o, [
          {
            key: "shutdown",
            value: function () {
              this.destroyEventEmitter();
            },
          },
          {
            key: "destroy",
            value: function () {
              this.shutdown();
            },
          },
          {
            key: "resetFromJSON",
            value: function (t) {
              this.setEnable(m(t, "enable", !0)),
                this.start(m(t, "start", void 0));
              var e = m(t, "init", void 0);
              return e && e.call(this), this;
            },
          },
          {
            key: "toJSON",
            value: function () {
              return {
                curState: this.state,
                prevState: this.prevState,
                enable: this.enable,
                start: this._start,
              };
            },
          },
          {
            key: "setEnable",
            value: function (t) {
              return void 0 === t && (t = !0), (this.enable = t), this;
            },
          },
          {
            key: "toggleEnable",
            value: function () {
              return this.setEnable(!this.enable), this;
            },
          },
          {
            key: "state",
            get: function () {
              return this._state;
            },
            set: function (t) {
              if (this.enable && !this._stateLock && this._state !== t) {
                if (
                  ((this._prevState = this._state),
                  (this._state = t),
                  (this._stateLock = !0),
                  this.emit("statechange", this),
                  null != this._prevState)
                ) {
                  var e = "exit_" + this._prevState,
                    i = this[e];
                  i && i.call(this), this.emit(e, this);
                }
                if (((this._stateLock = !1), null != this._state)) {
                  var n = "enter_" + this._state,
                    r = this[n];
                  r && r.call(this), this.emit(n, this);
                }
              }
            },
          },
          {
            key: "prevState",
            get: function () {
              return this._prevState;
            },
          },
          {
            key: "start",
            value: function (t) {
              return (
                (this._start = t),
                (this._prevState = void 0),
                (this._state = t),
                this
              );
            },
          },
          {
            key: "goto",
            value: function (t) {
              return null != t && (this.state = t), this;
            },
          },
          {
            key: "next",
            value: function () {
              var t,
                e = this["next_" + this.state];
              return (
                e && (t = "string" == typeof e ? e : e.call(this)),
                this.goto(t),
                this
              );
            },
          },
          {
            key: "addState",
            value: function (t, e) {
              "string" != typeof t && (t = (e = t).name);
              var i = e.next;
              i && (this["next_" + t] = i);
              var n = e.exit;
              n && (this["exit_" + t] = n);
              var r = e.enter;
              return r && (this["enter_" + t] = r), this;
            },
          },
          {
            key: "addStates",
            value: function (t) {
              if (Array.isArray(t))
                for (var e = 0, i = t.length; e < i; e++) this.addState(t[e]);
              else for (var n in t) this.addState(n, t[n]);
              return this;
            },
          },
          {
            key: "runMethod",
            value: function (t, e, i, n, r, s) {
              var o = this[t + "_" + this.state];
              if (o) {
                var a = arguments.length;
                switch (a) {
                  case 1:
                    return o.call(this);
                  case 2:
                    return o.call(this, e);
                  case 3:
                    return o.call(this, e, i);
                  case 4:
                    return o.call(this, e, i, n);
                  case 5:
                    return o.call(this, e, i, n, r);
                  case 6:
                    return o.call(this, e, i, n, r, s);
                }
                for (var h = new Array(a - 1), u = 1; u < a; u++)
                  h[u - 1] = arguments[u];
                return o.apply(this, h);
              }
            },
          },
          {
            key: "update",
            value: function (t, e) {
              this.runMethod("update", t, e);
            },
          },
          {
            key: "preupdate",
            value: function (t, e) {
              this.runMethod("preupdate", t, e);
            },
          },
          {
            key: "postupdate",
            value: function (t, e) {
              this.runMethod("postupdate", t, e);
            },
          },
        ]),
        o
      );
    })();
  Object.assign(k.prototype, o);
  var w = Phaser.Utils.Objects.GetValue,
    D = (function () {
      r(o, y);
      var s = c(o);
      function o(t, e) {
        var i;
        a(this, o);
        var n = u((i = s.call(this, t, e))),
          r = {
            states: {
              IDLE: {
                enter: function () {
                  (n.prevDistance = void 0), (n.scaleFactor = 1);
                },
              },
              BEGIN: {},
              RECOGNIZED: {
                enter: function () {
                  n.emit("pinchstart", n);
                },
                exit: function () {
                  n.emit("pinchend", n);
                },
              },
            },
            init: function () {
              this.state = O;
            },
            eventEmitter: !1,
          };
        return i.setRecongizedStateObject(new k(r)), i;
      }
      return (
        t(o, [
          {
            key: "resetFromJSON",
            value: function (t) {
              return (
                f(h(o.prototype), "resetFromJSON", this).call(this, t),
                this.setDragThreshold(w(t, "threshold", 0)),
                this
              );
            },
          },
          {
            key: "onDrag2Start",
            value: function () {
              (this.scaleFactor = 1),
                (this.prevDistance = this.distanceBetween),
                (this.state = P),
                0 === this.dragThreshold && (this.state = x);
            },
          },
          {
            key: "onDrag2End",
            value: function () {
              this.state = O;
            },
          },
          {
            key: "onDrag2",
            value: function () {
              switch (this.state) {
                case P:
                  if (
                    this.pointers[0].getDistance() >= this.dragThreshold &&
                    this.pointers[1].getDistance() >= this.dragThreshold
                  ) {
                    var t = this.distanceBetween;
                    (this.scaleFactor = t / this.prevDistance),
                      (this.prevDistance = t),
                      (this.state = x);
                  }
                  break;
                case x:
                  t = this.distanceBetween;
                  (this.scaleFactor = t / this.prevDistance),
                    this.emit("pinch", this),
                    (this.prevDistance = t);
              }
            },
          },
          {
            key: "isPinched",
            get: function () {
              return this.state === x;
            },
          },
          {
            key: "setDragThreshold",
            value: function (t) {
              return (this.dragThreshold = t), this;
            },
          },
        ]),
        o
      );
    })(),
    O = "IDLE",
    P = "BEGIN",
    x = "RECOGNIZED";
  return (function () {
    r(i, Phaser.Plugins.BasePlugin);
    var e = c(i);
    function i(t) {
      return a(this, i), e.call(this, t);
    }
    return (
      t(i, [
        {
          key: "start",
          value: function () {
            this.game.events.on("destroy", this.destroy, this);
          },
        },
        {
          key: "add",
          value: function (t, e) {
            return new D(t, e);
          },
        },
      ]),
      i
    );
  })();
});
