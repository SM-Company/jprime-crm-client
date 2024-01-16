import React, { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import CustomDraggable from "../../components/CustomDraggable/CustomDraggable";
import { Button, Input, Typography } from "@material-tailwind/react";
import generate from "../../utils/generate";
import CustomModal from "../../components/CustomModal/CustomModal";
import CustomForm from "../../components/CustomForm/CustomForm";
import { CustomInput } from "../../components/CustomFields/CustomFields";
import InputLayout from "../../layouts/InputLayout";

function Test() {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSetSelectedCard] = useState("");

  const addCard = () => {
    setCards([...cards, { id: generate.generateUniqueCode() }]);
  };

  const onClose = (id) => {
    setCards(cards.filter((card) => card.id != id));
  };

  const [formData, setFormData] = useState({});

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del formulario:', formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [isFormModalOpen, setIsFormModalOpen] = useState(false)

  const handleFormModalOpen = () => {
    console.log("first")
    setIsFormModalOpen((prevState) => !prevState)
  }

  return (
    <>
      <div className="flex justify-center  p-5">
        <Button color="blue" onClick={handleFormModalOpen}>
          New Card
        </Button>
      </div>
      {cards.map(({ id }) => (
        <CustomDraggable
          className={`relative ${selectedCard == id ? "z-[20000]" : ""} `}
          onClicked={() => setSetSelectedCard(id)}
          key={id}
        >
          <div className="card border flex-col bg-white absolute items-center shadow-md ">
            <div className="flex justify-between items-center p-5 handle cursor-pointer">
              <h1 className="">Card Form {id}</h1>
              <i
                className="fa-solid fa-xmark text-lg hover:text-red-800"
                onClick={() => onClose(id)}
              ></i>
            </div>
            <hr />
            <div className="p-5">
              <Typography>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Nesciunt sit adipisci architecto beatae dolore minima nisi
                perferendis. Similique ut explicabo, laborum incidunt placeat,
                tempora veniam nam sunt quae ipsa non.
              </Typography>
            </div>
          </div>
        </CustomDraggable>
      ))}

      <CustomModal isOpen={isFormModalOpen} title="Form" size="2xl" onClose={handleFormModalOpen}>
        <CustomForm buttonName="Save" onSubmit={handleFormSubmit}>
          <InputLayout className="" items="2">
            <CustomInput name="name" label="Name" color="purple" handleChange={handleChange}/>
            <CustomInput name="phone" label="Phone" color="purple" handleChange={handleChange}/>
          </InputLayout>
        </CustomForm>
      </CustomModal>
    </>
  );
}

export default Test;
