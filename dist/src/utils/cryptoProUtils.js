"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cryptoProSign = void 0;
const child_process_1 = require("child_process");
const logUtils_1 = require("./logUtils");
const config_1 = require("../config");
const errors_1 = require("../types/errors");
const tempy = require("tempy");
const promises_1 = require("fs/promises");
const path_1 = require("path");
const execute = (command) => {
    return new Promise((resolve, reject) => {
        child_process_1.exec(command, (err, stdout) => {
            if (err) {
                return reject(stdout || err.message);
            }
            else {
                resolve(stdout);
            }
        });
    });
};
let contrainerHash = null;
const getContainerHash = async () => {
    if (!contrainerHash) {
        const response = await execute('certmgr -list');
        const match = response.match(/SHA1 Hash\s*: (\w+)$/m);
        if (!match) {
            throw new errors_1.InternalException('Cannot get container hash. It seems that service is not correctly configured');
        }
        contrainerHash = match[1];
    }
    return contrainerHash;
};
const cryptoProSign = async (str) => {
    const containerHash = await getContainerHash();
    try {
        const tempFile = tempy.file({ extension: 'unsigned' });
        const signedFile = tempFile + '.sgn';
        await promises_1.writeFile(tempFile, str);
        const dirName = path_1.dirname(tempFile);
        const cmd = `cryptcp -signf -dir "${dirName}" -thumbprint "${containerHash}" -norev -nochain "${tempFile}" -cert -der -strict -hashAlg "1.2.643.7.1.1.2.2" -detached -pin "${config_1.CERTIFICATE_PIN}"`;
        await execute(cmd);
        const result = await promises_1.readFile(signedFile);
        await promises_1.unlink(signedFile);
        await promises_1.unlink(tempFile);
        return result.toString('base64');
    }
    catch (e) {
        logUtils_1.logError(`sign error ${e}`, '', 'СryptoProSign');
        throw new errors_1.InternalException('Failed to create sign. It seems that service is not correctly configured');
    }
};
exports.cryptoProSign = cryptoProSign;
