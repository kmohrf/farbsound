Tracklist = function (rawData) {
	this.currentTrack = null;
	this.tracks = rawData.filter(function (element) {
		//TODO actual codec support would be awesome
		return element.ref && element.ref.match(/.*\.(mp3|ogg|opus)$/) !== null;
	});

	var coverArt = rawData.filter(function (element) {
		return element.ref && element.ref.match(/.*folder\.jpg$/) !== null;
	});

	if (coverArt.length > 0) {
		this.coverArt = coverArt[0].ref;

		for (var i = 0; i < this.tracks.length; i++) {
			this.tracks[i].coverArt = this.coverArt;
		}
	} else {
		this.coverArt = null;
	}

	this.controlFields = {
		track: "data-tracklist-trackId",
		action: "data-tracklist-action"
	};

	return this;
};

Tracklist.prototype = Object.create(EventDispatcher.prototype);

Tracklist.prototype.remove = function (id) {
	this.tracks[id] = null;

	return this;
};

Tracklist.prototype.getNext = function (id) {
	id = parseInt(id);

	if (parseInt(id) + 1 == this.tracks.length) return null;

	for (var i = id + 1; i < this.tracks.length; i++) {
		if (this.tracks[i] !== null) return {
			id: i,
			data: this.tracks[i]
		}
	}
};

Tracklist.prototype.getPrev = function (id) {
	id = parseInt(id);

	if (parseInt(id) - 1 == -1) return null;

	for (var i = id - 1; i >= 0; i--) {
		if (this.tracks[i] !== null) return {
			id: i,
			data: this.tracks[i]
		}
	}
};

Tracklist.prototype.setCurrent = function (id) {
	this.currentTrack = id;

	if (!!id) {
		var items = document.querySelectorAll("[" + this.controlFields.track + "]");

		for (var i = 0; i < items.length; i++) {
			if (items[i].getAttribute(this.controlFields.track) == id) {
				items[i].classList.add("active");
			} else {
				items[i].classList.remove("active");
			}
		}
	}
};

Tracklist.prototype.render = function (list) {
	var tracklist = this;
	list.innerHTML = "";

	this.tracks.forEach(function (track, index) {
		if (!track) return;

		var trackItem = document.createElement("li");
		var removeIcon = document.createElement("i");
		var title = document.createElement("span");

		removeIcon.setAttribute("class", "icon-remove");
		removeIcon.setAttribute(tracklist.controlFields.track, index);

		removeIcon.onclick = function (event) {
			tracklist.remove(this.getAttribute(tracklist.controlFields.track));
			this.parentNode.parentNode.removeChild(this.parentNode);
			event.stopPropagation();
		};

		title.setAttribute("class", "title");
		title.textContent = track.title;

		trackItem.setAttribute(tracklist.controlFields.track, index);
		trackItem.appendChild(removeIcon);
		trackItem.appendChild(title);

		trackItem.onclick = function (event) {
			var trackId = this.getAttribute(tracklist.controlFields.track);

			tracklist.dispatchEvent({
				type: "select",
				id: trackId,
				data: tracklist.tracks[trackId]
			});
		};

		list.appendChild(trackItem);
	});

	return this;
};
