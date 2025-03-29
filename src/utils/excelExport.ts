
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { ensureSharePointFolder, saveExcelToSharePoint, isSharePointConnected } from './sharePointIntegration';

type ClassData = {
  id: string;
  className: string;
  instructor: string;
  location: string;
  date: Date;
  startTime: string;
  endTime: string;
  description: string;
  studentCount: number;
};

type ShoppingItem = {
  id: string;
  name: string;
  quantity: string;
  unit: string;
  category: string;
  recipeName: string;
};

type RecipeData = {
  id: string;
  name: string;
  difficulty: string;
  prepTime: number | string;
  cookTime: number | string;
  servings: number | string;
  ingredients: string;
  instructions: string;
};

/**
 * Create and download an Excel file with class data
 */
export const exportClasses = async (classes: ClassData[], filename: string = 'classes') => {
  try {
    const worksheet = XLSX.utils.json_to_sheet(
      classes.map(cls => ({
        id: cls.id,
        'Class Name': cls.className,
        Instructor: cls.instructor,
        Location: cls.location,
        Date: cls.date.toLocaleDateString(),
        'Start Time': cls.startTime,
        'End Time': cls.endTime,
        Description: cls.description,
        'Student Count': cls.studentCount,
      }))
    );

    // Set column widths
    const columnWidths = [
      { wch: 5 },  // id
      { wch: 25 }, // Class Name
      { wch: 20 }, // Instructor
      { wch: 20 }, // Location
      { wch: 15 }, // Date
      { wch: 15 }, // Start Time
      { wch: 15 }, // End Time
      { wch: 40 }, // Description
      { wch: 15 }, // Student Count
    ];
    worksheet['!cols'] = columnWidths;

    // Create workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Classes');

    // If SharePoint is connected, save to SharePoint
    if (isSharePointConnected()) {
      // Create an Excel file
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
      
      // Ensure the folder exists in SharePoint
      await ensureSharePointFolder('Classes');
      
      // Save to SharePoint
      await saveExcelToSharePoint(blob, `${filename}.xlsx`, 'Classes');
    } else {
      // Standard download if SharePoint not connected
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
      saveAs(blob, `${filename}.xlsx`);
    }
  } catch (error) {
    console.error('Error exporting classes:', error);
  }
};

/**
 * Create and download an Excel file with shopping list data
 */
export const exportShoppingList = async (items: ShoppingItem[], filename: string = 'shopping-list') => {
  try {
    // Create array of objects for Excel
    const data = items.map(item => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      unit: item.unit,
      category: item.category,
      recipeName: item.recipeName
    }));

    // Define headers in specific order
    const headers = ['id', 'name', 'quantity', 'unit', 'category', 'recipeName'] as (keyof ShoppingItem)[];

    // Create worksheet with ordered columns
    const worksheet = XLSX.utils.json_to_sheet(data, { header: headers });

    // Set column widths
    const columnWidths = [
      { wch: 5 },  // id
      { wch: 30 }, // name
      { wch: 10 }, // quantity
      { wch: 10 }, // unit
      { wch: 15 }, // category
      { wch: 30 }, // recipeName
    ];
    worksheet['!cols'] = columnWidths;

    // Create workbook and append worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Shopping List');

    // If SharePoint is connected, save to SharePoint
    if (isSharePointConnected()) {
      // Create an Excel file
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
      
      // Ensure the folder exists in SharePoint
      await ensureSharePointFolder('Shopping');
      
      // Save to SharePoint
      await saveExcelToSharePoint(blob, `${filename}.xlsx`, 'Shopping');
    } else {
      // Standard download
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
      saveAs(blob, `${filename}.xlsx`);
    }
  } catch (error) {
    console.error('Error exporting shopping list:', error);
  }
};

/**
 * Create and download an Excel file with recipe data
 */
export const exportRecipes = async (recipes: RecipeData[], filename: string = 'recipes') => {
  try {
    // Create array of objects for Excel
    const data = recipes.map(recipe => ({
      id: recipe.id,
      name: recipe.name,
      difficulty: recipe.difficulty,
      prepTime: String(recipe.prepTime),
      cookTime: String(recipe.cookTime),
      servings: String(recipe.servings),
      ingredients: recipe.ingredients,
      instructions: recipe.instructions
    }));

    // Define headers in specific order
    const headers = ['id', 'name', 'difficulty', 'prepTime', 'cookTime', 'servings', 'ingredients', 'instructions'] as (keyof RecipeData)[];

    // Create worksheet with ordered columns
    const worksheet = XLSX.utils.json_to_sheet(data, { header: headers });

    // Set column widths
    const columnWidths = [
      { wch: 5 },  // id
      { wch: 30 }, // name
      { wch: 15 }, // difficulty
      { wch: 10 }, // prepTime
      { wch: 10 }, // cookTime
      { wch: 10 }, // servings
      { wch: 50 }, // ingredients
      { wch: 50 }, // instructions
    ];
    worksheet['!cols'] = columnWidths;

    // Create workbook and append worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Recipes');

    // If SharePoint is connected, save to SharePoint
    if (isSharePointConnected()) {
      // Create an Excel file
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
      
      // Ensure the folder exists in SharePoint
      await ensureSharePointFolder('Recipes');
      
      // Save to SharePoint
      await saveExcelToSharePoint(blob, `${filename}.xlsx`, 'Recipes');
    } else {
      // Standard download
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
      saveAs(blob, `${filename}.xlsx`);
    }
  } catch (error) {
    console.error('Error exporting recipes:', error);
  }
};
