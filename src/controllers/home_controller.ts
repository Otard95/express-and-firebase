"use strict";

import express from "express"
import { Controller } from "./controller"

class HomeController extends Controller {

	constructor () {
		super();

		// Add routes for this controller
		this.Router.get("/", this.getIndex);
	}

	getIndex (req : express.Request, res : express.Response) {
		let name : string = req.params['name'] || 'World';
		res.render('index', {
			title: 'Home',
			name: name
		});

	}

}

export default new HomeController();