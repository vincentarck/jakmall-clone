import Head from "next/head";
import { useState, useEffect } from "react";
import {
  Breadcumb,
  DeliveryForm,
  FinishForm,
  ShippingForm,
} from "../components";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
export default function Home() {
  const router = useRouter();
  const [contentForm, setContentForm] = useState("delivery");
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = (data) => {
    router.push({ query: { page: "shipping" } });
    setContentForm("shipping");
  };

  const {
    query: { page },
  } = router;
  let content = null;
  if (page === "shipping") {
    content = <ShippingForm />;
  } else if (page === "finish") {
    content = <FinishForm />;
  } else {
    content = (
      <DeliveryForm
        onSubmit={onSubmit}
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
      />
    );
  }
  
  console.log(page)
  return (
    <div>
      <Head>
        <title>Jakmall Shipping</title>
        <meta name="description" content="Part of an Technical Test" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center py-20 relative">
        <Breadcumb idActive={contentForm.breadCumbId} />
        {content}
        {/* <FinishForm /> */}
      </main>
    </div>
  );
}
