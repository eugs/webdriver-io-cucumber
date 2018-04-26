"use strict";
const fs = require("fs");
const path = require("path");

class ConstantMap {

    constructor() {
        this.constants = new Map();
        this.fileConstants = new Map();
    }

    /**
     * Define constant by key
     * @param key
     * @param value
     */
    defineConstant(key, value) {
        this.constants.set(key,value);
    }

    /**
     * Define file constant
     * @param key
     * @param value
     */
    defineFileConstant(key, value) {
        this.fileConstants.set(key, value);
    }

    /**
     * Get constant by key
     * @param key
     * @return {V}
     */
    getConstant(key) {
        if (this.constants.has(key)) {
            return this.constants.get(key)
        } else {
            throw new Error(`Constant key ${key} does not exist`)
        }
    }

    /**
     * Get file constant by key
     * @param key
     * @return {*}
     */
    getFileConstant(key) {
        if (this.constants.has(key)) {
            const filePath = this.constants.get(key);
            return fs.readFileSync(path.resolve(filePath))
        } else {
            throw new Error(`Constant key ${key} does not exist`)
        }
    }
}

module.exports = ConstantMap;