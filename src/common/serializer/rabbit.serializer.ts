import { Serializer } from '@nestjs/microservices';

export class OutBoundMessageSerializer implements Serializer {
  serialize(value: any) {
    return value.data;
  }
}
