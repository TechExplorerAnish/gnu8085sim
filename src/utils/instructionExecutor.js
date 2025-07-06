import { getOpcodeBytes } from "./opcodeReference";

// Helper function to calculate flags
const calculateFlags = (result, operation = "arithmetic") => {
  const flags = {
    Z: (result & 0xff) === 0 ? 1 : 0, // Zero flag
    S: result & 0x80 ? 1 : 0, // Sign flag (bit 7)
    P: 0, // Parity flag
    CY: 0, // Carry flag
    AC: 0, // Auxiliary carry flag
  };

  // Calculate parity (even parity = 1, odd parity = 0)
  let parity = 0;
  let temp = result & 0xff;
  for (let i = 0; i < 8; i++) {
    if (temp & 1) parity++;
    temp >>= 1;
  }
  flags.P = parity % 2 === 0 ? 1 : 0;

  // Set carry flag based on operation
  if (operation === "add" || operation === "adc") {
    flags.CY = result > 0xff ? 1 : 0;
  } else if (
    operation === "sub" ||
    operation === "sbb" ||
    operation === "cmp"
  ) {
    flags.CY = result < 0 ? 1 : 0;
  }

  return flags;
};

// Helper function to calculate auxiliary carry
const calculateAuxiliaryCarry = (a, b, operation) => {
  if (operation === "add" || operation === "adc") {
    return (a & 0x0f) + (b & 0x0f) > 0x0f ? 1 : 0;
  } else if (
    operation === "sub" ||
    operation === "sbb" ||
    operation === "cmp"
  ) {
    return (a & 0x0f) < (b & 0x0f) ? 1 : 0;
  }
  return 0;
};

export const executeInstruction = ({
  memory,
  getRegisters,
  setRegisters,
  setFlags,
  getFlags,
}) => {
  const r = getRegisters();
  const flags = getFlags();
  const pc = r.PC;

  const opcode = memory[pc].toString(16).toUpperCase().padStart(2, "0");
  const opcodeBytes = getOpcodeBytes(opcode);

  // console.log(
  //   "Executing opcode:",
  //   opcode,
  //   "at PC:",
  //   pc,
  //   "with bytes:",
  //   opcodeBytes,
  //   "memory[pc]:",
  //   memory[pc]
  // );

  switch (opcode) {
    // NOP
    case "00":
      setRegisters({ ...r, PC: pc + opcodeBytes });
      break;

    // MOV Instructions
    case "40":
      setRegisters({ ...r, B: r.B, PC: pc + opcodeBytes });
      break;
    case "41":
      setRegisters({ ...r, B: r.C, PC: pc + opcodeBytes });
      break;
    case "42":
      setRegisters({ ...r, B: r.D, PC: pc + opcodeBytes });
      break;
    case "43":
      setRegisters({ ...r, B: r.E, PC: pc + opcodeBytes });
      break;
    case "44":
      setRegisters({ ...r, B: r.H, PC: pc + opcodeBytes });
      break;
    case "45":
      setRegisters({ ...r, B: r.L, PC: pc + opcodeBytes });
      break;
    case "46": {
      const addr = (r.H << 8) | r.L;
      setRegisters({ ...r, B: memory[addr] || 0, PC: pc + opcodeBytes });
      break;
    }
    case "47":
      setRegisters({ ...r, B: r.A, PC: pc + opcodeBytes });
      break;
    case "48":
      setRegisters({ ...r, C: r.B, PC: pc + opcodeBytes });
      break;
    case "49":
      setRegisters({ ...r, C: r.C, PC: pc + opcodeBytes });
      break;
    case "4A":
      setRegisters({ ...r, C: r.D, PC: pc + opcodeBytes });
      break;
    case "4B":
      setRegisters({ ...r, C: r.E, PC: pc + opcodeBytes });
      break;
    case "4C":
      setRegisters({ ...r, C: r.H, PC: pc + opcodeBytes });
      break;
    case "4D":
      setRegisters({ ...r, C: r.L, PC: pc + opcodeBytes });
      break;
    case "4E": {
      const addr = (r.H << 8) | r.L;
      setRegisters({ ...r, C: memory[addr] || 0, PC: pc + opcodeBytes });
      break;
    }
    case "4F":
      setRegisters({ ...r, C: r.A, PC: pc + opcodeBytes });
      break;
    case "50":
      setRegisters({ ...r, D: r.B, PC: pc + opcodeBytes });
      break;
    case "51":
      setRegisters({ ...r, D: r.C, PC: pc + opcodeBytes });
      break;
    case "52":
      setRegisters({ ...r, D: r.D, PC: pc + opcodeBytes });
      break;
    case "53":
      setRegisters({ ...r, D: r.E, PC: pc + opcodeBytes });
      break;
    case "54":
      setRegisters({ ...r, D: r.H, PC: pc + opcodeBytes });
      break;
    case "55":
      setRegisters({ ...r, D: r.L, PC: pc + opcodeBytes });
      break;
    case "56": {
      const addr = (r.H << 8) | r.L;
      setRegisters({ ...r, D: memory[addr] || 0, PC: pc + opcodeBytes });
      break;
    }
    case "57":
      setRegisters({ ...r, D: r.A, PC: pc + opcodeBytes });
      break;
    case "58":
      setRegisters({ ...r, E: r.B, PC: pc + opcodeBytes });
      break;
    case "59":
      setRegisters({ ...r, E: r.C, PC: pc + opcodeBytes });
      break;
    case "5A":
      setRegisters({ ...r, E: r.D, PC: pc + opcodeBytes });
      break;
    case "5B":
      setRegisters({ ...r, E: r.E, PC: pc + opcodeBytes });
      break;
    case "5C":
      setRegisters({ ...r, E: r.H, PC: pc + opcodeBytes });
      break;
    case "5D":
      setRegisters({ ...r, E: r.L, PC: pc + opcodeBytes });
      break;
    case "5E": {
      const addr = (r.H << 8) | r.L;
      setRegisters({ ...r, E: memory[addr] || 0, PC: pc + opcodeBytes });
      break;
    }
    case "5F":
      setRegisters({ ...r, E: r.A, PC: pc + opcodeBytes });
      break;
    case "60":
      setRegisters({ ...r, H: r.B, PC: pc + opcodeBytes });
      break;
    case "61":
      setRegisters({ ...r, H: r.C, PC: pc + opcodeBytes });
      break;
    case "62":
      setRegisters({ ...r, H: r.D, PC: pc + opcodeBytes });
      break;
    case "63":
      setRegisters({ ...r, H: r.E, PC: pc + opcodeBytes });
      break;
    case "64":
      setRegisters({ ...r, H: r.H, PC: pc + opcodeBytes });
      break;
    case "65":
      setRegisters({ ...r, H: r.L, PC: pc + opcodeBytes });
      break;
    case "66": {
      const addr = (r.H << 8) | r.L;
      setRegisters({ ...r, H: memory[addr] || 0, PC: pc + opcodeBytes });
      break;
    }
    case "67":
      setRegisters({ ...r, H: r.A, PC: pc + opcodeBytes });
      break;
    case "68":
      setRegisters({ ...r, L: r.B, PC: pc + opcodeBytes });
      break;
    case "69":
      setRegisters({ ...r, L: r.C, PC: pc + opcodeBytes });
      break;
    case "6A":
      setRegisters({ ...r, L: r.D, PC: pc + opcodeBytes });
      break;
    case "6B":
      setRegisters({ ...r, L: r.E, PC: pc + opcodeBytes });
      break;
    case "6C":
      setRegisters({ ...r, L: r.H, PC: pc + opcodeBytes });
      break;
    case "6D":
      setRegisters({ ...r, L: r.L, PC: pc + opcodeBytes });
      break;
    case "6E": {
      const addr = (r.H << 8) | r.L;
      setRegisters({ ...r, L: memory[addr] || 0, PC: pc + opcodeBytes });
      break;
    }
    case "6F":
      setRegisters({ ...r, L: r.A, PC: pc + opcodeBytes });
      break;
    case "70": {
      const addr = (r.H << 8) | r.L;
      memory[addr] = r.B;
      setRegisters({ ...r, PC: pc + opcodeBytes });
      break;
    }
    case "71": {
      const addr = (r.H << 8) | r.L;
      memory[addr] = r.C;
      setRegisters({ ...r, PC: pc + opcodeBytes });
      break;
    }
    case "72": {
      const addr = (r.H << 8) | r.L;
      memory[addr] = r.D;
      setRegisters({ ...r, PC: pc + opcodeBytes });
      break;
    }
    case "73": {
      const addr = (r.H << 8) | r.L;
      memory[addr] = r.E;
      setRegisters({ ...r, PC: pc + opcodeBytes });
      break;
    }
    case "74": {
      const addr = (r.H << 8) | r.L;
      memory[addr] = r.H;
      setRegisters({ ...r, PC: pc + opcodeBytes });
      break;
    }
    case "75": {
      const addr = (r.H << 8) | r.L;
      memory[addr] = r.L;
      setRegisters({ ...r, PC: pc + opcodeBytes });
      break;
    }
    case "77": {
      const addr = (r.H << 8) | r.L;
      memory[addr] = r.A;
      setRegisters({ ...r, PC: pc + opcodeBytes });
      break;
    }
    case "78":
      setRegisters({ ...r, A: r.B, PC: pc + opcodeBytes });
      break;
    case "79":
      setRegisters({ ...r, A: r.C, PC: pc + opcodeBytes });
      break;
    case "7A":
      setRegisters({ ...r, A: r.D, PC: pc + opcodeBytes });
      break;
    case "7B":
      setRegisters({ ...r, A: r.E, PC: pc + opcodeBytes });
      break;
    case "7C":
      setRegisters({ ...r, A: r.H, PC: pc + opcodeBytes });
      break;
    case "7D":
      setRegisters({ ...r, A: r.L, PC: pc + opcodeBytes });
      break;
    case "7E": {
      const addr = (r.H << 8) | r.L;
      setRegisters({ ...r, A: memory[addr] || 0, PC: pc + opcodeBytes });
      break;
    }
    case "7F":
      setRegisters({ ...r, A: r.A, PC: pc + opcodeBytes });
      break;

    // MVI Instructions
    case "3E":
      setRegisters({ ...r, A: memory[pc + 1] || 0, PC: pc + opcodeBytes });
      break;
    case "06":
      setRegisters({ ...r, B: memory[pc + 1] || 0, PC: pc + opcodeBytes });
      break;
    case "0E":
      setRegisters({ ...r, C: memory[pc + 1] || 0, PC: pc + opcodeBytes });
      break;
    case "16":
      setRegisters({ ...r, D: memory[pc + 1] || 0, PC: pc + opcodeBytes });
      break;
    case "1E":
      setRegisters({ ...r, E: memory[pc + 1] || 0, PC: pc + opcodeBytes });
      break;
    case "26":
      setRegisters({ ...r, H: memory[pc + 1] || 0, PC: pc + opcodeBytes });
      break;
    case "2E":
      setRegisters({ ...r, L: memory[pc + 1] || 0, PC: pc + opcodeBytes });
      break;
    case "36": {
      const addr = (r.H << 8) | r.L;
      memory[addr] = memory[pc + 1] || 0;
      setRegisters({ ...r, PC: pc + opcodeBytes });
      break;
    }

    // ADD Instructions
    case "80": {
      const result = r.A + r.B;
      const newFlags = calculateFlags(result, "add");
      newFlags.AC = calculateAuxiliaryCarry(r.A, r.B, "add");
      setRegisters({ ...r, A: result & 0xff, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "81": {
      const result = r.A + r.C;
      const newFlags = calculateFlags(result, "add");
      newFlags.AC = calculateAuxiliaryCarry(r.A, r.C, "add");
      setRegisters({ ...r, A: result & 0xff, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "82": {
      const result = r.A + r.D;
      const newFlags = calculateFlags(result, "add");
      newFlags.AC = calculateAuxiliaryCarry(r.A, r.D, "add");
      setRegisters({ ...r, A: result & 0xff, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "83": {
      const result = r.A + r.E;
      const newFlags = calculateFlags(result, "add");
      newFlags.AC = calculateAuxiliaryCarry(r.A, r.E, "add");
      setRegisters({ ...r, A: result & 0xff, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "84": {
      const result = r.A + r.H;
      const newFlags = calculateFlags(result, "add");
      newFlags.AC = calculateAuxiliaryCarry(r.A, r.H, "add");
      setRegisters({ ...r, A: result & 0xff, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "85": {
      const result = r.A + r.L;
      const newFlags = calculateFlags(result, "add");
      newFlags.AC = calculateAuxiliaryCarry(r.A, r.L, "add");
      setRegisters({ ...r, A: result & 0xff, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "86": {
      const addr = (r.H << 8) | r.L;
      const memVal = memory[addr] || 0;
      const result = r.A + memVal;
      const newFlags = calculateFlags(result, "add");
      newFlags.AC = calculateAuxiliaryCarry(r.A, memVal, "add");
      setRegisters({ ...r, A: result & 0xff, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "87": {
      const result = r.A + r.A;
      const newFlags = calculateFlags(result, "add");
      newFlags.AC = calculateAuxiliaryCarry(r.A, r.A, "add");
      setRegisters({ ...r, A: result & 0xff, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }

    // ADC Instructions (Add with Carry)
    case "88": {
      const result = r.A + r.B + flags.CY;
      const newFlags = calculateFlags(result, "adc");
      newFlags.AC = calculateAuxiliaryCarry(r.A, r.B + flags.CY, "adc");
      setRegisters({ ...r, A: result & 0xff, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "89": {
      const result = r.A + r.C + flags.CY;
      const newFlags = calculateFlags(result, "adc");
      newFlags.AC = calculateAuxiliaryCarry(r.A, r.C + flags.CY, "adc");
      setRegisters({ ...r, A: result & 0xff, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "8A": {
      const result = r.A + r.D + flags.CY;
      const newFlags = calculateFlags(result, "adc");
      newFlags.AC = calculateAuxiliaryCarry(r.A, r.D + flags.CY, "adc");
      setRegisters({ ...r, A: result & 0xff, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "8B": {
      const result = r.A + r.E + flags.CY;
      const newFlags = calculateFlags(result, "adc");
      newFlags.AC = calculateAuxiliaryCarry(r.A, r.E + flags.CY, "adc");
      setRegisters({ ...r, A: result & 0xff, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "8C": {
      const result = r.A + r.H + flags.CY;
      const newFlags = calculateFlags(result, "adc");
      newFlags.AC = calculateAuxiliaryCarry(r.A, r.H + flags.CY, "adc");
      setRegisters({ ...r, A: result & 0xff, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "8D": {
      const result = r.A + r.L + flags.CY;
      const newFlags = calculateFlags(result, "adc");
      newFlags.AC = calculateAuxiliaryCarry(r.A, r.L + flags.CY, "adc");
      setRegisters({ ...r, A: result & 0xff, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "8E": {
      const addr = (r.H << 8) | r.L;
      const memVal = memory[addr] || 0;
      const result = r.A + memVal + flags.CY;
      const newFlags = calculateFlags(result, "adc");
      newFlags.AC = calculateAuxiliaryCarry(r.A, memVal + flags.CY, "adc");
      setRegisters({ ...r, A: result & 0xff, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "8F": {
      const result = r.A + r.A + flags.CY;
      const newFlags = calculateFlags(result, "adc");
      newFlags.AC = calculateAuxiliaryCarry(r.A, r.A + flags.CY, "adc");
      setRegisters({ ...r, A: result & 0xff, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }

    // SUB Instructions
    case "90": {
      const result = r.A - r.B;
      const newFlags = calculateFlags(result, "sub");
      newFlags.AC = calculateAuxiliaryCarry(r.A, r.B, "sub");
      setRegisters({ ...r, A: result & 0xff, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "91": {
      const result = r.A - r.C;
      const newFlags = calculateFlags(result, "sub");
      newFlags.AC = calculateAuxiliaryCarry(r.A, r.C, "sub");
      setRegisters({ ...r, A: result & 0xff, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "92": {
      const result = r.A - r.D;
      const newFlags = calculateFlags(result, "sub");
      newFlags.AC = calculateAuxiliaryCarry(r.A, r.D, "sub");
      setRegisters({ ...r, A: result & 0xff, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "93": {
      const result = r.A - r.E;
      const newFlags = calculateFlags(result, "sub");
      newFlags.AC = calculateAuxiliaryCarry(r.A, r.E, "sub");
      setRegisters({ ...r, A: result & 0xff, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "94": {
      const result = r.A - r.H;
      const newFlags = calculateFlags(result, "sub");
      newFlags.AC = calculateAuxiliaryCarry(r.A, r.H, "sub");
      setRegisters({ ...r, A: result & 0xff, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "95": {
      const result = r.A - r.L;
      const newFlags = calculateFlags(result, "sub");
      newFlags.AC = calculateAuxiliaryCarry(r.A, r.L, "sub");
      setRegisters({ ...r, A: result & 0xff, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "96": {
      const addr = (r.H << 8) | r.L;
      const memVal = memory[addr] || 0;
      const result = r.A - memVal;
      const newFlags = calculateFlags(result, "sub");
      newFlags.AC = calculateAuxiliaryCarry(r.A, memVal, "sub");
      setRegisters({ ...r, A: result & 0xff, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "97": {
      const result = r.A - r.A;
      const newFlags = calculateFlags(result, "sub");
      newFlags.AC = calculateAuxiliaryCarry(r.A, r.A, "sub");
      setRegisters({ ...r, A: result & 0xff, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }

    // SBB Instructions (Subtract with Borrow)
    case "98": {
      const result = r.A - r.B - flags.CY;
      const newFlags = calculateFlags(result, "sbb");
      newFlags.AC = calculateAuxiliaryCarry(r.A, r.B + flags.CY, "sbb");
      setRegisters({ ...r, A: result & 0xff, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "99": {
      const result = r.A - r.C - flags.CY;
      const newFlags = calculateFlags(result, "sbb");
      newFlags.AC = calculateAuxiliaryCarry(r.A, r.C + flags.CY, "sbb");
      setRegisters({ ...r, A: result & 0xff, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "9A": {
      const result = r.A - r.D - flags.CY;
      const newFlags = calculateFlags(result, "sbb");
      newFlags.AC = calculateAuxiliaryCarry(r.A, r.D + flags.CY, "sbb");
      setRegisters({ ...r, A: result & 0xff, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "9B": {
      const result = r.A - r.E - flags.CY;
      const newFlags = calculateFlags(result, "sbb");
      newFlags.AC = calculateAuxiliaryCarry(r.A, r.E + flags.CY, "sbb");
      setRegisters({ ...r, A: result & 0xff, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "9C": {
      const result = r.A - r.H - flags.CY;
      const newFlags = calculateFlags(result, "sbb");
      newFlags.AC = calculateAuxiliaryCarry(r.A, r.H + flags.CY, "sbb");
      setRegisters({ ...r, A: result & 0xff, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "9D": {
      const result = r.A - r.L - flags.CY;
      const newFlags = calculateFlags(result, "sbb");
      newFlags.AC = calculateAuxiliaryCarry(r.A, r.L + flags.CY, "sbb");
      setRegisters({ ...r, A: result & 0xff, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "9E": {
      const addr = (r.H << 8) | r.L;
      const memVal = memory[addr] || 0;
      const result = r.A - memVal - flags.CY;
      const newFlags = calculateFlags(result, "sbb");
      newFlags.AC = calculateAuxiliaryCarry(r.A, memVal + flags.CY, "sbb");
      setRegisters({ ...r, A: result & 0xff, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "9F": {
      const result = r.A - r.A - flags.CY;
      const newFlags = calculateFlags(result, "sbb");
      newFlags.AC = calculateAuxiliaryCarry(r.A, r.A + flags.CY, "sbb");
      setRegisters({ ...r, A: result & 0xff, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }

    // ANA Instructions (Logical AND)
    case "A0": {
      const result = r.A & r.B;
      const newFlags = calculateFlags(result, "logical");
      newFlags.CY = 0; // Logical operations clear carry
      newFlags.AC = (r.A | r.B) & 0x08 ? 1 : 0; // Set if bit 3 of either operand is set
      setRegisters({ ...r, A: result, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "A1": {
      const result = r.A & r.C;
      const newFlags = calculateFlags(result, "logical");
      newFlags.CY = 0;
      newFlags.AC = (r.A | r.C) & 0x08 ? 1 : 0;
      setRegisters({ ...r, A: result, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "A2": {
      const result = r.A & r.D;
      const newFlags = calculateFlags(result, "logical");
      newFlags.CY = 0;
      newFlags.AC = (r.A | r.D) & 0x08 ? 1 : 0;
      setRegisters({ ...r, A: result, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "A3": {
      const result = r.A & r.E;
      const newFlags = calculateFlags(result, "logical");
      newFlags.CY = 0;
      newFlags.AC = (r.A | r.E) & 0x08 ? 1 : 0;
      setRegisters({ ...r, A: result, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "A4": {
      const result = r.A & r.H;
      const newFlags = calculateFlags(result, "logical");
      newFlags.CY = 0;
      newFlags.AC = (r.A | r.H) & 0x08 ? 1 : 0;
      setRegisters({ ...r, A: result, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "A5": {
      const result = r.A & r.L;
      const newFlags = calculateFlags(result, "logical");
      newFlags.CY = 0;
      newFlags.AC = (r.A | r.L) & 0x08 ? 1 : 0;
      setRegisters({ ...r, A: result, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "A6": {
      const addr = (r.H << 8) | r.L;
      const memVal = memory[addr] || 0;
      const result = r.A & memVal;
      const newFlags = calculateFlags(result, "logical");
      newFlags.CY = 0;
      newFlags.AC = (r.A | memVal) & 0x08 ? 1 : 0;
      setRegisters({ ...r, A: result, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "A7": {
      const result = r.A & r.A;
      const newFlags = calculateFlags(result, "logical");
      newFlags.CY = 0;
      newFlags.AC = (r.A | r.A) & 0x08 ? 1 : 0;
      setRegisters({ ...r, A: result, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }

    // XRA Instructions (Exclusive OR) - Continue from A8
    case "A8": {
      const result = r.A ^ r.B;
      const newFlags = calculateFlags(result, "logical");
      newFlags.CY = 0; // Logical operations clear carry
      newFlags.AC = 0; // XOR clears auxiliary carry
      setRegisters({ ...r, A: result, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "A9": {
      const result = r.A ^ r.C;
      const newFlags = calculateFlags(result, "logical");
      newFlags.CY = 0;
      newFlags.AC = 0;
      setRegisters({ ...r, A: result, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "AA": {
      const result = r.A ^ r.D;
      const newFlags = calculateFlags(result, "logical");
      newFlags.CY = 0;
      newFlags.AC = 0;
      setRegisters({ ...r, A: result, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "AB": {
      const result = r.A ^ r.E;
      const newFlags = calculateFlags(result, "logical");
      newFlags.CY = 0;
      newFlags.AC = 0;
      setRegisters({ ...r, A: result, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "AC": {
      const result = r.A ^ r.H;
      const newFlags = calculateFlags(result, "logical");
      newFlags.CY = 0;
      newFlags.AC = 0;
      setRegisters({ ...r, A: result, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "AD": {
      const result = r.A ^ r.L;
      const newFlags = calculateFlags(result, "logical");
      newFlags.CY = 0;
      newFlags.AC = 0;
      setRegisters({ ...r, A: result, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "AE": {
      const addr = (r.H << 8) | r.L;
      const memVal = memory[addr] || 0;
      const result = r.A ^ memVal;
      const newFlags = calculateFlags(result, "logical");
      newFlags.CY = 0;
      newFlags.AC = 0;
      setRegisters({ ...r, A: result, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "AF": {
      const result = r.A ^ r.A;
      const newFlags = calculateFlags(result, "logical");
      newFlags.CY = 0;
      newFlags.AC = 0;
      setRegisters({ ...r, A: result, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }

    // ORA Instructions (Logical OR)
    case "B0": {
      const result = r.A | r.B;
      const newFlags = calculateFlags(result, "logical");
      newFlags.CY = 0; // Logical operations clear carry
      newFlags.AC = 0; // OR clears auxiliary carry
      setRegisters({ ...r, A: result, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "B1": {
      const result = r.A | r.C;
      const newFlags = calculateFlags(result, "logical");
      newFlags.CY = 0;
      newFlags.AC = 0;
      setRegisters({ ...r, A: result, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "B2": {
      const result = r.A | r.D;
      const newFlags = calculateFlags(result, "logical");
      newFlags.CY = 0;
      newFlags.AC = 0;
      setRegisters({ ...r, A: result, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "B3": {
      const result = r.A | r.E;
      const newFlags = calculateFlags(result, "logical");
      newFlags.CY = 0;
      newFlags.AC = 0;
      setRegisters({ ...r, A: result, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "B4": {
      const result = r.A | r.H;
      const newFlags = calculateFlags(result, "logical");
      newFlags.CY = 0;
      newFlags.AC = 0;
      setRegisters({ ...r, A: result, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "B5": {
      const result = r.A | r.L;
      const newFlags = calculateFlags(result, "logical");
      newFlags.CY = 0;
      newFlags.AC = 0;
      setRegisters({ ...r, A: result, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "B6": {
      const addr = (r.H << 8) | r.L;
      const memVal = memory[addr] || 0;
      const result = r.A | memVal;
      const newFlags = calculateFlags(result, "logical");
      newFlags.CY = 0;
      newFlags.AC = 0;
      setRegisters({ ...r, A: result, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "B7": {
      const result = r.A | r.A;
      const newFlags = calculateFlags(result, "logical");
      newFlags.CY = 0;
      newFlags.AC = 0;
      setRegisters({ ...r, A: result, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }

    // CMP Instructions (Compare)
    case "B8": {
      const result = r.A - r.B;
      const newFlags = calculateFlags(result, "cmp");
      newFlags.AC = calculateAuxiliaryCarry(r.A, r.B, "cmp");
      setFlags(newFlags);
      setRegisters({ ...r, PC: pc + opcodeBytes });
      break;
    }
    case "B9": {
      const result = r.A - r.C;
      const newFlags = calculateFlags(result, "cmp");
      newFlags.AC = calculateAuxiliaryCarry(r.A, r.C, "cmp");
      setFlags(newFlags);
      setRegisters({ ...r, PC: pc + opcodeBytes });
      break;
    }
    case "BA": {
      const result = r.A - r.D;
      const newFlags = calculateFlags(result, "cmp");
      newFlags.AC = calculateAuxiliaryCarry(r.A, r.D, "cmp");
      setFlags(newFlags);
      setRegisters({ ...r, PC: pc + opcodeBytes });
      break;
    }
    case "BB": {
      const result = r.A - r.E;
      const newFlags = calculateFlags(result, "cmp");
      newFlags.AC = calculateAuxiliaryCarry(r.A, r.E, "cmp");
      setFlags(newFlags);
      setRegisters({ ...r, PC: pc + opcodeBytes });
      break;
    }
    case "BC": {
      const result = r.A - r.H;
      const newFlags = calculateFlags(result, "cmp");
      newFlags.AC = calculateAuxiliaryCarry(r.A, r.H, "cmp");
      setFlags(newFlags);
      setRegisters({ ...r, PC: pc + opcodeBytes });
      break;
    }
    case "BD": {
      const result = r.A - r.L;
      const newFlags = calculateFlags(result, "cmp");
      newFlags.AC = calculateAuxiliaryCarry(r.A, r.L, "cmp");
      setFlags(newFlags);
      setRegisters({ ...r, PC: pc + opcodeBytes });
      break;
    }
    case "BE": {
      const addr = (r.H << 8) | r.L;
      const memVal = memory[addr] || 0;
      const result = r.A - memVal;
      const newFlags = calculateFlags(result, "cmp");
      newFlags.AC = calculateAuxiliaryCarry(r.A, memVal, "cmp");
      setFlags(newFlags);
      setRegisters({ ...r, PC: pc + opcodeBytes });
      break;
    }
    case "BF": {
      const result = r.A - r.A;
      const newFlags = calculateFlags(result, "cmp");
      newFlags.AC = calculateAuxiliaryCarry(r.A, r.A, "cmp");
      setFlags(newFlags);
      setRegisters({ ...r, PC: pc + opcodeBytes });
      break;
    }

    // Jump Instructions
    case "C3": {
      const addr = (memory[pc + 2] << 8) | memory[pc + 1];
      setRegisters({ ...r, PC: addr });
      break;
    }
    case "C2": {
      if (flags.Z === 0) {
        const addr = (memory[pc + 2] << 8) | memory[pc + 1];
        setRegisters({ ...r, PC: addr });
      } else {
        setRegisters({ ...r, PC: pc + opcodeBytes });
      }
      break;
    }
    case "CA": {
      if (flags.Z === 1) {
        const addr = (memory[pc + 2] << 8) | memory[pc + 1];
        setRegisters({ ...r, PC: addr });
      } else {
        setRegisters({ ...r, PC: pc + opcodeBytes });
      }
      break;
    }
    case "D2": {
      if (flags.CY === 0) {
        const addr = (memory[pc + 2] << 8) | memory[pc + 1];
        setRegisters({ ...r, PC: addr });
      } else {
        setRegisters({ ...r, PC: pc + opcodeBytes });
      }
      break;
    }
    case "DA": {
      if (flags.CY === 1) {
        const addr = (memory[pc + 2] << 8) | memory[pc + 1];
        setRegisters({ ...r, PC: addr });
      } else {
        setRegisters({ ...r, PC: pc + opcodeBytes });
      }
      break;
    }
    case "E2": {
      if (flags.P === 0) {
        const addr = (memory[pc + 2] << 8) | memory[pc + 1];
        setRegisters({ ...r, PC: addr });
      } else {
        setRegisters({ ...r, PC: pc + opcodeBytes });
      }
      break;
    }
    case "EA": {
      if (flags.P === 1) {
        const addr = (memory[pc + 2] << 8) | memory[pc + 1];
        setRegisters({ ...r, PC: addr });
      } else {
        setRegisters({ ...r, PC: pc + opcodeBytes });
      }
      break;
    }
    case "F2": {
      if (flags.S === 0) {
        const addr = (memory[pc + 2] << 8) | memory[pc + 1];
        setRegisters({ ...r, PC: addr });
      } else {
        setRegisters({ ...r, PC: pc + opcodeBytes });
      }
      break;
    }
    case "FA": {
      if (flags.S === 1) {
        const addr = (memory[pc + 2] << 8) | memory[pc + 1];
        setRegisters({ ...r, PC: addr });
      } else {
        setRegisters({ ...r, PC: pc + opcodeBytes });
      }
      break;
    }

    // Call Instructions
    case "CD": {
      const addr = (memory[pc + 2] << 8) | memory[pc + 1];
      const returnAddr = pc + opcodeBytes;
      memory[r.SP - 1] = (returnAddr >> 8) & 0xff;
      memory[r.SP - 2] = returnAddr & 0xff;
      setRegisters({ ...r, SP: r.SP - 2, PC: addr });
      break;
    }
    case "C4": {
      if (flags.Z === 0) {
        const addr = (memory[pc + 2] << 8) | memory[pc + 1];
        const returnAddr = pc + opcodeBytes;
        memory[r.SP - 1] = (returnAddr >> 8) & 0xff;
        memory[r.SP - 2] = returnAddr & 0xff;
        setRegisters({ ...r, SP: r.SP - 2, PC: addr });
      } else {
        setRegisters({ ...r, PC: pc + opcodeBytes });
      }
      break;
    }
    case "CC": {
      if (flags.Z === 1) {
        const addr = (memory[pc + 2] << 8) | memory[pc + 1];
        const returnAddr = pc + opcodeBytes;
        memory[r.SP - 1] = (returnAddr >> 8) & 0xff;
        memory[r.SP - 2] = returnAddr & 0xff;
        setRegisters({ ...r, SP: r.SP - 2, PC: addr });
      } else {
        setRegisters({ ...r, PC: pc + opcodeBytes });
      }
      break;
    }
    case "D4": {
      if (flags.CY === 0) {
        const addr = (memory[pc + 2] << 8) | memory[pc + 1];
        const returnAddr = pc + opcodeBytes;
        memory[r.SP - 1] = (returnAddr >> 8) & 0xff;
        memory[r.SP - 2] = returnAddr & 0xff;
        setRegisters({ ...r, SP: r.SP - 2, PC: addr });
      } else {
        setRegisters({ ...r, PC: pc + opcodeBytes });
      }
      break;
    }
    case "DC": {
      if (flags.CY === 1) {
        const addr = (memory[pc + 2] << 8) | memory[pc + 1];
        const returnAddr = pc + opcodeBytes;
        memory[r.SP - 1] = (returnAddr >> 8) & 0xff;
        memory[r.SP - 2] = returnAddr & 0xff;
        setRegisters({ ...r, SP: r.SP - 2, PC: addr });
      } else {
        setRegisters({ ...r, PC: pc + opcodeBytes });
      }
      break;
    }
    case "E4": {
      if (flags.P === 0) {
        const addr = (memory[pc + 2] << 8) | memory[pc + 1];
        const returnAddr = pc + opcodeBytes;
        memory[r.SP - 1] = (returnAddr >> 8) & 0xff;
        memory[r.SP - 2] = returnAddr & 0xff;
        setRegisters({ ...r, SP: r.SP - 2, PC: addr });
      } else {
        setRegisters({ ...r, PC: pc + opcodeBytes });
      }
      break;
    }
    case "EC": {
      if (flags.P === 1) {
        const addr = (memory[pc + 2] << 8) | memory[pc + 1];
        const returnAddr = pc + opcodeBytes;
        memory[r.SP - 1] = (returnAddr >> 8) & 0xff;
        memory[r.SP - 2] = returnAddr & 0xff;
        setRegisters({ ...r, SP: r.SP - 2, PC: addr });
      } else {
        setRegisters({ ...r, PC: pc + opcodeBytes });
      }
      break;
    }
    case "F4": {
      if (flags.S === 0) {
        const addr = (memory[pc + 2] << 8) | memory[pc + 1];
        const returnAddr = pc + opcodeBytes;
        memory[r.SP - 1] = (returnAddr >> 8) & 0xff;
        memory[r.SP - 2] = returnAddr & 0xff;
        setRegisters({ ...r, SP: r.SP - 2, PC: addr });
      } else {
        setRegisters({ ...r, PC: pc + opcodeBytes });
      }
      break;
    }
    case "FC": {
      if (flags.S === 1) {
        const addr = (memory[pc + 2] << 8) | memory[pc + 1];
        const returnAddr = pc + opcodeBytes;
        memory[r.SP - 1] = (returnAddr >> 8) & 0xff;
        memory[r.SP - 2] = returnAddr & 0xff;
        setRegisters({ ...r, SP: r.SP - 2, PC: addr });
      } else {
        setRegisters({ ...r, PC: pc + opcodeBytes });
      }
      break;
    }

    // Return Instructions
    case "C9": {
      const addr = (memory[r.SP + 1] << 8) | memory[r.SP];
      setRegisters({ ...r, SP: r.SP + 2, PC: addr });
      break;
    }
    case "C0": {
      if (flags.Z === 0) {
        const addr = (memory[r.SP + 1] << 8) | memory[r.SP];
        setRegisters({ ...r, SP: r.SP + 2, PC: addr });
      } else {
        setRegisters({ ...r, PC: pc + opcodeBytes });
      }
      break;
    }
    case "C8": {
      if (flags.Z === 1) {
        const addr = (memory[r.SP + 1] << 8) | memory[r.SP];
        setRegisters({ ...r, SP: r.SP + 2, PC: addr });
      } else {
        setRegisters({ ...r, PC: pc + opcodeBytes });
      }
      break;
    }
    case "D0": {
      if (flags.CY === 0) {
        const addr = (memory[r.SP + 1] << 8) | memory[r.SP];
        setRegisters({ ...r, SP: r.SP + 2, PC: addr });
      } else {
        setRegisters({ ...r, PC: pc + opcodeBytes });
      }
      break;
    }
    case "D8": {
      if (flags.CY === 1) {
        const addr = (memory[r.SP + 1] << 8) | memory[r.SP];
        setRegisters({ ...r, SP: r.SP + 2, PC: addr });
      } else {
        setRegisters({ ...r, PC: pc + opcodeBytes });
      }
      break;
    }
    case "E0": {
      if (flags.P === 0) {
        const addr = (memory[r.SP + 1] << 8) | memory[r.SP];
        setRegisters({ ...r, SP: r.SP + 2, PC: addr });
      } else {
        setRegisters({ ...r, PC: pc + opcodeBytes });
      }
      break;
    }
    case "E8": {
      if (flags.P === 1) {
        const addr = (memory[r.SP + 1] << 8) | memory[r.SP];
        setRegisters({ ...r, SP: r.SP + 2, PC: addr });
      } else {
        setRegisters({ ...r, PC: pc + opcodeBytes });
      }
      break;
    }
    case "F0": {
      if (flags.S === 0) {
        const addr = (memory[r.SP + 1] << 8) | memory[r.SP];
        setRegisters({ ...r, SP: r.SP + 2, PC: addr });
      } else {
        setRegisters({ ...r, PC: pc + opcodeBytes });
      }
      break;
    }
    case "F8": {
      if (flags.S === 1) {
        const addr = (memory[r.SP + 1] << 8) | memory[r.SP];
        setRegisters({ ...r, SP: r.SP + 2, PC: addr });
      } else {
        setRegisters({ ...r, PC: pc + opcodeBytes });
      }
      break;
    }

    // Stack Instructions
    case "C5": {
      memory[r.SP - 1] = r.B;
      memory[r.SP - 2] = r.C;
      setRegisters({ ...r, SP: r.SP - 2, PC: pc + opcodeBytes });
      break;
    }
    case "D5": {
      memory[r.SP - 1] = r.D;
      memory[r.SP - 2] = r.E;
      setRegisters({ ...r, SP: r.SP - 2, PC: pc + opcodeBytes });
      break;
    }
    case "E5": {
      memory[r.SP - 1] = r.H;
      memory[r.SP - 2] = r.L;
      setRegisters({ ...r, SP: r.SP - 2, PC: pc + opcodeBytes });
      break;
    }
    case "F5": {
      memory[r.SP - 1] = r.A;
      const flagByte =
        (flags.S << 7) |
        (flags.Z << 6) |
        (flags.AC << 4) |
        (flags.P << 2) |
        (flags.CY << 0);
      memory[r.SP - 2] = flagByte;
      setRegisters({ ...r, SP: r.SP - 2, PC: pc + opcodeBytes });
      break;
    }
    case "C1": {
      const newC = memory[r.SP];
      const newB = memory[r.SP + 1];
      setRegisters({
        ...r,
        B: newB,
        C: newC,
        SP: r.SP + 2,
        PC: pc + opcodeBytes,
      });
      break;
    }
    case "D1": {
      const newE = memory[r.SP];
      const newD = memory[r.SP + 1];
      setRegisters({
        ...r,
        D: newD,
        E: newE,
        SP: r.SP + 2,
        PC: pc + opcodeBytes,
      });
      break;
    }
    case "E1": {
      const newL = memory[r.SP];
      const newH = memory[r.SP + 1];
      setRegisters({
        ...r,
        H: newH,
        L: newL,
        SP: r.SP + 2,
        PC: pc + opcodeBytes,
      });
      break;
    }
    case "F1": {
      const flagByte = memory[r.SP];
      const newA = memory[r.SP + 1];
      const newFlags = {
        S: (flagByte >> 7) & 1,
        Z: (flagByte >> 6) & 1,
        AC: (flagByte >> 4) & 1,
        P: (flagByte >> 2) & 1,
        CY: (flagByte >> 0) & 1,
      };
      setRegisters({ ...r, A: newA, SP: r.SP + 2, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }

    // Immediate Instructions
    case "C6": {
      const immediate = memory[pc + 1] || 0;
      const result = r.A + immediate;
      const newFlags = calculateFlags(result, "add");
      newFlags.AC = calculateAuxiliaryCarry(r.A, immediate, "add");
      setRegisters({ ...r, A: result & 0xff, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "CE": {
      const immediate = memory[pc + 1] || 0;
      const result = r.A + immediate + flags.CY;
      const newFlags = calculateFlags(result, "adc");
      newFlags.AC = calculateAuxiliaryCarry(r.A, immediate + flags.CY, "adc");
      setRegisters({ ...r, A: result & 0xff, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "D6": {
      const immediate = memory[pc + 1] || 0;
      const result = r.A - immediate;
      const newFlags = calculateFlags(result, "sub");
      newFlags.AC = calculateAuxiliaryCarry(r.A, immediate, "sub");
      setRegisters({ ...r, A: result & 0xff, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "DE": {
      const immediate = memory[pc + 1] || 0;
      const result = r.A - immediate - flags.CY;
      const newFlags = calculateFlags(result, "sbb");
      newFlags.AC = calculateAuxiliaryCarry(r.A, immediate + flags.CY, "sbb");
      setRegisters({ ...r, A: result & 0xff, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "E6": {
      const immediate = memory[pc + 1] || 0;
      const result = r.A & immediate;
      const newFlags = calculateFlags(result, "logical");
      newFlags.CY = 0;
      newFlags.AC = (r.A | immediate) & 0x08 ? 1 : 0;
      setRegisters({ ...r, A: result, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "EE": {
      const immediate = memory[pc + 1] || 0;
      const result = r.A ^ immediate;
      const newFlags = calculateFlags(result, "logical");
      newFlags.CY = 0;
      newFlags.AC = 0;
      setRegisters({ ...r, A: result, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "F6": {
      const immediate = memory[pc + 1] || 0;
      const result = r.A | immediate;
      const newFlags = calculateFlags(result, "logical");
      newFlags.CY = 0;
      newFlags.AC = 0;
      setRegisters({ ...r, A: result, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "FE": {
      const immediate = memory[pc + 1] || 0;
      const result = r.A - immediate;
      const newFlags = calculateFlags(result, "cmp");
      newFlags.AC = calculateAuxiliaryCarry(r.A, immediate, "cmp");
      setFlags(newFlags);
      setRegisters({ ...r, PC: pc + opcodeBytes });
      break;
    }

    // Load/Store Instructions
    case "3A": {
      const addr = (memory[pc + 2] << 8) | memory[pc + 1];
      setRegisters({ ...r, A: memory[addr] || 0, PC: pc + opcodeBytes });
      break;
    }
    case "32": {
      const addr = (memory[pc + 2] << 8) | memory[pc + 1];
      memory[addr] = r.A;
      setRegisters({ ...r, PC: pc + opcodeBytes });
      break;
    }
    case "2A": {
      const addr = (memory[pc + 2] << 8) | memory[pc + 1];
      const newL = memory[addr] || 0;
      const newH = memory[addr + 1] || 0;
      setRegisters({ ...r, L: newL, H: newH, PC: pc + opcodeBytes });
      break;
    }
    case "22": {
      const addr = (memory[pc + 2] << 8) | memory[pc + 1];
      memory[addr] = r.L;
      memory[addr + 1] = r.H;
      setRegisters({ ...r, PC: pc + opcodeBytes });
      break;
    }

    // Load register pair immediate
    case "01": {
      const newC = memory[pc + 1] || 0;
      const newB = memory[pc + 2] || 0;
      setRegisters({ ...r, B: newB, C: newC, PC: pc + opcodeBytes });
      break;
    }
    case "11": {
      const newE = memory[pc + 1] || 0;
      const newD = memory[pc + 2] || 0;
      setRegisters({ ...r, D: newD, E: newE, PC: pc + opcodeBytes });
      break;
    }
    case "21": {
      const newL = memory[pc + 1] || 0;
      const newH = memory[pc + 2] || 0;
      setRegisters({ ...r, H: newH, L: newL, PC: pc + opcodeBytes });
      break;
    }
    case "31": {
      const newSP = (memory[pc + 2] << 8) | memory[pc + 1];
      setRegisters({ ...r, SP: newSP, PC: pc + opcodeBytes });
      break;
    }

    // Increment/Decrement Instructions
    case "04": {
      const result = (r.B + 1) & 0xff;
      const newFlags = { ...flags };
      newFlags.Z = result === 0 ? 1 : 0;
      newFlags.S = result & 0x80 ? 1 : 0;
      newFlags.P = 0;
      let temp = result;
      for (let i = 0; i < 8; i++) {
        if (temp & 1) newFlags.P++;
        temp >>= 1;
      }
      newFlags.P = newFlags.P % 2 === 0 ? 1 : 0;
      newFlags.AC = (r.B & 0x0f) === 0x0f ? 1 : 0;
      setRegisters({ ...r, B: result, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    // STAX Instructions
    case "02": {
      const addr = (r.B << 8) | r.C;
      memory[addr] = r.A;
      setRegisters({ ...r, PC: pc + opcodeBytes });
      break;
    }
    case "12": {
      const addr = (r.D << 8) | r.E;
      memory[addr] = r.A;
      setRegisters({ ...r, PC: pc + opcodeBytes });
      break;
    }

    // LDAX Instructions
    case "0A": {
      const addr = (r.B << 8) | r.C;
      setRegisters({ ...r, A: memory[addr] || 0, PC: pc + opcodeBytes });
      break;
    }
    case "1A": {
      const addr = (r.D << 8) | r.E;
      setRegisters({ ...r, A: memory[addr] || 0, PC: pc + opcodeBytes });
      break;
    }

    // INX Instructions
    case "03": {
      let bc = ((r.B << 8) | r.C) + 1;
      bc = bc & 0xffff;
      setRegisters({
        ...r,
        B: (bc >> 8) & 0xff,
        C: bc & 0xff,
        PC: pc + opcodeBytes,
      });
      break;
    }
    case "13": {
      let de = ((r.D << 8) | r.E) + 1;
      de = de & 0xffff;
      setRegisters({
        ...r,
        D: (de >> 8) & 0xff,
        E: de & 0xff,
        PC: pc + opcodeBytes,
      });
      break;
    }
    case "23": {
      let hl = ((r.H << 8) | r.L) + 1;
      hl = hl & 0xffff;
      setRegisters({
        ...r,
        H: (hl >> 8) & 0xff,
        L: hl & 0xff,
        PC: pc + opcodeBytes,
      });
      break;
    }
    case "33": {
      let sp = r.SP + 1;
      sp = sp & 0xffff;
      setRegisters({ ...r, SP: sp, PC: pc + opcodeBytes });
      break;
    }

    // DCX Instructions
    case "0B": {
      let bc = ((r.B << 8) | r.C) - 1;
      bc = bc & 0xffff;
      setRegisters({
        ...r,
        B: (bc >> 8) & 0xff,
        C: bc & 0xff,
        PC: pc + opcodeBytes,
      });
      break;
    }
    case "1B": {
      let de = ((r.D << 8) | r.E) - 1;
      de = de & 0xffff;
      setRegisters({
        ...r,
        D: (de >> 8) & 0xff,
        E: de & 0xff,
        PC: pc + opcodeBytes,
      });
      break;
    }
    case "2B": {
      let hl = ((r.H << 8) | r.L) - 1;
      hl = hl & 0xffff;
      setRegisters({
        ...r,
        H: (hl >> 8) & 0xff,
        L: hl & 0xff,
        PC: pc + opcodeBytes,
      });
      break;
    }
    case "3B": {
      let sp = r.SP - 1;
      sp = sp & 0xffff;
      setRegisters({ ...r, SP: sp, PC: pc + opcodeBytes });
      break;
    }

    // INR Instructions
    case "04": {
      const result = r.B + 1;
      const newFlags = calculateFlags(result, "add");
      newFlags.AC = calculateAuxiliaryCarry(r.B, 1, "add");
      newFlags.CY = flags.CY; // INR doesn't affect carry
      setRegisters({ ...r, B: result & 0xff, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "0C": {
      const result = r.C + 1;
      const newFlags = calculateFlags(result, "add");
      newFlags.AC = calculateAuxiliaryCarry(r.C, 1, "add");
      newFlags.CY = flags.CY; // INR doesn't affect carry
      setRegisters({ ...r, C: result & 0xff, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "14": {
      const result = r.D + 1;
      const newFlags = calculateFlags(result, "add");
      newFlags.AC = calculateAuxiliaryCarry(r.D, 1, "add");
      newFlags.CY = flags.CY; // INR doesn't affect carry
      setRegisters({ ...r, D: result & 0xff, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "1C": {
      const result = r.E + 1;
      const newFlags = calculateFlags(result, "add");
      newFlags.AC = calculateAuxiliaryCarry(r.E, 1, "add");
      newFlags.CY = flags.CY; // INR doesn't affect carry
      setRegisters({ ...r, E: result & 0xff, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "24": {
      const result = r.H + 1;
      const newFlags = calculateFlags(result, "add");
      newFlags.AC = calculateAuxiliaryCarry(r.H, 1, "add");
      newFlags.CY = flags.CY; // INR doesn't affect carry
      setRegisters({ ...r, H: result & 0xff, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "2C": {
      const result = r.L + 1;
      const newFlags = calculateFlags(result, "add");
      newFlags.AC = calculateAuxiliaryCarry(r.L, 1, "add");
      newFlags.CY = flags.CY; // INR doesn't affect carry
      setRegisters({ ...r, L: result & 0xff, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "34": {
      const addr = (r.H << 8) | r.L;
      const result = (memory[addr] || 0) + 1;
      const newFlags = calculateFlags(result, "add");
      newFlags.AC = calculateAuxiliaryCarry(memory[addr] || 0, 1, "add");
      newFlags.CY = flags.CY; // INR doesn't affect carry
      memory[addr] = result & 0xff;
      setRegisters({ ...r, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "3C": {
      const result = r.A + 1;
      const newFlags = calculateFlags(result, "add");
      newFlags.AC = calculateAuxiliaryCarry(r.A, 1, "add");
      newFlags.CY = flags.CY; // INR doesn't affect carry
      setRegisters({ ...r, A: result & 0xff, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }

    // DCR Instructions
    case "05": {
      const result = r.B - 1;
      const newFlags = calculateFlags(result, "sub");
      newFlags.AC = calculateAuxiliaryCarry(r.B, 1, "sub");
      newFlags.CY = flags.CY; // DCR doesn't affect carry
      setRegisters({ ...r, B: result & 0xff, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "0D": {
      const result = r.C - 1;
      const newFlags = calculateFlags(result, "sub");
      newFlags.AC = calculateAuxiliaryCarry(r.C, 1, "sub");
      newFlags.CY = flags.CY; // DCR doesn't affect carry
      setRegisters({ ...r, C: result & 0xff, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "15": {
      const result = r.D - 1;
      const newFlags = calculateFlags(result, "sub");
      newFlags.AC = calculateAuxiliaryCarry(r.D, 1, "sub");
      newFlags.CY = flags.CY; // DCR doesn't affect carry
      setRegisters({ ...r, D: result & 0xff, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "1D": {
      const result = r.E - 1;
      const newFlags = calculateFlags(result, "sub");
      newFlags.AC = calculateAuxiliaryCarry(r.E, 1, "sub");
      newFlags.CY = flags.CY; // DCR doesn't affect carry
      setRegisters({ ...r, E: result & 0xff, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "25": {
      const result = r.H - 1;
      const newFlags = calculateFlags(result, "sub");
      newFlags.AC = calculateAuxiliaryCarry(r.H, 1, "sub");
      newFlags.CY = flags.CY; // DCR doesn't affect carry
      setRegisters({ ...r, H: result & 0xff, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "2D": {
      const result = r.L - 1;
      const newFlags = calculateFlags(result, "sub");
      newFlags.AC = calculateAuxiliaryCarry(r.L, 1, "sub");
      newFlags.CY = flags.CY; // DCR doesn't affect carry
      setRegisters({ ...r, L: result & 0xff, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "35": {
      const addr = (r.H << 8) | r.L;
      const result = (memory[addr] || 0) - 1;
      const newFlags = calculateFlags(result, "sub");
      newFlags.AC = calculateAuxiliaryCarry(memory[addr] || 0, 1, "sub");
      newFlags.CY = flags.CY; // DCR doesn't affect carry
      memory[addr] = result & 0xff;
      setRegisters({ ...r, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "3D": {
      const result = r.A - 1;
      const newFlags = calculateFlags(result, "sub");
      newFlags.AC = calculateAuxiliaryCarry(r.A, 1, "sub");
      newFlags.CY = flags.CY; // DCR doesn't affect carry
      setRegisters({ ...r, A: result & 0xff, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }

    // DAD Instructions
    case "09": {
      const hl = (r.H << 8) | r.L;
      const bc = (r.B << 8) | r.C;
      const result = hl + bc;
      const newFlags = { ...flags };
      newFlags.CY = result > 0xffff ? 1 : 0;
      setRegisters({
        ...r,
        H: (result >> 8) & 0xff,
        L: result & 0xff,
        PC: pc + opcodeBytes,
      });
      setFlags(newFlags);
      break;
    }
    case "19": {
      const hl = (r.H << 8) | r.L;
      const de = (r.D << 8) | r.E;
      const result = hl + de;
      const newFlags = { ...flags };
      newFlags.CY = result > 0xffff ? 1 : 0;
      setRegisters({
        ...r,
        H: (result >> 8) & 0xff,
        L: result & 0xff,
        PC: pc + opcodeBytes,
      });
      setFlags(newFlags);
      break;
    }
    case "29": {
      const hl = (r.H << 8) | r.L;
      const result = hl + hl;
      const newFlags = { ...flags };
      newFlags.CY = result > 0xffff ? 1 : 0;
      setRegisters({
        ...r,
        H: (result >> 8) & 0xff,
        L: result & 0xff,
        PC: pc + opcodeBytes,
      });
      setFlags(newFlags);
      break;
    }
    case "39": {
      const hl = (r.H << 8) | r.L;
      const result = hl + r.SP;
      const newFlags = { ...flags };
      newFlags.CY = result > 0xffff ? 1 : 0;
      setRegisters({
        ...r,
        H: (result >> 8) & 0xff,
        L: result & 0xff,
        PC: pc + opcodeBytes,
      });
      setFlags(newFlags);
      break;
    }

    // Rotate Instructions
    case "07": {
      const carry = r.A & 0x80 ? 1 : 0;
      const newA = ((r.A << 1) & 0xfe) | carry;
      const newFlags = { ...flags };
      newFlags.CY = carry;
      setRegisters({ ...r, A: newA, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "0F": {
      const carry = r.A & 0x01 ? 1 : 0;
      const newA = ((r.A >> 1) & 0x7f) | (carry << 7);
      const newFlags = { ...flags };
      newFlags.CY = carry;
      setRegisters({ ...r, A: newA, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "17": {
      const carry = r.A & 0x80 ? 1 : 0;
      const newA = ((r.A << 1) & 0xfe) | flags.CY;
      const newFlags = { ...flags };
      newFlags.CY = carry;
      setRegisters({ ...r, A: newA, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "1F": {
      const carry = r.A & 0x01 ? 1 : 0;
      const newA = ((r.A >> 1) & 0x7f) | (flags.CY << 7);
      const newFlags = { ...flags };
      newFlags.CY = carry;
      setRegisters({ ...r, A: newA, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }

    // CMA, CMC, STC
    case "2F": {
      setRegisters({ ...r, A: ~r.A & 0xff, PC: pc + opcodeBytes });
      break;
    }
    case "37": {
      const newFlags = { ...flags };
      newFlags.CY = 1;
      setRegisters({ ...r, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }
    case "3F": {
      const newFlags = { ...flags };
      newFlags.CY = flags.CY ? 0 : 1;
      setRegisters({ ...r, PC: pc + opcodeBytes });
      setFlags(newFlags);
      break;
    }

    // HLT
    case "76":
      // Halt - stop execution
      return { halt: true };

    // RST Instructions
    case "C7": {
      memory[r.SP - 1] = (pc + opcodeBytes) >> 8;
      memory[r.SP - 2] = (pc + opcodeBytes) & 0xff;
      setRegisters({ ...r, SP: r.SP - 2, PC: 0x00 });
      break;
    }
    case "CF": {
      memory[r.SP - 1] = (pc + opcodeBytes) >> 8;
      memory[r.SP - 2] = (pc + opcodeBytes) & 0xff;
      setRegisters({ ...r, SP: r.SP - 2, PC: 0x08 });
      break;
    }
    case "D7": {
      memory[r.SP - 1] = (pc + opcodeBytes) >> 8;
      memory[r.SP - 2] = (pc + opcodeBytes) & 0xff;
      setRegisters({ ...r, SP: r.SP - 2, PC: 0x10 });
      break;
    }
    case "DF": {
      memory[r.SP - 1] = (pc + opcodeBytes) >> 8;
      memory[r.SP - 2] = (pc + opcodeBytes) & 0xff;
      setRegisters({ ...r, SP: r.SP - 2, PC: 0x18 });
      break;
    }
    case "E7": {
      memory[r.SP - 1] = (pc + opcodeBytes) >> 8;
      memory[r.SP - 2] = (pc + opcodeBytes) & 0xff;
      setRegisters({ ...r, SP: r.SP - 2, PC: 0x20 });
      break;
    }
    case "EF": {
      memory[r.SP - 1] = (pc + opcodeBytes) >> 8;
      memory[r.SP - 2] = (pc + opcodeBytes) & 0xff;
      setRegisters({ ...r, SP: r.SP - 2, PC: 0x28 });
      break;
    }
    case "F7": {
      memory[r.SP - 1] = (pc + opcodeBytes) >> 8;
      memory[r.SP - 2] = (pc + opcodeBytes) & 0xff;
      setRegisters({ ...r, SP: r.SP - 2, PC: 0x30 });
      break;
    }
    case "FF": {
      memory[r.SP - 1] = (pc + opcodeBytes) >> 8;
      memory[r.SP - 2] = (pc + opcodeBytes) & 0xff;
      setRegisters({ ...r, SP: r.SP - 2, PC: 0x38 });
      break;
    }

    // I/O Instructions
    case "D3": {
      const port = memory[pc + 1] || 0;
      // OUT instruction - output accumulator to port
      // console.log(`OUT: Port ${port.toString(16)}, Data: ${r.A.toString(16)}`);
      setRegisters({ ...r, PC: pc + opcodeBytes });
      break;
    }
    case "DB": {
      const port = memory[pc + 1] || 0;
      // IN instruction - input from port to accumulator
      // console.log(`IN: Port ${port.toString(16)}`);
      // For simulation, we'll just set A to 0
      setRegisters({ ...r, A: 0, PC: pc + opcodeBytes });
      break;
    }

    // Stack Instructions
    case "E3": {
      // XTHL - Exchange top of stack with H and L
      const temp = memory[r.SP] || 0;
      const temp2 = memory[r.SP + 1] || 0;
      memory[r.SP] = r.L;
      memory[r.SP + 1] = r.H;
      setRegisters({ ...r, H: temp2, L: temp, PC: pc + opcodeBytes });
      break;
    }
    case "EB": {
      // XCHG - Exchange H and L with D and E
      const tempH = r.H;
      const tempL = r.L;
      setRegisters({
        ...r,
        H: r.D,
        L: r.E,
        D: tempH,
        E: tempL,
        PC: pc + opcodeBytes,
      });
      break;
    }
    case "E9": {
      // PCHL - Move H and L to PC
      const newPC = (r.H << 8) | r.L;
      setRegisters({ ...r, PC: newPC });
      break;
    }
    case "F9": {
      // SPHL - Move H and L to SP
      const newSP = (r.H << 8) | r.L;
      setRegisters({ ...r, SP: newSP, PC: pc + opcodeBytes });
      break;
    }

    // Interrupt Instructions
    case "F3": {
      // DI - Disable interrupts
      // console.log("Interrupts disabled");
      setRegisters({ ...r, PC: pc + opcodeBytes });
      break;
    }
    case "FB": {
      // EI - Enable interrupts
      // console.log("Interrupts enabled");
      setRegisters({ ...r, PC: pc + opcodeBytes });
      break;
    }

    default: {
      // console.warn(`Unknown opcode: ${opcode} at PC: ${pc.toString(16)}`);
      setRegisters({ ...r, PC: pc + opcodeBytes });
      break;
    }
  }
  return { halt: false };
};
