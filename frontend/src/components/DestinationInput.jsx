import React, { useState } from 'react';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar as CalendarComponent } from './ui/calendar';
import { format, addDays } from 'date-fns';
import { cn } from '../lib/utils';

const DestinationInput = ({ onPlanTrip }) => {
  const [destination, setDestination] = useState('');
  const [dateRange, setDateRange] = useState({
    from: new Date(),
    to: addDays(new Date(), 7)
  });
  const [travelers, setTravelers] = useState(2);

  const handleDateSelect = (range) => {
    setDateRange(range);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (destination.trim() && dateRange.from && dateRange.to) {
      onPlanTrip({
        destination: destination.trim(),
        dateRange,
        travelers,
        duration: Math.ceil((dateRange.to - dateRange.from) / (1000 * 60 * 60 * 24))
      });
    }
  };

  const popularDestinations = [
    "Paris, France",
    "Tokyo, Japan", 
    "New York, USA",
    "Bali, Indonesia",
    "London, UK",
    "Barcelona, Spain"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-amber-900 mb-6">
            Plan Your Perfect Journey
          </h1>
          <p className="text-xl text-amber-800 max-w-2xl mx-auto leading-relaxed">
            Discover amazing destinations with personalized itineraries tailored to your budget and travel style
          </p>
        </div>

        {/* Main Planning Card */}
        <Card className="p-8 bg-white/90 backdrop-blur-sm shadow-2xl border-0">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Destination Input */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="h-6 w-6 text-amber-700" />
                <h2 className="text-2xl font-semibold text-amber-900">Where to?</h2>
              </div>
              <Input
                type="text"
                placeholder="Enter your dream destination..."
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="h-14 text-lg border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                required
              />
              
              {/* Popular Destinations */}
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="text-sm text-amber-700 font-medium mr-2">Popular:</span>
                {popularDestinations.map((place) => (
                  <button
                    key={place}
                    type="button"
                    onClick={() => setDestination(place)}
                    className="px-3 py-1 text-sm bg-amber-100 text-amber-800 rounded-full hover:bg-amber-200 transition-colors"
                  >
                    {place}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Date Range Picker */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="h-6 w-6 text-amber-700" />
                  <h3 className="text-xl font-semibold text-amber-900">When?</h3>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full h-14 justify-start text-left font-normal border-amber-200",
                        !dateRange && "text-muted-foreground"
                      )}
                    >
                      <Calendar className="mr-3 h-5 w-5 text-amber-600" />
                      {dateRange?.from ? (
                        dateRange.to ? (
                          <span className="text-amber-900">
                            {format(dateRange.from, "MMM dd")} - {format(dateRange.to, "MMM dd, yyyy")}
                          </span>
                        ) : (
                          format(dateRange.from, "MMM dd, yyyy")
                        )
                      ) : (
                        <span>Pick your travel dates</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange?.from}
                      selected={dateRange}
                      onSelect={handleDateSelect}
                      numberOfMonths={2}
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Travelers Count */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="h-6 w-6 text-amber-700" />
                  <h3 className="text-xl font-semibold text-amber-900">Travelers</h3>
                </div>
                <div className="flex items-center gap-4 h-14">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-12 w-12 border-amber-200"
                    onClick={() => setTravelers(Math.max(1, travelers - 1))}
                  >
                    -
                  </Button>
                  <span className="text-2xl font-semibold text-amber-900 min-w-[3rem] text-center">
                    {travelers}
                  </span>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-12 w-12 border-amber-200"
                    onClick={() => setTravelers(travelers + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <Button
                type="submit"
                className="w-full h-16 text-xl font-semibold bg-gradient-to-r from-amber-600 to-orange-700 hover:from-amber-700 hover:to-orange-800 text-white shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
                disabled={!destination.trim() || !dateRange.from || !dateRange.to}
              >
                <Clock className="mr-3 h-6 w-6" />
                Plan My Adventure
              </Button>
            </div>
          </form>
        </Card>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card className="p-6 bg-white/80 backdrop-blur-sm text-center border-0">
            <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-amber-900 mb-2">Personalized Itineraries</h3>
            <p className="text-amber-700">Tailored plans based on your preferences and budget</p>
          </Card>
          
          <Card className="p-6 bg-white/80 backdrop-blur-sm text-center border-0">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-amber-900 mb-2">Timeline Checklists</h3>
            <p className="text-amber-700">Organized schedules you can track and check off</p>
          </Card>
          
          <Card className="p-6 bg-white/80 backdrop-blur-sm text-center border-0">
            <div className="w-16 h-16 bg-gradient-to-r from-amber-600 to-yellow-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-amber-900 mb-2">Multiple Budgets</h3>
            <p className="text-amber-700">Options for backpackers to luxury travelers</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DestinationInput;