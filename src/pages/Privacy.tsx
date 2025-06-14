
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Privacy = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          
          <Card>
            <CardHeader>
              <CardTitle>Your Privacy Matters</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p className="mb-4">
                At HospoHub, we are committed to protecting your privacy and ensuring the security of your personal information.
              </p>
              
              <h3 className="text-lg font-semibold mt-6 mb-3">Information We Collect</h3>
              <p className="mb-4">
                We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support.
              </p>
              
              <h3 className="text-lg font-semibold mt-6 mb-3">How We Use Your Information</h3>
              <p className="mb-4">
                We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.
              </p>
              
              <h3 className="text-lg font-semibold mt-6 mb-3">Information Sharing</h3>
              <p className="mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.
              </p>
              
              <h3 className="text-lg font-semibold mt-6 mb-3">Data Security</h3>
              <p className="mb-4">
                We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
              </p>
              
              <h3 className="text-lg font-semibold mt-6 mb-3">Contact Us</h3>
              <p>
                If you have any questions about this Privacy Policy, please contact us at privacy@hospohub.com.au
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Privacy;
