import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  CheckCircle,
  XCircle,
  Trash2,
  Eye,
  Mail,
  Phone,
  Calendar,
  MapPin,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import heroBackground from "@/assets/Photos/Main3.jpg";
import { useToast } from "@/hooks/use-toast";

const API_BASE = import.meta.env.VITE_API_BASE;

const AdminVolunteers = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const { toast } = useToast();

  // Filtered volunteers
  const filteredVolunteers = volunteers.filter((v) => {
    if (activeFilter === "all") return true;
    return v.status === activeFilter;
  });

  // ✅ Fetch volunteers from API
  useEffect(() => {
    fetchVolunteers();
  }, []);

  const fetchVolunteers = async () => {
    try {
      const res = await axios.get(`${API_BASE}/volunteers/get`);
      setVolunteers(res.data);
    } catch (err) {
      console.error("Error fetching volunteers:", err);
      toast({
        title: "Error",
        description: "Failed to load volunteers",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    window.location.href = "/";
  };

  const handleAcceptVolunteer = async (id) => {
    try {
      await axios.put(`${API_BASE}/volunteers/${id}/status`, { status: "accepted" });
      fetchVolunteers();
      toast({ title: "Success", description: "Volunteer accepted" });
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to accept volunteer",
        variant: "destructive",
      });
    }
  };

  const handleRejectVolunteer = async (id) => {
    try {
      await axios.put(`${API_BASE}/volunteers/${id}/status`, { status: "rejected" });
      fetchVolunteers();
      toast({ title: "Success", description: "Volunteer rejected" });
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to reject volunteer",
        variant: "destructive",
      });
    }
  };

  const handleDeleteVolunteer = async (id) => {
    try {
      await axios.delete(`${API_BASE}/volunteers/${id}`);
      fetchVolunteers();
      toast({ title: "Deleted", description: "Volunteer removed" });
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to delete volunteer",
        variant: "destructive",
      });
    }
  };

  const handleViewVolunteer = (volunteer) => {
    setSelectedVolunteer(volunteer);
    setIsViewOpen(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "accepted":
        return "bg-green-500 text-white";
      case "rejected":
        return "bg-red-500 text-white";
      case "pending":
        return "bg-yellow-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "accepted":
        return <CheckCircle className="w-4 h-4" />;
      case "rejected":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation isAdmin={true} onLogout={handleLogout} />

      {/* Hero Banner */}
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
            <h1 className="text-4xl font-bold mb-4">Volunteers Management</h1>
            <p className="text-xl opacity-90">
              Manage volunteer applications and team members
            </p>
          </motion.div>
        </div>
      </div>

      <div className="section-padding">
        <div className="container">
          {/* Statistics */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card
              onClick={() => setActiveFilter("pending")}
              className={`cursor-pointer ${activeFilter === "pending" ? "ring-2 ring-primary" : ""
                }`}
            >
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary">
                  {volunteers.filter((v) => v.status === "pending").length}
                </div>
                <div className="text-sm text-muted-foreground">
                  Pending Applications
                </div>
              </CardContent>
            </Card>

            <Card
              onClick={() => setActiveFilter("accepted")}
              className={`cursor-pointer ${activeFilter === "accepted" ? "ring-2 ring-primary" : ""
                }`}
            >
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {volunteers.filter((v) => v.status === "accepted").length}
                </div>
                <div className="text-sm text-muted-foreground">
                  Accepted Volunteers
                </div>
              </CardContent>
            </Card>

            <Card
              onClick={() => setActiveFilter("rejected")}
              className={`cursor-pointer ${activeFilter === "rejected" ? "ring-2 ring-primary" : ""
                }`}
            >
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-red-600">
                  {volunteers.filter((v) => v.status === "rejected").length}
                </div>
                <div className="text-sm text-muted-foreground">
                  Rejected Applications
                </div>
              </CardContent>
            </Card>

            <Card
              onClick={() => setActiveFilter("all")}
              className={`cursor-pointer ${activeFilter === "all" ? "ring-2 ring-primary" : ""
                }`}
            >
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {volunteers.length}
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Applications
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Volunteers List */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVolunteers.map((volunteer) => (
              <motion.div
                key={volunteer._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="overflow-hidden">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">
                          {volunteer.name}
                        </CardTitle>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <Badge variant="outline" className="mr-2">
                            {volunteer.volunteerType}
                          </Badge>
                          <Badge className={getStatusColor(volunteer.status)}>
                            {getStatusIcon(volunteer.status)}
                            <span className="ml-1">{volunteer.status}</span>
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Mail className="w-4 h-4 mr-2" />
                        {volunteer.email}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Phone className="w-4 h-4 mr-2" />
                        {volunteer.phone}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 mr-2" />
                        {volunteer.city}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-2" />
                        Applied:{" "}
                        {new Date(volunteer.createdAt).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleViewVolunteer(volunteer)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>

                      {volunteer.status === "pending" && (
                        <>
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleAcceptVolunteer(volunteer._id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleRejectVolunteer(volunteer._id)}
                          >
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </>
                      )}

                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteVolunteer(volunteer._id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* View Volunteer Dialog */}
          <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Volunteer Details</DialogTitle>
              </DialogHeader>
              {selectedVolunteer && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold text-primary mb-2">
                        Personal Information
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div>
                          <strong>Name:</strong> {selectedVolunteer.name}
                        </div>
                        <div>
                          <strong>Email:</strong> {selectedVolunteer.email}
                        </div>
                        <div>
                          <strong>Phone:</strong> {selectedVolunteer.phone}
                        </div>
                        <div>
                          <strong>Gender:</strong> {selectedVolunteer.gender}
                        </div>
                        <div>
                          <strong>Blood Group:</strong> {selectedVolunteer.bloodGroup}
                        </div>
                        <div>
                          <strong>Date of Birth:</strong>{" "}
                          {selectedVolunteer.dob}
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-2">
                        Application Details
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div>
                          <strong>Volunteer Type:</strong>{" "}
                          {selectedVolunteer.volunteerType}
                        </div>
                        <div>
                          <strong>Applied Date:</strong>{" "}
                          {new Date(
                            selectedVolunteer.createdAt
                          ).toLocaleDateString()}
                        </div>
                        <div>
                          <strong>Status:</strong>
                          <Badge
                            className={`ml-2 ${getStatusColor(
                              selectedVolunteer.status
                            )}`}
                          >
                            {selectedVolunteer.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-primary mb-2">Address</h3>
                    <p className="text-sm">{selectedVolunteer.address}</p>
                    <p className="text-sm">City: {selectedVolunteer.city}</p>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminVolunteers;