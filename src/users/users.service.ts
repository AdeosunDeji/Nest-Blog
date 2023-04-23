import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) { }
  create(createUserDto: CreateUserDto) {
    return this.prismaService.user.create({ data: createUserDto })
  }

  findAll(query?: Prisma.UserInclude) {
    return this.prismaService.user.findMany({ include: query })
  }

  findOneByEmail(email: string) {
    return this.prismaService.user.findUnique({ where: { email } })
  }

  findOne(id: string) {
    return this.prismaService.user.findUnique({ where: { id } })
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prismaService.user.update({ data: updateUserDto, where: { id } })
  }

  remove(id: string) {
    return this.prismaService.user.delete({ where: { id } })
  }
}
