"use strict";

import express from "express"
import { Controller } from "./controller"

class UserController extends Controller {

	constructor () {
		super();

		this.Router.get('/login', this.get_login);
	}

	async get_login ( req: express.Request, res: express.Response ) {

		// render login view
		res.render('login');

	}

}

export default new UserController();