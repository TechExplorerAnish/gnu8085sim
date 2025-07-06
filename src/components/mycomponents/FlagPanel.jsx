/** @format */

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Info } from "lucide-react";
import { useRegisterStore } from "../../store/registerStore";

const flagDescriptions = {
  S: "Sign Flag - Set if the result is negative",
  Z: "Zero Flag - Set if the result is zero",
  AC: "Auxiliary Carry Flag - Set if there was a carry from bit 3 to bit 4",
  P: "Parity Flag - Set if the number of 1 bits is even",
  CY: "Carry Flag - Set if the result generated a carry",
};

export default function FlagPanel() {
  const { flags, setFlags } = useRegisterStore();

  // Convert flags object to array format for rendering
  const flagsArray = [
    { name: "S", value: flags.S },
    { name: "Z", value: flags.Z },
    { name: "AC", value: flags.AC },
    { name: "P", value: flags.P },
    { name: "CY", value: flags.CY },
  ];

  const toggleFlag = (flagName) => {
    setFlags({
      [flagName]: flags[flagName] ? 0 : 1
    });
  };

  return (
    <TooltipProvider>
      <Card className="hover:shadow-xl overflow-hidden transition-shadow duration-300">
        <CardHeader className="space-y-1 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-gray-800 dark:to-gray-900">
          <CardTitle className="text-2xl font-bold flex items-center justify-between text-slate-800 dark:text-slate-100">
            Processor Flags
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col pt-2">
            {flagsArray.map((flag, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Badge
                    variant={flag.value ? "default" : "outline"}
                    className={`w-12 text-center font-bold text-sm ${
                      flag.value
                        ? "bg-green-500 text-white"
                        : "bg-slate-100 text-slate-800 dark:bg-gray-800 dark:text-slate-100"
                    }`}
                  >
                    {flag.name}
                  </Badge>
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-slate-400 hover:text-slate-600 dark:text-zinc-300 dark:hover:text-zinc-300" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-slate-100 dark:bg-slate-900">
                      <p className="max-w-xs text-sm text-slate-800 dark:text-zinc-100">
                        {flagDescriptions[flag.name]}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Toggle
                  pressed={Boolean(flag.value)}
                  onPressedChange={() => toggleFlag(flag.name)}
                  className={`font-mono font-bold w-16 ${
                    flag.value
                      ? "bg-green-500 hover:bg-green-600 text-white"
                      : "bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-gray-800 dark:text-slate-100 dark:hover:bg-gray-700"
                  }`}
                >
                  {flag.value ? "1" : "0"}
                </Toggle>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}