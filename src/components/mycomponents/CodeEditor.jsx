/** @format */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { InfoIcon } from "lucide-react";
import { useState, useRef } from "react";


export function CodeEditor() {
  const [value, setValue] = useState(
    `;Program title\n\njmp start\n\n;data\n\n;code\nstart: nop\n\nhlt`
  );

  const height = "calc(100vh - 200px)"; // Dynamic height
  // const scrollViewportRef = useRef(null);
  const lineNumbersRef = useRef(null);

  // Calculate line numbers based on actual content
  const lineNumbers = value.split("\n").map((_, i) => i + 1);

  const handleScroll = (e) => {
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = e.target.scrollTop;
    }
  };

  return (
    <TooltipProvider>
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
        <CardHeader className="space-y-1 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-gray-800 dark:to-gray-900 flex-none">
          <CardTitle className="text-2xl font-bold flex items-center justify-between text-slate-800 dark:text-slate-100">
            Code Editor
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          {/* Load Address Section */}
          <div className="mb-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Load Address
                </span>
                <Tooltip delayDuration={300}>
                  <TooltipTrigger>
                    <InfoIcon className="h-4 w-4 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-slate-100 dark:bg-slate-900">
                    <p className="max-w-xs text-sm text-slate-900 dark:text-slate-200">
                      Specify the starting address for code execution.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <input
                id="loadAt"
                type="text"
                className="w-32 px-4 py-2  font-mono rounded-md border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800 text-slate-700 dark:text-slate-200 focus:border-slate-300 dark:focus:border-gray-600 transition-all"
                placeholder="Enter address..."
              />
            </div>
          </div>

          {/* Code Editor Section */}
          <div
            className="relative flex rounded-lg border border-slate-200 dark:border-gray-700"
            style={{ height }}
          >
            {/* Line Numbers */}
            <div
              ref={lineNumbersRef}
              className="flex-none w-12 overflow-y-auto bg-slate-50 dark:bg-gray-800 border-r border-slate-200 dark:border-gray-700"
              style={{ height: "100%" }}
            >
              {lineNumbers.map((num, i) => (
                <div
                  key={num}
                  className={`${
                    i == 0 ? "mt-2" : ""
                  } px-2 leading-6 text-sm font-mono text-right text-slate-400 dark:text-slate-500`}
                >
                  {num}
                </div>
              ))}
            </div>

            {/* Text Area */}
            <div className="flex-1 relative">
              <textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onScroll={handleScroll}
                className="w-full h-full font-mono text-sm leading-6 bg-slate-50 dark:bg-gray-800 text-slate-700 dark:text-slate-200 p-2 outline-none resize-none overflow-y-auto"
                spellCheck="false"
                style={{
                  minHeight: "100%",
                  maxHeight: "100%",
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}
