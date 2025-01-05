/** @format */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { InfoIcon } from "lucide-react";

export function IOPanel() {
  return (
    <TooltipProvider>
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="space-y-1 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-gray-800 dark:to-gray-900">
          <CardTitle className="text-2xl font-bold flex items-center justify-between text-slate-800 dark:text-slate-100">
            I/O Ports
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 p-4">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                Port
              </span>
              <Tooltip delayDuration={300}>
                <TooltipTrigger>
                  <InfoIcon className="h-4 w-4 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300" />
                </TooltipTrigger>
                <TooltipContent className="bg-slate-100 dark:bg-slate-900">
                  <p className="max-w-xs text-sm text-slate-900 dark:text-slate-200">
                    Specify the port number (in hexadecimal) to interact with.
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="flex gap-2">
              <Input
                type="text"
                className="w-16 font-mono bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded p-2 focus:border-slate-300 dark:focus:border-gray-600"
                defaultValue="00"
                placeholder="Port"
              />
              <Button
                variant="outline"
                size="icon"
                className="w-8 h-8 bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded hover:bg-slate-100 dark:hover:bg-gray-700"
              >
                -
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="w-8 h-8 bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded hover:bg-slate-100 dark:hover:bg-gray-700"
              >
                +
              </Button>
              <Input
                type="text"
                className="w-24 font-mono bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded p-2 focus:border-slate-300 dark:focus:border-gray-600"
                defaultValue="00"
                placeholder="Value"
              />
            </div>
          </div>
          <div />
          <Button
            variant="secondary"
            size="sm"
            className="bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded hover:bg-slate-100 dark:hover:bg-gray-700"
          >
            Update Port Value
          </Button>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-slate-700 dark:text-slate-200">
              Input Port: 00
            </div>
            <div className="text-slate-700 dark:text-slate-200">
              Output Port: 00
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}
