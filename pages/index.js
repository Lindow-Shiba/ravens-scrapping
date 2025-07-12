
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import '../styles/globals.css';

const carInternals = ["Axle Parts", "Body Repair Tools", "Brake Pads", "Clutch Kits", "Fuel Straps", "Radiator Part", "Suspension Parts", "Tire Repair Kit", "Transmission Parts", "Wires"];
const materials = ["Aluminium", "Battery", "Carbon", "Clutch Fluid", "Coil Spring", "Copper", "Copper Wires", "Electronics", "Graphite", "Iron", "Laminated Plastic", "Lead", "Multi-Purpose Grease", "Paint Thinner", "Plastic", "Polymer", "Polyethylene", "Rubber", "Rusted Metal", "Scrap Metal", "Silicone", "Stainless Steel", "Steel", "Timing Belt", "Gun Powder", "Iron Ore"];
const extraItems = ["Apple Phone", "Adv Lockpick", "Bottle Cap", "Deformed Nail", "Empty Bottle Glass", "Horse Shoe", "Leather", "Lockpick", "Old Coin", "Pork & Beans", "Repair Kit", "Rusted Lighter", "Rusted Tin Can", "Rusted Watch", "Samsung Phone"];

export default function Home() {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [warehouse, setWarehouse] = useState('');
  const [date, setDate] = useState(new Date().toLocaleDateString('en-US'));
  const [notes, setNotes] = useState('');

  return (
    <div>
      <Header />
      <div className="grid grid-cols-2 min-h-screen p-4 text-white bg-black">
        <div className="flex flex-col justify-between border-r border-gold p-4">
          <div>
            <h2 className="text-xl font-bold text-gold mb-2">Receipt</h2>
            <div className="grid grid-cols-2 gap-2 font-bold text-gold mb-2">
              <span>Item</span>
              <span>Qty</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <select value={selectedEmployeeId} onChange={e => setSelectedEmployeeId(e.target.value)} className="p-2 bg-black border border-gold rounded text-white">
              <option>Select your Name</option>
            </select>
            <select value={warehouse} onChange={e => setWarehouse(e.target.value)} className="p-2 bg-black border border-gold rounded text-white">
              <option>Select Warehouse</option>
              <option value="Bennys">Bennys</option>
              <option value="AE">AE</option>
            </select>
            <input type="text" value={date} onChange={e => setDate(e.target.value)} className="p-2 bg-black border border-gold rounded text-white" />
            <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Notes" className="p-2 bg-black border border-gold rounded text-white" />
            <button className="p-2 bg-gold text-black font-bold rounded">Download Invoice</button>
            <span className="text-gold mt-2">Commission (0%): $0.00</span>
          </div>
        </div>
        <div className="p-4">
          <Section title="Car Internals" items={carInternals} />
          <Section title="Materials" items={materials} />
          <Section title="Extra Items" items={extraItems} />
        </div>
      </div>
    </div>
  );
}

function Section({ title, items }) {
  return (
    <div className="mb-4">
      <h3 className="text-lg font-bold text-gold mb-2">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item, idx) => (
          <button key={idx} className="bg-gold text-black px-2 py-1 rounded">{item}</button>
        ))}
      </div>
    </div>
  );
}
