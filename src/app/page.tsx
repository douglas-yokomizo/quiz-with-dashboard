import Link from "next/link";
import Image from "next/image";
import logo from "@/app/public/scanntech_logo.png";
import image1 from "@/app/public/Asset_1.png";
import image2 from "@/app/public/Asset_2.png";

export default function Home() {
  return (
    <div className="flex gap-10 h-screen bg-blue-600 justify-between">
      <div className="relative flex flex-col items-center w-1/2">
        <Image
          src={logo}
          alt="Scanntech Logo"
          className="w-4/5 z-10 absolute transform translate-x-10 -translate-y-20"
        />
        <div className="absolute px-20 py-16 z-0 bottom-0 w-2/3 left-1/4 text-white bg-black h-4/5">
          <p className="text-9xl font-semibold">
            (IN)
            <br /> <span>MO</span>
            <br />
            TION
          </p>
          <hr className="my-6 w-3/4 border-2" />
          <p className="text-5xl w-3/4">
            Você <br /> em alta <br /> performance
          </p>
        </div>
      </div>
      <div className="place-self-center w-1/2">
        <div className="bg-black px-16 py-14 h-1/2 text-white relative">
          <h2 className="text-4xl">
            Bem-vindo ao <br /> <span className="text-6xl">SCANN GAME</span>
          </h2>
          <Image
            src={image1}
            alt="Circulo 1"
            className="absolute -top-20 -left-14 w-32"
          />
          <Image
            src={image2}
            alt="Circulo 2"
            className="absolute top-[5.3rem] right-20 w-64"
          />
        </div>
        <div className="flex flex-col gap-4 text-white items-start ml-[4rem] mt-[2rem]">
          <Link
            href={"/signup"}
            className="bg-orange-500 w-2/5 py-5 text-4xl rounded-lg font-semibold text-center"
          >
            INICIAR
          </Link>
          <Link
            href={"/ranking"}
            className="bg-orange-500 w-2/5 py-5 text-4xl rounded-lg font-semibold text-center"
          >
            RANKING
          </Link>
        </div>
      </div>
    </div>
  );
}
