
import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { CalendarIcon, User, Clock } from 'lucide-react';

const Blog = () => {
  // Add effect to scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  const blogPosts = [
    {
      id: 1,
      title: "How Food Donation is Changing Lives in Urban Communities",
      excerpt: "Explore the impact of food donation programs in addressing urban food insecurity and building stronger communities.",
      author: "Priya Sharma",
      date: "June 15, 2023",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
      id: 2,
      title: "Restaurant Food Waste: Turning a Problem into an Opportunity",
      excerpt: "Learn how restaurants are transforming their approach to surplus food and making a positive impact on society.",
      author: "Rohit Kapoor",
      date: "May 22, 2023",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
    },
    {
      id: 3,
      title: "The Role of Technology in Revolutionizing Food Donation",
      excerpt: "Discover how digital platforms are streamlining the food donation process and increasing efficiency.",
      author: "Ananya Patel",
      date: "April 10, 2023",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
      id: 4,
      title: "Success Stories: NGOs Making a Difference Through Food Distribution",
      excerpt: "Read inspiring stories of NGOs that have successfully implemented food distribution programs in their communities.",
      author: "Vikram Singh",
      date: "March 18, 2023",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1593113598332-cd59a0c3015c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
      id: 5,
      title: "Food Safety in Donation Programs: Best Practices",
      excerpt: "Understanding the importance of maintaining food safety standards when donating or distributing food.",
      author: "Dr. Meera Reddy",
      date: "February 5, 2023",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1621378864046-0429793909e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
      id: 6,
      title: "The Environmental Impact of Reducing Food Waste",
      excerpt: "How food donation programs contribute to environmental conservation by reducing waste in landfills.",
      author: "Arjun Mehta",
      date: "January 12, 2023",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    }
  ];

  return (
    <div className="page-container">
      <h1 className="page-heading gradient-heading">Annaseva Blog</h1>
      
      <div className="mb-8">
        <div className="glass-card mb-8">
          <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-100">Latest Articles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="aspect-video relative">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-2">
                    <div className="flex items-center mr-3">
                      <CalendarIcon size={14} className="mr-1" />
                      {post.date}
                    </div>
                    <div className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                    <Link to={`/blog/${post.id}`}>
                      {post.title}
                    </Link>
                  </h3>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <User size={14} className="mr-1" />
                    <span>By {post.author}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <Button variant="outline">
              Load More Articles
            </Button>
          </div>
        </div>
        
        <div className="glass-card">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Subscribe to Our Newsletter</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Stay updated with our latest articles, success stories, and tips for effective food donation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 rounded-md border border-gray-300 dark:border-gray-600 p-2 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:text-white"
            />
            <Button>
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
