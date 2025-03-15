
import React from 'react';
import { Link } from 'react-router-dom';

const Privacy = () => {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="page-container">
      <h1 className="page-heading">Privacy Policy</h1>
      
      <div className="glass-card mb-8">
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Last Updated: {currentDate}
        </div>
        
        <div className="space-y-6 text-gray-700 dark:text-gray-300">
          <section>
            <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Introduction</h2>
            <p>
              At Annaseva, we are committed to protecting your privacy and ensuring the security of your personal information. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform. 
              Please read this policy carefully to understand our practices regarding your personal data.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Information We Collect</h2>
            <p className="mb-3">
              We collect several types of information from and about users of our platform, including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Personal Information:</strong> When you register on our platform, we collect your name, email address, phone number, and organization details.
              </li>
              <li>
                <strong>Profile Information:</strong> For restaurants, we collect information about your location, operating hours, and food donation capacity. For NGOs, we collect information about your service area, capacity to distribute food, and beneficiary details.
              </li>
              <li>
                <strong>Donation Information:</strong> We collect data about food donations, including type, quantity, expiration, pickup times, and delivery details.
              </li>
              <li>
                <strong>Usage Information:</strong> We collect information about how you interact with our platform, including access times, pages viewed, and features used.
              </li>
              <li>
                <strong>Device Information:</strong> We collect information about the device and internet connection you use to access our platform, including IP address, browser type, operating system, and device identifiers.
              </li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">How We Use Your Information</h2>
            <p className="mb-3">
              We use the information we collect for various purposes, including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Facilitating connections between restaurants with surplus food and NGOs who can distribute it</li>
              <li>Managing your account and providing you with customer support</li>
              <li>Processing and tracking food donations</li>
              <li>Communicating with you about your account, donations, and platform updates</li>
              <li>Improving our platform and developing new features</li>
              <li>Analyzing usage patterns and trends</li>
              <li>Ensuring the security and integrity of our platform</li>
              <li>Complying with legal obligations</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Information Sharing and Disclosure</h2>
            <p className="mb-3">
              We may share your information in the following circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Between Platform Users:</strong> To facilitate food donations, we share relevant information between restaurants and NGOs, such as contact details, location, and donation specifics.
              </li>
              <li>
                <strong>Service Providers:</strong> We may share your information with third-party service providers who perform services on our behalf, such as hosting, data analysis, payment processing, and customer service.
              </li>
              <li>
                <strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities.
              </li>
              <li>
                <strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction.
              </li>
              <li>
                <strong>With Your Consent:</strong> We may share your information with third parties when you have given us your consent to do so.
              </li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Data Security</h2>
            <p>
              We have implemented appropriate technical and organizational measures to protect the security of your personal information. 
              However, please be aware that no method of transmission over the internet or electronic storage is 100% secure. 
              While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Your Rights</h2>
            <p className="mb-3">
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The right to access and receive a copy of your personal information</li>
              <li>The right to rectify or update your personal information</li>
              <li>The right to delete your personal information</li>
              <li>The right to restrict or object to our processing of your personal information</li>
              <li>The right to data portability</li>
              <li>The right to withdraw consent</li>
            </ul>
            <p className="mt-3">
              To exercise these rights, please contact us at privacy@annaseva.org.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. 
              You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="mt-2">
              <strong>Email:</strong> <a href="mailto:privacy@annaseva.org" className="text-brand-600 dark:text-brand-400 hover:underline">privacy@annaseva.org</a>
            </p>
            <p>
              <strong>Address:</strong> 123 Food Street, Tech Hub, Bangalore, Karnataka 560001, India
            </p>
          </section>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            By using our platform, you consent to our Privacy Policy and agree to its terms.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            For more information about our practices, please see our <Link to="/terms" className="text-brand-600 dark:text-brand-400 hover:underline">Terms of Service</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
