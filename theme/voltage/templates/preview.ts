import { PageLoader } from "../blocks/Themepack/LoaderAnimations/PageLoader/PageLoader"
import { BlockPreviewer } from "../components/Themepack/BlockPreviewer/BlockPreviewer"

export class App {

    constructor(
        private blockPreviewer: BlockPreviewer,
        private pageLoader: PageLoader
    ) {}

    async bootstrap() {
        await this.pageLoader.showActive()
        await this.blockPreviewer.render()
    }

}