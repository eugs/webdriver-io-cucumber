"use strict";

/**
 * @interface
 * @type {IConstantMap}
 */
class IConstantMap {

    /**
     * Define constant by key
     * @param key
     * @param value
     */
    defineConstant(key, value) {
        throw new Error("Not implemented")
    }

    /**
     * Define file constant
     * @param key
     * @param value
     */
    defineFileConstant(key, value) {
        throw new Error("Not implemented")
    }

    /**
     * Get constant by key
     * @param key
     */
    getConstant(key) {
        throw new Error("Not implemented")
    }

    /**
     * Get file constant by key
     * @param key
     */
    getFileConstant(key) {
        throw new Error("Not implemented")
    }

}

module.exports = IConstantMap;