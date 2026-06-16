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
import { Plus, Edit, Trash2, Calendar, User, Eye } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import heroBackground from "@/assets/Photos/Main2.JPG";

const API_BASE = import.meta.env.VITE_API_BASE;

const AdminBlog = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [newBlog, setNewBlog] = useState({
    title: "",
    excerpt: "",
    content: "",
    author: "",
    category: "",
    status: "draft",
    date: "",
  });
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const categories = [
    "All",
    "Medical Care & Rehabilitation Support",
    "Provision of Assistive Devices & Essential Resources",
    "Empowering Persons with Disabilities",
    "Para Sports Development Programmes",
    "Community Engagement & Outreach",
    "Environmental Sustainability Initiatives",
  ];
  const statuses = ["draft", "published", "archived"];

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${API_BASE}/blogs/all`);
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/");
  };

  // const handleCreateBlog = async () => {
  //   const formData = new FormData();
  //   Object.keys(newBlog).forEach((key) => formData.append(key, newBlog[key]));
  //   if (image) formData.append("image", image);

  //   try {
  //     const response = await axios.post(
  //       `${API_BASE}/blogs/create`,
  //       formData,
  //       {
  //         headers: { "Content-Type": "multipart/form-data" },
  //       }
  //     );
  //     setBlogs([...blogs, response.data]);
  //     toast.success("Blog created!");
  //     setNewBlog({
  //       title: "",
  //       excerpt: "",
  //       content: "",
  //       author: "",
  //       category: "",
  //       status: "draft",
  //       date: "",
  //     });
  //     setImage(null);
  //     setPreviewImage(null);
  //     setIsCreateOpen(false);
  //   } catch (error) {
  //     toast.error("Error creating blog");
  //     console.error(error);
  //   }
  // };

  const formatTextToHtml = (text) => {
    if (!text) return "";
    // If it already looks like HTML, return as is
    if (text.trim().startsWith("<")) return text;

    const lines = text.split("\n");
    let html = "";
    let inList = false;

    lines.forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed) return;

      const isBullet =
        trimmed.startsWith("•") ||
        trimmed.startsWith("- ") ||
        trimmed.startsWith("* ");

      if (isBullet) {
        if (!inList) {
          html += '<ul class="list-disc pl-5 mb-4 space-y-2">';
          inList = true;
        }
        const content = trimmed.replace(/^[•\-*]\s*/, "");
        html += `<li>${content}</li>`;
      } else {
        if (inList) {
          html += "</ul>";
          inList = false;
        }
        // Heuristic for Heading: Short line, no terminal punctuation
        const isHeading =
          trimmed.length < 100 && !/[.!?]$/.test(trimmed) && trimmed.length > 3;

        if (isHeading) {
          html += `<h3 class="text-xl font-bold mt-6 mb-3 text-primary">${trimmed}</h3>`;
        } else {
          html += `<p class="mb-4 text-muted-foreground leading-relaxed">${trimmed}</p>`;
        }
      }
    });

    if (inList) html += "</ul>";
    return html;
  };

  const handleCreateBlog = async () => {
    const formData = new FormData();
    // Process content to HTML before sending
    const formattedContent = formatTextToHtml(newBlog.content);

    Object.keys(newBlog).forEach((key) => {
      if (key === "content") {
        formData.append(key, formattedContent);
      } else if (key === "date") {
        if (newBlog[key]) {
          formData.append(key, newBlog[key]);
        }
      } else {
        formData.append(key, newBlog[key]);
      }
    });

    if (image) formData.append("image", image);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${API_BASE}/blogs/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setBlogs([...blogs, response.data]);
      toast.success("Blog created!");
      setNewBlog({
        title: "",
        excerpt: "",
        content: "",
        author: "",
        category: "",
        status: "draft",
        date: "",
      });
      setImage(null);
      setPreviewImage(null);
      setIsCreateOpen(false);
    } catch (error) {
      toast.error("Error creating blog");
      console.error(error);
    }
  };

  const handleEditBlog = (blog) => {
    setSelectedBlog(blog);
    setNewBlog({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      author: blog.author,
      category: blog.category,
      status: blog.status,
      date: blog.date ? new Date(blog.date).toISOString().split("T")[0] : "",
    });
    setImage(null);
    setPreviewImage(blog.image || null);
    setIsEditOpen(true);
  };

  const handleUpdateBlog = async () => {
    const formData = new FormData();
    // Process content to HTML before sending
    const formattedContent = formatTextToHtml(newBlog.content);

    Object.keys(newBlog).forEach((key) => {
      if (key === "content") {
        formData.append(key, formattedContent);
      } else if (key === "date") {
        if (newBlog[key]) {
          formData.append(key, newBlog[key]);
        }
      } else {
        formData.append(key, newBlog[key]);
      }
    });

    if (image) {
      formData.append("image", image);
      console.log(
        "Uploading image, size:",
        image.size / 1024,
        "KB, type:",
        image.type
      );
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found");

      console.time("APICall");
      const response = await axios.put(
        `${API_BASE}/blogs/${selectedBlog._id}`, // Direct URL
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          timeout: 15000,
        }
      );
      console.timeEnd("APICall");
      console.log("Update response:", response.data);

      setBlogs(
        blogs.map((blog) =>
          blog._id === selectedBlog._id ? response.data : blog
        )
      );
      toast.success("Blog updated!");
      setIsEditOpen(false);
      setSelectedBlog(null);
      setImage(null);
      setPreviewImage(null);
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || error.message || "Unknown error";
      toast.error(`Error updating blog: ${errorMessage}`);
      console.error("Error details:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
        config: error.config,
      });
    }
  };

  // Delete Blog
  const handleDeleteBlog = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `${API_BASE}/blogs/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setBlogs(blogs.filter((blog) => blog._id !== id));
      toast.success("Blog deleted!");
    } catch (error) {
      toast.error("Error deleting blog");
      console.error(error);
    }
  };


  const handleViewBlog = (blog) => {
    setSelectedBlog(blog);
    setIsViewOpen(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "published":
        return "bg-green-500 text-white";
      case "draft":
        return "bg-yellow-500 text-white";
      case "archived":
        return "bg-gray-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
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
            <h1 className="text-4xl font-bold mb-4">Blog Management</h1>
            <p className="text-xl opacity-90">
              Create and manage all blog posts for GreenWay Trust
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
              <h2 className="text-2xl font-semibold">All Blog Posts</h2>
              <p className="text-muted-foreground">
                Create, edit, and manage all blog posts
              </p>
            </div>

            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button className="btn-hover">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Blog Post
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create New Blog Post</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={newBlog.title}
                      onChange={(e) =>
                        setNewBlog((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      placeholder="Enter blog title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      value={newBlog.excerpt}
                      onChange={(e) =>
                        setNewBlog((prev) => ({
                          ...prev,
                          excerpt: e.target.value,
                        }))
                      }
                      placeholder="Brief description of the blog post"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      value={newBlog.content}
                      onChange={(e) =>
                        setNewBlog((prev) => ({
                          ...prev,
                          content: e.target.value,
                        }))
                      }
                      placeholder="Paste content here. Lists (•) and short headings will be auto-formatted to HTML."
                      rows={6}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="author">Author</Label>
                      <Input
                        id="author"
                        value={newBlog.author}
                        onChange={(e) =>
                          setNewBlog((prev) => ({
                            ...prev,
                            author: e.target.value,
                          }))
                        }
                        placeholder="Author name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <select
                        id="category"
                        value={newBlog.category}
                        onChange={(e) =>
                          setNewBlog((prev) => ({
                            ...prev,
                            category: e.target.value,
                          }))
                        }
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <select
                      id="status"
                      value={newBlog.status}
                      onChange={(e) =>
                        setNewBlog((prev) => ({
                          ...prev,
                          status: e.target.value,
                        }))
                      }
                      className="w-full p-2 border rounded-md"
                    >
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newBlog.date}
                      onChange={(e) =>
                        setNewBlog((prev) => ({
                          ...prev,
                          date: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="image">Blog Image</Label>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    {previewImage && (
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="mt-2 w-32 h-32 object-cover"
                      />
                    )}
                  </div>
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsCreateOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleCreateBlog}>Create Blog Post</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="overflow-hidden h-full">
                  <div className="relative h-48">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 space-x-2">
                      <Badge className={getStatusColor(blog.status)}>
                        {blog.status}
                      </Badge>
                      <Badge variant="secondary">{blog.category}</Badge>
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-xl line-clamp-2">
                      {blog.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {blog.excerpt}
                    </p>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <User className="w-4 h-4 mr-2" />
                        {blog.author}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(blog.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Eye className="w-4 h-4 mr-2" />
                        {blog.views} views
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleViewBlog(blog)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditBlog(blog)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteBlog(blog._id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Edit Blog Dialog */}
          <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit Blog Post</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="edit-title">Title</Label>
                  <Input
                    id="edit-title"
                    value={newBlog.title}
                    onChange={(e) =>
                      setNewBlog((prev) => ({ ...prev, title: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="edit-excerpt">Excerpt</Label>
                  <Textarea
                    id="edit-excerpt"
                    value={newBlog.excerpt}
                    onChange={(e) =>
                      setNewBlog((prev) => ({
                        ...prev,
                        excerpt: e.target.value,
                      }))
                    }
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-content">Content</Label>
                  <Textarea
                    id="edit-content"
                    value={newBlog.content}
                    onChange={(e) =>
                      setNewBlog((prev) => ({
                        ...prev,
                        content: e.target.value,
                      }))
                    }
                    placeholder="Paste content here. Lists (•) and short headings will be auto-formatted to HTML."
                    rows={6}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-author">Author</Label>
                    <Input
                      id="edit-author"
                      value={newBlog.author}
                      onChange={(e) =>
                        setNewBlog((prev) => ({
                          ...prev,
                          author: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-category">Category</Label>
                    <select
                      id="edit-category"
                      value={newBlog.category}
                      onChange={(e) =>
                        setNewBlog((prev) => ({
                          ...prev,
                          category: e.target.value,
                        }))
                      }
                      className="w-full p-2 border rounded-md"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="edit-status">Status</Label>
                  <select
                    id="edit-status"
                    value={newBlog.status}
                    onChange={(e) =>
                      setNewBlog((prev) => ({
                        ...prev,
                        status: e.target.value,
                      }))
                    }
                    className="w-full p-2 border rounded-md"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="edit-date">Date</Label>
                  <Input
                    id="edit-date"
                    type="date"
                    value={newBlog.date}
                    onChange={(e) =>
                      setNewBlog((prev) => ({ ...prev, date: e.target.value }))
                    }
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="edit-image">Blog Image</Label>
                  {previewImage && (
                    <img
                      src={previewImage}
                      alt="Current or Preview"
                      className="mt-2 w-32 h-32 object-cover"
                    />
                  )}
                  <Input
                    id="edit-image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUpdateBlog}>Update Blog Post</Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* View Blog Dialog */}
          <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              {" "}
              {/* Reduced height and scrollable */}
              <DialogHeader>
                <DialogTitle>{selectedBlog?.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 p-4">
                <img
                  src={selectedBlog?.image}
                  alt={selectedBlog?.title}
                  className="w-full h-64 object-cover rounded"
                />
                <p>
                  <strong>Description:</strong> {selectedBlog?.excerpt}
                </p>
                <p>
                  <strong>Content:</strong> {selectedBlog?.content}
                </p>
                <p>
                  <strong>Author:</strong> {selectedBlog?.author}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {selectedBlog?.date
                    ? new Date(selectedBlog.date).toLocaleDateString()
                    : ""}
                </p>
                <p>
                  <strong>Category:</strong> {selectedBlog?.category}
                </p>
                <p>
                  <strong>Status:</strong> {selectedBlog?.status}
                </p>
                <p>
                  <strong>Views:</strong> {selectedBlog?.views}
                </p>
              </div>
              <div className="flex justify-end mt-4 p-4">
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

export default AdminBlog;
