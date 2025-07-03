'use client';
import { useEffect, useState, useRef } from 'react';
import { client } from '@/lib/sanity';
import { templatesQuery } from '@/lib/queries';
import TemplateCard from '@/components/TemplateCard';
import CategoryFilter from '@/components/CategoryFilter';
import PreviewModal from '@/components/PreviewModal';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaArrowRight, FaTimes } from 'react-icons/fa';

export default function Home() {
  const scrollRef = useRef(null);
  const [templates, setTemplates] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Calculate categories
  const categoryArray = templates.map(t => t.category).filter(Boolean);
  const uniqueCategories = [...new Set(categoryArray)];
  const categories = ['all', ...uniqueCategories];
  
  // Filter templates
  const filteredTemplates = templates.filter(template => 
    activeCategory === 'all' || template.category === activeCategory
  );

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setLoading(true);
        const data = await client.fetch(templatesQuery);
        
        if (!data || data.length === 0) {
          throw new Error('No templates found. Please create some in Sanity Studio.');
        }
        
        setTemplates(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching templates:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTemplates();
  }, []);

  // Scroll to section
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle navigation links
  const handleNavigation = (e, sectionId) => {
    e.preventDefault();
    scrollToSection(sectionId);
  };

  // Handle resource links
  const handleResourceClick = (e) => {
    e.preventDefault();
    setShowComingSoon(true);
  };

  // Scroll templates horizontally
  const scrollTemplates = (direction) => {
    if (scrollRef.current) {
      const { current: container } = scrollRef;
      const scrollAmount = direction === 'left' ? -500 : 500;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Coming Soon Modal */}
      {showComingSoon && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md text-center">
            <h3 className="text-2xl font-serif font-bold text-premium-navy mb-4">Coming Soon!</h3>
            <p className="text-premium-charcoal mb-6">
              This feature is currently under development. We're working hard to bring you an amazing experience.
            </p>
            <button 
              onClick={() => setShowComingSoon(false)}
              className="bg-premium-gold text-premium-navy px-6 py-3 rounded-full font-bold hover:bg-premium-gold/90 transition-colors"
            >
              Continue Browsing
            </button>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed inset-0 bg-premium-navy z-50 p-4 md:hidden"
        >
          <div className="flex justify-end mb-8">
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="text-premium-cream"
            >
              <FaTimes size={24} />
            </button>
          </div>
          
          <div className="flex flex-col space-y-8 items-center">
            <a 
              href="#templates" 
              onClick={(e) => {
                handleNavigation(e, 'templates');
                setMobileMenuOpen(false);
              }}
              className="text-premium-cream hover:text-premium-gold text-xl"
            >
              Templates
            </a>
            <a 
              href="#how-it-works" 
              onClick={(e) => {
                handleNavigation(e, 'how-it-works');
                setMobileMenuOpen(false);
              }}
              className="text-premium-cream hover:text-premium-gold text-xl"
            >
              How It Works
            </a>
            <a 
              href="#testimonials" 
              onClick={(e) => {
                handleNavigation(e, 'testimonials');
                setMobileMenuOpen(false);
              }}
              className="text-premium-cream hover:text-premium-gold text-xl"
            >
              Testimonials
            </a>
            <button 
              onClick={(e) => {
                handleNavigation(e, 'templates');
                setMobileMenuOpen(false);
              }}
              className="bg-premium-gold text-premium-navy px-5 py-2 rounded-full font-medium"
            >
              Get Started
            </button>
          </div>
        </motion.div>
      )}

      {/* Premium Header */}
      <header className="bg-premium-navy text-premium-cream py-4 px-4 md:px-8 border-b border-premium-gold/20 sticky top-0 z-40">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div 
              className="flex items-center space-x-4 cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="w-12 h-12 bg-premium-gold rounded-full flex items-center justify-center">
                <span className="text-premium-navy font-serif font-bold text-xl">R</span>
              </div>
              <div>
                <h1 className="text-2xl font-serif font-bold tracking-wide">ResumeCraft</h1>
              </div>
            </div>
            
            <nav className="hidden md:flex space-x-8 items-center">
              <a 
                href="#templates" 
                onClick={(e) => handleNavigation(e, 'templates')}
                className="hover:text-premium-gold transition-colors duration-300"
              >
                Templates
              </a>
              <a 
                href="#how-it-works" 
                onClick={(e) => handleNavigation(e, 'how-it-works')}
                className="hover:text-premium-gold transition-colors duration-300"
              >
                How It Works
              </a>
              <a 
                href="#testimonials" 
                onClick={(e) => handleNavigation(e, 'testimonials')}
                className="hover:text-premium-gold transition-colors duration-300"
              >
                Testimonials
              </a>
              <button 
                onClick={(e) => handleNavigation(e, 'templates')}
                className="bg-premium-gold text-premium-navy px-5 py-2 rounded-full font-medium hover:bg-premium-gold/90 transition-all duration-300"
              >
                Get Started
              </button>
            </nav>
            
            <button 
              className="md:hidden text-premium-cream"
              onClick={() => setMobileMenuOpen(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Premium Hero Section */}
      <section className="relative pt-16 pb-24 md:pt-24 md:pb-32 px-4 overflow-hidden">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="order-2 lg:order-1"
            >
              <div className="mb-6">
                <span className="inline-block bg-premium-gold/10 text-premium-gold px-4 py-1 rounded-full text-sm font-medium mb-4">
                  PREMIUM COLLECTION
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 sm:mb-6 leading-tight">
                  Craft Your <span className="text-premium-gold">Career Story</span> with Elegance
                </h1>
                <p className="text-lg md:text-xl text-premium-charcoal mb-8 md:mb-10 max-w-2xl">
                  Professionally designed resume templates that get you noticed. Edit directly in Canva and land your dream job faster.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-6">
                <button 
                  onClick={(e) => handleNavigation(e, 'templates')}
                  className="bg-premium-gold hover:bg-premium-gold/90 text-premium-navy px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-base md:text-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                >
                  Browse Templates
                </button>
                <button 
                  onClick={(e) => handleNavigation(e, 'how-it-works')}
                  className="border-2 border-premium-navy text-premium-navy hover:bg-premium-navy hover:text-premium-cream px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-base md:text-lg transition-all duration-300"
                >
                  How It Works
                </button>
              </div>
            </motion.div>
            
            <motion.div 
              className="relative order-1 lg:order-2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] max-w-md mx-auto border-4 border-premium-gold">
                <div className="absolute inset-0 bg-gradient-to-b from-premium-gold/5 to-premium-navy/20 z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1625014618427-fbc980b974f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80"
                  alt="Premium Resume Template"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-premium-teal/10 rounded-full blur-xl z-0"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Premium Templates Section */}
      <section id="templates" className="py-16 md:py-20 px-4 bg-white relative">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-block text-premium-gold font-serif text-xl mb-4">OUR COLLECTION</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Premium Resume Templates</h2>
            <p className="text-lg md:text-xl text-premium-charcoal max-w-3xl mx-auto">
              Curated by professional designers to showcase your skills and experience in the best light
            </p>
          </div>
          
          {/* Category Filter */}
          <div className="flex justify-center mb-10 md:mb-16">
            <CategoryFilter 
              categories={categories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          </div>
          
          {/* Templates Carousel */}
          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-premium-gold mx-auto"></div>
              <p className="mt-6 text-lg text-premium-charcoal">Loading premium templates...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20 bg-premium-cream rounded-2xl shadow-sm max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-premium-navy mb-6">Error Loading Templates</h2>
              <p className="mb-8 text-premium-charcoal">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="bg-premium-gold text-premium-navy px-8 py-3 rounded-full text-lg font-bold hover:bg-premium-gold/90 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : filteredTemplates.length === 0 ? (
            <div className="text-center py-20 bg-premium-cream rounded-2xl shadow-sm max-w-3xl mx-auto">
              <p className="text-xl mb-6 text-premium-charcoal">No templates found for "{activeCategory}"</p>
              <button 
                onClick={() => setActiveCategory('all')}
                className="bg-premium-gold text-premium-navy px-8 py-3 rounded-full text-lg font-bold hover:bg-premium-gold/90 transition-colors"
              >
                View All Premium Templates
              </button>
            </div>
          ) : (
            <div className="relative">
              <button 
                onClick={() => scrollTemplates('left')}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-premium-gold text-premium-navy p-3 rounded-full shadow-lg hover:bg-premium-gold/90 transition-colors hidden md:block"
                aria-label="Scroll left"
              >
                <FaArrowLeft size={24} />
              </button>
              
              <div 
                ref={scrollRef}
                className="flex overflow-x-auto pb-10 scrollbar-hide space-x-4 md:space-x-8 py-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {filteredTemplates.map(template => (
                  <div key={template._id} className="flex-shrink-0 w-[280px] md:w-80 lg:w-96">
                    <TemplateCard 
                      template={template} 
                      onPreview={() => setPreviewTemplate(template)}
                    />
                  </div>
                ))}
              </div>
              
              <button 
                onClick={() => scrollTemplates('right')}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-premium-gold text-premium-navy p-3 rounded-full shadow-lg hover:bg-premium-gold/90 transition-colors hidden md:block"
                aria-label="Scroll right"
              >
                <FaArrowRight size={24} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Premium How It Works */}
      <section id="how-it-works" className="py-16 md:py-20 px-4 bg-premium-navy text-premium-cream">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <span className="inline-block text-premium-gold font-serif text-xl mb-4">PROCESS</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">How It Works</h2>
            <p className="text-lg md:text-xl text-premium-cream/80 max-w-3xl mx-auto">
              Get your dream-job ready resume in just three simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
            {[
              {number: '01', title: "Choose Your Template", desc: "Browse our premium collection and select the perfect design for your industry"},
              {number: '02', title: "Customize in Canva", desc: "Edit directly in Canva with no design skills needed"},
              {number: '03', title: "Download & Apply", desc: "Download as PDF and start applying to top companies"},
            ].map((step, index) => (
              <div key={index} className="bg-premium-charcoal/30 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-premium-gold/20 transition-all hover:border-premium-gold/50">
                <div className="text-premium-gold text-4xl md:text-5xl font-serif font-bold mb-4 md:mb-6">{step.number}</div>
                <h3 className="text-xl md:text-2xl font-serif font-bold mb-3 md:mb-4">{step.title}</h3>
                <p className="text-premium-cream/70 text-sm md:text-base">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Testimonials */}
      {/* <section id="testimonials" className="py-16 md:py-20 px-4 bg-premium-cream">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <span className="inline-block text-premium-gold font-serif text-xl mb-4">SUCCESS STORIES</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">What Our Users Say</h2>
            <p className="text-lg md:text-xl text-premium-charcoal/80 max-w-3xl mx-auto">
              Join thousands of professionals who landed their dream jobs with our templates
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-6 md:gap-10">
            {[
              {name: "Sarah Johnson", role: "Senior Product Manager", quote: "The premium templates made my resume stand out immediately. I got interview calls from all 5 companies I applied to!"},
              {name: "Michael Chen", role: "Lead Software Engineer", quote: "After using the tech resume template, recruiters started reaching out to me instead of the other way around."},
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="p-6 md:p-8">
                  <div className="flex items-start mb-4 md:mb-6">
                    <div className="text-premium-gold text-4xl md:text-5xl font-serif mr-3 md:mr-4">“</div>
                    <p className="text-lg md:text-xl text-premium-charcoal">{testimonial.quote}</p>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12 md:w-16 md:h-16" />
                    <div className="ml-4">
                      <p className="font-bold text-base md:text-lg">{testimonial.name}</p>
                      <p className="text-premium-charcoal/70 text-sm md:text-base">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}


      <section id="testimonials" className="py-16 md:py-20 px-4 bg-premium-cream">
  <div className="container mx-auto max-w-6xl">
    <div className="text-center mb-16">
      <span className="inline-block text-premium-gold font-serif text-xl mb-4">SUCCESS STORIES</span>
      <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">What Our Users Say</h2>
      <p className="text-lg md:text-xl text-premium-charcoal/80 max-w-3xl mx-auto">
        Join thousands of professionals who landed their dream jobs with our templates
      </p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
      {[
        {
          name: "Rajesh Kumar", 
          role: "Senior Software Engineer", 
          quote: "The professional template helped me land a job at TCS. The ATS optimization made my resume stand out!",
          image: "/indian-user1.jpg"
        },
        {
          name: "Priya Sharma", 
          role: "Marketing Manager", 
          quote: "After using the modern template, I received 3 job offers within a week. Highly recommended!",
          image: "/indian-user2.jpg"
        },
        {
          name: "Amit Patel", 
          role: "Product Designer", 
          quote: "The creative template perfectly showcased my portfolio. I got hired by a top design firm in Bangalore.",
          image: "/indian-user3.jpg"
        }
      ].map((testimonial, index) => (
        <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="flex items-start mb-4 md:mb-6">
              <div className="text-premium-gold text-4xl md:text-5xl font-serif mr-3 md:mr-4">“</div>
              <p className="text-lg md:text-xl text-premium-charcoal">{testimonial.quote}</p>
            </div>
            
            <div className="flex items-center">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12 md:w-16 md:h-16" />
              <div className="ml-4">
                <p className="font-bold text-base md:text-lg">{testimonial.name}</p>
                <p className="text-premium-charcoal/70 text-sm md:text-base">{testimonial.role}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Premium CTA */}
      <section className="py-16 md:py-20 px-4 bg-gradient-to-r from-premium-navy to-premium-charcoal text-premium-cream">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6 md:mb-8">Ready to Transform Your Career?</h2>
          <p className="text-lg md:text-xl mb-8 md:mb-10 max-w-2xl mx-auto">
            Access our premium template collection and start creating your standout resume today
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button 
              onClick={(e) => handleNavigation(e, 'templates')}
              className="bg-premium-gold hover:bg-premium-gold/90 text-premium-navy px-8 py-4 md:px-10 md:py-5 rounded-full font-bold text-base md:text-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
            >
              Browse Premium Templates
            </button>
            <button 
              onClick={handleResourceClick}
              className="border-2 border-premium-cream text-premium-cream hover:bg-premium-cream hover:text-premium-navy px-8 py-4 md:px-10 md:py-5 rounded-full font-bold text-base md:text-lg transition-all duration-300"
            >
              View Pricing
            </button>
          </div>
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="bg-premium-charcoal text-premium-cream py-12 md:py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
            <div>
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-premium-gold rounded-full flex items-center justify-center">
                  <span className="text-premium-navy font-serif font-bold text-lg md:text-xl">R</span>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-serif font-bold">ResumeCraft</h3>
                </div>
              </div>
              <p className="text-premium-cream/70 mb-6 text-sm md:text-base">
                Professionally designed resume templates to elevate your career prospects.
              </p>
              <div className="flex space-x-4">
                {['twitter', 'linkedin', 'instagram', 'facebook'].map((social) => (
                  <a key={social} href="#" className="text-premium-cream/70 hover:text-premium-gold transition-colors">
                    <span className="sr-only">{social}</span>
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8" />
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-serif text-lg md:text-xl font-bold mb-4 md:mb-6">Templates</h4>
              <ul className="space-y-2 md:space-y-4">
                {categories.filter(cat => cat !== 'all').slice(0, 5).map((cat, i) => (
                  <li key={i}>
                    <a 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveCategory(cat);
                        scrollToSection('templates');
                      }}
                      className="text-premium-cream/70 hover:text-premium-gold transition-colors text-sm md:text-base"
                    >
                      {cat}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-serif text-lg md:text-xl font-bold mb-4 md:mb-6">Resources</h4>
              <ul className="space-y-2 md:space-y-4">
                {['Resume Tips', 'Cover Letters', 'Interview Prep', 'Career Advice', 'Blog'].map((item, i) => (
                  <li key={i}>
                    <a 
                      href="#" 
                      onClick={handleResourceClick}
                      className="text-premium-cream/70 hover:text-premium-gold transition-colors text-sm md:text-base"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-serif text-lg md:text-xl font-bold mb-4 md:mb-6">Company</h4>
              <ul className="space-y-2 md:space-y-4">
                {['About Us', 'Contact', 'Pricing', 'Testimonials', 'Careers'].map((item, i) => (
                  <li key={i}>
                    <a 
                      href="#" 
                      onClick={handleResourceClick}
                      className="text-premium-cream/70 hover:text-premium-gold transition-colors text-sm md:text-base"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="border-t border-premium-gold/20 mt-12 md:mt-16 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-premium-cream/50 text-xs md:text-sm mb-3 md:mb-0">
              © {new Date().getFullYear()} ResumeCraft. All rights reserved.
            </p>
            <div className="flex space-x-4 md:space-x-6">
              <a href="#" className="text-premium-cream/50 hover:text-premium-cream text-xs md:text-sm">Privacy Policy</a>
              <a href="#" className="text-premium-cream/50 hover:text-premium-cream text-xs md:text-sm">Terms of Service</a>
              <a href="#" className="text-premium-cream/50 hover:text-premium-cream text-xs md:text-sm">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Preview Modal */}
      {previewTemplate && (
        <PreviewModal 
          template={previewTemplate} 
          onClose={() => setPreviewTemplate(null)} 
        />
      )}
    </div>
  );
}