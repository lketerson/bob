#!/usr/bin/env node
// Adaptador padrão de barra de status (status line) do bob_framework para
// Claude Code — proposto durante o bootstrap interativo
// (spec/16-bootstrap-interativo.md, Passo 7). Copiar para
// `.claude/statusline.js` (escopo local) ou `~/.claude/statusline.js`
// (escopo global) e referenciar em `settings.json`:
//
//   "statusLine": { "type": "command", "command": "node \"<caminho-para-este-arquivo>\"" }
//
// Ordem dos campos: modelo | consumo da janela de contexto | branch Git |
// limite de 5h (+ reset) | limite semanal (+ reset).
//
// Cada campo de "quantidade" (% de contexto, % de 5h, % semanal) é
// renderizado como uma barra de progresso.
//
// Fontes de dado:
//  - model, context_window, rate_limits: payload JSON enviado via stdin
//    pelo Claude Code
//  - branch Git: `git` (com --no-optional-locks) contra o cwd da sessão
//
// Usa Node (já embutido no runtime do Claude Code) em vez de bash+jq, para
// não depender de jq estar disponível no PATH.
//
// Este script é só um default — o usuário é livre para pedir menos campos,
// outra ordem, ou outras cores; nada aqui é uma prescrição fechada.

const { execFileSync } = require('child_process');
const fs = require('fs');

const RESET = '\x1b[0m';
const CYAN = '\x1b[2;36m';
const GREEN = '\x1b[2;32m';
const YELLOW = '\x1b[2;33m';
const MAGENTA = '\x1b[2;35m';
const BLUE = '\x1b[2;34m';
const DIM = '\x1b[2m';

const BAR_WIDTH = 10;
const FILLED = '█';
const EMPTY = '░';

function progressBar(pct, width = BAR_WIDTH) {
  const p = Math.max(0, Math.min(100, Math.round(Number(pct))));
  const filled = Math.round((p / 100) * width);
  return FILLED.repeat(filled) + EMPTY.repeat(width - filled);
}

function fmtTokens(n) {
  if (n === undefined || n === null) return '';
  return n >= 1000 ? `${Math.floor(n / 1000)}K` : `${n}`;
}

function fmtReset(epochSeconds, opts) {
  if (!epochSeconds) return '';
  try {
    const d = new Date(epochSeconds * 1000);
    return d.toLocaleTimeString('en-US', opts).replace(/^0/, '');
  } catch {
    return '';
  }
}

function readStdin() {
  try {
    return fs.readFileSync(0, 'utf8');
  } catch {
    return '';
  }
}

let input = {};
try {
  input = JSON.parse(readStdin() || '{}');
} catch {
  input = {};
}

const segments = [];

// --- 1. Modelo ---
const model = input?.model?.display_name;
if (model) segments.push(`${CYAN}${model}${RESET}`);

// --- 2. Consumo da janela de contexto (quantidade -> barra de progresso) ---
const cw = input?.context_window || {};
if (
  cw.used_percentage !== undefined &&
  cw.total_input_tokens !== undefined &&
  cw.context_window_size !== undefined
) {
  const pct = Math.round(cw.used_percentage);
  const tokens = `${fmtTokens(cw.total_input_tokens)}/${fmtTokens(cw.context_window_size)}`;
  segments.push(`${GREEN}[${progressBar(cw.used_percentage)}] ${pct}% ctx (${tokens})${RESET}`);
}

// --- 3. Branch Git ---
const cwd = input?.cwd || input?.workspace?.current_dir;
if (cwd) {
  try {
    execFileSync('git', ['--no-optional-locks', '-C', cwd, 'rev-parse', '--is-inside-work-tree'], {
      stdio: 'ignore',
    });
    let branch = execFileSync('git', ['--no-optional-locks', '-C', cwd, 'branch', '--show-current'], {
      encoding: 'utf8',
    }).trim();
    if (!branch) {
      branch = execFileSync('git', ['--no-optional-locks', '-C', cwd, 'rev-parse', '--short', 'HEAD'], {
        encoding: 'utf8',
      }).trim();
    }
    if (branch) segments.push(`${YELLOW}${branch}${RESET}`);
  } catch {
    // não é um repositório Git, ou git indisponível
  }
}

// --- 4 e 5. Limite de 5h + reset (quantidade -> barra de progresso) ---
const rl = input?.rate_limits || {};
const five = rl.five_hour || {};
if (five.used_percentage !== undefined) {
  const pct = Math.round(five.used_percentage);
  let s = `${progressBar(five.used_percentage)}] ${pct}% 5h`;
  s = `[${s}`;
  const r = fmtReset(five.resets_at, { hour: '2-digit', minute: '2-digit', hour12: false });
  if (r) s += ` (resets ${r})`;
  segments.push(`${MAGENTA}${s}${RESET}`);
}

// --- 6 e 7. Limite semanal + reset (quantidade -> barra de progresso) ---
const week = rl.seven_day || {};
if (week.used_percentage !== undefined) {
  const pct = Math.round(week.used_percentage);
  let s = `[${progressBar(week.used_percentage)}] ${pct}% 7d`;
  const r = fmtReset(week.resets_at, { weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false });
  if (r) s += ` (resets ${r})`;
  segments.push(`${BLUE}${s}${RESET}`);
}

process.stdout.write(segments.join(`${DIM} | ${RESET}`));
