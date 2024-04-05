import jsPDF from 'jspdf';
import 'jspdf-autotable'
import images from '../../../assets/images';
import { getDiscount, getSubTotal, getTaxes, getTotal } from './sale.utils';
import format from '../../../utils/format';
import saleService from '../services/sale.service';


const printInvoicePdf = async (id) => {
    const { status, sale } = await saleService.show(id);
    if (!status) return;
    console.log(sale)
    const products = sale?.selected_products;
    const taxRate = sale?.tax;
    const discountRate = sale?.discount;
    const amount = getSubTotal({ products })
    const subTotal = format.price(getSubTotal({ products }) || 0);
    const taxesPercent = format.percentage(taxRate);
    const taxes = format.price(getTaxes({ amount, taxRate }));
    const discountPercent = format.percentage(discountRate);
    const discount = format.price(getDiscount({ amount, discountRate }));
    const total = format.price(getTotal({ products, discountRate, taxRate }));

    var doc = new jsPDF({
        orientation: "p", // Orientación del documento (p para retrato, l para paisaje)
        unit: "mm", // Unidad de medida del documento (mm, cm, in)
        format: "a4" // Formato del documento (a4, letter, legal, etc.)
    });

    // Header

    doc.addImage(images.logoBlueTransparentPNG, "PNG", 10, 5, 30, 30);
    doc.setFont("helvetica", "bolditalic");
    doc.setTextColor(17, 44, 103);
    doc.setFontSize(35);
    doc.text("JPrime CRM", 50, 24);

    // Code

    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.text(sale?.code, 185, 10);

    // Company

    doc.setTextColor(17, 44, 103);
    doc.setFontSize(15);
    doc.setFont("helvetica", "bold");
    doc.text("Company", 10, 45);

    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");
    doc.text("RNC 000000000000.", 10, 52);
    doc.text("www.jprimecrm.com.", 10, 57);
    doc.text("info@jprimecrm.com.", 10, 62);
    doc.text("+(000) 000-0000.", 10, 67);


    // Customer

    doc.setTextColor(17, 44, 103);
    doc.setFontSize(15);
    doc.setFont("helvetica", "bold");
    doc.text("Customer", 65, 45);

    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");
    if(sale?.customer.full_name) doc.text(`Full name: ${sale.customer.full_name}`, 65, 52);
    if(sale?.customer?.email) doc.text(`Email: ${sale.customer.email}`, 65, 57);
    if(sale?.customer?.phone) doc.text(`Phone: ${sale.customer.phone}`, 65, 62);
    if(sale?.customer?.loyalty_points) doc.text(`Loyalty points: ${sale?.customer.loyalty_points}`, 65, 67);


    // Invoice JPrime

    doc.setTextColor(17, 44, 103);
    doc.setFontSize(15);
    doc.setFont("helvetica", "bold");
    doc.text("Invoice JPrime", 135, 45);

    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");
    doc.text(`CODE: ${sale?.code}`, 135, 52);
    if(sale?.date) doc.text(`Date of issue: ${sale.date}`, 135, 57);
    if(sale?.next_payment_date) doc.text(`Next payment: ${sale.next_payment_date}`, 135, 62);
    if(sale?.expiration_date) doc.text(`Expiry date: ${sale.expiration_date}`, 135, 67);
    if(sale?.payment_type?.name) doc.text(`Payment type: ${sale.payment_type.name}`, 135, 72);
    if(sale?.payment_method?.name) doc.text(`Payment method: ${sale.payment_method.name}`, 135, 77);

    const head = [["Product", "Quantity", "Description", "Unit Price", "Amount"]];

    // const body = [
    // ["Wireless Ergonomic Keyboard and Mouse", "5", "Comfortable and efficient wireless keyboard and mouse set", "80.00", "$400.00"],
    // ["Wireless Ergonomic Keyboard and Mouse", "5", "Comfortable and efficient wireless keyboard and mouse set", "80.00", "$400.00"],
    // ["Wireless Ergonomic Keyboard and Mouse", "5", "Comfortable and efficient wireless keyboard and mouse set", "80.00", "$400.00"],
    // ["Wireless Ergonomic Keyboard and Mouse", "5", "Comfortable and efficient wireless keyboard and mouse set", "80.00", "$400.00"],
    // ["", "", "", "Subtotal", "$1,600.55"],
    // ["", "", "", "IVA 5.2%", "$83.23"],
    // ["", "", "", "Discount 2.2%", "$35.21"],
    // ["", "", "", "TOTAL", "$1,648.57"],
    // ];

    const body = products.map(product => [
        product?.main_product?.name,
        product?.quantity, 
        product?.description,
        product?.unit_price,
        format.price(product?.unit_price * product?.quantity || 0)
    ]);

    const foot = [["", "", "", "Subtotal", subTotal],
    ["", "", "", `IVA ${taxesPercent}`, taxes],
    ["", "", "", `Discount ${discountPercent}`, discount],
    ["", "", "", "TOTAL", total]]

    // const columnWidthsPart1 = [50, 15, 55, 35, 35];
    // const columnWidthsPart1 = [null, 15, null, null, null];

    doc.autoTable({
        startY: 85,
        head,
        body,
        theme: 'grid',
        margin: { left: 10 },
        foot,
        // columnStyles: {
        //     0: { cellWidth: columnWidthsPart1[0] }, // Espacio entre la primera y segunda columna
        //     1: { cellWidth: columnWidthsPart1[1] }, // Espacio entre la segunda y tercera columna
        //     2: { cellWidth: columnWidthsPart1[2] }, // Espacio entre la tercera y cuarta columna
        //     3: { cellWidth: columnWidthsPart1[3] }, // Espacio entre la cuarta y quinta columna
        //     4: { cellWidth: columnWidthsPart1[4] }  // Ancho de la quinta columna
        // },
        headStyles: {
            fillColor: "#112C67",
            textColor: "#fff",
            fontSize: 10,
            padding: 0,
            cellPadding: { top: 3, right: 2, bottom: 3, left: 2 },
        },
        bodyStyles: {
            fillColor: "#fff",
            textColor: "#000",
            fontSize: 9.5,
            padding: 0,
        },
        footStyles: {
            fillColor: null,
            textColor: "#000",
            fontSize: 9.5,
            padding: 0,
            cellPadding: { top: 1.5, right: 2, bottom: 0, left: 2 },
        }
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

    // doc.setFontSize(10);
    // doc.text("Subtotal", 131, doc.autoTable.previous.finalY + 10);
    // doc.text("$1,600.55", 166, doc.autoTable.previous.finalY + 10);

    // doc.text("IVA 5.2%", 131, doc.autoTable.previous.finalY + 15);
    // doc.text("$83.23", 166, doc.autoTable.previous.finalY + 15);

    // doc.text("Discount 2.2%", 131, doc.autoTable.previous.finalY + 20);
    // doc.text("$35.21", 166, doc.autoTable.previous.finalY + 20);

    // doc.setFont("helvetica", "bold");
    // doc.text("TOTAL", 131, doc.autoTable.previous.finalY + 25);
    // doc.text("$1,648.57", 166, doc.autoTable.previous.finalY + 25);

    doc.setFont("helvetica", "normal");
    const maxWidth = 130; // Ancho máximo para el texto
    const initialX = 10; // Posición inicial en el eje X
    const initialY = doc.autoTable.previous.finalY + 20; // Posición inicial en el eje Y

    const text = "Thank you for choosing JPrime. Our commitment is to provide you with the best experience, making it easy for you to quickly get what you need with quality. We value your feedback, please share it at www.JPrimecrm.com/feedbackzone.com We invite you to participate in our feedback form, called 'Feedback Zone', so we can continue improving together!";

    // Dividir el texto en líneas que se ajusten dentro del ancho máximo
    const lines = doc.splitTextToSize(text, maxWidth);

    // Dibujar las líneas en el documento
    doc.text(lines, initialX, initialY);

    doc.save('invoice.pdf');
}

export default printInvoicePdf;


