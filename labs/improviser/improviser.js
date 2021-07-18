// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#Examples
// Returns a random integer between min (included) and max (included)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
	var random = 4;

	if ("crypto" in window && "getRandomValues" in window.crypto) {
		var buf = new Uint8Array(1);
		window.crypto.getRandomValues(buf);
		return (buf[0] % (max - min + 1)) + min;
	}
	else {
		return Math.floor(random * (max - min + 1)) + min;
	}
}

var timeout = "none";
var voice = "none";

function create_voices(semitones) {
    var voices = [];

    for (var i = 0; i < semitones.length; ++i) {
        voices.push(new Beep.Voice(new Beep.Note(semitones[i])));
    }

    return voices;
}

function improvise(semitones, pause) {
	var voices = create_voices(semitones);
	play_random_note(voices, pause);
}

function play_random_note(voices, pause) {
	voice = voices[getRandomInt(0, voices.length - 1)];
	voice.play();

	timeout = window.setTimeout(pause_voice_and_continue, pause, play_random_note, voices, pause);
}


function pause_voice_and_continue(callback, arg1, arg2) {
	voice.pause();
	callback(arg1, arg2);
}

function stop_improvising() {
	window.clearTimeout(timeout);
	voice.pause();
}