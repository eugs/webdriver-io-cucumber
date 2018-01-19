"use strict";
/**
 * @interface
 * @type {IMemory}
 */
const IMemory = require("./IMemory");
const MemoryPatterns = require("./MemoryPatterns");

/**
 * @implements IMemory
 */
class Memory extends IMemory {

    /**
     * Set value by key
     * @param key
     * @param value
     */
    static setValue(key, value) {
        this._initMemory();
        this.memory.set(key, value);
    }

    /**
     * Get value by key
     * @param key
     * @return value by key
     */
    static getValue(key) {
        if (MemoryPatterns.MEMORY.test(key)) {
            return this._getMemoryValue(key.match(MemoryPatterns.MEMORY))
        } else if (MemoryPatterns.CONSTANT.test(key)) {
            return this._getConstantValue(key.match(MemoryPatterns.CONSTANT))
        } else return key
    }


    /**
     * Set constant map
     * @param map {ConstantMap}
     */
    static setConstantMap(map) {
        this.constants = new map().constants;
    }

    /**
     * Init memory
     * @private
     */
    static _initMemory() {
        if (!this.memory) {
            this.memory = new Map();
        }
    }

    /**
     * Get value by key
     * @private
     * @param key
     * @return value by key
     */
    static _getMemoryValue(key) {
        if (this.memory.has(key)) {
            return this.memory.get(key)
        } else {
            throw new Error(`Memory ${key} does not exist`)
        }
    }

    /**
     * Get constant by key
     * @private
     * @param key
     * @return value by key
     */
    static _getConstantValue(key) {
        if (this.constants.has(key)) {
            return this.constants.get(key)
        } else {
            throw new Error(`Constant key ${key} does not exist`)
        }
    }

}

module.exports = Memory;