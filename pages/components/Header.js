export default function Header(){
  return(
    <header>
      <img src="/logo.png" alt="logo"/>
      <h1>Raven's Scrap & Supply</h1>
      <nav className="nav">
        <a href="/">Materials</a>
        <a href="/database">Database</a>
        <a href="/material-price">Admin&nbsp;Prices</a>
      </nav>
    </header>
  );
}