import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'USERS',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  passwordHash: string;

  @Column()
  passwordSalt: string; //passwordSalt is a random number used as input to calculate password hash and derive it from plaintext password.
  /********IMPORTANT NOTE****This is industry standard and safe database from attackers with two passwords are same.*/

  @Column()
  pictureUrl: string;

  @Column()
  isAdmin: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  lastUpdatedAt: Date;
}
