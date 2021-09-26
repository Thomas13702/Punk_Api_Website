import Head from "next/head";
import { useRouter } from "next/router";
import Header from "./Header";
import Footer from "./Footer";
import styles from "@/styles/Layout.module.css";

export default function Layout({
  title,
  keywords,
  description,
  children,
  uid,
}) {
  console.log("1" + uid);
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <Header uid={uid} />

      {/* checks to see if we are on the home page */}
      <div className={styles.container}>{children}</div>
      <Footer />
    </div>
  );
}
