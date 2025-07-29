import { BasicLoginForm } from "../components/LoginForms/BasicLoginForm/BasicLoginForm";

class App {

    constructor(
        private loginForm: BasicLoginForm
    ) {}

    async bootstrap() {
        await this.loginForm.render()
    }

}