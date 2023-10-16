

# IoC / DI Container
---
![Build Status](https://github.com/Travis-Kirton/tiny-ioc/actions/workflows/ci.yml/badge.svg)

This is a minimal IoC / DI Container that supports injection of dependencies for TypeScript.

Feature Set:

- Object injection
- constructor injection
- Singleton / Transient services for class instantiation
- Can support multiple containers but initial @Service are registered on each container created

## Installation

Install the package via npm
```bash
npm install @travisk/tiny-ioc
```

Ensure you install `reflect-metadata` as this library requires it
```bash
npm install reflect-metadata
```

Import `reflect-metadata` when using the decorators such as `@Service`
```ts
import 'reflect-metadata';
```

Enable decorators and metadata within your `tsconfig.json`
```json
"emitDecoratorMetadata": true,
"experimentalDecorators": true,
```

## Usage

Injecting constructor dependencies (Transient by default)
- Use `@Service` above the class declaration to allow constructor injection
```ts
import 'reflect-metadata';
import { Container, Service } from '@travisk/tiny-ioc';

class UserRepository {

    getAllUserIds(): number[] {
        return [1, 2];
    }

}


@Service()
class UserService {

    constructor(private userRepo: UserRepository) {}

    getUserData = (): number[] => {
        return this.userRepo.getAllUserIds();
    }
}

const container = new Container();
const userService = container.get(UserService);

const userIds = userService.getUserData(); // returns [1, 2]

```

Injecting Singleton dependencies
```ts
import 'reflect-metadata';
import { Container, Service } from '@travisk/practice-lib';

class UuidGenerator {
    private uuid;
    constructor(){
        this.uuid = new randomUuid(); // generate uuid
    }
    getUuid(): string {
        return this.uuid;
    }

}


@Service('Singleton')
class TestClass {

    constructor(private uuidGen: UuidGenerator) {}

    getUserId = (): string => {
        return this.uuidGen.getUuid();
    }
}

const container = new Container();
const service1 = container.get(TestClass);
const service2 = container.get(TestClass);

service1.getUserId() === service2.getUserId(); // returns true
```

Injecting Objects
```ts
import 'reflect-metadata';
import { Container } from '@travisk/tiny-ioc';


const container = new Container();
container.register('token', {hello: 'world'});
const obj = container.get('token'); // returns { hello: 'world' }
```

##  Roadmap / Missing features

- Include injection of functions, constants etc
- Allow for Scoped lifecycle dependencies
- Allow injected dependencies to be swapped with 'Fake' dependencies for testing

## For Maintainers / Contributors

- make sure to run lint via `npm run lint`
- This library is published via [changesets](https://github.com/changesets/changesets)
  - You can run `npx changeset` to initialise a version bump (patch, minor, major)
  - Once committed it will create  PR to be merged in
  - When the PR is merged, it will publish the new version to npm and update the CHANGELOG.md
