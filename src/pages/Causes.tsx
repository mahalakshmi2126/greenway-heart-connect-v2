// import React from "react";
// import Navigation from "@/components/Navigation";
// import Footer from "@/components/Footer";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Heart, Users, GraduationCap, Stethoscope, Home, Utensils } from "lucide-react";
// import { Link } from "react-router-dom";
// import wheelchairSupport from "@/assets/wheelchair-support.jpg";
// import childrenEducation from "@/assets/children-education.jpg";

// const Causes = () => {
//   const causes = [
//     {
//       id: 1,
//       title: "Wheelchair & Mobility Support",
//       description: "Providing wheelchairs, mobility aids, and accessibility equipment to ensure everyone has the freedom of movement they deserve.",
//       longDescription: "Our flagship program provides high-quality wheelchairs, walkers, and other mobility aids to individuals who cannot afford them. We also work on improving accessibility in public spaces and homes.",
//       image: wheelchairSupport,
//       icon: Users,
//       raised: 45000,
//       goal: 60000,
//       donors: 234,
//       urgency: "high"
//     },
//     {
//       id: 2,
//       title: "Children's Education Program",
//       description: "Supporting underprivileged children with educational resources, school supplies, and learning opportunities for a brighter future.",
//       longDescription: "We provide school supplies, tutoring services, and educational scholarships to children from low-income families. Our goal is to ensure every child has access to quality education.",
//       image: childrenEducation,
//       icon: GraduationCap,
//       raised: 32000,
//       goal: 50000,
//       donors: 178,
//       urgency: "medium"
//     },
//     {
//       id: 3,
//       title: "Healthcare & Medical Aid",
//       description: "Providing essential medical care and health services to communities in need of support and medical assistance.",
//       longDescription: "Our healthcare initiative provides free medical checkups, prescription assistance, and health education to underserved communities.",
//       image: wheelchairSupport,
//       icon: Stethoscope,
//       raised: 28000,
//       goal: 40000,
//       donors: 156,
//       urgency: "high"
//     },
//     {
//       id: 4,
//       title: "Housing Assistance Program",
//       description: "Helping families secure safe, accessible housing and providing home modifications for accessibility needs.",
//       longDescription: "We assist with rent support for families in crisis and provide accessibility modifications to homes, including ramps, grab bars, and other safety features.",
//       image: childrenEducation,
//       icon: Home,
//       raised: 18000,
//       goal: 35000,
//       donors: 89,
//       urgency: "medium"
//     },
//     {
//       id: 5,
//       title: "Food Security Initiative",
//       description: "Ensuring no one goes hungry by providing nutritious meals and food assistance to families in need.",
//       longDescription: "Our food program includes a community kitchen, food pantry, and mobile meal delivery service for elderly and disabled community members.",
//       image: wheelchairSupport,
//       icon: Utensils,
//       raised: 22000,
//       goal: 30000,
//       donors: 145,
//       urgency: "low"
//     },
//     {
//       id: 6,
//       title: "Emergency Relief Fund",
//       description: "Rapid response support for families facing unexpected crises, medical emergencies, or natural disasters.",
//       longDescription: "This fund provides immediate financial assistance to families facing unexpected emergencies, helping them maintain stability during difficult times.",
//       image: childrenEducation,
//       icon: Heart,
//       raised: 15000,
//       goal: 25000,
//       donors: 67,
//       urgency: "high"
//     }
//   ];

//   const getProgressPercentage = (raised: number, goal: number) => {
//     return Math.min((raised / goal) * 100, 100);
//   };

//   const getUrgencyColor = (urgency: string) => {
//     switch (urgency) {
//       case 'high':
//         return 'bg-destructive text-destructive-foreground';
//       case 'medium':
//         return 'bg-accent text-accent-foreground';
//       case 'low':
//         return 'bg-muted text-muted-foreground';
//       default:
//         return 'bg-muted text-muted-foreground';
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <Navigation />
      
//       {/* Hero Section */}
//       <section 
//         className="hero-section flex items-center relative"
//         style={{
//           backgroundImage: `url(${wheelchairSupport})`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//         }}
//       >
//         <div className="absolute inset-0 bg-primary/80"></div>
//         <div className="container relative z-10 text-center text-primary-foreground">
//           <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Causes</h1>
//           <p className="text-xl max-w-2xl mx-auto">
//             Every donation makes a difference. Choose a cause close to your heart and help us create positive change
//           </p>
//         </div>
//       </section>

//       {/* Causes Grid */}
//       <section className="section-padding">
//         <div className="container">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
//               Make a Difference Today
//             </h2>
//             <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
//               Choose from our impactful programs and help us continue our mission of creating positive change in our community
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {causes.map((cause) => {
//               const Icon = cause.icon;
//               return (
//                 <Card key={cause.id} className="donation-card overflow-hidden">
//                   <div className="relative h-48 overflow-hidden">
//                     <img 
//                       src={cause.image} 
//                       alt={cause.title}
//                       className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
//                     />
//                     <div className="absolute top-4 right-4">
//                       <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getUrgencyColor(cause.urgency)}`}>
//                         {cause.urgency.charAt(0).toUpperCase() + cause.urgency.slice(1)} Priority
//                       </span>
//                     </div>
//                   </div>
                  
//                   <CardHeader>
//                     <div className="flex items-center space-x-3 mb-2">
//                       <div className="bg-primary/10 p-2 rounded-lg">
//                         <Icon className="w-6 h-6 text-primary" />
//                       </div>
//                       <CardTitle className="text-xl text-primary line-clamp-2">
//                         {cause.title}
//                       </CardTitle>
//                     </div>
//                   </CardHeader>

//                   <CardContent>
//                     <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
//                       {cause.description}
//                     </p>

//                     {/* Progress Bar */}
//                     <div className="space-y-2">
//                       <div className="flex justify-between text-sm">
//                         <span className="text-muted-foreground">Raised: ${cause.raised.toLocaleString()}</span>
//                         <span className="text-muted-foreground">Goal: ${cause.goal.toLocaleString()}</span>
//                       </div>
//                       <div className="w-full bg-muted rounded-full h-2">
//                         <div 
//                           className="bg-accent h-2 rounded-full transition-all duration-500"
//                           style={{ width: `${getProgressPercentage(cause.raised, cause.goal)}%` }}
//                         ></div>
//                       </div>
//                       <div className="flex justify-between text-sm text-muted-foreground">
//                         <span>{cause.donors} donors</span>
//                         <span>{getProgressPercentage(cause.raised, cause.goal).toFixed(0)}% funded</span>
//                       </div>
//                     </div>
//                   </CardContent>

//                   <CardFooter>
//                     <Button className="w-full btn-hover" asChild>
//                       <Link to={`/donate?cause=${cause.id}`}>
//                         <Heart className="w-4 h-4 mr-2" />
//                         Donate Now
//                       </Link>
//                     </Button>
//                   </CardFooter>
//                 </Card>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// };

// export default Causes;