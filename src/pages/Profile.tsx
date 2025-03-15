
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import FileUpload from "@/components/FileUpload";
import ImageStorageService, { StoredImage } from "@/services/ImageStorageService";
import ErrorBoundary from "@/components/ErrorBoundary";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  
  // Sample profile data - in a real app, this would come from a user context or API
  const [profile, setProfile] = React.useState({
    name: "Food Bank NGO",
    email: "contact@foodbank.org",
    phone: "+1 (555) 123-4567",
    address: "456 Charity Lane, Helping City, HC 12345",
    description: "We are a non-profit organization dedicated to reducing food waste and helping those in need by redistributing surplus food from restaurants and businesses.",
    contactPerson: "Jane Smith",
    contactRole: "Pickup Coordinator"
  });

  const [logo, setLogo] = React.useState<StoredImage | null>(null);
  const [photos, setPhotos] = React.useState<StoredImage[]>([]);
  const [logoFile, setLogoFile] = React.useState<File | null>(null);
  const [photoFile, setPhotoFile] = React.useState<File | null>(null);

  // Load saved images on component mount
  useEffect(() => {
    const savedLogo = ImageStorageService.getLogo();
    if (savedLogo) {
      setLogo(savedLogo);
    }
    
    const savedPhotos = ImageStorageService.getPhotos();
    setPhotos(savedPhotos);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogoChange = (file: File | null) => {
    setLogoFile(file);
  };

  const handlePhotoChange = (file: File | null) => {
    setPhotoFile(file);
  };

  const handleAddPhoto = async () => {
    if (photoFile) {
      try {
        const savedPhoto = await ImageStorageService.savePhoto(photoFile);
        setPhotos(prev => [...prev, savedPhoto]);
        setPhotoFile(null);
        toast({
          title: "Photo Added",
          description: "Your photo has been successfully added to your profile.",
        });
      } catch (error) {
        console.error("Error saving photo:", error);
        toast({
          title: "Error",
          description: "There was an error adding your photo. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleRemovePhoto = (photoId: string) => {
    ImageStorageService.removePhoto(photoId);
    setPhotos(prev => prev.filter(photo => photo.id !== photoId));
    toast({
      title: "Photo Removed",
      description: "The photo has been removed from your profile.",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Save logo if a new one was selected
      if (logoFile) {
        const savedLogo = await ImageStorageService.saveLogo(logoFile);
        setLogo(savedLogo);
        setLogoFile(null);
      }
      
      // In a real app, this would send the profile data to your backend
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      console.error("Error saving profile:", error);
      toast({
        title: "Error",
        description: "There was an error saving your profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <ErrorBoundary>
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <Button
          variant="ghost"
          className="mb-4 sm:mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold">Your Profile</h1>
          <p className="text-muted-foreground">
            Manage your organization's information
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Organization Details</CardTitle>
              <CardDescription>
                This information will be displayed publicly to restaurants
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Organization Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={profile.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={profile.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={profile.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={profile.address}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      rows={4}
                      value={profile.description}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="contactPerson">Contact Person</Label>
                      <Input
                        id="contactPerson"
                        name="contactPerson"
                        value={profile.contactPerson}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactRole">Role</Label>
                      <Input
                        id="contactRole"
                        name="contactRole"
                        value={profile.contactRole}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit" className="bg-purple-600 hover:bg-purple-700 w-full sm:w-auto">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Logo</CardTitle>
                <CardDescription>
                  This logo will be displayed on your profile and listings
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-4">
                <FileUpload 
                  onChange={handleLogoChange}
                  value={logo?.data}
                  previewSize="md"
                  label="Upload New Logo"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Organization Photos</CardTitle>
                <CardDescription>
                  Add photos of your headquarters, facilities, or team
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {photos.map((photo) => (
                    <div key={photo.id} className="relative group">
                      <img
                        src={photo.data}
                        alt="Organization"
                        className="rounded-lg h-32 sm:h-40 w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemovePhoto(photo.id)}
                        className="absolute top-2 right-2 p-1 bg-red-100 rounded-full text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <FileUpload 
                    onChange={handlePhotoChange}
                    previewSize="sm"
                    label="Select Photo"
                  />
                  <Button 
                    type="button" 
                    onClick={handleAddPhoto}
                    disabled={!photoFile}
                    className="w-full"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Photo
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Verification Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-4">
                  <div className="h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-2">
                    ✓
                  </div>
                  <span className="font-medium">Verified Organization</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your organization has been verified. Restaurants can trust your profile.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Profile;
