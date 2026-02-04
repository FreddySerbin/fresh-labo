'use client';

import { FC } from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';
import { Logo } from '@/components/common/Logo';

export const Footer: FC = () => {
  return (
    <footer className="bg-dark-navy text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Logo width={160} height={53} className="h-10 w-auto" href="/" />
            <p className="text-gray-400 text-sm">
              Service de nettoyage professionnel pour matelas, véhicules, tapis et
              canapés.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-poppins font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/services/matelas"
                  className="text-gray-400 hover:text-primary-cyan transition-colors"
                >
                  Matelas
                </Link>
              </li>
              <li>
                <Link
                  href="/services/vehicules"
                  className="text-gray-400 hover:text-primary-cyan transition-colors"
                >
                  Véhicules
                </Link>
              </li>
              <li>
                <Link
                  href="/services/tapis"
                  className="text-gray-400 hover:text-primary-cyan transition-colors"
                >
                  Tapis
                </Link>
              </li>
              <li>
                <Link
                  href="/services/canapes"
                  className="text-gray-400 hover:text-primary-cyan transition-colors"
                >
                  Canapés
                </Link>
              </li>
            </ul>
          </div>

          {/* À propos */}
          <div>
            <h4 className="font-poppins font-semibold mb-4">À propos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-primary-cyan transition-colors"
                >
                  Qui sommes-nous
                </Link>
              </li>
              <li>
                <Link
                  href="/about/how-it-works"
                  className="text-gray-400 hover:text-primary-cyan transition-colors"
                >
                  Comment ça marche
                </Link>
              </li>
              <li>
                <Link
                  href="/about/faq"
                  className="text-gray-400 hover:text-primary-cyan transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-primary-cyan transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-poppins font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary-cyan" />
                <a
                  href="tel:0695057796"
                  className="text-gray-400 hover:text-primary-cyan transition-colors"
                >
                  06 95 05 77 96
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary-cyan" />
                <a
                  href="mailto:contact@freshlabo.com"
                  className="text-gray-400 hover:text-primary-cyan transition-colors"
                >
                  contact@freshlabo.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary-cyan" />
                <span className="text-gray-400">Paris & Île-de-France</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>&copy; 2024 Fresh Lab'O. Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link
              href="/legal/mentions"
              className="hover:text-primary-cyan transition-colors"
            >
              Mentions légales
            </Link>
            <Link
              href="/legal/privacy"
              className="hover:text-primary-cyan transition-colors"
            >
              Confidentialité
            </Link>
            <Link
              href="/legal/cgv"
              className="hover:text-primary-cyan transition-colors"
            >
              CGV
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
