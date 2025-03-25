
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown, ClipboardList, BarChart3, BookOpen } from 'lucide-react';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            if (entry.target === imageRef.current) {
              entry.target.classList.add('animate-image-float');
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      const elements = heroRef.current.querySelectorAll('.animate-on-scroll');
      elements.forEach((el) => observer.observe(el));
    }

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={heroRef}
      className="relative pt-36 pb-16 overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/10 via-blue-800/5 to-transparent"></div>
      
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm animate-on-scroll animate-fade-in">
              <span className="font-medium text-blue-600">New platform</span>
              <span className="ml-2 text-blue-800/70">Launching Fall 2025</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-on-scroll animate-fade-in">
              Recipe Management for <span className="text-gradient">Hospitality Education</span>
            </h1>
            
            <p className="mt-6 text-xl text-foreground/80 leading-relaxed animate-on-scroll animate-fade-in stagger-1 mb-6">
              Streamline your hospitality department with an intelligent recipe management 
              system designed specifically for culinary schools and educational institutions.
            </p>
            
            <div className="mt-4 flex flex-wrap gap-4 animate-on-scroll animate-fade-in stagger-2">
              <Button size="lg" className="animated-button bg-blue-600 hover:bg-blue-700 px-8 shadow-md">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="border-blue-400/20 text-blue-800 hover:bg-blue-50 px-8"
                onClick={scrollToFeatures}
              >
                Learn More
                <ChevronDown className="ml-2 h-5 w-5" />
              </Button>
            </div>
            
            <div className="mt-6 flex items-center space-x-4 animate-on-scroll animate-fade-in stagger-3">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
                <div className="w-8 h-8 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center">
                  <ClipboardList className="w-4 h-4 text-white" />
                </div>
                <div className="w-8 h-8 rounded-full bg-blue-700 border-2 border-white flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="text-sm text-foreground/70">
                Trusted by <span className="font-semibold text-foreground">200+</span> culinary institutions
              </div>
            </div>
          </div>
          
          <div 
            ref={imageRef}
            className="relative animate-on-scroll opacity-0"
          >
            <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-blue-500/20 to-transparent rounded-2xl blur-3xl"></div>
            <div className="relative bg-white/80 backdrop-blur-sm p-2 rounded-2xl shadow-elevated overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
                alt="Recipe Management Dashboard"
                className="w-full h-auto rounded-xl"
              />
              
              <div className="absolute -bottom-6 -right-6 transform rotate-6">
                <div className="glass-card p-3 rounded-lg flex items-center space-x-3 shadow-elevated">
                  <div className="bg-blue-600 p-2 rounded-full text-white">
                    <Book className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-medium">Recipe Library</div>
                    <div className="text-xs text-foreground/70">1,200+ recipes</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute top-10 -left-12 transform -rotate-6">
                <div className="glass-card p-3 rounded-lg shadow-elevated animate-pulse-glow">
                  <div className="text-xs font-medium">Cost Calculation</div>
                  <div className="mt-1 text-sm font-semibold text-blue-600">Automated</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
