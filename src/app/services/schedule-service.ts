/**
 * Manipulering av localStorage samlat i en service-fil.
 * Av: Josefine Backlund
 */

import { Injectable } from '@angular/core';
import { CoursesGet } from '../interfaces/courses-get';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private savedCourses: CoursesGet[]; //Array där sparade kurser ska hamna med struktur från Interface.

  constructor() {
    this.savedCourses = []; //Initialiserar array.
    this.loadFromLocalStorage(); //Laddar sparat innehåll.
  }
  /* Denna funktion hämtar innehåll om det finns och omvandlar till objekt. Sedan görs en kontroll om kurskod + ämneskod redan finns.
  Finns den inte så pushas kursen till arrayen och omvandlas till sträng för att sparas i localStorage. */
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
  /* Denna funktion hämtas innehåll från localStorage om det finns, och omvandlar dessa till objekt för att sedan lägga in denna objekt i arrayen i konstruktorn. */
  private loadFromLocalStorage(): void {
    const savedCoursesString: string = localStorage.getItem('savedCourses') || '[]';
    const savedCourses: CoursesGet[] = JSON.parse(savedCoursesString);
    this.savedCourses = savedCourses;
  }
  /* Denna funktion kommer att användas för att hämta det som finns i arrayen för att skriva ut i gränssnittet. */
  getSavedCourses(): CoursesGet[] {
    return this.savedCourses;
  }
  /* Denna funktion tar index på den kurs som ska raderas för att använda slice för radering. Innehållet sparas sedan om för uppdatering av värden. */
  deleteFromLocalStorage(course: CoursesGet): void {
    this.savedCourses.splice(this.savedCourses.indexOf(course), 1);
    localStorage.setItem('savedCourses', JSON.stringify(this.savedCourses));
  }
}
