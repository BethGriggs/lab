'use strict';

// Load modules

const Code = require('@hapi/code');
const _Lab = require('../test_runner');
const Utils = require('../lib/utils');


// Declare internals

const internals = {};


// Test shortcuts

const lab = exports.lab = _Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;


describe('Utils', () => {

    it('merges options', () => {

        const parent = {
            a: 1,
            b: 2
        };

        const child = {
            b: 3,
            c: 4
        };

        const merged = Utils.mergeOptions(parent, child);
        expect(merged).to.equal({ a: 1, b: 3, c: 4 });
    });

    it('merges options (no child)', () => {

        const parent = {
            a: 1,
            b: 2
        };

        const merged = Utils.mergeOptions(parent, null);
        expect(merged).to.equal({ a: 1, b: 2 });
    });

    it('merges options (no parent)', () => {

        const child = {
            b: 3,
            c: 4
        };

        const merged = Utils.mergeOptions(null, child);
        expect(merged).to.equal({ b: 3, c: 4 });
    });

    it('ignores parent options', () => {

        const parent = {
            a: 1,
            b: 2,
            e: 5,
            f: 6
        };

        const child = {
            b: 3,
            c: 4
        };

        const merged = Utils.mergeOptions(parent, child, ['e', 'f']);
        expect(merged).to.equal({ a: 1, b: 3, c: 4 });
    });

    it('copy child keys onto parent', () => {

        const parent = {
            a: 1,
            b: 2,
            e: 5,
            f: 6
        };

        const child = {
            b: 3,
            c: 4
        };

        Utils.applyOptions(parent, child);
        expect(parent).to.equal({ a: 1, b: 3, c: 4, e: 5, f: 6 });
    });

    describe('position()', () => {

        it('ignores invalid stack', () => {

            expect(Utils.position({ stack: '' })).to.equal({});
        });
    });
});
