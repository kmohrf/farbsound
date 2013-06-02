Player = function (player, tracklist) {
	this.tracklist = tracklist;
	this.player = player;
	this.controlFields = {
		currentTrack: "data-player-current-trackId"
	};

	var _this = this;
	var nextHandler = function (event) {
		var track = _this.tracklist.getNext(_this.player.getAttribute(_this.controlFields.currentTrack));
		_this.playTrack(track);
	};

	this.player.addEventListener("ended", nextHandler);
	this.player.addEventListener("next", nextHandler);

	this.tracklist.addEventListener("select", function (track) {
		_this.playTrack(track);
	});

	this.player.addEventListener("prev", function (event) {
		var track = _this.tracklist.getPrev(_this.player.getAttribute(_this.controlFields.currentTrack));
		_this.playTrack(track);
	});
};

Player.prototype.playTrack = function (track) {
	this.tracklist.setCurrent(track ? track.id : track);

	if (track === null) return;

	this.player.setAttribute(this.controlFields.currentTrack, track.id);
	this.player.setAttribute("src", track.data.ref);
	this.player.play();

	return this;
};
