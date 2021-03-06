# 设计模式

## 【创建型】单例模式

### 目的
1. 只能被实例化一次。
2. 提供全局节点访问该实例。
现在只要符合一个都能称之为单例模式。
这个单一实例可以在我们的应用程序中共享，这使得单例非常适合**管理应用程序中的全局状态**。

### 举例
比如全局缓存、浏览器中的 window 对象等。

### 类比
政府是单例模式的一个很好的示例。一个国家只有一个官方政府。不管组成政府的每个人的身份是什么，“某政府” 这一称谓总是鉴别那些掌权者的全局访问节点。

模拟借车流程，小王临时有急事找张三借车子，张三家的车子刚好没用，就借给小王了。当天，小秦也需要用车子，也找张三借车，因为张三家里只有一辆车子，所以就没有车可借了。

对于车子来说，它虽然给生活带来了很大的便利，但养车也需要一笔不小的费用（车位费、油费和保养费等），所以张三家里只有一辆车子。

在开发软件系统时，如果遇到创建对象时耗时过多或耗资源过多，但又经常用到的对象，我们就可以考虑使用单例模式。


### 应用条件
- 需要频繁实例化然后销毁的对象。
- 创建对象时耗时过多或耗资源过多，但又经常用到的对象。
- 系统只需要一个实例对象，如系统要求提供一个唯一的序列号生成器或资源管理器，或者需要考虑资源消耗太大而只允许创建一个对象。

### 实现方式
1. 在类中添加一个私有静态成员变量用于保存单例实例。
2. 声明一个公有静态构建方法用于获取单例实例。
3. 在静态方法中实现"延迟初始化"。 该方法会在首次被调用时创建一个新对象， 并将其存储在静态成员变量中。 此后该方法每次被调用时都返回该实例。
4. 将类的构造函数设为私有。 类的静态方法仍能调用构造函数， 但是其他对象不能调用。
5. 检查客户端代码，将对单例的构造函数的调用替换为对其静态构建方法的调用。

其中，根据类被实例化的时间，又被分为懒汉单例和饿汉单例。
懒汉单例是指在第一次调用实例的时候实例化，饿汉单例是指在类加载的时候就实例化。

```ts
/* 饱汉单例 */
class Singleton {
  // 定义私有的静态属性，来保存对象实例
  private static singleton: Singleton;
  private constructor() {}

  // 提供一个静态的方法来获取对象实例
  public static getInstance(): Singleton {
    if (!Singleton.singleton) {
      Singleton.singleton = new Singleton();
    }
    return Singleton.singleton;
  }
}

let instance1 = Singleton.getInstance();
let instance2 = Singleton.getInstance();

console.log(instance1 === instance2); // true

/* 饿汉单例 */
class PeopleSingle {
  static instance = new PeopleSingle()
  private constructor() {}
}
PeopleSingle.instance
```

### 优点
- 可以保证一个类有且仅有一个实例，节省内存空间。我们不必每次都为新实例设置内存，而只需为该实例设置内存，该实例在整个应用程序中都会被引用。
- 获得了一个指向该实例的全局访问节点。
- 仅在首次请求单例对象时对其进行初始化。

### 缺点
- 违反了单一职责原则。 该模式同时解决了两个问题。
- 单例模式可能掩盖不良设计， 比如程序各组件之间相互了解过多等。
- 该模式在多线程环境下需要进行特殊处理， 避免多个线程多次创建单例对象。
- 单例的客户端代码单元测试可能会比较困难， 因为许多测试框架以基于继承的方式创建模拟对象。 由于单例类的构造函数是私有的， 而且绝大部分语言无法重写静态方法， 所以你需要想出仔细考虑模拟单例的方法。 要么干脆不编写测试代码， 或者不使用单例模式。

在 JavaScript 中避免使用。
在其他例如 Java 或 C++ 中，不可能像在 JavaScript 中那样直接创建对象。该创建的对象具有类实例的值，就像 JavaScript 示例中的实例值一样。
```js
// counter.js
let instance;
let counter = 0;

class Counter {
  constructor() {
    if (instance) {
      throw new Error("Only one instance is allowed!");
    }
    instance = this;
    this.counter = counter;
  }

  getInstance() {
    return this;
  }

  getCount() {
    return counter;
  }

  increment() {
    return ++counter;
  }

  decrement() {
    return --counter;
  }
}

const singletonCounter = Object.freeze(new Counter());

export default singletonCounter;

// app.js
const counter1 = new Counter();
const counter2 = new Counter();
// Error: You can only create one instance!
```
很多情况下我们甚至不需要通过创建类。直接通过创建对象也能实现单例的效果：
```js
// counter.js
let count = 0;

const counter = {
  increment() {
    return ++count;
  },
  decrement() {
    return --count;
  }
};

Object.freeze(counter);
export { counter };
```
但是对象是通过引用传递的，不同文件导入同一个对象引用，修改这些文件中的任何一个中的计数值都会修改计数器上的值，这在引入组件的文件中都是可见的。

在 React 中，我们经常通过 Redux 或 React Context 等状态管理工具来控制全局状态，而不是使用 Singletons。尽管它们的全局状态行为可能看起来类似于单例，但这些工具提供了只读状态而不是单例的可变状态。使用 Redux 时，只有纯函数 reducer 可以在组件通过调度程序发送操作后更新状态。

## 【结构型】代理模式

### 目的
基于已有类的对象上，不修改该类代码，增加额外行为。
代理模式是一种结构型设计模式， 让你能够提供对象的替代品或其占位符。 代理控制着对于原对象的访问， 并允许在将请求提交给对象前后进行一些处理。
代理模式会将所有实际工作委派给一些其他对象。 除非代理是某个服务的子类， 否则每个代理方法最后都应该引用一个服务对象。

### 类比
信用卡是银行账户的代理，银行账户则是一大捆现金的代理。 它们都实现了同样的接口， 均可用于进行支付。 消费者会非常满意， 因为不必随身携带大量现金； 商店老板同样会十分高兴， 因为交易收入能以电子化的方式进入商店的银行账户中， 无需担心存款时出现现金丢失或被抢劫的情况。

### 应用场景
延迟初始化 （虚拟代理）。 如果你有一个偶尔使用的重量级服务对象， 一直保持该对象运行会消耗系统资源时， 可使用代理模式。
你无需在程序启动时就创建该对象， 可将对象的初始化延迟到真正有需要的时候。

本地执行远程服务 （远程代理）。 适用于服务对象位于远程服务器上的情形。
在这种情形中， 代理通过网络传递客户端请求， 负责处理所有与网络相关的复杂细节。

记录日志请求 （日志记录代理）。 适用于当你需要保存对于服务对象的请求历史记录时
代理可以在向服务传递请求前进行记录。

缓存请求结果 （缓存代理）。 适用于需要缓存客户请求结果并对缓存生命周期进行管理时， 特别是当返回结果的体积非常大时。
代理可对重复请求所需的相同结果进行缓存， 还可使用请求参数作为索引缓存的键值。

### 实现方式
- 如果没有现成的服务接口， 你就需要创建一个接口来实现代理和服务对象的可交换性。 从服务类中抽取接口并非总是可行的， 因为你需要对服务的所有客户端进行修改， 让它们使用接口。 备选计划是将代理作为服务类的子类， 这样代理就能继承服务的所有接口了。
- 创建代理类， 其中必须包含一个存储指向服务的引用的成员变量。 通常情况下， 代理负责创建服务并对其整个生命周期进行管理。 在一些特殊情况下， 客户端会通过构造函数将服务传递给代理。
- 根据需求实现代理方法。 在大部分情况下， 代理在完成一些任务后应将工作委派给服务对象。
- 可以考虑新建一个构建方法来判断客户端可获取的是代理还是实际服务。 你可以在代理类中创建一个简单的静态方法， 也可以创建一个完整的工厂方法。
- 可以考虑为服务对象实现延迟初始化。

对接口进行一定程度的隐藏，用于封装复杂类。
```ts
// 比如Car有很多属性，我们只需要一个简单的版本
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
js 种可以直接使用 proxy 拦截和控制与目标对象的交互.
当我们处理对象，比如获取或者设置对象字段时。
代理对象可以在我们与对象交互时确定行为，例如当我们获取值或设置值时。

一般来说，代理是指代他人。您将与代表您尝试联系的人的代理人交谈，而不是直接与该人交谈。 JavaScript 中也是如此：我们将与 Proxy 对象进行交互，而不是直接与目标对象交互。

代理是添加对对象行为的控制的强大方法。代理可以有各种用例：它可以帮助验证、格式化、通知或调试。
过度使用 Proxy 对象或对每个处理程序方法调用执行繁重的操作很容易对应用程序的性能产生负面影响。最好不要将代理用于性能关键代码。

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

const person = {
  name: "John Doe",
  age: 42,
  nationality: "American"
};

// Reflect
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

JavaScript 提供了一个名为 `Reflect` 的内置对象，它使我们在使用代理时更容易操作目标对象。
我们可以通过 `Reflect.get()` 和 `Reflect.set()` 访问或修改目标对象上的属性，而不是通过 `obj[prop]` 访问属性或通过 `obj[prop] = value` 设置属性。这些方法接收与处理程序对象上的方法相同的参数。

### 优点
- 你可以在客户端毫无察觉的情况下控制服务对象。
- 如果客户端对服务对象的生命周期没有特殊要求， 你可以对生命周期进行管理。
- 即使服务对象还未准备好或不存在， 代理也可以正常工作。
- 开闭原则。 你可以在不对服务或客户端做出修改的情况下创建新代理。

### 缺点
- 代码可能会变得复杂， 因为需要新建许多类。
- 服务响应可能会延迟。

代理是一种结构型设计模式， 让你能提供真实服务对象的替代品给客户端使用。 代理接收客户端的请求并进行一些处理 （访问控制和缓存等）， 然后再将请求传递给服务对象。
代理对象拥有和服务对象相同的接口， 这使得当其被传递给客户端时可与真实对象互换。

访问控制 （保护代理）。 如果你只希望特定客户端使用服务对象， 这里的对象可以是操作系统中非常重要的部分， 而客户端则是各种已启动的程序 （包括恶意程序）， 此时可使用代理模式。
代理可仅在客户端凭据满足要求时将请求传递给服务对象。


## 供应者模式
利用 react 提供的 context api 实现跨组件通信传值。

## 【创建型】原型模式
创建新对象时是基于一个对象的拷贝，而不是重新实例化一个类。
### 目的
复制已有对象，而又无需使代码依赖它们所属的类。

由一个问题引申过来：
已经存在一个类，现在希望生成一个完全相同的复制品，该如何操作呢？
1. 新建一个属于相同类的对象
2. 遍历原始对象的所有成员变量
```js
const obj = {
  name: 'kane',
  age: 18
}
const cp = {};
for(let k in obj) {
  cp[k] = obj[k]
}
```
存在的问题：
1. 有些对象可能拥有私有成员变量， 它们在对象本身以外是不可见的。
2. 必须知道所属对象的类才能复制，代码依赖这个类。有时候只知道对象所实现的接口，而不知道所属的具体类。

所以原型模式需要在接口里面实现一个克隆方法。


### 类比
有丝分裂会产生一对完全相同的细胞。 原始细胞就是一个原型， 它在复制体的生成过程中起到了推动作用。


### 应用场景
复制一些对象，同时又希望代码独立于这些对象所属的具体类，可以使用原型模式。

### 实现方式

```ts
// 最简单的实现方式
// 这样每次返回的都是新的对象，也可以相当于是对象的拷贝
function peopleConfigPrototype() {
  return {
    name: '',
    age: 0,
    des: ''
  }
}

// 直接拷贝对象
const peopleConfigPrototype = {
  name: '',
  age: 0,
  des: ''
}
const peopleConfig = Object.create(peopleConfigPrototype);
```

1. 创建原型接口，并在其中声明克隆 `clone` 方法。如果类已经存在那就直接添加 `clone`。
2. 原型类必须另行定义一个以该类对象为参数的构造函数`ComponentWithBackReference`。`ComponentWithBackReference` 复制参数对象中的所有成员变量值到新建实例中。如果需要修改子类，则必须调用父类构造函数，让父类复制其私有成员变量值。
3. 如果语言不支持函数重载，那么可能需要定义一个特殊方法来复制对象数据。在构造函数中进行此类处理比较方便，因为它在调用 `new` 运算符后会马上返回结果对象。
4. 还可以创建一个中心化原型注册表，用于存储常用原型。
5. 可以新建一个工厂类来实现注册表，或者在原型基类中添加一个获取原型的静态方法。静态方法可以根据客户端代码设定的条件进行搜索。搜索条件可以是简单的字符串，或者是一组复杂的搜索参数。找到合适的原型后，注册表应对原型进行克隆，并将复制生成的对象返回给客户端。
6. 最后还要将对子类构造函数的直接调用替换为对原型注册表工厂方法的调用。


```ts
/**
 * The example class that has cloning ability. We'll see how the values of field
 * with different types will be cloned.
 */
class Prototype {
  public primitive: any;
  public component: object;
  public circularReference: ComponentWithBackReference;

  // 声明克隆方法
  public clone(): this {
    const clone = Object.create(this);

    clone.component = Object.create(this.component);

    // Cloning an object that has a nested object with backreference
    // requires special treatment. After the cloning is completed, the
    // nested object should point to the cloned object, instead of the
    // original object. Spread operator can be handy for this case.
    clone.circularReference = {
      ...this.circularReference,
      prototype: { ...this },
    };

    return clone;
  }
}

class ComponentWithBackReference {
  public prototype;

  constructor(prototype: Prototype) {
    this.prototype = prototype;
  }
}

/**
 * The client code.
 */
function clientCode() {
  const p1 = new Prototype();
  p1.primitive = 245;
  p1.component = new Date();
  p1.circularReference = new ComponentWithBackReference(p1);

  const p2 = p1.clone();
  if (p1.primitive === p2.primitive) {
    console.log('Primitive field values have been carried over to a clone. Yay!');
  } else {
    console.log('Primitive field values have not been copied. Booo!');
  }
  if (p1.component === p2.component) {
    console.log('Simple component has not been cloned. Booo!');
  } else {
    console.log('Simple component has been cloned. Yay!');
  }

  if (p1.circularReference === p2.circularReference) {
    console.log('Component with back reference has not been cloned. Booo!');
  } else {
    console.log('Component with back reference has been cloned. Yay!');
  }

  if (p1.circularReference.prototype === p2.circularReference.prototype) {
    console.log('Component with back reference is linked to original object. Booo!');
  } else {
    console.log('Component with back reference is linked to the clone. Yay!');
  }
}

clientCode();

// Primitive field values have been carried over to a clone. Yay!
// Simple component has been cloned. Yay!
// Component with back reference has been cloned. Yay!
// Component with back reference is linked to the clone. Yay!
```

在 js 中，我们只要了解我们可以通过任何实例的 `__proto__` 属性直接看到原型。任何构造函数实例上的 `__proto__` 值，都是对构造函数原型的直接引用！每当我们尝试直接访问对象上不存在的属性时，js 将沿着原型链查看该属性是否在原型链中可用。

由于所有实例都可以访问原型，因此即使在创建实例之后也很容易向原型添加属性。

```js
class Dog {
  constructor(name) {
    this.name = name;
  }

  bark() {
    return `Woof!`;
  }
}
const dog1 = new Dog("Daisy");
console.log(Dog.prototype);
// constructor: ƒ Dog(name, breed) bark: ƒ bark()

console.log(dog1.__proto__);
// constructor: ƒ Dog(name, breed) bark: ƒ bark()
Dog.prototype.play = () => console.log("Playing now!");

dog1.play();

class SuperDog extends Dog {
  constructor(name) {
    super(name);
  }

  fly() {
    return "Flying!";
  }
}
```
SuperDog 可以访问 bark 方法，因为继承了 Dog 类。 SuperDog 原型上的 `__proto__` 值指向 Dog.prototype 对象。

为什么它被称为原型链？
当我们尝试访问对象上不直接可用的属性时，js 会递归地遍历 `__proto__` 指向的所有对象，直到找到该属性！

`Object.create` 方法允许我们创建一个新对象，我们可以将其原型的值显式传递给该对象。是一种让对象直接从其他对象继承属性的简单方法，通过指定新创建对象的原型。新对象可以通过原型链访问新属性。
```js
const dog = {
  bark() {
    console.log(`Woof!`);
  }
};

const pet1 = Object.create(dog);

pet1.bark(); // Woof!
console.log("Direct properties on pet1: ", Object.keys(pet1));
console.log("Properties on pet1's prototype: ", Object.keys(pet1.__proto__));
```
pet1 本身没有任何属性，但它却可以访问其原型链上的所有属性。
原型模式允许我们轻松地让对象访问和继承其他对象的属性。由于原型链允许我们访问不是直接在对象本身上定义的属性，我们可以避免方法和属性的重复，从而减少使用的内存量。


### 优缺点
|                      优点                       |                    缺点                    |
| :---------------------------------------------: | :----------------------------------------: |
| 可以克隆对象， 而无需与它们所属的具体类相耦合。 | 克隆包含循环引用的复杂对象可能会非常麻烦。 |
|  可以克隆预生成原型， 避免反复运行初始化代码。  |                                            |
|           可以更方便地生成复杂对象。            |                                            |
| 可以用继承以外的方式来处理复杂对象的不同配置。  |                                            |

## 容器模式
使用这种模式，我们可以将视图与应用程序逻辑分开。  


## 中介模式
全权负责两个模块之间的通讯，比如MVC，MVVM就是非常典型的中介模式。
中介模式，桥接模式，代理模式的区别是：
代理模式一对一，只能代理特定类和对象，是对其的扩展或是约束。
桥接模式一对多，是对类或对象成员或属性的扩展。
中介模式多对多，全权承包所有两个概念间的关系。
```ts
class Car {
  name: string = 'benz';
}

class Buyer {
  name: string = 'sam';
  buy(car: Car) {
    console.log(`${this.name}have bought ${car.name}`)
  }
}

class FourSShop {
  constructor() {
    const benz = new Car()
    const sam = new Buyer()
    sam.buy(benz)
  }
}
```

## 状态模式
与观察者模式相对，表示的是“记录状态”，只要状态变更，表现即不同，这是设计数据驱动的基础。
```ts
class State {
  tmp: string;
  set store(state: string) {
    if (this.tmp !== state) {
      // do something
      this.tmp = state
    }
  }
  get store(): string {
    return this.tmp
  }
}

class People {
  state: State
  constructor(state: State) {
    this.state = state
  }
}

const state = new State()
const people = new People(state);

state.store = '1';
console.log(people.state.store)
```
