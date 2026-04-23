import { useState } from 'react';

function StreamList() {
  const [item, setItem] = useState('');

  const handleAdd = () => {
    if (item.trim() === '') return;
    console.log(`Added to StreamList: ${item}`);
    setItem('');
  };

  return (
    <section className="page-card">
      <h2>My StreamList</h2>
      <p>Select show. Select movie. Watch. Repeat.</p>

      <div className="input-group">
        <input
          type="text"
          placeholder="Enter a movie or show title"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
      </div>
    </section>
  );
}

export default StreamList;