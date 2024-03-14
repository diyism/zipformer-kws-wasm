'use strict'
const wasmModule = require('./cyrinn-wasm-nodejs.js')();
const sherpa_onnx_kws = require('./cyrinn-kws.js');


function createKeywordSpotter(config) {
      return sherpa_onnx_kws.createKws(wasmModule, config);
    }

module.exports = {
    createKeywordSpotter
};