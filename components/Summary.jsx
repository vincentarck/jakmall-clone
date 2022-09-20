import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { localStorageReady } from "../utils/localStorageReady";
function Summary({ typeShipment, buttonNext, shippingFee }) {
  const router = useRouter();
  const {
    query: { page },
  } = router;
  // Ini dibutuhkan untuk mencegeh Hydration failed pada NextJS
  const [shippingForServerRendering, setShippingForServerRendering] = useState(null)
  useEffect(() => {setShippingForServerRendering(localStorage.getItem("shippingFee"))},[])
  shippingFee = shippingFee ?? shippingForServerRendering
  const priceTotal = () => {
    if (!page) {
      return shippingFee ? "Rp.505,900" : "Rp.500,000";
    }
    const splitByComma = (str) => str.split(",");
    const shipmentPrice = Number(splitByComma(typeShipment.harga)[0]);
    let totalHarga = shippingFee ? "505,900" : "500,000";
    let tempPrice = splitByComma(totalHarga);
    totalHarga =
      (Number(tempPrice[0]) + shipmentPrice).toString() + "," + tempPrice[1];
    return totalHarga;
  };

  const deliveryEstimate = () => {
    let est = "";
    const { name } = typeShipment ?? "";
    if (page) {
      if (name === "GO-SEND" || name !== "JNE") {
        est = "today";
      } else if (name === "JNE") {
        est = "day after tomorrow";
      }
      return (
        <div className="space-y-3">
          <div className="border-t-2 border-slate-300 w-14"></div>
          <h1 className="font-semibold text-lg text-slate-600">
            Delivery Estimation
          </h1>

          <p className="text-green-400 font-bold text-xl">
            {est} {typeShipment.name}
          </p>
        </div>
      );
    }
  };

  const paymentMethod = () => {
    if (localStorageReady() && page === "finish") {
      return (
        <div className="space-y-3 pt-6">
          <div className="border-t-2 border-slate-300 w-14"></div>
          <h1 className="font-semibold text-lg text-slate-600">
            Payment Method
          </h1>

          <p className="text-green-400 font-bold text-xl">
            {localStorage.getItem("payment")}
          </p>
        </div>
      );
    }
  };
  return (
    <div className="flex-[2] text-slate-600 min-h-[40vh] lg:min-h-[60vh] lg:border-l border-[#e6cfb6] my-12 lg:ml-10 lg:my-0 lg:pl-10 flex flex-col justify-between">
      <div className="space-y-3">
        <h1 className="title">Summary</h1>
        <p className="text-slate-400 text-sm md:text-base">
          10 Items purchased
        </p>
        {deliveryEstimate()}
        {paymentMethod()}
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-slate-500 text-sm sm:text-base font-semibold">
            Cost of goods
          </p>
          <span className="font-bold text-sm sm:text-base">Rp. 500.000</span>
        </div>
        {shippingFee && (
          <div className="flex justify-between items-center">
            <p className="text-slate-500 text-sm sm:text-base font-semibold">
              DropShipping Fee
            </p>
            <span className="font-bold text-sm sm:text-base">Rp.5.900</span>
          </div>
        )}
        {page && (
          <div className="flex justify-between items-center">
            <p className="text-slate-500 text-sm sm:text-base font-semibold">
              {typeShipment.name} Shipment
            </p>
            <span className="font-bold text-sm sm:text-base">
              Rp. {typeShipment.harga}
            </span>
          </div>
        )}
        <div className="flex justify-between items-center">
          <h1 className="text-[#FF8A00] font-semibold text-xl">Total</h1>
          <p className="text-[#FF8A00] font-semibold text-xl">{priceTotal()}</p>
        </div>
        {buttonNext}
      </div>
    </div>
  );
}

export default Summary;
