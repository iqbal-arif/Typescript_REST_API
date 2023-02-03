import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Lesson } from './lesson';
//ENTITY Decorator from TypeORM will instruct class Course
@Entity({
  name: 'COURSES',
})
// Plain Typescript Class Model for Class
export class Course {
  // TypeORM is going to assign ID automatically if not assigned
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  seqNo: number;
  @Column()
  url: string;
  @Column()
  title: string;
  @Column()
  iconUrl: string;
  @Column()
  longDescription: string;
  @Column()
  category: string;

  @OneToMany(() => Lesson, (lesson) => lesson.course)
  lessons: Lesson[];

  //   Decorator to assure timestamp.
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  lastUpdatedAt: Date;
}
