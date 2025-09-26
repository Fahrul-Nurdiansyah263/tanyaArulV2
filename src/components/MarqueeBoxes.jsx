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



