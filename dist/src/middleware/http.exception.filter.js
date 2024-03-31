"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionFilter = void 0;
const logUtils_1 = require("../utils/logUtils");
class HttpExceptionFilter {
    catch(exception, host) {
        var _a;
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        if (typeof exception === 'string' || !('getStatus' in exception)) {
            const err = (_a = exception === null || exception === void 0 ? void 0 : exception.message) !== null && _a !== void 0 ? _a : exception;
            const body = JSON.stringify(request.body, null, 2);
            logUtils_1.logError(`${request.url} ${err} req body: ${body}`, exception.stack, 'Unhandled rest exception');
            return response.status(500).json({
                errorMessage: err,
            });
        }
        const status = exception.getStatus();
        const exceptionResponse = exception.getResponse();
        if (typeof exceptionResponse !== 'object') {
            return response.status(status).json({ errorMessage: exceptionResponse });
        }
        if (Array.isArray(exceptionResponse.message)) {
            return response.status(status).json({
                errorCode: 0,
                errorMessage: exceptionResponse.message.join(', '),
            });
        }
        return response.status(status).json(exceptionResponse);
    }
}
exports.HttpExceptionFilter = HttpExceptionFilter;
