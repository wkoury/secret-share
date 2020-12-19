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

  return (
    <div className={styles.container}>
      <Head>
        <title>Secret Share</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {uuid 
          ? 
            <h3>Your secret retrieval code is {uuid}.</h3>
          : 
          (
          <React.Fragment>
            <input
              type="text"
              value={secret}
              onChange={e => handleChange(e)}
            >
            </input>
            <button
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
