import Link from 'next/link'
export default function Header(){return(<header style={{background:'#111',padding:10,color:'#d4af37'}}>
  <nav><Link href="/">Home</Link> | <Link href="/database">Database</Link> | <Link href="/material-price">Admin Prices</Link></nav>
</header>)}