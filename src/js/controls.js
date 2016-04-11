Controls = function (player, prev, play, next, seek) {
	this.player = player;
	this.prev = prev;
	this.togglePlay = play;
	this.seek = seek;
	this.next = next;

	var _this = this;

	document.addEventListener("mousemove", function (event) {
		_this.seek.style.left = event.x + "px";
	});

	this.seek.addEventListener("click", function (event) {
		_this.player.currentTime = event.x / window.innerWidth * _this.player.duration;
	});

	this.player.addEventListener("pause", function (event) {
		_this.togglePlay.classList.remove("active");
	});

	this.player.addEventListener("play", function (event) {
		_this.togglePlay.classList.add("active");
		_this.togglePlay.classList.remove("disabled");
	});

	this.player.addEventListener("ended", function (event) {
		_this.togglePlay.classList.add("disabled");
	});

	this.togglePlay.addEventListener("click", function (event) {
		if (this.classList.contains("disabled")) return;

		if (_this.player.paused) {
			_this.player.play();
		} else {
			_this.player.pause()
		}
	});

	this.prev.addEventListener("click", function (event) {
		_this.player.dispatchEvent(new CustomEvent("prev"));
	});

	this.next.addEventListener("click", function (event) {
		_this.player.dispatchEvent(new CustomEvent("next"));
	});
};
