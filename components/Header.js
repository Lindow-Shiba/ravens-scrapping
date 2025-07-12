
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-black text-gold p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <img src="/logo.png" alt="logo" className="h-8 w-auto" />
        <h1 className="text-xl font-bold">Raven's Scrap & Supply</h1>
      </div>
      <nav className="space-x-2">
        <Link href="/"><button className="border border-gold px-2 py-1 rounded">Materials</button></Link>
        <Link href="/database"><button className="border border-gold px-2 py-1 rounded">Database</button></Link>
        <Link href="/material-price"><button className="border border-gold px-2 py-1 rounded">Admin Prices</button></Link>
      </nav>
    </header>
  );
}
