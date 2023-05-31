import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { SequelizeConfigService } from './config/sequelizeConfig.service';
import { databaseConfig } from './config/configuration';
import { AuthModule } from './auth/auth.module';
import { MangasModule } from './mangas/mangas.module';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';

@Module({
	imports: [
		SequelizeModule.forRootAsync({
			imports: [ConfigModule],
			useClass: SequelizeConfigService,
		}),
		ConfigModule.forRoot({
			load: [databaseConfig],
		}),
		UsersModule,
		AuthModule,
		MangasModule,
		ShoppingCartModule,
	],
})
export class AppModule {}
