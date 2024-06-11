import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categorization } from '../entities/categorization.entity';


@Injectable()
export class CategorizationSeeder {
  constructor(
    @InjectRepository(Categorization)
    private readonly categorizationRepository: Repository<Categorization>,
  ) {}

  async seed() {
    const categorizations = [
      { name: 'Home' },
      { name: 'Work' },
      { name: 'Personal' },
      { name: 'Shopping' }
    ];

    for (const categorizationData of categorizations) {
      const categorization = this.categorizationRepository.create(categorizationData);
      await this.categorizationRepository.save(categorization);
    }
  }
}