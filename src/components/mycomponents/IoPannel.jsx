import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { InfoIcon, Minus, Plus } from "lucide-react";

export function IOPanel() {
  return (
    <TooltipProvider>
      <Card className="shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 w-full max-w-md mx-auto">
        <CardHeader className="space-y-1  bg-gradient-to-r from-slate-50 to-slate-100 dark:from-gray-800 dark:to-gray-900 p-4 sm:p-6">
          <CardTitle className="text-xl sm:text-2xl font-bold flex items-center justify-between text-slate-800 dark:text-slate-100">
            I/O Ports
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 p-3 sm:p-6">
          <div className="flex flex-col items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-200">
                Port
              </span>
              <Tooltip delayDuration={300}>
                <TooltipTrigger>
                  <InfoIcon className="h-4 w-4 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300" />
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-slate-100 dark:bg-slate-900">
                  <p className="max-w-[200px] sm:max-w-xs text-xs sm:text-sm text-slate-900 dark:text-slate-200">
                    Specify the port number (in hexadecimal) to interact with.
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  className="w-16 sm:w-20 font-mono text-center bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded p-2 focus:border-slate-300 dark:focus:border-gray-600 text-sm sm:text-base"
                  defaultValue="00"
                  placeholder="Port"
                  maxLength={2}
                />
                <div className="flex gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-8 h-8 sm:w-9 sm:h-9 bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded hover:bg-slate-100 dark:hover:bg-gray-700 flex items-center justify-center"
                  >
                    <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-8 h-8 sm:w-9 sm:h-9 bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded hover:bg-slate-100 dark:hover:bg-gray-700 flex items-center justify-center"
                  >
                    <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </div>
              </div>
              <Input
                type="text"
                className="w-20 sm:w-24 font-mono text-center bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded p-2 focus:border-slate-300 dark:focus:border-gray-600 text-sm sm:text-base"
                defaultValue="00"
                placeholder="Value"
                maxLength={2}
              />
            </div>
          </div>

          <Button
            variant="secondary"
            size="sm"
            className="w-full sm:w-auto sm:mx-auto bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded hover:bg-slate-100 dark:hover:bg-gray-700 text-sm sm:text-base px-4 py-2"
          >
            Update Port Value
          </Button>

          <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm bg-slate-50/50 dark:bg-gray-800/50 p-3 rounded-lg">
            <div className="text-slate-700 dark:text-slate-200 flex items-center justify-center">
              Input Port: 00
            </div>
            <div className="text-slate-700 dark:text-slate-200 flex items-center justify-center">
              Output Port: 00
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}

export default IOPanel;