import { User } from './user';
import { DataService } from '../data/service';
import { DataController } from "../data/controller";
import { Food } from '../food/interface';

function userObjectParser(obj: object) {
    const columns = Object.keys(obj).join(", ")
    let values = []
    for (var value of Object.values(obj)) {
        Array.isArray(value) ? values.push( `ARRAY ['${value.join(`','`)}']`): values.push(value.toString() === value ? `'${value}'` : value)
    }
    return { columns, values }
}

export class UserController extends DataController {
    items?: User[]
    constructor (dataService: DataService) {
        super(dataService, userObjectParser)
    }

    async userByUsername(username: string) {
        let user: User[] = []
        await this.singleItem({username: username}).then(res => {
            res.rows.map(row => row.map( item => user.push(<User>item)))
        })

        return user[0]
    }
}