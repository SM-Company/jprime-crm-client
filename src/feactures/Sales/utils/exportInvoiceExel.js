import React from 'react';
import { utils, writeFile } from 'xlsx';


const exportInvoiceExel = ({ heads, data }) => {
  const getNestedValue = (item, head) => {
    const keys = head.key.split(".");
    let value = item;

    for (const key of keys) {
      if (value && typeof value === "object") {
        value = value[key];
      } else {
        return undefined;
      }
    }

    if (head?.formatter) return head.formatter(value);

    return value;
  };

  let colsWith = [];

  const dataParsed = data.map(el => {
    let obj = {};

    heads.forEach((head, index) => {
      if (head?.onPrint === "HIDDEN") return; 

      const value = getNestedValue(el, head) || "";
      obj[head.name.toUpperCase()] = value;


      if (!colsWith[index]?.wch || colsWith[index].wch < value.length) {
        colsWith[index] = { wch: value.length + 8 };
      }
      if (!colsWith[index]?.wch || colsWith[index].wch < head.name.length) {
        colsWith[index] = { wch: head.name.length + 8 };
      }
    });

    return obj;
  });

  const ws = utils.json_to_sheet(dataParsed);

  ws['!cols'] = colsWith;


  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, 'Clientes');

  writeFile(wb, 'clientes.xlsx');
};


export default exportInvoiceExel


// const fakeData = [
//   { id: 1, nombre: 'Juan Pérez', edad: 30, correo: 'juan@example.com', telefono: '123-456-7890', metodoPago: 'Tarjeta de Crédito' },
//   { id: 2, nombre: 'María González', edad: 25, correo: 'maria@example.com', telefono: '987-654-3210', metodoPago: 'Efectivo' },
//   { id: 3, nombre: 'Pedro Rodríguez', edad: 35, correo: 'pedro@example.com', telefono: '555-555-5555', metodoPago: 'Transferencia Bancaria' },
//   { id: 4, nombre: 'Ana Martínez', edad: 28, correo: 'ana@example.com', telefono: '111-222-3333', metodoPago: 'PayPal' },
//   { id: 5, nombre: 'Carlos Sánchez', edad: 40, correo: 'carlos@example.com', telefono: '999-888-7777', metodoPago: 'Cheque' }
// ];

  // ws['!cols'] = [
  //   { wch: 5 }, // Ancho de la columna ID
  //   { wch: 20 }, // Ancho de la columna Nombre
  //   { wch: 10 }, // Ancho de la columna Edad
  //   { wch: 25 }, // Ancho de la columna Correo
  //   { wch: 15 }, // Ancho de la columna Teléfono
  // ];
