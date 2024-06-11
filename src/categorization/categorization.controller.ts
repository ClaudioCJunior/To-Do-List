import { CategorizationService } from "./categorization.service";
import { Controller, Get, Req } from '@nestjs/common';


@Controller('categorization')
export class CategorizationController {
  constructor(private readonly categorizationService: CategorizationService) {}

  @Get()
  findAll() {
    return this.categorizationService.findAll();
  }

}
