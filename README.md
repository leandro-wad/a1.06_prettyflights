# 📋 GitFlow — Diretrizes do Projeto PrettyFlights Totem Check-in

**Versão do documento:** 3.0  
**Projeto:** Módulo Totem de Check-in  
**Versão do software:** 1.0.1  

---

## 1. Visão Geral

Este documento registra as diretrizes e o histórico completo de uso da estratégia **GitFlow** no desenvolvimento da versão 1.0.0 do Módulo Totem de Check-in da PrettyFlights.

O **GitFlow** é um modelo de branching criado por Vincent Driessen que organiza o desenvolvimento em branches com papéis bem definidos, facilitando:
- Releases controladas e rastreáveis
- Desenvolvimento paralelo de múltiplas features
- Correções emergenciais sem interromper o desenvolvimento
- Histórico de versões claro e auditável

---

## 2. Estrutura de Branches

### 2.1 Branches Permanentes

| Branch | Propósito |
|--------|-----------|
| `main` | Código estável em produção. Cada commit representa uma versão entregue e tagueada. |
| `develop` | Branch de integração contínua. Reúne features prontas antes da próxima release. |

### 2.2 Branches Temporárias

| Tipo | Padrão de nome | Originada de | Mergeada em |
|------|---------------|--------------|-------------|
| Feature | `feature/<nome-da-feature>` | `develop` | `develop` |
| Release | `release/<versão-semântica>` | `develop` | `main` + `develop` |
| Hotfix | `hotfix/<descrição-do-bug>` | `main` | `main` + `develop` |

> **Convenção:** use kebab-case nos nomes. Exemplos: `feature/qrcode-checkin`, `release/1.0.0`, `hotfix/qrcode-case-sensitive`.

---

## 3. Atividades — Registro Completo

### ✅ 3.1 — Inicialização do Repositório

**Branch:** `main`

O repositório foi inicializado com `git init`, estrutura de diretórios criada (`src/`, `docs/`, `config/`, `tests/`) e primeiro commit registrado na `main` contendo o `README.md` e `.gitignore`.

```bash
git init
git add .
git commit -m "chore: inicializa projeto PrettyFlights Totem Check-in"
```

**Por que commitar direto na main?**  
O commit inicial (root commit) precisa existir na `main` pois é ele que serve de base para a criação da branch `develop`.

---

### ✅ 3.2 — Criação da Estrutura de Branches GitFlow

**Branches criadas:** `develop`, `feature/qrcode-checkin`, `release/1.0.0`, `hotfix/qrcode-case-sensitive`

A branch `develop` foi criada a partir da `main` e será o ponto de integração de todo o desenvolvimento:

```bash
git checkout -b develop main
```

As demais branches temporárias foram criadas conforme o fluxo de trabalho avançou:

```bash
# Feature a partir da develop
git checkout -b feature/qrcode-checkin develop

# Release a partir da develop (quando o escopo da v1.0.0 estava completo)
git checkout -b release/1.0.0 develop

# Hotfix a partir da main (bug emergencial em produção)
git checkout -b hotfix/qrcode-case-sensitive main
```

---

### ✅ 3.3 — Desenvolvimento da Feature: `feature/qrcode-checkin`

**Branch:** `feature/qrcode-checkin` → originada de `develop`

Implementação completa do fluxo de check-in via QR Code, incluindo 3 commits:

| Commit | Descrição |
|--------|-----------|
| `8851a7c` | Módulo de leitura de QR Code + tela de boas-vindas |
| `453f6b6` | Serviço orquestrador do fluxo de check-in |

**Arquivos criados:**
- `src/checkin/qrcode-reader.js` — leitura e validação do código de reserva
- `src/ui/welcome-screen.js` — tela inicial do totem
- `src/services/checkin-service.js` — orquestração do fluxo completo

```bash
git checkout -b feature/qrcode-checkin develop
# ... desenvolvimento dos arquivos ...
git add .
git commit -m "feat: implementa módulo QR Code e tela de boas-vindas"
git commit -m "feat: implementa serviço orquestrador do fluxo de check-in"
```

---

### ✅ 3.4 — Integração da Feature na Develop

**Merge:** `feature/qrcode-checkin` → `develop`

O merge foi realizado com `--no-ff` (no fast-forward) para **preservar o histórico** da branch de feature, garantindo que o grafo do repositório mostre claramente quando e quais commits faziam parte de uma funcionalidade específica.

```bash
git checkout develop
git merge --no-ff feature/qrcode-checkin -m "Merge branch 'feature/qrcode-checkin' into develop"
```

> **Por que `--no-ff`?** Sem essa flag, o Git faria um fast-forward (moveria o ponteiro da develop sem criar um commit de merge), perdendo a rastreabilidade de que aqueles commits eram parte de uma feature isolada.

---

### ✅ 3.5 — Criação e Gestão da Release 1.0.0

**Branch:** `release/1.0.0` → originada de `develop`

A branch de release é criada quando a develop contém todas as features planejadas para a versão. Neste momento, **nenhuma nova feature** deve entrar — apenas bug fixes, bump de versão e ajustes de documentação.

```bash
git checkout -b release/1.0.0 develop

# Bump de versão (1.0.0) e criação do CHANGELOG
git commit -m "chore: bump version para 1.0.0 e adiciona CHANGELOG"

# Merge na main (produção)
git checkout main
git merge --no-ff release/1.0.0
git tag -a v1.0.0 -m "Release 1.0.0 — Totem Check-in PrettyFlights"

# Merge de volta na develop (propagar correções feitas na release)
git checkout develop
git merge --no-ff release/1.0.0
```

**Por que mergear a release de volta na develop?**  
Qualquer correção feita na branch de release (bug fix de último minuto, ajuste de versão) precisa retornar para a `develop`, garantindo que a próxima iteração parta do estado mais atualizado.

---

### ✅ 3.6 — Hotfix Emergencial: `hotfix/qrcode-case-sensitive`

**Branch:** `hotfix/qrcode-case-sensitive` → originada de `main`

**Cenário:** após o deploy da v1.0.0, foi identificado que a função `validateBookingCode()` rejeitava códigos de reserva com letras minúsculas (ex: `pf-2024-xj991`), causando falha no check-in de aproximadamente **30% dos passageiros**.

Por se tratar de um **bug crítico em produção**, o hotfix não pode esperar o ciclo normal de feature → develop → release. A correção é feita diretamente a partir da `main`.

```bash
git checkout -b hotfix/qrcode-case-sensitive main
# Correção: normalizar para maiúsculas antes de validar
git commit -m "hotfix: normaliza código para maiúsculas antes de validar QR Code"
```

**A correção aplicada:**
```js
// ANTES (com bug)
function validateBookingCode(code) {
  return /^PF-\d{4}-[A-Z0-9]{5}$/.test(code);
}

// DEPOIS (corrigido)
function validateBookingCode(code) {
  const normalized = code.toUpperCase().trim();
  return /^PF-\d{4}-[A-Z0-9]{5}$/.test(normalized);
}
```

---

### ✅ 3.7 — Integração do Hotfix na Main e na Develop

O hotfix, assim como a release, **precisa ser mergeado em AMBAS** as branches permanentes.

```bash
# 1. Integrar na main e criar tag de patch
git checkout main
git merge --no-ff hotfix/qrcode-case-sensitive
git tag -a v1.0.1 -m "Hotfix 1.0.1 — Correção de validação case-sensitive no QR Code"

# 2. Propagar correção para a develop
git checkout develop
git merge --no-ff hotfix/qrcode-case-sensitive
```

**Por que mergear o hotfix também na develop?**  
Sem isso, na próxima release a `develop` ainda teria o código com o bug, e a correção seria perdida.

---

## 4. Fluxo Visual GitFlow — PrettyFlights v1.0.0

```
main      ●────────────────────────●─────────●──────────●
          │ (v1.0.0 init)          │  v1.0.0 │          │ v1.0.1
          │                        │  tag ✓  │          │ tag ✓
develop   ●──●──────────────────●──●─────────●──────────●
             │                  ↑  ↑  release │          ↑
             │    feature        │  └─ back   │ hotfix   │
feature      └──●──●──●─────────┘             └──●───────┘
                                  release         hotfix
release              └──────────●─┘
hotfix                                  └──────●─┘
```

---

## 5. Regras de Ouro do GitFlow (PrettyFlights)

1. **Nunca commitar diretamente na `main`** — exceto o commit inicial.
2. **Nunca mergear feature diretamente na `main`** — sempre passar pela `develop`.
3. **Sempre usar `--no-ff`** nos merges de feature, release e hotfix para preservar o histórico.
4. **Sempre taguear** a `main` após cada release e hotfix.
5. **Sempre propagar** release e hotfix de volta para a `develop`.
6. **Mensagens de commit** seguem o padrão [Conventional Commits](https://www.conventionalcommits.org/): `type: descrição`.

| Prefixo | Quando usar |
|---------|-------------|
| `feat:` | Nova funcionalidade |
| `fix:` | Correção de bug |
| `hotfix:` | Correção emergencial em produção |
| `chore:` | Tarefas de manutenção, build, config |
| `docs:` | Atualização de documentação |
| `refactor:` | Refatoração sem mudança de comportamento |

---

*Documento mantido pela Equipe de Desenvolvimento PrettyFlights.*  
*Última atualização: Sprint 1 — Versão 1.0.1*
