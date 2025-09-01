import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DestinationInputApi from "./components/DestinationInputApi";
import BudgetSelection from "./components/BudgetSelection";
import ItineraryView from "./components/ItineraryView";
import { api } from "./services/api";
import { useToast } from "./hooks/use-toast";
import { Toaster } from "./components/ui/toaster";

function App() {
  const [tripData, setTripData] = useState(null);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [savedTripId, setSavedTripId] = useState(null);
  const [currentView, setCurrentView] = useState('destination'); // destination, budget, itinerary

  const handlePlanTrip = (data) => {
    setTripData(data);
    setCurrentView('budget');
    setSelectedBudget(null);
    setSavedTripId(null);
  };

  const handleSelectBudget = async (budgetType) => {
    try {
      // Save trip to backend when budget is selected
      const tripResponse = await api.saveTrip({
        destination: tripData.destination,
        dateRange: tripData.dateRange,
        travelers: tripData.travelers,
        selectedBudget: budgetType
      });
      
      setSavedTripId(tripResponse.tripId);
      setSelectedBudget(budgetType);
      setCurrentView('itinerary');
      
    } catch (error) {
      console.error('Failed to save trip:', error);
      // Continue anyway with local data
      setSelectedBudget(budgetType);
      setCurrentView('itinerary');
    }
  };

  const handleBackToDestination = () => {
    setCurrentView('destination');
    setTripData(null);
    setSelectedBudget(null);
    setSavedTripId(null);
  };

  const handleBackToBudget = () => {
    setCurrentView('budget');
    setSelectedBudget(null);
    setSavedTripId(null);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'budget':
        return (
          <BudgetSelection
            destination={tripData.destination}
            dateRange={tripData.dateRange}
            travelers={tripData.travelers}
            onSelectBudget={handleSelectBudget}
            onBack={handleBackToDestination}
          />
        );
      
      case 'itinerary':
        return (
          <ItineraryView
            destination={tripData.destination}
            dateRange={tripData.dateRange}
            travelers={tripData.travelers}
            selectedBudget={selectedBudget}
            savedTripId={savedTripId}
            onBack={handleBackToBudget}
          />
        );
      
      default:
        return <DestinationInputApi onPlanTrip={handlePlanTrip} />;
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={renderCurrentView()} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
