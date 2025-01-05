/** @format */

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  FileText,
  RotateCcw,
  Play,
  Pause,
  SkipForward,
  Save,
  Printer,
  Settings,
  BugIcon as Debug,
} from "lucide-react";

// Toolbar component with tooltips
export function Toolbar() {
 
  // const isRunning = useSelector((state) => state.cpu).isRunning;

  return (
    <Card className="bg-inherit shadow-none border-0">
      <CardContent className="p-2">
        <TooltipProvider>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <FileText className="h-4 w-4 text-slate-700 dark:text-slate-300" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-slate-100 dark:bg-slate-900">
                  <p className="text-sm text-slate-900 dark:text-slate-200">
                    New File
                  </p>
                </TooltipContent>
              </Tooltip>

              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <Save className="h-4 w-4 text-slate-700 dark:text-slate-300" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-slate-100 dark:bg-slate-900">
                  <p className="text-sm text-slate-900 dark:text-slate-200">
                    Save
                  </p>
                </TooltipContent>
              </Tooltip>

              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <Printer className="h-4 w-4 text-slate-700 dark:text-slate-300" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-slate-100 dark:bg-slate-900">
                  <p className="text-sm text-slate-900 dark:text-slate-200">
                    Print
                  </p>
                </TooltipContent>
              </Tooltip>

              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <Settings className="h-4 w-4 text-slate-700 dark:text-slate-300" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-slate-100 dark:bg-slate-900">
                  <p className="text-sm text-slate-900 dark:text-slate-200">
                    Settings
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="h-4 w-px bg-slate-200 dark:bg-slate-700" />

            <div className="flex items-center gap-1">
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <RotateCcw className="h-4 w-4 text-orange-300 dark:text-orange-300" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-slate-100 dark:bg-slate-900">
                  <p className="text-sm text-slate-900 dark:text-slate-200">
                    Reset
                  </p>
                </TooltipContent>
              </Tooltip>

              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <Play
                      className="h-4 w-4 text-green-500 dark:text-green-500"
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-slate-100 dark:bg-slate-900">
                  <p className="text-sm text-slate-900 dark:text-slate-200">
                    Run
                  </p>
                </TooltipContent>
              </Tooltip>

              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <Pause className="h-4 w-4 text-slate-700 dark:text-slate-300" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-slate-100 dark:bg-slate-900">
                  <p className="text-sm text-slate-900 dark:text-slate-200">
                    Pause
                  </p>
                </TooltipContent>
              </Tooltip>

              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <SkipForward className="h-4 w-4 text-slate-700 dark:text-slate-300" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-slate-100 dark:bg-slate-900">
                  <p className="text-sm text-slate-900 dark:text-slate-200">
                    Step Forward
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="h-4 w-px bg-slate-200 dark:bg-slate-700" />

            <div className="flex items-center gap-1">
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <Debug className="h-4 w-4 text-red-500 dark:text-red-500" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-slate-100 dark:bg-slate-900">
                  <p className="text-sm text-red-900 dark:text-slate-200">
                    Debug
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
}
