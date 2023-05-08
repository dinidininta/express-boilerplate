import request from 'supertest';
import app from '../app';

describe('CourseController', () => {
  describe('CourseController', () => {
    const mockCourse = {
      name: 'Algorithm',
      date: '2022-03-04'
    };
    const { courseRepository } = app.locals.repositories;

    describe('GET /courses', () => {
      it('should retrieve all courses', async () => {
        await courseRepository.add(mockCourse);
        const courses = await courseRepository.fetchAll();
        const expectedResult = {
          data: JSON.parse(JSON.stringify(courses))
        };

        const { body } = await request(app).get('/api/courses/').expect(200);

        expect(body).toEqual(expectedResult);
      });
    });
  });
});
