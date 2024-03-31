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
exports.StatusController = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("../config");
const swagger_1 = require("@nestjs/swagger");
const probe_dto_1 = require("./dto/probe.dto");
const status_dto_1 = require("./dto/status.dto");
let StatusController = class StatusController {
    getStatus() {
        return {
            status: 'OK',
            build: config_1.BUILD_INFO.BUILD_ID,
            commit: config_1.BUILD_INFO.GIT_COMMIT,
            tag: config_1.BUILD_INFO.DOCKER_TAG,
            version: config_1.BUILD_INFO.VERSION,
        };
    }
    livenessProbe() {
        return { time: Date.now() };
    }
    readinessProbe() {
        return { time: Date.now() };
    }
};
__decorate([
    common_1.Get('/status'),
    swagger_1.ApiResponse({ type: status_dto_1.StatusDto }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StatusController.prototype, "getStatus", null);
__decorate([
    common_1.Get('livenessProbe'),
    swagger_1.ApiResponse({
        status: 200,
        description: 'Liveness probe endpoint',
        type: probe_dto_1.ProbeDto,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StatusController.prototype, "livenessProbe", null);
__decorate([
    common_1.Get('readinessProbe'),
    swagger_1.ApiResponse({
        status: 200,
        description: 'Readiness probe endpoint',
        type: probe_dto_1.ProbeDto,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StatusController.prototype, "readinessProbe", null);
StatusController = __decorate([
    common_1.Controller()
], StatusController);
exports.StatusController = StatusController;
