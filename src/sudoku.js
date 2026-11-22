export function validarTabuleiro(tabuleiro) {
  if (!Array.isArray(tabuleiro) || tabuleiro.length !== 6 ||
      tabuleiro.some(l => !Array.isArray(l) || l.length !== 6 ||
        l.some(v => v !== null && v !== 0 && v !== 1))) return false;

  const colunas = Array.from({ length: 6 }, (_, c) => tabuleiro.map(l => l[c]));
  for (const grupo of [tabuleiro, colunas]) {
    const completas = new Set();
    for (const linha of grupo) {
      if (linha.filter(v => v === 0).length > 3 || linha.filter(v => v === 1).length > 3)
        return false;
      for (let i = 0; i < 4; i++)
        if (linha[i] !== null && linha[i] === linha[i + 1] && linha[i] === linha[i + 2])
          return false;
      if (!linha.includes(null)) {
        const chave = linha.join('');
        if (completas.has(chave)) return false;
        completas.add(chave);
      }
    }
  }
  return true;
}

export class SudokuBinario {
  #tabuleiro; #fixas;
  constructor(inicial = Array.from({ length: 6 }, () => Array(6).fill(null))) {
    if (!validarTabuleiro(inicial)) throw new RangeError('Tabuleiro invalido');
    this.#tabuleiro = inicial.map(l => [...l]);
    this.#fixas = inicial.map(l => l.map(v => v !== null));
  }

  jogar(l, c, valor) {
    if (![l, c].every(n => Number.isInteger(n) && n >= 0 && n < 6))
      throw new RangeError('Coordenada invalida');
    if (this.#fixas[l][c]) throw new Error('Pista fixa');
    if (valor !== null && valor !== 0 && valor !== 1) throw new RangeError('Use 0, 1 ou null');
    const candidato = this.tabuleiro;
    candidato[l][c] = valor;
    if (!validarTabuleiro(candidato)) throw new Error('Jogada viola as regras');
    this.#tabuleiro = candidato;
  }

  get tabuleiro() { return this.#tabuleiro.map(l => [...l]); }
  get concluido() { return this.#tabuleiro.every(l => !l.includes(null)); }
}
