import { useEffect, useState } from 'react';
import { FaTrash, FaEdit, FaCheck, FaSave, FaTimes } from 'react-icons/fa';

function StreamList() {
  const [item, setItem] = useState('');
  const [streamList, setStreamList] = useState(() => {
    try {
      const savedList = localStorage.getItem('streamList');
      return savedList ? JSON.parse(savedList) : [];
    } catch {
      return [];
    }
  });
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState('');
useEffect(() => {
    try {
      localStorage.setItem('streamList', JSON.stringify(streamList));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  }, [streamList]);

  const handleAdd = () => {
    if (item.trim() === '') return;

    const newItem = {
      id: Date.now(),
      title: item,
      completed: false,
    };

    setStreamList([...streamList, newItem]);
    setItem('');
  };

  const handleDelete = (id) => {
    setStreamList(streamList.filter((movie) => movie.id !== id));
  };

  const handleComplete = (id) => {
    setStreamList(
      streamList.map((movie) =>
        movie.id === id ? { ...movie, completed: !movie.completed } : movie
      )
    );
  };

  const handleEdit = (movie) => {
    setEditingId(movie.id);
    setEditedText(movie.title);
  };

  const handleSave = (id) => {
    if (editedText.trim() === '') return;

    setStreamList(
      streamList.map((movie) =>
        movie.id === id ? { ...movie, title: editedText } : movie
      )
    );

    setEditingId(null);
    setEditedText('');
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedText('');
  };

  return (
    <section className="page-card">
      <h2>My StreamList</h2>
      <p>Create your personal movie or show watch list.</p>

      <form
        className="input-group"
        onSubmit={(e) => {
          e.preventDefault();
          handleAdd();
        }}
      >
        <input
          type="text"
          placeholder="Enter a movie or show title"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <div className="list-area">
        {streamList.length === 0 ? (
          <p className="empty-message">No movies or shows added.</p>
        ) : (
          streamList.map((movie) => (
            <div
              key={movie.id}
              className={`list-item ${movie.completed ? 'completed' : ''}`}
            >
              {editingId === movie.id ? (
                <>
                  <input
                    className="edit-input"
                    type="text"
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                  />

                  <div className="action-buttons">
                    <button onClick={() => handleSave(movie.id)} aria-label="Save changes">
                      <FaSave />
                    </button>
                    <button onClick={handleCancel} aria-label="Cancel editing">
                      <FaTimes />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <span>{movie.title}</span>

                  <div className="action-buttons">
                    <button onClick={() => handleComplete(movie.id)} aria-label={movie.completed ? 'Mark as unwatched' : 'Mark as watched'}>
                      <FaCheck />
                    </button>
                    <button onClick={() => handleEdit(movie)} aria-label="Edit title">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(movie.id)} aria-label="Delete movie">
                      <FaTrash />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default StreamList;