"use strict";

var markov_chain = undefined;
var similarities = undefined;


window.onload = function main() {
    loadJSON("markov_chain.json",
        function(data) {markov_chain = data;}
    );

    loadJSON("similarities.json",
        function(data) {window.similarities = data;}
    );

    refresh_sonnet();
}

document.getElementById("new").onclick = refresh_sonnet;

function refresh_sonnet() {
    var paper_div = document.getElementById("paper");
    paper_div.innerHTML = generate_sonnet();
}


function generate_sonnet() {
    var A = randomProperty(similarities);
    var B = randomProperty(similarities);
    var C = randomProperty(similarities);
    var D = randomProperty(similarities);
    var E = randomProperty(similarities);
    var F = randomProperty(similarities);
    var Z = randomProperty(similarities);

    var lines = [generate_line(A),
                 generate_line(B),
                 generate_line(similarities_random(A)),
                 generate_line(similarities_random(B)),
                 generate_line(C),
                 generate_line(D),
                 generate_line(similarities_random(C)),
                 generate_line(similarities_random(D)),
                 generate_line(E),
                 generate_line(F),
                 generate_line(similarities_random(E)),
                 generate_line(similarities_random(F)),
                 "&nbsp;&nbsp;&nbsp;&nbsp;" + generate_line(Z),
                 "&nbsp;&nbsp;&nbsp;&nbsp;" + generate_line(similarities_random(Z))
    ];

    var sonnet = "";

    for (var line of lines) {
        sonnet += line + "<br>"
    }

    return sonnet;
}


function generate_line(final_word) {
    var line = final_word;
    var last_word = final_word;  // last_word we chose from the markov chain, do not confuse with final_word which is
                                 // the final word of the line.

    var word_count;
    for (word_count = 1 ;; word_count += 1) {
        if (word_count >= 5 && can_end(last_word)) {
            break;
        }
        else {
            last_word = markov_random(last_word);
            if (last_word === false || last_word === "ENDendENDend")
                break;

            line = last_word + " " + line;
        }
    }

    if (word_count > 10)
        return generate_line(final_word);

    return line;
}


function can_end(word) {
    for (var item in markov_chain[word]) {
        if (item[0] === "ENDendENDend")
            return true;
    }

    return false;
}


function markov_random(word) {
    if (markov_chain[word] === undefined)  // reached end
        return false;

    var rand = Math.random();
    var from_ = 0;
    for (var entry of markov_chain[word]) {
        if (rand > from_ && rand < from_ + entry[1])
            return entry[0];
        
        from_ += entry[1];
    }

    // we should never ever reach this point, "technically"
    // but since floating point math is messy, var's leave this here as a safety net, "just in case"


    return random_element(markov_chain[word])[0];
}


function similarities_random(word) {
    return random_element(similarities[word])[0];
}


function random_element(array) {
    return array[Math.floor(Math.random() * array.length)];
}


// Copyright (C) 2013  Drew Noakes
// Source: http://stackoverflow.com/a/18278346/4466589
function loadJSON(path, success, error)
{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success)
                    success(JSON.parse(xhr.responseText));
            } else {
                if (error)
                    error(xhr);
            }
        }
    };
    xhr.open("GET", path, false);
    xhr.send();
}


// Copyright (C) 2013  Lawrence Whiteside
// Source: http://stackoverflow.com/a/15106541/4466589
function randomProperty(obj) {
    var keys = Object.keys(obj);
    return keys[keys.length * Math.random() << 0];
};