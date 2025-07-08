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
import { useState, useEffect } from "react";
// import { useSimulationStore } from "@/store/simulationStore";
import { useCodeStore } from "@/store/codeStore";
import { useMemoryStore } from "../../store/memoryStore";
import { useRegisterStore } from "../../store/registerStore";
import { executeInstruction } from "@/utils/instructionExecutor";
import assemble from "../../assembler/assembler";

export function Toolbar() {
  // const { isRunning, isHalted, isPaused, setRunning, setHalted, setPaused } = useSimulationStore();

  const { sourceCode, getLoadAddress } = useCodeStore();
  const { setMemoryValue } = useMemoryStore();
  const { setLabels } = useCodeStore();

  const [isMobile, setIsMobile] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsCompact(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const executeProgram = () => {
    const memory = useMemoryStore.getState().memory;
    const getRegisters = useRegisterStore.getState().getRegisters;
    const setRegisters = useRegisterStore.getState().setRegisters;
    const setFlags = useRegisterStore.getState().setFlags;
    const getFlags = useRegisterStore.getState().getFlags;
    useRegisterStore.getState().setPC(getLoadAddress());
    let result;
    // let intervalId = setInterval(() => {
      do{
       result = executeInstruction({
        memory,
        getRegisters,
        setRegisters,
        setFlags,
        getFlags,
      });
      if (result.halt) {
        // clearInterval(intervalId);
        console.log("Program halted.");
      }
    } while (!result.halt);
    // }, 0);
  };

  const loadMemoryFromBackend = (backendMemory) => {
    for (const [addrStr, hexVal] of Object.entries(backendMemory)) {
      const addr = parseInt(addrStr);
      const value = parseInt(hexVal, 16);
      setMemoryValue(addr, value);
    }
    executeProgram();
  };

  const handleRun = async () => {
    const startingAddress = getLoadAddress();
    // // console.log("Starting address:", startingAddress);
    // const response = await fetch("http://localhost:8000/assemble", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     code: sourceCode,
    //     start_address: startingAddress,
    //   }),
    // });

    const data = assemble(sourceCode,startingAddress);
    // console.log(data);
    loadMemoryFromBackend(data.memory);
    setLabels(data.labels);
  };

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

  return (
    <Card className="bg-inherit shadow-none border-0">
      <CardContent className="p-2">
        <TooltipProvider>
          <div className="flex items-center justify-between w-full">
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
                  onClick={handleRun}
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
