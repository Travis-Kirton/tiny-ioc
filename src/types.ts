
export type LifeCycle = 'Singleton' | 'Transient';

export type Constructor = new (...args: any[]) => any;

export type ServiceIdentifier = Constructor | string;

export type ServiceInformation = {
    type: Constructor;
    lifecycle: LifeCycle;
    dependencies: ServiceIdentifier[];
} | object;

export type ServiceRegister = Map<ServiceIdentifier, ServiceInformation>;

export type Value<T extends Constructor | string> = T extends Constructor ? InstanceType<T> : object;