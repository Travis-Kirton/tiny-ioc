import 'reflect-metadata';
import type { LifeCycle } from './types';
import { Registry } from './registry';

export const Service = (lifecle: LifeCycle = 'Transient') => {
    return (target: any) => {
        Reflect.defineMetadata("service", true, target);
        Registry.register(target, {
            type: target,
            lifecycle: lifecle,
            dependencies: Reflect.getMetadata("design:paramtypes", target) ?? []
        });
      };
}