# desafio_teste_sudoku — Sudoku Binário 6×6

**Autor:** Carlos Eduardo Carfi Silva
**RA:** 24000663-2 — UniCesumar, Engenharia de Software (4º período)

## O que é o Sudoku Binário

Diferente do sudoku tradicional, aqui o tabuleiro é 6×6 e cada casa só pode conter `0` ou `1` (ou estar vazia). As regras que o motor valida:

1. Toda linha e toda coluna, quando completas, têm exatamente três `0`s e três `1`s.
2. Não pode haver três valores iguais em sequência, nem na horizontal nem na vertical.
3. Duas linhas completas não podem ser idênticas entre si; o mesmo vale para colunas.

Uma casa vazia é representada por `null`, e um tabuleiro parcialmente preenchido é considerado válido enquanto nenhuma das regras acima for violada pelo que já está preenchido (linhas/colunas incompletas não entram na checagem de duplicidade).

## Decisões de implementação

- O motor **valida**, não resolve nem gera puzzles — o desafio pede testes sobre as regras do jogo, não um solver.
- As "pistas" passadas no construtor ficam marcadas como fixas e não podem ser sobrescritas; qualquer tentativa de editar essas casas lança erro.
- Toda leitura do tabuleiro (`.tabuleiro`) devolve uma cópia, para impedir que alguém mude o estado interno sem passar pelo método `jogar`.
- Uma jogada que violaria alguma regra é rejeitada e **não altera nada** — o tabuleiro fica exatamente como estava antes da tentativa.

## Estrutura do repositório

```
src/sudoku.js        -> SudokuBinario (classe) e validarTabuleiro (função)
test/sudoku.test.js  -> 14 casos de teste com node:test
evidencias/testes.log -> saída da última execução dos testes
.github/workflows/    -> CI que roda os testes a cada push/PR
```

## Rodando

Precisa apenas de Node.js 22+ (sem dependências de terceiros):

```bash
npm test
npm run coverage
```

## Exemplo rápido

```javascript
import { SudokuBinario } from './src/sudoku.js';

const puzzle = new SudokuBinario();
puzzle.jogar(0, 0, 1);
puzzle.jogar(0, 1, 1);
puzzle.jogar(0, 2, 1); // lança erro: três 1s em sequência na linha 0
```

## O que cada caso de teste cobre

| Teste | Verificação |
|---|---|
| CT01 | Tabuleiro vazio/incompleto é aceito como válido |
| CT02 | Uma solução completa e balanceada (sem trincas, sem duplicatas) é aceita |
| CT03 | Dimensões erradas ou valores fora de {0,1,null} são rejeitados |
| CT04 | Três valores iguais seguidos **na linha** são rejeitados |
| CT05 | Três valores iguais seguidos **na coluna** são rejeitados |
| CT06 | Mais de três ocorrências do mesmo valor numa linha é rejeitado |
| CT07 | Mais de três ocorrências do mesmo valor numa coluna é rejeitado |
| CT08 | Duas linhas completas idênticas são rejeitadas |
| CT09 | Duas colunas completas idênticas são rejeitadas |
| CT10 | Pistas fixas do construtor são preservadas e protegidas de edição |
| CT11 | Uma jogada inválida não deixa nenhum rastro no tabuleiro |
| CT12 | É possível apagar (voltar a `null`) uma casa editável, e a leitura não afeta o estado |
| CT13 | Índices fora do tabuleiro ou valores que não sejam 0/1/null são rejeitados |
| CT14 | O jogo reconhece conclusão ao preencher a última casa válida |

## Evidência de execução

Última rodada registrada: **14 testes, 14 aprovados, 0 falhas** (Node.js 22.19.0). Log completo em [`evidencias/testes.log`](evidencias/testes.log). Cobertura de `src/sudoku.js`: 100% em linhas, ramificações e funções.

## Observação sobre a entrega

Entrega individual. Repositório nomeado `desafio_teste_sudoku`, conforme padrão exigido no edital da disciplina.

## Colaborador(es)

- Carlos Eduardo Carfi Silva — RA 24000663-2
