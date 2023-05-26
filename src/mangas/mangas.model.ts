import { Table, Model, Column } from 'sequelize-typescript';

@Table
export class Manga extends Model {
	@Column
	name: string;

	@Column
	price: number;

	@Column
	author: string;

	@Column
	publisher: string;

	@Column
	binding_type: string;

	@Column
	publication_year: number;

	@Column
	pages: number;

	@Column
	size: string;

	@Column
	language: string;

	@Column
	description: string;

	@Column
	images: string;

	@Column({ defaultValue: 0 })
	amount: number;

	@Column({ defaultValue: false })
	bestsellers: boolean;

	@Column({ defaultValue: false })
	new: boolean;
}
