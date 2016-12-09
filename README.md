# 生成i18n文件的cli工具

> 根据yml文件，生成多个json文件，每个json文件则是一个语言包

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