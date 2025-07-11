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
import { toast } from "sonner";
import { useSimulationStore } from "@/store/simulationStore";
import { useCodeStore } from "@/store/codeStore";
import { useMemoryStore } from "../../store/memoryStore";
import { useRegisterStore } from "../../store/registerStore";
import { executeInstruction } from "@/utils/instructionExecutor";
import assemble from "../../assembler/assembler";

export function Toolbar() {
  const { isRunning, isHalted, isPaused, lastExecutedAddress, setRunning, setHalted, setPaused, setLastExecutedAddress } = useSimulationStore();

  const { sourceCode, getLoadAddress } = useCodeStore();
  const { setMemoryValue } = useMemoryStore();
  const { setLabels } = useCodeStore();

  const [isMobile, setIsMobile] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const [isDebugging, setIsDebugging] = useState(false);
  const [debugToastId, setDebugToastId] = useState(null);
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
    // Show loading toast when program execution starts
    const toastId = toast.loading("Executing program...");
    
    const memory = useMemoryStore.getState().memory;
    const getRegisters = useRegisterStore.getState().getRegisters;
    const setRegisters = useRegisterStore.getState().setRegisters;
    const setFlags = useRegisterStore.getState().setFlags;
    const getFlags = useRegisterStore.getState().getFlags;
    useRegisterStore.getState().setPC(getLoadAddress());
    let result;
    
    do {
      result = executeInstruction({
        memory,
        getRegisters,
        setRegisters,
        setFlags,
        getFlags,
      });
      
      if (result.halt) {
        toast.dismiss(toastId); // Dismiss the loading toast
        toast.success("Program executed successfully.")
        console.log("Program halted.");
        setRunning(false);
        setHalted(true);
        setPaused(false);
        setLastExecutedAddress(null);
        break;
      }
      
      // If debugging, pause after each instruction
      if (isDebugging) {
        setLastExecutedAddress(getRegisters().PC);
        setPaused(true);
        toast.dismiss(toastId);
        toast.info("Debug: Paused after instruction execution");
        return;
      }
      
      // wait for delay before executing the next instruction (only in normal mode)
      // await new Promise(resolve => setTimeout(resolve, 1000));

    } while (!result.halt);
  };

  const executeNextInstruction = async () => {
    const memory = useMemoryStore.getState().memory;
    const getRegisters = useRegisterStore.getState().getRegisters;
    const setRegisters = useRegisterStore.getState().setRegisters;
    const setFlags = useRegisterStore.getState().setFlags;
    const getFlags = useRegisterStore.getState().getFlags;
    
    const result = executeInstruction({
      memory,
      getRegisters,
      setRegisters,
      setFlags,
      getFlags,
    });
    
    setLastExecutedAddress(getRegisters().PC);
    
    if (result.halt) {
      toast.success("Program executed successfully - Debug mode ended");
      setRunning(false);
      setHalted(true);
      setPaused(false);
      setIsDebugging(false);
      setLastExecutedAddress(null);
      if (debugToastId) {
        toast.dismiss(debugToastId);
        setDebugToastId(null);
      }
    } else {
      toast.info(`Debug: Executed instruction at PC: ${getRegisters().PC.toString(16).toUpperCase().padStart(4, '0')}H`);
    }
  };

  const handleDebug = async () => {
    const startingAddress = getLoadAddress();
    if (startingAddress === null) {
      toast.error("Please set a valid starting address before debugging.");
      return;
    }
    if (sourceCode.trim() === "") {
      toast.warning("Please load a program before debugging.");
      return;
    }

    if (!isDebugging) {
      // Start debug mode
      const data = assemble(sourceCode, startingAddress);
      loadMemoryForDebug(data.memory);
      setLabels(data.labels);
      setIsDebugging(true);
      setRunning(false);
      setHalted(false);
      setPaused(true);
      setLastExecutedAddress(startingAddress);
      
      const toastId = toast.info("Debug mode started - Click 'Step Forward' to execute instructions", { duration: 5000 });
      setDebugToastId(toastId);
    } else {
      // Stop debug mode
      setIsDebugging(false);
      setRunning(false);
      setPaused(false);
      if (debugToastId) {
        toast.dismiss(debugToastId);
        setDebugToastId(null);
      }
      toast.info("Debug mode stopped");
    }
  };

  const handlePause = () => {
    if (isRunning && !isPaused) {
      setPaused(true);
      toast.info("Program paused");
    } else if (isPaused) {
      setPaused(false);
      toast.info("Program resumed");
      if (!isDebugging) {
        executeProgram();
      }
    }
  };

  const handleStepForward = () => {
    if (isDebugging) {
      if (!isRunning) {
        setRunning(true);
        setPaused(true);
      }
      executeNextInstruction();
    } else {
      toast.warning("Step forward is only available in debug mode. Click the Debug button first.");
    }
  };
  
  const loadMemory = (backendMemory) => {
    for (const [addrStr, hexVal] of Object.entries(backendMemory)) {
      const addr = parseInt(addrStr);
      const value = parseInt(hexVal, 16);
      setMemoryValue(addr, value);
    }
    executeProgram();
  };

  const loadMemoryForDebug = (backendMemory) => {
    for (const [addrStr, hexVal] of Object.entries(backendMemory)) {
      const addr = parseInt(addrStr);
      const value = parseInt(hexVal, 16);
      setMemoryValue(addr, value);
    }
    // Don't auto-execute in debug mode
  };

  const handleRun = async () => {
    const startingAddress = getLoadAddress();
    if (startingAddress === null) {
      toast.error("Please set a valid starting address before running the program.");
      return;
    }
    else if (sourceCode.trim() === "") {
      toast.warning("Please load a program before running.");
      return;
    }
    const data = assemble(sourceCode, startingAddress);
    loadMemory(data.memory);
    setLabels(data.labels);
    setRunning(true);
    setHalted(false);
    setPaused(false);
    setLastExecutedAddress(startingAddress);
  };

  const handleReset = () => {
    useRegisterStore.getState().resetRegisters();
    useMemoryStore.getState().resetMemory();
    useSimulationStore.getState().resetSimulationState();
    setIsDebugging(false);
    if (debugToastId) {
      toast.dismiss(debugToastId);
      setDebugToastId(null);
    }
  }

  const ToolButton = ({
    icon: Icon,
    label,
    color = "text-slate-700 dark:text-slate-300",
    onClick,
    disabled,
  }) => (
    <Tooltip delayDuration={300}>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={`hover:bg-slate-100 dark:hover:bg-slate-800  ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
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
                  onClick={handleReset}
                  color="text-orange-300 dark:text-orange-300"
                />
                <ToolButton
                  icon={Play}
                  label={isRunning ? "Running" : "Run"}
                  color="text-green-500 dark:text-green-500"
                  onClick={handleRun}
                  disabled = {isRunning }
                />
                {!isMobile && (
                  <>
                    <ToolButton 
                      icon={Pause} 
                      label={isPaused ? "Resume" : "Pause"}
                      onClick={handlePause}
                      disabled={!isRunning}
                      color="text-blue-500 dark:text-blue-500"
                    />
                    <ToolButton 
                      icon={SkipForward} 
                      label="Step Forward" 
                      onClick={handleStepForward}
                      disabled={!isDebugging}
                      color="text-purple-500 dark:text-purple-500"
                    />
                  </>
                )}
              </div>

              {!isMobile && <Divider />}

              {/* Debug Group */}
              <div className="flex items-center gap-1">
                <ToolButton
                  icon={Debug}
                  label={isDebugging ? "Stop Debug" : "Debug"}
                  color={isDebugging ? "text-orange-500 dark:text-orange-500" : "text-red-500 dark:text-red-500"}
                  onClick={handleDebug}
                />
              </div>
            </div>
          </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
}
