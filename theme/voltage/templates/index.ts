import { SessionServiceInterface } from "../interfaces/Session/SessionServiceInterface";
import { DocumentQueryService } from "../services/Themepack/DocumentQueryService";

export class App {

    constructor(
        private documentQueryService: DocumentQueryService,
        private sessionService: SessionServiceInterface
    ) {}

    async bootstrap() {
        await this.sessionService.verifySession()
        const element = this.documentQueryService.querySelector<HTMLInputElement>('.input')
        console.log(element)
    }

}