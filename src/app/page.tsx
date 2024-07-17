import Link from "next/link";
import Image from "next/image";
import logo from "@/app/public/scanntech_logo.png";
import image1 from "@/app/public/Asset_1.png";
import image2 from "@/app/public/Asset_2.png";

export default function Home() {
  return (
    <div className="flex h-screen bg-blue-600 justify-between">
      <div className="relative w-1/2">
        <Image
          src={logo}
          alt="Scanntech Logo"
          className="w-3 absolute top-0 object-cover"
          width={300}
        />
        <div className="absolute px-16 py-10 bottom-0 w-2/3 left-1/4 text-white bg-black h-4/5">
          <p className="text-8xl font-semibold">
            (IN)
            <br /> <span>MO</span>
            <br />
            TION
          </p>
          <hr className="my-6 w-3/4 border-2" />
          <p className="text-4xl">
            Você <br /> em alta <br /> performance
          </p>
        </div>
      </div>
      <div></div>
    </div>
  );
}
