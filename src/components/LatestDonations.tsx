// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Card, CardContent } from "@/components/ui/card";
// import { Heart } from "lucide-react";

// const LatestDonations = () => {
//   const donations = [
//     {
//       id: 1,
//       name: "Sarah Johnson",
//       amount: 250,
//       note: "Happy to support wheelchair accessibility. Keep up the amazing work!",
//       avatar: "SJ",
//       time: "2 hours ago"
//     },
//     {
//       id: 2,
//       name: "Michael Chen",
//       amount: 150,
//       note: "Education is so important. Glad to help children in need.",
//       avatar: "MC",
//       time: "5 hours ago"
//     },
//     {
//       id: 3,
//       name: "Emily Rodriguez",
//       amount: 300,
//       note: "Thank you for making our community more inclusive and caring.",
//       avatar: "ER",
//       time: "1 day ago"
//     },
//     {
//       id: 4,
//       name: "Anonymous Donor",
//       amount: 500,
//       note: "Small contribution for a big cause. Every bit helps!",
//       avatar: "AD",
//       time: "2 days ago"
//     }
//   ];

//   return (
//     <section className="section-padding bg-muted/30">
//       <div className="container">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
//             Latest Donations
//           </h2>
//           <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
//             See the generous hearts that are helping us make a difference. Every donation brings hope and positive change.
//           </p>
//         </div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
//           {donations.map((donation) => (
//             <Card key={donation.id} className="donation-card h-80">
//               <CardContent className="p-6 h-full flex flex-col items-center text-center">
                
//                 {/* 1. Avatar */}
//                 <Avatar className="w-16 h-16 border-2 border-accent/20 mb-3">
//                   <AvatarImage src="" />
//                   <AvatarFallback className="bg-accent/10 text-accent font-semibold text-lg">
//                     {donation.avatar}
//                   </AvatarFallback>
//                 </Avatar>

//                 {/* 2. Name */}
//                 <h4 className="font-semibold text-primary text-lg mb-2">{donation.name}</h4>
                
//                 {/* 3. Note */}
//                 <p className="text-muted-foreground italic text-sm leading-relaxed mb-3 flex-1">
//                   "{donation.note}"
//                 </p>
                
//                 {/* 4. Time */}
//                 <p className="text-xs text-muted-foreground/70 mb-3">
//                   {donation.time}
//                 </p>
                
//                 {/* 5. Amount */}
//                 <div className="flex items-center space-x-2 text-accent font-bold text-xl mt-auto">
//                   <Heart className="w-5 h-5 fill-current" />
//                   <span>${donation.amount}</span>
//                 </div>

//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default LatestDonations;