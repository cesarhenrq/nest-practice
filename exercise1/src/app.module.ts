import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CostumersModule } from './costumers/costumers.module';

@Module({
  imports: [CostumersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
