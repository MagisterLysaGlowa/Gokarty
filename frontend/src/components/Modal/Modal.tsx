
interface ModalProps {
  onAbort: () => void;
  onConfirm: () => void;
  title: string | undefined;
  message: string | undefined;
  id: string | undefined;
}

export const Modal: React.FC<ModalProps> = ({ onAbort, onConfirm, title, message, id }) => {
  return (
    <div
        className="modal fade"
        id={id}
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {title}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => onAbort()}
              />
            </div>
            <div className="modal-body">
              {message}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => onAbort()}
              >
                Nie
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => onConfirm()}
              >
                Tak
              </button>
            </div>
          </div>
        </div>
      </div>
  )
}
export default Modal;