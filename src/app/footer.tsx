import React from "react";
import { LuTwitter } from "react-icons/lu";
import { SiGithub, SiInstacart, SiInstagram,  } from "react-icons/si";
const Footer = () => {
  return (
    <footer className="w-full flex items-start justify-between lg:flex-row flex-col mt-6">
      <div>
        <p>&copy;2024 PicMorph | All Rights Reserved</p>
        <p className="flex items-center">
          Made with &#10084; by
          <a
            href="https://nilaacodes.me"
            target="_blank"
            className="ml-1 underline text-blue-700"
          >
            Nilaacodes
          </a>
        </p>
      </div>
      <div className="flex flex-col lg:items-end items-start lg:mt-0 mt-2">
        <p className="text-right">For any Feedbacks:</p>
        <div className="flex gap-3 items-center justify-items-end">
          <a href="https://x.com/nilaacode" target="_blank">
            <LuTwitter size={24}/>
          </a>
          <a href="https://github.com/nilaachandra" target="_blank">
            <SiGithub size={24}/>
          </a>
          <a href="">
            <SiInstagram size={24}/>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;