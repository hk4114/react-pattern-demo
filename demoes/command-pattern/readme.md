命令模式

## A1
通过向 command 发送命令来解耦执行任务的方法。
假设我们有一个在线食品配送平台。用户可以下达、跟踪和取消订单。
在 OrderManager 类上，我们可以访问 placeOrder、trackOrder 和 cancelOrder 方法。直接使用这些方法将是完全有效的
```js
class OrderManager() {
  constructor() {
    this.orders = []
  }

  placeOrder(order, id) {
    this.orders.push(id)
    return `You have successfully ordered ${order} (${id})`;
  }

  trackOrder(id) {
    return `Your order ${id} will arrive in 20 minutes.`
  }

  cancelOrder(id) {
    this.orders = this.orders.filter(order => order.id !== id)
    return `You have canceled your order ${id}`
  }
}
const manager = new OrderManager();

manager.placeOrder("Pad Thai", "1234");
manager.trackOrder("1234");
manager.cancelOrder("1234");
```
但是，直接在管理器实例上调用方法也有缺点。我们可能决定稍后重命名某些方法，或者方法的功能发生变化。
假设我们现在将其重命名为 addOrder，而不是称之为 placeOrder！这意味着我们必须确保不在代码库中的任何地方调用 placeOrder 方法，这在大型应用程序中可能非常棘手。
相反，我们希望将方法与管理器对象分离，并为每个命令创建单独的命令函数！
让我们重构 OrderManager 类：不再有 placeOrder、cancelOrder 和 trackOrder 方法，而是只有一个方法：execute。此方法将执行它给出的任何命令。
每个命令都应该可以访问管理器的命令，我们将把它作为它的第一个参数传递。
```js
class OrderManager {
  constructor() {
    this.orders = [];
  }

  execute(command, ...args) {
    return command.execute(this.orders, ...args);
  }
}

class Command {
  constructor(execute) {
    this.execute = execute;
  }
}

function PlaceOrderCommand(order, id) {
  return new Command(orders => {
    orders.push(id);
    console.log(`You have successfully ordered ${order} (${id})`);
  });
}

function CancelOrderCommand(id) {
  return new Command(orders => {
    orders = orders.filter(order => order.id !== id);
    console.log(`You have canceled your order ${id}`);
  });
}

function TrackOrderCommand(id) {
  return new Command(() =>
    console.log(`Your order ${id} will arrive in 20 minutes.`)
  );
}

const manager = new OrderManager();

manager.execute(new PlaceOrderCommand("Pad Thai", "1234"));
manager.execute(new TrackOrderCommand("1234"));
manager.execute(new CancelOrderCommand("1234"));
```
优点：
命令模式允许我们将方法与执行操作的对象分离。如果您正在处理具有特定生命周期的命令，或者应该在特定时间排队和执行的命令，它会给您更多的控制权。

缺点：
命令模式的用例非常有限，并且经常向应用程序添加不必要的样板。

## A2

## A3
