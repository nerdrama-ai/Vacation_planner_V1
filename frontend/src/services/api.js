import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const api = {
  // Get popular destinations
  getDestinations: async (popularOnly = true) => {
    try {
      const response = await apiClient.get('/destinations', {
        params: { popular: popularOnly }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching destinations:', error);
      // Return fallback data if API fails
      return [
        { name: "Paris, France", country: "France", popular: true },
        { name: "Tokyo, Japan", country: "Japan", popular: true },
        { name: "New York, USA", country: "United States", popular: true },
        { name: "Bali, Indonesia", country: "Indonesia", popular: true },
        { name: "London, UK", country: "United Kingdom", popular: true },
        { name: "Barcelona, Spain", country: "Spain", popular: true }
      ];
    }
  },

  // Get travel plans for a destination
  getTravelPlans: async (destination) => {
    try {
      const encodedDestination = encodeURIComponent(destination);
      const response = await apiClient.get(`/destinations/${encodedDestination}/plans`);
      return response.data;
    } catch (error) {
      console.error('Error fetching travel plans:', error);
      throw new Error(`Failed to get travel plans for ${destination}`);
    }
  },

  // Save a new trip
  saveTrip: async (tripData) => {
    try {
      const response = await apiClient.post('/trips', {
        destination: tripData.destination,
        start_date: tripData.dateRange.from.toISOString(),
        end_date: tripData.dateRange.to.toISOString(),
        travelers: tripData.travelers,
        selected_budget: tripData.selectedBudget,
        user_email: tripData.userEmail || null
      });
      return response.data;
    } catch (error) {
      console.error('Error saving trip:', error);
      throw new Error('Failed to save trip');
    }
  },

  // Get trip progress
  getTripProgress: async (tripId) => {
    try {
      const response = await apiClient.get(`/trips/${tripId}/progress`);
      return response.data;
    } catch (error) {
      console.error('Error fetching trip progress:', error);
      throw new Error('Failed to get trip progress');
    }
  },

  // Update trip progress
  updateTripProgress: async (tripId, completedActivities) => {
    try {
      const response = await apiClient.put(`/trips/${tripId}/progress`, {
        completed_activities: completedActivities
      });
      return response.data;
    } catch (error) {
      console.error('Error updating trip progress:', error);
      // Don't throw error for progress updates to avoid disrupting UX
      return { message: 'Progress saved locally', progressPercentage: 0 };
    }
  },

  // Get shared trip
  getSharedTrip: async (shareToken) => {
    try {
      const response = await apiClient.get(`/trips/shared/${shareToken}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching shared trip:', error);
      throw new Error('Failed to get shared trip');
    }
  },

  // Test API connection
  testConnection: async () => {
    try {
      const response = await apiClient.get('/');
      return response.data;
    } catch (error) {
      console.error('API connection test failed:', error);
      return { message: 'API connection failed' };
    }
  }
};

export default api;