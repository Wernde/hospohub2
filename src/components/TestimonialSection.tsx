
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    quote: "HospoHub has transformed how we teach culinary arts. Our students now focus more on cooking techniques rather than struggling with recipe calculations.",
    author: "Maria Johnson",
    role: "Culinary Department Head",
    institution: "Pacific Culinary Institute",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg"
  },
  {
    quote: "The inventory tracking feature alone has saved our department thousands in reduced food waste. It's an essential tool for any culinary program.",
    author: "Robert Chen",
    role: "Executive Chef Instructor",
    institution: "Eastside Hospitality School",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg"
  },
  {
    quote: "Students love being able to access recipes and learning materials anywhere. It's made our curriculum more accessible and engaging for the digital generation.",
    author: "Samantha Williams",
    role: "Hospitality Program Director",
    institution: "Westlake Academy",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg"
  }
];

const TestimonialSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    // Auto-advance testimonials
    const interval = setInterval(() => {
      nextTestimonial();
    }, 8000);

    return () => clearInterval(interval);
  }, []);

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
    <section id="testimonials" ref={sectionRef} className="py-24 bg-accent/50 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center rounded-full bg-white px-3 py-1 text-sm mb-6 animate-on-scroll animate-fade-in">
            <span className="font-medium text-primary">Testimonials</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold animate-on-scroll animate-fade-in">
            Trusted by <span className="text-gradient">culinary educators</span> worldwide
          </h2>
          
          <p className="mt-6 max-w-2xl text-lg text-foreground/70 animate-on-scroll animate-fade-in stagger-1">
            Hear from hospitality professionals who have transformed their 
            educational programs with HospoHub.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto animate-on-scroll opacity-0">
          <div className="glass-card rounded-2xl p-8 md:p-12">
            <div className="flex flex-col items-center text-center">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />
                ))}
              </div>
              
              <blockquote className="text-xl md:text-2xl font-display italic mb-10 transition-opacity duration-300">
                "{testimonials[activeIndex].quote}"
              </blockquote>
              
              <div className="flex flex-col items-center">
                <img 
                  src={testimonials[activeIndex].avatar} 
                  alt={testimonials[activeIndex].author} 
                  className="w-16 h-16 rounded-full mb-4 border-2 border-white shadow-subtle"
                />
                <div className="font-semibold text-lg">{testimonials[activeIndex].author}</div>
                <div className="text-foreground/70">{testimonials[activeIndex].role}</div>
                <div className="text-primary font-medium text-sm mt-1">{testimonials[activeIndex].institution}</div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? 'bg-primary scale-110'
                    : 'bg-primary/30 hover:bg-primary/50'
                }`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
          
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-6">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-6">
            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
