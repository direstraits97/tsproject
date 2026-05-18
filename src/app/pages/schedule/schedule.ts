import { Component, inject, signal } from '@angular/core';
import { ScheduleService } from '../../services/schedule-service';
import { CoursesGet } from '../../interfaces/courses-get';

@Component({
  selector: 'app-schedule',
  imports: [],
  templateUrl: './schedule.html',
  styleUrl: './schedule.css',
})
export class Schedule {
  saveCoursesService = inject(ScheduleService);
  totalPoints = signal<number>(0);

  constructor() {
    this.calculatePoints();
  }

  calculatePoints() {
    this.totalPoints.set(0);
    this.saveCoursesService.getSavedCourses().forEach((course) => {
      this.totalPoints.update((value) => value + course.points);
    });
  }
  removeFromLocalStorage(course: CoursesGet) {
    this.saveCoursesService.deleteFromLocalStorage(course);
    this.calculatePoints();
  }
}
