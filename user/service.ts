import { DatabaseService } from "../data/service";

export class UserService extends DatabaseService {

    constructor() {
        super('users')
    }

}