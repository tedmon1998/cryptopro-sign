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
exports.UnsignResDto = exports.VerifyResDto = exports.SignResDto = exports.VerifyReqDto = exports.VerifyTokensReq = exports.SignReqDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const signExample = 'MIAGCSqGSIb3DQEHAqCAMIACAQExDjAMBggqhQMHAQECAgUAMIAGCSqGSIb3DQEH\\nAaCAJIAEBXRlc3QKAAAAAAAAoIIDUDCCA0wwggL5oAMCAQICBQCl6ZkgMAoGCCqF\\nAwcBAQMCMIIBBTEgMB4GA1UEAwwX0JrQvtGB0LDRgNC10LIg0JjQstCw0L0xCzAJ\\nBgNVBAYTAlJVMRwwGgYDVQQIDBM3NyDQsy4g0JzQvtGB0LrQstCwMRUwEwYDVQQH\\nDAzQnNC+0YHQutCy0LAxOzA5BgNVBAkMMtCR0LXRgNGB0LXQvdGM0LXQstGB0LrQ\\nsNGPINC90LDQsS4sINC0LjYsINGB0YLRgC4zMS4wLAYDVQQKDCXQntCe0J4gItCS\\n0LXQsTMg0KLQtdGF0L3QvtC70L7Qs9C40LgiMRgwFgYFKoUDZAESDTExNzc3NDY4\\nNjM2NDUxGDAWBggqhQMDgQMBARIKNzcyNDQxNzQ0MDAeFw0yMTA3MTIxNTM5MTVa\\nFw0yMjA3MTIxNTM5MTVaMIIBBTEgMB4GA1UEAwwX0JrQvtGB0LDRgNC10LIg0JjQ\\nstCw0L0xCzAJBgNVBAYTAlJVMRwwGgYDVQQIDBM3NyDQsy4g0JzQvtGB0LrQstCw\\nMRUwEwYDVQQHDAzQnNC+0YHQutCy0LAxOzA5BgNVBAkMMtCR0LXRgNGB0LXQvdGM\\n0LXQstGB0LrQsNGPINC90LDQsS4sINC0LjYsINGB0YLRgC4zMS4wLAYDVQQKDCXQ\\nntCe0J4gItCS0LXQsTMg0KLQtdGF0L3QvtC70L7Qs9C40LgiMRgwFgYFKoUDZAES\\nDTExNzc3NDY4NjM2NDUxGDAWBggqhQMDgQMBARIKNzcyNDQxNzQ0MDBmMB8GCCqF\\nAwcBAQEBMBMGByqFAwICJAAGCCqFAwcBAQICA0MABECrgtyGqyZkhYgd/RZMdrhK\\n7Z2Dj9jx1le/NJBVu7OscHVTFG3y0pYLykXQOCxLsQqiN06U7GbFn9aFddI3o2Gw\\no0UwQzAOBgNVHQ8BAf8EBAMCA+gwHQYDVR0lBBYwFAYIKwYBBQUHAwIGCCsGAQUF\\nBwMEMBIGA1UdEwEB/wQIMAYBAf8CAQUwCgYIKoUDBwEBAwIDQQDBkJnA6h/nEvDD\\nbvOV/TJGrL7t1W0cM2seDwQL1/veAKWOopHEAOs3/qSg+AJgoQ3g/hWvRouy2Hyj\\nqHbRV2YmMYIDUTCCA00CAQEwggEQMIIBBTEgMB4GA1UEAwwX0JrQvtGB0LDRgNC1\\n0LIg0JjQstCw0L0xCzAJBgNVBAYTAlJVMRwwGgYDVQQIDBM3NyDQsy4g0JzQvtGB\\n0LrQstCwMRUwEwYDVQQHDAzQnNC+0YHQutCy0LAxOzA5BgNVBAkMMtCR0LXRgNGB\\n0LXQvdGM0LXQstGB0LrQsNGPINC90LDQsS4sINC0LjYsINGB0YLRgC4zMS4wLAYD\\nVQQKDCXQntCe0J4gItCS0LXQsTMg0KLQtdGF0L3QvtC70L7Qs9C40LgiMRgwFgYF\\nKoUDZAESDTExNzc3NDY4NjM2NDUxGDAWBggqhQMDgQMBARIKNzcyNDQxNzQ0MAIF\\nAKXpmSAwDAYIKoUDBwEBAgIFAKCCAdQwGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEH\\nATAcBgkqhkiG9w0BCQUxDxcNMjEwODEyMDk0NTAzWjAvBgkqhkiG9w0BCQQxIgQg\\nz0DjgIfibLR0lOoGmrY1OWnX48+eNLb8JERXcdK8KEQwggFnBgsqhkiG9w0BCRAC\\nLzGCAVYwggFSMIIBTjCCAUowCgYIKoUDBwEBAgIEIHWCJ8VR8QE/WM7w+qZY+6IY\\n+dAI+Y3cjQirSgNlmQ/aMIIBGDCCAQ2kggEJMIIBBTEgMB4GA1UEAwwX0JrQvtGB\\n0LDRgNC10LIg0JjQstCw0L0xCzAJBgNVBAYTAlJVMRwwGgYDVQQIDBM3NyDQsy4g\\n0JzQvtGB0LrQstCwMRUwEwYDVQQHDAzQnNC+0YHQutCy0LAxOzA5BgNVBAkMMtCR\\n0LXRgNGB0LXQvdGM0LXQstGB0LrQsNGPINC90LDQsS4sINC0LjYsINGB0YLRgC4z\\nMS4wLAYDVQQKDCXQntCe0J4gItCS0LXQsTMg0KLQtdGF0L3QvtC70L7Qs9C40Lgi\\nMRgwFgYFKoUDZAESDTExNzc3NDY4NjM2NDUxGDAWBggqhQMDgQMBARIKNzcyNDQx\\nNzQ0MAIFAKXpmSAwDAYIKoUDBwEBAQEFAARAIbVMPkWhdUlL6NHzfSMshAA842oA\\nbjtf0FY320oBVuUFhUk8LtTIxlgD2sI1uxUKqhawS16WDLgABtPt1PWfNwAAAAAA\\nAA==\\n';
class SignReqDto {
}
__decorate([
    swagger_1.ApiProperty({ example: 'test' }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], SignReqDto.prototype, "text", void 0);
exports.SignReqDto = SignReqDto;
class VerifyTokensReq {
}
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], VerifyTokensReq.prototype, "idToken", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], VerifyTokensReq.prototype, "accessToken", void 0);
exports.VerifyTokensReq = VerifyTokensReq;
class VerifyReqDto {
}
__decorate([
    swagger_1.ApiProperty({ example: signExample }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], VerifyReqDto.prototype, "sign", void 0);
exports.VerifyReqDto = VerifyReqDto;
class SignResDto {
}
__decorate([
    swagger_1.ApiProperty({ example: signExample }),
    __metadata("design:type", String)
], SignResDto.prototype, "result", void 0);
exports.SignResDto = SignResDto;
class VerifyResDto {
}
__decorate([
    swagger_1.ApiProperty({ type: Boolean, example: true }),
    __metadata("design:type", Boolean)
], VerifyResDto.prototype, "result", void 0);
exports.VerifyResDto = VerifyResDto;
class UnsignResDto {
}
__decorate([
    swagger_1.ApiProperty({ example: signExample }),
    __metadata("design:type", String)
], UnsignResDto.prototype, "result", void 0);
exports.UnsignResDto = UnsignResDto;
