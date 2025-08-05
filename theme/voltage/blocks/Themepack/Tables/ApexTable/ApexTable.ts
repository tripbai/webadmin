import { ComponentScope } from "../../../../interfaces/PluncAPI/ComponentScope"
import { PatchService } from "../../../../interfaces/PluncAPI/PatchService"

type Scope = {
    apexTableData: Array<{[key: string]: any}>
    Themepack_Tables_ApexTable: {
        state: 'loading' | 'with-data'
    }
}

export class ApexTable {

    constructor(
        private props: ComponentScope<Scope>,
        private patchService: PatchService
    ) {}

    async setLoading() {
        this.props.apexTableData = []
        this.props.Themepack_Tables_ApexTable = {
            state: 'loading'
        }
    }

    async setWithData<T extends Array<{[key:string]: any}>>(data: T) {
        this.props.apexTableData = data
        this.props.Themepack_Tables_ApexTable.state = 'with-data'
        console.log('ApexTable data set:', this.props.apexTableData)
        await this.patchService.patch('Themepack_Tables_ApexTable')
    }

}