import styles from "@/styles/Favourites.module.css";
import Layout from "@/components/Layout";
import nookies from "nookies";
import { verifyIdToken } from "../firebaseAdmin";
import firebaseClient from "../firebaseClient";

import { useEffect, useState } from "react";

export default function Favourites({ session, uid1 }) {
  firebaseClient();

  return (
    <Layout title="Favourites" uid={uid1}>
      {uid1 ? (
        <>
          <div></div>
        </>
      ) : (
        <>
          <h1 className={styles.loggedOut}>
            Please Login or Register to add to your favourites
          </h1>
        </>
      )}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  try {
    let uid1 = null;
    const cookies = nookies.get(context);
    // console.log(cookies.token !== "");
    if (cookies.token !== "" && cookies.token !== undefined) {
      const token = await verifyIdToken(cookies.token);
      // console.log(cookies.token);
      const { uid, email } = token;
      uid1 = uid;
    }

    return {
      props: { uid1 },
    };
  } catch (err) {
    console.log(err);
    context.res.writeHead(302, { Location: "/login" });
    //context.res.end();
    return { props: {} };
  }
}
