import JasmineCore from 'jasmine-core';

global.getJasmineRequireObj = function () {
  return JasmineCore;
};

require('jasmine-ajax');
