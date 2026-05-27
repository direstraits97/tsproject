import { Injectable, signal } from '@angular/core';
import { CoursesGet } from '../interfaces/courses-get';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private savedCourses: CoursesGet[];

  constructor() {
    this.savedCourses = [];
    this.loadFromLocalStorage();
  }
  saveToLocalStorage(course: CoursesGet): void {
    const savedCoursesString: string = localStorage.getItem('savedCourses') || '[]';
    const savedCourses: CoursesGet[] = JSON.parse(savedCoursesString);

    if (
      !savedCourses.find(
        (c) => c.courseCode + c.subjectCode === course.courseCode + course.subjectCode,
      )
    ) {
      this.savedCourses.push(course);
      localStorage.setItem('savedCourses', JSON.stringify(this.savedCourses));
    }
  }
  private loadFromLocalStorage(): void {
    const savedCoursesString: string = localStorage.getItem('savedCourses') || '[]';
    const savedCourses: CoursesGet[] = JSON.parse(savedCoursesString);
    this.savedCourses = savedCourses;
  }
  getSavedCourses(): CoursesGet[] {
    return this.savedCourses;
  }
  deleteFromLocalStorage(course: CoursesGet): void {
    this.savedCourses.splice(this.savedCourses.indexOf(course), 1);
    localStorage.setItem('savedCourses', JSON.stringify(this.savedCourses));
  }
}
