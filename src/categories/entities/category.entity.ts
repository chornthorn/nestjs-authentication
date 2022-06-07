import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tbl_categories' })
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;
}
