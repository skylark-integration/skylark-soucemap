define([], function () {
    'use strict';
 
    function getArg(aArgs, aName, aDefaultValue) {
        if (aName in aArgs) {
            return aArgs[aName];
        } else if (arguments.length === 3) {
            return aDefaultValue;
        } else {
            throw new Error('"' + aName + '" is a required argument.');
        }
    }
    var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/;
    var dataUrlRegexp = /^data:.+\,.+$/;
    function urlParse(aUrl) {
        var match = aUrl.match(urlRegexp);
        if (!match) {
            return null;
        }
        return {
            scheme: match[1],
            auth: match[2],
            host: match[3],
            port: match[4],
            path: match[5]
        };
    }
    function urlGenerate(aParsedUrl) {
        var url = '';
        if (aParsedUrl.scheme) {
            url += aParsedUrl.scheme + ':';
        }
        url += '//';
        if (aParsedUrl.auth) {
            url += aParsedUrl.auth + '@';
        }
        if (aParsedUrl.host) {
            url += aParsedUrl.host;
        }
        if (aParsedUrl.port) {
            url += ':' + aParsedUrl.port;
        }
        if (aParsedUrl.path) {
            url += aParsedUrl.path;
        }
        return url;
    }
    function normalize(aPath) {
        var path = aPath;
        var url = urlParse(aPath);
        if (url) {
            if (!url.path) {
                return aPath;
            }
            path = url.path;
        }
        var isAbsPath = isAbsolute(path);
        var parts = path.split(/\/+/);
        for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
            part = parts[i];
            if (part === '.') {
                parts.splice(i, 1);
            } else if (part === '..') {
                up++;
            } else if (up > 0) {
                if (part === '') {
                    parts.splice(i + 1, up);
                    up = 0;
                } else {
                    parts.splice(i, 2);
                    up--;
                }
            }
        }
        path = parts.join('/');
        if (path === '') {
            path = isAbsPath ? '/' : '.';
        }
        if (url) {
            url.path = path;
            return urlGenerate(url);
        }
        return path;
    }
    function join(aRoot, aPath) {
        if (aRoot === '') {
            aRoot = '.';
        }
        if (aPath === '') {
            aPath = '.';
        }
        var aPathUrl = urlParse(aPath);
        var aRootUrl = urlParse(aRoot);
        if (aRootUrl) {
            aRoot = aRootUrl.path || '/';
        }
        if (aPathUrl && !aPathUrl.scheme) {
            if (aRootUrl) {
                aPathUrl.scheme = aRootUrl.scheme;
            }
            return urlGenerate(aPathUrl);
        }
        if (aPathUrl || aPath.match(dataUrlRegexp)) {
            return aPath;
        }
        if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
            aRootUrl.host = aPath;
            return urlGenerate(aRootUrl);
        }
        var joined = aPath.charAt(0) === '/' ? aPath : normalize(aRoot.replace(/\/+$/, '') + '/' + aPath);
        if (aRootUrl) {
            aRootUrl.path = joined;
            return urlGenerate(aRootUrl);
        }
        return joined;
    }
    function isAbsolute(aPath) {
        return aPath.charAt(0) === '/' || urlRegexp.test(aPath);
    }
    function relative(aRoot, aPath) {
        if (aRoot === '') {
            aRoot = '.';
        }
        aRoot = aRoot.replace(/\/$/, '');
        var level = 0;
        while (aPath.indexOf(aRoot + '/') !== 0) {
            var index = aRoot.lastIndexOf('/');
            if (index < 0) {
                return aPath;
            }
            aRoot = aRoot.slice(0, index);
            if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
                return aPath;
            }
            ++level;
        }
        return Array(level + 1).join('../') + aPath.substr(aRoot.length + 1);
    }
    var supportsNullProto = function () {
        var obj = Object.create(null);
        return !('__proto__' in obj);
    }();
    function identity(s) {
        return s;
    }
    function toSetString(aStr) {
        if (isProtoString(aStr)) {
            return '$' + aStr;
        }
        return aStr;
    }
    function fromSetString(aStr) {
        if (isProtoString(aStr)) {
            return aStr.slice(1);
        }
        return aStr;
    }
    function isProtoString(s) {
        if (!s) {
            return false;
        }
        var length = s.length;
        if (length < 9) {
            return false;
        }
        if (s.charCodeAt(length - 1) !== 95 || s.charCodeAt(length - 2) !== 95 || s.charCodeAt(length - 3) !== 111 || s.charCodeAt(length - 4) !== 116 || s.charCodeAt(length - 5) !== 111 || s.charCodeAt(length - 6) !== 114 || s.charCodeAt(length - 7) !== 112 || s.charCodeAt(length - 8) !== 95 || s.charCodeAt(length - 9) !== 95) {
            return false;
        }
        for (var i = length - 10; i >= 0; i--) {
            if (s.charCodeAt(i) !== 36) {
                return false;
            }
        }
        return true;
    }
    function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
        var cmp = strcmp(mappingA.source, mappingB.source);
        if (cmp !== 0) {
            return cmp;
        }
        cmp = mappingA.originalLine - mappingB.originalLine;
        if (cmp !== 0) {
            return cmp;
        }
        cmp = mappingA.originalColumn - mappingB.originalColumn;
        if (cmp !== 0 || onlyCompareOriginal) {
            return cmp;
        }
        cmp = mappingA.generatedColumn - mappingB.generatedColumn;
        if (cmp !== 0) {
            return cmp;
        }
        cmp = mappingA.generatedLine - mappingB.generatedLine;
        if (cmp !== 0) {
            return cmp;
        }
        return strcmp(mappingA.name, mappingB.name);
    }
    function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
        var cmp = mappingA.generatedLine - mappingB.generatedLine;
        if (cmp !== 0) {
            return cmp;
        }
        cmp = mappingA.generatedColumn - mappingB.generatedColumn;
        if (cmp !== 0 || onlyCompareGenerated) {
            return cmp;
        }
        cmp = strcmp(mappingA.source, mappingB.source);
        if (cmp !== 0) {
            return cmp;
        }
        cmp = mappingA.originalLine - mappingB.originalLine;
        if (cmp !== 0) {
            return cmp;
        }
        cmp = mappingA.originalColumn - mappingB.originalColumn;
        if (cmp !== 0) {
            return cmp;
        }
        return strcmp(mappingA.name, mappingB.name);
    }
    function strcmp(aStr1, aStr2) {
        if (aStr1 === aStr2) {
            return 0;
        }
        if (aStr1 === null) {
            return 1;
        }
        if (aStr2 === null) {
            return -1;
        }
        if (aStr1 > aStr2) {
            return 1;
        }
        return -1;
    }
    function compareByGeneratedPositionsInflated(mappingA, mappingB) {
        var cmp = mappingA.generatedLine - mappingB.generatedLine;
        if (cmp !== 0) {
            return cmp;
        }
        cmp = mappingA.generatedColumn - mappingB.generatedColumn;
        if (cmp !== 0) {
            return cmp;
        }
        cmp = strcmp(mappingA.source, mappingB.source);
        if (cmp !== 0) {
            return cmp;
        }
        cmp = mappingA.originalLine - mappingB.originalLine;
        if (cmp !== 0) {
            return cmp;
        }
        cmp = mappingA.originalColumn - mappingB.originalColumn;
        if (cmp !== 0) {
            return cmp;
        }
        return strcmp(mappingA.name, mappingB.name);
    }
    function parseSourceMapInput(str) {
        return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ''));
    }
    function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
        sourceURL = sourceURL || '';
        if (sourceRoot) {
            if (sourceRoot[sourceRoot.length - 1] !== '/' && sourceURL[0] !== '/') {
                sourceRoot += '/';
            }
            sourceURL = sourceRoot + sourceURL;
        }
        if (sourceMapURL) {
            var parsed = urlParse(sourceMapURL);
            if (!parsed) {
                throw new Error('sourceMapURL could not be parsed');
            }
            if (parsed.path) {
                var index = parsed.path.lastIndexOf('/');
                if (index >= 0) {
                    parsed.path = parsed.path.substring(0, index + 1);
                }
            }
            sourceURL = join(urlGenerate(parsed), sourceURL);
        }
        return normalize(sourceURL);
    }

    return {
        toSetString : supportsNullProto ? identity : toSetString,
        fromSetString : supportsNullProto ? identity : fromSetString,
        compareByOriginalPositions,

        isAbsolute,
        compareByGeneratedPositionsDeflated,
        compareByGeneratedPositionsInflated,
        parseSourceMapInput,
        getArg,
        urlParse,
        urlGenerate,
        normalize,
        join,
        relative,
        computeSourceURL
    };
});