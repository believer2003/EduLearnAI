import { Chart } from "react-google-charts";
import { useState } from 'react';
import './main.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

let dummy=[
    {
        id:0,
        question: "When was the National Centre for Good Governance (NCGG) set up by the Government of India?",
        option1: "1995",
        option2: "2014",
        option3: "2005",
        option4: "2020",
        correct_option: "B",
        answered:0,
        chosen:"",
        summary: "The National Centre for Good Governance (NCGG) was set up in 2014 by the Government of India."
    },
    {
        id:1,
        question: "When was World Athletics Day instituted by the International Amateur Athletic Federation (IAAF)?",
        option1: "1990",
        option2: "1996",
        option3: "2000",
        option4: "2010",
        correct_option: "B",
        answered:0,
        chosen:"",
        summary: "World Athletics Day was instituted in 1996 by the International Amateur Athletic Federation (IAAF) to raise awareness of the physiological and psychological significance of sports."
    },
    {
        id:2,
        question: "When was the India Pavilion at Paper Arabia 2023 inaugurated?",
        option1: "May 14, 2023",
        option2: "May 16, 2023",
        option3: "May 18, 2023",
        option4: "May 20, 2023",
        correct_option: "B",
        answered:0,
        chosen:"",
        summary: "The India Pavilion at Paper Arabia 2023 was inaugurated on May 16, 2023, featuring 30 Indian companies."
    },
    {
        id:3,
        question: "Who was elected as the 1st-ever Indian-origin Lord Mayor of Birmingham?",
        option1: "Chaman Kumar",
        option2: "Chaman Singh",
        option3: "Chaman Lal",
        option4: "Chaman Raj",
        correct_option: "C",
        answered:0,
        chosen:"",
        summary: "Chaman Lal was elected as the 1st-ever Indian-origin Lord Mayor of Birmingham."
    }
];

export function MainApp(){
    return (
        <Router>
            <div className="quiz">
                <Routes>
                    <Route path="/testpage" element={<TestPage />} />
                    <Route path="/" element={<Main />} />
                    <Route path="/result" element={<Result />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </Router>
    );
}

export function Main(){
    const [submission,setSubmission] = useState(false);

    function handleSubmit(event){
        setSubmission(true);
    }

    if(submission)
    return <Navigate to="/testpage" />

    return (
        <div className="main">
            <h1>Ready to take the Quiz?</h1>
            <form onSubmit={handleSubmit}>
                <table className="table">
                    <tr>
                        <td id="lcont"><label for="difficulty">Choose Difficulty Level : </label></td>
                        <td id="rcont">
                            <select name="diff" id="diff_level" required>
                                <option value="Easy" selected>Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td id="lcont"><label for="proctoring">Want Proctored Test : </label></td>
                        <td id="rcont"><select name="proc" id="proc_option" required>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select></td>
                    </tr>
                    <tr>
                        <td colspan="2"><button type="submit">Start Test</button></td>
                    </tr>
                </table>
                
            </form>
        </div>
    );
}

export function TestPage(){
    const [curr, setCurr] = useState(0);

    return (
        <div>
            <Navbar curr={curr} setCurr={setCurr} />
            <Question curr={curr} setCurr={setCurr} />
            <Options curr={curr} setCurr={setCurr} />
        </div>
    );
};

export function Result(){

    let corr=0,unans=0,wrong=0;
    dummy.forEach((element)=>{
        if(element.chosen===element.correct_option)
        corr+=1;
        else if(element.chosen==="")
        unans+=1;
        else
        wrong+=1;
    });
    
    let data=[["Category", "Statistics"],["Correct",corr],["Unanswered",unans],["Wrong",wrong]];
    let options={title: "Test Result"};
    let navigate=useNavigate();
    function handleRetest(event){
        dummy.forEach((element)=>{
            element.answered=0;
            element.chosen="";
        });
        navigate('/');
    }

    return (
        <div className='result'>
            <h1>Result</h1>
            <div className='dataset'>
                <div id='left'>
                    <ul>
                        <li>Total Questions : {corr+wrong+unans}</li>
                        <li>Answered : {corr+wrong}</li>
                        <li>Correct : {corr}</li>
                        <li>Wrong : {wrong}</li>
                        <li>Unanswered : {unans}</li>
                    </ul>
                </div>
                <div id='right'>
                    {<Chart
                        chartType="PieChart"
                        data={data}
                        options={options}
                        width={"100%"}
                        height={"400px"}
                    />}
                </div>
            </div>
            <div className="foptions">
                <ul>
                    <li><button id="retest" onClick={handleRetest}>Re-Test</button></li>
                    <li><button id="home">Home</button></li>
                </ul>
            </div>
        </div>
    );
}

export function NotFound(){
    return <div>404 - Not Found</div>
}

function Navbar({curr,setCurr}) {
    const [submission,setSubmission] = useState(false);
    const [confirmation,setConfirmation]=useState(true);
    const [count,setCount]=useState(0);

    function handleSubmit(event){
        let c=0;
        dummy.forEach((element)=>{
            if(element.answered===2)
            c+=1;
        });
        setCount(c);
        if(c)
        setConfirmation(false);
        setSubmission(true);
    }

    if(submission && confirmation)
    return <Navigate to="/result" />

    return (
        <div className="navbar">
            {confirmation? <ul>
                {dummy.map(element => (
                    <li onClick={()=>{setCurr(element.id)}} className={curr===element.id?"nav_selected":""} key={element.id} style={{ border: '2px solid', borderColor: element.answered === 0 ? 'gray' : element.answered === 1 ? 'green' : element.answered === 2 ? 'purple' : 'red' }}>
                        {element.id+1}
                    </li>
                ))}
                <li className='submission'><button onClick={handleSubmit}>Submit</button></li>
            </ul>:<ul><li style={{gridColumn:4,width:"500px"}}>You have {count} questions marked for review. Proceed?</li><li><button onClick={()=>{setConfirmation(true);}}>Proceed</button></li><li><button onClick={()=>{setSubmission(false);setConfirmation(true);}}>Cancel</button></li></ul>}
        </div>
    );
}

function Question({ curr, setCurr}) {
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const handleAnswerChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedAnswer(selectedValue);
        dummy[curr].chosen = selectedValue;
        dummy[curr].answered=1;
    };

    return (
        <div className="question">
            <p>Q. {dummy[curr].question}</p>
            <div className='options'>
                <div className='labels'><label>
                    <input
                        type="radio"
                        name="answer"
                        value="A"
                        checked={dummy[curr].chosen === "A"}
                        onChange={handleAnswerChange}
                    />
                    {dummy[curr].option1}
                </label></div>
                <br />
                <div className='labels'><label>
                    <input
                        type="radio"
                        name="answer"
                        value="B"
                        checked={dummy[curr].chosen === "B"}
                        onChange={handleAnswerChange}
                    />
                    {dummy[curr].option2}
                </label></div>
                <br />
                <div className='labels'><label>
                    <input
                        type="radio"
                        name="answer"
                        value="C"
                        checked={dummy[curr].chosen === "C"}
                        onChange={handleAnswerChange}
                    />
                    {dummy[curr].option3}
                </label></div>
                <br />
                <div className='labels'><label>
                    <input
                        type="radio"
                        name="answer"
                        value="D"
                        checked={dummy[curr].chosen === "D"}
                        onChange={handleAnswerChange}
                    />
                    {dummy[curr].option4}
                </label></div>
            </div>
        </div>
    );
}
function Options({curr,setCurr}){
    function previous()
    {
        if(curr>0)
        setCurr(curr-1);
        if(dummy[curr].answered===0)
            dummy[curr].answered=3;
    }
    function review()
    {
        if (dummy[curr]) {
            dummy[curr].answered = dummy[curr].answered===2?0:2;
        }
    }
    function next()
    {
        if(curr<dummy.length-1)
        {
            setCurr(curr+1);
            if(dummy[curr].answered===0)
            dummy[curr].answered=3;
        }
    }
    return (
        <div className='choices_bar'>
            <ul className='choices'>
                <li className='prev'><button onClick={previous}>Previous</button></li>
                <li className='review'><button onClick={review}>{dummy[curr].answered!==2?"Mark for Review":"Unmark from Review"}</button></li>
                <li className='next'><button onClick={next}>Next</button></li>
            </ul>
        </div>
    );
}