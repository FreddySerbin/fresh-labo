'use client';

import { FC, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/common/Logo';

export const Header: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-black backdrop-blur-sm shadow-sm shadow-primary-cyan/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-40">
          {/* Logo */}
          <Logo width={480} height={160} className="h-40 w-auto" />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-white hover:text-primary-cyan transition-colors font-medium"
            >
              Accueil
            </Link>
            <Link
              href="/services"
              className="text-white hover:text-primary-cyan transition-colors font-medium"
            >
              Services
            </Link>
            <Link
              href="/about"
              className="text-white hover:text-primary-cyan transition-colors font-medium"
            >
              À propos
            </Link>
            <Link
              href="/contact"
              className="text-white hover:text-primary-cyan transition-colors font-medium"
            >
              Contact
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/booking">
              <Button variant="primary" size="md">
                Réserver
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white hover:text-primary-cyan transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden py-4 border-t border-primary-cyan/20"
          >
            <nav className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-white hover:text-primary-cyan transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Accueil
              </Link>
              <Link
                href="/services"
                className="text-white hover:text-primary-cyan transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/about"
                className="text-white hover:text-primary-cyan transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                À propos
              </Link>
              <Link
                href="/contact"
                className="text-white hover:text-primary-cyan transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link href="/booking" onClick={() => setIsMenuOpen(false)}>
                <Button variant="primary" size="md" className="w-full">
                  Réserver
                </Button>
              </Link>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
};
