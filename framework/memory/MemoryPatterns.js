"use strict";

/**
 * @enum
 */
const MemoryPatterns = {

    MEMORY: /\${1}/,
    CONSTANT: /\${2}/,
    FILE_CONSTANT: /\${3}/
};

module.exports = MemoryPatterns;