import { DocumentQueryService } from "../services/Themepack/DocumentQueryService";

export class App {

    constructor(
        private documentQueryService: DocumentQueryService
    ) {}

    async bootstrap() {
        const element = this.documentQueryService.querySelector<HTMLInputElement>('.input')
        console.log(element)
    }

}