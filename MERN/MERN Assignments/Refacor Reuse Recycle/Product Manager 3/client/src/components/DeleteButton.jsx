import axios from "axios";

/* -------------------------------------------------------------
   ONE delete button, droppable anywhere.
   It knows how to delete a product, but NOT what should happen
   afterwards — the parent passes that in as successCallback.
     ProductList sends: remove the row from state
     ProductDetail sends: navigate back to the list
------------------------------------------------------------- */
const DeleteButton = (props) => {

  const { productId, successCallback } = props;

  const deleteProduct = async () => {
    try {
      await axios.delete("http://localhost:8000/api/products/" + productId);

      // gone from the database — now run whatever the parent
      // wants to happen next
      successCallback();
    } catch (err) {
      console.log(err);
    }
  };

  return <button onClick={deleteProduct}>Delete</button>;
};

export default DeleteButton;