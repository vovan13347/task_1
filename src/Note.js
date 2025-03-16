import React from 'react';

const Note = ({ text, onEdit, onDelete }) => {
  return (
    <div className="note">
      <div dangerouslySetInnerHTML={{ __html: text }}></div>
      <button onClick={onEdit}>Редактировать</button>
      <button onClick={onDelete}>Удалить</button>
    </div>
  );
};

export default Note;