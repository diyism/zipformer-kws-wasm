    wasm/kws/zh/sherpa-onnx-wasm-kws-main_pre.data 文件size是19303302,
    与 wasm/kws/zh/sherpa-onnx-wasm-kws-main.js里"remote_package_size": 13647880 对不上,
    而且 文件名 应该是 wasm/kws/zh/sherpa-onnx-wasm-kws-main.data,
    需要拼接的4个文件也从internet上找不到:
    decoder-epoch-20-avg-2-chunk-16-left-128.onnx,
    encoder-epoch-20-avg-2-chunk-16-left-128.onnx,
    joiner-epoch-20-avg-2-chunk-16-left-128.onnx,
    tokens.txt
    可以试试自己拼接: decoder-epoch-99-avg-1-chunk-16-left-64.onnx, ...


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
