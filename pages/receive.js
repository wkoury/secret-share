import Head from "next/head";
import React, { useState } from "react";
import Footer from "../components/Footer";
import styles from "../styles/Home.module.css";
const copy = require('copy-text-to-clipboard');

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
        setSecret(data.secret);
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
        {secret
          ?
          (
            <React.Fragment>
              <h3>Your secret is:</h3>
              <h2 onClick={() => copy(secret)}>{secret}</h2>
            </React.Fragment>
          )
          :
          (
            <React.Fragment>
              <input
                type="text"
                value={uuid}
                onChange={e => handleChange(e)}
              >
              </input>
              <button
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
