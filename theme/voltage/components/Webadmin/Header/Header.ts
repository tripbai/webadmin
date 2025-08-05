import { ComponentScope } from "../../../interfaces/PluncAPI/ComponentScope";
import { SessionServiceInterface } from "../../../interfaces/Session/SessionServiceInterface";

export class Header {

    constructor(
        private sessionService: SessionServiceInterface,
        private props: ComponentScope<Scope>
    ) {}

    async render() {
        this.props.logout = async () => {
            try {
                await this.sessionService.destroySession()
                // Optionally, redirect or perform other actions after logout
                console.log("Logged out successfully.")
            } catch (error) {
                console.error("Error during logout:", error)
            }
        }
    }

}

type Scope = {
    logout: () => Promise<void>
}