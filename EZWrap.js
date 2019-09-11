"use strict";

// browser shim util - not needed for browser, don't bloat
let Util;
if (typeof window === 'undefined') {
    Util = require('util');
} else {
    Util = { inspect: { custom: '__customInspect' } }
}

/**
 * Wrapper for accessing parsed XML objects
 */
class EZWrap {

    /**
     * Creates an empty node
     * @param children
     * @param name
     * @param attributes
     * @param value
     * @returns {{children: Array, name: string, attributes, value: string}}
     */
    static getEmptyObject({ children=[], name='', attributes={}, value='' } = {}) {
        return { name, value, attributes, children };
    }

    /**
     * Creates a new wrapped instance of an parsed XML object
     * @param {*} obj
     */
    constructor(obj) {

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
    [Util.inspect.custom](depth, options) {

        const attributeString = Object.keys(this.raw.attributes).map(key => `${key}="${this.raw.attributes[key]}"`).join(' ');
        const openTag = `<${this.name}${attributeString ? (' '+attributeString) : ''}>`;
        const body = this.raw.children.map(n => `  <${n.name} ... />`).join('\n') || (this.raw.value && ('  ' + this.raw.value)) || '';

        return options.stylize(openTag + '\n' + body + `\n</${this.name}>`);
    }

    // noinspection JSMethodCanBeStatic
    /**
     * Returns whether the object is a EZWrapped object
     * @returns {boolean}
     */
    get isWrapped() {
        return true;
    }

    /**
     * Gets the number of children contained in the node
     * @returns {number}
     */
    get length() {
        return this.raw.children.length;
    }

    /**
     * Gets the node value
     * @returns {string|null}
     */
    get value() {
        return this.raw.value || null;
    }

    /**
     * Gets the node name
     * @returns {string|null}
     */
    get name() {
        return this.raw.name || null;
    }

    /**
     * Gets the value of an attribute contained on the node
     * @param {string} name
     * @returns {string|null}
     */
    attr(name) {
        return this.raw.attributes[name] || null;
    }

    /**
     * Gets all children with the given name
     * @param {string} name
     * @returns {EZWrap}
     */
    all(name) {
        const children = this.raw.children.filter(n => n.name === name);
        return new EZWrap(EZWrap.getEmptyObject({ name: `all-${name}`, children }));
    }

    /**
     * Gets the first child with the given name
     * @param {string} name
     * @returns {EZWrap}
     */
    get(name) {
        const child = this.raw.children.find(n => n.name === name);
        return new EZWrap(child || EZWrap.getEmptyObject({ name: `no-matches-for-${name}`}));
    }

    /**
     * Similar to Array.find(node => boolean), where node is an EZWrapped instance of each child
     * @param {function(EZWrap)} closure
     * @returns {*}
     */
    find(closure) {
        return new EZWrap(this.raw.children.find(n => {
            return closure(new EZWrap(n));
        }) || EZWrap.getEmptyObject({ name: `no-result-for-find`}));
    }

    /**
     * Similar to Array.forEach(node => ...), where node is an EZWRapped instance of each child
     * @param {function(EZWrap)} closure
     */
    forEach(closure) {
        this.raw.children.forEach(n => {
            closure(new EZWrap(n));
        });
    }

    /**
     * Similar to Array.filter(node => boolean), where node is an EZWrapped instance of each child
     * @param {function(EZWrap)} closure
     * @returns {*}
     */
    filter(closure) {
        return new EZWrap(EZWrap.getEmptyObject({
            name: `filtered-results`,
            children: this.raw.children.filter(n => {
                return closure(new EZWrap(n));
            })
        }));
    }

    /**
     * Similar to Array.map(node => value), where node is an EZWrapped instance of each child
     * @param closure
     * @returns {*}
     */
    map(closure) {
        return this.raw.children.map(n => {
            return closure(new EZWrap(n));
        });
    }
}

module.exports = EZWrap;