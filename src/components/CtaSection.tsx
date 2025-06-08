
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CtaSection = () => {
  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-5xl mx-auto relative rounded-3xl overflow-hidden shadow-elevated">
          <div className="absolute inset-0 bg-gradient-to-r from-rgba(0, 0, 0, 0.12)-700 to-rgba(0, 0, 0, 0.12)-900 -z-10"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')] opacity-20 mix-blend-overlay"></div>
          
          <div className="p-8 sm:p-12 flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to transform your culinary classroom?
            </h2>
            
            <p className="text-white/90 max-w-2xl text-lg mb-8">
              Join over 200+ hospitality education programs already using HospoHub to 
              streamline their recipe management and enhance student learning.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-white text-rgba(0, 0, 0, 0.12)-800 hover:bg-white/90 shadow-lg px-8 animated-button">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white/10 px-8"
              >
                Request a Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
