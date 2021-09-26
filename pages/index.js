import Layout from "@/components/Layout";
import Card from "@/components/Card";
import styles from "../styles/Home.module.css";
import nookies from "nookies";
import { verifyIdToken } from "../firebaseAdmin";
import firebaseClient from "../firebaseClient";

export default function Home({ data, uid1 }) {
  firebaseClient();
  return (
    <Layout uid={uid1}>
      <div className={styles.feed}>
        {data.map((beer) => (
          <Card key={beer.id} data={beer} />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  try {
    let uid1 = null;
    const cookies = nookies.get(context);
    // console.log(cookies.token !== "");
    if (cookies.token !== "") {
      const token = await verifyIdToken(cookies.token);
      // console.log(cookies.token);
      const { uid, email } = token;
      uid1 = uid;
    }

    const res = await fetch(
      `https://api.punkapi.com/v2/beers?page=1&per_page=50`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(uid1);

    const data = await res.json();

    return {
      props: { data, uid1 },
    };
  } catch (err) {
    console.log(err);
    return { props: { data: "Uh oh" } };
  }
}
