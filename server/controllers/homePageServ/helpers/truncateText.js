
export default function truncateText(text, wordLimit = 10) {
    const words = text.split(' '); 
    if (words.length <= wordLimit) {
      return text; 
    }
    const truncatedWords = words.slice(0, wordLimit); 
    return truncatedWords.join(' ') + '...'; 
  }

  // Ejemplo de uso
//   const text = "Texto de ejemplo para llenar la descripcion. Se editara en su momento";
//   const truncatedText = truncateText(text, 12);

  