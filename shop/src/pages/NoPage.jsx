import React from "react";
import { Alert } from "@material-tailwind/react";
import { Helmet } from "react-helmet-async";

const NoPage = () => {
  return (
    <>
      <Helmet>
        <title>Not Found</title>
      </Helmet>
      <div className="grid grid-cols-1 h-screen items-center justify-items-center bg-red-200">
        <div className="w-[96]">
          <Alert color="red" className="text-xl font-inter font-bold">
            Sorry no products match your filter search ... Clear the filter and
            try again 😀.
          </Alert>
        </div>
      </div>
    </>
  );
};

export default NoPage;
