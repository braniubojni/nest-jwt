import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { ValidationPipe } from "./pipes/validation.pipe";

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
        .setTitle('Advanced JWT example')
        .setDescription('REST API documentation')
        .setVersion('1.0')
        .addTag('braniubojni')
        .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);
  // app.useGlobalPipes(new ValidationPipe()) 

  await app.listen(PORT, () => Logger.log(`Listens ${PORT}`));
}

start();
