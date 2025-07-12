import Link from 'next/link';
import Image from 'next/image';

export default function Header(){
  return(
    <header>
      <Image src="/logo.png" alt="logo" width={34} height={34}/>
      <h1>Raven's Scrap & Supply</h1>
      <nav>
        <Link href="/">Materials</Link>
        <Link href="/database">Database</Link>
        <Link href="/material-price">Admin Prices</Link>
      </nav>
    </header>
  )
}