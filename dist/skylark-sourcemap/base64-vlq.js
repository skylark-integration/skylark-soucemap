/**
 * skylark-sourcemap - A version of sourcemap that ported to running on skylarkjs.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./base64"],function(e){"use strict";return exports.encode=function(r){var o,n="",d=function(e){return e<0?1+(-e<<1):0+(e<<1)}(r);do{o=31&d,(d>>>=5)>0&&(o|=32),n+=e.encode(o)}while(d>0);return n},exports.decode=function(r,o,n){var d,t,c,i,a=r.length,u=0,s=0;do{if(o>=a)throw new Error("Expected more digits in base 64 VLQ value.");if(-1===(t=e.decode(r.charCodeAt(o++))))throw new Error("Invalid base64 digit: "+r.charAt(o-1));d=!!(32&t),u+=(t&=31)<<s,s+=5}while(d);n.value=(i=(c=u)>>1,1==(1&c)?-i:i),n.rest=o},{encode:encode,decode:decode}});
//# sourceMappingURL=sourcemaps/base64-vlq.js.map
