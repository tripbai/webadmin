import { BlockPreviewer } from "../components/Themepack/BlockPreviewer/BlockPreviewer"

export class App {

    constructor(
        private blockPreviewer: BlockPreviewer
    ) {}

    async bootstrap() {
        await this.blockPreviewer.render()
    }

}