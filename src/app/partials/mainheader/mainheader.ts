/**
 * Hamburgermeny som justerar placering.
 * Av: Josefine Backlund
 */

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mainheader',
  imports: [RouterLink],
  templateUrl: './mainheader.html',
  styleUrl: './mainheader.css',
})
/* Nedan skapas en boolean med false som default, med två metoder som ändrar värdet mellan true och false.
Dessa metoder används i HTML:en för att trigga en klassändring som tar fram och skjuter undan en hamburgermeny. */
export class Mainheader {
  open: boolean = false;
  openMenu(): void {
    this.open = true;
  }
  closeMenu(): void {
    this.open = false;
  }
}
