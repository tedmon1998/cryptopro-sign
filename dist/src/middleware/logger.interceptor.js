"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerInterceptor = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const operators_1 = require("rxjs/operators");
const logUtils_1 = require("../utils/logUtils");
let LoggerInterceptor = class LoggerInterceptor {
    constructor(reflector) {
        this.reflector = reflector;
    }
    intercept(context, next) {
        const noLog = this.reflector.get('noLog', context.getHandler());
        if (noLog) {
            return next.handle();
        }
        const removePasswordLogs = this.reflector.get('removePasswordLogs', context.getHandler());
        const req = context.switchToHttp().getRequest();
        const hasBody = ['post', 'put', 'patch', 'delete'].includes(req.method.toLowerCase());
        const { originalUrl, body, method } = req;
        return next
            .handle()
            .pipe(operators_1.tap({
            next: () => {
                const res = context.switchToHttp().getResponse();
                const { statusCode } = res;
                const message = `${method} ${originalUrl} [${statusCode}]`;
                logUtils_1.log(message, 'RequestLogger');
            },
            error: (error) => {
                if (error instanceof common_1.HttpException) {
                    const statusCode = error.getStatus();
                    const errorMessage = error.message;
                    if (removePasswordLogs) {
                        body.password = '*excluded*';
                    }
                    const bodyMessage = hasBody ? `Req body: ${JSON.stringify(body, null, 2)}` : '';
                    const message = `${method} ${originalUrl} [${statusCode}] ${errorMessage} ${bodyMessage}`;
                    logUtils_1.logError(message, '', 'RequestLogger');
                }
            },
        }));
    }
};
LoggerInterceptor = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [core_1.Reflector])
], LoggerInterceptor);
exports.LoggerInterceptor = LoggerInterceptor;
