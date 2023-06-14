import React from "react"
import Question from "./Question"
import {nanoid} from "nanoid"

export default function App(){
    const [questions, setQuestion] = React.useState([])
    const [start, setStart] = React.useState(0)
    
    React.useEffect(() =>{
        fetch("https://opentdb.com/api.php?amount=5")
                    .then((res) => res.json())
                    .then((json) => setQuestion(json.results.map((question) => 
                        ({...question,
                        id: nanoid(),
                        clicked: "",
                        finale: false}))))
    }, [start])

    function isClicked(answer, id){
        setQuestion((questionSet) =>
          questionSet.map((question) => {
            if (question.id === id) {
              return {
                ...question,
                clicked: answer,
              };
            } else {
              return question;
            }
          })
        );
      }

    function displayQuestions() {
        const questionElements = questions.map(x => <Question 
            key={x.id}
            id={x.id}
            incorrect={x.incorrect_answers} 
            correct={x.correct_answer} 
            question = {x.question}
            onClicked = {isClicked}
            clicked = {x.clicked}
            finale = {x.finale}/>);
        return questionElements;
    }

    const checkAnswers = () => {
        setQuestion((questionSet) =>
          questionSet.map((question) => ({
            ...question,
            finale: true,
          }))
        )
      };

    function correctAnswers(){
        let yo=0
        for (let i=0; i<5 ; i++){
            if (questions[i].clicked === questions[i].correct_answer){
                yo+=1
            }
        }
        return yo
    }

    return (
        <main>
          {start===0 ? (
            <div className="titleScreen">
              <h2>My Quiz</h2>
              <p>random knowledge quiz</p>
              <button onClick={() => setStart(1)}>Start</button>
            </div>
          ) : (
            <div>
              {displayQuestions()}
              {questions.filter((element) => element.finale === true).length > 0 ? (
                <>
                  <p className="score">{`You scored ${correctAnswers()}/5 correct`}</p>
                  <button className="reset" onClick={() => setStart((x => x+1))}>
                    Play Again
                  </button>
                </>
              ) : (
                <button className="reset" onClick={checkAnswers}>
                  Check Answers
                </button>
              )}
            </div>
          )}
        </main>
      )
}
