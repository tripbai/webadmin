import { PublicConfig } from "@/types/configs"

const developmentConfiguration: PublicConfig = {
    buildMode: 'development',
    iauth: {
        host: 'http://localhost:5458'
    },
    kryptodoc: {
        host: 'http://localhost:8000',
        namespace: 'CknEEXZPwDe8uMtk3E8B5TQbdkOctlxP'
    },
    tripbai: {
        host: 'http://localhost:5458'
    }
}

export default developmentConfiguration