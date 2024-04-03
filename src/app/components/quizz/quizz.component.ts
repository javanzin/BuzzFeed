import { Component } from '@angular/core';
import quizzQuestions from '../../../assets/data/quizz_questions.json';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quizz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.scss'
})
export class QuizzComponent {

  title: string = '';
  questions: any[] = [];
  questionSelected: any;
  questionIndex: number = 0;
  answers: string[] = [];
  answerSelected: string = '';
  finished: boolean = false;
  questionMaxSize: number = 0;

  constructor() { }

  ngOnInit() {
    if (quizzQuestions) {
      this.title = quizzQuestions.title;
      this.questions = quizzQuestions.questions;
      this.questionSelected = this.questions[this.questionIndex];
      this.questionMaxSize = this.questions.length;
      console.log(this.questionSelected.options);
    }

  }

  selectAnswer(answer: string) {
    this.answers.push(answer);
    this.nextQuestion();
  }

  async nextQuestion() {
    this.questionIndex += 1;
    this.answerSelected = '';
    if (this.questionIndex < this.questionMaxSize) {
      this.questionSelected = this.questions[this.questionIndex];
    } else {
      const finalResult:string = await this.checkResult(this.answers);
      this.finished = true;
      this.answerSelected = quizzQuestions.results[finalResult as keyof typeof quizzQuestions.results];
    }

  }

  async checkResult(answers: string[]) {
    const result = this.answers.reduce((previous, current, i, arr) => {
      if (
        arr.filter(item => item === previous).length >
        arr.filter(item => item === current).length
      ) {
        return previous;
      } else {
        return current;
      }
    });
  
    return result;
  }
  
}
