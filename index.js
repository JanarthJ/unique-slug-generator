exports.getRandomSlug = function() {
    let milliseconds = new Date().getTime();
    let timestamp = (milliseconds.toString()).substring(9, 13)
    let random = ("" + Math.random()).substring(2, 8);
    let random_number = timestamp+random;
   
    // string will be unique because timestamp never repeat itself
    let random_string = base64_encoding(random_number).substring(2, 8);
    // you can set size here of return string
    let return_string = '';
    let Exp = /((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i;
    if (random_string.match(Exp)) {                 //check here whether string is alphanumeric or not
        return_string = random_string; 
    } else {
      return exports.getRandomSlug();
    }
     
    return return_string;
}

function base64_encoding (stringToEncode) {
    const encodeUTF8string = function (str) {

    return encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
      function toSolidBytes (match, p1) {
        return String.fromCharCode('0x' + p1)
      })
  }
  if (typeof window !== 'undefined') {
    if (typeof window.btoa !== 'undefined') {
      return window.btoa(encodeUTF8string(stringToEncode))
    }
  } else {
    return new Buffer(stringToEncode).toString('base64')
  }
  const base64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
  let o1;
  let o2;
  let o3;
  let h1;
  let h2;
  let h3;
  let h4;
  let bits;
  let i = 0;
  let ac = 0;
  let enc = '';
  const tmpArr = [];
  if (!stringToEncode) {
    return stringToEncode
  }
  stringToEncode = encodeUTF8string(stringToEncode)
  do {
    // pack three octets into four hexets
    o1 = stringToEncode.charCodeAt(i++)
    o2 = stringToEncode.charCodeAt(i++)
    o3 = stringToEncode.charCodeAt(i++)
    bits = o1 << 16 | o2 << 8 | o3
    h1 = bits >> 18 & 0x3f
    h2 = bits >> 12 & 0x3f
    h3 = bits >> 6 & 0x3f
    h4 = bits & 0x3f
    // use hexets to index into base64, and append result to encoded string
    tmpArr[ac++] = base64.charAt(h1) + base64.charAt(h2) + base64.charAt(h3) + base64.charAt(h4)
  } while (i < stringToEncode.length)
  enc = tmpArr.join('')
  const r = stringToEncode.length % 3
  return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3)
}
