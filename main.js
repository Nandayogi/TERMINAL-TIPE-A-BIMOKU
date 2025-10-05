function updateJamDigital() {
  const now = new Date();

  function formatJam(zone) {
    return new Intl.DateTimeFormat('id-ID', {
      timeZone: zone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).format(now);
  }

  function formatTanggal(zone) {
    return new Intl.DateTimeFormat('id-ID', {
      timeZone: zone,
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(now);
  }

  document.getElementById('tanggal-indonesia').textContent = `Tanggal Indonesia: ${formatTanggal('Asia/Makassar')}`;
  document.getElementById('jam-indonesia').textContent = `Kupang (WITA): ${formatJam('Asia/Makassar')}`;
  document.getElementById('jam-dili').textContent = `Dili (GMT+9): ${formatJam('Asia/Dili')}`;
}

function getJamMenitIndonesia() {
  const now = new Date();
  const waktuWITA = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Makassar',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(now);

  const [jam, menit] = waktuWITA.split(':').map(Number);
  return { jam, menit };
}

function updateStatusKeberangkatan() {
  const tbody = document.querySelector('.tabel-keberangkatan tbody');
  const rows = Array.from(tbody.querySelectorAll('tr'));
  const { jam: jamNow, menit: menitNow } = getJamMenitIndonesia();

  rows.forEach(row => {
    const waktuText = row.cells[0].textContent.trim(); // contoh: "15.40"
    const [jam, menit] = waktuText.split('.').map(Number);

    const waktuBerangkat = jam * 60 + menit;
    const waktuSekarang = jamNow * 60 + menitNow;

    if (waktuSekarang >= waktuBerangkat) {
      row.classList.add('lewat');
      row.querySelector('.status').textContent = 'BERANGKAT';
    } else {
      row.classList.remove('lewat');
      row.querySelector('.status').textContent = 'MENUNGGU';
    }
  });
}

setInterval(updateJamDigital, 1000);
setInterval(updateStatusKeberangkatan, 60000);
updateJamDigital();
updateStatusKeberangkatan();

