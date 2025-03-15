
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, SearchX } from "lucide-react";
import { useDonations } from "@/store/DonationContext";

const CollectionHistory = () => {
  const navigate = useNavigate();
  const { donations } = useDonations();

  // Get claimed and collected donations
  const historyDonations = donations.filter(
    donation => donation.status === "Claimed" || donation.status === "Collected"
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
        return "bg-blue-100 text-blue-800";
      case "Collected":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => navigate("/dashboard/ngo")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>

      <div className="mb-8">
        <h1 className="text-2xl font-bold">Collection History</h1>
        <p className="text-muted-foreground">
          View your claimed and collected donations
        </p>
      </div>

      {historyDonations.length === 0 ? (
        <div className="text-center py-16">
          <SearchX className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h2 className="text-xl font-medium mb-2">No collection history yet</h2>
          <p className="text-muted-foreground mb-6">
            Once you claim and collect donations, they will appear here.
          </p>
          <Button 
            onClick={() => navigate("/available-donations")}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Browse Available Donations
          </Button>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Your Collection History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="divide-y">
                {historyDonations.map((donation) => (
                  <div
                    key={donation.id}
                    className="p-4 hover:bg-gray-50 cursor-pointer"
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
                        <p className="text-sm text-muted-foreground">
                          From: {donation.restaurantName || "Unknown Restaurant"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Quantity: {donation.quantity}
                        </p>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center justify-end gap-1 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>Made: {formatDate(donation.madeDate)}</span>
                        </div>
                        <div className="flex items-center justify-end gap-1 text-sm text-muted-foreground">
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

export default CollectionHistory;
