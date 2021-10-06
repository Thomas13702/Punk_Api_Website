import styles from "@/styles/Card.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { useState } from "react";
import { FaRegStar } from "react-icons/fa";
import { NEXT_URL } from "@/config/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Card({ data }) {
  const router = useRouter();

  console.log("data: " + data);

  const favouriteClicked = async () => {
    const res = await fetch(`${NEXT_URL}/api/postFavourite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: cookies,
      },
      body: JSON.stringify({ favourite: data.id.toString() }),
    });

    console.log(res);

    if (!res.ok) {
      // console.log(res);
      if (res.status === 403 || res.status === 401) {
        toast.error("Please Login or Register to add to favourites");
        return;
      }
      toast.error("Something Went Wrong");
    } else {
      const data = await res.json(); //get data
      // router.push(`/events/${evt.slug}`);
    }
  };

  const imagePost = () => {
    return (
      // <Link href={`/${data.id}`}>
      <a>
        <div className={styles.imgPost}>
          <ToastContainer />
          <div className={styles.profileImage}>
            <Image
              src={data.image_url}
              layout="fill"
              objectFit="contain"
              className={styles.image}
            />
          </div>
          <div className={styles.right}>
            <div>
              <div className={styles.span}>
                <h2>{data.name}</h2>
                <div className={styles.info}>
                  <p>{`${data.description.substring(0, 200).trim()}${
                    data.description.length > 200 ? "..." : ""
                  }`}</p>
                  <div className={styles.data}>
                    <p>abv: {data.abv}</p>
                    <div className={styles.star} onClick={favouriteClicked}>
                      <FaRegStar />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a>
      // </Link>
    );
  };

  return <div className={styles.post}>{imagePost()}</div>;
}
