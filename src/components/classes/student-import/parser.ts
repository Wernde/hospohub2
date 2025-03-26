
import { Student } from '../dietary-form/types';

// Simple CSV parser - in a real app this would be more robust
export const parseCSVContent = (content: string): Student[] => {
  const lines = content.split(/\r?\n/).filter(line => line.trim());
  if (lines.length === 0) throw new Error('No data found');
  
  // Check if first line is headers
  const firstLine = lines[0].toLowerCase();
  const hasHeaders = firstLine.includes('name') || firstLine.includes('email');
  const startIndex = hasHeaders ? 1 : 0;
  
  return lines.slice(startIndex).map((line, index) => {
    const parts = line.split(',').map(part => part.trim());
    if (parts.length < 2) throw new Error(`Line ${index + 1} has insufficient data`);
    
    const name = parts[0];
    const email = parts[1];
    
    // Extract dietary requirements if present (comma-separated list)
    const dietaryRequirements = parts[2] ? parts[2].split(';').map(item => item.trim()) : [];
    
    // Extract allergies if present (comma-separated list)
    const allergies = parts[3] ? parts[3].split(';').map(item => item.trim()) : [];
    
    // Extract notes if present
    const notes = parts[4] || undefined;
    
    return {
      id: `imported-${index}-${Date.now()}`, // Generate a unique ID
      name,
      email,
      dietaryRequirements,
      allergies,
      notes
    };
  });
};

// AI text analysis simulation
export const simulateAIAnalysis = (): Promise<Student[]> => {
  // In a real app, this would call an AI service
  return new Promise((resolve) => {
    setTimeout(() => {
      const students: Student[] = [
        {
          id: `ai-1-${Date.now()}`,
          name: 'John Smith',
          email: 'john@example.com',
          dietaryRequirements: ['Vegetarian'],
          allergies: ['Nuts', 'Shellfish'],
          notes: 'Extracted from unstructured text with AI'
        },
        {
          id: `ai-2-${Date.now()}`,
          name: 'Jane Doe',
          email: 'jane@example.com',
          dietaryRequirements: ['Gluten-free'],
          allergies: ['Dairy'],
          notes: 'Extracted from unstructured text with AI'
        }
      ];
      resolve(students);
    }, 1500);
  });
};
