import Layout from "@/components/Layout";
import Image from "next/image";
import styles from "@/styles/DrinkId.module.css";

export default function DrinkID({ data }) {
  console.log(data[0]);

  return (
    <Layout>
      <div className={styles.heading}>
        <h1>{data[0].name}</h1>
        <h4>{data[0].tagline}</h4>
        <p>{data[0].description}</p>
      </div>
      <div className={styles.body}>
        <div className={styles.profileImage}>
          <Image
            src={data[0].image_url}
            layout="fill"
            objectFit="contain"
            className={styles.image}
          />
        </div>

        <div className={styles.foodPairing}>
          <p>Food Pairing:</p>
          <ul>
            {data[0].food_pairing.map((food, index) => (
              <li key={index}>{food}</li>
            ))}
          </ul>
        </div>

        <div className={styles.data}>
          {" "}
          <p>First Brewed: {data[0].first_brewed}</p>
          <p>Attenuation Level: {data[0].attenuation_level}</p>
          <p>
            Boil Volume: {data[0].boil_volume.value}
            {data[0].boil_volume.unit}
          </p>
          <p>abv: {data[0].abv}</p>
          <p>ebc: {data[0].ebc}</p>
          <p>ph: {data[0].ph}</p>
        </div>
        <div className={styles.ingredients}>
          <p>Ingredients</p>
          <ul>
            <ul>
              <li>Hops:</li>
              <ul>
                {data[0].ingredients.hops.map((hop, index) => (
                  <div key={index}>
                    <li>
                      Name: {hop.name}, Amount: {hop.amount.value}{" "}
                      {hop.amount.unit}, Attribute: {hop.attribute}
                    </li>
                  </div>
                ))}
              </ul>
            </ul>
            <ul>
              <li>Malt</li>
              <ul>
                {data[0].ingredients.malt.map((mlt, index) => (
                  <div key={index}>
                    <li>
                      Name: {mlt.name}, Amount: {mlt.amount.value}{" "}
                      {mlt.amount.unit}
                    </li>
                  </div>
                ))}
              </ul>
            </ul>
          </ul>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  try {
    const res = await fetch(
      `https://api.punkapi.com/v2/beers/${context.params.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();

    return {
      props: { data },
    };
  } catch (err) {
    return { props: { data: "Uh oh" } };
  }
}
