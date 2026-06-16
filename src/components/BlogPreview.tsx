import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Calendar, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

const BlogPreview = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isAdmin = Boolean(localStorage.getItem("token"));

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `${API_BASE}/blogs/get`
        );
        const recentPosts = response.data.slice(0, 3);
        setPosts(recentPosts);
      } catch (err) {
        setError("Failed to fetch blog posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <section className="section-padding bg-background">
        <div className="container text-center py-12">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section-padding bg-background">
        <div className="container text-center py-12">
          <p className="text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-background">
      <div className="container">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Recent from Blog
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Stay updated with our latest stories, impact reports, and community
            news. Every story reflects the positive change we're creating
            together.
          </p>
        </motion.div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="h-full"
            >
              <Card className="overflow-hidden h-full flex flex-col">
                {/* Image */}
                <div className="relative h-40 sm:h-48 md:h-56 overflow-hidden bg-muted">
                  <img
                    src={
                      post.image?.startsWith("http")
                        ? post.image
                        : `${API_BASE}/${post.image}`
                    }
                    alt={post.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/fallback-image.jpg";
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl text-primary line-clamp-2 hover:text-accent transition-colors">
                    <Link to={isAdmin ? `/admin/blog` : `/blog/${post._id}`}>
                      {post.title}
                    </Link>
                  </CardTitle>
                </CardHeader>

                {/* Content */}
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground mb-4 line-clamp-3 text-sm md:text-base leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.date).toLocaleDateString([], { year: "numeric", month: "short", day: "numeric" })}</span>
                    </div>
                  </div>
                </CardContent>

                {/* Footer */}
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full ml-16 sm:w-auto btn-hover"
                    asChild
                  >
                    <Link to={isAdmin ? `/admin/blog` : `/blog/${post._id}`}>
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
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
            <Link to={isAdmin ? "/admin/blog" : "/blog"}>
              View All Posts
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogPreview;