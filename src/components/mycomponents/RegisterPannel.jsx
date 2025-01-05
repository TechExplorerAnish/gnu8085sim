/** @format */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { InfoIcon } from "lucide-react";

const registerDescriptions = {
  A: "Accumulator - Primary register for arithmetic operations",
  BC: "BC Register Pair - Used for data/address operations",
  DE: "DE Register Pair - Used for data/address operations",
  HL: "HL Register Pair - Main register for memory addressing",
  PSW: "Program Status Word - Contains flags and accumulator",
  PC: "Program Counter - Points to next instruction",
  SP: "Stack Pointer - Points to current stack position",
  "Int-Reg": "Interrupt Register - Handles interrupt control",
};

export function RegistersPanel() {
  const registers = {
    A: "00",
    BC: ["00", "00"],
    DE: ["00", "00"],
    HL: ["00", "00"],
    PSW: ["00", "00"],
    PC: ["00", "00"],
    SP: ["00", "00"],
    "Int-Reg": "00",
  };

  return (
    <TooltipProvider>
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="space-y-1 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-gray-800 dark:to-gray-900">
          <CardTitle className="text-2xl font-bold flex items-center justify-between text-slate-800 dark:text-slate-100">
            Registers
            <Badge variant="outline" className="text-xs">
              8080
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 p-4">
          {Object.entries(registers).map(([name, value]) => (
            <div
              key={name}
              className="grid grid-cols-3 gap-2 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-gray-800 transition-all duration-200"
            >
              <div className="flex items-center gap-2">
                <span className="font-mono font-semibold text-slate-700 dark:text-slate-200">
                  {name}
                </span>
                <Tooltip delayDuration={300}>
                  <TooltipTrigger>
                    <InfoIcon className="h-4 w-4 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-slate-100 dark:bg-slate-900">
                    <p className="max-w-xs text-sm text-slate-900 dark:text-slate-200">
                      {registerDescriptions[name]}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              {Array.isArray(value) ? (
                <>
                  <div className="font-mono bg-slate-50 dark:bg-gray-800 p-2 rounded text-center border border-slate-200 dark:border-gray-700 hover:border-slate-300 dark:hover:border-gray-600 transition-colors">
                    {value[0]}
                  </div>
                  <div className="font-mono bg-slate-50 dark:bg-gray-800 p-2 rounded text-center border border-slate-200 dark:border-gray-700 hover:border-slate-300 dark:hover:border-gray-600 transition-colors">
                    {value[1]}
                  </div>
                </>
              ) : (
                <div className="font-mono col-span-2 bg-slate-50 dark:bg-gray-800 p-2 rounded text-center border border-slate-200 dark:border-gray-700 hover:border-slate-300 dark:hover:border-gray-600 transition-colors">
                  {value}
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}
