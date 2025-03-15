
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Utensils, ShoppingBag, Check, Clock, HeartHandshake, X } from 'lucide-react';

interface ConfettiProps {
  count: number;
}

const Confetti: React.FC<ConfettiProps> = ({ count }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="confetti"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
            background: index % 5 === 0 ? 'linear-gradient(to bottom, #8b5cf6, #6d28d9)' : 
                       index % 5 === 1 ? 'linear-gradient(to bottom, #fbbf24, #d97706)' :
                       index % 5 === 2 ? 'linear-gradient(to bottom, #10b981, #059669)' :
                       index % 5 === 3 ? 'linear-gradient(to bottom, #ef4444, #dc2626)' :
                                        'linear-gradient(to bottom, #3b82f6, #2563eb)'
          }}
        />
      ))}
    </>
  );
};

interface DonationStatusOverlayProps {
  status: 'loading' | 'success';
  type: 'create' | 'claim';
  message?: string;
  onClose: () => void;
  userType?: 'restaurant' | 'ngo';
}

const DonationStatusOverlay: React.FC<DonationStatusOverlayProps> = ({
  status,
  type,
  message,
  onClose,
  userType = 'restaurant',
}) => {
  const navigate = useNavigate();
  const [showOverlay, setShowOverlay] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  
  // Close loading overlay after a delay
  useEffect(() => {
    if (status === 'loading') {
      const timer = setTimeout(() => {
        onClose();
      }, 5000); // Extend timeout for a better user experience
      
      return () => clearTimeout(timer);
    }
  }, [status, onClose]);

  const handleExit = (callback?: () => void) => {
    setIsExiting(true);
    setTimeout(() => {
      setShowOverlay(false);
      setTimeout(() => {
        onClose();
        if (callback) callback();
      }, 300);
    }, 300);
  };

  const handleDashboardClick = () => {
    handleExit(() => {
      if (userType === 'restaurant') {
        navigate('/dashboard/restaurant');
      } else {
        navigate('/dashboard/ngo');
      }
    });
  };

  const handleViewClick = () => {
    handleExit(() => {
      if (type === 'create') {
        navigate('/donations');
      } else {
        // Navigate to collection history for NGO users when they claim a donation
        navigate('/collection-history');
      }
    });
  };

  const handleClose = () => {
    handleExit();
  };

  if (status === 'loading') {
    return (
      <div className={`donation-loading-screen ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
        <div className="donation-loader"></div>
        <h2 className="text-xl font-bold mt-8 mb-2">
          {type === 'create' ? 'Adding your donation...' : 'Claiming donation...'}
        </h2>
        <p className="text-muted-foreground">
          {type === 'create' 
            ? 'Thank you for helping reduce food waste!' 
            : 'Thank you for helping distribute food!'}
        </p>
        <Button 
          variant="outline" 
          size="sm" 
          className="mt-8 opacity-70 hover:opacity-100"
          onClick={handleClose}
        >
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
      </div>
    );
  }

  return (
    <div 
      className={`donation-success-screen ${showOverlay ? 'opacity-100' : 'opacity-0'} ${isExiting ? 'scale-95' : 'scale-100'}`} 
      style={{ transition: 'opacity 0.3s ease, transform 0.3s ease' }}
    >
      <Confetti count={75} />
      
      <div className="donation-success-content">
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-2 right-2 rounded-full opacity-70 hover:opacity-100" 
          onClick={handleClose}
        >
          <X className="h-4 w-4" />
        </Button>
        
        <div className="flex justify-center mb-6">
          <div className="donation-success-checkmark"></div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2 food-title">
            {type === 'create' ? 'Donation Added Successfully!' : 'Donation Claimed Successfully!'}
          </h2>
          <p className="text-muted-foreground">
            {message || (type === 'create' 
              ? 'Your food donation has been added and is now available for NGOs to claim.' 
              : 'You have successfully claimed this donation. Please contact the restaurant to arrange pickup.')}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <Button 
            variant="outline" 
            className="food-button rounded-full"
            onClick={handleDashboardClick}
          >
            {userType === 'restaurant' ? (
              <Utensils className="mr-2 h-4 w-4" />
            ) : (
              <HeartHandshake className="mr-2 h-4 w-4" />
            )}
            Back to Dashboard
          </Button>
          
          <Button 
            className="food-button bg-brand-600 hover:bg-brand-700 text-white rounded-full"
            onClick={handleViewClick}
          >
            {type === 'create' ? (
              <ShoppingBag className="mr-2 h-4 w-4" />
            ) : (
              <Clock className="mr-2 h-4 w-4" />
            )}
            {type === 'create' ? 'View My Donations' : 'View Claimed Donations'}
          </Button>
        </div>
        
        <div className="mt-8 text-center">
          <div className="flex justify-center items-center gap-2 text-brand-600 dark:text-brand-400">
            <Check className="h-5 w-5" />
            <span className="text-sm font-medium">
              {type === 'create' 
                ? "You're making a difference in reducing food waste" 
                : "You're helping to feed those in need"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationStatusOverlay;
