
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserCircle, Edit, Save, Plus, X } from 'lucide-react';

const RecipeAttributionManager = () => {
  const [creator, setCreator] = useState('');
  const [newContributor, setNewContributor] = useState('');
  const [contributors, setContributors] = useState<string[]>([]);
  const [school, setSchool] = useState('');
  const [department, setDepartment] = useState('');
  const [notes, setNotes] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  
  const handleAddContributor = () => {
    if (newContributor.trim() && !contributors.includes(newContributor.trim())) {
      setContributors([...contributors, newContributor.trim()]);
      setNewContributor('');
    }
  };
  
  const handleRemoveContributor = (contributor: string) => {
    setContributors(contributors.filter(c => c !== contributor));
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <UserCircle className="h-5 w-5 text-rgba(0, 0, 0, 0.12)-500" />
          Recipe Attribution
        </CardTitle>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? (
            <>
              <Save className="h-4 w-4 mr-1" />
              Save
            </>
          ) : (
            <>
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="creator">Original Creator</Label>
              <Input 
                id="creator"
                value={creator}
                onChange={(e) => setCreator(e.target.value)}
                placeholder="e.g. John Smith"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="school">School/Institution</Label>
              <Input 
                id="school"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                placeholder="e.g. Culinary Institute"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input 
                id="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="e.g. Pastry Arts"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Contributors</Label>
              <div className="flex gap-2">
                <Input 
                  value={newContributor}
                  onChange={(e) => setNewContributor(e.target.value)}
                  placeholder="Add contributor"
                  className="flex-grow"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddContributor();
                    }
                  }}
                />
                <Button type="button" onClick={handleAddContributor}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-2">
                {contributors.map((contributor, index) => (
                  <Badge key={index} variant="outline" className="py-1 px-2 flex items-center gap-1">
                    {contributor}
                    <button 
                      type="button" 
                      onClick={() => handleRemoveContributor(contributor)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Attribution Notes</Label>
              <Textarea 
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any additional attribution information..."
                rows={3}
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {creator ? (
              <div>
                <p className="text-sm text-gray-500">Original Creator</p>
                <p className="font-medium">{creator}</p>
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">No creator specified yet</p>
            )}
            
            {school && (
              <div>
                <p className="text-sm text-gray-500">School/Institution</p>
                <p>{school}</p>
              </div>
            )}
            
            {department && (
              <div>
                <p className="text-sm text-gray-500">Department</p>
                <p>{department}</p>
              </div>
            )}
            
            {contributors.length > 0 && (
              <div>
                <p className="text-sm text-gray-500">Contributors</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {contributors.map((contributor, index) => (
                    <Badge key={index} variant="secondary">
                      {contributor}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {notes && (
              <div>
                <p className="text-sm text-gray-500">Notes</p>
                <p className="text-sm">{notes}</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecipeAttributionManager;
