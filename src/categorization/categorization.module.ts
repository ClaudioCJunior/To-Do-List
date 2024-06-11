import { Module } from '@nestjs/common';
import { CategorizationService } from './categorization.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categorization } from './entities/categorization.entity';
import { CategorizationController } from './categorization.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Categorization])
  ],
  controllers: [CategorizationController],
  providers: [CategorizationService],
  exports: [CategorizationService],
})
export class CategorizationModule {}
