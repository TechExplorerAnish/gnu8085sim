export const OPCODE_INFO = {
    // Data Transfer Instructions
    "00": { bytes: 1, description: "NOP - No Operation" },
    
    // MOV Instructions (Move data between registers)
    "40": { bytes: 1, description: "MOV B,B - Move register B to register B" },
    "41": { bytes: 1, description: "MOV B,C - Move register C to register B" },
    "42": { bytes: 1, description: "MOV B,D - Move register D to register B" },
    "43": { bytes: 1, description: "MOV B,E - Move register E to register B" },
    "44": { bytes: 1, description: "MOV B,H - Move register H to register B" },
    "45": { bytes: 1, description: "MOV B,L - Move register L to register B" },
    "46": { bytes: 1, description: "MOV B,M - Move memory (HL) to register B" },
    "47": { bytes: 1, description: "MOV B,A - Move register A to register B" },
    "48": { bytes: 1, description: "MOV C,B - Move register B to register C" },
    "49": { bytes: 1, description: "MOV C,C - Move register C to register C" },
    "4A": { bytes: 1, description: "MOV C,D - Move register D to register C" },
    "4B": { bytes: 1, description: "MOV C,E - Move register E to register C" },
    "4C": { bytes: 1, description: "MOV C,H - Move register H to register C" },
    "4D": { bytes: 1, description: "MOV C,L - Move register L to register C" },
    "4E": { bytes: 1, description: "MOV C,M - Move memory (HL) to register C" },
    "4F": { bytes: 1, description: "MOV C,A - Move register A to register C" },
    "50": { bytes: 1, description: "MOV D,B - Move register B to register D" },
    "51": { bytes: 1, description: "MOV D,C - Move register C to register D" },
    "52": { bytes: 1, description: "MOV D,D - Move register D to register D" },
    "53": { bytes: 1, description: "MOV D,E - Move register E to register D" },
    "54": { bytes: 1, description: "MOV D,H - Move register H to register D" },
    "55": { bytes: 1, description: "MOV D,L - Move register L to register D" },
    "56": { bytes: 1, description: "MOV D,M - Move memory (HL) to register D" },
    "57": { bytes: 1, description: "MOV D,A - Move register A to register D" },
    "58": { bytes: 1, description: "MOV E,B - Move register B to register E" },
    "59": { bytes: 1, description: "MOV E,C - Move register C to register E" },
    "5A": { bytes: 1, description: "MOV E,D - Move register D to register E" },
    "5B": { bytes: 1, description: "MOV E,E - Move register E to register E" },
    "5C": { bytes: 1, description: "MOV E,H - Move register H to register E" },
    "5D": { bytes: 1, description: "MOV E,L - Move register L to register E" },
    "5E": { bytes: 1, description: "MOV E,M - Move memory (HL) to register E" },
    "5F": { bytes: 1, description: "MOV E,A - Move register A to register E" },
    "60": { bytes: 1, description: "MOV H,B - Move register B to register H" },
    "61": { bytes: 1, description: "MOV H,C - Move register C to register H" },
    "62": { bytes: 1, description: "MOV H,D - Move register D to register H" },
    "63": { bytes: 1, description: "MOV H,E - Move register E to register H" },
    "64": { bytes: 1, description: "MOV H,H - Move register H to register H" },
    "65": { bytes: 1, description: "MOV H,L - Move register L to register H" },
    "66": { bytes: 1, description: "MOV H,M - Move memory (HL) to register H" },
    "67": { bytes: 1, description: "MOV H,A - Move register A to register H" },
    "68": { bytes: 1, description: "MOV L,B - Move register B to register L" },
    "69": { bytes: 1, description: "MOV L,C - Move register C to register L" },
    "6A": { bytes: 1, description: "MOV L,D - Move register D to register L" },
    "6B": { bytes: 1, description: "MOV L,E - Move register E to register L" },
    "6C": { bytes: 1, description: "MOV L,H - Move register H to register L" },
    "6D": { bytes: 1, description: "MOV L,L - Move register L to register L" },
    "6E": { bytes: 1, description: "MOV L,M - Move memory (HL) to register L" },
    "6F": { bytes: 1, description: "MOV L,A - Move register A to register L" },
    "70": { bytes: 1, description: "MOV M,B - Move register B to memory (HL)" },
    "71": { bytes: 1, description: "MOV M,C - Move register C to memory (HL)" },
    "72": { bytes: 1, description: "MOV M,D - Move register D to memory (HL)" },
    "73": { bytes: 1, description: "MOV M,E - Move register E to memory (HL)" },
    "74": { bytes: 1, description: "MOV M,H - Move register H to memory (HL)" },
    "75": { bytes: 1, description: "MOV M,L - Move register L to memory (HL)" },
    "77": { bytes: 1, description: "MOV M,A - Move register A to memory (HL)" },
    "78": { bytes: 1, description: "MOV A,B - Move register B to register A" },
    "79": { bytes: 1, description: "MOV A,C - Move register C to register A" },
    "7A": { bytes: 1, description: "MOV A,D - Move register D to register A" },
    "7B": { bytes: 1, description: "MOV A,E - Move register E to register A" },
    "7C": { bytes: 1, description: "MOV A,H - Move register H to register A" },
    "7D": { bytes: 1, description: "MOV A,L - Move register L to register A" },
    "7E": { bytes: 1, description: "MOV A,M - Move memory (HL) to register A" },
    "7F": { bytes: 1, description: "MOV A,A - Move register A to register A" },

    // MVI Instructions (Move Immediate)
    "3E": { bytes: 2, description: "MVI A,data - Move immediate data to register A" },
    "06": { bytes: 2, description: "MVI B,data - Move immediate data to register B" },
    "0E": { bytes: 2, description: "MVI C,data - Move immediate data to register C" },
    "16": { bytes: 2, description: "MVI D,data - Move immediate data to register D" },
    "1E": { bytes: 2, description: "MVI E,data - Move immediate data to register E" },
    "26": { bytes: 2, description: "MVI H,data - Move immediate data to register H" },
    "2E": { bytes: 2, description: "MVI L,data - Move immediate data to register L" },
    "36": { bytes: 2, description: "MVI M,data - Move immediate data to memory (HL)" },

    // Arithmetic Instructions
    "80": { bytes: 1, description: "ADD B - Add register B to accumulator" },
    "81": { bytes: 1, description: "ADD C - Add register C to accumulator" },
    "82": { bytes: 1, description: "ADD D - Add register D to accumulator" },
    "83": { bytes: 1, description: "ADD E - Add register E to accumulator" },
    "84": { bytes: 1, description: "ADD H - Add register H to accumulator" },
    "85": { bytes: 1, description: "ADD L - Add register L to accumulator" },
    "86": { bytes: 1, description: "ADD M - Add memory (HL) to accumulator" },
    "87": { bytes: 1, description: "ADD A - Add register A to accumulator" },

    // Add with Carry Instructions
    "88": { bytes: 1, description: "ADC B - Add register B with carry to accumulator" },
    "89": { bytes: 1, description: "ADC C - Add register C with carry to accumulator" },
    "8A": { bytes: 1, description: "ADC D - Add register D with carry to accumulator" },
    "8B": { bytes: 1, description: "ADC E - Add register E with carry to accumulator" },
    "8C": { bytes: 1, description: "ADC H - Add register H with carry to accumulator" },
    "8D": { bytes: 1, description: "ADC L - Add register L with carry to accumulator" },
    "8E": { bytes: 1, description: "ADC M - Add memory (HL) with carry to accumulator" },
    "8F": { bytes: 1, description: "ADC A - Add register A with carry to accumulator" },

    // Subtract Instructions
    "90": { bytes: 1, description: "SUB B - Subtract register B from accumulator" },
    "91": { bytes: 1, description: "SUB C - Subtract register C from accumulator" },
    "92": { bytes: 1, description: "SUB D - Subtract register D from accumulator" },
    "93": { bytes: 1, description: "SUB E - Subtract register E from accumulator" },
    "94": { bytes: 1, description: "SUB H - Subtract register H from accumulator" },
    "95": { bytes: 1, description: "SUB L - Subtract register L from accumulator" },
    "96": { bytes: 1, description: "SUB M - Subtract memory (HL) from accumulator" },
    "97": { bytes: 1, description: "SUB A - Subtract register A from accumulator" },

    // Subtract with Borrow Instructions
    "98": { bytes: 1, description: "SBB B - Subtract register B with borrow from accumulator" },
    "99": { bytes: 1, description: "SBB C - Subtract register C with borrow from accumulator" },
    "9A": { bytes: 1, description: "SBB D - Subtract register D with borrow from accumulator" },
    "9B": { bytes: 1, description: "SBB E - Subtract register E with borrow from accumulator" },
    "9C": { bytes: 1, description: "SBB H - Subtract register H with borrow from accumulator" },
    "9D": { bytes: 1, description: "SBB L - Subtract register L with borrow from accumulator" },
    "9E": { bytes: 1, description: "SBB M - Subtract memory (HL) with borrow from accumulator" },
    "9F": { bytes: 1, description: "SBB A - Subtract register A with borrow from accumulator" },

    // Logical AND Instructions
    "A0": { bytes: 1, description: "ANA B - Logical AND register B with accumulator" },
    "A1": { bytes: 1, description: "ANA C - Logical AND register C with accumulator" },
    "A2": { bytes: 1, description: "ANA D - Logical AND register D with accumulator" },
    "A3": { bytes: 1, description: "ANA E - Logical AND register E with accumulator" },
    "A4": { bytes: 1, description: "ANA H - Logical AND register H with accumulator" },
    "A5": { bytes: 1, description: "ANA L - Logical AND register L with accumulator" },
    "A6": { bytes: 1, description: "ANA M - Logical AND memory (HL) with accumulator" },
    "A7": { bytes: 1, description: "ANA A - Logical AND register A with accumulator" },

    // Exclusive OR Instructions
    "A8": { bytes: 1, description: "XRA B - Exclusive OR register B with accumulator" },
    "A9": { bytes: 1, description: "XRA C - Exclusive OR register C with accumulator" },
    "AA": { bytes: 1, description: "XRA D - Exclusive OR register D with accumulator" },
    "AB": { bytes: 1, description: "XRA E - Exclusive OR register E with accumulator" },
    "AC": { bytes: 1, description: "XRA H - Exclusive OR register H with accumulator" },
    "AD": { bytes: 1, description: "XRA L - Exclusive OR register L with accumulator" },
    "AE": { bytes: 1, description: "XRA M - Exclusive OR memory (HL) with accumulator" },
    "AF": { bytes: 1, description: "XRA A - Exclusive OR register A with accumulator" },

    // Logical OR Instructions
    "B0": { bytes: 1, description: "ORA B - Logical OR register B with accumulator" },
    "B1": { bytes: 1, description: "ORA C - Logical OR register C with accumulator" },
    "B2": { bytes: 1, description: "ORA D - Logical OR register D with accumulator" },
    "B3": { bytes: 1, description: "ORA E - Logical OR register E with accumulator" },
    "B4": { bytes: 1, description: "ORA H - Logical OR register H with accumulator" },
    "B5": { bytes: 1, description: "ORA L - Logical OR register L with accumulator" },
    "B6": { bytes: 1, description: "ORA M - Logical OR memory (HL) with accumulator" },
    "B7": { bytes: 1, description: "ORA A - Logical OR register A with accumulator" },

    // Compare Instructions
    "B8": { bytes: 1, description: "CMP B - Compare register B with accumulator" },
    "B9": { bytes: 1, description: "CMP C - Compare register C with accumulator" },
    "BA": { bytes: 1, description: "CMP D - Compare register D with accumulator" },
    "BB": { bytes: 1, description: "CMP E - Compare register E with accumulator" },
    "BC": { bytes: 1, description: "CMP H - Compare register H with accumulator" },
    "BD": { bytes: 1, description: "CMP L - Compare register L with accumulator" },
    "BE": { bytes: 1, description: "CMP M - Compare memory (HL) with accumulator" },
    "BF": { bytes: 1, description: "CMP A - Compare register A with accumulator" },

    // Stack Instructions
    "C1": { bytes: 1, description: "POP B - Pop register pair BC from stack" },
    "D1": { bytes: 1, description: "POP D - Pop register pair DE from stack" },
    "E1": { bytes: 1, description: "POP H - Pop register pair HL from stack" },
    "F1": { bytes: 1, description: "POP PSW - Pop accumulator and flags from stack" },
    "C5": { bytes: 1, description: "PUSH B - Push register pair BC onto stack" },
    "D5": { bytes: 1, description: "PUSH D - Push register pair DE onto stack" },
    "E5": { bytes: 1, description: "PUSH H - Push register pair HL onto stack" },
    "F5": { bytes: 1, description: "PUSH PSW - Push accumulator and flags onto stack" },

    // Jump and Branch Instructions
    "C0": { bytes: 1, description: "RNZ - Return if not zero" },
    "C2": { bytes: 3, description: "JNZ addr - Jump if not zero" },
    "C3": { bytes: 3, description: "JMP addr - Unconditional jump" },
    "C4": { bytes: 3, description: "CNZ addr - Call if not zero" },
    "C8": { bytes: 1, description: "RZ - Return if zero" },
    "C9": { bytes: 1, description: "RET - Return from subroutine" },
    "CA": { bytes: 3, description: "JZ addr - Jump if zero" },
    "CC": { bytes: 3, description: "CZ addr - Call if zero" },
    "CD": { bytes: 3, description: "CALL addr - Call subroutine" },
    "D0": { bytes: 1, description: "RNC - Return if no carry" },
    "D2": { bytes: 3, description: "JNC addr - Jump if no carry" },
    "D4": { bytes: 3, description: "CNC addr - Call if no carry" },
    "D8": { bytes: 1, description: "RC - Return if carry" },
    "DA": { bytes: 3, description: "JC addr - Jump if carry" },
    "DC": { bytes: 3, description: "CC addr - Call if carry" },
    "E0": { bytes: 1, description: "RPO - Return if parity odd" },
    "E2": { bytes: 3, description: "JPO addr - Jump if parity odd" },
    "E4": { bytes: 3, description: "CPO addr - Call if parity odd" },
    "E8": { bytes: 1, description: "RPE - Return if parity even" },
    "EA": { bytes: 3, description: "JPE addr - Jump if parity even" },
    "EC": { bytes: 3, description: "CPE addr - Call if parity even" },
    "F0": { bytes: 1, description: "RP - Return if positive" },
    "F2": { bytes: 3, description: "JP addr - Jump if positive" },
    "F4": { bytes: 3, description: "CP addr - Call if positive" },
    "F8": { bytes: 1, description: "RM - Return if minus" },
    "FA": { bytes: 3, description: "JM addr - Jump if minus" },
    "FC": { bytes: 3, description: "CM addr - Call if minus" },

    // Immediate Arithmetic Instructions
    "C6": { bytes: 2, description: "ADI data - Add immediate data to accumulator" },
    "CE": { bytes: 2, description: "ACI data - Add immediate data with carry to accumulator" },
    "D6": { bytes: 2, description: "SUI data - Subtract immediate data from accumulator" },
    "DE": { bytes: 2, description: "SBI data - Subtract immediate data with borrow from accumulator" },
    "E6": { bytes: 2, description: "ANI data - Logical AND immediate data with accumulator" },
    "EE": { bytes: 2, description: "XRI data - Exclusive OR immediate data with accumulator" },
    "F6": { bytes: 2, description: "ORI data - Logical OR immediate data with accumulator" },
    "FE": { bytes: 2, description: "CPI data - Compare immediate data with accumulator" },

    // RST Instructions (Restart)
    "C7": { bytes: 1, description: "RST 0 - Restart at address 0000H" },
    "CF": { bytes: 1, description: "RST 1 - Restart at address 0008H" },
    "D7": { bytes: 1, description: "RST 2 - Restart at address 0010H" },
    "DF": { bytes: 1, description: "RST 3 - Restart at address 0018H" },
    "E7": { bytes: 1, description: "RST 4 - Restart at address 0020H" },
    "EF": { bytes: 1, description: "RST 5 - Restart at address 0028H" },
    "F7": { bytes: 1, description: "RST 6 - Restart at address 0030H" },
    "FF": { bytes: 1, description: "RST 7 - Restart at address 0038H" },

    // I/O Instructions
    "D3": { bytes: 2, description: "OUT port - Output accumulator to port" },
    "DB": { bytes: 2, description: "IN port - Input from port to accumulator" },

    // Store and Load Instructions
    "02": { bytes: 1, description: "STAX B - Store accumulator at address in BC" },
    "12": { bytes: 1, description: "STAX D - Store accumulator at address in DE" },
    "0A": { bytes: 1, description: "LDAX B - Load accumulator from address in BC" },
    "1A": { bytes: 1, description: "LDAX D - Load accumulator from address in DE" },

    // Rotate Instructions
    "17": { bytes: 1, description: "RAL - Rotate accumulator left through carry" },
    "1F": { bytes: 1, description: "RAR - Rotate accumulator right through carry" },
    "07": { bytes: 1, description: "RLC - Rotate accumulator left" },
    "0F": { bytes: 1, description: "RRC - Rotate accumulator right" },

    // Special Instructions
    "27": { bytes: 1, description: "DAA - Decimal adjust accumulator" },
    "2F": { bytes: 1, description: "CMA - Complement accumulator" },
    "3F": { bytes: 1, description: "CMC - Complement carry flag" },
    "37": { bytes: 1, description: "STC - Set carry flag" },
    "76": { bytes: 1, description: "HLT - Halt processor" },
    "30": { bytes: 1, description: "SIM - Set interrupt mask" },
    "20": { bytes: 1, description: "RIM - Read interrupt mask" },

    // 16-bit Arithmetic Instructions
    "09": { bytes: 1, description: "DAD B - Add register pair BC to HL" },
    "19": { bytes: 1, description: "DAD D - Add register pair DE to HL" },
    "29": { bytes: 1, description: "DAD H - Add register pair HL to HL" },
    "39": { bytes: 1, description: "DAD SP - Add stack pointer to HL" },

    // Load Immediate 16-bit Instructions
    "01": { bytes: 3, description: "LXI B,data - Load immediate 16-bit data into BC" },
    "11": { bytes: 3, description: "LXI D,data - Load immediate 16-bit data into DE" },
    "21": { bytes: 3, description: "LXI H,data - Load immediate 16-bit data into HL" },
    "31": { bytes: 3, description: "LXI SP,data - Load immediate 16-bit data into SP" },

    // Increment/Decrement 16-bit Instructions
    "03": { bytes: 1, description: "INX B - Increment register pair BC" },
    "13": { bytes: 1, description: "INX D - Increment register pair DE" },
    "23": { bytes: 1, description: "INX H - Increment register pair HL" },
    "33": { bytes: 1, description: "INX SP - Increment stack pointer" },
    "0B": { bytes: 1, description: "DCX B - Decrement register pair BC" },
    "1B": { bytes: 1, description: "DCX D - Decrement register pair DE" },
    "2B": { bytes: 1, description: "DCX H - Decrement register pair HL" },
    "3B": { bytes: 1, description: "DCX SP - Decrement stack pointer" },

    // Increment/Decrement 8-bit Instructions
    "04": { bytes: 1, description: "INR B - Increment register B" },
    "0C": { bytes: 1, description: "INR C - Increment register C" },
    "14": { bytes: 1, description: "INR D - Increment register D" },
    "1C": { bytes: 1, description: "INR E - Increment register E" },
    "24": { bytes: 1, description: "INR H - Increment register H" },
    "2C": { bytes: 1, description: "INR L - Increment register L" },
    "34": { bytes: 1, description: "INR M - Increment memory (HL)" },
    "3C": { bytes: 1, description: "INR A - Increment register A" },
    "05": { bytes: 1, description: "DCR B - Decrement register B" },
    "0D": { bytes: 1, description: "DCR C - Decrement register C" },
    "15": { bytes: 1, description: "DCR D - Decrement register D" },
    "1D": { bytes: 1, description: "DCR E - Decrement register E" },
    "25": { bytes: 1, description: "DCR H - Decrement register H" },
    "2D": { bytes: 1, description: "DCR L - Decrement register L" },
    "35": { bytes: 1, description: "DCR M - Decrement memory (HL)" },
    "3D": { bytes: 1, description: "DCR A - Decrement register A" },

    // Memory Transfer Instructions
    "2A": { bytes: 3, description: "LHLD addr - Load HL direct from memory" },
    "22": { bytes: 3, description: "SHLD addr - Store HL direct to memory" },
    "32": { bytes: 3, description: "STA addr - Store accumulator direct to memory" },
    "3A": { bytes: 3, description: "LDA addr - Load accumulator direct from memory" },

    // Exchange Instructions
    "E3": { bytes: 1, description: "XTHL - Exchange top of stack with HL" },
    "EB": { bytes: 1, description: "XCHG - Exchange DE and HL register pairs" },

    // Program Control Instructions
    "E9": { bytes: 1, description: "PCHL - Jump to address in HL" },
    "F9": { bytes: 1, description: "SPHL - Load stack pointer from HL" },

    // Interrupt Control Instructions
    "F3": { bytes: 1, description: "DI - Disable interrupts" },
    "FB": { bytes: 1, description: "EI - Enable interrupts" }
};

// Helper function to get opcode information
export function getOpcodeInfo(opcode) {
    const info = OPCODE_INFO[opcode.toUpperCase()];
    if (info) {
        return info;
    } else {
        return { bytes: 0, description: "Unknown opcode" };
    }
}

export function getOpcodeBytes(opcode) {
    const info = getOpcodeInfo(opcode);
    if (!info) {
        alert(`Opcode ${opcode} not found.`);
        return 0; // Return 0 if the opcode is not found
    }
    return info.bytes;
}