import { RequestHandler, Express} from "express";
import cors from "cors";

import * as bodyparser from "body-parser"
import { FoodController } from '../food/controller';
import { FoodService } from "../food/service";
const urlParser = bodyparser.urlencoded({extended: false});
const jsonParser = bodyparser.json();

const logRequest : RequestHandler = (req, res, next) => {
    console.log(req.method + " Request: " + req.url);
    next();
};

const foodController = new FoodController(new FoodService)

export function routing(app: Express) {
    app.use(logRequest)
    app.use(cors())

    app.route('/food')
        .get((req, res, next) => {
            let message = "Request failed"
            let status = 400

            try {

            } catch {

            }
        })
}