import React from "react";
import Summary from "./Summary";
import { generateUID } from "../utils/generateRandomId";
import { useRouter } from "next/router";
import Image from "next/image";
function FinishForm() {
  const typeShipment = {
    name: localStorage.getItem("shipment"),
    harga: localStorage.getItem("shipmentPrice"),
  };
  localStorage.setItem("finish", "done")
  const router = useRouter()
  const deliveryEstimate = () => {
    let est = "";
    const router = useRouter();
    const {
      query: { page },
    } = router;
    const { name } = typeShipment;
    if (page) {
      if (name === "GO-SEND" || name !== "JNE") {
        est = "today";
      } else if (name === "JNE") {
        est = "day after tomorrow";
      }
      return (
        <p className="text-slate-500">
          Your Order will be delivered {est} with {name}
        </p>
      );
    }
  };

  return (
    <div className="w-4/5 min-h-fit pt-20 bg-white p-7 lg:p-14 xl:p-20 relative ">
      <div className="my-10 flex h-full flex-col lg:flex-row">
        <div className="flex-[4] flex flex-col items-start lg:px-10">
          <h1 className="title text-2xl sm:text-4xl mt-20">ThankYou</h1>
          <div className="space-y-2 max-w-fit my-10 text-sm sm:text-base">
            <p className="font-semibold text-slate-700 w-fit">
              Order Id: {generateUID(5)}{" "}
            </p>
            {deliveryEstimate()}
          </div>
          <button
            className="text-slate-500 font-semibold flex items-center gap-2 mt-10"
            type="button"
            onClick={() => {
                router.replace("/")
            }}
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
            <p>Go to Home Page</p>
          </button>
        </div>
        <Summary typeShipment={typeShipment} />
      </div>
    </div>
  );
}

export default FinishForm;
