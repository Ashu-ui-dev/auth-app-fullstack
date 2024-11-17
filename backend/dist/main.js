"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const dotenv = require("dotenv");
const core_1 = require("@nestjs/core");
const cookieParser = require("cookie-parser");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    dotenv.config();
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.use(cookieParser());
    app.enableCors({
        origin: process.env.BASE_URL || 'http://localhost:3001',
        credentials: true,
    });
    console.log('called', process.env.NODE_ENV);
    if (process.env.NODE_ENV !== 'production') {
        console.log('called', process.env.NODE_ENV);
        const config = new swagger_1.DocumentBuilder()
            .setTitle('Easy Generator Authentication API')
            .setDescription('API for user signup, login, and profile management')
            .setVersion('1.0')
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup('api-docs', app, document);
    }
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map