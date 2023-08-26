/**
 * skylark-sourcemap - A version of sourcemap that ported to running on skylarkjs.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define([],function(){"use strict";function n(n,r,t){var a=n[r];n[r]=n[t],n[t]=a}function r(t,a,i,o){if(i<o){var u=i-1;n(t,(v=i,d=o,Math.round(v+Math.random()*(d-v))),o);for(var f=t[o],c=i;c<o;c++)a(t[c],f)<=0&&n(t,u+=1,c);n(t,u+1,c);var e=u+1;r(t,a,i,e-1),r(t,a,e+1,o)}var v,d}return{quickSort:function(n,t){r(n,t,0,n.length-1)}}});
//# sourceMappingURL=sourcemaps/quick-sort.js.map
