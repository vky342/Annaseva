import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  PlusCircle, 
  Package, 
  Clock, 
  CheckCircle, 
  ArrowRight, 
  Utensils, 
  ChefHat, 
  Award,
  X,
  Phone,
  MessageSquare,
  AlertCircle,
  FileCheck,
  Ban
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useDonations } from "@/store/DonationContext";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import DonationStatusOverlay from "@/components/DonationStatusOverlay";

const RestaurantDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { donations, updateDonation } = useDonations();
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [showDonationActions, setShowDonationActions] = useState(false);
  const [showNgoContact, setShowNgoContact] = useState(false);
  const [statusOverlay, setStatusOverlay] = useState<{
    show: boolean;
    status: 'loading' | 'success';
    type: 'create' | 'claim';
  } | null>(null);

  // Calculate stats from actual donations
  const totalDonations = donations.length;
  const activeDonations = donations.filter(d => d.status === "Available").length;
  const completedDonations = donations.filter(d => d.status === "Collected").length;

  // Get the 3 most recent donations
  const recentDonations = [...donations].sort((a, b) => 
    new Date(b.madeDate).getTime() - new Date(a.madeDate).getTime()
  ).slice(0, 3);

  const handleNewDonation = () => {
    // Go directly to the new donation page without showing the overlay first
    navigate("/donations/new");
  };

  const handleViewAllDonations = () => {
    navigate("/donations");
  };

  const handleDonationHistory = () => {
    navigate("/donations/history");
    toast({
      title: "Donation History",
      description: "Viewing your past donations",
    });
  };

  const handleUpdateProfile = () => {
    navigate("/profile");
  };

  const handleManageSettings = () => {
    navigate("/settings");
  };

  const handleDonationClick = (donation) => {
    setSelectedDonation(donation);
    setShowDonationActions(true);
  };

  const handleContactNgo = () => {
    if (selectedDonation && selectedDonation.ngo) {
      setShowNgoContact(true);
    } else {
      toast({
        title: "No NGO Associated",
        description: "This donation hasn't been claimed by an NGO yet.",
        variant: "destructive"
      });
    }
  };

  const handleCancelDonation = () => {
    if (selectedDonation) {
      // Show loading overlay
      setStatusOverlay({
        show: true,
        status: 'loading',
        type: 'create'
      });
      
      // Close the actions dialog
      setShowDonationActions(false);
      
      // Simulate a delay for the API call
      setTimeout(() => {
        updateDonation(selectedDonation.id, { status: "Expired" });
        setStatusOverlay(null);
        
        toast({
          title: "Donation Cancelled",
          description: "The donation has been cancelled and marked as expired.",
        });
      }, 1500);
    }
  };

  const handleMarkAsComplete = () => {
    if (selectedDonation) {
      // Show loading overlay
      setStatusOverlay({
        show: true,
        status: 'loading',
        type: 'create'
      });
      
      // Close the actions dialog
      setShowDonationActions(false);
      
      // Simulate a delay for the API call
      setTimeout(() => {
        updateDonation(selectedDonation.id, { status: "Collected" });
        
        // Show success overlay
        setStatusOverlay({
          show: true,
          status: 'success',
          type: 'create'
        });
        
        setTimeout(() => {
          setStatusOverlay(null);
        }, 3000);
        
        toast({
          title: "Donation Completed",
          description: "The donation has been marked as collected successfully.",
        });
      }, 1500);
    }
  };

  const handleViewDetails = () => {
    if (selectedDonation) {
      navigate(`/donations/${selectedDonation.id}`);
    }
  };

  // Sample NGO contact info
  const ngoContactInfo = {
    name: selectedDonation?.ngo || "NGO Organization",
    contactPerson: "Jane Smith",
    phone: "+1 (555) 987-6543",
    email: "contact@ngoorganization.org",
    estimatedPickupTime: "Today at 4:00 PM",
    notes: "Will send two volunteers to collect the donation. They will have organization ID cards."
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
  };

  // Helper function to determine status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "Claimed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "Collected":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      default:
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
    }
  };

  const handleCloseOverlay = () => {
    setStatusOverlay(null);
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      {statusOverlay && statusOverlay.show && (
        <DonationStatusOverlay
          status={statusOverlay.status}
          type={statusOverlay.type}
          onClose={handleCloseOverlay}
          userType="restaurant"
          message={
            statusOverlay.status === 'success' && statusOverlay.type === 'create'
              ? "Thank you for your contribution! Your donation has been recorded successfully."
              : undefined
          }
        />
      )}

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold gradient-heading">Restaurant Dashboard</h1>
        <Button 
          className="bg-brand-600 hover:bg-brand-700 text-white rounded-full shadow-md transition-all hover:shadow-lg food-button"
          onClick={handleNewDonation}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          New Donation
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card className="card-hover overflow-hidden border border-gray-200 dark:border-gray-700 donation-card">
          <div className="absolute top-0 right-0 w-24 h-24 bg-brand-100 dark:bg-brand-900/20 rounded-bl-full"></div>
          <CardHeader className="flex flex-row items-center justify-between pb-2 relative">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Donations
            </CardTitle>
            <Package className="h-5 w-5 text-brand-600 dark:text-brand-400" />
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold">{totalDonations}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Food packages donated
            </p>
          </CardContent>
        </Card>
        
        <Card className="card-hover overflow-hidden border border-gray-200 dark:border-gray-700 donation-card">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100 dark:bg-blue-900/20 rounded-bl-full"></div>
          <CardHeader className="flex flex-row items-center justify-between pb-2 relative">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Donations
            </CardTitle>
            <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold">{activeDonations}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Currently available
            </p>
          </CardContent>
        </Card>
        
        <Card className="card-hover overflow-hidden border border-gray-200 dark:border-gray-700 donation-card">
          <div className="absolute top-0 right-0 w-24 h-24 bg-green-100 dark:bg-green-900/20 rounded-bl-full"></div>
          <CardHeader className="flex flex-row items-center justify-between pb-2 relative">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Completed
            </CardTitle>
            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold">{completedDonations}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Successfully delivered
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Donations - Redesigned to be different from NGO dashboard */}
      <Card className="mb-8 border border-gray-200 dark:border-gray-700 shadow-sm">
        <CardHeader className="border-b dark:border-gray-700 bg-brand-50 dark:bg-brand-900/10">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl flex items-center">
              <ChefHat className="mr-2 h-5 w-5 text-brand-600" />
              Your Recent Donations
            </CardTitle>
            {recentDonations.length > 0 && (
              <Button 
                variant="ghost" 
                onClick={handleViewAllDonations}
                className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
              >
                View all
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="rounded-b-lg overflow-hidden">
            {recentDonations.length === 0 ? (
              <div className="p-6 text-center bg-gradient-food">
                <p className="text-muted-foreground mb-3">No donations yet</p>
                <Button 
                  variant="default"
                  onClick={handleNewDonation}
                  className="bg-brand-600 hover:bg-brand-700 text-white shadow-sm food-button"
                >
                  Create your first donation
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                {recentDonations.map((donation) => (
                  <div
                    key={donation.id}
                    className="flex flex-col p-4 border-b md:border-b-0 md:border-r last:border-r-0 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors h-full donation-card"
                    onClick={() => handleDonationClick(donation)}
                  >
                    <div className="flex items-center mb-2">
                      <div className="p-2 rounded-full bg-brand-100 dark:bg-brand-900/30 mr-3">
                        <Utensils className="h-4 w-4 text-brand-600 dark:text-brand-400 food-icon-wiggle" />
                      </div>
                      <h3 className="font-medium text-base truncate">{donation.foodName}</h3>
                    </div>
                    
                    <div className="mb-2">
                      <p className="text-sm text-muted-foreground flex items-center">
                        <Package className="h-3 w-3 mr-1 inline" />
                        Quantity: {donation.quantity}
                      </p>
                      <p className="text-sm text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1 inline" />
                        Expires: {new Date(donation.expiryDate).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <div className="mt-auto pt-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium inline-flex items-center ${
                          getStatusColor(donation.status)
                        }`}
                      >
                        {donation.status === "Available" && <Award className="h-3 w-3 mr-1" />}
                        {donation.status}
                      </span>
                      {donation.ngo && (
                        <p className="text-xs text-muted-foreground mt-1 truncate">
                          Claimed by: {donation.ngo}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
        <CardHeader className="border-b dark:border-gray-700">
          <CardTitle className="text-xl">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Button 
              variant="outline" 
              className="w-full justify-start h-12 font-medium text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors donation-card"
              onClick={handleViewAllDonations}
            >
              <div className="flex items-center">
                <div className="bg-brand-100 dark:bg-brand-900/50 p-2 rounded-full mr-3">
                  <Package className="h-5 w-5 text-brand-600 dark:text-brand-400" />
                </div>
                <span>View All Donations</span>
              </div>
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start h-12 font-medium text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors donation-card"
              onClick={handleDonationHistory}
            >
              <div className="flex items-center">
                <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-full mr-3">
                  <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <span>Donation History</span>
              </div>
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start h-12 font-medium text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors donation-card"
              onClick={handleUpdateProfile}
            >
              <div className="flex items-center">
                <div className="bg-purple-100 dark:bg-purple-900/50 p-2 rounded-full mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600 dark:text-purple-400">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <span>Update Profile</span>
              </div>
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start h-12 font-medium text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors donation-card"
              onClick={handleManageSettings}
            >
              <div className="flex items-center">
                <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600 dark:text-gray-400">
                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </div>
                <span>Manage Settings</span>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Donation Actions Dialog - New component specific to restaurant dashboard */}
      <Dialog open={showDonationActions} onOpenChange={setShowDonationActions}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">
              {selectedDonation?.foodName}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Status</h4>
                  <p className={`text-sm font-medium mt-1 ${getStatusColor(selectedDonation?.status)}`}>
                    {selectedDonation?.status}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Quantity</h4>
                  <p className="text-sm mt-1">{selectedDonation?.quantity}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Created</h4>
                  <p className="text-sm mt-1">{selectedDonation ? formatDate(selectedDonation.madeDate) : ""}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Expires</h4>
                  <p className="text-sm mt-1">{selectedDonation ? formatDate(selectedDonation.expiryDate) : ""}</p>
                </div>
              </div>
              
              {selectedDonation?.ngo && (
                <div className="mt-4 pt-4 border-t dark:border-gray-700">
                  <h4 className="text-sm font-medium text-muted-foreground">Claimed By</h4>
                  <p className="text-sm mt-1 font-medium">{selectedDonation.ngo}</p>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              <Button 
                onClick={handleViewDetails}
                className="w-full justify-start food-button" 
                variant="outline"
              >
                <FileCheck className="mr-2 h-4 w-4" />
                View Full Details
              </Button>
              
              {selectedDonation?.status === "Claimed" && (
                <>
                  <Button 
                    onClick={handleContactNgo}
                    className="w-full justify-start food-button" 
                    variant="outline"
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Contact NGO
                  </Button>
                  
                  <Button 
                    onClick={handleMarkAsComplete}
                    className="w-full justify-start bg-green-600 hover:bg-green-700 text-white food-button" 
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Mark as Collected
                  </Button>
                </>
              )}
              
              {selectedDonation?.status === "Available" && (
                <Button 
                  onClick={handleCancelDonation}
                  className="w-full justify-start food-button" 
                  variant="destructive"
                >
                  <Ban className="mr-2 h-4 w-4" />
                  Cancel Donation
                </Button>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="food-button">
                <X className="mr-2 h-4 w-4" />
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* NGO Contact Dialog */}
      <Dialog open={showNgoContact} onOpenChange={setShowNgoContact}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Contact {ngoContactInfo.name}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-muted-foreground">Contact Person</h4>
              <p>{ngoContactInfo.contactPerson}</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-muted-foreground">Phone</h4>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-green-600" />
                <p>{ngoContactInfo.phone}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-muted-foreground">Email</h4>
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-blue-600" />
                <p>{ngoContactInfo.email}</p>
              </div>
            </div>
            
            <div className="space-y-2 border-t pt-4 dark:border-gray-700">
              <h4 className="font-medium text-sm text-muted-foreground">Estimated Pickup Time</h4>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-purple-600" />
                <p>{ngoContactInfo.estimatedPickupTime}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-muted-foreground">Notes</h4>
              <div className="flex items-start gap-2 bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5" />
                <p className="text-sm">{ngoContactInfo.notes}</p>
              </div>
            </div>
          </div>
          
          <DialogFooter className="sm:justify-between">
            <DialogClose asChild>
              <Button variant="outline" className="gap-1 food-button">
                <X className="h-4 w-4" />
                Close
              </Button>
            </DialogClose>
            <div className="flex gap-2">
              <Button className="gap-1 bg-green-600 hover:bg-green-700 food-button">
                <Phone className="h-4 w-4" />
                Call NGO
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RestaurantDashboard;
