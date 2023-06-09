import { Table, Model, Column } from 'sequelize-typescript';

@Table
export class ShoppingCart extends Model {
	@Column
	userId: number;

	@Column
	mangaId: number;

	@Column
	mangaName: string;

	@Column
	price: number;

	@Column
	image: string;

	@Column({ defaultValue: 0 })
	amount: number;

	@Column({ defaultValue: 0 })
	count: number;

	@Column
	totalPrice: number;
}
