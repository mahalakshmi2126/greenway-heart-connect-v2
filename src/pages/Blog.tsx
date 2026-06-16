import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, User, Search } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import blogBanner from "@/assets/Photos/Main2.JPG";
import axios from "axios";

const Blog = () => {
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [postLoading, setPostLoading] = useState(false);
  const [error, setError] = useState(null);
  const [postError, setPostError] = useState(null);

  // API base URL
  const API_BASE = import.meta.env.VITE_API_BASE;

  // Fetch all blog posts
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${API_BASE}/blogs/get`, { timeout: 5000 });
        setPosts(response.data);
      } catch (err) {
        setError("Failed to fetch blog posts. Please try again later.");
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Fetch single blog post
  useEffect(() => {
    if (id) {
      const fetchPostById = async () => {
        setPostLoading(true);
        setPostError(null);
        try {
          const response = await axios.get(`${API_BASE}/blogs/${id}`, { timeout: 5000 });
          setPost(response.data);
        } catch (err) {
          setPostError("Blog post not found or failed to load.");
          console.error("Error fetching post by ID:", err);
        } finally {
          setPostLoading(false);
        }
      };
      fetchPostById();
    } else {
      setPost(null);
    }
  }, [id]);

  // Memoize filtered posts to avoid recomputation on every render
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });
  }, [posts, searchTerm]);

  // Skeleton loading component for blog list
  const SkeletonCard = () => (
    <Card className="donation-card overflow-hidden h-full animate-pulse">
      <div className="relative h-48 bg-muted"></div>
      <CardHeader>
        <div className="h-6 bg-muted rounded w-3/4"></div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded w-full"></div>
          <div className="h-4 bg-muted rounded w-5/6"></div>
          <div className="h-4 bg-muted rounded w-4/5"></div>
        </div>
        <div className="flex items-center space-x-4 text-sm mt-4">
          <div className="h-4 bg-muted rounded w-1/4"></div>
          <div className="h-4 bg-muted rounded w-1/4"></div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="h-10 bg-muted rounded w-full"></div>
      </CardFooter>
    </Card>
  );

  // Skeleton loading for single post
  const SkeletonPost = () => (
    <div className="container max-w-4xl py-20 animate-pulse">
      <div className="h-6 bg-muted rounded w-1/4 mb-8"></div>
      <div className="h-12 bg-muted rounded w-3/4 mb-4"></div>
      <div className="flex space-x-6 mb-8">
        <div className="h-4 bg-muted rounded w-1/6"></div>
        <div className="h-4 bg-muted rounded w-1/6"></div>
        <div className="h-4 bg-muted rounded w-1/6"></div>
      </div>
      <div className="h-64 bg-muted rounded-lg mb-8"></div>
      <div className="space-y-4">
        <div className="h-4 bg-muted rounded w-full"></div>
        <div className="h-4 bg-muted rounded w-5/6"></div>
        <div className="h-4 bg-muted rounded w-4/5"></div>
      </div>
    </div>
  );



  // Show single blog post
  if (id) {
    if (postLoading) {
      return (
        <div className="min-h-screen bg-background">
          <Navigation />
          <section
            className="hero-section flex items-center relative"
            style={{
              backgroundImage: `url(${blogBanner})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-primary/80"></div>
            <div className="container relative z-10 text-center text-primary-foreground">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-6xl font-bold mb-6">Blog & Stories</h1>
                <p className="text-xl max-w-3xl mx-auto">
                  Read inspiring stories, impact reports, and updates from our community work.
                  Every story reflects the positive change we're creating together.
                </p>
              </motion.div>
            </div>
          </section>
          <SkeletonPost />
          <Footer />
        </div>
      );
    }

    if (postError || !post) {
      return (
        <div className="min-h-screen bg-background">
          <Navigation />
          <section
            className="hero-section flex items-center relative"
            style={{
              backgroundImage: `url(${blogBanner})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-primary/80"></div>
            <div className="container relative z-10 text-center text-primary-foreground">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-6xl font-bold mb-6">Blog & Stories</h1>
                <p className="text-xl max-w-3xl mx-auto">
                  Read inspiring stories, impact reports, and updates from our community work.
                  Every story reflects the positive change we're creating together.
                </p>
              </motion.div>
            </div>
          </section>
          <div className="container py-20 text-center">
            <h1 className="text-4xl font-bold text-primary mb-4">Post Not Found</h1>
            <Link to="/blog">
              <Button>Back to Blog</Button>
            </Link>
          </div>
          <Footer />
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <section
          className="hero-section flex items-center relative"
          style={{
            backgroundImage: `url(${blogBanner})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-primary/50"></div>
          <div className="container relative z-10 text-center text-primary-foreground">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Blog & Stories</h1>
              <p className="text-xl max-w-3xl mx-auto">
                Read inspiring stories, impact reports, and updates from our community work.
                Every story reflects the positive change we're creating together.
              </p>
            </motion.div>
          </div>
        </section>
        <article className="section-padding">
          <div className="container max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-8">
                <Link to="/blog" className="text-primary hover:text-accent">
                  ← Back to Blog
                </Link>
              </div>
              <div className="mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                  {post.title}
                </h1>
                <div className="flex items-center space-x-6 text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <div className="mb-8">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-64 md:h-96 object-cover rounded-lg"
                  loading="lazy"
                />
              </div>
              <div
                className="prose prose-lg max-w-none prose-headings:text-primary prose-a:text-accent"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              {/* <div className="mt-12 pt-8 border-t">
                <h3 className="text-xl font-semibold mb-4">Share this article</h3>
                <div className="flex space-x-4">
                  <Button variant="outline" size="sm">Share on Facebook</Button>
                  <Button variant="outline" size="sm">Share on Twitter</Button>
                  <Button variant="outline" size="sm">Copy Link</Button>
                </div>
              </div> */}
            </motion.div>
          </div>
        </article>
        <Footer />
      </div>
    );
  }

  // Show blog listing page
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <section
        className="hero-section flex items-center relative"
        style={{
          backgroundImage: `url(${blogBanner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-primary/60"></div>
        <div className="container relative z-10 text-center text-primary-foreground">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Blog & Stories</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Read inspiring stories, impact reports, and updates from our community work.
              Every story reflects the positive change we're creating together.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-8 bg-background border-b">
        <div className="container">
          <div className="relative w-full max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-primary mb-2">Error</h3>
              <p className="text-red-500">{error}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="donation-card overflow-hidden h-full">
                    <div className="relative h-48 overflow-hidden bg-muted">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      {/* <div className="absolute top-4 right-4">
                        <Badge variant="outline" className="bg-background/80">
                          {post.readTime}
                        </Badge>
                      </div> */}
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl text-primary line-clamp-2 hover:text-accent transition-colors">
                        <Link to={`/blog/${post._id}`}>{post.title}</Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(post.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full btn-hover" asChild>
                        <Link to={`/blog/${post._id}`}>
                          Read More
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
              {filteredPosts.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold text-primary mb-2">No articles found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Blog;