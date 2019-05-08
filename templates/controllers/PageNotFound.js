import {AbstractController, Response} from "slix-app"

export default class PageNotFound extends AbstractController {
    mount() {
        this.ALL('*', this.index);
    }

    index = async (Request) => {
        return this.App.render('error/404', {
            title: "Page not found"
        });
    }
}