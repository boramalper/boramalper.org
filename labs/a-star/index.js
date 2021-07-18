// ASTAR
var heuristic;
var startLoc, goalLoc;
var openSet, closedSet;
var cameFrom;
var gScore, fScore;

var found;
var started = false;
var iterations;

var canvas = document.getElementsByTagName("canvas")[0];
var ctx = canvas.getContext("2d");

var startBtn = document.getElementById("start");
var stopBtn = document.getElementById("stop");
var stepsIn = document.getElementById("steps");
var stepBtn = document.getElementById("step");
var finishBtn = document.getElementById("finish");
var resetBtn = document.getElementById("reset");

var LINE_WIDTH = 1;
var LENGTH = 24;
var WEIGHTS = {D: 10, L: 20, M: 40, H: 60, S: 10, G: 10};

var width = undefined;
var height = undefined;

var tiles = undefined;

var mouseDown = 0;
var startSelected = false;
var goalSelected = false;


document.body.onmousedown = function(evt) {
    if (evt.button !== 0)
        return;
   
    ++mouseDown;

    var canvasXY = client2canvas(evt.clientX, evt.clientY);
    var canvasX = canvasXY[0];
    var canvasY = canvasXY[1];
    
    // LINE_WIDTH / 2 + x * (LENGTH + LINE_WIDTH),
    if (LINE_WIDTH / 2 + (startLoc.x + 1) * (LENGTH + LINE_WIDTH) >= canvasX
        && canvasX >= LINE_WIDTH / 2 + startLoc.x * (LENGTH + LINE_WIDTH)
        && LINE_WIDTH / 2 + (startLoc.y + 1) * (LENGTH + LINE_WIDTH) >= canvasY
        && canvasY >= LINE_WIDTH / 2 + startLoc.y * (LENGTH + LINE_WIDTH)
    ) {
        startSelected = true;
    }
    else if (LINE_WIDTH / 2 + (goalLoc.x + 1) * (LENGTH + LINE_WIDTH) >= canvasX
             && canvasX >= LINE_WIDTH / 2 + goalLoc.x * (LENGTH + LINE_WIDTH)
             && LINE_WIDTH / 2 + (goalLoc.y + 1) * (LENGTH + LINE_WIDTH) >= canvasY
             && canvasY >= LINE_WIDTH / 2 + goalLoc.y * (LENGTH + LINE_WIDTH)
    ) {
        goalSelected = true;
    }
}


document.body.onmouseup = function(evt) {
    if (evt.button !== 0)
        return;
    
    --mouseDown;
    startSelected = false;
    goalSelected = false;
}


canvas.onmousemove = function(evt) {
    if (!started && mouseDown) {
        changeTile(locateTile(evt.clientX, evt.clientY));
        redrawCanvas();
    }
}


canvas.onclick = function(evt) {
    if (!started) {
        changeTile(locateTile(evt.clientX, evt.clientY));
        redrawCanvas();
    }
}


function reset_onClick() {
    mouseDown = 0;
    clearTiles();
    redrawCanvas();
}


function start_onClick() {
    startBtn.disabled = true;
    stopBtn.disabled = false;
    stepBtn.disabled = false;
    finishBtn.disabled = false;
    resetBtn.disabled = true;

    for (let x of document.querySelectorAll('div#controller input[type="radio"]'))
        x.disabled = true;

    canvas.style.cursor = "not-allowed";
    
    started = true;
    aStar_initialize();
}


function stop_onClick() {
    startBtn.disabled = false;
    stopBtn.disabled = true;
    stepBtn.disabled = true;
    finishBtn.disabled = true;
    resetBtn.disabled = false;

    for (let x of document.querySelectorAll('div#controller input[type="radio"]'))
        x.disabled = false;

    canvas.style.cursor = "auto";

    var iterationsSpan = document.getElementById("iterations");
    var costSpan = document.getElementById("cost");
    
    iterationsSpan.innerHTML = 0;
    costSpan.innerHTML = 0;
    
    started = false;
    redrawCanvas();
}

function step_onClick() {
    for (let i=1; !found && openSet.size && i <= stepsIn.value; ++i)
        aStar_iterate();
}

function finish_onClick() {
    while (!found && openSet.size)
        aStar_iterate();
}


function main() {
    if (!canvas.getContext) {
        console.log("FATAL ERROR: canvas is unsupported.");
        return;
    }

    width = Math.trunc(canvas.clientWidth / (LENGTH + LINE_WIDTH));
    height = Math.trunc(canvas.clientHeight / (LENGTH + LINE_WIDTH));
    
    canvas.width = width * (LENGTH + LINE_WIDTH);
    canvas.height = height * (LENGTH + LINE_WIDTH);
    
    tiles = [];
    for (let y=1; y <= height; ++y) {
        let tmp = [];
        for (let x=1; x <= width; ++x)
            tmp.push({type: "D", status: "unexplored"});
        tiles.push(tmp);
    }
    
    startLoc = {y: Math.trunc(height / 2), x: Math.trunc(width / 3)};
    goalLoc = {y: Math.trunc(height / 2), x: Math.trunc(width * 2 / 3)};
    
    tiles[startLoc.y][startLoc.x].type = "S";
    tiles[goalLoc.y][goalLoc.x].type = "G";
    
    redrawCanvas();
}


// location to string
function locTOs(loc) {
    return loc.x + ", " + loc.y;
}

// string to location
function sTOloc(str) {
    let t = str.split(", ");
    return {x: parseInt(t[0], 10), y: parseInt(t[1], 10)};
}

function aStar_initialize() {
    for (let y=0; y < height; ++y) {
        for (let x=0; x < width; ++x) {
            if (tiles[y][x].type === "S")
                startLoc = {x: x, y: y};
            else if (tiles[y][x].type === "G")
                goalLoc = {x: x, y: y};
        }
    }
    
    found = false;
    iterations = 0;
    cellsNum = 0;
    
    heuristic = document.querySelector("input[name=\"heuristic\"]:checked").getAttribute("value");
    
    // The set of tiles already evaluated
    closedSet = new Set();
    // The set of currently discovered nodes still to be evaluated. Also known
    // as "frontier".
    openSet = new Set();
    
    // For each node, which node it can most efficiently be reached from.
    // If a node can be reached from many nodes, cameFrom will eventually
    // contain the most efficient previous step.
    cameFrom = {};
    
    // Initially, only the start node is known.
    openSet.add(locTOs(startLoc));
    
    // For each node, the cost of getting from start node to that node.
    // Default value: Infinity
    gScore = {};
    // For each node, the total cost of getting from start node to the goal by
    // passing that node. The value is partly known, partly heuristic.
    // Default value: Infinity
    fScore = {};
    
    // The cost of going from start to start is zero.
    gScore[locTOs(startLoc)] = 0;
    // For the first node, fScore is completely heuristic.
    fScore[locTOs(startLoc)] = estimate(startLoc);
}

function aStar_iterate() {
    if (!openSet.size && !found)
        return;
    
    ++iterations;
    
    // Get a tile from the frontier having the lowest fScore value
    let lowest = undefined;
    for (let tileS of openSet.entries()) {
        t = tileS[0];
        
        if (fScore[t] < (fScore[lowest] === undefined ? Infinity : fScore[lowest]))
            lowest = t;
    }

    let currentLoc = sTOloc(lowest);
    openSet.delete(lowest);
    closedSet.add(lowest);
    
    // Check if current tile is the goal
    if (currentLoc.x === goalLoc.x && currentLoc.y === goalLoc.y) {
        found = true;
        stepBtn.disabled = true;
        finishBtn.disabled = true;
        
        reconstruct_path(currentLoc);
    }
    
    
    ctx.fillStyle = "rgba(0, 255, 0, 0.3)";
    ctx.fillRect(LINE_WIDTH / 2 + currentLoc.x * (LENGTH + LINE_WIDTH),
                 LINE_WIDTH / 2 + currentLoc.y * (LENGTH + LINE_WIDTH),
                 LENGTH,
                 LENGTH);
    
    let neighbors = getNeighbors(currentLoc);
    for (let neighborLoc of neighbors) {
        // Ignore the neighbor which is already evaluated.
        if (closedSet.has(locTOs(neighborLoc)))
            continue;

        // The distance from start to the neighbor
        let tentative_gScore = gScore[locTOs(currentLoc)] + calculateCost(currentLoc, neighborLoc);
        
        if (!openSet.has(locTOs(neighborLoc))) {  // neighborLoc not in openSet
            openSet.add(locTOs(neighborLoc));  // Discover a new node

            ctx.fillStyle = "rgba(255, 0, 0, 0.3)";
            ctx.fillRect(LINE_WIDTH / 2 + neighborLoc.x * (LENGTH + LINE_WIDTH),
                         LINE_WIDTH / 2 + neighborLoc.y * (LENGTH + LINE_WIDTH),
                         LENGTH,
                         LENGTH);
        }
        else if (tentative_gScore >= gScore[locTOs(neighborLoc)]) {
            continue;  // This is not a better path.
        }
        
        // This path is the best until now. Record it.
        cameFrom[locTOs(neighborLoc)] = currentLoc;
        gScore[locTOs(neighborLoc)] = tentative_gScore;
        fScore[locTOs(neighborLoc)] = gScore[locTOs(neighborLoc)] + estimate(neighborLoc);
    }
    
    var iterationsSpan = document.getElementById("iterations");
    
    iterationsSpan.innerHTML = iterations;
}


function estimate(fromLoc) {
    let res;
    
    if (heuristic === "chebyshev")
        res = chebyshev(fromLoc);
    if (heuristic === "euclidean")
        res = euclidean(fromLoc);
    if (heuristic === "manhattan")
        res = manhattan(fromLoc);
    if (heuristic === "octile")
        res = octile(fromLoc);
    
    return res * WEIGHTS.D;
}


function reconstruct_path(toLoc) {
    let total_path = [toLoc];
    let totalCost = 0;
    
    let currentLoc = toLoc;
    while (locTOs(currentLoc) in cameFrom) {
        if (cameFrom[locTOs(currentLoc)])
            totalCost += calculateCost(currentLoc, cameFrom[locTOs(currentLoc)]);
        
        currentLoc = cameFrom[locTOs(currentLoc)];
        total_path.push(currentLoc);
    }
    
    var costSpan = document.getElementById("cost");
    costSpan.innerHTML = Math.trunc(totalCost, 2);
    
    total_path.reverse();
    
    ctx.strokeStyle = "yellow";
    ctx.lineWidth = LINE_WIDTH * 4;
    for (let i=0; i < total_path.length - 1; ++i) {
        let from_ = total_path[i];
        let to = total_path[i + 1];
        
        ctx.beginPath();
        ctx.moveTo(LINE_WIDTH / 2 + from_.x * (LENGTH + LINE_WIDTH) + LENGTH / 2,
                   LINE_WIDTH / 2 + from_.y * (LENGTH + LINE_WIDTH) + LENGTH / 2);
        ctx.lineTo(LINE_WIDTH / 2 + to.x * (LENGTH + LINE_WIDTH) + LENGTH / 2,
                   LINE_WIDTH / 2 + to.y * (LENGTH + LINE_WIDTH) + LENGTH / 2);
        ctx.stroke();
    }
}


function getNeighbors(tileLoc) {
    let neighbors = [];
    let x = tileLoc.x;
    let y = tileLoc.y;
    

    if (tileLoc.y > 0 && tiles[y-1][x].type !== "B")
        neighbors.push({x: x, y: y - 1})
    
    if (tileLoc.y < height - 1 && tiles[y+1][x].type !== "B")
        neighbors.push({x: x, y: y + 1})
    
    if (tileLoc.x > 0 && tiles[y][x-1].type !== "B")
        neighbors.push({x: x - 1, y: y })
    
    if (tileLoc.x < width - 1 && tiles[y][x+1].type !== "B")
        neighbors.push({x: x + 1, y: y})
    
    
    if (tileLoc.y > 0 && tileLoc.x > 0 && tiles[y-1][x-1].type !== "B")
        neighbors.push({x: x - 1, y: y - 1});
    
    if (tileLoc.y < height - 1 && tileLoc.x > 0 && tiles[y+1][x-1].type !== "B")
        neighbors.push({x: x - 1, y: y + 1});
    
    if (tileLoc.y > 0 && tileLoc.x < width - 1 && tiles[y-1][x+1].type !== "B")
        neighbors.push({x: x + 1, y: y - 1});
    
    if (tileLoc.y < height - 1 && tileLoc.x < width - 1 && tiles[y+1][x+1].type !== "B")
        neighbors.push({x: x + 1, y: y + 1});
    
    return neighbors;
}


function calculateCost(a, b) {
    let cost = (WEIGHTS[tiles[a.y][a.x].type] + WEIGHTS[tiles[b.y][b.x].type]) / 2;
    
    // Diagonal
    if (Math.abs(a.y - b.y) + Math.abs(a.x - b.x) === 2)
        cost *= Math.sqrt(2);
    
    return cost;
}


function clearTiles() {
    for (var y=0; y < height; ++y)
        for (var x=0; x < width; ++x) {
            if (tiles[y][x].type !== "S" && tiles[y][x].type !== "G")
                tiles[y][x] = {type: "D", status: "unexplored"};
        }
}


function locateTile(clientX, clientY) {
    var canvasXY = client2canvas(clientX, clientY);
    var canvasX = canvasXY[0];
    var canvasY = canvasXY[1];

    return {x: Math.trunc((canvasX - LINE_WIDTH / 2) / (LENGTH + LINE_WIDTH)),
            y: Math.trunc((canvasY - LINE_WIDTH / 2) / (LENGTH + LINE_WIDTH))};
}


// Converts mouse event's client coordinates to canvas coordinates!
function client2canvas(clientX, clientY) {
    var rect = canvas.getBoundingClientRect();
    var canvasX = (clientX - rect.left) / rect.width * canvas.width;
    var canvasY = (clientY - rect.top) / rect.height * canvas.height;

    return [canvasX, canvasY];
}


function changeTile(location) {
    var x = location.x;
    var y = location.y;
    
    if (startSelected) {
        tiles[startLoc.y][startLoc.x].type = "D";
        startLoc = location;
        tiles[startLoc.y][startLoc.x].type = "S";
        return;
    }
    
    if (goalSelected) {
        tiles[goalLoc.y][goalLoc.x].type = "D";
        goalLoc = location;
        tiles[goalLoc.y][goalLoc.x].type = "G";
        return;
    }
    
    if (tiles[y][x].type === "S" || tiles[y][x].type === "G")
        return;

    var type = document.querySelector("input[name=\"tiles\"]:checked").getAttribute("value");
    tiles[y][x].type = type;
}


function redrawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.strokeStyle = "black";
    ctx.lineWidth = LINE_WIDTH;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "14px serif";

    for (var y=0; y < height; ++y) {
        for (var x=0; x < width; ++x) {
            var tile = tiles[y][x];
            
            if (tile.status === "unexplored")
                ctx.strokeRect(LINE_WIDTH / 2 + x * (LENGTH + LINE_WIDTH),
                               LINE_WIDTH / 2 + y * (LENGTH + LINE_WIDTH),
                               LENGTH,
                               LENGTH);

            var colorMappings = {S: "green",  // Start
                                 G: "red",  // Goal
                                 D: "white",  // Default friction
                                 L: "rgb(80, 80, 255)",  // Low friction
                                 M: "rgb(20, 20, 150)",  // Medium friction
                                 H: "rgb(0, 0, 70)",  // High friction
                                 B: "rgb(10, 10, 10)",  // Blocked tile
            };
            if (tile.type !== "D") {
                ctx.fillStyle = colorMappings[tile.type];
                ctx.fillRect(LINE_WIDTH / 2 + x * (LENGTH + LINE_WIDTH),
                             LINE_WIDTH / 2 + y * (LENGTH + LINE_WIDTH),
                             LENGTH,
                             LENGTH);
            }
        }
    }
}


function chebyshev(fromLoc) {
    return Math.max(Math.abs(fromLoc.x - goalLoc.x), Math.abs(fromLoc.y - goalLoc.y));
}


function euclidean(fromLoc) {
    return Math.sqrt(Math.pow(fromLoc.x - goalLoc.x, 2) + Math.pow(fromLoc.y - goalLoc.y, 2));
}


// KANKS DIAGONAL MOVEMENT VARSA MANHATTAN ADMISSIBLE DEĞIL
function manhattan(fromLoc) {
    return Math.abs(fromLoc.x - goalLoc.x) + Math.abs(fromLoc.y - goalLoc.y);
}


function octile(fromLoc) {
    let dx = Math.abs(fromLoc.x - goalLoc.x);
    let dy = Math.abs(fromLoc.y - goalLoc.y);
    
    return (dx + dy) + (Math.sqrt(2) - 2) * Math.min(dx, dy); 
}


main();