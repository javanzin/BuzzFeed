import { Component } from '@angular/core';
import { QuizzComponent } from "../../components/quizz/quizz.component";
import { CommonModule } from '@angular/common';
@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [QuizzComponent, CommonModule],
})
export class HomeComponent {

}
