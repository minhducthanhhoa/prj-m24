import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

const socialLinks = [
  { href: "#", icon: <FaFacebookF /> },
  { href: "#", icon: <FaTwitter /> },
  { href: "#", icon: <FaInstagram /> },
  { href: "#", icon: <FaLinkedinIn /> },
];

const quickLinks = [
  { label: "Home", href: "#" },
  { label: "Products", href: "#" },
  { label: "About Us", href: "#" },
  { label: "Contact", href: "#" },
];

const contactInfo = [
  { text: "123 Main Street, Anytown USA", icon: <FaMapMarkerAlt /> },
  { text: "+1 (234) 567-890", href: "tel:+1234567890", icon: <FaPhoneAlt /> },
  { text: "info@phonestore.com", href: "mailto:info@phonestore.com", icon: <FaEnvelope /> },
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 py-8 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* About */}
          <div>
            <h3 className="mb-4 text-lg font-bold">About Us</h3>
            <p className="mb-4 text-gray-400">
              Phone Store is a leading provider of the latest smartphones and accessories.
              We offer a wide range of products from top brands at competitive prices.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((s, idx) => (
                <a
                  key={idx}
                  href={s.href}
                  className="text-gray-400 transition-colors hover:text-white"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="text-gray-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Contact Us</h3>
            <ul className="space-y-2">
              {contactInfo.map((item, idx) => (
                <li key={idx} className="flex items-center space-x-2 text-gray-400">
                  <span>{item.icon}</span>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="transition-colors hover:text-white"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <p>{item.text}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p className="text-gray-400">© {new Date().getFullYear()} Phone Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
