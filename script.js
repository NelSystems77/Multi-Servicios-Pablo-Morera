// Listas de datos
const listGeneral = [
    "Hospital Calderón Guardia", "Hospital México", "Hospital San Juan de Dios",
    "Ebais de Moravia", "Clínica de Coronado", "Clínica Jiménez Núñez", "Clínica Moreno Cañas"
];
const listCitas = [
    "Clínica de Coronado", "Ebais de Zetillal", "Ebais de Moravia", "Clínica Jiménez Núñez"
];

// 1. Mostrar campos según servicio
function toggleServiceFields() {
    document.querySelectorAll('.service-section').forEach(el => el.classList.add('hidden'));
    const type = document.getElementById('serviceType').value;
    const section = document.getElementById('fields-' + type);
    if(section) {
        section.classList.remove('hidden');
        if(type === 'tramites') updateHospitalList();
    }
}

// 2. Actualizar lista de hospitales dinámicamente
function updateHospitalList() {
    const subtype = document.getElementById('tramiteSubtype').value;
    const select = document.getElementById('hospitalSelect');
    select.innerHTML = ""; 
    
    const options = (subtype === "Sacar citas") ? listCitas : listGeneral;

    options.forEach(opt => {
        const el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
    });
}

// 3. Generar Link de WhatsApp (Llamado desde index.html tras guardar en BD)
window.generateWhatsAppLink = function() {
    const phone = "50688789344";
    const name = document.getElementById('clientName').value;
    const serviceType = document.getElementById('serviceType').value;
    const fecha = document.getElementById('reservaFecha').value;
    const hora = document.getElementById('reservaHora').value;
    
    let details = "";
    let serviceName = "";

    // Construcción del detalle
    if (serviceType === 'tramites') {
        serviceName = "Trámites Médicos";
        details = `Trámite: ${document.getElementById('tramiteSubtype').value}\nLugar: ${document.getElementById('hospitalSelect').value}`;
    } else if (serviceType === 'mensajeria') {
        serviceName = "Mensajería";
        details = `Qué: ${document.getElementById('msgDesc').value}\nRetiro: ${document.getElementById('msgRetiro').value}\nEntrega: ${document.getElementById('msgEntrega').value}`;
    } else if (serviceType === 'fila') {
        serviceName = "Hacer Fila";
        details = `Lugar: ${document.getElementById('filaLugar').value}\nFecha Evento: ${document.getElementById('filaFecha').value}`;
    } else if (serviceType === 'dj') {
        serviceName = "DJ y Animación";
        details = `Dirección: ${document.getElementById('djDireccion').value}\nHoras: ${document.getElementById('djHoras').value}`;
    } else {
        serviceName = "Otros Servicios";
        details = document.getElementById('otrosDesc').value;
    }

    // Formateo del mensaje final
    const text = `Hola *Pablo Morera*, soy *${name}*.\n\nHe reservado en la web para:\n🚀 *${serviceName}*\n📅 Fecha: ${fecha}\n⏰ Hora: ${hora}\n\n📝 *Detalles:*\n${details}\n\nQuedo atento para enviar el comprobante SINPE del 50%.`;

    // Redirección
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
    
    // Opcional: Recargar página para limpiar
    setTimeout(() => window.location.reload(), 2000);

};
