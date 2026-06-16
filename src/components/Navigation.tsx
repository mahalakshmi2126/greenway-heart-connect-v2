import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Heart, Search, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import logo from "@/assets/New Greenway Trust Logo.jpg";
import axios from "axios";

interface NavigationProps {
  isAdmin?: boolean;
  onLogout?: () => void;
}

const API_BASE = import.meta.env.VITE_API_BASE;

const Navigation = ({ isAdmin = false, onLogout }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = Boolean(localStorage.getItem("token"));
  const logoPath = isLoggedIn ? "/admin/home" : "/";

  const publicNavigation = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Programs", path: "/programs" },
    {
      name: "Registration",
      children: [
        { name: "Volunteer Registration", path: "/volunteer" },
        { name: "Beneficiary Registration", path: "/beneficiary-registration" },
      ],
    },
    { name: "Blog", path: "/blog" },
    { name: "Financials", path: "/financials" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  const adminNavigation = [
    { name: "Home", path: "/admin/home" },
    { name: "Programs", path: "/admin/programs" },
    { name: "Blog", path: "/admin/blog" },
    { name: "Gallery", path: "/admin/gallery" },
    { name: "Volunteers", path: "/admin/volunteers" },
    { name: "Donate", path: "/admin/donate" },
    { name: "Financials", path: "/admin/financial" },
    { name: "Trustees", path: "/admin/trustees" },
    { name: "Coordinators", path: "/admin/coordinators" },
  ];

  const navigation = isAdmin ? adminNavigation : publicNavigation;
  const isActive = (path?: string) => path ? location.pathname === path : false;
  const handleLogin = () => navigate("/admin/login");

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.trim()) fetchResults(searchQuery);
      else setSearchResults([]);
    }, 300);
    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const fetchResults = async (query: string) => {
    try {
      const res = await axios.get(`${API_BASE}/search?query=${query}`);
      setSearchResults(res.data);
    } catch (err) {
      console.error("Search failed:", err);
      setSearchResults([]);
    }
  };

  return (
    <nav className="bg-background/95 backdrop-blur-sm border-b sticky top-0 z-50 w-full">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        {/* Logo */}
        <Link
          to={logoPath}
          className="flex items-center space-x-2 hover:scale-105 transition-all duration-300 mr-4 md:mr-8"
        >
          <img
            src={logo}
            alt="GreenWay Trust"
            className="h-10 w-10 hover:animate-pulse shrink-0"
          />
          <span className="text-lg md:text-xl font-bold gradient-text whitespace-nowrap">
            GreenWay Trust
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-x-6">
          {navigation.map((item) => (
            item.children ? (
              <div key={item.name} className="relative group">
                <span className="nav-link cursor-pointer text-muted-foreground transition-all duration-300 hover:text-primary py-2 block">
                  {item.name}
                </span>
                <div className="absolute left-0 mt-0 w-56 bg-background border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  {item.children.map((child) => (
                    <Link
                      key={child.name}
                      to={child.path}
                      className="block px-4 py-3 text-sm text-muted-foreground hover:bg-accent hover:text-white transition-colors"
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.name}
                to={item.path!}
                className={`nav-link transition-all duration-300 hover:text-primary hover:scale-105 ${isActive(item.path!)
                  ? "text-primary font-semibold"
                  : "text-muted-foreground"
                  }`}
              >
                {item.name}
              </Link>
            )
          ))}
        </div>

        {/* Right Side Actions (Desktop) */}
        <div className="hidden md:flex items-center gap-x-3 ml-2 md:ml-6">
          {!isAdmin ? (
            <>
              <Button variant="outline" asChild className="btn-hover">
                <Link to="/track-donation">Track Donation</Link>
              </Button>
              <Button
                asChild
                className="btn-hover bg-accent hover:bg-accent/90"
              >
                <Link to="/donate">
                  <Heart className="w-4 h-4 mr-2" />
                  Donate
                </Link>
              </Button>
              {/* Search */}
              <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Search className="w-5 h-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg w-full">
                  <DialogHeader>
                    <DialogTitle>Search</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input
                      placeholder="Search events, blogs, gallery..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchResults.length > 0 && (
                      <div className="border rounded-md divide-y max-h-60 overflow-y-auto">
                        {searchResults.map((item, idx) => (
                          <div
                            key={idx}
                            onClick={() => {
                              navigate(item.path);
                              setIsSearchOpen(false);
                              setSearchQuery("");
                              setSearchResults([]);
                            }}
                            className="p-3 hover:bg-accent cursor-pointer flex justify-between"
                          >
                            <span>{item.title}</span>
                            <span className="text-xs text-muted-foreground">
                              {item.type}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                    {searchResults.length === 0 && searchQuery && (
                      <p className="text-sm text-muted-foreground">
                        No results for "{searchQuery}"
                      </p>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
              {/* Admin Login */}
              <Button variant="ghost" size="icon" onClick={handleLogin}>
                <User className="w-5 h-5" />
              </Button>
            </>
          ) : (
            <Button
              variant="ghost"
              onClick={onLogout}
              className="flex items-center gap-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-muted-foreground hover:text-primary transition-colors"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden py-4 border-t animate-fade-in-up bg-background">
          <div className="flex flex-col space-y-4 px-4">
            {navigation.map((item) => (
              item.children ? (
                <div key={item.name} className="flex flex-col space-y-2">
                  <span className="text-muted-foreground font-semibold">{item.name}</span>
                  <div className="pl-4 flex flex-col space-y-2 border-l-2 border-accent">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        to={child.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={`transition-colors hover:text-primary ${isActive(child.path) ? "text-primary font-semibold" : "text-muted-foreground"}`}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.name}
                  to={item.path!}
                  onClick={() => setIsMenuOpen(false)}
                  className={`transition-colors hover:text-primary ${isActive(item.path!)
                    ? "text-primary font-semibold"
                    : "text-muted-foreground"
                    }`}
                >
                  {item.name}
                </Link>
              )
            ))}

            {!isAdmin ? (
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="outline" asChild>
                  <Link
                    to="/track-donation"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Track Donation
                  </Link>
                </Button>
                <Button asChild className="bg-accent hover:bg-accent/90">
                  <Link to="/donate" onClick={() => setIsMenuOpen(false)}>
                    <Heart className="w-4 h-4 mr-2" />
                    Donate
                  </Link>
                </Button>
                {/* Search */}
                <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <Search className="w-4 h-4 mr-2" />
                      Search
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg w-full">
                    <DialogHeader>
                      <DialogTitle>Search</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input
                        placeholder="Search events, blogs, gallery..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      {searchResults.length > 0 && (
                        <div className="border rounded-md divide-y max-h-60 overflow-y-auto">
                          {searchResults.map((item, idx) => (
                            <div
                              key={idx}
                              onClick={() => {
                                navigate(item.path);
                                setIsSearchOpen(false);
                                setSearchQuery("");
                                setSearchResults([]);
                                setIsMenuOpen(false);
                              }}
                              className="p-3 hover:bg-accent cursor-pointer flex justify-between"
                            >
                              <span>{item.title}</span>
                              <span className="text-xs text-muted-foreground">
                                {item.type}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                      {searchResults.length === 0 && searchQuery && (
                        <p className="text-sm text-muted-foreground">
                          No results for "{searchQuery}"
                        </p>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="outline"
                  onClick={() => {
                    handleLogin();
                    setIsMenuOpen(false);
                  }}
                >
                  <User className="w-4 h-4 mr-2" />
                  Admin Login
                </Button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2 pt-4">
                <Button
                  variant="destructive"
                  onClick={() => {
                    onLogout?.();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
