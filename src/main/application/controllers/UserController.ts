import { injectable, inject } from 'inversify';
import { JsonController, OnUndefined, Body, Post } from 'routing-controllers';
import { CreateUserFormValidator } from '../validators';
import { CreateUser } from '@use-cases/user';

@injectable()
@JsonController('/user')
export class UserController {
    @inject(CreateUser)
    private create!: CreateUser;

    /**
     * @api {post} /user Create user
     * @apiGroup User
     *
     * @apiParam {Object} user
     * @apiParam {String} .id
     * @apiParam {String} .name
     *
     * @apiExample {curl} Example:
     * curl -v -H "Content-Type:application/json" -d '{"id":"3f2a728b-a7c3-4377-97ca-ac490de47876","name":"Bill"}' http://127.0.0.1:3005/user
     */
    @Post('/')
    @OnUndefined(204)
    public async createAction(@Body() form: CreateUserFormValidator): Promise<void> {
        await this.create.execute(form);
    }
}
