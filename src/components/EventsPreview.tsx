// import { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Calendar, MapPin, Clock, Users, ArrowRight } from "lucide-react";
// import JoinEventDialog from "./JoinEventDialog";
// import axios from "axios";

// const API_BASE = import.meta.env.VITE_API_BASE;

// const EventsPreview = () => {
//   const [events, setEvents] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const isAdmin = Boolean(localStorage.getItem("token"));
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const response = await axios.get(
//           `${API_BASE}/events/get`
//         );
//         const latestEvents = response.data.slice(0, 3);
//         setEvents(latestEvents);
//       } catch (err) {
//         setError("Failed to fetch events. Please try again later.");
//         console.error("Error fetching events:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchEvents();
//   }, []);

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "upcoming":
//         return "bg-accent text-accent-foreground";
//       case "ongoing":
//         return "bg-primary text-primary-foreground";
//       case "completed":
//         return "bg-muted text-muted-foreground";
//       default:
//         return "bg-muted text-muted-foreground";
//     }
//   };

//   const getAvailabilityPercentage = (attendees: number, max: number) => {
//     return ((max - attendees) / max) * 100;
//   };

//   const handleEventRegistration = (eventId: number) => {
//     setEvents((prev) =>
//       prev.map((event) =>
//         event.id === eventId
//           ? { ...event, attendees: event.attendees + 1 }
//           : event
//       )
//     );
//   };

//   if (loading) {
//     return (
//       <section className="section-padding bg-primary-lighter/20">
//         <div className="container text-center py-12">
//           <p className="text-muted-foreground">Loading events...</p>
//         </div>
//       </section>
//     );
//   }

//   if (error) {
//     return (
//       <section className="section-padding bg-primary-lighter/20">
//         <div className="container text-center py-12">
//           <p className="text-red-500">{error}</p>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="section-padding bg-primary-lighter/20">
//       <div className="container">
//         {/* Heading */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-12"
//         >
//           <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
//             Latest Programs
//           </h2>
//           <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
//             Join our community events and be part of the positive change.
//             Together we can make a greater impact.
//           </p>
//         </motion.div>

//         {/* Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
//           {events.map((event, index) => (
//             <motion.div
//               key={event._id}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: index * 0.1 }}
//               className="h-full"
//             >
//               <Card className="h-full flex flex-col">
//                 <CardHeader>
//                   <div className="flex items-start justify-between mb-2 flex-wrap gap-2">
//                     <Badge className={getStatusColor(event.status)}>
//                       {event.status?.charAt(0).toUpperCase() +
//                         event.status?.slice(1)}
//                     </Badge>
//                     <Badge variant="outline" className="text-xs">
//                       {event.category}
//                     </Badge>
//                   </div>
//                   <CardTitle className="text-lg md:text-xl text-primary line-clamp-2">
//                     {event.title}
//                   </CardTitle>
//                 </CardHeader>

//                 <CardContent className="space-y-4 flex-grow">
//                   <p className="text-muted-foreground line-clamp-3 leading-relaxed text-sm md:text-base">
//                     {event.description}
//                   </p>

//                   <div className="space-y-2 text-xs md:text-sm">
//                     <div className="flex items-center gap-2 text-muted-foreground">
//                       <Calendar className="w-4 h-4 text-primary" />
//                       <span>{new Date(event.date).toLocaleDateString([], { year: "numeric", month: "short", day: "numeric" })}</span>
//                     </div>
//                     <div className="flex items-center gap-2 text-muted-foreground">
//                       <Clock className="w-4 h-4 text-primary" />
//                       <span>{event.time}</span>
//                     </div>
//                     <div className="flex items-center gap-2 text-muted-foreground">
//                       <MapPin className="w-4 h-4 text-primary" />
//                       <span>{event.location}</span>
//                     </div>
//                     {/* <div className="flex items-center gap-2 text-muted-foreground">
//                       <Users className="w-4 h-4 text-primary" />
//                       <span>
//                         {Math.min(getAvailabilityPercentage(event.attendees, event.maxAttendees), 100)} registered
//                       </span>
//                     </div> */}
//                   </div>

//                   {/* Availability indicator */}
//                   {/* <div className="space-y-1">
//                     <div className="flex justify-between text-xs text-muted-foreground">
//                       <span>Availability</span>
//                       <span>
//                         {Math.round(
//                           getAvailabilityPercentage(
//                             event.attendees,
//                             event.maxAttendees
//                           )
//                         )}
//                         % available
//                       </span>
//                     </div>
//                     <div className="w-full bg-muted rounded-full h-1 sm:h-1.5">
//                       <div
//                         className="bg-accent h-1 sm:h-1.5 rounded-full transition-all duration-300"
//                         style={{
//                           width: `${getAvailabilityPercentage(
//                             event.attendees,
//                             event.maxAttendees
//                           )}%`,
//                         }}
//                       ></div>
//                     </div>
//                   </div> */}
//                 </CardContent>

//                 <CardFooter>
//                   {isAdmin ? (
//                     <Button
//                       className="w-full sm:w-auto btn-hover"
//                       onClick={() => navigate("/admin/programs")}
//                     >
//                       Manage Program
//                     </Button>
//                   ) : (
//                     <JoinEventDialog
//                       eventId={event._id}
//                       eventTitle={event.title}
//                       onRegister={handleEventRegistration}
//                     />
//                   )}
//                 </CardFooter>
//               </Card>
//             </motion.div>
//           ))}
//         </div>

//         {/* View All Button */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.4 }}
//           className="text-center mt-12"
//         >
//           <Button variant="outline" size="lg" asChild className="btn-hover">
//             <Link to={isAdmin ? "/admin/programs" : "/programs"}>
//               View All Programs
//               <ArrowRight className="w-5 h-5 ml-2" />
//             </Link>
//           </Button>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default EventsPreview;





import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, Users, ArrowRight } from "lucide-react";
import JoinEventDialog from "./JoinEventDialog";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

const EventsPreview = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isAdmin = Boolean(localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `${API_BASE}/events/get`
        );
        const latestEvents = response.data.slice(0, 3);
        setEvents(latestEvents);
      } catch (err) {
        setError("Failed to fetch events. Please try again later.");
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-accent text-accent-foreground";
      case "ongoing":
        return "bg-primary text-primary-foreground";
      case "completed":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getAvailabilityPercentage = (attendees: number, max: number) => {
    return ((max - attendees) / max) * 100;
  };

  const handleEventRegistration = (eventId: number) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === eventId
          ? { ...event, attendees: event.attendees + 1 }
          : event
      )
    );
  };

  if (loading) {
    return (
      <section className="section-padding bg-primary-lighter/20">
        <div className="container text-center py-12">
          <p className="text-muted-foreground">Loading events...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section-padding bg-primary-lighter/20">
        <div className="container text-center py-12">
          <p className="text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-primary-lighter/20">
      <div className="container">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Latest Programs
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Join our community events and be part of the positive change.
            Together we can make a greater impact.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="h-full"
            >
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2 flex-wrap gap-2">
                    <Badge className={getStatusColor(event.status)}>
                      {event.status?.charAt(0).toUpperCase() +
                        event.status?.slice(1)}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {event.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg md:text-xl text-primary line-clamp-2">
                    {event.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4 flex-grow">
                  <p className="text-muted-foreground line-clamp-3 leading-relaxed text-sm md:text-base">
                    {event.description}
                  </p>

                  <div className="space-y-2 text-xs md:text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>{new Date(event.date).toLocaleDateString([], { year: "numeric", month: "short", day: "numeric" })}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{event.location}</span>
                    </div>
                    {/* <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="w-4 h-4 text-primary" />
                      <span>
                        {Math.min(getAvailabilityPercentage(event.attendees, event.maxAttendees), 100)} registered
                      </span>
                    </div> */}
                  </div>

                  {/* Availability indicator */}
                  {/* <div className="space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Availability</span>
                      <span>
                        {Math.round(
                          getAvailabilityPercentage(
                            event.attendees,
                            event.maxAttendees
                          )
                        )}
                        % available
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1 sm:h-1.5">
                      <div
                        className="bg-accent h-1 sm:h-1.5 rounded-full transition-all duration-300"
                        style={{
                          width: `${getAvailabilityPercentage(
                            event.attendees,
                            event.maxAttendees
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div> */}
                </CardContent>

                <CardFooter>
                  {isAdmin ? (
                    <Button
                      className="w-full ml-16 sm:w-auto btn-hover"
                      onClick={() => navigate("/admin/programs")}
                    >
                      Manage Program
                    </Button>
                  ) : (
                    <Button
                      className="w-full ml-20  sm:w-auto btn-hover"
                      onClick={() => navigate("/programs")}
                    >
                      Read More
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg" asChild className="btn-hover">
            <Link to={isAdmin ? "/admin/programs" : "/programs"}>
              View All Programs
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default EventsPreview;