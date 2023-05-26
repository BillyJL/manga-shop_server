const { faker } = require('@faker-js/faker');
('use strict');

const publishers = [
	'Vovkulaka',
	'Dark Horse',
	'Nasha Idea',
	'Molfar Comics',
	'MIMIR MEDIA',
	'MAL’OPUS',
	'Ranok',
	'LANTSUTA',
	'ACCA',
];

const authors = [
	'Chugong',
	'DUBU',
	'Milcha',
	'Nicke',
	'Erin Hunter',
	'Hiro Kiyohara',
	'Yukito Ayatsuji',
	'Ichigo Takano',
	'Sato Keisuke',
	'Senbon Umishima',
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert(
			'Mangas',
			[...Array(100)].map(() => ({
				publisher: publishers[Math.floor(Math.random() * publishers.length)],
				author: authors[Math.floor(Math.random() * authors.length)],
				price: +faker.string.numeric(3),
				name: faker.lorem.sentence(2),
				description: faker.lorem.sentence(10),
				images: JSON.stringify([...Array(7)].map(() => `${faker.image.avatar}`)),
				binding_type: faker.lorem.sentence(1),
				publication_year: +faker.string.numeric(4),
				pages: +faker.string.numeric(3),
				size: faker.lorem.sentence(1),
				language: faker.lorem.sentence(1),
				amount: +faker.string.numeric(1),
				bestsellers: faker.datatype.boolean(),
				new: faker.datatype.boolean(),
				createdAt: new Date(),
				updatedAt: new Date(),
			})),
		);
	},
	async down(queryInterface, Sequelize) {
		return queryInterface.bulkDelete('Mangas', null, {});
	},
};
