// JavaScript Document
// Author: Yangz
// Time: 2014/07/23


//鍔犺浇鍏叡js
window.baseScriptUrl="script/";
$.getScript(baseScriptUrl+"common.js");


$("html").css("overflow","hidden");

$(function () {
    $("body").queryLoader2({
        backgroundColor: "#fff",
        barColor: "#da251d",
        barHeight: 2,
        percentage: true,
        onComplete: function () {

            $(".qLoverlay").fadeOut();

            $.stellar({
                horizontalScrolling: false,
                verticalOffset: 50
            });

            main();




        }
    });

    $(document).delegate(".qLoverlay", "click", function () {
        $(this).hide();
    });

    function main() {

        $("html").removeAttr("style");

        /* bannner */
        var perpower = {
            width: $(window).width(),
            height: $(window).height(),
            bannerRate: 678 / 1920,
            isMobile: false
        };

        perpower.getScreenSize = function () {
            this.width = $(window).width();
            this.height = $(window).height();
        };

        perpower.setFirstPage = function () {

            perpower.getScreenSize();

            var businessH = $(".business").innerHeight(), topH = 60||$(".top").height();
            var bannerH = this.height - businessH - topH;
            $(".banner,.banner li").height(bannerH);

            if ((bannerH / this.width) >= this.bannerRate) {
                $(".banner_img").height(bannerH).width("").css({
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    marginLeft: -(bannerH / this.bannerRate) / 2,
                    marginTop: -bannerH / 2
                });
            } else {
                $(".banner_img").width(this.width).height("").css({
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    marginLeft: -this.width / 2,
                    marginTop: (-this.width * this.bannerRate) / 2
                });
            }
        };


        perpower.init = function () {

            perpower.setFirstPage();

        }();

        $(window).resize(function () {

            perpower.getScreenSize();

            perpower.setFirstPage();

            $('.wedo_list ul').isotope('reLayout');

        });


        var topContact = $(".top_contact"),
            searchBox = $(".search"),
            menu = $(".menu");

        function hideSlide() {

            topContact.hide();
            searchBox.hide();
            menu.hide();
            $("#header").removeClass("on");

        }

        /* 鑱旂郴鏂瑰紡 */
        $(".tel_btn").click(function () {
            if (topContact.is(":hidden")) {
                hideSlide();
                topContact.slideDown(500)
            } else {
                topContact.slideUp(100);
            }
        });

        /* 鎼滅储 */
        $(".search_btn").click(function () {

            if (searchBox.is(":hidden")) {
                hideSlide();
                searchBox.slideDown(100);
            } else {
                searchBox.slideUp(50);
            }
        });


        /* 鑿滃崟 */
        $(".menu_btn").click(function () {

            if (menu.is(":hidden")) {
                hideSlide();
                menu.slideDown(600, "easeInOutExpo");
                $("#header").addClass("on");
            } else {
                menu.slideUp(100);
                $("#header").removeClass("on");
            }
        });



        //
        //$(window).scroll(function () {
        //    if ($(window).scrollTop() >= perpower.height - 72) {
        //        //$(".back_top").fadeIn();
        //        $("#header").addClass("shadow");
        //    } else {
        //        //$(".back_top").fadeOut();
        //        $("#header").removeClass("shadow");
        //    }
        //});





        /* banner */
        var bannerLi = $(".banner li");
        var l = bannerLi.length;
        var now = 0, speed = 2000, speed2 = 7000, nowZindex = l, timer, easingName = "easeInOutExpo";
        bannerLi.each(function (index, element) {
            $(element).css({zIndex: l - index});
        }).show();


        $(".banner_next").click(function () {
            clearInterval(timer);
            now++;
            if (now >= l) {
                now = 0
            }
            nowZindex++;

            bannerLi.eq(now).css({left: perpower.width, zIndex: nowZindex}).animate({left: 0}, speed, easingName)
                .end().eq(now - 1).animate({left: -perpower.width / 3}, speed, easingName)
                .find(".banner_txt").addClass("s");

            bannerLi.eq(now).find(".banner_txt").removeClass("s");

            bannerLi.eq(now).find(".banner_txt h2").css({"position": "relative", top: -500}).delay(speed / 2).animate({
                top: 0
            }, speed / 2, easingName);

            bannerLi.eq(now).find(".banner_txt p").css({"position": "relative", top: 500}).delay(speed / 2).animate({
                top: 0
            }, speed / 1.25, easingName);


            timer = setInterval(function () {
                $(".banner_next").click();
            }, speed2);

            return false;
        });

        $(".banner_prev").click(function () {
            clearInterval(timer);
            now--;
            if (now < 0) {
                now = l - 1
            }
            var nowPlus = now + 1;
            if (nowPlus) {
            }
            if (nowPlus == l) {
                nowPlus = 0
            }
            nowZindex++;
            bannerLi.eq(now).css({left: -perpower.width, zIndex: nowZindex}).animate({left: 0}, speed, easingName)
                .end().eq(nowPlus).animate({left: perpower.width / 3}, speed, easingName)
                .find(".banner_txt").addClass("s");

            bannerLi.eq(now).find(".banner_txt").removeClass("s");

            bannerLi.eq(now).find(".banner_txt h2").css({"position": "relative", top: -500}).delay(speed / 2).animate({
                top: 0
            }, speed / 2);

            bannerLi.eq(now).find(".banner_txt p").css({"position": "relative", top: 500}).delay(speed / 2).animate({
                top: 0
            }, speed / 1.25, easingName);


            timer = setInterval(function () {
                $(".banner_next").click();
            }, speed2);
            return false;

        });

        timer = setInterval(function () {
            $(".banner_next").click();
        }, speed2);


        /* team */

        $(".team .team_list").slide({
            effect: "fade",
            autoPlay: true,
            autoPlay: true,
            delayTime: 1000,
            interTime: 4000,
            titCell: ".team_dot ul",
            mainCell: ".team_list_wrap ul",
            trigger: "click",
            titOnClassName: "on",
            autoPage: true
        });


        $(".blog3 .team_list").slide({
            effect: "fade",
            autoPlay: true,
            delayTime: 1000,
            interTime: 4000,
            titCell: ".team_dot ul",
            mainCell: ".blog_list2 ul",
            trigger: "click",
            titOnClassName: "on",
            autoPage: true
        });


        $(".service .container").slide({
            effect: "leftLoop",
            autoPlay: true,
            delayTime: 1000,
            interTime: 4000,
            mainCell: ".service_content ul",
            prevCell: ".service_prev",
            nextCell: ".service_next",
            trigger: "click"
        });


        $(".partner_list").slide({
            effect: "leftLoop",
            autoPlay: false,
            delayTime: 500,
            interTime: 4000,
            scroll: 1,
            vis: 6,//visible锛屽彲
            mainCell: ".partner_list_wrap ul",
            prevCell: ".partner_prev",
            nextCell: ".partner_next",
            trigger: "click"
        });


        /* team2_list*/
        $(".team2_list .team_photo").click(function () {
            var p = $(this).parents("li");

            var index = p.index();
            if (!p.hasClass("on")) {
                p.addClass("on").animate({
                    width: 665
                }).siblings().animate({width: 250}, 600).removeClass("on");

                $(".team2_list ul").animate({
                    left: -index * 285
                }, 600)

            } else {
                p.removeClass("on").animate({
                    width: 250
                }, 600);
                $(".team2_list ul").animate({
                    left: 0
                }, 600)
            }

        });


        $(".team_links_2").hover(function(){
            $(this).parent().next().show();
        },function(){
            $(this).parent().next().hide();
        });



        /* 绛涢€� */
        $('.wedo_select li').click(function () {
            //if($(this).hasClass("on")) return;
            $(this).addClass("on").siblings().removeClass("on");
            var selector = $(this).attr('data-filter');
            $('.wedo_list ul').isotope({filter: selector});
            return false;
        });


        $(".iamge_show").fancybox({
            centerOnScroll: true,
            transitionIn: "elastic",
            transitionOut: "elastic",
            speedIn: 600,
            speedOut: 300
        });


        function numAdd(el) {
            var lastNum = el.data("num");
            el.text(0);
            var i = 0;
            var timer = setInterval(function () {
                el.text(i += 5);
                if (i >= lastNum) {
                    clearInterval(timer);
                    el.text(lastNum);
                }
            }, 10)
        }


        $(".priorities").waypoint(function (direction) {
            if (direction == "down") {
                numAdd($(".num").eq(0));
                numAdd($(".num").eq(1));
                numAdd($(".num").eq(2));
                numAdd($(".num").eq(3));
            }

        }, {offset: "64%"});


        $(".wedo").waypoint(function (direction) {
            if (direction == "down") {
                $('.wedo_list ul').isotope({filter: "none"});
                $('.wedo_select li').first().click();
            }

        }, {offset: "64%"});





        ////鑿滃崟鐐瑰嚮
        //$(".menu_li h2 a").click(function () {
        //
        //    var blockName = $(this).data("class");
        //    var blockTop = $("." + blockName).offset().top;
        //    $("body,html").animate({
        //        scrollTop: blockTop - 72
        //    });
        //    $(".menu_btn").click();
        //});


        $(".map_overlay").click(function () {
            $(this).hide();
        });

        $(".map").mouseleave(function () {
            $(".map_overlay").show();
        });


        $(".share_weixin").click(function(){
            $("#custom_weixin").show();
            return false;
        });

        $("#custom_weixin .bd_weixin_popup_close").click(function(){
            $("#custom_weixin").hide();
        });

    }
});


//闆姳
(function () {
    var app = {}, flag = false;
    if ($.browser.msie && $.browser.version <= 8)return;
    var a = function () {
        function r(a) {
            return a * Math.random()
        }

        function s() {
            return document.createElement("canvas")
        }

        function t() {
            var a;
            for (var d = 0; d < m; d++)a = d < m * .6 ? 0 : d < m * .8 ? 1 : d < m * .9 ? 2 : d < m * .98 ? 3 : 4, o[d] = [r(b), r(c), a]
        }

        function u() {
            var a, d, e, f;
            p += .01, d = Math.sin(p);
            for (a = 0; a < m; a++) {
                f = o[a], e = Math.sin(4 * p + a), f[1] += f[2] / 2 + (2 + e), f[0] += 6 * (d + e / 2) / (10 / f[2]), f[1] > c && (f[1] = -n, f[0] = r(b));
                if (f[0] > b || f[0] < -n)d > 0 ? f[0] = -n : f[0] = b;
                o[a] = f
            }
        }

        function v() {
            var a;
            k.fillStyle = l, k.clearRect(0, 0, b, c), k.beginPath();
            for (a = 0; a < m; a++)k.drawImage(i[o[a][2]], o[a][0], o[a][1]);
            k.fill(), u()
        }

        function w(a) {
            b = window.innerWidth, c = window.innerHeight, j !== undefined && (j.width = b, j.height = c, m = b * c / 6e3, l = k.createLinearGradient(0, 0, 0, c), t())
        }

        function x() {
            j = document.createElement("canvas"), j.style.position = "fixed", j.style.top = "0px", j.style.left = "0px", j.style.zIndex = 5e3, j.style.pointerEvents = "none", j.id = "canvas_snow", document.body.appendChild(j), k = j.getContext("2d"), k.strokeStyle = "none", d = s(), e = s(), f = s(), g = s(), h = s(), i = [d, e, f, g, h], y({
                canvas: d,
                width: n * .4,
                height: n * .4,
                color: "#FFF",
                soft: .05
            }), y({canvas: e, width: n * .5, height: n * .5, color: "#FFF", soft: .05}), y({
                canvas: f,
                width: n * .6,
                height: n * .6,
                color: "#FFF",
                soft: .3
            }), y({canvas: g, width: n * .8, height: n * .8, color: "#FFF", soft: .2}), y({
                canvas: h,
                width: n,
                height: n,
                color: "#FFF",
                soft: .05
            }), w(null), app.snowTimer = setInterval(function () {
                q(a.draw)
            }, 50)
        }

        function y(a) {
            var b, c, d, e, f, g, h, i, j;
            d = a.width || 30, e = a.height || 30, f = d / 2, g = e / 2, i = a.color || "#FFF", h = a.soft || 0, b = a.canvas, b.width = d, b.height = d, c = b.getContext("2d"), c.clearRect(0, 0, d, e), j = c.createRadialGradient(f, g, 0, f, g, f), j.addColorStop(0, i), j.addColorStop(.1, i), j.addColorStop(.85, z(i, h)), j.addColorStop(1, z(i, 0)), c.fillStyle = j, c.fillRect(0, 0, d, e)
        }

        function z(a, b) {
            var c, d, e;
            return a = a.replace(/^s*#|s*$/g, ""), a.length === 3 && (a = a.replace(/([0-9a-fA-F])/g, "$1$1")), d = parseInt(a.substr(2, 2), 16), e = parseInt(a.substr(4, 2), 16), c = parseInt(a.substr(0, 2), 16), "rgba(" + c + ", " + d + ", " + e + ", " + b + ")"
        }

        var b, c, d, e, f, g, h, i = [], j, k, l, m, n = 20, o = [], p = 0, q = function () {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (a) {
                    window.setTimeout(a, 62.5)
                }
        }();
        return {init: x, draw: v, resizeHandler: w}
    }();

    var days = ["12-30", "12-31", "1-1", "1-2", "1-3", "12-23", "12-24", "12-25", "12-26", "12-27"];
    var now = new Date(),
        date = now.getMonth() + 1 + "-" + now.getDate();
    for (var i = 0, l = days.length; i < l; i++) {
        if (date == days[i]) {
            flag = true;
        }
    }
    flag && a.init();
})();