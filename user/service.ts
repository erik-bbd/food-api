import { DataService } from "../data/service";

export class UserService extends DataService {

    constructor() {
        super('users')
    }

}