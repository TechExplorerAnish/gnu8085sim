import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { InfoIcon } from "lucide-react";

export function ConversionPanel() {
  const [decimalValue, setDecimalValue] = useState("0");
  const [hexValue, setHexValue] = useState("0");
  const [error, setError] = useState("");

  const handleDecimalChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setDecimalValue(value);
      setError("");
    }
  };

  const handleHexChange = (e) => {
    const value = e.target.value;
    if (/^[0-9A-Fa-f]*$/.test(value)) {
      setHexValue(value);
      setError("");
    }
  };

  const convertToHex = () => {
    try {
      if (decimalValue === "") {
        setHexValue("0");
        return;
      }
      const decimal = parseInt(decimalValue, 10);
      if (isNaN(decimal)) {
        setError("Invalid decimal number");
        return;
      }
      const hex = decimal.toString(16).toUpperCase();
      setHexValue(hex);
      setError("");
    } catch (err) {
      setError("Conversion error");
      console.log(err);
    }
  };

  const convertToDec = () => {
    try {
      if (hexValue === "") {
        setDecimalValue("0");
        return;
      }
      const decimal = parseInt(hexValue, 16);
      if (isNaN(decimal)) {
        setError("Invalid hex number");
        return;
      }
      setDecimalValue(decimal.toString());
      setError("");
    } catch (err) {
      setError("Conversion error");
      console.log(err);
    }
  };

  return (
    <TooltipProvider>
      <Card className="shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 w-full max-w-xl mx-auto">
        <CardHeader className="space-y-1  bg-gradient-to-r from-slate-50 to-slate-100 dark:from-gray-800 dark:to-gray-900 p-4 sm:p-6">
          <CardTitle className="text-xl sm:text-2xl font-bold flex items-center justify-between text-slate-800 dark:text-slate-100">
            Decimal - Hex Conversion
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 p-3 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-200">
                  Decimal
                </span>
                <Tooltip delayDuration={300}>
                  <TooltipTrigger>
                    <InfoIcon className="h-4 w-4 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300" />
                  </TooltipTrigger>
                  <TooltipContent side="top" className="bg-slate-100 dark:bg-slate-900">
                    <p className="max-w-[200px] sm:max-w-xs text-xs sm:text-sm text-slate-900 dark:text-slate-200">
                      Enter a decimal number to convert to hexadecimal.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                type="text"
                className="font-mono text-sm sm:text-base bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded p-2 focus:border-slate-300 dark:focus:border-gray-600"
                value={decimalValue}
                onChange={handleDecimalChange}
                placeholder="Enter decimal"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-200">
                  Hex
                </span>
                <Tooltip delayDuration={300}>
                  <TooltipTrigger>
                    <InfoIcon className="h-4 w-4 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300" />
                  </TooltipTrigger>
                  <TooltipContent side="top" className="bg-slate-100 dark:bg-slate-900">
                    <p className="max-w-[200px] sm:max-w-xs text-xs sm:text-sm text-slate-900 dark:text-slate-200">
                      Enter a hexadecimal value to convert to decimal.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                type="text"
                className="font-mono text-sm sm:text-base bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded p-2 focus:border-slate-300 dark:focus:border-gray-600"
                value={hexValue}
                onChange={handleHexChange}
                placeholder="Enter hex"
              />
            </div>
          </div>
          
          {error && (
            <div className="text-xs sm:text-sm text-red-500 text-center p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
              {error}
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-2">
            <Button
              variant="secondary"
              size="sm"
              className="h-9 sm:h-10 bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded hover:bg-slate-100 dark:hover:bg-gray-700 text-sm sm:text-base"
              onClick={convertToHex}
            >
              To Hex
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="h-9 sm:h-10 bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded hover:bg-slate-100 dark:hover:bg-gray-700 text-sm sm:text-base"
              onClick={convertToDec}
            >
              To Dec
            </Button>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}

export default ConversionPanel;