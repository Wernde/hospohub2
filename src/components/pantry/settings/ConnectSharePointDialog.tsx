
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { authenticateSharePoint, saveSharePointConfig } from '@/utils/sharePointIntegration';

interface ConnectToSharePointDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ConnectToSharePointDialog({ 
  open, 
  onOpenChange 
}: ConnectToSharePointDialogProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    siteUrl: '',
    username: '',
    password: '',
    rootFolder: 'Cooking'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleConnect = async () => {
    setIsLoading(true);
    try {
      // In a real implementation, this would authenticate with SharePoint
      const result = await authenticateSharePoint(
        formData.siteUrl,
        formData.username,
        formData.password,
        formData.rootFolder
      );
      
      if (result.success) {
        toast({
          title: "Connected to SharePoint",
          description: "You can now export and import data from SharePoint",
        });
        onOpenChange(false);
      } else {
        toast({
          title: "Connection failed",
          description: result.message,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("SharePoint connection error:", error);
      toast({
        title: "Connection failed",
        description: "Could not connect to SharePoint",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Connect to SharePoint</DialogTitle>
          <DialogDescription>
            Connect to your organization's SharePoint to store and retrieve data.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="siteUrl" className="text-right">
              Site URL
            </Label>
            <Input
              id="siteUrl"
              name="siteUrl"
              placeholder="https://yourorg.sharepoint.com/sites/cooking"
              className="col-span-3"
              value={formData.siteUrl}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              name="username"
              placeholder="your.email@organization.com"
              className="col-span-3"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              className="col-span-3"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="rootFolder" className="text-right">
              Root Folder
            </Label>
            <Input
              id="rootFolder"
              name="rootFolder"
              placeholder="Cooking"
              className="col-span-3"
              value={formData.rootFolder}
              onChange={handleChange}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleConnect} disabled={isLoading}>
            {isLoading ? "Connecting..." : "Connect"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
