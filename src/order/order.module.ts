import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import configs from 'src/configs';
import { OutBoundMessageSerializer } from 'src/common/serializer/rabbit.serializer';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RABBIT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [configs.RABITMQ_URL],
          queue: 'create_order',
          queueOptions: {
            durable: true,
          },
          serializer: new OutBoundMessageSerializer(),
        },
      },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
