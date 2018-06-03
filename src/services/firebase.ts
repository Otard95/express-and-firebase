"use strict";

import * as admin from "firebase-admin"
const service_account = require("../../key-tokens/keys.json");

const app: admin.app.App = admin.initializeApp({
	credential: service_account.firebase.admin,
	databaseURL: `https://${service_account.firebase.admin.project_id}.firebaseio.com`
});

const db: admin.database.Database = app.database();
const auth: admin.auth.Auth = app.auth();

export {app, db, auth};
export default app;