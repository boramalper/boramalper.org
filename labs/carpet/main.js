var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    width = w.innerWidth || e.clientWidth || g.clientWidth,
    height = w.innerHeight|| e.clientHeight|| g.clientHeight;

var canvas = document.querySelector("canvas"),
    ctx = canvas.getContext("2d", { alpha: false });  // turn transparency off for speed

var nIterations = 5;

canvas.style.width = min(height, width) + "px";
canvas.style.height = min(height, width) + "px";
ctx.imageSmoothingEnabled = false;

function min(a, b) { return a < b ? a : b; }

function append(tallRow, submatrix) {
    if (tallRow.length === 0) {
        return submatrix.slice();
    }

    if (tallRow.length !== submatrix.length) {
        throw new Error("incompatible sizes");
    }

    for (var row = 0; row < tallRow.length; row++) {
        tallRow[row] = tallRow[row].concat(submatrix[row]);
    }

    return tallRow;
}

function rule(cell) {
    return cell ? window.markedRule : window.unmarkedRule;
}

function paint(matrix) {
    var dim = matrix.length;

    var size = Math.floor(min(width, height) / dim) * window.devicePixelRatio;

    if (size < 1) {
        throw new Error("size < 1")
    }

    canvas.width = size * dim;
    canvas.height = size * dim;

    var invertColours = window.invertColours;

    ctx.fillStyle = invertColours ? "black" : "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = invertColours ? "white" : "black";

    for (var row = 0; row < dim; row++) {
        for (var col = 0; col < dim; col++) {
            var cell = matrix[row][col];

            if (cell) {
                ctx.fillRect(col * size, row * size, size, size);
            }
        }
    }
}

function next(matrix) {
    var newMatrix = [];

    for (var row = 0; row < matrix.length; row++) {
        var tallRow = [];

        for (var col = 0; col < matrix[row].length; col++) {
            var subMatrix = rule(matrix[row][col]);
            tallRow = append(tallRow, subMatrix);
        }

        newMatrix = newMatrix.concat(tallRow);
    }

    return newMatrix
}

function animate(matrices, i) {
    if (i > nIterations) {
        return;
    }

    paint(matrices[i]);

    window.timeoutID = setTimeout(animate, 1000, matrices, i + 1);
}

function parse(str) {
    var x = str
        .replace(/ +/g, ' ')
        .split("\n")
        .map(x => x.split(" ").map(x => parseInt(x)));

    if (x.length === 0) {
        alert("Empty matrix or unknown parsing error!");
        return null;
    }

    for (var r = 0; r < x.length; r++) {
        if (x[r].length !== x[0].length) {
            alert("Rules must be square matrices!");
            return null;
        }
    }

    return x;
}

function main() {
    clearTimeout(window.timeoutID);

    var matrices = [];

    var select = document.querySelector("select");
    if (select.options[select.selectedIndex].value === "marked") {
        matrices.push([[1]]);
    } else {
        matrices.push([[0]]);
    }

    window.invertColours = document.querySelector('input[type="checkbox"]').checked;

    window.markedRule = parse(document.querySelector("#markedRule").value);
    window.unmarkedRule = parse(document.querySelector("#unmarkedRule").value);

    // Calculate *all* iterations before the animation
    // because the calculations take some time...
    for (var i = 0; i <= nIterations; i++) {
        matrices.push(next(matrices[i]));
    }

    animate(matrices, 0);
}

main();
