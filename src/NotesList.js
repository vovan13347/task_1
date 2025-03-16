import React from 'react';
import Note from './Note';

const NotesList = ({ notes, onEdit, onDelete }) => {
  return (
    <div className="notes-list">
      {notes.map((note, index) => (
        <Note
          key={index}
          text={note.text}
          onEdit={() => onEdit(index)}
          onDelete={() => onDelete(index)}
        />
      ))}
    </div>
  );
};

export default NotesList;