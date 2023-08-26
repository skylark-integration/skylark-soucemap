define([], function () {
    'use strict';

    const  GREATEST_LOWER_BOUND = 1;
    const LEAST_UPPER_BOUND = 2;

    function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
        var mid = Math.floor((aHigh - aLow) / 2) + aLow;
        var cmp = aCompare(aNeedle, aHaystack[mid], true);
        if (cmp === 0) {
            return mid;
        } else if (cmp > 0) {
            if (aHigh - mid > 1) {
                return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
            }
            if (aBias == LEAST_UPPER_BOUND) {
                return aHigh < aHaystack.length ? aHigh : -1;
            } else {
                return mid;
            }
        } else {
            if (mid - aLow > 1) {
                return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
            }
            if (aBias == LEAST_UPPER_BOUND) {
                return mid;
            } else {
                return aLow < 0 ? -1 : aLow;
            }
        }
    }
     function search(aNeedle, aHaystack, aCompare, aBias) {
        if (aHaystack.length === 0) {
            return -1;
        }
        var index = recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack, aCompare, aBias || GREATEST_LOWER_BOUND);
        if (index < 0) {
            return -1;
        }
        while (index - 1 >= 0) {
            if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) {
                break;
            }
            --index;
        }
        return index;
    };

    return {
      GREATEST_LOWER_BOUND,
      LEAST_UPPER_BOUND,
      search
    }
});