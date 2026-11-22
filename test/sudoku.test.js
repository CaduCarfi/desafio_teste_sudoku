import test from 'node:test';
import assert from 'node:assert/strict';
import { SudokuBinario, validarTabuleiro } from '../src/sudoku.js';

const vazio = () => Array.from({ length: 6 }, () => Array(6).fill(null));
const solucao = [
  [0,0,1,0,1,1], [0,1,0,1,1,0], [1,0,1,1,0,0],
  [0,1,1,0,0,1], [1,1,0,0,1,0], [1,0,0,1,0,1]
];

test('CT01 - aceita tabuleiro 6x6 vazio e incompleto', () => {
  assert.equal(validarTabuleiro(vazio()), true);
  assert.equal(new SudokuBinario().concluido, false);
});
test('CT02 - aceita solucao balanceada, sem trincas e sem duplicatas', () => {
  assert.equal(validarTabuleiro(solucao), true);
  assert.equal(new SudokuBinario(solucao).concluido, true);
});
test('CT03 - rejeita dimensoes e valores invalidos', () => {
  for (const matriz of [[], null, Array(6).fill([]), Array(6).fill(Array(6).fill(2))])
    assert.equal(validarTabuleiro(matriz), false);
  assert.throws(() => new SudokuBinario([]), RangeError);
});
test('CT04 - rejeita tres valores iguais consecutivos na linha', () => {
  const t = vazio(); t[0] = [0,0,0,null,null,null];
  assert.equal(validarTabuleiro(t), false);
});
test('CT05 - rejeita tres valores iguais consecutivos na coluna', () => {
  const t = vazio(); [0,1,2].forEach(l => t[l][5] = 1);
  assert.equal(validarTabuleiro(t), false);
});
test('CT06 - rejeita quatro ocorrencias do mesmo valor em uma linha', () => {
  const t = vazio(); t[0] = [0,0,1,0,null,0];
  assert.equal(validarTabuleiro(t), false);
});
test('CT07 - rejeita quatro ocorrencias do mesmo valor em uma coluna', () => {
  const t = vazio(); [0,1,3,5].forEach(l => t[l][0] = 1);
  assert.equal(validarTabuleiro(t), false);
});
test('CT08 - rejeita linhas completas iguais', () => {
  const t = vazio(); t[0] = [...solucao[0]]; t[3] = [...solucao[0]];
  assert.equal(validarTabuleiro(t), false);
});
test('CT09 - rejeita colunas completas iguais', () => {
  const t = vazio(); solucao[0].forEach((v,l) => { t[l][0] = v; t[l][3] = v; });
  assert.equal(validarTabuleiro(t), false);
});
test('CT10 - preserva pistas fixas e copia a entrada', () => {
  const t = vazio(); t[0][0] = 1;
  const jogo = new SudokuBinario(t); t[0][0] = 0;
  assert.equal(jogo.tabuleiro[0][0], 1);
  assert.throws(() => jogo.jogar(0,0,0));
  assert.throws(() => jogo.jogar(0,0,null));
});
test('CT11 - jogada invalida nao altera o tabuleiro', () => {
  const jogo = new SudokuBinario();
  jogo.jogar(0,0,1); jogo.jogar(0,1,1);
  const antes = jogo.tabuleiro;
  assert.throws(() => jogo.jogar(0,2,1));
  assert.deepEqual(jogo.tabuleiro, antes);
});
test('CT12 - permite apagar celula editavel e protege a consulta', () => {
  const jogo = new SudokuBinario();
  jogo.jogar(0,0,1); const consulta = jogo.tabuleiro; consulta[0][0] = 0;
  assert.equal(jogo.tabuleiro[0][0], 1);
  jogo.jogar(0,0,null);
  assert.equal(jogo.tabuleiro[0][0], null);
});
test('CT13 - rejeita indices e simbolos invalidos', () => {
  const jogo = new SudokuBinario();
  for (const [l,c,v] of [[-1,0,0], [6,0,0], [0,6,1], [0.5,0,1], [0,0,2], [0,0,'1']])
    assert.throws(() => jogo.jogar(l,c,v), RangeError);
});
test('CT14 - reconhece a conclusao ao preencher a ultima casa', () => {
  const t = solucao.map(l => [...l]); t[5][5] = null;
  const jogo = new SudokuBinario(t);
  assert.equal(jogo.concluido, false);
  jogo.jogar(5,5,1);
  assert.equal(jogo.concluido, true);
});
