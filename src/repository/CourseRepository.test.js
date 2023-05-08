import CourseModel from '../models/Course';
import CourseRepository from './CourseRepository';
import dbConfig from '../db/config';

describe('CourseRepository', () => {
  beforeAll(() => dbConfig.connect());

  const mockCourse = {
    name: 'Algorithm',
    date: '2022-03-04'
  };
  const models = {
    course: CourseModel
  };
  const courseRepository = new CourseRepository(models);
  describe('#fetchAll', () => {
    it('should retrieve all courses', async () => {
      const savedCourse = await courseRepository.add(mockCourse);

      const foundCourses = await courseRepository.fetchAll();

      expect(foundCourses[0].id).toBe(savedCourse.id);
      expect(foundCourses[0].name).toBe(savedCourse.name);
      expect(foundCourses[0].date).toStrictEqual(savedCourse.date);
      expect(foundCourses[0].projects).toStrictEqual(savedCourse.projects);
    });
  });
});
