import { useState, useEffect } from 'react';
import Header from '@/components/Header';

export default function Home() {
  const [qtys, setQtys] = useState({});
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [warehouse, setWarehouse] = useState('Bennys');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    // Fetch from Supabase
    fetch('/api/employees')
      .then(res => res.json())
      .then(data => setEmployees(data));
  }, []);

  const sections = {
    'Car Internals': ["Axle Parts", "Body Repair Tools", "Brake Pads", "Clutch Kits", "Fuel Straps", "Radiator Part", "Suspension Parts", "Tire Repair Kit", "Transmission Parts", "Wires"],
    'Materials': ["Aluminium", "Battery", "Carbon", "Clutch Fluid", "Coil Spring", "Copper", "Copper Wires", "Electronics", "Graphite", "Iron", "Laminated Plastic", "Lead", "Multi-Purpose Grease", "Paint Thinner", "Plastic", "Polymer", "Polyethylene", "Rubber", "Rusted Metal", "Scrap Metal", "Silicone", "Stainless Steel", "Steel", "Timing Belt", "Gun Powder", "Iron Ore"],
    'Extra Items': ["Apple Phone", "Adv Lockpick", "Bottle Cap", "Deformed Nail", "Empty Bottle Glass", "Horse Shoe", "Leather", "Lockpick", "Old Coin", "Pork & Beans", "Repair Kit", "Rusted Lighter", "Rusted Tin Can", "Rusted Watch", "Samsung Phone"]
  };

  const handleQtyChange = (item, value) => {
    setQtys({ ...qtys, [item]: value });
  };

  return (
    <>
      <Header />
      <div style={{ display: 'flex', padding: '20px' }}>
        {/* Left Side: Receipt */}
        <div style={{ flex: 1, marginRight: '20px' }}>
          <h2>Receipt</h2>
          <div>
            <label>Employee:</label>
            <select value={selectedEmployee} onChange={e => setSelectedEmployee(e.target.value)}>
              <option value="">Select</option>
              {employees.map(emp => (
                <option key={emp.id} value={emp.id}>{emp.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Warehouse:</label>
            <select value={warehouse} onChange={e => setWarehouse(e.target.value)}>
              <option value="Bennys">Bennys</option>
              <option value="AE">AE</option>
            </select>
          </div>
          <div>
            <label>Date:</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} />
          </div>
          <div>
            <label>Notes:</label>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} />
          </div>
          <div>
            <button onClick={() => alert("Invoice downloaded!")}>Download Invoice</button>
          </div>
        </div>

        {/* Right Side: Items */}
        <div style={{ flex: 2 }}>
          {Object.entries(sections).map(([section, items]) => (
            <div key={section}>
              <h3>{section}</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {items.map(item => (
                  <div key={item} style={{ margin: '5px', display: 'flex', alignItems: 'center' }}>
                    <label>{item}</label>
                    <input type="number" style={{ width: '50px', marginLeft: '5px' }}
                      value={qtys[item] || ''} onChange={(e) => handleQtyChange(item, e.target.value)} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}