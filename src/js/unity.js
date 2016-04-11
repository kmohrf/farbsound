UnityPlugin = function (player) {
	try {
		this.unity = external.getUnityObject(1.0);
	} catch (e) {
		return false;
	}

	var _this = this;
	this.player = player;
	this.unity.init({
		name: "farbsound",
		iconUrl: location.origin + "/assets/img/logo.png",
		onInit: function () {
			_this.ready();
		}
	});

	return this;
};

UnityPlugin.prototype.ready = function () {
	var _this = this;

	this.unity.MediaPlayer.onNext(function () {
		_this.player.dispatchEvent(new CustomEvent("next"));
	});

	this.unity.MediaPlayer.onPrevious(function () {
		_this.player.dispatchEvent(new CustomEvent("prev"));
	});

	this.unity.MediaPlayer.onPlayPause(function () {
		if (_this.player.paused) {
			_this.player.play();
		} else {
			_this.player.pause()
		}
	});

	this.player.addEventListener("pause", function (event) {
		// QUESTION this should use the UnityPlaybackState enumeration, but I cannot the declaration for it
		// playback state values taken from constants UNITY_PLAYBACK_STATE_PLAYING and UNITY_PLAYBACK_STATE_PAUSED
		// source: https://github.com/nightingale-media-player/nightingale-hacking/pull/165/files
		_this.unity.MediaPlayer.setPlaybackState(1);
	});

	this.player.addEventListener("play", function (event) {
		//QUESTION see eventlistener for player.pause
		_this.unity.MediaPlayer.setPlaybackState(0);
	});

	this.player.addEventListener("track", function (event) {
		_this.unity.MediaPlayer.setTrack({
			title: event.detail.data.title,
			artLocation: event.detail.data.coverArt
		});
	});
};
