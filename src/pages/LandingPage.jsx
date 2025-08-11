import React from "react";
import "../index.css";
import { Link } from "react-router-dom";
import { MdArrowOutward } from "react-icons/md";
import MarqueeBoxes from "../components/MarqueeBoxes";

export default function LandingPage() {
  return (
    <div className="bg-black min-h-screen text-white font-inter overflow-x-hidden">
      <nav className="py-4 px-4">
        <h1 className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl font-bold text-black">
          A
        </h1>
      </nav>

      <header className="flex items-center justify-center flex-col py-10 md:py-16 ">
        <p className="text-sm mb-4 md:mb-6">tanyaArul.io</p>
        <div className="flex justify-center items-center flex-col  ">
          <h1 className="font-bold text-2xl md:text-4xl text-center px-4">
            Seperti cahaya di ujung lorong.
          </h1>
          <h1 className="font-bold text-2xl md:text-4xl text-center px-4">
            Seperti semut yang baru saja bertelur.
          </h1>

          <p className="text-center mt-4 px-6 max-w-2xl text-sm md:text-base">
            Semoga Web ini bisa memberikan secercah harapan. Dan bisa memberikan
            jawaban atas pertanyaan - pertanyaan yang diberikan
          </p>
        </div>
      </header>

      <section className="">
        <div className="justify-center flex gap-5 font-inter  ">
          <Link to="/chatBot">
            <button className="bg-white text-black rounded-full text-sm  cursor-pointer px-4 flex items-center justify-center gap-1 hover:bg-gray-200 transition-colors">
              Mulai Chat
              <MdArrowOutward />
            </button>
          </Link>
          <Link to="https://www.figma.com/design/TcSku3l1HERGKADZlOLF5a/tanyaArul.io?node-id=1-5&m=dev&t=tC30azdONbmeHAGN-1">
            <button className="bg-white text-black rounded-full text-sm  cursor-pointer px-4 flex items-center justify-center gap-1 hover:bg-gray-200 transition-colors">
              Desain UI/UX
            </button>
          </Link>
        </div>
        <div className="py-9">
          <MarqueeBoxes />
        </div>
      </section>
    </div>
  );
}
