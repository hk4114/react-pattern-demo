中介者模式
使用中介者对象来处理组件之间的通信

## A1
中介者模式使组件可以通过一个中心点相互交互：中介者。中介者不是直接相互交谈，而是接收请求，并将它们转发！在 JavaScript 中，中介通常只是一个对象字面量或一个函数。

您可以将此模式与空中交通管制员和飞行员之间的关系进行比较。飞行员没有直接互相交谈，这可能最终会变得非常混乱，而是飞行员与空中交通管制员交谈。空中交通管制员确保所有飞机都接收到安全飞行所需的信息，而不会撞到其他飞机。

尽管我们希望不在 JavaScript 中控制飞机，但我们经常不得不处理对象之间的多向数据。如果有大量组件，组件之间的通信会变得相当混乱。

不是让每个对象直接与其他对象对话，从而产生多对多关系，而是由中介处理对象的请求。中介处理此请求，并将其发送到需要的位置。

中介者模式的一个很好的用例是聊天室！聊天室内的用户不会直接相互交谈。相反，聊天室充当用户之间的中介。

我们可以创建连接到聊天室的新用户。每个用户实例都有一个发送方法，我们可以使用它来发送消息。
```js
class ChatRoom {
  logMessage(user, message) {
    const sender = user.getName();
    console.log(`${new Date().toLocaleString()} [${sender}]: ${message}`);
  }
}

class User {
  constructor(name, chatroom) {
    this.name = name;
    this.chatroom = chatroom;
  }

  getName() {
    return this.name;
  }

  send(message) {
    this.chatroom.logMessage(this, message);
  }
}

const chatroom = new ChatRoom();

const user1 = new User("John Doe", chatroom);
const user2 = new User("Jane Doe", chatroom);

user1.send("Hi there!");
user2.send("Hey!");
```

```js
// data.js
module.exports = `
<html>
  <head>
    <style>
    html, body {
      margin: 0;
    }
    div {
      height: 100vh;
      width: 100vw;
      background-color: #171717;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: Arial;
    }</style>
  </head>
  <body>
    <div>
      Check the console!
    </div>
  </body>
</html>`;

// inde.js
const app = require("express")();
const html = require("./data");

app.use(
  "/",
  (req, res, next) => {
    req.headers["test-header"] = 1234;
    next();
  },
  (req, res, next) => {
    console.log(`Request has test header: ${!!req.headers["test-header"]}`);
    next();
  }
);

app.get("/", (req, res) => {
  res.set("Content-Type", "text/html");
  res.send(Buffer.from(html));
});

app.listen(8080, function() {
  console.log("Server is running on 8080");
});


```

中间件模式让我们可以轻松地简化对象之间的多对多关系，让所有通信都流经一个中心点