import { Test, TestingModule } from '@nestjs/testing';
import { CategorizationController } from './categorization.controller';
import { CategorizationService } from './categorization.service';

describe('TaskController', () => {
  let controller: CategorizationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategorizationController],
      providers: [CategorizationService],
    }).compile();

    controller = module.get<CategorizationController>(CategorizationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
