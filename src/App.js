import { Chart } from "react-google-charts";
import React, { useEffect, useState } from 'react';
import "./App.css"
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useDrivePicker from 'react-google-drive-picker'
import Typewriter from 'typewriter-effect';
import axios from 'axios';
import { IpProvider } from './IpContext';
import { useIp } from './IpContext';
import codemirror from "./codemirror-5.65.17/lib/codemirror";
import './codemirror-5.65.17/lib/codemirror.css';
import './codemirror-5.65.17/theme/dracula.css';
import './codemirror-5.65.17/mode/clike/clike.js';
import './codemirror-5.65.17/mode/python/python.js';
import './codemirror-5.65.17/addon/edit/closebrackets.js';

// let dumm=[
//     {
//         id:0,
//         question: "When was the National Centre for Good Governance (NCGG) set up by the Government of India?",
//         option1: "1995",
//         option2: "2014",
//         option3: "2005",
//         option4: "2020",
//         correct_option: "B",
//         answered:0,
//         chosen:"B",
//         summary: "The National Centre for Good Governance (NCGG) was set up in 2014 by the Government of India. The National Centre for Good Governance (NCGG) was set up in 2014 by the Government of India.The National Centre for Good Governance (NCGG) was set up in 2014 by the Government of India.The National Centre for Good Governance (NCGG) was set up in 2014 by the Government of India.The National Centre for Good Governance (NCGG) was set up in 2014 by the Government of India.The National Centre for Good Governance (NCGG) was set up in 2014 by the Government of India."
//     },
//     {
//         id:1,
//         question: "When was World Athletics Day instituted by the International Amateur Athletic Federation (IAAF)?",
//         option1: "1990",
//         option2: "1996",
//         option3: "2000",
//         option4: "2010",
//         correct_option: "B",
//         answered:0,
//         chosen:"A",
//         summary: "World Athletics Day was instituted in 1996 by the International Amateur Athletic Federation (IAAF) to raise awareness of the physiological and psychological significance of sports."
//     },
//     {
//         id:2,
//         question: "When was the India Pavilion at Paper Arabia 2023 inaugurated?",
//         option1: "May 14, 2023",
//         option2: "May 16, 2023",
//         option3: "May 18, 2023",
//         option4: "May 20, 2023",
//         correct_option: "B",
//         answered:0,
//         chosen:"D",
//         summary: "The India Pavilion at Paper Arabia 2023 was inaugurated on May 16, 2023, featuring 30 Indian companies."
//     },
//     {
//         id:3,
//         question: "Who was elected as the 1st-ever Indian-origin Lord Mayor of Birmingham?",
//         option1: "Chaman Kumar",
//         option2: "Chaman Singh",
//         option3: "Chaman Lal",
//         option4: "Chaman Raj",
//         correct_option: "C",
//         answered:0,
//         chosen:"C",
//         summary: "Chaman Lal was elected as the 1st-ever Indian-origin Lord Mayor of Birmingham."
//     }
// ];

let desDummy=[
    {
        id:0,
        answered:0,
        question:"Yo yo honey singh",
        chosen:""
    },
    {
        id:1,
        answered:0,
        question:"Tu ta meri jaan ae",
        chosen:""
    },
    {
        id:2,
        answered:0,
        question:"Tera yaar hu maiii",
        chosen:""
    },
    {
        id:3,
        answered:0,
        question:"O bedardeya",
        chosen:""
    }
];

export default function App(){
    const storedUserData = localStorage.getItem('userData');
    const initialUserData = storedUserData ? JSON.parse(storedUserData) : null;
    const [userData,setUserData]=useState(initialUserData);
    const [pdfId,setPdfId]=useState("");
    const [userTests,setUserTests]=useState({});
    const [dummy,setDummy]=useState({});
    const [desdummy,setDesdummy]=useState(desDummy);
    const [url,setUrl]=useState({});
    const [essay,setEssay]=useState(false);
    const [retest,setRetest]=useState(true);
    const [status,setStatus]=useState(400);
    const [chStatus,setChStatus]=useState(false);
    const [create,setCreate]=useState(true);
    const [join,setJoin]=useState(true);
    const [ats,setAts]=useState('');
    const [feedback,setFeedback]=useState('');

    return (
        <IpProvider>
        <Router>
            <div className='quiz'>
                <Routes>
                    <Route path="/" element={<Auth setUserData={setUserData} />} />
                    <Route path="/dashboard" element={<Dashboard userData={userData} setPdfId={setPdfId} userTests={userTests} setUserTests={setUserTests} setUrl={setUrl} setEssay={setEssay}/>} />
                    <Route path="/main" element={<Main url={url} setDummy={setDummy} retest={retest} setRetest={setRetest} status={status} chStatus={chStatus} userData={userData} setDesdummy={setDesdummy} essay={essay}/>} />
                    <Route path="/testpage" element={<TestPage userData={userData} pdfId={pdfId} dummy={dummy} essay={essay} create={create} join={join} desdummy={desdummy} setDesdummy={setDesdummy}/>} />
                    <Route path="/ssb" element={<SSB />} />
                    <Route path="/multiplayer" element={<MultiPlayer userData={userData} setPdfId={setPdfId} setUrl={setUrl} status={status} setStatus={setStatus} chStatus={chStatus} setChStatus={setChStatus} setDummy={setDummy} create={create} join={join} setCreate={setCreate} setJoin={setJoin}/>} />
                    <Route path="/queries" element={<Queries url={url}/>} />
                    <Route path="/placex" element={<Place_exam/>} />
                    <Route path="/ess_result" element={<Ess_result desdummy={desdummy}/>} />
                    <Route path="/result" element={<Result dummy={dummy} retest={retest} setRetest={setRetest} />} />
                    <Route path="/MP_result" element={<MP_result dummy={dummy} create={create} join={join} userData={userData}/>} />
                    <Route path="/friends" element={<Friends/>} />
                    <Route path="/contact" element={<Contact/>} />
                    <Route path="/about" element={<About/>} />
                    <Route path="/interview" element={<Interview setPdfId={setPdfId} setUrl={setUrl} pdfId={pdfId} setAts={setAts}/>} />
                    <Route path="/interchat" element={<InterviewChat ats={ats} setFeedback={setFeedback}/>} />
                    <Route path="/interlast" element={<Interlast feedback={feedback}/>} />
                    <Route path="*" element={<NotFound />} />
                    <Route path='/techchat' element={<TechChat setFeedback={setFeedback}/>}/>
                </Routes>
            </div>
        </Router>
        </IpProvider>
    );
}

function Auth({setUserData}){
    const setIp = useIp()[1];
    const [statetype,setStatetype]=useState(true);
    const [incpass,setIncpass]=useState(false);
    const navigate = useNavigate();   

    function handleLogin(event) {
        event.preventDefault();
        setIp(event.target.ipadd.value);
        const formData = {
            username: event.target.username.value,
            password: event.target.password.value
        };
        fetch(`http://localhost:5002/api/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (response.status===401) {
                setIncpass(true);
                throw new Error('Network response was not ok');
            }
            if(response.status!==200)
            {
                setStatetype(false);
            }
            if(response.status===200)
            {
                navigate('/dashboard');
            }
            return response.json();
        })
        .then(data => {
            localStorage.setItem('userData', JSON.stringify(data));
            setUserData(data);
            console.log("User data retrieved successfully:", data);
        })
        .catch(error => {
            console.error("Error retrieving user data:", error);
        });
    }
    
    function handleSignup(event) {
        event.preventDefault();
        const formData = {
            fname:event.target.fname.value,
            lname:event.target.lname.value,
            username: event.target.username.value,
            password: event.target.password.value
        };
        fetch(`http://localhost:5002/api/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log("User data retrieved successfully:", data);
            setStatetype(true);
            navigate('/');
        })
        .catch(error => {
            console.error("Error retrieving user data:", error);
        });
    }

    return (
       <div className='auth_page'>
            <div className="auth" style={{ height: statetype ? "30vh" : "40vh" }}>
                <h1>{statetype?"ACCOUNT LOGIN":"YOU LOOK NEW! SIGNUP"}</h1>
                {statetype && <form onSubmit={handleLogin}>
                    <table>
                        <tr>
                            <td><input id='leftip' type="username" name="username" placeholder="Enter Username..." required/></td>
                            <td><input id='rightip' type="password" name="password" placeholder="Enter Password..." required/></td>
                        </tr>
                        <tr>
                            <td colSpan={2}><input id='ipadd' type="text" name="ipadd" placeholder="Enter IP Address..." required/></td>
                        </tr>
                        <tr>
                            <td colSpan={2}><button type="submit">LOG IN</button></td>
                        </tr>
                    </table>
                    {incpass && <label style={{color:"red",fontWeight:"bold"}}>Incorrect Password</label>}
                </form>}
                {!statetype && <form onSubmit={handleSignup}>
                    <table style={{ height: statetype ? "20vh" : "30vh" }}>
                        <tr>
                            <td><input id='leftip' type='fname' name='fname' placeholder='Enter First Name...' required/></td>
                            <td><input id='rightip' type='lname' name='lname' placeholder='Enter Last Name...' required/></td>
                        </tr>
                        <tr>
                            <td><input type='username' name='username' placeholder='Enter Username...' required/></td>
                            <td><input type='password' name='password' placeholder='Enter Password...' required/></td>
                        </tr>
                        <tr>
                            <td colSpan={2}><button type='submit'>SIGN UP</button></td>
                        </tr>
                    </table>
                </form>}
            </div>
       </div>
    );
}


function Dashboard({userData,setPdfId,userTests,setUserTests,setUrl,setEssay}){

    useEffect(()=>{
        findTests();
    },[]);

    function findTests() {
        fetch(`http://localhost:5002/api/getAll`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log("User data retrieved successfully:", data);
            setUserTests(data);
        })
        .catch(error => {
            console.error("Error retrieving user data:", error);
        });
    } 
    let score=0,count=0,passed=0,failed=0;
    if(userTests.length > 0)
    userTests.map((element) => {
        if (element.userId === userData._id) {
                element.passed?passed+=1:failed+=1;
                score+=element.score
                count+=1;
        }
    })

    const data = [
        ["Category", "Count"],
        ["Passed", passed],
        ["Failed", failed],
    ];
        
    const options = {
        title: "Test Details",
        pieHole: 0.4,
        is3D: false,
    };

    const navigate = useNavigate();
    const [openPicker, authResponse] = useDrivePicker();  
    const handleOpenPicker = (str) => {
            openPicker({
            clientId: "51460907741-bsckge5dghc0i68evh2o7s32ljr83klj.apps.googleusercontent.com",
            developerKey: "AIzaSyC2i0U6sQXh8ZA5aKLZool2Q40IlE5bEmA",
            viewId: "DOCS",
            showUploadView: true,
            showUploadFolders: true,
            supportDrives: true,
            multiselect: false,
            callbackFunction: (data) => {
                if (data.action === 'cancel') {
                    console.log('User clicked cancel/close button')
                    return;
                }
                if(data.docs && data.docs.length > 0)
                {
                    setUrl(data.docs[0].url);
                    setPdfId(data.docs[0].url);
                    str==="query"?navigate('/queries'):navigate('/main');
                }
            },
        })
    }

    return (
        <div className="dashboard">
            <div className="dash_nav">
                <ul>
                    <li id="logo"><img src="" alt=""></img></li>
                    <li><button onClick={()=>navigate('/dashboard')}>HOME</button></li>
                    <li><button onClick={()=>navigate('/interview')}>PRACTICE INTERVIEW</button></li>
                    <li><button onClick={()=>navigate('/friends')}>FRIENDS</button></li>
                    <li><button onClick={()=>navigate('/contact')}>CONTACT US</button></li>
                    <li><button onClick={()=>navigate('/about')}>ABOUT US</button></li>
                    <li id="acc">
                        <span></span>
                        <span>{userData.fname+" "+userData.lname} : {count?(score/count).toFixed(2):0}</span>
                        <span id="acc_options">
                            <ul>
                                <li><button style={{background:"red"}} onClick={()=>{navigate('/');localStorage.removeItem('userData');window.location.reload();}}>Log Out</button></li>
                            </ul>
                        </span>
                    </li>
                </ul>
            </div>
            <div className="welcome">
                <div className="wel_left">
                    <h1 id="typewriter"><Typewriter
                        options={{
                            strings: [`Welcome ${userData.fname}`],
                            autoStart: true,
                            delay: 100,
                            loop:true
                        }}
                    /></h1>
                    <h2>Start practising with our EduLearn AI Companion</h2>
                    <div className="wel_opt">
                        <table>
                            <tr>
                                <td><button onClick={() => {handleOpenPicker("quiz");setEssay(false);}}>Take a Quiz</button></td>
                                <td><button onClick={() => {handleOpenPicker("essay");setEssay(true);}}>University Exam</button></td>
                            </tr>
                            <tr>
                                <td><button onClick={() => {navigate('/ssb')}}>SSB TAT Practice</button></td>
                                <td><button onClick={() => {navigate('/placex')}}>Placement Exam</button></td>
                            </tr>
                            <tr>
                                <td><button onClick={() => handleOpenPicker("query")}>Ask Queries</button></td>
                                <td><button onClick={() => navigate('/multiplayer')}>Play with Friends</button></td>
                            </tr>
                            
                        </table>
                    </div>
                </div>
                <div className="wel_right">
                    <h1>Previous Tests</h1>
                    {(passed+failed)!==0 && <Chart
                        chartType="PieChart"
                        width="100%"
                        data={data}
                        options={options}
                    />}
                    <ol>
                        {userTests.length > 0 ? (
                            userTests.map((element) => {
                                if (element.userId === userData._id) {
                                        score+=element.score
                                        count+=1
                                        return (
                                        <li key={element._id}>
                                            <span>Date : {element.testDate}</span>
                                            <span>Score : {element.score}</span>
                                            <span>Status : {element.passed?"Pass":"Fail"}</span>
                                            <span>Remarks : {element.remarks}</span>
                                            <span><pre style={{fontSize:"15px"}}>PDF : <a href={element.pdfFileId}>link</a></pre></span>
                                        </li>
                                    );
                                }
                                return null;
                            })
                        ) : (
                            <li>No tests found</li>
                        )}
                    </ol>
                </div>
            </div>
        </div>
    );
}

 function Main({url,setDummy,retest,status,chStatus,userData,setDesdummy,essay}){
    const [submission,setSubmission] = useState(false);
    const [load,setLoad]=useState(false);
    async function sendLink(){
        const selectElement = document.getElementById('diff_level');
        const selectedOption = selectElement.options[selectElement.selectedIndex];
        const formData = {
            username:userData.username,
            link:url,
            level:selectedOption.value,
            var:retest,
            status:status,
            chStatus:chStatus
        };
        await fetch(chStatus===true?`http://172.20.10.3:5000/start2player`:(essay===true?`http://172.20.10.3:5000/paraque`:`http://172.20.10.3:5000/startQuiz`), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (response.status===401) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log("User data retrieved successfully:", data);
            essay? setDesdummy(data.questions):setDummy(data.questions);
            setSubmission(true);
        })
        .catch(error => {
            console.error("Error retrieving user data:", error);
        });
    }

    function handleSubmit(event){
        event.preventDefault();
        setLoad(true);
        sendLink();
    }

    if(submission)
    return <Navigate to="/testpage" />

    return (
        <div className="main">
            {load ? <div className="load"></div>:
            <div><h1>Ready to take the Quiz?</h1>
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
                        <td colspan="2"><button type="submit">Start Test</button></td>
                    </tr>
                </table>
                
            </form>
            </div>}
        </div>
    );
}

 function TestPage({userData,pdfId,dummy,essay,create,join,desdummy,setDesdummy}){
    const [curr, setCurr] = useState(0);

    return (
        <div>
            <Navbar curr={curr} setCurr={setCurr} userData={userData} pdfId={pdfId} dummy={essay?desdummy:dummy} create={create} join={join} essay={essay} setDesdummy={setDesdummy}/>
            {essay?<Essay desdummy={desdummy} curr={curr}/>:<Question curr={curr} setCurr={setCurr} dummy={dummy} />}
            <Options curr={curr} setCurr={setCurr} dummy={essay?desdummy:dummy} />
        </div>
    );
};

 function Result({dummy,retest,setRetest}){
    

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
        setRetest(false);
        navigate('/main');
    }
    function handleSummary(event){
        event.preventDefault();
        const summaryElement = event.target.nextElementSibling;
        const list=document.getElementById('summ-list');
        if (summaryElement) {
            summaryElement.classList.toggle('visible');
        }
    }

    return (
        <div className='result'>
            <div className="res"><h1>Result</h1>
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
                    <li><button id="home" onClick={()=>{navigate('/dashboard');}}>Home</button></li>
                </ul>
            </div>
            <div className="solutions">
                    {dummy.map((element)=>{
                        return <ul className="summ-list"><li style={{height:"100px",width:"100px"}} className="mimg" id={element.chosen===element.correct_option?"mcorrect":"mwrong"}></li><li id="ques">Q. {element.question}</li><li id="chosen">Option Chosen : {element["option"+(element.chosen.charCodeAt(0) - 'A'.charCodeAt(0) + 1)]}</li><li id="correct">Correct Option : {element["option"+(element.correct_option.charCodeAt(0) - 'A'.charCodeAt(0) + 1)]}</li><li id="summary" onClick={handleSummary}><button id="sum-btn"><span id="hidsum">Summary</span>&#x2193;</button></li><li className="summary-content"><b>Summary :</b> {element.summary}</li></ul>
                    })}
            </div></div>
        </div>
    );
}

 function NotFound(){
    return <div>404 - Not Found</div>
}

function Navbar({curr,setCurr,userData,pdfId,dummy,create,join,essay,setDesdummy}) {
    const [submission,setSubmission] = useState(false);
    const [confirmation,setConfirmation]=useState(true);
    const [count,setCount]=useState(0);

    function handleTest() {
        let corr = 0;
        dummy.forEach((element) => {
            if (element.chosen === element.correct_option) corr += 1;
        });
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0'); 
        const mm = String(today.getMonth() + 1).padStart(2, '0'); 
        const yyyy = today.getFullYear(); 
        const formData = {
            userId: userData._id,
            testDate:dd+" / "+mm+" / "+yyyy,
            score: corr,
            passed:(corr>3?true:false),
            remarks: "Can be better",
            pdfFileId: pdfId
        };
        fetch(`http://localhost:5002/api/createTest`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            console.log(formData);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log("Test data sent successfully");
        })
        .catch(error => {
            console.error("Error sending test data:", error);
        });
    }    

    async function handleEssay(){
        const formData={
            dummy:dummy
        };
        await fetch(`http://172.20.10.3:5000/paraanswer`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (response.status===401) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setDesdummy(data.result);
            console.log("User data retrieved successfully:", data);
        })
        .catch(error => {
            console.error("Error retrieving user data:", error);
        });
    }

    function handleSubmit(event){
        event.preventDefault();
        !essay ? handleTest():handleEssay();
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

    if(submission && confirmation && essay)
    return <Navigate to="/ess_result" />

    if(submission && confirmation && (create && join))
    return <Navigate to="/result" />

    if(submission && confirmation && !(create && join))
    return <Navigate to="/mp_result" />

    return (
        <div className="navbar">
            {confirmation? <ul>
                {dummy.map((element) => (
                    <li onClick={()=>{setCurr(element.id)}} className={curr===element.id?"nav_selected":""} key={element.id} style={{ border: '2px solid', borderColor: element.answered === 0 ? 'gray' : element.answered === 1 ? 'green' : element.answered === 2 ? 'purple' : 'red' }}>
                        {element.id+1}
                    </li>
                ))}
                <li className='submission'><button onClick={handleSubmit}>Submit</button></li>
            </ul>:<ul><li style={{gridColumn:4,width:"500px"}}>You have {count} questions marked for review. Proceed?</li><li><button onClick={()=>{setConfirmation(true);}}>Proceed</button></li><li><button onClick={()=>{setSubmission(false);setConfirmation(true);}}>Cancel</button></li></ul>}
        </div>
    );
}

function Question({ curr, setCurr,dummy}) {
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
function Options({curr,setCurr,dummy}){
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

function MultiPlayer({userData,setUrl,setPdfId,status,setStatus,chStatus,setChStatus,setDummy,create,setCreate,join,setJoin}){

    const [text,setText]=useState("Create a Room");
    const [submission,setSubmission]=useState(false);
    const navigate = useNavigate();

    const [openPicker, authResponse] = useDrivePicker();  
    const handleOpenPicker = () => {
            openPicker({
            clientId: "51460907741-bsckge5dghc0i68evh2o7s32ljr83klj.apps.googleusercontent.com",
            developerKey: "AIzaSyC2i0U6sQXh8ZA5aKLZool2Q40IlE5bEmA",
            viewId: "DOCS",
            showUploadView: true,
            showUploadFolders: true,
            supportDrives: true,
            multiselect: false,
            callbackFunction: (data) => {
                if (data.action === 'cancel') {
                    console.log('User clicked cancel/close button')
                    return;
                }
                if(data.docs && data.docs.length > 0)
                {
                    setUrl(data.docs[0].url);
                    setPdfId(data.docs[0].url);
                    navigate('/main');
                }
            },
        })
    }

    function handleCreate(event){
        event.preventDefault();
        setCreate(false);
        const croom=document.getElementById('croom');
        croom.classList.add('animateButton');
        async function getToken() {
            const formData = {
                username: userData.username,
            };
            await fetch(`http://172.20.10.3:5000/generateToken`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            .then(response => {
                if (response.status===401) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setText("Share this Token : "+data.token);

                console.log("User data retrieved successfully:", data);
            })
            .catch(error => {
                console.error("Error retrieving user data:", error);
            });
        }
        getToken();
    }

    function handleStart(event){
        event.preventDefault();
        setStatus(402);
        async function start() {
            const formData = {
                username: userData.username,
                status:status,
                chStatus:chStatus
            };
            console.log(formData);
            await fetch(`http://172.20.10.3:5000/start2player`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            .then(response => {
                if (response.status===401) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log("User data retrieved successfully:", data);
                setStatus(parseInt(data.status));
                if(data.status==200)
                {
                    handleOpenPicker();
                    setChStatus(true);
                }
            })
            .catch(error => {
                console.error("Error retrieving user data:", error);
            });
        }
        start();
    }

    function handleJoin(event){
        event.preventDefault();
        if(status!==400)
            return;
        setStatus(402);
        const tokenId=document.getElementById('tokenid');
        async function sendToken() {
            const formData = {
                token:tokenId.value
            };
            await fetch(`http://172.20.10.3:5000/verifyToken`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            .then(response => {
                if (response.status===401) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log("User data retrieved successfully:", data);
                if(data.status==200)
                {
                    setDummy(data.questions);
                    setSubmission(true);
                }
                setStatus(parseInt(data.status));
            })
            .catch(error => {
                console.error("Error retrieving user data:", error);
            });
        }
        sendToken();
    }

    if(submission)
    return <Navigate to="/testpage" />

    return (
        <div className="multiplayer">
            <div className="multiplay">
                <h1>PICK ONE</h1>
                <table>
                    <tr>
                        {join && <td><button id="croom" style={{ height: text !== "Create a Room" ? "50px" : undefined }} onClick={text==="Create a Room" ? handleCreate:null}>{text}</button>{!create && <button style={{height:"50px",marginTop:"15px"}} onClick={handleStart}>{status===400?"Start":"Second Player has not joined yet..."}</button>}</td>}
                        {create && <td>{join ? <button id="jroom" onClick={()=>setJoin(false)}>Join a Room</button>:<form onSubmit={handleJoin}><input id="tokenid" placeholder="Enter Token Number..." style={{height:"50px",width:"100%",marginBottom:"10px",borderRadius:"20px"}} type="text" required/><button type="submit" style={{height:"50px"}}>{status===400?"Submit":status===404?"Verification Failed : Token not Matched":"Waiting for other player to start..."}</button></form>}</td>}
                    </tr>
                </table>
            </div>
        </div>
    );
}

function Essay({ desdummy, curr }) {
    const [value, setValue] = useState(desdummy[curr].chosen);

    useEffect(() => {
        setValue(desdummy[curr].chosen);
    }, [curr, desdummy]);

    function handleTextareaChange(event) {
        const newValue = event.target.value;
        setValue(newValue);
        desdummy[curr].chosen = newValue;
        desdummy[curr].answered = 1;
    }

    return (
        <div className="question">
            <p>{desdummy[curr].question}</p>
            <textarea style={{fontSize:"20px"}} placeholder="Enter your answer..." value={value} onChange={handleTextareaChange}></textarea>
        </div>
    );
}

function Queries({url}) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [linkSent, setLinkSent] = useState(false);
    const [submit,setSubmit]=useState(true);
    const [load,setLoad]=useState(false);

    async function sendLink(){
        const formData = {
            link:url,
            var:0,
        };
        await fetch(`http://172.20.10.3:5000/askQuery`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (response.status===401) {
                throw new Error('Network response was not ok');
            }
            if(response.status===200)
            setLoad(false);
            return response.json();
        })
        .then(data => {
            console.log("User data retrieved successfully:", data);
        })
        .catch(error => {
            console.error("Error retrieving user data:", error);
        });
    }

    useEffect(() => {
        if (!linkSent) { 
            setLoad(true);
            sendLink();
            setLinkSent(true); 
        }
    }, [linkSent]);

    const handleMessageSubmit = async (event) => {
        event.preventDefault();
        console.log(submit);
        if (newMessage.trim() === '') return;
    
        const userMessage = { text: newMessage, sender: 'user' };
        setMessages(prevMessages => [...prevMessages, userMessage]);
        {!submit && setNewMessage('')}
    
        try {
            const formData = { query: newMessage,var:1, };
            const response = await fetch(submit?`http://172.20.10.3:5000/askQuery`:`http://172.20.10.3:5000/websearch`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const modelMessage = { text: data.answer, sender: 'model' };
            setMessages(prevMessages => [...prevMessages, modelMessage]);
            setSubmit(false);
            console.log("User data retrieved successfully:", data);
        } catch (error) {
            console.error("Error retrieving user data:", error);
        }
    };    

    const handleChange = (event) => {
        setSubmit(true);
        setNewMessage(event.target.value);
    };

    return (
        <div className="queries">
            {load ? <div className="load" style={{left:"40%"}}></div>:
            <div className="query">
                <h1>Clear your Doubts...</h1>
                {messages.length!==0 && (<div className="messages">
                    {messages.map((message, index) => (
                        <div key={index} className={`message ${message.sender}`}>
                            <p>{message.text}</p>
                        </div>
                    ))}
                </div>)}
                {messages.length===0&&<div className="msgs_bg" id="typewriter"><Typewriter
                        options={{
                            strings: ['Start by saying Hello...','Analyze your PDFs thoroughly...','Make your own questions...','Be a master...'],
                            autoStart: true,
                            delay: 50,
                            loop:true
                        }}
                    /></div>}
                <form className="msgs_input">
                    <input type="text" placeholder="Type a message..." value={newMessage} onChange={handleChange} />
                    <button onClick={handleMessageSubmit} style={{backgroundColor:submit?"black":"red"}}>{submit?"Send":"Web Search"}</button>
                </form>
            </div>}
        </div>
    );
}

function MP_result({userData,dummy,create,join}){

    const [oppData,setOppData]=useState({});
    const [isData,setIsData]=useState(false);
    
    useEffect(()=>{
        sendData();
    },[]);

    let corr=0,unans=0,wrong=0;
    dummy.forEach((element)=>{
        if(element.chosen===element.correct_option)
        corr+=1;
        else if(element.chosen==="")
        unans+=1;
        else
        wrong+=1;
    });

    async function sendData(){
        const formData = {
            username:userData.username,
            marks:corr,
            wrong:wrong
        };
        await fetch(create?`http://172.20.10.3:5000/user1submit`:`http://172.20.10.3:5000/user2submit`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (response.status===401) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            setOppData(data);
            setIsData(true);
            console.log("User data retrieved successfully:", data);
        })
        .catch(error => {
            console.error("Error retrieving user data:", error);
        });
    }

    let navigate=useNavigate();
    function handleRetest(event){
        navigate('/main');
    }
    function handleSummary(event){
        event.preventDefault();
        const summaryElement = event.target.nextElementSibling;
        if (summaryElement) {
            summaryElement.classList.toggle('visible');
        }
    }

    return (
        <div className='result'>
            <div className="res"><h1>Result</h1>
            {isData&&<h2>{oppData.winner+" Won!!!"}</h2>}
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
                <div id='right' className="mpright">
                    {!isData?<p>Waiting for other user to submit...</p>:<ul>
                        <li>Total Questions : 9</li>
                        <li>Answered : {oppData.marks+oppData.wrong}</li>
                        <li>Correct : {oppData.marks}</li>
                        <li>Wrong : {oppData.wrong}</li>
                        <li>Unanswered : {9-oppData.marks-oppData.wrong}</li>
                    </ul>}
                </div>
            </div>
            <div className="foptions">
                <ul>
                    <li><button id="retest" onClick={handleRetest}>Re-Test</button></li>
                    <li><button id="home" onClick={()=>{navigate('/dashboard');}}>Home</button></li>
                </ul>
            </div>
            <div className="solutions">
                    {dummy.map((element)=>{
                        return <ul className="summ-list"><li style={{height:"100px",width:"100px"}} className="mimg" id={element.chosen===element.correct_option?"mcorrect":"mwrong"}></li><li id="ques">Q. {element.question}</li><li id="chosen">Option Chosen : {element["option"+(element.chosen.charCodeAt(0) - 'A'.charCodeAt(0) + 1)]}</li><li id="correct">Correct Option : {element["option"+(element.correct_option.charCodeAt(0) - 'A'.charCodeAt(0) + 1)]}</li><li id="summary" onClick={handleSummary}><button id="sum-btn"><span id="hidsum">Summary</span>&#x2193;</button></li><li className="summary-content"><b>Summary :</b> {element.summary}</li></ul>
                    })}
            </div></div>
        </div>
    );
}

function SSB() {
    const [path, setPath] = useState('');
    const [fileName, setFileName] = useState('');
    const [text, setText] = useState(false);
    const [result, setResult] = useState('');
    const [timers,setTimers]=useState(true);

    useEffect(() => {
        if (path.length && fileName.length) {
            const duration = 5;
            const display = document.querySelector('.timer');
            if (display) {
                startTimer(duration, display);
            }
        }
    }, [path, fileName]);

    function startTimer(duration, display) {
        let timer = duration, minutes, seconds;
        const interval = setInterval(() => {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.textContent = minutes + ":" + seconds;

            if (--timer < 0) {
                clearInterval(interval);
                if(!text)  
                setText(true)
                else
                {handleSubmit();};
            }
        }, 1000);
    }

    async function handleSubmit(event) {
        if (event) event.preventDefault();
        setTimers(false);
        const formData = {
            story: document.querySelector('.imgdes').value
        };
        try {
            const response = await fetch(`http://172.20.10.3:5000/qualitycheck`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            if (response.status === 401) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setResult(data.description);
            console.log("User data retrieved successfully:", data);
        } catch (error) {
            console.error("Error retrieving user data:", error);
        }
    }

    const downloadImage = async () => {
        const imageUrl = 'http://172.20.10.3:5000/ssbimage';

        try {
            const response = await axios({
                method: 'post',
                url: imageUrl,
                responseType: 'blob'
            });
            const randomFileName = `${Math.floor(Math.random() * 1000)}.png`;
            setFileName(randomFileName);
            const url = window.URL.createObjectURL(new Blob([response.data]));
            setPath(url);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', randomFileName);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (err) {
            console.error('Error fetching image from server', err);
        }
    };

    if(text && timers)
    startTimer(5,document.querySelector('.timer'));

    useEffect(() => {
        window.onload = downloadImage;
    }, []);

    const navigate = useNavigate();   

    return (
        <div className="ssb">
            {path && (
                <div className="time">
                    <p className="timer">{result && "Result"}</p>
                </div>
            )}
            <div className="imgtest">
                <div className="img">
                    <div className="image" style={path.length && !text ? { backgroundImage: `url(${path})`, backgroundPosition: 'center' } : {}}>
                        {!path.length && <Typewriter
                            options={{
                                strings: ['Generating Image...', 'Get Ready...'],
                                autoStart: true,
                                delay: 100,
                                loop: true
                            }}
                        />}
                        {text && !result.length && <textarea className="imgdes" placeholder="Explain your Story..."></textarea>}
                        {result && <div dangerouslySetInnerHTML={{ __html: result }}></div>}
                    </div>
                </div>
                {text && <button onClick={timers?handleSubmit:() => navigate('/dashboard')}>{timers?"Submit":"Home"}</button>}
            </div>
        </div>
    );
}

function Ess_result({desdummy}){

    const navigate = useNavigate();

    return (
        <div className='result'>
            <div className="res"><h1>Result</h1>
            <div className="solutions">
                    {desdummy.map((element)=>{
                        return <ul className="summ-list">
                                <li><div dangerouslySetInnerHTML={{ __html: element.result }}></div></li>
                            </ul>
                    })}
            </div>
            <div className="foptions">
                <ul>
                    <li><button id="retest" >Re-Test</button></li>
                    <li><button id="home" onClick={()=>{navigate('/dashboard');}}>Home</button></li>
                </ul>
            </div>
            </div>
        </div>
    );
}

function Place_exam(){
    const [inputValue, setInputValue] = useState('');
    const [backspaceCount, setBackspaceCount] = useState(0);
    const [ques,setQues]=useState(false);
    const [sub,setSub]=useState(false);
    const [acques,setAcques]=useState('');
    const [res,setRes]=useState('');

    const navigate = useNavigate();   

    useEffect(()=>{
        QuesGen();
    },[]);
  
    const handleKeyDown = (event) => {
      const key = event.key;
      if (key === 'Backspace') {
        setBackspaceCount((prevCount) => prevCount + 1);
  
        let words = inputValue.split(' ');
        words.pop();
        setInputValue(words.join(' '));
        
        event.preventDefault();
      }
  
      if (backspaceCount === 2) {
        setBackspaceCount(0);
        handleSubmit();
      }
    };

    async function QuesGen(){
        await fetch(`http://172.20.10.3:5000/placement_que`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log("User data retrieved successfully:", data);
            setQues(true);
            setAcques(data.question);
        })
        .catch(error => {
            console.error("Error retrieving user data:", error);
        });
    }

    async function handleSubmit(event){
        if(event) event.preventDefault();
        setSub(true);
        const formData={
            answer:document.querySelector('#placeans').value
        };
        await fetch(`http://172.20.10.3:5000/placement_res`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log("User data retrieved successfully:", data);
            setRes(data.result);
            setSub(false);
        })
        .catch(error => {
            console.error("Error retrieving user data:", error);
        });
    }
  
    return (
      <div className="placex">
        <h1>Placement Exam Practice</h1>
        <div className="place_align">{ques && (!sub ? <><div className="place_left">
            {!res.length ? <div dangerouslySetInnerHTML={{ __html: acques }}></div>:<p>Result</p>}
        </div>
        {!res?<div className="place_right">
                <textarea 
                id="placeans"
                type="text" 
                value={inputValue} 
                onChange={(e) => setInputValue(e.target.value)} 
                onKeyDown={handleKeyDown}
                placeholder="Start writing the Essay..."
            />
        </div>:<div className="place_right"><div dangerouslySetInnerHTML={{ __html: res }}></div></div>}</> :  <Typewriter
                        options={{
                            strings: !sub?['Searching Hot Topics...','Generating Question...']:['Submitting your answer...','Evaluating...'],
                            autoStart: true,
                            delay: 100,
                            loop:true
                        }}
                    /> )}</div>
        {ques && ((!sub && !res)?<button onClick={handleSubmit}>Submit</button>:<button onClick={()=>{navigate('/dashboard')}}>Home</button>)}
      </div>
    );
};

function Interview({setUrl,pdfId,setPdfId,setAts}){
  const ip = useIp()[0];
  const [link,setLink]=useState('');
  const [options,setOptions]=useState([]);
  const [shown,setShown] = useState(false);
  const [sub,setSub]=useState(false);
  const [status,setStatus]=useState(false);
  const navigate=useNavigate();

  const [openPicker, authResponse] = useDrivePicker();  
    const handleOpenPicker = () => {
            openPicker({
            clientId: "51460907741-bsckge5dghc0i68evh2o7s32ljr83klj.apps.googleusercontent.com",
            developerKey: "AIzaSyC2i0U6sQXh8ZA5aKLZool2Q40IlE5bEmA",
            viewId: "DOCS",
            showUploadView: true,
            showUploadFolders: true,
            supportDrives: true,
            multiselect: false,
            callbackFunction: (data) => {
                if (data.action === 'cancel') {
                    console.log('User clicked cancel/close button')
                    return;
                }
                if(data.docs && data.docs.length > 0)
                {
                    setUrl(data.docs[0].url);
                    setPdfId(data.docs[0].url);
                }
            },
        })
    }
    async function handleSubmit(){
        setStatus(true);
        var jobdes=document.getElementById('job-des').value;
        try {
            const formData = { job: jobdes,link: pdfId,var:0,query:'' };
            const response = await fetch(`${ip}/check_job`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log("User data retrieved successfully:", data);
            setOptions(data.options);
        }
        catch (error) {
            console.error("Error retrieving user data:", error);
        }
    }
    async function handleInterview(){
        
        try {
            const formData = {};
            const response = await fetch(link, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log("User data retrieved successfully:", data);
            setAts(data.ats);
            data.ats?navigate('/interchat'):navigate('/techchat');
        } catch (error) {
            console.error("Error retrieving user data:", error);
        }
    }

  return (
    <div className='sole'>
      {status ? <>{!options.length?<div className="interload"></div>:
       <div className='inter-options'>
        <table>
            <tr >
       <td id="iop" colSpan='2'><p>Which Interview would you like to proceed with?</p></td></tr>
       <td>
           {options.map((element)=>(
               <tr><button onClick={()=>{
                setLink(element.link);
                handleInterview();
               }}>{element.option}</button></tr>
           ))}
       </td></table>
   </div>}</> :<><div className="interview-main">
        <div className='logo'></div>
        <div className='chat-left'>
          <h1>Ace Your Interview<br></br>with<br></br><span style={{fontSize:"70px"}}><Typewriter
                          options={{
                              strings: [`CONFIDENCE`,'COURAGE','BOLDNESS'],
                              autoStart: true,
                              delay: 100,
                              loop:true
                          }}
                      /></span></h1>
          <table>
            <tr>
              <td><button id='start' onClick={()=>{
                setSub(!sub);
                sub?document.querySelector('.form').style.display="none":document.querySelector('.form').style.display="block";
                document.querySelector('.form').scrollIntoView({ behavior: 'smooth' });
              }}>Start<span className="arrow"> ➔</span></button></td>
              <td><button id='learn' onClick={()=>{
                setShown(!shown);
                shown?document.getElementById('desc').style.display="none":document.getElementById('desc').style.display="block";
              }}>{shown?"Show Less":"Learn More"}<span className="arrow"> ➔</span></button></td>
            </tr>
            <tr>
              <td colSpan={"2"}><p id='desc'>Introducing our AI Interview Chatbot, an innovative solution designed to streamline the interview process. This intelligent chatbot conducts interviews by analyzing user resumes and job profiles, tailoring questions to match the candidate's experience and the job requirements. Leveraging advanced natural language processing, the AI can assess responses in real-time, providing valuable insights into the candidate's skills, competencies, and suitability for the role. By simulating a human interviewer, our chatbot ensures a consistent and unbiased interview experience, saving time for HR teams and enhancing the candidate experience. This tool is perfect for initial screenings, allowing companies to efficiently identify top talent.</p></td>
            </tr>
          </table>
        </div>
        <div className='chat-right'></div>
      </div>
      <div className='form'>
        <h1 style={{fontSize:"40px"}}>Just a Step Ahead!!!</h1>
        <form onSubmit={handleSubmit}><table>
          <tr>
            <td>Enter Job Description : </td>
            <td id='tabright'><textarea id='job-des' placeholder='Type in here...' required></textarea></td>
          </tr>
          <tr>
            <td>Resume</td>
            <td id='tabright' className='form-upload'><input value={pdfId?"Uploaded":"Upload Now"} type="button" onClick={handleOpenPicker} disabled={!!pdfId} required></input></td>
          </tr>
          <tr>
            <td>Interview Level : </td>
            <td id='tabright'><select><option>Easy</option><option>Medium</option><option>Hard</option></select></td>
          </tr>
          <tr>
            <td id='tabright' className='form-submit' colSpan={"2"}><button type='submit'>Submit<span className="arrow"> ➔</span></button></td>
          </tr>
        </table></form>
        <div className='pic'></div>
      </div></>}
    </div>
  );
}
function InterviewChat({ats,setFeedback}) {
    const ip = useIp()[0];
    const [messages, setMessages] = useState([{ text: "Introducing Interview Pro, an AI Interview Bot designed by three 4th-year B.Tech students to revolutionize the experience of giving mock interviews. ", sender: 'model' }]);
    const [newMessage, setNewMessage] = useState('');
    const [recognizing, setRecognizing] = useState(false);
    const [ignoreOnEnd, setIgnoreOnEnd] = useState(false);
    const [finalTranscript, setFinalTranscript] = useState('');
    const [speechRecognition, setSpeechRecognition] = useState(null);
    const [started,setStarted]=useState(false);
    const navigate=useNavigate();
  
    useEffect(() => {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        alert('Speech Recognition is not supported in this browser.');
        return;
      }
  
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
  
      recognition.onstart = () => {
        setRecognizing(true);
        console.log('Speech recognition started.');
      };
  
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        if (event.error === 'no-speech') {
          console.log('No speech detected.');
          setIgnoreOnEnd(true);
        } else if (event.error === 'audio-capture') {
          console.log('Audio capture error.');
          setIgnoreOnEnd(true);
        } else if (event.error === 'not-allowed') {
          console.log('Speech recognition permission denied.');
          setIgnoreOnEnd(true);
        }
      };
  
      recognition.onend = () => {
        setRecognizing(false);
        if (ignoreOnEnd) return;
        console.log('Speech recognition ended.');
        if (!finalTranscript) {
          console.log('No transcript available.');
          return;
        }
        setMessages(prevMessages => [...prevMessages, { text: finalTranscript, sender: 'user' }]);
      };
  
      recognition.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';
    
        for (let i = 0; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }
    
        setNewMessage(finalTranscript + interimTranscript);
      };
  
      setSpeechRecognition(recognition);
    }, []);
  
    const startListening = () => {
      if (speechRecognition) {
        speechRecognition.lang = 'en-US';
        speechRecognition.start();
      }
    };
  
    const stopListening = () => {
      if (speechRecognition) {
        speechRecognition.stop();
      }
    };
  
    const handleMessageSubmit = async (event) => {
      event.preventDefault();
      if (newMessage.trim() === '') return;
      setMessages(prevMessages => [...prevMessages, { text: newMessage, sender: 'user' }]);
      setNewMessage('');
      
      try {
            const formData = { query: newMessage,var:1 };
            const response = await fetch(`${ip}/start`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const modelMessage = { text: data.question, sender: 'model' };
            setMessages(prevMessages => [...prevMessages, modelMessage]);
            const ttsOptions = {
                method: "POST",
                url: "https://api.edenai.run/v2/audio/text_to_speech",
                headers: {
                    authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZWQwMTE0OWEtNWY2OC00YzY5LWFiNjctOGVjNWExNjljNTliIiwidHlwZSI6InNhbmRib3hfYXBpX3Rva2VuIn0.H378WJs4B42P-oOJET09Y6hcJiDxfncB33xbYLtNJ_M",
                },
                data: {
                    providers: "openai",
                    language: "en",
                    text: data.question,
                    option: "FEMALE",
                    speed: 0.05
                }
              };
              axios.request(ttsOptions)
                .then(async (response) => {
                    console.log(response.data);
                    const encodedAudio = response.data.openai.audio;
                    const audioBuffer = Uint8Array.from(atob(encodedAudio), c => c.charCodeAt(0)).buffer;
                    saveAndPlayAudio(audioBuffer, 'tts_output.mp3');
                    if(data.feedback!='')
                    {
                        setFeedback(data.feedback);
                        navigate('/interlast');
                    }
                })
                .catch((error) => {
                    console.error('Error with text-to-speech:', error);
                });
              function saveAndPlayAudio(audioBuffer, filename = 'tts_output.mp3') {
                const blob = new Blob([audioBuffer], { type: 'audio/mp3' });
                const audioUrl = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = audioUrl;
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                const audio = new Audio(audioUrl);
                audio.play();
                audio.onended = () => {
                  console.log('Audio finished playing');
                  URL.revokeObjectURL(audioUrl);
                };
              }
            console.log("User data retrieved successfully:", data);
        } catch (error) {
            console.error("Error retrieving user data:", error);
        }
        setStarted(true);
    };
  
    const handleChange = (event) => {
      setNewMessage(event.target.value);
    };

    async function handleEnd(){
        try {
            const formData = { query: "end",var:1 };
            const response = await fetch(`${ip}/start`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setFeedback(data.feedback);
            navigate('/interlast');
            console.log("User data retrieved successfully:", data);
        } catch (error) {
            console.error("Error retrieving user data:", error);
        }
    }
  
    return (
      <div className="main-chat">
        <div className='logo'></div>
        <div className="rchat">
            <h1 style={{fontSize:"35px"}}>ATS</h1>
            <hr color="black"></hr>
            <div dangerouslySetInnerHTML={{ __html: ats }} id="atsp"></div>
            <button id="interend" onClick={handleEnd}>END INTERVIEW</button>
        </div>
        <div className="lchat">
          <div className='chat-msgs'>
            {messages.length !== 0 && (
              <div className="messages">
                {messages.map((message, index) => (
                  <div key={index} className={`message ${message.sender}`}>
                    <p>{message.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className='chat-options'>
            <button id='mic' onClick={recognizing ? stopListening : startListening}></button>
            <input
              type='text'
              placeholder={!started?'Type "start" to Start...':'Enter your Answer...'}
              id='msgbox'
              value={newMessage}
              onChange={handleChange}
            />
            <button id='send' onClick={handleMessageSubmit}></button>
          </div>
        </div>
      </div>
    );
  }
  
function Interlast({feedback}){
    const ip = useIp()[0];
    async function handleDownload(){
        try {
            const formData = {};
            const response = await fetch(`${ip}/download`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            window.location.href = data.link;
            console.log("User data retrieved successfully:", data);
        } catch (error) {
            console.error("Error retrieving user data:", error);
        }
    }
    const navigate=useNavigate();

    return (
        <div className="interlast">
            <div className="logo"></div>
            <div className="res-right">
                <div className="feed-head"><h1>FEEDBACK SUMMARY</h1></div>
                <div dangerouslySetInnerHTML={{ __html: feedback }} id="inter-feed"></div>
                <div className="interend-options"><button id="inter-download" onClick={handleDownload}>Download PDF</button><button onClick={()=>{navigate('/dashboard')}} id="inter-home">HOME</button></div>
            </div>
            <div className="res-left">
                <h1>INTERVIEW COMPLETED SUCCESSFULLY</h1>
            </div>
        </div>
    );
}

function TechChat({setFeedback}){
    const ip = useIp()[0];
    const navigate=useNavigate();
    const [language,setLanguage]=useState('');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState([]);
    const [editor, setEditor] = useState(null);
    const [messages, setMessages] = useState([{ text: "Introducing Interview Pro, an AI Interview Bot designed by three 4th-year B.Tech students to revolutionize the experience of giving mock interviews. ", sender: 'model' }]);
    const [newMessage, setNewMessage] = useState('');
    const [recognizing, setRecognizing] = useState(false);
    const [ignoreOnEnd, setIgnoreOnEnd] = useState(false);
    const [finalTranscript, setFinalTranscript] = useState('');
    const [speechRecognition, setSpeechRecognition] = useState(null);
    const [started,setStarted]=useState(false);

    useEffect(() => {
        if(editor===null)
        {
            const initEditor = codemirror.fromTextArea(document.getElementById('editor'), {
                mode: 'text/x-c++src',
                theme: 'dracula',
                lineNumbers: true,
                autoCloseBrackets: true,
            });
            initEditor.setSize('100%', '82%');
            setEditor(initEditor);
        }
    }, []);

    useEffect(() => {
        if (editor) {
            const mode = language === 'Java' ? 'text/x-java' : language === 'Python' ? 'text/x-python' : 'text/x-c++src';
            editor.setOption('mode', mode);
        }
    }, [language, editor]);

    async function sendCode(codeData,outputData){
        try {
            await fetch(`${ip}/technical`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    query:"",
                    code:codeData,
                    output:outputData.output
                }),
                })
                .then((response) => response.json())
                .then((data) => {
                    const modelMessage = { text: data.question, sender: 'model' };
                    setMessages(prevMessages => [...prevMessages, modelMessage]);
                    const ttsOptions = {
                        method: "POST",
                        url: "https://api.edenai.run/v2/audio/text_to_speech",
                        headers: {
                            authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZWQwMTE0OWEtNWY2OC00YzY5LWFiNjctOGVjNWExNjljNTliIiwidHlwZSI6InNhbmRib3hfYXBpX3Rva2VuIn0.H378WJs4B42P-oOJET09Y6hcJiDxfncB33xbYLtNJ_M",
                        },
                        data: {
                            providers: "openai",
                            language: "en",
                            text: data.question,
                            option: "FEMALE",
                            speed: 0.05
                        }
                        };
                        axios.request(ttsOptions)
                        .then(async (response) => {
                            console.log(response.data);
                            const encodedAudio = response.data.openai.audio;
                            const audioBuffer = Uint8Array.from(atob(encodedAudio), c => c.charCodeAt(0)).buffer;
                            saveAndPlayAudio(audioBuffer, 'tts_output.mp3');
                            if(data.feedback!='')
                            {
                                setFeedback(data.feedback);
                                navigate('/interlast');
                            }
                        })
                        .catch((error) => {
                            console.error('Error with text-to-speech:', error);
                        });
                    console.log("User data retrieved successfully:", data);
                })
        } catch (error) {
            console.error('Error compiling code:', error);
            setOutput(['Error compiling code']);
        }
    }

    const handleRunCode = async () => {
        try {
            fetch("http://localhost:3002/https://api.jdoodle.com/v1/execute", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    clientId: "e8241518a5cb45bc02c5c059db460962",
                    clientSecret: "48cbb2ecc91bd8eee18fa9fdbc356f900733f23d6399a69f74f3ec9fb7f56e7d",
                    script: `${editor.getValue()}`,
                    stdin: "",
                    language: language.toLowerCase(),
                    versionIndex: "3",
                    compileOnly: false,
                }),
                })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Success:", data);
                    setOutput(data);
                    var code=document.getElementById('editor').value;
                    if(output.isExecutionSuccess)
                    sendCode(editor.getValue(),data);
                })
        } catch (error) {
            console.error('Error compiling code:', error);
            setOutput(['Error compiling code']);
        }
    };

    function saveAndPlayAudio(audioBuffer, filename = 'tts_output.mp3') {
        const blob = new Blob([audioBuffer], { type: 'audio/mp3' });
        const audioUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = audioUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        const audio = new Audio(audioUrl);
        audio.play();
        audio.onended = () => {
          console.log('Audio finished playing');
          URL.revokeObjectURL(audioUrl);
        };
      }

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
          alert('Speech Recognition is not supported in this browser.');
          return;
        }
    
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
    
        recognition.onstart = () => {
          setRecognizing(true);
          console.log('Speech recognition started.');
        };
    
        recognition.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          if (event.error === 'no-speech') {
            console.log('No speech detected.');
            setIgnoreOnEnd(true);
          } else if (event.error === 'audio-capture') {
            console.log('Audio capture error.');
            setIgnoreOnEnd(true);
          } else if (event.error === 'not-allowed') {
            console.log('Speech recognition permission denied.');
            setIgnoreOnEnd(true);
          }
        };
    
        recognition.onend = () => {
          setRecognizing(false);
          if (ignoreOnEnd) return;
          console.log('Speech recognition ended.');
          if (!finalTranscript) {
            console.log('No transcript available.');
            return;
          }
          setMessages(prevMessages => [...prevMessages, { text: finalTranscript, sender: 'user' }]);
        };
    
        recognition.onresult = (event) => {
          let finalTranscript = '';
          let interimTranscript = '';
      
          for (let i = 0; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript + ' ';
            } else {
              interimTranscript += transcript;
            }
          }
      
          setNewMessage(finalTranscript + interimTranscript);
        };
    
        setSpeechRecognition(recognition);
      }, []);
    
      const startListening = () => {
        if (speechRecognition) {
          speechRecognition.lang = 'en-US';
          speechRecognition.start();
        }
      };
    
      const stopListening = () => {
        if (speechRecognition) {
          speechRecognition.stop();
        }
      };
    
      const handleMessageSubmit = async (event) => {
        event.preventDefault();
        if (newMessage.trim() === '') return;
        setMessages(prevMessages => [...prevMessages, { text: newMessage, sender: 'user' }]);
        setNewMessage('');
        
        try {
              const formData = { query: newMessage,var:1 };
              const response = await fetch(`${ip}/technical`, {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json"
                  },
                  body: JSON.stringify(formData)
              });
      
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              const data = await response.json();
              const modelMessage = { text: data.question, sender: 'model' };
              setMessages(prevMessages => [...prevMessages, modelMessage]);
              const ttsOptions = {
                  method: "POST",
                  url: "https://api.edenai.run/v2/audio/text_to_speech",
                  headers: {
                      authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZWQwMTE0OWEtNWY2OC00YzY5LWFiNjctOGVjNWExNjljNTliIiwidHlwZSI6InNhbmRib3hfYXBpX3Rva2VuIn0.H378WJs4B42P-oOJET09Y6hcJiDxfncB33xbYLtNJ_M",
                  },
                  data: {
                      providers: "openai",
                      language: "en",
                      text: data.question,
                      option: "FEMALE",
                      speed: 0.05
                  }
                };
                axios.request(ttsOptions)
                  .then(async (response) => {
                      console.log(response.data);
                      const encodedAudio = response.data.openai.audio;
                      const audioBuffer = Uint8Array.from(atob(encodedAudio), c => c.charCodeAt(0)).buffer;
                      saveAndPlayAudio(audioBuffer, 'tts_output.mp3');
                      if(data.feedback!='')
                      {
                        setFeedback(data.feedback);
                        navigate('/interlast');
                      }
                  })
                  .catch((error) => {
                      console.error('Error with text-to-speech:', error);
                  });
              console.log("User data retrieved successfully:", data);
          } catch (error) {
              console.error("Error retrieving user data:", error);
          }
          setStarted(true);
      };
    
      const handleChange = (event) => {
        setNewMessage(event.target.value);
      };

      async function handleEnd(){
        try {
            const formData = { query: "end",var:1 };
            const response = await fetch(`${ip}/technical`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setFeedback(data.feedback);
            navigate('/interlast');
            console.log("User data retrieved successfully:", data);
        } catch (error) {
            console.error("Error retrieving user data:", error);
        }
    }

    return (
        <div className="techmain">
            <div className="logo"></div>
            <div className="dash_nav">
                <ul><li><button onClick={()=>navigate('/dashboard')}>HOME</button></li>
                <li><button onClick={()=>navigate('/interview')}>PRACTICE INTERVIEW</button></li>
                <li><button onClick={()=>navigate('/friends')}>FRIENDS</button></li>
                <li><button onClick={()=>navigate('/contact')}>CONTACT US</button></li>
                <li><button onClick={()=>navigate('/about')}>ABOUT US</button></li></ul>
            </div>
            <div className="techno-chat">
                <div className="techbot">
                    <div id="techbot-header">
                        <div
                            class="card-header d-flex justify-content-between align-items-center p-3 text-white border-bottom-0"
                            style={{ borderTopLeftRadius: "15px", borderTopRightRadius: "15px" , backgroundColor: "rgb(39,42,54)"}}>
                            <i class="fas fa-angle-left"></i>
                            <p class="mb-0 fw-bold">Live chat</p>
                            <i class="fas fa-times"></i>
                        </div>
                    </div>
                    <div className="chat-section">
                        {messages.map((message, index) => (
                            <div key={index} className={`message ${message.sender}`} id={`${message.sender}`}>
                                <p style={{fontSize:"20px"}}>{message.text}</p>
                            </div>
                            ))}
                    </div>
                    <div className="tech-chat-opt">
                        <form onSubmit={handleMessageSubmit}>
                            <button id='micc' onClick={recognizing ? stopListening : startListening}></button>
                            <input
                            type='text'
                            placeholder={!started?'Type "start" to Start...':'Enter your Answer...'}
                            id='msgboxc'
                            value={newMessage}
                            onChange={handleChange}
                            />
                            <button type="submit" id='sendc'></button>
                        </form>
                    </div> 
                </div>
                <div className="editor">
                    <div className="d-flex justify-content-between mb-2 bg-dark rounded p-2">
                        <div className="col-12 w-25">
                            <select
                                className="form-select"
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                            >
                                <option value="Java">Java</option>
                                <option value="Cpp">Cpp</option>
                                <option value="Python3">Python</option>
                            </select>
                        </div>
                        <div>
                            <button type="button" id="run" className="btn btn-success" onClick={handleRunCode}>
                                Run <i className="bi bi-play-fill"></i>
                            </button>
                        </div>
                        <div>
                            <button style={{backgroundColor:"red",border:"none"}} type="button" id="endbtn" className="btn btn-success" onClick={handleEnd}>
                                End Interview
                            </button>
                        </div>
                    </div>
                    <textarea id="editor" className="form-control" aria-label="Code Editor"></textarea>
                    <div className="d-flex justify-content-between bg-dark rounded p-2 mt-2">
                        <ul className="list-group exec-code">
                            {output?(output.isExecutionSuccess?<>
                                <li style={{backgroundColor:'green'}}>Output : {output.output}</li>
                                <li>CPU Time : {output.cpuTime}</li>
                                <li>Memory : {output.memory}</li>
                            </>:<li style={{backgroundColor:'red'}}>Error : {output.output}</li>):<li>Compiled Output is Shown Here</li>}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
  

function Friends(){

}

function Contact(){
    
}

function About(){

}
