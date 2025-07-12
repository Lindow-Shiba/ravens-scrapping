
import Link from 'next/link'
export default function Header () {
  return (
    <header style={{ display: 'flex', alignItems: 'center', padding: 10, background: '#111', color: '#d4af37' }}>
      <img src='/logo.png' alt='logo' height='40' style={{ marginRight: 12 }} />
      <h1 style={{ margin: '0 auto 0 0' }}>Raven's Scrap & Supply</h1>
      <nav>
        <Link href='/'><a style={{ margin: '0 8px' }}>Materials</a></Link>
        <Link href='/database'><a style={{ margin: '0 8px' }}>Database</a></Link>
        <Link href='/material-price'><a style={{ margin: '0 8px' }}>Admin Prices</a></Link>
      </nav>
    </header>
  )
}
