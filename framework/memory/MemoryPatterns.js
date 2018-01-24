"use strict";

/**
 * @enum
 */
const MemoryPatterns = {

    MEMORY: /^\$(.+$)/,
    CONSTANT: /^\$\$(.+$)/,
    FILE_CONSTANT: /^\$\$\$(.+$)/
};

module.exports = MemoryPatterns;