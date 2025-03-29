
/**
 * SharePoint integration utilities for handling data storage and retrieval
 */

// Storage key for SharePoint connection info
const SHAREPOINT_CONFIG_KEY = 'sharepoint-config';

interface SharePointConfig {
  connected: boolean;
  siteUrl?: string;
  username?: string;
  rootFolder?: string;
  lastConnected?: string;
}

// Save SharePoint configuration to localStorage
export function saveSharePointConfig(config: Omit<SharePointConfig, 'connected' | 'lastConnected'>): void {
  const fullConfig: SharePointConfig = {
    ...config,
    connected: true,
    lastConnected: new Date().toISOString()
  };
  
  localStorage.setItem(SHAREPOINT_CONFIG_KEY, JSON.stringify(fullConfig));
}

// Authenticate with SharePoint (mock implementation)
export async function authenticateSharePoint(
  siteUrl: string,
  username: string,
  password: string,
  rootFolder: string
): Promise<{ success: boolean; message: string }> {
  // This would be a real authentication request in a production implementation
  console.log(`Authenticating with SharePoint: ${siteUrl}`);
  
  // For demonstration, do basic validation
  if (!siteUrl || !siteUrl.includes('sharepoint.com')) {
    return {
      success: false,
      message: "Please enter a valid SharePoint URL"
    };
  }
  
  if (!username || !username.includes('@')) {
    return {
      success: false,
      message: "Please enter a valid email address"
    };
  }
  
  if (!password || password.length < 8) {
    return {
      success: false,
      message: "Please enter a valid password (min 8 characters)"
    };
  }
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Save config on successful auth
  saveSharePointConfig({ siteUrl, username, rootFolder });
  
  // Mock success response
  return {
    success: true,
    message: `Successfully connected to ${siteUrl}`
  };
}

// Save an Excel file to SharePoint
export async function saveExcelToSharePoint(
  fileData: Blob | ArrayBuffer,
  fileName: string,
  folderPath: string
): Promise<{ success: boolean; message: string; fileUrl?: string }> {
  const config = getSharePointConnectionInfo();
  
  // If not connected to SharePoint, return error
  if (!config.connected) {
    return {
      success: false,
      message: "Not connected to SharePoint. Please connect first."
    };
  }
  
  console.log(`Saving ${fileName} to SharePoint folder ${folderPath}`);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In a real implementation, this would upload the file to SharePoint
  
  // Mock success response
  return {
    success: true,
    message: `File ${fileName} has been saved to ${folderPath} successfully.`,
    fileUrl: `${config.siteUrl}/Shared%20Documents/${folderPath}/${fileName}`
  };
}

// Create folders in SharePoint if they don't exist
export async function ensureSharePointFolder(
  folderPath: string
): Promise<{ success: boolean; message: string }> {
  const config = getSharePointConnectionInfo();
  
  // If not connected to SharePoint, return error
  if (!config.connected) {
    return {
      success: false,
      message: "Not connected to SharePoint. Please connect first."
    };
  }
  
  console.log(`Ensuring SharePoint folder ${folderPath} exists`);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock success response
  return {
    success: true,
    message: `Folder ${folderPath} has been created or already exists.`
  };
}

// Check if SharePoint is connected
export function isSharePointConnected(): boolean {
  const config = getSharePointConnectionInfo();
  return config.connected;
}

// Get SharePoint connection info from localStorage
export function getSharePointConnectionInfo(): SharePointConfig {
  const storedConfig = localStorage.getItem(SHAREPOINT_CONFIG_KEY);
  if (!storedConfig) {
    return { connected: false };
  }
  
  try {
    const config = JSON.parse(storedConfig) as SharePointConfig;
    return { ...config, connected: true };
  } catch (error) {
    console.error("Error parsing SharePoint config:", error);
    return { connected: false };
  }
}

// Get files from SharePoint folder (mock implementation)
export async function getFilesFromSharePoint(
  folderPath: string
): Promise<{ success: boolean; files?: Array<{ name: string; url: string; modified: string }>; message?: string }> {
  const config = getSharePointConnectionInfo();
  
  // If not connected to SharePoint, return error
  if (!config.connected) {
    return {
      success: false,
      message: "Not connected to SharePoint. Please connect first."
    };
  }
  
  console.log(`Getting files from SharePoint folder ${folderPath}`);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Mock response with sample files
  return {
    success: true,
    files: [
      { 
        name: 'shopping-list.xlsx', 
        url: `${config.siteUrl}/Shared%20Documents/${folderPath}/shopping-list.xlsx`,
        modified: new Date().toISOString()
      },
      { 
        name: 'recipes.xlsx', 
        url: `${config.siteUrl}/Shared%20Documents/${folderPath}/recipes.xlsx`,
        modified: new Date(Date.now() - 86400000).toISOString() // Yesterday
      }
    ]
  };
}

// Download file from SharePoint (mock implementation)
export async function downloadFileFromSharePoint(
  fileUrl: string
): Promise<{ success: boolean; data?: Blob; message?: string }> {
  const config = getSharePointConnectionInfo();
  
  // If not connected to SharePoint, return error
  if (!config.connected) {
    return {
      success: false,
      message: "Not connected to SharePoint. Please connect first."
    };
  }
  
  console.log(`Downloading file from SharePoint: ${fileUrl}`);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  // In a real implementation, this would download the file from SharePoint
  // For now, just return a mock empty blob
  return {
    success: true,
    data: new Blob(["Mock file content"], { type: "application/octet-stream" })
  };
}

// Disconnect from SharePoint
export function disconnectSharePoint(): void {
  localStorage.removeItem(SHAREPOINT_CONFIG_KEY);
}
