import React from "react";

const SociaSignin = ({ Icon, Title }) => {
  return (
    <section className="border-2 border-gray-300 cursor-pointer rounded-lg p-1 flex items-center justify-start">
      <Icon />
      <p className="flex justify-start px-3 items-center gap-2">{Title}</p>
    </section>
  );
};

export default SociaSignin;
