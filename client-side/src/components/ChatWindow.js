require("dotenv").config();
import { useState } from "react";
import axios from "axios";
const ChatWindow = () => {
    const googlegeminiApiKEY = process.env.GOOGLEGEMINI_API_KEY;
    let [question, setQuestion] = useState("");
    let [answer, setAnswer] = useState("");
    let [visible, setVisible] = useState(false);
    async function answerGenerator() {
        setAnswer("Loading...");
        const response = await axios({
            url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${googlegeminiApiKEY}`,
            method: "post",
            data: {
                contents: [
                    {
                        parts: [
                            {
                                text:
                                    "You are a chatbot named Destina and you're a travel guide. Tell the user about places they can visit, including a little info about that place, temperature and weather, and things to do in those places. Provide the answer in an ordered list and the info in points as an unordered list, formatted with proper HTML tags like heading tag paragraph tag , list tags, use br tags also after each parahgraph,increase readability without using asterisks (*). Make sure the solution includes proper formatting, meaning switching lines where necessary. Now I will ask you the queries I have:" +
                                    question,
                            },
                        ],
                    },
                ],
            },
        });
        setAnswer(response.data.candidates[0].content.parts[0].text);
    }
    let isVisible = visible ? "" : "botNotVisible";
    let shapeChange = visible ? "" : "botShapeChange";

    return (
        <>
            <div className={`destina ${shapeChange}`}>
                <div className="botHeader">
                    <div
                        className={`botTitleBar ${shapeChange}`}
                        onClick={() => {
                            setVisible(!visible);
                        }}
                    >
                        <div>Desti₪a</div>
                        <div>{visible ? "▼" : "▲"}</div>
                    </div>
                    {/* <div className="botAnswer">{answer}</div> */}
                    {visible && (
                        <div
                            className={`botAnswer ${isVisible}`}
                            dangerouslySetInnerHTML={{ __html: answer }}
                        />
                    )}
                </div>
                <div className={`botBody ${isVisible} `}>
                    <textarea
                        className="botTextArea"
                        id="botArea"
                        name="botTextArea"
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
