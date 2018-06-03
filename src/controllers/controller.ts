"use strict";

import * as express from "express"

export class Controller {

	public Router : express.Router;

	constructor () {
		this.Router = express.Router();
	}

}