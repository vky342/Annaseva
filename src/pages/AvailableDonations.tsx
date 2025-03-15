
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Filter, Search, MapPin, ArrowLeft } from "lucide-react";
import { useDonations } from "@/store/DonationContext";
import { useToast } from "@/hooks/use-toast";
import DonationStatusOverlay from "@/components/DonationStatusOverlay";

const AvailableDonations = () => {
  const navigate = useNavigate();
  const { donations, updateDonation } = useDonations();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("expirySoon");
  const [statusOverlay, setStatusOverlay] = useState<{
    show: boolean;
    status: 'loading' | 'success';
    type: 'claim';
    donationId?: string;
  } | null>(null);

  // Filter for available donations
  const availableDonations = donations.filter(
    donation => 
      donation.status === "Available" && 
      donation.foodName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort the donations based on selection
  const sortedDonations = [...availableDonations].sort((a, b) => {
    if (sortBy === "expirySoon") {
      return new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime();
    } else if (sortBy === "newest") {
      return new Date(b.madeDate).getTime() - new Date(a.madeDate).getTime();
    }
    return 0;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit"
    });
  };

  const handleClaimDonation = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation to detail page
    
    // Show loading overlay
    setStatusOverlay({
      show: true,
      status: 'loading',
      type: 'claim',
      donationId: id
    });
    
    // Simulate API delay
    setTimeout(() => {
      // Update donation status
      updateDonation(id, { 
        status: "Claimed", 
        ngo: "Food Bank NGO" // In a real app, this would be the logged-in NGO's name
      });
      
      // Show success overlay
      setStatusOverlay({
        show: true,
        status: 'success',
        type: 'claim',
        donationId: id
      });
      
      toast({
        title: "Donation Claimed",
        description: "You have successfully claimed this donation.",
      });
    }, 1500);
  };

  const handleCloseOverlay = () => {
    setStatusOverlay(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {statusOverlay && statusOverlay.show && (
        <DonationStatusOverlay
          status={statusOverlay.status}
          type={statusOverlay.type}
          onClose={handleCloseOverlay}
          userType="ngo"
          message={
            statusOverlay.status === 'success'
              ? "You've successfully claimed this donation. Please contact the restaurant to arrange pickup."
              : undefined
          }
        />
      )}

      <Button
        variant="ghost"
        className="mb-6 food-button"
        onClick={() => navigate("/dashboard/ngo")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>

      <div className="mb-8">
        <h1 className="text-2xl font-bold food-title">Available Donations</h1>
        <p className="text-muted-foreground food-subtitle">
          Browse and claim available food donations from restaurants
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by food name..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-48">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="expirySoon">Expiring Soon</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Donations Grid */}
      {sortedDonations.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg donation-hero">
          <p className="text-lg font-medium mb-2 food-title">No available donations found</p>
          <p className="text-muted-foreground mb-6">
            There are currently no donations available for claiming.
          </p>
          <Button onClick={() => navigate("/dashboard/ngo")} className="food-button">
            Return to Dashboard
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedDonations.map((donation) => (
            <Card
              key={donation.id}
              className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow donation-card"
              onClick={() => navigate(`/donations/${donation.id}`)}
            >
              <div className="h-48 overflow-hidden">
                {donation.photoUrl ? (
                  <img
                    src={donation.photoUrl}
                    alt={donation.foodName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    No image available
                  </div>
                )}
              </div>

              <CardHeader className="pb-2">
                <CardTitle className="text-xl food-title">{donation.foodName}</CardTitle>
              </CardHeader>

              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Quantity:</span> {donation.quantity}
                  </div>

                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>{donation.location || "Location not specified"}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-muted-foreground">Expires</p>
                      <p className="text-sm font-medium">{formatDate(donation.expiryDate)}</p>
                    </div>
                    <Button 
                      size="sm" 
                      onClick={(e) => handleClaimDonation(donation.id, e)}
                      className="food-button bg-brand-600 hover:bg-brand-700"
                    >
                      Claim
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableDonations;
