/*common*/
/**
 * https://gist.github.com/WebReflection/df05641bd04954f6d366
 */
// with predefined object (preferred)
function escape(s) {
  var escaped = {
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  };
  return s.replace(/[<>'"]/g, function (m) {
    return escaped[m];
  });
}

// with predefined object specific
// for HTML entities only
function unescape(s) {
  var re = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34);/g;
  var unescaped = {
    '&amp;': '&',
    '&#38;': '&',
    '&lt;': '<',
    '&#60;': '<',
    '&gt;': '>',
    '&#62;': '>',
    '&apos;': "'",
    '&#39;': "'",
    '&quot;': '"',
    '&#34;': '"'
  };
  return s.replace(re, function (m) {
    return unescaped[m];
  });
}

exports.escape = escape
exports.unescape = unescape
