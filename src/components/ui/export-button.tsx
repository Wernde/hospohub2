
import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface ExportButtonProps extends ButtonProps {
  onExport: () => void;
  label?: string;
}

const ExportButton = ({ 
  onExport, 
  label = "Export", 
  className,
  variant = "outline",
  ...props 
}: ExportButtonProps) => {
  return (
    <Button
      variant={variant}
      size="sm"
      onClick={onExport}
      className={`flex items-center gap-1 ${className || ''}`}
      {...props}
    >
      <Download className="h-4 w-4" />
      {label}
    </Button>
  );
};

export default ExportButton;
