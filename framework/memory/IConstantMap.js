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

}

module.exports = IConstantMap;