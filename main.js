/**
 * main.js
 */

// 全角を2文字分、半角を1文字分としてカウント
// 参考 http://kihon-no-ki.com/javascript-count-multi-byte-characters-as-two-single-byte-one
var countChar = function(str) {
    len = 0;
    str = escape(str);
    for (i = 0; i < str.length; i++, len++) {
        if (str.charAt(i) == "%") {
            if (str.charAt(++i) == "u") {
                i += 3;
                len++;
            }
            i++;
        }
    }
    return len;
};

// HTMLエスケープ
// 参考 http://www.techscore.com/blog/2013/10/15/javascript%E3%81%AE%E3%82%A8%E3%82%B9%E3%82%B1%E3%83%BC%E3%83%97%E3%81%82%E3%82%8C%E3%81%93%E3%82%8C/
var escapeHTML = function(html) {
    return $('<div>').text(html).html();
};

// Lを超えないsubstrを取得
var substrBefore = function(line, L) {
    var strPrev;
    for (var i = 1, _l = line.length; i < _l; i++) {
        var str = line.substr(0, i);
        var len = countChar(str);
        if (L < len) {
            return strPrev;
        }
        strPrev = str;
    }
    return str;
};

// Lを超えるsubstrを取得
var substrAfter = function(line, L) {
    for (var i = 1, _l = line.length; i < _l; i++) {
        var str = line.substr(0, i);
        var len = countChar(str);
        if (L < len) {
            return line.substr(i);
        }
    }
    return '';
};

// 表示
var disp = function() {
    var L = Number($('#l').val()) || 0;
    var res = '';
    var lines = $('textarea#src').val().split('\n');
    for (var i = 0, _l = lines.length; i < _l; i++) {
        var line = lines[i];
        if (countChar(line) <= L) {
            append = escapeHTML(line) + '<br>';
        } else {
            append = '<span style="color:#c00;">' + escapeHTML(substrBefore(line, L)) + '</span>'
                   + '<span style="color:#fff;background-color:#c00;">' + escapeHTML(substrAfter(line, L)) + '</span><br>';
        }
        res += append;
    }
    $('div#dst').html(res);
};

$(document).ready(function() {
    $('textarea#src').bind('input propertychange', disp);
    $('input#l').bind('keyup mouseup', disp);
});
