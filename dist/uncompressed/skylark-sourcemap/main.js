define([
    './array-set',
    './base64-vlq',
    './binary-search',
    './mapping-list',
    './quick-sort',
    "./source-map-consumer",
    "./source-map-generator",
    "./source-node",
    './util',
 ], function (
 	ArraySet,
 	base64VLQ, 
 	binarySearch, 
 	MappingList, 
 	quickSort,
 	consumers,
 	SourceMapGenerator,
 	SourceNode,
 	util
 ) {
    'use strict';

    return {
	 	ArraySet,
	 	base64VLQ, 
	 	binarySearch, 
	 	MappingList, 
	 	quickSort,
	 	consumers,
	 	SourceMapGenerator,
	 	SourceNode,
	 	util
    };
	
});