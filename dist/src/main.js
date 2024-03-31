"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const config_1 = require("./config");
const swagger_1 = require("@nestjs/swagger");
const http_exception_filter_1 = require("./middleware/http.exception.filter");
const result_interceptor_1 = require("./middleware/result.interceptor");
const logUtils_1 = require("./utils/logUtils");
async function bootstrap() {
    logUtils_1.log(`Build info: ${JSON.stringify(config_1.BUILD_INFO, null, 2)}`, 'Main');
    if (!config_1.isValidEnv()) {
        process.exit(1);
        return;
    }
    const server = express();
    server.disable('x-powered-by');
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(server), { cors: { origin: ['*'], credentials: true } });
    app.use(express.json({ limit: '50mb' }));
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
    }));
    app.useGlobalInterceptors(new result_interceptor_1.ResultInterceptor());
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    const swaggerOptions = new swagger_1.DocumentBuilder()
        .setTitle('Voting CryptoPro service')
        .addServer(config_1.SWAGGER_BASE_PATH)
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerOptions);
    await swagger_1.SwaggerModule.setup('/docs', app, document);
    await app.listen(config_1.PORT);
}
bootstrap()
    .catch((err) => {
    logUtils_1.logError(err && err.message || err, err.stack, 'Main');
    process.exit(1);
});
