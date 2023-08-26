/**
 * skylark-sourcemap - A version of sourcemap that ported to running on skylarkjs.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./util"],function(t){"use strict";function e(){this._array=[],this._sorted=!0,this._last={generatedLine:-1,generatedColumn:0}}return e.prototype.unsortedForEach=function(t,e){this._array.forEach(t,e)},e.prototype.add=function(e){var r,a,n,s,o,i;r=this._last,a=e,n=r.generatedLine,s=a.generatedLine,o=r.generatedColumn,i=a.generatedColumn,s>n||s==n&&i>=o||t.compareByGeneratedPositionsInflated(r,a)<=0?(this._last=e,this._array.push(e)):(this._sorted=!1,this._array.push(e))},e.prototype.toArray=function(){return this._sorted||(this._array.sort(t.compareByGeneratedPositionsInflated),this._sorted=!0),this._array},e});
//# sourceMappingURL=sourcemaps/mapping-list.js.map
