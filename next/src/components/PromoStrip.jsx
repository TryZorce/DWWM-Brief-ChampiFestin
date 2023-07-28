import React, { useState, useEffect } from "react";
import style from "./promoStrip.module.css";
import Marquee from "react-fast-marquee";
import makeRequest from "@/utils/Fetcher";

function PromoStrip() {
  const [promotion, setPromotion] = useState({});

  useEffect(() => {
    // Effectuer la requête vers le backend pour récupérer les données de la table "promotion"
    makeRequest({
      method: "get",
      url: "http://localhost:8000/api/promotions",
      data: "",
    })
    .then((data) => setPromotion(data[0]))
    .catch((error) => console.error("Error fetching promotion data:", error));
  }, []);

  return (
    <div className={`text-gray-100 font-bold pb-3 pt-3 mt-2 mb-4 ${style["backgroundRGB"]} ${style.marqueeContainer}`}>
      <Marquee>
        {promotion.value && promotion.code ? (
          `🔥🔥🔥 HOT DEALS ! GET ${promotion.value}% OFF WITH THE CODE: ${promotion.code} !!! 🔥🔥🔥`
        ) : (
          "Loading..."
        )}
      </Marquee>
    </div>
  );
}

export default PromoStrip;
