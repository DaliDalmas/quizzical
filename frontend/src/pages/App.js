import Intro from "./Intro"
import QuestionAnswer from "./QuestionAnswer"
import React from "react"
import axios from "axios"

export default function App(){
    const [start, setStart] = React.useState(false);
    const [sessionId, setSessionId] = React.useState(0)
    const [apiQuestions, setApiQuestions] = React.useState([
        {
            question: "",
            options:[
                {option:"", correct:false, selected:false, id:0},
            ],
            id:0
        }
    ])

    function startGame(){
        setStart(true);
        axios
        .post(
            'http://127.0.0.1:8000/sessions/',
            {
                started_at:'2021-01-17T00:30:28.323Z'
            }
        )
        .then(
            res=>setSessionId(res.data.id)
            )
        .catch(
            error => console.log(error)
          )
        .finally( ()=> {
            // always executed
          });
        
        
    }

    React.useEffect(()=>{
        axios
        .get('http://127.0.0.1:8000/questions/?skip=0&limit=5')
        .then(res=>{
            let apiData = res.data
            apiData = apiData.map(dat=>({...dat, options:dat.options.sort((a, b) => 0.5 - Math.random())}))
            setApiQuestions(apiData)
        })
        .catch(error => console.log(error))
        .finally( ()=> {
            // always executed
          })
    }, [start])

    return(
        <main className="app">
            <svg xmlns="http://www.w3.org/2000/svg" width="158" height="141" viewBox="0 0 158 141" fill="none" className="top-right-design">
                <path fillRule="evenodd" clipRule="evenodd" d="M63.4095 81.3947C35.1213 50.8508 -2.68211 21.7816 1.17274 -19.6933C5.43941 -65.599 39.854 -105.359 82.4191 -123.133C122.797 -139.994 170.035 -130.256 205.822 -105.149C235.947 -84.0141 236.823 -43.8756 246.141 -8.27104C256.17 30.0508 282.521 70.8106 260.501 103.779C237.538 138.159 188.991 143.432 147.931 138.768C112.318 134.723 87.7505 107.677 63.4095 81.3947Z" fill="#FFFAD1"/>
            </svg>
            {start?<QuestionAnswer start={start} setStart={setStart}  quiz={apiQuestions}/>:<Intro startGame={startGame} sessionId={sessionId}/>}
            <svg xmlns="http://www.w3.org/2000/svg" width="148" height="118" viewBox="0 0 148 118" fill="none" className="bottom-left-design">
                <path fillRule="evenodd" clipRule="evenodd" d="M-5.55191 4.90596C35.9614 1.77498 82.2425 -9.72149 112.306 19.1094C145.581 51.0203 155.282 102.703 142.701 147.081C130.767 189.18 93.7448 220.092 51.8208 232.476C16.5281 242.902 -15.4332 218.605 -49.1007 203.738C-85.3375 187.737 -133.641 182.993 -145.741 145.239C-158.358 105.868 -132.269 64.5881 -103.064 35.3528C-77.7328 9.99541 -41.2727 7.60006 -5.55191 4.90596Z" fill="#DEEBF8"/>
            </svg>
            
        </main>
    )
}