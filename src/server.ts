"use strict";

import express from "express"
import path from "path"
import bodyParser from "body-parser"
import logger from "morgan"
import favicon from "serve-favicon"
import helmet from "helmet"

// Import routes
import homeController from "./controllers/home_controller"
import userController from "./controllers/user_controller"

export class Server {

	public app : express.Application;

	public static bootstrap() : Server {
		return new Server();
	}

	constructor () {
		this.app = express();
		this.config();
		this.routes();
	}

	config () : void { 
		// view engine setup
		this.app.set('views', path.resolve(__dirname, 'views'));
		this.app.set('view engine', 'pug');

		this.app.use(helmet())
		// uncomment after placing your favicon in /public
		//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
		this.app.use(logger('dev'));
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({ extended: false }));
		// this.app.use(cookieParser());
		this.app.use(express.static(path.resolve(__dirname, 'public')));
	}

	routes () : void {

		// Add routers from controllers
		this.app.use('/', homeController.Router);
		this.app.use('/user', userController.Router);

		// catch 404 and forward to error handler
		this.app.use(function (req : express.Request, res : express.Response, next : express.NextFunction) {
			var err : any = new Error('Not Found');
			err.status = 404;
			next(err);
		});

		// error handler
		this.app.use(function (err : any, req: express.Request, res: express.Response, next: express.NextFunction) {
			// set locals, only providing error in development
			res.locals.message = err.message;
			res.locals.error = req.app.get('env') === 'development' ? err : {};

			// render the error page
			res.status(err.status || 500);
			res.render('error', err);
		});

	}

}
