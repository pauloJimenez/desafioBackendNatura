import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: 'API_GITHUB_USER',
      useValue: process.env.API_GITHUB_USER,
    },
    {
      provide: 'API_GITHUB_REPOS',
      useValue: process.env.API_GITHUB_REPOS,
    },
  ],
})
export class UserAndReposModule {}
