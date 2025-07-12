import { useEffect, useState } from 'react';
import Image from 'next/image';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const PW = 'RavenAdmin';

export default function MaterialPrice() {
  // auth gate
  const [allowed, setAllowed] = useState(false);
  const [pw, setPw] = useState('');

  // data state
  const [rows, setRows] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editPrice, setEditPrice] = useState('');

  const load = async () => {
    const { data, error } = await supabase.from('materials').select('id,name,price').order('name');
    if (!error) setRows(data);
  };

  useEffect(() => { load(); }, []);

  const save = async (id) => {
    const { error } = await supabase.from('materials').update({ price: parseFloat(editPrice) }).eq('id', id);
    if (!error) { setEditId(null); setEditPrice(''); load(); }
  };

  // shared nav style
  const nav = (active) => ({
    padding:'6px 12px',
    background: active ? '#d1b07b' : '#000',
    color: active ? '#000' : '#d1b07b',
    border:'1px solid #d1b07b',
    cursor:'pointer',
    textDecoration:'none',
    fontWeight:600
  });

  if(!allowed){
    return (
      <div style={{minHeight:'100vh',background:'#000',color:'#d1b07b',display:'flex',flexDirection:'column'}}>
        <header style={{display:'flex',alignItems:'center',gap:12,padding:'8px 16px',background:'#111',borderBottom:'1px solid #333'}}>
          <Image src='/raven-logo.png' alt='logo' width={60} height={60}/>
          <h1 style={{fontSize:28,fontWeight:700}}>Raven's Scrap & Supply</h1>
          <div style={{marginLeft:'auto',display:'flex',gap:8}}>
            <a href='/' style={nav(false)}>Materials</a>
            <a href='/?page=database' style={nav(false)}>Database</a>
            <a href='/material-price' style={nav(true)}>Admin Prices</a>
          </div>
        </header>
        <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center'}}>
          <div style={{textAlign:'center'}}>
            <h2 style={{marginBottom:12}}>Enter Admin Password</h2>
            <input
              type='password'
              value={pw}
              onChange={e=>setPw(e.target.value)}
              style={{padding:'6px 12px',border:'1px solid #555',borderRadius:4}}
            />
            <div style={{marginTop:12}}>
              <button onClick={()=>{pw===PW?setAllowed(true):alert('Incorrect');}}
                style={{padding:'6px 18px',background:'#d1b07b',color:'#000',border:'none',fontWeight:600}}>
                Unlock
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{minHeight:'100vh',background:'#000',color:'#d1b07b',display:'flex',flexDirection:'column'}}>
      <header style={{display:'flex',alignItems:'center',gap:12,padding:'8px 16px',background:'#111',borderBottom:'1px solid #333'}}>
        <Image src='/raven-logo.png' alt='logo' width={60} height={60}/>
        <h1 style={{fontSize:28,fontWeight:700}}>Raven's Scrap & Supply</h1>
        <div style={{marginLeft:'auto',display:'flex',gap:8}}>
          <a href='/' style={nav(false)}>Materials</a>
          <a href='/?page=database' style={nav(false)}>Database</a>
          <a href='/material-price' style={nav(true)}>Admin Prices</a>
        </div>
      </header>

      <main style={{flex:1,padding:24}}>
        <h2 style={{fontSize:24,fontWeight:700,marginBottom:16}}>Material Price Admin</h2>
        <div style={{overflowX:'auto',maxWidth:600}}>
          <table style={{width:'100%',borderCollapse:'collapse'}}>
            <thead>
              <tr>
                <th style={{textAlign:'left',padding:'8px 4px'}}>Name</th>
                <th style={{textAlign:'right',padding:'8px 4px'}}>Price</th>
                <th style={{textAlign:'right',padding:'8px 4px'}}>Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(r=>(
                <tr key={r.id} style={{borderTop:'1px solid #333'}}>
                  <td style={{padding:'6px 4px'}}>{r.name}</td>
                  <td style={{padding:'6px 4px',textAlign:'right'}}>
                    {editId===r.id?
                      <input
                        type='number'
                        value={editPrice}
                        onChange={e=>setEditPrice(e.target.value)}
                        style={{width:80,textAlign:'right',padding:'4px'}}
                      />
                      : `$${r.price.toFixed(2)}`
                    }
                  </td>
                  <td style={{padding:'6px 4px',textAlign:'right'}}>
                    {editId===r.id?(
                      <>
                        <button onClick={()=>save(r.id)}
                          style={{padding:'4px 10px',marginRight:4,background:'#d1b07b',color:'#000',border:'none'}}>
                          Save
                        </button>
                        <button onClick={()=>setEditId(null)}
                          style={{padding:'4px 10px',background:'#666',color:'#fff',border:'none'}}>
                          Cancel
                        </button>
                      </>
                    ):(
                      <button onClick={()=>{setEditId(r.id);setEditPrice(String(r.price));}}
                        style={{padding:'4px 10px',background:'#d1b07b',color:'#000',border:'none'}}>
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}