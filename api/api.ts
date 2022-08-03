import { RequestHandler, Express} from "express";
import cors from "cors";

import * as bodyparser from "body-parser"
import { FoodController } from '../food/controller';
import { FoodService } from "../food/service";
import { Food } from "../food/interface";
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
            var response
            let status = 400

            try {
                response = foodController.allFood
                status = 200
            } catch {
                response = {message: "get failed..."}
            }

            res.status(status).send(response)
        })
        .post(async (req, res, next) => {
            var response
            let status = 400

            try {
                await foodController.newFood(req.body)
                response = {message: "Successfully created food..."}
                status = 201
                
            } catch {
                response = {message: "Failed to create food..."}
            }

            res.status(status).send(response)
        })
}