import Head from "next/head";
import React, { useState } from "react";
import Footer from "../components/Footer";
import styles from "../styles/Home.module.css";

export default function Receive() {
  const [uuid, setUuid] = useState("");
  const [secret, setSecret] = useState("");

  const handleChange = event => {
    setUuid(event.target.value);
  }

  const submit = () => {
    fetch("/api/receive/?" + new URLSearchParams({uuid: uuid})).then(res => {
      if(res.status === 200) {
        setUuid("");
        return res.json();
      }else{
        alert(res.error);
        return false;
      }
    })
    .then(data => {
      if(data){
        if(data.DNE === true){
          alert("This secret does not appear to exist!");
          return;
        }
        console.log(data);
        setSecret(data.secret);
      }
    });
  }

  const copy = () => {
    navigator.clipboard.writeText(secret);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Secret Share</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {secret
          ?
          (
            <React.Fragment>
              <h3>Your secret is:</h3>
              <h2 onClick={() => copy(secret)}>{secret}</h2>
              <button 
                className={styles.submit}
                onClick={() => copy()}
              >
                Copy
              </button>
            </React.Fragment>
          )
          :
          (
            <React.Fragment>
              <p>Enter your retrieval code.</p>
              <input
                className={styles.input}
                type="password"
                value={uuid}
                onChange={e => handleChange(e)}
              >
              </input>
              <button
                className={styles.submit}
                onClick={() => submit()}
              >
                Submit
              </button>
            </React.Fragment>
          )
        }
      </main>

      <Footer />
    </div>
  )
}
