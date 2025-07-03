import './globals.css';

export const metadata = {
  title: 'ResumeCraft | Premium Resume Templates',
  description: 'Professionally designed resume templates to elevate your career prospects. Edit directly in Canva.',
  openGraph: {
    title: 'ResumeCraft | Premium Resume Templates',
    description: 'Stand out from the crowd with our premium resume templates',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ResumeCraft Premium Templates',
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-premium-cream text-premium-navy font-sans antialiased">
        {children}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-premium-teal/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-premium-gold/5 rounded-full blur-3xl"></div>
        </div>
      </body>
    </html>
  );
}