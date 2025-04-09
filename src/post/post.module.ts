import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostService } from "./post.service";
import { Posts } from "./post.entity";
import { PostController } from "./post.controller";


@Module({
    imports: [TypeOrmModule.forFeature([Posts])],
    controllers: [PostController],
    providers: [PostService],
})
export class PostModule {}