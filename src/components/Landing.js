import CryptoJS from "crypto-js";
import { useState } from "react";
import React from "react";
import "./Landing.css";
// import copy from "react-copy-to-clipboard";

export default function Landing() {
  const [text, setText] = useState("");
  const [screen, setScreen] = useState("encrypt");

  const [encrptedData, setEncrptedData] = useState("");
  const [decrptedData, setDecrptedData] = useState("");

  const secretPass = "XkhZG4fW2t2W";

  const encryptData = () => {
    const data = CryptoJS.AES.encrypt(
      JSON.stringify(text),
      secretPass
    ).toString();

    setEncrptedData(data);
  };

  const decryptData = () => {
    const bytes = CryptoJS.AES.decrypt(text, secretPass);
    const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    setDecrptedData(data);
  };

  const switchScreen = (type) => {
    setText("");
    setEncrptedData("");
    setDecrptedData("");
    setScreen(type);
  };

  const handleClick = () => {
    if (!text) return;

    if (screen === "encrypt") encryptData();
    else decryptData();
  };

  // const handlecopy = () => {
  //   if (screen === "encrypt") {
  //     copy(encrptedData);
  //   } else copy(decrptedData);
  // };

  return (
    <>
      <div className="container">
        <div className="encrypt-decrypt">
          <button
            className="btn btn-left mx-1"
            style={{
              backgroundColor: screen === "encrypt" ? "#ffff00" : "#1e88e530",
            }}
            onClick={() => {
              switchScreen("encrypt");
            }}
          >
            Encrypt
          </button>

          <button
            className="btn btn-right mx-1"
            style={{
              backgroundColor: screen === "decrypt" ? "#ffff00" : "#1e88e530",
            }}
            onClick={() => {
              switchScreen("decrypt");
            }}
          >
            Decrypt
          </button>
        </div>

        <div className="card">
          <input
            value={text}
            onChange={({ target }) => {
              setText(target.value);
            }}
            name="text"
            type="text"
            placeholder={
              screen === "encrypt" ? "Enter Text" : "Enter Encrypted Data"
            }
          />

          <button className="btn submit-btn" onClick={handleClick}>
            {screen === "encrypt" ? "Encrypt" : "Decrypt"}
          </button>
        </div>

        {encrptedData || decrptedData ? (
          <div className="content">
            <button
              className="btn btn-danger"
              onClick={() => {
                screen === "encrypt"
                  ? navigator.clipboard.writeText(encrptedData).then(
                    ()=>{
                        alert("TEXT - COPIED");
                    },
                    ()=>{
                        alert("TEXT - NOT - COPIED");
                    })
                  : navigator.clipboard.writeText(decrptedData).then(
                    ()=>{
                        alert("TEXT - COPIED");
                    },
                    ()=>{
                        alert("TEXT - NOT - COPIED");
                    });
              }}
            >
              Copy -&nbsp;
              <label>{screen === "encrypt" ? "Encrypted" : "Decrypted"}</label>
            </button>
            {/* <label>
              {screen === "encrypt" ? "Encrypted" : "Decrypted"}
            </label>
            <p>{screen === "encrypt" ? encrptedData : decrptedData}</p> */}
          </div>
        ) : null}
      </div>
    </>
  );
}
