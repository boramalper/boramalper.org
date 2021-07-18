function random() {
	if (window.crypto.getRandomValues) {
		var array = new Uint32Array(1);
		window.crypto.getRandomValues(array);

		return array[0] / 4294967295;
	}
	else {
		return Math.random();
	}
}

window.addEventListener('keydown', this.key_down, false);

function key_down(e) {
	switch(e.keyCode) {
		case 38:  // UP
			entropy_mode = false;
			radius += 1;
			break;
		case 40:  // DOWN
			entropy_mode = false;
			if (radius > 1)
				radius -= 1;
			break;
		case 65:  // 'A'LL
			entropy_mode = false;
			color_scheme = "a";
			break;
		case 82:  // 'R'ED
			entropy_mode = false;
			color_scheme = "r";
			break;
		case 71:  // 'G'REEN
			entropy_mode = false;
			color_scheme = "g";
			break;
		case 66:  // 'B'LUE
			entropy_mode = false;
			color_scheme = "b";
			break;
		case 69:  // 'E'NTROPY
			entropy_mode = true;
			break;

	}
}

function draw_circle(x, y, radius, color) {
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, 2 * Math.PI);
	ctx.closePath();
	ctx.fill();
}


function draw() {
	if (entropy_mode)
			this.radius = Math.ceil(random() * Math.min(ctx.canvas.width, ctx.canvas.height) / 16);
	
	iterations = 100 * 7 / this.radius;

		for (i=0; i < 100; ++i) {
			if (this.color_scheme == "a")
				color = "rgb(" + Math.ceil(random() * 255) + ", " + Math.ceil(random() * 255) + ", " + Math.ceil(random() * 255) + ")";
			else if (this.color_scheme == "r")
				color = "rgb(" + Math.ceil(random() * 200) + ", 0, 0)";
			else if (this.color_scheme == "g")
				color = "rgb(0, " + Math.ceil(random() * 225) + ", 0)";
			else if (this.color_scheme == "b")
				color = "rgb(0, 0, " + Math.ceil(random() * 200) + ")";
			else
				throw new Error("Wrong color option");

			draw_circle(random() * ctx.canvas.width,
				        random() * ctx.canvas.height,
				        this.radius,
				        color);

			draw_overlay();
	}
}

function draw_overlay() {
	ctx.fillStyle = "white";

	ctx.font = "48px Helvetica";
	ctx.fillText("l'entropie pointilliste", 10, 50);
	
	ctx.font = "30px Helvetica";
	ctx.fillText("of Bora", 10, 50 + 25);

	ctx.font = "14px Helvetica";
	ctx.fillText("Up, Down, [R] ed, [G] reen, [B] lue; and [E] for entropy", ctx.canvas.width - txtmsr.width, ctx.canvas.height - 20);
}


window.onload = function main() {
	this.radius = 7;
	this.color_scheme = "a";
	this.entropy_mode = false;

	window.c = document.getElementById("canvas");
	window.ctx = c.getContext("2d");

	ctx.font = "14px Helvetica";
	txtmsr = ctx.measureText("Up, Down, [R] ed, [G] reen, [B] lue; and [E] for entropy");

	// Resize the canvas to fit the window
	ctx.canvas.width  = window.innerWidth;
	ctx.canvas.height = window.innerHeight;

	window.setInterval(draw, 70);
}

