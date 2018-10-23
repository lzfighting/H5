var $ = window.Zepto;
var root = window.player;
var index = 0;
var songList;
var $scope = $(document.body);
var audio = new root.audioControl();


function bindEvent() {
    $scope.on("play:change", function (event, index, flag) {
        audio.getAudio(songList[index].audio);
        if (audio.status == "play") {
            audio.play();
        }
        root.pro.renderAllTime(songList[index].duration)
        console.log(songList[index])
        root.render(songList[index]);
        root.pro.update(0);
    })
    $scope.on("click", ".prev-btn", function () {
        var index = controlManger.prev();
        $scope.trigger("play:change", index);
    })
    $scope.on("click", ".next-btn", function () {
        var index = controlManger.next();
        $scope.trigger("play:change", index);
    })
    $scope.on("click", ".play-btn", function () {
        if (audio.status == "play") {
            audio.pause();
            root.pro.stop();
        } else {
            audio.play();
            root.pro.start();
        }
        $(this).toggleClass("pause")
    })
}

//拖拽
function bindTouch() {
    var $slider = $scope.find('.slider-pointer');
    var offset = $scope.find('.pro-bottom').offset();
    var left = offset.left;
    var width = offset.width;

    $slider.on('touchstart', function () {
        root.pro.stop();


    }).on('touchmove', function (e) {

        var x = e.changedTouches[0].clientX;
        var per = (x - left) / width;
        if (per > 0 && per <= 1) {
            root.pro.update(per);
        }
    }).on('touchend', function (e) {
        var x = e.changedTouches[0].clientX;
        var per = (x - left) / width;
        if (per > 0 && per <= 1) {
            var curTime = per * songList[controlManger.index].duration;
            audio.playTo(curTime);
            $scope.find('.play-btn').addClass('pause');
            root.pro.start(per);
        }

    })
}

function getData(url) {
    $.ajax({
        type: "GET",
        url: url,
        success: function (data) {
            bindEvent();
            bindTouch();
            root.render(data[0])
            controlManger = new root.controlManger(data.length);
            songList = data;
            $scope.trigger("play:change", 0);
        },
        error: function () {
            console.log(data)
        }
    })
}
getData("../mock/data.json")