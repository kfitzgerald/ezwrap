require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"ezwrap":[function(require,module,exports){
"use strict"; // browser shim util - not needed for browser, don't bloat

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

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


var EZWrap = /*#__PURE__*/function (_Util$inspect$custom) {
  /**
   * Creates a new wrapped instance of an parsed XML object
   * @param {*} obj
   */
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
    key: _Util$inspect$custom,
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
    /**
     * Gets the value of an attribute contained on the node
     * @param {string} name
     * @returns {string|null}
     */

  }, {
    key: "attr",
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
  }], [{
    key: "getEmptyObject",
    value:
    /**
     * Creates an empty node
     * @param children
     * @param name
     * @param attributes
     * @param value
     * @returns {{children: Array, name: string, attributes, value: string}}
     */
    function getEmptyObject() {
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
  }]);

  return EZWrap;
}(Util.inspect.custom);

module.exports = EZWrap;

},{"util":"util"}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJFWldyYXAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxhLENBRUE7Ozs7Ozs7O0FBQ0EsSUFBSSxJQUFKOztBQUNBLElBQUksT0FBTyxNQUFQLEtBQWtCLFdBQXRCLEVBQW1DO0FBQy9CLEVBQUEsSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFELENBQWQ7QUFDSCxDQUZELE1BRU87QUFDSCxFQUFBLElBQUksR0FBRztBQUFFLElBQUEsT0FBTyxFQUFFO0FBQUUsTUFBQSxNQUFNLEVBQUU7QUFBVjtBQUFYLEdBQVA7QUFDSDtBQUVEO0FBQ0E7QUFDQTs7O0lBQ00sTTtBQWNGO0FBQ0o7QUFDQTtBQUNBO0FBQ0ksa0JBQVksR0FBWixFQUFpQjtBQUFBOztBQUViO0FBQ1I7QUFDQTtBQUNBO0FBQ1EsU0FBSyxHQUFMLEdBQVcsR0FBWDtBQUNIO0FBRUQ7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztXQUNJLGVBQXNCLEtBQXRCLEVBQTZCLE9BQTdCLEVBQXNDO0FBQUE7O0FBRWxDLFVBQU0sZUFBZSxHQUFHLE1BQU0sQ0FBQyxJQUFQLENBQVksS0FBSyxHQUFMLENBQVMsVUFBckIsRUFBaUMsR0FBakMsQ0FBcUMsVUFBQSxHQUFHO0FBQUEseUJBQU8sR0FBUCxnQkFBZSxLQUFJLENBQUMsR0FBTCxDQUFTLFVBQVQsQ0FBb0IsR0FBcEIsQ0FBZjtBQUFBLE9BQXhDLEVBQW9GLElBQXBGLENBQXlGLEdBQXpGLENBQXhCO0FBQ0EsVUFBTSxPQUFPLGNBQU8sS0FBSyxJQUFaLFNBQW1CLGVBQWUsR0FBSSxNQUFJLGVBQVIsR0FBMkIsRUFBN0QsTUFBYjtBQUNBLFVBQU0sSUFBSSxHQUFHLEtBQUssR0FBTCxDQUFTLFFBQVQsQ0FBa0IsR0FBbEIsQ0FBc0IsVUFBQSxDQUFDO0FBQUEsNEJBQVUsQ0FBQyxDQUFDLElBQVo7QUFBQSxPQUF2QixFQUFrRCxJQUFsRCxDQUF1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QUFXLENBQVgsQ0FBRCxDQUFkO0FBQ0gsU0FGUztBQUYwQixPQUF0QixDQUFYLENBQVA7QUFNSDtBQUVEO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7Ozs7V0FDSSxhQUFJLE9BQUosRUFBYTtBQUNULGFBQU8sS0FBSyxHQUFMLENBQVMsUUFBVCxDQUFrQixHQUFsQixDQUFzQixVQUFBLENBQUMsRUFBSTtBQUM5QixlQUFPLE9BQU8sQ0FBQyxJQUFJLE1BQUosQ0FBVyxDQUFYLENBQUQsQ0FBZDtBQUNILE9BRk0sQ0FBUDtBQUdIOzs7O0FBbEpEO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSSw4QkFBOEU7QUFBQSxxRkFBSixFQUFJO0FBQUEsK0JBQXRELFFBQXNEO0FBQUEsVUFBdEQsUUFBc0QsOEJBQTdDLEVBQTZDO0FBQUEsMkJBQXpDLElBQXlDO0FBQUEsVUFBekMsSUFBeUMsMEJBQXBDLEVBQW9DO0FBQUEsaUNBQWhDLFVBQWdDO0FBQUEsVUFBaEMsVUFBZ0MsZ0NBQXJCLEVBQXFCO0FBQUEsNEJBQWpCLEtBQWlCO0FBQUEsVUFBakIsS0FBaUIsMkJBQVgsRUFBVzs7QUFDMUUsYUFBTztBQUFFLFFBQUEsSUFBSSxFQUFKLElBQUY7QUFBUSxRQUFBLEtBQUssRUFBTCxLQUFSO0FBQWUsUUFBQSxVQUFVLEVBQVYsVUFBZjtBQUEyQixRQUFBLFFBQVEsRUFBUjtBQUEzQixPQUFQO0FBQ0g7Ozs7RUFxQkEsSUFBSSxDQUFDLE9BQUwsQ0FBYSxNOztBQXNIbEIsTUFBTSxDQUFDLE9BQVAsR0FBaUIsTUFBakIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJcInVzZSBzdHJpY3RcIjtcblxuLy8gYnJvd3NlciBzaGltIHV0aWwgLSBub3QgbmVlZGVkIGZvciBicm93c2VyLCBkb24ndCBibG9hdFxubGV0IFV0aWw7XG5pZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBVdGlsID0gcmVxdWlyZSgndXRpbCcpO1xufSBlbHNlIHtcbiAgICBVdGlsID0geyBpbnNwZWN0OiB7IGN1c3RvbTogJ19fY3VzdG9tSW5zcGVjdCcgfSB9XG59XG5cbi8qKlxuICogV3JhcHBlciBmb3IgYWNjZXNzaW5nIHBhcnNlZCBYTUwgb2JqZWN0c1xuICovXG5jbGFzcyBFWldyYXAge1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBlbXB0eSBub2RlXG4gICAgICogQHBhcmFtIGNoaWxkcmVuXG4gICAgICogQHBhcmFtIG5hbWVcbiAgICAgKiBAcGFyYW0gYXR0cmlidXRlc1xuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqIEByZXR1cm5zIHt7Y2hpbGRyZW46IEFycmF5LCBuYW1lOiBzdHJpbmcsIGF0dHJpYnV0ZXMsIHZhbHVlOiBzdHJpbmd9fVxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRFbXB0eU9iamVjdCh7IGNoaWxkcmVuPVtdLCBuYW1lPScnLCBhdHRyaWJ1dGVzPXt9LCB2YWx1ZT0nJyB9ID0ge30pIHtcbiAgICAgICAgcmV0dXJuIHsgbmFtZSwgdmFsdWUsIGF0dHJpYnV0ZXMsIGNoaWxkcmVuIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyB3cmFwcGVkIGluc3RhbmNlIG9mIGFuIHBhcnNlZCBYTUwgb2JqZWN0XG4gICAgICogQHBhcmFtIHsqfSBvYmpcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvYmopIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogUmV0dXJucyB0aGUgdW5kZXJseWluZyBvYmplY3QgZnJvbSB0aGUgb3JpZ2luYWwgWE1MIHRyZWVcbiAgICAgICAgICogQHR5cGUgeyp9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnJhdyA9IG9iajtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDdXN0b20gSW5zcGVjdGlvbiBmb3IgTm9kZS5qc1xuICAgICAqIEBwYXJhbSBkZXB0aFxuICAgICAqIEBwYXJhbSBvcHRpb25zXG4gICAgICogQHJldHVybnMgeyp9XG4gICAgICovXG4gICAgW1V0aWwuaW5zcGVjdC5jdXN0b21dKGRlcHRoLCBvcHRpb25zKSB7XG5cbiAgICAgICAgY29uc3QgYXR0cmlidXRlU3RyaW5nID0gT2JqZWN0LmtleXModGhpcy5yYXcuYXR0cmlidXRlcykubWFwKGtleSA9PiBgJHtrZXl9PVwiJHt0aGlzLnJhdy5hdHRyaWJ1dGVzW2tleV19XCJgKS5qb2luKCcgJyk7XG4gICAgICAgIGNvbnN0IG9wZW5UYWcgPSBgPCR7dGhpcy5uYW1lfSR7YXR0cmlidXRlU3RyaW5nID8gKCcgJythdHRyaWJ1dGVTdHJpbmcpIDogJyd9PmA7XG4gICAgICAgIGNvbnN0IGJvZHkgPSB0aGlzLnJhdy5jaGlsZHJlbi5tYXAobiA9PiBgICA8JHtuLm5hbWV9IC4uLiAvPmApLmpvaW4oJ1xcbicpIHx8ICh0aGlzLnJhdy52YWx1ZSAmJiAoJyAgJyArIHRoaXMucmF3LnZhbHVlKSkgfHwgJyc7XG5cbiAgICAgICAgcmV0dXJuIG9wdGlvbnMuc3R5bGl6ZShvcGVuVGFnICsgJ1xcbicgKyBib2R5ICsgYFxcbjwvJHt0aGlzLm5hbWV9PmApO1xuICAgIH1cblxuICAgIC8vIG5vaW5zcGVjdGlvbiBKU01ldGhvZENhbkJlU3RhdGljXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB3aGV0aGVyIHRoZSBvYmplY3QgaXMgYSBFWldyYXBwZWQgb2JqZWN0XG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgZ2V0IGlzV3JhcHBlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgbnVtYmVyIG9mIGNoaWxkcmVuIGNvbnRhaW5lZCBpbiB0aGUgbm9kZVxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgZ2V0IGxlbmd0aCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmF3LmNoaWxkcmVuLmxlbmd0aDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBub2RlIHZhbHVlXG4gICAgICogQHJldHVybnMge3N0cmluZ3xudWxsfVxuICAgICAqL1xuICAgIGdldCB2YWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmF3LnZhbHVlIHx8IG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgbm9kZSBuYW1lXG4gICAgICogQHJldHVybnMge3N0cmluZ3xudWxsfVxuICAgICAqL1xuICAgIGdldCBuYW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yYXcubmFtZSB8fCBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHZhbHVlIG9mIGFuIGF0dHJpYnV0ZSBjb250YWluZWQgb24gdGhlIG5vZGVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd8bnVsbH1cbiAgICAgKi9cbiAgICBhdHRyKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmF3LmF0dHJpYnV0ZXNbbmFtZV0gfHwgbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGFsbCBjaGlsZHJlbiB3aXRoIHRoZSBnaXZlbiBuYW1lXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICAgKiBAcmV0dXJucyB7RVpXcmFwfVxuICAgICAqL1xuICAgIGFsbChuYW1lKSB7XG4gICAgICAgIGNvbnN0IGNoaWxkcmVuID0gdGhpcy5yYXcuY2hpbGRyZW4uZmlsdGVyKG4gPT4gbi5uYW1lID09PSBuYW1lKTtcbiAgICAgICAgcmV0dXJuIG5ldyBFWldyYXAoRVpXcmFwLmdldEVtcHR5T2JqZWN0KHsgbmFtZTogYGFsbC0ke25hbWV9YCwgY2hpbGRyZW4gfSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGZpcnN0IGNoaWxkIHdpdGggdGhlIGdpdmVuIG5hbWVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgICAqIEByZXR1cm5zIHtFWldyYXB9XG4gICAgICovXG4gICAgZ2V0KG5hbWUpIHtcbiAgICAgICAgY29uc3QgY2hpbGQgPSB0aGlzLnJhdy5jaGlsZHJlbi5maW5kKG4gPT4gbi5uYW1lID09PSBuYW1lKTtcbiAgICAgICAgcmV0dXJuIG5ldyBFWldyYXAoY2hpbGQgfHwgRVpXcmFwLmdldEVtcHR5T2JqZWN0KHsgbmFtZTogYG5vLW1hdGNoZXMtZm9yLSR7bmFtZX1gfSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNpbWlsYXIgdG8gQXJyYXkuZmluZChub2RlID0+IGJvb2xlYW4pLCB3aGVyZSBub2RlIGlzIGFuIEVaV3JhcHBlZCBpbnN0YW5jZSBvZiBlYWNoIGNoaWxkXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbihFWldyYXApfSBjbG9zdXJlXG4gICAgICogQHJldHVybnMgeyp9XG4gICAgICovXG4gICAgZmluZChjbG9zdXJlKSB7XG4gICAgICAgIHJldHVybiBuZXcgRVpXcmFwKHRoaXMucmF3LmNoaWxkcmVuLmZpbmQobiA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY2xvc3VyZShuZXcgRVpXcmFwKG4pKTtcbiAgICAgICAgfSkgfHwgRVpXcmFwLmdldEVtcHR5T2JqZWN0KHsgbmFtZTogYG5vLXJlc3VsdC1mb3ItZmluZGB9KSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2ltaWxhciB0byBBcnJheS5mb3JFYWNoKG5vZGUgPT4gLi4uKSwgd2hlcmUgbm9kZSBpcyBhbiBFWldSYXBwZWQgaW5zdGFuY2Ugb2YgZWFjaCBjaGlsZFxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oRVpXcmFwKX0gY2xvc3VyZVxuICAgICAqL1xuICAgIGZvckVhY2goY2xvc3VyZSkge1xuICAgICAgICB0aGlzLnJhdy5jaGlsZHJlbi5mb3JFYWNoKG4gPT4ge1xuICAgICAgICAgICAgY2xvc3VyZShuZXcgRVpXcmFwKG4pKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2ltaWxhciB0byBBcnJheS5maWx0ZXIobm9kZSA9PiBib29sZWFuKSwgd2hlcmUgbm9kZSBpcyBhbiBFWldyYXBwZWQgaW5zdGFuY2Ugb2YgZWFjaCBjaGlsZFxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oRVpXcmFwKX0gY2xvc3VyZVxuICAgICAqIEByZXR1cm5zIHsqfVxuICAgICAqL1xuICAgIGZpbHRlcihjbG9zdXJlKSB7XG4gICAgICAgIHJldHVybiBuZXcgRVpXcmFwKEVaV3JhcC5nZXRFbXB0eU9iamVjdCh7XG4gICAgICAgICAgICBuYW1lOiBgZmlsdGVyZWQtcmVzdWx0c2AsXG4gICAgICAgICAgICBjaGlsZHJlbjogdGhpcy5yYXcuY2hpbGRyZW4uZmlsdGVyKG4gPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBjbG9zdXJlKG5ldyBFWldyYXAobikpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNpbWlsYXIgdG8gQXJyYXkubWFwKG5vZGUgPT4gdmFsdWUpLCB3aGVyZSBub2RlIGlzIGFuIEVaV3JhcHBlZCBpbnN0YW5jZSBvZiBlYWNoIGNoaWxkXG4gICAgICogQHBhcmFtIGNsb3N1cmVcbiAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgKi9cbiAgICBtYXAoY2xvc3VyZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yYXcuY2hpbGRyZW4ubWFwKG4gPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGNsb3N1cmUobmV3IEVaV3JhcChuKSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBFWldyYXA7Il19
