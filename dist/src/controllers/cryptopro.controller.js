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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoProController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const sign_dto_1 = require("./dto/sign.dto");
const cryptoProUtils_1 = require("../utils/cryptoProUtils");
let CryptoProController = class CryptoProController {
    sign({ text }) {
        return cryptoProUtils_1.cryptoProSign(text);
    }
};
__decorate([
    common_1.Post('cryptopro/sign'),
    swagger_1.ApiOperation({ summary: 'Sign plain text with cryptopro' }),
    swagger_1.ApiResponse({ type: sign_dto_1.SignResDto }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_dto_1.SignReqDto]),
    __metadata("design:returntype", void 0)
], CryptoProController.prototype, "sign", null);
CryptoProController = __decorate([
    common_1.Controller(),
    swagger_1.ApiBearerAuth()
], CryptoProController);
exports.CryptoProController = CryptoProController;
