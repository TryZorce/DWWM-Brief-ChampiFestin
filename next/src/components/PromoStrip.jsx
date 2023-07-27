import style from "./promoStrip.module.css";
import Marquee from "react-fast-marquee";

function PromoStrip() {
  return (
    <div className={`text-gray-100 font-bold pb-3 pt-3 mt-4 mb-4 ${style["backgroundRGB"]} ${style.marqueeContainer}`}>
      <Marquee>
      🔥🔥🔥 HOT DEALS ! GET 10% OFF WITH THE CODE: PSYLO10 !!! 🔥🔥🔥
      </Marquee>
    </div>
  )
}

export default PromoStrip;
