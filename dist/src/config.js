"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActualEnv = exports.isValidEnv = exports.LOG_LEVEL = exports.SWAGGER_BASE_PATH = exports.PORT = exports.CERTIFICATE_PIN = exports.ROOT_DIR = exports.BUILD_INFO = void 0;
const dotenv_1 = require("dotenv");
const package_json_1 = require("../package.json");
const fs_1 = require("fs");
const path = require("path");
dotenv_1.config();
function prepareBuildInfo() {
    const buildDefault = {
        BUILD_ID: 'development',
        GIT_COMMIT: 'development',
        DOCKER_TAG: 'development',
        VERSION: package_json_1.version,
    };
    try {
        const info = fs_1.readFileSync('versions.json').toString();
        return {
            ...buildDefault,
            ...JSON.parse(info),
        };
    }
    catch (err) {
        console.error('not found versions.json', err.message);
    }
    return buildDefault;
}
function getEnv(name, defaultValue) {
    var _a;
    return (_a = process.env[name]) !== null && _a !== void 0 ? _a : defaultValue;
}
function parseLogLevel() {
    const logLevel = getEnv('LOG_LEVEL', 'debug,log,warn,error');
    return new Set(logLevel.trim()
        .replace(/ +/g, '')
        .split(',')
        .map((s) => s.trim()));
}
exports.BUILD_INFO = prepareBuildInfo();
exports.ROOT_DIR = path.resolve(__dirname, '..');
exports.CERTIFICATE_PIN = getEnv('CERTIFICATE_PIN');
exports.PORT = Number(getEnv('PORT', 3037));
exports.SWAGGER_BASE_PATH = getEnv('SWAGGER_BASE_PATH', '/');
exports.LOG_LEVEL = parseLogLevel();
const isValidEnv = () => {
    const config = getActualEnv();
    return Object.keys(config).reduce((isValid, key) => {
        if (config[key] === undefined || Number.isNaN(config[key])) {
            console.error(`Please set config/env variable: ${key}`);
            return false;
        }
        return isValid;
    }, true);
};
exports.isValidEnv = isValidEnv;
function getActualEnv() {
    return {
        CERTIFICATE_PIN: exports.CERTIFICATE_PIN,
        LOG_LEVEL: exports.LOG_LEVEL,
        PORT: exports.PORT,
        SWAGGER_BASE_PATH: exports.SWAGGER_BASE_PATH,
    };
}
exports.getActualEnv = getActualEnv;
