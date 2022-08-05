import e, { RequestHandler, Express} from "express";
import cors from "cors";
import * as bodyparser from "body-parser"
import { FoodController } from '../food/controller';
import { FoodService } from "../food/service";
import bcrypt from "bcrypt";
import session from 'express-session';
import passport from 'passport'
import {UserController } from '../user/controller';
import { UserService } from "../user/service";
import { User } from '../user/user';
import flash from "express-flash";
import { urlencoded } from "body-parser";


const jsonParser = bodyparser.json();

const logRequest : RequestHandler = (req, res, next) => {
    console.log(req.method + " Request: " + req.url);
    next();
};


const foodController = new FoodController(new FoodService)
const userController = new UserController(new UserService)


const initPassport = require('../passport-config')
initPassport(passport, 
    async (username: string) => <User>await userController.userByUsername(username)
)

console.log()

export async function routing(app: Express) {

    app.use(logRequest)
    app.use(cors())
    app.use(urlencoded({extended: false}))
    app.use(flash())
    app.use(session({
        secret: "secrety",
        resave: false,
        saveUninitialized: false
    }))
    app.use(passport.initialize())
    app.use(passport.session())


    app.route('/login')
        .post(jsonParser, passport.authenticate('local', {failureMessage:'User authentication failed', session: false})
        , (req, res) => {
            console.log(req.user)
            res.status(200).json({
                "success": true,
                "user": req.user
            }).send()
        })


    app.route('/register')
        .post(jsonParser, async (req, res) => {
            var response
            let status = 418
            try {
                const{username, email} = req.body
                const hashedPassword = await bcrypt.hash(req.body.password, 10)
                const user: User = {
                    username: username,
                    email: email,
                    password: hashedPassword
                }
                await userController.newItem(user)
                response = "User successfully created..."
                status = 201
            } catch (e) {
                response = "User creation failed..."
            }
            res.status(status).send(response)
        })
    

    app.route('/food')
        .get(async (req, res, next) => {
            var response
            let status = 418
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


