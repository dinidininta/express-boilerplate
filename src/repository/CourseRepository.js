/*
  Course repository
 */
class CourseRepository {
  #course;

  constructor(models) {
    this.#course = models.course;
  }

  fetchAll() {
    return this.#course.find();
  }

  add(course) {
    return this.#course.create(course);
  }
}

export default CourseRepository;
