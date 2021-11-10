import styles from "@/styles/Favourites.module.css";
import Layout from "@/components/Layout";
import nookies from "nookies";
import { verifyIdToken } from "../firebaseAdmin";
import firebaseClient from "../firebaseClient";
import { NEXT_URL } from "@/config/index";
import Card from "@/components/Card";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";

export default function Favourites({
  session,
  uid1,
  favourites,
  favouriteIds,
}) {
  firebaseClient();
  const [favouriteDrinks, setFavouriteDrinks] = useState(favourites);

  // console.log(favourites);

  return (
    <Layout title="Favourites" uid={uid1}>
      {uid1 ? (
        <>
          <div>
            {favourites ? (
              <div className={styles.feed}>
                {favouriteDrinks.map((beer) => (
                  <Card
                    key={beer.id}
                    data={beer[0]}
                    favouriteIds={favouriteIds}
                  />
                ))}
              </div>
            ) : (
              <h1>Add a favourite to see them here</h1>
            )}
          </div>
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
    let favourites = [];
    let favouritesId = null;
    const cookies = nookies.get(context);
    // console.log(cookies.token !== "");
    if (cookies.token !== "" && cookies.token !== undefined) {
      const token = await verifyIdToken(cookies.token);
      // console.log(cookies.token);
      const { uid, email } = token;
      uid1 = uid;

      const userFavorites = await fetch(`${NEXT_URL}/api/getFavourites`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
      });

      favouritesId = await userFavorites.json();

      for (let i = 0; i < favouritesId.length; i++) {
        const res = await fetch(
          `https://api.punkapi.com/v2/beers/${favouritesId[i].favourite}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await res.json();
        favourites.push(data);
      }
    }

    const favouriteIds = favouritesId.map((favourite) => favourite.favourite);

    // console.log(favourites[0]);

    return {
      props: { uid1, favourites, favouriteIds },
    };
  } catch (err) {
    console.log(err);
    context.res.writeHead(302, { Location: "/login" });
    //context.res.end();
    return { props: {} };
  }
}
