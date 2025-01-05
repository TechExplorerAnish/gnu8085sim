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

// Define syntax highlighting rules
const opcodes = [
  "aci",
  "adc",
  "add",
  "adi",
  "ana",
  "ani",
  "call",
  "cc",
  "cm",
  "cma",
  "cmc",
  "cmp",
  "cnc",
  "cnz",
  "cp",
  "cpe",
  "cpi",
  "cpo",
  "cz",
  "daa",
  "dad",
  "dcr",
  "dcx",
  "di",
  "ei",
  "hlt",
  "in",
  "inr",
  "inx",
  "jc",
  "jm",
  "jmp",
  "jnc",
  "jnz",
  "jp",
  "jpe",
  "jpo",
  "jz",
  "lda",
  "ldax",
  "lhld",
  "lxi",
  "mov",
  "mvi",
  "nop",
  "ora",
  "ori",
  "out",
  "pchl",
  "pop",
  "push",
  "ral",
  "rar",
  "rc",
  "ret",
  "rim",
  "rlc",
  "rm",
  "rnc",
  "rnz",
  "rp",
  "rpe",
  "rpo",
  "rrc",
  "rst",
  "rz",
  "sbb",
  "sbi",
  "shld",
  "sim",
  "sphl",
  "sta",
  "stax",
  "stc",
  "sub",
  "sui",
  "xchg",
  "xra",
  "xri",
  "xthl",
];

const registers = ["a", "b", "c", "d", "e", "h", "l", "sp", "pc", "psw"];

const createSyntaxStyles = (content) => {
  return content
    .split("\n")
    .map((line) => {
      // Handle comments first
      if (line.trim().startsWith(";")) {
        return `<span style="color: #34D399">${line}</span>`;
      }

      let processedLine = line;

      // Handle labels (words followed by colon)
      processedLine = processedLine.replace(
        /([a-zA-Z_]\w*):/g,
        '<span style="color: #C084FC">$1:</span>'
      );

      // Handle opcodes (case insensitive)
      opcodes.forEach((opcode) => {
        const regex = new RegExp(`\\b${opcode}\\b`, "gi");
        processedLine = processedLine.replace(
          regex,
          (match) => `<span style="color: #60A5FA">${match}</span>`
        );
      });

      // Handle registers (case insensitive)
      registers.forEach((register) => {
        const regex = new RegExp(`\\b${register}\\b`, "gi");
        processedLine = processedLine.replace(
          regex,
          (match) => `<span style="color: #FB923C">${match}</span>`
        );
      });

      // Handle numbers (hexadecimal with h/H suffix, 0x prefix, and decimal)
      processedLine = processedLine.replace(
        /\b(0x[0-9A-Fa-f]+|[0-9A-Fa-f]+[hH]\b|\d+)\b/g,
        '<span style="color: #F97316">$1</span>'
      );

      return processedLine;
    })
    .join("\n");
};

export function CodeEditor() {
  const [value, setValue] = useState(
    `;Program title\n\nJMP start    ; uppercase JMP\n\n;data\nMOV A, B     ; uppercase MOV and registers\nMVI A, 0FFh   ; hex with h\nMVI B, 0FFH   ; hex with H\nLXI H, 1234h  ; four digit hex\nMVI C, 0x42   ; hex with 0x\nMVI D, 64     ; decimal\n\n;code\nstart: nop    ; lowercase nop\nmov a, c      ; lowercase mov and registers\nhlt           ; lowercase hlt`
  );
  const [highlightedContent, setHighlightedContent] = useState("");
  const height = "calc(100vh - 200px)";
  const lineNumbersRef = useRef(null);
  const textAreaRef = useRef(null);
  const highlightRef = useRef(null);
  const editorWrapperRef = useRef(null);

  useEffect(() => {
    setHighlightedContent(createSyntaxStyles(value));
  }, [value]);

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
  const lineNumbers = value.split("\n").map((_, i) => i + 1);

  return (
    <TooltipProvider>
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
        <CardHeader className="space-y-1 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-gray-800 dark:to-gray-900 flex-none">
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
              className="flex-none w-12 bg-slate-50 dark:bg-gray-800 border-r border-slate-200 dark:border-gray-700 overflow-hidden"
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
                value={value}
                onChange={(e) => setValue(e.target.value)}
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
