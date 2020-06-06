"use strict";
const axios = require("axios");
const jwt = require("jsonWebToken");
const  httpStatus = require("http-status-codes");




module.exports = {

	index: (req, res) => {
		var token = req.cookies.authToken;
		console.log("Im Notes" + req.cookies.authToken);
		const config = {
			headers: { Authorization: `Bearer ${token}` }
		};

		return axios.get("https://bowtie.mailbutler.io/api/v2/notes", config)
			.then((notes) => {
				console.log(notes.data);
				//res.render("index");
			}).catch(e => console.log(e));
	},

	verifyJWT: (req, res, next) => {
		let token = req.cookies.authToken;
		if (token) {
			//decode the JWT token
			var decodedToken = jwt.decode(token, {complete: true});
			var payload = decodedToken.payload;
			//check the payload
			if(payload){
				var dateNow = new Date();
				//check if token is still valid
				if(payload.exp < (dateNow.getTime()/1000)){ //token expired
					res.locals.loggedIn = false;
					res.status(httpStatus.UNAUTHORIZED).json({
						error: true,
						message: "Token expired"
					});

				} else { //everythings fine
					console.log("everythings fine");
					res.locals.loggedIn = true;
					next();
				}
			} else { //No payload
				res.locals.loggedIn = false;
				res.status(httpStatus.UNAUTHORIZED).json({
					error: true,
					message: "Not correct token provided"
				});

			}
		} else { //No token provided
			res.locals.loggedIn = false;
			res.status(httpStatus.UNAUTHORIZED).json({
				error: true,
				message: "No token provided"
			});

		}
	}
};
