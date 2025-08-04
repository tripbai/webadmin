import { CancunSidebar } from "../../../blocks/Themepack/Sidebars/CancunSidebar/CancunSidebar";
import { PatchService } from "../../../interfaces/PluncAPI/PatchService";

export class BlockPreviewer {

    constructor(
        private cancunSidebar: CancunSidebar,
        private patchService: PatchService
    ) {}

    async render() {
        await this.cancunSidebar.setProps({
            preCollapseName: 'Trips',
            preSelectName: 'example.com/trips/find'
        })
        await this.patchService.patch()
    }

}