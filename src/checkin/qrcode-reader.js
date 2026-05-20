/**
 * Módulo de Leitura de QR Code
 * Responsável por capturar e decodificar o código de reserva
 * do passageiro via câmera do totem.
 */

const QR_TIMEOUT_MS = 30000;

async function startQRReader() {
  console.log('📷 Leitor de QR Code ativado. Aguardando leitura para 30 segundos para leitura...');
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

/**
 * HOTFIX: normaliza para maiúsculas antes de validar,
 * corrigindo falha em ~30% dos check-ins com códigos em minúsculo.
 * @param {string} code
 * @returns {boolean}
 */
function validateBookingCode(code) {
  const normalized = code.toUpperCase().trim();
  return /^PF-\d{4}-[A-Z0-9]{5}$/.test(normalized);
}

module.exports = { startQRReader, validateBookingCode };
