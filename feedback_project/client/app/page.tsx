import Link from "next/link";


export default function Home() {
  return (
    <>
      <p className="text-center text-3xl mt-1">Hoşgeldiniz</p>
      <div className="text-center mt-5 hover:underline hover:text-blue-600 duration-300">
        <Link href="/signin">Giriş Sayfası</Link>
      </div>
    </>
  )
}
