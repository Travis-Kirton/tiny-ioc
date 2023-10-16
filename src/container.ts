import { Registry } from "./registry";
import type { Constructor, ServiceIdentifier, ServiceRegister, Value } from "./types";
import 'reflect-metadata';

export class Container {
    private serviceInstances: Map<ServiceIdentifier, InstanceType<Constructor>> = new Map();
    private registeredServices: ServiceRegister;

    constructor(){
        this.registeredServices = Registry.getRegister();
    }

    register(identifier: string, object: object){
        this.registeredServices.set(identifier, object);
    }

    get<T extends Constructor | string>(target: T): Value<T>  {
        const service = this.registeredServices.get(target);
        if (typeof target === 'string') {
            return service as any; // eslint-disable-line
        }

        const isService = Reflect.getMetadata("service", target);
        
        if (!isService) {
            const typedTarget :Constructor = target; // to deal with typing instanceType
            return new typedTarget();
        }

        if ('dependencies' in service){
            const instances = service.dependencies.map(dependency => this.get(dependency));

            if (!this.serviceInstances.get(target)) {
                this.serviceInstances.set(target, new service.type(...instances));
            }
    
            if (service.lifecycle === 'Singleton') {
                return this.serviceInstances.get(service.type);
            } else {
                return new service.type(...instances);
            }
        }
    }
}