"use strict";

// input at ./input.wav
// must be UNSIGNED 8-bit PCM .WAV mono input

const fs = require("fs");

const inputFile = "./input.wav";
const outputFile = "./outputarray";

// read and verify wav integrity
const inputWavBuffer = fs.readFileSync(inputFile);
const isWav = inputWavBuffer.slice(8, 12).toString("ascii") == "WAVE";
if (!isWav)
    throw new TypeError("Invalid input, not a wav");
const channels = inputWavBuffer.slice(22, 24).readInt16LE(0);
if (channels > 1)
    throw new TypeError("Must be mono track");

// get the actual audio data and sample rate
// unused -- const sampleRate = inputWavBuffer.slice(24, 28).readInt32LE(0); // eg 44100
const audioData = inputWavBuffer.slice(44, inputWavBuffer.length);

// process audio
let output = [];
for (let i = 0; i < audioData.length; ++i) {
    let data = audioData.readUInt8(i);
    output.push(data);
}

fs.writeFileSync(outputFile, output.join(","));