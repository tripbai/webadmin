import { PageLoader } from "../blocks/Themepack/LoaderAnimations/PageLoader/PageLoader";
import { BasicLoginForm } from "../components/LoginForms/BasicLoginForm/BasicLoginForm";
import { SessionServiceInterface } from "../interfaces/Session/SessionServiceInterface";

class App {

    constructor(
        private loginForm: BasicLoginForm,
        private sessionServiceInterface: SessionServiceInterface,
        private pageLoader: PageLoader
    ) {}

    async bootstrap() {
        await this.pageLoader.showLoader()
        await this.sessionServiceInterface.verifySession()
        await this.loginForm.render()
        await this.pageLoader.showActive()
    }

}