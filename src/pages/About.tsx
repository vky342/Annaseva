
import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const About = () => {
  // Add effect to scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);
  
  return (
    <div className="page-container">
      <h1 className="page-heading gradient-heading">About Annaseva</h1>
      
      <div className="glass-card mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Our Mission</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Annaseva is dedicated to reducing food waste and fighting hunger by connecting restaurants 
          with surplus food to NGOs that can distribute it to those in need. Our platform makes it 
          simple for restaurants to donate excess food and for NGOs to collect and distribute it 
          to hungry people in their communities.
        </p>
        
        <div className="aspect-video relative rounded-lg overflow-hidden mb-6">
          <img 
            src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
            alt="Food Donation" 
            className="w-full h-full object-cover"
          />
        </div>

        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Our Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 text-center">
            <div className="text-3xl font-bold text-brand-600 dark:text-brand-400 mb-2">10,000+</div>
            <div className="text-gray-700 dark:text-gray-300">Meals Donated</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 text-center">
            <div className="text-3xl font-bold text-brand-600 dark:text-brand-400 mb-2">50+</div>
            <div className="text-gray-700 dark:text-gray-300">Restaurant Partners</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 text-center">
            <div className="text-3xl font-bold text-brand-600 dark:text-brand-400 mb-2">25+</div>
            <div className="text-gray-700 dark:text-gray-300">NGO Partners</div>
          </div>
        </div>
        
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Our Story</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Founded in 2023, Annaseva began with a simple observation: restaurants often have 
          surplus food at the end of the day, while many people in the same communities go hungry. 
          Our team created a platform to bridge this gap, making it easy for restaurants to donate 
          food that would otherwise go to waste and for NGOs to access these resources for the people they serve.
        </p>
        
        <div className="mt-8">
          <Button asChild>
            <Link to="/register">Join Our Mission</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default About;
