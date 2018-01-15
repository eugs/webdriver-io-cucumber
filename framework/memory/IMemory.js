"use strict";

/**
 * @interface
 * @type IMemory
 */
class IMemory {

    /**
     * Set value by key
     * @param key
     * @param value
     */
    setValue(key, value) {
        throw new Error("Not implemented")
    }

    /**
     * Get value by key
     * @param key
     * @return value by key
     */
    getValue(key) {
        throw new Error("Not implemented")
    }

    /**
     * Set constant map
     * @param map {class}
     */
    setConstantMap(map) {
        throw new Error("Not implemented")
    }

}

module.exports = IMemory;