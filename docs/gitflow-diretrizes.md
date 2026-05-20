# 📋 GitFlow — Diretrizes do Projeto PrettyFlights Totem Check-in

**Versão:** 1.0  
**Projeto:** Módulo Totem de Check-in  
**Autor:** Equipe de Desenvolvimento PrettyFlights

---

## 1. Visão Geral

Este documento registra as diretrizes e o histórico de uso da estratégia **GitFlow** no desenvolvimento da versão 1.0.0 do Módulo Totem de Check-in da PrettyFlights.

O GitFlow é um modelo de branching que organiza o desenvolvimento em branches com papéis bem definidos, facilitando releases controladas, desenvolvimento paralelo de features e correções emergenciais.

---

## 2. Estrutura de Branches

### 2.1 Branches Permanentes

| Branch | Propósito |
|--------|-----------|
| `main` | Código estável em produção. Cada commit aqui representa uma versão entregue. |
| `develop` | Branch de integração. Reúne o trabalho de todas as features antes da release. |

### 2.2 Branches Temporárias

| Tipo | Padrão de nome | Originada de | Mergeada em |
|------|---------------|--------------|-------------|
| Feature | `feature/<nome>` | `develop` | `develop` |
| Release | `release/<versão>` | `develop` | `main` + `develop` |
| Hotfix | `hotfix/<nome>` | `main` | `main` + `develop` |

---

## 3. Atividades — Registro em Andamento

### ✅ 3.1 — Inicialização do Repositório

**Data:** Sprint 1  
**Branch:** `main`

O repositório foi inicializado com `git init`, estrutura de diretórios criada e primeiro commit registrado na `main` contendo:
- `README.md` com descrição do projeto
- `.gitignore` com exclusões padrão (node_modules, .env, logs)

```bash
git init
git add .
git commit -m "chore: inicializa projeto PrettyFlights Totem Check-in"
```

