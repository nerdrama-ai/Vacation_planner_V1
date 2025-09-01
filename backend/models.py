from pydantic import BaseModel, Field
from typing import List, Optional, Dict
from datetime import datetime
import uuid

class Activity(BaseModel):
    time: str
    task: str
    type: str  # accommodation, transport, sightseeing, dining, activity

class DayItinerary(BaseModel):
    day: int
    title: str
    activities: List[Activity]

class BudgetPlan(BaseModel):
    total_budget: str
    duration: str
    accommodation: str
    transport: str
    highlights: List[str]
    itinerary: List[DayItinerary]

class TravelPlan(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    destination_id: str
    destination_name: str
    backpacker: BudgetPlan
    travel_enthusiast: BudgetPlan
    luxury: BudgetPlan
    created_at: datetime = Field(default_factory=datetime.utcnow)

class TravelPlanCreate(BaseModel):
    destination_id: str
    destination_name: str
    backpacker: BudgetPlan
    travel_enthusiast: BudgetPlan
    luxury: BudgetPlan

class Destination(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    country: str
    popular: bool = False
    image_url: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

class DestinationCreate(BaseModel):
    name: str
    country: str
    popular: bool = False
    image_url: Optional[str] = None

class UserTrip(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    destination: str
    start_date: datetime
    end_date: datetime
    travelers: int
    selected_budget: str
    completed_activities: Dict[str, bool] = Field(default_factory=dict)
    user_email: Optional[str] = None
    share_token: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

class UserTripCreate(BaseModel):
    destination: str
    start_date: datetime
    end_date: datetime
    travelers: int
    selected_budget: str
    user_email: Optional[str] = None

class UserTripUpdate(BaseModel):
    completed_activities: Dict[str, bool]

class TravelPlansResponse(BaseModel):
    destination: str
    plans: Dict[str, BudgetPlan]

class TripProgressResponse(BaseModel):
    trip_id: str
    destination: str
    selected_budget: str
    completed_activities: Dict[str, bool]
    progress_percentage: float