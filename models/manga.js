'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
	class Manga extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Manga.init(
		{
			name: DataTypes.STRING,
			price: DataTypes.STRING,
			author: DataTypes.STRING,
			publisher: DataTypes.STRING,
			binding_type: DataTypes.STRING,
			publication_year: DataTypes.STRING,
			pages: DataTypes.INTEGER,
			size: DataTypes.STRING,
			language: DataTypes.STRING,
			description: DataTypes.STRING,
			images: DataTypes.STRING,
			amount: DataTypes.INTEGER,
			bestsellers: DataTypes.BOOLEAN,
			new: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: 'Manga',
		},
	);
	return Manga;
};
