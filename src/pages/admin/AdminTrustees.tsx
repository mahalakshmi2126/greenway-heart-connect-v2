import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { Plus, Trash2, Upload, Edit, User, Eye } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import heroBackground from "@/assets/Programs.JPG.jpeg";

const API_BASE = import.meta.env.VITE_API_BASE;

interface TrusteeMember {
  _id: string;
  name: string;
  role: string;
  subRole?: string;
  bio?: string;
  imageUrl?: string;
  publicId?: string;
  order: number;
}

const AdminTrustees = () => {
  const navigate = useNavigate();
  const [trustees, setTrustees] = useState<TrusteeMember[]>([]);
  const [loading, setLoading] = useState(true);

  // Dialog states
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);

  // Form states
  const [selectedTrustee, setSelectedTrustee] = useState<TrusteeMember | null>(null);
  const [formState, setFormState] = useState({
    name: "",
    role: "",
    subRole: "",
    bio: "",
    order: "0",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    fetchTrustees();
  }, []);

  const fetchTrustees = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE}/trustees`);
      setTrustees(response.data);
    } catch (error) {
      console.error("Error fetching trustees:", error);
      toast.error("Failed to load trustees list");
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

  const handleOpenEdit = (trustee: TrusteeMember) => {
    setSelectedTrustee(trustee);
    setFormState({
      name: trustee.name,
      role: trustee.role,
      subRole: trustee.subRole || "",
      bio: trustee.bio || "",
      order: String(trustee.order || 0),
    });
    setPreview(trustee.imageUrl || null);
    setImageFile(null);
    setIsEditOpen(true);
  };

  const handleOpenView = (trustee: TrusteeMember) => {
    setSelectedTrustee(trustee);
    setIsViewOpen(true);
  };

  const resetForm = () => {
    setFormState({
      name: "",
      role: "",
      subRole: "",
      bio: "",
      order: String(trustees.length),
    });
    setImageFile(null);
    setPreview(null);
    setSelectedTrustee(null);
  };

  const handleAddTrustee = async () => {
    if (!formState.name.trim() || !formState.role.trim()) {
      toast.error("Name and Role are required");
      return;
    }

    const formData = new FormData();
    formData.append("name", formState.name);
    formData.append("role", formState.role);
    formData.append("subRole", formState.subRole);
    formData.append("bio", formState.bio);
    formData.append("order", formState.order);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${API_BASE}/trustees`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setTrustees((prev) =>
        [...prev, response.data].sort((a, b) => (a.order || 0) - (b.order || 0))
      );
      toast.success("Trustee added successfully");
      setIsAddOpen(false);
      resetForm();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add trustee");
    }
  };

  const handleEditTrustee = async () => {
    if (!selectedTrustee) return;
    if (!formState.name.trim() || !formState.role.trim()) {
      toast.error("Name and Role are required");
      return;
    }

    const formData = new FormData();
    formData.append("name", formState.name);
    formData.append("role", formState.role);
    formData.append("subRole", formState.subRole);
    formData.append("bio", formState.bio);
    formData.append("order", formState.order);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${API_BASE}/trustees/${selectedTrustee._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setTrustees((prev) =>
        prev
          .map((item) => (item._id === selectedTrustee._id ? response.data : item))
          .sort((a, b) => (a.order || 0) - (b.order || 0))
      );
      toast.success("Trustee details updated successfully");
      setIsEditOpen(false);
      resetForm();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update trustee details");
    }
  };

  const handleDeleteTrustee = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this Board Member?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_BASE}/trustees/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTrustees((prev) => prev.filter((item) => item._id !== id));
      toast.success("Trustee deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete trustee");
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
            <h1 className="text-4xl font-bold mb-4">Board of Trustees / Office Bearers</h1>
            <p className="text-xl opacity-90">
              Manage the trust members, bios, roles, and photos
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
                <h2 className="text-3xl font-bold text-primary">Board Members List</h2>
                <p className="text-muted-foreground">
                  Update photos and manage details of the Greenway Trust board of trustees.
                </p>
              </div>

              <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                <DialogTrigger asChild>
                  <Button onClick={handleOpenAdd} className="btn-hover w-full sm:w-auto">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Board Member
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Trustee / Office Bearer</DialogTitle>
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
                        <div className="mt-2 relative w-32 h-32 mx-auto rounded-xl overflow-hidden border border-primary/20">
                          <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="trustee-name">Name</Label>
                      <Input
                        id="trustee-name"
                        value={formState.name}
                        onChange={(e) =>
                          setFormState((prev) => ({ ...prev, name: e.target.value }))
                        }
                        placeholder="Enter full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="trustee-role">Role (e.g. Founder & President)</Label>
                      <Input
                        id="trustee-role"
                        value={formState.role}
                        onChange={(e) =>
                          setFormState((prev) => ({ ...prev, role: e.target.value }))
                        }
                        placeholder="Enter primary role"
                      />
                    </div>
                    <div>
                      <Label htmlFor="trustee-subrole">Sub-Role / Focus Area</Label>
                      <Input
                        id="trustee-subrole"
                        value={formState.subRole}
                        onChange={(e) =>
                          setFormState((prev) => ({ ...prev, subRole: e.target.value }))
                        }
                        placeholder="e.g. Vision, Governance & Operations"
                      />
                    </div>
                    <div>
                      <Label htmlFor="trustee-order">Sort Order (position sequence)</Label>
                      <Input
                        id="trustee-order"
                        type="number"
                        value={formState.order}
                        onChange={(e) =>
                          setFormState((prev) => ({ ...prev, order: e.target.value }))
                        }
                        placeholder="0, 1, 2..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="trustee-bio">Biography / Description</Label>
                      <Textarea
                        id="trustee-bio"
                        rows={4}
                        value={formState.bio}
                        onChange={(e) =>
                          setFormState((prev) => ({ ...prev, bio: e.target.value }))
                        }
                        placeholder="Enter brief biography"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2 mt-4">
                    <Button variant="outline" onClick={() => setIsAddOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddTrustee}>
                      <Upload className="w-4 h-4 mr-2" />
                      Add Member
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {loading ? (
              <div className="py-12 text-center text-muted-foreground animate-pulse">
                Loading Board Members...
              </div>
            ) : trustees.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground border rounded-lg bg-muted/20">
                No Board Members configured.
              </div>
            ) : (
              /* Trustees Grid view */
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trustees.map((member) => (
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

                      <CardContent className="p-6 text-left flex-grow flex flex-col">
                        <div className="flex items-center gap-4 mb-4">
                          {member.imageUrl ? (
                            <img
                              src={member.imageUrl}
                              alt={member.name}
                              className="w-28 h-28 rounded-xl object-cover border-2 border-primary/20 flex-shrink-0"
                            />
                          ) : (
                            <div className="w-28 h-28 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-primary-foreground font-bold text-3xl flex-shrink-0">
                              {member.name.substring(0, 2).toUpperCase()}
                            </div>
                          )}

                          <div className="overflow-hidden">
                            <h3 className="font-bold text-lg text-primary leading-tight truncate">
                              {member.name}
                            </h3>
                            <div className="font-semibold text-sm text-foreground/90 truncate mt-0.5">
                              {member.role}
                            </div>
                            {member.subRole && (
                              <div className="text-xs text-primary italic truncate mt-0.5">
                                {member.subRole}
                              </div>
                            )}
                          </div>
                        </div>

                        <p className="text-muted-foreground leading-relaxed text-sm flex-grow line-clamp-4">
                          {member.bio}
                        </p>

                        <div className="flex gap-2 mt-6 pt-4 border-t border-muted">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                            onClick={() => handleOpenView(member)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
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
                            onClick={() => handleDeleteTrustee(member._id)}
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

            {/* View Trustee Details Dialog */}
            <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
              <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Board Member Details</DialogTitle>
                </DialogHeader>
                {selectedTrustee && (
                  <div className="space-y-4 pt-4 text-center">
                    {selectedTrustee.imageUrl ? (
                      <img
                        src={selectedTrustee.imageUrl}
                        alt={selectedTrustee.name}
                        className="w-24 h-24 rounded-xl object-cover mx-auto border-2 border-primary"
                      />
                    ) : (
                      <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-primary-foreground font-bold text-3xl mx-auto">
                        {selectedTrustee.name.substring(0, 2).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <h2 className="text-2xl font-bold text-primary">{selectedTrustee.name}</h2>
                      <p className="font-semibold text-foreground/90 mt-1">{selectedTrustee.role}</p>
                      {selectedTrustee.subRole && (
                        <p className="text-sm text-primary italic mt-0.5">{selectedTrustee.subRole}</p>
                      )}
                      <Badge variant="secondary" className="mt-2">
                        Sort Order Sequence: {selectedTrustee.order}
                      </Badge>
                    </div>

                    <div className="text-left border-t pt-4">
                      <h4 className="font-semibold text-primary mb-2 text-sm">Biography</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                        {selectedTrustee.bio || "No biography provided."}
                      </p>
                    </div>
                  </div>
                )}
                <div className="flex justify-end mt-4">
                  <Button variant="outline" onClick={() => setIsViewOpen(false)}>
                    Close
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Edit Trustee Dialog */}
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
              <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Edit Board Member Details</DialogTitle>
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
                      <div className="mt-2 relative w-32 h-32 mx-auto rounded-xl overflow-hidden border border-primary/20">
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
                    <Label htmlFor="edit-subrole">Sub-Role / Focus Area</Label>
                    <Input
                      id="edit-subrole"
                      value={formState.subRole}
                      onChange={(e) =>
                        setFormState((prev) => ({ ...prev, subRole: e.target.value }))
                      }
                      placeholder="e.g. Vision, Governance & Operations"
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
                  <div>
                    <Label htmlFor="edit-bio">Biography</Label>
                    <Textarea
                      id="edit-bio"
                      rows={4}
                      value={formState.bio}
                      onChange={(e) =>
                        setFormState((prev) => ({ ...prev, bio: e.target.value }))
                      }
                      placeholder="Enter bio"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                  <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleEditTrustee}>
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

export default AdminTrustees;
