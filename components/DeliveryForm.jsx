import React, { useEffect, useState } from "react";
import Image from "next/image";
import Summary from "./Summary";
import { useRouter } from "next/router";
import { localStorageReady } from "../utils/localStorageReady";
function DeliveryForm({ onSubmit, register, handleSubmit, errors }) {
    const router = useRouter()
  const [shippingFee, setShippingFee] = useState(null);
  useEffect(() => {
    setShippingFee(localStorage.getItem("shippingFee"))
  } , []);
  if(localStorageReady() && localStorage.getItem("finish")){
    localStorage.removeItem("finish")
    window.location.reload()
  }
  const button = (
    <button className="bg-[#FF8A00] w-full rounded-lg py-3 text-white text-lg sm:text-xl mx-auto mt-10" >
      Continue To Payment
    </button>
  );
  return (
    <form
      className="w-4/5 min-h-fit pt-20 bg-white p-7 lg:p-14 xl:p-20 relative "
      onSubmit={handleSubmit(onSubmit)}
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
        <p>Back to cart</p>
      </button>
      <div className="my-10 flex h-full flex-col lg:flex-row">
        <div className="flex-[4]">
          <div className="flex justify-between md:pr-20 flex-col gap-5 md:flex-row">
            <h1 className="title">Delivery Details</h1>
            <div className="flex items-center mb-4">
              <input
                placeholder="Email"
                type="checkbox"
                value=""
                checked={shippingFee}
                className="w-4 h-4 text-[#1BD97B] accent-white rounded border-[#1BD97B] focus:ring-[#1BD97B] dark:focus:ring-[#1BD97B] ring-offset-[#1BD97B] focus:ring-2"
                onChange={(e) => {
                  if (e.target.checked) {
                    localStorage.setItem("shippingFee", true);
                    setShippingFee(true);
                  } else {
                    localStorage.setItem("shippingFee", false);
                    setShippingFee(false);
                  }
                }}
              />
              <label
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-700"
              >
                Sent as DropShipper
              </label>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-10">
            <div className="relative cols-1">
              <input
                type="text"
                className={`block px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900   border-2 border-slate-200 appearance-none dark:text-slate-600  focus:outline-none focus:ring-0 ${
                  errors.email
                    ? "focus:border-red-600"
                    : "focus:border-green-500"
                } peer bg-white`}
                placeholder=" "
                {...register("email", {
                  required: "Alamat Email diperlukan",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Alamat Email Tidak Valid",
                  },
                })}
              />
              <label
                
                className={`absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 ${
                  errors.email
                    ? "peer-focus:text-red-500 peer-focus:dark:text-red-500 "
                    : "peer-focus:text-green-500 peer-focus:dark:text-green-500 "
                } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4`}
              >
                Email
              </label>
              {errors.email && (
                <p className="validateInput ">{" " + errors.email.message}</p>
              )}
            </div>
            <div className="relative cols-1">
              <input
                type="text"
                className={`block px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900   border-2 border-slate-300 appearance-none dark:text-slate-600  focus:outline-none focus:ring-0 ${
                  errors.nama
                    ? "focus:border-red-600"
                    : "focus:border-green-500"
                } peer bg-white`}
                placeholder=" "
                {...register("nama", {
                  required: "Nama DropShipper diperlukan",
                })}
              />
              <label
                
                className={`absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 ${
                  errors.nama
                    ? "peer-focus:text-red-500 peer-focus:dark:text-red-500 "
                    : "peer-focus:text-green-500 peer-focus:dark:text-green-500 "
                } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4`}
              >
                DropShipper Name
              </label>
              {errors.nama && (
                <p className="validateInput ">{" " + errors.nama.message}</p>
              )}
            </div>
            <div className="relative cols-1">
              <input
                type="text"
                className={`block px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900   border-2 border-slate-300 appearance-none dark:text-slate-600  focus:outline-none focus:ring-0 ${
                  errors.nomorHp
                    ? "focus:border-red-600"
                    : "focus:border-green-500"
                } peer bg-white`}
                placeholder=" "
                {...register("nomorHp", {
                  required: "Nomor Telepon dibutuhkan",
                  pattern: {
                    value: /^[0-9-+]+$/,
                    message: "Masukan angka",
                  },
                })}
              />
              <label
                
                className={`absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 ${
                  errors.nomorHp
                    ? "peer-focus:text-red-500 peer-focus:dark:text-red-500 "
                    : "peer-focus:text-green-500 peer-focus:dark:text-green-500 "
                } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4`}
              >
                Phone Number
              </label>
              {errors.nomorHp && (
                <p className="validateInput ">{" " + errors.nomorHp.message}</p>
              )}
            </div>
            <div className="relative cols-1">
              <input
                type="text"
                className={`block px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900   border-2 border-slate-300 appearance-none dark:text-slate-600  focus:outline-none focus:ring-0 ${
                  errors.nomorHpDropShipper
                    ? "focus:border-red-600"
                    : "focus:border-green-500"
                } peer bg-white`}
                placeholder=" "
                {...register("nomorHpDropShipper", {
                  required: "Nomor Telepon DropShipper dibutuhkan",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Masukan angka",
                  },
                })}
              />
              <label
                
                className={`absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 ${
                  errors.nomorHpDropShipper
                    ? "peer-focus:text-red-500 peer-focus:dark:text-red-500 "
                    : "peer-focus:text-green-500 peer-focus:dark:text-green-500 "
                } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4`}
              >
                DropShipper Phone Number
              </label>
              {errors.nomorHpDropShipper && (
                <p className="validateInput ">
                  {" " + errors.nomorHpDropShipper.message}
                </p>
              )}
            </div>
            <div>
              <textarea
                rows="4"
                className={`p-2.5 w-full text-sm text-gray-900 rounded-lg border
                 ${
                   errors.alamat
                     ? "focus:ring-red-500 focus:border-red-500"
                     : "focus:ring-green-500 focus:border-green-500"
                 } bg-white`}
                placeholder="Your message..."
                {...register("alamat", {
                  required: "Alamat lengkap diperlukan",
                  minLength: {
                    value: 5,
                    message: "Masukan alamat lengkap",
                  },
                })}
              ></textarea>
              {errors.alamat && (
                <p className="validateInput ">{" " + errors.alamat.message}</p>
              )}
            </div>
          </div>
        </div>
        <Summary shippingFee={shippingFee} buttonNext={button} setShippingFee={setShippingFee}/>
      </div>
    </form>
  );
}

export default DeliveryForm;
