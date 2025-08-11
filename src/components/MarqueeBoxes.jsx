import Marquee from "react-fast-marquee";
import React from "react";

const MarqueeBoxes = () => {
  const box1Texts = [
    `Tidak ada kata yang salah dari “Yaelah gitu doang gua juga bisa”
        Tapi yang salah adalah kenapa tidak membuat sendiri tapi malah
        menghina karya orang lain`,
    "Maaf bila web ini sampah tapi belajar menghargai kita sama sama tanah",
    "Mimpinya Besar. Tapi langkahnya hanya dari dapur menuju kasur. HAHAHA teman genz ku memang kadang aneh",
    "WHO WILL PROTECT THE PUBLIC WHEN POLICE BREAK THE LAW",
    "Kutatap dalam setengah gelas gooday freze sambil memikirkan apakah anakku nanti mengulangi perbuatan ayahnya",
    "Sebelum akhirnya segala tentangku hanya bisa kau kenang sebatas nama. Ingat lagi singgasana yang pernah kau tempati sebagai permaisuri di istana yang kita bangun selama ratusan hari",
  ];
  const box2Texts = [
    `People are always saying "If u love something u have to learn to let it go". But that was such a bullshit all i want is to be with u`,
    "As a man we respect another man, it's all about a competition, he won he got the price, u lost u must respect the camp",
    `“You miss me right??” \n
    GET OUT OF MY HEAD, I BEG YOU`,
    "Semua ada harga tapi jangan sampai makan uang warga",
    "Tuhan, aku bingung. Entah siapa yang harus kudengar, mereka yang mengaku sebagai penyambung lidahmu, begitu lihai menipu demi uang receh",
    "Biar aku yang dikutuk dan engkau yang di rayakan",
  ];

  const renderMarque = (items, direction) => (
    <div className="py-4">
      <Marquee direction={direction} pauseOnHover speed={30} gradient={false}>
        {items.map((text, index) => (
          <div
            key={index}
            className="w-[250px] h-[100px] bg-[#1f1f1f] text-white p-4 mx-2 rounded shadow-md text-[10px] flex items-center overflow-hidden"
          >
            <p className="line-clamp-8 leading-tight text-ellipsis break-words ">
              {text.split('\n').map((line, idx) => (
                <React.Fragment key={idx}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </p>
          </div>
        ))}
      </Marquee>
    </div>
  );

  return (
    <div className="space-y-6">
      {renderMarque(box1Texts, "right")}
      {renderMarque(box2Texts, "left")}
    </div>
  );
};

export default MarqueeBoxes;




//       {/* Input Area */}
//       <form
//         onSubmit={handleSubmit}
//         className="p-4 bg-white border-t flex items-center gap-2"
//       >
//         {/* Tombol Upload */}
//         <label
//           htmlFor="file-upload"
//           className="cursor-pointer p-2 rounded-full hover:bg-gray-200"
//         >
//           <MdAddPhotoAlternate className="text-2xl text-gray-600" />
//         </label>
//         <input
//           id="file-upload"
//           type="file"
//           className="hidden"
//           accept="image/*"
//           onChange={handleImageChange}
//         />

//         {/* Input */}
//         <input
//           type="text"
//           className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           value={prompt}
//           onChange={(e) => setPrompt(e.target.value)}
//           placeholder="Tulis pesan..."
//           disabled={isLoading}
//         />

//         {/* Tombol Kirim */}
//         <button
//           type="submit"
//           className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full disabled:bg-blue-300 transition"
//           disabled={isLoading}
//         >
//           <MdSend className="text-xl" />
//         </button>
//       </form>

//       {/* Preview gambar sebelum kirim */}
//       {imagePreview && (
//         <div className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-white p-2 rounded-lg shadow-lg border">
//           <img
//             src={imagePreview}
//             alt="preview"
//             className="max-w-[150px] rounded"
//           />
//           <button
//             onClick={() => {
//               setImageFile(null);
//               setImagePreview("");
//             }}
//             className="block mx-auto mt-2 text-red-500 text-sm hover:underline"
//           >
//             Hapus
//           </button>
//         </div>
//       )}
//     </div>
//   );
