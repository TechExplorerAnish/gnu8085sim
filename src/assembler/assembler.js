import INSTRUCTION_SET from "../utils/instructionset.js";
import { pass1 } from "./pass1.js";
export default function assemble(code, starting_address = 0x0000) {
  let pc = starting_address;
  const lines = code.trim().split("\n");
  const labels = pass1(code,starting_address);
  console.log(labels)
  const memory = {};
  for (let line of lines) {
    line = line.trim().toUpperCase();

    // Skip empty lines and comments
    if (!line || line.startsWith(";")) {
      continue;
    }

    // Remove comments from the line
    line = line.split(";")[0].trim().toUpperCase();
    if (!line) {
      continue;
    }

    // Handle labels (possibly label-only lines like LOOP:)
    if (line.includes(":")) {
      const parts = line.split(":", 2);
      if (parts.length === 2) {
        line = parts[1].trim();
      } else {
        continue; // skip label-only line like "LOOP:"
      }
    }

    if (!line) {
      continue;
    }

    const parts = line.replace(/,/g, " ").split(/\s+/);
    const instr = parts[0];
    const args = parts.length > 1 ? parts.slice(1) : [];

    //----------------data transfer group------------------------------------
    if (instr === "MVI" && args.length === 2) {
      const opcode = INSTRUCTION_SET["MVI"][args[0]];
      if (opcode) {
        memory[pc] = opcode;
        pc += 1;
        const value = parseNumber(args[1]);
        memory[pc] = value.toString(16).padStart(2, "0").toUpperCase();
        pc += 1;
      } else {
        console.log(`Unknown MVI register: ${args[0]}`);
      }
    } else if (instr === "MOV" && args.length === 2) {
      const opcode = INSTRUCTION_SET[instr][args[0]][args[1]];
      if (opcode) {
        memory[pc] = opcode;
        pc += 1;
      } else {
        console.log(`Invalid MOV combination: ${args}`);
      }
    } else if (instr === "STA" && args.length === 1) {
      memory[pc] = INSTRUCTION_SET["STA"];
      pc += 1;
      const value = parseNumber(args[0]);
      const addr = value.toString(16).padStart(4, "0").toUpperCase();
      memory[pc] = addr.substring(2);
      pc += 1;
      memory[pc] = addr.substring(0, 2);
      pc += 1;
    } else if (instr === "LDA" && args.length === 1) {
      memory[pc] = INSTRUCTION_SET["LDA"];
      pc += 1;
      const value = parseNumber(args[0]);
      const addr = value.toString(16).padStart(4, "0").toUpperCase();
      memory[pc] = addr.substring(2);
      pc += 1;
      memory[pc] = addr.substring(0, 2);
      pc += 1;
    } else if (instr === "LHLD" && args.length === 1) {
      memory[pc] = INSTRUCTION_SET[instr];
      pc += 1;
      const value = parseNumber(args[0]);
      const addr = value.toString(16).padStart(4, "0").toLowerCase();
      memory[pc] = addr.substring(0, 2);
      pc += 1;
      memory[pc] = addr.substring(2);
      pc += 1;
    } else if (instr === "LDAX" && args.length === 1) {
      memory[pc] = INSTRUCTION_SET[instr][args[0]];
      pc += 1;
    } else if (instr === "STAX" && args.length === 1) {
      memory[pc] = INSTRUCTION_SET[instr][args[0]];
      pc += 1;
    } else if (instr === "XCHG" && args.length === 0) {
      memory[pc] = INSTRUCTION_SET[instr];
      pc += 1;
    } else if (instr === "SHLD" && args.length === 1) {
      memory[pc] = INSTRUCTION_SET[instr];
      pc += 1;
      const value = parseNumber(args[0]);
      const addr = value.toString(16).padStart(4, "0").toLowerCase();
      memory[pc] = addr.substring(0, 2);
      pc += 1;
      memory[pc] = addr.substring(2);
      pc += 1;
    }

    //------------------Arithmetic Instructions----------------------
    else if (instr === "ADD" && args.length === 1) {
      const opcode = INSTRUCTION_SET[instr][args[0]];
      if (opcode) {
        memory[pc] = opcode;
        pc += 1;
      } else {
        console.log(`invalid code ${line}`);
      }
    } else if (instr === "ADC" && args.length === 1) {
      const opcode = INSTRUCTION_SET[instr][args[0]];
      if (opcode) {
        memory[pc] = opcode;
        pc += 1;
      } else {
        console.log(`invalid code ${line}`);
      }
    } else if (instr === "ADI" && args.length === 1) {
      memory[pc] = INSTRUCTION_SET[instr];
      pc += 1;
      const value = parseNumber(args[0]);
      memory[pc] = value.toString(16).padStart(2, "0").toUpperCase();
      pc += 1;
    } else if (instr === "ACI" && args.length === 1) {
      memory[pc] = INSTRUCTION_SET[instr];
      pc += 1;
      const value = parseNumber(args[0]);
      memory[pc] = value.toString(16).padStart(2, "0").toUpperCase();
      pc += 1;
    } else if (instr === "SUB" && args.length === 1) {
      const opcode = INSTRUCTION_SET[instr][args[0]];
      if (opcode) {
        memory[pc] = opcode;
        pc += 1;
      } else {
        console.log(`invalid code ${line}`);
      }
    } else if (instr === "SBB" && args.length === 1) {
      const opcode = INSTRUCTION_SET[instr][args[0]];
      if (opcode) {
        memory[pc] = opcode;
        pc += 1;
      } else {
        console.log(`invalid code ${line}`);
      }
    } else if (instr === "SUI" && args.length === 1) {
      memory[pc] = INSTRUCTION_SET[instr];
      pc += 1;
      const value = parseNumber(args[0]);
      memory[pc] = value.toString(16).padStart(2, "0").toUpperCase();
      pc += 1;
    } else if (instr === "SBI" && args.length === 1) {
      memory[pc] = INSTRUCTION_SET[instr];
      pc += 1;
      const value = parseNumber(args[0]);
      memory[pc] = value.toString(16).padStart(2, "0").toUpperCase();
      pc += 1;
    } else if (instr === "INR" && args.length === 1) {
      const opcode = INSTRUCTION_SET[instr][args[0]];
      if (opcode) {
        memory[pc] = opcode;
        pc += 1;
      } else {
        console.log(`invalid code ${line}`);
      }
    } else if (instr === "DCR" && args.length === 1) {
      const opcode = INSTRUCTION_SET[instr][args[0]];
      if (opcode) {
        memory[pc] = opcode;
        pc += 1;
      } else {
        console.log(`invalid code ${line}`);
      }
    } else if (instr === "INX" && args.length === 1) {
      const opcode = INSTRUCTION_SET[instr][args[0]];
      if (opcode) {
        memory[pc] = opcode;
        pc += 1;
      } else {
        console.log(`invalid code ${line}`);
      }
    } else if (instr === "DCX" && args.length === 1) {
      const opcode = INSTRUCTION_SET[instr][args[0]];
      if (opcode) {
        memory[pc] = opcode;
        pc += 1;
      } else {
        console.log(`invalid code ${line}`);
      }
    } else if (instr === "DAD" && args.length === 1) {
      const opcode = INSTRUCTION_SET["DAD"][args[0]];
      if (opcode) {
        memory[pc] = opcode;
        pc += 1;
      } else {
        console.log(`Unknown DAD register pair: ${args[0]}`);
      }
    } else if (instr === "DAA" && args.length === 0) {
      memory[pc] = INSTRUCTION_SET[instr];
      pc += 1;
    }

    //------------Logical Instructions------------------------
    else if (instr === "ANA" && args.length === 1) {
      const opcode = INSTRUCTION_SET[instr][args[0]];
      if (opcode) {
        memory[pc] = opcode;
        pc += 1;
      } else {
        console.log(`invalid code ${line}`);
      }
    } else if (instr === "ANI" && args.length === 1) {
      memory[pc] = INSTRUCTION_SET[instr];
      pc += 1;
      const value = parseNumber(args[0]);
      memory[pc] = value.toString(16).padStart(2, "0").toUpperCase();
      pc += 1;
    } else if (instr === "ORA" && args.length === 1) {
      const opcode = INSTRUCTION_SET[instr][args[0]];
      if (opcode) {
        memory[pc] = opcode;
        pc += 1;
      } else {
        console.log(`invalid code ${line}`);
      }
    } else if (instr === "ORI" && args.length === 1) {
      memory[pc] = INSTRUCTION_SET[instr];
      pc += 1;
      const value = parseNumber(args[0]);
      memory[pc] = value.toString(16).padStart(2, "0").toUpperCase();
      pc += 1;
    } else if (instr === "XRA" && args.length === 1) {
      const opcode = INSTRUCTION_SET[instr][args[0]];
      if (opcode) {
        memory[pc] = opcode;
        pc += 1;
      } else {
        console.log(`invalid code ${line}`);
      }
    } else if (instr === "XRI" && args.length === 1) {
      memory[pc] = INSTRUCTION_SET[instr];
      pc += 1;
      const value = parseNumber(args[0]);
      memory[pc] = value.toString(16).padStart(2, "0").toUpperCase();
      pc += 1;
    } else if (instr === "CMP" && args.length === 1) {
      const opcode = INSTRUCTION_SET[instr][args[0]];
      if (opcode) {
        memory[pc] = opcode;
        pc += 1;
      } else {
        console.log(`invalid code ${line}`);
      }
    } else if (instr === "CPI" && args.length === 1) {
      memory[pc] = INSTRUCTION_SET[instr];
      pc += 1;
      const value = parseNumber(args[0]);
      memory[pc] = value.toString(16).padStart(2, "0").toUpperCase();
      pc += 1;
    } else if (instr === "CMA" && args.length === 0) {
      memory[pc] = INSTRUCTION_SET[instr];
      pc += 1;
    } else if (instr === "CMC" && args.length === 0) {
      memory[pc] = INSTRUCTION_SET[instr];
      pc += 1;
    } else if (instr === "STC" && args.length === 0) {
      memory[pc] = INSTRUCTION_SET[instr];
      pc += 1;
    }

    //--------------Rotate Instructions-------------------------
    else if (instr === "RLC" && args.length === 0) {
      memory[pc] = INSTRUCTION_SET[instr];
      pc += 1;
    } else if (instr === "RRC" && args.length === 0) {
      memory[pc] = INSTRUCTION_SET[instr];
      pc += 1;
    } else if (instr === "RAL" && args.length === 0) {
      memory[pc] = INSTRUCTION_SET[instr];
      pc += 1;
    } else if (instr === "RAR" && args.length === 0) {
      memory[pc] = INSTRUCTION_SET[instr];
      pc += 1;
    }

    //------------------Branching Instructions----------------------
    else if (
      ["JMP", "JNZ", "JZ", "JP", "JM", "JC", "JNC", "JPE", "JPO"].includes(
        instr
      )
    ) {
      const opcode = INSTRUCTION_SET[instr];
      memory[pc] = opcode;
      pc += 1;
      const addr = labels[args[0]]; // label like LOOP or SUB1
      if (addr === undefined) {
        throw new Error(`Label ${args[0]} not found`);
      }
      const addrHex = addr.toString(16).padStart(4, "0").toUpperCase();
      memory[pc] = addrHex.substring(2); // low byte
      pc += 1;
      memory[pc] = addrHex.substring(0, 2); // high byte
      pc += 1;
    }

    //------------------Stack Instructions----------------------
    else if (instr === "PUSH" && args.length === 1) {
      const opcode = INSTRUCTION_SET["PUSH"][args[0]];
      if (opcode) {
        memory[pc] = opcode;
        pc += 1;
      } else {
        console.log(`Unknown PUSH register pair: ${args[0]}`);
      }
    } else if (instr === "POP" && args.length === 1) {
      const opcode = INSTRUCTION_SET["POP"][args[0]];
      if (opcode) {
        memory[pc] = opcode;
        pc += 1;
      } else {
        console.log(`Unknown POP register pair: ${args[0]}`);
      }
    } else if (instr === "XTHL" && args.length === 0) {
      memory[pc] = INSTRUCTION_SET[instr];
      pc += 1;
    } else if (instr === "SPHL" && args.length === 0) {
      memory[pc] = INSTRUCTION_SET[instr];
      pc += 1;
    }

    //------------------Subroutine Instructions----------------------
    else if (
      ["CALL", "CC", "CNC", "CZ", "CNZ", "CP", "CM", "CPE", "CPO"].includes(
        instr
      )
    ) {
      const opcode = INSTRUCTION_SET[instr];
      memory[pc] = opcode;
      pc += 1;
      const addr = labels[args[0]]; // label like SUB1
      if (addr === undefined) {
        throw new Error(`Label ${args[0]} not found`);
      }
      const addrHex = addr.toString(16).padStart(4, "0").toUpperCase();
      memory[pc] = addrHex.substring(2);
      pc += 1;
      memory[pc] = addrHex.substring(0, 2);
      pc += 1;
    } else if (instr === "RET" && args.length === 0) {
      memory[pc] = INSTRUCTION_SET[instr];
      pc += 1;
    } else if (instr === "RNZ" && args.length === 0) {
      memory[pc] = INSTRUCTION_SET[instr];
      pc += 1;
    } else if (instr === "RZ" && args.length === 0) {
      memory[pc] = INSTRUCTION_SET[instr];
      pc += 1;
    } else if (instr === "RNC" && args.length === 0) {
      memory[pc] = INSTRUCTION_SET[instr];
      pc += 1;
    } else if (instr === "RC" && args.length === 0) {
      memory[pc] = INSTRUCTION_SET[instr];
      pc += 1;
    } else if (instr === "RPO" && args.length === 0) {
      memory[pc] = INSTRUCTION_SET[instr];
      pc += 1;
    } else if (instr === "RPE" && args.length === 0) {
      memory[pc] = INSTRUCTION_SET[instr];
      pc += 1;
    } else if (instr === "RP" && args.length === 0) {
      memory[pc] = INSTRUCTION_SET[instr];
      pc += 1;
    } else if (instr === "RM" && args.length === 0) {
      memory[pc] = INSTRUCTION_SET[instr];
      pc += 1;
    }

    //------------------Input/Output Instructions----------------------
    else if (instr === "IN" && args.length === 1) {
      memory[pc] = INSTRUCTION_SET[instr];
      pc += 1;
      const value = parseNumber(args[0]);
      memory[pc] = value.toString(16).padStart(2, "0").toUpperCase();
      pc += 1;
    } else if (instr === "OUT" && args.length === 1) {
      memory[pc] = INSTRUCTION_SET[instr];
      pc += 1;
      const value = parseNumber(args[0]);
      memory[pc] = value.toString(16).padStart(2, "0").toUpperCase();
      pc += 1;
    }

    //------------------Machine Control Instructions----------------------
    else if (instr === "DI" && args.length === 0) {
      memory[pc] = INSTRUCTION_SET[instr];
      pc += 1;
    } else if (instr === "EI" && args.length === 0) {
      memory[pc] = INSTRUCTION_SET[instr];
      pc += 1;
    } else if (instr === "NOP" && args.length === 0) {
      memory[pc] = INSTRUCTION_SET[instr];
      pc += 1;
    } else if (instr === "RIM" && args.length === 0) {
      memory[pc] = INSTRUCTION_SET[instr];
      pc += 1;
    } else if (instr === "SIM" && args.length === 0) {
      memory[pc] = INSTRUCTION_SET[instr];
      pc += 1;
    } else if (instr === "HLT" && args.length === 0) {
      memory[pc] = INSTRUCTION_SET[instr];
      pc += 1;
    }

    //------------------Data setup Instructions----------------------
    else if (instr === "LXI" && args.length === 2) {
      const opcode = INSTRUCTION_SET["LXI"][args[0]];
      if (opcode) {
        memory[pc] = opcode;
        pc += 1;
        const value = parseNumber(args[1]);
        const addr = value.toString(16).padStart(4, "0").toUpperCase();
        memory[pc] = addr.substring(2);
        pc += 1;
        memory[pc] = addr.substring(0, 2);
        pc += 1;
      } else {
        console.log(`Unknown LXI register pair: ${args[0]}`);
      }
    }

    //------------------Restart Instructions----------------------
    else if (instr === "RST" && args.length === 1) {
      const opcode = INSTRUCTION_SET["RST"][args[0]];
      if (opcode) {
        memory[pc] = opcode;
        pc += 1;
      } else {
        console.log(`Unknown RST instruction: ${args[0]}`);
      }
    }

    //------------------Special Purpose Instructions----------------------
    else if (instr === "PCHL" && args.length === 0) {
      memory[pc] = INSTRUCTION_SET[instr];
      pc += 1;
    } else {
      console.log(`Unsupported or malformed line: ${line}`);
    }
  }

  console.log(memory,labels);
  return { memory, labels };
}

function parseNumber(value) {
  value = value.toUpperCase().trim();
  if (value.endsWith("H")) {
    return parseInt(value.slice(0, -1), 16);
  } else if (value.endsWith("D")) {
    // Optional, some use 15D for decimal
    return parseInt(value.slice(0, -1), 10);
  } else if (value.endsWith("B")) {
    return parseInt(value.slice(0, -1), 2);
  } else if (value.startsWith("0X")) {
    return parseInt(value, 16);
  } else {
    return parseInt(value, 10); // default: decimal
  }
}

