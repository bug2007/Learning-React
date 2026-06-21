import { useContext, useRef, useState } from 'react';
import { motion, useAnimate, stagger } from 'framer-motion';

import { ChallengesContext } from '../store/challenges-context.jsx';
import Modal from './Modal.jsx';
import images from '../assets/images.js';

export default function NewChallenge({ onDone }) {
  const title = useRef();
  const description = useRef();
  const deadline = useRef();

  const [scope, animate] = useAnimate(); // scope is a ref. animate is a func which u can use to trigger an animation

  const [selectedImage, setSelectedImage] = useState(null);
  const { addChallenge } = useContext(ChallengesContext);

  function handleSelectImage(image) {
    setSelectedImage(image);
  }

  function handleSubmit(event) {
    event.preventDefault(); 
    const challenge = {
      title: title.current.value,
      description: description.current.value,
      deadline: deadline.current.value,
      image: selectedImage,
    };

    if (
      !challenge.title.trim() ||
      !challenge.description.trim() ||
      !challenge.deadline.trim() ||
      !challenge.image
    ) {
      animate('input, textarea', { x: [-10, 0, 10, 0] }, { type: 'string', duration: 0.2, delay: stagger(0.05) }) // delay of 0.05s between the inputs and textarea animations so that we dont shake them simultaneously
      return;
    }

    onDone();
    addChallenge(challenge);
  }

  return (
    <Modal title="New Challenge" onClose={onDone}>
      {/* now animate()  will only select inputs and textareas inside of this form */}
      <form id="new-challenge" onSubmit={handleSubmit} ref={scope}> 
        <p>
          <label htmlFor="title">Title</label>
          <input ref={title} type="text" name="title" id="title" />
        </p>

        <p>
          <label htmlFor="description">Description</label>
          <textarea ref={description} name="description" id="description" />
        </p>

        <p>
          <label htmlFor="deadline">Deadline</label>
          <input ref={deadline} type="date" name="deadline" id="deadline" />
        </p>

        <motion.ul id="new-challenge-images"
          variants={{
            visible: { transition: {staggerChildren: 0.05}} //the delay between the animations of each child component e.g li. they will animate one after the other instead of animating simultaneously by default
          }}>
          {images.map((image) => (
            <motion.li
              variants={{
                hidden: {opacity: 0, scale: 0.5}, // these variants will automatically activate when they active on the parent component e.g Modal.jsx
                visible: {opacity: 1, scale: [0.8, 1.3, 1]} // scales to a size of 0.8 then 1.3 then finally 1
              }}
              exit={{opacity: 1, scale: 1}}
              transition={{type: 'spring'}}
              key={image.alt}
              onClick={() => handleSelectImage(image)}
              className={selectedImage === image ? 'selected' : undefined}
            >
              <img {...image} />
            </motion.li>
          ))}
        </motion.ul>

        <p className="new-challenge-actions">
          <button type="button" onClick={onDone}>
            Cancel
          </button>
          <button>Add Challenge</button>
        </p>
      </form>
    </Modal>
  );
}
