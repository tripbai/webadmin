import { CancunSidebar } from "../../../blocks/Themepack/Sidebars/CancunSidebar/CancunSidebar";

export class Sidebar {
    constructor(
        private cancunSidebar: CancunSidebar
    ) {}

    async render() {
        await this.cancunSidebar.setProps({
            preCollapseName: 'Webadmin',
            preSelectName: 'example.com/webadmin/home'
        })
    }
}