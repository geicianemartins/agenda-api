module.exports = function (express) {
	var routes = {};
	routes.agendas = require('./agendas')(express);
	return routes;
};
