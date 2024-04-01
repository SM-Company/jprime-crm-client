import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setUrlParams } from "../../../../layouts/components/Navbar/navbar.slice";
import saleService from "../../services/sale.service";
import { Card, Typography } from "@material-tailwind/react";
import images from "../../../../assets/images";
import CustomTable from "../../../../components/CustomTable/CustomTable";
import { CustomInput, CustomTextarea } from "../../../../components/CustomFields/CustomFields";
import format from "../../../../utils/format";
import InputLayout from "../../../../layouts/InputLayout";
import CustomFormSubtitle from "../../../../components/FormComponents/CustomFormSubtitle";
import { getSubTotal, getTaxes, getDiscount, getTotal } from "../../utils/sale.utils";

function ShareSale() {
  const dispatch = useDispatch();
  const { id } = useParams();
  if (id) dispatch(setUrlParams(id));
  const decodedId = atob(id);

  const [sale, setSale] = useState({});

  const getSale = async () => {
    if (!id) return;
    const data = await saleService.show(decodedId);
    if (data.status) setSale(data.sale);
    console.log(data.sale);
  };

  useEffect(() => {
    getSale();
  }, []);

  // const getSubTotal = () => {
  //   return sale?.selected_products?.map((prod) => (!prod.deleted ? prod?.unit_price * prod?.quantity || 0 : 0)).reduce((subTotal, amount) => subTotal + amount, 0) || 0;
  // };

  // const getTaxes = (amount, taxRate) => {
  //   const numericTaxRate = parseFloat(taxRate);
  //   if (typeof amount !== "number" || isNaN(amount) || typeof numericTaxRate !== "number" || isNaN(numericTaxRate)) return 0;
  //   const taxes = (amount * numericTaxRate) / 100;
  //   const roundedTaxes = Math.round(taxes * 100) / 100;
  //   return roundedTaxes;
  // };

  // const getDiscount = (amount, discountRate) => {
  //   const numericDiscountRate = parseFloat(discountRate);
  //   if (typeof amount !== "number" || isNaN(amount) || typeof numericDiscountRate !== "number" || isNaN(numericDiscountRate)) return 0;
  //   const discount = (amount * numericDiscountRate) / 100;
  //   const roundedDiscount = Math.round(discount * 100) / 100;
  //   return roundedDiscount;
  // };

  // const getTotal = () => {
  //   return (getSubTotal() || 0) + (getTaxes(getSubTotal(), sale?.tax) || 0) - getDiscount(getSubTotal(), sale?.discount);
  // };

  // getSubTotal, getTaxes, getTotal

  const products = sale?.selected_products;
  const taxRate = sale?.tax;
  const discountRate = sale?.discount;
  const amount = getSubTotal({products})
  const subTotal = format.price(getSubTotal({products}) || 0);
  const taxesPercent = format.percentage(taxRate);
  const taxes = format.price(getTaxes({amount, taxRate}));
  const discountPercent = format.percentage(discountRate);
  const discount = format.price(getDiscount({amount, discountRate}));
  const total = format.price(getTotal({products, discountRate, taxRate}));

  const TABLE_HEAD = [
    { name: "Product", key: "main_product.name" },
    { name: "Quantity", key: "quantity" },
    { name: "Description", key: "description" },
    { name: "Unit Price", key: "unit_price" },
    { name: "Amount", type: "LOGIC", logic: "{format.price(product?.unit_price * product?.quantity || 0)}" },
  ];

  return (
    <div className="p-20 pt-10">
      <div className="flex justify-between flex-wrap">
        <div>
          <img src={images.logoBlueTransparentPNG} alt="Logo" width={80} className="" />
          <Typography className="text-4xl font-bold text-color-1 italic font-inter mt-3">JPrime CRM</Typography>
          <p className="font-inter font-medium mt-2">RNC 000000000000</p>
          <p className="font-inter font-medium">www.jprimecrm.com</p>
          <p className="font-inter font-medium">info@jprimecrm.com</p>
          <p className="font-inter font-medium">{"+(000) 000-0000"}</p>
        </div>
        <div>
          <div className="mt-[5.6em]">
            <Typography className="text-4xl font-bold text-color-1 italic font-inter">Customer</Typography>
            <p className="font-inter font-medium mt-2">Full name: {sale?.customer?.full_name}</p>
            <p className="font-inter font-medium">Email: {sale?.customer?.email}</p>
            <p className="font-inter font-medium">Phone: {sale?.customer?.phone}</p>
            <p className="font-inter font-medium">Next payment: {sale?.customer?.full_name}</p>
          </div>
        </div>
        <div>
          <div className="mt-[5.6em]">
            <Typography className="text-4xl font-bold text-color-1 italic font-inter">Invoice JPrime</Typography>
            {/* <p className="font-inter font-medium">Customer: {sale?.customer?.full_name}</p> */}
            <p className="font-inter font-medium mt-2">CODE: {sale?.code}</p>
            <p className="font-inter font-medium">Date of issue: {sale?.date}</p>
            <p className="font-inter font-medium">Next payment: {sale?.next_payment_date}</p>
            <p className="font-inter font-medium">Expiry date: {sale?.expiration_date}</p>
            <p className="font-inter font-medium">Payment type: {sale?.payment_type?.name}</p>
            <p className="font-inter font-medium">Payment method: {sale?.payment_method?.name}</p>
          </div>
        </div>
      </div>
      <div>
        {/* <CustomTable
          tableName={"Customer Manager"}
          TABLE_HEAD={TABLE_HEAD}
          items={customerData}
          pagination={true}
          itemsPerPage={7}
          controls={true}
          onUpdate={handleOnUpdate}
          onDelete={handleOnDelete}
          handleFormModalOpen={handleFormModalOpen}
        /> */}

        <CustomTable TABLE_HEAD={TABLE_HEAD} items={[]} actions={false} scroll={false} headClass="white text-md font-semibold" className="shadow-none">
          {sale?.selected_products?.map((product, index) => {
            return (
              <tr key={index} className="text-blue-gray-800 font-semibold">
                <td className="w-3/12 p-2 border border-blue-gray-900">{product?.main_product?.name}</td>
                <td className="w-1/12 p-2 border-b border-r border-blue-gray-900">{product?.quantity}</td>
                <td className="w-3/12 p-2 border-b border-r border-blue-gray-900">{product?.description}</td>
                <td className="w-2/12 p-2 border-b border-r border-blue-gray-900">{product?.unit_price}</td>
                <td className="w-2/12 p-2 border-b border-r border-blue-gray-900">{format.price(product?.unit_price * product?.quantity || 0)}</td>
              </tr>
            );
          })}

          <div className="pt-5"></div>

          <tr className="">
            <td className="w-5"></td>
            <td className="w-5"></td>
            <td className="w-5"></td>
            <td className="w-5">
              <Typography className="text-black font-inter font-semibold">Subtotal</Typography>
            </td>
            <td className="w-5">
              <Typography className="text-black font-inter font-semibold">{subTotal}</Typography>
            </td>
          </tr>

          <tr className="">
            <td className="w-5"></td>
            <td className="w-5"></td>
            <td className="w-5"></td>
            <td className="w-5">
              <Typography className="text-black font-inter font-semibold">IVA {taxesPercent}</Typography>
            </td>
            <td className="w-5">
              <Typography className="text-black font-inter font-semibold">{taxes}</Typography>
            </td>
          </tr>

          <tr className="">
            <td className="w-5"></td>
            <td className="w-5"></td>
            <td className="w-5"></td>
            <td className="w-5">
              <Typography className="text-black font-inter font-semibold">Discount {discountPercent}</Typography>
            </td>
            <td className="w-5">
              <Typography className="text-black font-inter font-semibold">{discount}</Typography>
            </td>
          </tr>

          <tr className="">
            <td className="w-5"></td>
            <td className="w-5"></td>
            <td className="w-5"></td>
            <td className="w-5">
              <Typography className="text-black font-inter font-bold uppercase">Total</Typography>
            </td>
            <td className="w-5">
              <Typography className="text-black font-inter font-bold">{total}</Typography>
            </td>
          </tr>
          <div className="pt-5"></div>
        </CustomTable>

        <div className="w-7/12">
          <p className="font-inter">
            Gracias por elegir JPrime. Nuestro compromiso es brindarte la mejor experiencia, facilitando que obtengas rápidamente lo que necesitas con calidad. Valoramos tu opinión, por favor
            compártela en www.JPrimecrm.com/feedbackzone.com ¡Te invitamos a participar en nuestro formulario de comentarios, llamado 'Feedback Zone', para que podamos seguir mejorando juntos!
          </p>
        </div>
        {/* <CustomFormSubtitle Title="Notes"/>
        <InputLayout className="mt-4" items="1" >
          <p >{sale?.notes}</p>
        </InputLayout> */}
      </div>
    </div>
  );
}

export default ShareSale;
