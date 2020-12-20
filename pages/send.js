import Head from "next/head";
import React, { useState } from "react";
import Footer from "../components/Footer";
import styles from "../styles/Home.module.css";

export default function Send() {
  const [secret, setSecret] = useState("");
  const [uuid, setUuid] = useState("");

  const handleChange = event => {
    setSecret(event.target.value);
  }

  const submit = async () => {
    if(!secret) { return 0 }
    fetch("/api/send", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        secret: secret
      })
    }).then(res => {
      if(res.status === 200) {
        setSecret("");
        return res.json();
      }else{
        alert(res.error);
        return false;
      }
    })
    .then(data => {
      if(data){
        setUuid(data.uuid);
      }
    }); 
  }

  const copy = () => {
    navigator.clipboard.writeText(uuid);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Secret Share</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {uuid 
          ? 
          (
            <React.Fragment>
              <h3>Your secret retrieval code is {uuid}.</h3>
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
            <p>Enter the text you would like to share. Submit to get your retrieval code.</p>
            <input
              className={styles.input}
              type="password"
              value={secret}
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
          )}
      </main>
      <Footer />
    </div>
  );
}
