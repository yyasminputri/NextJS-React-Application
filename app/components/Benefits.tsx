import Image from "next/image";
import React from "react";
import { Container } from "@/components/Container";

interface BenefitsProps {
  imgPos?: "left" | "right";
  data: {
    imgPos?: "left" | "right";
    title: string;
    desc: string;
    image: any;
    bullets: {
      title: string;
      desc: string;
      icon: React.ReactNode;
    }[];
  };
}

export const Benefits = (props: Readonly<BenefitsProps>) => {
  const { data } = props;

  return (
    <Container className="flex flex-wrap mb-20 lg:gap-10 lg:flex-nowrap font-poppins">
      <div
        className={`flex items-center justify-center w-full lg:w-1/3 ${
          props.imgPos === "right" ? "lg:order-1" : ""
        }`}
      >
        {/* Gambar */}
        <div>
          <Image
            src={data.image}
            width={400} // Lebih kecil dari sebelumnya
            height={400} // Lebih kecil dari sebelumnya
            alt="Benefits"
            className="object-cover rounded-lg"
            placeholder="blur"
            blurDataURL={data.image.src}
          />
        </div>
      </div>

      <div
        className={`flex flex-wrap items-center w-full lg:w-2/3 ${
          data.imgPos === "right" ? "lg:justify-end" : ""
        }`}
      >
        <div>
          {/* Judul */}
          <div className="flex flex-col w-full mt-4">
            <h3 className="max-w-2xl mt-3 text-2xl font-semibold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-3xl dark:text-white">
              {data.title}
            </h3>

            {/* Deskripsi */}
            <p className="max-w-2xl py-2 text-sm leading-normal text-gray-500 lg:text-base xl:text-base dark:text-gray-300">
              {data.desc}
            </p>
          </div>

          {/* Bullets */}
          <div className="w-full mt-5">
            {data.bullets.map((item, index) => (
              <Benefit key={index} title={item.title} icon={item.icon}>
                {item.desc}
              </Benefit>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

function Benefit(props: any) {
  return (
    <div className="flex items-start mt-6 space-x-3">
      {/* Icon */}
      <div className="flex items-center justify-center flex-shrink-0 bg-indigo-500 rounded-md w-9 h-9">
        {React.cloneElement(props.icon, {
          className: "w-5 h-5 text-indigo-50", // Ukuran icon lebih kecil
        })}
      </div>

      {/* Konten Bullet */}
      <div>
        <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200">
          {props.title}
        </h4>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {props.children}
        </p>
      </div>
    </div>
  );
}
