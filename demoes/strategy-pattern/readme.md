## A1
定义了一系列的算法，把它们一个个封装起来，并且使它们可以互相替换。策略模式的重心不是如何实现算法，而是如何组织、调用这些算法，从而让程序结构更灵活、可维护、可扩展。

目前在一些主流的 Web 站点中，都提供了多种不同的登录方式。比如账号密码登录、手机验证码登录和第三方登录。为了方便维护不同的登录方式，我们可以把不同的登录方式封装成不同的登录策略。

下面我们来看一下如何使用策略模式来封装不同的登录方式。

```ts
interface Strategy {
  authenticate(...args: any): any;
}

class Authenticator {
  strategy: any;
  constructor() {
    this.strategy = null;
  }

  setStrategy(strategy: any) {
    this.strategy = strategy;
  }

  authenticate(...args: any) {
    if (!this.strategy) {
      console.log('尚未设置认证策略');
      return;
    }
    return this.strategy.authenticate(...args);
  }
}

class WechatStrategy implements Strategy {
  authenticate(wechatToken: string) {
    if (wechatToken !== '123') {
      console.log('无效的微信用户');
      return;
    }
    console.log('微信认证成功');
  }
}

class LocalStrategy implements Strategy {
  authenticate(username: string, password: string) {
    if (username !== 'abao' && password !== '123') {
      console.log('账号或密码错误');
      return;
    }
    console.log('账号和密码认证成功');
  }
}

const auth = new Authenticator();

auth.setStrategy(new WechatStrategy());
auth.authenticate('123456');

auth.setStrategy(new LocalStrategy());
auth.authenticate('abao', '123');
```
应用场景及案例
一个系统需要动态地在几种算法中选择一种时，可将每个算法封装到策略类中。
多个类只区别在表现行为不同，可以使用策略模式，在运行时动态选择具体要执行的行为。
一个类定义了多种行为，并且这些行为在这个类的操作中以多个条件语句的形式出现，可将每个条件分支移入它们各自的策略类中以代替这些条件语句。