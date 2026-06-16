import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Clock,
  MapPin,
  Users,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import heroBackground from "@/assets/Photos/Main10.jpg";

const API_BASE = import.meta.env.VITE_API_BASE;

const AdminPrograms = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [corePrograms, setCorePrograms] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const [isEditEventOpen, setIsEditEventOpen] = useState(false);
  const [isViewEventOpen, setIsViewEventOpen] = useState(false);
  const [isCreateCoreProgramOpen, setIsCreateCoreProgramOpen] = useState(false);
  const [isEditCoreProgramOpen, setIsEditCoreProgramOpen] = useState(false);
  const [isViewCoreProgramOpen, setIsViewCoreProgramOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedCoreProgram, setSelectedCoreProgram] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    maxAttendees: 0,
    category: "",
    status: "upcoming",
  });
  const [newCoreProgram, setNewCoreProgram] = useState({
    title: "",
    description: "",
    category: "",
  });
  const [eventImage, setEventImage] = useState(null);
  const [coreProgramImage, setCoreProgramImage] = useState(null);
  const [coreProgramPreview, setCoreProgramPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const categories = [
    "All",
    "Inclusive Sports Academy",
    "Livelihood & Skills Training",
    "Assistive Devices & Rehabilitation",
    "Environmental Safeguard Projects",
    "Community Advocacy",
  ];

  const programTypes = {
    "Inclusive Sports Academy": [
      "Wheelchair table tennis",
      "Sitting volleyball",
      "Wheelchair cricket",
      "Para-badminton",
      "Blind cricket",
      "Wheelchair basketball",
    ],
    "Livelihood & Skills Training": [
      "Embroidery",
      "Mehandi",
      "Tailoring",
      "Mobile servicing",
      "Eco-product making",
    ],
    "Assistive Devices & Rehabilitation": [
      "Wheelchairs",
      "Crutches",
      "Hearing aids",
      "Prosthetics",
      "Treatment",
      "Health Checkups",
      "Other supports",
    ],
    "Environmental Safeguard Projects": [
      "Tree plantation drives",
      "Plastic-free campaigns",
      "Waste segregation awareness",
      "Accessible green spaces",
    ],
    "Community Advocacy": [
      "Accessibility audits",
      "Workshops on disability rights",
      "Environmental laws",
      "Celebrating Traditions Together",
    ],
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${API_BASE}/events/get`);
        setEvents(
          response.data.map((event) => ({
            ...event,
            image:
              event.image ||
              `https://res.cloudinary.com/<your_cloud_name>/image/upload/vxxxx/${event.title
                .toLowerCase()
                .replace(/ /g, "-")}.jpg`,
          }))
        );
      } catch (err) {
        toast.error("Failed to fetch events");
        console.error(err);
      }
    };

    const fetchCorePrograms = async () => {
      try {
        const categoryParam =
          selectedCategory === "All" ? "" : selectedCategory;
        const response = await axios.get(
          `${API_BASE}/core-programs?category=${encodeURIComponent(
            categoryParam
          )}`
        );
        setCorePrograms(response.data);
        console.log("Fetched core programs:", response.data);
        console.log("Selected category:", selectedCategory);
      } catch (err) {
        toast.error("Failed to fetch core programs");
        console.error("Error fetching core programs:", err);
      }
    };

    fetchEvents();
    fetchCorePrograms();
  }, [selectedCategory]);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/");
  };

  const handleCoreProgramImageChange = (e) => {
    const file = e.target.files[0];
    setCoreProgramImage(file);
    setCoreProgramPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleEventImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEventImage(file);
    }
  };
  const handleCreateEvent = async () => {
    try {
      if (!eventImage) {
        toast.error("Please select an image");
        return;
      }

      const formData = new FormData();
      Object.keys(newEvent).forEach((key) => {
        if (newEvent[key] !== undefined && newEvent[key] !== null) {
          formData.append(key, newEvent[key]);
        }
      });
      formData.append("image", eventImage);

      const token = localStorage.getItem("token");

      const res = await axios.post(`${API_BASE}/events/create`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

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
        status: "upcoming",
      });
      setEventImage(null);
      setIsCreateEventOpen(false);
    } catch (err) {
      toast.error("Error creating event");
      console.error(err);
    }
  };

  const handleCreateCoreProgram = async () => {
    try {
      if (!coreProgramImage) {
        toast.error("Please select an image");
        return;
      }

      const formData = new FormData();
      // Explicitly append fields
      formData.append("title", newCoreProgram.title || "");
      formData.append("description", newCoreProgram.description || "");
      formData.append("category", newCoreProgram.category || "");
      formData.append("image", coreProgramImage);

      // Log FormData contents
      console.log("FormData contents:");
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value instanceof File ? value.name : value);
      }

      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("No authentication token found");
        return;
      }

      const res = await axios.post(`${API_BASE}/core-programs`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setCorePrograms([res.data, ...corePrograms]);
      toast.success("Core Program created!");
      setNewCoreProgram({
        title: "",
        description: "",
        category: "",
      });
      setCoreProgramImage(null);
      setCoreProgramPreview(null);
      setIsCreateCoreProgramOpen(false);
    } catch (err) {
      console.error("Error details:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      });
      toast.error(
        `Error creating core program: ${err.response?.data?.message || err.message
        }`
      );
    }
  };

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
      status: event.status || "upcoming",
    });
    setEventImage(null);
    setIsEditEventOpen(true);
  };

  const handleEditCoreProgram = (coreProgram) => {
    setSelectedCoreProgram(coreProgram);
    setNewCoreProgram({
      title: coreProgram.title || "",
      description: coreProgram.description || "",
      category: coreProgram.category || coreProgram.title,
    });
    setCoreProgramPreview(coreProgram.image);
    setCoreProgramImage(null);
    setIsEditCoreProgramOpen(true);
  };

  const handleUpdateEvent = async () => {
    setLoading(true);
    console.time("UpdateEventFrontend");
    try {
      const formData = new FormData();
      Object.keys(newEvent).forEach((key) => {
        if (newEvent[key] !== undefined && newEvent[key] !== null) {
          formData.append(key, newEvent[key]);
        }
      });
      if (eventImage) {
        formData.append("image", eventImage); // Ensure key is "image"
        console.log("Uploading image, size:", eventImage.size / 1024, "KB");
      }

      const token = localStorage.getItem("token");

      console.time("APICall");
      const res = await axios.put(
        `${API_BASE}/events/${selectedEvent._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          timeout: 10000,
        }
      );
      console.timeEnd("APICall");

      setEvents((prevEvents) =>
        prevEvents.map((ev) => (ev._id === selectedEvent._id ? res.data : ev))
      );
      toast.success("Event updated!");
      setIsEditEventOpen(false);
      setSelectedEvent(null);
      setEventImage(null);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Unknown error";
      toast.error(`Error updating event: ${errorMessage}`);
      console.error("Error details:", {
        error: err.response?.data,
        message: err.message,
      });
    } finally {
      setLoading(false);
    }
    console.timeEnd("UpdateEventFrontend");
  };

  const handleUpdateCoreProgram = async () => {
    try {
      const formData = new FormData();
      Object.keys(newCoreProgram).forEach((key) => {
        if (newCoreProgram[key] !== undefined && newCoreProgram[key] !== null) {
          formData.append(key, newCoreProgram[key]);
        }
      });
      if (coreProgramImage) formData.append("image", coreProgramImage);

      const token = localStorage.getItem("token");

      const res = await axios.put(
        `${API_BASE}/core-programs/${selectedCoreProgram._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setCorePrograms(
        corePrograms.map((cp) =>
          cp._id === selectedCoreProgram._id ? res.data : cp
        )
      );
      toast.success("Core Program updated!");
      setIsEditCoreProgramOpen(false);
      setSelectedCoreProgram(null);
      setCoreProgramImage(null);
      setCoreProgramPreview(null);
    } catch (err) {
      toast.error("Error updating core program");
      console.error(err);
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${API_BASE}/events/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEvents(events.filter((ev) => ev._id !== id));
      toast.success("Event deleted!");
    } catch (err) {
      toast.error("Error deleting event");
      console.error(err);
    }
  };

  const handleDeleteCoreProgram = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${API_BASE}/core-programs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCorePrograms(corePrograms.filter((cp) => cp._id !== id));
      toast.success("Core Program deleted!");
    } catch (err) {
      toast.error("Error deleting core program");
      console.error(err);
    }
  };

  const handleViewEvent = (event) => {
    setSelectedEvent(event);
    setIsViewEventOpen(true);
  };

  const handleViewCoreProgram = (coreProgram) => {
    setSelectedCoreProgram(coreProgram);
    setIsViewCoreProgramOpen(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "upcoming":
        return "bg-accent text-accent-foreground";
      case "ongoing":
        return "bg-primary text-primary-foreground";
      case "completed":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation isAdmin={true} onLogout={handleLogout} />

      {/* Hero Section */}
      <div
        className="hero-section flex items-center justify-center relative"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-primary/60"></div>
        <div className="relative z-10 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold mb-4">Programs Management</h1>
            <p className="text-xl opacity-90">
              Create and manage all programs for GreenWay Trust
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
          {/* Core Programs Section */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-semibold">Core Programs</h2>
                <p className="text-muted-foreground">
                  Manage long-term initiatives
                </p>
              </div>
              <Dialog
                open={isCreateCoreProgramOpen}
                onOpenChange={setIsCreateCoreProgramOpen}
              >
                <DialogTrigger asChild>
                  <Button className="btn-hover">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Core Program
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Create New Core Program</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="core-program-image">Image File</Label>
                      <Input
                        id="core-program-image"
                        type="file"
                        accept="image/*"
                        onChange={handleCoreProgramImageChange}
                      />
                      {coreProgramPreview && (
                        <img
                          src={coreProgramPreview}
                          alt="Preview"
                          className="mt-2 w-full h-32 object-cover rounded"
                        />
                      )}
                    </div>
                    <div>
                      <Label htmlFor="core-program-title">Title</Label>
                      <select
                        id="core-program-title"
                        value={newCoreProgram.title}
                        onChange={(e) =>
                          setNewCoreProgram({
                            ...newCoreProgram,
                            title: e.target.value,
                            category: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="">Select Title</option>
                        {categories.slice(1).map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="core-program-description">
                        Description
                      </Label>
                      <Textarea
                        id="core-program-description"
                        value={newCoreProgram.description}
                        onChange={(e) =>
                          setNewCoreProgram({
                            ...newCoreProgram,
                            description: e.target.value,
                          })
                        }
                        placeholder="Enter program description"
                      />
                      {newCoreProgram.title && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {programTypes[newCoreProgram.title]?.map((type) => (
                            <Button
                              key={type}
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                setNewCoreProgram({
                                  ...newCoreProgram,
                                  description:
                                    newCoreProgram.description +
                                    (newCoreProgram.description ? "\n" : "") +
                                    type,
                                })
                              }
                            >
                              {type}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-end mt-4 space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setNewCoreProgram({
                          title: "",
                          description: "",
                          category: "",
                        });
                        setCoreProgramImage(null);
                        setCoreProgramPreview(null);
                        setIsCreateCoreProgramOpen(false);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleCreateCoreProgram}>
                      Create Core Program
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  onClick={() => setSelectedCategory(category)}
                  className="text-sm"
                >
                  {category}
                </Button>
              ))}
            </div>

            <motion.div
              className="grid md:grid-cols-3 lg:grid-cols-4 gap-6"
              layout
            >
              <AnimatePresence>
                {corePrograms.length > 0 ? (
                  corePrograms.map((program) => (
                    <motion.div
                      key={program._id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="relative overflow-hidden rounded-lg aspect-[4/3] cursor-pointer group">
                        <img
                          src={program.image}
                          alt={program.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => handleViewCoreProgram(program)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => handleEditCoreProgram(program)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() =>
                                handleDeleteCoreProgram(program._id)
                              }
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Badge className="mb-2">{program.category}</Badge>
                          {/* <h3 className="text-white font-semibold text-xs mb-1">
                            {program.title}
                          </h3> */}
                          <p className="text-white/80 text-xs line-clamp-2">
                            {program.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-12 col-span-4">
                    <p className="text-muted-foreground">
                      No core programs found in this category. Selected:{" "}
                      {selectedCategory}
                    </p>
                  </div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Edit Core Program Dialog */}
            <Dialog
              open={isEditCoreProgramOpen}
              onOpenChange={setIsEditCoreProgramOpen}
            >
              <DialogContent className="max-w-md max-h-[70vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Edit Core Program</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 p-4">
                  <div>
                    <Label htmlFor="edit-core-image">
                      New Image (optional)
                    </Label>
                    <Input
                      id="edit-core-image"
                      type="file"
                      accept="image/*"
                      onChange={handleCoreProgramImageChange}
                    />
                    {coreProgramPreview && (
                      <img
                        src={coreProgramPreview}
                        alt="Preview"
                        className="mt-2 w-full h-32 object-cover rounded"
                      />
                    )}
                  </div>
                  <div>
                    <Label htmlFor="edit-core-title">Program Title</Label>
                    <select
                      id="edit-core-title"
                      value={newCoreProgram.title}
                      onChange={(e) =>
                        setNewCoreProgram({
                          ...newCoreProgram,
                          title: e.target.value,
                          category: e.target.value,
                        })
                      }
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="">Select Title</option>
                      {categories.slice(1).map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="edit-core-description">Description</Label>
                    <Textarea
                      id="edit-core-description"
                      value={newCoreProgram.description}
                      onChange={(e) =>
                        setNewCoreProgram({
                          ...newCoreProgram,
                          description: e.target.value,
                        })
                      }
                      className="h-20"
                    />
                    {newCoreProgram.title && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {programTypes[newCoreProgram.title]?.map((type) => (
                          <Button
                            key={type}
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setNewCoreProgram({
                                ...newCoreProgram,
                                description:
                                  newCoreProgram.description +
                                  (newCoreProgram.description ? "\n" : "") +
                                  type,
                              })
                            }
                          >
                            {type}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-end mt-4 p-4 space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsEditCoreProgramOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleUpdateCoreProgram}>
                    Update Core Program
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* View Core Program Dialog */}
            <Dialog
              open={isViewCoreProgramOpen}
              onOpenChange={setIsViewCoreProgramOpen}
            >
              <DialogContent className="max-w-md max-h-[70vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{selectedCoreProgram?.title}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <img
                    src={selectedCoreProgram?.image}
                    alt={selectedCoreProgram?.title}
                    className="w-full h-auto rounded"
                  />
                  <p>
                    <strong>Description:</strong>{" "}
                    {selectedCoreProgram?.description}
                  </p>
                  <p>
                    <strong>Category:</strong> {selectedCoreProgram?.category}
                  </p>
                </div>
                <div className="flex justify-end mt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsViewCoreProgramOpen(false)}
                  >
                    Close
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Events Section */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-semibold">All Events</h2>
                <p className="text-muted-foreground">
                  Create, edit, and manage all events
                </p>
              </div>
              <Dialog
                open={isCreateEventOpen}
                onOpenChange={setIsCreateEventOpen}
              >
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
                    <div>
                      <Label htmlFor="event-image">Image File</Label>
                      <Input
                        id="event-image"
                        type="file"
                        accept="image/*"
                        onChange={handleEventImageChange}
                      />
                    </div>
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
                        setNewEvent({
                          ...newEvent,
                          description: e.target.value,
                        })
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
                    <select
                      value={newEvent.status}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, status: e.target.value })
                      }
                      className="col-span-2 border rounded-md p-2"
                    >
                      <option value="upcoming">Upcoming</option>
                      <option value="ongoing">Ongoing</option>
                      <option value="completed">Completed</option>
                    </select>
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
                          status: "upcoming",
                        });
                        setEventImage(null);
                        setIsCreateEventOpen(false);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleCreateEvent}>Create Event</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.length > 0 ? (
                events.map((event) => (
                  <Card
                    key={event._id}
                    className="donation-card overflow-hidden"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <Badge
                        className={`absolute top-4 left-4 ${getStatusColor(
                          event.status
                        )}`}
                      >
                        {event.status.charAt(0).toUpperCase() +
                          event.status.slice(1)}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="absolute top-4 right-4 bg-background/80 text-xs"
                      >
                        {event.category}
                      </Badge>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl text-primary line-clamp-2">
                        {event.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground line-clamp-3 leading-relaxed">
                        {event.description}
                      </p>
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
                    </CardContent>
                    <div className="flex space-x-2 p-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewEvent(event)}
                      >
                        <Eye className="w-4 h-4 mr-2" /> View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditEvent(event)}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteEvent(event._id)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                      </Button>
                    </div>
                  </Card>
                ))
              ) : (
                <p className="text-center text-muted-foreground col-span-3">
                  No events available.
                </p>
              )}
            </div>
          </div>

          {/* Edit Event Dialog */}
          <Dialog open={isEditEventOpen} onOpenChange={setIsEditEventOpen}>
            <DialogContent className="max-w-2xl max-h-[70vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit Event</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-3 p-4">
                <div className="col-span-2">
                  <Label htmlFor="edit-event-image">New Image (optional)</Label>
                  <Input
                    id="edit-event-image"
                    type="file"
                    accept="image/*"
                    onChange={handleEventImageChange}
                  />
                  {selectedEvent?.image && !eventImage && (
                    <img
                      src={selectedEvent.image}
                      alt="Current event"
                      className="mt-2 w-24 h-24 object-cover rounded"
                    />
                  )}
                </div>
                <div className="col-span-2">
                  <Label htmlFor="edit-event-title">Event Title</Label>
                  <Input
                    id="edit-event-title"
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
                  <Label htmlFor="edit-event-description">Description</Label>
                  <Textarea
                    id="edit-event-description"
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
                  <Label htmlFor="edit-event-date">Date</Label>
                  <Input
                    id="edit-event-date"
                    type="date"
                    value={newEvent.date}
                    onChange={(e) =>
                      setNewEvent((prev) => ({ ...prev, date: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="edit-event-time">Time</Label>
                  <Input
                    id="edit-event-time"
                    type="time"
                    value={newEvent.time}
                    onChange={(e) =>
                      setNewEvent((prev) => ({ ...prev, time: e.target.value }))
                    }
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="edit-event-location">Location</Label>
                  <Input
                    id="edit-event-location"
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
                  <Label htmlFor="edit-event-maxAttendees">Max Attendees</Label>
                  <Input
                    id="edit-event-maxAttendees"
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
                  <Label htmlFor="edit-event-category">Category</Label>
                  <Input
                    id="edit-event-category"
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
                  <Label htmlFor="edit-event-status">Status</Label>
                  <select
                    id="edit-event-status"
                    value={newEvent.status}
                    onChange={(e) =>
                      setNewEvent((prev) => ({
                        ...prev,
                        status: e.target.value,
                      }))
                    }
                    className="w-full border rounded-md p-2"
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end mt-4 p-4 space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsEditEventOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleUpdateEvent}>Update Event</Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* View Event Dialog */}
          <Dialog open={isViewEventOpen} onOpenChange={setIsViewEventOpen}>
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
                  <strong>Attendees:</strong> {selectedEvent?.attendees}/
                  {selectedEvent?.maxAttendees} registered
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  {selectedEvent?.status.charAt(0).toUpperCase() +
                    selectedEvent?.status.slice(1)}
                </p>
              </div>
              <div className="flex justify-end mt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsViewEventOpen(false)}
                >
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

export default AdminPrograms;
