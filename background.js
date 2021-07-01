function rgb2hsv(r, g, b) {
    let
        rr = r / 255,
        gr = g / 255,
        br = b / 255;
    let
        cmax = Math.max(rr, gr, br),
        cmin = Math.min(rr, gr, br),
        delta = cmax - cmin;
    let
        h =
            delta == 0 ? 0 :
                cmax == rr ? 60 * ((gr - br) / delta + 0) :
                    cmax == gr ? 60 * ((br - rr) / delta + 2) :
                        60 * ((rr - gr) / delta + 4),
        s =
            cmax == 0 ? 0 : delta / cmax,
        v = cmax;
    return { h: h, s: s, v: v };
}
function format(val) {
    var args = Array.prototype.slice.call(arguments, 1)
    return val.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] !== 'undefined' ? args[number] : match
    })
}

function randomFrom(lowerValue, upperValue) {
    return Math.floor(Math.random() * (upperValue - lowerValue + 1) + lowerValue);
}//生成区域随机数
function randomColor() {
    var temp;
    while (true) {
        temp = {r:randomFrom(0, 255), g:randomFrom(0, 255), b:randomFrom(0, 255)};
        if(rgb2hsv(temp.r,temp.g,temp.b).v>0.6){
            this.r=temp.r;
            this.g=temp.g;
            this.b=temp.b;
            break;
        };
    }
    this.a = 1;
    this.rgba = function () { return format("rgba({0},{1},{2},{3})", this.r.toString(), this.g.toString(), this.b.toString(), this.a.toString()) };
    this.rgb = function () { return format("rgb({0},{1},{2})", this.r.toString()), this.g.toString(), this.b.toString() };

}

function circle() {
    this.position = { x: 0, y: 0 };
    this.beginr = 0;
    this.endr = 0;
    this.nowr = 0
    this.color = new randomColor();
    this.remain_life = 100;
    this.full_life = randomFrom(80,120);
    this.drewself = function (ctx) {
        ctx.fillStyle = this.color.rgba();
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.nowr, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.closePath();

    };
    this.isold = function () {
        if (this.remain_life === 0) {
            return true;
        } else {
            return false;
        }
    }
    this.beolder = function () {
        this.remain_life--;
        this.nowr = (1 - (this.remain_life / this.full_life)) * (this.endr - this.beginr) + this.beginr;
        this.color.a = this.remain_life / this.full_life;
    }
}
var circle_list = new Array();
$(document).ready(function () {
    var canvas_dom = document.getElementById("ground_canvas");
    var ctx = canvas_dom.getContext("2d");
    canvas_dom.width = document.body.clientWidth;
    canvas_dom.height = document.body.clientHeight;
    $(window).resize(function () {
        var width = document.body.clientWidth;
        var height = document.body.clientHeight;
        $("#ground_canvas").attr("width", width);
        $("#ground_canvas").attr("height", height);
    });
    //begin to drew
    //clear the canvas
    var w = canvas_dom.width;
    var h = canvas_dom.height;
    //begin to make random circles
    //定义几个变量
    var circle_begin_r = 4;
    var circle_end_r = 10;
    var circle_amount = 50;
    for (var i = 0; i < circle_amount; i++) {
        var the_circle = new circle();
        the_circle.position.x = randomFrom(0, w);
        the_circle.beginr = circle_begin_r;
        the_circle.endr = circle_end_r;
        the_circle.nowr = the_circle.beginr;
        the_circle.position.y = randomFrom(0, h);
        circle_list.push(the_circle);
    }
    setInterval(function (ctx) {
        ctx.clearRect(0, 0, document.body.clientWidth, document.body.clientHeight);
        circle_list.forEach(function (circle) {
            circle.drewself(ctx);
            circle.beolder();
        });
        circle_list = circle_list.filter(function a(item) {
            return !item.isold();
        })
        if (circle_list.length != 10) {
            var the_circle = new circle();
            the_circle.position.x = randomFrom(0, canvas_dom.width);
            the_circle.beginr = circle_begin_r;
            the_circle.endr = circle_end_r;
            the_circle.nowr = the_circle.beginr;
            the_circle.position.y = randomFrom(0, canvas_dom.height);
            circle_list.push(the_circle);
        }
    }, 70, ctx);



});