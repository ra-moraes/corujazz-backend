import { Inject, Injectable } from '@nestjs/common';
import {
  SHOW_REPOSITORY,
  type ShowRepository,
} from '../domain/interfaces/show.repository';
import { Show } from '../domain/entitites/show.domain-entity';

@Injectable()
export class ShowService {
  constructor(
    @Inject(SHOW_REPOSITORY)
    private readonly showRepo: ShowRepository,
  ) {}

  async create(name: string, baseValue: number): Promise<Show> {
    const show = new Show(name, baseValue);
    await this.showRepo.save(show);

    return show;
  }
}
