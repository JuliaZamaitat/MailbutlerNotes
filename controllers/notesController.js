"use strict";
const axios = require("axios");
const jsonWebToken = require("jsonWebToken");
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
		let token = req.cookies.authToken; //Retrieve the JWT from the request headers
			if (token) {
				//console.log(token.exp);
	 			//console.log(jsonWebToken.verify(token, "secret", { algorithms: ['HS256'] })); //verify the JWT and decode its payload
				//
				// 	if (payload) {
	      //     console.log("success, token found");
	      //         next();
	      //   }
	      //    else {
	      //     res.status(httpStatus.UNAUTHORIZED).json({
	      //       error: true,
	      //       message: "Cannot verify API token."
	      //     });
	      next();
	      //   }
	      // });
	    } else {
	      res.status(httpStatus.UNAUTHORIZED).json({
	        error: true,
	        message: "Provide Token"
	      });
	    }
	  }
};
