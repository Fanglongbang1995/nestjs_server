import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as helmet from 'helmet';
async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  /* 
  We told Express that 
  the public directory will be used for storing static assets, 
  views will contain templates, 
  and the hbs template engine should be used to render HTML output.
  */

  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/static/', //设置虚拟路径
  });
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');

  app.enableCors();
  app.use(helmet());//Helmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately
  /* 
  swagger 
  */

  const options = new DocumentBuilder()
    .setTitle('blog example')
    .setDescription('The blog API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(18080);
}

bootstrap();
