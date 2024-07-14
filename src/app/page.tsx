import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen">
      {/* Imagem de fundo à esquerda */}
      <div className="w-1/3 bg-cover"></div>

      <div className="w-1/3 flex flex-col gap-10 items-center justify-center bg-black">
        <Link
          href={"/signup"}
          className="bg-white py-2 px-4 mb-4 w-[90%] text-center text-5xl rounded-[80px] border-4 border-orange-400"
        >
          Iniciar
        </Link>
        <Link
          href={"/ranking"}
          className="bg-white py-2 px-4 mb-4 w-[90%] text-center text-5xl rounded-[80px] border-4 border-orange-400"
        >
          Ranking
        </Link>
      </div>

      {/* Imagem de fundo à direita */}
      <div className="w-1/3 bg-cover"></div>
    </div>
  );
}
