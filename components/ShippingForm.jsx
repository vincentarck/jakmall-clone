import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Summary from "./Summary";
import { paymentData, shipmentData } from "../utils/dummyData";
function ShippingForm({ shippingFee }) {
  const router = useRouter();
  const [shipment, setShipment] = useState(shipmentData);
  const [payment, setPayment] = useState(paymentData);
  
  const handleChangeShipment = (ship) => {
    localStorage.setItem("shipment", shipment[ship].name)
    localStorage.setItem("shipmentPrice", shipment[ship].harga)
    setShipment((prevShipment) => ({ ...prevShipment, shipmentActive: ship }));
  };
  const handleChangePayment = (type) => {
    localStorage.setItem("payment", payment[type].name)
    setPayment((prevPayment) => ({ ...prevPayment, paymentActive: type }));
  };

  useEffect(() => {
    // untuk default local storage
    localStorage.setItem("shipment", shipment.gojek.name)
    localStorage.setItem("shipmentPrice", shipment.gojek.harga)
    localStorage.setItem("payment", payment[payment.paymentActive].name)
  }, [])
  
  const button = (
    <button className="bg-[#FF8A00] w-full rounded-lg py-3 text-white text-lg sm:text-xl mx-auto mt-10"
    onClick={() => router.replace({query:{page:"finish"}})}
    type="buton"
    >
      Pay with {payment[payment.paymentActive].name}
    </button>
  );
  return (
    <div
      className="w-4/5 min-h-fit pt-20 bg-white p-7 lg:p-14 xl:p-20 relative "
      // onSubmit={handleSubmit(onSubmit)}
    >
      <button
        className="text-slate-500 font-semibold flex items-center gap-2"
        type="button"
      >
        <div className="w-5 h-4">
          <Image
            src="/back.png"
            alt="arrow"
            layout="responsive"
            width={10}
            height={10}
          />
        </div>
        <p onClick={() => router.back()}>Back to Delivery</p>
      </button>
      <div className="my-10 flex h-full flex-col lg:flex-row">
        <div className="flex-[4] flex flex-col gap-10">
          <div>
            <h1 className="title">Shipment</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 pt-10">
              {Object.keys(shipment).map((typeOfShipment,i) => {
                const { name, harga } = shipment[typeOfShipment];
                const chooseShipment =
                  shipment.shipmentActive === typeOfShipment;
                if (!name) return;
                return (
                  <div
                    className={`py-2 px-5 border-2 ${
                      chooseShipment
                        ? "border-green-400 bg-green-50"
                        : "border-slate-500 bg-white"
                    } text-black cursor-pointer flex items-center justify-between px-5`}
                    onClick={() => handleChangeShipment(typeOfShipment)}
                    key={i}
                  >
                    <div>
                      <p className="font-semibold">{name}</p>
                      <p className="font-bold">{harga}</p>
                    </div>
                    {chooseShipment && <img src="/done.png" />}
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <h1 className="title">Payment</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 pt-10">
              {Object.keys(payment).map((typeOfPayment, i) => {
                const { name, harga } = payment[typeOfPayment];
                const chooseShipment = payment.paymentActive === typeOfPayment;
                if (!name) return;
                return (
                  <div
                    className={`py-2 px-5 border-2 ${
                      chooseShipment
                        ? "border-green-400 bg-green-50"
                        : "border-slate-500 bg-white"
                    } text-black cursor-pointer flex items-center justify-between px-5`}
                    onClick={() => handleChangePayment(typeOfPayment)}
                    key={i}
                  >
                    <div>
                      <p className="font-semibold">{name}</p>
                      <p className="font-bold">{harga}</p>
                    </div>
                    {chooseShipment && <img src="/done.png" />}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <Summary
          shippingFee={shippingFee}
          typeShipment={shipment[shipment.shipmentActive]}
          buttonNext={button}
        />
      </div>
    </div>
  );
}

export default ShippingForm;
