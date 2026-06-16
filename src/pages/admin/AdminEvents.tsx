// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Badge } from "@/components/ui/badge";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { Plus, Edit, Trash2, Calendar, MapPin, Users, Eye } from "lucide-react";
// import Navigation from "@/components/Navigation";
// import Footer from "@/components/Footer";
// import heroBackground from "@/assets/hero-background.jpg";

// const AdminEvents = () => {
//   const navigate = useNavigate();
//   const [events, setEvents] = useState([
//     {
//       id: 1,
//       title: "Community Health Fair",
//       description: "Free health checkups and medical consultations for all community members.",
//       date: "2024-12-15",
//       time: "10:00 AM",
//       location: "Community Center, Main Street",
//       image: "/api/placeholder/400/300",
//       attendees: 45,
//       maxAttendees: 100,
//       status: "upcoming"
//     },
//     {
//       id: 2,
//       title: "Wheelchair Distribution Drive",
//       description: "Distribution of wheelchairs and mobility aids to beneficiaries.",
//       date: "2024-12-20",
//       time: "2:00 PM",
//       location: "GreenWay Trust Office",
//       image: "/api/placeholder/400/300",
//       attendees: 25,
//       maxAttendees: 50,
//       status: "upcoming"
//     }
//   ]);

//   const [isCreateOpen, setIsCreateOpen] = useState(false);
//   const [isEditOpen, setIsEditOpen] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [newEvent, setNewEvent] = useState({
//     title: "",
//     description: "",
//     date: "",
//     time: "",
//     location: "",
//     maxAttendees: 0
//   });

//   const handleLogout = () => {
//     localStorage.removeItem("isAdmin");
//     navigate("/");
//   };

//   const handleCreateEvent = () => {
//     const event = {
//       id: events.length + 1,
//       ...newEvent,
//       attendees: 0,
//       status: "upcoming",
//       image: "/api/placeholder/400/300"
//     };
//     setEvents([...events, event]);
//     setNewEvent({ title: "", description: "", date: "", time: "", location: "", maxAttendees: 0 });
//     setIsCreateOpen(false);
//   };

//   const handleEditEvent = (event) => {
//     setSelectedEvent(event);
//     setNewEvent(event);
//     setIsEditOpen(true);
//   };

//   const handleUpdateEvent = () => {
//     setEvents(events.map(event =>
//       event.id === selectedEvent.id ? { ...event, ...newEvent } : event
//     ));
//     setIsEditOpen(false);
//     setSelectedEvent(null);
//   };

//   const handleDeleteEvent = (id) => {
//     setEvents(events.filter(event => event.id !== id));
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <Navigation isAdmin={true} onLogout={handleLogout} />

//       {/* Hero Section */}
//       <div
//         className="relative h-64 bg-cover bg-center flex items-center justify-center"
//         style={{ backgroundImage: `url(${heroBackground})` }}
//       >
//         <div className="absolute inset-0 bg-black/50"></div>
//         <div className="relative z-10 text-center text-white">
//           <h1 className="text-4xl font-bold mb-4">Events Management</h1>
//           <p className="text-lg opacity-90">Create and manage all events for GreenWay Trust</p>
//         </div>
//       </div>

//       <div className="container py-8">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           {/* Header */}
//           <div className="flex justify-between items-center mb-8">
//             <div>
//               <h2 className="text-2xl font-semibold">All Events</h2>
//               <p className="text-muted-foreground">Create, edit, and manage all events</p>
//             </div>

//               <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
//                 <DialogTrigger asChild>
//                   <Button className="btn-hover">
//                     <Plus className="w-4 h-4 mr-2" />
//                     Create Event
//                   </Button>
//                 </DialogTrigger>
//                 <DialogContent className="max-w-2xl">
//                   <DialogHeader>
//                     <DialogTitle>Create New Event</DialogTitle>
//                   </DialogHeader>
//                   <div className="grid grid-cols-2 gap-4">
//                     <div className="col-span-2">
//                       <Label htmlFor="title">Event Title</Label>
//                       <Input
//                         id="title"
//                         value={newEvent.title}
//                         onChange={(e) => setNewEvent(prev => ({...prev, title: e.target.value}))}
//                         placeholder="Enter event title"
//                       />
//                     </div>
//                     <div className="col-span-2">
//                       <Label htmlFor="description">Description</Label>
//                       <Textarea
//                         id="description"
//                         value={newEvent.description}
//                         onChange={(e) => setNewEvent(prev => ({...prev, description: e.target.value}))}
//                         placeholder="Enter event description"
//                       />
//                     </div>
//                     <div>
//                       <Label htmlFor="date">Date</Label>
//                       <Input
//                         id="date"
//                         type="date"
//                         value={newEvent.date}
//                         onChange={(e) => setNewEvent(prev => ({...prev, date: e.target.value}))}
//                       />
//                     </div>
//                     <div>
//                       <Label htmlFor="time">Time</Label>
//                       <Input
//                         id="time"
//                         type="time"
//                         value={newEvent.time}
//                         onChange={(e) => setNewEvent(prev => ({...prev, time: e.target.value}))}
//                       />
//                     </div>
//                     <div className="col-span-2">
//                       <Label htmlFor="location">Location</Label>
//                       <Input
//                         id="location"
//                         value={newEvent.location}
//                         onChange={(e) => setNewEvent(prev => ({...prev, location: e.target.value}))}
//                         placeholder="Enter event location"
//                       />
//                     </div>
//                     <div>
//                       <Label htmlFor="maxAttendees">Max Attendees</Label>
//                       <Input
//                         id="maxAttendees"
//                         type="number"
//                         value={newEvent.maxAttendees}
//                         onChange={(e) => setNewEvent(prev => ({...prev, maxAttendees: parseInt(e.target.value)}))}
//                         placeholder="Maximum number of attendees"
//                       />
//                     </div>
//                     <div className="col-span-2">
//                       <Label htmlFor="image">Event Image</Label>
//                       <Input
//                         id="image"
//                         type="file"
//                         accept="image/*"
//                         placeholder="Upload event image"
//                       />
//                     </div>
//                   </div>
//                   <div className="flex justify-end space-x-2 mt-4">
//                     <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
//                       Cancel
//                     </Button>
//                     <Button onClick={handleCreateEvent}>
//                       Create Event
//                     </Button>
//                   </div>
//                 </DialogContent>
//               </Dialog>
//             </div>

//             {/* Events Grid */}
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {events.map((event) => (
//                 <motion.div
//                   key={event.id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.6 }}
//                 >
//                   <Card className="overflow-hidden">
//                     <div className="relative h-48">
//                       <img
//                         src={event.image}
//                         alt={event.title}
//                         className="w-full h-full object-cover"
//                       />
//                       <Badge className="absolute top-2 right-2">
//                         {event.status}
//                       </Badge>
//                     </div>

//                     <CardHeader>
//                       <CardTitle className="text-xl line-clamp-2">{event.title}</CardTitle>
//                       <p className="text-sm text-muted-foreground line-clamp-3">
//                         {event.description}
//                       </p>
//                     </CardHeader>

//                     <CardContent>
//                       <div className="space-y-2 mb-4">
//                         <div className="flex items-center text-sm text-muted-foreground">
//                           <Calendar className="w-4 h-4 mr-2" />
//                           {event.date} at {event.time}
//                         </div>
//                         <div className="flex items-center text-sm text-muted-foreground">
//                           <MapPin className="w-4 h-4 mr-2" />
//                           {event.location}
//                         </div>
//                         <div className="flex items-center text-sm text-muted-foreground">
//                           <Users className="w-4 h-4 mr-2" />
//                           {event.attendees}/{event.maxAttendees} registered
//                         </div>
//                       </div>

//                       <div className="flex space-x-2">
//                         <Button variant="outline" size="sm" className="flex-1">
//                           <Eye className="w-4 h-4 mr-1" />
//                           View
//                         </Button>
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={() => handleEditEvent(event)}
//                         >
//                           <Edit className="w-4 h-4" />
//                         </Button>
//                         <Button
//                           variant="destructive"
//                           size="sm"
//                           onClick={() => handleDeleteEvent(event.id)}
//                         >
//                           <Trash2 className="w-4 h-4" />
//                         </Button>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               ))}
//             </div>

//             {/* Edit Event Dialog */}
// <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
//   <DialogContent className="max-w-2xl">
//     <DialogHeader>
//       <DialogTitle>Edit Event</DialogTitle>
//     </DialogHeader>
//     <div className="grid grid-cols-2 gap-4">
//       <div className="col-span-2">
//         <Label htmlFor="edit-title">Event Title</Label>
//         <Input
//           id="edit-title"
//           value={newEvent.title}
//           onChange={(e) => setNewEvent(prev => ({...prev, title: e.target.value}))}
//         />
//       </div>
//       <div className="col-span-2">
//         <Label htmlFor="edit-description">Description</Label>
//         <Textarea
//           id="edit-description"
//           value={newEvent.description}
//           onChange={(e) => setNewEvent(prev => ({...prev, description: e.target.value}))}
//         />
//       </div>
//       <div>
//         <Label htmlFor="edit-date">Date</Label>
//         <Input
//           id="edit-date"
//           type="date"
//           value={newEvent.date}
//           onChange={(e) => setNewEvent(prev => ({...prev, date: e.target.value}))}
//         />
//       </div>
//       <div>
//         <Label htmlFor="edit-time">Time</Label>
//         <Input
//           id="edit-time"
//           type="time"
//           value={newEvent.time}
//           onChange={(e) => setNewEvent(prev => ({...prev, time: e.target.value}))}
//         />
//       </div>
//         <div className="col-span-2">
//           <Label htmlFor="edit-location">Location</Label>
//           <Input
//             id="edit-location"
//             value={newEvent.location}
//             onChange={(e) => setNewEvent(prev => ({...prev, location: e.target.value}))}
//           />
//         </div>
//         <div>
//           <Label htmlFor="edit-maxAttendees">Max Attendees</Label>
//           <Input
//             id="edit-maxAttendees"
//             type="number"
//             value={newEvent.maxAttendees}
//             onChange={(e) => setNewEvent(prev => ({...prev, maxAttendees: parseInt(e.target.value)}))}
//           />
//         </div>
//         <div>
//           <Label htmlFor="edit-image">Event Image</Label>
//           <Input
//             id="edit-image"
//             type="file"
//             accept="image/*"
//             placeholder="Upload new image"
//           />
//         </div>
//     </div>
//     <div className="flex justify-end space-x-2 mt-4">
//       <Button variant="outline" onClick={() => setIsEditOpen(false)}>
//         Cancel
//       </Button>
//       <Button onClick={handleUpdateEvent}>
//         Update Event
//       </Button>
//     </div>
//   </DialogContent>
// </Dialog>
//           </motion.div>
//         </div>

//       <Footer />
//     </div>
//   );
// };

// export default AdminEvents;

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Edit, Trash2, Calendar, Clock, MapPin, Users, Eye } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import heroBackground from "@/assets/hero-background.jpg";

const API_BASE = import.meta.env.VITE_API_BASE;

const AdminEvents = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    maxAttendees: 0,
    category: "",
  });
  const [image, setImage] = useState(null);

  // 🔹 Fetch events from backend
  useEffect(() => {
    axios
      .get(`${API_BASE}/events/get`)
      .then((res) => setEvents(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/");
  };

  // 🔹 Create Event
  // const handleCreateEvent = async () => {
  //   try {
  //     const formData = new FormData();
  //     Object.keys(newEvent).forEach((key) =>
  //       formData.append(key, newEvent[key])
  //     );
  //     if (image) formData.append("image", image);

  //     const res = await axios.post(
  //       `${API_BASE}/events/create`,
  //       formData,
  //       {
  //         headers: { "Content-Type": "multipart/form-data" },
  //       }
  //     );

  //     setEvents([res.data, ...events]);
  //     toast.success("Event created!");
  //     setNewEvent({
  //       title: "",
  //       description: "",
  //       date: "",
  //       time: "",
  //       location: "",
  //       maxAttendees: 0,
  //       category: "",
  //     });
  //     setImage(null);
  //     setIsCreateOpen(false);
  //   } catch (err) {
  //     toast.error("Error creating event");
  //     console.error(err);
  //   }
  // };

  const handleCreateEvent = async () => {
  try {
    const formData = new FormData();
    Object.keys(newEvent).forEach((key) =>
      formData.append(key, newEvent[key])
    );
    if (image) formData.append("image", image);

    const token = localStorage.getItem("token");

    const res = await axios.post(
      `${API_BASE}/events/create`,
      formData,
      {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    setEvents([res.data, ...events]);
    toast.success("Event created!");
    setNewEvent({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      maxAttendees: 0,
      category: "",
    });
    setImage(null);
    setIsCreateOpen(false);
  } catch (err) {
    toast.error("Error creating event");
    console.error(err);
  }
};


  // 🔹 Edit Event (open modal)
  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    const formattedTime = event.time ? event.time.slice(0, 5) : "";
    setNewEvent({
      title: event.title || "",
      description: event.description || "",
      date: event.date || "",
      time: formattedTime,
      location: event.location || "",
      maxAttendees: event.maxAttendees || 0,
      category: event.category || "",
    });
    setImage(null);
    setIsEditOpen(true);
  };

  // 🔹 Update Event
  // const handleUpdateEvent = async () => {
  //   try {
  //     const formData = new FormData();
  //     Object.keys(newEvent).forEach((key) => {
  //       if (newEvent[key] !== undefined && newEvent[key] !== null) {
  //         formData.append(key, newEvent[key]);
  //       }
  //     });
  //     if (image) formData.append("image", image);

  //     const res = await axios.put(
  //       `${API_BASE}/events/${selectedEvent._id}`,
  //       formData,
  //       {
  //         headers: { "Content-Type": "multipart/form-data" },
  //       }
  //     );

  //     setEvents(
  //       events.map((ev) => (ev._id === selectedEvent._id ? res.data : ev))
  //     );
  //     toast.success("Event updated!");
  //     setIsEditOpen(false);
  //     setSelectedEvent(null);
  //     setImage(null);
  //   } catch (err) {
  //     toast.error("Error updating event");
  //     console.error(err);
  //   }
  // };

  const handleUpdateEvent = async () => {
  try {
    const formData = new FormData();
    Object.keys(newEvent).forEach((key) => {
      if (newEvent[key] !== undefined && newEvent[key] !== null) {
        formData.append(key, newEvent[key]);
      }
    });
    if (image) formData.append("image", image);

    const token = localStorage.getItem("token");

    const res = await axios.put(
      `${API_BASE}/events/${selectedEvent._id}`,
      formData,
      {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    setEvents(events.map((ev) =>
      ev._id === selectedEvent._id ? res.data : ev
    ));
    toast.success("Event updated!");
    setIsEditOpen(false);
    setSelectedEvent(null);
    setImage(null);
  } catch (err) {
    toast.error("Error updating event");
    console.error(err);
  }
};


  // 🔹 Delete Event
  // const handleDeleteEvent = async (id) => {
  //   try {
  //     await axios.delete(`${API_BASE}/events/${id}`);
  //     setEvents(events.filter((ev) => ev._id !== id));
  //     toast.success("Event deleted!");
  //   } catch (err) {
  //     toast.error("Error deleting event");
  //     console.error(err);
  //   }
  // };

  const handleDeleteEvent = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await axios.delete(
      `${API_BASE}/events/${id}`,
      {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      }
    );

    setEvents(events.filter((ev) => ev._id !== id));
    toast.success("Event deleted!");
  } catch (err) {
    toast.error("Error deleting event");
    console.error(err);
  }
};


  // 🔹 View Event
  const handleViewEvent = (event) => {
    setSelectedEvent(event);
    setIsViewOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation isAdmin={true} onLogout={handleLogout} />

      {/* Hero Section */}
      <div
        className="hero-section flex items-center justify-center relative"
        style={{ backgroundImage: `url(${heroBackground})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold mb-4">Events Management</h1>
            <p className="text-lg opacity-90">
              Create and manage all events for GreenWay Trust
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-semibold">All Events</h2>
              <p className="text-muted-foreground">
                Create, edit, and manage all events
              </p>
            </div>

            {/* Create Event Dialog */}
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button className="btn-hover">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Event
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Event</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="Title"
                    value={newEvent.title}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, title: e.target.value })
                    }
                    className="col-span-2"
                  />
                  <Textarea
                    placeholder="Description"
                    value={newEvent.description}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, description: e.target.value })
                    }
                    className="col-span-2"
                  />
                  <Input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, date: e.target.value })
                    }
                  />
                  <Input
                    type="time"
                    value={newEvent.time}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, time: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Location"
                    value={newEvent.location}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, location: e.target.value })
                    }
                    className="col-span-2"
                  />
                  <Input
                    type="number"
                    placeholder="Max Attendees"
                    value={newEvent.maxAttendees}
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        maxAttendees: Number(e.target.value),
                      })
                    }
                  />
                  <Input
                    type="text"
                    placeholder="Category"
                    value={newEvent.category}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, category: e.target.value })
                    }
                  />
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="col-span-2"
                  />
                </div>
                <div className="flex justify-end mt-4 space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setNewEvent({
                        title: "",
                        description: "",
                        date: "",
                        time: "",
                        location: "",
                        maxAttendees: 0,
                        category: "",
                      });
                      setImage(null);
                      setIsCreateOpen(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleCreateEvent}>Create Event</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Events Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <Card key={event._id} className="overflow-hidden">
                <div className="relative h-48">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-2 right-2">
                    {event.status}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {event.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Users className="w-4 h-4 text-primary" />
                      <span>
                        {event.attendees}/{event.maxAttendees} registered
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewEvent(event)}
                    >
                      <Eye className="w-4 h-4" /> View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditEvent(event)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteEvent(event._id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Edit Event Dialog */}
          <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
            <DialogContent className="max-w-2xl max-h-[70vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit Event</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-3 p-4">
                <div className="col-span-2">
                  <Label htmlFor="edit-title">Event Title</Label>
                  <Input
                    id="edit-title"
                    value={newEvent.title}
                    onChange={(e) =>
                      setNewEvent((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea
                    id="edit-description"
                    value={newEvent.description}
                    onChange={(e) =>
                      setNewEvent((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    className="h-20"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-date">Date</Label>
                  <Input
                    id="edit-date"
                    type="date"
                    value={newEvent.date}
                    onChange={(e) =>
                      setNewEvent((prev) => ({ ...prev, date: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="edit-time">Time</Label>
                  <Input
                    id="edit-time"
                    type="time"
                    value={newEvent.time}
                    onChange={(e) =>
                      setNewEvent((prev) => ({ ...prev, time: e.target.value }))
                    }
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="edit-location">Location</Label>
                  <Input
                    id="edit-location"
                    value={newEvent.location}
                    onChange={(e) =>
                      setNewEvent((prev) => ({
                        ...prev,
                        location: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="edit-maxAttendees">Max Attendees</Label>
                  <Input
                    id="edit-maxAttendees"
                    type="number"
                    value={newEvent.maxAttendees}
                    onChange={(e) =>
                      setNewEvent((prev) => ({
                        ...prev,
                        maxAttendees: parseInt(e.target.value),
                      }))
                    }
                  /> 
                </div>
                <div>
                  <Label htmlFor="edit-category">Category</Label>
                  <Input
                    id="edit-category"
                    type="text"
                    value={newEvent.category}
                    onChange={(e) =>
                      setNewEvent((prev) => ({
                        ...prev,
                        category: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="edit-image">Event Image</Label>
                  {selectedEvent?.image && !image && (
                    <div className="mb-2">
                      <img
                        src={selectedEvent.image}
                        alt="Current event"
                        className="w-24 h-24 object-cover"
                      />
                      <p className="text-sm text-muted-foreground">
                        Current image
                      </p>
                    </div>
                  )}
                  <Input
                    id="edit-image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>
              </div>
              <div className="flex justify-end mt-4 p-4 space-x-2">
                <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUpdateEvent}>Update Event</Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* View Event Dialog */}
          <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
            <DialogContent className="max-w-2xl max-h-[70vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{selectedEvent?.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <img
                  src={selectedEvent?.image}
                  alt={selectedEvent?.title}
                  className="w-full h-48 object-cover rounded"
                />
                <p>
                  <strong>Description:</strong> {selectedEvent?.description}
                </p>
                <p>
                  <strong>Date:</strong> {selectedEvent?.date}
                </p>
                <p>
                  <strong>Time:</strong> {selectedEvent?.time}
                </p>
                <p>
                  <strong>Location:</strong> {selectedEvent?.location}
                </p>
                <p>
                  <strong>Max Attendees:</strong> {selectedEvent?.maxAttendees}
                </p>
                <p>
                  <strong>Category:</strong> {selectedEvent?.category}
                </p>
                <p>
                  <strong>Attendees:</strong>{" "}
                  {selectedEvent?.attendees}/{selectedEvent?.maxAttendees}{" "}
                  registered
                </p>
                <p>
                  <strong>Status:</strong> {selectedEvent?.status}
                </p>
              </div>
              <div className="flex justify-end mt-4">
                <Button variant="outline" onClick={() => setIsViewOpen(false)}>
                  Close
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminEvents;