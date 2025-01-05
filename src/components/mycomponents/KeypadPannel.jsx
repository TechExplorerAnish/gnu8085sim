/** @format */
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
// Mapping of opcodes to descriptions
const opcodeDescriptions = {
  ACI: "Add immediate to accumulator with carry.",
  ADC: "Add register or memory to accumulator with carry.",
  ADD: "Add register or memory to accumulator.",
  ADI: "Add immediate to accumulator.",
  ANA: "Logical AND register or memory with accumulator.",
  ANI: "Logical AND immediate with accumulator.",
  CALL: "Call unconditionally.",
  CC: "Call if Carry.",
  CM: "Call if Minus.",
  CMA: "Complement accumulator.",
  CMC: "Complement carry.",
  CMP: "Compare register or memory with accumulator.",
  CNC: "Call if No Carry.",
  CNZ: "Call if No Zero.",
  CP: "Call if Positive.",
  CPE: "Call if Parity Even.",
  CPI: "Compare immediate with accumulator.",
  CPO: "Call if Parity Odd.",
  CZ: "Call if Zero.",
  DAA: "Decimal Adjust Accumulator.",
  DAD: "Add register pair to H-L pair.",
  DCR: "Decrement register or memory by 1.",
  DCX: "Decrement register pair by 1.",
  DI: "Disable interrupt.",
  EI: "Enable interrupt.",
  HLT: "Halt.",
  IN: "Input to accumulator.",
  INR: "Increment register or memory by 1.",
  JNX: "Jump conditionally.",
  JC: "Jump if Carry.",
  JM: "Jump if Minus.",
  JMP: "Jump unconditionally.",
  JNC: "Jump if No Carry.",
  JNZ: "Jump if No Zero.",
  JP: "Jump if Positive.",
  JPE: "Jump if Parity Even.",
  JPO: "Jump if Parity Odd.",
  JZ: "Jump if Zero.",
  LDA: "Load Accumulator.",
  LDAX: "Load accumulator indirect.",
  LHLD: "Load H-L registers direct.",
  LXI: "Load register pair immediate.",
  MOV: "Copy from source to destination.",
  MVI: "Move immediate 8-bit data to destination.",
  NOP: "No operation.",
  ORA: "Logical OR register or memory with accumulator.",
  ORI: "Logical OR immediate with accumulator.",
  OUT: "Output from accumulator.",
  PCHL: "Jump to H-L address.",
  RNZ: "Return if No Zero.",
  POP: "Pop data from stack.",
  PUSH: "Push data onto stack.",
};

export function KeypadPanel() {
  const instructions = [
    ["ACI", "ADC", "ADD", "ADI"],
    ["ANA", "ANI", "CALL", "CC"],
    ["CM", "CMA", "CMC", "CMP"],
    ["CNC", "CNZ", "CP", "CPE"],
    ["CPI", "CPO", "CZ", "DAA"],
    ["DAD", "DCR", "DCX", "DI"],
    ["EI", "HLT", "IN", "INR"],
    ["JNX", "JC", "JM", "JMP"],
    ["JNC", "JNZ", "JP", "JPE"],
    ["JPO", "JZ", "LDA", "LDAX"],
    ["LHLD", "LXI", "MOV", "MVI"],
    ["NOP", "ORA", "ORI", "OUT"],
    ["PCHL", "RNZ", "POP", "PUSH"],
  ];

  return (
    <TooltipProvider>
      <div className="grid grid-cols-4 gap-2 p-1">
        {instructions.map((row, i) =>
          row.map((instruction, j) => (
            // <button
            //   key={`${i}-${j}`}
            //   className="p-2 text-xs font-mono bg-muted hover:bg-accent rounded"
            //   title={opcodeDescriptions[instruction]} // Tooltip with description
            // >
            //   {instruction}
            // </button>

            <Tooltip key={`${i}-${j}`} delayDuration={300}>
              <TooltipTrigger>
                <Button className="w-4  text-xs font-mono bg-slate-100  hover:bg-slate-50 text-slate-900 hover:text-slate-950 dark:text-zinc-100 dark:hover:text-zinc-50 dark:bg-slate-900 dark:hover:bg-slate-950 ">
                  {instruction}
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-slate-100 dark:bg-slate-900">
                <p className="max-w-xs text-sm text-slate-900 dark:text-slate-200">
                  {opcodeDescriptions[instruction]}
                </p>
              </TooltipContent>
            </Tooltip>
          ))
        )}
      </div>
    </TooltipProvider>
  );
}
