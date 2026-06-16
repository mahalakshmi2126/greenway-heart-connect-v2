import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Eye, Download, Search, Heart, User } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import heroBackground from "@/assets/Photos/Main4.JPG";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

const AdminDonate = () => {
  const [donations, setDonations] = useState([]);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");

  // ✅ Fetch donations from backend
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const token = localStorage.getItem("token"); // 🔑 JWT token get pannum
        const res = await axios.get(
          `${API_BASE}/donations/all`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // ✅ Protect header
            },
          }
        );
        // ✅ CORRECT
        setDonations(res.data.donations || []);
      } catch (err) {
        console.error("Error fetching donations:", err);
        if (err.response && err.response.status === 401) {
          alert("Session expired. Please login again.");
          localStorage.removeItem("token");
          window.location.href = "/admin-login";
        }
      }
    };

    fetchDonations();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    window.location.href = "/";
  };

  const handleViewDonation = (donation) => {
    setSelectedDonation(donation);
    setIsViewOpen(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-500 text-white";
      case "processing":
        return "bg-yellow-500 text-white";
      case "delivered":
        return "bg-blue-500 text-white";
      case "cancelled":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  // ✅ Export donations to CSV
  const handleExport = () => {
    if (filteredDonations.length === 0) {
      alert("No donations to export!");
      return;
    }

    const headers = [
      "Donor Name",
      "Donor Email",
      "Donor Phone",
      "Amount",
      "Purpose",
      "Parcel Name",
      "Count",
      "Status",
      "Transaction ID",
      "Service Date",
    ];

    const rows = filteredDonations.map((d) => [
      d.donorName,
      d.donorEmail,
      d.donorPhone,
      d.totalAmount,
      d.cause,
      d.parcelName,
      d.count,
      d.status,
      d.transactionId,
      d.serviceDate ? new Date(d.serviceDate).toLocaleDateString() : "N/A",
    ]);

    // Build CSV string
    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    // Download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "donations_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ✅ Export selected donation as CSV
  const handleExportSingle = () => {
    if (!selectedDonation) return;

    const headers = [
      "Donor Name",
      "Donor Email",
      "Donor Phone",
      "Amount",
      "Purpose",
      "Parcel Name",
      "Count",
      "Status",
      "Transaction ID",
      "Service Date",
    ];

    const row = [
      selectedDonation.donorName,
      selectedDonation.donorEmail,
      selectedDonation.donorPhone,
      selectedDonation.totalAmount,
      selectedDonation.cause,
      selectedDonation.parcelName,
      selectedDonation.count,
      selectedDonation.status,
      selectedDonation.transactionId,
      selectedDonation.serviceDate ? new Date(selectedDonation.serviceDate).toLocaleDateString() : "N/A",
    ];

    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, row].map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${selectedDonation.donorName}_donation.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredDonations = donations.filter((donation) => {
    const matchesSearch =
      donation.donorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.donorEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.cause?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || donation.status === statusFilter;

    const matchesDate =
      !dateFilter ||
      (donation.serviceDate && new Date(donation.serviceDate).toISOString().slice(0, 7) === dateFilter);

    return matchesSearch && matchesStatus && matchesDate;
  });

  const totalDonations = donations.reduce(
    (sum, donation) => sum + (donation.totalAmount || 0),
    0
  );
  const totalDonors = new Set(donations.map((d) => d.donorEmail)).size;

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
        <div className="absolute inset-0 bg-primary/40"></div>
        <div className="relative z-10 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold mb-4">Donations Management</h1>
            <p className="text-xl opacity-90">
              Track and manage all donation records
            </p>
          </motion.div>
        </div>
      </div>

      <div className="section-padding">
        <div className="container">
          {/* Statistics */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary flex items-center justify-center">
                  ₹{totalDonations.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Donations
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-green-600 flex items-center justify-center">
                  <User className="w-6 h-6 mr-1" />
                  {totalDonors}
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Donors
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-blue-600 flex items-center justify-center">
                  <Heart className="w-6 h-6 mr-1" />
                  {donations.length}
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Donations Count
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {donations.filter((d) => d.status === "completed").length}
                </div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search donations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            {/* <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="p-2 border rounded-md"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="processing">Processing</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select> */}
            <Input
              type="month"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              placeholder="Filter by month"
            />
            <Button variant="outline" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
          </div>

          {/* Donations Table */}
          <Card>
            <CardHeader>
              <CardTitle>
                Donation Records ({filteredDonations.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Donor Name</th>
                      <th className="text-left p-2">Amount</th>
                      <th className="text-left p-2">Purpose</th>
                      <th className="text-left p-2">Date</th>
                      <th className="text-left p-2">Status</th>
                      <th className="text-left p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDonations.length === 0 ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="text-center text-black  py-6 font-bold"
                        >
                          No record found
                        </td>
                      </tr>
                    ) : (
                      filteredDonations.map((donation) => (
                        <tr
                          key={donation._id}
                          className="border-b hover:bg-muted/50"
                        >
                          <td className="p-2">
                            <div>
                              <div className="font-medium">
                                {donation.donorName}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {donation.donorEmail}
                              </div>
                            </div>
                          </td>
                          <td className="p-2 font-semibold">
                            ₹{donation.totalAmount.toLocaleString()}
                          </td>
                          <td className="p-2">
                            <div>
                              <div className="font-medium">
                                {donation.cause}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {donation.parcelName} (x{donation.count})
                              </div>
                            </div>
                          </td>
                          <td className="p-2">
                            {donation.serviceDate ? new Date(donation.serviceDate).toLocaleDateString() : "N/A"}
                          </td>
                          <td className="p-2">
                            <Badge className={getStatusColor(donation.status)}>
                              {donation.status}
                            </Badge>
                          </td>
                          <td className="p-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewDonation(donation)}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* View Donation Dialog */}
          <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Donation Details</DialogTitle>
              </DialogHeader>
              {selectedDonation && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold text-primary mb-2">
                        Donor Information
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div>
                          <strong>Name:</strong> {selectedDonation.donorName}
                        </div>
                        <div>
                          <strong>Email:</strong> {selectedDonation.donorEmail}
                        </div>
                        <div>
                          <strong>Phone:</strong> {selectedDonation.donorPhone}
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-2">
                        Donation Details
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div>
                          <strong>Amount:</strong> ₹
                          {selectedDonation.totalAmount.toLocaleString()}
                        </div>
                        <div>
                          <strong>Purpose:</strong> {selectedDonation.cause}
                        </div>
                        <div>
                          <strong>Parcel:</strong> {selectedDonation.parcelName}
                        </div>
                        <div>
                          <strong>Count:</strong> {selectedDonation.count}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold text-primary mb-2">
                        Important Dates
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div>
                          <strong>Service Date:</strong>{" "}
                          {selectedDonation.serviceDate ? new Date(
                            selectedDonation.serviceDate
                          ).toLocaleDateString() : "N/A"}
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-2">
                        Payment Information
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div>
                          <strong>Transaction ID:</strong>{" "}
                          {selectedDonation.transactionId}
                        </div>
                        <div>
                          <strong>Status:</strong>
                          <Badge
                            className={`ml-2 ${getStatusColor(
                              selectedDonation.status
                            )}`}
                          >
                            {selectedDonation.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center mr-32 mt-4">
                    <Button variant="outline" onClick={handleExportSingle}>
                      <Download className="w-4 h-4 mr-2" />
                      Export This Donation
                    </Button>
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

export default AdminDonate;