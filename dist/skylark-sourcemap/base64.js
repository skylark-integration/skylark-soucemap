/**
 * skylark-sourcemap - A version of sourcemap that ported to running on skylarkjs.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define([],function(){"use strict";var e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");return{encode:function(n){if(0<=n&&n<e.length)return e[n];throw new TypeError("Must be between 0 and 63: "+n)},decode:function(e){return 65<=e&&e<=90?e-65:97<=e&&e<=122?e-97+26:48<=e&&e<=57?e-48+52:43==e?62:47==e?63:-1}}});
//# sourceMappingURL=sourcemaps/base64.js.map
