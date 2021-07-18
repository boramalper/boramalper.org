function setup() {
    createCanvas(windowWidth, windowHeight);
    
    stroke(255, 255, 255);
    background(0, 0, 0);
    fill("black");
    
    points = createPoints();
    points.sort(function (a, b) {
        return a[1]-b[1];
    });
    triangles = Delaunay.triangulate(points);
    
    
    r = 140;
    sun_x = windowWidth/2;
    sun_y = windowHeight/6 - r/2 + Math.random() * r + 1/16 * windowHeight;
    window.setInterval(main, 900); 
}


function draw() {
    ellipse(sun_x, sun_y, r, r);
    
    var treshold = 8;
    for (var i = triangles.length; i; ) {
        --i;
        
        p0i = triangles[i];
        p1i = triangles[--i];
        p2i = triangles[--i];
        
        if (((p0i < treshold) + (p1i < treshold) + (p2i < treshold)) >= 2)
            continue;
        
        triangle(points[p0i][0], points[p0i][1],
                 points[p1i][0], points[p1i][1],
                 points[p2i][0], points[p2i][1]
        );
    }

    noLoop();
}

function main() {
    var a = windowHeight / 6;
    
    for (var i = 0; i < 5; ++i) {
        index = Math.trunc(Math.random() * points.length)
        points[index] = [Math.trunc(Math.random() * windowWidth * 5/4) - 1/8 * windowWidth,
                         points[index][1]
                        ];
    }
    
    points.sort(function (a, b) {
        return a[1]-b[1];
    });
    triangles = Delaunay.triangulate(points);
    
    clear();
    background(0, 0, 0);
    
    draw();
}


function createPoints() {
    var a = windowHeight / 6;
    var initial_ratio = 1/7;
    var end_ratio = 0.7;  // ratio to beginning
  
    var points = [];
  
    for (i = 1; i <= 5; ++i) {
        var count = windowWidth * initial_ratio * (1 / (6 - i)) * end_ratio;
        for (c = 1; c <= count; ++c) {
            points.push([Math.trunc(Math.random() * windowWidth * 5/4) - 1/8 * windowWidth,
                         Math.trunc((i * a) + Math.random() * a + 1/16 * windowHeight)
            ]);
        }
    }
    
    return points;
}

