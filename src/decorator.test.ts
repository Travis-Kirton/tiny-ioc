import { describe, it, expect } from 'vitest'
import { Service } from './decorators'
import { Registry } from './registry'

describe('decorator', () => {
  @Service()
  class Test {}

  it('should register services into default registry', () => {
    expect(Registry.getRegister().size).toBe(1)
  });

  it('should inject metadata into class', () => {
    expect(Reflect.getMetadata('service', Test)).toBeTruthy()
  });
});
