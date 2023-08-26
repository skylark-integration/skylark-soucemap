/**
 * skylark-sourcemap - A version of sourcemap that ported to running on skylarkjs.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define([],function(){"use strict";const n=1,r=2;return{GREATEST_LOWER_BOUND:n,LEAST_UPPER_BOUND:r,search:function(t,e,u,f){if(0===e.length)return-1;var i=function n(t,e,u,f,i,o){var c=Math.floor((e-t)/2)+t,h=i(u,f[c],!0);return 0===h?c:h>0?e-c>1?n(c,e,u,f,i,o):o==r?e<f.length?e:-1:c:c-t>1?n(t,c,u,f,i,o):o==r?c:t<0?-1:t}(-1,e.length,t,e,u,f||n);if(i<0)return-1;for(;i-1>=0&&0===u(e[i],e[i-1],!0);)--i;return i}}});
//# sourceMappingURL=sourcemaps/binary-search.js.map
