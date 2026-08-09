import React, { useState } from 'react';

/* -------------------------------------------------------------
   BONUS: the confirm popup.
   This component owns one boolean — whether the dialog is open.
   It doesn't know or care what deleting actually does; it just
   calls the function it was handed once the user confirms.
------------------------------------------------------------- */
const DeleteButton = (props) => {

    const { successCallback, playerName } = props;

    const [showConfirm, setShowConfirm] = useState(false);

    const handleConfirm = () => {
        // close the popup, then run the parent's delete logic
        setShowConfirm(false);
        successCallback();
    };

    return (
        <>
            <button className="delete-btn" onClick={ (e) => setShowConfirm(true) }>
                Delete
            </button>

            {/* the popup only exists in the DOM while showConfirm
                is true — that's conditional rendering */}
            { showConfirm
                ? <div className="popup-background">
                    <div className="popup-box">
                        <p>Remove <strong>{ playerName }</strong> from the team?</p>
                        <button className="cancel-btn" onClick={ (e) => setShowConfirm(false) }>
                            Cancel
                        </button>
                        <button className="delete-btn" onClick={ handleConfirm }>
                            Yes, delete
                        </button>
                    </div>
                  </div>
                : "" }
        </>
    );
};

export default DeleteButton;