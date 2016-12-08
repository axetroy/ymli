/**
 * Created by axetroy on 16-12-9.
 */

const fs = require('fs');
const exec = require('child_process').exec;

const expect = require('chai').expect;
const co = require('co');
const Promise = require('bluebird');

function clearCache(done) {
  let deferred = Promise.defer();
  exec('rm -rf ./.tmp', function (err, stderr, stdout) {
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
    exec('node ./bin/ymli generate -f ./example/basic.yml -o ./.tmp', function (err, stderr, stdout) {
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

        let files = getFiles('./.tmp');

        expect(files).have.length(4);

        done();

      }).catch(done);

    })
  });

});