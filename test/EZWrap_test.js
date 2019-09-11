"use strict";

const EZWrap = require('../EZWrap');
const should = require('should');
const Util = require('util');
const Path = require('path');

describe('EZWrap', () => {

    it('should handle basic functions and use cases', () => {

        const xml = {
            name: 'a',
            value: '',
            attributes: {
                href: 'http://example.com'
            },
            children: [
                { name: 'span', attributes: {}, children: [], value: 'Click Me' }
            ]
        };

        const xmlEdge = {
            name: '',
            value: '',
            attributes: {},
            children: [
                { name: 'span', attributes: {}, children: [], value: 'Click Me' },
                { name: 'span', attributes: {}, children: [], value: 'Something Different' }
            ]
        };

        const emptyXml = {
            name: 'hr',
            attributes: {},
            children: [],
            value: ''
        };

        const wrap = new EZWrap(xml);
        const edgeWrap = new EZWrap(xmlEdge);
        const emptyWrap = new EZWrap(emptyXml);

        // check isWrapped object property
        wrap.isWrapped.should.be.exactly(true);

        // Check children length
        wrap.length.should.be.exactly(1);

        // Check value
        should(wrap.value).be.exactly(null);
        wrap.get('span').value.should.be.exactly('Click Me');

        // Check name
        wrap.name.should.be.exactly('a');
        should(edgeWrap.name).be.exactly(null);

        // Check get
        wrap.get('nope').should.be.ok();

        // Check attributes
        wrap.attr('href').should.be.exactly('http://example.com');
        should(wrap.attr('nope')).be.exactly(null);

        // Check all
        edgeWrap.all('span').length.should.be.exactly(2);
        edgeWrap.get('span').value.should.be.ok();

        // Check find
        edgeWrap.find(n => n.value === 'Click Me').value.should.be.ok();
        edgeWrap.find(n => n.value === 'Click Me').isWrapped.should.be.exactly(true);
        edgeWrap.find(n => n.value === 'nope').isWrapped.should.be.exactly(true);

        // Check forEach
        let counter = 0;
        edgeWrap.forEach(() => counter++);
        counter.should.be.exactly(2);

        // Check filter
        edgeWrap.filter(n => n.value === 'Something Different').length.should.be.exactly(1);
        edgeWrap.filter(n => n.value === 'Something Different').isWrapped.should.be.exactly(true);

        // Check map
        edgeWrap.map(n => n.value).length.should.be.exactly(2);

        console.log(Util.inspect(wrap, { colors: true, depth: 10 }));
        console.log(Util.inspect(wrap.get('span'), { colors: true, depth: 10 }));
        console.log(Util.inspect(edgeWrap, { colors: true, depth: 10 }));
        console.log(Util.inspect(emptyWrap, { colors: true, depth: 10 }));

    });

    it('getEmptyObject should handle defaults', () => {

        const res = EZWrap.getEmptyObject();
        should(res).be.ok();
        should(res.name).be.exactly('');
        should(res.value).be.exactly('');
        should(res.attributes).be.ok();
        should(res.children).be.ok();
    });

    describe('browser environment', () => {

        const cacheFile = Path.join(__dirname, '../EZWrap.js');
        let EZWrap;

        before(() => {
            // entry should be cached
            should(require.cache[cacheFile]).be.ok();

            // remove from cache, will force a reload on next require
            delete require.cache[cacheFile];

            // fake the window environment
            global.window = { mocked: true };

            EZWrap = require('../EZWrap');
            should(EZWrap).be.ok();
        });

        after(() => {
            delete global.window;
            delete require.cache[cacheFile];
        });

        it('should work in a browser environment', () => {

            const xml = {
                name: 'a',
                value: '',
                attributes: {
                    href: 'http://example.com'
                },
                children: [
                    { name: 'span', attributes: {}, children: [], value: 'Click Me' }
                ]
            };

            const wrap = new EZWrap(xml);
            wrap.isWrapped.should.be.exactly(true);

        });

    });


});