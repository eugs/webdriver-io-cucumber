"use strict";
const MemoryPatterns = require("./MemoryPatterns");

class Memory {

    constructor() {
        if (!this.memory) {
            this.memory = new Map();
        }
    }
    /**
     * Set value by key
     * @param key
     * @param value
     */
    setValue(key, value) {
        // this._initMemory();
        this.memory.set(key, value);
    }

    getMemory() {
        return this.memory;
    }
    /**
    * Get value by key
    * @param key
    * @return value by key
    */
    getValue(key) {
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
    concatValues(keys, value) {
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
    setConstantMap(map) {
        this.constantMap = new map();
    }

    /**
     * Get value by key
     * @private
     * @param key
     * @return value by key
     */
    _getMemoryValue(key) {
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
    _getConstantValue(key) {
        return this.constantMap.getConstant(key)
    }

    /**
     * Get constant by key
     * @private
     * @param key
     * @return value by key
     */
    _getFileConstantValue(key) {
        return this.constantMap.getFileConstant(key)
    }

}

exports.memory = new Memory();