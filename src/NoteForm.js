import React, { useState, useEffect, useRef } from 'react';

const NoteForm = ({ onSubmit, initialText = '' }) => {
  const [formattedText, setFormattedText] = useState(initialText);
  const contentEditableRef = useRef(null);

  useEffect(() => {
    if (contentEditableRef.current) {
      contentEditableRef.current.innerHTML = initialText;
    }
  }, [initialText]);

  const applyFormatting = (command, value = null) => {
    document.execCommand(command, false, value);
    updateFormattedText();
  };

  const handleBold = () => {
    applyFormatting('bold');
    contentEditableRef.current.focus();
  };
  const handleItalic = () => {
    applyFormatting('italic');
    contentEditableRef.current.focus();
  };
  const handleUnderline = () => {
    applyFormatting('underline');
    contentEditableRef.current.focus();
  };

  const handleFontChange = (font) => {
    applyFormatting('fontName', font);
    contentEditableRef.current.focus();
  };
  
  const handleFontSizeChange = (size) => {
    applyFormatting('fontSize', size);
    contentEditableRef.current.focus();
  };
  
  const updateFormattedText = () => {
    if (contentEditableRef.current) {
      setFormattedText(contentEditableRef.current.innerHTML);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = img.width / 8;
          canvas.height = img.height / 8;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const resizedDataUrl = canvas.toDataURL('image/jpeg');
          document.execCommand('insertImage', false, resizedDataUrl);
          updateFormattedText();
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formattedText);
    if (contentEditableRef.current) {
      contentEditableRef.current.innerHTML = '';
    }
    setFormattedText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        ref={contentEditableRef}
        contentEditable
        style={{ width: '100%', height: '400px', border: '1px solid #ccc', padding: '10px', outline: 'none' }}
        onInput={updateFormattedText}
        placeholder="Ваша заметка..."
      ></div>
      <div>
        <button type="button" onClick={handleBold}>Bold</button>
        <button type="button" onClick={handleItalic}>Italic</button>
        <button type="button" onClick={handleUnderline}>Underline</button>
        <select onChange={(e) => handleFontChange(e.target.value)}>
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
          <option value="Georgia">Georgia</option>
          <option value="Verdana">Verdana</option>
        </select>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      <select onChange={(e) => handleFontSizeChange(e.target.value)}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
      </select>
    </div>
    <button type="submit">Сохранить</button>
    </form>
  );
};

export default NoteForm;