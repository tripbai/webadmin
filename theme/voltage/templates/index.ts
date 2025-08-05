import { PageLoader } from "../blocks/Themepack/LoaderAnimations/PageLoader/PageLoader";
import { Header } from "../components/Webadmin/Header/Header";
import { Sidebar } from "../components/Webadmin/Sidebar/Sidebar";
import { SessionServiceInterface } from "../interfaces/Session/SessionServiceInterface";
import { DocumentQueryService } from "../services/Themepack/DocumentQueryService";

export class App {

    constructor(
        private documentQueryService: DocumentQueryService,
        private sessionService: SessionServiceInterface,
        private pageLoader: PageLoader,
        private sidebarComponent: Sidebar,
        private headerComponet: Header
    ) {}

    async bootstrap() {
        let shouldActivatePage = false
        await this.pageLoader.showLoader()
        try {
            await this.sessionService.verifySession()
            shouldActivatePage = true
        } catch (error) {
            console.error('Session verification failed:', error)
        }
        if (!shouldActivatePage) {
            return
        }
        await this.pageLoader.showActive()
        await this.sidebarComponent.render()
        await this.headerComponet.render()
    }

}