export class WindowObjectFactory {

    constructor(

    ) {}

    create(): WindowObjectWrapper {
        return new WindowObjectWrapper(window)
    }

}

class WindowObjectWrapper {

    private window: Window & typeof globalThis;

    constructor(windowObject: Window & typeof globalThis) {
        this.window = windowObject;
    }

    getWindow(): Window & typeof globalThis {
        return this.window;
    }

    getDeploymentName(): string | null {
        if ('deploymentName' in this.window) {
            const deplyomentName: unknown = this.window.deploymentName
            if (typeof deplyomentName !== 'string') {
                return null
            }
            return deplyomentName
        }
        return null
    }

}