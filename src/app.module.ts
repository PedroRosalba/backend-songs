import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { SongsModule } from './songs/songs.module';
import { SongsService } from './songs/songs.service';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { DevConfigService } from './common/providers/DevConfigService';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const devConfig = {port : 3000};
const proConfig = {port: 400};

@Module({
  imports: [SongsModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: DevConfigService,
    useClass: DevConfigService,
  },
    {
      provide: 'CONFIG',
      useFactory: () => {
        return process.env.NODE_ENV === 'development'? devConfig: proConfig;
      },
    },
  ],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({path: 'songs', method: RequestMethod.POST});
  }
}
