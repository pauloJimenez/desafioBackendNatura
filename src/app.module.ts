import { Module } from '@nestjs/common';
import { UserAndReposModule } from './user-and-repos/user-and-repos.module';

@Module({
  imports: [UserAndReposModule],
})
export class AppModule {}
