"use strict";
const axios = require("axios");
const jwt = require("jsonWebToken");

module.exports = {
	index: (req, res, next) => {
		var token = req.cookies.authToken;
		const config = {
			headers: { Authorization: `Bearer ${token}` }
		};
		return axios.get("https://bowtie.mailbutler.io/api/v2/notes", config)
			.then((notes) => {
				res.locals.notes = notes.data;
				next();
			}).catch(e => {
				console.log(e);
				next(e);
			});
	},
	indexView: (req, res) => {
		res.render("notes/index");
	},
	update: (req, res) => {
		var token = req.cookies.authToken;
		var text = req.body.text;
		const config = {
			headers: { Authorization: `Bearer ${token}` },
		};
		const params = {
			text: text
		};
		let id = req.params.id;
		return axios.patch(`https://bowtie.mailbutler.io/api/v2/notes/${id}`,  params , config)
			.then((res) => {
				console.log("Note updated");
			}).catch(e => console.log(e));

	},

	delete: (req, res) => {
		var token = req.cookies.authToken;
		const config = {
			headers: { Authorization: `Bearer ${token}` }
		};
		let id = req.params.id;
		return axios.delete(`https://bowtie.mailbutler.io/api/v2/notes/${id}`, config)
			.then(() => {
				req.flash("success", "Note deleted");
				res.send();
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
					res.redirect("/");
				} else { //everythings fine
					res.locals.loggedIn = true;
					next();
				}
			} else { //No payload
				res.locals.loggedIn = false;
				res.redirect("/");
			}
		} else { //No token provided
			res.locals.loggedIn = false;
			res.redirect("/");
		}
	}
};
