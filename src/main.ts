import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  

  const config = new DocumentBuilder()
    .setTitle('Photo Respository API')
    .setDescription("To access protected routes - Copy the JWT from the /login response body and paste it in the Authorization button form in the top right of the page. Authorization persists after refresh and lasts 240s. \n\nThe password is always 'admin'. The username can be: 'Bret', 'Antonette', 'Samantha', 'Karianne', 'Kamren', 'Leopoldo_Corkery', 'Elwyn.Skiles', 'Maxime_Nienow', 'Delphine', 'Moriah.Stanton'")
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: "Anser Ghazi | Mavennet Back-end Tech Challenge"
  }


  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document, customOptions);

  await app.listen(3000);
}
bootstrap();
