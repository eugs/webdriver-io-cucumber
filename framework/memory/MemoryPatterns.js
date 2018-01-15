"use strict";

/**
 * @enum
 */
const MemoryPatterns = {

    MEMORY: /^\$(.+$)/,
    CONSTANT: /^\$\$(.+$)/

};

module.exports = MemoryPatterns;