import { Controller, Post } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @Post()
  async createPost() {
    return this.postService.createPost({
      title: 'How to be Bob',
      categories: {
        create: [
          {
            assignedBy: 'Bob',
            assignedAt: new Date(),
            category: {
              create: {
                name: 'New category',
              },
            },
          },
        ],
      },
    });
  }
}
