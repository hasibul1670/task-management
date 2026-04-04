import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { CategoryModule } from './category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TasksModule,
    CategoryModule
  ],
})
export class AppModule {}
