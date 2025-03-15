import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <div className="page-container">
      <h1 className="page-heading gradient-heading">Contact Us</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="glass-card">
          <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-100">Get in Touch</h2>
          
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Your name"
                  className="w-full rounded-md border border-gray-300 dark:border-gray-600 p-2 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Your email"
                  className="w-full rounded-md border border-gray-300 dark:border-gray-600 p-2 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                placeholder="Subject of your message"
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 p-2 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="Your message"
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 p-2 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:text-white resize-none"
              ></textarea>
            </div>
            
            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>
        </div>
        
        <div className="space-y-6">
          <div className="glass-card">
            <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-100">Contact Information</h2>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <Mail className="text-brand-600 dark:text-brand-400 mr-3 mt-1" size={20} />
                <div>
                  <h3 className="font-medium text-gray-800 dark:text-gray-200">Email</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    <a href="mailto:contact@annaseva.org" className="hover:text-brand-600 dark:hover:text-brand-400">
                      contact@annaseva.org
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="text-brand-600 dark:text-brand-400 mr-3 mt-1" size={20} />
                <div>
                  <h3 className="font-medium text-gray-800 dark:text-gray-200">Phone</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    <a href="tel:+919876543210" className="hover:text-brand-600 dark:hover:text-brand-400">
                      +91 98765 43210
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="text-brand-600 dark:text-brand-400 mr-3 mt-1" size={20} />
                <div>
                  <h3 className="font-medium text-gray-800 dark:text-gray-200">Address</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    123 Food Street, Tech Hub<br />
                    Bangalore, Karnataka 560001<br />
                    India
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock className="text-brand-600 dark:text-brand-400 mr-3 mt-1" size={20} />
                <div>
                  <h3 className="font-medium text-gray-800 dark:text-gray-200">Operating Hours</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 10:00 AM - 4:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="glass-card">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">FAQ</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Have questions about how Annaseva works? Check out our frequently asked questions.
            </p>
            <Button variant="outline" asChild>
              <Link to="/faqs">View FAQs</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
