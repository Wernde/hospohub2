
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Terms = () => {
  return (
    <div className="flex flex-col min-h-screen bg-stone-100">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-stone-900 mb-6">Terms of Service</h1>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-stone-900">Terms and Conditions</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p className="mb-4 text-stone-700">
                Welcome to HospoHub. These terms and conditions outline the rules and regulations for the use of our service.
              </p>
              
              <h3 className="text-lg font-semibold mt-6 mb-3 text-stone-900">Acceptance of Terms</h3>
              <p className="mb-4 text-stone-700">
                By accessing and using HospoHub, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
              
              <h3 className="text-lg font-semibold mt-6 mb-3 text-stone-900">Use License</h3>
              <p className="mb-4 text-stone-700">
                Permission is granted to temporarily access HospoHub for personal, non-commercial transitory viewing only.
              </p>
              
              <h3 className="text-lg font-semibold mt-6 mb-3 text-stone-900">User Account</h3>
              <p className="mb-4 text-stone-700">
                You are responsible for safeguarding the password and for maintaining the confidentiality of your account.
              </p>
              
              <h3 className="text-lg font-semibold mt-6 mb-3 text-stone-900">Prohibited Uses</h3>
              <p className="mb-4 text-stone-700">
                You may not use our service for any unlawful purpose or to solicit others to perform unlawful acts.
              </p>
              
              <h3 className="text-lg font-semibold mt-6 mb-3 text-stone-900">Service Availability</h3>
              <p className="mb-4 text-stone-700">
                We strive to provide continuous service availability but cannot guarantee uninterrupted access.
              </p>
              
              <h3 className="text-lg font-semibold mt-6 mb-3 text-stone-900">Contact Information</h3>
              <p className="text-stone-700">
                If you have any questions about these Terms of Service, please contact us at legal@hospohub.com.au
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Terms;
