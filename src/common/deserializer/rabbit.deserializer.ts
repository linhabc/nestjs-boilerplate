import { ConsumerDeserializer } from '@nestjs/microservices';

export class InBoundMesageDeserializer implements ConsumerDeserializer {
  deserialize(value: any) {
    console.log('InBoundMesageDeserializer ', value);

    const { pattern } = value;
    if (pattern) return value;
    console.log('first');
    return {
      pattern: undefined,
      data: { message: value },
    };
  }
}
