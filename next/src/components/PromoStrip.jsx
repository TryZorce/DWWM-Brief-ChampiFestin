import style from "./promoStrip.module.css";

function PromoStrip() {
  return (
    <div className={`text-gray-100 p-3 mt-4 mb-4 ${style["backgroundRGB"]}`}>
      <marquee className="line-height-3 font-bold">
      🔥🔥🔥 HOT DEALS ! GET 10% OFF WITH THE CODE: PSYLO10 !!! 🔥🔥🔥
      </marquee>
    </div>
  );
}

export default PromoStrip;
