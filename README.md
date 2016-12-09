# ymli [![Build Status](https://travis-ci.org/axetroy/ymli.svg?branch=master)](https://travis-ci.org/axetroy/ymli)[![Dependency](https://david-dm.org/axetroy/ymli.svg)](https://david-dm.org/axetroy/ymli)

> a cli tool to generate i18n file
> generate multiple json files, every file is a lang pack

### Install

```bash
npm install -g ymli

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

### Example

```yml
# ./i18n.yml

$app: test              # start with the $ sign mean config
$author: axetroy
$supports: [en-US, zh-CN, zh-TW, zh-HK]
$default: en-US

login:
  en-US: login
  zh-CN: 登陆
  zh-TW: 登陸
  zh-HK: 登陸

register:
  en-US: sign up
  zh-CN: 注册
  zh-TW: 註冊
```

run command

```bash
ymli generate -f ./i18n.yml -c ./dist/
cd ./dist && ls
# en-US.local.json  zh-CN.local.json  zh-HK.local.json  zh-TW.local.json
```

check result

```bash
cat en-US.local.json
# {"login":"login","register":"sign up"}

cat zh-CN.local.json
# {"login":"登陆","register":"注册"}

cat zh-HK.local.json
# {"login":"登陸","register":"sign up"}
# NOTICE:it will auto complete this entry(register) with default lang(here is en-US) event it didn't defined in yml;

cat zh-TW.local.json
# {"login":"登陸","register":"註冊"}
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