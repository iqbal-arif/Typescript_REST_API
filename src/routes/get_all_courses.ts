import { Response, Request, NextFunction } from 'express';
import { logger } from '../logger';
import { AppDataSource } from '../data_source';
import { Course } from '../models/course';

export async function getAllCourses(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    logger.debug(`Called getAllCourses()`, request['user']);
    // use the following code to trigger the error code
    // Triggers teh Default error handler
    // throw { error: 'Thrown ERROR' };

    const courses = await AppDataSource.getRepository(Course)
      .createQueryBuilder('courses')
      //   For listing of lesson
      //   .leftJoinAndSelect('courses.lessons', 'LESSONS')
      .orderBy('courses.seqNo')
      .getMany();

    response.status(200).json({ courses });
  } catch (error) {
    logger.error(`Error calling getAllCourses()`);
    return next(error);
  }
}
