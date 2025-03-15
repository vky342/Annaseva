
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Utensils, Building2, Users } from 'lucide-react';

const HowItWorks = () => {
  return (
    <div className="page-container">
      <h1 className="page-heading gradient-heading">How Annaseva Works</h1>
      
      <div className="glass-card mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">For Restaurants</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle className="text-brand-600 dark:text-brand-400 mr-3 mt-1 flex-shrink-0" size={20} />
                <span className="text-gray-700 dark:text-gray-300">
                  Register your restaurant and create a profile
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-brand-600 dark:text-brand-400 mr-3 mt-1 flex-shrink-0" size={20} />
                <span className="text-gray-700 dark:text-gray-300">
                  Log your surplus food items with details like quantity, type, and expiration
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-brand-600 dark:text-brand-400 mr-3 mt-1 flex-shrink-0" size={20} />
                <span className="text-gray-700 dark:text-gray-300">
                  Wait for an NGO to claim your donation
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-brand-600 dark:text-brand-400 mr-3 mt-1 flex-shrink-0" size={20} />
                <span className="text-gray-700 dark:text-gray-300">
                  Prepare the food for pickup at the scheduled time
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-brand-600 dark:text-brand-400 mr-3 mt-1 flex-shrink-0" size={20} />
                <span className="text-gray-700 dark:text-gray-300">
                  Track your impact and receive tax benefits for your donations
                </span>
              </li>
            </ul>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">For NGOs</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle className="text-brand-600 dark:text-brand-400 mr-3 mt-1 flex-shrink-0" size={20} />
                <span className="text-gray-700 dark:text-gray-300">
                  Register your NGO and verify your credentials
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-brand-600 dark:text-brand-400 mr-3 mt-1 flex-shrink-0" size={20} />
                <span className="text-gray-700 dark:text-gray-300">
                  Browse available donations in your area
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-brand-600 dark:text-brand-400 mr-3 mt-1 flex-shrink-0" size={20} />
                <span className="text-gray-700 dark:text-gray-300">
                  Claim the donations that meet your needs
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-brand-600 dark:text-brand-400 mr-3 mt-1 flex-shrink-0" size={20} />
                <span className="text-gray-700 dark:text-gray-300">
                  Schedule a pickup time and collect the food
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-brand-600 dark:text-brand-400 mr-3 mt-1 flex-shrink-0" size={20} />
                <span className="text-gray-700 dark:text-gray-300">
                  Distribute the food to those in need and report impact
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-100">The Process</h2>
        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 -ml-0.5"></div>
          
          <div className="space-y-12">
            <div className="relative flex items-start md:items-center flex-col md:flex-row">
              <div className="md:w-1/2 md:pr-8 mb-4 md:mb-0">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                  <h3 className="font-medium text-brand-600 dark:text-brand-400 mb-2 flex items-center">
                    <Utensils className="mr-2" size={18} /> Restaurants
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Restaurants log their surplus food in our platform, specifying the type, quantity, and expiration time.
                  </p>
                </div>
              </div>
              <div className="absolute left-1/2 -ml-3 md:ml-0 flex items-center justify-center">
                <div className="rounded-full h-6 w-6 bg-brand-600 dark:bg-brand-400 text-white flex items-center justify-center">
                  1
                </div>
              </div>
              <div className="md:w-1/2 md:pl-8 md:text-right">
                <ArrowRight className="hidden md:block text-brand-600 dark:text-brand-400 mb-2" size={24} />
              </div>
            </div>
            
            <div className="relative flex items-start md:items-center flex-col md:flex-row">
              <div className="md:w-1/2 md:pr-8 md:text-right">
                <ArrowRight className="hidden md:block text-brand-600 dark:text-brand-400 mb-2 ml-auto transform rotate-180" size={24} />
              </div>
              <div className="absolute left-1/2 -ml-3 md:ml-0 flex items-center justify-center">
                <div className="rounded-full h-6 w-6 bg-brand-600 dark:bg-brand-400 text-white flex items-center justify-center">
                  2
                </div>
              </div>
              <div className="md:w-1/2 md:pl-8 mb-4 md:mb-0">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                  <h3 className="font-medium text-brand-600 dark:text-brand-400 mb-2 flex items-center">
                    <Building2 className="mr-2" size={18} /> NGOs
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    NGOs browse available donations in their area and claim the ones they can distribute effectively.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative flex items-start md:items-center flex-col md:flex-row">
              <div className="md:w-1/2 md:pr-8 mb-4 md:mb-0">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                  <h3 className="font-medium text-brand-600 dark:text-brand-400 mb-2 flex items-center">
                    <Users className="mr-2" size={18} /> Beneficiaries
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    The food is distributed to people in need, reducing hunger and food insecurity in the community.
                  </p>
                </div>
              </div>
              <div className="absolute left-1/2 -ml-3 md:ml-0 flex items-center justify-center">
                <div className="rounded-full h-6 w-6 bg-brand-600 dark:bg-brand-400 text-white flex items-center justify-center">
                  3
                </div>
              </div>
              <div className="md:w-1/2 md:pl-8">
                <ArrowRight className="hidden md:block text-brand-600 dark:text-brand-400 mb-2" size={24} />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Button asChild>
            <Link to="/register">Start Making a Difference</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
