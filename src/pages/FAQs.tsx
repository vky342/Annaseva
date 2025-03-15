
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const FAQs = () => {
  const faqs = [
    {
      question: "What is Annaseva?",
      answer: "Annaseva is a platform that connects restaurants with surplus food to NGOs who can distribute it to people in need. Our mission is to reduce food waste while addressing hunger in communities."
    },
    {
      question: "How can my restaurant participate?",
      answer: "Simply register your restaurant, verify your details, and you can start listing donations. When you have surplus food, log the details into our system, and nearby NGOs will be notified of its availability."
    },
    {
      question: "How can my NGO receive food donations?",
      answer: "NGOs need to register, provide necessary credentials for verification, and then can browse available donations in their area. Once you find suitable donations, you can claim them and arrange for pickup."
    },
    {
      question: "Is there a cost to use the platform?",
      answer: "No, Annaseva is completely free for both restaurants and NGOs. Our mission is to reduce food waste and hunger, so we don't charge for facilitating these connections."
    },
    {
      question: "What types of food can be donated?",
      answer: "Restaurants can donate any surplus food that is still safe for consumption. This includes prepared meals, unused ingredients, bakery items, and more. All food must meet safety standards and be properly stored."
    },
    {
      question: "How is food safety ensured?",
      answer: "We require all restaurants to follow proper food safety protocols. NGOs are advised to check the condition of food upon pickup. Our platform also tracks food expiry times to ensure timely collection and distribution."
    },
    {
      question: "Can individual donors use the platform?",
      answer: "Currently, our platform is designed for restaurants and food businesses. However, we're exploring options to include individual donors in the future."
    },
    {
      question: "How can I verify if an NGO is legitimate?",
      answer: "All NGOs on our platform undergo a verification process where we check their registration, operational history, and other credentials before they can claim donations."
    },
    {
      question: "Are there any tax benefits for restaurants?",
      answer: "Yes, food donations can be tax-deductible. Our platform provides documentation of all donations that restaurants can use for tax purposes. However, we recommend consulting with a tax professional for specific advice."
    },
    {
      question: "How far in advance should donations be listed?",
      answer: "Ideally, donations should be listed as soon as you know you'll have surplus food. This gives NGOs time to plan for collection. However, we understand that sometimes surplus is only identified at the end of service."
    }
  ];

  return (
    <div className="page-container">
      <h1 className="page-heading gradient-heading">Frequently Asked Questions</h1>
      
      <div className="glass-card mb-8">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-medium text-gray-800 dark:text-gray-100">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 dark:text-gray-300">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        <div className="mt-10 border-t border-gray-200 dark:border-gray-700 pt-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Still have questions?</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            If you couldn't find the answer to your question, please feel free to contact us directly.
            Our team is always ready to help!
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/register">Join Annaseva</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
