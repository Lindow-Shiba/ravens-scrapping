import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header>
      <Image src="/logo.png" alt="Raven's Logo" width={40} height={40} />
      <h1 style={{ marginRight: 'auto' }}>Raven's Scrap & Supply</h1>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/database">Database</Link>
        <Link href="/material-price">Admin Prices</Link>
      </nav>
    </header>
  );
}