模板方法模式由两部分结构组成：抽象父类和具体的实现子类。通常在抽象父类中封装了子类的算法框架，也包括实现一些公共方法以及封装子类中所有方法的执行顺序。子类通过继承这个抽象类，也继承了整个算法结构，并且可以选择重写父类的方法。

虽然解析的是不同的类型的文件，但文件的处理流程是一样的。这里主要包含读取文件、解析文件和打印数据三个步骤。针对这个场景，我们就可以引入模板方法来封装以上三个步骤的处理顺序。

下面我们来看一下如何使用模板方法来实现上述的解析流程。

```js
import fs from 'fs';

abstract class DataParser {
  data: string = '';
  out: any = null;

  // 这就是所谓的模板方法
  parse(pathUrl: string) {
    this.readFile(pathUrl);
    this.doParsing();
    this.printData();
  }

  readFile(pathUrl: string) {
    this.data = fs.readFileSync(pathUrl, 'utf8');
  }

  abstract doParsing(): void;
  
  printData() {
    console.log(this.out);
  }
}

class CSVParser extends DataParser {
  doParsing() {
    this.out = this.data.split(',');
  }
}

class MarkupParser extends DataParser {
  doParsing() {
    this.out = this.data.match(/<\w+>.*<\/\w+>/gim);
  }
}

const csvPath = './data.csv';
const mdPath = './design-pattern.md';

new CSVParser().parse(csvPath);
new MarkupParser().parse(mdPath);
```
算法的整体步骤很固定，但其中个别部分易变时，这时候可以使用模板方法模式，将容易变的部分抽象出来，供子类实现。
当需要控制子类的扩展时，模板方法只在特定点调用钩子操作，这样就只允许在这些点进行扩展。
