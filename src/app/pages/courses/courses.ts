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

  constructor() {
    effect(() => {
      this.manipulatedCourses.set(this.courses());
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
}
