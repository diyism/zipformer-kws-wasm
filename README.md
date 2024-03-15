WebAssembly keyword spotting Demo with sherpa-onnx

generate from https://github.com/k2-fsa/sherpa-onnx


## Advantages:

1. Based on WebAssembly, it can run in the browser, reducing server computational resources.
2. Supports customization of multiple wake-up words, currently supporting Chinese.
3. Packaged as a Node.js interface for easy import.

## 1. Nodejs Quick Start

```bash
git clone https://github.com/lovemefan/zipformer-kws-wasm.git
cd zipformer-kws-wasm
npm i ./cyrinn-kws-package
npm i wav
cd example && node test-nodejs-kws.js
```

## 2. Browser Quick Start

you can use nodejs or nginx to build static web-server

here is a nodejs example

```bash
git clone https://github.com/lovemefan/zipformer-kws-wasm.git
cd zipformer-kws-wasm
npm -g i http-server
http-server wasm -p 3000
```

## 3. Customizing Wake-up Words

Use a Python script to generate the keywords file and place it in the example/assets folder.
One Chinese keyword per line in texts.txt is sufficient.

```bash
pip install pypinyin
python3 script/text2token.py \
          --text texts.txt \
          --tokens tokens.txt \
          --output keywords.txt
```