import { ServiceIdentifier, ServiceInformation, ServiceRegister } from "./types"

export class Registry {
    private static injectedServiceRegistry: ServiceRegister = new Map();

    static register(identifier: ServiceIdentifier, serviceInformation: ServiceInformation){
        this.injectedServiceRegistry.set(identifier, serviceInformation);
    }

    static getRegister(): ServiceRegister {
        return this.injectedServiceRegistry;
    }
}