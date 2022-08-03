import e, { RequestHandler, Express} from "express";
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

export async function routing(app: Express) {
    app.use(logRequest)
    app.use(cors())
    

    app.route('/food')
        .get(async (req, res, next) => {
            var response
            let status = 400

            try {
                response = await foodController.allFood
                status = 200
            } catch (error: any) {
                response = {message: "get failed..."}
            }

            res.status(status).send(response)
        })
        .post(async (req, res, next) => {
            var response
            let status = 418
            try {
                await foodController.newFood(req.body)
                status = 201
                response = "Food created..."
            } catch(error) {
                console.log("Router error")
                response = "Duplicate food detected... creation failed"
            }
                
                res.status(status).send(response)
        })
}


