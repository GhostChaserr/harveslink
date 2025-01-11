import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('graphile_worker._private_jobs')
export class Job {
  @PrimaryColumn()
  id!: string;
  @Column({ type: 'json' })
  payload: Record<string, string>;
  @Column()
  run_at?: Date;
}
