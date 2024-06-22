import React from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  setDoc,
  getFirestore,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../util/firebase";
import { db } from "../util/firebase";
import AddKeyBanner from "../components/AddKeyBanner";
import { SendOutlined } from "@mui/icons-material";

//gemini stuff
import { GoogleGenerativeAI } from "@google/generative-ai";
import Loader from "../components/Loader";
import SideNav from "../components/SideNav";
import TopNav from "../components/TopNav";
// import.meta.env.VITE_GEMINI_KEY

const Dashboard = () => {
  const [userName, setUserName] = useState("");
  const [promptInput, setPromptInput] = useState("");
  const [selectedPromptId, setSelectedPromptId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setResponse] = useState("");

  //gemini api key CHORE: Fetch uploaded api key from firebase
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY);

  const navigate = useNavigate();

  // define pre-defined prompts
  const preDefinedPrompts = [
    {
      id: 1,
      text: "I have a test to prepare for next week Monday give me a schedule with these courses and their intensity...",
    },
    {
      id: 2,
      text: "I have a test to prepare for next week Monday give me a schedule with these courses and their intensity...",
    },
    {
      id: 3,
      text: "I have a test to prepare for next week Monday give me a schedule with these courses and their intensity...",
    },
    {
      id: 4,
      text: "Me have a test to prepare for next week Monday give me a schedule with these courses and their intensity...",
    },
  ];

  const handlePromptSelection = (prompt) => {
    if (selectedPromptId === prompt.id) {
      setPromptInput("");
      setSelectedPromptId(null);
    } else {
      setPromptInput(prompt.text);
      setSelectedPromptId(prompt.id);
    }
  };

  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");

    if (authToken) {
      navigate("/app");
    }

    if (!authToken) {
      navigate("/");
      console.log("Please login");
    }

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const userName = user.displayName.split(" ")[0];
        createUserDocument(uid, user);
        setUserName(userName);
      } else {
        console.log("user is logged out");
        navigate("/");
      }
    });

    const createUserDocument = async (uid, user) => {
      const userRef = doc(db, "users", uid);
      const userData = {
        uid,
        email: user.email,
        api_key,
      };
      await setDoc(userRef, userData);
    };
  }, []);

  //gemini schema: chore: further fine-tunining
  //CHORE: Make start-time, end-time formats to be in 
  const schema = `
  {
    "description": "Event schedule information",
    "type": "object",
    "properties": {
      "scheduleTitle": {
        "type": "string",
        "description": "Title of the event schedule"
      },
      "eventDate": {
        "type": "string",
        "description": "Today's date in ISO 8601 format"
      },
      "events": {
        "type": "array",
        "description": "Array of event objects",
        "items": {
          "type": "object",
          "properties": {
            "title": {
              "type": "string",
              "description": "short title of the event"
            },
            "start": {
              "type": "string",
              "description": "Start time of the event in ISO 8601 format"
            },
            "end": {
              "type": "string",
              "description": "End time of the event in ISO 8601 format format"
            },
            "eventDescription": {
              "type": "string",
              "description": "Description of the event"
            },
            "eventProgress": {
              "type": "number",
              "description": "Progress of the event (between 0 and 1)"
            },
            "eventCompleted": {
              "type": "boolean",
              "description": "Boolean indicating if the event is completed"
            }
          },
          "required": [
            "eventName",
            "start",
            "end"
          ]
        }
      }
    },
    "required": [
      "scheduleTitle",
      "eventDate",
      "events"
    ]
  }
  
  `;

  //gemini prompt
  const si = `
       You are a time management expert and you are to create a professional schedule timeline based on ${promptInput}.
       your response will be used to create a firebase document and then into the reactjs fullcalender draggeable calender timeline so therefore your response must be valid JSON that can be used in firebase firestore documents it must have the following schema:
       
       * Title: general title/name of the schedule based on the ${promptInput}
       * Event name: Name of the event based on the context of ${promptInput}
       * Event date: Today's date in ISO 8601 format
       * Event description: a short description of what is to be done be based on ${promptInput} for each event
       * Event start: the time and current date the event will start in ISO 8601 format 
       * Event end: the time and current date the event will end in ISO 8601 format
       `;
  const model = genAI.getGenerativeModel(
    {
      model: "gemini-1.5-pro-latest",
      systemInstruction: {
        parts: [{ text: si }],
        role: "model",
      },
    },
    { apiVersion: "v1beta" }
  );

  async function aiRun(text) {
    setIsLoading(true);
    setResponse("");

    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
      response_mime_type: "application/json",
      responseSchema: JSON.parse(schema),
    };

    const parts = [{ text }];

    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
    });

    const response = result.response;

    // console.log(response.candidates[0].content.parts[0].text);

    //store data in firebase
    const collectionRef = collection(db, "schedules");
    const data = JSON.parse(response.candidates[0].content.parts[0].text);

    addDoc(collectionRef, data)
      .then((docRef) => {
        console.log("Document successfully written");
        console.log(docRef.id);
        setResponse({ response });
        setIsLoading(false);
        navigate(`/schedules/${docRef.id}`);
      })
      .catch((error) => {
        console.log("Error writing document: ", error);
        setResponse({ error: "Failed to store data" });
        setIsLoading(false);
      });
  }

  /* CHORES:
  1. Prompt: take users prompt from input field ✅
  2. Pre-defined prompt: when users click on a pre-defined prompt this should update the state with that data ✅
  3. Schedule creation: on submission of prompt
       i. run the current prompt with the gemini api logic ✅
       ii. grab the response and create a firebase firestore document ✅
       iii. pass the response data (important parts i.e event title, event date etc) as responseData and populate the document ✅
       iv. on sidebar grab the documents titles and ids and on click useParams uses the ids to grab the document data from firebase ✅
       v. pass the data from firebase (e.g event title, data and time) to fullcallender timeline
       vi. allow editing of events data such as "eventTitle", "eventStart" and "eventEnd"
       ---------------------------- Completion of stage one ---------------------------------------------
   4. Prompt engineering: fine-tune prompt to always return the response i need and also check out edge cases ✅
       i. the user doesn't input his/her own timelines or event details; this should generate an example template in that case
       ii. the user misses out on some event timelines; this should auto-fill such gaps with logical data ✅
       iii. the gemini prompt engineering should make gemini api be a "smart online scheduler for people with time management issues" ✅
       ---------------------------- beginning of stage two ----------------------------------------------
   5. Enable google calendar api: modification of the function to also add the events and data into the sign in users google calendar
       i. then a button that allows the users visit the calandar to view the schedule in the gc timeline
   6. Schedules ownership: Fetch only the authenticated users schdules and events
   7. Api key: small modification to allow users use their own api key (fetch from /users in firebase) as a fallback if my own api key is exhausted
      ----------------------------- incoroporate unit tests ---------------------------------------------  
  */

  const handlePrompt = (e) => {
    setPromptInput(e.target.value);
  };

  const handleScheduleCreation = () => {
    // logic goes here
    aiRun(promptInput);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <SideNav />
          <TopNav />
          <div className="ml-72 mr-10 mt-8">
            <div className="w-full">
              <main className="main flex flex-grow flex-col transition-all duration-150 ease-in md:ml-0">
                <div className="p-3">
                  <AddKeyBanner />
                  <div className="bg-white mt-5 rounded-[30px]">
                    <div className="p-10">
                      <h1 className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text font-inter font-semibold text-[40px]">
                        Hello, {userName}
                      </h1>
                      <h1 className="font-inter font-medium text-[35px] text-[#C4C4C4]">
                        What are you scheduling today?
                      </h1>
                    </div>
                    {/* Example prompts */}
                    {/* CHORE: make this resuable and once clicked pushed to prompt-state allowing the user modify and send as prompt */}
                    <div className="grid grid-cols-4 gap-4 p-8 m-auto">
                      {preDefinedPrompts.map((prompt) => (
                        <div
                          key={prompt.id || Math.random()}
                          onClick={() => handlePromptSelection(prompt)}
                          className={`bg-[#F8F9FC] rounded-[15px] p-6 h-[240px] cursor-pointer ${
                            selectedPromptId === prompt.id
                              ? "bg-blue-500 text-white"
                              : "bg-[#F8F9FC] text-gray-800"
                          }`}
                        >
                          <p className="font-inter font-light text-[15px] w-full text-ellipsis overflow-hidden ...">
                            {prompt.text}
                          </p>
                        </div>
                      ))}
                    </div>
                    {/* Input for prompting */}
                    <div className="p-8 mt-[-20px]">
                      <input
                        value={promptInput}
                        onChange={handlePrompt}
                        className="bg-[#F8F9FC] font-inter text-[14px] p-5 w-full rounded-full"
                        placeholder="Enter what needs to be scheduled"
                        type="text"
                      />
                      {promptInput ? (
                        <SendOutlined
                          onClick={() => handleScheduleCreation()}
                          className="absolute m-3"
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
