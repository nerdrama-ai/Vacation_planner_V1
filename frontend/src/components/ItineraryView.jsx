import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Circle, 
  Bed, 
  Car, 
  Camera, 
  Utensils,
  Calendar,
  DollarSign,
  Download,
  Share2,
  Loader2
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { api } from '../services/api';
import { useToast } from '../hooks/use-toast';
import { useLocalStorage } from '../hooks/useLocalStorage';

const budgetTypes = {
  backpacker: {
    title: "Backpacker",
    subtitle: "Adventure on a Budget",
    color: "from-amber-600 to-orange-700",
    icon: "🎒"
  },
  travelEnthusiast: {
    title: "Travel Enthusiast", 
    subtitle: "Balanced Experience",
    color: "from-emerald-600 to-green-700",
    icon: "🌍"
  },
  luxury: {
    title: "Luxury",
    subtitle: "Premium Experience",
    color: "from-amber-700 to-yellow-800",
    icon: "✨"
  }
};

const ItineraryView = ({ 
  destination, 
  dateRange, 
  travelers, 
  selectedBudget, 
  savedTripId,
  onBack 
}) => {
  const [travelData, setTravelData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkedItems, setCheckedItems] = useLocalStorage(`trip-progress-${savedTripId || 'local'}`, {});
  const [savingProgress, setSavingProgress] = useState(false);
  const { toast } = useToast();
  
  const budgetInfo = budgetTypes[selectedBudget];

  // Load travel data on mount
  useEffect(() => {
    const loadTravelData = async () => {
      try {
        setLoading(true);
        
        const data = await api.getTravelPlans(destination);
        const planData = data.plans[selectedBudget];
        setTravelData(planData);
        
        // If we have a saved trip ID, try to load progress from backend
        if (savedTripId) {
          try {
            const progressData = await api.getTripProgress(savedTripId);
            setCheckedItems(progressData.completed_activities || {});
          } catch (error) {
            console.log('Could not load progress from backend, using local storage');
          }
        }
        
      } catch (error) {
        console.error('Failed to load travel data:', error);
        toast({
          title: "Loading Error",
          description: "Failed to load itinerary. Please try again.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    if (destination && selectedBudget) {
      loadTravelData();
    }
  }, [destination, selectedBudget, savedTripId, toast]);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const toggleCheck = async (dayIndex, activityIndex) => {
    const key = `${dayIndex}-${activityIndex}`;
    const newCheckedItems = {
      ...checkedItems,
      [key]: !checkedItems[key]
    };
    
    setCheckedItems(newCheckedItems);
    
    // Save progress to backend if we have a trip ID
    if (savedTripId && !savingProgress) {
      setSavingProgress(true);
      try {
        await api.updateTripProgress(savedTripId, newCheckedItems);
      } catch (error) {
        console.log('Failed to save progress to backend, using local storage');
      } finally {
        setSavingProgress(false);
      }
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'accommodation': return <Bed className="h-4 w-4" />;
      case 'transport': return <Car className="h-4 w-4" />;
      case 'sightseeing': return <Camera className="h-4 w-4" />;
      case 'dining': return <Utensils className="h-4 w-4" />;
      case 'activity': return <MapPin className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'accommodation': return 'text-blue-600 bg-blue-50';
      case 'transport': return 'text-green-600 bg-green-50';
      case 'sightseeing': return 'text-purple-600 bg-purple-50';
      case 'dining': return 'text-orange-600 bg-orange-50';
      case 'activity': return 'text-amber-600 bg-amber-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getCompletionStats = () => {
    if (!travelData?.itinerary) return { total: 0, completed: 0, percentage: 0 };
    
    const totalActivities = travelData.itinerary.reduce((sum, day) => sum + day.activities.length, 0);
    const completedActivities = Object.values(checkedItems).filter(Boolean).length;
    const percentage = totalActivities > 0 ? Math.round((completedActivities / totalActivities) * 100) : 0;
    
    return { total: totalActivities, completed: completedActivities, percentage };
  };

  const handleShare = () => {
    if (savedTripId) {
      const shareUrl = `${window.location.origin}/trips/${savedTripId}`;
      navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Link Copied!",
        description: "Trip sharing link copied to clipboard."
      });
    } else {
      toast({
        title: "Save Trip First",
        description: "Please save your trip to generate a sharing link.",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-amber-600 mx-auto mb-4" />
          <p className="text-amber-800 text-lg">Loading your personalized itinerary...</p>
        </div>
      </div>
    );
  }

  if (!travelData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center p-4">
        <div className="max-w-md mx-auto text-center">
          <Card className="p-6 bg-white/90 backdrop-blur-sm border-0">
            <h2 className="text-2xl font-bold text-amber-900 mb-4">Oops! Something went wrong</h2>
            <p className="text-amber-700 mb-6">Failed to load itinerary data</p>
            <Button onClick={onBack} className="bg-gradient-to-r from-amber-600 to-orange-700 text-white">
              Go Back
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  const stats = getCompletionStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 text-amber-700 hover:text-amber-900 hover:bg-amber-100"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Budget Selection
          </Button>

          <div className="grid lg:grid-cols-3 gap-6 mb-6">
            {/* Trip Info */}
            <Card className="bg-white/90 backdrop-blur-sm border-0 col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl text-amber-900">
                  <div className="text-3xl">{budgetInfo.icon}</div>
                  {destination} - {budgetInfo.title} Trip
                </CardTitle>
                <div className="flex flex-wrap gap-4 text-amber-700">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(dateRange.from)} - {formatDate(dateRange.to)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    <span className="font-semibold">{travelData.total_budget}</span>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Progress Card */}
            <Card className="bg-white/90 backdrop-blur-sm border-0">
              <CardHeader>
                <CardTitle className="text-lg text-amber-900">
                  Trip Progress
                  {savingProgress && <Loader2 className="inline h-4 w-4 animate-spin ml-2" />}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-900 mb-2">
                    {stats.percentage}%
                  </div>
                  <div className="text-sm text-amber-700 mb-3">
                    {stats.completed} of {stats.total} activities completed
                  </div>
                  <div className="w-full bg-amber-100 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-amber-500 to-orange-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${stats.percentage}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-6">
            <Button variant="outline" className="border-amber-200 text-amber-700 hover:bg-amber-50">
              <Download className="mr-2 h-4 w-4" />
              Export Itinerary
            </Button>
            <Button 
              variant="outline" 
              className="border-amber-200 text-amber-700 hover:bg-amber-50"
              onClick={handleShare}
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share Trip
            </Button>
          </div>
        </div>

        {/* Itinerary Days */}
        <div className="space-y-8">
          {travelData.itinerary.map((day, dayIndex) => (
            <Card key={dayIndex} className="bg-white/90 backdrop-blur-sm border-0 overflow-hidden">
              <CardHeader className={`bg-gradient-to-r ${budgetInfo.color} text-white`}>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">
                    {day.day}
                  </div>
                  Day {day.day}: {day.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="p-6">
                <div className="space-y-4">
                  {day.activities.map((activity, activityIndex) => {
                    const key = `${dayIndex}-${activityIndex}`;
                    const isChecked = checkedItems[key] || false;

                    return (
                      <div 
                        key={activityIndex}
                        className={`flex items-start gap-4 p-4 rounded-lg border transition-all duration-200 ${
                          isChecked 
                            ? 'bg-green-50 border-green-200 opacity-75' 
                            : 'bg-white border-gray-200 hover:border-amber-200'
                        }`}
                      >
                        <Checkbox
                          checked={isChecked}
                          onCheckedChange={() => toggleCheck(dayIndex, activityIndex)}
                          className="mt-1"
                        />

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge variant="outline" className="text-amber-700 border-amber-200">
                              {activity.time}
                            </Badge>
                            <Badge 
                              variant="secondary" 
                              className={`${getActivityColor(activity.type)} border-0`}
                            >
                              {getActivityIcon(activity.type)}
                              <span className="ml-1 capitalize">{activity.type}</span>
                            </Badge>
                          </div>
                          <p className={`text-gray-900 ${isChecked ? 'line-through' : ''}`}>
                            {activity.task}
                          </p>
                        </div>

                        <div className="flex-shrink-0">
                          {isChecked ? (
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                          ) : (
                            <Circle className="h-5 w-5 text-gray-400" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trip Summary */}
        <Card className="mt-8 bg-white/90 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle className="text-xl text-amber-900">Trip Summary</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-amber-900 mb-3">Accommodation</h4>
              <p className="text-amber-700 mb-4">{travelData.accommodation}</p>
              
              <h4 className="font-semibold text-amber-900 mb-3">Transportation</h4>
              <p className="text-amber-700">{travelData.transport}</p>
            </div>
            <div>
              <h4 className="font-semibold text-amber-900 mb-3">Trip Highlights</h4>
              <div className="space-y-2">
                {travelData.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span className="text-amber-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ItineraryView;