interface ModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  onClose: () => void;
  onConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  message,
  confirmText,
  cancelText,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className=" fixed inset-0 flex items-center justify-center">
      <div className="dark:bg-gray-800 rounded-sm bg-white p-8">
        <h3 className="mb-2 text-lg font-semibold">{title}</h3>
        <p>
          {message.split('\n').map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </p>
        <div className="mt-6 flex justify-end">
          <button
            className="mr-2 rounded-sm bg-danger px-2 py-1 text-white transition-transform hover:scale-105"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
          <button
            className="rounded-sm bg-primary px-2 py-1 text-white transition-transform hover:scale-105"
            onClick={onClose}
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
