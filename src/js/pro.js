//进度条
(function ($, root) {
    var $scope = $(document.body)
    var curDuration;
    var frameId;
    var startTime, lastPer = 0
    function renderAllTime(time) {

        curDuration = time
        time = formatTime(time);
        $scope.find(".all-timer").html(time);


    }
    function formatTime(t) {
        t = Math.round(t);
        var m = Math.floor(t / 60);
        var s = t - m * 60;
        if (m < 10) {
            m = '0' + m
        }
        if (s < 10) {
            s = '0' + s;
        }
        return m + ':' + s;

    }
    //开始时间
    function start(p) {
        lastPer = p == undefined ? lastPer : p;
        startTime = new Date().getTime();
        function frame() {
            var curTime = new Date().getTime();
            var percent = lastPer + (curTime - startTime) / (curDuration * 1000)
            if (percent <= 1) {
                update(percent)
                frameId = requestAnimationFrame(frame);
            } else {
                cancelAnimationFrame(frameId)
            }

        }
        frame();
    }

    function stop() {
        cancelAnimationFrame(frameId);
        var stopTime = new Date().getTime();
        lastPer = lastPer + (stopTime - startTime) / (curDuration * 1000)

    }
    //更新区域
    function update(per) {
        var curTime = curDuration * per;
        curTime = formatTime(curTime);
        $scope.find(".cur-time").html(curTime);
        var perX = (per - 1) * 100 + '%';
        $scope.find('.pro-top').css({
            transform: 'translate(' + perX + ')'
        })

    }
    root.pro = {
        renderAllTime: renderAllTime,
        start: start,
        stop: stop,
        update: update,
    }


})(window.Zepto, window.player || (window.player = {}))