import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Donation {
  id: string;
  foodName: string;
  quantity: string;
  madeDate: string;
  expiryDate: string;
  status: "Available" | "Claimed" | "Collected" | "Expired";
  photoUrl?: string;
  restaurantName?: string;
  location?: string;
  ngo?: string | null;
  latitude?: number;
  longitude?: number;
}

interface DonationContextType {
  donations: Donation[];
  addDonation: (donation: Omit<Donation, 'id'>) => void;
  updateDonation: (id: string, donation: Partial<Donation>) => void;
  deleteDonation: (id: string) => void;
  getDonationById: (id: string) => Donation | undefined;
}

// Create the context
const DonationContext = createContext<DonationContextType | undefined>(undefined);

// Sample data
const initialDonations: Donation[] = [
  {
    id: "1",
    foodName: "Fresh Vegetables",
    quantity: "5 kg",
    expiryDate: "2024-03-20T18:00",
    madeDate: "2024-03-18T10:00",
    status: "Available",
    restaurantName: "Good Food Restaurant",
    location: "123 Main Street, City",
    photoUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    ngo: null,
    latitude: 37.7749,
    longitude: -122.4194
  },
  {
    id: "2",
    foodName: "Bread and Pastries",
    quantity: "20 pieces",
    expiryDate: "2024-03-22T12:00",
    madeDate: "2024-03-18T08:00",
    status: "Claimed",
    restaurantName: "Good Food Restaurant",
    location: "123 Main Street, City",
    photoUrl: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec",
    ngo: "Food Bank NGO",
    latitude: 37.7833,
    longitude: -122.4167
  },
  {
    id: "3",
    foodName: "Cooked Meals",
    quantity: "15 portions",
    expiryDate: "2024-03-19T20:00",
    madeDate: "2024-03-18T14:00",
    status: "Available",
    restaurantName: "Good Food Restaurant",
    location: "123 Main Street, City",
    photoUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    ngo: null,
    latitude: 37.7694,
    longitude: -122.4862
  }
];

export const DonationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [donations, setDonations] = useState<Donation[]>(initialDonations);

  const addDonation = (donation: Omit<Donation, 'id'>) => {
    const id = (donations.length + 1).toString();
    const newDonation = { ...donation, id, status: "Available" as const };
    setDonations([...donations, newDonation]);
    return newDonation;
  };

  const updateDonation = (id: string, updatedData: Partial<Donation>) => {
    setDonations(prev => 
      prev.map(donation => 
        donation.id === id ? { ...donation, ...updatedData } : donation
      )
    );
  };

  const deleteDonation = (id: string) => {
    setDonations(prev => prev.filter(donation => donation.id !== id));
  };

  const getDonationById = (id: string) => {
    return donations.find(donation => donation.id === id);
  };

  return (
    <DonationContext.Provider value={{ 
      donations, 
      addDonation, 
      updateDonation, 
      deleteDonation,
      getDonationById
    }}>
      {children}
    </DonationContext.Provider>
  );
};

export const useDonations = () => {
  const context = useContext(DonationContext);
  if (!context) {
    throw new Error('useDonations must be used within a DonationProvider');
  }
  return context;
};
