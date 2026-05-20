# Changelog — PrettyFlights Totem Check-in

## [1.0.0] — Release Candidata

### Adicionado
- Leitura e validação de QR Code do e-ticket
- Tela de boas-vindas com instruções ao passageiro
- Serviço orquestrador do fluxo de check-in completo
- Timeout de 30s na captura do QR Code

### Infraestrutura
- Estrutura de projeto Node.js
- Configuração de .gitignore

## [1.0.1] — Hotfix

### Corrigido
- **CRÍTICO:** Validação de código de reserva rejeitava letras minúsculas,
  impedindo check-in de ~30% dos passageiros. Correção: normalização para
  maiúsculas antes da validação com regex.
