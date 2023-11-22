import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, RouterModule } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { DemoModule } from 'app/modules/demo/demo.module';
import { HelloModule } from 'app/modules/hello/hello.module';

@Module({
  imports: [
    // Config modules
    ConfigModule.forRoot({
      expandVariables: true
    }),
    ThrottlerModule.forRoot(
      // Disable Throttling 
      // [{
      //   ttl: parseInt(process.env.DEFAULT_THROTTLE_TOTAL) || 60,
      //   limit: parseInt(process.env.DEFAULT_THROTTLE_LIMIT) || 10,
      //   ignoreUserAgents: [  // Optional: Specify User-Agents to ignore (e.g., bots)
      //     /Google Chrome/i,  // Ignore Google Chrome
      //     /Firefox/i,        // Ignore Firefox
      //     /Edg/i,           // Ignore Microsoft Edge
      //   ],
      // }]
    ),
    // Custom modules
    // MainModule,
    HelloModule,
    DemoModule,
    // Router modules
    RouterModule.register([
      {
        path: process.env.SERVER_CONTEXT ? (process.env.SERVER_CONTEXT + '/api') : 'api',
        children: [
          { path: 'hello', module: HelloModule },
          { path: 'demo', module: DemoModule },
        ]
      },
    ]),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    },
  ]
})
export class AppModule {}