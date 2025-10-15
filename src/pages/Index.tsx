import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckSquare, Zap, Shield, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-bg.jpg";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section 
        className="relative py-20 md:py-32 overflow-hidden"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/85" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Manage Tasks Effortlessly
            </h1>
            <p className="text-xl text-muted-foreground">
              Streamline your workflow with our powerful task management platform. 
              Stay organized, boost productivity, and achieve your goals.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/auth">
                <Button size="lg" className="shadow-lg">
                  Get Started Free
                </Button>
              </Link>
              <Link to="/auth">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose TaskFlow?</h2>
            <p className="text-muted-foreground text-lg">
              Everything you need to stay on top of your tasks
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-2 hover:shadow-lg transition-all">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Lightning Fast</CardTitle>
                <CardDescription>
                  Create, update, and organize tasks in seconds with our intuitive interface
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-all">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Secure & Private</CardTitle>
                <CardDescription>
                  Your data is encrypted and protected with enterprise-grade security
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-all">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Boost Productivity</CardTitle>
                <CardDescription>
                  Track progress, set priorities, and accomplish more every day
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Get Started?</h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of users who are already managing their tasks more efficiently
            </p>
            <Link to="/auth">
              <Button size="lg" className="shadow-lg">
                <CheckSquare className="w-4 h-4 mr-2" />
                Start Free Today
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 TaskFlow. Built with React and Lovable Cloud.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
