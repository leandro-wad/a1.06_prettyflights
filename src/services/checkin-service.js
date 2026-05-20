/**
 * Serviço de Check-in
 * Orquestra o fluxo completo: leitura do QR → busca de reserva → emissão do cartão de embarque
 */
const { startQRReader, validateBookingCode } = require('../checkin/qrcode-reader');

async function processCheckin() {
  console.log('🚀 Iniciando processo de check-in...');
  try {
    const bookingCode = await startQRReader();
    if (!validateBookingCode(bookingCode)) {
      throw new Error(`Código inválido: ${bookingCode}`);
    }
    console.log(`✈️ Check-in autorizado para reserva: ${bookingCode}`);
    return { success: true, bookingCode, boardingPass: `BP-${bookingCode}` };
  } catch (err) {
    console.error('❌ Falha no check-in:', err.message);
    return { success: false, error: err.message };
  }
}

module.exports = { processCheckin };
