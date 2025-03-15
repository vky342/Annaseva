
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Filter, Search, X, Calendar, Clock, CheckCircle, Ban, CircleOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";

// We'll simulate fetching data from a central store
import { useDonations } from "@/store/DonationContext";

const DonationsList = () => {
  const navigate = useNavigate();
  const { donations } = useDonations();
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [statusFilters, setStatusFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("newest");
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
  const [toDate, setToDate] = useState<Date | undefined>(undefined);
  
  // Handle status filter changes
  const toggleStatusFilter = (status: string) => {
    setStatusFilters(prev => 
      prev.includes(status) 
        ? prev.filter(s => s !== status) 
        : [...prev, status]
    );
  };
  
  // Reset all filters
  const resetFilters = () => {
    setStatusFilters([]);
    setSortBy("newest");
    setFromDate(undefined);
    setToDate(undefined);
  };

  // Apply filters and sorting
  const filteredDonations = donations
    .filter(donation => 
      // Search filter
      donation.foodName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(donation => 
      // Status filter
      statusFilters.length === 0 || statusFilters.includes(donation.status)
    )
    .filter(donation => {
      // Date range filter for expiry dates
      if (!fromDate && !toDate) return true;
      
      const expiryDate = new Date(donation.expiryDate);
      
      if (fromDate && toDate) {
        return expiryDate >= fromDate && expiryDate <= toDate;
      }
      
      if (fromDate) {
        return expiryDate >= fromDate;
      }
      
      if (toDate) {
        return expiryDate <= toDate;
      }
      
      return true;
    })
    .sort((a, b) => {
      // Apply sorting
      if (sortBy === "newest") {
        return new Date(b.madeDate).getTime() - new Date(a.madeDate).getTime();
      }
      if (sortBy === "oldest") {
        return new Date(a.madeDate).getTime() - new Date(b.madeDate).getTime();
      }
      if (sortBy === "expiringSoon") {
        return new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime();
      }
      return 0;
    });

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800";
      case "Claimed":
        return "bg-blue-100 text-blue-800";
      case "Collected":
        return "bg-purple-100 text-purple-800";
      case "Expired":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-2xl font-bold">My Donations</h1>
        <Button 
          className="bg-brand-500 hover:bg-brand-600"
          onClick={() => navigate("/donations/new")}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          New Donation
        </Button>
      </div>

      {/* Search and filter */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search donations..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Popover open={showFilters} onOpenChange={setShowFilters}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="sm:w-auto w-full relative">
              <Filter className="mr-2 h-4 w-4" />
              Filter
              {(statusFilters.length > 0 || fromDate || toDate || sortBy !== "newest") && (
                <span className="absolute -top-1 -right-1 bg-brand-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {statusFilters.length + (fromDate || toDate ? 1 : 0) + (sortBy !== "newest" ? 1 : 0)}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4">
            <div className="space-y-4">
              <h3 className="font-medium">Filter Donations</h3>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Status</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="available"
                      checked={statusFilters.includes("Available")}
                      onCheckedChange={() => toggleStatusFilter("Available")}
                    />
                    <Label htmlFor="available" className="flex items-center text-sm">
                      <span className="bg-green-100 text-green-800 rounded-full w-2 h-2 inline-block mr-2"></span>
                      Available
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="claimed"
                      checked={statusFilters.includes("Claimed")}
                      onCheckedChange={() => toggleStatusFilter("Claimed")}
                    />
                    <Label htmlFor="claimed" className="flex items-center text-sm">
                      <span className="bg-blue-100 text-blue-800 rounded-full w-2 h-2 inline-block mr-2"></span>
                      Claimed
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="collected"
                      checked={statusFilters.includes("Collected")}
                      onCheckedChange={() => toggleStatusFilter("Collected")}
                    />
                    <Label htmlFor="collected" className="flex items-center text-sm">
                      <span className="bg-purple-100 text-purple-800 rounded-full w-2 h-2 inline-block mr-2"></span>
                      Collected
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="expired"
                      checked={statusFilters.includes("Expired")}
                      onCheckedChange={() => toggleStatusFilter("Expired")}
                    />
                    <Label htmlFor="expired" className="flex items-center text-sm">
                      <span className="bg-red-100 text-red-800 rounded-full w-2 h-2 inline-block mr-2"></span>
                      Expired
                    </Label>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Sort By</h4>
                <Select
                  value={sortBy}
                  onValueChange={setSortBy}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4" />
                        Newest First
                      </div>
                    </SelectItem>
                    <SelectItem value="oldest">
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4" />
                        Oldest First
                      </div>
                    </SelectItem>
                    <SelectItem value="expiringSoon">
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        Expiring Soon
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Expiry Date Range</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="fromDate" className="text-xs">From</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="fromDate"
                          variant="outline"
                          className="w-full justify-start text-left font-normal h-9"
                        >
                          {fromDate ? (
                            format(fromDate, "MMM dd, yyyy")
                          ) : (
                            <span className="text-muted-foreground">Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={fromDate}
                          onSelect={setFromDate}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <Label htmlFor="toDate" className="text-xs">To</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="toDate"
                          variant="outline"
                          className="w-full justify-start text-left font-normal h-9"
                        >
                          {toDate ? (
                            format(toDate, "MMM dd, yyyy")
                          ) : (
                            <span className="text-muted-foreground">Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={toDate}
                          onSelect={setToDate}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between pt-2">
                <Button variant="outline" size="sm" onClick={resetFilters}>
                  <X className="mr-2 h-4 w-4" />
                  Reset
                </Button>
                <Button size="sm" onClick={() => setShowFilters(false)}>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Apply
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Donations List */}
      <Card>
        <CardHeader>
          <CardTitle>All Donations</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredDonations.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">No donations found</p>
              <Button 
                variant="outline" 
                onClick={() => navigate("/donations/new")}
              >
                Create Your First Donation
              </Button>
            </div>
          ) : (
            <div className="rounded-md border">
              <div className="divide-y">
                {filteredDonations.map((donation) => (
                  <div
                    key={donation.id}
                    className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer"
                    onClick={() => navigate(`/donations/${donation.id}`)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-md overflow-hidden">
                        {donation.photoUrl ? (
                          <img 
                            src={donation.photoUrl} 
                            alt={donation.foodName}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-500">
                            No img
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">{donation.foodName}</h3>
                        <p className="text-sm text-muted-foreground">
                          Quantity: {donation.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          getStatusClass(donation.status)
                        }`}
                      >
                        {donation.status}
                      </span>
                      <span className="text-sm text-muted-foreground hidden sm:inline">
                        Expires: {new Date(donation.expiryDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DonationsList;
