import './globals.css';
import { Space_Grotesk, Share_Tech_Mono } from 'next/font/google';

const grotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
});

const techMono = Share_Tech_Mono({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-mono',
});

export const metadata = {
  title: 'Apex Urban | High-Performance Club Gym',
  description:
    'Apex Urban: an industrial brutalist training lab with neon-blue energy, immersive 3D hero, and cutting-edge classes for elite performance.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${grotesk.variable} ${techMono.variable}`}>{children}</body>
    </html>
  );
}
