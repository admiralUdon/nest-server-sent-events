import { Controller, Get, Logger, Request, Response } from '@nestjs/common';
import { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { interval, map } from 'rxjs';

@Controller()
export class DemoController {

    private readonly logger = new Logger(DemoController.name);
    
    @Get()
    sse(@Request() request, @Response() response): void 
    {
        response.setHeader('Content-Type', 'text/event-stream');
        response.setHeader('Cache-Control', 'no-cache');
        response.setHeader('Connection', 'keep-alive');
        response.flushHeaders();

        const interval$ = interval(1000);

        const sseData = {
            data: 'Server-Sent Event message',
        };

        const subscription = interval$.pipe(
            map(() => `data: ${JSON.stringify(sseData)}\n\n`)
        ).subscribe(
            (sseEvent) => response.write(sseEvent),
            (error) => console.error(error),
                () => {
                    response.end();
                }
        );

        request.on('close', () => {
            subscription.unsubscribe();
        });
    }
}
