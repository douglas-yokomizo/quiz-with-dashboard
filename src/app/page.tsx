import Link from "next/link";

export default function Home() {
  return (
    <>
      <Link href={"/signup"}>Iniciar</Link>
      <Link href={"/ranking"}>Visualizar Ranking</Link>
    </>
  );
}
