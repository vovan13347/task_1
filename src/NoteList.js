import React from 'react';
import NoteForm from './NoteForm';

function NoteList({ notes, onEdit, onDelete }) {
  return (
    <div>
      {notes.map((note, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <div
            dangerouslySetInnerHTML={{ __html: note.text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>') }}
          />
          <button onClick={() => onEdit(index, note.text)}>Edit</button>
          <button onClick={() => onDelete(index)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default NoteList;