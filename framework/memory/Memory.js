"use strict";
const MemoryPatterns = require("./MemoryPatterns");

class Memory {

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
        let keys,
            value;
        if (MemoryPatterns.FILE_CONSTANT.test(key)) {
            keys = key.split(MemoryPatterns.FILE_CONSTANT);
            value = this._getFileConstantValue(keys[1]);

            return this.concatValues(keys, value);

        } else if (MemoryPatterns.CONSTANT.test(key)) {
            keys = key.split(MemoryPatterns.CONSTANT);
            value = this._getConstantValue(keys[1]);

            return this.concatValues(keys, value);

        } else if (MemoryPatterns.MEMORY.test(key)) {
            keys = key.split(MemoryPatterns.MEMORY);
            value = this._getMemoryValue(keys[1]);

            return this.concatValues(keys, value);

        } else {

            return key
        }
    }

    /**
     * Concat part key with saved value
     * @param {Array} keys 
     * @param {*} value
     */
    static concatValues(keys, value) {
        if (keys[0]) {
            return (keys[0] + value);
        } else {
            return value;
        }
    }

    /**
     * Set constant map
     * @param map {ConstantMap}
     */
    static setConstantMap(map) {
        this.constantMap = new map();
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
        return this.constantMap.getConstant(key)
    }

    /**
     * Get constant by key
     * @private
     * @param key
     * @return value by key
     */
    static _getFileConstantValue(key) {
        return this.constantMap.getFileConstant(key)
    }

}

module.exports = Memory;