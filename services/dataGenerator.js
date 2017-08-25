const faker = require('faker');
faker.locale = 'pt_BR';

const generator = {
	getContatcs: function () {
		var qtContatcs = faker.random.number({min: 6,max: 10});
		var agendas = [];
		for (var i = 0; i < qtContatcs; i++) {
			var generoN = faker.random.number({min: 0,max: 1});
			var genero = generoN === 0 ? 'feminino' : 'masculino';
			var c = {
				id: i + 1,
				nome: faker.name.findName(null, null, generoN) + ' ' + faker.name.lastName(),
				sobrenome: faker.name.findName(null, null, generoN) + ' ' + faker.name.lastName(),
				telefone: faker.phone.phoneNumber(),
				apelido: faker.name.findName(null, null, generoN) + ' ' + faker.name.lastName(),
				nomeMae: faker.name.findName(null, null, generoN) + ' ' + faker.name.lastName(),
				dataCadastro: new Date()
		/*		idade: faker.random.number({
					min: 17,
					max: 42
				}),
				avatar: faker.image.avatar(),*/
				// genero : genero
			};
			agendas.push(c);
		}
		return agendas;
	}
};
module.exports = generator;
