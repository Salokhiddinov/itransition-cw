import BaseCard from "./BaseCard";

function Modal(props) {
    function cancelHandler(){props.onCancel()};
    function confirmHandler(){props.onConfirm()};
    
    
      return (
        // <div className="modal">
        //   <p>Are You Sure?</p>
        //   <button className="btn btn--alt" onClick={cancelHandler}>Cancel</button>
        //   <button className="btn" onClick={confirmHandler}>Confirm</button>
        // </div>
        <>
        <BaseCard>
            <button className="btn btn--alt" onClick={cancelHandler}>Cancel</button>
            {props.children}
        </BaseCard>
        </>
      );
    }
    
    
    export default Modal;