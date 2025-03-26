
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Share2, Copy, Check, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Sample data for teachers/colleagues that would normally come from a database
const sampleTeachers = [
  { id: "1", name: "Emma Watson", department: "Pastry Arts", email: "emma.watson@culinaryschool.edu" },
  { id: "2", name: "James Smith", department: "Savory Arts", email: "j.smith@culinaryschool.edu" },
  { id: "3", name: "Maria Garcia", department: "Nutrition", email: "m.garcia@culinaryschool.edu" },
  { id: "4", name: "Robert Johnson", department: "Baking", email: "r.johnson@culinaryschool.edu" },
  { id: "5", name: "Lisa Chen", department: "International Cuisine", email: "l.chen@culinaryschool.edu" },
];

// Permission levels
const permissionLevels = [
  { value: "view", label: "View Only" },
  { value: "edit", label: "Can Edit" },
  { value: "copy", label: "Can Make a Copy" },
];

const RecipeSharingTool = () => {
  const { toast } = useToast();
  const [recipients, setRecipients] = useState<string[]>([]);
  const [permission, setPermission] = useState("view");
  const [message, setMessage] = useState("");
  const [notifyOnUse, setNotifyOnUse] = useState(true);
  const [shareLink, setShareLink] = useState("");
  
  const handleShare = () => {
    // In a real app, this would make an API call to share the recipe
    // For now, we'll just create a mock share link
    
    const link = `https://hospohub.com/recipes/shared/r-${Math.random().toString(36).substring(2, 10)}`;
    setShareLink(link);
    
    toast({
      title: "Recipe Shared Successfully",
      description: `Shared with ${recipients.length} colleague${recipients.length === 1 ? '' : 's'}.`,
    });
  };
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    toast({
      title: "Link Copied",
      description: "Share link copied to clipboard.",
    });
  };
  
  const toggleRecipient = (id: string) => {
    setRecipients(prev => 
      prev.includes(id) 
        ? prev.filter(r => r !== id) 
        : [...prev, id]
    );
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-blue-500" />
          Share Recipe with Colleagues
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Select Recipients</Label>
            <div className="space-y-2 max-h-48 overflow-y-auto border rounded-md p-2">
              {sampleTeachers.map((teacher) => (
                <div key={teacher.id} className="flex items-center space-x-2 py-1 border-b last:border-0">
                  <Checkbox 
                    id={`teacher-${teacher.id}`}
                    checked={recipients.includes(teacher.id)}
                    onCheckedChange={() => toggleRecipient(teacher.id)}
                  />
                  <div className="flex-grow">
                    <Label 
                      htmlFor={`teacher-${teacher.id}`}
                      className="font-medium cursor-pointer"
                    >
                      {teacher.name}
                    </Label>
                    <p className="text-xs text-gray-500">{teacher.department} • {teacher.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="permission">Permission Level</Label>
            <Select value={permission} onValueChange={setPermission}>
              <SelectTrigger id="permission">
                <SelectValue placeholder="Select permission" />
              </SelectTrigger>
              <SelectContent>
                {permissionLevels.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Add a Message (Optional)</Label>
            <Textarea 
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="e.g., Here's that recipe we discussed in the meeting."
              rows={2}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="notifyOnUse" 
              checked={notifyOnUse}
              onCheckedChange={(checked) => setNotifyOnUse(!!checked)}
            />
            <Label htmlFor="notifyOnUse">Notify me when this recipe is used</Label>
          </div>
          
          <Button 
            onClick={handleShare} 
            disabled={recipients.length === 0}
            className="w-full"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share with Selected Colleagues
          </Button>
          
          {shareLink && (
            <div className="mt-4 p-3 bg-blue-50 rounded-md border border-blue-100">
              <p className="text-sm font-medium text-blue-700 mb-2">Recipe shared successfully!</p>
              <div className="flex items-center gap-2">
                <Input 
                  value={shareLink}
                  readOnly
                  className="flex-grow bg-white"
                />
                <Button size="sm" variant="outline" onClick={handleCopyLink}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecipeSharingTool;
