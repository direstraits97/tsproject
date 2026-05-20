import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mainheader',
  imports: [RouterLink],
  templateUrl: './mainheader.html',
  styleUrl: './mainheader.css',
})
export class Mainheader {
  open: boolean = false;
  openMenu(): void {
    this.open = true;
  }
  closeMenu(): void {
    this.open = false;
  }
}
