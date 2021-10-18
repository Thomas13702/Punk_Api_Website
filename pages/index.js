import Layout from "@/components/Layout";
import Card from "@/components/Card";
import styles from "../styles/Home.module.css";
import nookies from "nookies";
import { verifyIdToken } from "../firebaseAdmin";
import firebaseClient from "../firebaseClient";
import { NEXT_URL } from "@/config/index";

export default function Home({ data, uid1, favouriteIds }) {
  firebaseClient();

  console.log(favouriteIds);
  return (
    <Layout uid={uid1}>
      <div className={styles.feed}>
        {data !== "Uh oh" ? (
          data.map((beer, index) => (
            <Card
              key={beer.id}
              data={beer}
              favouriteIds={favouriteIds}
              key={index}
            />
          ))
        ) : (
          <h1>Whoops, something went wrong!</h1>
        )}
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  try {
    let uid1 = null;
    let favourites = null;
    const cookies = nookies.get(context);

    if (cookies.token !== "" && cookies.token !== undefined) {
      const token = await verifyIdToken(cookies.token);

      const { uid, email } = token;
      uid1 = uid;
      // console.log(uid1);

      const userFavorites = await fetch(`${NEXT_URL}/api/getFavourites`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
      });

      favourites = await userFavorites.json();
      // console.log(favourites);
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

    const data = await res.json();

    const favouriteIds = favourites.map((favourite) => favourite.favourite);
    // console.log(favouriteIds);

    return {
      props: { data, uid1, favouriteIds },
    };
  } catch (err) {
    console.log(err);
    return { props: { data: "Uh oh" } };
  }
}
