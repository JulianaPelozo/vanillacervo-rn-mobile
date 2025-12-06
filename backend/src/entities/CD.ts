import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class CD {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  artist!: string;

  @Column()
  year!: number;
}
