Progress = function(player, elapsed, total, meter) {
    this.player = player;
    this.elapsed = elapsed;
    this.total = total;
    this.meter = meter;

    var _this = this;

    this.player.addEventListener("timeupdate", function(event) {
        function renderTime(seconds) {
            var _minutes = Math.floor(seconds / 60);
            var _seconds = Math.floor(seconds - _minutes * 60);

            _minutes = _minutes < 10 ? "0" + _minutes : _minutes;
            _seconds = _seconds < 10 ? "0" + _seconds : _seconds;

            return _minutes + ":" + _seconds;
        }

        var elapsed = event.target.currentTime;
        var total = event.target.duration;

        _this.elapsed.textContent = renderTime(elapsed);
        _this.total.textContent = renderTime(total);
        _this.meter.setAttribute("style", "width: " + (elapsed / total * 100) + "%");
    });

    this.player.addEventListener("ended", function(event) {
        _this.elapsed.textContent = "";
        _this.total.textContent = "";
        _this.meter.setAttribute("style", "width: 0");
    });
};
