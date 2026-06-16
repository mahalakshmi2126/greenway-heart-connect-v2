import { useState } from "react";
import { MessageCircle, X, Send, Heart, Users, Calendar, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: "bot",
      content: "Hi Sir/Mam 👋 How can we help you?",
      timestamp: Date.now()
    }
  ]);

  const quickActions = [
    {
      label: "Make Donation",
      icon: Heart,
      action: () => window.location.href = "/donate"
    },
    {
      label: "Volunteer",
      icon: Users,
      action: () => window.location.href = "/volunteer"
    },
    {
      label: "View Events",
      icon: Calendar,
      action: () => window.location.href = "/events"
    },
    {
      label: "Contact Us",
      icon: Phone,
      action: () => window.location.href = "/contact"
    }
  ];

  const handleQuickAction = (action: () => void, label: string) => {
    setMessages(prev => [...prev, 
      { type: "user", content: label, timestamp: Date.now() },
      { type: "bot", content: "Redirecting you now...", timestamp: Date.now() + 1 }
    ]);
    setTimeout(action, 1500);
  };

  const handleWhatsAppRedirect = () => {
    const whatsappNumber = "+15551234567"; // Replace with actual WhatsApp number
    const message = "Hi! I need help with GreenWay Trust services.";
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    
    setMessages(prev => [...prev, 
      { type: "user", content: "Chat on WhatsApp", timestamp: Date.now() },
      { type: "bot", content: "Opening WhatsApp chat...", timestamp: Date.now() + 1 }
    ]);
    
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setIsOpen(false);
    }, 1500);
  };

  if (!isOpen) {
    return (
      <div 
        className="chatbot-popup"
        onClick={() => setIsOpen(true)}
        role="button"
        tabIndex={0}
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6" />
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className="w-80 max-h-96 shadow-xl border-2 border-accent/20">
        <CardHeader className="bg-gradient-to-r from-primary to-accent text-primary-foreground p-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">GreenWay Trust Chat</CardTitle>
            <button
              onClick={() => setIsOpen(false)}
              className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {/* Messages */}
          <div className="h-48 overflow-y-auto p-4 space-y-3">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg text-sm ${
                    message.type === 'user'
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="border-t p-4 space-y-3">
            <p className="text-sm text-muted-foreground text-center">
              How can we help you today?
            </p>
            
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs h-auto py-2 px-3"
                  onClick={() => handleQuickAction(action.action, action.label)}
                >
                  <action.icon className="w-3 h-3 mr-1" />
                  {action.label}
                </Button>
              ))}
            </div>

            <Button
              className="w-full btn-hover"
              onClick={handleWhatsAppRedirect}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat on WhatsApp
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Chatbot;