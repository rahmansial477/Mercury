import React from 'react';
import { motion } from 'motion/react';

export const Architecture: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#282020] bg-[#000000]">
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-4xl space-y-8"
      >
        <h2 className="font-cinzel text-4xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight">
          The Architecture of Truth.
        </h2>

        <div className="space-y-6 text-sm sm:text-base text-[#D1C9C1] font-light leading-relaxed max-w-3xl">
          <p>
            In a digital landscape where origin and ownership are constantly contested, establishing irrefutable truth is paramount. Mercury provides a decentralized architecture for archival and verification, moving beyond trust and into mathematical certainty.
          </p>

          <p>
            By leveraging cryptographic signatures and decentralized storage, we eliminate the need for centralized arbiters. Your data remains yours, cryptographically sealed and permanently verifiable.
          </p>

          <p className="text-white font-normal pt-2">
            This is not just storage; it is the infrastructure for a verifiable digital legacy.
          </p>
        </div>
      </motion.div>
    </section>
  );
};
