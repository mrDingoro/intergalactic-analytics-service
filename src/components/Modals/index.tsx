import { createPortal } from 'react-dom';
import { useEffect, useRef, type FC, type ReactNode } from 'react';
import styles from './Modal.module.css';

interface ModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  size?: 'small' | 'medium' | 'large' | 'fullscreen';
  className?: string;
}

const ModalWrapper: FC<ModalWrapperProps> = ({
  isOpen,
  onClose,
  children,
  title,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  size = 'medium',
  className = '',
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (closeOnEscape && e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      previouslyFocusedElement.current = document.activeElement as HTMLElement;
      modalRef.current?.focus();
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);

      if (isOpen) {
        document.body.style.overflow = 'unset';
        previouslyFocusedElement.current?.focus();
      }
    };
  }, [isOpen, closeOnEscape, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  const getModalRoot = () => {
    let modalRoot = document.getElementById('modal-root');

    if (!modalRoot) {
      modalRoot = document.createElement('div');
      modalRoot.id = 'modal-root';
      document.body.appendChild(modalRoot);
    }

    return modalRoot;
  };

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div
      className={styles.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <div ref={modalRef} className={`${styles.modal} ${styles[size]} ${className}`} tabIndex={-1}>
        {title && (
          <div className={styles.header}>
            <h2 id="modal-title" className={styles.title}>
              {title}
            </h2>
            <button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
              ✕
            </button>
          </div>
        )}

        {!title && (
          <button className={styles.closeButtonTopRight} onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        )}

        <div className={styles.content}>{children}</div>
      </div>
    </div>,
    getModalRoot(),
  );
};

export default ModalWrapper;
