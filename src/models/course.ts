import { Entity } from 'typeorm';
//ENTITY Decorator from TypeORM will instruct class Course
@Entity({
  name: 'COURSES',
})
// Plain Typescript Class Model for Class
export class Course {
  id: number;
  seqNo: number;
  title: string;
  iconUrl: string;
  longDescription: string;
  category: string;
}
