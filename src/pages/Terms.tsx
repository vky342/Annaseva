
import React from 'react';
import { Link } from 'react-router-dom';

const Terms = () => {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="page-container">
      <h1 className="page-heading">Terms of Service</h1>
      
      <div className="glass-card mb-8">
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Last Updated: {currentDate}
        </div>
        
        <div className="space-y-6 text-gray-700 dark:text-gray-300">
          <section>
            <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Introduction</h2>
            <p>
              Welcome to Annaseva. These Terms of Service ("Terms") govern your access to and use of the Annaseva platform, 
              including our website, services, and applications (collectively, the "Platform"). 
              By accessing or using our Platform, you agree to be bound by these Terms. 
              If you disagree with any part of the Terms, you may not access the Platform.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Account Registration</h2>
            <p className="mb-3">
              To use certain features of the Platform, you must register for an account. When you register, you agree to provide accurate, current, and complete information about yourself. You are responsible for:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Maintaining the confidentiality of your account and password</li>
              <li>Restricting access to your computer or device</li>
              <li>Accepting responsibility for all activities that occur under your account</li>
            </ul>
            <p className="mt-3">
              If you suspect any unauthorized use of your account, you must notify us immediately. We reserve the right to suspend or terminate accounts that provide inaccurate, false, or incomplete information.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Platform Use</h2>
            <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">For Restaurants:</h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>You agree to provide accurate information about your restaurant and food donations</li>
              <li>You are responsible for ensuring the safety and quality of donated food</li>
              <li>You agree to follow all applicable food safety regulations and guidelines</li>
              <li>You will make donated food available for pickup as described in your donation listing</li>
              <li>You will not discriminate against any NGO based on protected characteristics</li>
            </ul>
            
            <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">For NGOs:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>You agree to provide accurate information about your organization</li>
              <li>You will only claim donations that you can effectively distribute</li>
              <li>You are responsible for inspecting donated food for quality and safety upon pickup</li>
              <li>You will pick up claimed donations at the agreed-upon time</li>
              <li>You will use donated food only for charitable purposes</li>
              <li>You will follow all applicable regulations for food handling and distribution</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Prohibited Activities</h2>
            <p className="mb-3">
              You agree not to engage in any of the following prohibited activities:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Using the Platform for any illegal purpose or in violation of any local, state, national, or international law</li>
              <li>Violating the rights of others, including intellectual property rights</li>
              <li>Attempting to interfere with, compromise, or disrupt the Platform or servers</li>
              <li>Impersonating or misrepresenting your affiliation with any person or entity</li>
              <li>Engaging in any automated use of the system, such as using scripts to send messages or upload content</li>
              <li>Trying to access areas or features of the Platform that you are not authorized to access</li>
              <li>Using the Platform in a manner that could disable, overburden, damage, or impair it</li>
              <li>Uploading or transmitting viruses, malware, or other types of malicious code</li>
              <li>Collecting or tracking personal information of other users</li>
              <li>Spamming, phishing, or engaging in any other unwanted solicitation</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Intellectual Property</h2>
            <p className="mb-3">
              The Platform and its original content, features, and functionality are owned by Annaseva and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
            </p>
            <p>
              You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our Platform, except as follows:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Your computer may temporarily store copies of such materials in RAM incidental to your accessing and viewing those materials</li>
              <li>You may store files that are automatically cached by your Web browser for display enhancement purposes</li>
              <li>You may print or download one copy of a reasonable number of pages of the Platform for your own personal, non-commercial use and not for further reproduction, publication, or distribution</li>
              <li>If we provide social media features with certain content, you may take such actions as are enabled by such features</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Disclaimer of Warranties</h2>
            <p className="mb-3">
              THE PLATFORM IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. ANNASEVA MAKES NO WARRANTIES, EXPRESSED OR IMPLIED, AND HEREBY DISCLAIMS AND NEGATES ALL OTHER WARRANTIES INCLUDING, WITHOUT LIMITATION, IMPLIED WARRANTIES OR CONDITIONS OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT OF INTELLECTUAL PROPERTY OR OTHER VIOLATION OF RIGHTS.
            </p>
            <p>
              ANNASEVA DOES NOT WARRANT OR MAKE ANY REPRESENTATIONS CONCERNING THE ACCURACY, LIKELY RESULTS, OR RELIABILITY OF THE USE OF THE MATERIALS ON THE PLATFORM OR OTHERWISE RELATING TO SUCH MATERIALS OR ON ANY WEBSITES LINKED TO THE PLATFORM.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Limitation of Liability</h2>
            <p>
              IN NO EVENT SHALL ANNASEVA, ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES, BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE PLATFORM; ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE PLATFORM; ANY CONTENT OBTAINED FROM THE PLATFORM; OR UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), OR ANY OTHER LEGAL THEORY, WHETHER OR NOT WE HAVE BEEN INFORMED OF THE POSSIBILITY OF SUCH DAMAGE.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Termination</h2>
            <p>
              We may terminate or suspend your account and bar access to the Platform immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms. If you wish to terminate your account, you may simply discontinue using the Platform or contact us to request account deletion.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Changes to Terms</h2>
            <p>
              We reserve the right to modify or replace these Terms at any time. We will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Platform after any revisions become effective, you agree to be bound by the revised terms.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className="mt-2">
              <strong>Email:</strong> <a href="mailto:legal@annaseva.org" className="text-brand-600 dark:text-brand-400 hover:underline">legal@annaseva.org</a>
            </p>
            <p>
              <strong>Address:</strong> 123 Food Street, Tech Hub, Bangalore, Karnataka 560001, India
            </p>
          </section>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            By accessing or using the Platform, you acknowledge that you have read, understood, and agree to be bound by these Terms.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            For more information about how we collect, use, and share your information, please review our <Link to="/privacy" className="text-brand-600 dark:text-brand-400 hover:underline">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
