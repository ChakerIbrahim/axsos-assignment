import { useParams } from "react-router-dom";

const StyledWord = () => {
  // Our route is "/:word/:color/:bgColor", so for the URL
  // "/hello/blue/red" this returns:
  //   { word: "hello", color: "blue", bgColor: "red" }
  // Destructuring all three at once.
  const { word, color, bgColor } = useParams();

  return (
    // Inline styles in React take a JAVASCRIPT OBJECT, not a CSS string.
    // The outer {} means "start JS expression", the inner {} is the object.
    // Property names are camelCase: backgroundColor, NOT background-color.
    // The values come straight from the URL, so any valid CSS color works.
    <h1 style={{ color: color, backgroundColor: bgColor }}>
      The word is: {word}
    </h1>
  );
};

export default StyledWord;