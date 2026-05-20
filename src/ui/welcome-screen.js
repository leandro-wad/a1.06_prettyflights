/**
 * Tela de Boas-vindas do Totem
 */

function renderWelcomeScreen() {
  return {
    title: '✈️ Bem-vindo ao Check-in PrettyFlights',
    instructions: [
      'Aproxime o QR Code do seu e-ticket',
      'ou toque em "Buscar Reserva" para inserir seu CPF',
    ],
    timeout: 60,
  };
}

module.exports = { renderWelcomeScreen };
