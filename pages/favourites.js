import styles from "@/styles/Favourites.module.css";
import Layout from "@/components/Layout";
import nookies from "nookies";
import { verifyIdToken } from "../firebaseAdmin";
import firebaseClient from "../firebaseClient";
import { NEXT_URL } from "@/config/index";
import Card from "@/components/Card";

import { useEffect, useState } from "react";

export default function Favourites({ session, uid1, favourites }) {
  firebaseClient();

  console.log(favourites);

  return (
    <Layout title="Favourites" uid={uid1}>
      {uid1 ? (
        <>
          <div>
            {favourites ? (
              <div className={styles.feed}>
                {favourites.map((beer) => (
                  <Card key={beer.id} data={beer[0]} />
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

      const favouritesId = await userFavorites.json();

      //Get beers from favouritesId

      // favourites = await favouritesId.map(async (id, index) => {
      //   const res = await fetch(
      //     `https://api.punkapi.com/v2/beers/${id.favourite}`,
      //     {
      //       method: "GET",
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //     }
      //   );

      //   const data = await res.json();
      //   return data;
      // });

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

    // console.log(favourites[0]);

    return {
      props: { uid1, favourites },
    };
  } catch (err) {
    console.log(err);
    context.res.writeHead(302, { Location: "/login" });
    //context.res.end();
    return { props: {} };
  }
}
