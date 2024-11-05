// src/entities/client.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('device')
export class device {
  @PrimaryGeneratedColumn()
  id_devices: number;

  @Column({ nullable: false })
  id_home: string;

  @Column()
  name: string;

  @Column()
  time_on: string;

  @Column()
  expent: string;
}
