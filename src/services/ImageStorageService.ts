
// For the demo, we'll use localStorage to persist images
// In a real app, this would use a proper backend storage service

export interface StoredImage {
  id: string;
  data: string; // base64 encoded image data
  fileName: string;
  contentType: string;
  createdAt: number;
}

class ImageStorageService {
  private readonly LOGO_KEY = 'user_logo';
  private readonly PHOTOS_KEY = 'org_photos';

  // Save organization logo
  async saveLogo(file: File): Promise<StoredImage> {
    const imageData = await this.fileToBase64(file);
    const storedImage: StoredImage = {
      id: 'logo-' + Date.now(),
      data: imageData,
      fileName: file.name,
      contentType: file.type,
      createdAt: Date.now()
    };
    
    localStorage.setItem(this.LOGO_KEY, JSON.stringify(storedImage));
    return storedImage;
  }

  // Get organization logo
  getLogo(): StoredImage | null {
    const logoData = localStorage.getItem(this.LOGO_KEY);
    return logoData ? JSON.parse(logoData) : null;
  }

  // Remove organization logo
  removeLogo(): void {
    localStorage.removeItem(this.LOGO_KEY);
  }

  // Save organization photo
  async savePhoto(file: File): Promise<StoredImage> {
    const imageData = await this.fileToBase64(file);
    const photoId = 'photo-' + Date.now();
    
    const storedImage: StoredImage = {
      id: photoId,
      data: imageData,
      fileName: file.name,
      contentType: file.type,
      createdAt: Date.now()
    };
    
    // Get existing photos
    const existingPhotos = this.getPhotos();
    existingPhotos.push(storedImage);
    
    // Save updated photos
    localStorage.setItem(this.PHOTOS_KEY, JSON.stringify(existingPhotos));
    return storedImage;
  }

  // Get all organization photos
  getPhotos(): StoredImage[] {
    const photosData = localStorage.getItem(this.PHOTOS_KEY);
    return photosData ? JSON.parse(photosData) : [];
  }

  // Remove a specific photo
  removePhoto(photoId: string): void {
    const photos = this.getPhotos();
    const updatedPhotos = photos.filter(photo => photo.id !== photoId);
    localStorage.setItem(this.PHOTOS_KEY, JSON.stringify(updatedPhotos));
  }

  // Clear all photos
  clearPhotos(): void {
    localStorage.removeItem(this.PHOTOS_KEY);
  }

  // Convert File to base64 string
  private fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }
}

export default new ImageStorageService();
