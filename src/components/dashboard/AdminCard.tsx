
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const AdminCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-black">Admin Controls</CardTitle>
        <CardDescription className="text-black">Access your admin dashboard</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-black">You have admin privileges. You can access the admin dashboard to manage users and system settings.</p>
        <Link 
          to="/admin" 
          className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
        >
          Go to Admin Dashboard
        </Link>
      </CardContent>
    </Card>
  );
};

export default AdminCard;
