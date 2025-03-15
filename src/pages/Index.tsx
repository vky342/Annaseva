
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-50 to-brand-100 dark:from-gray-900 dark:to-gray-800 -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-20 pb-12 md:pt-40 md:pb-20">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
              <span className="block">Welcome to</span>
              <span className="block text-brand-600 dark:text-brand-400">Annaseva</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Join our platform to help reduce food waste and support communities.
              Connect restaurants with NGOs to make a difference.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link to="/register">
                  <Button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-500 hover:bg-brand-600 md:py-4 md:text-lg md:px-10">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-brand-600 dark:text-brand-400 font-semibold tracking-wide uppercase">
                How It Works
              </h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Make food donation simple
              </p>
            </div>

            <div className="mt-10">
              <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                {features.map((feature) => (
                  <div key={feature.name} className="relative">
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-brand-500 text-white">
                      <feature.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">
                      {feature.name}
                    </p>
                    <p className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const features = [
  {
    name: "Real-time Updates",
    description:
      "Get instant notifications when new food donations are available in your area.",
    icon: ArrowRight,
  },
  {
    name: "Location Tracking",
    description:
      "Easy-to-use map interface for finding and managing food donations nearby.",
    icon: ArrowRight,
  },
  {
    name: "Quick Upload",
    description:
      "Easily upload food details with images, expiry times, and preparation info.",
    icon: ArrowRight,
  },
  {
    name: "Secure Platform",
    description:
      "Safe and secure platform for restaurants and NGOs to connect and coordinate.",
    icon: ArrowRight,
  },
];

export default Index;
