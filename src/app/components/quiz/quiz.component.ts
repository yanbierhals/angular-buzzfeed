import { Component, OnInit, NgModule } from '@angular/core';
import { resourceLimits } from 'worker_threads';
import quizz_questions from "../../../assets/data/quizz_questions.json"

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})

export class QuizComponent implements OnInit {
  title:string = ''

  questions: any
  questionSelected: any

  answers:string[] = []
  answerSelected:string = ""

  questionIndex:number = 0
  questionMaxIndex:number = 0

  finished: boolean = false

  constructor() { }

  ngOnInit(): void {
    if(quizz_questions){
      this.finished = false
      this.title = quizz_questions.title

      this.questions = quizz_questions.questions
      this.questionSelected = this.questions[this.questionIndex]

      this.questionMaxIndex = this.questions.length
    }
  }

  playerChoose(value:string){
    this.answers.push(value)
    this.nextStep()

  }

  nextStep(){
    this.questionIndex++

    if(this.questionMaxIndex>this.questionIndex){
      this.questionSelected = this.questions[this.questionIndex]
    }else{
      const finalAnsewer:string = this.checkResult(this.answers)
      this.finished = true;
      this.answerSelected = quizz_questions.results[finalAnsewer as keyof typeof quizz_questions.results]
    }
  }

  checkResult(anwsers:string[]){
    const result = anwsers.reduce((previus, current, i, arr)=>{
        if(
          arr.filter(item => item === previus).length >
          arr.filter(item => item === current).length
        ){
          return previus
        }else{
          return current
        }
      }
    )
    return result
  }
}


