import React, { useState, useEffect } from "react"
import he from "he"

function shuffle(array) {
  const shuffledArray = [...array]
  shuffledArray.sort(() => Math.random() - 0.5)
  return shuffledArray
}

export default function Quest(props) {
  const [shuffledArr, setShuffledArr] = useState([]);

  useEffect(() => {
      let arr = []
      arr.push(he.decode(props.correct))
      for (let i=0 ; i<props.incorrect.length ; i++){
        arr.push(he.decode(props.incorrect[i]))
      }
      setShuffledArr(shuffle(arr))
  }, [props.correct, props.incorrect])

  
  function newArr() {
    const newArr = (shuffledArr.map((x) => (
    <button
      key={x}
      className={`${props.clicked === x ? "selected" : ""}`}
      onClick={() => props.onClicked(x, props.id)}
    >
      {x}
    </button>
    )))
    return newArr
  }
  
  function finalAns(){
    const finalArr = (shuffledArr.map((x) => {
      if (props.correct === x){
        return (<button
          key={x}
          className="right">
          {x}
        </button>)}
      else{
        return (<button 
          key={x}
          className={`${props.clicked === x ? "wrong" : "unselectedFinal"}`}>
          {x}
        </button>)
      }
    }))
    return finalArr
  }

  return (
    <div className="questionSet">
      <h2 className="question">{he.decode(props.question)}</h2>
      {props.finale ?
      finalAns()
      : newArr()}
      <hr></hr>
    </div>
  )
}