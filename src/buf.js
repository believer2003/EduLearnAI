function InterviewChat({ats,setFeedback}) {
    const [messages, setMessages] = useState([]);
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
            const response = await fetch('https://966d-2401-4900-1c61-617a-45bc-7017-8eb6-bbae.ngrok-free.app/start', {
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
            let utterance = new SpeechSynthesisUtterance(data.question);
            let voices=speechSynthesis.getVoices();
            utterance.voice = voices[160];
            utterance.pitch = 1.1;
            utterance.rate = 0.7;
            speechSynthesis.speak(utterance);
            utterance.onend = function(event) {
                if (data.feedback != '') {
                    setFeedback(data.feedback);
                    navigate('interlast');
                }
            };
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
            const response = await fetch('https://966d-2401-4900-1c61-617a-45bc-7017-8eb6-bbae.ngrok-free.app/start', {
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

    async function handleDownload(){
        try {
            const formData = {};
            const response = await fetch('https://966d-2401-4900-1c61-617a-45bc-7017-8eb6-bbae.ngrok-free.app/download', {
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