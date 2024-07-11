import Link from "next/link";

export default function Home() {
  return (
    <>
      <Link href={"/quiz"}>Iniciar</Link>
      <Link href={"/ranking"}>Visualizar Ranking</Link>
    </>
  );
}
