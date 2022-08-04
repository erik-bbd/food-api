import e, { RequestHandler, Express} from "express";
import cors from "cors";

import * as bodyparser from "body-parser"
import { FoodController } from '../food/controller';
import { DataService } from "../food/service";
import bcrypt from "bcrypt";
const urlParser = bodyparser.urlencoded({extended: false});
const jsonParser = bodyparser.json();

const logRequest : RequestHandler = (req, res, next) => {
    console.log(req.method + " Request: " + req.url);
    next();
};

const foodController = new FoodController(new DataService)

export async function routing(app: Express) {
    app.use(logRequest)
    app.use(cors())

    app.route('/login')
        .post(async (req, res) => {
            var response
            let status = 400
            try {
                const {name, email} = req.body
                const hashedPassword = await bcrypt.hash(req.body.password, 10)
            } catch {
                
            }
        })
    

    app.route('/food')
        .get(async (req, res, next) => {
            var response
            let status = 400

            try {
                response = foodController.allItems
                status = 200
            } catch (error: any) {
                response = {message: "get failed..."}
            }

            res.status(status).send(response)
        })
        .post(jsonParser, async (req, res, next) => {
            var response
            let status = 418
            try {
                await foodController.newItem(req.body)
                status = 201
                response = "Food created..."
            } catch(error) {
                console.log("Router error")
                response = "Duplicate food detected... creation failed"
            }
                
                res.status(status).send(response)
        })
}


