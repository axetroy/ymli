# ymli [![Build Status](https://travis-ci.org/axetroy/ymli.svg?branch=master)](https://travis-ci.org/axetroy/ymli)[![Dependency](https://david-dm.org/axetroy/ymli.svg)](https://david-dm.org/axetroy/ymli)


> 生成i18n文件的cli工具
> 根据yml文件，生成多个json文件，每个json文件则是一个语言包

### Install

```bash
npm install -g https://github.com/axetroy/ymli.git

# example
ymli generate -f ./i18n.yml -c ./dist/
```

### Usage

```bash
  Usage: ymli generate <options>


  Commands:

    generate   compile the yml file and generate i18n file

  Options:

    -h, --help           output usage information
    -V, --version        output the version number
    -f, --file [file]    compile yml file
    -o, --output [path]  set an output path
    -g, --gzip           gzip the json file
    -w, --watch          watch yml file change and re-generate

```

### Contribution

```bash
git clone https://github.com/axetroy/ymli.git
cd ymli
yarn
yarn run test
```

more detail:

[https://github.com/axetroy/ymli/blob/master/contributing.md](https://github.com/axetroy/ymli/blob/master/contributing.md)

### Test

```bash
git clone https://github.com/axetroy/ymli.git
cd ymli
yarn
yarn run test
```

more detail:

[https://travis-ci.org/axetroy/ymli](https://travis-ci.org/axetroy/ymli)

### License

The MIT License (MIT)

Copyright (c) 2016 axetroy

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.