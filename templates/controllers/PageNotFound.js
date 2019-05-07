import {AbstractController, Response} from "slix"

export default class PageNotFound extends AbstractController {
    mount() {
        this.ALL('*', this.index);
    }

    index = async (Request) => {
        return this.App.render('pageNotFound', {
            title: "Page not found"
        });
    }
}