import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/db/database.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { USER_REPOSITORY } from './domain/interfaces/user.repository';
import { UserRepositoryImpl } from 'src/user/infra/db/repositories/user.repository-impl';
import { User } from './infra/db/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([User]),
    DatabaseModule,
  ],
  providers: [
    UserService,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepositoryImpl,
    },
  ],
  controllers: [UserController],
  exports: [TypeOrmModule, UserService, USER_REPOSITORY],
})
export class UserModule {}
