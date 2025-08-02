import { ComponentScope } from "../../../../interfaces/PluncAPI/ComponentScope"
import { PatchService } from "../../../../interfaces/PluncAPI/PatchService"

export class PageLoader {

    constructor(
        private props: ComponentScope<State>,
        private patchService: PatchService
    ) {}

    async showLoader() {
        this.props.state = 'loading'
        await this.patchService.patch()
    }

    async showError() {
        this.props.state = 'error'
        await this.patchService.patch()
    }

    async showActive() {
        this.props.state = 'active'
        await this.patchService.patch()
    }

}


type State = {

    state: 'loading' | 'active' | 'error'

}