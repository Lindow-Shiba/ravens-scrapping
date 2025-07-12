
export default function Header() {
  return (
    <header style={{ background: '#111', padding: '10px 20px', color: '#d4af37', display: 'flex', alignItems: 'center' }}>
      <img src="/logo.png" alt="logo" height={30} style={{ marginRight: 10 }} />
      <h1>Raven's Scrap & Supply</h1>
    </header>
  );
}
