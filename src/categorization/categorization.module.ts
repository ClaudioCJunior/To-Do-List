import { Module } from '@nestjs/common';
import { CategorizationService } from './categorization.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categorization } from './entities/categorization.entity';
import { CategorizationController } from './categorization.controller';
import { CategorizationSeeder } from './seeds/categorization.seed';

@Module({
  imports: [
    TypeOrmModule.forFeature([Categorization])
  ],
  controllers: [CategorizationController],
  providers: [CategorizationService, CategorizationSeeder],
  exports: [CategorizationService, CategorizationSeeder],
})
export class CategorizationModule {}
