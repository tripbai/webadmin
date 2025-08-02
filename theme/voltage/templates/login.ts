import { BasicLoginForm } from "../components/LoginForms/BasicLoginForm/BasicLoginForm";
import { SessionServiceInterface } from "../interfaces/Session/SessionServiceInterface";

class App {

    constructor(
        private loginForm: BasicLoginForm,
        private sessionServiceInterface: SessionServiceInterface
    ) {}

    async bootstrap() {
        await this.sessionServiceInterface.verifySession()
        await this.loginForm.render()
    }

}