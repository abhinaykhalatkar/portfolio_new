import './About.scss';
import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { PageAnimationContext } from '../../Context/PageAnimationContext/PageAnimationContext';

export default function AboutPage() {
  const { pageVariants,pageTransition } = useContext(PageAnimationContext);



  return (
    <motion.div
      className='p-About'
      initial='initial'
      animate='animate'
      exit='exit'
      variants={pageVariants}
      transition={pageTransition}
    >
      <h1>Hey from the About Page</h1>
      <p>About abhinay</p>
    </motion.div>
  );
}
