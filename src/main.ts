import * as session from 'express-session';
import * as passport from 'passport';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.use(
		session({
			secret: process.env.SESSION_SECRET,
			resave: false,
			saveUninitialized: false,
		}),
	);
	app.use(passport.initialize());
	app.use(passport.session());
	app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

	const config = new DocumentBuilder()
		.setTitle('Manga UA')
		.setDescription('api documentation')
		.setVersion('1.0')
		.addTag('api')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('swagger', app, document);

	await app.listen(process.env.PORT || 3000);
}
bootstrap();
