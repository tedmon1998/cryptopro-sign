"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalException = void 0;
const common_1 = require("@nestjs/common");
class InternalException extends common_1.HttpException {
    constructor(errorMessage) {
        super({
            errorMessage,
            errorCode: 1,
        }, 500);
    }
}
exports.InternalException = InternalException;
