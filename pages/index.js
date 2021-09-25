import Layout from "@/components/Layout";
import Card from "@/components/Card";
import styles from "../styles/Home.module.css";

export default function Home({ data }) {
  return (
    <Layout>
      <div className={styles.feed}>
        {data.map((beer) => (
          <Card key={beer.id} data={beer} />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  try {
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

    return {
      props: { data },
    };
  } catch (err) {
    return { props: { data: "Uh oh" } };
  }
}
