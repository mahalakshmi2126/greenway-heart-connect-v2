# GreenWay Trust Website

A modern, responsive charity website built for GreenWay Trust to manage donations, events, volunteers, and community engagement.

## 🌟 Project Overview

GreenWay Trust is a full-featured charitable organization website that enables:
- Online donation management with dynamic QR code generation
- Event registration and participation tracking
- Volunteer registration and admin approval system
- Blog and gallery content management
- Real-time donation tracking
- Comprehensive admin dashboard

**Live URL**: [Your deployed URL]

## 🚀 Tech Stack

- **Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui + Radix UI primitives
- **Routing**: React Router DOM v6
- **State Management**: TanStack Query (React Query)
- **Forms**: React Hook Form + Zod validation
- **HTTP Client**: Axios
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Notifications**: Sonner (toast notifications)

## 🎨 Design System

### Color Palette

#### Primary Colors (Forest Green Theme)
- **Primary**: `hsl(142, 71%, 25%)` - Deep forest green
- **Primary Foreground**: `hsl(0, 0%, 100%)` - White
- **Primary Light**: `hsl(142, 71%, 35%)` - Lighter green
- **Primary Dark**: `hsl(142, 71%, 15%)` - Darker green

#### Secondary Colors
- **Secondary**: `hsl(120, 15%, 85%)` - Sage green
- **Accent**: `hsl(160, 84%, 39%)` - Emerald

#### Neutral Colors
- **Background**: `hsl(0, 0%, 100%)` - White
- **Foreground**: `hsl(222.2, 84%, 4.9%)` - Near black
- **Muted**: `hsl(210, 40%, 96.1%)`
- **Card**: `hsl(0, 0%, 100%)`

#### Gradients
- **Primary Gradient**: `linear-gradient(135deg, hsl(142, 71%, 25%), hsl(142, 71%, 35%))`
- **Light Gradient**: `linear-gradient(180deg, hsl(142, 10%, 95%), hsl(0, 0%, 100%))`
- **Hero Gradient**: `linear-gradient(135deg, hsl(142, 71%, 25%) 0%, hsl(142, 60%, 20%) 100%)`

### Typography

- **Font Family**: System font stack (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`)
- **Border Radius**: `0.5rem` (8px) for consistent rounded corners

## 📁 Project Structure

```
src/
├── api/
│   └── axios.tsx                 # Axios instance configuration
├── assets/                       # Static images and media
│   ├── Donate/                   # Donation cause images
│   └── [various images]
├── components/
│   ├── ui/                       # shadcn/ui components
│   ├── BlogPreview.tsx
│   ├── CausesSection.tsx
│   ├── Chatbot.tsx
│   ├── EventsPreview.tsx
│   ├── Footer.tsx
│   ├── GetInTouchSection.tsx
│   ├── HeroSection.tsx
│   ├── JoinEventDialog.tsx
│   ├── LatestDonations.tsx
│   ├── LatestDonationsTicker.tsx
│   ├── MonthlyDonateButton.tsx
│   ├── Navigation.tsx
│   ├── OurCommunitySection.tsx
│   ├── ProtectedRoute.tsx
│   ├── StatsSection.tsx
│   ├── VisionMissionSection.tsx
│   └── VolunteerSection.tsx
├── hooks/                        # Custom React hooks
├── lib/
│   └── utils.ts                  # Utility functions
├── pages/
│   ├── admin/                    # Admin dashboard pages
│   │   ├── AdminBlog.tsx
│   │   ├── AdminDonate.tsx
│   │   ├── AdminEvents.tsx
│   │   ├── AdminGallery.tsx
│   │   ├── AdminHome.tsx
│   │   ├── AdminPrograms.tsx
│   │   └── AdminVolunteers.tsx
│   ├── About.tsx
│   ├── AdminLogin.tsx
│   ├── Blog.tsx
│   ├── CauseDetails.tsx
│   ├── Causes.tsx
│   ├── Contact.tsx
│   ├── Donate.tsx
│   ├── Events.tsx
│   ├── Gallery.tsx
│   ├── Index.tsx                 # Homepage
│   ├── NotFound.tsx
│   ├── Programs.tsx
│   ├── TrackDonation.tsx
│   └── Volunteer.tsx
├── App.tsx                       # Main app component with routing
├── index.css                     # Global styles and design tokens
└── main.tsx                      # App entry point
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or bun package manager

### Local Development

1. **Clone the repository**
```bash
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
```

2. **Install dependencies**
```bash
npm install
# or
bun install
```

3. **Set up environment variables**
Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=your_backend_api_url
```

4. **Start development server**
```bash
npm run dev
# or
bun run dev
```

The app will be available at `http://localhost:5173`

## 📱 Features

### Public Features

#### 🏠 Homepage
- Hero section with "Why GreenWay Trust?" feature box
- Statistics showcase
- Vision & Mission statements
- Featured causes
- Latest donations ticker
- Blog preview
- Upcoming events
- Volunteer call-to-action
- Contact section
- Community highlights

#### 💰 Donations
- Multiple donation causes
- One-time and monthly donation options
- Dynamic QR code generation for payments
- Real-time donation tracking
- Donation history

#### 📅 Events
- Browse upcoming events
- Event registration with participant tracking
- Automatic participant count updates
- Event details and descriptions

#### 📝 Blog
- Browse articles and updates
- Search and filter functionality
- Responsive image galleries

#### 🖼️ Gallery
- Photo galleries organized by category
- Lightbox image viewing

#### 🤝 Volunteer
- Volunteer registration form
- Admin approval workflow
- Status tracking (pending/confirmed)

### Admin Features

Protected admin dashboard accessible at `/admin/*` routes:

#### 🔐 Authentication
- Secure admin login
- Token-based authentication with JWT
- Protected routes with automatic redirect

#### 📊 Dashboard
- Overview statistics
- Recent activities
- Quick actions

#### ✍️ Content Management
- **Blog Management**: Create, edit, delete blog posts with image uploads
- **Events Management**: Manage events with image uploads and participant tracking
- **Gallery Management**: Upload and organize photos
- **Donation Causes**: Manage donation categories and targets
- **Programs**: Update program information

#### 👥 User Management
- **Volunteer Management**: Review and approve volunteer registrations
- **Donation Tracking**: View all donations and donor information

## 🔌 API Integration

The project uses Axios for HTTP requests. Configure the base URL in `src/api/axios.tsx`:

### Key Endpoints

```typescript
// Donations
POST /qr/generate-qr          // Generate QR code for donations
GET  /donations                // Fetch all donations

// Events
GET  /events                   // Fetch all events
POST /events                   // Create new event
PUT  /events/:id              // Update event
DELETE /events/:id            // Delete event
POST /events/:id/register     // Register for event

// Volunteers
POST /volunteers              // Register volunteer
GET  /volunteers              // Get all volunteers (admin)
PUT  /volunteers/:id/approve  // Approve volunteer (admin)

// Blog
GET  /blogs                   // Fetch all blog posts
POST /blogs                   // Create blog post
PUT  /blogs/:id              // Update blog post
DELETE /blogs/:id            // Delete blog post

// Admin
POST /admins/login           // Admin login
GET  /admins/me              // Get current admin profile
```

## 🔒 Authentication Flow

### Admin Login
1. Admin enters credentials at `/admin/login`
2. Backend validates and returns JWT token
3. Token stored in `localStorage`
4. Protected routes check token validity
5. Invalid/expired tokens redirect to login

### Protected Routes
All `/admin/*` routes except `/admin/login` are protected by the `ProtectedRoute` component.

## 🎯 Key Components

### MonthlyDonateButton
- Sticky floating button for monthly donations
- Modal with donation amount selection
- QR code generation for UPI payments
- File upload for payment proof

### JoinEventDialog
- Event registration form
- Automatic participant count increment
- Success confirmation message

### LatestDonations
- 3-column responsive grid
- Profile image, donor name, description, amount
- Ticker animation on homepage

### Navigation
- Responsive design with mobile menu
- "Donate Now" CTA button in primary green
- Active route highlighting

## 🚢 Deployment

### Deploy with Lovable
1. Click "Publish" button in the Lovable interface
2. Your app will be deployed to `[project-name].lovable.app`

### Custom Domain
Navigate to Project > Settings > Domains to connect your custom domain.

### Manual Deployment
Build the project:
```bash
npm run build
```

Deploy the `dist` folder to any static hosting service (Vercel, Netlify, etc.)

## 🧪 Development Workflow

### Adding New Features
1. Create components in `src/components/`
2. Create pages in `src/pages/`
3. Update routes in `src/App.tsx`
4. Use design tokens from `index.css`
5. Follow TypeScript best practices

### Styling Guidelines
- Use semantic color tokens (primary, secondary, accent)
- Use HSL color format
- Leverage Tailwind utility classes
- Maintain responsive design (mobile-first)
- Use shadcn/ui components for consistency

### Code Standards
- TypeScript for type safety
- React Hook Form for forms
- Zod for validation
- TanStack Query for data fetching
- Axios interceptors for auth headers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary to GreenWay Trust.

## 📞 Support

For issues or questions:
- Open an issue in the repository
- Contact the development team
- Visit [Lovable Documentation](https://docs.lovable.dev/)

## 🙏 Acknowledgments

- Built with [Lovable](https://lovable.dev)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Icons from [Lucide](https://lucide.dev)

---

**Made with ❤️ for GreenWay Trust**
