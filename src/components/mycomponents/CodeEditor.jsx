/** @format */

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { InfoIcon } from "lucide-react";
import { createSyntaxStyles } from "@/utils";
import {useCodeStore} from "@/store/codeStore";


export function CodeEditor() {

  const {sourceCode, loadAddress, setLoadAddress,setSourceCode} = useCodeStore();
  const [programStartingAddr, setProgramStartingAddr] = useState("0000h")
  const [highlightedContent, setHighlightedContent] = useState("");
  const height = "calc(100vh - 200px)";
  const lineNumbersRef = useRef(null);
  const textAreaRef = useRef(null);
  const highlightRef = useRef(null);
  const editorWrapperRef = useRef(null);
  

  useEffect(()=>{
    const hexloadAddress = parseInt(loadAddress, 16).toString(16).padStart(4, '0') + 'h';
    setProgramStartingAddr(hexloadAddress);
  },[])

  useEffect(() => {
    setHighlightedContent(createSyntaxStyles(sourceCode));
  }, [sourceCode]);

  const handleProgramCounterInput = (e)=>{
    const inputValue = e.target.value.trim();
    if(inputValue.endsWith('h') || inputValue.endsWith('H')) {
      const hexValue = inputValue.slice(0, -1);
      if (/^[0-9a-fA-F]+$/.test(hexValue)) {
       const decimalValue = parseInt(hexValue, 16);
        if (decimalValue < 0 || decimalValue > 0xFFFF) {
          alert("Address must be between 0x0000 and 0xFFFF.");
          e.target.value = programStartingAddr; // Reset to previous value
          return;
        }
        setProgramStartingAddr(`${hexValue}h`);
        setLoadAddress(decimalValue)

        
      } else {
        alert("Invalid hexadecimal address format.");
      }
    }
    else if (/^\d+$/.test(inputValue)) {
      const decimalValue = parseInt(inputValue, 10);
      if (decimalValue < 0 || decimalValue > 65535) {
        alert("Address must be between 0 and 65535.");
        e.target.value = programStartingAddr; // Reset to previous value
        return;
      }
      setProgramStartingAddr(`${decimalValue.toString(16).padStart(4, '0')}h`);
      setLoadAddress(decimalValue);
    } else {
      alert("Invalid address format. Use hexadecimal (e.g., 1A2Bh) or decimal (e.g., 6700).");
    }
  }


  const handleScroll = (e) => {
    const scrollTop = e.target.scrollTop;
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = scrollTop;
    }
    if (highlightRef.current) {
      highlightRef.current.scrollTop = scrollTop;
    }
  };

  // Calculate line numbers based on actual content
  const lineNumbers = sourceCode.split("\n").map((_, i) => i + 1);

  return (
    <TooltipProvider>
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
        <CardHeader className="space-y-1 rounded-t-lg bg-gradient-to-r from-slate-50 to-slate-100 dark:from-gray-800 dark:to-gray-900 flex-none">
          <CardTitle className="text-2xl font-bold flex items-center justify-between text-slate-800 dark:text-slate-100">
            Code Editor
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
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
              <Input
                id="loadAt"
                type="text"
                value={programStartingAddr}
                onChange={(e) => setProgramStartingAddr(e.target.value)}
                onBlur={handleProgramCounterInput}
                className="px-4 py-2 font-mono rounded-md border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800 text-slate-700 dark:text-slate-200 focus:border-slate-300 dark:focus:border-gray-600 transition-all"
                placeholder="Enter address..."
              />
            </div>
          </div>

          <div
            ref={editorWrapperRef}
            className="relative flex rounded-lg border border-slate-200 dark:border-gray-700"
            style={{ height }}
          >
            {/* Line Numbers Column */}
            <div
              ref={lineNumbersRef}
              className="flex-none w-12 rounded-l-lg bg-slate-50 dark:bg-gray-800 border-r border-slate-200 dark:border-gray-700 overflow-hidden"
              style={{ height: "100%" }}
            >
              <div className="pt-2 w-full">
                {lineNumbers.map((num) => (
                  <div
                    key={num}
                    className="px-2 text-right text-sm font-mono text-slate-400 dark:text-slate-500"
                    style={{ height: "24px", lineHeight: "24px" }}
                  >
                    {num}
                  </div>
                ))}
              </div>
            </div>

            {/* Editor Area */}
            <div className="flex-1 relative overflow-hidden">
              {/* Syntax Highlighting Layer */}
              <div
                ref={highlightRef}
                className="absolute top-0 left-0 w-full h-full pointer-events-none p-2 font-mono text-sm whitespace-pre overflow-hidden"
                dangerouslySetInnerHTML={{ __html: highlightedContent }}
                style={{
                  color: "#64748b",
                  lineHeight: "24px",
                }}
              />
              {/* Textarea Layer */}
              <textarea
                ref={textAreaRef}
                value={sourceCode}
                onChange={(e)=>setSourceCode(e.target.value)}
                onScroll={handleScroll}
                className="absolute top-0 left-0 w-full h-full font-mono text-sm bg-transparent text-transparent caret-slate-700 dark:caret-slate-200 p-2 outline-none resize-none"
                spellCheck="false"
                style={{
                  lineHeight: "24px",
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

export default CodeEditor;
