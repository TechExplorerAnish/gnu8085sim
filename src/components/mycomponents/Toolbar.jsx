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
import { useState, useEffect, useRef } from "react";

export function Toolbar({ sayhey }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const toolbarRef = useRef();
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsCompact(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const ToolButton = ({
    icon: Icon,
    label,
    color = "text-slate-700 dark:text-slate-300",
    onClick,
  }) => (
    <Tooltip delayDuration={300}>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-slate-100 dark:hover:bg-slate-800"
          onClick={onClick}
        >
          <Icon className={`h-4 w-4 ${color}`} />
          {isCompact && !isMobile && (
            <span className="ml-2 text-xs hidden lg:inline-block">{label}</span>
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent className="bg-slate-100 dark:bg-slate-900">
        <p className="text-sm text-slate-900 dark:text-slate-200">{label}</p>
      </TooltipContent>
    </Tooltip>
  );

  const Divider = () => (
    <div className="h-4 w-px bg-slate-200 dark:bg-slate-700" />
  );

  const onTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
    // console.log("ontouchstart: ", e);
  };
  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
    // console.log("ontouchmove: ", e);
  };
  const onTouchEnd = (e) => {
    console.log("ontouchend: ", e);
    sayhey(touchStart, touchEnd);
  };
  return (
    <Card className="bg-inherit shadow-none border-0" ref={toolbarRef}>
      <CardContent className="p-2">
        <TooltipProvider>
          <div
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            className="flex items-center justify-between w-full"
          >
            <div className="flex items-center gap-1 md:gap-2">
              {/* File Operations Group */}
              <div className="flex items-center gap-1">
                <ToolButton icon={FileText} label="New File" />
                {!isMobile && (
                  <>
                    <ToolButton icon={Save} label="Save" />
                    <ToolButton icon={Printer} label="Print" />
                  </>
                )}
                <ToolButton icon={Settings} label="Settings" />
              </div>

              {!isMobile && <Divider />}

              {/* Execution Controls Group */}
              <div className="flex items-center gap-1">
                <ToolButton
                  icon={RotateCcw}
                  label="Reset"
                  color="text-orange-300 dark:text-orange-300"
                />
                <ToolButton
                  icon={Play}
                  label="Run"
                  color="text-green-500 dark:text-green-500"
                />
                {!isMobile && (
                  <>
                    <ToolButton icon={Pause} label="Pause" />
                    <ToolButton icon={SkipForward} label="Step Forward" />
                  </>
                )}
              </div>

              {!isMobile && <Divider />}

              {/* Debug Group */}
              <div className="flex items-center gap-1">
                <ToolButton
                  icon={Debug}
                  label="Debug"
                  color="text-red-500 dark:text-red-500"
                />
              </div>
            </div>
          </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
}
