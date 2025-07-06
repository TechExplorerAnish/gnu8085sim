export const opcodes = [
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

export const registers = ["a", "b", "c", "d", "e", "h", "l", "sp", "pc", "psw"];

export const createSyntaxStyles = (content) => {
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
          (match) => `<span style="color: #44d37c">${match}</span>`
        );
      });

      // Handle registers (case insensitive)
      registers.forEach((register) => {
        const regex = new RegExp(`\\b${register}\\b`, "gi");
        processedLine = processedLine.replace(
          regex,
          (match) => `<span style="color: #f2bf27">${match}</span>`
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
