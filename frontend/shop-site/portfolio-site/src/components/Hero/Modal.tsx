import { motion } from "framer-motion";
import styles from "./Modal.module.css";
import { useEffect, useRef } from "react";

const Modal = ({ onClose }: { onClose: () => void }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [onClose]);

  return (
    <motion.div 
      className={styles.overlay}
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className={styles.modal}
        ref={modalRef}
        initial={{ scale: 0.8, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        exit={{ scale: 0.8, opacity: 0 }}
      >
        <h2>Bald verfügbar!</h2>
        <p>Diese Funktion ist bald verfügbar. Bleib gespannt! 💼</p>
        <button onClick={onClose} className={styles.closeBtn}>Schließen</button>
      </motion.div>
    </motion.div>
  );
};

export default Modal;
