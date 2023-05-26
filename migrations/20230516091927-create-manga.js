'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Mangas', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				type: Sequelize.STRING,
			},
			price: {
				type: Sequelize.INTEGER,
			},
			author: {
				type: Sequelize.STRING,
			},
			publisher: {
				type: Sequelize.STRING,
			},
			binding_type: {
				type: Sequelize.STRING,
			},
			publication_year: {
				type: Sequelize.INTEGER,
			},
			pages: {
				type: Sequelize.INTEGER,
			},
			size: {
				type: Sequelize.STRING,
			},
			language: {
				type: Sequelize.STRING,
			},
			description: {
				type: Sequelize.STRING(2048),
			},
			images: {
				type: Sequelize.STRING(2048),
			},
			amount: {
				type: Sequelize.INTEGER,
			},
			bestsellers: {
				type: Sequelize.BOOLEAN,
			},
			new: {
				type: Sequelize.BOOLEAN,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Mangas');
	},
};
