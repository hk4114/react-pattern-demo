## 单例模式

### A1
单例是可以**实例化一次**的类，并且可以全局访问。
这个单一实例可以在我们的应用程序中共享，这使得单例非常适合**管理应用程序中的全局状态**。

```js
let counter = 0;

export default class Counter {
  // 返回实例值
  getInstance() {
    return this;
  }
  // 返回 counter 值
  getCount() {
    return counter;
  }
  // counter + 1
  increment() {
    return ++counter;
  }
  // counter -1
  decrement() {
    return --counter;
  }
}

const counter1 = new Counter();
const counter2 = new Counter();

console.log(counter1.getInstance() === counter2.getInstance()); // false
```

但是，这个类不符合 `Singleton` 的标准！
单例应该只能被实例化一次。
目前，我们可以创建 `Counter` 类的多个实例。
通过两次调用新方法，我们只需将 counter1 和 counter2 设置为不同的实例。 counter1 和 counter2 上的 getInstance 方法返回的值实际上返回了对不同实例的引用：它们并不严格相等！

让我们确保只能创建 Counter 类的一个实例。

确保只能创建一个实例的一种方法是创建一个名为 instance 的变量。在 Counter 的构造函数中，我们可以在创建新实例时将实例设置为对实例的引用。我们可以通过检查实例变量是否已经有值来防止新的实例化。如果是这种情况，则实例已经存在。这不应该发生：应该抛出一个错误让用户知道.

```js
let instance;
let counter = 0;

class Counter {
  constructor() {
    if (instance) {
      throw new Error("You can only create one instance!");
    }
    instance = this;
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

const counter1 = new Counter();
const counter2 = new Counter();
// Error: You can only create one instance!
```

从 counter.js 文件中导出 Counter 实例。但在此之前，我们也应该冻结实例。 Object.freeze 方法确保消费代码不能修改 Singleton。无法添加或修改冻结实例上的属性，这降低了意外覆盖 Singleton 上的值的风险。

让我们看一个实现 Counter 示例的应用程序。我们有以下文件:
- couter.js 包含 Counter 类，并将 Counter 实例导出为其默认导出.
- index.js 引入 redbtn 和 bluebtn 文件
- redbtn 导入Counter，并将Counter的 decrement 方法作为事件监听器添加到红色按钮，并通过调用getCount方法记录counter的当前值
- bluebtn 导入Counter，并将Counter的increment方法作为事件监听器添加到蓝色按钮，并通过调用getCount方法记录counter的当前值
blueButton.js 和 redButton.js 都从 counter.js 导入相同的实例。此实例在两个文件中都作为 Counter 导入。

当我们在 redButton.js 或 blueButton.js 中调用 increment 方法时，Counter 实例上的 counter 属性值会在两个文件中更新。我们点击红色或蓝色按钮都没有关系：所有实例共享相同的值。这就是为什么计数器一直递增一的原因，即使我们在不同的文件中调用该方法。

优缺点：
将实例化限制为仅一个实例可能会节省大量内存空间。我们不必每次都为新实例设置内存，而只需为该实例设置内存，该实例在整个应用程序中都会被引用。
但是，Singleton 实际上被认为是一种反模式，并且应该在 JavaScript 中避免使用。

在许多编程语言中，例如 Java 或 C++，不可能像在 JavaScript 中那样直接创建对象。在那些面向对象的编程语言中，我们需要创建一个类，它会创建一个对象。该创建的对象具有类实例的值，就像 JavaScript 示例中的实例值一样。

但是，上面示例中显示的类实现实际上是矫枉过正。由于我们可以直接在 JavaScript 中创建对象，因此我们可以简单地使用常规对象来实现完全相同的结果。让我们来介绍一下使用单例的一些缺点！

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

由于对象是通过引用传递的，redButton.js 和 blueButton.js 都在导入对同一个计数器对象的引用。修改这些文件中的任何一个中的计数值都会修改计数器上的值，这在两个文件中都是可见的。

在 React 中，我们经常通过 Redux 或 React Context 等状态管理工具来依赖全局状态，而不是使用 Singletons。尽管它们的全局状态行为可能看起来类似于单例，但这些工具提供了只读状态而不是单例的可变状态。使用 Redux 时，只有纯函数 reducer 可以在组件通过调度程序发送操作后更新状态。

尽管使用这些工具不会神奇地消除全局状态的缺点，但我们至少可以确保全局状态按照我们想要的方式发生变化，因为组件不能直接更新状态。


限制一个类只能被实例化一次，防止多次实例化。

### A2
限制一个类只能被实例化一次，防止多次实例化。
其中，根据类被实例化的时间，又被分为懒汉单例和饿汉单例。懒汉单例是指在第一次调用实例的时候实例化，饿汉单例是指在类加载的时候就实例化。
```js
/* 懒汉单例 */
class PeopleSingle {
  static instance = null;
  constructor() {}
  public static getInstance() {
    if(PeopleSingle.instance === null) {
      PeopleSingle.instance = new PeopleSingle()
    }
    return PeopleSingle.instance
  }
}
PeopleSingle.getInstance()
/* 饿汉单例 */
class PeopleSingle {
  static instance = new PeopleSingle()
  private constructor() {}
}
PeopleSingle.instance
```

### A3
有一些对象我们往往只需要一个，比如全局缓存、浏览器中的 window 对象等。单例模式用于保证一个类仅有一个实例，并提供一个访问它的全局访问点。

在上图中，阿宝哥模拟了借车的流程，小王临时有急事找阿宝哥借车子，阿宝哥家的车子刚好没用，就借给小王了。当天，小秦也需要用车子，也找阿宝哥借车，因为阿宝哥家里只有一辆车子，所以就没有车可借了。

对于车子来说，它虽然给生活带来了很大的便利，但养车也需要一笔不小的费用（车位费、油费和保养费等），所以阿宝哥家里只有一辆车子。

在开发软件系统时，如果遇到创建对象时耗时过多或耗资源过多，但又经常用到的对象，我们就可以考虑使用单例模式。

下面我们来看一下如何使用 TypeScript 来实现单例模式。

```ts
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
```

应用场景
需要频繁实例化然后销毁的对象。
创建对象时耗时过多或耗资源过多，但又经常用到的对象。
系统只需要一个实例对象，如系统要求提供一个唯一的序列号生成器或资源管理器，或者需要考虑资源消耗太大而只允许创建一个对象。

### A4
意图
单例模式是一种创建型设计模式， 让你能够保证一个类只有一个实例， 并提供一个访问该实例的全局节点。


单例模式适合应用场景
如果程序中的某个类对于所有客户端只有一个可用的实例， 可以使用单例模式。
单例模式禁止通过除特殊构建方法以外的任何方式来创建自身类的对象。 该方法可以创建一个新对象， 但如果该对象已经被创建， 则返回已有的对象。

如果你需要更加严格地控制全局变量， 可以使用单例模式。
单例模式与全局变量不同， 它保证类只存在一个实例。 除了单例类自己以外， 无法通过任何方式替换缓存的实例。
请注意， 你可以随时调整限制并设定生成单例实例的数量， 只需修改 获取实例方法， 即 getInstance 中的代码即可实现。

实现方式
1. 在类中添加一个私有静态成员变量用于保存单例实例。
2. 声明一个公有静态构建方法用于获取单例实例。
3. 在静态方法中实现"延迟初始化"。 该方法会在首次被调用时创建一个新对象， 并将其存储在静态成员变量中。 此后该方法每次被调用时都返回该实例。
4. 将类的构造函数设为私有。 类的静态方法仍能调用构造函数， 但是其他对象不能调用。
5. 检查客户端代码， 将对单例的构造函数的调用替换为对其静态构建方法的调用。

优点
- 你可以保证一个类只有一个实例。
- 你获得了一个指向该实例的全局访问节点。
-  仅在首次请求单例对象时对其进行初始化。

缺点
- 违反了_单一职责原则_。 该模式同时解决了两个问题。
- 单例模式可能掩盖不良设计， 比如程序各组件之间相互了解过多等。
- 该模式在多线程环境下需要进行特殊处理， 避免多个线程多次创建单例对象。
- 单例的客户端代码单元测试可能会比较困难， 因为许多测试框架以基于继承的方式创建模拟对象。 由于单例类的构造函数是私有的， 而且绝大部分语言无法重写静态方法， 所以你需要想出仔细考虑模拟单例的方法。 要么干脆不编写测试代码， 或者不使用单例模式。


本例说明了单例设计模式的结构并重点回答了下面的问题：
- 它由哪些类组成？
- 这些类扮演了哪些角色？
- 模式中的各个元素会以何种方式相互关联？
```ts
/**
 * The Singleton class defines the `getInstance` method that lets clients access
 * the unique singleton instance.
 */
class Singleton {
  private static instance: Singleton;

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() { }

  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the Singleton class while keeping
   * just one instance of each subclass around.
   */
  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }

    return Singleton.instance;
  }

  /**
   * Finally, any singleton should define some business logic, which can be
   * executed on its instance.
   */
  public someBusinessLogic() {
    // ...
  }
}

/**
 * The client code.
 */
function clientCode() {
  const s1 = Singleton.getInstance();
  const s2 = Singleton.getInstance();

  if (s1 === s2) {
    console.log('Singleton works, both variables contain the same instance.');
  } else {
    console.log('Singleton failed, variables contain different instances.');
  }
}

clientCode();
// Singleton works, both variables contain the same instance.
```
