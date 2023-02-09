/************IMPORTS ENVIRONMENT DOTENV MODULE*/
import * as dotenv from 'dotenv';
//Loads .env file contents into process.env.
const result = dotenv.config();

// For TypeORM library needed for
import 'reflect-metadata'; //for decorator internal usage for data model classes

import { COURSES, USERS } from './db_data';
import { AppDataSource } from '../data_source';
import { Course } from './course';
//DeepPartial: Same as Partial but goes deeper and makes Partial all its properties and sub-properties.
import { DeepPartial } from 'typeorm';
import { Lesson } from './lesson';

import { User } from './users';
// import { calculatePasswordHash } from '../utils';

async function populateDb() {
  await AppDataSource.initialize();

  console.log(`Database connection ready.`);
  //grabbing object values which is not an array

  const courses = Object.values(COURSES) as DeepPartial<Course>[];
  // Course Repository are used to interact with database using the data mapper pattern
  //   Such as perform operations like,
  // courseRepository.create();
  // courseRepository.clear();
  // courseRepository.insert();
  // courseRepository.delete();
  // courseRepository.save();
  const courseRepository = AppDataSource.getRepository(Course);

  const lessonsRepository = AppDataSource.getRepository(Lesson);

  for (let courseData of courses) {
    console.log(`Inserting course ${courseData.title}`);
    const course = courseRepository.create(courseData);
    await courseRepository.save(course);

    for (let lessonData of courseData.lessons) {
      console.log(`Inserting lesson ${lessonData.title}`);

      const lesson = lessonsRepository.create(lessonData);

      lesson.course = course;

      await lessonsRepository.save(lesson);
    }
  }

  const users = Object.values(USERS) as any[];

  for (let userData of users) {
    console.log(`Inserting user: ${userData}`);

    const { email, pictureUrl, isAdmin, passwordSalt, plainTextPassword } =
      userData;

    const user = AppDataSource.getRepository(User).create({
      email,
      pictureUrl,
      isAdmin,
      passwordSalt,
      /*  passwordHash: await calculatePasswordHash(
        plainTextPassword,
        passwordSalt
      ),*/
    });

    await AppDataSource.manager.save(user);
  }

  const totalCourses = await courseRepository.createQueryBuilder().getCount();

  const totalLessons = await lessonsRepository.createQueryBuilder().getCount();

  console.log(
    ` Data Inserted - courses ${totalCourses}, lessons ${totalLessons}`
  );
}

populateDb()
  .then(() => {
    console.log(`Finished populating database, exiting!`);
    process.exit(0);
  })
  .catch((err) => {
    console.error(`Error populating database.`, err);
  });
