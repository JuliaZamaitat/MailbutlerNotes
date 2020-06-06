"use strict";

module.exports = {
	index: (req, res) => {
		res.render("index");
	},
	loginView: (req, res) => {
		res.render("login");
	}
};
