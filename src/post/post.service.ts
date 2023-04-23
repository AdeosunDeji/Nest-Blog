import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(private prismaService: PrismaService) { }
  create(createPostDto: Prisma.PostCreateInput) {
    return this.prismaService.post.create({ data: createPostDto })
  }

  findAll(query?: Prisma.PostInclude) {
    return this.prismaService.post.findMany({ include: query })
  }

  findOne(id: string) {
    return this.prismaService.post.findUnique({ where: { id } })
  }

  update(id: string, updatePostDto: Prisma.PostUpdateInput) {
    return this.prismaService.post.update({ data: updatePostDto, where: { id } })
  }

  remove(id: string) {
    return this.prismaService.post.delete({ where: { id } })
  }
}

