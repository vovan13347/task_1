import React, { useState, useEffect } from 'react';
import './App.css';
import './notes.css';
import NoteForm from './NoteForm';
import NotesList from './NotesList';

function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [{ text: 'Initial note' }];
  });
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (text) => {
    const newNotes = [...notes, { text }];
    setNotes(newNotes);
  };

  const editNote = (index, newText) => {
    const newNotes = [...notes];
    newNotes[index].text = newText;
    setNotes(newNotes);
    setEditingIndex(null);
  };

  const deleteNote = (index) => {
    const newNotes = notes.filter((_, i) => i !== index);
    setNotes(newNotes);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
  };

  const handleFormSubmit = (text) => {
    if (editingIndex !== null) {
      editNote(editingIndex, text);
    } else {
      addNote(text);
    }
  };

  return (
    <div className="App">
      <h1>Мои заметки</h1>
      <NoteForm
        onSubmit={handleFormSubmit}
        initialText={editingIndex !== null ? notes[editingIndex].text : ''}
      />
      <NotesList
        notes={notes}
        onEdit={handleEdit}
        onDelete={deleteNote}
      />
    </div>
  );
}

export default App;
