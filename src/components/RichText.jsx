import React from 'react';

/**
 * Parses simple markdown for bold (**text**) and italic (*text*)
 * and returns an array of React elements.
 */
export default function RichText({ text, className, style }) {
  if (!text) return null;

  // We use a regex to split by bold or italic markers.
  // This is a naive but effective parser for simple resume formatting.
  // Regex matches **bold**, then *italic*
  const parseMarkup = (str) => {
    if (typeof str !== 'string') return str;
    
    // Split by **bold**
    const boldParts = str.split(/(\*\*.*?\*\*)/g);
    
    return boldParts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      
      // For parts that aren't bold, check for *italic*
      const italicParts = part.split(/(\*.*?\*)/g);
      return italicParts.map((subPart, j) => {
        if (subPart.startsWith('*') && subPart.endsWith('*')) {
          return <em key={`${i}-${j}`}>{subPart.slice(1, -1)}</em>;
        }
        return subPart;
      });
    });
  };

  return (
    <span className={className} style={style}>
      {parseMarkup(text)}
    </span>
  );
}
