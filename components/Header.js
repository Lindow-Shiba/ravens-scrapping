import Link from 'next/link';
export default function Header() {
  return (
    <header>
      <div><strong>Ravens Supply</strong></div>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/database">Database</Link>
        <Link href="/material-price">Admin Prices</Link>
      </nav>
    </header>
  );
}