## A1
职责链模式是使多个对象都有机会处理请求，从而避免请求的发送者和接受者之间的耦合关系。在职责链模式里，很多对象由每一个对象对其下家的引用而连接起来形成一条链。请求在这个链上传递，直到链上的某一个对象决定处理此请求。


在公司中不同的岗位拥有不同的职责与权限。以上述的请假流程为例，当阿宝哥请 1 天假时，只要组长审批就可以了，不需要流转到主管和总监。如果职责链上的某个环节无法处理当前的请求，若含有下个环节，则会把请求转交给下个环节来处理。

在日常的软件开发过程中，对于职责链来说，一种常见的应用场景是中间件，下面我们来看一下如何利用职责链来处理请求。

```ts
interface IHandler {
  addMiddleware(h: IHandler): IHandler;
  get(url: string, callback: (data: any) => void): void;
}

abstract class AbstractHandler implements IHandler {
  next!: IHandler;
  addMiddleware(h: IHandler) {
    this.next = h;
    return this.next;
  }

  get(url: string, callback: (data: any) => void) {
    if (this.next) {
      return this.next.get(url, callback);
    }
  }
}

// 定义Auth中间件
class Auth extends AbstractHandler {
  isAuthenticated: boolean;
  constructor(username: string, password: string) {
    super();

    this.isAuthenticated = false;
    if (username === 'abao' && password === '123') {
      this.isAuthenticated = true;
    }
  }

  get(url: string, callback: (data: any) => void) {
    if (this.isAuthenticated) {
      return super.get(url, callback);
    } else {
      throw new Error('Not Authorized');
    }
  }
}

// 定义Logger中间件
class Logger extends AbstractHandler {
  get(url: string, callback: (data: any) => void) {
    console.log('/GET Request to: ', url);
    return super.get(url, callback);
  }
}

class Route extends AbstractHandler {
  URLMaps: {[key: string]: any};
  constructor() {
    super();
    this.URLMaps = {
      '/api/todos': [{ title: 'learn ts' }, { title: 'learn react' }],
      '/api/random': Math.random(),
    };
  }

  get(url: string, callback: (data: any) => void) {
    super.get(url, callback);

    if (this.URLMaps.hasOwnProperty(url)) {
      callback(this.URLMaps[url]);
    }
  }
}

const route = new Route();
route.addMiddleware(new Auth('abao', '123')).addMiddleware(new Logger());

route.get('/api/todos', data => {
  console.log(JSON.stringify({ data }, null, 2));
});

route.get('/api/random', data => {
  console.log(data);
});
```

可处理一个请求的对象集合应被动态指定。
想在不明确指定接收者的情况下，向多个对象中的一个提交一个请求。
有多个对象可以处理一个请求，哪个对象处理该请求运行时自动确定，客户端只需要把请求提交到链上即可。