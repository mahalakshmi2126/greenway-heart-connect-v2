import React, { useState } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const BeneficiaryRegistration = () => {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        fullName: "",
        age: "",
        gender: "",
        contactNumber: "",
        address: "",

        category: "",
        disabilityType: "",
        disabilityPercentage: "",

        educationLevel: "",
        occupation: "",
        monthlyIncome: "",
        familyIncome: "",
        rationCard: "",

        bankName: "",
        accountNumber: "",
        ifscCode: "",

        declarationAccepted: false,
    });

    const [programs, setPrograms] = useState<string[]>([]);
    const [needs, setNeeds] = useState<string[]>([]);

    const programOptions = ["Sports Training", "Skill Development", "Employment Support", "Awareness Program"];
    const needsOptions = ["Job", "Assistive Devices", "Training", "Medical", "Education", "Sports"];
    const categoryOptions = ["Person with Disability (PWD)", "Caregiver", "Student", "Volunteer", "Other"];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: string, value: string | boolean) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleProgramToggle = (program: string) => {
        setPrograms((prev) =>
            prev.includes(program) ? prev.filter((p) => p !== program) : [...prev, program]
        );
    };

    const handleNeedToggle = (need: string) => {
        setNeeds((prev) =>
            prev.includes(need) ? prev.filter((n) => n !== need) : [...prev, need]
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.declarationAccepted) {
            toast({
                title: "Declaration Required",
                description: "Please accept the declaration to proceed.",
                variant: "destructive",
            });
            return;
        }

        setIsSubmitting(true);
        // Simulate API call for now since backend route for beneficiary is pending
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            toast({
                title: "Registration Successful",
                description: "Your beneficiary application has been submitted successfully.",
            });
        }, 1500);
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <Navigation />
                <div className="flex-1 flex items-center justify-center section-padding">
                    <Card className="max-w-md w-full text-center p-8 bg-green-50">
                        <h2 className="text-3xl font-bold text-green-700 mb-4">Registration Complete</h2>
                        <p className="text-gray-600 mb-6">
                            Thank you for registering with GreenWay Trust. Your application is under review.
                        </p>
                        <Button onClick={() => window.location.reload()} variant="outline">
                            Register Another Beneficiary
                        </Button>
                    </Card>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navigation />

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary/10 to-accent/10 py-32 text-center">
                <div className="container">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <h1 className="text-4xl font-bold text-primary mb-4">Beneficiary Registration</h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Please fill out the form below to register as a beneficiary for our NGO programs. Ensure all details are accurate.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Form Section */}
            <section className="section-padding flex-1">
                <div className="container max-w-4xl">
                    <form onSubmit={handleSubmit} className="space-y-8">

                        {/* 1. Basic Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Basic Information</CardTitle>
                                <CardDescription>Personal details of the beneficiary.</CardDescription>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Label>Full Name *</Label>
                                    <Input name="fullName" value={formData.fullName} onChange={handleInputChange} required />
                                </div>
                                <div>
                                    <Label>Age *</Label>
                                    <Input name="age" type="number" value={formData.age} onChange={handleInputChange} required />
                                </div>
                                <div>
                                    <Label>Gender *</Label>
                                    <Select onValueChange={(val) => handleSelectChange("gender", val)}>
                                        <SelectTrigger><SelectValue placeholder="Select Gender" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Male">Male</SelectItem>
                                            <SelectItem value="Female">Female</SelectItem>
                                            <SelectItem value="Other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label>Contact Number *</Label>
                                    <Input name="contactNumber" type="tel" value={formData.contactNumber} onChange={handleInputChange} required />
                                </div>
                                <div className="md:col-span-2">
                                    <Label>Full Address *</Label>
                                    <Input name="address" value={formData.address} onChange={handleInputChange} required />
                                </div>
                            </CardContent>
                        </Card>

                        {/* 2. Category of Beneficiary */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Category of Beneficiary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <Select onValueChange={(val) => handleSelectChange("category", val)}>
                                        <SelectTrigger><SelectValue placeholder="Select Category" /></SelectTrigger>
                                        <SelectContent>
                                            {categoryOptions.map((cat) => (
                                                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {formData.category === "Person with Disability (PWD)" && (
                                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-accent/5 rounded-lg border">
                                        <div>
                                            <Label>Type of Disability</Label>
                                            <Input name="disabilityType" value={formData.disabilityType} onChange={handleInputChange} />
                                        </div>
                                        <div>
                                            <Label>Percentage (%)</Label>
                                            <Input name="disabilityPercentage" type="number" value={formData.disabilityPercentage} onChange={handleInputChange} />
                                        </div>
                                        <div>
                                            <Label>UDID Card / Certificate Upload</Label>
                                            <Input type="file" accept="image/*,.pdf" className="cursor-pointer" />
                                        </div>
                                    </motion.div>
                                )}
                            </CardContent>
                        </Card>

                        {/* 3. Socio-Economic Details */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Socio-Economic Details</CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Label>Education Level</Label>
                                    <Input name="educationLevel" value={formData.educationLevel} onChange={handleInputChange} />
                                </div>
                                <div>
                                    <Label>Occupation</Label>
                                    <Input name="occupation" value={formData.occupation} onChange={handleInputChange} />
                                </div>
                                <div>
                                    <Label>Monthly Income</Label>
                                    <Input name="monthlyIncome" type="number" placeholder="₹" value={formData.monthlyIncome} onChange={handleInputChange} />
                                </div>
                                <div>
                                    <Label>Family Income</Label>
                                    <Input name="familyIncome" type="number" placeholder="₹" value={formData.familyIncome} onChange={handleInputChange} />
                                </div>
                                <div className="md:col-span-2">
                                    <Label>BPL / Ration Card Number (Optional)</Label>
                                    <Input name="rationCard" value={formData.rationCard} onChange={handleInputChange} />
                                </div>
                            </CardContent>
                        </Card>

                        {/* 4. Programs & Needs */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Programs & Support</CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <Label className="text-base mb-3 block">Programs Enrolled</Label>
                                    <div className="space-y-3">
                                        {programOptions.map((prog) => (
                                            <div key={prog} className="flex items-center space-x-2">
                                                <Checkbox id={`prog-${prog}`} onCheckedChange={() => handleProgramToggle(prog)} />
                                                <Label htmlFor={`prog-${prog}`} className="font-normal cursor-pointer">{prog}</Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <Label className="text-base mb-3 block">What support do you need?</Label>
                                    <div className="space-y-3">
                                        {needsOptions.map((need) => (
                                            <div key={need} className="flex items-center space-x-2">
                                                <Checkbox id={`need-${need}`} onCheckedChange={() => handleNeedToggle(need)} />
                                                <Label htmlFor={`need-${need}`} className="font-normal cursor-pointer">{need}</Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* 5. Bank Details */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Bank Details (For Financial Support)</CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <Label>Bank Name</Label>
                                    <Input name="bankName" value={formData.bankName} onChange={handleInputChange} />
                                </div>
                                <div>
                                    <Label>Account Number</Label>
                                    <Input name="accountNumber" type="password" value={formData.accountNumber} onChange={handleInputChange} />
                                </div>
                                <div>
                                    <Label>IFSC Code</Label>
                                    <Input name="ifscCode" value={formData.ifscCode} onChange={handleInputChange} />
                                </div>
                            </CardContent>
                        </Card>

                        {/* 6. Documents & Declaration */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Documents & Declaration</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-muted/50 rounded-lg">
                                    <div>
                                        <Label>Aadhaar Card Upload</Label>
                                        <Input type="file" accept="image/*,.pdf" className="cursor-pointer bg-white" />
                                    </div>
                                    <div>
                                        <Label>Full Size Photograph</Label>
                                        <Input type="file" accept="image/*" className="cursor-pointer bg-white" />
                                    </div>
                                    <div>
                                        <Label>Signature Upload</Label>
                                        <Input type="file" accept="image/*" className="cursor-pointer bg-white" />
                                    </div>
                                </div>

                                <div className="p-4 border border-primary/20 rounded-lg bg-primary/5">
                                    <div className="flex items-start space-x-3">
                                        <Checkbox
                                            id="declaration"
                                            checked={formData.declarationAccepted}
                                            onCheckedChange={(checked) => handleSelectChange("declarationAccepted", checked === true)}
                                            className="mt-1"
                                        />
                                        <Label htmlFor="declaration" className="font-normal leading-relaxed cursor-pointer text-sm md:text-base">
                                            I hereby declare that the information provided by me is true and correct to the best of my knowledge. I understand that any false information may lead to cancellation of my registration.
                                        </Label>
                                    </div>
                                </div>

                                <Button type="submit" className="w-full text-lg py-6 btn-hover" disabled={isSubmitting}>
                                    {isSubmitting ? "Submitting..." : "Submit Registration"}
                                </Button>
                            </CardContent>
                        </Card>

                    </form>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default BeneficiaryRegistration;
