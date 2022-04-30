import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = NestFactory.create(AppModule);

  await (await app).listen(PORT, () => Logger.log(`Listens ${PORT}`));
}

start();
