import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('client')
export class user {
  @PrimaryGeneratedColumn()
  id_client: number;

  @Column({nullable: false})
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
