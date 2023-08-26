define([], function () {
    'use strict';

    function swap(ary, x, y) {
        var temp = ary[x];
        ary[x] = ary[y];
        ary[y] = temp;
    }
    function randomIntInRange(low, high) {
        return Math.round(low + Math.random() * (high - low));
    }
    function doQuickSort(ary, comparator, p, r) {
        if (p < r) {
            var pivotIndex = randomIntInRange(p, r);
            var i = p - 1;
            swap(ary, pivotIndex, r);
            var pivot = ary[r];
            for (var j = p; j < r; j++) {
                if (comparator(ary[j], pivot) <= 0) {
                    i += 1;
                    swap(ary, i, j);
                }
            }
            swap(ary, i + 1, j);
            var q = i + 1;
            doQuickSort(ary, comparator, p, q - 1);
            doQuickSort(ary, comparator, q + 1, r);
        }
    }
    
    function quickSort(ary, comparator) {
        doQuickSort(ary, comparator, 0, ary.length - 1);
    }

    return {
        quickSort
    }
});