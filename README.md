# 设计模式

## 单例模式
【创建型】

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

