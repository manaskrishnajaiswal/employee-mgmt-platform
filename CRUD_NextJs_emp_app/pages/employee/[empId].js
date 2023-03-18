import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import UserForm from "../../components/form";

const EmpInfo = () => {
  const router = useRouter();
  console.log(router.query.empId);
  return (
    <>
      <h1></h1>
      <section>
        <Head>
          <title>Employee Info Page</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
            integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
            crossorigin="anonymous"
            referrerpolicy="no-referrer"
          />
        </Head>
        <main className="py-5">
          <h1 className="text-xl md:text-5xl text-center font-bold py-10">
            Employee Info
          </h1>
          <UserForm></UserForm>
        </main>
      </section>
    </>
  );
};

export default EmpInfo;
