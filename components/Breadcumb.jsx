import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
function Breadcumb({ idActive }) {
    const router = useRouter()
    const {query: {page}} = router
  return (
    <div className="flex items-center gap-1 lg:gap-5 absolute top-10 md:top-10 z-10 bg-[#FFFAE6] px-3 sm:px-10 py-7 rounded-b-xl">
      <div className="flex gap-2 lg:gap-4 items-center">
        <div className={`w-6 h-6 lg:w-8 lg:h-8 rounded-full flex items-center justify-center ${"bg-[#FF8A00]"}`}>
          <span className="text-sm font-semibold lg:text-base">1</span>
        </div>
        <p className="text-[#FF8A00] text-lg font-semibold">Delivery</p>
      </div>
      <div className="w-3 h-2 md:w-5 md:h-4">
        <Image
          src="/breadCumb.png"
          alt="arrow"
          layout="responsive"
          width={10}
          height={10}
        />
      </div>
      <div className="flex gap-2 lg:gap-4 items-center">
        <div className={`w-6 h-6 lg:w-8 lg:h-8 rounded-full flex items-center justify-center ${(page === "shipping" || page === "finish") ? "bg-[#FF8A00]" : "bg-yellow-500" }`}>
          <span className="text-sm font-semibold md:text-base">2</span>
        </div>
        <p className="text-[#FF8A00] text-lg font-semibold">Payment</p>
      </div>
      <div className="w-3 h-2 md:w-5 md:h-4">
        <Image
          src="/breadCumb.png"
          alt="arrow"
          layout="responsive"
          width={10}
          height={10}   
        />
      </div>
      <div className="flex gap-2 lg:gap-4 items-center">
        <div className={`w-6 h-6 lg:w-8 lg:h-8 rounded-full flex items-center justify-center ${(page === "finish") ? "bg-[#FF8A00]" : "bg-yellow-500" }`}>
          <span className="text-sm font-semibold md:text-base">3</span>
        </div>
        <p className="text-[#FF8A00] text-lg font-semibold">Finish</p>
      </div>
    </div>
  );
}

export default Breadcumb;
