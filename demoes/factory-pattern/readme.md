## A1
工厂模式简而言之，就是要替代掉“new操作符”！
为什么需要替代new操作符？
因为有时候创建实例时需要大量的准备工作，而将这些准备工作全部放在构造函数中是非常危险的行为，有必要将创建实例的逻辑和使用实例的逻辑分开，方便以后扩展。

## A2
工厂模式可以分为：简单工厂模式、工厂方法模式和抽象工厂模式。

### 简单工厂模式
又叫 静态方法模式，因为工厂类中定义了一个静态方法用于创建对象。简单工厂让使用者不用知道具体的参数就可以创建出所需的 ”产品“ 类，即使用者可以直接消费产品而不需要知道产品的具体生产细节。

在上图中模拟用户购车流程，分别向 BMW 工厂订购了 BMW730 和 BMW840 型号的车型，接着工厂会先判断用户选择的车型，然后按照对应的模型进行生产并在生产完成后交付给用户。

应用场景
工厂类负责创建的对象比较少：由于创建的对象比较少，不会造成工厂方法中业务逻辑过于复杂。
客户端只需知道传入工厂类静态方法的参数，而不需要关心创建对象的细节。

```ts
abstract class BMW {
  abstract run(): void;
}

class BMW730 extends BMW {
  run(): void {
    console.log("BMW730 发动咯");
  }
}

class BMW840 extends BMW {
  run(): void {
    console.log("BMW840 发动咯");
  }
}

class BMWFactory {
  public static produceBMW(model: "730" | "840"): BMW {
    if (model === "730") {
      return new BMW730();
    } else {
      return new BMW840();
    }
  }
}

const bmw730 = BMWFactory.produceBMW("730");
const bmw840 = BMWFactory.produceBMW("840");

bmw730.run();
bmw840.run();
```
定义一个 BMWFactory 类，该类提供了一个静态的 produceBMW() 方法，用于根据不同的模型参数来创建不同型号的车子。

### 工厂模式
也叫多态工厂模式，它属于类创建型模式。
在工厂方法模式中，工厂父类负责定义创建产品对象的公共接口，而工厂子类则负责生成具体的产品对象， 这样做的目的是将产品类的实例化操作延迟到工厂子类中完成，即通过工厂子类来确定究竟应该实例化哪一个具体产品类。

模拟了用户购车的流程，小王和小秦分别向 BMW 730 和 BMW 840 工厂订购了 BMW730 和 BMW840 型号的车子，接着工厂按照对应的模型进行生产并在生产完成后交付给用户。

同样，我们来看一下如何使用工厂方法来描述 BMW 工厂生产指定型号车子的过程。

分别创建了 BMW730Factory 和 BMW840Factory 两个工厂类，然后使用这两个类的实例来生产不同型号的车子。

应用场景
一个类不知道它所需要的对象的类：在工厂方法模式中，客户端不需要知道具体产品类的类名，只需要知道所对应的工厂即可，具体的产品对象由具体工厂类创建；客户端需要知道创建具体产品的工厂类。
一个类通过其子类来指定创建哪个对象：在工厂方法模式中，对于抽象工厂类只需要提供一个创建产品的接口，而由其子类来确定具体要创建的对象，利用面向对象的多态性和里氏代换原则，在程序运行时，子类对象将覆盖父类对象，从而使得系统更容易扩展。
```ts
abstract class BMWFactory {
  abstract produceBMW(): BMW;
}

class BMW730Factory extends BMWFactory {
  produceBMW(): BMW {
    return new BMW730();
  }
}

class BMW840Factory extends BMWFactory {
  produceBMW(): BMW {
    return new BMW840();
  }
}

const bmw730Factory = new BMW730Factory();
const bmw840Factory = new BMW840Factory();

const bmw730 = bmw730Factory.produceBMW();
const bmw840 = bmw840Factory.produceBMW();

bmw730.run();
bmw840.run();
```

### 抽象工厂
抽象工厂模式提供一个创建一系列相关或相互依赖对象的接口，而无须指定它们具体的类。

在工厂方法模式中具体工厂负责生产具体的产品，每一个具体工厂对应一种具体产品，工厂方法也具有唯一性，一般情况下，一个具体工厂中只有一个工厂方法或者一组重载的工厂方法。但是有时候我们需要一个工厂可以提供多个产品对象，而不是单一的产品对象。

模拟了用户购车的流程，小王向 BMW 工厂订购了 BMW730，工厂按照 730 对应的模型进行生产并在生产完成后交付给小王。而小秦向同一个 BMW 工厂订购了 BMW840，工厂按照 840 对应的模型进行生产并在生产完成后交付给小秦。

下面我们来看一下如何使用抽象工厂来描述上述的购车过程。

应用场景
一个系统不应当依赖于产品类实例如何被创建、组合和表达的细节，这对于所有类型的工厂模式都是重要的。
系统中有多于一个的产品族，而每次只使用其中某一产品族。
系统提供一个产品类的库，所有的产品以同样的接口出现，从而使客户端不依赖于具体实现。

```ts
abstract class BMWFactory {
  abstract produce730BMW(): BMW730;
  abstract produce840BMW(): BMW840;
}

class ConcreteBMWFactory extends BMWFactory {
  produce730BMW(): BMW730 {
    return new BMW730();
  }

  produce840BMW(): BMW840 {
    return new BMW840();
  }
}

const bmwFactory = new ConcreteBMWFactory();

const bmw730 = bmwFactory.produce730BMW();
const bmw840 = bmwFactory.produce840BMW();

bmw730.run();
bmw840.run();
```

## A3
使用工厂函数来创建对象
使用工厂模式，我们可以使用工厂函数来创建新对象。当一个函数返回一个新对象而不使用 new 关键字时，它就是一个工厂函数！
假设我们的应用程序需要很多用户。我们可以使用 firstName、lastName 和 email 属性创建新用户。
工厂函数也为新创建的对象添加了一个 fullName 属性，它返回 firstName 和 lastName。
```js
const createUser = ({ firstName, lastName, email }) => ({
  firstName,
  lastName,
  email,
  fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
});

const user1 = createUser({
  firstName: "John",
  lastName: "Doe",
  email: "john@doe.com"
});

const user2 = createUser({
  firstName: "Jane",
  lastName: "Doe",
  email: "jane@doe.com"
});

console.log(user1);
console.log(user2);
```
如果我们要创建相对复杂和可配置的对象，工厂模式会很有用。可能会发生键和值的值取决于特定环境或配置的情况。使用工厂模式，我们可以轻松创建包含自定义键和值的新对象！
```js
const createObjectFromArray = ([key, value]) => ({
  [key]: value
});

createObjectFromArray(["name", "John"]); // { name: "John" }
```
优点:
当我们必须创建多个共享相同属性的较小对象时，工厂模式很有用。工厂函数可以根据当前环境或用户特定的配置轻松返回自定义对象。

缺点:
在 JavaScript 中，工厂模式只不过是一个不使用 new 关键字就返回对象的函数。
ES6 箭头函数允许我们创建每次隐式返回一个对象的小型工厂函数。
但是，在许多情况下，每次创建新实例而不是新对象可能更节省内存。

```js
class User {
  constructor(firstName, lastName, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }

  fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

const user1 = new User({
  firstName: "John",
  lastName: "Doe",
  email: "john@doe.com"
});

const user2 = new User({
  firstName: "Jane",
  lastName: "Doe",
  email: "jane@doe.com"
});
```

## A4
意图 在父类中提供一个创建对象的方法， 允许子类决定实例化对象的类型。

### 问题
假设你正在开发一款物流管理应用。 最初版本只能处理卡车运输， 因此大部分代码都在位于名为 卡车的类中。

一段时间后， 这款应用变得极受欢迎。 你每天都能收到十几次来自海运公司的请求， 希望应用能够支持海上物流功能。

这可是个好消息。 但是代码问题该如何处理呢？ 目前， 大部分代码都与 卡车类相关。 在程序中添加 轮船类需要修改全部代码。 更糟糕的是， 如果你以后需要在程序中支持另外一种运输方式， 很可能需要再次对这些代码进行大幅修改。

最后， 你将不得不编写繁复的代码， 根据不同的运输对象类， 在应用中进行不同的处理。

### 解决方案
工厂方法模式建议使用特殊的工厂方法代替对于对象构造函数的直接调用 （用 new运算符）。 不用担心， 对象仍将通过 new 运算符创建， 只是该运算符改在工厂方法中调用罢了。 工厂方法返回的对象通常被称作 “产品”。

乍看之下， 这种更改可能毫无意义： 我们只是改变了程序中调用构造函数的位置而已。 但是， 仔细想一下， 现在你可以在子类中重写工厂方法， 从而改变其创建产品的类型。

但有一点需要注意: 仅当这些产品具有共同的基类或者接口时， 子类才能返回不同类型的产品， 同时基类中的工厂方法还应将其返回类型声明为这一共有接口。

举例来说， ​ 卡车Truck和 轮船Ship类都必须实现 运输Transport接口， 该接口声明了一个名为 deliver交付的方法。 每个类都将以不同的方式实现该方法： 卡车走陆路交付货物， 轮船走海路交付货物。 ​ 陆路运输Road­Logistics类中的工厂方法返回卡车对象， 而 海路运输Sea­Logistics类则返回轮船对象。

调用工厂方法的代码 （通常被称为客户端代码） 无需了解不同子类返回实际对象之间的差别。 客户端将所有产品视为抽象的 运输 。 客户端知道所有运输对象都提供 交付方法， 但是并不关心其具体实现方式。


### 工厂方法模式适合应用场景
Q: 当你在编写代码的过程中， 如果无法预知对象确切类别及其依赖关系时， 可使用工厂方法。

A: 工厂方法将创建产品的代码与实际使用产品的代码分离， 从而能在不影响其他代码的情况下扩展产品创建部分代码。

例如， 如果需要向应用中添加一种新产品， 你只需要开发新的创建者子类， 然后重写其工厂方法即可。

Q: 如果你希望用户能扩展你软件库或框架的内部组件， 可使用工厂方法。

A: 继承可能是扩展软件库或框架默认行为的最简单方法。 但是当你使用子类替代标准组件时， 框架如何辨识出该子类？
解决方案是将各框架中构造组件的代码集中到单个工厂方法中， 并在继承该组件之外允许任何人对该方法进行重写。

让我们看看具体是如何实现的。 假设你使用开源 UI 框架编写自己的应用。 你希望在应用中使用圆形按钮， 但是原框架仅支持矩形按钮。 你可以使用 圆形按钮Round­Button子类来继承标准的 按钮Button类。 但是， 你需要告诉 UI框架UIFramework类使用新的子类按钮代替默认按钮。

为了实现这个功能， 你可以根据基础框架类开发子类 圆形按钮 UIUIWith­Round­Buttons ， 并且重写其 create­Button创建按钮方法。 基类中的该方法返回 按钮对象， 而你开发的子类返回 圆形按钮对象。 现在， 你就可以使用 圆形按钮 UI类代替 UI框架类。 就是这么简单！

Q: 如果你希望复用现有对象来节省系统资源， 而不是每次都重新创建对象， 可使用工厂方法。
在处理大型资源密集型对象 （比如数据库连接、 文件系统和网络资源） 时， 你会经常碰到这种资源需求。
A: 在处理大型资源密集型对象 （比如数据库连接、 文件系统和网络资源） 时， 你会经常碰到这种资源需求。
让我们思考复用现有对象的方法：
1. 首先， 你需要创建存储空间来存放所有已经创建的对象。
2. 当他人请求一个对象时， 程序将在对象池中搜索可用对象。
3. 然后将其返回给客户端代码。
4. 如果没有可用对象， 程序则创建一个新对象 （并将其添加到对象池中）。

这些代码可不少！ 而且它们必须位于同一处， 这样才能确保重复代码不会污染程序。

可能最显而易见， 也是最方便的方式， 就是将这些代码放置在我们试图重用的对象类的构造函数中。 但是从定义上来讲， 构造函数始终返回的是新对象， 其无法返回现有实例。

因此， 你需要有一个既能够创建新对象， 又可以重用现有对象的普通方法。 这听上去和工厂方法非常相像。

工厂方法模式优缺点
你可以避免创建者和具体产品之间的紧密耦合。
单一职责原则。 你可以将产品创建代码放在程序的单一位置， 从而使得代码更容易维护。
开闭原则。 无需更改现有客户端代码， 你就可以在程序中引入新的产品类型。

缺点：
应用工厂方法模式需要引入许多新的子类， 代码可能会因此变得更复杂。 最好的情况是将该模式引入创建者类的现有层次结构中。
```ts
/**
 * The Creator class declares the factory method that is supposed to return an
 * object of a Product class. The Creator's subclasses usually provide the
 * implementation of this method.
 */
abstract class Creator {
  /**
   * Note that the Creator may also provide some default implementation of the
   * factory method.
   */
  public abstract factoryMethod(): Product;

  /**
   * Also note that, despite its name, the Creator's primary responsibility is
   * not creating products. Usually, it contains some core business logic that
   * relies on Product objects, returned by the factory method. Subclasses can
   * indirectly change that business logic by overriding the factory method
   * and returning a different type of product from it.
   */
  public someOperation(): string {
    // Call the factory method to create a Product object.
    const product = this.factoryMethod();
    // Now, use the product.
    return `Creator: The same creator's code has just worked with ${product.operation()}`;
  }
}

/**
* Concrete Creators override the factory method in order to change the
* resulting product's type.
*/
class ConcreteCreator1 extends Creator {
  /**
   * Note that the signature of the method still uses the abstract product
   * type, even though the concrete product is actually returned from the
   * method. This way the Creator can stay independent of concrete product
   * classes.
   */
  public factoryMethod(): Product {
    return new ConcreteProduct1();
  }
}

class ConcreteCreator2 extends Creator {
  public factoryMethod(): Product {
    return new ConcreteProduct2();
  }
}

/**
* The Product interface declares the operations that all concrete products must
* implement.
*/
interface Product {
  operation(): string;
}

/**
* Concrete Products provide various implementations of the Product interface.
*/
class ConcreteProduct1 implements Product {
  public operation(): string {
    return '{Result of the ConcreteProduct1}';
  }
}

class ConcreteProduct2 implements Product {
  public operation(): string {
    return '{Result of the ConcreteProduct2}';
  }
}

/**
* The client code works with an instance of a concrete creator, albeit through
* its base interface. As long as the client keeps working with the creator via
* the base interface, you can pass it any creator's subclass.
*/
function clientCode(creator: Creator) {
  // ...
  console.log('Client: I\'m not aware of the creator\'s class, but it still works.');
  console.log(creator.someOperation());
  // ...
}

/**
* The Application picks a creator's type depending on the configuration or
* environment.
*/
console.log('App: Launched with the ConcreteCreator1.');
clientCode(new ConcreteCreator1());
console.log('');

console.log('App: Launched with the ConcreteCreator2.');
clientCode(new ConcreteCreator2());
```

抽象工厂模式
抽象工厂模式是一种创建型设计模式， 它能创建一系列相关的对象， 而无需指定其具体类。

### 问题
假设正在开发一款家具商店模拟器。 你的代码中包括一些类， 用于表示：
一系列相关产品， 例如 椅子Chair 、 ​ 沙发Sofa和 咖啡桌Coffee­Table 。
系列产品的不同变体。 例如， 你可以使用 现代Modern 、 ​ 维多利亚Victorian 、 ​ 装饰风艺术Art­Deco等风格生成 椅子 、 ​ 沙发和 咖啡桌 。
你需要设法单独生成每件家具对象， 这样才能确保其风格一致。 如果顾客收到的家具风格不一样， 他们可不会开心。
此外， 你也不希望在添加新产品或新风格时修改已有代码。 家具供应商对于产品目录的更新非常频繁， 你不会想在每次更新时都去修改核心代码的。

### 解决方案
首先， 抽象工厂模式建议为系列中的每件产品明确声明接口 （例如椅子、 沙发或咖啡桌）。 然后， 确保所有产品变体都继承这些接口。 例如， 所有风格的椅子都实现 椅子接口； 所有风格的咖啡桌都实现 咖啡桌接口， 以此类推。

接下来， 我们需要声明抽象工厂——包含系列中所有产品构造方法的接口。 例如 create­Chair创建椅子 、 ​ create­Sofa创建沙发和 create­Coffee­Table创建咖啡桌 。 这些方法必须返回抽象产品类型， 即我们之前抽取的那些接口： ​ 椅子 ， ​ 沙发和 咖啡桌等等。

那么该如何处理产品变体呢？ 对于系列产品的每个变体， 我们都将基于 抽象工厂接口创建不同的工厂类。 每个工厂类都只能返回特定类别的产品， 例如， ​ 现代家具工厂Modern­Furniture­Factory只能创建 现代椅子Modern­Chair 、 ​ 现代沙发Modern­Sofa和 现代咖啡桌Modern­Coffee­Table对象。

客户端代码可以通过相应的抽象接口调用工厂和产品类。 你无需修改实际客户端代码， 就能更改传递给客户端的工厂类， 也能更改客户端代码接收的产品变体。

假设客户端想要工厂创建一把椅子。 客户端无需了解工厂类， 也不用管工厂类创建出的椅子类型。 无论是现代风格， 还是维多利亚风格的椅子， 对于客户端来说没有分别， 它只需调用抽象 椅子接口就可以了。 这样一来， 客户端只需知道椅子以某种方式实现了 sit­On坐下方法就足够了。 此外， 无论工厂返回的是何种椅子变体， 它都会和由同一工厂对象创建的沙发或咖啡桌风格一致。

最后一点说明： 如果客户端仅接触抽象接口， 那么谁来创建实际的工厂对象呢？ 一般情况下， 应用程序会在初始化阶段创建具体工厂对象。 而在此之前， 应用程序必须根据配置文件或环境设定选择工厂类别。

### 抽象工厂模式适合应用场景
A: 如果代码需要与多个不同系列的相关产品交互， 但是由于无法提前获取相关信息， 或者出于对未来扩展性的考虑， 你不希望代码基于产品的具体类进行构建， 在这种情况下， 你可以使用抽象工厂。
Q: 抽象工厂为你提供了一个接口， 可用于创建每个系列产品的对象。 只要代码通过该接口创建对象， 那么你就不会生成与应用程序已生成的产品类型不一致的产品。
如果你有一个基于一组抽象方法的类， 且其主要功能因此变得不明确， 那么在这种情况下可以考虑使用抽象工厂模式。
在设计良好的程序中， 每个类仅负责一件事。 如果一个类与多种类型产品交互， 就可以考虑将工厂方法抽取到独立的工厂类或具备完整功能的抽象工厂类中。
### 实现方式

### 优缺点
你可以确保同一工厂生成的产品相互匹配。
你可以避免客户端和具体产品代码的耦合。
单一职责原则。 你可以将产品生成代码抽取到同一位置， 使得代码易于维护。
开闭原则。 向应用程序中引入新产品变体时， 你无需修改客户端代码。

由于采用该模式需要向应用中引入众多接口和类， 代码可能会比之前更加复杂。
```ts
/**
 * The Abstract Factory interface declares a set of methods that return
 * different abstract products. These products are called a family and are
 * related by a high-level theme or concept. Products of one family are usually
 * able to collaborate among themselves. A family of products may have several
 * variants, but the products of one variant are incompatible with products of
 * another.
 */
interface AbstractFactory {
  createProductA(): AbstractProductA;

  createProductB(): AbstractProductB;
}

/**
* Concrete Factories produce a family of products that belong to a single
* variant. The factory guarantees that resulting products are compatible. Note
* that signatures of the Concrete Factory's methods return an abstract product,
* while inside the method a concrete product is instantiated.
*/
class ConcreteFactory1 implements AbstractFactory {
  public createProductA(): AbstractProductA {
    return new ConcreteProductA1();
  }

  public createProductB(): AbstractProductB {
    return new ConcreteProductB1();
  }
}

/**
* Each Concrete Factory has a corresponding product variant.
*/
class ConcreteFactory2 implements AbstractFactory {
  public createProductA(): AbstractProductA {
    return new ConcreteProductA2();
  }

  public createProductB(): AbstractProductB {
    return new ConcreteProductB2();
  }
}

/**
* Each distinct product of a product family should have a base interface. All
* variants of the product must implement this interface.
*/
interface AbstractProductA {
  usefulFunctionA(): string;
}

/**
* These Concrete Products are created by corresponding Concrete Factories.
*/
class ConcreteProductA1 implements AbstractProductA {
  public usefulFunctionA(): string {
    return 'The result of the product A1.';
  }
}

class ConcreteProductA2 implements AbstractProductA {
  public usefulFunctionA(): string {
    return 'The result of the product A2.';
  }
}

/**
* Here's the the base interface of another product. All products can interact
* with each other, but proper interaction is possible only between products of
* the same concrete variant.
*/
interface AbstractProductB {
  /**
   * Product B is able to do its own thing...
   */
  usefulFunctionB(): string;

  /**
   * ...but it also can collaborate with the ProductA.
   *
   * The Abstract Factory makes sure that all products it creates are of the
   * same variant and thus, compatible.
   */
  anotherUsefulFunctionB(collaborator: AbstractProductA): string;
}

/**
* These Concrete Products are created by corresponding Concrete Factories.
*/
class ConcreteProductB1 implements AbstractProductB {

  public usefulFunctionB(): string {
    return 'The result of the product B1.';
  }

  /**
   * The variant, Product B1, is only able to work correctly with the variant,
   * Product A1. Nevertheless, it accepts any instance of AbstractProductA as
   * an argument.
   */
  public anotherUsefulFunctionB(collaborator: AbstractProductA): string {
    const result = collaborator.usefulFunctionA();
    return `The result of the B1 collaborating with the (${result})`;
  }
}

class ConcreteProductB2 implements AbstractProductB {

  public usefulFunctionB(): string {
    return 'The result of the product B2.';
  }

  /**
   * The variant, Product B2, is only able to work correctly with the variant,
   * Product A2. Nevertheless, it accepts any instance of AbstractProductA as
   * an argument.
   */
  public anotherUsefulFunctionB(collaborator: AbstractProductA): string {
    const result = collaborator.usefulFunctionA();
    return `The result of the B2 collaborating with the (${result})`;
  }
}

/**
* The client code works with factories and products only through abstract
* types: AbstractFactory and AbstractProduct. This lets you pass any factory or
* product subclass to the client code without breaking it.
*/
function clientCode(factory: AbstractFactory) {
  const productA = factory.createProductA();
  const productB = factory.createProductB();

  console.log(productB.usefulFunctionB());
  console.log(productB.anotherUsefulFunctionB(productA));
}

/**
* The client code can work with any concrete factory class.
*/
console.log('Client: Testing client code with the first factory type...');
clientCode(new ConcreteFactory1());

console.log('');

console.log('Client: Testing the same client code with the second factory type...');
clientCode(new ConcreteFactory2());
```