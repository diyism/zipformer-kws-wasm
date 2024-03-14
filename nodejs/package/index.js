'use strict'
const wasmModule = require('./sherpa-onnx-wasm-nodejs.js')();
const sherpa_onnx_kws = require('./sherpa-onnx-kws.js');


function createKeywordSpotter(config) {
      return sherpa_onnx_kws.createKws(wasmModule, config);
    }

module.exports = {
    createKeywordSpotter
};