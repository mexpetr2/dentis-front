import { useRouter } from "next/router";
import Head from "next/head";
import { getWaitingRoomColor } from "@/shared/colors";
import React, { useState, useEffect } from "react";

const pageMetadata = {
  title: `Dental Waiting Room - Manage Room`,
};

const ManagePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [roomData, setRoomData] = useState(null);
  const [color, setColor] = useState(null);

  const fetchRoomData = async (idRoom) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/waiting-rooms/${idRoom}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Données récupérées avec succès :", data);
        return data;
      } else {
        console.error("Erreur lors de la récupération des données.");
        return null;
      }
    } catch (error) {
      console.error("Erreur lors de la requête :", error);
      return null;
    }
  };

  useEffect(() => {
    if (id) {
      fetchRoomData(id.toUpperCase()).then((value) => {
        setRoomData(value);
      });
      setColor(getWaitingRoomColor(id.toUpperCase()));
    }
  }, [id]);

  const room = () => {
    if (id) {
      return id.toUpperCase();
    }
  };

  const displayContent = () => {
    const display = [];
    if (roomData) {
      roomData.map((el, index) => {
        console.log(el);
        display.push(
          <>
            <div className={`card mb-2`} key={`appointment-${el.name}`}>
              <div className={"card-body d-flex justify-content-between"}>
                {el.name}&nbsp;|&nbsp;{el.noSS}
                <button className={"btn btn-danger"}>SUPPRIMER</button>
              </div>
            </div>
            {index !== roomData.length - 1 && (
              <span className={"px-3 material-icons material-symbols-outlined"}>
                arrow_downward
              </span>
            )}
          </>
        );
      });
    }
    return display;
  };

  return (
    <main className={"container my-5"}>
      <Head>
        <title>{pageMetadata.title}</title>
      </Head>
      <section className={"row"}>
        <h1 className={`${color}`}>Salle : {room()}</h1>
        {displayContent()}
      </section>
    </main>
  );
};

export default ManagePage;
