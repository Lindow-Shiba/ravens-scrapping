import Header from '../components/Header';

export default function Home() {
  return (
    <>
      <Header />
      <div className="p-4">
        <h2 style={{ color: 'var(--gold)' }}>Invoice Generator (Front Page Placeholder)</h2>
        <p>This is a placeholder. Replace this file with your full invoice logic if needed.</p>
      </div>
    </>
  );
}