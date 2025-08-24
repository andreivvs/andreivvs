"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/error-kid";
exports.ids = ["vendor-chunks/error-kid"];
exports.modules = {

/***/ "(ssr)/../../node_modules/error-kid/dist/index.js":
/*!**************************************************!*\
  !*** ../../node_modules/error-kid/dist/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   errorClass: () => (/* binding */ p),\n/* harmony export */   errorClassWithData: () => (/* binding */ l),\n/* harmony export */   isErrorOfKind: () => (/* binding */ a)\n/* harmony export */ });\nvar f = Object.defineProperty;\nvar u = (r, t, e) => t in r ? f(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : r[t] = e;\nvar c = (r, t, e) => u(r, typeof t != \"symbol\" ? t + \"\" : t, e);\nfunction a(r, t) {\n  return (e) => e instanceof r && e.type === t;\n}\nfunction p(r, t) {\n  t || (t = []);\n  const e = Symbol(r);\n  class n extends Error {\n    constructor(...i) {\n      const o = typeof t == \"function\" ? t(...i) : typeof t == \"string\" ? [t] : t || [];\n      super(...o);\n      c(this, \"type\", e);\n      this.name = r;\n    }\n  }\n  return Object.defineProperty(n, \"name\", { value: r }), [n, a(n, e)];\n}\nfunction l(r, t, e) {\n  const n = Symbol(r);\n  class s extends p(r, e)[0] {\n    constructor(...o) {\n      super(...o);\n      c(this, \"data\");\n      c(this, \"type\", n);\n      this.data = t(...o);\n    }\n  }\n  return Object.defineProperty(s, \"name\", { value: r }), [s, a(s, n)];\n}\n\n//# sourceMappingURL=index.js.map\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi4vLi4vbm9kZV9tb2R1bGVzL2Vycm9yLWtpZC9kaXN0L2luZGV4LmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQ0Esd0NBQXdDLDBEQUEwRDtBQUNsRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEMsVUFBVTtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLFVBQVU7QUFDdEQ7QUFLRTtBQUNGIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXNCc0LDRgNC40L3QvtGH0LrQsFxcRG93bmxvYWRzXFxiYXloYW4tbWluaWFwcC1tYWluXFxub2RlX21vZHVsZXNcXGVycm9yLWtpZFxcZGlzdFxcaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIGYgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG52YXIgdSA9IChyLCB0LCBlKSA9PiB0IGluIHIgPyBmKHIsIHQsIHsgZW51bWVyYWJsZTogITAsIGNvbmZpZ3VyYWJsZTogITAsIHdyaXRhYmxlOiAhMCwgdmFsdWU6IGUgfSkgOiByW3RdID0gZTtcbnZhciBjID0gKHIsIHQsIGUpID0+IHUociwgdHlwZW9mIHQgIT0gXCJzeW1ib2xcIiA/IHQgKyBcIlwiIDogdCwgZSk7XG5mdW5jdGlvbiBhKHIsIHQpIHtcbiAgcmV0dXJuIChlKSA9PiBlIGluc3RhbmNlb2YgciAmJiBlLnR5cGUgPT09IHQ7XG59XG5mdW5jdGlvbiBwKHIsIHQpIHtcbiAgdCB8fCAodCA9IFtdKTtcbiAgY29uc3QgZSA9IFN5bWJvbChyKTtcbiAgY2xhc3MgbiBleHRlbmRzIEVycm9yIHtcbiAgICBjb25zdHJ1Y3RvciguLi5pKSB7XG4gICAgICBjb25zdCBvID0gdHlwZW9mIHQgPT0gXCJmdW5jdGlvblwiID8gdCguLi5pKSA6IHR5cGVvZiB0ID09IFwic3RyaW5nXCIgPyBbdF0gOiB0IHx8IFtdO1xuICAgICAgc3VwZXIoLi4ubyk7XG4gICAgICBjKHRoaXMsIFwidHlwZVwiLCBlKTtcbiAgICAgIHRoaXMubmFtZSA9IHI7XG4gICAgfVxuICB9XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkobiwgXCJuYW1lXCIsIHsgdmFsdWU6IHIgfSksIFtuLCBhKG4sIGUpXTtcbn1cbmZ1bmN0aW9uIGwociwgdCwgZSkge1xuICBjb25zdCBuID0gU3ltYm9sKHIpO1xuICBjbGFzcyBzIGV4dGVuZHMgcChyLCBlKVswXSB7XG4gICAgY29uc3RydWN0b3IoLi4ubykge1xuICAgICAgc3VwZXIoLi4ubyk7XG4gICAgICBjKHRoaXMsIFwiZGF0YVwiKTtcbiAgICAgIGModGhpcywgXCJ0eXBlXCIsIG4pO1xuICAgICAgdGhpcy5kYXRhID0gdCguLi5vKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzLCBcIm5hbWVcIiwgeyB2YWx1ZTogciB9KSwgW3MsIGEocywgbildO1xufVxuZXhwb3J0IHtcbiAgcCBhcyBlcnJvckNsYXNzLFxuICBsIGFzIGVycm9yQ2xhc3NXaXRoRGF0YSxcbiAgYSBhcyBpc0Vycm9yT2ZLaW5kXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwXG4iXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbMF0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/../../node_modules/error-kid/dist/index.js\n");

/***/ })

};
;