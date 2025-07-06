import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { InfoIcon } from "lucide-react";
import { useRegisterStore } from "../../store/registerStore";

const registerDescriptions = {
  A: "Accumulator - Primary register for arithmetic operations",
  BC: "BC Register Pair - Used for data/address operations",
  DE: "DE Register Pair - Used for data/address operations",
  HL: "HL Register Pair - Main register for memory addressing",
  PSW: "Program Status Word - Contains flags and accumulator",
  PC: "Program Counter - Points to next instruction",
  SP: "Stack Pointer - Points to current stack position",
  "Int-Reg": "Interrupt Register - Handles interrupt control",
};

export function RegistersPanel() {
  // Subscribe to specific register values for automatic updates
  const A = useRegisterStore((state) => state.A);
  const B = useRegisterStore((state) => state.B);
  const C = useRegisterStore((state) => state.C);
  const D = useRegisterStore((state) => state.D);
  const E = useRegisterStore((state) => state.E);
  const H = useRegisterStore((state) => state.H);
  const L = useRegisterStore((state) => state.L);
  const PC = useRegisterStore((state) => state.PC);
  const SP = useRegisterStore((state) => state.SP);
  const flags = useRegisterStore((state) => state.flags);
 
  const resetRegisters = useRegisterStore((state) => state.resetRegisters);

  // Format register values
  const pclower = (PC & 0x00FF).toString(16).padStart(2, "0").toUpperCase();
  const pchigher = ((PC & 0xFF00) >> 8).toString(16).padStart(2, "0").toUpperCase();
  const splower = (SP & 0x00FF).toString(16).padStart(2, "0").toUpperCase();
  const sphigher = ((SP & 0xFF00) >> 8).toString(16).padStart(2, "0").toUpperCase();

  // Create PSW (Program Status Word) from flags and accumulator
  const pswLower = A.toString(16).padStart(2, "0").toUpperCase();
  const pswUpper = (
    (flags.S << 7) |
    (flags.Z << 6) |
    (flags.AC << 4) |
    (flags.P << 2) |
    (flags.CY << 0)
  ).toString(16).padStart(2, "0").toUpperCase();

  const registers = {
    A: A.toString(16).padStart(2, "0").toUpperCase(),
    BC: [
      B.toString(16).padStart(2, "0").toUpperCase(), 
      C.toString(16).padStart(2, "0").toUpperCase()
    ],
    DE: [
      D.toString(16).padStart(2, "0").toUpperCase(), 
      E.toString(16).padStart(2, "0").toUpperCase()
    ],
    HL: [
      H.toString(16).padStart(2, "0").toUpperCase(), 
      L.toString(16).padStart(2, "0").toUpperCase()
    ],
    PSW: [pswUpper, pswLower],
    PC: [pchigher, pclower],
    SP: [sphigher, splower],
    "Int-Reg": "00", // Placeholder for interrupt register
  };

  return (
    <TooltipProvider>
      <Card className="hover:shadow-xl overflow-hidden transition-shadow duration-300 w-full max-w-2xl mx-auto">
        <CardHeader className="space-y-1 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-gray-800 dark:to-gray-900 p-4 sm:p-6">
          <CardTitle className="text-xl sm:text-2xl font-bold flex items-center justify-between text-slate-800 dark:text-slate-100">
            <span className="truncate">Registers</span>
            <Badge onClick={resetRegisters} variant="outline" className="text-xs whitespace-nowrap ml-2 cursor-pointer">
              reset registers
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2 sm:gap-3 p-2 sm:p-4">
          {Object.entries(registers).map(([name, value]) => (
            <div
              key={name}
              className="grid grid-cols-[auto_1fr_1fr] sm:grid-cols-3 gap-2 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-gray-800 transition-all duration-200"
            >
              <div className="flex items-center gap-1 sm:gap-2 min-w-[80px]">
                <span className="font-mono font-semibold text-sm sm:text-base text-slate-700 dark:text-slate-200">
                  {name}
                </span>
                <Tooltip delayDuration={300}>
                  <TooltipTrigger>
                    <InfoIcon className="h-3 w-3 sm:h-4 sm:w-4 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300" />
                  </TooltipTrigger>
                  <TooltipContent side="top" className="bg-slate-100 dark:bg-slate-900">
                    <p className="max-w-[200px] sm:max-w-xs text-xs sm:text-sm text-slate-900 dark:text-slate-200">
                      {registerDescriptions[name]}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              {Array.isArray(value) ? (
                <>
                  <div className="font-mono text-xs sm:text-sm bg-slate-50 dark:bg-gray-800 px-2 py-1 sm:p-2 rounded text-center border border-slate-200 dark:border-gray-700 hover:border-slate-300 dark:hover:border-gray-600 transition-colors">
                    {value[0]}
                  </div>
                  <div className="font-mono text-xs sm:text-sm bg-slate-50 dark:bg-gray-800 px-2 py-1 sm:p-2 rounded text-center border border-slate-200 dark:border-gray-700 hover:border-slate-300 dark:hover:border-gray-600 transition-colors">
                    {value[1]}
                  </div>
                </>
              ) : (
                <div className="font-mono text-xs sm:text-sm col-span-2 bg-slate-50 dark:bg-gray-800 px-2 py-1 sm:p-2 rounded text-center border border-slate-200 dark:border-gray-700 hover:border-slate-300 dark:hover:border-gray-600 transition-colors">
                  {value}
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}

export default RegistersPanel;