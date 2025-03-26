
export interface ClassSummaryProps {
  className: string;
  instructor: string;
  location: string;
  date: Date | undefined;
  startTime: string;
  endTime: string;
  description: string;
  selectedRecipes: {
    id: string;
    name: string;
    difficulty: string;
    prepTime: number;
    cookTime: number;
    servings: number;
  }[];
  students: {
    id: string;
    name: string;
    email: string;
    dietaryRequirements: string[];
    allergies: string[];
    notes?: string;
  }[];
}

export interface ClassDetailCardProps {
  className: string;
  instructor: string;
  location: string;
  date: Date | undefined;
  startTime: string;
  endTime: string;
}

export interface ParticipantCardProps {
  studentCount: number;
  dietaryRequirementsCount: number;
}

export interface RecipeListProps {
  recipes: {
    id: string;
    name: string;
    difficulty: string;
    prepTime: number;
    cookTime: number;
    servings: number;
  }[];
}

export interface StudentListProps {
  students: {
    id: string;
    name: string;
    email: string;
    dietaryRequirements: string[];
    allergies: string[];
    notes?: string;
  }[];
}
