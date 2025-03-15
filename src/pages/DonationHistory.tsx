
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, SearchX } from "lucide-react";
import { useDonations } from "@/store/DonationContext";
import { useTheme } from "@/store/ThemeContext";
import { useTranslation } from "@/hooks/useTranslation";

const DonationHistory = () => {
  const navigate = useNavigate();
  const { donations } = useDonations();
  const { theme } = useTheme();
  const { t } = useTranslation();

  // Get historical donations (claimed, collected, or expired)
  const historyDonations = donations.filter(
    donation => donation.status === "Claimed" || 
                donation.status === "Collected" || 
                donation.status === "Expired"
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit"
    });
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Claimed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "Collected":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "Expired":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => navigate("/dashboard/restaurant")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>

      <div className="mb-8">
        <h1 className="text-2xl font-bold">Donation History</h1>
        <p className="text-muted-foreground dark:text-gray-400">
          View your past donations and their status
        </p>
      </div>

      {historyDonations.length === 0 ? (
        <div className="text-center py-16">
          <SearchX className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h2 className="text-xl font-medium mb-2">No donation history yet</h2>
          <p className="text-muted-foreground mb-6 dark:text-gray-400">
            Once you've made donations that are claimed, collected, or expired, they will appear here.
          </p>
          <Button 
            onClick={() => navigate("/donations/new")}
            className="bg-brand-500 hover:bg-brand-600"
          >
            Create New Donation
          </Button>
        </div>
      ) : (
        <Card className={`${theme === 'dark' ? 'dark:bg-gray-800 dark:border-gray-700' : ''}`}>
          <CardHeader>
            <CardTitle>Your Donation History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`rounded-md border ${theme === 'dark' ? 'dark:border-gray-700' : ''}`}>
              <div className={`divide-y ${theme === 'dark' ? 'dark:divide-gray-700' : ''}`}>
                {historyDonations.map((donation) => (
                  <div
                    key={donation.id}
                    className={`p-4 hover:bg-gray-50 cursor-pointer ${theme === 'dark' ? 'dark:hover:bg-gray-700' : ''}`}
                    onClick={() => navigate(`/donations/${donation.id}`)}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex gap-2 items-center mb-1">
                          <h3 className="font-medium">{donation.foodName}</h3>
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs ${getStatusClass(donation.status)}`}
                          >
                            {donation.status}
                          </span>
                        </div>
                        {donation.ngo && (
                          <p className="text-sm text-muted-foreground dark:text-gray-400">
                            Claimed by: {donation.ngo}
                          </p>
                        )}
                        <p className="text-sm text-muted-foreground dark:text-gray-400">
                          Quantity: {donation.quantity}
                        </p>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center justify-end gap-1 text-sm text-muted-foreground dark:text-gray-400">
                          <Calendar className="h-4 w-4" />
                          <span>Made: {formatDate(donation.madeDate)}</span>
                        </div>
                        <div className="flex items-center justify-end gap-1 text-sm text-muted-foreground dark:text-gray-400">
                          <Clock className="h-4 w-4" />
                          <span>Expires: {formatDate(donation.expiryDate)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DonationHistory;
