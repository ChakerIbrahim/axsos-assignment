import { useState } from "react";

/* -------------------------------------------------------------
   ONE form, used by BOTH create and update.
   The pages differ only in what they pass down:
     initialTitle / initialPrice / initialDescription
        — blank for create, the current values for update
     onSubmitProp
        — a function that POSTs or PATCHes
     buttonText
        — "Create" or "Update"
------------------------------------------------------------- */
const ProductForm = (props) => {

  // pull the props into local variables
  const {
    initialTitle,
    initialPrice,
    initialDescription,
    onSubmitProp,
    buttonText
  } = props;

  // the three inputs start as whatever the parent gave us.
  // That's how the update form arrives pre-filled.
  const [title, setTitle] = useState(initialTitle);
  const [price, setPrice] = useState(initialPrice);
  const [description, setDescription] = useState(initialDescription);

  const handleSubmit = (e) => {
    // stop the browser reloading the page
    e.preventDefault();

    // hand the data UP and let the parent decide what to do with it.
    // This component doesn't know or care whether it creates or updates.
    onSubmitProp({ title, price, description });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="price">Price</label>
        <input
          type="number"
          name="price"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* the label changes with the job, so it's a prop too */}
      <input type="submit" value={buttonText} />
    </form>
  );
};

export default ProductForm;