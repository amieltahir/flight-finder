import { useState } from 'react';

export default function App() {
  const [form, setForm] = useState({
    origin: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    isRoundTrip: false,
    budget: '',
    enableBudget: false,
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('http://localhost:3000/api/flights/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ error: 'Failed to fetch results' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1>Cheapest Flight Finder</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Origin:
          <input type="text" name="origin" value={form.origin} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Destination:
          <input type="text" name="destination" value={form.destination} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Departure Date:
          <input type="date" name="departureDate" value={form.departureDate} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Round Trip:
          <input type="checkbox" name="isRoundTrip" checked={form.isRoundTrip} onChange={handleChange} />
        </label>
        <br />
        {form.isRoundTrip && (
          <>
            <label>
              Return Date:
              <input type="date" name="returnDate" value={form.returnDate} onChange={handleChange} />
            </label>
            <br />
          </>
        )}
        <label>
          Enable Budget:
          <input type="checkbox" name="enableBudget" checked={form.enableBudget} onChange={handleChange} />
        </label>
        <br />
        {form.enableBudget && (
          <>
            <label>
              Budget ($):
              <input type="number" name="budget" value={form.budget} onChange={handleChange} min="0" />
            </label>
            <br />
          </>
        )}
        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search Flights'}
        </button>
      </form>

      {result && (
        <div style={{ marginTop: 20 }}>
          <h2>Results:</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
