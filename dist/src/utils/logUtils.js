"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logDebug = exports.log = exports.logWarn = exports.logError = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("../config");
const loggerService = new common_1.Logger();
const logError = (message, trace, context) => {
    if (!config_1.LOG_LEVEL.has('error')) {
        return;
    }
    loggerService.error(message, trace, context);
};
exports.logError = logError;
const logWarn = (message, context) => {
    if (!config_1.LOG_LEVEL.has('warn')) {
        return;
    }
    loggerService.warn(message, context);
};
exports.logWarn = logWarn;
const log = (message, context) => {
    if (!config_1.LOG_LEVEL.has('log')) {
        return;
    }
    loggerService.log(message, context);
};
exports.log = log;
const logDebug = (message, context) => {
    if (!config_1.LOG_LEVEL.has('debug')) {
        return;
    }
    loggerService.debug(message, context);
};
exports.logDebug = logDebug;
