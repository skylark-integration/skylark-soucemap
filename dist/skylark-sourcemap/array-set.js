/**
 * skylark-sourcemap - A version of sourcemap that ported to running on skylarkjs.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./util"],function(t){"use strict";var e=Object.prototype.hasOwnProperty,r="undefined"!=typeof Map;function n(){this._array=[],this._set=r?new Map:Object.create(null)}return n.fromArray=function(t,e){for(var r=new n,i=0,s=t.length;i<s;i++)r.add(t[i],e);return r},n.prototype.size=function(){return r?this._set.size:Object.getOwnPropertyNames(this._set).length},n.prototype.add=function(n,i){var s=r?n:t.toSetString(n),o=r?this.has(n):e.call(this._set,s),a=this._array.length;o&&!i||this._array.push(n),o||(r?this._set.set(n,a):this._set[s]=a)},n.prototype.has=function(n){if(r)return this._set.has(n);var i=t.toSetString(n);return e.call(this._set,i)},n.prototype.indexOf=function(n){if(r){var i=this._set.get(n);if(i>=0)return i}else{var s=t.toSetString(n);if(e.call(this._set,s))return this._set[s]}throw new Error('"'+n+'" is not in the set.')},n.prototype.at=function(t){if(t>=0&&t<this._array.length)return this._array[t];throw new Error("No element indexed by "+t)},n.prototype.toArray=function(){return this._array.slice()},n});
//# sourceMappingURL=sourcemaps/array-set.js.map
