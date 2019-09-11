require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"ezwrap":[function(require,module,exports){
"use strict"; // browser shim util - not needed for browser, don't bloat

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Util;

if (typeof window === 'undefined') {
  Util = require('util');
} else {
  Util = {
    inspect: {
      custom: '__customInspect'
    }
  };
}
/**
 * Wrapper for accessing parsed XML objects
 */


var EZWrap =
/*#__PURE__*/
function () {
  _createClass(EZWrap, null, [{
    key: "getEmptyObject",

    /**
     * Creates an empty node
     * @param children
     * @param name
     * @param attributes
     * @param value
     * @returns {{children: Array, name: string, attributes, value: string}}
     */
    value: function getEmptyObject() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$children = _ref.children,
          children = _ref$children === void 0 ? [] : _ref$children,
          _ref$name = _ref.name,
          name = _ref$name === void 0 ? '' : _ref$name,
          _ref$attributes = _ref.attributes,
          attributes = _ref$attributes === void 0 ? {} : _ref$attributes,
          _ref$value = _ref.value,
          value = _ref$value === void 0 ? '' : _ref$value;

      return {
        name: name,
        value: value,
        attributes: attributes,
        children: children
      };
    }
    /**
     * Creates a new wrapped instance of an parsed XML object
     * @param {*} obj
     */

  }]);

  function EZWrap(obj) {
    _classCallCheck(this, EZWrap);

    /**
     * Returns the underlying object from the original XML tree
     * @type {*}
     */
    this.raw = obj;
  }
  /**
   * Custom Inspection for Node.js
   * @param depth
   * @param options
   * @returns {*}
   */


  _createClass(EZWrap, [{
    key: Util.inspect.custom,
    value: function value(depth, options) {
      var _this = this;

      var attributeString = Object.keys(this.raw.attributes).map(function (key) {
        return "".concat(key, "=\"").concat(_this.raw.attributes[key], "\"");
      }).join(' ');
      var openTag = "<".concat(this.name).concat(attributeString ? ' ' + attributeString : '', ">");
      var body = this.raw.children.map(function (n) {
        return "  <".concat(n.name, " ... />");
      }).join('\n') || this.raw.value && '  ' + this.raw.value || '';
      return options.stylize(openTag + '\n' + body + "\n</".concat(this.name, ">"));
    } // noinspection JSMethodCanBeStatic

    /**
     * Returns whether the object is a EZWrapped object
     * @returns {boolean}
     */

  }, {
    key: "attr",

    /**
     * Gets the value of an attribute contained on the node
     * @param {string} name
     * @returns {string|null}
     */
    value: function attr(name) {
      return this.raw.attributes[name] || null;
    }
    /**
     * Gets all children with the given name
     * @param {string} name
     * @returns {EZWrap}
     */

  }, {
    key: "all",
    value: function all(name) {
      var children = this.raw.children.filter(function (n) {
        return n.name === name;
      });
      return new EZWrap(EZWrap.getEmptyObject({
        name: "all-".concat(name),
        children: children
      }));
    }
    /**
     * Gets the first child with the given name
     * @param {string} name
     * @returns {EZWrap}
     */

  }, {
    key: "get",
    value: function get(name) {
      var child = this.raw.children.find(function (n) {
        return n.name === name;
      });
      return new EZWrap(child || EZWrap.getEmptyObject({
        name: "no-matches-for-".concat(name)
      }));
    }
    /**
     * Similar to Array.find(node => boolean), where node is an EZWrapped instance of each child
     * @param {function(EZWrap)} closure
     * @returns {*}
     */

  }, {
    key: "find",
    value: function find(closure) {
      return new EZWrap(this.raw.children.find(function (n) {
        return closure(new EZWrap(n));
      }) || EZWrap.getEmptyObject({
        name: "no-result-for-find"
      }));
    }
    /**
     * Similar to Array.forEach(node => ...), where node is an EZWRapped instance of each child
     * @param {function(EZWrap)} closure
     */

  }, {
    key: "forEach",
    value: function forEach(closure) {
      this.raw.children.forEach(function (n) {
        closure(new EZWrap(n));
      });
    }
    /**
     * Similar to Array.filter(node => boolean), where node is an EZWrapped instance of each child
     * @param {function(EZWrap)} closure
     * @returns {*}
     */

  }, {
    key: "filter",
    value: function filter(closure) {
      return new EZWrap(EZWrap.getEmptyObject({
        name: "filtered-results",
        children: this.raw.children.filter(function (n) {
          return closure(new EZWrap(n));
        })
      }));
    }
    /**
     * Similar to Array.map(node => value), where node is an EZWrapped instance of each child
     * @param closure
     * @returns {*}
     */

  }, {
    key: "map",
    value: function map(closure) {
      return this.raw.children.map(function (n) {
        return closure(new EZWrap(n));
      });
    }
  }, {
    key: "isWrapped",
    get: function get() {
      return true;
    }
    /**
     * Gets the number of children contained in the node
     * @returns {number}
     */

  }, {
    key: "length",
    get: function get() {
      return this.raw.children.length;
    }
    /**
     * Gets the node value
     * @returns {string|null}
     */

  }, {
    key: "value",
    get: function get() {
      return this.raw.value || null;
    }
    /**
     * Gets the node name
     * @returns {string|null}
     */

  }, {
    key: "name",
    get: function get() {
      return this.raw.name || null;
    }
  }]);

  return EZWrap;
}();

module.exports = EZWrap;

},{"util":"util"}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJFWldyYXAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxhLENBRUE7Ozs7Ozs7O0FBQ0EsSUFBSSxJQUFKOztBQUNBLElBQUksT0FBTyxNQUFQLEtBQWtCLFdBQXRCLEVBQW1DO0FBQy9CLEVBQUEsSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFELENBQWQ7QUFDSCxDQUZELE1BRU87QUFDSCxFQUFBLElBQUksR0FBRztBQUFFLElBQUEsT0FBTyxFQUFFO0FBQUUsTUFBQSxNQUFNLEVBQUU7QUFBVjtBQUFYLEdBQVA7QUFDSDtBQUVEOzs7OztJQUdNLE07Ozs7OztBQUVGOzs7Ozs7OztxQ0FROEU7QUFBQSxxRkFBSixFQUFJO0FBQUEsK0JBQXRELFFBQXNEO0FBQUEsVUFBdEQsUUFBc0QsOEJBQTdDLEVBQTZDO0FBQUEsMkJBQXpDLElBQXlDO0FBQUEsVUFBekMsSUFBeUMsMEJBQXBDLEVBQW9DO0FBQUEsaUNBQWhDLFVBQWdDO0FBQUEsVUFBaEMsVUFBZ0MsZ0NBQXJCLEVBQXFCO0FBQUEsNEJBQWpCLEtBQWlCO0FBQUEsVUFBakIsS0FBaUIsMkJBQVgsRUFBVzs7QUFDMUUsYUFBTztBQUFFLFFBQUEsSUFBSSxFQUFKLElBQUY7QUFBUSxRQUFBLEtBQUssRUFBTCxLQUFSO0FBQWUsUUFBQSxVQUFVLEVBQVYsVUFBZjtBQUEyQixRQUFBLFFBQVEsRUFBUjtBQUEzQixPQUFQO0FBQ0g7QUFFRDs7Ozs7OztBQUlBLGtCQUFZLEdBQVosRUFBaUI7QUFBQTs7QUFFYjs7OztBQUlBLFNBQUssR0FBTCxHQUFXLEdBQVg7QUFDSDtBQUVEOzs7Ozs7Ozs7U0FNQyxJQUFJLENBQUMsT0FBTCxDQUFhLE07MEJBQVEsSyxFQUFPLE8sRUFBUztBQUFBOztBQUVsQyxVQUFNLGVBQWUsR0FBRyxNQUFNLENBQUMsSUFBUCxDQUFZLEtBQUssR0FBTCxDQUFTLFVBQXJCLEVBQWlDLEdBQWpD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UUFBVCxDQUFrQixHQUFsQixDQUFzQixVQUFBLENBQUMsRUFBSTtBQUM5QixlQUFPLE9BQU8sQ0FBQyxJQUFJLE1BQUosQ0FBVyxDQUFYLENBQUQsQ0FBZDtBQUNILE9BRk0sQ0FBUDtBQUdIOzs7d0JBckdlO0FBQ1osYUFBTyxJQUFQO0FBQ0g7QUFFRDs7Ozs7Ozt3QkFJYTtBQUNULGFBQU8sS0FBSyxHQUFMLENBQVMsUUFBVCxDQUFrQixNQUF6QjtBQUNIO0FBRUQ7Ozs7Ozs7d0JBSVk7QUFDUixhQUFPLEtBQUssR0FBTCxDQUFTLEtBQVQsSUFBa0IsSUFBekI7QUFDSDtBQUVEOzs7Ozs7O3dCQUlXO0FBQ1AsYUFBTyxLQUFLLEdBQUwsQ0FBUyxJQUFULElBQWlCLElBQXhCO0FBQ0g7Ozs7OztBQThFTCxNQUFNLENBQUMsT0FBUCxHQUFpQixNQUFqQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIlwidXNlIHN0cmljdFwiO1xuXG4vLyBicm93c2VyIHNoaW0gdXRpbCAtIG5vdCBuZWVkZWQgZm9yIGJyb3dzZXIsIGRvbid0IGJsb2F0XG5sZXQgVXRpbDtcbmlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykge1xuICAgIFV0aWwgPSByZXF1aXJlKCd1dGlsJyk7XG59IGVsc2Uge1xuICAgIFV0aWwgPSB7IGluc3BlY3Q6IHsgY3VzdG9tOiAnX19jdXN0b21JbnNwZWN0JyB9IH1cbn1cblxuLyoqXG4gKiBXcmFwcGVyIGZvciBhY2Nlc3NpbmcgcGFyc2VkIFhNTCBvYmplY3RzXG4gKi9cbmNsYXNzIEVaV3JhcCB7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGVtcHR5IG5vZGVcbiAgICAgKiBAcGFyYW0gY2hpbGRyZW5cbiAgICAgKiBAcGFyYW0gbmFtZVxuICAgICAqIEBwYXJhbSBhdHRyaWJ1dGVzXG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICogQHJldHVybnMge3tjaGlsZHJlbjogQXJyYXksIG5hbWU6IHN0cmluZywgYXR0cmlidXRlcywgdmFsdWU6IHN0cmluZ319XG4gICAgICovXG4gICAgc3RhdGljIGdldEVtcHR5T2JqZWN0KHsgY2hpbGRyZW49W10sIG5hbWU9JycsIGF0dHJpYnV0ZXM9e30sIHZhbHVlPScnIH0gPSB7fSkge1xuICAgICAgICByZXR1cm4geyBuYW1lLCB2YWx1ZSwgYXR0cmlidXRlcywgY2hpbGRyZW4gfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IHdyYXBwZWQgaW5zdGFuY2Ugb2YgYW4gcGFyc2VkIFhNTCBvYmplY3RcbiAgICAgKiBAcGFyYW0geyp9IG9ialxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9iaikge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm5zIHRoZSB1bmRlcmx5aW5nIG9iamVjdCBmcm9tIHRoZSBvcmlnaW5hbCBYTUwgdHJlZVxuICAgICAgICAgKiBAdHlwZSB7Kn1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMucmF3ID0gb2JqO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEN1c3RvbSBJbnNwZWN0aW9uIGZvciBOb2RlLmpzXG4gICAgICogQHBhcmFtIGRlcHRoXG4gICAgICogQHBhcmFtIG9wdGlvbnNcbiAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgKi9cbiAgICBbVXRpbC5pbnNwZWN0LmN1c3RvbV0oZGVwdGgsIG9wdGlvbnMpIHtcblxuICAgICAgICBjb25zdCBhdHRyaWJ1dGVTdHJpbmcgPSBPYmplY3Qua2V5cyh0aGlzLnJhdy5hdHRyaWJ1dGVzKS5tYXAoa2V5ID0+IGAke2tleX09XCIke3RoaXMucmF3LmF0dHJpYnV0ZXNba2V5XX1cImApLmpvaW4oJyAnKTtcbiAgICAgICAgY29uc3Qgb3BlblRhZyA9IGA8JHt0aGlzLm5hbWV9JHthdHRyaWJ1dGVTdHJpbmcgPyAoJyAnK2F0dHJpYnV0ZVN0cmluZykgOiAnJ30+YDtcbiAgICAgICAgY29uc3QgYm9keSA9IHRoaXMucmF3LmNoaWxkcmVuLm1hcChuID0+IGAgIDwke24ubmFtZX0gLi4uIC8+YCkuam9pbignXFxuJykgfHwgKHRoaXMucmF3LnZhbHVlICYmICgnICAnICsgdGhpcy5yYXcudmFsdWUpKSB8fCAnJztcblxuICAgICAgICByZXR1cm4gb3B0aW9ucy5zdHlsaXplKG9wZW5UYWcgKyAnXFxuJyArIGJvZHkgKyBgXFxuPC8ke3RoaXMubmFtZX0+YCk7XG4gICAgfVxuXG4gICAgLy8gbm9pbnNwZWN0aW9uIEpTTWV0aG9kQ2FuQmVTdGF0aWNcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHdoZXRoZXIgdGhlIG9iamVjdCBpcyBhIEVaV3JhcHBlZCBvYmplY3RcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBnZXQgaXNXcmFwcGVkKCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBudW1iZXIgb2YgY2hpbGRyZW4gY29udGFpbmVkIGluIHRoZSBub2RlXG4gICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgKi9cbiAgICBnZXQgbGVuZ3RoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yYXcuY2hpbGRyZW4ubGVuZ3RoO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIG5vZGUgdmFsdWVcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfG51bGx9XG4gICAgICovXG4gICAgZ2V0IHZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yYXcudmFsdWUgfHwgbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBub2RlIG5hbWVcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfG51bGx9XG4gICAgICovXG4gICAgZ2V0IG5hbWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJhdy5uYW1lIHx8IG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgdmFsdWUgb2YgYW4gYXR0cmlidXRlIGNvbnRhaW5lZCBvbiB0aGUgbm9kZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAgICogQHJldHVybnMge3N0cmluZ3xudWxsfVxuICAgICAqL1xuICAgIGF0dHIobmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yYXcuYXR0cmlidXRlc1tuYW1lXSB8fCBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgYWxsIGNoaWxkcmVuIHdpdGggdGhlIGdpdmVuIG5hbWVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgICAqIEByZXR1cm5zIHtFWldyYXB9XG4gICAgICovXG4gICAgYWxsKG5hbWUpIHtcbiAgICAgICAgY29uc3QgY2hpbGRyZW4gPSB0aGlzLnJhdy5jaGlsZHJlbi5maWx0ZXIobiA9PiBuLm5hbWUgPT09IG5hbWUpO1xuICAgICAgICByZXR1cm4gbmV3IEVaV3JhcChFWldyYXAuZ2V0RW1wdHlPYmplY3QoeyBuYW1lOiBgYWxsLSR7bmFtZX1gLCBjaGlsZHJlbiB9KSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgZmlyc3QgY2hpbGQgd2l0aCB0aGUgZ2l2ZW4gbmFtZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAgICogQHJldHVybnMge0VaV3JhcH1cbiAgICAgKi9cbiAgICBnZXQobmFtZSkge1xuICAgICAgICBjb25zdCBjaGlsZCA9IHRoaXMucmF3LmNoaWxkcmVuLmZpbmQobiA9PiBuLm5hbWUgPT09IG5hbWUpO1xuICAgICAgICByZXR1cm4gbmV3IEVaV3JhcChjaGlsZCB8fCBFWldyYXAuZ2V0RW1wdHlPYmplY3QoeyBuYW1lOiBgbm8tbWF0Y2hlcy1mb3ItJHtuYW1lfWB9KSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2ltaWxhciB0byBBcnJheS5maW5kKG5vZGUgPT4gYm9vbGVhbiksIHdoZXJlIG5vZGUgaXMgYW4gRVpXcmFwcGVkIGluc3RhbmNlIG9mIGVhY2ggY2hpbGRcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKEVaV3JhcCl9IGNsb3N1cmVcbiAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgKi9cbiAgICBmaW5kKGNsb3N1cmUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBFWldyYXAodGhpcy5yYXcuY2hpbGRyZW4uZmluZChuID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjbG9zdXJlKG5ldyBFWldyYXAobikpO1xuICAgICAgICB9KSB8fCBFWldyYXAuZ2V0RW1wdHlPYmplY3QoeyBuYW1lOiBgbm8tcmVzdWx0LWZvci1maW5kYH0pKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTaW1pbGFyIHRvIEFycmF5LmZvckVhY2gobm9kZSA9PiAuLi4pLCB3aGVyZSBub2RlIGlzIGFuIEVaV1JhcHBlZCBpbnN0YW5jZSBvZiBlYWNoIGNoaWxkXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbihFWldyYXApfSBjbG9zdXJlXG4gICAgICovXG4gICAgZm9yRWFjaChjbG9zdXJlKSB7XG4gICAgICAgIHRoaXMucmF3LmNoaWxkcmVuLmZvckVhY2gobiA9PiB7XG4gICAgICAgICAgICBjbG9zdXJlKG5ldyBFWldyYXAobikpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTaW1pbGFyIHRvIEFycmF5LmZpbHRlcihub2RlID0+IGJvb2xlYW4pLCB3aGVyZSBub2RlIGlzIGFuIEVaV3JhcHBlZCBpbnN0YW5jZSBvZiBlYWNoIGNoaWxkXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbihFWldyYXApfSBjbG9zdXJlXG4gICAgICogQHJldHVybnMgeyp9XG4gICAgICovXG4gICAgZmlsdGVyKGNsb3N1cmUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBFWldyYXAoRVpXcmFwLmdldEVtcHR5T2JqZWN0KHtcbiAgICAgICAgICAgIG5hbWU6IGBmaWx0ZXJlZC1yZXN1bHRzYCxcbiAgICAgICAgICAgIGNoaWxkcmVuOiB0aGlzLnJhdy5jaGlsZHJlbi5maWx0ZXIobiA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNsb3N1cmUobmV3IEVaV3JhcChuKSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2ltaWxhciB0byBBcnJheS5tYXAobm9kZSA9PiB2YWx1ZSksIHdoZXJlIG5vZGUgaXMgYW4gRVpXcmFwcGVkIGluc3RhbmNlIG9mIGVhY2ggY2hpbGRcbiAgICAgKiBAcGFyYW0gY2xvc3VyZVxuICAgICAqIEByZXR1cm5zIHsqfVxuICAgICAqL1xuICAgIG1hcChjbG9zdXJlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJhdy5jaGlsZHJlbi5tYXAobiA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY2xvc3VyZShuZXcgRVpXcmFwKG4pKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEVaV3JhcDsiXX0=
