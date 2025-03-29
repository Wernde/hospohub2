
import * as XLSX from 'xlsx';

// Generic export function that takes an array of data and exports it to Excel
export function exportToExcel<T>(
  data: T[],
  fileName: string = 'export',
  sheetName: string = 'Sheet1', 
  options?: {
    headers?: Record<keyof T, string>;
    customHeaderOrder?: (keyof T)[];
    transformData?: (item: T) => Record<string, any>;
  }
) {
  // If there's no data, alert the user and return
  if (!data.length) {
    alert('No data to export');
    return;
  }

  // Create transformed data if a transformer is provided
  const transformedData = options?.transformData 
    ? data.map(options.transformData)
    : data;

  // Create workbook and worksheet
  const workbook = XLSX.utils.book_new();
  
  // Convert data to worksheet
  let worksheet: XLSX.WorkSheet;
  
  // If headers are provided, use them
  if (options?.headers) {
    // If custom header order is provided, use it
    const headerRow = options.customHeaderOrder 
      ? options.customHeaderOrder.map(key => options.headers?.[key] || String(key))
      : Object.values(options.headers);
      
    const rows = transformedData.map(item => {
      if (options.customHeaderOrder) {
        return options.customHeaderOrder.map(key => item[key as string]);
      }
      return Object.keys(options.headers as Record<string, string>).map(key => item[key as keyof typeof item]);
    });
    
    // Create worksheet from rows with headers
    worksheet = XLSX.utils.aoa_to_sheet([headerRow, ...rows]);
  } else {
    // Create worksheet directly from JSON
    worksheet = XLSX.utils.json_to_sheet(transformedData);
  }
  
  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  
  // Auto-size columns
  const columnWidths = estimateColumnWidths(transformedData);
  worksheet['!cols'] = Object.keys(columnWidths).map(key => ({ wch: columnWidths[key] }));
  
  // Write to file and trigger download
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
}

// Function to estimate column widths based on data
function estimateColumnWidths<T>(data: T[]): Record<string, number> {
  const columnWidths: Record<string, number> = {};
  
  if (!data.length) return columnWidths;
  
  // Get all unique keys from data
  const allKeys = new Set<string>();
  data.forEach(item => {
    Object.keys(item as Record<string, any>).forEach(key => allKeys.add(key));
  });
  
  // Estimate width for each column
  allKeys.forEach((key, index) => {
    // Default min width (header)
    let maxWidth = String(key).length;
    
    // Check data for wider content
    data.forEach(item => {
      const value = (item as Record<string, any>)[key];
      if (value !== undefined && value !== null) {
        const valueStr = String(value);
        maxWidth = Math.max(maxWidth, valueStr.length);
      }
    });
    
    // Add some padding
    columnWidths[index] = Math.min(Math.max(maxWidth + 2, 10), 50);
  });
  
  return columnWidths;
}

// Specific export functions for different data types

// For shopping list
export function exportShoppingList(
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    unit: string;
    category?: string;
    recipeName?: string;
  }>,
  fileName: string = 'shopping-list'
) {
  const headers = {
    name: 'Item',
    quantity: 'Quantity',
    unit: 'Unit',
    category: 'Category',
    recipeName: 'Recipe'
  };
  
  const customHeaderOrder = ['name', 'quantity', 'unit', 'category', 'recipeName'];
  
  exportToExcel(items, fileName, 'Shopping List', { 
    headers, 
    customHeaderOrder 
  });
}

// For recipes
export function exportRecipes(
  recipes: Array<{
    id: string;
    name: string;
    difficulty: string;
    prepTime: number;
    cookTime: number;
    servings: number;
    ingredients?: string;
    instructions?: string;
  }>,
  fileName: string = 'recipes'
) {
  const headers = {
    name: 'Recipe Name',
    difficulty: 'Difficulty',
    prepTime: 'Prep Time (min)',
    cookTime: 'Cook Time (min)',
    servings: 'Servings',
    ingredients: 'Ingredients',
    instructions: 'Instructions'
  };
  
  const customHeaderOrder = ['name', 'difficulty', 'prepTime', 'cookTime', 'servings', 'ingredients', 'instructions'];
  
  exportToExcel(recipes, fileName, 'Recipes', { 
    headers, 
    customHeaderOrder 
  });
}

// For classes
export function exportClasses(
  classes: Array<{
    id?: string;
    className: string;
    instructor: string;
    location: string;
    date: Date;
    startTime: string;
    endTime: string;
    description?: string;
    studentCount?: number;
  }>,
  fileName: string = 'classes'
) {
  const headers = {
    className: 'Class Name',
    instructor: 'Instructor',
    location: 'Location',
    date: 'Date',
    startTime: 'Start Time',
    endTime: 'End Time',
    description: 'Description',
    studentCount: 'Number of Students'
  };
  
  const customHeaderOrder = ['className', 'instructor', 'location', 'date', 'startTime', 'endTime', 'description', 'studentCount'];
  
  // Transform the dates to readable format
  const transformData = (item: any) => {
    return {
      ...item,
      date: item.date instanceof Date 
        ? item.date.toLocaleDateString() 
        : item.date
    };
  };
  
  exportToExcel(classes, fileName, 'Classes', { 
    headers, 
    customHeaderOrder,
    transformData
  });
}

// For students
export function exportStudents(
  students: Array<{
    id: string;
    name: string;
    email: string;
    dietaryRequirements: string[];
    allergies: string[];
    notes?: string;
  }>,
  fileName: string = 'students'
) {
  const headers = {
    name: 'Student Name',
    email: 'Email',
    dietaryRequirements: 'Dietary Requirements',
    allergies: 'Allergies',
    notes: 'Notes'
  };
  
  const customHeaderOrder = ['name', 'email', 'dietaryRequirements', 'allergies', 'notes'];
  
  // Join arrays for readable export
  const transformData = (student: any) => {
    return {
      ...student,
      dietaryRequirements: student.dietaryRequirements.join(', '),
      allergies: student.allergies.join(', ')
    };
  };
  
  exportToExcel(students, fileName, 'Students', { 
    headers, 
    customHeaderOrder,
    transformData
  });
}
