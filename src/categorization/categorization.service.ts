import { Injectable } from '@nestjs/common';
import { Categorization } from './entities/categorization.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';

@Injectable()
export class CategorizationService {
  constructor(  
    @InjectRepository(Categorization)
    private categorizationRepository: Repository<Categorization>,
  ) {}

  findAll(): Promise<Categorization[]> {
    return this.categorizationRepository.find();
  }

  async findAllByIds(ids: number[]): Promise<Categorization[]> {
    return await this.categorizationRepository.findBy({
      id: In(ids),
    });
  }

}
