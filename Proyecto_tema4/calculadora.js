document.getElementById('calcular').addEventListener('click', () => {
    const ecuacion = document.getElementById('ecuacion').value.trim();
    const mostrarBalanceada = document.getElementById('mostrar-balanceada').checked;

    // Diccionario simple de ecuaciones ingresadas a sus formas balanceadas
    let balanceada = '';

    switch (ecuacion) {
        case 'H2 + O2 = H2O':
            balanceada = '2H₂ + O₂ = 2H₂O';
            break;
        case 'CH4 + O2 = CO2 + H2O':
            balanceada = 'CH₄ + 2O₂ = CO₂ + 2H₂O';
            break;
        case 'Na + Cl2 = NaCl':
            balanceada = '2Na + Cl₂ = 2NaCl';
            break;
        case 'Fe + O2 = Fe2O3':
            balanceada = '4Fe + 3O₂ = 2Fe₂O₃';
            break;
        case 'CaCO3 = CaO + CO2':
            balanceada = 'CaCO₃ = CaO + CO₂';
            break;
        default:
            balanceada = 'Ecuación no reconocida';
    }

    if (mostrarBalanceada) {
        document.getElementById('balanceada').value = balanceada;
    } else {
        document.getElementById('balanceada').value = '';
    }

    // Aquí podrías agregar la lógica para llenar la tabla con los compuestos de la ecuación balanceada
    // Por simplicidad, dejo la misma tabla de ejemplo para H2 + O2 = H2O

    const tabla = document.getElementById('tabla-compuestos');
    tabla.innerHTML = '';
    const volumenMolar = 22.4; // L/mol para gases ideales a CNPT

    // Ejemplo básico, podrías crear un objeto con compuestos por ecuación para mejor precisión
    const compuestosPorEcuacion = {
        '2H₂ + O₂ = 2H₂O': [
            { nombre: 'H₂', moles: 2, masaMolar: 2.016 },
            { nombre: 'O₂', moles: 1, masaMolar: 31.998 },
            { nombre: 'H₂O', moles: 2, masaMolar: 18.015 }
        ],
        'CH₄ + 2O₂ = CO₂ + 2H₂O': [
            { nombre: 'CH₄', moles: 1, masaMolar: 16.04 },
            { nombre: 'O₂', moles: 2, masaMolar: 31.998 },
            { nombre: 'CO₂', moles: 1, masaMolar: 44.01 },
            { nombre: 'H₂O', moles: 2, masaMolar: 18.015 }
        ],
        '2Na + Cl₂ = 2NaCl': [
            { nombre: 'Na', moles: 2, masaMolar: 22.99 },
            { nombre: 'Cl₂', moles: 1, masaMolar: 70.90 },
            { nombre: 'NaCl', moles: 2, masaMolar: 58.44 }
        ],
        '4Fe + 3O₂ = 2Fe₂O₃': [
            { nombre: 'Fe', moles: 4, masaMolar: 55.85 },
            { nombre: 'O₂', moles: 3, masaMolar: 31.998 },
            { nombre: 'Fe₂O₃', moles: 2, masaMolar: 159.69 }
        ],
        'CaCO₃ = CaO + CO₂': [
            { nombre: 'CaCO₃', moles: 1, masaMolar: 100.09 },
            { nombre: 'CaO', moles: 1, masaMolar: 56.08 },
            { nombre: 'CO₂', moles: 1, masaMolar: 44.01 }
        ],
    };

    const compuestos = compuestosPorEcuacion[balanceada] || [];

    compuestos.forEach(c => {
        const gramos = c.moles * c.masaMolar;
        // Solo gases considerados: H2, O2, CO2 (simple ejemplo)
        const esGas = ['H₂', 'O₂', 'CO₂', 'Cl₂', 'CH₄'].includes(c.nombre);
        const litros = esGas ? c.moles * volumenMolar : '-';

        const fila = `<tr>
            <td>${c.nombre}</td>
            <td>${c.moles.toFixed(6)}</td>
            <td>${gramos.toFixed(5)}</td>
            <td>${typeof litros === 'number' ? litros.toFixed(5) : litros}</td>
        </tr>`;

        tabla.innerHTML += fila;
    });
});

document.getElementById('borrar').addEventListener('click', () => {
    document.getElementById('ecuacion').value = '';
    document.getElementById('balanceada').value = '';
    document.getElementById('tabla-compuestos').innerHTML = '';
});
