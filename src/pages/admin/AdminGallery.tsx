import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Trash2, Upload, Eye, Edit } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import heroBackground from "@/assets/Photos/Main1.jpg";

const API_BASE = import.meta.env.VITE_API_BASE;

const AdminGallery = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [newImage, setNewImage] = useState({
    title: "",
    // description: "",
    category: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const categories = [
    "All",
    "Events",
    "Causes",
    "Volunteers",
    "Beneficiaries",
    "Community",
    "Environment",
  ];

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get(`${API_BASE}/gallery/`);
      setImages(response.data);
    } catch (error) {
      console.error("Error fetching images:", error);
      toast.error("Failed to load images");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };


  // const handleUploadImage = async () => {
  //   if (!imageFile) {
  //     toast.error("Please select an image");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("image", imageFile);
  //   formData.append("title", newImage.title);
  //   formData.append("description", newImage.description);
  //   formData.append("category", newImage.category);

  //   try {
  //     const response = await axios.post(
  //       "${API_BASE}/gallery/upload",
  //       formData,
  //       {
  //         headers: { "Content-Type": "multipart/form-data" },
  //       }
  //     );
  //     setImages([...images, response.data]);
  //     toast.success("Image uploaded successfully");
  //     resetForm();
  //     setIsUploadOpen(false);
  //   } catch (error) {
  //     toast.error("Error uploading image");
  //     console.error(error);
  //   }
  // };

  // const handleEditImage = async () => {
  //   const formData = new FormData();
  //   formData.append("title", newImage.title);
  //   formData.append("description", newImage.description);
  //   formData.append("category", newImage.category);
  //   if (imageFile) formData.append("image", imageFile);

  //   try {
  //     const response = await axios.put(
  //       `${API_BASE}/gallery/${selectedImage._id}`,
  //       formData,
  //       {
  //         headers: { "Content-Type": "multipart/form-data" },
  //       }
  //     );
  //     setImages(
  //       images.map((img) =>
  //         img._id === selectedImage._id ? response.data : img
  //       )
  //     );
  //     toast.success("Image updated successfully");
  //     resetForm();
  //     setIsEditOpen(false);
  //   } catch (error) {
  //     toast.error("Error updating image");
  //     console.error(error);
  //   }
  // };

  // const handleDeleteImage = async (id) => {
  //   try {
  //     await axios.delete(`${API_BASE}/gallery/${id}`);
  //     setImages(images.filter((image) => image._id !== id));
  //     toast.success("Image deleted successfully");
  //   } catch (error) {
  //     toast.error("Error deleting image");
  //     console.error(error);
  //   }
  // };

  const handleUploadImage = async () => {
    if (!imageFile) {
      toast.error("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("title", newImage.title);
    // formData.append("description", newImage.description);
    formData.append("category", newImage.category);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_BASE}/gallery/upload`,
        formData,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setImages([...images, response.data]);
      toast.success("Image uploaded successfully");
      resetForm();
      setIsUploadOpen(false);
    } catch (error) {
      toast.error("Error uploading image");
      console.error(error);
    }
  };


  const handleEditImage = async () => {
    const formData = new FormData();
    formData.append("title", newImage.title);
    // formData.append("description", newImage.description);
    formData.append("category", newImage.category);
    if (imageFile) formData.append("image", imageFile);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${API_BASE}/gallery/${selectedImage._id}`,
        formData,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setImages(
        images.map((img) =>
          img._id === selectedImage._id ? response.data : img
        )
      );
      toast.success("Image updated successfully");
      resetForm();
      setIsEditOpen(false);
    } catch (error) {
      toast.error("Error updating image");
      console.error(error);
    }
  };

  const handleDeleteImage = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `${API_BASE}/gallery/${id}`,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      setImages(images.filter((image) => image._id !== id));
      toast.success("Image deleted successfully");
    } catch (error) {
      toast.error("Error deleting image");
      console.error(error);
    }
  };


  const handleViewImage = (image) => {
    setSelectedImage(image);
    setIsViewOpen(true);
  };

  const openEditDialog = (image) => {
    setSelectedImage(image);
    setNewImage({
      title: image.title,
      // description: image.description,
      category: image.category,
    });
    setPreview(image.imageUrl);
    setImageFile(null);
    setIsEditOpen(true);
  };

  const resetForm = () => {
    setNewImage({ title: "", category: "" });
    setImageFile(null);
    setPreview(null);
    setSelectedImage(null);
  };

  const filteredImages =
    selectedCategory === "All"
      ? images
      : images.filter((image) => image.category === selectedCategory);

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
            <h1 className="text-4xl font-bold mb-4">Gallery Management</h1>
            <p className="text-xl opacity-90">
              Manage your gallery images and collections
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
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-4xl font-bold text-primary mb-2">
                  Gallery Management
                </h1>
                <p className="text-muted-foreground">
                  Upload, organize, and manage all gallery images
                </p>
              </div>

              <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
                <DialogTrigger asChild>
                  <Button className="btn-hover">
                    <Plus className="w-4 h-4 mr-2" />
                    Upload Image
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Upload New Image</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="image-file">Image File</Label>
                      <Input
                        id="image-file"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                      {preview && (
                        <img
                          src={preview}
                          alt="Preview"
                          className="mt-2 w-full h-32 object-cover rounded"
                        />
                      )}
                    </div>
                    <div>
                      <Label htmlFor="image-title">Title</Label>
                      <Input
                        id="image-title"
                        value={newImage.title}
                        onChange={(e) =>
                          setNewImage((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                        placeholder="Enter image title"
                      />
                    </div>
                    <div>
                      {/* <Label htmlFor="image-description">Description</Label>
                      <Input
                        id="image-description"
                        value={newImage.description}
                        onChange={(e) =>
                          setNewImage((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                        placeholder="Enter image description"
                      /> */}
                    </div>
                    <div>
                      <Label htmlFor="image-category">Category</Label>
                      <select
                        id="image-category"
                        value={newImage.category}
                        onChange={(e) =>
                          setNewImage((prev) => ({
                            ...prev,
                            category: e.target.value,
                          }))
                        }
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="">Select Category</option>
                        {categories.slice(1).map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2 mt-4">
                    <Button
                      variant="outline"
                      onClick={() => setIsUploadOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleUploadImage}>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload
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

            {/* Images Grid */}
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredImages.map((image) => (
                <motion.div
                  key={image._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card className="overflow-hidden group cursor-pointer">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={image.imageUrl}
                        alt={image.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => handleViewImage(image)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => openEditDialog(image)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteImage(image._id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-4">
                      <h3 className="font-semibold text-sm line-clamp-1 mb-1">
                        {image.title}
                      </h3>
                      {/* <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                        {image.description}
                      </p> */}
                      <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <span className="bg-muted px-2 py-1 rounded">
                          {image.category}
                        </span>
                        <span>
                          {new Date(image.uploadDate).toLocaleDateString()}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {filteredImages.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No images found in this category.
                </p>
              </div>
            )}

            {/* Edit Dialog */}
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Edit Image</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="edit-image-file">
                      New Image (optional)
                    </Label>
                    <Input
                      id="edit-image-file"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    {preview && (
                      <img
                        src={preview}
                        alt="Preview"
                        className="mt-2 w-full h-32 object-cover rounded"
                      />
                    )}
                  </div>
                  <div>
                    <Label htmlFor="edit-title">Title</Label>
                    <Input
                      id="edit-title"
                      value={newImage.title}
                      onChange={(e) =>
                        setNewImage((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      placeholder="Enter image title"
                    />
                  </div>
                  <div>
                    {/* <Label htmlFor="edit-description">Description</Label>
                    <Input
                      id="edit-description"
                      value={newImage.description}
                      onChange={(e) =>
                        setNewImage((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      placeholder="Enter image description"
                    /> */}
                  </div>
                  <div>
                    <Label htmlFor="edit-category">Category</Label>
                    <select
                      id="edit-category"
                      value={newImage.category}
                      onChange={(e) =>
                        setNewImage((prev) => ({
                          ...prev,
                          category: e.target.value,
                        }))
                      }
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="">Select Category</option>
                      {categories.slice(1).map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsEditOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleEditImage}>
                    <Upload className="w-4 h-4 mr-2" />
                    Update
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* View Dialog */}
            <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
              <DialogContent className="max-w-md max-h-[70vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{selectedImage?.title}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <img
                    src={selectedImage?.imageUrl}
                    alt={selectedImage?.title}
                    className="w-full h-auto rounded"
                  />
                  {/* <p>
                    <strong>Description:</strong> {selectedImage?.description}
                  </p> */}
                  <p>
                    <strong>Category:</strong> {selectedImage?.category}
                  </p>
                  <p>
                    <strong>Upload Date:</strong>{" "}
                    {new Date(selectedImage?.uploadDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex justify-end mt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsViewOpen(false)}
                  >
                    Close
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

export default AdminGallery;
