/**
 * Injectar course-service för get-anrop, samt schedule-service för att spara innehåll. Get-anropet sorterar och filtrerar innehåll samt manipulerar paginering.
 * Av: Josefine Backlund
 */

import { Component, effect, inject, signal } from '@angular/core';
import { CourseService } from '../../services/course-service';
import { FormsModule } from '@angular/forms';
import { CoursesGet } from '../../interfaces/courses-get';
import { ScheduleService } from '../../services/schedule-service';

@Component({
  selector: 'app-courses',
  imports: [FormsModule],
  templateUrl: './courses.html',
  styleUrl: './courses.css',
})
export class Courses {
  private courseService = inject(CourseService); //Injectar get-anrop.
  courses = this.courseService.getCourses(); //Läsbar signal för kurserna.
  courseSearch: string = ''; //Input-fält.
  categoryChoice: string = ''; //Select-tagg för kategorier
  manipulatedCourses = signal<CoursesGet[]>([]); //Skrivbar signal för kurserna.
  categories = signal<string[]>([]); //Behållare för ämneskategorier.
  batchSize = signal<number>(30); //Storlek på antal kurser i taget vid paginering.
  index = signal<number>(0); //Index för paginering.
  saveCoursesService = inject(ScheduleService); //Injectar schedule-service för att spara till localStorage.

  constructor() {
    effect(() => {
      this.manipulatedCourses.set(this.courses()); //Den skrivbara kursen uppdateras med den läsbara signalen.
      this.getCategories(); //Kategorier hämtas.
    });
  }
  /* Denna funktion sorterar strängar i stigande ordning, för mindre redundans används nycklar i andra funktioner. */
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
  /* Denna funktion sorterar nummer i stigande ordning. */
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
  /* Denna funktion filtrerar innehållet både baserat på kategori och värde i input-fält.
  Olika instanser av kombinationen av input och kategori finns i if-satser nedan för att
  filtrering ska fungera som tänkt. Om kategori är vald med tomt värde i input, returneras det
  som matchar ämneskategorier. Om kategori ej är vald med värde i input returneras det som matchar
  kursnamn och kurskod. Om båda innehåller värden returneras matchande ämneskategorier tillsammans
  med matchningar för kursnamn och kurskod. Om inget av detta stämmer returneras allt. Resultatet
  uppdaterar sedan den skrivbara signalen. Om kategori förändras under tiden man bläddrar i pagineringen
  skickas användaren tillbaka till första index. */
  filterBySearch(): void {
    const filteredCourses = this.courses().filter((course) => {
      if (this.categoryChoice !== '' && this.courseSearch.toLowerCase() === '') {
        return course.subject === this.categoryChoice;
      }
      if (this.categoryChoice === '' && this.courseSearch.toLowerCase() !== '') {
        return (
          course.courseName.toLowerCase().includes(this.courseSearch.toLowerCase()) ||
          course.courseCode.toLowerCase().includes(this.courseSearch.toLowerCase())
        );
      }
      if (this.categoryChoice !== '' && this.courseSearch.toLowerCase() !== '') {
        return (
          course.subject === this.categoryChoice &&
          (course.courseName.toLowerCase().includes(this.courseSearch.toLowerCase()) ||
            course.courseCode.toLowerCase().includes(this.courseSearch.toLowerCase()))
        );
      }
      return true;
    });
    this.manipulatedCourses.set(filteredCourses);
    this.index.set(0);
  }
  /* Denna funktion uppdaterar en signal med unika värden under "subject", genom att skapa en ny array. Där 
  görs en kontroll om värdet redan finns i den nya arrayen eller inte. Varje unika värde pushas till den nya
  arrayen som sedan returneras när reduce loopat färdigt. */
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
  /* Denna funktion filtrerar utefter ämneskategori. Alla matchningar under ämne från select-taggen uppdateras till den skrivbara signalen. */
  filterByCategory(): void {
    const filteredCourses = this.courses().filter((course) =>
      course.subject.includes(this.categoryChoice),
    );
    this.manipulatedCourses.set(filteredCourses);
  }
  /* Denna funktion flyttar användaren till formuläret om det finns. */
  scrollToBeginning(): void {
    const form = document.querySelector<HTMLFormElement>('#form');
    if (form !== null) {
      form.scrollIntoView();
    }
  }
  /* Om den skrivbara signalens längd går att dela med batchsize och är mindre är index så går det att bläddra vidare, samt så uppdateras index-värdet.
  Byte av index triggar funktionen scrollToBeginning. */
  pageUp(): void {
    if (Math.floor(this.manipulatedCourses().length / this.batchSize()) > this.index()) {
      this.index.update((value) => value + 1);
      this.scrollToBeginning();
    }
  }
  /* Så länge index inte är 0 så kan den uppdateras med -1. Byte av index triggar funktionen scrollToBeginning. */
  pageDown(): void {
    if (this.index() !== 0) {
      this.index.update((value) => value - 1);
      this.scrollToBeginning();
    }
  }
}
