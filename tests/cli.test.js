/**
 * Created by axetroy on 16-12-9.
 */

const fs = require('fs');
const exec = require('child_process').exec;
const path = require('path');
const process = require('process');
const crypto = require('crypto');

const expect = require('chai').expect;
const co = require('co');
const Promise = require('bluebird');
const _ = require('lodash');

const ymli = require('../bin/ymli');

const test_config = {
  tmp: './.tmp',
  demo: './example',
  dist: './dist'
};

function clearCache() {
  let deferred = Promise.defer();
  exec(`rm -rf ${test_config.tmp}`, function (err, stderr, stdout) {
    if (err) return deferred.reject(err);
    deferred.resolve(stdout);
  });
  return deferred.promise;
}

function readJSON(path) {
  let deferred = Promise.defer();
  fs.readFile(path, 'utf8', function (err, data) {
    if (err) return deferred.reject(err);
    try {
      data = JSON.parse(data);
      deferred.resolve(data);
    } catch (err) {
      deferred.reject(err);
    }
  });
  return deferred.promise;
}

function getFiles(dir, files_) {
  files_ = files_ || [];
  var files = fs.readdirSync(dir);
  for (var i in files) {
    var name = dir + '/' + files[i];
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files_);
    } else {
      files_.push(name);
    }
  }
  return files_;
}

describe('test cli', function () {

  beforeEach(function (done) {
    clearCache()
      .then(()=>done())
      .catch(done);
  });

  afterEach(function (done) {
    clearCache()
      .then(()=>done())
      .catch(done);
  });

  it('ymli generate without any params', function (done) {
    exec('node ./bin/ymli generate', function (err, stderr, stdout) {
      if (err) return done();
    })
  });

  it('ymli generate', function (done) {
    exec(`node ./bin/ymli generate -f ./example/basic.yml -o ${test_config.tmp}`, function (err, stderr, stdout) {
      if (err) return done(err);

      co(function*() {
        let [en,cn,hk,tw] = yield [
          readJSON('./.tmp/en-US.local.json'),
          readJSON('./.tmp/zh-CN.local.json'),
          readJSON('./.tmp/zh-HK.local.json'),
          readJSON('./.tmp/zh-TW.local.json'),
        ];

        expect(Object.keys(en)).to.be.deep.equal(Object.keys(cn));
        expect(Object.keys(cn)).to.be.deep.equal(Object.keys(hk));
        expect(Object.keys(hk)).to.be.deep.equal(Object.keys(tw));
        expect(Object.keys(tw)).to.be.deep.equal(Object.keys(en));

        let files = getFiles(test_config.tmp);

        expect(files).have.length(4);

        done();

      }).catch(done);

    })
  });

  it('has exist dir method', function (done) {
    co(function*() {
      let randomPath = path.join(process.env.PWD, crypto.randomBytes(16).toString('hex'));
      let hasExist = ymli.hasDirExist(randomPath);
      expect(hasExist).to.be.not.ok;
      if (!hasExist) return done();
      done(new Error());
    }).catch(done);
  });

  it('ymlParser method', function (done) {
    co(function*() {
      let content = yield ymli.ymlParser(path.join(test_config.demo, 'basic.yml'));
      expect(_.isPlainObject(content)).to.be.ok;
      done();
    }).catch(done);
  });

  it('configParser method', function (done) {
    co(function*() {
      let content = yield ymli.ymlParser(path.join(test_config.demo, 'basic.yml'));
      expect(_.isPlainObject(content)).to.be.ok;
      let config = ymli.configParser(content);
      expect(_.isPlainObject(config)).to.be.ok;
      expect(config.author).to.be.equal("axetroy");
      expect(config.app).to.be.equal("test");
      expect(config.supports).to.be.deep.equal(["en-US", "zh-CN", "zh-TW", "zh-HK"]);
      expect(config.default).to.be.deep.equal("en-US");
      done();
    }).catch(done);
  });

  it('langParser method', function (done) {
    co(function*() {
      let content = yield ymli.ymlParser(path.join(test_config.demo, 'basic.yml'));
      expect(_.isPlainObject(content)).to.be.ok;
      let lang = ymli.langParser(content);
      let config = ymli.configParser(content);
      expect(_.isPlainObject(lang)).to.be.ok;

      expect(Object.keys(lang)).have.length(4);
      expect(Object.keys(lang)).to.be.deep.equal(config.supports);

      _.each(lang, function (langPack, local) {
        expect(config.supports).to.be.includes(local);    // 只包含所支持的语言
        expect(Object.keys(langPack)).have.length(2);     // 每一个都包含一样
      });

      expect(lang['zh-HK'].register).to.be.equal('sign up');    // 该条没有定义，则使用默认语言补全

      done();
    }).catch(done);
  });

  it('generate a json file', function (done) {
    co(function*() {
      if (!ymli.hasDirExist(test_config.tmp)) fs.mkdirSync(test_config.tmp);
      yield ymli.generateJSON({
        local: 'test',
        output: test_config.tmp,
        content: {
          test: 'hello'
        }
      });
      let filePath = path.join(process.env.PWD, test_config.tmp, 'test.local.json');
      let exist = fs.existsSync(filePath);
      let content = yield readJSON(filePath);
      expect(exist).to.be.ok;
      expect(content).to.have.property('test', 'hello');
      done();
    }).catch(done);
  })


});