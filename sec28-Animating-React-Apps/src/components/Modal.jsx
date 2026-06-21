import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';

export default function Modal({ title, children, onClose }) {
  return createPortal(
    <>
      <div className="backdrop" onClick={onClose} />
      <motion.dialog 
        // initial={{opacity: 0, y: 30}}
        // animate={{opacity: 1, y: 0}}
        // exit={{opacity: 0, y: 30}}  // import AnimatePresence in Header.jsx for it to work. because by default, when react removes elements from the DOM, they instantly disappear without any animation
        variants={{
          hidden: {opacity: 0, y: 30},  // key names are upto u
          visible: {opacity: 1, y: 0}
        }}
        initial="hidden"
        animate="visible"
        exit="hidden"
        open className="modal">
        <h2>{title}</h2>
        {children}
      </motion.dialog>
    </>, 
    document.getElementById('modal')
  );
}
