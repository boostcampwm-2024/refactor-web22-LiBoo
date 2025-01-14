import { Injectable } from '@nestjs/common';
import { User } from './user.dto';
import { getRandomAdjective, getRandomBrightColor, getRandomNoun } from '../utils/random';

@Injectable()
export class UserFactory {
  private createRandomNickname(): string {
    return `${getRandomAdjective()} ${getRandomNoun()}`;
  }

  createUserInstance(address: string, userAgent: string): User {
    return new User(
      address,
      userAgent,
      new Date().toISOString(), // entryTime
      this.createRandomNickname(), // nickname
      getRandomBrightColor(), // nickname color
    );
  }
}
