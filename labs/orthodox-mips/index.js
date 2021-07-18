"use strict";

/* Copyright (c) 2018 Mert Bora ALPER <bora@boramalper.org>
 *
 * Permission to use, copy, modify, and/or distribute this software for any purpose
 * with or without fee is hereby granted, provided that the above copyright notice
 * and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
 * REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
 * FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
 * INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS
 * OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER
 * TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF
 * THIS SOFTWARE.
 */

const instructionRE = /^([\t ]+)([a-z](?:[\t ]*[^ \t#\n])*)(.*)$/gm;
var   sourceCode = null;
let   instructions = [];
let   signatures   = new Set();
let   isSignatureValid = {};


function highlightCode() {
        let codeElem = document.getElementById("code");
        codeElem.innerHTML = sourceCode.replace(instructionRE, "$1<mark>$2</mark>$3");
        hljs.highlightBlock(codeElem);
};


function onFileChange() {
        let file = document.getElementById("sourceFile").files[0];
        if (file) {
            let reader = new FileReader();
            reader.readAsText(file, "UTF-8");

            reader.onloadend = function (evt) {
                sourceCode = evt.target.result;
                instructions = [];  // Empty array.
                parse();
                validate();
                updateView();

            }
            reader.onerror = function (evt) {
                alert("Error reading file! See the console for details...");
                console.log("Error reading file!", evt);
            }
        }
}


function updateView() {
        document.getElementById("code").innerHTML = sourceCode;
        highlightCode();

        let ul = document.getElementById("signatures");
        ul.innerHTML = "";
        for (let sign of signatures) {
                let li = document.createElement("li");
                let innerHTML = ""

                if (!isSignatureValid[sign])
                        innerHTML += '<span id="invalid">';

                innerHTML += sign;

                if (!isSignatureValid[sign])
                        innerHTML += '</span>';

                li.innerHTML = innerHTML;
                ul.appendChild(li);
        }
}


function parse() {
        // For each match...
        sourceCode.replace(instructionRE, function(match, g1, g2, g3) {
                // Split by spaces, and get rid of empty strings, and get rid of trailing commas.
                let tokens = g2
                        .split(" ")
                        .filter(n => n)
                        .map(x => x[x.length - 1] === "," ? x.slice(0, x.length - 1) : x)
                ;
                let signatureTail = tokens.slice(1, tokens.length).map(t => type(t));

                instructions.push({
                        instruction: g2,
                        instructionName: tokens[0],
                        signature: [tokens[0]].concat(signatureTail),
                        signatureText: (tokens[0] + " " + signatureTail.join(", ")).trim(),
                });
                signatures = new Set(instructions.map(i => i.signatureText));
        });
}


// Determine the type of a token
function type(token) {
        const registerRE      = "\\$(?:(?:zero)|0|[a-z].{1,2})";
        const immediateRE     = "[+-]?(?:(?:0x)|[0-9]|\\').*";
        const labelRE         = "[a-zA-Z].*";
        const addrRegRE       = "\\(" + registerRE + "\\)";
        const addrImmRegRE    = immediateRE + " *" + addrRegRE;
        const addrLabImmRE    = labelRE + " *[+-] *" + immediateRE;
        const addrLabRegRE    = labelRE + "\\(" + registerRE + "\\)";
        const addrLabImmRegRE = addrLabImmRE + " *" + addrRegRE;

        // Order matters!
        const rules = {
                "Alir": RegExp("^" + addrLabImmRegRE + "$"),
                "Ali" : RegExp("^" + addrLabImmRE + "$"),
                "Alr" : RegExp("^" + addrLabRegRE + "$"),
                "Air" : RegExp("^" + addrImmRegRE + "$"),
                "Ar"  : RegExp("^" + addrRegRE + "$"),
                "R"   : RegExp("^" + registerRE + "$"),
                "I"   : RegExp("^" + immediateRE + "$"),
                "L"   : RegExp("^" + labelRE + "$")
        };

        for (let ruleID in rules) {
                if (rules[ruleID].test(token)) {
                        return ruleID;
                }
        }

        alert("unknown type of token: `" + token + "`");
        return "UNKNOWN";
}


function validate() {
        const validSignatures = [
                "abs R, R",
                "add R, R, R",
                "addu R, R, R",
                "addi R, R, I",
                "addiu R, R, I",
                "and R, R, R",
                "andi R, R, I",
                "clo R, R",
                "clz R, R",
                "div R, R",
                "divu R, R",
                "div R, R, R",
                "div R, R, I",
                "divu R, R, R",
                "divu R, R, I",
                "mult R, R",
                "multu R, R",
                "mul R, R, R",
                "mul R, R, I",
                "mulo R, R, R",
                "mulo R, R, I",
                "mulou R, R, R",
                "mulou R, R, I",
                "madd R, R",
                "maddu R, R",
                "msub R, R",
                "msub R, R",  // TODO: page 53, same for signed & unsigned; maybe msubu?
                "neg R, R",
                "negu R, R",
                "nor R, R, R",
                "not R, R",
                "or R, R, R",
                "ori R, R, I",
                "rem R, R, R",
                "remu R, R, R",
                "sll R, R, I",
                "sllv R, R, R",
                "sra R, R, I",
                "srav R, R, R",
                "srl R, R, I",
                "srlv R, R, R",
                "rol R, R, R",
                "ror R, R, R",
                "sub R, R, R",
                "subu R, R, R",
                "xor R, R, R",
                "xori R, R, I",
                "lui R, I",
                "li R, I",
                "slt R, R, R",
                "sltu R, R, R",
                "slti R, R, I",
                "sltiu R, R, I",
                "seq R, R, R",
                "sge R, R, R",
                "sgeu R, R, R",
                "sgt R, R, R",
                "sgtu R, R, R",
                "sle R, R, R",
                "sleu R, R, R",
                "sne R, R, R",
                "b L",
                "bc1f I, L",
                "bc1t I, L",
                "beq R, R, L",
                "bgez R, L",
                "bgezal R, L",
                "bgtz R, L",
                "blez R, L",
                "bltzal R, L",
                "bltz R, L",
                "bne R, R, L",
                "beqz R, L",
                "bge R, R, L",
                "bgeu R, R, L",
                "bgt R, R, L",
                "bgt R, I, L",
                "bgtu R, R, L",
                "bgtu R, I, L",
                "ble R, R, L",
                "ble R, I, L",
                "bleu R, R, L",
                "bleu R, I, L",
                "blt R, R, L",
                "bltu R, R, L",
                "bnez R, L",
                "j L",
                "jal L",
                "jalr R, R",
                "jr R",
                "teq R, R",
                "teqi R, I",
                "tge R, R",
                "tgeu R, R",
                "tgei R, I",
                "tgeiu R, I",
                "tlt R, R",
                "tltu R, R",
                "tlt R, I",
                "tltiu R, I",

                "la R, Ar",
                "la R, Air",
                "la R, Ali",
                "la R, Alir",
                "la R, Alr",
                "la R, L",

                "lb R, Ar",
                "lb R, Air",
                "lb R, Ali",
                "lb R, Alir",
                "lb R, Alr",
                "lb R, L",

                "lbu R, Ar",
                "lbu R, Air",
                "lbu R, Ali",
                "lbu R, Alir",
                "lbu R, Alr",
                "lbu R, L",

                "lh R, Ar",
                "lh R, Air",
                "lh R, Ali",
                "lh R, Alir",
                "lh R, Alr",
                "lh R, L",

                "lhu R, Ar",
                "lhu R, Air",
                "lhu R, Ali",
                "lhu R, Alir",
                "lhu R, Alr",
                "lhu R, L",

                "lw R, Ar",
                "lw R, Air",
                "lw R, Ali",
                "lw R, Alir",
                "lw R, Alr",
                "lw R, L",

                "lwc1 R, Ar",
                "lwc1 R, Air",
                "lwc1 R, Ali",
                "lwc1 R, Alir",
                "lwc1 R, Alr",
                "lwc1 R, L",

                "lwl R, Ar",
                "lwl R, Air",
                "lwl R, Ali",
                "lwl R, Alir",
                "lwl R, Alr",
                "lwl R, L",

                "lwr R, Ar",
                "lwr R, Air",
                "lwr R, Ali",
                "lwr R, Alir",
                "lwr R, Alr",
                "lwr R, L",

                "ld R, Ar",
                "ld R, Air",
                "ld R, Ali",
                "ld R, Alir",
                "ld R, Alr",
                "ld R, L",

                "ulh R, Ar",
                "ulh R, Air",
                "ulh R, Ali",
                "ulh R, Alir",
                "ulh R, Alr",
                "ulh R, L",

                "ulhu R, Ar",
                "ulhu R, Air",
                "ulhu R, Ali",
                "ulhu R, Alir",
                "ulhu R, Alr",
                "ulhu R, L",

                "ulw R, Ar",
                "ulw R, Air",
                "ulw R, Ali",
                "ulw R, Alir",
                "ulw R, Alr",
                "ulw R, L",

                "ll R, Ar",
                "ll R, Air",
                "ll R, Ali",
                "ll R, Alir",
                "ll R, Alr",
                "ll R, L",

                "sb R, Ar",
                "sb R, Air",
                "sb R, Ali",
                "sb R, Alir",
                "sb R, Alr",
                "sb R, L",

                "sh R, Ar",
                "sh R, Air",
                "sh R, Ali",
                "sh R, Alir",
                "sh R, Alr",
                "sh R, L",

                "sw R, Ar",
                "sw R, Air",
                "sw R, Ali",
                "sw R, Alir",
                "sw R, Alr",
                "sw R, L",

                "swc1 R, Ar",
                "swc1 R, Air",
                "swc1 R, Ali",
                "swc1 R, Alir",
                "swc1 R, Alr",
                "swc1 R, L",

                "sdc1 R, Ar",
                "sdc1 R, Air",
                "sdc1 R, Ali",
                "sdc1 R, Alir",
                "sdc1 R, Alr",
                "sdc1 R, L",

                "swl R, Ar",
                "swl R, Air",
                "swl R, Ali",
                "swl R, Alir",
                "swl R, Alr",
                "swl R, L",

                "swr R, Ar",
                "swr R, Air",
                "swr R, Ali",
                "swr R, Alir",
                "swr R, Alr",
                "swr R, L",

                "sd R, Ar",
                "sd R, Air",
                "sd R, Ali",
                "sd R, Alir",
                "sd R, Alr",
                "sd R, L",

                "ush R, Ar",
                "ush R, Air",
                "ush R, Ali",
                "ush R, Alir",
                "ush R, Alr",
                "ush R, L",

                "usw R, Ar",
                "usw R, Air",
                "usw R, Ali",
                "usw R, Alir",
                "usw R, Alr",
                "usw R, L",

                "sc R, Ar",
                "sc R, Air",
                "sc R, Ali",
                "sc R, Alir",
                "sc R, Alr",
                "sc R, L",

                "move R, R",
                "mfhi R",
                "mflo R",
                "mthi R",
                "mtlo R",
                "mfc0 R, R",
                "mfc1 R, R",
                "mfc1.d R, R",
                "mtc0 R, R",
                "mtc1 R, R",
                "movn R, R, R",
                "movz R, R, R",
                "movf R, R, I",
                "movt R, R, I",

                "abs.d R, R",
                "abs.s R, R",

                "add.d R, R, R",
                "add.s R, R, R",
                "ceil.w.d R, R",
                "ceil.w.s R, R",
                "c.eq.d I, R, R",
                "c.le.d I, R, R",
                "c.le.s I, R, R",
                "c.lt.d I, R, R",
                "c.lt.s I, R, R",
                "cvt.d.s R, R",
                "cvt.d.w. R, R",
                "cvt.s.d. R, R",
                "cvt.s.w R, R",
                "cvt.w.d R, R",
                "cvt.w.s R, R",
                "div.d R, R, R",
                "div.s R, R, R",
                "floor.w.d R, R",
                "floor.w.s R, R",

                "l.d R, Ar",
                "l.d R, Air",
                "l.d R, Ali",
                "l.d R, Alir",
                "l.d R, Alr",
                "l.d R, L",

                "l.s R, Ar",
                "l.s R, Air",
                "l.s R, Ali",
                "l.s R, Alir",
                "l.s R, Alr",
                "l.s R, L",

                "mov.d R, R",
                "mov.s R, R",
                "movf.d R, R, I",
                "movf.s R, R, I",
                "movt.d R, R, I",
                "movt.s R, R, I",
                "movn.d R, R, R",
                "movn.s R, R, R",
                "movz.d R, R, R",
                "movz.s R, R, R",
                "mul.d R, R, R",
                "mul.s R, R, R",
                "neg.d R, R",
                "neg.s R, R",
                "round.w.d R, R",
                "round.w.s R, R",
                "sqrt.d R, R",
                "sqrt.s R, R",

                "s.d R, Ar",
                "s.d R, Air",
                "s.d R, Ali",
                "s.d R, Alir",
                "s.d R, Alr",
                "s.d R, L",

                "s.s R, Ar",
                "s.s R, Air",
                "s.s R, Ali",
                "s.s R, Alir",
                "s.s R, Alr",
                "s.s R, L",

                "sub.d R, R, R",
                "sub.s R, R, R",
                "trunc.w.d R, R",
                "trunc.w.s R, R",

                "eret",
                "syscall",
                "break I",
                "nop"
        ];

        for (let sign of signatures) {
                isSignatureValid[sign] = validSignatures.includes(sign);
        };
}
