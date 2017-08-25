var Validator = require('jsonschema').Validator;
var _ = require('underscore-node');
var agendaSchema = require('../schemas/agendas');
var dataGenerator = require('../services/dataGenerator');

var _validator = new Validator();

module.exports = function (express) {
	var agendas = dataGenerator.getContatcs();
	var index = agendas.length + 1;
	var route = express.Router();
	route.use(function (req, res, next) {
		res.set('Content-Type', 'application/json');
		next();
	});

	//listar agendas
	route.get('/:id?', function (req, res) {
		console.log(req.params);
		if (!!req.params.id) {
			var agenda = _.find(agendas, function (c) {
				return c.id == req.params.id;
			});
			if (!agenda) {
				res.status(404).send({
					errors: [{
						status: 404,
						message: 'not found'
					}]
				});
				return;
			}
			res.send(agenda);
		}
		return res.send(agendas);
	});

	route.put('/:id', function (req, res) {
		if (!req.params.id) {
			res.status(400).send({
				errors: [{
					status: 400,
					message: 'invalid id'
				}]
			});
			return;
		}

		var schema = _validator.validate(req.body, agendaSchema);
		if (schema.errors.length) {
			res.status(400)
				.send({
					errors: schema.errors
				});
			return;
		};

		var agenda = _.find(agendas, function (c) {
			return c.id == req.params.id;
		});

		if (!agenda) {
			res.status(404).send({
				errors: [{
					status: 404,
					message: 'not found'
				}]
			});
			return;
		}

		agenda.nome = req.body.nome;
		agenda.sobrenome = req.body.sobrenome;
		agenda.telefone = req.body.telefone;
		agenda.apelido = req.body.apelido;
		agenda.nomeMae = req.body.nomeMae;
		agenda.dataCadastro = req.body.dataCadastro;
		res.status(200).send();
	});

	route.delete('/:id', function (req, res) {
		if (!!req.params.id) {
			var result = agendas.filter(function (c) {
				return c.id !== parseInt(req.params.id);
			});
			if (result.length === agendas.length) {
				res.status(404).send({
					errors: [{
						status: 404,
						message: 'not found'
					}]
				});
				return;
			}
			agendas = result;
			res.status(200)
				.send();
			return;
		}
		return res.status(400).send({
			errors: [{
				code: 400,
				message: 'invalid id'
			}]
		});
	});

	//novo agenda
	route.post('/', function (req, res) {
		var schema = _validator.validate(req.body, agendaSchema);
		if (schema.errors.length) {
			res.status(400)
				.send({
					errors: schema.errors
				});
			return;
		};
		var agenda = req.body;
		agenda.id = index;
		index++;
		agendas.push(agenda);
		return res.status(201).send(agenda);
	});
	return route;
};
