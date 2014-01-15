/*
Copyright (c) 2013, Groupon, Inc.
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions
are met:

Redistributions of source code must retain the above copyright notice,
this list of conditions and the following disclaimer.

Redistributions in binary form must reproduce the above copyright
notice, this list of conditions and the following disclaimer in the
documentation and/or other materials provided with the distribution.

Neither the name of GROUPON nor the names of its contributors may be
used to endorse or promote products derived from this software without
specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// Generated by CoffeeScript 2.0.0-beta7
void function () {
  var createAlertApi, createAssertApi, createCookieApi, createElementApi, createInputApi, createNavigationApi, createPageApi, extend, log, truthy, WebDriver;
  WebDriver = require('webdriver-http-sync');
  log = require('../log');
  truthy = require('assertive').truthy;
  extend = require('underscore').extend;
  createAlertApi = require('./alert');
  createAssertApi = require('./assert');
  createElementApi = require('./element');
  createNavigationApi = require('./navigation');
  createPageApi = require('./page');
  createInputApi = require('./input');
  createCookieApi = require('./cookie');
  module.exports = function () {
    function class$(targetPort, proxyCommandPort, webdriverServerUrl, desiredCapabilities, options) {
      var invocation;
      if (null == options)
        options = {};
      invocation = 'new Driver(targetPort, proxyCommandPort, webdriverServerUrl, desiredCapabilities)';
      truthy('' + invocation + ' - requires targetPort', targetPort);
      truthy('' + invocation + ' - requires proxyCommandPort', proxyCommandPort);
      truthy('' + invocation + ' - requires webdriverServerUrl', webdriverServerUrl);
      truthy('' + invocation + ' - requires desiredCapabilities', desiredCapabilities);
      this.proxyCommandRoot = 'http://127.0.0.1:' + proxyCommandPort;
      this.urlRoot = 'http://127.0.0.1:' + targetPort;
      this.log = log(options.logDirectory);
      this.driver = new WebDriver(webdriverServerUrl, desiredCapabilities, options.http);
      this.driver.on('request', this.log);
      this.driver.on('response', this.log.response);
      this.alert = createAlertApi(this.driver);
      this.assert = createAssertApi(this.driver);
      extend(this, createNavigationApi(this.driver));
      extend(this, createPageApi(this.driver));
      extend(this, createElementApi(this.driver));
      extend(this, createInputApi(this.driver));
      extend(this, createCookieApi(this.driver));
    }
    class$.prototype.close = function (callback) {
      truthy('close(callback) - requires callback', callback);
      this.driver.close();
      return this.log.flush(callback);
    };
    class$.prototype.evaluate = function (clientFunction) {
      var args, cache$, size$;
      if (arguments.length > 1) {
        cache$ = arguments;
        size$ = cache$.length;
        args = size$ > 1 ? [].slice.call(cache$, 0, size$ - 1) : [];
        clientFunction = cache$[size$ - 1];
        cache$;
      }
      truthy('evaluate(clientFunction) - requires clientFunction', clientFunction);
      if (typeof clientFunction === 'function') {
        args = JSON.stringify(null != args ? args : []);
        clientFunction = 'return (' + clientFunction + ').apply(this, ' + args + ');';
      }
      return this.driver.evaluate(clientFunction);
    };
    return class$;
  }();
}.call(this);