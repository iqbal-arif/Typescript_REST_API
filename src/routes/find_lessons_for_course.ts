import { NextFunction, Request, Response } from 'express';
import { logger } from '../logger';
import { isInteger } from '../utils';
import { AppDataSource } from '../data_source';
import { Lesson } from '../models/lesson';

export async function findLessonsForCourse(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    logger.debug(`Called findLessonsForCourse()`);

    const courseId = request.params.courseId,
      query = request.query as any, //type any , so any parameter can be deduced
      pageNumber = query?.pageNumber ?? '0', // default page number is 0
      pageSize = query?.pageSize ?? '3'; // default page size is 3

    if (!isInteger(courseId)) {
      throw `Invalid course id ${courseId}`;
    }

    if (!isInteger(pageNumber)) {
      throw `Invalid pageNumber ${pageNumber}`;
    }

    if (!isInteger(pageSize)) {
      throw `Invalid pageSize ${pageSize}`;
    }
    // Find a Page of Lessons for a given Course
    const lessons = await AppDataSource.getRepository(Lesson)
      .createQueryBuilder('lessons')
      .where('lessons.courseId = :courseId', { courseId }) //joining the lessons table with the courses table
      .orderBy('lessons.seqNo')
      .skip(pageNumber * pageSize)
      .take(pageSize)
      .getMany();

    response.status(200).json({ lessons });
  } catch (error) {
    logger.error(`Error calling findLessonsForCourse()`);
    return next(error);
  }
}
