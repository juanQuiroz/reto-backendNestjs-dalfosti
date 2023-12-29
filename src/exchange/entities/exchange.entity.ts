import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Exchange {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  originCurrency: string;

  @Column()
  targetCurrency: string;

  @Column('decimal', { precision: 10, scale: 2 })
  rate: number;
}
