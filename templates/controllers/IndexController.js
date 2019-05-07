import {AbstractController, Response} from "slix"

export default class IndexController extends AbstractController {
    mount() {
        this.GET('/', this.index);
    }

    index = async (Request) => {
        return this.App.render('index', {
            title: "Index page"
        });
    }
}