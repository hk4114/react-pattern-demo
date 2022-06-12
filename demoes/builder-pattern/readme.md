## A1
建造者模式（Builder Pattern）将一个复杂对象分解成多个相对简单的部分，然后根据不同需要分别创建它们，最后构建成该复杂对象。

一辆小汽车通常由 发动机、底盘、车身和电气设备 四大部分组成。汽车电气设备的内部构造很复杂，简单起见，我们只考虑三个部分：引擎、底盘和车身。

在现实生活中，小汽车也是由不同的零部件组装而成，比如上图中我们把小汽车分成引擎、底盘和车身三大部分。下面我们来看一下如何使用建造者模式来造车子。

```ts
class Car {
  constructor(
    public engine: string,
    public chassis: string, 
    public body: string
  ) {}
}

class CarBuilder {
  engine!: string; // 引擎
  chassis!: string; // 底盘
  body!: string; // 车身

  addChassis(chassis: string) {
    this.chassis = chassis;
    return this;
  }

  addEngine(engine: string) {
    this.engine = engine;
    return this;
  }

  addBody(body: string) {
    this.body = body;
    return this;
  }

  build() {
    return new Car(this.engine, this.chassis, this.body);
  }
}
const car = new CarBuilder()
  .addEngine('v12')
  .addBody('镁合金')
  .addChassis('复合材料')
  .build();
```
在以上代码中，我们定义一个 CarBuilder 类，并提供了 addChassis、addEngine 和 addBody 3 个方法用于组装车子的不同部位，当车子的 3 个部分都组装完成后，调用 build 方法就可以开始造车。

应用场景及案例
需要生成的产品对象有复杂的内部结构，这些产品对象通常包含多个成员属性。
需要生成的产品对象的属性相互依赖，需要指定其生成顺序。
隔离复杂对象的创建和使用，并使得相同的创建过程可以创建不同的产品。