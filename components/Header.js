import Link from 'next/link';
export default function Header(){
  return(
    <header>
      <img src="/logo.png" alt="logo"/>
      <h1>Raven's Scrap & Supply</h1>
      <nav>
        <Link href="/">Materials</Link>
        <Link href="/database">Database</Link>
        <Link href="/material-price">Admin Prices</Link>
      </nav>
    </header>
  )
}