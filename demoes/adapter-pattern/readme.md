在实际生活中，也存在适配器的使用场景，比如：港式插头转换器、电源适配器和 USB 转接口。而在软件工程中，适配器模式的作用是解决两个软件实体间的接口不兼容的问题。使用适配器模式之后，原本由于接口不兼容而不能工作的两个软件实体就可以一起工作。

在以上代码中，因为 Logger 和 CloudLogger 这两个接口不匹配，所以我们引入了 CloudLoggerAdapter 适配器来解决兼容性问题。

应用场景及案例
以前开发的系统存在满足新系统功能需求的类，但其接口同新系统的接口不一致。
使用第三方提供的组件，但组件接口定义和自己要求的接口定义不同。
```ts
interface Logger {
  info(message: string): Promise<void>;
}

interface CloudLogger {
  sendToServer(message: string, type: string): Promise<void>;
}

class AliLogger implements CloudLogger {
  public async sendToServer(message: string, type: string): Promise<void> {
    console.info(message);
    console.info('This Message was saved with AliLogger');
  }
}

class CloudLoggerAdapter implements Logger {
  protected cloudLogger: CloudLogger;

  constructor (cloudLogger: CloudLogger) {
    this.cloudLogger = cloudLogger;
  }

  public async info(message: string): Promise<void> {
    await this.cloudLogger.sendToServer(message, 'info');
  }
}

class NotificationService {
  protected logger: Logger;
  
  constructor (logger: Logger) {    
    this.logger = logger;
  }

  public async send(message: string): Promise<void> {
    await this.logger.info(`Notification sended: ${message}`);
  }
}

(async () => {
  const aliLogger = new AliLogger();
  const cloudLoggerAdapter = new CloudLoggerAdapter(aliLogger);
  const notificationService = new NotificationService(cloudLoggerAdapter);
  await notificationService.send('Hello semlinker, To Cloud');
})();
```