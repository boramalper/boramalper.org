"use strict";


let MAGNIFICATION = 16;


let mainCanvas = document.querySelector("#main-canvas");
let mainCtx = mainCanvas.getContext("2d");
let mgCanvas = document.querySelector("#mg-canvas");
let mgCtx = mgCanvas.getContext("2d");


window.onload = function() {
    if (isMobile()) {
        window.alert("Mobile devices (including tablets) might suffer from the performance issues.");
    }

    mainCtx.imageSmoothingEnabled = false;
    mgCtx.imageSmoothingEnabled = false;

    mgCtx.fillStyle = "#121212";
    mgCanvas.style.width = mgCanvas.style.height = "100px";

    let text = "click here to choose an image";
    mainCtx.fillStyle = "white";
    mainCtx.font = "48px serif";

    let textWidth = mainCtx.measureText(text).width;

    mainCanvas.width = textWidth + 20;
    mainCanvas.style.width = mainCanvas.width + "px";

    mainCtx.fillStyle = "white";
    mainCtx.font = "48px serif";
    mainCtx.textBaseline = "middle";

    mainCtx.fillText(text, 10, mainCanvas.height / 2);
};


document.querySelector("#image-input").onchange = function() {
    let file   = document.querySelector("input[type=file]").files[0];
    let reader = new FileReader();
    window.image  = new Image();

    reader.onload =  function () {
        image.src = reader.result;
    };

    if (file) {
        reader.readAsDataURL(file);
    }

    image.onload = function () {
        let inv_aspect_ratio = image.naturalHeight / image.naturalWidth;

        mainCanvas.width  = window.innerWidth;
        mainCanvas.height = window.innerWidth * inv_aspect_ratio;

        mainCanvas.style.border = "0px";

        if (window.innerWidth < window.innerHeight) {
           mainCanvas.style.width  = window.innerWidth + "px";
           mainCanvas.style.height = window.innerWidth * inv_aspect_ratio + "px";
        }
        else {
            mainCanvas.style.height = window.innerHeight + "px";
            mainCanvas.style.width  = window.innerHeight * (1 / inv_aspect_ratio) + "px";
        }

        mainCtx.drawImage(image, 0, 0, mainCanvas.width, mainCanvas.height);
        pixelate();
    };

    if (document.querySelector("#pixelate-button").disabled) {
        document.querySelector("#pixelate-button").disabled = false;

        mainCanvas.addEventListener("mouseenter", mainCanvasMouseEnter);
        mainCanvas.addEventListener("mousemove", mainCanvasMouseMove);
        mainCanvas.addEventListener("mouseout", mainCanvasMouseOut);
        
        // Also for mgCanvas because sometimes mouse goes over the mgCanvas
        mgCanvas.addEventListener("mouseenter", mainCanvasMouseEnter);
        mgCanvas.addEventListener("mousemove", mainCanvasMouseMove);
        mgCanvas.addEventListener("mouseout", mainCanvasMouseOut);
    }
}


function pixelate() {
    let blockSize = document.querySelector("#block-size-input").value;
    let ratio = document.querySelector("#ratio-input").value;
    let superBlockSize = ratio * blockSize;

    mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
    mainCtx.drawImage(window.image, 0, 0, mainCanvas.width, mainCanvas.height);

    if (mainCanvas.height % superBlockSize != 0 || mainCanvas.width % superBlockSize != 0) {
        window.alert("There might be unprocessed parts");
    }

    for (let superY = 0; superY < mainCanvas.height - superBlockSize + 1; superY += superBlockSize) {
        for (let superX = 0; superX < mainCanvas.width - superBlockSize + 1; superX += superBlockSize) {
            let imageData = mainCtx.getImageData(superX, superY, superBlockSize, superBlockSize);
            let averageColor = getAverageColor(imageData);

            let primaries = [];

            // fill `primaries` array with equal amount of primary colors
            for (let i = 1; i <= ~~((ratio * ratio) / 3); ++i) {
                primaries.push("rgb(" + averageColor[0] + ", 0, 0)");
                primaries.push("rgb(0, " + averageColor[1] + ", 0)");
                primaries.push("rgb(0, 0, " + averageColor[2] + ")");
            }

            // Fill the rest with random primaries
            shuffleArray(primaries);
            for (let i = 0; i < (ratio * ratio) % 3; ++i) {
                primaries.push(primaries[i]);
            }

            shuffleArray(primaries);

            for (let y = 0; y < ratio; ++y) {
                for (let x = 0; x < ratio; ++x) {
                    mainCtx.fillStyle = primaries[y * ratio + x];
                    mainCtx.fillRect(superX + x * blockSize, superY + y * blockSize, blockSize, blockSize);
                }
            }
        }
    }

    mgCanvas.width = mgCanvas.height = superBlockSize * MAGNIFICATION;

    window.canvasImage = new Image();
    window.canvasImage.src = mainCanvas.toDataURL();

    mainCanvas.scrollIntoView({block: "start", behavior: "smooth"});
}


function mainCanvasMouseEnter() {
    let label = document.querySelector("label");
    mgCanvas.style.display = "block";
    label.style.cursor = "none";
}


function mainCanvasMouseMove(e) {
    mgCtx.fillRect(0, 0, mgCanvas.width, mgCanvas.height);

    let mainCanvasContainer = document.querySelector("#main-canvas-container");

    mgCtx.drawImage(window.canvasImage,
                    // Calculate the ratio of pointer position to the canvas container dimensions and multiply with the image's dimensions.
                    (e.pageX - mainCanvasContainer.offsetLeft) / mainCanvasContainer.offsetWidth * window.canvasImage.naturalWidth,
                    (e.pageY - mainCanvasContainer.offsetTop) / mainCanvasContainer.offsetHeight * window.canvasImage.naturalHeight,
                    mgCanvas.width / MAGNIFICATION,
                    mgCanvas.height / MAGNIFICATION,
                    0,
                    0,
                    mgCanvas.width,
                    mgCanvas.height
    );

    mgCanvas.style.top = e.pageY + 2 + "px";
    mgCanvas.style.left = e.pageX + 2 + "px";
}


function mainCanvasMouseOut() {
    let label = document.querySelector("label");
    mgCanvas.style.display = "none";
    label.style.cursor = "auto";
}


/*
 * The function `shuffleArray` below is taken from
 * http://stackoverflow.com/a/12646864
 */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    return array;
}


/*
 * The function `getAverageColor` below is derived from
 * http://stackoverflow.com/a/2541680
 */
function getAverageColor(imageData) {
    let data = imageData.data;
    let pixelCount = imageData.width * imageData.height;

    let r = 0, g = 0, b = 0; 

    for (let i = 0; i < pixelCount; i += 1) {
        r += data[4 * i + 0];
        g += data[4 * i + 1];
        b += data[4 * i + 2];
    }

    r = ~~(r / pixelCount);
    g = ~~(g / pixelCount);
    b = ~~(b / pixelCount);

    return [r, g, b];
}


document.querySelector("#pixelate-button").onclick = pixelate;


document.querySelector("#block-size-input").oninput = function() {
    let blockSizeInput = document.querySelector("#block-size-input");
    let blockSizeWarning = document.querySelector("#block-size-warning");
    let blockSize = document.querySelector("#block-size");

    if (blockSizeInput.value < 4) {
        blockSizeWarning.style = "opacity: 1;";
    }
    else {
        blockSizeWarning.style = "opacity: 0;";
    }

    blockSize.innerHTML = blockSizeInput.value;
}


document.querySelector("#ratio-input").oninput = function() {
    let ratioInput = document.querySelector("#ratio-input");
    let ratio = document.querySelector("#ratio");

    ratio.innerHTML = ratioInput.value;
};


/*
 * The function `isMobile` below is taken from
 * http://stackoverflow.com/a/11381730
 */
function isMobile() { 
    if(navigator.userAgent.match(/Android/i) ||
       navigator.userAgent.match(/webOS/i) ||
       navigator.userAgent.match(/iPhone/i) ||
       navigator.userAgent.match(/iPad/i) ||
       navigator.userAgent.match(/iPod/i) ||
       navigator.userAgent.match(/BlackBerry/i) ||
       navigator.userAgent.match(/Windows Phone/i)
    ){
        return true;
    }
    else {
        return false;
    }
}
