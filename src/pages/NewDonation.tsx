
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Upload, ArrowLeft } from "lucide-react";
import { useDonations } from "@/store/DonationContext";
import DonationStatusOverlay from "@/components/DonationStatusOverlay";

const NewDonation = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { addDonation } = useDonations();
  
  const [formData, setFormData] = useState({
    foodName: "",
    quantity: "",
    expiryDate: "",
    madeDate: "",
  });
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [statusOverlay, setStatusOverlay] = useState<{
    show: boolean;
    status: 'loading' | 'success';
    type: 'create';
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Show loading overlay first
    setStatusOverlay({
      show: true,
      status: 'loading',
      type: 'create'
    });
    
    // Simulate API call delay
    setTimeout(() => {
      // Create new donation and add it to the store
      const newDonation = {
        foodName: formData.foodName,
        quantity: formData.quantity,
        expiryDate: formData.expiryDate,
        madeDate: formData.madeDate,
        status: "Available" as const,
        photoUrl: photoPreview || undefined,
        restaurantName: "Your Restaurant", // In a real app, this would come from user profile
        location: "Your Location", // In a real app, this would come from user profile
        ngo: null,
      };
      
      addDonation(newDonation);
      
      // Show success overlay
      setStatusOverlay({
        show: true,
        status: 'success',
        type: 'create'
      });
      
      // Hide success overlay after a delay
      setTimeout(() => {
        setStatusOverlay(null);
        setIsSubmitting(false);
        navigate("/donations");
      }, 3000);
    }, 1500);
  };

  const handleCloseOverlay = () => {
    setStatusOverlay(null);
    if (statusOverlay?.status === 'success') {
      navigate("/donations");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {statusOverlay && statusOverlay.show && (
        <DonationStatusOverlay
          status={statusOverlay.status}
          type={statusOverlay.type}
          onClose={handleCloseOverlay}
          userType="restaurant"
          message={
            statusOverlay.status === 'success'
              ? "Your food donation has been added successfully and is now available for NGOs to claim."
              : undefined
          }
        />
      )}
      
      <Button 
        variant="ghost" 
        className="mb-6 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <Card className="max-w-2xl mx-auto shadow-sm hover:shadow-md transition-all border-gray-200 dark:border-gray-700">
        <CardHeader className="border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <CardTitle>Create New Donation</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="foodName">Food Name</Label>
              <Input
                id="foodName"
                name="foodName"
                placeholder="Enter food name"
                value={formData.foodName}
                onChange={handleInputChange}
                required
                className="border-gray-300 dark:border-gray-600 focus:border-brand-500 focus:ring-brand-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                name="quantity"
                placeholder="e.g., 5 kg, 10 portions"
                value={formData.quantity}
                onChange={handleInputChange}
                required
                className="border-gray-300 dark:border-gray-600 focus:border-brand-500 focus:ring-brand-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="madeDate">Date Made</Label>
              <Input
                id="madeDate"
                name="madeDate"
                type="datetime-local"
                value={formData.madeDate}
                onChange={handleInputChange}
                required
                className="border-gray-300 dark:border-gray-600 focus:border-brand-500 focus:ring-brand-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                name="expiryDate"
                type="datetime-local"
                value={formData.expiryDate}
                onChange={handleInputChange}
                required
                className="border-gray-300 dark:border-gray-600 focus:border-brand-500 focus:ring-brand-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="photo">Food Photo</Label>
              <div className="flex flex-col items-center gap-4">
                {photoPreview && (
                  <img
                    src={photoPreview}
                    alt="Food preview"
                    className="w-full max-w-md rounded-lg object-cover border border-gray-200 dark:border-gray-700 shadow-sm"
                  />
                )}
                <div className="w-full">
                  <Input
                    id="photo"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border-dashed border-2 border-gray-300 dark:border-gray-600 hover:border-brand-500 hover:bg-brand-50 dark:hover:bg-brand-900/20 dark:hover:border-brand-400 transition-colors py-6"
                    onClick={() => document.getElementById('photo')?.click()}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    {photo ? 'Change Photo' : 'Upload Photo'}
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t dark:border-gray-700">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => navigate(-1)}
                className="border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="bg-brand-500 hover:bg-brand-600 text-white shadow-sm hover:shadow-md food-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating...' : 'Create Donation'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewDonation;
