
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useDonations, Donation } from "@/store/DonationContext";
import { ArrowLeft, Calendar, Package, MapPin, Clock, CheckCircle, Phone, MessageSquare } from "lucide-react";
import RestaurantMap from "@/components/RestaurantMap";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import GeolocationService from "@/services/GeolocationService";
import DonationStatusOverlay from "@/components/DonationStatusOverlay";

interface DonationDetailsProps {
  userType: "restaurant" | "ngo" | null;
}

const DonationDetails: React.FC<DonationDetailsProps> = ({ userType }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getDonationById, updateDonation } = useDonations();
  const [donation, setDonation] = useState<Donation | null>(null);
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [routeInfo, setRouteInfo] = useState<any>(null);
  const [statusOverlay, setStatusOverlay] = useState<{
    show: boolean;
    status: 'loading' | 'success';
    type: 'claim' | 'create';
  } | null>(null);

  useEffect(() => {
    if (id) {
      const donationData = getDonationById(id);
      
      if (donationData) {
        // Ensure donation has coordinates
        GeolocationService.enrichDonationWithCoordinates(donationData).then(enrichedDonation => {
          setDonation(enrichedDonation);
          
          // If user is an NGO, calculate route information
          if (userType === "ngo" && enrichedDonation.latitude && enrichedDonation.longitude) {
            GeolocationService.getCurrentPosition().then(currentPosition => {
              if (currentPosition) {
                GeolocationService.calculateRoute(
                  currentPosition,
                  { lat: enrichedDonation.latitude as number, lng: enrichedDonation.longitude as number }
                ).then(routeData => {
                  setRouteInfo(routeData);
                });
              }
            });
          }
        });
      } else {
        navigate("/not-found");
      }
    }
  }, [id, getDonationById, navigate, userType]);

  if (!donation) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading donation details...</div>
      </div>
    );
  }

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleClaimDonation = () => {
    // Show loading overlay
    setStatusOverlay({
      show: true,
      status: 'loading',
      type: 'claim'
    });
    
    // Simulate API delay
    setTimeout(() => {
      // In a real app, this would be an API call
      updateDonation(donation.id, { 
        status: "Claimed", 
        ngo: "Food Bank NGO" // In a real app, this would be the logged-in NGO's name
      });
      
      // Show success overlay
      setStatusOverlay({
        show: true,
        status: 'success',
        type: 'claim'
      });
      
      toast({
        title: "Donation Claimed",
        description: "You have successfully claimed this donation.",
      });
      
      setDonation({
        ...donation,
        status: "Claimed",
        ngo: "Food Bank NGO",
      });
    }, 1500);
  };

  const handleContactRestaurant = () => {
    setShowContactDialog(true);
  };

  const handleMarkAsCollected = () => {
    // Show loading overlay
    setStatusOverlay({
      show: true,
      status: 'loading',
      type: 'claim'
    });
    
    // Simulate API delay
    setTimeout(() => {
      updateDonation(donation.id, { status: "Collected" });
      
      // Show success overlay
      setStatusOverlay({
        show: true,
        status: 'success',
        type: 'claim'
      });
      
      toast({
        title: "Donation Collected",
        description: "Thank you for collecting this donation.",
      });
      
      setDonation({
        ...donation,
        status: "Collected",
      });
    }, 1500);
  };

  const handleCloseOverlay = () => {
    setStatusOverlay(null);
  };

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit"
    });
  };

  // Restaurant contact info for NGO
  const restaurantContact = {
    name: donation.restaurantName || "Restaurant",
    contactPerson: "John Doe",
    phone: "+1 (555) 123-4567",
    email: "contact@restaurant.com",
    notes: "Please call at least 15 minutes before pickup."
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {statusOverlay && statusOverlay.show && (
        <DonationStatusOverlay
          status={statusOverlay.status}
          type={statusOverlay.type}
          onClose={handleCloseOverlay}
          userType={userType as 'restaurant' | 'ngo'}
          message={
            statusOverlay.status === 'success' && statusOverlay.type === 'claim' && donation.status === "Collected"
              ? "Thank you for confirming this donation has been collected."
              : undefined
          }
        />
      )}

      <Button
        variant="ghost"
        className="mb-6 food-button"
        onClick={handleGoBack}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="mb-6 dark:bg-gray-800 dark:border-gray-700 donation-card">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-2xl food-title">{donation.foodName}</CardTitle>
                <Badge 
                  className={
                    donation.status === "Available" ? "bg-green-500" :
                    donation.status === "Claimed" ? "bg-blue-500" :
                    donation.status === "Collected" ? "bg-purple-500" :
                    "bg-red-500"
                  }
                >
                  {donation.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {donation.photoUrl && (
                  <div className="h-64 w-full overflow-hidden rounded-md">
                    <img 
                      src={donation.photoUrl} 
                      alt={donation.foodName} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="flex items-start gap-2">
                    <Package className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Quantity</p>
                      <p className="text-gray-600 dark:text-gray-300">{donation.quantity}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Made on</p>
                      <p className="text-gray-600 dark:text-gray-300">{formatDate(donation.madeDate)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Clock className="h-5 w-5 text-orange-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Expires on</p>
                      <p className="text-orange-600 dark:text-orange-400">{formatDate(donation.expiryDate)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-gray-600 dark:text-gray-300">{donation.location}</p>
                    </div>
                  </div>
                </div>

                {donation.ngo && userType !== "ngo" && (
                  <div className="border-t pt-4 mt-4 dark:border-gray-700">
                    <p className="font-medium">Claimed by</p>
                    <p className="text-gray-600 dark:text-gray-300">{donation.ngo}</p>
                  </div>
                )}

                {routeInfo && userType === "ngo" && (
                  <div className="border-t pt-4 mt-4 dark:border-gray-700">
                    <p className="font-medium">Route Information</p>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Distance</p>
                        <p className="text-gray-600 dark:text-gray-300">{routeInfo.distance.text}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Estimated Time</p>
                        <p className="text-gray-600 dark:text-gray-300">{routeInfo.duration.text}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* NGO-specific actions */}
          {userType === "ngo" && (
            <Card className="dark:bg-gray-800 dark:border-gray-700 donation-card">
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {donation.status === "Available" && (
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700 food-button"
                    onClick={handleClaimDonation}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Claim This Donation
                  </Button>
                )}
                
                {donation.status === "Claimed" && (
                  <>
                    <Button 
                      className="w-full food-button"
                      onClick={handleContactRestaurant}
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      Contact Restaurant
                    </Button>
                    
                    <Button 
                      className="w-full bg-purple-600 hover:bg-purple-700 food-button"
                      onClick={handleMarkAsCollected}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Mark as Collected
                    </Button>
                  </>
                )}
                
                {donation.status === "Collected" && (
                  <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md text-center">
                    <CheckCircle className="mx-auto mb-2 h-8 w-8 text-green-500" />
                    <p className="font-medium">Successfully collected</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      This donation has been collected.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
        
        {/* Map */}
        {userType === "ngo" && (
          <div className="md:col-span-1">
            <Card className="dark:bg-gray-800 dark:border-gray-700 h-full donation-card">
              <CardHeader>
                <CardTitle>Restaurant Location</CardTitle>
              </CardHeader>
              <CardContent className="pb-6">
                <div className="h-64 rounded-md overflow-hidden">
                  <RestaurantMap 
                    donations={[donation]} 
                  />
                </div>
                
                {(donation.latitude && donation.longitude) ? (
                  <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    <p>The map shows the restaurant location and the best route for pickup.</p>
                  </div>
                ) : (
                  <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    <p>Precise location data is not available for this restaurant.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Contact Restaurant Dialog - Only for NGO */}
      <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Contact {restaurantContact.name}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-gray-500 dark:text-gray-400">Contact Person</h4>
              <p>{restaurantContact.contactPerson}</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-gray-500 dark:text-gray-400">Phone</h4>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-green-600" />
                <p>{restaurantContact.phone}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-gray-500 dark:text-gray-400">Email</h4>
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-blue-600" />
                <p>{restaurantContact.email}</p>
              </div>
            </div>
            
            <div className="space-y-2 border-t pt-4 dark:border-gray-700">
              <h4 className="font-medium text-sm text-gray-500 dark:text-gray-400">Notes</h4>
              <p className="text-sm">{restaurantContact.notes}</p>
            </div>
          </div>
          
          <DialogFooter className="flex justify-between">
            <DialogClose asChild>
              <Button variant="outline" className="food-button">
                Close
              </Button>
            </DialogClose>
            <Button className="bg-green-600 hover:bg-green-700 food-button">
              <Phone className="mr-2 h-4 w-4" />
              Call Restaurant
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DonationDetails;
