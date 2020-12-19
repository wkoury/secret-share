import Head from "next/head";
import styles from "../styles/Home.module.css";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Secret Share</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Secret Share!
        </h1>

        <div className={styles.grid}>
          <a href="/receive" className={styles.card}>
            <h3>Receive</h3>
            <p>Securely receive a secret.</p>
          </a>

          <a href="/send" className={styles.card}>
            <h3>Send</h3>
            <p>Securely send a secret.</p>
          </a>
        </div>
      </main>

      <Footer />
    </div>
  )
}
