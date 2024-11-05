// src/entities/client.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('bill')
export class bill {
  @PrimaryGeneratedColumn()
  id_bill: string;

  @Column({ nullable: false })
  id_home: number;

  @Column()
  price_kw: number;

  @Column()
  emition_date: Date;
}


