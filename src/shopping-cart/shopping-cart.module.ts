import { Module } from '@nestjs/common';
import { ShoppingCartController } from './shopping-cart.controller';
import { ShoppingCartService } from './shopping-cart.service';
import { ShoppingCart } from './shopping-cart.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from 'src/users/users.module';
import { MangasModule } from 'src/mangas/mangas.module';

@Module({
	imports: [SequelizeModule.forFeature([ShoppingCart]), UsersModule, MangasModule],
	controllers: [ShoppingCartController],
	providers: [ShoppingCartService],
})
export class ShoppingCartModule {}
