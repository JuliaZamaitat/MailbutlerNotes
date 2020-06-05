"use strict";
const axios = require("axios");
const  httpStatus = require("http-status-codes");


module.exports = {
	login: (req, res) => {
		//console.log(token);
		return axios.post("https://bowtie.mailbutler.io/api/v2/users/login",
			{ email: req.body.email,
				password: req.body.password
			})
			.then((session) => {

				res.cookie("authToken",session.data.token);
				

				res.render("index");
			}).catch(e => console.log(e));
	}

};
