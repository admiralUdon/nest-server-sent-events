import { Module } from '@nestjs/common';
import { DemoController } from 'app/modules/demo/demo.controller';

@Module({
    imports: [],
    controllers: [DemoController],
})
export class DemoModule {}