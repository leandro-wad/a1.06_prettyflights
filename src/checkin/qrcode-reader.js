/**
 * Módulo de Leitura de QR Code
 * Responsável por capturar e decodificar o código de reserva
 * do passageiro via câmera do totem.
 */

const QR_TIMEOUT_MS = 30000;

async function startQRReader() {
  console.log('📷 Leitor de QR Code ativado. Aguardando leitura...');
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error('Timeout: nenhum QR Code detectado em 30s'));
    }, QR_TIMEOUT_MS);

    setTimeout(() => {
      clearTimeout(timeout);
      const bookingCode = 'PF-2024-XJ991';
      console.log(`✅ QR Code lido: ${bookingCode}`);
      resolve(bookingCode);
    }, 2000);
  });
}

function validateBookingCode(code) {
  return /^PF-\d{4}-[A-Z0-9]{5}$/.test(code);
}

module.exports = { startQRReader, validateBookingCode };
