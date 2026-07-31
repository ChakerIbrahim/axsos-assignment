// useParams is a hook that reads the dynamic parts of the current URL.
import { useParams } from "react-router-dom";

const Display = () => {
  // useParams() returns an object whose keys match the ":names"
  // written in the Route path. Our route is "/:value", so the object
  // looks like { value: "4" } or { value: "hello" }.
  // We destructure it to pull out the piece we care about.
  const { value } = useParams();

  // URL params are ALWAYS strings — "4" is a string, not the number 4.
  // The unary "+" tries to convert that string to a number:
  //   +"4"     -> 4        (a real number)
  //   +"hello" -> NaN      ("Not a Number")
  // isNaN() then tells us whether the conversion failed:
  //   isNaN(+"4")     -> false  ->  it IS a number
  //   isNaN(+"hello") -> true   ->  it is NOT a number
  // We flip it with "!" so the variable name reads truthfully.
  const isNumber = !isNaN(+value);

  return (
    // A ternary picks one of two template literals.
    // Note the BACKTICKS ` ` — they allow ${value} to be substituted in.
    // Single quotes would print the literal text "${value}" instead.
    <h1>{isNumber ? `The number is: ${value}` : `The word is: ${value}`}</h1>
  );
};

export default Display;