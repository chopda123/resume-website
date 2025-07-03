import Image from 'next/image';
// import { motion } from 'framer-motion';
import { m as motion } from 'framer-motion';


export default function PreviewModal({ template, onClose }) {
  if (!template) return null;
  
  const imageUrl = template.mainImage?.asset?.url;
  const altText = template.mainImage?.alt || template.title || 'Template preview';

  return (
    <motion.div 
      className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 border-b border-premium-cream flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-serif font-bold text-premium-navy">{template.title}</h2>
            <div className="flex items-center mt-2">
              <span className="bg-premium-gold/10 text-premium-gold px-3 py-1 rounded-full text-sm font-medium mr-4">
                {template.category}
              </span>
              <div className="flex text-premium-gold">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-premium-charcoal hover:text-premium-navy p-2 rounded-full hover:bg-premium-cream"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-10 p-8 overflow-auto">
          <div className="bg-premium-cream rounded-2xl p-6 flex items-center justify-center">
            {imageUrl ? (
              <div className="relative w-full h-[60vh]">
                <Image
                  src={imageUrl}
                  alt={altText}
                  fill
                  className="object-contain"
                  unoptimized
                  priority
                />
              </div>
            ) : (
              <div className="h-64 bg-premium-cream flex items-center justify-center rounded-2xl w-full">
                <p className="text-premium-charcoal/50">No preview available</p>
              </div>
            )}
          </div>
          
          <div className="flex flex-col">
            <div className="mb-8">
              <h3 className="text-xl font-serif font-bold text-premium-navy mb-4">Template Details</h3>
              <p className="text-premium-charcoal">
                {template.description || "This premium resume template is professionally designed to showcase your skills and experience in the best possible light. With clean typography, balanced layouts, and strategic use of white space, it creates a powerful first impression that gets you noticed."}
              </p>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-serif font-bold text-premium-navy mb-4">Key Features</h3>
              <ul className="space-y-3">
                {[
                  "Professionally designed layout optimized for ATS systems",
                  "Fully customizable in Canva with no design skills needed",
                  "Includes A4 and US Letter size versions",
                  "Modern typography with strategic visual hierarchy",
                  "Clean, distraction-free design that highlights your content",
                  "Compatible with all industries and experience levels"
                ].map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-premium-gold mr-3 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-premium-charcoal">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-auto pt-8 border-t border-premium-cream">
              <a 
                href={template.canvaLink || "#"} 
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-premium-gold to-premium-gold/90 hover:from-premium-gold/90 hover:to-premium-gold text-premium-navy text-center py-4 rounded-full text-lg font-bold shadow-lg hover:shadow-xl block transition-all"
              >
                Edit This Template in Canva
              </a>
              <button
                onClick={onClose}
                className="w-full mt-4 text-premium-charcoal hover:text-premium-navy font-medium py-3"
              >
                Back to Templates Collection
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

