import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input, Select, Option, Spinner, Typography } from "@material-tailwind/react";
import saleServis from "../services/sale.service";
import productService from "../../Inventory/Products/services/product.service";
import AlertComponent from "../../../../../components/Alert/Alert";
import CustomModal from "../../../components/CustomModal/CustomModal";
import CustomForm from "../../../components/CustomForm/CustomForm";
import InputLayout from "../../../layouts/InputLayout";
import { CustomDatepicker, CustomInput, CustomPasswordInput, CustomSearchSelect, CustomSelect, CustomTextarea } from "../../../components/CustomFields/CustomFields";
import CustomFormSubtitle from "../../../components/FormComponents/CustomFormSubtitle";
import customerService from "../../Customers/services/customer.service";
import CustomTable from "../../../components/CustomTable/CustomTable";
import generate from "../../../utils/generate";
import format from "../../../utils/format";
import Datepicker from "react-tailwindcss-datepicker";

function SaleForm({ isOpen, handleOpen, saleId }) {
  const [formData, setFormData] = useState({});
  const [customers, setCustomers] = useState([]);
  const [saleStatues, setSaleStatues] = useState([]);
  const [products, setProducts] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [paymentTypes, setPaymentTypes] = useState([]);
  const [alertInfo, setAlertInfo] = useState({ openAlert: false });
  const [isSending, setIsSending] = useState(false);

  const getSaleCreationData = async () => {
    const data = await saleServis.getSaleCreationData();
    console.log(data);
    if (data.status) {
      setCustomers(data.customers);
      setSaleStatues(data.statuses);
      setProducts(data.products);
      setPaymentMethods(data.paymentMethods);
      setPaymentTypes(data.paymentTypes);
    }
  };

  useEffect(() => {
    setFormData({});
    if (saleId) setFormInfo();
    if (isOpen) getSaleCreationData();
  }, [isOpen]);

  const handleOpenAlertComponent = (props) => {
    setAlertInfo((prevAlertInfo) => ({
      ...props,
      openAlert: !prevAlertInfo.openAlert,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nameParts = name.split(".");
    const updateNestedState = (data, parts, value) => {
      const [currentPart, ...remainingParts] = parts;
      if (!remainingParts.length) {
        return { ...data, [currentPart]: value };
      }
      return {
        ...data,
        [currentPart]: updateNestedState(data[currentPart] || {}, remainingParts, value),
      };
    };
    setFormData((prevData) => updateNestedState(prevData, nameParts, value));
    console.log(formData);
  };

  const TABLE_HEAD = [
    { name: "Product", key: "code" },
    { name: "quantity", key: "code" },
    { name: "Description", key: "description" },
    { name: "Unit Price", key: "name" },
    { name: "Amount", key: "category.name" },
  ];

  const [productSelected, setProductSelected] = useState([]);
  const handleProductInputs = (event, product) => {
    console.log(productSelected);
    const { name, value } = event.target;
    const selectedItem = event?.selectedItem;
    let newProdcutSelected = [...productSelected];
    const indexToModify = newProdcutSelected.findIndex((prod) => prod.id == product.id);

    if (indexToModify !== -1 && !selectedItem) {
      newProdcutSelected[indexToModify][name] = value;
      setProductSelected(newProdcutSelected);
    } else {
      newProdcutSelected[indexToModify][name] = value;
      newProdcutSelected[indexToModify]["description"] = selectedItem?.description;
      newProdcutSelected[indexToModify]["unit_price"] = selectedItem?.unit_price;
      newProdcutSelected[indexToModify]["stock_quantity"] = selectedItem?.stock_quantity;
      setProductSelected(newProdcutSelected);
      setFormData({ ...formData, selected_products: newProdcutSelected });
    }
  };

  const setFormInfo = async () => {
    if (!saleId) return;
    const data = await saleServis.show(saleId);
    if (data.status) {
      setFormData(data.sale);
      setProductSelected(data.sale?.selected_products);
      console.log(data.sale);
    }
  };

  const handleDeleteProduct = (product) => {
    productSelected.forEach(prod => {
      prod.id === product.id && handleProductInputs({target: {name: 'deleted', value: !prod.deleted} }, prod)
    });
    // setProductSelected((prevState) => prevState.map((prod) => prod.id === product.id ? {...prod, deleted: !prod.deleted} : prod));
    
  };

  const getSubTotal = () => {
    return productSelected.map((prod) => !prod.deleted ? (prod?.unit_price * prod?.quantity || 0) : 0).reduce((subTotal, amount) => subTotal + amount, 0) || 0;
  };

  const getTaxes = (amount, taxRate) => {
    const numericTaxRate = parseFloat(taxRate);
    if (typeof amount !== "number" || isNaN(amount) || typeof numericTaxRate !== "number" || isNaN(numericTaxRate)) return 0;
    const taxes = (amount * numericTaxRate) / 100;
    const roundedTaxes = Math.round(taxes * 100) / 100;
    return roundedTaxes;
  };

  const getDiscount = (amount, discountRate) => {
    const numericDiscountRate = parseFloat(discountRate);
    if (typeof amount !== "number" || isNaN(amount) || typeof numericDiscountRate !== "number" || isNaN(numericDiscountRate)) return 0;
    const discount = (amount * numericDiscountRate) / 100;
    const roundedDiscount = Math.round(discount * 100) / 100;
    return roundedDiscount;
  };

  const getTotal = () => {
    return (getSubTotal() || 0) + (getTaxes(getSubTotal(), formData?.tax) || 0) - getDiscount(getSubTotal(), formData?.discount);
  };

  const subTotal = format.price(getSubTotal() || 0);
  const taxesPercent = format.percentage(formData?.tax);
  const taxes = format.price(getTaxes(getSubTotal(), formData?.tax));
  const discountPercent = format.percentage(formData?.discount);
  const discount = format.price(getDiscount(getSubTotal(), formData?.discount));
  const total = format.price(getTotal());

  useEffect(() => {
    const value = parseFloat(total.replace(/[$,]/g, ""));
    handleChange({ target: { name: "total", value } });
  }, [total]);

  const resetPageData = () => {
    setFormData({});
    setCustomers([]);
    setSaleStatues([]);
    setProducts([]);
    setPaymentMethods([]);
    setPaymentTypes([]);
    setAlertInfo({ openAlert: false });
    setIsSending(false);
    setProductSelected([]);
  };

  const handleClose = () => {
    resetPageData();
    handleOpen();
  };

  const saveSale = async (e) => {
    e.preventDefault();
    setIsSending(true);
    const mode = saleId ? "update" : "store";
    const data = await saleServis[mode](formData);
    if (data.status) {
      handleClose();
    } else {
      handleOpenAlertComponent({
        message: data.message,
        title: "Error",
        mode: "DANGER",
        event: "INFO",
      });
    }
    setIsSending(false);
  };

  return (
    <>
      <CustomModal isOpen={isOpen} title={saleId ? "Update Sale" : "New invoice"} size="4xl" onClose={handleClose}>
        <CustomForm
          buttonName="Save"
          onSubmit={(e) => {
            e.preventDefault();
            // console.log(productSelected);
            // console.log(formData);
            saveSale(e);
          }}
          isSending={isSending}
        >
          <CustomFormSubtitle Title="Invoice Information" />
          <InputLayout className="" items="3">
            <CustomSearchSelect name="customer_id" label="Customer" color="purple" handleChange={handleChange} value={formData?.customer_id} items={customers} itemKey={"full_name"} />
            <CustomDatepicker placeholder="Date" name="date" onChange={handleChange} value={formData?.date} minDate={generate.currentDate()} />
            <CustomDatepicker placeholder="Expiration Date" name="expiration_date" onChange={handleChange} value={formData?.expiration_date} minDate={generate.currentDate()} />
          </InputLayout>
          <CustomFormSubtitle Title="Peyment Info" />
          <InputLayout className="" items="3">
            <CustomSelect label="Payment Method" name="payment_method_id" items={paymentMethods} itemKey={"name"} handleChange={handleChange} value={formData?.payment_method_id} />
            <CustomSelect label="Payment Type" name="payment_type_id" items={paymentTypes} itemKey={"name"} handleChange={handleChange} value={formData?.payment_type_id} />
            <CustomDatepicker placeholder="Next Payment Date" name="next_payment_date" onChange={handleChange} value={formData?.next_payment_date} minDate={generate.currentDate()} />
            <CustomInput label="Discount %" name="discount" handleChange={handleChange} value={formData?.discount} />
            <CustomInput label="Tax %" name="tax" handleChange={handleChange} value={formData?.tax} />
            <CustomSelect label="Status" name="status_id" handleChange={handleChange} value={formData?.status_id} items={saleStatues} itemKey={"name"} />
          </InputLayout>
          {/* <CustomTable TABLE_HEAD={TABLE_HEAD} items={saleData} pagination={true} itemsPerPage={7} filterText={filterText} onUpdate={handleOnUpdate} onDelete={handleOnDelete} /> */}
          <CustomTable TABLE_HEAD={TABLE_HEAD}>
            {productSelected.map((product, index) => {
              return (
                <tr key={index}>
                  <td className="w-3/12 p-2">
                    <CustomSearchSelect
                      name="product_id"
                      label="Product"
                      color="purple"
                      onChangeWithItem={(event) => handleProductInputs(event, product)}
                      value={product?.product_id}
                      items={products}
                      itemKey={"name"}
                      disabled={product?.deleted}
                    />
                  </td>
                  <td className="w-1/12 p-2">
                    <CustomInput
                      name="quantity"
                      value={product?.quantity}
                      handleChange={(event) => event.target.value <= product.stock_quantity && handleProductInputs(event, product)}
                      label="quantity"
                      disabled={product?.deleted}
                    />
                  </td>
                  <td className="w-3/12 p-2">
                    <CustomInput name="description" value={product?.description} label="Description" handleChange={(event) => handleProductInputs(event, product)} disabled={product?.deleted} />
                  </td>
                  <td className="w-2/12 p-2">
                    <CustomInput name="unit_price" value={product?.unit_price} label="Unit Price" handleChange={(event) => handleProductInputs(event, product)} disabled={product?.deleted} />
                  </td>
                  <td className="w-2/12 p-2">
                    <div className=" flex items-center justify-center gap-2">
                      <CustomInput name="amount" label="Amount" value={format.price(product?.unit_price * product?.quantity || 0)} disabled />
                      <i className={`${product?.deleted ? 'fa-rotate-left text-[#1A8FF2]' : 'fa-trash text-[#ae1a0b]'} fa-solid text-2xl cursor-pointer`} onClick={() => handleDeleteProduct(product)}></i>
                    </div>
                  </td>
                </tr>
              );
            })}
            <tr className="">
              <td colSpan="5 p-2">
                {" "}
                <Button className="w-full" color="green" onClick={() => setProductSelected((prevState) => [...prevState, { id: generate.generateUniqueCode() }])}>
                  Add Product
                </Button>
              </td>
            </tr>
            <tr className="">
              <td className="w-5"></td>
              <td className="w-5"></td>
              <td className="w-5"></td>
              <td className="w-5">
                <Typography className="text-black font-inter font-normal">Subtotal</Typography>
              </td>
              <td className="w-5">
                <Typography className="text-black font-inter font-normal">{subTotal}</Typography>
              </td>
            </tr>
            <tr className="">
              <td className="w-5"></td>
              <td className="w-5"></td>
              <td className="w-5"></td>
              <td className="w-5">
                <Typography className="text-black font-inter font-normal">IVA {taxesPercent}</Typography>
              </td>
              <td className="w-5">
                <Typography className="text-black font-inter font-normal">{taxes}</Typography>
              </td>
            </tr>
            <tr className="">
              <td className="w-5"></td>
              <td className="w-5"></td>
              <td className="w-5"></td>
              <td className="w-5">
                <Typography className="text-black font-inter font-normal">Discount {discountPercent}</Typography>
              </td>
              <td className="w-5">
                <Typography className="text-black font-inter font-normal">{discount}</Typography>
              </td>
            </tr>
            <tr className="">
              <td className="w-5"></td>
              <td className="w-5"></td>
              <td className="w-5"></td>
              <td className="w-5">
                <Typography className="text-black font-inter font-semibold uppercase">Total</Typography>
              </td>
              <td className="w-5">
                <Typography className="text-black font-inter font-semibold">{total}</Typography>
              </td>
            </tr>
          </CustomTable>
          <InputLayout className="mt-4" items="1">
            <CustomTextarea name="notes" label="Notes" color="purple" handleChange={handleChange} value={formData?.notes} />
          </InputLayout>
        </CustomForm>
      </CustomModal>
      <AlertComponent alertInfo={alertInfo} handleOpenAlertComponent={handleOpenAlertComponent} />
    </>
  );
}

export default SaleForm;
