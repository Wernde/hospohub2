
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { convertUnit, unitConversions } from '@/utils/recipeUnitConversion';
import { ArrowRight } from 'lucide-react';

const UnitConversionTool = () => {
  const [quantity, setQuantity] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<string>('cup');
  const [toUnit, setToUnit] = useState<string>('ml');
  const [result, setResult] = useState<number | null>(null);
  
  // Filter units by type for selectors
  const getUnitsByType = (selectedUnit: string) => {
    const type = unitConversions[selectedUnit]?.type;
    return Object.keys(unitConversions).filter(
      unit => unitConversions[unit].type === type
    );
  };
  
  const [fromUnitOptions, setFromUnitOptions] = useState<string[]>([]);
  const [toUnitOptions, setToUnitOptions] = useState<string[]>([]);
  
  useEffect(() => {
    if (fromUnit) {
      const options = getUnitsByType(fromUnit);
      setFromUnitOptions(options);
      setToUnitOptions(options);
      
      // Default to first compatible unit if current toUnit is incompatible
      if (!options.includes(toUnit)) {
        setToUnit(options[0]);
      }
    }
  }, [fromUnit]);
  
  const handleConvert = () => {
    const numericQuantity = parseFloat(quantity);
    if (isNaN(numericQuantity)) {
      setResult(null);
      return;
    }
    
    const convertedValue = convertUnit(numericQuantity, fromUnit, toUnit);
    setResult(convertedValue);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Unit Conversion Tool</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input 
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              type="number"
              step="0.01"
              min="0"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="fromUnit">From</Label>
            <Select value={fromUnit} onValueChange={setFromUnit}>
              <SelectTrigger id="fromUnit">
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(unitConversions).map((unit) => (
                  <SelectItem key={unit} value={unit}>
                    {unit}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex justify-center items-center">
            <ArrowRight className="h-5 w-5 text-rgba(0, 0, 0, 0.12)-500" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="toUnit">To</Label>
            <Select value={toUnit} onValueChange={setToUnit}>
              <SelectTrigger id="toUnit">
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                {toUnitOptions.map((unit) => (
                  <SelectItem key={unit} value={unit}>
                    {unit}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2 flex items-end">
            <Button onClick={handleConvert} className="w-full">Convert</Button>
          </div>
          
          {result !== null && (
            <div className="md:col-span-5 p-3 bg-rgba(0, 0, 0, 0.12)-50 rounded-md mt-4">
              <p className="text-center">
                <span className="font-semibold">{quantity} {fromUnit}</span>
                {' = '}
                <span className="font-semibold">{result.toFixed(2)} {toUnit}</span>
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UnitConversionTool;
