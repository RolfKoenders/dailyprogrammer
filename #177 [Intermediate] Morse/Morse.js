var MorseTable = {
	A: '.-', B: '-...', C: '-.-.', D: '-..',
    E: '.', F: '..-.', G: '--.', H: '....',
    I: '..', J: '.---', K: '-.-', L: '.-..',
    M: '--', N: '-.', O: '---', P: '.--.',
    Q: '--.-', R: '.-.', S: '...', T: '-',
	U: '..-', V: '...-', W: '.--', X: '-..-',
	Y: '-.--', Z: '--..', " ": "/"
};

var durations = {
    ".": 50,
    "-": 300,
    " ": 200,
    "/": 300
};

// for (var x = 0; x < input.length; x++) {
// 	var c = input.charAt(x);
// 	if (c == ' ') {
// 		output += '/';
// 		continue;
// 	}
// 	output += MorseTable[c.toUpperCase()];
// }

var context = new webkitAudioContext();

window.onload = function() {
    document.getElementById("translate").addEventListener("click", translateMorse);
    document.getElementById("listen").addEventListener("click", playMorse);
};

function translateMorse() {
    var inputText = document.getElementById("input").value.toLowerCase();
    var morseText = "";

    for (var i = 0; i < inputText.length; i++) {
        morseText += MorseTable[inputText[i].toUpperCase()] + " ";
    }

    document.getElementById("outputDiv").style.display = "block";
    document.getElementById("morse").innerHTML = morseText;
}

function playMorse() {
    var morseText = document.getElementById("morse").innerHTML;
    var playSequence = [];

    for (var i = 0; i < morseText.length; i++) {
        playSequence.push({
            duration: durations[morseText[i]],
            tone: (morseText[i] === '.' || morseText[i] === '-')
        });
    }

    playTone(playSequence, 0);
}

function playTone(sequence, index) {
    if (index < sequence.length) {
        var duration = sequence[index].duration;

        if (sequence[index].tone) {
            var oscillator = context.createOscillator();
            oscillator.type = 0;
            oscillator.frequency.value = 800;
            oscillator.connect(context.destination);
            oscillator.noteOn && oscillator.noteOn(0);

            setTimeout(function() {
                oscillator.noteOff(0);
                oscillator.disconnect();
                setTimeout(function() {
                    playTone(sequence, index + 1);
                }, 100);
            }, duration);
        } else {
            setTimeout(function() {
                playTone(sequence, index + 1);
            }, duration);
        }
    }
}
