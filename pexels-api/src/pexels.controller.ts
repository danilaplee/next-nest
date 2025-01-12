
import { Controller, Get, Param } from '@nestjs/common';

@Controller('pexels')
export class PexelsController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
  @Get(':id')
  findOne(@Param() params: {id:string}): string {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }
  @Get(':search')
  search(@Param() params: {search:string}): string {
    console.log(params.search);
    return `This action searches #${params.search} cats`;
  }
}