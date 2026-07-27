// Header shows the big page title inside an <h1>.
// It receives its text through props from App.
const Header = (props) => {
  const { text } = props   // pull "text" out of the props object
  return (
    <h1>{text}</h1>        // display whatever text was passed in
  )
}

export default Header