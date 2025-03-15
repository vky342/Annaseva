
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, CheckCircle, History, RefreshCcw, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useDonations } from "@/store/DonationContext";
import { useTranslation } from "@/hooks/useTranslation";
import { useTheme } from "@/store/ThemeContext";
import RestaurantMap from "@/components/RestaurantMap";
import { useState, useEffect } from "react";
import GeolocationService from "@/services/GeolocationService";

const NGODashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { donations } = useDonations();
  const { t } = useTranslation();
  const { distanceUnit } = useTheme();
  const [showMap, setShowMap] = useState(false);
  const [enrichedDonations, setEnrichedDonations] = useState(donations);
  const [isLoading, setIsLoading] = useState(false);

  // Calculate real stats based on donations data
  const availableDonations = donations.filter(donation => donation.status === "Available").length;
  const claimedDonations = donations.filter(donation => donation.status === "Claimed").length;
  const completedCollections = donations.filter(donation => donation.status === "Collected").length;

  useEffect(() => {
    // Enrich all available donations with coordinates when map is shown
    if (showMap) {
      setIsLoading(true);
      const availableDonationsList = donations.filter(donation => donation.status === "Available");
      
      Promise.all(
        availableDonationsList.map(donation => 
          GeolocationService.enrichDonationWithCoordinates(donation)
        )
      ).then(enrichedData => {
        setEnrichedDonations(
          donations.map(donation => {
            const enriched = enrichedData.find(d => d.id === donation.id);
            return enriched || donation;
          })
        );
        setIsLoading(false);
      });
    }
  }, [donations, showMap]);

  const stats = [
    {
      title: t("dashboard.title") === "NGO Dashboard" ? "Available Donations" : "उपलब्ध दान",
      value: availableDonations.toString(),
      icon: Package,
      description: t("dashboard.title") === "NGO Dashboard" ? "Food packages ready for collection" : "संग्रह के लिए तैयार खाद्य पैकेज",
    },
    {
      title: t("dashboard.title") === "NGO Dashboard" ? "Claimed Donations" : "दावा किए गए दान",
      value: claimedDonations.toString(),
      icon: CheckCircle,
      description: t("dashboard.title") === "NGO Dashboard" ? "Awaiting pickup" : "पिकअप का इंतज़ार",
    },
    {
      title: t("dashboard.title") === "NGO Dashboard" ? "Completed Collections" : "पूर्ण संग्रह",
      value: completedCollections.toString(),
      icon: History,
      description: t("dashboard.title") === "NGO Dashboard" ? "Successfully collected" : "सफलतापूर्वक एकत्रित",
    },
  ];

  // Get available donations from context
  const availableDonationsList = donations
    .filter(donation => donation.status === "Available")
    .map(donation => ({
      id: donation.id,
      restaurant: donation.restaurantName || "Unknown Restaurant",
      item: donation.foodName,
      quantity: donation.quantity,
      expiryTime: getTimeRemaining(donation.expiryDate),
      distance: getRandomDistance(distanceUnit),
    }));

  function getTimeRemaining(expiryDate: string): string {
    const now = new Date();
    const expiry = new Date(expiryDate);
    const diffHours = Math.floor((expiry.getTime() - now.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 0) return t("dashboard.title") === "NGO Dashboard" ? "Expired" : "समाप्त";
    if (diffHours < 1) return t("dashboard.title") === "NGO Dashboard" ? "Less than 1 hour" : "1 घंटे से कम";
    return `${diffHours} ${t("dashboard.title") === "NGO Dashboard" ? "hours" : "घंटे"}`;
  }
  
  function getRandomDistance(unit: string): string {
    const distanceInKm = (Math.floor(Math.random() * 50) / 10 + 0.5).toFixed(1);
    if (unit === 'mi') {
      const distanceInMiles = (parseFloat(distanceInKm) * 0.621371).toFixed(1);
      return `${distanceInMiles} mi`;
    }
    return `${distanceInKm} km`;
  }

  const handleRefreshDonations = () => {
    setIsLoading(true);
    toast({
      title: t("dashboard.title") === "NGO Dashboard" ? "Refreshing donations" : "दान रिफ्रेश करना",
      description: t("dashboard.title") === "NGO Dashboard" ? "Looking for new available donations..." : "नए उपलब्ध दान की तलाश...",
    });
    
    // In a real app, this would fetch new data from the backend
    // For now, let's simulate API delay and refresh coordinate data
    setTimeout(() => {
      const availableDonationsList = donations.filter(donation => donation.status === "Available");
      
      Promise.all(
        availableDonationsList.map(donation => 
          GeolocationService.enrichDonationWithCoordinates(donation)
        )
      ).then(enrichedData => {
        setEnrichedDonations(
          donations.map(donation => {
            const enriched = enrichedData.find(d => d.id === donation.id);
            return enriched || donation;
          })
        );
        setIsLoading(false);
        
        toast({
          title: t("dashboard.title") === "NGO Dashboard" ? "Donations Refreshed" : "दान रिफ्रेश किए गए",
          description: t("dashboard.title") === "NGO Dashboard" ? "Location data has been updated." : "स्थान डेटा अपडेट किया गया है।",
        });
      });
    }, 1500);
  };

  const handleViewAllDonations = () => {
    navigate("/available-donations");
  };

  const handleViewHistory = () => {
    navigate("/collection-history");
  };

  const handleUpdateProfile = () => {
    navigate("/profile");
  };

  const handleManageSettings = () => {
    navigate("/settings");
  };

  const toggleMap = () => {
    setShowMap(!showMap);
  };

  const handleDonationMarkerClick = (donation) => {
    navigate(`/donations/${donation.id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">{t("dashboard.title")}</h1>
        <div className="flex gap-2">
          <Button 
            className="bg-purple-600 hover:bg-purple-700 text-white"
            onClick={handleRefreshDonations}
            disabled={isLoading}
          >
            <RefreshCcw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading 
              ? (t("dashboard.title") === "NGO Dashboard" ? "Refreshing..." : "रिफ्रेश हो रहा है...")
              : t("dashboard.refresh")
            }
          </Button>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={toggleMap}
          >
            <MapPin className="mr-2 h-4 w-4" />
            {showMap ? (t("dashboard.title") === "NGO Dashboard" ? "Hide Map" : "मानचित्र छिपाएँ") : (t("dashboard.title") === "NGO Dashboard" ? "Show Map" : "मानचित्र दिखाएँ")}
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title} className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground dark:text-gray-400">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground dark:text-gray-400 mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Map View */}
      {showMap && (
        <Card className="mb-8 dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle>{t("dashboard.title") === "NGO Dashboard" ? "Restaurant Locations" : "रेस्तरां स्थान"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] rounded-md overflow-hidden">
              {isLoading ? (
                <div className="h-full w-full flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                  <div className="flex flex-col items-center">
                    <RefreshCcw className="h-8 w-8 text-gray-400 animate-spin mb-2" />
                    <p className="text-gray-500 dark:text-gray-400">
                      {t("dashboard.title") === "NGO Dashboard" ? "Loading map data..." : "मानचित्र डेटा लोड हो रहा है..."}
                    </p>
                  </div>
                </div>
              ) : (
                <RestaurantMap 
                  donations={enrichedDonations.filter(donation => donation.status === "Available")}
                  onMarkerClick={handleDonationMarkerClick}
                />
              )}
            </div>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              {t("dashboard.title") === "NGO Dashboard" 
                ? "Click on restaurant markers to view donation details and get directions."
                : "दान विवरण देखने और दिशानिर्देश प्राप्त करने के लिए रेस्तरां मार्कर पर क्लिक करें।"
              }
            </p>
          </CardContent>
        </Card>
      )}

      {/* Available Donations */}
      <Card className="mb-8 dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle>{t("dashboard.title") === "NGO Dashboard" ? "Available Donations" : "उपलब्ध दान"}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border dark:border-gray-700">
            <div className="divide-y dark:divide-gray-700">
              {availableDonationsList.length === 0 ? (
                <div className="p-4 text-center">
                  <p className="text-muted-foreground dark:text-gray-400">
                    {t("dashboard.title") === "NGO Dashboard" ? "No donations available at the moment" : "इस समय कोई दान उपलब्ध नहीं है"}
                  </p>
                </div>
              ) : (
                availableDonationsList.map((donation) => (
                  <div
                    key={donation.id}
                    className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                    onClick={() => navigate(`/donations/${donation.id}`)}
                  >
                    <div>
                      <h3 className="font-medium">{donation.restaurant}</h3>
                      <p className="text-sm text-muted-foreground dark:text-gray-400">
                        {donation.item} - {donation.quantity}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-sm text-orange-600 dark:text-orange-400">
                        {t("dashboard.title") === "NGO Dashboard" ? "Expires in" : "समाप्ति में"}: {donation.expiryTime}
                      </span>
                      <span className="text-sm text-muted-foreground dark:text-gray-400">
                        {donation.distance} {t("dashboard.title") === "NGO Dashboard" ? "away" : "दूर"}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle>{t("dashboard.title") === "NGO Dashboard" ? "Quick Actions" : "त्वरित कार्य"}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <Button 
            variant="outline" 
            className="w-full justify-start dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
            onClick={handleViewAllDonations}
          >
            {t("dashboard.title") === "NGO Dashboard" ? "View All Available Donations" : "सभी उपलब्ध दान देखें"}
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
            onClick={handleViewHistory}
          >
            {t("dashboard.title") === "NGO Dashboard" ? "Collection History" : "संग्रह इतिहास"}
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
            onClick={handleUpdateProfile}
          >
            {t("dashboard.title") === "NGO Dashboard" ? "Update Profile" : "प्रोफ़ाइल अपडेट करें"}
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
            onClick={handleManageSettings}
          >
            {t("dashboard.title") === "NGO Dashboard" ? "Manage Settings" : "सेटिंग्स प्रबंधित करें"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NGODashboard;
