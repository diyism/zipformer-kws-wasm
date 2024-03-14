// Copyright (c)  2024  Cyrinn Corporation (authors:Lingfan Zeng)
//
const fs = require('fs');
const {Readable} = require('stream');
const wav = require('wav');

const cyrinn_kws = require('cyrinn-kws');

function createKeywordSpotter() {
    let transducerConfig = {
        encoder: './assets/encoder-epoch-12-avg-2-chunk-16-left-64.onnx',
        decoder: './assets/decoder-epoch-12-avg-2-chunk-16-left-64.onnx',
        joiner: './assets/joiner-epoch-12-avg-2-chunk-16-left-64.onnx',
    }
    let modelConfig = {
        transducer: transducerConfig,
        tokens: './assets/tokens.txt',
        provider: 'cpu',
        modelType: "",
        numThreads: 1,
        debug: 1
    };

    let featConfig = {
        samplingRate: 16000,
        featureDim: 80,
    };

    let configObj = {
        featConfig: featConfig,
        modelConfig: modelConfig,
        maxActivePaths: 4,
        numTrailingBlanks: 1,
        keywordsScore: 1.0,
        keywordsThreshold: 0.25,
        keywords: './assets/keywords.txt'
    };

    return new cyrinn_kws.createKeywordSpotter(configObj);
}

const kws_recognizer = createKeywordSpotter();
const stream = kws_recognizer.createStream();

const waveFilename =
    './assets/0.wav';

const reader = new wav.Reader();
const readable = new Readable().wrap(reader);

function decode(samples) {
    stream.acceptWaveform(kws_recognizer.config.featConfig.samplingRate, samples);

    while (kws_recognizer.isReady(stream)) {
        kws_recognizer.decode(stream);
    }
    const text = kws_recognizer.getResult(stream);
    console.log(text);
}

reader.on('format', ({audioFormat, bitDepth, channels, sampleRate}) => {
    if (sampleRate != kws_recognizer.config.featConfig.samplingRate) {
        throw new Error(`Only support sampleRate ${
            kws_recognizer.config.featConfig.samplingRate}. Given ${sampleRate}`);
    }

    if (audioFormat != 1) {
        throw new Error(`Only support PCM format. Given ${audioFormat}`);
    }

    if (channels != 1) {
        throw new Error(`Only a single channel. Given ${channel}`);
    }

    if (bitDepth != 16) {
        throw new Error(`Only support 16-bit samples. Given ${bitDepth}`);
    }
});

fs.createReadStream(waveFilename, {'highWaterMark': 4096})
    .pipe(reader)
    .on('finish', function(err) {
        // tail padding
        const floatSamples =
            new Float32Array(kws_recognizer.config.featConfig.sampleRate * 0.5);
        decode(floatSamples);
        stream.free();
        kws_recognizer.free();
    });

readable.on('readable', function() {
    let chunk;
    while ((chunk = readable.read()) != null) {
        const int16Samples = new Int16Array(
            chunk.buffer, chunk.byteOffset,
            chunk.length / Int16Array.BYTES_PER_ELEMENT);

        const floatSamples = new Float32Array(int16Samples.length);

        for (let i = 0; i < floatSamples.length; i++) {
            floatSamples[i] = int16Samples[i] / 32768.0;
        }

        decode(floatSamples);
    }
});