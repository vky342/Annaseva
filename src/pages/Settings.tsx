import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  BellRing, 
  Globe, 
  Lock, 
  Save, 
  Shield, 
  Truck, 
  Utensils, 
  Clock, 
  MapPin,
  Heart,
  Image,
  Users,
  AlertTriangle,
  Smartphone,
  Check,
  X
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/store/ThemeContext";
import { useTranslation } from "@/hooks/useTranslation";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import FileUpload from "@/components/FileUpload";
import ImageStorageService from "@/services/ImageStorageService";
import ErrorBoundary from "@/components/ErrorBoundary";

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();
  const { 
    theme, 
    language, 
    distanceUnit, 
    privacyLevel,
    notifications,
    security,
    setTheme, 
    setLanguage, 
    setDistanceUnit, 
    setPrivacyLevel,
    toggleNotification,
    toggleSecurity
  } = useTheme();

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Get user type from localStorage
  const [userType, setUserType] = useState<"restaurant" | "ngo" | null>(null);
  
  // NGO-specific state
  const [foodPreferences, setFoodPreferences] = useState({
    veg: true,
    nonVeg: true,
    dairy: true,
    grains: true,
    produce: true,
    preparedMeals: true,
    bakery: false,
    canned: true
  });
  
  // Team members state
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: "John Doe", role: "Collection Coordinator", active: true },
    { id: 2, name: "Jane Smith", role: "Volunteer", active: true }
  ]);
  
  // Certificate state
  const [certificateUploaded, setCertificateUploaded] = useState(false);
  
  // Restaurant-specific state
  const [foodPostingAlert, setFoodPostingAlert] = useState(true);
  const [autoExpiry, setAutoExpiry] = useState(true);
  const [collectionWindow, setCollectionWindow] = useState("2hours");
  const [shareExactLocation, setShareExactLocation] = useState(true);

  // Common settings state
  const [pushNotifications, setPushNotifications] = useState(true);
  const [biometricAuth, setBiometricAuth] = useState(false);
  const [appAppearance, setAppAppearance] = useState("system");
  
  useEffect(() => {
    const savedUserType = localStorage.getItem("userType");
    if (savedUserType === "restaurant" || savedUserType === "ngo") {
      setUserType(savedUserType);
    }
  }, []);

  // Profile image state
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [facilityPhotos, setFacilityPhotos] = useState<File[]>([]);
  const [facilityPhotosPreviews, setFacilityPhotosPreviews] = useState<string[]>([]);
  const [certificate, setCertificate] = useState<File | null>(null);
  const [certificatePreview, setCertificatePreview] = useState<string | null>(null);

  // Dialog states
  const [showTeamDialog, setShowTeamDialog] = useState(false);
  const [showPreferencesDialog, setShowPreferencesDialog] = useState(false);
  const [newTeamMember, setNewTeamMember] = useState({ name: "", role: "Volunteer" });

  // Load saved images from storage
  useEffect(() => {
    const savedLogo = ImageStorageService.getLogo();
    if (savedLogo) {
      setLogoPreview(savedLogo.data);
    }
    
    const savedPhotos = ImageStorageService.getPhotos();
    if (savedPhotos.length > 0) {
      setFacilityPhotosPreviews(savedPhotos.map(photo => photo.data));
    }
    
    const savedCertificate = localStorage.getItem('ngo_certificate');
    if (savedCertificate) {
      setCertificatePreview(savedCertificate);
      setCertificateUploaded(true);
    }
  }, []);

  const handleToggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleLogoChange = async (file: File | null) => {
    setProfileImage(file);
    if (file) {
      const saved = await ImageStorageService.saveLogo(file);
      setLogoPreview(saved.data);
    } else {
      ImageStorageService.removeLogo();
      setLogoPreview(null);
    }
  };

  const handleFacilityPhotoUpload = async (file: File | null) => {
    if (file) {
      setFacilityPhotos(prev => [...prev, file]);
      const saved = await ImageStorageService.savePhoto(file);
      setFacilityPhotosPreviews(prev => [...prev, saved.data]);
    }
  };
  
  const handleCertificateUpload = async (file: File | null) => {
    if (file) {
      setCertificate(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setCertificatePreview(base64String);
        localStorage.setItem('ngo_certificate', base64String);
        setCertificateUploaded(true);
        
        toast({
          title: "Certificate Uploaded",
          description: "Your organization certificate has been uploaded successfully"
        });
      };
      reader.readAsDataURL(file);
    }
  };
  
  const addTeamMember = () => {
    if (newTeamMember.name.trim()) {
      setTeamMembers(prev => [
        ...prev, 
        { 
          id: Date.now(), 
          name: newTeamMember.name, 
          role: newTeamMember.role,
          active: true
        }
      ]);
      setNewTeamMember({ name: "", role: "Volunteer" });
      
      toast({
        title: "Team Member Added",
        description: `${newTeamMember.name} has been added to your team`
      });
    }
  };
  
  const removeTeamMember = (id: number) => {
    setTeamMembers(prev => prev.filter(member => member.id !== id));
  };
  
  const toggleTeamMemberStatus = (id: number) => {
    setTeamMembers(prev => prev.map(member => 
      member.id === id ? { ...member, active: !member.active } : member
    ));
  };

  const handleSave = () => {
    toast({
      title: t("settings.title"),
      description: t("settings.title") === "Settings" ? 
        "Your settings have been updated successfully." : 
        "आपकी सेटिंग्स सफलतापूर्वक अपडेट की गई हैं।"
    });
  };

  // Restaurant-specific settings components
  const RestaurantSettings = () => (
    <>
      <Card className="dark:bg-gray-800 dark:text-white dark:border-gray-700 mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Utensils className="h-5 w-5" />
            Restaurant Profile
          </CardTitle>
          <CardDescription className="dark:text-gray-400">
            Manage your restaurant's profile and appearance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <Label className="text-base font-medium mb-2 block">Restaurant Logo</Label>
              <FileUpload
                onChange={handleLogoChange}
                value={logoPreview}
                label="Update Logo"
                previewSize="md"
              />
            </div>
            <div className="flex-1">
              <Label className="text-base font-medium mb-2 block">Restaurant Photos</Label>
              <div className="grid grid-cols-2 gap-2 sm:gap-4">
                {facilityPhotosPreviews.length > 0 ? (
                  facilityPhotosPreviews.map((photo, index) => (
                    <div key={index} className="relative h-20 sm:h-24 w-full rounded-md overflow-hidden">
                      <img src={photo} alt={`Facility ${index+1}`} className="h-full w-full object-cover" />
                    </div>
                  ))
                ) : (
                  <div className="h-20 sm:h-24 bg-gray-100 dark:bg-gray-700 rounded-md flex items-center justify-center text-muted-foreground">
                    No photos
                  </div>
                )}
                <FileUpload
                  onChange={handleFacilityPhotoUpload}
                  label="Add Photo"
                  previewSize="sm"
                />
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="foodPostingAlert" className="text-base font-medium">
                Food Posting Alerts
              </Label>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                Get reminders to post available food before closing time
              </p>
            </div>
            <Switch
              id="foodPostingAlert"
              checked={foodPostingAlert}
              onCheckedChange={setFoodPostingAlert}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="autoExpiry" className="text-base font-medium">
                Auto-Expire Unclaimed Food
              </Label>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                Automatically expire food listings after the expiry date
              </p>
            </div>
            <Switch
              id="autoExpiry"
              checked={autoExpiry}
              onCheckedChange={setAutoExpiry}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="collectionWindow" className="text-base font-medium">
                Default Collection Window
              </Label>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                Set default time window for food collection
              </p>
            </div>
            <div className="w-40">
              <Select 
                value={collectionWindow}
                onValueChange={setCollectionWindow}
              >
                <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-700">
                  <SelectItem value="1hour">1 hour</SelectItem>
                  <SelectItem value="2hours">2 hours</SelectItem>
                  <SelectItem value="3hours">3 hours</SelectItem>
                  <SelectItem value="4hours">4 hours</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="dark:bg-gray-800 dark:text-white dark:border-gray-700 mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Location Settings
          </CardTitle>
          <CardDescription className="dark:text-gray-400">
            Configure your restaurant's location and pickup details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="shareExactLocation" className="text-base font-medium">
                Share Exact Location
              </Label>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                Allow NGOs to see your exact location on maps
              </p>
            </div>
            <Switch
              id="shareExactLocation"
              checked={shareExactLocation}
              onCheckedChange={setShareExactLocation}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="pickupInstructions" className="text-base font-medium">
                Default Pickup Instructions
              </Label>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                Configure standard pickup instructions for all donations
              </p>
            </div>
            <Button variant="outline" size="sm">
              Edit Instructions
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="operatingHours" className="text-base font-medium">
                Operating Hours
              </Label>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                Set your typical opening hours for pickups
              </p>
            </div>
            <Button variant="outline" size="sm">
              Set Hours
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );

  // NGO-specific settings
  const NGOSettings = () => (
    <>
      <Card className="dark:bg-gray-800 dark:text-white dark:border-gray-700 mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5" />
            NGO Profile
          </CardTitle>
          <CardDescription className="dark:text-gray-400">
            Manage your organization's profile and appearance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <Label className="text-base font-medium mb-2 block">Organization Logo</Label>
              <FileUpload
                onChange={handleLogoChange}
                value={logoPreview}
                label="Update Logo"
                previewSize="md"
              />
            </div>
            <div className="flex-1">
              <Label className="text-base font-medium mb-2 block">Facility Photos</Label>
              <div className="grid grid-cols-2 gap-2 sm:gap-4">
                {facilityPhotosPreviews.length > 0 ? (
                  facilityPhotosPreviews.map((photo, index) => (
                    <div key={index} className="relative h-20 sm:h-24 w-full rounded-md overflow-hidden">
                      <img src={photo} alt={`Facility ${index+1}`} className="h-full w-full object-cover" />
                    </div>
                  ))
                ) : (
                  <div className="h-20 sm:h-24 bg-gray-100 dark:bg-gray-700 rounded-md flex items-center justify-center text-muted-foreground">
                    No photos
                  </div>
                )}
                <FileUpload
                  onChange={handleFacilityPhotoUpload}
                  label="Add Photo"
                  previewSize="sm"
                />
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="certificateVerification" className="text-base font-medium">
                Certificate Verification
              </Label>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                Upload verification documents for your organization
              </p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="gap-1"
                >
                  {certificateUploaded ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Image className="h-4 w-4" />
                  )}
                  {certificateUploaded ? "View Certificate" : "Upload Certificate"}
                </Button>
              </DialogTrigger>
              <DialogContent className="dark:bg-gray-800 dark:text-white dark:border-gray-700">
                <DialogHeader>
                  <DialogTitle>Organization Certificate</DialogTitle>
                  <DialogDescription className="dark:text-gray-400">
                    {certificateUploaded 
                      ? "Your organization certificate is verified" 
                      : "Upload your organization's verification documents"}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  {certificatePreview ? (
                    <div className="border rounded-md overflow-hidden">
                      <img 
                        src={certificatePreview} 
                        alt="Certificate" 
                        className="w-full h-auto max-h-[300px] object-contain"
                      />
                    </div>
                  ) : (
                    <FileUpload
                      onChange={handleCertificateUpload}
                      label="Upload Certificate"
                      value={null}
                      previewSize="lg"
                      accept="image/*, application/pdf"
                    />
                  )}
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={() => certificateUploaded ? undefined : handleCertificateUpload(certificate)}>
                    {certificateUploaded ? "Done" : "Save Certificate"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="teamMembers" className="text-base font-medium">
                Team Members
              </Label>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                Manage team members who can collect donations
              </p>
            </div>
            <Dialog open={showTeamDialog} onOpenChange={setShowTeamDialog}>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="gap-1"
                >
                  <Users className="h-4 w-4" />
                  Manage Team
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px] dark:bg-gray-800 dark:text-white dark:border-gray-700">
                <DialogHeader>
                  <DialogTitle>Manage Team Members</DialogTitle>
                  <DialogDescription className="dark:text-gray-400">
                    Add or remove team members who can collect donations
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-4">
                    {teamMembers.map(member => (
                      <div key={member.id} className="flex items-center justify-between p-3 border rounded-md dark:border-gray-700">
                        <div className="flex items-center gap-3">
                          <Switch
                            checked={member.active}
                            onCheckedChange={() => toggleTeamMemberStatus(member.id)}
                          />
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-muted-foreground dark:text-gray-400">{member.role}</p>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => removeTeamMember(member.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-2">
                      <Label htmlFor="memberName">Name</Label>
                      <input
                        id="memberName"
                        value={newTeamMember.name}
                        onChange={(e) => setNewTeamMember({...newTeamMember, name: e.target.value})}
                        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="Team member name"
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="memberRole">Role</Label>
                      <Select
                        value={newTeamMember.role}
                        onValueChange={(value) => setNewTeamMember({...newTeamMember, role: value})}
                      >
                        <SelectTrigger id="memberRole" className="dark:bg-gray-700 dark:border-gray-600">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent className="dark:bg-gray-700">
                          <SelectItem value="Volunteer">Volunteer</SelectItem>
                          <SelectItem value="Collection Coordinator">Collection Coordinator</SelectItem>
                          <SelectItem value="Manager">Manager</SelectItem>
                          <SelectItem value="Director">Director</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={addTeamMember} disabled={!newTeamMember.name.trim()}>
                    Add Team Member
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="foodTypes" className="text-base font-medium">
                Food Preferences
              </Label>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                Types of food your organization typically collects
              </p>
            </div>
            <Dialog open={showPreferencesDialog} onOpenChange={setShowPreferencesDialog}>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="gap-1"
                >
                  <Utensils className="h-4 w-4" />
                  Set Preferences
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px] dark:bg-gray-800 dark:text-white dark:border-gray-700">
                <DialogHeader>
                  <DialogTitle>Food Preferences</DialogTitle>
                  <DialogDescription className="dark:text-gray-400">
                    Select the types of food your organization prefers to collect
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="veg" 
                        checked={foodPreferences.veg}
                        onCheckedChange={(checked) => 
                          setFoodPreferences({...foodPreferences, veg: checked === true})
                        }
                      />
                      <Label htmlFor="veg">Vegetarian</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="nonVeg" 
                        checked={foodPreferences.nonVeg}
                        onCheckedChange={(checked) => 
                          setFoodPreferences({...foodPreferences, nonVeg: checked === true})
                        }
                      />
                      <Label htmlFor="nonVeg">Non-Vegetarian</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="dairy" 
                        checked={foodPreferences.dairy}
                        onCheckedChange={(checked) => 
                          setFoodPreferences({...foodPreferences, dairy: checked === true})
                        }
                      />
                      <Label htmlFor="dairy">Dairy Products</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="grains" 
                        checked={foodPreferences.grains}
                        onCheckedChange={(checked) => 
                          setFoodPreferences({...foodPreferences, grains: checked === true})
                        }
                      />
                      <Label htmlFor="grains">Grains & Cereals</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="produce" 
                        checked={foodPreferences.produce}
                        onCheckedChange={(checked) => 
                          setFoodPreferences({...foodPreferences, produce: checked === true})
                        }
                      />
                      <Label htmlFor="produce">Fresh Produce</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="preparedMeals" 
                        checked={foodPreferences.preparedMeals}
                        onCheckedChange={(checked) => 
                          setFoodPreferences({...foodPreferences, preparedMeals: checked === true})
                        }
                      />
                      <Label htmlFor="preparedMeals">Prepared Meals</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="bakery" 
                        checked={foodPreferences.bakery}
                        onCheckedChange={(checked) => 
                          setFoodPreferences({...foodPreferences, bakery: checked === true})
                        }
                      />
                      <Label htmlFor="bakery">Bakery Items</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="canned" 
                        checked={foodPreferences.canned}
                        onCheckedChange={(checked) => 
                          setFoodPreferences({...foodPreferences, canned: checked === true})
                        }
                      />
                      <Label htmlFor="canned">Canned & Preserved</Label>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={() => {
                    setShowPreferencesDialog(false);
                    toast({
                      title: "Preferences Saved",
                      description: "Your food preferences have been updated"
                    });
                  }}>
                    Save Preferences
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      <Card className="dark:bg-gray-800 dark:text-white dark:border-gray-700 mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Collection Settings
          </CardTitle>
          <CardDescription className="dark:text-gray-400">
            Configure how your organization handles food collection
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="collectionRadius" className="text-base font-medium">
                Maximum Collection Radius
              </Label>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                Set the maximum distance for donation pickups
              </p>
            </div>
            <div className="w-40">
              <Select defaultValue="10km">
                <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600">
                  <SelectValue placeholder="Select distance" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-700">
                  <SelectItem value="5km">5 {distanceUnit === 'km' ? 'km' : 'miles'}</SelectItem>
                  <SelectItem value="10km">10 {distanceUnit === 'km' ? 'km' : 'miles'}</SelectItem>
                  <SelectItem value="15km">15 {distanceUnit === 'km' ? 'km' : 'miles'}</SelectItem>
                  <SelectItem value="20km">20 {distanceUnit === 'km' ? 'km' : 'miles'}</SelectItem>
                  <SelectItem value="30km">30 {distanceUnit === 'km' ? 'km' : 'miles'}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="autoConfirmation" className="text-base font-medium">
                Auto-Confirm Collections
              </Label>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                Automatically mark donations as collected after pickup time
              </p>
            </div>
            <Switch
              id="autoConfirmation"
              checked={false}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="collectAlerts" className="text-base font-medium">
                Collection Reminders
              </Label>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                Receive reminders before scheduled collection times
              </p>
            </div>
            <Switch
              id="collectAlerts"
              checked={true}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="reminderTime" className="text-base font-medium">
                Reminder Time
              </Label>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                How long before pickup to receive reminders
              </p>
            </div>
            <div className="w-40">
              <Select defaultValue="30min">
                <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-700">
                  <SelectItem value="15min">15 minutes</SelectItem>
                  <SelectItem value="30min">30 minutes</SelectItem>
                  <SelectItem value="1hour">1 hour</SelectItem>
                  <SelectItem value="2hours">2 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );

  // Common settings section (both user types)
  const CommonSettings = () => (
    <>
      {/* Notifications */}
      <Card className="dark:bg-gray-800 dark:text-white dark:border-gray-700 mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BellRing className="h-5 w-5" />
            {t("settings.notifications")}
          </CardTitle>
          <CardDescription className="dark:text-gray-400">
            {t("settings.notifications.desc")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="notifyNewDonations" className="text-base font-medium">
                {userType === "restaurant" ? "Donation Claims" : "New Donations"}
              </Label>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                {userType === "restaurant" 
                  ? "Get notified when an NGO claims your donation" 
                  : "Get notified when new donations become available"}
              </p>
            </div>
            <Switch
              id="notifyNewDonations"
              checked={notifications.newDonations}
              onCheckedChange={() => toggleNotification('newDonations')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="notifyExpiringSoon" className="text-base font-medium">
                {userType === "restaurant" ? "Expiring Donations" : "Claimed Pickup Reminder"}
              </Label>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                {userType === "restaurant" 
                  ? "Get notified when your donations are about to expire" 
                  : "Get reminders for donations you've claimed"}
              </p>
            </div>
            <Switch
              id="notifyExpiringSoon"
              checked={notifications.expiringSoon}
              onCheckedChange={() => toggleNotification('expiringSoon')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="dailyDigest" className="text-base font-medium">
                {t("settings.dailyDigest")}
              </Label>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                {userType === "restaurant" 
                  ? "Daily summary of your donation activity" 
                  : "Daily summary of available donations in your area"}
              </p>
            </div>
            <Switch
              id="dailyDigest"
              checked={notifications.dailyDigest}
              onCheckedChange={() => toggleNotification('dailyDigest')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="pushNotifications" className="text-base font-medium">
                Push Notifications
              </Label>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                Receive push notifications on your mobile device
              </p>
            </div>
            <Switch
              id="pushNotifications"
              checked={pushNotifications}
              onCheckedChange={setPushNotifications}
            />
          </div>
        </CardContent>
      </Card>

      {/* Display */}
      <Card className="dark:bg-gray-800 dark:text-white dark:border-gray-700 mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            {t("settings.display")}
          </CardTitle>
          <CardDescription className="dark:text-gray-400">
            {t("settings.display.desc")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="distanceUnit" className="text-base font-medium">
                {t("settings.distanceUnit")}
              </Label>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                {t("settings.distanceUnit.desc")}
              </p>
            </div>
            <div className="w-40">
              <Select 
                value={distanceUnit}
                onValueChange={(value) => setDistanceUnit(value as 'km' | 'mi')}
              >
                <SelectTrigger id="distanceUnit" className="dark:bg-gray-700 dark:border-gray-600">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-700">
                  <SelectItem value="km">{t("settings.kilometers")}</SelectItem>
                  <SelectItem value="mi">{t("settings.miles")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="language" className="text-base font-medium">
                {t("settings.language")}
              </Label>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                {t("settings.language.desc")}
              </p>
            </div>
            <div className="w-40">
              <Select 
                value={language}
                onValueChange={(value) => setLanguage(value as 'english' | 'hindi' | 'spanish' | 'french')}
              >
                <SelectTrigger id="language" className="dark:bg-gray-700 dark:border-gray-600">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-700">
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="hindi">हिन्दी</SelectItem>
                  <SelectItem value="spanish">Español</SelectItem>
                  <SelectItem value="french">Français</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="darkMode" className="text-base font-medium">
                {t("settings.darkMode")}
              </Label>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                {t("settings.darkMode.desc")}
              </p>
            </div>
            <Switch
              id="darkMode"
              checked={theme === 'dark'}
              onCheckedChange={handleToggleTheme}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="appAppearance" className="text-base font-medium">
                App Appearance
              </Label>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                Use device settings or choose manually
              </p>
            </div>
            <div className="w-40">
              <Select 
                value={appAppearance}
                onValueChange={setAppAppearance}
              >
                <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600">
                  <SelectValue placeholder="Select mode" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-700">
                  <SelectItem value="system">System Default</SelectItem>
                  <SelectItem value="light">Light Mode</SelectItem>
                  <SelectItem value="dark">Dark Mode</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security & Privacy */}
      <Card className="dark:bg-gray-800 dark:text-white dark:border-gray-700 mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            {t("settings.security")}
          </CardTitle>
          <CardDescription className="dark:text-gray-400">
            {t("settings.security.desc")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="twoFactorAuth" className="text-base font-medium">
                {t("settings.twoFactorAuth")}
              </Label>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                {t("settings.twoFactorAuth.desc")}
              </p>
            </div>
            <Switch
              id="twoFactorAuth"
              checked={security.twoFactorAuth}
              onCheckedChange={() => toggleSecurity('twoFactorAuth')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="privacyLevel" className="text-base font-medium">
                {t("settings.privacyLevel")}
              </Label>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                {t("settings.privacyLevel.desc")}
              </p>
            </div>
            <div className="w-40">
              <Select 
                value={privacyLevel}
                onValueChange={(value) => setPrivacyLevel(value as 'public' | 'balanced' | 'private')}
              >
                <SelectTrigger id="privacyLevel" className="dark:bg-gray-700 dark:border-gray-600">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-700">
                  <SelectItem value="public">{t("settings.public")}</SelectItem>
                  <SelectItem value="balanced">{t("settings.balanced")}</SelectItem>
                  <SelectItem value="private">{t("settings.private")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="biometricAuth" className="text-base font-medium">
                Biometric Authentication
              </Label>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                Use fingerprint or face ID to access the app
              </p>
            </div>
            <Switch
              id="biometricAuth"
              checked={biometricAuth}
              onCheckedChange={setBiometricAuth}
            />
          </div>

          <div className="pt-4">
            <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950">
              <Lock className="mr-2 h-4 w-4" />
              {t("settings.changePassword")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );

  return (
    <ErrorBoundary>
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <Button
          variant="ghost"
          className="mb-4 sm:mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("settings.back")}
        </Button>

        <div className="mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold">{t("settings.title")}</h1>
          <p className="text-muted-foreground dark:text-gray-400">
            {t("settings.customize")}
          </p>
        </div>

        <div className="grid gap-6">
          {/* User-specific settings based on user type */}
          {userType === "restaurant" ? <RestaurantSettings /> : null}
          {userType === "ngo" ? <NGOSettings /> : null}
          
          {/* Common settings for both user types */}
          <CommonSettings />

          <div className="flex justify-end mb-10">
            <Button 
              onClick={handleSave}
              className="bg-purple-600 hover:bg-purple-700 w-full sm:w-auto"
            >
              <Save className="mr-2 h-4 w-4" />
              {t("settings.saveAll")}
            </Button>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Settings;
