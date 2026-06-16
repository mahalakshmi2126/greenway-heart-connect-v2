import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, FileText, Download, Loader2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import heroBackground from "@/assets/hero-background.jpg";

const API_BASE = import.meta.env.VITE_API_BASE;

const Financials = () => {
    const [financials, setFinancials] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <Navigation />

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
                <div className="relative z-10 text-center text-white px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Financial Reports & Audits
                        </h1>
                        <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
                            Transparency is our core value. View our annual financial reports and audit statements.
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="container py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-primary mb-4">Annual Reports</h2>
                        <div className="w-20 h-1 bg-accent mx-auto rounded-full"></div>
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center py-12">
                            <Loader2 className="w-8 h-8 animate-spin text-primary" />
                        </div>
                    ) : financials.length === 0 ? (
                        <div className="text-center py-12 border rounded-lg bg-muted/20 max-w-2xl mx-auto">
                            <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                            <h3 className="text-lg font-medium">No reports available</h3>
                            <p className="text-muted-foreground">
                                Financial reports will be uploaded soon.
                            </p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {financials.map((item, index) => (
                                <motion.div
                                    key={item._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                >
                                    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300 border-t-4 border-t-primary">
                                        <CardHeader className="pb-2">
                                            <div className="flex justify-between items-start">
                                                <Badge variant="secondary" className="mb-2 text-sm px-3 py-1">
                                                    <Calendar className="w-3 h-3 mr-2" />
                                                    {item.year}
                                                </Badge>
                                            </div>
                                            <CardTitle className="text-xl">Annual Financial Report</CardTitle>
                                        </CardHeader>
                                        <CardContent className="flex-1 flex flex-col">
                                            <p className="text-muted-foreground text-sm mb-6 flex-1 leading-relaxed">
                                                {item.description}
                                            </p>
                                            <div className="mt-auto">
                                                <Button className="w-full btn-hover group" asChild>
                                                    <a
                                                        href={item.pdf} // No replace needed anymore
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center justify-center font-medium"
                                                    >
                                                        <FileText className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                                                        View Report
                                                    </a>
                                                </Button>
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

export default Financials;
