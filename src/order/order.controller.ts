import { Body, Controller, Inject, Post } from '@nestjs/common';
import {
  ClientProxy,
  Ctx,
  EventPattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { Public } from 'src/decorator';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

@Public()
@Controller('order')
export class OrderController {
  constructor(@Inject('RABBIT_SERVICE') private client: ClientProxy) {}
  count = 0;

  @Post('create')
  createOrder(@Body() body) {
    this.client.emit('', {
      body,
    });
    return {
      message: 'ok',
    };
  }

  @EventPattern('test_queue')
  async handleCreateOrderEvent(
    @Payload() data: any,
    @Ctx() context: RmqContext,
  ) {
    console.log('handleCreateOrderEvent ', data);
    this.count++;
    await sleep(5000);
    console.log('wake up ', this.count);

    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    channel.ack(originalMsg);
  }

  @EventPattern(undefined)
  handleUndefinedOrderEvent(@Payload() data: any, @Ctx() context: RmqContext) {
    console.log('undefined pattern ', data);
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    channel.ack(originalMsg);
  }
}
