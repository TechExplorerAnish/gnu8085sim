function pass1(code, startAddress = 0x0000) {
    const labels = {};
    let pc = startAddress;
    const lines = code.trim().split('\n');

    // Define instruction sets by byte size
    const ONE_BYTE = new Set([
        'NOP', 'HLT', 'RET', 'DAA', 'CMA', 'CMC', 'STC',
        'XCHG', 'SPHL', 'XTHL', 'EI', 'DI', 'RLC', 'RRC',
        'RAL', 'RAR', 'SIM', 'RIM', 'PCHL',
        'ADD', 'ADC', 'SUB', 'SBB', 'ANA', 'ORA', 'XRA', 'CMP',
        'INR', 'DCR', 'DAD', 'INX', 'DCX', 'MOV',
        'POP', 'PUSH', 'LDAX', 'STAX',
        'RNZ', 'RZ', 'RNC', 'RC', 'RPO', 'RPE', 'RP', 'RM'
    ]);

    const TWO_BYTE = new Set([
        'MVI', 'ADI', 'ACI', 'SUI', 'SBI',
        'ANI', 'ORI', 'XRI', 'CPI', 'IN', 'OUT'
    ]);

    const THREE_BYTE = new Set([
        'LXI', 'LDA', 'STA', 'LHLD', 'SHLD',
        'JMP', 'JC', 'JNC', 'JZ', 'JNZ', 'JP', 'JM', 'JPE', 'JPO',
        'CALL', 'CC', 'CNC', 'CZ', 'CNZ', 'CP', 'CM', 'CPE', 'CPO'
    ]);

    for (let line of lines) {
        // Remove comments
        line = line.split(';')[0].trim().toUpperCase();
        if (!line) {
            continue;
        }

        // Handle labels
        if (line.includes(':')) {
            const colonIndex = line.indexOf(':');
            const label = line.substring(0, colonIndex).trim();
            const rest = line.substring(colonIndex + 1).trim();
            
            labels[label] = pc;
            line = rest;
        }

        if (!line) {
            continue; // line was just a label
        }

        const parts = line.replace(/,/g, ' ').split(/\s+/).filter(part => part);
        if (parts.length === 0) {
            continue;
        }

        const instr = parts[0];
        const args = parts.length > 1 ? parts.slice(1) : [];

        // Advance PC based on instruction size
        if (ONE_BYTE.has(instr)) {
            pc += 1;
        } else if (TWO_BYTE.has(instr)) {
            pc += 2;
        } else if (THREE_BYTE.has(instr)) {
            pc += 3;
        } else if (instr === 'MVI' && args.length === 2) {
            pc += 2;
        } else if (instr === 'ORG' && args.length > 0) {
            try {
                pc = parseInt(args[0].replace('H', ''), 16);
            } catch (error) {
                console.log(`[ERROR] Invalid ORG argument: ${args[0]}`);
            }
        } else if (instr === 'END') {
            break;
        } else if (instr.startsWith('RST')) { // e.g., RST 0–7
            pc += 1;
        } else {
            console.log(`[WARN] Unrecognized instruction in pass1: ${instr}`);
            pc += 1; // fallback
        }
    }

    return labels;
}

export { pass1 };