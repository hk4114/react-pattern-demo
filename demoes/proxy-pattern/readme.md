## 代理模式
【结构型】

### A1
对接口进行一定程度的隐藏，用于封装复杂类。

比如Car有很多属性，我们只需要一个简单的版本
```js
class Car {
  a: number = 1
  b: number = 2
  c: number = 3
  d: number = 4
  name: string = 'name'
  test() {
    console.log('this is test')
  }
}

class CarProxy {
  private car: Car
  name: string
  constructor() {
    if(this.car === null) {
      this.car = new Car
    }
    this.name = this.car.name
  }
  test() {
    this.car.test()
  }
}
```

### A2
https://www.patterns.dev/posts/proxy-pattern/
拦截和控制与目标对象的交互.
使用 Proxy 对象，我们可以更好地控制与某些对象的交互。
当我们处理对象，比如获取或者设置对象字段时。
代理对象可以在我们与对象交互时确定行为，例如当我们获取值或设置值时。

一般来说，代理是指代他人。您将与代表您尝试联系的人的代理人交谈，而不是直接与该人交谈。 JavaScript 中也是如此：我们将与 Proxy 对象进行交互，而不是直接与目标对象交互。
```js
const person = {
  name: "John Doe",
  age: 42,
  nationality: "American"
};

const personProxy = new Proxy(person, {
  get: (obj, prop) => {
    if (!obj[prop]) {
      console.log(`Hmm.. this property doesn't seem to exist`);
    } else {
      console.log(`The value of ${prop} is ${obj[prop]}`);
    }
  },
  set: (obj, prop, value) => {
    if (prop === "age" && typeof value !== "number") {
      console.log(`Sorry, you can only pass numeric values for age.`);
    } else if (prop === "name" && value.length < 2) {
      console.log(`You need to provide a valid name.`);
    } else {
      console.log(`Changed ${prop} from ${obj[prop]} to ${value}.`);
      obj[prop] = value;
    }
    return true;
  }
});

personProxy.nonExistentProperty;
personProxy.age = "44";
personProxy.name = "";
```

### A3
https://refactoringguru.cn/design-patterns/proxy
代理是一种结构型设计模式， 让你能提供真实服务对象的替代品给客户端使用。 代理接收客户端的请求并进行一些处理 （访问控制和缓存等）， 然后再将请求传递给服务对象。
代理对象拥有和服务对象相同的接口， 这使得当其被传递给客户端时可与真实对象互换。
尽管代理模式在绝大多数 TypeScript 程序中并不常见， 但它在一些特殊情况下仍然非常方便。 
当你希望在无需修改客户代码的前提下于已有类的对象上增加额外行为时， 该模式是无可替代的。
代理模式会将所有实际工作委派给一些其他对象。 除非代理是某个服务的子类， 否则每个代理方法最后都应该引用一个服务对象。
```ts
/**
 * The Subject interface declares common operations for both RealSubject and the
 * Proxy. As long as the client works with RealSubject using this interface,
 * you'll be able to pass it a proxy instead of a real subject.
 */
interface Subject {
  request(): void;
}

/**
* The RealSubject contains some core business logic. Usually, RealSubjects are
* capable of doing some useful work which may also be very slow or sensitive -
* e.g. correcting input data. A Proxy can solve these issues without any
* changes to the RealSubject's code.
*/
class RealSubject implements Subject {
  public request(): void {
    console.log('RealSubject: Handling request.');
  }
}

/**
* The Proxy has an interface identical to the RealSubject.
*/
class Proxy implements Subject {
  private realSubject: RealSubject;

  /**
   * The Proxy maintains a reference to an object of the RealSubject class. It
   * can be either lazy-loaded or passed to the Proxy by the client.
   */
  constructor(realSubject: RealSubject) {
    this.realSubject = realSubject;
  }

  /**
   * The most common applications of the Proxy pattern are lazy loading,
   * caching, controlling the access, logging, etc. A Proxy can perform one of
   * these things and then, depending on the result, pass the execution to the
   * same method in a linked RealSubject object.
   */
  public request(): void {
    if (this.checkAccess()) {
      this.realSubject.request();
      this.logAccess();
    }
  }

  private checkAccess(): boolean {
    // Some real checks should go here.
    console.log('Proxy: Checking access prior to firing a real request.');

    return true;
  }

  private logAccess(): void {
    console.log('Proxy: Logging the time of request.');
  }
}

/**
* The client code is supposed to work with all objects (both subjects and
* proxies) via the Subject interface in order to support both real subjects and
* proxies. In real life, however, clients mostly work with their real subjects
* directly. In this case, to implement the pattern more easily, you can extend
* your proxy from the real subject's class.
*/
function clientCode(subject: Subject) {
  // ...

  subject.request();

  // ...
}

console.log('Client: Executing the client code with a real subject:');
const realSubject = new RealSubject();
clientCode(realSubject);

console.log('');

console.log('Client: Executing the same client code with a proxy:');
const proxy = new Proxy(realSubject);
clientCode(proxy);
// Client: Executing the client code with a real subject:
// RealSubject: Handling request.

// Client: Executing the same client code with a proxy:
// Proxy: Checking access prior to firing a real request.
// RealSubject: Handling request.
// Proxy: Logging the time of request.
```