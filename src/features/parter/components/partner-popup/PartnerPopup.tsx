import React from "react";
import { Button, Input, Modal, Form } from "antd";
import { PatternFormat } from "react-number-format";
import { usePartner } from "../../service/usePartner";
import useGetRole from "@/shared/hooks/useGetRole";

type FieldType = {
  fullname?: string;
  address?: string;
  phone_primary?: string;
  phone_secondary?: string;
  role?: string;
};

interface Props {
  isModalOpen: boolean;
  handleCancel: () => void;
  previousData?: any;
}

const PartnerPopup: React.FC<Props> = ({
  handleCancel,
  isModalOpen,
  previousData,
}) => {
  const role = useGetRole()
  const { createPartner } = usePartner();
  const { isPending } = createPartner;

  const handleSubmit = (values: FieldType) => {
    values.role = role;
    const phone_secondary = values.phone_secondary?.replace(/\s/gi, "");

    const newPartner = {
      fullname: values.fullname,
      role: values.role,
      adress: values.address, // ADRESS | ADDRESS
      phone: [values.phone_primary?.replace(/\s/gi, "")],
    };
    if (phone_secondary) {
      newPartner.phone.push(phone_secondary);
    }
    console.log(newPartner);
    

    // createPartner.mutate(newPartner, {
    //   onSuccess: () => {
    //     handleCancel();
    //   },
    // });
  };
  return (
    <>
      <Modal
        title={ `${role === "seller" ? "Sotuvchi " : "Mijoz "}` + `${previousData ? "tahrirlash" : "qo'shish"}` }
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}
      >
        <Form
          name="basic"
          initialValues={previousData}
          onFinish={handleSubmit}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item<FieldType>
            label="Ism"
            name="fullname"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Manzil"
            name="address"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Asosiy telefon raqam"
            name="phone_primary"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <PatternFormat
              format="+998 ## ### ## ##"
              mask={"_"}
              allowEmptyFormatting
              customInput={Input}
            />
          </Form.Item>

          <Form.Item<FieldType>
            label="Telefon raqam"
            name="phone_secondary"
            rules={[
              { required: false, message: "Please input your password!" },
            ]}
          >
            <PatternFormat
              format="+998 ## ### ## ##"
              mask={"_"}
              allowEmptyFormatting
              customInput={Input}
            />
          </Form.Item>
          <Form.Item label={null}>
            <Button
              loading={isPending}
              className="w-full"
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default PartnerPopup;
