import styles from "@/styles/Card.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { useState } from "react";
import { FaRegStar } from "react-icons/fa";
import { NEXT_URL } from "@/config/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Card({ data, favourite, favouriteIds }) {
  const router = useRouter();

  const [isFavourite, setIsFavourite] = useState(
    favouriteIds.filter((id) => {
      return id.toString() === data.id.toString();
    }).length > 0
  );

  const favouriteClicked = async () => {
    const res = await fetch(
      isFavourite
        ? `${NEXT_URL}/api/removeFavourite/${data.id}`
        : `${NEXT_URL}/api/postFavourite`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Authorization: cookies,
        },
        body: JSON.stringify({ favourite: data.id.toString() }),
      }
    );

    if (!res.ok) {
      console.log(res.status);
      if (res.status === 403 || res.status === 401) {
        toast.error("Please Login or Register to add to favourites");
        return;
      }
      toast.error("Something Went Wrong");
    } else {
      const data = await res.json(); //get data
      setIsFavourite(!isFavourite);
      // router.push(`/events/${evt.slug}`);
    }
  };

  const imagePost = () => {
    return (
      <a>
        <div className={styles.imgPost}>
          <ToastContainer />
          <div className={styles.profileImage}>
            {data.image_url ? (
              <Image
                src={data.image_url}
                layout="fill"
                objectFit="contain"
                className={styles.image}
              />
            ) : (
              <Image
                src={"/images/1440777209BREWDOGLOGO.jpg"}
                layout="fill"
                objectFit="contain"
                className={styles.image}
              />
            )}
          </div>
          <div className={styles.right}>
            <div>
              <div className={styles.span}>
                <Link href={`/${data.id}`}>
                  <h2>{data.name}</h2>
                </Link>
                <div className={styles.info}>
                  <p>{`${data.description.substring(0, 200).trim()}${
                    data.description.length > 200 ? "..." : ""
                  }`}</p>
                  <div className={styles.data}>
                    <p>abv: {data.abv}</p>
                    <div className={styles.star} onClick={favouriteClicked}>
                      {isFavourite ? (
                        <FaRegStar className={styles.red} />
                      ) : (
                        <FaRegStar />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a>
    );
  };

  return <div className={styles.post}>{imagePost()}</div>;
}
