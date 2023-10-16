import { Container } from './container'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Service } from './decorators'

import { v4 as uuidv4 } from 'uuid'

describe('Container', () => {
  let container: Container

  beforeEach(() => {
    container = new Container()
  })

  it('should register simple object', () => {
    const testObj = {
      name: 'Luke Skywalker',
    }
    container.register('test-object', testObj);
    expect(container.get('test-object')).toEqual(testObj);
  })

  it('should get decorated injected Singleton instance', () => {
    @Service('Singleton')
    class Dep {
      uuid: string
      constructor() {
        this.uuid = uuidv4()
      }
      getUuid = (): string => this.uuid;
    }

    const instance1 = container.get(Dep);
    const instance2 = container.get(Dep);

    expect(instance1.getUuid()).toEqual(instance2.getUuid())
  });

  it('should get decorated injected Transient instance', () => {
    @Service()
    class Dep {
      uuid: string
      constructor() {
        this.uuid = uuidv4()
      }
      getUuid = (): string => this.uuid;
    }

    const instance1 = container.get(Dep);
    const instance2 = container.get(Dep);

    expect(instance1.getUuid()).not.toEqual(instance2.getUuid())
  });
})
