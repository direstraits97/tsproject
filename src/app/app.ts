import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Mainheader } from './partials/mainheader/mainheader';
import { Mainfooter } from './partials/mainfooter/mainfooter';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Mainheader, Mainfooter],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('tsproject');
}
