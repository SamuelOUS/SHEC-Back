// }// src/entities/client.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('home')
export class home {
  @PrimaryGeneratedColumn()
  id_home: number;

  @Column({ nullable: false })
  id_client: string;

  @Column()
  stratum: string;

  @Column()
  address: string;

}
