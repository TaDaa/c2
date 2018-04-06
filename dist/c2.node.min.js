module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	var _getPrototypeOf = __webpack_require__(2);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(28);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(29);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(76);

	var _inherits3 = _interopRequireDefault(_inherits2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var d3 = global.d3 || __webpack_require__(84);
	var c2 = function c2() {};
	c2.animate = __webpack_require__(85);

	function install(d3) {
	    c2.d3 = d3;
	    var select = d3.selection.prototype.select,
	        selectAll = d3.selection.prototype.selectAll;
	    d3.selection.prototype.select = function () {
	        c2._$selection = true;
	        var result = select.apply(this, arguments);
	        c2._$selection = false;
	        return result;
	    };
	    d3.selection.prototype.selectAll = function () {
	        c2._$selectionAll = true;
	        var result = selectAll.apply(this, arguments);
	        c2._$selectionAll = false;
	        return result;
	    };
	}

	c2.install = install;
	install(d3);

	//exposed instances
	c2.types = __webpack_require__(100);
	c2.registry = __webpack_require__(102);
	c2.invalidator = __webpack_require__(101);
	c2.types = __webpack_require__(100);
	c2.animate = __webpack_require__(85);

	//exposed classes
	c2.Base = __webpack_require__(103);
	c2.createElement = __webpack_require__(108);
	c2.Element = __webpack_require__(109);
	c2.element = c2.create = function c2_create(render) {
	    return function (_c2$Element) {
	        (0, _inherits3.default)(Temp, _c2$Element);

	        function Temp() {
	            (0, _classCallCheck3.default)(this, Temp);
	            return (0, _possibleConstructorReturn3.default)(this, (Temp.__proto__ || (0, _getPrototypeOf2.default)(Temp)).call(this));
	        }

	        return Temp;
	    }(c2.Element).render(render);
	};
	//deprecated aliasing
	c2.Context2d = __webpack_require__(114);
	c2.ContextWebGL = __webpack_require__(118);

	//exposed packages
	c2['2d'] = __webpack_require__(119);
	c2.WebGL = __webpack_require__(120);

	module.exports = c2;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(3), __esModule: true };

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(4);
	module.exports = __webpack_require__(15).Object.getPrototypeOf;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject        = __webpack_require__(5)
	  , $getPrototypeOf = __webpack_require__(7);

	__webpack_require__(13)('getPrototypeOf', function(){
	  return function getPrototypeOf(it){
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(6);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(8)
	  , toObject    = __webpack_require__(5)
	  , IE_PROTO    = __webpack_require__(9)('IE_PROTO')
	  , ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(10)('keys')
	  , uid    = __webpack_require__(12);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(11)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 12 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(14)
	  , core    = __webpack_require__(15)
	  , fails   = __webpack_require__(24);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(11)
	  , core      = __webpack_require__(15)
	  , ctx       = __webpack_require__(16)
	  , hide      = __webpack_require__(18)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 15 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(17);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(19)
	  , createDesc = __webpack_require__(27);
	module.exports = __webpack_require__(23) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(20)
	  , IE8_DOM_DEFINE = __webpack_require__(22)
	  , toPrimitive    = __webpack_require__(26)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(23) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(21);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(23) && !__webpack_require__(24)(function(){
	  return Object.defineProperty(__webpack_require__(25)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(24)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(21)
	  , document = __webpack_require__(11).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(21);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 28 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _typeof2 = __webpack_require__(30);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _iterator = __webpack_require__(31);

	var _iterator2 = _interopRequireDefault(_iterator);

	var _symbol = __webpack_require__(60);

	var _symbol2 = _interopRequireDefault(_symbol);

	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(32), __esModule: true };

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(33);
	__webpack_require__(55);
	module.exports = __webpack_require__(59).f('iterator');

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(34)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(36)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(35)
	  , defined   = __webpack_require__(6);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 35 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(37)
	  , $export        = __webpack_require__(14)
	  , redefine       = __webpack_require__(38)
	  , hide           = __webpack_require__(18)
	  , has            = __webpack_require__(8)
	  , Iterators      = __webpack_require__(39)
	  , $iterCreate    = __webpack_require__(40)
	  , setToStringTag = __webpack_require__(53)
	  , getPrototypeOf = __webpack_require__(7)
	  , ITERATOR       = __webpack_require__(54)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';

	var returnThis = function(){ return this; };

	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 37 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(18);

/***/ },
/* 39 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(41)
	  , descriptor     = __webpack_require__(27)
	  , setToStringTag = __webpack_require__(53)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(18)(IteratorPrototype, __webpack_require__(54)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(20)
	  , dPs         = __webpack_require__(42)
	  , enumBugKeys = __webpack_require__(51)
	  , IE_PROTO    = __webpack_require__(9)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(25)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(52).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};

	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(19)
	  , anObject = __webpack_require__(20)
	  , getKeys  = __webpack_require__(43);

	module.exports = __webpack_require__(23) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(44)
	  , enumBugKeys = __webpack_require__(51);

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(8)
	  , toIObject    = __webpack_require__(45)
	  , arrayIndexOf = __webpack_require__(48)(false)
	  , IE_PROTO     = __webpack_require__(9)('IE_PROTO');

	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(46)
	  , defined = __webpack_require__(6);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(47);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 47 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(45)
	  , toLength  = __webpack_require__(49)
	  , toIndex   = __webpack_require__(50);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(35)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(35)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 51 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(11).document && document.documentElement;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(19).f
	  , has = __webpack_require__(8)
	  , TAG = __webpack_require__(54)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(10)('wks')
	  , uid        = __webpack_require__(12)
	  , Symbol     = __webpack_require__(11).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(56);
	var global        = __webpack_require__(11)
	  , hide          = __webpack_require__(18)
	  , Iterators     = __webpack_require__(39)
	  , TO_STRING_TAG = __webpack_require__(54)('toStringTag');

	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(57)
	  , step             = __webpack_require__(58)
	  , Iterators        = __webpack_require__(39)
	  , toIObject        = __webpack_require__(45);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(36)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 57 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 58 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(54);

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(61), __esModule: true };

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(62);
	__webpack_require__(73);
	__webpack_require__(74);
	__webpack_require__(75);
	module.exports = __webpack_require__(15).Symbol;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(11)
	  , has            = __webpack_require__(8)
	  , DESCRIPTORS    = __webpack_require__(23)
	  , $export        = __webpack_require__(14)
	  , redefine       = __webpack_require__(38)
	  , META           = __webpack_require__(63).KEY
	  , $fails         = __webpack_require__(24)
	  , shared         = __webpack_require__(10)
	  , setToStringTag = __webpack_require__(53)
	  , uid            = __webpack_require__(12)
	  , wks            = __webpack_require__(54)
	  , wksExt         = __webpack_require__(59)
	  , wksDefine      = __webpack_require__(64)
	  , keyOf          = __webpack_require__(65)
	  , enumKeys       = __webpack_require__(66)
	  , isArray        = __webpack_require__(69)
	  , anObject       = __webpack_require__(20)
	  , toIObject      = __webpack_require__(45)
	  , toPrimitive    = __webpack_require__(26)
	  , createDesc     = __webpack_require__(27)
	  , _create        = __webpack_require__(41)
	  , gOPNExt        = __webpack_require__(70)
	  , $GOPD          = __webpack_require__(72)
	  , $DP            = __webpack_require__(19)
	  , $keys          = __webpack_require__(43)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;

	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });

	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(71).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(68).f  = $propertyIsEnumerable;
	  __webpack_require__(67).f = $getOwnPropertySymbols;

	  if(DESCRIPTORS && !__webpack_require__(37)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});

	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(18)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(12)('meta')
	  , isObject = __webpack_require__(21)
	  , has      = __webpack_require__(8)
	  , setDesc  = __webpack_require__(19).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(24)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(11)
	  , core           = __webpack_require__(15)
	  , LIBRARY        = __webpack_require__(37)
	  , wksExt         = __webpack_require__(59)
	  , defineProperty = __webpack_require__(19).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(43)
	  , toIObject = __webpack_require__(45);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(43)
	  , gOPS    = __webpack_require__(67)
	  , pIE     = __webpack_require__(68);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 67 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 68 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(47);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(45)
	  , gOPN      = __webpack_require__(71).f
	  , toString  = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};

	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(44)
	  , hiddenKeys = __webpack_require__(51).concat('length', 'prototype');

	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(68)
	  , createDesc     = __webpack_require__(27)
	  , toIObject      = __webpack_require__(45)
	  , toPrimitive    = __webpack_require__(26)
	  , has            = __webpack_require__(8)
	  , IE8_DOM_DEFINE = __webpack_require__(22)
	  , gOPD           = Object.getOwnPropertyDescriptor;

	exports.f = __webpack_require__(23) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 73 */
/***/ function(module, exports) {

	

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(64)('asyncIterator');

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(64)('observable');

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _setPrototypeOf = __webpack_require__(77);

	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

	var _create = __webpack_require__(81);

	var _create2 = _interopRequireDefault(_create);

	var _typeof2 = __webpack_require__(30);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
	  }

	  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
	};

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(78), __esModule: true };

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(79);
	module.exports = __webpack_require__(15).Object.setPrototypeOf;

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(14);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(80).set});

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(21)
	  , anObject = __webpack_require__(20);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(16)(Function.call, __webpack_require__(72).f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(82), __esModule: true };

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(83);
	var $Object = __webpack_require__(15).Object;
	module.exports = function create(P, D){
	  return $Object.create(P, D);
	};

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(14)
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', {create: __webpack_require__(41)});

/***/ },
/* 84 */
/***/ function(module, exports) {

	module.exports = require("d3");

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	var _typeof2 = __webpack_require__(30);

	var _typeof3 = _interopRequireDefault(_typeof2);

	var _values = __webpack_require__(86);

	var _values2 = _interopRequireDefault(_values);

	var _keys = __webpack_require__(90);

	var _keys2 = _interopRequireDefault(_keys);

	var _taggedTemplateLiteral2 = __webpack_require__(93);

	var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

	var _templateObject = (0, _taggedTemplateLiteral3.default)(['to["', '"].call(this,d,i)'], ['to["', '"].call(this,d,i)']),
	    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['', ''], ['', '']),
	    _templateObject3 = (0, _taggedTemplateLiteral3.default)(['this["', '"]'], ['this["', '"]']),
	    _templateObject4 = (0, _taggedTemplateLiteral3.default)(['d3.interpolate(s', ',v', ');'], ['d3.interpolate(s', ',v', ');']),
	    _templateObject5 = (0, _taggedTemplateLiteral3.default)(['n'], ['n']);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var d3 = global.d3 || __webpack_require__(84);
	var Types = __webpack_require__(100),
	    float = Types.float,
	    int = Types.int;

	module.exports = function (selection) {
	    return new c2_Animate(selection);
	};
	module.exports.remove = function (item) {
	    var transition = item._c2_transition;
	    var p, tweens, tween_group, i, ln;

	    for (p in transition) {
	        tweens = transition[p];
	        tween_group = tweens.tween_group;

	        //TODO if tweens onEnd/remove - remove tweens from eventGroup
	        if (tweens.end_index !== -1) {
	            tweens.end_group[tweens.end_index] = 0;
	        }
	        for (i = 0, ln = tweens.length; i < ln; i++) {
	            tween_group[tweens[i]] = 0;
	        }

	        if (tween_group.cnt !== 0 && (tween_group.cnt -= ln) <= 0) {
	            tween_group.cnt = tween_group.length = 0;
	        }
	    }
	    item._c2_transition = false;
	    return module.exports;
	};

	//default d3 ease,delay,duration function
	var invalidate = __webpack_require__(101),
	    DEFAULT_EASE = function easeCubicInOut(t) {
	    return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
	},
	    DEFAULT_DELAY = 0,
	    DEFAULT_DURATION = 250,
	    isChrome = typeof navigator !== 'undefined' && /Chrome/.test(navigator.userAgent);

	//var animateIds=1;
	function c2_Animate(name) {

	    function animation(selection) {
	        var compiled;
	        if (animation._to && (compiled = animation._compile(selection))) {
	            //animation._id = Object.keys(animation._to).map()
	            animation.tween('', compiled);
	        }
	        //if (animation._to && (compiled = animation._compile(selection))) {
	        //animation.tween('',compiled);
	        //}
	        pending[pending_cnt++] = {
	            'selection': selection,
	            'animation': animation
	        };
	        !c2_timer_running && (c2_timer_running = true, invalidate.nextCalculate(start_c2_timer));
	        //!c2_timer_running && (c2_timer_running = true,setTimeout(start_c2_timer));
	        //!c2_timer_running && (c2_timer_running = true,requestAnimationFrame(start_c2_timer));
	    }
	    //animation._id = animateIds++;
	    animation._name = name || '';
	    animation._ease = DEFAULT_EASE;
	    animation._delay = DEFAULT_DELAY;
	    animation._duration = DEFAULT_DURATION;
	    animation._tween_map = {};
	    //animation._to = {};
	    animation._compiled = {};
	    animation._compiled_fn = undefined;
	    //TODO do we need from?
	    //animation._from = {};
	    //TODO to should allow chaining
	    animation._tweens = [];

	    animation._compile = c2_compile;
	    animation.duration = c2_duration;
	    animation.delay = c2_delay;
	    animation.ease = c2_ease;
	    animation.tween = c2_tween;
	    animation._remove = false;
	    //animation.from = c2_from;
	    animation.to = c2_to;
	    animation.on = c2_on;

	    animation.remove = c2_remove;

	    //TODO for chaining
	    //animation.animate;

	    //TODO events + iteration
	    //animation.each


	    //this._selection = selection;

	    //console.error(animation);
	    return animation;
	}
	function c2_duration(duration) {
	    if (arguments.length) {
	        this._duration = duration;
	        return this;
	    }
	    return this._duration;
	}
	function c2_delay(delay) {
	    if (arguments.length) {
	        this._delay = delay;
	        return this;
	    }
	    return this._delay;
	}
	function c2_ease(ease) {
	    if (arguments.length) {
	        this._ease = ease;
	        return this;
	    }
	    return this._ease;
	}

	function c2_remove() {
	    this._remove = true;
	    return this;
	}
	function c2_on(name, fn) {
	    //i think we can just hook into event system by passing an additional tween that only does something
	    //when t === 1, the only issue i see is that this woudl exist for all nodes -- if we use id like d3.transition,
	    //because each node needs a delay and duration - which means every node could be removed at a different time
	    if (name === 'end') {
	        !this._on_end && (this._on_end = [fn]) || this._on_end.push(fn);
	    } else if (name === 'start') {
	        !this._on_start && (this._on_start = [fn]) || this._on_start.push(fn);
	    }
	    return this;
	}

	//further optimize by compiling animations per prototype
	function c2_compile_proto(item, id, keys, values) {
	    if (item.constructor._compiled && item.constructor._compiled[id]) {
	        return this._compiled[id];
	    }

	    var vars = ['var me=this'],
	        vars2 = [],
	        interpolators = [],
	        tween = [],
	        compiled,
	        key,
	        value,
	        attr,
	        is_num,
	        s,
	        result,
	        s_inner;

	    if (!(compiled = item.constructor._compiled)) {
	        compiled = item.constructor._compiled = {};
	    }

	    for (var i = 0, ln = keys.length; i < ln; i++) {
	        key = keys[i];
	        value = values[i];
	        attr = item.constructor._attributes[key];
	        is_num = attr === Types.float || attr === Types.int;
	        vars.push('v' + i + '=' + (typeof value === 'function' ? attr.animateValue(_templateObject, key) : attr.animateValue(_templateObject2, value)),
	        //`v${cnt}=typeof to["${key}"] === function ? ${attr.animateValue`to["${key}"].call(this,d,i)`} : ${attr.animateValue`to["${key}"]`}`,
	        's' + i + '=' + attr.animateValue(_templateObject3, key));
	        vars2.push('v' + i, 's' + i);

	        interpolators.push(is_num ? 's' + i + '=s' + i + '||0;v' + i + '-=s' + i + ';' : 'v' + i + '=' + attr.animateValue(_templateObject4, i, i));
	        tween.push(is_num ? 'n=(s' + i + '+v' + i + '*t);' : 'n=v' + i + '(t);',
	        //is_num ? `me["${key}"]=s${i}+v${i}*t;` : `me["${key}"]=${attr.animateValue`v${i}(t)`}`
	        'n!==me["' + key + '"] && (me["' + key + '"]=' + attr.animateValue(_templateObject5) + ',!c && (c=true));');
	    }
	    s_inner = 'var n,c=false;\n            ' + tween.join('') + ';\n            c && ((me.children && me._not_invalid_) || (me.parentNode && me.parentNode._not_invalid_)) && me.invalidate();';
	    if (isChrome) {
	        //s = new Function('t','me',...vars2,s_inner);
	        s = (0, eval)('(function () {\n            return function (t,me,' + vars2.join(',') + ') {\n                ' + s_inner + ';\n            }\n        })')();
	    }
	    //problem we are seeing is the amount of garbage accrued in high volume due to scoped functions
	    //result = (0,eval)(`(function (${isChrome && 's,' || '' }d3) {
	    //result = (eval)(`(function (s) {
	    //result = new Function('s',`
	    result = (0, eval)('(function (s) {\n        return function (to,d,i) {\n            ' + vars.join(',') + ';\n            ' + interpolators.join('') + '\n            return function (t) {\n                ' + (isChrome && 's(t,me,' + vars2.join(',') + ')' || s_inner) + ';\n            };\n        }\n    })')(s);

	    //result.s = s;
	    //window.values = values;
	    //window.s = s;
	    //compiled[id] = result;
	    //result = isChrome && result(s,d3) || result(d3);
	    //result.values = values;
	    //console.error(result);

	    return compiled[id] = result;
	}
	function c2_compile() {
	    var to = this._to,
	        keys = (0, _keys2.default)(to),
	        values = (0, _values2.default)(to);
	    var id = keys.length ? keys[0] + '=' + (typeof values[0] === 'function' && '@' || values[0]) : '';
	    for (var i = 1, ln = keys.length; i < ln; i++) {
	        id += '&' + keys[i] + '=' + (typeof values[i] === 'function' && '@' || values[i]);
	    }
	    return function (d, i) {
	        var fn;
	        if (this.constructor._compiled && this.constructor._compiled[id]) {
	            fn = this.constructor._compiled[id];
	            return this.constructor._compiled[id].call(this, to, d, i);
	        } else {
	            return c2_compile_proto(this, id, keys, values).call(this, to, d, i);
	        }
	        return fn.call(this, to, d, i);
	    };
	}
	//TODO we need to separate the on_end and remove logic from compile and either put it into tween or hook it directly into 
	//the scheduler
	function c2_compile3() {
	    var p,
	        to = this._to,
	        result = '(function (to,s,d3) {return function (d,i) {',
	        vars = ['var me=this'],
	        vars2 = [],
	        interpolators = [],
	        tween = [],
	        compiled = this._compiled,
	        not_same = false,
	        cnt = 0;

	    if (compiled) {
	        for (p in to) {
	            if (compiled[p] !== to[p]) {
	                not_same = true;
	                break;
	            }
	        }
	        if (not_same === false) {
	            return this._compiled_fn;
	        }
	    }

	    compiled = this._compiled = {};
	    //right now tween is a function -- we want to try the following
	    //[ln,property,v,t,s,instance,] //instance comes from parent -- shoudl be uneeded


	    for (p in to) {
	        compiled[p] = to[p];
	        vars.push('v' + cnt + '=' + (typeof to[p] === 'function' && 'to["' + p + '"].call(this,d,i)' || 'to["' + p + '"]'), 't' + cnt + '=typeof v' + cnt + ' === "number"', 's' + cnt + '=this["' + p + '"]');
	        vars2.push('v' + cnt, 't' + cnt, 's' + cnt);
	        interpolators.push('if (t' + cnt + ') {s' + cnt + '=s' + cnt + '||0;v' + cnt + '-=s' + cnt + ';} else {v' + cnt + '=d3.interpolate(s' + cnt + ',v' + cnt + ');}');
	        //tween.push ('if (t'+cnt+') me["'+p+'"]=s'+cnt+'+v'+cnt+'*t; else me["'+p+'"]=v'+cnt+'(t);');
	        tween.push('if (t' + cnt + ') n=s' + cnt + '+v' + cnt + '*t; else n=v' + cnt + '(t); n!==me["' + p + '"] && (me["' + p + '"]=n,!c && (c=true));');
	        cnt++;
	    }
	    var s = (0, eval)('\n        (function (t,me,d3,' + vars2.join(',') + ') {var n,c=false;\n                ' + tween.join('') + ';\n            c && ((me.children && me._not_invalid_) || (me.parentNode && me.parentNode._not_invalid_)) && me.invalidate();\n        })\n    ');
	    /*
	     *s2 = (0,eval)(`(function (t) {
	     *    s(t,this,${vars2.join(',')});
	     *})`)
	     */
	    //shared2 = function (t,);
	    result += vars.join(',') + ';';
	    result += interpolators.join('');
	    result += isChrome ? 'return function (t) {s(t,me,d3,' + vars2.join(',') + ')};' : 'return function (t) {var n,c=false;\n        ' + tween.join('') + ';\n        c && ((me.children && me._not_invalid_) || (me.parentNode && me.parentNode._not_invalid_)) && me.invalidate();\n    }';
	    //result += 'return function (t) {';
	    //vars2.join(',') + ';';

	    //result += tween.join('');
	    //result += '(me.children && me._not_invalid_) || (me.parentNode && me.parentNode._not_invalid_) && me._invalidate();'
	    //result += 'm._not_invalid_&&m.parentNode &&m._invalidate();';
	    //result += 'm._invalidate();';
	    //result += '}';
	    //result += `return shared.bind(me,t,me,${vars2.join(',')})`
	    //result += 'return function () {}'

	    result += '}})';
	    return this._compiled_fn = (0, eval)(result)(to, s, c2.d3);
	}

	function c2_compile2() {
	    var p,
	        v,
	        to = this._to,
	        tod = [(0, _keys2.default)(to).length * 4, 'this'];
	    for (p in to) {
	        v = to[p];
	        tod.push(
	        //t
	        '(v=' + (typeof v === 'function' && 'to["' + p + '"].call(this,d,i)' || 'to["' + p + '"]') + ',t=(typeof v === \'number\'))',
	        //s
	        's = this["' + p + '"]',
	        //v
	        't?(v-=s):d3.interpolate(s,v)',
	        //t
	        '"' + p + '"');
	    }
	    return this._compiled_fn = eval('(function (d,i) {\n        var s,v,t;\n        return [' + tod.join(',\n') + '];\n    })');
	}

	function c2_to(name, value) {
	    if (!this._to) {
	        this._to = {};
	    }
	    if (arguments.length > 1) {
	        this._to[name] = value;
	    } else if ((typeof name === 'undefined' ? 'undefined' : (0, _typeof3.default)(name)) === 'object') {
	        var p;
	        for (p in name) {
	            this._to[p] = name[p];
	        }
	    }
	    return this;
	}
	//TODO animation chaining
	function c2_animate_Animate() {}
	//var animate = c2_Animate();
	//this.on('end',function () {
	//add ended nodes
	//})


	//probably do some variation of to2 in each statement (groups of 1ish)
	function c2_to2(name, value) {
	    if (arguments.length > 1) {
	        if (typeof value === 'function') {
	            return this.tween('attr.' + name, function (d, i, g) {
	                var me = this,
	                    v = value.call(this, d, i, g),
	                    s = this[name];
	                if (typeof v === 'number') {
	                    s = s || 0;
	                    v -= s;
	                    return function (t) {
	                        var m = me;
	                        m[name] = s + v * t;
	                        m._invalid_ === false && m.invalidate();
	                    };
	                } else {
	                    v = d3.interpolate(s, v);
	                    return function (t) {
	                        var m = me;
	                        m[name] = v(t);
	                        m._invalid_ === false && m.invalidate();
	                    };
	                }
	            });
	        } else {
	            return this.tween('attr.' + name, function () {
	                var me = this,
	                    v = value,
	                    s = this[name];
	                if (typeof v === 'number' && typeof s === 'number') {
	                    return function (t) {
	                        var m = me;
	                        m[name] = s + v * t;
	                        m._invalid_ === false && m.invalidate();
	                    };
	                } else {
	                    v = d3.interpolate(s, v);
	                    return function (t) {
	                        var m = me;
	                        m[name] = v(t);
	                        m._invalid_ === false && m.invalidate();
	                    };
	                }
	            });
	        }
	    } else {
	        if ((typeof name === 'undefined' ? 'undefined' : (0, _typeof3.default)(name)) === 'object') {
	            var p;
	            for (p in name) {
	                this.to(p, name[p]);
	            }
	            return this;
	        }
	        return this.tween(name);
	    }
	}
	function c2_tween(name, tween) {
	    var index;
	    if (arguments.length > 1) {
	        if (index = this._tween_map[name]) {
	            this._tweens[index] = tween;
	        } else {
	            this._tween_map[name] = this._tweens.push(tween) - 1;
	        }
	        return this;
	    } else {
	        return this._tweens[this._tween_map[name]] || null;
	    }
	}

	var start_durations = [],
	    available_start_indices = [],
	    available_invalid = true,
	    ordered_available = [],
	    ordered_available_cnt = 0,
	    ordered_available_start = 0,
	    start_duration_end_index = -1,
	    start_duration_start_index = 0,
	    ease_groups = [],
	    pending = [],
	    pending_cnt = 0,
	    start_duration_map = {},
	    c2_timer_running = false;

	function add_pending(date) {
	    var i,
	        ln,
	        j,
	        jln,
	        k,
	        kln,
	        m,
	        mln,
	        groups,
	        group,
	        item,
	        tween_group,
	        tweens,
	        delay,
	        duration,
	        ease,
	        _delay,
	        _duration,
	        delay_is_fn,
	        duration_is_fn,
	        _ease_groups = ease_groups,
	        _pending = pending,
	        _tweens,
	        _name,
	        _remove,
	        _end,
	        ease_group,
	        names,
	        endGroup,
	        start_duration_key,
	        index,
	        stamp = date,
	        animation,
	        bundle,
	        selection;

	    if (start_duration_end_index === -1) {
	        if (available_invalid) {
	            available_invalid = false;
	            ordered_available_start = ordered_available_cnt = 0;
	        }
	    } else if (available_invalid) {
	        available_invalid = false;
	        if (start_duration_end_index === -1) {
	            ordered_available_start = ordered_available_cnt = 0;
	        } else {
	            ordered_available_start = ordered_available_cnt = 0;
	            for (i = start_duration_start_index / 2, ln = (start_duration_end_index + 1) / 2; i < ln; i++) {
	                if (available_start_indices[i]) {
	                    ordered_available[ordered_available_cnt++] = i * 2;
	                }
	            }
	        }
	    }
	    for (i = 0, ln = pending_cnt; i < ln; i++) {
	        bundle = _pending[i];
	        animation = bundle.animation;
	        selection = bundle.selection;
	        selection._started = true;
	        groups = selection._groups;
	        _delay = animation._delay;
	        _duration = animation._duration;
	        _tweens = animation._tweens;
	        _name = animation._name;
	        _remove = animation._remove;
	        _end = animation._on_end;

	        ease = animation._ease;

	        delay_is_fn = typeof _delay === 'function';
	        duration_is_fn = typeof _duration === 'function';

	        for (j = 0, jln = groups.length; j < jln; j++) {
	            group = groups[j];
	            for (k = 0, kln = group.length; k < kln; k++) {
	                if (item = group[k]) {
	                    if (names = item._c2_transition) {
	                        if (tweens = names[_name]) {
	                            tween_group = tweens.tween_group;

	                            //TODO if tweens onEnd/remove - remove tweens from eventGroup
	                            if (tweens.end_index !== -1) {
	                                tweens.end_group[tweens.end_index] = 0;
	                            }

	                            for (m = 0, mln = tweens.length; m < mln; m++) {
	                                tween_group[tweens[m]] = 0;
	                            }

	                            if (tween_group.cnt !== 0 && (tween_group.cnt -= mln) <= 0) {
	                                tween_group.cnt = tween_group.length = 0;
	                            }
	                        }
	                    }
	                    if (delay_is_fn) {
	                        delay = stamp + _delay.call(item, item.__data__, k, group);
	                    } else {
	                        delay = stamp + _delay;
	                    }
	                    if (duration_is_fn) {
	                        duration = _duration.call(item, item.__data__, k, group);
	                    } else {
	                        duration = _duration;
	                    }
	                    start_duration_key = delay + '-' + duration;
	                    if (!(ease_group = start_duration_map[start_duration_key])) {
	                        if (ordered_available_cnt) {
	                            index = ordered_available[ordered_available_start++];
	                            ordered_available_cnt--;
	                            available_start_indices[index / 2] = 0;
	                        } else if (start_duration_start_index > 0) {
	                            index = start_duration_start_index -= 2;
	                            available_start_indices[index / 2] = 0;
	                        } else {
	                            index = (start_duration_end_index += 2) - 1;
	                            available_start_indices[index / 2] = 0;
	                        }

	                        //undefined is for the event group, which may or may not exist
	                        ease_group = _ease_groups[index / 2] = start_duration_map[start_duration_key] = [undefined, ease, tween_group = []];
	                        tween_group.cnt = 0;

	                        start_durations[index] = delay;
	                        start_durations[++index] = duration;
	                        //if (index > start_duration_end_index) {
	                        //start_duration_end_index = index;
	                        //}
	                    } else {
	                        index = ease_group.indexOf(ease);
	                        if (index !== -1) {
	                            tween_group = ease_group[index + 1];
	                        } else {
	                            ease_group.push(ease, tween_group = []);
	                            tween_group.cnt = 0;
	                        }
	                    }
	                    names = item._c2_transition;
	                    if (!names) {
	                        names = item._c2_transition = {};
	                    }
	                    tweens = names[_name] = new Array(_tweens.length);
	                    tweens.tween_group = tween_group;
	                    tweens.node = item;
	                    if (_remove || _end) {
	                        tweens.remove = _remove;
	                        tweens.end = _end;
	                        tweens.index = k;
	                        if (!(endGroup = ease_group[0])) {
	                            tweens.end_group = ease_group[0] = [tweens];
	                            tweens.end_index = 0;
	                        } else {
	                            tweens.end_index = endGroup.push(tweens) - 1;
	                            tweens.end_group = endGroup;
	                        }
	                    } else {
	                        tweens.end_index = -1;
	                    }

	                    //TODO --

	                    //}
	                    for (m = 0, mln = _tweens.length; m < mln; m++) {
	                        tweens[m] = tween_group.push(_tweens[m].call(item, item.__data__, k, group)) - 1;
	                    }
	                    tween_group.cnt += mln;
	                }
	            }
	        }
	        _pending[i] = undefined;
	    }
	    pending_cnt = 0;
	    //console.error(new Date()-stamp);
	}

	function start_c2_timer() {
	    var i,
	        ln,
	        j,
	        jln,
	        group,
	        g,
	        k,
	        kln,
	        end,
	        item,
	        date = Date.now(),
	        start = 0,
	        t = 0,
	        e = 0,
	        ease_value,
	        duration,
	        tween,
	        tweens,
	        cleanup = 0,
	        cleanup_start,
	        cleanup_end,
	        n = 0;
	    //sd=Date.now()

	    //first check pending
	    if (pending_cnt) {
	        //console.error('add');
	        add_pending(date);
	    }

	    //console.error(start_duration_start_index,start_duration_end_index);
	    if (start_duration_end_index > 0) {
	        for (i = start_duration_start_index, j = 0, g = i / 2, ln = start_duration_end_index; i < ln; g++, i = g << 1) {
	            n = i + 1;
	            //,n=i+1
	            start = start_durations[i];
	            if (start !== -1 && date > start) {
	                duration = start_durations[n];
	                if (duration > 0) {
	                    t = (date - start) / duration;
	                    t >= 1 && (e = t = 1);
	                    if (group = ease_groups[g]) {
	                        for (j = 1, jln = group.length; j < jln; j += 2) {
	                            tweens = group[j + 1];
	                            if (kln = tweens.length) {
	                                ease_value = group[j](t);
	                                for (k = 0, kln = tweens.length; k < kln; k++) {
	                                    if (tween = tweens[k]) {
	                                        tween(ease_value);
	                                    }
	                                    //(tween = tweens[k]) && tween(ease_value);
	                                }
	                            }
	                        }
	                    }
	                } else {
	                    e = 1;
	                }
	                if (e) {
	                    e = 0;
	                    !available_invalid && (available_invalid = true);
	                    available_start_indices[g] = 1;
	                    if (group = group[0]) {
	                        for (j = 0, jln = group.length; j < jln; j++) {
	                            if (tweens = group[j]) {
	                                item = tweens.node;
	                                item._c2_transition = null;
	                                if (end = tweens.end) {
	                                    for (k = 0, kln = end.length; k < kln; k++) {
	                                        end[k].call(item, item.__data__, tweens.index);
	                                    }
	                                }
	                                if (tweens.remove) {
	                                    item.parentNode && item.parentNode.removeChild(item);
	                                }
	                            }
	                        }
	                    }
	                    delete start_duration_map[start_durations[i] + '-' + start_durations[n]];
	                    start_durations[i] = start_durations[n] = -1;
	                    ease_groups[g] = null;
	                    if (n === start_duration_end_index) {
	                        cleanup = cleanup_end = true;
	                    }
	                    if (i === start_duration_start_index) {
	                        cleanup = cleanup_start = true;
	                    }
	                }
	            }
	        }
	        if (cleanup) {
	            if (cleanup_end) {
	                for (i = start_duration_end_index - 1; i >= start_duration_start_index; i -= 2) {
	                    if (start_durations[i] !== -1) {
	                        start_duration_end_index = i + 1;
	                        break;
	                    }
	                }
	                if (i < start_duration_start_index) {
	                    start_duration_end_index = -1;console.error('done');
	                };
	            }
	            //update start index
	            if (cleanup_start) {
	                for (i = start_duration_start_index; i <= start_duration_end_index; i += 2) {
	                    if (start_durations[i] !== -1) {
	                        //console.error('updated?',i);
	                        start_duration_start_index = i;
	                        break;
	                    }
	                }
	                if (i > start_duration_end_index || start_duration_start_index < 0) start_duration_start_index = 0;
	            }
	        }
	    }
	    //console.error(new Date() - date);

	    if (pending_cnt > 0 || start_duration_end_index > 0) {
	        //requestAnimationFrame(start_c2_timer);
	        invalidate.nextCalculate(start_c2_timer);
	    } else {
	        c2_timer_running = false;
	    }
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(87), __esModule: true };

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(88);
	module.exports = __webpack_require__(15).Object.values;

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/tc39/proposal-object-values-entries
	var $export = __webpack_require__(14)
	  , $values = __webpack_require__(89)(false);

	$export($export.S, 'Object', {
	  values: function values(it){
	    return $values(it);
	  }
	});

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(43)
	  , toIObject = __webpack_require__(45)
	  , isEnum    = __webpack_require__(68).f;
	module.exports = function(isEntries){
	  return function(it){
	    var O      = toIObject(it)
	      , keys   = getKeys(O)
	      , length = keys.length
	      , i      = 0
	      , result = []
	      , key;
	    while(length > i)if(isEnum.call(O, key = keys[i++])){
	      result.push(isEntries ? [key, O[key]] : O[key]);
	    } return result;
	  };
	};

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(91), __esModule: true };

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(92);
	module.exports = __webpack_require__(15).Object.keys;

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(5)
	  , $keys    = __webpack_require__(43);

	__webpack_require__(13)('keys', function(){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperties = __webpack_require__(94);

	var _defineProperties2 = _interopRequireDefault(_defineProperties);

	var _freeze = __webpack_require__(97);

	var _freeze2 = _interopRequireDefault(_freeze);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (strings, raw) {
	  return (0, _freeze2.default)((0, _defineProperties2.default)(strings, {
	    raw: {
	      value: (0, _freeze2.default)(raw)
	    }
	  }));
	};

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(95), __esModule: true };

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(96);
	var $Object = __webpack_require__(15).Object;
	module.exports = function defineProperties(T, D){
	  return $Object.defineProperties(T, D);
	};

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(14);
	// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
	$export($export.S + $export.F * !__webpack_require__(23), 'Object', {defineProperties: __webpack_require__(42)});

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(98), __esModule: true };

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(99);
	module.exports = __webpack_require__(15).Object.freeze;

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.5 Object.freeze(O)
	var isObject = __webpack_require__(21)
	  , meta     = __webpack_require__(63).onFreeze;

	__webpack_require__(13)('freeze', function($freeze){
	  return function freeze(it){
	    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
	  };
	});

/***/ },
/* 100 */
/***/ function(module, exports) {

	'use strict';

	var join = function join(strings) {
	    var result = '',
	        parts_ln = arguments.length <= 1 ? 0 : arguments.length - 1;
	    for (var i = 0, ln = strings.length; i < ln; i++) {
	        result += strings[i];
	        if (i < parts_ln) {
	            result += arguments.length <= i + 1 ? undefined : arguments[i + 1];
	        }
	    }
	    return result;
	};
	module.exports = {
	    int: {
	        defaultValue: 0,
	        setValue: function setValue(strings) {
	            for (var _len = arguments.length, parts = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	                parts[_key - 1] = arguments[_key];
	            }

	            return join.apply(undefined, [strings].concat(parts)) + '|0';
	        },
	        animateValue: function animateValue(strings) {
	            for (var _len2 = arguments.length, parts = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	                parts[_key2 - 1] = arguments[_key2];
	            }

	            return join.apply(undefined, [strings].concat(parts)) + '|0';
	        }
	    },
	    float: {
	        defaultValue: 0.0,
	        setValue: function setValue(strings) {
	            for (var _len3 = arguments.length, parts = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	                parts[_key3 - 1] = arguments[_key3];
	            }

	            return '+' + join.apply(undefined, [strings].concat(parts));
	        },
	        animateValue: function animateValue(strings) {
	            for (var _len4 = arguments.length, parts = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
	                parts[_key4 - 1] = arguments[_key4];
	            }

	            return '+' + join.apply(undefined, [strings].concat(parts));
	        }
	    },
	    string: {
	        defaultValue: '',
	        setValue: function setValue(strings) {
	            for (var _len5 = arguments.length, parts = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
	                parts[_key5 - 1] = arguments[_key5];
	            }

	            return '' + join.apply(undefined, [strings].concat(parts));
	        },
	        animateValue: function animateValue(strings) {
	            for (var _len6 = arguments.length, parts = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
	                parts[_key6 - 1] = arguments[_key6];
	            }

	            return '' + join.apply(undefined, [strings].concat(parts));
	        }
	    },
	    object: {
	        defaultValue: null,
	        setValue: function setValue(strings) {
	            for (var _len7 = arguments.length, parts = Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
	                parts[_key7 - 1] = arguments[_key7];
	            }

	            return '' + join.apply(undefined, [strings].concat(parts));
	        },
	        animateValue: function animateValue(strings) {
	            for (var _len8 = arguments.length, parts = Array(_len8 > 1 ? _len8 - 1 : 0), _key8 = 1; _key8 < _len8; _key8++) {
	                parts[_key8 - 1] = arguments[_key8];
	            }

	            return '' + join.apply(undefined, [strings].concat(parts));
	        }
	    },
	    array: {
	        defaultValue: null,
	        setValue: function setValue(strings) {
	            for (var _len9 = arguments.length, parts = Array(_len9 > 1 ? _len9 - 1 : 0), _key9 = 1; _key9 < _len9; _key9++) {
	                parts[_key9 - 1] = arguments[_key9];
	            }

	            return '' + join.apply(undefined, [strings].concat(parts));
	        },
	        animateValue: function animateValue(strings) {
	            for (var _len10 = arguments.length, parts = Array(_len10 > 1 ? _len10 - 1 : 0), _key10 = 1; _key10 < _len10; _key10++) {
	                parts[_key10 - 1] = arguments[_key10];
	            }

	            return '' + join.apply(undefined, [strings].concat(parts));
	        }
	    },
	    any: {
	        defaultValue: null,
	        setValue: function setValue(strings) {
	            for (var _len11 = arguments.length, parts = Array(_len11 > 1 ? _len11 - 1 : 0), _key11 = 1; _key11 < _len11; _key11++) {
	                parts[_key11 - 1] = arguments[_key11];
	            }

	            return '' + join.apply(undefined, [strings].concat(parts));
	        },
	        animateValue: function animateValue(strings) {
	            for (var _len12 = arguments.length, parts = Array(_len12 > 1 ? _len12 - 1 : 0), _key12 = 1; _key12 < _len12; _key12++) {
	                parts[_key12 - 1] = arguments[_key12];
	            }

	            return '' + join.apply(undefined, [strings].concat(parts));
	        }
	    }
	};

/***/ },
/* 101 */
/***/ function(module, exports) {

	'use strict';

	var invalid_parents = [],
	    invalid_cleanup = [],
	    invalid_children = [],
	    frame = typeof requestAnimationFrame !== 'undefined' ? requestAnimationFrame : setTimeout;

	var calculate,
	    in_frame = false,
	    waiting_calculate = false,
	    scheduled_next,
	    recheck;

	invalid_children.index = invalid_parents.index = invalid_cleanup.index = 0;

	function c2_invalidate() {
	    if (!c2_invalidate.scheduled_next) {
	        c2_invalidate.scheduled_next = true;
	        //scheduled_next = true;
	        //c2_invalidate.t2 = true;
	        //scheduled_next = true;
	        //c2_do_invalidate();
	        frame(c2_frame_invalidator);
	    }
	}
	c2_invalidate.scheduled_next = false;

	function c2_frame_invalidator() {
	    c2_invalidate.scheduled_next = false;
	    in_frame = true;
	    recheck = false;
	    if (calculate) {
	        var fn = calculate;
	        calculate = false;
	        fn();
	    }
	    c2_do_invalidate();
	    in_frame = false;
	}

	c2_invalidate.nextCalculate = function (fn) {
	    if (calculate) {
	        return;
	    }
	    calculate = fn;
	    c2_invalidate();
	};

	var last = 0;
	function c2_do_invalidate() {
	    var start = new Date();
	    //console.error('f',new Date()-last);

	    var parents = invalid_parents,
	        cleanup = invalid_cleanup,
	        children = invalid_children,
	        j,
	        jln,
	        c = 0,
	        k,
	        i,
	        ln,
	        items,
	        cnt,
	        item;

	    for (i = 0, ln = children.index; i < ln; i++) {
	        item = children[i];
	        items = item.children;
	        for (j = k = item._invalid_children_, cnt = 0, jln = items.length; k < jln; j++, k++) {
	            item = items[k];
	            if (!item) {
	                while (!item && k < jln) {
	                    c++;
	                    item = items[++k];
	                }
	            }
	            if (c > -1 && item) {
	                items[j] = item;
	                item.parentIndex = j;
	            }
	        }
	        children[i]._invalid_children_ = -1;
	        if (items.length) {
	            items.length -= k - j;
	        }
	    }
	    children.index = 0;

	    for (i = 0, ln = parents.index; i < ln; i++) {
	        parents[i].render();
	    }

	    parents.index = 0;
	    for (i = 0, ln = cleanup.index; i < ln; i++) {
	        item = cleanup[i];
	        item._not_invalid_ = 1;
	    }

	    cleanup.index = 0;
	    //last = new Date();
	}
	c2_invalidate.timeout = false;
	c2_invalidate.parents = invalid_parents;
	c2_invalidate.cleanup = invalid_cleanup;
	c2_invalidate.children = invalid_children;

	module.exports = c2_invalidate;

/***/ },
/* 102 */
/***/ function(module, exports) {

	"use strict";

	module.exports = [];

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _classCallCheck2 = __webpack_require__(28);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(104);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var invalidator = __webpack_require__(101),
	    registry = __webpack_require__(102),
	    animate = __webpack_require__(85);

	var Base = function () {
	    function Base() {
	        (0, _classCallCheck3.default)(this, Base);

	        this.children = this.childNodes = [];
	        this._invalid_children_ = -1;
	        this._invalid_children = invalidator.children;

	        this._not_invalid_ = 1;
	        this._invalid_cleanup = invalidator.cleanup;
	        this._invalid_parents = invalidator.parents;
	        this.registry = registry;
	        this.invalidator = invalidator;
	    }

	    (0, _createClass3.default)(Base, [{
	        key: 'appendChild',
	        value: function appendChild(element) {
	            var children;

	            if (element.parentNode) {
	                element.parentNode.removeChild(element);
	            }

	            children = this.children;

	            element.parentIndex = children.push(element) - 1;
	            element.parentNode = this;

	            if (this._not_invalid_) {
	                this.invalidate();
	            }
	            return element;
	        }
	    }, {
	        key: 'insertBefore',
	        value: function insertBefore(element, referenceNode) {
	            var children, index;

	            if (element.parentNode) {
	                element.parentNode.removeChild(element);
	            }

	            children = this.children;
	            index = -1;

	            if (referenceNode && referenceNode.parentNode === this) {
	                index = children.indexOf(referenceNode);
	            }
	            if (index !== -1) {
	                element.parentIndex = index;
	                children.splice(index, 0, element);
	            } else {
	                element.parentIndex = children.push(element) - 1;
	            }
	            element.parentNode = this;

	            if (this._not_invalid_) {
	                this.invalidate();
	            }
	            return element;
	        }
	    }, {
	        key: 'removeChild',
	        value: function removeChild(element) {
	            if (element._c2_transition) {
	                animate.remove(element);
	            }

	            if (element.parentNode !== this) {
	                return undefined;
	            }

	            if (this._invalid_children_ === -1) {
	                this._invalid_children_ = element.parentIndex | 0;
	                this._invalid_children[this._invalid_children.index++] = this;
	            }
	            if (this._invalid_children_ > element.parentIndex) {
	                this._invalid_children_ = element.parentIndex;
	            }

	            if (this.children) {
	                this.children[element.parentIndex] = undefined;
	                element.parentIndex = -1;
	                element.parentNode = undefined;
	            }

	            if (this._not_invalid_) {
	                this.invalidate();
	            }
	            return element;
	        }

	        // TODO support better queries

	    }, {
	        key: 'querySelector',
	        value: function querySelector(selector) {
	            var children = this.children,
	                child,
	                result;
	            if (children) {
	                for (var i = 0, ln = children.length; i < ln; i++) {
	                    if (child = children[i]) {
	                        if (child.constructor === selector) {
	                            return child;
	                        } else if (child.children && child.children.length) {
	                            result = child.querySelector(selector);
	                            if (result) {
	                                return result;
	                            }
	                        }
	                    }
	                }
	            }
	            return null;
	        }
	    }, {
	        key: 'querySelectorAll',
	        value: function querySelectorAll(selector, passThrough) {
	            var children = this.children,
	                child,
	                result = passThrough || [];
	            if (children) {
	                for (var i = 0, ln = children.length; i < ln; i++) {
	                    if (child = children[i]) {
	                        child.constructor === selector && result.push(child);
	                        child.children && child.children.length && child.querySelectorAll(selector, result);
	                    }
	                }
	            }
	            return result;
	        }
	    }, {
	        key: 'addEventListener',
	        value: function addEventListener(name, listener) {
	            var events = this._events;
	            !events && (events = this._events = {});
	            events[name] && events[name].push(listener) || (events[name] = [listener]);
	            return true;
	        }
	    }, {
	        key: 'removeEventListener',
	        value: function removeEventListener(name, listener) {
	            var events = this._events[name],
	                index = events ? events.indexOf(listener) : -1;
	            return index !== -1 && (events.splice(index, 1), true);
	        }
	    }, {
	        key: 'setAttribute',
	        value: function setAttribute(name, value) {
	            if (this[name] !== value) {
	                this[name] = value;

	                if (this._not_invalid_) {
	                    this.invalidate();
	                }
	            }
	            //this[name] !== value && (this[name] = value,(this.children && this._not_invalid_) && (this.parentNode && this.parentNode._not_invalid_) && (this.invalidate()));
	        }
	    }, {
	        key: 'getAttribute',
	        value: function getAttribute(name) {
	            return this[name];
	        }
	    }, {
	        key: 'removeAttribute',
	        value: function removeAttribute(name) {
	            if (this[name] !== undefined) {
	                this[name] = undefined;

	                if (this._not_invalid_) {
	                    this.invalidate();
	                }
	            }
	            //this[name] !== undefined && (this[name] = undefined,(this.children && this._not_invalid_) && (this.parentNode && this.parentNode._not_invalid_) && (this.invalidate()));
	        }
	    }, {
	        key: 'render',
	        value: function render() {}
	    }, {
	        key: 'invalidate',
	        value: function invalidate() {
	            if (this.parentNode) {
	                if (this._not_invalid_) {
	                    this._invalid_cleanup[this._invalid_cleanup.index++] = this;
	                    this._not_invalid_ = 0;
	                    if (this.parentNode._not_invalid_) {
	                        this.parentNode.invalidate();
	                    }
	                }
	            } else if (this._not_invalid_) {
	                this._not_invalid_ = 0;
	                this._invalid_cleanup[this._invalid_cleanup.index++] = this;
	                this._invalid_parents[this._invalid_parents.index++] = this;
	                if (!this.invalidator.scheduled_next) {
	                    this.invalidator();
	                }
	            }
	        }
	        /*
	         *_invalidate () {
	         *    if (this.parentNode) { 
	         *        this._not_invalid_ && (
	         *            this._invalid_cleanup[this._invalid_cleanup.index++]=this,
	         *            this._not_invalid_ = 0,
	         *            this.parentNode._not_invalid_ && this.parentNode._invalidate()
	         *        )
	         *    } else if (this._not_invalid_) {
	         *        this._not_invalid_ = 0,
	         *        this._invalid_cleanup[this._invalid_cleanup.index++]=this;
	         *        this._invalid_parents[this._invalid_parents.index++]=this;
	         *        !this.invalidator.scheduled_next && this.invalidator();
	         *    }
	         *}
	         */

	    }]);
	    return Base;
	}();

	Base.prototype.invalidate.compiled = Base.prototype.invalidate.toString().replace(/\n|\t|[\s]{2,}/g, '').match(/([^\{]*)(.*)/)[2].slice(1, -1);
	//Base.prototype._invalidate.compiled =  Base.prototype._invalidate.toString().replace(/\n|\t|[\s]{2,}/g,'').match(/([^\{]*)(.*)/)[2].slice(1,-1);
	//Base.prototype._not_invalid_ = 1;
	//Base.prototype._invalid_cleanup = invalidator.cleanup;
	//Base.prototype._invalid_parents = invalidator.parents;
	//Base.prototype._invalid_children_ = -1;
	//Base.prototype._invalid_children = invalidator.children;
	//Base.prototype.registry = registry;
	//Base.prototype.invalidator = invalidator;
	//Base.prototype._events = undefined;

	module.exports = Base;

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(105);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(106), __esModule: true };

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(107);
	var $Object = __webpack_require__(15).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(14);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(23), 'Object', {defineProperty: __webpack_require__(19).f});

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var registry = __webpack_require__(102);

	module.exports = function (tag) {
	    var result;
	    if (typeof tag === 'string') {
	        result = registry[tag | 0];
	    } else {
	        result = tag;
	    }
	    result = new result();
	    result.ownerDocument = this;
	    return result;
	};

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _taggedTemplateLiteral2 = __webpack_require__(93);

	var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

	var _assign = __webpack_require__(110);

	var _assign2 = _interopRequireDefault(_assign);

	var _getPrototypeOf = __webpack_require__(2);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(28);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(104);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(29);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(76);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _templateObject = (0, _taggedTemplateLiteral3.default)(['v'], ['v']);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Base = __webpack_require__(103),
	    Types = __webpack_require__(100),
	    Registry = __webpack_require__(102);

	var Element = function (_Base) {
	    (0, _inherits3.default)(Element, _Base);

	    function Element() {
	        var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	        (0, _classCallCheck3.default)(this, Element);

	        var _this = (0, _possibleConstructorReturn3.default)(this, (Element.__proto__ || (0, _getPrototypeOf2.default)(Element)).call(this, config));

	        var id = _this._c2_id === undefined ? _this._c2_id = Registry.push(_this.constructor) - 1 : _this._c2_id,
	            render = typeof config === 'function' ? config : config && config.render;
	        var attributes = config && config.attributes;

	        if (render || attributes) {
	            var _ret;

	            var Temp = function (_this$constructor) {
	                (0, _inherits3.default)(Temp, _this$constructor);

	                function Temp() {
	                    (0, _classCallCheck3.default)(this, Temp);
	                    return (0, _possibleConstructorReturn3.default)(this, (Temp.__proto__ || (0, _getPrototypeOf2.default)(Temp)).call(this));
	                }

	                return Temp;
	            }(_this.constructor);

	            render && Temp.render(render);
	            attributes && Temp.attributes(attributes);
	            return _ret = new Temp(), (0, _possibleConstructorReturn3.default)(_this, _ret);
	        }
	        //this.render = this.render;
	        //this.setAttribute = this.setAttribute;
	        //this.getAttribute = this.getAttribute;
	        //this.invalidate = this.invalidate;
	        //this._invalidate = this._invalidate;
	        //this._invalid_cleanup=this._invalid_cleanup;
	        //this._invalid_parents=this._invalid_parents;
	        //this._invalid_children=this._invalid_children;
	        //this._invalid_children_=-1;
	        //this._not_invalid_=1;
	        _this.ownerDocument = null;

	        var p;
	        attributes = _this.constructor._attributes;
	        for (p in attributes) {
	            _this[p] = attributes[p].defaultValue;
	        }
	        //for (p in this) {
	        //this[p] = this[p]
	        //}
	        return _this;
	    }
	    //occurs on enter


	    (0, _createClass3.default)(Element, null, [{
	        key: 'apply',
	        value: function apply(parent) {
	            /*
	             *var result;
	             *if (!this.c2_renderable) {
	             *    this.c2_renderable = this.compile();
	             *}
	             *result = new this.c2_renderable();
	             *result.ownerDocument = parent;
	             *return new this.c2_renderable();
	             */
	            //return new this();
	            return new this();
	        }

	        //occurs on select

	    }, {
	        key: 'call',
	        value: function call(parent, n, i) {
	            if (typeof i === 'number') {
	                if (c2._$selectionAll) {
	                    var result = parent.querySelectorAll.call(parent, this);
	                    return result;
	                } else if (c2._$selection) {
	                    return parent.querySelector.call(parent, this + '');
	                }
	            }
	            //otherwise we are creating an instance
	            //console.error(parent);
	            //console.error('condition met');
	            //return Function.apply.apply(this.prototype.constructor,arguments);
	            //Function.call.call(this,...arguments);
	            return Function.call.apply(this, arguments);
	        }
	    }, {
	        key: 'render',
	        value: function render(_render) {
	            this.prototype.render = _render;
	            return this;
	        }
	    }, {
	        key: 'attributes',
	        value: function attributes(_attributes) {
	            if (!_attributes) {
	                return this;
	            }

	            !this._attributes && (this._attributes = {});

	            if (this._attributes) {
	                _attributes = (0, _assign2.default)({}, this._attributes, _attributes);
	            }

	            var p,
	                setter = [],
	                getter = [],
	                remover = [],
	                type;

	            this._attributes = _attributes;

	            for (p in _attributes) {
	                type = _attributes[p];
	                //this.prototype[p] = attributes[p].defaultValue;
	                setter.push('if (n === "' + p + '" ) {this["' + p + '"]=' + _attributes[p].setValue(_templateObject) + ';}');
	                remover.push('if (n === "' + p + '") {this["' + p + '"]=null;}');
	                getter.push('if (n === "' + p + '") {return this["' + p + '"];}');
	            }
	            this.prototype.setAttribute = (0, eval)('(function c2_setAttribute (k,b) {var n=k,v=b; ' + setter.join('else ') + 'else {this[n]=v;} ' + this.prototype.invalidate.compiled + '})'); //'(this._invalid_ === false) &&  this.invalidate() })');
	            //this.setAttribute = (0,eval)('(function c2_setAttribute (k,b) {var n=k,v=b;this[n]=v; ' +  this.invalidate.compiled +  '})');//'(this._invalid_ === false) &&  this.invalidate() })');
	            this.prototype.getAttribute = (0, eval)('(function (k) {var n=k;' + getter.join('else ') + ' else {return this[n];}})');
	            this.prototype.removeAttribute = (0, eval)('(function (k) {var n=k;' + remover.join('else ') + 'else {this[n]=null} if (this._not_invalid_) {' + this.prototype.invalidate.compiled + '}})');

	            return this;
	        }
	    }, {
	        key: 'compile',
	        value: function compile() {
	            var p,
	                result,
	                renderable = "(function () {";
	            var attributes = this._attributes,
	                v;

	            for (p in attributes) {
	                v = attributes[p].defaultValue;
	                renderable += 'this["' + p + '"]=' + (v === '' && '""' || v) + ';';
	            }
	            renderable += //"this._invalid_cleanup=this._invalid_cleanup;" +
	            //"this._invalid_parents=this._invalid_parents;" + 
	            //"this._invalid_children=this._invalid_children;"+
	            "this._invalid_children_=-1;" + "this._not_invalid_=1;";
	            //"for (var p in this) {this[p]=this[p]}"

	            //renderable+="this._constructor && this._constructor();"+
	            renderable += "})";

	            result = eval(renderable);

	            result.prototype = new this();
	            return result;
	        }
	    }, {
	        key: '_isElement',
	        value: function _isElement() {}
	    }, {
	        key: 'toString',
	        value: function toString() {
	            this._c2_id === undefined && (this._c2_id = Registry.push(this) - 1);
	            return this._c2_id;
	        }
	    }]);
	    return Element;
	}(Base);

	;
	module.exports = Element;

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(111), __esModule: true };

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(112);
	module.exports = __webpack_require__(15).Object.assign;

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(14);

	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(113)});

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys  = __webpack_require__(43)
	  , gOPS     = __webpack_require__(67)
	  , pIE      = __webpack_require__(68)
	  , toObject = __webpack_require__(5)
	  , IObject  = __webpack_require__(46)
	  , $assign  = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(24)(function(){
	  var A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , aLen  = arguments.length
	    , index = 1
	    , getSymbols = gOPS.f
	    , isEnum     = pIE.f;
	  while(aLen > index){
	    var S      = IObject(arguments[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  } return T;
	} : $assign;

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(115)('2d');

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _getPrototypeOf = __webpack_require__(2);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(28);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(104);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(29);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(76);

	var _inherits3 = _interopRequireDefault(_inherits2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var createElement = __webpack_require__(108),
	    Document = __webpack_require__(116);

	var Context = function (_Document) {
	    (0, _inherits3.default)(Context, _Document);

	    function Context() {
	        (0, _classCallCheck3.default)(this, Context);
	        return (0, _possibleConstructorReturn3.default)(this, (Context.__proto__ || (0, _getPrototypeOf2.default)(Context)).call(this));
	    }

	    (0, _createClass3.default)(Context, [{
	        key: 'invalidate',
	        value: function invalidate() {
	            if (this._not_invalid_) {
	                this._not_invalid_ = 0;
	                this._invalid_cleanup[this._invalid_cleanup.index++] = this;
	                this._invalid_parents[this._invalid_parents.index++] = this;

	                if (!this.invalidator.scheduled_next) {
	                    this.invalidator();
	                }
	            }
	        }
	        /*
	         *    _invalidate () {
	         *        if (this._not_invalid_) {
	         *            this._not_invalid_ = 0;
	         *            this._invalid_cleanup[this._invalid_cleanup.index++] = this;
	         *            this._invalid_parents[this._invalid_parents.index++] = this;
	         *
	         *            !this.invalidator.t2 && this.invalidator();
	         *        }
	         *    }
	         */

	    }, {
	        key: 'createElementNS',
	        value: function createElementNS() {
	            this.createElement.apply(this, arguments);
	        }
	    }]);
	    return Context;
	}(Document);

	Context.prototype.invalidate.compiled = Context.prototype.invalidate.toString().replace(/\n|\t|[\s]{2,}/g, '').match(/([^\{]*)(.*)/)[2].slice(1, -1);
	//Context.prototype._invalidate.compiled = Context.prototype._invalidate.toString().replace(/\n|\t|[\s]{2,}/g,'').match(/([^\{]*)(.*)/)[2].slice(1,-1); 


	module.exports = function (contextName) {
	    var optionalClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Context;

	    var config;
	    return function ContextSelector(cfg) {
	        if (arguments.length === 1) {
	            config = cfg;
	            return ContextSelector;
	        }
	        if (this._c2Context_) {
	            return this._c2Context_;
	        }
	        var ref = createElement.call(c2, optionalClass);
	        ref.canvas = this;
	        ref.context = config ? this.getContext(contextName, config) : this.getContext(contextName);
	        ref.ownerDocument = ref;
	        ref._c2Context_ = this._c2Context_ = ref;
	        return ref;
	    };
	};
	module.exports.class = Context;

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _getPrototypeOf = __webpack_require__(2);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(28);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(29);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(76);

	var _inherits3 = _interopRequireDefault(_inherits2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Pass = __webpack_require__(117),
	    createElement = __webpack_require__(108);

	var Document = function (_Pass) {
	    (0, _inherits3.default)(Document, _Pass);

	    function Document() {
	        (0, _classCallCheck3.default)(this, Document);
	        return (0, _possibleConstructorReturn3.default)(this, (Document.__proto__ || (0, _getPrototypeOf2.default)(Document)).call(this));
	    }

	    return Document;
	}(Pass);

	Document.prototype.createElement = createElement;
	module.exports = Document;

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _getPrototypeOf = __webpack_require__(2);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(28);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(104);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(29);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(76);

	var _inherits3 = _interopRequireDefault(_inherits2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Element = __webpack_require__(109);
	module.exports = function (_Element) {
	    (0, _inherits3.default)(Pass, _Element);

	    function Pass() {
	        (0, _classCallCheck3.default)(this, Pass);
	        return (0, _possibleConstructorReturn3.default)(this, (Pass.__proto__ || (0, _getPrototypeOf2.default)(Pass)).call(this));
	    }

	    (0, _createClass3.default)(Pass, [{
	        key: 'render',
	        value: function render(parentContext) {
	            var events = this._events,
	                tock = events && events.tock,
	                tick = events && events.tick,
	                context = this.context,
	                children = this.children,
	                i,
	                ln,
	                child;

	            if (tick) {
	                for (i = 0, ln = tick.length; i < ln; i++) {
	                    tick[i].call(this, context);
	                }
	            }
	            for (var j = 0, jln = children.length; j < jln; j++) {
	                children[j].render(context, children[j].__data__, j);
	            }

	            if (tock) {
	                for (i = 0, ln = tock.length; i < ln; i++) {
	                    tock[i].call(this, context);
	                }
	            }
	        }
	    }]);
	    return Pass;
	}(Element);

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(115)('webgl');

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = {
	    Context: __webpack_require__(114)
	};

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = {
	    Context: __webpack_require__(118)
	};

/***/ }
/******/ ]);