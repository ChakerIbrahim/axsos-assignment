// Title shows a smaller subheading inside an <h2>.
// Same idea as Header, just a different tag.
const Title = (props) => {
  const { text } = props   // pull "text" out of props
  return (
    <h2>{text}</h2>        // display the text passed in
  )
}

export default Title