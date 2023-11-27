/**
 * skylark-sourcemap - A version of sourcemap that ported to running on skylarkjs.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./base64"],function(e){"use strict";return{encode:function(r){var n,t="",i=function(e){return e<0?1+(-e<<1):0+(e<<1)}(r);do{n=31&i,(i>>>=5)>0&&(n|=32),t+=e.encode(n)}while(i>0);return t},decode:function(r,n,t){var i,o,d,c,a=r.length,u=0,f=0;do{if(n>=a)throw new Error("Expected more digits in base 64 VLQ value.");if(-1===(o=e.decode(r.charCodeAt(n++))))throw new Error("Invalid base64 digit: "+r.charAt(n-1));i=!!(32&o),u+=(o&=31)<<f,f+=5}while(i);t.value=(c=(d=u)>>1,1==(1&d)?-c:c),t.rest=n}}});
//# sourceMappingURL=sourcemaps/base64-vlq.js.map
