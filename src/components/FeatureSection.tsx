
import { useEffect, useRef } from 'react';
import { 
  Bookmark,
  Calculator, 
  ChefHat, 
  ClipboardList, 
  Clock, 
  Database, 
  LineChart, 
  ShoppingCart,
  Users 
} from 'lucide-react';

const features = [
  {
    icon: <Bookmark className="w-10 h-10" />,
    title: 'Recipe Management',
    description: 'Create, store, and organize recipes with detailed instructions, ingredients, and nutritional information.',
  },
  {
    icon: <Calculator className="w-10 h-10" />,
    title: 'Cost Analysis',
    description: 'Automatically calculate food costs per serving and track expenses to stay within budget.',
  },
  {
    icon: <ShoppingCart className="w-10 h-10" />,
    title: 'Inventory Tracking',
    description: 'Monitor ingredient usage and receive alerts when supplies are running low or about to expire.',
  },
  {
    icon: <LineChart className="w-10 h-10" />,
    title: 'Scaling Tools',
    description: 'Easily scale recipes up or down based on the number of students or required servings.',
  },
  {
    icon: <ClipboardList className="w-10 h-10" />,
    title: 'Learning Modules',
    description: 'Integrate recipe content with curriculum standards and learning outcomes.',
  },
  {
    icon: <Users className="w-10 h-10" />,
    title: 'Student Access',
    description: 'Provide controlled access to recipes and learning materials for students and staff.',
  },
];

const FeatureSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    if (sectionRef.current) {
      const elements = sectionRef.current.querySelectorAll('.animate-on-scroll');
      elements.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" ref={sectionRef} className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-sm mb-6 animate-on-scroll animate-fade-in">
            <span className="font-medium text-primary">Key Features</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold animate-on-scroll animate-fade-in">
            Everything you need to manage your <br className="hidden md:block" /> 
            <span className="text-gradient">culinary classroom</span>
          </h2>
          
          <p className="mt-6 max-w-2xl text-lg text-foreground/70 animate-on-scroll animate-fade-in stagger-1">
            Our comprehensive platform streamlines recipe management, inventory tracking, and 
            educational resources for hospitality departments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`glass-card p-8 rounded-2xl animate-on-scroll opacity-0 stagger-${index % 6 + 1}`}
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-primary/10 text-primary mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-foreground/70">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-24 glass-card rounded-2xl p-8 lg:p-12 animate-on-scroll opacity-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-6">
                Designed specifically for <span className="text-gradient">culinary education</span>
              </h3>
              <p className="text-foreground/70 mb-6">
                Unlike generic recipe tools, HospoHub is built from the ground up for hospitality 
                education — linking recipes to curriculum, tracking student progress, and 
                simplifying complex workflows for instructors.
              </p>
              
              <ul className="space-y-4">
                {[
                  'Curriculum integration with learning outcomes',
                  'Student performance tracking and assessment',
                  'Industry-standard costing and pricing models',
                  'Recipe scaling for classroom demonstrations'
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-1">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                    <span className="ml-3 text-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-primary/20 to-transparent rounded-2xl blur-3xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1577106263724-2c8e03bfe9cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                alt="Culinary classroom" 
                className="w-full h-auto rounded-xl shadow-subtle"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
