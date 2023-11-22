import { Controller, Get, Logger, Request } from '@nestjs/common';
import { Request as ExpressRequest, Response as ExpressResponse } from 'express';

@Controller()
export class HelloController {

    private readonly logger = new Logger(HelloController.name);
    
    @Get()
    getHello(@Request() request: ExpressRequest) {
        return {
            message: "hello world"
        }
    }
}
