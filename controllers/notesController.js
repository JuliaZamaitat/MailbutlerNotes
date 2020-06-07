"use strict";
const axios = require("axios"),
	jwt = require("jsonWebToken"),
	apiURL = "https://bowtie.mailbutler.io/api/v2/";
let token, config;

module.exports = {
	index: (req, res, next) => {
		return axios.get(apiURL + "notes", config)
			.then((notes) => {
				res.locals.notes = notes.data;
				next();
			}).catch(e => next(e));
	},
	indexView: (req, res) => {
		res.render("notes/index");
	},
	create: (req, res) => {
		const params = {
			context: "Neuer Kontext ohne Mail",
			text: "Deine neue Notiz"
		};
		return axios.post(apiURL + "notes", params, config)
			.then(() => {
				req.flash("success", "Note added");
				res.send();
			}).catch(e => console.log(e));
	},
	update: (req) => {
		var text = req.body.text;
		const params = {
			text: text
		};
		let id = req.params.id;
		return axios.patch(apiURL + "notes/" + id,  params , config)
			.then(() => {
				console.log("Note updated");
			}).catch(e => console.log(e));

	},
	delete: (req, res) => {
		let id = req.params.id;
		return axios.delete(apiURL + "notes/" + id, config)
			.then(() => {
				req.flash("success", "Note deleted");
				res.send();
			}).catch(e => console.log(e));
	},
	verifyJWT: (req, res, next) => {
		token = req.cookies.authToken;
		config = {
			headers: { Authorization: `Bearer ${token}` }
		};
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
