import React, { useState, useEffect } from 'react';
import { ArrowRight, MapPin, Clock, DollarSign, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { api } from '../services/api';
import { useToast } from '../hooks/use-toast';

const budgetTypes = {
  backpacker: {
    title: "Backpacker",
    subtitle: "Adventure on a Budget",
    description: "Perfect for budget travelers who want authentic experiences",
    color: "from-amber-600 to-orange-700",
    icon: "🎒"
  },
  travelEnthusiast: {
    title: "Travel Enthusiast", 
    subtitle: "Balanced Experience",
    description: "Great mix of comfort and adventure for memorable trips",
    color: "from-emerald-600 to-green-700",
    icon: "🌍"
  },
  luxury: {
    title: "Luxury",
    subtitle: "Premium Experience",
    description: "Indulge in the finest experiences and accommodations",
    color: "from-amber-700 to-yellow-800",
    icon: "✨"
  }
};

const BudgetSelection = ({ destination, dateRange, travelers, onSelectBudget, onBack }) => {
  const [travelData, setTravelData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  // Load travel plans on mount
  useEffect(() => {
    const loadTravelPlans = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await api.getTravelPlans(destination);
        setTravelData(data.plans);
        
      } catch (error) {
        console.error('Failed to load travel plans:', error);
        setError(error.message);
        toast({
          title: "Loading Error",
          description: "Failed to load travel plans. Please try again.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    if (destination) {
      loadTravelPlans();
    }
  }, [destination, toast]);

  const formatDuration = () => {
    const days = Math.ceil((dateRange.to - dateRange.from) / (1000 * 60 * 60 * 24));
    return `${days} days`;
  };

  const getBudgetData = (budgetType) => {
    if (!travelData) return null;
    return travelData[budgetType];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-amber-600 mx-auto mb-4" />
          <p className="text-amber-800 text-lg">Loading travel plans for {destination}...</p>
        </div>
      </div>
    );
  }

  if (error || !travelData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center p-4">
        <div className="max-w-md mx-auto text-center">
          <Card className="p-6 bg-white/90 backdrop-blur-sm border-0">
            <h2 className="text-2xl font-bold text-amber-900 mb-4">Oops! Something went wrong</h2>
            <p className="text-amber-700 mb-6">{error || 'Failed to load travel plans'}</p>
            <Button onClick={onBack} className="bg-gradient-to-r from-amber-600 to-orange-700 text-white">
              Try Another Destination
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 text-amber-700 hover:text-amber-900 hover:bg-amber-100"
          >
            ← Back to Planning
          </Button>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold text-amber-900 mb-4">
              Choose Your Travel Style
            </h1>
            <div className="flex items-center justify-center gap-6 text-amber-800 mb-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span className="font-medium">{destination}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{formatDuration()}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>{travelers} traveler{travelers > 1 ? 's' : ''}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Budget Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {Object.entries(budgetTypes).map(([budgetKey, budgetInfo]) => {
            const budgetData = getBudgetData(budgetKey);
            
            if (!budgetData) return null;
            
            return (
              <Card 
                key={budgetKey}
                className="relative overflow-hidden border-2 border-transparent hover:border-amber-300 transition-all duration-300 transform hover:scale-[1.02] cursor-pointer bg-white/90 backdrop-blur-sm"
                onClick={() => onSelectBudget(budgetKey)}
              >
                <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${budgetInfo.color}`} />
                
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-3xl">{budgetInfo.icon}</div>
                    <Badge variant="secondary" className="bg-amber-100 text-amber-800 border-amber-200">
                      {budgetData?.duration}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl text-amber-900 mb-1">
                    {budgetInfo.title}
                  </CardTitle>
                  <p className="text-lg font-semibold text-amber-700 mb-2">
                    {budgetInfo.subtitle}
                  </p>
                  <p className="text-amber-600 text-sm leading-relaxed">
                    {budgetInfo.description}
                  </p>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Budget Range */}
                  <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-lg">
                    <DollarSign className="h-5 w-5 text-amber-600" />
                    <span className="font-bold text-xl text-amber-900">
                      {budgetData?.total_budget}
                    </span>
                  </div>

                  {/* Accommodation */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-amber-900">Accommodation</h4>
                    <p className="text-sm text-amber-700 leading-relaxed">
                      {budgetData?.accommodation}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-amber-900">Highlights</h4>
                    <div className="space-y-1">
                      {budgetData?.highlights.slice(0, 3).map((highlight, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm text-amber-700">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Select Button */}
                  <Button 
                    className={`w-full mt-6 bg-gradient-to-r ${budgetInfo.color} hover:opacity-90 text-white transition-all duration-300`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectBudget(budgetKey);
                    }}
                  >
                    View Detailed Itinerary
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Info */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-amber-900 mb-2">
              All plans include comprehensive itineraries with timeline checklists
            </h3>
            <p className="text-amber-700">
              Each option comes with detailed daily schedules, accommodation suggestions, 
              transportation tips, and must-see attractions tailored to your chosen style.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BudgetSelection;