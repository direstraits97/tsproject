import { Component, effect, inject, signal } from '@angular/core';
import { CourseService } from '../../services/course-service';
import { FormsModule } from '@angular/forms';
import { CoursesGet } from '../../interfaces/courses-get';

@Component({
  selector: 'app-courses',
  imports: [FormsModule],
  templateUrl: './courses.html',
  styleUrl: './courses.css',
})
export class Courses {
  private courseService = inject(CourseService);
  courses = this.courseService.getCourses();
  courseSearch: string = '';
  manipulatedCourses = signal<CoursesGet[]>([]);
  categories = signal<string[]>([]);
  categoryChoice: string = '';

  constructor() {
    effect(() => {
      this.manipulatedCourses.set(this.courses());
      this.getCategories();
    });
  }

  private sortByString(sortKey: 'courseCode' | 'courseName' | 'subject'): void {
    this.manipulatedCourses().sort((a, b) => {
      let x = a[sortKey].toLowerCase();
      let y = b[sortKey].toLowerCase();
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      } else {
        return 0;
      }
    });
  }
  sortByPoints(): void {
    this.manipulatedCourses().sort((a, b) => {
      let x = a.points;
      let y = b.points;
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  sortByCode(): void {
    this.sortByString('courseCode');
  }
  sortByName(): void {
    this.sortByString('courseName');
  }
  sortBySubject(): void {
    this.sortByString('subject');
  }
  filterBySearch(): void {
    const filteredCourses = this.courses().filter(
      (course) =>
        (course.courseName.toLowerCase().includes(this.courseSearch) &&
          course.subject.includes(this.categoryChoice)) ||
        (course.courseCode.toLowerCase().includes(this.courseSearch) &&
          course.subject.includes(this.categoryChoice)),
    );
    this.manipulatedCourses.set(filteredCourses);
  }
  getCategories() {
    this.categories.set(
      this.courses().reduce((result: string[], course) => {
        if (result.indexOf(course.subject) === -1) {
          return [...result, course.subject];
        }
        return result;
      }, []),
    );
  }
  filterByCategory(): void {
    const filteredCourses = this.courses().filter((course) =>
      course.subject.includes(this.categoryChoice),
    );
    this.manipulatedCourses.set(filteredCourses);
  }
}
