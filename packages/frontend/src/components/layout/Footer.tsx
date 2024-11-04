import React, { useState } from 'react';
import { motion } from 'framer-motion'; // You'll need to install framer-motion

const Footer: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleContactClick = () => {
    window.open('https://github.com/spencer0', '_blank');
  };

  return (
<footer className="fixed bottom-0 w-full h-[18vh] bg-black bg-opacity-25">
  <div className="relative w-full h-full flex justify-between items-end p-6">
        {/* Contact Button */}
        <button
          onClick={handleContactClick}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Contact Me
        </button>

        {/* PDF to Money Animation */}
        <div className="relative w-16 h-16">
          <motion.div
            initial="pdf"
            animate={isAnimating ? "money" : "pdf"}
            onClick={() => setIsAnimating(!isAnimating)}
            variants={{
              pdf: {
                rotate: 0,
                scale: 1,
              },
              money: {
                rotate: 360,
                scale: 1.2,
              },
            }}
            transition={{ duration: 0.5 }}
            className="cursor-pointer"
          >
            {!isAnimating ? (
              // PDF Icon
              <svg
                className="w-16 h-16 text-red-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M4 4v12h12V4H4zm11 11H5V5h10v10z" />
                <path d="M7 7h6v2H7V7zm0 4h6v2H7v-2z" />
              </svg>
            ) : (
              // Dollar Bills Icon
              <div className="relative">
                {[...Array(3)].map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ y: 0 }}
                    animate={{ y: index * -10 }}
                    className="absolute"
                    style={{ zIndex: 3 - index } as any}
                  >
                    <svg
                      className="w-16 h-16 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm2-1h10a1 1 0 011 1v10a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;