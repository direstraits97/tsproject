/**
 * Injectar schedule-service och använder dess funktioner samt beräknar och uppdaterar det totala värdet av kurspoäng sparade i localStorage.
 * Av: Josefine Backlund
 */

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
  saveCoursesService = inject(ScheduleService); //Injectar service-filen som manipulerar localStorage.
  totalPoints = signal<number>(0); //Behållare för totalt antal poäng.

  constructor() {
    this.calculatePoints();
  }

  calculatePoints() {
    this.totalPoints.set(0); //Nollställning för radering.
    /* Loopar igenom arrayen med sparade kurser där totalPoints uppdateras med kurspoäng. */
    this.saveCoursesService.getSavedCourses().forEach((course) => {
      this.totalPoints.update((value) => value + course.points);
    });
  }
  removeFromLocalStorage(course: CoursesGet) {
    this.saveCoursesService.deleteFromLocalStorage(course); //Funktion från service.
    this.calculatePoints(); //Kör denna funktion igen för att uppdatera värdet.
  }
}
