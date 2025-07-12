export default function Header() {
  return (
    <header className="header">
      <img src="/logo.png" alt="logo" className="logo" />
      <h1>Raven's Scrap & Supply</h1>
      <nav className="nav-links">
        <a href="/">Materials</a>
        <a href="/database">Database</a>
        <a href="/material-price">Admin Prices</a>
      </nav>
    </header>
  );
}