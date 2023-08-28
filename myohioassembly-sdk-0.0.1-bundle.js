(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.myohioassembly = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}

},{}],2:[function(require,module,exports){
(function (Buffer){(function (){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

var K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = { __proto__: Uint8Array.prototype, foo: function () { return 42 } }
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.buffer
  }
})

Object.defineProperty(Buffer.prototype, 'offset', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.byteOffset
  }
})

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('The value "' + length + '" is invalid for option "size"')
  }
  // Return an augmented `Uint8Array` instance
  var buf = new Uint8Array(length)
  buf.__proto__ = Buffer.prototype
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new TypeError(
        'The "string" argument must be of type string. Received type number'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
if (typeof Symbol !== 'undefined' && Symbol.species != null &&
    Buffer[Symbol.species] === Buffer) {
  Object.defineProperty(Buffer, Symbol.species, {
    value: null,
    configurable: true,
    enumerable: false,
    writable: false
  })
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  if (ArrayBuffer.isView(value)) {
    return fromArrayLike(value)
  }

  if (value == null) {
    throw TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
      'or Array-like Object. Received type ' + (typeof value)
    )
  }

  if (isInstance(value, ArrayBuffer) ||
      (value && isInstance(value.buffer, ArrayBuffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'number') {
    throw new TypeError(
      'The "value" argument must not be of type number. Received type number'
    )
  }

  var valueOf = value.valueOf && value.valueOf()
  if (valueOf != null && valueOf !== value) {
    return Buffer.from(valueOf, encodingOrOffset, length)
  }

  var b = fromObject(value)
  if (b) return b

  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
      typeof value[Symbol.toPrimitive] === 'function') {
    return Buffer.from(
      value[Symbol.toPrimitive]('string'), encodingOrOffset, length
    )
  }

  throw new TypeError(
    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
    'or Array-like Object. Received type ' + (typeof value)
  )
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Buffer.prototype.__proto__ = Uint8Array.prototype
Buffer.__proto__ = Uint8Array

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number')
  } else if (size < 0) {
    throw new RangeError('The value "' + size + '" is invalid for option "size"')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding)
  }

  var length = byteLength(string, encoding) | 0
  var buf = createBuffer(length)

  var actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  var buf = createBuffer(length)
  for (var i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds')
  }

  var buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  buf.__proto__ = Buffer.prototype
  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    var buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj.length !== undefined) {
    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
      return createBuffer(0)
    }
    return fromArrayLike(obj)
  }

  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data)
  }
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true &&
    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
}

Buffer.compare = function compare (a, b) {
  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)
  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    )
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (isInstance(buf, Uint8Array)) {
      buf = Buffer.from(buf)
    }
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    throw new TypeError(
      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
      'Received type ' + typeof string
    )
  }

  var len = string.length
  var mustMatch = (arguments.length > 2 && arguments[2] === true)
  if (!mustMatch && len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) {
          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
        }
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.toLocaleString = Buffer.prototype.toString

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()
  if (this.length > max) str += ' ... '
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength)
  }
  if (!Buffer.isBuffer(target)) {
    throw new TypeError(
      'The "target" argument must be one of type Buffer or Uint8Array. ' +
      'Received type ' + (typeof target)
    )
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  var strLen = string.length

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
        : (firstByte > 0xBF) ? 2
          : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  newBuf.__proto__ = Buffer.prototype
  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end)
  } else if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (var i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, end),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if ((encoding === 'utf8' && code < 128) ||
          encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : Buffer.from(val, encoding)
    var len = bytes.length
    if (len === 0) {
      throw new TypeError('The value "' + val +
        '" is invalid for argument "value"')
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0]
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance (obj, type) {
  return obj instanceof type ||
    (obj != null && obj.constructor != null && obj.constructor.name != null &&
      obj.constructor.name === type.name)
}
function numberIsNaN (obj) {
  // For IE11 support
  return obj !== obj // eslint-disable-line no-self-compare
}

}).call(this)}).call(this,require("buffer").Buffer)
},{"base64-js":1,"buffer":2,"ieee754":3}],3:[function(require,module,exports){
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],4:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

},{}],5:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};

},{}],6:[function(require,module,exports){
'use strict';

exports.decode = exports.parse = require('./decode');
exports.encode = exports.stringify = require('./encode');

},{"./decode":4,"./encode":5}],7:[function(require,module,exports){

},{}],8:[function(require,module,exports){

/**
 * Expose `Emitter`.
 */

if (typeof module !== 'undefined') {
  module.exports = Emitter;
}

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }

  // Remove event specific arrays for event types that no
  // one is subscribed for to avoid memory leak.
  if (callbacks.length === 0) {
    delete this._callbacks['$' + event];
  }

  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};

  var args = new Array(arguments.length - 1)
    , callbacks = this._callbacks['$' + event];

  for (var i = 1; i < arguments.length; i++) {
    args[i - 1] = arguments[i];
  }

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};

},{}],9:[function(require,module,exports){
module.exports = stringify
stringify.default = stringify
stringify.stable = deterministicStringify
stringify.stableStringify = deterministicStringify

var LIMIT_REPLACE_NODE = '[...]'
var CIRCULAR_REPLACE_NODE = '[Circular]'

var arr = []
var replacerStack = []

function defaultOptions () {
  return {
    depthLimit: Number.MAX_SAFE_INTEGER,
    edgesLimit: Number.MAX_SAFE_INTEGER
  }
}

// Regular stringify
function stringify (obj, replacer, spacer, options) {
  if (typeof options === 'undefined') {
    options = defaultOptions()
  }

  decirc(obj, '', 0, [], undefined, 0, options)
  var res
  try {
    if (replacerStack.length === 0) {
      res = JSON.stringify(obj, replacer, spacer)
    } else {
      res = JSON.stringify(obj, replaceGetterValues(replacer), spacer)
    }
  } catch (_) {
    return JSON.stringify('[unable to serialize, circular reference is too complex to analyze]')
  } finally {
    while (arr.length !== 0) {
      var part = arr.pop()
      if (part.length === 4) {
        Object.defineProperty(part[0], part[1], part[3])
      } else {
        part[0][part[1]] = part[2]
      }
    }
  }
  return res
}

function setReplace (replace, val, k, parent) {
  var propertyDescriptor = Object.getOwnPropertyDescriptor(parent, k)
  if (propertyDescriptor.get !== undefined) {
    if (propertyDescriptor.configurable) {
      Object.defineProperty(parent, k, { value: replace })
      arr.push([parent, k, val, propertyDescriptor])
    } else {
      replacerStack.push([val, k, replace])
    }
  } else {
    parent[k] = replace
    arr.push([parent, k, val])
  }
}

function decirc (val, k, edgeIndex, stack, parent, depth, options) {
  depth += 1
  var i
  if (typeof val === 'object' && val !== null) {
    for (i = 0; i < stack.length; i++) {
      if (stack[i] === val) {
        setReplace(CIRCULAR_REPLACE_NODE, val, k, parent)
        return
      }
    }

    if (
      typeof options.depthLimit !== 'undefined' &&
      depth > options.depthLimit
    ) {
      setReplace(LIMIT_REPLACE_NODE, val, k, parent)
      return
    }

    if (
      typeof options.edgesLimit !== 'undefined' &&
      edgeIndex + 1 > options.edgesLimit
    ) {
      setReplace(LIMIT_REPLACE_NODE, val, k, parent)
      return
    }

    stack.push(val)
    // Optimize for Arrays. Big arrays could kill the performance otherwise!
    if (Array.isArray(val)) {
      for (i = 0; i < val.length; i++) {
        decirc(val[i], i, i, stack, val, depth, options)
      }
    } else {
      var keys = Object.keys(val)
      for (i = 0; i < keys.length; i++) {
        var key = keys[i]
        decirc(val[key], key, i, stack, val, depth, options)
      }
    }
    stack.pop()
  }
}

// Stable-stringify
function compareFunction (a, b) {
  if (a < b) {
    return -1
  }
  if (a > b) {
    return 1
  }
  return 0
}

function deterministicStringify (obj, replacer, spacer, options) {
  if (typeof options === 'undefined') {
    options = defaultOptions()
  }

  var tmp = deterministicDecirc(obj, '', 0, [], undefined, 0, options) || obj
  var res
  try {
    if (replacerStack.length === 0) {
      res = JSON.stringify(tmp, replacer, spacer)
    } else {
      res = JSON.stringify(tmp, replaceGetterValues(replacer), spacer)
    }
  } catch (_) {
    return JSON.stringify('[unable to serialize, circular reference is too complex to analyze]')
  } finally {
    // Ensure that we restore the object as it was.
    while (arr.length !== 0) {
      var part = arr.pop()
      if (part.length === 4) {
        Object.defineProperty(part[0], part[1], part[3])
      } else {
        part[0][part[1]] = part[2]
      }
    }
  }
  return res
}

function deterministicDecirc (val, k, edgeIndex, stack, parent, depth, options) {
  depth += 1
  var i
  if (typeof val === 'object' && val !== null) {
    for (i = 0; i < stack.length; i++) {
      if (stack[i] === val) {
        setReplace(CIRCULAR_REPLACE_NODE, val, k, parent)
        return
      }
    }
    try {
      if (typeof val.toJSON === 'function') {
        return
      }
    } catch (_) {
      return
    }

    if (
      typeof options.depthLimit !== 'undefined' &&
      depth > options.depthLimit
    ) {
      setReplace(LIMIT_REPLACE_NODE, val, k, parent)
      return
    }

    if (
      typeof options.edgesLimit !== 'undefined' &&
      edgeIndex + 1 > options.edgesLimit
    ) {
      setReplace(LIMIT_REPLACE_NODE, val, k, parent)
      return
    }

    stack.push(val)
    // Optimize for Arrays. Big arrays could kill the performance otherwise!
    if (Array.isArray(val)) {
      for (i = 0; i < val.length; i++) {
        deterministicDecirc(val[i], i, i, stack, val, depth, options)
      }
    } else {
      // Create a temporary object in the required way
      var tmp = {}
      var keys = Object.keys(val).sort(compareFunction)
      for (i = 0; i < keys.length; i++) {
        var key = keys[i]
        deterministicDecirc(val[key], key, i, stack, val, depth, options)
        tmp[key] = val[key]
      }
      if (typeof parent !== 'undefined') {
        arr.push([parent, k, val])
        parent[k] = tmp
      } else {
        return tmp
      }
    }
    stack.pop()
  }
}

// wraps replacer function to handle values we couldn't replace
// and mark them as replaced value
function replaceGetterValues (replacer) {
  replacer =
    typeof replacer !== 'undefined'
      ? replacer
      : function (k, v) {
        return v
      }
  return function (key, val) {
    if (replacerStack.length > 0) {
      for (var i = 0; i < replacerStack.length; i++) {
        var part = replacerStack[i]
        if (part[1] === key && part[0] === val) {
          val = part[2]
          replacerStack.splice(i, 1)
          break
        }
      }
    }
    return replacer.call(this, key, val)
  }
}

},{}],10:[function(require,module,exports){
"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function Agent() {
  this._defaults = [];
}

['use', 'on', 'once', 'set', 'query', 'type', 'accept', 'auth', 'withCredentials', 'sortQuery', 'retry', 'ok', 'redirects', 'timeout', 'buffer', 'serialize', 'parse', 'ca', 'key', 'pfx', 'cert', 'disableTLSCerts'].forEach(function (fn) {
  // Default setting for all requests from this agent
  Agent.prototype[fn] = function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    this._defaults.push({
      fn: fn,
      args: args
    });

    return this;
  };
});

Agent.prototype._setDefaults = function (req) {
  this._defaults.forEach(function (def) {
    req[def.fn].apply(req, _toConsumableArray(def.args));
  });
};

module.exports = Agent;

},{}],11:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Root reference for iframes.
 */
var root;

if (typeof window !== 'undefined') {
  // Browser window
  root = window;
} else if (typeof self === 'undefined') {
  // Other environments
  console.warn('Using browser-only version of superagent in non-browser environment');
  root = void 0;
} else {
  // Web Worker
  root = self;
}

var Emitter = require('component-emitter');

var safeStringify = require('fast-safe-stringify');

var RequestBase = require('./request-base');

var isObject = require('./is-object');

var ResponseBase = require('./response-base');

var Agent = require('./agent-base');
/**
 * Noop.
 */


function noop() {}
/**
 * Expose `request`.
 */


module.exports = function (method, url) {
  // callback
  if (typeof url === 'function') {
    return new exports.Request('GET', method).end(url);
  } // url first


  if (arguments.length === 1) {
    return new exports.Request('GET', method);
  }

  return new exports.Request(method, url);
};

exports = module.exports;
var request = exports;
exports.Request = Request;
/**
 * Determine XHR.
 */

request.getXHR = function () {
  if (root.XMLHttpRequest && (!root.location || root.location.protocol !== 'file:' || !root.ActiveXObject)) {
    return new XMLHttpRequest();
  }

  try {
    return new ActiveXObject('Microsoft.XMLHTTP');
  } catch (_unused) {}

  try {
    return new ActiveXObject('Msxml2.XMLHTTP.6.0');
  } catch (_unused2) {}

  try {
    return new ActiveXObject('Msxml2.XMLHTTP.3.0');
  } catch (_unused3) {}

  try {
    return new ActiveXObject('Msxml2.XMLHTTP');
  } catch (_unused4) {}

  throw new Error('Browser-only version of superagent could not find XHR');
};
/**
 * Removes leading and trailing whitespace, added to support IE.
 *
 * @param {String} s
 * @return {String}
 * @api private
 */


var trim = ''.trim ? function (s) {
  return s.trim();
} : function (s) {
  return s.replace(/(^\s*|\s*$)/g, '');
};
/**
 * Serialize the given `obj`.
 *
 * @param {Object} obj
 * @return {String}
 * @api private
 */

function serialize(obj) {
  if (!isObject(obj)) return obj;
  var pairs = [];

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) pushEncodedKeyValuePair(pairs, key, obj[key]);
  }

  return pairs.join('&');
}
/**
 * Helps 'serialize' with serializing arrays.
 * Mutates the pairs array.
 *
 * @param {Array} pairs
 * @param {String} key
 * @param {Mixed} val
 */


function pushEncodedKeyValuePair(pairs, key, val) {
  if (val === undefined) return;

  if (val === null) {
    pairs.push(encodeURI(key));
    return;
  }

  if (Array.isArray(val)) {
    val.forEach(function (v) {
      pushEncodedKeyValuePair(pairs, key, v);
    });
  } else if (isObject(val)) {
    for (var subkey in val) {
      if (Object.prototype.hasOwnProperty.call(val, subkey)) pushEncodedKeyValuePair(pairs, "".concat(key, "[").concat(subkey, "]"), val[subkey]);
    }
  } else {
    pairs.push(encodeURI(key) + '=' + encodeURIComponent(val));
  }
}
/**
 * Expose serialization method.
 */


request.serializeObject = serialize;
/**
 * Parse the given x-www-form-urlencoded `str`.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function parseString(str) {
  var obj = {};
  var pairs = str.split('&');
  var pair;
  var pos;

  for (var i = 0, len = pairs.length; i < len; ++i) {
    pair = pairs[i];
    pos = pair.indexOf('=');

    if (pos === -1) {
      obj[decodeURIComponent(pair)] = '';
    } else {
      obj[decodeURIComponent(pair.slice(0, pos))] = decodeURIComponent(pair.slice(pos + 1));
    }
  }

  return obj;
}
/**
 * Expose parser.
 */


request.parseString = parseString;
/**
 * Default MIME type map.
 *
 *     superagent.types.xml = 'application/xml';
 *
 */

request.types = {
  html: 'text/html',
  json: 'application/json',
  xml: 'text/xml',
  urlencoded: 'application/x-www-form-urlencoded',
  form: 'application/x-www-form-urlencoded',
  'form-data': 'application/x-www-form-urlencoded'
};
/**
 * Default serialization map.
 *
 *     superagent.serialize['application/xml'] = function(obj){
 *       return 'generated xml here';
 *     };
 *
 */

request.serialize = {
  'application/x-www-form-urlencoded': serialize,
  'application/json': safeStringify
};
/**
 * Default parsers.
 *
 *     superagent.parse['application/xml'] = function(str){
 *       return { object parsed from str };
 *     };
 *
 */

request.parse = {
  'application/x-www-form-urlencoded': parseString,
  'application/json': JSON.parse
};
/**
 * Parse the given header `str` into
 * an object containing the mapped fields.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function parseHeader(str) {
  var lines = str.split(/\r?\n/);
  var fields = {};
  var index;
  var line;
  var field;
  var val;

  for (var i = 0, len = lines.length; i < len; ++i) {
    line = lines[i];
    index = line.indexOf(':');

    if (index === -1) {
      // could be empty line, just skip it
      continue;
    }

    field = line.slice(0, index).toLowerCase();
    val = trim(line.slice(index + 1));
    fields[field] = val;
  }

  return fields;
}
/**
 * Check if `mime` is json or has +json structured syntax suffix.
 *
 * @param {String} mime
 * @return {Boolean}
 * @api private
 */


function isJSON(mime) {
  // should match /json or +json
  // but not /json-seq
  return /[/+]json($|[^-\w])/.test(mime);
}
/**
 * Initialize a new `Response` with the given `xhr`.
 *
 *  - set flags (.ok, .error, etc)
 *  - parse header
 *
 * Examples:
 *
 *  Aliasing `superagent` as `request` is nice:
 *
 *      request = superagent;
 *
 *  We can use the promise-like API, or pass callbacks:
 *
 *      request.get('/').end(function(res){});
 *      request.get('/', function(res){});
 *
 *  Sending data can be chained:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' })
 *        .end(function(res){});
 *
 *  Or passed to `.send()`:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' }, function(res){});
 *
 *  Or passed to `.post()`:
 *
 *      request
 *        .post('/user', { name: 'tj' })
 *        .end(function(res){});
 *
 * Or further reduced to a single call for simple cases:
 *
 *      request
 *        .post('/user', { name: 'tj' }, function(res){});
 *
 * @param {XMLHTTPRequest} xhr
 * @param {Object} options
 * @api private
 */


function Response(req) {
  this.req = req;
  this.xhr = this.req.xhr; // responseText is accessible only if responseType is '' or 'text' and on older browsers

  this.text = this.req.method !== 'HEAD' && (this.xhr.responseType === '' || this.xhr.responseType === 'text') || typeof this.xhr.responseType === 'undefined' ? this.xhr.responseText : null;
  this.statusText = this.req.xhr.statusText;
  var status = this.xhr.status; // handle IE9 bug: http://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request

  if (status === 1223) {
    status = 204;
  }

  this._setStatusProperties(status);

  this.headers = parseHeader(this.xhr.getAllResponseHeaders());
  this.header = this.headers; // getAllResponseHeaders sometimes falsely returns "" for CORS requests, but
  // getResponseHeader still works. so we get content-type even if getting
  // other headers fails.

  this.header['content-type'] = this.xhr.getResponseHeader('content-type');

  this._setHeaderProperties(this.header);

  if (this.text === null && req._responseType) {
    this.body = this.xhr.response;
  } else {
    this.body = this.req.method === 'HEAD' ? null : this._parseBody(this.text ? this.text : this.xhr.response);
  }
} // eslint-disable-next-line new-cap


ResponseBase(Response.prototype);
/**
 * Parse the given body `str`.
 *
 * Used for auto-parsing of bodies. Parsers
 * are defined on the `superagent.parse` object.
 *
 * @param {String} str
 * @return {Mixed}
 * @api private
 */

Response.prototype._parseBody = function (str) {
  var parse = request.parse[this.type];

  if (this.req._parser) {
    return this.req._parser(this, str);
  }

  if (!parse && isJSON(this.type)) {
    parse = request.parse['application/json'];
  }

  return parse && str && (str.length > 0 || str instanceof Object) ? parse(str) : null;
};
/**
 * Return an `Error` representative of this response.
 *
 * @return {Error}
 * @api public
 */


Response.prototype.toError = function () {
  var req = this.req;
  var method = req.method;
  var url = req.url;
  var msg = "cannot ".concat(method, " ").concat(url, " (").concat(this.status, ")");
  var err = new Error(msg);
  err.status = this.status;
  err.method = method;
  err.url = url;
  return err;
};
/**
 * Expose `Response`.
 */


request.Response = Response;
/**
 * Initialize a new `Request` with the given `method` and `url`.
 *
 * @param {String} method
 * @param {String} url
 * @api public
 */

function Request(method, url) {
  var self = this;
  this._query = this._query || [];
  this.method = method;
  this.url = url;
  this.header = {}; // preserves header name case

  this._header = {}; // coerces header names to lowercase

  this.on('end', function () {
    var err = null;
    var res = null;

    try {
      res = new Response(self);
    } catch (err_) {
      err = new Error('Parser is unable to parse the response');
      err.parse = true;
      err.original = err_; // issue #675: return the raw response if the response parsing fails

      if (self.xhr) {
        // ie9 doesn't have 'response' property
        err.rawResponse = typeof self.xhr.responseType === 'undefined' ? self.xhr.responseText : self.xhr.response; // issue #876: return the http status code if the response parsing fails

        err.status = self.xhr.status ? self.xhr.status : null;
        err.statusCode = err.status; // backwards-compat only
      } else {
        err.rawResponse = null;
        err.status = null;
      }

      return self.callback(err);
    }

    self.emit('response', res);
    var new_err;

    try {
      if (!self._isResponseOK(res)) {
        new_err = new Error(res.statusText || res.text || 'Unsuccessful HTTP response');
      }
    } catch (err_) {
      new_err = err_; // ok() callback can throw
    } // #1000 don't catch errors from the callback to avoid double calling it


    if (new_err) {
      new_err.original = err;
      new_err.response = res;
      new_err.status = res.status;
      self.callback(new_err, res);
    } else {
      self.callback(null, res);
    }
  });
}
/**
 * Mixin `Emitter` and `RequestBase`.
 */
// eslint-disable-next-line new-cap


Emitter(Request.prototype); // eslint-disable-next-line new-cap

RequestBase(Request.prototype);
/**
 * Set Content-Type to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.xml = 'application/xml';
 *
 *      request.post('/')
 *        .type('xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 *      request.post('/')
 *        .type('application/xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 * @param {String} type
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.type = function (type) {
  this.set('Content-Type', request.types[type] || type);
  return this;
};
/**
 * Set Accept to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.json = 'application/json';
 *
 *      request.get('/agent')
 *        .accept('json')
 *        .end(callback);
 *
 *      request.get('/agent')
 *        .accept('application/json')
 *        .end(callback);
 *
 * @param {String} accept
 * @return {Request} for chaining
 * @api public
 */


Request.prototype.accept = function (type) {
  this.set('Accept', request.types[type] || type);
  return this;
};
/**
 * Set Authorization field value with `user` and `pass`.
 *
 * @param {String} user
 * @param {String} [pass] optional in case of using 'bearer' as type
 * @param {Object} options with 'type' property 'auto', 'basic' or 'bearer' (default 'basic')
 * @return {Request} for chaining
 * @api public
 */


Request.prototype.auth = function (user, pass, options) {
  if (arguments.length === 1) pass = '';

  if (_typeof(pass) === 'object' && pass !== null) {
    // pass is optional and can be replaced with options
    options = pass;
    pass = '';
  }

  if (!options) {
    options = {
      type: typeof btoa === 'function' ? 'basic' : 'auto'
    };
  }

  var encoder = function encoder(string) {
    if (typeof btoa === 'function') {
      return btoa(string);
    }

    throw new Error('Cannot use basic auth, btoa is not a function');
  };

  return this._auth(user, pass, options, encoder);
};
/**
 * Add query-string `val`.
 *
 * Examples:
 *
 *   request.get('/shoes')
 *     .query('size=10')
 *     .query({ color: 'blue' })
 *
 * @param {Object|String} val
 * @return {Request} for chaining
 * @api public
 */


Request.prototype.query = function (val) {
  if (typeof val !== 'string') val = serialize(val);
  if (val) this._query.push(val);
  return this;
};
/**
 * Queue the given `file` as an attachment to the specified `field`,
 * with optional `options` (or filename).
 *
 * ``` js
 * request.post('/upload')
 *   .attach('content', new Blob(['<a id="a"><b id="b">hey!</b></a>'], { type: "text/html"}))
 *   .end(callback);
 * ```
 *
 * @param {String} field
 * @param {Blob|File} file
 * @param {String|Object} options
 * @return {Request} for chaining
 * @api public
 */


Request.prototype.attach = function (field, file, options) {
  if (file) {
    if (this._data) {
      throw new Error("superagent can't mix .send() and .attach()");
    }

    this._getFormData().append(field, file, options || file.name);
  }

  return this;
};

Request.prototype._getFormData = function () {
  if (!this._formData) {
    this._formData = new root.FormData();
  }

  return this._formData;
};
/**
 * Invoke the callback with `err` and `res`
 * and handle arity check.
 *
 * @param {Error} err
 * @param {Response} res
 * @api private
 */


Request.prototype.callback = function (err, res) {
  if (this._shouldRetry(err, res)) {
    return this._retry();
  }

  var fn = this._callback;
  this.clearTimeout();

  if (err) {
    if (this._maxRetries) err.retries = this._retries - 1;
    this.emit('error', err);
  }

  fn(err, res);
};
/**
 * Invoke callback with x-domain error.
 *
 * @api private
 */


Request.prototype.crossDomainError = function () {
  var err = new Error('Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.');
  err.crossDomain = true;
  err.status = this.status;
  err.method = this.method;
  err.url = this.url;
  this.callback(err);
}; // This only warns, because the request is still likely to work


Request.prototype.agent = function () {
  console.warn('This is not supported in browser version of superagent');
  return this;
};

Request.prototype.ca = Request.prototype.agent;
Request.prototype.buffer = Request.prototype.ca; // This throws, because it can't send/receive data as expected

Request.prototype.write = function () {
  throw new Error('Streaming is not supported in browser version of superagent');
};

Request.prototype.pipe = Request.prototype.write;
/**
 * Check if `obj` is a host object,
 * we don't want to serialize these :)
 *
 * @param {Object} obj host object
 * @return {Boolean} is a host object
 * @api private
 */

Request.prototype._isHost = function (obj) {
  // Native objects stringify to [object File], [object Blob], [object FormData], etc.
  return obj && _typeof(obj) === 'object' && !Array.isArray(obj) && Object.prototype.toString.call(obj) !== '[object Object]';
};
/**
 * Initiate request, invoking callback `fn(res)`
 * with an instanceof `Response`.
 *
 * @param {Function} fn
 * @return {Request} for chaining
 * @api public
 */


Request.prototype.end = function (fn) {
  if (this._endCalled) {
    console.warn('Warning: .end() was called twice. This is not supported in superagent');
  }

  this._endCalled = true; // store callback

  this._callback = fn || noop; // querystring

  this._finalizeQueryString();

  this._end();
};

Request.prototype._setUploadTimeout = function () {
  var self = this; // upload timeout it's wokrs only if deadline timeout is off

  if (this._uploadTimeout && !this._uploadTimeoutTimer) {
    this._uploadTimeoutTimer = setTimeout(function () {
      self._timeoutError('Upload timeout of ', self._uploadTimeout, 'ETIMEDOUT');
    }, this._uploadTimeout);
  }
}; // eslint-disable-next-line complexity


Request.prototype._end = function () {
  if (this._aborted) return this.callback(new Error('The request has been aborted even before .end() was called'));
  var self = this;
  this.xhr = request.getXHR();
  var xhr = this.xhr;
  var data = this._formData || this._data;

  this._setTimeouts(); // state change


  xhr.onreadystatechange = function () {
    var readyState = xhr.readyState;

    if (readyState >= 2 && self._responseTimeoutTimer) {
      clearTimeout(self._responseTimeoutTimer);
    }

    if (readyState !== 4) {
      return;
    } // In IE9, reads to any property (e.g. status) off of an aborted XHR will
    // result in the error "Could not complete the operation due to error c00c023f"


    var status;

    try {
      status = xhr.status;
    } catch (_unused5) {
      status = 0;
    }

    if (!status) {
      if (self.timedout || self._aborted) return;
      return self.crossDomainError();
    }

    self.emit('end');
  }; // progress


  var handleProgress = function handleProgress(direction, e) {
    if (e.total > 0) {
      e.percent = e.loaded / e.total * 100;

      if (e.percent === 100) {
        clearTimeout(self._uploadTimeoutTimer);
      }
    }

    e.direction = direction;
    self.emit('progress', e);
  };

  if (this.hasListeners('progress')) {
    try {
      xhr.addEventListener('progress', handleProgress.bind(null, 'download'));

      if (xhr.upload) {
        xhr.upload.addEventListener('progress', handleProgress.bind(null, 'upload'));
      }
    } catch (_unused6) {// Accessing xhr.upload fails in IE from a web worker, so just pretend it doesn't exist.
      // Reported here:
      // https://connect.microsoft.com/IE/feedback/details/837245/xmlhttprequest-upload-throws-invalid-argument-when-used-from-web-worker-context
    }
  }

  if (xhr.upload) {
    this._setUploadTimeout();
  } // initiate request


  try {
    if (this.username && this.password) {
      xhr.open(this.method, this.url, true, this.username, this.password);
    } else {
      xhr.open(this.method, this.url, true);
    }
  } catch (err) {
    // see #1149
    return this.callback(err);
  } // CORS


  if (this._withCredentials) xhr.withCredentials = true; // body

  if (!this._formData && this.method !== 'GET' && this.method !== 'HEAD' && typeof data !== 'string' && !this._isHost(data)) {
    // serialize stuff
    var contentType = this._header['content-type'];

    var _serialize = this._serializer || request.serialize[contentType ? contentType.split(';')[0] : ''];

    if (!_serialize && isJSON(contentType)) {
      _serialize = request.serialize['application/json'];
    }

    if (_serialize) data = _serialize(data);
  } // set header fields


  for (var field in this.header) {
    if (this.header[field] === null) continue;
    if (Object.prototype.hasOwnProperty.call(this.header, field)) xhr.setRequestHeader(field, this.header[field]);
  }

  if (this._responseType) {
    xhr.responseType = this._responseType;
  } // send stuff


  this.emit('request', this); // IE11 xhr.send(undefined) sends 'undefined' string as POST payload (instead of nothing)
  // We need null here if data is undefined

  xhr.send(typeof data === 'undefined' ? null : data);
};

request.agent = function () {
  return new Agent();
};

['GET', 'POST', 'OPTIONS', 'PATCH', 'PUT', 'DELETE'].forEach(function (method) {
  Agent.prototype[method.toLowerCase()] = function (url, fn) {
    var req = new request.Request(method, url);

    this._setDefaults(req);

    if (fn) {
      req.end(fn);
    }

    return req;
  };
});
Agent.prototype.del = Agent.prototype.delete;
/**
 * GET `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.get = function (url, data, fn) {
  var req = request('GET', url);

  if (typeof data === 'function') {
    fn = data;
    data = null;
  }

  if (data) req.query(data);
  if (fn) req.end(fn);
  return req;
};
/**
 * HEAD `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */


request.head = function (url, data, fn) {
  var req = request('HEAD', url);

  if (typeof data === 'function') {
    fn = data;
    data = null;
  }

  if (data) req.query(data);
  if (fn) req.end(fn);
  return req;
};
/**
 * OPTIONS query to `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */


request.options = function (url, data, fn) {
  var req = request('OPTIONS', url);

  if (typeof data === 'function') {
    fn = data;
    data = null;
  }

  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};
/**
 * DELETE `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} [data]
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */


function del(url, data, fn) {
  var req = request('DELETE', url);

  if (typeof data === 'function') {
    fn = data;
    data = null;
  }

  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
}

request.del = del;
request.delete = del;
/**
 * PATCH `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} [data]
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.patch = function (url, data, fn) {
  var req = request('PATCH', url);

  if (typeof data === 'function') {
    fn = data;
    data = null;
  }

  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};
/**
 * POST `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} [data]
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */


request.post = function (url, data, fn) {
  var req = request('POST', url);

  if (typeof data === 'function') {
    fn = data;
    data = null;
  }

  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};
/**
 * PUT `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */


request.put = function (url, data, fn) {
  var req = request('PUT', url);

  if (typeof data === 'function') {
    fn = data;
    data = null;
  }

  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

},{"./agent-base":10,"./is-object":12,"./request-base":13,"./response-base":14,"component-emitter":8,"fast-safe-stringify":9}],12:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Check if `obj` is an object.
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */
function isObject(obj) {
  return obj !== null && _typeof(obj) === 'object';
}

module.exports = isObject;

},{}],13:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Module of mixed-in functions shared between node and client code
 */
var isObject = require('./is-object');
/**
 * Expose `RequestBase`.
 */


module.exports = RequestBase;
/**
 * Initialize a new `RequestBase`.
 *
 * @api public
 */

function RequestBase(obj) {
  if (obj) return mixin(obj);
}
/**
 * Mixin the prototype properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */


function mixin(obj) {
  for (var key in RequestBase.prototype) {
    if (Object.prototype.hasOwnProperty.call(RequestBase.prototype, key)) obj[key] = RequestBase.prototype[key];
  }

  return obj;
}
/**
 * Clear previous timeout.
 *
 * @return {Request} for chaining
 * @api public
 */


RequestBase.prototype.clearTimeout = function () {
  clearTimeout(this._timer);
  clearTimeout(this._responseTimeoutTimer);
  clearTimeout(this._uploadTimeoutTimer);
  delete this._timer;
  delete this._responseTimeoutTimer;
  delete this._uploadTimeoutTimer;
  return this;
};
/**
 * Override default response body parser
 *
 * This function will be called to convert incoming data into request.body
 *
 * @param {Function}
 * @api public
 */


RequestBase.prototype.parse = function (fn) {
  this._parser = fn;
  return this;
};
/**
 * Set format of binary response body.
 * In browser valid formats are 'blob' and 'arraybuffer',
 * which return Blob and ArrayBuffer, respectively.
 *
 * In Node all values result in Buffer.
 *
 * Examples:
 *
 *      req.get('/')
 *        .responseType('blob')
 *        .end(callback);
 *
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */


RequestBase.prototype.responseType = function (val) {
  this._responseType = val;
  return this;
};
/**
 * Override default request body serializer
 *
 * This function will be called to convert data set via .send or .attach into payload to send
 *
 * @param {Function}
 * @api public
 */


RequestBase.prototype.serialize = function (fn) {
  this._serializer = fn;
  return this;
};
/**
 * Set timeouts.
 *
 * - response timeout is time between sending request and receiving the first byte of the response. Includes DNS and connection time.
 * - deadline is the time from start of the request to receiving response body in full. If the deadline is too short large files may not load at all on slow connections.
 * - upload is the time  since last bit of data was sent or received. This timeout works only if deadline timeout is off
 *
 * Value of 0 or false means no timeout.
 *
 * @param {Number|Object} ms or {response, deadline}
 * @return {Request} for chaining
 * @api public
 */


RequestBase.prototype.timeout = function (options) {
  if (!options || _typeof(options) !== 'object') {
    this._timeout = options;
    this._responseTimeout = 0;
    this._uploadTimeout = 0;
    return this;
  }

  for (var option in options) {
    if (Object.prototype.hasOwnProperty.call(options, option)) {
      switch (option) {
        case 'deadline':
          this._timeout = options.deadline;
          break;

        case 'response':
          this._responseTimeout = options.response;
          break;

        case 'upload':
          this._uploadTimeout = options.upload;
          break;

        default:
          console.warn('Unknown timeout option', option);
      }
    }
  }

  return this;
};
/**
 * Set number of retry attempts on error.
 *
 * Failed requests will be retried 'count' times if timeout or err.code >= 500.
 *
 * @param {Number} count
 * @param {Function} [fn]
 * @return {Request} for chaining
 * @api public
 */


RequestBase.prototype.retry = function (count, fn) {
  // Default to 1 if no count passed or true
  if (arguments.length === 0 || count === true) count = 1;
  if (count <= 0) count = 0;
  this._maxRetries = count;
  this._retries = 0;
  this._retryCallback = fn;
  return this;
};

var ERROR_CODES = ['ECONNRESET', 'ETIMEDOUT', 'EADDRINFO', 'ESOCKETTIMEDOUT'];
/**
 * Determine if a request should be retried.
 * (Borrowed from segmentio/superagent-retry)
 *
 * @param {Error} err an error
 * @param {Response} [res] response
 * @returns {Boolean} if segment should be retried
 */

RequestBase.prototype._shouldRetry = function (err, res) {
  if (!this._maxRetries || this._retries++ >= this._maxRetries) {
    return false;
  }

  if (this._retryCallback) {
    try {
      var override = this._retryCallback(err, res);

      if (override === true) return true;
      if (override === false) return false; // undefined falls back to defaults
    } catch (err_) {
      console.error(err_);
    }
  }

  if (res && res.status && res.status >= 500 && res.status !== 501) return true;

  if (err) {
    if (err.code && ERROR_CODES.includes(err.code)) return true; // Superagent timeout

    if (err.timeout && err.code === 'ECONNABORTED') return true;
    if (err.crossDomain) return true;
  }

  return false;
};
/**
 * Retry request
 *
 * @return {Request} for chaining
 * @api private
 */


RequestBase.prototype._retry = function () {
  this.clearTimeout(); // node

  if (this.req) {
    this.req = null;
    this.req = this.request();
  }

  this._aborted = false;
  this.timedout = false;
  this.timedoutError = null;
  return this._end();
};
/**
 * Promise support
 *
 * @param {Function} resolve
 * @param {Function} [reject]
 * @return {Request}
 */


RequestBase.prototype.then = function (resolve, reject) {
  var _this = this;

  if (!this._fullfilledPromise) {
    var self = this;

    if (this._endCalled) {
      console.warn('Warning: superagent request was sent twice, because both .end() and .then() were called. Never call .end() if you use promises');
    }

    this._fullfilledPromise = new Promise(function (resolve, reject) {
      self.on('abort', function () {
        if (_this._maxRetries && _this._maxRetries > _this._retries) {
          return;
        }

        if (_this.timedout && _this.timedoutError) {
          reject(_this.timedoutError);
          return;
        }

        var err = new Error('Aborted');
        err.code = 'ABORTED';
        err.status = _this.status;
        err.method = _this.method;
        err.url = _this.url;
        reject(err);
      });
      self.end(function (err, res) {
        if (err) reject(err);else resolve(res);
      });
    });
  }

  return this._fullfilledPromise.then(resolve, reject);
};

RequestBase.prototype.catch = function (cb) {
  return this.then(undefined, cb);
};
/**
 * Allow for extension
 */


RequestBase.prototype.use = function (fn) {
  fn(this);
  return this;
};

RequestBase.prototype.ok = function (cb) {
  if (typeof cb !== 'function') throw new Error('Callback required');
  this._okCallback = cb;
  return this;
};

RequestBase.prototype._isResponseOK = function (res) {
  if (!res) {
    return false;
  }

  if (this._okCallback) {
    return this._okCallback(res);
  }

  return res.status >= 200 && res.status < 300;
};
/**
 * Get request header `field`.
 * Case-insensitive.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */


RequestBase.prototype.get = function (field) {
  return this._header[field.toLowerCase()];
};
/**
 * Get case-insensitive header `field` value.
 * This is a deprecated internal API. Use `.get(field)` instead.
 *
 * (getHeader is no longer used internally by the superagent code base)
 *
 * @param {String} field
 * @return {String}
 * @api private
 * @deprecated
 */


RequestBase.prototype.getHeader = RequestBase.prototype.get;
/**
 * Set header `field` to `val`, or multiple fields with one object.
 * Case-insensitive.
 *
 * Examples:
 *
 *      req.get('/')
 *        .set('Accept', 'application/json')
 *        .set('X-API-Key', 'foobar')
 *        .end(callback);
 *
 *      req.get('/')
 *        .set({ Accept: 'application/json', 'X-API-Key': 'foobar' })
 *        .end(callback);
 *
 * @param {String|Object} field
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.set = function (field, val) {
  if (isObject(field)) {
    for (var key in field) {
      if (Object.prototype.hasOwnProperty.call(field, key)) this.set(key, field[key]);
    }

    return this;
  }

  this._header[field.toLowerCase()] = val;
  this.header[field] = val;
  return this;
};
/**
 * Remove header `field`.
 * Case-insensitive.
 *
 * Example:
 *
 *      req.get('/')
 *        .unset('User-Agent')
 *        .end(callback);
 *
 * @param {String} field field name
 */


RequestBase.prototype.unset = function (field) {
  delete this._header[field.toLowerCase()];
  delete this.header[field];
  return this;
};
/**
 * Write the field `name` and `val`, or multiple fields with one object
 * for "multipart/form-data" request bodies.
 *
 * ``` js
 * request.post('/upload')
 *   .field('foo', 'bar')
 *   .end(callback);
 *
 * request.post('/upload')
 *   .field({ foo: 'bar', baz: 'qux' })
 *   .end(callback);
 * ```
 *
 * @param {String|Object} name name of field
 * @param {String|Blob|File|Buffer|fs.ReadStream} val value of field
 * @return {Request} for chaining
 * @api public
 */


RequestBase.prototype.field = function (name, val) {
  // name should be either a string or an object.
  if (name === null || undefined === name) {
    throw new Error('.field(name, val) name can not be empty');
  }

  if (this._data) {
    throw new Error(".field() can't be used if .send() is used. Please use only .send() or only .field() & .attach()");
  }

  if (isObject(name)) {
    for (var key in name) {
      if (Object.prototype.hasOwnProperty.call(name, key)) this.field(key, name[key]);
    }

    return this;
  }

  if (Array.isArray(val)) {
    for (var i in val) {
      if (Object.prototype.hasOwnProperty.call(val, i)) this.field(name, val[i]);
    }

    return this;
  } // val should be defined now


  if (val === null || undefined === val) {
    throw new Error('.field(name, val) val can not be empty');
  }

  if (typeof val === 'boolean') {
    val = String(val);
  }

  this._getFormData().append(name, val);

  return this;
};
/**
 * Abort the request, and clear potential timeout.
 *
 * @return {Request} request
 * @api public
 */


RequestBase.prototype.abort = function () {
  if (this._aborted) {
    return this;
  }

  this._aborted = true;
  if (this.xhr) this.xhr.abort(); // browser

  if (this.req) this.req.abort(); // node

  this.clearTimeout();
  this.emit('abort');
  return this;
};

RequestBase.prototype._auth = function (user, pass, options, base64Encoder) {
  switch (options.type) {
    case 'basic':
      this.set('Authorization', "Basic ".concat(base64Encoder("".concat(user, ":").concat(pass))));
      break;

    case 'auto':
      this.username = user;
      this.password = pass;
      break;

    case 'bearer':
      // usage would be .auth(accessToken, { type: 'bearer' })
      this.set('Authorization', "Bearer ".concat(user));
      break;

    default:
      break;
  }

  return this;
};
/**
 * Enable transmission of cookies with x-domain requests.
 *
 * Note that for this to work the origin must not be
 * using "Access-Control-Allow-Origin" with a wildcard,
 * and also must set "Access-Control-Allow-Credentials"
 * to "true".
 *
 * @api public
 */


RequestBase.prototype.withCredentials = function (on) {
  // This is browser-only functionality. Node side is no-op.
  if (on === undefined) on = true;
  this._withCredentials = on;
  return this;
};
/**
 * Set the max redirects to `n`. Does nothing in browser XHR implementation.
 *
 * @param {Number} n
 * @return {Request} for chaining
 * @api public
 */


RequestBase.prototype.redirects = function (n) {
  this._maxRedirects = n;
  return this;
};
/**
 * Maximum size of buffered response body, in bytes. Counts uncompressed size.
 * Default 200MB.
 *
 * @param {Number} n number of bytes
 * @return {Request} for chaining
 */


RequestBase.prototype.maxResponseSize = function (n) {
  if (typeof n !== 'number') {
    throw new TypeError('Invalid argument');
  }

  this._maxResponseSize = n;
  return this;
};
/**
 * Convert to a plain javascript object (not JSON string) of scalar properties.
 * Note as this method is designed to return a useful non-this value,
 * it cannot be chained.
 *
 * @return {Object} describing method, url, and data of this request
 * @api public
 */


RequestBase.prototype.toJSON = function () {
  return {
    method: this.method,
    url: this.url,
    data: this._data,
    headers: this._header
  };
};
/**
 * Send `data` as the request body, defaulting the `.type()` to "json" when
 * an object is given.
 *
 * Examples:
 *
 *       // manual json
 *       request.post('/user')
 *         .type('json')
 *         .send('{"name":"tj"}')
 *         .end(callback)
 *
 *       // auto json
 *       request.post('/user')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // manual x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send('name=tj')
 *         .end(callback)
 *
 *       // auto x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // defaults to x-www-form-urlencoded
 *      request.post('/user')
 *        .send('name=tobi')
 *        .send('species=ferret')
 *        .end(callback)
 *
 * @param {String|Object} data
 * @return {Request} for chaining
 * @api public
 */
// eslint-disable-next-line complexity


RequestBase.prototype.send = function (data) {
  var isObj = isObject(data);
  var type = this._header['content-type'];

  if (this._formData) {
    throw new Error(".send() can't be used if .attach() or .field() is used. Please use only .send() or only .field() & .attach()");
  }

  if (isObj && !this._data) {
    if (Array.isArray(data)) {
      this._data = [];
    } else if (!this._isHost(data)) {
      this._data = {};
    }
  } else if (data && this._data && this._isHost(this._data)) {
    throw new Error("Can't merge these send calls");
  } // merge


  if (isObj && isObject(this._data)) {
    for (var key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) this._data[key] = data[key];
    }
  } else if (typeof data === 'string') {
    // default to x-www-form-urlencoded
    if (!type) this.type('form');
    type = this._header['content-type'];

    if (type === 'application/x-www-form-urlencoded') {
      this._data = this._data ? "".concat(this._data, "&").concat(data) : data;
    } else {
      this._data = (this._data || '') + data;
    }
  } else {
    this._data = data;
  }

  if (!isObj || this._isHost(data)) {
    return this;
  } // default to json


  if (!type) this.type('json');
  return this;
};
/**
 * Sort `querystring` by the sort function
 *
 *
 * Examples:
 *
 *       // default order
 *       request.get('/user')
 *         .query('name=Nick')
 *         .query('search=Manny')
 *         .sortQuery()
 *         .end(callback)
 *
 *       // customized sort function
 *       request.get('/user')
 *         .query('name=Nick')
 *         .query('search=Manny')
 *         .sortQuery(function(a, b){
 *           return a.length - b.length;
 *         })
 *         .end(callback)
 *
 *
 * @param {Function} sort
 * @return {Request} for chaining
 * @api public
 */


RequestBase.prototype.sortQuery = function (sort) {
  // _sort default to true but otherwise can be a function or boolean
  this._sort = typeof sort === 'undefined' ? true : sort;
  return this;
};
/**
 * Compose querystring to append to req.url
 *
 * @api private
 */


RequestBase.prototype._finalizeQueryString = function () {
  var query = this._query.join('&');

  if (query) {
    this.url += (this.url.includes('?') ? '&' : '?') + query;
  }

  this._query.length = 0; // Makes the call idempotent

  if (this._sort) {
    var index = this.url.indexOf('?');

    if (index >= 0) {
      var queryArr = this.url.slice(index + 1).split('&');

      if (typeof this._sort === 'function') {
        queryArr.sort(this._sort);
      } else {
        queryArr.sort();
      }

      this.url = this.url.slice(0, index) + '?' + queryArr.join('&');
    }
  }
}; // For backwards compat only


RequestBase.prototype._appendQueryString = function () {
  console.warn('Unsupported');
};
/**
 * Invoke callback with timeout error.
 *
 * @api private
 */


RequestBase.prototype._timeoutError = function (reason, timeout, errno) {
  if (this._aborted) {
    return;
  }

  var err = new Error("".concat(reason + timeout, "ms exceeded"));
  err.timeout = timeout;
  err.code = 'ECONNABORTED';
  err.errno = errno;
  this.timedout = true;
  this.timedoutError = err;
  this.abort();
  this.callback(err);
};

RequestBase.prototype._setTimeouts = function () {
  var self = this; // deadline

  if (this._timeout && !this._timer) {
    this._timer = setTimeout(function () {
      self._timeoutError('Timeout of ', self._timeout, 'ETIME');
    }, this._timeout);
  } // response timeout


  if (this._responseTimeout && !this._responseTimeoutTimer) {
    this._responseTimeoutTimer = setTimeout(function () {
      self._timeoutError('Response timeout of ', self._responseTimeout, 'ETIMEDOUT');
    }, this._responseTimeout);
  }
};

},{"./is-object":12}],14:[function(require,module,exports){
"use strict";

/**
 * Module dependencies.
 */
var utils = require('./utils');
/**
 * Expose `ResponseBase`.
 */


module.exports = ResponseBase;
/**
 * Initialize a new `ResponseBase`.
 *
 * @api public
 */

function ResponseBase(obj) {
  if (obj) return mixin(obj);
}
/**
 * Mixin the prototype properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */


function mixin(obj) {
  for (var key in ResponseBase.prototype) {
    if (Object.prototype.hasOwnProperty.call(ResponseBase.prototype, key)) obj[key] = ResponseBase.prototype[key];
  }

  return obj;
}
/**
 * Get case-insensitive `field` value.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */


ResponseBase.prototype.get = function (field) {
  return this.header[field.toLowerCase()];
};
/**
 * Set header related properties:
 *
 *   - `.type` the content type without params
 *
 * A response of "Content-Type: text/plain; charset=utf-8"
 * will provide you with a `.type` of "text/plain".
 *
 * @param {Object} header
 * @api private
 */


ResponseBase.prototype._setHeaderProperties = function (header) {
  // TODO: moar!
  // TODO: make this a util
  // content-type
  var ct = header['content-type'] || '';
  this.type = utils.type(ct); // params

  var params = utils.params(ct);

  for (var key in params) {
    if (Object.prototype.hasOwnProperty.call(params, key)) this[key] = params[key];
  }

  this.links = {}; // links

  try {
    if (header.link) {
      this.links = utils.parseLinks(header.link);
    }
  } catch (_unused) {// ignore
  }
};
/**
 * Set flags such as `.ok` based on `status`.
 *
 * For example a 2xx response will give you a `.ok` of __true__
 * whereas 5xx will be __false__ and `.error` will be __true__. The
 * `.clientError` and `.serverError` are also available to be more
 * specific, and `.statusType` is the class of error ranging from 1..5
 * sometimes useful for mapping respond colors etc.
 *
 * "sugar" properties are also defined for common cases. Currently providing:
 *
 *   - .noContent
 *   - .badRequest
 *   - .unauthorized
 *   - .notAcceptable
 *   - .notFound
 *
 * @param {Number} status
 * @api private
 */


ResponseBase.prototype._setStatusProperties = function (status) {
  var type = status / 100 | 0; // status / class

  this.statusCode = status;
  this.status = this.statusCode;
  this.statusType = type; // basics

  this.info = type === 1;
  this.ok = type === 2;
  this.redirect = type === 3;
  this.clientError = type === 4;
  this.serverError = type === 5;
  this.error = type === 4 || type === 5 ? this.toError() : false; // sugar

  this.created = status === 201;
  this.accepted = status === 202;
  this.noContent = status === 204;
  this.badRequest = status === 400;
  this.unauthorized = status === 401;
  this.notAcceptable = status === 406;
  this.forbidden = status === 403;
  this.notFound = status === 404;
  this.unprocessableEntity = status === 422;
};

},{"./utils":15}],15:[function(require,module,exports){
"use strict";

/**
 * Return the mime type for the given `str`.
 *
 * @param {String} str
 * @return {String}
 * @api private
 */
exports.type = function (str) {
  return str.split(/ *; */).shift();
};
/**
 * Return header field parameters.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */


exports.params = function (str) {
  return str.split(/ *; */).reduce(function (obj, str) {
    var parts = str.split(/ *= */);
    var key = parts.shift();
    var val = parts.shift();
    if (key && val) obj[key] = val;
    return obj;
  }, {});
};
/**
 * Parse Link header fields.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */


exports.parseLinks = function (str) {
  return str.split(/ *, */).reduce(function (obj, str) {
    var parts = str.split(/ *; */);
    var url = parts[0].slice(1, -1);
    var rel = parts[1].split(/ *= */)[1].slice(1, -1);
    obj[rel] = url;
    return obj;
  }, {});
};
/**
 * Strip content related fields from `header`.
 *
 * @param {Object} header
 * @return {Object} header
 * @api private
 */


exports.cleanHeader = function (header, changesOrigin) {
  delete header['content-type'];
  delete header['content-length'];
  delete header['transfer-encoding'];
  delete header.host; // secuirty

  if (changesOrigin) {
    delete header.authorization;
    delete header.cookie;
  }

  return header;
};

},{}],16:[function(require,module,exports){
(function (Buffer){(function (){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _superagent = _interopRequireDefault(require("superagent"));
var _querystring = _interopRequireDefault(require("querystring"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
* @module ApiClient
* @version 0.1.0
*/
/**
* Manages low level client-server communications, parameter marshalling, etc. There should not be any need for an
* application to use this class directly - the *Api and model classes provide the public API for the service. The
* contents of this file should be regarded as internal but are documented for completeness.
* @alias module:ApiClient
* @class
*/
class ApiClient {
  /**
   * The base URL against which to resolve every API call's (relative) path.
   * Overrides the default value set in spec file if present
   * @param {String} basePath
   */
  constructor(basePath = 'https://api.myohioassembly.com/v1') {
    /**
     * The base URL against which to resolve every API call's (relative) path.
     * @type {String}
     * @default https://api.myohioassembly.com/v1
     */
    this.basePath = basePath.replace(/\/+$/, '');

    /**
     * The authentication methods to be included for all API calls.
     * @type {Array.<String>}
     */
    this.authentications = {
      'basicEmailPassword': {
        type: 'basic'
      },
      'bearerTokenAuth': {
        type: 'bearer'
      },
      // JWT
      'bearerTokenRefresh': {
        type: 'bearer'
      } // JWT
    };

    /**
     * The default HTTP headers to be included for all API calls.
     * @type {Array.<String>}
     * @default {}
     */
    this.defaultHeaders = {
      'User-Agent': 'OpenAPI-Generator/0.1.0/Javascript'
    };

    /**
     * The default HTTP timeout for all API calls.
     * @type {Number}
     * @default 60000
     */
    this.timeout = 60000;

    /**
     * If set to false an additional timestamp parameter is added to all API GET calls to
     * prevent browser caching
     * @type {Boolean}
     * @default true
     */
    this.cache = true;

    /**
     * If set to true, the client will save the cookies from each server
     * response, and return them in the next request.
     * @default false
     */
    this.enableCookies = false;

    /*
     * Used to save and return cookies in a node.js (non-browser) setting,
     * if this.enableCookies is set to true.
     */
    if (typeof window === 'undefined') {
      this.agent = new _superagent.default.agent();
    }

    /*
     * Allow user to override superagent agent
     */
    this.requestAgent = null;

    /*
     * Allow user to add superagent plugins
     */
    this.plugins = null;
  }

  /**
  * Returns a string representation for an actual parameter.
  * @param param The actual parameter.
  * @returns {String} The string representation of <code>param</code>.
  */
  paramToString(param) {
    if (param == undefined || param == null) {
      return '';
    }
    if (param instanceof Date) {
      return param.toJSON();
    }
    if (ApiClient.canBeJsonified(param)) {
      return JSON.stringify(param);
    }
    return param.toString();
  }

  /**
  * Returns a boolean indicating if the parameter could be JSON.stringified
  * @param param The actual parameter
  * @returns {Boolean} Flag indicating if <code>param</code> can be JSON.stringified
  */
  static canBeJsonified(str) {
    if (typeof str !== 'string' && typeof str !== 'object') return false;
    try {
      const type = str.toString();
      return type === '[object Object]' || type === '[object Array]';
    } catch (err) {
      return false;
    }
  }
  /**
   * Builds full URL by appending the given path to the base URL and replacing path parameter place-holders with parameter values.
   * NOTE: query parameters are not handled here.
   * @param {String} path The path to append to the base URL.
   * @param {Object} pathParams The parameter values to append.
   * @param {String} apiBasePath Base path defined in the path, operation level to override the default one
   * @returns {String} The encoded path with parameter values substituted.
   */
  buildUrl(path, pathParams, apiBasePath) {
    if (!path.match(/^\//)) {
      path = '/' + path;
    }
    var url = this.basePath + path;

    // use API (operation, path) base path if defined
    if (apiBasePath !== null && apiBasePath !== undefined) {
      url = apiBasePath + path;
    }
    url = url.replace(/\{([\w-\.]+)\}/g, (fullMatch, key) => {
      var value;
      if (pathParams.hasOwnProperty(key)) {
        value = this.paramToString(pathParams[key]);
      } else {
        value = fullMatch;
      }
      return encodeURIComponent(value);
    });
    return url;
  }

  /**
  * Checks whether the given content type represents JSON.<br>
  * JSON content type examples:<br>
  * <ul>
  * <li>application/json</li>
  * <li>application/json; charset=UTF8</li>
  * <li>APPLICATION/JSON</li>
  * </ul>
  * @param {String} contentType The MIME content type to check.
  * @returns {Boolean} <code>true</code> if <code>contentType</code> represents JSON, otherwise <code>false</code>.
  */
  isJsonMime(contentType) {
    return Boolean(contentType != null && contentType.match(/^application\/json(;.*)?$/i));
  }

  /**
  * Chooses a content type from the given array, with JSON preferred; i.e. return JSON if included, otherwise return the first.
  * @param {Array.<String>} contentTypes
  * @returns {String} The chosen content type, preferring JSON.
  */
  jsonPreferredMime(contentTypes) {
    for (var i = 0; i < contentTypes.length; i++) {
      if (this.isJsonMime(contentTypes[i])) {
        return contentTypes[i];
      }
    }
    return contentTypes[0];
  }

  /**
  * Checks whether the given parameter value represents file-like content.
  * @param param The parameter to check.
  * @returns {Boolean} <code>true</code> if <code>param</code> represents a file.
  */
  isFileParam(param) {
    // fs.ReadStream in Node.js and Electron (but not in runtime like browserify)
    if (typeof require === 'function') {
      let fs;
      try {
        fs = require('fs');
      } catch (err) {}
      if (fs && fs.ReadStream && param instanceof fs.ReadStream) {
        return true;
      }
    }

    // Buffer in Node.js
    if (typeof Buffer === 'function' && param instanceof Buffer) {
      return true;
    }

    // Blob in browser
    if (typeof Blob === 'function' && param instanceof Blob) {
      return true;
    }

    // File in browser (it seems File object is also instance of Blob, but keep this for safe)
    if (typeof File === 'function' && param instanceof File) {
      return true;
    }
    return false;
  }

  /**
  * Normalizes parameter values:
  * <ul>
  * <li>remove nils</li>
  * <li>keep files and arrays</li>
  * <li>format to string with `paramToString` for other cases</li>
  * </ul>
  * @param {Object.<String, Object>} params The parameters as object properties.
  * @returns {Object.<String, Object>} normalized parameters.
  */
  normalizeParams(params) {
    var newParams = {};
    for (var key in params) {
      if (params.hasOwnProperty(key) && params[key] != undefined && params[key] != null) {
        var value = params[key];
        if (this.isFileParam(value) || Array.isArray(value)) {
          newParams[key] = value;
        } else {
          newParams[key] = this.paramToString(value);
        }
      }
    }
    return newParams;
  }

  /**
  * Builds a string representation of an array-type actual parameter, according to the given collection format.
  * @param {Array} param An array parameter.
  * @param {module:ApiClient.CollectionFormatEnum} collectionFormat The array element separator strategy.
  * @returns {String|Array} A string representation of the supplied collection, using the specified delimiter. Returns
  * <code>param</code> as is if <code>collectionFormat</code> is <code>multi</code>.
  */
  buildCollectionParam(param, collectionFormat) {
    if (param == null) {
      return null;
    }
    switch (collectionFormat) {
      case 'csv':
        return param.map(this.paramToString, this).join(',');
      case 'ssv':
        return param.map(this.paramToString, this).join(' ');
      case 'tsv':
        return param.map(this.paramToString, this).join('\t');
      case 'pipes':
        return param.map(this.paramToString, this).join('|');
      case 'multi':
        //return the array directly as SuperAgent will handle it as expected
        return param.map(this.paramToString, this);
      case 'passthrough':
        return param;
      default:
        throw new Error('Unknown collection format: ' + collectionFormat);
    }
  }

  /**
  * Applies authentication headers to the request.
  * @param {Object} request The request object created by a <code>superagent()</code> call.
  * @param {Array.<String>} authNames An array of authentication method names.
  */
  applyAuthToRequest(request, authNames) {
    authNames.forEach(authName => {
      var auth = this.authentications[authName];
      switch (auth.type) {
        case 'basic':
          if (auth.username || auth.password) {
            request.auth(auth.username || '', auth.password || '');
          }
          break;
        case 'bearer':
          if (auth.accessToken) {
            var localVarBearerToken = typeof auth.accessToken === 'function' ? auth.accessToken() : auth.accessToken;
            request.set({
              'Authorization': 'Bearer ' + localVarBearerToken
            });
          }
          break;
        case 'apiKey':
          if (auth.apiKey) {
            var data = {};
            if (auth.apiKeyPrefix) {
              data[auth.name] = auth.apiKeyPrefix + ' ' + auth.apiKey;
            } else {
              data[auth.name] = auth.apiKey;
            }
            if (auth['in'] === 'header') {
              request.set(data);
            } else {
              request.query(data);
            }
          }
          break;
        case 'oauth2':
          if (auth.accessToken) {
            request.set({
              'Authorization': 'Bearer ' + auth.accessToken
            });
          }
          break;
        default:
          throw new Error('Unknown authentication type: ' + auth.type);
      }
    });
  }

  /**
   * Deserializes an HTTP response body into a value of the specified type.
   * @param {Object} response A SuperAgent response object.
   * @param {(String|Array.<String>|Object.<String, Object>|Function)} returnType The type to return. Pass a string for simple types
   * or the constructor function for a complex type. Pass an array containing the type name to return an array of that type. To
   * return an object, pass an object with one property whose name is the key type and whose value is the corresponding value type:
   * all properties on <code>data<code> will be converted to this type.
   * @returns A value of the specified type.
   */
  deserialize(response, returnType) {
    if (response == null || returnType == null || response.status == 204) {
      return null;
    }

    // Rely on SuperAgent for parsing response body.
    // See http://visionmedia.github.io/superagent/#parsing-response-bodies
    var data = response.body;
    if (data == null || typeof data === 'object' && typeof data.length === 'undefined' && !Object.keys(data).length) {
      // SuperAgent does not always produce a body; use the unparsed response as a fallback
      data = response.text;
    }
    return ApiClient.convertToType(data, returnType);
  }

  /**
   * Callback function to receive the result of the operation.
   * @callback module:ApiClient~callApiCallback
   * @param {String} error Error message, if any.
   * @param data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Invokes the REST service using the supplied settings and parameters.
   * @param {String} path The base URL to invoke.
   * @param {String} httpMethod The HTTP method to use.
   * @param {Object.<String, String>} pathParams A map of path parameters and their values.
   * @param {Object.<String, Object>} queryParams A map of query parameters and their values.
   * @param {Object.<String, Object>} headerParams A map of header parameters and their values.
   * @param {Object.<String, Object>} formParams A map of form parameters and their values.
   * @param {Object} bodyParam The value to pass as the request body.
   * @param {Array.<String>} authNames An array of authentication type names.
   * @param {Array.<String>} contentTypes An array of request MIME types.
   * @param {Array.<String>} accepts An array of acceptable response MIME types.
   * @param {(String|Array|ObjectFunction)} returnType The required type to return; can be a string for simple types or the
   * constructor for a complex type.
   * @param {String} apiBasePath base path defined in the operation/path level to override the default one
   * @param {module:ApiClient~callApiCallback} callback The callback function.
   * @returns {Object} The SuperAgent request object.
   */
  callApi(path, httpMethod, pathParams, queryParams, headerParams, formParams, bodyParam, authNames, contentTypes, accepts, returnType, apiBasePath, callback) {
    var url = this.buildUrl(path, pathParams, apiBasePath);
    var request = (0, _superagent.default)(httpMethod, url);
    if (this.plugins !== null) {
      for (var index in this.plugins) {
        if (this.plugins.hasOwnProperty(index)) {
          request.use(this.plugins[index]);
        }
      }
    }

    // apply authentications
    this.applyAuthToRequest(request, authNames);

    // set query parameters
    if (httpMethod.toUpperCase() === 'GET' && this.cache === false) {
      queryParams['_'] = new Date().getTime();
    }
    request.query(this.normalizeParams(queryParams));

    // set header parameters
    request.set(this.defaultHeaders).set(this.normalizeParams(headerParams));

    // set requestAgent if it is set by user
    if (this.requestAgent) {
      request.agent(this.requestAgent);
    }

    // set request timeout
    request.timeout(this.timeout);
    var contentType = this.jsonPreferredMime(contentTypes);
    if (contentType) {
      // Issue with superagent and multipart/form-data (https://github.com/visionmedia/superagent/issues/746)
      if (contentType != 'multipart/form-data') {
        request.type(contentType);
      }
    }
    if (contentType === 'application/x-www-form-urlencoded') {
      request.send(_querystring.default.stringify(this.normalizeParams(formParams)));
    } else if (contentType == 'multipart/form-data') {
      var _formParams = this.normalizeParams(formParams);
      for (var key in _formParams) {
        if (_formParams.hasOwnProperty(key)) {
          let _formParamsValue = _formParams[key];
          if (this.isFileParam(_formParamsValue)) {
            // file field
            request.attach(key, _formParamsValue);
          } else if (Array.isArray(_formParamsValue) && _formParamsValue.length && this.isFileParam(_formParamsValue[0])) {
            // multiple files
            _formParamsValue.forEach(file => request.attach(key, file));
          } else {
            request.field(key, _formParamsValue);
          }
        }
      }
    } else if (bodyParam !== null && bodyParam !== undefined) {
      if (!request.header['Content-Type']) {
        request.type('application/json');
      }
      request.send(bodyParam);
    }
    var accept = this.jsonPreferredMime(accepts);
    if (accept) {
      request.accept(accept);
    }
    if (returnType === 'Blob') {
      request.responseType('blob');
    } else if (returnType === 'String') {
      request.responseType('text');
    }

    // Attach previously saved cookies, if enabled
    if (this.enableCookies) {
      if (typeof window === 'undefined') {
        this.agent._attachCookies(request);
      } else {
        request.withCredentials();
      }
    }
    request.end((error, response) => {
      if (callback) {
        var data = null;
        if (!error) {
          try {
            data = this.deserialize(response, returnType);
            if (this.enableCookies && typeof window === 'undefined') {
              this.agent._saveCookies(response);
            }
          } catch (err) {
            error = err;
          }
        }
        callback(error, data, response);
      }
    });
    return request;
  }

  /**
  * Parses an ISO-8601 string representation or epoch representation of a date value.
  * @param {String} str The date value as a string.
  * @returns {Date} The parsed date object.
  */
  static parseDate(str) {
    if (isNaN(str)) {
      return new Date(str.replace(/(\d)(T)(\d)/i, '$1 $3'));
    }
    return new Date(+str);
  }

  /**
  * Converts a value to the specified type.
  * @param {(String|Object)} data The data to convert, as a string or object.
  * @param {(String|Array.<String>|Object.<String, Object>|Function)} type The type to return. Pass a string for simple types
  * or the constructor function for a complex type. Pass an array containing the type name to return an array of that type. To
  * return an object, pass an object with one property whose name is the key type and whose value is the corresponding value type:
  * all properties on <code>data<code> will be converted to this type.
  * @returns An instance of the specified type or null or undefined if data is null or undefined.
  */
  static convertToType(data, type) {
    if (data === null || data === undefined) return data;
    switch (type) {
      case 'Boolean':
        return Boolean(data);
      case 'Integer':
        return parseInt(data, 10);
      case 'Number':
        return parseFloat(data);
      case 'String':
        return String(data);
      case 'Date':
        return ApiClient.parseDate(String(data));
      case 'Blob':
        return data;
      default:
        if (type === Object) {
          // generic object, return directly
          return data;
        } else if (typeof type.constructFromObject === 'function') {
          // for model type like User and enum class
          return type.constructFromObject(data);
        } else if (Array.isArray(type)) {
          // for array type like: ['String']
          var itemType = type[0];
          return data.map(item => {
            return ApiClient.convertToType(item, itemType);
          });
        } else if (typeof type === 'object') {
          // for plain object type like: {'String': 'Integer'}
          var keyType, valueType;
          for (var k in type) {
            if (type.hasOwnProperty(k)) {
              keyType = k;
              valueType = type[k];
              break;
            }
          }
          var result = {};
          for (var k in data) {
            if (data.hasOwnProperty(k)) {
              var key = ApiClient.convertToType(k, keyType);
              var value = ApiClient.convertToType(data[k], valueType);
              result[key] = value;
            }
          }
          return result;
        } else {
          // for unknown type, return the data directly
          return data;
        }
    }
  }

  /**
    * Gets an array of host settings
    * @returns An array of host settings
    */
  hostSettings() {
    return [{
      'url': "https://{apiServerSubdomain}.myohioassembly.com/{apiVersion}",
      'description': "No description provided",
      'variables': {
        apiServerSubdomain: {
          'description': "No description provided",
          'default_value': "api",
          'enum_values': ["api"]
        },
        apiVersion: {
          'description': "No description provided",
          'default_value': "v1",
          'enum_values': ["v1"]
        }
      }
    }, {
      'url': "http://localhost:{hostPort}/{apiVersion}",
      'description': "No description provided",
      'variables': {
        hostPort: {
          'description': "No description provided",
          'default_value': "8101",
          'enum_values': ["8101"]
        },
        apiVersion: {
          'description': "No description provided",
          'default_value': "v1",
          'enum_values': ["v1"]
        }
      }
    }];
  }
  getBasePathFromSettings(index, variables = {}) {
    var servers = this.hostSettings();

    // check array index out of bound
    if (index < 0 || index >= servers.length) {
      throw new Error("Invalid index " + index + " when selecting the host settings. Must be less than " + servers.length);
    }
    var server = servers[index];
    var url = server['url'];

    // go through variable and assign a value
    for (var variable_name in server['variables']) {
      if (variable_name in variables) {
        let variable = server['variables'][variable_name];
        if (!('enum_values' in variable) || variable['enum_values'].includes(variables[variable_name])) {
          url = url.replace("{" + variable_name + "}", variables[variable_name]);
        } else {
          throw new Error("The variable `" + variable_name + "` in the host URL has invalid value " + variables[variable_name] + ". Must be " + server['variables'][variable_name]['enum_values'] + ".");
        }
      } else {
        // use default value
        url = url.replace("{" + variable_name + "}", server['variables'][variable_name]['default_value']);
      }
    }
    return url;
  }

  /**
  * Constructs a new map or array model from REST data.
  * @param data {Object|Array} The REST data.
  * @param obj {Object|Array} The target object or array.
  */
  static constructFromObject(data, obj, itemType) {
    if (Array.isArray(data)) {
      for (var i = 0; i < data.length; i++) {
        if (data.hasOwnProperty(i)) obj[i] = ApiClient.convertToType(data[i], itemType);
      }
    } else {
      for (var k in data) {
        if (data.hasOwnProperty(k)) obj[k] = ApiClient.convertToType(data[k], itemType);
      }
    }
  }
}

/**
 * Enumeration of collection format separator strategies.
 * @enum {String}
 * @readonly
 */
ApiClient.CollectionFormatEnum = {
  /**
   * Comma-separated values. Value: <code>csv</code>
   * @const
   */
  CSV: ',',
  /**
   * Space-separated values. Value: <code>ssv</code>
   * @const
   */
  SSV: ' ',
  /**
   * Tab-separated values. Value: <code>tsv</code>
   * @const
   */
  TSV: '\t',
  /**
   * Pipe(|)-separated values. Value: <code>pipes</code>
   * @const
   */
  PIPES: '|',
  /**
   * Native array. Value: <code>multi</code>
   * @const
   */
  MULTI: 'multi'
};

/**
* The default API client implementation.
* @type {module:ApiClient}
*/
ApiClient.instance = new ApiClient();
var _default = ApiClient;
exports.default = _default;

}).call(this)}).call(this,require("buffer").Buffer)
},{"buffer":2,"fs":7,"querystring":6,"superagent":11}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _AccountsDeleteOne200Response = _interopRequireDefault(require("../model/AccountsDeleteOne200Response"));
var _AccountsList200Response = _interopRequireDefault(require("../model/AccountsList200Response"));
var _AuthEmailUpdateVerify404Response = _interopRequireDefault(require("../model/AuthEmailUpdateVerify404Response"));
var _AuthLoginCreate400Response = _interopRequireDefault(require("../model/AuthLoginCreate400Response"));
var _AuthLoginCreate401Response = _interopRequireDefault(require("../model/AuthLoginCreate401Response"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
* Accounts service.
* @module api/AccountsApi
* @version 0.1.0
*/
class AccountsApi {
  /**
  * Constructs a new AccountsApi. 
  * @alias module:api/AccountsApi
  * @class
  * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
  * default to {@link module:ApiClient#instance} if unspecified.
  */
  constructor(apiClient) {
    this.apiClient = apiClient || _ApiClient.default.instance;
  }

  /**
   * Callback function to receive the result of the accountsDeleteOne operation.
   * @callback module:api/AccountsApi~accountsDeleteOneCallback
   * @param {String} error Error message, if any.
   * @param {module:model/AccountsDeleteOne200Response} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Delete one account
   * Delete one account.  This operation is restricted to administrators
   * @param {String} accountId account id
   * @param {module:api/AccountsApi~accountsDeleteOneCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/AccountsDeleteOne200Response}
   */
  accountsDeleteOne(accountId, callback) {
    let postBody = null;
    // verify the required parameter 'accountId' is set
    if (accountId === undefined || accountId === null) {
      throw new Error("Missing the required parameter 'accountId' when calling accountsDeleteOne");
    }
    let pathParams = {
      'accountId': accountId
    };
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ['bearerTokenAuth'];
    let contentTypes = [];
    let accepts = ['application/json'];
    let returnType = _AccountsDeleteOne200Response.default;
    return this.apiClient.callApi('/accounts/{accountId}', 'DELETE', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
  }

  /**
   * Callback function to receive the result of the accountsList operation.
   * @callback module:api/AccountsApi~accountsListCallback
   * @param {String} error Error message, if any.
   * @param {module:model/AccountsList200Response} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * List all accounts
   * List all accounts except any sensitive auth data and member data.  This operation is restricted to administrators
   * @param {module:api/AccountsApi~accountsListCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/AccountsList200Response}
   */
  accountsList(callback) {
    let postBody = null;
    let pathParams = {};
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ['bearerTokenAuth'];
    let contentTypes = [];
    let accepts = ['application/json'];
    let returnType = _AccountsList200Response.default;
    return this.apiClient.callApi('/accounts', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
  }
}
exports.default = AccountsApi;

},{"../ApiClient":16,"../model/AccountsDeleteOne200Response":27,"../model/AccountsList200Response":28,"../model/AuthEmailUpdateVerify404Response":34,"../model/AuthLoginCreate400Response":37,"../model/AuthLoginCreate401Response":38}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _AccountsDeleteOne200Response = _interopRequireDefault(require("../model/AccountsDeleteOne200Response"));
var _AccountsList200Response = _interopRequireDefault(require("../model/AccountsList200Response"));
var _AuthAccountPasswordResetCreate200Response = _interopRequireDefault(require("../model/AuthAccountPasswordResetCreate200Response"));
var _AuthEmailUpdateVerify404Response = _interopRequireDefault(require("../model/AuthEmailUpdateVerify404Response"));
var _AuthLoginCreate400Response = _interopRequireDefault(require("../model/AuthLoginCreate400Response"));
var _AuthLoginCreate401Response = _interopRequireDefault(require("../model/AuthLoginCreate401Response"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
* Admin service.
* @module api/AdminApi
* @version 0.1.0
*/
class AdminApi {
  /**
  * Constructs a new AdminApi. 
  * @alias module:api/AdminApi
  * @class
  * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
  * default to {@link module:ApiClient#instance} if unspecified.
  */
  constructor(apiClient) {
    this.apiClient = apiClient || _ApiClient.default.instance;
  }

  /**
   * Callback function to receive the result of the accountsDeleteOne operation.
   * @callback module:api/AdminApi~accountsDeleteOneCallback
   * @param {String} error Error message, if any.
   * @param {module:model/AccountsDeleteOne200Response} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Delete one account
   * Delete one account.  This operation is restricted to administrators
   * @param {String} accountId account id
   * @param {module:api/AdminApi~accountsDeleteOneCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/AccountsDeleteOne200Response}
   */
  accountsDeleteOne(accountId, callback) {
    let postBody = null;
    // verify the required parameter 'accountId' is set
    if (accountId === undefined || accountId === null) {
      throw new Error("Missing the required parameter 'accountId' when calling accountsDeleteOne");
    }
    let pathParams = {
      'accountId': accountId
    };
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ['bearerTokenAuth'];
    let contentTypes = [];
    let accepts = ['application/json'];
    let returnType = _AccountsDeleteOne200Response.default;
    return this.apiClient.callApi('/accounts/{accountId}', 'DELETE', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
  }

  /**
   * Callback function to receive the result of the accountsList operation.
   * @callback module:api/AdminApi~accountsListCallback
   * @param {String} error Error message, if any.
   * @param {module:model/AccountsList200Response} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * List all accounts
   * List all accounts except any sensitive auth data and member data.  This operation is restricted to administrators
   * @param {module:api/AdminApi~accountsListCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/AccountsList200Response}
   */
  accountsList(callback) {
    let postBody = null;
    let pathParams = {};
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ['bearerTokenAuth'];
    let contentTypes = [];
    let accepts = ['application/json'];
    let returnType = _AccountsList200Response.default;
    return this.apiClient.callApi('/accounts', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
  }

  /**
   * Callback function to receive the result of the authAccountPasswordResetCreate operation.
   * @callback module:api/AdminApi~authAccountPasswordResetCreateCallback
   * @param {String} error Error message, if any.
   * @param {module:model/AuthAccountPasswordResetCreate200Response} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Password reset account
   * Reset account password.  This operation is restricted to elevated roles.  This action will also cause an email to be sent to user with a temporary password which must be changed upon first logging in.
   * @param {String} accountId account id
   * @param {module:api/AdminApi~authAccountPasswordResetCreateCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/AuthAccountPasswordResetCreate200Response}
   */
  authAccountPasswordResetCreate(accountId, callback) {
    let postBody = null;
    // verify the required parameter 'accountId' is set
    if (accountId === undefined || accountId === null) {
      throw new Error("Missing the required parameter 'accountId' when calling authAccountPasswordResetCreate");
    }
    let pathParams = {
      'accountId': accountId
    };
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ['bearerTokenAuth'];
    let contentTypes = [];
    let accepts = ['application/json'];
    let returnType = _AuthAccountPasswordResetCreate200Response.default;
    return this.apiClient.callApi('/accounts/{accountId}/pass/reset', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
  }
}
exports.default = AdminApi;

},{"../ApiClient":16,"../model/AccountsDeleteOne200Response":27,"../model/AccountsList200Response":28,"../model/AuthAccountPasswordResetCreate200Response":29,"../model/AuthEmailUpdateVerify404Response":34,"../model/AuthLoginCreate400Response":37,"../model/AuthLoginCreate401Response":38}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _AuthAccountPasswordResetCreate200Response = _interopRequireDefault(require("../model/AuthAccountPasswordResetCreate200Response"));
var _AuthEmailUpdateRequest200Response = _interopRequireDefault(require("../model/AuthEmailUpdateRequest200Response"));
var _AuthEmailUpdateRequest409Response = _interopRequireDefault(require("../model/AuthEmailUpdateRequest409Response"));
var _AuthEmailUpdateRequestRequest = _interopRequireDefault(require("../model/AuthEmailUpdateRequestRequest"));
var _AuthEmailUpdateVerify200Response = _interopRequireDefault(require("../model/AuthEmailUpdateVerify200Response"));
var _AuthEmailUpdateVerify404Response = _interopRequireDefault(require("../model/AuthEmailUpdateVerify404Response"));
var _AuthLoginCreate200Response = _interopRequireDefault(require("../model/AuthLoginCreate200Response"));
var _AuthLoginCreate400Response = _interopRequireDefault(require("../model/AuthLoginCreate400Response"));
var _AuthLoginCreate401Response = _interopRequireDefault(require("../model/AuthLoginCreate401Response"));
var _AuthLoginCreate403Response = _interopRequireDefault(require("../model/AuthLoginCreate403Response"));
var _AuthLoginCreate409Response = _interopRequireDefault(require("../model/AuthLoginCreate409Response"));
var _AuthLoginCreateRequest = _interopRequireDefault(require("../model/AuthLoginCreateRequest"));
var _AuthPasswordUpdate200Response = _interopRequireDefault(require("../model/AuthPasswordUpdate200Response"));
var _AuthPasswordUpdateRequest = _interopRequireDefault(require("../model/AuthPasswordUpdateRequest"));
var _AuthRefreshCreate200Response = _interopRequireDefault(require("../model/AuthRefreshCreate200Response"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
* Auth service.
* @module api/AuthApi
* @version 0.1.0
*/
class AuthApi {
  /**
  * Constructs a new AuthApi. 
  * @alias module:api/AuthApi
  * @class
  * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
  * default to {@link module:ApiClient#instance} if unspecified.
  */
  constructor(apiClient) {
    this.apiClient = apiClient || _ApiClient.default.instance;
  }

  /**
   * Callback function to receive the result of the authAccountPasswordResetCreate operation.
   * @callback module:api/AuthApi~authAccountPasswordResetCreateCallback
   * @param {String} error Error message, if any.
   * @param {module:model/AuthAccountPasswordResetCreate200Response} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Password reset account
   * Reset account password.  This operation is restricted to elevated roles.  This action will also cause an email to be sent to user with a temporary password which must be changed upon first logging in.
   * @param {String} accountId account id
   * @param {module:api/AuthApi~authAccountPasswordResetCreateCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/AuthAccountPasswordResetCreate200Response}
   */
  authAccountPasswordResetCreate(accountId, callback) {
    let postBody = null;
    // verify the required parameter 'accountId' is set
    if (accountId === undefined || accountId === null) {
      throw new Error("Missing the required parameter 'accountId' when calling authAccountPasswordResetCreate");
    }
    let pathParams = {
      'accountId': accountId
    };
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ['bearerTokenAuth'];
    let contentTypes = [];
    let accepts = ['application/json'];
    let returnType = _AuthAccountPasswordResetCreate200Response.default;
    return this.apiClient.callApi('/accounts/{accountId}/pass/reset', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
  }

  /**
   * Callback function to receive the result of the authEmailUpdateRequest operation.
   * @callback module:api/AuthApi~authEmailUpdateRequestCallback
   * @param {String} error Error message, if any.
   * @param {module:model/AuthEmailUpdateRequest200Response} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Email Update Request
   * Update user email request. Both email and email conf values should match.  Email must be different from current email.  This operation will result in a confirmation email being sent to the new email.  Only after client confirmation will the email change go into effect.
   * @param {Object} opts Optional parameters
   * @param {module:model/AuthEmailUpdateRequestRequest} [authEmailUpdateRequestRequest] The respective email and conf fields should match.
   * @param {module:api/AuthApi~authEmailUpdateRequestCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/AuthEmailUpdateRequest200Response}
   */
  authEmailUpdateRequest(opts, callback) {
    opts = opts || {};
    let postBody = opts['authEmailUpdateRequestRequest'];
    let pathParams = {};
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ['bearerTokenAuth'];
    let contentTypes = ['application/json'];
    let accepts = ['application/json'];
    let returnType = _AuthEmailUpdateRequest200Response.default;
    return this.apiClient.callApi('/auth/email', 'PUT', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
  }

  /**
   * Callback function to receive the result of the authEmailUpdateVerify operation.
   * @callback module:api/AuthApi~authEmailUpdateVerifyCallback
   * @param {String} error Error message, if any.
   * @param {module:model/AuthEmailUpdateVerify200Response} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Confirm account email
   * Confirms account email
   * @param {String} token JWT signature
   * @param {module:api/AuthApi~authEmailUpdateVerifyCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/AuthEmailUpdateVerify200Response}
   */
  authEmailUpdateVerify(token, callback) {
    let postBody = null;
    // verify the required parameter 'token' is set
    if (token === undefined || token === null) {
      throw new Error("Missing the required parameter 'token' when calling authEmailUpdateVerify");
    }
    let pathParams = {};
    let queryParams = {
      'token': token
    };
    let headerParams = {};
    let formParams = {};
    let authNames = [];
    let contentTypes = [];
    let accepts = ['application/json'];
    let returnType = _AuthEmailUpdateVerify200Response.default;
    return this.apiClient.callApi('/auth/email/verify', 'PUT', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
  }

  /**
   * Callback function to receive the result of the authLoginCreate operation.
   * @callback module:api/AuthApi~authLoginCreateCallback
   * @param {String} error Error message, if any.
   * @param {module:model/AuthLoginCreate200Response} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Login
   * New login request all users.  This operation uses basic auth where the username is the account email and the password is the account password.  This operation will fail with 409 response if account role is elevated and the 'elevatedPass' value is not provided.
   * @param {Object} opts Optional parameters
   * @param {module:model/AuthLoginCreateRequest} [authLoginCreateRequest] 
   * @param {module:api/AuthApi~authLoginCreateCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/AuthLoginCreate200Response}
   */
  authLoginCreate(opts, callback) {
    opts = opts || {};
    let postBody = opts['authLoginCreateRequest'];
    let pathParams = {};
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ['basicEmailPassword'];
    let contentTypes = ['application/json'];
    let accepts = ['application/json'];
    let returnType = _AuthLoginCreate200Response.default;
    return this.apiClient.callApi('/auth/login', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
  }

  /**
   * Callback function to receive the result of the authPasswordUpdate operation.
   * @callback module:api/AuthApi~authPasswordUpdateCallback
   * @param {String} error Error message, if any.
   * @param {module:model/AuthPasswordUpdate200Response} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Password Update
   * Update password for currently authenticated user.  Updated password cannot match current password.  Updated elevated password cannot match current elevated password.  This operation will not affect the open auth session.
   * @param {Object} opts Optional parameters
   * @param {module:model/AuthPasswordUpdateRequest} [authPasswordUpdateRequest] The respective pass and conf fields should match if provided.  Only elevated roles require elevatedPass(Conf).
   * @param {module:api/AuthApi~authPasswordUpdateCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/AuthPasswordUpdate200Response}
   */
  authPasswordUpdate(opts, callback) {
    opts = opts || {};
    let postBody = opts['authPasswordUpdateRequest'];
    let pathParams = {};
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ['bearerTokenAuth'];
    let contentTypes = ['application/json'];
    let accepts = ['application/json'];
    let returnType = _AuthPasswordUpdate200Response.default;
    return this.apiClient.callApi('/auth/pass', 'PUT', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
  }

  /**
   * Callback function to receive the result of the authRefreshCreate operation.
   * @callback module:api/AuthApi~authRefreshCreateCallback
   * @param {String} error Error message, if any.
   * @param {module:model/AuthRefreshCreate200Response} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Auth Refresh
   * Refresh auth session, which provides a new auth token for use in other authenticated requests.  This does not extend the current auth session.
   * @param {module:api/AuthApi~authRefreshCreateCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/AuthRefreshCreate200Response}
   */
  authRefreshCreate(callback) {
    let postBody = null;
    let pathParams = {};
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ['bearerTokenRefresh'];
    let contentTypes = [];
    let accepts = ['application/json'];
    let returnType = _AuthRefreshCreate200Response.default;
    return this.apiClient.callApi('/auth/refresh', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
  }
}
exports.default = AuthApi;

},{"../ApiClient":16,"../model/AuthAccountPasswordResetCreate200Response":29,"../model/AuthEmailUpdateRequest200Response":30,"../model/AuthEmailUpdateRequest409Response":31,"../model/AuthEmailUpdateRequestRequest":32,"../model/AuthEmailUpdateVerify200Response":33,"../model/AuthEmailUpdateVerify404Response":34,"../model/AuthLoginCreate200Response":35,"../model/AuthLoginCreate400Response":37,"../model/AuthLoginCreate401Response":38,"../model/AuthLoginCreate403Response":39,"../model/AuthLoginCreate409Response":40,"../model/AuthLoginCreateRequest":41,"../model/AuthPasswordUpdate200Response":42,"../model/AuthPasswordUpdateRequest":43,"../model/AuthRefreshCreate200Response":44}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _AuthEmailUpdateVerify404Response = _interopRequireDefault(require("../model/AuthEmailUpdateVerify404Response"));
var _AuthLoginCreate400Response = _interopRequireDefault(require("../model/AuthLoginCreate400Response"));
var _AuthLoginCreate401Response = _interopRequireDefault(require("../model/AuthLoginCreate401Response"));
var _CredentialCardsGetOne200Response = _interopRequireDefault(require("../model/CredentialCardsGetOne200Response"));
var _MemberCredentialCardsCreate201Response = _interopRequireDefault(require("../model/MemberCredentialCardsCreate201Response"));
var _MemberCredentialCardsCreate409Response = _interopRequireDefault(require("../model/MemberCredentialCardsCreate409Response"));
var _MemberCredentialCardsCreateRequest = _interopRequireDefault(require("../model/MemberCredentialCardsCreateRequest"));
var _MemberCredentialCardsDeleteOne200Response = _interopRequireDefault(require("../model/MemberCredentialCardsDeleteOne200Response"));
var _MemberCredentialCardsList200Response = _interopRequireDefault(require("../model/MemberCredentialCardsList200Response"));
var _MemberCredentialCardsUpdateOneExpiryRequest = _interopRequireDefault(require("../model/MemberCredentialCardsUpdateOneExpiryRequest"));
var _MemberCredentialCardsUpdateOnePrint409Response = _interopRequireDefault(require("../model/MemberCredentialCardsUpdateOnePrint409Response"));
var _MemberCredentialCardsUpdateOneVerify409Response = _interopRequireDefault(require("../model/MemberCredentialCardsUpdateOneVerify409Response"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
* CredentialCards service.
* @module api/CredentialCardsApi
* @version 0.1.0
*/
class CredentialCardsApi {
  /**
  * Constructs a new CredentialCardsApi. 
  * @alias module:api/CredentialCardsApi
  * @class
  * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
  * default to {@link module:ApiClient#instance} if unspecified.
  */
  constructor(apiClient) {
    this.apiClient = apiClient || _ApiClient.default.instance;
  }

  /**
   * Callback function to receive the result of the credentialCardsGetOne operation.
   * @callback module:api/CredentialCardsApi~credentialCardsGetOneCallback
   * @param {String} error Error message, if any.
   * @param {module:model/CredentialCardsGetOne200Response} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Get public credential card
   * Get existing credential card unless expired or deleted.  This is a public operation.
   * @param {String} masterRecordNumber unique master record number for credential card
   * @param {module:api/CredentialCardsApi~credentialCardsGetOneCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/CredentialCardsGetOne200Response}
   */
  credentialCardsGetOne(masterRecordNumber, callback) {
    let postBody = null;
    // verify the required parameter 'masterRecordNumber' is set
    if (masterRecordNumber === undefined || masterRecordNumber === null) {
      throw new Error("Missing the required parameter 'masterRecordNumber' when calling credentialCardsGetOne");
    }
    let pathParams = {
      'masterRecordNumber': masterRecordNumber
    };
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = [];
    let contentTypes = [];
    let accepts = ['application/json'];
    let returnType = _CredentialCardsGetOne200Response.default;
    return this.apiClient.callApi('/credentialCards/{masterRecordNumber}', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
  }

  /**
   * Callback function to receive the result of the memberCredentialCardsCreate operation.
   * @callback module:api/CredentialCardsApi~memberCredentialCardsCreateCallback
   * @param {String} error Error message, if any.
   * @param {module:model/MemberCredentialCardsCreate201Response} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Create credential card
   * Create credential card.  This operation is restricted to elevated roles.
   * @param {String} memberId member id
   * @param {Object} opts Optional parameters
   * @param {module:model/MemberCredentialCardsCreateRequest} [memberCredentialCardsCreateRequest] 
   * @param {module:api/CredentialCardsApi~memberCredentialCardsCreateCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/MemberCredentialCardsCreate201Response}
   */
  memberCredentialCardsCreate(memberId, opts, callback) {
    opts = opts || {};
    let postBody = opts['memberCredentialCardsCreateRequest'];
    // verify the required parameter 'memberId' is set
    if (memberId === undefined || memberId === null) {
      throw new Error("Missing the required parameter 'memberId' when calling memberCredentialCardsCreate");
    }
    let pathParams = {
      'memberId': memberId
    };
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ['bearerTokenAuth'];
    let contentTypes = ['application/json'];
    let accepts = ['application/json'];
    let returnType = _MemberCredentialCardsCreate201Response.default;
    return this.apiClient.callApi('/members/{memberId}/credentialCards', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
  }

  /**
   * Callback function to receive the result of the memberCredentialCardsDeleteOne operation.
   * @callback module:api/CredentialCardsApi~memberCredentialCardsDeleteOneCallback
   * @param {String} error Error message, if any.
   * @param {module:model/MemberCredentialCardsDeleteOne200Response} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Delete credential card
   * Delete credential card even if deleted.  This operation is restricted to elevated roles.
   * @param {String} memberId member id
   * @param {String} credentialCardId credential card id
   * @param {module:api/CredentialCardsApi~memberCredentialCardsDeleteOneCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/MemberCredentialCardsDeleteOne200Response}
   */
  memberCredentialCardsDeleteOne(memberId, credentialCardId, callback) {
    let postBody = null;
    // verify the required parameter 'memberId' is set
    if (memberId === undefined || memberId === null) {
      throw new Error("Missing the required parameter 'memberId' when calling memberCredentialCardsDeleteOne");
    }
    // verify the required parameter 'credentialCardId' is set
    if (credentialCardId === undefined || credentialCardId === null) {
      throw new Error("Missing the required parameter 'credentialCardId' when calling memberCredentialCardsDeleteOne");
    }
    let pathParams = {
      'memberId': memberId,
      'credentialCardId': credentialCardId
    };
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ['bearerTokenAuth'];
    let contentTypes = [];
    let accepts = ['application/json'];
    let returnType = _MemberCredentialCardsDeleteOne200Response.default;
    return this.apiClient.callApi('/members/{memberId}/credentialCards/{credentialCardId}', 'DELETE', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
  }

  /**
   * Callback function to receive the result of the memberCredentialCardsGetOne operation.
   * @callback module:api/CredentialCardsApi~memberCredentialCardsGetOneCallback
   * @param {String} error Error message, if any.
   * @param {module:model/MemberCredentialCardsCreate201Response} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Get one member credential card
   * Get one member credential card even if expired but not if deleted.  This operation is restricted to auth user's memberId and elevated roles.
   * @param {String} memberId member id
   * @param {String} credentialCardId credential card id
   * @param {module:api/CredentialCardsApi~memberCredentialCardsGetOneCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/MemberCredentialCardsCreate201Response}
   */
  memberCredentialCardsGetOne(memberId, credentialCardId, callback) {
    let postBody = null;
    // verify the required parameter 'memberId' is set
    if (memberId === undefined || memberId === null) {
      throw new Error("Missing the required parameter 'memberId' when calling memberCredentialCardsGetOne");
    }
    // verify the required parameter 'credentialCardId' is set
    if (credentialCardId === undefined || credentialCardId === null) {
      throw new Error("Missing the required parameter 'credentialCardId' when calling memberCredentialCardsGetOne");
    }
    let pathParams = {
      'memberId': memberId,
      'credentialCardId': credentialCardId
    };
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ['bearerTokenAuth'];
    let contentTypes = [];
    let accepts = ['application/json'];
    let returnType = _MemberCredentialCardsCreate201Response.default;
    return this.apiClient.callApi('/members/{memberId}/credentialCards/{credentialCardId}', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
  }

  /**
   * Callback function to receive the result of the memberCredentialCardsList operation.
   * @callback module:api/CredentialCardsApi~memberCredentialCardsListCallback
   * @param {String} error Error message, if any.
   * @param {module:model/MemberCredentialCardsList200Response} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * List member credential cards
   * Get all member credential cards even if expired but not if deleted.  This operation is restricted to auth user's memberId and elevated roles.
   * @param {String} memberId member id
   * @param {Boolean} includeDeleted 
   * @param {module:api/CredentialCardsApi~memberCredentialCardsListCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/MemberCredentialCardsList200Response}
   */
  memberCredentialCardsList(memberId, includeDeleted, callback) {
    let postBody = null;
    // verify the required parameter 'memberId' is set
    if (memberId === undefined || memberId === null) {
      throw new Error("Missing the required parameter 'memberId' when calling memberCredentialCardsList");
    }
    // verify the required parameter 'includeDeleted' is set
    if (includeDeleted === undefined || includeDeleted === null) {
      throw new Error("Missing the required parameter 'includeDeleted' when calling memberCredentialCardsList");
    }
    let pathParams = {
      'memberId': memberId
    };
    let queryParams = {
      'includeDeleted': includeDeleted
    };
    let headerParams = {};
    let formParams = {};
    let authNames = ['bearerTokenAuth'];
    let contentTypes = [];
    let accepts = ['application/json'];
    let returnType = _MemberCredentialCardsList200Response.default;
    return this.apiClient.callApi('/members/{memberId}/credentialCards', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
  }

  /**
   * Callback function to receive the result of the memberCredentialCardsUpdateOneExpiry operation.
   * @callback module:api/CredentialCardsApi~memberCredentialCardsUpdateOneExpiryCallback
   * @param {String} error Error message, if any.
   * @param {module:model/MemberCredentialCardsCreate201Response} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Update expiration date on credential card
   * Update expiration date on credential card.  This operation is restricted to elevated roles.
   * @param {String} memberId member id
   * @param {String} credentialCardId credential card id
   * @param {Object} opts Optional parameters
   * @param {module:model/MemberCredentialCardsUpdateOneExpiryRequest} [memberCredentialCardsUpdateOneExpiryRequest] 
   * @param {module:api/CredentialCardsApi~memberCredentialCardsUpdateOneExpiryCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/MemberCredentialCardsCreate201Response}
   */
  memberCredentialCardsUpdateOneExpiry(memberId, credentialCardId, opts, callback) {
    opts = opts || {};
    let postBody = opts['memberCredentialCardsUpdateOneExpiryRequest'];
    // verify the required parameter 'memberId' is set
    if (memberId === undefined || memberId === null) {
      throw new Error("Missing the required parameter 'memberId' when calling memberCredentialCardsUpdateOneExpiry");
    }
    // verify the required parameter 'credentialCardId' is set
    if (credentialCardId === undefined || credentialCardId === null) {
      throw new Error("Missing the required parameter 'credentialCardId' when calling memberCredentialCardsUpdateOneExpiry");
    }
    let pathParams = {
      'memberId': memberId,
      'credentialCardId': credentialCardId
    };
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ['bearerTokenAuth'];
    let contentTypes = ['application/json'];
    let accepts = ['application/json'];
    let returnType = _MemberCredentialCardsCreate201Response.default;
    return this.apiClient.callApi('/members/{memberId}/credentialCards/{credentialCardId}/expiration', 'PUT', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
  }

  /**
   * Callback function to receive the result of the memberCredentialCardsUpdateOnePrint operation.
   * @callback module:api/CredentialCardsApi~memberCredentialCardsUpdateOnePrintCallback
   * @param {String} error Error message, if any.
   * @param {module:model/MemberCredentialCardsCreate201Response} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Print credential card
   * Print credential card.  This operation is restricted to elevated roles.
   * @param {String} memberId member id
   * @param {String} credentialCardId credential card id
   * @param {module:api/CredentialCardsApi~memberCredentialCardsUpdateOnePrintCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/MemberCredentialCardsCreate201Response}
   */
  memberCredentialCardsUpdateOnePrint(memberId, credentialCardId, callback) {
    let postBody = null;
    // verify the required parameter 'memberId' is set
    if (memberId === undefined || memberId === null) {
      throw new Error("Missing the required parameter 'memberId' when calling memberCredentialCardsUpdateOnePrint");
    }
    // verify the required parameter 'credentialCardId' is set
    if (credentialCardId === undefined || credentialCardId === null) {
      throw new Error("Missing the required parameter 'credentialCardId' when calling memberCredentialCardsUpdateOnePrint");
    }
    let pathParams = {
      'memberId': memberId,
      'credentialCardId': credentialCardId
    };
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ['bearerTokenAuth'];
    let contentTypes = [];
    let accepts = ['application/json'];
    let returnType = _MemberCredentialCardsCreate201Response.default;
    return this.apiClient.callApi('/members/{memberId}/credentialCards/{credentialCardId}/print', 'PUT', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
  }

  /**
   * Callback function to receive the result of the memberCredentialCardsUpdateOneVerify operation.
   * @callback module:api/CredentialCardsApi~memberCredentialCardsUpdateOneVerifyCallback
   * @param {String} error Error message, if any.
   * @param {module:model/MemberCredentialCardsCreate201Response} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Verify credential card
   * Verify credential card.  This operation is restricted to elevated roles.
   * @param {String} memberId member id
   * @param {String} credentialCardId credential card id
   * @param {module:api/CredentialCardsApi~memberCredentialCardsUpdateOneVerifyCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/MemberCredentialCardsCreate201Response}
   */
  memberCredentialCardsUpdateOneVerify(memberId, credentialCardId, callback) {
    let postBody = null;
    // verify the required parameter 'memberId' is set
    if (memberId === undefined || memberId === null) {
      throw new Error("Missing the required parameter 'memberId' when calling memberCredentialCardsUpdateOneVerify");
    }
    // verify the required parameter 'credentialCardId' is set
    if (credentialCardId === undefined || credentialCardId === null) {
      throw new Error("Missing the required parameter 'credentialCardId' when calling memberCredentialCardsUpdateOneVerify");
    }
    let pathParams = {
      'memberId': memberId,
      'credentialCardId': credentialCardId
    };
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ['bearerTokenAuth'];
    let contentTypes = [];
    let accepts = ['application/json'];
    let returnType = _MemberCredentialCardsCreate201Response.default;
    return this.apiClient.callApi('/members/{memberId}/credentialCards/{credentialCardId}/verify', 'PUT', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
  }
}
exports.default = CredentialCardsApi;

},{"../ApiClient":16,"../model/AuthEmailUpdateVerify404Response":34,"../model/AuthLoginCreate400Response":37,"../model/AuthLoginCreate401Response":38,"../model/CredentialCardsGetOne200Response":48,"../model/MemberCredentialCardsCreate201Response":51,"../model/MemberCredentialCardsCreate409Response":52,"../model/MemberCredentialCardsCreateRequest":53,"../model/MemberCredentialCardsDeleteOne200Response":54,"../model/MemberCredentialCardsList200Response":55,"../model/MemberCredentialCardsUpdateOneExpiryRequest":56,"../model/MemberCredentialCardsUpdateOnePrint409Response":57,"../model/MemberCredentialCardsUpdateOneVerify409Response":58}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _AuthLoginCreate400Response = _interopRequireDefault(require("../model/AuthLoginCreate400Response"));
var _DirectoryListingsList200Response = _interopRequireDefault(require("../model/DirectoryListingsList200Response"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
* Directory service.
* @module api/DirectoryApi
* @version 0.1.0
*/
class DirectoryApi {
  /**
  * Constructs a new DirectoryApi. 
  * @alias module:api/DirectoryApi
  * @class
  * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
  * default to {@link module:ApiClient#instance} if unspecified.
  */
  constructor(apiClient) {
    this.apiClient = apiClient || _ApiClient.default.instance;
  }

  /**
   * Callback function to receive the result of the directoryListingsList operation.
   * @callback module:api/DirectoryApi~directoryListingsListCallback
   * @param {String} error Error message, if any.
   * @param {module:model/DirectoryListingsList200Response} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Get directory listings based on filter
   * Retrieve directory listings.  This operation is public.
   * @param {Object} opts Optional parameters
   * @param {module:model/String} [filterRole] only return members with minimum auth role specified
   * @param {module:api/DirectoryApi~directoryListingsListCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/DirectoryListingsList200Response}
   */
  directoryListingsList(opts, callback) {
    opts = opts || {};
    let postBody = null;
    let pathParams = {};
    let queryParams = {
      'filterRole': opts['filterRole']
    };
    let headerParams = {};
    let formParams = {};
    let authNames = [];
    let contentTypes = [];
    let accepts = ['application/json'];
    let returnType = _DirectoryListingsList200Response.default;
    return this.apiClient.callApi('/directoryListings', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
  }
}
exports.default = DirectoryApi;

},{"../ApiClient":16,"../model/AuthLoginCreate400Response":37,"../model/DirectoryListingsList200Response":50}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _AuthEmailUpdateVerify404Response = _interopRequireDefault(require("../model/AuthEmailUpdateVerify404Response"));
var _AuthLoginCreate400Response = _interopRequireDefault(require("../model/AuthLoginCreate400Response"));
var _AuthLoginCreate401Response = _interopRequireDefault(require("../model/AuthLoginCreate401Response"));
var _CredentialCardsGetOne200Response = _interopRequireDefault(require("../model/CredentialCardsGetOne200Response"));
var _MemberDocsDeleteOne200Response = _interopRequireDefault(require("../model/MemberDocsDeleteOne200Response"));
var _MemberDocsGet200Response = _interopRequireDefault(require("../model/MemberDocsGet200Response"));
var _MemberDocsUpdateOne200Response = _interopRequireDefault(require("../model/MemberDocsUpdateOne200Response"));
var _MemberProfileDocsUpdateOne409Response = _interopRequireDefault(require("../model/MemberProfileDocsUpdateOne409Response"));
var _MembershipDocKey = _interopRequireDefault(require("../model/MembershipDocKey"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
* Docs service.
* @module api/DocsApi
* @version 0.1.0
*/
class DocsApi {
  /**
  * Constructs a new DocsApi. 
  * @alias module:api/DocsApi
  * @class
  * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
  * default to {@link module:ApiClient#instance} if unspecified.
  */
  constructor(apiClient) {
    this.apiClient = apiClient || _ApiClient.default.instance;
  }

  /**
   * Callback function to receive the result of the credentialCardsGetOne operation.
   * @callback module:api/DocsApi~credentialCardsGetOneCallback
   * @param {String} error Error message, if any.
   * @param {module:model/CredentialCardsGetOne200Response} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Get public credential card
   * Get existing credential card unless expired or deleted.  This is a public operation.
   * @param {String} masterRecordNumber unique master record number for credential card
   * @param {module:api/DocsApi~credentialCardsGetOneCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/CredentialCardsGetOne200Response}
   */
  credentialCardsGetOne(masterRecordNumber, callback) {
    let postBody = null;
    // verify the required parameter 'masterRecordNumber' is set
    if (masterRecordNumber === undefined || masterRecordNumber === null) {
      throw new Error("Missing the required parameter 'masterRecordNumber' when calling credentialCardsGetOne");
    }
    let pathParams = {
      'masterRecordNumber': masterRecordNumber
    };
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = [];
    let contentTypes = [];
    let accepts = ['application/json'];
    let returnType = _CredentialCardsGetOne200Response.default;
    return this.apiClient.callApi('/credentialCards/{masterRecordNumber}', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
  }

  /**
   * Callback function to receive the result of the memberDocsCreate operation.
   * @callback module:api/DocsApi~memberDocsCreateCallback
   * @param {String} error Error message, if any.
   * @param {module:model/MemberDocsUpdateOne200Response} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Create new member doc
   * Upload new document owned by member.  This operation will fail if a document already exists with same owner and file name.  This operation is restricted to elevated roles.
   * @param {String} memberId member id
   * @param {module:model/MembershipDocKey} docKey member id
   * @param {String} docName 
   * @param {File} docFile 
   * @param {module:api/DocsApi~memberDocsCreateCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/MemberDocsUpdateOne200Response}
   */
  memberDocsCreate(memberId, docKey, docName, docFile, callback) {
    let postBody = null;
    // verify the required parameter 'memberId' is set
    if (memberId === undefined || memberId === null) {
      throw new Error("Missing the required parameter 'memberId' when calling memberDocsCreate");
    }
    // verify the required parameter 'docKey' is set
    if (docKey === undefined || docKey === null) {
      throw new Error("Missing the required parameter 'docKey' when calling memberDocsCreate");
    }
    // verify the required parameter 'docName' is set
    if (docName === undefined || docName === null) {
      throw new Error("Missing the required parameter 'docName' when calling memberDocsCreate");
    }
    // verify the required parameter 'docFile' is set
    if (docFile === undefined || docFile === null) {
      throw new Error("Missing the required parameter 'docFile' when calling memberDocsCreate");
    }
    let pathParams = {
      'memberId': memberId,
      'docKey': docKey
    };
    let queryParams = {};
    let headerParams = {};
    let formParams = {
      'docName': docName,
      'docFile': docFile
    };
    let authNames = ['bearerTokenAuth'];
    let contentTypes = ['multipart/form-data'];
    let accepts = ['application/json'];
    let returnType = _MemberDocsUpdateOne200Response.default;
    return this.apiClient.callApi('/members/{memberId}/docs/{docKey}', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
  }

  /**
   * Callback function to receive the result of the memberDocsDeleteOne operation.
   * @callback module:api/DocsApi~memberDocsDeleteOneCallback
   * @param {String} error Error message, if any.
   * @param {module:model/MemberDocsDeleteOne200Response} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Delete existing member doc
   * Delete document owned by member. This operation is restricted to elevated roles.
   * @param {String} memberId member id
   * @param {module:model/MembershipDocKey} docKey member id
   * @param {module:api/DocsApi~memberDocsDeleteOneCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/MemberDocsDeleteOne200Response}
   */
  memberDocsDeleteOne(memberId, docKey, callback) {
    let postBody = null;
    // verify the required parameter 'memberId' is set
    if (memberId === undefined || memberId === null) {
      throw new Error("Missing the required parameter 'memberId' when calling memberDocsDeleteOne");
    }
    // verify the required parameter 'docKey' is set
    if (docKey === undefined || docKey === null) {
      throw new Error("Missing the required parameter 'docKey' when calling memberDocsDeleteOne");
    }
    let pathParams = {
      'memberId': memberId,
      'docKey': docKey
    };
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ['bearerTokenAuth'];
    let contentTypes = [];
    let accepts = ['application/json'];
    let returnType = _MemberDocsDeleteOne200Response.default;
    return this.apiClient.callApi('/members/{memberId}/docs/{docKey}', 'DELETE', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
  }

  /**
   * Callback function to receive the result of the memberDocsDownload operation.
   * @callback module:api/DocsApi~memberDocsDownloadCallback
   * @param {String} error Error message, if any.
   * @param {File} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Download one member doc
   * Returns file download.  This operation will check that memberdocId matches claim in signature JWT.
   * @param {String} memberDocId member doc id
   * @param {String} signature JWT signature
   * @param {module:api/DocsApi~memberDocsDownloadCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link File}
   */
  memberDocsDownload(memberDocId, signature, callback) {
    let postBody = null;
    // verify the required parameter 'memberDocId' is set
    if (memberDocId === undefined || memberDocId === null) {
      throw new Error("Missing the required parameter 'memberDocId' when calling memberDocsDownload");
    }
    // verify the required parameter 'signature' is set
    if (signature === undefined || signature === null) {
      throw new Error("Missing the required parameter 'signature' when calling memberDocsDownload");
    }
    let pathParams = {
      'memberDocId': memberDocId
    };
    let queryParams = {
      'signature': signature
    };
    let headerParams = {};
    let formParams = {};
    let authNames = [];
    let contentTypes = [];
    let accepts = ['image/png', 'application/pdf', 'application/json'];
    let returnType = File;
    return this.apiClient.callApi('/memberDocs/{memberDocId}/download', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
  }

  /**
   * Callback function to receive the result of the memberDocsGet operation.
   * @callback module:api/DocsApi~memberDocsGetCallback
   * @param {String} error Error message, if any.
   * @param {module:model/MemberDocsGet200Response} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Get member docs
   * Gets data on all member docs.  This operation is restricted to currently auth member's memberId unless role is elevated
   * @param {String} memberId member id
   * @param {module:api/DocsApi~memberDocsGetCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/MemberDocsGet200Response}
   */
  memberDocsGet(memberId, callback) {
    let postBody = null;
    // verify the required parameter 'memberId' is set
    if (memberId === undefined || memberId === null) {
      throw new Error("Missing the required parameter 'memberId' when calling memberDocsGet");
    }
    let pathParams = {
      'memberId': memberId
    };
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ['bearerTokenAuth'];
    let contentTypes = [];
    let accepts = ['application/json'];
    let returnType = _MemberDocsGet200Response.default;
    return this.apiClient.callApi('/members/{memberId}/docs', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
  }

  /**
   * Callback function to receive the result of the memberDocsNameUpdateOne operation.
   * @callback module:api/DocsApi~memberDocsNameUpdateOneCallback
   * @param {String} error Error message, if any.
   * @param {module:model/MemberDocsUpdateOne200Response} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Update existing member doc name
   * Update name of document owned by member.  This operation will not modify the document contents.  This operation is restricted to elevated roles.
   * @param {String} memberId member id
   * @param {module:model/MembershipDocKey} docKey member id
   * @param {String} docName 
   * @param {module:api/DocsApi~memberDocsNameUpdateOneCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/MemberDocsUpdateOne200Response}
   */
  memberDocsNameUpdateOne(memberId, docKey, docName, callback) {
    let postBody = null;
    // verify the required parameter 'memberId' is set
    if (memberId === undefined || memberId === null) {
      throw new Error("Missing the required parameter 'memberId' when calling memberDocsNameUpdateOne");
    }
    // verify the required parameter 'docKey' is set
    if (docKey === undefined || docKey === null) {
      throw new Error("Missing the required parameter 'docKey' when calling memberDocsNameUpdateOne");
    }
    // verify the required parameter 'docName' is set
    if (docName === undefined || docName === null) {
      throw new Error("Missing the required parameter 'docName' when calling memberDocsNameUpdateOne");
    }
    let pathParams = {
      'memberId': memberId,
      'docKey': docKey
    };
    let queryParams = {};
    let headerParams = {};
    let formParams = {
      'docName': docName
    };
    let authNames = ['bearerTokenAuth'];
    let contentTypes = ['multipart/form-data'];
    let accepts = ['application/json'];
    let returnType = _MemberDocsUpdateOne200Response.default;
    return this.apiClient.callApi('/members/{memberId}/docs/{docKey}/name', 'PUT', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
  }

  /**
   * Callback function to receive the result of the memberDocsUpdateOne operation.
   * @callback module:api/DocsApi~memberDocsUpdateOneCallback
   * @param {String} error Error message, if any.
   * @param {module:model/MemberDocsUpdateOne200Response} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Update existing member doc
   * Upload new member document.  This operation will create a new document associated with docKey and original doc will be archived.  This operation is restricted to elevated roles.
   * @param {String} memberId member id
   * @param {module:model/MembershipDocKey} docKey member id
   * @param {String} docName 
   * @param {File} docFile 
   * @param {module:api/DocsApi~memberDocsUpdateOneCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/MemberDocsUpdateOne200Response}
   */
  memberDocsUpdateOne(memberId, docKey, docName, docFile, callback) {
    let postBody = null;
    // verify the required parameter 'memberId' is set
    if (memberId === undefined || memberId === null) {
      throw new Error("Missing the required parameter 'memberId' when calling memberDocsUpdateOne");
    }
    // verify the required parameter 'docKey' is set
    if (docKey === undefined || docKey === null) {
      throw new Error("Missing the required parameter 'docKey' when calling memberDocsUpdateOne");
    }
    // verify the required parameter 'docName' is set
    if (docName === undefined || docName === null) {
      throw new Error("Missing the required parameter 'docName' when calling memberDocsUpdateOne");
    }
    // verify the required parameter 'docFile' is set
    if (docFile === undefined || docFile === null) {
      throw new Error("Missing the required parameter 'docFile' when calling memberDocsUpdateOne");
    }
    let pathParams = {
      'memberId': memberId,
      'docKey': docKey
    };
    let queryParams = {};
    let headerParams = {};
    let formParams = {
      'docName': docName,
      'docFile': docFile
    };
    let authNames = ['bearerTokenAuth'];
    let contentTypes = ['multipart/form-data'];
    let accepts = ['application/json'];
    let returnType = _MemberDocsUpdateOne200Response.default;
    return this.apiClient.callApi('/members/{memberId}/docs/{docKey}', 'PUT', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
  }
}
exports.default = DocsApi;

},{"../ApiClient":16,"../model/AuthEmailUpdateVerify404Response":34,"../model/AuthLoginCreate400Response":37,"../model/AuthLoginCreate401Response":38,"../model/CredentialCardsGetOne200Response":48,"../model/MemberDocsDeleteOne200Response":59,"../model/MemberDocsGet200Response":60,"../model/MemberDocsUpdateOne200Response":61,"../model/MemberProfileDocsUpdateOne409Response":80,"../model/MembershipDocKey":94}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _AuthEmailUpdateVerify404Response = _interopRequireDefault(require("../model/AuthEmailUpdateVerify404Response"));
var _AuthLoginCreate400Response = _interopRequireDefault(require("../model/AuthLoginCreate400Response"));
var _AuthLoginCreate401Response = _interopRequireDefault(require("../model/AuthLoginCreate401Response"));
var _MemberProfileDocsDeleteOne200Response = _interopRequireDefault(require("../model/MemberProfileDocsDeleteOne200Response"));
var _MemberProfileDocsUpdateOne409Response = _interopRequireDefault(require("../model/MemberProfileDocsUpdateOne409Response"));
var _MemberProfileGet200Response = _interopRequireDefault(require("../model/MemberProfileGet200Response"));
var _MemberProfileUpdateRequest = _interopRequireDefault(require("../model/MemberProfileUpdateRequest"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
* MemberProfiles service.
* @module api/MemberProfilesApi
* @version 0.1.0
*/
class MemberProfilesApi {
  /**
  * Constructs a new MemberProfilesApi. 
  * @alias module:api/MemberProfilesApi
  * @class
  * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
  * default to {@link module:ApiClient#instance} if unspecified.
  */
  constructor(apiClient) {
    this.apiClient = apiClient || _ApiClient.default.instance;
  }

  /**
   * Callback function to receive the result of the memberProfileDocsCreate operation.
   * @callback module:api/MemberProfilesApi~memberProfileDocsCreateCallback
   * @param {String} error Error message, if any.
   * @param {module:model/MemberProfileGet200Response} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Create new member profile doc
   * Upload new profile document owned by member.  This operation will fail if a document already exists with same owner and file name.  This operation is restricted to elevated roles.
   * @param {String} memberId member id
   * @param {module:model/String} profileDocKey profile doc key
   * @param {String} docName 
   * @param {File} docFile 
   * @param {module:api/MemberProfilesApi~memberProfileDocsCreateCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/MemberProfileGet200Response}
   */
  memberProfileDocsCreate(memberId, profileDocKey, docName, docFile, callback) {
    let postBody = null;
    // verify the required parameter 'memberId' is set
    if (memberId === undefined || memberId === null) {
      throw new Error("Missing the required parameter 'memberId' when calling memberProfileDocsCreate");
    }
    // verify the required parameter 'profileDocKey' is set
    if (profileDocKey === undefined || profileDocKey === null) {
      throw new Error("Missing the required parameter 'profileDocKey' when calling memberProfileDocsCreate");
    }
    // verify the required parameter 'docName' is set
    if (docName === undefined || docName === null) {
      throw new Error("Missing the required parameter 'docName' when calling memberProfileDocsCreate");
    }
    // verify the required parameter 'docFile' is set
    if (docFile === undefined || docFile === null) {
      throw new Error("Missing the required parameter 'docFile' when calling memberProfileDocsCreate");
    }
    let pathParams = {
      'memberId': memberId,
      'profileDocKey': profileDocKey
    };
    let queryParams = {};
    let headerParams = {};
    let formParams = {
      'docName': docName,
      'docFile': docFile
    };
    let authNames = ['bearerTokenAuth'];
    let contentTypes = ['multipart/form-data'];
    let accepts = ['application/json'];
    let returnType = _MemberProfileGet200Response.default;
    return this.apiClient.callApi('/members/{memberId}/profile/docs/{profileDocKey}', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
  }

  /**
   * Callback function to receive the result of the memberProfileDocsDeleteOne operation.
   * @callback module:api/MemberProfilesApi~memberProfileDocsDeleteOneCallback
   * @param {String} error Error message, if any.
   * @param {module:model/MemberProfileDocsDeleteOne200Response} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Delete existing member profile doc
   * Delete document owned by member profile. This operation is restricted to auth user with memberId and elevated roles.
   * @param {String} memberId member id
   * @param {module:model/String} profileDocKey profile doc key
   * @param {String} fileName member id
   * @param {module:api/MemberProfilesApi~memberProfileDocsDeleteOneCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/MemberProfileDocsDeleteOne200Response}
   */
  memberProfileDocsDeleteOne(memberId, profileDocKey, fileName, callback) {
    let postBody = null;
    // verify the required parameter 'memberId' is set
    if (memberId === undefined || memberId === null) {
      throw new Error("Missing the required parameter 'memberId' when calling memberProfileDocsDeleteOne");
    }
    // verify the required parameter 'profileDocKey' is set
    if (profileDocKey === undefined || profileDocKey === null) {
      throw new Error("Missing the required parameter 'profileDocKey' when calling memberProfileDocsDeleteOne");
    }
    // verify the required parameter 'fileName' is set
    if (fileName === undefined || fileName === null) {
      throw new Error("Missing the required parameter 'fileName' when calling memberProfileDocsDeleteOne");
    }
    let pathParams = {
      'memberId': memberId,
      'profileDocKey': profileDocKey
    };
    let queryParams = {
      'fileName': fileName
    };
    let headerParams = {};
    let formParams = {};
    let authNames = ['bearerTokenAuth'];
    let contentTypes = [];
    let accepts = ['application/json'];
    let returnType = _MemberProfileDocsDeleteOne200Response.default;
    return this.apiClient.callApi('/members/{memberId}/profile/docs/{profileDocKey}', 'DELETE', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
  }

  /**
   * Callback function to receive the result of the memberProfileDocsNameUpdateOne operation.
   * @callback module:api/MemberProfilesApi~memberProfileDocsNameUpdateOneCallback
   * @param {String} error Error message, if any.
   * @param {module:model/MemberProfileGet200Response} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Update existing member profile doc name
   * Update name of profile document owned by member.  This operation will not modify the document contents.  This operation is restricted to elevated roles.
   * @param {String} memberId member id
   * @param {module:model/String} profileDocKey profile doc key
   * @param {String} docName 
   * @param {module:api/MemberProfilesApi~memberProfileDocsNameUpdateOneCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/MemberProfileGet200Response}
   */
  memberProfileDocsNameUpdateOne(memberId, profileDocKey, docName, callback) {
    let postBody = null;
    // verify the required parameter 'memberId' is set
    if (memberId === undefined || memberId === null) {
      throw new Error("Missing the required parameter 'memberId' when calling memberProfileDocsNameUpdateOne");
    }
    // verify the required parameter 'profileDocKey' is set
    if (profileDocKey === undefined || profileDocKey === null) {
      throw new Error("Missing the required parameter 'profileDocKey' when calling memberProfileDocsNameUpdateOne");
    }
    // verify the required parameter 'docName' is set
    if (docName === undefined || docName === null) {
      throw new Error("Missing the required parameter 'docName' when calling memberProfileDocsNameUpdateOne");
    }
    let pathParams = {
      'memberId': memberId,
      'profileDocKey': profileDocKey
    };
    let queryParams = {};
    let headerParams = {};
    let formParams = {
      'docName': docName
    };
    let authNames = ['bearerTokenAuth'];
    let contentTypes = ['multipart/form-data'];
    let accepts = ['application/json'];
    let returnType = _MemberProfileGet200Response.default;
    return this.apiClient.callApi('/members/{memberId}/profile/docs/{profileDocKey}/name', 'PUT', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
  }

  /**
   * Callback function to receive the result of the memberProfileDocsUpdateOne operation.
   * @callback module:api/MemberProfilesApi~memberProfileDocsUpdateOneCallback
   * @param {String} error Error message, if any.
   * @param {module:model/MemberProfileGet200Response} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Update member profile doc
   * Upload new document for member profile, overwriting existing doc.  This operation is restricted to memberId and elevated roles.
   * @param {String} memberId member id
   * @param {module:model/String} profileDocKey profile doc key
   * @param {String} docName 
   * @param {File} docFile 
   * @param {module:api/MemberProfilesApi~memberProfileDocsUpdateOneCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/MemberProfileGet200Response}
   */
  memberProfileDocsUpdateOne(memberId, profileDocKey, docName, docFile, callback) {
    let postBody = null;
    // verify the required parameter 'memberId' is set
    if (memberId === undefined || memberId === null) {
      throw new Error("Missing the required parameter 'memberId' when calling memberProfileDocsUpdateOne");
    }
    // verify the required parameter 'profileDocKey' is set
    if (profileDocKey === undefined || profileDocKey === null) {
      throw new Error("Missing the required parameter 'profileDocKey' when calling memberProfileDocsUpdateOne");
    }
    // verify the required parameter 'docName' is set
    if (docName === undefined || docName === null) {
      throw new Error("Missing the required parameter 'docName' when calling memberProfileDocsUpdateOne");
    }
    // verify the required parameter 'docFile' is set
    if (docFile === undefined || docFile === null) {
      throw new Error("Missing the required parameter 'docFile' when calling memberProfileDocsUpdateOne");
    }
    let pathParams = {
      'memberId': memberId,
      'profileDocKey': profileDocKey
    };
    let queryParams = {};
    let headerParams = {};
    let formParams = {
      'docName': docName,
      'docFile': docFile
    };
    let authNames = ['bearerTokenAuth'];
    let contentTypes = ['multipart/form-data'];
    let accepts = ['application/json'];
    let returnType = _MemberProfileGet200Response.default;
    return this.apiClient.callApi('/members/{memberId}/profile/docs/{profileDocKey}', 'PUT', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
  }

  /**
   * Callback function to receive the result of the memberProfileGet operation.
   * @callback module:api/MemberProfilesApi~memberProfileGetCallback
   * @param {String} error Error message, if any.
   * @param {module:model/MemberProfileGet200Response} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Get member profile
   * Read member profile.  This operation is restricted to auth user's memberId unless role is elevated.
   * @param {String} memberId member id
   * @param {module:api/MemberProfilesApi~memberProfileGetCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/MemberProfileGet200Response}
   */
  memberProfileGet(memberId, callback) {
    let postBody = null;
    // verify the required parameter 'memberId' is set
    if (memberId === undefined || memberId === null) {
      throw new Error("Missing the required parameter 'memberId' when calling memberProfileGet");
    }
    let pathParams = {
      'memberId': memberId
    };
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ['bearerTokenAuth'];
    let contentTypes = [];
    let accepts = ['application/json'];
    let returnType = _MemberProfileGet200Response.default;
    return this.apiClient.callApi('/members/{memberId}/profile', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
  }

  /**
   * Callback function to receive the result of the memberProfileUpdate operation.
   * @callback module:api/MemberProfilesApi~memberProfileUpdateCallback
   * @param {String} error Error message, if any.
   * @param {module:model/MemberProfileGet200Response} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Update member profile
   * Update existing member profile
   * @param {String} memberId member id
   * @param {Object} opts Optional parameters
   * @param {module:model/MemberProfileUpdateRequest} [memberProfileUpdateRequest] 
   * @param {module:api/MemberProfilesApi~memberProfileUpdateCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/MemberProfileGet200Response}
   */
  memberProfileUpdate(memberId, opts, callback) {
    opts = opts || {};
    let postBody = opts['memberProfileUpdateRequest'];
    // verify the required parameter 'memberId' is set
    if (memberId === undefined || memberId === null) {
      throw new Error("Missing the required parameter 'memberId' when calling memberProfileUpdate");
    }
    let pathParams = {
      'memberId': memberId
    };
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ['bearerTokenAuth'];
    let contentTypes = ['application/json'];
    let accepts = ['application/json'];
    let returnType = _MemberProfileGet200Response.default;
    return this.apiClient.callApi('/members/{memberId}/profile', 'PUT', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
  }
}
exports.default = MemberProfilesApi;

},{"../ApiClient":16,"../model/AuthEmailUpdateVerify404Response":34,"../model/AuthLoginCreate400Response":37,"../model/AuthLoginCreate401Response":38,"../model/MemberProfileDocsDeleteOne200Response":79,"../model/MemberProfileDocsUpdateOne409Response":80,"../model/MemberProfileGet200Response":81,"../model/MemberProfileUpdateRequest":82}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _AuthEmailUpdateVerify404Response = _interopRequireDefault(require("../model/AuthEmailUpdateVerify404Response"));
var _AuthLoginCreate400Response = _interopRequireDefault(require("../model/AuthLoginCreate400Response"));
var _AuthLoginCreate401Response = _interopRequireDefault(require("../model/AuthLoginCreate401Response"));
var _AuthLoginCreate403Response = _interopRequireDefault(require("../model/AuthLoginCreate403Response"));
var _MemberUpdateRequest = _interopRequireDefault(require("../model/MemberUpdateRequest"));
var _MembersCreateRequest = _interopRequireDefault(require("../model/MembersCreateRequest"));
var _MembersDeleteOne200Response = _interopRequireDefault(require("../model/MembersDeleteOne200Response"));
var _MembersList200Response = _interopRequireDefault(require("../model/MembersList200Response"));
var _MembershipSignup201Response = _interopRequireDefault(require("../model/MembershipSignup201Response"));
var _MembershipSignup409Response = _interopRequireDefault(require("../model/MembershipSignup409Response"));
var _MembershipSignupRequest = _interopRequireDefault(require("../model/MembershipSignupRequest"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
* Members service.
* @module api/MembersApi
* @version 0.1.0
*/
class MembersApi {
  /**
  * Constructs a new MembersApi. 
  * @alias module:api/MembersApi
  * @class
  * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
  * default to {@link module:ApiClient#instance} if unspecified.
  */
  constructor(apiClient) {
    this.apiClient = apiClient || _ApiClient.default.instance;
  }

  /**
   * Callback function to receive the result of the memberUpdate operation.
   * @callback module:api/MembersApi~memberUpdateCallback
   * @param {String} error Error message, if any.
   * @param {module:model/MembershipSignup201Response} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Update existing member
   * Update member.  This operation is restricted to elevated roles.
   * @param {String} memberId member id
   * @param {Object} opts Optional parameters
   * @param {module:model/MemberUpdateRequest} [memberUpdateRequest] 
   * @param {module:api/MembersApi~memberUpdateCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/MembershipSignup201Response}
   */
  memberUpdate(memberId, opts, callback) {
    opts = opts || {};
    let postBody = opts['memberUpdateRequest'];
    // verify the required parameter 'memberId' is set
    if (memberId === undefined || memberId === null) {
      throw new Error("Missing the required parameter 'memberId' when calling memberUpdate");
    }
    let pathParams = {
      'memberId': memberId
    };
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ['bearerTokenAuth'];
    let contentTypes = ['application/json'];
    let accepts = ['application/json'];
    let returnType = _MembershipSignup201Response.default;
    return this.apiClient.callApi('/members/{memberId}', 'PUT', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
  }

  /**
   * Callback function to receive the result of the membersCreate operation.
   * @callback module:api/MembersApi~membersCreateCallback
   * @param {String} error Error message, if any.
   * @param {module:model/MembershipSignup201Response} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Create new member
   * Create new member (unverified)
   * @param {Object} opts Optional parameters
   * @param {module:model/MembersCreateRequest} [membersCreateRequest] 
   * @param {module:api/MembersApi~membersCreateCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/MembershipSignup201Response}
   */
  membersCreate(opts, callback) {
    opts = opts || {};
    let postBody = opts['membersCreateRequest'];
    let pathParams = {};
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ['bearerTokenAuth'];
    let contentTypes = ['application/json'];
    let accepts = ['application/json'];
    let returnType = _MembershipSignup201Response.default;
    return this.apiClient.callApi('/members', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
  }

  /**
   * Callback function to receive the result of the membersDeleteOne operation.
   * @callback module:api/MembersApi~membersDeleteOneCallback
   * @param {String} error Error message, if any.
   * @param {module:model/MembersDeleteOne200Response} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Delete member
   * Deletes existing non-deleted member.  This operation is restricted to elevated roles.
   * @param {String} memberId member id
   * @param {module:api/MembersApi~membersDeleteOneCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/MembersDeleteOne200Response}
   */
  membersDeleteOne(memberId, callback) {
    let postBody = null;
    // verify the required parameter 'memberId' is set
    if (memberId === undefined || memberId === null) {
      throw new Error("Missing the required parameter 'memberId' when calling membersDeleteOne");
    }
    let pathParams = {
      'memberId': memberId
    };
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ['bearerTokenAuth'];
    let contentTypes = [];
    let accepts = ['application/json'];
    let returnType = _MembersDeleteOne200Response.default;
    return this.apiClient.callApi('/members/{memberId}', 'DELETE', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
  }

  /**
   * Callback function to receive the result of the membersGetOne operation.
   * @callback module:api/MembersApi~membersGetOneCallback
   * @param {String} error Error message, if any.
   * @param {module:model/MembershipSignup201Response} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Get one member
   * Retrieve member.  This operation is restricted to elevated roles.
   * @param {String} memberId member id
   * @param {module:api/MembersApi~membersGetOneCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/MembershipSignup201Response}
   */
  membersGetOne(memberId, callback) {
    let postBody = null;
    // verify the required parameter 'memberId' is set
    if (memberId === undefined || memberId === null) {
      throw new Error("Missing the required parameter 'memberId' when calling membersGetOne");
    }
    let pathParams = {
      'memberId': memberId
    };
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ['bearerTokenAuth'];
    let contentTypes = [];
    let accepts = ['application/json'];
    let returnType = _MembershipSignup201Response.default;
    return this.apiClient.callApi('/members/{memberId}', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
  }

  /**
   * Callback function to receive the result of the membersList operation.
   * @callback module:api/MembersApi~membersListCallback
   * @param {String} error Error message, if any.
   * @param {module:model/MembersList200Response} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * List members
   * Retrieve list of all members.  This operation is restricted to elevated roles.
   * @param {module:api/MembersApi~membersListCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/MembersList200Response}
   */
  membersList(callback) {
    let postBody = null;
    let pathParams = {};
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ['bearerTokenAuth'];
    let contentTypes = [];
    let accepts = ['application/json'];
    let returnType = _MembersList200Response.default;
    return this.apiClient.callApi('/members', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
  }

  /**
   * Callback function to receive the result of the membershipSignup operation.
   * @callback module:api/MembersApi~membershipSignupCallback
   * @param {String} error Error message, if any.
   * @param {module:model/MembershipSignup201Response} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Create new member via public signup
   * Create new member (unverified)
   * @param {Object} opts Optional parameters
   * @param {module:model/MembershipSignupRequest} [membershipSignupRequest] 
   * @param {module:api/MembersApi~membershipSignupCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/MembershipSignup201Response}
   */
  membershipSignup(opts, callback) {
    opts = opts || {};
    let postBody = opts['membershipSignupRequest'];
    let pathParams = {};
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = [];
    let contentTypes = ['application/json'];
    let accepts = ['application/json'];
    let returnType = _MembershipSignup201Response.default;
    return this.apiClient.callApi('/memberships/signup', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
  }
}
exports.default = MembersApi;

},{"../ApiClient":16,"../model/AuthEmailUpdateVerify404Response":34,"../model/AuthLoginCreate400Response":37,"../model/AuthLoginCreate401Response":38,"../model/AuthLoginCreate403Response":39,"../model/MemberUpdateRequest":90,"../model/MembersCreateRequest":91,"../model/MembersDeleteOne200Response":92,"../model/MembersList200Response":93,"../model/MembershipSignup201Response":95,"../model/MembershipSignup409Response":96,"../model/MembershipSignupRequest":97}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _AuthEmailUpdateVerify404Response = _interopRequireDefault(require("../model/AuthEmailUpdateVerify404Response"));
var _AuthLoginCreate400Response = _interopRequireDefault(require("../model/AuthLoginCreate400Response"));
var _AuthLoginCreate401Response = _interopRequireDefault(require("../model/AuthLoginCreate401Response"));
var _MemberOrderDeleteOne200Response = _interopRequireDefault(require("../model/MemberOrderDeleteOne200Response"));
var _MemberOrderItemsUpdateOneRequest = _interopRequireDefault(require("../model/MemberOrderItemsUpdateOneRequest"));
var _MemberOrderPaymentList200Response = _interopRequireDefault(require("../model/MemberOrderPaymentList200Response"));
var _MemberOrderPaymentsCreate409Response = _interopRequireDefault(require("../model/MemberOrderPaymentsCreate409Response"));
var _MemberOrderPaymentsCreateRequest = _interopRequireDefault(require("../model/MemberOrderPaymentsCreateRequest"));
var _MemberOrderPaymentsDeleteOne200Response = _interopRequireDefault(require("../model/MemberOrderPaymentsDeleteOne200Response"));
var _MemberOrderPaymentsUpdateOneCancel409Response = _interopRequireDefault(require("../model/MemberOrderPaymentsUpdateOneCancel409Response"));
var _MemberOrdersCreate201Response = _interopRequireDefault(require("../model/MemberOrdersCreate201Response"));
var _MemberOrdersCreate409Response = _interopRequireDefault(require("../model/MemberOrdersCreate409Response"));
var _MemberOrdersList200Response = _interopRequireDefault(require("../model/MemberOrdersList200Response"));
var _MemberOrdersUpdateOne409Response = _interopRequireDefault(require("../model/MemberOrdersUpdateOne409Response"));
var _MemberOrdersUpdateOneRequest = _interopRequireDefault(require("../model/MemberOrdersUpdateOneRequest"));
var _MemberPurchaseItemsFulfillmentStatusUpdateOneRequest = _interopRequireDefault(require("../model/MemberPurchaseItemsFulfillmentStatusUpdateOneRequest"));
var _MemberPurchaseItemsList200Response = _interopRequireDefault(require("../model/MemberPurchaseItemsList200Response"));
var _MemberPurchaseItemsUpdateOne200Response = _interopRequireDefault(require("../model/MemberPurchaseItemsUpdateOne200Response"));
var _MemberPurchaseItemsUpdateOne409Response = _interopRequireDefault(require("../model/MemberPurchaseItemsUpdateOne409Response"));
var _MemberPurchaseItemsUpdateOneRequest = _interopRequireDefault(require("../model/MemberPurchaseItemsUpdateOneRequest"));
var _ShopItemsCreate201Response = _interopRequireDefault(require("../model/ShopItemsCreate201Response"));
var _ShopItemsCreate409Response = _interopRequireDefault(require("../model/ShopItemsCreate409Response"));
var _ShopItemsCreateRequest = _interopRequireDefault(require("../model/ShopItemsCreateRequest"));
var _ShopItemsDeleteOne200Response = _interopRequireDefault(require("../model/ShopItemsDeleteOne200Response"));
var _ShopItemsList200Response = _interopRequireDefault(require("../model/ShopItemsList200Response"));
var _ShopItemsUpdateOneRequest = _interopRequireDefault(require("../model/ShopItemsUpdateOneRequest"));
var _ShopPurchaseItemFulfillmentStatus = _interopRequireDefault(require("../model/ShopPurchaseItemFulfillmentStatus"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
* Shop service.
* @module api/ShopApi
* @version 0.1.0
*/
class ShopApi {
  /**
  * Constructs a new ShopApi. 
  * @alias module:api/ShopApi
  * @class
  * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
  * default to {@link module:ApiClient#instance} if unspecified.
  */
  constructor(apiClient) {
    this.apiClient = apiClient || _ApiClient.default.instance;
  }

  /**
   * Callback function to receive the result of the memberOrderDeleteOne operation.
   * @callback module:api/ShopApi~memberOrderDeleteOneCallback
   * @param {String} error Error message, if any.
   * @param {module:model/MemberOrderDeleteOne200Response} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Delete order
   * Delete order.  This operation is restricted to elevated roles.
   * @param {String} memberId member id
   * @param {String} orderId order id
   * @param {module:api/ShopApi~memberOrderDeleteOneCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/MemberOrderDeleteOne200Response}
   */
  memberOrderDeleteOne(memberId, orderId, callback) {
    let postBody = null;
    // verify the required parameter 'memberId' is set
    if (memberId === undefined || memberId === null) {
      throw new Error("Missing the required parameter 'memberId' when calling memberOrderDeleteOne");
    }
    // verify the required parameter 'orderId' is set
    if (orderId === undefined || orderId === null) {
      throw new Error("Missing the required parameter 'orderId' when calling memberOrderDeleteOne");
    }
    let pathParams = {
      'memberId': memberId,
      'orderId': orderId
    };
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ['bearerTokenAuth'];
    let contentTypes = [];
    let accepts = ['application/json'];
    let returnType = _MemberOrderDeleteOne200Response.default;
    return this.apiClient.callApi('/members/{memberId}/orders/{orderId}', 'DELETE', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
  }

  /**
   * Callback function to receive the result of the memberOrderItemsQuantityUpdateOne operation.
   * @callback module:api/ShopApi~memberOrderItemsQuantityUpdateOneCallback
   * @param {String} error Error message, if any.
   * @param {module:model/MemberOrdersCreate201Response} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Update order item quantity
   * Update order item.  This operation results in adding an item if not already added.  This operation results in removing an item if quantity is zero.  This operation is restricted to auth member id and elevated roles.
   * @param {String} memberId member id
   * @param {String} orderId order id
   * @param {String} itemId item id
   * @param {Number} quantity item quantity
   * @param {module:api/ShopApi~memberOrderItemsQuantityUpdateOneCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/MemberOrdersCreate201Response}
   */
  memberOrderItemsQuantityUpdateOne(memberId, orderId, itemId, quantity, callback) {
    let postBody = null;
    // verify the required parameter 'memberId' is set
    if (memberId === undefined || memberId === null) {
      throw new Error("Missing the required parameter 'memberId' when calling memberOrderItemsQuantityUpdateOne");
    }
    // verify the required parameter 'orderId' is set
    if (orderId === undefined || orderId === null) {
      throw new Error("Missing the required parameter 'orderId' when calling memberOrderItemsQuantityUpdateOne");
    }
    // verify the required parameter 'itemId' is set
    if (itemId === undefined || itemId === null) {
      throw new Error("Missing the required parameter 'itemId' when calling memberOrderItemsQuantityUpdateOne");
    }
    // verify the required parameter 'quantity' is set
    if (quantity === undefined || quantity === null) {
      throw new Error("Missing the required parameter 'quantity' when calling memberOrderItemsQuantityUpdateOne");
    }
    let pathParams = {
      'memberId': memberId,
      'orderId': orderId,
      'itemId': itemId,
      'quantity': quantity
    };
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ['bearerTokenAuth'];
    let contentTypes = [];
    let accepts = ['application/json'];
    let returnType = _MemberOrdersCreate201Response.default;
    return this.apiClient.callApi('/members/{memberId}/orders/{orderId}/items/{itemId}/quantity/{quantity}', 'PUT', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
  }

  /**
   * Callback function to receive the result of the memberOrderItemsUpdateOne operation.
   * @callback module:api/ShopApi~memberOrderItemsUpdateOneCallback
   * @param {String} error Error message, if any.
   * @param {module:model/MemberOrdersCreate201Response} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Update order item
   * Update order item.  This operation is restricted to elevated roles.
   * @param {String} memberId member id
   * @param {String} orderId order id
   * @param {String} itemId item id
   * @param {Object} opts Optional parameters
   * @param {module:model/MemberOrderItemsUpdateOneRequest} [memberOrderItemsUpdateOneRequest] 
   * @param {module:api/ShopApi~memberOrderItemsUpdateOneCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/MemberOrdersCreate201Response}
   */
  memberOrderItemsUpdateOne(memberId, orderId, itemId, opts, callback) {
    opts = opts || {};
    let postBody = opts['memberOrderItemsUpdateOneRequest'];
    // verify the required parameter 'memberId' is set
    if (memberId === undefined || memberId === null) {
      throw new Error("Missing the required parameter 'memberId' when calling memberOrderItemsUpdateOne");
    }
    // verify the required parameter 'orderId' is set
    if (orderId === undefined || orderId === null) {
      throw new Error("Missing the required parameter 'orderId' when calling memberOrderItemsUpdateOne");
    }
    // verify the required parameter 'itemId' is set
    if (itemId === undefined || itemId === null) {
      throw new Error("Missing the required parameter 'itemId' when calling memberOrderItemsUpdateOne");
    }
    let pathParams = {
      'memberId': memberId,
      'orderId': orderId,
      'itemId': itemId
    };
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ['bearerTokenAuth'];
    let contentTypes = ['application/json'];
    let accepts = ['application/json'];
    let returnType = _MemberOrdersCreate201Response.default;
    return this.apiClient.callApi('/members/{memberId}/orders/{orderId}/items/{itemId}', 'PUT', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
  }

  /**
   * Callback function to receive the result of the memberOrderPaymentList operation.
   * @callback module:api/ShopApi~memberOrderPaymentListCallback
   * @param {String} error Error message, if any.
   * @param {module:model/MemberOrderPaymentList200Response} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * List order payments
   * Return all payments.  This operation is restricted to elevated roles.
   * @param {Object} opts Optional parameters
   * @param {Boolean} [includeDeleted] 
   * @param {module:api/ShopApi~memberOrderPaymentListCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/MemberOrderPaymentList200Response}
   */
  memberOrderPaymentList(opts, callback) {
    opts = opts || {};
    let postBody = null;
    let pathParams = {};
    let queryParams = {
      'includeDeleted': opts['includeDeleted']
    };
    let headerParams = {};
    let formParams = {};
    let authNames = ['bearerTokenAuth'];
    let contentTypes = [];
    let accepts = ['application/json'];
    let returnType = _MemberOrderPaymentList200Response.default;
    return this.apiClient.callApi('/members/orders/payments', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
  }

  /**
   * Callback function to receive the result of the memberOrderPaymentsCreate operation.
   * @callback module:api/ShopApi~memberOrderPaymentsCreateCallback
   * @param {String} error Error message, if any.
   * @param {module:model/MemberOrdersCreate201Response} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Create order payment
   * Create payment associated with SUBMITTED order.  Will only be successful if order is in SUBMITTED status.  The methodCardLast4 is required if method is CARD.  This operation is restricted to auth member id and elevated roles
   * @param {String} memberId member id
   * @param {String} orderId order id
   * @param {Object} opts Optional parameters
   * @param {module:model/MemberOrderPaymentsCreateRequest} [memberOrderPaymentsCreateRequest] 
   * @param {module:api/ShopApi~memberOrderPaymentsCreateCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/MemberOrdersCreate201Response}
   */
  memberOrderPaymentsCreate(memberId, orderId, opts, callback) {
    opts = opts || {};
    let postBody = opts['memberOrderPaymentsCreateRequest'];
    // verify the required parameter 'memberId' is set
    if (memberId === undefined || memberId === null) {
      throw new Error("Missing the required parameter 'memberId' when calling memberOrderPaymentsCreate");
    }
    // verify the required parameter 'orderId' is set
    if (orderId === undefined || orderId === null) {
      throw new Error("Missing the required parameter 'orderId' when calling memberOrderPaymentsCreate");
    }
    let pathParams = {
      'memberId': memberId,
      'orderId': orderId
    };
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ['bearerTokenAuth'];
    let contentTypes = ['application/json'];
    let accepts = ['application/json'];
    let returnType = _MemberOrdersCreate201Response.default;
    return this.apiClient.callApi('/members/{memberId}/orders/{orderId}/payments', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
  }

  /**
   * Callback function to receive the result of the memberOrderPaymentsDeleteOne operation.
   * @callback module:api/ShopApi~memberOrderPaymentsDeleteOneCallback
   * @param {String} error Error message, if any.
   * @param {module:model/MemberOrderPaymentsDeleteOne200Response} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Delete order payment
   * Deletes existing non-deleted member.  This operation is restricted to elevated roles.
   * @param {String} memberId member id
   * @param {String} orderId order id
   * @param {String} paymentId payment id
   * @param {module:api/ShopApi~memberOrderPaymentsDeleteOneCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/MemberOrderPaymentsDeleteOne200Response}
   */
  memberOrderPaymentsDeleteOne(memberId, orderId, paymentId, callback) {
    let postBody = null;
    // verify the required parameter 'memberId' is set
    if (memberId === undefined || memberId === null) {
      throw new Error("Missing the required parameter 'memberId' when calling memberOrderPaymentsDeleteOne");
    }
    // verify the required parameter 'orderId' is set
    if (orderId === undefined || orderId === null) {
      throw new Error("Missing the required parameter 'orderId' when calling memberOrderPaymentsDeleteOne");
    }
    // verify the required parameter 'paymentId' is set
    if (paymentId === undefined || paymentId === null) {
      throw new Error("Missing the required parameter 'paymentId' when calling memberOrderPaymentsDeleteOne");
    }
    let pathParams = {
      'memberId': memberId,
      'orderId': orderId,
      'paymentId': paymentId
    };
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ['bearerTokenAuth'];
    let contentTypes = [];
    let accepts = ['application/json'];
    let returnType = _MemberOrderPaymentsDeleteOne200Response.default;
    return this.apiClient.callApi('/members/{memberId}/orders/{orderId}/payments/{paymentId}', 'DELETE', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
  }

  /**
   * Callback function to receive the result of the memberOrderPaymentsUpdateOneCancel operation.
   * @callback module:api/ShopApi~memberOrderPaymentsUpdateOneCancelCallback
   * @param {String} error Error message, if any.
   * @param {module:model/MemberOrdersCreate201Response} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Cancel order payment
   * Update status of payment associated with order to CANCELLED.  This operation will only be successful if payment status is already PENDING.  This operation is restricted to elevated roles.
   * @param {String} memberId member id
   * @param {String} orderId order id
   * @param {String} paymentId payment id
   * @param {module:api/ShopApi~memberOrderPaymentsUpdateOneCancelCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/MemberOrdersCreate201Response}
   */
  memberOrderPaymentsUpdateOneCancel(memberId, orderId, paymentId, callback) {
    let postBody = null;
    // verify the required parameter 'memberId' is set
    if (memberId === undefined || memberId === null) {
      throw new Error("Missing the required parameter 'memberId' when calling memberOrderPaymentsUpdateOneCancel");
    }
    // verify the required parameter 'orderId' is set
    if (orderId === undefined || orderId === null) {
      throw new Error("Missing the required parameter 'orderId' when calling memberOrderPaymentsUpdateOneCancel");
    }
    // verify the required parameter 'paymentId' is set
    if (paymentId === undefined || paymentId === null) {
      throw new Error("Missing the required parameter 'paymentId' when calling memberOrderPaymentsUpdateOneCancel");
    }
    let pathParams = {
      'memberId': memberId,
      'orderId': orderId,
      'paymentId': paymentId
    };
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ['bearerTokenAuth'];
    let contentTypes = [];
    let accepts = ['application/json'];
    let returnType = _MemberOrdersCreate201Response.default;
    return this.apiClient.callApi('/members/{memberId}/orders/{orderId}/payments/{paymentId}/cancel', 'PUT', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
  }

  /**
   * Callback function to receive the result of the memberOrderPaymentsUpdateOneComplete operation.
   * @callback module:api/ShopApi~memberOrderPaymentsUpdateOneCompleteCallback
   * @param {String} error Error message, if any.
   * @param {module:model/MemberOrdersCreate201Response} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Complete order payment
   * Update status of payment associated with order to COMPLETE.  This operation will only be successful if payment status is already PENDING.  This operation will also change the associated order status to PAID.  This operation is restricted to elevated roles.
   * @param {String} memberId member id
   * @param {String} orderId order id
   * @param {String} paymentId payment id
   * @param {module:api/ShopApi~memberOrderPaymentsUpdateOneCompleteCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/MemberOrdersCreate201Response}
   */
  memberOrderPaymentsUpdateOneComplete(memberId, orderId, paymentId, callback) {
    let postBody = null;
    // verify the required parameter 'memberId' is set
    if (memberId === undefined || memberId === null) {
      throw new Error("Missing the required parameter 'memberId' when calling memberOrderPaymentsUpdateOneComplete");
    }
    // verify the required parameter 'orderId' is set
    if (orderId === undefined || orderId === null) {
      throw new Error("Missing the required parameter 'orderId' when calling memberOrderPaymentsUpdateOneComplete");
    }
    // verify the required parameter 'paymentId' is set
    if (paymentId === undefined || paymentId === null) {
      throw new Error("Missing the required parameter 'paymentId' when calling memberOrderPaymentsUpdateOneComplete");
    }
    let pathParams = {
      'memberId': memberId,
      'orderId': orderId,
      'paymentId': paymentId
    };
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ['bearerTokenAuth'];
    let contentTypes = [];
    let accepts = ['application/json'];
    let returnType = _MemberOrdersCreate201Response.default;
    return this.apiClient.callApi('/members/{memberId}/orders/{orderId}/payments/{paymentId}/complete', 'PUT', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
  }

  /**
   * Callback function to receive the result of the memberOrderPaymentsUpdateOneRefund operation.
   * @callback module:api/ShopApi~memberOrderPaymentsUpdateOneRefundCallback
   * @param {String} error Error message, if any.
   * @param {module:model/MemberOrdersCreate201Response} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Refund order payment
   * Update status of payment associated with order to REFUNDED.  This operation will only be successful if payment status is already COMPLETE.  This operation is restricted to elevated roles.
   * @param {String} memberId member id
   * @param {String} orderId order id
   * @param {String} paymentId payment id
   * @param {module:api/ShopApi~memberOrderPaymentsUpdateOneRefundCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/MemberOrdersCreate201Response}
   */
  memberOrderPaymentsUpdateOneRefund(memberId, orderId, paymentId, callback) {
    let postBody = null;
    // verify the required parameter 'memberId' is set
    if (memberId === undefined || memberId === null) {
      throw new Error("Missing the required parameter 'memberId' when calling memberOrderPaymentsUpdateOneRefund");
    }
    // verify the required parameter 'orderId' is set
    if (orderId === undefined || orderId === null) {
      throw new Error("Missing the required parameter 'orderId' when calling memberOrderPaymentsUpdateOneRefund");
    }
    // verify the required parameter 'paymentId' is set
    if (paymentId === undefined || paymentId === null) {
      throw new Error("Missing the required parameter 'paymentId' when calling memberOrderPaymentsUpdateOneRefund");
    }
    let pathParams = {
      'memberId': memberId,
      'orderId': orderId,
      'paymentId': paymentId
    };
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ['bearerTokenAuth'];
    let contentTypes = [];
    let accepts = ['application/json'];
    let returnType = _MemberOrdersCreate201Response.default;
    return this.apiClient.callApi('/members/{memberId}/orders/{orderId}/payments/{paymentId}/refund', 'PUT', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
  }

  /**
   * Callback function to receive the result of the memberOrdersCreate operation.
   * @callback module:api/ShopApi~memberOrdersCreateCallback
   * @param {String} error Error message, if any.
   * @param {module:model/MemberOrdersCreate201Response} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Create new order
   * Create new order owned by memberId.  This operation is restricted to auth member's memberId unless role is elevated.
   * @param {String} memberId member id
   * @param {module:api/ShopApi~memberOrdersCreateCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/MemberOrdersCreate201Response}
   */
  memberOrdersCreate(memberId, callback) {
    let postBody = null;
    // verify the required parameter 'memberId' is set
    if (memberId === undefined || memberId === null) {
      throw new Error("Missing the required parameter 'memberId' when calling memberOrdersCreate");
    }
    let pathParams = {
      'memberId': memberId
    };
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ['bearerTokenAuth'];
    let contentTypes = [];
    let accepts = ['application/json'];
    let returnType = _MemberOrdersCreate201Response.default;
    return this.apiClient.callApi('/members/{memberId}/orders', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
  }

  /**
   * Callback function to receive the result of the memberOrdersList operation.
   * @callback module:api/ShopApi~memberOrdersListCallback
   * @param {String} error Error message, if any.
   * @param {module:model/MemberOrdersList200Response} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * List member orders
   * Returns all member orders.  This operation is restricted to auth memberId or elevated roles.
   * @param {String} memberId member id
   * @param {Object} opts Optional parameters
   * @param {Boolean} [includeDeleted] 
   * @param {module:api/ShopApi~memberOrdersListCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/MemberOrdersList200Response}
   */
  memberOrdersList(memberId, opts, callback) {
    opts = opts || {};
    let postBody = null;
    // verify the required parameter 'memberId' is set
    if (memberId === undefined || memberId === null) {
      throw new Error("Missing the required parameter 'memberId' when calling memberOrdersList");
    }
    let pathParams = {
      'memberId': memberId
    };
    let queryParams = {
      'includeDeleted': opts['includeDeleted']
    };
    let headerParams = {};
    let formParams = {};
    let authNames = ['bearerTokenAuth'];
    let contentTypes = [];
    let accepts = ['application/json'];
    let returnType = _MemberOrdersList200Response.default;
    return this.apiClient.callApi('/members/{memberId}/orders', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
  }

  /**
   * Callback function to receive the result of the memberOrdersUpdateOne operation.
   * @callback module:api/ShopApi~memberOrdersUpdateOneCallback
   * @param {String} error Error message, if any.
   * @param {module:model/MemberOrdersCreate201Response} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Update member order
   * Update order owned by memberId.  This operation is restricted to elevated roles.
   * @param {String} memberId member id
   * @param {String} orderId order id
   * @param {Object} opts Optional parameters
   * @param {module:model/MemberOrdersUpdateOneRequest} [memberOrdersUpdateOneRequest] 
   * @param {module:api/ShopApi~memberOrdersUpdateOneCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/MemberOrdersCreate201Response}
   */
  memberOrdersUpdateOne(memberId, orderId, opts, callback) {
    opts = opts || {};
    let postBody = opts['memberOrdersUpdateOneRequest'];
    // verify the required parameter 'memberId' is set
    if (memberId === undefined || memberId === null) {
      throw new Error("Missing the required parameter 'memberId' when calling memberOrdersUpdateOne");
    }
    // verify the required parameter 'orderId' is set
    if (orderId === undefined || orderId === null) {
      throw new Error("Missing the required parameter 'orderId' when calling memberOrdersUpdateOne");
    }
    let pathParams = {
      'memberId': memberId,
      'orderId': orderId
    };
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ['bearerTokenAuth'];
    let contentTypes = ['application/json'];
    let accepts = ['application/json'];
    let returnType = _MemberOrdersCreate201Response.default;
    return this.apiClient.callApi('/members/{memberId}/orders/{orderId}', 'PUT', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
  }

  /**
   * Callback function to receive the result of the memberOrdersUpdateOneCancel operation.
   * @callback module:api/ShopApi~memberOrdersUpdateOneCancelCallback
   * @param {String} error Error message, if any.
   * @param {module:model/MemberOrdersCreate201Response} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Cancel order
   * Cancels order, changing order status to CANCELLED.  This operation is allowed unless order is in CLOSED or CONFIRMED status.  This operation is restricted to elevated roles.
   * @param {String} memberId member id
   * @param {String} orderId order id
   * @param {module:api/ShopApi~memberOrdersUpdateOneCancelCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/MemberOrdersCreate201Response}
   */
  memberOrdersUpdateOneCancel(memberId, orderId, callback) {
    let postBody = null;
    // verify the required parameter 'memberId' is set
    if (memberId === undefined || memberId === null) {
      throw new Error("Missing the required parameter 'memberId' when calling memberOrdersUpdateOneCancel");
    }
    // verify the required parameter 'orderId' is set
    if (orderId === undefined || orderId === null) {
      throw new Error("Missing the required parameter 'orderId' when calling memberOrdersUpdateOneCancel");
    }
    let pathParams = {
      'memberId': memberId,
      'orderId': orderId
    };
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ['bearerTokenAuth'];
    let contentTypes = [];
    let accepts = ['application/json'];
    let returnType = _MemberOrdersCreate201Response.default;
    return this.apiClient.callApi('/members/{memberId}/orders/{orderId}/cancel', 'PUT', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
  }

  /**
   * Callback function to receive the result of the memberOrdersUpdateOneConfirm operation.
   * @callback module:api/ShopApi~memberOrdersUpdateOneConfirmCallback
   * @param {String} error Error message, if any.
   * @param {module:model/MemberOrdersCreate201Response} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Confirm paid order
   * Confirms order, creating purchase items and changing order status to CONFIRMED.  This operation is only allowed if order is in PAID status.  This operation is restricted to elevated roles.
   * @param {String} memberId member id
   * @param {String} orderId order id
   * @param {module:api/ShopApi~memberOrdersUpdateOneConfirmCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/MemberOrdersCreate201Response}
   */
  memberOrdersUpdateOneConfirm(memberId, orderId, callback) {
    let postBody = null;
    // verify the required parameter 'memberId' is set
    if (memberId === undefined || memberId === null) {
      throw new Error("Missing the required parameter 'memberId' when calling memberOrdersUpdateOneConfirm");
    }
    // verify the required parameter 'orderId' is set
    if (orderId === undefined || orderId === null) {
      throw new Error("Missing the required parameter 'orderId' when calling memberOrdersUpdateOneConfirm");
    }
    let pathParams = {
      'memberId': memberId,
      'orderId': orderId
    };
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ['bearerTokenAuth'];
    let contentTypes = [];
    let accepts = ['application/json'];
    let returnType = _MemberOrdersCreate201Response.default;
    return this.apiClient.callApi('/members/{memberId}/orders/{orderId}/confirm', 'PUT', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
  }

  /**
   * Callback function to receive the result of the memberOrdersUpdateOneSubmit operation.
   * @callback module:api/ShopApi~memberOrdersUpdateOneSubmitCallback
   * @param {String} error Error message, if any.
   * @param {module:model/MemberOrdersCreate201Response} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Submit paid order
   * Submits order, freezing order items (cart) and changing order status to SUBMITTED.  This operation is only allowed if order is in OPEN status.  This operation is restricted to auth member id and elevated roles.
   * @param {String} memberId member id
   * @param {String} orderId order id
   * @param {module:api/ShopApi~memberOrdersUpdateOneSubmitCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/MemberOrdersCreate201Response}
   */
  memberOrdersUpdateOneSubmit(memberId, orderId, callback) {
    let postBody = null;
    // verify the required parameter 'memberId' is set
    if (memberId === undefined || memberId === null) {
      throw new Error("Missing the required parameter 'memberId' when calling memberOrdersUpdateOneSubmit");
    }
    // verify the required parameter 'orderId' is set
    if (orderId === undefined || orderId === null) {
      throw new Error("Missing the required parameter 'orderId' when calling memberOrdersUpdateOneSubmit");
    }
    let pathParams = {
      'memberId': memberId,
      'orderId': orderId
    };
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ['bearerTokenAuth'];
    let contentTypes = [];
    let accepts = ['application/json'];
    let returnType = _MemberOrdersCreate201Response.default;
    return this.apiClient.callApi('/members/{memberId}/orders/{orderId}/submit', 'PUT', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
  }

  /**
   * Callback function to receive the result of the memberPurchaseItemsFulfillmentStatusUpdateOne operation.
   * @callback module:api/ShopApi~memberPurchaseItemsFulfillmentStatusUpdateOneCallback
   * @param {String} error Error message, if any.
   * @param {module:model/MemberPurchaseItemsUpdateOne200Response} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Update one member purchase item, update fulfillment status
   * Updates fulfillment status on specified member purchase item.  This operation is restricted to elevated roles.
   * @param {String} memberId member id
   * @param {String} purchaseItemId purchase item id
   * @param {Object} opts Optional parameters
   * @param {module:model/MemberPurchaseItemsFulfillmentStatusUpdateOneRequest} [memberPurchaseItemsFulfillmentStatusUpdateOneRequest] 
   * @param {module:api/ShopApi~memberPurchaseItemsFulfillmentStatusUpdateOneCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/MemberPurchaseItemsUpdateOne200Response}
   */
  memberPurchaseItemsFulfillmentStatusUpdateOne(memberId, purchaseItemId, opts, callback) {
    opts = opts || {};
    let postBody = opts['memberPurchaseItemsFulfillmentStatusUpdateOneRequest'];
    // verify the required parameter 'memberId' is set
    if (memberId === undefined || memberId === null) {
      throw new Error("Missing the required parameter 'memberId' when calling memberPurchaseItemsFulfillmentStatusUpdateOne");
    }
    // verify the required parameter 'purchaseItemId' is set
    if (purchaseItemId === undefined || purchaseItemId === null) {
      throw new Error("Missing the required parameter 'purchaseItemId' when calling memberPurchaseItemsFulfillmentStatusUpdateOne");
    }
    let pathParams = {
      'memberId': memberId,
      'purchaseItemId': purchaseItemId
    };
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ['bearerTokenAuth'];
    let contentTypes = ['application/json'];
    let accepts = ['application/json'];
    let returnType = _MemberPurchaseItemsUpdateOne200Response.default;
    return this.apiClient.callApi('/members/{memberId}/purchaseItems/{purchaseItemId}/fulfillmentStatus', 'PUT', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
  }

  /**
   * Callback function to receive the result of the memberPurchaseItemsList operation.
   * @callback module:api/ShopApi~memberPurchaseItemsListCallback
   * @param {String} error Error message, if any.
   * @param {module:model/MemberPurchaseItemsList200Response} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * List member purchase items
   * Returns all member purchase items.  If param filterStatus is provided the results will be filtered by given status.  This operation is restricted to auth memberId or elevated roles.
   * @param {String} memberId member id
   * @param {Object} opts Optional parameters
   * @param {module:model/ShopPurchaseItemFulfillmentStatus} [filterStatus] member id
   * @param {Boolean} [includeDeleted] 
   * @param {module:api/ShopApi~memberPurchaseItemsListCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/MemberPurchaseItemsList200Response}
   */
  memberPurchaseItemsList(memberId, opts, callback) {
    opts = opts || {};
    let postBody = null;
    // verify the required parameter 'memberId' is set
    if (memberId === undefined || memberId === null) {
      throw new Error("Missing the required parameter 'memberId' when calling memberPurchaseItemsList");
    }
    let pathParams = {
      'memberId': memberId
    };
    let queryParams = {
      'filterStatus': opts['filterStatus'],
      'includeDeleted': opts['includeDeleted']
    };
    let headerParams = {};
    let formParams = {};
    let authNames = ['bearerTokenAuth'];
    let contentTypes = [];
    let accepts = ['application/json'];
    let returnType = _MemberPurchaseItemsList200Response.default;
    return this.apiClient.callApi('/members/{memberId}/purchaseItems', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
  }

  /**
   * Callback function to receive the result of the memberPurchaseItemsUpdateOne operation.
   * @callback module:api/ShopApi~memberPurchaseItemsUpdateOneCallback
   * @param {String} error Error message, if any.
   * @param {module:model/MemberPurchaseItemsUpdateOne200Response} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Update one member purchase item
   * Updates specified member purchase item.  This operation is restricted to elevated roles.
   * @param {String} memberId member id
   * @param {String} purchaseItemId purchase item id
   * @param {Object} opts Optional parameters
   * @param {module:model/MemberPurchaseItemsUpdateOneRequest} [memberPurchaseItemsUpdateOneRequest] 
   * @param {module:api/ShopApi~memberPurchaseItemsUpdateOneCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/MemberPurchaseItemsUpdateOne200Response}
   */
  memberPurchaseItemsUpdateOne(memberId, purchaseItemId, opts, callback) {
    opts = opts || {};
    let postBody = opts['memberPurchaseItemsUpdateOneRequest'];
    // verify the required parameter 'memberId' is set
    if (memberId === undefined || memberId === null) {
      throw new Error("Missing the required parameter 'memberId' when calling memberPurchaseItemsUpdateOne");
    }
    // verify the required parameter 'purchaseItemId' is set
    if (purchaseItemId === undefined || purchaseItemId === null) {
      throw new Error("Missing the required parameter 'purchaseItemId' when calling memberPurchaseItemsUpdateOne");
    }
    let pathParams = {
      'memberId': memberId,
      'purchaseItemId': purchaseItemId
    };
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ['bearerTokenAuth'];
    let contentTypes = ['application/json'];
    let accepts = ['application/json'];
    let returnType = _MemberPurchaseItemsUpdateOne200Response.default;
    return this.apiClient.callApi('/members/{memberId}/purchaseItems/{purchaseItemId}', 'PUT', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
  }

  /**
   * Callback function to receive the result of the shopItemsCreate operation.
   * @callback module:api/ShopApi~shopItemsCreateCallback
   * @param {String} error Error message, if any.
   * @param {module:model/ShopItemsCreate201Response} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Create shop item
   * Create shop item.  This operation is restricted to elevated roles.
   * @param {Object} opts Optional parameters
   * @param {module:model/ShopItemsCreateRequest} [shopItemsCreateRequest] 
   * @param {module:api/ShopApi~shopItemsCreateCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/ShopItemsCreate201Response}
   */
  shopItemsCreate(opts, callback) {
    opts = opts || {};
    let postBody = opts['shopItemsCreateRequest'];
    let pathParams = {};
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ['bearerTokenAuth'];
    let contentTypes = ['application/json'];
    let accepts = ['application/json'];
    let returnType = _ShopItemsCreate201Response.default;
    return this.apiClient.callApi('/shop/items', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
  }

  /**
   * Callback function to receive the result of the shopItemsDeleteOne operation.
   * @callback module:api/ShopApi~shopItemsDeleteOneCallback
   * @param {String} error Error message, if any.
   * @param {module:model/ShopItemsDeleteOne200Response} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Delete shop item
   * Delete shop item.  This operation is restricted to users with elevated role.
   * @param {String} itemId item id
   * @param {module:api/ShopApi~shopItemsDeleteOneCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/ShopItemsDeleteOne200Response}
   */
  shopItemsDeleteOne(itemId, callback) {
    let postBody = null;
    // verify the required parameter 'itemId' is set
    if (itemId === undefined || itemId === null) {
      throw new Error("Missing the required parameter 'itemId' when calling shopItemsDeleteOne");
    }
    let pathParams = {
      'itemId': itemId
    };
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ['bearerTokenAuth'];
    let contentTypes = [];
    let accepts = ['application/json'];
    let returnType = _ShopItemsDeleteOne200Response.default;
    return this.apiClient.callApi('/shop/items/{itemId}', 'DELETE', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
  }

  /**
   * Callback function to receive the result of the shopItemsList operation.
   * @callback module:api/ShopApi~shopItemsListCallback
   * @param {String} error Error message, if any.
   * @param {module:model/ShopItemsList200Response} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * List shop items
   * Returns all items available via shop.  This operation is restricted to elevated roles
   * @param {Object} opts Optional parameters
   * @param {Boolean} [includeDeleted] 
   * @param {module:api/ShopApi~shopItemsListCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/ShopItemsList200Response}
   */
  shopItemsList(opts, callback) {
    opts = opts || {};
    let postBody = null;
    let pathParams = {};
    let queryParams = {
      'includeDeleted': opts['includeDeleted']
    };
    let headerParams = {};
    let formParams = {};
    let authNames = ['bearerTokenAuth'];
    let contentTypes = [];
    let accepts = ['application/json'];
    let returnType = _ShopItemsList200Response.default;
    return this.apiClient.callApi('/shop/items', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
  }

  /**
   * Callback function to receive the result of the shopItemsUpdateOne operation.
   * @callback module:api/ShopApi~shopItemsUpdateOneCallback
   * @param {String} error Error message, if any.
   * @param {module:model/ShopItemsCreate201Response} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Update shop item
   * Update shop item.  This operation is restricted to users with elevated role.
   * @param {String} itemId item id
   * @param {Object} opts Optional parameters
   * @param {module:model/ShopItemsUpdateOneRequest} [shopItemsUpdateOneRequest] 
   * @param {module:api/ShopApi~shopItemsUpdateOneCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/ShopItemsCreate201Response}
   */
  shopItemsUpdateOne(itemId, opts, callback) {
    opts = opts || {};
    let postBody = opts['shopItemsUpdateOneRequest'];
    // verify the required parameter 'itemId' is set
    if (itemId === undefined || itemId === null) {
      throw new Error("Missing the required parameter 'itemId' when calling shopItemsUpdateOne");
    }
    let pathParams = {
      'itemId': itemId
    };
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let authNames = ['bearerTokenAuth'];
    let contentTypes = ['application/json'];
    let accepts = ['application/json'];
    let returnType = _ShopItemsCreate201Response.default;
    return this.apiClient.callApi('/shop/items/{itemId}', 'PUT', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
  }
}
exports.default = ShopApi;

},{"../ApiClient":16,"../model/AuthEmailUpdateVerify404Response":34,"../model/AuthLoginCreate400Response":37,"../model/AuthLoginCreate401Response":38,"../model/MemberOrderDeleteOne200Response":66,"../model/MemberOrderItemsUpdateOneRequest":67,"../model/MemberOrderPaymentList200Response":68,"../model/MemberOrderPaymentsCreate409Response":69,"../model/MemberOrderPaymentsCreateRequest":70,"../model/MemberOrderPaymentsDeleteOne200Response":71,"../model/MemberOrderPaymentsUpdateOneCancel409Response":72,"../model/MemberOrdersCreate201Response":73,"../model/MemberOrdersCreate409Response":74,"../model/MemberOrdersList200Response":75,"../model/MemberOrdersUpdateOne409Response":76,"../model/MemberOrdersUpdateOneRequest":77,"../model/MemberPurchaseItemsFulfillmentStatusUpdateOneRequest":83,"../model/MemberPurchaseItemsList200Response":84,"../model/MemberPurchaseItemsUpdateOne200Response":85,"../model/MemberPurchaseItemsUpdateOne409Response":86,"../model/MemberPurchaseItemsUpdateOneRequest":87,"../model/ShopItemsCreate201Response":116,"../model/ShopItemsCreate409Response":117,"../model/ShopItemsCreateRequest":118,"../model/ShopItemsDeleteOne200Response":119,"../model/ShopItemsList200Response":120,"../model/ShopItemsUpdateOneRequest":121,"../model/ShopPurchaseItemFulfillmentStatus":125}],26:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "AccountsApi", {
  enumerable: true,
  get: function () {
    return _AccountsApi.default;
  }
});
Object.defineProperty(exports, "AccountsDeleteOne200Response", {
  enumerable: true,
  get: function () {
    return _AccountsDeleteOne200Response.default;
  }
});
Object.defineProperty(exports, "AccountsList200Response", {
  enumerable: true,
  get: function () {
    return _AccountsList200Response.default;
  }
});
Object.defineProperty(exports, "AdminApi", {
  enumerable: true,
  get: function () {
    return _AdminApi.default;
  }
});
Object.defineProperty(exports, "ApiClient", {
  enumerable: true,
  get: function () {
    return _ApiClient.default;
  }
});
Object.defineProperty(exports, "AuthAccountPasswordResetCreate200Response", {
  enumerable: true,
  get: function () {
    return _AuthAccountPasswordResetCreate200Response.default;
  }
});
Object.defineProperty(exports, "AuthApi", {
  enumerable: true,
  get: function () {
    return _AuthApi.default;
  }
});
Object.defineProperty(exports, "AuthEmailUpdateRequest200Response", {
  enumerable: true,
  get: function () {
    return _AuthEmailUpdateRequest200Response.default;
  }
});
Object.defineProperty(exports, "AuthEmailUpdateRequest409Response", {
  enumerable: true,
  get: function () {
    return _AuthEmailUpdateRequest409Response.default;
  }
});
Object.defineProperty(exports, "AuthEmailUpdateRequestRequest", {
  enumerable: true,
  get: function () {
    return _AuthEmailUpdateRequestRequest.default;
  }
});
Object.defineProperty(exports, "AuthEmailUpdateVerify200Response", {
  enumerable: true,
  get: function () {
    return _AuthEmailUpdateVerify200Response.default;
  }
});
Object.defineProperty(exports, "AuthEmailUpdateVerify404Response", {
  enumerable: true,
  get: function () {
    return _AuthEmailUpdateVerify404Response.default;
  }
});
Object.defineProperty(exports, "AuthLoginCreate200Response", {
  enumerable: true,
  get: function () {
    return _AuthLoginCreate200Response.default;
  }
});
Object.defineProperty(exports, "AuthLoginCreate200ResponseAuthTokens", {
  enumerable: true,
  get: function () {
    return _AuthLoginCreate200ResponseAuthTokens.default;
  }
});
Object.defineProperty(exports, "AuthLoginCreate400Response", {
  enumerable: true,
  get: function () {
    return _AuthLoginCreate400Response.default;
  }
});
Object.defineProperty(exports, "AuthLoginCreate401Response", {
  enumerable: true,
  get: function () {
    return _AuthLoginCreate401Response.default;
  }
});
Object.defineProperty(exports, "AuthLoginCreate403Response", {
  enumerable: true,
  get: function () {
    return _AuthLoginCreate403Response.default;
  }
});
Object.defineProperty(exports, "AuthLoginCreate409Response", {
  enumerable: true,
  get: function () {
    return _AuthLoginCreate409Response.default;
  }
});
Object.defineProperty(exports, "AuthLoginCreateRequest", {
  enumerable: true,
  get: function () {
    return _AuthLoginCreateRequest.default;
  }
});
Object.defineProperty(exports, "AuthPasswordUpdate200Response", {
  enumerable: true,
  get: function () {
    return _AuthPasswordUpdate200Response.default;
  }
});
Object.defineProperty(exports, "AuthPasswordUpdateRequest", {
  enumerable: true,
  get: function () {
    return _AuthPasswordUpdateRequest.default;
  }
});
Object.defineProperty(exports, "AuthRefreshCreate200Response", {
  enumerable: true,
  get: function () {
    return _AuthRefreshCreate200Response.default;
  }
});
Object.defineProperty(exports, "AuthRefreshCreate200ResponseAuthTokens", {
  enumerable: true,
  get: function () {
    return _AuthRefreshCreate200ResponseAuthTokens.default;
  }
});
Object.defineProperty(exports, "AuthRole", {
  enumerable: true,
  get: function () {
    return _AuthRole.default;
  }
});
Object.defineProperty(exports, "AuthToken", {
  enumerable: true,
  get: function () {
    return _AuthToken.default;
  }
});
Object.defineProperty(exports, "CredentialCardsApi", {
  enumerable: true,
  get: function () {
    return _CredentialCardsApi.default;
  }
});
Object.defineProperty(exports, "CredentialCardsGetOne200Response", {
  enumerable: true,
  get: function () {
    return _CredentialCardsGetOne200Response.default;
  }
});
Object.defineProperty(exports, "DirectoryApi", {
  enumerable: true,
  get: function () {
    return _DirectoryApi.default;
  }
});
Object.defineProperty(exports, "DirectoryListing", {
  enumerable: true,
  get: function () {
    return _DirectoryListing.default;
  }
});
Object.defineProperty(exports, "DirectoryListingsList200Response", {
  enumerable: true,
  get: function () {
    return _DirectoryListingsList200Response.default;
  }
});
Object.defineProperty(exports, "DocsApi", {
  enumerable: true,
  get: function () {
    return _DocsApi.default;
  }
});
Object.defineProperty(exports, "MemberCredentialCardsCreate201Response", {
  enumerable: true,
  get: function () {
    return _MemberCredentialCardsCreate201Response.default;
  }
});
Object.defineProperty(exports, "MemberCredentialCardsCreate409Response", {
  enumerable: true,
  get: function () {
    return _MemberCredentialCardsCreate409Response.default;
  }
});
Object.defineProperty(exports, "MemberCredentialCardsCreateRequest", {
  enumerable: true,
  get: function () {
    return _MemberCredentialCardsCreateRequest.default;
  }
});
Object.defineProperty(exports, "MemberCredentialCardsDeleteOne200Response", {
  enumerable: true,
  get: function () {
    return _MemberCredentialCardsDeleteOne200Response.default;
  }
});
Object.defineProperty(exports, "MemberCredentialCardsList200Response", {
  enumerable: true,
  get: function () {
    return _MemberCredentialCardsList200Response.default;
  }
});
Object.defineProperty(exports, "MemberCredentialCardsUpdateOneExpiryRequest", {
  enumerable: true,
  get: function () {
    return _MemberCredentialCardsUpdateOneExpiryRequest.default;
  }
});
Object.defineProperty(exports, "MemberCredentialCardsUpdateOnePrint409Response", {
  enumerable: true,
  get: function () {
    return _MemberCredentialCardsUpdateOnePrint409Response.default;
  }
});
Object.defineProperty(exports, "MemberCredentialCardsUpdateOneVerify409Response", {
  enumerable: true,
  get: function () {
    return _MemberCredentialCardsUpdateOneVerify409Response.default;
  }
});
Object.defineProperty(exports, "MemberDocsDeleteOne200Response", {
  enumerable: true,
  get: function () {
    return _MemberDocsDeleteOne200Response.default;
  }
});
Object.defineProperty(exports, "MemberDocsGet200Response", {
  enumerable: true,
  get: function () {
    return _MemberDocsGet200Response.default;
  }
});
Object.defineProperty(exports, "MemberDocsUpdateOne200Response", {
  enumerable: true,
  get: function () {
    return _MemberDocsUpdateOne200Response.default;
  }
});
Object.defineProperty(exports, "MemberGender", {
  enumerable: true,
  get: function () {
    return _MemberGender.default;
  }
});
Object.defineProperty(exports, "MemberInterestsCommittee", {
  enumerable: true,
  get: function () {
    return _MemberInterestsCommittee.default;
  }
});
Object.defineProperty(exports, "MemberInterestsIndividual", {
  enumerable: true,
  get: function () {
    return _MemberInterestsIndividual.default;
  }
});
Object.defineProperty(exports, "MemberNationalityStatus", {
  enumerable: true,
  get: function () {
    return _MemberNationalityStatus.default;
  }
});
Object.defineProperty(exports, "MemberOrderDeleteOne200Response", {
  enumerable: true,
  get: function () {
    return _MemberOrderDeleteOne200Response.default;
  }
});
Object.defineProperty(exports, "MemberOrderItemsUpdateOneRequest", {
  enumerable: true,
  get: function () {
    return _MemberOrderItemsUpdateOneRequest.default;
  }
});
Object.defineProperty(exports, "MemberOrderPaymentList200Response", {
  enumerable: true,
  get: function () {
    return _MemberOrderPaymentList200Response.default;
  }
});
Object.defineProperty(exports, "MemberOrderPaymentsCreate409Response", {
  enumerable: true,
  get: function () {
    return _MemberOrderPaymentsCreate409Response.default;
  }
});
Object.defineProperty(exports, "MemberOrderPaymentsCreateRequest", {
  enumerable: true,
  get: function () {
    return _MemberOrderPaymentsCreateRequest.default;
  }
});
Object.defineProperty(exports, "MemberOrderPaymentsDeleteOne200Response", {
  enumerable: true,
  get: function () {
    return _MemberOrderPaymentsDeleteOne200Response.default;
  }
});
Object.defineProperty(exports, "MemberOrderPaymentsUpdateOneCancel409Response", {
  enumerable: true,
  get: function () {
    return _MemberOrderPaymentsUpdateOneCancel409Response.default;
  }
});
Object.defineProperty(exports, "MemberOrdersCreate201Response", {
  enumerable: true,
  get: function () {
    return _MemberOrdersCreate201Response.default;
  }
});
Object.defineProperty(exports, "MemberOrdersCreate409Response", {
  enumerable: true,
  get: function () {
    return _MemberOrdersCreate409Response.default;
  }
});
Object.defineProperty(exports, "MemberOrdersList200Response", {
  enumerable: true,
  get: function () {
    return _MemberOrdersList200Response.default;
  }
});
Object.defineProperty(exports, "MemberOrdersUpdateOne409Response", {
  enumerable: true,
  get: function () {
    return _MemberOrdersUpdateOne409Response.default;
  }
});
Object.defineProperty(exports, "MemberOrdersUpdateOneRequest", {
  enumerable: true,
  get: function () {
    return _MemberOrdersUpdateOneRequest.default;
  }
});
Object.defineProperty(exports, "MemberProfileCounty", {
  enumerable: true,
  get: function () {
    return _MemberProfileCounty.default;
  }
});
Object.defineProperty(exports, "MemberProfileDocsDeleteOne200Response", {
  enumerable: true,
  get: function () {
    return _MemberProfileDocsDeleteOne200Response.default;
  }
});
Object.defineProperty(exports, "MemberProfileDocsUpdateOne409Response", {
  enumerable: true,
  get: function () {
    return _MemberProfileDocsUpdateOne409Response.default;
  }
});
Object.defineProperty(exports, "MemberProfileGet200Response", {
  enumerable: true,
  get: function () {
    return _MemberProfileGet200Response.default;
  }
});
Object.defineProperty(exports, "MemberProfileUpdateRequest", {
  enumerable: true,
  get: function () {
    return _MemberProfileUpdateRequest.default;
  }
});
Object.defineProperty(exports, "MemberProfilesApi", {
  enumerable: true,
  get: function () {
    return _MemberProfilesApi.default;
  }
});
Object.defineProperty(exports, "MemberPurchaseItemsFulfillmentStatusUpdateOneRequest", {
  enumerable: true,
  get: function () {
    return _MemberPurchaseItemsFulfillmentStatusUpdateOneRequest.default;
  }
});
Object.defineProperty(exports, "MemberPurchaseItemsList200Response", {
  enumerable: true,
  get: function () {
    return _MemberPurchaseItemsList200Response.default;
  }
});
Object.defineProperty(exports, "MemberPurchaseItemsUpdateOne200Response", {
  enumerable: true,
  get: function () {
    return _MemberPurchaseItemsUpdateOne200Response.default;
  }
});
Object.defineProperty(exports, "MemberPurchaseItemsUpdateOne409Response", {
  enumerable: true,
  get: function () {
    return _MemberPurchaseItemsUpdateOne409Response.default;
  }
});
Object.defineProperty(exports, "MemberPurchaseItemsUpdateOneRequest", {
  enumerable: true,
  get: function () {
    return _MemberPurchaseItemsUpdateOneRequest.default;
  }
});
Object.defineProperty(exports, "MemberRole", {
  enumerable: true,
  get: function () {
    return _MemberRole.default;
  }
});
Object.defineProperty(exports, "MemberStatus", {
  enumerable: true,
  get: function () {
    return _MemberStatus.default;
  }
});
Object.defineProperty(exports, "MemberUpdateRequest", {
  enumerable: true,
  get: function () {
    return _MemberUpdateRequest.default;
  }
});
Object.defineProperty(exports, "MembersApi", {
  enumerable: true,
  get: function () {
    return _MembersApi.default;
  }
});
Object.defineProperty(exports, "MembersCreateRequest", {
  enumerable: true,
  get: function () {
    return _MembersCreateRequest.default;
  }
});
Object.defineProperty(exports, "MembersDeleteOne200Response", {
  enumerable: true,
  get: function () {
    return _MembersDeleteOne200Response.default;
  }
});
Object.defineProperty(exports, "MembersList200Response", {
  enumerable: true,
  get: function () {
    return _MembersList200Response.default;
  }
});
Object.defineProperty(exports, "MembershipDocKey", {
  enumerable: true,
  get: function () {
    return _MembershipDocKey.default;
  }
});
Object.defineProperty(exports, "MembershipSignup201Response", {
  enumerable: true,
  get: function () {
    return _MembershipSignup201Response.default;
  }
});
Object.defineProperty(exports, "MembershipSignup409Response", {
  enumerable: true,
  get: function () {
    return _MembershipSignup409Response.default;
  }
});
Object.defineProperty(exports, "MembershipSignupRequest", {
  enumerable: true,
  get: function () {
    return _MembershipSignupRequest.default;
  }
});
Object.defineProperty(exports, "ResAccount", {
  enumerable: true,
  get: function () {
    return _ResAccount.default;
  }
});
Object.defineProperty(exports, "ResCredentialCard", {
  enumerable: true,
  get: function () {
    return _ResCredentialCard.default;
  }
});
Object.defineProperty(exports, "ResMember", {
  enumerable: true,
  get: function () {
    return _ResMember.default;
  }
});
Object.defineProperty(exports, "ResMemberBase", {
  enumerable: true,
  get: function () {
    return _ResMemberBase.default;
  }
});
Object.defineProperty(exports, "ResMemberBaseNationality", {
  enumerable: true,
  get: function () {
    return _ResMemberBaseNationality.default;
  }
});
Object.defineProperty(exports, "ResMemberDoc", {
  enumerable: true,
  get: function () {
    return _ResMemberDoc.default;
  }
});
Object.defineProperty(exports, "ResMemberFeesDonations", {
  enumerable: true,
  get: function () {
    return _ResMemberFeesDonations.default;
  }
});
Object.defineProperty(exports, "ResMemberProfile", {
  enumerable: true,
  get: function () {
    return _ResMemberProfile.default;
  }
});
Object.defineProperty(exports, "ResMemberProfileDocs", {
  enumerable: true,
  get: function () {
    return _ResMemberProfileDocs.default;
  }
});
Object.defineProperty(exports, "ResMembershipDocs", {
  enumerable: true,
  get: function () {
    return _ResMembershipDocs.default;
  }
});
Object.defineProperty(exports, "ResPublicCredentialCard", {
  enumerable: true,
  get: function () {
    return _ResPublicCredentialCard.default;
  }
});
Object.defineProperty(exports, "ResShopItem", {
  enumerable: true,
  get: function () {
    return _ResShopItem.default;
  }
});
Object.defineProperty(exports, "ResShopOrder", {
  enumerable: true,
  get: function () {
    return _ResShopOrder.default;
  }
});
Object.defineProperty(exports, "ResShopOrderItem", {
  enumerable: true,
  get: function () {
    return _ResShopOrderItem.default;
  }
});
Object.defineProperty(exports, "ResShopOrderPayment", {
  enumerable: true,
  get: function () {
    return _ResShopOrderPayment.default;
  }
});
Object.defineProperty(exports, "ResShopOrderTotals", {
  enumerable: true,
  get: function () {
    return _ResShopOrderTotals.default;
  }
});
Object.defineProperty(exports, "ResShopPurchaseItem", {
  enumerable: true,
  get: function () {
    return _ResShopPurchaseItem.default;
  }
});
Object.defineProperty(exports, "ShopApi", {
  enumerable: true,
  get: function () {
    return _ShopApi.default;
  }
});
Object.defineProperty(exports, "ShopItemType", {
  enumerable: true,
  get: function () {
    return _ShopItemType.default;
  }
});
Object.defineProperty(exports, "ShopItemsCreate201Response", {
  enumerable: true,
  get: function () {
    return _ShopItemsCreate201Response.default;
  }
});
Object.defineProperty(exports, "ShopItemsCreate409Response", {
  enumerable: true,
  get: function () {
    return _ShopItemsCreate409Response.default;
  }
});
Object.defineProperty(exports, "ShopItemsCreateRequest", {
  enumerable: true,
  get: function () {
    return _ShopItemsCreateRequest.default;
  }
});
Object.defineProperty(exports, "ShopItemsDeleteOne200Response", {
  enumerable: true,
  get: function () {
    return _ShopItemsDeleteOne200Response.default;
  }
});
Object.defineProperty(exports, "ShopItemsList200Response", {
  enumerable: true,
  get: function () {
    return _ShopItemsList200Response.default;
  }
});
Object.defineProperty(exports, "ShopItemsUpdateOneRequest", {
  enumerable: true,
  get: function () {
    return _ShopItemsUpdateOneRequest.default;
  }
});
Object.defineProperty(exports, "ShopOrderPaymentMethod", {
  enumerable: true,
  get: function () {
    return _ShopOrderPaymentMethod.default;
  }
});
Object.defineProperty(exports, "ShopOrderPaymentStatus", {
  enumerable: true,
  get: function () {
    return _ShopOrderPaymentStatus.default;
  }
});
Object.defineProperty(exports, "ShopOrderStatus", {
  enumerable: true,
  get: function () {
    return _ShopOrderStatus.default;
  }
});
Object.defineProperty(exports, "ShopPurchaseItemFulfillmentStatus", {
  enumerable: true,
  get: function () {
    return _ShopPurchaseItemFulfillmentStatus.default;
  }
});
var _ApiClient = _interopRequireDefault(require("./ApiClient"));
var _AccountsDeleteOne200Response = _interopRequireDefault(require("./model/AccountsDeleteOne200Response"));
var _AccountsList200Response = _interopRequireDefault(require("./model/AccountsList200Response"));
var _AuthAccountPasswordResetCreate200Response = _interopRequireDefault(require("./model/AuthAccountPasswordResetCreate200Response"));
var _AuthEmailUpdateRequest200Response = _interopRequireDefault(require("./model/AuthEmailUpdateRequest200Response"));
var _AuthEmailUpdateRequest409Response = _interopRequireDefault(require("./model/AuthEmailUpdateRequest409Response"));
var _AuthEmailUpdateRequestRequest = _interopRequireDefault(require("./model/AuthEmailUpdateRequestRequest"));
var _AuthEmailUpdateVerify200Response = _interopRequireDefault(require("./model/AuthEmailUpdateVerify200Response"));
var _AuthEmailUpdateVerify404Response = _interopRequireDefault(require("./model/AuthEmailUpdateVerify404Response"));
var _AuthLoginCreate200Response = _interopRequireDefault(require("./model/AuthLoginCreate200Response"));
var _AuthLoginCreate200ResponseAuthTokens = _interopRequireDefault(require("./model/AuthLoginCreate200ResponseAuthTokens"));
var _AuthLoginCreate400Response = _interopRequireDefault(require("./model/AuthLoginCreate400Response"));
var _AuthLoginCreate401Response = _interopRequireDefault(require("./model/AuthLoginCreate401Response"));
var _AuthLoginCreate403Response = _interopRequireDefault(require("./model/AuthLoginCreate403Response"));
var _AuthLoginCreate409Response = _interopRequireDefault(require("./model/AuthLoginCreate409Response"));
var _AuthLoginCreateRequest = _interopRequireDefault(require("./model/AuthLoginCreateRequest"));
var _AuthPasswordUpdate200Response = _interopRequireDefault(require("./model/AuthPasswordUpdate200Response"));
var _AuthPasswordUpdateRequest = _interopRequireDefault(require("./model/AuthPasswordUpdateRequest"));
var _AuthRefreshCreate200Response = _interopRequireDefault(require("./model/AuthRefreshCreate200Response"));
var _AuthRefreshCreate200ResponseAuthTokens = _interopRequireDefault(require("./model/AuthRefreshCreate200ResponseAuthTokens"));
var _AuthRole = _interopRequireDefault(require("./model/AuthRole"));
var _AuthToken = _interopRequireDefault(require("./model/AuthToken"));
var _CredentialCardsGetOne200Response = _interopRequireDefault(require("./model/CredentialCardsGetOne200Response"));
var _DirectoryListing = _interopRequireDefault(require("./model/DirectoryListing"));
var _DirectoryListingsList200Response = _interopRequireDefault(require("./model/DirectoryListingsList200Response"));
var _MemberCredentialCardsCreate201Response = _interopRequireDefault(require("./model/MemberCredentialCardsCreate201Response"));
var _MemberCredentialCardsCreate409Response = _interopRequireDefault(require("./model/MemberCredentialCardsCreate409Response"));
var _MemberCredentialCardsCreateRequest = _interopRequireDefault(require("./model/MemberCredentialCardsCreateRequest"));
var _MemberCredentialCardsDeleteOne200Response = _interopRequireDefault(require("./model/MemberCredentialCardsDeleteOne200Response"));
var _MemberCredentialCardsList200Response = _interopRequireDefault(require("./model/MemberCredentialCardsList200Response"));
var _MemberCredentialCardsUpdateOneExpiryRequest = _interopRequireDefault(require("./model/MemberCredentialCardsUpdateOneExpiryRequest"));
var _MemberCredentialCardsUpdateOnePrint409Response = _interopRequireDefault(require("./model/MemberCredentialCardsUpdateOnePrint409Response"));
var _MemberCredentialCardsUpdateOneVerify409Response = _interopRequireDefault(require("./model/MemberCredentialCardsUpdateOneVerify409Response"));
var _MemberDocsDeleteOne200Response = _interopRequireDefault(require("./model/MemberDocsDeleteOne200Response"));
var _MemberDocsGet200Response = _interopRequireDefault(require("./model/MemberDocsGet200Response"));
var _MemberDocsUpdateOne200Response = _interopRequireDefault(require("./model/MemberDocsUpdateOne200Response"));
var _MemberGender = _interopRequireDefault(require("./model/MemberGender"));
var _MemberInterestsCommittee = _interopRequireDefault(require("./model/MemberInterestsCommittee"));
var _MemberInterestsIndividual = _interopRequireDefault(require("./model/MemberInterestsIndividual"));
var _MemberNationalityStatus = _interopRequireDefault(require("./model/MemberNationalityStatus"));
var _MemberOrderDeleteOne200Response = _interopRequireDefault(require("./model/MemberOrderDeleteOne200Response"));
var _MemberOrderItemsUpdateOneRequest = _interopRequireDefault(require("./model/MemberOrderItemsUpdateOneRequest"));
var _MemberOrderPaymentList200Response = _interopRequireDefault(require("./model/MemberOrderPaymentList200Response"));
var _MemberOrderPaymentsCreate409Response = _interopRequireDefault(require("./model/MemberOrderPaymentsCreate409Response"));
var _MemberOrderPaymentsCreateRequest = _interopRequireDefault(require("./model/MemberOrderPaymentsCreateRequest"));
var _MemberOrderPaymentsDeleteOne200Response = _interopRequireDefault(require("./model/MemberOrderPaymentsDeleteOne200Response"));
var _MemberOrderPaymentsUpdateOneCancel409Response = _interopRequireDefault(require("./model/MemberOrderPaymentsUpdateOneCancel409Response"));
var _MemberOrdersCreate201Response = _interopRequireDefault(require("./model/MemberOrdersCreate201Response"));
var _MemberOrdersCreate409Response = _interopRequireDefault(require("./model/MemberOrdersCreate409Response"));
var _MemberOrdersList200Response = _interopRequireDefault(require("./model/MemberOrdersList200Response"));
var _MemberOrdersUpdateOne409Response = _interopRequireDefault(require("./model/MemberOrdersUpdateOne409Response"));
var _MemberOrdersUpdateOneRequest = _interopRequireDefault(require("./model/MemberOrdersUpdateOneRequest"));
var _MemberProfileCounty = _interopRequireDefault(require("./model/MemberProfileCounty"));
var _MemberProfileDocsDeleteOne200Response = _interopRequireDefault(require("./model/MemberProfileDocsDeleteOne200Response"));
var _MemberProfileDocsUpdateOne409Response = _interopRequireDefault(require("./model/MemberProfileDocsUpdateOne409Response"));
var _MemberProfileGet200Response = _interopRequireDefault(require("./model/MemberProfileGet200Response"));
var _MemberProfileUpdateRequest = _interopRequireDefault(require("./model/MemberProfileUpdateRequest"));
var _MemberPurchaseItemsFulfillmentStatusUpdateOneRequest = _interopRequireDefault(require("./model/MemberPurchaseItemsFulfillmentStatusUpdateOneRequest"));
var _MemberPurchaseItemsList200Response = _interopRequireDefault(require("./model/MemberPurchaseItemsList200Response"));
var _MemberPurchaseItemsUpdateOne200Response = _interopRequireDefault(require("./model/MemberPurchaseItemsUpdateOne200Response"));
var _MemberPurchaseItemsUpdateOne409Response = _interopRequireDefault(require("./model/MemberPurchaseItemsUpdateOne409Response"));
var _MemberPurchaseItemsUpdateOneRequest = _interopRequireDefault(require("./model/MemberPurchaseItemsUpdateOneRequest"));
var _MemberRole = _interopRequireDefault(require("./model/MemberRole"));
var _MemberStatus = _interopRequireDefault(require("./model/MemberStatus"));
var _MemberUpdateRequest = _interopRequireDefault(require("./model/MemberUpdateRequest"));
var _MembersCreateRequest = _interopRequireDefault(require("./model/MembersCreateRequest"));
var _MembersDeleteOne200Response = _interopRequireDefault(require("./model/MembersDeleteOne200Response"));
var _MembersList200Response = _interopRequireDefault(require("./model/MembersList200Response"));
var _MembershipDocKey = _interopRequireDefault(require("./model/MembershipDocKey"));
var _MembershipSignup201Response = _interopRequireDefault(require("./model/MembershipSignup201Response"));
var _MembershipSignup409Response = _interopRequireDefault(require("./model/MembershipSignup409Response"));
var _MembershipSignupRequest = _interopRequireDefault(require("./model/MembershipSignupRequest"));
var _ResAccount = _interopRequireDefault(require("./model/ResAccount"));
var _ResCredentialCard = _interopRequireDefault(require("./model/ResCredentialCard"));
var _ResMember = _interopRequireDefault(require("./model/ResMember"));
var _ResMemberBase = _interopRequireDefault(require("./model/ResMemberBase"));
var _ResMemberBaseNationality = _interopRequireDefault(require("./model/ResMemberBaseNationality"));
var _ResMemberDoc = _interopRequireDefault(require("./model/ResMemberDoc"));
var _ResMemberFeesDonations = _interopRequireDefault(require("./model/ResMemberFeesDonations"));
var _ResMemberProfile = _interopRequireDefault(require("./model/ResMemberProfile"));
var _ResMemberProfileDocs = _interopRequireDefault(require("./model/ResMemberProfileDocs"));
var _ResMembershipDocs = _interopRequireDefault(require("./model/ResMembershipDocs"));
var _ResPublicCredentialCard = _interopRequireDefault(require("./model/ResPublicCredentialCard"));
var _ResShopItem = _interopRequireDefault(require("./model/ResShopItem"));
var _ResShopOrder = _interopRequireDefault(require("./model/ResShopOrder"));
var _ResShopOrderItem = _interopRequireDefault(require("./model/ResShopOrderItem"));
var _ResShopOrderPayment = _interopRequireDefault(require("./model/ResShopOrderPayment"));
var _ResShopOrderTotals = _interopRequireDefault(require("./model/ResShopOrderTotals"));
var _ResShopPurchaseItem = _interopRequireDefault(require("./model/ResShopPurchaseItem"));
var _ShopItemType = _interopRequireDefault(require("./model/ShopItemType"));
var _ShopItemsCreate201Response = _interopRequireDefault(require("./model/ShopItemsCreate201Response"));
var _ShopItemsCreate409Response = _interopRequireDefault(require("./model/ShopItemsCreate409Response"));
var _ShopItemsCreateRequest = _interopRequireDefault(require("./model/ShopItemsCreateRequest"));
var _ShopItemsDeleteOne200Response = _interopRequireDefault(require("./model/ShopItemsDeleteOne200Response"));
var _ShopItemsList200Response = _interopRequireDefault(require("./model/ShopItemsList200Response"));
var _ShopItemsUpdateOneRequest = _interopRequireDefault(require("./model/ShopItemsUpdateOneRequest"));
var _ShopOrderPaymentMethod = _interopRequireDefault(require("./model/ShopOrderPaymentMethod"));
var _ShopOrderPaymentStatus = _interopRequireDefault(require("./model/ShopOrderPaymentStatus"));
var _ShopOrderStatus = _interopRequireDefault(require("./model/ShopOrderStatus"));
var _ShopPurchaseItemFulfillmentStatus = _interopRequireDefault(require("./model/ShopPurchaseItemFulfillmentStatus"));
var _AccountsApi = _interopRequireDefault(require("./api/AccountsApi"));
var _AdminApi = _interopRequireDefault(require("./api/AdminApi"));
var _AuthApi = _interopRequireDefault(require("./api/AuthApi"));
var _CredentialCardsApi = _interopRequireDefault(require("./api/CredentialCardsApi"));
var _DirectoryApi = _interopRequireDefault(require("./api/DirectoryApi"));
var _DocsApi = _interopRequireDefault(require("./api/DocsApi"));
var _MemberProfilesApi = _interopRequireDefault(require("./api/MemberProfilesApi"));
var _MembersApi = _interopRequireDefault(require("./api/MembersApi"));
var _ShopApi = _interopRequireDefault(require("./api/ShopApi"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./ApiClient":16,"./api/AccountsApi":17,"./api/AdminApi":18,"./api/AuthApi":19,"./api/CredentialCardsApi":20,"./api/DirectoryApi":21,"./api/DocsApi":22,"./api/MemberProfilesApi":23,"./api/MembersApi":24,"./api/ShopApi":25,"./model/AccountsDeleteOne200Response":27,"./model/AccountsList200Response":28,"./model/AuthAccountPasswordResetCreate200Response":29,"./model/AuthEmailUpdateRequest200Response":30,"./model/AuthEmailUpdateRequest409Response":31,"./model/AuthEmailUpdateRequestRequest":32,"./model/AuthEmailUpdateVerify200Response":33,"./model/AuthEmailUpdateVerify404Response":34,"./model/AuthLoginCreate200Response":35,"./model/AuthLoginCreate200ResponseAuthTokens":36,"./model/AuthLoginCreate400Response":37,"./model/AuthLoginCreate401Response":38,"./model/AuthLoginCreate403Response":39,"./model/AuthLoginCreate409Response":40,"./model/AuthLoginCreateRequest":41,"./model/AuthPasswordUpdate200Response":42,"./model/AuthPasswordUpdateRequest":43,"./model/AuthRefreshCreate200Response":44,"./model/AuthRefreshCreate200ResponseAuthTokens":45,"./model/AuthRole":46,"./model/AuthToken":47,"./model/CredentialCardsGetOne200Response":48,"./model/DirectoryListing":49,"./model/DirectoryListingsList200Response":50,"./model/MemberCredentialCardsCreate201Response":51,"./model/MemberCredentialCardsCreate409Response":52,"./model/MemberCredentialCardsCreateRequest":53,"./model/MemberCredentialCardsDeleteOne200Response":54,"./model/MemberCredentialCardsList200Response":55,"./model/MemberCredentialCardsUpdateOneExpiryRequest":56,"./model/MemberCredentialCardsUpdateOnePrint409Response":57,"./model/MemberCredentialCardsUpdateOneVerify409Response":58,"./model/MemberDocsDeleteOne200Response":59,"./model/MemberDocsGet200Response":60,"./model/MemberDocsUpdateOne200Response":61,"./model/MemberGender":62,"./model/MemberInterestsCommittee":63,"./model/MemberInterestsIndividual":64,"./model/MemberNationalityStatus":65,"./model/MemberOrderDeleteOne200Response":66,"./model/MemberOrderItemsUpdateOneRequest":67,"./model/MemberOrderPaymentList200Response":68,"./model/MemberOrderPaymentsCreate409Response":69,"./model/MemberOrderPaymentsCreateRequest":70,"./model/MemberOrderPaymentsDeleteOne200Response":71,"./model/MemberOrderPaymentsUpdateOneCancel409Response":72,"./model/MemberOrdersCreate201Response":73,"./model/MemberOrdersCreate409Response":74,"./model/MemberOrdersList200Response":75,"./model/MemberOrdersUpdateOne409Response":76,"./model/MemberOrdersUpdateOneRequest":77,"./model/MemberProfileCounty":78,"./model/MemberProfileDocsDeleteOne200Response":79,"./model/MemberProfileDocsUpdateOne409Response":80,"./model/MemberProfileGet200Response":81,"./model/MemberProfileUpdateRequest":82,"./model/MemberPurchaseItemsFulfillmentStatusUpdateOneRequest":83,"./model/MemberPurchaseItemsList200Response":84,"./model/MemberPurchaseItemsUpdateOne200Response":85,"./model/MemberPurchaseItemsUpdateOne409Response":86,"./model/MemberPurchaseItemsUpdateOneRequest":87,"./model/MemberRole":88,"./model/MemberStatus":89,"./model/MemberUpdateRequest":90,"./model/MembersCreateRequest":91,"./model/MembersDeleteOne200Response":92,"./model/MembersList200Response":93,"./model/MembershipDocKey":94,"./model/MembershipSignup201Response":95,"./model/MembershipSignup409Response":96,"./model/MembershipSignupRequest":97,"./model/ResAccount":98,"./model/ResCredentialCard":99,"./model/ResMember":100,"./model/ResMemberBase":101,"./model/ResMemberBaseNationality":102,"./model/ResMemberDoc":103,"./model/ResMemberFeesDonations":104,"./model/ResMemberProfile":105,"./model/ResMemberProfileDocs":106,"./model/ResMembershipDocs":107,"./model/ResPublicCredentialCard":108,"./model/ResShopItem":109,"./model/ResShopOrder":110,"./model/ResShopOrderItem":111,"./model/ResShopOrderPayment":112,"./model/ResShopOrderTotals":113,"./model/ResShopPurchaseItem":114,"./model/ShopItemType":115,"./model/ShopItemsCreate201Response":116,"./model/ShopItemsCreate409Response":117,"./model/ShopItemsCreateRequest":118,"./model/ShopItemsDeleteOne200Response":119,"./model/ShopItemsList200Response":120,"./model/ShopItemsUpdateOneRequest":121,"./model/ShopOrderPaymentMethod":122,"./model/ShopOrderPaymentStatus":123,"./model/ShopOrderStatus":124,"./model/ShopPurchaseItemFulfillmentStatus":125}],27:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The AccountsDeleteOne200Response model module.
 * @module model/AccountsDeleteOne200Response
 * @version 0.1.0
 */
class AccountsDeleteOne200Response {
  /**
   * Constructs a new <code>AccountsDeleteOne200Response</code>.
   * @alias module:model/AccountsDeleteOne200Response
   */
  constructor() {
    AccountsDeleteOne200Response.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>AccountsDeleteOne200Response</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/AccountsDeleteOne200Response} obj Optional instance to populate.
   * @return {module:model/AccountsDeleteOne200Response} The populated <code>AccountsDeleteOne200Response</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new AccountsDeleteOne200Response();
      if (data.hasOwnProperty('msg')) {
        obj['msg'] = _ApiClient.default.convertToType(data['msg'], Object);
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>AccountsDeleteOne200Response</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>AccountsDeleteOne200Response</code>.
   */
  static validateJSON(data) {
    return true;
  }
}

/**
 * @member {Object} msg
 */
AccountsDeleteOne200Response.prototype['msg'] = undefined;
var _default = AccountsDeleteOne200Response;
exports.default = _default;

},{"../ApiClient":16}],28:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _ResAccount = _interopRequireDefault(require("./ResAccount"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The AccountsList200Response model module.
 * @module model/AccountsList200Response
 * @version 0.1.0
 */
class AccountsList200Response {
  /**
   * Constructs a new <code>AccountsList200Response</code>.
   * @alias module:model/AccountsList200Response
   */
  constructor() {
    AccountsList200Response.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>AccountsList200Response</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/AccountsList200Response} obj Optional instance to populate.
   * @return {module:model/AccountsList200Response} The populated <code>AccountsList200Response</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new AccountsList200Response();
      if (data.hasOwnProperty('members')) {
        obj['members'] = _ApiClient.default.convertToType(data['members'], [_ResAccount.default]);
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>AccountsList200Response</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>AccountsList200Response</code>.
   */
  static validateJSON(data) {
    if (data['members']) {
      // data not null
      // ensure the json data is an array
      if (!Array.isArray(data['members'])) {
        throw new Error("Expected the field `members` to be an array in the JSON data but got " + data['members']);
      }
      // validate the optional field `members` (array)
      for (const item of data['members']) {
        _ResAccount.default.validateJSON(item);
      }
      ;
    }
    return true;
  }
}

/**
 * @member {Array.<module:model/ResAccount>} members
 */
AccountsList200Response.prototype['members'] = undefined;
var _default = AccountsList200Response;
exports.default = _default;

},{"../ApiClient":16,"./ResAccount":98}],29:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The AuthAccountPasswordResetCreate200Response model module.
 * @module model/AuthAccountPasswordResetCreate200Response
 * @version 0.1.0
 */
class AuthAccountPasswordResetCreate200Response {
  /**
   * Constructs a new <code>AuthAccountPasswordResetCreate200Response</code>.
   * @alias module:model/AuthAccountPasswordResetCreate200Response
   */
  constructor() {
    AuthAccountPasswordResetCreate200Response.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>AuthAccountPasswordResetCreate200Response</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/AuthAccountPasswordResetCreate200Response} obj Optional instance to populate.
   * @return {module:model/AuthAccountPasswordResetCreate200Response} The populated <code>AuthAccountPasswordResetCreate200Response</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new AuthAccountPasswordResetCreate200Response();
      if (data.hasOwnProperty('msg')) {
        obj['msg'] = _ApiClient.default.convertToType(data['msg'], 'String');
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>AuthAccountPasswordResetCreate200Response</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>AuthAccountPasswordResetCreate200Response</code>.
   */
  static validateJSON(data) {
    // ensure the json data is a string
    if (data['msg'] && !(typeof data['msg'] === 'string' || data['msg'] instanceof String)) {
      throw new Error("Expected the field `msg` to be a primitive type in the JSON string but got " + data['msg']);
    }
    return true;
  }
}

/**
 * @member {String} msg
 */
AuthAccountPasswordResetCreate200Response.prototype['msg'] = undefined;
var _default = AuthAccountPasswordResetCreate200Response;
exports.default = _default;

},{"../ApiClient":16}],30:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The AuthEmailUpdateRequest200Response model module.
 * @module model/AuthEmailUpdateRequest200Response
 * @version 0.1.0
 */
class AuthEmailUpdateRequest200Response {
  /**
   * Constructs a new <code>AuthEmailUpdateRequest200Response</code>.
   * @alias module:model/AuthEmailUpdateRequest200Response
   */
  constructor() {
    AuthEmailUpdateRequest200Response.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>AuthEmailUpdateRequest200Response</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/AuthEmailUpdateRequest200Response} obj Optional instance to populate.
   * @return {module:model/AuthEmailUpdateRequest200Response} The populated <code>AuthEmailUpdateRequest200Response</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new AuthEmailUpdateRequest200Response();
      if (data.hasOwnProperty('msg')) {
        obj['msg'] = _ApiClient.default.convertToType(data['msg'], 'String');
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>AuthEmailUpdateRequest200Response</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>AuthEmailUpdateRequest200Response</code>.
   */
  static validateJSON(data) {
    // ensure the json data is a string
    if (data['msg'] && !(typeof data['msg'] === 'string' || data['msg'] instanceof String)) {
      throw new Error("Expected the field `msg` to be a primitive type in the JSON string but got " + data['msg']);
    }
    return true;
  }
}

/**
 * @member {String} msg
 */
AuthEmailUpdateRequest200Response.prototype['msg'] = undefined;
var _default = AuthEmailUpdateRequest200Response;
exports.default = _default;

},{"../ApiClient":16}],31:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The AuthEmailUpdateRequest409Response model module.
 * @module model/AuthEmailUpdateRequest409Response
 * @version 0.1.0
 */
class AuthEmailUpdateRequest409Response {
  /**
   * Constructs a new <code>AuthEmailUpdateRequest409Response</code>.
   * @alias module:model/AuthEmailUpdateRequest409Response
   */
  constructor() {
    AuthEmailUpdateRequest409Response.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>AuthEmailUpdateRequest409Response</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/AuthEmailUpdateRequest409Response} obj Optional instance to populate.
   * @return {module:model/AuthEmailUpdateRequest409Response} The populated <code>AuthEmailUpdateRequest409Response</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new AuthEmailUpdateRequest409Response();
      if (data.hasOwnProperty('err')) {
        obj['err'] = _ApiClient.default.convertToType(data['err'], 'String');
      }
      if (data.hasOwnProperty('errCode')) {
        obj['errCode'] = _ApiClient.default.convertToType(data['errCode'], 'Number');
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>AuthEmailUpdateRequest409Response</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>AuthEmailUpdateRequest409Response</code>.
   */
  static validateJSON(data) {
    // ensure the json data is a string
    if (data['err'] && !(typeof data['err'] === 'string' || data['err'] instanceof String)) {
      throw new Error("Expected the field `err` to be a primitive type in the JSON string but got " + data['err']);
    }
    return true;
  }
}

/**
 * @member {String} err
 */
AuthEmailUpdateRequest409Response.prototype['err'] = undefined;

/**
 * @member {Number} errCode
 */
AuthEmailUpdateRequest409Response.prototype['errCode'] = undefined;
var _default = AuthEmailUpdateRequest409Response;
exports.default = _default;

},{"../ApiClient":16}],32:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The AuthEmailUpdateRequestRequest model module.
 * @module model/AuthEmailUpdateRequestRequest
 * @version 0.1.0
 */
class AuthEmailUpdateRequestRequest {
  /**
   * Constructs a new <code>AuthEmailUpdateRequestRequest</code>.
   * @alias module:model/AuthEmailUpdateRequestRequest
   * @param email {Object} 
   * @param emailConf {Object} 
   */
  constructor(email, emailConf) {
    AuthEmailUpdateRequestRequest.initialize(this, email, emailConf);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj, email, emailConf) {
    obj['email'] = email;
    obj['emailConf'] = emailConf;
  }

  /**
   * Constructs a <code>AuthEmailUpdateRequestRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/AuthEmailUpdateRequestRequest} obj Optional instance to populate.
   * @return {module:model/AuthEmailUpdateRequestRequest} The populated <code>AuthEmailUpdateRequestRequest</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new AuthEmailUpdateRequestRequest();
      if (data.hasOwnProperty('email')) {
        obj['email'] = _ApiClient.default.convertToType(data['email'], Object);
      }
      if (data.hasOwnProperty('emailConf')) {
        obj['emailConf'] = _ApiClient.default.convertToType(data['emailConf'], Object);
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>AuthEmailUpdateRequestRequest</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>AuthEmailUpdateRequestRequest</code>.
   */
  static validateJSON(data) {
    // check to make sure all required properties are present in the JSON string
    for (const property of AuthEmailUpdateRequestRequest.RequiredProperties) {
      if (!data[property]) {
        throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
      }
    }
    return true;
  }
}
AuthEmailUpdateRequestRequest.RequiredProperties = ["email", "emailConf"];

/**
 * @member {Object} email
 */
AuthEmailUpdateRequestRequest.prototype['email'] = undefined;

/**
 * @member {Object} emailConf
 */
AuthEmailUpdateRequestRequest.prototype['emailConf'] = undefined;
var _default = AuthEmailUpdateRequestRequest;
exports.default = _default;

},{"../ApiClient":16}],33:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The AuthEmailUpdateVerify200Response model module.
 * @module model/AuthEmailUpdateVerify200Response
 * @version 0.1.0
 */
class AuthEmailUpdateVerify200Response {
  /**
   * Constructs a new <code>AuthEmailUpdateVerify200Response</code>.
   * @alias module:model/AuthEmailUpdateVerify200Response
   */
  constructor() {
    AuthEmailUpdateVerify200Response.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>AuthEmailUpdateVerify200Response</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/AuthEmailUpdateVerify200Response} obj Optional instance to populate.
   * @return {module:model/AuthEmailUpdateVerify200Response} The populated <code>AuthEmailUpdateVerify200Response</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new AuthEmailUpdateVerify200Response();
      if (data.hasOwnProperty('msg')) {
        obj['msg'] = _ApiClient.default.convertToType(data['msg'], 'String');
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>AuthEmailUpdateVerify200Response</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>AuthEmailUpdateVerify200Response</code>.
   */
  static validateJSON(data) {
    // ensure the json data is a string
    if (data['msg'] && !(typeof data['msg'] === 'string' || data['msg'] instanceof String)) {
      throw new Error("Expected the field `msg` to be a primitive type in the JSON string but got " + data['msg']);
    }
    return true;
  }
}

/**
 * @member {String} msg
 */
AuthEmailUpdateVerify200Response.prototype['msg'] = undefined;
var _default = AuthEmailUpdateVerify200Response;
exports.default = _default;

},{"../ApiClient":16}],34:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The AuthEmailUpdateVerify404Response model module.
 * @module model/AuthEmailUpdateVerify404Response
 * @version 0.1.0
 */
class AuthEmailUpdateVerify404Response {
  /**
   * Constructs a new <code>AuthEmailUpdateVerify404Response</code>.
   * @alias module:model/AuthEmailUpdateVerify404Response
   */
  constructor() {
    AuthEmailUpdateVerify404Response.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>AuthEmailUpdateVerify404Response</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/AuthEmailUpdateVerify404Response} obj Optional instance to populate.
   * @return {module:model/AuthEmailUpdateVerify404Response} The populated <code>AuthEmailUpdateVerify404Response</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new AuthEmailUpdateVerify404Response();
      if (data.hasOwnProperty('err')) {
        obj['err'] = _ApiClient.default.convertToType(data['err'], 'String');
      }
      if (data.hasOwnProperty('errCode')) {
        obj['errCode'] = _ApiClient.default.convertToType(data['errCode'], 'Number');
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>AuthEmailUpdateVerify404Response</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>AuthEmailUpdateVerify404Response</code>.
   */
  static validateJSON(data) {
    // ensure the json data is a string
    if (data['err'] && !(typeof data['err'] === 'string' || data['err'] instanceof String)) {
      throw new Error("Expected the field `err` to be a primitive type in the JSON string but got " + data['err']);
    }
    return true;
  }
}

/**
 * @member {String} err
 */
AuthEmailUpdateVerify404Response.prototype['err'] = undefined;

/**
 * @member {Number} errCode
 */
AuthEmailUpdateVerify404Response.prototype['errCode'] = undefined;
var _default = AuthEmailUpdateVerify404Response;
exports.default = _default;

},{"../ApiClient":16}],35:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _AuthLoginCreate200ResponseAuthTokens = _interopRequireDefault(require("./AuthLoginCreate200ResponseAuthTokens"));
var _MemberRole = _interopRequireDefault(require("./MemberRole"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The AuthLoginCreate200Response model module.
 * @module model/AuthLoginCreate200Response
 * @version 0.1.0
 */
class AuthLoginCreate200Response {
  /**
   * Constructs a new <code>AuthLoginCreate200Response</code>.
   * @alias module:model/AuthLoginCreate200Response
   */
  constructor() {
    AuthLoginCreate200Response.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>AuthLoginCreate200Response</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/AuthLoginCreate200Response} obj Optional instance to populate.
   * @return {module:model/AuthLoginCreate200Response} The populated <code>AuthLoginCreate200Response</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new AuthLoginCreate200Response();
      if (data.hasOwnProperty('id')) {
        obj['id'] = _ApiClient.default.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('email')) {
        obj['email'] = _ApiClient.default.convertToType(data['email'], 'String');
      }
      if (data.hasOwnProperty('role')) {
        obj['role'] = _MemberRole.default.constructFromObject(data['role']);
      }
      if (data.hasOwnProperty('authTokens')) {
        obj['authTokens'] = _AuthLoginCreate200ResponseAuthTokens.default.constructFromObject(data['authTokens']);
      }
      if (data.hasOwnProperty('sessionExpiresAt')) {
        obj['sessionExpiresAt'] = _ApiClient.default.convertToType(data['sessionExpiresAt'], 'Date');
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>AuthLoginCreate200Response</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>AuthLoginCreate200Response</code>.
   */
  static validateJSON(data) {
    // ensure the json data is a string
    if (data['id'] && !(typeof data['id'] === 'string' || data['id'] instanceof String)) {
      throw new Error("Expected the field `id` to be a primitive type in the JSON string but got " + data['id']);
    }
    // ensure the json data is a string
    if (data['email'] && !(typeof data['email'] === 'string' || data['email'] instanceof String)) {
      throw new Error("Expected the field `email` to be a primitive type in the JSON string but got " + data['email']);
    }
    // validate the optional field `authTokens`
    if (data['authTokens']) {
      // data not null
      _AuthLoginCreate200ResponseAuthTokens.default.validateJSON(data['authTokens']);
    }
    return true;
  }
}

/**
 * @member {String} id
 */
AuthLoginCreate200Response.prototype['id'] = undefined;

/**
 * @member {String} email
 */
AuthLoginCreate200Response.prototype['email'] = undefined;

/**
 * @member {module:model/MemberRole} role
 */
AuthLoginCreate200Response.prototype['role'] = undefined;

/**
 * @member {module:model/AuthLoginCreate200ResponseAuthTokens} authTokens
 */
AuthLoginCreate200Response.prototype['authTokens'] = undefined;

/**
 * @member {Date} sessionExpiresAt
 */
AuthLoginCreate200Response.prototype['sessionExpiresAt'] = undefined;
var _default = AuthLoginCreate200Response;
exports.default = _default;

},{"../ApiClient":16,"./AuthLoginCreate200ResponseAuthTokens":36,"./MemberRole":88}],36:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _AuthToken = _interopRequireDefault(require("./AuthToken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The AuthLoginCreate200ResponseAuthTokens model module.
 * @module model/AuthLoginCreate200ResponseAuthTokens
 * @version 0.1.0
 */
class AuthLoginCreate200ResponseAuthTokens {
  /**
   * Constructs a new <code>AuthLoginCreate200ResponseAuthTokens</code>.
   * @alias module:model/AuthLoginCreate200ResponseAuthTokens
   */
  constructor() {
    AuthLoginCreate200ResponseAuthTokens.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>AuthLoginCreate200ResponseAuthTokens</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/AuthLoginCreate200ResponseAuthTokens} obj Optional instance to populate.
   * @return {module:model/AuthLoginCreate200ResponseAuthTokens} The populated <code>AuthLoginCreate200ResponseAuthTokens</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new AuthLoginCreate200ResponseAuthTokens();
      if (data.hasOwnProperty('refresh')) {
        obj['refresh'] = _AuthToken.default.constructFromObject(data['refresh']);
      }
      if (data.hasOwnProperty('auth')) {
        obj['auth'] = _AuthToken.default.constructFromObject(data['auth']);
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>AuthLoginCreate200ResponseAuthTokens</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>AuthLoginCreate200ResponseAuthTokens</code>.
   */
  static validateJSON(data) {
    // validate the optional field `refresh`
    if (data['refresh']) {
      // data not null
      _AuthToken.default.validateJSON(data['refresh']);
    }
    // validate the optional field `auth`
    if (data['auth']) {
      // data not null
      _AuthToken.default.validateJSON(data['auth']);
    }
    return true;
  }
}

/**
 * @member {module:model/AuthToken} refresh
 */
AuthLoginCreate200ResponseAuthTokens.prototype['refresh'] = undefined;

/**
 * @member {module:model/AuthToken} auth
 */
AuthLoginCreate200ResponseAuthTokens.prototype['auth'] = undefined;
var _default = AuthLoginCreate200ResponseAuthTokens;
exports.default = _default;

},{"../ApiClient":16,"./AuthToken":47}],37:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The AuthLoginCreate400Response model module.
 * @module model/AuthLoginCreate400Response
 * @version 0.1.0
 */
class AuthLoginCreate400Response {
  /**
   * Constructs a new <code>AuthLoginCreate400Response</code>.
   * @alias module:model/AuthLoginCreate400Response
   */
  constructor() {
    AuthLoginCreate400Response.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>AuthLoginCreate400Response</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/AuthLoginCreate400Response} obj Optional instance to populate.
   * @return {module:model/AuthLoginCreate400Response} The populated <code>AuthLoginCreate400Response</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new AuthLoginCreate400Response();
      if (data.hasOwnProperty('err')) {
        obj['err'] = _ApiClient.default.convertToType(data['err'], 'String');
      }
      if (data.hasOwnProperty('code')) {
        obj['code'] = _ApiClient.default.convertToType(data['code'], 'Number');
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>AuthLoginCreate400Response</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>AuthLoginCreate400Response</code>.
   */
  static validateJSON(data) {
    // ensure the json data is a string
    if (data['err'] && !(typeof data['err'] === 'string' || data['err'] instanceof String)) {
      throw new Error("Expected the field `err` to be a primitive type in the JSON string but got " + data['err']);
    }
    return true;
  }
}

/**
 * @member {String} err
 */
AuthLoginCreate400Response.prototype['err'] = undefined;

/**
 * @member {Number} code
 */
AuthLoginCreate400Response.prototype['code'] = undefined;
var _default = AuthLoginCreate400Response;
exports.default = _default;

},{"../ApiClient":16}],38:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The AuthLoginCreate401Response model module.
 * @module model/AuthLoginCreate401Response
 * @version 0.1.0
 */
class AuthLoginCreate401Response {
  /**
   * Constructs a new <code>AuthLoginCreate401Response</code>.
   * @alias module:model/AuthLoginCreate401Response
   */
  constructor() {
    AuthLoginCreate401Response.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>AuthLoginCreate401Response</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/AuthLoginCreate401Response} obj Optional instance to populate.
   * @return {module:model/AuthLoginCreate401Response} The populated <code>AuthLoginCreate401Response</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new AuthLoginCreate401Response();
      if (data.hasOwnProperty('err')) {
        obj['err'] = _ApiClient.default.convertToType(data['err'], 'String');
      }
      if (data.hasOwnProperty('errCode')) {
        obj['errCode'] = _ApiClient.default.convertToType(data['errCode'], 'Number');
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>AuthLoginCreate401Response</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>AuthLoginCreate401Response</code>.
   */
  static validateJSON(data) {
    // ensure the json data is a string
    if (data['err'] && !(typeof data['err'] === 'string' || data['err'] instanceof String)) {
      throw new Error("Expected the field `err` to be a primitive type in the JSON string but got " + data['err']);
    }
    return true;
  }
}

/**
 * @member {String} err
 */
AuthLoginCreate401Response.prototype['err'] = undefined;

/**
 * @member {Number} errCode
 */
AuthLoginCreate401Response.prototype['errCode'] = undefined;
var _default = AuthLoginCreate401Response;
exports.default = _default;

},{"../ApiClient":16}],39:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The AuthLoginCreate403Response model module.
 * @module model/AuthLoginCreate403Response
 * @version 0.1.0
 */
class AuthLoginCreate403Response {
  /**
   * Constructs a new <code>AuthLoginCreate403Response</code>.
   * @alias module:model/AuthLoginCreate403Response
   */
  constructor() {
    AuthLoginCreate403Response.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>AuthLoginCreate403Response</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/AuthLoginCreate403Response} obj Optional instance to populate.
   * @return {module:model/AuthLoginCreate403Response} The populated <code>AuthLoginCreate403Response</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new AuthLoginCreate403Response();
      if (data.hasOwnProperty('err')) {
        obj['err'] = _ApiClient.default.convertToType(data['err'], 'String');
      }
      if (data.hasOwnProperty('errCode')) {
        obj['errCode'] = _ApiClient.default.convertToType(data['errCode'], 'Number');
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>AuthLoginCreate403Response</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>AuthLoginCreate403Response</code>.
   */
  static validateJSON(data) {
    // ensure the json data is a string
    if (data['err'] && !(typeof data['err'] === 'string' || data['err'] instanceof String)) {
      throw new Error("Expected the field `err` to be a primitive type in the JSON string but got " + data['err']);
    }
    return true;
  }
}

/**
 * @member {String} err
 */
AuthLoginCreate403Response.prototype['err'] = undefined;

/**
 * @member {Number} errCode
 */
AuthLoginCreate403Response.prototype['errCode'] = undefined;
var _default = AuthLoginCreate403Response;
exports.default = _default;

},{"../ApiClient":16}],40:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The AuthLoginCreate409Response model module.
 * @module model/AuthLoginCreate409Response
 * @version 0.1.0
 */
class AuthLoginCreate409Response {
  /**
   * Constructs a new <code>AuthLoginCreate409Response</code>.
   * @alias module:model/AuthLoginCreate409Response
   */
  constructor() {
    AuthLoginCreate409Response.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>AuthLoginCreate409Response</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/AuthLoginCreate409Response} obj Optional instance to populate.
   * @return {module:model/AuthLoginCreate409Response} The populated <code>AuthLoginCreate409Response</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new AuthLoginCreate409Response();
      if (data.hasOwnProperty('err')) {
        obj['err'] = _ApiClient.default.convertToType(data['err'], 'String');
      }
      if (data.hasOwnProperty('errCode')) {
        obj['errCode'] = _ApiClient.default.convertToType(data['errCode'], 'Number');
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>AuthLoginCreate409Response</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>AuthLoginCreate409Response</code>.
   */
  static validateJSON(data) {
    // ensure the json data is a string
    if (data['err'] && !(typeof data['err'] === 'string' || data['err'] instanceof String)) {
      throw new Error("Expected the field `err` to be a primitive type in the JSON string but got " + data['err']);
    }
    return true;
  }
}

/**
 * @member {String} err
 */
AuthLoginCreate409Response.prototype['err'] = undefined;

/**
 * @member {Number} errCode
 */
AuthLoginCreate409Response.prototype['errCode'] = undefined;
var _default = AuthLoginCreate409Response;
exports.default = _default;

},{"../ApiClient":16}],41:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The AuthLoginCreateRequest model module.
 * @module model/AuthLoginCreateRequest
 * @version 0.1.0
 */
class AuthLoginCreateRequest {
  /**
   * Constructs a new <code>AuthLoginCreateRequest</code>.
   * @alias module:model/AuthLoginCreateRequest
   * @param captchaResToken {String} 
   */
  constructor(captchaResToken) {
    AuthLoginCreateRequest.initialize(this, captchaResToken);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj, captchaResToken) {
    obj['captchaResToken'] = captchaResToken;
  }

  /**
   * Constructs a <code>AuthLoginCreateRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/AuthLoginCreateRequest} obj Optional instance to populate.
   * @return {module:model/AuthLoginCreateRequest} The populated <code>AuthLoginCreateRequest</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new AuthLoginCreateRequest();
      if (data.hasOwnProperty('captchaResToken')) {
        obj['captchaResToken'] = _ApiClient.default.convertToType(data['captchaResToken'], 'String');
      }
      if (data.hasOwnProperty('elevatedPass')) {
        obj['elevatedPass'] = _ApiClient.default.convertToType(data['elevatedPass'], 'String');
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>AuthLoginCreateRequest</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>AuthLoginCreateRequest</code>.
   */
  static validateJSON(data) {
    // check to make sure all required properties are present in the JSON string
    for (const property of AuthLoginCreateRequest.RequiredProperties) {
      if (!data[property]) {
        throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
      }
    }
    // ensure the json data is a string
    if (data['captchaResToken'] && !(typeof data['captchaResToken'] === 'string' || data['captchaResToken'] instanceof String)) {
      throw new Error("Expected the field `captchaResToken` to be a primitive type in the JSON string but got " + data['captchaResToken']);
    }
    // ensure the json data is a string
    if (data['elevatedPass'] && !(typeof data['elevatedPass'] === 'string' || data['elevatedPass'] instanceof String)) {
      throw new Error("Expected the field `elevatedPass` to be a primitive type in the JSON string but got " + data['elevatedPass']);
    }
    return true;
  }
}
AuthLoginCreateRequest.RequiredProperties = ["captchaResToken"];

/**
 * @member {String} captchaResToken
 */
AuthLoginCreateRequest.prototype['captchaResToken'] = undefined;

/**
 * @member {String} elevatedPass
 */
AuthLoginCreateRequest.prototype['elevatedPass'] = undefined;
var _default = AuthLoginCreateRequest;
exports.default = _default;

},{"../ApiClient":16}],42:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The AuthPasswordUpdate200Response model module.
 * @module model/AuthPasswordUpdate200Response
 * @version 0.1.0
 */
class AuthPasswordUpdate200Response {
  /**
   * Constructs a new <code>AuthPasswordUpdate200Response</code>.
   * @alias module:model/AuthPasswordUpdate200Response
   */
  constructor() {
    AuthPasswordUpdate200Response.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>AuthPasswordUpdate200Response</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/AuthPasswordUpdate200Response} obj Optional instance to populate.
   * @return {module:model/AuthPasswordUpdate200Response} The populated <code>AuthPasswordUpdate200Response</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new AuthPasswordUpdate200Response();
      if (data.hasOwnProperty('msg')) {
        obj['msg'] = _ApiClient.default.convertToType(data['msg'], 'String');
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>AuthPasswordUpdate200Response</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>AuthPasswordUpdate200Response</code>.
   */
  static validateJSON(data) {
    // ensure the json data is a string
    if (data['msg'] && !(typeof data['msg'] === 'string' || data['msg'] instanceof String)) {
      throw new Error("Expected the field `msg` to be a primitive type in the JSON string but got " + data['msg']);
    }
    return true;
  }
}

/**
 * @member {String} msg
 */
AuthPasswordUpdate200Response.prototype['msg'] = undefined;
var _default = AuthPasswordUpdate200Response;
exports.default = _default;

},{"../ApiClient":16}],43:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The AuthPasswordUpdateRequest model module.
 * @module model/AuthPasswordUpdateRequest
 * @version 0.1.0
 */
class AuthPasswordUpdateRequest {
  /**
   * Constructs a new <code>AuthPasswordUpdateRequest</code>.
   * @alias module:model/AuthPasswordUpdateRequest
   */
  constructor() {
    AuthPasswordUpdateRequest.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>AuthPasswordUpdateRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/AuthPasswordUpdateRequest} obj Optional instance to populate.
   * @return {module:model/AuthPasswordUpdateRequest} The populated <code>AuthPasswordUpdateRequest</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new AuthPasswordUpdateRequest();
      if (data.hasOwnProperty('pass')) {
        obj['pass'] = _ApiClient.default.convertToType(data['pass'], 'String');
      }
      if (data.hasOwnProperty('passConf')) {
        obj['passConf'] = _ApiClient.default.convertToType(data['passConf'], 'String');
      }
      if (data.hasOwnProperty('elevatedPass')) {
        obj['elevatedPass'] = _ApiClient.default.convertToType(data['elevatedPass'], 'String');
      }
      if (data.hasOwnProperty('elevatedPassConf')) {
        obj['elevatedPassConf'] = _ApiClient.default.convertToType(data['elevatedPassConf'], 'String');
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>AuthPasswordUpdateRequest</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>AuthPasswordUpdateRequest</code>.
   */
  static validateJSON(data) {
    // ensure the json data is a string
    if (data['pass'] && !(typeof data['pass'] === 'string' || data['pass'] instanceof String)) {
      throw new Error("Expected the field `pass` to be a primitive type in the JSON string but got " + data['pass']);
    }
    // ensure the json data is a string
    if (data['passConf'] && !(typeof data['passConf'] === 'string' || data['passConf'] instanceof String)) {
      throw new Error("Expected the field `passConf` to be a primitive type in the JSON string but got " + data['passConf']);
    }
    // ensure the json data is a string
    if (data['elevatedPass'] && !(typeof data['elevatedPass'] === 'string' || data['elevatedPass'] instanceof String)) {
      throw new Error("Expected the field `elevatedPass` to be a primitive type in the JSON string but got " + data['elevatedPass']);
    }
    // ensure the json data is a string
    if (data['elevatedPassConf'] && !(typeof data['elevatedPassConf'] === 'string' || data['elevatedPassConf'] instanceof String)) {
      throw new Error("Expected the field `elevatedPassConf` to be a primitive type in the JSON string but got " + data['elevatedPassConf']);
    }
    return true;
  }
}

/**
 * @member {String} pass
 */
AuthPasswordUpdateRequest.prototype['pass'] = undefined;

/**
 * @member {String} passConf
 */
AuthPasswordUpdateRequest.prototype['passConf'] = undefined;

/**
 * @member {String} elevatedPass
 */
AuthPasswordUpdateRequest.prototype['elevatedPass'] = undefined;

/**
 * @member {String} elevatedPassConf
 */
AuthPasswordUpdateRequest.prototype['elevatedPassConf'] = undefined;
var _default = AuthPasswordUpdateRequest;
exports.default = _default;

},{"../ApiClient":16}],44:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _AuthRefreshCreate200ResponseAuthTokens = _interopRequireDefault(require("./AuthRefreshCreate200ResponseAuthTokens"));
var _MemberRole = _interopRequireDefault(require("./MemberRole"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The AuthRefreshCreate200Response model module.
 * @module model/AuthRefreshCreate200Response
 * @version 0.1.0
 */
class AuthRefreshCreate200Response {
  /**
   * Constructs a new <code>AuthRefreshCreate200Response</code>.
   * @alias module:model/AuthRefreshCreate200Response
   */
  constructor() {
    AuthRefreshCreate200Response.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>AuthRefreshCreate200Response</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/AuthRefreshCreate200Response} obj Optional instance to populate.
   * @return {module:model/AuthRefreshCreate200Response} The populated <code>AuthRefreshCreate200Response</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new AuthRefreshCreate200Response();
      if (data.hasOwnProperty('id')) {
        obj['id'] = _ApiClient.default.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('email')) {
        obj['email'] = _ApiClient.default.convertToType(data['email'], 'String');
      }
      if (data.hasOwnProperty('role')) {
        obj['role'] = _MemberRole.default.constructFromObject(data['role']);
      }
      if (data.hasOwnProperty('authTokens')) {
        obj['authTokens'] = _AuthRefreshCreate200ResponseAuthTokens.default.constructFromObject(data['authTokens']);
      }
      if (data.hasOwnProperty('sessionExpiresAt')) {
        obj['sessionExpiresAt'] = _ApiClient.default.convertToType(data['sessionExpiresAt'], 'Date');
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>AuthRefreshCreate200Response</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>AuthRefreshCreate200Response</code>.
   */
  static validateJSON(data) {
    // ensure the json data is a string
    if (data['id'] && !(typeof data['id'] === 'string' || data['id'] instanceof String)) {
      throw new Error("Expected the field `id` to be a primitive type in the JSON string but got " + data['id']);
    }
    // ensure the json data is a string
    if (data['email'] && !(typeof data['email'] === 'string' || data['email'] instanceof String)) {
      throw new Error("Expected the field `email` to be a primitive type in the JSON string but got " + data['email']);
    }
    // validate the optional field `authTokens`
    if (data['authTokens']) {
      // data not null
      _AuthRefreshCreate200ResponseAuthTokens.default.validateJSON(data['authTokens']);
    }
    return true;
  }
}

/**
 * @member {String} id
 */
AuthRefreshCreate200Response.prototype['id'] = undefined;

/**
 * @member {String} email
 */
AuthRefreshCreate200Response.prototype['email'] = undefined;

/**
 * @member {module:model/MemberRole} role
 */
AuthRefreshCreate200Response.prototype['role'] = undefined;

/**
 * @member {module:model/AuthRefreshCreate200ResponseAuthTokens} authTokens
 */
AuthRefreshCreate200Response.prototype['authTokens'] = undefined;

/**
 * @member {Date} sessionExpiresAt
 */
AuthRefreshCreate200Response.prototype['sessionExpiresAt'] = undefined;
var _default = AuthRefreshCreate200Response;
exports.default = _default;

},{"../ApiClient":16,"./AuthRefreshCreate200ResponseAuthTokens":45,"./MemberRole":88}],45:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _AuthToken = _interopRequireDefault(require("./AuthToken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The AuthRefreshCreate200ResponseAuthTokens model module.
 * @module model/AuthRefreshCreate200ResponseAuthTokens
 * @version 0.1.0
 */
class AuthRefreshCreate200ResponseAuthTokens {
  /**
   * Constructs a new <code>AuthRefreshCreate200ResponseAuthTokens</code>.
   * @alias module:model/AuthRefreshCreate200ResponseAuthTokens
   */
  constructor() {
    AuthRefreshCreate200ResponseAuthTokens.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>AuthRefreshCreate200ResponseAuthTokens</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/AuthRefreshCreate200ResponseAuthTokens} obj Optional instance to populate.
   * @return {module:model/AuthRefreshCreate200ResponseAuthTokens} The populated <code>AuthRefreshCreate200ResponseAuthTokens</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new AuthRefreshCreate200ResponseAuthTokens();
      if (data.hasOwnProperty('auth')) {
        obj['auth'] = _AuthToken.default.constructFromObject(data['auth']);
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>AuthRefreshCreate200ResponseAuthTokens</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>AuthRefreshCreate200ResponseAuthTokens</code>.
   */
  static validateJSON(data) {
    // validate the optional field `auth`
    if (data['auth']) {
      // data not null
      _AuthToken.default.validateJSON(data['auth']);
    }
    return true;
  }
}

/**
 * @member {module:model/AuthToken} auth
 */
AuthRefreshCreate200ResponseAuthTokens.prototype['auth'] = undefined;
var _default = AuthRefreshCreate200ResponseAuthTokens;
exports.default = _default;

},{"../ApiClient":16,"./AuthToken":47}],46:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
* Enum class AuthRole.
* @enum {}
* @readonly
*/
class AuthRole {
  /**
   * value: "MEMBER"
   * @const
   */
  "MEMBER" = "MEMBER";

  /**
   * value: "MEMBER_ADMIN"
   * @const
   */
  "MEMBER_ADMIN" = "MEMBER_ADMIN";

  /**
   * value: "ADMIN"
   * @const
   */
  "ADMIN" = "ADMIN";

  /**
  * Returns a <code>AuthRole</code> enum value from a Javascript object name.
  * @param {Object} data The plain JavaScript object containing the name of the enum value.
  * @return {module:model/AuthRole} The enum <code>AuthRole</code> value.
  */
  static constructFromObject(object) {
    return object;
  }
}
exports.default = AuthRole;

},{"../ApiClient":16}],47:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The AuthToken model module.
 * @module model/AuthToken
 * @version 0.1.0
 */
class AuthToken {
  /**
   * Constructs a new <code>AuthToken</code>.
   * @alias module:model/AuthToken
   */
  constructor() {
    AuthToken.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>AuthToken</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/AuthToken} obj Optional instance to populate.
   * @return {module:model/AuthToken} The populated <code>AuthToken</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new AuthToken();
      if (data.hasOwnProperty('token')) {
        obj['token'] = _ApiClient.default.convertToType(data['token'], 'String');
      }
      if (data.hasOwnProperty('expiresAt')) {
        obj['expiresAt'] = _ApiClient.default.convertToType(data['expiresAt'], 'Date');
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>AuthToken</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>AuthToken</code>.
   */
  static validateJSON(data) {
    // ensure the json data is a string
    if (data['token'] && !(typeof data['token'] === 'string' || data['token'] instanceof String)) {
      throw new Error("Expected the field `token` to be a primitive type in the JSON string but got " + data['token']);
    }
    return true;
  }
}

/**
 * @member {String} token
 */
AuthToken.prototype['token'] = undefined;

/**
 * @member {Date} expiresAt
 */
AuthToken.prototype['expiresAt'] = undefined;
var _default = AuthToken;
exports.default = _default;

},{"../ApiClient":16}],48:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _ResPublicCredentialCard = _interopRequireDefault(require("./ResPublicCredentialCard"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The CredentialCardsGetOne200Response model module.
 * @module model/CredentialCardsGetOne200Response
 * @version 0.1.0
 */
class CredentialCardsGetOne200Response {
  /**
   * Constructs a new <code>CredentialCardsGetOne200Response</code>.
   * @alias module:model/CredentialCardsGetOne200Response
   */
  constructor() {
    CredentialCardsGetOne200Response.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>CredentialCardsGetOne200Response</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CredentialCardsGetOne200Response} obj Optional instance to populate.
   * @return {module:model/CredentialCardsGetOne200Response} The populated <code>CredentialCardsGetOne200Response</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new CredentialCardsGetOne200Response();
      if (data.hasOwnProperty('credentialCard')) {
        obj['credentialCard'] = _ResPublicCredentialCard.default.constructFromObject(data['credentialCard']);
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>CredentialCardsGetOne200Response</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>CredentialCardsGetOne200Response</code>.
   */
  static validateJSON(data) {
    // validate the optional field `credentialCard`
    if (data['credentialCard']) {
      // data not null
      _ResPublicCredentialCard.default.validateJSON(data['credentialCard']);
    }
    return true;
  }
}

/**
 * @member {module:model/ResPublicCredentialCard} credentialCard
 */
CredentialCardsGetOne200Response.prototype['credentialCard'] = undefined;
var _default = CredentialCardsGetOne200Response;
exports.default = _default;

},{"../ApiClient":16,"./ResPublicCredentialCard":108}],49:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The DirectoryListing model module.
 * @module model/DirectoryListing
 * @version 0.1.0
 */
class DirectoryListing {
  /**
   * Constructs a new <code>DirectoryListing</code>.
   * @alias module:model/DirectoryListing
   */
  constructor() {
    DirectoryListing.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>DirectoryListing</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/DirectoryListing} obj Optional instance to populate.
   * @return {module:model/DirectoryListing} The populated <code>DirectoryListing</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new DirectoryListing();
      if (data.hasOwnProperty('name')) {
        obj['name'] = _ApiClient.default.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('email')) {
        obj['email'] = _ApiClient.default.convertToType(data['email'], 'String');
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>DirectoryListing</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>DirectoryListing</code>.
   */
  static validateJSON(data) {
    // ensure the json data is a string
    if (data['name'] && !(typeof data['name'] === 'string' || data['name'] instanceof String)) {
      throw new Error("Expected the field `name` to be a primitive type in the JSON string but got " + data['name']);
    }
    // ensure the json data is a string
    if (data['email'] && !(typeof data['email'] === 'string' || data['email'] instanceof String)) {
      throw new Error("Expected the field `email` to be a primitive type in the JSON string but got " + data['email']);
    }
    return true;
  }
}

/**
 * @member {String} name
 */
DirectoryListing.prototype['name'] = undefined;

/**
 * @member {String} email
 */
DirectoryListing.prototype['email'] = undefined;
var _default = DirectoryListing;
exports.default = _default;

},{"../ApiClient":16}],50:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _DirectoryListing = _interopRequireDefault(require("./DirectoryListing"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The DirectoryListingsList200Response model module.
 * @module model/DirectoryListingsList200Response
 * @version 0.1.0
 */
class DirectoryListingsList200Response {
  /**
   * Constructs a new <code>DirectoryListingsList200Response</code>.
   * @alias module:model/DirectoryListingsList200Response
   */
  constructor() {
    DirectoryListingsList200Response.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>DirectoryListingsList200Response</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/DirectoryListingsList200Response} obj Optional instance to populate.
   * @return {module:model/DirectoryListingsList200Response} The populated <code>DirectoryListingsList200Response</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new DirectoryListingsList200Response();
      if (data.hasOwnProperty('listings')) {
        obj['listings'] = _ApiClient.default.convertToType(data['listings'], [_DirectoryListing.default]);
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>DirectoryListingsList200Response</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>DirectoryListingsList200Response</code>.
   */
  static validateJSON(data) {
    if (data['listings']) {
      // data not null
      // ensure the json data is an array
      if (!Array.isArray(data['listings'])) {
        throw new Error("Expected the field `listings` to be an array in the JSON data but got " + data['listings']);
      }
      // validate the optional field `listings` (array)
      for (const item of data['listings']) {
        _DirectoryListing.default.validateJSON(item);
      }
      ;
    }
    return true;
  }
}

/**
 * @member {Array.<module:model/DirectoryListing>} listings
 */
DirectoryListingsList200Response.prototype['listings'] = undefined;
var _default = DirectoryListingsList200Response;
exports.default = _default;

},{"../ApiClient":16,"./DirectoryListing":49}],51:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _ResCredentialCard = _interopRequireDefault(require("./ResCredentialCard"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The MemberCredentialCardsCreate201Response model module.
 * @module model/MemberCredentialCardsCreate201Response
 * @version 0.1.0
 */
class MemberCredentialCardsCreate201Response {
  /**
   * Constructs a new <code>MemberCredentialCardsCreate201Response</code>.
   * @alias module:model/MemberCredentialCardsCreate201Response
   */
  constructor() {
    MemberCredentialCardsCreate201Response.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>MemberCredentialCardsCreate201Response</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MemberCredentialCardsCreate201Response} obj Optional instance to populate.
   * @return {module:model/MemberCredentialCardsCreate201Response} The populated <code>MemberCredentialCardsCreate201Response</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new MemberCredentialCardsCreate201Response();
      if (data.hasOwnProperty('credentialCard')) {
        obj['credentialCard'] = _ResCredentialCard.default.constructFromObject(data['credentialCard']);
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>MemberCredentialCardsCreate201Response</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>MemberCredentialCardsCreate201Response</code>.
   */
  static validateJSON(data) {
    // validate the optional field `credentialCard`
    if (data['credentialCard']) {
      // data not null
      _ResCredentialCard.default.validateJSON(data['credentialCard']);
    }
    return true;
  }
}

/**
 * @member {module:model/ResCredentialCard} credentialCard
 */
MemberCredentialCardsCreate201Response.prototype['credentialCard'] = undefined;
var _default = MemberCredentialCardsCreate201Response;
exports.default = _default;

},{"../ApiClient":16,"./ResCredentialCard":99}],52:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The MemberCredentialCardsCreate409Response model module.
 * @module model/MemberCredentialCardsCreate409Response
 * @version 0.1.0
 */
class MemberCredentialCardsCreate409Response {
  /**
   * Constructs a new <code>MemberCredentialCardsCreate409Response</code>.
   * @alias module:model/MemberCredentialCardsCreate409Response
   */
  constructor() {
    MemberCredentialCardsCreate409Response.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>MemberCredentialCardsCreate409Response</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MemberCredentialCardsCreate409Response} obj Optional instance to populate.
   * @return {module:model/MemberCredentialCardsCreate409Response} The populated <code>MemberCredentialCardsCreate409Response</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new MemberCredentialCardsCreate409Response();
      if (data.hasOwnProperty('err')) {
        obj['err'] = _ApiClient.default.convertToType(data['err'], 'String');
      }
      if (data.hasOwnProperty('errCode')) {
        obj['errCode'] = _ApiClient.default.convertToType(data['errCode'], 'Number');
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>MemberCredentialCardsCreate409Response</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>MemberCredentialCardsCreate409Response</code>.
   */
  static validateJSON(data) {
    // ensure the json data is a string
    if (data['err'] && !(typeof data['err'] === 'string' || data['err'] instanceof String)) {
      throw new Error("Expected the field `err` to be a primitive type in the JSON string but got " + data['err']);
    }
    return true;
  }
}

/**
 * @member {String} err
 */
MemberCredentialCardsCreate409Response.prototype['err'] = undefined;

/**
 * @member {Number} errCode
 */
MemberCredentialCardsCreate409Response.prototype['errCode'] = undefined;
var _default = MemberCredentialCardsCreate409Response;
exports.default = _default;

},{"../ApiClient":16}],53:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The MemberCredentialCardsCreateRequest model module.
 * @module model/MemberCredentialCardsCreateRequest
 * @version 0.1.0
 */
class MemberCredentialCardsCreateRequest {
  /**
   * Constructs a new <code>MemberCredentialCardsCreateRequest</code>.
   * @alias module:model/MemberCredentialCardsCreateRequest
   */
  constructor() {
    MemberCredentialCardsCreateRequest.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>MemberCredentialCardsCreateRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MemberCredentialCardsCreateRequest} obj Optional instance to populate.
   * @return {module:model/MemberCredentialCardsCreateRequest} The populated <code>MemberCredentialCardsCreateRequest</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new MemberCredentialCardsCreateRequest();
      if (data.hasOwnProperty('purchaseItemId')) {
        obj['purchaseItemId'] = _ApiClient.default.convertToType(data['purchaseItemId'], 'String');
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>MemberCredentialCardsCreateRequest</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>MemberCredentialCardsCreateRequest</code>.
   */
  static validateJSON(data) {
    // ensure the json data is a string
    if (data['purchaseItemId'] && !(typeof data['purchaseItemId'] === 'string' || data['purchaseItemId'] instanceof String)) {
      throw new Error("Expected the field `purchaseItemId` to be a primitive type in the JSON string but got " + data['purchaseItemId']);
    }
    return true;
  }
}

/**
 * @member {String} purchaseItemId
 */
MemberCredentialCardsCreateRequest.prototype['purchaseItemId'] = undefined;
var _default = MemberCredentialCardsCreateRequest;
exports.default = _default;

},{"../ApiClient":16}],54:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The MemberCredentialCardsDeleteOne200Response model module.
 * @module model/MemberCredentialCardsDeleteOne200Response
 * @version 0.1.0
 */
class MemberCredentialCardsDeleteOne200Response {
  /**
   * Constructs a new <code>MemberCredentialCardsDeleteOne200Response</code>.
   * @alias module:model/MemberCredentialCardsDeleteOne200Response
   */
  constructor() {
    MemberCredentialCardsDeleteOne200Response.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>MemberCredentialCardsDeleteOne200Response</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MemberCredentialCardsDeleteOne200Response} obj Optional instance to populate.
   * @return {module:model/MemberCredentialCardsDeleteOne200Response} The populated <code>MemberCredentialCardsDeleteOne200Response</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new MemberCredentialCardsDeleteOne200Response();
      if (data.hasOwnProperty('msg')) {
        obj['msg'] = _ApiClient.default.convertToType(data['msg'], 'String');
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>MemberCredentialCardsDeleteOne200Response</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>MemberCredentialCardsDeleteOne200Response</code>.
   */
  static validateJSON(data) {
    // ensure the json data is a string
    if (data['msg'] && !(typeof data['msg'] === 'string' || data['msg'] instanceof String)) {
      throw new Error("Expected the field `msg` to be a primitive type in the JSON string but got " + data['msg']);
    }
    return true;
  }
}

/**
 * @member {String} msg
 */
MemberCredentialCardsDeleteOne200Response.prototype['msg'] = undefined;
var _default = MemberCredentialCardsDeleteOne200Response;
exports.default = _default;

},{"../ApiClient":16}],55:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _ResCredentialCard = _interopRequireDefault(require("./ResCredentialCard"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The MemberCredentialCardsList200Response model module.
 * @module model/MemberCredentialCardsList200Response
 * @version 0.1.0
 */
class MemberCredentialCardsList200Response {
  /**
   * Constructs a new <code>MemberCredentialCardsList200Response</code>.
   * @alias module:model/MemberCredentialCardsList200Response
   */
  constructor() {
    MemberCredentialCardsList200Response.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>MemberCredentialCardsList200Response</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MemberCredentialCardsList200Response} obj Optional instance to populate.
   * @return {module:model/MemberCredentialCardsList200Response} The populated <code>MemberCredentialCardsList200Response</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new MemberCredentialCardsList200Response();
      if (data.hasOwnProperty('credentialCards')) {
        obj['credentialCards'] = _ApiClient.default.convertToType(data['credentialCards'], [_ResCredentialCard.default]);
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>MemberCredentialCardsList200Response</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>MemberCredentialCardsList200Response</code>.
   */
  static validateJSON(data) {
    if (data['credentialCards']) {
      // data not null
      // ensure the json data is an array
      if (!Array.isArray(data['credentialCards'])) {
        throw new Error("Expected the field `credentialCards` to be an array in the JSON data but got " + data['credentialCards']);
      }
      // validate the optional field `credentialCards` (array)
      for (const item of data['credentialCards']) {
        _ResCredentialCard.default.validateJSON(item);
      }
      ;
    }
    return true;
  }
}

/**
 * @member {Array.<module:model/ResCredentialCard>} credentialCards
 */
MemberCredentialCardsList200Response.prototype['credentialCards'] = undefined;
var _default = MemberCredentialCardsList200Response;
exports.default = _default;

},{"../ApiClient":16,"./ResCredentialCard":99}],56:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The MemberCredentialCardsUpdateOneExpiryRequest model module.
 * @module model/MemberCredentialCardsUpdateOneExpiryRequest
 * @version 0.1.0
 */
class MemberCredentialCardsUpdateOneExpiryRequest {
  /**
   * Constructs a new <code>MemberCredentialCardsUpdateOneExpiryRequest</code>.
   * @alias module:model/MemberCredentialCardsUpdateOneExpiryRequest
   * @param expirationDate {Date} 
   */
  constructor(expirationDate) {
    MemberCredentialCardsUpdateOneExpiryRequest.initialize(this, expirationDate);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj, expirationDate) {
    obj['expirationDate'] = expirationDate;
  }

  /**
   * Constructs a <code>MemberCredentialCardsUpdateOneExpiryRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MemberCredentialCardsUpdateOneExpiryRequest} obj Optional instance to populate.
   * @return {module:model/MemberCredentialCardsUpdateOneExpiryRequest} The populated <code>MemberCredentialCardsUpdateOneExpiryRequest</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new MemberCredentialCardsUpdateOneExpiryRequest();
      if (data.hasOwnProperty('expirationDate')) {
        obj['expirationDate'] = _ApiClient.default.convertToType(data['expirationDate'], 'Date');
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>MemberCredentialCardsUpdateOneExpiryRequest</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>MemberCredentialCardsUpdateOneExpiryRequest</code>.
   */
  static validateJSON(data) {
    // check to make sure all required properties are present in the JSON string
    for (const property of MemberCredentialCardsUpdateOneExpiryRequest.RequiredProperties) {
      if (!data[property]) {
        throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
      }
    }
    return true;
  }
}
MemberCredentialCardsUpdateOneExpiryRequest.RequiredProperties = ["expirationDate"];

/**
 * @member {Date} expirationDate
 */
MemberCredentialCardsUpdateOneExpiryRequest.prototype['expirationDate'] = undefined;
var _default = MemberCredentialCardsUpdateOneExpiryRequest;
exports.default = _default;

},{"../ApiClient":16}],57:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The MemberCredentialCardsUpdateOnePrint409Response model module.
 * @module model/MemberCredentialCardsUpdateOnePrint409Response
 * @version 0.1.0
 */
class MemberCredentialCardsUpdateOnePrint409Response {
  /**
   * Constructs a new <code>MemberCredentialCardsUpdateOnePrint409Response</code>.
   * @alias module:model/MemberCredentialCardsUpdateOnePrint409Response
   */
  constructor() {
    MemberCredentialCardsUpdateOnePrint409Response.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>MemberCredentialCardsUpdateOnePrint409Response</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MemberCredentialCardsUpdateOnePrint409Response} obj Optional instance to populate.
   * @return {module:model/MemberCredentialCardsUpdateOnePrint409Response} The populated <code>MemberCredentialCardsUpdateOnePrint409Response</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new MemberCredentialCardsUpdateOnePrint409Response();
      if (data.hasOwnProperty('err')) {
        obj['err'] = _ApiClient.default.convertToType(data['err'], 'String');
      }
      if (data.hasOwnProperty('errCode')) {
        obj['errCode'] = _ApiClient.default.convertToType(data['errCode'], 'Number');
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>MemberCredentialCardsUpdateOnePrint409Response</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>MemberCredentialCardsUpdateOnePrint409Response</code>.
   */
  static validateJSON(data) {
    // ensure the json data is a string
    if (data['err'] && !(typeof data['err'] === 'string' || data['err'] instanceof String)) {
      throw new Error("Expected the field `err` to be a primitive type in the JSON string but got " + data['err']);
    }
    return true;
  }
}

/**
 * @member {String} err
 */
MemberCredentialCardsUpdateOnePrint409Response.prototype['err'] = undefined;

/**
 * @member {Number} errCode
 */
MemberCredentialCardsUpdateOnePrint409Response.prototype['errCode'] = undefined;
var _default = MemberCredentialCardsUpdateOnePrint409Response;
exports.default = _default;

},{"../ApiClient":16}],58:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The MemberCredentialCardsUpdateOneVerify409Response model module.
 * @module model/MemberCredentialCardsUpdateOneVerify409Response
 * @version 0.1.0
 */
class MemberCredentialCardsUpdateOneVerify409Response {
  /**
   * Constructs a new <code>MemberCredentialCardsUpdateOneVerify409Response</code>.
   * @alias module:model/MemberCredentialCardsUpdateOneVerify409Response
   */
  constructor() {
    MemberCredentialCardsUpdateOneVerify409Response.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>MemberCredentialCardsUpdateOneVerify409Response</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MemberCredentialCardsUpdateOneVerify409Response} obj Optional instance to populate.
   * @return {module:model/MemberCredentialCardsUpdateOneVerify409Response} The populated <code>MemberCredentialCardsUpdateOneVerify409Response</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new MemberCredentialCardsUpdateOneVerify409Response();
      if (data.hasOwnProperty('err')) {
        obj['err'] = _ApiClient.default.convertToType(data['err'], 'String');
      }
      if (data.hasOwnProperty('errCode')) {
        obj['errCode'] = _ApiClient.default.convertToType(data['errCode'], 'Number');
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>MemberCredentialCardsUpdateOneVerify409Response</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>MemberCredentialCardsUpdateOneVerify409Response</code>.
   */
  static validateJSON(data) {
    // ensure the json data is a string
    if (data['err'] && !(typeof data['err'] === 'string' || data['err'] instanceof String)) {
      throw new Error("Expected the field `err` to be a primitive type in the JSON string but got " + data['err']);
    }
    return true;
  }
}

/**
 * @member {String} err
 */
MemberCredentialCardsUpdateOneVerify409Response.prototype['err'] = undefined;

/**
 * @member {Number} errCode
 */
MemberCredentialCardsUpdateOneVerify409Response.prototype['errCode'] = undefined;
var _default = MemberCredentialCardsUpdateOneVerify409Response;
exports.default = _default;

},{"../ApiClient":16}],59:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The MemberDocsDeleteOne200Response model module.
 * @module model/MemberDocsDeleteOne200Response
 * @version 0.1.0
 */
class MemberDocsDeleteOne200Response {
  /**
   * Constructs a new <code>MemberDocsDeleteOne200Response</code>.
   * @alias module:model/MemberDocsDeleteOne200Response
   */
  constructor() {
    MemberDocsDeleteOne200Response.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>MemberDocsDeleteOne200Response</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MemberDocsDeleteOne200Response} obj Optional instance to populate.
   * @return {module:model/MemberDocsDeleteOne200Response} The populated <code>MemberDocsDeleteOne200Response</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new MemberDocsDeleteOne200Response();
      if (data.hasOwnProperty('status')) {
        obj['status'] = _ApiClient.default.convertToType(data['status'], 'String');
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>MemberDocsDeleteOne200Response</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>MemberDocsDeleteOne200Response</code>.
   */
  static validateJSON(data) {
    // ensure the json data is a string
    if (data['status'] && !(typeof data['status'] === 'string' || data['status'] instanceof String)) {
      throw new Error("Expected the field `status` to be a primitive type in the JSON string but got " + data['status']);
    }
    return true;
  }
}

/**
 * @member {String} status
 */
MemberDocsDeleteOne200Response.prototype['status'] = undefined;
var _default = MemberDocsDeleteOne200Response;
exports.default = _default;

},{"../ApiClient":16}],60:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _ResMembershipDocs = _interopRequireDefault(require("./ResMembershipDocs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The MemberDocsGet200Response model module.
 * @module model/MemberDocsGet200Response
 * @version 0.1.0
 */
class MemberDocsGet200Response {
  /**
   * Constructs a new <code>MemberDocsGet200Response</code>.
   * @alias module:model/MemberDocsGet200Response
   */
  constructor() {
    MemberDocsGet200Response.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>MemberDocsGet200Response</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MemberDocsGet200Response} obj Optional instance to populate.
   * @return {module:model/MemberDocsGet200Response} The populated <code>MemberDocsGet200Response</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new MemberDocsGet200Response();
      if (data.hasOwnProperty('docs')) {
        obj['docs'] = _ResMembershipDocs.default.constructFromObject(data['docs']);
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>MemberDocsGet200Response</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>MemberDocsGet200Response</code>.
   */
  static validateJSON(data) {
    // validate the optional field `docs`
    if (data['docs']) {
      // data not null
      _ResMembershipDocs.default.validateJSON(data['docs']);
    }
    return true;
  }
}

/**
 * @member {module:model/ResMembershipDocs} docs
 */
MemberDocsGet200Response.prototype['docs'] = undefined;
var _default = MemberDocsGet200Response;
exports.default = _default;

},{"../ApiClient":16,"./ResMembershipDocs":107}],61:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _ResMemberDoc = _interopRequireDefault(require("./ResMemberDoc"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The MemberDocsUpdateOne200Response model module.
 * @module model/MemberDocsUpdateOne200Response
 * @version 0.1.0
 */
class MemberDocsUpdateOne200Response {
  /**
   * Constructs a new <code>MemberDocsUpdateOne200Response</code>.
   * @alias module:model/MemberDocsUpdateOne200Response
   */
  constructor() {
    MemberDocsUpdateOne200Response.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>MemberDocsUpdateOne200Response</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MemberDocsUpdateOne200Response} obj Optional instance to populate.
   * @return {module:model/MemberDocsUpdateOne200Response} The populated <code>MemberDocsUpdateOne200Response</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new MemberDocsUpdateOne200Response();
      if (data.hasOwnProperty('doc')) {
        obj['doc'] = _ResMemberDoc.default.constructFromObject(data['doc']);
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>MemberDocsUpdateOne200Response</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>MemberDocsUpdateOne200Response</code>.
   */
  static validateJSON(data) {
    // validate the optional field `doc`
    if (data['doc']) {
      // data not null
      _ResMemberDoc.default.validateJSON(data['doc']);
    }
    return true;
  }
}

/**
 * @member {module:model/ResMemberDoc} doc
 */
MemberDocsUpdateOne200Response.prototype['doc'] = undefined;
var _default = MemberDocsUpdateOne200Response;
exports.default = _default;

},{"../ApiClient":16,"./ResMemberDoc":103}],62:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
* Enum class MemberGender.
* @enum {}
* @readonly
*/
class MemberGender {
  /**
   * value: "MALE"
   * @const
   */
  "MALE" = "MALE";

  /**
   * value: "FEMALE"
   * @const
   */
  "FEMALE" = "FEMALE";

  /**
  * Returns a <code>MemberGender</code> enum value from a Javascript object name.
  * @param {Object} data The plain JavaScript object containing the name of the enum value.
  * @return {module:model/MemberGender} The enum <code>MemberGender</code> value.
  */
  static constructFromObject(object) {
    return object;
  }
}
exports.default = MemberGender;

},{"../ApiClient":16}],63:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
* Enum class MemberInterestsCommittee.
* @enum {}
* @readonly
*/
class MemberInterestsCommittee {
  /**
   * value: "GEN_ED"
   * @const
   */
  "GEN_ED" = "GEN_ED";

  /**
   * value: "NEW_MEM"
   * @const
   */
  "NEW_MEM" = "NEW_MEM";

  /**
   * value: "ORIENTATION"
   * @const
   */
  "ORIENTATION" = "ORIENTATION";

  /**
   * value: "EVENTS"
   * @const
   */
  "EVENTS" = "EVENTS";

  /**
   * value: "RECORDS"
   * @const
   */
  "RECORDS" = "RECORDS";

  /**
   * value: "TREASURY"
   * @const
   */
  "TREASURY" = "TREASURY";

  /**
   * value: "OVERSIGHT"
   * @const
   */
  "OVERSIGHT" = "OVERSIGHT";

  /**
   * value: "OMBUDSMAN"
   * @const
   */
  "OMBUDSMAN" = "OMBUDSMAN";

  /**
   * value: "VETTING"
   * @const
   */
  "VETTING" = "VETTING";

  /**
   * value: "GEN_ELECTIONS"
   * @const
   */
  "GEN_ELECTIONS" = "GEN_ELECTIONS";

  /**
   * value: "MARSHAL_AT_ARMS"
   * @const
   */
  "MARSHAL_AT_ARMS" = "MARSHAL_AT_ARMS";

  /**
   * value: "INFRA"
   * @const
   */
  "INFRA" = "INFRA";

  /**
   * value: "VENUE"
   * @const
   */
  "VENUE" = "VENUE";

  /**
   * value: "LAW_ED"
   * @const
   */
  "LAW_ED" = "LAW_ED";

  /**
   * value: "JURY_POOL"
   * @const
   */
  "JURY_POOL" = "JURY_POOL";

  /**
   * value: "SHERIFF"
   * @const
   */
  "SHERIFF" = "SHERIFF";

  /**
   * value: "CORONER"
   * @const
   */
  "CORONER" = "CORONER";

  /**
   * value: "LITIGATION"
   * @const
   */
  "LITIGATION" = "LITIGATION";

  /**
   * value: "LAND_PATENT"
   * @const
   */
  "LAND_PATENT" = "LAND_PATENT";

  /**
   * value: "INTL_ED"
   * @const
   */
  "INTL_ED" = "INTL_ED";

  /**
   * value: "PROVISIONS"
   * @const
   */
  "PROVISIONS" = "PROVISIONS";

  /**
   * value: "MILITIA_ED"
   * @const
   */
  "MILITIA_ED" = "MILITIA_ED";

  /**
   * value: "MILITIA_OPS"
   * @const
   */
  "MILITIA_OPS" = "MILITIA_OPS";

  /**
  * Returns a <code>MemberInterestsCommittee</code> enum value from a Javascript object name.
  * @param {Object} data The plain JavaScript object containing the name of the enum value.
  * @return {module:model/MemberInterestsCommittee} The enum <code>MemberInterestsCommittee</code> value.
  */
  static constructFromObject(object) {
    return object;
  }
}
exports.default = MemberInterestsCommittee;

},{"../ApiClient":16}],64:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
* Enum class MemberInterestsIndividual.
* @enum {}
* @readonly
*/
class MemberInterestsIndividual {
  /**
   * value: "ACCOUNTING"
   * @const
   */
  "ACCOUNTING" = "ACCOUNTING";

  /**
   * value: "ARMORY"
   * @const
   */
  "ARMORY" = "ARMORY";

  /**
   * value: "BOOKKEEPING"
   * @const
   */
  "BOOKKEEPING" = "BOOKKEEPING";

  /**
   * value: "CARPENTRY"
   * @const
   */
  "CARPENTRY" = "CARPENTRY";

  /**
   * value: "CHILDCARE"
   * @const
   */
  "CHILDCARE" = "CHILDCARE";

  /**
   * value: "COMP_PROGRAMMING"
   * @const
   */
  "COMP_PROGRAMMING" = "COMP_PROGRAMMING";

  /**
   * value: "CONSTRUCTION"
   * @const
   */
  "CONSTRUCTION" = "CONSTRUCTION";

  /**
   * value: "COOKING"
   * @const
   */
  "COOKING" = "COOKING";

  /**
   * value: "DENTISTRY"
   * @const
   */
  "DENTISTRY" = "DENTISTRY";

  /**
   * value: "EDUCATION"
   * @const
   */
  "EDUCATION" = "EDUCATION";

  /**
   * value: "ELECTRICIAN"
   * @const
   */
  "ELECTRICIAN" = "ELECTRICIAN";

  /**
   * value: "ELECTRONICS_REPAIR"
   * @const
   */
  "ELECTRONICS_REPAIR" = "ELECTRONICS_REPAIR";

  /**
   * value: "FARMING"
   * @const
   */
  "FARMING" = "FARMING";

  /**
   * value: "IT"
   * @const
   */
  "IT" = "IT";

  /**
   * value: "JANITORIAL"
   * @const
   */
  "JANITORIAL" = "JANITORIAL";

  /**
   * value: "MARKETING"
   * @const
   */
  "MARKETING" = "MARKETING";

  /**
   * value: "MEDICAL"
   * @const
   */
  "MEDICAL" = "MEDICAL";

  /**
   * value: "NUTRITION"
   * @const
   */
  "NUTRITION" = "NUTRITION";

  /**
   * value: "ORGANIZING"
   * @const
   */
  "ORGANIZING" = "ORGANIZING";

  /**
   * value: "PLUMBING"
   * @const
   */
  "PLUMBING" = "PLUMBING";

  /**
   * value: "PR"
   * @const
   */
  "PR" = "PR";

  /**
   * value: "RADIO_COMM"
   * @const
   */
  "RADIO_COMM" = "RADIO_COMM";

  /**
   * value: "RANCHING"
   * @const
   */
  "RANCHING" = "RANCHING";

  /**
   * value: "RECORDKEEPING"
   * @const
   */
  "RECORDKEEPING" = "RECORDKEEPING";

  /**
   * value: "RESEARCH"
   * @const
   */
  "RESEARCH" = "RESEARCH";

  /**
   * value: "SEWING"
   * @const
   */
  "SEWING" = "SEWING";

  /**
   * value: "TEACHING"
   * @const
   */
  "TEACHING" = "TEACHING";

  /**
   * value: "TRANSPORTATION"
   * @const
   */
  "TRANSPORTATION" = "TRANSPORTATION";

  /**
   * value: "WOODWORKING"
   * @const
   */
  "WOODWORKING" = "WOODWORKING";

  /**
  * Returns a <code>MemberInterestsIndividual</code> enum value from a Javascript object name.
  * @param {Object} data The plain JavaScript object containing the name of the enum value.
  * @return {module:model/MemberInterestsIndividual} The enum <code>MemberInterestsIndividual</code> value.
  */
  static constructFromObject(object) {
    return object;
  }
}
exports.default = MemberInterestsIndividual;

},{"../ApiClient":16}],65:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
* Enum class MemberNationalityStatus.
* @enum {}
* @readonly
*/
class MemberNationalityStatus {
  /**
   * value: "PENDING"
   * @const
   */
  "PENDING" = "PENDING";

  /**
   * value: "VERIFIED"
   * @const
   */
  "VERIFIED" = "VERIFIED";

  /**
   * value: "DENIED"
   * @const
   */
  "DENIED" = "DENIED";

  /**
  * Returns a <code>MemberNationalityStatus</code> enum value from a Javascript object name.
  * @param {Object} data The plain JavaScript object containing the name of the enum value.
  * @return {module:model/MemberNationalityStatus} The enum <code>MemberNationalityStatus</code> value.
  */
  static constructFromObject(object) {
    return object;
  }
}
exports.default = MemberNationalityStatus;

},{"../ApiClient":16}],66:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The MemberOrderDeleteOne200Response model module.
 * @module model/MemberOrderDeleteOne200Response
 * @version 0.1.0
 */
class MemberOrderDeleteOne200Response {
  /**
   * Constructs a new <code>MemberOrderDeleteOne200Response</code>.
   * @alias module:model/MemberOrderDeleteOne200Response
   */
  constructor() {
    MemberOrderDeleteOne200Response.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>MemberOrderDeleteOne200Response</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MemberOrderDeleteOne200Response} obj Optional instance to populate.
   * @return {module:model/MemberOrderDeleteOne200Response} The populated <code>MemberOrderDeleteOne200Response</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new MemberOrderDeleteOne200Response();
      if (data.hasOwnProperty('msg')) {
        obj['msg'] = _ApiClient.default.convertToType(data['msg'], 'String');
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>MemberOrderDeleteOne200Response</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>MemberOrderDeleteOne200Response</code>.
   */
  static validateJSON(data) {
    // ensure the json data is a string
    if (data['msg'] && !(typeof data['msg'] === 'string' || data['msg'] instanceof String)) {
      throw new Error("Expected the field `msg` to be a primitive type in the JSON string but got " + data['msg']);
    }
    return true;
  }
}

/**
 * @member {String} msg
 */
MemberOrderDeleteOne200Response.prototype['msg'] = undefined;
var _default = MemberOrderDeleteOne200Response;
exports.default = _default;

},{"../ApiClient":16}],67:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The MemberOrderItemsUpdateOneRequest model module.
 * @module model/MemberOrderItemsUpdateOneRequest
 * @version 0.1.0
 */
class MemberOrderItemsUpdateOneRequest {
  /**
   * Constructs a new <code>MemberOrderItemsUpdateOneRequest</code>.
   * @alias module:model/MemberOrderItemsUpdateOneRequest
   */
  constructor() {
    MemberOrderItemsUpdateOneRequest.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>MemberOrderItemsUpdateOneRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MemberOrderItemsUpdateOneRequest} obj Optional instance to populate.
   * @return {module:model/MemberOrderItemsUpdateOneRequest} The populated <code>MemberOrderItemsUpdateOneRequest</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new MemberOrderItemsUpdateOneRequest();
      if (data.hasOwnProperty('notes')) {
        obj['notes'] = _ApiClient.default.convertToType(data['notes'], 'String');
      }
      if (data.hasOwnProperty('discount')) {
        obj['discount'] = _ApiClient.default.convertToType(data['discount'], 'String');
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>MemberOrderItemsUpdateOneRequest</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>MemberOrderItemsUpdateOneRequest</code>.
   */
  static validateJSON(data) {
    // ensure the json data is a string
    if (data['notes'] && !(typeof data['notes'] === 'string' || data['notes'] instanceof String)) {
      throw new Error("Expected the field `notes` to be a primitive type in the JSON string but got " + data['notes']);
    }
    // ensure the json data is a string
    if (data['discount'] && !(typeof data['discount'] === 'string' || data['discount'] instanceof String)) {
      throw new Error("Expected the field `discount` to be a primitive type in the JSON string but got " + data['discount']);
    }
    return true;
  }
}

/**
 * @member {String} notes
 */
MemberOrderItemsUpdateOneRequest.prototype['notes'] = undefined;

/**
 * @member {String} discount
 */
MemberOrderItemsUpdateOneRequest.prototype['discount'] = undefined;
var _default = MemberOrderItemsUpdateOneRequest;
exports.default = _default;

},{"../ApiClient":16}],68:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _ResShopOrderPayment = _interopRequireDefault(require("./ResShopOrderPayment"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The MemberOrderPaymentList200Response model module.
 * @module model/MemberOrderPaymentList200Response
 * @version 0.1.0
 */
class MemberOrderPaymentList200Response {
  /**
   * Constructs a new <code>MemberOrderPaymentList200Response</code>.
   * @alias module:model/MemberOrderPaymentList200Response
   */
  constructor() {
    MemberOrderPaymentList200Response.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>MemberOrderPaymentList200Response</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MemberOrderPaymentList200Response} obj Optional instance to populate.
   * @return {module:model/MemberOrderPaymentList200Response} The populated <code>MemberOrderPaymentList200Response</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new MemberOrderPaymentList200Response();
      if (data.hasOwnProperty('order')) {
        obj['order'] = _ApiClient.default.convertToType(data['order'], [_ResShopOrderPayment.default]);
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>MemberOrderPaymentList200Response</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>MemberOrderPaymentList200Response</code>.
   */
  static validateJSON(data) {
    if (data['order']) {
      // data not null
      // ensure the json data is an array
      if (!Array.isArray(data['order'])) {
        throw new Error("Expected the field `order` to be an array in the JSON data but got " + data['order']);
      }
      // validate the optional field `order` (array)
      for (const item of data['order']) {
        _ResShopOrderPayment.default.validateJSON(item);
      }
      ;
    }
    return true;
  }
}

/**
 * @member {Array.<module:model/ResShopOrderPayment>} order
 */
MemberOrderPaymentList200Response.prototype['order'] = undefined;
var _default = MemberOrderPaymentList200Response;
exports.default = _default;

},{"../ApiClient":16,"./ResShopOrderPayment":112}],69:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The MemberOrderPaymentsCreate409Response model module.
 * @module model/MemberOrderPaymentsCreate409Response
 * @version 0.1.0
 */
class MemberOrderPaymentsCreate409Response {
  /**
   * Constructs a new <code>MemberOrderPaymentsCreate409Response</code>.
   * @alias module:model/MemberOrderPaymentsCreate409Response
   */
  constructor() {
    MemberOrderPaymentsCreate409Response.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>MemberOrderPaymentsCreate409Response</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MemberOrderPaymentsCreate409Response} obj Optional instance to populate.
   * @return {module:model/MemberOrderPaymentsCreate409Response} The populated <code>MemberOrderPaymentsCreate409Response</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new MemberOrderPaymentsCreate409Response();
      if (data.hasOwnProperty('err')) {
        obj['err'] = _ApiClient.default.convertToType(data['err'], 'String');
      }
      if (data.hasOwnProperty('errCode')) {
        obj['errCode'] = _ApiClient.default.convertToType(data['errCode'], 'Number');
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>MemberOrderPaymentsCreate409Response</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>MemberOrderPaymentsCreate409Response</code>.
   */
  static validateJSON(data) {
    // ensure the json data is a string
    if (data['err'] && !(typeof data['err'] === 'string' || data['err'] instanceof String)) {
      throw new Error("Expected the field `err` to be a primitive type in the JSON string but got " + data['err']);
    }
    return true;
  }
}

/**
 * @member {String} err
 */
MemberOrderPaymentsCreate409Response.prototype['err'] = undefined;

/**
 * @member {Number} errCode
 */
MemberOrderPaymentsCreate409Response.prototype['errCode'] = undefined;
var _default = MemberOrderPaymentsCreate409Response;
exports.default = _default;

},{"../ApiClient":16}],70:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _ShopOrderPaymentMethod = _interopRequireDefault(require("./ShopOrderPaymentMethod"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The MemberOrderPaymentsCreateRequest model module.
 * @module model/MemberOrderPaymentsCreateRequest
 * @version 0.1.0
 */
class MemberOrderPaymentsCreateRequest {
  /**
   * Constructs a new <code>MemberOrderPaymentsCreateRequest</code>.
   * @alias module:model/MemberOrderPaymentsCreateRequest
   * @param method {module:model/ShopOrderPaymentMethod} 
   */
  constructor(method) {
    MemberOrderPaymentsCreateRequest.initialize(this, method);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj, method) {
    obj['method'] = method;
  }

  /**
   * Constructs a <code>MemberOrderPaymentsCreateRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MemberOrderPaymentsCreateRequest} obj Optional instance to populate.
   * @return {module:model/MemberOrderPaymentsCreateRequest} The populated <code>MemberOrderPaymentsCreateRequest</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new MemberOrderPaymentsCreateRequest();
      if (data.hasOwnProperty('method')) {
        obj['method'] = _ShopOrderPaymentMethod.default.constructFromObject(data['method']);
      }
      if (data.hasOwnProperty('methodCardLast4')) {
        obj['methodCardLast4'] = _ApiClient.default.convertToType(data['methodCardLast4'], 'String');
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>MemberOrderPaymentsCreateRequest</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>MemberOrderPaymentsCreateRequest</code>.
   */
  static validateJSON(data) {
    // check to make sure all required properties are present in the JSON string
    for (const property of MemberOrderPaymentsCreateRequest.RequiredProperties) {
      if (!data[property]) {
        throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
      }
    }
    // ensure the json data is a string
    if (data['methodCardLast4'] && !(typeof data['methodCardLast4'] === 'string' || data['methodCardLast4'] instanceof String)) {
      throw new Error("Expected the field `methodCardLast4` to be a primitive type in the JSON string but got " + data['methodCardLast4']);
    }
    return true;
  }
}
MemberOrderPaymentsCreateRequest.RequiredProperties = ["method"];

/**
 * @member {module:model/ShopOrderPaymentMethod} method
 */
MemberOrderPaymentsCreateRequest.prototype['method'] = undefined;

/**
 * @member {String} methodCardLast4
 */
MemberOrderPaymentsCreateRequest.prototype['methodCardLast4'] = undefined;
var _default = MemberOrderPaymentsCreateRequest;
exports.default = _default;

},{"../ApiClient":16,"./ShopOrderPaymentMethod":122}],71:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The MemberOrderPaymentsDeleteOne200Response model module.
 * @module model/MemberOrderPaymentsDeleteOne200Response
 * @version 0.1.0
 */
class MemberOrderPaymentsDeleteOne200Response {
  /**
   * Constructs a new <code>MemberOrderPaymentsDeleteOne200Response</code>.
   * @alias module:model/MemberOrderPaymentsDeleteOne200Response
   */
  constructor() {
    MemberOrderPaymentsDeleteOne200Response.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>MemberOrderPaymentsDeleteOne200Response</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MemberOrderPaymentsDeleteOne200Response} obj Optional instance to populate.
   * @return {module:model/MemberOrderPaymentsDeleteOne200Response} The populated <code>MemberOrderPaymentsDeleteOne200Response</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new MemberOrderPaymentsDeleteOne200Response();
      if (data.hasOwnProperty('msg')) {
        obj['msg'] = _ApiClient.default.convertToType(data['msg'], 'String');
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>MemberOrderPaymentsDeleteOne200Response</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>MemberOrderPaymentsDeleteOne200Response</code>.
   */
  static validateJSON(data) {
    // ensure the json data is a string
    if (data['msg'] && !(typeof data['msg'] === 'string' || data['msg'] instanceof String)) {
      throw new Error("Expected the field `msg` to be a primitive type in the JSON string but got " + data['msg']);
    }
    return true;
  }
}

/**
 * @member {String} msg
 */
MemberOrderPaymentsDeleteOne200Response.prototype['msg'] = undefined;
var _default = MemberOrderPaymentsDeleteOne200Response;
exports.default = _default;

},{"../ApiClient":16}],72:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The MemberOrderPaymentsUpdateOneCancel409Response model module.
 * @module model/MemberOrderPaymentsUpdateOneCancel409Response
 * @version 0.1.0
 */
class MemberOrderPaymentsUpdateOneCancel409Response {
  /**
   * Constructs a new <code>MemberOrderPaymentsUpdateOneCancel409Response</code>.
   * @alias module:model/MemberOrderPaymentsUpdateOneCancel409Response
   */
  constructor() {
    MemberOrderPaymentsUpdateOneCancel409Response.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>MemberOrderPaymentsUpdateOneCancel409Response</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MemberOrderPaymentsUpdateOneCancel409Response} obj Optional instance to populate.
   * @return {module:model/MemberOrderPaymentsUpdateOneCancel409Response} The populated <code>MemberOrderPaymentsUpdateOneCancel409Response</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new MemberOrderPaymentsUpdateOneCancel409Response();
      if (data.hasOwnProperty('err')) {
        obj['err'] = _ApiClient.default.convertToType(data['err'], 'String');
      }
      if (data.hasOwnProperty('errCode')) {
        obj['errCode'] = _ApiClient.default.convertToType(data['errCode'], 'Number');
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>MemberOrderPaymentsUpdateOneCancel409Response</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>MemberOrderPaymentsUpdateOneCancel409Response</code>.
   */
  static validateJSON(data) {
    // ensure the json data is a string
    if (data['err'] && !(typeof data['err'] === 'string' || data['err'] instanceof String)) {
      throw new Error("Expected the field `err` to be a primitive type in the JSON string but got " + data['err']);
    }
    return true;
  }
}

/**
 * @member {String} err
 */
MemberOrderPaymentsUpdateOneCancel409Response.prototype['err'] = undefined;

/**
 * @member {Number} errCode
 */
MemberOrderPaymentsUpdateOneCancel409Response.prototype['errCode'] = undefined;
var _default = MemberOrderPaymentsUpdateOneCancel409Response;
exports.default = _default;

},{"../ApiClient":16}],73:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _ResShopOrder = _interopRequireDefault(require("./ResShopOrder"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The MemberOrdersCreate201Response model module.
 * @module model/MemberOrdersCreate201Response
 * @version 0.1.0
 */
class MemberOrdersCreate201Response {
  /**
   * Constructs a new <code>MemberOrdersCreate201Response</code>.
   * @alias module:model/MemberOrdersCreate201Response
   */
  constructor() {
    MemberOrdersCreate201Response.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>MemberOrdersCreate201Response</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MemberOrdersCreate201Response} obj Optional instance to populate.
   * @return {module:model/MemberOrdersCreate201Response} The populated <code>MemberOrdersCreate201Response</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new MemberOrdersCreate201Response();
      if (data.hasOwnProperty('order')) {
        obj['order'] = _ResShopOrder.default.constructFromObject(data['order']);
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>MemberOrdersCreate201Response</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>MemberOrdersCreate201Response</code>.
   */
  static validateJSON(data) {
    // validate the optional field `order`
    if (data['order']) {
      // data not null
      _ResShopOrder.default.validateJSON(data['order']);
    }
    return true;
  }
}

/**
 * @member {module:model/ResShopOrder} order
 */
MemberOrdersCreate201Response.prototype['order'] = undefined;
var _default = MemberOrdersCreate201Response;
exports.default = _default;

},{"../ApiClient":16,"./ResShopOrder":110}],74:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The MemberOrdersCreate409Response model module.
 * @module model/MemberOrdersCreate409Response
 * @version 0.1.0
 */
class MemberOrdersCreate409Response {
  /**
   * Constructs a new <code>MemberOrdersCreate409Response</code>.
   * @alias module:model/MemberOrdersCreate409Response
   */
  constructor() {
    MemberOrdersCreate409Response.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>MemberOrdersCreate409Response</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MemberOrdersCreate409Response} obj Optional instance to populate.
   * @return {module:model/MemberOrdersCreate409Response} The populated <code>MemberOrdersCreate409Response</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new MemberOrdersCreate409Response();
      if (data.hasOwnProperty('err')) {
        obj['err'] = _ApiClient.default.convertToType(data['err'], 'String');
      }
      if (data.hasOwnProperty('errCode')) {
        obj['errCode'] = _ApiClient.default.convertToType(data['errCode'], 'Number');
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>MemberOrdersCreate409Response</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>MemberOrdersCreate409Response</code>.
   */
  static validateJSON(data) {
    // ensure the json data is a string
    if (data['err'] && !(typeof data['err'] === 'string' || data['err'] instanceof String)) {
      throw new Error("Expected the field `err` to be a primitive type in the JSON string but got " + data['err']);
    }
    return true;
  }
}

/**
 * @member {String} err
 */
MemberOrdersCreate409Response.prototype['err'] = undefined;

/**
 * @member {Number} errCode
 */
MemberOrdersCreate409Response.prototype['errCode'] = undefined;
var _default = MemberOrdersCreate409Response;
exports.default = _default;

},{"../ApiClient":16}],75:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _ResShopOrder = _interopRequireDefault(require("./ResShopOrder"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The MemberOrdersList200Response model module.
 * @module model/MemberOrdersList200Response
 * @version 0.1.0
 */
class MemberOrdersList200Response {
  /**
   * Constructs a new <code>MemberOrdersList200Response</code>.
   * @alias module:model/MemberOrdersList200Response
   */
  constructor() {
    MemberOrdersList200Response.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>MemberOrdersList200Response</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MemberOrdersList200Response} obj Optional instance to populate.
   * @return {module:model/MemberOrdersList200Response} The populated <code>MemberOrdersList200Response</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new MemberOrdersList200Response();
      if (data.hasOwnProperty('orders')) {
        obj['orders'] = _ApiClient.default.convertToType(data['orders'], [_ResShopOrder.default]);
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>MemberOrdersList200Response</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>MemberOrdersList200Response</code>.
   */
  static validateJSON(data) {
    if (data['orders']) {
      // data not null
      // ensure the json data is an array
      if (!Array.isArray(data['orders'])) {
        throw new Error("Expected the field `orders` to be an array in the JSON data but got " + data['orders']);
      }
      // validate the optional field `orders` (array)
      for (const item of data['orders']) {
        _ResShopOrder.default.validateJSON(item);
      }
      ;
    }
    return true;
  }
}

/**
 * @member {Array.<module:model/ResShopOrder>} orders
 */
MemberOrdersList200Response.prototype['orders'] = undefined;
var _default = MemberOrdersList200Response;
exports.default = _default;

},{"../ApiClient":16,"./ResShopOrder":110}],76:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The MemberOrdersUpdateOne409Response model module.
 * @module model/MemberOrdersUpdateOne409Response
 * @version 0.1.0
 */
class MemberOrdersUpdateOne409Response {
  /**
   * Constructs a new <code>MemberOrdersUpdateOne409Response</code>.
   * @alias module:model/MemberOrdersUpdateOne409Response
   */
  constructor() {
    MemberOrdersUpdateOne409Response.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>MemberOrdersUpdateOne409Response</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MemberOrdersUpdateOne409Response} obj Optional instance to populate.
   * @return {module:model/MemberOrdersUpdateOne409Response} The populated <code>MemberOrdersUpdateOne409Response</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new MemberOrdersUpdateOne409Response();
      if (data.hasOwnProperty('err')) {
        obj['err'] = _ApiClient.default.convertToType(data['err'], 'String');
      }
      if (data.hasOwnProperty('errCode')) {
        obj['errCode'] = _ApiClient.default.convertToType(data['errCode'], 'Number');
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>MemberOrdersUpdateOne409Response</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>MemberOrdersUpdateOne409Response</code>.
   */
  static validateJSON(data) {
    // ensure the json data is a string
    if (data['err'] && !(typeof data['err'] === 'string' || data['err'] instanceof String)) {
      throw new Error("Expected the field `err` to be a primitive type in the JSON string but got " + data['err']);
    }
    return true;
  }
}

/**
 * @member {String} err
 */
MemberOrdersUpdateOne409Response.prototype['err'] = undefined;

/**
 * @member {Number} errCode
 */
MemberOrdersUpdateOne409Response.prototype['errCode'] = undefined;
var _default = MemberOrdersUpdateOne409Response;
exports.default = _default;

},{"../ApiClient":16}],77:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The MemberOrdersUpdateOneRequest model module.
 * @module model/MemberOrdersUpdateOneRequest
 * @version 0.1.0
 */
class MemberOrdersUpdateOneRequest {
  /**
   * Constructs a new <code>MemberOrdersUpdateOneRequest</code>.
   * @alias module:model/MemberOrdersUpdateOneRequest
   */
  constructor() {
    MemberOrdersUpdateOneRequest.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>MemberOrdersUpdateOneRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MemberOrdersUpdateOneRequest} obj Optional instance to populate.
   * @return {module:model/MemberOrdersUpdateOneRequest} The populated <code>MemberOrdersUpdateOneRequest</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new MemberOrdersUpdateOneRequest();
      if (data.hasOwnProperty('credit')) {
        obj['credit'] = _ApiClient.default.convertToType(data['credit'], 'String');
      }
      if (data.hasOwnProperty('notes')) {
        obj['notes'] = _ApiClient.default.convertToType(data['notes'], 'String');
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>MemberOrdersUpdateOneRequest</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>MemberOrdersUpdateOneRequest</code>.
   */
  static validateJSON(data) {
    // ensure the json data is a string
    if (data['credit'] && !(typeof data['credit'] === 'string' || data['credit'] instanceof String)) {
      throw new Error("Expected the field `credit` to be a primitive type in the JSON string but got " + data['credit']);
    }
    // ensure the json data is a string
    if (data['notes'] && !(typeof data['notes'] === 'string' || data['notes'] instanceof String)) {
      throw new Error("Expected the field `notes` to be a primitive type in the JSON string but got " + data['notes']);
    }
    return true;
  }
}

/**
 * @member {String} credit
 */
MemberOrdersUpdateOneRequest.prototype['credit'] = undefined;

/**
 * @member {String} notes
 */
MemberOrdersUpdateOneRequest.prototype['notes'] = undefined;
var _default = MemberOrdersUpdateOneRequest;
exports.default = _default;

},{"../ApiClient":16}],78:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
* Enum class MemberProfileCounty.
* @enum {}
* @readonly
*/
class MemberProfileCounty {
  /**
   * value: "ADAMS"
   * @const
   */
  "ADAMS" = "ADAMS";

  /**
   * value: "ALLEN"
   * @const
   */
  "ALLEN" = "ALLEN";

  /**
   * value: "ASHLAND"
   * @const
   */
  "ASHLAND" = "ASHLAND";

  /**
   * value: "ASHTABULA"
   * @const
   */
  "ASHTABULA" = "ASHTABULA";

  /**
   * value: "ATHENS"
   * @const
   */
  "ATHENS" = "ATHENS";

  /**
   * value: "AUGLAIZE"
   * @const
   */
  "AUGLAIZE" = "AUGLAIZE";

  /**
   * value: "BELMONT"
   * @const
   */
  "BELMONT" = "BELMONT";

  /**
   * value: "BROWN"
   * @const
   */
  "BROWN" = "BROWN";

  /**
   * value: "BUTLER"
   * @const
   */
  "BUTLER" = "BUTLER";

  /**
   * value: "CARROLL"
   * @const
   */
  "CARROLL" = "CARROLL";

  /**
   * value: "CHAMPAIGN"
   * @const
   */
  "CHAMPAIGN" = "CHAMPAIGN";

  /**
   * value: "CLARK"
   * @const
   */
  "CLARK" = "CLARK";

  /**
   * value: "CLERMONT"
   * @const
   */
  "CLERMONT" = "CLERMONT";

  /**
   * value: "CLINTON"
   * @const
   */
  "CLINTON" = "CLINTON";

  /**
   * value: "COLUMBIANA"
   * @const
   */
  "COLUMBIANA" = "COLUMBIANA";

  /**
   * value: "COSHOCTON"
   * @const
   */
  "COSHOCTON" = "COSHOCTON";

  /**
   * value: "CRAWFORD"
   * @const
   */
  "CRAWFORD" = "CRAWFORD";

  /**
   * value: "CUYAHOGA"
   * @const
   */
  "CUYAHOGA" = "CUYAHOGA";

  /**
   * value: "DARKE"
   * @const
   */
  "DARKE" = "DARKE";

  /**
   * value: "DEFIANCE"
   * @const
   */
  "DEFIANCE" = "DEFIANCE";

  /**
   * value: "DELAWARE"
   * @const
   */
  "DELAWARE" = "DELAWARE";

  /**
   * value: "ERIE"
   * @const
   */
  "ERIE" = "ERIE";

  /**
   * value: "FAIRFIELD"
   * @const
   */
  "FAIRFIELD" = "FAIRFIELD";

  /**
   * value: "FAYETTE"
   * @const
   */
  "FAYETTE" = "FAYETTE";

  /**
   * value: "FRANKLIN"
   * @const
   */
  "FRANKLIN" = "FRANKLIN";

  /**
   * value: "FULTON"
   * @const
   */
  "FULTON" = "FULTON";

  /**
   * value: "GALLIA"
   * @const
   */
  "GALLIA" = "GALLIA";

  /**
   * value: "GEAUGA"
   * @const
   */
  "GEAUGA" = "GEAUGA";

  /**
   * value: "GREENE"
   * @const
   */
  "GREENE" = "GREENE";

  /**
   * value: "GUERNSEY"
   * @const
   */
  "GUERNSEY" = "GUERNSEY";

  /**
   * value: "HAMILTON"
   * @const
   */
  "HAMILTON" = "HAMILTON";

  /**
   * value: "HANCOCK"
   * @const
   */
  "HANCOCK" = "HANCOCK";

  /**
   * value: "HARDIN"
   * @const
   */
  "HARDIN" = "HARDIN";

  /**
   * value: "HARRISON"
   * @const
   */
  "HARRISON" = "HARRISON";

  /**
   * value: "HENRY"
   * @const
   */
  "HENRY" = "HENRY";

  /**
   * value: "HIGHLAND"
   * @const
   */
  "HIGHLAND" = "HIGHLAND";

  /**
   * value: "HOCKING"
   * @const
   */
  "HOCKING" = "HOCKING";

  /**
   * value: "HOLMES"
   * @const
   */
  "HOLMES" = "HOLMES";

  /**
   * value: "HURON"
   * @const
   */
  "HURON" = "HURON";

  /**
   * value: "JACKSON"
   * @const
   */
  "JACKSON" = "JACKSON";

  /**
   * value: "JEFFERSON"
   * @const
   */
  "JEFFERSON" = "JEFFERSON";

  /**
   * value: "KNOX"
   * @const
   */
  "KNOX" = "KNOX";

  /**
   * value: "LAKE"
   * @const
   */
  "LAKE" = "LAKE";

  /**
   * value: "LAWRENCE"
   * @const
   */
  "LAWRENCE" = "LAWRENCE";

  /**
   * value: "LICKING"
   * @const
   */
  "LICKING" = "LICKING";

  /**
   * value: "LOGAN"
   * @const
   */
  "LOGAN" = "LOGAN";

  /**
   * value: "LORAIN"
   * @const
   */
  "LORAIN" = "LORAIN";

  /**
   * value: "LUCAS"
   * @const
   */
  "LUCAS" = "LUCAS";

  /**
   * value: "MADISON"
   * @const
   */
  "MADISON" = "MADISON";

  /**
   * value: "MAHONING"
   * @const
   */
  "MAHONING" = "MAHONING";

  /**
   * value: "MARION"
   * @const
   */
  "MARION" = "MARION";

  /**
   * value: "MEDINA"
   * @const
   */
  "MEDINA" = "MEDINA";

  /**
   * value: "MEIGS"
   * @const
   */
  "MEIGS" = "MEIGS";

  /**
   * value: "MERCER"
   * @const
   */
  "MERCER" = "MERCER";

  /**
   * value: "MIAMI"
   * @const
   */
  "MIAMI" = "MIAMI";

  /**
   * value: "MONROE"
   * @const
   */
  "MONROE" = "MONROE";

  /**
   * value: "MONTGOMERY"
   * @const
   */
  "MONTGOMERY" = "MONTGOMERY";

  /**
   * value: "MORGAN"
   * @const
   */
  "MORGAN" = "MORGAN";

  /**
   * value: "MORROW"
   * @const
   */
  "MORROW" = "MORROW";

  /**
   * value: "MUSKINGUM"
   * @const
   */
  "MUSKINGUM" = "MUSKINGUM";

  /**
   * value: "NOBLE"
   * @const
   */
  "NOBLE" = "NOBLE";

  /**
   * value: "OTTAWA"
   * @const
   */
  "OTTAWA" = "OTTAWA";

  /**
   * value: "PAULDING"
   * @const
   */
  "PAULDING" = "PAULDING";

  /**
   * value: "PERRY"
   * @const
   */
  "PERRY" = "PERRY";

  /**
   * value: "PICKAWAY"
   * @const
   */
  "PICKAWAY" = "PICKAWAY";

  /**
   * value: "PIKE"
   * @const
   */
  "PIKE" = "PIKE";

  /**
   * value: "PORTAGE"
   * @const
   */
  "PORTAGE" = "PORTAGE";

  /**
   * value: "PREBLE"
   * @const
   */
  "PREBLE" = "PREBLE";

  /**
   * value: "PUTNAM"
   * @const
   */
  "PUTNAM" = "PUTNAM";

  /**
   * value: "RICHLAND"
   * @const
   */
  "RICHLAND" = "RICHLAND";

  /**
   * value: "ROSS"
   * @const
   */
  "ROSS" = "ROSS";

  /**
   * value: "SANDUSKY"
   * @const
   */
  "SANDUSKY" = "SANDUSKY";

  /**
   * value: "SCIOTO"
   * @const
   */
  "SCIOTO" = "SCIOTO";

  /**
   * value: "SENECA"
   * @const
   */
  "SENECA" = "SENECA";

  /**
   * value: "SHELBY"
   * @const
   */
  "SHELBY" = "SHELBY";

  /**
   * value: "STARK"
   * @const
   */
  "STARK" = "STARK";

  /**
   * value: "SUMMIT"
   * @const
   */
  "SUMMIT" = "SUMMIT";

  /**
   * value: "TRUMBULL"
   * @const
   */
  "TRUMBULL" = "TRUMBULL";

  /**
   * value: "TUSCARAWAS"
   * @const
   */
  "TUSCARAWAS" = "TUSCARAWAS";

  /**
   * value: "UNION"
   * @const
   */
  "UNION" = "UNION";

  /**
   * value: "VAN WERT"
   * @const
   */
  "VAN WERT" = "VAN WERT";

  /**
   * value: "VINTON"
   * @const
   */
  "VINTON" = "VINTON";

  /**
   * value: "WARREN"
   * @const
   */
  "WARREN" = "WARREN";

  /**
   * value: "WASHINGTON"
   * @const
   */
  "WASHINGTON" = "WASHINGTON";

  /**
   * value: "WAYNE"
   * @const
   */
  "WAYNE" = "WAYNE";

  /**
   * value: "WILLIAMS"
   * @const
   */
  "WILLIAMS" = "WILLIAMS";

  /**
   * value: "WOOD"
   * @const
   */
  "WOOD" = "WOOD";

  /**
   * value: "WYANDOT"
   * @const
   */
  "WYANDOT" = "WYANDOT";

  /**
  * Returns a <code>MemberProfileCounty</code> enum value from a Javascript object name.
  * @param {Object} data The plain JavaScript object containing the name of the enum value.
  * @return {module:model/MemberProfileCounty} The enum <code>MemberProfileCounty</code> value.
  */
  static constructFromObject(object) {
    return object;
  }
}
exports.default = MemberProfileCounty;

},{"../ApiClient":16}],79:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The MemberProfileDocsDeleteOne200Response model module.
 * @module model/MemberProfileDocsDeleteOne200Response
 * @version 0.1.0
 */
class MemberProfileDocsDeleteOne200Response {
  /**
   * Constructs a new <code>MemberProfileDocsDeleteOne200Response</code>.
   * @alias module:model/MemberProfileDocsDeleteOne200Response
   */
  constructor() {
    MemberProfileDocsDeleteOne200Response.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>MemberProfileDocsDeleteOne200Response</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MemberProfileDocsDeleteOne200Response} obj Optional instance to populate.
   * @return {module:model/MemberProfileDocsDeleteOne200Response} The populated <code>MemberProfileDocsDeleteOne200Response</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new MemberProfileDocsDeleteOne200Response();
      if (data.hasOwnProperty('msg')) {
        obj['msg'] = _ApiClient.default.convertToType(data['msg'], 'String');
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>MemberProfileDocsDeleteOne200Response</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>MemberProfileDocsDeleteOne200Response</code>.
   */
  static validateJSON(data) {
    // ensure the json data is a string
    if (data['msg'] && !(typeof data['msg'] === 'string' || data['msg'] instanceof String)) {
      throw new Error("Expected the field `msg` to be a primitive type in the JSON string but got " + data['msg']);
    }
    return true;
  }
}

/**
 * @member {String} msg
 */
MemberProfileDocsDeleteOne200Response.prototype['msg'] = undefined;
var _default = MemberProfileDocsDeleteOne200Response;
exports.default = _default;

},{"../ApiClient":16}],80:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The MemberProfileDocsUpdateOne409Response model module.
 * @module model/MemberProfileDocsUpdateOne409Response
 * @version 0.1.0
 */
class MemberProfileDocsUpdateOne409Response {
  /**
   * Constructs a new <code>MemberProfileDocsUpdateOne409Response</code>.
   * @alias module:model/MemberProfileDocsUpdateOne409Response
   */
  constructor() {
    MemberProfileDocsUpdateOne409Response.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>MemberProfileDocsUpdateOne409Response</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MemberProfileDocsUpdateOne409Response} obj Optional instance to populate.
   * @return {module:model/MemberProfileDocsUpdateOne409Response} The populated <code>MemberProfileDocsUpdateOne409Response</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new MemberProfileDocsUpdateOne409Response();
      if (data.hasOwnProperty('err')) {
        obj['err'] = _ApiClient.default.convertToType(data['err'], 'String');
      }
      if (data.hasOwnProperty('errCode')) {
        obj['errCode'] = _ApiClient.default.convertToType(data['errCode'], 'Number');
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>MemberProfileDocsUpdateOne409Response</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>MemberProfileDocsUpdateOne409Response</code>.
   */
  static validateJSON(data) {
    // ensure the json data is a string
    if (data['err'] && !(typeof data['err'] === 'string' || data['err'] instanceof String)) {
      throw new Error("Expected the field `err` to be a primitive type in the JSON string but got " + data['err']);
    }
    return true;
  }
}

/**
 * @member {String} err
 */
MemberProfileDocsUpdateOne409Response.prototype['err'] = undefined;

/**
 * @member {Number} errCode
 */
MemberProfileDocsUpdateOne409Response.prototype['errCode'] = undefined;
var _default = MemberProfileDocsUpdateOne409Response;
exports.default = _default;

},{"../ApiClient":16}],81:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _ResMemberProfile = _interopRequireDefault(require("./ResMemberProfile"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The MemberProfileGet200Response model module.
 * @module model/MemberProfileGet200Response
 * @version 0.1.0
 */
class MemberProfileGet200Response {
  /**
   * Constructs a new <code>MemberProfileGet200Response</code>.
   * @alias module:model/MemberProfileGet200Response
   */
  constructor() {
    MemberProfileGet200Response.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>MemberProfileGet200Response</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MemberProfileGet200Response} obj Optional instance to populate.
   * @return {module:model/MemberProfileGet200Response} The populated <code>MemberProfileGet200Response</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new MemberProfileGet200Response();
      if (data.hasOwnProperty('profile')) {
        obj['profile'] = _ResMemberProfile.default.constructFromObject(data['profile']);
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>MemberProfileGet200Response</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>MemberProfileGet200Response</code>.
   */
  static validateJSON(data) {
    // validate the optional field `profile`
    if (data['profile']) {
      // data not null
      _ResMemberProfile.default.validateJSON(data['profile']);
    }
    return true;
  }
}

/**
 * @member {module:model/ResMemberProfile} profile
 */
MemberProfileGet200Response.prototype['profile'] = undefined;
var _default = MemberProfileGet200Response;
exports.default = _default;

},{"../ApiClient":16,"./ResMemberProfile":105}],82:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _MemberGender = _interopRequireDefault(require("./MemberGender"));
var _MemberInterestsCommittee = _interopRequireDefault(require("./MemberInterestsCommittee"));
var _MemberInterestsIndividual = _interopRequireDefault(require("./MemberInterestsIndividual"));
var _MemberProfileCounty = _interopRequireDefault(require("./MemberProfileCounty"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The MemberProfileUpdateRequest model module.
 * @module model/MemberProfileUpdateRequest
 * @version 0.1.0
 */
class MemberProfileUpdateRequest {
  /**
   * Constructs a new <code>MemberProfileUpdateRequest</code>.
   * @alias module:model/MemberProfileUpdateRequest
   */
  constructor() {
    MemberProfileUpdateRequest.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>MemberProfileUpdateRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MemberProfileUpdateRequest} obj Optional instance to populate.
   * @return {module:model/MemberProfileUpdateRequest} The populated <code>MemberProfileUpdateRequest</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new MemberProfileUpdateRequest();
      if (data.hasOwnProperty('firstName')) {
        obj['firstName'] = _ApiClient.default.convertToType(data['firstName'], 'String');
      }
      if (data.hasOwnProperty('middleName')) {
        obj['middleName'] = _ApiClient.default.convertToType(data['middleName'], 'String');
      }
      if (data.hasOwnProperty('lastName')) {
        obj['lastName'] = _ApiClient.default.convertToType(data['lastName'], 'String');
      }
      if (data.hasOwnProperty('gender')) {
        obj['gender'] = _MemberGender.default.constructFromObject(data['gender']);
      }
      if (data.hasOwnProperty('dob')) {
        obj['dob'] = _ApiClient.default.convertToType(data['dob'], 'Date');
      }
      if (data.hasOwnProperty('deceasedDate')) {
        obj['deceasedDate'] = _ApiClient.default.convertToType(data['deceasedDate'], 'Date');
      }
      if (data.hasOwnProperty('addrLine1')) {
        obj['addrLine1'] = _ApiClient.default.convertToType(data['addrLine1'], 'String');
      }
      if (data.hasOwnProperty('addrLine2')) {
        obj['addrLine2'] = _ApiClient.default.convertToType(data['addrLine2'], 'String');
      }
      if (data.hasOwnProperty('addrCity')) {
        obj['addrCity'] = _ApiClient.default.convertToType(data['addrCity'], 'String');
      }
      if (data.hasOwnProperty('addrState')) {
        obj['addrState'] = _ApiClient.default.convertToType(data['addrState'], 'String');
      }
      if (data.hasOwnProperty('addrZip')) {
        obj['addrZip'] = _ApiClient.default.convertToType(data['addrZip'], 'String');
      }
      if (data.hasOwnProperty('addrCounty')) {
        obj['addrCounty'] = _MemberProfileCounty.default.constructFromObject(data['addrCounty']);
      }
      if (data.hasOwnProperty('phone')) {
        obj['phone'] = _ApiClient.default.convertToType(data['phone'], 'String');
      }
      if (data.hasOwnProperty('emailAlt')) {
        obj['emailAlt'] = _ApiClient.default.convertToType(data['emailAlt'], 'String');
      }
      if (data.hasOwnProperty('isListedDirectory')) {
        obj['isListedDirectory'] = _ApiClient.default.convertToType(data['isListedDirectory'], 'Boolean');
      }
      if (data.hasOwnProperty('isDesignationAmish')) {
        obj['isDesignationAmish'] = _ApiClient.default.convertToType(data['isDesignationAmish'], 'Boolean');
      }
      if (data.hasOwnProperty('proLicense')) {
        obj['proLicense'] = _ApiClient.default.convertToType(data['proLicense'], 'String');
      }
      if (data.hasOwnProperty('companyName')) {
        obj['companyName'] = _ApiClient.default.convertToType(data['companyName'], 'String');
      }
      if (data.hasOwnProperty('interestsCommittee')) {
        obj['interestsCommittee'] = _ApiClient.default.convertToType(data['interestsCommittee'], [_MemberInterestsCommittee.default]);
      }
      if (data.hasOwnProperty('interestsIndividual')) {
        obj['interestsIndividual'] = _ApiClient.default.convertToType(data['interestsIndividual'], [_MemberInterestsIndividual.default]);
      }
      if (data.hasOwnProperty('interestsIndividualOther')) {
        obj['interestsIndividualOther'] = _ApiClient.default.convertToType(data['interestsIndividualOther'], 'String');
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>MemberProfileUpdateRequest</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>MemberProfileUpdateRequest</code>.
   */
  static validateJSON(data) {
    // ensure the json data is a string
    if (data['firstName'] && !(typeof data['firstName'] === 'string' || data['firstName'] instanceof String)) {
      throw new Error("Expected the field `firstName` to be a primitive type in the JSON string but got " + data['firstName']);
    }
    // ensure the json data is a string
    if (data['middleName'] && !(typeof data['middleName'] === 'string' || data['middleName'] instanceof String)) {
      throw new Error("Expected the field `middleName` to be a primitive type in the JSON string but got " + data['middleName']);
    }
    // ensure the json data is a string
    if (data['lastName'] && !(typeof data['lastName'] === 'string' || data['lastName'] instanceof String)) {
      throw new Error("Expected the field `lastName` to be a primitive type in the JSON string but got " + data['lastName']);
    }
    // ensure the json data is a string
    if (data['addrLine1'] && !(typeof data['addrLine1'] === 'string' || data['addrLine1'] instanceof String)) {
      throw new Error("Expected the field `addrLine1` to be a primitive type in the JSON string but got " + data['addrLine1']);
    }
    // ensure the json data is a string
    if (data['addrLine2'] && !(typeof data['addrLine2'] === 'string' || data['addrLine2'] instanceof String)) {
      throw new Error("Expected the field `addrLine2` to be a primitive type in the JSON string but got " + data['addrLine2']);
    }
    // ensure the json data is a string
    if (data['addrCity'] && !(typeof data['addrCity'] === 'string' || data['addrCity'] instanceof String)) {
      throw new Error("Expected the field `addrCity` to be a primitive type in the JSON string but got " + data['addrCity']);
    }
    // ensure the json data is a string
    if (data['addrState'] && !(typeof data['addrState'] === 'string' || data['addrState'] instanceof String)) {
      throw new Error("Expected the field `addrState` to be a primitive type in the JSON string but got " + data['addrState']);
    }
    // ensure the json data is a string
    if (data['addrZip'] && !(typeof data['addrZip'] === 'string' || data['addrZip'] instanceof String)) {
      throw new Error("Expected the field `addrZip` to be a primitive type in the JSON string but got " + data['addrZip']);
    }
    // ensure the json data is a string
    if (data['phone'] && !(typeof data['phone'] === 'string' || data['phone'] instanceof String)) {
      throw new Error("Expected the field `phone` to be a primitive type in the JSON string but got " + data['phone']);
    }
    // ensure the json data is a string
    if (data['emailAlt'] && !(typeof data['emailAlt'] === 'string' || data['emailAlt'] instanceof String)) {
      throw new Error("Expected the field `emailAlt` to be a primitive type in the JSON string but got " + data['emailAlt']);
    }
    // ensure the json data is a string
    if (data['proLicense'] && !(typeof data['proLicense'] === 'string' || data['proLicense'] instanceof String)) {
      throw new Error("Expected the field `proLicense` to be a primitive type in the JSON string but got " + data['proLicense']);
    }
    // ensure the json data is a string
    if (data['companyName'] && !(typeof data['companyName'] === 'string' || data['companyName'] instanceof String)) {
      throw new Error("Expected the field `companyName` to be a primitive type in the JSON string but got " + data['companyName']);
    }
    // ensure the json data is an array
    if (!Array.isArray(data['interestsCommittee'])) {
      throw new Error("Expected the field `interestsCommittee` to be an array in the JSON data but got " + data['interestsCommittee']);
    }
    // ensure the json data is an array
    if (!Array.isArray(data['interestsIndividual'])) {
      throw new Error("Expected the field `interestsIndividual` to be an array in the JSON data but got " + data['interestsIndividual']);
    }
    // ensure the json data is a string
    if (data['interestsIndividualOther'] && !(typeof data['interestsIndividualOther'] === 'string' || data['interestsIndividualOther'] instanceof String)) {
      throw new Error("Expected the field `interestsIndividualOther` to be a primitive type in the JSON string but got " + data['interestsIndividualOther']);
    }
    return true;
  }
}

/**
 * @member {String} firstName
 */
MemberProfileUpdateRequest.prototype['firstName'] = undefined;

/**
 * @member {String} middleName
 */
MemberProfileUpdateRequest.prototype['middleName'] = undefined;

/**
 * @member {String} lastName
 */
MemberProfileUpdateRequest.prototype['lastName'] = undefined;

/**
 * @member {module:model/MemberGender} gender
 */
MemberProfileUpdateRequest.prototype['gender'] = undefined;

/**
 * @member {Date} dob
 */
MemberProfileUpdateRequest.prototype['dob'] = undefined;

/**
 * @member {Date} deceasedDate
 */
MemberProfileUpdateRequest.prototype['deceasedDate'] = undefined;

/**
 * @member {String} addrLine1
 */
MemberProfileUpdateRequest.prototype['addrLine1'] = undefined;

/**
 * @member {String} addrLine2
 */
MemberProfileUpdateRequest.prototype['addrLine2'] = undefined;

/**
 * @member {String} addrCity
 */
MemberProfileUpdateRequest.prototype['addrCity'] = undefined;

/**
 * @member {String} addrState
 */
MemberProfileUpdateRequest.prototype['addrState'] = undefined;

/**
 * @member {String} addrZip
 */
MemberProfileUpdateRequest.prototype['addrZip'] = undefined;

/**
 * @member {module:model/MemberProfileCounty} addrCounty
 */
MemberProfileUpdateRequest.prototype['addrCounty'] = undefined;

/**
 * @member {String} phone
 */
MemberProfileUpdateRequest.prototype['phone'] = undefined;

/**
 * @member {String} emailAlt
 */
MemberProfileUpdateRequest.prototype['emailAlt'] = undefined;

/**
 * @member {Boolean} isListedDirectory
 */
MemberProfileUpdateRequest.prototype['isListedDirectory'] = undefined;

/**
 * @member {Boolean} isDesignationAmish
 */
MemberProfileUpdateRequest.prototype['isDesignationAmish'] = undefined;

/**
 * @member {String} proLicense
 */
MemberProfileUpdateRequest.prototype['proLicense'] = undefined;

/**
 * @member {String} companyName
 */
MemberProfileUpdateRequest.prototype['companyName'] = undefined;

/**
 * @member {Array.<module:model/MemberInterestsCommittee>} interestsCommittee
 */
MemberProfileUpdateRequest.prototype['interestsCommittee'] = undefined;

/**
 * @member {Array.<module:model/MemberInterestsIndividual>} interestsIndividual
 */
MemberProfileUpdateRequest.prototype['interestsIndividual'] = undefined;

/**
 * @member {String} interestsIndividualOther
 */
MemberProfileUpdateRequest.prototype['interestsIndividualOther'] = undefined;
var _default = MemberProfileUpdateRequest;
exports.default = _default;

},{"../ApiClient":16,"./MemberGender":62,"./MemberInterestsCommittee":63,"./MemberInterestsIndividual":64,"./MemberProfileCounty":78}],83:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _ShopPurchaseItemFulfillmentStatus = _interopRequireDefault(require("./ShopPurchaseItemFulfillmentStatus"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The MemberPurchaseItemsFulfillmentStatusUpdateOneRequest model module.
 * @module model/MemberPurchaseItemsFulfillmentStatusUpdateOneRequest
 * @version 0.1.0
 */
class MemberPurchaseItemsFulfillmentStatusUpdateOneRequest {
  /**
   * Constructs a new <code>MemberPurchaseItemsFulfillmentStatusUpdateOneRequest</code>.
   * @alias module:model/MemberPurchaseItemsFulfillmentStatusUpdateOneRequest
   */
  constructor() {
    MemberPurchaseItemsFulfillmentStatusUpdateOneRequest.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>MemberPurchaseItemsFulfillmentStatusUpdateOneRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MemberPurchaseItemsFulfillmentStatusUpdateOneRequest} obj Optional instance to populate.
   * @return {module:model/MemberPurchaseItemsFulfillmentStatusUpdateOneRequest} The populated <code>MemberPurchaseItemsFulfillmentStatusUpdateOneRequest</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new MemberPurchaseItemsFulfillmentStatusUpdateOneRequest();
      if (data.hasOwnProperty('status')) {
        obj['status'] = _ShopPurchaseItemFulfillmentStatus.default.constructFromObject(data['status']);
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>MemberPurchaseItemsFulfillmentStatusUpdateOneRequest</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>MemberPurchaseItemsFulfillmentStatusUpdateOneRequest</code>.
   */
  static validateJSON(data) {
    return true;
  }
}

/**
 * @member {module:model/ShopPurchaseItemFulfillmentStatus} status
 */
MemberPurchaseItemsFulfillmentStatusUpdateOneRequest.prototype['status'] = undefined;
var _default = MemberPurchaseItemsFulfillmentStatusUpdateOneRequest;
exports.default = _default;

},{"../ApiClient":16,"./ShopPurchaseItemFulfillmentStatus":125}],84:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _ResShopPurchaseItem = _interopRequireDefault(require("./ResShopPurchaseItem"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The MemberPurchaseItemsList200Response model module.
 * @module model/MemberPurchaseItemsList200Response
 * @version 0.1.0
 */
class MemberPurchaseItemsList200Response {
  /**
   * Constructs a new <code>MemberPurchaseItemsList200Response</code>.
   * @alias module:model/MemberPurchaseItemsList200Response
   */
  constructor() {
    MemberPurchaseItemsList200Response.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>MemberPurchaseItemsList200Response</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MemberPurchaseItemsList200Response} obj Optional instance to populate.
   * @return {module:model/MemberPurchaseItemsList200Response} The populated <code>MemberPurchaseItemsList200Response</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new MemberPurchaseItemsList200Response();
      if (data.hasOwnProperty('items')) {
        obj['items'] = _ApiClient.default.convertToType(data['items'], [_ResShopPurchaseItem.default]);
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>MemberPurchaseItemsList200Response</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>MemberPurchaseItemsList200Response</code>.
   */
  static validateJSON(data) {
    if (data['items']) {
      // data not null
      // ensure the json data is an array
      if (!Array.isArray(data['items'])) {
        throw new Error("Expected the field `items` to be an array in the JSON data but got " + data['items']);
      }
      // validate the optional field `items` (array)
      for (const item of data['items']) {
        _ResShopPurchaseItem.default.validateJSON(item);
      }
      ;
    }
    return true;
  }
}

/**
 * @member {Array.<module:model/ResShopPurchaseItem>} items
 */
MemberPurchaseItemsList200Response.prototype['items'] = undefined;
var _default = MemberPurchaseItemsList200Response;
exports.default = _default;

},{"../ApiClient":16,"./ResShopPurchaseItem":114}],85:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _ResShopPurchaseItem = _interopRequireDefault(require("./ResShopPurchaseItem"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The MemberPurchaseItemsUpdateOne200Response model module.
 * @module model/MemberPurchaseItemsUpdateOne200Response
 * @version 0.1.0
 */
class MemberPurchaseItemsUpdateOne200Response {
  /**
   * Constructs a new <code>MemberPurchaseItemsUpdateOne200Response</code>.
   * @alias module:model/MemberPurchaseItemsUpdateOne200Response
   */
  constructor() {
    MemberPurchaseItemsUpdateOne200Response.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>MemberPurchaseItemsUpdateOne200Response</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MemberPurchaseItemsUpdateOne200Response} obj Optional instance to populate.
   * @return {module:model/MemberPurchaseItemsUpdateOne200Response} The populated <code>MemberPurchaseItemsUpdateOne200Response</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new MemberPurchaseItemsUpdateOne200Response();
      if (data.hasOwnProperty('purchaseItem')) {
        obj['purchaseItem'] = _ResShopPurchaseItem.default.constructFromObject(data['purchaseItem']);
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>MemberPurchaseItemsUpdateOne200Response</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>MemberPurchaseItemsUpdateOne200Response</code>.
   */
  static validateJSON(data) {
    // validate the optional field `purchaseItem`
    if (data['purchaseItem']) {
      // data not null
      _ResShopPurchaseItem.default.validateJSON(data['purchaseItem']);
    }
    return true;
  }
}

/**
 * @member {module:model/ResShopPurchaseItem} purchaseItem
 */
MemberPurchaseItemsUpdateOne200Response.prototype['purchaseItem'] = undefined;
var _default = MemberPurchaseItemsUpdateOne200Response;
exports.default = _default;

},{"../ApiClient":16,"./ResShopPurchaseItem":114}],86:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The MemberPurchaseItemsUpdateOne409Response model module.
 * @module model/MemberPurchaseItemsUpdateOne409Response
 * @version 0.1.0
 */
class MemberPurchaseItemsUpdateOne409Response {
  /**
   * Constructs a new <code>MemberPurchaseItemsUpdateOne409Response</code>.
   * @alias module:model/MemberPurchaseItemsUpdateOne409Response
   */
  constructor() {
    MemberPurchaseItemsUpdateOne409Response.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>MemberPurchaseItemsUpdateOne409Response</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MemberPurchaseItemsUpdateOne409Response} obj Optional instance to populate.
   * @return {module:model/MemberPurchaseItemsUpdateOne409Response} The populated <code>MemberPurchaseItemsUpdateOne409Response</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new MemberPurchaseItemsUpdateOne409Response();
      if (data.hasOwnProperty('err')) {
        obj['err'] = _ApiClient.default.convertToType(data['err'], 'String');
      }
      if (data.hasOwnProperty('errCode')) {
        obj['errCode'] = _ApiClient.default.convertToType(data['errCode'], 'Number');
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>MemberPurchaseItemsUpdateOne409Response</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>MemberPurchaseItemsUpdateOne409Response</code>.
   */
  static validateJSON(data) {
    // ensure the json data is a string
    if (data['err'] && !(typeof data['err'] === 'string' || data['err'] instanceof String)) {
      throw new Error("Expected the field `err` to be a primitive type in the JSON string but got " + data['err']);
    }
    return true;
  }
}

/**
 * @member {String} err
 */
MemberPurchaseItemsUpdateOne409Response.prototype['err'] = undefined;

/**
 * @member {Number} errCode
 */
MemberPurchaseItemsUpdateOne409Response.prototype['errCode'] = undefined;
var _default = MemberPurchaseItemsUpdateOne409Response;
exports.default = _default;

},{"../ApiClient":16}],87:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The MemberPurchaseItemsUpdateOneRequest model module.
 * @module model/MemberPurchaseItemsUpdateOneRequest
 * @version 0.1.0
 */
class MemberPurchaseItemsUpdateOneRequest {
  /**
   * Constructs a new <code>MemberPurchaseItemsUpdateOneRequest</code>.
   * @alias module:model/MemberPurchaseItemsUpdateOneRequest
   */
  constructor() {
    MemberPurchaseItemsUpdateOneRequest.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>MemberPurchaseItemsUpdateOneRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MemberPurchaseItemsUpdateOneRequest} obj Optional instance to populate.
   * @return {module:model/MemberPurchaseItemsUpdateOneRequest} The populated <code>MemberPurchaseItemsUpdateOneRequest</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new MemberPurchaseItemsUpdateOneRequest();
      if (data.hasOwnProperty('notes')) {
        obj['notes'] = _ApiClient.default.convertToType(data['notes'], 'String');
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>MemberPurchaseItemsUpdateOneRequest</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>MemberPurchaseItemsUpdateOneRequest</code>.
   */
  static validateJSON(data) {
    // ensure the json data is a string
    if (data['notes'] && !(typeof data['notes'] === 'string' || data['notes'] instanceof String)) {
      throw new Error("Expected the field `notes` to be a primitive type in the JSON string but got " + data['notes']);
    }
    return true;
  }
}

/**
 * @member {String} notes
 */
MemberPurchaseItemsUpdateOneRequest.prototype['notes'] = undefined;
var _default = MemberPurchaseItemsUpdateOneRequest;
exports.default = _default;

},{"../ApiClient":16}],88:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
* Enum class MemberRole.
* @enum {}
* @readonly
*/
class MemberRole {
  /**
   * value: "MEMBER"
   * @const
   */
  "MEMBER" = "MEMBER";

  /**
   * value: "RECORDING_SECRETARY"
   * @const
   */
  "RECORDING_SECRETARY" = "RECORDING_SECRETARY";

  /**
   * value: "COORDINATOR"
   * @const
   */
  "COORDINATOR" = "COORDINATOR";

  /**
  * Returns a <code>MemberRole</code> enum value from a Javascript object name.
  * @param {Object} data The plain JavaScript object containing the name of the enum value.
  * @return {module:model/MemberRole} The enum <code>MemberRole</code> value.
  */
  static constructFromObject(object) {
    return object;
  }
}
exports.default = MemberRole;

},{"../ApiClient":16}],89:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
* Enum class MemberStatus.
* @enum {}
* @readonly
*/
class MemberStatus {
  /**
   * value: "PENDING"
   * @const
   */
  "PENDING" = "PENDING";

  /**
   * value: "ACTIVE"
   * @const
   */
  "ACTIVE" = "ACTIVE";

  /**
   * value: "DEACTIVATED"
   * @const
   */
  "DEACTIVATED" = "DEACTIVATED";

  /**
  * Returns a <code>MemberStatus</code> enum value from a Javascript object name.
  * @param {Object} data The plain JavaScript object containing the name of the enum value.
  * @return {module:model/MemberStatus} The enum <code>MemberStatus</code> value.
  */
  static constructFromObject(object) {
    return object;
  }
}
exports.default = MemberStatus;

},{"../ApiClient":16}],90:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _MemberNationalityStatus = _interopRequireDefault(require("./MemberNationalityStatus"));
var _MemberRole = _interopRequireDefault(require("./MemberRole"));
var _MemberStatus = _interopRequireDefault(require("./MemberStatus"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The MemberUpdateRequest model module.
 * @module model/MemberUpdateRequest
 * @version 0.1.0
 */
class MemberUpdateRequest {
  /**
   * Constructs a new <code>MemberUpdateRequest</code>.
   * @alias module:model/MemberUpdateRequest
   */
  constructor() {
    MemberUpdateRequest.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>MemberUpdateRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MemberUpdateRequest} obj Optional instance to populate.
   * @return {module:model/MemberUpdateRequest} The populated <code>MemberUpdateRequest</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new MemberUpdateRequest();
      if (data.hasOwnProperty('role')) {
        obj['role'] = _MemberRole.default.constructFromObject(data['role']);
      }
      if (data.hasOwnProperty('recordingSecretaryEmail')) {
        obj['recordingSecretaryEmail'] = _ApiClient.default.convertToType(data['recordingSecretaryEmail'], 'String');
      }
      if (data.hasOwnProperty('coordinatorEmail')) {
        obj['coordinatorEmail'] = _ApiClient.default.convertToType(data['coordinatorEmail'], 'String');
      }
      if (data.hasOwnProperty('memberStatus')) {
        obj['memberStatus'] = _MemberStatus.default.constructFromObject(data['memberStatus']);
      }
      if (data.hasOwnProperty('nationality')) {
        obj['nationality'] = _ApiClient.default.convertToType(data['nationality'], 'String');
      }
      if (data.hasOwnProperty('nationalityStatus')) {
        obj['nationalityStatus'] = _MemberNationalityStatus.default.constructFromObject(data['nationalityStatus']);
      }
      if (data.hasOwnProperty('credentialCardFee')) {
        obj['credentialCardFee'] = _ApiClient.default.convertToType(data['credentialCardFee'], 'String');
      }
      if (data.hasOwnProperty('trainingCourseFee')) {
        obj['trainingCourseFee'] = _ApiClient.default.convertToType(data['trainingCourseFee'], 'String');
      }
      if (data.hasOwnProperty('donationStateAssembly')) {
        obj['donationStateAssembly'] = _ApiClient.default.convertToType(data['donationStateAssembly'], 'String');
      }
      if (data.hasOwnProperty('donationCountyAssembly')) {
        obj['donationCountyAssembly'] = _ApiClient.default.convertToType(data['donationCountyAssembly'], 'String');
      }
      if (data.hasOwnProperty('donationStateChiefMarshal')) {
        obj['donationStateChiefMarshal'] = _ApiClient.default.convertToType(data['donationStateChiefMarshal'], 'String');
      }
      if (data.hasOwnProperty('donationDesignatedRecipient')) {
        obj['donationDesignatedRecipient'] = _ApiClient.default.convertToType(data['donationDesignatedRecipient'], 'String');
      }
      if (data.hasOwnProperty('donationDesignatedAmount')) {
        obj['donationDesignatedAmount'] = _ApiClient.default.convertToType(data['donationDesignatedAmount'], 'String');
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>MemberUpdateRequest</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>MemberUpdateRequest</code>.
   */
  static validateJSON(data) {
    // ensure the json data is a string
    if (data['recordingSecretaryEmail'] && !(typeof data['recordingSecretaryEmail'] === 'string' || data['recordingSecretaryEmail'] instanceof String)) {
      throw new Error("Expected the field `recordingSecretaryEmail` to be a primitive type in the JSON string but got " + data['recordingSecretaryEmail']);
    }
    // ensure the json data is a string
    if (data['coordinatorEmail'] && !(typeof data['coordinatorEmail'] === 'string' || data['coordinatorEmail'] instanceof String)) {
      throw new Error("Expected the field `coordinatorEmail` to be a primitive type in the JSON string but got " + data['coordinatorEmail']);
    }
    // ensure the json data is a string
    if (data['nationality'] && !(typeof data['nationality'] === 'string' || data['nationality'] instanceof String)) {
      throw new Error("Expected the field `nationality` to be a primitive type in the JSON string but got " + data['nationality']);
    }
    // ensure the json data is a string
    if (data['credentialCardFee'] && !(typeof data['credentialCardFee'] === 'string' || data['credentialCardFee'] instanceof String)) {
      throw new Error("Expected the field `credentialCardFee` to be a primitive type in the JSON string but got " + data['credentialCardFee']);
    }
    // ensure the json data is a string
    if (data['trainingCourseFee'] && !(typeof data['trainingCourseFee'] === 'string' || data['trainingCourseFee'] instanceof String)) {
      throw new Error("Expected the field `trainingCourseFee` to be a primitive type in the JSON string but got " + data['trainingCourseFee']);
    }
    // ensure the json data is a string
    if (data['donationStateAssembly'] && !(typeof data['donationStateAssembly'] === 'string' || data['donationStateAssembly'] instanceof String)) {
      throw new Error("Expected the field `donationStateAssembly` to be a primitive type in the JSON string but got " + data['donationStateAssembly']);
    }
    // ensure the json data is a string
    if (data['donationCountyAssembly'] && !(typeof data['donationCountyAssembly'] === 'string' || data['donationCountyAssembly'] instanceof String)) {
      throw new Error("Expected the field `donationCountyAssembly` to be a primitive type in the JSON string but got " + data['donationCountyAssembly']);
    }
    // ensure the json data is a string
    if (data['donationStateChiefMarshal'] && !(typeof data['donationStateChiefMarshal'] === 'string' || data['donationStateChiefMarshal'] instanceof String)) {
      throw new Error("Expected the field `donationStateChiefMarshal` to be a primitive type in the JSON string but got " + data['donationStateChiefMarshal']);
    }
    // ensure the json data is a string
    if (data['donationDesignatedRecipient'] && !(typeof data['donationDesignatedRecipient'] === 'string' || data['donationDesignatedRecipient'] instanceof String)) {
      throw new Error("Expected the field `donationDesignatedRecipient` to be a primitive type in the JSON string but got " + data['donationDesignatedRecipient']);
    }
    // ensure the json data is a string
    if (data['donationDesignatedAmount'] && !(typeof data['donationDesignatedAmount'] === 'string' || data['donationDesignatedAmount'] instanceof String)) {
      throw new Error("Expected the field `donationDesignatedAmount` to be a primitive type in the JSON string but got " + data['donationDesignatedAmount']);
    }
    return true;
  }
}

/**
 * @member {module:model/MemberRole} role
 */
MemberUpdateRequest.prototype['role'] = undefined;

/**
 * @member {String} recordingSecretaryEmail
 */
MemberUpdateRequest.prototype['recordingSecretaryEmail'] = undefined;

/**
 * @member {String} coordinatorEmail
 */
MemberUpdateRequest.prototype['coordinatorEmail'] = undefined;

/**
 * @member {module:model/MemberStatus} memberStatus
 */
MemberUpdateRequest.prototype['memberStatus'] = undefined;

/**
 * @member {String} nationality
 */
MemberUpdateRequest.prototype['nationality'] = undefined;

/**
 * @member {module:model/MemberNationalityStatus} nationalityStatus
 */
MemberUpdateRequest.prototype['nationalityStatus'] = undefined;

/**
 * @member {String} credentialCardFee
 */
MemberUpdateRequest.prototype['credentialCardFee'] = undefined;

/**
 * @member {String} trainingCourseFee
 */
MemberUpdateRequest.prototype['trainingCourseFee'] = undefined;

/**
 * @member {String} donationStateAssembly
 */
MemberUpdateRequest.prototype['donationStateAssembly'] = undefined;

/**
 * @member {String} donationCountyAssembly
 */
MemberUpdateRequest.prototype['donationCountyAssembly'] = undefined;

/**
 * @member {String} donationStateChiefMarshal
 */
MemberUpdateRequest.prototype['donationStateChiefMarshal'] = undefined;

/**
 * @member {String} donationDesignatedRecipient
 */
MemberUpdateRequest.prototype['donationDesignatedRecipient'] = undefined;

/**
 * @member {String} donationDesignatedAmount
 */
MemberUpdateRequest.prototype['donationDesignatedAmount'] = undefined;
var _default = MemberUpdateRequest;
exports.default = _default;

},{"../ApiClient":16,"./MemberNationalityStatus":65,"./MemberRole":88,"./MemberStatus":89}],91:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _MemberGender = _interopRequireDefault(require("./MemberGender"));
var _MemberProfileCounty = _interopRequireDefault(require("./MemberProfileCounty"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The MembersCreateRequest model module.
 * @module model/MembersCreateRequest
 * @version 0.1.0
 */
class MembersCreateRequest {
  /**
   * Constructs a new <code>MembersCreateRequest</code>.
   * @alias module:model/MembersCreateRequest
   * @param email {String} 
   * @param password {String} 
   * @param passwordConf {String} 
   * @param recordingSecretaryEmail {String} 
   * @param coordinatorEmail {String} 
   * @param firstName {String} 
   * @param lastName {String} 
   * @param gender {module:model/MemberGender} 
   * @param dob {Date} 
   * @param addrLine1 {String} 
   * @param addrCity {String} 
   * @param addrState {String} 
   * @param addrZip {String} 
   * @param addrCounty {module:model/MemberProfileCounty} 
   * @param phone {String} 
   */
  constructor(email, password, passwordConf, recordingSecretaryEmail, coordinatorEmail, firstName, lastName, gender, dob, addrLine1, addrCity, addrState, addrZip, addrCounty, phone) {
    MembersCreateRequest.initialize(this, email, password, passwordConf, recordingSecretaryEmail, coordinatorEmail, firstName, lastName, gender, dob, addrLine1, addrCity, addrState, addrZip, addrCounty, phone);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj, email, password, passwordConf, recordingSecretaryEmail, coordinatorEmail, firstName, lastName, gender, dob, addrLine1, addrCity, addrState, addrZip, addrCounty, phone) {
    obj['email'] = email;
    obj['password'] = password;
    obj['passwordConf'] = passwordConf;
    obj['recordingSecretaryEmail'] = recordingSecretaryEmail;
    obj['coordinatorEmail'] = coordinatorEmail;
    obj['firstName'] = firstName;
    obj['lastName'] = lastName;
    obj['gender'] = gender;
    obj['dob'] = dob;
    obj['addrLine1'] = addrLine1;
    obj['addrCity'] = addrCity;
    obj['addrState'] = addrState;
    obj['addrZip'] = addrZip;
    obj['addrCounty'] = addrCounty;
    obj['phone'] = phone;
  }

  /**
   * Constructs a <code>MembersCreateRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MembersCreateRequest} obj Optional instance to populate.
   * @return {module:model/MembersCreateRequest} The populated <code>MembersCreateRequest</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new MembersCreateRequest();
      if (data.hasOwnProperty('email')) {
        obj['email'] = _ApiClient.default.convertToType(data['email'], 'String');
      }
      if (data.hasOwnProperty('password')) {
        obj['password'] = _ApiClient.default.convertToType(data['password'], 'String');
      }
      if (data.hasOwnProperty('passwordConf')) {
        obj['passwordConf'] = _ApiClient.default.convertToType(data['passwordConf'], 'String');
      }
      if (data.hasOwnProperty('recordingSecretaryEmail')) {
        obj['recordingSecretaryEmail'] = _ApiClient.default.convertToType(data['recordingSecretaryEmail'], 'String');
      }
      if (data.hasOwnProperty('coordinatorEmail')) {
        obj['coordinatorEmail'] = _ApiClient.default.convertToType(data['coordinatorEmail'], 'String');
      }
      if (data.hasOwnProperty('firstName')) {
        obj['firstName'] = _ApiClient.default.convertToType(data['firstName'], 'String');
      }
      if (data.hasOwnProperty('middleName')) {
        obj['middleName'] = _ApiClient.default.convertToType(data['middleName'], 'String');
      }
      if (data.hasOwnProperty('lastName')) {
        obj['lastName'] = _ApiClient.default.convertToType(data['lastName'], 'String');
      }
      if (data.hasOwnProperty('gender')) {
        obj['gender'] = _MemberGender.default.constructFromObject(data['gender']);
      }
      if (data.hasOwnProperty('dob')) {
        obj['dob'] = _ApiClient.default.convertToType(data['dob'], 'Date');
      }
      if (data.hasOwnProperty('addrLine1')) {
        obj['addrLine1'] = _ApiClient.default.convertToType(data['addrLine1'], 'String');
      }
      if (data.hasOwnProperty('addrLine2')) {
        obj['addrLine2'] = _ApiClient.default.convertToType(data['addrLine2'], 'String');
      }
      if (data.hasOwnProperty('addrCity')) {
        obj['addrCity'] = _ApiClient.default.convertToType(data['addrCity'], 'String');
      }
      if (data.hasOwnProperty('addrState')) {
        obj['addrState'] = _ApiClient.default.convertToType(data['addrState'], 'String');
      }
      if (data.hasOwnProperty('addrZip')) {
        obj['addrZip'] = _ApiClient.default.convertToType(data['addrZip'], 'String');
      }
      if (data.hasOwnProperty('addrCounty')) {
        obj['addrCounty'] = _MemberProfileCounty.default.constructFromObject(data['addrCounty']);
      }
      if (data.hasOwnProperty('phone')) {
        obj['phone'] = _ApiClient.default.convertToType(data['phone'], 'String');
      }
      if (data.hasOwnProperty('emailAlt')) {
        obj['emailAlt'] = _ApiClient.default.convertToType(data['emailAlt'], 'String');
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>MembersCreateRequest</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>MembersCreateRequest</code>.
   */
  static validateJSON(data) {
    // check to make sure all required properties are present in the JSON string
    for (const property of MembersCreateRequest.RequiredProperties) {
      if (!data[property]) {
        throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
      }
    }
    // ensure the json data is a string
    if (data['email'] && !(typeof data['email'] === 'string' || data['email'] instanceof String)) {
      throw new Error("Expected the field `email` to be a primitive type in the JSON string but got " + data['email']);
    }
    // ensure the json data is a string
    if (data['password'] && !(typeof data['password'] === 'string' || data['password'] instanceof String)) {
      throw new Error("Expected the field `password` to be a primitive type in the JSON string but got " + data['password']);
    }
    // ensure the json data is a string
    if (data['passwordConf'] && !(typeof data['passwordConf'] === 'string' || data['passwordConf'] instanceof String)) {
      throw new Error("Expected the field `passwordConf` to be a primitive type in the JSON string but got " + data['passwordConf']);
    }
    // ensure the json data is a string
    if (data['recordingSecretaryEmail'] && !(typeof data['recordingSecretaryEmail'] === 'string' || data['recordingSecretaryEmail'] instanceof String)) {
      throw new Error("Expected the field `recordingSecretaryEmail` to be a primitive type in the JSON string but got " + data['recordingSecretaryEmail']);
    }
    // ensure the json data is a string
    if (data['coordinatorEmail'] && !(typeof data['coordinatorEmail'] === 'string' || data['coordinatorEmail'] instanceof String)) {
      throw new Error("Expected the field `coordinatorEmail` to be a primitive type in the JSON string but got " + data['coordinatorEmail']);
    }
    // ensure the json data is a string
    if (data['firstName'] && !(typeof data['firstName'] === 'string' || data['firstName'] instanceof String)) {
      throw new Error("Expected the field `firstName` to be a primitive type in the JSON string but got " + data['firstName']);
    }
    // ensure the json data is a string
    if (data['middleName'] && !(typeof data['middleName'] === 'string' || data['middleName'] instanceof String)) {
      throw new Error("Expected the field `middleName` to be a primitive type in the JSON string but got " + data['middleName']);
    }
    // ensure the json data is a string
    if (data['lastName'] && !(typeof data['lastName'] === 'string' || data['lastName'] instanceof String)) {
      throw new Error("Expected the field `lastName` to be a primitive type in the JSON string but got " + data['lastName']);
    }
    // ensure the json data is a string
    if (data['addrLine1'] && !(typeof data['addrLine1'] === 'string' || data['addrLine1'] instanceof String)) {
      throw new Error("Expected the field `addrLine1` to be a primitive type in the JSON string but got " + data['addrLine1']);
    }
    // ensure the json data is a string
    if (data['addrLine2'] && !(typeof data['addrLine2'] === 'string' || data['addrLine2'] instanceof String)) {
      throw new Error("Expected the field `addrLine2` to be a primitive type in the JSON string but got " + data['addrLine2']);
    }
    // ensure the json data is a string
    if (data['addrCity'] && !(typeof data['addrCity'] === 'string' || data['addrCity'] instanceof String)) {
      throw new Error("Expected the field `addrCity` to be a primitive type in the JSON string but got " + data['addrCity']);
    }
    // ensure the json data is a string
    if (data['addrState'] && !(typeof data['addrState'] === 'string' || data['addrState'] instanceof String)) {
      throw new Error("Expected the field `addrState` to be a primitive type in the JSON string but got " + data['addrState']);
    }
    // ensure the json data is a string
    if (data['addrZip'] && !(typeof data['addrZip'] === 'string' || data['addrZip'] instanceof String)) {
      throw new Error("Expected the field `addrZip` to be a primitive type in the JSON string but got " + data['addrZip']);
    }
    // ensure the json data is a string
    if (data['phone'] && !(typeof data['phone'] === 'string' || data['phone'] instanceof String)) {
      throw new Error("Expected the field `phone` to be a primitive type in the JSON string but got " + data['phone']);
    }
    // ensure the json data is a string
    if (data['emailAlt'] && !(typeof data['emailAlt'] === 'string' || data['emailAlt'] instanceof String)) {
      throw new Error("Expected the field `emailAlt` to be a primitive type in the JSON string but got " + data['emailAlt']);
    }
    return true;
  }
}
MembersCreateRequest.RequiredProperties = ["email", "password", "passwordConf", "recordingSecretaryEmail", "coordinatorEmail", "firstName", "lastName", "gender", "dob", "addrLine1", "addrCity", "addrState", "addrZip", "addrCounty", "phone"];

/**
 * @member {String} email
 */
MembersCreateRequest.prototype['email'] = undefined;

/**
 * @member {String} password
 */
MembersCreateRequest.prototype['password'] = undefined;

/**
 * @member {String} passwordConf
 */
MembersCreateRequest.prototype['passwordConf'] = undefined;

/**
 * @member {String} recordingSecretaryEmail
 */
MembersCreateRequest.prototype['recordingSecretaryEmail'] = undefined;

/**
 * @member {String} coordinatorEmail
 */
MembersCreateRequest.prototype['coordinatorEmail'] = undefined;

/**
 * @member {String} firstName
 */
MembersCreateRequest.prototype['firstName'] = undefined;

/**
 * @member {String} middleName
 */
MembersCreateRequest.prototype['middleName'] = undefined;

/**
 * @member {String} lastName
 */
MembersCreateRequest.prototype['lastName'] = undefined;

/**
 * @member {module:model/MemberGender} gender
 */
MembersCreateRequest.prototype['gender'] = undefined;

/**
 * @member {Date} dob
 */
MembersCreateRequest.prototype['dob'] = undefined;

/**
 * @member {String} addrLine1
 */
MembersCreateRequest.prototype['addrLine1'] = undefined;

/**
 * @member {String} addrLine2
 */
MembersCreateRequest.prototype['addrLine2'] = undefined;

/**
 * @member {String} addrCity
 */
MembersCreateRequest.prototype['addrCity'] = undefined;

/**
 * @member {String} addrState
 */
MembersCreateRequest.prototype['addrState'] = undefined;

/**
 * @member {String} addrZip
 */
MembersCreateRequest.prototype['addrZip'] = undefined;

/**
 * @member {module:model/MemberProfileCounty} addrCounty
 */
MembersCreateRequest.prototype['addrCounty'] = undefined;

/**
 * @member {String} phone
 */
MembersCreateRequest.prototype['phone'] = undefined;

/**
 * @member {String} emailAlt
 */
MembersCreateRequest.prototype['emailAlt'] = undefined;
var _default = MembersCreateRequest;
exports.default = _default;

},{"../ApiClient":16,"./MemberGender":62,"./MemberProfileCounty":78}],92:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The MembersDeleteOne200Response model module.
 * @module model/MembersDeleteOne200Response
 * @version 0.1.0
 */
class MembersDeleteOne200Response {
  /**
   * Constructs a new <code>MembersDeleteOne200Response</code>.
   * @alias module:model/MembersDeleteOne200Response
   */
  constructor() {
    MembersDeleteOne200Response.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>MembersDeleteOne200Response</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MembersDeleteOne200Response} obj Optional instance to populate.
   * @return {module:model/MembersDeleteOne200Response} The populated <code>MembersDeleteOne200Response</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new MembersDeleteOne200Response();
      if (data.hasOwnProperty('msg')) {
        obj['msg'] = _ApiClient.default.convertToType(data['msg'], 'String');
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>MembersDeleteOne200Response</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>MembersDeleteOne200Response</code>.
   */
  static validateJSON(data) {
    // ensure the json data is a string
    if (data['msg'] && !(typeof data['msg'] === 'string' || data['msg'] instanceof String)) {
      throw new Error("Expected the field `msg` to be a primitive type in the JSON string but got " + data['msg']);
    }
    return true;
  }
}

/**
 * @member {String} msg
 */
MembersDeleteOne200Response.prototype['msg'] = undefined;
var _default = MembersDeleteOne200Response;
exports.default = _default;

},{"../ApiClient":16}],93:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _ResMember = _interopRequireDefault(require("./ResMember"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The MembersList200Response model module.
 * @module model/MembersList200Response
 * @version 0.1.0
 */
class MembersList200Response {
  /**
   * Constructs a new <code>MembersList200Response</code>.
   * @alias module:model/MembersList200Response
   */
  constructor() {
    MembersList200Response.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>MembersList200Response</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MembersList200Response} obj Optional instance to populate.
   * @return {module:model/MembersList200Response} The populated <code>MembersList200Response</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new MembersList200Response();
      if (data.hasOwnProperty('members')) {
        obj['members'] = _ApiClient.default.convertToType(data['members'], [_ResMember.default]);
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>MembersList200Response</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>MembersList200Response</code>.
   */
  static validateJSON(data) {
    if (data['members']) {
      // data not null
      // ensure the json data is an array
      if (!Array.isArray(data['members'])) {
        throw new Error("Expected the field `members` to be an array in the JSON data but got " + data['members']);
      }
      // validate the optional field `members` (array)
      for (const item of data['members']) {
        _ResMember.default.validateJSON(item);
      }
      ;
    }
    return true;
  }
}

/**
 * @member {Array.<module:model/ResMember>} members
 */
MembersList200Response.prototype['members'] = undefined;
var _default = MembersList200Response;
exports.default = _default;

},{"../ApiClient":16,"./ResMember":100}],94:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
* Enum class MembershipDocKey.
* @enum {}
* @readonly
*/
class MembershipDocKey {
  /**
   * value: "declarationAmericans"
   * @const
   */
  "declarationAmericans" = "declarationAmericans";

  /**
   * value: "declarationImmigrants"
   * @const
   */
  "declarationImmigrants" = "declarationImmigrants";

  /**
   * value: "declarationFederalPersons"
   * @const
   */
  "declarationFederalPersons" = "declarationFederalPersons";

  /**
   * value: "declarationPoliticalStatus"
   * @const
   */
  "declarationPoliticalStatus" = "declarationPoliticalStatus";

  /**
   * value: "birthRecord"
   * @const
   */
  "birthRecord" = "birthRecord";

  /**
   * value: "witnessTestimony1"
   * @const
   */
  "witnessTestimony1" = "witnessTestimony1";

  /**
   * value: "witnessTestimony2"
   * @const
   */
  "witnessTestimony2" = "witnessTestimony2";

  /**
   * value: "voterCancellation"
   * @const
   */
  "voterCancellation" = "voterCancellation";

  /**
   * value: "revocationTaxes1"
   * @const
   */
  "revocationTaxes1" = "revocationTaxes1";

  /**
   * value: "revocationTaxes2"
   * @const
   */
  "revocationTaxes2" = "revocationTaxes2";

  /**
   * value: "deedReconveyance"
   * @const
   */
  "deedReconveyance" = "deedReconveyance";

  /**
   * value: "certAssumedName"
   * @const
   */
  "certAssumedName" = "certAssumedName";

  /**
   * value: "actExpatriation1"
   * @const
   */
  "actExpatriation1" = "actExpatriation1";

  /**
   * value: "actExpatriation2"
   * @const
   */
  "actExpatriation2" = "actExpatriation2";

  /**
   * value: "actExpatriation3"
   * @const
   */
  "actExpatriation3" = "actExpatriation3";

  /**
   * value: "cancellationPowerAttorney"
   * @const
   */
  "cancellationPowerAttorney" = "cancellationPowerAttorney";

  /**
   * value: "foreignSovereignImmunitiesAct"
   * @const
   */
  "foreignSovereignImmunitiesAct" = "foreignSovereignImmunitiesAct";

  /**
   * value: "dnaParamountClaim"
   * @const
   */
  "dnaParamountClaim" = "dnaParamountClaim";

  /**
   * value: "militarySeverance"
   * @const
   */
  "militarySeverance" = "militarySeverance";

  /**
   * value: "commonCarryDeclaration"
   * @const
   */
  "commonCarryDeclaration" = "commonCarryDeclaration";

  /**
   * value: "feeSchedule"
   * @const
   */
  "feeSchedule" = "feeSchedule";

  /**
   * value: "lineageTreaty"
   * @const
   */
  "lineageTreaty" = "lineageTreaty";

  /**
   * value: "marriageRecord"
   * @const
   */
  "marriageRecord" = "marriageRecord";

  /**
   * value: "babyDeed1"
   * @const
   */
  "babyDeed1" = "babyDeed1";

  /**
   * value: "babyDeed2"
   * @const
   */
  "babyDeed2" = "babyDeed2";

  /**
   * value: "babyDeed3"
   * @const
   */
  "babyDeed3" = "babyDeed3";

  /**
   * value: "babyDeed4"
   * @const
   */
  "babyDeed4" = "babyDeed4";

  /**
   * value: "babyDeed5"
   * @const
   */
  "babyDeed5" = "babyDeed5";

  /**
   * value: "babyDeed6"
   * @const
   */
  "babyDeed6" = "babyDeed6";

  /**
   * value: "babyDeed7"
   * @const
   */
  "babyDeed7" = "babyDeed7";

  /**
   * value: "babyDeed8"
   * @const
   */
  "babyDeed8" = "babyDeed8";

  /**
   * value: "babyDeed9"
   * @const
   */
  "babyDeed9" = "babyDeed9";

  /**
   * value: "deathRecord"
   * @const
   */
  "deathRecord" = "deathRecord";

  /**
   * value: "privateBusinessDocs"
   * @const
   */
  "privateBusinessDocs" = "privateBusinessDocs";

  /**
   * value: "otherDocs"
   * @const
   */
  "otherDocs" = "otherDocs";

  /**
   * value: "miscNoticesDocs"
   * @const
   */
  "miscNoticesDocs" = "miscNoticesDocs";

  /**
   * value: "landPatent1"
   * @const
   */
  "landPatent1" = "landPatent1";

  /**
   * value: "landPatent2"
   * @const
   */
  "landPatent2" = "landPatent2";

  /**
   * value: "landPatent3"
   * @const
   */
  "landPatent3" = "landPatent3";

  /**
   * value: "landPatent4"
   * @const
   */
  "landPatent4" = "landPatent4";

  /**
   * value: "landPatent5"
   * @const
   */
  "landPatent5" = "landPatent5";

  /**
   * value: "territorialGovtDocs"
   * @const
   */
  "territorialGovtDocs" = "territorialGovtDocs";

  /**
   * value: "municipalGovtDocs"
   * @const
   */
  "municipalGovtDocs" = "municipalGovtDocs";

  /**
   * value: "commercialEntityDocs"
   * @const
   */
  "commercialEntityDocs" = "commercialEntityDocs";

  /**
   * value: "commonLawWill"
   * @const
   */
  "commonLawWill" = "commonLawWill";

  /**
  * Returns a <code>MembershipDocKey</code> enum value from a Javascript object name.
  * @param {Object} data The plain JavaScript object containing the name of the enum value.
  * @return {module:model/MembershipDocKey} The enum <code>MembershipDocKey</code> value.
  */
  static constructFromObject(object) {
    return object;
  }
}
exports.default = MembershipDocKey;

},{"../ApiClient":16}],95:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _ResMember = _interopRequireDefault(require("./ResMember"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The MembershipSignup201Response model module.
 * @module model/MembershipSignup201Response
 * @version 0.1.0
 */
class MembershipSignup201Response {
  /**
   * Constructs a new <code>MembershipSignup201Response</code>.
   * @alias module:model/MembershipSignup201Response
   */
  constructor() {
    MembershipSignup201Response.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>MembershipSignup201Response</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MembershipSignup201Response} obj Optional instance to populate.
   * @return {module:model/MembershipSignup201Response} The populated <code>MembershipSignup201Response</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new MembershipSignup201Response();
      if (data.hasOwnProperty('member')) {
        obj['member'] = _ResMember.default.constructFromObject(data['member']);
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>MembershipSignup201Response</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>MembershipSignup201Response</code>.
   */
  static validateJSON(data) {
    // validate the optional field `member`
    if (data['member']) {
      // data not null
      _ResMember.default.validateJSON(data['member']);
    }
    return true;
  }
}

/**
 * @member {module:model/ResMember} member
 */
MembershipSignup201Response.prototype['member'] = undefined;
var _default = MembershipSignup201Response;
exports.default = _default;

},{"../ApiClient":16,"./ResMember":100}],96:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The MembershipSignup409Response model module.
 * @module model/MembershipSignup409Response
 * @version 0.1.0
 */
class MembershipSignup409Response {
  /**
   * Constructs a new <code>MembershipSignup409Response</code>.
   * @alias module:model/MembershipSignup409Response
   */
  constructor() {
    MembershipSignup409Response.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>MembershipSignup409Response</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MembershipSignup409Response} obj Optional instance to populate.
   * @return {module:model/MembershipSignup409Response} The populated <code>MembershipSignup409Response</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new MembershipSignup409Response();
      if (data.hasOwnProperty('err')) {
        obj['err'] = _ApiClient.default.convertToType(data['err'], 'String');
      }
      if (data.hasOwnProperty('errCode')) {
        obj['errCode'] = _ApiClient.default.convertToType(data['errCode'], 'Number');
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>MembershipSignup409Response</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>MembershipSignup409Response</code>.
   */
  static validateJSON(data) {
    // ensure the json data is a string
    if (data['err'] && !(typeof data['err'] === 'string' || data['err'] instanceof String)) {
      throw new Error("Expected the field `err` to be a primitive type in the JSON string but got " + data['err']);
    }
    return true;
  }
}

/**
 * @member {String} err
 */
MembershipSignup409Response.prototype['err'] = undefined;

/**
 * @member {Number} errCode
 */
MembershipSignup409Response.prototype['errCode'] = undefined;
var _default = MembershipSignup409Response;
exports.default = _default;

},{"../ApiClient":16}],97:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _MemberGender = _interopRequireDefault(require("./MemberGender"));
var _MemberProfileCounty = _interopRequireDefault(require("./MemberProfileCounty"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The MembershipSignupRequest model module.
 * @module model/MembershipSignupRequest
 * @version 0.1.0
 */
class MembershipSignupRequest {
  /**
   * Constructs a new <code>MembershipSignupRequest</code>.
   * @alias module:model/MembershipSignupRequest
   * @param captchaResToken {String} 
   * @param email {String} 
   * @param password {String} 
   * @param passwordConf {String} 
   * @param recordingSecretaryEmail {String} 
   * @param coordinatorEmail {String} 
   * @param firstName {String} 
   * @param lastName {String} 
   * @param gender {module:model/MemberGender} 
   * @param dob {Date} 
   * @param addrLine1 {String} 
   * @param addrCity {String} 
   * @param addrState {String} 
   * @param addrZip {String} 
   * @param addrCounty {module:model/MemberProfileCounty} 
   * @param phone {String} 
   */
  constructor(captchaResToken, email, password, passwordConf, recordingSecretaryEmail, coordinatorEmail, firstName, lastName, gender, dob, addrLine1, addrCity, addrState, addrZip, addrCounty, phone) {
    MembershipSignupRequest.initialize(this, captchaResToken, email, password, passwordConf, recordingSecretaryEmail, coordinatorEmail, firstName, lastName, gender, dob, addrLine1, addrCity, addrState, addrZip, addrCounty, phone);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj, captchaResToken, email, password, passwordConf, recordingSecretaryEmail, coordinatorEmail, firstName, lastName, gender, dob, addrLine1, addrCity, addrState, addrZip, addrCounty, phone) {
    obj['captchaResToken'] = captchaResToken;
    obj['email'] = email;
    obj['password'] = password;
    obj['passwordConf'] = passwordConf;
    obj['recordingSecretaryEmail'] = recordingSecretaryEmail;
    obj['coordinatorEmail'] = coordinatorEmail;
    obj['firstName'] = firstName;
    obj['lastName'] = lastName;
    obj['gender'] = gender;
    obj['dob'] = dob;
    obj['addrLine1'] = addrLine1;
    obj['addrCity'] = addrCity;
    obj['addrState'] = addrState;
    obj['addrZip'] = addrZip;
    obj['addrCounty'] = addrCounty;
    obj['phone'] = phone;
  }

  /**
   * Constructs a <code>MembershipSignupRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MembershipSignupRequest} obj Optional instance to populate.
   * @return {module:model/MembershipSignupRequest} The populated <code>MembershipSignupRequest</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new MembershipSignupRequest();
      if (data.hasOwnProperty('captchaResToken')) {
        obj['captchaResToken'] = _ApiClient.default.convertToType(data['captchaResToken'], 'String');
      }
      if (data.hasOwnProperty('email')) {
        obj['email'] = _ApiClient.default.convertToType(data['email'], 'String');
      }
      if (data.hasOwnProperty('password')) {
        obj['password'] = _ApiClient.default.convertToType(data['password'], 'String');
      }
      if (data.hasOwnProperty('passwordConf')) {
        obj['passwordConf'] = _ApiClient.default.convertToType(data['passwordConf'], 'String');
      }
      if (data.hasOwnProperty('recordingSecretaryEmail')) {
        obj['recordingSecretaryEmail'] = _ApiClient.default.convertToType(data['recordingSecretaryEmail'], 'String');
      }
      if (data.hasOwnProperty('coordinatorEmail')) {
        obj['coordinatorEmail'] = _ApiClient.default.convertToType(data['coordinatorEmail'], 'String');
      }
      if (data.hasOwnProperty('firstName')) {
        obj['firstName'] = _ApiClient.default.convertToType(data['firstName'], 'String');
      }
      if (data.hasOwnProperty('middleName')) {
        obj['middleName'] = _ApiClient.default.convertToType(data['middleName'], 'String');
      }
      if (data.hasOwnProperty('lastName')) {
        obj['lastName'] = _ApiClient.default.convertToType(data['lastName'], 'String');
      }
      if (data.hasOwnProperty('gender')) {
        obj['gender'] = _MemberGender.default.constructFromObject(data['gender']);
      }
      if (data.hasOwnProperty('dob')) {
        obj['dob'] = _ApiClient.default.convertToType(data['dob'], 'Date');
      }
      if (data.hasOwnProperty('addrLine1')) {
        obj['addrLine1'] = _ApiClient.default.convertToType(data['addrLine1'], 'String');
      }
      if (data.hasOwnProperty('addrLine2')) {
        obj['addrLine2'] = _ApiClient.default.convertToType(data['addrLine2'], 'String');
      }
      if (data.hasOwnProperty('addrCity')) {
        obj['addrCity'] = _ApiClient.default.convertToType(data['addrCity'], 'String');
      }
      if (data.hasOwnProperty('addrState')) {
        obj['addrState'] = _ApiClient.default.convertToType(data['addrState'], 'String');
      }
      if (data.hasOwnProperty('addrZip')) {
        obj['addrZip'] = _ApiClient.default.convertToType(data['addrZip'], 'String');
      }
      if (data.hasOwnProperty('addrCounty')) {
        obj['addrCounty'] = _MemberProfileCounty.default.constructFromObject(data['addrCounty']);
      }
      if (data.hasOwnProperty('phone')) {
        obj['phone'] = _ApiClient.default.convertToType(data['phone'], 'String');
      }
      if (data.hasOwnProperty('emailAlt')) {
        obj['emailAlt'] = _ApiClient.default.convertToType(data['emailAlt'], 'String');
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>MembershipSignupRequest</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>MembershipSignupRequest</code>.
   */
  static validateJSON(data) {
    // check to make sure all required properties are present in the JSON string
    for (const property of MembershipSignupRequest.RequiredProperties) {
      if (!data[property]) {
        throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
      }
    }
    // ensure the json data is a string
    if (data['captchaResToken'] && !(typeof data['captchaResToken'] === 'string' || data['captchaResToken'] instanceof String)) {
      throw new Error("Expected the field `captchaResToken` to be a primitive type in the JSON string but got " + data['captchaResToken']);
    }
    // ensure the json data is a string
    if (data['email'] && !(typeof data['email'] === 'string' || data['email'] instanceof String)) {
      throw new Error("Expected the field `email` to be a primitive type in the JSON string but got " + data['email']);
    }
    // ensure the json data is a string
    if (data['password'] && !(typeof data['password'] === 'string' || data['password'] instanceof String)) {
      throw new Error("Expected the field `password` to be a primitive type in the JSON string but got " + data['password']);
    }
    // ensure the json data is a string
    if (data['passwordConf'] && !(typeof data['passwordConf'] === 'string' || data['passwordConf'] instanceof String)) {
      throw new Error("Expected the field `passwordConf` to be a primitive type in the JSON string but got " + data['passwordConf']);
    }
    // ensure the json data is a string
    if (data['recordingSecretaryEmail'] && !(typeof data['recordingSecretaryEmail'] === 'string' || data['recordingSecretaryEmail'] instanceof String)) {
      throw new Error("Expected the field `recordingSecretaryEmail` to be a primitive type in the JSON string but got " + data['recordingSecretaryEmail']);
    }
    // ensure the json data is a string
    if (data['coordinatorEmail'] && !(typeof data['coordinatorEmail'] === 'string' || data['coordinatorEmail'] instanceof String)) {
      throw new Error("Expected the field `coordinatorEmail` to be a primitive type in the JSON string but got " + data['coordinatorEmail']);
    }
    // ensure the json data is a string
    if (data['firstName'] && !(typeof data['firstName'] === 'string' || data['firstName'] instanceof String)) {
      throw new Error("Expected the field `firstName` to be a primitive type in the JSON string but got " + data['firstName']);
    }
    // ensure the json data is a string
    if (data['middleName'] && !(typeof data['middleName'] === 'string' || data['middleName'] instanceof String)) {
      throw new Error("Expected the field `middleName` to be a primitive type in the JSON string but got " + data['middleName']);
    }
    // ensure the json data is a string
    if (data['lastName'] && !(typeof data['lastName'] === 'string' || data['lastName'] instanceof String)) {
      throw new Error("Expected the field `lastName` to be a primitive type in the JSON string but got " + data['lastName']);
    }
    // ensure the json data is a string
    if (data['addrLine1'] && !(typeof data['addrLine1'] === 'string' || data['addrLine1'] instanceof String)) {
      throw new Error("Expected the field `addrLine1` to be a primitive type in the JSON string but got " + data['addrLine1']);
    }
    // ensure the json data is a string
    if (data['addrLine2'] && !(typeof data['addrLine2'] === 'string' || data['addrLine2'] instanceof String)) {
      throw new Error("Expected the field `addrLine2` to be a primitive type in the JSON string but got " + data['addrLine2']);
    }
    // ensure the json data is a string
    if (data['addrCity'] && !(typeof data['addrCity'] === 'string' || data['addrCity'] instanceof String)) {
      throw new Error("Expected the field `addrCity` to be a primitive type in the JSON string but got " + data['addrCity']);
    }
    // ensure the json data is a string
    if (data['addrState'] && !(typeof data['addrState'] === 'string' || data['addrState'] instanceof String)) {
      throw new Error("Expected the field `addrState` to be a primitive type in the JSON string but got " + data['addrState']);
    }
    // ensure the json data is a string
    if (data['addrZip'] && !(typeof data['addrZip'] === 'string' || data['addrZip'] instanceof String)) {
      throw new Error("Expected the field `addrZip` to be a primitive type in the JSON string but got " + data['addrZip']);
    }
    // ensure the json data is a string
    if (data['phone'] && !(typeof data['phone'] === 'string' || data['phone'] instanceof String)) {
      throw new Error("Expected the field `phone` to be a primitive type in the JSON string but got " + data['phone']);
    }
    // ensure the json data is a string
    if (data['emailAlt'] && !(typeof data['emailAlt'] === 'string' || data['emailAlt'] instanceof String)) {
      throw new Error("Expected the field `emailAlt` to be a primitive type in the JSON string but got " + data['emailAlt']);
    }
    return true;
  }
}
MembershipSignupRequest.RequiredProperties = ["captchaResToken", "email", "password", "passwordConf", "recordingSecretaryEmail", "coordinatorEmail", "firstName", "lastName", "gender", "dob", "addrLine1", "addrCity", "addrState", "addrZip", "addrCounty", "phone"];

/**
 * @member {String} captchaResToken
 */
MembershipSignupRequest.prototype['captchaResToken'] = undefined;

/**
 * @member {String} email
 */
MembershipSignupRequest.prototype['email'] = undefined;

/**
 * @member {String} password
 */
MembershipSignupRequest.prototype['password'] = undefined;

/**
 * @member {String} passwordConf
 */
MembershipSignupRequest.prototype['passwordConf'] = undefined;

/**
 * @member {String} recordingSecretaryEmail
 */
MembershipSignupRequest.prototype['recordingSecretaryEmail'] = undefined;

/**
 * @member {String} coordinatorEmail
 */
MembershipSignupRequest.prototype['coordinatorEmail'] = undefined;

/**
 * @member {String} firstName
 */
MembershipSignupRequest.prototype['firstName'] = undefined;

/**
 * @member {String} middleName
 */
MembershipSignupRequest.prototype['middleName'] = undefined;

/**
 * @member {String} lastName
 */
MembershipSignupRequest.prototype['lastName'] = undefined;

/**
 * @member {module:model/MemberGender} gender
 */
MembershipSignupRequest.prototype['gender'] = undefined;

/**
 * @member {Date} dob
 */
MembershipSignupRequest.prototype['dob'] = undefined;

/**
 * @member {String} addrLine1
 */
MembershipSignupRequest.prototype['addrLine1'] = undefined;

/**
 * @member {String} addrLine2
 */
MembershipSignupRequest.prototype['addrLine2'] = undefined;

/**
 * @member {String} addrCity
 */
MembershipSignupRequest.prototype['addrCity'] = undefined;

/**
 * @member {String} addrState
 */
MembershipSignupRequest.prototype['addrState'] = undefined;

/**
 * @member {String} addrZip
 */
MembershipSignupRequest.prototype['addrZip'] = undefined;

/**
 * @member {module:model/MemberProfileCounty} addrCounty
 */
MembershipSignupRequest.prototype['addrCounty'] = undefined;

/**
 * @member {String} phone
 */
MembershipSignupRequest.prototype['phone'] = undefined;

/**
 * @member {String} emailAlt
 */
MembershipSignupRequest.prototype['emailAlt'] = undefined;
var _default = MembershipSignupRequest;
exports.default = _default;

},{"../ApiClient":16,"./MemberGender":62,"./MemberProfileCounty":78}],98:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _AuthRole = _interopRequireDefault(require("./AuthRole"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The ResAccount model module.
 * @module model/ResAccount
 * @version 0.1.0
 */
class ResAccount {
  /**
   * Constructs a new <code>ResAccount</code>.
   * @alias module:model/ResAccount
   */
  constructor() {
    ResAccount.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>ResAccount</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ResAccount} obj Optional instance to populate.
   * @return {module:model/ResAccount} The populated <code>ResAccount</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new ResAccount();
      if (data.hasOwnProperty('id')) {
        obj['id'] = _ApiClient.default.convertToType(data['id'], Object);
      }
      if (data.hasOwnProperty('email')) {
        obj['email'] = _ApiClient.default.convertToType(data['email'], Object);
      }
      if (data.hasOwnProperty('role')) {
        obj['role'] = _AuthRole.default.constructFromObject(data['role']);
      }
      if (data.hasOwnProperty('isChangePassword')) {
        obj['isChangePassword'] = _ApiClient.default.convertToType(data['isChangePassword'], 'Boolean');
      }
      if (data.hasOwnProperty('isBlocked')) {
        obj['isBlocked'] = _ApiClient.default.convertToType(data['isBlocked'], 'Boolean');
      }
      if (data.hasOwnProperty('createdAt')) {
        obj['createdAt'] = _ApiClient.default.convertToType(data['createdAt'], Object);
      }
      if (data.hasOwnProperty('updatedAt')) {
        obj['updatedAt'] = _ApiClient.default.convertToType(data['updatedAt'], Object);
      }
      if (data.hasOwnProperty('deletedAt')) {
        obj['deletedAt'] = _ApiClient.default.convertToType(data['deletedAt'], Object);
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>ResAccount</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>ResAccount</code>.
   */
  static validateJSON(data) {
    return true;
  }
}

/**
 * @member {Object} id
 */
ResAccount.prototype['id'] = undefined;

/**
 * @member {Object} email
 */
ResAccount.prototype['email'] = undefined;

/**
 * @member {module:model/AuthRole} role
 */
ResAccount.prototype['role'] = undefined;

/**
 * @member {Boolean} isChangePassword
 */
ResAccount.prototype['isChangePassword'] = undefined;

/**
 * @member {Boolean} isBlocked
 */
ResAccount.prototype['isBlocked'] = undefined;

/**
 * @member {Object} createdAt
 */
ResAccount.prototype['createdAt'] = undefined;

/**
 * @member {Object} updatedAt
 */
ResAccount.prototype['updatedAt'] = undefined;

/**
 * @member {Object} deletedAt
 */
ResAccount.prototype['deletedAt'] = undefined;
var _default = ResAccount;
exports.default = _default;

},{"../ApiClient":16,"./AuthRole":46}],99:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _ResMemberBase = _interopRequireDefault(require("./ResMemberBase"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The ResCredentialCard model module.
 * @module model/ResCredentialCard
 * @version 0.1.0
 */
class ResCredentialCard {
  /**
   * Constructs a new <code>ResCredentialCard</code>.
   * @alias module:model/ResCredentialCard
   */
  constructor() {
    ResCredentialCard.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>ResCredentialCard</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ResCredentialCard} obj Optional instance to populate.
   * @return {module:model/ResCredentialCard} The populated <code>ResCredentialCard</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new ResCredentialCard();
      if (data.hasOwnProperty('id')) {
        obj['id'] = _ApiClient.default.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('purchaseItemId')) {
        obj['purchaseItemId'] = _ApiClient.default.convertToType(data['purchaseItemId'], 'String');
      }
      if (data.hasOwnProperty('recordingNumber')) {
        obj['recordingNumber'] = _ApiClient.default.convertToType(data['recordingNumber'], 'String');
      }
      if (data.hasOwnProperty('masterRecordNumber')) {
        obj['masterRecordNumber'] = _ApiClient.default.convertToType(data['masterRecordNumber'], 'String');
      }
      if (data.hasOwnProperty('printedAt')) {
        obj['printedAt'] = _ApiClient.default.convertToType(data['printedAt'], 'Date');
      }
      if (data.hasOwnProperty('verifiedAt')) {
        obj['verifiedAt'] = _ApiClient.default.convertToType(data['verifiedAt'], 'Date');
      }
      if (data.hasOwnProperty('expirationDate')) {
        obj['expirationDate'] = _ApiClient.default.convertToType(data['expirationDate'], 'Date');
      }
      if (data.hasOwnProperty('createdAt')) {
        obj['createdAt'] = _ApiClient.default.convertToType(data['createdAt'], 'Date');
      }
      if (data.hasOwnProperty('updatedAt')) {
        obj['updatedAt'] = _ApiClient.default.convertToType(data['updatedAt'], 'Date');
      }
      if (data.hasOwnProperty('member')) {
        obj['member'] = _ResMemberBase.default.constructFromObject(data['member']);
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>ResCredentialCard</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>ResCredentialCard</code>.
   */
  static validateJSON(data) {
    // ensure the json data is a string
    if (data['id'] && !(typeof data['id'] === 'string' || data['id'] instanceof String)) {
      throw new Error("Expected the field `id` to be a primitive type in the JSON string but got " + data['id']);
    }
    // ensure the json data is a string
    if (data['purchaseItemId'] && !(typeof data['purchaseItemId'] === 'string' || data['purchaseItemId'] instanceof String)) {
      throw new Error("Expected the field `purchaseItemId` to be a primitive type in the JSON string but got " + data['purchaseItemId']);
    }
    // ensure the json data is a string
    if (data['recordingNumber'] && !(typeof data['recordingNumber'] === 'string' || data['recordingNumber'] instanceof String)) {
      throw new Error("Expected the field `recordingNumber` to be a primitive type in the JSON string but got " + data['recordingNumber']);
    }
    // ensure the json data is a string
    if (data['masterRecordNumber'] && !(typeof data['masterRecordNumber'] === 'string' || data['masterRecordNumber'] instanceof String)) {
      throw new Error("Expected the field `masterRecordNumber` to be a primitive type in the JSON string but got " + data['masterRecordNumber']);
    }
    // validate the optional field `member`
    if (data['member']) {
      // data not null
      _ResMemberBase.default.validateJSON(data['member']);
    }
    return true;
  }
}

/**
 * @member {String} id
 */
ResCredentialCard.prototype['id'] = undefined;

/**
 * @member {String} purchaseItemId
 */
ResCredentialCard.prototype['purchaseItemId'] = undefined;

/**
 * @member {String} recordingNumber
 */
ResCredentialCard.prototype['recordingNumber'] = undefined;

/**
 * @member {String} masterRecordNumber
 */
ResCredentialCard.prototype['masterRecordNumber'] = undefined;

/**
 * @member {Date} printedAt
 */
ResCredentialCard.prototype['printedAt'] = undefined;

/**
 * @member {Date} verifiedAt
 */
ResCredentialCard.prototype['verifiedAt'] = undefined;

/**
 * @member {Date} expirationDate
 */
ResCredentialCard.prototype['expirationDate'] = undefined;

/**
 * @member {Date} createdAt
 */
ResCredentialCard.prototype['createdAt'] = undefined;

/**
 * @member {Date} updatedAt
 */
ResCredentialCard.prototype['updatedAt'] = undefined;

/**
 * @member {module:model/ResMemberBase} member
 */
ResCredentialCard.prototype['member'] = undefined;
var _default = ResCredentialCard;
exports.default = _default;

},{"../ApiClient":16,"./ResMemberBase":101}],100:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _DirectoryListing = _interopRequireDefault(require("./DirectoryListing"));
var _MemberRole = _interopRequireDefault(require("./MemberRole"));
var _ResMemberBase = _interopRequireDefault(require("./ResMemberBase"));
var _ResMemberBaseNationality = _interopRequireDefault(require("./ResMemberBaseNationality"));
var _ResMemberFeesDonations = _interopRequireDefault(require("./ResMemberFeesDonations"));
var _ResMemberProfile = _interopRequireDefault(require("./ResMemberProfile"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The ResMember model module.
 * @module model/ResMember
 * @version 0.1.0
 */
class ResMember {
  /**
   * Constructs a new <code>ResMember</code>.
   * @alias module:model/ResMember
   * @implements module:model/ResMemberBase
   * @implements module:model/ResMemberFeesDonations
   */
  constructor() {
    _ResMemberBase.default.initialize(this);
    _ResMemberFeesDonations.default.initialize(this);
    ResMember.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>ResMember</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ResMember} obj Optional instance to populate.
   * @return {module:model/ResMember} The populated <code>ResMember</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new ResMember();
      _ResMemberBase.default.constructFromObject(data, obj);
      _ResMemberFeesDonations.default.constructFromObject(data, obj);
      if (data.hasOwnProperty('id')) {
        obj['id'] = _ApiClient.default.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('email')) {
        obj['email'] = _ApiClient.default.convertToType(data['email'], 'String');
      }
      if (data.hasOwnProperty('role')) {
        obj['role'] = _MemberRole.default.constructFromObject(data['role']);
      }
      if (data.hasOwnProperty('coordinator')) {
        obj['coordinator'] = _DirectoryListing.default.constructFromObject(data['coordinator']);
      }
      if (data.hasOwnProperty('recordingSecretary')) {
        obj['recordingSecretary'] = _DirectoryListing.default.constructFromObject(data['recordingSecretary']);
      }
      if (data.hasOwnProperty('nationality')) {
        obj['nationality'] = _ResMemberBaseNationality.default.constructFromObject(data['nationality']);
      }
      if (data.hasOwnProperty('profile')) {
        obj['profile'] = _ResMemberProfile.default.constructFromObject(data['profile']);
      }
      if (data.hasOwnProperty('credentialCardFee')) {
        obj['credentialCardFee'] = _ApiClient.default.convertToType(data['credentialCardFee'], 'String');
      }
      if (data.hasOwnProperty('trainingCourseFee')) {
        obj['trainingCourseFee'] = _ApiClient.default.convertToType(data['trainingCourseFee'], 'String');
      }
      if (data.hasOwnProperty('donationStateAssembly')) {
        obj['donationStateAssembly'] = _ApiClient.default.convertToType(data['donationStateAssembly'], 'String');
      }
      if (data.hasOwnProperty('donationCountyAssembly')) {
        obj['donationCountyAssembly'] = _ApiClient.default.convertToType(data['donationCountyAssembly'], 'String');
      }
      if (data.hasOwnProperty('donationStateChiefMarshal')) {
        obj['donationStateChiefMarshal'] = _ApiClient.default.convertToType(data['donationStateChiefMarshal'], 'String');
      }
      if (data.hasOwnProperty('donationDesignatedRecipient')) {
        obj['donationDesignatedRecipient'] = _ApiClient.default.convertToType(data['donationDesignatedRecipient'], 'String');
      }
      if (data.hasOwnProperty('donationDesignatedAmount')) {
        obj['donationDesignatedAmount'] = _ApiClient.default.convertToType(data['donationDesignatedAmount'], 'String');
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>ResMember</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>ResMember</code>.
   */
  static validateJSON(data) {
    // ensure the json data is a string
    if (data['id'] && !(typeof data['id'] === 'string' || data['id'] instanceof String)) {
      throw new Error("Expected the field `id` to be a primitive type in the JSON string but got " + data['id']);
    }
    // ensure the json data is a string
    if (data['email'] && !(typeof data['email'] === 'string' || data['email'] instanceof String)) {
      throw new Error("Expected the field `email` to be a primitive type in the JSON string but got " + data['email']);
    }
    // validate the optional field `coordinator`
    if (data['coordinator']) {
      // data not null
      _DirectoryListing.default.validateJSON(data['coordinator']);
    }
    // validate the optional field `recordingSecretary`
    if (data['recordingSecretary']) {
      // data not null
      _DirectoryListing.default.validateJSON(data['recordingSecretary']);
    }
    // validate the optional field `nationality`
    if (data['nationality']) {
      // data not null
      _ResMemberBaseNationality.default.validateJSON(data['nationality']);
    }
    // validate the optional field `profile`
    if (data['profile']) {
      // data not null
      _ResMemberProfile.default.validateJSON(data['profile']);
    }
    // ensure the json data is a string
    if (data['credentialCardFee'] && !(typeof data['credentialCardFee'] === 'string' || data['credentialCardFee'] instanceof String)) {
      throw new Error("Expected the field `credentialCardFee` to be a primitive type in the JSON string but got " + data['credentialCardFee']);
    }
    // ensure the json data is a string
    if (data['trainingCourseFee'] && !(typeof data['trainingCourseFee'] === 'string' || data['trainingCourseFee'] instanceof String)) {
      throw new Error("Expected the field `trainingCourseFee` to be a primitive type in the JSON string but got " + data['trainingCourseFee']);
    }
    // ensure the json data is a string
    if (data['donationStateAssembly'] && !(typeof data['donationStateAssembly'] === 'string' || data['donationStateAssembly'] instanceof String)) {
      throw new Error("Expected the field `donationStateAssembly` to be a primitive type in the JSON string but got " + data['donationStateAssembly']);
    }
    // ensure the json data is a string
    if (data['donationCountyAssembly'] && !(typeof data['donationCountyAssembly'] === 'string' || data['donationCountyAssembly'] instanceof String)) {
      throw new Error("Expected the field `donationCountyAssembly` to be a primitive type in the JSON string but got " + data['donationCountyAssembly']);
    }
    // ensure the json data is a string
    if (data['donationStateChiefMarshal'] && !(typeof data['donationStateChiefMarshal'] === 'string' || data['donationStateChiefMarshal'] instanceof String)) {
      throw new Error("Expected the field `donationStateChiefMarshal` to be a primitive type in the JSON string but got " + data['donationStateChiefMarshal']);
    }
    // ensure the json data is a string
    if (data['donationDesignatedRecipient'] && !(typeof data['donationDesignatedRecipient'] === 'string' || data['donationDesignatedRecipient'] instanceof String)) {
      throw new Error("Expected the field `donationDesignatedRecipient` to be a primitive type in the JSON string but got " + data['donationDesignatedRecipient']);
    }
    // ensure the json data is a string
    if (data['donationDesignatedAmount'] && !(typeof data['donationDesignatedAmount'] === 'string' || data['donationDesignatedAmount'] instanceof String)) {
      throw new Error("Expected the field `donationDesignatedAmount` to be a primitive type in the JSON string but got " + data['donationDesignatedAmount']);
    }
    return true;
  }
}

/**
 * @member {String} id
 */
ResMember.prototype['id'] = undefined;

/**
 * @member {String} email
 */
ResMember.prototype['email'] = undefined;

/**
 * @member {module:model/MemberRole} role
 */
ResMember.prototype['role'] = undefined;

/**
 * @member {module:model/DirectoryListing} coordinator
 */
ResMember.prototype['coordinator'] = undefined;

/**
 * @member {module:model/DirectoryListing} recordingSecretary
 */
ResMember.prototype['recordingSecretary'] = undefined;

/**
 * @member {module:model/ResMemberBaseNationality} nationality
 */
ResMember.prototype['nationality'] = undefined;

/**
 * @member {module:model/ResMemberProfile} profile
 */
ResMember.prototype['profile'] = undefined;

/**
 * @member {String} credentialCardFee
 */
ResMember.prototype['credentialCardFee'] = undefined;

/**
 * @member {String} trainingCourseFee
 */
ResMember.prototype['trainingCourseFee'] = undefined;

/**
 * @member {String} donationStateAssembly
 */
ResMember.prototype['donationStateAssembly'] = undefined;

/**
 * @member {String} donationCountyAssembly
 */
ResMember.prototype['donationCountyAssembly'] = undefined;

/**
 * @member {String} donationStateChiefMarshal
 */
ResMember.prototype['donationStateChiefMarshal'] = undefined;

/**
 * @member {String} donationDesignatedRecipient
 */
ResMember.prototype['donationDesignatedRecipient'] = undefined;

/**
 * @member {String} donationDesignatedAmount
 */
ResMember.prototype['donationDesignatedAmount'] = undefined;

// Implement ResMemberBase interface:
/**
 * @member {String} id
 */
_ResMemberBase.default.prototype['id'] = undefined;
/**
 * @member {String} email
 */
_ResMemberBase.default.prototype['email'] = undefined;
/**
 * @member {module:model/MemberRole} role
 */
_ResMemberBase.default.prototype['role'] = undefined;
/**
 * @member {module:model/DirectoryListing} coordinator
 */
_ResMemberBase.default.prototype['coordinator'] = undefined;
/**
 * @member {module:model/DirectoryListing} recordingSecretary
 */
_ResMemberBase.default.prototype['recordingSecretary'] = undefined;
/**
 * @member {module:model/ResMemberBaseNationality} nationality
 */
_ResMemberBase.default.prototype['nationality'] = undefined;
/**
 * @member {module:model/ResMemberProfile} profile
 */
_ResMemberBase.default.prototype['profile'] = undefined;
// Implement ResMemberFeesDonations interface:
/**
 * @member {String} credentialCardFee
 */
_ResMemberFeesDonations.default.prototype['credentialCardFee'] = undefined;
/**
 * @member {String} trainingCourseFee
 */
_ResMemberFeesDonations.default.prototype['trainingCourseFee'] = undefined;
/**
 * @member {String} donationStateAssembly
 */
_ResMemberFeesDonations.default.prototype['donationStateAssembly'] = undefined;
/**
 * @member {String} donationCountyAssembly
 */
_ResMemberFeesDonations.default.prototype['donationCountyAssembly'] = undefined;
/**
 * @member {String} donationStateChiefMarshal
 */
_ResMemberFeesDonations.default.prototype['donationStateChiefMarshal'] = undefined;
/**
 * @member {String} donationDesignatedRecipient
 */
_ResMemberFeesDonations.default.prototype['donationDesignatedRecipient'] = undefined;
/**
 * @member {String} donationDesignatedAmount
 */
_ResMemberFeesDonations.default.prototype['donationDesignatedAmount'] = undefined;
var _default = ResMember;
exports.default = _default;

},{"../ApiClient":16,"./DirectoryListing":49,"./MemberRole":88,"./ResMemberBase":101,"./ResMemberBaseNationality":102,"./ResMemberFeesDonations":104,"./ResMemberProfile":105}],101:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _DirectoryListing = _interopRequireDefault(require("./DirectoryListing"));
var _MemberRole = _interopRequireDefault(require("./MemberRole"));
var _ResMemberBaseNationality = _interopRequireDefault(require("./ResMemberBaseNationality"));
var _ResMemberProfile = _interopRequireDefault(require("./ResMemberProfile"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The ResMemberBase model module.
 * @module model/ResMemberBase
 * @version 0.1.0
 */
class ResMemberBase {
  /**
   * Constructs a new <code>ResMemberBase</code>.
   * @alias module:model/ResMemberBase
   */
  constructor() {
    ResMemberBase.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>ResMemberBase</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ResMemberBase} obj Optional instance to populate.
   * @return {module:model/ResMemberBase} The populated <code>ResMemberBase</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new ResMemberBase();
      if (data.hasOwnProperty('id')) {
        obj['id'] = _ApiClient.default.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('email')) {
        obj['email'] = _ApiClient.default.convertToType(data['email'], 'String');
      }
      if (data.hasOwnProperty('role')) {
        obj['role'] = _MemberRole.default.constructFromObject(data['role']);
      }
      if (data.hasOwnProperty('coordinator')) {
        obj['coordinator'] = _DirectoryListing.default.constructFromObject(data['coordinator']);
      }
      if (data.hasOwnProperty('recordingSecretary')) {
        obj['recordingSecretary'] = _DirectoryListing.default.constructFromObject(data['recordingSecretary']);
      }
      if (data.hasOwnProperty('nationality')) {
        obj['nationality'] = _ResMemberBaseNationality.default.constructFromObject(data['nationality']);
      }
      if (data.hasOwnProperty('profile')) {
        obj['profile'] = _ResMemberProfile.default.constructFromObject(data['profile']);
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>ResMemberBase</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>ResMemberBase</code>.
   */
  static validateJSON(data) {
    // ensure the json data is a string
    if (data['id'] && !(typeof data['id'] === 'string' || data['id'] instanceof String)) {
      throw new Error("Expected the field `id` to be a primitive type in the JSON string but got " + data['id']);
    }
    // ensure the json data is a string
    if (data['email'] && !(typeof data['email'] === 'string' || data['email'] instanceof String)) {
      throw new Error("Expected the field `email` to be a primitive type in the JSON string but got " + data['email']);
    }
    // validate the optional field `coordinator`
    if (data['coordinator']) {
      // data not null
      _DirectoryListing.default.validateJSON(data['coordinator']);
    }
    // validate the optional field `recordingSecretary`
    if (data['recordingSecretary']) {
      // data not null
      _DirectoryListing.default.validateJSON(data['recordingSecretary']);
    }
    // validate the optional field `nationality`
    if (data['nationality']) {
      // data not null
      _ResMemberBaseNationality.default.validateJSON(data['nationality']);
    }
    // validate the optional field `profile`
    if (data['profile']) {
      // data not null
      _ResMemberProfile.default.validateJSON(data['profile']);
    }
    return true;
  }
}

/**
 * @member {String} id
 */
ResMemberBase.prototype['id'] = undefined;

/**
 * @member {String} email
 */
ResMemberBase.prototype['email'] = undefined;

/**
 * @member {module:model/MemberRole} role
 */
ResMemberBase.prototype['role'] = undefined;

/**
 * @member {module:model/DirectoryListing} coordinator
 */
ResMemberBase.prototype['coordinator'] = undefined;

/**
 * @member {module:model/DirectoryListing} recordingSecretary
 */
ResMemberBase.prototype['recordingSecretary'] = undefined;

/**
 * @member {module:model/ResMemberBaseNationality} nationality
 */
ResMemberBase.prototype['nationality'] = undefined;

/**
 * @member {module:model/ResMemberProfile} profile
 */
ResMemberBase.prototype['profile'] = undefined;
var _default = ResMemberBase;
exports.default = _default;

},{"../ApiClient":16,"./DirectoryListing":49,"./MemberRole":88,"./ResMemberBaseNationality":102,"./ResMemberProfile":105}],102:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _MemberNationalityStatus = _interopRequireDefault(require("./MemberNationalityStatus"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The ResMemberBaseNationality model module.
 * @module model/ResMemberBaseNationality
 * @version 0.1.0
 */
class ResMemberBaseNationality {
  /**
   * Constructs a new <code>ResMemberBaseNationality</code>.
   * @alias module:model/ResMemberBaseNationality
   */
  constructor() {
    ResMemberBaseNationality.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>ResMemberBaseNationality</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ResMemberBaseNationality} obj Optional instance to populate.
   * @return {module:model/ResMemberBaseNationality} The populated <code>ResMemberBaseNationality</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new ResMemberBaseNationality();
      if (data.hasOwnProperty('value')) {
        obj['value'] = _ApiClient.default.convertToType(data['value'], 'String');
      }
      if (data.hasOwnProperty('status')) {
        obj['status'] = _MemberNationalityStatus.default.constructFromObject(data['status']);
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>ResMemberBaseNationality</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>ResMemberBaseNationality</code>.
   */
  static validateJSON(data) {
    // ensure the json data is a string
    if (data['value'] && !(typeof data['value'] === 'string' || data['value'] instanceof String)) {
      throw new Error("Expected the field `value` to be a primitive type in the JSON string but got " + data['value']);
    }
    return true;
  }
}

/**
 * @member {String} value
 */
ResMemberBaseNationality.prototype['value'] = undefined;

/**
 * @member {module:model/MemberNationalityStatus} status
 */
ResMemberBaseNationality.prototype['status'] = undefined;
var _default = ResMemberBaseNationality;
exports.default = _default;

},{"../ApiClient":16,"./MemberNationalityStatus":65}],103:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The ResMemberDoc model module.
 * @module model/ResMemberDoc
 * @version 0.1.0
 */
class ResMemberDoc {
  /**
   * Constructs a new <code>ResMemberDoc</code>.
   * @alias module:model/ResMemberDoc
   */
  constructor() {
    ResMemberDoc.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>ResMemberDoc</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ResMemberDoc} obj Optional instance to populate.
   * @return {module:model/ResMemberDoc} The populated <code>ResMemberDoc</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new ResMemberDoc();
      if (data.hasOwnProperty('id')) {
        obj['id'] = _ApiClient.default.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('ownerId')) {
        obj['ownerId'] = _ApiClient.default.convertToType(data['ownerId'], 'String');
      }
      if (data.hasOwnProperty('name')) {
        obj['name'] = _ApiClient.default.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('signedUrl')) {
        obj['signedUrl'] = _ApiClient.default.convertToType(data['signedUrl'], 'String');
      }
      if (data.hasOwnProperty('sizeMb')) {
        obj['sizeMb'] = _ApiClient.default.convertToType(data['sizeMb'], 'Number');
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>ResMemberDoc</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>ResMemberDoc</code>.
   */
  static validateJSON(data) {
    // ensure the json data is a string
    if (data['id'] && !(typeof data['id'] === 'string' || data['id'] instanceof String)) {
      throw new Error("Expected the field `id` to be a primitive type in the JSON string but got " + data['id']);
    }
    // ensure the json data is a string
    if (data['ownerId'] && !(typeof data['ownerId'] === 'string' || data['ownerId'] instanceof String)) {
      throw new Error("Expected the field `ownerId` to be a primitive type in the JSON string but got " + data['ownerId']);
    }
    // ensure the json data is a string
    if (data['name'] && !(typeof data['name'] === 'string' || data['name'] instanceof String)) {
      throw new Error("Expected the field `name` to be a primitive type in the JSON string but got " + data['name']);
    }
    // ensure the json data is a string
    if (data['signedUrl'] && !(typeof data['signedUrl'] === 'string' || data['signedUrl'] instanceof String)) {
      throw new Error("Expected the field `signedUrl` to be a primitive type in the JSON string but got " + data['signedUrl']);
    }
    // ensure the json data is a string
    if (data['sizeMb'] && !(typeof data['sizeMb'] === 'string' || data['sizeMb'] instanceof String)) {
      throw new Error("Expected the field `sizeMb` to be a primitive type in the JSON string but got " + data['sizeMb']);
    }
    return true;
  }
}

/**
 * @member {String} id
 */
ResMemberDoc.prototype['id'] = undefined;

/**
 * @member {String} ownerId
 */
ResMemberDoc.prototype['ownerId'] = undefined;

/**
 * @member {String} name
 */
ResMemberDoc.prototype['name'] = undefined;

/**
 * @member {String} signedUrl
 */
ResMemberDoc.prototype['signedUrl'] = undefined;

/**
 * @member {Number} sizeMb
 */
ResMemberDoc.prototype['sizeMb'] = undefined;
var _default = ResMemberDoc;
exports.default = _default;

},{"../ApiClient":16}],104:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The ResMemberFeesDonations model module.
 * @module model/ResMemberFeesDonations
 * @version 0.1.0
 */
class ResMemberFeesDonations {
  /**
   * Constructs a new <code>ResMemberFeesDonations</code>.
   * @alias module:model/ResMemberFeesDonations
   */
  constructor() {
    ResMemberFeesDonations.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>ResMemberFeesDonations</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ResMemberFeesDonations} obj Optional instance to populate.
   * @return {module:model/ResMemberFeesDonations} The populated <code>ResMemberFeesDonations</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new ResMemberFeesDonations();
      if (data.hasOwnProperty('credentialCardFee')) {
        obj['credentialCardFee'] = _ApiClient.default.convertToType(data['credentialCardFee'], 'String');
      }
      if (data.hasOwnProperty('trainingCourseFee')) {
        obj['trainingCourseFee'] = _ApiClient.default.convertToType(data['trainingCourseFee'], 'String');
      }
      if (data.hasOwnProperty('donationStateAssembly')) {
        obj['donationStateAssembly'] = _ApiClient.default.convertToType(data['donationStateAssembly'], 'String');
      }
      if (data.hasOwnProperty('donationCountyAssembly')) {
        obj['donationCountyAssembly'] = _ApiClient.default.convertToType(data['donationCountyAssembly'], 'String');
      }
      if (data.hasOwnProperty('donationStateChiefMarshal')) {
        obj['donationStateChiefMarshal'] = _ApiClient.default.convertToType(data['donationStateChiefMarshal'], 'String');
      }
      if (data.hasOwnProperty('donationDesignatedRecipient')) {
        obj['donationDesignatedRecipient'] = _ApiClient.default.convertToType(data['donationDesignatedRecipient'], 'String');
      }
      if (data.hasOwnProperty('donationDesignatedAmount')) {
        obj['donationDesignatedAmount'] = _ApiClient.default.convertToType(data['donationDesignatedAmount'], 'String');
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>ResMemberFeesDonations</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>ResMemberFeesDonations</code>.
   */
  static validateJSON(data) {
    // ensure the json data is a string
    if (data['credentialCardFee'] && !(typeof data['credentialCardFee'] === 'string' || data['credentialCardFee'] instanceof String)) {
      throw new Error("Expected the field `credentialCardFee` to be a primitive type in the JSON string but got " + data['credentialCardFee']);
    }
    // ensure the json data is a string
    if (data['trainingCourseFee'] && !(typeof data['trainingCourseFee'] === 'string' || data['trainingCourseFee'] instanceof String)) {
      throw new Error("Expected the field `trainingCourseFee` to be a primitive type in the JSON string but got " + data['trainingCourseFee']);
    }
    // ensure the json data is a string
    if (data['donationStateAssembly'] && !(typeof data['donationStateAssembly'] === 'string' || data['donationStateAssembly'] instanceof String)) {
      throw new Error("Expected the field `donationStateAssembly` to be a primitive type in the JSON string but got " + data['donationStateAssembly']);
    }
    // ensure the json data is a string
    if (data['donationCountyAssembly'] && !(typeof data['donationCountyAssembly'] === 'string' || data['donationCountyAssembly'] instanceof String)) {
      throw new Error("Expected the field `donationCountyAssembly` to be a primitive type in the JSON string but got " + data['donationCountyAssembly']);
    }
    // ensure the json data is a string
    if (data['donationStateChiefMarshal'] && !(typeof data['donationStateChiefMarshal'] === 'string' || data['donationStateChiefMarshal'] instanceof String)) {
      throw new Error("Expected the field `donationStateChiefMarshal` to be a primitive type in the JSON string but got " + data['donationStateChiefMarshal']);
    }
    // ensure the json data is a string
    if (data['donationDesignatedRecipient'] && !(typeof data['donationDesignatedRecipient'] === 'string' || data['donationDesignatedRecipient'] instanceof String)) {
      throw new Error("Expected the field `donationDesignatedRecipient` to be a primitive type in the JSON string but got " + data['donationDesignatedRecipient']);
    }
    // ensure the json data is a string
    if (data['donationDesignatedAmount'] && !(typeof data['donationDesignatedAmount'] === 'string' || data['donationDesignatedAmount'] instanceof String)) {
      throw new Error("Expected the field `donationDesignatedAmount` to be a primitive type in the JSON string but got " + data['donationDesignatedAmount']);
    }
    return true;
  }
}

/**
 * @member {String} credentialCardFee
 */
ResMemberFeesDonations.prototype['credentialCardFee'] = undefined;

/**
 * @member {String} trainingCourseFee
 */
ResMemberFeesDonations.prototype['trainingCourseFee'] = undefined;

/**
 * @member {String} donationStateAssembly
 */
ResMemberFeesDonations.prototype['donationStateAssembly'] = undefined;

/**
 * @member {String} donationCountyAssembly
 */
ResMemberFeesDonations.prototype['donationCountyAssembly'] = undefined;

/**
 * @member {String} donationStateChiefMarshal
 */
ResMemberFeesDonations.prototype['donationStateChiefMarshal'] = undefined;

/**
 * @member {String} donationDesignatedRecipient
 */
ResMemberFeesDonations.prototype['donationDesignatedRecipient'] = undefined;

/**
 * @member {String} donationDesignatedAmount
 */
ResMemberFeesDonations.prototype['donationDesignatedAmount'] = undefined;
var _default = ResMemberFeesDonations;
exports.default = _default;

},{"../ApiClient":16}],105:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _MemberGender = _interopRequireDefault(require("./MemberGender"));
var _MemberInterestsCommittee = _interopRequireDefault(require("./MemberInterestsCommittee"));
var _MemberInterestsIndividual = _interopRequireDefault(require("./MemberInterestsIndividual"));
var _MemberProfileCounty = _interopRequireDefault(require("./MemberProfileCounty"));
var _ResMemberProfileDocs = _interopRequireDefault(require("./ResMemberProfileDocs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The ResMemberProfile model module.
 * @module model/ResMemberProfile
 * @version 0.1.0
 */
class ResMemberProfile {
  /**
   * Constructs a new <code>ResMemberProfile</code>.
   * @alias module:model/ResMemberProfile
   */
  constructor() {
    ResMemberProfile.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>ResMemberProfile</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ResMemberProfile} obj Optional instance to populate.
   * @return {module:model/ResMemberProfile} The populated <code>ResMemberProfile</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new ResMemberProfile();
      if (data.hasOwnProperty('firstName')) {
        obj['firstName'] = _ApiClient.default.convertToType(data['firstName'], 'String');
      }
      if (data.hasOwnProperty('middleName')) {
        obj['middleName'] = _ApiClient.default.convertToType(data['middleName'], 'String');
      }
      if (data.hasOwnProperty('lastName')) {
        obj['lastName'] = _ApiClient.default.convertToType(data['lastName'], 'String');
      }
      if (data.hasOwnProperty('gender')) {
        obj['gender'] = _MemberGender.default.constructFromObject(data['gender']);
      }
      if (data.hasOwnProperty('displayGender')) {
        obj['displayGender'] = _ApiClient.default.convertToType(data['displayGender'], 'String');
      }
      if (data.hasOwnProperty('dob')) {
        obj['dob'] = _ApiClient.default.convertToType(data['dob'], 'Date');
      }
      if (data.hasOwnProperty('deceasedDate')) {
        obj['deceasedDate'] = _ApiClient.default.convertToType(data['deceasedDate'], 'Date');
      }
      if (data.hasOwnProperty('addrLine1')) {
        obj['addrLine1'] = _ApiClient.default.convertToType(data['addrLine1'], 'String');
      }
      if (data.hasOwnProperty('addrLine2')) {
        obj['addrLine2'] = _ApiClient.default.convertToType(data['addrLine2'], 'String');
      }
      if (data.hasOwnProperty('addrCity')) {
        obj['addrCity'] = _ApiClient.default.convertToType(data['addrCity'], 'String');
      }
      if (data.hasOwnProperty('addrState')) {
        obj['addrState'] = _ApiClient.default.convertToType(data['addrState'], 'String');
      }
      if (data.hasOwnProperty('addrZip')) {
        obj['addrZip'] = _ApiClient.default.convertToType(data['addrZip'], 'String');
      }
      if (data.hasOwnProperty('addrCounty')) {
        obj['addrCounty'] = _MemberProfileCounty.default.constructFromObject(data['addrCounty']);
      }
      if (data.hasOwnProperty('phone')) {
        obj['phone'] = _ApiClient.default.convertToType(data['phone'], 'String');
      }
      if (data.hasOwnProperty('emailAlt')) {
        obj['emailAlt'] = _ApiClient.default.convertToType(data['emailAlt'], 'String');
      }
      if (data.hasOwnProperty('isListedDirectory')) {
        obj['isListedDirectory'] = _ApiClient.default.convertToType(data['isListedDirectory'], 'Boolean');
      }
      if (data.hasOwnProperty('isDesignationAmish')) {
        obj['isDesignationAmish'] = _ApiClient.default.convertToType(data['isDesignationAmish'], 'Boolean');
      }
      if (data.hasOwnProperty('proLicense')) {
        obj['proLicense'] = _ApiClient.default.convertToType(data['proLicense'], 'String');
      }
      if (data.hasOwnProperty('companyName')) {
        obj['companyName'] = _ApiClient.default.convertToType(data['companyName'], 'String');
      }
      if (data.hasOwnProperty('interestsCommittee')) {
        obj['interestsCommittee'] = _ApiClient.default.convertToType(data['interestsCommittee'], [_MemberInterestsCommittee.default]);
      }
      if (data.hasOwnProperty('interestsIndividual')) {
        obj['interestsIndividual'] = _ApiClient.default.convertToType(data['interestsIndividual'], [_MemberInterestsIndividual.default]);
      }
      if (data.hasOwnProperty('interestsIndividualOther')) {
        obj['interestsIndividualOther'] = _ApiClient.default.convertToType(data['interestsIndividualOther'], 'String');
      }
      if (data.hasOwnProperty('docs')) {
        obj['docs'] = _ResMemberProfileDocs.default.constructFromObject(data['docs']);
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>ResMemberProfile</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>ResMemberProfile</code>.
   */
  static validateJSON(data) {
    // ensure the json data is a string
    if (data['firstName'] && !(typeof data['firstName'] === 'string' || data['firstName'] instanceof String)) {
      throw new Error("Expected the field `firstName` to be a primitive type in the JSON string but got " + data['firstName']);
    }
    // ensure the json data is a string
    if (data['middleName'] && !(typeof data['middleName'] === 'string' || data['middleName'] instanceof String)) {
      throw new Error("Expected the field `middleName` to be a primitive type in the JSON string but got " + data['middleName']);
    }
    // ensure the json data is a string
    if (data['lastName'] && !(typeof data['lastName'] === 'string' || data['lastName'] instanceof String)) {
      throw new Error("Expected the field `lastName` to be a primitive type in the JSON string but got " + data['lastName']);
    }
    // ensure the json data is a string
    if (data['displayGender'] && !(typeof data['displayGender'] === 'string' || data['displayGender'] instanceof String)) {
      throw new Error("Expected the field `displayGender` to be a primitive type in the JSON string but got " + data['displayGender']);
    }
    // ensure the json data is a string
    if (data['addrLine1'] && !(typeof data['addrLine1'] === 'string' || data['addrLine1'] instanceof String)) {
      throw new Error("Expected the field `addrLine1` to be a primitive type in the JSON string but got " + data['addrLine1']);
    }
    // ensure the json data is a string
    if (data['addrLine2'] && !(typeof data['addrLine2'] === 'string' || data['addrLine2'] instanceof String)) {
      throw new Error("Expected the field `addrLine2` to be a primitive type in the JSON string but got " + data['addrLine2']);
    }
    // ensure the json data is a string
    if (data['addrCity'] && !(typeof data['addrCity'] === 'string' || data['addrCity'] instanceof String)) {
      throw new Error("Expected the field `addrCity` to be a primitive type in the JSON string but got " + data['addrCity']);
    }
    // ensure the json data is a string
    if (data['addrState'] && !(typeof data['addrState'] === 'string' || data['addrState'] instanceof String)) {
      throw new Error("Expected the field `addrState` to be a primitive type in the JSON string but got " + data['addrState']);
    }
    // ensure the json data is a string
    if (data['addrZip'] && !(typeof data['addrZip'] === 'string' || data['addrZip'] instanceof String)) {
      throw new Error("Expected the field `addrZip` to be a primitive type in the JSON string but got " + data['addrZip']);
    }
    // ensure the json data is a string
    if (data['phone'] && !(typeof data['phone'] === 'string' || data['phone'] instanceof String)) {
      throw new Error("Expected the field `phone` to be a primitive type in the JSON string but got " + data['phone']);
    }
    // ensure the json data is a string
    if (data['emailAlt'] && !(typeof data['emailAlt'] === 'string' || data['emailAlt'] instanceof String)) {
      throw new Error("Expected the field `emailAlt` to be a primitive type in the JSON string but got " + data['emailAlt']);
    }
    // ensure the json data is a string
    if (data['proLicense'] && !(typeof data['proLicense'] === 'string' || data['proLicense'] instanceof String)) {
      throw new Error("Expected the field `proLicense` to be a primitive type in the JSON string but got " + data['proLicense']);
    }
    // ensure the json data is a string
    if (data['companyName'] && !(typeof data['companyName'] === 'string' || data['companyName'] instanceof String)) {
      throw new Error("Expected the field `companyName` to be a primitive type in the JSON string but got " + data['companyName']);
    }
    // ensure the json data is an array
    if (!Array.isArray(data['interestsCommittee'])) {
      throw new Error("Expected the field `interestsCommittee` to be an array in the JSON data but got " + data['interestsCommittee']);
    }
    // ensure the json data is an array
    if (!Array.isArray(data['interestsIndividual'])) {
      throw new Error("Expected the field `interestsIndividual` to be an array in the JSON data but got " + data['interestsIndividual']);
    }
    // ensure the json data is a string
    if (data['interestsIndividualOther'] && !(typeof data['interestsIndividualOther'] === 'string' || data['interestsIndividualOther'] instanceof String)) {
      throw new Error("Expected the field `interestsIndividualOther` to be a primitive type in the JSON string but got " + data['interestsIndividualOther']);
    }
    // validate the optional field `docs`
    if (data['docs']) {
      // data not null
      _ResMemberProfileDocs.default.validateJSON(data['docs']);
    }
    return true;
  }
}

/**
 * @member {String} firstName
 */
ResMemberProfile.prototype['firstName'] = undefined;

/**
 * @member {String} middleName
 */
ResMemberProfile.prototype['middleName'] = undefined;

/**
 * @member {String} lastName
 */
ResMemberProfile.prototype['lastName'] = undefined;

/**
 * @member {module:model/MemberGender} gender
 */
ResMemberProfile.prototype['gender'] = undefined;

/**
 * @member {String} displayGender
 */
ResMemberProfile.prototype['displayGender'] = undefined;

/**
 * @member {Date} dob
 */
ResMemberProfile.prototype['dob'] = undefined;

/**
 * @member {Date} deceasedDate
 */
ResMemberProfile.prototype['deceasedDate'] = undefined;

/**
 * @member {String} addrLine1
 */
ResMemberProfile.prototype['addrLine1'] = undefined;

/**
 * @member {String} addrLine2
 */
ResMemberProfile.prototype['addrLine2'] = undefined;

/**
 * @member {String} addrCity
 */
ResMemberProfile.prototype['addrCity'] = undefined;

/**
 * @member {String} addrState
 */
ResMemberProfile.prototype['addrState'] = undefined;

/**
 * @member {String} addrZip
 */
ResMemberProfile.prototype['addrZip'] = undefined;

/**
 * @member {module:model/MemberProfileCounty} addrCounty
 */
ResMemberProfile.prototype['addrCounty'] = undefined;

/**
 * @member {String} phone
 */
ResMemberProfile.prototype['phone'] = undefined;

/**
 * @member {String} emailAlt
 */
ResMemberProfile.prototype['emailAlt'] = undefined;

/**
 * @member {Boolean} isListedDirectory
 */
ResMemberProfile.prototype['isListedDirectory'] = undefined;

/**
 * @member {Boolean} isDesignationAmish
 */
ResMemberProfile.prototype['isDesignationAmish'] = undefined;

/**
 * @member {String} proLicense
 */
ResMemberProfile.prototype['proLicense'] = undefined;

/**
 * @member {String} companyName
 */
ResMemberProfile.prototype['companyName'] = undefined;

/**
 * @member {Array.<module:model/MemberInterestsCommittee>} interestsCommittee
 */
ResMemberProfile.prototype['interestsCommittee'] = undefined;

/**
 * @member {Array.<module:model/MemberInterestsIndividual>} interestsIndividual
 */
ResMemberProfile.prototype['interestsIndividual'] = undefined;

/**
 * @member {String} interestsIndividualOther
 */
ResMemberProfile.prototype['interestsIndividualOther'] = undefined;

/**
 * @member {module:model/ResMemberProfileDocs} docs
 */
ResMemberProfile.prototype['docs'] = undefined;
var _default = ResMemberProfile;
exports.default = _default;

},{"../ApiClient":16,"./MemberGender":62,"./MemberInterestsCommittee":63,"./MemberInterestsIndividual":64,"./MemberProfileCounty":78,"./ResMemberProfileDocs":106}],106:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _ResMemberDoc = _interopRequireDefault(require("./ResMemberDoc"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The ResMemberProfileDocs model module.
 * @module model/ResMemberProfileDocs
 * @version 0.1.0
 */
class ResMemberProfileDocs {
  /**
   * Constructs a new <code>ResMemberProfileDocs</code>.
   * @alias module:model/ResMemberProfileDocs
   */
  constructor() {
    ResMemberProfileDocs.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>ResMemberProfileDocs</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ResMemberProfileDocs} obj Optional instance to populate.
   * @return {module:model/ResMemberProfileDocs} The populated <code>ResMemberProfileDocs</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new ResMemberProfileDocs();
      if (data.hasOwnProperty('imagePhoto')) {
        obj['imagePhoto'] = _ResMemberDoc.default.constructFromObject(data['imagePhoto']);
      }
      if (data.hasOwnProperty('imageSeal')) {
        obj['imageSeal'] = _ResMemberDoc.default.constructFromObject(data['imageSeal']);
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>ResMemberProfileDocs</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>ResMemberProfileDocs</code>.
   */
  static validateJSON(data) {
    // validate the optional field `imagePhoto`
    if (data['imagePhoto']) {
      // data not null
      _ResMemberDoc.default.validateJSON(data['imagePhoto']);
    }
    // validate the optional field `imageSeal`
    if (data['imageSeal']) {
      // data not null
      _ResMemberDoc.default.validateJSON(data['imageSeal']);
    }
    return true;
  }
}

/**
 * @member {module:model/ResMemberDoc} imagePhoto
 */
ResMemberProfileDocs.prototype['imagePhoto'] = undefined;

/**
 * @member {module:model/ResMemberDoc} imageSeal
 */
ResMemberProfileDocs.prototype['imageSeal'] = undefined;
var _default = ResMemberProfileDocs;
exports.default = _default;

},{"../ApiClient":16,"./ResMemberDoc":103}],107:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _ResMemberDoc = _interopRequireDefault(require("./ResMemberDoc"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The ResMembershipDocs model module.
 * @module model/ResMembershipDocs
 * @version 0.1.0
 */
class ResMembershipDocs {
  /**
   * Constructs a new <code>ResMembershipDocs</code>.
   * @alias module:model/ResMembershipDocs
   */
  constructor() {
    ResMembershipDocs.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>ResMembershipDocs</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ResMembershipDocs} obj Optional instance to populate.
   * @return {module:model/ResMembershipDocs} The populated <code>ResMembershipDocs</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new ResMembershipDocs();
      if (data.hasOwnProperty('declarationAmericans')) {
        obj['declarationAmericans'] = _ResMemberDoc.default.constructFromObject(data['declarationAmericans']);
      }
      if (data.hasOwnProperty('declarationImmigrants')) {
        obj['declarationImmigrants'] = _ResMemberDoc.default.constructFromObject(data['declarationImmigrants']);
      }
      if (data.hasOwnProperty('declarationFederalPersons')) {
        obj['declarationFederalPersons'] = _ResMemberDoc.default.constructFromObject(data['declarationFederalPersons']);
      }
      if (data.hasOwnProperty('declarationPoliticalStatus')) {
        obj['declarationPoliticalStatus'] = _ResMemberDoc.default.constructFromObject(data['declarationPoliticalStatus']);
      }
      if (data.hasOwnProperty('birthRecord')) {
        obj['birthRecord'] = _ResMemberDoc.default.constructFromObject(data['birthRecord']);
      }
      if (data.hasOwnProperty('witnessTestimony1')) {
        obj['witnessTestimony1'] = _ResMemberDoc.default.constructFromObject(data['witnessTestimony1']);
      }
      if (data.hasOwnProperty('witnessTestimony2')) {
        obj['witnessTestimony2'] = _ResMemberDoc.default.constructFromObject(data['witnessTestimony2']);
      }
      if (data.hasOwnProperty('voterCancellation')) {
        obj['voterCancellation'] = _ResMemberDoc.default.constructFromObject(data['voterCancellation']);
      }
      if (data.hasOwnProperty('revocationTaxes1')) {
        obj['revocationTaxes1'] = _ResMemberDoc.default.constructFromObject(data['revocationTaxes1']);
      }
      if (data.hasOwnProperty('revocationTaxes2')) {
        obj['revocationTaxes2'] = _ResMemberDoc.default.constructFromObject(data['revocationTaxes2']);
      }
      if (data.hasOwnProperty('deedReconveyance')) {
        obj['deedReconveyance'] = _ResMemberDoc.default.constructFromObject(data['deedReconveyance']);
      }
      if (data.hasOwnProperty('certAssumedName')) {
        obj['certAssumedName'] = _ResMemberDoc.default.constructFromObject(data['certAssumedName']);
      }
      if (data.hasOwnProperty('actExpatriation1')) {
        obj['actExpatriation1'] = _ResMemberDoc.default.constructFromObject(data['actExpatriation1']);
      }
      if (data.hasOwnProperty('actExpatriation2')) {
        obj['actExpatriation2'] = _ResMemberDoc.default.constructFromObject(data['actExpatriation2']);
      }
      if (data.hasOwnProperty('actExpatriation3')) {
        obj['actExpatriation3'] = _ResMemberDoc.default.constructFromObject(data['actExpatriation3']);
      }
      if (data.hasOwnProperty('cancellationPowerAttorney')) {
        obj['cancellationPowerAttorney'] = _ResMemberDoc.default.constructFromObject(data['cancellationPowerAttorney']);
      }
      if (data.hasOwnProperty('foreignSovereignImmunitiesAct')) {
        obj['foreignSovereignImmunitiesAct'] = _ResMemberDoc.default.constructFromObject(data['foreignSovereignImmunitiesAct']);
      }
      if (data.hasOwnProperty('dnaParamountClaim')) {
        obj['dnaParamountClaim'] = _ResMemberDoc.default.constructFromObject(data['dnaParamountClaim']);
      }
      if (data.hasOwnProperty('militarySeverance')) {
        obj['militarySeverance'] = _ResMemberDoc.default.constructFromObject(data['militarySeverance']);
      }
      if (data.hasOwnProperty('commonCarryDeclaration')) {
        obj['commonCarryDeclaration'] = _ResMemberDoc.default.constructFromObject(data['commonCarryDeclaration']);
      }
      if (data.hasOwnProperty('feeSchedule')) {
        obj['feeSchedule'] = _ResMemberDoc.default.constructFromObject(data['feeSchedule']);
      }
      if (data.hasOwnProperty('lineageTreaty')) {
        obj['lineageTreaty'] = _ResMemberDoc.default.constructFromObject(data['lineageTreaty']);
      }
      if (data.hasOwnProperty('marriageRecord')) {
        obj['marriageRecord'] = _ResMemberDoc.default.constructFromObject(data['marriageRecord']);
      }
      if (data.hasOwnProperty('babyDeed1')) {
        obj['babyDeed1'] = _ResMemberDoc.default.constructFromObject(data['babyDeed1']);
      }
      if (data.hasOwnProperty('babyDeed2')) {
        obj['babyDeed2'] = _ResMemberDoc.default.constructFromObject(data['babyDeed2']);
      }
      if (data.hasOwnProperty('babyDeed3')) {
        obj['babyDeed3'] = _ResMemberDoc.default.constructFromObject(data['babyDeed3']);
      }
      if (data.hasOwnProperty('babyDeed4')) {
        obj['babyDeed4'] = _ResMemberDoc.default.constructFromObject(data['babyDeed4']);
      }
      if (data.hasOwnProperty('babyDeed5')) {
        obj['babyDeed5'] = _ResMemberDoc.default.constructFromObject(data['babyDeed5']);
      }
      if (data.hasOwnProperty('babyDeed6')) {
        obj['babyDeed6'] = _ResMemberDoc.default.constructFromObject(data['babyDeed6']);
      }
      if (data.hasOwnProperty('babyDeed7')) {
        obj['babyDeed7'] = _ResMemberDoc.default.constructFromObject(data['babyDeed7']);
      }
      if (data.hasOwnProperty('babyDeed8')) {
        obj['babyDeed8'] = _ResMemberDoc.default.constructFromObject(data['babyDeed8']);
      }
      if (data.hasOwnProperty('babyDeed9')) {
        obj['babyDeed9'] = _ResMemberDoc.default.constructFromObject(data['babyDeed9']);
      }
      if (data.hasOwnProperty('deathRecord')) {
        obj['deathRecord'] = _ResMemberDoc.default.constructFromObject(data['deathRecord']);
      }
      if (data.hasOwnProperty('privateBusinessDocs')) {
        obj['privateBusinessDocs'] = _ApiClient.default.convertToType(data['privateBusinessDocs'], [_ResMemberDoc.default]);
      }
      if (data.hasOwnProperty('otherDocs')) {
        obj['otherDocs'] = _ApiClient.default.convertToType(data['otherDocs'], [_ResMemberDoc.default]);
      }
      if (data.hasOwnProperty('miscNoticesDocs')) {
        obj['miscNoticesDocs'] = _ApiClient.default.convertToType(data['miscNoticesDocs'], [_ResMemberDoc.default]);
      }
      if (data.hasOwnProperty('landPatent1')) {
        obj['landPatent1'] = _ResMemberDoc.default.constructFromObject(data['landPatent1']);
      }
      if (data.hasOwnProperty('landPatent2')) {
        obj['landPatent2'] = _ResMemberDoc.default.constructFromObject(data['landPatent2']);
      }
      if (data.hasOwnProperty('landPatent3')) {
        obj['landPatent3'] = _ResMemberDoc.default.constructFromObject(data['landPatent3']);
      }
      if (data.hasOwnProperty('landPatent4')) {
        obj['landPatent4'] = _ResMemberDoc.default.constructFromObject(data['landPatent4']);
      }
      if (data.hasOwnProperty('landPatent5')) {
        obj['landPatent5'] = _ResMemberDoc.default.constructFromObject(data['landPatent5']);
      }
      if (data.hasOwnProperty('territorialGovtDocs')) {
        obj['territorialGovtDocs'] = _ApiClient.default.convertToType(data['territorialGovtDocs'], [_ResMemberDoc.default]);
      }
      if (data.hasOwnProperty('municipalGovtDocs')) {
        obj['municipalGovtDocs'] = _ApiClient.default.convertToType(data['municipalGovtDocs'], [_ResMemberDoc.default]);
      }
      if (data.hasOwnProperty('commercialEntityDocs')) {
        obj['commercialEntityDocs'] = _ApiClient.default.convertToType(data['commercialEntityDocs'], [_ResMemberDoc.default]);
      }
      if (data.hasOwnProperty('commonLawWill')) {
        obj['commonLawWill'] = _ResMemberDoc.default.constructFromObject(data['commonLawWill']);
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>ResMembershipDocs</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>ResMembershipDocs</code>.
   */
  static validateJSON(data) {
    // validate the optional field `declarationAmericans`
    if (data['declarationAmericans']) {
      // data not null
      _ResMemberDoc.default.validateJSON(data['declarationAmericans']);
    }
    // validate the optional field `declarationImmigrants`
    if (data['declarationImmigrants']) {
      // data not null
      _ResMemberDoc.default.validateJSON(data['declarationImmigrants']);
    }
    // validate the optional field `declarationFederalPersons`
    if (data['declarationFederalPersons']) {
      // data not null
      _ResMemberDoc.default.validateJSON(data['declarationFederalPersons']);
    }
    // validate the optional field `declarationPoliticalStatus`
    if (data['declarationPoliticalStatus']) {
      // data not null
      _ResMemberDoc.default.validateJSON(data['declarationPoliticalStatus']);
    }
    // validate the optional field `birthRecord`
    if (data['birthRecord']) {
      // data not null
      _ResMemberDoc.default.validateJSON(data['birthRecord']);
    }
    // validate the optional field `witnessTestimony1`
    if (data['witnessTestimony1']) {
      // data not null
      _ResMemberDoc.default.validateJSON(data['witnessTestimony1']);
    }
    // validate the optional field `witnessTestimony2`
    if (data['witnessTestimony2']) {
      // data not null
      _ResMemberDoc.default.validateJSON(data['witnessTestimony2']);
    }
    // validate the optional field `voterCancellation`
    if (data['voterCancellation']) {
      // data not null
      _ResMemberDoc.default.validateJSON(data['voterCancellation']);
    }
    // validate the optional field `revocationTaxes1`
    if (data['revocationTaxes1']) {
      // data not null
      _ResMemberDoc.default.validateJSON(data['revocationTaxes1']);
    }
    // validate the optional field `revocationTaxes2`
    if (data['revocationTaxes2']) {
      // data not null
      _ResMemberDoc.default.validateJSON(data['revocationTaxes2']);
    }
    // validate the optional field `deedReconveyance`
    if (data['deedReconveyance']) {
      // data not null
      _ResMemberDoc.default.validateJSON(data['deedReconveyance']);
    }
    // validate the optional field `certAssumedName`
    if (data['certAssumedName']) {
      // data not null
      _ResMemberDoc.default.validateJSON(data['certAssumedName']);
    }
    // validate the optional field `actExpatriation1`
    if (data['actExpatriation1']) {
      // data not null
      _ResMemberDoc.default.validateJSON(data['actExpatriation1']);
    }
    // validate the optional field `actExpatriation2`
    if (data['actExpatriation2']) {
      // data not null
      _ResMemberDoc.default.validateJSON(data['actExpatriation2']);
    }
    // validate the optional field `actExpatriation3`
    if (data['actExpatriation3']) {
      // data not null
      _ResMemberDoc.default.validateJSON(data['actExpatriation3']);
    }
    // validate the optional field `cancellationPowerAttorney`
    if (data['cancellationPowerAttorney']) {
      // data not null
      _ResMemberDoc.default.validateJSON(data['cancellationPowerAttorney']);
    }
    // validate the optional field `foreignSovereignImmunitiesAct`
    if (data['foreignSovereignImmunitiesAct']) {
      // data not null
      _ResMemberDoc.default.validateJSON(data['foreignSovereignImmunitiesAct']);
    }
    // validate the optional field `dnaParamountClaim`
    if (data['dnaParamountClaim']) {
      // data not null
      _ResMemberDoc.default.validateJSON(data['dnaParamountClaim']);
    }
    // validate the optional field `militarySeverance`
    if (data['militarySeverance']) {
      // data not null
      _ResMemberDoc.default.validateJSON(data['militarySeverance']);
    }
    // validate the optional field `commonCarryDeclaration`
    if (data['commonCarryDeclaration']) {
      // data not null
      _ResMemberDoc.default.validateJSON(data['commonCarryDeclaration']);
    }
    // validate the optional field `feeSchedule`
    if (data['feeSchedule']) {
      // data not null
      _ResMemberDoc.default.validateJSON(data['feeSchedule']);
    }
    // validate the optional field `lineageTreaty`
    if (data['lineageTreaty']) {
      // data not null
      _ResMemberDoc.default.validateJSON(data['lineageTreaty']);
    }
    // validate the optional field `marriageRecord`
    if (data['marriageRecord']) {
      // data not null
      _ResMemberDoc.default.validateJSON(data['marriageRecord']);
    }
    // validate the optional field `babyDeed1`
    if (data['babyDeed1']) {
      // data not null
      _ResMemberDoc.default.validateJSON(data['babyDeed1']);
    }
    // validate the optional field `babyDeed2`
    if (data['babyDeed2']) {
      // data not null
      _ResMemberDoc.default.validateJSON(data['babyDeed2']);
    }
    // validate the optional field `babyDeed3`
    if (data['babyDeed3']) {
      // data not null
      _ResMemberDoc.default.validateJSON(data['babyDeed3']);
    }
    // validate the optional field `babyDeed4`
    if (data['babyDeed4']) {
      // data not null
      _ResMemberDoc.default.validateJSON(data['babyDeed4']);
    }
    // validate the optional field `babyDeed5`
    if (data['babyDeed5']) {
      // data not null
      _ResMemberDoc.default.validateJSON(data['babyDeed5']);
    }
    // validate the optional field `babyDeed6`
    if (data['babyDeed6']) {
      // data not null
      _ResMemberDoc.default.validateJSON(data['babyDeed6']);
    }
    // validate the optional field `babyDeed7`
    if (data['babyDeed7']) {
      // data not null
      _ResMemberDoc.default.validateJSON(data['babyDeed7']);
    }
    // validate the optional field `babyDeed8`
    if (data['babyDeed8']) {
      // data not null
      _ResMemberDoc.default.validateJSON(data['babyDeed8']);
    }
    // validate the optional field `babyDeed9`
    if (data['babyDeed9']) {
      // data not null
      _ResMemberDoc.default.validateJSON(data['babyDeed9']);
    }
    // validate the optional field `deathRecord`
    if (data['deathRecord']) {
      // data not null
      _ResMemberDoc.default.validateJSON(data['deathRecord']);
    }
    if (data['privateBusinessDocs']) {
      // data not null
      // ensure the json data is an array
      if (!Array.isArray(data['privateBusinessDocs'])) {
        throw new Error("Expected the field `privateBusinessDocs` to be an array in the JSON data but got " + data['privateBusinessDocs']);
      }
      // validate the optional field `privateBusinessDocs` (array)
      for (const item of data['privateBusinessDocs']) {
        _ResMemberDoc.default.validateJSON(item);
      }
      ;
    }
    if (data['otherDocs']) {
      // data not null
      // ensure the json data is an array
      if (!Array.isArray(data['otherDocs'])) {
        throw new Error("Expected the field `otherDocs` to be an array in the JSON data but got " + data['otherDocs']);
      }
      // validate the optional field `otherDocs` (array)
      for (const item of data['otherDocs']) {
        _ResMemberDoc.default.validateJSON(item);
      }
      ;
    }
    if (data['miscNoticesDocs']) {
      // data not null
      // ensure the json data is an array
      if (!Array.isArray(data['miscNoticesDocs'])) {
        throw new Error("Expected the field `miscNoticesDocs` to be an array in the JSON data but got " + data['miscNoticesDocs']);
      }
      // validate the optional field `miscNoticesDocs` (array)
      for (const item of data['miscNoticesDocs']) {
        _ResMemberDoc.default.validateJSON(item);
      }
      ;
    }
    // validate the optional field `landPatent1`
    if (data['landPatent1']) {
      // data not null
      _ResMemberDoc.default.validateJSON(data['landPatent1']);
    }
    // validate the optional field `landPatent2`
    if (data['landPatent2']) {
      // data not null
      _ResMemberDoc.default.validateJSON(data['landPatent2']);
    }
    // validate the optional field `landPatent3`
    if (data['landPatent3']) {
      // data not null
      _ResMemberDoc.default.validateJSON(data['landPatent3']);
    }
    // validate the optional field `landPatent4`
    if (data['landPatent4']) {
      // data not null
      _ResMemberDoc.default.validateJSON(data['landPatent4']);
    }
    // validate the optional field `landPatent5`
    if (data['landPatent5']) {
      // data not null
      _ResMemberDoc.default.validateJSON(data['landPatent5']);
    }
    if (data['territorialGovtDocs']) {
      // data not null
      // ensure the json data is an array
      if (!Array.isArray(data['territorialGovtDocs'])) {
        throw new Error("Expected the field `territorialGovtDocs` to be an array in the JSON data but got " + data['territorialGovtDocs']);
      }
      // validate the optional field `territorialGovtDocs` (array)
      for (const item of data['territorialGovtDocs']) {
        _ResMemberDoc.default.validateJSON(item);
      }
      ;
    }
    if (data['municipalGovtDocs']) {
      // data not null
      // ensure the json data is an array
      if (!Array.isArray(data['municipalGovtDocs'])) {
        throw new Error("Expected the field `municipalGovtDocs` to be an array in the JSON data but got " + data['municipalGovtDocs']);
      }
      // validate the optional field `municipalGovtDocs` (array)
      for (const item of data['municipalGovtDocs']) {
        _ResMemberDoc.default.validateJSON(item);
      }
      ;
    }
    if (data['commercialEntityDocs']) {
      // data not null
      // ensure the json data is an array
      if (!Array.isArray(data['commercialEntityDocs'])) {
        throw new Error("Expected the field `commercialEntityDocs` to be an array in the JSON data but got " + data['commercialEntityDocs']);
      }
      // validate the optional field `commercialEntityDocs` (array)
      for (const item of data['commercialEntityDocs']) {
        _ResMemberDoc.default.validateJSON(item);
      }
      ;
    }
    // validate the optional field `commonLawWill`
    if (data['commonLawWill']) {
      // data not null
      _ResMemberDoc.default.validateJSON(data['commonLawWill']);
    }
    return true;
  }
}

/**
 * @member {module:model/ResMemberDoc} declarationAmericans
 */
ResMembershipDocs.prototype['declarationAmericans'] = undefined;

/**
 * @member {module:model/ResMemberDoc} declarationImmigrants
 */
ResMembershipDocs.prototype['declarationImmigrants'] = undefined;

/**
 * @member {module:model/ResMemberDoc} declarationFederalPersons
 */
ResMembershipDocs.prototype['declarationFederalPersons'] = undefined;

/**
 * @member {module:model/ResMemberDoc} declarationPoliticalStatus
 */
ResMembershipDocs.prototype['declarationPoliticalStatus'] = undefined;

/**
 * @member {module:model/ResMemberDoc} birthRecord
 */
ResMembershipDocs.prototype['birthRecord'] = undefined;

/**
 * @member {module:model/ResMemberDoc} witnessTestimony1
 */
ResMembershipDocs.prototype['witnessTestimony1'] = undefined;

/**
 * @member {module:model/ResMemberDoc} witnessTestimony2
 */
ResMembershipDocs.prototype['witnessTestimony2'] = undefined;

/**
 * @member {module:model/ResMemberDoc} voterCancellation
 */
ResMembershipDocs.prototype['voterCancellation'] = undefined;

/**
 * @member {module:model/ResMemberDoc} revocationTaxes1
 */
ResMembershipDocs.prototype['revocationTaxes1'] = undefined;

/**
 * @member {module:model/ResMemberDoc} revocationTaxes2
 */
ResMembershipDocs.prototype['revocationTaxes2'] = undefined;

/**
 * @member {module:model/ResMemberDoc} deedReconveyance
 */
ResMembershipDocs.prototype['deedReconveyance'] = undefined;

/**
 * @member {module:model/ResMemberDoc} certAssumedName
 */
ResMembershipDocs.prototype['certAssumedName'] = undefined;

/**
 * @member {module:model/ResMemberDoc} actExpatriation1
 */
ResMembershipDocs.prototype['actExpatriation1'] = undefined;

/**
 * @member {module:model/ResMemberDoc} actExpatriation2
 */
ResMembershipDocs.prototype['actExpatriation2'] = undefined;

/**
 * @member {module:model/ResMemberDoc} actExpatriation3
 */
ResMembershipDocs.prototype['actExpatriation3'] = undefined;

/**
 * @member {module:model/ResMemberDoc} cancellationPowerAttorney
 */
ResMembershipDocs.prototype['cancellationPowerAttorney'] = undefined;

/**
 * @member {module:model/ResMemberDoc} foreignSovereignImmunitiesAct
 */
ResMembershipDocs.prototype['foreignSovereignImmunitiesAct'] = undefined;

/**
 * @member {module:model/ResMemberDoc} dnaParamountClaim
 */
ResMembershipDocs.prototype['dnaParamountClaim'] = undefined;

/**
 * @member {module:model/ResMemberDoc} militarySeverance
 */
ResMembershipDocs.prototype['militarySeverance'] = undefined;

/**
 * @member {module:model/ResMemberDoc} commonCarryDeclaration
 */
ResMembershipDocs.prototype['commonCarryDeclaration'] = undefined;

/**
 * @member {module:model/ResMemberDoc} feeSchedule
 */
ResMembershipDocs.prototype['feeSchedule'] = undefined;

/**
 * @member {module:model/ResMemberDoc} lineageTreaty
 */
ResMembershipDocs.prototype['lineageTreaty'] = undefined;

/**
 * @member {module:model/ResMemberDoc} marriageRecord
 */
ResMembershipDocs.prototype['marriageRecord'] = undefined;

/**
 * @member {module:model/ResMemberDoc} babyDeed1
 */
ResMembershipDocs.prototype['babyDeed1'] = undefined;

/**
 * @member {module:model/ResMemberDoc} babyDeed2
 */
ResMembershipDocs.prototype['babyDeed2'] = undefined;

/**
 * @member {module:model/ResMemberDoc} babyDeed3
 */
ResMembershipDocs.prototype['babyDeed3'] = undefined;

/**
 * @member {module:model/ResMemberDoc} babyDeed4
 */
ResMembershipDocs.prototype['babyDeed4'] = undefined;

/**
 * @member {module:model/ResMemberDoc} babyDeed5
 */
ResMembershipDocs.prototype['babyDeed5'] = undefined;

/**
 * @member {module:model/ResMemberDoc} babyDeed6
 */
ResMembershipDocs.prototype['babyDeed6'] = undefined;

/**
 * @member {module:model/ResMemberDoc} babyDeed7
 */
ResMembershipDocs.prototype['babyDeed7'] = undefined;

/**
 * @member {module:model/ResMemberDoc} babyDeed8
 */
ResMembershipDocs.prototype['babyDeed8'] = undefined;

/**
 * @member {module:model/ResMemberDoc} babyDeed9
 */
ResMembershipDocs.prototype['babyDeed9'] = undefined;

/**
 * @member {module:model/ResMemberDoc} deathRecord
 */
ResMembershipDocs.prototype['deathRecord'] = undefined;

/**
 * @member {Array.<module:model/ResMemberDoc>} privateBusinessDocs
 */
ResMembershipDocs.prototype['privateBusinessDocs'] = undefined;

/**
 * @member {Array.<module:model/ResMemberDoc>} otherDocs
 */
ResMembershipDocs.prototype['otherDocs'] = undefined;

/**
 * @member {Array.<module:model/ResMemberDoc>} miscNoticesDocs
 */
ResMembershipDocs.prototype['miscNoticesDocs'] = undefined;

/**
 * @member {module:model/ResMemberDoc} landPatent1
 */
ResMembershipDocs.prototype['landPatent1'] = undefined;

/**
 * @member {module:model/ResMemberDoc} landPatent2
 */
ResMembershipDocs.prototype['landPatent2'] = undefined;

/**
 * @member {module:model/ResMemberDoc} landPatent3
 */
ResMembershipDocs.prototype['landPatent3'] = undefined;

/**
 * @member {module:model/ResMemberDoc} landPatent4
 */
ResMembershipDocs.prototype['landPatent4'] = undefined;

/**
 * @member {module:model/ResMemberDoc} landPatent5
 */
ResMembershipDocs.prototype['landPatent5'] = undefined;

/**
 * @member {Array.<module:model/ResMemberDoc>} territorialGovtDocs
 */
ResMembershipDocs.prototype['territorialGovtDocs'] = undefined;

/**
 * @member {Array.<module:model/ResMemberDoc>} municipalGovtDocs
 */
ResMembershipDocs.prototype['municipalGovtDocs'] = undefined;

/**
 * @member {Array.<module:model/ResMemberDoc>} commercialEntityDocs
 */
ResMembershipDocs.prototype['commercialEntityDocs'] = undefined;

/**
 * @member {module:model/ResMemberDoc} commonLawWill
 */
ResMembershipDocs.prototype['commonLawWill'] = undefined;
var _default = ResMembershipDocs;
exports.default = _default;

},{"../ApiClient":16,"./ResMemberDoc":103}],108:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _ResMemberProfile = _interopRequireDefault(require("./ResMemberProfile"));
var _ResMembershipDocs = _interopRequireDefault(require("./ResMembershipDocs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The ResPublicCredentialCard model module.
 * @module model/ResPublicCredentialCard
 * @version 0.1.0
 */
class ResPublicCredentialCard {
  /**
   * Constructs a new <code>ResPublicCredentialCard</code>.
   * @alias module:model/ResPublicCredentialCard
   */
  constructor() {
    ResPublicCredentialCard.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>ResPublicCredentialCard</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ResPublicCredentialCard} obj Optional instance to populate.
   * @return {module:model/ResPublicCredentialCard} The populated <code>ResPublicCredentialCard</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new ResPublicCredentialCard();
      if (data.hasOwnProperty('masterRecordNumber')) {
        obj['masterRecordNumber'] = _ApiClient.default.convertToType(data['masterRecordNumber'], 'String');
      }
      if (data.hasOwnProperty('expirationDate')) {
        obj['expirationDate'] = _ApiClient.default.convertToType(data['expirationDate'], 'Date');
      }
      if (data.hasOwnProperty('updatedAt')) {
        obj['updatedAt'] = _ApiClient.default.convertToType(data['updatedAt'], 'Date');
      }
      if (data.hasOwnProperty('memberProfile')) {
        obj['memberProfile'] = _ResMemberProfile.default.constructFromObject(data['memberProfile']);
      }
      if (data.hasOwnProperty('memberDocs')) {
        obj['memberDocs'] = _ResMembershipDocs.default.constructFromObject(data['memberDocs']);
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>ResPublicCredentialCard</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>ResPublicCredentialCard</code>.
   */
  static validateJSON(data) {
    // ensure the json data is a string
    if (data['masterRecordNumber'] && !(typeof data['masterRecordNumber'] === 'string' || data['masterRecordNumber'] instanceof String)) {
      throw new Error("Expected the field `masterRecordNumber` to be a primitive type in the JSON string but got " + data['masterRecordNumber']);
    }
    // validate the optional field `memberProfile`
    if (data['memberProfile']) {
      // data not null
      _ResMemberProfile.default.validateJSON(data['memberProfile']);
    }
    // validate the optional field `memberDocs`
    if (data['memberDocs']) {
      // data not null
      _ResMembershipDocs.default.validateJSON(data['memberDocs']);
    }
    return true;
  }
}

/**
 * @member {String} masterRecordNumber
 */
ResPublicCredentialCard.prototype['masterRecordNumber'] = undefined;

/**
 * @member {Date} expirationDate
 */
ResPublicCredentialCard.prototype['expirationDate'] = undefined;

/**
 * @member {Date} updatedAt
 */
ResPublicCredentialCard.prototype['updatedAt'] = undefined;

/**
 * @member {module:model/ResMemberProfile} memberProfile
 */
ResPublicCredentialCard.prototype['memberProfile'] = undefined;

/**
 * @member {module:model/ResMembershipDocs} memberDocs
 */
ResPublicCredentialCard.prototype['memberDocs'] = undefined;
var _default = ResPublicCredentialCard;
exports.default = _default;

},{"../ApiClient":16,"./ResMemberProfile":105,"./ResMembershipDocs":107}],109:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _ShopItemType = _interopRequireDefault(require("./ShopItemType"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The ResShopItem model module.
 * @module model/ResShopItem
 * @version 0.1.0
 */
class ResShopItem {
  /**
   * Constructs a new <code>ResShopItem</code>.
   * @alias module:model/ResShopItem
   */
  constructor() {
    ResShopItem.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>ResShopItem</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ResShopItem} obj Optional instance to populate.
   * @return {module:model/ResShopItem} The populated <code>ResShopItem</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new ResShopItem();
      if (data.hasOwnProperty('id')) {
        obj['id'] = _ApiClient.default.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('name')) {
        obj['name'] = _ApiClient.default.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('info')) {
        obj['info'] = _ApiClient.default.convertToType(data['info'], 'String');
      }
      if (data.hasOwnProperty('type')) {
        obj['type'] = _ShopItemType.default.constructFromObject(data['type']);
      }
      if (data.hasOwnProperty('amountFee')) {
        obj['amountFee'] = _ApiClient.default.convertToType(data['amountFee'], 'String');
      }
      if (data.hasOwnProperty('createdAt')) {
        obj['createdAt'] = _ApiClient.default.convertToType(data['createdAt'], Object);
      }
      if (data.hasOwnProperty('updatedAt')) {
        obj['updatedAt'] = _ApiClient.default.convertToType(data['updatedAt'], Object);
      }
      if (data.hasOwnProperty('deletedAt')) {
        obj['deletedAt'] = _ApiClient.default.convertToType(data['deletedAt'], Object);
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>ResShopItem</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>ResShopItem</code>.
   */
  static validateJSON(data) {
    // ensure the json data is a string
    if (data['id'] && !(typeof data['id'] === 'string' || data['id'] instanceof String)) {
      throw new Error("Expected the field `id` to be a primitive type in the JSON string but got " + data['id']);
    }
    // ensure the json data is a string
    if (data['name'] && !(typeof data['name'] === 'string' || data['name'] instanceof String)) {
      throw new Error("Expected the field `name` to be a primitive type in the JSON string but got " + data['name']);
    }
    // ensure the json data is a string
    if (data['info'] && !(typeof data['info'] === 'string' || data['info'] instanceof String)) {
      throw new Error("Expected the field `info` to be a primitive type in the JSON string but got " + data['info']);
    }
    // ensure the json data is a string
    if (data['amountFee'] && !(typeof data['amountFee'] === 'string' || data['amountFee'] instanceof String)) {
      throw new Error("Expected the field `amountFee` to be a primitive type in the JSON string but got " + data['amountFee']);
    }
    return true;
  }
}

/**
 * @member {String} id
 */
ResShopItem.prototype['id'] = undefined;

/**
 * @member {String} name
 */
ResShopItem.prototype['name'] = undefined;

/**
 * @member {String} info
 */
ResShopItem.prototype['info'] = undefined;

/**
 * @member {module:model/ShopItemType} type
 */
ResShopItem.prototype['type'] = undefined;

/**
 * @member {String} amountFee
 */
ResShopItem.prototype['amountFee'] = undefined;

/**
 * @member {Object} createdAt
 */
ResShopItem.prototype['createdAt'] = undefined;

/**
 * @member {Object} updatedAt
 */
ResShopItem.prototype['updatedAt'] = undefined;

/**
 * @member {Object} deletedAt
 */
ResShopItem.prototype['deletedAt'] = undefined;
var _default = ResShopItem;
exports.default = _default;

},{"../ApiClient":16,"./ShopItemType":115}],110:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _ResShopOrderItem = _interopRequireDefault(require("./ResShopOrderItem"));
var _ResShopOrderPayment = _interopRequireDefault(require("./ResShopOrderPayment"));
var _ResShopOrderTotals = _interopRequireDefault(require("./ResShopOrderTotals"));
var _ShopOrderStatus = _interopRequireDefault(require("./ShopOrderStatus"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The ResShopOrder model module.
 * @module model/ResShopOrder
 * @version 0.1.0
 */
class ResShopOrder {
  /**
   * Constructs a new <code>ResShopOrder</code>.
   * @alias module:model/ResShopOrder
   */
  constructor() {
    ResShopOrder.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>ResShopOrder</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ResShopOrder} obj Optional instance to populate.
   * @return {module:model/ResShopOrder} The populated <code>ResShopOrder</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new ResShopOrder();
      if (data.hasOwnProperty('id')) {
        obj['id'] = _ApiClient.default.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('createdAt')) {
        obj['createdAt'] = _ApiClient.default.convertToType(data['createdAt'], 'Date');
      }
      if (data.hasOwnProperty('updatedAt')) {
        obj['updatedAt'] = _ApiClient.default.convertToType(data['updatedAt'], 'Date');
      }
      if (data.hasOwnProperty('deletedAt')) {
        obj['deletedAt'] = _ApiClient.default.convertToType(data['deletedAt'], 'Date');
      }
      if (data.hasOwnProperty('number')) {
        obj['number'] = _ApiClient.default.convertToType(data['number'], 'String');
      }
      if (data.hasOwnProperty('status')) {
        obj['status'] = _ShopOrderStatus.default.constructFromObject(data['status']);
      }
      if (data.hasOwnProperty('items')) {
        obj['items'] = _ApiClient.default.convertToType(data['items'], [_ResShopOrderItem.default]);
      }
      if (data.hasOwnProperty('amountCredit')) {
        obj['amountCredit'] = _ApiClient.default.convertToType(data['amountCredit'], 'String');
      }
      if (data.hasOwnProperty('totals')) {
        obj['totals'] = _ResShopOrderTotals.default.constructFromObject(data['totals']);
      }
      if (data.hasOwnProperty('payment')) {
        obj['payment'] = _ResShopOrderPayment.default.constructFromObject(data['payment']);
      }
      if (data.hasOwnProperty('notes')) {
        obj['notes'] = _ApiClient.default.convertToType(data['notes'], 'String');
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>ResShopOrder</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>ResShopOrder</code>.
   */
  static validateJSON(data) {
    // ensure the json data is a string
    if (data['id'] && !(typeof data['id'] === 'string' || data['id'] instanceof String)) {
      throw new Error("Expected the field `id` to be a primitive type in the JSON string but got " + data['id']);
    }
    // ensure the json data is a string
    if (data['number'] && !(typeof data['number'] === 'string' || data['number'] instanceof String)) {
      throw new Error("Expected the field `number` to be a primitive type in the JSON string but got " + data['number']);
    }
    if (data['items']) {
      // data not null
      // ensure the json data is an array
      if (!Array.isArray(data['items'])) {
        throw new Error("Expected the field `items` to be an array in the JSON data but got " + data['items']);
      }
      // validate the optional field `items` (array)
      for (const item of data['items']) {
        _ResShopOrderItem.default.validateJSON(item);
      }
      ;
    }
    // ensure the json data is a string
    if (data['amountCredit'] && !(typeof data['amountCredit'] === 'string' || data['amountCredit'] instanceof String)) {
      throw new Error("Expected the field `amountCredit` to be a primitive type in the JSON string but got " + data['amountCredit']);
    }
    // validate the optional field `totals`
    if (data['totals']) {
      // data not null
      _ResShopOrderTotals.default.validateJSON(data['totals']);
    }
    // validate the optional field `payment`
    if (data['payment']) {
      // data not null
      _ResShopOrderPayment.default.validateJSON(data['payment']);
    }
    // ensure the json data is a string
    if (data['notes'] && !(typeof data['notes'] === 'string' || data['notes'] instanceof String)) {
      throw new Error("Expected the field `notes` to be a primitive type in the JSON string but got " + data['notes']);
    }
    return true;
  }
}

/**
 * @member {String} id
 */
ResShopOrder.prototype['id'] = undefined;

/**
 * @member {Date} createdAt
 */
ResShopOrder.prototype['createdAt'] = undefined;

/**
 * @member {Date} updatedAt
 */
ResShopOrder.prototype['updatedAt'] = undefined;

/**
 * @member {Date} deletedAt
 */
ResShopOrder.prototype['deletedAt'] = undefined;

/**
 * @member {String} number
 */
ResShopOrder.prototype['number'] = undefined;

/**
 * @member {module:model/ShopOrderStatus} status
 */
ResShopOrder.prototype['status'] = undefined;

/**
 * @member {Array.<module:model/ResShopOrderItem>} items
 */
ResShopOrder.prototype['items'] = undefined;

/**
 * @member {String} amountCredit
 */
ResShopOrder.prototype['amountCredit'] = undefined;

/**
 * @member {module:model/ResShopOrderTotals} totals
 */
ResShopOrder.prototype['totals'] = undefined;

/**
 * @member {module:model/ResShopOrderPayment} payment
 */
ResShopOrder.prototype['payment'] = undefined;

/**
 * @member {String} notes
 */
ResShopOrder.prototype['notes'] = undefined;
var _default = ResShopOrder;
exports.default = _default;

},{"../ApiClient":16,"./ResShopOrderItem":111,"./ResShopOrderPayment":112,"./ResShopOrderTotals":113,"./ShopOrderStatus":124}],111:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _ResShopItem = _interopRequireDefault(require("./ResShopItem"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The ResShopOrderItem model module.
 * @module model/ResShopOrderItem
 * @version 0.1.0
 */
class ResShopOrderItem {
  /**
   * Constructs a new <code>ResShopOrderItem</code>.
   * @alias module:model/ResShopOrderItem
   */
  constructor() {
    ResShopOrderItem.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>ResShopOrderItem</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ResShopOrderItem} obj Optional instance to populate.
   * @return {module:model/ResShopOrderItem} The populated <code>ResShopOrderItem</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new ResShopOrderItem();
      if (data.hasOwnProperty('id')) {
        obj['id'] = _ApiClient.default.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('quantity')) {
        obj['quantity'] = _ApiClient.default.convertToType(data['quantity'], 'Number');
      }
      if (data.hasOwnProperty('amountDiscount')) {
        obj['amountDiscount'] = _ApiClient.default.convertToType(data['amountDiscount'], 'String');
      }
      if (data.hasOwnProperty('notes')) {
        obj['notes'] = _ApiClient.default.convertToType(data['notes'], 'String');
      }
      if (data.hasOwnProperty('listing')) {
        obj['listing'] = _ResShopItem.default.constructFromObject(data['listing']);
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>ResShopOrderItem</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>ResShopOrderItem</code>.
   */
  static validateJSON(data) {
    // ensure the json data is a string
    if (data['id'] && !(typeof data['id'] === 'string' || data['id'] instanceof String)) {
      throw new Error("Expected the field `id` to be a primitive type in the JSON string but got " + data['id']);
    }
    // ensure the json data is a string
    if (data['amountDiscount'] && !(typeof data['amountDiscount'] === 'string' || data['amountDiscount'] instanceof String)) {
      throw new Error("Expected the field `amountDiscount` to be a primitive type in the JSON string but got " + data['amountDiscount']);
    }
    // ensure the json data is a string
    if (data['notes'] && !(typeof data['notes'] === 'string' || data['notes'] instanceof String)) {
      throw new Error("Expected the field `notes` to be a primitive type in the JSON string but got " + data['notes']);
    }
    // validate the optional field `listing`
    if (data['listing']) {
      // data not null
      _ResShopItem.default.validateJSON(data['listing']);
    }
    return true;
  }
}

/**
 * @member {String} id
 */
ResShopOrderItem.prototype['id'] = undefined;

/**
 * @member {Number} quantity
 */
ResShopOrderItem.prototype['quantity'] = undefined;

/**
 * @member {String} amountDiscount
 */
ResShopOrderItem.prototype['amountDiscount'] = undefined;

/**
 * @member {String} notes
 */
ResShopOrderItem.prototype['notes'] = undefined;

/**
 * @member {module:model/ResShopItem} listing
 */
ResShopOrderItem.prototype['listing'] = undefined;
var _default = ResShopOrderItem;
exports.default = _default;

},{"../ApiClient":16,"./ResShopItem":109}],112:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _ShopOrderPaymentMethod = _interopRequireDefault(require("./ShopOrderPaymentMethod"));
var _ShopOrderPaymentStatus = _interopRequireDefault(require("./ShopOrderPaymentStatus"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The ResShopOrderPayment model module.
 * @module model/ResShopOrderPayment
 * @version 0.1.0
 */
class ResShopOrderPayment {
  /**
   * Constructs a new <code>ResShopOrderPayment</code>.
   * @alias module:model/ResShopOrderPayment
   */
  constructor() {
    ResShopOrderPayment.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>ResShopOrderPayment</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ResShopOrderPayment} obj Optional instance to populate.
   * @return {module:model/ResShopOrderPayment} The populated <code>ResShopOrderPayment</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new ResShopOrderPayment();
      if (data.hasOwnProperty('id')) {
        obj['id'] = _ApiClient.default.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('amount')) {
        obj['amount'] = _ApiClient.default.convertToType(data['amount'], 'String');
      }
      if (data.hasOwnProperty('method')) {
        obj['method'] = _ShopOrderPaymentMethod.default.constructFromObject(data['method']);
      }
      if (data.hasOwnProperty('methodCardLast4')) {
        obj['methodCardLast4'] = _ApiClient.default.convertToType(data['methodCardLast4'], 'String');
      }
      if (data.hasOwnProperty('status')) {
        obj['status'] = _ShopOrderPaymentStatus.default.constructFromObject(data['status']);
      }
      if (data.hasOwnProperty('createdAt')) {
        obj['createdAt'] = _ApiClient.default.convertToType(data['createdAt'], 'Date');
      }
      if (data.hasOwnProperty('updatedAt')) {
        obj['updatedAt'] = _ApiClient.default.convertToType(data['updatedAt'], 'Date');
      }
      if (data.hasOwnProperty('refundedAt')) {
        obj['refundedAt'] = _ApiClient.default.convertToType(data['refundedAt'], 'Date');
      }
      if (data.hasOwnProperty('deletedAt')) {
        obj['deletedAt'] = _ApiClient.default.convertToType(data['deletedAt'], 'Date');
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>ResShopOrderPayment</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>ResShopOrderPayment</code>.
   */
  static validateJSON(data) {
    // ensure the json data is a string
    if (data['id'] && !(typeof data['id'] === 'string' || data['id'] instanceof String)) {
      throw new Error("Expected the field `id` to be a primitive type in the JSON string but got " + data['id']);
    }
    // ensure the json data is a string
    if (data['amount'] && !(typeof data['amount'] === 'string' || data['amount'] instanceof String)) {
      throw new Error("Expected the field `amount` to be a primitive type in the JSON string but got " + data['amount']);
    }
    // ensure the json data is a string
    if (data['methodCardLast4'] && !(typeof data['methodCardLast4'] === 'string' || data['methodCardLast4'] instanceof String)) {
      throw new Error("Expected the field `methodCardLast4` to be a primitive type in the JSON string but got " + data['methodCardLast4']);
    }
    return true;
  }
}

/**
 * @member {String} id
 */
ResShopOrderPayment.prototype['id'] = undefined;

/**
 * @member {String} amount
 */
ResShopOrderPayment.prototype['amount'] = undefined;

/**
 * @member {module:model/ShopOrderPaymentMethod} method
 */
ResShopOrderPayment.prototype['method'] = undefined;

/**
 * @member {String} methodCardLast4
 */
ResShopOrderPayment.prototype['methodCardLast4'] = undefined;

/**
 * @member {module:model/ShopOrderPaymentStatus} status
 */
ResShopOrderPayment.prototype['status'] = undefined;

/**
 * @member {Date} createdAt
 */
ResShopOrderPayment.prototype['createdAt'] = undefined;

/**
 * @member {Date} updatedAt
 */
ResShopOrderPayment.prototype['updatedAt'] = undefined;

/**
 * @member {Date} refundedAt
 */
ResShopOrderPayment.prototype['refundedAt'] = undefined;

/**
 * @member {Date} deletedAt
 */
ResShopOrderPayment.prototype['deletedAt'] = undefined;
var _default = ResShopOrderPayment;
exports.default = _default;

},{"../ApiClient":16,"./ShopOrderPaymentMethod":122,"./ShopOrderPaymentStatus":123}],113:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The ResShopOrderTotals model module.
 * @module model/ResShopOrderTotals
 * @version 0.1.0
 */
class ResShopOrderTotals {
  /**
   * Constructs a new <code>ResShopOrderTotals</code>.
   * @alias module:model/ResShopOrderTotals
   */
  constructor() {
    ResShopOrderTotals.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>ResShopOrderTotals</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ResShopOrderTotals} obj Optional instance to populate.
   * @return {module:model/ResShopOrderTotals} The populated <code>ResShopOrderTotals</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new ResShopOrderTotals();
      if (data.hasOwnProperty('items')) {
        obj['items'] = _ApiClient.default.convertToType(data['items'], 'String');
      }
      if (data.hasOwnProperty('credits')) {
        obj['credits'] = _ApiClient.default.convertToType(data['credits'], 'String');
      }
      if (data.hasOwnProperty('net')) {
        obj['net'] = _ApiClient.default.convertToType(data['net'], 'String');
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>ResShopOrderTotals</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>ResShopOrderTotals</code>.
   */
  static validateJSON(data) {
    // ensure the json data is a string
    if (data['items'] && !(typeof data['items'] === 'string' || data['items'] instanceof String)) {
      throw new Error("Expected the field `items` to be a primitive type in the JSON string but got " + data['items']);
    }
    // ensure the json data is a string
    if (data['credits'] && !(typeof data['credits'] === 'string' || data['credits'] instanceof String)) {
      throw new Error("Expected the field `credits` to be a primitive type in the JSON string but got " + data['credits']);
    }
    // ensure the json data is a string
    if (data['net'] && !(typeof data['net'] === 'string' || data['net'] instanceof String)) {
      throw new Error("Expected the field `net` to be a primitive type in the JSON string but got " + data['net']);
    }
    return true;
  }
}

/**
 * @member {String} items
 */
ResShopOrderTotals.prototype['items'] = undefined;

/**
 * @member {String} credits
 */
ResShopOrderTotals.prototype['credits'] = undefined;

/**
 * @member {String} net
 */
ResShopOrderTotals.prototype['net'] = undefined;
var _default = ResShopOrderTotals;
exports.default = _default;

},{"../ApiClient":16}],114:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _ResShopOrderItem = _interopRequireDefault(require("./ResShopOrderItem"));
var _ShopPurchaseItemFulfillmentStatus = _interopRequireDefault(require("./ShopPurchaseItemFulfillmentStatus"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The ResShopPurchaseItem model module.
 * @module model/ResShopPurchaseItem
 * @version 0.1.0
 */
class ResShopPurchaseItem {
  /**
   * Constructs a new <code>ResShopPurchaseItem</code>.
   * @alias module:model/ResShopPurchaseItem
   */
  constructor() {
    ResShopPurchaseItem.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>ResShopPurchaseItem</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ResShopPurchaseItem} obj Optional instance to populate.
   * @return {module:model/ResShopPurchaseItem} The populated <code>ResShopPurchaseItem</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new ResShopPurchaseItem();
      if (data.hasOwnProperty('id')) {
        obj['id'] = _ApiClient.default.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('fulfillmentStatus')) {
        obj['fulfillmentStatus'] = _ShopPurchaseItemFulfillmentStatus.default.constructFromObject(data['fulfillmentStatus']);
      }
      if (data.hasOwnProperty('orderId')) {
        obj['orderId'] = _ApiClient.default.convertToType(data['orderId'], 'String');
      }
      if (data.hasOwnProperty('orderItem')) {
        obj['orderItem'] = _ResShopOrderItem.default.constructFromObject(data['orderItem']);
      }
      if (data.hasOwnProperty('feePaid')) {
        obj['feePaid'] = _ApiClient.default.convertToType(data['feePaid'], 'Number');
      }
      if (data.hasOwnProperty('notes')) {
        obj['notes'] = _ApiClient.default.convertToType(data['notes'], 'String');
      }
      if (data.hasOwnProperty('createdAt')) {
        obj['createdAt'] = _ApiClient.default.convertToType(data['createdAt'], 'Date');
      }
      if (data.hasOwnProperty('updatedAt')) {
        obj['updatedAt'] = _ApiClient.default.convertToType(data['updatedAt'], 'Date');
      }
      if (data.hasOwnProperty('deletedAt')) {
        obj['deletedAt'] = _ApiClient.default.convertToType(data['deletedAt'], Object);
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>ResShopPurchaseItem</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>ResShopPurchaseItem</code>.
   */
  static validateJSON(data) {
    // ensure the json data is a string
    if (data['id'] && !(typeof data['id'] === 'string' || data['id'] instanceof String)) {
      throw new Error("Expected the field `id` to be a primitive type in the JSON string but got " + data['id']);
    }
    // ensure the json data is a string
    if (data['orderId'] && !(typeof data['orderId'] === 'string' || data['orderId'] instanceof String)) {
      throw new Error("Expected the field `orderId` to be a primitive type in the JSON string but got " + data['orderId']);
    }
    // validate the optional field `orderItem`
    if (data['orderItem']) {
      // data not null
      _ResShopOrderItem.default.validateJSON(data['orderItem']);
    }
    // ensure the json data is a string
    if (data['notes'] && !(typeof data['notes'] === 'string' || data['notes'] instanceof String)) {
      throw new Error("Expected the field `notes` to be a primitive type in the JSON string but got " + data['notes']);
    }
    return true;
  }
}

/**
 * @member {String} id
 */
ResShopPurchaseItem.prototype['id'] = undefined;

/**
 * @member {module:model/ShopPurchaseItemFulfillmentStatus} fulfillmentStatus
 */
ResShopPurchaseItem.prototype['fulfillmentStatus'] = undefined;

/**
 * @member {String} orderId
 */
ResShopPurchaseItem.prototype['orderId'] = undefined;

/**
 * @member {module:model/ResShopOrderItem} orderItem
 */
ResShopPurchaseItem.prototype['orderItem'] = undefined;

/**
 * @member {Number} feePaid
 */
ResShopPurchaseItem.prototype['feePaid'] = undefined;

/**
 * @member {String} notes
 */
ResShopPurchaseItem.prototype['notes'] = undefined;

/**
 * @member {Date} createdAt
 */
ResShopPurchaseItem.prototype['createdAt'] = undefined;

/**
 * @member {Date} updatedAt
 */
ResShopPurchaseItem.prototype['updatedAt'] = undefined;

/**
 * @member {Object} deletedAt
 */
ResShopPurchaseItem.prototype['deletedAt'] = undefined;
var _default = ResShopPurchaseItem;
exports.default = _default;

},{"../ApiClient":16,"./ResShopOrderItem":111,"./ShopPurchaseItemFulfillmentStatus":125}],115:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
* Enum class ShopItemType.
* @enum {}
* @readonly
*/
class ShopItemType {
  /**
   * value: "CREDENTIAL_CARD"
   * @const
   */
  "CREDENTIAL_CARD" = "CREDENTIAL_CARD";

  /**
   * value: "PUBLISHING_FEE"
   * @const
   */
  "PUBLISHING_FEE" = "PUBLISHING_FEE";

  /**
   * value: "RECORDING_FEE"
   * @const
   */
  "RECORDING_FEE" = "RECORDING_FEE";

  /**
   * value: "DOCUMENT_GENERATOR"
   * @const
   */
  "DOCUMENT_GENERATOR" = "DOCUMENT_GENERATOR";

  /**
   * value: "TRAINING_COURSES"
   * @const
   */
  "TRAINING_COURSES" = "TRAINING_COURSES";

  /**
   * value: "BACKGROUND_CHECK"
   * @const
   */
  "BACKGROUND_CHECK" = "BACKGROUND_CHECK";

  /**
   * value: "DONATE_STATE_ASSEMBLY"
   * @const
   */
  "DONATE_STATE_ASSEMBLY" = "DONATE_STATE_ASSEMBLY";

  /**
   * value: "DONATE_COUNTY_ASSEMBLY"
   * @const
   */
  "DONATE_COUNTY_ASSEMBLY" = "DONATE_COUNTY_ASSEMBLY";

  /**
   * value: "DONATE_CONTINENTAL_MARSHALS"
   * @const
   */
  "DONATE_CONTINENTAL_MARSHALS" = "DONATE_CONTINENTAL_MARSHALS";

  /**
   * value: "DONATE_ANNA"
   * @const
   */
  "DONATE_ANNA" = "DONATE_ANNA";

  /**
   * value: "DONATE_OTHER"
   * @const
   */
  "DONATE_OTHER" = "DONATE_OTHER";

  /**
   * value: "OTHER"
   * @const
   */
  "OTHER" = "OTHER";

  /**
  * Returns a <code>ShopItemType</code> enum value from a Javascript object name.
  * @param {Object} data The plain JavaScript object containing the name of the enum value.
  * @return {module:model/ShopItemType} The enum <code>ShopItemType</code> value.
  */
  static constructFromObject(object) {
    return object;
  }
}
exports.default = ShopItemType;

},{"../ApiClient":16}],116:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _ResShopItem = _interopRequireDefault(require("./ResShopItem"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The ShopItemsCreate201Response model module.
 * @module model/ShopItemsCreate201Response
 * @version 0.1.0
 */
class ShopItemsCreate201Response {
  /**
   * Constructs a new <code>ShopItemsCreate201Response</code>.
   * @alias module:model/ShopItemsCreate201Response
   */
  constructor() {
    ShopItemsCreate201Response.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>ShopItemsCreate201Response</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ShopItemsCreate201Response} obj Optional instance to populate.
   * @return {module:model/ShopItemsCreate201Response} The populated <code>ShopItemsCreate201Response</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new ShopItemsCreate201Response();
      if (data.hasOwnProperty('item')) {
        obj['item'] = _ResShopItem.default.constructFromObject(data['item']);
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>ShopItemsCreate201Response</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>ShopItemsCreate201Response</code>.
   */
  static validateJSON(data) {
    // validate the optional field `item`
    if (data['item']) {
      // data not null
      _ResShopItem.default.validateJSON(data['item']);
    }
    return true;
  }
}

/**
 * @member {module:model/ResShopItem} item
 */
ShopItemsCreate201Response.prototype['item'] = undefined;
var _default = ShopItemsCreate201Response;
exports.default = _default;

},{"../ApiClient":16,"./ResShopItem":109}],117:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The ShopItemsCreate409Response model module.
 * @module model/ShopItemsCreate409Response
 * @version 0.1.0
 */
class ShopItemsCreate409Response {
  /**
   * Constructs a new <code>ShopItemsCreate409Response</code>.
   * @alias module:model/ShopItemsCreate409Response
   */
  constructor() {
    ShopItemsCreate409Response.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>ShopItemsCreate409Response</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ShopItemsCreate409Response} obj Optional instance to populate.
   * @return {module:model/ShopItemsCreate409Response} The populated <code>ShopItemsCreate409Response</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new ShopItemsCreate409Response();
      if (data.hasOwnProperty('err')) {
        obj['err'] = _ApiClient.default.convertToType(data['err'], 'String');
      }
      if (data.hasOwnProperty('errCode')) {
        obj['errCode'] = _ApiClient.default.convertToType(data['errCode'], 'Number');
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>ShopItemsCreate409Response</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>ShopItemsCreate409Response</code>.
   */
  static validateJSON(data) {
    // ensure the json data is a string
    if (data['err'] && !(typeof data['err'] === 'string' || data['err'] instanceof String)) {
      throw new Error("Expected the field `err` to be a primitive type in the JSON string but got " + data['err']);
    }
    return true;
  }
}

/**
 * @member {String} err
 */
ShopItemsCreate409Response.prototype['err'] = undefined;

/**
 * @member {Number} errCode
 */
ShopItemsCreate409Response.prototype['errCode'] = undefined;
var _default = ShopItemsCreate409Response;
exports.default = _default;

},{"../ApiClient":16}],118:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _ShopItemType = _interopRequireDefault(require("./ShopItemType"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The ShopItemsCreateRequest model module.
 * @module model/ShopItemsCreateRequest
 * @version 0.1.0
 */
class ShopItemsCreateRequest {
  /**
   * Constructs a new <code>ShopItemsCreateRequest</code>.
   * @alias module:model/ShopItemsCreateRequest
   * @param name {String} 
   * @param type {module:model/ShopItemType} 
   */
  constructor(name, type) {
    ShopItemsCreateRequest.initialize(this, name, type);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj, name, type) {
    obj['name'] = name;
    obj['type'] = type;
  }

  /**
   * Constructs a <code>ShopItemsCreateRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ShopItemsCreateRequest} obj Optional instance to populate.
   * @return {module:model/ShopItemsCreateRequest} The populated <code>ShopItemsCreateRequest</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new ShopItemsCreateRequest();
      if (data.hasOwnProperty('name')) {
        obj['name'] = _ApiClient.default.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('type')) {
        obj['type'] = _ShopItemType.default.constructFromObject(data['type']);
      }
      if (data.hasOwnProperty('info')) {
        obj['info'] = _ApiClient.default.convertToType(data['info'], 'String');
      }
      if (data.hasOwnProperty('amountFee')) {
        obj['amountFee'] = _ApiClient.default.convertToType(data['amountFee'], 'String');
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>ShopItemsCreateRequest</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>ShopItemsCreateRequest</code>.
   */
  static validateJSON(data) {
    // check to make sure all required properties are present in the JSON string
    for (const property of ShopItemsCreateRequest.RequiredProperties) {
      if (!data[property]) {
        throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
      }
    }
    // ensure the json data is a string
    if (data['name'] && !(typeof data['name'] === 'string' || data['name'] instanceof String)) {
      throw new Error("Expected the field `name` to be a primitive type in the JSON string but got " + data['name']);
    }
    // ensure the json data is a string
    if (data['info'] && !(typeof data['info'] === 'string' || data['info'] instanceof String)) {
      throw new Error("Expected the field `info` to be a primitive type in the JSON string but got " + data['info']);
    }
    // ensure the json data is a string
    if (data['amountFee'] && !(typeof data['amountFee'] === 'string' || data['amountFee'] instanceof String)) {
      throw new Error("Expected the field `amountFee` to be a primitive type in the JSON string but got " + data['amountFee']);
    }
    return true;
  }
}
ShopItemsCreateRequest.RequiredProperties = ["name", "type"];

/**
 * @member {String} name
 */
ShopItemsCreateRequest.prototype['name'] = undefined;

/**
 * @member {module:model/ShopItemType} type
 */
ShopItemsCreateRequest.prototype['type'] = undefined;

/**
 * @member {String} info
 */
ShopItemsCreateRequest.prototype['info'] = undefined;

/**
 * @member {String} amountFee
 */
ShopItemsCreateRequest.prototype['amountFee'] = undefined;
var _default = ShopItemsCreateRequest;
exports.default = _default;

},{"../ApiClient":16,"./ShopItemType":115}],119:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The ShopItemsDeleteOne200Response model module.
 * @module model/ShopItemsDeleteOne200Response
 * @version 0.1.0
 */
class ShopItemsDeleteOne200Response {
  /**
   * Constructs a new <code>ShopItemsDeleteOne200Response</code>.
   * @alias module:model/ShopItemsDeleteOne200Response
   */
  constructor() {
    ShopItemsDeleteOne200Response.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>ShopItemsDeleteOne200Response</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ShopItemsDeleteOne200Response} obj Optional instance to populate.
   * @return {module:model/ShopItemsDeleteOne200Response} The populated <code>ShopItemsDeleteOne200Response</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new ShopItemsDeleteOne200Response();
      if (data.hasOwnProperty('msg')) {
        obj['msg'] = _ApiClient.default.convertToType(data['msg'], 'String');
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>ShopItemsDeleteOne200Response</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>ShopItemsDeleteOne200Response</code>.
   */
  static validateJSON(data) {
    // ensure the json data is a string
    if (data['msg'] && !(typeof data['msg'] === 'string' || data['msg'] instanceof String)) {
      throw new Error("Expected the field `msg` to be a primitive type in the JSON string but got " + data['msg']);
    }
    return true;
  }
}

/**
 * @member {String} msg
 */
ShopItemsDeleteOne200Response.prototype['msg'] = undefined;
var _default = ShopItemsDeleteOne200Response;
exports.default = _default;

},{"../ApiClient":16}],120:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _ResShopItem = _interopRequireDefault(require("./ResShopItem"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The ShopItemsList200Response model module.
 * @module model/ShopItemsList200Response
 * @version 0.1.0
 */
class ShopItemsList200Response {
  /**
   * Constructs a new <code>ShopItemsList200Response</code>.
   * @alias module:model/ShopItemsList200Response
   */
  constructor() {
    ShopItemsList200Response.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>ShopItemsList200Response</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ShopItemsList200Response} obj Optional instance to populate.
   * @return {module:model/ShopItemsList200Response} The populated <code>ShopItemsList200Response</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new ShopItemsList200Response();
      if (data.hasOwnProperty('items')) {
        obj['items'] = _ApiClient.default.convertToType(data['items'], [_ResShopItem.default]);
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>ShopItemsList200Response</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>ShopItemsList200Response</code>.
   */
  static validateJSON(data) {
    if (data['items']) {
      // data not null
      // ensure the json data is an array
      if (!Array.isArray(data['items'])) {
        throw new Error("Expected the field `items` to be an array in the JSON data but got " + data['items']);
      }
      // validate the optional field `items` (array)
      for (const item of data['items']) {
        _ResShopItem.default.validateJSON(item);
      }
      ;
    }
    return true;
  }
}

/**
 * @member {Array.<module:model/ResShopItem>} items
 */
ShopItemsList200Response.prototype['items'] = undefined;
var _default = ShopItemsList200Response;
exports.default = _default;

},{"../ApiClient":16,"./ResShopItem":109}],121:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _ShopItemType = _interopRequireDefault(require("./ShopItemType"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
 * The ShopItemsUpdateOneRequest model module.
 * @module model/ShopItemsUpdateOneRequest
 * @version 0.1.0
 */
class ShopItemsUpdateOneRequest {
  /**
   * Constructs a new <code>ShopItemsUpdateOneRequest</code>.
   * @alias module:model/ShopItemsUpdateOneRequest
   */
  constructor() {
    ShopItemsUpdateOneRequest.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>ShopItemsUpdateOneRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ShopItemsUpdateOneRequest} obj Optional instance to populate.
   * @return {module:model/ShopItemsUpdateOneRequest} The populated <code>ShopItemsUpdateOneRequest</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new ShopItemsUpdateOneRequest();
      if (data.hasOwnProperty('name')) {
        obj['name'] = _ApiClient.default.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('type')) {
        obj['type'] = _ShopItemType.default.constructFromObject(data['type']);
      }
      if (data.hasOwnProperty('info')) {
        obj['info'] = _ApiClient.default.convertToType(data['info'], 'String');
      }
      if (data.hasOwnProperty('amountFee')) {
        obj['amountFee'] = _ApiClient.default.convertToType(data['amountFee'], 'String');
      }
    }
    return obj;
  }

  /**
   * Validates the JSON data with respect to <code>ShopItemsUpdateOneRequest</code>.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @return {boolean} to indicate whether the JSON data is valid with respect to <code>ShopItemsUpdateOneRequest</code>.
   */
  static validateJSON(data) {
    // ensure the json data is a string
    if (data['name'] && !(typeof data['name'] === 'string' || data['name'] instanceof String)) {
      throw new Error("Expected the field `name` to be a primitive type in the JSON string but got " + data['name']);
    }
    // ensure the json data is a string
    if (data['info'] && !(typeof data['info'] === 'string' || data['info'] instanceof String)) {
      throw new Error("Expected the field `info` to be a primitive type in the JSON string but got " + data['info']);
    }
    // ensure the json data is a string
    if (data['amountFee'] && !(typeof data['amountFee'] === 'string' || data['amountFee'] instanceof String)) {
      throw new Error("Expected the field `amountFee` to be a primitive type in the JSON string but got " + data['amountFee']);
    }
    return true;
  }
}

/**
 * @member {String} name
 */
ShopItemsUpdateOneRequest.prototype['name'] = undefined;

/**
 * @member {module:model/ShopItemType} type
 */
ShopItemsUpdateOneRequest.prototype['type'] = undefined;

/**
 * @member {String} info
 */
ShopItemsUpdateOneRequest.prototype['info'] = undefined;

/**
 * @member {String} amountFee
 */
ShopItemsUpdateOneRequest.prototype['amountFee'] = undefined;
var _default = ShopItemsUpdateOneRequest;
exports.default = _default;

},{"../ApiClient":16,"./ShopItemType":115}],122:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
* Enum class ShopOrderPaymentMethod.
* @enum {}
* @readonly
*/
class ShopOrderPaymentMethod {
  /**
   * value: "CASH"
   * @const
   */
  "CASH" = "CASH";

  /**
   * value: "CARD"
   * @const
   */
  "CARD" = "CARD";

  /**
   * value: "CHECK"
   * @const
   */
  "CHECK" = "CHECK";

  /**
  * Returns a <code>ShopOrderPaymentMethod</code> enum value from a Javascript object name.
  * @param {Object} data The plain JavaScript object containing the name of the enum value.
  * @return {module:model/ShopOrderPaymentMethod} The enum <code>ShopOrderPaymentMethod</code> value.
  */
  static constructFromObject(object) {
    return object;
  }
}
exports.default = ShopOrderPaymentMethod;

},{"../ApiClient":16}],123:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
* Enum class ShopOrderPaymentStatus.
* @enum {}
* @readonly
*/
class ShopOrderPaymentStatus {
  /**
   * value: "PENDING"
   * @const
   */
  "PENDING" = "PENDING";

  /**
   * value: "CANCELLED"
   * @const
   */
  "CANCELLED" = "CANCELLED";

  /**
   * value: "COMPLETE"
   * @const
   */
  "COMPLETE" = "COMPLETE";

  /**
   * value: "REFUNDED"
   * @const
   */
  "REFUNDED" = "REFUNDED";

  /**
  * Returns a <code>ShopOrderPaymentStatus</code> enum value from a Javascript object name.
  * @param {Object} data The plain JavaScript object containing the name of the enum value.
  * @return {module:model/ShopOrderPaymentStatus} The enum <code>ShopOrderPaymentStatus</code> value.
  */
  static constructFromObject(object) {
    return object;
  }
}
exports.default = ShopOrderPaymentStatus;

},{"../ApiClient":16}],124:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
* Enum class ShopOrderStatus.
* @enum {}
* @readonly
*/
class ShopOrderStatus {
  /**
   * value: "OPEN"
   * @const
   */
  "OPEN" = "OPEN";

  /**
   * value: "CLOSED"
   * @const
   */
  "CLOSED" = "CLOSED";

  /**
   * value: "SUBMITTED"
   * @const
   */
  "SUBMITTED" = "SUBMITTED";

  /**
   * value: "PAID"
   * @const
   */
  "PAID" = "PAID";

  /**
   * value: "CANCELLED"
   * @const
   */
  "CANCELLED" = "CANCELLED";

  /**
   * value: "CONFIRMED"
   * @const
   */
  "CONFIRMED" = "CONFIRMED";

  /**
  * Returns a <code>ShopOrderStatus</code> enum value from a Javascript object name.
  * @param {Object} data The plain JavaScript object containing the name of the enum value.
  * @return {module:model/ShopOrderStatus} The enum <code>ShopOrderStatus</code> value.
  */
  static constructFromObject(object) {
    return object;
  }
}
exports.default = ShopOrderStatus;

},{"../ApiClient":16}],125:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

/**
* Enum class ShopPurchaseItemFulfillmentStatus.
* @enum {}
* @readonly
*/
class ShopPurchaseItemFulfillmentStatus {
  /**
   * value: "PENDING"
   * @const
   */
  "PENDING" = "PENDING";

  /**
   * value: "CANCELLED"
   * @const
   */
  "CANCELLED" = "CANCELLED";

  /**
   * value: "IN_PROGRESS"
   * @const
   */
  "IN_PROGRESS" = "IN_PROGRESS";

  /**
   * value: "FULFILLED"
   * @const
   */
  "FULFILLED" = "FULFILLED";

  /**
  * Returns a <code>ShopPurchaseItemFulfillmentStatus</code> enum value from a Javascript object name.
  * @param {Object} data The plain JavaScript object containing the name of the enum value.
  * @return {module:model/ShopPurchaseItemFulfillmentStatus} The enum <code>ShopPurchaseItemFulfillmentStatus</code> value.
  */
  static constructFromObject(object) {
    return object;
  }
}
exports.default = ShopPurchaseItemFulfillmentStatus;

},{"../ApiClient":16}]},{},[26])(26)
});
