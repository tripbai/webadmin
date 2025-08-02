import { WindowObjectFactory } from "./WindowObjectFactory"

export class AppConfigurationFactory {

    constructor(
        private windowObjectFactory: WindowObjectFactory   
    ) {}

    create(): AppConfiguration {
        const window = this.windowObjectFactory.create()
        const deploymentName = window.getDeploymentName()
        if (deploymentName === 'production') {
            return new AppConfiguration(
                'production',
                'http://localhost:5458',
                'http://localhost:8000',
                'eo7yQi4NglbV5OOWG0v7SgT1y4Rof6Rg',
                'http://localhost:5458'
            )
        }
        return new AppConfiguration(
            'production',
            'http://localhost:5458',
            'http://localhost:8000',
            'eo7yQi4NglbV5OOWG0v7SgT1y4Rof6Rg',
            'http://localhost:5458'
        )
    }

}

class AppConfiguration {

    readonly buildMode: string
    readonly iauth: {
        readonly host: string
    }
    readonly kryptodoc: {
        readonly host: string
        readonly namespace: string
    }
    readonly tripbai: {
        readonly host: string
    }

    constructor(
        buildMode: string,
        iauthRoot: string,
        kryptodocRoot: string,
        kryptodocNamespace: string,
        tripbaiRoot: string
    ) {
        this.buildMode = buildMode
        this.iauth = {
            host: iauthRoot
        }
        this.kryptodoc = {
            host: kryptodocRoot,
            namespace: kryptodocNamespace
        }
        this.tripbai = {
            host: tripbaiRoot
        }
    }

}