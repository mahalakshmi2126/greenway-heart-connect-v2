import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CheckCircle, Users, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface JoinEventDialogProps {
  eventId: number;
  eventTitle: string;
  onRegister: (eventId: number) => void;
}

const JoinEventDialog: React.FC<JoinEventDialogProps> = ({ eventId, eventTitle, onRegister }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Simulate registration
    setIsRegistered(true);
    onRegister(eventId);
    
    toast({
      title: "Registration Successful!",
      description: `You have been registered for ${eventTitle}`,
    });

    // Reset form after a delay
    setTimeout(() => {
      setIsRegistered(false);
      setIsOpen(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 3000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full btn-hover">
          <Users className="w-4 h-4 mr-2" />
          Read More
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Register for Event</DialogTitle>
        </DialogHeader>
        
        {!isRegistered ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Register for: <strong>{eventTitle}</strong>
            </p>
            
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                placeholder="Enter your full name"
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({...prev, phone: e.target.value}))}
                placeholder="Enter your phone number"
              />
            </div>
            
            <div>
              <Label htmlFor="message">Additional Message (Optional)</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData(prev => ({...prev, message: e.target.value}))}
                placeholder="Any special requirements or questions?"
                rows={3}
              />
            </div>
            
            <div className="flex space-x-2 pt-4">
              <Button variant="outline" onClick={() => setIsOpen(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleSubmit} className="flex-1">
                Register
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-primary mb-2">
              Registration Successful!
            </h3>
            <p className="text-muted-foreground mb-4">
              Thank you for registering for {eventTitle}. We'll send you more details via email.
            </p>
            <p className="text-sm text-muted-foreground">
              This dialog will close automatically...
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default JoinEventDialog;