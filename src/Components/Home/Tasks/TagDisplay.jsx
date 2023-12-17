import React from 'react';

const TagDisplay = ({ tags }) => {
  // Puedes agregar más etiquetas y estilos según tus necesidades
  const tagStyles = {
    ANDROID: { background: 'rgba(0, 255, 0, 0.04)', color: '#22ff00' },
    IOS: { background: 'rgba(255, 255, 255, 0.1)', color: 'white' },
    REACT: { background: 'rgba(0, 0, 255, 0.04)', color: '#0011ff' },
    NODE_JS: { background: 'rgba(0, 191, 255, 0.07)', color: '#0080ff' },
    RAILS: { background: 'rgba(255, 0, 221, 0.07)', color: '#ff00aa' },
    // Agrega más etiquetas y estilos aquí
  };

  // Dividir las etiquetas y mapearlas para aplicar estilos
  const tagElements = tags.map((tag) => (
    <div
      key={tag}
      style={{
        padding: '4px',
        margin: '2px',
        borderRadius: '4px',
        ...tagStyles[tag],
      }}
    >
      {tag}
    </div>
  ));

  return <div className="flex">{tagElements}</div>;
};

export default TagDisplay;