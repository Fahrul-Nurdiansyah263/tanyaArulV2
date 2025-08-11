import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import MarkdownIt from "markdown-it";
import { MdOutlineArrowBack, MdAddPhotoAlternate } from "react-icons/md";
import { FaArrowUp } from "react-icons/fa";
import { generativeContentStream } from "../services/geminiServices";

const md = new MarkdownIt();

export default function ChatBotPage() {
  const [prompt, setPrompt] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!prompt && !imageFile) return;

    const userMessage = {
      sender: "user",
      text: prompt,
      img: imagePreview || null,
    };
    setMessages((prev) => [...prev, userMessage]);
    setPrompt("");
    setImageFile(null);
    setImagePreview("");

    const lowerPrompt = prompt.toLocaleLowerCase().trim();
    if (
      lowerPrompt.includes("siapa fahrul") ||
      lowerPrompt.includes("siapa arul")
    ) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Fahrul atau arul" },
      ]);
      return;
    }

    setIsLoading(true);
    try {
      const result = await generativeContentStream(prompt, imageFile);
      let buffer = [];
      for await (const response of result.stream) {
        buffer.push(response.text());
        setMessages((prev) => {
          const newText = md.render(buffer.join(""));
          if (prev[prev.length - 1]?.sender === "bot") {
            return [
              ...prev.slice(0, -1),
              { ...prev[prev.length - 1], text: newText },
            ];
          } else {
            return [...prev, { sender: "bot", text: newText }];
          }
        });
      }
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: `<p style="color:red;">Error: ${e.message}</p>`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#1f1f1f] flex flex-col h-screen">
      <nav className="flex items-center p-4 border-b border-gray-700 ">
        <Link
          to="/"
          className="flex items-center justify-center rounded-full bg-white h-10 w-10 shadow-md"
        >
          <MdOutlineArrowBack className="text-black text-2xl" />
        </Link>
        <h1 className="ml-4 text-white font-semibold">tanyaArul.io</h1>
      </nav>

      <main className="flex-1 overflow-y-auto p-4">
        <div className="w-[95%] md:w-[80%] mx-auto flex flex-col space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] px-4 py-2 rounded-2xl shadow text-white prose prose-invert  break-words ${
                  msg.sender === "user"
                    ? "bg-[#303030] "
                    : "bg-[#303030] !p-3px"
                }`}
              >
                {msg.img && (
                  <img
                    src={msg.img}
                    alt="preview"
                    className="rounded-lg mb-2 max-w-full"
                  />
                )}
                <div
                  className="whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: msg.text }}
                />
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="px-4 py-2 rounded-2xl bg-[#303030] text-white italic">
                Sedang berpikir JANGAN GANGGU
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
      </main>

      <div className="w-full flex justify-center items-center py-2 bg-transparent flex-col">
        <form
          onSubmit={handleSubmit}
          className="w-[95%] md:w-[70%] flex items-center gap-3"
        >
          <div className="relative flex-grow flex items-center bg-[#3a3a3a] rounded-full">
            <input
              type="text"
              className="w-full p-3 pl-4 pr-28 bg-transparent text-white placeholder-gray-400 focus:outline-none"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Tanyakan apa yang mau di tanyakan"
              disabled={isLoading}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <label
                htmlFor="file-upload"
                className="cursor-pointer p-1 rounded-full hover:bg-gray-600 transition"
              >
                <MdAddPhotoAlternate className="text-3xl text-white" />
              </label>
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
                disabled={isLoading}
              />
              <button
                type="submit"
                className=" bg-white rounded-full h-8 w-8 flex items-center justify-center"
                disabled={isLoading}
              >
                <FaArrowUp className="text-[#303030]" />
              </button>
            </div>

            {imagePreview && (
              <div className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-white p-2 rounded-lg shadow-lg border">
                <img
                  src={imagePreview}
                  alt="preview"
                  className="max-w-[150px] rounded"
                />
                <button
                  onClick={() => {
                    setImageFile(null);
                    setImagePreview("");
                  }}
                  className="block mx-auto mt-2 text-red-500 text-sm  "
                >
                  hapus
                </button>
              </div>
            )}
          </div>
        </form>
        <p className="text-white font-inter text-[14px] sm:text-[15px] text-center px-4 pt-1">
          Semua nya bisa membuat kesalahan termasuk AI
        </p>
      </div>
    </div>
  );
}
