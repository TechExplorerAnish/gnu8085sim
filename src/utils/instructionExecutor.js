export const executeInstruction = ({ memory, registers, setRegisters }) => {
  const pc = registers.pc;
  const opcode = memory[pc]?.toUpperCase() || "00";

  switch (opcode) {
    case "00": // NOP
      setRegisters((r) => ({ ...r, pc: r.pc + 1 }));
      break;

    case "3E": // MVI A, data
      const data = parseInt(memory[pc + 1], 16);
      setRegisters((r) => ({ ...r, a: data, pc: r.pc + 2 }));
      break;

    case "06": // MVI B, data
      const value = parseInt(memory[pc + 1], 16);
      setRegisters((r) => ({ ...r, b: value, pc: r.pc + 2 }));
      break;

    case "C3": // JMP address
      const low = parseInt(memory[pc + 1], 16);
      const high = parseInt(memory[pc + 2], 16);
      const addr = (high << 8) | low;
      setRegisters((r) => ({ ...r, pc: addr }));
      break;

    case "76": // HLT
      return { halt: true };

    default:
      console.warn("Unknown opcode:", opcode);
      setRegisters((r) => ({ ...r, pc: r.pc + 1 }));
  }
};
