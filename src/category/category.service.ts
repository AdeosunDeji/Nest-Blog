import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { isEmpty } from 'src/util';

@Injectable()
export class CategoryService {
  constructor(private prismaService: PrismaService) { }
  create(createCategoryDto: CreateCategoryDto) {
    return this.prismaService.category.create({ data: createCategoryDto })
  }

  findAll(query?: Prisma.CategoryInclude) {
    return this.prismaService.category.findMany({ include: query })
  }

  findOne(id: string) {
    return this.prismaService.category.findUnique({ where: { id } })
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.prismaService.category.update({ data: updateCategoryDto, where: { id } })
  }

  remove(id: string) {
    return this.prismaService.category.delete({ where: { id } })
  }
}
