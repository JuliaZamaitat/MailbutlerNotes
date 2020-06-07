"use strict";
const axios = require("axios"),
	apiURL = "https://bowtie.mailbutler.io/api/v2/";

module.exports = {
	login: (req, res) => {
		return axios.post(apiURL + "users/login",
			{ email: req.body.email,
				password: req.body.password
			})
			.then((session) => {
				res.cookie("authToken", session.data.token);
				res.locals.loggedIn = true;
				res.redirect("/notes");
			}).catch(() => {
				req.flash("error", "Failed to login, please check your username or password.");
				res.redirect("/");
			});
	},
	logout: (req, res) => {
		res.clearCookie("authToken");
		res.locals.loggedIn = false;
		req.flash("success", "You have been logged out!");
		res.redirect("/");
	}
};
