import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Trash2, Upload, Edit, Eye } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import heroBackground from "@/assets/Photos/Main1.jpg";

const API_BASE = import.meta.env.VITE_API_BASE;

interface CoordinatorMember {
  _id: string;
  name: string;
  role: string;
  imageUrl?: string;
  publicId?: string;
  order: number;
}

const AdminCoordinators = () => {
  const navigate = useNavigate();
  const [coordinators, setCoordinators] = useState<CoordinatorMember[]>([]);
  const [loading, setLoading] = useState(true);

  // Dialog states
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Form states
  const [selectedCoordinator, setSelectedCoordinator] = useState<CoordinatorMember | null>(null);
  const [formState, setFormState] = useState({
    name: "",
    role: "",
    order: "0",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    fetchCoordinators();
  }, []);

  const fetchCoordinators = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE}/coordinators`);
      setCoordinators(response.data);
    } catch (error) {
      console.error("Error fetching coordinators:", error);
      toast.error("Failed to load coordinators list");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("token");
    localStorage.removeItem("adminEmail");
    toast.success("Logout successful");
    navigate("/", { replace: true });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleOpenAdd = () => {
    resetForm();
    setIsAddOpen(true);
  };

  const handleOpenEdit = (coordinator: CoordinatorMember) => {
    setSelectedCoordinator(coordinator);
    setFormState({
      name: coordinator.name,
      role: coordinator.role,
      order: String(coordinator.order || 0),
    });
    setPreview(coordinator.imageUrl || null);
    setImageFile(null);
    setIsEditOpen(true);
  };

  const resetForm = () => {
    setFormState({
      name: "",
      role: "",
      order: String(coordinators.length),
    });
    setImageFile(null);
    setPreview(null);
    setSelectedCoordinator(null);
  };

  const handleAddCoordinator = async () => {
    if (!formState.name.trim() || !formState.role.trim()) {
      toast.error("Name and Role are required");
      return;
    }

    const formData = new FormData();
    formData.append("name", formState.name);
    formData.append("role", formState.role);
    formData.append("order", formState.order);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${API_BASE}/coordinators`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setCoordinators((prev) =>
        [...prev, response.data].sort((a, b) => (a.order || 0) - (b.order || 0))
      );
      toast.success("Coordinator added successfully");
      setIsAddOpen(false);
      resetForm();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add coordinator");
    }
  };

  const handleEditCoordinator = async () => {
    if (!selectedCoordinator) return;
    if (!formState.name.trim() || !formState.role.trim()) {
      toast.error("Name and Role are required");
      return;
    }

    const formData = new FormData();
    formData.append("name", formState.name);
    formData.append("role", formState.role);
    formData.append("order", formState.order);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${API_BASE}/coordinators/${selectedCoordinator._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setCoordinators((prev) =>
        prev
          .map((item) => (item._id === selectedCoordinator._id ? response.data : item))
          .sort((a, b) => (a.order || 0) - (b.order || 0))
      );
      toast.success("Coordinator details updated successfully");
      setIsEditOpen(false);
      resetForm();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update coordinator details");
    }
  };

  const handleDeleteCoordinator = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this Coordinator?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_BASE}/coordinators/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCoordinators((prev) => prev.filter((item) => item._id !== id));
      toast.success("Coordinator deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete coordinator");
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
            <h1 className="text-4xl font-bold mb-4">Coordinators Management</h1>
            <p className="text-xl opacity-90">
              Manage the team coordinators, roles, and photos
            </p>
          </motion.div>
        </div>
      </div>

      <div className="section-padding">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Header section with actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div>
                <h2 className="text-3xl font-bold text-primary">Coordinators List</h2>
                <p className="text-muted-foreground">
                  Update photos and manage details of the Greenway Trust coordinators.
                </p>
              </div>

              <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                <DialogTrigger asChild>
                  <Button onClick={handleOpenAdd} className="btn-hover w-full sm:w-auto">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Coordinator
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Coordinator</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-2">
                    <div>
                      <Label htmlFor="image-file">Profile Photo</Label>
                      <Input
                        id="image-file"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mt-1"
                      />
                      {preview && (
                        <div className="mt-2 relative w-32 h-32 mx-auto rounded-full overflow-hidden border border-primary/20">
                          <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="coordinator-name">Name</Label>
                      <Input
                        id="coordinator-name"
                        value={formState.name}
                        onChange={(e) =>
                          setFormState((prev) => ({ ...prev, name: e.target.value }))
                        }
                        placeholder="Enter full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="coordinator-role">Role (e.g. Program Coordinator- Environment)</Label>
                      <Input
                        id="coordinator-role"
                        value={formState.role}
                        onChange={(e) =>
                          setFormState((prev) => ({ ...prev, role: e.target.value }))
                        }
                        placeholder="Enter primary role"
                      />
                    </div>
                    <div>
                      <Label htmlFor="coordinator-order">Sort Order (position sequence)</Label>
                      <Input
                        id="coordinator-order"
                        type="number"
                        value={formState.order}
                        onChange={(e) =>
                          setFormState((prev) => ({ ...prev, order: e.target.value }))
                        }
                        placeholder="0, 1, 2..."
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2 mt-4">
                    <Button variant="outline" onClick={() => setIsAddOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddCoordinator}>
                      <Upload className="w-4 h-4 mr-2" />
                      Add Coordinator
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {loading ? (
              <div className="py-12 text-center text-muted-foreground animate-pulse">
                Loading Coordinators...
              </div>
            ) : coordinators.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground border rounded-lg bg-muted/20">
                No Coordinators configured.
              </div>
            ) : (
              /* Coordinators Grid view */
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {coordinators.map((member) => (
                  <motion.div
                    key={member._id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-300 overflow-hidden relative group">
                      <div className="absolute top-2 right-2 z-10">
                        <Badge variant="secondary" className="opacity-80">
                          Order: {member.order}
                        </Badge>
                      </div>

                      <CardContent className="p-6 text-center flex-grow flex flex-col items-center justify-between">
                        <div className="flex flex-col items-center">
                          {member.imageUrl ? (
                            <img
                              src={member.imageUrl}
                              alt={member.name}
                              className="w-28 h-28 rounded-full object-cover border-2 border-primary/20 mb-4"
                            />
                          ) : (
                            <div className="w-28 h-28 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-2xl mb-4">
                              {member.name.substring(0, 2).toUpperCase()}
                            </div>
                          )}

                          <h3 className="font-semibold text-lg text-primary mb-2 line-clamp-1">
                            {member.name}
                          </h3>
                          <p className="text-sm text-muted-foreground text-center line-clamp-2 min-h-[40px]">
                            {member.role}
                          </p>
                        </div>

                        <div className="flex gap-2 w-full mt-6 pt-4 border-t border-muted">
                          <Button
                            size="sm"
                            variant="secondary"
                            className="flex-1"
                            onClick={() => handleOpenEdit(member)}
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteCoordinator(member._id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Edit Coordinator Dialog */}
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
              <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Edit Coordinator Details</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-2">
                  <div>
                    <Label htmlFor="edit-image-file">Replace Photo (optional)</Label>
                    <Input
                      id="edit-image-file"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="mt-1"
                    />
                    {preview && (
                      <div className="mt-2 relative w-32 h-32 mx-auto rounded-full overflow-hidden border border-primary/20">
                        <img
                          src={preview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="edit-name">Name</Label>
                    <Input
                      id="edit-name"
                      value={formState.name}
                      onChange={(e) =>
                        setFormState((prev) => ({ ...prev, name: e.target.value }))
                      }
                      placeholder="Enter full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-role">Role</Label>
                    <Input
                      id="edit-role"
                      value={formState.role}
                      onChange={(e) =>
                        setFormState((prev) => ({ ...prev, role: e.target.value }))
                      }
                      placeholder="Enter primary role"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-order">Sort Order</Label>
                    <Input
                      id="edit-order"
                      type="number"
                      value={formState.order}
                      onChange={(e) =>
                        setFormState((prev) => ({ ...prev, order: e.target.value }))
                      }
                      placeholder="0, 1, 2..."
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                  <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleEditCoordinator}>
                    <Upload className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminCoordinators;
