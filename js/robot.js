"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, Vec2, Robot;

    function getStepSize() {
      var parsed = parseInt(location.search.split('n=')[1]);
      return (isNaN(parsed) ? 5 : parsed);
    }

    var n = getStepSize();

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function pt(v) {
        return new paper.Point(v.x, v.y);
    }

    function drawDot(v, color) {
        var c = new paper.Shape.Circle(pt(v), 0.2);
        c.strokeWidth = 0.04;
        c.strokeColor = "black";
        c.opacity = 0.7;
        if (color) c.fillColor = color;
        return c;
    }

    function drawVec(s, v) {
        var e = s.clone().add(v);
        var g = new paper.Group([new paper.Path.Line(pt(s), pt(e))]);
        g.strokeWidth = 0.05;
        g.strokeColor = "black";
        return g;
    }

    function drawArc(a, b, c) {
        var p = new paper.Path.Arc(pt(a), pt(b), pt(c));
        p.strokeWidth = 0.05;
        p.strokeColor = "red";
        return p;
    }

    return {
        setters: [],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            Vec2 = dcodeIO.JustMath.Vec2;

            _export("Robot", Robot = function () {
                function Robot(paperLayer) {
                    _classCallCheck(this, Robot);

                    this.canvas = paperLayer;
                    this.heading = new paper.Group();
                    this.canvas.addChild(this.heading);

                    this.p = new Vec2(0, 0);
                    this.f = new Vec2(0, 1);
                    // TODO: It would be great if these could be toggled with a URL parameter.
                    // this.canvas.addChild(drawDot(this.p, "skyblue"));

                    this.drawCurrent();
                }

                _createClass(Robot, [{
                    key: "drawCurrent",
                    value: function drawCurrent() {
                        this.heading.removeChildren();

                        this.heading.addChild(drawDot(this.p, "skyblue"));
                        this.heading.addChild(drawVec(this.p, this.f));
                    }
                }, {
                    key: "move",
                    value: function move(s) {
                        var before = this.p.clone();

                        var turn = s == "L" ? Math.PI / 2 : -Math.PI / 2;
                        var pole = this.p.clone().add(this.f.clone().rotate(turn));

                        var arm = this.p.clone().sub(pole);

                        var rot = s == "L" ? 2 * Math.PI / n : -2 * Math.PI / n;
                        var halfway = arm.clone().rotate(rot / 2.0);
                        var whole = arm.clone().rotate(rot);

                        var passthrough = pole.clone().add(halfway);
                        var dest = pole.clone().add(whole);

                        this.p = dest;
                        this.f.rotate(rot);

                        this.canvas.addChild(drawArc(before, passthrough, dest));
                        // TODO: It would be great if these could be toggled with a URL parameter.
                        // this.canvas.addChild(drawDot(before));

                        this.drawCurrent();
                    }
                }]);

                return Robot;
            }());

            _export("Robot", Robot);
        }
    };
});
