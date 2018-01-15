"use strict";

/**
 * @interface
 * @type {IConstantMap}
 */
const IConstantMap = require("./IConstantMap");

/**
 * @implements IConstantMap
 */
class ConstantMap implements IConstantMap {

    constructor() {
        this.constants = new Map();
    }

    /**
     * Define constant by key
     * @param key
     * @param value
     */
    defineConstant(key, value) {
        this.constants.set(key,value);
    }

}

module.exports = ConstantMap;