import styles from "@/styles/Card.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { useState } from "react";
import { FaRegStar } from "react-icons/fa";

export default function Card({ data }) {
  const router = useRouter();

  const imagePost = () => {
    return (
      <Link href={`/${data.id}`}>
        <a>
          <div className={styles.imgPost}>
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
                      <div className={styles.star}>
                        <FaRegStar />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a>
      </Link>
    );
  };

  return <div className={styles.post}>{imagePost()}</div>;
}
