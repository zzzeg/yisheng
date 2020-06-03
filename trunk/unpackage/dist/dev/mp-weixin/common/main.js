(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/main"],{

/***/ 0:
/*!********************************!*\
  !*** E:/yisheng/trunk/main.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createApp) {__webpack_require__(/*! uni-pages */ 4);var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _App = _interopRequireDefault(__webpack_require__(/*! ./App */ 5));
var _api = _interopRequireDefault(__webpack_require__(/*! common/api.js */ 8));
var _store = _interopRequireDefault(__webpack_require__(/*! ./store/store.js */ 23));
var _util = _interopRequireDefault(__webpack_require__(/*! common/util.js */ 28));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}
var WebIM = __webpack_require__(/*! utils/WebIM */ 13)["default"];

var conn = {
  closed: false,
  curOpenOpt: {},
  open: function open(opt) {
    console.log("connconnconnconnconn");
    this.curOpenOpt = opt;
    WebIM.conn.open(opt);
    this.closed = false;
  },
  reopen: function reopen() {
    if (this.closed) {
      //this.open(this.curOpenOpt);
      WebIM.conn.open(this.curOpenOpt);
      this.closed = false;
    }
  } };


_vue.default.prototype.$im = WebIM;
_vue.default.prototype.$conn = conn;
_vue.default.prototype.$api = _api.default;
_vue.default.prototype.$store = _store.default;
_vue.default.prototype.$util = _util.default;


_vue.default.config.productionTip = false;

_App.default.mpType = 'app';

var app = new _vue.default(_objectSpread({},
_App.default));

createApp(app).$mount();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createApp"]))

/***/ }),

/***/ 20:
/*!*****************************************************************!*\
  !*** E:/yisheng/trunk/App.vue?vue&type=style&index=0&lang=css& ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./App.vue?vue&type=style&index=0&lang=css& */ 21);
/* harmony import */ var _D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 21:
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/yisheng/trunk/App.vue?vue&type=style&index=0&lang=css& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ 5:
/*!********************************!*\
  !*** E:/yisheng/trunk/App.vue ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=script&lang=js& */ 6);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue?vue&type=style&index=0&lang=css& */ 20);
/* harmony import */ var _D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 22);
var render, staticRenderFns, recyclableRender, components
var renderjs





/* normalize component */

var component = Object(_D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"],
  render,
  staticRenderFns,
  false,
  null,
  null,
  null,
  false,
  components,
  renderjs
)

component.options.__file = "E:/yisheng/trunk/App.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 6:
/*!*********************************************************!*\
  !*** E:/yisheng/trunk/App.vue?vue&type=script&lang=js& ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./App.vue?vue&type=script&lang=js& */ 7);
/* harmony import */ var _D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_soft_HBuilderX_2_4_2_20191115_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 7:
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/yisheng/trunk/App.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;









var _api = _interopRequireDefault(__webpack_require__(/*! common/api.js */ 8));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var msgStorage = __webpack_require__(/*! comps/chat/msgstorage */ 10);var msgType = __webpack_require__(/*! comps/chat/msgtype */ 17);var disp = __webpack_require__(/*! utils/broadcast */ 18);var emedia = wx.emedia = __webpack_require__(/*! ./common/emedia/emedia_for_miniProgram */ 19);var WxIM = __webpack_require__(/*! utils/WebIM */ 13)["default"];var _default =

{
  globalData: {
    pageUrl: null,
    scene: '',
    showIndex: false },

  onLaunch: function onLaunch(options) {var _this = this;
    console.log('App Launch');


    this.globalData.scene = decodeURIComponent(options.scene);

    this.$im.conn.listen({
      onOpened: function onOpened(message) {
        // this.$im.conn.setPresence();
        console.log('登录成功登录成功');

      },
      onReconnect: function onReconnect() {
        // this.$helper.toast('loading', '重连中...', 2000)
      },
      onSocketConnected: function onSocketConnected() {
        // this.$helper.toast('success', '登陆成功', 2000)
      },
      onClosed: function onClosed() {

        var userinfo = uni.getStorageSync('userinfo');
        _this.emchatLogin(userinfo.userId);

      },

      onInviteMessage: function onInviteMessage(message) {
        _this.$options.globalData.saveGroupInvitedList.push(message);
        disp.fire("em.xmpp.invite.joingroup", message);

      },
      onPresence: function onPresence(message) {

      },

      onRoster: function onRoster(message) {
        // let pages = getCurrentPages();
        // if(pages[0]){
        // 	pages[0].onShow();
        // }
      },

      onVideoMessage: function onVideoMessage(message) {
        console.log("onVideoMessage: ", message);
        if (message) {
          msgStorage.saveReceiveMsg(message, msgType.VIDEO);
        }

      },

      onAudioMessage: function onAudioMessage(message) {
        console.log("onAudioMessage", message);
        if (message) {
          if (_this.onMessageError(message)) {
            msgStorage.saveReceiveMsg(message, msgType.AUDIO);
          }

        }
      },

      onCmdMessage: function onCmdMessage(message) {
        console.log("onCmdMessage", message);
        if (message) {
          if (_this.onMessageError(message)) {
            msgStorage.saveReceiveMsg(message, msgType.CMD);
          }

        }
      },

      onTextMessage: function onTextMessage(message) {
        console.log("onTextMessage", message);
        if (message) {
          if (_this.onMessageError(message)) {
            msgStorage.saveReceiveMsg(message, msgType.TEXT);
          }

        }
      },

      onEmojiMessage: function onEmojiMessage(message) {
        console.log("onEmojiMessage", message);
        if (message) {
          if (_this.onMessageError(message)) {
            msgStorage.saveReceiveMsg(message, msgType.EMOJI);
          }

        }
      },
      onPictureMessage: function onPictureMessage(message) {
        console.log("onPictureMessage", message);
        if (message) {
          if (_this.onMessageError(message)) {
            msgStorage.saveReceiveMsg(message, msgType.IMAGE);
          }

        }
      },
      onFileMessage: function onFileMessage(message) {
        console.log('onFileMessage', message);
        if (message) {
          if (_this.onMessageError(message)) {
            msgStorage.saveReceiveMsg(message, msgType.FILE);
          }
        }
      },
      // 各种异常
      onError: function onError(error) {
        console.log(error);
        // 16: server-side close the websocket connection
        if (error.type == _this.$im.statusCode.WEBIM_CONNCTION_DISCONNECTED) {
          if (_this.$im.conn.autoReconnectNumTotal < _this.$im.conn.autoReconnectNumMax) {
            return;
          }
          uni.showToast({
            title: "server-side close the websocket connection",
            duration: 1000 });


          return;
        }
        // 8: offline by multi login
        if (error.type == _this.$im.statusCode.WEBIM_CONNCTION_SERVER_ERROR) {

          var userinfo = uni.getStorageSync('userinfo');
          // this.emchatLogin(userinfo.userId);
        }
        if (error.type == _this.$im.statusCode.WEBIM_CONNCTION_OPEN_ERROR) {


        }
        if (error.type == _this.$im.statusCode.WEBIM_CONNCTION_AUTH_ERROR) {
          disp.fire("em.xmpp.error.tokenErr");
        }
        if (error.type == 'socket_error') {///sendMsgError
          console.log('socket_errorsocket_error', error);
          uni.showToast({
            title: "网络已断开",
            icon: 'none',
            duration: 2000 });

        }
      } });


    //以下界面不拦截
    var uncheckedPath = ['pages/housekeeper-sharing-img/housekeeper-sharing-img', 'pages/housekeeper-sharing-video/housekeeper-sharing-video', 'pages/liveborad/share'];
    var action = true;
    if (options.path) {
      var checkPath = !uncheckedPath.find(function (path) {return options.path.indexOf(path) > -1;});
      if (options.path && (options.path.search('index/auth') != -1 || !checkPath)) {
        action = false;
        this.globalData.showIndex = true;
      }
    }

    console.log('options.path:', options.path);
    if (action) {

      this.globalData.pageUrl = options.path;
      var _self = this;
      uni.checkSession({
        success: function success() {
          // session_key 未过期，并且在本生命周期一直有效
          console.log("未过期");
          _self.wxlogin();

        },
        fail: function fail() {
          console.log("过期");
          _self.wxlogin();
        } });

    }
  },
  onShow: function onShow(options) {
    console.log('App Show');

  },
  onHide: function onHide() {
    console.log('App Hide');
  },
  methods: {
    wxlogin: function wxlogin() {
      var _self = this;
      uni.login({
        provider: 'weixin',
        success: function success(loginRes) {
          console.log(loginRes);
          var obj = {
            code: loginRes.code };

          _api.default.getUnionid({
            data: obj }).
          then(function (res) {
            console.log(res);
            console.log('sk:' + res.data.session_key);
            uni.setStorageSync('sk', res.data.session_key);
            uni.setStorageSync('openid', res.data.openid);
            uni.setStorageSync('unionid', res.data.unionid);
            _self.checkAuth();
          });
        } });

    },
    checkAuth: function checkAuth() {
      var _self = this;
      uni.getUserInfo({
        success: function success(res) {//已经授权请求是否绑定信息
          console.log("getUserInfo:", res);
          _self.getAccount(res);
        },
        fail: function fail(res) {//没有授权直接跳转登录
          console.log("没有授权");
          _self.globalData.pageUrl = '../index/index';
          uni.reLaunch({
            url: "/pages/index/auth" });

        } });

    },
    getAccount: function getAccount(res) {var _this2 = this;
      var sessionKey = uni.getStorageSync('sk');
      // console.log("res.iv:")
      // console.log(res.iv)
      var data = {
        encryptedData: res.encryptedData,
        iv: res.iv,
        sessionKey: sessionKey,
        communityId: this.globalData.scene ? this.globalData.scene : '' };

      var _self = this;
      _api.default.getAccountInfo({
        data: data }).
      then(function (accountRes) {
        console.log("accountRes:");
        console.log(accountRes);
        if (!accountRes.data.bnUserInfo) {
          uni.removeStorageSync('sk');
          return;
        }
        if (accountRes.data.wxUserInfo && accountRes.data.wxUserInfo.unionid) {
          uni.setStorageSync('unionid', accountRes.data.wxUserInfo.unionid);
        }
        if (accountRes.data.bnUserInfo && accountRes.data.bnUserInfo.sessionId) {
          var sessionId = accountRes.data.bnUserInfo.sessionId;
          uni.setStorageSync('sessionId', sessionId);
        }
        if (accountRes.data.bnUserInfo.phone == "" || accountRes.data.bnUserInfo.phone == null) {//未绑定
          uni.reLaunch({
            url: '/pages/index/auth?type=2' });

        } else {
          // uni.reLaunch({
          //     url:'/pages/index/auth?type=2'
          // })
          _this2.findUser(accountRes.data.bnUserInfo.id, accountRes.data.bnUserInfo.avatarPath);
        }
      });
    },
    findUser: function findUser(id, avatarPath) {var _this3 = this;
      var userObj = { userId: id };
      _api.default.findUserById({
        data: userObj }).
      then(function (userRes) {
        if (userRes.status == 'OK') {
          var userInfo = userRes.data;
          userInfo.avatarPath = avatarPath;
          uni.setStorageSync('userinfo', userInfo);
          _this3.emchatLogin(id);
          _this3.getCurrentRoute();
          if (_this3.globalData.pageUrl && _this3.globalData.pageUrl.search('index/index') == -1) {
            //是否有指定路径
            console.log(_this3.globalData.pageUrl);
            uni.navigateTo({
              url: '/' + _this3.globalData.pageUrl });


          } else {
            //没有跳转index或者加入服务站
            console.log(userRes.data.followCommunityId);
            if (userRes.data && userRes.data.followCommunityId && userRes.data.followCommunityId.length > 3) {
              _this3.globalData.showIndex = true;
              uni.reLaunch({
                url: '/pages/index/index?communityid=' + userRes.data.followCommunityId });

            } else {
              uni.navigateTo({
                url: '../serverStation/main' });

            }
          }
        }
      });
    },
    emchatLogin: function emchatLogin(userid) {
      var pwd = userid.substring(1, userid.length - 1);
      if (this.$conn) {
        this.$conn.open({
          apiUrl: this.$im.config.apiURL,
          user: userid,
          pwd: pwd,
          grant_type: "password",
          appKey: this.$im.config.appkey });

      } else {
        var obj = {
          apiUrl: 'https://a1.easemob.com',
          user: userid,
          pwd: pwd,
          grant_type: "password",
          appKey: '1184170206115288#mingwo' };

        WxIM.conn.open(obj);
      }
    },
    getCurrentRoute: function getCurrentRoute() {
      var pages = getCurrentPages();
      var currentPage = pages[pages.length - 1];
      console.log(currentPage);
      return currentPage.route;
    },
    onMessage: function onMessage() {
      console.log('onMessageonMessageonMessage');
    },
    onMessageError: function onMessageError(err) {
      if (err.type === "error") {
        uni.showToast({
          title: err.errorText });

        return false;
      }
      return true;
    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ })

},[[0,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/main.js.map