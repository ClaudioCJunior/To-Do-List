import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class AppService {
  // protected repository: Repository<T>;
  // constructor(repository: Repository<T>) {
  //   this.repository = repository;
  // }
  // async create(data: Partial<T>): Promise<T[]> {
  //   const task = this.repository.create(data);
  //   return this.repository.save(task);
  // }
  // async findOne(id: string): Promise<T | null> {
  //   return this.model.findById(id).exec();
  // }
  // async findAll(): Promise<T[]> {
  //   return this.model.find().exec();
  // }
  // async update(id: string, data: Partial<T>): Promise<T | null> {
  //   return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  // }
  // async remove(id: string): Promise<T | null> {
  //   return this.model.findByIdAndDelete(id).exec();
  // }
}
