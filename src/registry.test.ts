import { describe, it, expect } from 'vitest'
import { Registry } from './registry'
import { Service } from './decorators'

describe('registry', () => {
  it('should insert 1 item into registry service map', () => {
    class Dependency {
      methodOne() {
        return 'test-123'
      }
    }

    @Service()
    class OneDependency {
      constructor(private dep: Dependency) {}

      methodOne() {
        return this.dep.methodOne();
      }
    }

    expect(Registry.getRegister().size).toBe(1);
  })
})
