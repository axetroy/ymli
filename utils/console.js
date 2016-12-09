/**
 * Created by axetroy on 16-12-9.
 */

require('colors');

function error() {
  let agms = [].slice.call(arguments);
  let content = agms.splice(0, 1)[0] || '';
  console.error.apply(console, ['ERROR: '.red + content.underline].concat(agms));
}

function warn() {
  let agms = [].slice.call(arguments);
  let content = agms.splice(0, 1)[0] || '';
  console.warn.apply(console, ['WARN: '.yellow + content.underline].concat(agms));
}

function debug() {
  let agms = [].slice.call(arguments);
  let content = agms.splice(0, 1)[0] || '';
  console.error.apply(console, ['DEBUG: '.blue + content.underline].concat(agms));
}

function log() {
  let agms = [].slice.call(arguments);
  let content = agms.splice(0, 1)[0] || '';
  console.log.apply(console, ['LOG: '.blue + content.underline].concat(agms));
}

function info() {
  let agms = [].slice.call(arguments);
  let content = agms.splice(0, 1)[0] || '';
  console.info.apply(console, ['INFO: '.green + content.underline].concat(agms));
}

exports.error = error;
exports.warn = warn;
exports.debug = debug;
exports.log = log;
exports.info = info;