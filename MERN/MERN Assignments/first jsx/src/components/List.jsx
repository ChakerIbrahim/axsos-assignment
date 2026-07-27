// List shows a bullet list built from an array of items.
const List = (props) => {
  // Pull "items" out of props. The "= []" is a default:
  // if no items are passed, use an empty array so .map() won't crash.
  const { items = [] } = props;
  return (
    <ul>
      {/* Loop over every item and turn it into an <li>.
          "key" gives React a unique id for each list item. */}
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};

export default List;