/**
 * Get-anrop med HttpClient till json-fil med kurser på Mittuniversitetet.
 * Av: Josefine Backlund
 */

import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Signal } from '@angular/core';
import { CoursesGet } from '../interfaces/courses-get';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private http = inject(HttpClient);
  url: string =
    'https://matdah.github.io/DT208G---Programmering-i-TypeScript/Moment%205%20-%20Projekt/miun_courses.json';

  getCourses(): Signal<CoursesGet[]> {
    const courses$ = this.http.get<CoursesGet[]>(this.url); //Get-anrop på url längre upp.
    return toSignal(courses$, { initialValue: [] }); //Hämtas som läsbar signal med en tom array som startvärde.
  }
}
