import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Me } from '../auth/guards/me.guard';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { PostQueryDto } from './dto/query.dto';
import { isEmpty } from 'src/util';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Post()
  @UseGuards(JwtGuard)
  create(@Me() { id, email }, @Body() createPostDto: CreatePostDto) {
    const categories = createPostDto.categories?.map(category => ({ id: category }))
    return this.postService.create({ ...createPostDto, author: { connect: { id } }, categories: { connect: categories } });
  }

  @Get()
  findAll(@Query() query: PostQueryDto) {
    return this.postService.findAll(isEmpty(query) ? null : query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    const categories = updatePostDto.categories?.map(category => ({ id: category }))
    return this.postService.update(id, { ...updatePostDto, categories: { set: categories } });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(id);
  }
}
