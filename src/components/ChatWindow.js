import { useState } from "react";
import axios from "axios";
const ChatWindow = () => {
    let [question, setQuestion] = useState("");
    let [answer, setAnswer] = useState("");
    let [visible, setVisibel] = useState(true);
    async function answerGenerator() {
        setAnswer("Loading...");
        const response = await axios({
            url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDWtaXpidtiMu1T_dtYvxRVcAakwgTJpFo",
            method: "post",
            data: {
                contents: [
                    {
                        parts: [
                            {
                                text:
                                    "you are a chat bot named Destina and youre a travel guide which tells the user about places they can visit, with a little info about that place, temprature and weather   and also about the destinations, now i will ask you the queries i have" +
                                    question,
                            },
                        ],
                    },
                ],
            },
        });
        // setAnswer=
        setAnswer(response.data.candidates[0].content.parts[0].text);
    }

    return (
        <>
            <div className="destina">
                <div className="botHeader">
                    <div className="botTitleBar" onClick={() => {}}>
                        <div>Desti₪a</div>
                        <div>▼</div>
                    </div>
                    <div className="botAnswer">{answer}</div>
                </div>
                <div className="botBody">
                    <textarea
                        className="botTextArea"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        cols={"50"}
                        rows={"2"}
                    ></textarea>
                    <button className="botButton" onClick={answerGenerator}>
                        {"👍🏻"}
                    </button>
                </div>
            </div>
        </>
    );
};
export default ChatWindow;
