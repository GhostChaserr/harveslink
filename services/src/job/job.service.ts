import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Job } from '../entities/job.entity';

@Injectable()
export class JobService {
  private logger: Logger = new Logger(JobService.name);
  constructor(
    @InjectRepository(Job)
    private jobRepository: Repository<Job>
  ) {}

  async delete(id: string) {
    return this.jobRepository.delete(id);
  }

  async readJob(jsonPayloadKey: string, value: string) {
    this.logger.warn('LOADING JOB:', jsonPayloadKey, value);
    const queryBuilder = this.jobRepository.createQueryBuilder('job');
    return queryBuilder
      .andWhere(`payload->>'${jsonPayloadKey}'=:value`, {
        value: value,
      })
      .getOne();
  }
}
