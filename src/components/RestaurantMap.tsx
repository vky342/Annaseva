
import React, { useEffect, useRef, useState } from 'react';
import { Donation } from '@/store/DonationContext';
import GeolocationService from '@/services/GeolocationService';

// Add type declaration for Google Maps API
declare global {
  interface Window {
    google: any;
  }
}

interface RestaurantMapProps {
  donations: Donation[];
  onMarkerClick?: (donation: Donation) => void;
}

const RestaurantMap: React.FC<RestaurantMapProps> = ({ donations, onMarkerClick }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const directionsRendererRef = useRef<any>(null);
  const infoWindowsRef = useRef<any[]>([]);
  const [isMapMounted, setIsMapMounted] = useState(false);

  // Setup map when component mounts
  useEffect(() => {
    setIsMapMounted(true);
    
    return () => {
      // Ensure cleanup happens only if map was mounted
      setIsMapMounted(false);
      
      // Clear all markers
      if (markersRef.current.length > 0) {
        markersRef.current.forEach(marker => {
          if (marker) marker.setMap(null);
        });
        markersRef.current = [];
      }
      
      // Clear all info windows
      if (infoWindowsRef.current.length > 0) {
        infoWindowsRef.current.forEach(infoWindow => {
          if (infoWindow) infoWindow.close();
        });
        infoWindowsRef.current = [];
      }
      
      // Clear directions renderer
      if (directionsRendererRef.current) {
        directionsRendererRef.current.setMap(null);
        directionsRendererRef.current = null;
      }
      
      // Clear map instance
      mapInstanceRef.current = null;
    };
  }, []);

  // Handle map initialization and updates
  useEffect(() => {
    if (!isMapMounted) return;
    
    // Initialize map
    if (!mapInstanceRef.current && mapRef.current && window.google) {
      try {
        mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
          center: { lat: 37.7749, lng: -122.4194 }, // Default to San Francisco
          zoom: 12,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          zoomControl: true,
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }],
            },
          ],
        });
      } catch (error) {
        console.error("Error initializing Google Maps:", error);
        return;
      }
    }
    
    if (!mapInstanceRef.current || !window.google) return;

    // Clear existing markers
    if (markersRef.current.length > 0) {
      markersRef.current.forEach(marker => {
        if (marker) marker.setMap(null);
      });
      markersRef.current = [];
    }

    // Clear existing info windows
    if (infoWindowsRef.current.length > 0) {
      infoWindowsRef.current.forEach(infoWindow => {
        if (infoWindow) infoWindow.close();
      });
      infoWindowsRef.current = [];
    }

    // Clear existing directions
    if (directionsRendererRef.current) {
      directionsRendererRef.current.setMap(null);
      directionsRendererRef.current = null;
    }

    // Add markers for donations with coordinates
    if (mapInstanceRef.current && donations && donations.length > 0) {
      try {
        const bounds = new window.google.maps.LatLngBounds();
        
        donations.forEach(donation => {
          if (donation.latitude && donation.longitude) {
            const position = { 
              lat: donation.latitude, 
              lng: donation.longitude 
            };
            
            const marker = new window.google.maps.Marker({
              position,
              map: mapInstanceRef.current,
              title: donation.foodName,
              icon: {
                url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
                scaledSize: new window.google.maps.Size(40, 40),
              },
              animation: window.google.maps.Animation.DROP,
            });
            
            // Add info window with restaurant details
            const infoContent = `
              <div style="padding: 8px; max-width: 200px;">
                <h3 style="font-weight: bold; margin-bottom: 5px;">${donation.restaurantName}</h3>
                <p style="margin-bottom: 5px;">${donation.location}</p>
                <p style="margin-bottom: 0;"><strong>Food:</strong> ${donation.foodName}</p>
              </div>
            `;
            
            const infoWindow = new window.google.maps.InfoWindow({
              content: infoContent
            });
            
            infoWindowsRef.current.push(infoWindow);
            
            marker.addListener('click', () => {
              // Close all open info windows first
              infoWindowsRef.current.forEach(iw => {
                if (iw) iw.close();
              });
              
              // Open info window
              infoWindow.open(mapInstanceRef.current, marker);
              
              // Call the provided click handler if available
              if (onMarkerClick) {
                onMarkerClick(donation);
              }
            });
            
            markersRef.current.push(marker);
            bounds.extend(position);
          }
        });
        
        // Only adjust bounds if we have markers
        if (markersRef.current.length > 0) {
          mapInstanceRef.current.fitBounds(bounds);
          
          // Add directions renderer if there's only one donation (for NGO tracking)
          if (donations.length === 1 && donations[0].latitude && donations[0].longitude) {
            // Get user's current location for directions
            GeolocationService.getCurrentPosition().then(currentPosition => {
              if (currentPosition && isMapMounted && mapInstanceRef.current) {
                try {
                  const directionsService = new window.google.maps.DirectionsService();
                  const directionsRenderer = new window.google.maps.DirectionsRenderer({
                    map: mapInstanceRef.current,
                    suppressMarkers: false,
                    polylineOptions: {
                      strokeColor: '#5B21B6', // brand-800 color
                      strokeWeight: 5,
                      strokeOpacity: 0.7
                    }
                  });
                  
                  directionsRendererRef.current = directionsRenderer;
                  
                  // Calculate and display route
                  directionsService.route({
                    origin: {
                      lat: currentPosition.lat,
                      lng: currentPosition.lng
                    },
                    destination: {
                      lat: donations[0].latitude as number,
                      lng: donations[0].longitude as number
                    },
                    travelMode: window.google.maps.TravelMode.DRIVING
                  }, (response: any, status: string) => {
                    if (status === 'OK' && isMapMounted) {
                      directionsRenderer.setDirections(response);
                      
                      // Add route details
                      const route = response.routes[0];
                      if (route && route.legs[0]) {
                        const leg = route.legs[0];
                        const routeInfoWindow = new window.google.maps.InfoWindow({
                          content: `
                            <div style="padding: 8px; max-width: 200px;">
                              <h3 style="font-weight: bold; margin-bottom: 5px;">Route Information</h3>
                              <p style="margin-bottom: 5px;"><strong>Distance:</strong> ${leg.distance.text}</p>
                              <p style="margin-bottom: 0;"><strong>Duration:</strong> ${leg.duration.text}</p>
                            </div>
                          `,
                          position: {
                            lat: (currentPosition.lat + donations[0].latitude as number) / 2,
                            lng: (currentPosition.lng + donations[0].longitude as number) / 2
                          }
                        });
                        
                        infoWindowsRef.current.push(routeInfoWindow);
                        
                        // Open the info window automatically only if component is still mounted
                        if (isMapMounted) {
                          routeInfoWindow.open(mapInstanceRef.current);
                        }
                      }
                    }
                  });
                } catch (error) {
                  console.error("Error setting up directions:", error);
                }
              }
            }).catch(error => {
              console.error("Error getting current position:", error);
            });
          }
        }
      } catch (error) {
        console.error("Error adding map markers:", error);
      }
    }
  }, [donations, onMarkerClick, isMapMounted]);

  return (
    <div 
      ref={mapRef} 
      className="w-full h-full rounded-md"
      style={{ minHeight: "400px" }}
    />
  );
};

export default RestaurantMap;
