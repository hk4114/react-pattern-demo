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



### A3
目的
代理模式是一种结构型设计模式， 让你能够提供对象的替代品或其占位符。 代理控制着对于原对象的访问， 并允许在将请求提交给对象前后进行一些处理。
当你希望在无需修改客户代码的前提下于已有类的对象上增加额外行为时， 该模式是无可替代的。
代理模式会将所有实际工作委派给一些其他对象。 除非代理是某个服务的子类， 否则每个代理方法最后都应该引用一个服务对象。

类比
信用卡是银行账户的代理， 银行账户则是一大捆现金的代理。 它们都实现了同样的接口， 均可用于进行支付。 消费者会非常满意， 因为不必随身携带大量现金； 商店老板同样会十分高兴， 因为交易收入能以电子化的方式进入商店的银行账户中， 无需担心存款时出现现金丢失或被抢劫的情况。

应用场景
延迟初始化 （虚拟代理）。 如果你有一个偶尔使用的重量级服务对象， 一直保持该对象运行会消耗系统资源时， 可使用代理模式。
你无需在程序启动时就创建该对象， 可将对象的初始化延迟到真正有需要的时候。

本地执行远程服务 （远程代理）。 适用于服务对象位于远程服务器上的情形。
在这种情形中， 代理通过网络传递客户端请求， 负责处理所有与网络相关的复杂细节。

记录日志请求 （日志记录代理）。 适用于当你需要保存对于服务对象的请求历史记录时
代理可以在向服务传递请求前进行记录。

缓存请求结果 （缓存代理）。 适用于需要缓存客户请求结果并对缓存生命周期进行管理时， 特别是当返回结果的体积非常大时。
代理可对重复请求所需的相同结果进行缓存， 还可使用请求参数作为索引缓存的键值。

实现方式
- 如果没有现成的服务接口， 你就需要创建一个接口来实现代理和服务对象的可交换性。 从服务类中抽取接口并非总是可行的， 因为你需要对服务的所有客户端进行修改， 让它们使用接口。 备选计划是将代理作为服务类的子类， 这样代理就能继承服务的所有接口了。
- 创建代理类， 其中必须包含一个存储指向服务的引用的成员变量。 通常情况下， 代理负责创建服务并对其整个生命周期进行管理。 在一些特殊情况下， 客户端会通过构造函数将服务传递给代理。
- 根据需求实现代理方法。 在大部分情况下， 代理在完成一些任务后应将工作委派给服务对象。
- 可以考虑新建一个构建方法来判断客户端可获取的是代理还是实际服务。 你可以在代理类中创建一个简单的静态方法， 也可以创建一个完整的工厂方法。
- 可以考虑为服务对象实现延迟初始化。


优点
- 你可以在客户端毫无察觉的情况下控制服务对象。
- 如果客户端对服务对象的生命周期没有特殊要求， 你可以对生命周期进行管理。
- 即使服务对象还未准备好或不存在， 代理也可以正常工作。
- 开闭原则。 你可以在不对服务或客户端做出修改的情况下创建新代理。

缺点
- 代码可能会变得复杂， 因为需要新建许多类。
- 服务响应可能会延迟。

代理是一种结构型设计模式， 让你能提供真实服务对象的替代品给客户端使用。 代理接收客户端的请求并进行一些处理 （访问控制和缓存等）， 然后再将请求传递给服务对象。
代理对象拥有和服务对象相同的接口， 这使得当其被传递给客户端时可与真实对象互换。

访问控制 （保护代理）。 如果你只希望特定客户端使用服务对象， 这里的对象可以是操作系统中非常重要的部分， 而客户端则是各种已启动的程序 （包括恶意程序）， 此时可使用代理模式。
代理可仅在客户端凭据满足要求时将请求传递给服务对象。


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


### A2
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
    console.log(`The value of ${prop} is ${obj[prop]}`);
  },
  set: (obj, prop, value) => {
    console.log(`Changed ${prop} from ${obj[prop]} to ${value}`);
    obj[prop] = value;
    return true;
  }
});


console.log(person.name, 'origin name')
personProxy.age = 43;

console.table(person)
console.table(personProxy)

// 加上一些校验逻辑
const personProxy = new Proxy(person, {
  get: (obj, prop) => {
    // 不存在的属性
    if (!obj[prop]) {
      console.log(`Hmm.. this property doesn't seem to exist`);
    } else {
      console.log(`The value of ${prop} is ${obj[prop]}`);
    }
  },
  set: (obj, prop, value) => {
    // age 值是字符串，且 < 10 才能进行修改
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
```

JavaScript 提供了一个名为 Reflect 的内置对象，它使我们在使用代理时更容易操作目标对象。
我们可以通过 `Reflect.get()` 和 `Reflect.set()` 访问或修改目标对象上的属性，而不是通过 `obj[prop]` 访问属性或通过 `obj[prop] = value` 设置属性。这些方法接收与处理程序对象上的方法相同的参数。

```js
const person = {
  name: "John Doe",
  age: 42,
  nationality: "American"
};

const personProxy = new Proxy(person, {
  get: (obj, prop) => {
    console.log(`The value of ${prop} is ${Reflect.get(obj, prop)}`);
  },
  set: (obj, prop, value) => {
    console.log(`Changed ${prop} from ${obj[prop]} to ${value}`);
    return Reflect.set(obj, prop, value);
  }
});

personProxy.name;
personProxy.age = 43;
personProxy.name = "Jane Doe";
```

代理是添加对对象行为的控制的强大方法。代理可以有各种用例：它可以帮助验证、格式化、通知或调试。
过度使用 Proxy 对象或对每个处理程序方法调用执行繁重的操作很容易对应用程序的性能产生负面影响。最好不要将代理用于性能关键代码。