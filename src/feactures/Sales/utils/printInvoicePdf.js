import jsPDF from 'jspdf';
import 'jspdf-autotable'


const printInvoicePdf = ({ sale }) => {
    var doc = new jsPDF({
        orientation: "p", // Orientación del documento (p para retrato, l para paisaje)
        unit: "mm", // Unidad de medida del documento (mm, cm, in)
        format: "a4" // Formato del documento (a4, letter, legal, etc.)
    });


    // JPrime CRM

    doc.setTextColor(17, 44, 103);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bolditalic");
    doc.text("JPrime CRM", 5, 20);

    doc.setFontSize(13);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");
    doc.text("RNC 000000000000.", 5, 30);
    doc.text("www.jprimecrm.com.", 5, 35);
    doc.text("info@jprimecrm.com.", 5, 40);
    doc.text("+(000) 000-0000.", 5, 45);


    // Customer

    doc.setTextColor(17, 44, 103);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bolditalic");
    doc.text("Customer", 60, 20);

    doc.setFontSize(13);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");
    doc.text("Full name: Evan Maggio.", 60, 30);
    doc.text("Email: beau.cassin@gmail.com.", 60, 35);
    doc.text("Phone: +1.828.342.1440.", 60, 40);
    doc.text("Next payment: Evan Maggio.", 60, 45);


    // Invoice JPrime

    doc.setTextColor(17, 44, 103);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bolditalic");
    doc.text("Invoice JPrime", 135, 20);

    doc.setFontSize(13);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");
    doc.text("CODE: SL008.", 135, 30);
    doc.text("Date of issue: 2024-03-27.", 135, 35);
    doc.text("Next payment: 2024-04-05.", 135, 40);
    doc.text("Expiry date: 2024-04-04.", 135, 45);
    doc.text("Payment type: One-Time Payment.", 135, 50);
    doc.text("Payment method: Cash.", 135, 55);

    const head = [["Product", "Quantity", "Description", "Unit Price", "Amount"]];
    const body = [
        ["Wireless Ergonomic Keyboard and Mouse", "5", "Comfortable and efficient wireless keyboard and mouse set", "80.00", "$400.00"],
        ["Wireless Ergonomic Keyboard and Mouse", "5", "Comfortable and efficient wireless keyboard and mouse set", "80.00", "$400.00"],
        ["Wireless Ergonomic Keyboard and Mouse", "5", "Comfortable and efficient wireless keyboard and mouse set", "80.00", "$400.00"],
        ["Wireless Ergonomic Keyboard and Mouse", "5", "Comfortable and efficient wireless keyboard and mouse set", "80.00", "$400.00"],
        // ["", "", "", "Subtotal", "$1,600.55"],
        // ["", "", "", "IVA 5.2%", "$83.23"],
        // ["", "", "", "Discount 2.2%", "$35.21"],
        // ["", "", "", "TOTAL", "$1,648.57"],
    ];
    const columnWidthsPart1 = [50, 15, 55, 35, 35];

    doc.autoTable({
        startY: 70,
        head,
        body,
        theme: 'grid',
        margin: { left: 10 },
        columnStyles: {
            0: { cellWidth: columnWidthsPart1[0] }, // Espacio entre la primera y segunda columna
            1: { cellWidth: columnWidthsPart1[1] }, // Espacio entre la segunda y tercera columna
            2: { cellWidth: columnWidthsPart1[2] }, // Espacio entre la tercera y cuarta columna
            3: { cellWidth: columnWidthsPart1[3] }, // Espacio entre la cuarta y quinta columna
            4: { cellWidth: columnWidthsPart1[4] }  // Ancho de la quinta columna
        },
        headStyles: {
            fillColor: "#112C67",
            textColor: "#fff",
            fontSize: 8,
            padding: 0,
        },
    })


    // doc.autoTable({
    //     startY: 70,
    //     head,
    //     body,
    //     tableLineColor: [0, 0, 0],
    //     tableLineWidth: 0.10,
    //     bodyStyles: {lineColor: [0, 0, 0]},
    //     theme: 'grid',
    //     headStyles: {
    //         fillColor: "#112C67",
    //         textColor: "#fff",
    //         fontSize: 8,
    //         padding: 0,
    //     },
    // })

    // startY: doc.autoTable.previous.finalY + 5, 

    doc.setFontSize(10);
    doc.text("Subtotal", 131, doc.autoTable.previous.finalY + 10);
    doc.text("$1,600.55", 166, doc.autoTable.previous.finalY + 10);

    doc.text("IVA 5.2%", 131, doc.autoTable.previous.finalY + 15);
    doc.text("$83.23", 166, doc.autoTable.previous.finalY + 15);

    doc.text("Discount 2.2%", 131, doc.autoTable.previous.finalY + 20);
    doc.text("$35.21", 166, doc.autoTable.previous.finalY + 20);

    doc.setFont("helvetica", "bold");
    doc.text("TOTAL", 131, doc.autoTable.previous.finalY + 25);
    doc.text("$1,648.57", 166, doc.autoTable.previous.finalY + 25);

    doc.setFont("helvetica", "normal");
    const maxWidth = 130; // Ancho máximo para el texto
    const initialX = 10; // Posición inicial en el eje X
    const initialY = doc.autoTable.previous.finalY + 40; // Posición inicial en el eje Y

    const text = "Thank you for choosing JPrime. Our commitment is to provide you with the best experience, making it easy for you to quickly get what you need with quality. We value your feedback, please share it at www.JPrimecrm.com/feedbackzone.com We invite you to participate in our feedback form, called 'Feedback Zone', so we can continue improving together!";

    // Dividir el texto en líneas que se ajusten dentro del ancho máximo
    const lines = doc.splitTextToSize(text, maxWidth);

    // Dibujar las líneas en el documento
    doc.text(lines, initialX, initialY);

    doc.save('invoice.pdf');
}

export default printInvoicePdf;


