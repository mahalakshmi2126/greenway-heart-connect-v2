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
import { Plus, Trash2, Edit, Calendar, FileText, Download, Loader2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import heroBackground from "@/assets/Finacials Reports & Audits.png";

const API_BASE = import.meta.env.VITE_API_BASE;

const AdminFinancial = () => {
    const navigate = useNavigate();
    const [financials, setFinancials] = useState([]);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [newFinancial, setNewFinancial] = useState({
        year: "",
        description: "",
    });
    const [pdfFile, setPdfFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Edit State
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editingFinancial, setEditingFinancial] = useState(null);
    const [editYear, setEditYear] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editPdfFile, setEditPdfFile] = useState(null);

    useEffect(() => {
        fetchFinancials();
    }, []);

    const fetchFinancials = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${API_BASE}/financials`);
            setFinancials(response.data.data);
        } catch (error) {
            console.error("Error fetching financial reports:", error);
            toast.error("Failed to fetch reports");
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("isAdmin");
        localStorage.removeItem("token");
        navigate("/");
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.type !== "application/pdf") {
            toast.error("Please upload a PDF file only");
            e.target.value = null;
            return;
        }

        // Check file size (10MB = 10 * 1024 * 1024 bytes)
        const MAX_SIZE = 10 * 1024 * 1024;
        if (file.size > MAX_SIZE) {
            toast.error("File size is too large. Maximum limit is 10MB.");
            e.target.value = null; // Reset input
            return;
        }

        setPdfFile(file);
    };

    const handleCreateFinancial = async () => {
        if (!newFinancial.year || !newFinancial.description || !pdfFile) {
            toast.error("All fields including PDF are required");
            return;
        }

        try {
            setIsSubmitting(true);
            const formData = new FormData();
            formData.append("year", newFinancial.year);
            formData.append("description", newFinancial.description);
            formData.append("pdf", pdfFile);

            const token = localStorage.getItem("token");
            await axios.post(`${API_BASE}/financials/add`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });

            toast.success("Financial report added successfully!");
            setNewFinancial({ year: "", description: "" });
            setPdfFile(null);
            setIsCreateOpen(false);
            fetchFinancials();
        } catch (error) {
            console.error("Error creating report:", error);
            toast.error(error.response?.data?.message || "Error adding report");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteFinancial = async (id) => {
        if (!window.confirm("Are you sure you want to delete this report?")) return;

        try {
            const token = localStorage.getItem("token");
            await axios.delete(`${API_BASE}/financials/delete/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setFinancials(financials.filter((item) => item._id !== id));
            toast.success("Report deleted!");
        } catch (error) {
            console.error("Error deleting report:", error);
            toast.error("Error deleting report");
        }
    };

    const handleEditClick = (item) => {
        setEditingFinancial(item);
        setEditYear(item.year);
        setEditDescription(item.description);
        setEditPdfFile(null);
        setIsEditOpen(true);
    };

    const handleUpdateFinancial = async () => {
        if (!editYear || !editDescription) {
            toast.error("Year and description are required");
            return;
        }

        try {
            setIsSubmitting(true);
            const formData = new FormData();
            formData.append("year", editYear);
            formData.append("description", editDescription);
            if (editPdfFile) {
                formData.append("pdf", editPdfFile);
            }

            const token = localStorage.getItem("token");
            await axios.put(`${API_BASE}/financials/update/${editingFinancial._id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });

            toast.success("Financial report updated!");
            setIsEditOpen(false);
            fetchFinancials();
        } catch (error) {
            console.error("Error updating report:", error);
            toast.error(error.response?.data?.message || "Error updating report");
        } finally {
            setIsSubmitting(false);
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
                <div className="absolute inset-0 bg-primary/40"></div>
                <div className="relative z-10 text-center text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl font-bold mb-4">Financial Management</h1>
                        <p className="text-xl opacity-90">
                            Manage annual reports and financial documents
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
                            <h2 className="text-2xl font-semibold">Financial Reports</h2>
                            <p className="text-muted-foreground">
                                Upload and manage PDF reports
                            </p>
                        </div>

                        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                            <DialogTrigger asChild>
                                <Button className="btn-hover">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Upload New Report
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[500px]">
                                <DialogHeader>
                                    <DialogTitle>Upload Financial Report</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                    <div>
                                        <Label htmlFor="year">Financial Year</Label>
                                        <Input
                                            id="year"
                                            placeholder="e.g. 2023-2024"
                                            value={newFinancial.year}
                                            onChange={(e) =>
                                                setNewFinancial({ ...newFinancial, year: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea
                                            id="description"
                                            placeholder="Brief description of the report"
                                            value={newFinancial.description}
                                            onChange={(e) =>
                                                setNewFinancial({
                                                    ...newFinancial,
                                                    description: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="pdf">PDF Document</Label>
                                        <Input
                                            id="pdf"
                                            type="file"
                                            accept="application/pdf"
                                            onChange={handleFileChange}
                                            className="cursor-pointer"
                                        />
                                        <p className="text-xs text-muted-foreground mt-1">
                                            Only PDF files allowed
                                        </p>
                                    </div>
                                </div>
                                <div className="flex justify-end space-x-2">
                                    <Button
                                        variant="outline"
                                        onClick={() => setIsCreateOpen(false)}
                                        disabled={isSubmitting}
                                    >
                                        Cancel
                                    </Button>
                                    <Button onClick={handleCreateFinancial} disabled={isSubmitting}>
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                Uploading...
                                            </>
                                        ) : (
                                            "Upload Report"
                                        )}
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>

                        {/* Edit Dialog */}
                        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                            <DialogContent className="sm:max-w-[500px]">
                                <DialogHeader>
                                    <DialogTitle>Edit Financial Report</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                    <div>
                                        <Label htmlFor="editYear">Financial Year</Label>
                                        <Input
                                            id="editYear"
                                            value={editYear}
                                            onChange={(e) => setEditYear(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="editDescription">Description</Label>
                                        <Textarea
                                            id="editDescription"
                                            value={editDescription}
                                            onChange={(e) => setEditDescription(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="editPdf">PDF Document (Leave blank to keep current)</Label>
                                        <Input
                                            id="editPdf"
                                            type="file"
                                            accept="application/pdf"
                                            onChange={(e) => setEditPdfFile(e.target.files[0])}
                                            className="cursor-pointer"
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end space-x-2">
                                    <Button
                                        variant="outline"
                                        onClick={() => setIsEditOpen(false)}
                                        disabled={isSubmitting}
                                    >
                                        Cancel
                                    </Button>
                                    <Button onClick={handleUpdateFinancial} disabled={isSubmitting}>
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                Updating...
                                            </>
                                        ) : (
                                            "Update Report"
                                        )}
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>

                    {/* Reports Grid */}
                    {isLoading ? (
                        <div className="flex justify-center py-12">
                            <Loader2 className="w-8 h-8 animate-spin text-primary" />
                        </div>
                    ) : financials.length === 0 ? (
                        <div className="text-center py-12 border rounded-lg bg-muted/20">
                            <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                            <h3 className="text-lg font-medium">No reports found</h3>
                            <p className="text-muted-foreground">
                                Upload a financial report to get started.
                            </p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {financials.map((item) => (
                                <motion.div
                                    key={item._id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Card className="h-full flex flex-col">
                                        <CardHeader className="pb-2">
                                            <div className="flex justify-between items-start">
                                                <Badge variant="outline" className="mb-2">
                                                    <Calendar className="w-3 h-3 mr-1" />
                                                    {item.year}
                                                </Badge>
                                                <div className="flex space-x-1">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-primary hover:text-primary/90 hover:bg-primary/10"
                                                        onClick={() => handleEditClick(item)}
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                                                        onClick={() => handleDeleteFinancial(item._id)}
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                            <CardTitle className="text-xl">Financial Report</CardTitle>
                                        </CardHeader>
                                        <CardContent className="flex-1 flex flex-col">
                                            <p className="text-muted-foreground text-sm mb-4 flex-1">
                                                {item.description}
                                            </p>
                                            <div className="mt-auto pt-4 border-t">
                                                <Button className="w-full btn-hover group" asChild>
                                                    <a
                                                        href={item.pdf}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center justify-center font-medium"
                                                    >
                                                        <FileText className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                                                        View Report
                                                    </a>
                                                </Button>
                                                <p className="text-xs text-muted-foreground text-center mt-2">
                                                    Uploaded on {new Date(item.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>

            <Footer />
        </div>
    );
};

export default AdminFinancial;
